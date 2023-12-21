import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../redux/features/auth/authSlice';
import emailReducer from '../../redux/features/email/emailSlice';
import filterSlice from '../../redux/features/auth/filterSlice';
import postReducer from "../../redux/service/postService";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        email: emailReducer,
        filter: filterSlice,
        posts: postReducer,
    }
})