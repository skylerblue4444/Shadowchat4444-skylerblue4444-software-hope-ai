import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export default function Referrals() {
  return (
    <div className="p-6 max-w-2xl mx-auto"><h1 className="text-4xl font-bold mb-8">Referral Program</h1><Card><CardContent><div className="text-2xl font-mono bg-zinc-950 p-4 rounded mb-4">https://skycoin444.app/ref/USER123</div><Button className="w-full">Copy Link & Earn 50 TRUMP per referral</Button></CardContent></Card></div>
  );
}