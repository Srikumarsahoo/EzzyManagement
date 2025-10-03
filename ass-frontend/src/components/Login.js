// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { FaGoogle, FaApple, FaTwitter } from "react-icons/fa";
import illustration from "../assets/download.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      if (res.data.token) {
        // ✅ Save JWT + user in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("✅ Logged in successfully!");
        navigate("/dashboard"); // redirect after login
      } else {
        alert("❌ Login failed: No token received.");
      }
    } catch (err) {
      alert("❌ Login failed: " + (err.response?.data?.message || "Server error"));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Helper for Google/Twitter login
  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:5000/api/auth/${provider}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-6xl shadow-lg rounded-2xl bg-white overflow-hidden">
        
        {/* Left illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center p-8">
          <img
            src={illustration}
            alt="Illustration"
            className="max-h-[400px] object-contain"
          />
        </div>

        {/* Right login form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to <span className="text-indigo-600">Eazzy</span>
          </h2>
          <p className="text-gray-600 mb-6">Login to get started</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Remember + Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-3 text-gray-500 text-sm">Or sign in with</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Social logins */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleSocialLogin("google")}
              className="p-3 border rounded-full hover:bg-gray-100"
            >
              <FaGoogle className="text-red-500 text-xl" />
            </button>

            <button
              onClick={() => alert("Apple login coming soon!")}
              className="p-3 border rounded-full hover:bg-gray-100"
            >
              <FaApple className="text-black text-xl" />
            </button>

            <button
              onClick={() => handleSocialLogin("twitter")}
              className="p-3 border rounded-full hover:bg-gray-100"
            >
              <FaTwitter className="text-sky-500 text-xl" />
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
