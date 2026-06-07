import { Router, Request, Response } from "express";

const router = Router();

// ─── Product catalog (DHgate/Alibaba style) ───────────────────────────────────
const PRODUCTS = [
  { id: 1, title: "Wireless Earbuds Pro Max TWS", price: 12.99, originalPrice: 45.00, rating: 4.7, reviews: 8432, sold: 52000, category: "Electronics", supplier: "ShenZhen AudioTech", origin: "CN", shipping: "Free", days: "7-15", badge: "Best Seller" },
  { id: 2, title: "Smart Watch Ultra Series 9", price: 24.50, originalPrice: 89.00, rating: 4.6, reviews: 5621, sold: 31000, category: "Electronics", supplier: "WearTech Global", origin: "CN", shipping: "Free", days: "10-18", badge: "Hot" },
  { id: 3, title: "LED Ring Light 18 Inch with Tripod", price: 18.75, originalPrice: 55.00, rating: 4.8, reviews: 12043, sold: 89000, category: "Photography", supplier: "PhotoPro Supplies", origin: "CN", shipping: "Free", days: "8-14", badge: "Top Rated" },
  { id: 4, title: "Mechanical Gaming Keyboard RGB 104 Keys", price: 31.20, originalPrice: 95.00, rating: 4.5, reviews: 7891, sold: 44000, category: "Gaming", supplier: "GamerGear Factory", origin: "CN", shipping: "Free", days: "9-16", badge: "Popular" },
  { id: 5, title: "4K Action Camera Waterproof 60FPS", price: 42.00, originalPrice: 130.00, rating: 4.6, reviews: 4320, sold: 28000, category: "Photography", supplier: "ActionCam Direct", origin: "CN", shipping: "Free", days: "10-20", badge: "New" },
  { id: 6, title: "Portable Bluetooth Speaker 360° IPX7", price: 19.99, originalPrice: 60.00, rating: 4.7, reviews: 9876, sold: 67000, category: "Electronics", supplier: "SoundWave Electronics", origin: "CN", shipping: "Free", days: "7-14", badge: "Best Seller" },
  { id: 7, title: "Drone 4K Camera GPS Foldable RC", price: 89.00, originalPrice: 280.00, rating: 4.5, reviews: 3241, sold: 18000, category: "Electronics", supplier: "SkyDrone Factory", origin: "CN", shipping: "$5.99", days: "12-22", badge: "Hot" },
  { id: 8, title: "USB-C Hub 10-in-1 Docking Station 4K", price: 22.50, originalPrice: 70.00, rating: 4.8, reviews: 6543, sold: 41000, category: "Electronics", supplier: "ConnectPro Tech", origin: "CN", shipping: "Free", days: "8-15", badge: "Top Rated" },
];

// ─── GET /api/marketplace/products ───────────────────────────────────────────
router.get("/products", (req: Request, res: Response) => {
  const { category, search, sort, page = "1", limit = "20" } = req.query;
  let results = [...PRODUCTS];

  if (category && category !== "All") {
    results = results.filter(p => p.category === category);
  }
  if (search) {
    const q = (search as string).toLowerCase();
    results = results.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }
  if (sort === "price-low") results.sort((a, b) => a.price - b.price);
  else if (sort === "price-high") results.sort((a, b) => b.price - a.price);
  else if (sort === "rating") results.sort((a, b) => b.rating - a.rating);
  else results.sort((a, b) => b.sold - a.sold); // default: popular

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const total = results.length;
  const paginated = results.slice((pageNum - 1) * limitNum, pageNum * limitNum);

  res.json({ products: paginated, total, page: pageNum, pages: Math.ceil(total / limitNum) });
});

// ─── GET /api/marketplace/products/:id ───────────────────────────────────────
router.get("/products/:id", (req: Request, res: Response) => {
  const product = PRODUCTS.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// ─── GET /api/marketplace/categories ─────────────────────────────────────────
router.get("/categories", (_req: Request, res: Response) => {
  const cats = Array.from(new Set(PRODUCTS.map(p => p.category)));
  res.json(["All", ...cats]);
});

// ─── POST /api/marketplace/orders ────────────────────────────────────────────
router.post("/orders", (req: Request, res: Response) => {
  const { items, shipping, paymentMethod, total } = req.body;
  if (!items || !items.length) return res.status(400).json({ error: "No items in order" });

  const orderId = `SKY-${Date.now().toString(36).toUpperCase()}`;
  const order = {
    id: orderId,
    items,
    shipping,
    paymentMethod,
    total,
    status: "confirmed",
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  };

  res.json({ success: true, order });
});

// ─── GET /api/marketplace/reviews/:productId ─────────────────────────────────
router.get("/reviews/:productId", (req: Request, res: Response) => {
  const reviews = [
    { id: 1, user: "Mike T.", rating: 5, date: "2025-05-12", text: "Amazing quality for the price! Shipped faster than expected.", helpful: 42, verified: true, avatar: "M" },
    { id: 2, user: "Sarah K.", rating: 5, date: "2025-05-05", text: "Exceeded my expectations. Packaging was excellent.", helpful: 38, verified: true, avatar: "S" },
    { id: 3, user: "James R.", rating: 4, date: "2025-04-28", text: "Good product overall. Minor issue resolved quickly by supplier.", helpful: 29, verified: true, avatar: "J" },
    { id: 4, user: "Emma L.", rating: 5, date: "2025-04-20", text: "Perfect! Exactly as described. Fast shipping to the US.", helpful: 51, verified: true, avatar: "E" },
    { id: 5, user: "David W.", rating: 4, date: "2025-04-10", text: "Great value. Build quality is surprisingly good.", helpful: 23, verified: false, avatar: "D" },
  ];
  res.json({ reviews, productId: req.params.productId });
});

export default router;
