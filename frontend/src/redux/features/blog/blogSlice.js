// blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteBlogPostService, getBlogPost, getBlogPosts } from "./blogService";

const initialState = {
  blogPosts: [],
  data: [],
  headerImageURL: "",
  post: null,
  isLoading: false,
  error: null,
  title: "",
  content: "",
  likesMap: {},
};

// Adaugă un thunk asincron pentru a prelua postările
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

// Adaăugă un thunk asincron pentru a prelua o postare după id  
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


// Async thunk for deleting a blog post
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
        state.blogPosts = state.blogPosts.filter(
          (post) => post.id !== action.payload
        );
      })
      .addCase(deleteBlogPost.rejected, (state, action) => {
        state.error = action.payload;
      });
      builder.addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.blogPosts = action.payload;
      });   
      builder.addCase(fetchBlogPost.fulfilled, (state, action) => {
        state.post = action.payload;
      });   
  },
});

export default blogPostSlice.reducer;
