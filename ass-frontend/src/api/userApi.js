import axios from "axios";

const API = axios.create({
  baseURL: "https://ezzymanagement.onrender.com/api",
});

// get user profile
export const getUserProfile = (id) => API.get(`/users/${id}`);

// update user profile
export const updateUserProfile = (id, data) => API.put(`/users/${id}`, data);
