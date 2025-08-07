import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import medicalBg from '../assets/1311314_414.jpg';
import axios from 'axios';

const SignIn = () => {

    const [showing, setShowing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const showHide = () => {
        setShowing(prev => !prev);
    }

    const login = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        }

        setLoading(true);
        axios
            .post('http://localhost:5555/user/login', data)
            .then(res => {
                localStorage.setItem("id", res.data._id);
                setLoading(false);
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

    return (
        <div className='min-h-screen w-full flex'>
            {/* Left side with image and branding */}
            <div className='relative hidden md:flex md:w-1/2 items-center justify-center bg-gray-800'>
                <img src={medicalBg} alt="Medical background" className='absolute h-full w-full object-cover opacity-20' />
                <div className='relative z-10 text-center text-white p-8'>
                    <h1 className='text-5xl font-extrabold mb-4'>CDSS</h1>
                    <p className='text-xl text-gray-300'>Welcome to the future of clinical decision support. Your expertise, amplified by AI.</p>
                </div>
            </div>

            {/* Right side with the form */}
            <div className='w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-6 sm:p-12'>
                <form onSubmit={login} className='w-full max-w-md space-y-6'>
                    <div className='text-center'>
                        <h2 className='text-3xl font-bold text-gray-800'>Welcome Back!</h2>
                        <p className='mt-2 text-gray-600'>
                            Don't have an account? <Link to='/signup' className='font-semibold text-blue-600 hover:underline'>Sign up here</Link>.
                        </p>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <label htmlFor="email" className='text-sm font-medium text-gray-700 mb-1'>Email Address</label>
                            <input type="email" name="email" id="email" className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition' onChange={(e) => setEmail(e.target.value)} autoFocus required />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="password" className='text-sm font-medium text-gray-700 mb-1'>Password</label>
                            <div className='relative flex items-center'>
                                <input type={showing? "text" : "password"} name="password" id="password" className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition' onChange={(e) => setPassword(e.target.value)} required />
                                <button type="button" onClick={showHide} className="absolute right-3 text-gray-500 hover:text-gray-700">
                                    {!showing ? <FaEye title='show password' size='1.2em' /> : <FaEyeSlash title='hide password' size='1.2em' />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <Link to="/reset-password" className='text-sm text-blue-600 hover:underline float-right'>Forgot Password?</Link>

                    <button type="submit" disabled={loading} className='w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center'>
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                <span>Logging in...</span>
                            </>
                        ) : 'Log In'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignIn