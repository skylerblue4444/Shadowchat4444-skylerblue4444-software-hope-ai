# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
def ai_rank_posts(posts, user_staked):
    return sorted(posts, key=lambda p: p['tips'] * 40 + p['likes'] * 15 + user_staked * 0.8, reverse=True)