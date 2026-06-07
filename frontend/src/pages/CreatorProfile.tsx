import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Edit,
  Settings,
  Link as LinkIcon,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Award,
  Image,
  Video,
  Music,
  Zap,
} from 'lucide-react';

interface CreatorContent {
  id: string;
  type: 'post' | 'video' | 'nft' | 'livestream';
  title: string;
  thumbnail: string;
  likes: number;
  comments: number;
  shares: number;
  earnings: number;
  date: string;
}

const CreatorProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'videos' | 'nfts' | 'earnings'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const creatorData = {
    username: 'alexchen_creator',
    displayName: 'Alex Chen',
    bio: 'Digital creator | Crypto enthusiast | Building the future 🚀',
    location: 'San Francisco, CA',
    joinDate: 'Joined March 2024',
    avatar: '👨‍💻',
    banner: '🌆',
    verified: true,
    followers: 892450,
    following: 1234,
    posts: 2341,
    totalEarnings: 245230,
    monthlyEarnings: 12450,
    tier: 'Platinum',
    socialLinks: {
      twitter: '@alexchen_creator',
      instagram: '@alexchen_creator',
      website: 'alexchen.io',
    },
  };

  const contentItems: CreatorContent[] = [
    {
      id: '1',
      type: 'post',
      title: 'Just launched my new NFT collection! 🎨',
      thumbnail: '🎨',
      likes: 12450,
      comments: 892,
      shares: 3421,
      earnings: 450,
      date: '2 days ago',
    },
    {
      id: '2',
      type: 'video',
      title: 'How I made $10K in one week',
      thumbnail: '📹',
      likes: 45230,
      comments: 3421,
      shares: 8934,
      earnings: 1250,
      date: '1 week ago',
    },
    {
      id: '3',
      type: 'nft',
      title: 'Rare Digital Collectible #001',
      thumbnail: '💎',
      likes: 8934,
      comments: 234,
      shares: 1234,
      earnings: 2500,
      date: '2 weeks ago',
    },
    {
      id: '4',
      type: 'livestream',
      title: 'Live Q&A with community',
      thumbnail: '🔴',
      likes: 23450,
      comments: 5678,
      shares: 2341,
      earnings: 890,
      date: '3 weeks ago',
    },
  ];

  const stats = [
    { label: 'Followers', value: creatorData.followers.toLocaleString(), icon: <Users className="h-5 w-5" /> },
    { label: 'Total Earnings', value: `$${creatorData.totalEarnings.toLocaleString()}`, icon: <DollarSign className="h-5 w-5" /> },
    { label: 'This Month', value: `$${creatorData.monthlyEarnings.toLocaleString()}`, icon: <TrendingUp className="h-5 w-5" /> },
    { label: 'Tier', value: creatorData.tier, icon: <Award className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Banner */}
      <div className="h-48 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-8xl">
        {creatorData.banner}
      </div>

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative -mt-24 mb-8">
          <div className="flex flex-col md:flex-row gap-6 md:items-end">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-7xl border-4 border-slate-900 flex-shrink-0">
              {creatorData.avatar}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-black">{creatorData.displayName}</h1>
                {creatorData.verified && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                )}
              </div>
              <p className="text-slate-400 mb-3">@{creatorData.username}</p>
              <p className="text-lg mb-4">{creatorData.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {creatorData.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {creatorData.joinDate}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap md:flex-nowrap">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  isFollowing
                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Message
              </button>
              <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 text-center"
            >
              <div className="flex justify-center mb-2 text-purple-400">{stat.icon}</div>
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {Object.entries(creatorData.socialLinks).map(([platform, handle]) => (
            <a
              key={platform}
              href="#"
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center gap-2 transition"
            >
              <LinkIcon className="h-4 w-4" />
              {handle}
            </a>
          ))}
        </div>

        {/* Content Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-700 overflow-x-auto">
          {[
            { id: 'posts', label: 'Posts', icon: <Image className="h-4 w-4" /> },
            { id: 'videos', label: 'Videos', icon: <Video className="h-4 w-4" /> },
            { id: 'nfts', label: 'NFTs', icon: <Zap className="h-4 w-4" /> },
            { id: 'earnings', label: 'Earnings', icon: <DollarSign className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-semibold transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contentItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg overflow-hidden hover:border-purple-500 transition group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative bg-slate-700/50 aspect-video flex items-center justify-center text-6xl group-hover:bg-slate-700 transition">
                {item.thumbnail}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 group-hover:bg-white/30 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Play className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>
              </div>

              {/* Content Info */}
              <div className="p-4">
                <h3 className="font-semibold mb-3 line-clamp-2">{item.title}</h3>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-slate-400 mb-3 pb-3 border-b border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {(item.likes / 1000).toFixed(1)}K
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {(item.comments / 1000).toFixed(1)}K
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    {(item.shares / 1000).toFixed(1)}K
                  </div>
                </div>

                {/* Earnings & Date */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">{item.date}</p>
                  <p className="font-bold text-green-400">${item.earnings.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Earnings Tab Content */}
        {activeTab === 'earnings' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Earnings Summary */}
            <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Earnings Summary</h2>
              <div className="space-y-4">
                {[
                  { source: 'Marketplace Sales', amount: 8450, percentage: 35 },
                  { source: 'Creator Tips', amount: 2340, percentage: 25 },
                  { source: 'NFT Royalties', amount: 1890, percentage: 20 },
                  { source: 'Sponsorships', amount: 1200, percentage: 15 },
                  { source: 'Livestream Donations', amount: 570, percentage: 5 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <p className="font-semibold">{item.source}</p>
                      <p className="text-green-400 font-bold">${item.amount.toLocaleString()}</p>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payout Methods */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Payout Methods</h2>
              <div className="space-y-3">
                <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <p className="text-sm text-slate-400 mb-1">Bank Transfer</p>
                  <p className="font-semibold">••••5678</p>
                </div>
                <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <p className="text-sm text-slate-400 mb-1">Crypto Wallet</p>
                  <p className="font-semibold text-xs break-all">0x742d...8f4c</p>
                </div>
                <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition">
                  Add Payout Method
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Play = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default CreatorProfile;
