const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

// Load ABI from the JSON file
const contractJSON = require(path.join(__dirname, "CreditsNFT.json"));

// Function to get text from NFT by token ID
async function getText(contractAddress, tokenId) {
    const PRIVATE_KEY = process.env.PK;
    const API_URL = process.env.RPC_URL;

    const provider = new ethers.providers.JsonRpcProvider(API_URL); // Change to your RPC URL

    // Create a new wallet instance
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    
    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractJSON.abi, wallet);

    try {
        const text = await contract.getText(tokenId);
        console.log(`Text for token ID ${tokenId}: ${text}`);
        return text;
    } catch (error) {
        console.error('Error calling getText:', error);
    }
}

module.exports = { getText };