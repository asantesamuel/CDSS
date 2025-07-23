import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [showing, setShowing] = useState("");
    const [wrong, setWrong] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focus, setFocus] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user_id")));
        // alert(user._id)
    }, [])

    const change = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .put(`http://localhost:5555/user/change-password/${user._id}`, { password, password2 })
            .then(res => {
                alert(res.data.message);
                navigate("/");
                setLoading(false);
            })
            .catch(err => {
                if(err.response) {
                    alert(err.response.data.message);
                }else {
                    alert("Something went wrong. Kindly try again later.");
                }
                setLoading(false);
            })
    }

    const check_password = (password) => {
        if(/[0-9]/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 8) {
            return true;
        }
         return false;
    }

    return (
        <div className='fixed top-0 left-0 right-0 min-h-full flex flex-col items-center justify-center'>
            <form onSubmit={change} className='w-10/12' autoComplete='off'>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <div className={`flex flex-row items-center justify-center gap-2 border border-gray-300 rounded-lg ${focus && 'outline-none ring-2 ring-blue-500'} transition p-3`}>
                            <input
                                type={showing ? 'text' : 'password'}
                                name="password"
                                id="password"
                                className="w-full outline-none"
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                                required
                                onFocus={() => setFocus(true)}
                                onBlur={() => setFocus(false)}
                            />
                            {!showing && <FaRegEye size='1.5em' className='cursor-pointer' onClick={() => setShowing(true)} />}
                            {showing && <FaRegEyeSlash size='1.5em' className='cursor-pointer' onClick={() => setShowing(false)} />}
                        </div>
                        <ul className='list-disc list-inside'>
                            {password.length > 0 && password.length < 8 && <li className='text-sm text-red-500'>Password must contain at least 8 characters</li>}
                            {password.length > 0 && !/[0-9]/.test(password) && <li className='text-sm text-red-500'>Password must contain at least one number</li>}
                            {password.length > 0 && !/[A-Z]/.test(password) && <li className='text-sm text-red-500'>Password must contain at least one uppercase letter</li>}
                            {password.length > 0 && !/[a-z]/.test(password) && <li className='text-sm text-red-500'>Password must contain at least one lowercase letter</li>}
                            {check_password(password) && <li className='text-sm text-green-500'>Password meets all requirements.</li>}
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password2" className="text-sm font-medium text-gray-700 mb-1">Repeat Password</label>
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <input
                                type="password"
                                name="password2"
                                id="password2"
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${!wrong? 'focus:ring-blue-500' : 'focus:ring-red-500'} transition`}
                                onChange={(e) => setPassword2(e.target.value)}
                                required
                            />
                        </div>
                        <ul className='list-disc list-inside'>
                            {password2.length > 0 && password !== password2 && <li className='text-sm text-red-500'>Passwords do not match.</li>}
                            {/* {password2.length > 0 && password === password2 && <li className='text-sm text-green-500'>Password meets all requirements.</li>} */}
                        </ul>
                    </div>
                    <div className='w-full'>
                        {!loading && 
                                <button
                                    className="w-1/2 p-3 bg-blue-500 text-white cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    type='submit'
                                >
                                    Verify
                                </button>
                            }
                            {loading && 
                                <button
                                    className="animate-pulse w-1/2 p-3 bg-blue-500 text-white cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    type='button'
                                >
                                    Verifying...
                                </button>
                            }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword