// Foundations of Artificial Intelligence — Unit V: Decision Making.
// Topic ids match the syllabus outline in ../subjects.js (24CSU5DA).
// Textbook: Russell & Norvig, AI – A Modern Approach, 4th ed., Chapters 16–17.
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
    'Unit V puts beliefs and goals together to make decisions. Utility theory explains what a rational preference is; decision networks and the value of information turn it into a method. Then decisions become sequential: Markov decision processes, bandits and POMDPs plan over time, even when the agent cannot see the state clearly.',

  map: [
    { label: 'Why utilities', topics: ['combining-beliefs-and-desires-under-uncertainty', 'the-basis-of-utility-theory'] },
    { label: 'Measure preferences', topics: ['utility-functions', 'multiattribute-utility-functions', 'unknown-preferences'] },
    { label: 'Decide with a model', topics: ['decision-networks', 'the-value-of-information'] },
    { label: 'Decide over time', topics: ['sequential-decision-problems', 'algorithms-for-mdps', 'bandit-problems'] },
    { label: 'Decide without seeing', topics: ['partially-observable-mdps', 'algorithms-for-solving-pomdps'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'combining-beliefs-and-desires-under-uncertainty': {
      difficulty: 'easy',
      intro: 'The core formula of rational choice: expected utility. Everything else in the unit builds on it.',
      definition:
        'A decision-theoretic agent combines **beliefs** (probabilities of outcomes) and **desires** (utilities of outcomes). The **expected utility** of action a given evidence e is **EU(a | e) = Σ_s′ P(RESULT(a) = s′ | a, e) U(s′)**, and the **principle of maximum expected utility (MEU)** says choose `a* = argmax_a EU(a | e)`.',
      simpleExplanation: {
        text: 'For each action, list what could happen, how likely it is, and how good it would be. Multiply likelihood by goodness and add up — that is the action’s expected utility. Pick the action with the biggest number.',
        analogy: 'Deciding whether to carry an umbrella: weigh the chance of rain against how much you hate getting wet versus carrying an umbrella for nothing.',
      },
      visual: {
        type: 'flow',
        title: 'How an MEU agent decides',
        steps: [
          { label: 'Actions', note: 'possible choices' },
          { label: 'Outcomes', note: 'P(s′ | a, e)' },
          { label: 'Utilities', note: 'U(s′)' },
          { label: 'Expected utility', note: 'EU(a | e) = Σ P × U' },
          { label: 'Choose', note: 'argmax EU' },
        ],
      },
      explanation: [
        { heading: 'Key ideas' },
        {
          list: [
            '**Utility function U(s)** — a number expressing how desirable state s is.',
            '**Expected utility** — average utility of an action’s outcomes, weighted by their probabilities.',
            '**MEU principle** — a rational agent chooses the action with maximum expected utility.',
          ],
        },
        'MEU is the formal meaning of “doing the right thing”. Computing it requires a model of the world (for P), a way to evaluate outcomes (for U), and possibly search or planning to find which outcomes follow.',
        { note: 'Note the difference from goal-based agents: goals are just “achieved or not”; utilities measure **how good** each outcome is, so the agent can trade off risks.' },
      ],
      example: {
        title: 'Umbrella decision',
        input: 'P(rain) = 0.3. U(take, rain) = 70, U(take, dry) = 80, U(leave, rain) = 0, U(leave, dry) = 100.',
        output: `EU(take)  = 0.3 × 70 + 0.7 × 80  = 21 + 56 = 77
EU(leave) = 0.3 × 0   + 0.7 × 100 = 0 + 70  = 70
MEU action: take the umbrella`,
        explanation: 'Even though rain is less likely than not, the big loss from getting soaked makes taking the umbrella the rational choice.',
      },
      keyPoints: [
        'Beliefs = probabilities; desires = utilities.',
        'EU(a | e) = Σ P(s′ | a, e) U(s′).',
        'MEU: choose argmax_a EU(a | e).',
        'Utilities allow trade-offs that goals cannot express.',
      ],
      importantTerms: [
        { term: 'Utility', meaning: 'A number measuring how desirable a state is.' },
        { term: 'Expected utility', meaning: 'Probability-weighted average utility of an action’s outcomes.' },
        { term: 'MEU', meaning: 'Principle of maximum expected utility.' },
      ],
      examPoints: [
        'Write the **EU formula** and the **MEU principle**.',
        'Solve a small decision like the umbrella example.',
        'Contrast utilities with goals.',
      ],
      questions: [
        {
          prompt: 'Explain how beliefs and desires are combined under uncertainty.',
          plan: ANSWER_PLAN(
            'EU(a | e) = Σ P(s′ | a, e) U(s′); choose MEU action',
            'Actions → outcomes → utilities → EU',
            'Utility function, expected utility, MEU principle',
            'Umbrella: EU(take) = 77 > EU(leave) = 70',
            'Utilities express trade-offs; goals do not',
          ),
        },
      ],
      keywords: ['beliefs', 'desires', 'utility function', 'expected utility', 'MEU', 'argmax', 'decision-theoretic agent'],
      remember: [
        { prompt: 'Expected utility formula?', answer: 'EU(a | e) = Σ_s′ P(s′ | a, e) U(s′)' },
        { prompt: 'What does MEU say?', answer: 'Choose the action with maximum expected utility.' },
        { prompt: 'Utilities vs goals?', answer: 'Goals are yes/no; utilities measure how good an outcome is.' },
      ],
    },

    // ------------------------------------------------------------------
    'the-basis-of-utility-theory': {
      difficulty: 'medium',
      intro: 'Why should an agent maximise expected utility at all? Six simple axioms of rational preference force it to.',
      definition:
        'Utility theory starts from preferences between **lotteries** L = [p₁, S₁; …; pₙ, Sₙ]. If an agent’s preferences obey the **axioms of utility theory** — orderability, transitivity, continuity, substitutability, monotonicity, decomposability — then there exists a **utility function U** such that U(L) = Σ pᵢ U(Sᵢ) and the agent behaves as if maximising expected utility.',
      simpleExplanation: {
        text: 'Any choice under uncertainty is a choice between “lotteries” — sets of outcomes with probabilities. If your preferences are sensible (e.g. if you prefer A to B and B to C, you prefer A to C), then mathematically you can be described by a utility function, and your choices are exactly MEU choices.',
        analogy: 'If someone prefers tea to coffee, coffee to juice, but juice to tea, you could sell them each swap for a rupee forever — the “money pump”. Rational preferences avoid such traps.',
      },
      visual: {
        type: 'comparison',
        title: 'Axioms of utility theory',
        table: {
          columns: ['Axiom', 'Meaning'],
          rows: [
            ['Orderability', 'Exactly one of A ≻ B, B ≻ A, or A ~ B holds'],
            ['Transitivity', 'A ≻ B and B ≻ C ⇒ A ≻ C'],
            ['Continuity', 'A ≻ B ≻ C ⇒ some p makes [p, A; 1−p, C] ~ B'],
            ['Substitutability', 'A ~ B ⇒ lotteries with A and B swapped are equally preferred'],
            ['Monotonicity', 'A ≻ B ⇒ prefer the lottery giving A with higher probability'],
            ['Decomposability', 'Compound lotteries reduce to simple ones by probability rules'],
          ],
        },
      },
      explanation: [
        { heading: 'Notation' },
        {
          list: ['**A ≻ B** — the agent prefers A over B.', '**A ~ B** — the agent is indifferent.', '**A ≿ B** — prefers A or is indifferent.'],
        },
        { heading: 'From preferences to utility' },
        {
          list: [
            '**Existence of utility function:** U(A) > U(B) ⇔ A ≻ B, and U(A) = U(B) ⇔ A ~ B.',
            '**Expected utility of a lottery:** U([p₁, S₁; …; pₙ, Sₙ]) = Σ pᵢ U(Sᵢ).',
          ],
        },
        { trap: 'Utility theory does not say the agent consciously computes utilities. It says rational behaviour **can be described** by some utility function.' },
        'The utility function is not unique: any **positive affine transformation** U′(S) = aU(S) + b (a > 0) describes the same behaviour.',
      ],
      example: {
        title: 'The money pump',
        input: 'Agent prefers A ≻ B, B ≻ C, and C ≻ A (violates transitivity). It holds A.',
        output: `Offer C for A + 1 coin  → agent accepts (C ≻ A)
Offer B for C + 1 coin  → agent accepts (B ≻ C)
Offer A for B + 1 coin  → agent accepts (A ≻ B)
Back to A, 3 coins poorer … forever`,
        explanation: 'Intransitive preferences lead to irrational behaviour, which is why transitivity is an axiom.',
      },
      keyPoints: [
        'Choices under uncertainty are choices between lotteries.',
        'Six axioms: orderability, transitivity, continuity, substitutability, monotonicity, decomposability.',
        'Axioms ⇒ a utility function exists and U(L) = Σ pᵢ U(Sᵢ).',
        'Utility is unique only up to positive affine transformation.',
      ],
      importantTerms: [
        { term: 'Lottery', meaning: 'A set of outcomes with probabilities: [p₁, S₁; …; pₙ, Sₙ].' },
        { term: 'Preference', meaning: 'Relation ≻ (prefer), ~ (indifferent) between outcomes.' },
        { term: 'Money pump', meaning: 'Exploiting intransitive preferences to extract money repeatedly.' },
      ],
      examPoints: [
        'Define a **lottery** and the preference notation.',
        'List and explain the **six axioms**.',
        'State the utility principle and the MEU principle.',
        'Illustrate transitivity with the money pump.',
      ],
      questions: [
        {
          prompt: 'Explain the axioms of utility theory.',
          plan: ANSWER_PLAN(
            'Constraints on rational preferences over lotteries',
            'Table of six axioms',
            'Lotteries, notation, existence of U, expected utility of lotteries',
            'Money pump for intransitive preferences',
            'Utility unique up to affine transformation',
          ),
        },
      ],
      keywords: ['lottery', 'preference', 'orderability', 'transitivity', 'continuity', 'substitutability', 'monotonicity', 'decomposability', 'money pump'],
      remember: [
        { prompt: 'Name the six axioms of utility theory.', answer: 'Orderability, transitivity, continuity, substitutability, monotonicity, decomposability.' },
        { prompt: 'U of a lottery?', answer: 'Σ pᵢ U(Sᵢ)' },
        { prompt: 'What does A ~ B mean?', answer: 'The agent is indifferent between A and B.' },
      ],
    },

    // ------------------------------------------------------------------
    'utility-functions': {
      difficulty: 'medium',
      intro: 'Money is not utility. How people value risk explains insurance, lotteries and game-show choices.',
      definition:
        'A utility function maps states to real numbers. Utilities are found by **preference elicitation** against a standard lottery (best prize u⊤ = 1, worst u⊥ = 0). The **utility of money** is usually **concave**, making people **risk-averse**; the difference between expected monetary value and the **certainty equivalent** is the **insurance premium**.',
      simpleExplanation: {
        text: 'The first lakh you earn means far more to you than the hundredth lakh. So most people prefer a sure ₹1 crore over a 50% chance of ₹2.5 crore, even though the gamble has a higher average. Their utility of money bends downwards — they are risk-averse.',
        analogy: 'Insurance companies profit because people will pay a little more than the expected loss to avoid the risk of a big loss.',
      },
      visual: {
        type: 'comparison',
        title: 'Attitudes to risk',
        items: [
          { title: 'Risk-averse', tone: 'accent', points: ['Concave utility curve', 'Prefers a sure amount below the EMV', 'Buys insurance'] },
          { title: 'Risk-neutral', tone: 'muted', points: ['Linear utility curve', 'Utility = money', 'Indifferent between EMV and gamble'] },
          { title: 'Risk-seeking', tone: 'muted', points: ['Convex utility curve', 'Prefers the gamble', 'Typical in desperate situations'] },
        ],
      },
      explanation: [
        { heading: 'Assessing utilities' },
        'Fix the best outcome u⊤ = 1 and worst u⊥ = 0. For any outcome S, ask: at what probability p is the agent indifferent between S and the lottery [p, u⊤; 1−p, u⊥]? Then **U(S) = p**. These are **normalised utilities**.',
        'Special units: **micromort** — a one-in-a-million chance of death; **QALY** — quality-adjusted life year, used in medical decisions.',
        { heading: 'Utility of money' },
        {
          list: [
            '**Expected monetary value (EMV)** — the average money of a gamble.',
            '**Certainty equivalent** — the sure amount the agent values equally to the gamble.',
            '**Insurance premium** = EMV − certainty equivalent.',
          ],
        },
        { heading: 'Human irrationality' },
        {
          list: [
            '**Certainty effect / Allais paradox** — people overvalue sure outcomes.',
            '**Ambiguity aversion / Ellsberg paradox** — people prefer known risks to unknown ones.',
            '**Framing effect** — “90% survival” is preferred to “10% death”, though identical.',
          ],
        },
        { note: '**Optimizer’s curse:** the option with the highest estimated EU tends to be over-estimated, so actual results are often disappointing.' },
      ],
      example: {
        title: 'The game show',
        input: 'Take ₹1,000,000 now, or flip a coin for ₹2,500,000 or nothing.',
        output: `EMV(gamble) = 0.5 × 2,500,000 + 0.5 × 0 = 1,250,000
EMV(accept) = 1,000,000
Most people accept ₹1,000,000 → risk-averse
Utility of money is concave: U(1M) > 0.5 U(2.5M) + 0.5 U(0)`,
        explanation: 'Higher expected money does not mean higher expected utility.',
      },
      keyPoints: [
        'Normalised utilities: u⊤ = 1, u⊥ = 0; find p for indifference.',
        'EMV ≠ utility; money usually has diminishing utility.',
        'Concave = risk-averse; linear = neutral; convex = risk-seeking.',
        'Insurance premium = EMV − certainty equivalent.',
        'Humans show certainty effect, ambiguity aversion, framing.',
      ],
      importantTerms: [
        { term: 'EMV', meaning: 'Expected monetary value of a gamble.' },
        { term: 'Certainty equivalent', meaning: 'Sure amount the agent values equally to a lottery.' },
        { term: 'Risk-averse', meaning: 'Prefers a sure outcome to a gamble with the same EMV.' },
        { term: 'Micromort', meaning: 'A one-in-a-million chance of death.' },
      ],
      examPoints: [
        'Explain utility assessment with a standard lottery.',
        'Draw / describe risk-averse, risk-neutral, risk-seeking curves.',
        'Solve the **game-show** example.',
        'Mention Allais paradox and framing effect.',
      ],
      questions: [
        {
          prompt: 'Explain utility functions and the utility of money.',
          plan: ANSWER_PLAN(
            'Function mapping states to real-valued desirability',
            'Concave, linear and convex utility curves',
            'Normalised utilities, EMV, certainty equivalent, insurance premium',
            'Game show: ₹1M sure vs 50% of ₹2.5M',
            'Risk attitudes; human irrationality',
          ),
        },
      ],
      keywords: ['utility function', 'normalised utility', 'EMV', 'certainty equivalent', 'risk-averse', 'risk-seeking', 'insurance premium', 'Allais paradox'],
      remember: [
        { prompt: 'Shape of a risk-averse utility curve?', answer: 'Concave.' },
        { prompt: 'Insurance premium formula?', answer: 'EMV − certainty equivalent.' },
        { prompt: 'Normalised utility values of best and worst?', answer: 'u⊤ = 1, u⊥ = 0.' },
      ],
    },

    // ------------------------------------------------------------------
    'multiattribute-utility-functions': {
      difficulty: 'hard',
      intro: 'Real decisions trade off several things at once — cost, safety, noise. This topic shows how.',
      definition:
        'Multiattribute utility theory handles outcomes described by several **attributes** X₁, …, Xₙ. Decisions can sometimes be made by **dominance** (strict or stochastic) without a full utility function. Otherwise, **preference independence** allows an **additive value function** V = Σ Vᵢ(xᵢ), and **utility independence** allows a multiplicative utility function.',
      simpleExplanation: {
        text: 'Choosing an airport site means balancing cost, noise and safety. If one site is better on **every** attribute, choose it — no maths needed (dominance). Otherwise, if each attribute’s preference does not depend on the others, give each a score and add them up.',
        analogy: 'Buying a phone: if one phone is cheaper, faster and has a better camera than another, the choice is obvious. If not, you weigh price, speed and camera separately and combine.',
      },
      visual: {
        type: 'comparison',
        title: 'Dominance',
        items: [
          {
            title: 'Strict dominance',
            tone: 'muted',
            points: ['Better or equal on every attribute', 'Example — site S1 cheaper, quieter, safer than S2', 'S2 can be discarded'],
          },
          {
            title: 'Stochastic dominance',
            tone: 'accent',
            points: ['For uncertain attributes', 'Cumulative distribution of S1 is never worse than S2', 'S1 preferred for any monotonic utility'],
          },
        ],
      },
      explanation: [
        { heading: 'Preferences without uncertainty' },
        'Attributes X₁ and X₂ are **preferentially independent** of X₃ if preferences between outcomes ⟨x₁, x₂, x₃⟩ and ⟨x₁′, x₂′, x₃⟩ do not depend on x₃. If every subset is preferentially independent of its complement — **mutual preferential independence (MPI)** — then:',
        { code: 'V(x₁, …, xₙ) = Σᵢ Vᵢ(xᵢ)', lang: 'text' },
        { heading: 'Preferences with uncertainty' },
        'Here we need **utility independence**: preferences among **lotteries** on some attributes do not depend on the other attributes. With **mutual utility independence (MUI)** the utility is **multiplicative**: for three attributes, U = k₁U₁ + k₂U₂ + k₃U₃ + k₁k₂U₁U₂ + k₂k₃U₂U₃ + k₃k₁U₃U₁ + k₁k₂k₃U₁U₂U₃.',
        { tip: 'Additive models reduce assessment from a huge table to one small function per attribute.' },
      ],
      example: {
        title: 'Airport site choice',
        input: 'Attributes: Deaths, Noise, Cost. Site S1: (2, 4, 3.0 billion). Site S2: (3, 6, 3.5 billion). Lower is better.',
        output: `Deaths: S1 better   Noise: S1 better   Cost: S1 better
⇒ S1 strictly dominates S2 → discard S2 without any utility function`,
        explanation: 'Dominance prunes options cheaply; utility functions are needed only for the remaining trade-offs.',
      },
      keyPoints: [
        'Outcomes have several attributes.',
        'Strict and stochastic dominance can decide without full utilities.',
        'MPI ⇒ additive value function V = Σ Vᵢ(xᵢ).',
        'Utility independence ⇒ multiplicative utility function.',
        'Independence greatly simplifies preference elicitation.',
      ],
      importantTerms: [
        { term: 'Attribute', meaning: 'One measurable aspect of an outcome, e.g. cost.' },
        { term: 'Strict dominance', meaning: 'One option is at least as good on all attributes and better on one.' },
        { term: 'Stochastic dominance', meaning: 'One option’s distribution is never worse at any threshold.' },
        { term: 'MPI', meaning: 'Mutual preferential independence — enables additive value functions.' },
      ],
      examPoints: [
        'Define multiattribute utility and attributes.',
        'Explain **strict and stochastic dominance** with an example.',
        'State **MPI ⇒ additive value function**.',
        'Mention utility independence and multiplicative form.',
      ],
      questions: [
        {
          prompt: 'Explain multiattribute utility functions with dominance and preference independence.',
          plan: ANSWER_PLAN(
            'Utility over outcomes with several attributes',
            'Attribute table for two airport sites',
            'Strict and stochastic dominance; MPI; additive V; utility independence',
            'Airport S1 strictly dominates S2',
            'Independence simplifies assessment',
          ),
        },
      ],
      keywords: ['multiattribute utility', 'attributes', 'strict dominance', 'stochastic dominance', 'preferential independence', 'MPI', 'additive value function', 'utility independence'],
      remember: [
        { prompt: 'MPI allows what form of value function?', answer: 'Additive: V = Σ Vᵢ(xᵢ).' },
        { prompt: 'Strict dominance means?', answer: 'Better or equal on every attribute (and better on at least one).' },
        { prompt: 'Independence needed under uncertainty?', answer: 'Utility independence.' },
      ],
    },

    // ------------------------------------------------------------------
    'decision-networks': {
      difficulty: 'medium',
      intro: 'A Bayesian network plus decisions and utilities — a complete picture of a decision problem.',
      definition:
        'A **decision network** (influence diagram) extends a Bayesian network with **decision nodes** (rectangles) and **utility nodes** (diamonds) in addition to **chance nodes** (ovals). It is evaluated by setting each possible decision, computing the posterior of the utility node’s parents, and choosing the decision with the **highest expected utility**.',
      simpleExplanation: {
        text: 'Draw the uncertain things as ovals, the choices as rectangles, and the score as a diamond. Arrows show what affects what. Try each choice, compute the expected score, and pick the best.',
        analogy: 'A flowchart for a business decision: the options you control, the market factors you do not, and the profit at the end.',
      },
      visual: {
        type: 'architecture',
        title: 'Airport-siting decision network',
        layers: [
          { label: 'Decision node', note: 'rectangle', items: ['AirportSite'] },
          { label: 'Chance nodes', note: 'ovals', items: ['AirTraffic', 'Litigation', 'Construction', 'Deaths', 'Noise', 'Cost'] },
          { label: 'Utility node', note: 'diamond', items: ['U(Deaths, Noise, Cost)'] },
        ],
      },
      explanation: [
        { heading: 'Node types' },
        {
          list: [
            '**Chance nodes (ovals)** — random variables with CPTs, as in Bayesian networks.',
            '**Decision nodes (rectangles)** — points where the agent chooses an action.',
            '**Utility nodes (diamonds)** — the utility function of their parents.',
          ],
        },
        'An **action-utility** (Q) form drops outcome nodes and connects decisions and chance nodes directly to utility — simpler but less flexible.',
        { heading: 'Evaluating a decision network' },
        {
          list: [
            'Set the evidence variables for the current state.',
            'For each possible value of the decision node: set the decision node to that value.',
            'Compute the posterior probabilities of the parents of the utility node (Bayesian network inference).',
            'Compute the expected utility for that decision.',
            'Return the decision with the highest expected utility.',
          ],
          ordered: true,
        },
      ],
      example: {
        title: 'Should I take an umbrella? (as a network)',
        input: 'Chance: Weather → Forecast. Decision: Umbrella. Utility: U(Weather, Umbrella). Evidence: Forecast = rainy.',
        output: `Set Forecast = rainy → P(Weather = rain | rainy) via inference
Umbrella = take  → EU = Σ_w P(w | rainy) U(w, take)
Umbrella = leave → EU = Σ_w P(w | rainy) U(w, leave)
Return the larger`,
        explanation: 'The same Bayesian inference from Unit IV supplies the probabilities; the utility node turns them into a decision.',
      },
      keyPoints: [
        'Decision network = chance + decision + utility nodes.',
        'Ovals = chance, rectangles = decisions, diamonds = utility.',
        'Evaluate by trying every decision and computing EU.',
        'Uses Bayesian network inference internally.',
      ],
      importantTerms: [
        { term: 'Influence diagram', meaning: 'Another name for a decision network.' },
        { term: 'Decision node', meaning: 'A node representing the agent’s choice.' },
        { term: 'Utility node', meaning: 'A node holding the utility function of its parents.' },
        { term: 'Action-utility table', meaning: 'Utility given directly as a function of actions and states (Q-values).' },
      ],
      examPoints: [
        'Draw the **airport-siting** decision network with correct shapes.',
        'Name the three node types.',
        'Write the **evaluation algorithm** steps.',
      ],
      questions: [
        {
          prompt: 'What is a decision network? Explain how it is evaluated.',
          plan: ANSWER_PLAN(
            'Bayesian network plus decision and utility nodes',
            'Airport-siting influence diagram',
            'Chance, decision, utility nodes; evaluation algorithm',
            'Umbrella decision with forecast evidence',
            'Choose decision with highest EU',
          ),
        },
      ],
      keywords: ['decision network', 'influence diagram', 'chance node', 'decision node', 'utility node', 'action-utility', 'evaluation'],
      remember: [
        { prompt: 'Shape of a decision node?', answer: 'Rectangle.' },
        { prompt: 'Shape of a utility node?', answer: 'Diamond.' },
        { prompt: 'How is a decision network evaluated?', answer: 'Try each decision, compute expected utility, pick the max.' },
      ],
    },

    // ------------------------------------------------------------------
    'the-value-of-information': {
      difficulty: 'hard',
      intro: 'Should the doctor order another test? Value of information tells you when knowing more is worth paying for.',
      definition:
        'The **value of perfect information (VPI)** of a variable Eⱼ is the expected improvement in utility from learning its value before deciding: **VPI_e(Eⱼ) = (Σ_k P(Eⱼ = eⱼₖ | e) EU(α_eⱼₖ | e, Eⱼ = eⱼₖ)) − EU(α | e)**. Information is worth acquiring when its value exceeds its cost.',
      simpleExplanation: {
        text: 'Information is valuable only if it **might change your decision**. If every possible answer leads to the same action, the information is worth nothing. VPI is the expected best utility after hearing the answer minus the best utility now.',
        analogy: 'Checking the weather app is worth it before a picnic, because rain would change your plan — but not before staying indoors all day.',
      },
      visual: {
        type: 'process',
        title: 'Computing VPI',
        steps: [
          { label: 'Best action now', detail: 'EU(α | e)' },
          { label: 'For each possible answer eⱼₖ', detail: 'best action and its EU given that answer' },
          { label: 'Average over answers', detail: 'weight by P(Eⱼ = eⱼₖ | e)' },
          { label: 'Subtract', detail: 'VPI = average − EU(α | e)' },
          { label: 'Compare with cost', detail: 'acquire if VPI > cost' },
        ],
      },
      explanation: [
        { heading: 'Properties of VPI' },
        {
          list: [
            '**Non-negative** — VPI ≥ 0. In expectation, information never hurts.',
            '**Non-additive** — VPI(Eⱼ, Eₖ) ≠ VPI(Eⱼ) + VPI(Eₖ) in general.',
            '**Order-independent** — VPI(Eⱼ, Eₖ) is the same whichever is observed first.',
          ],
        },
        { heading: 'When is information valuable?' },
        {
          list: [
            'When it is likely to **change the decision**.',
            'When the options are **close** in EU and the answer could separate them.',
            'Not when one option is clearly best regardless of the answer.',
          ],
        },
        { heading: 'Information-gathering agent' },
        'A **myopic** agent computes VPI for each possible observation, picks the one with the largest VPI minus cost, and requests it if positive; otherwise it acts. Myopic = considers only one observation at a time.',
      ],
      example: {
        title: 'Oil drilling rights',
        input: 'n blocks, exactly one has oil worth C. Each block costs C/n. A seismologist can survey block 3.',
        output: `Survey says oil (prob 1/n)       : buy block 3 → gain C − C/n
Survey says no oil (prob (n−1)/n) : buy another → gain C/(n−1) − C/n
Expected gain = (1/n)(C − C/n) + ((n−1)/n)(C/(n(n−1)))
              = C/n
VPI of the survey = C/n − 0 = C/n`,
        explanation: 'Without the survey the expected profit is 0, so the company should pay up to C/n — the price of a block — for the information.',
      },
      keyPoints: [
        'VPI = expected EU after information − EU now.',
        'Information has value only if it can change the decision.',
        'VPI is non-negative, non-additive, order-independent.',
        'Gather information when VPI > cost.',
        'Myopic agents evaluate one observation at a time.',
      ],
      importantTerms: [
        { term: 'VPI', meaning: 'Value of perfect information about a variable.' },
        { term: 'Myopic agent', meaning: 'Considers only the next single observation.' },
        { term: 'Information gathering', meaning: 'Choosing observations whose value exceeds their cost.' },
      ],
      examPoints: [
        'Write the **VPI formula** and explain each term.',
        'Solve the **oil-drilling** example (VPI = C/n).',
        'List the three properties of VPI.',
        'Describe the myopic information-gathering agent.',
      ],
      questions: [
        {
          prompt: 'Explain the value of information with an example.',
          plan: ANSWER_PLAN(
            'Expected gain in utility from learning a variable before deciding',
            'Steps: EU now → EU per answer → average → difference',
            'VPI formula; properties; when information helps; myopic agent',
            'Oil drilling: VPI = C/n',
            'Acquire when VPI > cost',
          ),
        },
      ],
      keywords: ['value of information', 'VPI', 'non-negative', 'non-additive', 'order-independent', 'myopic', 'information gathering'],
      remember: [
        { prompt: 'Can VPI be negative?', answer: 'No — expected VPI is always ≥ 0.' },
        { prompt: 'VPI of the seismic survey?', answer: 'C/n' },
        { prompt: 'When is information worthless?', answer: 'When no possible answer would change the decision.' },
      ],
    },

    // ------------------------------------------------------------------
    'unknown-preferences': {
      difficulty: 'medium',
      intro: 'What if the agent — or the human it serves — is unsure what is wanted? This matters for safe AI.',
      definition:
        'Decision making with **unknown preferences** treats utility itself as uncertain. An agent unsure of its **own** preferences maximises **expected utility over possible utility functions**. A machine unsure of **human** preferences should **defer** to humans — for example, allowing itself to be switched off (the **off-switch problem**).',
      simpleExplanation: {
        text: 'Sometimes you do not know if you will like something — like a new dish. You can still decide by considering how likely you are to like it. For AI, uncertainty about what humans want is actually helpful: it makes the robot ask, check and accept correction instead of charging ahead.',
        analogy: 'A new assistant unsure how you like your coffee asks first, rather than confidently making it wrong every day.',
      },
      visual: {
        type: 'flow',
        title: 'The off-switch game',
        steps: [
          { label: 'Robot proposes action', note: 'unsure of its true value' },
          { label: 'Human can switch off', note: 'if action is bad' },
          { label: 'Robot defers', note: 'lets the human decide' },
          { label: 'Outcome', note: 'never worse than acting alone' },
        ],
      },
      explanation: [
        { heading: 'Uncertainty about one’s own preferences' },
        'If you do not know whether you would like durian-flavoured ice cream, you can treat “liking it” as a random variable. Expected utility over that variable still gives a rational choice — and **trying** it gains information (value of information again).',
        { heading: 'Deference to humans' },
        {
          list: [
            'If a robot is **certain** of its objective, it has an incentive to prevent being switched off — being off means it cannot achieve its objective.',
            'If it is **uncertain** whether humans approve, letting the human decide is never worse in expectation: a human switch-off signals that the action was bad.',
            'So uncertainty about human preferences gives a machine a positive incentive to **allow correction**.',
          ],
        },
        { note: 'This links to the value alignment problem from Unit I: machines should be designed to be uncertain about, and learn, human preferences.' },
      ],
      example: {
        title: 'Robot booking a hotel',
        input: 'Robot thinks a ₹20,000 hotel has utility U, but is unsure: U could be +5 or −10 with equal probability.',
        output: `Act directly : EU = 0.5 × 5 + 0.5 × (−10) = −2.5
Wait (do nothing) : EU = 0
Ask human first   : human says yes if U = +5, no if U = −10
                    EU = 0.5 × 5 + 0.5 × 0 = +2.5  ← best`,
        explanation: 'Deferring to the human gives the highest expected utility because the human holds the missing information.',
      },
      keyPoints: [
        'Preferences themselves can be uncertain.',
        'Use expected utility over possible utility functions.',
        'Robots certain of their goals resist being switched off.',
        'Uncertainty about human preferences encourages deference.',
        'Deferring is never worse in expectation.',
      ],
      importantTerms: [
        { term: 'Unknown preferences', meaning: 'Uncertainty about the utility function itself.' },
        { term: 'Off-switch problem', meaning: 'Whether an AI will allow humans to switch it off.' },
        { term: 'Deference', meaning: 'Letting humans make or veto decisions.' },
      ],
      examPoints: [
        'Explain uncertainty about **own** and **human** preferences.',
        'Describe the **off-switch** game and why uncertainty helps.',
        'Connect to value alignment.',
      ],
      questions: [
        {
          prompt: 'Discuss decision making with unknown preferences.',
          plan: ANSWER_PLAN(
            'Treating the utility function as uncertain',
            'Off-switch game flow',
            'Own preferences; deference to humans; incentive to allow correction',
            'Hotel booking: asking gives EU = +2.5',
            'Uncertainty about goals makes AI safer',
          ),
        },
      ],
      keywords: ['unknown preferences', 'uncertain utility', 'deference', 'off-switch problem', 'value alignment', 'human preferences'],
      remember: [
        { prompt: 'Why might a certain robot resist the off-switch?', answer: 'Being off stops it achieving its objective.' },
        { prompt: 'What makes a robot allow itself to be switched off?', answer: 'Uncertainty about what the human wants.' },
        { prompt: 'Asking the human first — better or worse in expectation?', answer: 'Never worse; often better.' },
      ],
    },

    // ------------------------------------------------------------------
    'sequential-decision-problems': {
      difficulty: 'hard',
      intro: 'Decisions now affect options later. The Markov decision process is the standard model for this.',
      definition:
        'A **sequential decision problem** for a fully observable, stochastic environment with a Markovian transition model and additive rewards is a **Markov decision process (MDP)**: a set of states, actions ACTIONS(s), a **transition model P(s′ | s, a)** and a **reward function R(s, a, s′)**. A solution is a **policy π(s)**; the optimal policy π* maximises expected (discounted) total reward.',
      simpleExplanation: {
        text: 'The agent moves step by step. Each action may not go where intended; each step earns a small reward or cost. Instead of a fixed plan, the agent needs a **policy** — a rule saying what to do in **every** state — because it cannot be sure where it will end up.',
        analogy: 'A delivery rider with a slippery bike: rather than a fixed route, they need a rule for each junction, because they might skid into a different street.',
      },
      visual: {
        type: 'boxes',
        title: 'The 4 × 3 world',
        items: [
          { label: 'Start', value: '(1,1)', tag: 'agent begins here' },
          { label: '+1 terminal', value: '(4,3)', tag: 'goal' },
          { label: '−1 terminal', value: '(4,2)', tag: 'avoid' },
          { label: 'Wall', value: '(2,2)', tag: 'blocked' },
          { label: 'Each step', value: 'reward −0.04', tag: 'small cost' },
          { label: 'Moves', value: '0.8 / 0.1 / 0.1', tag: 'intended / slip left / slip right' },
        ],
      },
      explanation: [
        { heading: 'MDP components' },
        {
          list: [
            '**States** s ∈ S, with initial state s₀.',
            '**Actions** ACTIONS(s).',
            '**Transition model** P(s′ | s, a) — **Markovian**: depends only on the current state.',
            '**Reward function** R(s, a, s′).',
          ],
        },
        { heading: 'Utilities over time' },
        {
          list: [
            '**Finite horizon** — fixed deadline; optimal policy may be non-stationary.',
            '**Infinite horizon** — no deadline; optimal policy is **stationary**.',
            '**Discounted rewards**: U = R₀ + γR₁ + γ²R₂ + … with discount factor 0 < γ ≤ 1.',
          ],
        },
        { heading: 'Bellman equation' },
        'The utility of a state is the expected reward of the next step plus the discounted utility of the next state, assuming optimal action:',
        { code: "U(s) = max_a Σ_s′ P(s′ | s, a) [ R(s, a, s′) + γ U(s′) ]", lang: 'text' },
        "The optimal policy is π*(s) = argmax_a Σ_s′ P(s′ | s, a) [R(s, a, s′) + γ U(s′)].",
        { tip: 'The reward per step shapes the policy: a very negative step reward makes the agent rush (even risking −1); a small cost makes it take the long, safe route.' },
      ],
      example: {
        title: 'One action in the 4 × 3 world',
        input: 'Agent at (3,3) chooses Right.',
        output: `0.8 → moves Right to (4,3)  (+1 terminal)
0.1 → slips Up: hits wall, stays at (3,3)
0.1 → slips Down to (3,2)
The policy must say what to do at (3,3) AND at (3,2), in case it slips.`,
        explanation: 'Because outcomes are uncertain, a fixed action sequence is not enough — the agent needs a policy for every state.',
      },
      keyPoints: [
        'MDP = states, actions, transition model, rewards.',
        'Markov property: next state depends only on current state and action.',
        'Solution is a policy π(s), not a fixed plan.',
        'Discounted utility with γ; infinite horizon gives stationary policies.',
        'Bellman equation links utilities of neighbouring states.',
      ],
      importantTerms: [
        { term: 'MDP', meaning: 'Markov decision process — model of sequential decisions under uncertainty.' },
        { term: 'Policy', meaning: 'A mapping from states to actions.' },
        { term: 'Discount factor γ', meaning: 'How much future rewards are worth compared with immediate ones.' },
        { term: 'Bellman equation', meaning: 'U(s) = max_a Σ P(s′ | s, a)[R + γU(s′)].' },
      ],
      examPoints: [
        'Define an **MDP** with its four components.',
        'Draw the **4 × 3 world** with 0.8/0.1/0.1 moves and −0.04 step reward.',
        'Define policy, optimal policy and discounted reward.',
        'Write the **Bellman equation**.',
      ],
      questions: [
        {
          prompt: 'Explain sequential decision problems and Markov decision processes.',
          plan: ANSWER_PLAN(
            'Decisions over time in a stochastic, observable world — an MDP',
            '4 × 3 grid world',
            'States, actions, P(s′ | s, a), R; policies; horizons; discounting; Bellman equation',
            'Moving Right from (3,3) with slips',
            'Policy for every state; stationary for infinite horizon',
          ),
        },
      ],
      keywords: ['sequential decision', 'MDP', 'Markov property', 'transition model', 'reward', 'policy', 'discount factor', 'Bellman equation'],
      remember: [
        { prompt: 'Four components of an MDP?', answer: 'States, actions, transition model, reward function.' },
        { prompt: 'Solution of an MDP?', answer: 'A policy π(s).' },
        { prompt: 'Move probabilities in the 4 × 3 world?', answer: '0.8 intended, 0.1 each at right angles.' },
      ],
    },

    // ------------------------------------------------------------------
    'algorithms-for-mdps': {
      difficulty: 'hard',
      intro: 'Value iteration and policy iteration — know both procedures and the difference between them.',
      definition:
        'Algorithms for MDPs compute optimal policies. **Value iteration** repeatedly applies the **Bellman update** to all states until utilities converge. **Policy iteration** alternates **policy evaluation** (compute utilities of the current policy) and **policy improvement** (choose the best action using those utilities) until the policy stops changing. Other methods: **linear programming** and **online Monte Carlo planning**.',
      simpleExplanation: {
        text: '**Value iteration**: start with all utilities at 0 and keep updating each state from its neighbours until the numbers stop changing. **Policy iteration**: guess a policy, work out how good it is, improve it, repeat until it stops improving — usually in very few rounds.',
        analogy: 'Value iteration is like ripples spreading out from the goal across a pond. Policy iteration is like a student taking a test, checking results, and fixing their strategy.',
      },
      visual: {
        type: 'comparison',
        title: 'Value iteration vs policy iteration',
        items: [
          {
            title: 'Value iteration',
            tone: 'muted',
            points: ['Updates utilities with Bellman update', 'Policy extracted at the end', 'Many cheap iterations', 'Converges to optimal utilities'],
          },
          {
            title: 'Policy iteration',
            tone: 'accent',
            points: ['Evaluate policy, then improve it', 'Policy evaluation is a linear system', 'Few expensive iterations', 'Stops when policy is unchanged'],
          },
        ],
      },
      explanation: [
        { heading: 'Value iteration' },
        { code: "U_{i+1}(s) ← max_a Σ_s′ P(s′ | s, a) [ R(s, a, s′) + γ U_i(s′) ]", lang: 'text' },
        'Repeat for all states until the maximum change δ is small enough: δ < ε(1 − γ)/γ. The Bellman update is a **contraction**, so value iteration always **converges** to the unique solution of the Bellman equations.',
        { heading: 'Policy iteration' },
        {
          list: [
            'Start with any policy π₀.',
            '**Policy evaluation:** compute Uᵢ = U^πᵢ by solving U(s) = Σ P(s′ | s, πᵢ(s)) [R + γU(s′)] — a set of **linear** equations (no max).',
            '**Policy improvement:** πᵢ₊₁(s) = argmax_a Σ P(s′ | s, a) [R + γUᵢ(s′)].',
            'Stop when the policy does not change.',
          ],
          ordered: true,
        },
        '**Modified policy iteration** runs only a few simplified Bellman updates for evaluation — often the fastest in practice.',
        { heading: 'Other approaches' },
        '**Linear programming** solves the MDP exactly; **online algorithms** such as expectimax lookahead and **Monte Carlo tree search** plan from the current state only — useful for very large MDPs.',
      ],
      example: {
        title: 'First Bellman update at (3,3)',
        input: 'γ = 1, U₀ = 0 for non-terminals, +1 at (4,3), step reward −0.04. Action Right.',
        output: `0.8 × (+1)              = 0.800   (enter +1 terminal)
0.1 × (−0.04 + U₀(3,3)) = −0.004  (slip Up into wall)
0.1 × (−0.04 + U₀(3,2)) = −0.004  (slip Down)
U₁(3,3) = 0.792  (Right is the best action)`,
        explanation: 'After many iterations the utilities settle (about 0.918 at (3,3)) and the best action in each state forms the optimal policy.',
      },
      keyPoints: [
        'Value iteration: repeated Bellman updates until convergence.',
        'Bellman update is a contraction ⇒ guaranteed convergence.',
        'Policy iteration: evaluate (linear equations) + improve (argmax).',
        'Policy iteration stops when the policy is unchanged.',
        'Modified policy iteration, LP and MCTS are alternatives.',
      ],
      importantTerms: [
        { term: 'Bellman update', meaning: 'One step of updating U(s) from neighbours using the Bellman equation.' },
        { term: 'Policy evaluation', meaning: 'Computing the utilities of following a fixed policy.' },
        { term: 'Policy improvement', meaning: 'Choosing better actions using current utilities.' },
        { term: 'Contraction', meaning: 'An update that brings any two estimates closer — ensures convergence.' },
      ],
      examPoints: [
        'Write the **Bellman update** and value iteration steps.',
        'Write the **policy iteration** steps.',
        'Compare the two in a table.',
        'Show one numeric Bellman update.',
      ],
      questions: [
        {
          prompt: 'Explain value iteration and policy iteration algorithms for MDPs.',
          plan: ANSWER_PLAN(
            'Algorithms that compute optimal policies for MDPs',
            'Comparison of value vs policy iteration',
            'Bellman update; convergence; policy evaluation and improvement',
            'U₁(3,3) = 0.792 in the 4 × 3 world',
            'Contraction; modified policy iteration; MCTS',
          ),
        },
      ],
      keywords: ['value iteration', 'Bellman update', 'convergence', 'contraction', 'policy iteration', 'policy evaluation', 'policy improvement', 'modified policy iteration'],
      remember: [
        { prompt: 'Two steps of policy iteration?', answer: 'Policy evaluation and policy improvement.' },
        { prompt: 'Why does value iteration converge?', answer: 'The Bellman update is a contraction.' },
        { prompt: 'Is policy evaluation linear?', answer: 'Yes — the policy fixes the action, so there is no max.' },
      ],
    },

    // ------------------------------------------------------------------
    'bandit-problems': {
      difficulty: 'medium',
      intro: 'Try something new or stick with what works? Bandits are the cleanest model of that dilemma.',
      definition:
        'A **multi-armed bandit** problem has n arms (actions), each giving rewards from an unknown distribution. At each step the agent pulls one arm. The challenge is the **exploration–exploitation trade-off**. Optimal solutions use the **Gittins index**; practical methods include **UCB (upper confidence bound)** and **Thompson sampling**, judged by **regret**.',
      simpleExplanation: {
        text: 'Imagine several slot machines with different hidden payouts. Keep playing the best one you have found (**exploit**), or try others to discover a better one (**explore**)? Too little exploring misses the best machine; too much wastes money.',
        analogy: 'Choosing a restaurant: go back to your favourite, or try the new place that might be even better?',
      },
      visual: {
        type: 'comparison',
        title: 'Exploration vs exploitation',
        items: [
          { title: 'Exploration', tone: 'muted', points: ['Try uncertain arms', 'Gains information', 'Costs reward now'] },
          { title: 'Exploitation', tone: 'accent', points: ['Pull the best-known arm', 'Gains reward now', 'May miss a better arm'] },
        ],
      },
      explanation: [
        { heading: 'Formal view' },
        'Each arm Mᵢ gives a sequence of rewards; the agent maximises **expected discounted total reward**. Bandits are MDPs whose state is the agent’s knowledge about each arm.',
        { heading: 'Gittins index' },
        'For discounted bandits, each arm can be given an index computed independently of the others; the optimal policy pulls the arm with the **highest Gittins index**. It captures both expected reward and the value of information from trying the arm.',
        { heading: 'Practical strategies' },
        {
          list: [
            '**ε-greedy** — exploit most of the time; explore a random arm with probability ε.',
            '**UCB** — pull the arm with the highest optimistic estimate: average reward + bonus that shrinks as the arm is tried more, e.g. μ̂ᵢ + √(2 ln N / Nᵢ).',
            '**Thompson sampling** — sample a value for each arm from its posterior distribution and pull the arm with the highest sample.',
          ],
        },
        '**Regret** = total reward lost compared with always pulling the best arm. Good algorithms have regret growing only **logarithmically** with time.',
        { heading: 'Applications' },
        'Clinical trials (which treatment to give next patient), online advertising and A/B testing, recommender systems, and choosing research projects.',
      ],
      example: {
        title: 'UCB picks an arm',
        input: 'After N = 100 pulls: Arm A avg 0.6 from 80 pulls; Arm B avg 0.5 from 20 pulls.',
        output: `UCB(A) = 0.6 + √(2 ln 100 / 80) ≈ 0.6 + 0.34 = 0.94
UCB(B) = 0.5 + √(2 ln 100 / 20) ≈ 0.5 + 0.68 = 1.18
Pull arm B — it is less explored, so it might be better`,
        explanation: 'UCB is “optimism under uncertainty”: arms tried less often get a larger bonus, ensuring enough exploration.',
      },
      keyPoints: [
        'n-armed bandit: unknown reward per arm.',
        'Core issue: exploration vs exploitation.',
        'Gittins index gives the optimal policy for discounted bandits.',
        'UCB and Thompson sampling are practical methods.',
        'Regret should grow only logarithmically.',
      ],
      importantTerms: [
        { term: 'Bandit', meaning: 'A problem of repeatedly choosing among actions with unknown rewards.' },
        { term: 'Gittins index', meaning: 'Per-arm value whose maximum gives the optimal choice.' },
        { term: 'UCB', meaning: 'Upper confidence bound — average plus exploration bonus.' },
        { term: 'Regret', meaning: 'Reward lost compared with always choosing the best arm.' },
      ],
      examPoints: [
        'Define the **multi-armed bandit** problem.',
        'Explain **exploration vs exploitation**.',
        'Explain Gittins index, UCB and Thompson sampling.',
        'Give applications: clinical trials, ads.',
      ],
      questions: [
        {
          prompt: 'Explain bandit problems and the exploration–exploitation trade-off.',
          plan: ANSWER_PLAN(
            'Repeatedly choosing among arms with unknown reward distributions',
            'Explore vs exploit comparison',
            'Gittins index, ε-greedy, UCB, Thompson sampling, regret',
            'UCB choosing the less-explored arm',
            'Applications in trials and advertising',
          ),
        },
      ],
      keywords: ['multi-armed bandit', 'exploration', 'exploitation', 'Gittins index', 'UCB', 'Thompson sampling', 'regret', 'ε-greedy'],
      remember: [
        { prompt: 'What gives the optimal policy for discounted bandits?', answer: 'The Gittins index.' },
        { prompt: 'Idea behind UCB?', answer: 'Optimism under uncertainty — add a bonus for less-tried arms.' },
        { prompt: 'What is regret?', answer: 'Reward lost compared with always pulling the best arm.' },
      ],
    },

    // ------------------------------------------------------------------
    'partially-observable-mdps': {
      difficulty: 'hard',
      intro: 'When the agent cannot see its exact state, it must plan over what it believes — a POMDP.',
      definition:
        'A **partially observable MDP (POMDP)** is an MDP plus a **sensor model P(e | s)**. The agent cannot observe the state directly, so it maintains a **belief state b** — a probability distribution over states — updated after each action a and percept e by **b′(s′) = α P(e | s′) Σ_s P(s′ | s, a) b(s)**. The optimal action depends only on the current belief state.',
      simpleExplanation: {
        text: 'The agent is partly blind. It keeps a list of “where I might be, and how likely”. After moving, it shifts those probabilities using the transition model; after sensing, it sharpens them using the sensor model. Then it chooses actions based on this belief.',
        analogy: 'Walking in a dark house: you guess where you are, take a step, touch a wall, and update your guess.',
      },
      visual: {
        type: 'flow',
        title: 'Belief-state update cycle',
        steps: [
          { label: 'Belief b', note: 'distribution over states' },
          { label: 'Do action a', note: 'predict with P(s′ | s, a)' },
          { label: 'Get percept e', note: 'weight by P(e | s′)' },
          { label: 'Normalise', note: 'new belief b′' },
          { label: 'Choose action', note: 'policy π(b)' },
        ],
      },
      explanation: [
        { heading: 'Components' },
        {
          list: [
            'Everything in an MDP: states, actions, P(s′ | s, a), R(s, a, s′).',
            '**Sensor model** P(e | s) — probability of percept e in state s.',
            '**Belief state** b(s) — probability the agent is in s.',
          ],
        },
        { heading: 'Key insight' },
        'A POMDP is equivalent to an MDP whose states are **belief states**. The belief-state MDP is fully observable (the agent always knows its own belief), but its state space is **continuous** — so it is much harder to solve.',
        { heading: 'Value of information-gathering actions' },
        'In POMDPs, actions that only **gather information** (like looking around) can be optimal, because better beliefs lead to better later decisions.',
        { trap: 'The optimal POMDP policy maps **belief states** to actions, not physical states to actions.' },
      ],
      example: {
        title: 'Noisy 4 × 3 world',
        input: 'Sensor counts adjacent walls; correct with probability 0.9. Agent starts with equal belief over 9 non-terminal squares.',
        output: `Initial belief: 1/9 in each non-terminal square
Act: Left → shift probabilities by the 0.8/0.1/0.1 model
Sense: "1 wall" → multiply by P(1 wall | s), then normalise
Belief concentrates on squares with exactly one adjacent wall`,
        explanation: 'Each action-and-percept cycle sharpens the belief; the policy chooses actions from that belief.',
      },
      keyPoints: [
        'POMDP = MDP + sensor model P(e | s).',
        'Belief state b = distribution over physical states.',
        'Belief update: b′(s′) = α P(e | s′) Σ P(s′ | s, a) b(s).',
        'Optimal action depends only on the belief state.',
        'POMDP = MDP over continuous belief states.',
      ],
      importantTerms: [
        { term: 'POMDP', meaning: 'Partially observable Markov decision process.' },
        { term: 'Sensor model', meaning: 'P(e | s): probability of observing e in state s.' },
        { term: 'Belief state', meaning: 'Probability distribution over possible states.' },
        { term: 'Filtering', meaning: 'Updating the belief state with each action and percept.' },
      ],
      examPoints: [
        'Define a **POMDP** and its extra component.',
        'Write the **belief-update formula**.',
        'Explain why a POMDP is an MDP over belief states.',
        'Use the noisy 4 × 3 world example.',
      ],
      questions: [
        {
          prompt: 'What is a POMDP? Explain belief states and belief update.',
          plan: ANSWER_PLAN(
            'MDP with partial observability and a sensor model',
            'Belief-update cycle',
            'Sensor model; belief state; update formula; belief-state MDP',
            'Noisy wall-counting sensor in the 4 × 3 world',
            'Policy maps beliefs to actions; information-gathering actions',
          ),
        },
      ],
      keywords: ['POMDP', 'partial observability', 'sensor model', 'belief state', 'belief update', 'filtering', 'belief-state MDP'],
      remember: [
        { prompt: 'Extra component of a POMDP over an MDP?', answer: 'The sensor model P(e | s).' },
        { prompt: 'What does a POMDP policy map?', answer: 'Belief states to actions.' },
        { prompt: 'Why are POMDPs hard?', answer: 'The belief-state space is continuous.' },
      ],
    },

    // ------------------------------------------------------------------
    'algorithms-for-solving-pomdps': {
      difficulty: 'hard',
      intro: 'Two routes: exact value iteration over conditional plans, or online lookahead from the current belief.',
      definition:
        'POMDPs are solved by **value iteration over conditional plans** — the utility of a belief state is the maximum over plans p of **b · αₚ**, a piecewise-linear convex function — or by **online algorithms** that look ahead from the current belief state using a **dynamic decision network (DDN)**, expectimax search or sampling methods such as **POMCP**.',
      simpleExplanation: {
        text: 'Each possible conditional plan (“do this; if you see X, then do that…”) has a value that is a straight line (or flat surface) over beliefs. The best value at any belief is the top of all those lines. Exact methods build these plans step by step and throw away dominated ones. Online methods skip that and just search ahead from where you are now.',
        analogy: 'Exact solving is writing a full guidebook for every possible situation; online solving is thinking a few moves ahead whenever you need to decide.',
      },
      visual: {
        type: 'comparison',
        title: 'Offline vs online POMDP solving',
        items: [
          {
            title: 'Offline — value iteration',
            tone: 'muted',
            points: ['Conditional plans with α-vectors', 'U(b) = max over plans of b · α', 'Piecewise-linear and convex', 'Prune dominated plans', 'Exact but very expensive'],
          },
          {
            title: 'Online — lookahead',
            tone: 'accent',
            points: ['Start from the current belief', 'Dynamic decision network', 'Expectimax or sampling search', 'POMCP uses Monte Carlo', 'Scales to large problems'],
          },
        ],
      },
      explanation: [
        { heading: 'Value iteration for POMDPs' },
        {
          list: [
            'A **conditional plan** p of depth d: first action, then a sub-plan for each possible percept.',
            'Its expected utility from physical state s is αₚ(s); from belief b it is **Σ_s b(s) αₚ(s) = b · αₚ** — linear in b.',
            'Optimal utility **U(b) = maxₚ b · αₚ** — piecewise-linear and convex.',
            'Build depth-(d + 1) plans from depth-d plans; **eliminate dominated plans** that are never best for any belief.',
          ],
          ordered: true,
        },
        'The number of plans grows doubly exponentially in the worst case, so exact solving works only for small POMDPs.',
        { heading: 'Online algorithms' },
        {
          list: [
            '**Dynamic decision network (DDN)** — represents transition and sensor models as a network over time slices with decision and utility nodes.',
            '**Filtering** keeps the current belief state up to date.',
            '**Expectimax lookahead** — alternate decision (max) and chance (percept) nodes to a fixed depth.',
            '**POMCP** — Monte Carlo tree search with sampled states and percepts; handles very large POMDPs.',
          ],
        },
      ],
      example: {
        title: 'Two-state POMDP, two one-step plans',
        input: 'States A, B. Plan p₁ (Stay): α = ⟨1.0, 0.0⟩. Plan p₂ (Go): α = ⟨0.2, 0.8⟩. Belief b = ⟨b(A), b(B)⟩.',
        output: `b = ⟨0.9, 0.1⟩ : p₁ → 0.90,  p₂ → 0.26  → choose Stay
b = ⟨0.5, 0.5⟩ : p₁ → 0.50,  p₂ → 0.50  → indifferent
b = ⟨0.2, 0.8⟩ : p₁ → 0.20,  p₂ → 0.68  → choose Go
U(b) = max of the two lines — piecewise linear and convex`,
        explanation: 'Each plan is a line over beliefs; the optimal policy switches plans where the lines cross.',
      },
      keyPoints: [
        'Conditional plans have α-vectors; value at b is b · α.',
        'U(b) = max over plans — piecewise-linear convex.',
        'Prune dominated plans during value iteration.',
        'Exact methods are very expensive.',
        'Online: DDN + filtering + lookahead (expectimax, POMCP).',
      ],
      importantTerms: [
        { term: 'Conditional plan', meaning: 'A plan whose next actions depend on received percepts.' },
        { term: 'α-vector', meaning: 'Utilities of a conditional plan in each physical state.' },
        { term: 'Dominated plan', meaning: 'A plan never optimal for any belief state.' },
        { term: 'DDN', meaning: 'Dynamic decision network for online POMDP decision making.' },
      ],
      examPoints: [
        'Explain **conditional plans** and **U(b) = max b · α**.',
        'State that U(b) is **piecewise-linear and convex**.',
        'Explain pruning dominated plans.',
        'Describe online POMDP agents using DDNs and lookahead.',
      ],
      questions: [
        {
          prompt: 'Explain the algorithms for solving POMDPs.',
          plan: ANSWER_PLAN(
            'Offline value iteration over conditional plans, or online lookahead',
            'Lines of α-vectors over belief space',
            'Conditional plans, α-vectors, PWLC utility, dominated plans; DDN, filtering, expectimax, POMCP',
            'Two-state example with Stay and Go plans',
            'Exact is costly; online scales',
          ),
        },
      ],
      keywords: ['POMDP value iteration', 'conditional plan', 'α-vector', 'piecewise-linear convex', 'dominated plan', 'dynamic decision network', 'POMCP', 'expectimax'],
      remember: [
        { prompt: 'Shape of the optimal POMDP utility over beliefs?', answer: 'Piecewise-linear and convex.' },
        { prompt: 'Utility of plan p at belief b?', answer: 'b · αₚ = Σ b(s) αₚ(s)' },
        { prompt: 'Name an online POMDP method.', answer: 'POMCP (or DDN with expectimax lookahead).' },
      ],
    },
  },
}
