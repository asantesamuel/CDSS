import SelectField from "./SelectField";

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
        options={[value ? { value: 'true', label: 'Yes' } : { value: 'false', label: 'No' }, value ? { value: 'false', label: 'No' } : { value: 'true', label: 'Yes' }]}
    />
};

export default BooleanSelectField