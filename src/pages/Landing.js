import '../styles.css'
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import user from '../user.json';
import { Cookies } from 'react-cookie';

const Landing = () => {
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/login', {withCredentials: true})
            const isLoggedIn = Cookies.get('isLoggedIn')
            if (isLoggedIn) {
                console.log('logged in')
            }
        } catch (exceptionVar) {
            console.log('exception')
        }
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