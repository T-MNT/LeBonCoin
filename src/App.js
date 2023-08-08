import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search/:item" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
