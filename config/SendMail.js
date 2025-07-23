import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const SendOTP = async(email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: 'CDSS OTP',
        text: `Your OTP is ${otp}. Use this to reset your password. Do not share this code with others.`,
        html: `Your OTP is ${otp}. Use this to reset your password. Do not share this code with others.`
    }

    const sent = await transporter.sendMail(mailOptions);
}