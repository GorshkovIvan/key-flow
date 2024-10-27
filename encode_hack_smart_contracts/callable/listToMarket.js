const { ethers } = require("ethers");
const path = require("path");

// Load the compiled contract JSON file
const contractJSON = require(path.join(__dirname, "CreditsNFT.json"));

async function listToMarket(contractAddress, tokenId, priceInEther) {
    
    // Set up private key and API URL (add your key and RPC URL or use environment variables)
    // const PRIVATE_KEY = process.env.PK;
    // const API_URL = process.env.RPC_URL;
    const PRIVATE_KEY = "0c31b01f98b4c7829bca63064b4ea4e4851124fbeb8d6c021ed79affc75c542a"; // Add your private key here
    const API_URL = "https://base-sepolia.infura.io/v3/2557d97cf1bc41d9b56f2d4ad0b8e921";     // Add your RPC URL here

    // Connect to the Ethereum network
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    // Load the ABI dynamically from the compiled JSON file
    const contractABI = contractJSON.abi;
    const myNFT = new ethers.Contract(contractAddress, contractABI, wallet);

    // Convert price to wei
    const priceInWei = ethers.utils.parseEther(priceInEther.toString());

    try {
        // Call the listToMarket function
        const tx = await myNFT.listToMarket(tokenId, priceInWei);
        console.log(`Listing token ${tokenId} for sale at ${priceInEther} ETH...`);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log(`Token ${tokenId} listed successfully! Transaction hash: ${receipt.transactionHash}`);
    } catch (error) {
        console.error("Error listing token:", error);
    }
}

// Export the function to be used in other files
module.exports = { listToMarket };