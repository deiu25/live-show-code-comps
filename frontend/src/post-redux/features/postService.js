import axios from "axios";

const BACKEND_URL = "http://localhost:5000";
export const API_URL = `${BACKEND_URL}/api/posts/`;

// Create Post
export const createPost = async (formData) => {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

const postService = {
  createPost,
};

export default postService;
