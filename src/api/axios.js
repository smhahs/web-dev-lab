import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 15000, // <--- Было 5000, ставим 15000 (15 сек), чтобы наверняка
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцепторы (Перехватчики) — крутая тема.
// Позволяют что-то сделать ДО отправки запроса или ПОСЛЕ ответа.
api.interceptors.request.use(
  (config) => {
    // Сюда можно автоматически подставлять токен авторизации
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    console.log('Request sent:', config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;