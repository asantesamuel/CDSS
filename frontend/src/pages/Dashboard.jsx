import React, { useEffect, useState } from 'react'
import { BsImage, BsInfoCircle, BsPerson, BsPlus } from 'react-icons/bs'
import { MdClose, MdError, MdHistory, MdIosShare, MdMenu, MdPerson } from 'react-icons/md'
import { CiLogout, CiStethoscope } from 'react-icons/ci'
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Loader from '../components/loader'

const Dashboard = () => {

    const date = new Date();
    let hour = date.getHours();

    const [image, setImage] = useState(null);
    const [sideOpened, setSideOpened] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const id = localStorage.getItem("id");
    const [data, setData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/user/get-info/${id}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
                setError("");
            })
            .catch(err => {
                if(err.response) {
                    alert(err.response.data.message);
                    setError(err.response.data.name);
                }else {
                    alert("An error occured. Kindly check your connection and try again");
                    setError("network");
                }
                setLoading(false);
            })
    }, []);

    return (
        <div className='flex flex-col items-center justify-center'>

            {/* Display load spinner while loading */}
            {loading && (
                <div className='w-full m-10 flex flex-col items-center justify-center'>
                    <Loader>
                        <p className='animate-pulse'>Loading. Please wait...</p>
                    </Loader>
                </div>
            )}

            {!loading && error==="network" && (
                <div className='w-full p-3 min-h-screen m-auto flex flex-col items-center justify-center gap-4 bg-primary-50'>
                    <MdError size='5em' color='red' />
                    <p className='text-center'>An error occured. Kindly check your connection and try again.</p>
                    <div className='flex flex-row items-center justify-center'>
                        <button className='cursor-pointer p-[17px] bg-primar-6from-primary-600 w-36 duration-300 text-white-1 hover:bg-primary-900 active:translate-y-0.5' onClick={() => location.reload()}>Reload</button>
                    </div>
                </div>
            )}

            {!loading && error==="unknown" && (
                <div className='w-full p-3 min-h-screen m-auto flex flex-col items-center justify-center gap-4 bg-primary-50'>
                    <MdError size='5em' color='red' />
                    <p className='text-center'>An error occured, either because you're not logged in or a poor internet connection</p>
                    <div className='flex flex-row items-center justify-center'>
                        <button className='cursor-pointer p-[17px] bg-primar-6from-primary-600 w-36 duration-300 text-white-1 hover:bg-primary-900 active:translate-y-0.5' onClick={() => location.reload()}>Reload</button>
                        <button className='cursor-pointer p-4 outline outline-primar-6from-primary-600 w-36 duration-300 hover:bg-primary-900 hover:text-white-1 active:translate-y-0.5' onClick={() => navigate("/")}>Go to login</button>
                    </div>
                </div>
            )}

            {!loading && data && (
                <div className='flex flex-col items-center justify-start bg-primary-50 min-h-screen gap-5 pt-5 w-full'>
                    
                    {/* Button to open sidebar */}
                    <MdMenu size='1.7em' className='hidden sm:block m-2 self-start cursor-pointer duration-150 hover:text-gray-500' title='Open Sidebar' onClick={() => setSideOpened(true)} />

                    {/* 
                        Side bar start
                        Doesn't show for mobile devices
                    */}
                    {sideOpened && (
                        <div className='bg-primary-900 min-h-screen fixed top-0 left-0 hidden sm:flex flex-col items-center justify-start w-72 z-50'>
                            <MdClose size='1.7em' className='self-end cursor-pointer duration-200 text-white-1 active:text-gray-400 m-2' onClick={() => setSideOpened(false)} />

                            {/* Menu Items */}
                            <div className='mt-5 w-full flex flex-col items-center justify-center'>
                                <Link onClick={() => setSideOpened(false)} to='upload' className='text-white-1 w-full p-3 flex flex-row items-center justify-start gap-3 duration-300 hover:bg-primary-600'>
                                    <BsImage size='1.4em' />
                                    <p>Upload Image</p>
                                </Link>
                                <Link onClick={() => setSideOpened(false)} to='history' className='text-white-1 w-full p-3 flex flex-row items-center justify-start gap-3 duration-300 hover:bg-primary-600'>
                                    <MdHistory size='1.4em' />
                                    <p>History</p>
                                </Link>
                                <Link onClick={() => setSideOpened(false)} to='/description' className='text-white-1 w-full p-3 flex flex-row items-center justify-start gap-3 duration-300 hover:bg-primary-600'>
                                    <BsInfoCircle size='1.4em' />
                                    <p>App Description</p>
                                </Link>
                            </div>

                            <div className='flex flex-col items-center justify-center absolute bottom-2 w-11/12'>
                                <button className='bg-white font-bold text-black-1 p-2.5 rounded-full w-full cursor-pointer duration-300 hover:bg-red-600 active:translate-y-0.5 flex flex-row items-center justify-center gap-3' onClick={() => {localStorage.removeItem("id"), alert("Logout successful."), navigate("/")}}>
                                    <CiLogout size='1.3em' />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Side bar end */}

                    <h1 className='font-extrabold text-xl'><CiStethoscope className='inline' size='1.5em' /> Clinic Decision Support System</h1>
                    
                    {hour >= 0 && hour < 12 && <p className='font-semibold'>Good Morning <span className='text-primary-900'>{data.fullname}</span></p>}
                    {hour >= 12 && hour < 18 && <p className='font-semibold'>Good Afternoon <span className='text-primary-900'>{data.fullname}</span></p>}
                    {hour >= 18 && hour < 24 && <p className='font-semibold'>Good Evening <span className='text-primary-900'>{data.fullname}</span></p>}

                    {/* Dashboard cards */}
                    <div className='w-full p-4 sm:p-2 flex flex-row items-center justify-center gap-2 flex-wrap'>
                        <Link to='upload' className='relative bg-gradient-to-r from-primary-600 to-primary-200 text-white-1 p-5 w-full sm:w-1/4 grow h-24 flex items-center justify-start rounded duration-300 sm:hover:to-primary-400 sm:hover:shadow-md active:translate-y-0.5'>
                            <p>Upload Image</p>
                            <BsImage color='white' size='3em' className='bg-primary-900 h-full absolute right-0 top-0 rounded-tl-full rounded-bl-full p-3' />
                        </Link>
                        <Link to='history' className='relative bg-gradient-to-r from-primary-600 to-primary-200 text-white-1 p-5 w-full sm:w-1/4 grow h-24 flex items-center justify-start rounded duration-300 sm:hover:to-primary-400 sm:hover:shadow-md active:translate-y-0.5'>
                            <p>History</p>
                            <MdHistory color='white' size='3em' className='bg-primary-900 h-full absolute right-0 top-0 rounded-tl-full rounded-bl-full p-3' />
                        </Link>
                        <Link to='upload' className='relative bg-gradient-to-r from-primary-600 to-primary-200 text-white-1 p-5 w-full sm:w-1/4 grow h-24 flex items-center justify-start rounded duration-300 sm:hover:to-primary-400 sm:hover:shadow-md active:translate-y-0.5'>
                            <p>Description</p>
                            <BsInfoCircle color='white' size='3em' className='bg-primary-900 h-full absolute right-0 top-0 rounded-tl-full rounded-bl-full p-3' />
                        </Link>
                        <Link to='/profile' className='relative bg-gradient-to-r from-primary-600 to-primary-200 text-white-1 p-5 w-full sm:w-1/4 grow h-24 flex items-center justify-start rounded duration-300 sm:hover:to-primary-400 sm:hover:shadow-md active:translate-y-0.5'>
                            <p>Profile</p>
                            <MdPerson color='white' size='3em' className='bg-primary-900 h-full absolute right-0 top-0 rounded-tl-full rounded-bl-full p-3' />
                        </Link>
                    </div>

                    {/* Logout button for mobile devices */}
                    <button className='bg-primary-600 font-bold text-white-1 p-2.5 rounded-full w-10/12 cursor-pointer duration-300 hover:bg-primary-900 active:translate-y-0.5 sm:hidden' onClick={() => {localStorage.removeItem("id"), alert("Logout successful."), navigate("/")}}>Logout</button>
                </div>
            )}

        </div>
    )
}

export default Dashboard