import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import axios from 'axios';
import { HomeAllPosts } from './components/home/home-posts/HomeAllPosts';
import { About } from './pages/about/About';
import { Contact } from './pages/contact/Contact';
import { Login } from './auth/pages/auth/Login';
import { Signup } from './auth/pages/auth/Singup';

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<HomeAllPosts />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
