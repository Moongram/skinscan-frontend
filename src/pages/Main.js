import React, { useState } from 'react';
import PatientFilter from '../components/PatientFilter';
import ImageView from '../components/ImageView';

const Main = () => {
    const [filterVisible, setFilterVisible] = useState(true);

    const toggleFilterVisibility = () => {
        setFilterVisible(!filterVisible);
    };

    return (
        <div className='main'>
            {/* TODO: make user info request here and pass in to both patientfilter and imageview */}
            {filterVisible && <PatientFilter />}
            <ImageView toggleFilterVisibility={toggleFilterVisibility} filterVisible={filterVisible} />
        </div>
    );
};

export default Main;
