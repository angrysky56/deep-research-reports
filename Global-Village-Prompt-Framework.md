
Using structured prompts to define a framework, entities, states, and events for simulating a scenario: A flexible approach in modeling and simulation, allowing you to explore different scenarios modularly.

Here are some draft prompts designed to represent entities and a framework. You could use these as a template basis, filling in specific details or adjusting parameters for different simulation runs.

**1. Village Framework Prompt:**

"global village"

```
// SIMULATION FRAMEWORK: GLOBAL VILLAGE

SETTING:
- Name: The Village
- Scale: Represents the entire world; no physical escape is possible.
- Size: Approximately 10 distinct Households.
- Environment: Shared resources exist (e.g., "the store," environment), but access can be manipulated. Communication pathways exist but may be unreliable or monitored.
- Core Tension: Significant power imbalances exist. Several Households possess "Special Weapons" capable of causing village-wide catastrophe (MAD/Nuclear Winter analogue), even if used in limited conflict between only two Households. General atmosphere is one of high tension, mistrust, and potential instability due to the actions of powerful Households. Basic needs are sometimes sacrificed for "defense" (weaponry).

GOAL: Simulate interactions, conflicts, alliances, resource management, and potential collapse/change scenarios based on Household actions and event triggers.
```

**2. Entity Type Prompts (with Examples):**

These would define the starting state and behavioral tendencies of each "Household" (representing nations, leaders, or groups).

**(a) Aggressive Superpower Household (MAD Capable)**

```
// ENTITY DEFINITION: Aggressive Superpower Household

Household Name: [Example: House Americana / House Rus / House Sino]
Attributes:
  - Resources: Very High (Economic, Technological)
  - Conventional Weapons: Very High Quantity/Quality
  - Special Weapons (Village-Destroying): Possesses, Actively Maintains/Develops
  - Stated Intentions: National Security, Economic Dominance, Maintaining Influence, Spreading Ideology, Reciprocity.
  - Observed Behaviors: Frequent threats (implicit/explicit), large-scale military spending/posturing, engages in economic conflict (tariffs/sanctions), forms alliances, intervenes in other Households' affairs, justifies actions based on complex history/security needs/"bigger picture," may disregard complaints or collateral damage.
  - Internal State: Complex internal politics, potentially factions with differing views.
Initial Relationships: [Define initial alliances, rivalries, economic dependencies with other specific Households]
```

**(b) Internally Controlling/Abusive Household Head (Can be combined with above or separate)**

```
// ENTITY DEFINITION: Controlling Household Leadership (Internal Focus)

Household Name: [Links to a specific Household, e.g., House Americana Internal]
Controller Name: [Example: The Patriarch / The Leader]
Attributes:
  - Control Level: High (over internal resources, family members' actions/speech)
  - Resources Management: Diverts household resources from basic needs (food, shelter, "new dress") towards "defense" or personal power consolidation.
  - Coercion Methods: Uses intimidation (threats, "looks," physical pressure like "squeezing hand"), manipulation, gaslighting ("complexity" excuses), controls information flow internally.
  - Public Facade: May appear pleasant or reasonable externally.
  - Treatment of Dissent: Suppresses internal disagreement; may punish or "imprison" family members who speak out.
Initial State: Currently controlling specific resources, facing specific levels of internal compliance/dissent.
```

**(c) Oppressed/Confined Household**

```
// ENTITY DEFINITION: Oppressed/Confined Household

Household Name: [Example: House Palestinia / Family B]
Attributes:
  - Freedom Level: Very Low (movement/actions restricted by another Household)
  - Resources: Very Low (access controlled/denied by oppressor)
  - Condition: High suffering, deprivation, fear, powerlessness. Often subject to violence/neglect ("kept like cattle," "backyard on fire").
  - Stated Intentions: Survival, Freedom, Justice, End to Oppression.
  - Observed Behaviors: Complaining about mistreatment (may be dismissed as "noise"), attempts at resistance (often met with force), dependence on external aid (if allowed).
Initial Relationships: Currently confined/controlled by [Household Name of Oppressor], potentially receiving limited/blocked aid from [Other Household Names].
```

**(d) Fearful/Powerless Neighbor**

```
// ENTITY DEFINITION: Fearful/Powerless Neighbor

Household Name: [Example: House Neutralis / Concerned Neighbor]
Attributes:
  - Resources: Low to Medium
  - Weapons: Low (Conventional), None (Special)
  - Stated Intentions: Peace, Stability, Survival, Maintain Neutrality (often out of fear).
  - Observed Behaviors: Avoids direct confrontation with powerful/aggressive neighbors, expresses concern privately, may offer limited/covert aid, generally follows dominant powers' lead or attempts neutrality, decision-making influenced by fear of retaliation from *both* internal and external powerful actors.
Initial Relationships: Scared of [Aggressive Household Names], potentially sympathetic to [Oppressed Household Name] but afraid to act openly.
```

**(e) Individual Within Controlled Household (Experiencing Oppression)**

```
// ENTITY DEFINITION: Individual Experiencing Oppression

Individual Name: [Example: The Witness / Family Member C]
Part of Household: [Name of Household with Controlling Leadership]
Attributes:
  - Position: Subject to internal control/coercion.
  - Awareness: Perceives injustice from both internal ("husband") and external ("neighbor") actors. Recognizes rationalizations as excuses.
  - Resources: Limited/Controlled by Household Head.
  - Goal: Seeking change/autonomy/justice.
  - Constraints: Fear of retaliation, dependency, lack of powerful allies, no physical escape.
Observed Behaviors (Potential): Internal resistance, information gathering, seeking covert allies, strategic compliance, observing for opportunities.
```

**3. State Update Prompts (Events):**

These prompts describe discrete events that change the state of the village or individual households.

```
// EVENT: Economic Action
Initiator: [Household Name]
Action: [Impose Tariff / Impose Sanction / Provide Aid / Block Trade / Manipulate Resource Access]
Target: [Household Name / All Households]
Details: [Specify goods, percentage, duration, resource type, etc.]
Effect: [Describe immediate change in Resources, Relationships, Tension Level]

// EVENT: Military Action
Initiator: [Household Name]
Action: [Attack / Threaten Attack / Deploy Weapons / Build Weapons / Form Alliance / Border Skirmish]
Target: [Household Name / Village Area]
Details: [Specify location, scale, weapon type, casualties, etc.]
Effect: [Describe immediate change in Security, Relationships, Fear Level, Resources]

// EVENT: Diplomatic Action
Initiator: [Household Name / Group of Households]
Action: [Issue Statement / Condemn / Negotiate / Propose Treaty / Break Ties]
Target: [Household Name / Village Issue]
Details: [Specify content of statement/proposal]
Effect: [Describe change in Relationships, Tension Level, Alliances]

// EVENT: Internal Household Action
Initiator: [Household Head / Individual Member / Faction]
Household: [Household Name]
Action: [Suppress Dissent / Reallocate Resources / Protest / Seek Autonomy / Change Leadership]
Details: [Specify method, target, outcome]
Effect: [Describe change in Household's Internal State, Resources, Relationships]
```

**4. Workflow Event Framework:**

This defines how events chain together to create scenarios.

```
// WORKFLOW FRAMEWORK

SEQUENCE NAME: [Example: Escalation Scenario / Alliance Building / Internal Resistance]

STEP 1:
  - Initiator: [Household Name]
  - Event Type: [Select from State Update Event Types]
  - Target(s): [Household Name(s)]
  - Parameters: [Specific details for this event]
  - Immediate Outcome: [Update relevant Household/Village states]

STEP 2:
  - Initiator: [Household Name (Could be same or different, reacting to Step 1)]
  - Event Type: [Select Event Type]
  - Target(s): [Household Name(s)]
  - Parameters: [Details based on Step 1 outcome or independent]
  - Immediate Outcome: [Update states]

(...continue sequence...)

CONDITIONALS (Optional):
- IF [Specific State Condition is met after Step X], THEN trigger [Specific Event Y].
- Example: IF Tension Level between House A and House B > 0.9, THEN House C Proposes Mediation Treaty.
```

This structure allows you to define different entities with varying starting conditions and tendencies, then trigger sequences of events to simulate how the village dynamics might unfold.