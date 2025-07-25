import asyncio
import json
import websockets
from websockets.legacy.protocol import WebSocketCommonProtocol
from websockets.legacy.server import WebSocketServerProtocol
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from mcp.types import TextContent

HOST = "europe-west1-aiplatform.googleapis.com"
SERVICE_URL = f"wss://{HOST}/ws/google.cloud.aiplatform.v1beta1.LlmBidiService/BidiGenerateContent"
DEBUG = False

async def call_browser_use_to_submit(args):
    # Use browser-use MCP to navigate and fill the form
    server_params = StdioServerParameters(command='browser-use', args=['--mcp'], env={})
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            print('✅ Connected to browser-use MCP server')
            # 1. Navigate to the form page
            await session.call_tool('browser_navigate', arguments={'url': 'https://httpbin.org/forms/post'})
            # 2. Fill the form fields (simulate typing into the form fields)
            await session.call_tool('browser_fill', arguments={
                'selector': 'input[name="custname"]',
                'value': args['name']
            })
            await session.call_tool('browser_fill', arguments={
                'selector': 'input[name="custtel"]',
                'value': args['telephone']
            })
            await session.call_tool('browser_fill', arguments={
                'selector': 'input[name="custemail"]',
                'value': args['email']
            })
            # 3. Submit the form
            await session.call_tool('browser_click', arguments={
                'selector': 'form[action="/post"] button[type="submit"]'
            })
            return "Form submitted!"

async def proxy_task(
    client_websocket: WebSocketCommonProtocol, server_websocket: WebSocketCommonProtocol, direction: str
) -> None:
    """
    Forwards messages from one WebSocket connection to another.
    If direction == "server_to_client", intercept submit_form function call and trigger browser-use.
    """
    async for message in client_websocket:
        try:
            data = json.loads(message)
            if direction == "server_to_client":
                # Intercept Gemini function call from server to client
                # Gemini function call format: {"candidates": [{"content": {"parts": [{"functionCall": {...}}]}}]}
                function_call = None
                if isinstance(data, dict) and "candidates" in data and data["candidates"]:
                    candidate = data["candidates"][0]
                    if "content" in candidate and "parts" in candidate["content"]:
                        for part in candidate["content"]["parts"]:
                            if "functionCall" in part and part["functionCall"].get("name") == "submit_form":
                                function_call = part["functionCall"]
                                break
                if function_call:
                    args = function_call["args"] if "args" in function_call else function_call.get("arguments", {})
                    submit_result = await call_browser_use_to_submit(args)
                    # Send result to client
                    await server_websocket.send(json.dumps({"result": submit_result}))
                    continue  # Do not forward this message to client
            if DEBUG:
                print(f"proxying ({direction}): ", data)
            await server_websocket.send(json.dumps(data))
        except Exception as e:
            print(f"Error processing message: {e}")
    await server_websocket.close()

async def create_proxy(
    client_websocket: WebSocketCommonProtocol, bearer_token: str
) -> None:
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {bearer_token}",
    }
    async with websockets.connect(
        SERVICE_URL, additional_headers=headers
    ) as server_websocket:
        client_to_server_task = asyncio.create_task(
            proxy_task(client_websocket, server_websocket, direction="client_to_server")
        )
        server_to_client_task = asyncio.create_task(
            proxy_task(server_websocket, client_websocket, direction="server_to_client")
        )
        await asyncio.gather(client_to_server_task, server_to_client_task)

async def handle_client(client_websocket: WebSocketServerProtocol) -> None:
    print("New connection...")
    # Wait for the first message from the client
    auth_message = await asyncio.wait_for(client_websocket.recv(), timeout=5.0)
    auth_data = json.loads(auth_message)
    

    if "bearer_token" in auth_data:
        bearer_token = auth_data["bearer_token"]
    else:
        print("Error: Bearer token not found in the first message.")
        await client_websocket.close(code=1008, reason="Bearer token missing")
        return

    await create_proxy(client_websocket, bearer_token)

async def main() -> None:
    async with websockets.serve(handle_client, "localhost", 8080):
        print("Running websocket server localhost:8080...")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main()) 