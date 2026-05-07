import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:3000' : '/brynasbilservice',
});

export default axiosInstance;