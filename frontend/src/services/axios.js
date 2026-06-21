import axios from "axios";
import { toast } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || "Something went wrong";

    switch (status) {
      case 400:
        toast.error(message);
        break;

      case 401:
        toast.error(message);
        localStorage.removeItem("token");
        // window.location.href = "/";
        break;

      case 403:
        toast.error("You are not authorized.");
        break;

      case 404:
        toast.error("Resource not found.");
        break;

      case 500:
        toast.error("Internal server error.");
        break;

      default:
        toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;