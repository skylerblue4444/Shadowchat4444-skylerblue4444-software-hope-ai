import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

interface PriceData {
  time: string;
  price: number;
  volume: number;
}

export default function Trading() {
  const { user } = useAuth();
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [currentPrice, setCurrentPrice] = useState(0.0444);
  const [orderForm, setOrderForm] = useState({ type: "buy", amount: "", price: "" });
  const [loading, setLoading] = useState(false);

  const createOrderMutation = trpc.trading.createOrder.useMutation();
  const getOrdersQuery = trpc.trading.getOrders.useQuery(undefined, { enabled: !!user });

  // Initialize price data
  useEffect(() => {
    const data: PriceData[] = [];
    let price = 0.0444;
    for (let i = 0; i < 24; i++) {
      price = price * (0.98 + Math.random() * 0.04);
      data.push({
        time: `${String(i).padStart(2, "0")}:00`,
        price: parseFloat(price.toFixed(4)),
        volume: Math.floor(Math.random() * 100000),
      });
    }
    setPriceData(data);
  }, []);

  // Real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((p) => {
        const change = (Math.random() - 0.5) * 0.0005;
        return Math.max(0.001, p + change);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleExecuteOrder = async () => {
    if (!orderForm.amount || !orderForm.price) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await createOrderMutation.mutateAsync({
        pair: "SKY/USD",
        type: orderForm.type as "buy" | "sell",
        amount: orderForm.amount,
        price: orderForm.price,
      });
      toast.success(`${orderForm.type.toUpperCase()} order executed`);
      setOrderForm({ type: "buy", amount: "", price: "" });
      getOrdersQuery.refetch();
    } catch (error) {
      toast.error("Order execution failed");
    } finally {
      setLoading(false);
    }
  };

  const orderBook = {
    bids: [
      { price: (currentPrice * 0.99).toFixed(4), amount: "1000" },
      { price: (currentPrice * 0.98).toFixed(4), amount: "2000" },
      { price: (currentPrice * 0.97).toFixed(4), amount: "1500" },
    ],
    asks: [
      { price: (currentPrice * 1.01).toFixed(4), amount: "1200" },
      { price: (currentPrice * 1.02).toFixed(4), amount: "2500" },
      { price: (currentPrice * 1.03).toFixed(4), amount: "1800" },
    ],
  };

  const priceChange = ((currentPrice - 0.0444) / 0.0444 * 100).toFixed(2);
  const isPositive = parseFloat(priceChange) >= 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Current Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">${currentPrice.toFixed(4)}</div>
            <p className={`text-xs mt-1 ${isPositive ? "text-green-400" : "text-red-400"}`}>
              {isPositive ? "+" : ""}{priceChange}% (24h)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">24h High</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.0456</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">24h Low</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.0428</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Price Chart</CardTitle>
          <CardDescription>SKY/USD real-time price movement</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={priceData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a5a" />
              <XAxis dataKey="time" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: "#0a0a2a", border: "1px solid #2a2a5a" }} />
              <Area type="monotone" dataKey="price" stroke="#a855f7" fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Book</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-green-400 mb-2">Bids</h4>
              <div className="space-y-1">
                {orderBook.bids.map((bid, i) => (
                  <div key={i} className="flex justify-between text-xs text-gray-300">
                    <span>${bid.price}</span>
                    <span className="text-gray-500">{bid.amount}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-700 pt-2">
              <h4 className="text-sm font-semibold text-red-400 mb-2">Asks</h4>
              <div className="space-y-1">
                {orderBook.asks.map((ask, i) => (
                  <div key={i} className="flex justify-between text-xs text-gray-300">
                    <span>${ask.price}</span>
                    <span className="text-gray-500">{ask.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Place Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Type</label>
              <Select value={orderForm.type} onValueChange={(v) => setOrderForm({ ...orderForm, type: v })}>
                <SelectTrigger className="bg-gray-900 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Amount</label>
              <Input
                type="number"
                placeholder="0.00"
                value={orderForm.amount}
                onChange={(e) => setOrderForm({ ...orderForm, amount: e.target.value })}
                className="bg-gray-900 border-gray-700"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Price</label>
              <Input
                type="number"
                placeholder={currentPrice.toFixed(4)}
                value={orderForm.price}
                onChange={(e) => setOrderForm({ ...orderForm, price: e.target.value })}
                className="bg-gray-900 border-gray-700"
              />
            </div>
            <Button
              onClick={handleExecuteOrder}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {loading ? "Executing..." : "Execute Order"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {getOrdersQuery.data && getOrdersQuery.data.length > 0 ? (
              <div className="space-y-2">
                {getOrdersQuery.data.slice(0, 5).map((order: any) => (
                  <div key={order.id} className="flex justify-between items-center pb-2 border-b border-gray-700">
                    <div>
                      <Badge variant={order.type === "buy" ? "default" : "secondary"} className="mb-1">
                        {order.type.toUpperCase()}
                      </Badge>
                      <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{order.amount}</p>
                      <p className="text-xs text-gray-500">${order.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No orders yet. Start trading!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
