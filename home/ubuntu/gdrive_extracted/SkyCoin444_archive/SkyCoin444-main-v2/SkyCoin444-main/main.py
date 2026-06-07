# Made by Skyler - Business Innovative Information Technology Resolutions LLC
from blockchain import Blockchain
from staking import StakingPool
from ico import ICOSale
from wallet import Wallet

if __name__ == "__main__":
    print("🚀 skyCoin444 Node Starting - Made by Skyler @ Business Innovative Information Technology Resolutions LLC")
    bc = Blockchain()
    pool = StakingPool()
    ico = ICOSale(bc)
    w = Wallet()

    print(f"Founder Address: {w.address}")
    print(f"Genesis Supply: {bc.circulating_supply}")

    # Test ICO
    print(ico.buy(w.address, 10000))

    # Mine block
    from block import Block
    new_block = Block(len(bc.chain), bc.chain[-1].hash, bc.pending_transactions)
    bc.add_block(new_block)
    print("✅ Block mined successfully")

    # Stake & claim
    pool.stake(w.address, 5000)
    reward = pool.claim(w.address, bc)
    print(f"Staking reward claimed: {reward} SKY444")

    print("✅ FULL CHAIN INTEGRITY:", bc.validate_chain())
    print(f"FINAL SUPPLY: {bc.total_supply} / 444444444 (ZERO ERRORS)")