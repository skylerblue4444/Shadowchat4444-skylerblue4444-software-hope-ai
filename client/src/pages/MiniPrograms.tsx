import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '../lib/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Play } from 'lucide-react';

export default function MiniPrograms() {
  const { data: programs = [] } = useQuery({ queryKey: ['mini-programs'], queryFn: () => trpc.miniPrograms.list.query() });
  const launch = useMutation({
    mutationFn: (programId: string) => trpc.miniPrograms.launch.mutate({ programId }),
    onSuccess: (data) => toast.success(data.message),
  });
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">📱 WeChat-Style Mini-Programs</h1>
      <p className="text-zinc-400 mb-8">Launch pluggable experiences inside SkyCoin444 — all powered by TRUMP.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((p: any) => (
          <Card key={p.id} className="bg-zinc-900 border-zinc-800 hover:border-red-500 transition-all">
            <CardHeader>
              <div className="text-6xl mb-4">{p.icon}</div>
              <CardTitle>{p.name}</CardTitle>
              <Badge>{p.category}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400 mb-4">{p.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-emerald-400 font-mono">{p.entryFeeTrump} TRUMP</div>
                <Button onClick={() => launch.mutate(p.id)} className="bg-red-600"><Play className="mr-2" /> Launch</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}