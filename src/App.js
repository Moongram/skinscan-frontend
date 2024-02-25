import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing  from './pages/Landing';

function App(){
  return (
    <GoogleOAuthProvider clientId="692214113342-atqchs2vkroi5macesfjmkr2p8ln7a7m.apps.googleusercontent.com">
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />

            </Routes>
        </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
