//postSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "../../service/postService";

// Define the initial state of the slice
const initialState = {
  posts: {},
  data: [],
  isLoading: false,
  error: null
}

// Create the async thunk for fetching all posts
export const savePost = createAsyncThunk(
  "posts/addNewPost",
  async (post, thunkAPI) => {
    const response = await postService.createPost(post);
    return response;
  }
);

// Create the async thunk for fetching all posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    const response = await postService.getPosts();
    return response;
  }
);

// Create the slice
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Poți adăuga reduceri obișnuite aici dacă este nevoie
  },
  extraReducers: (builder) => {
    // Tratează stările pentru savePost
    builder
      .addCase(savePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      .addCase(savePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Tratează stările pentru fetchPosts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })  
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
