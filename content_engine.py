import time

class ContentEngine:
    def __init__(self):
        self.content_items = []
        self.categories = {} # cat_name -> list of items

    def create_content(self, creator_id, title, content_type, category):
        item = {
            "id": len(self.content_items) + 1,
            "creator_id": creator_id,
            "title": title,
            "type": content_type,
            "category": category,
            "views": 0,
            "likes": 0,
            "timestamp": time.time()
        }
        self.content_items.append(item)
        if category not in self.categories:
            self.categories[category] = []
        self.categories[category].append(item)
        return item

    def view_content(self, item_id):
        for item in self.content_items:
            if item['id'] == item_id:
                item['views'] += 1
                return True
        return False

    def get_trending_content(self, limit=5):
        # Trending = Views * (recent factor)
        now = time.time()
        trending = sorted(
            self.content_items,
            key=lambda x: x['views'] / (now - x['timestamp'] + 1),
            reverse=True
        )
        return trending[:limit]

    def recommend_content(self, user_id):
        # Simple recommendation: most viewed in general
        return sorted(self.content_items, key=lambda x: x['views'], reverse=True)[:3]

if __name__ == "__main__":
    content = ContentEngine()
    c1 = content.create_content(1, "Top 10 Crypto Tips", "video", "Finance")
    c2 = content.create_content(2, "Best Pizza in NYC", "article", "Food")
    
    content.view_content(c1['id'])
    content.view_content(c1['id'])
    content.view_content(c2['id'])
    
    print(f"Trending: {[i['title'] for i in content.get_trending_content()]}")
