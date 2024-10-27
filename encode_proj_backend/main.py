from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pymongo import MongoClient
from fastapi import FastAPI, Request
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
import os
from mistralai import Mistral
import nkeypass
from fastapi import FastAPI, HTTPException
from bson import ObjectId


load_dotenv()

app = FastAPI()
MONGO_URI = "/"

origins = ['http://localhost:3000', 
            'https://localhost:3000', 
           'https://localhost:8001', 
           'http://localhost:8080',
           'http://127.0.0.1',
           ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# middleware
app.add_middleware(
    CORSMiddleware,
    #allow_origins=origins,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create a Mistral client instance
mistral_client = Mistral(
    api_key=os.environ["MISTRAL_API_KEY"])  # Replace with your default API key or leave it for dynamic setting.

token_set = nkeypass.TokenSet("0x79E812A3A530a42EA963B0E3Fd7f198Cc5C2C584", [4])
#@app.options("/chat", tags=["chat"])
#async def chat_endpoint(request: Request):
#    return JSONResponse(headers={"Allow": "OPTIONS,POST"}, content={})

# Helper for ObjectId type
# Helper for ObjectId type
# Helper for ObjectId type
class ChatRequest(Request):
    message: str

class ProductCreateModel(BaseModel):
    company_name: str = Field(...)
    short_description: str = Field(...)
    long_description: str = Field(...)
    credits: float = Field(...)
    price: float = Field(...)
    owner_address: str = Field(...)
    contract_address: str = Field(...)
    token_id: int = Field(...)
    logo_link: str = Field(...)
    sold: bool = Field(default=False)
    listed: bool = Field(default=True)
# Helper for ObjectId type
class ProductModel(BaseModel):
    id: str
    company_name: str = Field(...)
    short_description: str = Field(...)
    long_description: str = Field(...)
    credits: float = Field(...)
    price: float = Field(...)
    owner_address: str = Field(...)
    contract_address: str = Field(...)
    token_id: int = Field(...)
    logo_link: str = Field(...)
    date_added: datetime = Field(default_factory=datetime.utcnow)
    date_purchased: Optional[datetime] = None
    sold: bool = Field(default=False)
    listed: bool = Field(default=True)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "company_name": "API Co.",
                "short_description": "This is a short API description.",
                "long_description": "This is a long API description.",
                "credits": 1000.0,
                "price": 50.0,
                "seller_address": "0x123456789abcdef",
                "contract_address": "0x123456789abcdef",
                "token_id": 1,
                "logo_link": "https://example.com/logo.png",
                "sold": False,
                "listed": True
            }

        }

# Initialize MongoDB client and database
client = MongoClient(MONGO_URI)  # Use MongoClient for synchronous operations
db = client.apiswap  # Use your database name here
collection = db.products


@app.post("/add_key")
async def add_key(product: ProductCreateModel):
    """Adds a new NFT API key entry to the database."""
    product_dict = product.dict(by_alias=True)
    result = collection.insert_one(product_dict)  # Use synchronous insert
    if result.inserted_id:
        return {"message": "Product added successfully", "product_id": str(result.inserted_id)}
    raise HTTPException(status_code=500, detail="Failed to add product")


@app.get("/list_keys", response_model=List[ProductModel])
async def list_keys():
    """Fetches all NFT API key entries from the database."""
    # Fetch all products from the database
    products = list(collection.find())

    # Convert MongoDB documents to Pydantic model instances
    products_list = []
    for product in products:
        product["id"] = str(product["_id"])  # Convert ObjectId to string
        products_list.append(ProductModel(**product))  # Validate against ProductModel

    return products_list


@app.get("/fetch_unsold_keys")
async def fetch_unsold_keys():
    """Fetches all unsold NFT API key entries from the database."""
    unsold_products = list(collection.find({"sold": False}))  # Use synchronous find
    # Convert MongoDB documents to Pydantic model instances
    products_list = []
    for product in unsold_products:
        product["id"] = str(product["_id"])  # Convert ObjectId to string
        products_list.append(ProductModel(**product))  # Validate against ProductModel

    return products_list


@app.post("/buy/{key_id}/{new_owner_address}")
async def buy_key(key_id: str, new_owner_address: str):
    """Sets the 'sold' field of a specific NFT API key to True and updates the seller_address."""
    update_result = collection.update_one(
        {"_id": ObjectId(key_id)},
        {
            "$set": {
                "sold": True,
                "listed": False,
                "date_purchased": datetime.utcnow(),
                "seller_address": new_owner_address
            }
        }
    )

    if update_result.modified_count == 1:
        return {"message": "Product marked as sold"}

    raise HTTPException(status_code=404, detail="Product not found")


@app.post("/set_listed/{key_id}")
async def set_listed(key_id: str):
    """Sets the 'listed' field of a specific NFT API key to True."""
    update_result = collection.update_one(
        {"_id": ObjectId(key_id)},
        {"$set": {"listed": True}}
    )

    if update_result.modified_count == 1:
        return {"message": "Product status updated to listed"}

    raise HTTPException(status_code=404, detail="Product not found")

@app.post("/delist/{key_id}")
async def delist(key_id: str):
    """Sets the 'listed' field of a specific NFT API key to False."""
    update_result = collection.update_one(
        {"_id": ObjectId(key_id)},
        {"$set": {"listed": False}}
    )

    if update_result.modified_count == 1:
        return {"message": "Product status updated to delisted"}

    raise HTTPException(status_code=404, detail="Product not found")

@app.get("/products/listed", response_model=List[ProductModel])
async def get_listed_products():
    """Fetches all products where listed is True."""
    # Query to fetch products where listed is True
    products = collection.find({"listed": True})

    products_list = []
    for product in products:
        product["id"] = str(product["_id"])  # Convert ObjectId to string
        products_list.append(ProductModel(**product))  # Validate against ProductModel


    return products_list

@app.delete("/remove/{key_id}")
async def delete_key(key_id: str):
    """Deletes a specific NFT API key."""
    delete_result = collection.delete_one({"_id": ObjectId(key_id)})


    if delete_result.deleted_count == 1:
        return {"message": "Product deleted successfully"}

    raise HTTPException(status_code=404, detail="Product not found")


@app.options("/chat")
async def handle_options():
    return {"Allow": "POST, OPTIONS", "Access-Control-Allow-Origin": "*"}


@app.post("/chat", tags=["chat"])
async def chat_endpoint(request: Request):
    print(f"request: {request.client}")
    # await nkeypass.validate_access(request, token_set)

    # Retrieve the message from the request
    user_message = await request.json()
    print(user_message)
    user_message = user_message["message"]

    # Call the chat completion method
    chat_response = mistral_client.chat.complete(
        model="mistral-large-latest",
        messages=[
            {
                "role": "user",
                "content": user_message,
            },


        ]
    )

    # Return the response content
    return {"response": chat_response.choices[0].message.content}

@app.post("/chat_v2")
async def chat_endpoint_v2(chat_request: ChatRequest):
    # Retrieve the message and API token from the request
    user_message = chat_request.message
    api_key = chat_request.api_token

    # Check if the API key is provided
    if not api_key:
        raise HTTPException(status_code=400, detail="API token is required")

    # Create a new Mistral client with the provided API token
    mistral_client = Mistral(api_key=api_key)

    try:
        # Call the chat completion method
        chat_response = mistral_client.chat.complete(
            model="mistral-large-latest",
            messages=[
                {
                    "role": "user",
                    "content": user_message,
                },
            ]
        )

        # Return the response content
        return {"response": chat_response.choices[0].message.content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))