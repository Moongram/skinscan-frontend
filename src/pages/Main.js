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
            {/* TODO: make user info request here and pass in to both patientfilter and imageview */}
            {filterVisible && <PatientFilter onPatientSelect={handlePatientSelect}/>}
            <ImageView selectedPatientId={selectedPatientId} toggleFilterVisibility={toggleFilterVisibility} filterVisible={filterVisible} />
        </div>
    );
};

export default Main;
