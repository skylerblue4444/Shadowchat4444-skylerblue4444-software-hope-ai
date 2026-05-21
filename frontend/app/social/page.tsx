'use client';

import React, { useState } from 'react';

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Alex Chen',
    content: 'Just launched my new project on ShadowChat! Excited to connect with the community.',
    timestamp: '2 hours ago',
    likes: 234,
    comments: 45,
  },
  {
    id: '2',
    author: 'Sarah Martinez',
    content: 'The new marketplace features are incredible. Already made my first sale!',
    timestamp: '4 hours ago',
    likes: 567,
    comments: 89,
  },
];

export default function SocialPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: 'You',
      content: newPost,
      timestamp: 'now',
      likes: 0,
      comments: 0,
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="pt-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Social Network</h1>

          {/* Post Creation */}
          <div className="bg-black/40 border border-purple-500/30 rounded-xl p-6 mb-8">
            <form onSubmit={handlePostSubmit}>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full bg-slate-800 text-white rounded-lg p-4 mb-4 border border-purple-500/20 focus:border-purple-500/60 focus:outline-none"
                rows={4}
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Post
              </button>
            </form>
          </div>

          {/* Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-black/40 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/60 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{post.author}</h3>
                    <p className="text-sm text-gray-400">{post.timestamp}</p>
                  </div>
                </div>
                <p className="text-gray-200 mb-4">{post.content}</p>
                <div className="flex gap-6 text-gray-400">
                  <button className="hover:text-purple-400 transition">
                    ❤️ {post.likes}
                  </button>
                  <button className="hover:text-purple-400 transition">
                    💬 {post.comments}
                  </button>
                  <button className="hover:text-purple-400 transition">
                    🔄 Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
