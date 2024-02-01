// blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteBlogPostService, getBlogPost, getBlogPosts } from "./blogService";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  item: null,
};

// Add an asynchronous thunk to fetch the posts
export const fetchBlogPosts = createAsyncThunk(
  "blog/fetchBlogPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBlogPosts();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add an asynchronous thunk to fetch a single post
export const fetchBlogPost = createAsyncThunk(
  "blog/fetchBlogPost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getBlogPost(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add an asynchronous thunk to delete a post
export const deleteBlogPost = createAsyncThunk(
  "blog/deleteBlogPost",
  async (id, { rejectWithValue }) => {
    const response = await deleteBlogPostService(id);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.id;
  }
);

const blogPostSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    // ... other reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteBlogPost.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteBlogPost.rejected, (state, action) => {
        state.error = action.payload;
      });
      builder.addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.items = action.payload;
      });   
      builder.addCase(fetchBlogPost.fulfilled, (state, action) => {
        state.item = action.payload;
      });   
  },
});

export default blogPostSlice.reducer;
