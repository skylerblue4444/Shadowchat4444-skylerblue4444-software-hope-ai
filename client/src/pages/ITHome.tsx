import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Shield, Cpu, Users, Briefcase, Phone, Mail, MapPin,
  ChevronRight, Star, CheckCircle, Zap, Globe, Lock,
  HeadphonesIcon, Server, Cloud, Wifi, Monitor, Code,
  ArrowRight, Building2, Award, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SERVICES = [
  {
    icon: Shield,
    title: "Managed IT Services",
    description: "Complete end-to-end IT management — proactive monitoring, maintenance, and support for your entire infrastructure.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    href: "/it/services",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Seamless cloud migration, hosting, and management across AWS, Azure, and Google Cloud platforms.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    href: "/it/services",
  },
  {
    icon: Lock,
    title: "Cybersecurity",
    description: "Enterprise-grade security audits, threat monitoring, penetration testing, and compliance management.",
    color: "text-red-400",
    bg: "bg-red-500/10",
    href: "/it/services",
  },
  {
    icon: HeadphonesIcon,
    title: "IT Help Desk & Support",
    description: "24/7 remote and on-site technical support with guaranteed response times and expert technicians.",
    color: "text-green-400",
    bg: "bg-green-500/10",
    href: "/it/services",
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Bespoke web, mobile, and enterprise software solutions tailored to your business workflows.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    href: "/it/services",
  },
  {
    icon: Users,
    title: "IT Talent Marketplace",
    description: "Connect with vetted IT professionals, developers, and consultants for contract or full-time roles.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    href: "/it/talent",
  },
];

const STATS = [
  { label: "Clients Served", value: "500+", icon: Building2 },
  { label: "Years Experience", value: "12+", icon: Award },
  { label: "Uptime Guarantee", value: "99.9%", icon: TrendingUp },
  { label: "Support Response", value: "<1hr", icon: Zap },
];

const TESTIMONIALS = [
  {
    name: "Marcus Johnson",
    role: "CEO, TechVentures LLC",
    text: "Skyler Blue transformed our entire IT infrastructure. Response times are incredible and downtime is virtually zero.",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Operations Director, MidSouth Medical",
    text: "Their cybersecurity team caught vulnerabilities we didn't even know existed. Absolutely essential for our HIPAA compliance.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "CTO, Retail Chain Group",
    text: "The talent marketplace helped us hire 3 senior developers in under a week. Quality candidates, fast process.",
    rating: 5,
  },
];

export default function ITHome() {
  const [, setLocation] = useLocation();
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-sm leading-none">Skyler Blue Spiller's</span>
                <p className="text-xs text-muted-foreground leading-none mt-0.5">Innovative IT Resolutions</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <button onClick={() => setLocation("/it/services")} className="text-muted-foreground hover:text-foreground transition-colors">Services</button>
              <button onClick={() => setLocation("/it/products")} className="text-muted-foreground hover:text-foreground transition-colors">Products</button>
              <button onClick={() => setLocation("/it/talent")} className="text-muted-foreground hover:text-foreground transition-colors">Talent</button>
              <button onClick={() => setLocation("/it/about")} className="text-muted-foreground hover:text-foreground transition-colors">About</button>
              <button onClick={() => setLocation("/it/contact")} className="text-muted-foreground hover:text-foreground transition-colors">Contact</button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setLocation("/it/contact")}>
                <Phone className="h-3.5 w-3.5 mr-1.5" />
                479-406-7123
              </Button>
              <Button size="sm" onClick={() => setLocation("/it/book")}>
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-background to-cyan-950/20 pointer-events-none" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20">
              <Zap className="h-3 w-3 mr-1" />
              Arkansas's Premier IT Solutions Provider
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Innovative IT Solutions{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Tailored for Your Business
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              From managed IT services and cybersecurity to custom software development and IT talent placement —
              Skyler Blue Spiller's Innovative IT Resolutions delivers enterprise-grade technology solutions
              for businesses of all sizes across Arkansas and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => setLocation("/it/book")} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setLocation("/it/services")}>
                Explore Services
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                No long-term contracts required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                24/7 support included
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Free initial assessment
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-muted text-muted-foreground">Our Services</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Complete IT Solutions Under One Roof
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you need full managed IT support, a one-time project, or top-tier talent —
              we have the expertise and resources to deliver results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <Card
                  className={`h-full cursor-pointer transition-all duration-300 border-border/50 hover:border-blue-500/40 ${hoveredService === i ? "shadow-lg shadow-blue-500/10 -translate-y-1" : ""}`}
                  onClick={() => setLocation(service.href)}
                >
                  <CardHeader>
                    <div className={`h-12 w-12 rounded-xl ${service.bg} flex items-center justify-center mb-3`}>
                      <service.icon className={`h-6 w-6 ${service.color}`} />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <div className={`flex items-center gap-1 mt-4 text-sm font-medium ${service.color}`}>
                      Learn more <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Talent Marketplace CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-950/40 to-cyan-950/30 border-y border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                <Users className="h-3 w-3 mr-1" />
                IT Talent Marketplace
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Find Top IT Talent or Your Next Opportunity
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our curated marketplace connects businesses with vetted IT professionals —
                developers, sysadmins, cybersecurity experts, project managers, and more.
                Post jobs, browse candidates, and hire with confidence.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Button size="lg" onClick={() => setLocation("/it/talent")} className="bg-cyan-600 hover:bg-cyan-700 text-white border-0">
                <Briefcase className="mr-2 h-4 w-4" />
                Post a Job
              </Button>
              <Button size="lg" variant="outline" onClick={() => setLocation("/it/talent")}>
                <Users className="mr-2 h-4 w-4" />
                Find Talent
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Businesses Across Arkansas</h2>
            <p className="text-muted-foreground">Real results from real clients</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }}>
                <Card className="h-full border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="py-12 bg-muted/30 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Ready to Transform Your IT Infrastructure?</h3>
              <p className="text-muted-foreground text-sm">Contact us today for a free consultation and IT assessment.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="tel:4794067123" className="flex items-center gap-2 text-sm font-medium hover:text-blue-400 transition-colors">
                <Phone className="h-4 w-4 text-blue-400" />
                479-406-7123
              </a>
              <a href="mailto:skylerblue4444@gmail.com" className="flex items-center gap-2 text-sm font-medium hover:text-blue-400 transition-colors">
                <Mail className="h-4 w-4 text-blue-400" />
                skylerblue4444@gmail.com
              </a>
              <Button onClick={() => setLocation("/it/book")} size="sm">
                Book Now <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-blue-400" />
              <span>© 2026 Skyler Blue Spiller's Innovative IT Resolutions. All rights reserved.</span>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setLocation("/it/services")} className="hover:text-foreground transition-colors">Services</button>
              <button onClick={() => setLocation("/it/products")} className="hover:text-foreground transition-colors">Products</button>
              <button onClick={() => setLocation("/it/talent")} className="hover:text-foreground transition-colors">Talent</button>
              <button onClick={() => setLocation("/it/contact")} className="hover:text-foreground transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
