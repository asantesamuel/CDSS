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

export default SelectField