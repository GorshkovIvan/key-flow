// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CreditsNFT is ERC721URIStorage, Ownable {
    using Strings for uint256;

    uint256 private _tokenIds;
    mapping(uint256 => string) private _tokenTexts;

    // Marketplace additions
    mapping(uint256 => uint256) private _tokenPrices; // Maps token ID to price in wei
    mapping(uint256 => bool) private _isForSale; // Tracks if token is listed for sale
    uint256[] private _availableTokens; // Array of tokens available for purchase
    uint256 private _contractBalance; // Tracks contract's balance from commissions

    event NFTMinted(
        address indexed recipient,
        uint256 indexed tokenId,
        string description
    );
    event TokenListed(uint256 indexed tokenId, uint256 price);
    event TokenSold(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed buyer,
        uint256 price
    );
    event TokenUnlisted(uint256 indexed tokenId);

    constructor(
        string memory name,
        address initialOwner
    ) ERC721(name, "AccessKey") Ownable(initialOwner) {}

    function mintNFT(
        address recipient,
        string memory description,
        string memory imageUrl
    ) public onlyOwner returns (uint256) {
        _tokenIds++;

        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);

        _tokenTexts[newItemId] = description;
        _setTokenURI(newItemId, imageUrl);
        emit NFTMinted(recipient, newItemId, description);

        return newItemId;
    }

    function getText(uint256 tokenId) public view returns (string memory) {
        return _tokenTexts[tokenId];
    }

    // Marketplace functions
    function listToMarket(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not the token owner");
        require(price > 0, "Price must be greater than 0");
        require(!_isForSale[tokenId], "Token already listed");

        _isForSale[tokenId] = true;
        _tokenPrices[tokenId] = price;
        _availableTokens.push(tokenId);

        emit TokenListed(tokenId, price);
    }

    function unlistFromMarket(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the token owner");
        require(_isForSale[tokenId], "Token not listed");

        _removeFromAvailable(tokenId);
        _isForSale[tokenId] = false;
        delete _tokenPrices[tokenId];

        emit TokenUnlisted(tokenId);
    }

    function listAvailable() public view returns (uint256[] memory) {
        return _availableTokens;
    }

    function getTokenPrice(uint256 tokenId) public view returns (uint256) {
        require(_isForSale[tokenId], "Token not for sale");
        return _tokenPrices[tokenId];
    }

    function buyAvailable(uint256 tokenId) public payable {
        require(_isForSale[tokenId], "Token not for sale");
        require(msg.value == _tokenPrices[tokenId], "Incorrect payment amount");

        address seller = ownerOf(tokenId);
        require(seller != msg.sender, "Cannot buy your own token");

        // Calculate amounts
        uint256 commission = (msg.value * 10) / 100; // 10% commission
        uint256 sellerAmount = msg.value - commission;

        // Update contract state
        _removeFromAvailable(tokenId);
        _isForSale[tokenId] = false;
        delete _tokenPrices[tokenId];

        // Transfer NFT and payments
        _transfer(seller, msg.sender, tokenId);
        _contractBalance += commission;
        payable(seller).transfer(sellerAmount);

        emit TokenSold(tokenId, seller, msg.sender, msg.value);
    }

    function withdrawFunds() public onlyOwner {
        require(_contractBalance > 0, "No funds to withdraw");
        uint256 amount = _contractBalance;
        _contractBalance = 0;
        payable(owner()).transfer(amount);
    }

    // Internal helper function to remove a token from _availableTokens array
    function _removeFromAvailable(uint256 tokenId) internal {
        for (uint256 i = 0; i < _availableTokens.length; i++) {
            if (_availableTokens[i] == tokenId) {
                // Move the last element to the position being deleted
                _availableTokens[i] = _availableTokens[
                    _availableTokens.length - 1
                ];
                // Remove the last element
                _availableTokens.pop();
                break;
            }
        }
    }
}
