import '../styles.css'
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import user from '../user.json';

const Landing = () => {
    const navigate = useNavigate();
    const handleLogin = async () => {
        const userdata = user;
        navigate('/main', {state: {userdata}});
    }
    return (
        <div className='landing'>
            <div className='container'>
            <img src="/images/loginlogo.webp" alt="logo" className='scaled-image'/>
                <div className='button-box'>
                    <button onClick={handleLogin}>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    )

}


export default Landing;