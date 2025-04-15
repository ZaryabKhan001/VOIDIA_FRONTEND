import { createAsyncThunk } from "@reduxjs/toolkit";
import { blogApi } from "./blogApi.js";

export const addNew = createAsyncThunk(
  "blogs/addNew",
  async (data, { rejectWithValue }) => {
    try {
      const response = await blogApi.addNew(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.errors || error.message);
    }
  }
);

export const getAllBlogs = createAsyncThunk(
  "blogs/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await blogApi.getAllBlogs();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);

export const getBlogsOfUser = createAsyncThunk(
  "blogs/getByUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await blogApi.getAllBlogsOfUser();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);

export const getBlogDetails = createAsyncThunk(
  "blogs/getDetails",
  async (blogId, { rejectWithValue }) => {
    try {
      const res = await blogApi.getBlog(blogId);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/update",
  async ({ blogId, data }, { rejectWithValue }) => {
    try {
      const res = await blogApi.updateBlog(blogId, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (blogId, { rejectWithValue }) => {
    try {
      await blogApi.deleteBlog(blogId);
      return blogId;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);

export const reactToBlog = createAsyncThunk(
  "blogs/react",
  async ({ blogId, reaction }, { rejectWithValue }) => {
    try {
      const res = await blogApi.reaction(blogId, reaction);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "blogs/addComment",
  async ({ id, commentMessage }, { rejectWithValue }) => {
    try {
      const res = await blogApi.addComment(id, commentMessage);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);

export const getAllComments = createAsyncThunk(
  "blogs/getComments",
  async (blogId, { rejectWithValue }) => {
    try {
      const res = await blogApi.getAllComments(blogId);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data.errors || err.message);
    }
  }
);
