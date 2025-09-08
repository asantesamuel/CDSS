import React from 'react'
import { MdErrorOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const ErrorComponent = ({ children }) => {

    const navigate = useNavigate();

    return (
        <div className='min-h-screen -m-4 w-full flex flex-col items-center justify-center gap-3 text-lg font-semibold'>
            <MdErrorOutline size='4em' color='red' />
            {children}
            <div>
                <button onClick={() => location.reload()} className='bg-blue-500 text-white py-3 px-5 cursor-pointer duration-300 hover:bg-blue-600 active:translate-y-0.5'>Reload</button>
                <button onClick={() => navigate('/')} className='text-blue-500 outline-2 outline-blue-500 py-2.5 px-5 cursor-pointer duration-300 hover:bg-blue-600 hover:text-white hover:outline-blue-600 active:translate-y-0.5'>Login</button>
            </div>
        </div>
    )
}

export default ErrorComponent