import api from "./api";

export const createBlogPost = async (formData) => {
  try {
    const res = await api.post("/api/blogPosts/", formData);
    if (res.status !== 201) {
      return null;
    }
    return res.data.post;
  } catch (err) {
    return null;
  }
};

export const getBlogPosts = async () => {
  try {
    const res = await api.get("/api/blogPosts/");
    if (res.status !== 200) {
      return null;
    }
    return res.data.posts;
  } catch (err) {
    return null;
  }
};

export const getBlogPost = async (id) => {
  try {
    const res = await api.get(`/api/blogPosts/${id}`);
    if (res.status !== 200) {
      return null;
    }
    return res.data.post;
  } catch (err) {
    return null;
  }
};

export const updateBlogPost = async (id, formData) => {
  try {
    const res = await api.put(`/api/blogPosts/${id}`, formData);
    if (res.status !== 200) {
      return null;
    }
    return res.data.post;
  } catch (err) {
    return null;
  }
};

export const deleteBlogPost = async (id) => {
  try {
    const res = await api.delete(`/api/blogPosts/${id}`);
    if (res.status !== 204) {
      return null;
    }
    return true;
  } catch (err) {
    return null;
  }
};