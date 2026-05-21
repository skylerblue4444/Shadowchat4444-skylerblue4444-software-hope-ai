import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Play,
  CheckCircle,
  Star,
  Clock,
  Trophy,
  Coins,
  ChevronRight,
  Lock,
  Zap,
  Users,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const COURSES = [
  {
    id: 1,
    title: "Crypto Trading Masterclass",
    emoji: "📈",
    instructor: "ShadowTrader",
    duration: "8 hrs",
    lessons: 24,
    level: "Beginner",
    reward: "444 SKY4444",
    enrolled: 12400,
    rating: 4.9,
    progress: 65,
    category: "Trading",
    free: true,
  },
  {
    id: 2,
    title: "SKY4444 ICO Deep Dive",
    emoji: "⚡",
    instructor: "SkylerBlue",
    duration: "3 hrs",
    lessons: 10,
    level: "Intermediate",
    reward: "1000 SKY4444",
    enrolled: 8800,
    rating: 4.8,
    progress: 0,
    category: "ICO",
    free: true,
  },
  {
    id: 3,
    title: "DeFi & Yield Farming",
    emoji: "🌾",
    instructor: "DeFiGuru",
    duration: "6 hrs",
    lessons: 18,
    level: "Intermediate",
    reward: "500 SKY4444",
    enrolled: 9900,
    rating: 4.7,
    progress: 30,
    category: "DeFi",
    free: false,
  },
  {
    id: 4,
    title: "NFT Creation & Monetization",
    emoji: "🖼️",
    instructor: "ArtDAO",
    duration: "5 hrs",
    lessons: 15,
    level: "Beginner",
    reward: "300 SKY4444",
    enrolled: 7700,
    rating: 4.6,
    progress: 0,
    category: "NFT",
    free: false,
  },
  {
    id: 5,
    title: "Managed IT Fundamentals",
    emoji: "💻",
    instructor: "SkylerBlue IT",
    duration: "10 hrs",
    lessons: 30,
    level: "Beginner",
    reward: "800 SKY4444",
    enrolled: 4400,
    rating: 4.9,
    progress: 0,
    category: "IT",
    free: true,
  },
  {
    id: 6,
    title: "Cybersecurity Essentials",
    emoji: "🛡️",
    instructor: "SecureDAO",
    duration: "7 hrs",
    lessons: 21,
    level: "Intermediate",
    reward: "600 SKY4444",
    enrolled: 5500,
    rating: 4.8,
    progress: 0,
    category: "IT",
    free: false,
  },
  {
    id: 7,
    title: "DAO Governance & Voting",
    emoji: "🏛️",
    instructor: "GovDAO",
    duration: "4 hrs",
    lessons: 12,
    level: "Beginner",
    reward: "200 SKY4444",
    enrolled: 3300,
    rating: 4.5,
    progress: 100,
    category: "DAO",
    free: true,
  },
  {
    id: 8,
    title: "Web3 Development Bootcamp",
    emoji: "⚙️",
    instructor: "ShadowDev",
    duration: "20 hrs",
    lessons: 60,
    level: "Advanced",
    reward: "2000 SKY4444",
    enrolled: 2200,
    rating: 4.9,
    progress: 0,
    category: "Dev",
    free: false,
  },
];

const CERTS = [
  {
    name: "Certified Crypto Trader",
    emoji: "📜",
    earned: true,
    date: "May 1, 2026",
  },
  {
    name: "DAO Governance Expert",
    emoji: "🏛️",
    earned: true,
    date: "Apr 15, 2026",
  },
  { name: "DeFi Specialist", emoji: "🌾", earned: false, progress: 30 },
  { name: "IT Professional", emoji: "💻", earned: false, progress: 0 },
];

const CATEGORIES = ["All", "Trading", "ICO", "DeFi", "NFT", "IT", "DAO", "Dev"];

export default function ShadowAcademy() {
  const [tab, setTab] = useState<"courses" | "mycourses" | "certs" | "live">(
    "courses"
  );
  const [filter, setFilter] = useState("All");
  const [enrolled, setEnrolled] = useState<number[]>([1, 3, 7]);

  const filtered = COURSES.filter(
    c => filter === "All" || c.category === filter
  );
  const inProgress = COURSES.filter(
    c => enrolled.includes(c.id) && c.progress > 0 && c.progress < 100
  );
  const completed = COURSES.filter(c => c.progress === 100);

  const enroll = (course: (typeof COURSES)[0]) => {
    if (!enrolled.includes(course.id)) {
      setEnrolled(e => [...e, course.id]);
      toast.success(
        `✅ Enrolled in "${course.title}"! Earn ${course.reward} on completion.`
      );
    } else {
      toast.info(`Continuing "${course.title}"...`);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-amber-400" />
            ShadowAcademy
          </h1>
          <p className="text-sm text-muted-foreground">
            Learn crypto, IT, and Web3 — earn SKY4444 for every course
          </p>
        </div>
        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 font-bold">
          🎓 {completed.length} Completed
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Courses", value: COURSES.length, emoji: "📚" },
          { label: "Enrolled", value: enrolled.length, emoji: "✅" },
          { label: "Earned", value: "644 SKY", emoji: "⚡" },
          { label: "Certs", value: "2", emoji: "🏆" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="pt-2.5 pb-2.5">
              <p className="text-lg mb-0.5">{s.emoji}</p>
              <p className="font-black text-xs text-amber-400">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(["courses", "mycourses", "certs", "live"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-amber-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t === "mycourses" ? "My Courses" : t}
          </button>
        ))}
      </div>

      {tab === "courses" && (
        <div className="space-y-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter === cat ? "bg-amber-600 text-white" : "bg-muted text-muted-foreground"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/50 hover:border-amber-500/20 transition-all">
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl shrink-0">
                      {course.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-sm truncate">
                          {course.title}
                        </p>
                        {course.free && (
                          <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20 shrink-0">
                            Free
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {course.instructor} · {course.duration} ·{" "}
                        {course.lessons} lessons · {course.level}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400" />
                          {course.rating}
                        </span>
                        <span className="text-muted-foreground">
                          {course.enrolled.toLocaleString()} students
                        </span>
                        <span className="text-amber-400 font-bold">
                          +{course.reward}
                        </span>
                      </div>
                      {enrolled.includes(course.id) && course.progress > 0 && (
                        <div className="mt-1.5">
                          <Progress value={course.progress} className="h-1.5" />
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {course.progress}% complete
                          </p>
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className={`h-8 text-xs shrink-0 ${course.progress === 100 ? "bg-green-600 text-white border-0" : enrolled.includes(course.id) ? "bg-amber-600 text-white border-0" : "bg-muted text-muted-foreground"}`}
                      onClick={() => enroll(course)}
                    >
                      {course.progress === 100
                        ? "✓ Done"
                        : enrolled.includes(course.id)
                          ? "Continue"
                          : "Enroll"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "mycourses" && (
        <div className="space-y-3">
          {inProgress.length > 0 && (
            <>
              <p className="text-xs font-bold text-muted-foreground">
                IN PROGRESS
              </p>
              {inProgress.map(course => (
                <Card
                  key={course.id}
                  className="border-amber-500/20 bg-amber-900/5"
                >
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{course.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{course.title}</p>
                        <Progress
                          value={course.progress}
                          className="h-1.5 mt-1 mb-0.5"
                        />
                        <p className="text-xs text-muted-foreground">
                          {course.progress}% ·{" "}
                          {Math.round(
                            course.lessons * (1 - course.progress / 100)
                          )}{" "}
                          lessons left
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="h-8 text-xs bg-amber-600 text-white border-0"
                        onClick={() =>
                          toast.info(`Continuing ${course.title}...`)
                        }
                      >
                        Resume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
          {completed.length > 0 && (
            <>
              <p className="text-xs font-bold text-muted-foreground">
                COMPLETED
              </p>
              {completed.map(course => (
                <Card
                  key={course.id}
                  className="border-green-500/20 bg-green-900/5"
                >
                  <CardContent className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{course.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{course.title}</p>
                        <p className="text-xs text-green-400 font-bold">
                          +{course.reward} earned ✅
                        </p>
                      </div>
                      <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                        Completed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>
      )}

      {tab === "certs" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            YOUR CERTIFICATIONS
          </p>
          {CERTS.map((cert, i) => (
            <Card
              key={cert.name}
              className={`border ${cert.earned ? "border-amber-500/20 bg-amber-900/5" : "border-border/50"}`}
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cert.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{cert.name}</p>
                    {cert.earned ? (
                      <p className="text-xs text-amber-400">
                        Earned {cert.date}
                      </p>
                    ) : (
                      <div>
                        <Progress
                          value={cert.progress}
                          className="h-1.5 mt-1 mb-0.5"
                        />
                        <p className="text-xs text-muted-foreground">
                          {cert.progress}% complete
                        </p>
                      </div>
                    )}
                  </div>
                  {cert.earned ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => toast.info("Downloading certificate...")}
                    >
                      Download
                    </Button>
                  ) : (
                    <Badge className="text-xs bg-muted text-muted-foreground">
                      <Lock className="h-3 w-3 mr-1" />
                      Locked
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "live" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            LIVE CLASSES TODAY
          </p>
          {[
            {
              title: "SKY4444 Trading Live Session",
              instructor: "SkylerBlue",
              time: "2:00 PM CDT",
              viewers: 444,
              emoji: "⚡",
            },
            {
              title: "DeFi Yield Strategies Q&A",
              instructor: "DeFiGuru",
              time: "4:00 PM CDT",
              viewers: 234,
              emoji: "🌾",
            },
            {
              title: "IT Security Workshop",
              instructor: "SkylerBlue IT",
              time: "6:00 PM CDT",
              viewers: 156,
              emoji: "🛡️",
            },
          ].map(cls => (
            <Card key={cls.title} className="border-red-500/20 bg-red-900/5">
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cls.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-sm">{cls.title}</p>
                      <Badge className="text-xs bg-red-500/10 text-red-400 border-red-500/20 animate-pulse">
                        🔴 LIVE
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {cls.instructor} · {cls.time} · {cls.viewers} watching
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="h-8 text-xs bg-red-600 text-white border-0"
                    onClick={() => toast.info(`Joining ${cls.title}...`)}
                  >
                    Join
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
