import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import medicalBg from '../assets/1311314_414.jpg';
import axios from 'axios';
import { FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUp = () => {

    // Variable for password visibility
    const [showing, setShowing] = useState(false);

    // Variable to show loading state
    const [loading, setLoading] = useState(false);

    // Variables for form values
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");

    // Navigation
    const navigate = useNavigate();

    // RegExps for checking password strength
    const num = /[0-9]/;
    const letCap = /[A-Z]/;
    const letSmall = /[a-z]/;
    const symbol = /[!@#%^&*"'"[\]]/;

    // Function to confirm password's strength
    const isStrong = (pwd) => {
        if(pwd.length > 7 && num.test(pwd) && letCap.test(pwd) && letSmall.test(pwd) && symbol.test(pwd) && !/[ ]/.test(pwd)) {
            return true;
        }

        return false;
    }

    // Function to show and hide password
    const showHide = () => {
        setShowing(prev => !prev);
    }

    // Function to send info to database
    const createAccount = (e) => {
        e.preventDefault();
        if(!isStrong(password)) {
            alert("Please create a strong password to continue");
        }else if(password !== passwordConf) {
            alert("Your passwords do not match. Kindly check and try again");
        }else {
            let data = {
                fullname: fullname,
                email: email,
                phone: phone,
                gender: gender,
                password: password
            };

            setLoading(true);
            axios
                .post('http://localhost:5555/user/signup', data)
                .then(res => {
                    setLoading(false);
                    localStorage.setItem("id", res.data._id);
                    navigate("/dashboard");
                })
                .catch(err => {
                    if(err.response) {
                        alert(`${err.response.data}`);
                    }else {
                        alert("Something went wrong, kindly check your connection and try again");
                    }
                    setLoading(false);
                })
        }
    }

    return (
        <div className='min-h-screen w-full flex'>
            {/* Left side with image and branding */}
            <div className='relative hidden md:flex md:w-1/2 items-center justify-center bg-gray-800'>
                <img src={medicalBg} alt="Medical background" className='absolute h-full w-full object-cover opacity-20' />
                <div className='relative z-10 text-center text-white p-8'>
                    <h1 className='text-5xl font-extrabold mb-4'>CDSS</h1>
                    <p className='text-xl text-gray-300'>Create an account to begin your journey with AI-assisted diagnostics.</p>
                </div>
            </div>

            {/* Right side with the form */}
            <div className='w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-6 sm:p-12'>
                <form onSubmit={createAccount} className='w-full max-w-md space-y-4'>
                    <div className='text-center mb-6'>
                        <h2 className='text-3xl font-bold text-gray-800'>Create Your Account</h2>
                        <p className='mt-2 text-gray-600'>
                            Already have an account? <Link to='/' className='font-semibold text-blue-600 hover:underline'>Log in here</Link>.
                        </p>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="fname" className='text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                        <input type="text" name="fname" id="fname" autoFocus className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition' onChange={(e) => setFullname(e.target.value)} required />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="email" className='text-sm font-medium text-gray-700 mb-1'>Email Address</label>
                        <input type="email" name="email" id="email" className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition' onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="phone" className='text-sm font-medium text-gray-700 mb-1'>Phone Number</label>
                        <input type="tel" name="phone" id="phone" className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition' onChange={(e) => setPhone(e.target.value)} required />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="gender" className='text-sm font-medium text-gray-700 mb-1'>Gender</label>
                        <select name="gender" id="gender" className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition' onChange={(e) => setGender(e.target.value)} required>
                            <option value="">Select Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="password" className='text-sm font-medium text-gray-700 mb-1'>Password</label>
                        <div className='relative flex items-center'>
                            <input type={showing? "text" : "password"} name="password" id="password" className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition' onChange={(e) => setPassword(e.target.value)} required />
                            <button type="button" onClick={showHide} className="absolute right-3 text-gray-500 hover:text-gray-700">
                                {!showing ? <FaEye title='show password' size='1.2em' /> : <FaEyeSlash title='hide password' size='1.2em' />}
                            </button>
                        </div>
                        {password && (
                            <ul className='mt-2 space-y-1'>
                                <PasswordRequirement met={password.length > 7} text="More than 7 characters" />
                                <PasswordRequirement met={num.test(password)} text="Contains a number (0-9)" />
                                <PasswordRequirement met={letCap.test(password)} text="Contains a capital letter (A-Z)" />
                                <PasswordRequirement met={letSmall.test(password)} text="Contains a small letter (a-z)" />
                                <PasswordRequirement met={symbol.test(password)} text="Contains a symbol (!@#...)" />
                                <PasswordRequirement met={!/[ ]/.test(password)} text="Does not contain spaces" />
                            </ul>
                        )}
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="password2" className='text-sm font-medium text-gray-700 mb-1'>Confirm Password</label>
                        <input type="password" name="password2" id="password2" className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition' onChange={(e) => setPasswordConf(e.target.value)} required />
                        {passwordConf.length > 0 && password !== passwordConf && <p className='text-xs text-red-600 mt-1'>Passwords do not match.</p>}
                        {passwordConf.length > 0 && password === passwordConf && <p className='text-xs text-green-600 mt-1'>Passwords match.</p>}
                    </div>

                    <button type="submit" disabled={loading} className='w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center'>
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                <span>Creating Account...</span>
                            </>
                        ) : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    )
}

const PasswordRequirement = ({ met, text }) => (
    <li className={`flex items-center text-xs ${met ? 'text-green-600' : 'text-red-600'}`}>
        {met ? <FaCheck className="mr-2 flex-shrink-0" /> : <FaTimes className="mr-2 flex-shrink-0" />}
        <span>{text}</span>
    </li>
);

export default SignUp