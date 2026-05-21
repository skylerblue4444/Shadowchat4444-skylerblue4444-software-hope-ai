import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function CrossChainBridge() {
  const [amount, setAmount] = useState("");
  const [fromChain, setFromChain] = useState("ethereum");
  const [toChain, setToChain] = useState("polygon");

  const chains = ["ethereum", "polygon", "arbitrum", "optimism", "avalanche"];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Cross-Chain Bridge</h1>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Bridge Assets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300">From Chain</label>
            <select value={fromChain} onChange={(e) => setFromChain(e.target.value)} className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 mt-1">
              {chains.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>

          <div className="flex justify-center">
            <Button variant="ghost" className="rounded-full"><ArrowRight className="w-6 h-6" /></Button>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300">To Chain</label>
            <select value={toChain} onChange={(e) => setToChain(e.target.value)} className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 mt-1">
              {chains.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300">Amount</label>
            <Input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-gray-800 border-gray-700 text-white mt-1" />
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">Bridge Assets</Button>
        </CardContent>
      </Card>
    </div>
  );
}
