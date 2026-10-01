import axios from "axios";
import { getApiBaseUrl } from '../config/loadAppConfig';

export const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const request = async (method, url, payload = null) => {
    try {
        const configBaseUrl = getApiBaseUrl();

        if (configBaseUrl && api.defaults.baseURL !== configBaseUrl) {
            api.defaults.baseURL = configBaseUrl;
        }

        const isGet = method.toUpperCase() === "GET";
        const response = await api({
            method,
            url,
            data: isGet ? null : payload,
            params: isGet ? payload : null,
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export { api };
