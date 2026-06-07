# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
import redis
from config import REDIS_URL

redis_client = redis.from_url(REDIS_URL)

def cache_get(key: str):
    return redis_client.get(key)

def cache_set(key: str, value: str, expire: int = 300):
    redis_client.set(key, value, ex=expire)