# **YAML Specification for SAPE-Agent Default SEE Configurations**

## **1\. Introduction**

The SAPE-Agent (Structured Agent Prompt Engineering Agent, or similar interpretation based on context) leverages evolutionary algorithms (EAs) to optimize or generate solutions, likely involving prompts, code, or structured data configurations. Central to its operation is the Search-Evaluate-Evolve (SEE) loop, a cyclical process comprising Mutation, Evaluation, Selection, and Termination phases common in evolutionary computation.1

This document defines a standardized YAML (YAML Ain't Markup Language) specification for configuring these SEE phases within the SAPE-Agent. The goal is to provide a clear, extensible, and human-readable format for defining default operational parameters and allowing for specialized configurations (variants) tailored to specific task complexities or application domains. Establishing robust defaults ensures baseline functionality, while variants offer the flexibility needed to adapt the evolutionary search process for optimal performance across diverse problem landscapes, such as complex reasoning tasks or structured data generation.

## **2\. Core SEE Concepts in SAPE-Agent**

The SEE loop drives the evolutionary process within the SAPE-Agent. Understanding each phase is essential for configuring the agent effectively:

* **Mutation:** This phase introduces variation into the population of candidate solutions (e.g., prompts, code snippets, configurations). Mutations are typically small, random changes intended to explore the solution space. For SAPE-Agent, mutation might involve altering words in a prompt, modifying parameters in a configuration, changing nodes in a program tree 3, or applying grammar-constrained modifications to ensure syntactic validity, especially for structured outputs like code or queries. The type and rate of mutation significantly impact the balance between exploration (searching new areas) and exploitation (refining existing solutions).  
* **Evaluation:** Each candidate solution in the population must be assessed for its quality or "fitness." This involves executing or applying the solution and measuring its performance against a defined objective.5 For SAPE-Agent, evaluation could involve:  
  * Executing a generated code snippet and checking its output.  
  * Submitting a generated prompt to an LLM and evaluating the response using metrics like ROUGE, BLEU, semantic similarity, or correctness.  
  * Using an "LLM-as-a-judge" approach, where another LLM assesses the quality of the generated output based on predefined criteria or rubrics. This is particularly useful for complex or open-ended tasks where simple metrics are insufficient. Mitigating biases (positional, verbosity, narcissistic) and ensuring consistency are key challenges in LLM-based evaluation.7  
  * Validating generated structured data (e.g., XML, JSON, SPARQL queries) against a schema or executing queries against a database. The fitness function quantifies this assessment, guiding the selection process.  
* **Selection:** Based on their fitness scores, individuals are chosen from the current population to become "parents" for the next generation.1 Common strategies include:  
  * *Tournament Selection:* Randomly selects a small subset of individuals and chooses the fittest among them.  
  * *Roulette Wheel Selection:* Selects individuals with a probability proportional to their fitness.  
  * *Elitism:* Ensures the best individual(s) from the current generation automatically carry over to the next, preventing loss of good solutions. Selection pressure determines how strongly fitness influences the probability of reproduction.  
* **Termination:** This defines the conditions under which the evolutionary process stops. Common criteria include reaching a maximum number of generations, finding a solution that meets a predefined fitness threshold, or observing stagnation (lack of improvement over several generations).5

## **3\. YAML Specification Design Principles**

The proposed YAML specification adheres to the following principles:

* **Readability:** YAML's human-readable format facilitates easy understanding and modification of configurations. Indentation defines structure, and comments (\#) provide explanations.  
* **Modularity:** Configuration is broken down by SEE phase (mutation, evaluation, selection, termination), allowing focused adjustments. Specific operators or functions within each phase are referenced by name.  
* **Extensibility:** The structure allows for easy addition of new operators, fitness functions, selection methods, or termination conditions simply by defining their parameters within the YAML and ensuring the underlying SAPE-Agent framework can load and interpret them.  
* **Defaults and Overrides:** A see\_defaults section provides a baseline configuration. A variants section allows defining named configurations that selectively override these defaults, enabling task-specific tuning without duplicating the entire configuration.11

## **4\. Default SEE Configuration (see\_defaults)**

This section defines the baseline configuration intended for general-purpose use or as a starting point for customization.

YAML

\# Default Search-Evaluate-Evolve (SEE) Configuration for SAPE-Agent  
see\_defaults:  
  \# \--- Population Settings \---  
  population\_size: 50          \# Number of individuals in each generation  
  initialization:  
    method: "random\_sampling"  \# Method to create the initial population (e.g., random, seed-based)  
    \# Parameters specific to the initialization method can be added here  
    \# e.g., seed\_files: \["path/to/seed1.txt", "path/to/seed2.txt"\] for seed-based init

  \# \--- Mutation Phase \---  
  mutation:  
    operator: "standard\_mutation" \# Name of the default mutation operator registered in the agent  
    parameters:  
      rate: 0.1                 \# Probability of applying mutation to an individual  
      \# Operator-specific parameters below:  
      \# Example for a simple text/prompt mutation:  
      change\_probability: 0.05  \# Probability of changing a single element (e.g., word) if mutation occurs  
      \# Example for potential grammar-based mutation (if applicable by default):  
      \# grammar\_file: null        \# Path to grammar definition (e.g., ANTLR.g4, JSON)  
      \# max\_mutations\_per\_ind: 3 \# Limit changes per individual

  \# \--- Evaluation Phase \---  
  evaluation:  
    fitness\_function: "llm\_judge\_relevance" \# Name of the default fitness function  
    parameters:  
      \# Function-specific parameters below:  
      judge\_model: "gpt-4o-mini" \# LLM used for evaluation  
      evaluation\_prompt: \>      \# Multi-line prompt template for the judge  
        Evaluate the relevance of the generated response based on the initial query.  
        Query: {query}  
        Response: {response}  
        Score on a scale of 0.0 (irrelevant) to 1.0 (highly relevant).  
        Output only the score.  
      metric: "score"           \# Key in the judge's output containing the fitness value  
      \# Optional: Ground truth data or reference for comparison (if not purely LLM-judge based)  
      \# reference\_data: null  
      \# comparison\_metric: "BLEU" \# e.g., BLEU, ROUGE, Exact Match

  \# \--- Selection Phase \---  
  selection:  
    method: "tournament"        \# Default selection strategy \[1, 2\]  
    parameters:  
      tournament\_size: 5        \# Number of individuals competing in each tournament  
      elitism: 1                \# Number of best individuals to carry over directly

  \# \--- Termination Phase \---  
  termination:  
    conditions:                 \# List of conditions (logical OR)  
      \- type: "max\_generations"  
        value: 100  
      \- type: "fitness\_threshold"  
        value: 0.95  
        \# Optional: Check threshold only every N generations  
        \# check\_interval: 5  
    \# Could add other types like 'stagnation'  
    \# \- type: "stagnation"  
    \#   generations: 10 \# Stop if best fitness doesn't improve for 10 generations  
    \#   tolerance: 0.001 \# Minimum improvement required

**Default Configuration Rationale:**

* **Population Size (50):** A moderate size balancing diversity and computational cost for general tasks.  
* **Mutation (standard\_mutation, rate 0.1):** A relatively low mutation rate encourages exploitation of good solutions while still allowing exploration. The specific standard\_mutation operator would need to be defined within the SAPE-Agent framework (e.g., simple random changes suitable for text).  
* **Evaluation (llm\_judge\_relevance, gpt-4o-mini):** Leverages a capable LLM for nuanced evaluation, focusing on relevance as a common default requirement. Using a smaller, faster judge model like gpt-4o-mini balances cost and capability for default use. The prompt is simple and direct.  
* **Selection (tournament, size 5, elitism 1):** Tournament selection is robust and commonly used.1 A size of 5 provides reasonable selection pressure. Elitism ensures the best solution found so far is never lost.12  
* **Termination (max\_generations 100, fitness\_threshold 0.95):** Provides both a hard stop (generations) and a goal-oriented stop (fitness), common in EA setups.5

## **5\. Variant Configurations (variants)**

Variants allow tailoring the SEE loop for specific needs by overriding default parameters.

**Rationale for Variants:**

* **Task Complexity:** Simple tasks might benefit from faster convergence (less exploration), while complex tasks (e.g., multi-step reasoning, creative generation) often require more exploration.  
* **Domain Specificity:** The nature of the solution space changes drastically between domains. Generating structured data like SPARQL queries requires different mutation (grammar-based) and evaluation (query execution, schema validation) than optimizing a free-form text prompt.  
* **Resource Constraints:** Larger populations or more complex evaluations increase computational cost. Variants can define resource-aware configurations.

**Example Variants:**

YAML

variants:  
  \- name: "simple\_task\_fast\_convergence"  
    description: "Optimized for simpler tasks where rapid convergence is desired. Less exploration."  
    overrides:  
      population\_size: 30  
      mutation:  
        parameters:  
          rate: 0.05 \# Lower mutation rate  
      selection:  
        parameters:  
          tournament\_size: 3 \# Lower selection pressure  
      termination:  
        conditions:  
          \- type: "max\_generations"  
            value: 50 \# Fewer generations needed  
          \- type: "fitness\_threshold"  
            value: 0.98 \# Higher threshold, assuming simpler task allows near-perfect solutions

  \- name: "complex\_reasoning\_high\_exploration"  
    description: "For complex reasoning or creative tasks requiring more exploration to avoid local optima."  
    overrides:  
      population\_size: 100 \# Larger population for more diversity  
      mutation:  
        operator: "diverse\_mutation\_suite" \# Assumes an operator combining multiple mutation types  
        parameters:  
          rate: 0.20 \# Higher mutation rate  
          \# Parameters for the suite might include probabilities for different sub-operators  
          word\_swap\_prob: 0.3  
          sentence\_reorder\_prob: 0.2  
          synonym\_replacement\_prob: 0.3  
          concept\_injection\_prob: 0.2 \# Potentially using external knowledge  
      evaluation:  
        fitness\_function: "llm\_judge\_multi\_criteria" \# Evaluate coherence, correctness, depth  
        parameters:  
          judge\_model: "gpt-4-turbo" \# More powerful judge model needed  
          evaluation\_prompt: \>  
            Evaluate the response based on Query: {query}. Assess Coherence (1-5),  
            Correctness (1-5), and Depth (1-5). Response: {response}.  
            Output JSON: {"coherence": score, "correctness": score, "depth": score, "overall": weighted\_avg}  
          metric: "overall" \# Use a composite score  
          \# Techniques like Chain-of-Thought or Rubrics could be embedded here \[7, 13\]  
      selection:  
        parameters:  
          tournament\_size: 7 \# Higher selection pressure to favor promising diverse solutions  
      termination:  
        conditions:  
          \- type: "max\_generations"  
            value: 200 \# Allow more time for exploration  
          \- type: "fitness\_threshold" \# Threshold might be lower due to complexity  
            value: 0.85  
          \- type: "stagnation"  
            generations: 20  
            tolerance: 0.005

  \- name: "structured\_data\_gen\_xml"  
    description: "Variant for generating syntactically correct XML based on a schema, using grammar-based mutation."  
    overrides:  
      mutation:  
        operator: "grammar\_mutation" \# Operator specifically designed for grammar constraints  
        parameters:  
          rate: 0.15  
          grammar\_file: "schemas/my\_schema.xml.g4" \# Path to an ANTLR grammar for the target XML  
          \# Specific grammar mutation parameters (e.g., node insertion/deletion prob)  
          max\_tree\_depth: 10  
      evaluation:  
        fitness\_function: "xml\_validation\_and\_content"  
        parameters:  
          schema\_file: "schemas/my\_schema.xsd" \# XSD for validation  
          validation\_weight: 0.6 \# Weight for syntactic validity  
          content\_metric: "semantic\_similarity\_to\_target" \# Compare content to a target description  
          content\_weight: 0.4  
          \# Could use libraries like lxml or ElementTree for validation  
      \# Selection and Termination might remain default or be slightly adjusted

  \- name: "knowledge\_graph\_qa\_sparql"  
    description: "Variant for generating SPARQL queries for Knowledge Graph QA tasks."  
    overrides:  
      mutation:  
        operator: "grammar\_mutation" \# SPARQL also has a formal grammar  
        parameters:  
          rate: 0.15  
          grammar\_file: "grammars/sparql\_1.1.g4" \# Example SPARQL grammar  
          \# Consider semantic mutations: replacing properties/classes with similar ones from schema?  
      evaluation:  
        fitness\_function: "sparql\_execution\_and\_correctness"  
        parameters:  
          sparql\_endpoint: "http://example.org/sparql" \# Target endpoint  
          \# Could use LangChain's RdfGraph or similar tools  
          expected\_results\_query: "SELECT?expected WHERE {... }" \# Query to get ground truth  
          comparison\_method: "result\_set\_overlap" \# Jaccard index or similar on results  
          execution\_weight: 0.5 \# Weight for query executing without errors  
          correctness\_weight: 0.5 \# Weight for matching expected results  
          \# Penalty for overly complex or slow queries?  
      \# Selection/Termination might favor simpler, correct queries faster

**Summary Tables:**

**Table 1: Default SEE Configuration Parameters**

| Phase | Parameter | Default Value | Rationale |
| :---- | :---- | :---- | :---- |
| Population | population\_size | 50 | Balance diversity and cost. |
| Mutation | operator | standard\_mutation | General-purpose text mutation (agent-defined). |
|  | rate | 0.1 | Moderate exploration/exploitation balance. |
| Evaluation | fitness\_function | llm\_judge\_relevance | Common requirement, uses capable LLM judge. |
|  | judge\_model | gpt-4o-mini | Balance cost and capability for default use. |
| Selection | method | tournament | Robust and common selection method.1 |
|  | tournament\_size | 5 | Moderate selection pressure. |
|  | elitism | 1 | Preserve best solution found.12 |
| Termination | conditions | Max Gens: 100, Fitness: 0.95 | Provides both time limit and goal orientation.5 |

**Table 2: Example Variant Overrides**

| Variant Name | Key Overrides | Rationale |
| :---- | :---- | :---- |
| simple\_task\_fast\_convergence | Lower pop size, mutation rate, tournament size; fewer generations. | Prioritize speed and exploitation for easier problems. |
| complex\_reasoning\_high\_exploration | Larger pop size, higher mutation rate (suite), stronger judge, more generations, stagnation check. | Increase diversity and search time for difficult, potentially deceptive landscapes. |
| structured\_data\_gen\_xml | Grammar mutation operator, XML schema validation \+ content fitness. | Ensure syntactic validity via grammar, evaluate against schema and content goals. |
| knowledge\_graph\_qa\_sparql | Grammar mutation (SPARQL), SPARQL execution \+ result correctness fitness using endpoint. | Generate valid SPARQL, evaluate by execution success and result accuracy against a KG. |

## **6\. Integration and Usage Notes**

* **Loading Configuration:** The SAPE-Agent application should utilize a standard Python YAML library (e.g., PyYAML, ruamel.yaml) to parse the configuration file. The loading logic must first parse see\_defaults and then, if a variant is specified, parse the corresponding entry in the variants list and merge its overrides dictionary onto the defaults, replacing existing keys.  
* **Selecting Variants:** The desired variant can be selected via mechanisms like a command-line argument (--variant complex\_reasoning\_high\_exploration), an environment variable (SAPE\_VARIANT=...), or programmatically based on task analysis. The loading logic needs to implement this selection and merging process.  
* **Configuration Validation:** To prevent runtime errors due to malformed or incorrect configuration files, it is highly recommended to use a schema validation tool. A JSONSchema definition can be created to describe the expected structure, data types (string, integer, float, list, enum for operator names), and required fields of the YAML configuration. Libraries like jsonschema in Python can validate the loaded YAML data against this schema before the agent initializes its SEE components. This ensures robustness, particularly as configurations become more complex.  
* **Extensibility:** The SAPE-Agent framework should implement a registration pattern for SEE components (mutation operators, fitness functions, selection methods, termination conditions). This allows new components to be added to the codebase and then referenced by their registered name (e.g., "my\_custom\_mutation") within the YAML configuration without modifying the core loading or SEE loop logic.

## **7\. Recommendations for Extension**

The proposed YAML specification provides a solid foundation. Future enhancements could include:

* **New Operators/Methods:** As novel SEE techniques are developed for SAPE-Agent (e.g., new mutation strategies for specific data types, advanced selection mechanisms like NSGA-II for multi-objective optimization, different LLM-judge rubrics 13), their corresponding configuration parameters can be added under the relevant phase (mutation, evaluation, etc.) in the YAML schema.  
* **Finer-Grained Control:**  
  * *Adaptive Parameters:* Introduce configurations where parameters like mutation.rate or selection.tournament\_size can change dynamically *during* the evolutionary run based on population statistics (e.g., diversity, fitness improvement rate). This might involve adding an adaptive block within parameter sections.  
  * *Conditional Settings:* Allow parameters to depend on the generation number or other state variables (e.g., use a higher mutation rate for the first 20 generations).  
* **Advanced Variant Logic:** Move beyond simple named variants to allow selection based on multiple criteria (e.g., task\_type: reasoning, resource\_level: high) or dynamic task analysis performed by the agent at startup. This might require a more complex variant definition or selection mechanism.  
* **Integration with Experiment Tracking:** Facilitate better reproducibility and analysis by automatically logging the loaded SEE configuration (defaults \+ chosen variant overrides) to experiment tracking platforms (e.g., MLflow, Weights & Biases, LangSmith). This ensures that every experiment run is associated with the exact configuration used.

## **8\. Conclusion**

This document provides a concrete YAML specification for configuring the Search-Evaluate-Evolve (SEE) loop of the SAPE-Agent. By defining clear defaults and enabling task-specific variants through an override mechanism, this specification offers both ease of use for standard scenarios and the flexibility required for optimizing performance across diverse and complex tasks, ranging from prompt engineering to structured data generation and knowledge graph querying. The design emphasizes readability, modularity, and extensibility. Adherence to schema validation and integration with experiment tracking are recommended best practices for robust deployment. Future extensions can incorporate adaptive parameters and more sophisticated variant selection logic to further enhance the agent's capabilities.

#### **Works cited**

1. Implementing Evolutionary Algorithms In Python | Restackio, accessed May 2, 2025, [https://www.restack.io/p/evolutionary-algorithms-answer-implementing-in-python-cat-ai](https://www.restack.io/p/evolutionary-algorithms-answer-implementing-in-python-cat-ai)  
2. Genetic Algorithm: Complete Guide With Python Implementation \- DataCamp, accessed May 2, 2025, [https://www.datacamp.com/tutorial/genetic-algorithm-python](https://www.datacamp.com/tutorial/genetic-algorithm-python)  
3. moshesipper/tiny\_gp: Tiny Genetic Programming in Python. \- GitHub, accessed May 2, 2025, [https://github.com/moshesipper/tiny\_gp](https://github.com/moshesipper/tiny_gp)  
4. TurboGP \- Genetic Programming library in Python \- GitHub, accessed May 2, 2025, [https://github.com/l1n0b1/TurboGP](https://github.com/l1n0b1/TurboGP)  
5. PyGAD \- Python Genetic Algorithm\! — PyGAD 3.4.0 documentation, accessed May 2, 2025, [https://pygad.readthedocs.io/](https://pygad.readthedocs.io/)  
6. An extensible Evolutionary Algorithm Example in Python \- Towards Data Science, accessed May 2, 2025, [https://towardsdatascience.com/an-extensible-evolutionary-algorithm-example-in-python-7372c56a557b/](https://towardsdatascience.com/an-extensible-evolutionary-algorithm-example-in-python-7372c56a557b/)  
7. Tricks to Improve LLM-as-a-Judge \- Galileo AI, accessed May 2, 2025, [https://www.galileo.ai/blog/tricks-to-improve-llm-as-a-judge](https://www.galileo.ai/blog/tricks-to-improve-llm-as-a-judge)  
8. A Systematic Study of Position Bias in LLM-as-a-Judge \- arXiv, accessed May 2, 2025, [https://arxiv.org/html/2406.07791v7](https://arxiv.org/html/2406.07791v7)  
9. LLM-as-a-Judge Simply Explained: A Complete Guide to Run LLM Evals at Scale, accessed May 2, 2025, [https://www.confident-ai.com/blog/why-llm-as-a-judge-is-the-best-llm-evaluation-method](https://www.confident-ai.com/blog/why-llm-as-a-judge-is-the-best-llm-evaluation-method)  
10. Jenetics: Java Genetic Algorithm Library, accessed May 2, 2025, [https://jenetics.io/](https://jenetics.io/)  
11. evolutionary-algorithm \- PyPI, accessed May 2, 2025, [https://pypi.org/project/evolutionary-algorithm/](https://pypi.org/project/evolutionary-algorithm/)  
12. Genetic Algorithm for Decision Trees \- python \- Stack Overflow, accessed May 2, 2025, [https://stackoverflow.com/questions/75691446/genetic-algorithm-for-decision-trees](https://stackoverflow.com/questions/75691446/genetic-algorithm-for-decision-trees)  
13. LLM-Rubric: A Multidimensional, Calibrated Approach to Automated Evaluation of Natural Language Texts† \- arXiv, accessed May 2, 2025, [https://arxiv.org/html/2501.00274v1](https://arxiv.org/html/2501.00274v1)  
14. Rubric Is All You Need: Enhancing LLM-based Code Evaluation With Question-Specific Rubrics \- arXiv, accessed May 2, 2025, [https://arxiv.org/html/2503.23989v1](https://arxiv.org/html/2503.23989v1)