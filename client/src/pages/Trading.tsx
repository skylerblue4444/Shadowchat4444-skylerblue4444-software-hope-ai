import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '../lib/trpc';
export default function Trading() {
  const { data: orders = [] } = useQuery({ queryKey: ['orders'], queryFn: () => trpc.trading.getOrders.query() });
  const createOrder = useMutation({ mutationFn: (input: any) => trpc.trading.createOrder.mutate(input) });
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">Live Trading Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Price Chart</CardTitle></CardHeader><CardContent className="h-96 bg-zinc-950 flex items-center justify-center text-zinc-500">[Recharts Candlestick Chart - Real-time via WS]</CardContent></Card>
        <Card><CardHeader><CardTitle>Order Book</CardTitle></CardHeader><CardContent>Buy/Sell orders live</CardContent></Card>
      </div>
      <div className="mt-6"><Button onClick={() => createOrder.mutate({ pair: 'TRUMP/USDC', type: 'buy', amount: '100', price: '0.85' })} className="bg-emerald-600">Place Demo Buy Order</Button></div>
    </div>
  );
}