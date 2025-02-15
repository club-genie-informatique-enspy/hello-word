import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "https://api-hw.gi-enspy.com/api",
  // baseURL: "http://localhost:8000/api",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


export default axiosInstance;