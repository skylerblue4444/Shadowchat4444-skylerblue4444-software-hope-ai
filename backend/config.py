# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
import os
from dotenv import load_dotenv
load_dotenv()

POSTGRES_URL = os.getenv("POSTGRES_URL", "postgresql://user:pass@localhost/shadowchat")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
MAX_SUPPLY = 444444444