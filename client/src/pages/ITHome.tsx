import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Cloud,
  Wifi,
  Monitor,
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

const services = [
  {
    icon: Shield,
    title: "Managed Cybersecurity",
    desc: "24/7 threat monitoring, SIEM, and incident response",
    price: "From $497/mo",
    color: "text-red-400",
    route: "/it/services",
  },
  {
    icon: Cloud,
    title: "Cloud Management",
    desc: "AWS, Azure, Google Cloud migration and management",
    price: "From $297/mo",
    color: "text-blue-400",
    route: "/it/services",
  },
  {
    icon: Monitor,
    title: "Managed IT Support",
    desc: "Unlimited helpdesk, remote support, and on-site visits",
    price: "From $197/mo",
    color: "text-green-400",
    route: "/it/services",
  },
  {
    icon: Wifi,
    title: "Network Infrastructure",
    desc: "SD-WAN, WiFi 6, fiber, and network design",
    price: "From $397/mo",
    color: "text-violet-400",
    route: "/it/services",
  },
];

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    company: "Johnson Medical Group",
    text: "Skyler Blue transformed our IT. HIPAA compliant, zero downtime, and amazing support.",
    stars: 5,
  },
  {
    name: "Mike Williams",
    company: "Williams Manufacturing",
    text: "Best IT investment we ever made. Saved us $247K in the first year alone.",
    stars: 5,
  },
  {
    name: "Lisa Chen",
    company: "Chen Financial Services",
    text: "PCI-DSS compliance was a nightmare before Skyler Blue. Now it's seamless.",
    stars: 5,
  },
];

const stats = [
  { label: "Arkansas Clients", value: "247+", color: "text-cyan-400" },
  { label: "Uptime SLA", value: "99.99%", color: "text-green-400" },
  { label: "Response Time", value: "<15 min", color: "text-blue-400" },
  { label: "Years Experience", value: "10+", color: "text-violet-400" },
];

export default function ITHome() {
  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-cyan-900/60 to-blue-900/60 border border-cyan-500/30 p-5 text-center">
        <Badge className="bg-cyan-600 text-white mb-2">
          🌟 Arkansas's #1 IT Partner
        </Badge>
        <h1 className="text-2xl font-black text-white mb-1">
          Skyler Blue IT Resolutions
        </h1>
        <p className="text-sm text-cyan-200 mb-3">
          Innovative Information Technology Resolutions for Arkansas businesses
          — managed IT, cybersecurity, cloud, and more
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          <Button
            className="bg-cyan-600 text-white border-0 font-black"
            onClick={() =>
              toast.success("Calling Skyler Blue IT: 479-406-7123")
            }
          >
            <Phone className="h-4 w-4 mr-2" /> 479-406-7123
          </Button>
          <Link href="/it/book">
            <Button
              variant="outline"
              className="border-cyan-500/50 text-cyan-400"
            >
              <Clock className="h-4 w-4 mr-2" /> Book Free Consult
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {stats.map((s, i) => (
          <Card key={i} className="border-border/50 text-center">
            <CardContent className="py-3 px-1">
              <p className={`font-black text-base ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Services */}
      <div>
        <h2 className="font-black text-sm mb-3">🛠️ Our Services</h2>
        <div className="space-y-2">
          {services.map((s, i) => (
            <Link key={i} href={s.route}>
              <Card className="border-border/50 hover:border-cyan-500/50 transition-colors cursor-pointer">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <s.icon className={`h-8 w-8 ${s.color} shrink-0`} />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-green-400">
                      {s.price}
                    </p>
                    <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto mt-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <h2 className="font-black text-sm mb-3">⭐ Client Testimonials</h2>
        <div className="space-y-2">
          {testimonials.map((t, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex gap-0.5 mb-1">
                  {Array(t.stars)
                    .fill(0)
                    .map((_, j) => (
                      <Star
                        key={j}
                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                </div>
                <p className="text-xs italic text-muted-foreground mb-1">
                  "{t.text}"
                </p>
                <p className="text-xs font-bold">
                  {t.name} — {t.company}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-xl bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/20 p-4">
        <p className="font-black text-sm mb-3 text-center">
          📞 Contact Skyler Blue IT Resolutions
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-cyan-400" />
            <span className="font-bold text-cyan-400">479-406-7123</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-400" />
            <span>skylerblue4444@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-400" />
            <span>Arkansas, USA — Serving the Region</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <Link href="/it/services">
            <Button className="w-full bg-cyan-600 text-white border-0 text-xs">
              View Services
            </Button>
          </Link>
          <Link href="/it/contact">
            <Button variant="outline" className="w-full text-xs">
              Get Quote
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
