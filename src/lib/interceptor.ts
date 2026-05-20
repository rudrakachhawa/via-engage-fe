import { clearAllStorage, getItemFromStorage } from "@/utils/localStorageUtility";
import axios from "axios";
import { store } from "@/store"; // Make sure your store is accessible here
import { clearUser } from "@/store/slices/userSlice";

export function getServerBaseUrl(): string {
    return (process.env.NEXT_PUBLIC_SERVER_BASE_URL ?? "http://localhost:8000").replace(
        /\/$/,
        "",
    );
}

// Create axios instance
const api = axios.create({
    baseURL: getServerBaseUrl(),
    withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
    async (config) => {
        // Get token from localStorage / redux / mmkv etc.
        const token = getItemFromStorage('accessToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (optional)


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle 401 globally
        if (error.response?.status === 401) {
            console.log("Unauthorized");
            store.dispatch(clearUser());
            clearAllStorage();

            // Redirect to the landing page (/)
            if (typeof window !== "undefined") {
                window.location.href = "/";
            }
        }

        return Promise.reject(error);
    }
);

export default api;