# Made by Skyler - Business Innovative Information Technology Resolutions LLC
from config import ICO_ALLOCATION

class ICOSale:
    def __init__(self, blockchain):
        self.blockchain = blockchain
        self.sold = 0.0
        self.vesting = {}  # address -> {"amount": float, "release_ts": float}

    def buy(self, buyer: str, amount: float):
        if self.sold + amount > ICO_ALLOCATION:
            raise ValueError("ICO allocation fully sold out")
        self.sold += amount
        self.vesting[buyer] = {"amount": amount, "release_ts": time.time()}  # instant for demo
        self.blockchain.db.update_balance(buyer, amount)  # direct credit
        return f"✅ ICO PURCHASE SUCCESS: {amount} SKY444 to {buyer}"