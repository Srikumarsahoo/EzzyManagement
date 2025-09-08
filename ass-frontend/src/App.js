import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login';   
import SignupPage from './components/signup'; 
import Success from "./pages/success";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Default to login */}
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}
export default App;
