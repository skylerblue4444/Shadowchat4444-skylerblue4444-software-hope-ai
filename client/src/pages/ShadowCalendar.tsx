import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  Coins,
  Users,
  Zap,
  Shield,
  Bell,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const MONTHS = [
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
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EVENTS = [
  {
    id: 1,
    date: 15,
    title: "SKY4444 ICO Phase 2",
    type: "crypto",
    time: "12:00 UTC",
    color: "#6366f1",
    icon: "🌌",
  },
  {
    id: 2,
    date: 15,
    title: "IT Client Meeting — TechCorp",
    type: "it",
    time: "2:00 PM CST",
    color: "#06b6d4",
    icon: "💻",
  },
  {
    id: 3,
    date: 17,
    title: "DAO Governance Vote #44",
    type: "dao",
    time: "All Day",
    color: "#8b5cf6",
    icon: "🗳️",
  },
  {
    id: 4,
    date: 20,
    title: "Staking Rewards Distribution",
    type: "crypto",
    time: "00:00 UTC",
    color: "#22c55e",
    icon: "🔒",
  },
  {
    id: 5,
    date: 22,
    title: "ShadowChat Community AMA",
    type: "social",
    time: "6:00 PM CST",
    color: "#f59e0b",
    icon: "🎙️",
  },
  {
    id: 6,
    date: 25,
    title: "NFT Drop — ShadowPunks S2",
    type: "nft",
    time: "3:00 PM UTC",
    color: "#ec4899",
    icon: "🎨",
  },
  {
    id: 7,
    date: 28,
    title: "Monthly Token Burn",
    type: "crypto",
    time: "12:00 UTC",
    color: "#ef4444",
    icon: "🔥",
  },
  {
    id: 8,
    date: 30,
    title: "IT Maintenance Window",
    type: "it",
    time: "11 PM - 2 AM",
    color: "#06b6d4",
    icon: "🔧",
  },
];

const TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  crypto: {
    label: "Crypto",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  it: { label: "IT", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  dao: {
    label: "DAO",
    color: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  },
  social: {
    label: "Social",
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
  nft: {
    label: "NFT",
    color: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  },
};

export default function ShadowCalendar() {
  const [currentMonth, setCurrentMonth] = useState(4); // May (0-indexed)
  const [currentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number | null>(15);
  const [tab, setTab] = useState<"month" | "upcoming" | "reminders">("month");

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const eventsOnDay = (day: number) => EVENTS.filter(e => e.date === day);
  const selectedEvents = selectedDay ? eventsOnDay(selectedDay) : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-400" />
            Calendar
          </h1>
          <p className="text-sm text-muted-foreground">
            Crypto events, IT appointments, DAO votes, and earnings
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 text-xs bg-blue-600 text-white border-0 font-bold"
          onClick={() => toast.success("Opening event creator...")}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Event
        </Button>
      </div>

      <div className="flex gap-2">
        {(["month", "upcoming", "reminders"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "month" && (
        <div className="space-y-3">
          {/* Month Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentMonth(m => (m - 1 + 12) % 12)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <p className="font-black text-base">
              {MONTHS[currentMonth]} {currentYear}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentMonth(m => (m + 1) % 12)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-0.5">
            {DAYS.map(d => (
              <div
                key={d}
                className="text-center text-xs font-bold text-muted-foreground py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = eventsOnDay(day);
              const isToday = day === 15 && currentMonth === 4;
              const isSelected = day === selectedDay;
              return (
                <button
                  key={day}
                  onClick={() =>
                    setSelectedDay(day === selectedDay ? null : day)
                  }
                  className={`relative p-1 rounded-lg text-center transition-all min-h-[44px] ${isSelected ? "bg-blue-600 text-white" : isToday ? "bg-blue-500/20 text-blue-400" : "hover:bg-muted"}`}
                >
                  <p className="text-xs font-bold">{day}</p>
                  <div className="flex justify-center gap-0.5 mt-0.5 flex-wrap">
                    {dayEvents.slice(0, 3).map(e => (
                      <div
                        key={e.id}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: e.color }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Day Events */}
          {selectedDay && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-xs font-bold text-muted-foreground">
                EVENTS ON MAY {selectedDay}
              </p>
              {selectedEvents.length === 0 ? (
                <Card className="border-border/50">
                  <CardContent className="py-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      No events — click Add Event to schedule something
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-1.5 mt-1">
                  {selectedEvents.map(event => (
                    <Card key={event.id} className="border-border/50">
                      <CardContent className="py-2.5 px-4 flex items-center gap-3">
                        <span className="text-xl shrink-0">{event.icon}</span>
                        <div className="flex-1">
                          <p className="font-bold text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </p>
                        </div>
                        <Badge
                          className={`text-xs ${TYPE_CONFIG[event.type]?.color || ""}`}
                        >
                          {TYPE_CONFIG[event.type]?.label}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}

      {tab === "upcoming" && (
        <div className="space-y-2">
          {EVENTS.sort((a, b) => a.date - b.date).map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="border-border/50 hover:border-blue-500/20 transition-all">
                <CardContent className="py-2.5 px-4 flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-xl"
                    style={{ backgroundColor: event.color + "20" }}
                  >
                    {event.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      May {event.date} · {event.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={`text-xs ${TYPE_CONFIG[event.type]?.color || ""}`}
                    >
                      {TYPE_CONFIG[event.type]?.label}
                    </Badge>
                    <Button
                      size="sm"
                      className="h-6 text-xs px-2 mt-1 font-bold w-full"
                      variant="outline"
                      onClick={() =>
                        toast.success(`Reminder set for ${event.title}!`)
                      }
                    >
                      <Bell className="h-3 w-3 mr-0.5" />
                      Remind
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "reminders" && (
        <div className="space-y-2">
          {[
            {
              title: "Check SKY4444 price",
              freq: "Daily",
              time: "9:00 AM",
              icon: "🌌",
            },
            {
              title: "Review IT client tickets",
              freq: "Daily",
              time: "8:00 AM",
              icon: "💻",
            },
            {
              title: "Claim staking rewards",
              freq: "Weekly",
              time: "Monday 9 AM",
              icon: "🔒",
            },
            {
              title: "DAO governance check",
              freq: "Weekly",
              time: "Sunday 6 PM",
              icon: "🗳️",
            },
            {
              title: "Monthly portfolio review",
              freq: "Monthly",
              time: "1st of month",
              icon: "📊",
            },
          ].map((r, i) => (
            <Card key={r.title} className="border-border/50">
              <CardContent className="py-2.5 px-4 flex items-center gap-3">
                <span className="text-xl shrink-0">{r.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm">{r.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.freq} · {r.time}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs font-bold"
                  onClick={() => toast.success(`Reminder updated!`)}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))}
          <Button
            className="w-full h-10 text-xs bg-blue-600 text-white border-0 font-bold"
            onClick={() => toast.success("Opening reminder creator...")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Reminder
          </Button>
        </div>
      )}
    </div>
  );
}
