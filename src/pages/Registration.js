import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userCredentials, setUserCredentials] = useState([]);

    return (
        <div className='registration'>
            <div className='form-container'>
                <img src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg" alt="logo" />
                <form>
                    <input type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                    
                    <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                        <option value="" disabled>Select Role</option>
                        <option value="doctor">Doctor</option>
                        <option value="nurse">Nurse</option>
                        <option value="patient">Patient</option>
                    </select>

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Registration;
