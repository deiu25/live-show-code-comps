import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import axios from 'axios';
import { HomeAllPosts } from './components/home/home-posts/HomeAllPosts';
import { About } from './pages/about/About';
import { Contact } from './pages/contact/Contact';
import { Login } from './auth/pages/auth/Login';
import { Signup } from './auth/pages/auth/Singup';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginStatus, getUser, selectIsLoggedIn, selectUser } from './auth/redux/features/auth/authSlice';
import { useEffect } from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";

axios.defaults.withCredentials = true;

function App() {

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
  dispatch(getLoginStatus());
  if(isLoggedIn && user === null){
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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Signup />} />
      </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
