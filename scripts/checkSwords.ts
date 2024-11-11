import { ethers } from "hardhat";

async function main() {
  // Get the first signer (account)
  const [account] = await ethers.getSigners();
  
  // The Sword contract address
  const swordAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  // Get the Sword contract instance
  const Sword = await ethers.getContractAt("Sword", swordAddress);
  
  const address = account.address;

  // Get the balance
  const balance = await Sword.balanceOf(address);
  
  console.log(`NFT balance for ${address}: ${balance.toString()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
