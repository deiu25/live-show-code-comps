import { fetchWithCredentialsBlog } from "../helper/fetchWithCredentialsBlog";

const BACKEND_URL = "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api/blogPosts/`;

// create blog post
const createBlogPost = (data) => {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('content', data.content);
  
  if (data.headerImage) {
    formData.append('headerImage', data.headerImage);
  }

  console.log('Sending blog post data to server:', data);

  return fetchWithCredentialsBlog(API_URL, {
    method: 'POST',
    body: formData,
  }).then(response => {
    if (!response.ok) {
      console.error('Failed to create blog post:', response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }).then(data => {
    console.log('Blog post successfully created:', data);
    return data;
  }).catch(error => {
    console.error('Error creating blog post:', error);
  });
};

const blogPostService = {
  createBlogPost,
};

export default blogPostService;