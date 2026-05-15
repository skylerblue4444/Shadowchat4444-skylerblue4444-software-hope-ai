import React from 'react';
import { trpc } from '../lib/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Lock } from 'lucide-react';
export default function Achievements() {
  const { data: achievements = [] } = trpc.achievements.getUserAchievements.useQuery();
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3"><Trophy className="text-yellow-500" /> Achievements & XP</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((a: any) => (
          <Card key={a.id} className={`bg-zinc-900 border-zinc-800 ${a.unlocked ? 'border-emerald-500' : 'opacity-70'}`}>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>{a.name}</CardTitle>
                {a.unlocked ? <Badge className="bg-emerald-600">Unlocked</Badge> : <Lock className="text-zinc-500" />}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">{a.description}</p>
              <div className="mt-4 text-sm text-emerald-400">+{a.xp} XP</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}