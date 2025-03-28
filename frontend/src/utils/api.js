import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Token expired. Redirecting to login...");
      localStorage.removeItem("token");
      // window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default API;