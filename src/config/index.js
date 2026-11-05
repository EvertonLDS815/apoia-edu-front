import axios from 'axios';
import { redirectToLogin } from '../utils/redirect';

const api = axios.create({
  baseURL: 'http://10.0.0.110:3000', // Substitua pela URL da sua API
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
