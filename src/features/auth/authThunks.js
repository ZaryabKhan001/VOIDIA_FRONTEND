import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "./authApi.js";

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.signUp(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const res = await authApi.verifyEmail(token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authApi.login(credentials);
      localStorage.setItem("token", res.data.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      localStorage.removeItem("token");
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await authApi.forgotPassword(email);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.resetPassword(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.checkAuth();
      return res.data;
    } catch (err) {
      localStorage.removeItem("token");
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);
