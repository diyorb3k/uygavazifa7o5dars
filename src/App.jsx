// src/App.jsx
import React from 'react';
import Data from './components/Data'; // To'g'ri yo'l
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Techeris from './components/Techeris';
import Students from './components/Students';
import Admin from './components/Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Data />} >
        <Route index path="techer" element={<Techeris/>} />
        <Route path="uploads" element={<Students />} />
        <Route path="admin" element={<Admin/>} />
        </Route>
       
      </Routes>
    </Router>
  );
};

export default App;
