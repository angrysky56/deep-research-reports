

# **A Proposal for the Formalization and Automation of Diagrammatic Reasoning Systems**

## **Part 1: The Cognitive-Computational Chasm: Reframing Diagrammatic Reasoning**

### **1.1 The Unfulfilled Potential of Diagrammatic Reasoning**

The cognitive power of diagrams to represent complex information has been recognized for decades. As Larkin and Simon famously observed, a well-constructed diagram can be "worth ten thousand words." From the intuitive circles of set theory to the intricate string diagrams of quantum mechanics, visual representations serve as powerful tools for comprehension, communication, and proof. Yet, despite their intuitive appeal and widespread use, many Diagrammatic Reasoning Systems (DRSs) exist as informal aids rather than as formal, machine-processable languages. This gap prevents them from being integrated into modern automated reasoning, formal verification, and knowledge representation frameworks, leaving their full potential unrealized.1

This gap is not an inherent feature of diagrams but a historical and philosophical artifact. In the centuries preceding the 20th, non-sentential diagrammatic representations were an acceptable and central means of inference, as exemplified by the diagrams of Euclidean geometry.4 However, the 20th-century development of sentential logic re-defined "formalism" in a way that privileged symbolic, syntactic manipulation. A strict definition of a formal language required that "the correctness or falsity of an expression... can and should be decided without reference to any interpretation of that expression".5 This definition, by its nature, *excluded* visual or diagrammatic reasoning, which is inherently interpretative.5

As a result, diagrams have been largely relegated to the status of "heuristic tools" in exploring a proof, but not as part of the proof itself.4 This report's central thesis is that this gap can be bridged. Recent work, such as Shin's formalization of Venn-Peirce diagrams 4, has provided case studies proving that diagrammatic systems can be as "sound and complete in the same sense as symbolic systems".4 This work is not merely an engineering task but an act of *re-formalization*—a reclamation of diagrams as rigorous mathematical objects, aiming to restore them to the status of formal, machine-processable languages.

### **1.2 The Autoformalization Challenge: A Parallel Problem**

The "gap" in diagrammatic reasoning is a specific, and perhaps more challenging, instance of the general problem of autoformalization in mathematics.1 The field of AI for Mathematics (AI4Math) is actively engaged in bridging the gap between informal mathematical proofs (typically in natural language) and machine-verifiable formats.7 The primary challenge in this domain is "semantic alignment"—ensuring that the formalized statement mechanically captures the precise meaning of the informal, natural-language assertion.1

This challenge is magnified for diagrammatic reasoning. While textual autoformalization must parse a one-dimensional string of text, diagrammatic autoformalization must contend with a two-dimensional (or higher) visual representation. This introduces a profound ambiguity between the *concrete representation* (the specific drawing, layout, and topology) and the *abstract syntax* (the underlying logical statement).8 The same abstract diagrammatic statement can have myriad concrete visual representations, making the algorithmic interpretation of diagrams a non-trivial issue that any robust automation framework must solve.8

Current AI and Automated Theorem Proving (ATP) landscapes are acutely aware of this "accessibility gap" between human-generated proofs and formal systems.3 This research program addresses this well-known problem from a novel, under-explored vector: the formalization of visual reasoning rather than textual reasoning.

### **1.3 The Categorical Thesis**

The central thesis of this research is that this gap can be bridged by developing a unified, formal framework for DRSs that leverages the structural and compositional language of category theory.10 By treating diagrams not as mere illustrations but as rigorous mathematical objects, we can build a foundation for automated inference that is both sound and computationally tractable.

The success of the ZX-calculus serves as the prime existence proof for this thesis. The ZX-calculus is a rich, intuitive, and powerful diagrammatic language for quantum mechanics that is *formally defined* as a dagger compact category.12 This categorical foundation provides the language with a rigorous, sound, and complete set of rewrite rules, enabling complex quantum computations to be performed and verified entirely graphically.14

This project has three primary goals, modeled on this success:

1. **Formalize:** We will formalize the abstract syntax and semantics of key historical and contemporary DRSs, including Euler diagrams and Conceptual Graphs, within a unified categorical framework.  
2. **Develop:** We will develop sound and complete diagrammatic calculi for these systems, formalizing visual inference steps as provable rewriting rules.  
3. **Implement:** We will implement these formalisms as automated proof tactics, creating practical tools for "diagram chasing" and solving decision problems within interactive theorem provers.

To fully appreciate the necessity of this work, it is essential to first understand the historical evolution and current fragmentation of these powerful systems. Examining their development reveals both their immense expressive power and the recurring, unsolved challenge of rigorous formalization that this proposal aims to finally address.

## **Part 2: An Analytical History and Survey of Diagrammatic Systems**

An analysis of the historical trajectory of Diagrammatic Reasoning Systems reveals a clear pattern: from their origins as simple set-theoretic visualizations to their application in highly complex domains like quantum mechanics and software engineering, DRSs have consistently demonstrated profound expressive power. However, this same history also highlights a recurring challenge—the difficulty of establishing rigorous, generalizable formal foundations that support automated inference. Understanding this evolution is crucial for contextualizing the current fragmented landscape and articulating the need for a unified framework.

### **2.1 Foundational Diagrammatic Logics: A Trajectory of Syntactical-ization**

The earliest formalisms for diagrammatic reasoning emerged from the need to visualize logical and set-theoretic relationships. This history demonstrates a "progressive syntactical-ization of visual space," evolving from pure analogical topology to a formal visual language.

#### **2.1.1 Euler Diagrams**

Euler diagrams use closed curves to represent sets and their relationships.16 An Euler diagram depicts *only* the existing relationships between sets; for instance, two non-overlapping circles for disjoint sets or one circle contained within another for a subset relationship.

* **Cognitive Value:** This system's strength is its intuitive, purely topological nature. It maps directly to human cognitive preferences. Empirical studies on syllogistic reasoning have shown that a group using Euler diagrams performed significantly better than groups using Venn diagrams or purely linguistic (sentential) methods.18  
* **Limitations:** This cognitive simplicity comes at the cost of expressive power. Euler diagrams have no native mechanism for representing partial knowledge (e.g., "We do not know if A and B intersect"). Furthermore, they lack the ability to assert *existence*—a diagram of a circle 'A' does not formally assert that the set A is non-empty.4

#### **2.1.2 Venn and Venn-Peirce Diagrams**

Venn diagrams were developed to address the "partial knowledge" limitation of Euler diagrams. In contrast to Euler diagrams, Venn diagrams show *all possible* combinations of set intersections, using shading to indicate that a specific region (a set combination) must be empty.6 This standardized the topology but still failed to solve the problem of existential assertion.4

The "Peircean Leap" was the crucial evolutionary step. Charles Peirce extended Venn's system to overcome its expressive limitations by adding *explicit syntactic notation* to the visual topology.4

1. **Existence/Emptiness:** Peirce introduced explicit symbols: '⊗' or 'x' to assert the non-emptiness (existence) of a region, and 'o' to assert its emptiness (replacing Venn's shading).4  
2. **Disjunction:** Most powerfully, Peirce introduced a line or "chain" that could connect these symbols. This chain is read *disjunctively*.4 A single Venn-Peirce diagram can thus represent complex disjunctive statements, such as 'All A are B *or* some A is B', which is impossible in a standard Euler or Venn diagram.4  
3. **Inference:** Peirce also provided "diagram-to-diagram rules of transformation" 19, a direct precursor to the formal rewriting systems proposed in this research.

#### **2.1.3 Peirce's Existential Graphs (EGs)**

Peirce's Existential Graphs (EGs) represent the completion of this formalization, creating a fully-fledged, sound, and complete diagrammatic logic.20 EGs demonstrate how topology itself can *become* the syntax.

* **Syntax:** The system is defined by a few simple, powerful rules 22:  
  * **Sheet of Assertion (SA):** The canvas, or "Sheet of Assertion," asserts the truth of any graph written on it.22  
  * **Juxtaposition (Conjunction):** Placing two graphs side-by-side on the SA asserts their logical conjunction (AND).22  
  * **Ovals (Negation):** An oval, or "cut," drawn around a graph asserts its logical negation (NOT). This is a purely topological operator: containment *is* negation.23  
  * **Lines of Identity (Quantification):** A "line of identity" represents existential quantification and links predicates to show shared identity.23  
* **Fragments:** Peirce defined three systems with this syntax: **Alpha** (isomorphic to propositional logic), **Beta** (isomorphic to first-order logic), and **Gamma** (isomorphic to modal logic).20

This evolution—from Euler's pure topology to Peirce's syntactic overlays and finally to Existential Graphs' "topological syntax"—is the exact process this proposal seeks to generalize, formalize, and automate.

### **2.2 Comparative Analysis of Contemporary Systems: The Fragmented Landscape**

The foundational ideas of Euler, Venn, and Peirce have evolved into more expressive and specialized systems. However, this evolution has not been unified. The current landscape is fragmented, with different domains adopting *ad hoc* or "bespoke" formalisms, creating a significant barrier to generalized automated reasoning. The contrast between the Unified Modeling Language (UML) and the Resource Description Framework (RDF) provides a clear case study of this divergence.

#### **2.2.1 The Case of UML (Unified Modeling Language)**

UML is a general-purpose, visual modeling language standardized by the Object Management Group (OMG).24 It is not a single language but a *suite* of diagrammatic notations (e.g., class diagrams, state charts, package diagrams) used to describe complex software systems.24

The core problem with UML is that its formal-specification-language roots are undermined by an *informal* design. The semantics of UML are largely defined in natural language (English) and the Object Constraint Language (OCL).26 This makes the standard "difficult to formally analyzed and error-prone".26

This lack of a rigorous, unified formal core has led to a *fragmentation* of *post-hoc* formalization attempts. Researchers, seeking to use UML for verification, have been forced to create their own formal semantics, resulting in a multitude of competing, non-interoperable formalisms, including:

* Translations to Description Logics (DLs) 26  
* Formalization using Z notation 28  
* Bespoke definitions using basic mathematical notation 29

This formal "messiness" has led to a practical reality where UML is often used as "UML-lite"—a "laxed" and informal visual aid for human-to-human communication, completely divorced from its potential for automated analysis.32

#### **2.2.2 The Case of RDF (Resource Description Framework)**

In stark contrast, the Semantic Web's RDF was *designed* from the ground up as a formal, "graph-based diagrammatic logic".33

* **Formalism:** RDF has a simple, primary abstract syntax: all information is represented as a set of (subject, predicate, object) triples.35  
* **Visualization:** The "diagram" (a node-and-arc graph) is a direct, 1-to-1 visualization of this abstract formal structure.35  
* **Inference:** Reasoning over RDF graphs is rigorously defined via formal entailment regimes.35 This inference is sound, complete, and machine-processable, often implemented using Datalog-style rules or other rule languages.37

The "formal-first" design of RDF *enabled* a unified and robust reasoning framework by default. The "informal-first" design of UML *caused* its error-prone nature and *forced* a fragmented, post-hoc scramble for formal guarantees. This project aims to provide a meta-framework (category theory) that can give visually rich, UML-like systems the formal, RDF-like guarantees they currently lack.

This fragmentation is summarized in the table below, which highlights the bespoke nature of the formalisms and inference methods used by various DRSs. This "Tower of Babel" of formalisms is the central problem this report's unified categorical framework seeks to solve.

**Table 1: Comparative Analysis of Diagrammatic Reasoning Systems (DRSs)**

| DRS | Primary Domain | Core Formalism | Inference Method | Key Expressive Limitation |
| :---- | :---- | :---- | :---- | :---- |
| **Euler Diagrams** | Set Theory, Logic | Set-Theoretic / Topological 16 | Visual / Topological Inference 18 | Cannot represent partial knowledge or existential statements.4 |
| **Venn-Peirce** | Logic | Monadic Predicate Logic 4 | Diagrammatic Rewriting Rules 19 | Becomes visually clunky and complex with many sets; limited to monadic FOL. |
| **Conceptual Graphs** | Knowledge Rep. | First-Order Logic (FOL) Translation 42 | Projection (Graph Homomorphism), Graph Rules 43 | Fragmented (simple, contexts, cuts); semantics are often "unnatural" (FOL translation). |
| **UML Class Diagrams** | Software Eng. | Informal (Natural Language, OCL).26 *Ad hoc* (DLs, Z) 27 | Bespoke / Verification-centric 28 | "Error-prone" 26; lacks a single, rigorous, universally accepted formal semantics. |
| **RDF** | Semantic Web | Graph Logic (Triples) 35 | Rule-based (Datalog, RIF) 37 | Limited to (subject, predicate, object) triples; higher-order statements are complex. |
| **ZX-Calculus** | Quantum Mechanics | Dagger Compact Category 12 | Graphical Rewriting Rules 12 | Domain-specific to linear maps (quantum computing); not a general-purpose logic. |

### **2.3 Case Study: Conceptual Graphs (CGs) in Knowledge Representation**

Conceptual Graphs (CGs) are a prominent modern DRS used for knowledge representation.46 They represent a perfect microcosm of the problem this proposal addresses: they are more formal than UML but lack the unified, native formalism of the ZX-calculus.

#### **2.3.1 Formal Semantics: The First-Order Logic Translation**

CGs were proposed as a more intuitive, graph-based *alternative* to First-Order Predicate Logic (FOPL).42 The "core" or "simple" CG fragment (which lacks negation) is given a formal semantics via a "flattening" translation into FOPL.42 This allows a standard FOL theorem prover to be used as a reasoning engine for the graphs.43

#### **2.3.2 Natively-Graph-Based Reasoning**

Despite the existence of this FOL translation, most research on CG reasoning has focused on *natively graph-based* operations, which are seen as more true to the spirit of the formalism.43 The most important of these operations is **projection**, a meaning-preserving graph homomorphism that allows one graph to be found as a "specialization" of another.43 Other reasoning facilities are based on graph transformation rules.44

This creates a fundamental *disconnect* between the "official" semantics (translation to *sentential* logic) and the "native" inference (graph-based manipulation). The FOL translation is "unnatural"; it destroys the diagrammatic structure it purports to define.

#### **2.3.3 Expressive Fragments and Competing Implementations**

The CG formalism is highly fragmented, with different extensions created to handle different logical concepts:

* **Simple CGs:** No negation or contexts; translatable to a specific fragment of FOL.47  
* **CGs with Negation:** To handle negation, CGs adopt Peirce's "cut" notation.47  
* **CGs with Contexts:** To handle higher-order statements (propositions about propositions), CGs introduce "contexts," which adds "enormous... expressive power" but further complicates the logic.48

This fragmentation of the *formalism* is mirrored by a fragmentation of *implementations*. The two most prominent, **Amine** and **Cogitant**, are bespoke and incompatible.

* **Amine:** A Java-based, "multi-layer platform".49 For implementation reasons, "Amine CG" is a *dialect* of the standard, simplifying all relations to be dyadic.51 It uses a multi-paradigm language called Synergy.52  
* **Cogitant:** A C++ class library 53 that implements a different model (GBKR). It provides its own "reasoning mechanisms" 53 based on graph rules.44

The CG ecosystem—with its fragmented formalisms, competing implementations, and disconnect between semantics and inference—is a perfect illustration of the "fragmented landscape" this proposal seeks to unify. A categorical formalization of CGs, as recently proposed 55, would define a "category of conceptual graphs" where *objects* are CGs and *morphisms* are projections. This would *natively* unify the syntax, semantics, and inference mechanism within a single, *graphical* mathematical framework, eliminating the unnatural "detour" through FOL.

### **2.4 Case Study: The ZX-Calculus (The Model of Success)**

The ZX-calculus, a diagrammatic language for quantum mechanics, will serve as the guiding inspiration and "model of success" for this research program. It is the premier *existence proof* that a rich, intuitive, visual language can be grounded in a rigorous, complete, and computationally tractable formalization.

#### **2.4.1 Formal Definition**

The ZX-calculus is an "intuitive graphical language" 56 for reasoning about linear maps between qubits.12 Crucially, it is *not* given a post-hoc formalization. Its *formal definition* *is* categorical. The ZX-calculus is formally defined as a **dagger compact category** 12, which is a specific type of **symmetric monoidal category**.58 In this category, the objects are natural numbers (representing the number of qubits), and the morphisms *are* the diagrams themselves.13

#### **2.4.2 Universality and Expressive Power**

The ZX-calculus is *universal* for linear maps between qubits.12 This means *any* quantum circuit or linear map, no matter how complex, can be represented as a ZX-diagram. It is a powerful *generalization* of the quantum circuit model, which is more topologically rigid.12

#### **2.4.3 Inference as Rewriting**

Inference in the ZX-calculus is performed *directly* on the diagrams via a set of graphical *rewrite rules*.12 These rules allow for the simplification and analysis of quantum processes in a purely visual manner. Key rules include:

* "Adjacent spiders of the same color merge" (the **fuse** rule).12  
* "Hadamard changes the color of spiders" (the **color change** rule).12  
* The **copy** rule, which describes how spiders of different colors interact.45

A well-known example is the graphical reduction of the quantum teleportation circuit to a simple wire 45, or the reduction of a simple circuit to a GHZ state, which can be achieved in a few visual steps.61

#### **2.4.4 Soundness and Completeness**

This is the critical achievement of the ZX-calculus. The set of graphical rewrite rules is not just a collection of heuristics; it is a formal calculus that has been *proven* to be:

* **Sound:** Any rewrite transformation applied to a diagram results in a new diagram that represents the *exact same* linear map.12  
* **Complete:** Any two diagrams that represent the same linear map can be transformed into one another using *only* the rules of the calculus.12

The ZX-calculus *is* the thesis of this proposal, realized in a specific domain. It succeeded precisely because it used a natively graphical, compositional logic (category theory) as its foundation, rather than a translation to a sentential logic. This research program aims to *generalize* the *methodology* of the ZX-calculus to other DRSs and *implement* these principles as a generic, automated tool.

## **Part 3: The Central Challenge: Formalizing and Automating Visual Inference**

To elevate Diagrammatic Reasoning Systems from intuitive aids to core components of automated systems, we must solve fundamental problems in computational logic. The central challenge lies in translating the process of visual inference—often called "diagram chasing"—into verifiable and efficient algorithmic procedures. This task requires moving beyond specific, hand-crafted solutions to a general, formal understanding of what it means to compute with diagrams.

### **3.1 The Computational Complexity of Modern Diagrammatic Proofs**

#### **3.1.1 The "Diagram Chasing" Bottleneck**

"Diagram chasing" is a common proof method, particularly in homological algebra and category theory.64 It is an element-theoretic approach used to prove properties of commutative diagrams 65, such as in the classic proofs of the Five Lemma and the Snake Lemma.66 While effective for small, textbook examples, this manual, element-by-element process quickly becomes a cognitive and computational bottleneck.

#### **3.1.2 The Combinatorial Explosion**

The true scale of this challenge is illustrated by modern research programs in mathematics that rely heavily on diagrammatic proofs. For example, the Johnson–Gurski–Osorno program aims to find categorical models for the sphere spectrum, operating in complex settings like symmetric monoidal bicategories.71 The diagrams generated in this work are of such complexity that "managing them without computer assistance may be infeasible".76

Conceptually, the problem can be reduced to a form of string rewriting, where diagrammatic manipulations correspond to specific rewrite rules.76 However, this reduction reveals the true practical difficulty. A proof is a *sequence* of rewrite steps. As the diagrams and the number of applicable rules grow, the *search space* for a valid proof sequence is subject to a "combinatorial explosion".7878 notes that the "huge number of relations" makes a naive search for a proof computationally intractable, as termination and confluence are not guaranteed.

The challenge, therefore, is not just to *verify* a single proof step, but to *find* the correct sequence of steps. This reframes the automation task from simple verification to a complex *proof search* problem, which demands a formal "theory of string diagram rewriting" 79 to manage the complexity.

### **3.2 The "Commerge Problem" and Formal Verification**

#### **3.2.1 Formal Definition**

A recurring task for anyone reading a diagrammatic proof in fields like homological algebra is to solve what can be termed the **commerge problem**: **"Given a collection of sub-diagrams of a larger diagram which commute, must the entire diagram commute?"**.81

#### **3.2.2 Centrality to Verification**

This decision problem is central to verifying proofs of classic results. Complex diagram chases only remain readable because such "non-trivial technical arguments" are hidden.81 For example, the proof of the Five Lemma requires a large commutative diagram.81 Verifying the commutativity of this entire diagram by hand, checking every possible path, would be "excessively tedious".81

Instead, the human reader applies a powerful heuristic: one checks that the "minimal cells" of the diagram (e.g., the four constituent squares in the Five Lemma diagram) commute, and from this, *infers* the commutativity of the whole.81 The commerge problem is the task of *formally proving* that this human heuristic is valid for a given diagram.

#### **3.2.3 Decidability and Automation**

This problem is not just a heuristic; it is a formally-defined and \-studied decision problem. Crucially, research has established:

1. **Decidability:** The commerge problem is **decidable** for diagrams with **acyclic** underlying quivers (directed graphs).81  
2. **Undecidability:** The problem becomes **undecidable** for the general case of *cyclic* quivers.81  
3. **Implementation:** A decision procedure (algorithm) for the acyclic case has been developed and implemented as a tactic called Comauto in the Coq proof assistant.81

This is a critical finding. A core part of the proposed research—developing an algorithm for the commerge problem—is not an open research question (for the common acyclic case) but rather an engineering and integration task. This significantly de-risks the implementation objective and allows the research to focus on the more complex, heuristic-based automation of diagram *chasing* (proof search) and the open problem of *heuristics* for the undecidable cyclic case.81

### **3.3 The Abstract Syntax versus Concrete Representation Dilemma**

These computational challenges are compounded by a core research challenge in the application of DRSs: the distinction between abstract syntax and concrete representation.8

In symbolic logics, the correspondence between the abstract form (the logic) and the concrete notation (the text) is straightforward. A text string is parsed into an Abstract Syntax Tree (AST) in a predictable, solved process.9

For DRSs, this is not the case. The "concrete syntax" is the two-dimensional drawing, while the "abstract syntax" is the underlying logical graph or quiver.8 The mapping between them is "non-trivial".8 The same abstract diagrammatic statement (e.g., a commutative square) can have infinitely many concrete visual representations with different layouts, relative positions, or topological distortions.88

This makes tasks like automatic diagram drawing and, more importantly, the *algorithmic interpretation* (or "parsing") of an informally drawn diagram, a non-trivial issue. Any robust automation framework must solve this. However, a practical solution exists, not by solving the "parsing" problem, but by inverting it. As will be detailed in Part 4, modern tools for diagrammatic proof do not *read* informal diagrams. Instead, the user constructs the *abstract syntax* (the formal proof) in a proof assistant, and the tool *generates* a *concrete representation* (the diagram) as a visualization of the formal proof state.89 This bypasses the ambiguous parsing problem entirely.

## **Part 4: A Unified Framework for Formal Diagrammatic Reasoning**

This research program is designed as a direct response to the challenges of formalization and automation outlined above. It is structured around three interconnected objectives that build upon one another to create a comprehensive, formal, and ultimately automatable theory of diagrammatic reasoning.

### **4.1 Objective 1: A Unified Categorical Framework for DRSs**

#### **4.1.1 Why Category Theory?**

We will use category theory as the unifying formal language for defining Diagrammatic Reasoning Systems. Category theory (CT) is the *lingua franca* for "compositional systems" 11 and a "general mathematical theory of structures".10 It is natively graph-based and provides a precise language for diagrammatic reasoning. Frameworks such as "Categorica" demonstrate a blueprint for this approach, providing algorithms to convert between "algebraic representations" (the logic) and "graph-theoretic... representations" (the diagram).90

#### **4.1.2 The Core Structure: Monoidal Categories**

The *specific* categorical structure best suited for formalizing most DRSs (especially those based on string diagrams) is the **monoidal category**.91 Monoidal categories provide the "algebra of string diagrams".79 The axioms of a monoidal category, such as the *pentagon law* and *triangle law* 95, are *precisely* the fundamental rewrite rules governing the topological manipulation of diagrams. This structure provides a direct, formal correspondence between the *syntax* (the diagrams) and the *semantics* (the morphisms in the category).96

#### **4.1.3 Applying the Framework: A Metatheoretical Unification**

The primary goal of this objective is to rigorously define the syntax and semantics of historical and contemporary DRSs within established categorical structures. This "Unified Framework" is a *metatheoretical* one—a "dictionary" that translates different DRSs into a common mathematical language, rather than a single object that contains all of them.

* **For the ZX-Calculus:** This work is complete and serves as our guide. The system is formally defined as a **Dagger Compact Category**.12  
* **For Conceptual Graphs:** This is a primary research task. We will formalize the **"category of conceptual graphs"** as described in recent research.55 In this category, the *objects* are Conceptual Graphs, and the *morphisms* are subsumption homomorphisms (projections).55 This approach is superior to the traditional FOL-translation 42 because it *natively* formalizes the graph-based inference (projection) that is central to CG reasoning.43  
* **For Euler Diagrams:** This is also a novel research task. We will formalize the "set-theoretical semantics" 18 of Euler diagrams by modeling them as diagrams in the category **Set** 97, or a related topos, where curves correspond to objects (sets) and their topological relations (containment, intersection) correspond to morphisms.

This metatheoretical unification is what enables the development of a *general* tool (Objective 3\) that can operate on the shared categorical principles underlying all these different systems.

### **4.2 Objective 2: Formalizing Diagrammatic Inference as Rewriting Systems**

#### **4.2.1 The Semantic-to-Syntactic Link**

Building on the formal semantic framework from Objective 1, we will treat diagrammatic inference as a computational process. This objective connects the semantics of Objective 1 to the implementation of Objective 3\. The *axioms* of the categorical structure (e.g., the pentagon law for a monoidal category 95) *become* the *rewrite rules* for the automated tactic. "Diagram chasing" 64 is thus formalized as the process of applying these rewrite rules to a diagrammatic expression.76

#### **4.2.2 A Theory of String Diagram Rewriting**

We propose to formalize the inference steps of each DRS as a sound and complete set of rewriting rules, akin to graph transformation rules. This will build on existing formal work on "string diagram rewriting" 79, which provides the mathematical foundation for these 2D transformations. The objective is to develop fully-fledged "diagrammatic logics" where visual manipulations correspond to provably correct logical deductions, just as has been done for the ZX-calculus.12

#### **4.2.3 The Goal: Proof by Reflection**

This formalization transforms diagram chasing from an intuitive art into a verifiable science. A key technical goal is to design these rewriting systems to be **confluent**.77 A confluent system (where the order of rule application does not change the final result) is critical for taming the "combinatorial explosion" 78 inherent in proof search.

This approach aligns with the "proof by reflection" strategy, which is "amongst the fastest/most scalable proof techniques" available in ATPs.77 Instead of an "AI" that *searches* for a proof in an exponential space 99, we create a *rewriting system* that *computes* the proof by normalization. Proof verification becomes a mechanical, and therefore fast and reliable, computation.

### **4.3 Objective 3: Implementation of Automated Solvers and Proof Tactics**

The final objective is to translate our theoretical framework into practical, computer-aided tools. This implementation will not start from scratch but will be a *synthesis* of several active, cutting-edge research projects in the formal methods community.

#### **4.3.1 Core Data Structure: Deep-Embedding**

The implementation will use a **deep-embedding** technique, as specified in the proposal. This is confirmed by related research as the correct approach. For example, the coq-diagram-chasing library (discussed below) is explicitly a "deep-embedded, domain-specific formal language".82

In a deep embedding, the *syntax* of our diagrammatic logic (the quivers, morphisms, and composition rules) is defined as an explicit data type *within* the proof assistant (e.g., Coq).82 This allows us to reason *about* our diagrammatic logic at the metalevel (e.g., proving our rewrite rules are sound).102 This technique directly achieves the proposal's goal of creating a tool that is "independent of any specific library of formalized category theory."

#### **4.3.2 The Implemented Tactics**

We will develop and implement algorithms to automate key diagrammatic reasoning tasks, delivered as two primary tactics:

1. **Tactic 1: The Comauto Solver (Verification):** As established in 3.2.3, the commerge problem is *decidable* for acyclic quivers.81 This tactic will implement this known decision procedure.81 It will serve as a verification "workhorse," automatically solving the "tedious" 81 proof goals related to diagram commutativity, freeing the human user to focus on the proof's creative steps.  
2. **Tactic 2: The DiagramChase Tactic (Proof Search):** This tactic addresses the harder "diagram chasing" (proof search) problem.67 This will be a *semi-automatic*, heuristic-based tactic 83 that applies the rewrite rules (from Objective 2\) to synthesize proofs of properties, such as proving a map is an isomorphism. Its implementation will be guided by existing formalizations of diagram chasing, such as the "pseudoelement" approach 103 and other proposed algorithms.104

#### **4.3.3 Synthesizing the Current Research Landscape**

Our implementation will unify the components of several parallel research efforts:

* **The Engine:** The coq-diagram-chasing library, developed by Guillemet, Mahboubi, and Piquerez 85, provides the foundational deep-embedded language 82 that will serve as our project's "engine."  
* **The UI (Solving Abstract/Concrete Syntax):** The work of the CoREACT project 77, particularly the graphical editors developed by Lafont 81 and Chabassier 81, provides the solution to the abstract vs. concrete syntax problem (3.3). These tools link a *visual diagram editor* to the *formal Coq proof state*. The user manipulates the *visual* diagram, and the editor translates these actions into *formal* proof commands.89 Our tactics will be designed to be driven by such a graphical front-end, perfectly bridging the human-intuitive and machine-formal worlds.

This implementation synthesizes these components—a formal engine 82, a verification tactic 81, a search tactic 103, and a visual front-end 89—into a single, cohesive system. The novel contribution will be to *generalize* this system, using the categorical framework from Objective 1, to support not just pure category theory but also other DRSs like Conceptual Graphs and Euler Diagrams.

## **Part 5: Significance and Broader Impacts**

The impact of this project extends far beyond a niche academic problem in computational logic. By building a formal, automatable foundation for diagrammatic reasoning, this work has the potential to significantly advance the fields of automated reasoning and knowledge representation, with further impacts on mathematical education and practice.

### **5.1 Advancements in Automated Theorem Proving (ATP)**

This research will contribute to a new generation of proof assistants that can natively leverage the power of human intuition about spatial and diagrammatic reasoning.

* **A New Mode of Reasoning:** This work will "break new ground" 109 by allowing diagrammatic proofs to *be* the formal proof, rather than an informal aid.109 It moves beyond systems that use diagrams merely to "prune the search" for an essentially symbolic proof.109  
* **Taming the Search Space:** The primary limitation of modern ATPs is the "large search space" of possible proofs.3 While machine learning offers a statistical approach to "guide" this search 99, our approach is computational and deterministic. By formalizing diagrammatic inference as a *confluent rewriting system* 77, we aim to replace exponential *search* with "proofs by reflection," 77 which are "amongst the fastest/most scalable proof techniques out there".77 We will be *computing* a proof by normalization, not *searching* for one. This will empower mathematicians and computer scientists to automatically verify or even synthesize proofs in fields like homological algebra 103 that are "challenging to rigorously verify by hand" 81, increasing the reliability of mathematical research.

### **5.2 Innovations in Knowledge Representation (KR)**

Diagrams have long been recognized as a particularly useful modality for knowledge representation systems.114 This project directly addresses a central, unsolved problem in the field. As one study notes, the current problem is that "existing ontology visualization tools do not support diagrammatic reasoning, while existing diagrammatic reasoning systems utilize suboptimal visual languages".116

This project *solves* this disconnect.

1. The **unified categorical framework** (Objective 1\) provides the rigorous, logic-based semantics that KR systems need.117  
2. The **automated rewrite tactics** (Objective 3\) provide the *reasoning engine* that visualization tools lack.

This will enable more powerful, expressive, and reliable reasoning over knowledge bases that use graphical notations. This has direct applications to systems built on the Semantic Web, where knowledge is encoded in RDF graphs 35, as well as to the development of ontologies based on UML notations. By providing a sound logical calculus for these diagrams, our work will enhance the trustworthiness and inferential capability of a wide range of AI and KR systems.

### **5.3 Pedagogical Impacts: Fulfilling the Vision of Wille and Peirce**

More broadly, this research aligns with the human-centric goals of formal logic, as articulated by thinkers like Charles Peirce and Rudolf Wille. Wille's Formal Concept Analysis (FCA) 118 was explicitly motivated by a philosophical, pedagogical goal: "to support the rational communication of humans" 118 by making formal structures "understandable, learnable, available and criticizable".121

This project shares that DNA. It aims to make abstract mathematics more "visual and interactive".121 The tools developed, such as the graphical proof editors 89, are not just for experts. As 89 notes, a web-based version is envisioned specifically "to teach category theory."

By creating a system that is simultaneously *rigorous*, *sound*, and *complete* 14 on a machine level, yet *visual*, *intuitive*, and *interactive* 89 on a human level, this research re-unites the cognitive power of diagrams with the verifiable power of computational logic.

## **Part 6: Conclusion**

The historical divide between intuitive, diagrammatic reasoning and rigorous, symbolic formalism has left the "ten thousand words" of a diagram locked in an informal, un-computable state. This report has detailed a research program to bridge this chasm.

By analyzing the fragmented history of Diagrammatic Reasoning Systems—from the purely topological Euler diagrams 16 to the informally-defined UML 26 and the bespoke formalisms of Conceptual Graphs 42—we have identified a clear and recurring problem: the lack of a common, rigorous, and *natively graphical* formal foundation.

The success of the ZX-calculus 12, which is built from the ground up on the *natively graphical* language of category theory 13, provides the model. This report's proposed solution is to *generalize* this methodology:

1. By using **category theory** as a unified meta-framework to define diverse DRSs.10  
2. By formalizing their inference as **confluent rewriting systems**, transforming proof search into a scalable computation.77  
3. By implementing these principles as **automated proof tactics** that synthesize active, cutting-edge research in deep embedding 82, decidable sub-problems (the commerge problem) 81, and interactive visual interfaces.89

This research will deliver tangible advancements in automated theorem proving, providing new tools for verifying proofs of "infeasible" complexity.76 It will innovate in knowledge representation, *finally* connecting visualization tools with reasoning engines.116 And it will have profound pedagogical impacts, fulfilling Wille's vision of a formal mathematics that supports "rational communication".118

This work will elevate diagrammatic notations from informal aids to a rigorous, verifiable, and foundational component of 21st-century computational logic.

#### **Works cited**

1. FormalAlign: Automated Alignment Evaluation for Autoformalization \- OpenReview, accessed November 15, 2025, [https://openreview.net/forum?id=B5RrIFMqbe](https://openreview.net/forum?id=B5RrIFMqbe)  
2. Mathematical Reasoning with Diagrams \- Stanford University, accessed November 15, 2025, [https://web.stanford.edu/group/cslipublications/cslipublications/pdf/1575863243.pdf](https://web.stanford.edu/group/cslipublications/cslipublications/pdf/1575863243.pdf)  
3. Bridging Informal and Formal Mathematical Reasoning with AI \- Sean Welleck, accessed November 15, 2025, [https://wellecks.com/data/welleck2025\_berkeley\_bridging.pdf](https://wellecks.com/data/welleck2025_berkeley_bridging.pdf)  
4. Diagrams and Diagrammatical Reasoning \- Stanford Encyclopedia of Philosophy, accessed November 15, 2025, [https://plato.stanford.edu/entries/diagrams/](https://plato.stanford.edu/entries/diagrams/)  
5. Full article: Mathematical formalization and diagrammatic reasoning: the case study of the braid group between 1925 and 1950 \- Taylor & Francis Online, accessed November 15, 2025, [https://www.tandfonline.com/doi/full/10.1080/17498430.2018.1533298](https://www.tandfonline.com/doi/full/10.1080/17498430.2018.1533298)  
6. Diagrams (Stanford Encyclopedia of Philosophy/Fall 2002 Edition), accessed November 15, 2025, [https://plato.stanford.edu/archives/fall2002/entries/diagrams/](https://plato.stanford.edu/archives/fall2002/entries/diagrams/)  
7. Formal Mathematical Reasoning: A New Frontier in AI \- arXiv, accessed November 15, 2025, [https://arxiv.org/html/2412.16075v1](https://arxiv.org/html/2412.16075v1)  
8. Concrete and abstract syntax and the transformation between them. | Download Scientific Diagram \- ResearchGate, accessed November 15, 2025, [https://www.researchgate.net/figure/Concrete-and-abstract-syntax-and-the-transformation-between-them\_fig6\_220728574](https://www.researchgate.net/figure/Concrete-and-abstract-syntax-and-the-transformation-between-them_fig6_220728574)  
9. Abstract vs. Concrete Syntax Trees \- Eli Bendersky's website, accessed November 15, 2025, [https://eli.thegreenplace.net/2009/02/16/abstract-vs-concrete-syntax-trees](https://eli.thegreenplace.net/2009/02/16/abstract-vs-concrete-syntax-trees)  
10. Category Theory \- Stanford Encyclopedia of Philosophy, accessed November 15, 2025, [https://plato.stanford.edu/entries/category-theory/](https://plato.stanford.edu/entries/category-theory/)  
11. Category Theory \- National Institute of Standards and Technology, accessed November 15, 2025, [https://tsapps.nist.gov/publication/get\_pdf.cfm?pub\_id=935087](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=935087)  
12. ZX-calculus \- Wikipedia, accessed November 15, 2025, [https://en.wikipedia.org/wiki/ZX-calculus](https://en.wikipedia.org/wiki/ZX-calculus)  
13. Towards Minimality of Clifford+T ZX-Calculus \- University of Oxford ..., accessed November 15, 2025, [https://www.cs.ox.ac.uk/people/bob.coecke/Borun](https://www.cs.ox.ac.uk/people/bob.coecke/Borun)  
14. What is a rule? \- The ZX-calculus, accessed November 15, 2025, [https://zxcalculus.com/intro.html](https://zxcalculus.com/intro.html)  
15. \[2209.14894\] Completeness of the ZX-calculus \- arXiv, accessed November 15, 2025, [https://arxiv.org/abs/2209.14894](https://arxiv.org/abs/2209.14894)  
16. (PDF) Properties of Euler Diagrams \- ResearchGate, accessed November 15, 2025, [https://www.researchgate.net/publication/220053976\_Properties\_of\_Euler\_Diagrams](https://www.researchgate.net/publication/220053976_Properties_of_Euler_Diagrams)  
17. A Survey of Euler Diagrams \- University of Kent, accessed November 15, 2025, [https://kar.kent.ac.uk/35163/1/JVLC\_Euler\_Survey.pdf](https://kar.kent.ac.uk/35163/1/JVLC_Euler_Survey.pdf)  
18. On the Cognitive Efficacy of Euler Diagrams in Syllogistic Reasoning: A Relational Perspective, accessed November 15, 2025, [https://ceur-ws.org/Vol-854/paper2.pdf](https://ceur-ws.org/Vol-854/paper2.pdf)  
19. Peirce on Logical Diagrams \- ProQuest, accessed November 15, 2025, [https://search.proquest.com/openview/e7f89d9293f6d8031ea6bf4cf50aea83/1?pq-origsite=gscholar\&cbl=1817793](https://search.proquest.com/openview/e7f89d9293f6d8031ea6bf4cf50aea83/1?pq-origsite=gscholar&cbl=1817793)  
20. Existential graph \- Wikipedia, accessed November 15, 2025, [https://en.wikipedia.org/wiki/Existential\_graph](https://en.wikipedia.org/wiki/Existential_graph)  
21. Peirce's Deductive Logic \- Stanford Encyclopedia of Philosophy, accessed November 15, 2025, [https://plato.stanford.edu/entries/peirce-logic/](https://plato.stanford.edu/entries/peirce-logic/)  
22. Peirce's Existential Graphs, accessed November 15, 2025, [https://homepages.hass.rpi.edu/heuveb/Teaching/Logic/CompLogic/Web/Presentations/EG.pdf](https://homepages.hass.rpi.edu/heuveb/Teaching/Logic/CompLogic/Web/Presentations/EG.pdf)  
23. Peirce's Tutorial on Existential Graphs \- John Sowa, accessed November 15, 2025, [https://www.jfsowa.com/pubs/egtut.pdf](https://www.jfsowa.com/pubs/egtut.pdf)  
24. Unified Modeling Language \- Wikipedia, accessed November 15, 2025, [https://en.wikipedia.org/wiki/Unified\_Modeling\_Language](https://en.wikipedia.org/wiki/Unified_Modeling_Language)  
25. uml \- What is a proper diagram to describe software architecture, accessed November 15, 2025, [https://softwareengineering.stackexchange.com/questions/361371/what-is-a-proper-diagram-to-describe-software-architecture](https://softwareengineering.stackexchange.com/questions/361371/what-is-a-proper-diagram-to-describe-software-architecture)  
26. Formalization ofUML Class Diagram Using Description Logics \- ResearchGate, accessed November 15, 2025, [https://www.researchgate.net/profile/Radziah-Mohamad/publication/251944305\_Formalization\_of\_UML\_class\_diagram\_using\_description\_logics/links/540665b10cf2c48563b24fc9/Formalization-of-UML-class-diagram-using-description-logics.pdf](https://www.researchgate.net/profile/Radziah-Mohamad/publication/251944305_Formalization_of_UML_class_diagram_using_description_logics/links/540665b10cf2c48563b24fc9/Formalization-of-UML-class-diagram-using-description-logics.pdf)  
27. A Formal Framework for Reasoning on UML Class Diagrams, accessed November 15, 2025, [https://www.diag.uniroma1.it/\~degiacomo/papers/2002/CCDL02ismis.pdf](https://www.diag.uniroma1.it/~degiacomo/papers/2002/CCDL02ismis.pdf)  
28. The UML as a Formal Modeling Notation \- arXiv, accessed November 15, 2025, [https://arxiv.org/pdf/1409.6919](https://arxiv.org/pdf/1409.6919)  
29. Formal Semantics and Reasoning about UML Class Diagram, accessed November 15, 2025, [https://www.ia.pw.edu.pl/\~mszlenk/pdf/Formal-Semantics-Reasoning-UML-Class-Diagram.pdf](https://www.ia.pw.edu.pl/~mszlenk/pdf/Formal-Semantics-Reasoning-UML-Class-Diagram.pdf)  
30. Formal Semantics and Reasoning about UML Class Diagram \- ResearchGate, accessed November 15, 2025, [https://www.researchgate.net/publication/220793803\_Formal\_Semantics\_and\_Reasoning\_about\_UML\_Class\_Diagram](https://www.researchgate.net/publication/220793803_Formal_Semantics_and_Reasoning_about_UML_Class_Diagram)  
31. Formal Semantics and Reasoning about UML Class Diagram \- IEEE Computer Society, accessed November 15, 2025, [https://www.computer.org/csdl/proceedings-article/depcos-relcomex/2006/25650051/12OmNwcUk2a](https://www.computer.org/csdl/proceedings-article/depcos-relcomex/2006/25650051/12OmNwcUk2a)  
32. The practicality of UML diagrams in real-world Software Development \- Reddit, accessed November 15, 2025, [https://www.reddit.com/r/ExperiencedDevs/comments/vms2xw/the\_practicality\_of\_uml\_diagrams\_in\_realworld/](https://www.reddit.com/r/ExperiencedDevs/comments/vms2xw/the_practicality_of_uml_diagrams_in_realworld/)  
33. RDF as graph-based, diagrammatic logic \- SciSpace, accessed November 15, 2025, [https://scispace.com/pdf/rdf-as-graph-based-diagrammatic-logic-2jjcal4odr.pdf](https://scispace.com/pdf/rdf-as-graph-based-diagrammatic-logic-2jjcal4odr.pdf)  
34. (PDF) RDF as Graph-Based, Diagrammatic Logic \- ResearchGate, accessed November 15, 2025, [https://www.researchgate.net/publication/220925456\_RDF\_as\_Graph-Based\_Diagrammatic\_Logic](https://www.researchgate.net/publication/220925456_RDF_as_Graph-Based_Diagrammatic_Logic)  
35. RDF 1.2 Concepts and Abstract Data Model \- W3C, accessed November 15, 2025, [https://www.w3.org/TR/rdf12-concepts/](https://www.w3.org/TR/rdf12-concepts/)  
36. What Is RDF? | Ontotext Fundamentals, accessed November 15, 2025, [https://www.ontotext.com/knowledgehub/fundamentals/what-is-rdf/](https://www.ontotext.com/knowledgehub/fundamentals/what-is-rdf/)  
37. Reasoning — GraphDB 11.1 documentation \- Ontotext, accessed November 15, 2025, [https://graphdb.ontotext.com/documentation/11.1/reasoning.html](https://graphdb.ontotext.com/documentation/11.1/reasoning.html)  
38. RDF Graph Validation Using Rule-Based Reasoning \- Semantic Web Journal, accessed November 15, 2025, [https://www.semantic-web-journal.net/system/files/swj2145.pdf](https://www.semantic-web-journal.net/system/files/swj2145.pdf)  
39. 10\. Reasoning \- RDFox documentation \- Oxford Semantic Technologies, accessed November 15, 2025, [https://docs.oxfordsemantic.tech/reasoning.html](https://docs.oxfordsemantic.tech/reasoning.html)  
40. The intuitions behind Knowledge Graphs and Reasoning | by Peter Crocker | TDS Archive, accessed November 15, 2025, [https://medium.com/data-science/the-intuitions-behind-knowledge-graphs-and-reasoning-59df2f1ad054](https://medium.com/data-science/the-intuitions-behind-knowledge-graphs-and-reasoning-59df2f1ad054)  
41. A Diagrammatic Inference System with Euler Circles \- Keio University, accessed November 15, 2025, [https://abelard.flet.keio.ac.jp/person/takemura/paper/155-final-eul-j-comp.pdf](https://abelard.flet.keio.ac.jp/person/takemura/paper/155-final-eul-j-comp.pdf)  
42. UNDERSTANDING THE SEMANTICS OF CONCEPTUAL GRAPHS \- Tampereen yliopisto, accessed November 15, 2025, [https://webpages.tuni.fi/utacs\_history/cs/reports/pdf/A-1999-4.pdf](https://webpages.tuni.fi/utacs_history/cs/reports/pdf/A-1999-4.pdf)  
43. Conceptual Graphs and First Order Logic \- ResearchGate, accessed November 15, 2025, [https://www.researchgate.net/publication/220458727\_Conceptual\_Graphs\_and\_First\_Order\_Logic](https://www.researchgate.net/publication/220458727_Conceptual_Graphs_and_First_Order_Logic)  
44. Rules and constraints manipulation \- Cogitant, accessed November 15, 2025, [https://cogitant.sourceforge.io/cogitant\_html/prog\_rule.html](https://cogitant.sourceforge.io/cogitant_html/prog_rule.html)  
45. Introduction to the ZX-calculus | PennyLane Demos, accessed November 15, 2025, [https://pennylane.ai/qml/demos/tutorial\_zx\_calculus](https://pennylane.ai/qml/demos/tutorial_zx_calculus)  
46. Conceptual Graphs \- John Sowa, accessed November 15, 2025, [https://www.jfsowa.com/cg/cg\_hbook.pdf](https://www.jfsowa.com/cg/cg_hbook.pdf)  
47. (PDF) Negations in Simple Concept Graphs \- ResearchGate, accessed November 15, 2025, [https://www.researchgate.net/publication/221648795\_Negations\_in\_Simple\_Concept\_Graphs](https://www.researchgate.net/publication/221648795_Negations_in_Simple_Concept_Graphs)  
48. Conceptual Graph Summary \- John Sowa, accessed November 15, 2025, [http://www.jfsowa.com/cg/cgif.htm](http://www.jfsowa.com/cg/cgif.htm)  
49. Amine Platform: an Artificial Intelligence Environment For the Development of Intelligent Systems \- ResearchGate, accessed November 15, 2025, [https://www.researchgate.net/publication/260383612\_Amine\_Platform\_an\_Artificial\_Intelligence\_Environment\_For\_the\_Development\_of\_Intelligent\_Systems](https://www.researchgate.net/publication/260383612_Amine_Platform_an_Artificial_Intelligence_Environment_For_the_Development_of_Intelligent_Systems)  
50. Development of intelligent systems and multi-agents systems with amine platform \- SciSpace, accessed November 15, 2025, [https://scispace.com/pdf/development-of-intelligent-systems-and-multi-agents-systems-5981i44yft.pdf](https://scispace.com/pdf/development-of-intelligent-systems-and-multi-agents-systems-5981i44yft.pdf)  
51. Conceptual Graph (CG) \- Amine PLATFORM, accessed November 15, 2025, [https://amine-platform.sourceforge.net/component/structures/CG.htm](https://amine-platform.sourceforge.net/component/structures/CG.htm)  
52. Synergy \- Amine PLATFORM, accessed November 15, 2025, [https://amine-platform.sourceforge.net/component/engines/Synergy.htm](https://amine-platform.sourceforge.net/component/engines/Synergy.htm)  
53. Conceptual graph \- Wikipedia, accessed November 15, 2025, [https://en.wikipedia.org/wiki/Conceptual\_graph](https://en.wikipedia.org/wiki/Conceptual_graph)  
54. Visual reasoning with graph-based mechanisms: the good, the better and the best | The Knowledge Engineering Review | Cambridge Core, accessed November 15, 2025, [https://www.cambridge.org/core/journals/knowledge-engineering-review/article/visual-reasoning-with-graphbased-mechanisms-the-good-the-better-and-the-best/4F361F7D9A306DEA9E80481D4A079BE9](https://www.cambridge.org/core/journals/knowledge-engineering-review/article/visual-reasoning-with-graphbased-mechanisms-the-good-the-better-and-the-best/4F361F7D9A306DEA9E80481D4A079BE9)  
55. (PDF) A Categorical Formalism for Conceptual Graphs, accessed November 15, 2025, [https://www.researchgate.net/publication/387214576\_A\_Categorical\_Formalism\_for\_Conceptual\_Graphs](https://www.researchgate.net/publication/387214576_A_Categorical_Formalism_for_Conceptual_Graphs)  
56. Categorifying the ZX-calculus \- arXiv, accessed November 15, 2025, [https://arxiv.org/pdf/1704.07034](https://arxiv.org/pdf/1704.07034)  
57. ZX-calculus for the working quantum computer scientist \- arXiv, accessed November 15, 2025, [https://arxiv.org/pdf/2012.13966](https://arxiv.org/pdf/2012.13966)  
58. (PDF) Categorifying the ZX-calculus \- ResearchGate, accessed November 15, 2025, [https://www.researchgate.net/publication/386612068\_Categorifying\_the\_ZX-calculus](https://www.researchgate.net/publication/386612068_Categorifying_the_ZX-calculus)  
59. ZX-calculus \- Quantinuum, accessed November 15, 2025, [https://www.quantinuum.com/glossary-item/zx-calculus](https://www.quantinuum.com/glossary-item/zx-calculus)  
60. FRAUNHOFER INSTITUT (AISEC) ZX-Calculus, accessed November 15, 2025, [https://home.cit.tum.de/\~ler/ZX-Calculus.pdf](https://home.cit.tum.de/~ler/ZX-Calculus.pdf)  
61. Report on ZX-Calculus \- Department of Computer Science, accessed November 15, 2025, [https://www.cs.tufts.edu/comp/150QC/Report3Alex.pdf](https://www.cs.tufts.edu/comp/150QC/Report3Alex.pdf)  
62. ZX graphical calculus for continuous-variable quantum processes | Phys. Rev. Research, accessed November 15, 2025, [https://link.aps.org/doi/10.1103/PhysRevResearch.7.033141](https://link.aps.org/doi/10.1103/PhysRevResearch.7.033141)  
63. \[1507.03854\] Making the stabilizer ZX-calculus complete for scalars \- arXiv, accessed November 15, 2025, [https://arxiv.org/abs/1507.03854](https://arxiv.org/abs/1507.03854)  
64. Some notes on diagram chasing and diagrammatic proofs in category theory \- arXiv, accessed November 15, 2025, [https://arxiv.org/abs/2010.12534](https://arxiv.org/abs/2010.12534)  
65. Homological Algebra (I): The Five Lemma and the Snake Lemma \- Yan Sheng's site, accessed November 15, 2025, [https://angyansheng.github.io/notes/homological-algebra-i](https://angyansheng.github.io/notes/homological-algebra-i)  
66. Exact Sequences and Diagram Chasing | Homological Algebra Class Notes \- Fiveable, accessed November 15, 2025, [https://fiveable.me/homological-algebra/unit-3](https://fiveable.me/homological-algebra/unit-3)  
67. How to do diagram chasing effectively? \- Math Stack Exchange, accessed November 15, 2025, [https://math.stackexchange.com/questions/268613/how-to-do-diagram-chasing-effectively](https://math.stackexchange.com/questions/268613/how-to-do-diagram-chasing-effectively)  
68. Homological Algebra Summer Mini-course 2024: Problem Sets, accessed November 15, 2025, [https://web.ma.utexas.edu/SMC/2024/Homalgpsets.pdf](https://web.ma.utexas.edu/SMC/2024/Homalgpsets.pdf)  
69. Proof of the five lemma \- abstract algebra \- Math Stack Exchange, accessed November 15, 2025, [https://math.stackexchange.com/questions/598772/proof-of-the-five-lemma](https://math.stackexchange.com/questions/598772/proof-of-the-five-lemma)  
70. Spectral Sequence proof of the five lemma \- Math Stack Exchange, accessed November 15, 2025, [https://math.stackexchange.com/questions/51582/spectral-sequence-proof-of-the-five-lemma](https://math.stackexchange.com/questions/51582/spectral-sequence-proof-of-the-five-lemma)  
71. The symmetric monoidal 2-category of permutative categories, accessed November 15, 2025, [https://higher-structures.math.cas.cz/api/files/issues/Vol8Iss1/GurJohOso](https://higher-structures.math.cas.cz/api/files/issues/Vol8Iss1/GurJohOso)  
72. spectra associated to symmetric monoidal bicategories, accessed November 15, 2025, [https://people.reed.edu/\~aosorno/symmonbicat.pdf](https://people.reed.edu/~aosorno/symmonbicat.pdf)  
73. \[1210.1174\] Infinite loop spaces, and coherence for symmetric monoidal bicategories \- arXiv, accessed November 15, 2025, [https://arxiv.org/abs/1210.1174](https://arxiv.org/abs/1210.1174)  
74. Symmetric Monoidal Bicategories | The n-Category Café, accessed November 15, 2025, [https://golem.ph.utexas.edu/category/2012/10/symmetric\_monoidal\_bicategorie\_1.html](https://golem.ph.utexas.edu/category/2012/10/symmetric_monoidal_bicategorie_1.html)  
75. \[2211.04464\] The symmetric monoidal 2-category of permutative categories \- arXiv, accessed November 15, 2025, [https://arxiv.org/abs/2211.04464](https://arxiv.org/abs/2211.04464)  
76. What efforts have there been in trying to automate diagrammatic proofs in category theory?, accessed November 15, 2025, [https://mathoverflow.net/questions/501382/what-efforts-have-there-been-in-trying-to-automate-diagrammatic-proofs-in-catego](https://mathoverflow.net/questions/501382/what-efforts-have-there-been-in-trying-to-automate-diagrammatic-proofs-in-catego)  
77. What efforts have there been in trying to automate diagrammatic proofs in category theory?, accessed November 15, 2025, [https://proofassistants.stackexchange.com/questions/5366/what-efforts-have-there-been-in-trying-to-automate-diagrammatic-proofs-in-catego](https://proofassistants.stackexchange.com/questions/5366/what-efforts-have-there-been-in-trying-to-automate-diagrammatic-proofs-in-catego)  
78. Diagrammatic rewriting modulo isotopy \- Institut Camille Jordan, accessed November 15, 2025, [http://math.univ-lyon1.fr/\~bdupont/abstractsyco18.pdf](http://math.univ-lyon1.fr/~bdupont/abstractsyco18.pdf)  
79. String diagram rewrite theory II: rewriting with symmetric monoidal structure, accessed November 15, 2025, [https://www.oqi.ox.ac.uk/publication/1285283/ora-hyrax](https://www.oqi.ox.ac.uk/publication/1285283/ora-hyrax)  
80. \[2012.01847\] String Diagram Rewrite Theory I: Rewriting with Frobenius Structure \- arXiv, accessed November 15, 2025, [https://arxiv.org/abs/2012.01847](https://arxiv.org/abs/2012.01847)  
81. Machine-Checked Categorical Diagrammatic Reasoning \- arXiv, accessed November 15, 2025, [https://arxiv.org/pdf/2402.14485](https://arxiv.org/pdf/2402.14485)  
82. Machine-Checked Categorical Diagrammatic Reasoning \- arXiv, accessed November 15, 2025, [https://arxiv.org/html/2402.14485v4](https://arxiv.org/html/2402.14485v4)  
83. Machine-Checked Categorical Diagrammatic Reasoning \- DROPS, accessed November 15, 2025, [https://drops.dagstuhl.de/storage/00lipics/lipics-vol299-fscd2024/LIPIcs.FSCD.2024.7/LIPIcs.FSCD.2024.7.pdf](https://drops.dagstuhl.de/storage/00lipics/lipics-vol299-fscd2024/LIPIcs.FSCD.2024.7/LIPIcs.FSCD.2024.7.pdf)  
84. How do we prove commutativity of a diagram? \- Math Stack Exchange, accessed November 15, 2025, [https://math.stackexchange.com/questions/1385636/how-do-we-prove-commutativity-of-a-diagram](https://math.stackexchange.com/questions/1385636/how-do-we-prove-commutativity-of-a-diagram)  
85. Machine-Checked Categorical Diagrammatic Reasoning \- arXiv, accessed November 15, 2025, [https://arxiv.org/html/2402.14485v1](https://arxiv.org/html/2402.14485v1)  
86. Concrete and Abstract Syntax | Principles of Programming Languages \- GitHub Pages, accessed November 15, 2025, [https://bguppl.github.io/interpreters/practice\_sessions/ps4.html](https://bguppl.github.io/interpreters/practice_sessions/ps4.html)  
87. What is the difference between an Abstract Syntax Tree and a Concrete Syntax Tree? \- Stack Overflow, accessed November 15, 2025, [https://stackoverflow.com/questions/1888854/what-is-the-difference-between-an-abstract-syntax-tree-and-a-concrete-syntax-tre](https://stackoverflow.com/questions/1888854/what-is-the-difference-between-an-abstract-syntax-tree-and-a-concrete-syntax-tre)  
88. Teaching with Concrete and Abstract Visual Representations: Effects on Students' Problem Solving, Problem Representations, and Learning Perceptions \- Faculty Hub \- ASU Engineering, accessed November 15, 2025, [https://faculty.engineering.asu.edu/mre/wp-content/uploads/sites/31/2020/02/AbsConJEP.pdf](https://faculty.engineering.asu.edu/mre/wp-content/uploads/sites/31/2020/02/AbsConJEP.pdf)  
89. A Graphical Interface for Category Theory Proofs ... \- CSE CGI Server, accessed November 15, 2025, [https://cgi.cse.unsw.edu.au/\~eptcs/paper.cgi?ThEdu24.2.pdf](https://cgi.cse.unsw.edu.au/~eptcs/paper.cgi?ThEdu24.2.pdf)  
90. Applied Category Theory in the Wolfram Language using Categorica I: Diagrams, Functors and Fibrations \- arXiv, accessed November 15, 2025, [https://arxiv.org/html/2403.16269v1](https://arxiv.org/html/2403.16269v1)  
91. Monoidal category \- Wikipedia, accessed November 15, 2025, [https://en.wikipedia.org/wiki/Monoidal\_category](https://en.wikipedia.org/wiki/Monoidal_category)  
92. Monoidal Category Theory: Unifying Concepts in Mathematics, Physics, and Computing, accessed November 15, 2025, [https://ieeexplore.ieee.org/book/10653749](https://ieeexplore.ieee.org/book/10653749)  
93. A survey of graphical languages for monoidal categories \- arXiv, accessed November 15, 2025, [https://arxiv.org/pdf/0908.3347](https://arxiv.org/pdf/0908.3347)  
94. Monoidal Categories \- Graphical Linear Algebra, accessed November 15, 2025, [https://graphicallinearalgebra.net/category/monoidal-categories/](https://graphicallinearalgebra.net/category/monoidal-categories/)  
95. Displayed Monoidal Categories for the Semantics of Linear Logic \- Pure, accessed November 15, 2025, [https://pure-oai.bham.ac.uk/ws/portalfiles/portal/231410980/3636501.3636956.pdf](https://pure-oai.bham.ac.uk/ws/portalfiles/portal/231410980/3636501.3636956.pdf)  
96. String diagrams and symmetric monoidal categories • Lecture 2 \- Resource-sensitive algebraic theories • Lect, accessed November 15, 2025, [https://www.cs.le.ac.uk/events/mgs2017/courses/graphical-linear-algebra-lecture2.pdf](https://www.cs.le.ac.uk/events/mgs2017/courses/graphical-linear-algebra-lecture2.pdf)  
97. Euler diagram \- Wikipedia, accessed November 15, 2025, [https://en.wikipedia.org/wiki/Euler\_diagram](https://en.wikipedia.org/wiki/Euler_diagram)  
98. Graphical Rewriting for Diagrammatic Reasoning in Monoidal Categories in Lean4 \- DROPS, accessed November 15, 2025, [https://drops.dagstuhl.de/storage/00lipics/lipics-vol309-itp2024/LIPIcs.ITP.2024.41/LIPIcs.ITP.2024.41.pdf](https://drops.dagstuhl.de/storage/00lipics/lipics-vol309-itp2024/LIPIcs.ITP.2024.41/LIPIcs.ITP.2024.41.pdf)  
99. \[D\] What is going on here? NeurIPS 2018 paper on Automated Theorem Proving : r/MachineLearning \- Reddit, accessed November 15, 2025, [https://www.reddit.com/r/MachineLearning/comments/e61ls5/d\_what\_is\_going\_on\_here\_neurips\_2018\_paper\_on/](https://www.reddit.com/r/MachineLearning/comments/e61ls5/d_what_is_going_on_here_neurips_2018_paper_on/)  
100. \[2402.14485\] Machine-Checked Categorical Diagrammatic Reasoning \- arXiv, accessed November 15, 2025, [https://arxiv.org/abs/2402.14485](https://arxiv.org/abs/2402.14485)  
101. Faithful Logic Embeddings in HOL – A recipe to have it all: deep and shallow, automated and interactive, heavy and light, proofs and counterexamples, meta and object level \- arXiv, accessed November 15, 2025, [https://arxiv.org/html/2502.19311v1](https://arxiv.org/html/2502.19311v1)  
102. Faithful Logic Embeddings in HOL — Deep and Shallow \- arXiv, accessed November 15, 2025, [https://arxiv.org/html/2502.19311v3](https://arxiv.org/html/2502.19311v3)  
103. Diagram Chasing in Interactive Theorem Proving \- IPD Snelting, accessed November 15, 2025, [https://pp.ipd.kit.edu/uploads/publikationen/himmel20bachelorarbeit.pdf](https://pp.ipd.kit.edu/uploads/publikationen/himmel20bachelorarbeit.pdf)  
104. Algorithm or theory of diagram chasing \- MathOverflow, accessed November 15, 2025, [https://mathoverflow.net/questions/9930/algorithm-or-theory-of-diagram-chasing](https://mathoverflow.net/questions/9930/algorithm-or-theory-of-diagram-chasing)  
105. coq-diagram-chasing \- MATTHIEU PIQUEREZ \- INRIA gitlab, accessed November 15, 2025, [https://gitlab.inria.fr/x-piquerez/coq-diagram-chasing](https://gitlab.inria.fr/x-piquerez/coq-diagram-chasing)  
106. Mathematical Components: Research Papers, accessed November 15, 2025, [https://math-comp.github.io/papers.html](https://math-comp.github.io/papers.html)  
107. Machine-Checked Categorical Diagrammatic Reasoning \- DROPS \- Schloss Dagstuhl, accessed November 15, 2025, [https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.FSCD.2024.7](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.FSCD.2024.7)  
108. Seminars \- Deducteam \- Inria, accessed November 15, 2025, [https://deducteam.gitlabpages.inria.fr/seminars.html](https://deducteam.gitlabpages.inria.fr/seminars.html)  
109. Automating Informal Human Mathematical Reasoning \- Department of Computer Science and Technology |, accessed November 15, 2025, [https://www.cl.cam.ac.uk/\~mj201/epsrc-arf.html](https://www.cl.cam.ac.uk/~mj201/epsrc-arf.html)  
110. Automation of Diagrammatic Reasoning \- AAAI, accessed November 15, 2025, [https://aaai.org/papers/0007-fs97-03-007-automation-of-diagrammatic-reasoning/](https://aaai.org/papers/0007-fs97-03-007-automation-of-diagrammatic-reasoning/)  
111. On Automating Diagrammatic Proofs of Arithmetic Arguments \- ResearchGate, accessed November 15, 2025, [https://www.researchgate.net/publication/2580808\_On\_Automating\_Diagrammatic\_Proofs\_of\_Arithmetic\_Arguments](https://www.researchgate.net/publication/2580808_On_Automating_Diagrammatic_Proofs_of_Arithmetic_Arguments)  
112. Premise Selection for Theorem Proving by Deep Graph Embedding, accessed November 15, 2025, [http://papers.neurips.cc/paper/6871-premise-selection-for-theorem-proving-by-deep-graph-embedding.pdf](http://papers.neurips.cc/paper/6871-premise-selection-for-theorem-proving-by-deep-graph-embedding.pdf)  
113. Relations to Automated Theorem Proving \- Wolfram Science, accessed November 15, 2025, [https://www.wolframscience.com/metamathematics/relations-to-automated-theorem-proving/](https://www.wolframscience.com/metamathematics/relations-to-automated-theorem-proving/)  
114. Knowledge representation and reasoning \- Wikipedia, accessed November 15, 2025, [https://en.wikipedia.org/wiki/Knowledge\_representation\_and\_reasoning](https://en.wikipedia.org/wiki/Knowledge_representation_and_reasoning)  
115. Logic-Based Artificial Intelligence \- Stanford Encyclopedia of Philosophy, accessed November 15, 2025, [https://plato.stanford.edu/entries/logic-ai/](https://plato.stanford.edu/entries/logic-ai/)  
116. Diagrammatic Reasoning for ALC visualizations with Logic Graphs \- OpenReview, accessed November 15, 2025, [https://openreview.net/forum?id=6EIkXlVPLM](https://openreview.net/forum?id=6EIkXlVPLM)  
117. A Description Logic Based Ontology for Knowledge Representation in Process Planning for Laser Powder Bed Fusion \- MDPI, accessed November 15, 2025, [https://www.mdpi.com/2076-3417/12/9/4612](https://www.mdpi.com/2076-3417/12/9/4612)  
118. Formal concept analysis \- Wikipedia, accessed November 15, 2025, [https://en.wikipedia.org/wiki/Formal\_concept\_analysis](https://en.wikipedia.org/wiki/Formal_concept_analysis)  
119. Formal concept analysis – Knowledge and References \- Taylor & Francis, accessed November 15, 2025, [https://taylorandfrancis.com/knowledge/Engineering\_and\_technology/Computer\_science/Formal\_concept\_analysis/](https://taylorandfrancis.com/knowledge/Engineering_and_technology/Computer_science/Formal_concept_analysis/)  
120. Formal Concept Analysis \- International Center for Computational Logic \- TU Dresden, accessed November 15, 2025, [https://iccl.inf.tu-dresden.de/web/Formale\_Begriffsanalyse/en](https://iccl.inf.tu-dresden.de/web/Formale_Begriffsanalyse/en)  
121. Formal Concept Analysis in Information Science \- Uta Priss, accessed November 15, 2025, [https://www.upriss.org.uk/papers/arist.pdf](https://www.upriss.org.uk/papers/arist.pdf)