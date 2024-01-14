// blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogPostService from "./blogService";

const initialState = {
    posts: [],
    data: [],
    headerImage: null,
    post: null,
    isLoading: false,
    error: null,
    title: "",
    content: "",
    likesMap: {},
  };

// Create the async thunk for fetching all posts
export const saveBlogPost = createAsyncThunk(
    "posts/addNewPostBlogPost",
    async (post, thunkAPI) => {
      const response = await blogPostService.createPost(post);
      return response;
    }
  );




// Create the slice using the builder callback notation for extraReducers
const blogPostSlice = createSlice({
    name: "blogPosts",
    initialState,
    reducers: {
      setTitle: (state, action) => {
        state.title = action.payload;
      },
      setHeaderImage: (state, action) => {
        state.headerImage = action.payload;
      },
      setContent: (state, action) => {
        state.content = action.payload;
      },
      clearForm: (state, action) => {
        state.title = "";
        state.content = "";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(saveBlogPost.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(saveBlogPost.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(saveBlogPost.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
    },
  });

// Export the actions
export const { setTitle, setHeaderImage, setContent, clearForm } = blogPostSlice.actions;

// Export the reducer
export default blogPostSlice.reducer;