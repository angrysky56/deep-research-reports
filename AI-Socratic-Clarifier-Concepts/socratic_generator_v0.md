### **Socratic Question Generator for AI-Assisted Clarification and Bias Detection**
---

This **Socratic Question Generator** is an AI module that formulates **clarifying, critical, and reflective questions** based on detected ambiguity, bias, or weak reasoning in text. It operates within the AI-assisted clarification system, prompting users (or AI systems themselves) to improve communication clarity.

---

## **1. Socratic Question Generator Framework**
The generator follows a structured approach:
1. **Detect Issue Type** (Ambiguity, Bias, Unsupported Claim, Logical Inconsistency).
2. **Select Question Type** (Clarification, Counterargument, Justification, Reframing).
3. **Generate Tailored Socratic Questions**.

| **Issue Detected**  | **Socratic Question Type** | **Example Question** |
|---------------------|--------------------------|----------------------|
| **Ambiguous Claim** | Clarification | "What exactly do you mean by X? Can you provide a specific example?" |
| **Overgeneralization** | Counterexample | "Are there any exceptions to this statement?" |
| **Bias Detected** | Perspective Shift | "How might someone from a different background interpret this differently?" |
| **Weak Evidence** | Justification | "What sources support this claim? Can it be independently verified?" |
| **Loaded Language** | Reframing | "Can this be rephrased in a more neutral way?" |
| **Contradiction** | Logical Analysis | "How do you reconcile this with your earlier statement about Y?" |

---

## **2. Implementation: Python Code for the Question Generator**
Here’s an AI-powered Socratic Question Generator that integrates with the existing bias detection and clarification system.

```python
from transformers import pipeline
import random

# Load NLP models for ambiguity detection and bias detection
ambiguity_detector = pipeline("text-classification", model="textattack/roberta-base-CoLA")
bias_detector = pipeline("text-classification", model="cardiffnlp/twitter-roberta-base-offensive")

# Define question templates for different issue types
SOCRATIC_QUESTIONS = {
    "ambiguity": [
        "What exactly do you mean by '{term}'?",
        "Can you clarify '{term}' with an example?",
        "How might someone else interpret '{term}' differently?"
    ],
    "bias": [
        "How might someone from a different background perceive this statement?",
        "Is there a way to phrase this more neutrally?",
        "What assumptions does this statement make about {term}?"
    ],
    "unsupported_claim": [
        "What evidence supports this claim?",
        "Can this claim be independently verified?",
        "Are there credible sources that agree or disagree with this?"
    ],
    "contradiction": [
        "How does this statement align with what was said earlier?",
        "Are there any contradictions in this argument?",
        "If this is true, what does it imply about {related_term}?"
    ]
}

def detect_issues(text):
    """Detects ambiguity and bias in the text."""
    issues = []
    
    # Detect ambiguity
    ambiguity_result = ambiguity_detector(text)
    if ambiguity_result[0]['label'] == "LABEL_1":
        issues.append(("ambiguity", text))
    
    # Detect bias
    bias_result = bias_detector(text)
    if bias_result[0]['label'] == "LABEL_1":
        issues.append(("bias", text))
    
    return issues

def generate_socratic_question(issue_type, term):
    """Generates a Socratic question based on the issue type."""
    question_template = random.choice(SOCRATIC_QUESTIONS.get(issue_type, ["Can you elaborate on '{term}'?"]))
    return question_template.format(term=term)

# Example Usage
user_text = "The study proves that all experts agree on climate change."

# Detect issues in the text
detected_issues = detect_issues(user_text)

# Generate Socratic questions
for issue_type, term in detected_issues:
    question = generate_socratic_question(issue_type, term)
    print(f"Issue: {issue_type.capitalize()} | Suggested Question: {question}")
```

---

## **3. How It Works**
1. **The AI analyzes the input text** using NLP models.
2. **It detects potential issues** such as **ambiguity, bias, or weak claims**.
3. **It selects an appropriate Socratic question type** (clarification, counterexample, justification).
4. **It generates and returns a tailored question** to prompt further thinking.

---

## **4. Example Use Cases**
### **Scenario 1: Ambiguous Statement**
**Input:**  
*"The results were significant."*  
**AI Response:**  
*"What exactly do you mean by 'significant'? Statistical or practical significance?"*  

### **Scenario 2: Overgeneralization**
**Input:**  
*"People always act in their own self-interest."*  
**AI Response:**  
*"Are there exceptions to this? Can you think of examples where people acted selflessly?"*  

### **Scenario 3: Biased Statement**
**Input:**  
*"Men are better leaders than women."*  
**AI Response:**  
*"What evidence supports this claim? How might societal bias influence this perception?"*  

### **Scenario 4: Unsupported Claim**
**Input:**  
*"The economy is the worst it has ever been."*  
**AI Response:**  
*"What data supports this claim? How does it compare to previous economic downturns?"*  

---

## **5. Future Enhancements**
- **Multi-agent coordination:** Integrate with **fact-checking AI** to provide real-time evidence.
- **User preferences:** Allow users to adjust sensitivity for different contexts (academic, casual, legal).
- **Interactive dialogue:** Enable users to answer Socratic questions and refine their text iteratively.
