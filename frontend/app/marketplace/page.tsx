'use client';

import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  seller: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Premium Crypto Trading Bot',
    price: 299.99,
    seller: 'TechVision Inc',
    rating: 4.8,
    reviews: 234,
    image: '🤖',
    category: 'Software',
    inStock: true,
  },
  {
    id: '2',
    name: 'Digital Marketing Course',
    price: 149.99,
    seller: 'Marketing Masters',
    rating: 4.9,
    reviews: 567,
    image: '📚',
    category: 'Education',
    inStock: true,
  },
  {
    id: '3',
    name: 'Web Design Template Pack',
    price: 79.99,
    seller: 'Design Studio Pro',
    rating: 4.7,
    reviews: 189,
    image: '🎨',
    category: 'Design',
    inStock: true,
  },
  {
    id: '4',
    name: 'Mobile App Development Kit',
    price: 199.99,
    seller: 'DevTools Plus',
    rating: 4.6,
    reviews: 412,
    image: '📱',
    category: 'Development',
    inStock: true,
  },
  {
    id: '5',
    name: 'SEO Optimization Suite',
    price: 129.99,
    seller: 'SEO Experts',
    rating: 4.8,
    reviews: 298,
    image: '🔍',
    category: 'Marketing',
    inStock: true,
  },
  {
    id: '6',
    name: 'Cloud Infrastructure Guide',
    price: 89.99,
    seller: 'Cloud Academy',
    rating: 4.7,
    reviews: 156,
    image: '☁️',
    category: 'Infrastructure',
    inStock: true,
  },
];

export default function MarketplacePage() {
  const [cart, setCart] = useState<string[]>([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Software', 'Education', 'Design', 'Development', 'Marketing', 'Infrastructure'];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filter === 'All' || product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: string) => {
    setCart([...cart, productId]);
    alert('Product added to cart!');
  };

  const totalPrice = cart.reduce((sum, id) => {
    const product = products.find((p) => p.id === id);
    return sum + (product?.price || 0);
  }, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      <div className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Marketplace</h1>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 text-white rounded-lg p-4 border border-green-500/30 focus:border-green-500/60 focus:outline-none"
            />

            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg transition ${
                    filter === category
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-black/40 border border-green-500/30 rounded-xl overflow-hidden hover:border-green-400/60 transition"
              >
                <div className="h-40 bg-gradient-to-br from-green-600/20 to-green-800/20 flex items-center justify-center text-6xl">
                  {product.image}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{product.seller}</p>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-2xl font-bold text-white">${product.price}</p>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-yellow-400">★</span>
                        <span className="text-gray-300">{product.rating} ({product.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product.id)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="fixed bottom-8 right-8 bg-black/80 border border-green-500/60 rounded-xl p-6 max-w-sm">
              <h3 className="text-lg font-bold text-white mb-4">Shopping Cart</h3>
              <p className="text-gray-300 mb-2">Items: {cart.length}</p>
              <p className="text-2xl font-bold text-green-400 mb-4">Total: ${totalPrice.toFixed(2)}</p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
