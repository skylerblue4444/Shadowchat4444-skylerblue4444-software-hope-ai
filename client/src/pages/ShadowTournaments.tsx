import { useState } from "react";
import { Trophy, Users, Clock, Zap, Star, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TOURNAMENTS = [
  {
    name: "SKY4444 Trading Championship",
    prize: "$50,000",
    participants: 842,
    maxParticipants: 1000,
    endsIn: "2d 14h",
    status: "live",
    game: "Trading",
    entry: "500 SKY",
  },
  {
    name: "Shadow NFT Art Battle",
    prize: "$10,000",
    participants: 234,
    maxParticipants: 500,
    endsIn: "5d 8h",
    status: "live",
    game: "NFT",
    entry: "100 SKY",
  },
  {
    name: "Charity Poker Showdown",
    prize: "$5,000",
    participants: 128,
    maxParticipants: 256,
    endsIn: "1d 2h",
    status: "live",
    game: "Poker",
    entry: "Free",
  },
  {
    name: "DeFi Yield Farming Race",
    prize: "$25,000",
    participants: 0,
    maxParticipants: 200,
    endsIn: "Starts in 3d",
    status: "upcoming",
    game: "DeFi",
    entry: "1K SKY",
  },
  {
    name: "Meme Coin Creator Contest",
    prize: "$2,500",
    participants: 512,
    maxParticipants: 512,
    endsIn: "Ended",
    status: "ended",
    game: "Social",
    entry: "Free",
  },
];

const LEADERBOARD = [
  {
    rank: 1,
    name: "SkyWhale",
    score: "142.8%",
    prize: "$15,000",
    avatar: "🐋",
  },
  {
    rank: 2,
    name: "TrumpTrader",
    score: "128.4%",
    prize: "$8,000",
    avatar: "🦅",
  },
  {
    rank: 3,
    name: "CryptoKing42",
    score: "115.2%",
    prize: "$5,000",
    avatar: "👑",
  },
  {
    rank: 4,
    name: "ShadowNinja",
    score: "98.7%",
    prize: "$2,500",
    avatar: "🥷",
  },
  { rank: 5, name: "You", score: "84.2%", prize: "$1,000", avatar: "⭐" },
];

export default function ShadowTournaments() {
  const [tab, setTab] = useState("active");
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-400" />
          Tournaments
        </h1>
        <p className="text-sm text-muted-foreground">
          Compete in trading, NFT, and gaming tournaments for SKY4444 prizes
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Active", value: "3", color: "text-green-400" },
          { label: "Total Prizes", value: "$92.5K", color: "text-yellow-400" },
          { label: "Players", value: "1,716", color: "text-blue-400" },
          { label: "Your Rank", value: "#5", color: "text-purple-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2">
        {["active", "leaderboard"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " +
              (tab === t
                ? "bg-yellow-600 text-white"
                : "bg-muted text-muted-foreground")
            }
          >
            {t === "active" ? "🏆 Tournaments" : "📊 Leaderboard"}
          </button>
        ))}
      </div>
      {tab === "active" && (
        <div className="space-y-3">
          {TOURNAMENTS.map((t, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.game} · Entry: {t.entry}
                    </p>
                  </div>
                  <Badge
                    className={
                      "text-xs border-0 " +
                      (t.status === "live"
                        ? "bg-green-500/10 text-green-400"
                        : t.status === "upcoming"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-muted text-muted-foreground")
                    }
                  >
                    {t.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-yellow-400" />
                      {t.prize}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {t.participants}/{t.maxParticipants}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {t.endsIn}
                    </span>
                  </div>
                  {t.status !== "ended" && (
                    <Button
                      size="sm"
                      className={
                        "h-7 px-3 text-xs border-0 font-bold " +
                        (t.status === "live"
                          ? "bg-yellow-600 text-white"
                          : "bg-blue-600 text-white")
                      }
                      onClick={() => toast.success("Joined: " + t.name)}
                    >
                      {t.status === "live" ? "Join" : "Register"}
                    </Button>
                  )}
                </div>
                {t.status === "live" && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Participants</span>
                      <span>
                        {Math.round((t.participants / t.maxParticipants) * 100)}
                        %
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{
                          width:
                            (t.participants / t.maxParticipants) * 100 + "%",
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {tab === "leaderboard" && (
        <div className="space-y-2">
          {LEADERBOARD.map(p => (
            <Card
              key={p.rank}
              className={
                "border-border/50 " +
                (p.name === "You" ? "border-yellow-500/30" : "")
              }
            >
              <CardContent className="py-2.5 px-4 flex items-center gap-3">
                <div
                  className={
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 " +
                    (p.rank === 1
                      ? "bg-yellow-500/20 text-yellow-400"
                      : p.rank === 2
                        ? "bg-gray-400/20 text-gray-300"
                        : p.rank === 3
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-muted text-muted-foreground")
                  }
                >
                  {p.rank <= 3 ? ["🥇", "🥈", "🥉"][p.rank - 1] : p.rank}
                </div>
                <span className="text-lg">{p.avatar}</span>
                <div className="flex-1">
                  <p
                    className={
                      "font-bold text-sm " +
                      (p.name === "You" ? "text-yellow-400" : "")
                    }
                  >
                    {p.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Return: {p.score}
                  </p>
                </div>
                <p className="font-black text-sm text-green-400">{p.prize}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
