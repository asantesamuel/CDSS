import express from 'express';
import bcrypt from 'bcrypt';
import { userModel } from '../models/userModel.js';
import { patientModel } from '../models/patientModel.js';

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
/* userRouter.put('/add-to-history/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { history } = req.body;

        const data = {
            scan_history: history
        }

        const added = patientModel.findByIdAndUpdate(id, { $push: { history: data } }, { new: true, upsert: true } );

        return res.status(201).send("Scan successfully added to history");
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
}) */

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

export default userRouter