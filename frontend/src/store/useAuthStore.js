import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningIn: false,
  isSigningUp: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.error("Auth check failed:", error.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signin: async (data) => {
    set({ isSigningIn: true });
    try {
      const res = await axiosInstance.post('/auth/signin', data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Sign in failed");
    } finally {
      set({ isSigningIn: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Sign up failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  signout: async () => {
    try {
      await axiosInstance.post("/auth/signout");
      set({ authUser: null });
      toast.success("Logged out");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Sign out failed");
    }
  }
}));
