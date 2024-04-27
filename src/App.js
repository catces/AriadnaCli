import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import About from './components/About/About';
import Layout from './components/Layout/Layout';
import UserDetails from './components/UserDetails/UserDetails';
import { useSelector } from 'react-redux';

function App() {
  return (
    <div className = "App">  
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path = '' element = { <Home/> }/>
          <Route path = '/profile' element = { <UserDetails/> }/>
          <Route path = '/login-register' element = { <Register /> }/>
          <Route path = '/about' element = { <About/> }/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;