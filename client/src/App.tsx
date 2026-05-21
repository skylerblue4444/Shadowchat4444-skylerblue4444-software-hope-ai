import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'wouter';
import { Toaster } from 'sonner';
import DashboardLayout from './components/DashboardLayout';

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
const Home           = lazy(() => import('./pages/Home'));
const NotFound       = lazy(() => import('./pages/NotFound'));

// Core Dashboard / Platform
const Trading        = lazy(() => import('./pages/Trading'));
const AICopilot      = lazy(() => import('./pages/AICopilot'));
const HopeAICommandCenter = lazy(() => import('./pages/HopeAICommandCenter'));
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

// New Platform Pages (batch 2)
const Marketplace    = lazy(() => import('./pages/Marketplace'));
const Checkout       = lazy(() => import('./pages/Checkout'));
const LiveStream     = lazy(() => import('./pages/LiveStream'));
const CommunityBoards = lazy(() => import('./pages/CommunityBoards'));
const Staking        = lazy(() => import('./pages/Staking'));
const MiningDashboard = lazy(() => import('./pages/mining/SkyLuxMiningDashboard'));
const PolishedCasino = lazy(() => import('./pages/Polished_Casino'));
const PolishedDating = lazy(() => import('./pages/Polished_Dating'));
const PolishedLiveStream = lazy(() => import('./pages/Polished_LiveStream'));
const WalletPage     = lazy(() => import('./pages/Wallet'));
const Profile        = lazy(() => import('./pages/Profile'));
const ICOHub         = lazy(() => import('./pages/ICOHub'));
const ServiceCenter  = lazy(() => import('./pages/ServiceCenter'));

// New Platform Pages (batch 3 — 50-76)
const VideoFeed      = lazy(() => import('./pages/VideoFeed'));
const CreatorStudio  = lazy(() => import('./pages/CreatorStudio'));
const Events         = lazy(() => import('./pages/Events'));
const TokenSwap      = lazy(() => import('./pages/TokenSwap'));
const P2PExchange    = lazy(() => import('./pages/P2PExchange'));
const DeFiDashboard  = lazy(() => import('./pages/DeFiDashboard'));
const NFTCreator     = lazy(() => import('./pages/NFTCreator'));
const AIToolsHub     = lazy(() => import('./pages/AIToolsHub'));
const ITClientPortal = lazy(() => import('./pages/ITClientPortal'));
const ReferralCenter = lazy(() => import('./pages/ReferralCenter'));
const PortfolioTracker = lazy(() => import('./pages/PortfolioTracker'));
const GameCenter     = lazy(() => import('./pages/GameCenter'));
const MetaverseHub   = lazy(() => import('./pages/MetaverseHub'));
const PressKit       = lazy(() => import('./pages/PressKit'));
const FuturesTrading = lazy(() => import('./pages/FuturesTrading'));
const CopyTrading    = lazy(() => import('./pages/CopyTrading'));
const PriceAlerts    = lazy(() => import('./pages/PriceAlerts'));
const DAOTreasury    = lazy(() => import('./pages/DAOTreasury'));
const TokenBridge    = lazy(() => import('./pages/TokenBridge'));
const CharityLeaderboard = lazy(() => import('./pages/CharityLeaderboard'));
const PartnerPortal  = lazy(() => import('./pages/PartnerPortal'));
const Stories        = lazy(() => import('./pages/Stories'));
const TaxCenter      = lazy(() => import('./pages/TaxCenter'));
const AvatarBuilder  = lazy(() => import('./pages/AvatarBuilder'));
const AITradingBot   = lazy(() => import('./pages/AITradingBot'));
const ITMonitoring   = lazy(() => import('./pages/ITMonitoring'));
const ITInvoices     = lazy(() => import('./pages/ITInvoices'));
const NFTDrops       = lazy(() => import('./pages/NFTDrops'));

// New Platform Pages (batch 4 — 77-100)
const WatchParty     = lazy(() => import('./pages/WatchParty'));
const Podcast        = lazy(() => import('./pages/Podcast'));
const MusicPlayer    = lazy(() => import('./pages/MusicPlayer'));
const VirtualLand    = lazy(() => import('./pages/VirtualLand'));
const AIImageGen     = lazy(() => import('./pages/AIImageGen'));
const Spaces         = lazy(() => import('./pages/Spaces'));
const NFTAnalytics   = lazy(() => import('./pages/NFTAnalytics'));
const AIChat         = lazy(() => import('./pages/AIChat'));
const HopeAI         = lazy(() => import('./pages/HopeAI'));
const HopeAICommandCenter = lazy(() => import('./pages/HopeAICommandCenter'));
const HopeAiTradingRoom = lazy(() => import('./pages/HopeAiTradingRoom'));
const AIVoiceCompanion = lazy(() => import('./pages/AIVoiceCompanion'));
const AIAgent        = lazy(() => import('./pages/AIAgent'));
const SkyBlueITDashboard = lazy(() => import('./pages/SkyBlueITDashboard'));
const ShadowChatMessaging = lazy(() => import('./pages/ShadowChatMessaging'));
const Launchpad      = lazy(() => import('./pages/Launchpad'));
const GlobalCompliance = lazy(() => import('./pages/GlobalCompliance'));
const SkyBlueStore   = lazy(() => import('./pages/SkyBlueStore'));
const ShadowTV       = lazy(() => import('./pages/ShadowTV'));
const ShadowPay      = lazy(() => import('./pages/ShadowPay'));
const ShadowSocial   = lazy(() => import('./pages/ShadowSocial'));
const ShadowMarket   = lazy(() => import('./pages/ShadowMarket'));
const ShadowExchange = lazy(() => import('./pages/ShadowExchange'));
const ShadowNews     = lazy(() => import('./pages/ShadowNews'));
const ShadowLearn    = lazy(() => import('./pages/ShadowLearn'));
const ShadowID       = lazy(() => import('./pages/ShadowID'));
const ShadowGov      = lazy(() => import('./pages/ShadowGov'));
const ShadowVault    = lazy(() => import('./pages/ShadowVault'));
const ShadowHub      = lazy(() => import('./pages/ShadowHub'));

// Additional Features
const CoinEconomy    = lazy(() => import('./pages/CoinEconomy'));
const ComponentShowcase = lazy(() => import('./pages/ComponentShowcase'));
const CreatorDashboard = lazy(() => import('./pages/CreatorDashboard'));
const Dashboard      = lazy(() => import('./pages/Dashboard'));
const Dating         = lazy(() => import('./pages/Dating'));
const DevPlan        = lazy(() => import('./pages/DevPlan'));
const LandingPage    = lazy(() => import('./pages/LandingPage'));
const MarketplaceDisputes = lazy(() => import('./pages/MarketplaceDisputes'));
const MessagingHub   = lazy(() => import('./pages/MessagingHub'));
const MiniProgramsStore = lazy(() => import('./pages/MiniProgramsStore'));
const MoneyManagement = lazy(() => import('./pages/MoneyManagement'));
const NotificationsCenter = lazy(() => import('./pages/NotificationsCenter'));
const PolishedMarketplace = lazy(() => import('./pages/Polished_Marketplace'));
const PrivateGroupDAO = lazy(() => import('./pages/PrivateGroupDAO'));
const QRPay          = lazy(() => import('./pages/QRPay'));
const ReputationSystem = lazy(() => import('./pages/ReputationSystem'));
const SearchDiscovery = lazy(() => import('./pages/SearchDiscovery'));
const UnifiedFeed    = lazy(() => import('./pages/UnifiedFeed'));
const UserProfileHub = lazy(() => import('./pages/UserProfileHub'));
const AdminDashboardLive = lazy(() => import('./pages/AdminDashboard_Live'));

// IT Resolutions
const ITHome         = lazy(() => import('./pages/ITHome'));
const ITServices     = lazy(() => import('./pages/ITServices'));
const ITProducts     = lazy(() => import('./pages/ITProducts'));
const ITTalent       = lazy(() => import('./pages/ITTalent'));
const ITBook         = lazy(() => import('./pages/ITBook'));
const ITContact      = lazy(() => import('./pages/ITContact'));
const ITAbout        = lazy(() => import('./pages/ITAbout'));

// Admin Panel
const AdminDashboard    = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsers        = lazy(() => import('./pages/admin/AdminUsers'));
const AdminCompliance   = lazy(() => import('./pages/admin/AdminCompliance'));
const AdminModeration   = lazy(() => import('./pages/admin/AdminModeration'));
const AdminAnalytics    = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminSettings     = lazy(() => import('./pages/admin/AdminSettings'));
const WorldLeaderDashboard = lazy(() => import('./pages/admin/WorldLeaderDashboard'));

// ─── Loading Fallback ─────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
        <p className="text-xs text-muted-foreground">Loading ShadowChat...</p>
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
          {/* Hub — Command Center */}
          <Route path="/dashboard"                  component={ShadowHub} />
          <Route path="/dashboard/hub"              component={ShadowHub} />

          {/* Core Trading & Finance */}
          <Route path="/dashboard/trading"          component={Trading} />
          <Route path="/dashboard/exchange"         component={ShadowExchange} />
          <Route path="/dashboard/futures"          component={FuturesTrading} />
          <Route path="/dashboard/copy-trading"     component={CopyTrading} />
          <Route path="/dashboard/swap"             component={TokenSwap} />
          <Route path="/dashboard/p2p"              component={P2PExchange} />
          <Route path="/dashboard/defi"             component={DeFiDashboard} />
          <Route path="/dashboard/bridge"           component={CrossChainBridge} />
          <Route path="/dashboard/bridge-token"     component={TokenBridge} />
          <Route path="/dashboard/price-alerts"     component={PriceAlerts} />
          <Route path="/dashboard/portfolio"        component={Portfolio} />
          <Route path="/dashboard/portfolio-tracker" component={PortfolioTracker} />
          <Route path="/dashboard/market"           component={MarketData} />
          <Route path="/dashboard/tax"              component={TaxCenter} />
          <Route path="/dashboard/ai-bot"           component={AITradingBot} />

          {/* Wallet & Vault */}
          <Route path="/dashboard/wallet"           component={WalletPage} />
          <Route path="/dashboard/vault"            component={ShadowVault} />
          <Route path="/dashboard/cold-vault"       component={ColdVault} />
          <Route path="/dashboard/quantum-vault"    component={QuantumVault} />
          <Route path="/dashboard/api-vault"        component={APIVault} />
          <Route path="/dashboard/staking"          component={Staking} />
          <Route path="/dashboard/mining"           component={MiningDashboard} />
          <Route path="/dashboard/pay"              component={ShadowPay} />

          {/* ICO & Launchpad */}
          <Route path="/dashboard/ico"              component={ICOHub} />
          <Route path="/dashboard/launchpad"        component={Launchpad} />

          {/* NFT */}
          <Route path="/dashboard/nft"              component={NFTMarketplace} />
          <Route path="/dashboard/nft-marketplace"  component={NFTMarketplace} />
          <Route path="/dashboard/nft-creator"      component={NFTCreator} />
          <Route path="/dashboard/nft-drops"        component={NFTDrops} />
          <Route path="/dashboard/nft-analytics"    component={NFTAnalytics} />

          {/* Metaverse & Gaming */}
          <Route path="/dashboard/metaverse"        component={MetaverseHub} />
          <Route path="/dashboard/virtual-land"     component={VirtualLand} />
          <Route path="/dashboard/avatar"           component={AvatarBuilder} />
          <Route path="/dashboard/game-center"     component={GameCenter} />
          <Route path="/dashboard/casino"          component={PolishedCasino} />

          {/* Social & Community */}
          <Route path="/dashboard/social"           component={ShadowSocial} />
          <Route path="/dashboard/social-feed"      component={SocialFeed} />
          <Route path="/dashboard/messages"         component={ShadowChatMessaging} />
          <Route path="/dashboard/messaging"        component={Messaging} />
          <Route path="/dashboard/stories"          component={Stories} />
          <Route path="/dashboard/boards"           component={CommunityBoards} />
          <Route path="/dashboard/spaces"           component={Spaces} />
          <Route path="/dashboard/leaderboard"      component={Leaderboard} />
          <Route path="/dashboard/notifications"    component={Notifications} />

          {/* Media & Content */}
          <Route path="/dashboard/tv"               component={ShadowTV} />
          <Route path="/dashboard/live"             component={LiveStream} />
          <Route path="/dashboard/live-polished"    component={PolishedLiveStream} />

          <Route path="/dashboard/video"            component={VideoFeed} />
          <Route path="/dashboard/watch-party"      component={WatchParty} />
          <Route path="/dashboard/podcast"          component={Podcast} />
          <Route path="/dashboard/music"            component={MusicPlayer} />
          <Route path="/dashboard/creator"          component={CreatorStudio} />
          <Route path="/dashboard/events"           component={Events} />

          {/* AI Tools */}
          <Route path="/dashboard/ai"               component={AIToolsHub} />
          <Route path="/dashboard/hope-ai"          component={HopeAICommandCenter} />
          <Route path="/dashboard/copilot"          component={AICopilot} />
          <Route path="/dashboard/ai-chat"          component={AIChat} />
          <Route path="/dashboard/hope-ai"          component={HopeAI} />
          <Route path="/dashboard/hope-ai-command"   component={HopeAICommandCenter} />
          <Route path="/dashboard/hope-ai-trading"   component={HopeAiTradingRoom} />
          <Route path="/dashboard/ai-voice"          component={AIVoiceCompanion} />
          <Route path="/dashboard/ai-agent"          component={AIAgent} />
          <Route path="/dashboard/ai-image"         component={AIImageGen} />
          <Route path="/dashboard/ai-wealth"        component={AIWealth} />

          {/* Marketplace & Commerce */}
          <Route path="/dashboard/marketplace"      component={Marketplace} />
          <Route path="/dashboard/shadow-market"    component={ShadowMarket} />
          <Route path="/dashboard/checkout"         component={Checkout} />
          <Route path="/dashboard/skyblue-store"    component={SkyBlueStore} />

          {/* News & Learning */}
          <Route path="/dashboard/news"             component={ShadowNews} />
          <Route path="/dashboard/learn"            component={ShadowLearn} />

          {/* Identity & Security */}
          <Route path="/dashboard/identity"         component={ShadowID} />
          <Route path="/dashboard/achievements"     component={Achievements} />

          {/* DAO & Governance */}
          <Route path="/dashboard/dao"              component={DAOGovernance} />
          <Route path="/dashboard/dao-treasury"     component={DAOTreasury} />

          {/* Charity */}
          <Route path="/dashboard/charity"          component={CharityHub} />
          <Route path="/dashboard/charity-leaderboard" component={CharityLeaderboard} />

          {/* Mini Programs */}
          <Route path="/dashboard/mini-programs"    component={MiniPrograms} />
          <Route path="/dashboard/mini-programs-store" component={MiniProgramsStore} />

          {/* Analytics & Profile */}
          <Route path="/dashboard/analytics"        component={Analytics} />
          <Route path="/dashboard/profile"          component={Profile} />
          <Route path="/dashboard/user-profile"     component={UserProfileHub} />
          <Route path="/dashboard/dating"           component={PolishedDating} />
          <Route path="/dashboard/dating-classic"   component={Dating} />

          <Route path="/dashboard/settings"         component={Settings} />
          <Route path="/dashboard/onboarding"       component={Onboarding} />

          {/* Additional Features */}
          <Route path="/dashboard/coin-economy"     component={CoinEconomy} />
          <Route path="/dashboard/money"            component={MoneyManagement} />
          <Route path="/dashboard/qr-pay"           component={QRPay} />
          <Route path="/dashboard/search"           component={SearchDiscovery} />
          <Route path="/dashboard/feed"             component={UnifiedFeed} />
          <Route path="/dashboard/messaging-hub"    component={MessagingHub} />
          <Route path="/dashboard/notifications-center" component={NotificationsCenter} />
          <Route path="/dashboard/reputation"       component={ReputationSystem} />
          <Route path="/dashboard/private-dao"      component={PrivateGroupDAO} />
          <Route path="/dashboard/marketplace-polished" component={PolishedMarketplace} />
          <Route path="/dashboard/marketplace-disputes" component={MarketplaceDisputes} />
          <Route path="/dashboard/creator-dashboard" component={CreatorDashboard} />
          <Route path="/dashboard/dev-plan"         component={DevPlan} />
          <Route path="/dashboard/showcase"         component={ComponentShowcase} />
          <Route path="/dashboard/admin-live"       component={AdminDashboardLive} />
          <Route path="/dashboard/landing"          component={LandingPage} />

          {/* Referrals & Partners */}
          <Route path="/dashboard/referrals"        component={Referrals} />
          <Route path="/dashboard/referral-center"  component={ReferralCenter} />
          <Route path="/dashboard/partner"          component={PartnerPortal} />
          <Route path="/dashboard/press"            component={PressKit} />

          {/* Service Center */}
          <Route path="/dashboard/service-center"   component={ServiceCenter} />
          <Route path="/dashboard/global-compliance" component={GlobalCompliance} />

          {/* IT Resolutions (Dashboard section) */}
          <Route path="/dashboard/it-dashboard"     component={SkyBlueITDashboard} />
          <Route path="/dashboard/it-client"        component={ITClientPortal} />
          <Route path="/dashboard/it-monitoring"    component={ITMonitoring} />
          <Route path="/dashboard/it-invoices"      component={ITInvoices} />

          {/* Government Portal */}
          <Route path="/dashboard/gov"              component={ShadowGov} />

          {/* Admin Panel */}
          <Route path="/dashboard/admin"                component={AdminDashboard} />
          <Route path="/dashboard/admin/users"          component={AdminUsers} />
          <Route path="/dashboard/admin/compliance"     component={AdminCompliance} />
          <Route path="/dashboard/admin/moderation"     component={AdminModeration} />
          <Route path="/dashboard/admin/analytics"      component={AdminAnalytics} />
          <Route path="/dashboard/admin/settings"       component={AdminSettings} />
          <Route path="/dashboard/admin/world-leader"   component={WorldLeaderDashboard} />

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
          <Route path="/"              component={Home} />
          <Route path="/it/:rest*"     component={ITRoutes} />
          <Route path="/it"            component={ITRoutes} />
          <Route path="/dashboard/:rest*" component={DashboardRoutes} />
          <Route path="/dashboard"        component={DashboardRoutes} />
          <Route path="/404"           component={NotFound} />
          <Route                       component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}
