import time

class SocialEngine:
    def __init__(self):
        self.users = {}
        self.posts = []
        self.social_graph = {} # user_id -> set(following_ids)

    def create_user(self, username, profile_data=None):
        user_id = len(self.users) + 1
        self.users[user_id] = {
            "id": user_id,
            "username": username,
            "profile": profile_data or {},
            "created_at": time.time()
        }
        self.social_graph[user_id] = set()
        return self.users[user_id]

    def follow_user(self, follower_id, following_id):
        if follower_id in self.social_graph and following_id in self.social_graph:
            self.social_graph[follower_id].add(following_id)
            return True
        return False

    def create_post(self, user_id, content):
        post = {
            "id": len(self.posts) + 1,
            "user_id": user_id,
            "content": content,
            "likes": 0,
            "comments": [],
            "timestamp": time.time()
        }
        self.posts.append(post)
        return post

    def generate_feed(self, user_id):
        if user_id not in self.social_graph:
            return []
        
        following = self.social_graph[user_id]
        feed = [p for p in self.posts if p['user_id'] in following or p['user_id'] == user_id]
        # Sort by most recent
        feed.sort(key=lambda x: x['timestamp'], reverse=True)
        return feed

    def get_recommendations(self, user_id):
        """Simple recommendation: followers of people you follow"""
        if user_id not in self.social_graph:
            return []
        
        following = self.social_graph[user_id]
        recommendations = set()
        for f_id in following:
            recommendations.update(self.social_graph[f_id])
        
        # Remove self and already following
        recommendations.discard(user_id)
        recommendations = recommendations - following
        return [self.users[rid]['username'] for rid in recommendations if rid in self.users]

if __name__ == "__main__":
    social = SocialEngine()
    u1 = social.create_user("alice")
    u2 = social.create_user("bob")
    u3 = social.create_user("charlie")
    
    social.follow_user(u1['id'], u2['id'])
    social.follow_user(u2['id'], u3['id'])
    
    social.create_post(u2['id'], "Hello from Bob!")
    social.create_post(u3['id'], "Charlie's first post.")
    
    print(f"Alice's Feed: {len(social.generate_feed(u1['id']))} posts")
    print(f"Alice's Recommendations: {social.get_recommendations(u1['id'])}")
