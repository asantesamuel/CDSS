import express from 'express';
import bcrypt from 'bcrypt';
import { userModel } from '../models/userModel.js';

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
        
        const isMatch = bcrypt.compare(password, user.password);

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

        const info = await userModel.findById(id);

        if(!info) {
            return res.status("Data not found. Make sure you're logged in.");
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

// Add to history
userRouter.put('/add-to-history/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { history } = req.body;

        const data = {
            history: history
        }

        const added = userModel.findByIdAndUpdate(id, { $push: { history: data } }, { new: true, upsert: true } );

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
})

export default userRouter