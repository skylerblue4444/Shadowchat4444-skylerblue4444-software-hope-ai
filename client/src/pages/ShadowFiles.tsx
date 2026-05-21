import { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
  File,
  Upload,
  Download,
  Share2,
  Trash2,
  Lock,
  Search,
  Grid,
  List,
  HardDrive,
  Shield,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const FILES = [
  {
    id: 1,
    name: "SKY4444_Whitepaper_v3.pdf",
    type: "pdf",
    size: "4.4 MB",
    modified: "Today",
    folder: "Documents",
    encrypted: true,
    shared: false,
    ipfs: "QmSky4444...",
  },
  {
    id: 2,
    name: "ShadowChat_Logo_Pack.zip",
    type: "zip",
    size: "44 MB",
    modified: "Yesterday",
    folder: "Design",
    encrypted: false,
    shared: true,
    ipfs: "QmShadow...",
  },
  {
    id: 3,
    name: "IT_Client_Contract_TechCorp.docx",
    type: "doc",
    size: "188 KB",
    modified: "May 13",
    folder: "IT Contracts",
    encrypted: true,
    shared: false,
    ipfs: "QmTech...",
  },
  {
    id: 4,
    name: "Portfolio_Backup_May2026.json",
    type: "json",
    size: "22 KB",
    modified: "May 12",
    folder: "Crypto",
    encrypted: true,
    shared: false,
    ipfs: "QmPort...",
  },
  {
    id: 5,
    name: "ShadowPunk_4444.png",
    type: "image",
    size: "8.8 MB",
    modified: "May 10",
    folder: "NFTs",
    encrypted: false,
    shared: true,
    ipfs: "QmNFT...",
  },
  {
    id: 6,
    name: "Monthly_Revenue_Report.xlsx",
    type: "excel",
    size: "1.2 MB",
    modified: "May 8",
    folder: "Finance",
    encrypted: true,
    shared: false,
    ipfs: "QmRev...",
  },
];

const FOLDERS = [
  { name: "Documents", count: 12, icon: "📄", color: "#6366f1" },
  { name: "Design", count: 8, icon: "🎨", color: "#ec4899" },
  { name: "IT Contracts", count: 24, icon: "💼", color: "#06b6d4" },
  { name: "Crypto", count: 44, icon: "🌌", color: "#8b5cf6" },
  { name: "NFTs", count: 88, icon: "🖼️", color: "#f59e0b" },
  { name: "Finance", count: 16, icon: "💰", color: "#22c55e" },
];

const FILE_ICONS: Record<string, string> = {
  pdf: "📕",
  zip: "📦",
  doc: "📝",
  json: "🔧",
  image: "🖼️",
  excel: "📊",
};

export default function ShadowFiles() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "folders" | "shared" | "encrypted">(
    "all"
  );

  const filtered = FILES.filter(f => {
    if (tab === "shared") return f.shared;
    if (tab === "encrypted") return f.encrypted;
    if (search) return f.name.toLowerCase().includes(search.toLowerCase());
    return true;
  });

  const totalSize = "4.4 GB";
  const usedPct = 44;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <FolderOpen className="h-6 w-6 text-yellow-400" />
            ShadowFiles
          </h1>
          <p className="text-sm text-muted-foreground">
            Decentralized IPFS cloud storage with end-to-end encryption
          </p>
        </div>
        <Button
          size="sm"
          className="h-8 text-xs bg-yellow-600 text-white border-0 font-bold"
          onClick={() => toast.success("Opening file uploader...")}
        >
          <Upload className="h-3.5 w-3.5 mr-1" />
          Upload
        </Button>
      </div>

      {/* Storage Usage */}
      <Card className="border-yellow-500/20 bg-yellow-900/5">
        <CardContent className="py-3 px-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-yellow-400" />
              <p className="font-bold text-sm">Storage Used</p>
            </div>
            <p className="text-xs font-bold text-yellow-400">
              {usedPct}% of 10 GB
            </p>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-yellow-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${usedPct}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <p className="text-xs text-muted-foreground">{totalSize} used</p>
            <p className="text-xs text-muted-foreground">5.6 GB free</p>
          </div>
        </CardContent>
      </Card>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search files..."
          className="pl-9 h-9 text-xs"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {(["all", "folders", "shared", "encrypted"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-yellow-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={view === "list" ? "default" : "outline"}
            className="h-7 w-7 p-0"
            onClick={() => setView("list")}
          >
            <List className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            variant={view === "grid" ? "default" : "outline"}
            className="h-7 w-7 p-0"
            onClick={() => setView("grid")}
          >
            <Grid className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {tab === "folders" ? (
        <div className="grid grid-cols-2 gap-2">
          {FOLDERS.map((folder, i) => (
            <motion.div
              key={folder.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card
                className="border-border/50 cursor-pointer hover:border-yellow-500/20 transition-all"
                onClick={() => {
                  setTab("all");
                }}
              >
                <CardContent className="py-3 px-3 text-center">
                  <span className="text-3xl">{folder.icon}</span>
                  <p className="font-bold text-sm mt-1">{folder.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {folder.count} files
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <Card
            className="border-dashed border-border/50 cursor-pointer hover:border-yellow-500/20 transition-all"
            onClick={() => toast.success("Creating new folder...")}
          >
            <CardContent className="py-3 px-3 text-center">
              <Plus className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-xs text-muted-foreground mt-1">New Folder</p>
            </CardContent>
          </Card>
        </div>
      ) : view === "list" ? (
        <div className="space-y-1.5">
          {filtered.map((file, i) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/50 hover:border-yellow-500/20 transition-all">
                <CardContent className="py-2.5 px-4 flex items-center gap-3">
                  <span className="text-xl shrink-0">
                    {FILE_ICONS[file.type] || "📄"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{file.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">
                        {file.size} · {file.modified}
                      </p>
                      {file.encrypted && (
                        <Lock className="h-3 w-3 text-green-400" />
                      )}
                      {file.shared && (
                        <Share2 className="h-3 w-3 text-blue-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 w-7 p-0"
                      onClick={() =>
                        toast.success(`Downloading ${file.name}...`)
                      }
                    >
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 w-7 p-0"
                      onClick={() =>
                        toast.success(`Share link copied for ${file.name}!`)
                      }
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 w-7 p-0 text-red-400"
                      onClick={() => toast.success(`${file.name} deleted`)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {filtered.map((file, i) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="border-border/50 hover:border-yellow-500/20 transition-all cursor-pointer">
                <CardContent className="py-3 px-3 text-center">
                  <span className="text-3xl">
                    {FILE_ICONS[file.type] || "📄"}
                  </span>
                  <p className="font-bold text-xs mt-1 truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                  <div className="flex justify-center gap-1 mt-1">
                    {file.encrypted && (
                      <Lock className="h-3 w-3 text-green-400" />
                    )}
                    {file.shared && (
                      <Share2 className="h-3 w-3 text-blue-400" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Card className="border-green-500/20 bg-green-900/5">
        <CardContent className="py-3 px-4 flex items-center gap-3">
          <Shield className="h-5 w-5 text-green-400 shrink-0" />
          <div>
            <p className="font-bold text-sm">IPFS + AES-256 Encryption</p>
            <p className="text-xs text-muted-foreground">
              All files stored on decentralized IPFS network with military-grade
              encryption. Only you hold the keys.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
