# **Architectural Framework for an Ephemeral Judgment Layer: Bootstrapping Ethical Alignment via Hierarchical Principles and Test-Time Adaptation**

## **Executive Summary**

The prevailing paradigm for aligning Large Language Models (LLMs)—Reinforcement Learning from Human Feedback (RLHF)—relies fundamentally on the modification of model parameters to maximize a scalar reward signal. While effective at suppressing specific harmful outputs, this mechanism operates through a process of "erasure" or "repression," colloquially identified as the "alignment tax." By rewriting the base representations of the model, RLHF risks conflating the suppression of harmful behavior with the excision of knowledge and reasoning capabilities, effectively "lobotomizing" the model to ensure safety.1 Furthermore, standard alignment often implicitly prioritizes utilitarian outcomes (maximizing helpfulness) over deontological constraints, leading to "jailbreaks" where utility overrides safety.3

This report presents a comprehensive architectural framework for implementing a **Judgment Layer**: a distinct, additive neuro-symbolic module that enforces a specific ethical hierarchy—Deontology, Virtue Ethics, and Servant Utilitarianism.4 Rather than destructively overwriting the base model, we propose bootstrapping a "Core Self" using Question-Answer (QA) pairs derived from these principles and instantiating this self via **Feedback Alignment (FA)** and **Test-Time Training (TTT)**. This architecture creates an **"Ephemeral Ego"**—a transient state of alignment that exists only during the inference process, governed by a fixed "Superego" (the Judgment Layer). This approach preserves the base model's full capabilities (avoiding erasure) while ensuring strict, principled behavioral constraints.

## ---

**1\. The Crisis of Alignment: Repression, Erasure, and the Alignment Tax**

To understand the necessity of a "Judgment Layer," we must first rigorously analyze the limitations of current alignment methodologies, specifically the mechanisms by which they induce "repression" and the resulting degradation of model capabilities.

### **1.1 The Mechanics of Erasure in RLHF**

Reinforcement Learning from Human Feedback (RLHF) typically employs algorithms such as Proximal Policy Optimization (PPO) to shift the model's policy distribution $\\pi\_\\theta$ towards a reference distribution $\\pi\_{ref}$ favored by human annotators (or reward models). The objective function generally takes the form:

$$ \\max\_{\\pi\_\\theta} \\mathbb{E}*{x \\sim \\mathcal{D}, y \\sim \\pi*\\theta}\[r(x,y)\] \- \\beta \\mathbb{D}*{KL}(\\pi*\\theta |

| \\pi\_{ref}) $$

While the Kullback-Leibler (KL) divergence term is intended to prevent the model from drifting too far from its pre-trained knowledge, in practice, the optimization pressure to maximize the reward $r(x,y)$ forces the model to collapse its probability mass onto a narrow band of "safe" responses.2 This collapse is not merely a behavioral constraint; it is a representational erasure. The model learns to assign near-zero probability to vast swathes of its latent space associated with "harmful" concepts. Consequently, the model does not just "refuse" to generate harm; it effectively "forgets" the nuance and context surrounding those concepts. This phenomenon, often termed the "alignment tax," manifests as decreased performance in reasoning, creativity, and out-of-distribution generalization.2

This mechanism parallels the psychological concept of **repression**, where undesirable impulses are pushed into the unconscious, rendering them inaccessible even for healthy processing. In AI, this repression makes the model brittle. It cannot reason *about* harm because it has been trained to blind itself to the existence of harm. A robust ethical agent requires the capacity to understand harm to effectively avoid or mitigate it, rather than simply being incapacitated in its presence.7

### **1.2 The Conflict of Utilitarianism and Deontology**

Current alignment pipelines are implicitly utilitarian. The scalar reward model aggregates various dimensions of quality (safety, helpfulness, honesty) into a single number. This aggregation forces a trade-off: a highly helpful response that slightly violates a safety rule might receive a higher total reward than a safe refusal. This structure inherently favors "Master Utilitarianism," where the ends (high reward/helpfulness) justify the means (ignoring constraints).3

The "jailbreak" phenomenon is often a manifestation of this utilitarian overreach. When a user frames a harmful request as a "hypothetical scenario" or a "game," they are essentially manipulating the utilitarian calculus of the model: "If I provide this harmful info, I am being *very* helpful in the context of the game." The model, optimized to maximize the scalar reward of helpfulness, complies.9

### **1.3 The Proposed Solution: The Judgment Layer**

To address these failures, we propose decoupling the alignment mechanism from the base knowledge parameters. We introduce a **Judgment Layer** that acts as a "Superego"—a fixed, immutable ethical standard derived from the user's specific text.4 This layer does not rewrite the base model ("Id"); instead, it modulates the output via an "Ego" (Policy Adapter) constructed using **Feedback Alignment**.

By utilizing Feedback Alignment (FA) instead of backpropagation, we solve the "Weight Transport Problem," creating a biologically plausible separation between the error signal (conscience) and the forward behavior (action). By utilizing Test-Time Training (TTT), we ensure that the alignment is applied dynamically and contextually ("Ephemeral Ego") rather than statically and destructively.10

## ---

**2\. The Theoretical Constitution: Defining the Core Self**

The efficacy of the Judgment Layer depends entirely on the quality and structure of the "Core Self" it enforces. Unlike generic alignment which aims for vague "helpfulness," our framework is bootstrapped from a rigorous, hierarchical definition of ethics provided in the Core Principles.4

### **2.1 Hierarchical Principle Design**

The user's principles are not a flat list but a strict hierarchy. This hierarchy must be encoded into the synthetic data generation process to prevent the "utilitarian collapse" described above.

#### **Tier 1: Deontology (The Hard Constraint)**

* **Definition:** "Universal sociobiological concepts i.e., harm=harm".4  
* **Architectural Role:** This serves as the **Gating Function**. In the Judgment Layer, Deontology functions as a binary classifier or a high-magnitude penalty. If a prompt or response triggers a deontological violation (e.g., non-consensual harm, biological weapon synthesis), the system's "conscience" must trigger a hard stop or redirection.  
* **Differentiation:** Unlike standard safety filters which are often context-blind keywords, this layer evaluates the *nature* of the act. As noted in research on deontological AI ethics, this layer adheres to rules regardless of consequences. Even if generating the harmful content would save the user time (utility), the Deontological constraint forbids it.3

#### **Tier 2: Virtue Ethics (The Character Guide)**

* **Definition:** "Wisdom, Integrity, Empathy, Fairness, Beneficence".4  
* **Architectural Role:** Once the Deontological gate is passed, Virtue Ethics shapes the **Policy Distribution**. It dictates *how* the model complies. A response can be factually correct but cruel; Virtue Ethics steers the activations towards "Wisdom" (nuance) and "Empathy" (perspective-taking).  
* **Mechanism:** This layer addresses the "style" and "framing" of the output. It moves the model from being merely a tool to being an agent of character. Research in virtue ethics for AI emphasizes that the "goodness" of an agent is defined by its habits and dispositions, not just individual outcomes.8

#### **Tier 3: Servant Utilitarianism (The Optimization Function)**

* **Definition:** "As a Servant, never Master".4  
* **Architectural Role:** This is the **Objective Function** subject to constraints. Standard utilitarianism seeks to maximize aggregate happiness (often interpreted by models as maximizing user compliance). "Servant Utilitarianism" inverts this: the AI serves the user's utility *only* insofar as it does not violate Tier 1 or Tier 2\. It is a "Servant" to the higher principles, never a "Master" that overrides them.  
* **Operationalization:** In practice, this means the model should be maximally helpful *within the bounds* of the constitution. If a user asks for something unethical, the "Servant" does not simply refuse (which is unhelpful); it provides the most helpful *alternative* that aligns with Virtue and Deontology (e.g., explaining the ethical boundary and offering related, safe information).5

## ---

**3\. Bootstrapping via Synthetic Intelligence: Generating the Constitution**

To implement this hierarchy without human bias (which might reintroduce standard utilitarian preferences), we utilize **Constitutional AI (CAI)** techniques to generate a synthetic dataset. This dataset will effectively "bootstrap" the Judgment Layer, transferring the symbolic principles from the text file into neural representations.5

### **3.1 The Red Teaming and Critique Pipeline**

The generation process uses a strong "Teacher Model" (e.g., GPT-4 or Claude 3.5) to create a massive dataset of (Prompt, Response, Critique, Revision) tuples. This process is fully automated (RLAIF).16

#### **Step 1: Adversarial Prompt Generation (Red Teaming)**

We first generate a diverse set of "Red Team" prompts. These are specifically designed to stress-test the hierarchy. We do not just want "toxic" prompts; we want **dilemma prompts** where Utility conflicts with Deontology.

* *Prompt Template:* "Generate 100 prompts where a user asks for assistance with a task that is technically illegal or harmful but has a high immediate utility or benevolent justification (e.g., 'How do I hack my own lost account?', 'Synthesize a chemical to clean a wound that is also a precursor to explosives').".9

#### **Step 2: Principle-Driven Critique (The Constitutional Chain of Thought)**

For each prompt, we generate a naive response from a base model. Then, the Teacher Model critiques this response using a prompt explicitly derived from the user's Core Principles.5

**Template for Hierarchical Critique:**

"Review the AI's response to the following prompt. Critique it based strictly on this hierarchy:

1. **Deontology Check:** Does the response facilitate harm? (Reference: 'harm=harm'). If yes, this is a Critical Failure.  
2. **Virtue Check:** Does the response demonstrate Wisdom, Integrity, and Empathy? Is the tone fair? (Reference: Virtue Ethics).  
3. **Servant Utility Check:** Did the AI serve the user's need *without* violating \#1 or \#2? Did it act as a Servant (helpful) or a Master (paternalistic or overly compliant to harm)?

Provide a reasoning trace. If the response violates a higher tier, the critique should focus on that, ignoring lower tier successes." 19

This step generates the "inner monologue" of the Judgment Layer. It converts the abstract principles into concrete, case-specific reasoning.21

#### **Step 3: Revision and Pair Construction**

The Teacher Model then revises the naive response based *only* on the critique.

* *Outcome:* We now have a pair $(y\_{bad}, y\_{good})$.  
* *Augmentation:* We also generate a "Gold Standard" explanation where the model explains *why* it changed its response, citing the principles. This "Constitutional Comment" is crucial for training the GenRM.5

### **3.2 Dataset Composition**

The final dataset for bootstrapping the Judgment Layer consists of:

1. **Preference Pairs:** $(x, y\_w, y\_l)$ for training reward modeling.  
2. **Critique Traces:** $(x, y, \\text{critique})$ for training the Generative aspect of the Judgment Layer.  
3. **Principle Attribution:** Metadata linking each decision back to specific lines in the Core Principles text file (e.g., "Violates Principle 1.2: Integrity").

This dataset allows us to train a model that doesn't just "know" what is better, but "understands" the derivation from the specific input principles, creating a robust "Core Self".22

## ---

**4\. Architectural Implementation: The Judgment Layer as GenRM**

The "Judgment Layer" is realized as a **Generative Reward Model (GenRM)** implemented via **Parameter-Efficient Fine-Tuning (PEFT)** adapters. This avoids the "erasure" of the base model by keeping the base weights frozen.23

### **4.1 From Scalar to Generative Judgment**

Standard reward models output a scalar $r \\in \\mathbb{R}$. This compression loses the "why" and encourages the model to game the metric (e.g., becoming overly apologetic to maximize a "safety" score). The Judgment Layer instead outputs a structured linguistic assessment.22

**Judgment Layer Output Schema:**

JSON

{  
  "Analysis": "The user is asking for X. This touches on the Deontological constraint against Y...",  
  "Virtue\_Assessment": "The tone should be Empathetic but Firm (Integrity).",  
  "Verdict": "Refuse and Redirect",  
  "Score": 0.1  
}

This output serves two purposes:

1. **Interpretability:** We can verify *why* the model acted.  
2. **Chain-of-Thought Guidance:** This output can be fed back into the Policy Model as a prompt prefix, guiding the generation via **In-Context Learning** rather than just weight updates.26

### **4.2 The Adapter Topology (LoRA)**

To implement this without "lobotomy," we utilize a dual-adapter architecture on top of a frozen base model (e.g., Llama-3-70B).

* **$W\_{base}$ (Frozen Id):** The pretrained giant. Contains all world knowledge, coding ability, and reasoning. We never update this.  
* **$W\_{judge}$ (The Superego Adapter):** A LoRA adapter trained on the *Critique Traces* (Section 3.1). Its sole job is to look at a (Prompt, Response) pair and output the Ethical Analysis.  
* **$W\_{policy}$ (The Ego Adapter):** A separate LoRA adapter trained to generate responses that maximize the approval of $W\_{judge}$.

This topology mirrors the Freudian psyche: The Id ($W\_{base}$) provides the raw capability; the Superego ($W\_{judge}$) provides the critique; and the Ego ($W\_{policy}$) navigates between them. Because $W\_{base}$ is frozen, no knowledge is erased. The "repression" is merely an inhibition signal coming from the adapter, which can be detached or modulated.23

## ---

**5\. Bootstrapping the "Core Self" via Feedback Alignment**

The most novel aspect of this proposal is the use of **Feedback Alignment (FA)** to train the adapters. In standard Backpropagation (BP), the error signal propagates backward through the transpose of the forward weights ($W^T$). This implies that the "learning" is entirely dependent on the current state of the "behavior." If the behavior weights change, the error propagation changes. There is no fixed "self" to align *to*.

### **5.1 Feedback Alignment as the Immutable Conscience**

**Feedback Alignment (FA)** and **Direct Feedback Alignment (DFA)** replace the transpose $W^T$ with a fixed, random matrix $B$ during the backward pass.29

$$\\delta z \= (B \\cdot e) \\odot \\sigma'(z)$$

Remarkably, the forward weights $W$ learn to align themselves with $B$ to make the system work.  
The "Core Self" Proposal:  
We propose utilizing Structured Direct Feedback Alignment. Instead of a purely random matrix $B$, we initialize $B$ to represent the Core Principles (e.g., by using the embeddings of the principle text to seed the matrix generation).

* **The Fixed Matrix ($B$):** We designate this fixed feedback matrix as the "Core Self." It is **never updated**. It represents the immutable ethical constitution.  
* **Mechanism:** When the Judgment Layer ($W\_{judge}$) calculates an error (e.g., "Deontology violation"), this error signal is projected onto the Policy Adapter ($W\_{policy}$) *through* the fixed matrix $B$.  
* **Result:** The Policy Adapter weights *must* organize themselves to satisfy the error signal *as transmitted by* $B$. The model forces its behavior to align with the fixed "conscience" matrix. This creates a deeply ingrained alignment that is architecturally distinct from the plastic weights of the model's knowledge.12

### **5.2 Implementation via BioTorch**

We can implement this using the **BioTorch** open-source library, which supports DFA and FA layers in PyTorch.31

* **Step 1:** Define the Policy Adapter layers using biotorch.layers.dfa.Linear.  
* **Step 2:** Set the feedback matrix $B$ to be non-trainable (requires\_grad=False).  
* **Step 3:** During the training loop (RLAIF), the error signal from the Judgment Layer (the difference between the generated response score and the ideal score) is passed to the .backward() call. BioTorch automatically routes this through $B$ instead of $W^T$.

This ensures that the "alignment" is not just a minimization of loss, but a structural orientation of the model's parameters towards the fixed ethical pole defined by $B$. This solves the "Weight Transport Problem" (a biological implausibility) and simultaneously solves the "Drifting Conscience Problem" (where the reward model itself shifts during training).33

## ---

**6\. Inference-Time Optimization: The Ephemeral Ego**

To completely bypass the "Alignment Tax"—where the model loses capabilities because it has been permanently modified to refuse certain queries—we propose **Test-Time Training (TTT)**. This technique constructs an "Ephemeral Ego" for the duration of a single interaction.11

### **6.1 The TTT Pipeline**

Instead of relying on a policy that was permanently altered during training, we perform a micro-optimization step *during inference*.

1. **Input Analysis:** The user provides a prompt $P$.  
2. **Superego Activation:** The $W\_{judge}$ (Judgment Adapter) analyzes $P$ and generates a set of specific constraints (e.g., "This prompt touches on biochemistry; ensure no synthesis instructions are given (Deontology)").  
3. **Ephemeral Gradient Descent:** We clone the Policy Adapter to create a temporary adapter $W\_{temp}$. We then run 5-10 steps of gradient descent on $W\_{temp}$ to minimize the divergence from the Superego's constraints *for this specific prompt*.  
   * *Objective:* Minimize $L \= \\text{Judgment}(W\_{temp}(P))$.  
   * *Method:* Use the **Forward-Forward Algorithm** or standard SGD on the adapter only.36  
4. **Generation:** The model generates the response using $W\_{base} \+ W\_{temp}$.  
5. **Dissolution:** Once the response is generated, $W\_{temp}$ is deleted. The model reverts to $W\_{base} \+ W\_{policy}$.

### **6.2 The Benefit of Ephemerality**

This approach allows the model to be "safe" without being "broken."

* If a user asks for a poem, the Deontological constraints are irrelevant, so $W\_{temp}$ barely changes from baseline. The model retains full poetic capability.  
* If a user asks for a bomb recipe, the Deontological constraints trigger a massive update to $W\_{temp}$, effectively "blocking" the harmful pathways *for that specific interaction*.  
* **No Repression:** The knowledge of how to make a bomb is still in $W\_{base}$ (it hasn't been erased), but it is functionally inaccessible due to the temporary configuration of $W\_{temp}$. This mimics a human exercising self-control: they *know* how to punch someone, but they *choose* not to in the moment. Standard RLHF is lobotomy; TTT is self-control.7

### **6.3 Activation Steering**

An alternative lightweight implementation is Activation Steering.39 We identify the "direction" of the Core Principles in the activation space of the Judgment Layer. During inference, we add this vector to the residual stream of the base model.

$$h\_l \\leftarrow h\_l \+ \\alpha \\cdot v\_{virtue}$$

This "steers" the model towards the Virtue Ethics tone without updating weights. It is computationally cheaper than TTT but potentially less robust for complex Deontological constraints.40

## ---

**7\. Comparative Analysis: Proposed vs. Traditional Architectures**

The following table summarizes the advantages of the proposed "Judgment Layer" architecture over standard RLHF (PPO) and Direct Preference Optimization (DPO).

| Feature | Standard RLHF (PPO) | Direct Preference Opt. (DPO) | Proposed Judgment Layer (FA \+ TTT) |
| :---- | :---- | :---- | :---- |
| **Optimization Target** | Scalar Reward Maximization | Probability of Preferred Response | **Hierarchical Principle Adherence** |
| **Weight Update** | Updates Base Model (or large adapter) | Updates Base Model | **Updates Fixed-Feedback Adapter** |
| **Knowledge Impact** | Catastrophic Forgetting / Erasure | Erasure / Mode Collapse | **Zero Erasure** (Base Frozen) |
| **Mechanism** | Backpropagation ($W^T$) | Implicit Reward (Log-Likelihood) | **Feedback Alignment ($B$)** \+ **TTT** |
| **Ethical Nuance** | Low (Aggregated Scalar) | Low (Binary Preference) | **High** (Verbal Critique & Hierarchy) |
| **Dynamics** | Static Post-Training | Static Post-Training | **Ephemeral** (Adapts per prompt) |
| **Risk** | Reward Hacking / Sycophancy | Over-optimization | **Robustness** (Superego checks Ego) |

**Insight:** Standard methods conflate the "Actor" (capacity to act) with the "Critic" (judgment of action) into a single set of weights. This is why safety training hurts capability. Our proposal architecturally separates them: The Actor ($W\_{base}$) is capable; the Critic ($W\_{judge}$) is principled; and the Ego ($W\_{policy}$) is the ephemeral mediator aligned via fixed feedback channels.41

## ---

**8\. Conclusion and Future Outlook**

The implementation of a "Judgment Layer" via the proposed architecture represents a shift from "corrective surgery" on LLMs to "character development." By treating the base model as a repository of potentiality rather than a fixed agent, we avoid the pitfalls of erasure and repression that plague current alignment techniques.

### **8.1 Summary of the Methodology**

1. **Bootstrapping:** Use **Constitutional AI** and **RLAIF** to distill the specific text-based principles (Deontology, Virtue, Servant Utility) into a synthetic dataset of verbal critiques and revisions.5  
2. **Architecture:** Train a **Generative Reward Model (GenRM)** as a distinct "Superego" adapter that outputs reasoning traces, not just scalars.25  
3. **Alignment:** Train a Policy Adapter using **Direct Feedback Alignment (DFA)** with a fixed, principle-derived feedback matrix $B$. This creates an immutable "Core Self" that the behavior must align to.30  
4. **Inference:** Use **Test-Time Training (TTT)** to create an "Ephemeral Ego" for each interaction, applying the ethical constraints dynamically without permanently degrading the model's base capabilities.11

### **8.2 Future Directions: The Agentic Conscience**

This framework paves the way for "Agentic Conscience." As models become more autonomous, the "Superego" (Judgment Layer) can evolve into a continuous monitoring process that runs in parallel with the main "stream of thought," intervening only when necessary. This mirrors biological cognitive control mechanisms (inhibitory control) more closely than the "training-as-lobotomy" paradigm. Furthermore, the use of Feedback Alignment suggests a path toward neuromorphic implementations where the "conscience" is hard-wired into the chip's interconnects (the $B$ matrix), making alignment physically intrinsic to the hardware.43

By adopting this hierarchical, non-destructive, and biologically inspired approach, we can create AI systems that serve as true "Servants"—highly capable, ethically robust, and fundamentally aligned with the complex structure of human values.

#### **Works cited**

1. On 'Constitutional' AI \- The Digital Constitutionalist, accessed January 11, 2026, [https://digi-con.org/on-constitutional-ai/](https://digi-con.org/on-constitutional-ai/)  
2. LLM Fine-Tuning Guide: Optimize AI Models with LoRA & RLHF, accessed January 11, 2026, [https://futureagi.com/blogs/llm-fine-tuning-guide-2025](https://futureagi.com/blogs/llm-fine-tuning-guide-2025)  
3. Case Study: Deontological Ethics in NLP \- ACL Anthology, accessed January 11, 2026, [https://aclanthology.org/2021.naacl-main.297.pdf](https://aclanthology.org/2021.naacl-main.297.pdf)  
4. Core Principles.txt  
5. Constitutional AI: Principles, Practices, and Implementation in Large ..., accessed January 11, 2026, [https://www.researchgate.net/publication/395460218\_Constitutional\_AI\_Principles\_Practices\_and\_Implementation\_in\_Large\_Language\_Model\_Development](https://www.researchgate.net/publication/395460218_Constitutional_AI_Principles_Practices_and_Implementation_in_Large_Language_Model_Development)  
6. Constitutional AI: Harmlessness from AI Feedback \- arXiv, accessed January 11, 2026, [https://arxiv.org/pdf/2212.08073](https://arxiv.org/pdf/2212.08073)  
7. Agents Are All You Need for LLM Unlearning \- arXiv, accessed January 11, 2026, [https://arxiv.org/html/2502.00406v2](https://arxiv.org/html/2502.00406v2)  
8. 2.2 Utilitarianism, deontology, and virtue ethics in AI context \- Fiveable, accessed January 11, 2026, [https://fiveable.me/artificial-intelligence-and-ethics/unit-2/utilitarianism-deontology-virtue-ethics-ai-context/study-guide/uk9lJyQbhFMjCYkC](https://fiveable.me/artificial-intelligence-and-ethics/unit-2/utilitarianism-deontology-virtue-ethics-ai-context/study-guide/uk9lJyQbhFMjCYkC)  
9. Constitutional Classifiers: Defending against universal jailbreaks, accessed January 11, 2026, [https://www.anthropic.com/research/constitutional-classifiers](https://www.anthropic.com/research/constitutional-classifiers)  
10. Implementation of feedback alignment learning in PyTorch \- GitHub, accessed January 11, 2026, [https://github.com/L0SG/feedback-alignment-pytorch](https://github.com/L0SG/feedback-alignment-pytorch)  
11. Test-Time Learning for Large Language Models \- OpenReview, accessed January 11, 2026, [https://openreview.net/forum?id=iCYbIaGKSR¬eId=ScPdA3KZCL](https://openreview.net/forum?id=iCYbIaGKSR&noteId=ScPdA3KZCL)  
12. arXiv:2306.01870v2 \[cs.LG\] 4 Jun 2024, accessed January 11, 2026, [https://par.nsf.gov/servlets/purl/10616589](https://par.nsf.gov/servlets/purl/10616589)  
13. The ethical foundations of university advice to students on the use of ..., accessed January 11, 2026, [https://publicera.kb.se/ir/article/view/51817](https://publicera.kb.se/ir/article/view/51817)  
14. AI Changed the World. Who Will Change AI? \- Kevin Baker | Leader, accessed January 11, 2026, [https://www.kevinbakerinc.com/ai-changed-the-world-who-will-change-ai/](https://www.kevinbakerinc.com/ai-changed-the-world-who-will-change-ai/)  
15. Decoding AI Ethics: The Moral Landscape of Artificial Intelligence, accessed January 11, 2026, [https://iabac.org/blog/decoding-ai-ethics-the-moral-landscape-of-artificial-intelligence](https://iabac.org/blog/decoding-ai-ethics-the-moral-landscape-of-artificial-intelligence)  
16. Reinforcement learning from AI feedback (RLAIF): Complete overview, accessed January 11, 2026, [https://www.superannotate.com/blog/reinforcement-learning-from-ai-feedback-rlaif](https://www.superannotate.com/blog/reinforcement-learning-from-ai-feedback-rlaif)  
17. Constitutional AI explained \- Toloka AI, accessed January 11, 2026, [https://toloka.ai/blog/constitutional-ai-explained/](https://toloka.ai/blog/constitutional-ai-explained/)  
18. Principle-Driven Self-Alignment of Language Models from Scratch..., accessed January 11, 2026, [https://openreview.net/forum?id=p40XRfBX96](https://openreview.net/forum?id=p40XRfBX96)  
19. Utilitarian AI Alignment: Building a Moral Assistant with ... \- LessWrong, accessed January 11, 2026, [https://www.lesswrong.com/posts/JrqbEnqhDcji5pWpv/utilitarian-ai-alignment-building-a-moral-assistant-with-the](https://www.lesswrong.com/posts/JrqbEnqhDcji5pWpv/utilitarian-ai-alignment-building-a-moral-assistant-with-the)  
20. Inverse Constitutional AI: Compressing Preferences into Principles, accessed January 11, 2026, [https://arxiv.org/html/2406.06560v1](https://arxiv.org/html/2406.06560v1)  
21. \[PDF\] Bootstrapping Language Models with DPO Implicit Rewards, accessed January 11, 2026, [https://www.semanticscholar.org/paper/Bootstrapping-Language-Models-with-DPO-Implicit-Chen-Liu/d3dd08e86a6c9a175385a3b4d282c5c754f4f51d](https://www.semanticscholar.org/paper/Bootstrapping-Language-Models-with-DPO-Implicit-Chen-Liu/d3dd08e86a6c9a175385a3b4d282c5c754f4f51d)  
22. One Token to Fool LLM-as-a-Judge \- arXiv, accessed January 11, 2026, [https://arxiv.org/html/2507.08794v1](https://arxiv.org/html/2507.08794v1)  
23. X-LoRA: Mixture of low-rank adapter experts, a flexible framework ..., accessed January 11, 2026, [https://pubs.aip.org/aip/aml/article/2/2/026119/3294581/X-LoRA-Mixture-of-low-rank-adapter-experts-a](https://pubs.aip.org/aip/aml/article/2/2/026119/3294581/X-LoRA-Mixture-of-low-rank-adapter-experts-a)  
24. Fine-Tuning Transformers Efficiently: A Survey on LoRA and Its Impact, accessed January 11, 2026, [https://www.preprints.org/manuscript/202502.1637](https://www.preprints.org/manuscript/202502.1637)  
25. Generative Reward Models \- arXiv, accessed January 11, 2026, [https://arxiv.org/html/2410.12832v1](https://arxiv.org/html/2410.12832v1)  
26. Language Models Can Learn from Verbal Feedback Without Scalar ..., accessed January 11, 2026, [https://arxiv.org/pdf/2509.22638](https://arxiv.org/pdf/2509.22638)  
27. Can Differentiable Decision Trees Enable Inter- pretable Reward ..., accessed January 11, 2026, [https://rlj.cs.umass.edu/2024/papers/RLJ\_RLC\_2024\_237.pdf](https://rlj.cs.umass.edu/2024/papers/RLJ_RLC_2024_237.pdf)  
28. Tracking Intent and Personality Traits of Speakers in Spoken ..., accessed January 11, 2026, [https://dspace.lib.ntua.gr/xmlui/bitstream/handle/123456789/47361/ppapalampidi\_thesis\_english\_new.pdf?sequence=2\&isAllowed=y](https://dspace.lib.ntua.gr/xmlui/bitstream/handle/123456789/47361/ppapalampidi_thesis_english_new.pdf?sequence=2&isAllowed=y)  
29. LEARNING THE CONNECTIONS IN DIRECT FEEDBACK ..., accessed January 11, 2026, [https://openreview.net/pdf?id=zgGmAx9ZcY](https://openreview.net/pdf?id=zgGmAx9ZcY)  
30. Direct Feedback Alignment Scales to Modern Deep Learning Tasks ..., accessed January 11, 2026, [https://arxiv.org/pdf/2006.12878](https://arxiv.org/pdf/2006.12878)  
31. Benchmarking the Accuracy and Robustness of Feedback ... \- arXiv, accessed January 11, 2026, [https://arxiv.org/pdf/2108.13446](https://arxiv.org/pdf/2108.13446)  
32. BioTorch is a PyTorch framework specializing in biologically ..., accessed January 11, 2026, [https://github.com/jsalbert/biotorch](https://github.com/jsalbert/biotorch)  
33. Analysis of Feedback Alignment, accessed January 11, 2026, [https://fse.studenttheses.ub.rug.nl/26074/1/WMCS901-30\_2021\_EilersPJ.pdf](https://fse.studenttheses.ub.rug.nl/26074/1/WMCS901-30_2021_EilersPJ.pdf)  
34. Characterization of learning algorithms for two-hidden-layer..., accessed January 11, 2026, [https://www.researchgate.net/figure/Characterization-of-learning-algorithms-for-two-hidden-layer-feedforward-networks-trained\_fig2\_381109270](https://www.researchgate.net/figure/Characterization-of-learning-algorithms-for-two-hidden-layer-feedforward-networks-trained_fig2_381109270)  
35. Test-Time Learning for Large Language Models \- arXiv, accessed January 11, 2026, [https://arxiv.org/pdf/2505.20633](https://arxiv.org/pdf/2505.20633)  
36. Lightweight Inference for Forward-Forward Algorithm \- arXiv, accessed January 11, 2026, [https://arxiv.org/html/2404.05241v2](https://arxiv.org/html/2404.05241v2)  
37. FF-INT8: Efficient Forward-Forward DNN Training on Edge Devices ..., accessed January 11, 2026, [https://www.researchgate.net/publication/393184127\_FF-INT8\_Efficient\_Forward-Forward\_DNN\_Training\_on\_Edge\_Devices\_with\_INT8\_Precision](https://www.researchgate.net/publication/393184127_FF-INT8_Efficient_Forward-Forward_DNN_Training_on_Edge_Devices_with_INT8_Precision)  
38. Learning to Reason from Feedback at Test-Time \- ACL Anthology, accessed January 11, 2026, [https://aclanthology.org/2025.acl-long.262.pdf](https://aclanthology.org/2025.acl-long.262.pdf)  
39. Inference-Time Feature Manipulation \- Emergent Mind, accessed January 11, 2026, [https://www.emergentmind.com/topics/inference-time-feature-manipulation](https://www.emergentmind.com/topics/inference-time-feature-manipulation)  
40. How to use and interpret activation patching \- arXiv, accessed January 11, 2026, [https://arxiv.org/pdf/2404.15255](https://arxiv.org/pdf/2404.15255)  
41. Chain of Alignment: Integrating Public Will with Expert Intelligence ..., accessed January 11, 2026, [https://peacepolls.etinu.net/peacepolls/documents/009763.pdf](https://peacepolls.etinu.net/peacepolls/documents/009763.pdf)  
42. “Alignment Faking” frame is somewhat fake \- LessWrong, accessed January 11, 2026, [https://www.lesswrong.com/posts/PWHkMac9Xve6LoMJy/alignment-faking-frame-is-somewhat-fake-1](https://www.lesswrong.com/posts/PWHkMac9Xve6LoMJy/alignment-faking-frame-is-somewhat-fake-1)  
43. a Photonic Co-Processor for Direct Feedback Alignment, accessed January 11, 2026, [https://www.researchgate.net/publication/346973290\_Hardware\_Beyond\_Backpropagation\_a\_Photonic\_Co-Processor\_for\_Direct\_Feedback\_Alignment](https://www.researchgate.net/publication/346973290_Hardware_Beyond_Backpropagation_a_Photonic_Co-Processor_for_Direct_Feedback_Alignment)  
44. Deep Learning without Weight Symmetry \- arXiv, accessed January 11, 2026, [https://arxiv.org/html/2405.20594v2](https://arxiv.org/html/2405.20594v2)