import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setUser, logout, toggleLike, toggleDislike } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;
