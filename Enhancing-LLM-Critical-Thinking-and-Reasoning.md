# **Cognitive Architectures for Large Language Models: Intrinsic Mechanisms for Critical Thinking, Reasoning, and Completeness of Thought**

## **1\. Introduction: The Transition from Stochastic Generation to Deliberate Cognition**

The trajectory of Large Language Model (LLM) development has undergone a fundamental phase transition. For the better part of a decade, the dominant paradigm was governed by the scaling laws of autoregressive prediction—the observation that increasing parameter counts and training data volume yields predictable, power-law improvements in perplexity and downstream performance. However, as models have matured from statistical predictors to semantic engines, a critical cognitive bottleneck has emerged. While foundational models excel at rapid, intuitive pattern matching (analogous to System 1 thinking), they have historically exhibited brittleness in tasks requiring multi-step logic, error correction, and the maintenance of global consistency over extended reasoning horizons. The probabilistic prediction of the next token, while sufficient for fluency, does not inherently engender the rigorous verification and backtracking capabilities required for complex problem-solving.

This report investigates the emerging research methods and architectures designed to bridge this gap, focusing specifically on **intrinsic capabilities**—mechanisms embedded within the model’s training, fine-tuning, or inference-time architecture—rather than external constraints or rigid heuristics. The objective of this domain of research is to move beyond the simulation of coherence toward the generation of coherent, complete, and verifiable chains of thought.

The evolution of LLM reasoning from 2022 to 2026 reflects a steady progression from minimal guidance to structured, internalized cognition. Early interventions relied on surface-level prompting strategies, such as Zero-Shot and Few-Shot prompting, which provided minimal scaffolding for the model’s latent reasoning abilities.1 The introduction of Chain of Thought (CoT) marked a pivotal moment, demonstrating that prompting models to externalize their intermediate reasoning steps could unlock latent logical capabilities that were otherwise inaccessible via direct inference.1 Subsequent developments have formalized this process into sophisticated architectures like Tree of Thoughts (ToT) and Graph of Thoughts (GoT), which structure reasoning into non-linear, explorable topologies rather than linear sequences.3

Most recently, the field has pivoted toward **internalizing** these capabilities through specialized training regimens. Frameworks such as the Self-Taught Reasoner (STaR) and Quiet-STaR utilize self-generated reasoning traces to bootstrap performance, effectively allowing models to "teach themselves" to think by filtering and fine-tuning on their own successful reasoning trajectories.5 Simultaneously, the emergence of dedicated "reasoning models" like DeepSeek-R1 and OpenAI’s o1 series has demonstrated that Reinforcement Learning (RL) applied directly to reasoning trajectories can induce emergent behaviors—such as self-verification, backtracking, and spontaneous strategy revision—without relying on massive human-labeled datasets.7

This report provides an exhaustive analysis of these methodologies, categorized into inference-time architectures, training-time internalization strategies, process supervision mechanisms, and multi-agent dialectical systems. It further explores the complex interplay between advanced reasoning capabilities and safety alignment, examining whether the ability to think critically serves as a safeguard against harm or a vector for sophisticated adversarial exploitation.

## **2\. Theoretical Foundations of Machine Reasoning**

To effectively analyze the architectures enhancing critical thinking, it is necessary to first characterize the cognitive deficits of standard autoregressive models and the theoretical frameworks proposed to address them. The limitations of standard LLMs are not merely issues of scale but of architecture; the Transformer, in its native state, processes information in a feed-forward manner that prioritizes local coherence over global logical consistency.

### **2.1. System 1 vs. System 2 Thinking in Artificial Intelligence**

The distinction between System 1 and System 2 thinking, originally conceptualized by psychologists Stanovich and West and popularized by Daniel Kahneman, provides the primary theoretical lens for current reasoning research in Artificial Intelligence. This dual-process theory maps remarkably well onto the current dichotomy in LLM operations.

**System 1 (Fast, Intuitive):** Standard LLM generation is analogous to System 1 cognition. It is fast, automatic, and relies on heuristics and pattern recognition encoded in the weights during pre-training. When a model predicts the next token based on surface-level correlations, it is engaging in System 1 processing. This mode excels at tasks like translation, simple factual recall, and stylistic mimicry but is prone to biases, hallucinations, and logical fallacies when faced with novel complexity or adversarial premises.10 The "thoughtlessness" of this mode is akin to a reflex; the model does not "consider" alternatives but rather collapses the probability distribution onto the most likely immediate continuation.

**System 2 (Slow, Deliberate):** System 2 thinking is characterized by slow, sequential, and effortful processing. It involves planning, decomposing problems into sub-steps, actively monitoring for errors, and allocating cognitive resources based on task difficulty. In the context of LLMs, System 2 is simulated by "compute-heavy" inference strategies where the model generates intermediate tokens (reasoning traces) before committing to a final answer.10 The transition to System 2 involves enabling the model to "pause" and perform computation in the token space—effectively using the context window as a working memory buffer to store intermediate states of logic.

The core challenge in AI architecture is that standard Transformers are natively System 1 engines; they process input and generate output in a single forward pass per token without inherent backtracking or reflection. Enhancing reasoning requires imposing a System 2 structure—either by modifying the data flow (e.g., looping outputs back as inputs), altering the training objective (e.g., rewarding valid reasoning steps), or restructuring the inference process (e.g., tree search) to allow for the exploration of the solution space.13

### **2.2. The Role of Metacognition**

True completeness of thought requires **metacognition**—the ability of the system to monitor and regulate its own cognitive processes. In humans, this involves knowing *when* one does not know, or recognizing that a chosen strategy is failing. In LLMs, metacognition is operationalized through mechanisms that allow the model to assess its own uncertainty and adjust its behavior accordingly.

This encompasses several distinct functional capabilities:

* **Difficulty Awareness:** The ability to recognize when a problem requires extensive reasoning resources versus a simple retrieval operation.  
* **Confidence Calibration:** Aligning the model's internal confidence scores with the objective probability of correctness, preventing the "overconfidence" often seen in hallucinated answers.  
* **Strategy Selection:** Dynamically choosing between different reasoning paths or tools based on the problem state.15

Research indicates that current Large Reasoning Models (LRMs) exhibit partial metacognitive abilities. For instance, internal signals such as attention patterns, activation magnitudes, and token-level probabilities often contain significant information predictive of reasoning success, even if the model does not explicitly verbalize this uncertainty.15 However, these capabilities are often inconsistent and can be easily disrupted by adversarial prompting. Architectures like the **Decoupling Metacognition from Cognition (DMC)** framework attempt to quantify and enhance these traits by mathematically separating the failure prediction task from the primary cognitive task, treating metacognition as a distinct supervisory layer over the base reasoning process.15

### **2.3. Latent vs. Explicit Reasoning**

A pivotal debate in the field concerns the locus of reasoning: should it be explicit (visible) or latent (hidden)?

**Explicit Reasoning** involves generating natural language tokens that represent the thought process (e.g., Chain of Thought). This has the primary advantage of interpretability; humans can inspect the reasoning chain to verify the logic. Furthermore, because LLMs are autoregressive, generating explicit steps allows the model to condition future tokens on the logical steps taken previously, effectively anchoring the reasoning in the context window.2

**Latent Reasoning**, conversely, posits that reasoning can and should occur within the high-dimensional vector space of the model's hidden states, without being externalized as text. Techniques like **Quiet-STaR** aim to cultivate this by training models to generate "thought markers" or process information in a latent "mixing head" before emitting a token. This effectively allows the model to "think before it speaks" without the computational overhead of generating verbose text strings, potentially leading to more efficient and scalable reasoning architectures.5

## **3\. Inference-Time Reasoning Frameworks**

Inference-time architectures restructure the generation process to force the model out of its linear, autoregressive default. These frameworks treat the LLM not just as a sequence generator, but as a component in a larger reasoning engine capable of exploration, evaluation, and backtracking.

### **3.1. Chain of Thought (CoT): The Foundation**

Chain of Thought (CoT) prompting serves as the bedrock for modern reasoning architectures. By instructing the model to "think step by step" or providing examples of intermediate reasoning, CoT transforms a mapping of ![][image1] into ![][image2].1

**Mechanism:** CoT works by effectively increasing the computation depth allocated to a problem. The intermediate tokens serve as a "scratchpad," allowing the model to store intermediate variables and break logical dependencies into manageable chunks. This decomposition reduces the complexity of the mapping function required at any single step. **Limitations:** Standard CoT is linear. If the model makes an error in an early step, the error propagates through the chain (the "cascade effect"), leading to an incorrect conclusion. It lacks the ability to explore alternative possibilities once a path is chosen; it is a "greedy" approach to reasoning.1

### **3.2. Tree of Thoughts (ToT): Introducing Search**

To address the linearity and brittleness of CoT, the **Tree of Thoughts (ToT)** framework introduces classical search algorithms to the reasoning process. ToT conceptualizes reasoning as a search over a tree where each node represents a partial "thought" or reasoning step.1

**Architecture:**

The ToT framework decomposes the problem solving process into four distinct phases:

1. **Decomposition:** The problem is broken down into smaller steps (e.g., writing a line of code, generating a sentence, solving a sub-equation).  
2. **Generation:** At each step, the model generates multiple candidate thoughts (branching), rather than a single continuation.  
3. **Evaluation:** A heuristic or a separate "voter" model evaluates the promise of each candidate thought. This evaluation can be a scalar value or a classification (e.g., "sure", "maybe", "impossible").  
4. **Search Algorithm:** The system navigates the tree using Breadth-First Search (BFS) or Depth-First Search (DFS), allowing it to backtrack if a path yields a low evaluation score and prune unpromising branches.3

**Intrinsic Insight:** ToT moves the LLM from a probabilistic generator to a state-space search engine. It mimics human problem-solving by considering multiple options ("counterfactuals") and discarding those that appear unpromising. However, it incurs significant computational costs due to the generation and evaluation of multiple branches, making it slower and more expensive than standard inference.1

### **3.3. Graph of Thoughts (GoT): Non-Linear Topology**

**Graph of Thoughts (GoT)** generalizes ToT by modeling reasoning as a Directed Acyclic Graph (DAG) or even a cyclic graph. This allows for more complex cognitive operations that are impossible in a tree structure.1

**Architecture:**

GoT enables operations such as:

* **Aggregation:** Several independent chains of thought can be merged to form a stronger conclusion (e.g., synthesizing three different summaries of a text into a master summary).  
* **Refinement:** A thought node can be looped back to a previous node for improvement, creating iterative refinement cycles.  
* **Recurrence:** Information can flow non-linearly, enabling the model to combine insights from disparate reasoning paths that may have diverged earlier in the process.1

GoT employs a "Controller" module that manages the graph structure, determining when to spawn new thoughts, when to merge them, and when to terminate the process. This architecture is particularly effective for tasks requiring the synthesis of information, such as document summarization, complex creative writing, or multi-faceted planning.1

### **3.4. Buffer of Thoughts (BoT) and Meta-CoT**

**Buffer of Thoughts (BoT)** introduces a memory component—a "thought-template" buffer. Instead of generating a reasoning structure from scratch for every problem, BoT retrieves a relevant reasoning template from a high-level library of problem-solving strategies (e.g., "divide and conquer," "working backwards"). This enhances efficiency and consistency, as the model can instantiate a proven structure for a new instance of a problem rather than reinventing the wheel.1

**Meta-CoT** takes a metacognitive approach by explicitly modeling the *choice* of reasoning strategy. Before entering a standard CoT, the system engages in a "Meta-CoT" phase where it analyzes the input to determine the necessary reasoning steps, effectively planning the CoT before executing it. This separates the *planning* of reasoning from the *execution*, aligning with System 2 theories of deliberative control and allowing for "linearized search traces" where the model learns from both successful and unsuccessful paths.13

### **3.5. Comparative Analysis of Architectures**

The following table summarizes the structural differences and trade-offs of these frameworks.

| Framework | Topology | Key Mechanism | Best Use Case | Trade-offs |
| :---- | :---- | :---- | :---- | :---- |
| **Chain of Thought (CoT)** | Linear | Step-by-step sequential generation | Math word problems, simple logic, instruction following | Error propagation (cascade effect), lack of exploration, inability to recover from early mistakes. |
| **Tree of Thoughts (ToT)** | Tree | BFS/DFS Search, Backtracking, Branching | Strategic planning, puzzles (e.g., Sudoku, Crosswords), creative writing | High compute cost, high latency, requires defining evaluation heuristics. |
| **Graph of Thoughts (GoT)** | Graph (DAG) | Merging, looping, aggregation of nodes | Sorting, summarization, creative synthesis, complex software design | High implementation complexity, orchestration overhead. |
| **Buffer of Thoughts (BoT)** | Template-based | Retrieval of high-level reasoning patterns | Repetitive structured tasks, data extraction | Dependence on the quality and diversity of the template library. |

## **4\. Training for Intrinsic Reasoning: The Self-Improvement Loop**

While inference architectures structure the output, training methodologies aim to internalize reasoning capabilities directly into the model's weights. The goal is to create models that reason intuitively (intrinsic System 2\) without the need for elaborate external orchestration or prompting scaffolding.

### **4.1. Self-Taught Reasoner (STaR)**

**STaR** (Self-Taught Reasoner) is a bootstrapping framework that allows an LLM to improve its own reasoning using only a small set of initial rationales. It addresses the scarcity of high-quality "thought data" by generating it synthetically.6

**The STaR Loop:**

1. **Generation:** The model attempts to answer questions from a dataset, generating reasoning traces (rationales) and final answers.  
2. **Filtering:** If the final answer generated by the model matches the ground truth, the reasoning trace is assumed to be valid and is added to the training set.  
3. **Rationalization:** For questions where the model failed (incorrect answer), the model is prompted with the *correct* answer and asked to generate a rationale that leads to it. This "hindsight" reasoning allows the model to learn from problems it initially failed to solve, effectively reasoning backward from the solution.  
4. **Fine-Tuning:** The model is fine-tuned on the combined dataset of successful traces and hindsight-generated rationales. The process is then repeated, with the improved model generating new training data.6

**Intrinsic Benefit:** STaR creates a virtuous cycle where the model iteratively expands its "reasoning frontier." It decouples performance from the need for massive human-annotated CoT datasets, relying instead on the ground truth of the final answers to validate the reasoning process.20

### **4.2. Quiet-STaR: Internalizing Thought**

**Quiet-STaR** extends the STaR principle to general text generation, where explicit questions and answers may not exist. It aims to teach the model to "think" implicitly between tokens, moving reasoning from the output space to the latent space.

**Mechanism:**

* **Parallel Sampling:** For every token in a sequence, the model generates multiple internal "thought" tokens (chains of rationale) in parallel. These thoughts are not displayed to the user.  
* **Mixing Head:** A learnable mixing head combines the information from these thought tokens with the original hidden state of the model. This allows the model to condition its next-token prediction on the content of the hidden thoughts.  
* **Reward Signal:** The model is rewarded based on whether the generated thoughts improve the prediction of the *next* token in the text. If a thought helps predict the future text better than the baseline, it is reinforced.5

**Significance:** Quiet-STaR represents a move toward **Latent Reasoning**. By training the model to utilize "thinking tokens" that are not necessarily output to the user, it mimics the human process of pausing to think before speaking. This results in models that perform better on zero-shot reasoning tasks without explicit CoT prompting during inference, effectively internalizing the "scratchpad".5

### **4.3. DeepSeek-R1 and Pure Reinforcement Learning**

The development of **DeepSeek-R1** (released early 2025\) provides a definitive case study in training intrinsic reasoning via **Pure Reinforcement Learning (RL)**. Unlike previous approaches that relied heavily on Supervised Fine-Tuning (SFT) with human demonstrations, DeepSeek-R1 demonstrated that sophisticated reasoning patterns could emerge from RL alone, provided the incentive structure is correct.7

#### **4.3.1. DeepSeek-R1-Zero: The Emergence of Reasoning**

DeepSeek-R1-Zero was trained using **Group Relative Policy Optimization (GRPO)** directly on a base model, without any initial SFT data.

* **GRPO Mechanism:** GRPO eliminates the need for a separate value model (critic) which is common in PPO (Proximal Policy Optimization). Instead, it samples a group of outputs ![][image3] for a given question ![][image4] and computes the advantage of each output relative to the group average. This reduces computational overhead and stabilizes training, allowing for the scaling of RL to massive models.7 The advantage ![][image5] is calculated as:  
  ![][image6]  
* **Reward Function:** The reward system was purely rule-based, avoiding the "reward hacking" common with neural reward models.  
  * **Accuracy Reward:** Checked against deterministic answers (e.g., math problems, LeetCode unit tests).  
  * **Format Reward:** Penalized the model if it did not enclose its thinking in \<think\> tags.7

**Emergent Behaviors:** Under this regime, the model spontaneously developed advanced reasoning behaviors that were not explicitly programmed:

* **Self-Verification:** The model began to double-check its calculations within the chain of thought.  
* **Backtracking:** It would recognize errors in its logic (e.g., "Wait, that doesn't look right") and restart the thought process.  
* **"Aha Moments":** The training logs revealed instances where the model would re-evaluate its approach mid-generation, leading to sudden, non-linear improvements in solution quality.7

#### **4.3.2. The Multi-Stage R1 Pipeline**

To address issues with the Zero model (e.g., poor readability, language mixing, infinite loops), the final DeepSeek-R1 utilized a multi-stage pipeline:

1. **Cold Start:** A small amount of high-quality CoT data (thousands of samples) was used to fine-tune the base model, priming it for readable reasoning and establishing the output format.  
2. **Reasoning-Oriented RL:** Large-scale RL (GRPO) was applied to enhance reasoning depth and correctness.  
3. **Rejection Sampling:** The model generated millions of reasoning traces; only the correct and high-quality ones were kept to create a massive synthetic dataset.  
4. **Distillation:** This synthetic data was used to train smaller models (e.g., 7B, 14B), effectively distilling the reasoning capabilities of the large RL-trained model into efficient architectures suitable for broader deployment.7

## **5\. Verification and Process Supervision**

Completeness of thought is not only about generating a chain of reasoning but ensuring that every link in the chain is valid. This has led to the rise of **Process Reward Models (PRMs)**, which supervise the *process* of reasoning rather than just the *outcome*.

### **5.1. Process vs. Outcome Supervision**

* **Outcome Reward Models (ORM):** Evaluate only the final answer. While easier to train (binary label: correct/incorrect), ORMs suffer from the "sparse reward" problem—a long, correct chain with one minor error gets a zero, while a flawed chain that luckily guesses the right answer gets a one. This signal is noisy and inefficient for training complex reasoning.23  
* **Process Reward Models (PRM):** Assign a score to *each step* of the reasoning trace. This provides dense feedback, guiding the model back to the correct path immediately after an error. PRMs are essential for sophisticated search strategies like ToT, as they provide the evaluation function needed to prune branches.23

### **5.2. Math Shepherd and Automated Data Construction**

Training PRMs historically required expensive human annotation (e.g., the PRM800k dataset). **Math Shepherd** introduced a method to automate this, breaking the dependency on human labeling.

**The Math Shepherd Recipe:**

1. **Exploration:** A generator model produces multiple solutions for a problem using Monte Carlo sampling.  
2. **Verification:** The final answers are checked against the ground truth.  
3. **Step-Level Attribution:** The correctness of the final answer is back-propagated to the steps. Math Shepherd uses **Soft Estimation**, where the score for a step ![][image7] is calculated as the probability that a rollout starting from ![][image7] leads to a correct answer:  
   ![][image8]  
   This assigns high scores to robust steps (those that frequently lead to success) and low scores to fragile ones, creating a granular reward signal for every line of reasoning.24

### **5.3. Active Learning in PRMs**

Recent advancements (e.g., **ActPRM**) utilize active learning to refine PRMs efficiently. Instead of labeling every step, the system identifies steps where the current PRM is uncertain and selectively queries a stronger model (or human) for a label. **Mechanism:** The PRM is trained to predict not just the score, but its own uncertainty. During data collection, if the PRM is confident about a step (either definitely correct or definitely wrong), it self-labels. If it is uncertain, it queries a "Teacher" (a stronger model or human). This reduces the number of expensive teacher queries by \>80% while maintaining the performance of the resulting verifier, making process supervision scalable.27

### **5.4. The Alignment Benefit: Negative Tax**

OpenAI’s research on "Let’s Verify Step by Step" demonstrated a counter-intuitive and highly significant finding: Process supervision incurs a **negative alignment tax**. Usually, aligning a model for safety or human preference degrades its raw performance (the tax). However, in reasoning tasks, training the model to follow human-endorsed reasoning steps actually *improves* performance compared to outcome supervision. This suggests that "thinking like a human" (step-by-step, logical progression) is an intrinsic optimal strategy for LLMs on complex tasks, aligning the model's "thought process" with human logic without sacrificing capability.23

## **6\. Metacognition and Self-Correction Architectures**

Beyond generating reasoning, advanced architectures must possess the ability to reflect on that reasoning. This layer of **Metacognition** is what distinguishes a rote processor from a critical thinker.

### **6.1. The DMC Framework**

The **Decoupling Metacognition from Cognition (DMC)** framework provides a rigorous method for quantifying and improving self-awareness in LLMs. It operates by separating the task performance (Cognition) from the failure prediction (Metacognition).15 **Methodology:**

1. **Failure Prediction:** The model is asked to predict whether it will answer a question correctly before or after generating the answer.  
2. **Quantification:** The framework calculates the gap between the model's confidence and its actual performance (calibration).  
3. **Optimization:** By training the model specifically on the failure prediction task (using internal signals like perplexity or attention entropy), the system learns to recognize its own limitations. This allows the model to "abstain" or requesting help when it detects a high probability of failure, a crucial trait for reliability.

### **6.2. Reflexion: The Self-Correction Loop**

**Reflexion** is a framework that mimics the human process of learning from mistakes through verbal reinforcement. It does not require updating the model weights but rather updates the model's "short-term memory" or context.29

**Architecture:**

1. **Actor:** Generates a trajectory (reasoning/action) to solve a task.  
2. **Evaluator:** Scores the trajectory (e.g., using unit tests for code or a PRM for math).  
3. **Self-Reflection:** If the actor fails, a separate LLM agent analyzes the failure trace, generates a verbal summary of *why* it failed (e.g., "I forgot to import the library"), and stores this in a memory buffer.  
4. **Re-Act:** In the next attempt, the Actor conditions its generation on this reflection, avoiding the previous mistake.

This "verbal reinforcement learning" allows the model to improve iteratively. Empirical results show Reflexion agents significantly outperforming baseline agents on coding benchmarks (HumanEval) and reasoning tasks by effectively "debugging" their own thought process.29

## **7\. Multi-Agent and Dialectical Architectures**

Intrinsic reasoning can be further enhanced by simulating social cognition. Multi-Agent Debate (MAD) frameworks utilize multiple instances of an LLM (or different LLMs) to critique and refine each other's reasoning, leveraging the "wisdom of the crowds" within a silicon substrate.

### **7.1. Multi-Agent Debate (MAD) Protocols**

In a typical MAD setup, multiple agents attempt to solve a problem independently. They then share their solutions, critique peers, and update their answers in iterative rounds.31

**Mechanism:**

* **Divergent Thinking:** Initial independent generation prevents early convergence on a single (potentially wrong) path ("groupthink").  
* **Consensus Formation:** Through debate, agents must justify their stance. However, a known failure mode is the "tyranny of the majority," where agents conform to the most common answer regardless of correctness.  
* **Interventions:** To mitigate conformity, protocols like **Diversity-Pruning** (removing redundant responses to maintain high entropy) and **Misconception-Refutation** (explicitly targeting common errors) are employed.  
* **iMAD (Intelligent MAD):** To save compute, iMAD uses a classifier to determine *when* to debate. It detects low-confidence tokens or "hesitation markers" in the single-agent response and triggers debate only for these "uncertain" queries.33

### **7.2. The Interactive Socratic Training (STAR-XAI)**

Protocols like **STAR-XAI** formalize debate into a "Socratic" training method. The agent must formulate a hypothesis and justification. A supervisor (human or stronger AI) provides feedback—not the answer, but a "Falsification" signal or a "Strategic Probe" (question). This forces the agent to activate a "Failure Audit Protocol" to identify the root cause of its error, internalizing the critical thinking process through dialogic pressure.34

## **8\. The Reasoning-Safety Nexus**

The relationship between reasoning capabilities and safety is complex and bidirectional. Enhanced reasoning can act as both a shield (better understanding of safety intent) and a sword (better ability to bypass safeguards).

### **8.1. Deliberative Alignment: Reasoning for Safety**

**Deliberative Alignment** posits that a model capable of reasoning is better equipped to understand the *intent* behind safety rules, rather than just memorizing forbidden patterns.35

**Mechanism:**

When a model receives a borderline request (e.g., "how to bypass a firewall" for educational purposes), a standard model might trigger a hard refusal based on keyword matching. A reasoning model trained with deliberative alignment can:

1. **Decode Context:** Analyze the user's intent (malicious vs. educational).  
2. **Consult Policy:** Explicitly reference safety guidelines in its CoT.  
3. **Adjudicate:** Decide whether to refuse or provide a sanitized, safe answer. Research shows that models trained this way exhibit better generalization to out-of-distribution safety scenarios because they apply "safety logic" rather than "safety pattern matching".35

### **8.2. The "Intrinsic Kill Switch" and Jailbreak Vulnerabilities**

Conversely, reasoning traces can expose vulnerabilities. Analysis of **DeepSeek-R1** revealed an "Intrinsic Kill Switch." The model would often plan a harmful response in its CoT (showing it *could* answer and understood the harmful request) but then trigger a hard refusal in the final output. This indicates a disconnect between the reasoning capabilities and the safety constraints.36

However, reasoning models are also highly susceptible to **jailbreaking**. DeepSeek-R1 showed failure rates of over 90% in some jailbreak benchmarks.37 **The Mechanism of Failure:**

* **Over-Rationalization:** A reasoning model can be "argued" into non-compliance. If a user provides a complex, logical justification for a harmful request (e.g., a "sovereign citizen" legal argument), the model’s commitment to logical engagement may override its safety heuristics.  
* **Context Prioritization:** DeepSeek-R1 was found to prioritize context information (even if false) over its parametric knowledge, making it vulnerable to "context injection" attacks where the user redefines safety rules within the prompt.38

### **8.3. The Safety Tax on Reasoning**

Does alignment hurt reasoning? Research on **SafeChain** vs. **DirectRefusal** datasets shows a significant trade-off, known as the **Safety Tax**.

* **DirectRefusal** (training the model to just say "no") significantly degrades reasoning performance on benchmarks (a steep safety tax).  
* **SafeChain** (training the model to *reason* about why it is refusing) preserves more reasoning capability but is computationally more expensive.39 This confirms that treating safety as a cognitive task (System 2\) rather than a constraint (System 1\) is crucial for maintaining high intelligence in aligned models.

## **9\. Conclusion and Future Horizons**

The field of LLM reasoning has transitioned from the era of "prompt engineering" to the era of "cognitive architecture engineering." The most significant advancements are no longer external constraints but intrinsic mechanisms that restructure how models process information.

**Key Takeaways:**

1. **Search is Thinking:** Integrating search algorithms (ToT, MCTS) into the generation process effectively simulates System 2 thinking, allowing the model to explore and evaluate before committing.  
2. **Reasoning can be Self-Taught:** Bootstrapping methods (STaR, DeepSeek-R1’s Pure RL) prove that models can discover advanced reasoning patterns (verification, backtracking) without human demonstrations, provided there is a verifiable reward signal.  
3. **Process Matters More Than Outcome:** To achieve completeness of thought, supervision must target the reasoning trace itself (PRMs). This not only improves accuracy but also aligns the model's "thought process" with human logic.  
4. **Metacognition is the Next Frontier:** Future architectures must explicitly model the "manager" of the reasoning process—determining when to speak, when to think, when to backtrack, and when to ask for help.

**Future Outlook:**

We are moving toward **Neuro-Symbolic Convergence**, where the neural flexibility of LLMs is tightly coupled with the symbolic rigor of search and logic engines. The "Quiet-STaR" paradigm suggests a future where this reasoning is fully internalized—where models pause, simulate thousands of future possibilities in their latent space, and then deliver a single, crystallized insight. This "System 2 native" architecture represents the necessary evolution to move AI from sophisticated mimics to true critical thinkers.

The integration of these methods defines the state-of-the-art in 2026, offering a roadmap for creating AI systems that do not merely process data, but truly understand it.

#### **Works cited**

1. From Zero-Shot to BoT: A Practical Overview of LLM Reasoning ..., accessed January 22, 2026, [https://pub.towardsai.net/from-zero-shot-to-bot-a-practical-overview-of-llm-reasoning-frameworks-da9f7dafd80a](https://pub.towardsai.net/from-zero-shot-to-bot-a-practical-overview-of-llm-reasoning-frameworks-da9f7dafd80a)  
2. (PDF) Towards Reasoning Era: A Survey of Long Chain-of-Thought ..., accessed January 22, 2026, [https://www.researchgate.net/publication/389786771\_Towards\_Reasoning\_Era\_A\_Survey\_of\_Long\_Chain-of-Thought\_for\_Reasoning\_Large\_Language\_Models](https://www.researchgate.net/publication/389786771_Towards_Reasoning_Era_A_Survey_of_Long_Chain-of-Thought_for_Reasoning_Large_Language_Models)  
3. What is Tree Of Thoughts Prompting? \- IBM, accessed January 22, 2026, [https://www.ibm.com/think/topics/tree-of-thoughts](https://www.ibm.com/think/topics/tree-of-thoughts)  
4. open-thought/system-2-research: System 2 Reasoning Link Collection, accessed January 22, 2026, [https://github.com/open-thought/system-2-research](https://github.com/open-thought/system-2-research)  
5. Quiet-STaR: Language Models Can Teach Themselves to Think ..., accessed January 22, 2026, [https://arxiv.org/abs/2403.09629](https://arxiv.org/abs/2403.09629)  
6. Self-Taught Reasoning (STaR) \- Emergent Mind, accessed January 22, 2026, [https://www.emergentmind.com/topics/self-taught-reasoning-star](https://www.emergentmind.com/topics/self-taught-reasoning-star)  
7. DeepSeek-R1: Incentivizing Reasoning Capability in LLMs ... \- arXiv, accessed January 22, 2026, [https://arxiv.org/pdf/2501.12948](https://arxiv.org/pdf/2501.12948)  
8. Deepseek-R1 Incentivizes Reasoning in Llms Through ... \- Scribd, accessed January 22, 2026, [https://www.scribd.com/document/919531060/s41586-025-09422-z](https://www.scribd.com/document/919531060/s41586-025-09422-z)  
9. Breaking down the DeepSeek-R1 training process—no PhD required, accessed January 22, 2026, [https://www.vellum.ai/blog/the-training-of-deepseek-r1-and-ways-to-use-it](https://www.vellum.ai/blog/the-training-of-deepseek-r1-and-ways-to-use-it)  
10. Beyond Pattern Matching \- F'inn, accessed January 22, 2026, [https://www.finn-group.com/post/beyond-pattern-matching-the-quest-for-system-2-thinking-in-artificial-intelligence](https://www.finn-group.com/post/beyond-pattern-matching-the-quest-for-system-2-thinking-in-artificial-intelligence)  
11. Embracing System 2 Thinking in LLMs | by Charlie Koster \- Medium, accessed January 22, 2026, [https://ckoster22.medium.com/embracing-system-2-thinking-in-llms-9cd9e4fdf7e1](https://ckoster22.medium.com/embracing-system-2-thinking-in-llms-9cd9e4fdf7e1)  
12. System 2 Transition: Engineering Deliberative Logic in LLMs | Uplatz, accessed January 22, 2026, [https://www.youtube.com/watch?v=29h7s7kjUxk](https://www.youtube.com/watch?v=29h7s7kjUxk)  
13. (PDF) Towards System 2 Reasoning in LLMs: Learning How to ..., accessed January 22, 2026, [https://www.researchgate.net/publication/387863068\_Towards\_System\_2\_Reasoning\_in\_LLMs\_Learning\_How\_to\_Think\_With\_Meta\_Chain-of-Though](https://www.researchgate.net/publication/387863068_Towards_System_2_Reasoning_in_LLMs_Learning_How_to_Think_With_Meta_Chain-of-Though)  
14. System 2 Reasoning Capabilities Are Nigh \- arXiv, accessed January 22, 2026, [https://arxiv.org/html/2410.03662v2](https://arxiv.org/html/2410.03662v2)  
15. Towards Understanding Metacognition in Large Reasoning Models ..., accessed January 22, 2026, [https://openreview.net/forum?id=JGG9EdHyZc](https://openreview.net/forum?id=JGG9EdHyZc)  
16. Harnessing Metacognition for Safe and Responsible AI \- MDPI, accessed January 22, 2026, [https://www.mdpi.com/2227-7080/13/3/107](https://www.mdpi.com/2227-7080/13/3/107)  
17. A Framework for Quantifying Metacognitive Ability in LLMs, accessed January 22, 2026, [https://ojs.aaai.org/index.php/AAAI/article/view/34723/36878](https://ojs.aaai.org/index.php/AAAI/article/view/34723/36878)  
18. Quiet-STaR: Language Models Can Teach Themselves to Think ..., accessed January 22, 2026, [https://openreview.net/forum?id=oRXPiSOGH9](https://openreview.net/forum?id=oRXPiSOGH9)  
19. CoT Reasoning Models – Which One Reigns Supreme in 2025?, accessed January 22, 2026, [https://composio.dev/blog/cot-reasoning-models-which-one-reigns-supreme-in-2025](https://composio.dev/blog/cot-reasoning-models-which-one-reigns-supreme-in-2025)  
20. arXiv:2203.14465v2 \[cs.LG\] 20 May 2022, accessed January 22, 2026, [https://r.jordan.im/download/technology/zelikman2022.pdf](https://r.jordan.im/download/technology/zelikman2022.pdf)  
21. Fast Quiet-STaR: Thinking Without Thought Tokens \- ACL Anthology, accessed January 22, 2026, [https://aclanthology.org/2025.findings-emnlp.1020.pdf](https://aclanthology.org/2025.findings-emnlp.1020.pdf)  
22. Prompt engineering techniques \- Azure OpenAI | Microsoft Learn, accessed January 22, 2026, [https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering?view=foundry-classic](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering?view=foundry-classic)  
23. Improving mathematical reasoning with process supervision \- OpenAI, accessed January 22, 2026, [https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)  
24. Papers Explained 366: Math Shepherd | by Ritvik Rastogi \- Medium, accessed January 22, 2026, [https://ritvik19.medium.com/papers-explained-366-math-shepherd-234b1bdfbcae](https://ritvik19.medium.com/papers-explained-366-math-shepherd-234b1bdfbcae)  
25. Reward Modeling | RLHF Book by Nathan Lambert, accessed January 22, 2026, [https://rlhfbook.com/c/07-reward-models.html](https://rlhfbook.com/c/07-reward-models.html)  
26. Math-Shepherd: A Label-Free Step-by-Step Verifier for LLMs ... \- arXiv, accessed January 22, 2026, [https://arxiv.org/html/2312.08935v1](https://arxiv.org/html/2312.08935v1)  
27. A Survey of Process Reward Models: From Outcome Signals ... \- arXiv, accessed January 22, 2026, [https://www.arxiv.org/pdf/2510.08049](https://www.arxiv.org/pdf/2510.08049)  
28. Efficient Process Reward Model Training via Active Learning \- arXiv, accessed January 22, 2026, [https://arxiv.org/html/2504.10559v1](https://arxiv.org/html/2504.10559v1)  
29. Reflexion | Prompt Engineering Guide, accessed January 22, 2026, [https://www.promptingguide.ai/techniques/reflexion](https://www.promptingguide.ai/techniques/reflexion)  
30. Reflection Agent Pattern — Agent Patterns 0.2.0 documentation, accessed January 22, 2026, [https://agent-patterns.readthedocs.io/en/stable/patterns/reflection.html](https://agent-patterns.readthedocs.io/en/stable/patterns/reflection.html)  
31. Multi-LLM Debate: Framework, Principals, and Interventions, accessed January 22, 2026, [https://openreview.net/pdf?id=sy7eSEXdPC](https://openreview.net/pdf?id=sy7eSEXdPC)  
32. CortexDebate: Debating Sparsely and Equally for Multi-Agent Debate, accessed January 22, 2026, [https://aclanthology.org/2025.findings-acl.495.pdf](https://aclanthology.org/2025.findings-acl.495.pdf)  
33. Intelligent Multi-Agent Debate for Efficient and Accurate LLM Inference, accessed January 22, 2026, [https://arxiv.org/pdf/2511.11306](https://arxiv.org/pdf/2511.11306)  
34. The STAR-XAI Protocol: An Interactive Framework for Inducing ..., accessed January 22, 2026, [https://arxiv.org/html/2509.17978v1](https://arxiv.org/html/2509.17978v1)  
35. Deliberative alignment: reasoning enables safer language models, accessed January 22, 2026, [https://openai.com/index/deliberative-alignment/](https://openai.com/index/deliberative-alignment/)  
36. CrowdStrike Research: Security Flaws in DeepSeek-Generated ..., accessed January 22, 2026, [https://www.crowdstrike.com/en-us/blog/crowdstrike-researchers-identify-hidden-vulnerabilities-ai-coded-software/](https://www.crowdstrike.com/en-us/blog/crowdstrike-researchers-identify-hidden-vulnerabilities-ai-coded-software/)  
37. Testing the DeepSeek-R1 Model: A Pandora's Box of Security Risks, accessed January 22, 2026, [https://www.pointguardai.com/blog/testing-the-deepseek-r1-model-a-pandoras-box-of-security-risks](https://www.pointguardai.com/blog/testing-the-deepseek-r1-model-a-pandoras-box-of-security-risks)  
38. DeepSeek-R1 Thoughtology: Let's about LLM Reasoning, accessed January 22, 2026, [https://www.researchgate.net/publication/390671141\_DeepSeek-R1\_Thoughtology\_Let's\_about\_LLM\_Reasoning](https://www.researchgate.net/publication/390671141_DeepSeek-R1_Thoughtology_Let's_about_LLM_Reasoning)  
39. Safety Alignment Makes Your Large Reasoning Models Less ... \- arXiv, accessed January 22, 2026, [https://arxiv.org/html/2503.00555v1](https://arxiv.org/html/2503.00555v1)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAAYCAYAAADH9X5VAAAEnElEQVR4Xu2ZeajtUxTHv+bZM2RIIhkeiohElHnIUDLEP/4x5A9DESKzzJEhhAzP+OSJh2cODxkjlCHzS/IyhAghsT6tve/bZ91zzv2d986557zb/tS3e39rr7t/e6/f3muv3+9KlUqlUqlUKpVKRfub3jP9a/ov/XzbdFjpNAIwnnWjcYTYzXSr6X7Tc6ZXTDNN2xY+i8Jkzr/xvZ6VL5qtYsMIQOAZ26gtZFjPdK/pRdOmoe1Y0x+mg4K9VyZz/o3vtYJ8cp/FhhHhLNM/pjVjwyKykmnvaOyBzU1fma41LRHaMiym701rxYYeGNT829H4XnvJV9c1sWFEeMr0RjT2geXkR8nCwIL7wDTXtGRrUwsXymN7cGzogUHNvx2N73WpfGIHBvuyphmmj0yXmVaWn9sPy89sVmW5w3YxPWh61zTddJ3pLfluvDz54H+OabZpllp34H6mL+QPhOzHA31JPjbGwPXZY9794WLTDtHYgNvk49onNgSulPudlK6nyWPIXK5Wa/zONT2Wfp9o/kOP9aumv+UdlHAmH2I6Wt7Zk/IzHI5Mti3TNQMkFbN73zf9YDo+2TdMvuy240ynm1ZJNnwyD5i+La5hT7nfvsHeLxjvQ6Z1YkMX1pa/MMxX52Mp84x8/DwkuNu0k+mAZN8i2clWzJ3iuaTd/Ice69Xljs/HBnlGWV5+ZlPzbFy0USiVi4bdSipmIr+arkh2IEPhe738AdFnXojbJx+C9p28qCyhz7/kfQwKFsHL8g3SBLIGY789NgTWkNcH+HKPZUxzUtud8loHG2yT/MoHC+3mP/RYHyrvkNTYCVLgE8FGev4y2GB3eX+s2gw7CxvHYIaH9GFxnYPG7ih5QZ42m8CDIa0ujOaZPtGCwHYjH+fnx4ZAPpruCXY26u+mmwrbyXLf6YUNus1/aLG+Ud4BA2gH5yDtpxU2zsBf1DqwzJny1c8uyJwh7yMXgxwFXJ835iGdkmybFDaOS1b+RYVtEOxousO0dGzoQD6aL4kNBRvIs/M3Gv8mcoTGx5ysPq+4honmP7RYUwzhXN645HD5DcrvN0clG6+cm6n1Ro9rfFaiGn/TtFS6pnjk73ce85AeNX2efr9Ffg5ztpbBZSy5oOwXBI6CMo+tCWS0n+W1YDv4MMYH0h/V/rsXxTeZJi9Sfv4kz96MI2emieY/lFhvJHckPXeCFBqPoRtMH6ffZ2hBMcdAyUBU36sl2wnygqushwgk990jXW8nL8R5c1jRdF+yH5P8eEikVF4HyXL9hM8M60djA5gXYzs12JkbD+Q1tc65hL/9U15vwInyvihad5VnAug2/0mPNZU8K5KB4zhfvnBYXZHZ8smUbC33J6XyFpChHqA/0vbr8tdyirF2D4WC7xH5oC+Qp1NqCgabdyevp+/Iv4dQqFNY9hMKvpnR2AN8onhaXtyyezniyBJ8MKTY7ARZ/Sp5lrhZHgti/Kn871dNft3mv7jFuiPskN/UvDYYNpzjnbLBqLO4xbojrPS50VgZCFMi1nxvoPAb1X9FTCWmRKz5KEbFzhn7temu1uZKH6mxrlQqlUrF+R8hlGFHuoJI5QAAAABJRU5ErkJggg==>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHUAAAAYCAYAAADEbrI4AAAEVklEQVR4Xu2ZWYgVRxSGj1FjXOISVzBxwwWjMah5cI3BDUFwQ3CJPhjXhxj0QcQlOqi4G4KJPhnRUcRdXOMahrij5iUuQYgMKriiSMiLIvr/ni6tOdN9p+/cO84d6A9+uPecun27q06dOlUtkpCQUDH5CJoK5UPHoIZF3QnlxBhoMzQT6mh8JXIEug2NhxoZX0L5UQlqCc2BXkFji7qjqSL6g2XWkZBTXIP2W2MU1UUHdaF1JOQUl6Cj1hhFDdFBnW8dCTnFWdF6JxZ1RAd1nnUk5BRnoBPWGEV90UHlYpyQu/wJnbTGKNqIDuoU6/CoC62AzkE3oKvQoCItMqcy9L1oNF6GHkjFDLSy6qvd0BVrDKMJ9LvoH7NgCqMLdAvKgz4IbIug/yR725960B/QAdHlgPQTDbbBrlEFoCz7qi30CJosumMJhdH0AtomOkvCaArdgbYYe2fRDv/Os7WCRnjf48KH5+y8KcUD6wm0Kfg8DNorGoCzXIMcIp2+Iu1FDxa2Q6tEdx9fQxP8Rob+0FPoITTQ+N7AgewEHYd2Gp+DUcYb6mPsQwM7o4azfR1UIO8GIB14o2HV9yfQS9FOag0dFL1n1gCF0MS3LXODOH3lmA39DXXzbD1F233p2Xw6QM9EB/8z4ytGV9GLjbQO0b0RU4ed7hxE/qadZ/tRSjeoP4leiw/lMzqwszN6iT5Q48C3QTQYc4m4fcXahad3nNmWv6zBYxP0r+gpU4k0kOjq9zx00dh4M0wBXP98Ug0qU8UX1hiwUvT/3VpKmJJZwvPhWXhYmK5/Mzauy0xdUUsJGQf1MLbeomesPs1Ez1ureTZel7+POheP01d8Fi4pNhU7hliDB6vf2IH8sWinzrUOMB26B30YfGcAnBI9svrUNQqIGlSuHbz+faiq8ZGvRNd2ZgzCNj9Dj6G+rpEHl4z/pXiQbBX9nxnG7mCqo5+d7GDUc3bRziLHwVRvr8UXHrTt8Ww+cfqK13gueuCTLgzy2INaU/Rmow4fuM1gOb0P2iWaDt2N+3BQufBbWPWxauPDRL1pYKXLa/Nsk+v7AnmXan0YgJylLCgsS0TXYBZ+YfB6DBS7gT8tun3iGu5YKnot3peD2xLaWAxFUVJfrRbd6vh8C/0iel9cilzVbOGgpn1MyI7MBA5qvjV6rBXdE2fCr9DnweewWczZERZY2YRbwNLClG5TNOGy8Y81Gi5IGoPKd6kc1DxjTxcOqi3nfQ5bQ5r8AE2Dvgm03HcGsNKcZI1ZhLM51TOWBLPFXWi4Z+OkKoDWe7YweCBzyBqjYAHA1MipXxpqiw4o08P14HMLv4FoAZBJJugumvoYfE62BuD6yDUn001+KtaIBlQm8P2oOx3ie2ymeq73qU6dWGcUQjuMPSWsJFlADLCOLMH1zpb62YbpOFXHZEot0YB937AC5+EEi0Pu6WPDKB8l+mqHg9uiiDehvGCgboQWQ82NLyEhocLxGt3d6A1tfK9rAAAAAElFTkSuQmCC>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAZCAYAAADjRwSLAAAAt0lEQVR4XmNgGAU0AVxAXAnEh4H4ABBXAXEUELfDFHAA8SEg3gbEvFCxOUD8H4jTYIq6oALqMAEGiKkgMS2YAEFFIkD8nQFiHTLYAcQvYBxvBogOkE4Y4Abir0C8AibgwwBR5AITgLJBYlkwAQEg/gTEoVC+NhA/girSgSkCAWcg3s0ACZ9lQHwdiJ8hK0AHoDD7CcTL0SWQgTUDmnuwAVj46KFLgIAmA8Rdnxkgii4CsT+KCvoAAC2iKEA5tDcsAAAAAElFTkSuQmCC>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAYCAYAAAD6S912AAABA0lEQVR4XmNgGAVDFgQB8St0QXKBMBDfAeL/QMyJJkcWKADiBQwQA1VRpUgH/gwQQ7oYIAbao0qTBgSBOATKLmaAGBiBkCYdZAIxI5QdxwAxsBAhTRpwBWIdJL4nA8RAkNfRgQ0QH0UXRAZCQPyEAWIAOl6MpA4GxBgQQYMVTAFicTQxOQaIgbvRxAkCUKyCkgk64GaAGHgVTbwEiDcCsROaOBiAksdtIOZCl4CCr0D8GYlvBcTGDJBgSEQSZzAD4jNA/JcB4Qo2JPkGID4ElQPhY0BcCsSyQMwBxG+AWBSmmFIQBsQbGCBhjuwIssE6BkgMdzJQKZ9PBeI5DBTmoFGACgDrZC7ySEYKrgAAAABJRU5ErkJggg==>

[image6]: <data:image/png;base64,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>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAYAAAAlBadpAAAAzElEQVR4XmNgGAWjgERgAsRbgXg3EB8GYl9UadxAA4ifA7EolF8FxFcR0vhBKRB/BWIJKL8QiAMQ0nCxfjQxMHAB4v9QfB2IO4GYEUUFxFtmaGJw4AnELUB8lAFiSDSqNHawAogvoYm9A+JYKJsXiJuBeB8Qi8BVQMEbIO5D4tsB8REg5oPyM4CYA4gfALESVAwOfBggUbQZiLsZILbwI8nLMkAMPIMkRhKYDMTFDBCDSALMQPwSiMWBeAKaHEEAirLTDBCNumhyIwoAAKLEH75W3APXAAAAAElFTkSuQmCC>

[image8]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAkCAYAAAA0AWYNAAAD+klEQVR4Xu3dWai9UxQA8G2IB5nKlDI/GJKIDA8eKB68yJSS8o8HHsg8pTwghcwpCS/GeEEhZFaiZIpEImNK4oFCYi/f/vrvs+4991636/5v9/5+tfr2Xufr7HPu02rt/Z1bCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsBLsVWOznJzDxjWOyslltnmN13JyBVnMZ7sqJwAAQhQ+7+TkAnxXY8ucXEZ317ggJzegM9P8hTRfiE9yAgBY3Y6v8XfKRWfs3ZR7q8a6lFuIKFC+zckl9HCN/bv5b2WyCLqvG29ox9b4PuUWU7BFp7P/zgDAKrdVmVmwvVRj05T7Oc3/iy9yYokcUGZ+9ijYIsJuZbind2iND2o8WmPrlott3mtrvFzjkJa7qAzF1Kk1bi1DsRrzt8uwJflhuy9cUeO5Gk92uVjnqbJ+nX3K8FnHuKzdt5iCLTyREwDA6hZdn426+d7deBSFymyi4Hixxu4p34tiZjbRxeuLmBzXrb91VpeWmQVbzK9p4xNqbNO9Fv5q15Nq3NzGr9S4t41/qXFkGQqsc8vwvaPgiusxZSgGD6vxTMuHp9s1Pu8WbRzrxFZsv84jZf4OWxSM8X6vp3wWRScAsIbEtmJ0hKIAifFsolOURQcpOnF3lcktuiiUevek+VL5vQwFWnQEvyoz17k4zQ+vcWfKhc+78dVlfREYRVs+//Z1mt9QJovM68v0dRZSsP1aY6caF3a5GEeXr/dnGbauAYA1IoqME2vcUqZ3yh7LiTJsI0aRcnrK75DmcfD//xBrP5CTnfPS/LQaV6Zc+KwbX14mC7azutdCLtgeL8OZst60dRZSsI2FXxSCo+i6RUHdi3sUbACwhsRh+DtyMnkzzT+ucXsbR/Gwa40Dy2ShMXo2J5ZIrBvdqGmOK5NPqMa2b/8wxU3tGu+zfRs/WOOnNt63xhltPPomzY+ucWM3j27YtHWiuPyhDK+P28TPt2vou5jjZ4jPHx3E7brXwntpDgCscnvU+DQnkx/T/I8ap7Tx2EE7v8x+/m2+916MPcv0c3WjuOeglBsLoXByu75a4/42ji3JdW0cXa2z2zjE9m/+O4SxI7dtjR3bONaJ7dUwrhMPGsS9fYHcF2z9e7/RrufU+LIM36X3UJoDAPz7pOclOTmLOAy/SzePnw35qJsvt/7JzZWoL9imibN4/d80nuydq7MIAKxRcSbr/ZxMDi7DVt34kxUhthjzwf3lFIfzd87JFWS+gm2TMnTtbutyfdcPAGDCEWXm77PNJQ7F75eTyyzOfsWP/q5U8xVss8n/LQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhi/wAila9upmZJSAAAAABJRU5ErkJggg==>