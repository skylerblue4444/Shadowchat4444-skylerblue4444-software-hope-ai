import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Plus,
  Search,
  Lock,
  Star,
  Trash2,
  Tag,
  Zap,
  Save,
  Edit3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const NOTES = [
  {
    id: 1,
    title: "SKY4444 Investment Thesis",
    content:
      "SKY4444 is positioned to be the premier utility token for the ShadowChat ecosystem. Key catalysts: ICO Phase 2 launch, DEX listing, staking rewards, and governance voting. Target price: $0.44 by EOY 2026. Key risks: regulatory uncertainty, market volatility. Strategy: DCA weekly, stake 70%, trade 30%.",
    tags: ["crypto", "investing"],
    starred: true,
    encrypted: true,
    date: "May 15",
  },
  {
    id: 2,
    title: "IT Client Meeting Notes — TechCorp",
    content:
      "Meeting with TechCorp CTO John Smith. Requirements: 24/7 helpdesk, network monitoring, cloud migration to AWS, cybersecurity audit. Budget: $4,444/mo. Timeline: 30 days onboarding. Action items: send contract by Friday, schedule site visit next week.",
    tags: ["it", "clients"],
    starred: false,
    encrypted: true,
    date: "May 14",
  },
  {
    id: 3,
    title: "ShadowChat Feature Ideas",
    content:
      "1. AI-powered trade signals with 85%+ accuracy. 2. Social trading — copy top performers. 3. NFT-gated exclusive communities. 4. Crypto payroll for businesses. 5. Decentralized identity verification. 6. Cross-chain atomic swaps. 7. AI dating with crypto incentives.",
    tags: ["product", "ideas"],
    starred: true,
    encrypted: false,
    date: "May 12",
  },
  {
    id: 4,
    title: "DAO Proposal #44 Draft",
    content:
      "Proposal: Allocate 1,000,000 SKY4444 from treasury for marketing campaign targeting Asian markets. Expected ROI: 10x user growth in 90 days. Budget breakdown: influencer partnerships (40%), paid ads (30%), community events (20%), content creation (10%).",
    tags: ["dao", "governance"],
    starred: false,
    encrypted: false,
    date: "May 10",
  },
  {
    id: 5,
    title: "Skyler Blue IT — Business Plan Q3",
    content:
      "Q3 Goals: 10 new managed IT clients, $100K MRR, hire 2 technicians. Marketing: LinkedIn ads, Google Ads, referral program. Services to push: cloud migration, cybersecurity, helpdesk. Key differentiator: crypto-native IT company with SKY4444 payment discounts.",
    tags: ["business", "it"],
    starred: true,
    encrypted: true,
    date: "May 8",
  },
];

export default function ShadowNotes() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(1);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = NOTES.filter(n => {
    if (filter === "starred") return n.starred;
    if (filter === "encrypted") return n.encrypted;
    if (search)
      return (
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase())
      );
    return true;
  });

  const selectedNote = NOTES.find(n => n.id === selected);

  const startEdit = () => {
    if (selectedNote) {
      setEditContent(selectedNote.content);
      setEditing(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <FileText className="h-6 w-6 text-green-400" />
            ShadowNotes
          </h1>
          <p className="text-sm text-muted-foreground">
            Encrypted notes with AI summarization and blockchain backup
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 text-xs bg-green-600 text-white border-0 font-bold"
          onClick={() => toast.success("Creating new note...")}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          New Note
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="pl-9 h-9 text-xs"
        />
      </div>

      <div className="flex gap-1.5">
        {["all", "starred", "encrypted"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${filter === f ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {/* Notes List */}
        <div className="space-y-1.5">
          {filtered.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className={`border cursor-pointer transition-all ${selected === note.id ? "border-green-500/40 bg-green-900/5" : "border-border/50 hover:border-green-500/20"}`}
                onClick={() => {
                  setSelected(note.id);
                  setEditing(false);
                }}
              >
                <CardContent className="py-2.5 px-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{note.title}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {note.content.slice(0, 60)}...
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                        {note.tags.map(tag => (
                          <Badge
                            key={tag}
                            className="text-xs bg-muted text-muted-foreground px-1.5 py-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                        <span className="text-xs text-muted-foreground">
                          {note.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {note.starred && (
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                      )}
                      {note.encrypted && (
                        <Lock className="h-3.5 w-3.5 text-green-400" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Note Detail */}
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-green-500/20 bg-green-900/5">
              <CardContent className="py-4 px-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-black text-base">{selectedNote.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedNote.date}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 w-7 p-0"
                      onClick={startEdit}
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 w-7 p-0"
                      onClick={() => toast.success("AI summarizing note...")}
                    >
                      <Zap className="h-3.5 w-3.5 text-yellow-400" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 w-7 p-0 text-red-400"
                      onClick={() => toast.success("Note deleted")}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {selectedNote.tags.map(tag => (
                    <Badge
                      key={tag}
                      className="text-xs bg-muted text-muted-foreground"
                    >
                      <Tag className="h-3 w-3 mr-0.5" />
                      {tag}
                    </Badge>
                  ))}
                  {selectedNote.encrypted && (
                    <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                      <Lock className="h-3 w-3 mr-0.5" />
                      Encrypted
                    </Badge>
                  )}
                </div>
                {editing ? (
                  <div className="space-y-2">
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      className="w-full h-40 p-3 rounded-xl bg-muted text-sm resize-none border border-border/50 focus:outline-none focus:border-green-500/40"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 h-8 text-xs bg-green-600 text-white border-0 font-bold"
                        onClick={() => {
                          setEditing(false);
                          toast.success("Note saved!");
                        }}
                      >
                        <Save className="h-3.5 w-3.5 mr-1" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-8 text-xs font-bold"
                        onClick={() => setEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedNote.content}
                    </p>
                  </div>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-8 text-xs font-bold"
                  onClick={() => toast.success("Note backed up to blockchain!")}
                >
                  🔗 Backup to Blockchain
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
