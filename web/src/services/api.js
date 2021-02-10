import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  },
  // withCredentials: true
});

export default apiClient;