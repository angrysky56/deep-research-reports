# **The Gallai-Bernshteyn Engine: An Agentic Compilation Framework for Distributed Descriptive Combinatorics**

## **1\. Introduction: The Engineering Challenge of Existence**

The translation of abstract mathematical proofs into concrete, executable software logic represents one of the most sophisticated engineering challenges in modern computer science. Nowhere is this gap more profound than in the domain of distributed graph algorithms, where the correctness of a protocol often hinges on intricate probabilistic guarantees and asymptotic behaviors that are difficult to verify via traditional testing. Specifically, the bridge between **Descriptive Combinatorics**—the study of combinatorial structures on infinite graphs definable by regular properties like Borel measurability—and the **LOCAL model** of distributed computing has recently been established as a rigorous isomorphism. This connection, pioneered by Bernshteyn, Brandt, Chang, and others, implies that "local" algorithms on finite graphs are effectively discretizations of "Borel" functions on infinite spaces.1

This report proposes the architecture and implementation specifications for the **Gallai-Bernshteyn Engine**, a "Borel-LOCAL Bridge" framework designed to function as an **Agentic Compiler**. Unlike traditional compilers that translate high-level code into machine instructions, this system translates high-level *logical problem descriptions* into distributed protocols. It utilizes descriptive combinatorics not merely as a theoretical backdrop but as an active "type checker" to reject impossible problems before a single line of code is synthesized. By operationalizing the Constructive Lovász Local Lemma (Moser-Tardos algorithm) and leveraging the "Complexity Atlas" of known reductions, the engine automates the design of distributed systems, ensuring that the synthesized artifacts are mathematically sound by construction.

## **2\. Theoretical Foundations: The Borel-LOCAL Isomorphism**

To understand the architecture of the Gallai-Bernshteyn Engine, one must first master the theoretical terrain it navigates. The framework is predicated on the "Borel-LOCAL Isomorphism," a duality that allows us to reason about the asymptotic complexity of distributed algorithms on finite graphs by studying the descriptive complexity of their infinite counterparts.

### **2.1 The Two Worlds: Descriptive Set Theory and Distributed Computing**

Historically, Descriptive Set Theory and Distributed Computing were viewed as distinct disciplines. Descriptive Set Theory (DST) deals with the structural properties of definable sets (Borel, analytic, projective) in Polish spaces, often focusing on the behavior of infinite graphs and dynamical systems. Distributed Computing, specifically the LOCAL model introduced by Linial, focuses on what can be computed by nodes in a massive network using only information from their immediate $r$-hop neighborhood.4

The convergence of these fields stems from the realization that a distributed algorithm running in constant time $O(1)$ is essentially a "local rule" that applies uniformly across the graph. If we consider a sequence of finite graphs converging to an infinite limit (a method known as Benjamini-Schramm convergence), the behavior of the local algorithm on the sequence translates to a measurable function on the limit graph. Anton Bernshteyn formalized this connection, showing that problems solvable by deterministic local algorithms on finite graphs correspond to problems solvable by Borel measurable functions on infinite graphs.1 Conversely, randomized distributed algorithms correspond to solutions that are measurable with respect to a probability measure.

This duality provides the Gallai-Bernshteyn Engine with its primary validation logic: **Descriptive Validation**. Instead of attempting to simulate a distributed algorithm on every possible finite graph topology (a computationally intractable task), the engine checks the "Borel possibility" of the problem. If a problem is "Borel impossible"—for example, if it requires breaking symmetry in a way that violates the Borel hierarchy—the engine can immediately deduce that no efficient deterministic local algorithm exists for the finite case.3

### **2.2 The Hierarchy of Distributed Complexity**

The operational logic of the engine's "Complexity Classifier" relies on a rigorous mapping of the distributed complexity landscape. Unlike the sequential complexity landscape (P vs NP), which remains fraught with open questions, the landscape of Locally Checkable Labeling (LCL) problems on bounded-degree graphs has been mapped with surprising precision, revealing discrete "gaps" and "dense" regions governed by automatic speedup theorems.

#### **2.2.1 The Discrete Landscape of Trees**

On bounded-degree trees, the complexity landscape is now fully classified, a fact that serves as the engine's primary decision heuristic. Research by Brandt, Chang, Suomela, and others has established that the possible deterministic runtimes for LCL problems on trees fall into exactly four discrete classes 7:

1. **$O(1)$**: Trivially solvable problems where local checking implies local solvability.  
2. *$\\Theta(\\log^ n)$*\*: Symmetry breaking problems, such as 3-coloring a directed path. This is the runtime required to coordinate local decisions to break symmetry using unique identifiers.  
3. **$\\Theta(\\log n)$**: Problems requiring coordination across the diameter of sub-trees, such as sinkless orientation or maximal independent set on unrooted trees.  
4. **$\\Theta(n^{1/k})$**: A hierarchy of polynomial gaps for integers $k \\ge 1$.

Crucially, the "Gap Theorem" proves that **no** LCL problems exist with complexity between $\\omega(1)$ and $o(\\log^\* n)$, nor between $\\omega(\\log^\* n)$ and $o(\\log n)$.7 This is a powerful engineering constraint. If a user requests an algorithm with a runtime of $O(\\sqrt{\\log n})$ for a tree-based problem, the Gallai-Bernshteyn Engine can immediately flag this request as theoretically impossible. The problem effectively "snaps" to the nearest valid complexity class, which would be $\\Theta(\\log n)$ or higher.

#### **2.2.2 The Dense Landscape of General Graphs**

On general graphs and grids, the landscape is more complex. While the lower end of the hierarchy ($O(1)$, $\\Theta(\\log^\* n)$) remains consistent, undecidability emerges at higher levels. For 2D grids, determining whether a problem requires $\\Theta(\\log^\* n)$ or $\\Theta(n)$ rounds is undecidable in the general case.11 However, for many natural LCLs (like 3-coloring), the complexities are well-known. For instance, 3-coloring a grid requires $\\Omega(\\log n)$ rounds in the deterministic online-LOCAL model, separating it from the easier classes.13

### **2.3 The Lovász Local Lemma (LLL) as a Constructive Engine**

The core synthesis capability of the engine is built upon the constructive version of the Lovász Local Lemma (LLL). The LLL is a probabilistic tool used to prove the existence of combinatorial objects that satisfy a set of constraints (avoiding "bad events"). The classic symmetric LLL condition states that if each bad event occurs with probability at most $p$ and depends on at most $d$ other events, and if $e \\cdot p \\cdot (d+1) \\le 1$, then a solution exists with positive probability.4

Moser and Tardos revolutionized this field by transforming the existence proof into a concrete algorithm: "Initialize variables randomly. While any bad event occurs, resample the variables involved in that event." This simple "entropy compression" argument proves that the algorithm converges efficiently if the LLL conditions are met.17 In the distributed setting, this translates to nodes detecting local constraint violations and resampling their states. The Gallai-Bernshteyn Engine automates the generation of this "check-and-resample" logic, calculating the specific $p$ and $d$ values from the user's problem definition to guarantee convergence.15

## **3\. The Core Architecture: A Trinity of Kernels**

The Gallai-Bernshteyn Engine is architected as a modular system of three interacting agents (or "Kernels"), mirroring the theoretical cycle of definition, classification, synthesis, and verification.

### **3.1 Kernel 1: The Descriptive Validator (Math Kernel)**

* **Role:** The Theoretical Gatekeeper.  
* **Function:** This kernel parses the problem constraints and topology to check for satisfiability using Borel determinacy constraints. It acts as the first line of defense against impossible specifications.  
* **Mechanism:** It implements "round elimination" logic symbolically. By analyzing the constraints, it determines if the problem requires breaking symmetry on a continuous space without sufficient "slack" (e.g., 2-coloring a shift graph). If so, it flags the problem as "Borel Impossible," implying it cannot be solved in $O(1)$ distributed time.1  
* **Insight:** This kernel operationalizes the theorem that Borel Solvability \<=\> Deterministic LOCAL. If the math kernel proves a problem has no Borel solution, the CS kernel does not need to waste cycles trying to synthesize a deterministic algorithm.

### **3.2 Kernel 2: The LLL Synthesizer (CS Kernel)**

* **Role:** The Algorithmic Contractor.  
* **Function:** Once validated, this kernel maps the constraints to a Moser-Tardos instance. It identifies the "bad events" (constraint violations) and the "variables" (node labels).  
* **Mechanism:** It generates concrete Python/C++ code implementing the parallel Moser-Tardos algorithm. It handles the synchronization required for parallel resampling—specifically, finding a Maximal Independent Set (MIS) of bad events to resample simultaneously to avoid thrashing.19  
* **Optimization:** It calculates the specific probability thresholds ($p \\cdot d^8$ or $ep(d+1)$) to warn the user if their graph degree is too high for the algorithm to converge efficiently.2

### **3.3 Kernel 3: The Infinite Simulator (Verification Kernel)**

* **Role:** The Empirical Skeptic.  
* **Function:** This kernel simulates the generated protocol on large-scale finite graphs that serve as approximations of infinite structures.  
* **Mechanism:** It utilizes **High-Girth Graphs**—graphs with no short cycles.21 On a graph with high girth, the local neighborhood of any node looks exactly like a tree. This forces the algorithm to rely on its "infinite tree" logic rather than exploiting short cycles (which random graphs often contain). If the algorithm fails on a high-girth graph, it suggests a fundamental flaw in the local logic that would manifest in the infinite limit.

## **4\. Implementation Phase 1: The Constraint Definition Language (DSL)**

To interface with the engine, we require a Domain Specific Language (DSL) that allows users to define *what* is valid (Constraints) rather than *how* to compute it (Procedures). This declarative approach aligns perfectly with the definition of Locally Checkable Labelings (LCLs).

### **4.1 Python \+ Z3 DSL Design**

The DSL is implemented as a Python library wrapping the Z3 Satisfiability Modulo Theories (SMT) solver. The user defines constraints on a node and its neighbors using standard Python syntax, which the engine interprets as symbolic logic.

Python

from gallai\_bernshteyn.dsl import local\_problem, Constraint  
import z3

@local\_problem(graph\_class="Grid2D", degree=4)  
def valid\_3\_coloring(center, neighbors):  
    \# Create Z3 variables for the center and neighbors  
    \# center.val and n.val are symbolic integers  
      
    constraints \=  
      
    \# 1\. Domain Constraint: Colors must be 0, 1, or 2  
    domain \= z3.And(center.val \>= 0, center.val \<= 2)  
    for n in neighbors:  
        domain \= z3.And(domain, n.val \>= 0, n.val \<= 2)  
    constraints.append(domain)  
      
    \# 2\. Local Constraint: No neighbor has the same color  
    for n in neighbors:  
        constraints.append(center.val\!= n.val)  
          
    return z3.And(constraints)

### **4.2 From AST to SMT Constraints**

The technical logic behind this DSL involves detailed Abstract Syntax Tree (AST) parsing. The @local\_problem decorator inspects the function signature and initializes Z3 Int or Enum variables for the center node and a list of neighbors based on the specified degree or graph class topology.23

The framework then performs **Symbolic Execution** of the user's function. It passes these symbolic Z3 variables into the Python function. As the user's code performs comparisons (e.g., center.val\!= n.val), the Z3 library builds an expression tree representing the logical constraints. This eliminates the need for the user to learn the Z3 API directly; they write Python, and the engine captures the logic.25

### **4.3 Local Satisfiability Checking**

Before generating any distributed code, the engine runs solver.check() on a static local neighborhood (e.g., a star graph with $d$ leaves). If the constraints are locally unsatisfiable—for example, trying to 3-color a node that has 4 neighbors forming a clique—the engine halts immediately with a "Locally Impossible" error. This serves as the first, fastest filter in the compilation pipeline.27

The engine goes beyond simple satisfiability; it uses Z3 to probe the "tightness" of the constraints. By attempting to solve the constraints with auxiliary conditions (e.g., "Can the center node change its color if all neighbor colors are fixed?"), the engine determines the "flexibility" or "slack" of the problem. This metric is directly correlated with the probability $p$ in the Lovász Local Lemma: a problem with little slack has a high probability of constraint violation, making it algorithmically harder.19

## **5\. Implementation Phase 2: The Complexity Classifier & The Atlas**

Once a problem is defined and locally validated, the Complexity Classifier determines its theoretical hardness. This prevents users from wasting resources trying to optimize an algorithm that is mathematically proven to be impossible in their desired runtime.

### **5.1 The Complexity Atlas (Neo4j Backend)**

The engine maintains a "Complexity Atlas" stored in a Neo4j graph database. This database represents the "Universe of Problems," storing known LCLs, graph classes, and complexity results derived from the literature.

**Schema Design for the Atlas:**

* **Nodes:**  
  * Problem (e.g., "Vertex Coloring", "MIS", "Sinkless Orientation").  
  * Constraint (e.g., "Neighbor\!= Self", "Outdegree \>= 1").  
  * GraphClass (e.g., "Tree", "Grid", "General", "HighGirth").  
  * ComplexityClass (e.g., "$O(1)$", "$\\Theta(\\log^\* n)$", "$\\Theta(\\log n)$", "$\\Theta(n)$").  
* **Relationships:**  
  * (:Problem)--\>(:ComplexityClass) (contextualized by GraphClass properties).  
  * (:Problem)--\>(:Problem): Encodes reducibility (e.g., "3-Coloring reduces to MIS").  
  * (:Problem)--\>(:ComplexityClass).

### **5.2 Reasoning on the Graph: Reductions and Gaps**

When the DSL receives a new problem, it generates a "fingerprint" of the constraints. The Classifier queries Neo4j using Cypher to find matches or reductions.29

1. **Direct Match:** Does this fingerprint match a known problem? If the user defines "Maximize independent set," the system matches it to the MIS node and returns the known complexity: $\\Theta(\\log^\* n)$ on bounded-degree graphs for randomized algorithms, or $\\Theta(\\log n)$ on trees for deterministic ones.7  
2. **Reduction Search:** If the problem is novel, the engine searches for reductions. "Can Problem X simulate Problem Y?" If the new problem can simulate 2-coloring on a path, it inherits the $\\Omega(n)$ lower bound (on paths) or $\\Omega(\\log n)$ (on general graphs). This utilizes the transitive property of reductions stored in the graph edges.31

### **5.3 Operationalizing Automatic Speedup**

A critical feature of the Classifier is the application of **Automatic Speedup** theorems.

* **The Theorem:** Chang and Pettie proved that on bounded-degree trees, any LCL solvable in $o(\\log n)$ rounds is *automatically* solvable in $O(\\log^\* n)$ rounds.7  
* **The Operational Logic:** If the user specifies a target runtime of $O(\\log \\log n)$, the Classifier "snaps" this requirement to $O(\\log^\* n)$. It informs the user: "Theoretical constraints dictate that if your algorithm works in $O(\\log \\log n)$, an $O(\\log^\* n)$ algorithm must exist. The Engine will target the optimal $O(\\log^\* n)$ construction."  
* **The Warning:** Conversely, if the problem falls into the $\\Theta(\\log n)$ class (like Sinkless Orientation), the Classifier warns: "This problem is proven to require $\\Omega(\\log n)$ rounds. No local ($O(1)$ or $O(\\log^\* n)$) solution is possible".32 This saves the engineer from an impossible optimization task.

### **5.4 Handling Undecidability**

The system must handle the inherent undecidability of LCL complexity on grids. Determining whether a problem on a 2D grid requires $\\Theta(\\log^\* n)$ or $\\Theta(n)$ is undecidable.11 In these cases, the Classifier acts as an advisor rather than an oracle. It reports: "Complexity is undecidable for this topology. Falling back to LLL Synthesis with experimental verification." It uses known hardness results (e.g., 3-coloring grids requires $\\Omega(\\log n)$ 13) as bounds, but acknowledges the limits of automated classification for novel grid problems.

## **6\. Implementation Phase 3: The LLL Synthesizer & Code Generation**

If the problem is classified as solvable (specifically, if it fits the regime where LLL applies, often $O(\\log n)$ or polylogarithmic), the LLL Synthesizer generates the executable code.

### **6.1 The Distributed Moser-Tardos Algorithm**

The Synthesizer uses the Constructive Lovász Local Lemma as a generic template. The core logic of the Moser-Tardos algorithm is elegant: "If a constraint is violated (a 'bad event'), resample the variables involved".15 However, translating this to a distributed system introduces concurrency challenges.

Parallel Resampling Logic:  
In a distributed setting, multiple nodes might be involved in multiple overlapping bad events. Resampling them simultaneously without coordination can lead to livelocks or thrashing (where neighbors flip values endlessly). The Synthesizer implements the Parallel Moser-Tardos algorithm, often leveraging a Maximal Independent Set (MIS) decomposition of the dependency graph.19

1. **Check:** Each node checks if it participates in a bad event.  
2. **Independent Set Selection:** The bad events form a dependency graph. The nodes run a localized MIS algorithm (or a simpler "p-processor" selection based on random IDs) on this dependency graph to select a set of non-overlapping bad events.  
3. **Resample:** Only the selected bad events resample their variables.  
4. **Repeat:** The process iterates until no bad events remain.

### **6.2 Calculating Probability Thresholds**

The convergence of Moser-Tardos is not guaranteed for all problems; it relies on the Shearer criterion. The Synthesizer explicitly calculates the parameters $p$ (probability of a bad event) and $d$ (maximum degree of the dependency graph) based on the user's constraints.

* **$p$ calculation:** The engine estimates the probability that a constraint is violated under a uniform random distribution of variable values.  
* **$d$ calculation:** The engine analyzes the topology to see how many other constraints share variables with a given constraint.  
* **Threshold Check:** It verifies if $e \\cdot p \\cdot (d+1) \\le 1$ (symmetric LLL) or the stronger condition $p \\cdot d^8 \\le 2^{-15}$ for certain distributed variants.2 If the condition is violated, the Synthesizer attempts to optimize the probability space (e.g., by biasing the distribution) or warns the user that convergence is not theoretically guaranteed.

### **6.3 Code Generation Template**

The framework generates a Python class encapsulating this logic. The generated code includes the state machine for the distributed agent.

Python

class GeneratedLLLAgent:  
    def \_\_init\_\_(self, node\_id, neighbors, domain):  
        self.node\_id \= node\_id  
        self.neighbors \= neighbors  
        self.value \= random.choice(domain) \# Initial random assignment  
        self.round\_count \= 0

    def check\_constraints(self, neighbor\_values):  
        \# Logic derived from Z3 constraints  
        \# Example: check valid\_3\_coloring  
        for n\_id, n\_val in neighbor\_values.items():  
            if self.value \== n\_val:  
                return True \# Bad Event Detected\!  
        return False

    def step(self, message\_box):  
        \# 1\. Exchange current values  
        neighbor\_values \= self.exchange\_values()  
          
        \# 2\. Check for bad events  
        is\_bad \= self.check\_constraints(neighbor\_values)  
          
        \# 3\. Coordination (Simplified Parallel MT)  
        \# If I am bad, I propose to resample.   
        \# Use random ID or MIS logic to decide who actually resamples   
        \# to avoid neighbor thrashing.  
        if is\_bad:  
            \# Deterministic/Randomized selection logic (e.g., lowest ID resamples)  
            if self.should\_resample(neighbor\_values):   
                self.value \= random.choice(domain)  
                return "RESAMPLED"  
          
        return "STABLE"

The Synthesizer populates the check\_constraints method by translating the Z3 constraints into standard boolean logic. It also tunes the should\_resample logic based on the specific LLL criterion derived from the problem.2

### **6.4 Deterministic Optimization**

For problems requiring deterministic solutions, the Synthesizer can switch from Moser-Tardos (randomized) to deterministic LLL algorithms, such as those based on network decomposition or derandomization via conditional expectation.34 This adds significant complexity but is necessary for strict $O(\\log^\* n)$ or $O(\\log n)$ deterministic guarantees. The engine utilizes the "automatic speedup" logic here: if a randomized $O(\\log n)$ algorithm exists, it can often be derandomized to $O(\\log n)$ or $O(\\log^2 n)$ using standard transformations.36

## **7\. Implementation Phase 4: The Infinite Simulator & Verification**

Testing distributed algorithms on small grids or random graphs often fails to reveal "locality bugs"—failures that only occur when cycles are very long, simulating the "infinite tree" view of the local horizon. The Gallai-Bernshteyn Engine employs an **Infinite Simulator** to rigorously verify the synthesized protocols.

### **7.1 High-Girth Graph Generation**

The Verification Kernel generates **high-girth regular graphs**. These are finite graphs where the shortest cycle (girth) is large (e.g., $g \> 2 \\cdot T$, where $T$ is the algorithm's runtime).

* **Why High Girth?** On a graph with girth $g$, the $r$-hop neighborhood of any node (for $r \< g/2$) is a tree. This forces the algorithm to behave *exactly* as it would on an infinite tree. If the descriptive combinatorics proofs hold, the algorithm must work here. Standard random graphs (Erdős-Rényi) are insufficient because they contain short cycles with high probability, which can create "local correlations" that don't exist in the worst-case (tree-like) scenarios.21  
* **Algorithm:** The engine uses a random greedy process or algebraic constructions (e.g., Cayley graphs of specific groups) to build these graphs efficiently. The random greedy algorithm described by Linial and Simkin produces regular graphs with girth $c \\log\_{d-1} n$ with high probability.21

### **7.2 The Adversary: Borel Games as Unit Tests**

Beyond random testing, the Simulator employs an **Adversary** agent.

* **Goal:** Construct a local neighborhood that maximizes the probability of the Moser-Tardos algorithm getting "stuck" (re-sampling repeatedly).  
* **Method:** This connects back to the **Borel Determinacy** games used in descriptive set theory. The adversary plays a game against the algorithm, trying to force it into a corner of the probability space. If the Simulator finds a configuration where the resampling rate does not decay, it flags the problem as "likely exceeding the LLL threshold," prompting a re-evaluation of the parameters.3

## **8\. Integration: MCP Server & Workflow**

To make the Gallai-Bernshteyn Engine a practical tool for modern workflows, it exposes its capabilities via the **Model Context Protocol (MCP)**, allowing it to function as a backend tool for Large Language Models (LLMs).

### **8.1 MCP Server Design**

The engine is wrapped as an MCP Server, exposing specific tools that LLMs like Claude or GPT-4 can call to reason about distributed systems.37

* **Exposed Tools:**  
  * check\_complexity(problem\_description): Accepts a natural language or code description, runs the Classifier against the Neo4j Atlas, and returns the complexity class (e.g., "This is a symmetry breaking problem, likely $\\Theta(\\log^\* n)$").  
  * synthesize\_protocol(constraints): Accepts Z3/Python constraint code and returns the generated Moser-Tardos Python code.  
  * verify\_protocol(code, topology): Runs the Infinite Simulator on a high-girth graph and returns convergence statistics.

### **8.2 Agentic Workflow Example**

**User:** "Write a distributed algorithm for 3-coloring a grid."

1. **LLM Action:** The LLM, lacking inherent verification capabilities, calls the check\_complexity tool on the Gallai-Bernshteyn MCP server.  
2. **Engine Logic:** The Classifier queries the Complexity Atlas. It finds that 3-coloring a grid is possible in $O(\\log^\* n)$ if the grid is oriented/directed, but requires $\\Omega(\\log n)$ if unoriented.13  
3. **Engine Response:** "3-coloring a grid is solvable. Complexity: $O(\\log^\* n)$ (oriented) or $\\Omega(\\log n)$ (unoriented). Warning: Randomization is recommended for unoriented grids."  
4. **LLM Action:** The LLM conveys this nuance to the user and asks for clarification ("Is your grid oriented?").  
5. **User:** "Unoriented."  
6. **LLM Action:** Calls synthesize\_protocol with the unoriented grid constraints.  
7. **Engine Logic:** The LLL Synthesizer generates a randomized Moser-Tardos protocol tailored for the grid topology, ensuring the probability thresholds are met.  
8. **Output:** The LLM presents the verified Python code to the user.

### **8.3 Neo4j Inference and Learning**

The Neo4j backend is not static; it learns. When a new problem is submitted and verified, the engine adds a node to the Knowledge Graph. If the Simulator finds that the new problem can simulate a known hard problem (via reduction logic), a :REDUCES\_TO edge is created. This allows the system to "infer" new complexity relations over time, expanding the Atlas automatically.30

## **9\. Conclusion**

The Gallai-Bernshteyn Engine represents a paradigm shift in the design of distributed algorithms. By moving from manual derivation to automated synthesis guided by deep mathematical theory, it offers a rigorous path to building correct, efficient systems. The integration of Z3 for local logic, Neo4j for global complexity knowledge, and the Constructive LLL for code synthesis creates a tool that not only writes code but *understands* the fundamental limits of computability in the distributed setting. This bridge turns the abstract theorems of descriptive combinatorics into concrete, verifiable engineering artifacts, fulfilling the promise of the Borel-LOCAL isomorphism.

## **10\. Appendix: Data Tables**

### **Table 1: Complexity Landscape of LCL Problems on Trees**

7

| Complexity Class | Problem Type | Example | Deterministic? | Randomized? |
| :---- | :---- | :---- | :---- | :---- |
| **$O(1)$** | Trivial / Local | Port Numbering | Yes | Yes |
| *$\\Theta(\\log^ n)$*\* | Symmetry Breaking | 3-Coloring Directed Path | Yes | Yes |
| **$\\Theta(\\log n)$** | Global Coordination | Sinkless Orientation | Yes | $\\Theta(\\log \\log n)$ |
| **$\\Theta(n^{1/k})$** | Polynomial Gap | $k$-level Hierarchical Coloring | Yes | Yes |
| **$\\Theta(n)$** | Global | 2-Coloring Path | Yes | Yes |

*Note: No problems exist between these classes (e.g., no $O(\\sqrt{\\log n})$).*

### **Table 2: Moser-Tardos Convergence Criteria**

2

| Criterion | Formula | Interpretation | Use Case in Engine |
| :---- | :---- | :---- | :---- |
| **Symmetric LLL** | $e \\cdot p \\cdot (d+1) \\le 1$ | Standard condition | Default check for general graphs |
| **Polynomial** | $p \\cdot d^8 \\le 2^{-15}$ | Stronger, specific for distributed | Used for generating specific parallel schedules |
| **Asymmetric** | $\\sum\_{A \\in \\text{bad}} x\_A \\prod (1-x\_B) \\dots$ | General form | Used when constraints have non-uniform probabilities |

### **Table 3: Comparison of Verification Graphs**

| Graph Type | Local Topology | Cycle Structure | Suitability for LCL Verification |
| :---- | :---- | :---- | :---- |
| **Grid (2D)** | Regular | Many short cycles ($C\_4$) | Low (cycles mask tree-like hardness) |
| **Erdős-Rényi** | Poisson Degree | Short cycles probable | Low (irregular degrees, cycles) |
| **High-Girth Regular** | Regular ($d$-regular) | No cycles of length $\< g$ | **High** (Mimics infinite tree locally) |
| **Cayley Graph** | Regular (Group structure) | Dependent on Group | High (for specific algebraic constraints) |

#### **Works cited**

1. Descriptive combinatorics and distributed algorithms \- HELDA, accessed January 4, 2026, [https://helda.helsinki.fi/bitstreams/b0e2ccdc-26ac-46dc-8c85-a94862d6017b/download](https://helda.helsinki.fi/bitstreams/b0e2ccdc-26ac-46dc-8c85-a94862d6017b/download)  
2. Distributed Algorithms, the Lovász Local Lemma, and Descriptive ..., accessed January 4, 2026, [https://arxiv.org/abs/2004.04905](https://arxiv.org/abs/2004.04905)  
3. Descriptive Combinatorics on Trees, Grids, and Non-Amenable ..., accessed January 4, 2026, [https://escholarship.org/uc/item/3900z22f](https://escholarship.org/uc/item/3900z22f)  
4. The Local Lemma in descriptive combinatorics: survey and recent ..., accessed January 4, 2026, [https://logic.math.caltech.edu/slides/2023-04-19.pdf](https://logic.math.caltech.edu/slides/2023-04-19.pdf)  
5. Local Problems on Trees from the Perspectives of Distributed ..., accessed January 4, 2026, [https://drops.dagstuhl.de/storage/00lipics/lipics-vol215-itcs2022/LIPIcs.ITCS.2022.29/LIPIcs.ITCS.2022.29.pdf](https://drops.dagstuhl.de/storage/00lipics/lipics-vol215-itcs2022/LIPIcs.ITCS.2022.29/LIPIcs.ITCS.2022.29.pdf)  
6. Local Problems on Trees from the Perspectives of Distributed ..., accessed January 4, 2026, [https://publications.cispa.saarland/3542/1/trees-ITCS.pdf](https://publications.cispa.saarland/3542/1/trees-ITCS.pdf)  
7. The Landscape of Distributed Complexities on Trees and Beyond, accessed January 4, 2026, [https://publications.cispa.de/ndownloader/files/43248486](https://publications.cispa.de/ndownloader/files/43248486)  
8. The Complexity Landscape of Distributed Locally Checkable ..., accessed January 4, 2026, [https://drops.dagstuhl.de/storage/00lipics/lipics-vol179-disc2020/LIPIcs.DISC.2020.18/LIPIcs.DISC.2020.18.pdf](https://drops.dagstuhl.de/storage/00lipics/lipics-vol179-disc2020/LIPIcs.DISC.2020.18/LIPIcs.DISC.2020.18.pdf)  
9. The Landscape of Distributed Complexities on Trees and Beyond, accessed January 4, 2026, [https://arxiv.org/pdf/2202.04724](https://arxiv.org/pdf/2202.04724)  
10. The Complexity Landscape of Distributed Locally Checkable ... \- arXiv, accessed January 4, 2026, [https://arxiv.org/pdf/2009.09645](https://arxiv.org/pdf/2009.09645)  
11. LCL Problems on Grids | Request PDF \- ResearchGate, accessed January 4, 2026, [https://www.researchgate.net/publication/318576229\_LCL\_Problems\_on\_Grids](https://www.researchgate.net/publication/318576229_LCL_Problems_on_Grids)  
12. LCL problems on grids \- arXiv, accessed January 4, 2026, [https://arxiv.org/pdf/1702.05456](https://arxiv.org/pdf/1702.05456)  
13. Orientation does not help with 3-coloring a grid in online-LOCAL, accessed January 4, 2026, [https://arxiv.org/pdf/2509.22233](https://arxiv.org/pdf/2509.22233)  
14. Orientation does not help with 3-coloring a grid in online-LOCAL, accessed January 4, 2026, [https://www.researchgate.net/publication/395944524\_Orientation\_does\_not\_help\_with\_3-coloring\_a\_grid\_in\_online-LOCAL](https://www.researchgate.net/publication/395944524_Orientation_does_not_help_with_3-coloring_a_grid_in_online-LOCAL)  
15. Descriptive combinatorics and distributed algorithms \- ResearchGate, accessed January 4, 2026, [https://www.researchgate.net/publication/362544404\_Descriptive\_combinatorics\_and\_distributed\_algorithms](https://www.researchgate.net/publication/362544404_Descriptive_combinatorics_and_distributed_algorithms)  
16. An Algorithmic Proof of the Lovász Local Lemma via Resampling ..., accessed January 4, 2026, [https://www.cs.ubc.ca/\~nickhar/papers/LLL/LLL-FOCS.pdf](https://www.cs.ubc.ca/~nickhar/papers/LLL/LLL-FOCS.pdf)  
17. \[0903.0544\] A constructive proof of the general Lovasz Local Lemma, accessed January 4, 2026, [https://arxiv.org/abs/0903.0544](https://arxiv.org/abs/0903.0544)  
18. Algorithmic Lovász local lemma \- Wikipedia, accessed January 4, 2026, [https://en.wikipedia.org/wiki/Algorithmic\_Lov%C3%A1sz\_local\_lemma](https://en.wikipedia.org/wiki/Algorithmic_Lov%C3%A1sz_local_lemma)  
19. Distributed algorithms for the Lovász local lemma and graph coloring, accessed January 4, 2026, [https://par.nsf.gov/servlets/purl/10059669](https://par.nsf.gov/servlets/purl/10059669)  
20. Distributed algorithms for the Lovász local lemma and graph coloring, accessed January 4, 2026, [https://scispace.com/pdf/distributed-algorithms-for-the-lovasz-local-lemma-and-graph-dy04ey6gwz.pdf](https://scispace.com/pdf/distributed-algorithms-for-the-lovasz-local-lemma-and-graph-dy04ey6gwz.pdf)  
21. A randomized construction of high girth regular graphs \- CS \- Huji, accessed January 4, 2026, [https://www.cs.huji.ac.il/\~nati/PAPERS/high\_girth.pdf](https://www.cs.huji.ac.il/~nati/PAPERS/high_girth.pdf)  
22. A randomized construction of high girth regular graphs, accessed January 4, 2026, [https://www.researchgate.net/publication/347044372\_A\_randomized\_construction\_of\_high\_girth\_regular\_graphs](https://www.researchgate.net/publication/347044372_A_randomized_construction_of_high_girth_regular_graphs)  
23. z3\_tutorial/Z3 Tutorial.ipynb at master \- GitHub, accessed January 4, 2026, [https://github.com/philzook58/z3\_tutorial/blob/master/Z3%20Tutorial.ipynb](https://github.com/philzook58/z3_tutorial/blob/master/Z3%20Tutorial.ipynb)  
24. Compiling With Constraints | Hey There Buddo\! \- Philip Zucker, accessed January 4, 2026, [https://www.philipzucker.com/compile\_constraints/](https://www.philipzucker.com/compile_constraints/)  
25. Symbolic Expressions and Constraint Solving \- angr documentation, accessed January 4, 2026, [https://docs.angr.io/en/latest/core-concepts/solver.html](https://docs.angr.io/en/latest/core-concepts/solver.html)  
26. Lab 3: Symbolic execution \- 6.858 / Spring 2022, accessed January 4, 2026, [https://css.csail.mit.edu/6.858/2022/labs/lab3.html](https://css.csail.mit.edu/6.858/2022/labs/lab3.html)  
27. Modeling Constraint Satisfaction Problem with Model Checker, accessed January 4, 2026, [https://scispace.com/pdf/modeling-constraint-satisfaction-problem-with-model-checker-24cxkyx2jd.pdf](https://scispace.com/pdf/modeling-constraint-satisfaction-problem-with-model-checker-24cxkyx2jd.pdf)  
28. Lecture 6: May 30, accessed January 4, 2026, [https://www.weizmann.ac.il/math/parter/sites/math.parter/files/uploads/lecture-06\_0.pdf](https://www.weizmann.ac.il/math/parter/sites/math.parter/files/uploads/lecture-06_0.pdf)  
29. Decision tree learning in Neo4j on homogeneous and unconnected ..., accessed January 4, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC9988195/](https://pmc.ncbi.nlm.nih.gov/articles/PMC9988195/)  
30. Unlocking Advanced Graph Machine Learning Insights through ..., accessed January 4, 2026, [https://arxiv.org/html/2511.11399v1](https://arxiv.org/html/2511.11399v1)  
31. Problem Reduction in Computational Complexity \- Alwin, accessed January 4, 2026, [https://alwinpublications.site/problem-reduction-in-computational-complexity.pdf](https://alwinpublications.site/problem-reduction-in-computational-complexity.pdf)  
32. Sinkless orientation is hard also in the supported LOCAL model, accessed January 4, 2026, [https://www.researchgate.net/publication/353730248\_Sinkless\_orientation\_is\_hard\_also\_in\_the\_supported\_LOCAL\_model](https://www.researchgate.net/publication/353730248_Sinkless_orientation_is_hard_also_in_the_supported_LOCAL_model)  
33. On the Complexity of Distributed Edge Coloring and Orientation ..., accessed January 4, 2026, [https://arxiv.org/pdf/2510.21327](https://arxiv.org/pdf/2510.21327)  
34. Sublogarithmic distributed algorithms for lovász local lemma, and ..., accessed January 4, 2026, [https://www.research-collection.ethz.ch/bitstreams/1b385851-c9f5-47be-bb7e-ddba6043cc6d/download](https://www.research-collection.ethz.ch/bitstreams/1b385851-c9f5-47be-bb7e-ddba6043cc6d/download)  
35. (PDF) Improved Distributed Algorithms for the Lov\\'asz Local Lemma ..., accessed January 4, 2026, [https://www.researchgate.net/publication/362789469\_Improved\_Distributed\_Algorithms\_for\_the\_Lov'asz\_Local\_Lemma\_and\_Edge\_Coloring](https://www.researchgate.net/publication/362789469_Improved_Distributed_Algorithms_for_the_Lov'asz_Local_Lemma_and_Edge_Coloring)  
36. Improved Distributed Algorithms for the Lovász, accessed January 4, 2026, [https://epubs.siam.org/doi/pdf/10.1137/1.9781611977554.ch163](https://epubs.siam.org/doi/pdf/10.1137/1.9781611977554.ch163)  
37. Specification \- Model Context Protocol （MCP）, accessed January 4, 2026, [https://modelcontextprotocol.info/specification/](https://modelcontextprotocol.info/specification/)  
38. Model Context Protocol (MCP) an overview \- Philschmid, accessed January 4, 2026, [https://www.philschmid.de/mcp-introduction](https://www.philschmid.de/mcp-introduction)  
39. Build Your First MCP Server in 15 Minutes (Complete Code), accessed January 4, 2026, [https://medium.com/data-science-collective/build-your-first-mcp-server-in-15-minutes-complete-code-d63f85c0ce79](https://medium.com/data-science-collective/build-your-first-mcp-server-in-15-minutes-complete-code-d63f85c0ce79)