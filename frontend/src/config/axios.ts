import axiosR from "axios";

const axios = axiosR.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  withCredentials: true,
});

export default axios;
