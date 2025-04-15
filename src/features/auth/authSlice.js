import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  login,
  verifyEmail,
  logoutUser,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "./authThunks";

const initialState = {
  user: {
    _id: "",
    name: "",
    email: "",
    isVerified: false,
    likedPosts: [],
    dislikedPosts: [],
  },
  status: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, name, email, isVerified, likedPosts, dislikedPosts } =
        action.payload;
      state.user = {
        _id,
        name,
        email,
        isVerified,
        likedPosts: likedPosts || [],
        dislikedPosts: dislikedPosts || [],
      };
      state.status = true;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = {
        _id: "",
        name: "",
        email: "",
        isVerified: false,
        likedPosts: [],
        dislikedPosts: [],
      };
      state.status = false;
    },
    toggleLike: (state, action) => {
      const postId = action.payload;
      if (state.user.likedPosts.includes(postId)) {
        state.user.likedPosts = state.user.likedPosts.filter(
          (id) => id !== postId
        );
      } else {
        state.user.likedPosts.push(postId);
        state.user.dislikedPosts = state.user.dislikedPosts.filter(
          (id) => id !== postId
        );
      }
    },
    toggleDislike: (state, action) => {
      const postId = action.payload;
      if (state.user.dislikedPosts.includes(postId)) {
        state.user.dislikedPosts = state.user.dislikedPosts.filter(
          (id) => id !== postId
        );
      } else {
        state.user.dislikedPosts.push(postId);
        state.user.likedPosts = state.user.likedPosts.filter(
          (id) => id !== postId
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.status = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = initialState.user;
        state.status = false;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = initialState.user;
        state.status = false;
      })

      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.user.isVerified = true;
      });
  },
});

export const { setUser, logout, toggleLike, toggleDislike } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;
