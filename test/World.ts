import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("World", function () {
  async function deployWorldFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Sword = await hre.ethers.getContractFactory("Sword");
    const sword = await Sword.deploy();

    const World = await hre.ethers.getContractFactory("World");
    const world = await World.deploy();

    // Mint a sword for testing
    await sword.connect(owner).mint();
    const tokenId = 0;

    return { world, sword, owner, otherAccount, tokenId };
  }

  describe("Item Import/Export", function () {
    it("Should import item and transfer ownership to World contract", async function () {
      const { world, sword, tokenId } = await loadFixture(deployWorldFixture);

      //Approve the world contract to transfer the sword
      await sword.approve(world.target, tokenId)
      // Import the sword
      await world.importItem(sword.target, tokenId);

      // Verify World contract now owns the sword
      expect(await sword.ownerOf(tokenId)).to.equal(world.target);
    });

    it("Should prevent unauthorized export and allow owner to export", async function () {
      const { world, sword, owner, otherAccount, tokenId } = await loadFixture(deployWorldFixture);

      // Import the sword first
      await sword.approve(world.target, tokenId);
      await world.importItem(sword.target, tokenId);

      // Try to export with wrong account
      await expect(
        world.connect(otherAccount).exportItem(sword.target, tokenId)
      ).to.be.revertedWith("You are not the original owner");

      // Export with correct owner
      await world.exportItem(sword.target, tokenId);

      // Verify ownership is restored
      expect(await sword.ownerOf(tokenId)).to.equal(owner.address);
    });
  });
});
