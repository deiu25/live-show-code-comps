import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "../../service/postService";

// Define the initial state of the slice
const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

// Create the async thunk for fetching all posts
export const savePost = createAsyncThunk(
  "posts/addNewPost",
  async (post, thunkAPI) => {
    const response = await postService.createPost(post);
    return response;
  }
);

// Create the slice
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: {
    // Add reducers for the async thunk
    [savePost.pending]: (state) => {
        state.isLoading = true;
      },
      [savePost.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      },
      [savePost.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      },
    },
  });
  
  export default postSlice.reducer;