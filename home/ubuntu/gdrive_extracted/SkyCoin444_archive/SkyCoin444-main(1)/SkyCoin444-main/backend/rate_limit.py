# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
from fastapi import HTTPException
from redis_cache import redis_client

def check_rate_limit(user_ip: str, limit: int = 100):
    key = f"rate:{user_ip}"
    count = redis_client.incr(key)
    if count == 1:
        redis_client.expire(key, 60)
    if count > limit:
        raise HTTPException(429, "Too many requests – enterprise rate limit hit")