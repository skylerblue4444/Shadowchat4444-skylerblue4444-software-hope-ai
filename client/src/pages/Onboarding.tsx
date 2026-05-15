import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
export default function Onboarding() {
  return (
    <div className="p-6 max-w-2xl mx-auto"><h1 className="text-4xl font-bold mb-8">Welcome to SkyCoin444</h1><Card><CardHeader><CardTitle>Complete Onboarding (4/7 steps)</CardTitle></CardHeader><CardContent><Progress value={57} className="mb-6" /><div className="space-y-4"><div>✅ Connect Wallet</div><div>✅ Claim Free TRUMP</div><div>✅ Join First Charity Game</div><div className="text-zinc-500">○ Mint First Impact NFT</div></div><Button className="mt-8 w-full bg-red-600">Continue Onboarding</Button></CardContent></Card></div>
  );
}