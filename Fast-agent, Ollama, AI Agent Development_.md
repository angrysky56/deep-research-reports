# **Developer's Guide to Crafting AI Agents with fast-agent-mcp and Local Ollama Models**

## **1\. Introduction**

The development of sophisticated AI agents often involves integrating Large Language Models (LLMs) with external tools and data sources. The fast-agent-mcp framework is designed to facilitate this process, enabling the creation and interaction with complex agents and workflows.1 Ollama allows developers to run powerful open-source LLMs, such as generic.qwen3 (a Qwen model variant), locally, ensuring data privacy and cost efficiency.3 Central to fast-agent-mcp's architecture is the Model Context Protocol (MCP), an open standard for connecting AI models to diverse capabilities.4

This guide provides a developer-focused technical analysis for creating AI agents using fast-agent-mcp in conjunction with local Ollama models. It covers the architectural underpinnings, setup procedures, API utilization, practical examples, and considerations for AI-specific model formats, focusing on actionable information for AI developers.

## **2\. Understanding the Core Technologies**

A foundational understanding of fast-agent-mcp, the Model Context Protocol (MCP), and Ollama is essential for effectively building AI agents with these technologies.

### **2.1. fast-agent-mcp Architecture**

fast-agent-mcp is a Python framework engineered for building and managing AI agents and multi-step workflows. It is "MCP native," meaning its design inherently supports the Model Context Protocol for extending agent capabilities.1 Key architectural characteristics include:

* **Agent and Workflow Definition:** Agents are defined using a declarative Python syntax, typically with decorators like @fast.agent. The framework supports various workflow patterns to combine multiple agents, such as:  
  * **Chain:** Executes agents sequentially.2  
  * **Parallel:** Sends the same message to multiple agents simultaneously.2  
  * **Evaluator-Optimizer:** Uses one agent to generate content and another to evaluate and refine it iteratively.2  
  * **Router:** Employs an LLM to direct a message to the most appropriate agent from a list.2  
  * **Orchestrator:** Leverages an LLM to devise a plan and distribute sub-tasks among available agents for complex objectives.2  
* **MCP Integration:** Agents can seamlessly use external tools and data sources exposed as MCP servers. These servers are declared in a configuration file and linked to agents via their definitions.2  
* **Multimodal Support:** fast-agent-mcp supports multimodal inputs, such as images and PDFs, within prompts, resources, and MCP tool call results, primarily for its directly supported Anthropic and OpenAI models.1  
* **Configuration Files:** Agent prompts and configurations are stored in simple files, facilitating version control and management.2 The primary configuration file is typically fastagent.config.yaml.2

### **2.2. Model Context Protocol (MCP)**

MCP, originally developed by Anthropic, is an open protocol that standardizes the way AI models connect to and interact with external tools, data sources, and prompts.4 It operates on a client-server architecture:

* **MCP Servers:** These are lightweight applications that expose tools, resources (data), or structured prompts to AI systems. They act as gateways to external capabilities.4 For instance, a database, a web search API, or a custom Python script can be exposed as an MCP server.  
* **MCP Clients:** AI applications or agents act as MCP clients. They connect to MCP servers to discover available tools/resources and then invoke them as needed to fulfill user requests or achieve goals.4  
* **MCP Host:** An AI tool or application, like fast-agent-mcp or the Claude Desktop App, that uses MCP clients to interact with MCP servers is termed an MCP Host.4

This architecture promotes modularity, allowing developers to update tools or AI models independently. An agent can gain new capabilities simply by connecting to new or updated MCP servers, without requiring changes to the agent's core code.4

### **2.3. Ollama**

Ollama is a tool that simplifies the process of running open-source LLMs locally on a developer's machine.3 Its key advantages for agent development include:

* **Local Execution:** Ollama enables models like Llama 3, Qwen, Mistral, and others to run directly on a personal computer or local server. This is particularly beneficial for tasks involving sensitive data that should not be sent to third-party API providers.3  
* **Cost-Effectiveness:** Using local models via Ollama eliminates per-token costs associated with proprietary LLM APIs.3  
* **Model Choice & Customization:** Developers can choose from a wide range of open-source models and, in some cases, use customized versions.  
* **API Access:** Ollama exposes a local HTTP API (typically on port 11434\) that allows applications to interact with the running LLMs, making it compatible with frameworks like fast-agent-mcp through appropriate configurations.9  
* **Tool Calling Support:** Many models available through Ollama, such as certain Qwen variants, support tool calling, which is crucial for building functional agents that can interact with their environment.3

The combination of fast-agent-mcp's agentic framework, MCP's standardized tool integration, and Ollama's local LLM serving capabilities provides a powerful stack for developing versatile and private AI agents.

## **3\. Prerequisites and Environment Setup**

Before developing AI agents with fast-agent-mcp and local Ollama models, ensure the following components are installed and configured:

* **Python:** fast-agent-mcp requires Python 3.10 or higher.7 It is advisable to use a recent stable version of Python.  
* **Ollama:**  
  * Download and install Ollama for your operating system from the official Ollama website (ollama.com). The installation process is generally quick.3  
  * Once installed, ensure the Ollama server is running. This can typically be started with the command ollama serve if it's not already running as a background service.9  
  * Pull a desired LLM that supports tool calling. For example, to use a Qwen model like generic.qwen3 (the user query implies a Qwen model, potentially qwen:7b or similar, aliased or referred to as qwen3 locally):  
    Bash  
    ollama pull qwen2 \# Or a specific version like qwen:7b  
    Alibaba's Qwen models are noted for good local tool calling capabilities.3 For instance, qwen2.5-7b is a 4.7GB download and suitable for most machines.3 The godstale/ollama-mcp-agent project recently changed its default to qwen3:14b.8 The specific model tag (e.g., :7b, :14b) should be chosen based on available hardware resources.  
* **uv Package Installer:** fast-agent-mcp documentation and examples frequently use uv, a fast Python package installer and resolver.6 While pip can also be used, uv is recommended. uv can be installed following instructions from its official source.  
* **MCP Servers (Optional but Recommended for Tool Use):**  
  * If your agents need to use tools beyond basic LLM chat, the corresponding MCP servers must be available. fast-agent-mcp comes with configurations for some standard servers (e.g., filesystem 12).  
  * Custom tools require custom MCP server implementations, or you can use publicly available MCP servers from sources like Smithery.ai.8  
* **Development Environment:** A code editor such as VS Code is recommended. Ensure your terminal environment is configured for Python development (e.g., virtual environments).

Verifying Ollama Setup:  
After installing Ollama and pulling a model, you can test if the Ollama server is accessible by sending a request to its default API endpoint:

Bash

curl http://localhost:11434/api/tags

This command should list the models you have pulled locally.

## **4\. Installing fast-agent-mcp**

Once the prerequisites are met, fast-agent-mcp can be installed. The recommended method involves using the uv package manager:

Bash

uv pip install fast-agent-mcp

6

Alternatively, if you prefer using pip:

Bash

pip install fast-agent-mcp

7

After installation, fast-agent-mcp provides a command-line utility to help set up initial configuration files and example agents. Running the following command will create these foundational files in your current directory:

Bash

fast-agent setup

2

This command typically generates:

* An example agent script (e.g., agent.py or sizer.py).  
* A default fastagent.config.yaml file, which defines MCP server configurations and other settings.  
* A fastagent.secrets.yaml file for API keys (though for purely local Ollama usage without external API-keyed MCP servers, this might not be extensively used for Ollama itself).

To explore various workflow patterns, fast-agent-mcp also offers a quickstart command:

Bash

fast-agent quickstart workflow

2  
This command generates examples demonstrating different agentic workflows like chains, routers, and orchestrators.  
It is advisable to run these commands in a dedicated project directory and within an active Python virtual environment.

## **5\. Configuring fast-agent-mcp for Local Ollama Models**

To enable fast-agent-mcp to communicate with a locally running Ollama instance (e.g., serving a generic.qwen3 model), specific configuration is required. This primarily involves setting an environment variable for the Ollama API endpoint and understanding how fast-agent-mcp utilizes its "Generic" model provider.

### **5.1. The fastagent.config.yaml File**

The fastagent.config.yaml file is central to configuring fast-agent-mcp's behavior, especially for defining MCP servers that agents can use.2 When fast-agent setup is run, a default version of this file is created. For Ollama integration, the key aspect is not typically within this file for the *model provider itself*, but rather for any *tools (MCP servers)* the Ollama-backed agent might use.

An example structure for defining an MCP server (like the default filesystem server) in fastagent.config.yaml is 12:

YAML

logger:  
  type: file  
  level: error \# Can be changed to 'debug' for more verbose logging  
  truncate\_tools: true  
mcp:  
  servers:  
    filesystem:  
      command: "npx"  
      args: \["-y", "@modelcontextprotocol/server-filesystem", "."\]  
      \# transport: "stdio" \# Often stdio for local command-run servers

This structure involves specifying a command to execute the server and args to pass to that command. The transport field (e.g., stdio, sse, http) defines how fast-agent-mcp communicates with the MCP server process.8

### **5.2. The "Generic" Model Provider and GENERIC\_BASE\_URL**

fast-agent-mcp supports various LLM providers. For local models served via an OpenAI-compatible API, such as those provided by Ollama, the "Generic" provider is utilized.

The fast-agent check command provides valuable diagnostic information about the fast-agent-mcp environment. Output from this command has shown "Generic... ollama (default)" under the provider status, indicating that Ollama is a recognized target for the Generic provider.14

To connect to a local Ollama instance, fast-agent-mcp relies on an environment variable to specify the base URL of the Ollama server. Release notes for fast-agent-mcp (specifically version v0.2.11) indicate a fix for reading base URLs from environment variables for "Generic and OpenRouter" providers.15 The relevant environment variable for the Generic provider is:

GENERIC\_BASE\_URL

This was confirmed by examining the associated pull request (\#59) for that release.15

Before running your fast-agent-mcp application, you must set this environment variable to point to your Ollama server's API endpoint. Ollama typically serves its API at http://localhost:11434.

Bash

export GENERIC\_BASE\_URL="http://localhost:11434"

On Windows, you would use:

PowerShell

$env:GENERIC\_BASE\_URL\="http://localhost:11434"

Or for command prompt:

DOS

set GENERIC\_BASE\_URL=http://localhost:11434

This configuration allows fast-agent-mcp's internal Generic LLM client to direct API requests (like chat completions) to the correct local Ollama server. Some other MCP client libraries use similar environment variables like OLLAMA\_ENDPOINT or MCP\_BASE\_URL for this purpose.16

### **5.3. Model String Format for Ollama Models**

When defining an agent in fast-agent-mcp to use a local Ollama model, you specify the model using a string in the format generic.MODEL\_NAME. For example, to use an Ollama model named qwen3 (which you would have previously pulled using ollama pull qwen3 or a more specific tag like ollama pull qwen:7b and are referring to as qwen3), the model string would be:  
"generic.qwen3"  
The fast-agent-mcp framework internally parses this string. The generic. prefix signals the use of the Generic LLM provider. The subsequent part, qwen3, is then passed as the model identifier in the API request to the Ollama server at the GENERIC\_BASE\_URL. This mechanism allows fast-agent-mcp to abstract the specifics of the Ollama API interaction behind its generic client interface.

### **5.4. The fastagent.secrets.yaml File**

The fastagent.secrets.yaml file is intended for storing API keys for various services.2 For a purely local Ollama setup without any external MCP servers that require API keys, this file might not hold specific secrets for Ollama itself, as local Ollama access typically does not require an API key. However, if your Ollama-powered agent uses an MCP tool (e.g., a weather API via an MCP server) that *does* require an API key, that key would be configured according to that MCP server's needs, potentially using this secrets file or environment variables as defined by the tool's MCP server.

By correctly setting the GENERIC\_BASE\_URL environment variable and using the generic.MODEL\_NAME format, developers can seamlessly integrate locally served Ollama models into their fast-agent-mcp applications.

## **6\. Creating Your First Ollama-Powered Agent**

With fast-agent-mcp installed and configured for local Ollama models, you can create your first agent. This involves writing a Python script that defines an agent using the @fast.agent decorator and specifies the local Ollama model.

### **6.1. Agent Definition Script**

The following Python script demonstrates a basic agent powered by a local Ollama model (e.g., generic.qwen3).

Python

import asyncio  
from mcp\_agent.core.fastagent import FastAgent  
from mcp\_agent.core.request\_params import RequestParams \# For specifying LLM parameters

\# Initialize the FastAgent application  
\# The name provided here is for the application instance, not the agent itself.  
fast \= FastAgent("OllamaAgentExampleApp")

@fast.agent(  
    name="my\_local\_ollama\_assistant", \# Explicit name for this agent  
    instruction="You are a helpful assistant powered by a local Ollama model. Your name is OllamaBot. Answer the user's questions concisely and clearly.",  
    model="generic.qwen3",  \# Replace 'qwen3' with your specific pulled Ollama model name  
    use\_history=True,       \# Enable conversation history for the agent  
    request\_params=RequestParams(temperature=0.1) \# Set LLM temperature; 0.1 is often good for factual Ollama responses \[8\]  
)  
async def my\_ollama\_assistant\_agent(): \# The function name can be different from the agent name  
    \# The 'async with fast.run() as agent:' block provides the context to interact with the defined agent.  
    \# The 'agent' variable here will refer to the agent defined by the decorator above  
    \# if this script is run directly and this is the primary agent function.  
    \# If multiple agents are defined, one would typically call them by name, e.g., fast.agent\_name(...)  
    async with fast.run() as agent\_session: \# The 'agent\_session' gives access to the agent runtime  
        print(f"Starting interactive chat with {agent\_session.name} (Model: {agent\_session.model}). Type 'exit' to quit.")  
        await agent\_session.interactive() \# Start an interactive chat session \[7\]

if \_\_name\_\_ \== "\_\_main\_\_":  
    asyncio.run(my\_ollama\_assistant\_agent())

**Explanation:**

* from mcp\_agent.core.fastagent import FastAgent: Imports the main class for creating fast-agent applications.2  
* from mcp\_agent.core.request\_params import RequestParams: Imports the class for specifying LLM request parameters like temperature.2  
* fast \= FastAgent("OllamaAgentExampleApp"): Creates an instance of the FastAgent application.  
* @fast.agent(...): This decorator defines an agent.2  
  * name="my\_local\_ollama\_assistant": Assigns a unique name to this agent.  
  * instruction="You are...": Provides the system prompt or base instruction for the LLM.  
  * model="generic.qwen3": Specifies the Ollama model to use, via the Generic provider. Ensure qwen3 (or your chosen model) is available in your local Ollama instance and that GENERIC\_BASE\_URL is set.  
  * use\_history=True: Enables the agent to maintain conversation history.  
  * request\_params=RequestParams(temperature=0.1): Configures LLM generation parameters. A lower temperature (e.g., 0.1) typically leads to more deterministic and focused responses, which can be preferable for certain tasks with local models.8  
* async def my\_ollama\_assistant\_agent():: The asynchronous function associated with this agent definition.  
* async with fast.run() as agent\_session:: This context manager initializes the fast-agent runtime. The agent\_session object represents the active agent instance (in this simple case, my\_local\_ollama\_assistant).  
* await agent\_session.interactive(): Starts an interactive command-line chat session with the agent.7 Users can type messages, and the agent will respond.  
* asyncio.run(my\_ollama\_assistant\_agent()): Runs the asynchronous agent function.

### **6.2. Running and Interacting with the Agent**

1. **Save the Code:** Save the script above as a Python file (e.g., ollama\_chat\_agent.py) in your project directory.  
2. **Set Environment Variable:** Ensure the GENERIC\_BASE\_URL environment variable is set in your terminal session:  
   Bash  
   export GENERIC\_BASE\_URL="http://localhost:11434"

3. **Run the Agent:** Execute the script using uv (or python if uv is not used for running):  
   Bash  
   uv run ollama\_chat\_agent.py

   If you defined a different model in the script (e.g., generic.mistral), you can also specify it via command line, which might override the decorator's model if fast-agent supports such CLI overrides for generic models:  
   Bash  
   uv run ollama\_chat\_agent.py \--model generic.mistral

   However, relying on the decorator's model parameter is more explicit for this setup. fast-agent does allow specifying \--model for its main supported models like sonnet or o3-mini.low.2  
4. **Interact:** Once running, the script will print an initial message, and you can start typing your questions or commands to the agent in the terminal. Type exit to end the interactive session.

Alternatively, instead of agent\_session.interactive(), you can make direct calls to the agent within the async with fast.run() as agent\_session: block if you want to programmatically interact with it:

Python

\#... (inside async def my\_ollama\_assistant\_agent)  
async with fast.run() as agent\_session:  
    response \= await agent\_session("What is the capital of France?")  
    print(f"Agent response: {response.content}") \# Assuming response is an object with a content attribute

    response\_2 \= await agent\_session("Tell me a joke.")  
    print(f"Agent response: {response\_2.content}")

The response object's structure might vary; consult fast-agent-mcp documentation for details on accessing the message content. The PyPI page indicates agent("message") returns the response.7

This setup demonstrates the fundamental connection: the @fast.agent decorator, the model="generic.YOUR\_MODEL" string, and the GENERIC\_BASE\_URL environment variable work in concert. The fast-agent framework handles the API communication with your local Ollama server, allowing you to focus on defining the agent's behavior and instructions.

## **7\. Leveraging MCP Tools with Your Ollama-Powered Agent**

A key strength of fast-agent-mcp is its ability to integrate external tools via the Model Context Protocol (MCP), even when using local Ollama models as the agent's "brain." This allows agents to perform actions beyond simple text generation, such as accessing files, fetching web content, or interacting with databases.

### **7.1. Defining Tools as MCP Servers in fastagent.config.yaml**

Any external capability must be exposed as an MCP server. These servers are then defined in the fastagent.config.yaml file so that fast-agent-mcp knows how to discover and communicate with them.2

Each MCP server definition typically includes:

* command: The command to execute the MCP server (e.g., python, npx, or a path to an executable).  
* args: A list of arguments to pass to the command.  
* transport: The communication method (e.g., stdio for standard input/output, sse for Server-Sent Events, or http).

**Example: Defining a simple custom tool MCP server**

Suppose you have a Python script, mcp\_tools/date\_tool\_server.py, that acts as an MCP server providing a tool to get the current date. Its definition in fastagent.config.yaml might look like this:

YAML

mcp:  
  servers:  
    \#... other server definitions like 'filesystem'...  
    current\_date\_provider: \# Name of your MCP server  
      command: "python"  
      args: \["./mcp\_tools/date\_tool\_server.py"\] \# Path to your MCP server script  
      transport: "stdio" \# Assuming your script uses stdio for MCP communication

The ollama-mcp-agent project provides examples of such MCP server configurations, like a weather server (mcp\_server\_weather.py) invoked via Python.8 Building a full MCP server requires adhering to the MCP specification for message exchange. Libraries like langchain-mcp-adapters (used by ollama-mcp-agent 8) or fastapi-mcp (for exposing FastAPI endpoints as MCP tools 18) can simplify this.

### **7.2. Enabling Agents to Use Tools**

Once an MCP server is defined in fastagent.config.yaml, you can enable an agent to use the tools it provides by listing the MCP server's name in the servers parameter of the @fast.agent decorator.2

Python

@fast.agent(  
    name="tool\_using\_ollama\_agent",  
    instruction="You are an assistant that can fetch the current date. If asked for the current date, use the 'get\_current\_date' tool provided by 'current\_date\_provider'.",  
    model="generic.qwen3", \# Your local Ollama model  
    servers=\["current\_date\_provider", "filesystem"\] \# List of MCP servers this agent can access  
)  
async def my\_tool\_agent():  
    async with fast.run() as agent\_session:  
        await agent\_session.interactive()

### **7.3. The Tool-Calling Mechanism with Ollama**

The process of an Ollama-powered agent using an MCP tool involves several steps:

1. **User Prompt & LLM Inference:** The user interacts with the agent. The agent's main instruction (system prompt) or the user's specific query should guide the LLM to recognize when a tool is necessary.  
2. **Tool Call Generation by Ollama:** If the chosen Ollama model (e.g., qwen3) supports tool calling (also known as function calling), it will generate a structured response indicating its intent to call a specific tool. This response typically includes the tool's name and the parameters for the call. Models like Qwen are generally effective at this.3  
3. **fast-agent-mcp Interception:** fast-agent-mcp, acting as the MCP Host 6, intercepts this tool call request from the Ollama model.  
4. **MCP Server Invocation:** fast-agent-mcp uses its internal MCP client logic to find the specified tool by looking up the responsible MCP server (e.g., current\_date\_provider) defined in fastagent.config.yaml. It then communicates with that MCP server, sending the tool name and parameters.  
5. **Tool Execution:** The MCP server (e.g., date\_tool\_server.py) executes the requested tool with the provided parameters and formulates a result.  
6. **Result Return to LLM:** The MCP server sends the tool's execution result back to fast-agent-mcp, again following the MCP protocol.  
7. **Final Response Generation:** fast-agent-mcp passes this tool result back to the Ollama model. The LLM then uses this information to generate a final, user-facing response.

The godstale/ollama-mcp-agent project, while distinct from fast-agent-mcp, illustrates a similar flow where an Ollama model is combined with MCP tools, and it explicitly mentions "Tool call information monitoring" as a feature.8 fast-agent-mcp itself, through the fast-agent check command, shows a default setting of "Show Tools True," suggesting that tool interactions can be made visible for debugging.14

Important Note on Tool Definition and LLM Guidance:  
For the LLM to effectively use a tool, it needs to understand the tool's purpose, its exact name (as exposed by the MCP server), and the schema of its input parameters and output. MCP servers are responsible for exposing this metadata. Especially with smaller or less capable local LLMs, the agent's system prompt might need to be very explicit in guiding the LLM on when and how to use available tools. It has been observed that with models like Qwen 2.5 7B, being "very very descriptive with the tool name" is crucial for the LLM to correctly pick out the tool.11  
The MCP architecture's decoupling of the LLM from the tools is a significant advantage. An Ollama model can be updated or swapped, or an MCP server (tool) can be modified or replaced, without necessarily requiring changes to other components, as long as the MCP interface contracts are maintained.4 This modularity is fundamental to building robust, maintainable, and evolvable AI agent systems. For example, if a developer switches from generic.qwen3:7b to generic.mistral:7b, the tools remain usable if the new model also supports tool calling and can understand the tool descriptions. Similarly, the underlying script for current\_date\_provider could be entirely rewritten, but as long as it presents the same get\_current\_date tool via MCP, the agent and LLM do not need to change.

## **8\. Practical Examples and Advanced Workflows**

The following examples illustrate how to use fast-agent-mcp with local Ollama models for various tasks, progressing from simple LLM interactions to tool usage and multi-agent workflows.

### **8.1. Example 1: Text Summarization Agent**

This example focuses on a straightforward text-in, text-out task using a local Ollama model for summarization.

* **Agent Definition (summarizer\_agent.py):**  
  Python  
  import asyncio  
  from mcp\_agent.core.fastagent import FastAgent  
  from mcp\_agent.core.request\_params import RequestParams

  fast \= FastAgent("SummarizerApp")

  @fast.agent(  
      name="text\_summarizer",  
      instruction="Summarize the following text concisely, highlighting the main points. The text will be provided by the user.",  
      model="generic.qwen3", \# Or another Ollama model suitable for summarization  
      use\_history=False, \# History might not be needed for single-turn summarization  
      request\_params=RequestParams(temperature=0.2)  
  )  
  async def summarizer\_agent\_func():  
      async with fast.run() as agent\_session:  
          print("Summarization Agent (Ollama) ready. Paste text to summarize or type 'exit'.")  
          \# Using interactive mode for simplicity, but could take input programmatically  
          await agent\_session.interactive()

  if \_\_name\_\_ \== "\_\_main\_\_":  
      \# Ensure GENERIC\_BASE\_URL is set in your environment  
      \# e.g., export GENERIC\_BASE\_URL="http://localhost:11434"  
      asyncio.run(summarizer\_agent\_func())

* **Interaction:** When run (uv run summarizer\_agent.py), the user can paste a long piece of text, and the Ollama-powered agent will return a summary.

### **8.2. Example 2: Agent Using Filesystem MCP Tool**

This example demonstrates combining Ollama's language capabilities with an external tool (the built-in filesystem MCP server) to answer questions about a file.

* **fastagent.config.yaml:** Ensure the filesystem server is enabled (it's often part of the default configuration generated by fast-agent setup 12).  
  YAML  
  mcp:  
    servers:  
      filesystem:  
        command: "npx"  
        args: \["-y", "@modelcontextprotocol/server-filesystem", "."\]  
        transport: "stdio"

* **Agent Definition (file\_qa\_agent.py):**  
  Python  
  import asyncio  
  from mcp\_agent.core.fastagent import FastAgent  
  from mcp\_agent.core.request\_params import RequestParams

  fast \= FastAgent("FileQAApp")

  @fast.agent(  
      name="file\_content\_qa",  
      instruction="You are an AI assistant that can read files and answer questions about their content. Use the 'filesystem' tool to read files. The tool name for reading a file is typically 'readFile' and it takes a 'path' argument.",  
      model="generic.qwen3", \# Ensure this model is good at tool calling  
      servers=\["filesystem"\], \# Enable the filesystem MCP server  
      request\_params=RequestParams(temperature=0.1)  
  )  
  async def file\_qa\_agent\_func():  
      async with fast.run() as agent\_session:  
          print("File Q\&A Agent (Ollama \+ Filesystem Tool) ready. Ask about a file, e.g., 'Summarize example.txt'. Type 'exit'.")  
          await agent\_session.interactive()

  if \_\_name\_\_ \== "\_\_main\_\_":  
      \# Ensure GENERIC\_BASE\_URL is set  
      asyncio.run(file\_qa\_agent\_func())

* **Interaction:** The user might ask, "What are the main points in 'my\_document.txt'?" The agent should use the filesystem tool (specifically, its readFile capability, assuming the MCP server exposes it as such) to fetch the file's content. Then, the Ollama model processes this content to answer the question. The prompt guides the LLM on the tool name and its usage.

### **8.3. Example 3: fast.chain Workflow with Ollama-Backed Agents**

This example illustrates a simple sequential workflow where the output of one Ollama-powered agent becomes the input for another.

* **Agent Definitions (chained\_agents.py):**  
  Python  
  import asyncio  
  from mcp\_agent.core.fastagent import FastAgent  
  from mcp\_agent.core.request\_params import RequestParams

  fast \= FastAgent("ChainedReportApp")

  @fast.agent(  
      name="keyword\_extractor",  
      instruction="Extract up to 5 key phrases or topics from the given text. Respond only with a comma-separated list of these phrases.",  
      model="generic.qwen3",  
      request\_params=RequestParams(temperature=0.0) \# For precise extraction  
  )  
  async def keyword\_extractor\_agent():  
      pass \# Agent logic is handled by the framework when called in a chain

  @fast.agent(  
      name="report\_generator",  
      instruction="You will receive a comma-separated list of key phrases. Write a short, one-paragraph report based on these phrases.",  
      model="generic.qwen3", \# Could be a different Ollama model if desired  
      request\_params=RequestParams(temperature=0.5) \# More creative for report writing  
  )  
  async def report\_generator\_agent():  
      pass

  @fast.chain(  
      name="chained\_report\_workflow",  
      sequence=\["keyword\_extractor", "report\_generator"\] \# Define the order of execution \[2, 7\]  
  )  
  async def main\_workflow():  
      async with fast.run() as agent\_session:  
          \# The agent\_session here refers to the chain itself.  
          \# When prompted, it will execute the sequence.  
          print("Chained Report Workflow (Ollama) ready. Provide text to generate a report from. Type 'exit'.")  
          await agent\_session.interactive()

  if \_\_name\_\_ \== "\_\_main\_\_":  
      \# Ensure GENERIC\_BASE\_URL is set  
      asyncio.run(main\_workflow())

* **Interaction:** When the user provides an input text to the chained\_report\_workflow, it first goes to keyword\_extractor. The extracted keywords are then automatically passed to report\_generator, which produces the final report. This demonstrates how fast-agent-mcp's workflow capabilities can orchestrate multiple Ollama-powered agents.

These examples illustrate a progression from basic LLM interaction to tool integration and finally to multi-agent orchestration, all while leveraging local Ollama models. The core idea is that Ollama serves as the language processing engine for each agent or agentic step, while fast-agent-mcp provides the structural framework, tool connectivity via MCP, and workflow management.

## **9\. Understanding AI-Specific Model Format Support**

When working with fast-agent-mcp and local Ollama models, it's important to understand how AI-specific model formats (like GGUF, PyTorch/Safetensors checkpoints) are handled and what fast-agent-mcp's role is concerning multimodal inputs.

### **9.1. Ollama's Role in Model Format Management**

fast-agent-mcp itself does not directly load or manage raw model files in formats such as GGUF, ONNX, or PyTorch checkpoints. This responsibility lies with Ollama.3

* **Ollama Handles Formats:** When you execute a command like ollama pull qwen2 or ollama run llama3, Ollama fetches the model in a pre-packaged format that it can efficiently serve. It abstracts the complexities of the underlying model architecture and file format from the end-user or client application.3  
* **API Interaction:** fast-agent-mcp interacts with Ollama models through Ollama's served HTTP API (typically at http://localhost:11434 via the GENERIC\_BASE\_URL setting). It sends prompts and receives generated text or tool calls via this API, rather than dealing with the model files directly.

Therefore, developers do not need to configure model file paths or formats within fast-agent-mcp. The choice of model and its format is managed when pulling and running models with Ollama itself.

### **9.2. fast-agent-mcp's Multimodal Input Capabilities**

fast-agent-mcp is documented to support multimodal inputs, such as images and PDFs, within prompts, resources, and MCP tool call results.1 The agent.with\_resource() method can be used, for instance, to add PDF resources to prompts for processing by an agent.7

This multimodal support is most clearly defined for fast-agent-mcp's primary, natively integrated LLM providers like Anthropic and OpenAI.2

### **9.3. Multimodal Support with Ollama via fast-agent-mcp**

Achieving multimodal functionality (e.g., image understanding) with an Ollama model through fast-agent-mcp depends on several factors:

1. **Ollama Model Capability:** The specific local model served by Ollama must be inherently multimodal and expose this capability through its API. For example, models like LLaVA (Large Language and Vision Assistant) can be served via Ollama.  
2. **Ollama API Support:** Ollama's API for the chosen multimodal model must accept multimodal inputs in a recognized format (e.g., base64 encoded images within the JSON payload, similar to how some OpenAI vision models work).  
3. **fast-agent-mcp Generic Provider Passthrough:** The "Generic" provider within fast-agent-mcp (which handles communication with Ollama via GENERIC\_BASE\_URL) must be capable of correctly formatting and transmitting this multimodal data as part of the API request to the Ollama server.

Currently, explicit documentation or examples demonstrating multimodal input passthrough via fast-agent-mcp's Generic provider to Ollama models are not readily available in the reviewed materials. While fast-agent-mcp has general multimodal features 2, their extension to Ollama via the Generic provider is an area that would likely require experimentation by the developer. If the Ollama API for a multimodal model is OpenAI-compatible in its vision request structure, and fast-agent-mcp's generic client can formulate such requests, it might be feasible.

Developers should understand this separation of concerns: Ollama manages the model files and serves the model's capabilities (including multimodal, if any) via an API. fast-agent-mcp is a client to this API. For multimodal interactions with Ollama using fast-agent-mcp, the entire chain—from the Ollama model's inherent abilities and its API exposure to fast-agent-mcp's data handling by the Generic provider—must align.

## **10\. Troubleshooting and Best Practices**

Developing with fast-agent-mcp and local Ollama models can sometimes present challenges. This section outlines common issues, debugging tips, and best practices.

### **10.1. Common Setup and Configuration Issues**

* **Ollama Server Not Running/Reachable:**  
  * **Symptom:** Agent fails to connect, timeouts, or connection refused errors.  
  * **Solution:** Ensure the Ollama server is running (ollama serve if needed). Verify it's accessible at the URL specified in GENERIC\_BASE\_URL (default http://localhost:11434) using a tool like curl http://localhost:11434.  
* **GENERIC\_BASE\_URL Not Set or Incorrect:**  
  * **Symptom:** fast-agent-mcp cannot find the Ollama server.  
  * **Solution:** Double-check that the GENERIC\_BASE\_URL environment variable is correctly set in the terminal session where fast-agent-mcp is being run.  
* **fastagent.config.yaml Issues:**  
  * **Symptom:** Errors related to configuration loading, or MCP servers not being found.  
  * **Solution:** fast-agent-mcp looks for fastagent.config.yaml in the current directory first, then recursively in parent directories.2 Ensure the file is present and correctly formatted YAML.  
* **Python Environment/Dependency Problems:**  
  * **Symptom:** Import errors, unexpected behavior.  
  * **Solution:** Use a dedicated Python virtual environment. Ensure fast-agent-mcp and its dependencies are correctly installed (uv pip install \-r requirements.txt if applicable, or uv pip install fast-agent-mcp).  
* **Ollama Model Not Pulled or Incorrect Name:**  
  * **Symptom:** Errors from Ollama indicating model not found.  
  * **Solution:** Verify the model (e.g., qwen3 or qwen2:7b) has been pulled into Ollama (ollama list). Ensure the model name used in the model="generic.MODEL\_NAME" string in your agent definition exactly matches an available Ollama model name.

### **10.2. Debugging Tips**

* **fast-agent check:** Use this command-line tool for a comprehensive overview of your fast-agent-mcp environment, including detected configurations, provider status, and default settings.14 It can quickly highlight missing configurations or inactive providers.  
* **Verbose Logging:** Increase the logger level in fastagent.config.yaml from the default error to info or debug for more detailed output from fast-agent-mcp.12  
  YAML  
  logger:  
    type: file \# or console  
    level: debug

* **Ollama Server Logs:** Check the logs generated by the Ollama server. These logs can provide specific error messages if requests from fast-agent-mcp are malformed or if there are issues with the Ollama model itself.  
* **Tool Calling Issues:**  
  * Ensure the selected Ollama model explicitly supports tool/function calling. Not all models do, or some may have limited capabilities.  
  * As noted 11, be highly descriptive with tool names and their purpose in the agent's system prompt, especially when using smaller or less sophisticated local LLMs. The LLM needs clear guidance to identify and use tools correctly.  
  * fast-agent-mcp may offer ways to monitor tool call information. The fast-agent check output shows "Show Tools True" as a default 14, suggesting visibility into tool interactions. The related ollama-mcp-agent project also mentions tool call monitoring.8

### **10.3. Best Practices**

* **Managing Context with Local Models:**  
  * Local LLMs often have smaller context windows compared to large commercial models. Be mindful of the length of conversation history (if use\_history=True is set for an agent 2) and the size of prompts.  
  * Long conversations can exceed the context limit, leading to errors or degraded performance. There are GitHub discussions indicating potential issues with context truncation when using Ollama with fast-agent for long contexts.21 While fast-agent-mcp's direct support for advanced context management strategies (like summarization or truncation) specifically for generic Ollama models is not detailed, developers might need to implement custom logic if this becomes an issue.  
* **Performance Considerations:**  
  * Response speed from local Ollama models is heavily dependent on your local hardware (CPU, RAM, and GPU if Ollama is configured to use it) and the size of the LLM being used.8 Larger models are generally more capable but slower.  
  * Optimize prompts for conciseness where possible to reduce processing load.  
* **Model Selection for Agents:**  
  * Choose Ollama models known for strong instruction-following and, critically, robust tool-calling capabilities. Fine-tuned variants of models like Qwen, Llama, or Mistral, specifically designed for agentic tasks or function calling, often perform better.  
* **Iterative Development and Testing:**  
  * Start with simple agent definitions and gradually add complexity (e.g., tools, chained workflows). Test each component thoroughly.  
  * fast-agent-mcp includes "in-built Echo and Playback LLMs" which can be useful for testing agent application logic without incurring actual LLM processing.1  
* **MCP Server Robustness:** If developing custom MCP servers for your tools, ensure they are robust, handle errors gracefully, and adhere to the MCP specification for reliable communication with fast-agent-mcp.

By anticipating these common issues and following these practices, developers can streamline the process of building and debugging AI agents with fast-agent-mcp and local Ollama models.

## **11\. Conclusion and Further Steps**

This guide has provided a comprehensive technical walkthrough for developers aiming to create AI agents using the fast-agent-mcp framework with locally hosted Ollama models like generic.qwen3. The key to this integration lies in configuring fast-agent-mcp's "Generic" model provider, primarily through the GENERIC\_BASE\_URL environment variable pointing to the local Ollama server, and by specifying models using the generic.MODEL\_NAME convention in agent definitions.

The Model Context Protocol (MCP) remains central to fast-agent-mcp's architecture, enabling even Ollama-powered agents to leverage external tools and data sources through well-defined MCP servers. This combination offers a powerful approach for building sophisticated, private, and cost-effective AI agents. Careful setup of both the Ollama environment (ensuring the server is running and models are pulled) and the fast-agent-mcp configuration is crucial for successful development.

The ability to define complex workflows, such as chains and orchestrators, within fast-agent-mcp further extends the capabilities of agents built on local LLMs, allowing for the creation of multi-step, goal-oriented AI systems. While fast-agent-mcp offers multimodal features for its primary supported models, extending these to Ollama requires that the Ollama model itself supports multimodal input via its API and that fast-agent-mcp's generic provider can correctly relay this data.

Developers are encouraged to experiment with different Ollama models, tool configurations, and the various workflow patterns offered by fast-agent-mcp. The landscape of local LLMs and agentic frameworks is dynamic and rapidly evolving.

For further exploration and deeper understanding, the following resources are recommended:

* **fast-agent-mcp Official Documentation:** https://fast-agent.ai/ 1  
* **fast-agent-mcp GitHub Repository (for code, issues, and discussions):** https://github.com/evalstate/fast-agent 2  
* **fast-agent-mcp Documentation Repository:** https://github.com/evalstate/fast-agent-docs 2  
* **Ollama Official Website and Documentation:** https://ollama.com/  
* **Model Context Protocol Specification:** https://modelcontextprotocol.io/ 24  
* **Community Projects:** Exploring related community projects, such as godstale/ollama-mcp-agent 8, can provide additional context and ideas for integrating Ollama with MCP concepts, though it's important to distinguish their implementations from fast-agent-mcp itself.

By leveraging the information in this guide and the referenced resources, developers can effectively harness the power of fast-agent-mcp and local Ollama models to build the next generation of AI agents.

#### **Works cited**

1. fast-agent \- MCP native Agents and Workflows \- fast-agent ..., accessed May 9, 2025, [https://fast-agent.ai/](https://fast-agent.ai/)  
2. evalstate/fast-agent: Define, Prompt and Test MCP enabled ... \- GitHub, accessed May 9, 2025, [https://github.com/evalstate/fast-agent](https://github.com/evalstate/fast-agent)  
3. Unlocking Local AI: Using Ollama with Agents \- DataStax, accessed May 9, 2025, [https://www.datastax.com/blog/local-ai-using-ollama-with-agents](https://www.datastax.com/blog/local-ai-using-ollama-with-agents)  
4. Harness the power of MCP servers with Amazon Bedrock Agents | AWS Machine Learning Blog, accessed May 9, 2025, [https://aws.amazon.com/blogs/machine-learning/harness-the-power-of-mcp-servers-with-amazon-bedrock-agents/](https://aws.amazon.com/blogs/machine-learning/harness-the-power-of-mcp-servers-with-amazon-bedrock-agents/)  
5. Powering AI Agents with Real-Time Data Using Anthropic's MCP and Confluent, accessed May 9, 2025, [https://www.confluent.io/blog/ai-agents-using-anthropic-mcp/](https://www.confluent.io/blog/ai-agents-using-anthropic-mcp/)  
6. Fast-Agent \- LLMindset.co.uk, accessed May 9, 2025, [https://llmindset.co.uk/resources/fast-agent/](https://llmindset.co.uk/resources/fast-agent/)  
7. fast-agent-mcp · PyPI, accessed May 9, 2025, [https://pypi.org/project/fast-agent-mcp/](https://pypi.org/project/fast-agent-mcp/)  
8. GitHub \- godstale/ollama-mcp-agent, accessed May 9, 2025, [https://github.com/godstale/ollama-mcp-agent](https://github.com/godstale/ollama-mcp-agent)  
9. Ollama agent \- Agent2Agent Protocol (A2A) \- Google, accessed May 9, 2025, [https://google.github.io/A2A/tutorials/python/9-ollama-agent/](https://google.github.io/A2A/tutorials/python/9-ollama-agent/)  
10. A minimal agentic app to interact with OLLAMA models leveraging multiple MCP server tools using BeeAI framework. \- GitHub, accessed May 9, 2025, [https://github.com/tamdilip/mcp-ollama-beeai](https://github.com/tamdilip/mcp-ollama-beeai)  
11. MCP server using Ollama for local LLMs \- YouTube, accessed May 9, 2025, [https://www.youtube.com/watch?v=z0DScLrix48](https://www.youtube.com/watch?v=z0DScLrix48)  
12. fast-agent/fastagent.config.yaml at main · evalstate/fast-agent · GitHub, accessed May 9, 2025, [https://github.com/evalstate/fast-agent/blob/main/fastagent.config.yaml](https://github.com/evalstate/fast-agent/blob/main/fastagent.config.yaml)  
13. Agent mode: available to all users and supports MCP \- Visual Studio Code, accessed May 9, 2025, [https://code.visualstudio.com/blogs/2025/04/07/agentMode](https://code.visualstudio.com/blogs/2025/04/07/agentMode)  
14. exceptions on example · Issue \#121 · evalstate/fast-agent · GitHub, accessed May 9, 2025, [https://github.com/evalstate/fast-agent/issues/121](https://github.com/evalstate/fast-agent/issues/121)  
15. Releases · evalstate/fast-agent \- GitHub, accessed May 9, 2025, [https://github.com/evalstate/fast-agent/releases](https://github.com/evalstate/fast-agent/releases)  
16. README.md \- browser-use MCP server \- GitHub, accessed May 9, 2025, [https://github.com/Saik0s/mcp-browser-use/blob/main/README.md](https://github.com/Saik0s/mcp-browser-use/blob/main/README.md)  
17. ollama-mcp-agent/mcp\_manager.py at main \- GitHub, accessed May 9, 2025, [https://github.com/godstale/ollama-mcp-agent/blob/main/mcp\_manager.py](https://github.com/godstale/ollama-mcp-agent/blob/main/mcp_manager.py)  
18. FastAPI-MCP: Simplifying the Integration of FastAPI with AI Agents \- InfoQ, accessed May 9, 2025, [https://www.infoq.com/news/2025/04/fastapi-mcp/](https://www.infoq.com/news/2025/04/fastapi-mcp/)  
19. How to Use FastAPI MCP Server \- Apidog, accessed May 9, 2025, [https://apidog.com/blog/fastapi-mcp/](https://apidog.com/blog/fastapi-mcp/)  
20. What I Learnt after Building a Bunch of MCP Servers in N8N, accessed May 9, 2025, [https://community.n8n.io/t/what-i-learnt-after-building-a-bunch-of-mcp-servers-in-n8n/107628](https://community.n8n.io/t/what-i-learnt-after-building-a-bunch-of-mcp-servers-in-n8n/107628)  
21. Issues · evalstate/fast-agent \- GitHub, accessed May 9, 2025, [https://github.com/evalstate/fast-agent/issues](https://github.com/evalstate/fast-agent/issues)  
22. Discussions \- evalstate fast-agent \- GitHub, accessed May 9, 2025, [https://github.com/evalstate/fast-agent/discussions](https://github.com/evalstate/fast-agent/discussions)  
23. evalstate/fast-agent-docs: Documentation site for fast-agent \- GitHub, accessed May 9, 2025, [https://github.com/evalstate/fast-agent-docs](https://github.com/evalstate/fast-agent-docs)  
24. Example Clients \- Model Context Protocol, accessed May 9, 2025, [https://modelcontextprotocol.io/clients](https://modelcontextprotocol.io/clients)