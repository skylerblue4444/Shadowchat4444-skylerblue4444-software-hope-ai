// Made by Skyler Blue Spillers - Innovative Information Technology Resolutions LLC
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying SKY444 from:", deployer.address);

  const SKY444 = await ethers.getContractFactory("SKY444");
  const sky444 = await SKY444.deploy();

  await sky444.waitForDeployment();
  console.log("SKY444 deployed to:", await sky444.getAddress());

  // Optional: verify on Etherscan
  // await hre.run("verify:verify", { address: await sky444.getAddress() });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});