import React from 'react';
import { Switch, Route } from 'wouter';
import Home from './pages/Home';
import DashboardLayout from './layouts/DashboardLayout';
import Trading from './pages/Trading';
import AICopilot from './pages/AICopilot';
import SocialFeed from './pages/SocialFeed';
import Messaging from './pages/Messaging';
import Analytics from './pages/Analytics';
import Leaderboard from './pages/Leaderboard';
import Onboarding from './pages/Onboarding';
import Referrals from './pages/Referrals';
import APIVault from './pages/APIVault';
import ColdVault from './pages/ColdVault';
import Settings from './pages/Settings';
import DAOGovernance from './pages/DAOGovernance';
import QuantumVault from './pages/QuantumVault';
import AIWealth from './pages/AIWealth';
import CrossChainBridge from './pages/CrossChainBridge';
import Achievements from './pages/Achievements';
import Notifications from './pages/Notifications';
import Portfolio from './pages/Portfolio';
import MarketData from './pages/MarketData';
import NotFound from './pages/NotFound';
import CharityHub from './pages/CharityHub';
import MiniPrograms from './pages/MiniPrograms';
export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard/*" component={() => (
        <DashboardLayout>
          <Switch>
            <Route path="/trading" component={Trading} />
            <Route path="/copilot" component={AICopilot} />
            <Route path="/social" component={SocialFeed} />
            <Route path="/messages" component={Messaging} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/onboarding" component={Onboarding} />
            <Route path="/referrals" component={Referrals} />
            <Route path="/api-vault" component={APIVault} />
            <Route path="/vault" component={ColdVault} />
            <Route path="/settings" component={Settings} />
            <Route path="/dao" component={DAOGovernance} />
            <Route path="/quantum-vault" component={QuantumVault} />
            <Route path="/ai-wealth" component={AIWealth} />
            <Route path="/bridge" component={CrossChainBridge} />
            <Route path="/achievements" component={Achievements} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/market" component={MarketData} />
            <Route path="/charity" component={CharityHub} />
            <Route path="/mini-programs" component={MiniPrograms} />
            <Route component={NotFound} />
          </Switch>
        </DashboardLayout>
      )} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}