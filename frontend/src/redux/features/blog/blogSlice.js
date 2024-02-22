// blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteBlogPostService, getBlogPost, getBlogPosts, toggleLikeBlogPost } from "./blogService";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  item: null,
  postId: null,
  likesCount: 0,
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

//Add an asynchronous thunk to toggle a like
export const toggleLike = createAsyncThunk(
  "blog/toggleLike",
  async ({ postId }, { rejectWithValue }) => {
    try {
      const data = await toggleLikeBlogPost(postId);

      if (data.likesCount !== undefined) {
        return { postId, likesCount: data.likesCount };
      } else {
        throw new Error("Response from toggleLikeBlogPost does not contain likesCount");
      }
    } catch (error) {
      console.error('Error toggling like in thunk:', error);
      return rejectWithValue(error.toString());
    }
  }
);

const blogPostSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {

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
        const index = state.items.findIndex(post => post._id === action.payload.postId);
        if (index !== -1) {
          state.items[index].likesCount = action.payload.likesCount;
        }
      });  
      
  },
});

export const { updateLikesCountForPost } = blogPostSlice.actions;

export default blogPostSlice.reducer;
