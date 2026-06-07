// Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
const hre = require("hardhat");

async function verify() {
  await hre.run("verify:verify", {
    address: "YOUR_DEPLOYED_SKY444_ADDRESS",
    constructorArguments: [],
  });
  console.log("✅ Contract verified on Etherscan");
}

verify();