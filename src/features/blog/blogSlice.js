import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  addNew,
  deleteBlog,
  getAllBlogs,
  getAllComments,
  getBlogDetails,
  getBlogsOfUser,
  reactToBlog,
  updateBlog,
} from "./blogThunks.js";

const initialState = {
  allBlogs: [],
  userBlogs: [],
  blogDetails: null,
  comments: [],
  loading: {
    allBlogs: false,
    userBlogs: false,
    blogDetails: false,
    comments: false,
    addComment: false,
    addBlog: false,
    updateBlog: false,
    deleteBlog: false,
  },
  error: {
    allBlogs: null,
    userBlogs: null,
    blogDetails: null,
    comments: null,
    addComment: null,
    addBlog: null,
    updateBlog: null,
    deleteBlog: null,
  },
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Blogs
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.loading.allBlogs = true;
        state.error.allBlogs = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading.allBlogs = false;
        state.allBlogs = action.payload;
        state.error.allBlogs = null;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading.allBlogs = false;
        state.error.allBlogs = action.payload;
      });

    // Get Blogs of User
    builder
      .addCase(getBlogsOfUser.pending, (state) => {
        state.loading.userBlogs = true;
        state.error.userBlogs = null;
      })
      .addCase(getBlogsOfUser.fulfilled, (state, action) => {
        state.loading.userBlogs = false;
        state.userBlogs = action.payload;
        state.error.userBlogs = null;
      })
      .addCase(getBlogsOfUser.rejected, (state, action) => {
        state.loading.userBlogs = false;
        state.error.userBlogs = action.payload;
      });

    // Get Blog Details
    builder
      .addCase(getBlogDetails.pending, (state) => {
        state.loading.blogDetails = true;
        state.error.blogDetails = null;
      })
      .addCase(getBlogDetails.fulfilled, (state, action) => {
        state.loading.blogDetails = false;
        state.blogDetails = action.payload;
      })
      .addCase(getBlogDetails.rejected, (state, action) => {
        state.loading.blogDetails = false;
        state.error.blogDetails = action.payload;
      });

    // Add New Blog
    builder
      .addCase(addNew.pending, (state) => {
        state.loading.addBlog = true;
        state.error.addBlog = null;
      })
      .addCase(addNew.fulfilled, (state, action) => {
        state.loading.addBlog = false;
        state.allBlogs.push(action.payload);
        state.userBlogs.push(action.payload);
        state.error.addBlog = null;
      })
      .addCase(addNew.rejected, (state, action) => {
        state.loading.addBlog = false;
        state.error.addBlog = action.payload;
      });

    // Update Blog
    builder
      .addCase(updateBlog.pending, (state) => {
        state.loading.updateBlog = true;
        state.error.updateBlog = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading.updateBlog = false;
        const updated = action.payload;

        state.allBlogs = state.allBlogs.map((b) =>
          b.id === updated.id ? updated : b
        );
        state.userBlogs = state.userBlogs.map((b) =>
          b.id === updated.id ? updated : b
        );
        if (state.blogDetails?.id === updated.id) {
          state.blogDetails = updated;
        }
        state.error.updateBlog = null;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading.updateBlog = false;
        state.error.updateBlog = action.payload;
      });

    // Delete Blog
    builder
      .addCase(deleteBlog.pending, (state) => {
        state.loading.deleteBlog = true;
        state.error.deleteBlog = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading.deleteBlog = false;
        const deletedId = action.payload;
        state.allBlogs = state.allBlogs.filter((b) => b.id !== deletedId);
        state.userBlogs = state.userBlogs.filter((b) => b.id !== deletedId);
        if (state.blogDetails?.id === deletedId) {
          state.blogDetails = null;
        }
        state.error.deleteBlog = null;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading.deleteBlog = false;
        state.error.deleteBlog = action.payload;
      });

    // React to Blog
    builder.addCase(reactToBlog.fulfilled, (state, action) => {
      const updated = action.payload;
      state.allBlogs = state.allBlogs.map((b) =>
        b.id === updated.id ? updated : b
      );
      state.userBlogs = state.userBlogs.map((b) =>
        b.id === updated.id ? updated : b
      );
      if (state.blogDetails?.id === updated.id) {
        state.blogDetails = updated;
      }
    });

    // Get All Comments
    builder
      .addCase(getAllComments.pending, (state) => {
        state.loading.comments = true;
        state.error.comments = null;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading.comments = false;
        state.comments = action.payload;
        state.error.comments = null;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.loading.comments = false;
        state.error.comments = action.payload;
      });

    // Add Comment
    builder
      .addCase(addComment.pending, (state) => {
        state.loading.addComment = true;
        state.error.addComment = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading.addComment = false;
        state.comments.unshift(action.payload);
        state.error.addComment = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading.addComment = false;
        state.error.addComment = action.payload;
      });
  },
});

export const {} = blogSlice.actions;

export default blogSlice.reducer;
