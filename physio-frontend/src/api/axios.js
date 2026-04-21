// src/api/axios.js
import axios from "axios";
import { toast } from "react-toastify";

// Create the Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // change this as per your backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to attach token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor to handle token expiry
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.clear();
      window.location.href = "/users/login"; // Full reload to reset context and state
    }
    return Promise.reject(error);
  }
);

export default API;
