import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
    const [user, setUser] = useState("");
    const [OTP, setOTP] = useState();
    const [wrong, setWrong] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user_id")));
        if(!JSON.parse(localStorage.getItem("user_id"))) {
            alert("Make sure to enter your email to be sent the OTP.");
            navigate(-1);
        }
        // alert(user._id)
    }, [])

    const verify = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .put(`http://localhost:5555/user/verify-otp/${user._id}`, { OTP })
            .then(res => {
                alert(res.data.message);
                navigate("/change-password");
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
    return (
        <div className='fixed top-0 left-0 right-0 min-h-full flex flex-col items-center justify-center'>
            <p className='text-center w-3/4 font-semibold text-gray-600'>An OTP has been sent to your gmail. Enter it here to change your password.</p>
            <div className='flex flex-row items-center justify-center gap-3 text-xl font-bold p-5'>
                <p>{user.email}</p>
                <MdEdit className='cursor-pointer' onClick={() => navigate("/reset-password")} />
            </div>
            <form onSubmit={verify}>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="otp" className="text-sm font-medium text-gray-700 mb-1">OTP</label>
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <input
                                type="number"
                                name="otp"
                                id="otp"
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${!wrong? 'focus:ring-blue-500' : 'focus:ring-red-500'} transition`}
                                onChange={(e) => setOTP(e.target.value)}
                                autoFocus
                                required
                                disabled={loading}
                            />
                            {!loading && 
                                <button
                                    className="p-3 bg-blue-500 text-white cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                >
                                    Verify
                                </button>
                            }
                            {loading && 
                                <button
                                    className="animate-pulse p-3 bg-blue-500 text-white cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                >
                                    Verifying...
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default VerifyOTP