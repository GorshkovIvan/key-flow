// checkOwnership.js
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
const contractJSON = require(path.join(__dirname, "CreditsNFT.json"));

// const PRIVATE_KEY = process.env.PK;
// const API_URL = process.env.RPC_URL;
const PRIVATE_KEY = "";
const API_URL = "";

// Function to check NFT ownership
async function checkOwnership(contractAddress, tokenId, ownerAddress) {
    console.log("Checking ownership of NFT...");
    console.log("PK:", PRIVATE_KEY);
    console.log("RPC URL:", API_URL);

    // Load ABI from JSON file

    // Create a new instance of the ethers provider
    const provider = new ethers.providers.JsonRpcProvider(API_URL); // Change to your RPC URL
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractJSON.abi, wallet);

    try {
        // Check the owner of the tokenId
        const owner = await contract.ownerOf(tokenId);
        console.log(`Owner of token ${tokenId} is: ${owner}`);

        // Check if the owner address matches
        if (owner.toLowerCase() === ownerAddress.toLowerCase()) {
            console.log(`${ownerAddress} owns the NFT with token ID ${tokenId}`);
            return true;
        } else {
            console.log(`${ownerAddress} does not own the NFT with token ID ${tokenId}`);
            return false;
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Export the function for use in other files
module.exports = { checkOwnership };