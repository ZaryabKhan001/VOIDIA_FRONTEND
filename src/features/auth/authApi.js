import { axiosInstance } from "../../lib/axios.js";

export const authApi = {
  signUp: async (data) => await axiosInstance.post("/auth/signup", data),
  verifyEmail: async (code) =>
    await axiosInstance.post("/auth/verify-email", code),
  login: async (data) => await axiosInstance.post("/auth/login", data),
  logout: async () => await axiosInstance.post("/auth/logout"),
  forgotPassword: async (data) =>
    await axiosInstance.post("/auth/forgot-password", data),
  resetPassword: async (data) =>
    await axiosInstance.post(`/auth/reset-password/:token`, data),
  checkAuth: async () => await axiosInstance.get("/auth/check-auth"),
};
