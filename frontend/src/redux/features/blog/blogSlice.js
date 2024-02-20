// blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteBlogPostService, getBlogPost, getBlogPosts, toggleLikeBlogPost } from "./blogService";

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

// Add an asynchronous thunk to toggle like for a post
export const toggleLike = createAsyncThunk(
  "blog/toggleLike",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await toggleLikeBlogPost(postId);
      if (!response) {
        throw new Error('Failed to toggle like');
      }
      return { postId, likesCount: response.likesCount };
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
    // Define the likeBlogPost action

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
      builder.addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, likesCount } = action.payload;
        const index = state.items.findIndex(item => item._id === postId);
        if (index !== -1) {
          state.items[index].likesCount = likesCount;
        }
      });
  },
});

export default blogPostSlice.reducer;
