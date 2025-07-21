import React, { useEffect, useRef, useState } from 'react'
import { BiCloudUpload, BiImage, BiTrash } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom'
import Footer from './Footer';
import axios from 'axios';
import ExistingPatientData from './ExistingPatientData';

const PatientProfile = () => {

    const { id } = useParams();

    const dummyResults = {
        result: "Positive",
        severity: "High",
        affectedArea: "Left Hemisphere",
    };

    const doctor_id = localStorage.getItem("id");
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");
    const [results, setResults] = useState(null); // To store scan results

    const inputRef = useRef(null);

    // Clean up the object URL to avoid memory leaks

    

    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreviewUrl(null);
        }
    }, [selectedFile]);

    const isValidFile = (file) => {
        if (!file) return false;
        const extension = file.name.split(".").pop().toLowerCase();
        return ALLOWED_EXTENSIONS.includes(extension);
    };

  const handleFileChange = (file) => {
        if (isValidFile(file)) {
            setSelectedFile(file);
            setError("");
        } else {
            setSelectedFile(null);
            setError("Invalid file type. Please upload a JPG, PNG, or JPEG image.");
        }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleRemoveFile = () => {
        setSelectedFile(null);
        // Also reset the file input
        if (inputRef.current) {
            inputRef.current.value = "";
        }
  };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start p-4">
            <ExistingPatientData />
            <div className="w-full max-w-3xl m-10 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-8">
                {/* <BiCaretLeft
                onClick={() => navigate(-1)}
                size="3em"
                className="cursor-pointer duration-300 hover:text-gray-500 mb-4"
                /> */}

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Upload CCT Scan</h1>
                    <p className="text-md text-gray-500 mt-1">
                        Upload an image for inference
                    </p>
                </div>

            <div
                className={`
                    w-full p-8 border-2 border-dashed rounded-lg text-center transition-colors duration-300
                    ${
                        isDragging
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300 bg-white"
                    }
                    ${selectedFile ? "border-solid" : ""}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>
                <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                    ref={inputRef}
                />

            {!selectedFile ? (
                <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                >
                    <BiCloudUpload
                        className={`text-5xl mb-4 ${
                        isDragging ? "text-blue-600" : "text-gray-400"
                        }`}
                    />
                    <p className="text-lg font-semibold text-gray-700">
                        Drag & Drop your file here
                    </p>
                    <p className="text-sm text-gray-500">or</p>
                    <span className="mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                        Browse File
                    </span>
                    <p className="text-xs text-gray-400 mt-4">
                        Supports: JPG, JPEG, PNG
                    </p>
                </label>
            ) : (
                <div className="flex flex-col items-center">
                    {previewUrl && (
                        <img
                        src={previewUrl}
                        alt="Scan preview"
                        className="max-h-60 rounded-lg mb-4 shadow-md"
                        />
                    )}
                    <div className="flex items-center bg-gray-100 p-2 rounded-md w-full max-w-md">
                        <BiImage className="text-xl text-gray-600 mr-2" />
                        <p className="text-sm text-gray-800 truncate">
                            {selectedFile.name}
                        </p>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={handleRemoveFile}
                            className="flex items-center gap-2 bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors">
                            <BiTrash /> Remove
                        </button>
                        <button
                            onClick={handleUpload}
                            className="bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600 transition-colors">
                            Upload & Analyze
                        </button>
                    </div>
                </div>
            )}
            {/* Display results after upload */}
            {results && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-lg w-full max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
                        Analysis Results
                    </h2>
                    <div className="space-y-4">
                        <ResultItem label="Result" value={results.result} />
                        <ResultItem label="Severity" value={results.severity} />
                        <ResultItem label="Affected Area" value={results.affectedArea} />

                        {/* Placeholder for your brain visualization */}
                        <div className="bg-gray-100 p-5 rounded-lg text-center">
                            <p className="text-gray-500">
                                Brain visualization would appear here (simulated).
                            </p>
                        </div>
                    </div>
                </div>
            )}
            </div>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
        
        <Footer />
    </div>
    )
}

const ResultItem = ({ label, value }) => (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
        <span className="text-gray-600 font-medium">{label}:</span>
        <span className="font-semibold text-blue-600">{value}</span>
    </div>
);

export default PatientProfile