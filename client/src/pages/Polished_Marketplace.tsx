import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Plus, TrendingUp, Lock, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function PolishedMarketplace() {
  const [listings, setListings] = useState([]);
  const [sellerListings, setSellerListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    price: "",
    category: "digital",
  });
  const [loading, setLoading] = useState(true);

  // Fetch marketplace listings
  const { data: allListings } = trpc.marketplace.getListings.useQuery({
    limit: 20,
    offset: 0,
  });

  // Fetch seller's listings
  const { data: myListings } = trpc.marketplace.getSellerListings.useQuery();

  // Mutations
  const createListingMutation = trpc.marketplace.createListing.useMutation();
  const createOrderMutation = trpc.marketplace.createOrder.useMutation();

  useEffect(() => {
    if (allListings) {
      setListings(allListings);
      if (allListings.length > 0) {
        setSelectedListing(allListings[0]);
      }
      setLoading(false);
    }
  }, [allListings]);

  useEffect(() => {
    if (myListings) {
      setSellerListings(myListings);
    }
  }, [myListings]);

  async function handleCreateListing() {
    if (!newListing.title || !newListing.price) return;
    try {
      await createListingMutation.mutateAsync({
        title: newListing.title,
        description: newListing.description,
        price: newListing.price,
        category: newListing.category,
      });
      setNewListing({
        title: "",
        description: "",
        price: "",
        category: "digital",
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  }

  async function handlePurchase() {
    if (!selectedListing) return;
    try {
      await createOrderMutation.mutateAsync({
        listingId: selectedListing.id,
      });
      alert("Order created! Escrow is now held.");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1a3a1a,#09090b_45%)] p-6 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-zinc-400">Loading marketplace...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1a3a1a,#09090b_45%)] p-6 text-white">
      <section className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-emerald-400/30 bg-black/45 p-8 shadow-2xl shadow-emerald-500/10">
          <Badge className="mb-4 border-emerald-400/40 bg-emerald-400/10 text-emerald-200">
            Marketplace Beta
          </Badge>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            AetherLux Marketplace
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-zinc-300 md:text-base">
            Peer-to-peer trading with escrow protection, seller publishing
            controls, and SKY4444 settlement.
          </p>
        </div>

        {/* Create Listing Form */}
        {showCreateForm && (
          <Card className="border-emerald-400/20 bg-emerald-950/30 text-white">
            <CardHeader>
              <CardTitle>Create New Listing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newListing.title}
                onChange={e =>
                  setNewListing({ ...newListing, title: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
              />
              <textarea
                placeholder="Description"
                value={newListing.description}
                onChange={e =>
                  setNewListing({ ...newListing, description: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                rows={3}
              />
              <input
                type="text"
                placeholder="Price (SKY)"
                value={newListing.price}
                onChange={e =>
                  setNewListing({ ...newListing, price: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
              />
              <select
                value={newListing.category}
                onChange={e =>
                  setNewListing({ ...newListing, category: e.target.value })
                }
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="digital">Digital</option>
                <option value="services">Services</option>
                <option value="physical">Physical</option>
              </select>
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateListing}
                  disabled={createListingMutation.isPending}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  {createListingMutation.isPending
                    ? "Creating..."
                    : "Create Listing"}
                </Button>
                <Button
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Seller's Listings */}
        {sellerListings.length > 0 && (
          <Card className="border-emerald-400/20 bg-emerald-950/30 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-emerald-400" />
                  Your Listings ({sellerListings.length})
                </CardTitle>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Plus className="mr-2 h-4 w-4" /> New Listing
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {sellerListings.map(listing => (
                  <div
                    key={listing.id}
                    className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-4"
                  >
                    <h3 className="font-semibold text-emerald-300">
                      {listing.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-2">
                      {listing.description}
                    </p>
                    <p className="text-xl font-black text-emerald-400 mb-2">
                      {listing.price} SKY
                    </p>
                    <Badge className="bg-emerald-600 text-white capitalize">
                      {listing.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Browse Listings */}
        <div className="grid gap-4 md:grid-cols-3">
          {listings.slice(0, 3).map(listing => (
            <Card
              key={listing.id}
              onClick={() => setSelectedListing(listing)}
              className={`cursor-pointer border-white/10 bg-zinc-950/85 text-white transition hover:border-emerald-300/60 ${
                selectedListing?.id === listing.id
                  ? "ring-2 ring-emerald-400"
                  : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <ShoppingBag className="h-5 w-5 text-emerald-400" />
                  <Badge className="bg-emerald-600">{listing.category}</Badge>
                </div>
                <CardTitle className="text-lg">{listing.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-black text-emerald-400">
                  {listing.price} SKY
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Listing Details */}
        {selectedListing && (
          <Card className="border-emerald-400/20 bg-zinc-950/85 text-white">
            <CardContent className="grid gap-6 p-6 md:grid-cols-[1fr_0.9fr] md:items-start">
              <div className="space-y-4">
                <div>
                  <h2 className="text-3xl font-black mb-2">
                    {selectedListing.title}
                  </h2>
                  <p className="text-zinc-300">{selectedListing.description}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-zinc-400">Price</p>
                  <p className="text-4xl font-black text-emerald-400">
                    {selectedListing.price} SKY
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-zinc-400">Category</p>
                    <p className="font-semibold capitalize">
                      {selectedListing.category}
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-zinc-400">Status</p>
                    <p className="font-semibold capitalize">
                      {selectedListing.status}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handlePurchase}
                  disabled={
                    createOrderMutation.isPending ||
                    selectedListing.status !== "active"
                  }
                  className="h-14 w-full bg-emerald-500 text-lg font-black text-black hover:bg-emerald-400"
                >
                  <Lock className="mr-2 h-5 w-5" />{" "}
                  {createOrderMutation.isPending
                    ? "Processing..."
                    : "Buy with Escrow"}
                </Button>
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
                  <div className="flex items-start gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Escrow Protected</p>
                      <p className="text-xs mt-1">
                        Funds held safely until delivery confirmed by both
                        parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}
