
import create from 'zustand';
import apiClient from '../services/api';

const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  setUser: async () => {
    set({ loading: true });
    const token = localStorage.getItem('token');

    try {
      const { data } = await apiClient.get('/me', { headers: { 'Authorization': `Bearer ${token}` }});
      set({ user: data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  removeUser: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },
  visualizeState: () => console.log(get()),
}));

export default useUserStore;