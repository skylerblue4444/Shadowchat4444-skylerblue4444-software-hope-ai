# Mainnet Deployment Guide
Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC

1. Set INFURA_KEY and PRIVATE_KEY in .env
2. Run: npx hardhat run contracts/deploy.js --network mainnet
3. Add liquidity: npx hardhat run contracts/liquidity-pool.js --network mainnet
4. Verify on Etherscan
5. Update frontend CONTRACT_ADDRESS