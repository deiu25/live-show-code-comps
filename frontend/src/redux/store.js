// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/posts/postSlice";

// Create the store
const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

// Export the store
export default store;