import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Auth from './pages/Auth';
import PostAnnonce from './pages/PostAnnonce';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserSlice } from './redux/slices/userSlice';
import jwtDecode from 'jwt-decode';
import ProductPage from './pages/ProductPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('leboncoin login token : ');
    console.log(token);
    if (token) {
      dispatch(setUserSlice(jwtDecode(token)));
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostAnnonce />} />
        <Route path="/search/:item" element={<Search />} />
        <Route path="/authentification/:param" element={<Auth />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
