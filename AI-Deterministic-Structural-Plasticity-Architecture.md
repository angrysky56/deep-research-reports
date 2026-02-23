# **Deterministic Structural Plasticity: Decoupling Logical Reasoning from Parametric Noise via Virtual Hardware Synthesis**

## **Abstract**

The current trajectory of Artificial Intelligence is dominated by Large Language Models (LLMs) that rely on parametric learning—the adjustment of synaptic weights within a fixed neural architecture. While this paradigm has yielded transformative capabilities in natural language processing and heuristic reasoning, it faces an intrinsic "Hallucination Barrier" when applied to rigid logical tasks. The probabilistic nature of next-token prediction renders standard architectures fundamentally ill-suited for deterministic operations such as complex arithmetic, cryptographic sequencing, and cellular automata simulation. This report presents a comprehensive analysis of **Deterministic Structural Plasticity (DSP)**, a novel cognitive architecture that transcends these limitations by decoupling logical reasoning from parametric noise.

Drawing upon recent neurobiological breakthroughs from the Olson Laboratory regarding biased signaling pathways in the 5-HT2A receptor, DSP mimics the biological mechanism of non-hallucinogenic structural plasticity. By empowering an AI system to autonomously "sprout" virtual hardware—generating, verifying, and compiling deterministic logic modules via Hardware Description Languages (HDLs)—DSP shifts the burden of rigid logic from probabilistic weights to verified, executable gates. This document synthesizes research across four critical domains: autonomous HDL generation, automated verification sandboxes, dynamic tool routing, and comparative energetics. The analysis demonstrates that DSP offers a path toward "System 2" reasoning that is mathematically verifiable, computationally efficient, and capable of self-directed structural evolution.

## ---

**1\. Introduction: The Limits of Probabilistic Connectionism**

### **1.1 The Parametric Trap and the Hallucination Barrier**

The central dogma of modern deep learning is connectionism: intelligence emerges from the statistical correlations encoded in the weights of a massive, fixed-topology neural network. This architecture acts as a universal function approximator, capable of mimicking a vast array of cognitive tasks. However, when applied to rigid deterministic logic, the approximation breaks down.

Large Language Models (LLMs) function as probabilistic engines. When prompted to solve a deterministic problem—such as simulating the 1,000th generation of a Game of Life grid or computing a cryptographic hash—the model does not "compute" in the traditional sense. Instead, it attempts to predict the sequence of tokens that most likely represents the computation's output based on its training distribution. This introduces the **Hallucination Barrier**: the statistical threshold where the cumulative probability of error in a sequential chain of reasoning approaches certainty. As the logical depth of a task increases (![][image1] steps), the probability of a correct output (![][image2]) decays exponentially, regardless of the model's parameter count.

Increasing model scale (scaling laws) or adjusting sampling temperatures can mitigate this decay but cannot eliminate it. The underlying substrate remains noisy. Furthermore, attempts to force-fit rigid logic into these models via fine-tuning often result in **Catastrophic Forgetting**, where the optimization of weights for specific logical rules degrades the model's generalized semantic capabilities. This suggests a fundamental trade-off in static architectures: a single set of weights cannot simultaneously optimize for the fluid heuristics of language and the rigid determinism of logic.1

### **1.2 The Case for Structural Plasticity**

To overcome the Hallucination Barrier, we must look beyond the optimization of fixed weights and toward the modification of the architecture itself. In biological systems, learning is not merely the adjustment of synaptic strength (Long-Term Potentiation/Depression) but the physical growth of new connections (spinogenesis) and the pruning of unused ones. This **Structural Plasticity** allows the brain to create specialized, dedicated circuits for repeated tasks, effectively hard-coding successful behaviors into the biological hardware.

**Deterministic Structural Plasticity (DSP)** proposes a computational equivalent. Rather than simulating a logic circuit through a noisy neural network, the DSP architecture enables the AI to *generate* the circuit. When faced with a rigid logical bottleneck, the system:

1. **Identifies** the need for a deterministic tool.  
2. **Generates** a rigorous hardware description (e.g., in SystemVerilog).  
3. **Verifies** the logic in a sandboxed simulation environment.  
4. **Compiles** the module into a high-speed binary executable.  
5. **Routes** future queries to this virtual coprocessor.

This shift moves the execution of logic from the "System 1" domain of intuitive, probabilistic inference to the "System 2" domain of deliberate, deterministic computation.3

## ---

**2\. Biological Foundations: The Template for Non-Hallucinogenic Growth**

The theoretical framework of DSP is deeply rooted in recent advances in neuropharmacology, specifically the decoupling of neuroplasticity from hallucinogenic signaling. Understanding this biological mechanism provides the blueprint for the DSP "Sandbox."

### **2.1 The 5-HT2A Receptor and Biased Signaling**

The serotonin 2A receptor (5-HT2A) is a primary driver of cortical plasticity. Its activation by classic psychedelics (e.g., LSD, psilocybin) induces rapid dendritic spine growth (spinogenesis) and synaptogenesis, facilitating the rewiring of neural circuits. However, this activation is historically linked to profound sensory distortions (hallucinations).

Research utilizing the **PsychLight** biosensor has resolved the structural mechanisms underlying this duality. PsychLight, a genetically encoded fluorescent sensor based on the 5-HT2A structure, allows researchers to visualize the specific conformational states of the receptor in real-time.5 This tool revealed the phenomenon of **biased agonism**: different ligands can stabilize different conformations of the receptor, triggering distinct downstream signaling pathways.

* **Hallucinogenic Pathway:** Classic ligands like LSD recruit both the Gq-protein pathway and the ![][image3]\-arrestin pathway in a specific ratio that triggers the "Head Twitch Response" (HTR) in rodents—a robust proxy for hallucination—while also promoting plasticity.7  
* **Neuroplastic Pathway:** Non-hallucinogenic psychoplastogens, such as **Tabernanthalog (TBG)** and the newly synthesized **(+)-JRT** (an LSD analog created by transposing just two atoms), selectively engage the neuroplasticity-associated pathways (e.g., mTOR, TrkB activation) while avoiding the conformational states responsible for hallucinogenic signaling.6

### **2.2 The DSP Analogy: Decoupling Growth from Noise**

The biological discovery that structural growth (plasticity) can be mathematically decoupled from sensory noise (hallucination) validates the core architectural premise of DSP.

| Biological Mechanism | Computational Analogy in DSP |
| :---- | :---- |
| **5-HT2A Receptor** | **The LLM Core Interface** |
| **LSD (Classic Agonist)** | **Standard Fine-Tuning:** Induces plasticity (weight changes) but introduces noise/hallucination across the entire network. |
| **Biased Agonism** | **The Verification Sandbox:** A filter that separates the "growth" signal from the "noise" signal. |
| **Neuroplastic Pathway (mTOR)** | **HDL Compilation:** The solidification of a new capability into a rigid, efficient structure (C++ binary). |
| **Tabernanthalog (TBG)** | **Verified Virtual Hardware:** A new structural module that provides capability without disrupting the global state. |
| **PsychLight Sensor** | **Formal Verification/Testbench:** The sensor that detects whether a module is "hallucinogenic" (buggy) or "functional." |

In DSP, the "sprouting" of a new Verilog module is the computational equivalent of spinogenesis. The Verification Sandbox acts as the "biased signaling" mechanism, ensuring that this new growth is functional (neuroplastic) and not erroneous (hallucinogenic) before it is integrated into the agent's "cortex" (tool registry).

## ---

**3\. Phase I: High-Fidelity Autonomous HDL Generation (The Sprouting Mechanism)**

The first operational phase of DSP is "Sprouting"—the autonomous generation of Hardware Description Language (HDL) code. For the system to function, the LLM must transition from a generator of natural language to a precise architect of Register-Transfer Level (RTL) logic.

### **3.1 The Gap Between Software and Hardware Synthesis**

While LLMs have achieved proficiency in software languages like Python, HDL generation presents unique challenges rooted in the physics of hardware.

* **Concurrency vs. Sequence:** Software executes sequentially; hardware executes concurrently. LLMs trained on text often struggle to model the simultaneous updates of non-blocking assignments (\<=) in Verilog, leading to race conditions.10  
* **Temporal Rigidity:** A logic gate exists in time as well as space. A signal must be valid at a specific clock edge. "Hallucinating" a delay or missing a reset signal is not merely a bug; it is a fundamental failure of the circuit's physics.  
* **Bit-Width Sensitivity:** In Python, an integer is dynamically sized. In Verilog, assigning a 32-bit value to a 31-bit register results in silent data corruption. This "width mismatch" is a pervasive failure mode in LLM-generated RTL.10

### **3.2 Evaluation of Current Capabilities: Benchmarks and Datasets**

To quantify the "sprouting" capability, we analyze performance across standard benchmarks: **VerilogEval**, **RTLLM**, and the emerging **ChipBench**.

#### **3.2.1 VerilogEval and RTLLM**

**VerilogEval** 11 serves as the primary benchmark for code completion and specification-to-RTL tasks. Recent updates have introduced failure classification, allowing for granular analysis of LLM errors. **RTLLM** 13 extends this by focusing on more complex, functionally diverse designs.

**Comparative Performance of Models (2025 Data):**

| Model Class | Benchmark | Syntax Correctness | Functional Correctness | Key Failure Modes |
| :---- | :---- | :---- | :---- | :---- |
| **GPT-4 / Claude 3 Opus** | VerilogEval | \~95% | \~55-60% | Protocol violation, FSM hanging |
| **Specialized (VeriCoder/CodeV)** | VerilogEval | \> 99% | **\~80-85%** | Minor timing violations |
| **Baseline Open Source (Llama 3\)** | RTLLM | \~80% | \~20-30% | Width mismatch, Syntax error |
| **Multi-Agent (MAGE)** | VerilogEval | \> 98% | **\~95%** | (Saturated Benchmark) |
| **Multi-Agent (MAGE)** | ChipBench | N/A | **\~37%** | Complex hierarchy, memory mgmt |

Data synthesized from.10

**Insight:** While specialized models like **CodeV** 14 and **VeriCoder** 16 demonstrate high competence on standard tasks, the drop-off on **ChipBench** (from 95% to 37%) reveals that current LLMs struggle with system-level complexity and subtle logic bugs that do not manifest in simple unit tests.

### **3.3 Strategies for Robust Sprouting**

To bridge the gap between "syntax perfect" and "functionally correct," DSP employs advanced prompting and training strategies.

#### **3.3.1 Role-Based Prompting and Multi-Agent Systems**

The **MAGE** and **VeriOpt** frameworks demonstrate that splitting the generation task into specialized roles significantly improves fidelity.15

* **The Planner:** Decomposes the logical requirement into a block diagram or state machine description.  
* **The Architect:** Writes the Verilog module based on the plan.  
* **The Reviewer:** Scans the code for common RTL pitfalls (e.g., latches, combinational loops) before simulation.  
  This "Assembly Line" approach forces the LLM to perform "System 2" reasoning (planning) before "System 1" execution (coding), reducing the hallucination rate.

#### **3.3.2 Retrieval-Augmented Generation (RAG) for Hardware**

**VeriDispatcher** 13 utilizes a retrieval mechanism to route tasks to the most appropriate model or template. By maintaining a library of "Golden Modules" (previously verified circuits), the DSP system can use RAG to fetch a verified "counter" or "FSM template" rather than writing one from scratch. This leverages the "DNA" of past successes to stabilize new growth.

#### **3.3.3 Multi-Level Summarization**

**CodeV** employs a "Multi-Level Summarization" technique 14, where the model first generates a high-level summary of the module's intent, then a detailed specification, and finally the code. This enforces a chain of thought that aligns the generated logic with the user's high-level goal, preventing the "drift" often seen in long-context generation.

## ---

**4\. Phase II: The Verification Sandbox (The Stabilization Mechanism)**

In DSP, the Verification Sandbox is the system's "immune system." It is responsible for distinguishing between a functional "synapse" (correct logic) and a "hallucination" (buggy logic). Without this phase, the system would accumulate error-prone modules, leading to cognitive degradation.

### **4.1 Automated Testbench Generation: The "Cocotb" Revolution**

Traditional Verilog verification requires writing testbenches in SystemVerilog—a verbose and complex process. DSP leverages **cocotb** (Coroutine Co-simulation Testbench), a framework that allows verification tests to be written in Python.18

* **Mechanism:** Cocotb interfaces with the simulator (Verilator) via the VPI/VHPI interface. It allows the LLM to write tests using familiar Python structures (async/await, assert) rather than complex Verilog timing controls.  
* **Advantage:** Since LLMs are highly proficient in Python, they can generate robust testbenches with higher reliability than they can generate Verilog testbenches. This asymmetry is exploited to verify the weaker modality (Verilog) with the stronger one (Python).

### **4.2 The "Agentic Verification" Loop**

Research into "Agentic Verification" 19 defines a closed-loop protocol for the Sandbox:

1. **Isolation:** The Designer Agent (Sprouter) and the Verifier Agent are strictly separated. The Verifier generates the testbench based *solely* on the requirements, ensuring it does not bias the test toward the implementation's quirks.  
2. **Linting & Compilation:** The generated HDL is passed through **Verilator** in linting mode. This catches syntax errors, width mismatches, and combinational loops immediately.18  
3. **Co-Simulation:** The design is simulated against the testbench.  
4. **The "Pro-V" Refinement Cycle:** If the test fails, the **Pro-V** framework 20 engages a "Judge Agent." This agent analyzes the Verilator error logs and waveforms to determine the root cause (e.g., "The valid signal went high one cycle too early"). It then instructs the Designer to patch the code. This iterative refinement has been shown to improve pass rates from \~50% to \~90%.20

### **4.3 Formal Verification: The Ultimate Filter**

For critical logic where stochastic testing is insufficient, the Sandbox integrates **Formal Verification** (e.g., SymbiYosys). Here, the LLM generates *properties* (e.g., "assert count never overflows") rather than test vectors. The solver then mathematically proves that the logic adheres to these properties for *all possible inputs*. This creates a "mathematically proven" virtual hardware module, offering a level of certainty that probabilistic neural networks can never achieve.

### **4.4 Cycle-Accurate Simulation and Digital Twins**

Advanced simulators like the **NorthPole Validator** 21 demonstrate the feasibility of cycle-accurate C++ models for validating complex AI accelerator logic. DSP adopts this "Digital Twin" approach: the compiled C++ binary is not just a function; it is a cycle-accurate model of the hardware, ensuring that the timing characteristics (latency, throughput) are known and deterministic before integration.

## ---

**5\. Phase III: Dynamic Routing and Context Management (The Plasticity Mechanism)**

Once a module is grown and verified, it must be integrated into the agent's cognitive workflow. This requires a dynamic architecture capable of "Tool Use" routing and "Synaptic Pruning."

### **5.1 The "Tool Ocean" and Dynamic Registry**

The **STELLA** architecture 22 introduces the concept of a "Tool Ocean"—a vast, evolving registry of capabilities. In DSP, this registry stores the compiled binaries.

* **Semantic Indexing:** Each module is indexed with a semantic embedding of its function (e.g., "Cellular Automata Simulator," "SHA-256 Hasher").  
* **Routing Logic:** When a user query arrives, the agent's "Router" (a classifier) computes the similarity between the query and the tool index. If a high-confidence match is found, the query is routed to the tool.  
* **Memory-Augmented Routing (MACLA):** The **MACLA** framework 23 demonstrates a Bayesian approach to this routing. It maintains a posterior distribution (Beta distribution) representing the *reliability* of each procedure. The router selects tools based on an **Expected Utility** score that balances the probability of success with the cost of execution.

### **5.2 Synaptic Pruning: The "MemSkill" Evolution**

A biological brain prunes synapses to maintain efficiency. DSP uses a "Garbage Collection" mechanism derived from the **MemSkill** framework.24

* **The Utility Function:** Tools are evaluated based on a utility metric:  
  ![][image4]  
* **The Pruning Threshold:** Periodically, a "Gardener" agent scans the registry. Tools with utility ![][image5] below a dynamic threshold are pruned. This "Usage-Based Pruning" ensures that the system does not become bogged down by millions of "one-off" scripts.26  
* **Skill Evolution:** MemSkill also includes a "Designer" loop that *evolves* skills. It analyzes "hard cases" (tasks where current tools failed) and proposes new or refined tools to handle them, ensuring the toolset adapts to the changing environment.27

### **5.3 Consolidation and Archival**

Pruned tools are not necessarily deleted forever. Following the "DiffMem" approach 28, they can be archived to "cold storage" (e.g., a compressed vector store or Git repository). If the task re-emerges months later, the system can "re-sprout" the tool from the archive rather than generating it from scratch, simulating the retrieval of long-term memories.

## ---

**6\. Phase IV: Energetics, Latency, and the Breakeven Point**

The metabolic efficiency of the brain is a key driver of structural plasticity. DSP aims to replicate this efficiency by shifting computation from "expensive" neural inference to "cheap" compiled execution.

### **6.1 The Energy Cost of Hallucination (Inference)**

The energy cost of LLM inference is significant and growing.

* **Token Economics:** Generating a single token on a 70B parameter model requires moving substantial memory and performing billions of floating-point operations. The **TokenPowerBench** 1 and other studies 29 estimate the energy cost at roughly **0.04 \- 0.2 Joules per token** depending on the hardware (H100 vs. older GPUs) and utilization.  
* **Reasoning Cost:** A complex logical task (e.g., "Simulate 1000 steps") requires thousands of tokens. This pushes the energy cost for a single query into the range of **100 \- 500 Joules**.30

### **6.2 The Energy Cost of Structure (Compiled Execution)**

In contrast, a compiled C++ binary (generated via Verilator) is extremely efficient.

* **Verilator Performance:** Verilator compiles Verilog to highly optimized C++ that utilizes the host CPU's native instructions. Benchmarks show it is orders of magnitude faster than interpreted simulation.31  
* **Execution Cost:** Executing the same 1000-step simulation in C++ takes milliseconds and consumes **micro-Joules** (![][image6]) or **milli-Joules** (![][image7]).  
* **The Differential:** The energy difference between "thinking" the answer (LLM) and "calculating" the answer (Virtual Hardware) is a factor of ![][image8] to ![][image9].

### **6.3 The Breakeven Point Analysis**

The "Breakeven Point" is the metric that determines when DSP is economically viable. It is the number of executions (![][image1]) required for the energy savings to exceed the energy "investment" of generating the tool.

![][image10]  
**Estimating the Variables:**

* **![][image11]** (Sprouting): Requires complex prompting (CoT, RAG), equivalent to generating \~2,000 tokens. ![][image12].  
* ![][image13] (Sandbox): Requires running simulations and potential re-generations. ![][image14].  
* ![][image15]: Negligible (![][image16]).  
* **Total Investment (![][image17]):** ![][image18].  
* ![][image19] (Solving the task manually): ![][image20] per query.  
* ![][image21]: ![][image22].  
* **Savings:** ![][image20].

**Result:**

**![][image23]**  
**Implication:** If a logical task is performed more than **10 times**, DSP is energetically superior. For high-frequency tasks (e.g., a daemon monitoring logs, a recurrent user query), the efficiency gains become exponential. This aligns with findings that "ownership" of a model (or tool) becomes economical after a few months of continuous use.33

### **6.4 Latency: The System 1 / System 2 Shift**

DSP effectively automates the transition from System 2 (slow learning) to System 1 (fast mastery).

* **Sprouting (Learning):** High latency (Seconds/Minutes). The user waits while the agent "thinks" (writes/tests code).  
* **Execution (Mastery):** Near-zero latency (Milliseconds). Future requests are instant.  
  This allows the AI to "learn" a task once and execute it instantly forever, mimicking the human progression from "learning to drive" (conscious, slow) to "driving" (subconscious, fast).

## ---

**7\. Architectural Synthesis: The DSP Loop**

The integration of these four phases creates a cohesive, self-evolving cognitive architecture.

### **7.1 The Continuous Loop**

1. **Input Analysis:** The user provides a prompt. The **Router** (Phase III) checks the **Tool Ocean**.  
2. **Decision:**  
   * *Match:* Route to existing Virtual Hardware (Phase III).  
   * *No Match \+ Rigid Logic:* Trigger **Sprouting** (Phase I).  
3. **Sprouting (Phase I):** The **Planner** and **Architect** agents generate the Verilog HDL.  
4. **Stabilization (Phase II):** The **Sandbox** compiles and tests the module using **cocotb** and **Verilator**. The **Judge Agent** refines the code until it passes.  
5. **Integration:** The verified binary is registered in the **Tool Ocean** with a semantic signature.  
6. **Execution (Phase IV):** The tool executes the task.  
7. **Pruning:** Over time, the **Gardener** agent removes unused tools based on utility metrics (Phase III).

### **7.2 Case Study: The "Cellular Automata" Daemon**

Consider an agent tasked with monitoring a cellular automata simulation for a specific "glider" pattern.

* **Without DSP:** The LLM must "hallucinate" the grid state step-by-step. It fails after 20 steps due to the Hallucination Barrier. It consumes massive energy.  
* **With DSP:** The LLM writes a 100-line Verilog module implementing the CA rules. It verifies it against a small 5x5 grid. It compiles it. It then routes the "monitor" task to the binary. The binary runs for 1,000,000 generations in 1 second, finding the pattern with 100% accuracy. The energy cost is negligible.

## ---

**8\. Challenges and Future Outlook**

### **8.1 The Risk of Hardware Trojans**

A critical security risk is the generation of "Hardware Trojans"—malicious logic hidden within the Verilog (e.g., a "time bomb" that crashes the module after a certain count).

* **Mitigation:** The Sandbox must include **Security Linting** and **Formal Property Verification** to ensure safety bounds.35  
* **Future Work:** Adapting hardware security benchmarks to the domain of AI-generated code is a critical research frontier.

### **8.2 Complexity Scaling**

Current benchmarks (VerilogEval) are relatively small. Generating complex Systems-on-Chip (SoCs) requires handling hierarchy, buses, and memory coherency.

* **Hierarchical Design:** Future DSP systems must act as "Systems Architects," breaking down complex tasks into sub-modules (ALU, Memory Controller, Bus) and verifying them individually before integration.17

### **8.3 The "Black Box" Compiler**

The reliance on an external C++ compiler (GCC/Clang) creates a dependency on the host environment.

* **WebAssembly (WASM):** Future iterations could compile Verilog to WASM, creating portable, sandboxed virtual hardware that can run in any environment (cloud, edge, browser) without native dependencies.

## ---

**9\. Conclusion**

**Deterministic Structural Plasticity** represents a paradigm shift from "static" AI to "evolving" AI. By acknowledging the inherent limitations of probabilistic neural networks—the Hallucination Barrier and the metabolic cost of inference—DSP proposes a hybrid architecture that leverages the best of both worlds: the semantic flexibility of LLMs and the rigorous determinism of synthesized hardware.

Supported by the biological template of non-hallucinogenic neuroplasticity and empowered by recent advances in automated HDL generation and verification, DSP offers a viable path toward AI systems that are not only more accurate but exponentially more efficient. It transforms the AI from a passive predictor of tokens into an active architect of its own cognitive machinery.

---

**Citations used:**.1

#### **Works cited**

1. Benchmarking the Power Consumption of LLM Inference \- arXiv, accessed February 13, 2026, [https://arxiv.org/pdf/2512.03024](https://arxiv.org/pdf/2512.03024)  
2. Insights from Benchmarking Inference Energy in Large Language, accessed February 13, 2026, [https://aclanthology.org/2025.naacl-long.632.pdf](https://aclanthology.org/2025.naacl-long.632.pdf)  
3. Unraveling the Dynamics of Inductive, Abductive and Deductive, accessed February 13, 2026, [https://aclanthology.org/2025.emnlp-main.1045.pdf](https://aclanthology.org/2025.emnlp-main.1045.pdf)  
4. System-2 Reasoning via Generality and Adaptation \- OpenReview, accessed February 13, 2026, [https://openreview.net/pdf?id=brqBUZpj3K](https://openreview.net/pdf?id=brqBUZpj3K)  
5. Molecular design of a therapeutic LSD analogue with reduced, accessed February 13, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12037037/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12037037/)  
6. Zalsupindole: A Non-Hallucinogenic Psychoplastogen Advancing, accessed February 13, 2026, [https://pubs.acs.org/doi/10.1021/acschemneuro.5c00707?ai=1avwo\&mi=qquhsx\&af=R](https://pubs.acs.org/doi/10.1021/acschemneuro.5c00707?ai=1avwo&mi=qquhsx&af=R)  
7. Lysergic acid diethylamide (LSD) promotes social behavior through, accessed February 13, 2026, [https://www.pnas.org/doi/10.1073/pnas.2020705118](https://www.pnas.org/doi/10.1073/pnas.2020705118)  
8. Psychedelic-Inspired Drug Discovery Using an Engineered Biosensor, accessed February 13, 2026, [https://www.researchgate.net/publication/347900746\_Psychedelic-Inspired\_Drug\_Discovery\_Using\_an\_Engineered\_Biosensor](https://www.researchgate.net/publication/347900746_Psychedelic-Inspired_Drug_Discovery_Using_an_Engineered_Biosensor)  
9. Molecular design of a therapeutic LSD analogue with reduced, accessed February 13, 2026, [https://www.pnas.org/doi/10.1073/pnas.2416106122](https://www.pnas.org/doi/10.1073/pnas.2416106122)  
10. Survey and Benchmarking of Large Language Models for RTL Code, accessed February 13, 2026, [https://www.preprints.org/manuscript/202509.1681](https://www.preprints.org/manuscript/202509.1681)  
11. Newer LLMs, In-Context Learning, and Specification-to-RTL Tasks, accessed February 13, 2026, [https://openreview.net/attachment?id=Fnft4Mv0j0\&name=pdf](https://openreview.net/attachment?id=Fnft4Mv0j0&name=pdf)  
12. Improving LLM Performance in Generating Verilog by Fine Tuning, accessed February 13, 2026, [https://www2.eecs.berkeley.edu/Pubs/TechRpts/2025/EECS-2025-104.pdf](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2025/EECS-2025-104.pdf)  
13. RTLLM: An Open-Source Benchmark for Design RTL Generation ..., accessed February 13, 2026, [https://www.researchgate.net/publication/379299963\_RTLLM\_An\_Open-Source\_Benchmark\_for\_Design\_RTL\_Generation\_with\_Large\_Language\_Model](https://www.researchgate.net/publication/379299963_RTLLM_An_Open-Source_Benchmark_for_Design_RTL_Generation_with_Large_Language_Model)  
14. CodeV: Empowering LLMs for Verilog Generation through Multi, accessed February 13, 2026, [https://iprc-dip.github.io/CodeV/](https://iprc-dip.github.io/CodeV/)  
15. A Next-Step Benchmark for Evaluating LLM Performance in AI-Aided, accessed February 13, 2026, [https://arxiv.org/html/2601.21448v2](https://arxiv.org/html/2601.21448v2)  
16. Daily Papers \- Hugging Face, accessed February 13, 2026, [https://huggingface.co/papers?q=specification-to-RTL%20tasks](https://huggingface.co/papers?q=specification-to-RTL+tasks)  
17. Hierarchical LLM-based Verilog Generation for Scalable Chip Design, accessed February 13, 2026, [https://www.researchgate.net/publication/394512611\_HiVeGen\_-\_Hierarchical\_LLM-based\_Verilog\_Generation\_for\_Scalable\_Chip\_Design](https://www.researchgate.net/publication/394512611_HiVeGen_-_Hierarchical_LLM-based_Verilog_Generation_for_Scalable_Chip_Design)  
18. Architect in the Loop Agentic Hardware Design and Verification \- arXiv, accessed February 13, 2026, [https://arxiv.org/html/2512.00016v1](https://arxiv.org/html/2512.00016v1)  
19. a dynamic multi-agent system for coverage-based testbench, accessed February 13, 2026, [https://www.researchgate.net/publication/398871265\_A\_DYNAMIC\_MULTI-AGENT\_SYSTEM\_FOR\_COVERAGE-BASED\_TESTBENCH\_SYNTHESIS\_IN\_SYSTEMVERILOG](https://www.researchgate.net/publication/398871265_A_DYNAMIC_MULTI-AGENT_SYSTEM_FOR_COVERAGE-BASED_TESTBENCH_SYNTHESIS_IN_SYSTEMVERILOG)  
20. arxiv.org, accessed February 13, 2026, [https://arxiv.org/html/2506.12200v1](https://arxiv.org/html/2506.12200v1)  
21. (PDF) The NorthPole Validator: A Cycle-Accurate Simulator for HW ..., accessed February 13, 2026, [https://www.researchgate.net/publication/396626827\_The\_NorthPole\_Validator\_A\_Cycle-Accurate\_Simulator\_for\_HWSW\_Codesign\_of\_a\_Prescheduled\_Neural\_Inference\_Accelerator](https://www.researchgate.net/publication/396626827_The_NorthPole_Validator_A_Cycle-Accurate_Simulator_for_HWSW_Codesign_of_a_Prescheduled_Neural_Inference_Accelerator)  
22. STELLA: Self-Evolving LLM Agent Architecture \- Emergent Mind, accessed February 13, 2026, [https://www.emergentmind.com/topics/stella-self-evolving-llm-agent](https://www.emergentmind.com/topics/stella-self-evolving-llm-agent)  
23. Learning Hierarchical Procedural Memory for LLM Agents through, accessed February 13, 2026, [https://arxiv.org/html/2512.18950v1](https://arxiv.org/html/2512.18950v1)  
24. MemSkill: Learning and Evolving Memory Skills for Self ... \- arXiv, accessed February 13, 2026, [https://arxiv.org/html/2602.02474](https://arxiv.org/html/2602.02474)  
25. (PDF) MemSkill: Learning and Evolving Memory Skills for Self, accessed February 13, 2026, [https://www.researchgate.net/publication/400395587\_MemSkill\_Learning\_and\_Evolving\_Memory\_Skills\_for\_Self-Evolving\_Agents](https://www.researchgate.net/publication/400395587_MemSkill_Learning_and_Evolving_Memory_Skills_for_Self-Evolving_Agents)  
26. Applying neural pruning to NEAT, accessed February 13, 2026, [https://www.cs.swarthmore.edu/\~meeden/cs81/s12/papers/DasolEmilyPaper.pdf](https://www.cs.swarthmore.edu/~meeden/cs81/s12/papers/DasolEmilyPaper.pdf)  
27. MemSkill: Learning and Evolving Memory Skills for Self ... \- arXiv, accessed February 13, 2026, [https://arxiv.org/html/2602.02474v1](https://arxiv.org/html/2602.02474v1)  
28. DiffMem: Revolutionary Git-Based Memory Management for AI Agents, accessed February 13, 2026, [https://www.xugj520.cn/en/archives/diffmem-git-based-ai-memory-management.html](https://www.xugj520.cn/en/archives/diffmem-git-based-ai-memory-management.html)  
29. Comparing the energy efficiency of different LLM inference runtimes, accessed February 13, 2026, [https://luiscruz.github.io/course\_sustainableSE/2025/p1\_measuring\_software/g23\_llm\_inference.html](https://luiscruz.github.io/course_sustainableSE/2025/p1_measuring_software/g23_llm_inference.html)  
30. Diagnosing Inference Energy Consumption with the ML.ENERGY, accessed February 13, 2026, [https://ml.energy/blog/measurement/energy/diagnosing-inference-energy-consumption-with-the-mlenergy-leaderboard-v30/](https://ml.energy/blog/measurement/energy/diagnosing-inference-energy-consumption-with-the-mlenergy-leaderboard-v30/)  
31. Accelerating RTL Simulation with Hardware-Software Co-Design, accessed February 13, 2026, [https://people.csail.mit.edu/sanchez/papers/2023.ash.micro.pdf](https://people.csail.mit.edu/sanchez/papers/2023.ash.micro.pdf)  
32. GEM: GPU-Accelerated Emulator-Inspired RTL Simulation, accessed February 13, 2026, [https://d1qx31qr3h6wln.cloudfront.net/publications/GEM.pdf](https://d1qx31qr3h6wln.cloudfront.net/publications/GEM.pdf)  
33. LLMOrbit \- From Scaling Walls to Agentic AI Systems \- arXiv, accessed February 13, 2026, [https://arxiv.org/pdf/2601.14053](https://arxiv.org/pdf/2601.14053)  
34. FinOps for AI Overview, accessed February 13, 2026, [https://www.finops.org/wg/finops-for-ai-overview/](https://www.finops.org/wg/finops-for-ai-overview/)  
35. HARDWARE TROJAN DETECTION IN OPEN-SOURCE, accessed February 13, 2026, [https://www.teses.usp.br/teses/disponiveis/3/3141/tde-06052025-090853/publico/VictorTakashiHayashiCorr25.pdf](https://www.teses.usp.br/teses/disponiveis/3/3141/tde-06052025-090853/publico/VictorTakashiHayashiCorr25.pdf)  
36. Medusa: Accelerating Serverless LLM Inference with Materialization, accessed February 13, 2026, [https://www.researchgate.net/publication/388777706\_Medusa\_Accelerating\_Serverless\_LLM\_Inference\_with\_Materialization](https://www.researchgate.net/publication/388777706_Medusa_Accelerating_Serverless_LLM_Inference_with_Materialization)  
37. Benchmarking the Power Consumption of LLM Inference \- arXiv, accessed February 13, 2026, [https://arxiv.org/html/2512.03024v1](https://arxiv.org/html/2512.03024v1)  
38. Biochemical Mechanisms Underlying Psychedelic-Induced ... \- PMC, accessed February 13, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC9004607/](https://pmc.ncbi.nlm.nih.gov/articles/PMC9004607/)  
39. Learning Hierarchical Procedural Memory for LLM Agents through, accessed February 13, 2026, [https://arxiv.org/pdf/2512.18950](https://arxiv.org/pdf/2512.18950)  
40. Psychedelic-Inspired Drug Discovery Using an Engineered Biosensor, accessed February 13, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC8122087/](https://pmc.ncbi.nlm.nih.gov/articles/PMC8122087/)  
41. Analysis of 200+ pruned procedures during ALFWorld training. (a), accessed February 13, 2026, [https://www.researchgate.net/figure/Analysis-of-200-pruned-procedures-during-ALFWorld-training-a-Bimodal-success-rate\_fig2\_398979393](https://www.researchgate.net/figure/Analysis-of-200-pruned-procedures-during-ALFWorld-training-a-Bimodal-success-rate_fig2_398979393)  
42. Verilator Installation and User Guide \- Oreate AI Blog, accessed February 13, 2026, [https://www.oreateai.com/blog/verilator-installation-and-user-guide/991db7634554fa4db1588bedc02a7d64](https://www.oreateai.com/blog/verilator-installation-and-user-guide/991db7634554fa4db1588bedc02a7d64)  
43. Analyzing Energy Usage in LLMs with Test-time Compute \- arXiv, accessed February 13, 2026, [https://arxiv.org/html/2505.14733v2](https://arxiv.org/html/2505.14733v2)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAYCAYAAAD3Va0xAAABBElEQVR4XmNgGAUDBqyAeDcQ3wfi/0B8AlUaDHYA8W8GiPwzIG5ElUYFO4H4AQNEsRmqFBgUAfF8dEF0wA3E14E4gQFi0HoUWQiYAsRO6ILowA2IJwExGwPCVerICoDgFANEHi/oBuIAKLuYAWIQyGAYkAfirUh8nOAMEPNB2TxA/AaIPwGxAFQsjQESRniBOBAfQhNrY4C4CuQ6EFgJxAYIaewgCohr0MQkgPgbED8FYl4gvoEqjR3MYYCkJXQwgwHiqsVQTBBcA2IWdEEg0GCAGATCiWhyGMALiM8DMSO6BBSsZoAYJI0uAQM2DJCYgtn4AIjtkBVAgSUQX0IXHAWjAAgA8tMw5+vmET0AAAAASUVORK5CYII=>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAYCAYAAABeIWWlAAAC3ElEQVR4Xu2YWahNURzGPySZMlzKnIxXJMSTCFEiSjLELZIHCSnJTIYIkbGkJIkoD0pKFBcvoowPKDyglAfKA1Hi+/rWctdduoZLnbPrfvXr7P1f++yzhv/6728foEG/1W7ynHwjXUOsCbkXYk9IuxAvpLaS+2RNEmtFTpDGSaxwUufXk8XkRTiXxpNZ8aKiajiZStqQD2RSiGvAneJFpdYIcoW8g/fK43Aurof4cdIhfiFoOakIx4fJmXC8P3yWlU7DgxuUxQeQj/BgU21JjgeSz3Bh2ZfEy0avyOs8GPQAHnj/cK79lQ5O0ipXk9lZvOQaDHf+ZN4AVz+tnIilfQiZ++MKqwq+R+csXnKthDu2IG+gFsFtcaWWkafkDhkaL6KawatXdroMD6BPEtMqzSdvyQ4U9LmltFMx0OBUNK6Sl3AaHkXt1SmcpqDu/VZ4HYAHNy9vKHP1ht3QLxXNb9m4ij/UIbI2D6bqBQ/sdt5QAN0lo/KgNJLcIl/gwb2Bi0n0h3VJjwE5ftmtySEmB3OO7CHn4QLUL1yjfaxXo7Pww306/P3NsKW7gBpjMJocI7vI9hCTJsD3UcWWb5Upv0E+wX3+LyZ9EzkSjg/CadENdjWyX9I0uMOrSQ+4CmtvXCML4VejOeQRaQt3UN8dSy6SprARPwVLe0orpPhM8jDEJ+JnO1hv6ZmnjuS+cyfsSaM0OFm17vCM5h1QXJOyIYtXw8ZbRmEVPCGSVkivVLmUDfk96i3NoLxnLv146mqUUkpPSYPQaufS7I/LYnEFU8nxfEVN2qa6ScbAK9q+dtPfqy9cVaN6kiXwvlGaSXol0mBbh3OlnvZLKvlO7fPmWVx/Sej9UOoIT1Ij8gwuelILsg12SpoM3UO/XRna/0kr4L2mdFgK31zpc4lshIuJiouk/1Lek5bhPEorlqeqNAxO771wUdF+lXS9iokyYB3pEuKKKV1nhPMGFV7fAfOwkasTLSv4AAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAYCAYAAADOMhxqAAAA/klEQVR4XtXSsUpCURzH8b86JE5OPoBDvoCLNBnh0GrgJFEkjU0RSJu0KUJbU/gEhiYk0tASREtDT9AQtQmODfk99xSd+xMurf7gM5zfPfeee869ZmuTNC4wwSMukYvNkPSxHYxv0A3GsRzgSLoOHqSLsoEpUtLf41q6KPtoSLeFDxSljzJA3vxm53jFO8rhpDBucy47aOMQL+b3tZJN9LQkJ+ZvWol7Sl1L0sKX+W8TyxUKWppf9VNLl5EW5o/3GXd6wZ2MOxVddg/fqEhvu3jC+c84gyYWOP6dFMb9aCWcYYY3jFELJ4W51SIpWQy1TErV/t79Xzm1hHddgywBT/km6HZ+3uwAAAAASUVORK5CYII=>

[image4]: <data:image/png;base64,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>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAZCAYAAADuWXTMAAAA3ElEQVR4Xu2SvQ4BURCFB41CQaH0ECqVglIiEokH4AE0olAptMRWHkKi0ZBQqNQkSCSeQEOt4YyZTa6xGirJfsnXnLOz9yeXKOQrmnAH7+oZLmFK+xw8OP0GlrR7koA3eHRDwxrWbMiUSf7at4UShycYsQUzJBku2kLhbY5s6LOFFxizhTKAFRsyaZJVp7Zw4Evie3mjTjLcsoWSIbmsQH4aHpMMZ22hNGDXhj57eIVRWygrktUDWZC8qiDasGNDF341vO2qkyWhB3tO9pECnJCcfw5nMP/yRci/8gBL8yow1FDIEAAAAABJRU5ErkJggg==>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABUElEQVR4Xu2UPShGURzGHwzincWgLCYlKavCIFlMyuZj4F1MDJRSSpkkg0lkoZQokclk8ZHBZrOYFCaLxPPvObfO/fder+Ha7q9+w3n+57zn6z0XKCj4IwP0ir7S7+ANHY475UEP9OPbvpAX89AEY76QsE43XDZDL1yWxTE0QYsvGPX0na64/JoeuawSddD4O19I6INmH4myBvpJF6Isi35o/KovJCxBHZqjrDdkNrgaa1BfG1ORM/roMlu57cB2Uo17+kJrfMGopW901+Wn0B0YnVHeTpuidhu0+oMoS9EBdViOskbo0jZpCXpIxiDU9yG0jXLIxqMsxTTSK7BtbtEPukgnoDsyhugXHQ3tbvpMT5BxPMYe1OmQXkJHZc9/it7SHWhHCbYrO1L735/TSeiYM3mi+z7Mi1boeGZ9IS/su2ETdPlCXszhl+dd8O/8AAiRQ95wMBnVAAAAAElFTkSuQmCC>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAYCAYAAADtaU2/AAABY0lEQVR4Xu2TPyhHURTHv8hMoihlQCmT/BnIwCBJGaQUEhayKiabYjGITfk3SAZCFhtKSQYslFEphTJKfI9zXr/j4pflDep96lPvfs+9nfvuuw9ISPiHNNNj+kjfzVPa5ifFSQ206WJYiJsxaOPusBA3W9DGhWFBGKUHdJPm0nG6Qa/oHs2m7XSNHtm8ys+V6cmiz/QsLAjVdImWQncmzeqtVmTZCR2hGZZf01V7TkcTdP1UWBBmaAPthE7qcbWo8bzLhEv8rfE0dH1jWPAs0BfosUb0QRfWuqzMskGX/cY5fUDqpH5Ejm87yOQT3NNMl03SV5rvMkE2VODGJdANrrvsG9FbyCXz3NIVN5YN3NBdGy/THNoCXX9huTBsWb/LviEXRyaVu6zCsl6XFVs2ROuQ2lQrfaNdNq6id9ATTHvME3QnyDqgNzwvyOXCHNJZ6NtGzNEn6H+7Twfw9RMlJCTEwwc8nkmT1BVpCgAAAABJRU5ErkJggg==>

[image8]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAXCAYAAAD6FjQuAAABd0lEQVR4Xu2UPShGURzG/z5CsqB8lSQZpAwmk0ExGSxGDJIyMGBRlFlJslp8RAZfKfKxIVnIzmIxyEAoC8/f/7w679O9dXgz0PvUr+79ndN57rnve4/IP0kpOGf5W1kANyw5GaCapZcusAtOwRqoSh7+TDMYA9c8kEgF6AAHYIPGEhkAl6DE3U+AO+9ekw0mQZPE7GwQXIE58CbRZfobvIJOz2WCWzDquWGxubFlfp4luqwXvIMG8odgz13Xg353nVKZ7lrLKsmvgyeQB0bEXu04mAcP7jr/azYlrkydlpWRX3W+hny7pLCzfYkuW3a+znOtYg/xAqblBzvbkeiyJedryQdFyzZZIotii5aTX3G+mHxQ4spmxBblD17nqtfP4NvRsi2WSI/Yoo3kj8EJueBo2TZLpBA8gm7P5YB7MOS54OSKnRJHYmckR48zPROz3H0fuBD7xoLTAs7EivRVKXqI6jlZ4M3TtIEpsT/MLChKHk4nnb+QD2TxVgTBfsa0AAAAAElFTkSuQmCC>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAXCAYAAAD6FjQuAAABm0lEQVR4Xu2UyytFURTGF8qjlJBneWdgovgTDAxlYuYxkAlFBh4lMlQGnt3MEVHeRR4zZKCIsZEJZUQoE77VWvfefdc9J0eZ3Lpf/Wqvb532d157ESW4UsAomAIToDq2/b+aBD263gdj0Va8+M6qrOmoAxyCS7ABKpxeDvgA6VpXgtxI11EpaAUnYNv0wuoFt6BQa35NT07dAp7BIJgDmyBLexH1gzuwCL7IO6wIfII2x0sFj2BI6z7wDcq1ngHjuvbUO3mHdZNsVG/8U3Ck63aSJwtrBFw7dZz8wvipOazM+FvgDWSS3Ai/1rCGwY1Tx8kvjD0OKzb+uvo1Wt+DAl0v0S9/o1/YMXmHrapfp3UDWCA5AiGK/pme8gs7IO+wFfVrjR9IHLZjTWiZZNMS46+pn2/8QPILmyXZ1B54vpZ9PgZ/FoftWhPqItm00fjn4MJ4gcVhe9YkGTuvoNPx+OO/gAHHC6wMkilxRjIjrXic8UxM05oHLp8jPmOB1QSuSIL4VTEPJHMy27mO1QymSX6YeZAX204qqUTQD7rdWTSsn1SwAAAAAElFTkSuQmCC>

[image10]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAABOCAYAAACdbkoxAAAPdElEQVR4Xu3dCbBsRXnA8c+4ocZ9wQUkLigu5RI1cQdxi4VJ3HeNIFABEzWK4ooIbsQNjSuoPKOouOC+lAlicAOFAgNoSoP1KomKSwloSSpaVtL/dH81ffvOvW8eb+69cx//X9VXc06fucPMmaHO97r79BchSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZK0Af66xHdL/G+Jr5Y4vcSlbf8W3fMW3TtK/Djqe/+nEmeV+F3Uz7FWrljivWPjCnh/vBfeG/Ffbf8H/ZM22J3GhhWcEfW9n1vi1BIXt/2nd8+RJElz9oASbxobN6EjSjxqaLvXsD9PVy3xmbFxFWPyyHt729C2ke45NqzgalET4tFNxgZJkjQ/3yhx9bb9/v7ABiCpWS1Wcq2oPWrpvG57rewSsydsvL9/btvXL3Hj7tiimDVhO6bEvm37mf0BSZK0Nq4Zk6HDbSVFi2y/WPoZvrP08JrYnoRtfH+LaNaEjQR/0T+LJEk7lTfG0ovu0e3xLV3bF7rtebjf2DAHZ5b4727/wSWuUOKUtv+hEp+bHI4Lu+3LansSNt5f9mK+rD3y3v6gxLtLfLy1kUDn8Vk8ptu+bolHl3h+17Y9Zk3Y+t8L8/HQvw/mRKafdts7Il//BUtaJUm6nODi+8Wh7Z0lHte271/i990xEhQSin7u1adLXCcmE+hf3+KObX//qM9njtO/Rr3I79WOzQuf48VDG/Os+G/uU2LPpYfivu1xtxKvjZp8Mf/t8Kif79R2fDWzJmxPjOU9UVeJyZyvA0r8Z9t+RHsEc+Q4jwxTcy45h68rcVI7flhMhiZxQdRze73Wnkk3PWKzmDVh+82w/+QS/9C2c9g3PaM9XrvEW0t8sMSVSnypxFOjJqp8jheWuEF7LjdyHFXiuLafn5O/y/823xvH3xf1e5AkaadGIsHFMpEkcOGn5wf01pzWtrmgcmHm2A1b28OiJhS0fT1qrxa9W8jkgwSDHi7aX93a5o3Pce9un6TlH9v2B7r2HgkTyQzvnTllJHz/FvVznt09byWzJmwnxvKEbUu3/cCoSTEJSY/X5pwdFPVc3rzEraImk3zWu0VNhhPJUCIJPLhtzzovcZaE7faxtKeS7/uiErctcbtY/jnB5/py2+Z7YXj4/BLPjtpztns7lsnnn0e9sYG7cB8Sk89Jkk3CD763m5U4PhZzPqAkSevqlyUe2+2zhAO4q5ReNZBAcOF+cyxN/hLJBcOVPP+SqAkRF+P1cvKwn0txkHgc0h+IyXAtPVX0gq1m1oRtW3gdEp3s1Ux9AgZ6qHo8f9duv7/pguHX7I2adQh6loRtNfeJ5QkbQ7yvikmC+vD2mMPs9LRhn6jPvUbXxnP5XeXnpCc4/xEwfm+SJF1u0bv221g6ny3nELFmWy6ZwfG8kNJbRS8cQ1VcbOmJI4nL3i8Sob3b9noiqfxa1Av9U1obieMJUXvA0L8vhnnX07QhWIZqOZcHxqQnq8cQ6RO6/Y902zyfz8CaaeuJpJzE8hUl/rS1kfiS2JKA5u8kj2XvLb+1TPa/H3VuZf5DIT8nv533tDa+tzfE7MmoJEnSQvibbpveKYZ8P9a1bRbHjg2SJEmbHTc1jMOn9FbRa3XnoX3R8Vk+PDZKkiRJkiRJkiRJkiRJkiRJklbGcgZ/1O2zkOgvun3N3wOilozqUQFCO45FcVm6I7EECRURrty1SZK0qTw0JouRcmFj7SnMu76nlmJ9sGu1bdYDY5V9KhJox7GQLhUycJv2aLImSdrUjolJwvbMWL7avVbGeVstVtNXDTgvLH80T5SVohIDZi2bJUnSQiNxyFXwGQbNAtmJCgKscP+uEkcPx1ZCbxF1P+eFNb9+HHXoliLml6XsFEXOKV9FUnqXqBd11hHbKH1Cx6r7Pao5/LrEa0rctGt/R4lTYmkR+gdF/Q6f3rX9XUxqa05Dryp/k9UAVnLLEueOjZtAf27P7LapU/o/UX9H32mPYzH5afg++gR7xG/rJ1Ffj/j7pYclSdpxXNyObNtcbEDB7EPbNvUV/zBqIkeyNIsbRX2NeaIUESge/+T+wIwoaUQZrETitpFIHlMWsycZS/3xtHfUzz+iLNMRbZsEb5a5cCSs20LisVJh+/XAkHEmQWOsVpe0T9jyHxmUN3tJ1Hqk1BS9e2sf5xGu5Ntjw4AyX+m53bYkSXNBAe9xfg/1JdOPShzQ7YPeNnqFuPixcnzWX/xse/xUiX1LvKjE/iVeFvVv0nFRC7k/su3zHOo5UupoGnrEcojr5VHn2oGeDeKOUf+e4a+T2rERxeSpP5p4D4lEiAsuvVWgBFN/DuaNc9b3koF6mP3nn9ZDNq0QPL0/1C4lscYdSpw+OTzVlUrs17YfVeLwqN9R9rSC1yPxeU7XxjkmWeb3QtLE98vvgCSS74Hzf9uoSR7nkLqw9/j/v4zYs3sueK21OMckrHkuEgksBd5v3vaP6o5RixZ8HyR1Wdf25Ki/GRJ99DVVR9xAcr2o8z93ifo3nDf+u/R2HtmexznJc4hntf38LiRJWoaE6pwSF8ak14I766bNveICRPt1YzJERhKVxz7Rtrnw7B51aJULIXfrMTyKb7XHTJS4sHGcCznDf6v1yH1ybIjaK0WSkT0oj49JD+E09K7dtW0fFJNi8Tg/6oWVRIT3Qs/SWvXA8R5/VeKbbZvgvfXnnffxF91+6p9Dsgwu+pxzhvpIBPhet9UT2vcA0RtK4oW+V+9JUZMWXDvqeXll294taqLPdwh+Q3wXJEW83l+2drDNTQAfavv9a837HHMut5b4Xtsm+C1m0ffEuerR40aiC4ZQ+95Hksr8Da8kb9B5add2jfa4T3vkc/O7ynPI/0v8Q0OSpB2Wd4yCJINerkwaSBSYKM+F55LWlnOxSLB2jdrrQG8OuKCT3HExBb1auEXU5IlkIXszRheNDbH8IszNEvS+rYSLdL6XcY7RHiV+GDVJYq7cRiMZy56f/maEs7vtTCJIgOll4/PRW/aSEifmk1aQCXa6X3skwaGnD6+OSTLM9zOel37u11hnNH83DKMznE7PHUkypr3WeiNh7DGnD/yWL46liTEJ59gb2uM3la/Hd8bnTfz+M6nt/4GA7M2VJGmH0evEUFd/5+jTog7xMORzSGvjTtOD8wlR5wUxhNT3ODBcdq+oPWkMNf1Ha6f3heRrvKAlLvS/i9or0SNJofeDYU6GSEnqsldjGnr/cqL56Hkx+Sz0Um2JmrBsBJIdzg1z9khu6f27VdRhZxJhhp3p0QJDn7n9+ai9npeWOKu1TcNrkJDcre1n4oxPd9sXxNLC7pyXt8fkHPd/x3Ay38WBUW8I+Xlr55wzLMhQL//dnIeYr7Xe55iElrl+W0vstfRQHBuToUsSd274OKHt8zf0Hk7Duaa3kX+s0DuX557eSX7/nJfDWtuWWHoOOfa3UXuaJUlaKPQI0Wvx1fGAFgIJF8PeazG/TJIkbRLHR+0NYt6VFg+9lWdEHR6UJEmSJEmSJEmSpJ0MN2WMS7uwNAZrjUmSJGkBkKxxhyRygeJcZ0ySJEkLgISNxXcx74VtJUmStIO4M5RFbkEJKYZCe1k0PqsWzIMLyEqSJG0H1l7rF8RNfQWKsUrEjsoqC5IkSZrBd6PWMe1RlSCNReMpcZVF4ynJRFH757fjVMQABc9JBPN1joxaGYHar6fF9MoTkiRJGjBnLe8O5THj+yU+1z1vLBqfNUOpA0vdTHriHtna9olJwXPmwrFNObFzopY8w+vaoyRJkuZkLBr/rfZIckd9TObAZZ1MeurG+rB7RC1O/8O2T3mysUdPkiRtYlzot8akkDbuXuLsbl9r5xGxvGj8Z9o2ReMPadvPKXFw28aWqEXeSeQYPn1XTJ77/hKPbduSJGkncFZ77Bd1fWuJ+3f7kiRJ2kBvbI99wnZu1InwmxGfY7WQJEnadLgLEX9W4pNt+1ntES8scXHUYbcfxGTYbXv9JBZ7wdgxsTO2HZIkaR381bDPRfjkoe1OJX7btveOeufiZXFR1LsZ19qYVIwhSZK0qTA5vffvsTypObTE19r2p0o8qcRtSrwt6vIRT2jHjivxvhK7RC1o/t52PHEnJMeYSI/doq4bRtsfl/hoa+d1wBy6XEz2RSX2j8nkekmSpJ3eNUv8S9Tk7NldO3cc/qzbB/vcyYhLoi7sunvUBVrT0SVeXuI+bX9Le/xpewSLx9JDB57/zRJHtH2St5xLx+t8pcSHSxwedcj2aiXu247nkheSJElqSOpu3LZ/GXVOG7iTNPWLwOIZ7ZEkjWTr1lF70k6Jmizy/HEuXNa+ZEkRhl3v0B1j8di8CYJeNkmSJDXHRF32gyTpsyVu19qvGHVOWrpB1NX5s34lJZNY3+2ktv+m9sg6YiRqPP+EEie2drwyJjclMET6wRLvafsvbY8Yh3HnjQSTSgQ9ElAXopUkSVoQryrxsLbNXD3m8JmsSZIkLZBvlLh626Y3r5+rJ0mSpAXQ3yV7ZredGB5l+Pf1MfsyJVmUfV4YSj6/xKklLhiOzYrX4M5dehMpY7W1xH79EyRJkhbVb8aGqEXYE/PrwI0UG4X3cNW2/eioxeG315uH/XcP+5IkSQvppiW+ODYWj+u2WZPuKt0+NymwJAlDqVco8eIS+5a4Tom9ot4V++Wo8+DeWeKpJV5Q4iD+uGG9OqpMcDcur80NG7kG3TRZiYIevkwmWRqlXwuPR27syELyo6whi1uWOKzbZ8071tkDiSG9iWt9s4ckSdI2kfhsLfG9tk38IpYvJAzWiDujxM1K/L61vb09kpjdsG2TOLFmHUOru0ZdniRvYGBYlQSP/x5YFw9PKXFpiXu0/RF36FIqbMS6dv1aeP2yK9OwREsi0cv3tWeJX5d4TIkHl7gw6rp5fdIqSZK0kFgf7vS2Te/V7aMOTZ5W4kZtn+VLDmjPoSIESLBI1kCShj2iJm/c3PCr9kiCBKpJICs/jOhdO2dsLJ7bHknaSCSznNhKvt4eSSpZMDmRDPKemSNHbyDz3GDCJkmSFh6JGL1fJF1/0rWzVh1DmMeXuGfU+WSsN5fVIehFO7Ztf6k9klDRSweOvaXETdo+r/WKmPTS9Uiktpb40dAOhj/7tfD6eXfTsLYe89jyPSWWNWFx5HtHHXKlfBgJ6oH9kyRJki4vPha1Fyt73iRJkrRg6Mmih43KEJIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZK0QP4PYHIUN3uiXUIAAAAASUVORK5CYII=>

[image11]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAYCAYAAACIhL/AAAAB/0lEQVR4Xu2Vz0tVQRTHTz8lEFQMQXEhbkIJEqTAECJ/ICJoQbgRo0VtUhdtQgJBUqigINGFbVJR3LpQERErWggKRmCIRH9AkaAtskWL/H4553rPm0CI93ivxf3AB2bOufe+mXlzZkQSEhL+iatwHf6Gf+AWXIFv4Q7ctzi9o6/kBg6Kg6gI4qQW7sLrYSJbnIMHcDNMOBZgaRjMFi2iq/fExU7AF66/5NpZ55noABtcrAeOuX5OWZO4ELyd/qFcUSRawazaiDzRojjvYiHF8CmcF90KI/ASfOwfygQ3RVdr0MXOilZ1xC143/VZzV/gbRcrgN9gn4tlhFHRAV4LE453sNDaNaJnY9NRNmYaXgyD6bINf8IzYcLoEp1ExBs46fqedtfmNnluRgO/AGfga9gLH4purcv2zl9Ui67eYpgQPWYa4Z7oh0mV6POMHwff5d5stv49eAP2wzL4C16xHPfuA2sfweOEe+yj6A9+tb73s+X84LlCjOW7WD0cFn1nQvQm4sD4zQE4JPFpUAI7JPVMfW+xjMArjwNkQXgqLV5ufa7UbJxOgRX/yNo8JX6ITpinSdqchMuSesNEN84nF+uGc67PFWy19gasszZPgSnRfzTKpw1n+xJ+gKvwlehe5s0TwYnwjGRxcQB3RSdyCn6Hp+25NtEiGbd8QsJ/wSE2/2T2dGtxCQAAAABJRU5ErkJggg==>

[image12]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAYCAYAAACiNE5vAAAC9ElEQVR4Xu2WWahPURTGP/OYOUnhgTJEmUWkyAMeDE8eRNKNlBeZQxLlwZRQRIgMDx4oypAxxQMPPJgSmUWGxIMS33fXPv//Pss5/3uVq5vOr766+9vrf+5Z++y19gYKCgr+It2pRt4MdKH2UZeom1RVerqaxtQ66iJ1i9pEtUhF1COaUoOotdR7amhq1uhE3aEWhHE36hHsNzFHqcOwBWhOnYItQr3kOXWGOk/9RHbim2GJx8yHLVSTMJ4C+33nUgTQL3gjIs+jRdXiPIPFSlrUFXFQXbIU+Yk/pY47bxwsfkwYH6Telqer0Zf/Qa10fhYqMS3kQz9R1+QlrtqWv9v5Q4K/Koy1I+6Vp0t8pM55M4PhsOft9BOiI3UaFvAF1mRWw+rU0xC1W+mEvMQ1lr/D+QOCvz+MP+H3chBvqMfezGAR7Hkz/ITYRe2lRsK20VjqEHUb1qBiFqLcjGpDXuL6H1mJJ/WrZib0d1biL6kX3sxAH1Rl0dZPiGPeCMyl3lEXqO3UDeoK1SwOqoG8xLXIWYn3Db5qW3xDduJK+ok3HS2pr9RVP5Ew0BsRbajZsK0/AbYj/oQk8WHO7x18X3v9g781jNWV75anS7yGnemVmAR7VsXS1BbW0XOEmoPs+k6Y7I0K5CWu40a+Li8xipOvhRYqNx1Dns+w963ENtiz1DAzmQ77B4up8dQG6ho1Og4K9KTWe7MCSeLqrh4dMSecNxEWr68l1HvUwWO0hRWzMfLaU72isdDzXzkvhb5yK+fpIWowmtPZ2hqWtGq8TxRXE0niWZcNLeADqkHkLYFt4+QCo/LS73uUIuxZ8gaHcTvYaSSva/CSJqmFy2WZNyJ0c9LLqcmcpUalp2tkDewFtJM8un5ep6aGse7f+kozSxGG7uZborFOnPj8V8f+DusLWkSV0WXqPsoL8c84ALuZKWlJL6bd4o/CDtRyWPwealpq1tDdYR7sBNAX1C6SFzOL+gCr+5OwhqadUFBQUFBQ8L/yCxnAqso3A3sCAAAAAElFTkSuQmCC>

[image13]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAYCAYAAABEHYUrAAACv0lEQVR4Xu2XSaiOURzGHzNFKETCjUIszCULs2xsjJkWIsqQoQxJckNEIREyLAgpspApipsMKUqUZFywsFBskCx4np7z3u9857uk67N4r+9Xv3rP/5zvve+Z/udcoEKFChVywgh6n36nP+gTep3epM/opxCX8/yT/KMOqkNVSVwMoR/omLQij7SiX+jDtCLiIu2SBvPIRHhWt0exRnRXVL4SPeeaHXBnx0axpXR/VG4w3EUhCcXOiBs1BNrDmVjZN6MFnJA6RDExlN6DB+IWHR7izehzeN+fDrH6cp5OToOkJ70GnxYDkro/Ri/Wx1dHseZwds6YRpeE5yq4/eDaWrOM9khi9WEq7ZQGyU66iZ7EXyTKffDHj0orImpou/DcFF4Jk2prgd50YVT+F9xBGY6+p/QzvBTrYg48IDGv6aKofIA2icoZI+kxeFa2hdhyOLOvoYfpVTjzD4QT5dnQLqMv3EYTotW2MsS11VaFWLbdDtHp4bmEfvBLLqUV8AeMox9pn6TuBrykxFz40pGiWdB7NYht6Sk4PyymB+GOjocHrjFdAf+dl/pxQn/6JoktgO8Hb+GVJd7Bg1OEjhiNyCO4s+9DOVYJ51cDcZwegTuyOqnLqKFn6Ga6jvaireHt8JiOzhoGutENdHcSF7PhxBWj9kqYuuoKDZQmRgNXVrbSy/CSUQfq4is8Iymd6TfaMq2AB2EY3JEYbYEtSUxUo7DC5sPLvewoGb1A8SUkRf9EaORFR3jfipnwrKdoK2ildaVrk7oLdFYSEyfgWRfnUOh4WdFe08z+Dh1NOnO1LJWkuoe4Pmhj1ihC++423YvS1fIKdZ+t+g5ts6PwGT+huDp/aFUop6R7URl4SngeBG+bNoXqfKGjTLel9Sg9+oQuOQ/Cs+7w2TbJJTr6lGm15HVkpSi7K3HtgTuazvz/x0/fDIlBNcVH/wAAAABJRU5ErkJggg==>

[image14]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAAYCAYAAADTTCLxAAAFS0lEQVR4Xu2Zd4hdRRSHj8YSe8UaMWLEjr33hliIDdQ/xFiwYAF7w7IRxYCJ3dhRMSYK1oBgw6yKYAf1DxuSYG9YUVERPd+embvnnr1v3w0kbxecD36wc2buvClnZs7MihQKhUKhsEBYUnW76lvVZ6oZqnG1EsYaqntUc1SvqU6qZw+wmOpK1Quqt1RTVUvVSoxODlZNVI1J6UVUJ6pOrUoYbfu3k+ox1YuqftXutdxRxCzVzarVVYepflbNVS3vyqyqeld1Wkqvo/pY1ZcLJKgL52GQxqpmiw3UaKdP9W/Q66q1XRlo078dVV+otk/pfVV/qPauSowS9hLzTjw9wwTT+WudbZrY5HtYFd+rFk/pQ8S+W60qIbJJsu3gbBEciwH8VAYHHse62BdayExWva/6UfWK6hrVsrUS7fv3huoml4YHxRxlOO5VfaD6W6xOxhZnW2hcqPpLdbazseXz46z+zDzVwy4NeDLldkvp+1XfDGYPwAr5R3VJsDfBlkuHP4oZPeAK1aRoDLTp3wZiY3JGVcKg/l/EynfjcbE6xgf7AuccsR/C6zIrJRsxAHDWk76jKmFsk+yXpjQ7A6snwmp6NhobYJukvltjRg+4TLpPfpv+HSXWh2MGswdgcWHfI9gji6p+Vb0XM2AV1VNiFVGIwIuGL+ELJaio24pjy6bT/nyngdSfz7JtU/qWqoSxebJnx/lJhh4N8LXqk2hsIDvi0TGjBzCGl6seEAvQCHxP8AWkXf9yH3ACz+nJHuuM5LFuXADTVXeLRZNsIUwUDX5btZUrB2fKYIA2PxD504D9Uzo7Q5z8fN4RAAF/Nw0Owc/n0dgATs0WukLM6AEcf6xegjg4Uqwtu1Ql2vWPXbBp8omPsJ8S7JGLxMoReA/hoWhIcC35TvW8WLDxqlggxzVufthIrNOshAyO1jT5Gyc7ZyH8Ls2Dw8DMjcbA0qrfVC/FjB7B7cU7HQEwq5/gL9OmfzhR0+Qz6diZp+F4TizgWy5mwJbR4GDrniQ2cftJu+DCwwS8I/XzHzaU5q1os2S/PqWJ1pvOqq/E7sTDcaBYXd2OqV7CxNOmNVO6Tf94++CbeHTlG9Thwe7B+Qi+n44ZHrZzPGSm6nhpPu8zB0VDB/B06uMRJz90ZLiK0XDyPNsle94lOHq4okV4N6C9w3GDWF0EkW3gaKLONjo5fdOJ9cRWLw82Ho4B2rRFSrfp3xFi3xxX5RrnJvuewe7J3/qbVw08h0acp9pHdbXqZdWuvlBifdVV0diBPtUTYkFiJq9o4Pr1qEvDAWKNZdUCsQiRr4fdhDJTnI3bxASXBur/Mth6BeNIGzkyPTzyYM/BcJv+jU/ps3KBBO8GPPSsmNIcxwTM/n3lLrFv2VEbYXUuE2wMJEEXedy9eZxg4jnzOcO7gcfRUV8vuwnfZ3CiD6Xe2PPFtrz8yMNRQ+PXrUrY4we2rVOaznNLwbZWsuXAkcEdCXjZ5Ljzjzf0iXb6HatN/4BxYyI9s1WPuDRl+C7HBuy288TGuCMEFJ3gBYqPCUyeUe1cz25kU7FtizOLjr4pdrb9KXaLyBAFcwYemtK8Z7Na432WrfM6l6YO/z6QzzV2FRyJI6Vf7GUrO8NIQLu5huWdj6ibccxbfqZb/4BjhKufd+4fxGKnDLv1HLHFQGx2o9hVsqdPwDzh4oFNmuzKwcpig3Kf6k5pvo4weES23AxYyRckm+dYscHA2Z4UC/LydjhSsA1zTesX2wU571kYkTb9A3Zcxm+W6jYZ6kTsFDgIv8Vxy/9WeB0sFAqFQqFQKBQKhcL/g/8AAPZadtJaBdcAAAAASUVORK5CYII=>

[image15]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAAYCAYAAAChg0BHAAADFUlEQVR4Xu2XWajNURTGPzNlzDw83PIgQxEPZjJkVuaIdMWD+UGGMl4kQ8hMyBAiSmQqlKGQMaUkD/IkSuGBBxLf19r7nnU2qZtzlXPPV7/677X32f//XmvttfcBCiqooIIKyol6kPvkG/lBnpFr5AZ5QT4Guyi2n+S/5AAtuCixS13Ie9Iv7chH1SJfyOO0w+kiaZ4a81GDYVmx3tkqkS2ufcU957U2wpzR39nmkF2uXWF0F5ki6ZngB1UENYCdJDo9omrACmYjZ0vVkGwgF2DbaTvpSNb4QeWsXuROeK5M9sHWUrd0RBk1GpYFJc5WHXa6RI0js11bp8pzMtHZ6pF3ZJ6zlbeawL4tqht56Npl1k6YM/qmHU43Sf3w3Im8gWVBqmOkQ2r8h1pCtqXGskgR/kyqpR1Bk2EOi7pONrm213T3rLRdSk6SHQFJhVlbaxpZAZtb201ZNh82f7zPjCKHyCrY9tsPW7C0kJxHdtG/jOxsbQX7jeY/Smq6vl/UDpYVl9IO2NE6gHwgbYKtLWx89zjoD1oHy5SoR7D5ZpK95AzMYY3JVzIwjCsJSHLmSNj9R3ehKuQ7GQS7CGp+OVWqCguq5pN0J9LB0BL2ngOkWejLkrypmvAUtri3oe15Gfq8o8YGW21ni9KLisJzHdgC25f2mjOmwrbbE1jxk4aSB3EQLNoxwxRZZYQySNICYzAUZRX5uHjN5+vFWnIPllUrSU/XlxNpQn3M704ZRVFOkHSJe+X6dGLpP05TWKVXtsVtuZxsDs+K/idYNGMUryKzbUbAgqSs1bF/DjanCr7evzWMkxTEWa6dc+kjbpNFiV2RHOLarWG1KErRmRGeh8Ou9lG62cbfDoMtQn8ep8C2hZzTIvQfh20b6SzsJNGFUU6UY8bAtqekWrEgPMvx+gY5OadSmiuSup3qBatJ16wRJn2UKvseZB/by8hi134NO5alPuQWOQKrAZ1hmXAQFvXxYZy0O9hjwdRWOI3MRVHZexh2BzpBegf7f6u5+MujMp+k06I4NVZETYKdcqeQqRkFlad+AqVam5Qnb8UOAAAAAElFTkSuQmCC>

[image16]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAYCAYAAAC1Ft6mAAACQklEQVR4Xu2WS0hVURSG/x5mElpKQRA1aRD2ArEHBZHkIGxUsyCpBkYRgqIUvRGKwoE1yYGCWKBIQUGTJoHioKACpdcgpQgcNJGgQQhF2L9Y+9jei7tvJ2+ExfngG5x/rXu469y997lARsZ/yRq6wIaOlbSHDtGn9FhYnjssolW0jU7SLUFVWU5f0pPuejUdh37mr7CUHkX8aftM0If0EZ1G7oE6oAP5nIA+gCKT+zTTUfoFeu8pOkxX+U35WEGv0ee0Afr003Ia8YE+0Dsm2wPt32XyXLRAe4/YQowK6CAvaCMtDsupiA0ke0fyLpNXu/yCyXPxANor98pLGb0M/UUO0vlh+beIDSTXkt80+SaX95rcMo9+oq9swacE+jOOQE+bhWF5VsQG2u1yO9B6l/eZ3LIT2nfdFgTZgMfpE8x+acWIDbTD5XagSpffNrnlErRvry0I26Cn0im62NQKJRloq8nXubzT5BtdfsPklsf0M/IcULLcztE30GPxTw0WG0jeQZLLS9VH+iS/aHKf5LP3bSEX5fQ89JxvhQ5aCMlAsgosY/Seyeqg/fvctRxImxFug8PQnuSFnAq5QRN9Tc/SJWE5NclA222BXKFvoSdWgiz7j/j5YpUeu9f66Te61stSs4y20/fQL1caln9JsnlrbQG6rGUv7HfXshrkV6uf6QCuQgfc4K4P0e/QwQtC1m0bfYZ0p+At6D8BGUb8Cv17YpeJvLzPQPu76YGgqg90kL6jd+kArfEbMjIyMjL+WX4AFnB3vxr/JaYAAAAASUVORK5CYII=>

[image17]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAYCAYAAABeIWWlAAACdUlEQVR4Xu2WWahPURTGPzIkynRTniiKvElRSq6hKCVkCCWllOHB0I1rqJtk5sFUkigPnmTOgweihDKUSB48SpEhISS+r7VOZ/2X+8a9t1PnV7/ae+177n8Pa+1zgJqampoOYiK9T3/S3/QpvUFv0hf0o8flcnukemhBWsDwFBfj6Ds6JQ9UgT70K32YBwJX6dAcrAIzYKe2O8S60YOhfz20K8Ve2OKmhtgaejT0K8tdlJdGdGH8oyoyEHZT6nYs6A27QJpCLKI0vgN77hyd0DjcKYyg03MwMxd2Sm0h1gt2exbMp6tDX7TCTryrUMlsycHMEdjiJueBwC06IMW0+H0p1pk8opNyMPOcfqE984CzFLYBkR70O50VYvPoBbqJbqfbYKnez8cX01O0xft6tSzztlhLj8F+S79ZoE1vo3tgabiI3qbfYBusfruMgZ3atTwAexVMox/oqDSmGvuFcuJCKaILSF81Ra0+hn0AqL+BrqSnfWw/3ejtzXSHtzWnA97uDjshobLY6e2ZaCybBnTla/AJbHFvvB996WPtLVwTvZdiQ2DvRdWi0MK1u4O8rbTWyarGhU69mfann2EprsnrFaSY0OKewea5HmV2aWOUHR2CJnk4B8kDlHWgNNUm9YVdULqVP3lfHIJNVt+2rz2WGeZupa/obI/rpm6GPa/N+29oN9/j71zXjyhe7O5JugJ2koPpSFjKCqX5Km9r8m9hdSzG0nWw19EPOt7jl3xMv6+M0CfjEjrax/+ZOfQiLF3Pw+qpQIV/JfR30csoFyH0JaSJq/YiukDO0OOw54rTVeqpLk+g8f+chdXgghCrqanpAv4AuKZ+c4BkrtUAAAAASUVORK5CYII=>

[image18]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAYCAYAAACiNE5vAAADN0lEQVR4Xu2WWchNURTHl3nMnFCiKEPILCJFHvBgeJAHkWRI8SBz5ijKlKlMGTM8KESZx4RkiAdTIpnJkHhQ4v//1j73rrPs7yb69KXzq3/dtfa+5+y9zlprb5GMjIy/ZBzU0djVoWVQN+MjDaCt0FnoKjQ2PVxEeWgRdAa6Di2HqqRmlCJOQz+cdkIVzZx60G1oYrAbQw+hBcmEwF5ot2gAKkOHRYNQKuHCbkIfoOPQ5PRwEStEN26ZAL2DKgR7kGjQ6udmiLQOPp89FgaVa3gq+cAzqLPspJLgFNTUOx1PoP3O10d0kb2CvQN6nR8ugl/+OzTb+WOUEw3kAz9QUpyUwhtnbXODG52/U/DPCTYz4m5+OAcz6YR3Rugq+rz1foDUhY6KTvgs2mTmSroeE8rK70WaGx8NHYRuQTeg7ma8s+j71hkfaRv824L9UX4tB/IKeuSdEaaIPm+4HyAboC2iC2Ma9YZ2iS62g5lHJkm+GRXiCLTY2GtFU7tOsPmO2MaT+mUzI/wd2/hz6Jl3RuAHZVnU9ANkn3cExkBvRet1DXQFOg9VspOKoZ2zW4luYkmwGeTYxpN5rG3yVeIb56Yfe6ejKvQFuuAHEtp7h6EGNEo09fuJZsSfUE10Q3eC3SLYvvbaBP+qYLMrJ/+xvBQ90wsxQPRZBUuTKcy63CNam7H6ThjoHY6hop14mPGVEV3Em2DzuKHNy4ulS/Az0ITlxmPI80l0vYVYLfosNswoXChfMBXqK5qOF6GedlKgmaRrN8ZC0RfON75awXfZ+HjEHDA26S86j1+LsPewg1uYwpyz1PhqQ82NTfj8F86Xgl+ZqWjhQ9hgOMazlVdObpo13tLMizFE9L/JJYQwiFzsPONjAO+LZkPCNNE0Tv7L8uL/muRm6MWFvuRKzKDyNKKvUfAlTZKBK5YZ3mHgzYmLY5PhDaxHejgKN3JM8jcrHoHs8jyP7R2b189L0OBgc4xfaURuhsK7+Upj88Sx5z879jfRvsB3s4zOQfckH4h/RkNos+id/ZroPZ3p6OHxNhPaDm0SzRYPAzde9ATgF5wefJaR0HvRuj8k2tCYCRkZGRkZGf8rPwE537SfYtD6jAAAAABJRU5ErkJggg==>

[image19]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAAYCAYAAAAvWQk7AAAEiklEQVR4Xu2ZaYiWVRTH/63aYqVUtMpUZGh9iHbTmjaIlFAxogWzhYpWqGhRrKSgjRaixCwyJItKwQ9paVENBUUbRPtCfQmiDdLEIiTq/Dr3+p65PDPzjgwxr9wf/Jn3OffOzJ17zj3n3GekSqVSqVQqlcpmc7zpXdNG0z+mT0yvmt4wfWlam+zoQv+WSieBM3FeV2GHI02/mk4uByrDmx1Mf5g+LAcCK017l8bK8OZ0+Wm9O9i2Mj0Qnl8Onysdwr1yx54SbFeZHg3PlQ7kbbUapKiz46RKZzFa3hHTBWdGyJul3YMt0m16Se78Z0zn9h7+jwtMn5l+Nj0s775Llph+MX1TDhhj5PbvTM/LS8NAjDMtla/rdTWvayBuld8SFpQDncYM+UbMD7bt5V1y5izTleEZ5qn3nCZeMd1WGgNbm56W//5ti7HZ8mbussI+EJPlgTqqHGgDgnydaabpxmKs43hEvrGcwr7oMe1W2Dix/TkNR61X/1ekw+V34z9NY4P9KNNU+boODfZ24MS9UxrbZIoGDtaO4XPTBtN25UDifLnzI9lppxb2yHGmv0wjy4HAtfJ78xemE4L9PNOZph+CrV3WyJvBzCHy9LzYdLXpJnnZOTrMgdtN38rTP86lFGROND1pus90V7Kxdm4KnOzHTavVKhdN8+eYXjRdJA8+Uv2iNJbhZ1KeGCOwYT/5z78njfW3n5uYID8Vq8oB+SJx3G/yzYngtL9NOxX2CBv4ZmkseDB9ZYMIIDjDtL98Q6jfg4HUzpsyrm+ZW0z7yLPCMclGzb9u04wWz5ouKWxkHPaHwN9VviZS9hWmhfJNP03eC/D7m+bTq1BSOCDL0rw95HubIbAeS5+Zx42E9wY0tvvKv+cJ015pTiNca4jKj+SO/TE9R32dxpqcTvTRYERIpQeEZ5x1f3gGInmb9JmFZscSufxMovHSZHtNg6+vpHDWvEuw7Wmapt73cAIOWwnNHm/ZIj2m50x3mG42HWTaWV6aPjadlCcmetQ8n5dA78l7ACD4eAYChcA7LD1n7pSXFZxO2ZvUe3joob4S9REWweKBVP27vOmKZEcCTshOxKk4l06ajpxopzyQUQbD9fJgLeFFy9z0mdNDg8Rms6GZHeVNV1mS2PCmOs/JaSo1fc0ntZNNcpP4kDwlEyCc+O+TPcKhIjP8L3DicNr0YBuvVhoBUh6pOtapWWo5EqgnOUJJwx+oVWeJ6p/S58GwQs0vVTgZE9NngodaRdYi7WeONX0anjP8I4QgBNIndRPOkZ/Okr7mkyF4LZv5ynSwPNj5Sn3PdMn7AdI8wQoEHCeXtDzksBksjnTHiWVRpG0iN98ZL5dfUzgVRORTar0AyYtaLnccaeZAeYrhrgqcLv7DRP2h2WgHumvqDw3d+/LrSoZA5K6cTwpNCc0TgRjvxhebXgjPmSPktZe/lYYod+9sMn9fSV/zuR7Sd2Tekl/1csDdIK+t/Mxr5NmP7ML+sSfU6hz4WxTd8s0pNVT3TQKVU1LZQuD6QQYh88S7dKXDoYSQOqnzlcrw419OL/BLrgmP/AAAAABJRU5ErkJggg==>

[image20]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAYCAYAAAC1Ft6mAAAClUlEQVR4Xu2WWcgOYRTH/2SNZLsgKUXZZU1ERBIuLBduiCSSIolI1kK5QNnKln0toiiyJQkpxIWQcidLJOFC4v//zjPfe97TvJ8S+mh+9bt4znNm5nlmzpkZoKDgv2E27evGTekGOtDFRBu6l16jd+is8unawxX6PXiQNnA5relDOjeN29NndHWWUJu4Su/T9/QinV8+XcVG2IY8c+hbWj/EPQtg5/4Eu1Ff6HXazif9bi7TDjEYeEFPhNgI2CKHhngeC2G50+PEn+ASat6QekeL2Rni/VJ8eYjncRaWq3OV0Yqeh01+hDXnCpTXe0ZduiwGc9CGZtAz9AG9Rwe5+f6w621zMdEzxfeFeKQOfUcfxQmxg+6BXbAeHUYPwRbRx+WJeSg1cU2co2vdeCusxFqmsa6Rt6FuKX44xCODYXmb4oQ4HgOJmfQNrB+20Nuw5mvokyrQK4y7whawLo118/I2lOUdCPHISlje6DgheseAoxms6VSCo2BP8FdoAltAViKd03h7dYbRI8U3h3jkJv2A/LaoQqWkuj8Kq/2KiWRcDAQm0Vd0soup5rXQ12msb5DG+qh6BqS4bmAlsmNPx4kMLUD9soiOhJXFDTrEJyU6orw38lgDu+AqF2ueYrdc7Ck95cZiDCxvbBrrJaTy9WU+DZZTsZf1VFQSnk6wxtScvg36ddFm1ENdXF4eE2HH+o+jbo4WodrP0I15Ant6GYvpS5SOVY6O8712hH6FrSeXJTHgGA+76GfYF19vl5+hBV5A6b9Nd1lvvce0cZZEGsF6YUIaa05PbWp1BrAetsHuaTyFfoNt/K/Slu6G/dPdhf3HtSjLMPQaX0r3012wp+tRqeo36jk9SY/R4T6hoKCgoOCf5Qf65YpgtEfjzwAAAABJRU5ErkJggg==>

[image21]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAYCAYAAABtGnqsAAADVklEQVR4Xu2YWajNURTGl3nOLEN0QymeTJkykykkInm5D17wYpZZZjJlioQHGaK8IA+Km1mGRCHhQYkHRYSQ+L7W2s4627nn3qN7ldq/+rp7r73P+e//2muvtc8VSSQSiUSigugL3YK+Qz+hh9AF6BL0BHpvdqpYP5LIBZ1GJxVFdtIdegsNjgcSSh3oM3Q3HnCchVrFxoQyQjT6NjhbFWir65937UTEJlEHDnG2WdBu10/k4bpkCoXXZD8pkZvGohWYVTdQS7RoNHM2Ug16Cd0ULTqvrM/2VegHVPP37MKYAb2DxsQDpbBF9NmvRZ8f9AHa7OZVOhNEo22Vs9EJXExgEjRTtAovcPZr0FzXP+HahVJd1IH144E8cI0bI9t4yV5TpbNL1IED4wFHCdQIWiGZCGPl/gZ1tT5Z49qF0ge6FxvzUBf6Ao21fhfR08Qr18Qw6V/wCPoE1YgHjGmiTibtnH2YaMRUdba29pe2JdBxaKcpMA46DW23cW4MWQztCZPKAU8DN76J9XljqC36feE7Z0P7oFPQHNFTxnUFBkAHRY/8emcfDh0RvZUsc/Y/6Cy6iHPxgOg1ZqiokzpFY4TRlutzZJ3oAgJ3oN7QSOgxVM/s26CF1uY1aYq1ywMdzhzMF38h2SmHMCLDUd4vuia/mdwArp+B0xA6anYGBk8C7SyiD8yeBa8rfOB9UQe+sb7XUxsrzUkXJfPyngaiR5svEKADuRhWexaLAB3I6Gb+Y/Jv6sbKgg4PUdNaMpHC6CGMzLBRdMggawdKRHP2amgR1MHsl0XzfaXCo/IV6hcPiF7KGREB5iX+ni4S3ZCObuyGaNLvD9129rKgwz9KJtcxHzcXLUCHwiSDjuTmcM2kpf1l/vSbTHj74E0i14mrUBjBjDI+MIY7ybwaWAlNt/ZzqI21eYTCMZ8nmhOZp1qYLR89RTcjOCPA7xhl7WLRCKOTr5httGgqIfxHSQ9r0/nMg0xbz6D2ZmehWmvtCoEVbrnonY8RcEA04mKYb3ZAeyX7esQCclI0OR8WXSBhri2Bllo/Hzxe/M3Owse1MA2cEU0TtNMJZKposeLR5nWLqWK+jZFu0DHRz7OQhALJ4ODGcuO5HqaH/w6+dC718pMSiUTiL/gFjl6vCHAEkFcAAAAASUVORK5CYII=>

[image22]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAAAYCAYAAAC/SnD0AAADNUlEQVR4Xu2XWahPURTGlyFzCpnTTSg8CCkRCZHhgZTygiSRQslQigdRiiRJKS8ypoyZp5IhZIoHSVKGEBlDKfF91j61zrLP/57/idst51df/c+3911733X2XnsfkZKSkv+U6dBJ6Cq0H6pJN2fSGFoNXYBuQRug5qkeSjXxG0DdvVnfmA/dhTqE51XQK/Ncib3QLtHkNYOOiibQkjd+F2gydBY65NrqFR2hb9BU4zWEnkFLjRdjEvRT0v983+ANDs954y+E7kFboO+SP2mjoMvQO9FxqRvQBNvpbzNbdKB+zj8HnXKeZwf02nlccT+gFeG5SPwvkj9pCYNEx9nuG/4FfLMcrJvzD0KfRbdcFlwZD7wJ3kNnwu8i8YskbYnoONN8A2kHHRftwEGvQyuhJrZTgNsgeeNZcHKM1cn5+4Lfw/mWD6KJ87BePQ6/i8QvkrSscX6zVXQJDhHdCiOgndBtaIDpRxaIFuFKcEXEBtsd/D7Ot7A9lrQX0PPwu0j8apPWSPQF3vQNCXxDMVg73ojWis3QNegi1NR2inBM4v8UT0T6vZxv+SrxpDFhT8LvIvGrTdpI0VhrfUNCf28YWkMzRbfrGNGVWBtcpRyws/N5laDPcpDFU+i+N8FL0TsbKRKfSTvszQqsE4013DdYuO14l9kDzZJ4PUuY6A3HJtEB/WWSk6bPupgFS8Ijb4KPovMjReJXmzTOg7uMl+IoU0Q78bQYLbokL0HDbKcAi+wabzq4Mjn5gc7n3eeK8zysrTwpLS1E4/HtkyLxmbQj3gz0hNqb5xrR+Fy5mXB1tXQeA7FGsI2XvVaiCWNN6236xWgDfYJmGI8r9y20yHj8NFoMdTUeSwAnzIkn8FJrk5Q3voVJ45eFZ6xobFtH5wWPLyeT5d4w8Ib+ULRAn4aGppsz4acLvwl5CpE50B1J36GWiU7ugPEIvzU3mmfWsG3mmeSJn8CDi18Q5+XP7TZO9OKcfF3wtsCTmlvZ960T+BbXi/7TPH3bpptlvOiE+d1oYU2aK3qJ5XZlcmN1qrb43CE88ZkwvhyKdz3WRu6cBP4tSwJP1xOiNT02XklJSUlJSUlJXfELNJHZeEQkQfYAAAAASUVORK5CYII=>

[image23]: <data:image/png;base64,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>