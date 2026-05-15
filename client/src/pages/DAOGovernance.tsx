import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '../lib/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
export default function DAOGovernance() {
  const { data: proposals = [] } = useQuery({ queryKey: ['dao'], queryFn: () => trpc.dao.listProposals.query() });
  const vote = useMutation({ mutationFn: (input: any) => trpc.dao.vote.mutate(input) });
  return (
    <div className="p-6"><h1 className="text-4xl font-bold mb-8">DAO Governance (TRUMP Voting)</h1>{proposals.map((p: any) => <Card key={p.id} className="mb-6"><CardHeader><CardTitle>{p.title}</CardTitle></CardHeader><CardContent><p>{p.description}</p><div className="flex gap-4 mt-4"><Button onClick={() => vote.mutate({ proposalId: p.id, vote: 'for' })} className="bg-emerald-600">Vote For ({p.votesFor})</Button><Button onClick={() => vote.mutate({ proposalId: p.id, vote: 'against' })} variant="outline">Against ({p.votesAgainst})</Button></div></CardContent></Card>)}</div>
  );
}