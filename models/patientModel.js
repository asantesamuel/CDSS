import mongoose from "mongoose"

const patientSchema = mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    fullname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    weight: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    birth_date: {
        type: String,
        required: true
    },
    medical_history: {
        diabetes: {
            type: Boolean,
            required: true,
            enum: [true, false],
            default: "no"
        },
        heart: {
            type: Boolean,
            required: true,
            enum: [true, false],
            default: "no"
        },
        smoker: {
            type: String,
            required: true,
            enum: ["current", "never", "former"],
            default: "never"
        },
    },
    scan_history: [
        {
            id: mongoose.Schema.Types.ObjectId,
            image: String,
            confidence: String,
            inference: String,
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ]
})

export const patientModel = mongoose.model('patient', patientSchema);