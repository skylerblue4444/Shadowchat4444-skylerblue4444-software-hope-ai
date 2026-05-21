import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Shield,
  Server,
  Cloud,
  HeadphonesIcon,
  Code,
  Wifi,
  Lock,
  Monitor,
  Database,
  Network,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Zap,
  Star,
  Users,
  Cpu,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MANAGED_IT_FEATURES = [
  "24/7 proactive network monitoring",
  "Unlimited remote support tickets",
  "Monthly on-site visits (2 per month)",
  "Patch management & updates",
  "Backup & disaster recovery",
  "Vendor management",
  "IT strategy & quarterly reviews",
  "Hardware procurement assistance",
];

const SECURITY_FEATURES = [
  "Vulnerability assessment & penetration testing",
  "Endpoint detection & response (EDR)",
  "Email security & anti-phishing",
  "SIEM log monitoring",
  "Compliance management (HIPAA, PCI, SOC2)",
  "Security awareness training",
  "Incident response planning",
  "Dark web monitoring",
];

const CLOUD_FEATURES = [
  "Cloud migration strategy & execution",
  "Microsoft 365 / Google Workspace admin",
  "AWS / Azure / GCP management",
  "Cloud cost optimization",
  "Hybrid cloud architecture",
  "Disaster recovery as a service (DRaaS)",
  "Cloud security hardening",
  "Performance monitoring & scaling",
];

const PLANS = [
  {
    name: "Starter",
    price: "$299",
    period: "/mo",
    description: "Perfect for small businesses with 1–10 users",
    color: "border-border",
    badge: null,
    features: [
      "Up to 10 managed endpoints",
      "Remote help desk support (business hours)",
      "Patch management",
      "Basic antivirus & firewall",
      "Monthly reports",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "$699",
    period: "/mo",
    description: "Ideal for growing teams with 11–50 users",
    color: "border-blue-500",
    badge: "Most Popular",
    features: [
      "Up to 50 managed endpoints",
      "24/7 remote support",
      "Advanced EDR security",
      "Cloud backup & recovery",
      "Quarterly on-site visits",
      "Priority response <2 hours",
      "Microsoft 365 management",
      "Monthly strategy calls",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Full-scale IT management for 50+ users",
    color: "border-cyan-500",
    badge: "Best Value",
    features: [
      "Unlimited managed endpoints",
      "Dedicated IT account manager",
      "24/7 on-call support",
      "Full cybersecurity suite",
      "Unlimited on-site visits",
      "vCIO strategic planning",
      "Compliance management",
      "Custom SLA agreements",
    ],
  },
];

const SERVICES_DETAIL = [
  {
    id: "managed",
    icon: Server,
    title: "Managed IT Services",
    tagline: "Your entire IT department — without the overhead",
    description:
      "We become your outsourced IT department, handling everything from day-to-day support tickets to long-term technology strategy. Our proactive approach means we fix problems before they impact your business.",
    features: MANAGED_IT_FEATURES,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    id: "security",
    icon: Shield,
    title: "Cybersecurity",
    tagline: "Protect your business from modern threats",
    description:
      "Cyber threats are evolving daily. Our security team uses enterprise-grade tools and methodologies to protect your data, systems, and reputation — keeping you compliant and your customers' trust intact.",
    features: SECURITY_FEATURES,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Solutions",
    tagline: "Modernize your infrastructure with confidence",
    description:
      "Whether you're moving to the cloud for the first time or optimizing an existing multi-cloud environment, our certified cloud architects design and manage solutions that scale with your business.",
    features: CLOUD_FEATURES,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

const FAQS = [
  {
    q: "How quickly can you onboard my business?",
    a: "Most clients are fully onboarded within 5–10 business days. We conduct a thorough IT assessment, document your environment, and deploy our monitoring tools with minimal disruption.",
  },
  {
    q: "Do you require long-term contracts?",
    a: "No. We offer month-to-month agreements because we believe our results speak for themselves. Enterprise clients may choose annual agreements for discounted rates.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We serve healthcare, legal, finance, retail, manufacturing, and professional services. We have deep expertise in HIPAA, PCI-DSS, and SOC 2 compliance requirements.",
  },
  {
    q: "Can you support remote and hybrid workforces?",
    a: "Absolutely. We specialize in securing and supporting distributed teams with VPN management, zero-trust architecture, and remote endpoint management.",
  },
  {
    q: "What is your average response time?",
    a: "Critical issues: under 15 minutes. High priority: under 1 hour. Standard tickets: under 4 hours. All response times are guaranteed in your SLA.",
  },
];

export default function ITServices() {
  const [, setLocation] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            <span className="text-foreground">Services</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">IT Services & Solutions</h1>
          <p className="text-muted-foreground max-w-2xl">
            Comprehensive technology services designed to keep your business
            running at peak performance — from managed IT and cybersecurity to
            cloud infrastructure and custom development.
          </p>
        </div>
      </div>

      {/* Service Details Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="managed" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-10 h-auto p-1">
              {SERVICES_DETAIL.map(s => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className="py-3 flex items-center gap-2"
                >
                  <s.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{s.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {SERVICES_DETAIL.map(service => (
              <TabsContent key={service.id} value={service.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
                >
                  <div>
                    <div
                      className={`h-14 w-14 rounded-2xl ${service.bg} flex items-center justify-center mb-6`}
                    >
                      <service.icon className={`h-7 w-7 ${service.color}`} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">{service.title}</h2>
                    <p className={`text-lg font-medium mb-4 ${service.color}`}>
                      {service.tagline}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => setLocation("/it/book")}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0"
                      >
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setLocation("/it/contact")}
                      >
                        Ask a Question
                      </Button>
                    </div>
                  </div>
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">What's Included</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {service.features.map(f => (
                          <li
                            key={f}
                            className="flex items-start gap-3 text-sm"
                          >
                            <CheckCircle
                              className={`h-4 w-4 mt-0.5 shrink-0 ${service.color}`}
                            />
                            <span className="text-muted-foreground">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Additional Services Grid */}
      <section className="py-16 bg-muted/20 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: HeadphonesIcon,
                title: "Help Desk Support",
                desc: "24/7 remote & on-site technical support",
                color: "text-green-400",
              },
              {
                icon: Code,
                title: "Custom Development",
                desc: "Web, mobile & enterprise software",
                color: "text-yellow-400",
              },
              {
                icon: Network,
                title: "Network Infrastructure",
                desc: "Design, installation & management",
                color: "text-orange-400",
              },
              {
                icon: Database,
                title: "Data Backup & Recovery",
                desc: "Automated backups with fast restore",
                color: "text-pink-400",
              },
              {
                icon: Monitor,
                title: "VoIP & Communications",
                desc: "Modern phone systems & video conferencing",
                color: "text-indigo-400",
              },
              {
                icon: Wifi,
                title: "Wireless Networking",
                desc: "Enterprise WiFi design & deployment",
                color: "text-teal-400",
              },
              {
                icon: Lock,
                title: "Compliance Consulting",
                desc: "HIPAA, PCI-DSS, SOC 2 readiness",
                color: "text-red-400",
              },
              {
                icon: Users,
                title: "IT Staffing & Talent",
                desc: "Contract & permanent IT placement",
                color: "text-cyan-400",
              },
            ].map(item => (
              <Card
                key={item.title}
                className="border-border/50 hover:border-blue-500/30 transition-colors cursor-pointer"
                onClick={() => setLocation("/it/contact")}
              >
                <CardContent className="pt-5">
                  <item.icon className={`h-6 w-6 ${item.color} mb-3`} />
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-muted-foreground">
              No hidden fees. No surprises. Just reliable IT support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`h-full border-2 ${plan.color} relative`}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white border-0 px-3">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={
                        plan.name === "Professional" ? "default" : "outline"
                      }
                      onClick={() => setLocation("/it/book")}
                    >
                      {plan.price === "Custom"
                        ? "Contact for Pricing"
                        : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/20 border-t border-border/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <Card
                key={i}
                className="border-border/50 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm pr-4">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                  {openFaq === i && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-muted-foreground mt-3 leading-relaxed"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-950/40 to-cyan-950/30 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Schedule a free IT assessment and consultation today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setLocation("/it/book")}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0"
            >
              Book Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <a href="tel:4794067123">
              <Button size="lg" variant="outline">
                <Phone className="mr-2 h-4 w-4" /> 479-406-7123
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
