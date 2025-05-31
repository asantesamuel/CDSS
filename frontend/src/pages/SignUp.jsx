import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import patterns from '../assets/1311314_414.jpg';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import axios from 'axios';

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
    const symbol = /[!@#%^&*"'"\[\]]/;

    // Function to confirm password's strength
    const isStrong = (pwd) => {
        if(pwd.length > 7 && num.test(pwd) && letCap.test(pwd) && letSmall.test(pwd) && symbol.test(pwd) && !/[ ]/.test(pwd)) {
            return true;
        }

        return false;
    }

    // Function to show and hide password
    const showHide = () => {
        let password = document.getElementById("password");
        if(password.type == "password") {
            password.setAttribute("type", "text");
        }else if(password.type == "text") {
            password.setAttribute("type", "password");
        }
        setShowing(!showing);
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
                    alert("Account was created successfully");
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
        <div className='flex md:flex-row flex-col items-center justify-center'>
            <div className='w-full md:w-1/2 md:h-dvh'>
                <img src={patterns} alt="Patterns" className='h-40 md:h-full w-full object-cover' />
            </div>

            {/* Actual Form */}
            <form onSubmit={createAccount} className='flex flex-col items-center justify-center gap-4 w-full md:w-1/2 p-8'>
                <h2 className='font-bold text-2xl'><abbr title="Clinic Decision Support System" className='cursor-pointer'>CDSS</abbr> Sign Up</h2>
                <p className='text-center'><Link to='/' className='font-semibold underline text-blue-500'>Login to your account</Link> or create a new one here.</p>

                {/* fname => fullname */}
                <div className='flex flex-col items-start justify-center w-full'>
                    <label htmlFor="fname" className='text-lg font-semibold cursor-pointer'>Fullname</label>
                    <input type="text" name="fname" id="fname" autoFocus className='outline-1 outline-gray-500 p-1 rounded-xs w-full font-semibold' onChange={(e) => setFullname(e.target.value)} required />
                </div>

                <div className='flex flex-col items-start justify-center w-full'>
                    <label htmlFor="email" className='text-lg font-semibold cursor-pointer'>Email Address</label>
                    <input type="email" name="email" id="email" className='outline-1 outline-gray-500 p-1 rounded-xs w-full font-semibold' onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className='flex flex-col items-start justify-center w-full'>
                    <label htmlFor="phone" className='text-lg font-semibold cursor-pointer'>Phone Number</label>
                    <input type="tel" name="phone" id="phone" className='outline-1 outline-gray-500 p-1 rounded-xs w-full font-semibold' onChange={(e) => setPhone(e.target.value)} required />
                </div>

                <div className='flex flex-col items-start justify-center w-full'>
                    <label htmlFor="gender" className='text-lg font-semibold cursor-pointer'>Gender</label>
                    <select name="gender" id="gender" className='outline-1 outline-gray-500 p-1 rounded-xs w-full font-semibold' onChange={(e) => setGender(e.target.value)} required>
                        <option value="" className='text-gray-500'>Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>

                <div className='flex flex-col items-start justify-center w-full'>
                    <label htmlFor="password" className='text-lg font-semibold cursor-pointer'>Password</label>
                    <div className='flex flex-row items-center justify-between outline-1 outline-gray-500 p-1 rounded-xs w-full font-semibold'>
                        <input type="password" name="password" id="password" className='p-0 outline-none w-full' onChange={(e) => setPassword(e.target.value)} required />
                        {!showing ? <FaRegEye className='cursor-pointer' title='show password' size='1.4em' onClick={showHide} /> : <FaRegEyeSlash className='cursor-pointer' title='hide password' size='1.4em' onClick={showHide} />}
                    </div>
                    <ul className='list-disc list-inside'>
                        {password.length <= 7 && <li className='text-xs text-red-600 italic'>Password must be more than 7 charracters</li>}
                        {!num.test(password) && <li className='text-xs text-red-600 italic'>Password must contain a number</li>}
                        {!letCap.test(password) && <li className='text-xs text-red-600 italic'>Password must contain a capital letter</li>}
                        {!letSmall.test(password) && <li className='text-xs text-red-600 italic'>Password must contain a small letter</li>}
                        {!symbol.test(password) && <li className='text-xs text-red-600 italic'>Password must contain any of (!@#%^&*"'"[ ])</li>}
                        {/[ ]/.test(password) && <li className='text-xs text-red-600 italic'>Password should not contain a space</li>}
                        {isStrong(password) && <li className='text-xs text-green-700'>Password matches all app standards</li>}
                    </ul>
                </div>

                <div className='flex flex-col items-start justify-center w-full'>
                    <label htmlFor="password2" className='text-lg font-semibold cursor-pointer'>Confirm Password</label>
                    <div className='flex flex-row items-center justify-between outline-1 outline-gray-500 p-1 rounded-xs w-full font-semibold'>
                        <input type="password" name="password2" id="password2" className='p-0 outline-none w-full' onChange={(e) => setPasswordConf(e.target.value)} required />
                        {/* {!showing ? <AiOutlineEye className='cursor-pointer' title='show password' size='1.4em' onClick={showHide} /> : <AiOutlineEyeInvisible className='cursor-pointer' title='hide password' size='1.4em' onClick={showHide} />} */}
                    </div>
                    <ul className='list-disc list-inside'>
                        {passwordConf.length !== 0 && password !==passwordConf && <li className='text-xs text-red-600 italic'>Passwords do not match</li>}
                        {passwordConf.length !== 0 && password ===passwordConf && <li className='text-xs text-green-600 italic'>Passwords match</li>}
                    </ul>
                </div>

                {loading? <button className='bg-orange-400 w-full p-2 rounded-md text-white font-semibold text-lg cursor-not-allowed duration-300 animate-pulse'>Creating Account ...</button> : <input type='submit' value="Create Account" className='bg-orange-400 w-full p-2 rounded-md text-white font-semibold text-lg cursor-pointer duration-300 hover:bg-orange-500 active:translate-y-1' />}
            </form>
        </div>
    )
}

export default SignUp