import { ethers } from "hardhat";

async function main() {
  const tokenId = 0;
  const swordAddress = "0x04211b5C98044a4c78aB0104EBC0dE3FE1BfBb67";
  const worldAddress = "0x21766114147D37a656B8E513faafECCE5b5374A5";

  // Get the Sword contract
  const sword = await ethers.getContractAt("Sword", swordAddress);
  
  // Get the World contract
  const world = await ethers.getContractAt("World", worldAddress);

  console.log("Exporting sword from world...");
  const exportTx = await world.exportItem(swordAddress, tokenId);
  await exportTx.wait();
  console.log("Sword successfully exported from world!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
