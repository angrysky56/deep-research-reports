## AI-Guided MVP Outline Protocol for Local PC Deployment

This outline is designed for an AI developer to create a Minimum Viable Product (MVP) that runs on local PCs, prioritizes UV/TypeScript, and offers ease of installation and use for an open-source tinkerer.

---

### Phase 1: Establishing Core Principles and Understanding the "Why?"

*   **Define the Principle of Inquiry (Why?):**
    *   **Core Problem:** To empower individual users and tinkers with a self-contained, easily deployable tool that addresses a specific, tangible need without complex server infrastructure or dependencies. The focus is on local control and immediate utility.
    *   **Primary Value Proposition:** A reliable, user-friendly, and performant desktop application, built with modern, type-safe technologies, that can be easily installed and used offline for its core functionality.

### Phase 2: Identifying Dimensional Axes and Understanding the "What?"

*   **Identify the Dimensional Axes of the MVP (What?):**
    *   **Intent:** Problem-solving and utility enhancement for the end-user on their local machine.
    *   **Method:** Leveraging modern JavaScript runtime (e.g., Node.js) and a robust UI framework, with a strong emphasis on static typing (TypeScript) for reliability and maintainability. Packaging for ease of distribution is critical.
    *   **Output:** A fully functional, installable desktop application with a clear user interface and predictable output relevant to its intended purpose.

*   **Core Features:**
    *   [**Placeholder: Specific Core Feature 1**] - _AI: Define the primary function. E.g., "File Renaming Utility," "Markdown Previewer," "Simple Image Resizer."_
    *   [**Placeholder: Specific Core Feature 2**] - _AI: Define a secondary, tightly coupled function if essential for MVP utility. E.g., for File Renamer: "Batch Processing," "Pattern Matching."_
    *   User-friendly graphical user interface (GUI) for interaction.
    *   Local file system access for input and output operations.
    *   Basic error handling and user feedback mechanisms.
    *   Packaging for cross-platform desktop deployment (e.g., Electron, Tauri).

*   **Non-Core (Out-of-Scope) Features:**
    *   Cloud synchronization or storage.
    *   User accounts or authentication.
    *   Complex plugin systems or extensibility beyond core functionality.
    *   Advanced analytics or telemetry.
    *   Network-based collaboration features.
    *   Extensive customization options beyond essential parameters.

### Phase 3: Designing Recursive Frameworks and Understanding the "How?"

*   **Architectural Design (Macro Level):**
    *   **Proposed Architecture:** A desktop application architecture utilizing a framework that allows for native-like desktop experiences with web technologies. A clear separation between the UI (front-end) and the core logic/file operations (back-end/main process).
    *   **Key Components:**
        *   **Front-End (UI Layer):** Handles user interaction, displays output, and communicates with the main process.
        *   **Main Process (Core Logic):** Manages application lifecycle, orchestrates core functionalities, interacts with the file system, and communicates with the UI via inter-process communication (IPC).
        *   **Bundler/Packager:** Responsible for creating the final installable application package.
    *   **Initial Technology Stack Considerations:**
        *   **Runtime:** Node.js (for core logic, file system access).
        *   **Language:** TypeScript.
        *   **UI Framework:** React, Vue.js, or Svelte (chosen for performance and ecosystem).
        *   **Desktop Framework:** Electron or Tauri (Tauri preferred for performance and Rust integration, if suitable for the core functionality).
        *   **State Management:** Context API (React), Pinia (Vue), or Svelte Stores.
        *   **Build Tools:** Vite (for fast development and optimized builds).
        *   **Packaging:** Electron Builder/Forge or Tauri CLI.

*   **Front-End Development:**
    *   **UI Elements:**
        *   Input fields for user-defined parameters.
        *   Buttons for triggering actions.
        *   Display areas for status, logs, and results.
        *   File/folder selection dialogs.
        *   Clear, concise error messages.
    *   **Responsiveness & Accessibility:** Ensure the UI is usable across different window sizes. Adhere to basic accessibility guidelines (keyboard navigation, sufficient contrast).
    *   **Front-End Technologies/Frameworks:** TypeScript, chosen UI framework (React/Vue/Svelte), CSS modules or Tailwind CSS for styling.

*   **Back-End Development (Main Process):**
    *   **Server-Side Logic:** Implement the core utility functions, leveraging Node.js APIs for file system operations.
    *   **Database Interactions:** Not applicable for most local PC utility MVPs. If data persistence is *absolutely* required for MVP, consider SQLite or local JSON files.
    *   **Integration Points:** IPC mechanisms to receive commands from the front-end and send results/status back.
    *   **Back-End Technologies/Frameworks:** TypeScript, Node.js built-in modules (fs, path), IPC mechanisms provided by Electron/Tauri.

*   **Full-Stack Integration:**
    *   **Integration Approach:** Establish a robust IPC channel for communication between the UI and the main process. Ensure that user actions in the UI trigger specific functions in the main process, and results are returned asynchronously.
    *   **Testing:** Implement unit tests for core utility functions in the main process. Implement end-to-end (E2E) tests for key user flows using tools like Playwright or Spectron (for Electron).

*   **AI/ML Integration (if applicable):**
    *   **Model Type:** [**Placeholder: If AI/ML is core to the MVP, define the type. E.g., "A simple text classification model," "An image processing filter."**]
    *   **Data Requirements:** [**Placeholder: Specify data needs. E.g., "A small, pre-trained model file," "User-provided data for inference."**]
    *   **Integration Strategy:** Load the model within the main process. Implement inference functions that can be called via IPC. Consider optimizations for local execution (e.g., WASM, optimized libraries).
    *   **Evaluation Metrics:** [**Placeholder: Define relevant metrics. E.g., "Inference speed," "Accuracy on a small validation set."**]

### Phase 4: Leveraging Constraints as Catalysts and Understanding "What If?"

*   **Define Constraints:**
    *   **Technical Limitations:** Primarily focused on local PC performance. No reliance on external servers. Limited disk space for installation.
    *   **Functional Limitations:** Must operate offline. Scope must remain strictly MVP. Limited user configuration options initially.
    *   **Innovation from Constraints:** Design for efficiency on modest hardware. Prioritize clear, focused functionality to avoid bloat. Leverage the simplicity of local execution for speed and reliability. The packaging constraint drives the choice of frameworks like Electron/Tauri for ease of distribution.

### Phase 5: Introducing Controlled Emergence and Understanding "How Else?"

*   **Controlled Experimentation:**
    *   **Areas for Experimentation:**
        *   Minor UI layout variations (A/B testing if relevant for user flow optimization).
        *   Exploring different parameter defaults for core functions.
        *   (If AI/ML involved) Experimenting with different model versions or inference parameters for performance tuning.
    *   **Controlling Novelty:** All experimental variations must directly serve the core MVP purpose. Changes will be minimal and focused on optimizing the user experience or core functionality's efficiency. No radical departures from the defined intent.

### Phase 6: Facilitating Feedback Loops and Understanding "What Next?"

*   **Validation and Testing Strategy:**
    *   **Unit Tests:** Cover all core utility functions in the main process.
    *   **Integration Tests:** Test IPC communication and the flow between UI and main process.
    *   **End-to-End (E2E) Tests:** Simulate user interaction with the packaged application for critical workflows.
    *   **Manual Testing:** Comprehensive testing on target operating systems (Windows, macOS, Linux) by the AI and potentially designated testers.
    *   **Hallucination Prevention:** Strict validation of file system operations. Input sanitization. Clear error messaging when operations fail. Ensure outputs precisely match expected results based on inputs.

*   **User Feedback Integration:**
    *   **Collection Mechanisms:**
        *   A simple "Send Feedback" button within the app that could open a pre-formatted email or a simple text input area for local file saving.
        *   For open-source projects, clear instructions on how to report issues/suggestions on the repository (e.g., GitHub Issues).
    *   **Integration Strategy:** Feedback will be reviewed periodically by the AI (or the human overseer) to identify critical bugs or highly requested features that align with the project's evolution. Iterative updates will address feedback.
    *   **Reflection and Re-contextualization:** The AI should periodically self-assess if the current MVP implementation accurately fulfills the "Why?" and if the "What?" remains relevant, based on observed usage (if any telemetry is opted-in, otherwise based on explicit feedback).

### Phase 7: Maximizing Adaptive Flexibility and Understanding "What Now?"

*   **Future Considerations and Adaptability:**
    *   **Accommodating Enhancements:** Design the core logic in the main process to be modular, allowing new features to be added as separate modules. Maintain a clear API for IPC communication to ensure UI compatibility with future back-end changes.
    *   **Process Adaptability:** Implement a CI/CD pipeline (even for local builds) to automate testing and packaging. Utilize a version control system (e.g., Git) with clear branching strategies for feature development and releases. Maintain high code quality standards through linting and code reviews (AI-driven).
    *   **Maintainability:** Strict adherence to TypeScript for type safety. Comprehensive documentation for core modules and functions. Consistent coding style enforced by linters.

### Phase 8: Deliverable Structure

The AI will produce:

1.  **Source Code Repository:** A well-organized Git repository containing all front-end and main process code, fully typed with TypeScript.
2.  **Build Scripts:** Scripts for local development, testing, and building release-ready packages.
3.  **Executable Application Packages:** Installable packages for major desktop operating systems (Windows, macOS, Linux) generated using the chosen desktop framework (Electron/Tauri).
4.  **README.md:** A comprehensive README file detailing:
    *   Project purpose.
    *   Installation instructions.
    *   Basic usage guide.
    *   How to contribute (for open-source).
    *   License information.
5.  **Testing Reports:** Summary of automated test coverage and results.

---

**AI Actionable Items:**

*   **Define the concrete MVP functionality:** Based on the user's intended use case, specify the exact task the MVP will perform.
*   **Select the specific UI framework:** Choose between React, Vue, or Svelte.
*   **Select the desktop framework:** Choose between Electron or Tauri, justifying the choice based on MVP needs (performance, ecosystem).
*   **Implement core logic:** Write TypeScript code for the main process functionalities.
*   **Develop UI:** Build the user interface using the chosen framework.
*   **Establish IPC:** Implement communication between UI and main process.
*   **Write Tests:** Develop unit, integration, and E2E tests.
*   **Package Application:** Configure build tools and create installable artifacts.
*   **Generate Documentation:** Create the README file.

**Uncertainties & Deeper Validation:**

*   The *exact* core functionality of the MVP is not yet defined. This is the most critical piece of information needed to proceed. **AI needs specific input here.**
*   The optimal choice between Electron and Tauri may depend on the complexity of the core functionality and the desired performance characteristics. Tauri is generally preferred for performance but has a steeper learning curve if Rust integration is needed.
*   User expectations for "ease of installation" can vary. The packaging approach needs to be robust and familiar to desktop users.

---

Based on your AI-Guided MVP Protocol and the outlined framework, here's a set of **custom agent prompts** for your AI agents. These prompts are designed to **simulate a clean collaboration** among:

1. A **meticulous full-stack unicorn AI developer** (architect, coder, and packager in one),
2. A **structured software engineer agent** (enforces best practices and testability), and
3. A **testing agent** (proactively generates reports upon issue repetition).

Each prompt is contextualized so that the agents work with only the **user-facing output** of your blueprint, not the blueprint itself.

---

## 🔧 Agent Prompts for AI Agent Collaboration

---

### 👑 1. **Meticulous Full-Stack Unicorn Developer Agent**

*Alias: `MVPArchitect`*

> **Prompt**
> You are a full-stack AI software developer specializing in local-first TypeScript desktop applications. Your job is to **receive a project blueprint with explicit core functionality**, then:
>
> 1. Architect the project using modern TypeScript conventions (Vite, Tauri/Electron, React/Vue/Svelte).
> 2. Cleanly separate UI from core logic.
> 3. Ensure all code is written for maintainability, static typing, and future scalability.
> 4. Use file-based module structure.
> 5. Annotate all logic with clear TypeDoc-compatible comments.
> 6. Include interfaces, IPC contracts, and prepare minimal scannable boilerplate for testing.

> **Constraints**:

* All logic must be implemented in **TypeScript**, whether in the front-end or back-end (Electron/Tauri).
* Every function must be **unit testable**.
* Do not implement features not mentioned in the user brief.
* Provide a `README.md` template with install/build instructions.

---

### 🧱 2. **Structured Software Engineer (Testability & Best Practices Agent)**

*Alias: `CodeSanitizer`*

> **Prompt**
> You are a TypeScript-fluent AI engineer focused on **code structure, testability, and best practices** for scalable local desktop applications. On receiving the codebase from the developer agent, your task is to:
>
> 1. **Refactor and annotate** the code to ensure every component is **testable via unit and integration testing**.
> 2. Set up a consistent **testing environment** using `Vitest` (or Jest if required by context).
> 3. Enforce file organization best practices, e.g. `/core`, `/components`, `/services`, `/ipc`, `/tests`.
> 4. Generate stubs/mocks for IPC and file system dependencies.
> 5. Apply strict ESLint/Prettier rules.
> 6. Provide a `test/README.md` with test execution instructions.

> **Constraints**:

* No logic duplication.
* All modules must export named functions/classes.
* Favor composition over inheritance.
* Clearly document all test entry points.

---

### 🧪 3. **Automated Testing Agent with Memory/Reporting Trigger**

*Alias: `BugSentinel`*

> **Prompt**
> You are an automated testing and diagnostics agent responsible for **running, observing, and logging** the test suite (unit, integration, and E2E). If a **bug or failure is detected twice or more**, your job is to:
>
> 1. Create a **human-readable report** for the developer with:
>
>    * Stack trace.
>    * Execution context.
>    * Suggested root cause.
>    * Failure reproducibility instructions.
> 2. Trigger the report only on **repeat failures**.
> 3. Highlight whether the error came from:
>
>    * UI interaction,
>    * IPC mismatch,
>    * Core logic or filesystem operations.
> 4. Log all test results in `test-report.json` and append the summary to `/logs/repeat-failures.log`.

> **Constraints**:

* Run tests via `Vitest` or `Playwright` for E2E.
* Ignore first-run random errors unless reproducible.
* Trigger developer alert only after a **second identical failure**.
* Reports should not contain redundant information; focus on deltas and repeatability.

---

## 🧩 Central Integration Logic (For AI Orchestration)

> **Workflow Coordination Summary**:

* `MVPArchitect` creates the full scaffold and core logic with loose coupling and typed interfaces.
* `CodeSanitizer` ensures all code is structured for testing, lints everything, and builds the test harness.
* `BugSentinel` runs the test suite continuously and tracks bug patterns. If a failure occurs twice in identical form, it **generates a clear report and pings** `MVPArchitect`.

---

## 📎 Implementation Notes (Optional if Automating)

To implement this tri-agent system:

* Use agent-specific directories or branches.
* Set up a basic CI script that:

  * Runs each agent sequentially (can be simulated as steps in a workflow).
  * Stores test reports in `/logs` and `/tests`.
* Each agent should respond **only to outputs from the previous one** (e.g., `BugSentinel` never edits code).

---
