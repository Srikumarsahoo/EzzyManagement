import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaLock,
  FaBell,
  FaHistory,
} from "react-icons/fa";
import { getUserProfile, updateUserProfile } from "../../api/userApi";

const ProfileSettings = () => {
  const userId = "YOUR_USER_ID"; // Replace with actual user ID (context or localStorage)
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    role: "",
    email: "",
    mobile: "",
    company: "",
    image: "",
  });

  // Fetch user data
  useEffect(() => {
    (async () => {
      const { data } = await getUserProfile(userId);
      setProfile(data);
    })();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserProfile(userId, profile);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile({ ...profile, image: reader.result });
      reader.readAsDataURL(file);
    } else {
      alert("File must be less than 2MB (JPG, PNG, or GIF).");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Profile & Settings</h2>

      {/* Tabs */}
      <div className="flex space-x-3 mb-6 border-b">
        {["profile", "security", "notifications", "activity"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white p-6 rounded-2xl shadow-sm max-w-4xl">
          <h3 className="font-semibold mb-4 text-lg">Profile Information</h3>

          <div className="flex flex-col items-center mb-6">
            <img
              src={profile.image || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <label className="mt-3 text-blue-600 text-sm cursor-pointer">
              <input
                type="file"
                accept="image/png, image/jpeg, image/gif"
                className="hidden"
                onChange={handleImageUpload}
              />
              Upload photo
            </label>
            <p className="text-xs text-gray-400 mt-1">
              JPG, PNG or GIF. Max 2MB.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="text-gray-700 text-sm">Full Name</label>
              <div className="flex items-center border rounded-md p-2 mt-1">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="flex-1 outline-none"
                  placeholder="Jon Doe"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="text-gray-700 text-sm">Role</label>
              <input
                name="role"
                value={profile.role}
                onChange={handleChange}
                disabled={!isEditing}
                className="border rounded-md p-2 w-full mt-1"
                placeholder="Garage Manager"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-700 text-sm">Email</label>
              <div className="flex items-center border rounded-md p-2 mt-1">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="flex-1 outline-none"
                  placeholder="JonDoe@gmail.com"
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="text-gray-700 text-sm">Mobile Number</label>
              <div className="flex items-center border rounded-md p-2 mt-1">
                <FaPhone className="text-gray-400 mr-2" />
                <input
                  name="mobile"
                  value={profile.mobile}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="flex-1 outline-none"
                  placeholder="8293482021"
                />
              </div>
            </div>

            {/* Company */}
            <div className="col-span-2">
              <label className="text-gray-700 text-sm">Company</label>
              <div className="flex items-center border rounded-md p-2 mt-1">
                <FaBuilding className="text-gray-400 mr-2" />
                <input
                  name="company"
                  value={profile.company}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="flex-1 outline-none"
                  placeholder="TechForce"
                />
              </div>
            </div>

            {/* Edit / Save Button */}
            <div className="col-span-2 flex justify-end mt-4">
              {isEditing ? (
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="bg-white p-6 rounded-2xl shadow-sm max-w-3xl">
          <h3 className="font-semibold mb-4 text-lg flex items-center">
            <FaLock className="mr-2 text-gray-600" /> Security Settings
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            You can change your password or enable two-factor authentication here.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-3">
            Change Password
          </button>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-white p-6 rounded-2xl shadow-sm max-w-3xl">
          <h3 className="font-semibold mb-4 text-lg flex items-center">
            <FaBell className="mr-2 text-gray-600" /> Notification Preferences
          </h3>
          <div className="space-y-2">
            {["Email Alerts", "SMS Notifications", "System Updates"].map(
              (item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{item}</span>
                </label>
              )
            )}
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === "activity" && (
        <div className="bg-white p-6 rounded-2xl shadow-sm max-w-3xl">
          <h3 className="font-semibold mb-4 text-lg flex items-center">
            <FaHistory className="mr-2 text-gray-600" /> Recent Activity
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>🔹 Logged in from Chrome on Windows (Oct 5, 2025)</li>
            <li>🔹 Updated profile information (Oct 3, 2025)</li>
            <li>🔹 Changed password (Sept 25, 2025)</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
