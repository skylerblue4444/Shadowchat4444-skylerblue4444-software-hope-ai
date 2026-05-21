import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Cpu,
  Shield,
  Users,
  Award,
  TrendingUp,
  Heart,
  Zap,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Star,
  Building2,
  Globe,
  Code,
  Server,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TEAM = [
  {
    name: "Skyler Blue Spiller",
    role: "Founder & CEO",
    bio: "15+ years in enterprise IT, cybersecurity, and managed services. Passionate about making enterprise-grade technology accessible to businesses of all sizes across Arkansas.",
    skills: [
      "Strategic Planning",
      "Cybersecurity",
      "Cloud Architecture",
      "Business Development",
    ],
    initial: "S",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Jordan Mitchell",
    role: "Director of Engineering",
    bio: "Former senior engineer at Fortune 500 tech companies. Leads our custom development and cloud migration teams with a focus on scalable, maintainable solutions.",
    skills: ["Full-Stack Dev", "AWS", "DevOps", "Team Leadership"],
    initial: "J",
    gradient: "from-purple-500 to-blue-500",
  },
  {
    name: "Priya Sharma",
    role: "Head of Cybersecurity",
    bio: "CISSP-certified security expert with deep experience in healthcare and financial sector compliance. Leads our SOC operations and penetration testing practice.",
    skills: ["CISSP", "Penetration Testing", "HIPAA/PCI", "Incident Response"],
    initial: "P",
    gradient: "from-red-500 to-orange-500",
  },
  {
    name: "Marcus Webb",
    role: "Client Success Manager",
    bio: "Dedicated to ensuring every client gets maximum value from our services. Marcus manages our enterprise accounts and leads the onboarding experience.",
    skills: [
      "Account Management",
      "ITIL",
      "Client Relations",
      "Project Management",
    ],
    initial: "M",
    gradient: "from-green-500 to-teal-500",
  },
];

const VALUES = [
  {
    icon: Shield,
    title: "Integrity First",
    desc: "We tell you what you need, not what's most profitable for us. Honest assessments, transparent pricing, no hidden fees.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "Speed & Reliability",
    desc: "When your systems are down, every minute costs money. We respond fast and resolve faster — guaranteed SLAs on every engagement.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We stay ahead of technology trends so you don't have to. Our team continuously trains on emerging technologies to bring you the best solutions.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Heart,
    title: "Community",
    desc: "We're proud to be an Arkansas-based business. We invest in local talent, support local businesses, and give back to our community.",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
];

const MILESTONES = [
  {
    year: "2012",
    title: "Founded",
    desc: "Skyler Blue Spiller started the company from a spare bedroom with a vision to bring enterprise IT to small businesses.",
  },
  {
    year: "2015",
    title: "First 100 Clients",
    desc: "Expanded to a full team of 8 and opened our first office in Fayetteville, AR.",
  },
  {
    year: "2018",
    title: "Cybersecurity Practice",
    desc: "Launched dedicated cybersecurity division, becoming one of the first MSPs in Arkansas with a full SOC.",
  },
  {
    year: "2021",
    title: "Cloud Center of Excellence",
    desc: "Achieved AWS Advanced Tier Partner status and launched our cloud migration practice.",
  },
  {
    year: "2023",
    title: "Talent Marketplace",
    desc: "Launched the IT Talent Marketplace, connecting businesses with vetted IT professionals across the region.",
  },
  {
    year: "2026",
    title: "500+ Clients",
    desc: "Serving 500+ businesses across Arkansas and beyond, with 24/7 operations and a team of 45+ experts.",
  },
];

const CERTIFICATIONS = [
  "Microsoft Gold Partner",
  "AWS Advanced Tier Partner",
  "Google Cloud Partner",
  "CompTIA Security+",
  "CISSP Certified Staff",
  "ITIL v4 Certified",
  "PMP Certified PMs",
  "Cisco Premier Partner",
  "SOC 2 Type II Compliant",
];

export default function ITAbout() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/40 bg-gradient-to-br from-blue-950/30 to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <button
              onClick={() => setLocation("/it")}
              className="hover:text-foreground"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-foreground">About Us</span>
          </div>
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
              <Building2 className="h-3 w-3 mr-1" /> Founded 2012 ·
              Fayetteville, AR
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Arkansas's Most Trusted
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                IT Solutions Partner
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Skyler Blue Spiller's Innovative IT Resolutions was built on a
              simple belief: every business deserves enterprise-grade
              technology, regardless of size or budget. For over a decade, we've
              been delivering that promise to hundreds of businesses across
              Arkansas and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We exist to remove the technology barriers that hold businesses
                back. Whether you're a 5-person startup or a 500-employee
                enterprise, you deserve reliable IT infrastructure, robust
                security, and technology that actually helps you grow.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We're not just a vendor — we're a partner. We take the time to
                understand your business, your goals, and your challenges before
                recommending any solution. That's why our client retention rate
                exceeds 94%.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Client Retention", value: "94%" },
                  { label: "Avg. Response Time", value: "<45min" },
                  { label: "Team Members", value: "45+" },
                  { label: "States Served", value: "12" },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="bg-muted/30 rounded-xl p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-blue-400">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {VALUES.map(v => (
                <Card key={v.title} className="border-border/50">
                  <CardContent className="pt-5">
                    <div
                      className={`h-10 w-10 rounded-lg ${v.bg} flex items-center justify-center mb-3`}
                    >
                      <v.icon className={`h-5 w-5 ${v.color}`} />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{v.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {v.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-muted/20 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Meet the Team</h2>
            <p className="text-muted-foreground">
              Experienced professionals dedicated to your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-border/50 h-full">
                  <CardContent className="pt-6 text-center">
                    <div
                      className={`h-16 w-16 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}
                    >
                      {member.initial}
                    </div>
                    <h3 className="font-bold mb-0.5">{member.name}</h3>
                    <p className="text-sm text-blue-400 mb-3">{member.role}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.skills.map(s => (
                        <Badge
                          key={s}
                          className="text-xs bg-muted text-muted-foreground border-0"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-12 shrink-0 text-right">
                    <span className="text-sm font-bold text-blue-400">
                      {m.year}
                    </span>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-blue-500 border-2 border-background" />
                    <h3 className="font-bold text-sm mb-1">{m.title}</h3>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-muted/20 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6 text-center">
            Certifications & Partnerships
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {CERTIFICATIONS.map(cert => (
              <Badge
                key={cert}
                variant="outline"
                className="px-3 py-1.5 text-xs"
              >
                <Award className="h-3 w-3 mr-1.5 text-blue-400" />
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-950/40 to-cyan-950/30 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work with Us?</h2>
          <p className="text-muted-foreground mb-8">
            Join 500+ businesses that trust Skyler Blue IT Resolutions for their
            technology needs.
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
