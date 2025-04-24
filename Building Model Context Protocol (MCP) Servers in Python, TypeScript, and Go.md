
# Building Model Context Protocol (MCP) Servers in Python, TypeScript, and Go

Model Context Protocol (MCP) servers allow you to expose data and functionality to AI applications in a standardized way. An MCP server acts like an API for LLMs: it can provide **Resources** (readable data), **Tools** (executable functions), and **Prompts** (pre-defined templates) that an AI assistant can use ([GitHub - modelcontextprotocol/python-sdk: The official Python SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/python-sdk#:~:text=The%20Model%20Context%20Protocol%20,MCP%20servers%20can)). In this guide, we’ll outline how to structure and build general-purpose MCP servers in **Python**, **TypeScript**, and **Go**, with step-by-step setup, key packages, and best practices for maintainable projects.

## Python MCP Server

**Repository Structure:** Organize your Python MCP server as a Python project. For simple cases, a single script (e.g. `server.py`) can define your server and tools. For larger projects, use a package structure to separate logic: for example, a directory `my_mcp_server/` with modules like `tools.py`, `resources.py`, etc., and an entry-point script (or module) that initializes the server and registers all capabilities. Include a **README.md** and requirements file or `pyproject.toml` for dependencies. A typical layout might be:

```plaintext
my_mcp_server/
├── my_mcp_server/             # Package for server code
│   ├── __init__.py
│   ├── tools.py               # Define tool functions
│   ├── resources.py           # Define resource functions
│   └── prompts.py             # (Optional) define prompt templates
├── server.py                  # Entry point to initialize and run the MCP server
├── .env.example               # (Optional) Example environment variables
├── requirements.txt           # or pyproject.toml for dependencies
└── README.md                  # Documentation and usage
```

**Setup & Installation:** Ensure **Python 3.10+** is installed ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=System%20requirements)). Install the official MCP SDK (`mcp` package) and any other needed libraries. The MCP Python SDK (version 1.2.0 or higher) provides the core server and client functionality. You can use [Astral UV](https://astral.sh) (a project manager) as recommended by Anthropic, or pip/venv directly:

- *Using **uv***: Initialize a project and add MCP:

  ```bash
  uv init my_mcp_server && cd my_mcp_server
  uv venv && source .venv/bin/activate    # set up virtual environment
  uv add "mcp[cli]"
  ```

  This ensures the CLI tools are included (via the `mcp[cli]` extra) ([GitHub - modelcontextprotocol/python-sdk: The official Python SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/python-sdk#:~:text=Then%20add%20MCP%20to%20your,project%20dependencies)).

- *Using **pip***:

  ```bash
  python3 -m venv .venv && source .venv/bin/activate
  pip install "mcp[cli]"
  ```

  This installs the `mcp` SDK and its CLI tool. (The CLI provides handy commands like `mcp run` and `mcp dev` for development.)

**Writing the Server:** Use the `FastMCP` class from the `mcp.server` module to create your server instance. Then register tools, resources, and prompts using decorators or methods. The MCP SDK uses Python type hints and docstrings to auto-generate the JSON schema for tools, making development easier ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=USER_AGENT%20%3D%20%22weather)). For example:

```python
# server.py
from mcp.server.fastmcp import FastMCP

# Initialize the MCP server
mcp = FastMCP("DemoServer")  # Name your server

# Define a tool (function) that adds two numbers
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers and return the sum."""
    return a + b

# Define a resource that returns a greeting message
@mcp.resource("greeting://{name}")
def greeting(name: str) -> str:
    """Generate a greeting for the given name."""
    return f"Hello, {name}!"

if __name__ == "__main__":
    mcp.run()  # Start the server (opens STDIO transport by default)
```

In this example, the `@mcp.tool()` decorator registers the `add` function as an MCP Tool. The function’s signature and docstring serve as the schema and description for the tool ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=USER_AGENT%20%3D%20%22weather)). Similarly, `@mcp.resource("greeting://{name}")` registers a Resource accessible via the URI pattern `greeting://{name}`. We call `mcp.run()` in the `__main__` block to launch the server when the script is executed directly ([GitHub - modelcontextprotocol/python-sdk: The official Python SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/python-sdk#:~:text=mcp%20%3D%20FastMCP%28)). The `FastMCP("DemoServer")` initializer sets the server’s name (and uses default protocol version and capabilities).

**Running & Testing:** During development, you can run the server directly or use the MCP CLI for extra features:

- **Direct run:** Simply execute the script:

  ```bash
  python server.py
  ```

  This will start the MCP server, which listens for requests via STDIN/STDOUT (by default). The server will wait for an MCP client (like Claude or another tool) to initiate a connection.

- **Using MCP CLI:** The `mcp` CLI (installed via `mcp[cli]`) provides commands to run or debug the server. For example,

  ```bash
  mcp dev server.py
  ```

  will launch your server in a development mode and open the interactive **MCP Inspector** tool ([GitHub - modelcontextprotocol/python-sdk: The official Python SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/python-sdk#:~:text=Alternatively%2C%20you%20can%20test%20it,with%20the%20MCP%20Inspector)). The MCP Inspector is a command-line UI that connects to your server over STDIO and lets you inspect the JSON-RPC messages, list available tools, and invoke them for testing ([How to Build Your Own MCP Server](https://www.builder.io/blog/mcp-server#:~:text=Now%20that%20we%20have%20a,We%20use%20Anthropic%E2%80%99s%20MCP%20Inspector)) ([How to Build Your Own MCP Server](https://www.builder.io/blog/mcp-server#:~:text=npx%20%40modelcontextprotocol%2Finspector%20node%20)). This is very useful to verify that your server is responding correctly before connecting it to an AI client.

- **Claude Desktop integration:** To use your server in the Claude desktop app (or another MCP client), add it to the client’s config. For Claude, edit `claude_desktop_config.json` to include your server. For example, using **uv** to ensure the virtual env is used:

  ```json
  {
    "mcpServers": {
      "DemoServer": {
        "command": "uv",
        "args": [
          "--directory", "/ABSOLUTE/PATH/TO/PROJECT",
          "run", "server.py"
        ]
      }
    }
  }
  ```

  This configuration tells Claude to launch your server by running the `server.py` with `uv` in the given project directory ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=%7B%20,)) ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=This%20tells%20Claude%20for%20Desktop%3A)). If not using uv, you can set `"command": "python"` and appropriate `"args"` (including the full path to your `server.py`). Save the config and restart Claude. The server will be started on-demand and its tools/resources will appear to the AI assistant.

**Core Packages and Tools:** The core dependency is the **`mcp` SDK** (often installed as `mcp[cli]` for development). The MCP SDK handles the JSON-RPC protocol, message routing, and STDIO/SSE transports for you ([GitHub - modelcontextprotocol/python-sdk: The official Python SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/python-sdk#:~:text=The%20Model%20Context%20Protocol%20allows,specification%2C%20making%20it%20easy%20to)). In Python, you might also use:

- **Astral UV** (`uv`): A project/env manager that simplifies dependency management and running (as used in official quickstarts) – optional but useful ([GitHub - modelcontextprotocol/python-sdk: The official Python SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/python-sdk#:~:text=We%20recommend%20using%20uv%20to,manage%20your%20Python%20projects)).
- **Async libraries**: If your server calls external APIs or performs I/O, you can use libraries like `httpx` (as in the weather example) or `asyncio`. The MCP SDK supports async tool functions seamlessly (you can define `async def` tools and use `await` inside).
- **Any other needed SDKs**: e.g. database drivers, cloud SDKs, etc., depending on what your Tools do. Keep these in `requirements.txt` or `pyproject.toml` and load config (like API keys) via environment variables or a `.env` file (you can use `python-dotenv` or similar to load them).

**Best Practices (Python):**

- *Project layout*: As your server grows, keep it organized. You can define many tools/resources in one file, but it’s cleaner to split them into modules (as illustrated above) and **import** them in the main script to register with the `FastMCP` instance. This separation makes maintenance easier.
- *Documentation*: Use docstrings on your tool and resource functions. These serve a dual purpose: they document the function for developers *and* are exposed to AI clients as the description of the capability ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=USER_AGENT%20%3D%20%22weather)). Write clear, concise docstrings explaining what the tool/resource does.
- *Type hints*: Leverage Python type hints for function parameters and return values. The SDK will include these types in the schema it exposes to the client, which helps the AI (or any client) understand what inputs are expected ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=USER_AGENT%20%3D%20%22weather)).
- *Startup and teardown*: If your server needs initialization (database connections, etc.), you can use the MCP lifespan hooks. For example, `FastMCP` can be used as an async context manager or you can register startup/shutdown events. Ensure any resources (file handles, network connections) are properly closed on server shutdown.
- *Error handling*: Tools should handle exceptions and return friendly error messages rather than crashing. For example, catch exceptions in a tool and return an error string or a structured error result. This prevents unhandled errors from stopping the MCP server.
- *Security*: Remember that Tools can execute code or perform actions. Only expose what’s necessary and handle user inputs carefully to avoid dangerous operations. The MCP framework requires user approval for tool use, but you should still validate inputs (e.g., if a tool executes system commands or database queries, sanitize inputs).
- *Testing*: You can write unit tests for your tool functions just like any Python function (since they are regular functions). This can ensure your logic is correct independent of the MCP protocol. Additionally, test the integrated server with the MCP Inspector or a client to verify end-to-end behavior.
- *Keep up to date*: MCP is evolving. Stick to the latest SDK version and follow the official MCP spec for any new features. The Python SDK will handle protocol updates, but updating ensures you get bug fixes and new capabilities.

## TypeScript (Node.js) MCP Server

**Repository Structure:** A typical TypeScript MCP server project looks like a standard Node.js TypeScript app. Use a project folder with a `package.json` and source code under `src/`. Organize the code by capability type: for instance, have separate modules for tools, resources, prompts, and a central server setup in an `index.ts`. For example:

```plaintext
my-mcp-server/
├── src/
│   ├── index.ts           # Main server setup: create server, register all capabilities, start transport
│   ├── tools.ts           # Define tool registration functions (or a directory with multiple tool files)
│   ├── resources.ts       # Define resource registration functions
│   ├── prompts.ts         # Define prompt registration functions (if any)
│   └── ... (additional modules as needed)
├── package.json
├── tsconfig.json
├── .env.example           # (Optional) environment variables for config (e.g. API keys)
├── README.md
└── build/                 # Compiled JavaScript output (after build step)
```

In this layout, `src/index.ts` is the entry point that imports the other modules and registers everything with the server. Splitting “register” functions into their own files keeps the project modular and easier to navigate ([How to Build Your Own MCP Server](https://www.builder.io/blog/mcp-server#:~:text=,functions%20are%20called%3A%20These)). For example, you might have a `registerTools()` function in `tools.ts` that takes the server instance and adds all tool definitions, a pattern that scales as you add more tools.

**Setup & Installation:** Ensure you have **Node.js 16+** installed (Node 18+ recommended) ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=First%2C%20let%E2%80%99s%20install%20Node,js%20installation)). Initialize a Node project and install the MCP SDK:

1. **Initialize Project**:

   ```bash

   mkdir my-mcp-server && cd my-mcp-server
   npm init -y               # create package.json
   npm install -D typescript @types/node ts-node
   npx tsc --init            # create a tsconfig.json
   mkdir src
   ```

   Configure your `tsconfig.json` to target a modern Node version and output to a `build` directory. For example, set `"target": "ES2020"`, `"module": "Node16"`, and `"outDir": "./build"` with `"rootDir": "./src"` ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=match%20at%20L769%20,src)) ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=,src)).

2. **Install MCP SDK**:

   ```bash
   npm install @modelcontextprotocol/sdk
   ```

   This is the official TypeScript SDK for MCP ([GitHub - modelcontextprotocol/typescript-sdk: The official Typescript SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/typescript-sdk#:~:text=Installation)). It provides classes to create servers/clients and handle transports.

3. *(Optional)* **Other dependencies**: If your server will interact with external APIs or databases, install the needed packages (for example, `npm install dotenv axios` if you plan to load environment vars and make HTTP calls, etc.). In many MCP servers, **`zod`** is used for defining input schemas for tools (it provides runtime validation and easy schema definitions) – while not required, it’s commonly used for convenience ([GitHub - modelcontextprotocol/typescript-sdk: The official Typescript SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/typescript-sdk#:~:text=import%20,zod)) ([GitHub - modelcontextprotocol/typescript-sdk: The official Typescript SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/typescript-sdk#:~:text=%2F%2F%20Add%20an%20addition%20tool,)). Also install any type definitions needed (`@types/...`) for TypeScript.

**Building the Server:** Create `src/index.ts` to set up the MCP server. You’ll use the `McpServer` class from the SDK to create a server instance, register resources/tools, then start listening for connections. The SDK is designed to make this straightforward – similar to setting up an Express server, but for MCP. Here’s a simple example:

```ts
// src/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ResourceTemplate } from "@modelcontextprotocol/sdk";
import { z } from "zod";

// Initialize the MCP server with a name and version
const server = new McpServer({ name: "MyServer", version: "0.1.0" });

// Register a Tool named "add"
server.tool(
  "add",
  { a: z.number(), b: z.number() },                      // input schema for tool using zod
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]     // return result in MCP format
  })
);

// Register a Resource for greetings (dynamic URI)
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),  // template for resource URI
  async (uri, { name }) => ({
    contents: [{ uri: uri.href, text: `Hello, ${name}!` }]
  })
);

// Start the server using STDIO transport (for local connection)
const transport = new StdioServerTransport();
await server.connect(transport);
console.log("MCP server is running...");
```

In this code: we create an `McpServer` with a name and semantic version. We then add an **“add” tool** via `server.tool()`, specifying the tool name, an input schema (two numbers), and an async handler function that returns a result. We also add a **“greeting” resource** using `server.resource()`, with a URI template and a handler that returns a greeting message. The SDK’s use of `ResourceTemplate` helps define dynamic resource paths (here `{name}` is a placeholder). Finally, we create a `StdioServerTransport` and call `server.connect(transport)` to begin listening for incoming MCP messages on standard I/O ([GitHub - modelcontextprotocol/typescript-sdk: The official Typescript SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/typescript-sdk#:~:text=import%20,zod)) ([GitHub - modelcontextprotocol/typescript-sdk: The official Typescript SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/typescript-sdk#:~:text=%2F%2F%20Add%20an%20addition%20tool,)). (In this example, calling the script will block waiting for a client to connect via STDIN; nothing will happen until an MCP client launches the server and starts the handshake.)

Larger projects should delegate the registration of tools/resources to separate modules to keep `index.ts` clean. For instance, you might import and call `registerTools(server)` which internally calls `server.tool(...)` for each tool defined in `tools.ts`. This approach keeps each capability’s code isolated and improves readability ([How to Build Your Own MCP Server](https://www.builder.io/blog/mcp-server#:~:text=,functions%20are%20called%3A%20These)). Ensure you call these registration functions *before* starting the transport. Also, populate any environment-specific config (like API keys) by reading from environment variables (using `process.env` or a library like `dotenv`). For example, you might load `dotenv` at the top of your file to populate `process.env`, then use those values in your tool handlers. If a required config is missing, it’s good practice to either throw an error on startup or register a limited set of capabilities. (In one example, a server checked for an API key and *skipped registering* a tool if the key wasn’t present, logging a warning instead ([How to Build Your Own MCP Server](https://www.builder.io/blog/mcp-server#:~:text=Inside%20this%20file%2C%20you%27ll%20see,a%20few%20key%20things%20happening)).)

**Build & Run:** After writing the code, compile it to JavaScript:

- **Build**: Add a script in `package.json` for convenience, e.g. `"build": "tsc"`. Run `npm run build` to compile TypeScript into the `build/` directory ([GitHub - 3mdistal/css-mcp-server: A demo of how to build an MCP server (without just vibe coding).](https://github.com/3mdistal/css-mcp-server#:~:text=4,the%20TypeScript%20code)). You should get files like `build/index.js`. (Ensure any dynamic import paths or `.js` extensions are handled appropriately in your source – the official SDK imports in the example use explicit `.js` extensions in import paths, which is required for Node’s ESM modules.)

- **Development Testing**: Use the **MCP Inspector** to run and test your server. For example, from your project root:

  ```bash
  npx @modelcontextprotocol/inspector node ./build/index.js
  ```

  This command (as shown in the Builder.io guide) will launch the inspector UI, start your server (`node ./build/index.js`), and attach to it ([How to Build Your Own MCP Server](https://www.builder.io/blog/mcp-server#:~:text=npx%20%40modelcontextprotocol%2Finspector%20node%20)). The inspector opens a local web interface where you can see the JSON-RPC handshake, list the server’s tools and resources, and even invoke them with test inputs. This is extremely helpful to debug and ensure your server is exposing exactly what you expect.

- **Running in Client:** In a real scenario, an MCP client (like Claude Desktop, Cursor, etc.) will spawn your Node process. For Claude Desktop, add an entry in `claude_desktop_config.json` similar to:

  ```json
  {
    "mcpServers": {
      "MyServer": {
        "command": "node",
        "args": [ "/ABSOLUTE/PATH/TO/my-mcp-server/build/index.js" ]
      }
    }
  }
  ```

  This points Claude to your built server JS file ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=match%20at%20L1101%20,)). (Use absolute paths; on Windows, use the appropriate path format ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=match%20at%20L1127%20,C%3A%5C%5CPATH%5C%5CTO%5C%5CPARENT%5C%5CFOLDER%5C%5Cweather%5C%5Cbuild%5C%5Cindex.js)).) After updating the config and restarting Claude, it will launch your Node process when needed. Ensure that Node is in your system PATH or specify the full path to the Node binary in the config if needed.

**Core Packages and SDKs:** The main package is the **`@modelcontextprotocol/sdk`** – it includes both client and server support for MCP in TypeScript ([GitHub - modelcontextprotocol/typescript-sdk: The official Typescript SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/typescript-sdk#:~:text=Installation)). Key parts of this SDK used for servers:

- `McpServer`: Core server class where you register capabilities ([GitHub - modelcontextprotocol/typescript-sdk: The official Typescript SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/typescript-sdk#:~:text=The%20McpServer%20is%20your%20core,protocol%20compliance%2C%20and%20message%20routing)).
- `server.tool(name, schema, handler)`: Method to register a tool (optionally you can provide a description in the schema or via an overload).
- `server.resource(name, template, handler)`: Method to register a resource (with a URI or template).
- Transports like `StdioServerTransport` (for local STDIO usage) ([GitHub - modelcontextprotocol/typescript-sdk: The official Typescript SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/typescript-sdk#:~:text=import%20,zod)) and `SseServerTransport` (for remote Server-Sent Events over HTTP, if you plan to run as a web service).
- Utility classes: `ResourceTemplate` for parameterized resource URIs, and types for request/response structures.
- Types (TypeScript types) for MCP messages, which can help with strong typing of your handler functions.

Other commonly used packages in the TS MCP ecosystem:

- **zod** (`z` in the example): for defining and validating tool input schemas. The SDK expects a schema object for tool parameters; using zod, you can construct complex schemas and ensure the inputs conform. In our example, `{ a: z.number(), b: z.number() }` defines two numeric arguments. The SDK will internally derive a JSON Schema from this, which the client (and AI) sees ([GitHub - modelcontextprotocol/typescript-sdk: The official Typescript SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/typescript-sdk#:~:text=%2F%2F%20Add%20an%20addition%20tool,)). Alternatively, you could manually specify a JSON schema or simple object structure, but zod makes it succinct.
- **dotenv**: for managing config. Many servers load `process.env` from a `.env` file at startup (especially for API keys, etc.).
- **node-fetch / axios**: if making outbound HTTP calls (e.g., to REST APIs). These are not MCP-specific, but your tool implementations will often use them. (E.g., a Google Drive MCP server might call Google’s API using an HTTP client.)
- **Testing frameworks**: (optional) You might include a test runner like Jest or Mocha to test your tool logic. This is up to the developer; not specific to MCP but good for quality.

**Best Practices (TypeScript/Node):**

- *Code organization*: Maintain clear separation of concerns. Keep your `index.ts` (or main file) focused on configuration and wiring. Implement actual logic in separate functions or classes. For instance, if a tool needs 50 lines of logic, put that in a helper function or in a module and call it from the handler. This keeps your server setup readable.
- *Module structure*: Group related tools or resources. If you have many, consider a folder structure under `src/tools/` with one file per tool or per category of tools. Provide a single `registerTools(server)` function that calls all of them. This approach (used in larger examples) makes it easy to enable/disable certain capabilities and see all registrations in one place ([How to Build Your Own MCP Server](https://www.builder.io/blog/mcp-server#:~:text=,functions%20are%20called%3A%20These)).
- *Schema definitions*: Always define input schemas for tools (don’t accept raw `any` input) – this ensures the AI knows what arguments to provide. Use descriptive names and include **descriptions** for each parameter if possible (the SDK allows `mcp.WithDescription` on schema properties in the Go SDK, and in TS you can provide a `description` field in zod or use comments for documentation). A well-defined schema improves the AI’s ability to use the tool correctly.
- *Tool results*: Follow the MCP format for tool outputs. In our example, we returned `{ content: [{ type: "text", text: "result" }] }` for a simple text result. Make sure to return the appropriate structure (the SDK’s `NewToolResultText` equivalent is basically what we did manually). The TypeScript SDK might have helper functions, but you can also construct the JSON following the spec. Always include any relevant MIME types or structured data in the response if needed (e.g., if returning a file, include a `uri` or `mimeType`). Keeping responses small and relevant is wise, since they may end up in the model’s context window.
- *Asynchronous operations*: Since Node is single-threaded, take care with long-running operations. The SDK handlers can be `async`, which is good for I/O. If a tool needs to do CPU-intensive work, you might offload it (to a worker thread or a separate service), otherwise it could block other interactions. Typically, MCP tools should be fairly quick or handle delays gracefully (the AI will be waiting).
- *Configuration and secrets*: Do not hardcode secrets (API keys, etc.) in your code. Use environment variables or config files. The pattern of using a `.env` file and `dotenv` is common. Also, you might design your server to skip or disable certain tools if required config is missing, to avoid runtime errors ([How to Build Your Own MCP Server](https://www.builder.io/blog/mcp-server#:~:text=Inside%20this%20file%2C%20you%27ll%20see,a%20few%20key%20things%20happening)).
- *Logging and error handling*: Use `console.error` or a logging library to log unexpected issues. When returning errors to the AI, do so in a controlled manner (e.g., `return { content: [{type: "text", text: "Error: ..."}] }` from a tool handler). This ensures the AI gets a response it can read, rather than the process crashing. The Node process should ideally not exit on a bad input; catch exceptions in handlers.
- *Graceful shutdown*: If your server has resources like open connections, handle process signals (`SIGINT`/`SIGTERM`) to disconnect cleanly. Since Claude Desktop launches the process as needed, it will kill it when done; ensure any temporary files or connections are cleaned up either at process exit or each call.
- *Testing with real clients*: After unit testing, always test with an actual client (Claude, etc.) or at least the MCP Inspector. This ensures your JSON schemas and outputs are exactly right. The AI might be sensitive to the formatting (e.g., whether a tool returns a string vs an array of strings).
- *Iterate and refine*: The open standard means you can improve your server and the AI will adapt. For example, you might add a new tool or resource later – clients can fetch the updated tool list via MCP. Use semantic versioning (the `version` field in `McpServer`) to indicate changes. Best practice is to bump the version if you add or change capabilities.

## Go MCP Server

**Repository Structure:** Go projects are usually structured by modules and packages. Since the **Go MCP SDK** (community-provided) is relatively lightweight, you can implement a simple server in a single `main.go` file. For more complex servers, organize your code into packages (e.g., a package for your business logic or API client wrappers) and keep the MCP-specific parts in `main.go` or a small `server` package. A structure could be:

```plaintext
mcp-server-go/
├── go.mod                # Go module file, includes mcp-go dependency
├── main.go               # Main entry: define server struct, register tools/resources, run server
├── handlers/             # (Optional) additional Go source files or packages
│   └── data.go, ...      # e.g., functions to fetch data or implement logic for tools
└── README.md
```

This layout is flexible – you can just use `main.go` for everything if it’s simple. In Go, it’s common to define some types or helper functions above `func main()` or in separate files within the `package main` if needed. The **mark3labs/mcp-go** SDK (also known as `mcp-go`) is used to implement the server.

**Setup & Installation:** Make sure you have Go installed (Go 1.20+ should work). Initialize a Go module for your project:

```bash
go mod init github.com/yourname/mcp-server-go
go get github.com/mark3labs/mcp-go
```

The mark3labs **MCP Go SDK** is a community-driven implementation of MCP (there was no official Go SDK at initial release) ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=SDKs%20make%20building%20and%20integrating,popularity%20among%20Go%20developers%E2%80%94including%20myself)). It provides an API to create MCP servers and clients in Go. (Another variant is `riza-io/mcp-go`, which is likely the same or similar fork; use the one that is most up-to-date. Here we’ll assume `mark3labs/mcp-go` as referenced in community docs.) You can import it in your Go code as `"github.com/mark3labs/mcp-go/mcp"` and `"github.com/mark3labs/mcp-go/server"` ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=%22github.com%2Fdicedb%2Fdicedb)).

**Building the Server:** In Go’s MCP SDK, you typically define a struct to represent your server (especially if you have state or multiple capabilities), implement any needed interface methods, then use a helper to run it. However, the SDK also offers high-level functions to register tools easily. A minimal example using the high-level API:

```go
package main

import (
    "context"
    "fmt"
    "log"
    "strconv"
    "strings"

    "github.com/mark3labs/mcp-go/mcp"
    "github.com/mark3labs/mcp-go/server"
)

func main() {
    // Initialize a new MCP server with a name and version
    s := server.NewMCPServer(
        "GoMCP Demo", "0.1.0",
        server.WithToolCapabilities(false), // we won't dynamically add/remove tools at runtime
    )
    // Define a new Tool schema ("ping") with one string argument "url"
    pingTool := mcp.NewTool("ping",
        mcp.WithDescription("Ping a server to check connectivity"),
        mcp.WithString("url", mcp.Description("Target server address (host:port)")),
    )
    // Register the tool with a handler function
    s.AddTool(pingTool, func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
        // Extract the "url" argument (the SDK provides it as interface{}, assert to string)
        url := req.Params.Arguments["url"].(string)
        // Parse host and port
        parts := strings.Split(url, ":")
        host := parts[0]
        port := 7379
        if len(parts) > 1 {
            if p, err := strconv.Atoi(parts[1]); err == nil {
                port = p
            }
        }
        // (Pretend to ping the host:port. In a real tool, you might open a TCP conn or send an HTTP request)
        result := fmt.Sprintf("PONG from %s:%d", host, port)
        // Return a text result back to the client
        return mcp.NewToolResultText(result), nil
    })
    // Start serving via STDIO transport
    if err := server.ServeStdio(s); err != nil {
        log.Fatalf("Error starting MCP server: %v", err)
    }
}
```

Let’s break down what this does:

- We call `server.NewMCPServer("GoMCP Demo", "0.1.0", ...)` to create a new server instance with a name and version ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=func%20main%28%29%20,05%2Fserver%2Ftools%23capabilities)). The `WithToolCapabilities(false)` option tells it that our list of tools won’t change dynamically (this just controls a detail of the MCP protocol regarding tool list updates) ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=%2A%2020%3A%20%60,case%20for%20our%20simple%20server)).
- We create a `pingTool` using `mcp.NewTool`. We give it a name `"ping"`, a description, and specify it takes a string parameter `"url"` (with a helpful description) ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=pingTool%20%3A%3D%20mcp.NewTool%28,DiceDB%20server%20in%20format%20%27host%3Aport)) ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=%2A%2029%3A%20%60mcp.NewTool%28,value%20if%20none%20is%20provided)). Under the hood, this defines the tool’s schema (name, input parameters) as required by MCP.
- We then use `s.AddTool` to register the tool with its handler logic ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=Now%20that%20we%27ve%20defined%20the,to%20check%20if%20it%27s%20reachable)) ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=s,string)). The handler is a function that the SDK will call whenever the AI client invokes the `"ping"` tool. In our example, the handler parses the URL, performs a dummy “ping” logic (here we just format a string; in a real case, you might integrate with a DB or service), and returns a result using `mcp.NewToolResultText` ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=%2F%2F%20Create%20a%20new%20DiceDB,v%22%2C%20err%29%29%2C%20nil)) ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=%2F%2F%20Return%20the%20result%20to,v%22%2C%20resp%29%29%2C%20nil)). The SDK has helper constructors like `NewToolResultText` to easily wrap a string into the proper result object ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=%2F%2F%20Send%20the%20PING%20command,PING)) ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=See%20how%20the%20SDK%20provides,required%20by%20the%20MCP%20specification)).
- Finally, we call `server.ServeStdio(s)` to start the server, which listens for incoming JSON-RPC on `os.Stdin` and writes responses to `os.Stdout` ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=This%20uses%20the%20stdio%20transport%2C,run%20an%20MCP%20server%20locally)). This effectively connects our server to the outside world (an MCP client will spawn this process and communicate via STDIO). If the server fails to start or stops, we log a fatal error.

This high-level approach abstracts most of the JSON-RPC details. Internally, the SDK takes care of initial handshake methods like `Initialize` and `ListTools`. If needed, you can implement those yourself by creating a struct that embeds `mcp.UnimplementedServer` and overriding methods (as seen in some advanced examples, e.g., a file system server implementing `ListResources` and `ReadResource` methods directly ([GitHub - riza-io/mcp-go: Build Model Context Protocol (MCP) servers in Go](https://github.com/riza-io/mcp-go#:~:text=func%20%28s%20,%7D%2C%20%7D%29%2C%20nil)) ([GitHub - riza-io/mcp-go: Build Model Context Protocol (MCP) servers in Go](https://github.com/riza-io/mcp-go#:~:text=)), which is useful for custom resource logic). For a typical tool-based server, simply using `AddTool` is sufficient.

**Build & Run:** Build the Go binary and test it:

- **Build the binary:** Run `go build -o bin/mcp-server-go .` (or simply `go build .` which produces `mcp-server-go` binary in the current directory). This compiles your program. The output is a standalone binary – this is what an MCP client will execute. You can also run `go install` to install it in your `$GOBIN` path for easier use ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=Before%20using%20the%20server%2C%20build,the%20binary)).

- **Test locally:** You can simulate the server manually. For example, run it in a terminal (it will wait for input). Typing MCP JSON-RPC by hand is tedious, so it’s better to use a client or the MCP Inspector. Since the Python CLI tool `mcp` is cross-language, one trick is to use `mcp dev` with the Go binary:

  ```bash
  mcp dev ./mcp-server-go
  ```

  This will start your Go server via the CLI and attach the inspector, similar to how it works with a Python script. (Make sure the CLI is installed via Python’s `mcp[cli]`, or use the Node inspector via `npx` if you prefer.) You should see your server’s initialization messages and be able to call the `ping` tool from the inspector UI.

- **Integrate with an AI client:** Finally, configure your AI assistant app to use the Go server. If using Claude Desktop or another client, the config would look like:

  ```json
  {
    "mcpServers": {
      "GoMCP Demo": {
        "command": "/absolute/path/to/mcp-server-go",
        "args": []
      }
    }
  }
  ```

  If your server needed command-line args (for instance, a path to a data file or a port number), you would include those in `"args"`. In our simple example, no args are needed – the server name and version are hardcoded. Claude (or other hosts) will launch the binary directly ([GitHub - riza-io/mcp-go: Build Model Context Protocol (MCP) servers in Go](https://github.com/riza-io/mcp-go#:~:text=,%5D%20%7D%20%7D)). Once launched by Claude, the server will register its tools and the AI can start calling them (e.g., the AI could ask *“Is server X at address Y alive?”*, and then choose to invoke the `ping` tool).

**Core Packages (Go):** The main library is the **MCP Go SDK** (`github.com/mark3labs/mcp-go`). It provides:

- The `mcp` package: core types (requests, responses, and helper constructors like `NewToolResultText`) and definitions of Resources, Tools, etc.
- The `server` package: high-level server setup helpers (like `NewMCPServer`, `ServeStdio`, and options for capabilities) and transport logic.
- The SDK supports **STDIO transport** fully, and (as of early 2025) was adding **SSE transport** support ([GitHub - riza-io/mcp-go: Build Model Context Protocol (MCP) servers in Go](https://github.com/riza-io/mcp-go#:~:text=,protocol%20messages%20and%20lifecycle%20events)). SSE would allow your Go server to run as an HTTP server (for remote hosting), but if you need that, you can already integrate via any web framework by using the SDK’s lower-level methods. For example, the Python SDK demonstrates mounting an SSE handler into a Starlette app ([GitHub - modelcontextprotocol/python-sdk: The official Python SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/python-sdk#:~:text=Mounting%20to%20an%20Existing%20ASGI,Server)) – in Go, you could do similarly with an HTTP server once the SDK supports it.
- The SDK also helps with JSON schema generation for tools (so the client knows the input spec). In our code, we didn’t explicitly deal with JSON schema – the SDK handled it when we used `WithString` and `WithDescription` in the tool definition.

Other Go packages you might use:

- **Standard library**: Use `net/http` or other std packages if your tool calls external services or needs to perform I/O. The example above uses `strings`, `strconv`, `fmt` etc. – just regular Go code inside your tool handlers.
- If your tool needs to call an API or database, use the relevant Go client library (e.g., an HTTP client, a database driver). There’s nothing special about doing that inside an MCP tool handler – treat it like writing any Go function that returns a result or error.
- For config, use `os.Getenv` or a library like `spf13/viper` if you want to support config files. Ensure any needed configuration is loaded before starting `ServeStdio`. You can pass environment variables via the MCP client config (Claude allows specifying an `"env"` map in the config JSON to set env vars for the launched process ([GitHub - 3mdistal/css-mcp-server: A demo of how to build an MCP server (without just vibe coding).](https://github.com/3mdistal/css-mcp-server#:~:text=%22css,xxxxxxxxxxxxxxxxxxxxxxxxxx%22%20%7D))).

**Best Practices (Go):**

- *Simplicity of design*: Go values simple, clear design. If your MCP server is stateless, you might not even need a custom struct – just register tools that call into pure functions. If you have shared state (e.g., a database connection pool), you can create a struct that holds it and implement the `mcp.Server` interface methods if needed. The `NewMCPServer` approach with `AddTool` covers most use cases without custom interface implementations.
- *Concurrency*: The Go SDK will likely handle each incoming tool invocation in its own goroutine (since it’s JSON-RPC, each request can be handled concurrently). Make sure any shared resources are protected (e.g., if two tools access a shared map or file, use synchronization or design them to avoid conflicts). Use the provided `context.Context` (`ctx`) to handle cancellation if the client disconnects or request times out.
- *Error handling*: Return errors in the prescribed way. In our handler, if something went wrong, we could return an error as the second return value. The SDK would transmit that as a JSON-RPC error. Alternatively, we used `NewToolResultText` to send an error message in-band. Decide based on how you want the AI to receive errors. Usually, non-fatal errors (like "host unreachable") can be returned as a normal result string ("Error: host unreachable"), whereas fatal errors in your code (exceptions) should be returned as `error` so the client knows the tool failed. Always log errors on the server side for debugging.
- *Logging*: Use Go’s `log` package or another logging library to record what’s happening (especially if the server is long-running). In Claude’s scenario, the process is short-lived (spawned per request), so logging might be ephemeral. If you adapt to a persistent model (say, running as a service with SSE), robust logging is important.
- *Testing*: Because MCP in Go is essentially function calls, you can unit test your tool handlers just like any function. For example, you could call your handler function with a fake `CallToolRequest` and verify the result. Additionally, integration tests could spin up your server (maybe using an in-memory pipe or a test client) to simulate a full cycle.
- *Performance*: Go is efficient; however, if your tools do heavy computation, consider their impact. The AI will typically wait for the tool to finish. If some tasks are slow (e.g. large database queries), that’s okay, but you might want to offload extremely long tasks or set expectations (maybe the tool returns partial results or status updates if appropriate via streaming – though streaming results would require SSE transport).
- *Maintaining Protocol Compliance*: Use the SDK’s facilities rather than writing your own JSON-RPC handling. The SDK ensures you comply with MCP spec details (like the exact message formats). If you need something not supported (e.g., a custom transport), consider contributing to the SDK or using lower-level parts of it rather than starting from scratch.
- *Stay updated*: The MCP Go SDK is community-driven. Keep an eye on its repository for updates or changes. As the official spec evolves, the community SDK may issue updates – update your dependency (`go get -u`) to pull in improvements (e.g., SSE support once available).
- *General MCP tips*: In any language, **don’t tie your server to a specific client** – follow the open standard. Any MCP-compliant client should be able to use your server. Avoid assumptions that only Claude will use it (for instance, don’t parse Claude-specific inputs – stick to the protocol). This way your MCP server could work with other tools like Cursor or custom clients as well.

## Conclusion

Building an MCP server in Python, TypeScript/Node, or Go follows the same core principles: define your server, declare what capabilities (tools, resources, prompts) it provides, and implement the logic behind those capabilities. The repository should be structured for clarity, and the build process should produce an artifact (script, compiled JS, or binary) that an MCP client can execute to spawn your server. By using the official SDKs and community libraries, much of the heavy lifting (protocol handling, JSON schema generation, I/O management) is handled for you, allowing you to focus on the functionality you want to expose.

When creating a general-purpose MCP server, keep it modular and configurable so it can be adapted to various data sources or tasks. Adhere to the MCP specification so any improvements in the ecosystem benefit your server too. Following the best practices above – clear schema definitions, proper error handling, documentation, and thorough testing – will result in a developer-friendly and maintainable MCP server project. The goal is to make it as easy as possible for AI systems to connect to your server and for other developers (or your future self) to extend and maintain it. With this structure in place, you can rapidly build connectors to anything: from local databases to web services – standardizing how AI gets context and performs actions across all these systems ([GitHub - modelcontextprotocol/python-sdk: The official Python SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/python-sdk#:~:text=The%20Model%20Context%20Protocol%20,MCP%20servers%20can)). Happy coding with MCP!

**Sources:**

- Anthropic, *Model Context Protocol (MCP) Introduction and Quickstart* ([GitHub - modelcontextprotocol/python-sdk: The official Python SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/python-sdk#:~:text=The%20Model%20Context%20Protocol%20,MCP%20servers%20can)) ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=USER_AGENT%20%3D%20%22weather)) ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=%7B%20,))
- Anthropic, *MCP Python SDK Documentation* ([GitHub - modelcontextprotocol/python-sdk: The official Python SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/python-sdk#:~:text=Then%20add%20MCP%20to%20your,project%20dependencies)) ([GitHub - modelcontextprotocol/python-sdk: The official Python SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/python-sdk#:~:text=mcp%20%3D%20FastMCP%28))
- Anthropic, *MCP TypeScript SDK Documentation* ([GitHub - modelcontextprotocol/typescript-sdk: The official Typescript SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/typescript-sdk#:~:text=import%20,zod)) ([GitHub - modelcontextprotocol/typescript-sdk: The official Typescript SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/typescript-sdk#:~:text=%2F%2F%20Add%20an%20addition%20tool,))
- Builder.io, *“How to Build Your Own MCP Server”* (TypeScript example and best practices) ([How to Build Your Own MCP Server](https://www.builder.io/blog/mcp-server#:~:text=,functions%20are%20called%3A%20These)) ([How to Build Your Own MCP Server](https://www.builder.io/blog/mcp-server#:~:text=npx%20%40modelcontextprotocol%2Finspector%20node%20))
- Dev.to (Navendu Pottekkat), *“Building an MCP Server in Go”* (using mcp-go SDK) ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=func%20main%28%29%20,05%2Fserver%2Ftools%23capabilities)) ([Building a Model Context Protocol (MCP) Server in Go - DEV Community](https://dev.to/pottekkat/building-a-model-context-protocol-mcp-server-in-go-4314#:~:text=s,string))
- GitHub: *3mdistal/css-mcp-server* (TypeScript project example) ([GitHub - 3mdistal/css-mcp-server: A demo of how to build an MCP server (without just vibe coding).](https://github.com/3mdistal/css-mcp-server#:~:text=4,the%20TypeScript%20code)) ([For Server Developers - Model Context Protocol](https://modelcontextprotocol.io/quickstart#:~:text=match%20at%20L1101%20,))
- GitHub: *riza-io/mcp-go* (Go SDK README and example) ([GitHub - riza-io/mcp-go: Build Model Context Protocol (MCP) servers in Go](https://github.com/riza-io/mcp-go#:~:text=func%20%28s%20,%7D%2C%20%7D%29%2C%20nil)) ([GitHub - riza-io/mcp-go: Build Model Context Protocol (MCP) servers in Go](https://github.com/riza-io/mcp-go#:~:text=You%20can%20compile%20this%20example,or%20any%20other%20MCP%20client))
