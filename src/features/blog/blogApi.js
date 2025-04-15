import { axiosInstance } from "../../lib/axios.js";

export const blogApi = {
  addNew: (data) => axiosInstance.post("/posts", data),

  getAllBlogs: () => axiosInstance.get("/posts"),

  getAllBlogsOfUser: () => axiosInstance.get("/posts/userBlogs"),

  getBlog: (id) => axiosInstance.get(`/posts/blog/${id}`),

  updateBlog: (id, data) => axiosInstance.put(`/posts/${id}`, data),

  deleteBlog: (id) => axiosInstance.delete(`/posts/${id}`),

  reaction: (id, type) =>
    axiosInstance.patch(`/posts/${id}/reaction`, { type }),

  addComment: (id, content) =>
    axiosInstance.post(`/posts/${id}/comments`, { content }),

  getAllComments: (id) => axiosInstance.get(`/posts/${id}/comments`),
};
