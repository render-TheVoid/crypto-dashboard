import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './Home/Home';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Coin from './components/Pages/Coin/Coin';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:coinId' element={<Coin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
