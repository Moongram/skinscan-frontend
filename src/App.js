import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing  from './pages/Landing';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Main from './pages/Main';

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
