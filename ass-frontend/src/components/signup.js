import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogle, FaApple, FaTwitter, FaFacebook } from "react-icons/fa";
import illustration from "../assets/download.png";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      // ✅ Use Render backend instead of localhost
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name: form.name,
          username: form.username,
          email: form.email,
          password: form.password,
        }
      );

      setMessage({
        type: "success",
        text: res.data.message || "Signup successful! Redirecting...",
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Something went wrong, try again.",
      });
    } finally {
      setLoading(false);
    }
  };
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

        {/* Right signup form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create your <span className="text-indigo-600">Eazzy</span> account
          </h2>
          <p className="text-gray-600 mb-6">Sign up to get started</p>

          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                message.type === "error"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="********"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* Signup button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-3 text-gray-500 text-sm">Or sign up with</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Social logins */}
          <div className="flex justify-center space-x-4">
            <button 
             onClick={() => handleSocialLogin("google")} className="p-3 border rounded-full hover:bg-gray-100">
              <FaGoogle className="text-red-500 text-xl" />
            </button>
              <button onClick={() => handleSocialLogin("facebook")} className="p-3 border rounded-full hover:bg-gray-100">
              <FaFacebook className="text-blue-600 text-xl" />
            </button>
          </div>

          {/* Login link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
