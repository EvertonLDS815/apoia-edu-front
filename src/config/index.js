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
  (response) => response,
  (error) => {

    // 🔥 Se não tem response → é erro de rede (offline)
    if (!error.response) {
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    alert(
        `Status: ${status}\nResposta: ${JSON.stringify(data.message)}`
    );

    if (status === 401) {
        localStorage.removeItem('token');
        redirectToLogin();
    }

    return Promise.reject(error);
  }
);

export default api;
