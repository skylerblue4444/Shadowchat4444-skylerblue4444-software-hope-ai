from config import *
from block import Block
from transaction import Transaction
from database import Database
from wallet import Wallet
import hashlib
import time

class Blockchain:
    def __init__(self):
        self.db = Database()
        self.chain = self._load_or_create()
        self.pending_transactions = []
        self.total_supply, self.circulating_supply = self.db.get_supply()
        self.staking_pool = 0.0

    def _load_or_create(self):
        # Full chain load stub — in production use Merkle proofs
        genesis = self.create_genesis_block()
        return [genesis]  # expand later with DB load

    def create_genesis_block(self):
        w = Wallet()
        tx = Transaction("GENESIS", w.address, GENESIS_AMOUNT)
        tx.pubkey = w.public_key.to_string()
        genesis = Block(0, "0", [tx])
        genesis.hash = genesis.calculate_hash()
        return genesis

    def add_block(self, new_block: Block):
        # BTC-style difficulty adjustment
        if len(self.chain) % 2016 == 0:
            # (simplified) — real adjustment logic here
            pass

        new_block.previous_hash = self.chain[-1].hash
        new_block.mine_block(DIFFICULTY)

        reward = self.get_block_reward()
        if self.total_supply + reward > MAX_SUPPLY:
            raise ValueError("MAX SUPPLY REACHED — MINING HALTED")

        self.chain.append(new_block)
        self.db.update_supply(reward, 0)  # burns handled in tx
        self.total_supply += reward
        self.circulating_supply += reward

        # Process pending txs with USDT-style fee/burn
        for tx in self.pending_transactions:
            self.circulating_supply -= tx.burn
            self.staking_pool += tx.fee
        self.pending_transactions.clear()
        return new_block

    def get_block_reward(self):
        halvings = len(self.chain) // HALVING_INTERVAL
        return max(INITIAL_BLOCK_REWARD / (2 ** halvings), 0.0)

    def validate_chain(self):
        for i in range(1, len(self.chain)):
            if self.chain[i].previous_hash != self.chain[i-1].hash:
                raise ValueError("CHAIN INTEGRITY BROKEN")
            if self.chain[i].hash != self.chain[i].calculate_hash():
                raise ValueError("HASH MISMATCH — TAMPERING DETECTED")
        return True