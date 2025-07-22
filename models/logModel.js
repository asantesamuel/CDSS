import mongoose from "mongoose";

const logSchema = mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    login_time: {
        type: String,
        required: true
    },
    logout_time: {
        type: String,
        required: true,
        default: Date.now()
    }
})