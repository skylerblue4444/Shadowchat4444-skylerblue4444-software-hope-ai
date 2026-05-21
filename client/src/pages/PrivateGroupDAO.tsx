import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Users,
  Coins,
  Vote,
  Shield,
  Plus,
  Crown,
  ChevronRight,
  CheckCircle,
  Settings,
  Zap,
  Star,
  Globe,
  Eye,
  EyeOff,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const MY_GROUPS = [
  {
    id: 1,
    name: "SKY4444 Whales",
    emoji: "🐋",
    members: 444,
    token: "WHALE",
    treasury: 888888,
    myRole: "Founder",
    privacy: "private",
    activeProposals: 3,
  },
  {
    id: 2,
    name: "TRUMP Trading Circle",
    emoji: "🇺🇸",
    members: 1776,
    token: "TTC",
    treasury: 500000,
    myRole: "Admin",
    privacy: "private",
    activeProposals: 1,
  },
  {
    id: 3,
    name: "ShadowBuilders",
    emoji: "🏗️",
    members: 234,
    token: "BUILD",
    treasury: 125000,
    myRole: "Member",
    privacy: "public",
    activeProposals: 5,
  },
];

const PROPOSALS = [
  {
    id: 1,
    group: "SKY4444 Whales",
    title: "Increase staking rewards to 25% APY",
    votes: { yes: 312, no: 44, abstain: 12 },
    deadline: "2 days",
    status: "active",
  },
  {
    id: 2,
    group: "SKY4444 Whales",
    title: "Add Monero to treasury allocation",
    votes: { yes: 198, no: 156, abstain: 30 },
    deadline: "5 days",
    status: "active",
  },
  {
    id: 3,
    group: "ShadowBuilders",
    title: "Fund new developer mini-program SDK",
    votes: { yes: 189, no: 12, abstain: 8 },
    deadline: "1 day",
    status: "active",
  },
];

export default function PrivateGroupDAO() {
  const [tab, setTab] = useState<
    "mygroups" | "proposals" | "create" | "explore"
  >("mygroups");
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupToken, setNewGroupToken] = useState("");
  const [voted, setVoted] = useState<Record<number, string>>({});

  const vote = (proposalId: number, choice: string) => {
    setVoted(v => ({ ...v, [proposalId]: choice }));
    toast.success(`✅ Voted ${choice} on proposal #${proposalId}`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Lock className="h-6 w-6 text-indigo-400" />
            Private Group DAOs
          </h1>
          <p className="text-sm text-muted-foreground">
            Create communities with their own token economy and governance
          </p>
        </div>
        <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 font-bold">
          {MY_GROUPS.length} Groups
        </Badge>
      </div>

      <div className="flex gap-2">
        {(["mygroups", "proposals", "create", "explore"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${tab === t ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "mygroups" && (
        <div className="space-y-3">
          {MY_GROUPS.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className="border-border/50 cursor-pointer hover:border-indigo-500/20 transition-all"
                onClick={() => toast.info(`Opening ${group.name}...`)}
              >
                <CardContent className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl shrink-0">
                      {group.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-black text-sm">{group.name}</p>
                        <Badge
                          className={`text-xs ${group.privacy === "private" ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-green-500/10 text-green-400 border-green-500/20"}`}
                        >
                          {group.privacy === "private" ? (
                            <>
                              <Lock className="h-2.5 w-2.5 mr-1" />
                              Private
                            </>
                          ) : (
                            <>
                              <Globe className="h-2.5 w-2.5 mr-1" />
                              Public
                            </>
                          )}
                        </Badge>
                        <Badge className="text-xs bg-muted text-muted-foreground">
                          {group.myRole}
                        </Badge>
                      </div>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span>
                          <Users className="h-3 w-3 inline mr-1" />
                          {group.members.toLocaleString()} members
                        </span>
                        <span>
                          <Coins className="h-3 w-3 inline mr-1" />
                          {group.treasury.toLocaleString()} {group.token}
                        </span>
                        {group.activeProposals > 0 && (
                          <span className="text-yellow-400">
                            <Vote className="h-3 w-3 inline mr-1" />
                            {group.activeProposals} proposals
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <Button
            className="w-full h-9 text-xs bg-indigo-600 text-white border-0"
            onClick={() => setTab("create")}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Create New Group DAO
          </Button>
        </div>
      )}

      {tab === "proposals" && (
        <div className="space-y-3">
          {PROPOSALS.map((prop, i) => {
            const total = prop.votes.yes + prop.votes.no + prop.votes.abstain;
            const yesPercent = Math.round((prop.votes.yes / total) * 100);
            const noPercent = Math.round((prop.votes.no / total) * 100);
            return (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="border-border/50">
                  <CardContent className="py-4 px-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">
                          {prop.group}
                        </p>
                        <p className="font-bold text-sm">{prop.title}</p>
                      </div>
                      <Badge className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shrink-0 ml-2">
                        ⏰ {prop.deadline}
                      </Badge>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-green-400 w-12">
                          YES {yesPercent}%
                        </p>
                        <Progress value={yesPercent} className="h-2 flex-1" />
                        <p className="text-xs text-muted-foreground w-8">
                          {prop.votes.yes}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-red-400 w-12">
                          NO {noPercent}%
                        </p>
                        <Progress value={noPercent} className="h-2 flex-1" />
                        <p className="text-xs text-muted-foreground w-8">
                          {prop.votes.no}
                        </p>
                      </div>
                    </div>
                    {voted[prop.id] ? (
                      <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Voted {voted[prop.id]}
                      </Badge>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 h-8 text-xs bg-green-600 text-white border-0"
                          onClick={() => vote(prop.id, "YES")}
                        >
                          ✅ Vote YES
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 h-8 text-xs bg-red-600 text-white border-0"
                          onClick={() => vote(prop.id, "NO")}
                        >
                          ❌ Vote NO
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs"
                          onClick={() => vote(prop.id, "ABSTAIN")}
                        >
                          Abstain
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {tab === "create" && (
        <div className="space-y-3">
          <Card className="border-indigo-500/20 bg-indigo-900/10">
            <CardContent className="py-4 px-4 space-y-3">
              <p className="font-black text-sm flex items-center gap-2">
                <Plus className="h-4 w-4 text-indigo-400" />
                Create Private Group DAO
              </p>
              <Input
                placeholder="Group name (e.g. SKY4444 Whales)"
                value={newGroupName}
                onChange={e => setNewGroupName(e.target.value)}
                className="h-9 text-xs"
              />
              <Input
                placeholder="Token symbol (e.g. WHALE)"
                value={newGroupToken}
                onChange={e => setNewGroupToken(e.target.value)}
                className="h-9 text-xs"
                maxLength={6}
              />
              <Input
                placeholder="Initial token supply (e.g. 1,000,000)"
                className="h-9 text-xs"
                type="number"
              />
              <Input placeholder="Group description" className="h-9 text-xs" />
              {[
                {
                  label: "Privacy",
                  options: ["Private (invite only)", "Public", "Token-gated"],
                },
                {
                  label: "Voting Model",
                  options: [
                    "1 token = 1 vote",
                    "1 member = 1 vote",
                    "Quadratic voting",
                  ],
                },
                { label: "Quorum", options: ["10%", "25%", "51%", "67%"] },
              ].map(field => (
                <div key={field.label}>
                  <p className="text-xs text-muted-foreground mb-1">
                    {field.label}
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {field.options.map(opt => (
                      <button
                        key={opt}
                        className="px-3 py-1 rounded-lg bg-muted text-xs font-medium hover:bg-muted/80 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <Button
                className="w-full h-10 bg-indigo-600 text-white border-0 font-bold"
                onClick={() => {
                  if (!newGroupName || !newGroupToken) {
                    toast.error("Fill in group name and token symbol");
                    return;
                  }
                  toast.success(
                    `🏘️ "${newGroupName}" DAO created! Token: ${newGroupToken.toUpperCase()}`
                  );
                  setNewGroupName("");
                  setNewGroupToken("");
                  setTab("mygroups");
                }}
              >
                <Zap className="h-4 w-4 mr-2" />
                Deploy Group DAO
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "explore" && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">
            PUBLIC GROUP DAOS TO JOIN
          </p>
          {[
            {
              name: "Global Crypto Alliance",
              emoji: "🌍",
              members: 44444,
              token: "GCA",
              desc: "Worldwide crypto community with daily governance votes",
            },
            {
              name: "TRUMP Nation DAO",
              emoji: "🇺🇸",
              members: 17760,
              token: "MAGA",
              desc: "Official TRUMP coin community with exclusive perks",
            },
            {
              name: "ShadowDev Guild",
              emoji: "⚡",
              members: 2340,
              token: "DEV",
              desc: "Developers building on the ShadowChat platform",
            },
            {
              name: "Charity Champions",
              emoji: "❤️",
              members: 8900,
              token: "CARE",
              desc: "Collective charity fund managed by community vote",
            },
            {
              name: "NFT Collectors Union",
              emoji: "🖼️",
              members: 5600,
              token: "ART",
              desc: "Curated NFT collection with shared ownership",
            },
          ].map((group, i) => (
            <Card
              key={group.name}
              className="border-border/50 cursor-pointer hover:border-indigo-500/20 transition-all"
            >
              <CardContent className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{group.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{group.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {group.desc}
                    </p>
                    <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                      <span>
                        <Users className="h-3 w-3 inline mr-1" />
                        {group.members.toLocaleString()}
                      </span>
                      <span>
                        <Coins className="h-3 w-3 inline mr-1" />
                        {group.token}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="h-8 text-xs bg-indigo-600 text-white border-0"
                    onClick={() => toast.success(`Joined ${group.name}!`)}
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
