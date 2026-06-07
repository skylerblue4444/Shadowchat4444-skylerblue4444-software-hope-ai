import { Router, Request, Response } from "express";

const router = Router();

// ─── IT Services catalog ──────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "managed-it", name: "Managed IT Services", category: "Core",
    description: "Complete end-to-end IT management with proactive monitoring, maintenance, and 24/7 support.",
    features: ["24/7 monitoring", "Patch management", "Help desk support", "Network management", "Vendor management"],
    pricing: [
      { tier: "Starter", price: 299, period: "month", users: "up to 10 users", support: "Business hours" },
      { tier: "Professional", price: 599, period: "month", users: "up to 25 users", support: "24/7" },
      { tier: "Enterprise", price: 1299, period: "month", users: "Unlimited", support: "24/7 Priority" },
    ],
  },
  {
    id: "cybersecurity", name: "Cybersecurity Services", category: "Security",
    description: "Enterprise-grade security solutions including threat detection, penetration testing, and compliance.",
    features: ["Vulnerability assessments", "Penetration testing", "SIEM monitoring", "Compliance auditing", "Security training"],
    pricing: [
      { tier: "Basic", price: 199, period: "month", users: "Security monitoring", support: "Email" },
      { tier: "Advanced", price: 499, period: "month", users: "Full security suite", support: "24/7" },
      { tier: "Enterprise", price: 999, period: "month", users: "Custom SOC", support: "Dedicated team" },
    ],
  },
  {
    id: "cloud", name: "Cloud Solutions", category: "Infrastructure",
    description: "Cloud migration, management, and optimization across AWS, Azure, and Google Cloud.",
    features: ["Cloud migration", "Cost optimization", "Auto-scaling", "Disaster recovery", "Multi-cloud management"],
    pricing: [
      { tier: "Starter", price: 399, period: "month", users: "Up to $5k cloud spend", support: "Business hours" },
      { tier: "Growth", price: 799, period: "month", users: "Up to $20k cloud spend", support: "24/7" },
      { tier: "Enterprise", price: "Custom", period: "month", users: "Unlimited", support: "Dedicated" },
    ],
  },
  {
    id: "custom-dev", name: "Custom Software Development", category: "Development",
    description: "Full-stack web, mobile, and enterprise software development tailored to your business.",
    features: ["Web applications", "Mobile apps", "API development", "Database design", "UI/UX design"],
    pricing: [
      { tier: "Project", price: 5000, period: "project", users: "Small project", support: "Project duration" },
      { tier: "Retainer", price: 3500, period: "month", users: "40 hrs/month", support: "Business hours" },
      { tier: "Dedicated Team", price: 8000, period: "month", users: "Full team", support: "24/7" },
    ],
  },
];

// ─── Talent job listings ──────────────────────────────────────────────────────
const JOB_LISTINGS = [
  { id: 1, title: "Senior Full-Stack Developer", type: "Contract", location: "Remote", rate: "$85-120/hr", skills: ["React", "Node.js", "TypeScript", "PostgreSQL"], posted: "2025-05-10", urgent: true, company: "FinTech Startup" },
  { id: 2, title: "Cybersecurity Analyst", type: "Full-Time", location: "Fayetteville, AR", rate: "$75,000-95,000/yr", skills: ["SIEM", "Penetration Testing", "CISSP", "SOC"], posted: "2025-05-09", urgent: false, company: "Healthcare Group" },
  { id: 3, title: "Cloud Architect (AWS)", type: "Contract", location: "Remote", rate: "$100-150/hr", skills: ["AWS", "Terraform", "Kubernetes", "DevOps"], posted: "2025-05-08", urgent: true, company: "Enterprise Corp" },
  { id: 4, title: "IT Project Manager", type: "Full-Time", location: "Rogers, AR", rate: "$65,000-85,000/yr", skills: ["PMP", "Agile", "ITIL", "Stakeholder Management"], posted: "2025-05-07", urgent: false, company: "Retail Chain" },
  { id: 5, title: "Network Engineer", type: "Part-Time", location: "Bentonville, AR", rate: "$45-65/hr", skills: ["Cisco", "Juniper", "BGP", "MPLS"], posted: "2025-05-06", urgent: false, company: "ISP Provider" },
  { id: 6, title: "Mobile Developer (React Native)", type: "Contract", location: "Remote", rate: "$70-100/hr", skills: ["React Native", "iOS", "Android", "Firebase"], posted: "2025-05-05", urgent: true, company: "Logistics Company" },
  { id: 7, title: "Database Administrator", type: "Full-Time", location: "Fort Smith, AR", rate: "$70,000-90,000/yr", skills: ["PostgreSQL", "MySQL", "MongoDB", "Performance Tuning"], posted: "2025-05-04", urgent: false, company: "Manufacturing Co" },
  { id: 8, title: "IT Support Specialist", type: "Full-Time", location: "Fayetteville, AR", rate: "$40,000-55,000/yr", skills: ["Help Desk", "Windows", "Active Directory", "ITIL"], posted: "2025-05-03", urgent: false, company: "Law Firm" },
];

// ─── GET /api/it/services ─────────────────────────────────────────────────────
router.get("/services", (_req: Request, res: Response) => {
  res.json({ services: SERVICES });
});

// ─── GET /api/it/services/:id ─────────────────────────────────────────────────
router.get("/services/:id", (req: Request, res: Response) => {
  const service = SERVICES.find(s => s.id === req.params.id);
  if (!service) return res.status(404).json({ error: "Service not found" });
  res.json(service);
});

// ─── GET /api/it/talent/jobs ──────────────────────────────────────────────────
router.get("/talent/jobs", (req: Request, res: Response) => {
  const { type, location, search } = req.query;
  let jobs = [...JOB_LISTINGS];

  if (type && type !== "All") jobs = jobs.filter(j => j.type === type);
  if (location && location !== "All") jobs = jobs.filter(j => j.location.includes(location as string));
  if (search) {
    const q = (search as string).toLowerCase();
    jobs = jobs.filter(j => j.title.toLowerCase().includes(q) || j.skills.some(s => s.toLowerCase().includes(q)));
  }

  res.json({ jobs, total: jobs.length });
});

// ─── POST /api/it/talent/apply ────────────────────────────────────────────────
router.post("/talent/apply", (req: Request, res: Response) => {
  const { jobId, name, email, phone, resume, coverLetter } = req.body;
  if (!jobId || !name || !email) return res.status(400).json({ error: "jobId, name, and email required" });

  const applicationId = `APP-${Date.now().toString(36).toUpperCase()}`;
  res.json({
    success: true,
    applicationId,
    message: "Application submitted successfully! We'll be in touch within 24 hours.",
    submittedAt: new Date().toISOString(),
  });
});

// ─── POST /api/it/talent/post-job ─────────────────────────────────────────────
router.post("/talent/post-job", (req: Request, res: Response) => {
  const { title, company, type, location, rate, skills, description, contact } = req.body;
  if (!title || !company || !contact) return res.status(400).json({ error: "title, company, and contact required" });

  const jobId = JOB_LISTINGS.length + 1;
  res.json({
    success: true,
    jobId,
    message: "Job posted successfully! It will be reviewed and published within 2 hours.",
    postedAt: new Date().toISOString(),
  });
});

// ─── POST /api/it/book ────────────────────────────────────────────────────────
router.post("/book", (req: Request, res: Response) => {
  const { name, email, phone, company, service, date, time, notes } = req.body;
  if (!name || !email || !service || !date) return res.status(400).json({ error: "name, email, service, and date required" });

  const bookingId = `BOOK-${Date.now().toString(36).toUpperCase()}`;
  res.json({
    success: true,
    bookingId,
    message: `Consultation booked for ${date} at ${time}. Confirmation sent to ${email}.`,
    details: { name, email, phone, company, service, date, time },
    bookedAt: new Date().toISOString(),
    confirmationEmail: email,
    phone: "479-406-7123",
  });
});

// ─── POST /api/it/contact ─────────────────────────────────────────────────────
router.post("/contact", (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: "name, email, and message required" });

  const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}`;
  res.json({
    success: true,
    ticketId,
    message: `Message received! We'll respond to ${email} within 2 business hours.`,
    submittedAt: new Date().toISOString(),
  });
});

// ─── GET /api/it/products ─────────────────────────────────────────────────────
router.get("/products", (_req: Request, res: Response) => {
  const products = [
    { id: 1, name: "SkyGuard Endpoint Security Suite", type: "Software", price: 49, period: "user/month", description: "Enterprise endpoint protection with AI threat detection, ransomware prevention, and centralized management.", features: ["AI threat detection", "Ransomware protection", "Centralized dashboard", "24/7 monitoring"] },
    { id: 2, name: "SkyCloud Backup Pro", type: "Software", price: 29, period: "TB/month", description: "Automated cloud backup with 256-bit encryption, instant recovery, and 99.99% uptime SLA.", features: ["Automated backups", "Instant recovery", "256-bit encryption", "Compliance ready"] },
    { id: 3, name: "SkyDesk Help Desk Platform", type: "Software", price: 15, period: "agent/month", description: "Full-featured IT help desk with ticketing, SLA management, knowledge base, and analytics.", features: ["Ticket management", "SLA tracking", "Knowledge base", "Analytics dashboard"] },
    { id: 4, name: "Business Workstation Bundle", type: "Hardware", price: 1299, period: "one-time", description: "Pre-configured business workstation with Windows 11 Pro, 32GB RAM, 1TB NVMe SSD, and 3-year warranty.", features: ["Windows 11 Pro", "32GB RAM", "1TB NVMe", "3-year warranty"] },
    { id: 5, name: "Managed Network Switch 24-Port", type: "Hardware", price: 449, period: "one-time", description: "Enterprise 24-port managed gigabit switch with PoE+, VLAN support, and remote management.", features: ["24 ports", "PoE+ support", "VLAN capable", "Remote management"] },
    { id: 6, name: "SkyVPN Business", type: "Software", price: 8, period: "user/month", description: "Business-grade VPN with zero-log policy, split tunneling, and dedicated IP addresses.", features: ["Zero-log policy", "Split tunneling", "Dedicated IPs", "Multi-device"] },
  ];
  res.json({ products });
});

export default router;
