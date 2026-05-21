import time
from collections import Counter

class AnalyticsEngine:
    def __init__(self):
        self.events = []
        self.dashboards = {}

    def track_event(self, user_id, event_type, metadata=None):
        event = {
            "user_id": user_id,
            "type": event_type,
            "metadata": metadata or {},
            "timestamp": time.time()
        }
        self.events.append(event)
        return event

    def get_metrics(self, event_type=None, time_window=3600):
        now = time.time()
        relevant_events = [e for e in self.events if now - e['timestamp'] <= time_window]
        
        if event_type:
            relevant_events = [e for e in relevant_events if e['type'] == event_type]
            
        return {
            "count": len(relevant_events),
            "unique_users": len(set(e['user_id'] for e in relevant_events)),
            "event_distribution": dict(Counter(e['type'] for e in relevant_events))
        }

    def generate_report(self):
        stats = self.get_metrics(time_window=86400) # 24h
        return f"Daily Report: {stats['count']} events from {stats['unique_users']} users."

if __name__ == "__main__":
    analytics = AnalyticsEngine()
    analytics.track_event(1, "login")
    analytics.track_event(2, "purchase", {"amount": 50})
    analytics.track_event(1, "click", {"button": "buy_now"})
    
    print(f"Real-time Metrics: {analytics.get_metrics()}")
    print(analytics.generate_report())
