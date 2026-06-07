# ai_feed_ranker.py - Social-Commerce Feed Ranking Algorithm
# Weighting: Tips (x40), Engagement (x15), Stake (x0.8)

class FeedRanker:
    def __init__(self):
        self.TIP_WEIGHT = 40.0
        self.ENGAGEMENT_WEIGHT = 15.0
        self.STAKE_WEIGHT = 0.8
        self.RECENCY_WEIGHT = 0.5

    def calculate_score(self, post_data):
        """
        Calculates the ranking score for a post based on weighted metrics.
        post_data: { 'tips': float, 'likes': int, 'staked_amount': float, 'timestamp': int }
        """
        tip_score = post_data.get('tips', 0) * self.TIP_WEIGHT
        engagement_score = post_data.get('likes', 0) * self.ENGAGEMENT_WEIGHT
        stake_score = post_data.get('staked_amount', 0) * self.STAKE_WEIGHT
        
        # Base ranking score
        base_score = tip_score + engagement_score + stake_score
        
        return base_score

    def rank_feed(self, posts):
        """
        Ranks a list of posts based on their calculated scores.
        """
        for post in posts:
            post['rank_score'] = self.calculate_score(post)
        
        # Sort posts by rank_score in descending order
        ranked_posts = sorted(posts, key=lambda x: x['rank_score'], reverse=True)
        return ranked_posts

if __name__ == "__main__":
    # Test the ranker with production-grade weights
    ranker = FeedRanker()
    test_posts = [
        {'id': 1, 'tips': 10.0, 'likes': 100, 'staked_amount': 1000.0},
        {'id': 2, 'tips': 50.0, 'likes': 20, 'staked_amount': 500.0},
        {'id': 3, 'tips': 0.0, 'likes': 500, 'staked_amount': 5000.0}
    ]
    ranked = ranker.rank_feed(test_posts)
    for p in ranked:
        print(f"Post {p['id']}: Score {p['rank_score']}")
