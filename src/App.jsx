import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Data from './components/Data'; 
import Techeris from './components/Techeris';
import Students from './components/Students';
import Admin from './components/Admin';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
    
        <Route path="/" element={<Data />} >
          <Route path="techer" element={<Techeris />} />
          <Route path="uploads" element={<Students />} />
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
