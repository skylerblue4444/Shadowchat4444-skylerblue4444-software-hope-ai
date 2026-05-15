import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '../lib/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
export default function NFTMarketplace() {
  const { data: listings = [] } = useQuery({ queryKey: ['nft-market'], queryFn: () => trpc.nftMarketplace.listListings.query() });
  const buy = useMutation({ mutationFn: (id: string) => trpc.nftMarketplace.buy.mutate({ listingId: id }) });
  return (
    <div className="p-6"><h1 className="text-4xl font-bold mb-8">Impact Story NFT Marketplace</h1><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{listings.map((l: any) => <Card key={l.id}><CardHeader><CardTitle>{l.title}</CardTitle></CardHeader><CardContent><div className="text-2xl font-mono text-emerald-400 mb-4">{l.priceTrump} TRUMP</div><Button onClick={() => buy.mutate(l.id)} className="w-full bg-purple-600">Buy Now</Button></CardContent></Card>)}</div></div>
  );
}