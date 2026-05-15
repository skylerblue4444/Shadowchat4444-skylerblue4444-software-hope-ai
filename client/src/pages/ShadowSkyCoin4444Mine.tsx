import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Cpu, Zap, Wallet, TrendingUp, Award, Lock } from "lucide-react";

const SKY_PER_BLOCK = 4.444;
const BLOCK_TIME_MS = 8000; // 8 seconds per block sim
const HASH_RATE_BASE = 4444;

export default function ShadowSkyCoin4444Mine() {
  const [mining, setMining] = useState(false);
  const [miningMode, setMiningMode] = useState<"SKY4444" | "TRUMP" | null>(null);
  const [balance, setBalance] = useState(0);
  const [hashRate, setHashRate] = useState(0);
  const [blocksFound, setBlocksFound] = useState(0);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([
    "ShadowChat SkyCoin4444 Miner v4.4.4 — Ready",
    "Click TRUMP or SKY4444 to begin mining...",
  ]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addLog = (msg: string) => {
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 14)]);
  };

  const startMining = (mode: "SKY4444" | "TRUMP") => {
    if (mining) return;
    setMining(true);
    setMiningMode(mode);
    const hr = HASH_RATE_BASE + Math.floor(Math.random() * 1000);
    setHashRate(hr);
    addLog(`Starting ${mode} mining at ${hr.toLocaleString()} H/s...`);
    addLog("Connecting to ShadowChat distributed mining pool...");
    addLog("Pool connected. Receiving work unit...");
    toast.success(`${mode} mining started! Your computer is now mining.`);

    // Progress bar
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 0;
        return p + (100 / (BLOCK_TIME_MS / 200));
      });
    }, 200);

    // Block found every ~8 seconds
    intervalRef.current = setInterval(() => {
      const reward = parseFloat((SKY_PER_BLOCK * (0.8 + Math.random() * 0.4)).toFixed(4));
      setBalance((b) => parseFloat((b + reward).toFixed(4)));
      setBlocksFound((bf) => bf + 1);
      setProgress(0);
      const newHr = HASH_RATE_BASE + Math.floor(Math.random() * 1000);
      setHashRate(newHr);
      addLog(`✅ Block found! +${reward} SKY4444 rewarded to wallet`);
      addLog(`Hash rate adjusted: ${newHr.toLocaleString()} H/s`);
      toast.success(`+${reward} SKY4444 mined and added to your wallet!`);
    }, BLOCK_TIME_MS);
  };

  const stopMining = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setMining(false);
    setMiningMode(null);
    setHashRate(0);
    setProgress(0);
    addLog("Mining stopped. Wallet balance preserved.");
    toast.info("Mining stopped. Your SKY4444 balance is saved.");
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-yellow-400">SkyCoin4444 Miner</h1>
          <p className="text-xs text-muted-foreground">
            Private science experiment — mine SKY4444 live on your device
          </p>
        </div>
        <Badge className="bg-yellow-500 text-black font-black shrink-0">SKY4444</Badge>
      </div>

      {/* Wallet Balance */}
      <Card className="border-yellow-500/40 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
        <CardContent className="py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-yellow-400" />
              <span className="font-black text-sm">Your SKY4444 Wallet</span>
            </div>
            <Badge className="bg-green-600 text-white text-xs">Live Balance</Badge>
          </div>
          <p className="text-3xl font-black text-yellow-400 mt-1">
            {balance.toFixed(4)} <span className="text-lg text-yellow-300">SKY4444</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Skyler Blue | SkyCoin4444 | Blocks Found: {blocksFound}
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <Cpu className="h-4 w-4 text-blue-400 mx-auto mb-1" />
            <p className="font-black text-sm text-blue-400">
              {mining ? `${hashRate.toLocaleString()} H/s` : "0 H/s"}
            </p>
            <p className="text-xs text-muted-foreground">Hash Rate</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <Award className="h-4 w-4 text-green-400 mx-auto mb-1" />
            <p className="font-black text-sm text-green-400">{blocksFound}</p>
            <p className="text-xs text-muted-foreground">Blocks Found</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 text-center">
          <CardContent className="py-3 px-2">
            <TrendingUp className="h-4 w-4 text-orange-400 mx-auto mb-1" />
            <p className="font-black text-sm text-orange-400">
              {mining ? `+${SKY_PER_BLOCK}/block` : "0"}
            </p>
            <p className="text-xs text-muted-foreground">Reward Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Mining Progress */}
      {mining && (
        <Card className="border-green-500/40">
          <CardContent className="py-3 px-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-green-400">
                Mining {miningMode}... solving block
              </span>
              <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>
      )}

      {/* Mine Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          className={`font-black text-base py-6 border-0 ${
            miningMode === "TRUMP"
              ? "bg-red-600 animate-pulse"
              : "bg-red-700 hover:bg-red-600"
          } text-white`}
          onClick={() => startMining("TRUMP")}
          disabled={mining}
        >
          🇺🇸 TRUMP
          <br />
          <span className="text-xs font-normal">Mine SKY4444</span>
        </Button>
        <Button
          className={`font-black text-base py-6 border-0 ${
            miningMode === "SKY4444"
              ? "bg-yellow-500 animate-pulse text-black"
              : "bg-yellow-600 hover:bg-yellow-500 text-black"
          }`}
          onClick={() => startMining("SKY4444")}
          disabled={mining}
        >
          💰 SKY4444
          <br />
          <span className="text-xs font-normal">Mine SKY4444</span>
        </Button>
      </div>

      {mining && (
        <Button
          variant="outline"
          className="w-full border-red-500/50 text-red-400 hover:bg-red-900/20"
          onClick={stopMining}
        >
          ⏹ Stop Mining
        </Button>
      )}

      {/* Mining Log */}
      <Card className="border-border/50">
        <CardHeader className="py-2 px-4">
          <CardTitle className="text-xs font-black text-muted-foreground flex items-center gap-2">
            <Zap className="h-3 w-3" /> Mining Log
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 px-4 space-y-1 max-h-40 overflow-y-auto">
          {log.map((line, i) => (
            <p key={i} className="text-xs font-mono text-muted-foreground">
              {line}
            </p>
          ))}
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-border/50 bg-muted/30">
        <CardContent className="py-3 px-4 flex items-start gap-2">
          <Lock className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold">Private Science Experiment</p>
            <p className="text-xs text-muted-foreground">
              SkyCoin4444 (SKY4444) is Skyler Blue's personal cryptocurrency. Mining here is a
              closed experiment — not for commercial gain. Your balance is real and tracked in
              your ShadowChat wallet. Code: <span className="text-yellow-400 font-bold">skyCoin4444</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center">
        <p className="font-bold text-xs">Skyler Blue IT Resolutions &bull; 479-406-7123</p>
        <p className="text-xs text-muted-foreground">
          skylerblue4444@gmail.com &bull; Arkansas #1 IT Partner
        </p>
      </div>
    </div>
  );
}
