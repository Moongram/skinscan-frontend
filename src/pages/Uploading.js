import React, { useState } from 'react';
import PatientFilter from '../components/PatientFilter';
import axios from 'axios';

const Uploading = () => {

    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handlePatientSelect = (patientId) => {
        setSelectedPatientId(patientId);
    };

    const handleUpload = async () => {
        if (!selectedFile || !selectedPatientId) {
            alert('Please select a patient and a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('patientId', selectedPatientId);

        try {
            const response = await axios.post(`http://localhost:5000/upload?patientId=${selectedPatientId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            alert('File uploaded successfully');
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        }
    };

    return (
    <div className='main'>
            <PatientFilter onPatientSelect={handlePatientSelect} />
        <div className='upload-picture-wrapper'>
            <input type="file" accept="image/*" className='upload-picture' onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload file</button>
        </div>
    </div>
    )
}

export default Uploading;