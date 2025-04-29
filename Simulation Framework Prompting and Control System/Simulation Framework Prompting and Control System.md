
# Simulation Framework Prompting and Control System

SFPCS: A Framework for Simulating Complex Systems with AI-Driven Agents

# Meta-Template Process & Prompt Definitions v1.0

This provides a concrete, developer-focused set of templates incorporating (efficient knowledge representation, attention/gating, meaning/motivation,
cognitive modules, learning, meta-rules).

 The specific logic within `Update Rules`, `Learning System`, `Meta-Rules`, and `Calculation_Logic` for metrics need detailed implementation based on the exact simulation domain and goals.
---

## Meta-Template Process (For AI/User generating a simulation)

**Step 1: Scenario Request Intake**
   - Input `Scenario_Domain`: (e.g., Ecology, Market_Economics, Geopolitics, Cognitive_Model, Social_Network)
   - Input `Core_Concept_Focus`: (e.g., Predator_Prey, Market_Competition, Crisis_Response, Working_Memory, Opinion_Dynamics)
   - Input `Key_Entity_Types`: (e.g., Wolf, Sheep, Grass; Firm_Producer, Firm_Innovator, Consumer_Segment; Nation_A, Nation_B, International_Org; Attentional_Module, LTM_Module, WM_Buffer; User_A, User_B, Influencer_Node)
   - Input `Primary_Tension_Goal`: (e.g., Survival_Resource_Competition, Profit_Maximization, Geopolitical_Stability, Task_Completion_Accuracy, Maximize_Engagement)
   - Input `Desired_Scale_Complexity`: (e.g., Small_3_Entities_Simple_Rules, Medium_5_Entities_Adaptive_Rules, Large_10+_Entities_Meta_Rules)
   - Input `(Optional) Key_Metrics`: (e.g., Population_Levels, Market_Share, Conflict_Index, Processing_Latency, Information_Spread_Rate)

**Step 2: Generate Simulation Framework Prompt**
   - Output: Populated `// SIMULATION FRAMEWORK:` prompt based on Step 1 inputs.

**Step 3: Generate Entity Type Prompts**
   - Output: For each `Key_Entity_Type` from Step 1, generate a tailored `// ENTITY DEFINITION:` prompt structure, filling sections with domain-relevant attributes, rules, and examples.

**Step 4: Generate Event Type Prompts**
   - Output: Generate relevant `// EVENT:` prompt structures based on Domain, Focus, Entities, and Tension, including domain-specific impact fields.

**Step 5: Generate Workflow & Metrics Prompts**
   - Output: Generate `// WORKFLOW FRAMEWORK:` structure with a simple illustrative sequence. Generate `// METRIC DEFINITION:` prompts for requested or default metrics.

**Step 6: Present & Refine**
   - Output: Present generated prompts to user/agent.
   - Input: User/agent feedback for refinement (e.g., clarifying rules, adding attributes/events). Iterate Steps 2-5 as needed.

---

## SFPCS Prompt Definitions

### 1. Simulation Framework Prompt

```plaintext
// SIMULATION FRAMEWORK: [Generated Scenario Name]

SETTING:
  - Name: [Generated Scenario Name, e.g., "MarketSim_Alpha"]
  - Scenario_Domain: [From Step 1, e.g., Market_Economics]
  - Core_Concept_Focus: [From Step 1, e.g., Market_Competition]
  - Scale: [Derived from Step 1, e.g., Abstract_Market_Model]
  - Size: [Derived from Step 1, e.g., 5 Entity Types, ~20 Agents Total]
  - Environment_Rules:
    - Resource_Model: [e.g., Finite_Shared_Resource, Abstract_Capital_Flow, Information_Bandwidth]
    - Communication_Protocol: [e.g., Public_Broadcast, Pairwise_Targeted, Network_Topology_Based]
    - Access_Control: [e.g., Open_Access, Reputation_Gated, Resource_Cost_Based]
  - Core_Tension_Source: [From Step 1, e.g., Competition_for_Market_Share_vs_Risk_of_Price_War]
  - Simulation_Time_Step_Unit: [e.g., Abstract_Cycle, Day, Quarter]

GOAL: [From Step 1, e.g., Simulate_Market_Share_Evolution_Under_Different_Pricing_Strategies]
```

### 2. Entity/Node Definition Prompt

```plaintext
// ENTITY DEFINITION: [Generated Entity Archetype Name]

Household/Node Name: [Unique Identifier Prefix, e.g., Firm_Producer_]
Archetype: [Entity Archetype Name, e.g., Firm_Producer]

// --- CORE ATTRIBUTES (Initial State) ---
Static Attributes:
  - Stated Intentions/Mandate: "[Domain-specific goal, e.g., Maximize Profit within Ethical Bounds]"
  - Core Behavioral Tendencies: "[List - e.g., Risk_Averse, Cost_Leader_Strategy, Follower]"
  - Initial Influence Mechanisms: "[List - e.g., Pricing_Power, Brand_Loyalty, Production_Volume]"
Initial Resources: "{Capital: 1000, Production_Capacity: 100, Tech_Level: 0.5, Market_Share: 0.2}"
Initial Relationships: "{Firm_Innovator_1: Rival, Consumer_Segment_A: Neutral_Target}"

// --- KNOWLEDGE & WORLD MODEL ---
Knowledge_Store_Type: "Compressed_Graph_Memory" # Example default
Knowledge_Update_Method: "Event_Triggered_Selective" # Example default
Internal_Model: # Agent's representation of key simulation elements
  - Market_Demand_Estimate: [Initial Value, e.g., 1000]
  - Competitor_Pricing_Model: "[Rule/Model ID - e.g., Assumes_Rational_Actor_Model]"
  - Resource_Availability_Map: "[Representation of known resources]"
Current_World_View_Accuracy: 0.7 # Example default (0.0-1.0)

// --- ATTENTION & PROCESSING ---
Attention_Focus_Mechanism: "Task_Conditioned_Salience" # Example default
Information_Throughput_K: 10 # Example default (max items processed per cycle)
Processing_Mode: "Hybrid_Adaptive" # Example default (Shallow/Deep)
Decision_Heuristics: "[List of default shortcuts, e.g., 'Match lowest competitor price if Capital > 500']"

// --- MEANING & MOTIVATION SYSTEM ---
Motivation_Drivers:
  - Hedonic_State: "Stable" # (e.g., Stable, Growth_Mode, Crisis_Mode, Threat_High)
  - Eudaimonic_Goals: "['Increase Market Share by 10%', 'Develop Next Gen Product']"
  - Transcendent_Connection: 0.3 # (e.g., 0.0 = Pure Self-Interest, 1.0 = Fully Aligned with System/Commons Health)
Goal_Prioritization_Logic: "IF Hedonic_State == Crisis_Mode THEN prioritize Short_Term_Survival; ELSE IF Transcendent_Connection > 0.7 THEN prioritize System_Health; ELSE prioritize Eudaimonic_Goals by Expected_Value."

// --- COGNITIVE CAPABILITIES ---
Available_Cognitive_Modules: "['Planning', 'Bayesian_Inference', 'Metacognition']" # Example default list
Module_Proficiency: "{Planning: 0.6, Bayesian_Inference: 0.7, Metacognition: 0.5}" # Example levels (0.0-1.0)

// --- DYNAMIC ATTRIBUTES & ADAPTATION ---
Dynamic Attributes: # (Values typically initialized from above sections)
  - Current_Resources: "{Capital: 1000, Production_Capacity: 100, Tech_Level: 0.5, Market_Share: 0.2}"
  - Current_Trust_Vector: "{Firm_Innovator_1: 0.3, Consumer_Segment_A: 0.6}" # Example (0.0-1.0)
  - Current_Influence: 50 # Example (Numeric)
  - Current_Wellbeing: 0.8 # Example (0.0-1.0, maps to Hedonic State/Goal Progress)
  - Current_Strategy_Focus: "Cost_Leader_Strategy" # Example
  - Current_Prediction_Error: 0.0 # Example (Tracks TD Error or similar)

Update Rules (Domain-Specific Logic):
  - Resources_Update_Rule: "[Logic: e.g., Capital += Revenue(Market_Share, Price) - Costs(Production_Capacity, Tech_Level); Market_Share = UpdateMarketShare(...)]"
  - Trust_Update_Rule: "[Logic: e.g., Trust(X) += 0.1 if CooperativeEvent(Self, X); Trust(X) -= 0.2 if CompetitiveEvent(Self, X); Trust *= 0.99 per step (decay)]"
  - Influence_Update_Rule: "[Logic: e.g., Influence += Market_Share_Gain * 5; Influence -= Failed_Product_Launch * 10; Influence *= 0.98 per step (decay)]"
  - Wellbeing_Update_Rule: "[Logic: e.g., Wellbeing = 0.5*Normalized(Capital) + 0.3*Market_Share + 0.2*(1-Prediction_Error)]"
  - Goal_Update_Rule: "[Logic: e.g., IF Goal_Met(Current_Eudaimonic_Goal) THEN Pop_Goal() AND Generate_New_Goal(Strategy_Focus, World_View)]"

Learning System:
  - Type: "Predictive_TD_Error" # Example default
  - Update_Target: "Strategy_Focus" # Example default (What gets adapted)
  - Learning_Rate: 0.05 # Example default
  - TD_Error_Calculation: "[Formula/Reference - How prediction error is calculated based on state transitions and outcomes]"

Meta-Rules (Learning to Learn / Self-Modification):
  - Strategy_Adaptation_Logic: "IF Current_Prediction_Error > 0.5 for 3 steps AND Current_Strategy_Focus == Cost_Leader THEN P(Switch to Innovation_Strategy) = 0.3" # Example
  - Rule_Modification_Logic: "IF Event == New_Market_Regulation THEN Query Internal_Model for impact AND Modify relevant Update_Rules (e.g., Production_Cost) with Learning_Rate 0.5" # Example

Metacognitive State (If Metacognition Module active):
  - Confidence_In_World_View: 0.7 # Example (0.0-1.0)
  - Predicted_Success_Of_Strategy: 0.6 # Example (0.0-1.0)
  - Awareness_Of_Influence: 60 # Agent's estimate of its own influence
```

### 3. Event Prompt

```plaintext
// EVENT: [Generated Event Type Name]

Event_ID: [Unique ID, e.g., EVT_001]
Timestamp: [Simulation Time Step, e.g., 5]
Initiator: [Household/Node Name or "Environment"]
Target(s): "[Household/Node Name(s) / 'All']"
Action_Description: "[Concise description, e.g., Firm_Innovator_1 launches Product_X]"
Parameters: "{Price: 50, Quality: 0.8, Marketing_Spend: 100}" # Example parameters

// --- IMPACT ASSESSMENT ---
Affected_Attributes: "['Resources', 'Market_Share', 'Influence', 'Competitor_Pricing_Model']" # List attributes potentially changed
Cognitive_Modules_Engaged: "{Initiator: ['Planning'], Target: ['Bayesian_Inference']}" # Which modules process this
Meaning_System_Impact: "{Initiator: {Hedonic: Potential_High_Reward, Eudaimonic: Goal_Progress}, Target: {Hedonic: Threat_High}}" # Impact on motivations
Learning_System_Output:
  - Prediction_Made (Prior): "{Initiator_Market_Share_Change: 0.05, Target_Market_Share_Change: -0.02}" # Example
  - Actual_Outcome: "{Initiator_Market_Share_Change: 0.03, Target_Market_Share_Change: -0.03}" # Example
  - Prediction_Error_Generated: 0.02 # Example (Magnitude of error)

// --- NARRATIVE UPDATE ---
Narrative_Element: "[Text describing impact on agent histories, e.g., 'Product_X launch disrupted market, challenging Firm_Producer_1.']"
```

### 4. Workflow Framework Prompt

```plaintext
// WORKFLOW FRAMEWORK

SEQUENCE NAME: [Generated Workflow Name, e.g., Market_Entry_Response]

STEP 1:
  - Initiator: Firm_Innovator_1
  - Event Type: Product_Launch
  - Target(s): "All"
  - Parameters: "{Product: 'GadgetZ', Price: 100, Novelty: 0.9}"
  - Immediate Outcome: "Updates Market State, Initiator Influence +5."

STEP 2:
  - Initiator: Firm_Producer_1
  - Event Type: Price_Adjustment (Reaction)
  - Target(s): "All"
  - Parameters: "{Product: 'GadgetA', New_Price: 90}"
  - Immediate Outcome: "Updates Market State. Triggers Learning_System update for Firm_Producer_1 based on Prediction_Error vs expected competitor price."

STEP 3:
  - Initiator: Consumer_Segment_A
  - Event Type: Purchase_Decision
  - Target(s): "[Firm_Innovator_1, Firm_Producer_1]"
  - Parameters: "{Volume: 100, Preference_Factors: ['Price', 'Novelty']}"
  - Immediate Outcome: "Updates Resources (Capital, Market_Share) for firms. Updates Consumer Satisfaction (Wellbeing)."

(... potentially more steps ...)

CONDITIONALS:
- "IF Firm_Producer_1.Current_Wellbeing < 0.3 AFTER Step 3 THEN Trigger Event(Initiator: Firm_Producer_1, Event Type: Exit_Market)."
```

### 5. Metric Definition Prompt

```plaintext
// METRIC DEFINITION

Metric_Name: "[Name, e.g., Market_Volatility_Index]"
Description: "[Purpose, e.g., Measures the rate and magnitude of market share changes.]"
Calculation_Logic: "[Formula/Method, e.g., Standard deviation of Market_Share changes across all Firms over last 5 steps.]"
Reporting_Frequency: "Every 10 steps" # Example
```

```markdown
