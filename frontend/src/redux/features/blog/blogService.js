import { fetchWithCredentialsBlog } from "../helper/fetchWithCredentialsBlog";

const BACKEND_URL = "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api/blogPosts/`;

// create blog post
export const createBlogPost = async (formData) => {
  try {
    const res = await fetchWithCredentialsBlog(`${API_URL}`, {
      method: "POST",
      body: formData,
    });
    return res;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

// get all blog posts
export const getBlogPosts = async () => {
  try {
    const res = await fetchWithCredentialsBlog(`${API_URL}`);
    return res.posts;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

// get blog post by id
export const getBlogPost = async (id) => {
  try {
    const res = await fetchWithCredentialsBlog(`${API_URL}${id}`);
    return res.post;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

// update blog post by id
export const updateBlogPost = async (id, formData) => {
  try {
    const res = await fetchWithCredentialsBlog(`${API_URL}${id}`, {
      method: "PUT",
      body: formData,
    });
    return res;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

// delete blog post by id
export const deleteBlogPostService  = async (id) => {
  try {
    const res = await fetchWithCredentialsBlog(`${API_URL}${id}`, {
      method: 'DELETE',
    });    

    if (res.status === 204) {
      return { success: true, id };
    } else {
      return { success: false, id };
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return { 
      success: false, 
      id, 
      error: { message: error.message, status: error.status } 
    };
  }
}
