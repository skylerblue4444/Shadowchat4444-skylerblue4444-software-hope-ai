import { useState } from "react";
import {
  ShoppingCart,
  CreditCard,
  Zap,
  CheckCircle,
  Plus,
  Minus,
  DollarSign,
  Smartphone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const PRODUCTS = [
  { name: "IT Consultation (1hr)", price: 150, category: "Service" },
  { name: "Laptop Setup", price: 89, category: "Service" },
  { name: "Network Cable Run", price: 125, category: "Service" },
  { name: "Virus Removal", price: 75, category: "Service" },
  { name: "USB-C Hub", price: 49, category: "Product" },
  { name: "Wireless Mouse", price: 35, category: "Product" },
  { name: "HDMI Cable 6ft", price: 15, category: "Product" },
  { name: "Surge Protector", price: 29, category: "Product" },
];

type CartItem = { name: string; price: number; qty: number };

export default function ShadowSkylerBluePOS() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paid, setPaid] = useState(false);

  const addToCart = (p: (typeof PRODUCTS)[0]) => {
    setCart(c => {
      const ex = c.find(i => i.name === p.name);
      if (ex)
        return c.map(i => (i.name === p.name ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { name: p.name, price: p.price, qty: 1 }];
    });
  };
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = total * 0.0875;

  const processPayment = (method: string) => {
    setPaid(true);
    toast.success(
      "Payment of $" +
        (total + tax).toFixed(2) +
        " processed via " +
        method +
        " — Receipt sent to skylerblue4444@gmail.com"
    );
    setTimeout(() => {
      setCart([]);
      setPaid(false);
    }, 3000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-emerald-400" />
          Skyler Blue POS
        </h1>
        <p className="text-sm text-muted-foreground">
          Point-of-sale system — accepts cash, card, and crypto payments
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">
            PRODUCTS & SERVICES
          </p>
          {PRODUCTS.map((p, i) => (
            <button
              key={i}
              onClick={() => addToCart(p)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-left"
            >
              <div>
                <p className="font-bold text-xs">{p.name}</p>
                <Badge
                  className={
                    "text-xs border-0 mt-0.5 " +
                    (p.category === "Service"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-green-500/10 text-green-400")
                  }
                >
                  {p.category}
                </Badge>
              </div>
              <p className="font-black text-sm text-emerald-400">${p.price}</p>
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground">CART</p>
          {cart.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-xs">
              Add items from the left
            </div>
          ) : (
            <>
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-xl bg-muted"
                >
                  <div className="flex-1">
                    <p className="font-bold text-xs">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ${item.price} × {item.qty}
                    </p>
                  </div>
                  <p className="font-black text-xs text-emerald-400">
                    ${item.price * item.qty}
                  </p>
                  <button
                    onClick={() =>
                      setCart(c =>
                        c
                          .map(i2 =>
                            i2.name === item.name
                              ? { ...i2, qty: Math.max(0, i2.qty - 1) }
                              : i2
                          )
                          .filter(i2 => i2.qty > 0)
                      )
                    }
                    className="h-5 w-5 rounded-full bg-red-500/10 flex items-center justify-center"
                  >
                    <Minus className="h-3 w-3 text-red-400" />
                  </button>
                </div>
              ))}
              <div className="border-t border-border/50 pt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Tax (8.75%)</span>
                  <span className="font-bold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-black">
                  <span>Total</span>
                  <span className="text-emerald-400">
                    ${(total + tax).toFixed(2)}
                  </span>
                </div>
              </div>
              {paid ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 text-green-400 font-bold text-sm">
                  <CheckCircle className="h-5 w-5" />
                  Payment Successful!
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    className="w-full h-9 bg-emerald-600 text-white border-0 font-bold text-sm"
                    onClick={() => processPayment("Card")}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Charge Card
                  </Button>
                  <Button
                    className="w-full h-9 bg-orange-600 text-white border-0 font-bold text-sm"
                    onClick={() => processPayment("Bitcoin")}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Pay with BTC/SKY4444
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
