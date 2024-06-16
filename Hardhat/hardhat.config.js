require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    bscMainnet: {
      url: "https://bsc-dataseed.binance.org/",
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: `${process.env.BSCSCAN_API_KEY}`
  }
};
