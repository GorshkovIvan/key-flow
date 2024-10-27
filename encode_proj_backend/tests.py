import requests

# URL of the FastAPI chat endpoint
url = "http://localhost:8000/chat"

# The message you want to send to the chat endpoint
payload = {
    "message": "Hello, how can I get help with my API?"
}

# Send a POST request to the /chat endpoint
response = requests.post(url, json=payload)

# Check the response
if response.status_code == 200:
    print("Response:", response.json())  # Print the JSON response
else:
    print("Error:", response.status_code, response.text)