import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Star,
  Clock,
  Users,
  Award,
  Zap,
  Play,
  CheckCircle,
  Lock,
  ChevronRight,
  Search,
  TrendingUp,
  Globe,
  Code,
  Shield,
  Coins,
  Brain,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CATEGORIES = [
  "All",
  "Crypto Basics",
  "DeFi",
  "NFT & Web3",
  "Trading",
  "IT & Security",
  "AI & Blockchain",
  "SKY4444",
];

const COURSES = [
  {
    id: "c1",
    title: "SKY4444 Ecosystem Masterclass",
    category: "SKY4444",
    instructor: "Skyler Blue",
    instructorEmoji: "⚡",
    lessons: 24,
    duration: "8h 44m",
    students: 4284,
    rating: 4.9,
    reviews: 844,
    level: "Beginner",
    emoji: "⚡",
    reward: "444 SKY4444",
    progress: 65,
    enrolled: true,
    free: true,
    topics: [
      "SKY4444 tokenomics",
      "ShadowChat features",
      "Staking & rewards",
      "ICO participation",
    ],
  },
  {
    id: "c2",
    title: "DeFi from Zero to Hero — Complete Guide",
    category: "DeFi",
    instructor: "DeFi Master",
    instructorEmoji: "🌾",
    lessons: 44,
    duration: "18h 28m",
    students: 28400,
    rating: 4.8,
    reviews: 4284,
    level: "Intermediate",
    emoji: "🌾",
    reward: "100 SKY4444",
    progress: 0,
    enrolled: false,
    free: false,
    topics: [
      "Liquidity pools",
      "Yield farming",
      "Flash loans",
      "Protocol security",
    ],
  },
  {
    id: "c3",
    title: "Bitcoin & Blockchain Fundamentals",
    category: "Crypto Basics",
    instructor: "CryptoKing",
    instructorEmoji: "👑",
    lessons: 18,
    duration: "6h 12m",
    students: 128400,
    rating: 4.9,
    reviews: 28400,
    level: "Beginner",
    emoji: "₿",
    reward: "50 SKY4444",
    progress: 100,
    enrolled: true,
    free: true,
    topics: [
      "What is Bitcoin",
      "Blockchain technology",
      "Wallets & keys",
      "Buying crypto safely",
    ],
  },
  {
    id: "c4",
    title: "NFT Creation & Monetization",
    category: "NFT & Web3",
    instructor: "CryptoArtist",
    instructorEmoji: "🎨",
    lessons: 28,
    duration: "10h 44m",
    students: 8400,
    rating: 4.7,
    reviews: 1284,
    level: "Intermediate",
    emoji: "🎨",
    reward: "200 SKY4444",
    progress: 30,
    enrolled: true,
    free: false,
    topics: [
      "Creating NFTs",
      "Smart contracts",
      "Royalties",
      "Marketing your collection",
    ],
  },
  {
    id: "c5",
    title: "Cybersecurity for Crypto Users",
    category: "IT & Security",
    instructor: "SkylerBlueIT",
    instructorEmoji: "🛡️",
    lessons: 20,
    duration: "7h 28m",
    students: 12800,
    rating: 5.0,
    reviews: 844,
    level: "All Levels",
    emoji: "🔒",
    reward: "150 SKY4444",
    progress: 0,
    enrolled: false,
    free: false,
    topics: [
      "Hardware wallets",
      "Phishing prevention",
      "2FA & MFA",
      "Cold storage best practices",
    ],
  },
  {
    id: "c6",
    title: "AI-Powered Trading Strategies",
    category: "Trading",
    instructor: "AITrader",
    instructorEmoji: "🤖",
    lessons: 36,
    duration: "14h 28m",
    students: 18400,
    rating: 4.8,
    reviews: 2840,
    level: "Advanced",
    emoji: "🤖",
    reward: "300 SKY4444",
    progress: 0,
    enrolled: false,
    free: false,
    topics: [
      "Technical analysis",
      "AI bots",
      "Risk management",
      "Backtesting strategies",
    ],
  },
];

const CERTIFICATIONS = [
  {
    name: "SKY4444 Certified Holder",
    emoji: "⚡",
    earned: true,
    color: "text-yellow-400",
  },
  { name: "DeFi Expert", emoji: "🌾", earned: false, color: "text-green-400" },
  {
    name: "NFT Creator Pro",
    emoji: "🎨",
    earned: false,
    color: "text-purple-400",
  },
  {
    name: "Crypto Security Specialist",
    emoji: "🔒",
    earned: true,
    color: "text-blue-400",
  },
];

const LEVEL_CONFIG: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-400 border-green-500/20",
  Intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Advanced: "bg-red-500/10 text-red-400 border-red-500/20",
  "All Levels": "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function ShadowLearn() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "enrolled" | "completed">("all");

  const displayCourses = COURSES.filter(
    c =>
      (activeCategory === "All" || c.category === activeCategory) &&
      c.title.toLowerCase().includes(search.toLowerCase()) &&
      (tab === "all" ||
        (tab === "enrolled" && c.enrolled && c.progress < 100) ||
        (tab === "completed" && c.progress === 100))
  );

  const totalEarned = COURSES.filter(c => c.progress === 100).reduce(
    (s, c) => s + parseInt(c.reward),
    0
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-purple-400" />
            ShadowLearn
          </h1>
          <p className="text-sm text-muted-foreground">
            Learn crypto & earn SKY4444 rewards
          </p>
        </div>
        <div className="text-right">
          <p className="font-black text-lg text-yellow-400">
            {totalEarned} SKY4444
          </p>
          <p className="text-xs text-muted-foreground">earned from courses</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            label: "Courses Enrolled",
            value: COURSES.filter(c => c.enrolled).length,
            icon: BookOpen,
            color: "text-purple-400",
          },
          {
            label: "Completed",
            value: COURSES.filter(c => c.progress === 100).length,
            icon: CheckCircle,
            color: "text-green-400",
          },
          {
            label: "Certifications",
            value: CERTIFICATIONS.filter(c => c.earned).length,
            icon: Award,
            color: "text-yellow-400",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border/50">
            <CardContent className="pt-3 pb-3 text-center">
              <Icon className={`h-5 w-5 ${color} mx-auto mb-1`} />
              <p className={`font-black text-xl ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certifications */}
      <div>
        <p className="text-xs font-bold text-muted-foreground mb-2">
          YOUR CERTIFICATIONS
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CERTIFICATIONS.map(cert => (
            <div
              key={cert.name}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border shrink-0 ${cert.earned ? "bg-muted/20 border-border/50" : "bg-muted/5 border-dashed border-border/30 opacity-50"}`}
            >
              <span className="text-xl">{cert.emoji}</span>
              <div>
                <p
                  className={`text-xs font-bold ${cert.earned ? cert.color : "text-muted-foreground"}`}
                >
                  {cert.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {cert.earned ? "✓ Earned" : "Locked"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          className="pl-10 h-10"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["all", "enrolled", "completed"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${activeCategory === cat ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses */}
      <div className="space-y-4">
        {displayCourses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="border-border/50 hover:border-purple-500/20 transition-all">
              <CardContent className="pt-4 pb-4">
                <div className="flex gap-3">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center text-4xl shrink-0">
                    {course.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-black text-sm leading-tight">
                        {course.title}
                      </h3>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        {course.free && (
                          <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                            FREE
                          </Badge>
                        )}
                        <Badge
                          className={`text-xs ${LEVEL_CONFIG[course.level]}`}
                        >
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-sm">{course.instructorEmoji}</span>
                      <p className="text-xs text-muted-foreground">
                        {course.instructor}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-0.5">
                        <Play className="h-3 w-3" />
                        {course.lessons} lessons
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="h-3 w-3" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Users className="h-3 w-3" />
                        {course.students.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 text-yellow-400" />
                        {course.rating}
                      </span>
                      <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                        🎁 {course.reward}
                      </Badge>
                    </div>
                  </div>
                </div>

                {course.enrolled && course.progress > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span
                        className={`font-bold ${course.progress === 100 ? "text-green-400" : "text-purple-400"}`}
                      >
                        {course.progress}%
                      </span>
                    </div>
                    <Progress value={course.progress} className="h-1.5" />
                  </div>
                )}

                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-1 flex-wrap">
                    {course.topics.slice(0, 2).map(topic => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {course.topics.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.topics.length - 2} more
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className={`h-8 text-xs shrink-0 ${course.progress === 100 ? "bg-green-600 text-white border-0" : course.enrolled ? "bg-purple-600 text-white border-0" : "bg-muted text-white"}`}
                    onClick={() =>
                      course.progress === 100
                        ? toast.success("Certificate claimed! ⚡")
                        : course.enrolled
                          ? toast.info(`Continuing ${course.title}...`)
                          : toast.success(`Enrolled in ${course.title}! 🎓`)
                    }
                  >
                    {course.progress === 100 ? (
                      <>
                        <Award className="h-3.5 w-3.5 mr-1.5" />
                        Get Certificate
                      </>
                    ) : course.enrolled ? (
                      <>
                        <Play className="h-3.5 w-3.5 mr-1.5" />
                        Continue
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                        Enroll
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
