//postService.js
const BACKEND_URL = "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api/posts/`;

// create post
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

// get all posts
const getPosts = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

//get post by id
const getPostById = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok, status code: ${response.status}`);
    }
     console.log(response);
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (err) {
    throw err;
  }
};

const postService = {
  createPost,
  getPosts,
  getPostById,
};

export default postService;