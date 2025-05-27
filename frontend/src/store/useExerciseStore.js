import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useExerciseStore = create((set) => ({
  exercises: [],
  day: '', // <-- Add day field
  isLoading: false,

  fetchRecommendations: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/exercise/recommendations');
      const { recommendations, day } = res.data;
      set({ exercises: recommendations, day }); // <-- Store both exercises and day
    } catch (error) {
      toast.error("Failed to fetch exercises");
    } finally {
      set({ isLoading: false });
    }
  }
}));
