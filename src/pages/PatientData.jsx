import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiCaretLeft, BiUser, BiPhone, BiEdit, BiSave } from 'react-icons/bi';
import { FaBirthdayCake, FaWeight, FaRulerVertical, FaHeartbeat, FaLungs, FaTint } from 'react-icons/fa';
import InfoField from '../components/Profile/InfoField';
import GenderField from '../components/Profile/GenderField';
import SelectField from '../components/Profile/SelectField';
import BmiDisplay from '../components/Profile/BmiDisplay';
import BooleanSelectField from '../components/Profile/BooleanSelectField';
import axios from 'axios';

const PatientData = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        doctor: localStorage.getItem("id"),
        fullname: "",
        phone: "",
        gender: "male",
        birth_date: "",
        weight: "",
        height: "",
        medical_history: {
            diabetes: false,
            heart: false,
            smoker: 'never',
        },
    });
    const [user, setUser] = useState(formData);
    const [isEditing, setIsEditing] = useState(true);
    const [loading, setLoading] = useState(false);

    // No useEffect for fetching data, as we're using dummy data
    // No loading, error, or saving states as per the request for UI only

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const healthFields = ['diabetes', 'heart', 'smoker'];

        if (healthFields.includes(name)) {
            setFormData(prev => ({
                ...prev,
                medical_history: {
                    ...prev.medical_history,
                    [name]: name.startsWith('has') ? (value === 'true') : value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        
        setLoading(true);
        axios
            .post('http://localhost:5555/user/patient/add', formData)
            .then(res => {
                alert("Patient added. Kindly proceed to upload CCT scan.");
                navigate(`/dashboard/patient/${res.data._id}`);
                setLoading(false);
            })
            .catch(err => {
                if(err.response) {
                    alert(err.response.data);
                    setLoading(false);
                }else {
                    alert("Something went wrong. Kindly try again later.");
                }
                setLoading(false);
            })
    };

    // Removed loading and error UI conditions as per the request for UI only

    return (
        <div className='min-h-screen flex flex-col items-center justify-start p-4 md:p-6 w-full'>
            <div className="w-full max-w-5xl">
                <BiCaretLeft onClick={() => navigate(-1)} size='3em' className='cursor-pointer duration-300 hover:text-gray-500 mb-4' />

                <div className='bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-8'>
                    <form onSubmit={handleSaveChanges} className="space-y-8">
                        {/* Personal Information Section */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-700 mb-4">Personal Information</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <InfoField label="Full Name" name="fullname" value={formData.fullname} icon={<BiUser />} isEditing={isEditing} onChange={handleInputChange} />
                                <InfoField label="Phone Number" name="phone" value={formData.phone} icon={<BiPhone />} isEditing={isEditing} onChange={handleInputChange} type="tel" />
                                <GenderField value={formData.gender} isEditing={isEditing} onChange={handleInputChange} />
                                <InfoField label="Date of Birth" name="birth_date" value={formData.birth_date} icon={<FaBirthdayCake />} isEditing={isEditing} onChange={handleInputChange} type="date" />
                            </div>
                        </div>

                        {/* Health Profile Section */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-700 mb-4">Health Profile & Vitals</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <InfoField label="Weight (kg)" name="weight" value={formData.weight} icon={<FaWeight />} isEditing={isEditing} onChange={handleInputChange} type="number" />
                                <InfoField label="Height (cm)" name="height" value={formData.height} icon={<FaRulerVertical />} isEditing={isEditing} onChange={handleInputChange} type="number" />
                                <div className="md:col-span-2">
                                    <BmiDisplay weightKg={formData.weight} heightCm={formData.height} />
                                </div>
                            </div>
                        </div>

                        {/* Medical History Section */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-700 mb-4">Medical History</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                <BooleanSelectField label="Diabetes" name="diabetes" value={formData.medical_history.diabetes} icon={<FaTint />} isEditing={isEditing} onChange={handleInputChange} />
                                <BooleanSelectField label="Heart Disease" name="heart" value={formData.medical_history.heart} icon={<FaHeartbeat />} isEditing={isEditing} onChange={handleInputChange} />
                                <SelectField
                                    label="Smoking Status"
                                    name="smoker"
                                    value={formData.medical_history.smoker}
                                    icon={<FaLungs />}
                                    isEditing={isEditing}
                                    onChange={handleInputChange}
                                    options={[
                                        { value: 'never', label: 'Never Smoked' },
                                        { value: 'current', label: 'Current Smoker' },
                                        { value: 'former', label: 'Former Smoker' }
                                    ]}
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <div className='flex justify-end gap-4 pt-6 border-t mt-4'>
                                <button
                                    type='submit'
                                    className={`flex items-center gap-2 bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-md ${loading && 'animate-pulse'}`}
                                >
                                    <BiSave /> {loading? "Adding Patient": "Add Patient"}
                                </button>
                            </div>
                        )}
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className='mt-4 md:mt-0 flex items-center gap-2 bg-blue-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md'
                            >
                                <BiEdit /> Add Another Patient
                            </button>
                        )}
                    </form>
                </div>
            </div>
        
        </div>
    )
}

export default PatientData


// New helper component for dropdowns/selects


