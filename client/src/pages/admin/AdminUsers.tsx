import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  Crown,
  Ban,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  ArrowUp,
  ArrowDown,
  UserPlus,
  Mail,
  Phone,
  Globe,
  Lock,
  Unlock,
  AlertTriangle,
  Star,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const MOCK_USERS = [
  {
    id: "u001",
    username: "SkylerBlue_Official",
    email: "skylerblue4444@gmail.com",
    role: "owner",
    status: "active",
    country: "US",
    joined: "2024-01-01",
    balance: 125000,
    xp: 98432,
    verified: true,
    flagged: false,
  },
  {
    id: "u002",
    username: "CryptoWhale_88",
    email: "whale88@crypto.com",
    role: "admin",
    status: "active",
    country: "US",
    joined: "2024-01-15",
    balance: 84200,
    xp: 87654,
    verified: true,
    flagged: false,
  },
  {
    id: "u003",
    username: "DeFi_Wizard",
    email: "wizard@defi.io",
    role: "moderator",
    status: "active",
    country: "UK",
    joined: "2024-02-01",
    balance: 42100,
    xp: 76543,
    verified: true,
    flagged: false,
  },
  {
    id: "u004",
    username: "NFT_Artist_Pro",
    email: "artist@nft.art",
    role: "user",
    status: "active",
    country: "JP",
    joined: "2024-02-14",
    balance: 18900,
    xp: 65432,
    verified: true,
    flagged: false,
  },
  {
    id: "u005",
    username: "TrumpArmy_Leader",
    email: "trump@army.us",
    role: "user",
    status: "active",
    country: "US",
    joined: "2024-03-01",
    balance: 9800,
    xp: 54321,
    verified: false,
    flagged: false,
  },
  {
    id: "u006",
    username: "SuspiciousUser_99",
    email: "sus99@mail.ru",
    role: "user",
    status: "suspended",
    country: "RU",
    joined: "2024-03-10",
    balance: 0,
    xp: 1200,
    verified: false,
    flagged: true,
  },
  {
    id: "u007",
    username: "China_Trader_01",
    email: "trader01@qq.com",
    role: "user",
    status: "active",
    country: "CN",
    joined: "2024-03-15",
    balance: 32400,
    xp: 43210,
    verified: true,
    flagged: false,
  },
  {
    id: "u008",
    username: "GameFi_Master",
    email: "gamefi@play.gg",
    role: "user",
    status: "active",
    country: "KR",
    joined: "2024-04-01",
    balance: 21000,
    xp: 38765,
    verified: true,
    flagged: false,
  },
  {
    id: "u009",
    username: "PrivacyFirst_XMR",
    email: "privacy@xmr.io",
    role: "user",
    status: "active",
    country: "DE",
    joined: "2024-04-10",
    balance: 15600,
    xp: 32109,
    verified: false,
    flagged: false,
  },
  {
    id: "u010",
    username: "SpamBot_Delete",
    email: "spam@bot.xyz",
    role: "user",
    status: "banned",
    country: "NG",
    joined: "2024-04-20",
    balance: 0,
    xp: 50,
    verified: false,
    flagged: true,
  },
];

const ROLE_COLORS: Record<string, string> = {
  owner: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  admin: "bg-red-500/10 text-red-400 border-red-500/20",
  moderator: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  user: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-500/10 text-green-400 border-green-500/20",
  suspended: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  banned: "bg-red-500/10 text-red-400 border-red-500/20",
};

const COUNTRY_FLAGS: Record<string, string> = {
  US: "🇺🇸",
  UK: "🇬🇧",
  JP: "🇯🇵",
  KR: "🇰🇷",
  CN: "🇨🇳",
  DE: "🇩🇪",
  RU: "🇷🇺",
  NG: "🇳🇬",
};

export default function AdminUsers() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = users.filter(u => {
    const matchSearch =
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const toggleSelect = (id: string) =>
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );

  const handleAction = (action: string, userId: string) => {
    if (action === "ban") {
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, status: "banned" } : u))
      );
      toast.success("User banned");
    } else if (action === "suspend") {
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, status: "suspended" } : u))
      );
      toast.success("User suspended");
    } else if (action === "activate") {
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, status: "active" } : u))
      );
      toast.success("User reactivated");
    } else if (action === "verify") {
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, verified: true } : u))
      );
      toast.success("User verified");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-400" />
            User Management
          </h1>
          <p className="text-sm text-muted-foreground">
            {users.length.toLocaleString()} total users ·{" "}
            {users.filter(u => u.status === "active").length} active
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Users exported to CSV")}
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 text-white border-0"
            onClick={() => toast.info("Create user modal")}
          >
            <UserPlus className="h-3.5 w-3.5 mr-1.5" />
            Add User
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-9 h-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["all", "owner", "admin", "moderator", "user"].map(r => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${roleFilter === r ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {["all", "active", "suspended", "banned"].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${statusFilter === s ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <span className="text-sm font-medium text-blue-400">
            {selected.length} selected
          </span>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs border-orange-500/30 text-orange-400"
            onClick={() => {
              setUsers(prev =>
                prev.map(u =>
                  selected.includes(u.id) ? { ...u, status: "suspended" } : u
                )
              );
              setSelected([]);
              toast.success(`${selected.length} users suspended`);
            }}
          >
            Suspend All
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs border-red-500/30 text-red-400"
            onClick={() => {
              setUsers(prev =>
                prev.map(u =>
                  selected.includes(u.id) ? { ...u, status: "banned" } : u
                )
              );
              setSelected([]);
              toast.success(`${selected.length} users banned`);
            }}
          >
            Ban All
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs"
            onClick={() => setSelected([])}
          >
            Clear
          </Button>
        </div>
      )}

      {/* Users Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium w-8">
                    <input
                      type="checkbox"
                      className="rounded"
                      onChange={e =>
                        setSelected(
                          e.target.checked ? filtered.map(u => u.id) : []
                        )
                      }
                    />
                  </th>
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium">
                    User
                  </th>
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium">
                    Role
                  </th>
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium">
                    Status
                  </th>
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium">
                    Country
                  </th>
                  <th className="text-right p-3 text-xs text-muted-foreground font-medium">
                    Balance
                  </th>
                  <th className="text-right p-3 text-xs text-muted-foreground font-medium">
                    XP
                  </th>
                  <th className="text-left p-3 text-xs text-muted-foreground font-medium">
                    Joined
                  </th>
                  <th className="text-right p-3 text-xs text-muted-foreground font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className={`border-b border-border/20 hover:bg-muted/20 transition-colors ${selected.includes(user.id) ? "bg-blue-500/5" : ""}`}
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selected.includes(user.id)}
                        onChange={() => toggleSelect(user.id)}
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {user.username[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">
                              {user.username}
                            </span>
                            {user.verified && (
                              <CheckCircle className="h-3 w-3 text-blue-400" />
                            )}
                            {user.flagged && (
                              <AlertTriangle className="h-3 w-3 text-red-400" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge
                        className={`text-xs capitalize ${ROLE_COLORS[user.role]}`}
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        className={`text-xs capitalize ${STATUS_COLORS[user.status]}`}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span className="text-sm">
                        {COUNTRY_FLAGS[user.country] || "🌐"} {user.country}
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono text-sm text-yellow-400">
                      {user.balance.toLocaleString()}
                    </td>
                    <td className="p-3 text-right font-mono text-sm text-purple-400">
                      {user.xp.toLocaleString()}
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">
                      {user.joined}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                          onClick={() => toast.info(`Viewing ${user.username}`)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        {user.status === "active" ? (
                          <button
                            className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:text-orange-400 hover:bg-orange-500/10 transition-colors"
                            onClick={() => handleAction("suspend", user.id)}
                          >
                            <Lock className="h-3.5 w-3.5" />
                          </button>
                        ) : (
                          <button
                            className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:text-green-400 hover:bg-green-500/10 transition-colors"
                            onClick={() => handleAction("activate", user.id)}
                          >
                            <Unlock className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {user.status !== "banned" && (
                          <button
                            className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            onClick={() => handleAction("ban", user.id)}
                          >
                            <Ban className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
