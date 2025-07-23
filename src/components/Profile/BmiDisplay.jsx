const calculateBmi = (weightKg, heightCm) => {
    if (!weightKg || !heightCm) return 0;
    const heightM = heightCm / 100;
    return (weightKg / (heightM * heightM)).toFixed(1);
};

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

export default BmiDisplay