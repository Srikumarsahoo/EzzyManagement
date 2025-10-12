import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/signup";   // check capitalization!
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import { SpeedInsights } from "@vercel/speed-insights/react";
import ProfileSettings from "./pages/Settings/ProfileSettings";
import ExpenseReport from "./pages/Reports/ExpenseReport";
import SalesReport from "./pages/Reports/SalesReport";
import Suppliers from "./pages/Suppliers";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <Router>
      <SpeedInsights /> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/expense" element={<ExpenseReport />} />
        <Route path="/sales" element={<SalesReport />} />
        <Route path="/suppliers" element={<Suppliers />} /> 
        <Route path="/inventory" element={<Inventory />} />  
      </Routes>
    </Router>
  );
}

export default App;

