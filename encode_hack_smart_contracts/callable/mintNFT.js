
const { ethers } = require("ethers");
const path = require("path");

// Load the compiled contract JSON file
const contractJSON = require(path.join(__dirname, "CreditsNFT.json"));

async function mintNFT(contractAddress, recipientAddress, description, imageURI) {

    // const PRIVATE_KEY = process.env.PK;
    // const API_URL = process.env.RPC_URL;

    const PRIVATE_KEY = "";
    const API_URL = "";

    console.log("Base Sepolia RPC URL:", API_URL);
    console.log("Private Key:", PRIVATE_KEY); // Ensure this logs your key

    // Connect to the Ethereum network (e.g., using Infura)
    const provider = new ethers.providers.JsonRpcProvider(API_URL);

    // Use the deployer's private key to sign transactions
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);


    // Load the ABI dynamically from the compiled JSON file
    const contractABI = contractJSON.abi;

    // Get the contract instance
    const myNFT = new ethers.Contract(contractAddress, contractABI, wallet);

    // Call the mint function with the recipient address
    const mintTx = await myNFT.mintNFT(recipientAddress, description, imageURI);

    // Wait for the transaction to be mined
    const receipt = await mintTx.wait();

    // Find the tokenId from the NFTMinted event
    const event = receipt.events.find(event => event.event === "NFTMinted");
    if (event) {
        const tokenId = event.args.tokenId.toString(); // Get the tokenId from the event arguments
        console.log(`NFT minted successfully to address: ${recipientAddress}`);
        console.log(`Token ID: ${tokenId}`);
        return tokenId; // Return token ID if you need it elsewhere
    } else {
        console.error("NFTMinted event not found in transaction receipt.");
        return null;
    }
}

// Export the function to be used in other files
module.exports = { mintNFT };