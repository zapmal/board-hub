
import create from 'zustand';
import apiClient from '../services/api';

const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  setUser: async () => {
    const token = localStorage.getItem('token');
    set({ loading: true });

    try {
      const { data } = await apiClient.get('/me');
      set({ user: data, loading: false });
    } catch (error) {
      if (token) {
        localStorage.removeItem('token');
      }

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