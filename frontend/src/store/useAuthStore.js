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
        set({isSigningIn: true})
        try {
            const res = await axiosInstance.post('/auth/signin', data)
            set({authUser: res.data})
            toast.success("loggeg in sucessfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isSigningIn: false})
        }
    },
    signup: async (data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({authUser: res.data})
            toast.success("account created successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }finally {
            set({isSigningUp: false});
        }
    },
        signout: async (data) => {
        try {
            await axiosInstance.post("/auth/signout")
            set({authUser: null});
            toast.success("logged out")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}));
