import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

    // write function to validate user data from database
    const validateUserData = async () => {
        
    }

    return (
        <div className='login'>
            <div className='form-container'>
                <img src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg" alt="logo" />
                <form>
                    <input type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
                
                {/* write a function onclick to validate userdata */}
            </div>
        </div>
    )
}

export default Login;