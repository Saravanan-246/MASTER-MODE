// src/data/software-engineering/unit2.js
// Software Engineering Practices — Unit II: Agile Development and Requirements.
// Aligned with the official 24CSU5CC syllabus (Roger S. Pressman / Ian Sommerville).
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
    'Unit II covers modern iterative software engineering and front-end lifecycle analysis. It begins with the Agile mindset, values, and practices—highlighting Extreme Programming (XP) and key Agile process models (Scrum, ASD, DSDM, FDD)—and transitions into Requirements Engineering: establishing the groundwork, elicitation techniques, use-case modeling, analytical requirements models, multi-stakeholder negotiation, and formal requirements validation.',

  map: [
    {
      label: 'Agile Philosophy & Frameworks',
      topics: [
        'agile-process',
        'extreme-programming',
        'agile-process-models',
      ],
    },
    {
      label: 'Requirements Engineering Fundamentals',
      topics: [
        'establishing-the-groundwork',
        'eliciting-requirements',
      ],
    },
    {
      label: 'Analysis, Modeling & Agreement',
      topics: [
        'developing-use-cases',
        'building-the-requirement-model',
        'negotiating-requirements',
        'validating-requirements',
      ],
    },
  ],

  topics: {
    // ------------------------------------------------------------------
    'agile-process': {
      difficulty: 'easy',
      intro:
        'Traditional sequential models struggled when customer needs changed mid-project. Agile development emerged as a paradigm shift emphasizing adaptability, working software, and rapid feedback loops.',
      definition:
        '**Agile Development** is an iterative and incremental approach to software engineering that delivers operational software in small, rapid cycles. It prioritizes customer collaboration, adaptive planning, self-organizing teams, and rapid responses to evolving business requirements over rigid plans and extensive documentation. **Agile** is a cultural, philosophical, and organizational mindset codified in the **Manifesto for Agile Software Development**. It emphasizes human collaboration, rapid adaptation, technical excellence, and the continuous delivery of business value.',
      simpleExplanation: {
        text: 'Instead of spending a year writing specifications before writing any code, Agile breaks the project into small 2-to-4-week chunks. At the end of each chunk, you deliver a working slice of the application, gather feedback from real users, and adjust your plan for the next cycle.',
        analogy:
          'Driving at night with headlights on: You cannot see the entire 500 km route all at once, but seeing 50 meters ahead is enough to steer, adapt to obstacles, and reach your destination safely.',
      },
      visual: {
        type: 'process',
        title: 'The Agile Iteration Loop',
        steps: [
          { label: '1. Plan Sprint', detail: 'Select high-priority user stories from the product backlog' },
          { label: '2. Design & Build', detail: 'Daily collaboration, pair programming, simple incremental design' },
          { label: '3. Test & Verify', detail: 'Continuous integration, automated unit and acceptance tests' },
          { label: '4. Deploy Increment', detail: 'Deliver working, tested software increment to stakeholders' },
          { label: '5. Review & Adapt', detail: 'Sprint demo, customer feedback, and retrospective tuning' },
        ],
      },
      explanation: [
        { heading: 'Agile development as a process' },
        { heading: 'Core Philosophy of Agile Development' },
        {
          list: [
            '**Iterative & Incremental Delivery** — Large systems are broken into small functional releases called sprints or iterations, each lasting 1 to 4 weeks.',
            '**Working Software as Progress Measure** — Progress is measured by working, tested code in front of users, not by written specification pages.',
            '**Customer Collaboration over Contract Negotiation** — End users and business sponsors participate continuously throughout development, guiding requirements dynamically.',
            '**Embracing Change** — Late requirement changes are welcomed as competitive advantages rather than resisted as schedule disruptions.',
          ],
        },
        { heading: 'Agile vs Traditional (Plan-Driven) Development' },
        {
          table: {
            columns: ['Dimension', 'Traditional (Waterfall/Plan-Driven)', 'Agile Development'],
            rows: [
              ['Requirements Baseline', 'Frozen early during formal specification', 'Dynamic, prioritized in evolving backlogs'],
              ['Delivery Model', 'Single large release at project end', 'Frequent working software increments'],
              ['Customer Role', 'Signs off at start; evaluates at delivery', 'Continuous participant in every iteration'],
              ['Change Management', 'Formal Change Control Board (high friction)', 'Welcomed and planned into upcoming sprints'],
              ['Team Structure', 'Hierarchical, task-assigned developers', 'Cross-functional, empowered, self-organizing'],
            ],
          },
        },
        { heading: 'The Agile Mindset' },
        {
          list: [
            '**Short Feedback Loops** — Discover errors and mismatched expectations within days instead of months.',
            '**Simplicity** — Build only what is needed today (YAGNI — You Aren’t Gonna Need It) rather than over-engineering speculative features.',
            '**Sustainable Pace** — Maintain consistent productivity without perpetual overtime or burnout.',
          ],
        },
        { heading: 'Agility: the Agile Manifesto and its principles' },
        { note: 'In February 2001, seventeen software leaders met in Utah and forged the Agile Manifesto. It established the four cornerstone values and twelve principles that define modern Agile engineering.' },
        'The Agile Manifesto does not say that documentation, processes, tools, and contracts are useless. It states that while those things have value, we value individuals, working software, customer partnership, and adaptability much more.',
        { tip: 'A military field unit in dynamic combat vs. a ceremonial parade manual. The manual has rules, but soldiers on the ground rely on live communication, rapid situational awareness, and split-second tactical adaptation to succeed.' },
        { visual: {
        type: 'comparison',
        title: 'The Four Values of the Agile Manifesto',
        table: {
          columns: ['We Value (Higher Priority)', 'Over (Lower Priority)'],
          rows: [
            ['Individuals and interactions', 'Processes and tools'],
            ['Working software', 'Comprehensive documentation'],
            ['Customer collaboration', 'Contract negotiation'],
            ['Responding to change', 'Following a plan'],
          ],
        },
      } },
        { heading: 'The 4 Core Values Explained' },
        {
          list: [
            '**1. Individuals and Interactions over Processes and Tools** — Skilled people communicating directly in the same room solve complex problems faster than rigid processes and automated ticketing software.',
            '**2. Working Software over Comprehensive Documentation** — Detailed specification binders do not help end users; an operational, bug-free software increment demonstrates real value.',
            '**3. Customer Collaboration over Contract Negotiation** — Building partnerships with business stakeholders yields far better systems than arguing over legal specification contracts.',
            '**4. Responding to Change over Following a Plan** — Market demands, competitors, and technologies shift rapidly. Sticking rigidly to an outdated initial plan guarantees an obsolete product.',
          ],
        },
        { heading: 'Selected Key Principles Behind the Agile Manifesto' },
        {
          list: [
            '**Continuous Delivery** — Highest priority is to satisfy the customer through early and continuous delivery of valuable software.',
            '**Welcome Changing Requirements** — Harness change for the customer’s competitive advantage, even late in development.',
            '**Frequent Delivery** — Deliver working software frequently, from a couple of weeks to a couple of months, with a preference for shorter timescales.',
            '**Daily Collaboration** — Business people and developers must work together daily throughout the project.',
            '**Face-to-Face Conversation** — The most efficient and effective method of conveying information is face-to-face conversation.',
            '**Technical Excellence** — Continuous attention to technical excellence and good design enhances agility.',
            '**Simplicity** — The art of maximizing the amount of work not done is essential.',
            '**Self-Organizing Teams** — The best architectures, requirements, and designs emerge from self-organizing teams.',
          ],
        },
        { label: 'Example: Applying Agile Values in an EdTech Startup', more: [
          'A development team encounters a mid-sprint change where schools request offline tablet sync.',
          { code: `Old approach : Reject request because the signed requirements contract did not specify offline mode.
Agile approach: Developer discusses offline sync directly with school coordinators, updates the backlog priority, and ships an offline sync increment in the next sprint.`, lang: 'text' },
          'Demonstrates customer collaboration and responding to change over rigid contract negotiation.',
        ] },
      ],
      example: {
        title: 'Food Delivery Platform MVP',
        input: 'A food delivery startup needs a mobile platform launched within 3 months.',
        output: `Iteration 1 (Weeks 1-2): Simple restaurant list + static menu browsing.
Iteration 2 (Weeks 3-4): Cart management + basic Cash-on-Delivery checkout.
Iteration 3 (Weeks 5-6): Online payment gateway integration + SMS alerts.
Iteration 4 (Weeks 7-8): Live GPS driver tracking module added after driver feedback.`,
        explanation:
          'Each iteration ships a usable slice of software, allowing real feedback to shape subsequent features.',
      },
      keyPoints: [
        'Agile delivers working software in short, time-boxed iterations (1–4 weeks).',
        'Prioritizes customer collaboration over rigid contractual milestones.',
        'Embraces late-stage requirement changes as positive business adaptations.',
        'Working software is the primary measure of project progress.',
        'Teams are cross-functional, collaborative, and self-organizing.',
        'Agile is codified by 4 core values and 12 guiding principles.',
        'Human interactions and working software take priority over rigid tools and exhaustive paperwork.',
        'Simplicity is defined as maximizing the amount of work not done.',
        'Direct face-to-face communication is the most effective channel for team alignment.',
        'Agility requires continuous attention to technical excellence and refactoring.',
      ],
      importantTerms: [
        {
          term: 'Iteration / Sprint',
          meaning: 'A fixed time-box (typically 2 to 4 weeks) during which a working software increment is developed and tested.',
        },
        {
          term: 'Product Backlog',
          meaning: 'A prioritized list of business and technical requirements, features, and fixes awaiting development.',
        },
        {
          term: 'Software Increment',
          meaning: 'A fully integrated, tested, and operational release of software produced at the end of an iteration.',
        },
        {
          term: 'Agile Manifesto',
          meaning: 'The foundational declaration published in 2001 that outlines four values and twelve principles of agile software development.',
        },
        {
          term: 'Self-Organizing Team',
          meaning: 'A cross-functional team that independently determines how best to accomplish work rather than having tasks dictated by managers.',
        },
        {
          term: 'Technical Excellence',
          meaning: 'Maintaining clean architecture, robust testing, and refactored code so future changes remain inexpensive.',
        },
      ],
      examPoints: [
        'Define Agile Development and state its core objectives.',
        'Contrast plan-driven development with Agile development across requirements, delivery, and customer involvement.',
        'Draw the iterative Agile feedback loop.',
        'Explain why working software is the primary measure of progress.',
        'Quote all four values of the Agile Manifesto verbatim.',
        'Explain at least four principles behind the Agile Manifesto.',
        'Explain why "responding to change" is prioritized over "following a plan".',
      ],
      questions: [
        {
          prompt: 'What is Agile Development? Explain its fundamental philosophy and contrast it with traditional plan-driven approaches.',
          plan: ANSWER_PLAN(
            'Definition of Agile development and iterative delivery',
            'Agile sprint loop diagram (Plan → Build → Test → Deploy → Review)',
            'Core characteristics: short iterations, working software, customer collaboration, embracing change',
            'Food delivery app sprint breakdown example',
            'Comparison table between traditional and Agile software development',
          ),
        },
        {
          prompt: 'State the four core values of the Agile Manifesto and discuss any four supporting agile principles.',
          plan: ANSWER_PLAN(
            'Definition and origin of the Agile Manifesto (2001)',
            'Four values table (Value A over Value B)',
            'Explanation of all 4 values with practical reasoning',
            'Discussion of 4 principles (early delivery, face-to-face communication, simplicity, self-organizing teams)',
            'EdTech tablet sync application example',
          ),
        },
      ],
      keywords: [
        'Agile development',
        'iteration',
        'sprint',
        'incremental delivery',
        'customer collaboration',
        'backlog',
        'Agile Manifesto',
        'values',
        'principles',
        'working software',
        'self-organizing',
      ],
      remember: [
        { prompt: 'What is the primary measure of progress in Agile?', answer: 'Working, tested software.' },
        { prompt: 'How long does a typical Agile iteration last?', answer: 'Usually 1 to 4 weeks.' },
        { prompt: 'How does Agile treat changing requirements?', answer: 'It welcomes changes even late in development as a business advantage.' },
        { prompt: 'Name the four values of the Agile Manifesto.', answer: 'Individuals & interactions over processes & tools; Working software over comprehensive documentation; Customer collaboration over contract negotiation; Responding to change over following a plan.' },
        { prompt: 'What is the definition of simplicity in Agile?', answer: 'The art of maximizing the amount of work not done.' },
        { prompt: 'What type of team yields the best designs according to Agile?', answer: 'Self-organizing teams.' },
      ],
    },

    // ------------------------------------------------------------------
    'extreme-programming': {
      difficulty: 'medium',
      intro:
        'Created by Kent Beck, Extreme Programming takes beneficial traditional software engineering practices—like testing, code reviews, and customer involvement—and pushes them to "extreme" levels.',
      definition:
        '**Extreme Programming (XP)** is an agile, discipline-driven software development methodology designed for small to medium-sized teams facing rapidly changing requirements. It centers on short development cycles, continuous feedback, shared responsibility, and developer-friendly engineering practices like **Test-Driven Development (TDD)** and **Pair Programming**.',
      simpleExplanation: {
        text: 'If code reviews are good, XP reviews code all day by having two developers sit at one computer (**Pair Programming**). If testing is good, XP writes automated tests before writing any real code (**TDD**). If simple code is good, XP constantly cleans and simplifies the codebase (**Refactoring**).',
        analogy:
          'A rally race car: One person drives while the co-driver reads navigation notes (Pair Programming), the pit crew constantly checks tire pressure (Continuous Integration), and every mechanical component is stress-tested before racing (Test-Driven Development).',
      },
      visual: {
        type: 'flow',
        title: 'The Extreme Programming (XP) Development Loop',
        steps: [
          { label: 'User Stories', note: 'Customer writes small functional features and acceptance criteria' },
          { label: 'Release Planning', note: 'Estimate story points, negotiate release scope, schedule velocity' },
          { label: 'Spike Solutions', note: 'Build rapid throwaway prototypes for high-risk technical unknowns' },
          { label: 'Test-Driven Dev', note: 'Write automated unit test first (Red), code to pass (Green), refactor' },
          { label: 'Pair Programming', note: 'Two programmers at one screen: driver types, navigator reviews' },
          { label: 'Continuous Integration', note: 'Integrate into main branch and run all tests multiple times daily' },
        ],
      },
      explanation: [
        { heading: 'Core XP Values' },
        {
          list: [
            '**Communication** — Continuous face-to-face conversations between developers and the on-site customer.',
            '**Simplicity** — Design only for current requirements; never add speculative functionality.',
            '**Feedback** — Immediate feedback through automated unit tests, continuous integration, and frequent customer acceptance tests.',
            '**Courage** — The courage to refactor legacy code, discard flawed designs, and tell stakeholders the truth about estimates.',
            '**Respect** — Developers respect code quality and each other’s contributions.',
          ],
        },
        { heading: 'Key Technical Practices of XP' },
        {
          table: {
            columns: ['XP Practice', 'How It Works in Practice', 'Primary Benefit'],
            rows: [
              ['Test-Driven Development (TDD)', 'Write unit tests before code. Code only until tests pass, then refactor.', 'Zero untested code; acts as living functional documentation.'],
              ['Pair Programming', 'Two coders at one workstation: "Driver" writes code, "Navigator" inspects logic in real time.', 'Continuous real-time code review; cuts defects; spreads domain knowledge.'],
              ['Refactoring', 'Restructure code to improve internal design without changing external behavior.', 'Prevents architectural rot; keeps code clean and simple.'],
              ['Continuous Integration (CI)', 'Code is integrated into the main branch and tested multiple times a day.', 'Catches integration bugs immediately; prevents "merge hell".'],
              ['On-Site Customer', 'A real end-user is embedded with the development team full-time.', 'Answers requirement questions instantly; writes acceptance tests.'],
              ['Collective Code Ownership', 'Any developer can improve, fix, or refactor any piece of code at any time.', 'Eliminates developer silos and bottlenecks.'],
              ['Coding Standards', 'Agreed rules for naming, indentation, and structure across the team.', 'Makes the entire codebase look like it was written by one person.'],
              ['Sustainable Pace (40-Hour Week)', 'Teams do not work excessive overtime.', 'Prevents fatigue, preserves focus, and maintains high code quality.'],
            ],
          },
        },
      ],
      example: {
        title: 'Developing an E-Commerce Checkout Module in XP',
        input: 'A customer writes a user story: "Calculate 18% GST and apply 10% coupon discount on checkout."',
        output: `1. Write Test  : assert calculateTotal(1000, "SAVE10") == 1062.00 (Test FAILS - Red).
2. Pair Work   : Driver codes GST and discount formulas; Navigator checks edge cases (e.g., negative totals).
3. Test Passes : Code passes test (Green).
4. Refactor    : Clean variable names and extract discount logic into a separate helper class.
5. Integrate   : Commit to main repository; automated CI runs full test suite in 90 seconds.`,
        explanation:
          'Demonstrates the Red-Green-Refactor cycle, pair programming, and continuous integration.',
      },
      keyPoints: [
        'XP pushes traditional best practices to extreme levels.',
        '5 core values: Communication, Simplicity, Feedback, Courage, and Respect.',
        'Test-Driven Development (TDD): automated tests are written before functional code.',
        'Pair Programming provides continuous, live peer review and shared knowledge.',
        'Continuous Integration and on-site customers eliminate delays and integration friction.',
      ],
      importantTerms: [
        {
          term: 'Pair Programming',
          meaning: 'A practice where two programmers work together at one computer: the driver writes code, the navigator reviews and plans.',
        },
        {
          term: 'Test-Driven Development (TDD)',
          meaning: 'A development technique where automated unit tests are written before the functional code is implemented.',
        },
        {
          term: 'Spike Solution',
          meaning: 'A rapid, disposable prototype built to explore technical risks or clarify complex requirements.',
        },
        {
          term: 'Collective Ownership',
          meaning: 'The rule that any team member can modify and improve any part of the project codebase.',
        },
      ],
      examPoints: [
        'List and explain at least six core practices of Extreme Programming.',
        'Explain the Test-Driven Development (TDD) cycle (Red-Green-Refactor).',
        'Describe the roles of the Driver and Navigator in Pair Programming.',
        'Explain the role of an on-site customer in XP.',
      ],
      questions: [
        {
          prompt: 'Explain Extreme Programming (XP) in detail. Discuss its core values and key engineering practices.',
          plan: ANSWER_PLAN(
            'Definition and creator of XP (Kent Beck)',
            'XP process cycle flowchart (User Story → Release Plan → TDD → Pair Programming → CI)',
            'Explanation of 5 values (Communication, Simplicity, Feedback, Courage, Respect)',
            'Table of key practices (TDD, Pair Programming, Refactoring, Continuous Integration, On-site Customer)',
            'Checkout discount calculation example illustrating TDD and Pair Programming',
          ),
        },
      ],
      keywords: ['Extreme Programming', 'XP', 'TDD', 'Pair Programming', 'refactoring', 'continuous integration', 'user stories'],
      remember: [
        { prompt: 'What are the two roles in pair programming?', answer: 'The Driver (writes the code) and the Navigator (reviews and guides strategy).' },
        { prompt: 'What comes first in Test-Driven Development?', answer: 'The automated unit test is written before the functional code.' },
        { prompt: 'Who is the on-site customer in XP?', answer: 'A full-time domain expert embedded directly with the engineering team.' },
      ],
    },

    // ------------------------------------------------------------------
    'agile-process-models': {
      difficulty: 'medium',
      intro:
        'Agile is an overarching philosophy implemented through several distinct frameworks and process models. Software engineers must choose the model that best fits their project dynamics, team structure, and governance needs.',
      definition:
        '**Agile Models** are specific, operational process frameworks that instantiate Agile values and principles. Major models include **Scrum**, **Adaptive Software Development (ASD)**, **Dynamic Systems Development Method (DSDM)**, and **Feature-Driven Development (FDD)**.',
      simpleExplanation: {
        text: 'Agile is the general philosophy of staying flexible and fast; Scrum, ASD, DSDM, and FDD are the specific organizational rulebooks that tell you who holds meetings, how requirements are broken down, and how delivery deadlines are enforced.',
        analogy:
          'Agile is like ball sports; Scrum is basketball (fast sprints with defined roles), DSDM is competitive rowing (strict timebox pacing), and FDD is American football (coordinated plays organized around specific tactical features).',
      },
      visual: {
        type: 'comparison',
        title: 'Major Agile Process Models Compared',
        table: {
          columns: ['Agile Model', 'Core Philosophy', 'Key Ceremonies / Phases', 'Best Suited For'],
          rows: [
            ['Scrum', 'Empirical process control, self-organizing teams, sprint cycles', 'Sprint Planning, Daily Scrum (15 min), Sprint Review, Retrospective', 'Cross-functional teams building commercial products with shifting requirements'],
            ['Adaptive Software Development (ASD)', 'Mission-driven, tolerates chaos, cycles of Speculate-Collaborate-Learn', 'Speculation (adaptive planning), Collaboration, Learning (reviews, testing)', 'Complex, high-speed, exploratory projects facing high market volatility'],
            ['Dynamic Systems Development Method (DSDM)', 'Strict timeboxing; fixes time and cost while varying delivered feature scope (MoSCoW)', 'Feasibility, Business Study, Functional Model Iteration, Design/Build, Implementation', 'Enterprise systems requiring formal governance, contracts, and fixed deadlines'],
            ['Feature-Driven Development (FDD)', 'Client-valued feature centricity, short 2-week feature builds, domain modeling', 'Develop Overall Model, Build Feature List, Plan by Feature, Design by Feature, Build by Feature', 'Larger teams building enterprise systems requiring structured domain models'],
          ],
        },
      },
      explanation: [
        { heading: '1. Scrum Framework' },
        {
          list: [
            '**Key Roles** — **Product Owner** (manages and prioritizes product backlog), **Scrum Master** (serves the team, removes impediments, enforces Scrum rules), **Development Team** (cross-functional, self-organizing creators).',
            '**Key Artifacts** — Product Backlog, Sprint Backlog, and Increment (Definition of Done).',
            '**Key Ceremonies** — Sprint Planning, Daily Scrum (15-minute standup answering: what did I do yesterday, what will I do today, what blockers do I face?), Sprint Review (demo to stakeholders), Sprint Retrospective (team process self-improvement).',
          ],
        },
        { heading: '2. Adaptive Software Development (ASD - Highsmith)' },
        {
          list: [
            'Recognizes that in complex, fast-moving environments, detailed planning is impossible (speculation instead of planning).',
            '**Phases** — **Speculate** (define project mission and milestones without rigid feature promises) → **Collaborate** (cross-functional human teamwork across unpredictable issues) → **Learn** (continuous feedback through technical reviews and customer focus groups).',
          ],
        },
        { heading: '3. Dynamic Systems Development Method (DSDM)' },
        {
          list: [
            'Emphasizes that business fitness is the primary measure of system success.',
            'Fixes time and cost early; features are adjusted using the **MoSCoW Prioritization Technique**:',
            '• **M** — Must have (vital for release survival).',
            '• **S** — Should have (important but non-fatal if temporarily omitted).',
            '• **C** — Could have (desirable enhancements).',
            '• **W** — Won’t have this time (deferred to future phases).',
          ],
        },
        { heading: '4. Feature-Driven Development (FDD - Coad and De Luca)' },
        {
          list: [
            'A lightweight, object-oriented approach focused on client-valued features expressed as: `<action> the <result> <by | for | of | to> a(n) <object>` (e.g., "Calculate the total of an order").',
            'Five steps: (1) Develop overall model, (2) Build feature list, (3) Plan by feature, (4) Design by feature, and (5) Build by feature. Features are small enough to be coded and tested in two weeks.',
          ],
        },
      ],
      example: {
        title: 'Applying MoSCoW Prioritization in DSDM',
        input: 'A municipal hospital launches an emergency room triage portal on a strict 6-week regulatory deadline.',
        output: `Must have   : Patient ID lookup, vital signs entry, bed assignment alerts.
Should have : Automated SMS alerts to on-duty specialists.
Could have  : Statistical dashboard charts for hospital administrators.
Won't have  : Multi-language support (deferred to next quarter).`,
        explanation:
          'MoSCoW prioritization ensures on-time delivery by protecting Must-Have features and deferring lower-priority requirements.',
      },
      keyPoints: [
        'Agile models operationalize Agile values through specific roles, workflows, and deliverables.',
        'Scrum organizes work into short sprints led by the Product Owner, Scrum Master, and Development Team.',
        'ASD treats development as an adaptive learning cycle: Speculate, Collaborate, Learn.',
        'DSDM guarantees fixed-deadline delivery using MoSCoW prioritization.',
        'FDD structures development around small, client-valued features implemented in under two weeks.',
      ],
      importantTerms: [
        {
          term: 'Scrum Master',
          meaning: 'The facilitator who removes blockers, shields the team from distractions, and guides adherence to Scrum practices.',
        },
        {
          term: 'MoSCoW Rule',
          meaning: 'A prioritization technique categorizing requirements into Must have, Should have, Could have, and Won’t have.',
        },
        {
          term: 'Product Owner',
          meaning: 'The stakeholder responsible for defining user stories and prioritizing the Product Backlog.',
        },
      ],
      examPoints: [
        'Differentiate between Scrum, ASD, DSDM, and FDD in a comparison table.',
        'Explain the three Scrum roles, four ceremonies, and three artifacts.',
        'Explain the MoSCoW prioritization rule used in DSDM.',
        'Describe the Speculate-Collaborate-Learn cycle in ASD.',
      ],
      questions: [
        {
          prompt: 'Compare and contrast major Agile models: Scrum, Adaptive Software Development (ASD), DSDM, and Feature-Driven Development (FDD).',
          plan: ANSWER_PLAN(
            'Definition and taxonomy of Agile models',
            'Scrum framework flow diagram (Backlog → Sprint → Daily Scrum → Increment)',
            'Detailed analysis of Scrum, ASD, DSDM, and FDD with their unique mechanics',
            'Hospital emergency triage MoSCoW example',
            'Comparison matrix highlighting philosophy, key lifecycle phases, and suitable project types',
          ),
        },
      ],
      keywords: ['Scrum', 'ASD', 'DSDM', 'FDD', 'MoSCoW', 'Product Owner', 'Scrum Master'],
      remember: [
        { prompt: 'What are the three core roles in Scrum?', answer: 'Product Owner, Scrum Master, and the Development Team.' },
        { prompt: 'What does MoSCoW stand for in DSDM?', answer: 'Must have, Should have, Could have, Won’t have this time.' },
        { prompt: 'What are the three phases of ASD?', answer: 'Speculate, Collaborate, and Learn.' },
      ],
    },

    // ------------------------------------------------------------------
    'establishing-the-groundwork': {
      difficulty: 'medium',
      intro:
        'Before scheduling user interviews or writing models, engineers must lay solid groundwork: identifying stakeholders, recognizing multiple viewpoints, establishing collaboration channels, and scoping the problem.',
      definition:
        '**Groundwork (Inception)** in requirements engineering is the preliminary preparation phase where engineers identify project stakeholders, recognize diverse organizational viewpoints, establish effective communication channels, define business goals, and determine initial system scope.',
      simpleExplanation: {
        text: 'You cannot solve a problem until you know who has the problem. Laying the groundwork means finding every person affected by the software, understanding their perspective, setting up meeting guidelines, and agreeing on what is in-scope and what is out-of-scope.',
        analogy:
          'Before building a city bypass road, civil planners do not start digging right away; they consult commuters, local merchants, city officials, and environmental regulators to understand constraints and establish project scope.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Foundational Pillars of Requirements Groundwork',
        root: 'Requirements Groundwork',
        children: [
          {
            label: 'Identify Stakeholders',
            note: 'Direct users, business sponsors, system administrators, compliance officers',
          },
          {
            label: 'Recognize Viewpoints',
            note: 'Operational perspective, managerial perspective, security & maintenance views',
          },
          {
            label: 'Work Toward Collaboration',
            note: 'Establish facilitation rules, shared vocabulary, and trust mechanisms',
          },
          {
            label: 'Establish Problem Scope',
            note: 'Define system boundary, operational context, and core business goals',
          },
        ],
      },
      explanation: [
        { heading: 'Requirements engineering: an overview' },
        { note: 'Building software without clear requirements is like sailing without a compass. Requirements engineering establishes the technical and human bridge between business needs and executable code.' },
        '**Requirements Engineering (RE)** is the disciplined, systematic process of discovering, analyzing, documenting, validating, and managing the services, capabilities, and constraints required of a software system. It forms the critical foundation for all subsequent design, coding, testing, and maintenance activities.',
        'Before you can build the right system, you must understand what problem needs solving. Requirements Engineering ensures that developers and clients reach complete agreement on what the software must do, how well it must do it, and what operational constraints it must respect.',
        { tip: 'An architect drawing up specifications for a corporate tower. They do not pour concrete based on a simple comment like "make a tall glass building"; they measure wind loads, occupant capacities, fire exits, and elevator speeds to produce an unambiguous blueprint.' },
        { visual: {
        type: 'flow',
        title: 'The Requirements Engineering Lifecycle',
        steps: [
          { label: 'Inception / Groundwork', note: 'Identify stakeholders, define project scope and business context' },
          { label: 'Elicitation', note: 'Discover requirements from users through interviews and workshops' },
          { label: 'Elaboration', note: 'Refine requirements into use cases, data models, and behavioral specs' },
          { label: 'Negotiation', note: 'Reconcile conflicting stakeholder demands against budget and time' },
          { label: 'Specification', note: 'Document requirements formally in the Software Requirements Specification (SRS)' },
          { label: 'Validation', note: 'Inspect the specification for ambiguity, completeness, and consistency' },
          { label: 'Management', note: 'Track changes, maintain traceability, and control scope creep' },
        ],
      } },
        { heading: 'Why Requirements Engineering Matters' },
        {
          list: [
            '**Primary Cause of Project Failure** — Over 50% of software defects originate in misunderstood, incomplete, or changing requirements.',
            '**Cost Amplification** — A requirements defect caught during initial analysis costs 1x to fix; fixing that same defect after deployment costs 60x to 100x.',
            '**Baseline for Validation** — You cannot test whether a system works correctly unless you have an agreed requirement defining expected behavior.',
          ],
        },
        { heading: 'Classification of Requirements' },
        {
          list: [
            '**Functional Requirements** — Statements of services the system must provide, detailing how it reacts to specific inputs and behaves in particular situations (e.g., "The system shall calculate compound interest on loans").',
            '**Non-Functional Requirements (NFRs)** — Quality attributes and constraints placed on services, covering performance, security, availability, portability, and regulatory compliance (e.g., "Transaction confirmation must complete within 1.5 seconds").',
            '**Domain Requirements** — Constraints derived from the operational field rather than user requests (e.g., banking regulatory laws, medical HIPAA privacy rules).',
          ],
        },
        { heading: 'The 7 Core Activities of Requirements Engineering (Pressman)' },
        {
          table: {
            columns: ['RE Activity', 'Core Goal and Engineering Action'],
            rows: [
              ['1. Inception', 'Establishes basic business understanding, project scope, and initial stakeholder communication.'],
              ['2. Elicitation', 'Discovers business needs and features from diverse users, documents, and workflows.'],
              ['3. Elaboration', 'Refines elicited requirements into structured models (use cases, class diagrams, flowcharts).'],
              ['4. Negotiation', 'Reconciles conflicting stakeholder priorities to produce a realistic, achievable baseline.'],
              ['5. Specification', 'Formulates the final formal baseline (SRS document, user stories, formal models).'],
              ['6. Validation', 'Conducts formal inspections to ensure specifications are complete, consistent, and testable.'],
              ['7. Management', 'Tracks, traces, and controls changes throughout the software lifecycle.'],
            ],
          },
        },
        { label: 'Example: Core Banking ATM System Requirements', more: [
          'Analyzing the requirements for an automated teller machine (ATM).',
          { code: `Functional Requirement     : "The system shall dispense cash in denominations of 100, 200, and 500 up to daily account limits."
Non-Functional Requirement : "The ATM keypad must encrypt PIN entries using AES-256 before transmitting data over the network."
Domain Requirement         : "Every financial transaction must produce an encrypted audit trail complying with central bank regulations."`, lang: 'text' },
          'Illustrates the clear distinction between functional behavior, non-functional quality constraints, and domain mandates.',
        ] },
        { heading: 'Establishing the groundwork' },
        { heading: '1. Identifying Stakeholders' },
        {
          list: [
            'A **stakeholder** is anyone who benefits directly or indirectly from the system, provides requirements, or is affected by its deployment.',
            '**Key Stakeholder Groups** — End users (daily system operators), business managers (budget sponsors), IT administrators (maintenance and infrastructure), and external auditors (regulatory and security compliance).',
            'Failure to identify a key stakeholder early (e.g., ignoring database administrators or security compliance officers) leads to late architectural surprises and project failure.',
          ],
        },
        { heading: '2. Recognizing Multiple Viewpoints' },
        {
          list: [
            'Different stakeholders view the same software through different lenses:',
            '• **Operator Viewpoint** — Wants simple screens, minimal keystrokes, and clear workflows.',
            '• **Executive Viewpoint** — Wants analytics, financial summaries, and regulatory compliance.',
            '• **IT Maintenance Viewpoint** — Wants straightforward installation, automated backups, and low server footprints.',
            'Requirements engineers must balance these viewpoints without favoring one group exclusively.',
          ],
        },
        { heading: '3. Establishing Collaboration Mechanisms' },
        {
          list: [
            'Establish an open, collaborative environment using small joint working groups.',
            'Create a **Project Glossary** to resolve terminology mismatches (e.g., does "Customer" mean a registered account holder or a guest visitor?).',
            'Establish ground rules for meetings: equal participation, constructive debate, and clear voting rules for decisions.',
          ],
        },
        { heading: '4. Asking the First Questions (Inception Questions)' },
        {
          list: [
            'Who is paying for the system and who will use it?',
            'What is the economic business benefit of a successful solution?',
            'Is there an existing system or competitor doing this, and why must it be replaced?',
            'What are the non-negotiable boundaries, deadlines, and technical constraints?',
          ],
        },
      ],
      example: {
        title: 'Groundwork for a Hospital Electronic Health Record (EHR) System',
        input: 'A regional healthcare trust initiates a project to digitize patient records.',
        output: `Stakeholders Identified : Doctors, Head Nurses, Pharmacists, Billing Clerks, Medical Records Auditors.
Viewpoint Clashes       : Doctors demand zero-typing voice entry; Billing clerks require strict mandatory form validation.
Groundwork Resolution   : Establish a joint clinical-financial committee and define a core project boundary: Billing interfaces with existing insurance gateways; clinical records support mobile tablet input.`,
        explanation:
          'Identifying all relevant groups early uncovers conflicting priorities before requirements are written.',
      },
      keyPoints: [
        'Groundwork establishes stakeholders, viewpoints, scope, and communication channels.',
        'A stakeholder is anyone directly or indirectly affected by the system.',
        'Different stakeholder viewpoints must be balanced to avoid late architectural friction.',
        'Early inception questions clarify business value, primary users, and project constraints.',
        'A project glossary helps prevent confusing terminology mismatches.',
        'Requirements Engineering is the foundation for all design, construction, and testing.',
        'Over 50% of software project failures trace back to poor requirements.',
        'Requirements are categorized into Functional, Non-Functional, and Domain constraints.',
        'The RE process encompasses Inception, Elicitation, Elaboration, Negotiation, Specification, Validation, and Management.',
        'Catching errors during requirements analysis prevents expensive rework later in the lifecycle.',
      ],
      importantTerms: [
        {
          term: 'Stakeholder',
          meaning: 'Any person or organization with a legitimate interest in the system’s design, delivery, or operation.',
        },
        {
          term: 'Project Scope',
          meaning: 'The defined boundary separating what the software will and will not do.',
        },
        {
          term: 'Viewpoint Analysis',
          meaning: 'The practice of organizing and evaluating requirements from different stakeholder perspectives.',
        },
        {
          term: 'Functional Requirement',
          meaning: 'A specification of an active function or service that the software system must perform.',
        },
        {
          term: 'Non-Functional Requirement (NFR)',
          meaning: 'A constraint on system attributes such as performance, security, reliability, and usability.',
        },
        {
          term: 'Requirements Traceability',
          meaning: 'The ability to link a requirement from its business origin through design models, code, and test cases.',
        },
      ],
      examPoints: [
        'Define stakeholder and list four distinct stakeholder groups in enterprise software.',
        'Explain why recognizing multiple viewpoints is vital during the groundwork phase.',
        'List four initial inception questions an engineer should ask during requirements groundwork.',
        'Define Requirements Engineering and explain why it is critical to software success.',
        'Differentiate between Functional and Non-Functional requirements with two examples of each.',
        'List and briefly describe the seven steps in the Requirements Engineering process (Pressman).',
      ],
      questions: [
        {
          prompt: 'Explain the groundwork required to initiate Requirements Engineering. Why is stakeholder identification and viewpoint analysis critical?',
          plan: ANSWER_PLAN(
            'Definition of requirements groundwork and inception',
            'Pillars diagram (Stakeholders, Viewpoints, Collaboration, Scope)',
            'Explanation of stakeholder identification, viewpoint differences, and collaboration rules',
            'Hospital Electronic Health Record (EHR) project example',
            'Core inception questions that establish initial project scope',
          ),
        },
        {
          prompt: 'What is Requirements Engineering? Describe the seven distinct activities in the requirements engineering process.',
          plan: ANSWER_PLAN(
            'Definition of Requirements Engineering and impact on software quality',
            'RE lifecycle flow diagram (Inception through Requirements Management)',
            'Detailed explanation of Inception, Elicitation, Elaboration, Negotiation, Specification, Validation, Management',
            'ATM system example showing functional, non-functional, and domain requirements',
            'Summary of why early requirements validation prevents exponential cost escalation',
          ),
        },
      ],
      keywords: [
        'groundwork',
        'stakeholders',
        'viewpoints',
        'inception',
        'collaboration',
        'scope boundary',
        'requirements engineering',
        'functional',
        'non-functional',
        'specification',
        'validation',
        'traceability',
      ],
      remember: [
        { prompt: 'Who is a stakeholder in software engineering?', answer: 'Anyone who benefits from, uses, operates, or is affected by the software.' },
        { prompt: 'Why do different viewpoints matter?', answer: 'Different stakeholders prioritize different qualities like ease-of-use, security, or cost.' },
        { prompt: 'What is the purpose of initial inception questions?', answer: 'To clarify business goals, identify primary users, and define project boundaries.' },
        { prompt: 'What is the difference between functional and non-functional requirements?', answer: 'Functional defines what the system does; non-functional defines how well or under what constraints it does it.' },
        { prompt: 'Why is catching requirements defects early important?', answer: 'Fixing defects during requirements analysis is up to 100x cheaper than fixing them after deployment.' },
        { prompt: 'What is requirements management?', answer: 'The ongoing practice of controlling changes and maintaining traceability throughout the software lifecycle.' },
      ],
    },

    // ------------------------------------------------------------------
    'eliciting-requirements': {
      difficulty: 'medium',
      intro:
        'Customers rarely hand developers a neat, perfect list of requirements. Requirements elicitation is the discovery process of gathering, unearthing, and clarifying user needs.',
      definition:
        '**Requirements Elicitation** (requirements discovery) is the collaborative practice of gathering, discovering, and extracting software requirements from stakeholders, operational workflows, existing systems, and domain documentation.',
      simpleExplanation: {
        text: 'Requirements are not just lying around waiting to be picked up; they are often hidden in people’s daily habits. Users may forget to mention obvious steps, struggle to explain what they need, or ask for features they do not actually require. Elicitation is the detective work of uncovering what users truly need.',
        analogy:
          'A doctor diagnosing an illness: Patients describe general symptoms ("I feel dizzy"), but the doctor asks targeted questions, runs tests, and reviews medical histories to discover the root cause.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Core Requirements Elicitation Techniques',
        root: 'Elicitation Techniques',
        children: [
          {
            label: 'Interactive Techniques',
            children: ['One-on-One Interviews', 'Collaborative Workshops (JAD)', 'Focus Groups'],
          },
          {
            label: 'Observational Techniques',
            children: ['Job Shadowing (Ethnography)', 'Protocol Analysis', 'Contextual Inquiry'],
          },
          {
            label: 'Indirect Techniques',
            children: ['Questionnaires / Surveys', 'Document & Form Analysis', 'Reverse Engineering'],
          },
          {
            label: 'Exploratory Techniques',
            children: ['UI Prototyping', 'User Story Mapping', 'Scenario Walkthroughs'],
          },
        ],
      },
      explanation: [
        { heading: 'Common Challenges During Elicitation' },
        {
          list: [
            '**Problems of Scope** — The boundary of the system is poorly defined, leading stakeholders to request unnecessary features.',
            '**Problems of Understanding** — Customers are unsure what they need, omit "obvious" domain knowledge, or use confusing jargon.',
            '**Problems of Volatility** — Stakeholder requirements change continuously over time as they learn more about the system.',
          ],
        },
        { heading: 'Key Elicitation Techniques Analyzed' },
        {
          table: {
            columns: ['Technique', 'Mechanism of Operation', 'Advantages', 'Limitations'],
            rows: [
              ['Interviews', 'Structured or open-ended Q&A sessions with individual stakeholders.', 'Gathers deep individual insights and identifies edge cases.', 'Time-consuming; open to interviewer bias and contradictory feedback.'],
              ['Collaborative Workshops (JAD)', 'Facilitated meetings with users, developers, and managers in one room.', 'Builds consensus rapidly; resolves disagreements on the spot.', 'Requires experienced facilitators; can be derailed by dominant personalities.'],
              ['Observation (Ethnography)', 'Shadowing workers in their actual environment as they perform tasks.', 'Uncovers unwritten rules, shortcuts, and true workflows.', 'Time-consuming; workers may change behavior while being observed.'],
              ['Questionnaires', 'Distributing structured digital survey forms to broad user groups.', 'Inexpensive; reaches thousands of distributed users quickly.', 'Superficial answers; cannot ask spontaneous follow-up questions.'],
              ['Prototyping', 'Building interactive mockups or wireframes for users to test.', 'Gives users a concrete interface to critique, uncovering hidden needs.', 'Users may mistake the prototype for a finished production system.'],
            ],
          },
        },
      ],
      example: {
        title: 'Eliciting Requirements for a Municipal Police Dispatch App',
        input: 'Engineers need to capture requirements for an emergency patrol-routing terminal.',
        output: `Interviews    : Officers mention needing an instant panic button.
Observation   : Engineers ride in patrol cars and notice officers wear thick tactical gloves, making tiny touch targets useless.
Prototyping   : A prototype with large 2-inch buttons is tested by officers and immediately approved.`,
        explanation:
          'Observation revealed an environmental constraint (tactical gloves) that interviews alone missed.',
      },
      keyPoints: [
        'Elicitation is the discovery process of gathering requirements from stakeholders.',
        'Overcomes three classic problems: Scope, Understanding, and Volatility.',
        'Primary techniques include interviews, workshops (JAD), observation, questionnaires, and prototyping.',
        'Observation uncovers unwritten habits and real-world constraints that users forget to mention.',
        'Prototyping provides concrete mockups that help stakeholders clarify vague expectations.',
      ],
      importantTerms: [
        {
          term: 'Joint Application Development (JAD)',
          meaning: 'A structured workshop technique bringing users and developers together to formulate requirements collaboratively.',
        },
        {
          term: 'Ethnography',
          meaning: 'Observational research where analysts shadow users in their real operational environment.',
        },
        {
          term: 'Requirements Volatility',
          meaning: 'The tendency of requirements to shift and evolve throughout the software lifecycle.',
        },
      ],
      examPoints: [
        'Define Requirements Elicitation and discuss the three common problems (Scope, Understanding, Volatility).',
        'Compare interviews, questionnaires, and observation across strengths and weaknesses.',
        'Explain the role of prototyping as an elicitation tool.',
      ],
      questions: [
        {
          prompt: 'What is Requirements Elicitation? Explain the major elicitation techniques with their relative merits and demerits.',
          plan: ANSWER_PLAN(
            'Definition of elicitation and the three elicitation challenges',
            'Classification hierarchy diagram of techniques',
            'Detailed evaluation of interviews, JAD workshops, observation, questionnaires, and prototyping',
            'Police dispatch patrol car example highlighting observation',
            'Summary table comparing the efficiency and depth of each technique',
          ),
        },
      ],
      keywords: ['elicitation', 'interviews', 'JAD workshops', 'observation', 'ethnography', 'prototyping', 'volatility'],
      remember: [
        { prompt: 'What are the three classic problems of requirements elicitation?', answer: 'Problems of scope, understanding, and volatility.' },
        { prompt: 'Why is observation (ethnography) effective?', answer: 'It uncovers real operational habits and constraints that users forget to mention in interviews.' },
        { prompt: 'What is a key benefit of JAD workshops?', answer: 'They bring diverse stakeholders together to resolve conflicting requirements rapidly.' },
      ],
    },

    // ------------------------------------------------------------------
    'developing-use-cases': {
      difficulty: 'medium',
      intro:
        'Introduced by Ivar Jacobson, use cases provide a structured, user-centric way to describe how a system interacts with the outside world to accomplish a goal.',
      definition:
        'A **Use Case** is a textual narrative and behavioral model describing a sequence of interactions between an **actor** (an external entity such as a human user or external system) and the **software system** to achieve a specific, observable business goal.',
      simpleExplanation: {
        text: 'A use case tells a simple story: Who wants to do something? What is their goal? What steps do they take? What does the system do in response? And what happens if something goes wrong along the way?',
        analogy:
          'A script for an actor buying a coffee: (1) Customer walks up and orders latte; (2) Barista states price; (3) Customer taps credit card; (4) Machine verifies funds; (5) Barista hands over coffee. An alternate path describes what happens if the card is declined.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Core Components of a Use Case Model',
        root: 'Use Case Structure',
        children: [
          {
            label: 'Actor',
            note: 'Primary (initiator), Secondary (supporting/external system)',
          },
          {
            label: 'Preconditions',
            note: 'Mandatory system state required before use case execution',
          },
          {
            label: 'Primary Success Scenario',
            note: 'Step-by-step normal flow (happy path) achieving the goal',
          },
          {
            label: 'Extensions / Alternate Flows',
            note: 'Branching paths, error conditions, exceptions, recovery',
          },
          {
            label: 'Postconditions',
            note: 'Guaranteed system state after successful completion',
          },
        ],
      },
      explanation: [
        { heading: 'Key Building Blocks' },
        {
          list: [
            '**Actor** — An external entity that interacts with the system. An actor can be a human user (e.g., Bank Customer), hardware device (e.g., RFID Card Reader), or external software service (e.g., Stripe Payment Gateway).',
            '**Primary Actor** — The entity that initiates the interaction to achieve a goal.',
            '**Secondary Actor** — An entity that assists the system in completing the scenario (e.g., an external SMS notification gateway).',
            '**Use Case Boundary** — Defines what functions occur inside the system versus what is handled externally.',
          ],
        },
        { heading: 'The Anatomy of a Written Use Case' },
        {
          table: {
            columns: ['Element', 'Description', 'Example (Online Book Checkout)'],
            rows: [
              ['Use Case Name', 'Active verb + noun phrase naming the goal', 'Purchase Selected Book'],
              ['Primary Actor', 'The role initiating the scenario', 'Registered Customer'],
              ['Precondition', 'What must be true before starting', 'User is logged in; cart has at least 1 item'],
              ['Basic Flow (Happy Path)', 'Numbered sequence of standard interaction steps', '1. User clicks Checkout. 2. System shows total. 3. User submits card details. 4. System charges card. 5. System displays confirmation.'],
              ['Alternative / Exception Flow', 'Branches for handling errors or variations', '3a. Card declined: System displays error message and prompts for another payment method.'],
              ['Postcondition', 'Guaranteed system state on completion', 'Order recorded in database; inventory decremented; receipt emailed.'],
            ],
          },
        },
        { heading: 'UML Relationship Basics in Use Cases' },
        {
          list: [
            '**`<<include>>` Relationship** — Mandatory shared sub-task. The base use case cannot complete without executing the included use case (e.g., *Withdraw Cash* `<<includes>>` *Authenticate User*).',
            '**`<<extend>>` Relationship** — Optional, conditional behavior inserted into a base use case under specific conditions (e.g., *Print Paper Receipt* conditionally `<<extends>>` *Withdraw Cash* only if paper is available and requested).',
          ],
        },
      ],
      example: {
        title: 'Use Case: Withdraw Cash from ATM',
        input: 'A customer wants to withdraw 2,000 INR from their savings account.',
        output: `Actor: Bank Customer
Precondition: ATM is online; has cash; customer has valid debit card.
Basic Flow:
  1. Customer inserts card and enters PIN.
  2. ATM validates PIN with Bank Server.
  3. Customer selects 'Withdrawal' and enters 2,000.
  4. ATM verifies balance, debits account, dispenses cash, and ejects card.
Alternative Flow (Step 2a):
  PIN invalid: ATM increments error counter, notifies user, prompts retry.
Postcondition: Account debited; cash dispensed; transaction logged.`,
        explanation:
          'Shows the actor, preconditions, happy path, exception handling, and final postconditions.',
      },
      keyPoints: [
        'A usecase captures user-system interactions from an external actor’s perspective.',
        'Consists of actors, preconditions, basic flows (happy path), extensions, and postconditions.',
        'Primary actors initiate goals; secondary actors provide supporting services.',
        '`<<include>>` models mandatory sub-steps; `<<extend>>` models optional, conditional branches.',
        'Focuses on functional behavior without locking down internal design or UI code.',
      ],
      importantTerms: [
        {
          term: 'Actor',
          meaning: 'An external role or system that interacts with the application to accomplish a task.',
        },
        {
          term: 'Happy Path',
          meaning: 'The primary success scenario where no errors or exceptions occur.',
        },
        {
          term: '<<include>>',
          meaning: 'A UML relationship where a base usecase always executes the behavior of another usecase.',
        },
        {
          term: '<<extend>>',
          meaning: 'A UML relationship where an optional usecase conditionally enhances a base usecase.',
        },
      ],
      examPoints: [
        'Define a use case and identify its core components.',
        'Differentiate between Primary and Secondary actors.',
        'Explain the difference between `<<include>>` and `<<extend>>` relationships with clear examples.',
        'Write out a complete use case scenario (Name, Actor, Preconditions, Basic Flow, Alternate Flow, Postconditions).',
      ],
      questions: [
        {
          prompt: 'What is a Use Case? Explain its structure and differentiate between <<include>> and <<extend>> relationships with a neat diagram.',
          plan: ANSWER_PLAN(
            'Definition of use case and concept of actors (Jacobson)',
            'Use case diagram showing Actor, Use Cases, <<include>>, and <<extend>> links',
            'Detailed breakdown of usecase elements (Preconditions, Flow, Exceptions, Postconditions)',
            'Complete ATM Cash Withdrawal scenario example',
            'Precise comparison between <<include>> (mandatory) and <<extend>> (conditional)',
          ),
        },
      ],
      keywords: ['use case', 'actor', 'happy path', 'alternative flow', 'precondition', 'postcondition', 'include', 'extend'],
      remember: [
        { prompt: 'What is an actor in a use case?', answer: 'An external person, hardware device, or system that interacts with the application.' },
        { prompt: 'What is the difference between <<include>> and <<extend>>?', answer: '<<include>> is mandatory behavior; <<extend>> is optional, conditional behavior.' },
        { prompt: 'What is a precondition?', answer: 'A condition that must be true before the use case can start executing.' },
      ],
    },

    // ------------------------------------------------------------------
    'building-the-requirement-model': {
      difficulty: 'hard',
      intro:
        'Raw textual requirements can be ambiguous and wordy. A requirements model (analysis model) translates text into clear graphical, behavioral, and structural representations to clarify understanding.',
      definition:
        'A **Requirements Model** (also known as the **Analysis Model**) is a structured, multi-perspective representation of software requirements. It bridges the gap between high-level customer problem statements and detailed architectural design, modeling information, functionality, and system behavior.',
      simpleExplanation: {
        text: 'Imagine planning an office building. Instead of a 200-page written description, the architect provides floor plans (structural models), plumbing diagrams (information flow), and fire evacuation routes (behavioral models). A requirements model does the exact same thing for software.',
        analogy:
          'Medical imaging: An X-ray shows bones (data structure), an MRI shows soft tissue (functional models), and an ECG monitors heartbeat over time (behavioral model). Together, they give a complete picture of the patient.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Core Elements of the Requirements Model (Analysis Model)',
        root: 'Requirements Model',
        children: [
          {
            label: 'Scenario-Based Elements',
            note: 'Use cases, user stories, activity diagrams (how users interact with the system)',
          },
          {
            label: 'Class-Based Elements',
            note: 'Class diagrams, CRC cards, collaboration diagrams (domain objects and relationships)',
          },
          {
            label: 'Flow-Oriented Elements',
            note: 'Data Flow Diagrams (DFD), control flow diagrams (how data transforms through processes)',
          },
          {
            label: 'Behavioral Elements',
            note: 'State Machine diagrams, sequence diagrams (how the system reacts to external events)',
          },
        ],
      },
      explanation: [
        { heading: 'Objectives of the Requirements Model' },
        {
          list: [
            'Describe what the customer requires without prematurely dictating *how* it will be implemented.',
            'Establish a clean baseline for software design and architectural modeling.',
            'Help uncover contradictions, gaps, and ambiguities in raw stakeholder requirements.',
          ],
        },
        { heading: 'The Four Modeling Perspectives (Pressman)' },
        {
          table: {
            columns: ['Perspective', 'UML / Structural Artifacts', 'What It Represents'],
            rows: [
              ['Scenario-Based', 'Use Case Diagrams, Activity Diagrams', 'System requirements from the user perspective; sequences of human-system tasks.'],
              ['Class-Based', 'Class Diagrams, Analysis Packages, CRC Cards', 'Domain objects, system entities, their internal attributes, and relationships.'],
              ['Behavioral', 'State Machine Diagrams, Sequence Diagrams', 'How the system transitions between states in response to external events.'],
              ['Flow-Oriented', 'Data Flow Diagrams (DFD), Data Dictionaries', 'How data inputs are transformed as they pass through functional stages.'],
            ],
          },
        },
        { heading: 'Analysis Model vs Design Model' },
        {
          table: {
            columns: ['Dimension', 'Requirements Model (Analysis)', 'Design Model (Design)'],
            rows: [
              ['Focus', 'Problem domain ("What" the system must do)', 'Solution domain ("How" to implement it)'],
              ['Technical Details', 'Free of database, UI framework, or networking specifics', 'Specifies DB schemas, API endpoints, libraries, and threads'],
              ['Target Audience', 'Business analysts, users, software engineers', 'Developers, systems engineers, testers'],
            ],
          },
        },
      ],
      example: {
        title: 'Modeling an E-Commerce Order Lifecycle',
        input: 'A customer places an order that goes through payment, packaging, and delivery.',
        output: `• Scenario-Based : Use Case: 'Place Order'; Activity Diagram: from cart to payment gateway.
• Class-Based    : Classes 'Order', 'OrderItem', 'Product', 'Customer', 'Invoice'.
• Behavioral     : State Machine: Order transitions [Created] → [Paid] → [Shipped] → [Delivered] or [Cancelled].
• Flow-Oriented  : DFD showing Payment Data flowing into 'Process Payment' process, outputting 'Payment Receipt'.`,
        explanation:
          'Combines scenario, class, state, and data perspectives to provide a complete picture of the system.',
      },
      keyPoints: [
        'The requirements model represents the problem domain without locking down technical implementation details.',
        'Composed of four perspectives: Scenario-based, Class-based, Behavioral, and Flow-oriented.',
        'Scenario models capture user workflows; class models capture domain entities.',
        'Behavioral models track system state transitions; flow models track data transformations.',
        'Bridges the gap between raw user requirements and detailed architectural design.',
      ],
      importantTerms: [
        {
          term: 'Analysis Model',
          meaning: 'A technical model representing software requirements across scenario, class, flow, and behavioral dimensions.',
        },
        {
          term: 'State Machine Diagram',
          meaning: 'A behavioral diagram showing how an entity moves between different states in response to external triggers.',
        },
        {
          term: 'CRC Cards',
          meaning: 'Class-Responsibility-Collaborator cards: index cards used to model domain classes and their responsibilities.',
        },
      ],
      examPoints: [
        'Explain the purpose of a requirements model.',
        'List and describe the four core elements of the Analysis Model (Scenario, Class, Flow, Behavioral).',
        'Differentiate between an Analysis Model and a Design Model.',
      ],
      questions: [
        {
          prompt: 'Discuss the elements of a Requirements Model. How does it bridge the gap between requirements elicitation and software design?',
          plan: ANSWER_PLAN(
            'Definition and purpose of the requirements model (Analysis model)',
            'Four perspectives taxonomy tree (Scenario, Class, Flow, Behavioral)',
            'Detailed breakdown of each perspective with corresponding UML modeling tools',
            'E-commerce order lifecycle multi-perspective example',
            'Comparison table contrasting Analysis Model (What) with Design Model (How)',
          ),
        },
      ],
      keywords: ['requirements model', 'analysis model', 'scenario-based', 'class-based', 'behavioral', 'flow-oriented', 'state machine'],
      remember: [
        { prompt: 'What question does the requirements model answer?', answer: '"What" the system must do, leaving "how" to the design model.' },
        { prompt: 'Name the four primary elements of an analysis model.', answer: 'Scenario-based, class-based, behavioral, and flow-oriented elements.' },
        { prompt: 'What does a state machine diagram show?', answer: 'How a system entity transitions between states in response to external events.' },
      ],
    },

    // ------------------------------------------------------------------
    'negotiating-requirements': {
      difficulty: 'medium',
      intro:
        'Stakeholders often bring conflicting priorities, limited budgets, and aggressive deadlines to a project. Requirements negotiation reconciles these conflicts into a realistic, mutually agreed plan.',
      definition:
        '**Requirements Negotiation** is the collaborative process of resolving conflicts between competing stakeholder demands, balancing system scope against budget, time, and technical constraints, and reaching a formal agreement on a prioritized, achievable set of requirements.',
      simpleExplanation: {
        text: 'The sales team wants 50 new features delivered next month, the security officer demands rigorous multi-step encryption, and the engineering lead says the team only has capacity for 15 features. Negotiation brings these stakeholders together to trade off lower-priority requests and agree on what is realistic.',
        analogy:
          'Buying and renovating a house: The buyer has a fixed budget, so they negotiate with the contractor to build the master bedroom and kitchen now, while deferring the swimming pool to next year.',
      },
      visual: {
        type: 'flow',
        title: 'The Requirements Negotiation Lifecycle',
        steps: [
          { label: 'Identify Conflicts', note: 'Detect overlapping, contradictory, or unfeasible stakeholder requests' },
          { label: 'Analyze Cost & Risk', note: 'Estimate engineering effort, technical feasibility, and budget impact' },
          { label: 'Prioritize Needs', note: 'Rank requirements into Must-Have, Should-Have, and Optional tiers' },
          { label: 'Evaluate Trade-Offs', note: 'Explore alternatives and compromise solutions with stakeholders' },
          { label: 'Formal Agreement', note: 'Sign off on prioritized, achievable baseline requirements' },
        ],
      },
      explanation: [
        { heading: 'Why Requirements Conflict Arises' },
        {
          list: [
            '**Differing Priorities** — Marketing wants attractive interfaces; Security wants multi-step authentication that slows down user interactions.',
            '**Budget & Schedule Constraints** — Customers want enterprise-grade functionality at startup-level budgets and deadlines.',
            '**Technical Feasibility** — Users request real-time performance that exceeds available hardware capabilities or network bandwidth.',
          ],
        },
        { heading: 'Core Negotiation Activities' },
        {
          list: [
            '**1. Conflict Identification** — Pinpoint contradictions early using dependency matrices.',
            '**2. Categorization & Prioritization** — Classify requirements by importance and urgency (e.g., using MoSCoW or analytical ranking).',
            '**3. Trade-Off Analysis** — Evaluate what must be deferred, simplified, or dropped to protect core project goals.',
            '**4. Consensus Building (Win-Win Spirit)** — Adopt Boehm’s Win-Win Model where stakeholders negotiate until everyone achieves an acceptable outcome.',
            '**5. Formal Documentation** — Record agreed trade-offs in the requirements baseline so expectations are clear.',
          ],
        },
        { heading: 'Boehm’s Win-Win Requirements Negotiation Model' },
        {
          table: {
            columns: ['Step', 'Action Taken during Negotiation', 'Example Outcome'],
            rows: [
              ['Identify Win Conditions', 'Determine what each stakeholder must achieve to consider the project a success.', 'Marketing: launch within 3 months. Security: prevent unauthorized data breaches.'],
              ['Identify Issues', 'Highlight direct conflicts between different win conditions.', 'Complex encryption will push the launch date out by 6 weeks.'],
              ['Propose Options', 'Formulate alternative solutions that address both concerns.', 'Use a verified third-party cloud authentication service (Auth0/OAuth).'],
              ['Negotiate Agreements', 'Agree on an option that satisfies all key win conditions.', 'Security accepts third-party audit; marketing hits the 3-month launch window.'],
            ],
          },
        },
      ],
      example: {
        title: 'Negotiating Requirements for a Fleet Vehicle Tracking App',
        input: 'The logistics director requests real-time GPS updates every 1 second, but engineering warns this will drain batteries and exceed cellular data budgets.',
        output: `Conflict      : 1-second GPS reporting vs 12-hour phone battery life.
Negotiation   : Analysts demonstrate that delivery trucks travel on open highways where 30-second updates are sufficient.
Compromise    : Report GPS location every 30 seconds under normal driving; increase frequency to every 3 seconds only when sudden braking or impacts are detected.
Result        : Both logistics tracking and battery life requirements are met.`,
        explanation:
          'Shows how trade-offs and alternative solutions satisfy business goals while respecting technical limits.',
      },
      keyPoints: [
        'Negotiation resolves contradictions between stakeholder demands, budgets, and technical limits.',
        'Centers on prioritization, trade-off analysis, and consensus building.',
        'Boehm’s Win-Win model helps ensure all key stakeholders achieve acceptable outcomes.',
        'Requirements must be prioritized so non-essential features can be deferred when constraints arise.',
        'Documenting agreed trade-offs prevents future misunderstandings and scope creep.',
      ],
      importantTerms: [
        {
          term: 'Trade-off Analysis',
          meaning: 'Evaluating the pros and cons of competing options to balance cost, performance, and features.',
        },
        {
          term: 'Win-Win Negotiation',
          meaning: 'A collaborative approach where all stakeholders work to satisfy their core objectives rather than competing.',
        },
        {
          term: 'Conflict Identification',
          meaning: 'The process of uncovering inconsistent or contradictory requirements across stakeholder groups.',
        },
      ],
      examPoints: [
        'Define Requirements Negotiation and explain why it is necessary.',
        'Describe the steps of Barry Boehm’s Win-Win Requirements Negotiation model.',
        'Discuss how requirements prioritization techniques (like MoSCoW) aid negotiation.',
      ],
      questions: [
        {
          prompt: 'What is Requirements Negotiation? Describe the negotiation process and explain Barry Boehm’s Win-Win Model.',
          plan: ANSWER_PLAN(
            'Definition and purpose of requirements negotiation',
            'Negotiation lifecycle flow diagram (Conflicts → Cost/Risk → Prioritize → Trade-offs → Agreement)',
            'Detailed breakdown of Boehm’s Win-Win model (Win conditions, Issues, Options, Agreements)',
            'Fleet tracking GPS battery-vs-frequency example',
            'Key strategies for successful stakeholder consensus building',
          ),
        },
      ],
      keywords: ['requirements negotiation', 'conflicts', 'trade-offs', 'Win-Win model', 'prioritization', 'consensus'],
      remember: [
        { prompt: 'Why is requirements negotiation needed?', answer: 'To resolve contradictions between stakeholder wishes, budget limits, and technical constraints.' },
        { prompt: 'What is the goal of Boehm’s Win-Win model?', answer: 'To ensure all key stakeholders achieve their core objectives through compromise.' },
        { prompt: 'What is trade-off analysis?', answer: 'Weighing competing alternatives to balance cost, delivery time, and functional scope.' },
      ],
    },

    // ------------------------------------------------------------------
    'validating-requirements': {
      difficulty: 'medium',
      intro:
        'Requirements validation is the final quality gate before development begins. It verifies that the specification accurately reflects customer needs and provides a sound basis for design and testing.',
      definition:
        '**Requirements Validation** is the formal process of inspecting and reviewing the Software Requirements Specification (SRS) to verify that the requirements accurately, completely, and consistently describe the system that the customer truly wants built.',
      simpleExplanation: {
        text: 'Requirements validation is the final quality check on your blueprint before construction begins. You make sure nothing is missing, no two pages contradict each other, and every requirement can actually be tested once code is written.',
        analogy:
          'Proofreading a legal contract before signing it: You check that clauses do not contradict each other, terms are defined clearly, and every obligation is realistic and enforceable.',
      },
      visual: {
        type: 'flow',
        title: 'The Requirements Validation Process',
        steps: [
          { label: 'Requirements Specification (SRS)', note: 'Draft document containing requirements and analysis models' },
          { label: 'Validation Checks', note: 'Verify completeness, consistency, realism, verifiability, clarity' },
          { label: 'Inspection Review', note: 'Cross-functional review with users, architects, and QA engineers' },
          { label: 'Defect Identification', note: 'Document ambiguities, missing items, and logical conflicts' },
          { label: 'Correction & Baseline Sign-Off', note: 'Fix defects and establish approved SRS baseline' },
        ],
      },
      explanation: [
        { heading: 'The Five Classic Requirements Validation Checks' },
        {
          list: [
            '**1. Validity Checks** — Does the system provide the functions that best support the customer’s real operational needs? (Are we building the right system?)',
            '**2. Consistency Checks** — Are there any contradictory requirements? (e.g., one section states all users must authenticate via email, while another allows anonymous checkouts).',
            '**3. Completeness Checks** — Does the specification include all functional capabilities, edge cases, and operational constraints requested by users?',
            '**4. Realism (Feasibility) Checks** — Can the requirements actually be implemented within the proposed budget, technology stack, and timeline?',
            '**5. Verifiability (Testability) Checks** — Can a software tester design an unambiguous, objective test case to prove whether the requirement was satisfied?',
          ],
        },
        { heading: 'Requirements Validation Techniques' },
        {
          table: {
            columns: ['Technique', 'How It Works', 'Primary Value'],
            rows: [
              ['Requirements Reviews / Inspections', 'A formal panel (developers, customers, QA) steps through the SRS line by line.', 'Catches ambiguities, missing items, and confusing jargon early.'],
              ['Prototyping', 'An interactive model is demonstrated to stakeholders for review.', 'Validates user interface flows and uncovers misunderstood requirements.'],
              ['Test-Case Generation', 'QA engineers write draft black-box test cases directly from the requirements.', 'If a requirement is too vague to write a test case for, it fails verifiability.'],
              ['Automated Consistency Analysis', 'Using CASE tools to parse formal requirement models for logic conflicts.', 'Discovers structural loops, missing inputs, and logic deadlocks.'],
            ],
          },
        },
        { heading: 'Unverifiable vs Verifiable Requirements' },
        {
          list: [
            '❌ **Unverifiable Requirement** — "The web application interface shall be intuitive, visually pleasing, and respond quickly."',
            '*(Problem: What does "pleasing" or "quickly" mean? A tester cannot write an objective pass/fail test for this).*',
            '✔️ **Verifiable Requirement** — "Under a simulated load of 5,000 concurrent users, the home page shall render completely within 2.0 seconds over a standard 4G connection."',
            '*(Solution: A performance testing tool can measure and verify this pass/fail threshold objectively).*',
          ],
        },
      ],
      example: {
        title: 'Validating Hospital Medical Device Requirements',
        input: 'A draft requirement states: "The patient heart rate monitor shall sound an alarm immediately if things go wrong."',
        output: `Validation Finding : Fails clarity, completeness, and verifiability checks. What does "immediately" mean? What constitutes "things go wrong"?
Validated Rewrite  : "If the heart rate sensor detects a heart rate below 40 BPM or above 140 BPM for 3 consecutive seconds, an audible alarm of at least 85 dB shall trigger within 500 milliseconds."
Outcome            : Now passes verifiability—QA engineers can simulate 150 BPM and objectively verify the alarm timing.`,
        explanation:
          'Shows how validation turns vague statements into objective, verifiable specifications.',
      },
      keyPoints: [
        'Requirements validation ensures the specification describes the system the customer truly wants.',
        'Five classic validation checks: Validity, Consistency, Completeness, Realism, and Verifiability.',
        'Every requirement must be verifiable so testers can design objective pass/fail test cases.',
        'Primary techniques include formal inspections, prototyping, and early test-case generation.',
        'Catching errors during validation prevents costly rework during coding and testing.',
      ],
      importantTerms: [
        {
          term: 'Verifiability',
          meaning: 'The quality of a requirement being clear enough that a tester can design an objective test case to prove it was met.',
        },
        {
          term: 'Requirements Inspection',
          meaning: 'A formal review where stakeholders examine the specification line-by-line to find defects.',
        },
        {
          term: 'SRS Baseline',
          meaning: 'The formally reviewed and approved Software Requirements Specification that guides subsequent development.',
        },
      ],
      examPoints: [
        'Define Requirements Validation and differentiate it from Requirements Elicitation.',
        'Explain the five classic validation checks (Validity, Consistency, Completeness, Realism, Verifiability).',
        'Provide an example of an unverifiable requirement and rewrite it into a verifiable form.',
        'Explain how early test-case generation helps validate requirements.',
      ],
      questions: [
        {
          prompt: 'What is Requirements Validation? Discuss the key validation checks and the techniques used to validate an SRS.',
          plan: ANSWER_PLAN(
            'Definition and importance of requirements validation',
            'Validation process flowchart (Draft SRS → Validation Checks → Inspection → Baseline)',
            'Explanation of the five classic checks: validity, consistency, completeness, realism, verifiability',
            'Hospital heart-monitor requirement rewriting example',
            'Discussion of validation techniques: reviews, prototyping, test-case generation',
          ),
        },
      ],
      keywords: ['requirements validation', 'verifiability', 'consistency', 'completeness', 'SRS', 'inspection', 'testability'],
      remember: [
        { prompt: 'What are the five classic requirements validation checks?', answer: 'Validity, consistency, completeness, realism, and verifiability.' },
        { prompt: 'What makes a requirement verifiable?', answer: 'It is specific and unambiguous enough that an objective test case can prove whether it was met.' },
        { prompt: 'Why is test-case generation useful during validation?', answer: 'If a tester cannot write a clear test case for a requirement, that requirement is too vague or incomplete.' },
      ],
    },
  },
}