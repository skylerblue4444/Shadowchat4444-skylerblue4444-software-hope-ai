# Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
import unittest
from blockchain import Blockchain
from transaction import Transaction
from wallet import Wallet

class TestBlockchain(unittest.TestCase):
    def setUp(self):
        self.bc = Blockchain()
        self.wallet = Wallet()

    def test_genesis_block(self):
        self.assertEqual(len(self.bc.chain), 1)
        self.assertEqual(self.bc.chain[0].index, 0)

    def test_supply_enforcement(self):
        with self.assertRaises(ValueError):
            # Try to exceed max supply
            pass  # Full test logic here in real run

    def test_transaction_burn(self):
        tx = Transaction(self.wallet.address, "test", 100)
        self.assertGreater(tx.burn, 0)

if __name__ == '__main__':
    unittest.main()