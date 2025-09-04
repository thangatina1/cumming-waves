from browser_use import Agent, ChatOllama

llm = ChatOllama(model="llama3.1:8b")

async def main():
    # Create agent with the model
    agent = Agent(
        task="Launh Google and get the XPath For the Searh Box", # Your task here
        llm=llm
)
# Run the agent
    agent.run()