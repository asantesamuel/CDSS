import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiCaretLeft } from 'react-icons/bi';
import { FaBrain, FaFileUpload, FaUserMd, FaHistory, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import { CiStethoscope } from 'react-icons/ci';
import { GoLaw } from "react-icons/go";
import { VscBeaker, VscHistory } from "react-icons/vsc";

const Description = () => {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-start p-4 md:p-6'>
            <div className="w-full max-w-4xl">
                <BiCaretLeft onClick={() => navigate(-1)} size='3em' className='cursor-pointer duration-300 hover:text-gray-500 mb-4' />

                <div className='bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-8'>
                    <header className="text-center mb-10 border-b-2 border-blue-200 pb-6">
                        <h1 className='text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3'>
                            <CiStethoscope className='text-blue-600' />
                            Clinic Decision Support System
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            An AI-Powered Assistant for Early Stroke Detection
                        </p>
                    </header>

                    <main className="space-y-12 text-gray-700">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">About The Application</h2>
                            <p className="text-center max-w-3xl mx-auto">
                                This Clinical Decision Support System (CDSS) is a sophisticated tool designed to assist healthcare professionals in the early detection of strokes. By analyzing Cerebral Computed Tomography (CCT) scans with a powerful machine learning model, our application provides rapid, data-driven insights to support timely and accurate clinical assessments.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">A Simple 3-Step Process</h2>
                            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                                <StepCard icon={<FaFileUpload />} number="1" title="Upload Scan" description="Securely upload a CCT scan image via our intuitive interface." />
                                <StepCard icon={<VscBeaker />} number="2" title="Analyze Image" description="Our AI model processes the image to identify potential stroke indicators." />
                                <StepCard icon={<VscHistory />} number="3" title="Review Results" description="Receive prompt analysis to aid in your professional diagnosis." />
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Core Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FeatureItem icon={<FaUserMd />} title="Secure User Profiles" description="Manage your personal and health-related information in a secure, private profile." />
                                <FeatureItem icon={<FaHistory />} title="Comprehensive History" description="Keep track of all previous uploads and analyses for easy reference and follow-up." />
                                <FeatureItem icon={<FaBrain />} title="Advanced AI Analysis" description="Leverage a state-of-the-art model trained for high-accuracy stroke detection." />
                                <FeatureItem icon={<FaShieldAlt />} title="Data Privacy & Security" description="We prioritize your privacy. All data is handled with the utmost security and confidentiality." />
                            </div>
                        </section>

                        <section className="mt-12 p-5 border-l-4 border-red-500 bg-red-50 rounded-r-lg shadow-inner">
                            <h3 className="text-xl font-bold text-red-800 flex items-center gap-2"><FaExclamationTriangle /> Important Medical Disclaimer</h3>
                            <p className="text-red-700 mt-2">
                                This application is intended for use as a clinical decision support tool for trained medical professionals only. It is <strong className="font-semibold">NOT</strong> a substitute for professional medical diagnosis, advice, or treatment. The results provided by the model are for informational purposes and must always be verified by a qualified radiologist or physician.
                            </p>
                        </section>
                    </main>

                    <footer className="text-center mt-12 pt-6 border-t border-gray-200">
                        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                            <GoLaw /> &copy; {new Date().getFullYear()} CDSS Project. All Rights Reserved.
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Unauthorized reproduction or distribution of this application, or any portion of it, is strictly prohibited and may result in severe civil and criminal penalties.
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

// Helper component for the 3-step process
const StepCard = ({ icon, number, title, description }) => (
    <div className="flex flex-col items-center text-center max-w-xs">
        <div className="relative flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full text-blue-600 mb-4">
            {React.cloneElement(icon, { size: '2.5em' })}
            <span className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-blue-600 text-white font-bold text-sm rounded-full border-2 border-white">{number}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
    </div>
);

// Helper component for feature items
const FeatureItem = ({ icon, title, description }) => (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex-shrink-0 text-blue-600">
            {React.cloneElement(icon, { size: '2em' })}
        </div>
        <div>
            <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

export default Description;