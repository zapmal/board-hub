import axios from 'axios';

const token = localStorage.getItem('token');

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    Authorization: `Bearer ${token}`
  },
  // withCredentials: true
});

export default apiClient;