// const { mintNFT } = require("./mintNFT");
// const { checkOwnership } = require("./checkOwnership");
// const { getText } = require("./getText");

// async function main() {

//     // Specify the contract address (replace with your deployed contract address)
//     const contractAddress = "0x79E812A3A530a42EA963B0E3Fd7f198Cc5C2C584"; // Replace with actual deployed contract address

//     try {
//         // Specify the recipient address (replace with the actual address)
//         const recipientAddress = "0x1bd1e866C270609C903C5Ead7Bc1f8CF671B028E"; // Replace with the actual recipient address

//         // NFT metadata URI
//         const imageURI = "https://raw.githubusercontent.com/GorshkovIvan/a16z_hack_2024/refs/heads/main/nft_metadata.json";

//         // NFT Description
//         const description = "This NFT gives access to MistralAI chat endpoint.";

//         // Call the mintNFT function
//         const tokenId = await mintNFT(contractAddress, recipientAddress, description, imageURI);

//         if (tokenId) {
//             console.log(`NFT minted successfully with Token ID: ${tokenId}`);
//             // Checking ownership
//             owner  = await checkOwnership(contractAddress, tokenId, recipientAddress);
//             if (owner) {
//                 console.log("Ownership check passed!");
//             } else {
//                 console.log("Ownership check failed!");
//             }

//             // Getting text from the NFT
//             text = await getText(contractAddress, tokenId);
//             console.log("Text from NFT:", text);
//         }



//     } catch (error) {
//         console.error("Error minting NFT:", error);
//     }
// }

// main();

const { listToMarket } = require("./listToMarket"); // Update the path to the file containing the listToMarket function

// Replace these with your actual values
const CONTRACT_ADDRESS = "0x4cC9bdc7Eb85Faf4eEd052f8dE9d814448e3e9Ad"; 
const TOKEN_ID = 10; // The ID of the token you want to list
const PRICE_IN_ETHER = 0.000009; // The price at which to list the token in ETH

async function main() {
    // Call the listToMarket function to list the NFT
    await listToMarket(CONTRACT_ADDRESS, TOKEN_ID, PRICE_IN_ETHER);
}

// Execute the main function
main()
    .then(() => {
        console.log("Execution completed successfully.");
    })
    .catch((error) => {
        console.error("Error executing script:", error);
    });