//postSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

// Define the initial state of the slice
const initialState = {
  posts: [],
  data: [],
  post: null,
  isLoading: false,
  error: null,
  title: "",
  content: "",
  likesMap: {},
};

// Create the async thunk for saving a post
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

// Create the async thunk for fetching a post by id
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id, thunkAPI) => {
    const response = await postService.getPostById(id);
    return response;
  }
);

// Create the async thunk for updating a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, ...post }, thunkAPI) => {
    const response = await postService.updatePost(id, post);
    return response;
  }
);

// Create the async thunk for deleting a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    const response = await postService.deletePost(id);
    return response;
  }
);

// Create the async thunk for liking or unliking a post
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (id, thunkAPI) => {
    const response = await postService.likePost(id);
    return response;
  }
);

// Create the async thunk to get likes for a post
export const getLikesForPost = createAsyncThunk(
  "posts/getLikesForPost",
  async (id, thunkAPI) => {
    const response = await postService.getLikesForPost(id);
    return response;
  }
);

// Create the slice
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Define the likePost action
    likePost(state, action) {
      const { postId, userId } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        const isLiked = post.likes.find((like) => like.user === userId);
        if (isLiked) {
          // Dacă utilizatorul a dat deja like, atunci îl scoatem din lista de like-uri
          post.likes = post.likes.filter((like) => like.user !== userId);
        } else {
          // Altfel, adăugăm utilizatorul în lista de like-uri
          post.likes.push({ user: userId });
        }
      }
    },
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

    // Tratează stările pentru fetchPostById
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload.data;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Tratează stările pentru updatePost
    builder
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload.data;
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.data.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload.data;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Tratează stările pentru deletePost
    builder
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(
          (post) => post.id !== action.payload.data.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Tratează stările pentru likePost or unlikePost
    builder
      .addCase(likePost.pending, (state) => {
        console.log('Like post request is pending...');
        state.isLoading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, likeCount } = action.payload;
        // Actualizăm numărul de like-uri pentru postarea specifică
        state.likesMap[postId] = likeCount;
      })
      .addCase(likePost.rejected, (state, action) => {
        console.log('Like post request failed:', action.error.message);
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Tratează stările pentru getLikesForPost
    builder
      .addCase(getLikesForPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLikesForPost.fulfilled, (state, action) => {
        state.isLoading = false;
        const postId = action.meta.arg;
        const likesCount = action.payload.likesCount;
        const usersWhoLiked = action.payload.data.map(like => like.user);
        state.likesMap[postId] = {
          likesCount,
          users: usersWhoLiked,
        };
      })
      .addCase(getLikesForPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
