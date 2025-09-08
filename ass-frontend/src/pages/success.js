// src/pages/Success.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Success() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");

    if (token) {
      localStorage.setItem("token", token);
      alert(`✅ Welcome ${name}! You are signed in with Google`);
      // later redirect to dashboard
    }
  }, [location]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Login Successful 🎉</h2>
        <p>You have been signed in with Google. Token stored in localStorage.</p>
      </div>
    </div>
  );
}
