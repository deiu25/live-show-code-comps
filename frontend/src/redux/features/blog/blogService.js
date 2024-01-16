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
    return res.json();
  }
  catch (error) {
    console.log(error);
  }
};
