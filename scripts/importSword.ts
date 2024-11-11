import { ethers } from "hardhat";

async function main() {
  const tokenId = 0;
  const swordAddress = "0x04211b5C98044a4c78aB0104EBC0dE3FE1BfBb67";
  const worldAddress = "0x21766114147D37a656B8E513faafECCE5b5374A5";

  // Get the Sword contract
  const sword = await ethers.getContractAt("Sword", swordAddress);
  
  // Get the World contract
  const world = await ethers.getContractAt("World", worldAddress);

  console.log("Approving sword transfer...");
  const approveTx = await sword.approve(worldAddress, tokenId);
  await approveTx.wait();
  console.log("Approval complete");

  console.log("Importing sword into world...");
  const importTx = await world.importItem(swordAddress, tokenId);
  await importTx.wait();
  console.log("Sword successfully imported into world!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
