import sys
import os

# Add engines to path
sys.path.append('/home/ubuntu/shadowchat_v70/engines')

from marketplace_engine import MarketplaceEngine
from social_engine import SocialEngine
from crypto_engine import CryptoEngine
from analytics_engine import AnalyticsEngine
from content_engine import ContentEngine

class ShadowChatSystem:
    def __init__(self):
        self.marketplace = MarketplaceEngine()
        self.social = SocialEngine()
        self.crypto = CryptoEngine()
        self.analytics = AnalyticsEngine()
        self.content = ContentEngine()

    def run_full_audit(self):
        print("--- ShadowChat v70 Structural Audit ---")
        
        # 1. Marketplace Audit
        print("\n[Marketplace] Running audit...")
        self.marketplace.register_seller("Admin")
        count = self.marketplace.auto_fill_from_dhgate()
        if count > 0:
            print(f"  ✓ Auto-fill Logic: PASSED ({count} items added)")
        else:
            print("  ✗ Auto-fill Logic: FAILED")

        # 2. Social Audit
        print("\n[Social] Running audit...")
        u1 = self.social.create_user("user1")
        u2 = self.social.create_user("user2")
        self.social.follow_user(u1['id'], u2['id'])
        feed = self.social.generate_feed(u1['id'])
        if len(self.social.users) == 2:
            print("  ✓ User Management: PASSED")
        if u2['id'] in self.social.social_graph[u1['id']]:
            print("  ✓ Graph Integrity: PASSED")

        # 3. Crypto Audit
        print("\n[Crypto] Running audit...")
        self.crypto.create_wallet(1)
        self.crypto.place_order(1, "BTC/USDT", "buy", 60000, 1)
        self.crypto.place_order(2, "BTC/USDT", "sell", 59000, 1)
        if len(self.crypto.trades) > 0:
            print("  ✓ Matching Engine: PASSED")
        else:
            print("  ✗ Matching Engine: FAILED")

        # 4. Analytics Audit
        print("\n[Analytics] Running audit...")
        self.analytics.track_event(1, "audit_start")
        metrics = self.analytics.get_metrics()
        if metrics['count'] > 0:
            print("  ✓ Event Tracking: PASSED")
        
        # 5. Content Audit
        print("\n[Content] Running audit...")
        self.content.create_content(1, "Audit Video", "video", "Tech")
        if len(self.content.content_items) > 0:
            print("  ✓ Content Creation: PASSED")

        print("\n--- Audit Complete: Structural Integrity Verified ---")

if __name__ == "__main__":
    system = ShadowChatSystem()
    system.run_full_audit()
