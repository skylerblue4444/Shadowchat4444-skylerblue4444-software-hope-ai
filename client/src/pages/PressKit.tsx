import { useState } from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  Download,
  Image,
  FileText,
  Link,
  Mail,
  Twitter,
  Globe,
  Users,
  TrendingUp,
  DollarSign,
  Star,
  Copy,
  CheckCircle,
  ExternalLink,
  Zap,
  Shield,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const STATS = [
  { label: "Registered Users", value: "2.4M+", icon: Users },
  { label: "Daily Active Users", value: "480K", icon: TrendingUp },
  { label: "Total Trading Volume", value: "$1.2B", icon: DollarSign },
  { label: "Countries Supported", value: "180+", icon: Globe },
  { label: "NFTs Minted", value: "840K+", icon: Star },
  { label: "SKY4444 Market Cap", value: "$48M", icon: Zap },
];

const BRAND_ASSETS = [
  {
    name: "ShadowChat Logo (Dark)",
    format: "PNG, SVG",
    size: "2.1 MB",
    type: "logo",
  },
  {
    name: "ShadowChat Logo (Light)",
    format: "PNG, SVG",
    size: "1.8 MB",
    type: "logo",
  },
  {
    name: "SKY4444 Token Logo",
    format: "PNG, SVG",
    size: "840 KB",
    type: "token",
  },
  {
    name: "Brand Color Palette",
    format: "PDF, ASE",
    size: "120 KB",
    type: "brand",
  },
  { name: "Typography Guide", format: "PDF", size: "2.4 MB", type: "brand" },
  {
    name: "Product Screenshots",
    format: "ZIP (PNG)",
    size: "48 MB",
    type: "screenshots",
  },
  {
    name: "Founder Photos",
    format: "ZIP (JPG)",
    size: "12 MB",
    type: "photos",
  },
  { name: "Company Fact Sheet", format: "PDF", size: "840 KB", type: "docs" },
];

const MEDIA_COVERAGE = [
  {
    outlet: "CoinDesk",
    headline: "ShadowChat's SKY4444 ICO Raises $12M in First Week",
    date: "May 10, 2025",
    url: "#",
  },
  {
    outlet: "TechCrunch",
    headline: "ShadowChat: The Super-App Combining WeChat, Binance, and Reddit",
    date: "May 5, 2025",
    url: "#",
  },
  {
    outlet: "Forbes",
    headline: "Skyler Blue's Vision for Decentralized Social Finance",
    date: "Apr 28, 2025",
    url: "#",
  },
  {
    outlet: "Bloomberg",
    headline: "TRUMP Token Integration Drives ShadowChat to 2M Users",
    date: "Apr 20, 2025",
    url: "#",
  },
];

const EXECUTIVES = [
  {
    name: "Skyler Blue Spiller",
    title: "Founder & CEO",
    bio: "Serial entrepreneur and IT innovator with 15+ years in managed IT services and blockchain technology. Founded Skyler Blue IT Resolutions in Arkansas.",
    email: "skylerblue4444@gmail.com",
    phone: "479-406-7123",
  },
  {
    name: "ShadowChat CTO",
    title: "Chief Technology Officer",
    bio: "Former lead engineer at major Web3 protocols. Expert in DeFi, NFT infrastructure, and cross-chain architecture.",
    email: "cto@shadowchat.io",
    phone: null,
  },
];

export default function PressKit() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(label);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
          <Newspaper className="h-4 w-4" />
          Press & Media Kit
        </div>
        <h1 className="text-4xl font-black mb-3">ShadowChat Media Resources</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Everything journalists, analysts, and partners need to cover
          ShadowChat and Skyler Blue IT Resolutions.
        </p>
        <div className="flex gap-3 justify-center mt-4">
          <Button
            className="bg-blue-600 text-white border-0"
            onClick={() => toast.success("Downloading full press kit ZIP")}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Full Kit
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("Opening media contact form")}
          >
            <Mail className="h-4 w-4 mr-2" />
            Media Inquiries
          </Button>
        </div>
      </div>

      {/* Platform Stats */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">
            Platform Statistics (May 2025)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="text-center p-3 rounded-xl bg-muted/20 border border-border/30"
              >
                <Icon className="h-5 w-5 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-black">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">About ShadowChat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            ShadowChat is a next-generation Web3 super-platform combining social
            media, decentralized finance, NFT marketplace, AI tools, and managed
            IT services into a single unified ecosystem. Founded by Skyler Blue
            Spiller through{" "}
            <strong className="text-foreground">
              Skyler Blue Spiller's Innovative Information Technology
              Resolutions
            </strong>
            , headquartered in Fayetteville, Arkansas.
          </p>
          <p>
            The platform's native token,{" "}
            <strong className="text-foreground">SKY4444</strong>, powers all
            platform transactions, rewards creators and traders, and grants
            governance rights over the ShadowChat DAO. The platform also
            integrates TRUMP token, enabling a unique intersection of political
            and financial communities.
          </p>
          <p>
            ShadowChat serves users in 180+ countries with full compliance
            infrastructure for regional regulations including China's MIIT/CAC
            requirements, EU GDPR, and US FinCEN standards.
          </p>
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={() =>
                copyText(
                  "ShadowChat is a Web3 super-platform combining social, DeFi, NFT, and AI tools.",
                  "Boilerplate"
                )
              }
            >
              {copied === "Boilerplate" ? (
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
              ) : (
                <Copy className="h-3.5 w-3.5 mr-1" />
              )}
              Copy Boilerplate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Brand Assets */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">Brand Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {BRAND_ASSETS.map((asset, i) => (
              <div
                key={asset.name}
                className="flex items-center gap-3 p-3 rounded-xl border border-border/30 hover:border-border/60 transition-colors"
              >
                <div className="h-9 w-9 rounded-lg bg-muted/30 flex items-center justify-center shrink-0">
                  {asset.type === "logo" || asset.type === "token" ? (
                    <Image className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{asset.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {asset.format} · {asset.size}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs shrink-0"
                  onClick={() => toast.success(`Downloading ${asset.name}`)}
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Media Coverage */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">
            Recent Media Coverage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {MEDIA_COVERAGE.map((article, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-2 border-b border-border/20 last:border-0"
            >
              <Badge variant="outline" className="text-xs shrink-0 mt-0.5">
                {article.outlet}
              </Badge>
              <div className="flex-1">
                <p className="text-sm font-medium">{article.headline}</p>
                <p className="text-xs text-muted-foreground">{article.date}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 shrink-0"
                onClick={() => toast.info("Opening article")}
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Leadership */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">Leadership Team</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {EXECUTIVES.map((exec, i) => (
            <div
              key={exec.name}
              className="flex gap-4 p-4 rounded-xl bg-muted/10 border border-border/30"
            >
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-black text-xl shrink-0">
                {exec.name[0]}
              </div>
              <div className="flex-1">
                <p className="font-black">{exec.name}</p>
                <p className="text-sm text-blue-400">{exec.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{exec.bio}</p>
                <div className="flex gap-3 mt-2">
                  <button
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                    onClick={() => copyText(exec.email, "Email")}
                  >
                    <Mail className="h-3 w-3" />
                    {exec.email}
                  </button>
                  {exec.phone && (
                    <button
                      className="text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => copyText(exec.phone!, "Phone")}
                    >
                      {exec.phone}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="border-blue-500/20 bg-blue-500/3">
        <CardContent className="py-5 text-center">
          <Mail className="h-8 w-8 text-blue-400 mx-auto mb-2" />
          <p className="font-black text-lg">Media Contact</p>
          <p className="text-muted-foreground text-sm mb-3">
            For press inquiries, interview requests, and partnership
            opportunities
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              className="text-blue-400 font-medium hover:text-blue-300"
              onClick={() => copyText("skylerblue4444@gmail.com", "Email")}
            >
              skylerblue4444@gmail.com
            </button>
            <span className="text-muted-foreground">·</span>
            <button
              className="text-blue-400 font-medium hover:text-blue-300"
              onClick={() => copyText("479-406-7123", "Phone")}
            >
              479-406-7123
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
