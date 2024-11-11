// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SwordModule = buildModule("SwordModule", (m) => {
  // Deploy the Sword contract
  const sword = m.contract("Sword", []);

  // Mint three swords
  const mint1 = m.call(sword, "mint", [], { id: "mint1" });
  const mint2 = m.call(sword, "mint", [], { id: "mint2", after: [mint1] });
  m.call(sword, "mint", [], { id: "mint3", after: [mint2] });

  return { sword };
});

export default SwordModule;
