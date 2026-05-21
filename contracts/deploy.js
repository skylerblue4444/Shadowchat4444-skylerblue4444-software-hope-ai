// Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
const hre = require("hardhat");

async function main() {
  const SKY444 = await hre.ethers.getContractFactory("SKY444");
  const sky444 = await SKY444.deploy();
  await sky444.waitForDeployment();
  console.log("✅ SKY444 deployed to:", await sky444.getAddress());
}

main().catch(console.error);