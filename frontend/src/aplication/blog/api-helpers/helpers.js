import api from "./api";

export const createBlogPost = async (formData) => {
  console.log("Creating blog post...");
  try {
    console.log("Sending request to server...");
    const res = await api.post("/api/blogPosts/", formData);
    console.log("Server responded with status code:", res.status);
    if (res.status !== 201) {
      console.error("Server returned non-success status code:", res.status, res.data);
      return null;
    }
    console.log("Blog post successfully created:", res.data.post);
    return res.data.post;
  } catch (err) {
    console.error("Error response from server:", err.response ? err.response.data : err);
    return null;
  }
};