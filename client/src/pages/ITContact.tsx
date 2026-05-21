import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  HeadphonesIcon,
  Zap,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const CONTACT_METHODS = [
  {
    icon: Phone,
    title: "Call Us",
    value: "479-406-7123",
    sub: "Mon–Fri 8am–6pm CST",
    href: "tel:4794067123",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "skylerblue4444@gmail.com",
    sub: "We respond within 2 hours",
    href: "mailto:skylerblue4444@gmail.com",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    value: "Chat with Support",
    sub: "Available 24/7",
    href: "#",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: HeadphonesIcon,
    title: "Emergency Support",
    value: "479-406-7123 ext. 9",
    sub: "Critical issues only — 24/7",
    href: "tel:4794067123",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
];

const DEPARTMENTS = [
  "General Inquiry",
  "Managed IT Services",
  "Cybersecurity",
  "Cloud Solutions",
  "Custom Development",
  "IT Talent / Hiring",
  "Billing & Accounts",
  "Technical Support",
  "Partnership Inquiry",
];

export default function ITContact() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    department: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success("Message sent! We'll be in touch within 2 hours.");
  };

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
            <span className="text-foreground">Contact</span>
          </div>
          <h1 className="text-4xl font-bold mb-3">Get In Touch</h1>
          <p className="text-muted-foreground max-w-xl">
            Ready to transform your IT infrastructure? Have a question? Our team
            is here to help. Reach out and we'll respond within 2 business
            hours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-5">
            <h2 className="text-xl font-bold mb-6">Contact Options</h2>
            {CONTACT_METHODS.map(method => (
              <a key={method.title} href={method.href} className="block group">
                <Card className="border-border/50 hover:border-blue-500/30 transition-all group-hover:-translate-y-0.5">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-10 w-10 rounded-lg ${method.bg} flex items-center justify-center shrink-0`}
                      >
                        <method.icon className={`h-5 w-5 ${method.color}`} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">
                          {method.title}
                        </p>
                        <p className={`font-semibold text-sm ${method.color}`}>
                          {method.value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {method.sub}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}

            {/* Office Hours */}
            <Card className="border-border/50 mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM CST" },
                    { day: "Saturday", hours: "9:00 AM – 2:00 PM CST" },
                    { day: "Sunday", hours: "Emergency support only" },
                  ].map(row => (
                    <div key={row.day} className="flex justify-between">
                      <span className="text-muted-foreground">{row.day}</span>
                      <span className="font-medium text-xs">{row.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-green-400 font-medium">
                      24/7 Emergency Support Available
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-border/50">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Service Area</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Northwest Arkansas & surrounding regions.
                      <br />
                      Remote support available nationwide.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-blue-400" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      Message Received!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you, {form.name}. We'll respond to {form.email}{" "}
                      within 2 business hours.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Button
                        onClick={() => setSubmitted(false)}
                        variant="outline"
                      >
                        Send Another
                      </Button>
                      <Button onClick={() => setLocation("/it/book")}>
                        Book Consultation{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                          Full Name *
                        </label>
                        <Input
                          placeholder="John Smith"
                          value={form.name}
                          onChange={e =>
                            setForm({ ...form, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          placeholder="john@company.com"
                          value={form.email}
                          onChange={e =>
                            setForm({ ...form, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="(479) 555-0100"
                          value={form.phone}
                          onChange={e =>
                            setForm({ ...form, phone: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                          Company Name
                        </label>
                        <Input
                          placeholder="Acme Corp"
                          value={form.company}
                          onChange={e =>
                            setForm({ ...form, company: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                        Department / Topic
                      </label>
                      <select
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        value={form.department}
                        onChange={e =>
                          setForm({ ...form, department: e.target.value })
                        }
                      >
                        {DEPARTMENTS.map(d => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                        Message *
                      </label>
                      <Textarea
                        placeholder="Tell us about your IT needs, current challenges, or questions..."
                        rows={5}
                        value={form.message}
                        onChange={e =>
                          setForm({ ...form, message: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-xs text-muted-foreground">
                        We typically respond within 2 business hours.
                      </p>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 min-w-[140px]"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="h-4 w-4" /> Send Message
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
