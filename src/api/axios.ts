import axios from 'axios';

const API_URL_BASE = `${import.meta.env.VITE_API_URL}` || 'http://localhost:3000';

export const CancelToken = axios.CancelToken;

export const http = axios.create({
    baseURL: API_URL_BASE,
});

http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token') || '';
        if (token && config && config.headers)
            config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.clear();
            global.location.href = '/login';
        }
        return Promise.reject(error);
    },
);

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.clear();
            global.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
