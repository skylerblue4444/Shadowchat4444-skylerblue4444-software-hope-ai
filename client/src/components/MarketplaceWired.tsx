/**
 * 🛒 MARKETPLACE - FULLY WIRED
 * Real-time product listing, ordering, and inventory management
 */

import React, { useState } from 'react';
import { trpc } from '../_core/trpc';

export const MarketplaceWired: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Wire to backend marketplace endpoints
  const { data: products, isLoading } = trpc.marketplace.getProducts.useQuery({
    category: selectedCategory,
    search: searchQuery,
  });

  const createOrderMutation = trpc.marketplace.createOrder.useMutation();

  const handlePurchase = async (productId: string, quantity: number) => {
    try {
      await createOrderMutation.mutateAsync({ productId, quantity });
      alert('✅ Order placed successfully!');
    } catch (error) {
      alert('❌ Error: ' + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🛒 Global Marketplace</h1>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'luxury', 'electronics', 'fashion', 'home'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center text-slate-400">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                onPurchase={(qty) => handlePurchase(product.id, qty)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: any;
  onPurchase: (quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPurchase }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-blue-500 transition">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
        <span className="text-4xl">📦</span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-bold mb-2">{product.name}</h3>
        <p className="text-slate-400 text-sm mb-3">{product.description}</p>

        {/* Price */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-green-400 font-bold text-lg">${product.price.toFixed(2)}</span>
          <span className="text-slate-400 text-sm">{product.stock} in stock</span>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-2 py-1 bg-slate-700 text-white rounded hover:bg-slate-600"
          >
            −
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-12 px-2 py-1 bg-slate-700 text-white text-center rounded border border-slate-600"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-2 py-1 bg-slate-700 text-white rounded hover:bg-slate-600"
          >
            +
          </button>
        </div>

        {/* Purchase Button */}
        <button
          onClick={() => onPurchase(quantity)}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
