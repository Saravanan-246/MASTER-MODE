// Foundations of Artificial Intelligence — Unit IV: Knowledge and Reasoning.
// Topic ids match the syllabus outline in ../subjects.js (24CSU5DA).
// Textbook: Russell & Norvig, AI – A Modern Approach, 4th ed., Chapters 12–13.
// Inline markup in text: `code`, **keyword**.

const ANSWER_PLAN = (definition, diagram, explanation, example, points) => [
  { label: 'Definition', hint: definition },
  { label: 'Diagram', hint: diagram },
  { label: 'Explanation', hint: explanation },
  { label: 'Example', hint: example },
  { label: 'Key points', hint: points },
]

export default {
  overview:
    'Unit IV teaches agents to reason when they are not sure. Probability measures degrees of belief; Bayes’ rule turns evidence into conclusions; independence keeps the numbers small. Bayesian networks then draw these dependencies as a graph and support exact and approximate inference — and causal networks show the difference between seeing and doing.',

  map: [
    { label: 'Why probability', topics: ['acting-under-uncertainty', 'basic-probability-notation'] },
    { label: 'Compute with it', topics: ['inference-using-full-joint-distributions', 'independence'] },
    { label: 'Bayes in action', topics: ['bayes-rule-and-its-use', 'naive-bayes-models', 'the-wumpus-world-revisited'] },
    { label: 'Bayesian networks', topics: ['representing-knowledge-in-an-uncertain-domain', 'the-semantics-of-bayesian-networks'] },
    { label: 'Inference & causation', topics: ['exact-inference-in-bayesian-networks', 'approximate-inference-for-bayesian-networks', 'causal-networks'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'acting-under-uncertainty': {
      difficulty: 'easy',
      intro: 'Real agents rarely know everything. This topic explains why logic alone fails and why we need probability.',
      definition:
        'Acting under uncertainty means choosing actions when the agent cannot be sure of the current state or of action outcomes, due to partial observability, nondeterminism or both. The agent uses **probability** to express its **degree of belief** and **decision theory** (probability + utility) to choose the action with **maximum expected utility (MEU)**.',
      simpleExplanation: {
        text: 'Logic says “true” or “false”. The real world says “probably”. A dentist cannot be sure a toothache means a cavity, so they think “80% likely”. An agent should combine **how likely** each outcome is with **how much it wants** that outcome.',
        analogy: 'Leaving for the airport: leaving 90 minutes early is very likely to make the flight but wastes time waiting; leaving 25 minutes early saves time but risks missing it. The best choice balances both.',
      },
      visual: {
        type: 'flow',
        title: 'From uncertainty to a decision',
        steps: [
          { label: 'Uncertain world', note: 'partial, noisy information' },
          { label: 'Probability', note: 'degree of belief' },
          { label: 'Utility', note: 'how much each outcome is wanted' },
          { label: 'Decision theory', note: 'probability + utility' },
          { label: 'MEU action', note: 'highest expected utility' },
        ],
      },
      explanation: [
        { heading: 'Why logic fails — diagnosis example' },
        'The rule `Toothache ⇒ Cavity` is wrong (gum disease, abscess…). Logic fails in domains like medicine for three reasons:',
        {
          list: [
            '**Laziness** — too much work to list every exception and condition.',
            '**Theoretical ignorance** — science has no complete theory of the domain.',
            '**Practical ignorance** — even with complete rules, not all tests can be run for this patient.',
          ],
        },
        'Probability summarises the uncertainty that comes from laziness and ignorance — it handles the **qualification problem**.',
        { heading: 'Rational decisions' },
        {
          list: [
            '**Probability theory** — what the agent believes.',
            '**Utility theory** — what the agent prefers (utility = degree of usefulness).',
            '**Decision theory = probability theory + utility theory.**',
            'A rational agent chooses the action with **maximum expected utility** averaged over all outcomes.',
          ],
        },
        { note: 'The agent keeps a **belief state** — a probability distribution over the possible world states — and updates it as evidence arrives.' },
      ],
      example: {
        title: 'Plan A90 vs A25',
        input: 'A_t = leave t minutes before the flight. (Probabilities are illustrative.)',
        output: `A25 : P(catch flight) ≈ 0.70 → short wait, big risk
A90 : P(catch flight) ≈ 0.97 → long wait, small risk
A180: P(catch flight) ≈ 0.99 → very long wait
Rational choice: the plan with the highest expected utility (often A90)`,
        explanation: 'Higher probability alone does not decide it — A180 is safest but wastes hours. Utility of waiting time is weighed in.',
      },
      keyPoints: [
        'Uncertainty comes from partial observability and nondeterminism.',
        'Logic fails due to laziness, theoretical and practical ignorance.',
        'Probability = degree of belief.',
        'Decision theory = probability theory + utility theory.',
        'Rational agent = maximum expected utility (MEU).',
      ],
      importantTerms: [
        { term: 'Degree of belief', meaning: 'How strongly the agent believes a proposition, as a probability.' },
        { term: 'Utility', meaning: 'A number expressing how much an outcome is preferred.' },
        { term: 'Decision theory', meaning: 'Probability theory combined with utility theory.' },
        { term: 'MEU', meaning: 'Maximum expected utility — the principle of rational choice.' },
      ],
      examPoints: [
        'Explain why logic fails using the **toothache** example.',
        'List **laziness, theoretical ignorance, practical ignorance**.',
        'Write decision theory = probability + utility and the MEU principle.',
        'Use the airport (A90) example.',
      ],
      questions: [
        {
          prompt: 'Explain acting under uncertainty. Why is probability used instead of logic?',
          plan: ANSWER_PLAN(
            'Choosing actions without certainty about state or outcome',
            'Uncertainty → probability + utility → MEU action',
            'Laziness, theoretical and practical ignorance; decision theory',
            'Toothache diagnosis; airport plan A90',
            'Degree of belief; belief state; MEU',
          ),
        },
      ],
      keywords: ['uncertainty', 'degree of belief', 'laziness', 'theoretical ignorance', 'practical ignorance', 'utility', 'decision theory', 'MEU'],
      remember: [
        { prompt: 'Decision theory = ?', answer: 'Probability theory + utility theory.' },
        { prompt: 'Three reasons logic fails in diagnosis?', answer: 'Laziness, theoretical ignorance, practical ignorance.' },
        { prompt: 'What principle does a rational agent follow?', answer: 'Maximum expected utility (MEU).' },
      ],
    },

    // ------------------------------------------------------------------
    'basic-probability-notation': {
      difficulty: 'medium',
      intro: 'The language of the whole unit. Get these symbols right and every later topic becomes easier.',
      definition:
        'Probability is defined over a **sample space Ω** of mutually exclusive, exhaustive **possible worlds** ω, with 0 ≤ P(ω) ≤ 1 and Σ P(ω) = 1. **Unconditional (prior) probability** P(a) is belief without other evidence; **conditional (posterior) probability** P(a | b) = P(a ∧ b) / P(b) is belief given evidence b.',
      simpleExplanation: {
        text: 'A **random variable** (like Weather) takes values from a domain (sunny, rain, cloudy, snow). A **probability distribution** lists the probability of each value. **P(a | b)** reads “the probability of a given that we know b”.',
        analogy: 'P(rain) is the chance of rain on any day. P(rain | dark clouds) is the chance once you have looked at the sky.',
      },
      visual: {
        type: 'comparison',
        title: 'Core probability rules',
        table: {
          columns: ['Rule', 'Formula'],
          rows: [
            ['Range', '0 ≤ P(ω) ≤ 1 and Σ P(ω) = 1'],
            ['Event', 'P(φ) = Σ P(ω) over worlds ω where φ is true'],
            ['Conditional', 'P(a | b) = P(a ∧ b) / P(b), when P(b) > 0'],
            ['Product rule', 'P(a ∧ b) = P(a | b) P(b)'],
            ['Negation', 'P(¬a) = 1 − P(a)'],
            ['Inclusion–exclusion', 'P(a ∨ b) = P(a) + P(b) − P(a ∧ b)'],
          ],
        },
      },
      explanation: [
        { heading: 'Random variables and distributions' },
        {
          list: [
            'Variables start with capitals: `Weather`, `Cavity`; values are lower case: `sun`, `true`.',
            'Boolean variable: `cavity` means Cavity = true, `¬cavity` means Cavity = false.',
            '**P(Weather) = ⟨0.6, 0.1, 0.29, 0.01⟩** for ⟨sun, rain, cloud, snow⟩ — bold **P** means the whole distribution.',
            '**Probability density function (pdf)** is used for continuous variables.',
          ],
        },
        { heading: 'Joint distributions' },
        '**P(Weather, Cavity)** is a 4 × 2 table of probabilities for every combination. The **full joint probability distribution** covers all variables and determines the probability of every proposition.',
        { heading: 'Kolmogorov’s axioms' },
        'Probability theory is built on: 0 ≤ P ≤ 1, P(true) = 1, and inclusion–exclusion. An agent whose beliefs violate these can be made to lose money in a bet (**de Finetti’s** argument).',
      ],
      example: {
        title: 'Conditional probability by formula',
        input: 'P(cavity ∧ toothache) = 0.12, P(toothache) = 0.2',
        output: `P(cavity | toothache) = P(cavity ∧ toothache) / P(toothache)
                      = 0.12 / 0.2
                      = 0.6`,
        explanation: 'Before any evidence, P(cavity) = 0.2. Knowing about the toothache raises the belief to 0.6.',
      },
      keyPoints: [
        'Sample space Ω = all possible worlds; probabilities sum to 1.',
        'Prior P(a) vs posterior P(a | b).',
        'P(a | b) = P(a ∧ b) / P(b); product rule P(a ∧ b) = P(a | b) P(b).',
        'Bold P(X) is a full distribution over X’s values.',
        'Full joint distribution answers any probability query.',
      ],
      importantTerms: [
        { term: 'Random variable', meaning: 'A variable whose value is uncertain, with a domain of values.' },
        { term: 'Prior probability', meaning: 'Probability before any evidence.' },
        { term: 'Posterior probability', meaning: 'Probability after observing evidence.' },
        { term: 'Full joint distribution', meaning: 'Probabilities of every combination of all variables.' },
      ],
      examPoints: [
        'Define sample space, possible world, random variable and distribution.',
        'State **prior vs conditional** probability with formula.',
        'Write the **product rule** and inclusion–exclusion.',
        'Give the Weather distribution example.',
      ],
      questions: [
        {
          prompt: 'Explain the basic probability notation used in AI.',
          plan: ANSWER_PLAN(
            'Sample space, possible worlds, probability model',
            'Table of probability rules',
            'Random variables, distributions, prior, conditional, joint',
            'P(cavity | toothache) = 0.6',
            'Product rule; Kolmogorov axioms',
          ),
        },
      ],
      keywords: ['sample space', 'possible world', 'random variable', 'distribution', 'prior', 'conditional', 'product rule', 'full joint distribution'],
      remember: [
        { prompt: 'Formula for P(a | b)?', answer: 'P(a ∧ b) / P(b)' },
        { prompt: 'Product rule?', answer: 'P(a ∧ b) = P(a | b) P(b)' },
        { prompt: 'What does bold P(Weather) mean?', answer: 'The whole distribution — a vector of probabilities for each value.' },
      ],
    },

    // ------------------------------------------------------------------
    'inference-using-full-joint-distributions': {
      difficulty: 'medium',
      intro: 'If you have the full joint table, any question can be answered by adding the right cells.',
      definition:
        '**Probabilistic inference** computes posterior probabilities for query propositions given evidence. With the full joint distribution, this is done by **marginalisation** (summing out variables) and **normalisation**: **P(X | e) = α P(X, e) = α Σ_y P(X, e, y)**.',
      simpleExplanation: {
        text: 'Put every possibility in one table. To find the probability of anything, add up the rows where it is true. For a conditional, add up the rows matching the evidence and **normalise** so the answers sum to 1.',
        analogy: 'A class marks register: to find how many students passed maths, count every row where maths = pass, whatever the other subjects say.',
      },
      visual: {
        type: 'comparison',
        title: 'Full joint distribution — Toothache, Catch, Cavity',
        table: {
          columns: ['', 'toothache, catch', 'toothache, ¬catch', '¬toothache, catch', '¬toothache, ¬catch'],
          rows: [
            ['cavity', '0.108', '0.012', '0.072', '0.008'],
            ['¬cavity', '0.016', '0.064', '0.144', '0.576'],
          ],
        },
        caption: 'All eight entries sum to 1.',
      },
      explanation: [
        { heading: 'Marginalisation (summing out)' },
        'P(Y) = Σ_z P(Y, z). Example: **P(cavity) = 0.108 + 0.012 + 0.072 + 0.008 = 0.2**.',
        'P(toothache) = 0.108 + 0.012 + 0.016 + 0.064 = **0.2**.',
        { heading: 'Conditioning' },
        'P(Y) = Σ_z P(Y | z) P(z) — a variant using conditional probabilities.',
        { heading: 'Normalisation' },
        'P(Cavity | toothache) = α ⟨0.108 + 0.012, 0.016 + 0.064⟩ = α ⟨0.12, 0.08⟩ = **⟨0.6, 0.4⟩**. The constant **α** makes the result sum to 1, so P(toothache) need not be computed separately.',
        { trap: 'This method does not scale: n Boolean variables need a table of **2ⁿ** entries and O(2ⁿ) time. That is why independence and Bayesian networks are needed.' },
      ],
      example: {
        title: 'P(cavity ∨ toothache)',
        input: 'Use the joint table above.',
        output: `Rows where cavity OR toothache is true:
0.108 + 0.012 + 0.072 + 0.008 + 0.016 + 0.064 = 0.28`,
        explanation: 'Add every cell where at least one of the two is true — six of the eight cells.',
      },
      keyPoints: [
        'Inference = computing posteriors from evidence.',
        'Marginalisation sums out unwanted variables.',
        'Normalisation constant α makes probabilities sum to 1.',
        'P(X | e) = α Σ_y P(X, e, y).',
        'Full joint tables need 2ⁿ entries — not scalable.',
      ],
      importantTerms: [
        { term: 'Marginalisation', meaning: 'Summing probabilities over the values of other variables.' },
        { term: 'Marginal probability', meaning: 'Probability of a subset of variables, e.g. P(cavity).' },
        { term: 'Normalisation constant α', meaning: 'Factor that makes a distribution sum to 1.' },
        { term: 'Hidden variables', meaning: 'Variables that are neither query nor evidence.' },
      ],
      examPoints: [
        'Draw the **dentist joint table** (Toothache, Catch, Cavity).',
        'Compute **P(cavity) = 0.2** and **P(Cavity | toothache) = ⟨0.6, 0.4⟩**.',
        'Explain marginalisation and normalisation with formulas.',
        'State the 2ⁿ scaling problem.',
      ],
      questions: [
        {
          prompt: 'Explain inference using full joint distributions with an example.',
          plan: ANSWER_PLAN(
            'Computing posteriors by summing joint entries',
            'Toothache–Catch–Cavity joint table',
            'Marginalisation, conditioning, normalisation; general formula',
            'P(cavity) = 0.2; P(Cavity | toothache) = ⟨0.6, 0.4⟩',
            'O(2ⁿ) space and time',
          ),
        },
      ],
      keywords: ['probabilistic inference', 'full joint distribution', 'marginalisation', 'summing out', 'conditioning', 'normalisation', 'α'],
      remember: [
        { prompt: 'P(cavity) from the dentist table?', answer: '0.2' },
        { prompt: 'P(Cavity | toothache)?', answer: '⟨0.6, 0.4⟩' },
        { prompt: 'Why is the full joint method impractical?', answer: 'It needs 2ⁿ entries for n Boolean variables.' },
      ],
    },

    // ------------------------------------------------------------------
    'independence': {
      difficulty: 'medium',
      intro: 'Independence is what makes probabilistic AI practical: it splits one huge table into small ones.',
      definition:
        'Two propositions a and b are **independent** if P(a | b) = P(a), equivalently **P(a ∧ b) = P(a) P(b)**. Variables X and Y are **conditionally independent** given Z if **P(X, Y | Z) = P(X | Z) P(Y | Z)**.',
      simpleExplanation: {
        text: 'If knowing one thing tells you nothing about another, they are independent — weather does not affect your teeth. Often things are linked only through a common cause: toothache and the probe catching are both caused by a cavity, so once you know about the cavity, they no longer tell you anything about each other.',
        analogy: 'Two students copy from the same topper. Their answers look related — but once you know the topper’s answers, one student’s paper tells you nothing new about the other’s.',
      },
      visual: {
        type: 'comparison',
        title: 'Absolute vs conditional independence',
        items: [
          {
            title: 'Absolute independence',
            tone: 'muted',
            points: ['P(a ∧ b) = P(a) P(b)', 'Example — Weather and dental problems', 'Splits the joint table into separate tables', 'Rare in practice'],
          },
          {
            title: 'Conditional independence',
            tone: 'accent',
            points: ['P(X, Y | Z) = P(X | Z) P(Y | Z)', 'Example — Toothache and Catch given Cavity', 'Common cause separates effects', 'Basis of Bayesian networks'],
          },
        ],
      },
      explanation: [
        { heading: 'Absolute independence' },
        'P(Toothache, Catch, Cavity, Weather) = P(Toothache, Catch, Cavity) · P(Weather). The table drops from 32 entries (8 × 4) to **12** (8 + 4).',
        { heading: 'Conditional independence' },
        'Toothache and Catch both depend on Cavity, but not on each other:',
        { code: 'P(Toothache, Catch | Cavity) = P(Toothache | Cavity) P(Catch | Cavity)', lang: 'text' },
        'So the full joint becomes **P(Toothache | Cavity) P(Catch | Cavity) P(Cavity)**.',
        { heading: 'Why it matters' },
        'With n effects that are conditionally independent given one cause, the representation grows as **O(n)** instead of **O(2ⁿ)**. This is the key idea behind naive Bayes and Bayesian networks.',
        { trap: 'Independent does **not** mean mutually exclusive. Mutually exclusive events (P(a ∧ b) = 0) are actually strongly dependent.' },
      ],
      example: {
        title: 'Checking independence',
        input: 'P(cavity) = 0.2, P(toothache) = 0.2, P(cavity ∧ toothache) = 0.12',
        output: `P(cavity) × P(toothache) = 0.2 × 0.2 = 0.04
P(cavity ∧ toothache)    = 0.12
0.04 ≠ 0.12 → Cavity and Toothache are NOT independent`,
        explanation: 'A toothache makes a cavity much more likely, so the variables are dependent — as expected.',
      },
      keyPoints: [
        'Independent: P(a | b) = P(a) or P(a ∧ b) = P(a) P(b).',
        'Conditional independence: P(X, Y | Z) = P(X | Z) P(Y | Z).',
        'Independence factors big tables into small ones.',
        'n conditionally independent effects: O(n) instead of O(2ⁿ).',
        'Independent ≠ mutually exclusive.',
      ],
      importantTerms: [
        { term: 'Absolute independence', meaning: 'Knowing one variable never changes belief in the other.' },
        { term: 'Conditional independence', meaning: 'Independence that holds once a third variable is known.' },
        { term: 'Factoring', meaning: 'Splitting a joint distribution into a product of smaller ones.' },
      ],
      examPoints: [
        'Write all three equivalent forms of independence.',
        'Explain **conditional independence** with Toothache, Catch and Cavity.',
        'Show the saving from 32 to 12 entries.',
        'State O(n) vs O(2ⁿ).',
      ],
      questions: [
        {
          prompt: 'Explain independence and conditional independence with examples.',
          plan: ANSWER_PLAN(
            'P(a ∧ b) = P(a) P(b); P(X, Y | Z) = P(X | Z) P(Y | Z)',
            'Cavity node with arrows to Toothache and Catch',
            'Absolute independence factoring; conditional independence; reduced size',
            'Weather vs dental variables; Toothache and Catch given Cavity',
            'O(n) instead of O(2ⁿ); basis of Bayesian networks',
          ),
        },
      ],
      keywords: ['independence', 'conditional independence', 'factoring', 'common cause', 'O(n)', 'mutually exclusive'],
      remember: [
        { prompt: 'Test for independence of a and b?', answer: 'P(a ∧ b) = P(a) P(b)' },
        { prompt: 'Toothache and Catch are independent given…?', answer: 'Cavity.' },
        { prompt: 'Entries after factoring Weather out of the dental joint?', answer: '12 (8 + 4) instead of 32.' },
      ],
    },

    // ------------------------------------------------------------------
    'bayes-rule-and-its-use': {
      difficulty: 'medium',
      intro: 'Bayes’ rule is the most used formula in probabilistic AI — and a sure-shot numerical exam question.',
      definition:
        "**Bayes' rule**: P(b | a) = P(a | b) P(b) / P(a). It lets us compute a **diagnostic** probability P(cause | effect) from the **causal** probability P(effect | cause), which is usually easier to know.",
      simpleExplanation: {
        text: 'Doctors know how often a disease causes a symptom. Patients ask the reverse: given my symptom, how likely is the disease? Bayes’ rule flips the direction of the conditional using the prior probability of the disease.',
        analogy: 'You know most rainy days are cloudy. Bayes tells you how likely rain is on a cloudy day — which also depends on how common rain and clouds are in your city.',
      },
      visual: {
        type: 'flow',
        title: 'Flipping a conditional with Bayes',
        steps: [
          { label: 'Causal knowledge', note: 'P(effect | cause)' },
          { label: 'Prior', note: 'P(cause)' },
          { label: 'Bayes’ rule', note: 'P(cause | effect) = P(effect | cause) P(cause) / P(effect)' },
          { label: 'Diagnosis', note: 'P(cause | effect)' },
        ],
      },
      explanation: [
        { heading: 'Derivation' },
        'From the product rule, P(a ∧ b) = P(a | b) P(b) = P(b | a) P(a). Divide by P(a):',
        { code: 'P(b | a) = P(a | b) P(b) / P(a)', lang: 'text' },
        { heading: 'With normalisation' },
        '**P(Y | X) = α P(X | Y) P(Y)** — no need to know P(X) directly.',
        { heading: 'Why diagnostic knowledge is fragile' },
        'If a meningitis epidemic starts, P(m) rises. A doctor using causal knowledge P(s | m) plus the new prior gets the right answer; directly stored diagnostic knowledge P(m | s) would be out of date.',
        { heading: 'Combining evidence' },
        'With several pieces of evidence that are conditionally independent given the cause:',
        { code: 'P(Cavity | toothache ∧ catch) = α P(toothache | Cavity) P(catch | Cavity) P(Cavity)', lang: 'text' },
      ],
      example: {
        title: 'Meningitis and stiff neck',
        input: 'P(s | m) = 0.7, P(m) = 1/50000, P(s) = 0.01',
        output: `P(m | s) = P(s | m) P(m) / P(s)
         = 0.7 × (1/50000) / 0.01
         = 0.0014   (about 1 in 714)`,
        explanation: 'Even though meningitis usually causes a stiff neck, a stiff neck rarely means meningitis — because meningitis is very rare.',
      },
      keyPoints: [
        'P(b | a) = P(a | b) P(b) / P(a).',
        'Turns causal knowledge into diagnostic knowledge.',
        'Normalised form: P(Y | X) = α P(X | Y) P(Y).',
        'Causal knowledge is more robust than diagnostic knowledge.',
        'Combine conditionally independent evidence by multiplying.',
      ],
      importantTerms: [
        { term: 'Causal probability', meaning: 'P(effect | cause).' },
        { term: 'Diagnostic probability', meaning: 'P(cause | effect).' },
        { term: 'Prior', meaning: 'P(cause) before seeing evidence.' },
        { term: 'Likelihood', meaning: 'P(evidence | hypothesis).' },
      ],
      examPoints: [
        "**Derive** Bayes' rule from the product rule.",
        'Solve the **meningitis** example step by step.',
        'Explain causal vs diagnostic direction.',
        'Show combining two pieces of evidence.',
      ],
      questions: [
        {
          prompt: "State and derive Bayes' rule. Explain its use with an example.",
          plan: ANSWER_PLAN(
            'P(b | a) = P(a | b) P(b) / P(a)',
            'Causal → Bayes → diagnostic flow',
            'Derivation from product rule; normalisation; combining evidence',
            'Meningitis: P(m | s) = 0.0014',
            'Causal knowledge is robust; α avoids computing P(a)',
          ),
        },
      ],
      keywords: ["Bayes' rule", 'product rule', 'causal', 'diagnostic', 'prior', 'likelihood', 'posterior', 'normalisation'],
      remember: [
        { prompt: "Bayes' rule?", answer: 'P(b | a) = P(a | b) P(b) / P(a)' },
        { prompt: 'P(m | s) in the meningitis example?', answer: '0.0014' },
        { prompt: 'Which direction is usually easier to know?', answer: 'Causal — P(effect | cause).' },
      ],
    },

    // ------------------------------------------------------------------
    'naive-bayes-models': {
      difficulty: 'medium',
      intro: 'A simple model used in spam filters and text classifiers — and a short, reliable exam answer.',
      definition:
        'A **naive Bayes model** assumes that all effects are **conditionally independent given a single cause**. The full joint is P(Cause, E₁, …, Eₙ) = P(Cause) Π P(Eᵢ | Cause), and the posterior is **P(Cause | e) = α P(Cause) Π P(eⱼ | Cause)**.',
      simpleExplanation: {
        text: 'Pretend each clue depends only on the cause and not on the other clues. Then score each possible cause by multiplying its prior with the probability of each observed clue. The cause with the highest score wins. The assumption is “naive” because it is often not exactly true — but it works surprisingly well.',
        analogy: 'Guessing a film’s genre from words in its review: “explosion”, “chase”, “hero” each push towards Action, and you simply multiply the evidence.',
      },
      visual: {
        type: 'network',
        title: 'Naive Bayes structure',
        center: { label: 'Category', note: 'the cause' },
        nodes: [
          { label: 'Word 1', note: 'HasWord₁' },
          { label: 'Word 2', note: 'HasWord₂' },
          { label: 'Word 3', note: 'HasWord₃' },
          { label: 'Word n', note: 'HasWordₙ' },
        ],
        caption: 'One cause, many effects; effects are independent given the cause.',
      },
      explanation: [
        { heading: 'Model' },
        { code: 'P(Cause | e₁, …, eₙ) = α P(Cause) × P(e₁ | Cause) × … × P(eₙ | Cause)', lang: 'text' },
        'Unobserved effects are simply left out — they sum to 1.',
        { heading: 'Text classification' },
        {
          list: [
            '**Category** — e.g. news, sports, business, weather.',
            '**Effects** — `HasWordᵢ`: whether keyword i appears.',
            '**Prior P(Category)** — fraction of documents in each category.',
            '**P(HasWordᵢ | Category)** — fraction of documents in that category containing the word.',
          ],
        },
        { heading: 'Pros and cons' },
        {
          list: [
            '**Fast and scalable** — linear in the number of effects.',
            '**Needs little data** and handles missing evidence easily.',
            '**Assumption often false** — probabilities can be over-confident, but rankings are usually right.',
          ],
        },
      ],
      example: {
        title: 'Spam or not?',
        input: 'P(spam) = 0.4. Email contains “free” and “winner”. P(free | spam) = 0.5, P(winner | spam) = 0.4, P(free | ham) = 0.05, P(winner | ham) = 0.02.',
        output: `spam : 0.4 × 0.5 × 0.4   = 0.080
ham  : 0.6 × 0.05 × 0.02 = 0.0006
Normalise: P(spam | e) = 0.080 / 0.0806 ≈ 0.99 → SPAM`,
        explanation: 'Each word multiplies the evidence. Normalising the two scores gives the posterior.',
      },
      keyPoints: [
        'One cause, many conditionally independent effects.',
        'P(Cause | e) = α P(Cause) Π P(eⱼ | Cause).',
        'Called “naive” because the independence assumption is often false.',
        'Used in spam filtering and text classification.',
        'Fast, simple and needs little data.',
      ],
      importantTerms: [
        { term: 'Naive Bayes', meaning: 'Model assuming effects are independent given the cause.' },
        { term: 'Text classification', meaning: 'Assigning documents to categories.' },
        { term: 'Bag of words', meaning: 'Treating a document as a set of word occurrences.' },
      ],
      examPoints: [
        'Draw the **naive Bayes network** (cause → effects).',
        'Write the **posterior formula**.',
        'Explain text classification with features and priors.',
        'Solve a small numeric example.',
      ],
      questions: [
        {
          prompt: 'Explain naive Bayes models with an application.',
          plan: ANSWER_PLAN(
            'Effects conditionally independent given one cause',
            'Cause node with arrows to effect nodes',
            'Joint and posterior formulas; why “naive”',
            'Spam classification calculation',
            'Fast, scalable; used in text classification',
          ),
        },
      ],
      keywords: ['naive Bayes', 'conditional independence', 'cause', 'effects', 'text classification', 'spam filter', 'posterior'],
      remember: [
        { prompt: 'Why is it called “naive”?', answer: 'It assumes effects are independent given the cause, which is often not exactly true.' },
        { prompt: 'Naive Bayes posterior formula?', answer: 'α P(Cause) Π P(eⱼ | Cause)' },
        { prompt: 'A common application?', answer: 'Spam filtering / text classification.' },
      ],
    },

    // ------------------------------------------------------------------
    'the-wumpus-world-revisited': {
      difficulty: 'hard',
      intro: 'Logic left the agent stuck in the wumpus world. Probability tells it which square is safest.',
      definition:
        'The wumpus world revisited shows probabilistic reasoning in a partially observable environment. Pits occur independently with probability 0.2; breezes are observed next to pits. Using **conditional independence** of distant squares, the agent computes the probability of a pit in each **frontier** square and chooses the safest move.',
      simpleExplanation: {
        text: 'After feeling breezes in [1,2] and [2,1], logic can only say “a pit might be in [1,3], [2,2] or [3,1]”. Probability goes further: [2,2] is involved in explaining **both** breezes, so it is far more likely to hold a pit (0.86) than [1,3] or [3,1] (0.31).',
        analogy: 'If two neighbours both hear noise, the house between them is the most likely source.',
      },
      visual: {
        type: 'boxes',
        title: 'Pit probabilities in the frontier squares',
        items: [
          { label: '[1,3]', value: 'P(pit) ≈ 0.31', tag: 'fairly safe' },
          { label: '[2,2]', value: 'P(pit) ≈ 0.86', tag: 'avoid' },
          { label: '[3,1]', value: 'P(pit) ≈ 0.31', tag: 'fairly safe' },
        ],
      },
      explanation: [
        { heading: 'Setting' },
        {
          list: [
            'Each square other than [1,1] has a pit with probability **0.2**, independently.',
            'Visited squares [1,1], [1,2], [2,1] are safe (known).',
            'Breeze observed in [1,2] and [2,1].',
            'Query: P(P₁,₃ | known, breeze).',
          ],
        },
        { heading: 'Using conditional independence' },
        'Split unknown squares into the **frontier** (next to visited squares: [1,3], [2,2], [3,1]) and **other** squares. Breezes depend only on the frontier, so the other squares sum out to 1:',
        { code: 'P(P₁,₃ | known, b) = α′ P(P₁,₃) Σ_frontier P(b | known, P₁,₃, frontier) P(frontier)', lang: 'text' },
        'Only frontier models consistent with the breezes count. Their probabilities are products of 0.2 (pit) and 0.8 (no pit).',
        { tip: 'This reduces work from 2¹² models to just a few frontier models.' },
      ],
      example: {
        title: 'Computing P(pit in [1,3])',
        input: 'Frontier squares other than [1,3]: [2,2], [3,1]. Breezes in [1,2] and [2,1].',
        output: `If P₁,₃ = true: consistent frontiers
  [2,2]+[3,1] pits: 0.2×0.2 = 0.04, [2,2] only: 0.2×0.8 = 0.16,
  [3,1] only: 0.8×0.2 = 0.16 → sum = 0.36 → 0.2 × 0.36 = 0.072
If P₁,₃ = false: consistent frontiers
  [2,2]+[3,1]: 0.04, [2,2] only: 0.16 → sum = 0.20 → 0.8 × 0.20 = 0.16
Normalise: ⟨0.072, 0.16⟩ → P(P₁,₃) ≈ ⟨0.31, 0.69⟩`,
        explanation: 'The same method gives P(P₂,₂) ≈ 0.86. The agent should move to [1,3] or [3,1], never [2,2].',
      },
      keyPoints: [
        'Pit prior = 0.2 per square, independently.',
        'Only frontier squares matter for the breeze observations.',
        'Conditional independence removes most of the model space.',
        'Result: P([1,3]) = P([3,1]) ≈ 0.31, P([2,2]) ≈ 0.86.',
        'Probability gives a decision where logic could not.',
      ],
      importantTerms: [
        { term: 'Frontier', meaning: 'Unvisited squares next to visited ones.' },
        { term: 'Consistent model', meaning: 'An assignment of pits that explains all observed breezes.' },
        { term: 'Summing out', meaning: 'Removing irrelevant variables by adding over their values.' },
      ],
      examPoints: [
        'Draw the **4 × 4 grid** with visited squares, breezes and frontier.',
        'State the pit prior (0.2) and the query.',
        'Show the frontier calculation and the **0.31 / 0.86** results.',
        'Explain why logic alone could not decide.',
      ],
      questions: [
        {
          prompt: 'Explain the wumpus world revisited using probabilistic reasoning.',
          plan: ANSWER_PLAN(
            'Using probability to choose safe squares in the wumpus world',
            'Grid with [1,1], [1,2], [2,1] visited and frontier marked',
            'Pit prior, frontier vs other, conditional independence, consistent models',
            'P(P₁,₃) ≈ 0.31, P(P₂,₂) ≈ 0.86',
            'Probability beats logic when uncertain',
          ),
        },
      ],
      keywords: ['wumpus world', 'pit prior 0.2', 'breeze', 'frontier', 'consistent models', 'conditional independence', 'summing out'],
      remember: [
        { prompt: 'Prior probability of a pit?', answer: '0.2' },
        { prompt: 'P(pit in [2,2]) after both breezes?', answer: 'About 0.86.' },
        { prompt: 'P(pit in [1,3])?', answer: 'About 0.31.' },
      ],
    },

    // ------------------------------------------------------------------
    'representing-knowledge-in-an-uncertain-domain': {
      difficulty: 'medium',
      intro: 'Bayesian networks are the central tool of the unit. Learn the burglary-alarm example by heart.',
      definition:
        'A **Bayesian network** is a **directed acyclic graph** in which each node is a random variable, each arrow X → Y means X is a **parent** (direct influence) of Y, and each node Xᵢ has a **conditional probability table (CPT)** giving P(Xᵢ | Parents(Xᵢ)). It represents the full joint distribution compactly.',
      simpleExplanation: {
        text: 'Draw an arrow from each cause to each effect. Then, for every node, write a small table saying how likely it is for each combination of its parents. These small tables together hold all the information of the giant joint table.',
        analogy: 'A family tree of influences: each person only needs to know about their parents, not every ancestor.',
      },
      visual: {
        type: 'architecture',
        title: 'Burglary network',
        layers: [
          { label: 'Causes', items: ['Burglary  P(B) = 0.001', 'Earthquake  P(E) = 0.002'] },
          { label: 'Alarm', note: 'parents: Burglary, Earthquake', items: ['P(A | B, E) from a 4-row CPT'] },
          { label: 'Neighbours call', note: 'parent: Alarm', items: ['JohnCalls  P(J | A) = 0.90', 'MaryCalls  P(M | A) = 0.70'] },
        ],
      },
      explanation: [
        { heading: 'Components' },
        {
          list: [
            'A set of nodes — one per random variable.',
            'Directed links forming a **DAG** (no cycles).',
            'A **CPT** at each node: P(Xᵢ | Parents(Xᵢ)).',
          ],
        },
        { heading: 'The burglary example' },
        'You have a burglar alarm that also responds to minor earthquakes. Neighbours John and Mary call when they hear it. John sometimes confuses the phone ringing with the alarm; Mary listens to loud music and sometimes misses it.',
        {
          table: {
            columns: ['B', 'E', 'P(A | B, E)'],
            rows: [
              ['T', 'T', '0.95'],
              ['T', 'F', '0.94'],
              ['F', 'T', '0.29'],
              ['F', 'F', '0.001'],
            ],
          },
        },
        'Also P(J | ¬A) = 0.05 and P(M | ¬A) = 0.01.',
        { heading: 'Compactness' },
        'A CPT for a Boolean node with k parents needs 2ᵏ rows. With n nodes, the network needs about **n · 2ᵏ** numbers instead of **2ⁿ**. The burglary network needs **10** numbers instead of 31.',
      ],
      example: {
        title: 'Counting parameters',
        input: 'Burglary network: B, E have 0 parents; A has 2; J, M have 1.',
        output: `B: 1   E: 1   A: 4   J: 2   M: 2
Total = 10 numbers
Full joint for 5 Boolean variables = 2⁵ − 1 = 31 numbers`,
        explanation: 'Because each node depends only on its parents, the network is three times smaller here — and exponentially smaller in large domains.',
      },
      keyPoints: [
        'Bayesian network = DAG + CPT at each node.',
        'Arrow X → Y: X directly influences Y.',
        'CPT: P(Xᵢ | Parents(Xᵢ)), 2ᵏ rows for k Boolean parents.',
        'Compact: n · 2ᵏ vs 2ⁿ numbers.',
        'Burglary network: 10 numbers instead of 31.',
      ],
      importantTerms: [
        { term: 'Bayesian network', meaning: 'A DAG of random variables with CPTs encoding the joint distribution.' },
        { term: 'DAG', meaning: 'Directed acyclic graph — arrows, no cycles.' },
        { term: 'CPT', meaning: 'Conditional probability table P(X | Parents(X)).' },
        { term: 'Parent', meaning: 'A node with an arrow into another node.' },
      ],
      examPoints: [
        'Define a Bayesian network: **nodes, links, CPTs, DAG**.',
        'Draw the **burglary network** with its CPTs.',
        'Explain compactness: n · 2ᵏ vs 2ⁿ.',
      ],
      questions: [
        {
          prompt: 'What is a Bayesian network? Explain with the burglary alarm example.',
          plan: ANSWER_PLAN(
            'DAG of random variables with a CPT at each node',
            'Burglary, Earthquake → Alarm → JohnCalls, MaryCalls',
            'Nodes, links, CPTs; meaning of arrows',
            'CPT of Alarm; P(J | A) = 0.90, P(M | A) = 0.70',
            'Compact: 10 numbers vs 31',
          ),
        },
      ],
      keywords: ['Bayesian network', 'DAG', 'node', 'parent', 'CPT', 'burglary alarm', 'compactness'],
      remember: [
        { prompt: 'What does each node of a Bayesian network hold?', answer: 'A CPT: P(X | Parents(X)).' },
        { prompt: 'Parents of Alarm?', answer: 'Burglary and Earthquake.' },
        { prompt: 'Numbers needed for the burglary network?', answer: '10 (vs 31 for the full joint).' },
      ],
    },

    // ------------------------------------------------------------------
    'the-semantics-of-bayesian-networks': {
      difficulty: 'hard',
      intro: 'What the network actually means: one product formula, plus rules about who is independent of whom.',
      definition:
        'A Bayesian network defines the full joint distribution as the product of its local CPTs: **P(x₁, …, xₙ) = Π P(xᵢ | parents(Xᵢ))**. Equivalently, it asserts that each node is **conditionally independent of its non-descendants given its parents**, and independent of all other nodes given its **Markov blanket**.',
      simpleExplanation: {
        text: 'To get the probability of any complete situation, multiply each node’s probability given its parents. This works because the network promises: once you know a node’s parents, its other ancestors and unrelated nodes add no new information.',
        analogy: 'To predict whether Mary calls, you only need to know if the alarm rang. Whether it was a burglar or an earthquake no longer matters.',
      },
      visual: {
        type: 'comparison',
        title: 'Two equivalent views of the semantics',
        items: [
          {
            title: 'Numerical view',
            tone: 'muted',
            points: ['Joint = product of CPT entries', 'P(x₁…xₙ) = Π P(xᵢ | parents(Xᵢ))', 'Used to compute probabilities'],
          },
          {
            title: 'Topological view',
            tone: 'accent',
            points: ['Node ⟂ non-descendants given parents', 'Node ⟂ everything given its Markov blanket', 'Used to read independence'],
          },
        ],
      },
      explanation: [
        { heading: 'Chain rule' },
        'Any joint can be written P(x₁, …, xₙ) = Π P(xᵢ | xᵢ₋₁, …, x₁). The network is correct if, for each node, P(Xᵢ | Xᵢ₋₁, …, X₁) = P(Xᵢ | Parents(Xᵢ)) — i.e. the parents are enough.',
        { heading: 'Constructing a network' },
        {
          list: [
            'Choose an ordering of the variables — **causes before effects** gives the most compact network.',
            'For each variable in order, choose as parents a minimal set of earlier variables that directly influence it.',
            'Write its CPT.',
          ],
          ordered: true,
        },
        { trap: 'A bad ordering (effects first: MaryCalls, JohnCalls, Alarm, …) gives more links and harder-to-estimate numbers.' },
        { heading: 'Markov blanket' },
        'A node’s **Markov blanket** = its **parents + children + children’s other parents**. Given the blanket, the node is independent of every other node.',
        { heading: 'Efficient CPTs' },
        '**Noisy-OR** models a node with many causes using one inhibition probability per cause — k numbers instead of 2ᵏ. Continuous variables use parametric forms such as the **linear Gaussian** distribution.',
      ],
      example: {
        title: 'Probability of a full situation',
        input: 'Alarm sounds, both John and Mary call, no burglary, no earthquake.',
        output: `P(j, m, a, ¬b, ¬e) = P(j | a) P(m | a) P(a | ¬b, ¬e) P(¬b) P(¬e)
                  = 0.90 × 0.70 × 0.001 × 0.999 × 0.998
                  ≈ 0.000628`,
        explanation: 'Five CPT look-ups, multiplied — no giant table needed.',
      },
      keyPoints: [
        'P(x₁…xₙ) = Π P(xᵢ | parents(Xᵢ)).',
        'Node is independent of non-descendants given its parents.',
        'Markov blanket = parents + children + children’s parents.',
        'Order variables causes-first for a compact network.',
        'Noisy-OR and linear Gaussians keep CPTs small.',
      ],
      importantTerms: [
        { term: 'Chain rule', meaning: 'Writing a joint as a product of conditionals.' },
        { term: 'Markov blanket', meaning: 'Parents, children and children’s other parents of a node.' },
        { term: 'Noisy-OR', meaning: 'Compact CPT for a node with several independent causes.' },
        { term: 'Non-descendants', meaning: 'Nodes that cannot be reached by following arrows from the node.' },
      ],
      examPoints: [
        'Write the **product formula** and derive it from the chain rule.',
        'State the two conditional-independence properties.',
        'Define and draw the **Markov blanket**.',
        'Compute **P(j, m, a, ¬b, ¬e) ≈ 0.000628**.',
      ],
      questions: [
        {
          prompt: 'Explain the semantics of Bayesian networks.',
          plan: ANSWER_PLAN(
            'Joint = product of local conditional probabilities',
            'Burglary network with Markov blanket of Alarm shaded',
            'Chain rule; construction by ordering; independence properties; noisy-OR',
            'P(j, m, a, ¬b, ¬e) ≈ 0.000628',
            'Causal ordering gives compact networks',
          ),
        },
      ],
      keywords: ['semantics', 'chain rule', 'product of CPTs', 'non-descendants', 'Markov blanket', 'node ordering', 'noisy-OR'],
      remember: [
        { prompt: 'Markov blanket of a node?', answer: 'Its parents, children and children’s other parents.' },
        { prompt: 'Best ordering for building a network?', answer: 'Causes before effects.' },
        { prompt: 'P(j, m, a, ¬b, ¬e)?', answer: '≈ 0.000628' },
      ],
    },

    // ------------------------------------------------------------------
    'exact-inference-in-bayesian-networks': {
      difficulty: 'hard',
      intro: 'How to answer “given John and Mary called, was there a burglary?” exactly.',
      definition:
        'Exact inference computes the posterior **P(X | e)** for query variable X given evidence e by summing over hidden variables: **P(X | e) = α Σ_y P(X, e, y)**. Methods: **inference by enumeration**, the **variable elimination** algorithm (which avoids repeated work), and **clustering** (join-tree) algorithms.',
      simpleExplanation: {
        text: 'Write the query as a sum of products of CPT entries over all hidden variables. **Enumeration** computes every term — simple but repetitive. **Variable elimination** computes each shared piece once, stores it as a **factor**, and reuses it.',
        analogy: 'Adding up a long bill: instead of re-adding the same items again and again, you subtotal each section once.',
      },
      visual: {
        type: 'process',
        title: 'Variable elimination',
        steps: [
          { label: 'Write the query', detail: 'P(B | j, m) = α Σₑ Σₐ P(B) P(e) P(a | B, e) P(j | a) P(m | a)' },
          { label: 'Make factors', detail: 'one per CPT, restricted to evidence' },
          { label: 'Eliminate a hidden variable', detail: 'multiply factors containing it, then sum it out' },
          { label: 'Repeat', detail: 'until only the query variable remains' },
          { label: 'Normalise', detail: 'multiply by α' },
        ],
      },
      explanation: [
        { heading: 'Inference by enumeration' },
        { code: 'P(B | j, m) = α P(B) Σₑ P(e) Σₐ P(a | B, e) P(j | a) P(m | a)', lang: 'text' },
        'Evaluated depth-first. Space is linear, but time is **O(2ⁿ)** because sub-expressions such as P(j | a) P(m | a) are computed repeatedly.',
        { heading: 'Variable elimination' },
        'Works right-to-left, storing intermediate results as **factors** (tables). Two operations: **pointwise product** of factors and **summing out** a variable. Variables irrelevant to the query (not ancestors of query or evidence) can be removed first.',
        { heading: 'Complexity' },
        {
          list: [
            '**Polytrees** (singly connected — at most one path between any two nodes): time and space **linear** in network size.',
            '**Multiply connected** networks: exact inference is **#P-hard** in the worst case (at least as hard as counting SAT solutions).',
          ],
        },
        { heading: 'Clustering algorithms' },
        'Join individual nodes into **meganodes** so the network becomes a polytree, then run a linear-time algorithm. Useful when many queries are asked on the same network.',
      ],
      example: {
        title: 'Was there a burglary?',
        input: 'Evidence: JohnCalls = true, MaryCalls = true. Query: Burglary.',
        output: `Unnormalised: b → 0.00059224,  ¬b → 0.0014919
P(Burglary | j, m) = α ⟨0.00059224, 0.0014919⟩
                   ≈ ⟨0.284, 0.716⟩`,
        explanation: 'Even with both neighbours calling, a burglary is only about 28% likely, because burglaries are rare and both callers make mistakes.',
      },
      keyPoints: [
        'P(X | e) = α Σ_y P(X, e, y).',
        'Enumeration: simple, O(2ⁿ) time, repeated work.',
        'Variable elimination: factors, pointwise product, summing out.',
        'Polytrees: linear time; general networks: #P-hard.',
        'Clustering builds meganodes for many queries.',
      ],
      importantTerms: [
        { term: 'Enumeration', meaning: 'Summing the joint over all hidden-variable values.' },
        { term: 'Factor', meaning: 'A table of numbers over some variables, used in elimination.' },
        { term: 'Polytree', meaning: 'A network with at most one undirected path between any two nodes.' },
        { term: '#P-hard', meaning: 'At least as hard as counting the solutions of a SAT problem.' },
      ],
      examPoints: [
        'Write the **enumeration expression** for P(B | j, m).',
        'Explain variable elimination with factors.',
        'Give the answer **⟨0.284, 0.716⟩**.',
        'State complexity for polytrees vs multiply connected networks.',
      ],
      questions: [
        {
          prompt: 'Explain exact inference in Bayesian networks with an example.',
          plan: ANSWER_PLAN(
            'Computing P(X | e) by summing over hidden variables',
            'Enumeration tree or elimination steps',
            'Enumeration, variable elimination, factors, complexity, clustering',
            'P(Burglary | j, m) ≈ ⟨0.284, 0.716⟩',
            'Polytrees linear; general case #P-hard',
          ),
        },
      ],
      keywords: ['exact inference', 'enumeration', 'variable elimination', 'factor', 'pointwise product', 'summing out', 'polytree', '#P-hard', 'clustering'],
      remember: [
        { prompt: 'P(Burglary | j, m)?', answer: '≈ ⟨0.284, 0.716⟩' },
        { prompt: 'Why is variable elimination faster than enumeration?', answer: 'It stores factors and avoids repeated computation.' },
        { prompt: 'Complexity of inference in polytrees?', answer: 'Linear in the size of the network.' },
      ],
    },

    // ------------------------------------------------------------------
    'approximate-inference-for-bayesian-networks': {
      difficulty: 'hard',
      intro: 'Big networks are too hard to solve exactly. Sampling gives good-enough answers fast.',
      definition:
        'Approximate inference estimates posterior probabilities by **random sampling** (Monte Carlo). Methods: **direct sampling**, **rejection sampling**, **likelihood weighting**, and **Markov chain Monte Carlo (MCMC)** such as **Gibbs sampling**. Accuracy improves as the number of samples grows.',
      simpleExplanation: {
        text: 'Instead of calculating the exact answer, imagine the world many times. Generate thousands of random situations from the network, then count how often the query is true among those that match the evidence.',
        analogy: 'To estimate how often a coin lands heads, you do not solve physics equations — you flip it a thousand times and count.',
      },
      visual: {
        type: 'comparison',
        title: 'Sampling methods',
        table: {
          columns: ['Method', 'How it works', 'Weakness'],
          rows: [
            ['Direct (prior) sampling', 'Sample each variable in topological order from its CPT', 'Ignores evidence'],
            ['Rejection sampling', 'Generate samples, throw away those not matching evidence', 'Wastes most samples when evidence is rare'],
            ['Likelihood weighting', 'Fix evidence variables; weight each sample by P(evidence | parents)', 'Weights can become tiny with much evidence'],
            ['Gibbs sampling (MCMC)', 'Start anywhere; repeatedly resample one variable given its Markov blanket', 'Needs many steps to settle'],
          ],
        },
      },
      explanation: [
        { heading: 'Direct sampling' },
        'Sample variables in **topological order** (parents first), each from P(Xᵢ | parents). The fraction of samples with property x estimates P(x). The estimate is **consistent** — it converges to the true value as N → ∞.',
        { heading: 'Rejection sampling' },
        'Estimate P(X | e) by keeping only samples consistent with e and counting X among them. Simple, but if P(e) is small, almost all samples are rejected.',
        { heading: 'Likelihood weighting' },
        'Evidence variables are **fixed** to their observed values instead of sampled. Each sample gets weight **w = Π P(eᵢ | parents(Eᵢ))**. Sum weights per value of X and normalise. No samples are wasted.',
        { heading: 'Gibbs sampling (MCMC)' },
        'Start from any state with evidence fixed. Repeatedly pick a non-evidence variable and resample it from P(Xᵢ | **Markov blanket**). The fraction of time spent in each state approaches the posterior (a **stationary distribution** of the Markov chain).',
        { tip: 'Error of sampling estimates shrinks roughly as **1 / √N** with N samples.' },
      ],
      example: {
        title: 'Rejection sampling for rain',
        input: 'Sprinkler network. Query P(Rain | Sprinkler = true). 100 samples generated.',
        output: `Samples with Sprinkler = true : 27  (73 rejected)
   of these, Rain = true      : 8
   Rain = false               : 19
P(Rain | sprinkler) ≈ ⟨8/27, 19/27⟩ ≈ ⟨0.296, 0.704⟩
Exact answer                   = ⟨0.3, 0.7⟩`,
        explanation: 'The estimate is close to the true value, but 73% of the samples were thrown away — likelihood weighting avoids that waste.',
      },
      keyPoints: [
        'Approximate inference = Monte Carlo sampling.',
        'Direct sampling uses topological order.',
        'Rejection sampling discards samples inconsistent with evidence.',
        'Likelihood weighting fixes evidence and weights samples.',
        'Gibbs sampling resamples one variable given its Markov blanket.',
        'More samples → more accurate (error ∝ 1/√N).',
      ],
      importantTerms: [
        { term: 'Monte Carlo', meaning: 'Estimating quantities by random sampling.' },
        { term: 'Consistent estimate', meaning: 'Converges to the true value as samples increase.' },
        { term: 'Likelihood weight', meaning: 'Product of probabilities of evidence given their parents.' },
        { term: 'MCMC', meaning: 'Markov chain Monte Carlo — sampling by a random walk over states.' },
      ],
      examPoints: [
        'Explain **direct, rejection, likelihood weighting and Gibbs** sampling.',
        'Give the weight formula for likelihood weighting.',
        'Use the sprinkler example with numbers.',
        'Compare their weaknesses in a table.',
      ],
      questions: [
        {
          prompt: 'Explain approximate inference methods for Bayesian networks.',
          plan: ANSWER_PLAN(
            'Estimating posteriors by random sampling',
            'Comparison table of sampling methods',
            'Direct, rejection, likelihood weighting, Gibbs (MCMC)',
            'Rejection sampling: P(Rain | sprinkler) ≈ ⟨0.296, 0.704⟩',
            'Consistent estimates; error ∝ 1/√N',
          ),
        },
      ],
      keywords: ['approximate inference', 'Monte Carlo', 'direct sampling', 'rejection sampling', 'likelihood weighting', 'Gibbs sampling', 'MCMC', 'Markov blanket'],
      remember: [
        { prompt: 'Main weakness of rejection sampling?', answer: 'It rejects most samples when the evidence is unlikely.' },
        { prompt: 'In likelihood weighting, how are evidence variables handled?', answer: 'Fixed to observed values; samples are weighted.' },
        { prompt: 'Gibbs sampling resamples a variable given…?', answer: 'Its Markov blanket.' },
      ],
    },

    // ------------------------------------------------------------------
    'causal-networks': {
      difficulty: 'hard',
      intro: 'Correlation is not causation. Causal networks let an agent predict the effect of its own actions.',
      definition:
        'A **causal network** is a Bayesian network whose arrows represent genuine **cause → effect** relationships. Besides predicting what we will **observe**, it can predict the effect of **interventions** using the **do-operator**: P(Y | do(X = x)) is computed by cutting all arrows into X and fixing X = x.',
      simpleExplanation: {
        text: '**Seeing** and **doing** are different. Seeing the grass is wet makes rain more likely. But wetting the grass with a hose does not make rain more likely. A causal network handles this by “cutting” the arrows into a variable when we force its value.',
        analogy: 'Pushing the hands of a barometer down does not cause a storm, even though a falling barometer predicts one.',
      },
      visual: {
        type: 'comparison',
        title: 'Seeing vs doing',
        items: [
          {
            title: 'Observation — seeing',
            tone: 'muted',
            points: ['P(Rain | WetGrass = true)', 'Evidence flows back to causes', 'Wet grass ⇒ rain more likely'],
          },
          {
            title: 'Intervention — doing',
            tone: 'accent',
            points: ['P(Rain | do(WetGrass = true))', 'Cut arrows into WetGrass', 'Rain stays at its prior'],
          },
        ],
      },
      explanation: [
        { heading: 'Structural equations' },
        'Each variable is set by a **structural equation** xᵢ = fᵢ(parents, noise). The arrows show which variables each equation depends on — the causal mechanisms.',
        { heading: 'Interventions and the do-operator' },
        {
          list: [
            '**do(Xⱼ = xⱼ)** replaces Xⱼ’s equation with the constant xⱼ (the “mutilated” network).',
            'All other mechanisms stay unchanged.',
            'Then P(Y | do(X = x)) is computed by ordinary inference in the mutilated network.',
          ],
        },
        { heading: 'Back-door criterion' },
        'If a set of variables Z blocks all **back-door paths** (paths with an arrow into X) from X to Y, then **P(y | do(x)) = Σ_z P(y | x, z) P(z)**. This lets us predict intervention effects from **observational data**.',
        { note: 'Causal networks need careful construction from domain knowledge or experiments — a network built only from correlations may have arrows in the wrong direction.' },
      ],
      example: {
        title: 'Sprinkler and wet grass',
        input: 'Cloudy → Sprinkler, Cloudy → Rain; Sprinkler → WetGrass, Rain → WetGrass.',
        output: `Observe Sprinkler = on : evidence says Cloudy is less likely → Rain less likely
do(Sprinkler = on)     : cut Cloudy → Sprinkler; Cloudy and Rain keep their priors
                         only WetGrass is affected`,
        explanation: 'Turning the sprinkler on by hand tells us nothing about the weather — the intervention breaks the link from Cloudy.',
      },
      keyPoints: [
        'Causal network arrows = real causal mechanisms.',
        'Seeing (conditioning) ≠ doing (intervening).',
        'do(X = x): cut arrows into X, fix its value.',
        'Structural equations describe each mechanism.',
        'Back-door criterion: P(y | do(x)) = Σ_z P(y | x, z) P(z).',
      ],
      importantTerms: [
        { term: 'Intervention', meaning: 'Forcing a variable to a value from outside the system.' },
        { term: 'do-operator', meaning: 'Notation do(X = x) for an intervention.' },
        { term: 'Structural equation', meaning: 'Equation giving a variable as a function of its causes.' },
        { term: 'Back-door path', meaning: 'A path from X to Y starting with an arrow into X.' },
      ],
      examPoints: [
        'Define a causal network and contrast it with an ordinary Bayesian network.',
        'Explain **seeing vs doing** with an example.',
        'Explain the **do-operator** and network mutilation.',
        'State the back-door adjustment formula.',
      ],
      questions: [
        {
          prompt: 'What are causal networks? Explain interventions using the do-operator.',
          plan: ANSWER_PLAN(
            'Bayesian network whose arrows are causal mechanisms',
            'Sprinkler network before and after cutting arrows',
            'Structural equations; do-operator; seeing vs doing; back-door criterion',
            'do(Sprinkler = on) leaves Rain unchanged',
            'Predict effects of actions from observational data',
          ),
        },
      ],
      keywords: ['causal network', 'intervention', 'do-operator', 'structural equation', 'seeing vs doing', 'back-door criterion', 'mutilated network'],
      remember: [
        { prompt: 'What does do(X = x) do to the network?', answer: 'Cuts all arrows into X and fixes X = x.' },
        { prompt: 'Does wetting the grass make rain more likely?', answer: 'No — intervening on an effect does not change its causes.' },
        { prompt: 'Back-door adjustment formula?', answer: 'P(y | do(x)) = Σ_z P(y | x, z) P(z)' },
      ],
    },
  },
}
