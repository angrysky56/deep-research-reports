

# **A Formal Workflow for Neuro-Symbolic Concept Engineering: Integrating LMQL and Prolog for Dynamic Knowledge Implementation**

## **Executive Summary**

This report formalizes the discipline of 'Concept Engineering' by proposing a novel, five-phase neuro-symbolic workflow. This structured process enables an Artificial Intelligence (AI) system to dynamically acquire, represent, validate, and operationalize new knowledge from unstructured, natural language user requests. The architecture addresses the inherent limitations of purely neural or symbolic AI paradigms by creating a robust, hybrid system. At its core, the workflow redefines the role of a Large Language Model (LLM) from a monolithic knowledge source to a sophisticated probabilistic translation engine. The LLM's primary function is to interpret ambiguous user input and convert it into structured, preliminary conceptual components.

The Language Model Query Language (LMQL) serves as the critical control layer, acting as a bridge between the neural and symbolic components. Through a combination of procedural scripting and declarative constraints, LMQL enforces syntactic correctness and semantic coherence, guiding the LLM to generate valid, unambiguous code for a symbolic backend. This backend is implemented in Prolog, a logic programming language that functions as the system's ground-truth reasoning engine. New concepts are assimilated into a Prolog knowledge base as facts and rules, where they are validated for consistency and used for formal, verifiable inference.

The proposed workflow consists of five distinct phases: (1) Concept Elicitation and Interpretation, where the LLM parses the user request; (2) Constrained Symbolic Formulation, where LMQL guides the LLM to generate Prolog clauses; (3) Knowledge Base Assimilation and Validation, where the Prolog engine integrates and verifies the new knowledge; (4) Knowledge Operationalization and Reasoning, where the system uses the updated knowledge base to answer queries; and (5) Response Synthesis and Explanation, where the LLM generates a human-readable answer and a logically-grounded explanation of its reasoning process. This report details the theoretical foundations, phased implementation, and technical architecture of this system, arguing that such a neuro-symbolic approach is essential for developing AI that is not only powerful but also transparent, adaptable, and trustworthy.

## **1.0 Introduction: Defining Concept Engineering in the Modern AI Landscape**

The rapid evolution of Large Language Models (LLMs) has created unprecedented capabilities in natural language understanding and generation. However, these models, in their standard form, operate as stateless, probabilistic systems, which limits their reliability, explainability, and capacity for dynamic, verifiable learning.1 To overcome these limitations, a more sophisticated approach is required—one that integrates the fluency of neural networks with the rigor of formal logic. This report introduces and formalizes the discipline of 'Concept Engineering': a structured workflow for an AI system to assimilate and reason with new knowledge derived directly from user interaction. This approach is fundamentally neuro-symbolic, leveraging the strengths of LLMs, the control of the Language Model Query Language (LMQL), and the logical power of Prolog to create a more robust and adaptable AI.

### **1.1 Synthesizing Representation Engineering and Knowledge Engineering**

Concept Engineering, as formalized here, is a novel discipline that synthesizes principles from two distinct fields of AI: Representation Engineering and traditional Knowledge Engineering. It extends beyond the capabilities of either paradigm alone by creating a dynamic, automated process for building and reasoning with an explicit knowledge model.

**Representation Engineering (RepE)** is a recently emerged paradigm for controlling the behavior of LLMs by directly manipulating their internal representations of concepts.3 Instead of modifying the model's inputs (prompting) or its weights (fine-tuning), RepE identifies how a human-understandable concept, such as "honesty" or "optimism," is encoded in the model's activation space and then steers that representation at inference time.3 This is typically achieved through a three-step pipeline: representation identification, operationalization (e.g., defining a concept as a vector), and control.3 The primary advantage of RepE is its ability to modulate pre-existing, latent concepts within the model in a data-efficient and flexible manner, often with less degradation to the model's general capabilities compared to fine-tuning.3

**Knowledge Engineering (KE)**, in contrast, is a classical AI discipline focused on building explicit knowledge-based systems.6 The process involves a structured lifecycle: knowledge acquisition from human domain experts, knowledge representation in a formal language (e.g., using rules or ontologies), validation of the knowledge base, and its subsequent refinement and integration into an AI system with an inference engine.6 KE produces systems that are highly interpretable and capable of logical reasoning, but the process of knowledge acquisition and encoding is traditionally manual, laborious, and struggles with the ambiguity of natural language.8

Concept Engineering bridges these two worlds. It automates the KE lifecycle by positioning the LLM as both the "domain expert" and the initial "knowledge engineer." The LLM uses its vast, pre-trained world knowledge to interpret a user's unstructured request, and its generative capabilities are then harnessed to formulate this understanding into explicit, formal knowledge. This process is not about steering latent concepts already within the LLM (as in RepE), but about using the LLM to externalize and structure *new*, user-defined concepts for a separate, symbolic system.

The following table provides a comparative analysis of these paradigms, positioning Concept Engineering as a distinct and powerful synthesis.

| Paradigm | Mechanism | Locus of Knowledge | Primary Use Case | Interpretability | Dynamism/Adaptability | Cost |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Concept Engineering (Proposed)** | LLM translates user input into explicit Prolog clauses, guided by LMQL constraints. Prolog engine performs reasoning. | Explicit, in an external, verifiable Prolog knowledge base. | Dynamically building and reasoning with new, user-defined conceptual models from natural language. | High. Reasoning is based on explicit, traceable logic in Prolog. | Very High. New concepts can be added and validated at runtime. | Moderate. Inference cost for LLM translation and Prolog reasoning. |
| **Representation Engineering (RepE)** | Direct manipulation of the LLM's internal activation space at inference time.3 | Implicit, latent within the LLM's pre-trained weights and activation patterns. | Modulating abstract, pre-existing qualities of LLM output (e.g., style, tone, safety).3 | Medium. Provides insights into model internals but can be misleading.3 | High. Control is applied at inference time without retraining. | Low. Cheaper than fine-tuning, but requires white-box model access.3 |
| **Prompt Engineering** | Modifying the natural language input (prompt) to guide the LLM's output.10 | Implicit, within the LLM's pre-trained weights. The prompt only provides context.1 | Steering LLM behavior for specific tasks on a case-by-case basis. | Low. The LLM's reasoning process remains a "black box." | High. Prompts can be changed for every query. | Low to Moderate. Can increase computational cost by consuming context window space.3 |
| **Fine-Tuning** | Further training the LLM's weights on a specific dataset or with a reward signal.3 | Implicit, updated within the LLM's weights. | Adapting an LLM to a specific domain or task where persistent knowledge is required. | Very Low. Modifies millions of parameters in an uninterpretable way. | Low. Requires a static dataset and a costly, offline training process. | High. Computationally expensive and data-intensive. |
| **Knowledge Engineering (Classical)** | Manual acquisition and formalization of human expert knowledge into a structured knowledge base.6 | Explicit, in a structured database, ontology, or rule-based system. | Creating expert systems for well-defined domains with stable knowledge (e.g., medical diagnosis).6 | Very High. Based entirely on human-authored, explicit rules and facts. | Low. Updating the knowledge base is a manual, resource-intensive process.6 | High. Requires significant time from both domain experts and knowledge engineers. |

### **1.2 The Imperative for Neuro-Symbolic Systems: Bridging Sub-symbolic Learning and Formal Reasoning**

The necessity for a hybrid, neuro-symbolic architecture arises directly from the complementary weaknesses of its constituent paradigms. LLMs, while powerful, are fundamentally sub-symbolic pattern recognizers. They operate on statistical correlations in data, not on principles of logic.12 This leads to several critical limitations:

* **Lack of Verifiable Truth:** LLMs are prone to "hallucination," generating factually incorrect or nonsensical information with high confidence because they lack an underlying model of truth.2 Their knowledge is implicit and cannot be externally verified or easily corrected.  
* **Opaque Reasoning:** The decision-making process of an LLM is distributed across billions of parameters, making it a "black box".2 This opacity is a significant barrier to trust and deployment in high-stakes domains where explainability is paramount.  
* **Statelessness:** LLMs are essentially "stateless text predictors" that rely entirely on the information provided within their context window for a given query.1 They do not maintain a persistent, evolving understanding of a domain across interactions without external mechanisms.

Symbolic AI systems, such as those built with Prolog, exhibit the opposite characteristics. They are built on a foundation of formal logic, providing:

* **Verifiable Truth:** Knowledge is represented as explicit facts and rules in a knowledge base.14 All deductions are traceable and logically sound based on this explicit knowledge.  
* **Explainable Reasoning:** The inference process, typically using mechanisms like backward chaining with modus ponens, can be recorded and presented as a formal proof, offering complete transparency.15  
* **Statefulness:** The knowledge base is a persistent, stateful representation of the domain that can be incrementally and consistently updated.

However, symbolic systems are notoriously brittle. They require perfectly structured, unambiguous input and struggle to handle the nuance, variability, and noise inherent in real-world data and natural language.9 The manual effort required to encode knowledge is a major bottleneck to their scalability and adaptability.9

The neuro-symbolic approach proposed here directly addresses this impasse. It leverages each component for what it does best. The LLM acts as a "neural frontend," processing unstructured and ambiguous natural language from the user. The Prolog system serves as the "symbolic backend," providing a robust, stateful, and verifiable reasoning engine.17 This combination seeks to achieve a system that can learn fluidly from natural interaction while reasoning with logical precision.

### **1.3 The Core Components: The Roles of the LLM, LMQL, and Prolog**

The Concept Engineering workflow is orchestrated through the interplay of three core technological components, each with a distinct and critical role.

* **The LLM (The Universal Interpreter):** In this architecture, the LLM's primary function is not to be the final arbiter of truth, but rather to act as a universal translator and probabilistic parser. It deconstructs a user's natural language request, which may be ambiguous or incomplete, into its fundamental conceptual components—entities, attributes, rules, and relationships. Its value lies not in *what it knows*, but in its unparalleled ability to *understand what a user says* and structure that understanding for a more rigorous system.  
* **LMQL (The Constrained Bridge):** The Language Model Query Language (LMQL) is the essential control layer that makes the translation from neural to symbolic reliable.18 Moving beyond simple prompting, LMQL enables "Language Model Programming" (LMP), a paradigm that combines scripting with declarative constraints.19 In this workflow, LMQL is used to write queries that force the LLM's probabilistic output to conform to the rigid syntax of the Prolog backend. For example, an LMQL query can constrain the LLM's output to be a valid list, to match a regular expression, or to be one of a specific set of choices.22 This transforms the LLM from an unreliable generator into a constrained producer of valid symbolic code, effectively bridging the gap between the two paradigms.  
* **Prolog (The Ground-Truth Engine):** Prolog serves as the system's external, verifiable "world model" and source of logical truth.9 New knowledge, once translated and validated, is assimilated into a Prolog knowledge base (KB) as a collection of facts and rules.14 Prolog's built-in inference engine is then used to perform all subsequent logical reasoning. When the system needs to answer a question, it is Prolog that queries the KB and derives a logically sound answer. This ensures that the system's reasoning is always grounded in an explicit, inspectable, and consistent set of statements, providing a foundation for true explainability and trust.2 The integration of Prolog allows for the validation of LLM outputs against symbolic rules, drastically reducing the probability of factual errors and hallucinations.17

## **2.0 Theoretical Foundations of Dynamic Knowledge Management**

The proposed Concept Engineering workflow is not an ad-hoc construction but is deeply rooted in established principles from both modern and classical AI research. It strategically adapts concepts from Representation Engineering for stylistic control while building its core logic on an automated, neuro-symbolic implementation of the Knowledge Engineering lifecycle, using ontology as its structural blueprint.

### **2.1 Representation Engineering (RepE): Manipulating Concepts Within the LLM**

Representation Engineering provides a powerful toolkit for influencing LLM behavior at inference time.3 The core RepE pipeline, as formalized in recent research, involves three stages 3:

1. **Representation Identification:** This step aims to discover how a concept is represented in the model's high-dimensional activation space. Common methods involve stimulating the model with contrasting inputs (e.g., sentences with positive vs. negative sentiment) and analyzing the differential activations.3  
2. **Operationalization:** This involves making an assumption about the geometric structure of the concept's representation. A prevalent assumption is the Linear Representation Hypothesis, which posits that concepts correspond to linear directions in the activation space. This leads to the creation of "Concept Activation Vectors" (CAVs), which are vectors that point in the direction of a concept.27  
3. **Representation Control:** Once a concept operator like a CAV is identified, it can be used to steer the model's output. This is typically done by adding or subtracting the CAV from the model's activations at an intermediate layer during inference, effectively increasing or decreasing the presence of the associated concept in the final output.3

In the context of the Concept Engineering workflow, RepE's role is strategic but secondary. RepE excels at modulating *abstract, inherent qualities* for which the LLM has likely already formed a latent representation during its extensive training, such as politeness, verbosity, or toxicity.5 However, it is less suited for the primary goal of our workflow, which is to introduce

*novel, concrete, factual knowledge*—for instance, the specific rules of a proprietary business process or the characters in a new fictional story. An LLM has no pre-existing internal representation for such concepts.

Therefore, within our proposed architecture, RepE is not used to engineer the core factual knowledge. Instead, it can be employed as a "stylistic control" module in the final phase of the workflow (Response Synthesis). For example, after the Prolog engine has derived a factual answer, RepE could be used to ensure the LLM presents that answer in a "more confident" or "less technical" style by steering the relevant abstract concept representations. This leverages RepE's strengths—being more effective and less damaging to general capabilities than prompting or fine-tuning for targeted control 3—without misapplying it to tasks for which it is not designed.

### **2.2 Principles of Automated Knowledge Engineering**

The core of the Concept Engineering workflow is an automated, neuro-symbolic implementation of the classical Knowledge Engineering (KE) lifecycle.6 This lifecycle, traditionally a manual process, is adapted for dynamic interaction as follows 6:

* **Acquisition:** The process begins with the LLM's interpretation of the user's natural language request, effectively replacing interviews with a human expert.  
* **Representation:** The LMQL-guided generation of syntactically correct Prolog clauses serves as the automated knowledge representation step.  
* **Validation:** The Prolog engine's automated check of new clauses for consistency and logical contradiction against the existing knowledge base replaces manual validation.  
* **Refinement:** A crucial feedback loop is introduced where validation failures are passed back to the LLM, prompting it to generate a corrected representation. This automates the refinement process.  
* **Integration and Inference:** The successfully validated knowledge is immediately integrated (asserted) into the Prolog KB and becomes available for use by the inference engine to answer subsequent queries.

A critical underpinning of this automated KE process is the use of ontology as the conceptual blueprint for the knowledge base. An ontology is a formal, explicit specification of a shared conceptualization, defining the concepts, properties, relationships, and constraints within a domain.28 It provides the "schema" or "scaffolding" upon which the knowledge base is built.30

The proposed system architecture necessitates a dual-layered knowledge structure, both of which can be represented in Prolog:

1. **The Knowledge Base (KB):** This layer stores the specific, ground-truth facts and rules about the domain of interest. It contains *instances* of concepts. For example: is\_sedan(vin123). or has\_color(my\_car, red)..  
2. **The Ontological Meta-KB:** This layer stores facts and rules *about the concepts themselves*. It defines the schema, including class hierarchies, properties, and relationships. It contains the *definitions* of concepts. For example: subclass\_of(sedan, vehicle). or has\_property(vehicle, has\_wheels)..

This dual structure is essential for deep reasoning. A system that only stores ground-truth facts can answer simple questions like "Is my car red?". However, a system with an ontological layer can answer much more complex queries like "What are the defining properties of a sedan?" or "List all types of vehicles known to the system." This requires the Concept Engineering workflow to be sophisticated enough to distinguish between instance-level statements and schema-level (ontological) statements within a user's request. When a user says, "My car, VIN123, is a sedan, and sedans are a type of vehicle," the LMQL-guided process must generate clauses for both layers: instance\_of(vin123, sedan). for the KB, and subclass\_of(sedan, vehicle). for the Meta-KB. This elevates the task from simple fact generation to a more powerful form of dynamic schema evolution. The key components of an ontology—Individuals, Classes, Attributes, and Relations 31—map directly and elegantly to Prolog's fundamental constructs of atoms, variables, and predicates.

## **3.0 The Concept Engineering Workflow: A Phased Approach**

The Concept Engineering workflow is a structured, five-phase process that transforms an unstructured user request into an operational and verifiable knowledge asset within the AI system. This process is not strictly linear; it incorporates feedback loops and recursive calls to its own modules, creating an agent-like, self-correcting system. The following table provides a high-level overview of the roles of each major component across the five phases.

| Component | Phase 1: Elicitation | Phase 2: Formulation | Phase 3: Assimilation | Phase 4: Reasoning | Phase 5: Synthesis |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **User** | Provides initial natural language request or subsequent query. | (Passive) | (Passive) | Provides query that requires reasoning. | Receives final response and explanation. |
| **LLM** | Interprets user request, decomposing it into preliminary structured data (e.g., JSON). | Generates candidate Prolog clauses based on structured data, under the strict guidance of LMQL. | Receives validation failure messages and re-interprets them to generate corrected clauses. | Translates the user's natural language query into a formal Prolog goal. | Synthesizes a natural language response and explanation from the Prolog engine's logical output. |
| **LMQL** | (Not active) | Enforces syntactic validity and semantic constraints on the LLM's output, ensuring it generates correct Prolog code. | (Active in correction loop) Constrains the generation of corrected clauses. | Constrains the LLM to generate a syntactically valid Prolog query. | (Can be used to constrain response format or style). |
| **Python Orchestrator** | Manages the overall process flow; sends user request to the LLM. | Receives structured data from LLM; initiates scripted LMQL queries to generate clauses. | Sends candidate clauses to Prolog; manages validation sub-loop; routes failures back to LLM. | Manages the query translation sub-process; sends the final Prolog query to the engine; receives results. | Sends Prolog results to LLM for synthesis; delivers final response to user. |
| **Prolog Engine** | (Passive) | (Passive) | Receives candidate clauses; asserts them into the KB; executes validation queries; reports success or failure. | Executes the formal query against the updated KB; returns logical results and proof trace. | Provides logical results and proof trace for explanation. |

### **3.1 Phase 1: Concept Elicitation and Interpretation**

This initial phase serves as the bridge from human language to a machine-tractable format. It leverages the LLM's powerful natural language understanding capabilities to parse and structure the user's intent.

* **Input:** A raw, unstructured natural language request from the user. For example: *"I need to manage my team's tasks. Every task has a unique ID, a description, an assignee, and a priority level, which must be 'High', 'Medium', or 'Low'. The task 'T-101', 'Refactor login module', is assigned to Alice and has a 'High' priority."*  
* **Processing:** The Python Orchestrator wraps this user request in a high-level prompt and sends it to the LLM. This is a form of **Context Engineering**, where the goal is to provide the model with all the necessary information to perform a specific task.1 The prompt instructs the LLM to act as an analyst, decomposing the request into its constituent conceptual parts. The prompt might be:  
  *"Analyze the following user request. Identify all new concepts, their attributes, any rules or constraints governing them, and any specific instances mentioned. Output your analysis as a structured JSON object."*  
* **Output:** The LLM produces a structured, preliminary representation of its understanding. This output is not yet formal knowledge but an intermediate data structure that is easier for the subsequent phases to process. For the example input, the output might be:  
  JSON  
  {  
    "concepts": {  
      "task": {  
        "attributes": \["id", "description", "assignee", "priority"\]  
      }  
    },  
    "rules": {  
      "priority": {  
        "type": "enum",  
        "values": \["High", "Medium", "Low"\]  
      }  
    },  
    "instances":  
  }

### **3.2 Phase 2: Constrained Symbolic Formulation via LMQL**

This is the most critical phase of the workflow, where the interpreted concepts are translated into formal, verifiable symbolic code. It relies heavily on the capabilities of LMQL to ensure the reliability of this translation.

* **Input:** The structured JSON object produced in Phase 1\.  
* **Processing:** The Python Orchestrator parses the JSON and executes a series of scripted, targeted LMQL queries. LMQL's ability to combine procedural Python logic with declarative prompting is essential here.33 The orchestrator iterates through the JSON:  
  * For each new concept, it calls an LMQL function to generate the ontological definition (e.g., defining task as a class).  
  * For each attribute, it generates a property definition (e.g., has\_attribute(task, priority).).  
  * For each rule, it uses a constrained LMQL query to generate the corresponding Prolog rule. For the priority levels, the query would constrain the LLM to produce a member/2 check.  
  * For each instance, it generates the specific facts.  
* **LMQL in Action:** LMQL's strength lies in its where clause, which can enforce complex constraints during the LLM's decoding process.19 This prevents the LLM from generating syntactically incorrect or semantically nonsensical code. A custom constraint function, say  
  is\_valid\_prolog\_clause(text), can be defined in Python and used within LMQL to programmatically check that the generated text is a valid Prolog term ending in a period.  
  Python  
  \# Simplified Python-side custom constraint validator  
  def is\_valid\_prolog\_clause(text):  
      \# This would involve a more robust parser in a real implementation  
      return text.strip().endswith('.') and '(' in text

  \# Example LMQL query using the custom constraint  
  @lmql.query  
  def generate\_instance\_fact(instance\_data):  
      '''lmql  
      "Given the instance data: {instance\_data}.  
      Generate a single Prolog fact representing this instance.  
      The fact should be in the format: concept(id)."  
      ""  
      where is\_valid\_prolog\_clause(PROLOG\_FACT) and STOPS\_AT(PROLOG\_FACT, '.')  
      '''

* **Output:** A list of strings, where each string is a candidate Prolog clause ready for validation. For our example, the output would be a list like:  
  * 'class(task).'  
  * 'has\_attribute(task, id).'  
  * 'has\_attribute(task, description).'  
  * 'has\_attribute(task, assignee).'  
  * 'has\_attribute(task, priority).'  
  * 'valid\_priority(P) :- member(P, \['High', 'Medium', 'Low'\]).'  
  * 'task(\\'T-101\\').'  
  * 'has\_property(\\'T-101\\', description, \\'Refactor login module\\').'  
  * 'has\_property(\\'T-101\\', assignee, \\'Alice\\').'  
  * 'has\_property(\\'T-101\\', priority, \\'High\\').'

The following table details several common patterns for using LMQL to generate different types of Prolog structures.

| Target Prolog Structure | LMQL Constraint Logic | Example LMQL Snippet | Generated Prolog Output |
| :---- | :---- | :---- | :---- |
| **Simple Fact** | Enforce predicate-argument syntax and termination with a period. | "Represent that 'Homer' is male." where is\_valid\_prolog\_clause(FACT) | male(homer). |
| **Rule with Conjunction** | Ensure multiple body goals are separated by commas and the head/body structure is correct. | "A person is a parent if they are a mother or a father. Generate the rule for parent(X,Y)." where "mother(X,Y)" in RULE and "father(X,Y)" in RULE | parent(X,Y) :- mother(X,Y); father(X,Y). |
| **Rule with Value Constraint** | Force the generation to use a specific predicate (member/2) and a list of atoms. | "A priority is valid if it is 'High', 'Medium', or 'Low'. Generate the rule for valid\_priority(P)." where "member(P, \['High', 'Medium', 'Low'\])" in RULE | valid\_priority(P) :- member(P, \['High', 'Medium', 'Low'\]). |
| **Ontological Fact** | Constrain the output to a specific ontological predicate like subclass\_of/2. | "A 'cat' is a type of 'mammal'. Represent this subclass relationship." where "subclass\_of(cat, mammal)" in ONTOLOGY\_FACT | subclass\_of(cat, mammal). |

### **3.3 Phase 3: Knowledge Base Assimilation and Validation in Prolog**

Once candidate clauses are formulated, they must be integrated into the symbolic core and validated for consistency.

* **Input:** The list of candidate Prolog clauses from Phase 2\.  
* **Processing:** The Python Orchestrator communicates with the persistent Prolog engine using an integration library like janus-swi.35  
  1. **Assertion:** For each candidate clause, the orchestrator calls Prolog's assertz/1 predicate, which adds the clause to the end of the knowledge base.  
  2. **Validation Sub-Loop:** This is the critical self-correcting mechanism. After asserting a clause, the system immediately runs pre-defined validation queries against the KB. For the example has\_property('T-101', priority, 'High')., the system would run the query ?- valid\_priority('High').. If this query succeeds, the fact is consistent with the system's rules.  
  3. **Contradiction Detection:** The system can also run more complex queries to check for logical contradictions. For example, if the KB contained disjoint\_classes(task, project). and the user tried to define an entity as both, a validation query could detect this conflict.  
  4. **Feedback on Failure:** If any validation query fails, the assertion is retracted from the KB. The orchestrator then packages the failed clause and the error message from the validation query (e.g., "Validation failed: 'urgent' is not a valid priority. Valid priorities are 'High', 'Medium', 'Low'.") and sends this information back to the LLM, re-initiating Phase 1 and 2 in a targeted "correction mode." The LLM is prompted to generate a corrected clause based on the specific error.  
* **Output:** A binary status: either SUCCESS, indicating the knowledge was successfully assimilated, or FAILURE with a detailed error message, which triggers the correction loop.

### **3.4 Phase 4: Knowledge Operationalization and Reasoning**

With the knowledge base updated, the system is now capable of using this new knowledge to perform logical reasoning.

* **Input:** A new user query that requires reasoning over the newly defined concepts, e.g., *"Which tasks are assigned to Alice?"*  
* **Processing:** This phase demonstrates the recursive nature of the workflow, as it re-uses the initial phases as a sub-process for query translation.  
  1. **Query Interpretation (Phase 1 redux):** The user's natural language query is sent to the LLM with the goal of translating it into a formal, executable goal.  
  2. **Prolog Goal Formulation (Phase 2 redux):** LMQL is used to constrain the LLM's output to be a syntactically valid Prolog query. For the example, the target query would be: findall(ID, (task(ID), has\_property(ID, assignee, 'Alice')), Tasks).  
  3. **Execution:** The Python Orchestrator takes this generated Prolog query and executes it against the Prolog engine using janus.query\_once().35  
* **Output:** The raw, logical result from the Prolog engine, captured in a Python dictionary. For the example, this would be: {'Tasks':, 'truth': True}.

### **3.5 Phase 5: Response Synthesis and Explanation**

The final phase translates the logical result back into a human-friendly format and provides crucial explainability.

* **Input:** The logical output dictionary from the Prolog engine from Phase 4\.  
* **Processing:**  
  1. **Synthesis:** The Python Orchestrator passes the original user question and the logical result back to the LLM. The prompt instructs the LLM to synthesize a clear, natural language answer from the data. For example: *"The user asked: 'Which tasks are assigned to Alice?'. The system's logical query returned the following result: Tasks \=. Please formulate a helpful, human-readable response."*  
  2. **Explanation (XAI):** A key advantage of the symbolic backend is its inherent explainability. During its reasoning process, the Prolog engine can generate a proof trace.16 This trace details the specific facts and rules used, and the sequence of their application (modus ponens), to reach the conclusion.15 This formal proof trace can be provided to the LLM in the same prompt, with instructions to translate the logical steps into a step-by-step natural language explanation.2 The explanation is not a guess or a rationalization by the LLM; it is a translation of a verifiable, logical proof.  
* **Output:** A final, user-facing response that includes both the answer and its justification. For example: *"Alice is assigned to task T-101. This was determined by: 1\. Identifying all items of the 'task' type. 2\. For each task, checking the 'assignee' property. 3\. Filtering for tasks where the assignee is 'Alice'."*

## **4.0 System Architecture and Integration Patterns**

The successful implementation of the Concept Engineering workflow hinges on a well-designed, modular architecture that facilitates robust communication between its neural and symbolic components. The architecture is composed of three primary layers managed by a central orchestrator.

### **4.1 A Modular Neuro-Symbolic Architecture**

* **The Orchestration Layer (Python):** This is the central controller of the entire system, implemented in Python. It is responsible for managing the state of the five-phase workflow, directing the flow of data between the other components, and handling the logic of the main process loop as well as the nested correction and query loops. Python is the ideal choice for this layer due to its rich ecosystem of AI and web libraries, and critically, the availability of mature libraries for interfacing with both LLMs and Prolog engines.33  
* **The Neural Interface (LLM with LMQL):** This component is best implemented as a distinct service that the Orchestrator communicates with, for instance, via a REST API. This service encapsulates all interactions with the Large Language Model. It exposes specific endpoints for the tasks required by the workflow, such as interpret\_request, generate\_prolog\_clauses, and synthesize\_response. The lmql library resides within this service, managing the execution of constrained queries against the underlying LLM.18 A key architectural advantage of LMQL is its backend-agnostic design, allowing the system to seamlessly switch between different LLMs (e.g., local open-weight models or commercial APIs) with minimal changes to the code.18  
* **The Symbolic Core (Prolog Engine):** This is the stateful heart of the system, consisting of a persistent Prolog process, such as SWI-Prolog or Trealla Prolog.17 It is more than just a database; it is an active reasoning engine. An effective architectural pattern for this component is the  
  **Prolog-MCP (Model Context Protocol) Server**.17 This pattern exposes the Prolog engine as a logic-as-a-service, capable of maintaining persistent sessions and state across multiple calls from the Orchestrator. This is crucial for building a cumulative knowledge base that evolves over time. The ability to save and load the knowledge base to and from disk, a feature of this pattern, is essential for long-running applications and system persistence.17

### **4.2 Data Flow and Communication Protocols**

The reliability of the entire system depends on the integrity of the communication channels between its layers, particularly between the Python Orchestrator and the Prolog Symbolic Core.

* **Python-Prolog Integration with janus-swi:** The janus-swi library is the designated bridge for this communication, providing a bidirectional interface between SWI-Prolog and Python.35  
  * **Asserting Knowledge:** To add new knowledge to the KB, the Python Orchestrator will use janus functions. For loading a set of clauses, janus.consult(data=...) can be used. For adding individual clauses dynamically, the orchestrator will make repeated calls to janus.query\_once("assertz((...))."), where the clause is passed as an argument.  
  * **Querying for Reasoning:** When the system needs to reason, the orchestrator will use the appropriate query function. For deterministic queries that are expected to yield a single result (or none), janus.query\_once() is suitable. For non-deterministic queries that may yield multiple solutions (e.g., "find all tasks"), the orchestrator must use the janus.query() iterator.

The choice of janus-swi introduces a critical architectural consideration. The library's documentation explicitly warns that its iterators for non-deterministic queries are fragile. Specifically, an inner query iterator must be fully exhausted or explicitly closed before the next solution of an outer, nested query can be requested. Failure to manage this correctly can leave the Prolog engine in an inconsistent state, leading to unpredictable behavior or even process crashes.35

This is not a minor implementation detail; it is a fundamental constraint that must be addressed at the architectural level. A naive implementation that freely nests janus.query() calls without proper management is destined for instability. Therefore, the system architecture must enforce a **robust query management pattern**. The most effective way to achieve this is to mandate that all non-deterministic Prolog queries from the Python orchestrator are executed within a with statement. The janus.query() object implements Python's context manager protocol, which guarantees that its close() method is called upon exiting the with block, regardless of whether the loop completed normally or was exited via a break or an exception.35 This ensures that Prolog choice points are properly cleaned up, maintaining the stability of the symbolic core. This elevates a low-level coding practice into a high-level architectural principle:

**all symbolic queries must be executed within managed, atomic contexts to ensure system stability and reliability.** This principle is paramount to the successful construction of a dependable Concept Engineering system.

## **Conclusion**

This report has formalized the discipline of Concept Engineering by proposing a comprehensive, five-phase neuro-symbolic workflow. This architecture systematically addresses the core weaknesses of standalone LLM and symbolic AI systems by creating a synergistic hybrid. The workflow redefines the LLM's role as a powerful natural language interpreter and translator, while leveraging Prolog as an external, verifiable ground-truth engine for knowledge representation and logical reasoning. The introduction of LMQL as a constrained bridge is the critical innovation that ensures the reliability of the neural-to-symbolic translation, transforming the LLM's probabilistic output into syntactically valid and semantically coherent logical statements.

The detailed five-phase process—Elicitation, Formulation, Assimilation, Reasoning, and Synthesis—provides a modular and self-correcting framework. By incorporating a validation-and-refinement loop and reusing its core translation module for both knowledge assertion and query generation, the system moves beyond a simple linear pipeline to become a robust, agent-like architecture capable of dynamic learning and adaptation. The proposed dual-layered knowledge structure, comprising a ground-truth Knowledge Base and an Ontological Meta-KB, enables a far deeper level of reasoning and conceptual understanding than would otherwise be possible.

The architectural blueprint, centered on a Python orchestrator, a modular neural interface, and a persistent symbolic core, provides a practical path to implementation. However, the analysis also highlights that the stability of such a system is critically dependent on disciplined management of the interface between the procedural Python code and the declarative Prolog engine. The fragility of the integration layer must be treated as a first-class architectural concern, mandating patterns like managed query contexts to ensure system reliability.

Looking forward, the Concept Engineering workflow opens several avenues for future research. Enhancing the ontological reasoning capabilities to handle more complex class relationships and constraints automatically is a key area for development. Improving the efficiency and sophistication of the validation-and-correction feedback loop could significantly accelerate the knowledge assimilation process. Furthermore, extending this framework to multi-modal inputs, where concepts are derived from images or other data sources in addition to text, presents a compelling direction for creating even more powerful and versatile AI systems. Ultimately, the neuro-symbolic approach detailed in this report represents a significant step toward building AI that is not only intelligent but also transparent, trustworthy, and truly capable of learning from its interactions with the world.

#### **Works cited**

1. Context Engineering: Elevating AI Strategy from Prompt Crafting to Enterprise Competence | by Adnan Masood, PhD. | Jun, 2025 | Medium, accessed July 2, 2025, [https://medium.com/@adnanmasood/context-engineering-elevating-ai-strategy-from-prompt-crafting-to-enterprise-competence-b036d3f7f76f](https://medium.com/@adnanmasood/context-engineering-elevating-ai-strategy-from-prompt-crafting-to-enterprise-competence-b036d3f7f76f)  
2. \\systemname : A Prolog Synergized Language Model for explainable Domain Specific Knowledge Based Question Answering \- arXiv, accessed July 2, 2025, [https://arxiv.org/html/2409.11589v1](https://arxiv.org/html/2409.11589v1)  
3. Taxonomy, Opportunities, and Challenges of Representation ..., accessed July 2, 2025, [https://arxiv.org/pdf/2502.19649](https://arxiv.org/pdf/2502.19649)  
4. Taxonomy, Opportunities, and Challenges of Representation Engineering for Large Language Models \- OpenReview, accessed July 2, 2025, [https://openreview.net/pdf?id=2U1KIfmaU9](https://openreview.net/pdf?id=2U1KIfmaU9)  
5. Representation Engineering for Large-Language Models: Survey and Research Challenges, accessed July 2, 2025, [https://arxiv.org/html/2502.17601v1](https://arxiv.org/html/2502.17601v1)  
6. Knowledge Engineering Definition | DeepAI, accessed July 2, 2025, [https://deepai.org/machine-learning-glossary-and-terms/knowledge-engineering](https://deepai.org/machine-learning-glossary-and-terms/knowledge-engineering)  
7. knowledge engineering (KE) \- Autoblocks AI — Build Safe AI Apps, accessed July 2, 2025, [https://www.autoblocks.ai/glossary/knowledge-engineering](https://www.autoblocks.ai/glossary/knowledge-engineering)  
8. Knowledge Engineering: Benefits and Process \- BotPenguin, accessed July 2, 2025, [https://botpenguin.com/glossary/knowledge-engineering](https://botpenguin.com/glossary/knowledge-engineering)  
9. Symbolic AI: Revolutionizing Rule-Based Systems \- SmythOS, accessed July 2, 2025, [https://smythos.com/developers/agent-development/symbolic-ai-applications/](https://smythos.com/developers/agent-development/symbolic-ai-applications/)  
10. Prompt Engineering and the Effects of Context for LLM | NIST, accessed July 2, 2025, [https://www.nist.gov/video/prompt-engineering-and-effects-context-llm](https://www.nist.gov/video/prompt-engineering-and-effects-context-llm)  
11. Knowledge Engineering in Ai \- Lark, accessed July 2, 2025, [https://www.larksuite.com/en\_us/topics/ai-glossary/knowledge-engineering-in-ai](https://www.larksuite.com/en_us/topics/ai-glossary/knowledge-engineering-in-ai)  
12. Neurosymbolic Reasoning and Personal Knowledge Graphs for Enhancing LLM Capabilities | by Volodymyr Pavlyshyn | Artificial Intelligence in Plain English, accessed July 2, 2025, [https://ai.plainenglish.io/neurosymbolic-reasoning-and-personal-knowledge-graphs-for-enhancing-llm-capabilities-9957cba50533](https://ai.plainenglish.io/neurosymbolic-reasoning-and-personal-knowledge-graphs-for-enhancing-llm-capabilities-9957cba50533)  
13. Knowledge Graphs and Neuro-Symbolic AI \- AllegroGraph, accessed July 2, 2025, [https://allegrograph.com/wp-content/uploads/2024/02/Neuro-Symbolic-AI-AllegroGraph-2-7-24.pdf](https://allegrograph.com/wp-content/uploads/2024/02/Neuro-Symbolic-AI-AllegroGraph-2-7-24.pdf)  
14. 1.1 Some Simple Examples \- Learn Prolog Now\! \- SWI-Prolog, accessed July 2, 2025, [https://lpn.swi-prolog.org/lpnpage.php?pagetype=html\&pageid=lpn-htmlse1](https://lpn.swi-prolog.org/lpnpage.php?pagetype=html&pageid=lpn-htmlse1)  
15. Topic A: Introduction to Prolog, accessed July 2, 2025, [https://cspages.ucalgary.ca/\~bdstephe/449\_F17/Notes/TopicA\_IntroductionToProlog\_4up.pdf](https://cspages.ucalgary.ca/~bdstephe/449_F17/Notes/TopicA_IntroductionToProlog_4up.pdf)  
16. Prolog Rule-Based Expert System Shell \- UNM CS, accessed July 2, 2025, [https://www.cs.unm.edu/\~luger/ai-final/code/PROLOG.exshell.html](https://www.cs.unm.edu/~luger/ai-final/code/PROLOG.exshell.html)  
17. Prolog-MCP Server: Neuro-Symbolic AI for Modern Workflows \- DEV Community, accessed July 2, 2025, [https://dev.to/adamrybinski/prolog-mcp-server-neurosymbolic-ai-for-modern-workflows-3e35](https://dev.to/adamrybinski/prolog-mcp-server-neurosymbolic-ai-for-modern-workflows-3e35)  
18. LMQL is a programming language for LLM interaction. | LMQL, accessed July 2, 2025, [https://lmql.ai/](https://lmql.ai/)  
19. Efficient LLM Querying with LMQL \- Packt, accessed July 2, 2025, [https://www.packtpub.com/en-us/learning/how-to-tutorials/efficient-llm-querying-with-lmql](https://www.packtpub.com/en-us/learning/how-to-tutorials/efficient-llm-querying-with-lmql)  
20. Prompting Is Programming: A Query Language for Large Language Models \- arXiv, accessed July 2, 2025, [https://arxiv.org/pdf/2212.06094](https://arxiv.org/pdf/2212.06094)  
21. Prompting Is Programming: A Query Language for Large Language Models \- arXiv, accessed July 2, 2025, [https://arxiv.org/abs/2212.06094](https://arxiv.org/abs/2212.06094)  
22. Overview | LMQL, accessed July 2, 2025, [https://lmql.ai/docs/language/overview.html](https://lmql.ai/docs/language/overview.html)  
23. An Introduction to LMQL: The Bridge Between SQL and Large Language Models, accessed July 2, 2025, [https://www.datacamp.com/tutorial/introduction-to-lmql](https://www.datacamp.com/tutorial/introduction-to-lmql)  
24. Introduction to Prolog: A Programming Language for AI | Built In, accessed July 2, 2025, [https://builtin.com/software-engineering-perspectives/prolog](https://builtin.com/software-engineering-perspectives/prolog)  
25. Prolog Knowledge Base, accessed July 2, 2025, [https://www.cs.sjsu.edu/\~pearce/modules/lectures/prolog/kbase.htm](https://www.cs.sjsu.edu/~pearce/modules/lectures/prolog/kbase.htm)  
26. Neuro-Symbolic AI Agent Demo (LLM \+ Prolog) : r/AI\_Agents \- Reddit, accessed July 2, 2025, [https://www.reddit.com/r/AI\_Agents/comments/1gav50p/neurosymbolic\_ai\_agent\_demo\_llm\_prolog/](https://www.reddit.com/r/AI_Agents/comments/1gav50p/neurosymbolic_ai_agent_demo_llm_prolog/)  
27. Controlling Large Language Models Through Concept Activation Vectors \- ResearchGate, accessed July 2, 2025, [https://www.researchgate.net/publication/390724457\_Controlling\_Large\_Language\_Models\_Through\_Concept\_Activation\_Vectors](https://www.researchgate.net/publication/390724457_Controlling_Large_Language_Models_Through_Concept_Activation_Vectors)  
28. Mastering Ontology Engineering \- Number Analytics, accessed July 2, 2025, [https://www.numberanalytics.com/blog/mastering-ontology-engineering-intelligent-systems](https://www.numberanalytics.com/blog/mastering-ontology-engineering-intelligent-systems)  
29. Ontology engineering \- Wikipedia, accessed July 2, 2025, [https://en.wikipedia.org/wiki/Ontology\_engineering](https://en.wikipedia.org/wiki/Ontology_engineering)  
30. The Role of Ontology and Information Architecture in AI, accessed July 2, 2025, [https://www.earley.com/insights/role-ontology-and-information-architecture-ai](https://www.earley.com/insights/role-ontology-and-information-architecture-ai)  
31. Ontological Engineering in Artificial Intelligence (AI) \- Applied AI Course, accessed July 2, 2025, [https://www.appliedaicourse.com/blog/ontological-engineering-in-artificial-intelligence/](https://www.appliedaicourse.com/blog/ontological-engineering-in-artificial-intelligence/)  
32. Introduction to Ontologies \- GeeksforGeeks, accessed July 2, 2025, [https://www.geeksforgeeks.org/machine-learning/introduction-to-ontologies/](https://www.geeksforgeeks.org/machine-learning/introduction-to-ontologies/)  
33. eth-sri/lmql: A language for constraint-guided and efficient LLM programming. \- GitHub, accessed July 2, 2025, [https://github.com/eth-sri/lmql](https://github.com/eth-sri/lmql)  
34. Getting Started | LMQL, accessed July 2, 2025, [https://lmql.ai/docs/](https://lmql.ai/docs/)  
35. SWI-Prolog \-- Calling Prolog from Python, accessed July 2, 2025, [https://www.swi-prolog.org/pldoc/man?section=janus-call-prolog](https://www.swi-prolog.org/pldoc/man?section=janus-call-prolog)  
36. Enhancing Neural Network Interpretability Through Deep Prior-Guided Expected Gradients, accessed July 2, 2025, [https://www.mdpi.com/2076-3417/15/13/7090](https://www.mdpi.com/2076-3417/15/13/7090)  
37. It's the Language of AI – So Why Doesn't AI Use Prolog? \- YouTube, accessed July 2, 2025, [https://www.youtube.com/watch?v=4qJVzOl4wWk](https://www.youtube.com/watch?v=4qJVzOl4wWk)