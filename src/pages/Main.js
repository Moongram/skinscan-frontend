import React, { useState } from 'react';
import PatientFilter from '../components/PatientFilter';
import ImageView from '../components/ImageView';

const Main = () => {
    const [filterVisible, setFilterVisible] = useState(true);
    const [selectedPatientId, setSelectedPatientId] = useState(null);

    const toggleFilterVisibility = () => {
        setFilterVisible(!filterVisible);
    };

    const handlePatientSelect = (patientId) => {
        setSelectedPatientId(patientId);
    };

    return (
        <div className='main'>
            {filterVisible && <PatientFilter onPatientSelect={handlePatientSelect}/>}
            <ImageView selectedPatientId={selectedPatientId} toggleFilterVisibility={toggleFilterVisibility} filterVisible={filterVisible} />
        </div>
    );
};

export default Main;
