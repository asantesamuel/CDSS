import { FaMars, FaVenus } from "react-icons/fa";

const GenderField = ({ value, isEditing, onChange }) => (
    <div className='flex flex-col'>
        <label htmlFor='gender' className='text-sm font-semibold text-gray-500 mb-1 flex items-center gap-2'>{!isEditing && value.toLowerCase() === 'male' ? <FaMars /> : <FaVenus />} Gender</label>
        <div className={`flex items-center p-3 border rounded-lg transition-all duration-300 ${isEditing ? 'bg-white shadow-sm' : 'bg-gray-100 cursor-not-allowed'}`}>
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

export default GenderField