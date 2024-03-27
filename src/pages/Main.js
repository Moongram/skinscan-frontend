// import React from 'react';
// import PatientFilter from '../components/PatientFilter';
// import ImageView from '../components/ImageView';
// const Main = () => {
//     return (
//         <div className='main'>
//             <PatientFilter />
//             <ImageView />
//         </div>
//     );
// };

// export default Main;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import PatientFilter from '../components/PatientFilter';
import ImageView from '../components/ImageView';

// const Main = () => {
//     const [filterVisible, setFilterVisible] = useState(true);

//     const toggleFilterVisibility = () => {
//         setFilterVisible(!filterVisible);
//     };

//     return (
//         <div className='main'>
//             {filterVisible && <PatientFilter />}
//             <button className="toggle-filter-button" onClick={toggleFilterVisibility}>
//                 <FontAwesomeIcon icon={filterVisible ? faArrowLeft : faArrowRight} />
//             </button>
//             <ImageView />
//         </div>
//     );
// };
const Main = () => {
    const [filterVisible, setFilterVisible] = useState(true);

    const toggleFilterVisibility = () => {
        setFilterVisible(!filterVisible);
    };

    return (
        <div className='main'>
            {filterVisible && <PatientFilter />}
            <ImageView toggleFilterVisibility={toggleFilterVisibility} filterVisible={filterVisible} />
        </div>
    );
};

export default Main;
