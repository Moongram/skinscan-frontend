import '../styles.css'
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleSignInButton from '../googleSignInButton';


const Landing = () => {
    // const navigate = useNavigate();
    return (
        <div className='landing'>
            <div className='container'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="logo" className='scaled-image'/>
                <div className='button-box'>
                    <GoogleSignInButton />
                </div>
            </div>
            <script src="https://accounts.google.com/gsi/client" async></script>
        </div>
    )

}


export default Landing;