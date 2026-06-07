import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, Zap, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  shares: number;
  tips: number;
  sentiment: "bullish" | "bearish" | "neutral";
  aiRank: number;
  liked: boolean;
}

export default function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "TradeMaster",
      avatar: "TM",
      content: "Just bought SKY at $0.0440. Technical analysis shows strong support here. Expecting 15% move up 🚀",
      timestamp: "2 hours ago",
      likes: 234,
      replies: 45,
      shares: 89,
      tips: 12,
      sentiment: "bullish",
      aiRank: 8.9,
      liked: false,
    },
    {
      id: "2",
      author: "CryptoAnalyst",
      avatar: "CA",
      content: "SKY breaking above 50-day MA with volume surge. This is textbook bullish breakout pattern. Long term bullish bias 📈",
      timestamp: "4 hours ago",
      likes: 567,
      replies: 123,
      shares: 234,
      tips: 45,
      sentiment: "bullish",
      aiRank: 9.2,
      liked: false,
    },
    {
      id: "3",
      author: "RiskManager",
      avatar: "RM",
      content: "Taking profits at $0.0456. Good risk/reward ratio achieved. Will re-enter on dips.",
      timestamp: "6 hours ago",
      likes: 189,
      replies: 34,
      shares: 56,
      tips: 8,
      sentiment: "neutral",
      aiRank: 7.1,
      liked: false,
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePostCreate = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      author: "You",
      avatar: "YO",
      content: newPost,
      timestamp: "now",
      likes: 0,
      replies: 0,
      shares: 0,
      tips: 0,
      sentiment: "neutral",
      aiRank: 5.0,
      liked: false,
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (id: string) => {
    setPosts(
      posts.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  const sortedPosts = [...posts].sort((a, b) => b.aiRank - a.aiRank);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>Share your market insights with the community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What's your market analysis? Share insights, trade ideas, or market observations..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="bg-gray-900 border-gray-700 min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button
              onClick={handlePostCreate}
              disabled={!newPost.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Post
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">AI-Ranked Feed</h2>
          <Badge variant="outline">Sorted by AI Relevance</Badge>
        </div>

        {sortedPosts.map((post) => (
          <Card key={post.id} className="hover:border-purple-500 transition-colors">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {post.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{post.author}</span>
                    <span className="text-xs text-gray-500">{post.timestamp}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        post.sentiment === "bullish"
                          ? "border-green-500 text-green-400"
                          : post.sentiment === "bearish"
                            ? "border-red-500 text-red-400"
                            : "border-gray-500 text-gray-400"
                      }`}
                    >
                      {post.sentiment.toUpperCase()}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-300 mb-3">{post.content}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      <span>AI Score: {post.aiRank.toFixed(1)}/10</span>
                    </div>
                  </div>

                  <div className="flex gap-4 text-xs text-gray-400">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1 hover:text-red-400 transition-colors ${
                        post.liked ? "text-red-400" : ""
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.replies}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-green-400 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                      <Zap className="w-4 h-4" />
                      <span className="text-yellow-400">{post.tips}</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
