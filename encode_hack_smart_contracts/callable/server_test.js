
require('dotenv').config();
const contractAddress = "0x4cC9bdc7Eb85Faf4eEd052f8dE9d814448e3e9Ad"; // mistral
const openaiAddress = "0x110a739e6012609746E8b145471B3a91b24A08F8"; // openai
const tokenId = 1;
const ownerAddress = "0x1bd1e866C270609C903C5Ead7Bc1f8CF671B028E";
const recipientAddress = "0x1bd1e866C270609C903C5Ead7Bc1f8CF671B028E";
const georgeAddress = "0xcc1556f7a032a8C61fF76384dfBD54FF9b75f972";
const description = "This NFT gives access to OpenAI chat endpoint.";
const imageURI = "https://raw.githubusercontent.com/GorshkovIvan/a16z_hack_2024/refs/heads/main/nft_metadata.json"; // mistral
const openauURI = "https://raw.githubusercontent.com/GorshkovIvan/a16z_hack_2024/refs/heads/main/openai_metadata.json" // openai




fetch('http://localhost:3001/check-ownership', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify([
        contractAddress,
        tokenId,
        recipientAddress,
	]),
})
    .then(response => response.json())
    .then(data => {
        console.log('Ownership Check Result:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Test /mint-nft endpoint
fetch('http://localhost:3001/mint-nft', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        contractAddress,
        recipientAddress,
        description,
        imageURI,
    }),
})
    .then(response => response.json())
    .then(data => {
        console.log('Mint NFT Result:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Test /get-text endpoint
fetch('http://localhost:3001/get-text', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        contractAddress,
        tokenId
    }),
})
    .then(response => {
        // Check if the response is JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            return response.json(); // Parse as JSON if content-type is JSON
        } else {
            return response.text(); // Otherwise, return text for debugging
        }
    })
    .then(data => {
        console.log('Get Text Result:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });