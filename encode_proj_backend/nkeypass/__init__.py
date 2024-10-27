from fastapi import HTTPException
from web3 import Web3
from eth_account.messages import encode_defunct

w3 = Web3(Web3.HTTPProvider(""))

import aiohttp 

access_endpoint = "http://localhost:3001/check-ownership"

class TokenSet:
    def __init__(self, contract_address, token_ids):
        self.contract_address = contract_address
        self.token_ids = token_ids

    async def validate_access(self, address):
        # address = "0x1bd1e866C270609C903C5Ead7Bc1f8CF671B028E"
        
        for token_id in self.token_ids:
            async with aiohttp.ClientSession() as session:
                async with session.post(access_endpoint, json=[self.contract_address, token_id, address]) as res:
                    json_result = await res.json()
                    if not json_result:
                        return False
                    return json_result["isOwner"]
        return False


async def check_signature(request):
    request_body = await request.body()
    request_body = request_body.decode("utf-8")
    msg = encode_defunct(text=request_body)
    recovered_address = w3.eth.account.recover_message(msg, signature=request.headers["nkeypass_signed_request"])

    return recovered_address == request.headers["nkeypass_address"]

async def validate_access(request, token_set):
    print(type(request))
    if not await check_signature(request):
        raise HTTPException(400, "Address authentication failed")

    if not await token_set.validate_access(request.headers["nkeypass_address"]):
        raise HTTPException(400, "User does not have access to the available NFT")

    return True
