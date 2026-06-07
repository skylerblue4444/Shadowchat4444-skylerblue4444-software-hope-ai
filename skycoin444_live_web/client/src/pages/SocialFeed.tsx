import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function SocialFeed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Alice",
      content: "Just made an amazing trade! 🚀",
      tips: 40,
      likes: 120,
      comments: 8,
      engagement: 168,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: "Bob",
      content: "Charity hub is changing lives",
      tips: 80,
      likes: 250,
      comments: 15,
      engagement: 345,
      timestamp: "4 hours ago"
    }
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-2xl mx-auto"
    >
      <h1 className="text-3xl font-bold gold-text">Social Feed</h1>

      {/* Create Post */}
      <motion.div variants={itemVariants} className="luxury-card">
        <Textarea placeholder="Share your thoughts..." className="mb-3" />
        <Button className="luxury-button w-full">Post</Button>
      </motion.div>

      {/* Feed Posts */}
      {posts.map((post) => (
        <motion.div key={post.id} variants={itemVariants} className="luxury-card">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="font-bold">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
            <span className="text-xs gold-text">Engagement: {post.engagement}</span>
          </div>

          <p className="mb-4">{post.content}</p>

          <div className="flex justify-between items-center pt-3 border-t border-[#FFD700]/20">
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:gold-text">
                <Heart className="w-4 h-4 mr-1" /> {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:gold-text">
                <MessageCircle className="w-4 h-4 mr-1" /> {post.comments}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:gold-text">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="gold-text hover:gold-bg">
              <Zap className="w-4 h-4 mr-1" /> Tip {post.tips}
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
