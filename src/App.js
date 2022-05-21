import './App.css';
import { BrowserRouter} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    </div>
  );
}

export default App;
