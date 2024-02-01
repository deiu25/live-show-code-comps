// courseSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCoursePost, getCoursePosts, getCoursePost } from "./coursesService";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  item: null,
};

// Add an asynchronous thunk to fetch the posts
export const fetchCoursePosts = createAsyncThunk(
  "course/fetchCoursePosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCoursePosts();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add an asynchronous thunk to fetch a single post
export const fetchCoursePost = createAsyncThunk(
  "course/fetchCoursePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getCoursePost(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add an asynchronous thunk to delete a post
export const deleteCoursePost = createAsyncThunk(
  "course/deleteCoursePost",
  async (id, { rejectWithValue }) => {
    const response = await createCoursePost(id);
    if (!response.success) {
      return rejectWithValue(response);
    }
    return response.id;
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    // ... other reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCoursePost.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteCoursePost.rejected, (state, action) => {
        state.error = action.payload;
      });
      builder.addCase(fetchCoursePosts.fulfilled, (state, action) => {
        state.items = action.payload;
      });   
      builder.addCase(fetchCoursePost.fulfilled, (state, action) => {
        state.item = action.payload;
      });   
  },
});

export default courseSlice.reducer;
