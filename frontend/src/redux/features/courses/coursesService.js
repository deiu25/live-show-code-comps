import { fetchWithCredentialsBlog } from "../helper/fetchWithCredentialsBlog";

const BACKEND_URL = "http://localhost:5000";
const API_URL = `${BACKEND_URL}/api/content/course`;

// create course post
export const createCoursePost = async (formData) => {
  try {
    const res = await fetchWithCredentialsBlog(`${API_URL}`, {
      method: "POST",
      body: formData,
    });
    console.log(res);
    return res;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};

// get all course Posts
export const getCoursePosts = async () => {
  try {
    const res = await fetchWithCredentialsBlog(`${API_URL}`);
    return res.items;
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
  }
  catch (error) {
    console.log(error);
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
    console.error('Error deleting course post:', error);
    return { 
      success: false, 
      id, 
      error: { message: error.message, status: error.status } 
    };
  }
}
