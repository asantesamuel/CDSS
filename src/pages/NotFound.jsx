import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate();
    return (
        <div className='bg-slate-950 min-h-screen flex flex-col items-center justify-center gap-5'>
            <p className='text-white text-9xl font-black'>404</p>
            <p className='font-semibold text-6xl text-white text-center'>PAGE NOT FOUND</p>
            <p className='font-semibold text-lg text-gray-500 text-center'>The page you are looking for is either unavailable, moved or does not exit. Try going back and then continue from there.</p>
            <button type='button' onClick={() => navigate(-1)} className='bg-blue-600 text-white p-2 duration-300 hover:bg-blue-800 cursor-pointer'>Go Back</button>
        </div>
    )
}

export default NotFound