import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './app/Home/Home.jsx'
import Congrats from './app/Congrats/Congrats.jsx'
import Failure from './app/Failure/Failure'
import Admin from './app/Admin/Admin'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/congrats' element={<Congrats />} />
        <Route path='/failure' element={<Failure />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
