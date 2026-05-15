import { ExternalLink, Phone, Mail, MapPin, Award, Briefcase, Code, Star, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SERVICES = [
  { icon: "🖥️", name: "Managed IT Services",     desc: "Full IT management, monitoring, helpdesk, and proactive maintenance" },
  { icon: "🔒", name: "Cybersecurity",             desc: "Threat detection, firewall management, security audits, and compliance" },
  { icon: "☁️", name: "Cloud Solutions",           desc: "AWS, Azure, Google Cloud migration, management, and optimization" },
  { icon: "📡", name: "Network Infrastructure",    desc: "Network design, installation, VPN, and wireless solutions" },
  { icon: "💾", name: "Data Backup & Recovery",    desc: "Automated backups, disaster recovery planning, and data restoration" },
  { icon: "🤖", name: "AI & Automation",           desc: "Business process automation, AI integration, and workflow optimization" },
  { icon: "📱", name: "Mobile Device Management",  desc: "MDM solutions, BYOD policies, and device security" },
  { icon: "🎓", name: "IT Training",               desc: "Staff training, cybersecurity awareness, and technology adoption" },
];

const PROJECTS = [
  { name: "ShadowChat Platform",    tech: ["React","TypeScript","Web3"], status: "Live",    desc: "100+ page Web3 super-platform" },
  { name: "SKY4444 ICO",           tech: ["Solidity","DeFi","NFT"],     status: "Active",  desc: "Token sale and ICO platform"   },
  { name: "Enterprise IT Rollout", tech: ["Azure","MDM","Security"],    status: "Complete",desc: "500-user enterprise migration"  },
  { name: "Crypto Trading Bot",    tech: ["Python","AI","API"],         status: "Live",    desc: "Automated trading with 84% win rate" },
];

const CERTS = ["CompTIA A+","CompTIA Network+","CompTIA Security+","Microsoft Azure","AWS Solutions Architect","Google Cloud Professional"];

export default function ShadowSkylerBluePortfolio() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative rounded-2xl bg-gradient-to-br from-sky-900/40 via-blue-900/30 to-indigo-900/40 border border-sky-500/20 p-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.1),transparent_70%)]" />
        <div className="relative">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-2xl font-black text-white shrink-0">SB</div>
            <div className="flex-1">
              <h1 className="text-2xl font-black text-white">Skyler Blue Spiller</h1>
              <p className="text-sky-300 font-bold">Innovative Information Technology Resolutions</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <a href="tel:4794067123" className="flex items-center gap-1 text-xs text-sky-300 hover:text-white transition-colors">
                  <Phone className="h-3 w-3" />479-406-7123
                </a>
                <a href="mailto:skylerblue4444@gmail.com" className="flex items-center gap-1 text-xs text-sky-300 hover:text-white transition-colors">
                  <Mail className="h-3 w-3" />skylerblue4444@gmail.com
                </a>
                <span className="flex items-center gap-1 text-xs text-sky-300">
                  <MapPin className="h-3 w-3" />Arkansas, USA
                </span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-sky-100/80 leading-relaxed">
            Founder of ShadowChat and SKY4444 ICO. Full-stack Web3 developer, managed IT specialist, and technology entrepreneur. 
            Building the future of decentralized communication, finance, and enterprise IT solutions.
          </p>
          <div className="flex gap-2 mt-4">
            <Button size="sm" className="h-8 bg-sky-500 text-white border-0 font-bold text-xs" onClick={() => toast.success("Opening booking calendar...")}>
              Book Consultation
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs border-sky-500/30 text-sky-300" onClick={() => toast.success("Downloading resume...")}>
              Download Resume
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Years Experience", value: "10+",   color: "text-sky-400"    },
          { label: "Clients Served",   value: "200+",  color: "text-green-400"  },
          { label: "Projects Done",    value: "500+",  color: "text-blue-400"   },
          { label: "Uptime SLA",       value: "99.9%", color: "text-purple-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-xl " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Services */}
      <div className="space-y-2">
        <p className="text-sm font-bold">Services Offered</p>
        <div className="grid grid-cols-2 gap-2">
          {SERVICES.map((s, i) => (
            <Card key={i} className="border-border/50 hover:border-sky-500/20 transition-all cursor-pointer">
              <CardContent className="py-3 px-3">
                <p className="text-lg mb-1">{s.icon}</p>
                <p className="font-bold text-xs">{s.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="space-y-2">
        <p className="text-sm font-bold">Featured Projects</p>
        {PROJECTS.map((p, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <Code className="h-5 w-5 text-sky-400 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{p.name}</p>
                  <Badge className="bg-green-500/10 text-green-400 border-0 text-xs">{p.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
                <div className="flex gap-1 mt-1">{p.tech.map(t => <span key={t} className="text-xs bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded">{t}</span>)}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certifications */}
      <div className="space-y-2">
        <p className="text-sm font-bold">Certifications</p>
        <div className="flex flex-wrap gap-2">
          {CERTS.map(cert => (
            <div key={cert} className="flex items-center gap-1 bg-muted rounded-full px-3 py-1.5 text-xs font-medium">
              <CheckCircle className="h-3 w-3 text-green-400" />{cert}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
