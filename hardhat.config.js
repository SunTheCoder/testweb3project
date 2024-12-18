require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // For using environment variables

module.exports = {
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL, // Store your RPC URL securely
      accounts: [process.env.PRIVATE_KEY], // Add your MetaMask private key
    },
  },
  solidity: "0.8.28",
};
