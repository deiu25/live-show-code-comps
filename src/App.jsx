import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import LiveProvider from './components/liveProvider/LiveProvider';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<LiveProvider />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
