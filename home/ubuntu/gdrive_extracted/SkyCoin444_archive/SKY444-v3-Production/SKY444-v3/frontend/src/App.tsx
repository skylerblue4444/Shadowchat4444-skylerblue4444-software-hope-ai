// SKY444 — Made by Skyler Blue Spillers — Innovative Information Technology Resolutions LLC
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Mining from './pages/Mining';
import Staking from './pages/Staking';
import Swap from './pages/Swap';
import ShadowChat from './pages/ShadowChat';
import Casino from './pages/Casino';
import DarkMarket from './pages/DarkMarket';
import ITPortal from './pages/ITPortal';
import ICO from './pages/ICO';
import Governance from './pages/Governance';
import Charity from './pages/Charity';
import Bridge from './pages/Bridge';
import Creator from './pages/Creator';
import Quests from './pages/Quests';
import NFT from './pages/NFT';
import Live from './pages/Live';
import Videos from './pages/Videos';
import Invest from './pages/Invest';
import Burn from './pages/Burn';
import Explorer from './pages/Explorer';
import Send from './pages/Send';
import Profile from './pages/Profile';
import SkyForge from './pages/SkyForge';
import Payroll from './pages/Payroll';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mining" element={<Mining />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/shadowchat" element={<ShadowChat />} />
          <Route path="/casino" element={<Casino />} />
          <Route path="/darkmarket" element={<DarkMarket />} />
          <Route path="/itportal" element={<ITPortal />} />
          <Route path="/ico" element={<ICO />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/charity" element={<Charity />} />
          <Route path="/bridge" element={<Bridge />} />
          <Route path="/creator" element={<Creator />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/nft" element={<NFT />} />
          <Route path="/live" element={<Live />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/burn" element={<Burn />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/send" element={<Send />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skyforge" element={<SkyForge />} />
          <Route path="/payroll" element={<Payroll />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;