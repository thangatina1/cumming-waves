import asyncio
from browser_use import Agent, ChatOllama

llm = ChatOllama(model="llama3", timeout=999999)

async def main():
    task = "Go to https://www.wikipedia.org/, search for 'Artificial Intelligence', and summarize the first paragraph of the article." 
    # Create agent with the model
    agent = Agent(
        task=task,
        headless=False,  # Set to False to see the browser actions
        llm=llm
    )
# Run the agent
    await agent.run()

asyncio.run(main())