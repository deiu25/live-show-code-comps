// blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteBlogPostService  } from "./blogService";

const initialState = {
    posts: [],
    data: [],
    headerImageURL: "",
    post: null,
    isLoading: false,
    error: null,
    title: "",
    content: "",
    likesMap: {},
  };

// Async thunk for deleting a blog post
export const deleteBlogPost = createAsyncThunk(
    'blog/deleteBlogPost',
    async (id, { rejectWithValue }) => {
      const response = await deleteBlogPostService (id);
      if (!response.success) {
        return rejectWithValue(response);
      }
      return response.id;
    }
  );

  const blogPostSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
      // ... other reducers
    },
    extraReducers: (builder) => {
      builder
        .addCase(deleteBlogPost.fulfilled, (state, action) => {
          // Handle successful deletion
          state.posts = state.posts.filter(post => post.id !== action.payload);
        })
        .addCase(deleteBlogPost.rejected, (state, action) => {
          // Handle failure or error
          // Poti adauga logica pentru gestionarea erorilor sau a eșecurilor
        });
    },
  });
  
  // Export the reducer
  export default blogPostSlice.reducer;