# **Manifold Interfaces and Shared Competence: Architectural Convergence in Orthogonal Model Merging and Generative Latent Spaces**

## **1\. Introduction: The Geometrization of Intelligence**

The evolution of artificial intelligence is currently undergoing a fundamental phase transition. The era of the monolithic, general-purpose learner—characterized by dense, over-parameterized networks trained end-to-end on massive undifferentiated corpora—is yielding to a new architectural paradigm. This emerging paradigm is defined by modularity, composability, and geometric rigor. It seeks to address two persistent and interrelated challenges in the deployment of advanced AI systems: the ability to precisely control high-dimensional generative outputs via low-dimensional logical constraints, and the ability to consolidate diverse, disparate competencies into a single system without catastrophic interference or prohibitive computational costs.

This report provides an exhaustive analysis of the theoretical and empirical solutions emerging to address these challenges. We define the first challenge as the problem of the **Manifold Interface**. This refers to the necessity of constructing rigorous, often bijective, mappings between the abstract, low-dimensional space of human intent (logic, plans, constraints) and the high-dimensional, non-Euclidean manifolds where realistic data (images, text, protein structures) resides. Solutions here are increasingly relying on Invertible Neural Networks (INNs) and advanced Latent Diffusion Models (LDMs) that explicitly model the topology of these spaces.

The second challenge is defined as the problem of **Shared Competence**. As models are required to master an ever-expanding repertoire of tasks, naive multi-task learning fails due to gradient interference and capacity bottlenecks. The field is converging on **Orthogonal Model Merging** and **Dynamic Routing** as the solutions. These techniques exploit the "Universal Weight Subspace Hypothesis," which posits that distinct capabilities can be isolated in orthogonal vector subspaces within a shared parameter landscape, allowing them to be merged arithmetically or routed dynamically without cross-contamination.

By synthesizing research across manifold learning, invertible architectures, orthogonal optimization, and mixture-of-experts (MoE) routing, this report delineates a unified theoretical framework. It argues that the future of AI architecture lies in the intersection of these fields: systems that use manifold-aware interfaces to generate precise control signals, which are then executed by modular experts residing in orthogonal subspaces, orchestrated by complexity-aware routing mechanisms.

## ---

**2\. The Manifold Interface: Bridging Logic and Generation**

The central premise of modern generative modeling is the **Manifold Hypothesis**: the observation that high-dimensional data, such as natural images or coherent text sequences, does not uniformly fill the ambient Euclidean space but instead concentrates on or near a lower-dimensional submanifold.1 The geometry of this manifold encodes the valid structural relationships of the data. The "Manifold Interface" is the mechanism that connects explicit, user-defined logic to this implicit geometry.

### **2.1. Invertible Neural Networks: The Bijective Bridge**

Invertible Neural Networks (INNs) represent the most mathematically rigorous attempt to construct a Manifold Interface. Unlike standard feed-forward networks, which effectively destroy information by projecting high-dimensional inputs onto lower-dimensional feature vectors (a surjective process), INNs are designed to be bijective. They preserve the topological properties of the input space throughout the transformation, allowing for lossless traversal between the data distribution and the latent representation.1

#### **2.1.1. Conditional Invertible Architectures (cINNs)**

The Conditional INN (cINN) is pivotal for controllable generation. In a standard inverse problem—such as reconstructing a medical image from sparse sensor data or generating a text sequence from a semantic label—the mapping is inherently ill-posed; a single logical condition $c$ may correspond to a vast manifold of valid outputs $x$. cINNs address this by modeling the forward process $z \= f(x; c)$ and the inverse process $x \= g(z; c)$, where $z$ is a latent variable usually following a standard normal distribution.5

The cINN framework effectively disentangles the "necessary" information contained in $c$ from the "incidental" variability captured in $z$. By sampling $z$, the model can explore the entire manifold of solutions consistent with the condition $c$. This capability has been demonstrated in spectral domain transfer, where cINNs bridge the gap between simulated and real spectral data by mapping both to a shared latent space, guaranteeing cycle consistency—a property often violated by GAN-based approaches.5

#### **2.1.2. Coupling Layers and Information Preservation**

The structural backbone of most INNs is the affine coupling layer. This architecture splits the input dimension into two partitions. One partition remains unchanged, while the other undergoes an affine transformation parameterized by a function of the first. This design ensures that the Jacobian determinant is triangular and easily computable, facilitating exact maximum likelihood training.5

Recent theoretical advancements have analyzed the approximation capacities of these networks. It has been proven that coupling-based INNs can approximate bi-Lipschitz continuous mappings on compact domains. This is a critical property for a stable Manifold Interface: it guarantees that small perturbations in the logical input or the latent state result in bounded, predictable changes in the output, preventing the chaotic behavior often seen in adversarial examples.9

#### **2.1.3. Probabilistic Invertible Neural Networks (P-INNs)**

For engineering applications requiring high reliability, the deterministic nature of standard INNs can be a limitation. The Probabilistic INN (P-INNs) extends the architecture to incorporate both epistemic uncertainty (model ignorance) and aleatoric uncertainty (data noise). By formulating a new loss function that integrates these uncertainty quantifications, P-INNs provide a robust interface for "inverse design," where the goal is to discover the range of input parameters that satisfy a specific system response.3 This turns the Manifold Interface into a tool for rigorous design space exploration.

### **2.2. Latent Diffusion: The Continuous-Discrete Interface**

While INNs offer explicit bijectivity, **Latent Diffusion Models (LDMs)** have rapidly ascended as the dominant framework for high-fidelity generation, particularly in domains like text-to-image and text-to-text generation. The innovation of LDMs lies in separating the computational burden of perceptual compression from the semantic complexity of generative modeling.10

#### **2.2.1. The Geometry of the Latent Space: The Cosmos Framework**

A recurring finding in diffusion research is that the quality of generation is strictly bounded by the geometry of the latent space. If the latent manifold is rugged or disjointed, the diffusion process—which relies on gradual denoising—fails to converge to coherent samples.

The **Cosmos** framework explicitly addresses this by proposing a "compressed and smooth" latent space. Traditional autoencoders minimize reconstruction loss, often leading to "brittle" latent geometries where semantically similar data points are distant. Cosmos introduces smoothness and robustness objectives during the autoencoder training, effectively regularizing the manifold to be Lipschitz continuous. This allows the diffusion model to operate on a compact representation (compressed by up to $8\\times$) without losing semantic fidelity. Empirically, this results in diffusion models that can match or exceed the performance of autoregressive baselines while offering the benefits of non-autoregressive, parallel generation.12

#### **2.2.2. Bridging Discrete Text and Continuous Manifolds**

Applying diffusion to text presents a unique "Manifold Interface" challenge: text is discrete, while diffusion is inherently continuous. Several competing architectures have emerged to bridge this gap:

* **Embedding-Space Diffusion (DiffuSeq):** Approaches like DiffuSeq and Diffusion-LM perform the diffusion process directly on the continuous token embedding space. To generate text, the final continuous vectors are "rounded" to the nearest discrete token embedding. While effective, this approach suffers from "rounding errors" and often requires complex clamping tricks to keep the diffusion trajectory near valid embeddings.14  
* **Simplex Diffusion (TESS):** The TESS architecture operates on the logit simplex—the probability distribution over the vocabulary. By diffusing on the simplex, the model explicitly handles the categorical nature of the data. TESS also introduces "self-conditioning," where the model uses its own prediction of $x\_0$ (the final text) to guide the denoising step, significantly improving coherence and convergence speed.16  
* **Latent Encoder-Decoder Diffusion (TEncDM):** Critics of embedding-space diffusion argue that raw embeddings lack context. The TEncDM framework and related "Latent Diffusion for Language Generation" models use the latent space of a pre-trained encoder (like BERT or BART) as the diffusion manifold. This is a "Latent Bridge": the diffusion model manipulates high-level semantic vectors (representing whole sentences or paragraphs) rather than individual tokens. A separate decoder then translates these semantic latents back into discrete text. This approach aligns the diffusion process with the semantic manifold of the language, rather than the lexical manifold of the vocabulary.15

#### **2.2.3. Diffusion as a Projection Mechanism**

Recent theoretical work reinterprets diffusion not just as denoising, but as a projection mechanism onto the manifold of "good data." The **Manifold-Probabilistic Projection Model (MPPM)** unifies geometric and probabilistic perspectives, treating the diffusion steps as a sequence of projections that move a point from a high-entropy region (noise) to the nearest point on the data manifold. This perspective provides a geometric justification for the effectiveness of diffusion in inverse problems.2

### **2.3. Intrinsic Dimensionality: Metrics for Manifold Quality**

To design effective interfaces, one must be able to measure the properties of the target manifold. **Intrinsic Dimensionality (ID)** has emerged as the critical metric for quantifying the complexity and information content of data representations.1

#### **2.3.1. Layer-Wise Dynamics in LLMs**

Research into the internal geometry of Large Language Models (LLMs) has revealed a consistent "phase transition" in ID across layers. The ID of representations typically starts low (in embedding layers), rises to a peak in the middle layers, and then compresses again towards the output. This "peak" corresponds to the formation of a rich linguistic abstraction—essentially, the manifold where "meaning" is most densely encoded. This suggests that any "Manifold Interface" designed to inject logic or control into an LLM (e.g., via adapters or merging) should target these high-ID layers to maximize expressivity.21

#### **2.3.2. Local Intrinsic Dimensionality (LID) and Robustness**

While global ID provides an average measure, **Local Intrinsic Dimensionality (LID)** estimates the dimension of the manifold in the neighborhood of a specific data point. This metric has proven invaluable for:

* **Adversarial Robustness:** Data points with lower LID are often more susceptible to adversarial attacks, as they lie on "thinner" regions of the manifold where off-manifold perturbations are easier to construct. Adversarial training tends to increase the LID of the data representation, effectively "thickening" the manifold.23  
* **Detection of Synthetic Data:** LID analysis has shown that diffusion-generated images exhibit distinct local geometric signatures compared to natural images. The "multiLID" method leverages this to detect synthetic content with high accuracy, suggesting that current generative models do not yet perfectly replicate the local topology of natural data manifolds.24  
* **Class Imbalance:** LID serves as a model-free metric for class complexity. Classes with higher LID are inherently more complex and require more samples to learn. This insight is used to re-weight loss functions in long-tail recognition tasks, ensuring that the learning budget is allocated proportional to manifold complexity rather than just sample count.26

### **2.4. Plan-and-Write: The Macro-Level Interface**

At the highest level of abstraction, the Manifold Interface is realized in **Plan-and-Write** architectures. These systems explicitly decompose generation into a discrete planning stage (generating the interface) and a continuous writing stage (generating the content).

* **Latent Planning Variables:** Advanced story generation systems treat the plot outline as a discrete latent variable $z$. The model learns a prior $P(z|x)$ over valid plots and a conditional generator $P(y|z, x)$ for the story. By sampling $z$, the system first anchors the generation on the "plot manifold" before expanding it to the "text manifold." This prevents the wandering and incoherence typical of purely autoregressive models.27  
* **Recursive Task Decomposition:** Newer agents view writing as a hierarchical planning problem involving Retrieval, Reasoning, and Composition. By interleaving planning and execution, these systems dynamically adjust the depth of the "interface" based on the task complexity, mirroring the recursive structure of fractal manifolds.29

## ---

**3\. Shared Competence: Orthogonal Model Merging**

The second major theme of this report is the architectural shift toward **Shared Competence**. As AI systems scale, retraining monolithic models for every new capability becomes computationally intractable. The solution is to merge independently trained models or adapters. However, naive merging leads to parameter interference. The solution lies in the geometry of the weight space: specifically, the use of **orthogonality** to compartmentalize competencies.

### **3.1. The Universal Weight Subspace Hypothesis**

The theoretical foundation for model merging is the **Universal Weight Subspace Hypothesis**. Large-scale empirical studies have demonstrated that neural networks, even when trained on different tasks or with different initializations, tend to converge to shared, low-rank spectral subspaces. This implies that the "useful" information in a neural network is not scattered randomly throughout the high-dimensional parameter space, but is concentrated in specific geometric orientations.31

If this hypothesis holds, it follows that task-specific capabilities can be represented as vectors within this shared coordinate system. This is the basis of **Task Arithmetic**, where the difference between fine-tuned and pre-trained weights ($\\tau \= \\theta\_{ft} \- \\theta\_{pre}$) is treated as a "Task Vector." These vectors can be added ($\\theta\_{new} \= \\theta\_{pre} \+ \\tau\_A \+ \\tau\_B$) to combine skills or subtracted to unlearn behaviors.32

### **3.2. The Spectral Physics of Merging**

While Task Arithmetic works surprisingly well, it is not lossless. The primary degradation mechanism is **Spectral Imbalance**. When multiple task vectors are summed, they often exhibit high cosine similarity in the subspaces corresponding to their largest singular values (the "dominant directions"). Summing these aligned vectors causes the magnitude of activations in these directions to explode, pushing the model out of its effective operating regime.34

#### **3.2.1. AlignMerge: Restoring Spectral Balance**

**Subspace-Alignment Aware Merging (AlignMerge)** addresses this by performing a spectral surgery on the merged weights. It computes the **Subspace Alignment Index (SAI)** to identify shared singular subspaces where over-amplification is occurring. It then applies a projection to attenuate these components, effectively "normalizing" the energy in the shared subspace while preserving the energy in the orthogonal, task-specific subspaces. This process restores the spectral health of the merged model without requiring any retraining.34

#### **3.2.2. Isotropic Merging (Iso-C and Iso-CTS)**

A related technique, **Iso-C**, enforces an isotropic distribution of singular values in the common subspace. By flattening the spectrum, it prevents any single direction from dominating the representation. **Iso-CTS** (Common and Task-Specific) refines this by explicitly separating the weight space into a "Common Subspace" (where tasks align) and "Task-Specific Residuals" (where they are orthogonal). The common subspace is merged isotropically, while the residuals are added linearly. This hybrid approach has been shown to outperform simple task arithmetic in multi-task benchmarks.35

### **3.3. Orthogonal Constraints for Interference-Free Integration**

To move beyond post-hoc fixing of interference, recent methods enforce orthogonality *by design*—either during training or via pre-merge projections.

#### **3.3.1. Orthogonal LoRA (O-LoRA) and Dual-LoRA**

In the realm of Parameter-Efficient Fine-Tuning (PEFT), **O-LoRA** introduces an orthogonality constraint during the training of Low-Rank Adapters. When learning Task B, the system penalizes any update that is not orthogonal to the subspace of Task A ($W\_A \\cdot W\_B^T \\approx 0$). This forces the model to find a solution for Task B in the "null space" of Task A, thereby guaranteeing zero interference.36

**Dual-LoRA** extends this by employing a bicameral adapter architecture:

1. **Orthogonal Adapter:** Updates are strictly projected onto the null space of previous tasks. This module is responsible for "Stability"—preserving old knowledge.  
2. Residual Adapter: Updates are allowed in the full space but are regularized. This module is responsible for "Plasticity"—learning new, potentially conflicting features.  
   By dynamically combining these adapters, Dual-LoRA achieves state-of-the-art results in continual learning benchmarks, effectively solving the stability-plasticity dilemma via geometric compartmentalization.38

#### **3.3.2. Parameter Efficient Gradient Projection (PEGP)**

**PEGP** provides a unified theoretical framework for these methods. It generalizes the concept of Gradient Projection Memory (GPM) to all PEFT paradigms (LoRA, Adapter, Prefix Tuning). PEGP calculates the feature covariance matrix of the pre-trained model and performs SVD to identify the "core subspace." During fine-tuning, all gradients are projected onto the orthogonal complement of this core subspace. This ensures that the fine-tuning process is mathematically invisible to the pre-trained features, preserving the foundation model's general capabilities while acquiring downstream skills.40

#### **3.3.3. Modular Delta Merging (MDM-OC) and Reversibility**

For systems that require dynamic reconfiguration, **Modular Delta Merging with Orthogonal Constraints (MDM-OC)** offers a reversible solution. Before merging, task deltas are projected into mutually orthogonal bases. Because orthogonal vectors can be summed and separated without information loss (via simple dot products), this allows for the "unmerging" of tasks. An operator can add a "Medical Expert" module for one query and cleanly remove it for the next, without leaving residual "ghost" parameters.42

### **3.4. Comparative Analysis of Merging Architectures**

The following table synthesizes the key algorithmic approaches to orthogonal merging, highlighting the trade-offs between computational cost (SVD requirements) and merge quality (interference reduction).

| Method | Mechanism | Orthogonality Enforcement | Key Advantage | Computational Cost |
| :---- | :---- | :---- | :---- | :---- |
| **Task Arithmetic** | $\\theta\_{new} \= \\theta\_{pre} \+ \\sum \\tau\_i$ | None (Incidental) | Zero-shot, simple | Low (Addition only) |
| **AlignMerge** | SVD on $\\sum \\tau\_i$ $\\rightarrow$ Attenuate high $\\sigma$ | Post-Training (Merging phase) | Corrects spectral explosion | High (SVD on weights) |
| **Iso-CTS** | Flatten common spectrum \+ Add residuals | Post-Training | Preserves task-specific traits | High (SVD \+ Projection) |
| **O-LoRA** | Loss penalty $\\|W\_A W\_B^T\\|$ | During Training | Prevents forgetting (CL) | Medium (Regularization) |
| **Dual-LoRA** | Dual adapters (Null-space \+ Residual) | During Training | Balances Stability/Plasticity | High (Dual Fwd Pass) |
| **MDM-OC** | Project $\\tau\_i$ to bases $U\_i \\perp U\_j$ | Pre-Merge | Reversible/Unmergable | High (Basis Construction) |
| **PEGP** | Project gradients $g \\leftarrow g \- UU^Tg$ | Optimization Step | Unified PEFT Theory | High (Covariance SVD) |

## ---

**4\. Dynamic Routing: The Orchestration of Competence**

While merging consolidates competencies into a single weight set, **Dynamic Routing** integrates them via conditional computation. The convergence of these fields is evident in the rise of "Mixture-of-Experts" (MoE) architectures that use routing decisions to navigate the landscape of "Shared Competence."

### **4.1. The Shift to Sentence-Level Routing: DLP-LoRA**

Traditional MoE models utilize **token-level routing**, where a gate decides the expert for every individual token. While offering maximum granularity, this approach suffers from semantic incoherence (adjacent tokens handled by disparate experts) and high computational overhead (random memory access patterns prevent effective batching).

**DLP-LoRA (Dynamic Lightweight Plugin LoRA)** represents a paradigm shift toward **sentence-level routing**.

* **Mechanism:** The architecture introduces a lightweight "mini-MLP" plugin (only 5 million parameters) acting as a classifier. It uses the ALBERT tokenizer to encode the input sentence.  
* **Trigger:** The router is activated *only* at the first token of a new sentence. It uses the sentence context to predict a distribution over available LoRA experts.  
* **Selection:** A top-$p$ sampling strategy selects a subset of LoRAs, which are then fused using weights derived from the softmax of the router's logits.  
* **Performance:** By locking the expert choice for the duration of the sentence, DLP-LoRA allows for **Parallel Multi-LoRA Acceleration**. The system constructs contiguous tensors in High Bandwidth Memory (HBM) for the selected LoRAs, enabling efficient GEMM (General Matrix Multiply) operations. This reduces inference latency to less than $2\\times$ that of a single model, despite accessing a library of up to 100 experts, and improves composite task performance by significantly reducing "expert thrashing".44

### **4.2. Hysteretic Routing: Stabilizing the Manifold Trajectory**

For long-context generation, even sentence-level switching can be too volatile. **HystMoE (Hysteretic Mixture-of-Experts)** introduces the concept of temporal hysteresis to routing.

* **The Concept:** Hysteresis prevents the system from switching experts unless the signal for a new expert exceeds a significant threshold. It favors the retention of the *currently active* set of experts.  
* **Mechanism:** The router maintains a set of "Active Experts" $S\_t$. For step $t+1$, an expert is kept in $S\_{t+1}$ if its routing score remains within the top-$k$. A *new* expert is added only if its score exceeds the score of a retained expert by a margin $\\delta$ (or if the retained expert drops out of the top-$k(1-\\rho)$).  
* **Outcome:** This explicitly minimizes the "churn rate"—the Hamming distance between active sets $S\_t$ and $S\_{t+1}$. By stabilizing the expert set, HystMoE ensures that the model traverses the solution manifold smoothly, avoiding the "jitter" that creates disjointed text.47

### **4.3. Complexity-Based Routing: Adaptive Computation**

A profound innovation in recent routing literature is the move from *content-based* routing (Topic A vs. Topic B) to *complexity-based* routing (Easy vs. Hard). This aligns with the "Manifold Interface" concept: simple tokens (low intrinsic dimension) require less compute than complex tokens (high intrinsic dimension).

#### **4.3.1. FlexiDepth and SkipGPT**

**FlexiDepth** and **SkipGPT** implement this via **adaptive depth**. These models train routers at each layer to decide whether to execute the block or skip it.

* **Token Complexity:** The decision is often based on the cosine similarity between the input and output of a layer (or a learned proxy). If the layer update is minimal (high similarity), the token is deemed "easy" or "redundant," and subsequent layers are skipped.  
* **Decoupling:** SkipGPT decouples the routing for Attention and MLP blocks. Empirical analysis shows that Attention is often more redundant for syntax tokens, while MLPs are needed for factual recall.  
* **Efficiency:** Applied to Llama-3-8B, FlexiDepth can skip roughly 8 out of 32 layers without accuracy loss, effectively allocating compute where the manifold curvature (complexity) is highest.48

#### **4.3.2. Complexity-Aware MoE**

This concept extends to expert selection. The **Complexity-Aware MoE** categorizes experts into "Lightweight" (small parameter count) and "Strong" (large parameter count). A few-shot calibrated router estimates token difficulty. "Stop words" and common syntax are routed to lightweight experts, while reasoning-heavy tokens are routed to strong experts. This maximizes the FLOPs-per-token efficiency.52

#### **4.3.3. Visual Autoregressive MoE (VAR-MoE)**

In image generation, **VAR-MoE** applies complexity routing to *scales*. Image generation proceeds from coarse (low resolution) to fine (high resolution).

* **Scale-Aware Thresholding:** The router uses a dynamic threshold $\\tau\_s$ that increases with resolution. At coarse scales (high semantic information per token), the threshold is low, activating many experts. At fine scales (high frequency noise), the threshold is high, activating few experts. This matches the computational expenditure to the information density of the signal.54

### **4.4. Distillation via Routing**

Finally, routing is being used as a mechanism for knowledge distillation. **DistillMoE** and **MicroBERT** train a small student model to mimic the *routing decisions* of a large teacher (or a conceptual teacher).

* **Mechanism:** The student has a lightweight MoE layer. A router is trained to direct tokens to experts that specialize in different distillation objectives (e.g., Expert A optimizes for Pointwise loss, Expert B for Contrastive loss).  
* **Result:** This allows the student to capture the multi-faceted "Shared Competence" of the teacher without inheriting its massive parameter count. The router effectively learns the "structural habits" of the teacher—learning *how* to solve a problem (which expert to ask) rather than just the solution.56

## ---

**5\. Synthesis: The Convergence of Manifolds, Orthogonality, and Routing**

The integration of these diverse research streams reveals a coherent architectural evolution. We are moving away from the "black box" model toward a **Modular, Orthogonal, Manifold-Aware System**.

### **5.1. Orthogonality as the Geometric Foundation**

The efficacy of any "Manifold Interface" depends on the cleanliness of the latent geometry. **Orthogonal Model Merging** provides this cleanliness. When task vectors are orthogonal, the latent space becomes disentangled. This allows a control signal (the interface) to traverse the subspace of Task A without creating "ghost activations" in the subspace of Task B. Ideally, the principal components of the weight matrix should align with the semantic axes of the control manifold. **AlignMerge** enforces this post-hoc, while **PEGP/O-LoRA** enforce it ab initio.34

### **5.2. Routing as Dynamic Manifold Estimator**

Dynamic routing can be theoretically reinterpreted as a real-time estimator of **Local Intrinsic Dimensionality (LID)**.

* **Router Output:** The "confidence" or "complexity" score output by a router (e.g., in FlexiDepth) is a proxy for LID.  
* **Low LID (Flat Manifold):** Corresponds to "Easy" tokens. The local geometry is simple (linear). The router skips layers or selects lightweight experts.  
* **High LID (Curved Manifold):** Corresponds to "Complex" tokens (reasoning, ambiguity). The local geometry is complex. The router engages deep layers or "Strong" experts to resolve the curvature.25

### **5.3. The "System 2" AI: Recursive Latent Reasoning**

The ultimate convergence is the **Encode-Think-Decode (ETD)** paradigm. Here, the model combines the "Manifold Interface" (Encoding to Latent Space) with "Shared Competence" (Routing/Thinking) in a recursive loop.

* **Adaptive Computation Time (ACT):** Instead of a fixed forward pass, the model stays in the latent space, recursively applying a "Thinking Block" (a specific set of experts).  
* **Halting:** The recursion continues until a "Halting Unit" (a router) determines that the representation has converged to a stable point on the solution manifold (i.e., sufficient reasoning has occurred).  
* **Outcome:** This allows the model to decouple "computational depth" from "sequence length," enabling deep reasoning on short prompts. It represents the transition from System 1 (reflexive generation) to System 2 (deliberative reasoning) within a unified geometric framework.59

## ---

**6\. Conclusion and Future Outlook**

The research analyzed in this report points to a future where AI architectures are defined by their internal geometry rather than just their scale.

1. **The Manifold Interface** is evolving from simple embeddings to sophisticated topological maps (cINNs, Cosmos) that allow for precise, bi-Lipschitz control over generation. This solves the "black box control" problem.  
2. **Shared Competence** is being solved by **Orthogonality**. By treating the parameter space as a union of orthogonal task subspaces, we can merge, unmerge, and compose capabilities indefinitely (MDM-OC, O-LoRA) without catastrophic interference.  
3. **Dynamic Routing** is becoming the "Operating System" of these models. It allocates resources based on the real-time estimation of data complexity (LID), using sentence-level and hysteretic strategies (DLP-LoRA, HystMoE) to maintain coherence.

**Actionable Recommendation:** For the development of next-generation generative systems, research should focus on **"Orthogonal Manifold Routing"**: training routers that not only estimate complexity but explicitly identify *which orthogonal subspace* a query belongs to, and dynamically activating the corresponding sub-network. This would combine the efficiency of sparse MoEs with the interference-free properties of orthogonal merging, creating a truly modular and scalable intelligence.

### ---

**Appendix: Technical Breakdown of Key Algorithms**

#### **A. Mechanics of AlignMerge (Spectral Attenuation)**

Let $W\_{merge} \= W\_{pre} \+ \\lambda \\sum \\tau\_i$.  
AlignMerge performs SVD on each task vector $\\tau\_i \= U\_i \\Sigma\_i V\_i^T$.  
It calculates the Interference Matrix via the overlaps of $U\_i$.  
If the overlap (alignment) in the top-$k$ singular vectors exceeds a threshold, the corresponding singular values in $\\Sigma\_{merge}$ are dampened by a factor $\\alpha \< 1$.  
This explicitly minimizes the spectral norm of the interference term: $\\min \\| \\sum (\\tau\_i \\cdot \\tau\_j) \\|\_2$ for $i \\neq j$.34

#### **B. HystMoE Routing Equation**

Let $s\_{t, e}$ be the routing score for expert $e$ at step $t$.  
Let $S\_t$ be the set of active experts at step $t$.  
The set $S\_{t+1}$ is defined as:  
$S\_{t+1} \= \\{e \\in S\_t \\mid \\text{rank}(s\_{t+1, e}) \\le k\\} \\cup \\{e \\notin S\_t \\mid s\_{t+1, e} \> \\min\_{e' \\in S\_t} s\_{t+1, e'} \+ \\delta \\}$  
The term $\\delta$ is the hysteresis margin. It requires a new expert to be significantly better than an incumbent expert to trigger a switch, enforcing temporal stability.47

#### **C. DLP-LoRA Mini-MLP Plugin**

* **Input:** Sentence embeddings from ALBERT tokenizer (768-dim).  
* **Architecture:** 4-layer MLP (768 $\\rightarrow$ 256 $\\rightarrow$ 64 $\\rightarrow$ $N\_{tasks}$).  
* **Output:** Logits over $N$ tasks.  
* **Fusion:** $W\_{final} \= W\_{base} \+ \\sum\_{i \\in \\text{Top-p}} \\text{softmax}(logits)\_i \\cdot B\_i A\_i$.  
* **Hardware Optimization:** Matrices $A\_i, B\_i$ are stored in contiguous HBM blocks. A custom CUDA kernel performs the weighted sum summation *before* the matrix multiplication with the activation $x$, reducing FLOPs.44

#### **Works cited**

1. Analysis of Manifold and its Application, accessed January 3, 2026, [https://ijsra.net/sites/default/files/IJSRA-2024-0812.pdf](https://ijsra.net/sites/default/files/IJSRA-2024-0812.pdf)  
2. A Geometric Unification of Generative AI with Manifold-Probabilistic ..., accessed January 3, 2026, [https://arxiv.org/abs/2510.00666](https://arxiv.org/abs/2510.00666)  
3. Probabilistic invertible neural network for inverse design space ..., accessed January 3, 2026, [https://www.aimspress.com/article/doi/10.3934/era.2023043?viewType=HTML](https://www.aimspress.com/article/doi/10.3934/era.2023043?viewType=HTML)  
4. Network-to-Network Translation with Conditional Invertible Neural ..., accessed January 3, 2026, [https://compvis.github.io/net2net/paper/paper.pdf](https://compvis.github.io/net2net/paper/paper.pdf)  
5. Conditional Invertible Neural Networks for Medical Imaging \- MDPI, accessed January 3, 2026, [https://www.mdpi.com/2313-433X/7/11/243](https://www.mdpi.com/2313-433X/7/11/243)  
6. Invertible Neural Networks in Astrophysics \- EPJ Web of Conferences, accessed January 3, 2026, [https://www.epj-conferences.org/articles/epjconf/pdf/2022/09/epjconf\_ism2022\_00009.pdf](https://www.epj-conferences.org/articles/epjconf/pdf/2022/09/epjconf_ism2022_00009.pdf)  
7. Unsupervised Domain Transfer with Conditional Invertible Neural ..., accessed January 3, 2026, [https://conferences.miccai.org/2023/papers/697-Paper3159.html](https://conferences.miccai.org/2023/papers/697-Paper3159.html)  
8. Conditional Invertible Neural Networks for Guided Image Generation, accessed January 3, 2026, [https://openreview.net/forum?id=SyxC9TEtPH](https://openreview.net/forum?id=SyxC9TEtPH)  
9. Neural Networks \- Department of Mathematics, accessed January 3, 2026, [https://www.math.cuhk.edu.hk/\~zou/publication/1-s2.0-S0893608024001382-main.pdf](https://www.math.cuhk.edu.hk/~zou/publication/1-s2.0-S0893608024001382-main.pdf)  
10. Diffusion model \- Wikipedia, accessed January 3, 2026, [https://en.wikipedia.org/wiki/Diffusion\_model](https://en.wikipedia.org/wiki/Diffusion_model)  
11. High-Resolution Image Synthesis With Latent Diffusion Models, accessed January 3, 2026, [https://openaccess.thecvf.com/content/CVPR2022/papers/Rombach\_High-Resolution\_Image\_Synthesis\_With\_Latent\_Diffusion\_Models\_CVPR\_2022\_paper.pdf](https://openaccess.thecvf.com/content/CVPR2022/papers/Rombach_High-Resolution_Image_Synthesis_With_Latent_Diffusion_Models_CVPR_2022_paper.pdf)  
12. Compressed and Smooth Latent Space for Text Diffusion Modeling, accessed January 3, 2026, [https://arxiv.org/html/2506.21170v1](https://arxiv.org/html/2506.21170v1)  
13. Compressed and Smooth Latent Space for Text Diffusion Modeling, accessed January 3, 2026, [https://www.researchgate.net/publication/393066316\_Compressed\_and\_Smooth\_Latent\_Space\_for\_Text\_Diffusion\_Modeling](https://www.researchgate.net/publication/393066316_Compressed_and_Smooth_Latent_Space_for_Text_Diffusion_Modeling)  
14. DiffuSeq: Sequence to Sequence Text Generation with Diffusion ..., accessed January 3, 2026, [https://openreview.net/forum?id=jQj-\_rLVXsj](https://openreview.net/forum?id=jQj-_rLVXsj)  
15. Latent Diffusion for Language Generation, accessed January 3, 2026, [https://par.nsf.gov/servlets/purl/10475853](https://par.nsf.gov/servlets/purl/10475853)  
16. \[PDF\] TESS: Text-to-Text Self-Conditioned Simplex Diffusion, accessed January 3, 2026, [https://www.semanticscholar.org/paper/67cdecbcfed07b9a29d9e2a92da684604383afd7](https://www.semanticscholar.org/paper/67cdecbcfed07b9a29d9e2a92da684604383afd7)  
17. TESS: Text-to-Text Self-Conditioned Simplex Diffusion, accessed January 3, 2026, [https://aclanthology.org/2024.eacl-long.144.pdf](https://aclanthology.org/2024.eacl-long.144.pdf)  
18. Latent Diffusion for Language Generation \- OpenReview, accessed January 3, 2026, [https://openreview.net/forum?id=NKdtztladR](https://openreview.net/forum?id=NKdtztladR)  
19. TEncDM: Understanding the Properties of the Diffusion Model in the ..., accessed January 3, 2026, [https://ojs.aaai.org/index.php/AAAI/article/view/34696/36851](https://ojs.aaai.org/index.php/AAAI/article/view/34696/36851)  
20. Intrinsic Dimension Estimation: Relevant Techniques ... \- SciSpace, accessed January 3, 2026, [https://scispace.com/pdf/intrinsic-dimension-estimation-relevant-techniques-and-a-wx2vk70rhn.pdf](https://scispace.com/pdf/intrinsic-dimension-estimation-relevant-techniques-and-a-wx2vk70rhn.pdf)  
21. The geometry of hidden representations of protein language models, accessed January 3, 2026, [https://www.biorxiv.org/content/10.1101/2022.10.24.513504v1.full.pdf](https://www.biorxiv.org/content/10.1101/2022.10.24.513504v1.full.pdf)  
22. EMERGENCE OF A HIGH-DIMENSIONAL ABSTRACTION PHASE ..., accessed January 3, 2026, [https://openreview.net/pdf?id=0fD3iIBhlV](https://openreview.net/pdf?id=0fD3iIBhlV)  
23. Explaining the role of Intrinsic Dimensionality in Adversarial Training, accessed January 3, 2026, [https://raw.githubusercontent.com/mlresearch/v267/main/assets/altinisik25a/altinisik25a.pdf](https://raw.githubusercontent.com/mlresearch/v267/main/assets/altinisik25a/altinisik25a.pdf)  
24. Detecting Images Generated by Deep Diffusion Models Using Their ..., accessed January 3, 2026, [https://openaccess.thecvf.com/content/ICCV2023W/DFAD/papers/Lorenz\_Detecting\_Images\_Generated\_by\_Deep\_Diffusion\_Models\_Using\_Their\_Local\_ICCVW\_2023\_paper.pdf](https://openaccess.thecvf.com/content/ICCV2023W/DFAD/papers/Lorenz_Detecting_Images_Generated_by_Deep_Diffusion_Models_Using_Their_Local_ICCVW_2023_paper.pdf)  
25. On Local Intrinsic Dimension Estimation and Its Applications, accessed January 3, 2026, [https://web.eecs.umich.edu/\~hero/Preprints/CarterTSP10.pdf](https://web.eecs.umich.edu/~hero/Preprints/CarterTSP10.pdf)  
26. Intrinsic Dimensionality as a Model-Free Measure of Class Imbalance, accessed January 3, 2026, [https://chatpaper.com/paper/209085](https://chatpaper.com/paper/209085)  
27. Learning to Generate Explainable Plots for Neural Story Generation, accessed January 3, 2026, [https://www.semanticscholar.org/paper/Learning-to-Generate-Explainable-Plots-for-Neural-Chen-Liu/d941efe73deabf341ad61c30ac24ddf654ece43d](https://www.semanticscholar.org/paper/Learning-to-Generate-Explainable-Plots-for-Neural-Chen-Liu/d941efe73deabf341ad61c30ac24ddf654ece43d)  
28. Learning to Predict Explainable Plots for Neural Story Generation, accessed January 3, 2026, [https://nlp.csai.tsinghua.edu.cn/documents/134/Learning\_to\_Predict\_Explainable\_Plots\_for\_Neural\_Story\_Generation.pdf](https://nlp.csai.tsinghua.edu.cn/documents/134/Learning_to_Predict_Explainable_Plots_for_Neural_Story_Generation.pdf)  
29. arXiv:2503.08275v1 \[cs.AI\] 11 Mar 2025, accessed January 3, 2026, [https://www.arxiv.org/pdf/2503.08275v1](https://www.arxiv.org/pdf/2503.08275v1)  
30. (PDF) Plan-and-Write: Towards Better Automatic Storytelling, accessed January 3, 2026, [https://www.researchgate.net/publication/335380574\_Plan-and-Write\_Towards\_Better\_Automatic\_Storytelling](https://www.researchgate.net/publication/335380574_Plan-and-Write_Towards_Better_Automatic_Storytelling)  
31. (PDF) The Universal Weight Subspace Hypothesis \- ResearchGate, accessed January 3, 2026, [https://www.researchgate.net/publication/398357158\_The\_Universal\_Weight\_Subspace\_Hypothesis](https://www.researchgate.net/publication/398357158_The_Universal_Weight_Subspace_Hypothesis)  
32. A Unified and Scalable Framework for Compressed Task Arithmetic, accessed January 3, 2026, [https://arxiv.org/html/2502.01015v4](https://arxiv.org/html/2502.01015v4)  
33. Daily Papers \- Hugging Face, accessed January 3, 2026, [https://huggingface.co/papers?q=task%20arithmetic](https://huggingface.co/papers?q=task+arithmetic)  
34. Beyond Conflict: Subspace-Alignment as the Missing Piece of Model ..., accessed January 3, 2026, [https://openreview.net/forum?id=f9JOwSGO13](https://openreview.net/forum?id=f9JOwSGO13)  
35. Isotropic Model Merging with Common and Task-Specific Subspaces, accessed January 3, 2026, [https://chatpaper.com/paper/168137](https://chatpaper.com/paper/168137)  
36. Orthogonal Subspace Learning for Language Model Continual ..., accessed January 3, 2026, [https://www.researchgate.net/publication/376403747\_Orthogonal\_Subspace\_Learning\_for\_Language\_Model\_Continual\_Learning](https://www.researchgate.net/publication/376403747_Orthogonal_Subspace_Learning_for_Language_Model_Continual_Learning)  
37. Orthogonal Subspace Learning for Language Model Continual ..., accessed January 3, 2026, [https://openreview.net/forum?id=L7ZBpZZ8Va](https://openreview.net/forum?id=L7ZBpZZ8Va)  
38. Dual Low-Rank Adaptation for Continual Learning with Pre-Trained ..., accessed January 3, 2026, [https://chatpaper.com/chatpaper/paper/73315](https://chatpaper.com/chatpaper/paper/73315)  
39. Replay-Free Continual Low-Rank Adaptation with Dynamic Memory, accessed January 3, 2026, [https://arxiv.org/html/2411.00623v3](https://arxiv.org/html/2411.00623v3)  
40. Gradient Projection For Parameter-Efficient Continual Learning \- arXiv, accessed January 3, 2026, [https://arxiv.org/html/2405.13383v1](https://arxiv.org/html/2405.13383v1)  
41. Gradient Projection for Continual Parameter-Efficient Tuning, accessed January 3, 2026, [https://www.computer.org/csdl/journal/tp/2025/10/11073077/28bF1T8XPYA](https://www.computer.org/csdl/journal/tp/2025/10/11073077/28bF1T8XPYA)  
42. Modular Delta Merging with Orthogonal Constraints \- arXiv, accessed January 3, 2026, [https://arxiv.org/html/2507.20997v1](https://arxiv.org/html/2507.20997v1)  
43. (PDF) Modular Delta Merging with Orthogonal Constraints, accessed January 3, 2026, [https://www.researchgate.net/publication/394080643\_Modular\_Delta\_Merging\_with\_Orthogonal\_Constraints\_A\_Scalable\_Framework\_for\_Continual\_and\_Reversible\_Model\_Composition](https://www.researchgate.net/publication/394080643_Modular_Delta_Merging_with_Orthogonal_Constraints_A_Scalable_Framework_for_Continual_and_Reversible_Model_Composition)  
44. DLP-LoRA: Efficient Task-Specific LoRA Fusion with a Dynamic..., accessed January 3, 2026, [https://openreview.net/forum?id=I1VCj1l1Zn](https://openreview.net/forum?id=I1VCj1l1Zn)  
45. Efficient Task-Specific LoRA Fusion with a Dynamic, Lightweight ..., accessed January 3, 2026, [https://arxiv.org/html/2410.01497v2](https://arxiv.org/html/2410.01497v2)  
46. DLP-LoRA: Efficient Task-Specific LoRA Fusion with a Dynamic ..., accessed January 3, 2026, [https://arxiv.org/abs/2410.01497](https://arxiv.org/abs/2410.01497)  
47. (PDF) Bounded Attention, Unbounded Memory: A Fixed-Window ..., accessed January 3, 2026, [https://www.researchgate.net/publication/399208511\_Bounded\_Attention\_Unbounded\_Memory\_A\_Fixed-Window\_System-1\_with\_Hysteretic\_Long-Term\_Experts\_and\_LoRA-Only\_Test-Time\_Learning\_for\_System-2\_Reasoning/download](https://www.researchgate.net/publication/399208511_Bounded_Attention_Unbounded_Memory_A_Fixed-Window_System-1_with_Hysteretic_Long-Term_Experts_and_LoRA-Only_Test-Time_Learning_for_System-2_Reasoning/download)  
48. Adaptive Layer-skipping in Pre-trained LLMs \- arXiv, accessed January 3, 2026, [https://arxiv.org/html/2503.23798v1](https://arxiv.org/html/2503.23798v1)  
49. Adaptive Layer-skipping in Pre-trained LLMs \- arXiv, accessed January 3, 2026, [https://arxiv.org/html/2503.23798v3](https://arxiv.org/html/2503.23798v3)  
50. SkipGPT: Each Token is One of a Kind \- OpenReview, accessed January 3, 2026, [https://openreview.net/forum?id=d7v2iUSa9s¬eId=YoVTfEl2T5](https://openreview.net/forum?id=d7v2iUSa9s&noteId=YoVTfEl2T5)  
51. SkipGPT: Dynamic Layer Pruning Reinvented with Token ..., accessed January 3, 2026, [https://chatpaper.com/paper/146047](https://chatpaper.com/paper/146047)  
52. Token-Complexity based Routing Technique within Mixture of ..., accessed January 3, 2026, [https://openreview.net/forum?id=miyzT0uhhF](https://openreview.net/forum?id=miyzT0uhhF)  
53. TOKEN-EFFICIENCY BASED ROUTING TECHNIQUE \- OpenReview, accessed January 3, 2026, [https://openreview.net/pdf/8daaf66a8305dcfe6a2ae91cf82adf0862008c1a.pdf](https://openreview.net/pdf/8daaf66a8305dcfe6a2ae91cf82adf0862008c1a.pdf)  
54. Dynamic Mixture-of-Experts for Visual Autoregressive Model \- arXiv, accessed January 3, 2026, [https://arxiv.org/html/2510.08629v1](https://arxiv.org/html/2510.08629v1)  
55. (PDF) Dynamic Mixture-of-Experts for Visual Autoregressive Model, accessed January 3, 2026, [https://www.researchgate.net/publication/396457929\_Dynamic\_Mixture-of-Experts\_for\_Visual\_Autoregressive\_Model](https://www.researchgate.net/publication/396457929_Dynamic_Mixture-of-Experts_for_Visual_Autoregressive_Model)  
56. Sparse MoE Students for Efficient Knowledge Distillation, accessed January 3, 2026, [https://scholarworks.bwise.kr/cau/bitstream/2019.sw.cau/88838/1/Sparse%20MoE%20Students%20for%20Efficient%20Knowledge%20Distillation.pdf](https://scholarworks.bwise.kr/cau/bitstream/2019.sw.cau/88838/1/Sparse%20MoE%20Students%20for%20Efficient%20Knowledge%20Distillation.pdf)  
57. Distilling MoE-Based Knowledge from BERT into a Lighter Model, accessed January 3, 2026, [https://www.mdpi.com/2076-3417/14/14/6171](https://www.mdpi.com/2076-3417/14/14/6171)  
58. DistillMoE: Multi-Faceted Knowledge Distillation for Cross-Tokenizer ..., accessed January 3, 2026, [https://openreview.net/forum?id=VIYNWGb3TL](https://openreview.net/forum?id=VIYNWGb3TL)  
59. Adaptive Computation Time for Recurrent Neural Networks, accessed January 3, 2026, [https://www.researchgate.net/publication/301879022\_Adaptive\_Computation\_Time\_for\_Recurrent\_Neural\_Networks](https://www.researchgate.net/publication/301879022_Adaptive_Computation_Time_for_Recurrent_Neural_Networks)  
60. Encode-Think-Decode (ETD) Paradigm \- Emergent Mind, accessed January 3, 2026, [https://www.emergentmind.com/topics/encode-think-decode-etd](https://www.emergentmind.com/topics/encode-think-decode-etd)  
61. Recursive Latent Thoughts in Neural Models \- Emergent Mind, accessed January 3, 2026, [https://www.emergentmind.com/topics/recursive-latent-thoughts](https://www.emergentmind.com/topics/recursive-latent-thoughts)