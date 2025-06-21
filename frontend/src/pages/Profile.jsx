import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiCaretLeft, BiUser, BiEnvelope, BiPhone, BiEdit, BiSave } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import {
    FaVenus, FaMars, FaBirthdayCake, FaWeight, FaRulerVertical,
    FaHeartbeat, FaLungs, FaTint
} from 'react-icons/fa';

// Dummy user data for UI demonstration
const dummyUser = {
    fullname: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    gender: 'male',
    // New health data
    dob: '1980-05-15',
    weightKg: 85,
    heightCm: 180,
    medicalHistory: {
        hasDiabetes: true,
        hasHeartDisease: false,
        isSmoker: 'former',
    },
};

// Function to calculate BMI
const calculateBmi = (weightKg, heightCm) => {
    if (!weightKg || !heightCm) return 0;
    const heightM = heightCm / 100;
    return (weightKg / (heightM * heightM)).toFixed(1);
};

const Profile = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(dummyUser);
    const [formData, setFormData] = useState(dummyUser);
    const [isEditing, setIsEditing] = useState(false);

    // No useEffect for fetching data, as we're using dummy data
    // No loading, error, or saving states as per the request for UI only

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const healthFields = ['hasDiabetes', 'hasHeartDisease', 'isSmoker'];

        if (healthFields.includes(name)) {
            setFormData(prev => ({
                ...prev,
                medicalHistory: {
                    ...prev.medicalHistory,
                    [name]: name.startsWith('has') ? (value === 'true') : value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        // Simulate saving changes without backend call
        console.log("Simulating saving changes:", formData);
        setUser(formData); // Update displayed user data
        setIsEditing(false);
        alert('Profile updated successfully (simulated)!');
    };

    const handleCancelEdit = () => {
        setFormData(user); // Reset form data to original user data
        setIsEditing(false);
    };

    // Removed loading and error UI conditions as per the request for UI only

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-start p-4 md:p-6'>
            <div className="w-full max-w-4xl">
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
                                <InfoField label="Date of Birth" name="dob" value={formData.dob} icon={<FaBirthdayCake />} isEditing={isEditing} onChange={handleInputChange} type="date" />
                            </div>
                        </div>

                        {/* Health Profile Section */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-700 mb-4">Health Profile & Vitals</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <InfoField label="Weight (kg)" name="weightKg" value={formData.weightKg} icon={<FaWeight />} isEditing={isEditing} onChange={handleInputChange} type="number" />
                                <InfoField label="Height (cm)" name="heightCm" value={formData.heightCm} icon={<FaRulerVertical />} isEditing={isEditing} onChange={handleInputChange} type="number" />
                                <div className="md:col-span-2">
                                    <BmiDisplay weightKg={formData.weightKg} heightCm={formData.heightCm} />
                                </div>
                            </div>
                        </div>

                        {/* Medical History Section */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-700 mb-4">Medical History</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                <BooleanSelectField label="Diabetes" name="hasDiabetes" value={formData.medicalHistory.hasDiabetes} icon={<FaTint />} isEditing={isEditing} onChange={handleInputChange} />
                                <BooleanSelectField label="Heart Disease" name="hasHeartDisease" value={formData.medicalHistory.hasHeartDisease} icon={<FaHeartbeat />} isEditing={isEditing} onChange={handleInputChange} />
                                <SelectField
                                    label="Smoking Status"
                                    name="isSmoker"
                                    value={formData.medicalHistory.isSmoker}
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
                                    type='button'
                                    onClick={handleCancelEdit}
                                    className='flex items-center gap-2 bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors'
                                >
                                    <MdClose /> Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='flex items-center gap-2 bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-md'
                                >
                                    <BiSave /> Save Changes
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile

// Helper components for cleaner JSX
const InfoField = ({ label, name, value, icon, isEditing, onChange, type = "text", readOnly = false }) => (
    <div className='flex flex-col'>
        <label htmlFor={name} className='text-sm font-semibold text-gray-500 mb-1 flex items-center gap-2'>{icon} {label}</label>
        <div className={`flex items-center p-3 border rounded-lg transition-all duration-300 ${isEditing && !readOnly ? 'bg-white shadow-sm' : 'bg-gray-100'} ${readOnly ? 'cursor-not-allowed text-gray-500' : 'text-gray-800'}`}>
            {isEditing && !readOnly ? (
                <input type={type} id={name} name={name} value={value} onChange={onChange} className='w-full bg-transparent outline-none font-medium' required />
            ) : (
                <p className={`text-gray-800 ${readOnly ? 'text-gray-500' : ''}`}>{value}</p>
            )}
        </div>
        {readOnly && isEditing && <p className="text-xs text-gray-400 mt-1">This field cannot be changed.</p>}
    </div>
);

const GenderField = ({ value, isEditing, onChange }) => (
    <div className='flex flex-col'>
        <label htmlFor='gender' className='text-sm font-semibold text-gray-500 mb-1 flex items-center gap-2'>{!isEditing && value.toLowerCase() === 'male' ? <FaMars /> : <FaVenus />} Gender</label>
        <div className={`flex items-center p-3 border rounded-lg transition-all duration-300 ${isEditing ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
            {isEditing ? (
                <select id='gender' name='gender' value={value} onChange={onChange} className='w-full bg-transparent outline-none font-medium' required>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
            ) : (
                <p className='text-gray-800 capitalize'>{value}</p>
            )}
        </div>
    </div>
);

// New helper component for dropdowns/selects
const SelectField = ({ label, name, value, icon, isEditing, onChange, options }) => (
    <div className='flex flex-col'>
        <label htmlFor={name} className='text-sm font-semibold text-gray-500 mb-1 flex items-center gap-2'>{icon} {label}</label>
        <div className={`flex items-center p-3 border rounded-lg transition-all duration-300 ${isEditing ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
            {isEditing ? (
                <select id={name} name={name} value={value} onChange={onChange} className='w-full bg-transparent outline-none font-medium capitalize' required>
                    {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
            ) : (
                <p className='text-gray-800 capitalize'>{options.find(o => o.value === value)?.label || value}</p>
            )}
        </div>
    </div>
);

// Specific component for Yes/No questions for better UI
const BooleanSelectField = ({ label, name, value, icon, isEditing, onChange }) => {
    if (!isEditing) {
        return (
            <div className={`flex items-center justify-between p-4 rounded-lg ${value ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                <div className="flex items-center gap-3">
                    {icon}
                    <span className="font-semibold">{label}</span>
                </div>
                <span className="font-bold">{value ? 'Yes' : 'No'}</span>
            </div>
        );
    }

    return <SelectField
        label={label}
        name={name}
        value={value}
        icon={icon}
        isEditing={isEditing}
        onChange={onChange}
        options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]}
    />
};

// New helper component to display BMI
const BmiDisplay = ({ weightKg, heightCm }) => {
    const bmi = calculateBmi(weightKg, heightCm);
    const getBmiInfo = (bmi) => {
        if (bmi < 18.5) return { category: 'Underweight', color: 'bg-blue-500', width: 'w-1/4' };
        if (bmi < 25) return { category: 'Normal', color: 'bg-green-500', width: 'w-2/4' };
        if (bmi < 30) return { category: 'Overweight', color: 'bg-yellow-500', width: 'w-3/4' };
        return { category: 'Obese', color: 'bg-red-500', width: 'w-full' };
    };

    const bmiInfo = getBmiInfo(bmi);

    return (
        <div className='flex flex-col p-4 rounded-lg bg-gray-50 border'>
            <div className="flex justify-between items-baseline">
                <label className='text-sm font-semibold text-gray-500 mb-1'>Body Mass Index (BMI)</label>
                <p className='text-2xl font-bold text-gray-800'>{bmi}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className={`${bmiInfo.color} h-2.5 rounded-full transition-all duration-500 ${bmiInfo.width}`}></div>
            </div>
            <div className="text-right mt-1">
                <span className={`text-sm font-bold ${bmiInfo.color.replace('bg-', 'text-')}`}>{bmiInfo.category}</span>
            </div>
        </div>
    );
};