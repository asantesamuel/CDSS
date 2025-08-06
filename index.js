import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/uploads', express.static('uploads'));

const MONGODBURL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5555;

app.get('/', (req, res) => {
    return res.status(234).send("Welcome to CDSS backend");
})

mongoose
    .connect(MONGODBURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        });
        console.log("App connected to database");
    })
    .catch(err => {
        console.log(err);
    })