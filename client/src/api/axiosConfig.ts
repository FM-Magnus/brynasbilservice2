import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? '' : '/brynasbilservice',
});

export default axiosInstance;
