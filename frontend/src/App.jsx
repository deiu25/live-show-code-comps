import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import axios from "axios";
import { HomeAllPosts } from "./components/home/home-posts/HomeAllPosts";
import { About } from "./pages/about/About";
import { Login } from "./auth/pages/auth/Login";
import { Signup } from "./auth/pages/auth/Singup";
import { useDispatch, useSelector } from "react-redux";
import {getLoginStatus, getUser, selectIsLoggedIn, selectUser } from "./redux/features/auth/authSlice";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChangePassword } from "./auth/pages/changePassword/ChangePassword";
import { Leyout } from "./auth/components/layout/Leyaout";
import { Forgot } from "./auth/pages/auth/Forgot";
import { Reset } from "./auth/pages/auth/Reset";
import { LoginWithCode } from "./auth/pages/auth/LoginWithCode";
import { Verify } from "./auth/pages/auth/Verify";
import { Profile } from "./auth/pages/profile/Profile";
import { UserList } from "./auth/pages/userList/UserList";
import { NewProject } from "./pages/newProject/NewProject";
import { ThePost } from "./pages/thePost/ThePost";

import NewBlogPost from "./aplication/blog/pages/create-blog-post/NewBlogPost";
import { BlogPosts } from "./aplication/blog/pages/blog-posts/BlogPosts";


axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getLoginStatus());
    if (isLoggedIn && user === null) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, user]);

  return (
    <>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<HomeAllPosts />} />
            <Route path="/blog" element={<BlogPosts />} />
            <Route path="/post/:id" element={<ThePost />} />
            <Route path="/about" element={<About />} />
            {isLoggedIn && (
              <>
              <Route path="/NewProject" element={<NewProject />} />
              <Route path="/NewBlogPost" element={<NewBlogPost />} />
              </>
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/singup" element={<Signup />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/resetPassword/:resetToken" element={<Reset />} />
            <Route path="/loginWithCode/:email" element={<LoginWithCode />} />

            <Route
              path="/verify/:verificationToken"
              element={
                <Leyout>
                  <Verify />
                </Leyout>
              }
            />

            <Route
              path="/profile"
              element={
                <Leyout>
                  <Profile />
                </Leyout>
              }
            />
            <Route
              path="/changePassword"
              element={
                <Leyout>
                  <ChangePassword />
                </Leyout>
              }
            />
            <Route
              path="/users"
              element={
                <Leyout>
                  <UserList />
                </Leyout>
              }
            />
            
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
