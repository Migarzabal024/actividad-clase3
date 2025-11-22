import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
    response => response,
    error => {
        console.error('Error en la petición:', error.message);
        return Promise.reject(error);
    }
);

export default api;