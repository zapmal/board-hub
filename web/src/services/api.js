import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api',
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  }
);

export default apiClient;