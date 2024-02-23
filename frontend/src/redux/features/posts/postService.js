import { fetchWithCredentials } from "../helper/fetchWithCredentials ";

//postService.js
const BACKEND_URL = "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api/posts/`;

// create post
const createPost = (post) => {
  return fetchWithCredentials(API_URL, {
    method: 'POST',
    body: JSON.stringify(post),
  });
};

// get all posts
const getPosts = () => {
  return fetchWithCredentials(API_URL, {
    method: 'GET',
  });
};

//get post by id
const getPostById = async (id) => {
  return fetchWithCredentials(`${API_URL}${id}`, {
    method: 'GET',
  });
};

//update post
const updatePost = (id, post) => {
  return fetchWithCredentials(`${API_URL}${id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
  });
};

//like or unlike post
export const likePost = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}/like`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to toggle like, server responded with status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

//delete post
const deletePost = (id) => {
  return fetchWithCredentials(`${API_URL}${id}`, {
    method: 'DELETE',
  });
};

const postService = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
};

export default postService;