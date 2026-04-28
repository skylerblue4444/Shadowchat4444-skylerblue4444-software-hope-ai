import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import DashboardLayout from "./components/DashboardLayout";
import Trading from "./pages/Trading";
import AICopilot from "./pages/AICopilot";
import SocialFeed from "./pages/SocialFeed";
import Messaging from "./pages/Messaging";
import Analytics from "./pages/Analytics";
import Leaderboard from "./pages/Leaderboard";
import Onboarding from "./pages/Onboarding";
import Referrals from "./pages/Referrals";
import APIVault from "./pages/APIVault";
import ColdVault from "./pages/ColdVault";
import Settings from "./pages/Settings";
import DAOGovernance from "./pages/DAOGovernance";
import QuantumVault from "./pages/QuantumVault";
import AIWealth from "./pages/AIWealth";
import CrossChainBridge from "./pages/CrossChainBridge";
import Achievements from "./pages/Achievements";
import Notifications from "./pages/Notifications";
import Portfolio from "./pages/Portfolio";
import MarketData from "./pages/MarketData";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dashboard/*"} component={() => (
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
            <Route component={NotFound} />
          </Switch>
        </DashboardLayout>
      )} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
