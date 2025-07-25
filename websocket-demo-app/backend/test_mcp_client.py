import asyncio
import json

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from mcp.types import TextContent

async def run_browser_use_mcp_client():

	# Create connection parameters for the browser-use MCP server
	server_params = StdioServerParameters(command='browser-use', args=['--mcp'], env={})

	async with stdio_client(server_params) as (read, write):
		async with ClientSession(read, write) as session:
			# Initialize the connection
			await session.initialize()

			print('✅ Connected to browser-use MCP server')

			# List available tools
			tools_result = await session.list_tools()
			tools = tools_result.tools
			print(f'\n📋 Available tools: {len(tools)}')
			for tool in tools:
				print(f'  - {tool.name}: {tool.description}')

			# Example 1: Navigate to a website
			print('\n🌐 Navigating to example.com...')
			result = await session.call_tool('browser_navigate', arguments={'url': 'https://github.com'})
			# Handle different content types
			content = result.content[0]
			if isinstance(content, TextContent):
				print(f'Result: {content.text}')
			else:
				print(f'Result: {content}')

if __name__ == "__main__":
    asyncio.run(run_browser_use_mcp_client()) 