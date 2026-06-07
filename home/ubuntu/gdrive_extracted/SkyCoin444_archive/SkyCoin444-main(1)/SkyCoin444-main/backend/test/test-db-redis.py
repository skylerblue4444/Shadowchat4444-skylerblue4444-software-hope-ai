# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
import pytest
from redis_cache import cache_set, cache_get

def test_redis_cache():
    cache_set("test_key", "test_value")
    assert cache_get("test_key") == b"test_value"