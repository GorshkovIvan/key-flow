const express = require('express');
require('dotenv').config();
const { checkOwnership } = require('./checkOwnership'); // Import the checkOwnership function
const { mintNFT } = require('./mintNFT'); // Import the mintNFT function
const { getText } = require('./getText'); // Import the mintNFT function

const app = express();
const PORT = process.env.PORT || 3001; // Port for the server

// Middleware to parse JSON request bodies
app.use(express.json());

// Define the API endpoint
app.post('/check-ownership', async (req, res) => {
    const [ contractAddress, tokenId, ownerAddress ] = req.body;

    if (!contractAddress || !tokenId || !ownerAddress) {
        return res.status(400).json({ error: "Please provide contractAddress, tokenId, and ownerAddress." });
    }

    try {
        const isOwner = await checkOwnership(contractAddress, tokenId, ownerAddress);
        res.json({ "isOwner": isOwner });
    } catch (error) {
        console.error("Error checking ownership:", error);
        res.status(500).json({ error: "An error occurred while checking ownership." });
    }
});

// Define the mint NFT API endpoint
app.post('/mint-nft', async (req, res) => {
    const { contractAddress, recipientAddress, description, imageURI } = req.body;

    if (!contractAddress || !recipientAddress || !description || !imageURI) {
        return res.status(400).json({ error: "Please provide contractAddress, recipientAddress, description, and imageURI." });
    }

    try {
        const tokenId = await mintNFT(contractAddress, recipientAddress, description, imageURI);
        if (tokenId) {
            res.json({ message: "NFT minted successfully", tokenId: tokenId });
        } else {
            res.status(500).json({ error: "Failed to mint NFT. Event not found." });
        }
    } catch (error) {
        console.error("Error minting NFT:", error);
        res.status(500).json({ error: "An error occurred while minting NFT." });
    }
});

// Define the get text from NFT API endpoint
app.post('/get-text', async (req, res) => {
    const { contractAddress, tokenId } = req.body;

    if (!contractAddress || !tokenId) {
        return res.status(400).json({ error: "Please provide contractAddress and tokenId." });
    }

    try {
        const text = await getText(contractAddress, tokenId);
        if (text) {
            res.json({ message: "Text retrieved successfully", text: text });
        } else {
            res.status(500).json({ error: "Failed to retrieve text." });
        }
    } catch (error) {
        console.error("Error retrieving text:", error);
        res.status(500).json({ error: "An error occurred while retrieving text from the NFT." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
