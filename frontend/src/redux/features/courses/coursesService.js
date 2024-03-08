import { fetchWithCredentialsBlog } from "../helper/fetchWithCredentialsBlog";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/content/course`;

// create course post
export const createCoursePost = async (formData) => {
  try {
    const res = await fetchWithCredentialsBlog(`${API_URL}`, {
      method: "POST",
      body: formData,
    });
    return res;
  }
  catch (error) {
    return null;
  }
};

// get all course Posts
export const getCoursePosts = async (category) => {
  try {
    const res = await fetchWithCredentialsBlog(`${API_URL}?category=${category}`);
    return res.items;
  } catch (error) {
    return null;
  }
};

// get course post by id
export const getCoursePost = async (id) => {
  try {
    const res = await fetchWithCredentialsBlog(`${API_URL}/${id}`);
    return res.item;
  }
  catch (error) {
    return null;
  }
};

// update course post by id
export const updateCoursePost = async (id, formData) => {
  try {
    const res = await fetchWithCredentialsBlog(`${API_URL}/${id}`, {
      method: "PUT",
      body: formData,
    });
    return res;
  } catch (error) {
    return null;
  }
};


// delete course post by id
export const deleteCoursePostService  = async (id) => {
  try {
    const res = await fetchWithCredentialsBlog(`${API_URL}/${id}`, {
      method: 'DELETE',
    });    
    if (res.status === 204) {
      return { success: true, id };
    } else {
      return { success: false, id };
    }
  } catch (error) {
    return { 
      success: false, 
      id, 
      error: { message: error.message, status: error.status } 
    };
  }
}
