import React from 'react'
import InfoField from '../components/Profile/InfoField'
import GenderField from '../components/Profile/GenderField'
import { Link, useNavigate } from 'react-router-dom';
import { BiCaretLeft, BiEdit, BiEnvelope, BiPhone, BiSave, BiTrash, BiUser } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Loader from '../components/Loader';

const Profile = () => {
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [user, setUser] = useState(null);
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);

    const id = localStorage.getItem("id");

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/user/get-info/${id}`)
            .then(res => {
                setDoctor(res.data);
                setFormData(res.data);
                setUser(res.data);
                setLoading(false);
                setLoading3(true);

                axios
                    .get(`http://localhost:5555/user/patients/${id}`)
                    .then(res => {
                        setPatients(res.data);
                        setLoading3(false);
                    })
                    .catch(err => {
                        setLoading3(false);
                        alert("Something went wrong. Kindly ")
                    })
            })
            .catch(err => {
                if(err.response) {
                    alert(err.response.data.message);
                }else {
                    alert("Something went wrong. Kindly try again later.");
                }
                setLoading(false);
                console.log(err)
            })
    }, [])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();

        setLoading2(true);
        axios
            .put(`http://localhost:5555/user/update/${id}`, formData)
            .then(res => {
                setUser(res.data);
                setIsEditing(false);
                setLoading2(false);
            })
            .catch(err => {
                alert("Something went wrong. Kindly try again later.");
                setLoading2(false);
            })
    };

    const handleCancelEdit = () => {
        setFormData(user); // Reset form data to original user data
        setIsEditing(false);
    };

    const deletePatient = (id, name) => {
        let conf = confirm(`Are you sure you want to delete ${name}'s data? This action cannot be undone.`);

        if(conf) {
            axios
                .delete(`http://localhost:5555/user/patient/delete/${id}`)
                .then(res => {
                    alert("Action successful.")
                    location.reload();
                })
                .catch(err => {
                    alert("Action could not be completed. Kindly try again later.");
                })
        }else {
            alert("Nope")
        }
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-start p-4 md:p-6 w-full'>
            {loading && <Loader />}
            {!loading && user && (
                <div className="w-full max-w-5xl">
                    <BiCaretLeft onClick={() => navigate(-1)} size='3em' className='cursor-pointer duration-300 hover:text-gray-500 mb-4' />

                    <div className='bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-8'>
                        <div className='flex flex-col md:flex-row items-center justify-between mb-6 border-b pb-6'>
                            <div className='flex items-center'>
                                {/* Profile Picture Placeholder */}
                                <div className='relative w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-5xl font-bold mr-5 ring-4 ring-white/50'>
                                    {user.fullname.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h1 className='text-3xl font-bold text-gray-800'>{user.fullname}</h1>
                                    <p className='text-md text-gray-600 flex items-center gap-1'><BiEnvelope /> {user.email}</p>
                                </div>
                            </div>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className='mt-4 md:mt-0 flex items-center gap-2 bg-blue-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md'
                                >
                                    <BiEdit /> Edit Profile
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSaveChanges} className="space-y-8">
                            {/* Personal Information Section */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-700 mb-4">Personal Information</h2>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    <InfoField label="Full Name" name="fullname" value={formData.fullname} icon={<BiUser />} isEditing={isEditing} onChange={handleInputChange} />
                                    <InfoField label="Email Address" name="email" value={user.email} icon={<BiEnvelope />} isEditing={false} readOnly />
                                    <InfoField label="Phone Number" name="phone" value={formData.phone} icon={<BiPhone />} isEditing={isEditing} onChange={handleInputChange} type="tel" />
                                    <GenderField value={formData.gender} isEditing={isEditing} onChange={handleInputChange} />
                                </div>
                            </div>

                            {isEditing && (
                                <div className='flex justify-end gap-4 pt-6 border-t mt-4'>
                                    <button
                                        type='button'
                                        onClick={handleCancelEdit}
                                        className='flex items-center gap-2 bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors'
                                    >
                                        <MdClose /> Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        className={`flex items-center gap-2 bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-md ${loading2 && 'animate-pulse'}`}
                                    >
                                        <BiSave /> {loading2? "Saving Changes..." : "Save Changes"}
                                    </button>
                                </div>
                            )}
                        </form>

                        <div className='mt-5' id='patients'>
                            <h2 className="text-xl font-bold text-gray-700 mb-4">List of Patients</h2>
                            {loading3 && <Loader>Loading Patients...</Loader>}
                            {patients && patients.length > 0 && (
                                <>
                                    {patients.map((patient, i) => {
                                        return (
                                            <div key={patient._id} className='rounded shadow-md shadow-gray-300 m-1 flex flex-row justify-between items-center'>
                                                <Link to={`/dashboard/patient/${patient._id}`} className='w-full p-4'>
                                                    <p>{i+1}. {patient.fullname}</p>
                                                </Link>
                                                <BiTrash onClick={() => deletePatient(patient._id, patient.fullname)} className='cursor-pointer duration-300 hover:scale-[1.2] p-2' size='2em' color='tomato' />
                                            </div>
                                        )
                                    })}
                                </>
                            )}
                            {patients && patients.length < 1 && <p>No patients added yet</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile