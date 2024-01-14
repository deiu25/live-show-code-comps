// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import emailReducer from "./features/email/emailSlice";
import filterSlice from "./features/auth/filterSlice";
import postReducer from "./features/posts/postSlice";
import blogPostSlice from "./features/blog/blogSlice";


// Create the store
const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    filter: filterSlice,
    posts: postReducer,
    blogPosts: blogPostSlice,
  },
});

// Export the store
export default store;