
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9915/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    // Always fetch the freshest token directly from storage
    const token = localStorage.getItem("token");

    if (token) {
      // Use config.headers to ensure compatibility with latest Axios versions
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🚀 Request sent with token:", token.substring(0, 10) + "..."); 
    } else {
      console.warn("⚠️ No token found in localStorage");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor to handle 403/401 globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error("Auth Error: Redirecting to login...");
      // localStorage.clear(); // Uncomment to force logout on auth failure
      // window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default API;










{/*import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9191/api"
});

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token); // 🔥 debug

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;8*/}