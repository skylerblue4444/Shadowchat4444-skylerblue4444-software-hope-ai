import { useState } from "react";
import { Lock, Unlock, Clock, Plus, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const LOCKS = [
  {
    token: "SKY4444",
    amount: "50,000,000",
    value: "$4.2M",
    unlockDate: "2026-12-31",
    daysLeft: 230,
    type: "Team",
    status: "locked",
  },
  {
    token: "SKY4444",
    amount: "20,000,000",
    value: "$1.68M",
    unlockDate: "2026-06-30",
    daysLeft: 46,
    type: "Advisor",
    status: "locked",
  },
  {
    token: "TRUMP",
    amount: "5,000,000",
    value: "$500K",
    unlockDate: "2026-05-20",
    daysLeft: 5,
    type: "Partner",
    status: "unlocking",
  },
  {
    token: "SKY4444",
    amount: "10,000,000",
    value: "$840K",
    unlockDate: "2026-04-15",
    daysLeft: 0,
    type: "Investor",
    status: "unlocked",
  },
];

export default function ShadowTokenLocker() {
  const [tab, setTab] = useState("locks");
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Lock className="h-6 w-6 text-indigo-400" />
          Token Locker
        </h1>
        <p className="text-sm text-muted-foreground">
          Lock tokens for vesting, team allocations, and investor trust
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total Locked", value: "$6.37M", color: "text-indigo-400" },
          { label: "Active Locks", value: "3", color: "text-green-400" },
          { label: "Unlocking Soon", value: "1", color: "text-yellow-400" },
          { label: "Unlocked", value: "$840K", color: "text-muted-foreground" },
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
        {["locks", "create"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " +
              (tab === t
                ? "bg-indigo-600 text-white"
                : "bg-muted text-muted-foreground")
            }
          >
            {t === "locks" ? "🔒 Active Locks" : "➕ Create Lock"}
          </button>
        ))}
      </div>
      {tab === "locks" && (
        <div className="space-y-3">
          {LOCKS.map((lock, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={
                    "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 " +
                    (lock.status === "locked"
                      ? "bg-indigo-500/10"
                      : lock.status === "unlocking"
                        ? "bg-yellow-500/10"
                        : "bg-green-500/10")
                  }
                >
                  {lock.status === "unlocked" ? (
                    <Unlock className="h-4 w-4 text-green-400" />
                  ) : (
                    <Lock
                      className={
                        "h-4 w-4 " +
                        (lock.status === "unlocking"
                          ? "text-yellow-400"
                          : "text-indigo-400")
                      }
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">
                      {lock.amount} {lock.token}
                    </p>
                    <Badge
                      className={
                        "text-xs border-0 " +
                        (lock.status === "locked"
                          ? "bg-indigo-500/10 text-indigo-400"
                          : lock.status === "unlocking"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-green-500/10 text-green-400")
                      }
                    >
                      {lock.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {lock.type} · Unlocks {lock.unlockDate}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-sm text-indigo-400">
                    {lock.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {lock.daysLeft > 0 ? lock.daysLeft + "d left" : "Ready"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {tab === "create" && (
        <Card className="border-border/50">
          <CardContent className="py-4 px-4 space-y-3">
            <p className="font-bold text-sm">Create New Token Lock</p>
            {[
              ["Token", "SKY4444"],
              ["Amount", "1,000,000"],
              ["Unlock Date", "2027-01-01"],
              ["Label", "Team Allocation"],
            ].map(([label, placeholder]) => (
              <div key={label}>
                <p className="text-xs text-muted-foreground mb-1">{label}</p>
                <input
                  placeholder={placeholder}
                  className="w-full h-9 px-3 rounded-xl bg-muted text-sm border border-border/50 focus:outline-none focus:border-indigo-500/50"
                />
              </div>
            ))}
            <Button
              className="w-full h-9 bg-indigo-600 text-white border-0 font-bold text-sm"
              onClick={() => toast.success("Token lock created on-chain!")}
            >
              <Shield className="h-4 w-4 mr-2" />
              Create Lock
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
