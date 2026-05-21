import { useState } from "react";
import {
  Mail,
  Send,
  Inbox,
  Star,
  Trash2,
  Shield,
  Zap,
  Search,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const EMAILS = [
  {
    from: "client@arkansasmedical.com",
    subject: "IT Support Request — Server Down",
    time: "9:42am",
    read: false,
    starred: true,
    tag: "urgent",
  },
  {
    from: "vendor@cisco.com",
    subject: "Quote for Network Upgrade",
    time: "8:15am",
    read: false,
    starred: false,
    tag: "vendor",
  },
  {
    from: "billing@microsoft.com",
    subject: "Azure Invoice — May 2026",
    time: "Yesterday",
    read: true,
    starred: false,
    tag: "billing",
  },
  {
    from: "noreply@github.com",
    subject: "New commit to skycoin444_v10_live",
    time: "Yesterday",
    read: true,
    starred: true,
    tag: "dev",
  },
  {
    from: "info@fortsmithlaw.com",
    subject: "Monthly IT Report Review",
    time: "Mon",
    read: true,
    starred: false,
    tag: "client",
  },
];

const TAG_COLORS: Record<string, string> = {
  urgent: "bg-red-500/10 text-red-400",
  vendor: "bg-blue-500/10 text-blue-400",
  billing: "bg-yellow-500/10 text-yellow-400",
  dev: "bg-purple-500/10 text-purple-400",
  client: "bg-green-500/10 text-green-400",
};

export default function ShadowSkylerBlueEmail() {
  const [selected, setSelected] = useState<number | null>(0);
  const [composing, setComposing] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Mail className="h-6 w-6 text-sky-400" />
            Skyler Blue Email
          </h1>
          <p className="text-sm text-muted-foreground">
            skylerblue4444@gmail.com — Business email hub
          </p>
        </div>
        <Button
          className="h-9 bg-sky-600 text-white border-0 font-bold text-sm"
          onClick={() => {
            setComposing(true);
            toast.success("Compose window opened");
          }}
        >
          <Plus className="h-4 w-4 mr-1" />
          Compose
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Inbox", value: "24", color: "text-sky-400" },
          { label: "Unread", value: "2", color: "text-red-400" },
          { label: "Starred", value: "7", color: "text-yellow-400" },
          { label: "Sent", value: "156", color: "text-green-400" },
        ].map(s => (
          <Card key={s.label} className="border-border/50 text-center">
            <CardContent className="py-3 px-2">
              <p className={"font-black text-lg " + s.color}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-1">
        {EMAILS.map((e, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={
              "w-full text-left p-3 rounded-xl transition-colors " +
              (selected === i
                ? "bg-sky-500/10 border border-sky-500/30"
                : "bg-muted hover:bg-muted/80") +
              (e.read ? "" : " font-bold")
            }
          >
            <div className="flex items-center gap-2 mb-0.5">
              {!e.read && (
                <div className="h-2 w-2 rounded-full bg-sky-400 shrink-0" />
              )}
              {e.starred && (
                <Star className="h-3 w-3 text-yellow-400 shrink-0 fill-yellow-400" />
              )}
              <p
                className={
                  "text-sm flex-1 truncate " +
                  (e.read ? "text-muted-foreground" : "font-bold")
                }
              >
                {e.from}
              </p>
              <span className="text-xs text-muted-foreground shrink-0">
                {e.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs truncate flex-1">{e.subject}</p>
              <Badge
                className={"text-xs border-0 shrink-0 " + TAG_COLORS[e.tag]}
              >
                {e.tag}
              </Badge>
            </div>
          </button>
        ))}
      </div>
      {selected !== null && (
        <Card className="border-sky-500/30">
          <CardContent className="py-3 px-4">
            <p className="font-bold text-sm">{EMAILS[selected].subject}</p>
            <p className="text-xs text-muted-foreground mb-2">
              From: {EMAILS[selected].from}
            </p>
            <p className="text-xs text-muted-foreground">
              This is a preview of the email content. Full email body would
              render here with HTML support, attachments, and inline images.
            </p>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                className="h-7 bg-sky-600 text-white border-0 font-bold text-xs"
                onClick={() => toast.success("Reply composed")}
              >
                <Send className="h-3 w-3 mr-1" />
                Reply
              </Button>
              <Button
                size="sm"
                className="h-7 bg-muted font-bold text-xs"
                onClick={() => toast.success("Email forwarded")}
              >
                Forward
              </Button>
              <Button
                size="sm"
                className="h-7 bg-red-600/20 text-red-400 border-0 font-bold text-xs"
                onClick={() => toast.success("Email deleted")}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
