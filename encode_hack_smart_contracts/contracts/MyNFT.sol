// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    mapping(uint256 => string) private _tokenTexts; // Mapping to store the text associated with each token ID

    event NFTMinted(address indexed recipient, uint256 indexed tokenId, string description);

    constructor(address initialOwner) ERC721("MistralAI", "AccessKey") Ownable(initialOwner) {}

    function mintNFT(address recipient, string memory description, string memory imageUrl)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds++;

        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);

        _tokenTexts[newItemId] = description; // Store the text associated with the token ID
        // Set the token URI, which usually contains the image and metadata
        _setTokenURI(newItemId, imageUrl); 
        emit NFTMinted(recipient, newItemId, description);

        return newItemId;
    }

    // Function to retrieve the text associated with a token ID
    function getText(uint256 tokenId) public view returns (string memory) {
        return _tokenTexts[tokenId];
    }
}