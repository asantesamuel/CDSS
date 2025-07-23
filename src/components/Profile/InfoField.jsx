import React from 'react';

const InfoField = ({ label, name, value, icon, isEditing, onChange, type = "text", readOnly = false }) => (
    <div className='flex flex-col'>
        <label htmlFor={name} className='text-sm font-semibold text-gray-500 mb-1 flex items-center gap-2'>{icon} {label}</label>
        <div className={`flex items-center p-3 border rounded-lg transition-all duration-300 ${isEditing && !readOnly ? 'bg-white shadow-sm' : 'bg-gray-100 cursor-not-allowed'} ${readOnly ? 'cursor-not-allowed text-gray-500' : 'text-gray-800'}`}>
            {isEditing && !readOnly ? (
                <input type={type} id={name} name={name} value={value} onChange={onChange} className='w-full bg-transparent outline-none font-medium' required />
            ) : (
                <p className={`text-gray-800 ${readOnly ? 'text-gray-500' : ''}`}>{value}</p>
            )}
        </div>
        {readOnly && isEditing && <p className="text-xs text-gray-400 mt-1">This field cannot be changed.</p>}
    </div>
);

export default InfoField