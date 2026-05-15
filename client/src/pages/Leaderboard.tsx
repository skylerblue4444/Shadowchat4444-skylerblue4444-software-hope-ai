import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../lib/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export default function Leaderboard() {
  const { data: leaders = [] } = useQuery({ queryKey: ['leaderboard'], queryFn: () => trpc.leaderboard.get.query({ category: 'xp' }) });
  return (
    <div className="p-6"><h1 className="text-4xl font-bold mb-8">Global Leaderboard</h1><Card><CardContent>{leaders.map((l: any, i: number) => <div key={i} className="flex justify-between py-3 border-b border-zinc-800"><span>#{i+1} {l.username}</span><span className="font-mono text-emerald-400">{l.xp} XP</span></div>)}</CardContent></Card></div>
  );
}