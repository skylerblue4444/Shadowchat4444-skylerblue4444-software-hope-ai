import { useState } from "react";
import {
  Code,
  Play,
  CheckCircle,
  AlertTriangle,
  Plus,
  Copy,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TEMPLATES = [
  {
    name: "ERC-20 Token",
    desc: "Standard fungible token",
    lang: "Solidity",
    audited: true,
  },
  {
    name: "ERC-721 NFT",
    desc: "Non-fungible token collection",
    lang: "Solidity",
    audited: true,
  },
  {
    name: "Staking Contract",
    desc: "Token staking with rewards",
    lang: "Solidity",
    audited: true,
  },
  {
    name: "Multisig Wallet",
    desc: "2-of-3 multi-signature wallet",
    lang: "Solidity",
    audited: true,
  },
  {
    name: "DAO Governance",
    desc: "Proposal and voting system",
    lang: "Solidity",
    audited: false,
  },
  {
    name: "Liquidity Pool",
    desc: "AMM liquidity pool contract",
    lang: "Solidity",
    audited: false,
  },
];

const DEPLOYED = [
  {
    name: "SKY4444 Token",
    address: "0x7f3a...2b9c",
    network: "SKY Chain",
    status: "active",
    txs: 142000,
  },
  {
    name: "ShadowNFT",
    address: "0x4e1b...8a2f",
    network: "Ethereum",
    status: "active",
    txs: 8420,
  },
  {
    name: "StakingV2",
    address: "0x9c2d...1e4a",
    network: "BSC",
    status: "active",
    txs: 28000,
  },
  {
    name: "DAOVoting",
    address: "0x2a8f...7d3e",
    network: "SKY Chain",
    status: "paused",
    txs: 420,
  },
];

export default function ShadowSmartContracts() {
  const [tab, setTab] = useState("deployed");
  const [compiling, setCompiling] = useState(false);

  const compile = async () => {
    setCompiling(true);
    await new Promise(r => setTimeout(r, 2000));
    setCompiling(false);
    toast.success("Contract compiled successfully — 0 errors, 0 warnings");
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Code className="h-6 w-6 text-violet-400" />
          Smart Contracts
        </h1>
        <p className="text-sm text-muted-foreground">
          Deploy, manage, and interact with smart contracts on SKY Chain and EVM
          networks
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Deployed", value: "4", color: "text-violet-400" },
          { label: "Total TXs", value: "178K+", color: "text-green-400" },
          { label: "Audited", value: "3", color: "text-blue-400" },
          { label: "Networks", value: "3", color: "text-cyan-400" },
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
        {["deployed", "templates", "editor"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors " +
              (tab === t
                ? "bg-violet-600 text-white"
                : "bg-muted text-muted-foreground")
            }
          >
            {t === "deployed"
              ? "🚀 Deployed"
              : t === "templates"
                ? "📋 Templates"
                : "✏️ Editor"}
          </button>
        ))}
      </div>
      {tab === "deployed" && (
        <div className="space-y-2">
          {DEPLOYED.map((c, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div
                  className={
                    "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 " +
                    (c.status === "active"
                      ? "bg-green-500/10"
                      : "bg-yellow-500/10")
                  }
                >
                  {c.status === "active" ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">{c.name}</p>
                    <Badge
                      className={
                        "text-xs border-0 " +
                        (c.status === "active"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400")
                      }
                    >
                      {c.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    {c.address} · {c.network}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-sm text-violet-400">
                    {c.txs.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">txns</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {tab === "templates" && (
        <div className="space-y-2">
          {TEMPLATES.map((t, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">{t.name}</p>
                    {t.audited && (
                      <Badge className="bg-green-500/10 text-green-400 border-0 text-xs">
                        Audited
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t.desc} · {t.lang}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="h-7 px-3 text-xs bg-violet-600 text-white border-0 font-bold"
                  onClick={() => toast.success("Template loaded: " + t.name)}
                >
                  Use
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {tab === "editor" && (
        <div className="space-y-3">
          <div className="h-48 bg-muted rounded-xl p-3 font-mono text-xs text-green-400 overflow-auto">
            <p className="text-muted-foreground">
              // SPDX-License-Identifier: MIT
            </p>
            <p className="text-muted-foreground">pragma solidity ^0.8.20;</p>
            <p className="mt-2 text-violet-400">
              contract <span className="text-yellow-400">SKY4444Token</span>{" "}
              {"{"}
            </p>
            <p className="pl-4 text-blue-400">
              string public <span className="text-white">name</span> ={" "}
              <span className="text-green-400">"SKY4444"</span>;
            </p>
            <p className="pl-4 text-blue-400">
              uint256 public <span className="text-white">totalSupply</span> ={" "}
              <span className="text-orange-400">1_000_000_000</span>;
            </p>
            <p className="pl-4 text-blue-400">
              mapping(address {"=>"} uint256) public{" "}
              <span className="text-white">balanceOf</span>;
            </p>
            <p className="mt-2 pl-4 text-violet-400">
              function <span className="text-yellow-400">transfer</span>(address
              to, uint256 amount) external {"{"}
            </p>
            <p className="pl-8 text-white">balanceOf[msg.sender] -= amount;</p>
            <p className="pl-8 text-white">balanceOf[to] += amount;</p>
            <p className="pl-4">{"}"}</p>
            <p>{"}"}</p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="h-8 bg-violet-600 text-white border-0 font-bold text-xs flex-1"
              onClick={compile}
              disabled={compiling}
            >
              {compiling ? (
                "Compiling..."
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 mr-1" />
                  Compile
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs"
              onClick={() => toast.success("Deployed to SKY Chain testnet!")}
            >
              Deploy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
