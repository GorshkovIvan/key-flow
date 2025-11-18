# KeyFlow

KeyFlow enables secondary market trading for API credits issued by machine learning (ML) and cloud computing providers. Each API key is transformed into a unique token, facilitating seamless resale and allowing providers to earn royalties while enhancing access to AI services.

## Features

- **Developer Tool:** Convert API credits to tokens on BASE.
- **Tokenized Credits:** Easy transfer and sale of tokenized credits.
- **Frontend Integration:** Simple frontend integration.
- **Decentralized Marketplace:** Fully built and functioning API marketplace on BASE.
- **Paymaster Integration:** Streamlined payment solutions.
- **Mistral AI chat wrapper:** To demonstrate keyflow capabilities.
- **Provider Commission:** API Provider can set a custom commission for each resell.

## Directory Structure

- **`encode_frontend`**: API marketplace.
- **`encode_hack_smart_contracts`**: Smart contract interactions.
- **`encode_proj_backend`**: Website backend.
- **`encode_proj_deployment`**: Deployment script.

## KeyFlow Architecture
<img width="1224" alt="architecture-diagram" src="https://github.com/user-attachments/assets/1d36da71-9264-4b5d-9b67-0a1535e077e1">

Keyflow allows users to convert API credits from multiple providers to tokens, redistributing the value of the credits to the users. The architecture is designed to be modular, allowing for easy integration of new providers.

Each provider has its own smart contract deployed on BASE that converts API credits to tokens. Tokens are then listed on the marketplace, where users can buy and sell them. The marketplace is an application built on BASE, allowing for peer-to-peer trading of API credits. 

## Token Example
<img width="535" alt="metamask-nft-showcase" src="https://github.com/user-attachments/assets/c0584214-4361-47f6-95f9-b071130408e2">

## Keyflow MistralAI chat wrapper
<img width="671" alt="keyflow chat demo" src="https://github.com/user-attachments/assets/f0dd635e-ba54-4d11-8c78-3b8ffa7d2e8d">

Owning API credits with KeyFlow allows you to use the API of the associated provider. In this example, we use the Mistral AI chat wrapper.
When making a request in the chat-demo, the request is signed with user's wallet and verified on the backend. Backend verifies the signature, checks remaining credits and makes a request to the provider's API on behalf of the user.

Key points:
- Credits remaining credits are automatically updated when new requests are made.
- Ownership verification happens via SIWE protocol.
- Demo's API is integrated with Mistral AI

## Keyflow Marketplace
<img width="1233" alt="keyflow marketplace screenshots" src="https://github.com/user-attachments/assets/0401efa2-065b-40ec-82a7-6e25f74c5f85">

The marketplace is an application built on BASE, allowing for peer-to-peer trading of API credits.

Users can explore market for available credits by API providers and purchase them. Track their owned credits and list them for sale.

Key points:
- Providers can set a custom commission for each resell. Making second-hand market economically sustainable for them, as each resell increases price per credit. 
- Credits are grouped by API provider, making it easier to compare and purchase.
- Listing and delisting of credits is instant.

## Paymaster Enabled Gasless Transactions
<img width="412" alt="paymaster enabled gasless transactions" src="https://github.com/user-attachments/assets/c1a898f1-9575-458b-b393-f6161896fe3f">

KeyFlow supports Paymaster for payments.
