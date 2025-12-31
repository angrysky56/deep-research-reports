# **The Formalized Generative Architecture: Synthesizing Probabilistic Intuition with Categorical Rigor for Verifiable Artificial Intelligence**

## **1\. Executive Summary**

The trajectory of contemporary Artificial Intelligence is currently navigating a critical inflection point, defined by a pervasive tension between the generative flexibility of probabilistic models and the absolute precision required by formal systems. Large Language Models (LLMs), the vanguard of the current generative wave, have achieved unprecedented success in approximating human-like text generation, translation, and heuristic reasoning. However, as these models are deployed into high-stakes engineering and scientific domains, their fundamental limitations—specifically their propensity for hallucination, logical inconsistency, and structural incoherence—have precipitated a "Trilemma of Reliability." This trilemma posits that current neural architectures struggle to simultaneously achieve **Generative Flexibility**, **Logical Consistency**, and **Computational Efficiency**.

While LLMs operate as stochastic engines adept at navigating the "messy" generation of semantic meaning, they lack the internal architecture to guarantee the validity of the structures they produce. Conversely, formal methods—encompassing the disciplines of Ontology Engineering, Arithmetic Coding, and Category Theory—offer mathematically verifiable guarantees and optimal efficiency but historically lack the adaptive intuition required to navigate unstructured environments.

This report presents a comprehensive synthesis of these disparate fields, proposing the **Formalized Generative Architecture (FGA)**. This architecture is not merely a theoretical construct but a pragmatic blueprint for a new class of AI systems that utilize LLMs as heuristic engines, constrained and verified by categorical logic (specifically via the **Quantomatic** rewriting engine), and optimized through information-theoretic principles (Arithmetic Coding).

By analyzing recent advances in ontology generation, time series forecasting, neural compression, and diagrammatic reasoning, this document establishes a rigorous framework for "Correct-by-Construction" AI. The analysis unearths a critical "Grand Unification" in Computer Science, where **Ontologies** provide the logical structure, **LLMs** provide the generative intuition, **Arithmetic Coding** provides the informational efficiency, and **Category Theory** provides the universal syntax to map between them all. A central finding of this research is the identification of the legacy **Quantomatic** codebase as a "Rosetta Stone"—a graph rewriting engine capable of bridging the cognitive-computational gap through its unique handling of subgraph isomorphism modulo theories.

## ---

**2\. The Engineering of Meaning: Probabilistic Ontologies and the Hallucination of Structure**

The first pillar of the Formalized Generative Architecture concerns the structural organization of knowledge. Ontologies provide the semantic backbone for Knowledge Graphs (KGs), defining the classes, properties, and relationships that govern a domain. The integration of LLMs into this highly structured field reveals the core conflict between probabilistic approximation and logical rigor. The challenge lies in forcing a probabilistic engine (the LLM) to create deterministic structures (Ontologies) that are rigorous enough for engineering applications.

### **2.1 The Promise and Peril of LLM-Driven Ontology Engineering**

Traditional ontology engineering is a notoriously labor-intensive process, characterized by the "Knowledge Acquisition Bottleneck." It requires deep domain expertise combined with familiarity with formal languages like OWL (Web Ontology Language). The advent of LLMs has introduced the possibility of automating this process, yet research indicates that while LLMs can accelerate the drafting of ontologies, they fundamentally lack the internal architecture to ensure logical consistency without external guardrails.1 The models act as capable but unreliable assistants, prone to generating plausible but structurally flawed schemas.

#### **2.1.1 Prompting Strategies: The Tension Between Modularity and Metacognition**

To mitigate the stochastic nature of LLMs in ontology generation, researchers have developed distinct prompting strategies. The tension between **Memoryless CQbyCQ** (Competency Question by Competency Question) and **Ontogenia** illustrates the trade-offs involved in automating semantic engineering.

**Memoryless CQbyCQ** represents a decompositional approach. This technique breaks down the ontology generation task into discrete, modular steps based on Competency Questions (CQs)—natural language questions that the ontology must be able to answer. By treating each requirement independently, the method reduces the cognitive load on the model and minimizes context window pollution.1 However, this "memoryless" nature leads to a lack of global coherence. The model may generate redundant entities or conflicting definitions across different CQs because it lacks a persistent view of the evolving structure. It excels in modularity but fails in structural unification.2

**Ontogenia**, in contrast, employs a "metacognitive" approach, effectively transposing the steps of Metacognitive Prompting into the ontology engineering workflow. This method forces the model to engage in a multi-step reasoning process before generating OWL code. The steps typically involve:

1. **Interpretation:** The LLM interprets the user story and CQs to understand the domain scope.  
2. **Contextualization:** It identifies the specific context and breaks down requirements into logical elements.  
3. **Reflection:** The model reflects on necessary rules, restrictions, and disjointness axioms (e.g., "A Manager must be a Person").  
4. **Generation:** The formal TBox (Terminology) and ABox (Assertions) are generated.  
5. **Validation:** The model self-evaluates the output against test cases.1

Empirical studies utilizing state-of-the-art models like OpenAI o1-preview demonstrate that Ontogenia significantly outperforms novice human modelers in producing ontologies that meet engineering requirements.2 However, even with such sophisticated prompting, the LLM remains a probabilistic approximation of a logician, not a logician itself.

### **2.2 The Human-in-the-Loop Validation Crisis**

The transition from manual creation to LLM-assisted generation has shifted the human role from *creator* to *validator*, creating a new bottleneck: "Vibe Checking." Because models cannot distinguish between a linguistically plausible sentence and a logically valid fact, human experts must manually verify LLM outputs to ensure they do not violate domain constraints.4

This "Junior Engineer" dynamic is characterized by two primary failure modes:

1. **Hallucination of Relationships:** LLMs frequently invent relationships that do not exist in the source data or violate domain constraints. For instance, in constructing a Knowledge Graph for deep learning methodologies, an LLM might correctly identify "Transformer" and "Attention Mechanism" but hallucinate a direct causal link that contradicts the actual citation graph. The model optimizes for semantic flow rather than factual accuracy.4  
2. **Schema Violations:** Even when generating valid assertions, LLMs often struggle with strict schema adherence. They may produce entities that violate disjointness axioms or cardinality constraints defined in the TBox. For example, creating multiple redundant individuals for the same ontology class or assigning labels like "Not Specified" which breaks the formal logic of the graph.4

The **OntoKGen** framework attempts to mitigate this by using the ontology as a strict blueprint for KG generation, essentially constraining the LLM's output to pre-defined slots.7 However, the initial extraction of that blueprint remains susceptible to error. The insight derived from this domain is clear: reliability cannot be achieved through prompting alone. The architecture must move beyond "prompt engineering" to "architectural constraint," where the LLM's output is treated not as a final product but as a *candidate hypothesis* to be verified by a formal system.

## ---

**3\. The Hallucination of Patterns: Time Series and the Transfer Learning Hypothesis**

Moving from semantic structures (ontologies) to temporal structures (time series), the analysis encounters a parallel epistemological conflict. The application of LLMs to Time Series Forecasting (TSF) provides a critical case study in the limitations of "transfer learning" when applied across disparate modalities—specifically, the transfer of linguistic patterns to numerical data.

### **3.1 The Critique of Transfer Learning in Time Series**

The "Transfer Learning Hypothesis" posits that the patterns learned by LLMs in natural language (syntax, grammar, narrative flow) can be mapped to numerical trends in time series data. However, critical evaluations suggest that applying LLMs to time series is a case of **exaptation**—using a tool designed for one purpose (language) for a completely different one (numerical prediction) without sufficient theoretical justification.4

The core issue lies in the **Tokenization Mismatch**. LLMs process data as tokens, which in language carry semantic meaning. In time series, however, raw numbers are often tokenized in ways that fracture their mathematical relationships. For example, a tokenizer might split the number "1024" into "10" and "24". This forces the model to learn arithmetic operations from scratch based on token co-occurrence rather than mathematical logic. The model essentially tries to memorize the multiplication table rather than learning the algorithm of multiplication, leading to poor generalization on data outside the training distribution.4

### **3.2 Data Preferences: The Narrative Bias of LLMs**

Research into **LLM Forecasting** reveals a fascinating bias: these models have specific "data preferences." They excel when the data exhibits clear trends and seasonal patterns that resemble the coherent flow of a sentence. This phenomenon is termed **Narrative Bias**.

* **Narrative Coherence:** LLMs perform significantly better on datasets that have a "narrative-like" coherence—simple, monotonic trends or clear seasonality. They effectively "read" the time series as a sentence, predicting the next "word" (number) based on the flow of the "story" (trend).4  
* **Multi-Period Failure:** When tasked with multi-period datasets (e.g., a signal with overlapping daily, weekly, and annual cycles), LLMs often fail. Unlike Fourier transforms or dedicated statistical models (ARIMA), LLMs struggle to decompose these overlapping signals because they lack an underlying mathematical model of periodicity. They are "paraphrasing" the numbers rather than calculating the forecast.4

This leads to a crucial insight for the FGA: LLMs are inefficient "compressors" of numerical data. They require billions of parameters to predict simple trends that could be represented by a few lines of code or a small equation. If the goal is efficient, verifiable intelligence, the architecture must utilize systems that achieve optimal data representation. This necessitates a shift from *prediction via correlation* to *prediction via causal structure*.

## ---

**4\. The Asymptote of Efficiency: Arithmetic Coding and Learned Compression**

The inefficiencies of LLMs in both ontology generation (hallucinating structure) and time series forecasting (paraphrasing numbers) point to a need for a more optimal method of representing information. **Arithmetic Coding (AC)** represents the gold standard of informational efficiency, theoretically capable of achieving the Shannon Limit. The intersection of Deep Learning and Arithmetic Coding—**Learned Compression**—forms the third pillar of the FGA.

### **4.1 The Mechanism of Arithmetic Coding**

Unlike Huffman coding, which assigns integer bit lengths to symbols (inefficient for probabilities that don't map to powers of 2), Arithmetic Coding treats an entire message as a single interval $ The critical dependency in this process is the **Probability Model**. Arithmetic coding is only as good as its ability to predict the probability of the next symbol. This is where Deep Learning enters the equation.

### **4.2 DeepCABAC and Neural Probability Estimation**

**DeepCABAC** (Context-Adaptive Binary Arithmetic Coding for Deep Neural Networks) represents a breakthrough in compressing neural network parameters. It adapts the CABAC standard (used in the H.264/HEVC video compression standards) to the specific statistical distributions of neural weights.8

DeepCABAC introduces two key innovations relevant to the FGA:

* **Context Adaptation:** It does not use static probabilities. Instead, it updates its context model on-the-fly as it processes the data stream. If a specific weight value appears frequently, the model adapts, assigning it a larger interval (and thus fewer bits). This dynamic adaptation allows it to capture local statistics efficiently.8  
* **Quantization Integration:** The framework integrates quantization (minimizing a rate-distortion function) with arithmetic coding. By quantizing weights to minimize the impact on network accuracy while maximizing compressibility, DeepCABAC achieves compression ratios significantly higher than Huffman or standard Zip compression.11

### **4.3 LLMZip: The Equivalence of Prediction and Compression**

The principle of Learned Compression extends to text via **LLMZip**. This algorithm leverages the predictive power of LLMs (like LLaMA-7B) to drive an arithmetic coder.14

The mechanism is a direct application of the "Prediction $\\equiv$ Compression" insight. The LLM predicts the probability distribution of the next token. This distribution is fed into the Arithmetic Coder. Because modern LLMs are excellent next-token predictors (exhibiting low perplexity), they define very precise intervals for the actual next token. This results in extremely high compression rates, often outperforming state-of-the-art text compression algorithms like BSC, ZPAQ, and paq8h.15

**StableCodec** and other neural image codecs 17 further demonstrate that generative models (Diffusion, VAEs) can serve as the probability estimators for arithmetic coding, effectively "hallucinating" the details of an image from a tiny compressed latent representation.

**Insight for FGA:** An AI system's ability to compress a dataset is a direct measure of its "understanding" of the patterns within that data. The FGA utilizes compression not just for storage, but as a **metric for validity**. If the "Formalized" logic layer (Phase II) cannot compress the data effectively, the hypothesis is rejected. This provides a quantifiable objective function for the system's reasoning capabilities.16

## ---

**5\. The Universal Syntax: Diagrammatic Category Theory**

The fourth and final pillar provides the language to unify these components. **Category Theory**, specifically **Diagrammatic Reasoning** (String Diagrams), offers a rigorous syntax for describing processes, composition, and interaction. It bridges the gap between the "black box" of neural networks and the "white box" of formal logic.

### **5.1 String Diagrams and Monoidal Categories**

String diagrams are not merely illustrations; they are rigorous mathematical objects that represent morphisms in a **Monoidal Category**. They provide a "Universal Syntax" that can describe quantum processes, linguistic structures, and software logic with equal precision.20

* **Wires as Types:** Wires in a diagram represent objects (data types, Hilbert spaces, quantum states).  
* **Boxes as Processes:** Boxes represent morphisms (functions, gates, logical operations).  
* **Composition:**  
  * Sequential composition ($f \\gg g$) is represented by connecting wires in series.  
  * Parallel composition ($f \\otimes g$) is represented by placing wires side-by-side.

This graphical calculus allows for **Diagrammatic Rewriting**: transforming a diagram into an equivalent but simpler form using axiom-preserving rules. This is the foundation of the **ZX-calculus**, a graphical language for quantum computing that is complete for qubit mechanics.22

### **5.2 DisCoPy and the Compositional Pipeline**

**DisCoPy** (Distributional Compositional Python) is the standard toolkit for implementing these structures computationally. It treats diagrams as data structures that can be manipulated, rewritten, and evaluated.21

A prime example of this application is **DisCoCat** (Distributional Compositional Categorical) models for Natural Language Processing. This framework models natural language using string diagrams where grammatical structure (typically Pregroup Grammars) determines the wiring of the diagram, while the word meanings are vectors (or tensors) flowing through the wires. This allows the meaning of a sentence to be computed compositionally from the meanings of its words.24

**Lambeq**, a library built on DisCoPy, takes this a step further by converting natural language sentences into quantum circuits. It parses text into string diagrams and then applies functors to map them into tensor networks or quantum gates suitable for execution on quantum hardware.26 This proves that natural language *can* be rigorously mapped to formal mathematical structures, a capability essential for the FGA.

### **5.3 Autoformalization: The Cognitive-Computational Chasm**

The ultimate goal of connecting LLMs with Category Theory is **Autoformalization**: using AI to automatically translate informal natural language or sketches into rigorous string diagrams.28

Current research identifies a "Cognitive-Computational Chasm." Humans reason with informal diagrams and intuition; computers reason with formal proofs. LLMs can generate "sketches" of proofs, but they often fail the strict syntax checks of theorem provers like Coq or Lean.29 The FGA proposes using **String Diagrams** as the intermediate representation. They are closer to human intuition (spatial, process-oriented) than linear logical formulas, yet they are fully formalizable. The AI generates the *diagram*, and a verification engine checks the *topology*.

## ---

**6\. The Rosetta Stone: Quantomatic and the Code Archaeology of Logic**

A pivotal finding of this research is the identification of **Quantomatic** as the essential "logic core" for the FGA. While modern tools like PyZX and DisCoPy are faster for specific tasks (like quantum circuit optimization), Quantomatic possesses unique theoretical capabilities required for general-purpose autoformalization. It serves as the "Rosetta Stone" capable of translating the messy, heuristic output of an LLM into verified categorical logic.

### **6.1 The "Lost" Technology: Subgraph Isomorphism Modulo Theories**

Modern graph libraries (like NetworkX) or specialized solvers (like PyZX) typically perform matching on fixed graph topologies. **Quantomatic**, however, implements **Subgraph Isomorphism Modulo Theories**.20

This capability is critical for handling LLM outputs. When an LLM generates an ontology or process graph, it will rarely match the canonical form expected by a rigid system. It will be "messy." It might represent a relationship as $A \\rightarrow B \\rightarrow C$ when the canonical form is $A \\rightarrow C$. Quantomatic's matching engine can recognize the *intent* (the underlying valid structure) despite the messy surface representation, provided the graphs are equivalent under the axioms of the defined theory (e.g., transitivity). This allows the system to find a shape that is *topologically equivalent* even if it looks different, making it the perfect "corrector" for LLM output.31

### **6.2 Bang Boxes (\!-boxes) and Infinite Families**

Another critical feature unique to Quantomatic is the **Bang Box (\!-box)**. This notation allows the representation of infinite families of diagrams or recursive structures within a static diagram.20

In the context of the FGA, LLMs often need to generate generalized algorithms or ontologies that apply to collections of arbitrary size (e.g., "for all items in this list, apply function X"). Standard string diagrams cannot easily represent this recursion. Quantomatic's\!-boxes allow the system to formalize these recursive structures, enabling the verification of complex, generalized logic generated by the AI.

### **6.3 Integration Strategy: The "Strangler Fig" Pattern**

Quantomatic is a "fossil" from 2015, written in **Standard ML (SML)**, a functional language known for its mathematical rigor but low industry adoption.30 To utilize this powerful engine within a modern Python-based AI architecture without rewriting complex SML code, the FGA employs a "Strangler Fig" integration pattern.

This involves treating the quantomatic binary as a "Black Box Oracle." Research into the **Tinker** tool—a GUI for Quantomatic—reveals a JSON communication protocol used to interface with the core engine.33

The Protocol Structure:  
The communication relies on a text-stream protocol exchanging JSON commands. Key commands identified in the research include:

* command: Specifies the action (e.g., rewrite, match).  
* input: The JSON representation of the graph.  
* output: The resulting graph or proof steps.34

Implementation:  
A Python wrapper (implementing the Model Context Protocol or MCP) spawns the SML process. It translates the LLM's candidate graph (Phase I) into the JSON format expected by Quantomatic. It then pipes this JSON to the process and parses the response. This effectively wraps the "ancient" SML core in a modern Python interface, making its advanced rewriting capabilities accessible to the FGA.35

## ---

**7\. The Formalized Generative Architecture (FGA)**

Integrating these four disciplines—Ontologies, Time Series/Heuristics, Arithmetic Coding, and Category Theory—yields the **Formalized Generative Architecture**. This architecture addresses the Trilemma of Reliability by assigning each component to the domain where it excels.

### **7.1 Architecture Overview**

The FGA operates on a cyclic **"Generate-Formalize-Compress"** loop. It acknowledges that LLMs are heuristic engines (Phase I), requires a formal logic layer to verify their output (Phase II), and uses information theory to optimize the result (Phase III).

#### **Phase I: Generative Heuristics (The LLM Layer)**

The LLM is treated as a **Probability Distribution Generator**, not an oracle.

* **Function:** It ingests raw data (text, time series, user stories) and proposes a set of "candidate structures."  
* **Constraint:** The LLM is prompted via techniques like **Ontogenia** to produce structured outputs (e.g., JSON representing a graph or ontology TBox).  
* **Innovation:** We explicitly accept that this output contains hallucinations. The system does not trust the LLM; it exploits the LLM's intuition to traverse the vast search space of possible solutions.1

#### **Phase II: Categorical Formalization (The Logic Layer)**

The candidates are mapped to **Categorical Diagrams** (String Diagrams) and processed by the **Quantomatic** engine.

* **Mapping:** The entities and relations from Phase I are converted into objects (wires) and morphisms (boxes) in a free monoidal category.21  
* **Verification via Rewriting:** The system applies domain-specific rewrite rules defined in the Ontology. For example, ensuring no cycles in transitive properties.  
* **Quantomatic Execution:** The Python MCP wrapper sends the candidate graph to the Quantomatic core via JSON. Quantomatic attempts to rewrite the graph to a **Normal Form**. If the diagram rewrites to "Error" or fails to commute, the candidate is rejected, and feedback is sent back to Phase I.20

#### **Phase III: Arithmetic Encoding (The Storage Layer)**

The verified structure is stored and transmitted using **Context-Adaptive Binary Arithmetic Coding (CABAC)**.

* **Mechanism:** The verified diagram is serialized. The "probabilities" for the arithmetic coder are derived from the LLM's original confidence scores (Phase I), but *constrained* by the verified structure from Phase II.  
* **Causal Compression:** By compressing the *causal structure* (the diagram) rather than the surface statistics, the system achieves **Causal Compression**. This ensures that the stored knowledge is robust to distribution shifts (unlike the "paraphrasing" observed in simple LLM forecasting).4

### **7.2 Comparison of Diagrammatic Tools**

To understand why Quantomatic is the chosen engine for Phase II over modern alternatives, we present the following comparison:

| Feature | Quantomatic (2015) | PyZX (Modern) | DisCoPy (Modern) | FGA Requirement |
| :---- | :---- | :---- | :---- | :---- |
| **Language** | Standard ML (PolyML) | Python | Python | **Language Agnostic** (via JSON wrapper) |
| **Generality** | **Universal** (User-defined theories) | Specific (Quantum/Clifford+T) | General (Monoidal Categories) | **Universal** (Must handle any Domain Ontology) |
| **Matching** | **Isomorphism Modulo Theories** | Graph Matching | Graph Matching | **Iso Modulo Theories** (To fix LLM messiness) |
| **Logic** | **Bang Boxes (\!-boxes)** | Limited | Limited | **Bang Boxes** (For recursive/infinite structures) |

As shown, while PyZX and DisCoPy are excellent for their specific domains (Quantum Computing and NLP, respectively), they lack the generalized matching capabilities and logic (Bang Boxes) required for a universal neuro-symbolic architecture.22

## ---

**8\. Conclusion: The Path to Verifiable AI**

The Formalized Generative Architecture represents a paradigm shift from "Big AI" (scaling parameters) to "Structured AI" (scaling logic). By synthesizing the generative power of LLMs with the formal verification of Category Theory and the efficiency of Arithmetic Coding, FGA offers a definitive path out of the "Hallucination Trap."

The architecture assigns clear roles:

1. **Ontologies** provide the *Goal*: Defining what is true in a domain.  
2. **LLMs** provide the *Guess*: Heuristically navigating the search space to propose solutions.  
3. **Quantomatic** provides the *Proof*: Rigorously verifying and rewriting the guess using subgraph isomorphism modulo theories.  
4. **Arithmetic Coding** provides the *Metric*: Ensuring the result is information-theoretically efficient and serves as a proxy for "understanding."

This report establishes the theoretical and practical foundations for FGA. It highlights that the future of reliable AI lies not just in new models, but in the intelligent integration of "lost" technologies like Quantomatic with the cutting-edge capabilities of generative models. This architecture does not just predict the future token; it constructs a verifiable, causal, and compressed model of the world.

#### **Works cited**

1. arXiv:2503.05388v1 \[cs.AI\] 7 Mar 2025, accessed December 20, 2025, [https://arxiv.org/pdf/2503.05388?](https://arxiv.org/pdf/2503.05388)  
2. Ontology Generation Using Large Language Models, accessed December 20, 2025, [https://www.springerprofessional.de/en/ontology-generation-using-large-language-models/51050672](https://www.springerprofessional.de/en/ontology-generation-using-large-language-models/51050672)  
3. Ontology Generation Using Large Language Models | Request PDF, accessed December 20, 2025, [https://www.researchgate.net/publication/392242831\_Ontology\_Generation\_Using\_Large\_Language\_Models](https://www.researchgate.net/publication/392242831_Ontology_Generation_Using_Large_Language_Models)  
4. From human experts to machines: An LLM supported approach to ..., accessed December 20, 2025, [https://arxiv.org/abs/2403.08345](https://arxiv.org/abs/2403.08345)  
5. Towards the Automation of Knowledge Graph Construction Using ..., accessed December 20, 2025, [https://ceur-ws.org/Vol-3874/paper2.pdf](https://ceur-ws.org/Vol-3874/paper2.pdf)  
6. Phoenixes at LLMs4OL 2025 Task A: Ontology Learning With Large ..., accessed December 20, 2025, [https://www.tib-op.org/ojs/index.php/ocp/article/download/2888/2932/53025](https://www.tib-op.org/ojs/index.php/ocp/article/download/2888/2932/53025)  
7. Leveraging LLM for Automated Ontology Extraction and Knowledge ..., accessed December 20, 2025, [https://www.researchgate.net/publication/386374943\_Leveraging\_LLM\_for\_Automated\_Ontology\_Extraction\_and\_Knowledge\_Graph\_Generation](https://www.researchgate.net/publication/386374943_Leveraging_LLM_for_Automated_Ontology_Extraction_and_Knowledge_Graph_Generation)  
8. Context-adaptive binary arithmetic coding for deep neural network ..., accessed December 20, 2025, [https://iphome.hhi.de/samek/pdf/WieCDNNR19.pdf](https://iphome.hhi.de/samek/pdf/WieCDNNR19.pdf)  
9. Context-adaptive binary arithmetic coding for deep neural network ..., accessed December 20, 2025, [https://www.researchgate.net/publication/333260186\_DeepCABAC\_Context-adaptive\_binary\_arithmetic\_coding\_for\_deep\_neural\_network\_compression](https://www.researchgate.net/publication/333260186_DeepCABAC_Context-adaptive_binary_arithmetic_coding_for_deep_neural_network_compression)  
10. A Universal Compression Algorithm for Deep Neural Networks, accessed December 20, 2025, [https://iphome.hhi.de/samek/pdf/WieJSTSP20.pdf](https://iphome.hhi.de/samek/pdf/WieJSTSP20.pdf)  
11. DeepCABAC binarization of neural networks. It encodes each weight..., accessed December 20, 2025, [https://www.researchgate.net/figure/DeepCABAC-binarization-of-neural-networks-It-encodes-each-weight-element-by-performing\_fig1\_338882714](https://www.researchgate.net/figure/DeepCABAC-binarization-of-neural-networks-It-encodes-each-weight-element-by-performing_fig1_338882714)  
12. LLMZip: Lossless Text Compression using Large Language ... \- arXiv, accessed December 20, 2025, [https://arxiv.org/abs/2306.04050](https://arxiv.org/abs/2306.04050)  
13. LLMZip: Lossless Text Compression using Large Language Models, accessed December 20, 2025, [https://openreview.net/forum?id=jhCzPwcVbG](https://openreview.net/forum?id=jhCzPwcVbG)  
14. LANGUAGE MODELING IS COMPRESSION \- ICLR Proceedings, accessed December 20, 2025, [https://proceedings.iclr.cc/paper\_files/paper/2024/file/3cbf627fa24fb6cb576e04e689b9428b-Paper-Conference.pdf](https://proceedings.iclr.cc/paper_files/paper/2024/file/3cbf627fa24fb6cb576e04e689b9428b-Paper-Conference.pdf)  
15. Generative Latent Coding for Ultra-Low Bitrate Image Compression, accessed December 20, 2025, [https://www.researchgate.net/publication/384216725\_Generative\_Latent\_Coding\_for\_Ultra-Low\_Bitrate\_Image\_Compression](https://www.researchgate.net/publication/384216725_Generative_Latent_Coding_for_Ultra-Low_Bitrate_Image_Compression)  
16. DLF: Extreme Image Compression with Dual-generative Latent Fusion, accessed December 20, 2025, [https://arxiv.org/html/2503.01428v3](https://arxiv.org/html/2503.01428v3)  
17. Lossless Compression of Large Language Model-Generated Text ..., accessed December 20, 2025, [https://arxiv.org/html/2505.06297v1](https://arxiv.org/html/2505.06297v1)  
18. arXiv:1503.01034v2 \[cs.LO\] 13 Oct 2015, accessed December 20, 2025, [https://arxiv.org/pdf/1503.01034](https://arxiv.org/pdf/1503.01034)  
19. What is a diagram? \- DisCoPy documentation, accessed December 20, 2025, [https://docs.discopy.org/en/main/notebooks/diagrams.html](https://docs.discopy.org/en/main/notebooks/diagrams.html)  
20. PyZX: Large Scale Automated Diagrammatic Reasoning, accessed December 20, 2025, [https://repository.ubn.ru.nl/bitstream/handle/2066/221050/221050.pdf?sequence=1](https://repository.ubn.ru.nl/bitstream/handle/2066/221050/221050.pdf?sequence=1)  
21. DisCoPy: the Hierarchy of Graphical Languages in Python \- arXiv, accessed December 20, 2025, [https://arxiv.org/pdf/2311.10608](https://arxiv.org/pdf/2311.10608)  
22. The Mathematics of Text Structure \- ResearchGate, accessed December 20, 2025, [https://www.researchgate.net/publication/350204248\_The\_Mathematics\_of\_Text\_Structure](https://www.researchgate.net/publication/350204248_The_Mathematics_of_Text_Structure)  
23. String diagrams \- λambeq 0.5.0 \- Quantinuum Documentation, accessed December 20, 2025, [https://docs.quantinuum.com/lambeq/guide/string-diagrams.html](https://docs.quantinuum.com/lambeq/guide/string-diagrams.html)  
24. Quantum NLP with lambeq, accessed December 20, 2025, [https://msp.cis.strath.ac.uk/act2022/papers/ACT2022\_paper\_7003.pdf](https://msp.cis.strath.ac.uk/act2022/papers/ACT2022_paper_7003.pdf)  
25. Quantum Natural Language Processing II \- Medium, accessed December 20, 2025, [https://medium.com/cambridge-quantum-computing/quantum-natural-language-processing-ii-6b6a44b319b2](https://medium.com/cambridge-quantum-computing/quantum-natural-language-processing-ii-6b6a44b319b2)  
26. Daily Papers \- Hugging Face, accessed December 20, 2025, [https://huggingface.co/papers?q=theoretical%20constructions](https://huggingface.co/papers?q=theoretical+constructions)  
27. Daily Papers \- Hugging Face, accessed December 20, 2025, [https://huggingface.co/papers?q=formal%20symbolic%20manipulation](https://huggingface.co/papers?q=formal+symbolic+manipulation)  
28. Quantomatic is a tool for doing automated graph rewriting. \- GitHub, accessed December 20, 2025, [https://github.com/zxcalc/quantomatic](https://github.com/zxcalc/quantomatic)  
29. Quantum Circuit Compilation From The Ground Up, accessed December 20, 2025, [https://uwaterloo.ca/applied-mathematics/sites/default/files/uploads/documents/quantum\_circuit\_compilation\_from\_the\_ground\_up.pdf](https://uwaterloo.ca/applied-mathematics/sites/default/files/uploads/documents/quantum_circuit_compilation_from_the_ground_up.pdf)  
30. Understandable Proofs in Graphical Calculi, accessed December 20, 2025, [https://www.cs.ox.ac.uk/people/bob.coecke/Michael\_Wang.pdf](https://www.cs.ox.ac.uk/people/bob.coecke/Michael_Wang.pdf)  
31. (PDF) Tinker, tailor, solver, proof \- ResearchGate, accessed December 20, 2025, [https://www.researchgate.net/publication/267627431\_Tinker\_tailor\_solver\_proof](https://www.researchgate.net/publication/267627431_Tinker_tailor_solver_proof)  
32. Tinker, tailor, solver, proof \- CSE CGI Server, accessed December 20, 2025, [https://cgi.cse.unsw.edu.au/\~eptcs/paper.cgi?UITP2014.5.pdf](https://cgi.cse.unsw.edu.au/~eptcs/paper.cgi?UITP2014.5.pdf)  
33. Understanding and maintaining tactics graphically OR how we are ..., accessed December 20, 2025, [https://scispace.com/pdf/understanding-and-maintaining-tactics-graphically-or-how-we-4pgdcq8uct.pdf](https://scispace.com/pdf/understanding-and-maintaining-tactics-graphically-or-how-we-4pgdcq8uct.pdf)  
34. core/ROOT.ML · 8b7f9ac7e7bc71eb129c12121da4da24778544ff ..., accessed December 20, 2025, [https://gitlab.cis.strath.ac.uk/kwb13215/Quantomatic\_Strathclyde\_branch/-/blob/8b7f9ac7e7bc71eb129c12121da4da24778544ff/core/ROOT.ML](https://gitlab.cis.strath.ac.uk/kwb13215/Quantomatic_Strathclyde_branch/-/blob/8b7f9ac7e7bc71eb129c12121da4da24778544ff/core/ROOT.ML)