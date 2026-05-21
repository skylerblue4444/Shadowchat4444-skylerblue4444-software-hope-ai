import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Zap,
  Shield,
  Cloud,
  Server,
  Code,
  Users,
  HeadphonesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SERVICES = [
  {
    id: "managed",
    icon: Server,
    title: "Managed IT Assessment",
    desc: "Full review of your IT environment",
    duration: "60 min",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    id: "security",
    icon: Shield,
    title: "Security Audit Consultation",
    desc: "Identify vulnerabilities & risks",
    duration: "45 min",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Migration Planning",
    desc: "Roadmap for moving to the cloud",
    duration: "60 min",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    id: "dev",
    icon: Code,
    title: "Custom Software Discovery",
    desc: "Scope your development project",
    duration: "45 min",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    id: "talent",
    icon: Users,
    title: "IT Staffing Consultation",
    desc: "Find the right IT talent for your team",
    duration: "30 min",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    id: "support",
    icon: HeadphonesIcon,
    title: "General IT Consultation",
    desc: "Discuss any IT challenge or question",
    duration: "30 min",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
];

const TIMES = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ITBook() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const service = SERVICES.find(s => s.id === selectedService);

  const isDateDisabled = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    return d < today || d.getDay() === 0;
  };

  const handleConfirm = async () => {
    if (!form.name || !form.email) {
      toast.error("Name and email are required.");
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setConfirmed(true);
    toast.success("Consultation booked successfully!");
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Consultation Booked!</h1>
          <p className="text-muted-foreground mb-2">
            Your <strong>{service?.title}</strong> is confirmed for
          </p>
          <p className="text-xl font-semibold text-blue-400 mb-1">
            {selectedDate}
          </p>
          <p className="text-lg font-medium mb-6">{selectedTime} CST</p>
          <div className="bg-muted/30 rounded-xl p-4 text-sm text-left mb-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span>{form.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>{form.email}</span>
            </div>
            {form.phone && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span>{form.phone}</span>
              </div>
            )}
            {form.company && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company</span>
                <span>{form.company}</span>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            A confirmation email has been sent to {form.email}. A team member
            will also call you at {form.phone || "the number on file"} 15
            minutes before your session.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => setLocation("/it")} variant="outline">
              Back to Home
            </Button>
            <Button
              onClick={() => {
                setConfirmed(false);
                setStep(1);
                setSelectedService(null);
                setSelectedDate(null);
                setSelectedTime(null);
              }}
            >
              Book Another
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/40 bg-muted/20 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <button
              onClick={() => setLocation("/it")}
              className="hover:text-foreground"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-foreground">Book Consultation</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Schedule a Free Consultation
          </h1>
          <p className="text-muted-foreground text-sm">
            No obligation. No sales pressure. Just expert IT advice tailored to
            your business.
          </p>
          {/* Progress */}
          <div className="flex items-center gap-3 mt-6">
            {["Service", "Date & Time", "Your Info", "Confirm"].map(
              (label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
                  >
                    {step > i + 1 ? <CheckCircle className="h-4 w-4" /> : i + 1}
                  </div>
                  <span
                    className={`text-xs hidden sm:inline ${step === i + 1 ? "text-foreground font-medium" : "text-muted-foreground"}`}
                  >
                    {label}
                  </span>
                  {i < 3 && (
                    <div
                      className={`h-px w-6 sm:w-12 ${step > i + 1 ? "bg-green-500" : "bg-border"}`}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-xl font-bold mb-6">
              What type of consultation do you need?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {SERVICES.map(s => (
                <Card
                  key={s.id}
                  className={`cursor-pointer transition-all border-2 ${selectedService === s.id ? "border-blue-500 bg-blue-500/5" : "border-border/50 hover:border-blue-500/30"}`}
                  onClick={() => setSelectedService(s.id)}
                >
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-10 w-10 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}
                      >
                        <s.icon className={`h-5 w-5 ${s.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm">{s.title}</h3>
                          {selectedService === s.id && (
                            <CheckCircle className="h-4 w-4 text-blue-400" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {s.desc}
                        </p>
                        <Badge className="mt-2 text-xs bg-muted text-muted-foreground border-0">
                          <Clock className="h-3 w-3 mr-1" />
                          {s.duration}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              disabled={!selectedService}
              onClick={() => setStep(2)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0"
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-xl font-bold mb-6">Choose a date and time</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (calMonth === 0) {
                          setCalMonth(11);
                          setCalYear(y => y - 1);
                        } else setCalMonth(m => m - 1);
                      }}
                    >
                      ‹
                    </Button>
                    <span className="font-semibold text-sm">
                      {MONTH_NAMES[calMonth]} {calYear}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (calMonth === 11) {
                          setCalMonth(0);
                          setCalYear(y => y + 1);
                        } else setCalMonth(m => m + 1);
                      }}
                    >
                      ›
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                      <div
                        key={d}
                        className="text-xs text-muted-foreground font-medium py-1"
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDay }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const dateStr = `${MONTH_NAMES[calMonth]} ${day}, ${calYear}`;
                      const disabled = isDateDisabled(day);
                      const selected = selectedDate === dateStr;
                      return (
                        <button
                          key={day}
                          disabled={disabled}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`h-8 w-full rounded-lg text-xs font-medium transition-colors
                            ${disabled ? "text-muted-foreground/30 cursor-not-allowed" : ""}
                            ${selected ? "bg-blue-600 text-white" : !disabled ? "hover:bg-muted" : ""}
                          `}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Time Slots */}
              <div>
                <h3 className="font-semibold text-sm mb-4">
                  {selectedDate
                    ? `Available times for ${selectedDate}`
                    : "Select a date first"}
                </h3>
                {selectedDate ? (
                  <div className="grid grid-cols-3 gap-2">
                    {TIMES.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors
                          ${selectedTime === time ? "bg-blue-600 text-white border-blue-600" : "border-border hover:border-blue-500/50 hover:bg-muted"}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="h-40 flex items-center justify-center text-muted-foreground text-sm border border-dashed border-border rounded-xl">
                    <Calendar className="h-5 w-5 mr-2" /> Pick a date to see
                    available times
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(3)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Contact Info */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-xl font-bold mb-6">Your Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Full Name *
                </label>
                <Input
                  placeholder="John Smith"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
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
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="(479) 555-0100"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Company Name
                </label>
                <Input
                  placeholder="Acme Corp"
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Additional Notes
              </label>
              <Textarea
                placeholder="Tell us about your current IT setup, specific challenges, or questions..."
                rows={4}
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                disabled={!form.name || !form.email}
                onClick={() => setStep(4)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0"
              >
                Review Booking <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-xl font-bold mb-6">Confirm Your Booking</h2>
            <Card className="border-border/50 mb-6">
              <CardContent className="pt-6">
                <div className="space-y-4 text-sm">
                  {[
                    { label: "Service", value: service?.title },
                    { label: "Duration", value: service?.duration },
                    { label: "Date", value: selectedDate },
                    { label: "Time", value: `${selectedTime} CST` },
                    { label: "Name", value: form.name },
                    { label: "Email", value: form.email },
                    { label: "Phone", value: form.phone || "—" },
                    { label: "Company", value: form.company || "—" },
                  ].map(row => (
                    <div
                      key={row.label}
                      className="flex justify-between border-b border-border/30 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-medium text-right max-w-[60%]">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 mb-6 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-blue-400 inline mr-2" />
              This consultation is{" "}
              <strong className="text-foreground">100% free</strong> with no
              obligation. A confirmation email will be sent immediately after
              booking.
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(3)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 min-w-[160px]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Confirming...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> Confirm Booking
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
