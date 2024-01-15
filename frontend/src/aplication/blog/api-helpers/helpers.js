import api from "./api";

export const createBlogPost = async (formData) => {
  try {
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

export const getAllPosts = async (page = 1) => {
  const res = await api.get("/posts", {
    params: {
      page,
    },
  });

  if (res.status !== 200) {
    return console.log("Unable to fetch posts");
  }

  const data = res.data;
  return data;
};

export const getPostDetails = async (id) => {
  const res = await api.get(`/posts/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unable to fetch diary");
  }

  const resData = await res.data;
  return resData;
};

export const updatePost = async (id, formData) => {
  try {
    const res = await api.put(`/posts/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status !== 200) {
      console.error("A apărut o eroare: starea răspunsului nu este 200");
      return null;
    }

    return res.data.post;
  } catch (err) {
    console.error("A apărut o eroare în timpul actualizării postării:", err);
    return null;
  }
};

export const deleteImage = async (public_id) => {
  try {
    const res = await api.delete(`/images/${public_id}`);

    if (res.status !== 200) {
      console.error("A apărut o eroare: starea răspunsului nu este 200");
      return null;
    }

    return res.data;
  } catch (err) {
    console.error("A apărut o eroare în timpul ștergerii imaginii:", err);
    return null;
  }
};

export const deletePost = async (id) => {
  try {
    const res = await api.delete(`/posts/${id}`);
    if (res.status !== 200) {
      console.error("A apărut o eroare: starea răspunsului nu este 200");
      return null;
    }
    return res.data;
  } catch (err) {
    console.error("A apărut o eroare în timpul ștergerii postării:", err);
    return null;
  }
};