# Made by Skyler - Business Innovative Information Technology Resolutions LLC
import ecdsa
import hashlib
import json

class Wallet:
    def __init__(self):
        self.private_key = ecdsa.SigningKey.generate(curve=ecdsa.SECP256k1)
        self.public_key = self.private_key.verifying_key
        self.address = hashlib.sha256(self.public_key.to_string()).hexdigest()[:40]

    def sign(self, message: str) -> str:
        return self.private_key.sign(message.encode()).hex()

    @staticmethod
    def verify_signature(pubkey_hex: str, signature: str, message: str) -> bool:
        try:
            vk = ecdsa.VerifyingKey.from_string(bytes.fromhex(pubkey_hex), curve=ecdsa.SECP256k1)
            vk.verify(bytes.fromhex(signature), message.encode())
            return True
        except:
            return False

    def to_dict(self):
        return {"address": self.address, "pubkey": self.public_key.to_string().hex()}