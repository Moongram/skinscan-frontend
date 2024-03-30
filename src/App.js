import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing  from './pages/Landing';
import Main from './pages/Main';
import Uploading from './pages/Uploading';

function App(){
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/main" element={<Main />} />
            <Route path="/uploading" element={<Uploading />} />
        </Routes>
    </Router>
  );
}

export default App;
