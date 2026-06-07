import React, { useState } from 'react';
import {
  Zap,
  Image as ImageIcon,
  Video,
  Music,
  Heart,
  MessageCircle,
  Share2,
  Filter,
  Search,
  Plus,
  Award,
  BookOpen,
  Camera,
  History,
  TrendingUp,
} from 'lucide-react';

interface NFT {
  id: string;
  title: string;
  creator: string;
  price: string;
  image: string;
  type: 'image' | 'video' | 'audio' | 'story' | 'pic-story';
  likes: number;
  charity?: boolean;
}

const NFTMarketplace: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'art' | 'stories' | 'pic-stories' | 'music'>('all');
  const [showMintModal, setShowMintModal] = useState(false);

  const nfts: NFT[] = [
    {
      id: '1',
      title: 'Digital Horizon #001',
      creator: '@alexchen',
      price: '2,500 SKY4444',
      image: '🌅',
      type: 'image',
      likes: 1245,
      charity: true,
    },
    {
      id: '2',
      title: 'The Great Rebuild Story',
      creator: '@skylerblue',
      price: '10,000 SKY4444',
      image: '📚',
      type: 'story',
      likes: 8934,
    },
    {
      id: '3',
      title: 'Neon Dreams Pic-Story',
      creator: '@casey_moon',
      price: '5,000 SKY4444',
      image: '📸',
      type: 'pic-story',
      likes: 4523,
    },
    {
      id: '4',
      title: 'Cyberpunk Beats',
      creator: '@dj_neon',
      price: '1,200 SKY4444',
      image: '🎵',
      type: 'audio',
      likes: 2341,
    },
    {
      id: '5',
      title: 'Hope AI Evolution',
      creator: '@hope_ai',
      price: '50,000 SKY4444',
      image: '🧠',
      type: 'video',
      likes: 45678,
      charity: true,
    },
    {
      id: '6',
      title: 'Ecosystem Core #44',
      creator: '@admin',
      price: '100,000 SKY4444',
      image: '💎',
      type: 'image',
      likes: 123456,
    },
  ];

  const stats = [
    { label: 'Total Volume', value: '1.2M SKY4444', icon: <TrendingUp className="h-5 w-5" /> },
    { label: 'NFTs Minted', value: '45.2K', icon: <Plus className="h-5 w-5" /> },
    { label: 'Artists', value: '12.8K', icon: <Award className="h-5 w-5" /> },
    { label: 'Charity Raised', value: '$245K', icon: <Heart className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-5xl font-black mb-2">NFT Ecosystem</h1>
            <p className="text-slate-400">Mint, trade, and discover unique digital assets</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowMintModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Mint NFT
            </button>
            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-bold transition flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Create Pic-Story
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2 text-purple-400">{stat.icon}</div>
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search NFTs, artists, collections..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {(['all', 'art', 'stories', 'pic-stories', 'music'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
              <Filter className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500 transition group cursor-pointer"
            >
              {/* Media Preview */}
              <div className="relative aspect-square bg-slate-700/50 flex items-center justify-center text-8xl group-hover:scale-105 transition duration-500">
                {nft.image}
                {nft.charity && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-green-500/80 backdrop-blur rounded-full text-xs font-bold flex items-center gap-1">
                    <Heart className="h-3 w-3 fill-white" />
                    Charity
                  </div>
                )}
                <div className="absolute top-3 right-3 p-2 bg-slate-900/50 backdrop-blur rounded-lg opacity-0 group-hover:opacity-100 transition">
                  {nft.type === 'image' && <ImageIcon className="h-5 w-5" />}
                  {nft.type === 'video' && <Video className="h-5 w-5" />}
                  {nft.type === 'audio' && <Music className="h-5 w-5" />}
                  {nft.type === 'story' && <BookOpen className="h-5 w-5" />}
                  {nft.type === 'pic-story' && <Camera className="h-5 w-5" />}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg line-clamp-1">{nft.title}</h3>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{nft.likes}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-4">{nft.creator}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Price</p>
                    <p className="text-purple-400 font-black">{nft.price}</p>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-bold transition">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section: Pic-Stories */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black mb-2">Trending Pic-Stories</h2>
              <p className="text-slate-400">Visual narratives created by the community</p>
            </div>
            <button className="text-purple-400 font-bold hover:underline flex items-center gap-1">
              View All <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600 hover:border-purple-500 transition cursor-pointer">
                <div className="w-32 h-32 bg-slate-600 rounded-lg flex items-center justify-center text-5xl">
                  {i === 1 ? '🎬' : '🎨'}
                </div>
                <div className="flex-1 py-2">
                  <h3 className="text-xl font-bold mb-1">Visual Journey #{i}</h3>
                  <p className="text-sm text-slate-400 mb-4">A collaborative story of the digital rebirth...</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><History className="h-3 w-3" /> 12 Frames</span>
                    <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> 45.2K Views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mint Modal (Simplified) */}
      {showMintModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full p-8">
            <h2 className="text-3xl font-black mb-6">Mint New NFT</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Asset Name</label>
                <input type="text" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2" placeholder="Enter name" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Description</label>
                <textarea className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 h-24" placeholder="Tell the story..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Price (SKY4444)</label>
                  <input type="number" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Royalties (%)</label>
                  <input type="number" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2" placeholder="10" />
                </div>
              </div>
              <div className="pt-6 flex gap-3">
                <button onClick={() => setShowMintModal(false)} className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold transition">Cancel</button>
                <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition">Mint Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTMarketplace;
