import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Star,
  Shield,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  Calendar,
  Laptop,
  Cloud,
  Lock,
  Headphones,
  BarChart3,
  Globe,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SERVICES = [
  {
    name: "Managed IT Services",
    desc: "24/7 proactive monitoring, maintenance, and support for your entire IT infrastructure",
    icon: Laptop,
    price: "From $99/mo",
    color: "#6366f1",
  },
  {
    name: "Cloud Solutions",
    desc: "AWS, Azure, and Google Cloud migration, management, and optimization",
    icon: Cloud,
    price: "From $149/mo",
    color: "#06b6d4",
  },
  {
    name: "Cybersecurity",
    desc: "Threat detection, firewall management, penetration testing, and compliance",
    icon: Lock,
    price: "From $199/mo",
    color: "#ef4444",
  },
  {
    name: "IT Help Desk",
    desc: "Unlimited remote and on-site support tickets with 4-hour response SLA",
    icon: Headphones,
    price: "From $79/mo",
    color: "#22c55e",
  },
  {
    name: "Business Analytics",
    desc: "Data dashboards, reporting, and business intelligence powered by AI",
    icon: BarChart3,
    price: "From $129/mo",
    color: "#f59e0b",
  },
  {
    name: "Web & App Development",
    desc: "Custom websites, mobile apps, and enterprise software solutions",
    icon: Globe,
    price: "From $999 project",
    color: "#ec4899",
  },
];

const TESTIMONIALS = [
  {
    name: "John Martinez",
    company: "Martinez Auto Group",
    rating: 5,
    text: "Skyler Blue transformed our IT infrastructure. Response time went from hours to minutes. Best investment we've made.",
  },
  {
    name: "Sarah Chen",
    company: "Chen Medical Clinic",
    rating: 5,
    text: "HIPAA compliance was a nightmare before. Now it's fully managed. Skyler's team is exceptional.",
  },
  {
    name: "Mike Thompson",
    company: "Thompson Construction",
    rating: 5,
    text: "Cut our IT costs by 40% while improving everything. Highly recommend for any small business.",
  },
];

const STATS = [
  { label: "Happy Clients", value: "444+", icon: Users },
  { label: "Uptime Guaranteed", value: "99.9%", icon: Shield },
  { label: "Response Time", value: "<4hr", icon: Zap },
  { label: "Years Experience", value: "10+", icon: Award },
];

export default function ShadowSkylerBlueLanding() {
  const [tab, setTab] = useState<"home" | "services" | "contact" | "book">(
    "home"
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const submit = () => {
    if (!form.name || !form.email) {
      toast.error("Please fill in required fields");
      return;
    }
    toast.success("Message sent! Skyler will contact you within 24 hours.");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center py-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl font-black text-white">SB</span>
          </div>
          <h1 className="text-2xl font-black">Skyler Blue Spiller's</h1>
          <h2 className="text-lg font-bold text-blue-400">
            Innovative Information Technology Resolutions
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Your trusted IT partner in Northwest Arkansas
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <a
              href="tel:4794067123"
              className="flex items-center gap-1 text-xs text-blue-400 font-bold"
            >
              <Phone className="h-3.5 w-3.5" />
              479-406-7123
            </a>
            <a
              href="mailto:skylerblue4444@gmail.com"
              className="flex items-center gap-1 text-xs text-blue-400 font-bold"
            >
              <Mail className="h-3.5 w-3.5" />
              skylerblue4444@gmail.com
            </a>
          </div>
        </motion.div>
      </div>

      <div className="flex gap-2 justify-center">
        {(["home", "services", "contact", "book"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "home" && (
        <div className="space-y-4">
          {/* Hero */}
          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-purple-900/10 overflow-hidden">
            <CardContent className="py-6 px-4 text-center">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-3">
                🏆 #1 Managed IT in NW Arkansas
              </Badge>
              <p className="font-black text-xl mb-2">
                IT Problems? <span className="text-blue-400">Solved.</span>
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                From cybersecurity to cloud migration — we handle your entire IT
                so you can focus on growing your business.
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  className="h-10 text-xs bg-blue-600 text-white border-0 font-bold"
                  onClick={() => setTab("book")}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Free Consultation
                </Button>
                <Button
                  variant="outline"
                  className="h-10 text-xs font-bold"
                  onClick={() => setTab("services")}
                >
                  Our Services <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="border-border/50 text-center">
                  <CardContent className="py-2.5 px-1">
                    <stat.icon className="h-4 w-4 mx-auto mb-1 text-blue-400" />
                    <p className="font-black text-sm text-blue-400">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-muted-foreground">
              WHAT CLIENTS SAY
            </p>
            {TESTIMONIALS.map((t, i) => (
              <Card key={t.name} className="border-border/50">
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground italic mb-2">
                    "{t.text}"
                  </p>
                  <p className="text-xs font-bold">
                    {t.name} ·{" "}
                    <span className="text-muted-foreground">{t.company}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "services" && (
        <div className="space-y-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50 hover:border-blue-500/20 transition-all">
                <CardContent className="py-3 px-4 flex items-start gap-3">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: service.color + "20" }}
                  >
                    <service.icon
                      className="h-5 w-5"
                      style={{ color: service.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-sm">{service.name}</p>
                      <Badge className="text-xs bg-muted text-muted-foreground">
                        {service.price}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {service.desc}
                    </p>
                    <Button
                      size="sm"
                      className="h-7 text-xs mt-2 font-bold text-white border-0"
                      style={{ backgroundColor: service.color }}
                      onClick={() => {
                        setTab("book");
                      }}
                    >
                      Get Quote <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "contact" && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {[
              {
                icon: Phone,
                label: "Call Us",
                value: "479-406-7123",
                action: "tel:4794067123",
              },
              {
                icon: Mail,
                label: "Email Us",
                value: "skylerblue4444@gmail.com",
                action: "mailto:skylerblue4444@gmail.com",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Northwest Arkansas",
                action: "#",
              },
            ].map(c => (
              <a key={c.label} href={c.action} className="block">
                <Card className="border-blue-500/20 bg-blue-900/5 hover:bg-blue-900/10 transition-all">
                  <CardContent className="py-3 px-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <c.icon className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{c.label}</p>
                      <p className="font-bold text-sm text-blue-400">
                        {c.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
          <Card className="border-border/50">
            <CardContent className="py-4 px-4 space-y-2">
              <p className="font-bold text-sm">Send a Message</p>
              <Input
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Your Name *"
                className="h-9 text-xs"
              />
              <Input
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="Email Address *"
                className="h-9 text-xs"
              />
              <Input
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="Phone Number"
                className="h-9 text-xs"
              />
              <textarea
                value={form.message}
                onChange={e =>
                  setForm(p => ({ ...p, message: e.target.value }))
                }
                placeholder="How can we help you?"
                className="w-full h-20 rounded-xl border border-border bg-background px-3 py-2 text-xs resize-none focus:outline-none"
              />
              <Button
                className="w-full h-10 text-xs bg-blue-600 text-white border-0 font-bold"
                onClick={submit}
              >
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "book" && (
        <Card className="border-blue-500/20 bg-blue-900/5">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Book a Free Consultation</p>
            <p className="text-xs text-muted-foreground">
              30-minute call to discuss your IT needs. No obligation.
            </p>
            <Input placeholder="Your Name" className="h-9 text-xs" />
            <Input placeholder="Email Address" className="h-9 text-xs" />
            <Input placeholder="Phone Number" className="h-9 text-xs" />
            <select className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none">
              <option value="">Select a Service</option>
              {SERVICES.map(s => (
                <option key={s.name}>{s.name}</option>
              ))}
            </select>
            <select className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs focus:outline-none">
              <option>Monday May 18 - 10:00 AM</option>
              <option>Monday May 18 - 2:00 PM</option>
              <option>Tuesday May 19 - 9:00 AM</option>
              <option>Tuesday May 19 - 3:00 PM</option>
              <option>Wednesday May 20 - 11:00 AM</option>
            </select>
            <Button
              className="w-full h-10 text-xs bg-blue-600 text-white border-0 font-bold"
              onClick={() =>
                toast.success(
                  "Consultation booked! Confirmation sent to your email. Skyler will call you at the scheduled time."
                )
              }
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Free Consultation
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Or call directly:{" "}
              <a href="tel:4794067123" className="text-blue-400 font-bold">
                479-406-7123
              </a>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
