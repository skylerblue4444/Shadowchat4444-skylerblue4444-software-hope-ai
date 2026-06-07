# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
from fastapi import FastAPI, Request
from database import SessionLocal
from redis_cache import cache_get, cache_set
from rate_limit import check_rate_limit
# ... existing imports ...

app = FastAPI()

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    check_rate_limit(request.client.host)
    return await call_next(request)

@app.get("/balance/{address}")
def get_balance(address: str):
    cached = cache_get(f"balance:{address}")
    if cached:
        return {"balance": float(cached)}
    # fallback to Postgres
    db = SessionLocal()
    user = db.query(UserBalance).filter(UserBalance.address == address).first()
    db.close()
    if user:
        cache_set(f"balance:{address}", str(user.balance))
        return {"balance": user.balance}
    return {"balance": 0.0}