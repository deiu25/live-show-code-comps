import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import LiveProvider from './components/liveProvider/LiveProvider';
import { HomeAllPosts } from './components/home/home-posts/HomeAllPosts';
import { About } from './pages/about/About';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<HomeAllPosts />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
