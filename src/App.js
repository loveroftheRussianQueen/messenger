import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AuthProvider from './context/auth';
import PrivateRoute from './components/PrivateRoute';
import React from 'react';

function App() {

  return (
    <AuthProvider>
        <BrowserRouter>
    <Navbar/>
        <Routes>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
          <Route exact path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
        </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;