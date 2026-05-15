import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../lib/trpc';
import { Card, CardContent } from '@/components/ui/card';
import { Bell } from 'lucide-react';
export default function Notifications() {
  const { data: notifications = [] } = useQuery({ queryKey: ['notifications'], queryFn: () => trpc.notifications.getAll.query() });
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3"><Bell className="text-red-500" /> Notifications</h1>
      <div className="space-y-4">
        {notifications.map((n: any) => (
          <Card key={n.id} className={`bg-zinc-900 border-zinc-800 ${!n.read ? 'border-red-500' : ''}`}>
            <CardContent className="pt-6">
              <div className="font-semibold">{n.title}</div>
              <div className="text-xs text-zinc-500 mt-1">{new Date(n.timestamp).toLocaleString()}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}