# Made by Skyler - Business Innovative Information Technology Resolutions LLC
import time
import json
from config import BURN_PERCENT, FEE_PERCENT

class Transaction:
    def __init__(self, sender: str, recipient: str, amount: float, pubkey: bytes = None, nonce: int = 0):
        self.sender = sender
        self.recipient = recipient
        self.amount = round(amount, 8)
        self.timestamp = time.time()
        self.fee = round(self.amount * FEE_PERCENT, 8)
        self.burn = round(self.amount * BURN_PERCENT, 8)
        self.signature = None
        self.pubkey = pubkey
        self.nonce = nonce  # Replay protection

    def to_dict(self):
        return {
            "sender": self.sender,
            "recipient": self.recipient,
            "amount": self.amount,
            "fee": self.fee,
            "burn": self.burn,
            "timestamp": self.timestamp,
            "signature": self.signature,
            "pubkey": self.pubkey.hex() if self.pubkey else None,
            "nonce": self.nonce
        }

    def sign(self, sign_func):
        tx_str = json.dumps(self.to_dict(), sort_keys=True)
        self.signature = sign_func(tx_str)
        return self.signature

    def is_valid(self):
        if self.amount <= 0 or self.fee < 0 or self.burn < 0:
            return False
        return True