import axios from 'axios';

export const axiosInstance = axios.create({
  //nous allons prendre l'url dans le variable d'environnement
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'X-API-KEY':"HfJcYj7AGYPHqS9x5eRub5XRK9zJFpEthdBl5ShvyJyBEStJnsGTFmEFyInY76G7",
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.defaults.timeout = 60000;

export default axiosInstance;