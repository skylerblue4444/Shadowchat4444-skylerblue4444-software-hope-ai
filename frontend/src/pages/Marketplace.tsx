import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  Filter,
  Grid,
  List,
  ChevronDown,
  MapPin,
  Truck,
  Shield,
  TrendingUp,
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  vendor: string;
  category: string;
  inStock: boolean;
  socialScore: number;
}

interface Vendor {
  id: string;
  name: string;
  rating: number;
  followers: number;
  logo: string;
  badge: 'verified' | 'certified' | 'none';
}

const Marketplace: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<'trending' | 'price_low' | 'price_high' | 'rating' | 'newest'>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Books & Media',
    'Sports',
    'Toys & Games',
    'Beauty',
    'Automotive',
  ];

  const products: Product[] = [
    {
      id: '1',
      title: 'Premium Wireless Headphones',
      price: 199.99,
      rating: 4.8,
      reviews: 2341,
      image: '🎧',
      vendor: 'TechPro Store',
      category: 'Electronics',
      inStock: true,
      socialScore: 92,
    },
    {
      id: '2',
      title: 'Organic Cotton T-Shirt',
      price: 34.99,
      rating: 4.6,
      reviews: 1823,
      image: '👕',
      vendor: 'Fashion Hub',
      category: 'Fashion',
      inStock: true,
      socialScore: 78,
    },
    {
      id: '3',
      title: 'Smart Home Security Camera',
      price: 89.99,
      rating: 4.7,
      reviews: 3421,
      image: '📹',
      vendor: 'SmartHome Pro',
      category: 'Electronics',
      inStock: true,
      socialScore: 88,
    },
    {
      id: '4',
      title: 'Yoga Mat Premium',
      price: 49.99,
      rating: 4.5,
      reviews: 892,
      image: '🧘',
      vendor: 'Wellness Store',
      category: 'Sports',
      inStock: true,
      socialScore: 72,
    },
    {
      id: '5',
      title: 'Stainless Steel Water Bottle',
      price: 29.99,
      rating: 4.9,
      reviews: 5234,
      image: '🧴',
      vendor: 'EcoLife',
      category: 'Home & Garden',
      inStock: true,
      socialScore: 95,
    },
    {
      id: '6',
      title: 'Bestseller Novel Collection',
      price: 44.99,
      rating: 4.4,
      reviews: 1234,
      image: '📚',
      vendor: 'Book World',
      category: 'Books & Media',
      inStock: true,
      socialScore: 65,
    },
    {
      id: '7',
      title: 'Professional Camera Lens',
      price: 599.99,
      rating: 4.9,
      reviews: 3892,
      image: '📷',
      vendor: 'Photography Pro',
      category: 'Electronics',
      inStock: false,
      socialScore: 91,
    },
    {
      id: '8',
      title: 'Designer Sunglasses',
      price: 149.99,
      rating: 4.7,
      reviews: 2156,
      image: '😎',
      vendor: 'Fashion Hub',
      category: 'Fashion',
      inStock: true,
      socialScore: 84,
    },
  ];

  const topVendors: Vendor[] = [
    { id: '1', name: 'TechPro Store', rating: 4.8, followers: 245000, logo: '🏪', badge: 'certified' },
    { id: '2', name: 'Fashion Hub', rating: 4.7, followers: 189000, logo: '👗', badge: 'verified' },
    { id: '3', name: 'SmartHome Pro', rating: 4.9, followers: 156000, logo: '🏠', badge: 'certified' },
    { id: '4', name: 'Wellness Store', rating: 4.6, followers: 134000, logo: '💪', badge: 'verified' },
  ];

  const filteredProducts = products
    .filter((p) => !selectedCategory || p.category === selectedCategory)
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return parseInt(b.id) - parseInt(a.id);
        case 'trending':
        default:
          return b.socialScore - a.socialScore;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black mb-2">Global Marketplace</h1>
          <p className="text-slate-400">Discover millions of products from verified sellers</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, vendors, categories..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div
            className={`lg:col-span-1 ${
              showFilters ? 'block' : 'hidden lg:block'
            } bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6`}
          >
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded transition ${
                    selectedCategory === null
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded transition ${
                      selectedCategory === cat
                        ? 'bg-purple-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-bold mb-3">Price Range</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm"
                    placeholder="Min"
                  />
                  <span className="text-slate-400">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="font-bold mb-3">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <div className="flex items-center gap-1">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-slate-400">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div>
              <h3 className="font-bold mb-3">Shipping</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Free Shipping</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Express Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
                <p className="text-slate-400">
                  Showing <span className="text-white font-semibold">{filteredProducts.length}</span> products
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="trending">Trending</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>

                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition ${
                    viewMode === 'grid'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition ${
                    viewMode === 'list'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg overflow-hidden hover:border-purple-500 transition group cursor-pointer"
                  >
                    <div className="relative bg-slate-700/50 p-6 text-4xl flex items-center justify-center h-48 group-hover:bg-slate-700 transition">
                      {product.image}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <p className="text-white font-bold">Out of Stock</p>
                        </div>
                      )}
                      <button className="absolute top-2 right-2 p-2 bg-slate-800/80 hover:bg-slate-700 rounded-lg transition opacity-0 group-hover:opacity-100">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold line-clamp-2 flex-1">{product.title}</h3>
                        <div className="flex items-center gap-1 ml-2 whitespace-nowrap">
                          <TrendingUp className="h-4 w-4 text-green-400" />
                          <span className="text-xs text-green-400 font-semibold">{product.socialScore}</span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-400 mb-3">{product.vendor}</p>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{product.rating}</span>
                        </div>
                        <span className="text-xs text-slate-400">({product.reviews.toLocaleString()})</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-green-400">${product.price}</p>
                        <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm font-semibold transition">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3 mb-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 hover:border-purple-500 transition flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-24 h-24 bg-slate-700/50 rounded-lg flex items-center justify-center text-3xl group-hover:bg-slate-700 transition flex-shrink-0">
                      {product.image}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{product.title}</h3>
                      <p className="text-sm text-slate-400 mb-2">{product.vendor}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{product.rating}</span>
                        </div>
                        <span className="text-xs text-slate-400">({product.reviews.toLocaleString()} reviews)</span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-bold text-green-400 mb-2">${product.price}</p>
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Featured Vendors */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Featured Vendors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="bg-slate-700/30 rounded-lg p-4 border border-slate-600 hover:border-purple-500 transition cursor-pointer text-center"
                  >
                    <div className="text-4xl mb-2">{vendor.logo}</div>
                    <h3 className="font-semibold mb-1">{vendor.name}</h3>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{vendor.rating}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{vendor.followers.toLocaleString()} followers</p>
                    <button className="w-full px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm font-semibold transition">
                      Visit Store
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
