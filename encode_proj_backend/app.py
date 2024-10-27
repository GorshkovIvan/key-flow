# 01M4kt02EEzjEs5mJ0hXfb5Kf2F8i6dO

# from mistralai import Mistral
#
# api_key = "01M4kt02EEzjEs5mJ0hXfb5Kf2F8i6dO"
# model = "mistral-large-latest"
#
# client = Mistral(api_key=api_key)
#
# chat_response = client.chat.complete(
#     model = model,
#     messages = [
#         {
#             "role": "user",
#             "content": "What is the best French cheese?",
#         },
#     ]
# )
#
# print(chat_response.choices[0].message.content)

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from mistralai import Mistral

# Initialize FastAPI
app = FastAPI()


# Define a request model
class ChatRequest(BaseModel):
    message: str
    api_token: str


# Create a Mistral client instance
client = Mistral(
    api_key="")  # Replace with your default API key or leave it for dynamic setting.


@app.post("/chat")
async def chat_endpoint(chat_request: ChatRequest):
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

# To run the server, use the following command in the terminal:
# uvicorn your_filename:app --reload


