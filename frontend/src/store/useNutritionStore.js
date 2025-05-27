import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useNutritionStore = create((set) => ({
  dailyIntake: {
    calories: 0,
    protein: 0,
    carbs: 0,
  },

  isLoading: false,

  updateIntake: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/dashboard/daily-intake', data);
      set({ dailyIntake: res.data.dailyIntake });
      toast.success('Daily intake updated!');
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update intake.");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchIntake: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/dashboard/get-intake'); // 🟢 using original route
      set({ dailyIntake: res.data.dailyIntake });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch intake.");
    } finally {
      set({ isLoading: false });
    }
  }
}));
