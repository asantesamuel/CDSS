import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import patterns from '../assets/1311314_414.jpg';
import axios from 'axios';

const SignIn = () => {

    const [showing, setShowing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const showHide = () => {
        let password = document.getElementById("password");
        if(password.type === "password") {
            password.setAttribute("type", "text");
        }else if(password.type === "text") {
            password.setAttribute("type", "password");
        }
        setShowing(!showing);
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
                alert("Login was successful.");
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
        <div className='flex md:flex-row flex-col items-center justify-center'>
            <div className='bg-red-50 w-full md:w-1/2 md:h-dvh'>
                <img src={patterns} alt="Patterns" className='h-48 md:h-full w-full object-cover' />
            </div>

            {/* Actual Form */}
            <form onSubmit={login} className='flex flex-col items-center justify-center gap-4 w-full md:w-1/2 p-8'>
                <h2 className='font-bold text-lg'>Welcome Back!</h2>
                <p className='text-center'><Link to='/signup' className='font-semibold underline text-blue-500'>Create a free account</Link> or login to use <abbr title="Clinic Decision Support System" className='cursor-pointer'>CDSS</abbr>.</p>

                <div className='flex flex-col items-start justify-center w-full'>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" className='outline-1 outline-gray-500 p-1 rounded-xs w-full' onChange={(e) => setEmail(e.target.value)} autoFocus required />
                </div>
                <div className='flex flex-col items-start justify-center w-full'>
                    <label htmlFor="password">Password</label>
                    <div className='flex flex-row items-center justify-between outline-1 outline-gray-500 p-1 rounded-xs w-full'>
                        <input type="password" name="password" id="password" className='p-0 outline-none w-full' onChange={(e) => setPassword(e.target.value)} required />
                        {!showing ? <FaEye className='cursor-pointer' title='show password' size='1.4em' onClick={showHide} /> : <FaEyeSlash className='cursor-pointer' title='hide password' size='1.4em' onClick={showHide} />}
                    </div>
                </div>
                <Link className='text-gray-500 underline self-end -mt-3 duration-300 hover:text-black'>Forgot Password?</Link>

                {loading? <button className='bg-orange-400 w-full p-2 rounded-md text-white font-semibold text-lg cursor-not-allowed duration-300 animate-pulse'>Logging in ...</button> : <button className='bg-orange-400 w-full p-2 rounded-md text-white font-semibold text-lg cursor-pointer duration-300 hover:bg-orange-500 active:translate-y-1'>Log in</button>}
            </form>
        </div>
    )
}

export default SignIn