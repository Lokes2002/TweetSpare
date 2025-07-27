import axios from "axios";

export const API_BASE_URL = "http://localhost:5000"; // Ensure this is the correct URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a request interceptor to dynamically set the Authorization header
api.interceptors.request.use(config => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
