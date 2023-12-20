const BACKEND_URL = "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api/posts/`;

// postService.js
const createPost = async (post) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok, status code: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

const postService = {
  createPost,
};

export default postService;