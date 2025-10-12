import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

export const getUserProfile = async (id) => {
  return await API.get(`/users/${id}`); // ✅ matches /api/users/:id
};

export const updateUserProfile = async (id, data) => {
  return await API.put(`/users/${id}`, data);
};
