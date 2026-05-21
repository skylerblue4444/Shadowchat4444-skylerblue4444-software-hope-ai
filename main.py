"""
SKY444 Web3 Super-App — FastAPI Backend
Made by Skyler Blue Spillers — Innovative Information Technology Resolutions LLC
Version: 4.0.0 — Extended API Surface (Analytics, Notifications, Settings,
         Leaderboard, Referrals, API Keys, Vault, Onboarding)
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'blockchain'))

from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import asyncio
import json
import time
import random
import hashlib
import math
import uuid
from datetime import datetime, timedelta

# ─── App Init ─────────────────────────────────────────────────────────────────
app = FastAPI(
    title="SKY444 Super-App API",
    description="Full-stack Web3 Super-App backend — IITRL LLC",
    version="4.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── In-Memory State (production would use PostgreSQL + Redis) ─────────────────
STATE = {
    "block_height": 1847291,
    "total_supply": 444444444.0,
    "circulating_supply": 188000000.0,
    "burned_total": 12444444.0,
    "staked_total": 88000000.0,
    "tps": 227,
    "block_time": 4.4,
    "active_nodes": 4444,
    "sky_price": 0.0444,
    "market_cap": 8347200.0,
    "sky_cycle_block": 444,
    "sky_cycle_progress": 0,
    "difficulty": 5,
    "hash_rate_network": 14200000,  # MH/s
    "last_block_time": time.time(),
}

WALLETS: Dict[str, Dict] = {
    "demo_wallet": {
        "address": "0x7f3a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
        "balance": 44444.0,
        "staked": 10000.0,
        "rewards": 0.0,
        "nonce": 0,
        "username": "SkylerBlue",
        "level": 12,
        "xp": 8750,
        "streak": 7,
    }
}

TRANSACTIONS: List[Dict] = []
BLOCKS: List[Dict] = []
MESSAGES: List[Dict] = []
POSTS: List[Dict] = []
PROPOSALS: List[Dict] = []
NFT_LISTINGS: List[Dict] = []
CHARITY_CAMPAIGNS: List[Dict] = []
ESCROW_CONTRACTS: List[Dict] = []
CASINO_HISTORY: List[Dict] = []
STAKING_POSITIONS: List[Dict] = []
MINING_SESSIONS: Dict[str, Dict] = {}
ACTIVE_STREAMS: List[Dict] = []
CREATOR_PROFILES: List[Dict] = []
PAYROLL_EMPLOYEES: List[Dict] = []
BRIDGE_HISTORY: List[Dict] = []
ICO_PURCHASES: List[Dict] = []

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room: str):
        await websocket.accept()
        if room not in self.active_connections:
            self.active_connections[room] = []
        self.active_connections[room].append(websocket)

    def disconnect(self, websocket: WebSocket, room: str):
        if room in self.active_connections:
            self.active_connections[room].remove(websocket)

    async def broadcast(self, message: dict, room: str):
        if room in self.active_connections:
            dead = []
            for ws in self.active_connections[room]:
                try:
                    await ws.send_json(message)
                except:
                    dead.append(ws)
            for ws in dead:
                self.active_connections[room].remove(ws)

manager = ConnectionManager()

# ─── Seed Data ────────────────────────────────────────────────────────────────
def _seed():
    global BLOCKS, TRANSACTIONS, MESSAGES, POSTS, PROPOSALS, NFT_LISTINGS, CHARITY_CAMPAIGNS, CREATOR_PROFILES, PAYROLL_EMPLOYEES

    # Seed blocks
    for i in range(20):
        bh = STATE["block_height"] - (19 - i)
        BLOCKS.append({
            "height": bh,
            "hash": hashlib.sha256(f"block_{bh}".encode()).hexdigest(),
            "miner": f"0x{random.randint(0,2**32):08x}{'0'*32}",
            "txs": random.randint(1, 12),
            "reward": 444.0,
            "time": int(time.time()) - (19 - i) * 5,
            "size": random.randint(1200, 8000),
        })

    # Seed transactions
    types = ["Send", "Receive", "Stake", "Unstake", "Swap", "Mint NFT", "Casino Win", "Casino Loss", "Tip", "Burn"]
    for i in range(30):
        amt = round(random.uniform(10, 5000), 4)
        t = random.choice(types)
        TRANSACTIONS.append({
            "hash": hashlib.sha256(f"tx_{i}_{time.time()}".encode()).hexdigest()[:64],
            "type": t,
            "from": f"0x{random.randint(0,2**32):08x}{'0'*32}",
            "to": f"0x{random.randint(0,2**32):08x}{'0'*32}",
            "amount": amt,
            "fee": round(amt * 0.005, 6),
            "burn": round(amt * 0.01, 6),
            "time": int(time.time()) - random.randint(0, 3600),
            "status": "confirmed",
            "block": STATE["block_height"] - random.randint(0, 10),
        })

    # Seed chat messages
    users = ["SkylerBlue", "CryptoNinja", "IITRL_Dev", "NFT_Queen", "DeFi_Whale", "Shadow_0x7f"]
    msgs = [
        "SKY444 just hit a new ATH! 🚀",
        "The staking APY at Diamond tier is insane",
        "New smart contract deployed on mainnet ✅",
        "Anyone else mining with 16 threads?",
        "ShadowChat is the future of anonymous social media",
        "Just minted my first NFT on SKY444 marketplace",
        "Charity Hub raised 50,000 SKY444 this week!",
        "DAO proposal #7 passed — bridge expansion approved",
        "Anonymous: The network is growing fast",
        "Buy the dip, ser 👀",
    ]
    for i, msg in enumerate(msgs):
        MESSAGES.append({
            "id": i + 1,
            "user": random.choice(users) if "Anonymous" not in msg else f"Shadow_0x{random.randint(0,65535):04x}",
            "text": msg,
            "time": int(time.time()) - (len(msgs) - i) * 120,
            "shadow": "Anonymous" in msg,
            "tip_total": round(random.uniform(0, 500), 2),
            "room": "global",
        })

    # Seed social posts
    for i in range(15):
        POSTS.append({
            "id": i + 1,
            "user": random.choice(users),
            "content": random.choice([
                "Just earned 444 SKY444 from mining a block! 🎉",
                "The DeFi ecosystem on SKY444 is unmatched",
                "Shadow mode is the future of free speech",
                "Staking rewards hit my wallet — 44.4% APY is real",
                "New NFT collection dropping this week!",
            ]),
            "likes": random.randint(0, 500),
            "tips": round(random.uniform(0, 1000), 2),
            "comments": random.randint(0, 50),
            "time": int(time.time()) - random.randint(0, 86400),
            "shadow": random.random() < 0.3,
            "image": None,
        })

    # Seed DAO proposals
    PROPOSALS.extend([
        {"id": 1, "title": "Increase Bridge Fee to 0.3%", "description": "Proposal to increase cross-chain bridge fee from 0.2% to 0.3% to fund development.", "status": "active", "votes_for": 1847291, "votes_against": 444000, "quorum": 5000000, "end_time": int(time.time()) + 86400 * 3, "proposer": "0x7f3a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a"},
        {"id": 2, "title": "Add Solana Bridge Support", "description": "Expand cross-chain bridge to support Solana (SOL) with 0.2% fee.", "status": "active", "votes_for": 3200000, "votes_against": 800000, "quorum": 5000000, "end_time": int(time.time()) + 86400 * 5, "proposer": "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0"},
        {"id": 3, "title": "Launch NFT Royalty Standard v2", "description": "Implement on-chain royalty enforcement for all NFT trades at 5% creator royalty.", "status": "passed", "votes_for": 7500000, "votes_against": 200000, "quorum": 5000000, "end_time": int(time.time()) - 86400, "proposer": "0xb2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1"},
        {"id": 4, "title": "Reduce Mining Difficulty by 10%", "description": "Temporarily reduce mining difficulty to incentivize new miners joining the network.", "status": "failed", "votes_for": 1000000, "votes_against": 6000000, "quorum": 5000000, "end_time": int(time.time()) - 86400 * 2, "proposer": "0xc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2"},
    ])

    # Seed NFT listings
    rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic"]
    rarity_colors = {"Common": "#94a3b8", "Uncommon": "#10b981", "Rare": "#3b82f6", "Epic": "#a855f7", "Legendary": "#f59e0b", "Mythic": "#ef4444"}
    collections = ["SkyGenesis", "NeonPunk", "CyberForge", "ShadowRealm", "QuantumVault"]
    for i in range(20):
        rarity = random.choice(rarities)
        NFT_LISTINGS.append({
            "id": i + 1,
            "name": f"{random.choice(collections)} #{random.randint(1, 9999)}",
            "collection": random.choice(collections),
            "rarity": rarity,
            "rarity_color": rarity_colors[rarity],
            "price": round(random.uniform(100, 50000), 2),
            "owner": f"0x{random.randint(0,2**32):08x}{'0'*32}",
            "image": f"https://picsum.photos/seed/nft{i}/300/300",
            "listed": True,
            "views": random.randint(10, 5000),
            "likes": random.randint(0, 500),
        })

    # Seed charity campaigns
    CHARITY_CAMPAIGNS.extend([
        {"id": 1, "name": "Feed the World", "description": "Providing meals to food-insecure communities worldwide.", "raised": 125000.0, "goal": 500000.0, "donors": 1847, "impact": "2,812 meals provided", "icon": "🍽", "category": "Hunger"},
        {"id": 2, "name": "Plant 1M Trees", "description": "Global reforestation initiative powered by SKY444 donations.", "raised": 88000.0, "goal": 200000.0, "donors": 3200, "impact": "44,444 trees planted", "icon": "🌳", "category": "Environment"},
        {"id": 3, "name": "Clean Water Initiative", "description": "Building wells and water purification systems in developing regions.", "raised": 44444.0, "goal": 100000.0, "donors": 892, "impact": "1,200 people with clean water", "icon": "💧", "category": "Water"},
        {"id": 4, "name": "Code for Kids", "description": "Teaching blockchain and coding to underprivileged youth.", "raised": 22000.0, "goal": 50000.0, "donors": 445, "impact": "444 kids enrolled", "icon": "💻", "category": "Education"},
        {"id": 5, "name": "Mental Health Awareness", "description": "Funding mental health resources and crisis hotlines.", "raised": 15000.0, "goal": 75000.0, "donors": 312, "impact": "888 counseling sessions funded", "icon": "🧠", "category": "Health"},
    ])

    # Seed creator profiles
    CREATOR_PROFILES.extend([
        {"id": 1, "username": "SkylerBlue", "bio": "Founder of IITRL LLC | Building the future of Web3", "followers": 12444, "subscribers": 888, "tier": "Elite", "total_earned": 44444.0, "content_count": 47, "verified": True},
        {"id": 2, "username": "CryptoNinja", "bio": "DeFi alpha hunter | 10x your portfolio with SKY444", "followers": 8200, "subscribers": 444, "tier": "Pro", "total_earned": 22000.0, "content_count": 123, "verified": True},
        {"id": 3, "username": "NFT_Queen", "bio": "Digital artist | Minting the future on SKY444", "followers": 5600, "subscribers": 200, "tier": "Basic", "total_earned": 8800.0, "content_count": 89, "verified": False},
        {"id": 4, "username": "DeFi_Whale", "bio": "Liquidity provider | Yield farming enthusiast", "followers": 3100, "subscribers": 150, "tier": "Pro", "total_earned": 15000.0, "content_count": 34, "verified": True},
    ])

    # Seed payroll employees
    PAYROLL_EMPLOYEES.extend([
        {"id": 1, "name": "Alice Chen", "role": "Lead Developer", "wallet": "0xabc123def456abc123def456abc123def456abc1", "salary": 5000.0, "status": "active", "last_paid": int(time.time()) - 86400 * 30},
        {"id": 2, "name": "Bob Martinez", "role": "Smart Contract Auditor", "wallet": "0xdef456abc123def456abc123def456abc123def4", "salary": 4500.0, "status": "active", "last_paid": int(time.time()) - 86400 * 30},
        {"id": 3, "name": "Carol Johnson", "role": "UI/UX Designer", "wallet": "0x789abc123def456abc123def456abc123def4567", "salary": 3500.0, "status": "active", "last_paid": int(time.time()) - 86400 * 30},
        {"id": 4, "name": "David Kim", "role": "Community Manager", "wallet": "0x456def789abc123def456abc123def456abc1234", "salary": 2500.0, "status": "paused", "last_paid": int(time.time()) - 86400 * 60},
    ])

    # Seed active streams
    ACTIVE_STREAMS.extend([
        {"id": 1, "title": "SKY444 Trading Live — Catching the Next 10x", "streamer": "SkylerBlue", "viewers": 1247, "tips": 8844.0, "live": True, "category": "Trading", "started": int(time.time()) - 3600},
        {"id": 2, "title": "NFT Minting Session — SkyGenesis Collection", "streamer": "NFT_Queen", "viewers": 432, "tips": 2200.0, "live": True, "category": "NFT", "started": int(time.time()) - 1800},
        {"id": 3, "title": "DeFi Yield Farming Strategies 2026", "streamer": "DeFi_Whale", "viewers": 289, "tips": 1100.0, "live": True, "category": "DeFi", "started": int(time.time()) - 7200},
    ])

_seed()

# ─── Helper Functions ──────────────────────────────────────────────────────────
def _now_ts():
    return int(time.time())

def _gen_tx_hash():
    return hashlib.sha256(f"{uuid.uuid4()}{time.time()}".encode()).hexdigest()

def _gen_address():
    return "0x" + hashlib.sha256(f"{uuid.uuid4()}".encode()).hexdigest()[:40]

def _add_tx(tx_type: str, from_addr: str, to_addr: str, amount: float, wallet_key: str = "demo_wallet"):
    fee = round(amount * 0.005, 6)
    burn = round(amount * 0.01, 6)
    tx = {
        "hash": _gen_tx_hash(),
        "type": tx_type,
        "from": from_addr,
        "to": to_addr,
        "amount": amount,
        "fee": fee,
        "burn": burn,
        "time": _now_ts(),
        "status": "confirmed",
        "block": STATE["block_height"],
    }
    TRANSACTIONS.insert(0, tx)
    STATE["burned_total"] = round(STATE["burned_total"] + burn, 6)
    STATE["circulating_supply"] = round(STATE["circulating_supply"] - burn, 6)
    # Advance block occasionally
    if random.random() < 0.3:
        STATE["block_height"] += 1
        STATE["sky_cycle_progress"] = (STATE["sky_cycle_progress"] + 1) % 444
    return tx

# ─── Pydantic Models ───────────────────────────────────────────────────────────
class SendRequest(BaseModel):
    to_address: str
    amount: float
    memo: Optional[str] = None

class StakeRequest(BaseModel):
    amount: float
    tier: str  # bronze, silver, gold, diamond

class SwapRequest(BaseModel):
    from_token: str
    to_token: str
    amount: float
    slippage: float = 0.5

class BurnRequest(BaseModel):
    amount: float
    confirm: bool = False

class MineRequest(BaseModel):
    threads: int = 4
    pool: str = "official"

class CasinoRequest(BaseModel):
    game: str
    bet: float
    choice: Optional[str] = None
    number: Optional[int] = None

class ChatMessage(BaseModel):
    text: str
    shadow: bool = False
    vanish: bool = False
    room: str = "global"
    tip_to: Optional[str] = None
    tip_amount: Optional[float] = None

class TipRequest(BaseModel):
    to_user: str
    amount: float

class BridgeRequest(BaseModel):
    from_chain: str
    to_chain: str
    token: str
    amount: float
    destination_address: str

class GovernanceVote(BaseModel):
    proposal_id: int
    vote: str  # "for" or "against"
    voting_power: float

class GovernanceProposal(BaseModel):
    title: str
    description: str
    duration_days: int = 7

class NFTMintRequest(BaseModel):
    name: str
    description: str
    rarity: str
    price: float

class NFTBuyRequest(BaseModel):
    nft_id: int

class CharityDonateRequest(BaseModel):
    campaign_id: int
    amount: float

class CreatorSubscribeRequest(BaseModel):
    creator_id: int
    tier: str  # basic, pro, elite

class PayrollRequest(BaseModel):
    employee_ids: List[int]

class AddEmployeeRequest(BaseModel):
    name: str
    role: str
    wallet: str
    salary: float

class SkyForgeRequest(BaseModel):
    materials: List[str]
    sky444_cost: float

class ICOPurchaseRequest(BaseModel):
    amount_usdt: float

class QuestCompleteRequest(BaseModel):
    quest_id: str

# ─── Root / Health ─────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"status": "SKY444 Super-App API v3.0.0 — ONLINE", "block_height": STATE["block_height"]}

@app.get("/health")
def health():
    return {"status": "healthy", "timestamp": _now_ts(), "block_height": STATE["block_height"]}

# ─── Network Stats ─────────────────────────────────────────────────────────────
@app.get("/api/stats")
def get_stats():
    STATE["tps"] = random.randint(180, 280)
    STATE["sky_price"] = round(STATE["sky_price"] * (1 + random.uniform(-0.002, 0.003)), 6)
    STATE["market_cap"] = round(STATE["circulating_supply"] * STATE["sky_price"], 2)
    return {
        "block_height": STATE["block_height"],
        "total_supply": STATE["total_supply"],
        "circulating_supply": round(STATE["circulating_supply"], 2),
        "burned_total": round(STATE["burned_total"], 2),
        "staked_total": round(STATE["staked_total"], 2),
        "tps": STATE["tps"],
        "block_time": STATE["block_time"],
        "active_nodes": STATE["active_nodes"],
        "sky_price": STATE["sky_price"],
        "market_cap": STATE["market_cap"],
        "sky_cycle_progress": STATE["sky_cycle_progress"],
        "difficulty": STATE["difficulty"],
        "hash_rate_network": STATE["hash_rate_network"],
        "timestamp": _now_ts(),
    }

# ─── Wallet / Auth ─────────────────────────────────────────────────────────────
@app.get("/api/wallet")
def get_wallet():
    w = WALLETS["demo_wallet"]
    # Accrue rewards
    if w["staked"] > 0:
        elapsed = 1  # seconds since last check (simplified)
        apy = 0.444
        w["rewards"] = round(w["rewards"] + w["staked"] * apy / (365 * 24 * 3600), 8)
    return {
        "address": w["address"],
        "balance": round(w["balance"], 4),
        "staked": round(w["staked"], 4),
        "rewards": round(w["rewards"], 8),
        "usd_value": round(w["balance"] * STATE["sky_price"], 2),
        "username": w["username"],
        "level": w["level"],
        "xp": w["xp"],
        "streak": w["streak"],
        "nonce": w["nonce"],
    }

@app.post("/api/wallet/send")
def send_tokens(req: SendRequest):
    w = WALLETS["demo_wallet"]
    total = req.amount * 1.005  # amount + fee
    if req.amount <= 0:
        raise HTTPException(400, "Amount must be positive")
    if w["balance"] < total:
        raise HTTPException(400, f"Insufficient balance. Need {total:.4f} SKY444, have {w['balance']:.4f}")
    w["balance"] = round(w["balance"] - total, 4)
    w["nonce"] += 1
    tx = _add_tx("Send", w["address"], req.to_address, req.amount)
    return {"success": True, "tx_hash": tx["hash"], "amount_sent": req.amount, "fee": tx["fee"], "burned": tx["burn"], "new_balance": w["balance"]}

@app.post("/api/wallet/receive")
def generate_receive_address():
    w = WALLETS["demo_wallet"]
    return {"address": w["address"], "qr_data": f"sky444:{w['address']}?amount=0"}

# ─── Mining ────────────────────────────────────────────────────────────────────
@app.post("/api/mining/start")
def start_mining(req: MineRequest):
    session_id = str(uuid.uuid4())
    hashrate = req.threads * 12.5 + random.uniform(-2, 2)
    MINING_SESSIONS[session_id] = {
        "session_id": session_id,
        "threads": req.threads,
        "pool": req.pool,
        "hashrate": round(hashrate, 2),
        "started": _now_ts(),
        "blocks_found": 0,
        "earned": 0.0,
        "active": True,
    }
    return {"success": True, "session_id": session_id, "hashrate": round(hashrate, 2), "threads": req.threads, "pool": req.pool, "message": f"Mining started with {req.threads} threads at {hashrate:.1f} MH/s"}

@app.post("/api/mining/stop/{session_id}")
def stop_mining(session_id: str):
    if session_id not in MINING_SESSIONS:
        raise HTTPException(404, "Mining session not found")
    session = MINING_SESSIONS[session_id]
    session["active"] = False
    return {"success": True, "session_id": session_id, "total_earned": session["earned"], "blocks_found": session["blocks_found"]}

@app.get("/api/mining/status/{session_id}")
def mining_status(session_id: str):
    if session_id not in MINING_SESSIONS:
        raise HTTPException(404, "Mining session not found")
    session = MINING_SESSIONS[session_id]
    if session["active"]:
        elapsed = _now_ts() - session["started"]
        # Simulate mining progress
        session["hashrate"] = round(session["threads"] * 12.5 + random.uniform(-1, 1), 2)
        # Block found probability: ~1 block per 4.4 seconds per session
        if random.random() < 0.05:  # ~5% chance per status check
            reward = 444.0
            session["blocks_found"] += 1
            session["earned"] = round(session["earned"] + reward, 4)
            WALLETS["demo_wallet"]["balance"] = round(WALLETS["demo_wallet"]["balance"] + reward, 4)
            STATE["block_height"] += 1
            STATE["sky_cycle_progress"] = (STATE["sky_cycle_progress"] + 1) % 444
            new_block = {
                "height": STATE["block_height"],
                "hash": _gen_tx_hash(),
                "miner": WALLETS["demo_wallet"]["address"],
                "txs": random.randint(1, 8),
                "reward": reward,
                "time": _now_ts(),
                "size": random.randint(2000, 8000),
            }
            BLOCKS.insert(0, new_block)
            return {**session, "block_found": True, "new_block": new_block, "elapsed": elapsed}
    return {**session, "block_found": False, "elapsed": _now_ts() - session["started"]}

@app.get("/api/mining/pools")
def get_mining_pools():
    return [
        {"name": "SKY444 Official Pool", "id": "official", "fee": "1%", "hashrate": "14.2 TH/s", "miners": 4444, "reward": "444 SKY444/block", "luck": "98%"},
        {"name": "ShadowPool Pro", "id": "shadowpool", "fee": "0.5%", "hashrate": "8.7 TH/s", "miners": 2100, "reward": "444 SKY444/block", "luck": "103%"},
        {"name": "Solo Mining", "id": "solo", "fee": "0%", "hashrate": "Variable", "miners": 1, "reward": "444 SKY444/block", "luck": "Variable"},
    ]

# ─── Staking ───────────────────────────────────────────────────────────────────
STAKING_TIERS = {
    "bronze": {"name": "Bronze", "min": 1000, "apy": 0.111, "lock_days": 30, "color": "#cd7f32"},
    "silver": {"name": "Silver", "min": 10000, "apy": 0.222, "lock_days": 90, "color": "#94a3b8"},
    "gold": {"name": "Gold", "min": 50000, "apy": 0.333, "lock_days": 180, "color": "#f59e0b"},
    "diamond": {"name": "Diamond", "min": 100000, "apy": 0.444, "lock_days": 365, "color": "#06b6d4"},
}

@app.get("/api/staking/info")
def get_staking_info():
    w = WALLETS["demo_wallet"]
    return {
        "tiers": STAKING_TIERS,
        "your_staked": w["staked"],
        "your_rewards": round(w["rewards"], 8),
        "network_total_staked": STATE["staked_total"],
        "your_share": round(w["staked"] / STATE["staked_total"] * 100, 4) if STATE["staked_total"] > 0 else 0,
    }

@app.post("/api/staking/stake")
def stake_tokens(req: StakeRequest):
    w = WALLETS["demo_wallet"]
    tier = STAKING_TIERS.get(req.tier.lower())
    if not tier:
        raise HTTPException(400, "Invalid tier. Choose: bronze, silver, gold, diamond")
    if req.amount < tier["min"]:
        raise HTTPException(400, f"Minimum for {tier['name']} tier is {tier['min']:,} SKY444")
    if w["balance"] < req.amount:
        raise HTTPException(400, f"Insufficient balance. Need {req.amount:,} SKY444")
    w["balance"] = round(w["balance"] - req.amount, 4)
    w["staked"] = round(w["staked"] + req.amount, 4)
    STATE["staked_total"] = round(STATE["staked_total"] + req.amount, 4)
    unlock_date = datetime.now() + timedelta(days=tier["lock_days"])
    STAKING_POSITIONS.append({
        "id": len(STAKING_POSITIONS) + 1,
        "amount": req.amount,
        "tier": req.tier,
        "apy": tier["apy"],
        "staked_at": _now_ts(),
        "unlock_at": int(unlock_date.timestamp()),
        "rewards_earned": 0.0,
    })
    tx = _add_tx("Stake", w["address"], "0xSTAKING_CONTRACT", req.amount)
    return {"success": True, "staked": req.amount, "tier": tier["name"], "apy": f"{tier['apy']*100:.1f}%", "unlock_date": unlock_date.isoformat(), "tx_hash": tx["hash"]}

@app.post("/api/staking/claim")
def claim_rewards():
    w = WALLETS["demo_wallet"]
    if w["rewards"] <= 0:
        raise HTTPException(400, "No rewards to claim")
    rewards = w["rewards"]
    w["balance"] = round(w["balance"] + rewards, 4)
    w["rewards"] = 0.0
    tx = _add_tx("Claim Rewards", "0xSTAKING_CONTRACT", w["address"], rewards)
    return {"success": True, "claimed": round(rewards, 8), "usd_value": round(rewards * STATE["sky_price"], 2), "tx_hash": tx["hash"]}

@app.post("/api/staking/unstake")
def unstake_tokens():
    w = WALLETS["demo_wallet"]
    if w["staked"] <= 0:
        raise HTTPException(400, "No staked tokens to unstake")
    penalty = round(w["staked"] * 0.05, 4)  # 5% early unstake penalty
    returned = round(w["staked"] - penalty, 4)
    w["balance"] = round(w["balance"] + returned, 4)
    STATE["staked_total"] = round(STATE["staked_total"] - w["staked"], 4)
    w["staked"] = 0.0
    tx = _add_tx("Unstake", "0xSTAKING_CONTRACT", w["address"], returned)
    return {"success": True, "returned": returned, "penalty": penalty, "tx_hash": tx["hash"]}

# ─── Swap / DEX ────────────────────────────────────────────────────────────────
SWAP_RATES = {
    "SKY444": {"USDT": 0.0444, "ETH": 0.0000185, "BNB": 0.000072, "MATIC": 0.056, "BTC": 0.00000068},
    "USDT": {"SKY444": 22.52, "ETH": 0.000417, "BNB": 0.00162, "MATIC": 1.26, "BTC": 0.0000153},
    "ETH": {"SKY444": 54054, "USDT": 2398, "BNB": 3.88, "MATIC": 3024, "BTC": 0.0367},
    "BNB": {"SKY444": 13888, "USDT": 617, "ETH": 0.258, "MATIC": 779, "BTC": 0.00945},
}

@app.post("/api/swap/execute")
def execute_swap(req: SwapRequest):
    w = WALLETS["demo_wallet"]
    if req.amount <= 0:
        raise HTTPException(400, "Amount must be positive")
    # Get rate
    rate = SWAP_RATES.get(req.from_token, {}).get(req.to_token)
    if not rate:
        # Try reverse
        rev = SWAP_RATES.get(req.to_token, {}).get(req.from_token)
        if rev:
            rate = 1 / rev
        else:
            rate = 1.0
    # Apply slippage and fee
    fee_pct = 0.003
    price_impact = min(req.amount / 1000000 * 0.1, 0.05)
    effective_rate = rate * (1 - fee_pct - price_impact - req.slippage / 100)
    to_amount = round(req.amount * effective_rate, 6)
    fee = round(req.amount * fee_pct, 6)
    if req.from_token == "SKY444":
        if w["balance"] < req.amount:
            raise HTTPException(400, "Insufficient SKY444 balance")
        w["balance"] = round(w["balance"] - req.amount, 4)
    tx = _add_tx("Swap", w["address"], "0xDEX_CONTRACT", req.amount)
    return {
        "success": True,
        "from_token": req.from_token,
        "to_token": req.to_token,
        "from_amount": req.amount,
        "to_amount": to_amount,
        "rate": rate,
        "fee": fee,
        "price_impact": round(price_impact * 100, 3),
        "tx_hash": tx["hash"],
    }

@app.get("/api/swap/quote")
def get_swap_quote(from_token: str, to_token: str, amount: float):
    rate = SWAP_RATES.get(from_token, {}).get(to_token)
    if not rate:
        rev = SWAP_RATES.get(to_token, {}).get(from_token)
        rate = 1 / rev if rev else 1.0
    fee_pct = 0.003
    price_impact = min(amount / 1000000 * 0.1, 0.05)
    to_amount = round(amount * rate * (1 - fee_pct - price_impact), 6)
    return {"from_token": from_token, "to_token": to_token, "from_amount": amount, "to_amount": to_amount, "rate": rate, "fee": round(amount * fee_pct, 6), "price_impact": round(price_impact * 100, 3)}

@app.get("/api/swap/pools")
def get_liquidity_pools():
    return [
        {"pair": "SKY444/USDT", "tvl": 2400000, "volume_24h": 180000, "apy": 44.4, "fee": 0.3},
        {"pair": "SKY444/ETH", "tvl": 1100000, "volume_24h": 92000, "apy": 38.2, "fee": 0.3},
        {"pair": "SKY444/BNB", "tvl": 680000, "volume_24h": 44000, "apy": 32.1, "fee": 0.3},
        {"pair": "USDT/ETH", "tvl": 4200000, "volume_24h": 320000, "apy": 12.5, "fee": 0.3},
    ]

# ─── Burn ──────────────────────────────────────────────────────────────────────
BURN_HISTORY: List[Dict] = [
    {"amount": 444444.0, "time": _now_ts() - 86400 * 7, "tx": _gen_tx_hash(), "reason": "Sky Cycle Event"},
    {"amount": 100000.0, "time": _now_ts() - 86400 * 14, "tx": _gen_tx_hash(), "reason": "Manual Burn"},
    {"amount": 50000.0, "time": _now_ts() - 86400 * 21, "tx": _gen_tx_hash(), "reason": "Transaction Fees"},
]

@app.post("/api/burn")
def burn_tokens(req: BurnRequest):
    w = WALLETS["demo_wallet"]
    if not req.confirm:
        raise HTTPException(400, "Must confirm burn — this is irreversible")
    if req.amount <= 0:
        raise HTTPException(400, "Amount must be positive")
    if w["balance"] < req.amount:
        raise HTTPException(400, f"Insufficient balance")
    w["balance"] = round(w["balance"] - req.amount, 4)
    STATE["burned_total"] = round(STATE["burned_total"] + req.amount, 4)
    STATE["circulating_supply"] = round(STATE["circulating_supply"] - req.amount, 4)
    tx_hash = _gen_tx_hash()
    BURN_HISTORY.insert(0, {"amount": req.amount, "time": _now_ts(), "tx": tx_hash, "reason": "Manual Burn"})
    return {"success": True, "burned": req.amount, "tx_hash": tx_hash, "total_burned": STATE["burned_total"], "new_balance": w["balance"]}

@app.get("/api/burn/history")
def get_burn_history():
    return {"history": BURN_HISTORY[:20], "total_burned": STATE["burned_total"], "burn_rate": "1% per transaction"}

# ─── Casino ────────────────────────────────────────────────────────────────────
@app.post("/api/casino/play")
def play_casino(req: CasinoRequest):
    w = WALLETS["demo_wallet"]
    if req.bet <= 0:
        raise HTTPException(400, "Bet must be positive")
    if w["balance"] < req.bet:
        raise HTTPException(400, f"Insufficient balance. Need {req.bet} SKY444")
    w["balance"] = round(w["balance"] - req.bet, 4)
    charity_cut = round(req.bet * 0.05, 4)
    CHARITY_CAMPAIGNS[0]["raised"] = round(CHARITY_CAMPAIGNS[0]["raised"] + charity_cut, 2)

    result = {}
    if req.game == "dice":
        roll = random.randint(1, 6)
        choice_num = int(req.choice) if req.choice and req.choice.isdigit() else random.randint(1, 6)
        won = roll == choice_num
        payout = round(req.bet * 5.5, 4) if won else 0
        result = {"roll": roll, "choice": choice_num, "won": won, "payout": payout, "outcome": f"Rolled {roll}"}

    elif req.game == "coinflip":
        flip = random.choice(["heads", "tails"])
        choice = req.choice or "heads"
        won = flip == choice
        payout = round(req.bet * 1.95, 4) if won else 0
        result = {"flip": flip, "choice": choice, "won": won, "payout": payout, "outcome": f"Coin landed on {flip}"}

    elif req.game == "slots":
        symbols = ["🍒", "🍋", "🔔", "⭐", "💎", "7️⃣", "🎰"]
        reels = [random.choice(symbols) for _ in range(3)]
        if reels[0] == reels[1] == reels[2]:
            if reels[0] == "💎":
                payout = round(req.bet * 100, 4)
            elif reels[0] == "7️⃣":
                payout = round(req.bet * 50, 4)
            else:
                payout = round(req.bet * 10, 4)
            won = True
        elif reels[0] == reels[1] or reels[1] == reels[2]:
            payout = round(req.bet * 2, 4)
            won = True
        else:
            payout = 0
            won = False
        result = {"reels": reels, "won": won, "payout": payout, "outcome": " | ".join(reels)}

    elif req.game == "roulette":
        spin = random.randint(0, 36)
        choice = req.choice or "red"
        red_numbers = {1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36}
        if choice == "red":
            won = spin in red_numbers
            payout = round(req.bet * 1.95, 4) if won else 0
        elif choice == "black":
            won = spin not in red_numbers and spin != 0
            payout = round(req.bet * 1.95, 4) if won else 0
        elif choice == "green":
            won = spin == 0
            payout = round(req.bet * 35, 4) if won else 0
        elif choice.isdigit():
            won = spin == int(choice)
            payout = round(req.bet * 35, 4) if won else 0
        else:
            won = False
            payout = 0
        result = {"spin": spin, "choice": choice, "won": won, "payout": payout, "outcome": f"Ball landed on {spin}"}
    else:
        raise HTTPException(400, f"Unknown game: {req.game}")

    if result.get("won") and result.get("payout", 0) > 0:
        w["balance"] = round(w["balance"] + result["payout"], 4)
        net = round(result["payout"] - req.bet, 4)
    else:
        net = -req.bet

    CASINO_HISTORY.insert(0, {
        "game": req.game,
        "bet": req.bet,
        "payout": result.get("payout", 0),
        "won": result.get("won", False),
        "net": net,
        "charity_cut": charity_cut,
        "time": _now_ts(),
        **result,
    })
    return {
        "success": True,
        "game": req.game,
        "bet": req.bet,
        "charity_donated": charity_cut,
        "new_balance": w["balance"],
        "net": net,
        **result,
    }

@app.get("/api/casino/history")
def get_casino_history():
    total_wagered = sum(h["bet"] for h in CASINO_HISTORY)
    total_won = sum(h["payout"] for h in CASINO_HISTORY)
    total_donated = sum(h["charity_cut"] for h in CASINO_HISTORY)
    return {
        "history": CASINO_HISTORY[:20],
        "stats": {
            "total_wagered": round(total_wagered, 4),
            "total_won": round(total_won, 4),
            "total_donated_to_charity": round(total_donated, 4),
            "win_rate": round(sum(1 for h in CASINO_HISTORY if h["won"]) / max(len(CASINO_HISTORY), 1) * 100, 1),
        }
    }

# ─── ShadowChat ────────────────────────────────────────────────────────────────
@app.get("/api/chat/messages")
def get_messages(room: str = "global", limit: int = 50):
    msgs = [m for m in MESSAGES if m.get("room", "global") == room]
    return {"messages": msgs[-limit:], "count": len(msgs)}

@app.post("/api/chat/send")
def send_message(req: ChatMessage):
    w = WALLETS["demo_wallet"]
    if req.tip_to and req.tip_amount and req.tip_amount > 0:
        if w["balance"] < req.tip_amount:
            raise HTTPException(400, "Insufficient balance for tip")
        w["balance"] = round(w["balance"] - req.tip_amount, 4)
        _add_tx("Tip", w["address"], f"0x{req.tip_to[:40]}", req.tip_amount)

    msg = {
        "id": len(MESSAGES) + 1,
        "user": f"Shadow_0x{random.randint(0,65535):04x}" if req.shadow else w["username"],
        "text": req.text,
        "time": _now_ts(),
        "shadow": req.shadow,
        "vanish": req.vanish,
        "tip_total": req.tip_amount or 0,
        "room": req.room,
    }
    MESSAGES.append(msg)
    return {"success": True, "message": msg}

@app.get("/api/chat/posts")
def get_posts(limit: int = 20):
    return {"posts": sorted(POSTS, key=lambda x: x["time"], reverse=True)[:limit]}

@app.post("/api/chat/post")
def create_post(req: ChatMessage):
    w = WALLETS["demo_wallet"]
    post = {
        "id": len(POSTS) + 1,
        "user": f"Shadow_0x{random.randint(0,65535):04x}" if req.shadow else w["username"],
        "content": req.text,
        "likes": 0,
        "tips": 0.0,
        "comments": 0,
        "time": _now_ts(),
        "shadow": req.shadow,
        "image": None,
    }
    POSTS.insert(0, post)
    return {"success": True, "post": post}

@app.post("/api/chat/tip")
def tip_user(req: TipRequest):
    w = WALLETS["demo_wallet"]
    if req.amount <= 0:
        raise HTTPException(400, "Tip amount must be positive")
    if w["balance"] < req.amount:
        raise HTTPException(400, "Insufficient balance")
    w["balance"] = round(w["balance"] - req.amount, 4)
    tx = _add_tx("Tip", w["address"], f"0x{req.to_user[:40].ljust(40,'0')}", req.amount)
    return {"success": True, "tipped": req.amount, "to": req.to_user, "tx_hash": tx["hash"]}

@app.get("/api/chat/voice-rooms")
def get_voice_rooms():
    return [
        {"id": 1, "name": "SKY444 Trading Talk", "participants": 142, "live": True, "tips_total": 8844.0},
        {"id": 2, "name": "DeFi Alpha Lounge", "participants": 87, "live": True, "tips_total": 3200.0},
        {"id": 3, "name": "IITRL Dev Chat", "participants": 34, "live": True, "tips_total": 1100.0},
        {"id": 4, "name": "NFT Collectors", "participants": 21, "live": False, "tips_total": 440.0},
    ]

# ─── WebSocket: Real-time Chat ─────────────────────────────────────────────────
@app.websocket("/ws/chat/{room}")
async def websocket_chat(websocket: WebSocket, room: str):
    await manager.connect(websocket, f"chat_{room}")
    try:
        # Send last 20 messages on connect
        msgs = [m for m in MESSAGES if m.get("room", "global") == room][-20:]
        await websocket.send_json({"type": "history", "messages": msgs})
        while True:
            data = await websocket.receive_json()
            w = WALLETS["demo_wallet"]
            msg = {
                "id": len(MESSAGES) + 1,
                "user": f"Shadow_0x{random.randint(0,65535):04x}" if data.get("shadow") else w["username"],
                "text": data.get("text", ""),
                "time": _now_ts(),
                "shadow": data.get("shadow", False),
                "vanish": data.get("vanish", False),
                "tip_total": 0,
                "room": room,
            }
            MESSAGES.append(msg)
            await manager.broadcast({"type": "message", "message": msg}, f"chat_{room}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, f"chat_{room}")

# ─── WebSocket: Mining Feed ────────────────────────────────────────────────────
@app.websocket("/ws/mining/{session_id}")
async def websocket_mining(websocket: WebSocket, session_id: str):
    await manager.connect(websocket, f"mining_{session_id}")
    try:
        while True:
            await asyncio.sleep(1)
            if session_id not in MINING_SESSIONS or not MINING_SESSIONS[session_id]["active"]:
                await websocket.send_json({"type": "stopped"})
                break
            session = MINING_SESSIONS[session_id]
            session["hashrate"] = round(session["threads"] * 12.5 + random.uniform(-0.5, 0.5), 2)
            block_found = random.random() < 0.02
            if block_found:
                reward = 444.0
                session["blocks_found"] += 1
                session["earned"] = round(session["earned"] + reward, 4)
                WALLETS["demo_wallet"]["balance"] = round(WALLETS["demo_wallet"]["balance"] + reward, 4)
                STATE["block_height"] += 1
                STATE["sky_cycle_progress"] = (STATE["sky_cycle_progress"] + 1) % 444
                await websocket.send_json({
                    "type": "block_found",
                    "block_height": STATE["block_height"],
                    "reward": reward,
                    "total_earned": session["earned"],
                    "hashrate": session["hashrate"],
                })
            else:
                await websocket.send_json({
                    "type": "update",
                    "hashrate": session["hashrate"],
                    "total_earned": session["earned"],
                    "blocks_found": session["blocks_found"],
                    "sky_cycle_progress": STATE["sky_cycle_progress"],
                    "block_height": STATE["block_height"],
                })
    except WebSocketDisconnect:
        manager.disconnect(websocket, f"mining_{session_id}")

# ─── WebSocket: Live Stats Feed ────────────────────────────────────────────────
@app.websocket("/ws/stats")
async def websocket_stats(websocket: WebSocket):
    await manager.connect(websocket, "stats")
    try:
        while True:
            await asyncio.sleep(2)
            STATE["tps"] = random.randint(180, 280)
            STATE["sky_price"] = round(STATE["sky_price"] * (1 + random.uniform(-0.001, 0.002)), 6)
            await websocket.send_json({
                "type": "stats",
                "block_height": STATE["block_height"],
                "tps": STATE["tps"],
                "sky_price": STATE["sky_price"],
                "sky_cycle_progress": STATE["sky_cycle_progress"],
                "burned_total": STATE["burned_total"],
            })
    except WebSocketDisconnect:
        manager.disconnect(websocket, "stats")

# ─── Block Explorer ────────────────────────────────────────────────────────────
@app.get("/api/explorer/blocks")
def get_blocks(limit: int = 20):
    return {"blocks": BLOCKS[:limit], "total": STATE["block_height"]}

@app.get("/api/explorer/transactions")
def get_transactions(limit: int = 30):
    return {"transactions": TRANSACTIONS[:limit], "total": len(TRANSACTIONS)}

@app.get("/api/explorer/search/{query}")
def search_explorer(query: str):
    # Search by tx hash
    tx_match = next((t for t in TRANSACTIONS if t["hash"].startswith(query)), None)
    if tx_match:
        return {"type": "transaction", "data": tx_match}
    # Search by block height
    try:
        height = int(query)
        block_match = next((b for b in BLOCKS if b["height"] == height), None)
        if block_match:
            return {"type": "block", "data": block_match}
    except:
        pass
    # Address lookup
    if query.startswith("0x"):
        return {"type": "address", "data": {"address": query, "balance": round(random.uniform(100, 50000), 4), "tx_count": random.randint(1, 500)}}
    return {"type": "not_found", "data": None}

@app.get("/api/explorer/stats")
def get_explorer_stats():
    return {
        "block_height": STATE["block_height"],
        "total_transactions": len(TRANSACTIONS),
        "tps": STATE["tps"],
        "block_time": STATE["block_time"],
        "total_supply": STATE["total_supply"],
        "circulating_supply": STATE["circulating_supply"],
        "burned_total": STATE["burned_total"],
        "active_nodes": STATE["active_nodes"],
        "hash_rate": STATE["hash_rate_network"],
        "difficulty": STATE["difficulty"],
    }

# ─── Governance / DAO ──────────────────────────────────────────────────────────
@app.get("/api/governance/proposals")
def get_proposals():
    return {"proposals": PROPOSALS, "total": len(PROPOSALS)}

@app.post("/api/governance/vote")
def cast_vote(req: GovernanceVote):
    w = WALLETS["demo_wallet"]
    proposal = next((p for p in PROPOSALS if p["id"] == req.proposal_id), None)
    if not proposal:
        raise HTTPException(404, "Proposal not found")
    if proposal["status"] != "active":
        raise HTTPException(400, "Proposal is not active")
    if w["staked"] <= 0:
        raise HTTPException(400, "You must have staked SKY444 to vote")
    voting_power = min(req.voting_power, w["staked"])
    if req.vote == "for":
        proposal["votes_for"] += voting_power
    elif req.vote == "against":
        proposal["votes_against"] += voting_power
    else:
        raise HTTPException(400, "Vote must be 'for' or 'against'")
    # Check if quorum reached
    total_votes = proposal["votes_for"] + proposal["votes_against"]
    if total_votes >= proposal["quorum"]:
        proposal["status"] = "passed" if proposal["votes_for"] > proposal["votes_against"] else "failed"
    return {"success": True, "proposal_id": req.proposal_id, "vote": req.vote, "voting_power": voting_power, "new_for": proposal["votes_for"], "new_against": proposal["votes_against"]}

@app.post("/api/governance/propose")
def create_proposal(req: GovernanceProposal):
    w = WALLETS["demo_wallet"]
    if w["staked"] < 10000:
        raise HTTPException(400, "Need at least 10,000 staked SKY444 to create proposals")
    proposal = {
        "id": len(PROPOSALS) + 1,
        "title": req.title,
        "description": req.description,
        "status": "active",
        "votes_for": 0,
        "votes_against": 0,
        "quorum": 5000000,
        "end_time": int((datetime.now() + timedelta(days=req.duration_days)).timestamp()),
        "proposer": w["address"],
    }
    PROPOSALS.insert(0, proposal)
    return {"success": True, "proposal": proposal}

# ─── Charity Hub ───────────────────────────────────────────────────────────────
@app.get("/api/charity/campaigns")
def get_campaigns():
    return {"campaigns": CHARITY_CAMPAIGNS, "total_raised": sum(c["raised"] for c in CHARITY_CAMPAIGNS)}

@app.post("/api/charity/donate")
def donate(req: CharityDonateRequest):
    w = WALLETS["demo_wallet"]
    campaign = next((c for c in CHARITY_CAMPAIGNS if c["id"] == req.campaign_id), None)
    if not campaign:
        raise HTTPException(404, "Campaign not found")
    if req.amount <= 0:
        raise HTTPException(400, "Donation must be positive")
    if w["balance"] < req.amount:
        raise HTTPException(400, "Insufficient balance")
    w["balance"] = round(w["balance"] - req.amount, 4)
    campaign["raised"] = round(campaign["raised"] + req.amount, 2)
    campaign["donors"] += 1
    tx = _add_tx("Charity Donation", w["address"], f"0xCHARITY_{campaign['id']}", req.amount)
    return {"success": True, "donated": req.amount, "campaign": campaign["name"], "new_total": campaign["raised"], "tx_hash": tx["hash"]}

# ─── NFT Marketplace ───────────────────────────────────────────────────────────
@app.get("/api/nft/listings")
def get_nft_listings(rarity: Optional[str] = None, collection: Optional[str] = None):
    listings = NFT_LISTINGS
    if rarity:
        listings = [n for n in listings if n["rarity"].lower() == rarity.lower()]
    if collection:
        listings = [n for n in listings if n["collection"].lower() == collection.lower()]
    return {"listings": listings, "total": len(listings)}

@app.post("/api/nft/mint")
def mint_nft(req: NFTMintRequest):
    w = WALLETS["demo_wallet"]
    mint_cost = {"Common": 100, "Uncommon": 500, "Rare": 1000, "Epic": 5000, "Legendary": 10000, "Mythic": 50000}.get(req.rarity, 100)
    if w["balance"] < mint_cost:
        raise HTTPException(400, f"Insufficient balance. Minting {req.rarity} NFT costs {mint_cost} SKY444")
    w["balance"] = round(w["balance"] - mint_cost, 4)
    nft = {
        "id": len(NFT_LISTINGS) + 1,
        "name": req.name,
        "collection": "User Minted",
        "rarity": req.rarity,
        "rarity_color": {"Common": "#94a3b8", "Uncommon": "#10b981", "Rare": "#3b82f6", "Epic": "#a855f7", "Legendary": "#f59e0b", "Mythic": "#ef4444"}.get(req.rarity, "#94a3b8"),
        "price": req.price,
        "owner": w["address"],
        "image": f"https://picsum.photos/seed/{req.name}/300/300",
        "listed": req.price > 0,
        "views": 0,
        "likes": 0,
    }
    NFT_LISTINGS.insert(0, nft)
    tx = _add_tx("Mint NFT", w["address"], "0xNFT_CONTRACT", mint_cost)
    return {"success": True, "nft": nft, "mint_cost": mint_cost, "tx_hash": tx["hash"]}

@app.post("/api/nft/buy")
def buy_nft(req: NFTBuyRequest):
    w = WALLETS["demo_wallet"]
    nft = next((n for n in NFT_LISTINGS if n["id"] == req.nft_id), None)
    if not nft:
        raise HTTPException(404, "NFT not found")
    if not nft["listed"]:
        raise HTTPException(400, "NFT is not listed for sale")
    marketplace_fee = round(nft["price"] * 0.025, 4)
    total = nft["price"] + marketplace_fee
    if w["balance"] < total:
        raise HTTPException(400, f"Insufficient balance. Need {total:.2f} SKY444")
    w["balance"] = round(w["balance"] - total, 4)
    nft["owner"] = w["address"]
    nft["listed"] = False
    tx = _add_tx("Buy NFT", w["address"], nft["owner"], nft["price"])
    return {"success": True, "nft": nft, "price": nft["price"], "fee": marketplace_fee, "tx_hash": tx["hash"]}

# ─── Cross-Chain Bridge ────────────────────────────────────────────────────────
@app.post("/api/bridge/initiate")
def initiate_bridge(req: BridgeRequest):
    w = WALLETS["demo_wallet"]
    fee = round(req.amount * 0.002, 6)
    total = req.amount + fee
    if req.from_chain == "SKY444" and req.token == "SKY444":
        if w["balance"] < total:
            raise HTTPException(400, f"Insufficient balance")
        w["balance"] = round(w["balance"] - total, 4)
    bridge_id = str(uuid.uuid4())[:8].upper()
    settle_minutes = random.randint(5, 15)
    bridge_tx = {
        "id": bridge_id,
        "from_chain": req.from_chain,
        "to_chain": req.to_chain,
        "token": req.token,
        "amount": req.amount,
        "fee": fee,
        "destination": req.destination_address,
        "status": "pending",
        "initiated": _now_ts(),
        "estimated_completion": _now_ts() + settle_minutes * 60,
        "settle_minutes": settle_minutes,
    }
    BRIDGE_HISTORY.insert(0, bridge_tx)
    return {"success": True, "bridge_id": bridge_id, "fee": fee, "estimated_minutes": settle_minutes, "status": "pending", "tx": bridge_tx}

@app.get("/api/bridge/history")
def get_bridge_history():
    # Update statuses
    for tx in BRIDGE_HISTORY:
        if tx["status"] == "pending" and _now_ts() > tx["estimated_completion"]:
            tx["status"] = "completed"
    return {"history": BRIDGE_HISTORY[:20]}

@app.get("/api/bridge/chains")
def get_supported_chains():
    return [
        {"id": "SKY444", "name": "SKY444 Mainnet", "icon": "⬡", "fee": "0.2%"},
        {"id": "ETH", "name": "Ethereum", "icon": "⟠", "fee": "0.2%"},
        {"id": "BSC", "name": "BNB Smart Chain", "icon": "⬡", "fee": "0.2%"},
        {"id": "MATIC", "name": "Polygon", "icon": "⬡", "fee": "0.2%"},
        {"id": "BTC", "name": "Bitcoin", "icon": "₿", "fee": "0.2%"},
        {"id": "XMR", "name": "Monero", "icon": "ɱ", "fee": "0.2%"},
    ]

# ─── Creator Economy ───────────────────────────────────────────────────────────
@app.get("/api/creator/profiles")
def get_creator_profiles():
    return {"creators": CREATOR_PROFILES}

@app.post("/api/creator/subscribe")
def subscribe_to_creator(req: CreatorSubscribeRequest):
    w = WALLETS["demo_wallet"]
    tier_prices = {"basic": 100, "pro": 500, "elite": 2000}
    price = tier_prices.get(req.tier.lower(), 100)
    if w["balance"] < price:
        raise HTTPException(400, f"Insufficient balance. {req.tier.title()} subscription costs {price} SKY444/month")
    creator = next((c for c in CREATOR_PROFILES if c["id"] == req.creator_id), None)
    if not creator:
        raise HTTPException(404, "Creator not found")
    w["balance"] = round(w["balance"] - price, 4)
    creator["subscribers"] += 1
    creator_cut = round(price * 0.95, 4)
    creator["total_earned"] = round(creator["total_earned"] + creator_cut, 4)
    tx = _add_tx("Subscribe", w["address"], f"0xCREATOR_{req.creator_id}", price)
    return {"success": True, "creator": creator["username"], "tier": req.tier, "price": price, "creator_receives": creator_cut, "tx_hash": tx["hash"]}

@app.post("/api/creator/tip")
def tip_creator(req: TipRequest):
    w = WALLETS["demo_wallet"]
    if req.amount <= 0:
        raise HTTPException(400, "Tip must be positive")
    if w["balance"] < req.amount:
        raise HTTPException(400, "Insufficient balance")
    w["balance"] = round(w["balance"] - req.amount, 4)
    creator_cut = round(req.amount * 0.95, 4)
    tx = _add_tx("Creator Tip", w["address"], f"0xCREATOR_{req.to_user}", req.amount)
    return {"success": True, "tipped": req.amount, "creator_receives": creator_cut, "platform_fee": round(req.amount * 0.05, 4), "tx_hash": tx["hash"]}

# ─── Live Streaming ────────────────────────────────────────────────────────────
@app.get("/api/live/streams")
def get_live_streams():
    return {"streams": ACTIVE_STREAMS, "total_viewers": sum(s["viewers"] for s in ACTIVE_STREAMS)}

@app.post("/api/live/go-live")
def go_live(title: str, category: str = "General"):
    w = WALLETS["demo_wallet"]
    stream = {
        "id": len(ACTIVE_STREAMS) + 1,
        "title": title,
        "streamer": w["username"],
        "viewers": 0,
        "tips": 0.0,
        "live": True,
        "category": category,
        "started": _now_ts(),
    }
    ACTIVE_STREAMS.insert(0, stream)
    return {"success": True, "stream": stream, "stream_key": f"sky444-{uuid.uuid4().hex[:12]}"}

# ─── ICO / Token Sale ──────────────────────────────────────────────────────────
ICO_STATE = {
    "total_raised": 2847291.0,
    "hard_cap": 10000000.0,
    "price_per_sky": 0.0444,
    "end_time": int((datetime.now() + timedelta(days=14)).timestamp()),
    "tiers": [
        {"name": "Seed", "price": 0.0111, "allocation": 22222222, "sold": 22222222, "status": "sold_out"},
        {"name": "Private", "price": 0.0222, "allocation": 44444444, "sold": 44444444, "status": "sold_out"},
        {"name": "Public A", "price": 0.0333, "allocation": 44444444, "sold": 40000000, "status": "active"},
        {"name": "Public B", "price": 0.0444, "allocation": 44444444, "sold": 0, "status": "upcoming"},
        {"name": "Public C", "price": 0.0555, "allocation": 44444444, "sold": 0, "status": "upcoming"},
    ]
}

@app.get("/api/ico/info")
def get_ico_info():
    return ICO_STATE

@app.post("/api/ico/buy")
def buy_ico(req: ICOPurchaseRequest):
    if req.amount_usdt <= 0:
        raise HTTPException(400, "Amount must be positive")
    active_tier = next((t for t in ICO_STATE["tiers"] if t["status"] == "active"), None)
    if not active_tier:
        raise HTTPException(400, "No active ICO tier")
    sky_amount = round(req.amount_usdt / active_tier["price"], 4)
    ICO_STATE["total_raised"] = round(ICO_STATE["total_raised"] + req.amount_usdt, 2)
    active_tier["sold"] += sky_amount
    if active_tier["sold"] >= active_tier["allocation"]:
        active_tier["status"] = "sold_out"
        # Activate next tier
        for t in ICO_STATE["tiers"]:
            if t["status"] == "upcoming":
                t["status"] = "active"
                break
    purchase = {"amount_usdt": req.amount_usdt, "sky_amount": sky_amount, "price": active_tier["price"], "tier": active_tier["name"], "time": _now_ts()}
    ICO_PURCHASES.append(purchase)
    return {"success": True, "sky_purchased": sky_amount, "usdt_spent": req.amount_usdt, "price": active_tier["price"], "tier": active_tier["name"]}

# ─── SkyForge / Payroll ────────────────────────────────────────────────────────
@app.get("/api/payroll/employees")
def get_employees():
    total_monthly = sum(e["salary"] for e in PAYROLL_EMPLOYEES if e["status"] == "active")
    return {"employees": PAYROLL_EMPLOYEES, "total_monthly_cost": total_monthly}

@app.post("/api/payroll/run")
def run_payroll(req: PayrollRequest):
    w = WALLETS["demo_wallet"]
    employees_to_pay = [e for e in PAYROLL_EMPLOYEES if e["id"] in req.employee_ids and e["status"] == "active"]
    total = sum(e["salary"] for e in employees_to_pay)
    if w["balance"] < total:
        raise HTTPException(400, f"Insufficient balance. Payroll requires {total:,.2f} SKY444")
    w["balance"] = round(w["balance"] - total, 4)
    txs = []
    for emp in employees_to_pay:
        tx = _add_tx("Payroll", w["address"], emp["wallet"], emp["salary"])
        emp["last_paid"] = _now_ts()
        txs.append({"employee": emp["name"], "amount": emp["salary"], "tx_hash": tx["hash"]})
    return {"success": True, "total_paid": total, "employees_paid": len(employees_to_pay), "transactions": txs}

@app.post("/api/payroll/add-employee")
def add_employee(req: AddEmployeeRequest):
    emp = {"id": len(PAYROLL_EMPLOYEES) + 1, "name": req.name, "role": req.role, "wallet": req.wallet, "salary": req.salary, "status": "active", "last_paid": None}
    PAYROLL_EMPLOYEES.append(emp)
    return {"success": True, "employee": emp}

@app.post("/api/skyforge/forge")
def forge_item(req: SkyForgeRequest):
    w = WALLETS["demo_wallet"]
    if w["balance"] < req.sky444_cost:
        raise HTTPException(400, f"Insufficient balance. Forging costs {req.sky444_cost} SKY444")
    w["balance"] = round(w["balance"] - req.sky444_cost, 4)
    rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary"]
    weights = [40, 30, 20, 8, 2]
    rarity = random.choices(rarities, weights=weights)[0]
    item = {
        "name": f"Forged {rarity} Item",
        "rarity": rarity,
        "materials_used": req.materials,
        "sky444_cost": req.sky444_cost,
        "forged_at": _now_ts(),
    }
    tx = _add_tx("SkyForge", w["address"], "0xFORGE_CONTRACT", req.sky444_cost)
    return {"success": True, "item": item, "tx_hash": tx["hash"]}

# ─── Daily Quests ──────────────────────────────────────────────────────────────
QUEST_DEFINITIONS = [
    {"id": "mine_block", "title": "Mine a Block", "description": "Mine at least 1 block today", "xp": 500, "reward": 44.4, "type": "daily"},
    {"id": "send_tx", "title": "Send a Transaction", "description": "Send SKY444 to any address", "xp": 200, "reward": 10.0, "type": "daily"},
    {"id": "stake_tokens", "title": "Stake SKY444", "description": "Stake any amount of SKY444", "xp": 300, "reward": 25.0, "type": "daily"},
    {"id": "tip_creator", "title": "Tip a Creator", "description": "Tip any creator 10+ SKY444", "xp": 150, "reward": 15.0, "type": "daily"},
    {"id": "casino_play", "title": "Play Casino", "description": "Play any casino game", "xp": 100, "reward": 5.0, "type": "daily"},
    {"id": "donate_charity", "title": "Donate to Charity", "description": "Donate to any charity campaign", "xp": 400, "reward": 40.0, "type": "daily"},
    {"id": "weekly_burn", "title": "Burn SKY444", "description": "Burn 100+ SKY444 this week", "xp": 1000, "reward": 100.0, "type": "weekly"},
    {"id": "weekly_nft", "title": "NFT Collector", "description": "Buy or mint 3 NFTs this week", "xp": 750, "reward": 75.0, "type": "weekly"},
]

COMPLETED_QUESTS: List[str] = []

@app.get("/api/quests")
def get_quests():
    w = WALLETS["demo_wallet"]
    quests_with_status = []
    for q in QUEST_DEFINITIONS:
        quests_with_status.append({**q, "completed": q["id"] in COMPLETED_QUESTS})
    return {
        "quests": quests_with_status,
        "player": {"level": w["level"], "xp": w["xp"], "streak": w["streak"]},
        "xp_to_next_level": (w["level"] + 1) * 1000 - w["xp"],
    }

@app.post("/api/quests/complete")
def complete_quest(req: QuestCompleteRequest):
    w = WALLETS["demo_wallet"]
    quest = next((q for q in QUEST_DEFINITIONS if q["id"] == req.quest_id), None)
    if not quest:
        raise HTTPException(404, "Quest not found")
    if req.quest_id in COMPLETED_QUESTS:
        raise HTTPException(400, "Quest already completed")
    COMPLETED_QUESTS.append(req.quest_id)
    streak_bonus = 1 + min(w["streak"] * 0.05, 0.5)
    xp_earned = int(quest["xp"] * streak_bonus)
    reward_earned = round(quest["reward"] * streak_bonus, 4)
    w["xp"] += xp_earned
    w["balance"] = round(w["balance"] + reward_earned, 4)
    # Level up check
    while w["xp"] >= (w["level"] + 1) * 1000:
        w["level"] += 1
    return {"success": True, "quest": quest["title"], "xp_earned": xp_earned, "reward_earned": reward_earned, "new_xp": w["xp"], "new_level": w["level"], "streak_bonus": f"{(streak_bonus-1)*100:.0f}%"}

# ─── Profile ───────────────────────────────────────────────────────────────────
@app.get("/api/profile")
def get_profile():
    w = WALLETS["demo_wallet"]
    return {
        "address": w["address"],
        "username": w["username"],
        "level": w["level"],
        "xp": w["xp"],
        "streak": w["streak"],
        "balance": round(w["balance"], 4),
        "staked": round(w["staked"], 4),
        "total_transactions": len([t for t in TRANSACTIONS if t["from"] == w["address"] or t["to"] == w["address"]]),
        "nfts_owned": len([n for n in NFT_LISTINGS if n["owner"] == w["address"]]),
        "quests_completed": len(COMPLETED_QUESTS),
        "badges": ["Early Adopter", "Diamond Staker", "Block Miner", "Charity Hero", "NFT Collector"],
    }

@app.put("/api/profile/update")
def update_profile(username: str, bio: Optional[str] = None):
    WALLETS["demo_wallet"]["username"] = username
    return {"success": True, "username": username}

# ─── Invest ────────────────────────────────────────────────────────────────────
@app.get("/api/invest/portfolio")
def get_portfolio():
    w = WALLETS["demo_wallet"]
    holdings = [
        {"asset": "SKY444", "amount": w["balance"], "price": STATE["sky_price"], "value": round(w["balance"] * STATE["sky_price"], 2), "change_24h": round(random.uniform(-5, 8), 2)},
        {"asset": "SKY444 (Staked)", "amount": w["staked"], "price": STATE["sky_price"], "value": round(w["staked"] * STATE["sky_price"], 2), "change_24h": round(random.uniform(-5, 8), 2)},
        {"asset": "ETH", "amount": round(random.uniform(0.1, 2.0), 4), "price": 2398.0, "value": round(random.uniform(240, 4800), 2), "change_24h": round(random.uniform(-3, 5), 2)},
        {"asset": "BTC", "amount": round(random.uniform(0.001, 0.1), 6), "price": 65000.0, "value": round(random.uniform(65, 6500), 2), "change_24h": round(random.uniform(-2, 4), 2)},
    ]
    total_value = sum(h["value"] for h in holdings)
    return {"holdings": holdings, "total_value": round(total_value, 2), "total_value_usd": round(total_value, 2)}

# ─── IT Portal ─────────────────────────────────────────────────────────────────
IT_SERVICES = [
    {"id": 1, "name": "Ethical Hacking & Penetration Testing", "price": 2500, "duration": "1-2 weeks", "category": "Security"},
    {"id": 2, "name": "Blockchain Development", "price": 5000, "duration": "2-4 weeks", "category": "Development"},
    {"id": 3, "name": "Smart Contract Audit", "price": 3000, "duration": "1 week", "category": "Security"},
    {"id": 4, "name": "Managed IT Services", "price": 1500, "duration": "Monthly", "category": "Managed"},
    {"id": 5, "name": "Web3 Consulting", "price": 1000, "duration": "Per session", "category": "Consulting"},
    {"id": 6, "name": "DeFi Protocol Design", "price": 8000, "duration": "4-8 weeks", "category": "Development"},
    {"id": 7, "name": "NFT Platform Development", "price": 6000, "duration": "3-5 weeks", "category": "Development"},
    {"id": 8, "name": "Security Audit", "price": 2000, "duration": "1 week", "category": "Security"},
    {"id": 9, "name": "Cloud Infrastructure", "price": 1200, "duration": "Monthly", "category": "Infrastructure"},
    {"id": 10, "name": "DAO Governance Setup", "price": 4000, "duration": "2-3 weeks", "category": "Consulting"},
    {"id": 11, "name": "Tokenomics Design", "price": 2500, "duration": "1-2 weeks", "category": "Consulting"},
    {"id": 12, "name": "Full-Stack Web3 App", "price": 15000, "duration": "6-12 weeks", "category": "Development"},
]

@app.get("/api/itportal/services")
def get_it_services():
    return {"services": IT_SERVICES}

@app.post("/api/itportal/book")
def book_service(service_id: int, contact_name: str, contact_email: str, details: Optional[str] = None):
    service = next((s for s in IT_SERVICES if s["id"] == service_id), None)
    if not service:
        raise HTTPException(404, "Service not found")
    booking_id = f"IITRL-{random.randint(10000, 99999)}"
    return {"success": True, "booking_id": booking_id, "service": service["name"], "price": service["price"], "message": f"Booking confirmed! Reference: {booking_id}. Skyler will contact you within 24 hours."}

# ─── Dark Market / Shadow Market ───────────────────────────────────────────────
SHADOW_LISTINGS = [
    {"id": 1, "title": "Anonymous VPN Setup", "description": "Full anonymous VPN configuration with no-log policy", "price": 500, "seller": "Shadow_0x7f3a", "rating": 4.9, "sales": 142, "category": "Privacy"},
    {"id": 2, "title": "Encrypted Email Service", "description": "End-to-end encrypted email setup with custom domain", "price": 250, "seller": "CryptoNinja", "rating": 4.8, "sales": 89, "category": "Privacy"},
    {"id": 3, "title": "Smart Contract Template", "description": "Audited ERC-20 token contract with deflationary mechanics", "price": 1000, "seller": "IITRL_Dev", "rating": 5.0, "sales": 34, "category": "Development"},
    {"id": 4, "title": "OSINT Investigation Report", "description": "Professional open-source intelligence gathering service", "price": 2000, "seller": "Shadow_0xa1b2", "rating": 4.7, "sales": 21, "category": "Research"},
    {"id": 5, "title": "Monero Mixing Service", "description": "Privacy-enhanced XMR transaction routing", "price": 100, "seller": "XMR_Ghost", "rating": 4.6, "sales": 567, "category": "Privacy"},
]

@app.get("/api/darkmarket/listings")
def get_dark_listings(category: Optional[str] = None):
    listings = SHADOW_LISTINGS
    if category:
        listings = [l for l in listings if l["category"].lower() == category.lower()]
    return {"listings": listings}

@app.post("/api/darkmarket/purchase")
def purchase_listing(listing_id: int):
    w = WALLETS["demo_wallet"]
    listing = next((l for l in SHADOW_LISTINGS if l["id"] == listing_id), None)
    if not listing:
        raise HTTPException(404, "Listing not found")
    if w["balance"] < listing["price"]:
        raise HTTPException(400, "Insufficient balance")
    w["balance"] = round(w["balance"] - listing["price"], 4)
    escrow_id = f"ESC-{uuid.uuid4().hex[:8].upper()}"
    tx = _add_tx("Escrow Lock", w["address"], "0xESCROW_CONTRACT", listing["price"])
    return {"success": True, "escrow_id": escrow_id, "listing": listing["title"], "amount_locked": listing["price"], "tx_hash": tx["hash"], "message": "Funds locked in escrow. Seller will deliver within 24-48 hours."}

# ─── Videos ────────────────────────────────────────────────────────────────────
VIDEOS = [
    {"id": 1, "title": "SKY444 Mining Tutorial — Earn 444 SKY444 Per Block", "creator": "SkylerBlue", "views": 12447, "likes": 1844, "tips": 4444.0, "duration": "18:44", "category": "Tutorial", "thumbnail": "https://picsum.photos/seed/v1/320/180"},
    {"id": 2, "title": "DeFi Yield Farming Strategies 2026", "creator": "DeFi_Whale", "views": 8200, "likes": 920, "tips": 2200.0, "duration": "24:12", "category": "DeFi", "thumbnail": "https://picsum.photos/seed/v2/320/180"},
    {"id": 3, "title": "NFT Minting on SKY444 — Complete Guide", "creator": "NFT_Queen", "views": 5600, "likes": 680, "tips": 1100.0, "duration": "15:33", "category": "NFT", "thumbnail": "https://picsum.photos/seed/v3/320/180"},
    {"id": 4, "title": "SKY444 Tokenomics Deep Dive", "creator": "CryptoNinja", "views": 4400, "likes": 544, "tips": 880.0, "duration": "32:07", "category": "Education", "thumbnail": "https://picsum.photos/seed/v4/320/180"},
    {"id": 5, "title": "ShadowChat Privacy Features Explained", "creator": "IITRL_Dev", "views": 3100, "likes": 410, "tips": 620.0, "duration": "11:22", "category": "Privacy", "thumbnail": "https://picsum.photos/seed/v5/320/180"},
    {"id": 6, "title": "Casino Strategy: Maximizing SKY444 Wins", "creator": "DeFi_Whale", "views": 7800, "likes": 1200, "tips": 3300.0, "duration": "20:45", "category": "Gaming", "thumbnail": "https://picsum.photos/seed/v6/320/180"},
]

@app.get("/api/videos")
def get_videos(category: Optional[str] = None):
    vids = VIDEOS
    if category:
        vids = [v for v in vids if v["category"].lower() == category.lower()]
    return {"videos": vids}

@app.post("/api/videos/tip/{video_id}")
def tip_video(video_id: int, amount: float):
    w = WALLETS["demo_wallet"]
    video = next((v for v in VIDEOS if v["id"] == video_id), None)
    if not video:
        raise HTTPException(404, "Video not found")
    if w["balance"] < amount:
        raise HTTPException(400, "Insufficient balance")
    w["balance"] = round(w["balance"] - amount, 4)
    video["tips"] = round(video["tips"] + amount, 2)
    tx = _add_tx("Video Tip", w["address"], f"0xCREATOR_{video['creator']}", amount)
    return {"success": True, "tipped": amount, "creator": video["creator"], "tx_hash": tx["hash"]}

# ─── AI Chat Assistant ─────────────────────────────────────────────────────────
@app.post("/api/ai/chat")
async def ai_chat(message: str):
    """Simple rule-based AI assistant for SKY444 queries"""
    msg_lower = message.lower()
    w = WALLETS["demo_wallet"]

    if any(word in msg_lower for word in ["balance", "how much", "wallet"]):
        response = f"Your current SKY444 balance is {w['balance']:,.4f} SKY444 (≈${w['balance'] * STATE['sky_price']:,.2f} USD). You also have {w['staked']:,.4f} SKY444 staked."
    elif any(word in msg_lower for word in ["price", "worth", "value"]):
        response = f"SKY444 is currently trading at ${STATE['sky_price']:.6f} USD. Market cap: ${STATE['market_cap']:,.0f}. The token has a total supply of 444,444,444 SKY444."
    elif any(word in msg_lower for word in ["stake", "staking", "apy"]):
        response = "SKY444 offers 4 staking tiers: Bronze (11.1% APY, 1K min), Silver (22.2% APY, 10K min), Gold (33.3% APY, 50K min), Diamond (44.4% APY, 100K min). All staking locks reduce circulating supply."
    elif any(word in msg_lower for word in ["mine", "mining", "block"]):
        response = f"Mining SKY444 uses SHA-256 Proof of Work. Block reward is 444 SKY444 per block. Current block height: {STATE['block_height']:,}. Network hashrate: {STATE['hash_rate_network']:,} MH/s."
    elif any(word in msg_lower for word in ["burn", "deflationary"]):
        response = f"SKY444 has a 1% burn on every transaction. Total burned so far: {STATE['burned_total']:,.2f} SKY444. This creates constant deflationary pressure on the supply."
    elif any(word in msg_lower for word in ["casino", "game", "gamble"]):
        response = "SKY444 Casino offers Dice, Coin Flip, Slots, and Roulette. All games are provably fair. 5% of every bet is automatically donated to charity campaigns."
    elif any(word in msg_lower for word in ["charity", "donate"]):
        total_raised = sum(c["raised"] for c in CHARITY_CAMPAIGNS)
        response = f"The Charity Hub has raised {total_raised:,.2f} SKY444 across 5 active campaigns. 5% of all casino winnings are automatically routed to charity."
    elif any(word in msg_lower for word in ["nft", "mint", "marketplace"]):
        response = "The SKY444 NFT Marketplace supports 6 rarity tiers: Common, Uncommon, Rare, Epic, Legendary, and Mythic. Marketplace fee is 2.5%. You can mint, buy, and sell NFTs directly."
    elif any(word in msg_lower for word in ["bridge", "cross-chain"]):
        response = "The SKY444 Cross-Chain Bridge supports 6 networks: SKY444, Ethereum, BNB Smart Chain, Polygon, Bitcoin, and Monero. Bridge fee is 0.2% with 5-15 minute settlement."
    elif any(word in msg_lower for word in ["hello", "hi", "hey"]):
        response = f"Hello {w['username']}! Welcome to SKY444 Super-App. I'm your AI assistant. Ask me about your balance, staking, mining, NFTs, or anything else about the platform!"
    else:
        response = f"I can help you with: wallet balance, SKY444 price, staking APY, mining info, casino games, charity campaigns, NFT marketplace, cross-chain bridge, and more. What would you like to know?"

    return {"response": response, "timestamp": _now_ts()}

# ════════════════════════════════════════════════════════════════════════════
# v4.0.0  —  New endpoints
#   Analytics · Notifications · Settings · Leaderboard · Referrals
#   API Keys  · Vault         · Onboarding
# ════════════════════════════════════════════════════════════════════════════

# ─── Analytics ───────────────────────────────────────────────────────────
@app.get("/api/analytics/overview")
def analytics_overview(range: str = "7d"):
    """Time-series data for portfolio, TVL, volume, and active users."""
    points = {"24h": 24, "7d": 7, "30d": 30, "90d": 90, "1y": 52}.get(range, 7)
    step   = {"24h": 3600, "7d": 86400, "30d": 86400, "90d": 86400, "1y": 604800}.get(range, 86400)
    now = _now_ts()
    series = []
    for i in range(points):
        t = now - (points - i - 1) * step
        series.append({
            "t":         t,
            "portfolio": round(1970.0 * (1 + (random.random() - 0.45) * 0.15), 2),
            "tvl":       round(4_200_000 * (1 + (random.random() - 0.5) * 0.08), 0),
            "volume":    round(180_000 * (1 + (random.random() - 0.5) * 0.4), 0),
            "users":     int(4444 * (1 + (random.random() - 0.5) * 0.05)),
        })
    return {
        "range":   range,
        "series":  series,
        "summary": {
            "portfolio_change_pct": round((random.random() - 0.3) * 12, 2),
            "tvl_change_pct":       round((random.random() - 0.4) * 8,  2),
            "volume_change_pct":    round((random.random() - 0.3) * 22, 2),
            "users_change_pct":     round((random.random() - 0.4) * 5,  2),
        },
    }

@app.get("/api/analytics/allocation")
def analytics_allocation():
    return {
        "allocations": [
            {"asset": "SKY444",  "pct": 62.4, "value_usd": 1229.80, "color": "#a855f7"},
            {"asset": "Staked",  "pct": 22.1, "value_usd":  435.47, "color": "#06b6d4"},
            {"asset": "USDT LP", "pct":  9.3, "value_usd":  183.29, "color": "#10b981"},
            {"asset": "NFTs",    "pct":  4.2, "value_usd":   82.77, "color": "#f59e0b"},
            {"asset": "Other",   "pct":  2.0, "value_usd":   39.39, "color": "#64748b"},
        ],
    }

# ─── Notifications ───────────────────────────────────────────────────────
NOTIFICATIONS = [
    {"id": 1, "type": "reward",    "title": "Staking reward earned",     "body": "You earned 0.082 SKY444 from your Silver stake.",                     "read": False, "ts": _now_ts() - 1200},
    {"id": 2, "type": "social",    "title": "New follower",               "body": "@DragonSlayer started following your profile.",                       "read": False, "ts": _now_ts() - 3600},
    {"id": 3, "type": "system",    "title": "Block mined",                "body": "Block #1,847,291 mined — 444 SKY444 reward distributed.",             "read": False, "ts": _now_ts() - 5400},
    {"id": 4, "type": "security",  "title": "New login from MacBook Pro", "body": "Safari on macOS · San Francisco. If this wasn't you, secure your account.", "read": True,  "ts": _now_ts() - 14400},
    {"id": 5, "type": "market",    "title": "SKY444 up 4.4%",             "body": "SKY444 is trading at $0.0444 — 24h volume $180K.",                    "read": True,  "ts": _now_ts() - 43200},
    {"id": 6, "type": "quest",     "title": "Daily quest completed",      "body": "You completed the 'Mine 1 hour' quest — 100 XP awarded.",             "read": True,  "ts": _now_ts() - 86400},
    {"id": 7, "type": "governance","title": "New DAO proposal",            "body": "Proposal #3 'Add Solana Bridge Support' is now open for voting.",       "read": True,  "ts": _now_ts() - 172800},
]

@app.get("/api/notifications")
def get_notifications(only_unread: bool = False):
    items = [n for n in NOTIFICATIONS if not only_unread or not n["read"]]
    return {"notifications": items, "unread_count": sum(1 for n in NOTIFICATIONS if not n["read"])}

@app.post("/api/notifications/{nid}/read")
def mark_notification_read(nid: int):
    for n in NOTIFICATIONS:
        if n["id"] == nid:
            n["read"] = True
            return {"success": True, "id": nid}
    raise HTTPException(404, "Notification not found")

@app.post("/api/notifications/read-all")
def mark_all_notifications_read():
    for n in NOTIFICATIONS:
        n["read"] = True
    return {"success": True, "count": len(NOTIFICATIONS)}

# ─── User Settings ───────────────────────────────────────────────────────
USER_SETTINGS = {
    "theme": "dark",
    "language": "en",
    "currency": "USD",
    "timezone": "America/Chicago",
    "notifications": {
        "email": True, "push": True, "rewards": True, "social": True,
        "market": False, "security": True, "governance": True,
    },
    "privacy": {
        "profile_public": True, "show_balance": False,
        "show_activity": True, "show_leaderboard": True,
    },
    "security": {
        "two_factor": True, "biometric": True,
        "session_timeout": 3600, "require_password_for_withdraw": True,
    },
}

@app.get("/api/settings")
def get_settings():
    return USER_SETTINGS

@app.put("/api/settings")
def update_settings(body: dict):
    for key, value in body.items():
        if key in USER_SETTINGS:
            if isinstance(USER_SETTINGS[key], dict) and isinstance(value, dict):
                USER_SETTINGS[key].update(value)
            else:
                USER_SETTINGS[key] = value
    return {"success": True, "settings": USER_SETTINGS}

# ─── Leaderboard ─────────────────────────────────────────────────────────
@app.get("/api/leaderboard")
def get_leaderboard(category: str = "xp", limit: int = 20):
    names = ["SkylerBlue","NeonPhantom","CryptoSamurai","DragonSlayer","VoidWalker",
            "StarForge","DarkWizard","MidnightOwl","SolarFlare","ChromeKnight",
            "IronValkyrie","ObsidianFox","CrimsonBlaze","SilverShark","PhoenixRider",
            "GhostRunner","NebulaQueen","TitanBreaker","AzureStorm","EclipseGod",
            "QuantumLeap","RogueAgent","BlackSun","VenomStrike","CelestialMage"]
    seeded = random.Random(category)
    board  = []
    for i, name in enumerate(names[:limit]):
        base  = 100_000 if category == "mining" else 50_000
        score = int(base * (1.8 - i * 0.05) * (1 + seeded.random() * 0.3))
        board.append({
            "rank":     i + 1,
            "username": name,
            "address":  "0x" + hashlib.sha256(f"{name}{category}".encode()).hexdigest()[:40],
            "score":    score,
            "level":    max(1, 44 - i * 2),
            "is_you":   name == "SkylerBlue",
        })
    return {"category": category, "leaderboard": board, "your_rank": 1 if category == "xp" else 7}

# ─── Referrals ───────────────────────────────────────────────────────────
@app.get("/api/referrals")
def get_referrals():
    return {
        "referral_code":   "SKY-BLUE-444",
        "referral_link":   "https://sky444.app/ref/SKY-BLUE-444",
        "total_referred":  44,
        "total_earned":    2_444.44,
        "pending_rewards": 144.4,
        "tier":            "Gold",
        "next_tier":       "Platinum",
        "next_tier_at":    100,
        "commission_rate": 0.10,
        "recent": [
            {"username": "NeonPhantom",  "joined_at": _now_ts() - 3600,   "earned": 44.4,  "status": "active"},
            {"username": "DragonSlayer", "joined_at": _now_ts() - 86400,  "earned": 122.0, "status": "active"},
            {"username": "VoidWalker",   "joined_at": _now_ts() - 172800, "earned": 88.8,  "status": "active"},
            {"username": "StarForge",    "joined_at": _now_ts() - 604800, "earned": 220.2, "status": "inactive"},
        ],
    }

@app.post("/api/referrals/claim")
def claim_referral_rewards():
    return {"success": True, "claimed": 144.4, "tx_hash": _gen_tx_hash(), "new_balance": 44_488.4}

# ─── API Keys ────────────────────────────────────────────────────────────
API_KEYS = [
    {"id": "ak_1", "name": "Trading Bot",          "prefix": "sky_live_a3f2", "created_at": _now_ts() - 2_592_000,  "last_used": _now_ts() - 300,       "scopes": ["read","trade"], "revoked": False},
    {"id": "ak_2", "name": "Analytics Dashboard",  "prefix": "sky_live_b7c9", "created_at": _now_ts() - 5_184_000,  "last_used": _now_ts() - 86400,     "scopes": ["read"],         "revoked": False},
    {"id": "ak_3", "name": "Legacy Integration",   "prefix": "sky_live_x1y4", "created_at": _now_ts() - 15_552_000, "last_used": _now_ts() - 2_592_000, "scopes": ["read"],         "revoked": True},
]

@app.get("/api/keys")
def list_api_keys():
    return {"keys": API_KEYS}

@app.post("/api/keys")
def create_api_key(body: dict):
    import secrets
    name   = body.get("name", "Unnamed Key")
    scopes = body.get("scopes", ["read"])
    new_id = f"ak_{len(API_KEYS) + 1}"
    secret = f"sky_live_{secrets.token_hex(16)}"
    prefix = secret[:12]
    key = {"id": new_id, "name": name, "prefix": prefix, "created_at": _now_ts(),
           "last_used": None, "scopes": scopes, "revoked": False}
    API_KEYS.append(key)
    return {"success": True, "key": key, "secret": secret,
            "warning": "Store this secret securely — it will not be shown again."}

@app.delete("/api/keys/{key_id}")
def revoke_api_key(key_id: str):
    for k in API_KEYS:
        if k["id"] == key_id:
            k["revoked"] = True
            return {"success": True, "id": key_id}
    raise HTTPException(404, "Key not found")

# ─── Vault (time-locked cold storage) ────────────────────────────────────
VAULT_POSITIONS = [
    {"id": "v1", "name": "Long-Term Hold",    "amount": 10_000, "locked_until": _now_ts() + 7_776_000,  "yield_apy": 0.05, "auto_compound": True,  "status": "locked"},
    {"id": "v2", "name": "Emergency Reserve", "amount":  2_500, "locked_until": _now_ts() + 31_104_000, "yield_apy": 0.08, "auto_compound": True,  "status": "locked"},
    {"id": "v3", "name": "Quarterly Vault",   "amount":  5_000, "locked_until": _now_ts() - 100,        "yield_apy": 0.04, "auto_compound": False, "status": "unlocked"},
]

@app.get("/api/vault")
def get_vault():
    total = sum(v["amount"] for v in VAULT_POSITIONS)
    return {
        "positions":    VAULT_POSITIONS,
        "total_locked": total,
        "total_usd":    round(total * 0.0444, 2),
        "tiers": [
            {"name": "Flex",    "min": 100,    "lock_days": 30,   "apy": 0.04},
            {"name": "Quarter", "min": 1000,   "lock_days": 90,   "apy": 0.05},
            {"name": "Annual",  "min": 5000,   "lock_days": 365,  "apy": 0.08},
            {"name": "Diamond", "min": 50000,  "lock_days": 1460, "apy": 0.12},
        ],
    }

@app.post("/api/vault/deposit")
def vault_deposit(body: dict):
    amount = float(body.get("amount", 0))
    tier   = body.get("tier", "Flex")
    name   = body.get("name", f"{tier} Vault")
    if amount < 100:
        raise HTTPException(400, "Minimum vault deposit is 100 SKY444")
    lock_days = {"Flex": 30, "Quarter": 90, "Annual": 365, "Diamond": 1460}.get(tier, 30)
    apy       = {"Flex": 0.04, "Quarter": 0.05, "Annual": 0.08, "Diamond": 0.12}.get(tier, 0.04)
    new_id = f"v{len(VAULT_POSITIONS) + 1}"
    pos = {"id": new_id, "name": name, "amount": amount,
           "locked_until": _now_ts() + lock_days * 86400,
           "yield_apy": apy, "auto_compound": True, "status": "locked"}
    VAULT_POSITIONS.append(pos)
    return {"success": True, "position": pos, "tx_hash": _gen_tx_hash()}

@app.post("/api/vault/withdraw/{vid}")
def vault_withdraw(vid: str):
    for v in VAULT_POSITIONS:
        if v["id"] == vid:
            if v["locked_until"] > _now_ts():
                days_left = (v["locked_until"] - _now_ts()) // 86400
                raise HTTPException(400, f"Vault locked for {days_left} more days")
            v["status"] = "withdrawn"
            return {"success": True, "withdrawn": v["amount"], "tx_hash": _gen_tx_hash()}
    raise HTTPException(404, "Vault position not found")

# ─── Onboarding ──────────────────────────────────────────────────────────
ONBOARDING_STEPS = [
    {"id": "welcome",    "title": "Welcome to SKY444",      "description": "The ultimate Web3 super-app",       "completed": True,  "xp": 50},
    {"id": "wallet",     "title": "Create your wallet",      "description": "Generate your SKY444 address",      "completed": True,  "xp": 100},
    {"id": "backup",     "title": "Backup recovery phrase",  "description": "Safely store your 12-word phrase",  "completed": True,  "xp": 200},
    {"id": "first_tx",   "title": "Send your first tx",      "description": "Try sending 1 SKY444 to a friend",   "completed": False, "xp": 150},
    {"id": "stake",      "title": "Stake some SKY444",       "description": "Earn passive yield",                "completed": False, "xp": 200},
    {"id": "mine",       "title": "Start mining",            "description": "Earn block rewards",                "completed": False, "xp": 150},
    {"id": "social",     "title": "Join ShadowChat",         "description": "Connect with the community",        "completed": False, "xp": 100},
    {"id": "governance", "title": "Vote on a proposal",      "description": "Shape the future of SKY444",        "completed": False, "xp": 200},
]

@app.get("/api/onboarding")
def get_onboarding():
    done = sum(1 for s in ONBOARDING_STEPS if s["completed"])
    return {
        "steps":        ONBOARDING_STEPS,
        "completed":    done,
        "total":        len(ONBOARDING_STEPS),
        "progress_pct": round(done / len(ONBOARDING_STEPS) * 100, 1),
        "total_xp":     sum(s["xp"] for s in ONBOARDING_STEPS if s["completed"]),
        "available_xp": sum(s["xp"] for s in ONBOARDING_STEPS),
    }

@app.post("/api/onboarding/{step_id}/complete")
def complete_onboarding_step(step_id: str):
    for s in ONBOARDING_STEPS:
        if s["id"] == step_id:
            if s["completed"]:
                return {"success": False, "error": "Step already completed"}
            s["completed"] = True
            return {"success": True, "step": s, "xp_awarded": s["xp"]}
    raise HTTPException(404, "Step not found")

# ════════════════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
