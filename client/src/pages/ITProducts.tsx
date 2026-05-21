import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Monitor,
  Server,
  Shield,
  Wifi,
  Cloud,
  Cpu,
  HardDrive,
  Printer,
  Phone,
  Camera,
  Package,
  CheckCircle,
  ArrowRight,
  Star,
  Filter,
  Search,
  ShoppingCart,
  Zap,
  Lock,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const CATEGORIES = [
  "All",
  "Hardware",
  "Software",
  "Security",
  "Networking",
  "Cloud",
  "Bundles",
];

const PRODUCTS = [
  {
    id: 1,
    category: "Security",
    icon: Shield,
    name: "SkyGuard Endpoint Protection",
    description:
      "Enterprise-grade EDR with AI-powered threat detection, real-time monitoring, and automated response. Covers unlimited endpoints.",
    price: "$8",
    unit: "/endpoint/mo",
    badge: "Best Seller",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    features: [
      "AI threat detection",
      "Ransomware protection",
      "24/7 SOC monitoring",
      "Compliance reporting",
    ],
    rating: 4.9,
    reviews: 142,
  },
  {
    id: 2,
    category: "Cloud",
    icon: Cloud,
    name: "SkyCloud Backup Suite",
    description:
      "Automated cloud backup with 30-day retention, instant restore, and end-to-end encryption. Never lose critical data again.",
    price: "$15",
    unit: "/user/mo",
    badge: "New",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
    features: [
      "Unlimited storage",
      "15-min RPO",
      "AES-256 encryption",
      "One-click restore",
    ],
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    category: "Software",
    icon: Monitor,
    name: "SkyRMM Pro",
    description:
      "Remote monitoring and management platform for IT teams. Monitor, patch, and manage all endpoints from a single dashboard.",
    price: "$3",
    unit: "/device/mo",
    badge: null,
    badgeColor: "",
    features: [
      "Real-time monitoring",
      "Automated patching",
      "Remote access",
      "Custom alerts",
    ],
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 4,
    category: "Networking",
    icon: Wifi,
    name: "SkyNet Managed WiFi",
    description:
      "Enterprise wireless networking solution with centralized management, guest portal, and advanced security features.",
    price: "$49",
    unit: "/AP/mo",
    badge: null,
    badgeColor: "",
    features: [
      "Centralized management",
      "Guest portal",
      "WPA3 security",
      "Traffic analytics",
    ],
    rating: 4.6,
    reviews: 45,
  },
  {
    id: 5,
    category: "Security",
    icon: Lock,
    name: "SkyVPN Business",
    description:
      "Zero-trust VPN solution for remote workforces. Secure access to company resources from anywhere, on any device.",
    price: "$6",
    unit: "/user/mo",
    badge: null,
    badgeColor: "",
    features: [
      "Zero-trust architecture",
      "Split tunneling",
      "MFA integration",
      "Activity logging",
    ],
    rating: 4.8,
    reviews: 112,
  },
  {
    id: 6,
    category: "Bundles",
    icon: Package,
    name: "SMB Complete Bundle",
    description:
      "Everything a small business needs: endpoint protection, backup, RMM, and email security in one affordable package.",
    price: "$25",
    unit: "/user/mo",
    badge: "Best Value",
    badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    features: [
      "Endpoint protection",
      "Cloud backup",
      "RMM platform",
      "Email security",
      "Priority support",
    ],
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 7,
    category: "Hardware",
    icon: Server,
    name: "SkyServer Rack Solutions",
    description:
      "Configured rack servers, UPS systems, and networking hardware — procured, configured, and delivered to your facility.",
    price: "Custom",
    unit: "",
    badge: null,
    badgeColor: "",
    features: [
      "Custom configuration",
      "On-site installation",
      "Warranty management",
      "Lifecycle support",
    ],
    rating: 4.7,
    reviews: 34,
  },
  {
    id: 8,
    category: "Software",
    icon: Database,
    name: "SkyDMS Document Manager",
    description:
      "Secure document management system with version control, e-signatures, workflow automation, and compliance archiving.",
    price: "$12",
    unit: "/user/mo",
    badge: null,
    badgeColor: "",
    features: [
      "Version control",
      "E-signatures",
      "Workflow automation",
      "Audit trails",
    ],
    rating: 4.5,
    reviews: 58,
  },
];

const SOFTWARE_LICENSES = [
  {
    name: "Microsoft 365 Business Basic",
    price: "$6/user/mo",
    desc: "Teams, SharePoint, Exchange Online",
  },
  {
    name: "Microsoft 365 Business Standard",
    price: "$12.50/user/mo",
    desc: "All apps + desktop Office suite",
  },
  {
    name: "Microsoft 365 Business Premium",
    price: "$22/user/mo",
    desc: "Premium + Intune + Azure AD P1",
  },
  {
    name: "Google Workspace Business Starter",
    price: "$6/user/mo",
    desc: "Gmail, Drive, Meet, 30GB storage",
  },
  {
    name: "Google Workspace Business Plus",
    price: "$18/user/mo",
    desc: "Enhanced security + 5TB storage",
  },
  {
    name: "Adobe Creative Cloud for Teams",
    price: "$54.99/user/mo",
    desc: "All Creative Cloud apps + 1TB",
  },
];

export default function ITProducts() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/40 bg-muted/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <button
              onClick={() => setLocation("/it")}
              className="hover:text-foreground transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-foreground">Products</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">IT Products & Software</h1>
          <p className="text-muted-foreground max-w-2xl">
            Curated hardware, software, and security products — sourced,
            configured, and supported by our team. All products include setup
            assistance and ongoing support.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className="text-xs"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full border-border/50 hover:border-blue-500/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/5">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <product.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      {product.badge && (
                        <Badge className={`text-xs ${product.badgeColor}`}>
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base leading-tight">
                      {product.name}
                    </CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">
                        {product.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {product.features.map(f => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <CheckCircle className="h-3 w-3 text-green-400 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-xl font-bold">{product.price}</span>
                      <span className="text-xs text-muted-foreground">
                        {product.unit}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => setLocation("/it/book")}
                    >
                      <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                      {product.price === "Custom" ? "Get Quote" : "Order Now"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Software Licensing */}
      <section className="py-16 bg-muted/20 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Software Licensing</h2>
            <p className="text-muted-foreground text-sm">
              We are authorized resellers for major software vendors. Get better
              pricing and dedicated support through us.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOFTWARE_LICENSES.map(lic => (
              <Card
                key={lic.name}
                className="border-border/50 hover:border-blue-500/30 transition-colors"
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{lic.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {lic.desc}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-blue-400 shrink-0 ml-2">
                      {lic.price}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-3 text-xs"
                    onClick={() => setLocation("/it/contact")}
                  >
                    Request Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 border-t border-border/40">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Zap className="h-10 w-10 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Need a Custom Solution?</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Don't see exactly what you need? We build custom IT solutions and
            bundles tailored to your specific requirements and budget.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => setLocation("/it/contact")}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0"
            >
              Contact Our Team <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => setLocation("/it/book")}>
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
