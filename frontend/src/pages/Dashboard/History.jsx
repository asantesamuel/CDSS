import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../../components/loader';
import { MdError } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { BiCaretLeft } from 'react-icons/bi';

const History = () => {

    const id = localStorage.getItem("id");
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/user/get-info/${id}`)
            .then(res => {
                setLoading(false);
                setHistory(res.data.history);
            })
            .catch(err => {
                setLoading(false);
                if(err.response) {
                    alert(err.response.data.message);
                    setError(err.response.data.name);
                }else {
                    alert("Something went wrong. Kindly try again later");
                }
            })
    }, [])

    return (
        <div>
            {loading && (
                <div className='w-full m-10 flex flex-col items-center justify-center'>
                    <Loader>
                        <p className='animate-pulse'>Loading History. Please wait...</p>
                    </Loader>
                </div>
            )}

            {!loading && error==="network" && (
                <div className='w-full p-3 min-h-screen m-auto flex flex-col items-center justify-center gap-4 bg-blue-50'>
                    <BiCaretLeft onClick={() => navigate(-1)} size='4em' className='self-start p-4 cursor-pointer duration-300 hover:text-gray-400' />
                    <MdError size='5em' color='red' />
                    <p className='text-center'>An error occured. Kindly check your connection and try again.</p>
                    <div className='flex flex-row items-center justify-center'>
                        <button className='cursor-pointer p-[17px] bg-blue-500 w-36 duration-300 text-white hover:bg-blue-600 active:translate-y-0.5' onClick={() => location.reload()}>Reload</button>
                    </div>
                </div>
            )}

            {!loading && error==="unknown" && (
                <div className='w-full p-3 min-h-screen m-auto flex flex-col items-center justify-center gap-4 bg-blue-50'>
                    <BiCaretLeft onClick={() => navigate(-1)} size='4em' className='self-start p-4 cursor-pointer duration-300 hover:text-gray-400' />
                    <MdError size='5em' color='red' />
                    <p className='text-center'>An error occured, either because you're not logged in or a poor internet connection</p>
                    <div className='flex flex-row items-center justify-center'>
                        <button className='cursor-pointer p-[17px] bg-blue-500 w-36 duration-300 text-white hover:bg-blue-600 active:translate-y-0.5' onClick={() => location.reload()}>Reload</button>
                        <button className='cursor-pointer p-4 outline outline-blue-500 w-36 duration-300 hover:bg-blue-600 hover:text-white active:translate-y-0.5' onClick={() => navigate("/")}>Go to login</button>
                    </div>
                </div>
            )}

            {!loading && history.length < 1 && (
                <div className='flex flex-col items-center justify-center'>
                    <BiCaretLeft onClick={() => navigate(-1)} size='4em' className='self-start p-4 cursor-pointer duration-300 hover:text-gray-400' />
                    <p className='text-center m-5 text-lg font-semibold'>No scans yet. Scans will be added to history once available.</p>
                    <Link to='/dashboard' className='bg-blue-500 p-3 rounded text-white cursor-pointer duration-300 hover:bg-blue-600'>Go to Dashboard</Link>
                </div>
            )}

            {!loading && history.length > 0 && (
                <>
                    <BiCaretLeft onClick={() => navigate(-1)} size='4em' className='self-start p-4 cursor-pointer duration-300 hover:text-gray-400' />
                    {history.map((history, i) => {
                        return (
                            <div key={i}>
                                
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default History