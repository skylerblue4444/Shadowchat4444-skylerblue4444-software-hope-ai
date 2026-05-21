/**
 * ShadowChat — CryptoDate Social Matchmaking
 * Crypto people · SKY4444 tipping · AI moderated · 18+ verified
 * Skyler Blue | 479-406-7123 | skycoin444
 */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PROFILES = [
  {
    name: "CryptoQueen",
    age: 26,
    loc: "Miami, FL",
    coins: ["BTC", "ETH", "SKY4444"],
    bio: "DeFi degen by day, NFT artist by night. Looking for someone who understands the blockchain.",
    match: 94,
    verified: true,
    online: true,
  },
  {
    name: "SatoshiGirl",
    age: 24,
    loc: "Austin, TX",
    coins: ["BTC", "DOGE", "XMR"],
    bio: "Bitcoin maximalist. Privacy matters. Monero is money.",
    match: 88,
    verified: true,
    online: true,
  },
  {
    name: "TrumpTraderGal",
    age: 29,
    loc: "Nashville, TN",
    coins: ["TRUMP", "SKY4444", "USDT"],
    bio: "Political crypto trader. TRUMP coin HODLer. Looking for fellow patriots.",
    match: 91,
    verified: true,
    online: false,
  },
  {
    name: "DeFiDiva",
    age: 27,
    loc: "New York, NY",
    coins: ["ETH", "AAVE", "SKY4444"],
    bio: "Yield farmer. Liquidity provider. Looking for someone who knows what APY means.",
    match: 85,
    verified: true,
    online: true,
  },
];

const TIP_AMOUNTS = [10, 44, 100, 444];

export default function ShadowCryptoDate() {
  const [current, setCurrent] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);
  const [tipped, setTipped] = useState<Record<string, number>>({});
  const [tab, setTab] = useState<"discover" | "matches" | "messages">(
    "discover"
  );

  const profile = PROFILES[current % PROFILES.length];

  const swipe = (like: boolean) => {
    if (like) setMatches(m => [...m, profile.name]);
    setCurrent(c => c + 1);
  };

  const tip = (name: string, amt: number) => {
    setTipped(t => ({ ...t, [name]: (t[name] || 0) + amt }));
  };

  return (
    <div className="space-y-4 pb-6">
      <div className="border-b border-border/40 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">💕 CryptoDate</h1>
            <p className="text-xs text-muted-foreground">
              Social matchmaking for crypto people · SKY4444 tipping · AI
              moderated
            </p>
          </div>
          <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 text-xs">
            18+ Verified
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
        {(["discover", "matches", "messages"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 text-xs font-bold py-1.5 rounded-md capitalize transition-colors ${tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            {t}
            {t === "matches" && matches.length > 0 && (
              <span className="ml-1 bg-pink-500 text-white rounded-full px-1 text-xs">
                {matches.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Discover */}
      {tab === "discover" && (
        <div className="space-y-3">
          <Card className="border-pink-500/30 bg-gradient-to-br from-pink-500/5 to-purple-500/5">
            <CardContent className="py-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-lg">{profile.name}</p>
                    {profile.verified && (
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                        ✓ Verified
                      </Badge>
                    )}
                    {profile.online && (
                      <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {profile.age} · {profile.loc}
                  </p>
                </div>
                <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 font-black">
                  {profile.match}% match
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{profile.bio}</p>
              <div className="flex gap-1.5 flex-wrap">
                {profile.coins.map(c => (
                  <Badge
                    key={c}
                    className="bg-yellow-500/15 text-yellow-400 border-yellow-500/25 text-xs"
                  >
                    {c}
                  </Badge>
                ))}
              </div>
              {/* Tip */}
              <div>
                <p className="text-xs font-bold mb-1.5">💰 Send SKY4444 Tip</p>
                <div className="flex gap-1.5">
                  {TIP_AMOUNTS.map(amt => (
                    <Button
                      key={amt}
                      size="sm"
                      onClick={() => tip(profile.name, amt)}
                      className="h-7 text-xs bg-yellow-500/15 hover:bg-yellow-500/25 text-yellow-400 border border-yellow-500/30"
                    >
                      {amt} SKY4444
                    </Button>
                  ))}
                </div>
                {tipped[profile.name] && (
                  <p className="text-xs text-yellow-400 mt-1">
                    ✓ Sent {tipped[profile.name]} SKY4444 total
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => swipe(false)}
                  variant="outline"
                  className="flex-1 h-10 text-xl border-red-500/30 hover:bg-red-500/10"
                >
                  ✕
                </Button>
                <Button
                  onClick={() => swipe(true)}
                  className="flex-1 h-10 text-xl bg-pink-500 hover:bg-pink-400 text-white border-0"
                >
                  ♥
                </Button>
              </div>
            </CardContent>
          </Card>
          <p className="text-center text-xs text-muted-foreground/60">
            AI moderated · Heavy content filtering · Safe platform
          </p>
        </div>
      )}

      {/* Matches */}
      {tab === "matches" && (
        <div className="space-y-2">
          {matches.length === 0 ? (
            <Card className="border-border/40">
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground text-sm">
                  No matches yet — keep swiping!
                </p>
              </CardContent>
            </Card>
          ) : (
            matches.map((name, i) => (
              <Card key={i} className="border-pink-500/30">
                <CardContent className="py-3 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center font-black text-pink-400">
                      {name[0]}
                    </div>
                    <div>
                      <p className="font-black text-sm">{name}</p>
                      <p className="text-xs text-green-400">✓ Matched!</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-pink-500 hover:bg-pink-400 text-white border-0"
                  >
                    Message
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Messages */}
      {tab === "messages" && (
        <Card className="border-border/40">
          <CardContent className="py-8 text-center">
            <p className="text-2xl mb-2">💬</p>
            <p className="font-black text-sm">Messages</p>
            <p className="text-xs text-muted-foreground mt-1">
              Match with someone to start messaging. SKY4444 tipping available
              in chat.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="border-yellow-500/30 bg-yellow-500/5">
        <CardContent className="py-3 text-center">
          <p className="font-black text-xs text-yellow-400">
            ✦ Skyler Blue · 479-406-7123 · CryptoDate
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Heavily moderated · Verified profiles · SKY4444 economy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
