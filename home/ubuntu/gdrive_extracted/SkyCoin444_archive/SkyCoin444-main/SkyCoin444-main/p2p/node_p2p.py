
# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
import socket
import threading
import json
from blockchain import Blockchain

class P2PNode:
    def __init__(self):
        self.blockchain = Blockchain()
    def start(self):
        print("🌐 P2P Node started")
if __name__ == "__main__":
    node = P2PNode()
    node.start()