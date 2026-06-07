import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import { motion } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";

// Pages
import Home from "./pages/Home";
import Trading from "./pages/Trading";
import HopeAI from "./pages/HopeAI";
import SocialFeed from "./pages/SocialFeed";
import Wallet from "./pages/Wallet";
import CharityHub from "./pages/CharityHub";
import DAOGovernance from "./pages/DAOGovernance";
import ITServices from "./pages/ITServices";
import AIToolsHub from "./pages/AIToolsHub";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import MissionControl from "./pages/MissionControl";
import Streamverse from "./pages/Streamverse";
import Marketplace from "./pages/Marketplace";
import Academy from "./pages/Academy";
import Nations from "./pages/Nations";
import CreatorEmpire from "./pages/CreatorEmpire";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/mission-control" component={MissionControl} />
      <Route path="/trading" component={Trading} />
      <Route path="/hope-ai" component={HopeAI} />
      <Route path="/feed" component={SocialFeed} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/charity" component={CharityHub} />
      <Route path="/dao" component={DAOGovernance} />
      <Route path="/it-services" component={ITServices} />
      <Route path="/ai-tools" component={AIToolsHub} />
      <Route path="/streamverse" component={Streamverse} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/academy" component={Academy} />
      <Route path="/nations" component={Nations} />
      <Route path="/creator-empire" component={CreatorEmpire} />
      <Route path="/profile" component={Profile} />
      <Route path="/settings" component={Settings} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
