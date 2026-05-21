import { useAuth } from "@/_core/hooks/useAuth";
import HopeAIGlobalVoiceDock from "@/components/HopeAIGlobalVoiceDock";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { getLoginUrl } from "@/const";
import { useIsMobile } from "@/hooks/useMobile";
import {
  LayoutDashboard, TrendingUp, MessageSquare, Activity, Trophy,
  Gift, Key, Vault, Settings, Vote, Cpu, Brain, GitMerge,
  Award, Bell, PieChart, BarChart2, Heart, AppWindow,
  ShoppingCart, CreditCard, Tv, Hash, Users, Building2,
  Briefcase, Phone, BookOpen, Package, LogOut, PanelLeft,
  Zap, Shield, Cloud, Code, Star, Globe, Wallet, Coins,
  ChevronDown, ChevronRight, ExternalLink
} from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { DashboardLayoutSkeleton } from './DashboardLayoutSkeleton';
import HopeAIGlobalVoiceDock from './HopeAIGlobalVoiceDock';
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

type NavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: string;
  badgeColor?: string;
  external?: boolean;
};

type NavGroup = {
  label: string;
  items: NavItem[];
  collapsible?: boolean;
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Platform",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: Brain, label: "Hope AI", path: "/dashboard/hope-ai", badge: "HANDS-FREE", badgeColor: "bg-cyan-600" },
      { icon: Bell, label: "Notifications", path: "/dashboard/notifications", badge: "3", badgeColor: "bg-red-500" },
      { icon: Activity, label: "Analytics", path: "/dashboard/analytics" },
      { icon: Brain, label: "Hope AI Voice", path: "/dashboard/hope-ai", badge: "VOICE", badgeColor: "bg-cyan-600" },
    ],
  },
  {
    label: "Trading & Finance",
    items: [
      { icon: TrendingUp, label: "Live Trading", path: "/dashboard/trading", badge: "LIVE", badgeColor: "bg-green-600" },
      { icon: PieChart, label: "Portfolio", path: "/dashboard/portfolio" },
      { icon: BarChart2, label: "Market Data", path: "/dashboard/market" },
      { icon: GitMerge, label: "Cross-Chain Bridge", path: "/dashboard/bridge" },
      { icon: Coins, label: "Mining Lab", path: "/dashboard/mining", badge: "BETA", badgeColor: "bg-yellow-600" },
      { icon: Vault, label: "Cold Vault", path: "/dashboard/vault" },
      { icon: Cpu, label: "Quantum Vault", path: "/dashboard/quantum-vault" },
      { icon: Brain, label: "AI Wealth Manager", path: "/dashboard/ai-wealth" },
    ],
  },
  {
    label: "Social & Community",
    items: [
      { icon: Activity, label: "Social Feed", path: "/dashboard/social" },
      { icon: MessageSquare, label: "Messages", path: "/dashboard/messages" },
      { icon: Hash, label: "Community Boards", path: "/dashboard/boards" },
      { icon: Tv, label: "Live Streams", path: "/dashboard/live-polished", badge: "LIVE", badgeColor: "bg-red-600" },
      { icon: Heart, label: "Dating Lounge", path: "/dashboard/dating", badge: "NEW", badgeColor: "bg-pink-600" },
      { icon: Trophy, label: "Leaderboard", path: "/dashboard/leaderboard" },
      { icon: Award, label: "Achievements", path: "/dashboard/achievements" },
      { icon: Gift, label: "Referrals", path: "/dashboard/referrals" },
    ],
  },
  {
    label: "Marketplace",
    items: [
      { icon: ShoppingCart, label: "SkyMarket", path: "/dashboard/marketplace", badge: "NEW", badgeColor: "bg-orange-500" },
      { icon: CreditCard, label: "Checkout", path: "/dashboard/checkout" },
      { icon: AppWindow, label: "NFT Marketplace", path: "/dashboard/nft" },
      { icon: AppWindow, label: "Mini Programs", path: "/dashboard/mini-programs" },
      { icon: Star, label: "Casino Playground", path: "/dashboard/casino", badge: "DEMO", badgeColor: "bg-purple-600" },
    ],
  },
  {
    label: "Web3 & DAO",
    items: [
      { icon: Vote, label: "DAO Governance", path: "/dashboard/dao" },
      { icon: Heart, label: "Charity Hub", path: "/dashboard/charity" },
      { icon: Key, label: "API Vault", path: "/dashboard/api-vault" },
      { icon: Zap, label: "AI Copilot", path: "/dashboard/copilot" },
    ],
  },
  {
    label: "IT Resolutions",
    collapsible: true,
    items: [
      { icon: Building2, label: "IT Home", path: "/it" },
      { icon: Shield, label: "IT Services", path: "/it/services" },
      { icon: Package, label: "IT Products", path: "/it/products" },
      { icon: Users, label: "IT Talent Market", path: "/it/talent" },
      { icon: BookOpen, label: "Book Consultation", path: "/it/book" },
      { icon: Phone, label: "Contact Us", path: "/it/contact" },
      { icon: Star, label: "About Us", path: "/it/about" },
    ],
  },
  {
    label: "ICO & Finance",
    collapsible: true,
    items: [
      { icon: Zap, label: "SKY4444 ICO Hub", path: "/dashboard/ico", badge: "LIVE", badgeColor: "bg-cyan-600" },
      { icon: Coins, label: "Staking Center", path: "/dashboard/staking", badge: "APY", badgeColor: "bg-green-600" },
      { icon: Cpu, label: "Mining Lab", path: "/dashboard/mining", badge: "BETA", badgeColor: "bg-yellow-600" },
      { icon: Wallet, label: "Wallet", path: "/dashboard/wallet" },
    ],
  },
  {
    label: "Admin Panel",
    collapsible: true,
    items: [
      { icon: Shield, label: "Admin Dashboard", path: "/dashboard/admin", badge: "ADMIN", badgeColor: "bg-red-600" },
      { icon: Users, label: "User Management", path: "/dashboard/admin/users" },
      { icon: Globe, label: "Compliance", path: "/dashboard/admin/compliance" },
      { icon: Activity, label: "Moderation", path: "/dashboard/admin/moderation" },
      { icon: BarChart2, label: "Analytics", path: "/dashboard/admin/analytics" },
      { icon: Settings, label: "Admin Settings", path: "/dashboard/admin/settings" },
      { icon: Star, label: "World Leader", path: "/dashboard/admin/world-leader", badge: "NEW", badgeColor: "bg-yellow-600" },
    ],
  },
  {
    label: "Account",
    items: [
      { icon: Users, label: "My Profile", path: "/dashboard/profile" },
      { icon: MessageSquare, label: "Service Center", path: "/dashboard/service-center" },
      { icon: Settings, label: "Settings", path: "/dashboard/settings" },
    ],
  },
];

const SIDEBAR_WIDTH_KEY = "sidebar-width";
const DEFAULT_WIDTH = 260;
const MIN_WIDTH = 200;
const MAX_WIDTH = 380;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user } = useAuth();

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  if (loading) return <DashboardLayoutSkeleton />;

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-6 p-8 max-w-md w-full">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">SkyPlatform</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to access trading, social features, marketplace, IT services, and more.
            </p>
          </div>
          <Button onClick={() => { window.location.href = getLoginUrl(); }} size="lg" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">
            Sign In to Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}>
      <DashboardLayoutContent setSidebarWidth={setSidebarWidth}>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}

function DashboardLayoutContent({ children, setSidebarWidth }: { children: React.ReactNode; setSidebarWidth: (w: number) => void }) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const toggleGroup = (label: string) => {
    setCollapsedGroups(prev => prev.includes(label) ? prev.filter(g => g !== label) : [...prev, label]);
  };

  useEffect(() => {
    if (isCollapsed) setIsResizing(false);
  }, [isCollapsed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const newWidth = e.clientX - sidebarLeft;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) setSidebarWidth(newWidth);
    };
    const handleMouseUp = () => setIsResizing(false);
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  const activeLabel = NAV_GROUPS.flatMap(g => g.items).find(i => i.path === location)?.label ?? "Dashboard";

  return (
    <>
      <div className="relative" ref={sidebarRef}>
        <Sidebar collapsible="icon" className="border-r border-border/40" disableTransition={isResizing}>
          <SidebarHeader className="h-14 justify-center border-b border-border/40">
            <div className="flex items-center gap-2.5 px-2">
              <button onClick={toggleSidebar} className="h-8 w-8 flex items-center justify-center hover:bg-accent rounded-lg transition-colors shrink-0">
                <PanelLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              {!isCollapsed && (
                <div className="flex items-center gap-2 min-w-0">
                  <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0">
                    <Zap className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="font-bold text-sm tracking-tight truncate">SkyPlatform</span>
                </div>
              )}
            </div>
          </SidebarHeader>

          <SidebarContent className="gap-0 overflow-y-auto">
            {NAV_GROUPS.map((group) => {
              const isGroupCollapsed = collapsedGroups.includes(group.label);
              return (
                <SidebarGroup key={group.label} className="py-1">
                  {!isCollapsed && (
                    <div
                      className={`flex items-center justify-between px-3 py-1.5 ${group.collapsible ? "cursor-pointer hover:text-foreground" : ""}`}
                      onClick={group.collapsible ? () => toggleGroup(group.label) : undefined}
                    >
                      <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 p-0">
                        {group.label}
                      </SidebarGroupLabel>
                      {group.collapsible && (
                        <ChevronRight className={`h-3 w-3 text-muted-foreground transition-transform ${!isGroupCollapsed ? "rotate-90" : ""}`} />
                      )}
                    </div>
                  )}
                  {(!group.collapsible || !isGroupCollapsed) && (
                    <SidebarMenu className="px-2">
                      {group.items.map((item) => {
                        const isActive = location === item.path || (item.path !== "/dashboard" && location.startsWith(item.path));
                        return (
                          <SidebarMenuItem key={item.path}>
                            <SidebarMenuButton
                              isActive={isActive}
                              onClick={() => setLocation(item.path)}
                              tooltip={item.label}
                              className="h-9 transition-all font-normal group"
                            >
                              <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                              <span className="truncate">{item.label}</span>
                              {item.badge && !isCollapsed && (
                                <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full text-white font-bold ${item.badgeColor ?? "bg-blue-500"}`}>
                                  {item.badge}
                                </span>
                              )}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  )}
                </SidebarGroup>
              );
            })}
          </SidebarContent>

          <SidebarFooter className="p-3 border-t border-border/40">
            {!isCollapsed && (
              <div className="mb-2 p-2 rounded-lg bg-gradient-to-r from-blue-950/50 to-cyan-950/30 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Coins className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-xs font-semibold text-cyan-400">SKY4444 ICO Live</span>
                  <Badge className="ml-auto bg-green-500/10 text-green-400 border-green-500/20 text-xs px-1.5 py-0">Phase 2</Badge>
                </div>
                <p className="text-xs text-muted-foreground">15% bonus for early investors</p>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-accent/50 transition-colors w-full text-left focus:outline-none">
                  <Avatar className="h-8 w-8 border shrink-0">
                    <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                      {user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate leading-none">{user?.name ?? "User"}</p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{user?.email ?? ""}</p>
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => setLocation("/dashboard/settings")}>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation("/dashboard/portfolio")}>
                  <PieChart className="mr-2 h-4 w-4" /> Portfolio
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/20 transition-colors ${isCollapsed ? "hidden" : ""}`}
          onMouseDown={() => { if (!isCollapsed) setIsResizing(true); }}
          style={{ zIndex: 50 }}
        />
      </div>

      <SidebarInset>
        {isMobile && (
          <div className="flex border-b border-border/40 h-14 items-center justify-between bg-background/95 px-3 backdrop-blur sticky top-0 z-40">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-9 w-9 rounded-lg" />
              <span className="font-semibold text-sm">{activeLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setLocation("/dashboard/notifications")} className="relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
              </button>
              <Avatar className="h-8 w-8 border">
                <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                  {user?.name?.charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        )}
        <main className="flex-1 p-4 min-h-screen">{children}</main>
        <HopeAIGlobalVoiceDock />
      </SidebarInset>
      <HopeAIGlobalVoiceDock />
    </>
  );
}
