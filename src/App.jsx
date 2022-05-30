import './App.scss';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import AuthProvider from './context/auth';
import PrivateRoute from './components/PrivateRoute';
import React from 'react';

function App() {

  return (
    <AuthProvider>
        <BrowserRouter>
        <div className="App">
        <Navbar/>
        <Routes>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
          <Route exact path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
        </Routes>
        </div>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;