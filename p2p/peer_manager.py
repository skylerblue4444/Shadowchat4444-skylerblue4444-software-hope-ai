# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
class PeerManager:
    def __init__(self):
        self.peers = set()

    def add_peer(self, peer):
        self.peers.add(peer)
        print(f"🌐 New peer joined: {peer}")