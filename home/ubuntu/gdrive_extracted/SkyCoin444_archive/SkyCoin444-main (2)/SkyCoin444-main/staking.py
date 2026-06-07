# Made by Skyler - Business Innovative Information Technology Resolutions LLC
import time
from config import SKY_CYCLE_INTERVAL

class StakingPool:
    def __init__(self):
        self.stakes = {}  # address -> {"amount": float, "timestamp": float, "lock_days": int, "sky_vault_multiplier": float}

    def stake(self, address: str, amount: float, lock_days: int = 90):
        if address not in self.stakes:
            self.stakes[address] = {"amount": 0.0, "timestamp": time.time(), "lock_days": lock_days, "sky_vault_multiplier": 1.0}
        self.stakes[address]["amount"] += amount

    def calculate_reward(self, address: str, blockchain) -> float:
        if address not in self.stakes:
            return 0.0
        data = self.stakes[address]
        days_staked = (time.time() - data["timestamp"]) / 86400
        base = (data["amount"] / max(blockchain.circulating_supply, 1)) * blockchain.staking_pool * 0.4
        # Sky Cycle bonus
        cycle_bonus = 1.5 if len(blockchain.chain) % SKY_CYCLE_INTERVAL == 0 else 1.0
        # SkyVault time boost
        boost = 2.0 if days_staked >= data["lock_days"] else 1.0
        return round(base * boost * cycle_bonus, 8)

    def claim(self, address: str, blockchain):
        reward = self.calculate_reward(address, blockchain)
        blockchain.staking_pool = max(0.0, blockchain.staking_pool - reward)
        return reward