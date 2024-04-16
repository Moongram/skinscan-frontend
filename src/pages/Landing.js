import React from 'react';

/**
 * @returns landing page
 */
const Landing = () => {
    console.log(sessionStorage)
    
    // navigate to the backend's login handling
    const changePortNumber = async () => {
        window.location.href = "http://localhost:4000/login"
    }
    const handleLogin = async () => {
        try {
            changePortNumber()
        } catch (exceptionVar) {
            console.log('exception')
        }
    }
    return (
        <div className='landing'>
            <div className='container'>
            <img src="/images/skinscanlogo.png" alt="logo" className='scaled-image'/>
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