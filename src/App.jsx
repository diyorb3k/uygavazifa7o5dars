import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Data from './components/Data';
import Admin from './components/Admin';
import Students from './components/Students';
import Teachers from  './components/Techeris'
import Login from './components/Login';
import { Provider } from 'react-redux';
import store from 'store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Data />}>
            <Route path="admin" element={<Admin />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
