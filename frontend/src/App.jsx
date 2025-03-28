import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Feedback from './components/FeedbackForm'; // Ensure the file path is correct
import Login from './pages/Login';
import Signup from './pages/Signup';
import Share from './pages/Share';
import Main from './Home/Main';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/feedback/:eventId" element={<Feedback />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/share/:eventId' element={<Share />} />
    </Routes>
  );
}

export default App;
