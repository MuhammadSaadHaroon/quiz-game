import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import PrivateRoute from './routes/PrivateRoute';

export default function App(){
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/quiz" element={<PrivateRoute><Quiz/></PrivateRoute>} />
        <Route path="/result" element={<PrivateRoute><Result/></PrivateRoute>} />
      </Routes>
    </>
  );
}
