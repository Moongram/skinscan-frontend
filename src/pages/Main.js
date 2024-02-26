import React from 'react';
import PatientFilter from '../components/PatientFilter';
import ImageView from '../components/ImageView';
const Main = () => {
    return (
        <div className='main'>
            <PatientFilter />
            <ImageView />
        </div>
    );
};

export default Main;