// Foundations of Artificial Intelligence — Unit I: Introduction to AI.
// Topic ids match the syllabus outline in ../subjects.js (24CSU5DA).
// Textbook: Russell & Norvig, AI – A Modern Approach, 4th ed., Chapters 1–2.
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
    'Unit I answers two questions: what is AI and where did it come from — and what exactly is an intelligent agent? Everything later in the course (search, logic, probability, decisions) is a way of building better agents.',

  map: [
    { label: 'What AI is', topics: ['foundations-of-artificial-intelligence'] },
    { label: 'Where AI came from', topics: ['the-history-of-artificial-intelligence'] },
    { label: 'AI today', topics: ['the-state-of-the-art', 'risks-and-benefits-of-ai'] },
    { label: 'Intelligent agents', topics: ['agents-and-environments', 'the-structure-of-agents'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'foundations-of-artificial-intelligence': {
      difficulty: 'easy',
      intro: 'Every AI exam starts here: four ways of defining AI and the subjects AI borrows its ideas from.',
      definition:
        'Artificial Intelligence is the study and design of **intelligent agents** — systems that perceive their environment and act to achieve the best expected outcome. AI draws its foundations from philosophy, mathematics, economics, neuroscience, psychology, computer engineering, control theory and linguistics.',
      simpleExplanation: {
        text: 'AI is about making machines that **think or act** in a smart way. Researchers disagree on what “smart” means — like a human, or **rationally** (doing the right thing)? The modern textbook view is the **rational agent**: a program that does the best it can with what it knows.',
        analogy:
          'A good chess coach does not care whether you think exactly like a grandmaster — only whether you pick the best move. The rational-agent view of AI judges machines the same way.',
      },
      visual: {
        type: 'comparison',
        title: 'Four approaches to defining AI',
        table: {
          columns: ['', 'Human-like', 'Rational'],
          rows: [
            ['**Thinking**', 'Thinking humanly — cognitive modelling', 'Thinking rationally — laws of thought (logic)'],
            ['**Acting**', 'Acting humanly — the Turing Test', 'Acting rationally — the rational agent ✓'],
          ],
        },
        caption: 'The textbook adopts **acting rationally**: it is general and can be measured.',
      },
      explanation: [
        { heading: 'The four approaches' },
        {
          list: [
            '**Acting humanly — Turing Test (1950):** a machine passes if a human interrogator cannot tell it from a person. Needs NLP, knowledge representation, reasoning and learning.',
            '**Thinking humanly — cognitive modelling:** build programs whose steps match how the human mind works (studied by cognitive science).',
            '**Thinking rationally — laws of thought:** use formal **logic** to reach correct conclusions (Aristotle’s syllogisms).',
            '**Acting rationally — rational agent:** act to achieve the **best expected outcome**. This is the standard model of AI.',
          ],
        },
        { heading: 'Foundations of AI — the contributing disciplines' },
        {
          table: {
            columns: ['Discipline', 'What it gave AI'],
            rows: [
              ['Philosophy', 'Logic, reasoning, mind as a physical system, where knowledge comes from'],
              ['Mathematics', 'Formal logic, algorithms, computability, probability'],
              ['Economics', 'Utility, decision theory, game theory'],
              ['Neuroscience', 'How the brain processes information (neurons)'],
              ['Psychology', 'How humans and animals think and act; cognitive science'],
              ['Computer engineering', 'Fast hardware to run AI programs'],
              ['Control theory', 'Systems that act on feedback to reach a goal'],
              ['Linguistics', 'How language relates to thought; NLP'],
            ],
          },
        },
        { tip: 'Learn the disciplines as a list of eight — a common 5-mark question is “Explain the foundations of AI”.' },
      ],
      example: {
        title: 'Which approach is it?',
        input: 'A chatbot fools a judge into thinking it is human after a 5-minute chat.',
        output: `Approach: Acting humanly
Test used: Turing Test
Abilities needed: NLP, knowledge, reasoning, learning`,
        explanation:
          'Passing the Turing Test is about **behaving** like a human, not about thinking rationally. A self-driving car choosing the safest lane is instead an example of **acting rationally**.',
      },
      keyPoints: [
        'AI = building **intelligent agents** that perceive and act.',
        'Four approaches: think humanly, think rationally, act humanly, act rationally.',
        'The standard model is **acting rationally** — the rational agent.',
        'The Turing Test checks acting humanly.',
        'Eight foundations: philosophy, maths, economics, neuroscience, psychology, computer engineering, control theory, linguistics.',
      ],
      importantTerms: [
        { term: 'Turing Test', meaning: 'A test of whether a machine’s behaviour is indistinguishable from a human’s.' },
        { term: 'Rational agent', meaning: 'An agent that acts to achieve the best expected outcome.' },
        { term: 'Cognitive modelling', meaning: 'Building programs that think the way humans do.' },
        { term: 'Laws of thought', meaning: 'The logic-based approach to correct reasoning.' },
      ],
      examPoints: [
        'Define AI and draw the **2 × 2 table** of the four approaches.',
        'Explain each approach in two lines; mention the **Turing Test** under acting humanly.',
        'State that the textbook follows the **rational agent** approach and why.',
        'List the eight foundation disciplines with one contribution each.',
      ],
      questions: [
        {
          prompt: 'Define Artificial Intelligence. Explain the four approaches to AI and the foundations of AI.',
          plan: ANSWER_PLAN(
            'Study of agents that perceive and act to achieve the best outcome',
            '2 × 2 table: thinking/acting × humanly/rationally',
            'Turing Test, cognitive modelling, laws of thought, rational agent',
            'Chatbot passing Turing Test; self-driving car acting rationally',
            'Eight foundation disciplines and their contributions',
          ),
        },
      ],
      keywords: ['intelligent agent', 'Turing Test', 'cognitive modelling', 'laws of thought', 'rational agent', 'foundations'],
      remember: [
        { prompt: 'Which approach does the Turing Test belong to?', answer: 'Acting humanly.' },
        { prompt: 'Which approach is the standard model of AI?', answer: 'Acting rationally — the rational agent.' },
        { prompt: 'Which discipline gave AI utility and decision theory?', answer: 'Economics.' },
      ],
    },

    // ------------------------------------------------------------------
    'the-history-of-artificial-intelligence': {
      difficulty: 'easy',
      intro: 'AI has had booms and “winters”. Knowing the milestones helps you explain why today’s AI looks the way it does.',
      definition:
        'The history of AI runs from early neural models (1943) and the Dartmouth workshop (1956), through early enthusiasm, the AI winters and expert systems, to the rise of probability, machine learning, big data and deep learning.',
      simpleExplanation: {
        text: 'AI started with huge optimism in the 1950s, hit limits when problems got bigger, recovered with **expert systems** in the 1980s, then took off with **probability, data and learning**. Each era fixed the weakness of the one before.',
        analogy: 'Like a student who first memorises rules, then realises rules break, and finally learns from lots of practice examples.',
      },
      visual: {
        type: 'timeline',
        title: 'Milestones in AI',
        events: [
          { label: '1943', detail: 'McCulloch & Pitts — artificial neuron model' },
          { label: '1950', detail: 'Turing — “Computing Machinery and Intelligence”' },
          { label: '1956', detail: 'Dartmouth workshop — the name “AI” is born' },
          { label: '1966–73', detail: 'Reality check — first AI winter' },
          { label: '1969–86', detail: 'Expert systems — knowledge is power' },
          { label: '1986–', detail: 'Neural networks return (back-propagation)' },
          { label: '1987–', detail: 'Probabilistic reasoning and machine learning' },
          { label: '2001–', detail: 'Big data' },
          { label: '2011–', detail: 'Deep learning' },
        ],
      },
      explanation: [
        { heading: 'Inception (1943–1956)' },
        'McCulloch and Pitts proposed a model of artificial neurons. Hebb gave a learning rule. Alan Turing proposed the Turing Test in 1950. In 1956 John McCarthy organised the **Dartmouth workshop**, where the term “Artificial Intelligence” was coined.',
        { heading: 'Early enthusiasm (1952–1969)' },
        'Programs such as the **Logic Theorist** and **General Problem Solver (GPS)** proved theorems and solved puzzles. McCarthy created **LISP**. Researchers predicted human-level AI within decades.',
        { heading: 'A dose of reality (1966–1973)' },
        'Methods that worked on toy problems failed on real ones because of **combinatorial explosion**. Funding was cut — the first **AI winter**.',
        { heading: 'Expert systems (1969–1986)' },
        'Systems like **DENDRAL** (chemistry) and **MYCIN** (diagnosing blood infections) used large amounts of domain-specific knowledge as rules. AI became an industry, then faced a second winter when these systems proved hard to maintain.',
        { heading: 'Modern AI (1986 onwards)' },
        {
          list: [
            '**Neural networks return** with back-propagation.',
            '**Probabilistic reasoning** — Bayesian networks handle uncertainty.',
            '**Big data** — huge datasets make learning possible.',
            '**Deep learning** — multi-layer networks win at image and speech recognition (e.g. ImageNet, 2012).',
          ],
        },
      ],
      example: {
        title: 'Match the system to its era',
        input: 'MYCIN diagnoses blood infections using about 450 if-then rules.',
        output: `Era: Expert systems (1969–1986)
Idea: domain knowledge written as rules
Weakness: hard to maintain, cannot learn`,
        explanation: 'Expert systems were powerful in narrow fields, which pushed AI towards systems that **learn** from data instead.',
      },
      keyPoints: [
        '1956 Dartmouth workshop — birth of AI as a field (John McCarthy).',
        'Early programs: Logic Theorist, General Problem Solver.',
        'AI winters came from over-promising and combinatorial explosion.',
        'Expert systems (DENDRAL, MYCIN) used domain knowledge as rules.',
        'Modern AI = probability + machine learning + big data + deep learning.',
      ],
      importantTerms: [
        { term: 'Dartmouth workshop', meaning: '1956 meeting where the term “Artificial Intelligence” was coined.' },
        { term: 'AI winter', meaning: 'A period of reduced funding and interest in AI.' },
        { term: 'Expert system', meaning: 'A program that uses expert rules to solve problems in one narrow domain.' },
        { term: 'Deep learning', meaning: 'Machine learning with neural networks of many layers.' },
      ],
      examPoints: [
        'Write the history as **phases with years** — a timeline earns marks.',
        'Name one system per phase: Logic Theorist, MYCIN, Deep Blue/AlphaGo.',
        'Explain why AI winters happened (combinatorial explosion, over-promising).',
      ],
      questions: [
        {
          prompt: 'Trace the history of Artificial Intelligence.',
          plan: ANSWER_PLAN(
            'AI developed in phases from 1943 to deep learning',
            'Timeline: 1943 → 1956 → winters → expert systems → ML → deep learning',
            'Each phase: key idea and its limitation',
            'Logic Theorist, MYCIN, ImageNet',
            'Dartmouth 1956; data and learning drive modern AI',
          ),
        },
      ],
      keywords: ['McCulloch–Pitts', 'Turing 1950', 'Dartmouth 1956', 'AI winter', 'expert systems', 'MYCIN', 'deep learning'],
      remember: [
        { prompt: 'Where and when was the term “AI” coined?', answer: 'At the Dartmouth workshop, 1956.' },
        { prompt: 'Name a famous medical expert system.', answer: 'MYCIN — diagnosed blood infections.' },
        { prompt: 'Why did the first AI winter happen?', answer: 'Methods failed to scale — combinatorial explosion.' },
      ],
    },

    // ------------------------------------------------------------------
    'the-state-of-the-art': {
      difficulty: 'easy',
      intro: 'Examiners like real-world applications. This topic gives you a ready list of what AI can do today.',
      definition:
        'The state of the art of AI is what current AI systems can actually do — in areas such as robotics, speech recognition, translation, game playing, medicine, recommendation and autonomous vehicles.',
      simpleExplanation: {
        text: 'AI is no longer only a lab idea. It drives cars, translates languages, beats world champions at games, reads medical scans and recommends what you watch next.',
        analogy: 'Think of your phone: face unlock, voice assistant, auto-correct and photo search are all AI working quietly in the background.',
      },
      visual: {
        type: 'network',
        title: 'Where AI is used today',
        center: { label: 'AI today' },
        nodes: [
          { label: 'Robotic vehicles', note: 'self-driving cars' },
          { label: 'Speech', note: 'voice assistants' },
          { label: 'Translation', note: 'real-time' },
          { label: 'Games', note: 'chess, Go' },
          { label: 'Medicine', note: 'image diagnosis' },
          { label: 'Recommendations', note: 'shopping, video' },
        ],
      },
      explanation: [
        { heading: 'Applications to quote' },
        {
          list: [
            '**Robotic vehicles** — autonomous cars that sense roads and drive safely.',
            '**Legged locomotion & robots** — robots that walk, balance and pick objects.',
            '**Autonomous planning and scheduling** — NASA spacecraft and delivery route planners.',
            '**Machine translation** — translating text and speech between many languages.',
            '**Speech recognition** — voice assistants and automatic captions.',
            '**Recommendations** — products, films and music matched to each user.',
            '**Game playing** — Deep Blue beat Kasparov at chess (1997); AlphaGo beat Lee Sedol at Go (2016).',
            '**Image understanding** — object detection and caption generation.',
            '**Medicine** — detecting disease in X-rays and scans as well as specialists.',
            '**Climate science** — modelling weather and climate data.',
          ],
        },
        { note: 'Many systems work in **narrow** tasks. General human-level intelligence has not been achieved.' },
      ],
      example: {
        title: 'One application, explained',
        input: 'AlphaGo vs Lee Sedol, 2016',
        output: `Domain: Game playing
Methods: deep learning + search (Monte Carlo tree search)
Result: beat a world champion at Go, 4 games to 1`,
        explanation: 'Go has far too many positions to search fully, so AlphaGo combined learning (to judge positions) with search (to look ahead).',
      },
      keyPoints: [
        'AI is used in vehicles, speech, translation, games, medicine and recommendations.',
        'Deep Blue (chess, 1997) and AlphaGo (Go, 2016) are classic milestones.',
        'Most AI today is **narrow** — very good at one task.',
        'Modern successes combine learning with search and reasoning.',
      ],
      importantTerms: [
        { term: 'Narrow AI', meaning: 'AI that performs well in one specific task.' },
        { term: 'Machine translation', meaning: 'Automatic translation between human languages.' },
        { term: 'Autonomous vehicle', meaning: 'A vehicle that senses and drives without human control.' },
      ],
      examPoints: [
        'List **at least six** application areas with a one-line example each.',
        'Quote Deep Blue and AlphaGo with years.',
        'Note that current AI is mostly narrow, not general.',
      ],
      questions: [
        {
          prompt: 'Discuss the state of the art in Artificial Intelligence.',
          plan: ANSWER_PLAN(
            'What current AI systems can do',
            'Hub diagram: AI → application areas',
            'Vehicles, speech, translation, games, medicine, recommendation',
            'AlphaGo beating Lee Sedol (2016)',
            'Narrow AI; learning + search',
          ),
        },
      ],
      keywords: ['robotic vehicles', 'speech recognition', 'machine translation', 'Deep Blue', 'AlphaGo', 'recommendation', 'narrow AI'],
      remember: [
        { prompt: 'Which AI beat Kasparov at chess, and when?', answer: 'IBM Deep Blue, 1997.' },
        { prompt: 'Which AI beat Lee Sedol at Go?', answer: 'AlphaGo, 2016.' },
        { prompt: 'Is today’s AI general or narrow?', answer: 'Mostly narrow — strong at specific tasks.' },
      ],
    },

    // ------------------------------------------------------------------
    'risks-and-benefits-of-ai': {
      difficulty: 'easy',
      intro: 'A favourite essay question: AI can do great good, but it also brings real dangers that must be managed.',
      definition:
        'The benefits of AI include higher productivity, better healthcare, safer transport and scientific discovery. The risks include lethal autonomous weapons, surveillance, biased decisions, job loss, safety-critical failures, cybersecurity threats and the long-term problem of controlling very capable AI.',
      simpleExplanation: {
        text: 'AI is a powerful tool. Used well, it saves lives and time. Used carelessly or harmfully, it can be unfair, unsafe or hard to control. The key idea is that AI must stay **aligned** with human values.',
        analogy: 'AI is like fire: it cooks food and heats homes, but without care it burns the house down.',
      },
      visual: {
        type: 'comparison',
        title: 'Benefits vs risks',
        items: [
          {
            title: 'Benefits',
            tone: 'good',
            points: [
              'Productivity — automates boring work',
              'Healthcare — faster, more accurate diagnosis',
              'Safety — fewer road accidents',
              'Science — new drugs and materials',
              'Access — education and help for everyone',
            ],
          },
          {
            title: 'Risks',
            tone: 'bad',
            points: [
              'Autonomous weapons',
              'Surveillance and loss of privacy',
              'Biased or unfair decisions',
              'Job displacement',
              'Safety failures and misuse',
              'Losing control of superintelligent AI',
            ],
          },
        ],
      },
      explanation: [
        { heading: 'Main risks' },
        {
          list: [
            '**Lethal autonomous weapons** — machines that select and attack targets without human control.',
            '**Surveillance and persuasion** — face recognition and targeted messages can threaten privacy and democracy.',
            '**Biased decision making** — systems trained on biased data can treat people unfairly (loans, hiring, parole).',
            '**Impact on employment** — automation can replace some jobs faster than new ones appear.',
            '**Safety-critical applications** — an error in a self-driving car or medical system can cost lives.',
            '**Cybersecurity** — AI can be used to attack as well as defend.',
          ],
        },
        { heading: 'The control problem' },
        'If an AI is very capable but its objective is slightly wrong, it may pursue that objective in harmful ways. This is the **value alignment problem**: making sure machines pursue goals that truly match human preferences.',
        { tip: 'End an essay answer with remedies: regulation, transparency, fairness testing and keeping humans in control.' },
      ],
      example: {
        title: 'A risk in practice',
        input: 'A hiring AI is trained on ten years of past hiring records from a company that mostly hired men.',
        output: `Risk: biased decision making
Effect: rejects equally good female candidates
Remedy: audit data, test fairness, keep human review`,
        explanation: 'The AI did exactly what the data taught it. Bias in → bias out.',
      },
      keyPoints: [
        'Benefits: productivity, health, safety, science, access.',
        'Risks: weapons, surveillance, bias, jobs, safety failures, cyber attacks.',
        'Long-term risk: controlling superintelligent AI.',
        'Value alignment = AI goals must match human values.',
      ],
      importantTerms: [
        { term: 'Value alignment', meaning: 'Ensuring an AI’s objectives match what humans actually want.' },
        { term: 'Algorithmic bias', meaning: 'Unfair outcomes caused by biased data or design.' },
        { term: 'Autonomous weapon', meaning: 'A weapon that chooses and engages targets without a human.' },
      ],
      examPoints: [
        'Draw a two-column **benefits vs risks** table.',
        'Explain at least four risks with an example each.',
        'Mention the **value alignment** / control problem.',
        'Conclude with safeguards: regulation, fairness, human oversight.',
      ],
      questions: [
        {
          prompt: 'Discuss the risks and benefits of Artificial Intelligence.',
          plan: ANSWER_PLAN(
            'AI brings large benefits and serious risks',
            'Benefits vs risks table',
            'Weapons, surveillance, bias, jobs, safety, cyber; value alignment',
            'Biased hiring AI',
            'Safeguards: regulation, transparency, human control',
          ),
        },
      ],
      keywords: ['benefits', 'autonomous weapons', 'surveillance', 'bias', 'employment', 'safety-critical', 'value alignment'],
      remember: [
        { prompt: 'What is the value alignment problem?', answer: 'Making sure an AI’s goals truly match human values.' },
        { prompt: 'Name three risks of AI.', answer: 'Autonomous weapons, biased decisions, job loss.' },
        { prompt: 'Name three benefits of AI.', answer: 'Better healthcare, safer transport, higher productivity.' },
      ],
    },

    // ------------------------------------------------------------------
    'agents-and-environments': {
      difficulty: 'medium',
      intro: 'The agent is the central idea of the whole course. Rationality, PEAS and environment types appear in almost every paper.',
      definition:
        'An **agent** is anything that perceives its **environment** through **sensors** and acts upon it through **actuators**. A **rational agent** chooses the action expected to maximise its **performance measure**, given its percept sequence and built-in knowledge.',
      simpleExplanation: {
        text: 'An agent has a loop: **sense → decide → act**. What it senses is a **percept**; everything it has sensed so far is its **percept sequence**. The **agent function** maps that sequence to an action. An agent is **rational** if it picks the action that does best on the performance measure.',
        analogy: 'You are an agent: eyes and ears are sensors, hands and voice are actuators, and passing the exam is your performance measure.',
      },
      visual: {
        type: 'flow',
        title: 'The agent–environment loop',
        steps: [
          { label: 'Environment', note: 'the world' },
          { label: 'Sensors', note: 'produce percepts' },
          { label: 'Agent program', note: 'decides: ?' },
          { label: 'Actuators', note: 'perform actions' },
          { label: 'Environment changes', note: 'loop repeats' },
        ],
      },
      explanation: [
        { heading: 'Rationality depends on four things' },
        {
          list: [
            'The **performance measure** that defines success.',
            'The agent’s **prior knowledge** of the environment.',
            'The **actions** it can perform.',
            'Its **percept sequence** to date.',
          ],
          ordered: true,
        },
        { trap: 'Rational ≠ perfect or all-knowing (omniscient). A rational agent maximises **expected** performance with the information it has.' },
        { heading: 'PEAS — specifying the task environment' },
        {
          table: {
            columns: ['PEAS', 'Automated taxi'],
            rows: [
              ['**P**erformance', 'Safe, fast, legal, comfortable trip; maximise profit'],
              ['**E**nvironment', 'Roads, traffic, pedestrians, customers, weather'],
              ['**A**ctuators', 'Steering, accelerator, brake, horn, display'],
              ['**S**ensors', 'Cameras, GPS, speedometer, sonar, odometer'],
            ],
          },
        },
        { heading: 'Properties of task environments' },
        {
          table: {
            columns: ['Property', 'Meaning', 'Example'],
            rows: [
              ['Fully vs partially observable', 'Do sensors see the complete state?', 'Chess: fully · Taxi: partially'],
              ['Single vs multi-agent', 'Are other agents acting too?', 'Crossword: single · Chess: multi'],
              ['Deterministic vs stochastic', 'Is the next state fixed by the action?', 'Chess: deterministic · Taxi: stochastic'],
              ['Episodic vs sequential', 'Do current actions affect future ones?', 'Image sorting: episodic · Chess: sequential'],
              ['Static vs dynamic', 'Does the world change while deciding?', 'Crossword: static · Taxi: dynamic'],
              ['Discrete vs continuous', 'Finite states/actions or smooth values?', 'Chess: discrete · Taxi: continuous'],
              ['Known vs unknown', 'Does the agent know the rules?', 'Board game: known · New video game: unknown'],
            ],
          },
        },
        { tip: 'The hardest case: partially observable, multi-agent, stochastic, sequential, dynamic, continuous, unknown — like driving a taxi.' },
      ],
      example: {
        title: 'The vacuum-cleaner world',
        input: 'Two squares A and B. Percept = [location, status]. Actions: Left, Right, Suck.',
        output: `Percept [A, Dirty]  → Suck
Percept [A, Clean]  → Right
Percept [B, Dirty]  → Suck
Percept [B, Clean]  → Left`,
        explanation:
          'This table is the **agent function**. If the performance measure gives one point per clean square per time step, this simple agent is rational.',
      },
      keyPoints: [
        'Agent = sensors + agent program + actuators.',
        'Percept sequence → agent function → action.',
        'Rational = maximise **expected** performance, not perfect.',
        'Describe a task with **PEAS**.',
        'Environment properties come in pairs: observable, agents, deterministic, episodic, static, discrete, known.',
      ],
      importantTerms: [
        { term: 'Percept', meaning: 'What the agent senses at one instant.' },
        { term: 'Agent function', meaning: 'Maps every percept sequence to an action.' },
        { term: 'Performance measure', meaning: 'The criterion that scores how well the agent did.' },
        { term: 'PEAS', meaning: 'Performance, Environment, Actuators, Sensors.' },
      ],
      examPoints: [
        'Draw the **agent–environment diagram** with sensors, actuators and the “?” box.',
        'Define rational agent and list its **four dependencies**.',
        'Give a **PEAS** table (taxi, medical diagnosis or vacuum cleaner).',
        'Explain environment properties with one example each.',
      ],
      questions: [
        {
          prompt: 'What is a rational agent? Explain PEAS and the properties of task environments.',
          plan: ANSWER_PLAN(
            'Perceives via sensors, acts via actuators, maximises expected performance',
            'Agent–environment loop',
            'Rationality factors; PEAS; seven environment properties',
            'Automated taxi PEAS; vacuum world agent function',
            'Rational ≠ omniscient; taxi is the hardest environment',
          ),
        },
      ],
      keywords: ['agent', 'percept', 'percept sequence', 'agent function', 'actuators', 'rationality', 'PEAS', 'observable', 'stochastic'],
      remember: [
        { prompt: 'Expand PEAS.', answer: 'Performance, Environment, Actuators, Sensors.' },
        { prompt: 'Is a rational agent omniscient?', answer: 'No — it maximises expected performance with what it knows.' },
        { prompt: 'Is taxi driving episodic or sequential?', answer: 'Sequential — each action affects later ones.' },
      ],
    },

    // ------------------------------------------------------------------
    'the-structure-of-agents': {
      difficulty: 'medium',
      intro: 'Five agent types, from simple reflex to learning agents. Expect a diagram question on at least one of them.',
      definition:
        'Agent = **architecture + program**. The agent program implements the agent function. There are four basic kinds — simple reflex, model-based reflex, goal-based and utility-based agents — and any of them can be turned into a **learning agent**.',
      simpleExplanation: {
        text: 'Each agent type adds one new ability: a **reflex** agent reacts to what it sees now; a **model-based** agent remembers the world; a **goal-based** agent plans towards a goal; a **utility-based** agent picks the best way to reach it; a **learning** agent gets better with experience.',
        analogy:
          'Touching a hot pan and pulling away is reflex. Remembering where you left your keys is a model. Planning a route home is a goal. Choosing the fastest and cheapest route is utility. Getting better at driving over time is learning.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Types of agent programs',
        root: 'Agent programs',
        children: [
          { label: 'Simple reflex', note: 'condition–action rules', children: ['current percept only'] },
          { label: 'Model-based reflex', note: 'keeps internal state', children: ['handles partial observability'] },
          { label: 'Goal-based', note: 'plans to reach a goal', children: ['search and planning'] },
          { label: 'Utility-based', note: 'maximises happiness', children: ['chooses the best goal path'] },
          { label: 'Learning agent', note: 'improves itself', children: ['critic', 'learning element', 'problem generator'] },
        ],
      },
      explanation: [
        { heading: '1. Simple reflex agent' },
        'Acts only on the **current percept** using **condition–action rules** (if dirty then suck). Fast and simple, but works only in **fully observable** environments and can get stuck in infinite loops.',
        { heading: '2. Model-based reflex agent' },
        'Keeps an **internal state** updated by a **transition model** (how the world changes) and a **sensor model** (how percepts reflect the world). Works in partially observable environments.',
        { heading: '3. Goal-based agent' },
        'Knows the **goal** and uses search or planning to find action sequences that reach it. More flexible: change the goal and behaviour changes.',
        { heading: '4. Utility-based agent' },
        'Uses a **utility function** to measure how desirable a state is. When several paths reach the goal, it chooses the one with the highest **expected utility** (safer, faster, cheaper).',
        { heading: '5. Learning agent' },
        {
          list: [
            '**Performance element** — chooses actions (the agent itself).',
            '**Critic** — tells how well the agent is doing against a fixed standard.',
            '**Learning element** — improves the performance element using the critic’s feedback.',
            '**Problem generator** — suggests new, exploratory actions.',
          ],
        },
        { code: 'function SIMPLE-REFLEX-AGENT(percept) returns action\n  state  ← INTERPRET-INPUT(percept)\n  rule   ← RULE-MATCH(state, rules)\n  return rule.ACTION', lang: 'text' },
      ],
      example: {
        title: 'Same task, different agents',
        input: 'Task: drive a taxi to the airport.',
        output: `Simple reflex : brake when the car ahead brakes
Model-based   : remembers a car is in the blind spot
Goal-based    : plans a route that ends at the airport
Utility-based : picks the fastest, safest, cheapest route
Learning      : learns which roads are jammed at 9 am`,
        explanation: 'Each level adds memory, purpose, preference or improvement on top of the one before.',
      },
      keyPoints: [
        'Agent = architecture + program.',
        'Simple reflex: current percept + condition–action rules.',
        'Model-based: internal state for partial observability.',
        'Goal-based: searches/plans to reach goals.',
        'Utility-based: maximises expected utility.',
        'Learning agent: performance element, critic, learning element, problem generator.',
      ],
      importantTerms: [
        { term: 'Condition–action rule', meaning: '“If condition then action” rule used by reflex agents.' },
        { term: 'Internal state', meaning: 'The agent’s memory of the parts of the world it cannot see now.' },
        { term: 'Utility function', meaning: 'Maps a state to a number showing how desirable it is.' },
        { term: 'Critic', meaning: 'Part of a learning agent that gives feedback on performance.' },
      ],
      examPoints: [
        'Name all **five** agent types and draw at least one diagram.',
        'Contrast goal-based (yes/no success) with utility-based (degree of happiness).',
        'Label the four components of a **learning agent**.',
        'Give the simple reflex agent pseudocode or vacuum-world rule.',
      ],
      questions: [
        {
          prompt: 'Explain the different types of agent programs with neat diagrams.',
          plan: ANSWER_PLAN(
            'Agent = architecture + program',
            'Block diagrams: sensors → state/rules/goals/utility → actuators',
            'Simple reflex, model-based, goal-based, utility-based, learning',
            'Taxi example at each level',
            'Each type adds memory, goals, preferences or learning',
          ),
        },
      ],
      keywords: ['architecture', 'agent program', 'simple reflex', 'model-based', 'goal-based', 'utility-based', 'learning agent', 'critic'],
      remember: [
        { prompt: 'Which agent type keeps an internal state?', answer: 'Model-based reflex agent.' },
        { prompt: 'Goal-based vs utility-based?', answer: 'Goal: reached or not. Utility: how good the outcome is.' },
        { prompt: 'Name the four parts of a learning agent.', answer: 'Performance element, critic, learning element, problem generator.' },
      ],
    },
  },
}
