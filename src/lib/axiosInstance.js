import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response, // just return response normally
    async (error) => {
        const originalRequest = error.config;

        // Check if error is 403 (or 401, depending on your backend)
        if (
            error?.response?.status === 403 &&
            !originalRequest._retry // prevent infinite loop
        ) {
            originalRequest._retry = true;
            try {
                const rToken = localStorage.getItem("refreshToken");
                if (!rToken) throw new Error("No refresh token");

                const refreshResponse = await axios.post(
                    `${API_URL}/api/auth/refresh/`,
                    { refresh: rToken }
                );

                const newToken = refreshResponse?.data?.access;
                if (newToken) {
                    localStorage.setItem("authToken", newToken);

                    // Update headers and retry original request
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshErr) {
                console.error("Token refresh failed:", refreshErr);
                localStorage.removeItem("authToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/"; // force logout
            }
        }

        return Promise.reject(error);
    }
);

// Request interceptor to attach token automatically
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
