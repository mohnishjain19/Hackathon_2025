import asyncio
import websockets
import json

class MCPClient:
    """
    A client for connecting to an MCP server, discovering tools, and invoking tool calls.
    """
    def __init__(self, mcp_server_url):
        self.mcp_server_url = mcp_server_url
        self.websocket = None
        self.tools = {}  # tool_name -> schema

    async def connect(self):
        """Establish a websocket connection to the MCP server and perform handshake."""
        self.websocket = await websockets.connect(self.mcp_server_url)
        # Send MCP handshake ("hello") message
        handshake_msg = {
            "type": "hello",
            "protocol": "mcp/1.0",
            "client": "gemini-multimodal-mcp-client"
        }
        await self.websocket.send(json.dumps(handshake_msg))
        # Wait for server hello/ack (optional, depending on server)
        response = await self.websocket.recv()
        resp_data = json.loads(response)
        if resp_data.get("type") != "hello":
            raise RuntimeError(f"Unexpected MCP handshake response: {resp_data}")
        # Optionally, fetch tools immediately
        await self.fetch_tools()

    async def fetch_tools(self):
        """Fetch and parse available tool schemas from the MCP server."""
        # Send a request for tool schemas (MCP spec: type="list_tools")
        list_tools_msg = {
            "type": "list_tools"
        }
        await self.websocket.send(json.dumps(list_tools_msg))
        # Wait for the response
        response = await self.websocket.recv()
        resp_data = json.loads(response)
        if resp_data.get("type") == "tool_list":
            # Store tools: {tool_name: schema}
            for tool in resp_data.get("tools", []):
                name = tool.get("name")
                schema = tool.get("schema")
                if name and schema:
                    self.tools[name] = schema
            print(f"Discovered tools: {list(self.tools.keys())}")
        else:
            raise RuntimeError(f"Unexpected tool list response: {resp_data}")

    async def call_tool(self, tool_name, parameters):
        """Invoke a tool by name with the given parameters via MCP protocol."""
        # TODO: Implement tool call logic
        pass

    async def close(self):
        """Close the websocket connection."""
        if self.websocket:
            await self.websocket.close()
            self.websocket = None 