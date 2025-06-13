import axios from 'axios';
import React, { useState } from 'react'
import './Upload.css'
import { useNavigate } from 'react-router-dom';
import { BiCaretLeft } from 'react-icons/bi'

const Upload = () => {

    const id = localStorage.getItem("id");

    const [scan, setScan] = useState("");
    const [result, setResult] = useState(false);

    const navigate = useNavigate();

    const checkDrop = (files) => {
        let index = files.lastIndexOf(".");
        let extension = files.split(files[index])[1];
        if(extension === "jpg" || extension === "png" || extension === "jpeg") {
            return true;
        }
        return false;
    }

    // Function to add scan to history
    const add = () => {
        axios
            .put(`http://localhost:5555/user/add-to-history/${id}`)
            .then(res => {
                alert(res.data);
            })
            .catch(err => {
                if(err.response) {
                    alert(err.response.data.message);
                }else {
                    alert("Something went wrong, couldn't add scan to history");
                }
            })
    }

    // When a file is dragged over label
    const over = (e) => {
        e.preventDefault();
        let label = document.getElementById("label");
        label.classList.add("drag");
        label.innerHTML = "Drop to Upload";
    }
    const leave = (e) => {
        e.preventDefault();
        let label = document.getElementById("label");
        label.classList.remove("drag");
        label.innerHTML = "Drag file over or click to select file";
    }
    const drop = (e) => {
        e.preventDefault();
        label.classList.remove("drag");
        label.innerHTML = "Drag file over or click to select file";
        if(e.dataTransfer.files.length > 0 && checkDrop(e.dataTransfer.files[0].name)) {
            setScan(e.dataTransfer.files[0]);
            // setResult(true);
        }else {
            alert("Drop an image file to upload")
        }
    }

    return (
        <div className='min-h-screen bg-primary-50 flex flex-col items-center justify-start'>

            {!result && (
                <>
                    <BiCaretLeft onClick={() => navigate(-1)} size='4em' className='self-start p-4 cursor-pointer duration-300 hover:text-gray-400' />

                    <div className='flex flex-col items-center justify-center p-3'>
                        <h1 className='text-2xl text-blue-600 font-bold'>Upload</h1>
                        <p className='text-sm'><span className='text-red-500'>*</span>Upload a CCT scan for inference</p>
                    </div>
                    {/* <button onClick={() => console.log(scan)}>log scan</button> */}
                    <label htmlFor="image" id='label' onDragOver={over} onDragLeave={leave} onDrop={drop}>
                        <p>Drag file over or click to select file</p>
                    </label>
                    <input type="file" name="image" id="image" className='hidden' onChange={(e) => setScan(e.target.files[0])} />

                    <p><span className='font-bold'>Image Selected:</span> {scan.name}</p>
                </>
            )}
            {result && (
                <>
                    <p>Results will show here for {scan.name}</p>
                </>
            )}
            
        </div>
    )
}

export default Upload