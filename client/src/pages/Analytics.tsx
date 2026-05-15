import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { trpc } from '../lib/trpc';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
export default function Analytics() {
  const { data: portfolio } = trpc.portfolio.get.useQuery();
  return (
    <div className="p-6"><h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1><div className="grid grid-cols-1 lg:grid-cols-2 gap-6"><Card><CardHeader><CardTitle>Portfolio Value</CardTitle></CardHeader><CardContent className="h-80"><ResponsiveContainer><LineChart data={[{time:'Now', value: portfolio?.totalValue || 12450}]}><Line type="monotone" dataKey="value" stroke="#10b981" /></LineChart></ResponsiveContainer></CardContent></Card><Card><CardHeader><CardTitle>TRUMP Impact</CardTitle></CardHeader><CardContent>Charity + NFT metrics live</CardContent></Card></div></div>
  );
}