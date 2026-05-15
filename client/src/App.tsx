import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'wouter';
import { Toaster } from 'sonner';
import DashboardLayout from './components/DashboardLayout';

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
const Home           = lazy(() => import('./pages/Home'));
const NotFound       = lazy(() => import('./pages/NotFound'));

// Dashboard / Platform
const Trading        = lazy(() => import('./pages/Trading'));
const AICopilot      = lazy(() => import('./pages/AICopilot'));
const SocialFeed     = lazy(() => import('./pages/SocialFeed'));
const Messaging      = lazy(() => import('./pages/Messaging'));
const Analytics      = lazy(() => import('./pages/Analytics'));
const Leaderboard    = lazy(() => import('./pages/Leaderboard'));
const Onboarding     = lazy(() => import('./pages/Onboarding'));
const Referrals      = lazy(() => import('./pages/Referrals'));
const APIVault       = lazy(() => import('./pages/APIVault'));
const ColdVault      = lazy(() => import('./pages/ColdVault'));
const Settings       = lazy(() => import('./pages/Settings'));
const DAOGovernance  = lazy(() => import('./pages/DAOGovernance'));
const QuantumVault   = lazy(() => import('./pages/QuantumVault'));
const AIWealth       = lazy(() => import('./pages/AIWealth'));
const CrossChainBridge = lazy(() => import('./pages/CrossChainBridge'));
const Achievements   = lazy(() => import('./pages/Achievements'));
const Notifications  = lazy(() => import('./pages/Notifications'));
const Portfolio      = lazy(() => import('./pages/Portfolio'));
const MarketData     = lazy(() => import('./pages/MarketData'));
const CharityHub     = lazy(() => import('./pages/CharityHub'));
const MiniPrograms   = lazy(() => import('./pages/MiniPrograms'));
const NFTMarketplace = lazy(() => import('./pages/NFTMarketplace'));

// New pages
const Marketplace    = lazy(() => import('./pages/Marketplace'));
const Checkout       = lazy(() => import('./pages/Checkout'));
const LiveStream     = lazy(() => import('./pages/LiveStream'));
const CommunityBoards = lazy(() => import('./pages/CommunityBoards'));

// IT Resolutions
const ITHome         = lazy(() => import('./pages/ITHome'));
const ITServices     = lazy(() => import('./pages/ITServices'));
const ITProducts     = lazy(() => import('./pages/ITProducts'));
const ITTalent       = lazy(() => import('./pages/ITTalent'));
const ITBook         = lazy(() => import('./pages/ITBook'));
const ITContact      = lazy(() => import('./pages/ITContact'));
const ITAbout        = lazy(() => import('./pages/ITAbout'));

// ─── Loading Fallback ─────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-xs text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// ─── Dashboard wrapper ────────────────────────────────────────────────────────
function DashboardRoutes() {
  return (
    <DashboardLayout>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/dashboard"            component={Analytics} />
          <Route path="/dashboard/trading"    component={Trading} />
          <Route path="/dashboard/copilot"    component={AICopilot} />
          <Route path="/dashboard/social"     component={SocialFeed} />
          <Route path="/dashboard/messages"   component={Messaging} />
          <Route path="/dashboard/analytics"  component={Analytics} />
          <Route path="/dashboard/leaderboard" component={Leaderboard} />
          <Route path="/dashboard/onboarding" component={Onboarding} />
          <Route path="/dashboard/referrals"  component={Referrals} />
          <Route path="/dashboard/api-vault"  component={APIVault} />
          <Route path="/dashboard/vault"      component={ColdVault} />
          <Route path="/dashboard/settings"   component={Settings} />
          <Route path="/dashboard/dao"        component={DAOGovernance} />
          <Route path="/dashboard/quantum-vault" component={QuantumVault} />
          <Route path="/dashboard/ai-wealth"  component={AIWealth} />
          <Route path="/dashboard/bridge"     component={CrossChainBridge} />
          <Route path="/dashboard/achievements" component={Achievements} />
          <Route path="/dashboard/notifications" component={Notifications} />
          <Route path="/dashboard/portfolio"  component={Portfolio} />
          <Route path="/dashboard/market"     component={MarketData} />
          <Route path="/dashboard/charity"    component={CharityHub} />
          <Route path="/dashboard/mini-programs" component={MiniPrograms} />
          <Route path="/dashboard/nft"        component={NFTMarketplace} />
          {/* New routes */}
          <Route path="/dashboard/marketplace" component={Marketplace} />
          <Route path="/dashboard/checkout"   component={Checkout} />
          <Route path="/dashboard/live"       component={LiveStream} />
          <Route path="/dashboard/boards"     component={CommunityBoards} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </DashboardLayout>
  );
}

// ─── IT Resolutions wrapper (public, no auth) ─────────────────────────────────
function ITRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/it"           component={ITHome} />
        <Route path="/it/services"  component={ITServices} />
        <Route path="/it/products"  component={ITProducts} />
        <Route path="/it/talent"    component={ITTalent} />
        <Route path="/it/book"      component={ITBook} />
        <Route path="/it/contact"   component={ITContact} />
        <Route path="/it/about"     component={ITAbout} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/"        component={Home} />
          <Route path="/it/:rest*" component={ITRoutes} />
          <Route path="/it"       component={ITRoutes} />
          <Route path="/dashboard/:rest*" component={DashboardRoutes} />
          <Route path="/dashboard"        component={DashboardRoutes} />
          <Route path="/404"     component={NotFound} />
          <Route                 component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}
