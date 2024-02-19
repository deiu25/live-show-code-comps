// blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteBlogPostService, getBlogPost, getBlogPosts, likeBlogPost } from "./blogService";
import { getLikesForPost } from "../posts/postSlice";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  item: null,
  likesMap: {},
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

// Create the async thunk for liking or unliking a BlogPost
export const likeOrUnlikeBlogPost = createAsyncThunk(
  "blog/likeBlogPost",
  async (id, thunkAPI) => {
    const response = await likeBlogPost(id);
    return response;
  }
);

// Create the async thunk to get likes for a BlogPost
export const getLikesForBlogPost = createAsyncThunk(
  "blog/getLikesForBlogPost",
  async (id, thunkAPI) => {
    const response = await getLikesForPost(id);
    return response;
  }
);


const blogPostSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    // Define the likeBlogPost action
    likeBlogPost(state, action) {
      const { postId, userId } = action.payload;
      if (state.likesMap[postId]) {
        state.likesMap[postId].push(userId);
      } else {
        state.likesMap[postId] = [userId];
      }
    }
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
      builder.addCase(likeOrUnlikeBlogPost.fulfilled, (state, action) => {
        state.likesMap[action.payload.id] = action.payload.likes;
      });
      builder.addCase(getLikesForBlogPost.fulfilled, (state, action) => {
        state.likesMap[action.payload.id] = action.payload.likes;
      });
  },
});

export default blogPostSlice.reducer;
