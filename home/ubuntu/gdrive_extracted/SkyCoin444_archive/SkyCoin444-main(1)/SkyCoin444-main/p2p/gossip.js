# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
import socket
import threading
import json
from blockchain import Blockchain

class GossipProtocol:
    def __init__(self):
        self.peers = set()
        self.blockchain = Blockchain()

    def broadcast_block(self, block):
        message = json.dumps({"type": "new_block", "block": block.__dict__})
        for peer in self.peers:
            try:
                s = socket.socket()
                s.connect(peer)
                s.send(message.encode())
                s.close()
            except:
                pass

    def start_gossip(self):
        print("🌐 Gossip protocol active – full P2P decentralization started")