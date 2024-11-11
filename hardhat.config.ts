import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  defaultNetwork: "shapeSepolia",
  networks: {
    shapeSepolia: {
      url: "https://shape-sepolia.g.alchemy.com/v2/JCyKhKg8dYiycv_h0xKPlld9kvXNforb",
      accounts: ["e272de8c257dfc53d8526f3b4963a347ff8e11f843145fddabef5a3d204df275"]
    }
  }
};

export default config;
