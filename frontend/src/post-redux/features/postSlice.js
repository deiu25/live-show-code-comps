import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';

// Create the thunk for adding a new post
export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async (postData, { rejectWithValue }) => {
      try {
        const response = await postService.createPost(postData);
        return response.data; // Changed from 'response.post' to 'response.data'
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

// Initial state of the post slice
const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Create the slice
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // You can add additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;