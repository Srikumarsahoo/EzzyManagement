import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../../api/userApi";
import { FaUser, FaEnvelope, FaPhone, FaBuilding } from "react-icons/fa";

const ProfileSettings = () => {
  const userId = "YOUR_USER_ID"; // Replace with actual id (from context or localStorage)
  const [profile, setProfile] = useState({
    fullName: "",
    role: "",
    email: "",
    mobile: "",
    company: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getUserProfile(userId).then(({ data }) => setProfile(data));
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Profile & Settings</h2>

      <div className="bg-white p-6 rounded-2xl shadow-sm max-w-4xl">
        <h3 className="font-semibold mb-4">Profile Information</h3>

        <div className="flex flex-col items-center mb-4">
          <img
            src={profile.image || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <button className="mt-2 text-blue-600 text-sm">Upload photo</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
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
    </div>
  );
};

export default ProfileSettings;
