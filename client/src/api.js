import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8004/quizes', // подставь свой backend URL
});

// Заглушка токена (в реальности — авторизация)
API.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default API;
