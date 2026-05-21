import random
import time

class MarketplaceEngine:
    def __init__(self):
        self.sellers = []
        self.products = []
        self.orders = []
        self.categories = ["Watches", "Bags", "Jewelry", "Electronics", "Fashion"]
        self.platforms = ["DHgate", "AliExpress", "Amazon"]

    def register_seller(self, name, region="Global"):
        seller = {
            "id": len(self.sellers) + 1,
            "name": name,
            "region": region,
            "rating": 5.0,
            "sales": 0
        }
        self.sellers.append(seller)
        return seller

    def list_product(self, seller_id, title, price, category, inventory=100):
        product = {
            "id": len(self.products) + 1,
            "seller_id": seller_id,
            "title": title,
            "price": price,
            "category": category,
            "inventory": inventory,
            "status": "active"
        }
        self.products.append(product)
        return product

    def auto_fill_from_dhgate(self, categories=None):
        """
        Simulates the auto-fill logic for popular items from DHgate.
        As requested: watches, bags, jewelry.
        """
        if not categories:
            categories = ["Watches", "Bags", "Jewelry"]
        
        items_added = 0
        for cat in categories:
            # Simulate scraping/API integration with DHgate
            popular_items = [
                f"Luxury {cat[:-1] if cat.endswith('s') else cat} - Model {random.randint(100, 999)}",
                f"Designer {cat[:-1] if cat.endswith('s') else cat} - 2024 Collection",
                f"Premium {cat} - Wholesale Grade A"
            ]
            
            for item_title in popular_items:
                price = round(random.uniform(50, 5000), 2)
                self.list_product(seller_id=0, title=item_title, price=price, category=cat)
                items_added += 1
        
        return items_added

    def search_products(self, query=None, category=None):
        results = self.products
        if query:
            results = [p for p in results if query.lower() in p['title'].lower()]
        if category:
            results = [p for p in results if p['category'] == category]
        return results

    def purchase_product(self, product_id, quantity=1):
        for p in self.products:
            if p['id'] == product_id:
                if p['inventory'] >= quantity:
                    p['inventory'] -= quantity
                    order = {
                        "order_id": len(self.orders) + 1,
                        "product_id": product_id,
                        "quantity": quantity,
                        "timestamp": time.time()
                    }
                    self.orders.append(order)
                    return order
                else:
                    raise Exception("Insufficient inventory")
        raise Exception("Product not found")

    def get_marketplace_stats(self):
        return {
            "total_products": len(self.products),
            "total_sellers": len(self.sellers),
            "total_orders": len(self.orders),
            "categories": list(set(p['category'] for p in self.products))
        }

if __name__ == "__main__":
    # Test Pass for Marketplace Engine
    market = MarketplaceEngine()
    market.register_seller("Global Admin", "Global")
    
    print("Auto-filling marketplace from DHgate...")
    count = market.auto_fill_from_dhgate()
    print(f"Added {count} popular items.")
    
    stats = market.get_marketplace_stats()
    print(f"Marketplace Stats: {stats}")
    
    search_results = market.search_products(category="Watches")
    print(f"Found {len(search_results)} watches.")
    
    if search_results:
        order = market.purchase_product(search_results[0]['id'], 1)
        print(f"Purchase successful: Order ID {order['order_id']}")
