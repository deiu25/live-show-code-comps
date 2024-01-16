// // blogSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import blogPostService from "./blogService";

// const initialState = {
//     posts: [],
//     data: [],
//     headerImageURL: "",
//     post: null,
//     isLoading: false,
//     error: null,
//     title: "",
//     content: "",
//     likesMap: {},
//   };

// // Create the async thunk for fetching all posts
// export const saveBlogPost = createAsyncThunk(
//   "blogPosts/addNewPostBlogPost",
//   async (post, thunkAPI) => {
//     try {
//       const response = await blogPostService.createBlogPost(post);
//       return response;
//     } catch (error) {
//       // Use rejectWithValue to pass a custom payload to the rejected action
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // Create the slice using the builder callback notation for extraReducers
// const blogPostSlice = createSlice({
//     name: "blogPosts",
//     initialState,
//     reducers: {
//       setTitle: (state, action) => {
//         state.title = action.payload;
//       },
//       setHeaderImage: (state, action) => {
//         state.headerImageURL = action.payload;
//       },
//       setContent: (state, action) => {
//         state.content = action.payload;
//       },
//       clearForm: (state, action) => {
//         state.title = "";
//         state.content = "";
//       },
//     },
//     extraReducers: (builder) => {
//       builder
//         .addCase(saveBlogPost.pending, (state) => {
//           console.log('Saving blog post...'); // Log the pending state
//           state.isLoading = true;
//         })
//         .addCase(saveBlogPost.fulfilled, (state, action) => {
//           console.log('Blog post saved successfully:', action.payload); // Log the successful save
//           state.posts.push(action.payload); // Assuming the payload contains the new post
//           state.isLoading = false;
//           state.error = null;
//         })
//         .addCase(saveBlogPost.rejected, (state, action) => {
//           console.error('Failed to save blog post:', action.error.message); // Log the error
//           state.isLoading = false;
//           state.error = action.error.message;
//         });
//     },
//   });

// // Export the actions
// export const { setTitle, setHeaderImage, setContent, clearForm } = blogPostSlice.actions;

// // Export the reducer
// export default blogPostSlice.reducer;