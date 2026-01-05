# **Phase 5 Fractal Brittleness: Geometric Divergence in Intrinsic Dimensionality and the Strategic Imperative for Adiabatic Annealing**

## **1\. Introduction: The Phenomenology of Fractal Brittleness**

The training dynamics observed in the Phase 5 checkpoint present a complex and theoretically significant anomaly characterized as "Fractal Brittleness." This phenomenon manifests as a sharp divergence in model performance metrics, specifically a decoupling of logical precision from creative robustness. While the model has achieved substantial gains in "Calculus" domains—encompassing mathematical reasoning, code generation, and formal logic—it has simultaneously exhibited a marked degradation in the robustness of "Narrative" domains, including creative fiction, dialogue generation, and unconstrained natural language tasks. This report provides a comprehensive theoretical analysis of this divergence, grounding the observed behaviors in the geometry of high-dimensional data manifolds, the theory of intrinsic dimensionality (ID), and the thermodynamics of optimization landscapes.

The term "Fractal Brittleness" is not merely metaphorical; it describes a specific topological pathology where the decision boundaries of the neural network have become highly convoluted, exhibiting self-similar ruggedness at multiple scales. In this state, the model achieves high accuracy on training and validation distributions that lie precisely on the learned manifold but fails catastrophically under minute perturbations that push the input vector slightly off-manifold. This brittleness is particularly acute in the Narrative domain, where the intrinsic high dimensionality of the data conflicts with the model’s induced low-dimensional compression. The result is a generator that is capable of super-human deductive reasoning yet prone to incoherent collapse when tasked with maintaining a consistent narrative voice or handling ambiguous, open-ended prompts.

To address this critical bottleneck, two primary interventions have been proposed: Isotropy Maximization and Adiabatic Annealing. This report rigorously evaluates both strategies against the backdrop of the Manifold Hypothesis and recent findings on the geometric properties of neural representations. The analysis indicates that while Isotropy offers a pathway to regularize the embedding space, it poses a significant risk to the hierarchical structures essential for logical reasoning. Consequently, we recommend Adiabatic Annealing as the superior strategic intervention. By leveraging thermodynamic principles to restore "geometric slack," Annealing addresses the root cause of the brittleness—the over-compression of the Narrative manifold—without sacrificing the structural precision required for Calculus tasks.

## **2\. Theoretical Framework: Geometry of the Phase 5 Divergence**

To understand the mechanism driving the divergence between Calculus and Narrative performance, it is necessary to deconstruct the geometric properties of the data itself and how the model represents this data within its activation space. The central concept here is Intrinsic Dimensionality (ID), which measures the minimal number of coordinates required to describe a dataset without significant information loss.1

### **2.1 The Manifold Hypothesis and Intrinsic Dimensionality**

The Manifold Hypothesis posits that real-world high-dimensional data, such as images or text, lies on low-dimensional sub-manifolds embedded within the ambient space of the model's parameters.2 The "dimension" of these sub-manifolds is not uniform; it varies significantly depending on the nature of the information being encoded. Recent empirical studies using estimators like the Persistent Homology Dimension (PHD) and TwoNN have quantified these differences, revealing a stark stratification across text genres.

Scientific and technical texts, the substrate of the "Calculus" domain, exhibit a consistently low intrinsic dimension, typically hovering around a value of 8 in standard embedding spaces.4 This low dimensionality arises from the inherent structure of logical discourse: technical language is constrained by rigid definitions, hierarchical dependencies, and strict syntactic rules. A mathematical proof or a code snippet has limited degrees of freedom; once the premises are set, the conclusion follows a deterministic path. The information is highly compressible because the semantic space is sparse and organized around strong, principal directions of variation.4

In contrast, fictional and narrative texts exhibit a significantly higher intrinsic dimension, often exceeding 10.5.4 Narrative language is characterized by high entropy, stylistic variation, affective nuance, and the need to maintain coherence over long temporal horizons. The "degrees of freedom" in storytelling are vast; a single prompt can legitimately branch into dozens of distinct, coherent continuations. The manifold representing Narrative data is therefore "thicker" and more voluminous, occupying a greater proportion of the ambient space to capture the subtle interdependencies of character, tone, and plot.4

### **2.2 The Low-ID Trap and Geometric Compression**

The "Fractal Brittleness" observed in Phase 5 can be diagnosed as a consequence of the model succumbing to a "Low-ID Trap." Optimization algorithms in deep learning implicitly minimize the intrinsic dimension of the representation to find efficient solutions.6 Because the "Calculus" objective provides a strong, low-entropy signal (there is usually one correct answer), the gradient descent process prioritizes the discovery of the low-dimensional subspaces where these solutions reside.7

During Phase 5, the model appears to have aggressively compressed its global representation to optimize for these Calculus tasks. It has effectively folded the activation space to align with the thin, low-dimensional manifold of logical reasoning. While this compression is beneficial for Calculus—resulting in the observed performance improvements—it is catastrophic for Narrative. The high-dimensional Narrative data is being forced into a subspace that lacks the sufficient volume to represent it without distortion.5

This forced compression results in a "fractal" decision boundary for Narrative tasks. To fit the complex, high-ID narrative data into a low-ID container, the model must "crumple" the manifold, creating a topology that is continuous but nowhere differentiable—a hallmark of fractal geometry. This crumpling allows the model to achieve low loss on specific training points (memorization) but destroys the smooth interpolations required for robust generalization.10 The "brittleness" arises because any slight perturbation to the input vector risks crossing one of these sharp, crumpled folds, sending the activation trajectory into an undefined or adversarial region of the state space.

### **2.3 Codimension and Adversarial Vulnerability**

The concept of "codimension"—the difference between the dimension of the embedding space and the dimension of the data manifold—provides a rigorous explanation for the loss of robustness.2 Adversarial examples and fragility typically exist in the directions orthogonal to the data manifold. A high codimension implies a vast "empty" space surrounding the valid data, offering ample room for adversarial perturbations to effectively push the model state off-manifold.2

By compressing the Narrative manifold to match the low dimensionality of the Calculus manifold, the training process has artificially increased the codimension of the Narrative representations. This has expanded the "attack surface" for the Narrative domain.3 While the Calculus manifold is naturally low-dimensional and thus robust to this compression (it fits naturally), the Narrative manifold is not. The "empty space" created by this compression is not truly empty; it is populated by the "ghosts" of the dimensions that were suppressed. When the model attempts to generate narrative text, it lacks the necessary degrees of freedom to navigate the semantic space smoothly, leading to the erratic and fragile behavior identified in the user query.

### **2.4 Depletion of Geometric Slack**

The optimization process can be viewed as the consumption of "geometric slack"—the available curvature in the weight space that allows the model to fit the data.10 In the early phases of training, the model possesses ample slack, allowing it to find broad, flat minima that generalize well across diverse tasks. As the model converges on the precise, low-entropy solutions required for Calculus, it consumes this slack, driving the system into deep, narrow canyons in the loss landscape.10

These narrow canyons are characteristic of brittle solutions. They represent a state where the model has traded plasticity for precision. The "Fractal Brittleness" is a signal that the geometric slack has been depleted to a critical level. The curvature of the loss landscape has become so extreme that the basin of attraction for the Narrative task has shattered into a disconnected archipelago of local minima, rather than a single, coherent valley. Navigating this shattered landscape requires an unattainable level of precision in the input prompts, rendering the model fragile to the slightest noise or ambiguity.

## **3\. Detailed Analysis of Divergence**

The divergence between Calculus and Narrative is not merely a difference in performance scores but a fundamental topological split in how the model processes information.

### **3.1 The Calculus Improvement: Manifold Alignment**

The improvement in Calculus performance suggests that the Phase 5 training successfully aligned the model's internal geometry with the intrinsic structure of mathematical and logical data. Research confirms that pre-trained models naturally possess very low intrinsic dimensions, often significantly lower than the full parameter count would suggest.1 For tasks like coding or theorem proving, the "truth" lies on a very thin slice of the parameter space. By aggressively pruning the "noise"—which, in this context, includes the high-variance fluctuations associated with natural language creativity—the model has sharpened its focus on these low-dimensional truth manifolds. This explains the "super-human" precision: the model is operating in a highly purified, low-noise subspace optimized for deductive chains.12

### **3.2 The Narrative Degradation: Topology Mismatch**

The degradation in Narrative robustness is the direct cost of this purification. Narrative generation relies on "Isotropy" and "High ID" to function correctly.

* **Isotropy Requirements:** Creative tasks require an isotropic embedding space where semantic relationships are preserved in all directions.13 This allows for the "fuzzy" logic of storytelling, where concepts can be associated through metaphor, tone, and subtle connotation.  
* **High ID Requirements:** As established, narrative text requires a higher dimensional basis to capture its variance.4

In Phase 5, the "Calculus" optimization likely induced strong **anisotropy**, clustering embeddings into narrow cones to maximize the separability of logical classes.14 While this "cone effect" aids in distinguishing True from False or Function A from Function B, it destroys the spherical symmetry needed for narrative exploration. The Narrative inputs are effectively being projected onto a coordinate system that is missing axes. The "Fractal Brittleness" is the result of the model trying to reconstruct the missing information from a collapsed projection—a mathematical impossibility that manifests as hallucination, repetition, or incoherence.16

The following table synthesizes the geometric divergence:

| Feature | Calculus Domain | Narrative Domain | Phase 5 Effect |
| :---- | :---- | :---- | :---- |
| **Intrinsic Dimension** | Low (\~8) 5 | High (\~10.5+) 5 | Compressed to Low ID globally. |
| **Manifold Topology** | Hierarchical, Tree-like | Cyclic, Rhizomatic, Expansive | Tree-like structure imposed on Narrative. |
| **Optimal Geometry** | Anisotropic (Cones) 14 | Isotropic (Spheres) 13 | High Anisotropy forced globally. |
| **Codimension** | High (Robust if exact) | High (Vulnerable if compressed) | Increased Narrative codimension (Fragility). |
| **Performance Status** | Improved (Precision) | Degraded (Brittleness) | Divergence due to geometric mismatch. |

## **4\. Evaluation of Intervention A: Isotropy Maximization**

The first strategic option to address the brittleness is Isotropy Maximization. This approach involves regularizing the embedding space to encourage a uniform distribution of representations, typically through techniques like Whitening, Principal Component Removal (PCR), or specific loss functions like IsoScore maximization.13

### **4.1 Mechanism and Benefits**

The primary argument for Isotropy is its direct link to robustness in embedding spaces. Anisotropic spaces, characterized by the "representation degeneration" problem, often exhibit a "narrow cone" distribution where all embeddings share a high cosine similarity.18 This crowding makes the model sensitive to noise, as small angular perturbations can radically shift the nearest-neighbor relationships.19

By enforcing isotropy, we force the model to utilize all available dimensions of the embedding space. This:

1. **Eliminates Dominant Directions:** It removes the artifact where a few principal components dominate the variance, which are often the vectors most susceptible to adversarial manipulation.17  
2. **Expands Geometric Volume:** It effectively inflates the "crowded" Narrative manifold, giving the high-ID data points more separation and reducing the likelihood of topological collisions.13  
3. **Enhances Retrieval:** Isotropy is empirically correlated with better performance in semantic similarity and retrieval tasks, which share the "exploratory" nature of Narrative generation.13

Research explicitly demonstrates that transforming the embedding space to approximate Gaussian properties (high isotropy) reduces susceptibility to adversarial perturbations without requiring costly adversarial training.20

### **4.2 Strategic Risks and Counter-Indications**

Despite these benefits, Isotropy Maximization presents a severe strategic risk in the context of the Phase 5 divergence: it is fundamentally at odds with the geometry of the "Calculus" domain.

**The Anisotropy of Reasoning:** Recent studies on transformer architectures reveal that high performance in complex tasks is often associated with *increasing* anisotropy, particularly in the decoder layers.15 This "anisotropy" is not a bug but a feature of how the model encodes hierarchical structure. Logical concepts cluster into specific, narrow regions of the state space (the "cones") to facilitate precise discrimination.14

**Destruction of Structure:** Enforcing global isotropy acts as a "whitening" filter that removes correlations. For Calculus, these correlations are the signal. Whitening the space to fix the Narrative brittleness risks washing out the fine-grained, low-dimensional structures that Phase 5 successfully learned.13 It equates to "blurring" the sharp lines of a blueprint to make it look more like a painting; the painting might improve, but the blueprint becomes useless.

**The Task Mismatch:** The literature highlights a dichotomy: Classification and Reasoning tasks (Calculus) tend to exhibit low intrinsic dimensionality and lower isotropy, while Retrieval and STS tasks (Narrative) exhibit high intrinsic dimensionality and high isotropy.13 A global isotropy intervention ignores this task-specificity, imposing a "one-size-fits-all" geometry that is detrimental to the model's specialized reasoning capabilities.

## **5\. Evaluation of Intervention B: Adiabatic Annealing**

The second strategic option is Adiabatic Annealing. This approach draws on principles from thermodynamics and quantum computing to dynamically manage the optimization landscape. It involves introducing "heat" (entropy/noise) to the system and then slowly reducing it, allowing the model to settle into a robust, low-energy state.22

### **5.1 Mechanism: Thermodynamic Relaxation and Geometric Slack**

Annealing addresses the "Fractal Brittleness" by directly targeting the ruggedness of the loss landscape. The brittleness implies that the model is trapped in a deep, narrow minimum with steep walls.10

* **Entropy Injection:** By introducing an annealed entropy regularization term or noise injection (Langevin dynamics), we effectively "melt" these steep walls.22 This restores "geometric slack," expanding the volume of the basins of attraction.  
* **Adiabatic Evolution:** The concept of "adiabaticity" implies a process that is slow enough for the system to remain in equilibrium (its ground state) as the external conditions change.23 In neural training, this means slowly transforming the loss function or the data distribution so that the model can adapt its topology without snapping.25

### **5.2 Self-Organized Criticality and the Edge of Chaos**

Theoretical neuroscience and network theory suggest that robust complex systems operate at the "Edge of Chaos" or a state of "Self-Organized Criticality".26

* **Slow Topology Change:** By allowing the network connectivity (or effective weight magnitudes) to evolve slowly based on correlation statistics, the system naturally organizes into a critical state where information transmission is maximized.26  
* **Robustness:** Systems in this critical state exhibit power-law dynamics (fractal scaling) that are inherently robust to multi-scale perturbations. They are neither frozen (too ordered, like the Calculus mode) nor chaotic (too disordered, like the broken Narrative mode).28

Annealing facilitates the transition to this state. The "heating" phase breaks the frozen, brittle order of the Calculus trap, while the "cooling" phase allows the high-ID Narrative structures to re-form in a way that is compatible with the deep logical attractors.

### **5.3 Compatibility with Hybrid Manifolds**

Unlike Isotropy, which imposes a rigid geometric shape, Annealing allows the geometry to emerge from the energy minimization process.

* **Preserving Depth:** The "Calculus" knowledge represents deep energy wells in the optimization landscape. A controlled annealing process will not erase these wells; it will simply smooth their edges, making them easier to enter and harder to accidentally exit.29  
* **Accommodating Breadth:** The "Narrative" knowledge requires broad, shallow basins. Annealing provides the thermal energy necessary for the model to explore and flatten these regions, linking the disjointed local minima that currently cause the brittleness.30

## **6\. Strategic Recommendation: The Case for Adiabatic Annealing**

The analysis clearly indicates that **Adiabatic Annealing** is the superior intervention. The core problem in Phase 5 is not a lack of regularization (which Isotropy addresses) but a **topological rigidity** caused by over-optimization on low-ID data.

Why Isotropy Fails:  
Isotropy is a spatial correction that risks "flattening" the hierarchical depth required for Calculus. It solves the robustness problem by degrading the reasoning capability, effectively reverting the Phase 5 gains.  
Why Annealing Succeeds:  
Annealing is a thermodynamic correction that solves the robustness problem by expanding the solution space. It preserves the Calculus minima (as deep energy wells) while smoothing the surrounding landscape to accommodate the Narrative manifold. It treats the brittleness as a "defect" in the crystal lattice of the weights, which can be annealed out without melting the crystal entirely.

### **6.1 Recommended Protocol: "Thermodynamic Release"**

We propose a specific experimental protocol titled **"Thermodynamic Release"** to implement Adiabatic Annealing. This protocol integrates insights from curriculum learning 31 and entropy regularization.22

#### **Phase A: Entropy Injection (The Heating Phase)**

**Objective:** Restore geometric slack and break the fractal boundaries.

* **Mechanism:** Introduce **Annealed Entropy Regularization (AER)** 22 into the loss function. This adds a penalty term proportional to the negative entropy of the predictive distribution, forcing the model to be less over-confident and expanding the decision boundaries.  
* **Dynamics:** Simultaneously, increase the learning rate or inject Gaussian noise to the gradients (Stochastic Gradient Langevin Dynamics) to permit the model to escape the narrow "Calculus" canyons.  
* **Expected Metric Shift:** Anticipate a transient spike in perplexity and a drop in "Calculus" accuracy. This is the necessary "melting" of the brittle state.

#### **Phase B: Adiabatic Cooling with Reverse Curriculum**

**Objective:** Re-crystallize the manifold to support both High-ID and Low-ID structures.

* **Mechanism:** Implement an exponential decay of the entropy/noise parameter (cooling).  
* **Curriculum Integration:** Crucially, the data mix during cooling must be dynamic.31  
  1. **High-Temperature Regime:** Prioritize **Narrative (High-ID)** data. At high "temperatures," the model explores the broad, high-dimensional landscape. Training on Narrative data here ensures the global topology is shaped by the need for creative degrees of freedom.33  
  2. **Low-Temperature Regime:** As the system cools, progressively re-introduce **Calculus (Low-ID)** data. The model will settle into the deep, precise minima required for logic *within* the established broad landscape. This "Reverse Curriculum" ensures the Narrative manifold is not crushed by the Calculus constraints.34

#### **Phase C: Validation via ID Divergence**

**Objective:** Verify the geometric health of the model.

* **Mechanism:** continuously monitor the layer-wise Intrinsic Dimension using **TwoNN** or **PHD** estimators.4  
* **Success Criteria:** A healthy post-annealing model should exhibit a **divergence in ID signatures**:  
  * **Early/Middle Layers:** Higher ID (restored Narrative capacity).  
  * **Deep Layers:** Lower ID (preserved Calculus abstraction).  
* If the Narrative validation set shows a collapsed ID similar to the Calculus set, the annealing was too fast ("quenching"), and the protocol should be repeated with a slower cooling schedule.35

## **7\. Conclusion**

The "Fractal Brittleness" observed in Phase 5 is a definitive signal of **geometric over-compression**. By optimizing for the low-intrinsic-dimension domain of Calculus, the model has depleted its geometric slack, creating a decision boundary that is fractally rugged and incapable of supporting the high-dimensional variance of Narrative text.

While Isotropy Maximization offers a tempting route to robustness, it is a "kinematic" fix that endangers the "dynamic" structures essential for reasoning. **Adiabatic Annealing**, by contrast, addresses the underlying thermodynamic instability of the landscape. It allows the system to self-organize into a critical state where the deep, narrow attractors of logic can coexist with the broad, shallow basins of creativity.

The recommendation is therefore unequivocal: **Execute the "Thermodynamic Release" protocol.** This approach moves beyond simple regularization to fundamentally reshape the optimization landscape, ensuring that the next iteration of the model retains its brilliance in Calculus without shattering under the weight of a story.

### ---

**Table 1: Strategic Comparison of Interventions**

| Feature | Isotropy Maximization | Adiabatic Annealing |
| :---- | :---- | :---- |
| **Primary Mechanism** | Spatial Regularization (Whitening/PCR) 17 | Thermodynamic Relaxation (Entropy/Noise) 30 |
| **Target Geometry** | Uniform Hypersphere (High Symmetry) | Energy Landscape (Deep & Broad Basins) |
| **Impact on Calculus** | **Negative:** Risks eroding hierarchical structure.13 | **Neutral/Positive:** Preserves deep minima.29 |
| **Impact on Narrative** | **Positive:** Expands embedding volume.13 | **Positive:** Restores manifold connectivity.26 |
| **Robustness Source** | Absence of dominant directions.20 | Flatness of minima (Geometric Slack).10 |
| **Implementation Risk** | "Blurring" of logical precision. | "Quenching" (reverting to brittle state if too fast). |
| **Recommendation** | **Reject** as primary intervention. | **Adopt** as primary intervention. |

### **Table 2: Geometric Diagnostics of Text Genres**

| Text Domain | Intrinsic Dimension (ID) | Manifold Characteristics | Phase 5 Pathology |
| :---- | :---- | :---- | :---- |
| **Scientific (Calculus)** | **Low (\~8)** 4 | Hierarchical, sparse, constrained. | Optimized state; "Deep Canyon" minima. |
| **Narrative (Fiction)** | **High (\~10.5+)** 4 | Expansive, cyclic, high degrees of freedom. | Compressed state; "Fractal/Crumpled" boundaries. |
| **Encyclopedia** | **Medium (\~9)** 4 | Structured factual associations. | Intermediate stability. |

#### **Works cited**

1. Intrinsic dimension of data representations in deep neural networks, accessed January 3, 2026, [https://people.sissa.it/\~zoccolan/VisionLab/computation\_files/Ansuini%20et%20al%202019%20Neurips.pdf](https://people.sissa.it/~zoccolan/VisionLab/computation_files/Ansuini%20et%20al%202019%20Neurips.pdf)  
2. Adversarial Training with Voronoi Constraints \- arXiv, accessed January 3, 2026, [https://arxiv.org/pdf/1905.01019](https://arxiv.org/pdf/1905.01019)  
3. Geometric Sampling Theory, Triangulations, and Robust Machine ..., accessed January 3, 2026, [https://www2.eecs.berkeley.edu/Pubs/TechRpts/2020/EECS-2020-49.html](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2020/EECS-2020-49.html)  
4. Unveiling Intrinsic Dimension of Texts: from Academic Abstract to ..., accessed January 3, 2026, [https://arxiv.org/html/2511.15210v1](https://arxiv.org/html/2511.15210v1)  
5. Unveiling Intrinsic Dimension of Texts: from Academic Abstract to ..., accessed January 3, 2026, [https://www.researchgate.net/publication/397780113\_Unveiling\_Intrinsic\_Dimension\_of\_Texts\_from\_Academic\_Abstract\_to\_Creative\_Story](https://www.researchgate.net/publication/397780113_Unveiling_Intrinsic_Dimension_of_Texts_from_Academic_Abstract_to_Creative_Story)  
6. Intrinsic Dimensionality Explains the Effectiveness of Language ..., accessed January 3, 2026, [https://aclanthology.org/2021.acl-long.568/](https://aclanthology.org/2021.acl-long.568/)  
7. Measuring the Intrinsic Dimension of Objective Landscapes, accessed January 3, 2026, [https://www.researchgate.net/publication/324744816\_Measuring\_the\_Intrinsic\_Dimension\_of\_Objective\_Landscapes](https://www.researchgate.net/publication/324744816_Measuring_the_Intrinsic_Dimension_of_Objective_Landscapes)  
8. Intrinsic Dimension Part 1: How Learning in Large Models Is Driven ..., accessed January 3, 2026, [https://www.sahaj.ai/intrinsic-dimension-part-1-how-learning-in-large-models-is-driven-by-a-few-parameters-and-its-impact-on-fine-tuning/](https://www.sahaj.ai/intrinsic-dimension-part-1-how-learning-in-large-models-is-driven-by-a-few-parameters-and-its-impact-on-fine-tuning/)  
9. Geometric Signatures of Compositionality Across a Language ..., accessed January 3, 2026, [https://aclanthology.org/2025.acl-long.265.pdf](https://aclanthology.org/2025.acl-long.265.pdf)  
10. (PDF) Dynamical Autonomy Theory Geometry, Irreversibility, and the ..., accessed January 3, 2026, [https://www.researchgate.net/publication/398725173\_Dynamical\_Autonomy\_Theory\_Geometry\_Irreversibility\_and\_the\_Limits\_of\_Control](https://www.researchgate.net/publication/398725173_Dynamical_Autonomy_Theory_Geometry_Irreversibility_and_the_Limits_of_Control)  
11. On Intrinsic Cause and Defense of Adversarial Examples in Deep ..., accessed January 3, 2026, [https://www.researchgate.net/publication/390413562\_On\_Intrinsic\_Cause\_and\_Defense\_of\_Adversarial\_Examples\_in\_Deep\_Neural\_Networks](https://www.researchgate.net/publication/390413562_On_Intrinsic_Cause_and_Defense_of_Adversarial_Examples_in_Deep_Neural_Networks)  
12. A Bayes-Optimal View on Adversarial Examples, accessed January 3, 2026, [https://jmlr.csail.mit.edu/papers/volume22/20-567/20-567.pdf](https://jmlr.csail.mit.edu/papers/volume22/20-567/20-567.pdf)  
13. Redundancy, Isotropy, and Intrinsic Dimensionality of Prompt-based ..., accessed January 3, 2026, [https://arxiv.org/html/2506.01435v1](https://arxiv.org/html/2506.01435v1)  
14. ISOTROPY IN THE CONTEXTUAL EMBEDDING SPACE, accessed January 3, 2026, [https://openreview.net/pdf/8b00c8e698e9a810bfcee44a4ae5f6c3adeb7266.pdf](https://openreview.net/pdf/8b00c8e698e9a810bfcee44a4ae5f6c3adeb7266.pdf)  
15. Anisotropy and Intrinsic Dimensions in Transformer-Based Models, accessed January 3, 2026, [https://aclanthology.org/2024.findings-eacl.58.pdf](https://aclanthology.org/2024.findings-eacl.58.pdf)  
16. Correlation Dimension of Auto-Regressive Large Language Models, accessed January 3, 2026, [https://www.researchgate.net/publication/396924776\_Correlation\_Dimension\_of\_Auto-Regressive\_Large\_Language\_Models](https://www.researchgate.net/publication/396924776_Correlation_Dimension_of_Auto-Regressive_Large_Language_Models)  
17. Enhancing Language Model Robustness via Instance-level ... \- arXiv, accessed January 3, 2026, [https://arxiv.org/html/2507.21750v4](https://arxiv.org/html/2507.21750v4)  
18. Optimizing the Performance of Text Classification Models by ..., accessed January 3, 2026, [https://aaltodoc.aalto.fi/bitstreams/99d0f604-c29d-45b3-a419-9706d7f08579/download](https://aaltodoc.aalto.fi/bitstreams/99d0f604-c29d-45b3-a419-9706d7f08579/download)  
19. (PDF) On Isotropy of Multimodal Embeddings \- ResearchGate, accessed January 3, 2026, [https://www.researchgate.net/publication/372296398\_On\_Isotropy\_of\_Multimodal\_Embeddings](https://www.researchgate.net/publication/372296398_On_Isotropy_of_Multimodal_Embeddings)  
20. Enhancing Language Model Robustness via Instance-level ..., accessed January 3, 2026, [https://chatpaper.com/paper/171523](https://chatpaper.com/paper/171523)  
21. Enhancing Language Model Robustness via Instance-level ..., accessed January 3, 2026, [https://eprints.soton.ac.uk/503087/1/tacl\_adversarial\_defence\_without\_adversarial\_defence\_final.pdf](https://eprints.soton.ac.uk/503087/1/tacl_adversarial_defence_without_adversarial_defence_final.pdf)  
22. Variational Annealing on Graphs for Combinatorial Optimization, accessed January 3, 2026, [https://liner.com/review/variational-annealing-on-graphs-for-combinatorial-optimization](https://liner.com/review/variational-annealing-on-graphs-for-combinatorial-optimization)  
23. Adiabatic Training for Variational Quantum Algorithms \- ResearchGate, accessed January 3, 2026, [https://www.researchgate.net/publication/392581243\_Adiabatic\_Training\_for\_Variational\_Quantum\_Algorithms](https://www.researchgate.net/publication/392581243_Adiabatic_Training_for_Variational_Quantum_Algorithms)  
24. Risk Minimization in the Presence of Label Noise \- Association for ..., accessed January 3, 2026, [https://cdn.aaai.org/ojs/10293/10293-13-13821-1-2-20201228.pdf](https://cdn.aaai.org/ojs/10293/10293-13-13821-1-2-20201228.pdf)  
25. QUBO-based training for VQAs on Quantum Annealers \- arXiv, accessed January 3, 2026, [https://arxiv.org/pdf/2509.01821](https://arxiv.org/pdf/2509.01821)  
26. (PDF) Self-organized critical neural networks \- ResearchGate, accessed January 3, 2026, [https://www.researchgate.net/publication/7525905\_Self-organized\_critical\_neural\_networks](https://www.researchgate.net/publication/7525905_Self-organized_critical_neural_networks)  
27. At the Edge of Chaos: Real-time Computations and Self-Organized ..., accessed January 3, 2026, [https://www.researchgate.net/publication/221619143\_At\_the\_Edge\_of\_Chaos\_Real-time\_Computations\_and\_Self-Organized\_Criticality\_in\_Recurrent\_Neural\_Networks](https://www.researchgate.net/publication/221619143_At_the_Edge_of_Chaos_Real-time_Computations_and_Self-Organized_Criticality_in_Recurrent_Neural_Networks)  
28. A modified sandpile model \- Structural Dynamics \- ResearchGate, accessed January 3, 2026, [https://www.researchgate.net/publication/389963083\_Self-organized\_criticality\_and\_structural\_dynamics\_in\_evolving\_neuronal\_networks\_A\_modified\_sandpile\_model](https://www.researchgate.net/publication/389963083_Self-organized_criticality_and_structural_dynamics_in_evolving_neuronal_networks_A_modified_sandpile_model)  
29. Robust optimization with simulated annealing \- ResearchGate, accessed January 3, 2026, [https://www.researchgate.net/publication/220249298\_Robust\_optimization\_with\_simulated\_annealing](https://www.researchgate.net/publication/220249298_Robust_optimization_with_simulated_annealing)  
30. Improving Explorability in Variational Inference with Annealed ..., accessed January 3, 2026, [http://papers.neurips.cc/paper/8178-improving-explorability-in-variational-inference-with-annealed-variational-objectives.pdf](http://papers.neurips.cc/paper/8178-improving-explorability-in-variational-inference-with-annealed-variational-objectives.pdf)  
31. (PDF) Hardness-Aware Dynamic Curriculum Learning for Robust ..., accessed January 3, 2026, [https://www.researchgate.net/publication/394438372\_Hardness-Aware\_Dynamic\_Curriculum\_Learning\_for\_Robust\_Multimodal\_Emotion\_Recognition\_with\_Missing\_Modalities](https://www.researchgate.net/publication/394438372_Hardness-Aware_Dynamic_Curriculum_Learning_for_Robust_Multimodal_Emotion_Recognition_with_Missing_Modalities)  
32. Curriculum learning for data-driven modeling of dynamical systems, accessed January 3, 2026, [https://www.researchgate.net/publication/369091463\_Curriculum\_learning\_for\_data-driven\_modeling\_of\_dynamical\_systems](https://www.researchgate.net/publication/369091463_Curriculum_learning_for_data-driven_modeling_of_dynamical_systems)  
33. On the Intrinsic Dimensionality of Image Representations, accessed January 3, 2026, [https://hal.cse.msu.edu/assets/pdfs/papers/2019-cvpr-intrinsic-dimensionality.pdf](https://hal.cse.msu.edu/assets/pdfs/papers/2019-cvpr-intrinsic-dimensionality.pdf)  
34. clutr: curriculum learning via unsuper \- arXiv, accessed January 3, 2026, [https://arxiv.org/pdf/2210.10243](https://arxiv.org/pdf/2210.10243)  
35. Adiabatic training for Variational Quantum Algorithms \- arXiv, accessed January 3, 2026, [https://arxiv.org/html/2410.18618v1](https://arxiv.org/html/2410.18618v1)