// Thick Production Mining Dashboard - SkyLux Vault

import React, { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Square, Zap, Globe, ShieldCheck } from "lucide-react";

export default function SkyLuxMiningDashboard() {
  const [isMining, setIsMining] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [hashRate, setHashRate] = useState(1248);
  const [globalMiners, setGlobalMiners] = useState(12458);

  const startMining = trpc.mining.startMining.useMutation({
    onSuccess: data => {
      setSessionId(data.sessionId);
      setIsMining(true);
    },
  });

  const stopMining = trpc.mining.stopMining.useMutation({
    onSuccess: () => {
      setIsMining(false);
      setSessionId(null);
    },
  });

  const stats = trpc.mining.getMiningStats.useQuery(undefined, {
    enabled: isMining,
    refetchInterval: 800,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMining) {
      interval = setInterval(() => {
        setHashRate(Math.floor(Math.random() * 800) + 1100);
        setGlobalMiners(Math.floor(Math.random() * 300) + 12400);
      }, 900);
    }
    return () => clearInterval(interval);
  }, [isMining]);

  const blocks = stats.data?.[0]?.blocksFound ?? 0;
  const balance = Number(stats.data?.[0]?.balance ?? 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#facc15_0.8px,transparent_1px)] [background-size:40px_40px] opacity-20" />

      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-7xl font-bold tracking-[-4px] bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
              SKYLUX MINER
            </h1>
            <p className="text-3xl text-amber-400">
              Beta Mining Playground • Demo/Testnet Rewards
            </p>
          </div>
          <Badge className="px-10 py-4 text-xl border-amber-400">
            BETA • {globalMiners} SIMULATED MINERS
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Card className="lg:col-span-8 bg-zinc-900/95 border-amber-400/40 backdrop-blur-3xl">
            <CardHeader>
              <CardTitle className="text-4xl flex items-center gap-4">
                <Zap className="text-amber-400" /> Active Mining Session
              </CardTitle>
            </CardHeader>
            <CardContent className="p-16 text-center">
              <Button
                onClick={() =>
                  isMining
                    ? stopMining.mutate({ sessionId: sessionId! })
                    : startMining.mutate({ coin: "SKY4444" })
                }
                className="w-[420px] h-[420px] rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-black text-[180px] shadow-2xl shadow-amber-500/70 hover:scale-105 active:scale-95 transition-all"
              >
                {isMining ? <Square /> : <Play className="ml-8" />}
              </Button>

              {isMining && (
                <div className="mt-16 grid grid-cols-3 gap-12 text-center">
                  <div>
                    <div className="text-6xl font-mono">{blocks}</div>
                    <div className="text-amber-400 text-xl">Blocks Mined</div>
                  </div>
                  <div>
                    <div className="text-6xl font-mono text-amber-400">
                      {balance.toFixed(2)}
                    </div>
                    <div className="text-xl">Demo SKY Earned</div>
                  </div>
                  <div>
                    <div className="text-6xl font-mono">{hashRate}</div>
                    <div className="text-xl">Hash Rate (H/s)</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-4 bg-zinc-900/95 border-amber-400/40 backdrop-blur-3xl">
            <CardContent className="p-16">
              <Globe className="h-20 w-20 mx-auto text-amber-400 mb-8" />
              <div className="text-5xl font-semibold text-center mb-4">
                Global Impact
              </div>
              <div className="text-6xl text-amber-400 text-center">
                87,420 SKY Demo Donated
              </div>
              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-zinc-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Beta mode: no real mining or investment promise.
              </div>
              <Button className="w-full mt-12 py-10 text-2xl bg-amber-400 hover:bg-amber-500 text-black">
                View Charity Map
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
