// Import required libraries
import { Alchemy } from "alchemy-sdk";

// Load environment variables (optional, for security)
import dotenv from "dotenv";
dotenv.config();

// Initialize Alchemy SDK
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Secure your API key in .env
  network: "eth-sepolia",             // Specify the Sepolia Testnet
};
const alchemy = new Alchemy(settings);

// Function to get the latest block number
async function getLatestBlock() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("Latest block:", latestBlock);
}

// Function to get NFTs for an address
async function getNFTs(address) {
  const nfts = await alchemy.nft.getNftsForOwner(address);
  console.log(`NFTs owned by ${address}:`, nfts);
}

// Function to listen to pending transactions
function listenToPendingTransactions(address) {
  alchemy.ws.on(
    { method: "alchemy_pendingTransactions", fromAddress: address },
    (res) => console.log("Pending transaction:", res)
  );
}

// Run functions
getLatestBlock();                                // Fetch latest block
getNFTs("0xshah.eth");                           // Replace with wallet address
listenToPendingTransactions("0xshah.eth");       // Replace with wallet address
