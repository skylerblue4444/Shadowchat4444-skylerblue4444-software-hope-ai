import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Wallet from './pages/Wallet';
import Live from './pages/Live';
import Casino from './pages/Casino';
import Staking from './pages/Staking';
import Exchange from './pages/Exchange';
// Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/live" element={<Live />} />
        <Route path="/casino" element={<Casino />} />
        <Route path="/staking" element={<Staking />} />
        <Route path="/exchange" element={<Exchange />} />
      </Routes>
    </Router>
  );
}

export default App;