import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Auth from './pages/Auth';
import PostAnnonce from './pages/PostAnnonce';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostAnnonce />} />
        <Route path="/search/:item" element={<Search />} />
        <Route path="/authentification/:param" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
