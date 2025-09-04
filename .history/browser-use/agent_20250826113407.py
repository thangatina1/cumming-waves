import asyncio
from browser_use import Agent, ChatOllama

llm = ChatOllama(model="llama3", timeout=999999)

async def main():
    # Create agent with the model
    agent = Agent(
        # task="Launch a browser, navigate to https://browser-use.github.io/stress-tests/challenges/react-native-web-form.html and complete the React Native Web form by filling in all required fields and submitting.", # Your task here
        llm=llm
)
# Run the agent
    await agent.run()

asyncio.run(main())