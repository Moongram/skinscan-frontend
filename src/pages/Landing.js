import '../styles.css'
import React from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const Landing = () => {
    // const navigate = useNavigate();
    return (
        <div className='landing'>
            <div className='container'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="logo" className='scaled-image'/>
                <div className='button-box'>
                    <button onClick={() => axios.post(
                        'http://localhost:4000/login', // TODO: change to backend port number
                        {},
                        { withCredentials: true })
                        .then((response) => {
                            console.log(response);
                        }, (error) => {
                            console.log(error);
                        })}>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    )

}


export default Landing;