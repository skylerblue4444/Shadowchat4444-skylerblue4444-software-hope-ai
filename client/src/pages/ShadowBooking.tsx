import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  ChevronRight,
  Laptop,
  Plane,
  Utensils,
  Music,
  Heart,
  Briefcase,
  Coins,
  Zap,
  Users,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CATEGORIES = [
  {
    id: "it",
    name: "IT Services",
    emoji: "💻",
    desc: "Managed IT, cybersecurity, cloud setup",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "travel",
    name: "Travel",
    emoji: "✈️",
    desc: "Flights, hotels, and experiences",
    color: "text-sky-400",
    bg: "bg-sky-500/10 border-sky-500/20",
  },
  {
    id: "restaurant",
    name: "Dining",
    emoji: "🍽️",
    desc: "Reserve tables at top restaurants",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    id: "events",
    name: "Events",
    emoji: "🎪",
    desc: "Concerts, conferences, meetups",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    id: "health",
    name: "Health",
    emoji: "🏥",
    desc: "Doctor, dentist, wellness appointments",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    id: "dating",
    name: "Date Night",
    emoji: "💘",
    desc: "Plan the perfect date experience",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
];

const IT_SERVICES = [
  {
    name: "IT Consultation",
    duration: "1 hr",
    price: "Free (first session)",
    emoji: "💬",
    available: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  {
    name: "Network Setup",
    duration: "2-4 hrs",
    price: "200 SKY4444 or $150",
    emoji: "🌐",
    available: ["Mon", "Wed", "Fri"],
  },
  {
    name: "Cybersecurity Audit",
    duration: "4-8 hrs",
    price: "500 SKY4444 or $350",
    emoji: "🛡️",
    available: ["Tue", "Thu"],
  },
  {
    name: "Cloud Migration",
    duration: "1-3 days",
    price: "1000 SKY4444 or $750",
    emoji: "☁️",
    available: ["Mon", "Tue", "Wed"],
  },
  {
    name: "PC/Mac Repair",
    duration: "1-2 hrs",
    price: "100 SKY4444 or $75",
    emoji: "🔧",
    available: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  {
    name: "Data Recovery",
    duration: "2-24 hrs",
    price: "300 SKY4444 or $200",
    emoji: "💾",
    available: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
];

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const MY_BOOKINGS = [
  {
    service: "IT Consultation",
    date: "May 17, 2026",
    time: "10:00 AM",
    status: "confirmed",
    emoji: "💬",
    ref: "SKY-4441",
  },
  {
    service: "Network Setup",
    date: "May 20, 2026",
    time: "2:00 PM",
    status: "pending",
    emoji: "🌐",
    ref: "SKY-4442",
  },
  {
    service: "Cybersecurity Audit",
    date: "May 15, 2026",
    time: "9:00 AM",
    status: "completed",
    emoji: "🛡️",
    ref: "SKY-4440",
  },
];

export default function ShadowBooking() {
  const [tab, setTab] = useState<"book" | "mybookings" | "itservices">("book");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("SKY4444");

  const confirmBooking = () => {
    toast.success(
      `✅ Booking confirmed! Ref: SKY-${Math.floor(Math.random() * 9000 + 1000)}\n${selectedService} on ${selectedDate} at ${selectedTime}`
    );
    setStep(1);
    setSelectedCategory(null);
    setSelectedService(null);
    setSelectedDate("");
    setSelectedTime("");
    setTab("mybookings");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-400" />
            ShadowBook
          </h1>
          <p className="text-sm text-muted-foreground">
            Book IT services, travel, dining, events — pay with crypto
          </p>
        </div>
        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 font-bold">
          📅 {MY_BOOKINGS.length} Bookings
        </Badge>
      </div>

      <div className="flex gap-2">
        {(["book", "mybookings", "itservices"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "mybookings"
              ? "My Bookings"
              : t === "itservices"
                ? "IT Services"
                : t}
          </button>
        ))}
      </div>

      {tab === "book" && (
        <div className="space-y-4">
          {/* Step 1: Category */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-xs font-bold text-muted-foreground">
                STEP 1 — CHOOSE CATEGORY
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CATEGORIES.map((cat, i) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Card
                      className={`border cursor-pointer hover:scale-105 transition-all ${selectedCategory === cat.id ? cat.bg : "border-border/50"}`}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        if (cat.id === "it") {
                          setStep(2);
                        } else {
                          toast.info(
                            `${cat.name} booking — selecting service...`
                          );
                          setStep(2);
                        }
                      }}
                    >
                      <CardContent className="pt-4 pb-4 text-center">
                        <p className="text-3xl mb-2">{cat.emoji}</p>
                        <p className="font-bold text-sm">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {cat.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Service Selection */}
          {step === 2 && selectedCategory === "it" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </Button>
                <p className="text-xs font-bold text-muted-foreground">
                  STEP 2 — SELECT IT SERVICE
                </p>
              </div>
              {IT_SERVICES.map(svc => (
                <Card
                  key={svc.name}
                  className={`border cursor-pointer transition-all ${selectedService === svc.name ? "border-blue-500/50 bg-blue-900/10" : "border-border/50 hover:border-blue-500/20"}`}
                  onClick={() => {
                    setSelectedService(svc.name);
                    setStep(3);
                  }}
                >
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{svc.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{svc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {svc.duration} · {svc.price}
                        </p>
                        <div className="flex gap-1 mt-1">
                          {svc.available.map(d => (
                            <Badge
                              key={d}
                              className="text-xs bg-muted text-muted-foreground"
                            >
                              {d}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setStep(2)}
                >
                  ← Back
                </Button>
                <p className="text-xs font-bold text-muted-foreground">
                  STEP 3 — PICK DATE & TIME
                </p>
              </div>
              <Card className="border-border/50">
                <CardContent className="py-4 px-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Select Date
                    </p>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="h-9 text-xs"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Select Time
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 rounded-xl text-xs font-medium transition-all ${selectedTime === time ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="w-full h-9 bg-blue-600 text-white border-0 text-xs"
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep(4)}
                  >
                    Continue <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Payment & Confirm */}
          {step === 4 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setStep(3)}
                >
                  ← Back
                </Button>
                <p className="text-xs font-bold text-muted-foreground">
                  STEP 4 — CONFIRM & PAY
                </p>
              </div>
              <Card className="border-blue-500/20 bg-blue-900/10">
                <CardContent className="py-4 px-4 space-y-2">
                  <p className="font-black text-sm">Booking Summary</p>
                  {[
                    { label: "Service", value: selectedService },
                    { label: "Date", value: selectedDate },
                    { label: "Time", value: selectedTime },
                    {
                      label: "Location",
                      value: "Skyler Blue IT Resolutions, AR",
                    },
                    { label: "Contact", value: "479-406-7123" },
                  ].map(item => (
                    <div
                      key={item.label}
                      className="flex justify-between text-xs"
                    >
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  Payment Method
                </p>
                <div className="flex gap-2 flex-wrap">
                  {["SKY4444", "TRUMP", "BTC", "USDT", "Card"].map(m => (
                    <button
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${paymentMethod === m ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                className="w-full h-11 bg-blue-600 text-white border-0 font-bold"
                onClick={confirmBooking}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm Booking — Pay with {paymentMethod}
              </Button>
            </div>
          )}
        </div>
      )}

      {tab === "mybookings" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            YOUR BOOKINGS
          </p>
          {MY_BOOKINGS.map((booking, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{booking.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{booking.service}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.date} at {booking.time}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Ref: {booking.ref}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs ${booking.status === "confirmed" ? "bg-green-500/10 text-green-400 border-green-500/20" : booking.status === "completed" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}
                  >
                    {booking.status === "confirmed"
                      ? "✓ Confirmed"
                      : booking.status === "completed"
                        ? "✓ Completed"
                        : "⏳ Pending"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "itservices" && (
        <div className="space-y-3">
          <Card className="border-blue-500/20 bg-blue-900/10">
            <CardContent className="py-4 px-4">
              <p className="font-black text-sm mb-1">
                Skyler Blue Spiller's Innovative IT Resolutions
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                Professional managed IT services for businesses and individuals
                in Arkansas and nationwide.
              </p>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  479-406-7123
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  skylerblue4444@gmail.com
                </span>
              </div>
            </CardContent>
          </Card>
          {IT_SERVICES.map(svc => (
            <Card key={svc.name} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{svc.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{svc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {svc.duration} · {svc.price}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="h-8 text-xs bg-blue-600 text-white border-0"
                    onClick={() => {
                      setSelectedService(svc.name);
                      setSelectedCategory("it");
                      setStep(3);
                      setTab("book");
                    }}
                  >
                    Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
