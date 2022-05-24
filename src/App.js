import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
        <Routes>
          <Route exact path="/register" element={<Register/>}/>
           <Route exact path="/" element={<Home/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;