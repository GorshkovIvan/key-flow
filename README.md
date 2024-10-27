# KeyFlow

KeyFlow enables secondary market trading for API credits issued by machine learning (ML) and cloud computing providers. Each API key is transformed into a unique non-fungible token (NFT), facilitating seamless resale and allowing providers to earn royalties while enhancing access to AI services.

## Features

- **Developer Tool:** Convert API credits to NFTs on BASE.
- **Tokenized Credits:** Easy transfer and sale of tokenized credits.
- **Frontend Integration:** Simple integration with the Coinbase Smart Wallet.
- **Decentralized Marketplace:** Fully built and functioning decentralized API marketplace on BASE.
- **Coinbase Paymaster Integration:** Streamlined payment solutions.
- **Mistral AI chat wrapper:** To demonstrate keyflow capabilities.
- **Provider Commission:** API Provider can set a custom commission for each resell.

## Directory Structure

- **`encode_frontend`**: Decentralised API marketplace.
- **`encode_hack_smart_contracts`**: Smart contract interactions.
- **`encode_proj_backend`**: Website backend.
- **`encode_proj_deployment`**: Deploying smart contracts script.

## KeyFlow Architecture
<img width="1224" alt="architecture-diagram" src="https://github.com/user-attachments/assets/1d36da71-9264-4b5d-9b67-0a1535e077e1">

Keyflow allows users to convert API credits from multiple providers to NFTs on BASE, redistributing the value of the credits to the users. The architecture is designed to be modular, allowing for easy integration of new providers.

Each provider has its own smart contract deployed on BASE that converts API credits to NFTs. The NFTs are then listed on the marketplace, where users can buy and sell them. The marketplace is a decentralized application built on BASE, allowing for peer-to-peer trading of NFTs. 

## NFT Example
<img width="535" alt="metamask-nft-showcase" src="https://github.com/user-attachments/assets/c0584214-4361-47f6-95f9-b071130408e2">

## Keyflow MistralAI chat wrapper
<img width="671" alt="keyflow chat demo" src="https://github.com/user-attachments/assets/f0dd635e-ba54-4d11-8c78-3b8ffa7d2e8d">

Owning an NFT from KeyFlow allows you to use the API of the associated provider. In this example, we use the Mistral AI chat wrapper.
When making a request in the chat-demo, the request is signed with user's wallet and verified on the backend. Backend verifies the signature, checks remaining credits and makes a request to the provider's API on behalf of the user.

Key points:
- NFT's remaining credits are automatically updated when new requests are made.
- Wallet & NFT ownership verification happens via SIWE protocol.
- Demo's API is integrated with Mistral AI

## Keyflow Marketplace
<img width="1233" alt="keyflow marketplace screenshots" src="https://github.com/user-attachments/assets/0401efa2-065b-40ec-82a7-6e25f74c5f85">

The marketplace is a decentralized application built on BASE, allowing for peer-to-peer trading of NFTs.

Users can explore market for available credits by API providers and purchase them via Coinbase Smart Wallet. Track their owned NFTs and remaining credits and list them for sale.

Key points:
- Providers can set a custom commission for each resell. Making second-hand market economically sustainable for them, as each resell increases price per credit. C
- Credits are grouped by API provider, making it easier to compare and purchase.
- Listing and delisting of NFTs is instant, and happens onchain.
- NFTs are ERC-721 compliant, so they are fully compatible with all platforms and wallets supporting ERC-721 standard.

## Paymaster Enabled Gasless Transactions
<img width="412" alt="paymaster enabled gasless transactions" src="https://github.com/user-attachments/assets/c1a898f1-9575-458b-b393-f6161896fe3f">

KeyFlow supports Coinbase Paymaster for gasless transactions. This allows users to purchase NFTs without the need to pay for gas upfront. This helps us to onboard new users who may not have a BASE wallet or want to avoid the hassle of gas payments.