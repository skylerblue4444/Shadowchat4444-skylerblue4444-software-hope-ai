import { useState } from "react";
import { Headphones, MessageSquare, Clock, CheckCircle, AlertCircle, Plus, Star, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TICKETS = [
  { id: "TK-1247", subject: "Email not syncing on Outlook",      priority: "high",   status: "open",       client: "ABC Corp",    agent: "Skyler",   created: "30m ago" },
  { id: "TK-1246", subject: "VPN connection dropping randomly",  priority: "medium", status: "in-progress",client: "XYZ LLC",     agent: "Sarah",    created: "2h ago"  },
  { id: "TK-1245", subject: "New laptop setup needed",           priority: "low",    status: "in-progress",client: "Smith & Co",  agent: "James",    created: "4h ago"  },
  { id: "TK-1244", subject: "Server unresponsive — critical",    priority: "critical",status: "resolved",  client: "MegaCorp",    agent: "Skyler",   created: "6h ago"  },
  { id: "TK-1243", subject: "Password reset for 5 users",        priority: "low",    status: "resolved",   client: "LocalBiz",    agent: "Sarah",    created: "1d ago"  },
];

const PRIORITY_COLORS: Record<string, string> = {
  critical: "bg-red-500/10 text-red-400",
  high:     "bg-orange-500/10 text-orange-400",
  medium:   "bg-yellow-500/10 text-yellow-400",
  low:      "bg-blue-500/10 text-blue-400",
};
const STATUS_COLORS: Record<string, string> = {
  open:         "bg-blue-500/10 text-blue-400",
  "in-progress":"bg-yellow-500/10 text-yellow-400",
  resolved:     "bg-green-500/10 text-green-400",
};

export default function ShadowITHelpDesk() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? TICKETS : TICKETS.filter(t => t.status === filter || t.priority === filter);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2"><Headphones className="h-6 w-6 text-sky-400" />IT Help Desk</h1>
        <p className="text-sm text-muted-foreground">Skyler Blue IT Resolutions — client support ticket management</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Open Tickets",    value: "12",    color: "text-blue-400"   },
          { label: "In Progress",     value: "8",     color: "text-yellow-400" },
          { label: "Resolved Today",  value: "24",    color: "text-green-400"  },
          { label: "Avg Response",    value: "14min", color: "text-sky-400"    },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {["all","open","in-progress","resolved","critical","high"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={"px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize " + (filter === f ? "bg-sky-600 text-white" : "bg-muted text-muted-foreground")}>
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((t, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="py-3 px-4 flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-xs text-muted-foreground font-mono">{t.id}</p>
                  <Badge className={"text-xs border-0 " + PRIORITY_COLORS[t.priority]}>{t.priority}</Badge>
                  <Badge className={"text-xs border-0 " + STATUS_COLORS[t.status]}>{t.status}</Badge>
                </div>
                <p className="font-bold text-sm">{t.subject}</p>
                <p className="text-xs text-muted-foreground">{t.client} · Agent: {t.agent} · {t.created}</p>
              </div>
              <Button size="sm" className="h-7 bg-sky-600 text-white border-0 font-bold text-xs shrink-0" onClick={() => toast.success("Opening ticket " + t.id)}>
                View
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="w-full h-10 bg-sky-600 text-white border-0 font-bold" onClick={() => toast.success("New ticket form opened — call 479-406-7123 for urgent issues")}>
        <Plus className="h-4 w-4 mr-2" />Create New Ticket
      </Button>
    </div>
  );
}
