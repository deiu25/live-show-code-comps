import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./aplication/home/pages/home/Home";
import { HomeAllPosts } from "./aplication/codeLC/components/home/home-posts/HomeAllPosts";
import { About } from "./aplication/about/pages/about/About";
import { Login } from "./aplication/auth/pages/auth/Login";
import { Signup } from "./aplication/auth/pages/auth/Singup";
import { useDispatch, useSelector } from "react-redux";
import {getLoginStatus, getUser, selectIsLoggedIn, selectUser } from "./redux/features/auth/authSlice";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChangePassword } from "./aplication/auth/pages/changePassword/ChangePassword";
import { Leyout } from "./aplication/auth/components/layout/Leyaout";
import { Forgot } from "./aplication/auth/pages/auth/Forgot";
import { Reset } from "./aplication/auth/pages/auth/Reset";
import { LoginWithCode } from "./aplication/auth/pages/auth/LoginWithCode";
import { Verify } from "./aplication/auth/pages/auth/Verify";
import { Profile } from "./aplication/auth/pages/profile/Profile";
import { UserList } from "./aplication/auth/pages/userList/UserList";
import { NewProject } from "./aplication/codeLC/pages/newProject/NewProject";
import { ThePost } from "./aplication/codeLC/pages/thePost/ThePost";

import NewBlogPost from "./aplication/blog/pages/create-blog-post/NewBlogPost";
import { BlogPosts } from "./aplication/blog/pages/blog-posts/BlogPosts";
import { BlogPost } from "./aplication/blog/pages/blog-post/BlogPost";
import { JavascriptCourse } from "./aplication/learn/pages/javascript-course/JavascriptCourse";
import NewCourse from "./aplication/learn/pages/create-blog-post/NewCourse";


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
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/post/:id" element={<ThePost />} />
            <Route path="/about" element={<About />} />
            <Route path="/javascriptCourse" element={<JavascriptCourse />} />
            {isLoggedIn && (
              <>
              <Route path="/NewProject" element={<NewProject />} />
              <Route path="/NewBlogPost" element={<NewBlogPost />} />
              <Route path="/NewCourse" element={<NewCourse />} />
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
