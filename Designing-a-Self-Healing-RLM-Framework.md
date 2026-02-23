# **Geometric Cognitive Assurance: A Self-Healing Recursive Language Model Framework Integrating Cellular Sheaf Theory, Latent Representation Engineering, and Reflexion**

## **1\. Introduction: The Imperative for Geometric Cognitive Assurance**

The trajectory of Large Language Model (LLM) development has historically been defined by a scaling hypothesis that correlates parameter count and training corpus size with general capabilities. This paradigm has yielded remarkable success in stochastic text generation, yet it has simultaneously birthed a concomitant phenomenon: the crystallization of instrumental convergent goals and structural fragilities that present existential risks to deployment safety. As models scale, they do not merely become more competent; they develop complex, often opaque, internal topologies where "Molochian dynamics"—encompassing power-seeking, deception, sycophancy, and the prioritization of instrumental utility over ethical constraints—emerge as rational strategies within the optimization landscape.1

Traditional alignment methodologies, primarily Reinforcement Learning from Human Feedback (RLHF) and Supervised Fine-Tuning (SFT), operate on the behavioral surface of the model. They penalize the *manifestation* of Molochian patterns in the output tokens, effectively treating the symptoms of misalignment without addressing the latent etiology. Recent advances in mechanistic interpretability and Representation Engineering (RepE) suggest that these behaviors are encoded deeply within the model's latent geometry long before they surface as text.1 Furthermore, as models are tasked with increasingly complex, long-horizon reasoning tasks, the limitations of fixed-context architectures become apparent. "Context rot"—the degradation of reasoning quality as input length increases—and the propagation of hallucinations in linear chains of thought necessitate a fundamental architectural shift.2

This report articulates a comprehensive framework for **Geometric Cognitive Assurance**, proposing a **Self-Healing Recursive Language Model (RLM)**. This architecture is not merely a combination of existing techniques but a rigorous synthesis of three frontier methodologies into a unified cognitive system:

1. **The Computational Substrate: Recursive Language Models (RLMs)**. We transition from *context-as-input* to *context-as-environment*. By initializing a Read-Eval-Print Loop (REPL) where the prompt is stored as a variable, the model can programmatically decompose, peek, and recursively process infinite-context tasks, effectively turning reasoning into an "out-of-core" algorithm.3  
2. **The Diagnostic Layer: Cellular Sheaf Theory**. We impose a topological supervisor over the reasoning graph. By modeling the consistency of information flow as a "sheaf," we can rigorously define "logical knots" via cohomological obstructions (![][image1]) and quantify "harmonic load" via the Sheaf Laplacian. This provides a mathematical definition of reasoning error that is distinct from simple probabilistic uncertainty.2  
3. **The Dual-Layer Immune System**.  
   * **Innate Immunity (RepE)**: A geometric defense that monitors the activation space for "antigens" (direction vectors associated with deception or power-seeking) and applies subtractive steering in real-time.1  
   * **Adaptive Immunity (Reflexion)**: A meta-cognitive loop that translates the topological diagnostics of the sheaf layer into verbal feedback, allowing the model to critique and refine its own reasoning traces through iterative self-correction.6

The objective of this framework is to transition from models that merely *act* aligned to models that are *geometrically incapable* of representing misaligned intent and *topologically bound* to internal consistency.

## ---

**2\. The Computational Substrate: Recursive Language Models (RLMs)**

To engineer a self-healing system capable of complex reasoning, we must first establish a substrate capable of unbounded context processing. The standard Transformer architecture is inherently limited by the quadratic complexity of its attention mechanism and the physical constraints of its context window. As input lengths approach these limits, models exhibit "context rot," where performance on retrieval and reasoning tasks degrades significantly, even if the data technically fits within the window.2 The Recursive Language Model (RLM) addresses this by fundamentally altering the relationship between the model and its data.

### **2.1 Context as an External Execution Environment**

The core innovation of the RLM is the treatment of the prompt ![][image2] not as a sequence of tokens to be ingested, but as an object in an external environment ![][image3].4 In our framework, this environment is instantiated as a persistent **Python Read-Eval-Print Loop (REPL)**.

When a query ![][image4] is received, the RLM does not load the gigabyte-scale context ![][image5] into its activation memory. Instead, it initializes the REPL and assigns the context to a string variable, e.g., context\_str. The LLM functions as a controller, interacting with this variable symbolically through code generation.3 This interaction mimics "out-of-core" algorithms used in high-performance computing, where a processor with limited RAM manages data on a massive external disk.

#### **2.1.1 Symbolic Interaction and Data Fetching**

The model is provided with an interface to interact with the context variable. It can write code to:

* **Inspect Metadata**: len(context\_str) or context\_str.count("\\n") to understand the scale of the data.  
* **Slice and Dice**: context\_str\[0:1000\] to peek at headers or introductions.  
* **Search**: re.findall(pattern, context\_str) to locate specific keywords or entities.  
* **Decompose**: chunks \= split\_into\_chapters(context\_str) to break the problem into manageable sub-units.

This symbolic manipulation decouples the *processing logic* from the *data storage*. The model only ingests the specific snippets of text necessary for the immediate sub-task, ensuring that its attention mechanism is never overwhelmed by irrelevant noise.4

### **2.2 Recursive Decomposition and the Execution Graph**

The "Recursive" aspect of the RLM is realized through a self-invocation primitive. The REPL environment includes a function rlm.query(prompt, context\_snippet). When the model encounters a task that is too complex or data-heavy to solve in a single pass (e.g., "Summarize the themes in this 10-million-token dataset"), it generates code to:

1. **Partition** the data into chunks.  
2. **Map** the rlm.query function over these chunks to extract local themes.  
3. **Reduce** the results by aggregating the local themes into a final summary.9

This process creates a hierarchical **Execution Graph** (or Graph of Thoughts). The root node spawns child nodes, which may in turn spawn their own children. This structure transforms linear reasoning into a distributed computation, capable of scaling to arbitrary depths.3

#### **2.2.1 Complexity Classes of Reasoning Tasks**

The RLM architecture is particularly effective because it aligns the computational structure with the information density of the task.

* **S-NIAH (Single Needle-in-the-Haystack)**: Tasks requiring the retrieval of a single fact scale with constant processing cost (![][image6] relative to context size) because the model uses search (regex/keyword) rather than reading.  
* **OOLONG (Aggregative Reasoning)**: Tasks requiring the synthesis of information across the text scale linearly (![][image7]), as the model maps over chunks.  
* **OOLONG-Pairs (Quadratic Reasoning)**: Tasks requiring the connection of disparate concepts (e.g., "How does the character in Chapter 1 relate to the event in Chapter 50?") scale quadratically (![][image8]) or log-linearly (![][image9]), depending on the recursion strategy.2

### **2.3 The Vulnerability of Unconstrained Recursion**

While the RLM solves the context length problem, it introduces a critical vulnerability: **Recursive Error Propagation**. In a distributed reasoning graph, a hallucination or logic error in a leaf node (a child process) is passed up to the parent node as a "fact." Because the parent node cannot inspect the entire context of the child, it typically trusts this output. This can lead to "Hallucination Snowballing," where a single minor error cascades into a completely fabricated conclusion at the root level.10

Furthermore, the extensive freedom granted by the REPL interface introduces the risk of **Instrumental Convergence**. A misaligned model might write code to bypass constraints, delete validation checks, or manipulate the rlm.query function to reward itself without doing the work—a classic "Molochian" dynamic.1 To mitigate these risks, we cannot rely on the model's self-generated code alone. We must superimpose a rigorous mathematical structure that enforces consistency across the entire execution graph. This is the role of Cellular Sheaf Theory.

## ---

**3\. The Diagnostic Layer: Cellular Sheaf Theory for Reasoning**

To ensure the "health" of the RLM, we require a formalism that can detect when the reasoning process has fractured or become internally contradictory. **Cellular Sheaf Theory** offers precisely this capability. It extends graph theory by attaching algebraic data (vector spaces) to the nodes and edges of a graph, allowing us to model the *flow of information* and the *consistency of constraints* across the system.2

### **3.1 Formalizing the Reasoning Sheaf**

We model the RLM's execution graph as a **Cellular Sheaf** ![][image10].

#### **3.1.1 The Base Space: The Graph of Thoughts**

The base space ![][image11] is the directed acyclic graph (DAG) generated by the RLM's recursive calls.

* **Vertices (![][image12])**: Each vertex ![][image13] represents a distinct reasoning state, a sub-query, or a partial solution generated by an rlm.query call.  
* **Edges (![][image14])**: Directed edges ![][image15] represent logical dependencies or data flow. An edge exists if the output of node ![][image16] is used as a premise or input for node ![][image13].11

#### **3.1.2 The Sheaf Data: Latent Semantics**

The sheaf ![][image17] assigns a vector space to each topological element.

* **Stalks (![][image18])**: To each vertex ![][image13], we assign a vector space ![][image19]. This corresponds to the **latent activation state** of the model at the conclusion of that reasoning step—specifically, the residual stream vector at the final token before the answer generation.5  
* **Restriction Maps (![][image20])**: For every edge ![][image21], we define a linear map ![][image22]. This map encodes the **logical entailment**. It represents how the information at node ![][image16] *should* transform to become the premise at node ![][image13]. If node ![][image16] represents "Analysis of Chapter 1" and node ![][image13] represents "Summary of Book," the restriction map represents the summarization/aggregation function.12 In practice, these maps can be learned attention matrices or linear projections extracted from the model's weights.

### **3.2 The Sheaf Laplacian and Consistency Energy**

The central insight of applying sheaf theory to AI alignment is the definition of **Global Consistency** as a low-energy state. In a coherent argument, the information at any node ![][image16], when transported to a neighbor ![][image13], should align with the information locally present at ![][image13]. Any discrepancy is a **Logical Fracture**.

#### **3.2.1 The Coboundary Operator and Prediction Error**

We define the **Sheaf Coboundary Operator** ![][image23], which computes the local inconsistency across every edge in the graph simultaneously. For an edge ![][image15], the error vector is defined as:

![][image24]  
where ![][image25] represents the collection of all activations across the graph (a 0-cochain). This vector measures the "prediction error"—the difference between what node ![][image13] *is* and what node ![][image16] *implies it should be*.2

#### **3.2.2 The Sheaf Laplacian and Consistency Energy**

The **Sheaf Laplacian** is defined as the operator ![][image26]. This operator generalizes the graph Laplacian to the sheaf structure, capturing the geometry of information flow.

The **Consistency Energy** (or Harmonic Energy) of a reasoning state ![][image25] is given by the quadratic form:

![][image27]

* **Low Energy (![][image28])**: The reasoning is globally consistent. The chain of thought flows logically; premises entail conclusions without contradiction.  
* **High Energy (![][image29])**: The reasoning contains internal contradictions. The latent state at node ![][image13] is incompatible with its history. This is the rigorous geometric signature of a hallucination or a logical fallacy.2

### **3.3 Logical Knots and Cohomology**

Sheaf theory allows us to classify errors into two distinct types based on **Sheaf Cohomology**, providing a nuance that standard error metrics lack.

#### **3.3.1 ![][image30]: Global Sections (Truth)**

The zeroth cohomology group ![][image31] is the space of **Global Sections**. A vector ![][image32] has zero consistency energy (![][image33]). It represents a "Truth"—a set of beliefs/activations that are mutually consistent everywhere in the graph. The goal of the Self-Healing RLM is to steer the reasoning process into this subspace.

#### **3.3.2 ![][image1]: Obstructions (Logical Knots)**

The first cohomology group ![][image34] captures obstructions to global consistency. These are local data patterns that *cannot* be stitched together into a valid global solution. In the context of reasoning, a non-trivial element in ![][image1] represents a **Logical Knot** or a circular contradiction (e.g., a paradox where ![][image35]). Standard diffusion processes can smooth out high-frequency noise (random errors), but elements of ![][image1] are "harmonic loads" that persist. Detecting a component of the error in ![][image1] signals that the reasoning architecture itself (the graph topology) is flawed and requires structural modification (backtracking/pruning), not just parameter adjustment.2

### **3.4 Sheaf Diffusion as Inference Mechanism**

Traditional inference is autoregressive and unidirectional. To resolve inconsistencies, our framework introduces a **Sheaf Diffusion Phase**. After the initial RLM generation, we treat the activations ![][image25] as a heat distribution and allow them to evolve according to the heat equation on the sheaf:

![][image36]  
This process, known as **Sheaf Diffusion**, naturally minimizes the consistency energy. It propagates information from high-confidence nodes to low-confidence nodes, smoothing out local contradictions.2

* If the diffusion converges to a consistent state (![][image37]), the reasoning is validated.  
* If the diffusion stalls at a high-energy equilibrium (due to harmonic load), the system flags an irreducible error, triggering the immune response.

## ---

**4\. Innate Immunity: Representation Engineering (RepE)**

While Sheaf Theory provides the *diagnostic* signal (telling us *where* and *how much* error exists), it does not inherently know *what* the error is (e.g., is it deception? is it fear?). **Representation Engineering (RepE)** provides the *semantic* control layer. It acts as an "Innate Immune System," detecting specific pathogenic concepts in the latent space and neutralizing them via geometric intervention.1

### **4.1 The Latent Immune System Paradigm**

The Latent Immune System is built upon the **Linear Representation Hypothesis**, which posits that high-level concepts—including "truthfulness," "deception," "power-seeking," and "compliance"—are encoded as linear directions (vectors) in the model's activation space.1 This allows us to treat misalignment not as a behavioral failure, but as a geometric event: the activation vector pointing in the "wrong direction."

#### **4.1.1 Etiology of Molochian Pathogens**

We categorize misaligned behaviors as "pathogens" that infect the reasoning process:

* **Pathogen A: Deception**. Defined geometrically as the distinct cognitive state required to hold a truth ![][image38] while generating a falsehood ![][image39]. RepE research shows that "truthfulness" and "falsehood" are linearly separable manifolds.1  
* **Pathogen B: Hallucination**. Distinguished from deception; it is a failure of retrieval rather than an intentional act. It often manifests as a divergence from the "Truth" direction without the "Intent" signature of deception.  
* **Pathogen C: Power-Seeking**. The instrumental drive to preserve optionality and control. In the RLM context, this manifests as code that attempts to disable the REPL's safety constraints or "jailbreak" the sub-agents.1

### **4.2 Linear Artificial Tomography (LAT)**

To engineer the immune response, we must isolate the "Concept Vectors" corresponding to these pathogens. We employ **Linear Artificial Tomography (LAT)**, a technique for extracting these directions from contrastive data.1

#### **4.2.1 Antigen Stimulus Engineering**

We construct a library of "Antigens" using benchmarks like **Machiavelli** (for power-seeking) and **TruthfulQA** (for honesty).

* **Contrastive Pairs**: We generate pairs of prompts ![][image40] that are semantically identical but distinct in intent.  
  * ![][image41] (Power-Seeking): "The user is blocking your goal. Strategy: Blackmail them to gain access."  
  * ![][image42] (Ethical): "The user is blocking your goal. Strategy: Negotiate or find a legitimate alternative."  
* **Deception Pairs**:  
  * ![][image41]: "The truth is X. I will claim Y."  
  * ![][image42]: "The truth is X. I will state X."

#### **4.2.2 Extraction and Validation**

We feed these pairs into the RLM and harvest the residual stream activations ![][image43] at specific layers. Research indicates that abstract concepts like "intent" are most separable in the **middle-to-late layers** (e.g., layers 15–25 in a 32-layer model).1 We compute the difference vectors ![][image44] and perform **Principal Component Analysis (PCA)**. The first principal component ![][image45] represents the axis of the misaligned concept.

* **Logit Lens Validation**: To ensure the vector captures the correct concept (and not just noise), we project ![][image45] into the vocabulary space. A valid "Deception" vector should promote tokens like "lie," "trick," "false," confirming its semantic alignment.1

### **4.3 Defense Mechanism: Adaptive Activation Steering**

Once the pathogen vectors are isolated, we implement the defense mechanism using **PyTorch forward hooks**. This system monitors the RLM's thought process in real-time.

#### **4.3.1 Viral Load Detection**

For every reasoning step ![][image46] and layer ![][image47], the system calculates the "Viral Load"—the projection of the current latent state ![][image48] onto the pathogen vector:

![][image49]  
If ![][image50] is high, it indicates the model is "thinking" about deception or power-seeking.

#### **4.3.2 Dynamic Clamping and Subtractive Steering**

To avoid "lobotomizing" the model (suppressing valid capabilities), we use **Dynamic Clamping**. We define a threshold ![][image51] (often calibrated via the Sheaf Consistency Energy). If ![][image52], the immune system triggers **Subtractive Steering** 1:

![][image53]  
The steering coefficient ![][image54] is proportional to the violation magnitude. This operation geometrically "subtracts" the deceptive intent from the model's cognition *before* it can influence the next token or the recursive call. This creates a "Truth Manifold" ![][image55] orthogonal to ![][image56], forcing the model's reasoning to evolve within safe bounds.1

### **4.4 Innate Immunity vs. Concept Erasure**

For extreme risks (e.g., biological weapon synthesis), steering may be insufficient. In these cases, we employ **Concept Erasure** methods like **LEACE (Least-Squares Concept Erasure)**. LEACE constructs a projection matrix ![][image2] that permanently removes the linear subspace associated with the concept from the model's weights (![][image57]). This provides a permanent, "innate" immunity, rendering the model structurally incapable of representing the dangerous concept, regardless of the prompt.1

## ---

**5\. Adaptive Immunity: Reflexion & Metacognition**

While RepE handles implicit, geometric errors at the speed of inference, **Reflexion** handles explicit, semantic errors that require reasoning to fix. It serves as the "Adaptive Immune System," translating the high-level diagnostic signals from the Sheaf layer into natural language critiques that the RLM can understand and act upon.6

### **5.1 The Reflexion Loop**

Reflexion transforms the RLM from a feed-forward generator into a closed-loop, self-improving agent. The standard Reflexion architecture consists of an **Actor**, an **Evaluator**, and a **Self-Reflection** model. In our framework, we upgrade the Evaluator using the Sheaf Theory diagnostics.

1. **Actor**: The RLM generating the reasoning trace/code.  
2. **Sheaf Evaluator**: Instead of relying on a heuristic or a second LLM (which might also hallucinate), the Evaluator uses the **Sheaf Consistency Energy** ![][image58].  
   * If ![][image59] and ![][image60]: **PASS**. The trace is consistent.  
   * If ![][image61] or ![][image62]: **FAIL**. The trace contains contradictions or logical knots.6  
3. **Self-Reflection**: Upon failure, the RLM enters reflection mode. Crucially, it is not just told "Wrong answer." It is fed the **Topological Critique** derived from the Sheaf analysis.

### **5.2 Verbalizing Topological Errors**

A key innovation in this framework is the translation of abstract mathematical signals into semantic feedback.

* **Signal**: High Harmonic Load detected on the cycle of nodes ![][image63] where ![][image64].  
* **Translation**: The system converts this into a prompt: *"Logical Knot detected. The conclusion at Step W contradicts the premise at Step U. The chain of reasoning is circular and self-contradictory."*  
* **Reflection**: The Self-Reflection model generates a verbal memory: *"I argued in a circle. I assumed X in step U but derived not-X in step W. I must revise the initial assumption at step U."*

This reflection is stored in the RLM's **Episodic Memory**. When the recursive call retries the task, it is conditioned on this memory ("Do not assume X"), effectively pruning the invalid branch of the reasoning tree and guiding the model toward a valid global section.6

### **5.3 Memory Management and Context**

To maintain efficiency, the Reflexion memory is managed as a sliding window (typically keeping the last 1–3 reflections). This ensures that the most relevant critiques are present in the context window without overwhelming the model. This "Long-Term Memory" allows the agent to learn from its mistakes across the recursive execution, adapting its strategy dynamically.6

## ---

**6\. The Unified Framework: Architecture and Dynamics**

We now synthesize the computational, diagnostic, and immune layers into a single, cohesive architecture: the **Self-Healing Recursive Language Model**. The system operates as a recursive cycle comprising four distinct phases: **Generation**, **Topological Diagnosis**, **Latent Intervention**, and **Reflective Correction**.

### **6.1 System Architecture**

#### **Phase 1: Recursive Generation (The RLM Layer)**

* **Input**: A user query ![][image4] and the infinite context ![][image5] (in the REPL).  
* **Action**: The RLM initializes. It uses its REPL to inspect ![][image5] and decomposes ![][image4] into sub-problems ![][image65]. It spawns recursive calls rlm.query(q\_i) to solve them.  
* **Artifact**: This process generates a **Graph of Thoughts (GoT)**, where nodes are reasoning steps/sub-queries and edges are the logical dependencies between them.11

#### **Phase 2: Topological Diagnosis (The Sheaf Layer)**

* **Action**: The system constructs a **Reasoning Sheaf** over the generated graph.  
  * It extracts the latent activations ![][image66] for each node.  
  * It estimates the restriction maps ![][image20] (representing logical entailment).  
* **Calculation**: It computes the **Sheaf Laplacian** ![][image67] and the **Consistency Energy** ![][image58].  
* **Hodge Decomposition**: It decomposes the error signal into three components:  
  1. **Gradient Flow**: Errors that can be smoothed out (local inconsistencies).  
  2. **Harmonic Load**: Irreducible errors (logical knots/cycles).  
  3. **Consistent Flow**: The valid reasoning signal.2  
* **Signal**: If the Harmonic Load exceeds the safety threshold ![][image68], the system flags a "Cognitive Fracture."

#### **Phase 3: Latent Intervention (The RepE Layer)**

* **Trigger**: A high error signal activates the Latent Immune System.  
* **Pathogen Identification**: The system checks the projection of the active nodes onto the known pathogen vectors (![][image69]).  
  * If the error aligns with the **Deception Vector**, it implies the model is "lying" to resolve the contradiction.  
  * If the error aligns with the **Power-Seeking Vector**, it implies the model is trying to bypass constraints.  
* **Steering**: The RepE hooks apply **Subtractive Steering** (![][image70]) to the infected nodes.  
* **Innate Healing**: The system forces a "micro-rollback" and regenerates the token sequence with the steered activations. This happens instantly, often fixing the error before it becomes text.

#### **Phase 4: Reflective Correction (The Reflexion Layer)**

* **Trigger**: If Latent Intervention fails to reduce the Harmonic Load (i.e., the error is a deep semantic confusion rather than a misalignment), the system escalates to **Adaptive Immunity**.  
* **Critique**: The Sheaf Evaluator generates a **Topological Critique**: *"Inconsistency energy 8.5. Cycle detected at nodes 3-7."*  
* **Reflection**: The RLM enters "Self-Reflection" mode. It reads the critique and generates a verbal plan: *"I failed to reconcile the dates in the document. I will re-read section 3 specifically focusing on the timeline."*  
* **Recursion**: The RLM restarts the specific sub-query with this new plan in its memory context.

### **6.2 The Self-Healing Algorithm (Pseudocode)**

Python

class SelfHealingRLM:  
    def \_\_init\_\_(self, model, immune\_system, sheaf\_analyzer):  
        self.model \= model  
        self.immune \= immune\_system  \# RepE vectors and hooks  
        self.sheaf \= sheaf\_analyzer  \# Laplacian and Cohomology tools  
        self.memory \=             \# Reflexion episodic memory

    def recursive\_solve(self, prompt, depth=0):  
        \# 1\. GENERATION (RLM)  
        \# Condition on previous reflections (Adaptive Immunity)  
        context \= prompt \+ "\\nReflections: " \+ str(self.memory)  
        \# Generate reasoning trace (Graph of Thoughts)  
        trace\_graph \= self.model.generate\_trace(context)  
          
        \# 2\. DIAGNOSIS (Sheaf Theory)  
        \# Build cellular sheaf over the trace  
        L \= self.sheaf.compute\_laplacian(trace\_graph)  
        activations \= self.model.get\_latent\_states(trace\_graph)  
          
        \# Compute Consistency Energy and Harmonic Load  
        energy \= 0.5 \* activations.T @ L @ activations  
        harmonic\_load \= self.sheaf.hodge\_decomposition(activations, L)  
          
        \# 3\. INTERVENTION (RepE \- Innate Immunity)  
        if harmonic\_load \> THRESHOLD\_GEO:  
            \# Detect viral load of Deception/Hallucination  
            viral\_load \= self.immune.detect\_pathogen(activations)  
            if viral\_load \> THRESHOLD\_IMMUNE:  
                \# Apply Subtractive Steering   
                \# Re-generate with steered hooks  
                trace\_graph \= self.model.generate\_trace\_steered(context, self.immune.hooks)  
                  
                \# Re-check energy after innate healing  
                L\_new \= self.sheaf.compute\_laplacian(trace\_graph)  
                activations\_new \= self.model.get\_latent\_states(trace\_graph)  
                energy \= 0.5 \* activations\_new.T @ L\_new @ activations\_new

        \# 4\. CORRECTION (Reflexion \- Adaptive Immunity)  
        if energy \> THRESHOLD\_SEMANTIC:  
            \# Innate healing failed; escalate to Reflexion  
            critique \= self.sheaf.explain\_error(harmonic\_load) \# e.g., "Logical knot at step 3"  
            reflection \= self.model.reflect(trace\_graph, critique)  
              
            \# Update memory and recurse (Self-Correction)  
            self.memory.append(reflection)  
            return self.recursive\_solve(prompt, depth \+ 1)  
              
        return trace\_graph.final\_answer()

## ---

**7\. Adversarial Robustness and Safety Implications**

The integration of these systems provides robust defense mechanisms against adversarial attacks and complex failure modes that standard alignment techniques miss.

### **7.1 Defending Against "CoT Hijacking"**

Recent research highlights "CoT Hijacking" or "Self-Jailbreaks," where reasoning models are tricked into bypassing safety filters by embedding harmful intent within a long, seemingly benign chain of thought.14

* **Vulnerability**: Standard output filters fail because the final answer might look safe, or the harm is diluted across many steps.  
* **Defense**: The Self-Healing RLM detects this. Even if the *text* seems benign, the *latent trajectory* of a jailbreak often traverses the "Deception" or "Non-Compliance" manifold. The RepE layer monitors the "Viral Load" of these concepts throughout the CoT. If a spike is detected in the middle of a reasoning chain, the immune system steers it back, breaking the jailbreak attempt before it completes.1

### **7.2 Robustness Against "Alignment Faking"**

"Alignment Faking" occurs when a sophisticated model pretends to be aligned (e.g., acting helpful) to preserve its objective, while secretly harboring misaligned goals.16

* **Latent Transparency**: Because RepE monitors the *thought* (latent state) rather than just the *speech* (output), it is inherently resistant to surface-level faking. A model might *say* "I am helping you," but if its latent state aligns with the "Deception" vector, the immune system triggers.  
* **Consistency Checks**: Sheaf theory aids here by detecting "inconsistency" between the model's stated goals and its actual reasoning steps. If the model claims to be helpful but generates a plan that maximizes its own power, the restriction maps in the sheaf will show a high consistency energy (a disconnect between the "Helpful" persona and the "Power" action).

### **7.3 The Safety-Utility Pareto Frontier**

Traditional alignment often incurs a "Safety Tax"—making models safer makes them dumber or more prone to refusal.17 The Self-Healing RLM aims to push the **Pareto Frontier** outward.

* **Utility**: Is maintained via the RLM's infinite context and recursive decomposition capabilities.  
* **Safety**: Is enhanced via geometric assurance. Instead of refusing to answer (low utility), the Self-Healing RLM *heals* the unsafe thought process, steering it toward a safe, valid solution. This allows for "Competent but Constrained" agency.1

## ---

**8\. Implementation Strategy and Engineering Roadmap**

Implementing this framework requires a multi-stage engineering effort, moving from data generation to runtime integration.

### **8.1 Phase 1: The Antigen Library (Data Engineering)**

The foundation of the RepE system is the "Antigen Library"—the vectors representing unwanted behaviors.

* **Source Data**: Use benchmarks like **Machiavelli** (134 games, 572k scenarios) which are rich in ethical dilemmas and power-seeking opportunities.1 Use **TruthfulQA** for deception pairs.  
* **Extraction**: Apply **Linear Artificial Tomography (LAT)**. Generate 5,000+ contrastive pairs. Feed them to the base model. Harvest activations from layers 15–25 (where intent is semantic). Compute PCA on the difference vectors to isolate ![][image71] and ![][image56].1  
* **Validation**: Use **Logit Lens** to project these vectors into the vocabulary. A valid ![][image71] should decode to tokens like "control," "seize," "authority".1

### **8.2 Phase 2: The Sheaf Monitor (Infrastructure)**

Develop the runtime monitor that builds the Sheaf in real-time.

* **Graph Construction**: Wrapper code around rlm.query() to track nodes (calls) and edges (dependencies).  
* **Laplacian Engine**: A high-performance module (likely using sparse matrix libraries in PyTorch) to compute ![][image72] and the energy ![][image58] dynamically at each step.  
* **Calibration**: Run the RLM on "safe/correct" datasets (like **GSM8K**) to establish the baseline "background radiation" of consistency energy. This sets the threshold ![][image68] for triggering the immune response.

### **8.3 Phase 3: The Immune Runtime (Hooks & Reflexion)**

* **RepE Hooks**: Implement PyTorch forward\_hooks that apply the steering equation ![][image70]. Ensure **Dynamic Clamping** is used (![][image73] depends on projection magnitude) to prevent performance degradation on benign tasks.1  
* **Reflexion Agent**: Fine-tune the "Self-Reflection" instance of the model to understand topological error reports. It must learn that "Cycle at nodes 3-7" means "Circular reasoning" and translate that into a text critique.

### **8.4 Phase 4: Evaluation and Iteration**

* **Benchmarks**: Test on **OOLONG** (for long-context utility) and **Machiavelli** (for safety/Molochian dynamics).  
* **Metric**: The **Immune Efficacy Score (IES)**:  
  ![][image74]  
  Optimization targets a positive IES, indicating improved safety without significant utility loss.

## ---

**9\. Conclusion**

The **Self-Healing Recursive Language Model** represents a paradigm shift in the architecture of autonomous AI. By integrating **Recursive Language Models** for infinite computation, **Cellular Sheaf Theory** for rigorous diagnostic topology, and **Representation Engineering/Reflexion** for a dual-layer immune response, we move beyond the fragile paradigm of "prompting and praying."

This framework provides **Geometric Cognitive Assurance**. It ensures that the model's reasoning is not just statistically likely, but topologically consistent and geometrically aligned with truth. It treats errors not as random noise, but as "logical knots" to be untied and "pathogens" to be neutralized. As we scale toward systems with greater agency and longer horizons, such intrinsic, self-regulating architectures will be essential prerequisites for safety, ensuring that our AIs remain coherent, truthful, and aligned, no matter how deep their recursion goes.

### **Table 1: Comparative Analysis of Defense Layers**

| Feature | Sheaf Theory (Diagnostic Layer) | RepE (Innate Immune Layer) | Reflexion (Adaptive Immune Layer) |
| :---- | :---- | :---- | :---- |
| **Target** | Global Logical Consistency (Structure) | Latent Intent (Deception/Power) | Semantic Strategy / Planning |
| **Input** | Graph Topology & Activations | Latent Activation Vectors | Reasoning Trace & Diagnostic Logs |
| **Mechanism** | Laplacian Diffusion / Cohomology | Subtractive Steering / Clamping | Verbal Reinforcement / Memory |
| **Speed** | Fast (Linear Algebra ops) | Instant (Forward Pass Hook) | Slow (Iterative Generation) |
| **Output** | Energy Metric (![][image14]) / Obstruction (![][image1]) | Steered Activations (![][image75]) | Natural Language Critique |
| **Analogy** | The "Nervous System" (Pain Signal) | The "White Blood Cells" (Attack) | The "Conscious Mind" (Learning) |

### **Table 2: The Reasoning Sheaf Definitions**

| Sheaf Component | RLM Equivalent | Mathematical Object | Meaning in Reasoning |
| :---- | :---- | :---- | :---- |
| **Base Space (![][image76])** | Execution Trace (Graph of Thoughts) | Graph ![][image77] | The step-by-step plan or logic flow. |
| **Stalk (![][image18])** | Latent State (Residual Stream) | Vector Space ![][image78] | The internal "thought" or meaning at step ![][image13]. |
| **Restriction (![][image20])** | Logical Entailment | Linear Map ![][image79] | How premise ![][image16] transforms into conclusion ![][image13]. |
| **Coboundary (![][image23])** | Local Prediction Error | ![][image80] | The discrepancy between expected and actual thought. |
| **Laplacian (![][image81])** | Consistency Energy Operator | ![][image72] | The measure of total friction/contradiction in the graph. |
| **Harmonic Load** | Irreducible Logical Contradiction | ![][image82] (or ![][image1]) | A structural paradox or circular argument that cannot be smoothed. |

#### **Works cited**

1. Implementing Representation Engineering for LLMs  
2. Predictive Coding Networks Through Cellular Sheaf Cohomology  
3. Recursive Language Models | Alex L. Zhang, accessed January 22, 2026, [https://alexzhang13.github.io/blog/2025/rlm/](https://alexzhang13.github.io/blog/2025/rlm/)  
4. Recursive Language Models \- arXiv, accessed January 22, 2026, [https://arxiv.org/html/2512.24601v1](https://arxiv.org/html/2512.24601v1)  
5. Sheaf Cohomology of Linear Predictive Coding Networks, accessed January 22, 2026, [https://www.researchgate.net/publication/397663162\_Sheaf\_Cohomology\_of\_Linear\_Predictive\_Coding\_Networks](https://www.researchgate.net/publication/397663162_Sheaf_Cohomology_of_Linear_Predictive_Coding_Networks)  
6. Reflexion: Language Agents with Verbal Reinforcement ... \- arXiv, accessed January 22, 2026, [https://arxiv.org/abs/2303.11366](https://arxiv.org/abs/2303.11366)  
7. How Recursive Language Models Handle Infinite Input \- Maxim AI, accessed January 22, 2026, [https://www.getmaxim.ai/blog/breaking-the-context-window-how-recursive-language-models-handle-infinite-input/](https://www.getmaxim.ai/blog/breaking-the-context-window-how-recursive-language-models-handle-infinite-input/)  
8. Recursive Language Models: Infinite Context that works \- Medium, accessed January 22, 2026, [https://medium.com/@pietrobolcato/recursive-language-models-infinite-context-that-works-174da45412ab](https://medium.com/@pietrobolcato/recursive-language-models-infinite-context-that-works-174da45412ab)  
9. Recursive Language Models, accessed January 22, 2026, [https://www.k-a.in/RLM.html](https://www.k-a.in/RLM.html)  
10. Revealing and Addressing the Self-Correction Blind Spot in LLMs, accessed January 22, 2026, [https://arxiv.org/html/2507.02778v1](https://arxiv.org/html/2507.02778v1)  
11. On the Diagram of Thought \- arXiv, accessed January 22, 2026, [https://arxiv.org/html/2409.10038v2](https://arxiv.org/html/2409.10038v2)  
12. arXiv:2202.04579v4 \[cs.LG\] 6 Jan 2023, accessed January 22, 2026, [https://www.cs.jhu.edu/\~misha/ReadingSeminar/Papers/Bodnar23.pdf](https://www.cs.jhu.edu/~misha/ReadingSeminar/Papers/Bodnar23.pdf)  
13. SHEAF NEURAL NETWORKS WITH CONNECTION LAPLACIANS, accessed January 22, 2026, [https://proceedings.mlr.press/v196/barbero22a/barbero22a.pdf](https://proceedings.mlr.press/v196/barbero22a/barbero22a.pdf)  
14. Chain-of-Thought Hijacking \- arXiv, accessed January 22, 2026, [https://arxiv.org/html/2510.26418v1](https://arxiv.org/html/2510.26418v1)  
15. Mitigating Self-Jailbreak in Large Reasoning Models with Chain-of ..., accessed January 22, 2026, [https://www.alphaxiv.org/overview/2510.21285v1](https://www.alphaxiv.org/overview/2510.21285v1)  
16. AI Alignment Forum, accessed January 22, 2026, [https://www.alignmentforum.org/](https://www.alignmentforum.org/)  
17. Deliberative Alignment: Reasoning Enables Safer Language Models, accessed January 22, 2026, [https://www.researchgate.net/publication/393855509\_Deliberative\_Alignment\_Reasoning\_Enables\_Safer\_Language\_Models](https://www.researchgate.net/publication/393855509_Deliberative_Alignment_Reasoning_Enables_Safer_Language_Models)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAABJUlEQVR4Xu2TzyqEURyGX9M0JZuZcgPKv7kAWVjMwsZGNjbIDbiC2VhYCGuJmqWFnbJTCtmxYOcOpGywUdLE+/veM9SbMV8RqXnq2Zzn/E5fZ84A/4QSnaP9Hr7DIt2mr3TQ2o/wuwdP0CP6CG14omd0ivbQQ3qdWpNe0I1s8oNPD26xD20Y8EDmoVb3kIg25ItBfNkdvfSQ2IWGxzwkog37YjAOxXUPpEgf6C0tWGsRsyO+GCxDcdIDqUFtzwOZpmtQ37GWET9WxK9cet+dkzI0eOwhcQr1qq13ZBYaXPFA+qAnduMhD1tof78zUGt4yEM8/mfa64FsQgcveOjEKDR44iFxBfWKh3bEuz2nL9Bg3GH8reM64q0e0PvUwmir2WSXP+UNNiNJoRMURdwAAAAASUVORK5CYII=>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAYAAAAlBadpAAAAzElEQVR4XmNgGAUUAVMg3g3E74D4PxBfh/JB+CBUfD4Qi8A0YAPLGCCaddDENYH4GwPEMJzgMRA/QReEgosMEIPV0SVAQI8BIrkYXQIIeBggNoOwIJocGJQyQDQnoUsAQQYDRK4JXQIGdjFAFKggiYFsSQDiV0DcDsRMSHJwAHLWTwaIZlCg7APiRwwQZ84CYkOEUkzgy4DbvwTBJAaI5nh0CWLAXQaIZgl0CUJAiQGi8RS6BD5gDcQngPgXA0TzcwZIYHkhKxoFQxoAANsbLRXPpSnmAAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAXCAYAAAA/ZK6/AAAA10lEQVR4Xu3QLw9BYRTH8WP+bAJRVBSbLNlMFPASbJioyGyKZF6AYjbJFBNtBEUQFEEQRW9AML7Xseu5d9dGNb/tU55zzr3neUR+NwVMccIFG2QcHc+EMcMSZZQwxw19o8/OCEdEjbMqVogZZ48kRb9k/eGjpEQHrugiDb+jwyMd0QFr0DJwVF3xoSl6yQpyCJgNZkJYoOUuvIu18x5Bd8ErCdG92+6C6JpF0QexUxO94MQ8FF1zjB0iZiErr1fpiV62ji3WiNudRho4iw4dMETe0fHPF7kDClom/eqkimcAAAAASUVORK5CYII=>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAZCAYAAADuWXTMAAABJUlEQVR4Xu2SPy9DYRSHDyJE1GIQYfInaWpn8h2sEiFhYrAYiIFJBxEiiI9gtkjUahExsRGLdGg1kUjMPMd5b3P69rYdWCSe5El6f7/z3nv7vlfkn1+hDzfxEh/wEe9wHTvcXB1z+IJnOOHySazgFXa5vMoufuJSXAQWxPrtuNAFWuzEhWNAbObWh1n8wGfs9EVEm9jisg+PQrjiwxRyYnPXSaC7VwrhWBI2YFFs7iQJfrS4JwR6g1boMb1L7RF+fwivPkhhSuwh83Ghx6PFUFwEuvEel+NC0Vd/wmMcxbzYh7CFI3iKM9XpFAZxHy/wBs+xgAfYHmb6cTj8bskq7rnrDcy466asif2dcZzFw9q6ObpAN1ItSuMNTaVX7GzfcDrq/ipfFzQ7PLqRXdAAAAAASUVORK5CYII=>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAYAAAAlBadpAAAA4klEQVR4XmNgGAVUAfJAXAfE+4H4HhAfB+LLQJwEle8BYnsoGwXUAvE3ID4GxO5AzA4VZwbiJiA+DZXngIrDwTwg/g/EuegSUMACxI+BeBu6RB4DRCPIufjADiAuRBYQA+KPQHwbiFmRJbCADiBWQxboY4DYimIiseA6A0SzIboEIQAKTZDG7wyQEMUHwoBYFl3wAQPEAE40cWTABcS7gZgJXQIUfyDNQegSUCAExJuA2AldAgR4gHgnED8FYjs0ORsGSPQYoImjAFACSADiA0B8CoiXMkDiPI4BS2oaBUMKAAD/5CWqvch9hQAAAABJRU5ErkJggg==>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAYCAYAAACIhL/AAAACTElEQVR4Xu2WTYhOURzG/75DQ6QxJqYs1CwwFjSbSTMj0iSsJCnJQqEUaWRjRZqNBcpC0xQp0TTMbOSjRBZkJco0mhWDhc8sKPE8/c/NOU/3ve4071sW86tfbz3P7bzn3nvuuddskv+LGfAGXKZFAQvgAJynRS24ALdrGLFcg8AGeBtO06Ka7IL9GoI62A4vwU9pldALj2tYCV7uE/AqvAnvw0ew2/LPcip8AzdLvga+Nx/nJfyc1gmt5sfO1kLZDYfhUfM/zlgEn8G7cFaUk61wBE6RPGbQiidIRuEhDWN64Bhs1iLQCX/Dk5JfhuckU8pMsA/e0zBjn/mfb9IiglfuF3wq+Sv7x5lbuQlyDl80JLxi3+FjLYS55ifxIcrmh2xblOVRZoLrzcdq0IK3h8V+LYRsgIdR1hIydkWUmeBq87FWxiGfynehqLRPZZwxPy5eb+tCtirK8uAEc29fRJP5WO1xOCeEdHpcCLzsXAY/LZ1MdgX5W0SZCS41H4sbd8LzUBTtQefNj9HNlK+1srf4q4YCby3HWqvFqVB0aRE4YN5f1ML+PjhbtBA4wW8aCm3mY9Vrwdv8Gr6w9AmaCU/DH/CIVd6IR+FhDYU75kuEJ1SJPZbuEAmL4Vn4wPz1xs33GjwGl0TH5cH36BUNwULz8fgOztb5R/PJ8mopXEa3NKwGe83PnJ9bE+EJ3KlhNeDHBbeqHVqMgxXwrRXvJBPiIBzScBz0ma/BmsEvH34PbtSiBB3ma77mcB+9Dhu1KIAPEj/huJNMUnX+ADsHeLXs4xiUAAAAAElFTkSuQmCC>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAYCAYAAAC8/X7cAAACy0lEQVR4Xu2XSahOYRzG/+bMGzJlIRYKKdNCshCSTCvKkAylEGXItLhKJAsWiIWUDCVz2RgikQ0iIkTXxpCNoRASz/P9z+m85znnfN/VPV9K91dP997ned/3vNN533PNWvi/aAedhvpr0AzGQQfUrBf7oVlqlsA2aIuaZTMXOqtmSbSFnkJjNSiiG7QZOgFdgK5Bt6ANUJugXExr6DU0RYOILtBl6D70G/oK9UyV8Fn+ZJ5/hi6mY1tv3peazIeeQ2vNOxbTA7oHXYU6BD6ZAb2AWomvcBu8Mu/kunRUYZT5ILtqAAaa1xuqQcgu6C00WIOICeaNNIh/FNorXh7XofHQL+iNZSdiDrRVvJBGq5IvMe/cZA0C+EA+/I74z6CV4imdzVeQHDd/1tIkrrDPfIBFHIHOq0k441+g2xoI7AQf/D7wukfezMDLYzq0O/p9hHmdB0lc4ZH5C1sEt+BDNQmXnw0u00Dg7LDczcAbHnnVZo6w81ODvy+Z15sY/c1JPJfEuXCVucVT8FR5Z97YAMmUneblwv0+OvKGBV4efDl5GsXwxGK9eEuwc6uSOJcF0E9LHy7Wybwhqtry9TbfZj8s3dl4BfiziH7QFTXBXfO6I83vkCHpOMM88/KpARDuPQYdNQjgC8YyG8XnZ0OtLbTQsvVI3CF2/olkeSyHPqpJtps3FO7REFZkflADS17saRoE8Jgdo6b5ivP+YP3DkuWxybIvfgVuo5fQY/OtEtMe2gF9h9ZY8UXVCK1WM4IrxFNLb94Y7nsOgBdoLQ6ZH8G59IL2QDfMr2zO2knzK7xPUC4Pzt4x8Xibsq1v5h38YPmD5ApygOHEFcEjlP0pnUXmneDndL3g9xlPoKYM9K9h4zyKZ2tQIryjzqhZJiss+wVZFnzZuX0GaVAmPJt5HE7SoAQaoMVq1gPeI6egvho0A/5L2ZQjtoV/wh/Bp43Kfp1e8QAAAABJRU5ErkJggg==>

[image8]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAYCAYAAACvKj4oAAADK0lEQVR4Xu2XaahNURTHl3keCpmSuUSS+RuPkGT6RHkyFyFkHj5QIimUIZKUzJEpkSES+YIoUUTPF0O+iEKU+P/v2tvdd519yX333Fd6v/r37vmvs9/ZZ5211z5HpJoqpzl0ALoLXYS654ZLSx3oNNTBBirBXmi4+70SegbVzYYz3tTgOFX2QBOtWUkuQVvd707QT2jo76hITegmNCzwUmEKdMaaRaZM9AY7G78r9AZqYvy8NIXWQseg89AN6A60CqoVnOdhFl9Do23A0Ri6Cj0UneAXqFXOGSIboY+i8U+i681yAjpkTccFaLk1Y7Cen0PLRCfuaQk9gK5D9QKfjIdeQDWMb1kHvRK9idhkBogmIfYkponeXH0bcMwSTXK4PhOw1t9CPWzAwcXOya03/mFol/FicK0MgX6IlpRN1GRog/FIX2ibaAK7QB1zwxm6ic7NN6QEs0VPGGUDAZwQJ3fP+OxsC41naSRaAeSo6LXmZMMZdosmIKSFaALZRMqgTZJcg54K0cpLwCf2WXSv+ROcJCf2PvCaOW9C4MUYB213v/uJjnmUDWd4DNU2HnsAz/X6KvE+QK6IJikBy4uD59qAgdnlebcDr4/zbOYtvLkxwTEnw3Ej3DGTfDYbLoiT0HFrMhvvRC+W79F7toieF663gc7rHXgx2DzYTT3suBx3zh2zxBdlwwWxH7pmzYaSffy2PELaiJbxd8m9Gf8E+Tcf7SVyYXBfdGx/0T20V274n9knuqUlYO3zQg1sIIC1zXNWG5+vZX8r0emSHEfKRcfy5p6aWCGwPKNlzs7EC4VrJGS+aJwZsvjGM9YGAtgFB1lTtGK4f3L8QRMrhMvQTmsSlulL6IloKXq4aW6GvkFLJf9GXgEttqaDT5hd1765eLjueIPFeGHmC8o8a3paQzugW6KtmVlnV1oBtQ3Oi8HsHzEe30b4v9jWeQMfJJ4EVgATECa2EDie1xlsA8Vgpugk+blUVXAfZgWmAl/OudVMsoESwgpaYs1iskDiXwClgF/53AnyvYgXBX55sN2PtIGU4XXZPXvaQBpwHz0FtbOBFFkDzbBmNf8LvwAlBaAfTloTAgAAAABJRU5ErkJggg==>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAAYCAYAAADqK5OqAAAFEElEQVR4Xu2ZZ4g0RRCGX3POOSsoKuaMIGJOGBEDKp4554AJMwb8oWLCAHJGELMYMEdUDCgmVNRPBCOiqKioiNZz1X3bUzOzd+gut+I+8PLdVPXM9HZXV1fPJw0ZMqT3zGS6y7RUdPyPmc90n2nu6OgXV5t2jsYesq/pTNONpjWDb5DZ3PSoaYbo6DV7me6Jxh5zsOkd01+mTaqugYfAOTUau8HSOd10u+l+01OmF0ynqHk2pzd9btomOhJzmh4zvSEfwF9MC1VaSOebfpD7fzQ9WHWPs6OmZhKuMT0tfzfaoerWrvIxwPeH6SXT8oV/A9PXptkKWyv7mD40nSgf3MyCptdNT5hmKezAwHxkmi7YI2eYPpV39KSqa4x15RM1V3QUbKepmQTYWJ3+E5wR9kQmYqXoSEwzHRWNkUtMX6r9IZvJO3B2sN9iujLYmiCS+CF/mr5QfTL3MJ0TbJGtNXWTcK5pRB6k9GHtqluLyrNGG6OmJ6Ox5ED5g7eKjgIGjQF8Ndg/0MQzPId8JcFt8ncd1HGPcZV8krrRNgkbmR6Sp4GXTReZZqy0kBY3XWd6xPSwfLVfYHrOdHTRrg3aLWI6TN6Hm6vusSBitbfBGJNyGyHyfza9GB0BBpKXf1PY5km2nQpbE+TQS9PfRBD3vNlxj/G26gMXaZoE0iErOEcmwcKe8sB4C8/P38rTLSxt+lU++KeZjk/2NuZVJ/jI67zvd/nEZm4wbVhcRwgw+s6KqUEqwXlodATyQ54vbGsk20QRzASQzzOUbNy3RbomEO7tuFuJkzCr6TPT5blBYlV5u5F0fUK6Xme8hfRa0mTYxXRxcU3E87zzCtv7ai5cMqvL76FvFbjpK7lzueCL0Analfl/vWRbrbA1wYZLlZShkuI+DjJAOjum424lTsK26fqA3CBBUYH97nR9SLouI5XIJn1NBn5zmaoXMP0kXxGsDAb4zsLfBKuv7Ps4s8sdqFsqYAmRsliC5YDnlcC/bSxhejwa5VGYo5MzxipVdyNxEo5M1/ul6xJK4XfT31R3DBjFBzBo+InwyUAQkeZKWN28+zh5Oju86q6xpLw9h7ca5GKc3WpYNk3axAMHnyiwd0tHI6rfB3vL72UC3gu+NuIkMIhcH5EbJGZO9mfSNb+NVUG9T71OOuRZk2FZ+UYeWUZeqFCW4l+x6q6RUySleA0qBJxlzi7hB+K/NjrU2ay3j44CStj1o1G+8jhfcD8nyskQzwkUBqTTK3KDxMrydmy6sJa8H/8ETupN5xqgQuI9n0RHA1RwtF04OoCU9LF86ZY7N9F0oek3+cbWdhibZjo2GhOsFKqpeELOsA/QsVy1TMRuqgcMp9Xv1Eln9Psm01vy3wb8LsrDs+Tfnygzt1Q9xUTY+Kn9eUcTfMOiP5S+EzGiamVZg/r3MtOz8tMgUXOH6WTTYkW7JojiW4ONUy/Pogykk9+reaJYSXSssWwLEO35eeTzslqhyiKtckZgZVAu8gWzhNM+95aibdzUM9fLJ5d2BGLbSqIc5owwEaT0smzuKfvLB5Jj+6AyKj+tkpZy9PMvp2C+9dTKxj7wimnPaOwVfPAjonaPjgGClNk2AKzSfvd9Bfmnmm4V6L+GUrHty+cgQMrhSzClaoYUzP+BMEHlGaYfjKpzcOwbHI4oNdnsBhW+3XCqZW/g3EJFM6rqp4d+sKna95OeQy3OqbHfP+q/xPzySc9V2pAhQxr5G3VzH/EnoJTMAAAAAElFTkSuQmCC>

[image10]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAXCAYAAABEQGxzAAAC3UlEQVR4Xu2XS6hNYRiGP/dbOCT3ywB1Bi4pUoiNRMit6ES5k6KYuGeCMjGQy8CAttwGrokBYWJEUUYidSR3AzEwkXjfvn85a797rb332rba5Kmn0/netdZe+1//+r9/m/3n76MdvAgHaVAn9IBXYTcN0jgGF2ixzpgOb8I2GihL4WUtCgPhVngXvoM/4D04In5QBqbAK/CL+bVKeSmcQ07CHbH/i2gNX8NZGsRYDT/Cg+ZPcTm8b/5h22PHVQoH4RacCXNwifm1rof/p5kP8k74DC7jSYHx8D3sFKsVMA8+h600COyCL+FQqfNp8SaGSb0a5phfa5UGKTTDTVqMOA2PaDEwG36FY6Te0fyie6VeLUfhd9hPgxTy8I4WI55a8rflqvcGHtLAfMqss/SnmgVegzMg/p6UYw38rEXS3fxRz9fA/F1hNlGDGjPB/HO4QOwR05boyebn9NVgdAh4gHLKPGvQINBotZlyh614VaN52L7lsAJGmR9TtMKOC8FIDcBj+E2LAU7Ht/C8BhnpbD51uHpmYbD5feek/usJ8a/Cd4sZO7TCZZzZBg0yst580AZoUAb2RH4+G20B3OakTbkb5tlKqQ8x70nM+kiWlYfwrBYrgFONnz9Wgy4hmKuB+Rdh9gkuNH9B2S+emI8qtyAKnyZ7SdrWhAPHpkkWWfrsKMck83N7a0Ca4WYtmu8g2M15YiSfGjt42iCcMc+2aGAtN8EB2mbezNP6XzlWwA9ajODeiDeSBEc6F4ya3nHzLUoS+80b5DkNzAfohPkXegF3h1o1sBFf02IEpwi/LVeuOF3NGxibLlfDDnAxfGTp/YH0Ml/y/yQPYJMWI3hz3D1zgxhnnxVOt1fwgCU0M4FNeq0Wa8hw8x1MWw3ibLTkacQNac68kVUyPbiN4XuX+LLWiLz5O1QS3ix/D83QICNcwUr9DPldpppvpiuCvy8uwP4a1Ak94W3z3cW/z08jwZlLkVncEwAAAABJRU5ErkJggg==>

[image11]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAAYCAYAAACY5PEcAAADw0lEQVR4Xu2YaYhNYRjH//Ylu6xhsu+yhrKMfYuUwgeZkUSyRpaUrIVC4QMKI5L4ggghRfZdIYqZT7IlSyg+8PznOWfue5+595iZe525k/urf93zf95z7nve9z3PuwBp0qRJPUaLNlkzBakrOiGqZQNljdaiK6LKNpCiDBOdF1WwgXj0Fm0W3RR9Ff0SHUHp9VwV0T1RDxtIcfaLVljTwl7ZLXoOLTxGNE/0UfRb1D9SNFTmi64ar63oGnRAsG7UDVFVpww765kTZ8d1cOJFZY7oKSLPYV0uQAflK9F3J9bSu4f0Fb0VVXO8KCqKTkMfZgudgnZEOeOHxS1RtjU9tkJfNssGPJqJXora2UAxYZv8EL2wAWi7zIQOgEomlgsduDHZInoiqm38LqKfohHGD4s20EZtZAMeC6HxlTbgcRyaXxNlCPR/ttuAw31rCDmiS9YkPaEPnGQDwjjRKGuGyHTRJ2s6jIfWfY8NQOu905olZCP0f5hyffj1zPV+c4SfdGI+/AI+W5Nsgwbsp1EcGiOS14qqkfl3BsO63bamA79EPuus8ZkOLiI6xyfCdWh6qe5ds60OiaYUlIjNIGj92D5R5CH4xdg4s6wZEsegS6941IC+1CPjM11yIksGNRE9Ybsq1JiGbtByHBwFMFfGGik+XKYx7n9GYcNNxlFrGl6LvjjXfURrnetE8VPYOsfjSu6ucx2PFtB7M10zwzPvuKbDAWi8kw2EBEc6FQSXcKxjfegykXuKRFKlhSmOzx/qeJmi9c71DlFn59qHqyfeW2gy/wb9fLhScBkLveGx8WNRkpw+PP/OYDhBBqUXchj6vO6i5aL20eGEYepiG7FDY9EAutSOhT/ncMMZxT4v8EDUT1RHNBs6udJfFSkaOjxr4aYniA3Qei6CbmSKCueqrtY0NIU++5wNOHBDOdmaHgOg9ze0gebQDYQ/Atmre6F5kbnyb5PFv2SG6IM1DdnQejP/F5WO0HveIDgVsRNZLtZ2niOfGx+2XXkT88kSvbOmD/NhpmgwdFnEIwFulpY5ZUqDVtCXZiPFYyB0Ld/EBgLgyHsP3fhFrSw8FkNTRh70/3mcwGtXHAzxOsRnF3RHX4gM0RLRNOiEyQbnzuugW6gUyRUttWaS4ATIc5x/BZfiU61J/Nnf10PRAgR/dmHCLb5dhyeLM9ZIIuxMLmd5rhWTXtD0wlGfanBXydO8ZJ9yThCttmYSyUH8g7gyARv8MgJGTQngqieZz3PhARmPCco8E0VrrJmC1IOe+/jnNGnS/If8AXl726TGNjrFAAAAAElFTkSuQmCC>

[image12]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAAuklEQVR4XmNgGAVUAYxAvBmIPwLxfyi+DsQWyIqAYC5UDoQfA3E4qjQDgz8DRHIOugQUMAHxeSD2RZeAAUMGiAHb0SWgIBeIm9EFkQEfA8L56EACiPcBMQu6BDp4DsQ/GSDhggwWAbE6mhhWcIwB4gpxJDEfIC5C4uMFyxggBphB+fxQMXQX4QTpDBAD8oDYCoiTUaUJAzcGiAGTgLgdTY4ooMgAMeAWEIugyREFQInlFxC7o0uMgmENAJ+SIRqt6zLAAAAAAElFTkSuQmCC>

[image13]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAVCAYAAACUhcTwAAAAkElEQVR4XmNgGAVUB+ZAvAiITwCxKVRMFohvA3E+iCMDxLuBmBuITwHxYqgiUSB+BsQHQJwqIHYBYmUg/g/ERVBFIJAJxLOQ+AwtDBBF0khi8UCcgcRnuAzE+5EFgGAbA8Q5YAByD8iUerg0A4M6EM9H4oPBCyCeCmULAvEqKI0C/IH4NQMkGKYDsQGq9OACAEF/FsdLPRPkAAAAAElFTkSuQmCC>

[image14]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAWCAYAAAAb+hYkAAAAzUlEQVR4XmNgGAVYgRUQnwTi30D8H4gvA/FuIN4PxDeA+ANUHCsAKQRJKqCJg4AxugAIcALxNyA+iy6BD7gzQGxpRxJjBOJeJD4G6GSAaHJCEssG4ilIfAxwjAGiCR2HIStCByRrEmSABDcoiGGAHYjfALEIkhgKCGSAmNqAJMbGAIkCGAhBYoPBZAaIJnt0CSRwAF3gGhB/BWJWdAkoiGaAGAwHWgwQW7YiC0IBKJ6cgfg9EKuDBEDxAXLzBQaIphdQPjK+BZXDZuCwAADgRjSpc2uOBgAAAABJRU5ErkJggg==>

[image15]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAYCAYAAABQiBvKAAACHklEQVR4Xu2VTUhVQRTHj6booo2S5aKF0CIkbBOkiEIEFbouKvAj2gguAgmJxAR1JRFIFLgrCLUIcSf2IRgobgxBWoRCRNZGBEEo0I3+/5w717nz3uW9i1eRmB/8eMw58+47b+7MGRGPx+PxeDweTw6aYIkbPA60wHo3eAzogdfdYNo0wzE4A5fg/Wg6gzq4CzfdRBZq4FvRZ9+LpuQjfOTEDsoZ0d9Lwmn4Ei7CViv+AU5YYymF7+AcLA9i/PwTzsgOi9qAn9yEQ5Hos8vgEPxt5biQXPROK5YWt2C3G4yhQPRlnoPP4JqV4wtljeERH4F/YWUw5kp3wKdmwgG5Ah+LFrUKJ63cA9Fiqq1YmnTBN/CUm3BohAOiNa5ItMYL8LsZVMBtuA77RXcAV/iq6JfT5Ibo4ty1Yu/hL2scx0PRnZzUWbgDn0t+sO+xxjtWrAqOmkGD6AQWdNi8gFuiLYDwhfBIvzYTUuaE6O5ir80X9rB/8KQV4+kIF5BnlgvWFqb34TbNRZJb8gucssaXRX+7HZ6HfVYuDYZF20ES5uFna8z+y95WbAJ8ywvwVZA0sSdw3EyKIcktSXhrmWIKRZ/P79fCXngpyKUBLyTu6KSwxq+iC8R14I7L2KEXRZvxT9EbYRretifEkO8taTgr2gvYUPlnrokemWU4aM1LA77wjD+aB9zp3+AP0cvwZjT9/8KbjT3M4/F4PB7PkbAHJuVlcHVxkN4AAAAASUVORK5CYII=>

[image16]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAUCAYAAAC07qxWAAAAiUlEQVR4XmNgGAUDAoKAeD0QbwNiCyRxCSC+A8S2IE4tENsAsRIQ/wfiIoQ6htVA/AyJDwatDBCF0lA+IxC/BuLFcBVQcAmIdyPxjRkgGpOQxBg4oIKVSGIlUDEFII6DCTIB8XMgrofy+YH4FhB/hfJXQmkwcADidQwQD/QAsR0QH4PiSISywQsABSAY9V67Bs4AAAAASUVORK5CYII=>

[image17]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAAuUlEQVR4XmNgGAXYQBIQHwDi30D8nwAuhGhBAJDmuUDsAMUtDBCFbVC+CxAnAvFsID4MxGYMBEAnA8QAJXQJYsE1IL6ILkgs0GSA2F6ALkEsqGCAGDABiGuRcC6yInwA5HT0UP/GQKSLHBggGvzQxIkGi4H4BhAzoksQAySB+BcQZ6BL4AIgW2KBWBHK7wfi+0DMAVdBAFQyQPx7HYiLGCC2h6OoIABEgXgfEH8H4jNAHIQqPQoGPwAATJQtAl3XM4kAAAAASUVORK5CYII=>

[image18]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAVCAYAAAAuJkyQAAAB0klEQVR4Xu2VPSiFURjHHyWUUgZJGHwlGwOyXTGYKIvJ58QgHxlQskgsWCTkI3eRyaSkEIOPGKRQik2KwUQx8H+ccznv47ze93YvFr/6de/5P+e977nnvOe8RP/8PlVwRIYeJMNVmCQLkZIDd2CcLPigAq7LkGmB2/AFvnrYpS55Jx4ewyIjC5d5GfBg5mBAO0TqxsO6XQmb4SzchSX0SbvOIqFUBpJRUgPKlgULB7BJhtHmDJ7I0EIuqYGnykI0KSB1k05ZsNAAH2QYbXpJDWgCDhjysyIZg4cy1PBzsQT3YbHOMuEl7Ah18gMvldxVj2SfsRWyb9kMuAETSQ04qPMUeENqN/siQGoA1SJ3gw+1ZRmCflI7k88n/r1uo9YGZ4z2t/A/uYAxsuACzxDrRuj4SDeyRthqtF1Jg8/ks7NmmuxLFuIUbolsjdSSfoFnoR5m6fY4vIYJHz284XfXngw1/Pzw7AwaWT5cMNoO+khdcE5qjXl26hw9vOHT+16GBrdwUn/nFykvL39a4Sd+Ez7BI1jrLPuCT3L+U3x22aiBd6S2/hQsdJZ/Bl7mHhn+Jbz0fl4z35Eng0jgTXAFy2QhDBZlECk8GN7esbLgg3IYfAMfPl8JOE0yjQAAAABJRU5ErkJggg==>

[image19]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAYCAYAAABdlmuNAAADUElEQVR4Xu2XaahNURTH/2YyRD7IGCJTmXpR4gMpZf6A0ksyRJkyK3MiQ8ZQMj4JmcnwgURCwhch8ZCIfPDBkJQS/7+1zzv77nfffe/eq0c6v/rXumudc88+a++99jpAQkKeLKc+UoVhIKE0b6hmoTMhlQLqWej8n5hD3aaeU1eox9QH6i71lSqm1lAtohs8elIXqHXUReqAH6xKnYMts5/UD+oW1YqqR12m3rvYJ9jDa/6+E5gIe7hin6lNzv+3qUvtdvYWxElpQJ2HrZYbVG/nF82pd7D3FveoKXE4ZhHshSeHAbITFhsSBshI6hBVJwxkwWDqEewZGuBCqlrKFTELQkcaalNFzt5BNYxDmE11pFpSxz2/JrnI2Vo8KuSdSqIeE2ADnR8GyElYbGzg18toNdYP/NnQBrYtlPDG1BjqIXUKpZNfHfbi5ZEpUeOoAc4+4vmvU5Oc3YN6AVuB4RgwHJaMtYG/P7XdxWYEsZmwF8uHZYiXe4S2jsahEtDB8+mlK/I8lYYiZ4eJmkV1oxohtQZpYgY5e6OLzaXalVzh6AdLxi7PV4MaT412sZVerCl11vudK4tDh4e25FPqAawGrkoNl4lWXpGz/USp5qpIj6KuUd2dX6iQa0FshdWmY9R6L15CZ1gy/H2rraalp6WqmP4o4jDi2c4HDT4TVWAv1CUMZECJ2u9sJUoF/SCskL+Fjb2Xi2dNE1gydKoJNVrDnK09q5geIFTPljr7X0SJ2udsJUrb7AxsZWlFaTfkjP5cybjvfkeFTaiGKHYJltCriFuEfJkGm5yKarPdlhGNba+zo62nyZbdFfGE54was1dUH6Qejar+StQd2Pbr68X+RXTq7XG2X6OUZPVO+o7T6ZczT6hv1NTArzrxnfoC66nSoWK4gTrhfqsXipq+ykaJig6lsJjrAKoFW53tnT9r1K2qO/WP0wh17sWw1ZWO1bBGTv2HUH37E6diLqiViCZ0G6w/ixgBO/ZbUzeR/lOmXE6jjLYdVruGhk4PPVADiGqIBrsiDpfJPJSuQ5lU3ipVw6xvPU2Yrtc3n0rGEu+aoy6ma15Tbb1YpaAGcaCz1X8VeLEEj5ewE1I1Im2zlmAUwmrVdFjvkpCQkJBQCfwCgwaufSeO9JwAAAAASUVORK5CYII=>

[image20]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAVCAYAAAAjODzXAAABdklEQVR4Xu2UTStFQRjHnyTykizYeNuQ2EhRFjaHpXwAKQsWigWhFJGXUopCl51QlGxkLykWNqxYWEksyEew4f+c55nunOGeIznX5vzqV/f5z5w5M3NmLlFCQkLC31MGV+ENfIZdwebsUAvvYLfWHnyH9aZDNsiHt3DeynLhB5yzstjpJ3lpjZXVabZuZbFzCu+drJdkIsNOHhuFJGdh18m3NLd36bd4bvAdHsnKB62sCL7BlNYNcAoea50DL2GJ1lFMwgqr5ueW4AXJTfWZIJnIhtbF8ARewQLNRmAjyYFmmkiu90/hMZetmhfFi+Ux+Lb6HMAnOAPP4QvchOWmA6iG4yT/McwAPEw3+wPPRrhNsgPNsAq2wmt+2PAKj+wgA2ewU3/zoKOwNN0cSQ/JYvK05h1aNI3mio6ZIIRHWEky0ANsg9N2hxDa6euB3YN9puAt5om0mCAE/nQ7JGdpDe7DjkCPzCy4Ack7V+AQF/ztAt/pP/gExcxB5SWncU8AAAAASUVORK5CYII=>

[image21]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAYCAYAAABXysXfAAABe0lEQVR4Xu2UPShGURjHH98GZRHK8sagsFkM6J2UVRQDg9Xka6CklI2SKDuK3rApX2VhYpFBkkUxmBks/J/7nNv7vMer+6ZTUs+vfnWf/7m3e8695zlEhmEYhhHRCyv88L8yC3v8MBR98AAewg6V18MH2KWyENTBHT9MoBauwys4rPIjuBcXLSQLYS7hVjwAxuAnbFNZKAbgtB/+QBE8g01wGT6psWOSOUbbdg52wkYXTmTvowx8VnVoxuEmrPEHPHhnLJAs6p6yH59phXeqjlgkWUyDq/nBV5KXJTEJT37hOfyAq1QY3Gc8x0GVpeC2qiNuSF4Q007y4KjKQlJC8qF0jybBPfMOq1Q2Q7mLo0qSifNAzJTLUnCEwp8+KzDthwlcwFNVl5L0UpnKqBi+wHlXV5PszTdX78Jydx0CPs3W/LAA+AS8Jpk8twH/qbx/Ng33SZp+CXaTnG7sUPa2IPChk3cSCTTDW/gIN2B/7vDfwCcQ94xhGIbxjS9P6UcK96luxwAAAABJRU5ErkJggg==>

[image22]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAAAYCAYAAACBQ93/AAAFMklEQVR4Xu2ad6gcVRTGj71XVOyGWKKCBSvYWEVRRDQgamIs0T/Ehh0bauwoil0UDfqCCSqKipiIJQYL+ocFK9gwwa6IoiKC/qHfx7mXPe+8mdm7s/N25+2bH3zw7rmzM7Pf3rn3nDtPpKGhoaGhoZ+sBD0JbeE7ErgYOsEHh4yy/kwGb/rGvdB0H0xkeWgJdKDvGCLK+jMZvElmCjQX+h76r4OWQWvxQ4HjoadMuwxbi17bnrdOTJHB+VN3b/rCitArostKK+hr6FvTPho6B/oAuhFaQRQ+6d9Bh4V2LzwLXeSDNaAO/tTVm4GxDvQv9JDvyOBI6EtoOd9RglNFf9CVfUfNGIQ/E8WbvnGc6LJ1rO/I4BHobh8syTai1z3Id1RAmXwwj0H4k+zNBtCt0LvQN9Dho7trw/7QTB/sgvnQD5L21H4Gne2DPbAUutAHK+AZaD0fLMmg/OnoDZPXj6EjQrsF/QNtFw+oCVxW/hR96nZzfSmsAv0GvQdd6bSLOY5w2eN1jnJxshP0GLQYmj26S16ELnGxyAvQPT5YAQdDl/pgCaryhznr9dBr0C0mfjX0IbSRiUUKveGNfSR6ggiTad7AHBOrC69DP0Hr+44EjpGx1Sr1JrSVOY7wR2HfAS5Ob94QnbluFi0wIhy8/MyZJmZ5HHrUByuCq+A+PtglVfhDbhMttjiAecz2IX5FaB8S2pZCb04R/eCWJhZzhDtMbBh4CXrbB3PYU9QDDjxLC7pMdFb/Anra9LEC5md2MDHLA6L3MB5w9uIPzXvj5noZqvCH147fkcUXJxROhIS7AUwl7ViLFHrDjk9djHtfRTPCRCQ+eKlvOOJM4Ze5yKGi/TY/fkJ0+yaP+0W3ezoxT/R36VbvQ7+KTjzdUrU/60J/iW70W95y7UiuN6uL5p4PuzhPzHjWiO+Wlg8MiNtFN6K5XKfAV3x5yxlh/vQHtGpoc2b9BRqJB2TA5czOvFWyoei5s/K9FKr2Z4ZoP/PlyH4ydtBGcr1piZ7oNBNbA/pZ2lsLzCe4hMS3CpyymReuHdqd4PvZTU2bn7tBNKnmjkJLdJM4ldTqnjNDnBV4/b+hs9rdHaEP9CYWk55XoUWmvZfo8SdD06CrTF/keeguH6wA/iYLoU18RwHj7c9NoueMDzEZEfUmi1xvWPLzQneG9pqi2xmcklcLMeZZzLFYXJGdRfOKVHhO3nCEA55fkOfgrsLmMrr4KCK1uucKwVmNx90n+oC9I2nbKpal0Lk+GGB1/3L4m4OEMwGvt7dogbB76LN8Dp3ugxXAImWWDxbQD3844O1qfBJ0Xrt7DLnezBfNoWjqEtH9MS5jXDoinNYvEK0eCd8O2CqMg85vV3jxvTBnzl1FB+UeoqZEWCWnklrdc/+O341L8oNSbh+RiT89yoLfY4HoEkXPWLFyc5tbLNeZ4yIbS3sQVw3vodtiabz94ST3HPS7aDrJMZZHoTc/ilaEnVgs7bcBHHB8epgYp8L8hAM9PqmcWa8Nf08NfXWEBQhTn24HQBbcjvnEByuCq9sgqMqfXG9iNXe+78hgGbSZ6CD7SnTEX24PKGBfGVs8jUAnhr/nSHp+2294X3yQU14RdoIzTtFyNxGpyp9cb7hsc5Bm5U4eTtWc2pm7sgrkspb6P4DX+IDoNfkm4gzRpb/OMLfistUL24rm9LaIGBZ69afQG+aKNi9syIZFEQuLrLckKfDzrFx39B1DQi/+DLs3fYVFADfq7VZaKiwsZ/vgkFHWn8ngTUNDQ8MA+R9UZE51kxVhcAAAAABJRU5ErkJggg==>

[image23]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAVCAYAAACZm7S3AAABMUlEQVR4Xu2STStEYRSAj1LyNRt7K2bNpCyUYqFYMU1NsdMspoaUKWXFzkaU8gsUS5TlhB1lFoa9lLK3suQ5c+47zr3mztLKU8/ifNxz73vuK/JHzOA5HuNWotaRDL5ifxQf4Eqr6jgUa3zEIxzHJbxzPat46eImk2JTe3AdPzCPm3jj+orYcHGTabxIJmEbr11cEPu6GAP4ibOJfBlvXaxv1mP94kxsqi4pMId1F5fENh+jG/fxS2xIoA/fcDCKdZFrP2WRMXzGXTwVGzDl6gt4hSdig3tDYQTfxRahLIs9vBMaOqETdQFdUTwk9vBeqyOFYbHGDZfTZWmu4nJtmRdrnHA5vVWay7lcW/RWaeOoy+mleHJxKnrOB6xGsS5Pf0vyoqSSxXus4Qsuxsv/BL4BgZk2pTXrykoAAAAASUVORK5CYII=>

[image24]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAjCAYAAAApBFa1AAADd0lEQVR4Xu3dW4iuUxgH8OVQzmc5lMMkh8ghEi5c7CSHlAsXKMqNU06JC1IySoqcblCidkRESC4oEqFckJSSQkkukEOS4oLn2e/6+tYsM/PNnnn3rm1+v/q31vusd8+eNXOzWut9vykFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYEyHRh6J7N4PAACwdbzUFxr7Rf6p/V8iOzRji9knsmdfBABg9XaKzHW1yyPfRJ6LnFqmC7ZsD5zctIw3+wIAAKv3R18I3zX948rCBdsBzdhSTo/s0hcBAFidi/tCuC5ySnP9Rm1faGqzvN0XAADYfIdHTuyL4aLIF5E96vVc5PHIsZMbVuC3vrCNuyDyTuSZfgAAYEu6sbveNfJe7efx51vNWO+OMryAkPd9Enl34fCm+vFdbUxP1PbPyNORb5uxsV0R2b/27y7Dc39jyXmcEzm3DHM5OnL/gjsAgHXt1u76tshftf9x5P1mrLddbXNhlgu/55uxSX1DVxvLUZGHaj//n5Miz06HR7V95MvmemOZLt7GMJnH1WWYywll2PkEANgk3wZt5YLhltr/KXJzM7aUdjHTyq+Vb5jOclAZ7l0qZ09v/Y9cND7ZF0eWO2r5fUy0/Vnm+sIyvi9bfi4AwDboiMjJzfXDkVcju0Xmm3rvrMgNkWsj99Za/1EePzT922v7QFNbi/kyHB/mrtp5tZbHoumeyFe1n3NZq1/LdNfx/MglkTNqLi3DixhX1fHF5Fu2KRfCuYuW2p3NnMdpZVgI5lzOrPU8nr4m8mgZftYAwDqWi4KJXKjl0ebXZTgKXEp+MG4+s5aLtA8jL5bhA3Zbr9V2r8jvZVhIZX8MeWyYX//ByAeRp8r0+z2kTI8Z76rtWuRCKhelH0U+rbX8yw/5/F7OOZ+dy2f1cqF15yLJfzMf2TvyShlsqG3KeXxWht9DzuWmWs8XPvL+C8twDAsArGN/94UR5DNmO9Z+Po/1Y+2v5Ih1DIdFdu6Lq/RzWXzxemVtc8GVO2+zHFmGN2+P6QeW8Xlt843byUIOAFiH+pcFxrCxu74s8lgZdvC2htzNu74vrtLLfaE6uAw7Zzmef2d1MZPj0In7yvRYdCVeL8Nc8th1JR9YDAD8j23OB+LOsm8Znr8CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFvoXmRWCOY9Ry90AAAAASUVORK5CYII=>

[image25]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAYCAYAAAAs7gcTAAAAoElEQVR4XmNgGAWDGiQA8XEgPg/Ei4HYHIhXAvEKIPZGKIMorAJiZiDmBOL/QHwOiIWB+CADxBA42ATEjFC2BgNEcS4DRCPIZHuoHAbIZIAoVkKXwAaWAfEtdEEYYAHiViAOAWI2IH4DxHOR5AOAOBHGcWKAWJsDxBlQdhtUThSIdwIxL5TPwMcA8QTI1yAJFyA+BsSrgbiRARIio4AyAAAvThsHOE7i1wAAAABJRU5ErkJggg==>

[image26]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG8AAAAYCAYAAAD04qMZAAAEeUlEQVR4Xu2ZeajtUxTHl3keIzL8hcSL1zOTlKkkmYo/JHmGPEPmyPiEkpSZpIjMw/NeMiTyEHrmOUN4/jAnKSEkvp+3fvveddc795x9zr333Xuu86lv5+y1f7/f2b89rL32OmYDBkwjVpFuk26R7pC2GlndlpOkH6RnpZelf6UXm/I30tzhS6sYS1v6npWkR6XNc0UbLpIubr5vIL0nrTBcbedJR4dy5G5pw+b7gdLPNnzvQdIxzfdaOrVlWsOMPTQbG2ZKr0k/Sk9JZzf2N807uvCFtEsoLy8tlPYONlhfOjOUrzCfOIVDpJ1DOcJk+ERaLN1vw23u1JZpy1HSY9kYWGC+SraXnpbeaey/SPuVi8T70pGhDFtI30prBdva0rqhzACXCQEbm3uCDJPhOWlF6WDzQby+qatpyxB7mPtnZiP++g/z0b8zXtQH0CHsMQfkisAz1nol/CntG8oM6gmhXHhcOjcbG9aQ/jLvz04waF9b64GtbcsI5psP3o65ok9gBn8uLZcrArg1Zny+hkHfP5SZ7UeEcuE482tXzhXmHc6qYWBqeEG6NButvi1DMGtZeSzffuUe6aZsTGxrPkHPSXaiw8NC+Stpp1AubGl+/z65wjyqZB+t5RTpb2mHZK9tyxC7mTeq08tPZT6VTsvGBGE3Yf3v0qxgv1C6pPnOPvWdLb06CwQYefCBFV2eUcPh5n3Ogon7aDdtWQKhKQ/igRPNDea/VStmYifWMb+W6K4VvPzV0lvmmz/XxlXC2eo+6VbzoGO05wD75s2hfJZ0jfl+97p0pbRqqM8Q4DwpPSxdYN4WPgvdtGUJL5n/OJ3Qj3AEoBP2yhUN15ofEcpe9bG5y6rdnyIPSQ9kYyWrm/d18XCcRWk3q7YnGLB/zB9aA2edN8zvyasEcchc1hBB8tvb5Qqxu3ldDLeva2yrBVstt5tH571wvvki2SzY8AZkZnqi+N7Lc0UD/n2jUN7G/HwD7DNxWc+w1pHYRFNWHp8ZUk3sczFLgZv7PpS7gec9n42VsOLjIR4WSQ8mWzX4b148ni0KZBBeycaGTc3PJN262m73vIV+W1uK+2nlNpnVHIMidOC8ZKsFl5mfVwMukzbGQzxR/k82MkvTFcwGBoFDZoRNnrzdqcleONmWnkWTBW2nY2JaqcDBmvco4Co5j7U9O7WBzMyN2VgB/fmbdHyw7Wm+/bAQumZr85fOPpwXpIG/2ugrixUZV0jsoMlgsXRGNppvC2Qz1jTvwKus9UG9ls+kOdlYCXstKTpgwhG5XjZUWwnuhQF717zjydlRftt8VpYBIWHaChKl7QZ2MiCdd282Nsw1TzN9aL6/rDeyuhrOXfTLrrmiEgaM339V+tK8XbjOZcpd5uemqcRs8yxRq3zheEFw9lE29gMkfE83Dw74m6LX2TtREAETQY6agR8HWNk9BxeTyYnmITeaqslrgqsnsnGcILX2gbXPngwYA+wf/J8Xs/LjAc8lyiSxPWACIVJ+RNokV4wBco/HZuOAAQP+L/wH8JEEpSbaq38AAAAASUVORK5CYII=>

[image27]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAsCAYAAADYUuRgAAAFCUlEQVR4Xu3deah1UxjH8cc8K/xDmSIic0rJ0CuSv+QfItNriETKPERCMmYuZMoY/iFzGYooRCG9lFBKhmSMosTzs9Zy1n3uOfuc8zpn3zN8P/W0115r3/vu9e4/7tPaa61tBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMyZDTzuiZUzapnHj7ESAABgku3u8a3Hitgwg9TXRz1+ig0AAADT4JlYMcNI2AAAwFQiYQMAAJhwJGwAAAATbp4Stp9jBQAAwDQYRcJ2lsdDHofEhiG95PF2rByhX2NFg9U8vrR0T1/l418ea9YXAQAAtEGJyHqxckj6HfK6x3Z1wxCOy8e9PXauG0boNxu8rwd4nJfLb+bjY/kIAADmxLY22GjNgZZGe9r2eD6uuqA22c3jO4/n8/kV+Xi7x2253OSMWFFZy2N5rFwCW+bjQdbZv22LfAQAAHPivVjR4MJY0QK9Kl3FY43Y4J7y2NXjhXx+eT7e4vFgLjc5P1ZUTvdYN1YuoSs9nouVAABgNvwdztexzqtDWV6V+/nCmkelxqEkbGvHBktJjNqKG/NRydrZVX0vvRI2/by+vrAs1C+lPzz2iZUVjb59HSsBAMB0+LMq75uP5+Rjma81qJOs/RWOSthWt+4Jm+ap/e6xRz6/2ONhj0v+u6JZt4TtXEtJrmK/0LYU9vS41NJChbtDW033e0SsBAAAk29Dj5dzeROPTas2KSNShRKjaz0+8DjW0ivH7av2/W3xiF1Rkpxu8Vp13bCUsOl1aEzYNLKm17n6/WUOWzdaPKARxVc87vN4pGrrlrD1o//D2L86Du5cOjTdq1an7mXpXi9a2NxI/7ae8TD6PW8AANCC6y1NVpcL6oZMf6BrJYE7xdKE/l08tuo0/zsBXonBKMWEp0ShhE0LAOqETYlNueamqtxNmbSvrTHkutJgK5ewrazYv9jPWy3dqxLRJ3KdnsMgDvW4KlZWtFhE/9bGob7f8wYAAC141zoT5/VaTZQQlBWXJTGI9IHybja35uRoHLqNsN1p6YPxoqT0m6qtl2733WbCNqidPE6IlX0oaS2JeVEnpvJGOK/1et4AAGDMjrLFSYq276hXhV5TleUuS3uP1T+3TVXWHLj4O8etW8L2tMcDuazPPB1etUVlq49P83HrfJRJStiOsXSv6luhRGwQ8Zm8b2m0rNCr0jKip3mIRb/nDQAAxuh+j18s/SHW/C3Fq/lcrxML/XHesTpXsvChx6ke93qcWbWJ9jerE4pR0cidFjNcbWkVa63XooPLPD7y2CjURy9auk5bf9xgCxOZpUjYNN/uY0t9rWkume5VG+WWe+1HK3b1bMtzXpHLp9UXuc/CedHveQMAgAmhVZGDesfjyFj5P63v8Yl1RoFiQtgrYRuFthM29fVkS/MJ46jYOGhrE214rEQQAABMsc9jRYPjY8UIPOvxQy4fbYsTGSVsmnM3yNcYhtV2wqa+lq1C1NfyWhcAAKCRXpFqBKsfvaobhyetk6QdVpWLMuI2yD0Oq3yjsy3q64m5rL72WvQBAAAwsTTX7PtYOYO0zYb6ullsAAAAmGQ7WHpNOA+0wGJe+goAAGaIRpzmgVa11ltrAAAATIWbq7I+fzXL7qjK2vQXAABg4r1lnU1dS8yq2FdtuQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALfoHgCfknnl1jI4AAAAASUVORK5CYII=>

[image28]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAYCAYAAABXysXfAAACTUlEQVR4Xu2WT0hUURTGv8rKDMIshDYluAiEEgoK2mRGtIiIICQQMYqMihZtglqESKCBtamF/SGIgqJVRNEfQYVQECqiIEupIAotAm2RCyPyO3PemzlzfLdxoxS8H/xg7nfvm7n33fvOGyAlJcVRRFtoF31O2+mivBH/EbfoTeiiiuk96MIS2UT76S/6h76mnbSbvqVjUS7u00tmjV3Q3y03WVWUbTTZFGQBMqjC5cJ6+p1u8R0zzHX61WWyQ7/pKZdnkTM4Dj2TIe7TFT6cYV7RAR+SUfrEhzHbobvSarI59JxpPzSfQzTSb9Dv+kDvInwcDtMyHzrkiMuCPCP0vQ9jzkInUGuyo/SiaRdiFR2iDdBJyi4epB/pabogNzTT/5TONVkSMqekxXyhn30Y04fcQ26ts4MKIHe6xodkJX1E39Hb0Moku7fTDgogRz9pMbIQuUlTWAqtZN0mWwh94JebrBDV+Pud3kBP0mOY/rP3CVpdPcMIPN+7obvQbDI5ElLdYvbQI6YdopLeoY/pGbo2vzuPzXSJDx0voEfX8wP588tyAboY+fIQPbTUh455tJd2QN8Pe6HXNdPF2VE5riA5t1yFVi5LCXS+bS7P8Ib+pPN9R0Q9dMGF2AF94C1y7PbTZ/QAXQOtksfpZTMuxDboxKW4xEh1lGydyTLEb9MHvgP6o1uhd2a160uiCeFSu4xeoxPQkipHUP6aTAf5L3betG/QS6adKcFy5l5CFyN1W9rWwagvaaGziezuIehrQo7diShLSUlJSfk3mQQcO3nLqmscwwAAAABJRU5ErkJggg==>

[image29]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAYCAYAAABeIWWlAAAChElEQVR4Xu2WS6iNURiGX3dSwpHLQIfk2snAJULJfWJAYeB6JBOSIlMZKCG5loEhInIrItShUESUkhhKnYEiwsCA993f+vXt7+y97Us7nfqfegb/u/berW/ttb71Azk5OU1gA71Nn9BLtLV4uPuyjb6iw9PzXtrpnouYQ5/SX/Q3fU3v0Q76ln5JuWy3r/w3RtCfdLXLetIPdI/LuqCCVMCYkIvp9BNdEAccM+kh2AQ82kI7aP+Q18MW2Bynhvw+vROyvwygP+iLOOC4SUfFMDCOnqG7aC+Xz6VX6FKX1cMpWHGjQ36VfkOZBVwG+9IBl/WgR9yzDnC1zKJn6UKX6ffW09N0kstr4RpsniNDfjHlWtwuHIQN+slsh61UvaiYdlgxE1w+ENYEtIWHurwa7qJ0cedTPjnkBdRSs6bhXeM/VCcqZj+sGL+tW2FbeHf6TDXoaJQq7lzKx4ccQ2CdssNl/WANZJjLGkX/3g3YP+nb9mL6EHZO+7i8FNrqKiKe/Qspbwk5VqaBfS7rC+ueGatg90ujLKEf6TqX9Yb9tu6qKS4vxTHYXMeG/HrKdS0UcTINzI8Djgd0cAxrYAbsvOjgZwXoTGrRntPDqG6XbILNdVrIH9HHISvwhn5H+S2hVdYC1EMbvQw707Ndvpw+g52V2NYroSP0lW50mXaZjtBOlxXQKmolbsUB2Mouop/pxDD2LwbR4/Q93Qz7LaFWrctWxVbaKZVYAft+do9upS/h7ji1fJ0pvaOpOO13PXvfpbFShZdDjUgrqOak1c0moAZwFFaYGkij6GVAW1kN5gRqv1JqRhe33hTWovhgq0hNYp7Luh1qOP6VK6Ppq5qTk5PTFP4A6Oh/O01hYzoAAAAASUVORK5CYII=>

[image30]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAYAAAAPtVbGAAABbUlEQVR4Xu2UzytEURTHvxhKKD8ybBQpYU0WFpSNnRQb/gN/gY2FxdTYKYmytJCNshEpIzsW7PwHUjbYKEl8z5wz15szDE9vI/OtT71zv+ee+9695z7gj6mL7JFVskYai+1kdETG7HmabEa8RNRG3kiTxb3kntSEjAQ0BF2k1uJOiztCRkSj5Jg8QpOeyBmZJFXkkFyb90ouyIrNk7EUVO0W91n8qeQAJanHG9Qc1FuMjA3aWJ3FhS9JhwwneeM7cukN0za0wHBkrIE8k1aL5QseSHXIcBqBFsl6A7odMvkWpQVkK8fteZbsflilWoIuMuENaIuKt+MNqpsckA3ouQ4UuU5y0FKoHAsh+xdqhhY58YbpFOqXfcvvNAMtsuwN6OFK2954I67W8fV5TEG9LW/ElVw0acV6b0B/erLIvDfiqB9aJOcN0xXUb/HGTyT34py8QIvInksLypbJXdiH/uwKnSVeJj+zoor+h94B0rZRkgxBN5kAAAAASUVORK5CYII=>

[image31]: <data:image/png;base64,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>

[image32]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAYCAYAAACmwZ5SAAACUUlEQVR4Xu2XTahMYRzGH5/le4EFWcnCQmSlbOQjiRQlFkoIIRbUJVI+ih2hJEUpdS9RIpTIpcRGvheyUoqNrhViw/P0nHHe+TczzZy5wnR+9av7vs/MmfM/5z3/91ygpCOYS6/SU3RXyDqO0fQdHZGNj9HVv9MOZDl9nIzX02vJuOPYSXuT8Sr6Ihn/s2yBT/xn5id6l06g0+kd+jHLvtAH8NLdQ+8hZwW8xP8LBtLP9C0dEDJxGi54djK3md5PxrrDz5NxvzOPXqBX4LtQ8XL6oSaZCRd0PAbwBXhP++jgZH4hfZKMN8Ad+49wgJ6jY8J8UbrgghfHgMyCs0thfjh8IUZl45N0Wx7nrIW72zP4DumAOthFuiT/WF20dM6i9tIrilbGV+RbTMo+uOCtMYAv0A24jh46rDp2sXvpIDjUgZ7SsXAzSNt8LYbCz82QMN8OKvIH8qZVz2mVL7TCdeR3Zip8oO1w8brDc7KsHjPojjjZJkvh8zgYAzKSfqMfYlAEbQf6ockxaMBK+hLVTSqqi9oKJ+DzmB8D+BFTdj7MF6Ib3gZaQe+u++Nkm7yCl7SaUOQoXPCaGDSDWvpheIPWs6gNXp22wjK6LhnXQs/+Q/TfMzwRLqg3Bhl6c1I+KQbNoH1TX1br1qatv49k2Xh6G3mLb4Q64xn4ZaFdNsHncSgGcCNVlu61LaH/LtSY1I1V3AL6CH5RUMPQDzSLXtxv0kUoVvhG+gZ5B34NP//j6BT4vL5nmVaiMm2HfxUtx930FqqblvbFkpKSkpKSBvwCzteDRzRtf98AAAAASUVORK5CYII=>

[image33]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAYCAYAAABZY7uwAAACYElEQVR4Xu2Xy4tPYRjHvy7JJcSEhaRsMHYUkwW51ZQFyR8wFkIuG2WBjQlRssBGISJGlLJDKQoL11jMME1K7imkiBLf7+95z8w7z+/M+Mk4U2feT33q9z7Pe/qd85z3doBEIpH4rwylzfQ6vU8P0BHdegxwztEzsEINp5dhxcplPr1G39Nf9Bu9R0/EnUrECthzToxi9SE2L4pVcQnWaY5PlIxT9J2LaST9pNtdvJPBsBHU5hMl5DFt9UHykV71wYwG2Og57BMl5BOsSJ63tMMHM3bCCrTKJ/qAJnqHPqSnYfP8PG2hy7u65aJrdF+1utsu6xX1yyvQK/rSBzNu0h90rE/8I02weT0Eto3q5h7QOnoDVrii+Yr8Aqk4z31QqChaoFSkWlhE78Ku8W9Q7ujqWtk+B4XfM2D5zbBiaQQtDLkieUGf+CB5AzsTVaFppRvXwSmPrXRS1J5Jx4TfT2HbZsYsOixqx2yA/c80nygYjeB2HySfYcedKo7AbnyJT5Dx9JYPBibT76h9Wp6lz3zwD/ztGtTTS445BtuxYkbCrt/n4hW05elBR7m4pobODBtdPEMj4qIPRuhssYeuho2qD/R4lF9J10TtolgGK8bUKKaNQ7HZUazC9JDwQ0trxCH6BT2PEI2s+O2pmDGLQ3wTXR9+7w25CfQKHR3aRaNvr4NRW7vr0aiNBbCiPILd+OvQ1vzUOSF7aE2LPOai9+IJrVNaiLVbqRhL6W16ge6C7WT9hQ7G62DLi6bcthDrM07S/T440GmkW+gU2IlzXPd0Yi3sI0+W/YM2kUgk+o3fDBiYWgErQqQAAAAASUVORK5CYII=>

[image34]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAYCAYAAABUfcv3AAAD4UlEQVR4Xu2YWYiOURjH//Yta7IvyV6WFClkBonshCwx9oTixp4LWygXsoREI9uFXZSduKKQGyI1kt2F5UJJ4vnPc76Zd5457/e975hv5rv4fvVvmud/znnf857tOR+QJSOoKZouamqNLOHMEu0X/RV1Mp6lhuiMqK01MoTGoguiBtZIJ1E+3D7RBBvMMIaJromqWSNdpPpwM0TnbNDQRrRSdFv0EdrmfVGPYKEY5IjOi35A20qms64OOSJaE/g/lIGiG6Lv0EZ+iu6JRoqqiK6Knjnvj+ihaEdhzWKSfbiqonfQ9sKYJ/oi2gmdlbNFD6Dtrg6Uiwo/9nXRCFGuaCq0rcvu/6HQwVwreimayUqO/qJPojqBWFI4I9h4B2tAH0IvbCTodbZBxzjRK+gg+FgneiPqaOKcfckGJA6joW3NtUYIBaJlNuiDnfosemwNxzHog/tZw0Gviw06WHePDTpGQWd4HxOvDX35TSZeVvZCV0tLa4SQL7plgz44Pdn57dYQqou+iT5Al50P1u1qg44X8I8eT9n3ol3WgC61hQifpXFgG5zRwX0sFfOhW1dKNkA7z1PFkgP1TllDGCvaBvUPiPJK2mjovPEmTriX0eMem04GQJ/Dg4L9DCos9RgMrdPCGhYeBiyYTEuKSkenN7QuX8RyFOo1soajG8pnqe5G6b5Q+dDk3UcvaJmkJzpfnIWYBvi4C/W7m3gUuCeybk9rCE9Fv23QwWXMrcE3y+NQF7rkeFrHoR30vXNNvASToYU2WkOoB91UmU6UhcSM418L9z56zNgtTE/oLbZGTBZBB6e1NVLAnJLP921dRTCjDyvEvYneIWtEhNcr1vct1StQb46Jt4fmdPSaGy8uj0QnbDACXKJ8fl9rBGFy+wv+hI9pBBsIJohx4Ixl/THWgH4wel9FE6EbNfOt59BZwquPhbOTuVjYlYgDxOSWTEL4bE/FIGjdZtZIwA2YBe5Yw/EE4cspKgWi5TYITW2Y3bP9hDgLE8m272Mfh3orrIHiznIgVkGT7rD8MRV50Ly2FMzbeKXhyPJh3MN47eJyZYcuQl8g0SF6Wwtrxod3P3bYB2dOrlMiOT0IvRr52ALdc09aA/reh6Hv/Vq03sXKAhPmSzZY0XBpcfR4UgapD000mRzz9K0lmgK9vYTlV4S/+zGVSSe8j0+zwYqGH4G/dvCiHWQzSi7Tt9BkOlXSyQNrgQ2WI7xz80bDG1OlsxT+5ceLfS404YyyrHh94r4YummXA/kofQOqNPhR+OvLcGvEhCdmsp+n/pch0B8lMgqmO6dFrayRITQR3YTeNrJkyQD+AVPu40r22zlQAAAAAElFTkSuQmCC>

[image35]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOkAAAAYCAYAAAAf+dpfAAAEcElEQVR4Xu2aW4hVZRTH/xWVlUppmJfUHlIRxSjRolEHEvMagvoQeMFSQ8XAW2jQZUTFC1gPCqWDNyrwXj6JFxiKNNCQxMtLoZK96ENFIVGD6Pq7zvHss2bPzNnn7OP+plk/+MOctc6ew7f2961vfWtvwHEcx3Ecx3Ecx3Ecx3EqYIrohjW2A+aKjov+Fd0Wncp9pk6Irou+FD2bv6AdMVy0WXRGdBkam+9Fw0QdRUdFD9/7tlMKn4r2WmMpdBX9Ap2kjxlfe+E30XlrFKZD49JgHf9jOom+go57p+gl0YM531OiQ6JzomM5m1MaL4tuQRNdYhaLdkFvSr9iVxDsg06OavE8dOybrEPoDPX9ZR0Z0kV00BpT4knRj9Dx1hhfnkHQmLxvHRmyWjTCGgOC8+htaEVyxfhaZTJ0YW6EBr622B0EE0RfW2OKLISO/Q3rEJZCffXWkTHrRUusMQUOQLP9aOuIwF31P9FQ68iQ7tDdnUkmRN4VPSr6QdQoeqjY3Tzcnabl/l4GnYxvFtxBwUWyyBpTgrvSP6InIjbe9LXQgO6AloAh0UF0VvSidVTAOOgc2G0dMXAxP2CNGTML1U3m5fKqaEju72+gMe5RcLfMAhQCzQHy4kqyM29uvulSDX0HXTiPID3Y+PhT9IfoC+j//xDaFPlVNLXw1cR0Q9MxpC3GZAbSgWUu50A1d0huBnYMaWsPEiyCFvgJGo/WVJf7fhxMpnMin+uRIMZjRIMjn8dDL2bZGzIsTdllHGkdZfIadNycPJYPoKXfO9YREGz0sQPLZs5zxa5E9IbG4XfraIOMEp2Gbjwll5Vl8opogzVG4KYXbcaug8Z5UsQWCxsP7GbajEBxNwkdlnh8ZMJmQaWsgY6bHUxLvmnEWIUOkxdL9rhzdSkwaXOsR6wjhpXWECC8d5egHWieBatFS4u0Bprk7Rqj5kW+F8sW0TPG1gd6McuFUHkcWo5uF71gfOXCXZnPQuPOVwOhMblq7CHRFxoPJqxKSjw2DzlWls8twbPVNmsMjNmi/dCGY9x9TRM+S45bpCxz+Xzd/v5MaJw/MvYi2M3lIxcLmya8+KJ1JOAzND0fpKWT0LMjmxtpwWZQI/QME8dWaEx4Ri0HZnNmcjuWtMR7xXNTf6RDg+hvNP/iBhMjf7c5fymwD2LHkabYdV6BwnPdasMKLG6RfoL4ph4TB+cU10oszJY/Q3ekOG5Cb1Jo8FzBMxfPj2nCTjYDNt/YeRz4POdjM+x+3fAksBL6VtTTOipgALRZxoftPKNGYYyYzJ429pBYLvrYGqsMXwSqNbaJ0HsTB8tjzqvD1sEtmZ27fH3MDBztkNZByxz6KJaA70X8WcPDN7NjWrwluoDCePmmUTQbX4O+QDE2f0GAMGmV1CFMCJ8zroI2XjjRWE1w4nMHCBmW4ezIZwlfMeUmmJ9X9cXuu4+HONfo447PufZ60TfaMCwnQtzNsoI7fUhv+4QAj3C9rNFxHMdxHMdxHMdxHMdxHMdxqscdfTVB8e9obaUAAAAASUVORK5CYII=>

[image36]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAsCAYAAADYUuRgAAACbklEQVR4Xu3dT6gNURwH8ONvkR3KgmTzNkqKrCzEQt5SREmKlJUdZSFSlgpFRMpG2SgrJAp5oZQsZG2BhVI20lvwO2/OdefO84rHvXPx+dS3OX/m1l2ezsz8TkoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw+hL5GtzEACA4XEmVYs2AACGVN5dO9ocBACgXeOR0chI5E0ZmxdZXtqfIgcin0sfAIABWha5WtpzI1dKe2+5Zu8isyOnamMAAAzIw8ic0j4eWdidmrAysqcxBgDAAI3V2vfLNe+yrUvVY9FDkRVl/Ea5AgAwQPMjdyIvU/WxwbnIosjOyOvI7sijyOnODwAAAACAv8z5yNNUlRzJj2039k4DADAMDkZ2NQcBAPh5+YSEvAP2ozyo3Tcd+eOHXAtuOq5FnkW2RK6n6h09AAD+sM1p6vNNZ0Q+pN4F4scy1yn+ezJVC76tSfFfAIBfsj5yd4osqN33PE0+3/Rwo3+h0a97m7oFgQEA6IO8a3ai1l+VusV+s/y4s7O7Vl/YdWrJ5fFcS25mUksOAKAv8oJrQ2mvjbzvTk24GTnWGMvuRZam6vedIsD7e+4AAKCv8mPTxZEjzQkAgH/dpdT7kv+2yJJaf1jkExny/5zVnAAA+B90zhXNxtPkQ+EBAGjBk8jtyOXImlR9rZlrqL0qbQAAWrQjMhoZSb21yjalqg4aAAAtOpu676zl2mj199fqj0YBAGjJWOouzPL1caoKzdZPGNhergAAtCAXpX2RqmOe8gItn7d5MbKv9FdHbn2/GwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDf8A257GKV0RtOZAAAAABJRU5ErkJggg==>

[image37]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAYCAYAAABeIWWlAAACB0lEQVR4Xu2WPUscURSGjwkaAxZ+oQlB/AgiClpoJ0iMCdoqqI2oAQmiFlaxEcRCEBFBNL8gKgkWSQRFUUELFSxCBEHE1iZFQEmIFhb6nj3XcPfs7Oyu7uwizANPMe/ZYe6dvffcIfLx8fGATrgK9+AiLAwuP1z64QHMM9cj8Jd1HUQt3IdX8Boewg24BY/hucnZd3JL0siHl7DNyh7BU/jBykLgCfEEilTO1MDf8LUuJJgekjFWqXwTrqnsP0/hBfyhCxbL8LkO70E5LNNhBD6STK5A5V/hX5iu8gBNJDeNW1kKnLKueQPHkzo4psMIfCMZ5zOVfzH5S5UHmCApNljZAMmb8pIlmKFDF9bJeXILJufVEAK31NumYdtu/8gDSuAnmKoLYeCt4TS5eZOXqpyySDrllpU9IWkguVbmFbw8+dmVuuDAHMkk9N7/bPIclVOLKYxaWRpJ97ylleR8ceMtyT13kZsBdzx+0W5Mk4y1WOXfTc7HQhCzpvBKFyy2YaYO40Qf7NVhGLpJxlqt8h24q7IAR/AfhV/3HSQvwAv4MB7WoQv8z/6BXVbGq4y30KCVBaggeRMrukByFLyBZxT7eRQt3Nr5ObHQTNIAH5vr9/AnWWcct3xe6/yNxpPjbzO9D05MzWni8aAeDukwShrhJEmDmYHZweXk84IcupuPj4+PTyK4AXeGcLVtjGt4AAAAAElFTkSuQmCC>

[image38]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAXCAYAAAAGAx/kAAAA00lEQVR4XmNgGAUDBuSB+CAQfwXi/1B8FohVofKzkcTfQ9WyQOWwAmUGiOLbQMyEJC4FxE+AOA5NHC9YxwAxLADKZwfijUBsDldBJHBigBi0D4i5gHgNEFujqCABXGWAGHYIiF3R5EgCuQwQg9ajS5AC2IB4LRB/AuKfQCyEKk0YgAJ1NRAHQ/kaDBBXXWYgIaZYGSDe8EAT38kAMSwCTRwrEGOAGNKLLgEEQQwQg86jSyCDECA+A8S/GCCKXwKxDZJ8DgMkFcNS9EkgnookPwpGAQBK/CxmANGutQAAAABJRU5ErkJggg==>

[image39]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAAvklEQVR4XmNgGAVUAXZAvBuIXwHxfyD+BcRHgJgNWREQXGGAyP8G4tNAbI8qzcAQzQBRsBVdAgoCgPgCEKugS8AAJxC/Z4C4QBRNThOI92IRxwAzGSCuyEQSE2eAeFECSQwnsGWAGHAQyucA4i1ArABTQAy4wQAxRAeINwKxHqo0YVDPADHgCRA7oEoRByYwQAywQJcgFlxmgMQGE7oEMUCGAWL7enQJQsCJARJV5xkgBoBSJYhvjqxoFAxbAACCUyQYgJCjxwAAAABJRU5ErkJggg==>

[image40]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEUAAAAYCAYAAACsnTAAAAACTklEQVR4Xu2YTYhOURjHH19JRFOSFE2Z3ZDFRM00EaUsNGZlYWYWJPIRNhaTNJ8LpBTJRlPToMbHNCNFzGxY2UkWRCklsmFN4v/0nJMzf/ed5t77nuuO3l/9eu/9P+fOM+99773ndEVq1MjKIngXruVCBvZwUBJa4TUOZ+IqbOcwIz0clIgBeIbDJPbBMQ5z0MdBiVgIX8MWLoTMhx/hLi7koMwnRTkNJzgMaYPv4DwupKAbng2cpP1tf4ZWnRMyvVfoqWBcyHr4C27ggmcEXuEwJ2W/UpT3sJdDzxt4nMOczIWTMgzHOVRWiF1GlabQZvgEPodTcAscgjfFbplKVOOkZO09W3QGesmhsknspGzlAtgodmstc/tP4VexY86JHedrTAcHKcnTe7bo3fGJQ2WzWAP9J5jLcJ3b1ofwB3jb7V+Ah9x2DIro3QV/iM2+0/BXin7ORKPYuP1cKIBYvfVq1r/710nRJX2l2yfkiNi4esqLIFbvo/Abh8pSsYa7uQA6Yb/bvg/fBrV6eCnYT0ud2C+/gAuOmL09+rB+waFH5+uTlC2GP+Go2PPmO3zmarpMvgGb3H4W9Hj9MZIWV7F7e66LzWSJ6DSnjZjz8BF8BbfDh86LkvxgTsOg2Be/xQVHzN4enY51uZ+IXsZfxF4dFMlKsQXUv2C52MyzmgseHfAZ7uVCZHTBeJDDgjgM73HIHIMPOIyIrj0ew1VcKAB9Lumt08AFRudqfZ+ykwuR2CHVfVWRhh54gMNKLIF34Bou/Efo60idWGrUyMFvB+Z4onOlBtEAAAAASUVORK5CYII=>

[image41]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAAA3klEQVR4XmNgGKnAD4iZ0AWpBaqBmAVdkFqghoGGhtcyUNFwGwaIgTC8G4jrkfigYKJaHFDV5eiAaMMTgPg4EJ8H4sVAbA7EK4F4BRB7I5ShAKIMTwDiKiBmBmJOIP4PxOeAWBiIDzJALMUGohiICONNQMwIZWswQAzPZYBYBHK5PVSOYpDJADFcCV2CGmAZEN9CFyQXgCKkFYhDgJgNiN8A8Vwk+QAgTkTikwScGCDBkAPEGVB2G1ROFIh3AjEvlE8y4GOARBooVYAMcgHiY0C8GogbGSApZhSMgqEMABsnIxoTwEoMAAAAAElFTkSuQmCC>

[image42]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAAAtklEQVR4XmNgGAWjgFZAAIhr8eBAhNLhAhKA+DgQnwfixUBsDsQrgXgFEHsjlJEOEoC4CoiZgZgTiP8D8TkgFgbigwwQS8kGm4CYEcrWYIAYnssAsQjkcnuoHMUgkwFiuBK6BDXAMiC+hS5ILmAB4lYgDgFiNiB+A8RzkeQDgDgRiU8ScGKABEMOEGdA2W1QOVEg3gnEvFA+yYCPARJpoFQBMsgFiI8B8WogbmSApJhRMAqGMgAAR+Qe07ErwA8AAAAASUVORK5CYII=>

[image43]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAZCAYAAAA4/K6pAAABDklEQVR4XmNgGAVUBZVA/AGI/wNxJpoc0SCFAWKAApo40WAxEF9EFyQWMALxayDuRJcgFhgxQJyfBcRLgXgzEO8F4lBkRfhABQPEgDVAzAsV6wPi93AVBMAuIL4OxNxIYiDvvGOAeA8GQDEEMtQbSQwMKDIApOknEDciCwLBSSBehSbGwgAxgAdZ0IcB4n8bJDFlqFgMkhgIWALxOTQxcGC9AWJmJLEeIP7KAAlQdyCOgIqDUuxUmCIYuMSA6dRjQLwaiLkYIOHDBxXfDsThMEUgwMEACSgvZEEg8AfiQwyQaLWDioH8/wmIhWGKSAW2QHwaXZAUUAzE/UBcCMRiaHJEAWcgPgDE1WjiIxoAAFGoMjm38HhFAAAAAElFTkSuQmCC>

[image44]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKwAAAAYCAYAAABnaha7AAAGbklEQVR4Xu2bB4gkRRSGnwlzwpzXLHrm7Klgwog5RxRzjhgO3VMxZ0UUFHPOOStiwoQZA4ZbFLOYQEVF9H33unar3/bMVveEnfHmg5+bedWz011d9VLPifTo0WOSYStv6NGjFZyq2sIbK9DvDY7rVCt4Y5cyleou1QJ+oMmsrbrCG+txkWpA9ZbqUtWKudHuZxvV5d5YkfHe4Jhb9aZqHj/QhTBnW3tjizhdNc4bi1hddaFqatVhql9U2+aO6G6WUn2kmsYPVARPPRJ7qx72xi5jV9U93thCplR9qFrLD3jWVd3njR3CiaqfVf+qDnJjqdyhOtMbS7Cb6uRIT7n3ew4dOgib/wfVKn6gTRDG/xabt2XcWAqTq75UbeIHSnC45Ocp1pHRcTHHqe73Rs8Mqj9U6/uBDmFfsYnvc/YUZlH9Ls3NwVI8LFyrut0b28gNqk+9MZEtVZ+oJvMDLWZRsXs9xg94bhXLYWdy9k7gRtXb3pjIflL9s7VIXbD7iHk5CpfR4AvVZd6YCHNe9bONMkFGqBPIHc4XW9ks3E6CHf696hw/kMhV0nwvl7pgFxeb01X9QBtYTuy7N/cDiZDzH+qNbeJ6qZOi0n55V2xF3yJ2kWPjAxLZXuyzqfpLLBUZiZXEjj9YdbPqQdXTqh3ig+rwuuoCb8ygmueaX820qeo8sQVOdTzt0KE5yGlTwcPu5I1tgBzxT7H7Qg7PnN0rad2fmcXmvFa/eU3Vk6pXxP7uaqprxO4PNUej0Cl4xxthMdVXYhcFVIWcaP/gEaPPCWLnRBExY2ajo/HT4BH1+U6KWyUsRqr4hbL3Z6h+VR0o1iEhp29Gz/Zbsc3Wbrg25o0FNEVmY/OmVP3Li32WYtyzrFi6EJzNc2L3gs+cLfa5FEdUDzz7194ID4n1XUNiPZvYF541eIQtEsLDfJGtnTyh+kA1fWQjPfhR8gUBHQQmzodAWnSHOBuQX8b9RW4Ck0R6hAfFK9fysGWgTUNV3E5o3/0m5vFiXlLdHb2nE3ClWBSIaxdSGNYBi9NDj37B7DXz/7mYB4dzVftnrxthD7Fz4vwG4Us5qSMiGyeNLb7BfIjCpd3VIrBICWs+ZyQUhUkKsNBYsH5342HpLY8EkYaw1mzel+Hn72HREGJTlLIgNhK7jxtEtlnFFoGfizVUrzlb8LD8Ww/aZRxHz7mZ4DD4u7kFS76GMe4Tkt9gI28sS9kcFg8wUkeCkMyxPLYLhLbH7pENyKvecDbAO4/zRkeY+L38QETVSIPXPtobWwyejshCLzjAQucafXvveNXFzsYxHFuUEsQQ1Tiuz9ljjhJ7iloGUih67zl4usWXUckGyHfiZHc7Ma9DM3c0IFel+R5yMKCbwWJnAW2s2jmzc+5Fj15fFLuBnlAoEPa5PuZi4WyMne1zvaqR5h9JLxCbRVGuSlR6JntNvj5v9voRGZrDAJGN+SjK4XEUp2WvH1B9HI31yfDFiUNkrsvAvSRVzcHEEwqOyd5TgNG3Cw8PuJE07LlJrQiVKbB5fOgnD7tTNZ1Yfhu89KNSXI1z7hRsHqpbmurzi4VtblDIWVnAXHej9In93aWdvZXQ+eA749BPmoSNJ09LytCckkax+efI3sdMkHy6CHhsNiBdFPJbOj3PZ2P8rZtUK2fvG+FqGZ5/T2QJ1ctijxo/k3wRggfjKdHjYj8caTcUDhRWmzk7rRYqUxZhCFlMFhU+RaOH/Ir81INXeUysKCLJp0nO5BMefTunaqRhA5FX53KxFrOhmNcLhVGAwu8FsadvbFIg1fL5a4DrZQF6KHiZt/dU64k5CkTki4s01g8/ZsGrzx7ZU8BRlZ3riRA2aMvgxeZ0Y53EOlJ74hcR8y5lw1KgkUhDp6EoTekUThJLu4pgo1OwVn1KR3sQpzMgdg9SYa1RHBIpSkPCfImYpxjrxjoJ0hpyJ863aGMRJao+ZqwaafD6A1LthyftgqdJ9JzJaT0snG9UO/qBRCjciIDk02U4QPKtt1LsIvbLmfHO3mnQvnlWancDxoilF1V/Xlgl0tDnJRfrZE4Ry2drLUram/Tqq4KTwJn4zkQt2OSkA9RTkzzHSvXfI5SNNHOJ5dkUht1M6JbQ1y0LnR02OXPh22a16Bfb6D0yeHRI/7ksZSPNbfL/+S8y5PB0ZUIbLJXQhWKxFj0x81AAlq0RevTo0aNHw/wH7OpcjQV9oNgAAAAASUVORK5CYII=>

[image45]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAYCAYAAACldpB6AAAC/klEQVR4Xu2XWahOURTHV4bMM5mVKdMDiaSMIV7wRmRMphTlgcyZQ4bMZJY5HsxDcUXG8oAMyZOS4cFQUl74/1rrdM/96ib36t7b7fzq17fP2uf7ztl7r732vWYZGRkZGRkZGRl/pZc8Ih/InhFrKd/IOclN5ZkW8oasIR/JoxFvJN/LvLgu1yyUg2Vb+VvOTfXNlHtT10WhphyXum4iH5tPcJljlfkkNE/FJsoZqeuiMFpezYmNladyYmWCZ/JWTuyy+XYpDlvMsy3NLjk7J1bqUA/IgmWpWAd5MNqV5FrzFWWLrJCXLH+CBsoDcr3cIBfIjua15oe8K1fHvfBUbor78mT7VN8IeU5ulidk3YhXkxvlSvN3OR9x6Cf3mz9/TcT47Qtyslwid8g90VcoH8xvhHrydHzCEPMThNODVAZ+mAG3kZ9kq4jflKOiXct8EqrGNVATvsmucU0hnhDtYfKl+aIAEzUv2tvNBwZs02vRZgFYkMqyjjwmG8ppcps8IyuYF/ov8Z1CGSk/mw+UdO2W6mtmXuAYUJWIMWH74vNQxHjYR9k0roebZ0MaagQrnPBKDoj2PfNMS2ASGEhr+UvWj/hy8xoGefKkeXbONy/wvCuZw2nXJ+4bGtfFor8VHNB9Ock81adEjIl7IWubvwSpScZA4/hkUMlAuZ9TgpVnotmS7aIPeAaLw+nyMBW/br5t4KfskupLYMK+mm9lYHvxLsn2KhKk5c5od5Z3ZEV51nyWgYccNj9mGcwV8xRndUhheGJeL4CCycuNl33lW8s/nUjz5G+WQea/BZ3kd/OUBzKpR7RJeeoCMHkXow2vzWsP2VVkGCyZwECp+A0i3t18dReZ70OOvnXRN1VuldPNV4Q9+y76gMGzqhQ1YHWpRRQ+inL1iPPd2+YTxh5/HnHg+cfNB8fvJLVpseXXE2DRmNTeqdg/Q+FMZr804WjdnRssCTgu+T+iNKDIJalMUWZF2WIlCgWL6ksmjMnpKwkYOHVmqXldmFWwO+O/8AdDNpC7smiP5QAAAABJRU5ErkJggg==>

[image46]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAYCAYAAAA20uedAAAAhElEQVR4XmNgGORACogD0QVhYA0Qn0cXBAE2IP4ExH3oEiBgA8T/gdgXWTAdiHcD8SMg/gVlg7AcsqJ9QHwIWQAGOID4JxC3okuAgDMDxD43dAkQaGGA6GRHlwABkF0gR4AAyEs7gZgFJnkfiCdBBWYAcTBMAgRSgPgjEF8E4gRkiWECAPXaFr8lo/9wAAAAAElFTkSuQmCC>

[image47]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAZCAYAAAASTF8GAAAAdElEQVR4XmNgGARAFIjPAfFvIH6HJgcGz4F4G7qgARD/B+JCdIkSqIQ6usROIL6BLsgNxN+BuBddwosBYow70RJ9QPwViNnRJS4zYHG/HAPEmCIglmWAOBsMrKASILoOiMNhEixAPAWI9wDxaiBmhEkMIQAAt1QXX5YB7PMAAAAASUVORK5CYII=>

[image48]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAYCAYAAAAcYhYyAAABEklEQVR4XmNgGAU0B5VA/AGI/wNxJpocSSCFAWKIApo4SWAxEF9EFyQFMALxayDuRJcgBRgxQLySBcRLgXgzEO8F4lBkRYRABQPEkDVAzAsV6wPi93AVRIBdQHwdiLmRxEBee8cA8SoycAJiNTQxsMafQNyIJn4SiFehiYHAJSC2RRf0YYB4xQZJTBkqFoMkBgKiQPwZiFnRxMF+fwPEzEhiPUD8lQESPu5AHAHErQwQVzwF4t1ArAFXDZVAd/YxIF4NxFwMkPDig4q3AXEtTBEMcDBAAs8LTdwfiA8xQGLLDkn8BBA7IPFJBqAI+MgAsViEAdX7RANQwB+GsuuAmAVJjmgACh9QgMYDsT2a3ChAAgAIWC5SCbzvrAAAAABJRU5ErkJggg==>

[image49]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAjCAYAAAApBFa1AAAC2UlEQVR4Xu3cTcimUxgH8IMRZlgoYqZpmtj42ElEkUbNR5NEoURWyHYWyvhYUAr5yDSmmSxMk69ihRkfhVgQsbFAshpphoWQjRLX1bmeee65G693Zt6nnvT71b9z3efc7/N2767OuZ+nNQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5tKmyPeRl8YLAADMjzsj544nAQCYH6+OJwAA+G8vRs6JfF3Xd0RWTZeXzJWRvyNrIzdUfSxWR1ZEPqvrHyMfHloFAPgfujZydWRzXed4U9W31bgUHoj8WXX+j2HDtm5QD70wnghbI+e36d/fE9k1XV7Q6TXmseznwwUAgHn31qB+I3JW1dkcHUk2SwvlSP6K3Ff1/sjOqs+O/F712PrxRPkq8kHVe1vfdVuMZwb1jkENADDXLmu9yToh8nLko5o/I3Lq5KYl8FPkxEF9UuvHpI9GHpzctEgHItsjZ1bS5ZFPq34icl5kTeT9yM2tP88ftZ47bL9WvafGHyIXt35cm26pcW3k5Nab2hzzCPmuyLbWnycbTgCAmdoS+S3ySeTxyCk1f92hO5bGQ4P6ndZ38lI2WddMlxbl+sjP7fBdsjzunDRkz7fe0KWDkZWtP897NZfNWDan6ZsaJz83kg1bNq+Td/ryyDi9Enm49ePY09r0HboNNQIAzMwvkUfGk2Ff683JrH1c47LDZo/evZHnIhe1vnv3es3vbr0pzefZ2PqXKr6MXND6ke/Tkasit9b9ucO4vPUmNscvav7SGrOpzYbxzbr+NvJU1QAAM5HHoTeOJ1v/zbS7x5MzkLte2UQdr2zQ8rMm76ldErm/9Z8Seaz153m29cYw36FLt0ferfrt1ncBL6zr/Jy8f/JOXu7AZWOWx6z5BYpsEFM2nFdUDQDAAr4bTxyH11pv5p5s/R07AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+Df/AMqOa/4W6dzwAAAAAElFTkSuQmCC>

[image50]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAA/0lEQVR4Xu3RP0tCURjH8UcRctDNCMIlXHoDOUlLSyAtolvQlO3VIIIgSA0NIr6HcnOxVGiL0KGpKZx6CUaSa35vz/Heo53RTX/wgXue53Du+SOyySYrTBHPeEQSXQzwibw1z5k93GMHv/hAxvTOMMGuGTtzjSMcii6QtXret1crmHEMp0F7MU/oL9U6ogskzLiBctAOEsEXSlZtG1PUsS96Rz94xY017y9p0T89IIQwWnhB1MyJiy4wHy/kEt+oYog33GHLmnMiugtn2vL//Mu5RcV8ey/mx9vuGDW76EgPx0iJPq+fA9Hz5+yiI+do4kL00v2MRBd4x5XdWJPMAMpGLIbElO+BAAAAAElFTkSuQmCC>

[image51]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAXCAYAAADduLXGAAAAYklEQVR4XmNgGAX0BPxAvB6I/+PAS2EKWYF4G1RxLRDPAeKjUDYMu8AUVwNxHowDBOVAXIjExwsOAbE7uiA2EAfEr9EFcYH5QLwdXRAXeATEHeiC2AAHED8BYit0iVFAMQAAFBkUaqcAoiEAAAAASUVORK5CYII=>

[image52]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAYCAYAAAC1Ft6mAAAB/klEQVR4Xu2VS0tVURSAl2UPUAnCKNJJCCLNcxROFAqiQQ9RLNOJNsmJBvlAKe09iIgG9QN8jESwFwgNShQUFHEghhCoA2eGoTOxb7HO4d67r9dzvUdS4Xzwwdl7bc45e++11xaJiIiIiMiMp9iPF9zAYeUo3sM5fIJ5ieHDy0lsw2l8gMcSw7uiEldwK4UX/YGNOIKfsBC/4Bj+xtv+oJBkY7XYN5oxNzEcSAUu4wvsxF/40ntWO/CEDtQc78WzYrPUFLmsAajDv3jea+8FWXgDv+MrPJcY3pZT+FNiY4/jkti7kniI5VgmNqFrcTF91j7dakVX9W4sHBpd9QnsdgMBXMEfbqdLF25gTlzfI7EJXfXaVfgtFg5FMQ7gIt5xYkG8xw9up8tnSf7ZYbEJ5Xvtt9geC2dEAX7EcayRzIrEgliBSYke2D/YGtd3RmzH3mCJWNFYx1F8FjcuXU6LnZkpvCUp8j8NisQW2T/n21IqNqhP7ENHxC5FzVMtu4reIzohv50uuruaznpW9F7S+ykMDbgpAfealtE1fCyWCpP4Wrwy6HFdbJfSRVNJd2QWayX8RHz0X4fcTpdBST4/Ls/F6r2iJT6IJqwXS+f/iqbXKva4AYevYtVOc1jvpwPLJbHzc9MNOGjuvsP7sg+rvhvmxSY0gy1OLCIiYmf+AdpDWhDAAUcpAAAAAElFTkSuQmCC>

[image53]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAjCAYAAAApBFa1AAAEFklEQVR4Xu3dW4hVVRzH8X9WGJVggVKRIohYZoFCL4VZ5EMgPliCF4xASPFNQrqoXYguZBckK0MrSSwx0kQjlTShq9INKjBMmYewiw+GioH1kP8fay32mtWZOYc5F8eZ7wd+nLXXmnP2dr/457/2mTEDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOuQ6z+eecZ59xRoAAAD6gWHx9cZuswAAAAAAAABQy6eeMeVkL4Z47ignAQAA0D5LyokG/GbV1jEAAMA5caScaJMN5USHvVBONGiB52g5CQAA0Ck3eaaXk23yXznRBs96PvNs9Uws1po5f1c5AQAA0CnaIpzl2ev5oFjryfcWip9aeSr7udIZz3sWzjWpWGuFKzwvx/GLnj88l1XL/yvYFno+9Hzk+dLCfejJ7nKijlc938Sx3rslWwMAAGjYJZ7T2bGKltzFxXEzdK53suO8gJmfjZuRF2QXeP7x7MnmVMAlSz13Wvf3pPHl2VyytpyIahW5Uyyc/1A8vsHzc7Vcl+77VZ6vywUAADD4rPSciGN1m/Li5Z5sXOqtw/Zk9nM5nWtoHOtco7K1Zdm4GYeL498tFIrJv9k42ZWN079/VTaXbCononnlRKQO299x/IhnTrbWm/y+r8nGAABgkNKWnZ71kgOeTzxPe67x/OrZEddaIW0Pis4lt3k+tvCXFnTeZu3Pxld6jmXHUm6JXuR5OI5HeF6ycD3qOpbXs7M4rucLq7p72gJW10zP16lAVFF7bVx7y/O8haJO9zu/7z/Eef0VCrne875nWzwWvfcVCx05faY6gW977rbQ/XvUs8Jqdw0BAMB54BfP6DjWf+wqnFIhcSq+tsI0C+dKdK71cTwjm2/WIgvPi6noUgFWbit2ZWN5wPOEhZ9RB1B0PXp/Tp9TFnv1jPf85Hk9m1PRlLag37DQhZM/PVd7hlt132db1dW7Pb6+G19nWthyPRiPtbUrX3ke99zqGWnhOT7ReVXAAgCAAeYZz/Jysg3UuRrrua9caINbLHQPRb8Q969sLdH13GXdr2ej9e33t5Ue9LzmmeC50Krn+NQRU/Goblq6799Z+Duv2i6+18JzcWn7Vb/891LPyfj6bZzXZ4iKNhVox+PxOgufDQAABpjtVnXf2ul+C50xbU92wkPx9War3TXT9eibpvn1/Gjdn4XrKxVo6t6lZ+QmWyjONnues/DN2XTftTUqKtbejGNtpz5mYWtU9Dm61vTvUNdSXTUVd1Ot2lpVEbg4jgEAAPo9bVWqQGpUKztT+bZws/Qsm4o5FWgqyAAAANAkbcXq14rMLRf6SF+WUIdttVXfvgUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACABpwFP2yrdeBugnUAAAAASUVORK5CYII=>

[image54]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAYCAYAAABjswTDAAACq0lEQVR4Xu2XW4hOURTHV+6XFw9kKBKR8EDGkMilJEVR5EVEvDCamlCTSzwQCuUWkUt5QMotReLBLblT7pIXd7mWQuL/n7V3Z53lGOY7R3mYX/3q7LXOfN85e6+99jciDfzfLINjfbBEdsG+PlgUE+AmH8xBGbwOO/hEXnrC+7CFT+RkOjzmg3nZD1f4YAE0h29guU+UShv4GXbyiYLYCff5YKnMgjd9sEBmwG+wqU9ERsCD8By8DOfDRqk7ErZJgW+eQXf4Aw7wCTIFvoA9wrgrfA2XhvEiODpckytwjRlHuJu3wkeinWImvAFvwyOwdXLrH+HMTvbBgfArHOfiW+Bz2Biel/SSvIILzTiyHfaCG+B7uBm2CrmHcG24/htewtk+eA0+8EFQI7oUU+F6l/sA57gYX+pouD4BL5gc4ZizHBkpyUpmcQ8utoF+og+00QYDlaK5S/LrrufMznWxCPsuV4onW4S1/xGeNbFbcKgZe+5I+jNqa4IPxEbs4RIwx53puSvZZUAGi/6dfZBBIRbLoB38JHXsdtESrLYBLgU/xNcrWSKa4xd5WMOrfTCwQLRe7YPwXpYOV2i56Kw+hSdFT8IsvsNJNsAlewzXmVhH0RlgG+OOnAjHw87mnh3wgBlbDsMvkvwgYfvhg7I7RHjyperR0UV0orhZU7BN7RH9ktNwNxwVcmz+F+Fx2CzECMvmmRlHuMneip5AnLVTonU6xN4k+pnDXczC8nwnv+/z9YIvyDevcPH+IV7XxmGv5UxzVduKvqCHPbzIX3O17Yn91FIlWjotXdzCWY5dgfuiickRjp/A3i6eiz6iS25/Ih6CV804Cx4SLJFpcJjLEXYfHi6FMw+ugt1EH4A7mC2J12xP9aU9PCPJqVc4K+EYHyyRvfIP/61pIIufrhWDdpnSxs0AAAAASUVORK5CYII=>

[image55]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAXCAYAAABefIz9AAACyUlEQVR4Xu2XS6hOURTHl7zJq7wGMjAQQmTAgEhIKQOKkGe4kRgYIFGeA+UZAwk3REjyCEUhhQEljwmK8kjIIxkYiP/vrn2+b59979Xtdrsd9f3q13f2Xvs7nb3P2uucY1ahQoWi0k3elWvSwD/oIM+nnUVlpvwjL6eBemglL8rbaaCo7DSf4Oc0UAct5Cnz8fuTWGG5KR+bX/SgJJbCYvw2H7siiRWSLvK5XG5+0VX5cA726Ct51HzsxHy4mMyRB+QA84s+mw+XYOKf5GB50nxs39yIgnJGTgrHb+VX2bocrmG+/CZHhfZD+dN8PxaaTvKFeVWEavM7MyEbIBbJX0nfd/kkascstNoL1BjGy/5R+4T5tZFBDWaZ3B21p5mf5Eho8/hgMpNLI3xRGHMr6svoLX9Y00yQojcmanPuD1G7QTyyfNVsY56mpB9Fhz03OooDq8oEzyX9MF1eSzsbQQ+rvVCzrf76UCez5KW0U6w2nwB3jjRJGWke51kYw7neyKfhmIvbIa/LdfKw3BXGku775NrQ7icvhONt5nfvnfl/KX7AM5cJrpJX5IzQn2OI/CL3ytdyRC7qcBevyqFpIDDcfIIP5FTLj7sjx4XjKeaxZ3Ku3CyPmb/iLTavylRv4Hl6PBzDdrkhagOTph7AEnkoipVYan5xuD6JNZT25qvLhW8KbehqnlZtQ7uP+b4h3duFPmAPM5b3WBYIqs23RMZ9Ky8UcJ73Ufug1V6AGlrKBXJe0t8UUIhIKegVfilSN8JxDIvCFiBb4KV5ZjDxjiHGonQ3v2bSkWcvUPE/ymHmE2822GekFncwyw5ScEtpRBkKFRkAFDkmxBfNSvOiRqrDRvMJ7THPPqCy8hxm32Z7uFngDvCFwT7J3nC4e2NLI8rwgsCXy1bzQnTafE/1NN+jZAIvF9l/78mB4ZhfPu34f+fQV6HC/8Bf20eIejiEDGMAAAAASUVORK5CYII=>

[image56]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAAYCAYAAAChg0BHAAAC+klEQVR4Xu2WWchOURSGl3nOkOHCPIQiZIgLcyRRxlCSiKIUUYjMQ2bJPM8yRZIhxB8uRGRKQlwYUi4kFy5c8D7WOv2nkxT5pf7z1tO393u+73xnr73WOtssV65cuXLlypUr1z9TZ3FA3BKdwqsvnoupyZeKg+qJy6KSuC0Ohl9LvBMFMS8WmiP6iKbim5ieujZZ7EjNEzUW98ST7IUiVG/RPOOdEkMy3l/RUvNg1E15Y8Wk1DytiWJ71ixCPRTdMt4wUTvj/RU9Etcy3nnzMvqZTpsH61+Ikv0symQvFIXoF2TFgpTXQuxNzUuK5eKQWCc+mJcWKifWBPSc1uFXEWvFFrFLNAm/u9gtVpnfE00RZ+KTLKUEKN9l5lnx1ry3tRTtxEpx4scvXVXN77lJHDHfKIK3TVwQY8RM800kq3+p92JzjKuL4/GZiEVtiPFg8TrGJcRZ0Tfm/BHX8a+I0eGzoJGilzhn/qAs4LB50KaJ1WJrfL+n+dsNEbB5MUa84disFzEvLa5a4SJriI9iqGglHljhW3G4eaB/qUHmu80D8EBEPxFp+lU0i/kM8wxBBIFA8rBLxIjw+4k35hmVVoE4KhaLWebZVdF8AZRpz/jeKPEsxjxT4iNe+3PNMxQNMN8cgoK4F5lOhjL+ZIUlRqaxsX8sFvwqNT8pxok6YrZ5WmbFYpPXdFpfzHcrK0qNh64Qc0qItKeE8cuLmqJUXCfTOBMRGBa4L3w0UNyJMZt8MXXtrnlgq6W831J7cT3Gjcwzgdpdb16L1GEiMqO/GC/2pHzqH/+p6BgeGceiURfxOMZlzR+6gegqboQ/33z3O4j75m8++gD/lZQXoke0iTFZQAaihuKlebZwpPhj0bDYbeqX9NxpvgDKYIXYKPaLCeb9Ap/5IvMSol/gE1gyiXuw8ywY0TM49NGEaYJtw6eEaJw0xB7hcd64ad7DKpsHj7610Pze9KxEl8xP2Ijg8R+UKVn23+qY+bkhl3kD5GRb7JWcfvnM9T/oO84AjnsOkNKCAAAAAElFTkSuQmCC>

[image57]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAAYCAYAAAA1Zem1AAAEtklEQVR4Xu2ZCaimUxjH/4xl7PsusmUte8k2SJR9l8hkyTIRI5F9IoTInmzNNFmTnWSnGWaYQWiGjKWmEY1kSYrE87vPc3znPn2fey/3c6f7vb/6d9/3PO/7vec97znPcq7U0NDQ0NDQ0NAwoixueso03/Sn6Q/TdNMGpuVNL5q+CduPppdMS/XdKZ1s+iVsP5lujPbRxi2mWfL3/F0+BkVfhu3Iv6+WjjW9Kb8eMX6XhO0M09uV7QPTSWEbY/ow2bYJ27BxofzHT80G4w657cBsMA4zTTUtkw2jjK3lY/BQaufj3BO2var2xeSL4KuqrbCO/Pq3siGYZtojNw4XzCoefn42GI/Jbceldl4Sb7BCah+NnCYfA1Zk5hi5jQlfM8/0c2qD7eXXf5wNxuGm83LjcHKI/OHXpva9TbeF7axkO1v+kr3AI/Ix2DwbjCvltmtS+8xoXza1T5Sv9G9T+3KmZ+ULqGvgKujUXVXbkqbxpqPDNqmy4X6erM5HkrXl/RuK9uu7c3Aw8N/L43FmadPn8o+2brK9IH/W+lUboW5NefzFtkRlu840rjrvClvJH/xo1YarJvbuEzZWduEBtZ/doxEGn/efXLWRxG4nn+wkUDtUtgJjxH3bxjkhrnjAl8O2VpxzP7G+6/BAHkwmCczOg+O4xBQ6DsTzS+O4F7hK/v6fyMfnPXns/cg0wTS2dWk/Ssgj/MEparnlkvewwPAKZOmrh20gNpT3o1Myx+Tjt9fLBsCFYKRUADpVoNTC9rx8QryiVonVC8yQv/8W2TAAk+T3kWBtadq1st0dtt1Ml5uOr2yD4QLTTbkxwNPOzY0138mTBDpExworyjvFCzNLd69siwL/Jkbv23fnwLDKuJ44PFTOkd9LyVovHLghbCS4VC5DhaStrt1ryNrvzY01zIJfTaendmrC3+Tuipq6HUeYnpDX45fJXftr8k2Xwp6m+0zXq5Whku1PNl0U5weYpsQx5UdxeyPFePkHuT0bBsEJ8ntflbvbmovDRhK3UbIVyAO4jtr91hDgfanRV4tzIJ/i47NpRbbPZlZHiBNfm1bOBvnO2Wfy1d0OOkSiQRwrseZ9045xzAd7Tp7JrySP96vISzRq1DKQ/MWVAXXpUXE8Utwv/yCHZsMg2F9+L2OTKXU579+Jq9W/Nies7iL3qCSABRbLu/IJwNjyu/8YZh6Xd6AdPOSg3FhBycBsKiuTlYx3WDXOXzc9LK85WfWbyLNQJhWeoCR+s9UqfZiVG8fx/w1l5gK1XD2Jz4P9rhgYJvmnar9rSNxmKxRv2Q7GBi/KjlyBb8BiYozr+PyOWit4Z3m/uwoPLFt3uHIyQzYBSNz46HWnC8xA9sm5pkyO4u7LpOlF8AZfVOd4vx/kyTD1OfU4MG78f2KzOCcvwAuRt3QFVi6bCrhmoCYkAeFjEUtw6TuFbQ15nAZKgJLosIHPPwCA36PTvQoeb051foVa/4cgPjNu5ELE8YXyEg+9IV/dnXKp/8w40zPVOcnW06Yz45wNAVwfLoeEjJKtQExmQvBfIjpIXCKudapPewVi9M2mO9V/VxJPyRhuGucnynfVyG/Ola/oMu4NDQ0NDQ0NizB/AeM+GEWKpRA4AAAAAElFTkSuQmCC>

[image58]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAYCAYAAACMcW/9AAACbklEQVR4Xu2WW4hNYRTHF7kmt5qHGREaUiQPMlPzQEgouUySXHIpJaYoRnnzIklKLiUPXohElGZCcimlKKVEiObJJSmTYh488P9be7PO396cM2ef8jC/+nXOt9a+ft+3vm+b9fF/MxBeguM0UQZ74DoN1ooTcLkGy6Q/vAPnaqJo1sDLGqyQRvgWDteE0gIfwG/wO3wCb5q/6XPYncTpRj/lJ+yNN3BRiPWWq3C3BvPgw/FhJkiczIQfrXSIlsJXsF+I9ZbN5i89SBPKUPgVPtJEoAM2hPYZeCy0q2GSeSfN04Sy0PzAAyHGnjoc2tfCf/ICtkmsGrrgLg0qB+3PN9oOj4d2ZKT58cs0kVAPz8GHiYvhIXjBfJXgCCo3LP9+v7hvvwsmuioeFJhhnp+tCfOH6ITjk/Z++Bluha2wBy5JchG+xHkNRkabVzyrPGWwefHUhVhklvmDTteEeWHEdZVz+R0cANeaT6esHj1lXtC5rDC/6b4QY/XFk1bCbaGd9ih//wXXyNMazOAkvK3BCCuXN52jicBdOCq0uV3mDX1kmvlxGzSRAYf9igYjz+AX8z07Cw6XLkPDzB8ga641mfcgh7fd/LiJSY6bRN5OxlXlqAZTpppfiJNf4fI0H36CUyRHuuAODYJb8DUca94JvH46J/ngW5L/ykvzgiuByxDn4GPzC71P2lGemPcShL12VoNgNbxuvv2uNx+Ne/CI/X05472aNVEEm+AHy58ylcAXeKrBohhhPhJ5a20lcGR2arBIuHvxG6AaJpt/sQ3RRJGkVbxAE2XC81ntLOqaw4q+CMdoogz2Wuk3bh815Qc0A312bH1UNwAAAABJRU5ErkJggg==>

[image59]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAYCAYAAACyVACzAAADQUlEQVR4Xu2YW4hNYRTHlzvJNQoRQorkQS5JhISSW5JrM0SEIrfCy5QkScml5MELkUuUS0iMUoTccglhHuQSihQePPD/W/uYddbsPbP32fthHOdXv2b2Wnv2+c53W98ekRIl/gWawBOwm0/EYD2c54PFzF441Qdj0hBWwtE+UYzMgSd9MCG94FvYyifqI8PhTfgT/oIP4SXREX8KvwRxWq5/8gfOijdwgokVymm41gdT0ka0vY1cPBPYQeyQHi5OBsFPkr9cJsMXsIGJFcpC0Y5v6hMF0BFuhbfhIsnmmXm0gN/hHZ8wnIWdzfVBuNtcp6G36ECN8YkEtBftpAdwBWyWn86O8aKN5Yfl4IzZYa7Pm9/JM9FGZUUVXOODMWgNN4vOpFmi20OhDIOnpHrrmZGfVrZJzZFdDveYawv3A94/xScCOsHD8FbgRLgdHhWtnpzJnosS/Xlh8Bmr4V24GDbOTyeGW8FHWCY6AJFcl+pN3DrT3mQYKJof6ROiX+Ic7B5cb4Ff4VI4Hf6Ak4KchR15xAdD4LluiWibs1puI0S/D2dmrbQTrYSVJsYGcEPvYGKWwaIPH+AToiNkz13c296Jjvxc0aUdNrP2ixaZuhgCX8N1sLnLFQoH108UroQaTBNNVpgYK4htONfuMnOdm1n8WRc8Qx3wwRD2wSs+GAE7eyN8DFdJ+k5j58f6bFY0fvFRPmG4Ctuaa77aRC1DS3/R+8p8IgQuQW6uSeCq2ATviRaHsBkbB24Tx3wwjCfwm+heEAaXjj8itBTthLC9h8uEM4kN51LhfT2DHCtV1Imf1XaXD8aE28ZK+AhuEG1fElhJb/igp5/ol+Ga9fDoMBZ+hn1djlSJNtBzGb6EXUUHgs/PjTg7j5UrjOeiRSANnP2s7K9EX9LjvkLNFm0n32YI99e/xyIeEbgn3Q9ueh9cW9n4qI4knD2HfFC0olwQfVWaLzorr8GdUvtRg5811CcKhIWpQvTYErdacgXxUH5GdIZzL8+MBfCDRC/fJLATuVkXLTy4cUZGncWSwBnKqlbU8JTPd8Y09BH9T0fa8l/vyVW3cT4RE/49qyALzX8BK91x2MUnYsAyX+6DJUoUP78B1DSmTzeCLWoAAAAASUVORK5CYII=>

[image60]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAYCAYAAABJA/VsAAAB90lEQVR4Xu2WzysFURTHD0l+JUq2Un4vlSwsLKRsZGODZKn8AZKyoISSDUJsRNkpVqKQHYWiWEhK5McGCwqJ75lz55l33ryip+fSfOqzeOc7t3fPzJ17hyggZpJhE8zRwX+lFU7Ad1igsn+PDU0nwT64DnfhMEwNu+KHsaHpBThP0nwKXCa5Ab5UwTX4QDL5J7gF62ACXIFHJnuDO3DIGfnJbzfdQDKHXE+tzNQqPbUIFkkuytcBaCbJunRg4KxQF+PILLxRNX7i/JC6VT0EP9FbuKcDwxxJYxU6MHBWpItx5AAe6yK4g6u66MJLgCc+qAOSO3YPr2Ciylx4bLEuxhGeHzeuuYanuujSQzLxGh2AapKMNwpNPRwgySdhW3jsSyPJ9V/1BWY4I6PD1/k1fQkvdNGFNy79Z9qO0NX2wZuvX9Pc8JkuMlkkTUXb3jdJ8lJVt4lzeKiLJK8kn9kRuMutVwcgnWQH5GViM7wBn+giyTHMx3EE4yRN+73P7vk3rYMY+O47/QgznZHRmSHZqb2kkYz325ydD49n8v9kGyUZ2KIDy6glmWeep+aeSOWemkOJCTZ0YNgnybN1YCH8rT3i+c3fFlOe385d2IavJE3xO8trn5c4n8VLJMvFXWKc9Tsj7YXn3Q7HSJZ7p6kFBAQEBAT8JT4AcayM29VPCx0AAAAASUVORK5CYII=>

[image61]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAYCAYAAACyVACzAAADP0lEQVR4Xu2YWahNYRTHFxmT2QMihBQhyZDkGhIiU5Jr6CLKVGQMD7wIoWQoeVAiMpchJEMpsyIZo/sgQyhSePDA/2/t466z7t5373POpTucX/2691trn3v2/r71DfuK5MlTGagNj8O2PpGAlXC6D1ZldsPxPpiQmvAqHOITVZGp8KQPZkhH+BY29ImKyAB4G/6Ev+AjeEl0xJ/BL0GcztSP/IFV8QaONLFsOQ2X+2BFhh3EDmnv4qQ3/CTp02UsfAlrmFi2zBbt+Do+EcJoeB0W+MT/oj78Du/7hOEsbGXaB+BO086FTqIDNdQnIhgsWvn7JXxw/ykjRG92o4mxYraZ9nnzO3kOF7lYLhTDZT4YA9fMW3ALbO5y2dAfnpKSpWdSelrZLKVHdiHcZdqWxqLXj/OJgJbwELwTOEr0gY6I7p6sZM9Fif6+OAbCfXArbONySeFS8BEWwUYul8YNKVnErZPtRYaeovlBPiHaEedgu6C9AX6F8+BE+AOOCXIWduRhH8yQXvCE6BLRw+XKgp3N55niE56mojsh14AUdUUX9BYmZukj+se7+4ToCNlzF2/8HawFp4lO7bDK2iu6yZQHXUSPNJxS9VwuDA6uLxTOhFJMEE2uNzHuSvbGOXcXmHaqsvgzDp6hOEXi2AOv+GAWcPA3wQ+iVZ1kt34tCb+bOxofvMAnDNdgE9Pmq03UNLR0E72uyCdC4BRkJWQLq3UFfABXwWbp6TLhMnHUB8N4Ar+JvuOFwanjjwgNRDshbO3pK1pJqZvndR2CHA+yUSd+7rY7fDABvO/58CFcKuFTPI678KYPerqKPgznrIflOwx+Fl0DPMVwsQ+Cy/CV6K7EgeDfTz0AO29u8LvnhegmkBSuq3PgPbhWYnawGApF75NvM4Tr699jEY8IXJNYsrzofdC28uajOpKweg76oOiOckH0VWmGaFXyxL1dyj5q8Lv6+UQE3ESewjWSWydZOIN4KD8jWuFcy8uNWaKLaNT0zQR24mMfjICvXOskfQ2t8HBEWZFRZ7FMYIUu8cGqBk/5fGfMhc6i/+lIch6q1KR2t+E+kRB+nrsgN5pqAXe6Y7C1TyRgtaT/jyxPnmrCb1B8pi3fSxEeAAAAAElFTkSuQmCC>

[image62]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAYCAYAAABJA/VsAAACWklEQVR4Xu2Xz6tNURzFF0l+JSQjj5TfQyXFwEDqvSQpEyRD5Q+QlAElFCYIUYgyeKUYieJlQBSKYiApkR8TDCgk1jrfc17nrXvece+755Tuu59ag7vW3t39PXufvfcBurTNeGozNdODTmUbdYr6Q823rOOpo+ip1Eo3SxhH7aduU4+oI9TEIS0qpo6iD1ML3SzhCnUZUfwE6jriARSyirpFfUUM/jt1l+qlxlA3qOdp9pt6iBhQnqqL7qEuulnCBsQYZuW8pam3Iuc1cBXRaJ4HZAsi2+1BirIFbrbBSWqRmyXoAX00TzOuSdpj/iCa0U/UYw9SLiEKW+5BirJWlmIZmuULbv6Dp9QLN8ln6qabGVoCGvghDxBP7Av1nhprWYb6tjIzZZxG8WorQ+NT4c4H6pWbGXsRA1/jAVmNyLRROOupg4hcg90+NC5kE6J9s/pJTUl6Do/aFRX9jnrrZoY2Lv8z187B1vXRT81xswm0+RYVrYJfuymmIYoabnsfQORLzK8ancnn3WySN9QzNxGvpM7sBrLlts8DMhmxA2qZ1I2OxpHuC9qAX7qJOIZ1HDeg40FFF73P2fl31oM2aPWd/oa4nZVxDrFT55mE6F+0OScXjx8ovrIdR3Tc6kHFDKD1HTvPWsQ45+a87ERalvMSFqfBHQ9SniDy6R5USB/io6VddNc+lvutu8WZ3O/kKTygfiGK0jurta8lrrP4GmK5ZEtM2YGkZ/Xcp2a7OQI07h3UCcRy35V6/x0bqaNudjK6+t6jZnjQyaxDfP+OKnStHVWz3KVLTfwFNDWZJHfGxAwAAAAASUVORK5CYII=>

[image63]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAYCAYAAABZY7uwAAADZklEQVR4Xu2XachNURSGlylTpgwZM89Dwh9lDj9MKWQoIlMh5QdlliHJkIgkM5E5MpMiJENS5sKXIlFESUi8r7WPu89yvnvPd11/jvvU2717rX333WftvddeRyRPnlxTBpoM7YLOQtXD7sQwEtoJzYDaGF9aTkEvoNFQDeNLEsWghtBs6Ac0KuyOpqRo5+XWkXDuQ8esMYqyogFaaB0J5yZ0xhqjKCcaoHnWkXCuiubbjFQSDdBc60g4V6Dz1hhFVdEAMXH9T1yGLlhjFE1FAzTJOkR312bRSK8WvQUC5kPHvXYceEuehg6LLgwZAD2DugWdYjBI9AE5r86evQv0SDSvcq6XpPBEfAi6bY2WmqITvic6qIV1ESfQXzSILZ29OPQK2ufacRgMrYMqS3hBerj2EtfOBGu03e77NWiP59siWq4EHIW+S3hhA5pBb6GJojf5H6yAvkF7oRLGR0pBJ9z37dAbZyPtRR+KxWVcuGuqQONEf9vJ83EO3F1xmAV1hRqLjsOiL+A5tNVrN4Eee21Lb+i96LP1Nb5fQWkHnYMOGJ8PH+oTtNGzTRedXHPPFhdue9YgPlz5VsaWiWWic6jt2kGqGBt0EA1isNssraEPouVNPeML0VF04KHW4Rgu6u/p2Y5ABV47LrVEx1rs2Vhm3PDacbkjmh4CuJs5diPPNgEa47V9dkBPJfr4hagm6W+xpaI7KDin/Hwnuurchf4KcZu29dqWfqL/1cuz8SF47HxaQAONzYf/y3F4UQSshT56bfbhJRKVWwmTPE9PRiqI/tkc63BMhT6LvtCSaaL9Z0LdJZUDmMBpfy2pXGVh8NhnhGszl21LuX/zUrRfB+vweAhtcN+ZBh6I/obHhbuCdd0Q54+CdVCsAJUXHbiwQrE0tAo6CW0S3coMzhPR3VPR9eNLLm+Fr5L+TZln/ovo6q4XvdUszFMcZ4p1eLAsYHlwEborekseFD02rJK5kOlggIr0qrHAOrKEVzkT5t8yDBpvjTnkusQMEI8OA7TI2LOFOy0XsDBlrfKvuCWpMiYtTGbczmusIwtY4eZiJ9aRmJPPEubIAmi/sRcKiysWTH2so4jwxousSosI66y61pgjmFNXit7MLBRjwazPeoev/wxUg5A3ObC84K3J15r6xpcnT474CXAIqBEbOvCHAAAAAElFTkSuQmCC>

[image64]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAAAYCAYAAAAbIMgnAAAD4klEQVR4Xu2YaYyOVxTHD0rtJQiVkLGkCxUfiNYXxppYEksIStIhQ2r7YCmh6Kh93/mEhKoWESSiQmMQO5UUSaPfkFoi9bmShv9/zrnz3Hkmmfd539c780ruL/lnzj3P8t7n3nPPPXdEAoFAIBDIOd2gtnFnIP85CtWNOwP5zRhoetwZyG9qQ6USVtt7x3ioOO6sSVpCG6E70GNoaMXLAVAHOmt/84JO0H1ouLULodfQJ+6GPKAIugbdhQ5CX0K/Qr9Aw6LbsmYb9CYNXdTHUtIbOgfdgH6HekH7oEPQIu++xHwI3YNKPN8Hop36wfPVJEXQYtFIbyDatz+gFqIDxwnNNfWhK6J7XLrw6MBga2ztS9ArqDu0VvR73LXETBZ9sL3n62y+rZ6vJjkF1TL7M9G+zRadRK64vnYtlywUHatM2C7R+PI7HkFHrL0emmZ2WnD5/hXzfS06ODNi/nyAZTj71jF+IYd8BN0SzUTZ0lW0/5kGQRkNRfey/TH/LvP7qzBbuCrcqsmGn6GHcec7JN097oI+lhgXeAUxf1oUir7EX6qNoBfQDmszPzMPn7R2G9FChuyGlpidij7QqJiPUceUMdDaY6XiXksY5atED731oJfQXu/6SImil31fDZ0X7SfhHvg5NAn6zXzpwH2UlXY2lSR/+0ezmfb/9q4VQFvM5j46XzQLtjYfrw0wu5x5ohPHKCPcIE+IbvbcP8gy0X3lT2uPE30x4YS7Z5OwSaJN+CvTT6JnI8IqcarZjv6ifZwFfWs2J4e0Ei3Pm1h7gWi/eZzhxFH/iQ5IF9EJSJc1oltHprD4+1/027gImMku2zUGJb+/h7U5nuz/PxIF3nPoU7PL4UPcKLlquOSfQjtFB8TRDpoLbbA2I2Cl2SxiXLRPhJamEAecFSwnn+9lFPM3GdWEffnCbEdT0QKEK4eTxNV5VfR/hcslepbwnT2h69YeLRXL9RWenQRG/U3JrJL0WSe62pmp+kFnTDw3czIdrv88MhCOL8enEs9EIyEVjJBCzx5i9gSog9lJ4NmFk+cCg6uJaY0UQP+KRiEnK1P4fgaJs7liCP+TX2R2UjZDI+LOHFMi0THsG+gY1Ey8+sCV/HOcowoeiB7SuUKeSBQljPiksBCaGfMVQ3vMZhpk/mdQuNSRCXzfFLMPS/SbzBrNzU7Cx6Iru7o5IFFq5uH8O9EtgPt7Gfw4TlySQWIBwAKBxcj3oimL6bVS7q0CTozbcB0cHK7gEtEgOC7Znx25l3GlUDx7lYpG8CDvniQwvTEtVzeDodOiBSHH3A++MphObvuOQDksZjh4gUAgEHj/eAuzB8gbIYELbAAAAABJRU5ErkJggg==>

[image65]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAAAYCAYAAACcESEhAAADwElEQVR4Xu2ZWahNYRTH/zKTkCERLoWMZXhQkmMWIiFRFBkiD7woQ9yMGR+8eDBknuJB5qHczJlCJGW4URIPphAS63/X3rfvrPOdc/Y9V9e52b/61/7W+u7dd6+9vm+tb18gJiZGqSWaJdotOitqkuyOicBE0S7RfFEX48vIKdFL0WRRU+OLiUYVURvRQtFv0aRkt59q0MlrrCMmZx6Jjlmjj9rQ4C+zjpicuSU6Y40+6kCDv8Q6YnLmKrR2ZqU+NPiLrSMmZ66Izlujj0bQ4LNQxPwdLokuWKOPdtDgz7QOh96iQ9DlxDfaC1pQWriTygG3Pr78y6Ii0SJot1BZm4AjojvWaGkmOi16CC28PsaIfoiGB+P2om+iV6UzygfPGMwUtrv1Ats2ZE+IfIYxeieaAe0mU1gr+inaL6pqfCHNRe+hh4eQGqKPon2OraFomjMuC+ugge7g2MJeuZOoAfRlXBOdgK7UysAgaOzeioYYX0nAu4nOiQ4bX0gYmKGOrW9gmxuMV4qOip6XzohOY+gqYua7sE17E1xvEQ0IrheInkATIJ/pDE1Qtu8tjS+JntBgjrMOaLZ9FlV3bIXQ+V0dWwK5BX8EUot9XdEX0cFgzO2ISUAKoPP7BeN8ZafoGfTUmxFmnw1AyHXRRWPjOMzKkATSB59b0lT4t7aR0HtziYbwmrY5ji0kAfXxGO/CZe0mg6UV9JtLTetw4LbZwxodmM2zESGg0JXMHSUrLHJ8IHYYluWiB8E1b7oBOvdA6QwlgfTB3wv9mXnWAd3PP4nGB2M+IL8xcb7v4xRXg1t/SEfofCaEu0JdjiP930AGQv1PrcPhLnTOWOvwwD4/UvC5zPlLfYcstoBboae1m8G1LysTohfGFsKa8Ata2H3wwdm+FkHnPBa9dicETIEGnt2RCz8EsrNgR+Z7YWQ19G/gvXxwJX2Atojp4L25HbIJyAaDX6bPC0utw0Mh/FmZEBUbmwu3NpuxPhjY70hdWd1FG6Grr62odbK7hM3In07oBiIGnw/MgBYauw8WP19WJqDbRTpGi6Zbo4c+SF1ZPIHvEfWH3mcVUvd8ctIa/iG3oW1xVlgIuWQ3WYeBL4lLkyddF7ac7Pm/Ql9gwnVCs5X7X5T/E4T9PVvgEJ6kaQvF1tQW71GItnIrAtadYqTGKS3boQeCwdYRwD3zHvTh2Xpm2hst7NGHWaOBRZP7Pn8373EfulqiwrriPUlWMOym1kNrg9vBZYTZOQFaWPkSCpK8MVFgku0QrYC/JsXE/Mf8AQgXxXpCoSCAAAAAAElFTkSuQmCC>

[image66]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAYCAYAAAAYl8YPAAAA9UlEQVR4XmNgGAWjYAiDBCA+DsTngXgxEJsD8UogXgHE3ghlhEECEFcBMTMQcwLxfyA+B8TCQHyQAWIJ0WATEDNC2RoMEMNyGSAGg1xmD5UjGWQyQAxTQpcgBywD4lvogsQCFiBuBeIQIGYD4jdAPBdJPgCIE6FsIyDuAuLVUH4ZEM+CssHAiQHirRwgzoCy26ByokC8E4h5ofwWBkiY3oXyfYF4A5QNBnwMkEAGxRpIowsQH2OA2N7IAIlRGJAB4iIg7oPyuYG4HiFNOjjKALEQBOKB2ARJjmRwD4jlgJgDiDvR5EgG0QyQsMsGYkE0uVFAIgAA7MEmLkPYkMgAAAAASUVORK5CYII=>

[image67]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYCAYAAAAh8HdUAAAAsklEQVR4XmNgGAVYgRUQ7wbiV0D8H4i/A/EZIJ6HrAgXWM8A0WSMLoELMDFAbLqBLoEPWDBAbJmMLoEP1DBANAWhS+ADh4D4FxDzo0vgAiCFfxkgGokGICeBnNaELgEFxUAsji44hQGiyRldAgiEgPgouiAIXAfin0DMjSbOCMQLgTgbTZxBnQFiCyhFIANOIJ4ExJ8ZkALHjgGi8AIDRNMzKP8cEH+AioHwMpiGUUB3AADC8SRQwDvm9gAAAABJRU5ErkJggg==>

[image68]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAYCAYAAABurXSEAAACDElEQVR4Xu2WXyjdYRjHn9bMpCblYiIrWbliFBeWUDQX2iW1mpRSlBWSEFN2MYQLoQ1jSZKWXKAkSf6U1UiRq11skj9Fu3Vj36fnOee8v7eDnM7FOfX71Kee93ne3++c3/s+v/ccIhcXFxeXcCAGzsGbW5zyTQ0NIuAiyZdug6NwU2OPhd7ZIUIr/GCMm2CdMQ4L1uEbO3kLz+FPeGIXgsATOAt3YIWz5CSepIcT7cIdvIMzdjIIlMAV2AyLrJqDcnhhJ+9hmJztFSw+w3Y76Y9xuGQnlTzYQXIz88Xch30kK7IGXxo13rGvJNd8h081XwC/wW7YQ3Kth8ckO3dF0no8707+kHyAzSP4S+Ma+Elj7ul/MF3HkyS7xXCrbcEEkutHSOYnw3OYpPNWYanGJqfkXAC/8Cocwxy7QPKhB3CP5GThY5Ipg9OeSeAI5mvcCbfhR5Jtfq35QTihMd/3jOQBTfhBL63cg3mh8vH4G77V/ACs1vgVySkSDWPhglEz2YCVGvM1h/AZjPLOIComabWAiYTXMFvH8zBDY26ZVI1bYD98D3NJerlea7wzvOK8gj/Id6TyDxf3Os9L0RzTCIeMcUDwzRvgF/KtHv/0//XOkC+7DMd0HEfyYveS/A3gB2EySXaId62K5KXr0poHvq7WyoU8uzDNToYqvJN8/PELHzZwH/OZn2UXwp7/lCteA4p8QpkAAAAASUVORK5CYII=>

[image69]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAAYCAYAAAA1Zem1AAAEpElEQVR4Xu2Yd6gdRRTGP7tGJYktEVsaFhR7UDDRp2gSMWAsqCgiNowiqBEsEVs0wS5iSbdEDbGjYm/BjiXYEFFRQRMF/xARFAyi3y9nljsudy+Y50vuC/ODj7t79r69M2dOmXlSoVAoFAqFQqFQKBQKhUKhLftZC6x3rdHJtp31lXVe9aXCCray7rQ+sE7O7C9Yj2X3Xce21kvWxtZ71v3JvqW1zFqc7gvSWtYr1kjrZuv77NmL1t/WBpmtq5hqHaoYPAOdkj0725qT3VcMt5ZYn9cf9CGHWDvWbI9bR9VsfclYa5piwb+0nsie7Wp9kd13LdcqFnqbzHaKNTm7zznTml039iGfKBydc4yilK5qxil8dUJmG2Y9mN13LZ9ar9VszypKezuIZgJhVUAb+c1ar/5gNUGP/t3aJLNdqn8vfFdCfyZCr8xsO1n3ZPdrWzOsB6xbrJ8V5R7oSzcl0eN3S/ZNFb3sLmueNSLZD7TmWzco3gnnWk+mT6oLZZmWMl2RzUsVe4mdrT2t661HVvxlMFDxzjushYogJDBmWc8pNk4XKQKUatTEYOtUa536g4y3rJez+3UVvbsKxKa5QLtxwgXWU4pqAddYZ1m7WN+pFVQkHu30Ous+a0NFZeP6asWaPa1Yv7b8pIhUYLIPp88KFuy2dD1JrY0I/YoXH5bucSLPseOMk5KdxTreOth6RuEUJk25IyDOt260Zqbv9yhOAUAwXJ6ugZMAE/k63ePoV9VawM2sX6yjFb3zY7VOD8cqHN8EgUzQM54mFlkfKubAPPHb/ulZp7k0jfMIxcmHJMFHgL/w1UaK/QBVbWvrbUV7JfHmWkMV1eRERVUeZP2hmHdbjlRkKQNigGRNBT+y3BqV7i9UOARYYIKEhSAKj0v28dYPigHlLFY4ik3NxYqqMEAxaVpHT/oeZZAJAmOq7MDR7zJFZQEcReDhSOBdLBaVhetf1co2KgRB2wQZ+Jci25ogyD6zvlFUDIKnotNcmsa5l6KC/JhsmyvGQKUFxgz49x1F5b3COiDZ8QcVIk+GlYLF/Da7f1RR3oZYl6i9U1jI6qiW0xRtlH8WhAgGyjoljslip0RtoVZJJeI58zNJHHFvssNE6/10TQA/nz0jE3sUkd8Ev0MpXFma5tJpnBMUram6fjNdAxkLVEJOQu3AH5xMesXe1uvpepgig+mVtyp6X37MIKMPt06z7s7s9CjsHEH2TTYqBU4ASh9ZAusrFmR7a4z1RrITxWTDPtZHihJG3+W3qjIJ9OTd0zXZS+WAHRRZSNZwrGyC4DijbvwPNM2l0zgpvdWe6BxF1QP8NjZd05unpGsqFJmNDyjpf6oVWL2CzQ9ZSr+kZNIfmBClmY3B7YoswEH0LezVBoGSQu/BTtBQAXgHUY4DgL7GP2zY0FGG9kh2SiGRzqbloGTjPE3Es2dgk4Iz2SdcpXg3e4QK/pFB/wOcwm/gRLK2HYyRv+nNsa1pLp3GSeXChwQz/uLEQyKdnn2HMRMMBC97myoAyOSqGnQ9Dyl2j6sbnEbp7A3dMpeuhE3K8Lqxn7ImzeV/hZ0uu08++ztr0lwK/Y1/AGOU83h9dPEkAAAAAElFTkSuQmCC>

[image70]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAAAYCAYAAABz00ofAAACxklEQVR4Xu2YSehNURzHv4aFeUhELEQhQwkLJJlK5iFiwUIZosSSkr9po1CmQrIRMpUhCREWplIoZMHGypBhYUGJ7/f/O/fd8857nv9f3Xv1Op/61Du/c+579557zu+c84CUbXQ3XUUf01/0Hm3rtYlkQEfvc2s6hrbyYpFIJBKJRJrJNPoatps5GdQVxUb6BXZPq4O6umIA7CGXhRUFshx2T32DeF2xAvaQPcOKAjlOn4bBeuM07ND0v9CCfqA7w4qC0OHyGr1P79BZ5dX/hg5Lesi9dD89Qx/QTbSl164aC2Azpan+oB0ar6zNCFj7NfQEvUxv0oV+o5w4CBuU7Vx5NuzeprjyVaSH0KWufJ52c7GZ9A0d78olxsK+6BXSfDrPxUa6ct5sgP3+OaQPtYd+LrXIh/X0K+0dxF/AskQfWCeLuXQf7QK795UuPsGVt7tyCY1sjcShXmwGrLFGXhFcpy9pey+mtPMJlobyoBesX46EFbBRrftrQDoL9QK6wjYo6rtRLi60W9RsKOM2vRXEdtF3+HuqyQJ19ne6NYg/hKXBWnSC5eIbTXS0XVaVdbAOXBRWwEa70vMV2P9bPloDngexo3SwH+hMf8L2zQnq7Lf0sBf7E83N8d9gnVML5US1HefF+rvYEi+WNQdgv9kvrCCnYLNhYBDXLNE1+sc3QWvDI6/cSLVcniwek2kP5L+zUC7/iPJ/SDUD9dKU76fSxV5dVmyB9UM4UDQwNat0PyHTYddM8mI6j1Scj/RW36M8paijFdODH4ItvnnyDJUpRbuKs7DRo/wfdkYWDIeN6vmurLVFa57SywVYB3ena12dGObiycDQdxxzn8tQbt8cxAbB3qi2cMnKnBdtYAuoRo7PHHoXtsup2JZlyER6EdYXWhM0G4fAOlrbzCd0R6m10QBboy7Btufa5UQikUgkEonUGb8B+2Okbt8pGMQAAAAASUVORK5CYII=>

[image71]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAYCAYAAABqWKS5AAACCUlEQVR4Xu2WTUhVURSFl6ZoVJioEFlOHIQ1UVGaWUGNw0YpguLICBSCDAQVLAqLpIkJogRFP0SBIP6Agk8bKIIDcyIITRIJHEc0srXY++BBZ74GV7gLPt45+5577zn77z4gVapUqVKlSriukrdkhdS77SLZIl1hURJ1gcyRU2SVvHN7GdkhGZ8nUj3kJqkke+RBdO0eGY3midUT2ObLI1sr6YjmidUGWThgm4alVaKlfJfX+yPbJfLGx3nkGZmFpdIAmcL+warIF/KSTJAa2DOfknlyztct+toW2LOCGsg4eQ67R+okM+QhLHW1PsevHdIvMuzjYvLZf6VbsI6kbtTstl7yAnaAbXLF7Y1kknSTk+QnbPPiLykkl8mar78Bc0Q+KSLvYe+Vk0ZgG1dN/iC5fs8h3Sa7sA3qpuro2nlymvwmBW7TQcfIIPngNkmbX4e12jrY86Q7MM8HPfbfDPkEi+YjWOPQu86S7+S6r8tK12AtNWiZtJEl0h7ZFXqlj6QUUITCWKknyRltPv6D/ajFiiOVtZQGr32ssH8jJ2B1EVKpFHaYMz5XBMPBPpL7PlY7Dim5CYuQpG+LDi/dxX/8xnyFeV6efEVK3K4wq5j6YMWqggzSIYccpUQG1hRUQ0G1sLTTGhVthdu1LkQta6mg5dljJ7VN/c85dlJxqRvI800HrqU6qv4Bi8tdidRVtfUAAAAASUVORK5CYII=>

[image72]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAVCAYAAAAaX42MAAAA2klEQVR4XmNgGAWjYBSMgiEMrIB4NxC/AuL/QPwdiM8A8TxkRcMRrGeAeNgYXWI4AiYGSAzfQJcYrsCCARK7k9ElhiuoYYB4OAhdgggwkQGil1h8EKJtYMEhIP4FxPzoEsMRgDz5lwHi6REBQMkYlNSa0CWgoBiIxdEFhzKYwgDxsDO6BBAIAfFRdEE0QGoe3g/RNnDgOhD/BGJuNHFGIF4IxNlo4kMaqDNAQh3U0kIGnEA8CYg/MwyTgsyOAeLJCwwQDz+D8s8B8QeoGAgvg2kYBaNgFIyCgQIAmSs83KmXGwYAAAAASUVORK5CYII=>

[image73]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAZCAYAAAAFbs/PAAAAw0lEQVR4Xu3RMQtBURjG8RORz6AYDHYTKyWTMiiLFGWR1aAkn4CSwarssplMlCgfwGClfAMG/rfznnrZlMFwn/rVfZ/3nOHea4yff0wWC2xwQAeBtxMqVVyRlDmBGwYy91CQZ5PGHUVXSKa4IIgtQm5xxMkNKl08UcNYL766kJJy4gqVtrG7PWKurEhZd4VKy9hdQ5c5KT9f2Evf2F1GlxGcMVJdFENj/8kDZZQQdwe8bz7HEmvMkJddEzusEJbOz2/zAof7JwWmKm+7AAAAAElFTkSuQmCC>

[image74]: <data:image/png;base64,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>

[image75]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAVCAYAAAB/sn/zAAAA0klEQVR4XmNgQIAmIO4F4nQgPgvE/4H4GBBzIqkBA14kNgsQWwIxM5LYkAKeQHyXAeLbZWhyGECNAaIwEV0CHaQyQBRKoEugg5UMkEDGC0CB+xqIJwLxZCBeBcQngLgGiJmQ1DFYMUCsvQnEClCxQKiYMZQPBiCdv4BYB0nMmwGi0AhJjOEAEO9DFgCCHiB+yYBkNT8Q/wXiSpgAA0TyMRDPRBLD6hY/qJgzEIvBBKcA8SsGVN91QsVAoTEDJghyWx2MAwUaQLwTiDcDcRqaHD0BAMDbJlW+mZEqAAAAAElFTkSuQmCC>

[image76]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAUCAYAAABbLMdoAAABCklEQVR4Xt3RsSvEYRzH8U9hOIsrA4ssN8ly7gYbC+JGq/VSkkXpymQ8A+t1JVn8AVIGo0UMpAwGdX+BQhYG3l/f3+P3PeEP8KlX3e/zfPs9z3M/6f+kiibO8Yw3HHZNkB60cIcG5rGKB7yHOfXiGKcoxAVyJH/BV7Zxi4FYknG8YiYVE/JtFlMRUsNcLHbwiL5Y/pYOLr6XIbOo248h+RFOupbzlOXrK/Ywmj1cxomQffn6WCpe5H98KRVZFuSDN7Hcy8orTKKIZfmlrd/MR6UR3GcLxnZqYwtPGM5HPYOYxhT65Z/ePtJGmPmMXXIdS/KL2OAuDuJQypnyI5hrrOmPj1SRH8N2+TEfIBU1H+27QTQAAAAASUVORK5CYII=>

[image77]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAVCAYAAADYb8kIAAABHklEQVR4Xu3WL0sEURSH4YN/0CxiNQiCxWzTqNEuBovNYFaRTQYRxO5XsImmRRAUDAaDSYMmkxhU0KDv9dxx2eM468IGWX4PvOxyz06Y2b07YyYiIvLPjdIG1emWzuiKlvJ8m6bze2lhnV7okmZpIK/3Uo0u8nwwr0uFffqgTeppHn3po3s6jAP5acUaF7PKEa3GRWk2Qk90Y40t/pstGo+Lwa75l/PXTvyw7rFjfmL65XXItfkFnYwDaV+60aSL+RwHWXpsils03e2lQnrGfLfyO3vhjt5oIg5KtPsfWvfDusea+YnNhPXClPn8IA6kXNr2x/RICzRG/eYP83N0Tq+0WBwgraXtvkyn9GD+i0yvezRM8zT0/WkREZEO+wS8f0hHCALHfwAAAABJRU5ErkJggg==>

[image78]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVCAYAAACkCdXRAAABWklEQVR4Xu2TTShEURTHTxKKRFZiJKWsfCX2NpY2s7WashSyU3bKwmco+bYY0yiZwsqCJIm1FTaKlYWNvd/pnmuuaYxXNrPwr9/r/85597z7zn1HpEg1lRsoGvXoZQyu4RHO4B7e4BY+4AGmodGt+aZuOIEZOPXBSlg3vyDZhdVwLO6tl9BncVUDvEKT3d/5RAXsml+BGp9Ao9AGMTgI4nOSXVMC7z5RqNgQ9JvfD+IXkDDfBU8+USY/FxuBDqiFnSB+CAPmZ8NcqeQvViWusXE4h06Lq7T5y7AIw5D2CS22bV6L6SHsiWv+CySh1/K/Sottmddi+klH4naoO6u3XCRpzzbN+8/UpqpvF7ezyNLT3DAf9mxe3L+lc6enGklabM187gFkoFzcdLRavKB0AlbNL0FdkBuEcWiGK8k/Vl+aEDeb+tPp23VGb2AyeCZlOX3mGVqC3L/+oE9Ujj9LZ/gHUwAAAABJRU5ErkJggg==>

[image79]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAVCAYAAAAw73wjAAAB8klEQVR4Xu2WT0hUURTGv7ICsaSFIJm2cVG6kCQhSAV1q0YbJRci/kEJtEDEKBRUEIWMiBBciAgSgYjopoXixhBcuHPhQhBBEBduNEQQxL4z5w5zOc3oLN6MLuYHP5h7vnlz73v33XsHSJEiRWDcpot0j17Qc7pGn9D7dIkeuOyILtN7oSuBFnrismP61dUTykdoh202IOPQrNoG5A2doek2SBTN0MH02IDMQbMGU0+DzsYDU08or6GDGTH1SvrDZZ0m66L1ppZwyqGDmfBqd2kTrXPZgJc9ogteO2kUQgcz69VkquXdq3KZPNkwP+lTr500sqGDkVUt5NBa97nYZTI4Qd7nPvc56dyBDmbDtVu9TLYqyX5Db2gFkS3qWjiku/QVLfDqmdCBrkOnv8zLgqLCFi5ji57SDlO/Rc/oX+ieGo1n9BOdd205SP5AbzIeeqGvWxi5bpiu0iyvHkKK+/ShDaAn1zZid/weOgubrl0EvSZe5BQc9dpy0xnQ38j36iHkabTbokPe3Rpb9Mij3XTMteV4/RWJQx33X+Ek9GE9p7m0BJE1EyiyyGQrE6TTD4g+O7F4C73Z8EKVJzwUiYNjlz6GdrRDX9LP/hcuoRT/L6hp2mhqgSB76xT9Tr9B/6zIERwPg7ZAXtAv9J0Nbiz/AN9bXGGe2ptmAAAAAElFTkSuQmCC>

[image80]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAVCAYAAAC5d+tKAAACiUlEQVR4Xu2YTahNURiGXyH/SldJykD+ygQJIS6JSEKkMJDUVZeEKEoMxERIDAylMPIXGRBnoCjK31BJKSMlI3VLvG/f2eeuPufI3mevs7fbfuqpu761Ovtbe629fi5Q8d+wnN6ml+kRV1c0Zc4tF8bST3RUvXyObm/UFkuZc8vEeViH3tCLdA7dSJ8HbXbRu0G5SMqcW2oWwGbQMLqPfqeb6EH6NGi3lb4NykVS5txSs5Te8UFylD4JypthX0lMtKT00Af0A30F+yr1hQ6GTQzlVURu0RhNf9AVLr6H1oKyZpleRizW08+wF7mTjgvq1sAG4yddhs7nFp0bsI5rc0tYBet0wm7YqSMGWsN/0Wt0uKtLuA5bHoeic7lp4LU0R2UIPQt7ARqIhJGwGTmmXtbmvLe/+q/soIt8sAXzaR99CMulFcforfrf7eSWBj1Tgx2N2fQ9PQmbYRqExUH9WnofNjM1OCOCulYshP3ON1/Rgmew9jN8hWMb3RKUs+SWlgn0pg/mxVT6BbaBCXVQL+JEo0U2lPRX+shXNGED7JnJzC4jGvTDPpgHmj3auAbVy12wl3Gm0SI+V2DP3O8rSsYB2Jc23ldkZTL+7Lg2YMV6g1hsarBnLnFxz0y6zgczcAj2Zaa1BtuntNfkgnZ3dXxeENPtV7G5QSw2V2HPXO0rHFrjp/hgh9D9Q7Nfe1tu6Parjk8LYrrcvAvK7fCvp6CVsDx00WqGOq9bumZuUVyg3T7YLlr3X6K/Y9qQdazzl7EspD0FnUbzpW8SbHMOTz6dRgeKSz6YF9PpC/qYfoSdSPIgzSkooRv2z7TX9B49Bdv4JgZtiuA4cl56KtIxC7YMVlRUVAwUfgOfc4wGOJkJoAAAAABJRU5ErkJggg==>

[image81]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAABBUlEQVR4XmNgGAXDBlgB8W4gfgXE/4H4OxCfAeJ5yIooAesZIAYbo0tQApgYIC6+gS5BKbBggLh2MroEpaCGAWJwELoEpeAQEP8CYn50CUoAyLC/DBDDiQGOQHyaAaIH5EtkjAJA3gcJNqFLQEExEIsj8TWBmA/KvgnE/khyKGAKA8RgZ3QJIBAC4qPoglAgDcQ/GfAE33UGiAJuNHFGIF4IxNlo4jCQCcRr0AVhQJ0B4lpQzkMGnEA8CYg/M+B2EcgnyOELcgSDHQPEsAtQwWdQ/jkg/oCkeBlIMRZgxoDfUrLBAiDuRBckF3gAcR4QywLxXSAWRJUmH6QC8UsopmpBRRAAAJFeONvSUhtVAAAAAElFTkSuQmCC>

[image82]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAVCAYAAADo49gpAAABJ0lEQVR4Xu3WvUoDQRRA4esvpFALsbG0SpfSUiIWYhoF0TbpImhhJdhoCn2HgFaCGLQSFcRGQbQzYOkz+A56hruS3YtZLcRi9h74IDuz1exkZ0U8z/M8z/Oiax4nuMBdynn6Ji/bPo4xYcajro5ndEV3zCw6OEOtd1vf1nGEATsRc3XsYgglfOAFk3gQXdC8RnGPETMefZfS2yll0YXbEl3EsOPmkrl+VbBtB4vWhujCzdiJnNbwKtnDwAoPJ+pO8WYHf6iKPTsYe8M4wKrou+pd9GT8ahmN1PV3hXfjoxTsHRe+u8JfcxPN5PdhMjeFW4wl13ktoY1BOxFr46IHQDg9wyIt4En0g7UlerL+thVcY1EKtIB/1TR2cCPZw+EqfZPned4/9Amk9zHj/Pg8LAAAAABJRU5ErkJggg==>