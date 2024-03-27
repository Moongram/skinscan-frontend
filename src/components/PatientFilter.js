import React, { useState } from 'react';

const patientsData = [
  { id: 1, name: 'Jane Doe' },
  { id: 2, name: 'John Smith' },
];

const PatientFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState(patientsData);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
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
  

  return (
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
      </div>
      <ul className="patient-list">
        {filteredPatients.map((patient) => (
          <li key={patient.id} className="patient-list-item">
            {patient.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientFilter;