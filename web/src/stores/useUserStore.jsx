
import create from 'zustand';
import apiClient from '../services/api';

const useUserStore = create((set, get) => ({
  user: null,
  setUser: async () => {
    const token = localStorage.getItem('token');
    const { data } = await apiClient.get('/me', { headers: { 'Authorization': `Bearer ${token}` }});

    set({ user: data });
  },
  removeUser: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },
  visualizeState: () => console.log(get()),
}));

export default useUserStore;