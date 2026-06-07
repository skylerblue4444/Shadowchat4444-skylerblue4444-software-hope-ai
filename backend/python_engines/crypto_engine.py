import time
import heapq

class CryptoEngine:
    def __init__(self):
        self.wallets = {}
        self.order_books = {} # pair -> {'buy': [], 'sell': []}
        self.trades = []

    def create_wallet(self, user_id, initial_balances=None):
        self.wallets[user_id] = initial_balances or {"USDT": 10000.0, "BTC": 1.0}
        return self.wallets[user_id]

    def place_order(self, user_id, pair, side, price, amount):
        if pair not in self.order_books:
            self.order_books[pair] = {'buy': [], 'sell': []}
        
        order = {
            "user_id": user_id,
            "price": price,
            "amount": amount,
            "timestamp": time.time()
        }
        
        if side == 'buy':
            # Max-heap for buy orders (use negative price)
            heapq.heappush(self.order_books[pair]['buy'], (-price, order))
        else:
            # Min-heap for sell orders
            heapq.heappush(self.order_books[pair]['sell'], (price, order))
            
        self.match_orders(pair)
        return order

    def match_orders(self, pair):
        book = self.order_books[pair]
        while book['buy'] and book['sell']:
            best_buy_price, best_buy = book['buy'][0]
            best_buy_price = -best_buy_price
            best_sell_price, best_sell = book['sell'][0]
            
            if best_buy_price >= best_sell_price:
                # Match found
                match_price = best_sell_price
                match_amount = min(best_buy['amount'], best_sell['amount'])
                
                # Execute trade
                trade = {
                    "pair": pair,
                    "price": match_price,
                    "amount": match_amount,
                    "timestamp": time.time()
                }
                self.trades.append(trade)
                
                # Update amounts
                best_buy['amount'] -= match_amount
                best_sell['amount'] -= match_amount
                
                if best_buy['amount'] == 0:
                    heapq.heappop(book['buy'])
                if best_sell['amount'] == 0:
                    heapq.heappop(book['sell'])
            else:
                break

    def get_order_book(self, pair):
        if pair not in self.order_books:
            return None
        return {
            "buy": sorted([(-p, o['amount']) for p, o in self.order_books[pair]['buy']], reverse=True),
            "sell": sorted([(p, o['amount']) for p, o in self.order_books[pair]['sell']])
        }

if __name__ == "__main__":
    exchange = CryptoEngine()
    exchange.create_wallet(1)
    exchange.create_wallet(2)
    
    exchange.place_order(1, "BTC/USDT", "buy", 65000, 0.5)
    exchange.place_order(2, "BTC/USDT", "sell", 64500, 0.3)
    
    print(f"Total trades executed: {len(exchange.trades)}")
    print(f"Trade price: {exchange.trades[0]['price']}, Amount: {exchange.trades[0]['amount']}")
    print(f"Order book depth: {exchange.get_order_book('BTC/USDT')}")
