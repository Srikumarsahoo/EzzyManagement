import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/signup";   // check capitalization!
import Inventory from "./components/InventoryList";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ProfileSettings from "./pages/Settings/ProfileSettings";

function App() {
  return (
    <Router>
      <SpeedInsights /> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<ProfileSettings />} />
      </Routes>
    </Router>
  );
}

export default App;

