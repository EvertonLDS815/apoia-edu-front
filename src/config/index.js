import axios from 'axios';
import { redirectToLogin } from '../utils/redirect';

const api = axios.create({
  baseURL: 'https://apoia-edu-back.onrender.com/', // Substitua pela URL da sua API
});

// 🔹 Request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response
api.interceptors.response.use(
    response => response,
    error => {

        if (!error.response) {
            return Promise.reject(error);
        }

        const { status } = error.response;

        if (status === 401 && !error.config.url.includes('/login')) {
            localStorage.removeItem('token');
            redirectToLogin();
        }

        return Promise.reject(error);
    }
);

export default api;
