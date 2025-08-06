import express from 'express';
import bcrypt from 'bcrypt';
import { userModel } from '../models/userModel.js';
import { patientModel } from '../models/patientModel.js';
import { SendOTP } from '../config/SendMail.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + extension)
    }
});

const upload = multer({ storage: storage });

const userRouter = express.Router();

// Create account route
userRouter.post('/signup', async (req, res) => {
    try {
        const {
            fullname,
            email,
            phone,
            gender,
            password
        } = req.body;

        if(!fullname || !email || !phone || !gender || !password) {
            return res.status(404).send("Please fill out all fields to continue");
        }

        const userData = {
            fullname: fullname,
            email: email,
            phone: phone,
            gender: gender,
            password: password,
        }

        const newUser = await userModel.create(userData);

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).send("Something went wrong. Kindly try again later.");
    }
})

// Login route
userRouter.post('/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if(!email || !password) {
            return res.status(404).send("Kindly fill out all fields to continue");
        }

        const user = await userModel.findOne({ email });
        if(!user) {
            return res.status(400).send("User not found. Kindly check details and try again.");
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).send("User not found. Kindly check details and try again.");
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).send("Something went wrong. Kindly try again later.");
    }
})

// Get user data
userRouter.get('/get-info/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const info = await userModel.findById(id, { 'password': 0 });

        if(!info) {
            return res.status(404).send({
                message: "Data not found. Make sure you're logged in.",
                name: "error"
            });
        }

        return res.status(200).json(info);
    } catch (error) {
        if(error.name === "MongoNetworkError" || error.name === "MongoServerSelectionError") {
            return res.status(503).send({
                message: "Something went wrong. Kindly check your internet and try again.",
                name: "network"
            });
        }

        return res.status(500).send({
            message: "Something went wrong. Kindly try again later.",
            name: "unknown"
        });
    }
})

// Update profile
userRouter.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const {
            fullname,
            phone,
            gender
        } = req.body;

        const data = {
            fullname,
            phone,
            gender
        }

        const newUser = await userModel.findByIdAndUpdate(id, data);

        return res.status(201).json(newUser);

    } catch (error) {
        return res.status(500).send("Something went wrong. Kindly try again later");
    }
})

// Add to history
userRouter.put('/add-to-history/:id', upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;

        const image = req.file? req.file.filename : undefined;

        const {
            confidence,
            inference
        } = req.body;

        const scan_history = {
            inference,
            confidence,
            image
        }

        const added = await patientModel.findByIdAndUpdate(id, { $push: { scan_history: scan_history } }, { new: true } );

        return res.status(201).send("Scan successfully added to history");
    } catch (error) {
        console.log(error)
        if(error.name === "MongoNetworkError" || error.name === "MongoServerSelectionError") {
            return res.status(503).send({
                message: "Something went wrong. Kindly check your internet and try again.",
                name: "network"
            });
        }

        return res.status(500).send({
            message: "Something went wrong. Kindly try again later.",
            name: "unknown"
        });
    }
})

// Add patient
userRouter.post('/patient/add', async (req, res) => {
    try {
        const {
            doctor,
            fullname,
            phone,
            gender,
            birth_date,
            weight,
            height,
            medical_history
        } = req.body;

        if(
            !doctor
            || !fullname
            || !phone
            || !gender
            || !birth_date
            || !weight
            || !height
            || !medical_history
        ) {
            return res.status(400).send("Kindly send all details required to add patient.");
        }

        const data = {
            doctor,
            fullname,
            phone,
            gender,
            birth_date,
            weight,
            height,
            medical_history
        }

        const patient = await patientModel.create(data);

        return res.status(201).json(patient);
    } catch (error) {
        return res.status(500).send("Something went wrong. Kindly try again later");
    }
})

// Fetch patients
userRouter.get('/patients/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const patients = await patientModel.find({ doctor: id});

        return res.status(200).json(patients);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong. Kindly try again later");
    }
})

// Get one patient
userRouter.get('/patient/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const patient = await patientModel.findById(id);

        if(!patient) {
            return res.status(404).send("Patient details cannot be found.");
        }

        return res.status(200).json(patient);
    } catch (error) {
        return res.status(500).send("Something went wrong. Kindly try again later");
    }
})

// Delete patient
userRouter.delete('/patient/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await patientModel.findByIdAndDelete(id);

        return res.status(200).send("Patient data deleted successfully");
    } catch (error) {
        return res.status(500).send("Something went wrong. Kindly try again later");
    }
})

// Edit one patient
userRouter.put('/patient/edit/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const {
            fullname,
            phone,
            gender,
            birth_date,
            weight,
            height,
            medical_history
        } = req.body;

        const data = {
            fullname,
            phone,
            gender,
            birth_date,
            weight,
            height,
            medical_history
        }

        const updatedUser = await patientModel.findByIdAndUpdate(id, data);

        if(!updatedUser) {
            return res.status(204).send("Data couldn't be updated");
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).send("Something went wrong. Kindly try again later");
    }
})

userRouter.put('/send-otp', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if(!user) {
            return res.status(404).send({
                message: "User data cannot be found. Please make sure to enter a valid email address",
                code: 404,
                status: "error"
            })
        }
        if(user.otp) {
            return res.status(200).send({
                message: "OTP was sent to your gmail. Kindly check your gmail to access it.",
                status: "success",
                user
            })
        }

        const OTP = Math.round(Math.random()*99999);

        const mail_sent = await SendOTP(email, OTP);

        const data = {
            otp: OTP
        }

        const saved = await userModel.findByIdAndUpdate(user._id, data);

        return res.status(200).json({
            message: "OTP sent successfully. Kindly check your email to access it.",
            user: saved,
            status: "success",
            code: 200
        })
        
    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong. Kindly try again later.",
            status: "error"
        })
    }
})

userRouter.put('/verify-otp/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { OTP } = req.body;

        if(!OTP) {
            return res.status(400).send({
                message: "Kindly enter OTP to reset your password.",
                status: "error"
            })
        }
        if(OTP.toString().length !== 5) {
            return res.status(400).send({
                message: "Incorrect OTP length.",
                status: "error"
            })
        }

        const user = await userModel.findById(id);

        if(!user) {
            return res.status(404).send({
                message: "User info not found. Make sure you're logged in.",
                status: "error"
            })
        }

        if(user.otp !== OTP) {
            return res.status(400).send({
                message: "The OTP you entered is incorrect.",
                status: "error"
            })
        }

        const data = {
            otp: '',
            verified: true
        }

        const updated = await userModel.findByIdAndUpdate(id, data);

        return res.status(200).send({
            message: "Kindly proceed to change your password",
            status: "error"
        })

    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong. Kindly try again later.",
            status: "error"
        })
    }
})

userRouter.put('/change-password/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userModel.findById(id);

        if(!user.verified) {
            return res.status(401).send({
                message: "Kindly go back to enter OTP to reset your password",
                status: "error"
            })
        }

        const {
            password,
            password2, // Repeat password
        } = req.body;

        const check_password = (password) => {
            if(/[0-9]/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 8) {
                return true;
            }
            return false;
        }

        if(!check_password(password)) {
            return res.status(400).send({
                message: "Make sure password meets all requirements",
                status: "error"
            })
        }

        if(!password || !password2) {
            return res.status(400).send({
                message: "Kindly fill in all fields to reset your password",
                status: "error"
            })
        }else if(password !== password2) {
            return res.status(400).send({
                message: "Kindly make sure your passwords match",
                status: "error"
            })
        }

        const salt = await bcrypt.genSalt(10);

        const data = {
            password: await bcrypt.hash(password, salt),
            verified: false
        }

        const updated = await userModel.findByIdAndUpdate(id, data);
        if(!updated) {
            return res.status(204).send({
                message: "Password could not be changed. Kindly try again later.",
                status: "error"
            })
        }

        return res.status(200).send({
            message: "Password changed successfully. You can now proceed to login.",
            status: "success"
        })
    } catch (error) {
        return res.status(500).send({
            message: "Something went wrong. Kindly try again later.",
            status: "error"
        })
    }
})

export default userRouter