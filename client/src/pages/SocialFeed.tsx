import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation } from '@tanstack/react-query';
import { trpc } from '../lib/trpc';
import { Textarea } from '@/components/ui/textarea';
export default function SocialFeed() {
  const { data: posts = [] } = useQuery({ queryKey: ['feed'], queryFn: () => trpc.social.getFeed.query({ limit: 20 }) });
  const createPost = useMutation({ mutationFn: (input: any) => trpc.social.createPost.mutate(input) });
  const [content, setContent] = React.useState('');
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">ShadowChat Social Feed</h1>
      <Card className="mb-8"><CardContent className="pt-6"><Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="What's happening in the Web3 world?" className="min-h-[100px]" /><Button onClick={() => { createPost.mutate({ content }); setContent(''); }} className="mt-4">Post to ShadowChat</Button></CardContent></Card>
      {posts.map((post: any) => <Card key={post.id} className="mb-4"><CardContent>{post.content}</CardContent></Card>)}
    </div>
  );
}