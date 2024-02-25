import '../styles.css'
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className='landing'>
            <div className='container'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="logo" class='scaled-image'/>
                <div class='button-box'>
                    <button onClick={() => navigate('/login')}>Sign in with Google</button>
                </div>
            </div>
            <script src="https://accounts.google.com/gsi/client" async></script>
            <div id="g_id_onload"
                data-client_id="692214113342-atqchs2vkroi5macesfjmkr2p8ln7a7m.apps.googleusercontent.com"
                data-login_uri="https://your.domain/your_login_endpoint"
                data-auto_prompt="false">
            </div>
            <div class="g_id_signin"
                data-type="standard"
                data-size="large"
                data-theme="outline"
                data-text="sign_in_with"
                data-shape="rectangular"
                data-logo_alignment="left">
            </div>
        </div>
    )

}


export default Landing;