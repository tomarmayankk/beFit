import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast'

export const useAuthStore = create (() => ({
    authUser: null,
    isSigningIn: false,
    isSigningUp: false,
    isCheckingAuth: true,

        checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser: res.data})
        } catch (error) {
            set({authUser: null})
            console.log("error in authstore", error.message)
        } finally{
            set({isCheckingAuth: false})
        }
    },
}))