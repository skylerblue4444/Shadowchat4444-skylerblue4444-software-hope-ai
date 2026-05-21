# Made by Skyler - Business Innovative Information Technology Resolutions LLC
import hashlib
import json
import time
from config import DIFFICULTY

class Block:
    def __init__(self, index: int, previous_hash: str, transactions: list, timestamp=None):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp or time.time()
        self.transactions = transactions
        self.nonce = 0
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        tx_data = json.dumps([tx.to_dict() for tx in self.transactions], sort_keys=True)
        block_str = f"{self.index}{self.previous_hash}{self.timestamp}{tx_data}{self.nonce}"
        return hashlib.sha256(block_str.encode()).hexdigest()

    def mine_block(self, difficulty=DIFFICULTY):
        target = "0" * difficulty
        while self.hash[:difficulty] != target:
            self.nonce += 1
            self.hash = self.calculate_hash()
        return self.hash