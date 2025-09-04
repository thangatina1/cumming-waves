import asyncio
from browser_use import Agent, ChatOllama

llm = ChatOllama(model="llama3.1:8b")
# llm=ChatOllama(base_url="http://222.20.126.207:11328", model="gemma3:27b",timeout=999999)

async def main():
    # Create agent with the model
    agent = Agent(
        task="Launh Google and get the XPath For the Searh Box", # Your task here
        llm=llm
)
# Run the agent
    await agent.run()

asyncio.run(main())