import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const PatientContext = createContext();

const PatientFilter = ({ onPatientSelect }) => {

  const [patientsData, setPatientsData] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState(patientsData);
  const [showAddPatientPrompt, setShowAddPatientPrompt] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(-1);
  const [searchTerm, setSearchTerm] = useState('');

  // get the logged in user information
  useEffect(() => {
    async function getUserInfo() {
      const response = await axios.get('http://localhost:4000/user', { withCredentials: true });

      if (response.statusText !== 'OK') {
        const message = `An error occurred: ${response.statusText}`;    
        window.alert(message);
        return;
      }

      const retrievedUserInfo = response.data;
    //   console.log(retrievedUseInfo)

    setPatientsData(retrievedUserInfo.patients)
    }

    getUserInfo()
  }, [])

  // handle filtering patient by search
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  // behavior when a patient is selected
  const handlePatientSelect = (selectedPatientId) => {
    // Call the callback function with the selected patient ID
    setSelectedPatientId(selectedPatientId);
    onPatientSelect(selectedPatientId);
};


  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredPatients(patientsData);
    } else {
      const filtered = patientsData.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  };

  const openAddPatientPrompt = () => {
    setShowAddPatientPrompt(true);
  };

  const closeAddPatientPrompt = () => {
    setShowAddPatientPrompt(false);
    setNewPatientName('');
  };

  const handleNewPatientNameChange = (event) => {
    const { value } = event.target;
    setNewPatientName(value);
  };

  // handles a new patient being added
  const handleAddPatient = async () => {
    // make post request

    axios.post('http://localhost:4000/patient', {
      name: newPatientName,
    }, { withCredentials: true })
    .then(function (response) {
      const newPatient = { id: response.data.id, name: newPatientName };

    setPatientsData([...patientsData, newPatient]);

    closeAddPatientPrompt();
    })
    .catch(function (error) {
      console.log(error);
    });

    closeAddPatientPrompt();
  };
  

  return (
    <PatientContext.Provider value={{ selectedPatientId }}>

    <div className="patient-filter">
      <div className="patient-search-bar">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          <i className="fas fa-search"></i>
        </button>
        <button onClick={openAddPatientPrompt} className="add-patient-button">
          Add Patient
        </button>
      </div>
      <ul className="patient-list">
        {patientsData.map((patient) => (
          <li
            key={patient.id}
            className={`patient-list-item ${selectedPatientId === patient.id ? 'selected' : ''}`}
            onClick={() => handlePatientSelect(patient.id)}
          >
          {patient.name}
          </li>
        ))}
      </ul>

      {/* Add Patient Prompt */}
      {showAddPatientPrompt && (
        <div className="add-patient-prompt">
          <input
            type="text"
            placeholder="Enter patient name"
            value={newPatientName}
            onChange={handleNewPatientNameChange}
          />
          <div>
            <button onClick={handleAddPatient}>Add</button>
            <button onClick={closeAddPatientPrompt}>Cancel</button>
          </div>
        </div>
      )}
    
    </div>
    </PatientContext.Provider>

  );
};

export default PatientFilter;