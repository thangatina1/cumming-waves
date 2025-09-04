from browser_use import Agent, ChatOllama

llm = ChatOllama(model="llama3.1:8b")

# Create agent with the model
agent = Agent(
    task="...", # Your task here
    llm=llm
)