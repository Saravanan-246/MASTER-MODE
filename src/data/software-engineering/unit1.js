// src/data/software-engineering/unit1.js
// Software Engineering Practices — Unit I: Software and Software Engineering.
// Aligned with the official 24CSU5CC syllabus (Roger S. Pressman, 9th Edition).
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
    'Unit I introduces the foundational philosophy of Software Engineering: why software differs fundamentally from physical hardware, the distinct attributes of web-based systems, and how structured framework activities transform chaotic coding into disciplined engineering. It covers core practices, widespread development myths, and categorizes process lifecycles across Generic, Prescriptive, Specialized, Unified (UP), and Humphrey’s PSP/TSP frameworks.',

  map: [
    {
      label: 'Software Fundamentals',
      topics: [
        'nature-of-software',
        'unique-nature-of-webapps',
      ],
    },
    {
      label: 'Engineering Context',
      topics: [
        'software-process',
        'software-engineering-practice',
        'software-development-myths',
      ],
    },
    {
      label: 'Foundational Process Models',
      topics: [
        'generic-process-model',
        'prescriptive-process-models',
      ],
    },
    {
      label: 'Advanced & Personal Frameworks',
      topics: [
        'specialized-process-models',
        'unified-process-model',
        'personal-and-team-software-process-models',
      ],
    },
  ],

  topics: {
    // ------------------------------------------------------------------
    'nature-of-software': {
      difficulty: 'easy',
      intro:
        'Software cannot be touched, manufactured in a factory, or replaced when worn out. Understanding its dual role as a product and a vehicle for delivering products is the starting point of software engineering.',
      definition:
        'Software consists of (1) instructions (computer programs) that provide desired features, function, and performance when executed; (2) data structures that enable the programs to adequately manipulate information; and (3) documentation that describes the operation and use of the programs. Unlike hardware, software is **engineered (not manufactured)**, does **not wear out**, and is mostly **custom-built**.',
      simpleExplanation: {
        text: 'A car engine wears down due to friction, heat, and vibration until physical parts break. Software never suffers physical friction. Instead, software degrades when frequent maintenance changes, patches, and feature additions introduce unintended side effects and architectural erosion.',
        analogy:
          'A physical book printed on paper vs. a legal constitution. The paper pages turn yellow and tear (wear out), but the constitution itself deteriorates only when politicians make too many contradictory, rushed amendments (software deterioration).',
      },
      visual: {
        type: 'comparison',
        title: 'Hardware Wear-out vs Software Deterioration',
        table: {
          columns: ['Characteristic', 'Hardware', 'Software'],
          rows: [
            ['Production Mode', 'Manufactured in physical assembly lines', 'Engineered through intellectual design'],
            ['Wear & Tear Mechanism', 'Physical wear out (Bathtub curve: burn-in → wear-out)', 'Deteriorates due to unmanaged changes (Spike curve)'],
            ['Component Reusability', 'Assembled from standardized catalog ICs / parts', 'Largely custom-built, though component reuse is growing'],
            ['Spare Parts Availability', 'Defective physical parts are swapped with spares', 'No spare parts exist; bugs must be re-engineered'],
            ['Failure Causation', 'Environmental stress, heat, vibration, aging', 'Design flaws, logic errors, incomplete specifications'],
          ],
        },
      },
      explanation: [
        { heading: 'Dual Nature of Software' },
        {
          list: [
            '**Software as a Product** — It delivers computing potential via standalone tools, operating systems, games, or enterprise resource platforms.',
            '**Software as a Vehicle** — It acts as the operational backbone that controls hardware (operating systems), transmits communication (networks), and enables creation of other software (compilers, IDEs, CASE tools).',
          ],
        },
        { heading: 'Three Defining Characteristics (Pressman)' },
        {
          list: [
            '**1. Software is developed or engineered, not manufactured** — Both require high quality, but manufacturing involves raw materials, factory floors, and physical quality checks. Software engineering is purely an intellectual problem-solving and design activity.',
            '**2. Software does not wear out** — The hardware failure curve follows the classic bathtub shape (infant mortality → steady low failures → wear-out phase). The idealized software curve drops to a low steady state. In reality, each maintenance request or bug patch causes a failure rate spike.',
            '**3. Most software continues to be custom built** — While hardware engineers select standard off-the-shelf microcontrollers, software engineers still construct substantial portions of software from scratch, despite modern component frameworks.',
          ],
        },
        { heading: 'Major Software Application Domains' },
        {
          list: [
            '**System Software** — Compilers, editors, OS drivers, telecommunication processors.',
            '**Application Software** — Standalone programs solving business needs (point-of-sale, inventory).',
            '**Engineering/Scientific Software** — CAD/CAM, orbital dynamics, molecular modeling.',
            '**Embedded Software** — Firmware inside engine controls, microwave ovens, medical devices.',
            '**Product-Line Software** — Mass-market software (spreadsheets, photo editors).',
            '**Artificial Intelligence Software** — Neural networks, pattern recognition, robotics logic.',
          ],
        },
        {
          tip: 'In exams, draw the **Bathtub Curve** for hardware beside the **Spike Failure Curve** for software to secure full marks.',
        },
      ],
      example: {
        title: 'Core Banking Ledger Engine',
        input: 'A commercial bank runs an automated transaction settlement system handling 50,000 requests/sec.',
        output: `Hardware failure : Hard drives wear out physically over 4 years and are swapped.
Software failure : The code never runs out of ink or gets physical rust. 
Deterioration    : After 18 hasty regulatory tax patches, side effects cause deadlock errors.`,
        explanation:
          'The core algorithm executes indefinitely without wear; deterioration happens purely through human modifications introducing structural defects.',
      },
      keyPoints: [
        'Software = Programs + Data Structures + Documentation.',
        'Engineered through intellectual effort, not stamped out in factories.',
        'Does not wear out; deteriorates due to frequent, poorly controlled changes.',
        'Hardware failure follows a bathtub curve; software exhibits change-induced failure spikes.',
        'Largely custom-built rather than assembled entirely from off-the-shelf parts.',
      ],
      importantTerms: [
        {
          term: 'Deterioration',
          meaning: 'The degradation of software maintainability and quality caused by cumulative patches.',
        },
        {
          term: 'Bathtub Curve',
          meaning: 'A bathtub-shaped failure curve representing hardware infant mortality and wear-out.',
        },
        {
          term: 'Custom-built Software',
          meaning: 'Tailored systems developed specifically to fulfill unique user requirements.',
        },
        {
          term: 'Wear-out Phase',
          meaning: 'The final hardware lifecycle stage where mechanical/thermal fatigue causes device failure.',
        },
      ],
      examPoints: [
        'Define software according to IEEE/Pressman.',
        'Explain the three fundamental characteristics of software.',
        'Draw and contrast the hardware failure bathtub curve with the actual software deterioration curve.',
        'Categorize major software application domains.',
      ],
      questions: [
        {
          prompt: 'What is the nature of software? Contrast software deterioration with hardware wear-out using neat sketches.',
          plan: ANSWER_PLAN(
            'IEEE definition of software (programs, data structures, documentation)',
            'Bathtub curve (hardware) vs. spike failure curve (software)',
            'Three characteristics: engineered not manufactured, does not wear out, custom-built',
            'Banking transaction system example',
            'Summary of why software deterioration requires disciplined maintenance',
          ),
        },
      ],
      keywords: ['engineered', 'manufactured', 'bathtub curve', 'deterioration', 'custom-built', 'failure curve'],
      remember: [
        { prompt: 'Does software wear out over time?', answer: 'No, it does not wear out; it deteriorates due to changes and patches.' },
        { prompt: 'What shape represents the hardware failure curve?', answer: 'The Bathtub curve.' },
        { prompt: 'What are the three components of software?', answer: 'Programs, data structures, and documentation.' },
      ],
    },

    // ------------------------------------------------------------------
    'unique-nature-of-webapps': {
      difficulty: 'easy',
      intro:
        'Modern computing has shifted to network-centric software. Web applications present non-functional demands—such as 24/7 uptime, global concurrency, and continuous deployment—that conventional desktop applications never faced.',
    definition:
        'Web Applications (**WebApps**) are network-intensive software systems accessed through a web browser or thin client across an intranet or the Internet. They blend hypermedia content, dynamic user interaction, and data-store connectivity to deliver complex computing tasks to an unpredictable global audience.',
      simpleExplanation: {
        text: 'A desktop spreadsheet runs on one computer, for one person, with predictable hardware. An online shopping site runs over an unpredictable network, serves 10 users one second and 100,000 the next, and is updated continuously without taking the site down.',
        analogy:
          'A personal movie DVD vs. a 24/7 live television broadcast. The DVD is finished and distributed once; the live broadcast must handle fluctuating viewership, real-time interruptions, and instant script updates on air.',
      },
      visual: {
        type: 'architecture',
        title: 'WebApp Multi-Tier Dynamic Architecture',
        layers: [
          { label: 'Client Tier', items: ['Web Browser', 'Mobile Client', 'Aesthetic UI / Single Page App'] },
          { label: 'Network Tier', items: ['Public Internet / DNS', 'CDN Caching', 'Load Balancers (Traffic Spikes)'] },
          { label: 'Application Server Tier', items: ['Business Logic Controllers', 'Session Management', 'Security & Authentication Gateways'] },
          { label: 'Data Tier', items: ['Relational DBMS', 'NoSQL Key-Value Stores', 'Cloud File Storage'] },
        ],
      },
      explanation: [
        { heading: 'Key Attributes of WebApps (Pressman)' },
        {
          list: [
            '**Network Intensiveness** — A WebApp resides on a network and must serve diverse clients across varying bandwidths and device form factors.',
            '**Concurrency** — Massive numbers of users access the system simultaneously; shared state and data integrity must be maintained.',
            '**Unpredictable Load** — User volume is highly volatile; 500 visitors can jump to 500,000 due to a flash sale or news event.',
            '**Performance Sensitivity** — If a page takes longer than 2–3 seconds to load, users abandon the platform.',
            '**Availability (24/7/365)** — Downtime directly translates into revenue loss and damaged reputation.',
            '**Data Driven** — Modern WebApps generate content dynamically by querying databases rather than serving static HTML pages.',
            '**Content Sensitivity & Aesthetics** — How information is structured visually is just as critical as its algorithmic correctness.',
            '**Continuous Evolution** — WebApps deploy updates continuously (daily or weekly) without formal scheduled maintenance downtimes.',
            '**Immediate Security Exposure** — Exposed globally to the Internet, making them primary targets for SQL injection, cross-site scripting (XSS), and DDoS attacks.',
          ],
        },
        { heading: 'WebApps vs Conventional Software' },
        {
          table: {
            columns: ['Dimension', 'Conventional Desktop Software', 'Web Applications (WebApps)'],
            rows: [
              ['Target Environment', 'Controlled, specific OS/hardware profile', 'Heterogeneous web browsers and varying mobile displays'],
              ['Release Cycles', 'Months or years between major patch releases', 'Continuous delivery, multiple deployments per week'],
              ['User Concurrency', 'Single user or limited corporate LAN users', 'Thousands to millions of concurrent global users'],
              ['Security Surface', 'Bounded behind local OS and office firewall', 'Globally exposed on port 80/443 to the open Internet'],
              ['Content Updates', 'Requires explicit user upgrade or patch run', 'Instant server-side refresh seen immediately by all users'],
            ],
          },
        },
      ],
      example: {
        title: 'University Semester Examination Results Portal',
        input: 'A state university publishes examination grades online at 10:00 AM for 200,000 students.',
        output: `Network Intensiveness : Students load pages from remote 4G and home Wi-Fi networks.
Concurrency & Spike   : 80,000 hits land in the first 5 minutes.
Data-Driven Logic     : Each student query executes authenticated queries against the relational results database.
Security & Integrity  : Must resist SQL injection attempts and protect student mark sheets.`,
        explanation:
          'Demonstrates unpredictable concurrent load, data-driven content generation, and mandatory 24/7 security safeguards.',
      },
      keyPoints: [
        'WebApps are network-intensive, concurrent, and data-driven.',
        'User loads are inherently unpredictable and subject to sharp spikes.',
        'Continuous evolution requires rapid updates without system downtime.',
        'Aesthetics, usability, and page load latency are critical quality criteria.',
        'High security exposure requires robust defense against web-based exploits.',
      ],
      importantTerms: [
        {
          term: 'Concurrency',
          meaning: 'The ability of a system to handle multiple user transactions simultaneously without corrupting shared data.',
        },
        {
          term: 'Unpredictable Load',
          meaning: 'Sudden, severe variations in the volume of simultaneous users querying the system.',
        },
        {
          term: 'Continuous Evolution',
          meaning: 'The software practice of deploying incremental updates and bug fixes on a rolling schedule.',
        },
        {
          term: 'Data-driven',
          meaning: 'Generating user interfaces and responses dynamically from underlying databases rather than static files.',
        },
      ],
      examPoints: [
        'List at least six distinct characteristics of WebApps as identified by Roger Pressman.',
        'Differentiate between conventional standalone software and WebApps across environment, release, and security.',
        'Explain why concurrency and unpredictable load create engineering challenges in WebApps.',
      ],
      questions: [
        {
          prompt: 'Discuss the unique characteristics of Web Applications. How do they differ from conventional software?',
          plan: ANSWER_PLAN(
            'Definition of WebApps and network intensiveness',
            'Architecture block diagram (Browser → Network → Web/App Server → Database)',
            'Nine attributes: concurrency, unpredictable load, data-driven, continuous evolution, aesthetics, security',
            'University results portal flash-crowd example',
            'Comparison table between conventional desktop apps and WebApps',
          ),
        },
      ],
      keywords: ['WebApps', 'concurrency', 'network-intensive', 'unpredictable load', 'continuous evolution', 'data-driven'],
      remember: [
        { prompt: 'Name three unique attributes of WebApps.', answer: 'Network intensiveness, concurrency, and continuous evolution.' },
        { prompt: 'Why is security more critical in WebApps than desktop apps?', answer: 'WebApps are exposed directly to the public Internet 24/7.' },
        { prompt: 'What does "data-driven" mean in WebApps?', answer: 'Web pages are created dynamically by querying backend databases.' },
      ],
    },

    // ------------------------------------------------------------------
    'software-process': {
      difficulty: 'medium',
      intro:
        'Software cannot be built predictably through heroic, uncoordinated hacking. A structured software process establishes the organizational roadmap that guides teams from vague concepts to working, reliable software.',
      definition:
        'A **software process** is a structured framework of activities, actions, and tasks required to build high-quality software. It defines the approach that is taken as software is engineered, establishing **who** does **what**, **when**, and **how** to reach a project objective.',
      simpleExplanation: {
        text: 'A software process is like an airline flight checklist. Pilots do not fly by improvisation; they follow pre-flight inspection, takeoff procedures, cruise monitoring, and landing checklists so passengers reach their destination safely every time.',
        analogy:
          'Constructing a multi-story apartment complex. You do not pour concrete on day one; you survey land, draw blueprints, acquire permits, lay foundations, construct floors, and run safety inspections before tenants move in.',
      },
      visual: {
        type: 'flow',
        title: 'The Generic Software Process Framework',
        steps: [
          { label: 'Communication', note: 'Requirement gathering, stakeholder collaboration' },
          { label: 'Planning', note: 'Effort estimation, task scheduling, risk analysis' },
          { label: 'Modeling', note: 'Analysis models, architectural & interface design' },
          { label: 'Construction', note: 'Code generation, unit and integration testing' },
          { label: 'Deployment', note: 'Delivery, operational support, user feedback loop' },
        ],
      },
      explanation: [
        { heading: 'Structure of a Process: Activities, Actions, and Tasks' },
        {
          list: [
            '**Process Framework Activity** — A broad development milestone (e.g., Communication).',
            '**Software Engineering Action** — A collection of tasks that produces a major work product (e.g., Requirements Elicitation).',
            '**Task** — An individual work unit that focuses on a small, well-defined objective (e.g., conduct stakeholder interview, write user story).',
          ],
        },
        { heading: 'The Five Generic Framework Activities' },
        {
          list: [
            '**1. Communication** — Heavy collaboration between developers and customers to understand objectives and gather requirements.',
            '**2. Planning** — Defines the roadmap: technical tasks, potential risks, required resources, work products, and milestone schedules.',
            '**3. Modeling** — Creating architectural and design representations (e.g., UML diagrams, wireframes, ER diagrams) to verify solutions before coding.',
            '**4. Construction** — The physical realization of the design combining source code implementation with rigorous automated testing.',
            '**5. Deployment** — Delivering the operational software increment to end users, followed by evaluation and feedback.',
          ],
        },
        { heading: 'Umbrella Activities (Cross-Cutting Management)' },
        {
          table: {
            columns: ['Umbrella Activity', 'Role in Software Lifecycle'],
            rows: [
              ['Software Project Tracking & Control', 'Assesses progress against schedule milestones; takes corrective actions on slippage.'],
              ['Risk Management', 'Identifies, assesses, and mitigates technical, operational, and financial risks.'],
              ['Software Quality Assurance (SQA)', 'Verifies that development standards, reviews, and test practices are enforced.'],
              ['Formal Technical Reviews (FTR)', 'Peer reviews to catch logic errors and design flaws before coding.'],
              ['Software Configuration Management (SCM)', 'Manages changes across source code, documents, and baseline artifacts (e.g., Git).'],
              ['Work Product Preparation', 'Generates technical documentation, user manuals, and deployment manifests.'],
              ['Reusability Management', 'Defines criteria for reusable components and library integrations.'],
              ['Measurement & Metrics', 'Collects process, project, and product metrics to improve performance.'],
            ],
          },
        },
      ],
      example: {
        title: 'Developing an E-Commerce Payment Gateway Integration',
        input: 'A fintech engineering team builds an instant UPI/Credit card checkout module.',
        output: `Framework Activity:
• Communication : Interview merchant accounts team on settlement requirements.
• Planning      : Allocate 3 sprints, calculate server costs, identify security risks.
• Modeling      : Draw UML sequence diagrams for transaction handshakes.
• Construction  : Write microservice in Go, implement 95% unit test coverage.
• Deployment    : Release to sandbox environment for merchant beta testing.
Umbrella        : SCM tracks code branches; SQA ensures PCI-DSS compliance audits.`,
        explanation:
          'The five framework activities guide the step-by-step progress, while umbrella activities ensure compliance and quality throughout.',
      },
      keyPoints: [
        'A software process provides the roadmap for high-quality engineering.',
        'Hierarchical breakdown: Framework Activity → Engineering Action → Task.',
        'Five generic framework activities: Communication, Planning, Modeling, Construction, Deployment.',
        'Umbrella activities run continuously across all phases to ensure quality, manage change, and track progress.',
        'Process provides predictability, repeatable quality, and project control.',
      ],
      importantTerms: [
        {
          term: 'Framework Activity',
          meaning: 'A primary, high-level phase within a software process model (e.g., Planning, Modeling).',
        },
        {
          term: 'Umbrella Activity',
          meaning: 'Support processes applied uniformly throughout the lifecycle, such as SQA and SCM.',
        },
        {
          term: 'Work Product',
          meaning: 'Any tangible artifact produced during the engineering effort (code, test suite, design spec).',
        },
        {
          term: 'Software Configuration Management (SCM)',
          meaning: 'The discipline of tracking and controlling changes in the software codebase and documentation.',
        },
      ],
      examPoints: [
        'Define software process and explain why it is necessary.',
        'Name and describe all five generic framework activities in their proper order.',
        'List at least five umbrella activities and explain their role in maintaining project health.',
      ],
      questions: [
        {
          prompt: 'Explain the generic software process framework with its framework and umbrella activities.',
          plan: ANSWER_PLAN(
            'Definition of software process and its purpose',
            'Flow diagram of the five framework activities with umbrella activities spanning beneath',
            'Explanation of Communication, Planning, Modeling, Construction, Deployment',
            'Fintech payment gateway development example',
            'Detailed list of umbrella activities (SCM, SQA, Risk Management)',
          ),
        },
      ],
      keywords: ['software process', 'framework activity', 'umbrella activity', 'SQA', 'SCM', 'milestones'],
      remember: [
        { prompt: 'What are the five generic framework activities in order?', answer: 'Communication, Planning, Modeling, Construction, Deployment.' },
        { prompt: 'What is the role of umbrella activities?', answer: 'They manage quality, change, and risk across the entire lifecycle.' },
        { prompt: 'Give two examples of umbrella activities.', answer: 'Software Quality Assurance (SQA) and Software Configuration Management (SCM).' },
      ],
    },

    // ------------------------------------------------------------------
    'software-engineering-practice': {
      difficulty: 'medium',
      intro:
        'If the process is the roadmap, practice is the steering wheel. Software engineering practice governs the day-to-day technical methods, principles, and problem-solving steps engineers apply to build software.',
      definition:
        '**Software engineering practice** is the disciplined application of concepts, principles, methods, and tools to the technical execution of a software project. It translates the abstract phases of a process framework into real engineering actions.',
      simpleExplanation: {
        text: 'Knowing you need to model a system is process; knowing how to draw a clean class diagram that avoids coupling and spaghetti dependencies is practice. It is the craftsmanship of software engineering.',
        analogy:
          'In cooking, the recipe is the process (mix, bake, cool). The chef’s knife skills, temperature control, and taste testing represent practice.',
      },
      visual: {
        type: 'process',
        title: 'Polya’s Problem Solving Applied to Software Practice',
        steps: [
          { label: '1. Understand the Problem', detail: 'Who are stakeholders? What inputs, outputs, and constraints exist?' },
          { label: '2. Plan the Solution', detail: 'Select design patterns, map data structures, outline architecture' },
          { label: '3. Carry Out the Plan', detail: 'Write clean modular code, adhere to coding standards, pair program' },
          { label: '4. Examine the Result', detail: 'Execute unit tests, conduct formal code reviews, validate with users' },
        ],
      },
      explanation: [
        { heading: 'The Essence of Practice: Polya’s Principles' },
        {
          list: [
            '**Understand the problem** — Who has a stake in the solution? What data and functions are required? Can the problem be partitioned into smaller components?',
            '**Plan the solution** — Have you seen similar problems before? Can existing patterns or components be reused? Can you represent the solution graphically?',
            '**Carry out the plan** — Does the implementation match the design plan? Is the code clean, documented, and verifiable?',
            '**Examine the result** — Can you test each component thoroughly? Does the solution satisfy all original stakeholder requirements?',
          ],
        },
        { heading: 'Core Principles Guiding Practice (Hooker’s Principles)' },
        {
          list: [
            '**Principle 1: The Reason It All Exists** — To provide business and operational value to users.',
            '**Principle 2: KISS (Keep It Simple, Stupid!)** — All design should be as simple as possible, but no simpler.',
            '**Principle 3: Maintain the Vision** — A clear architectural vision must guide the team to avoid design chaos.',
            '**Principle 4: What You Produce, Others Will Consume** — Write readable code, specify clean interfaces, and document assumptions.',
            '**Principle 5: Be Open to the Future** — Design systems that accommodate future change without requiring complete rewrites.',
            '**Principle 6: Plan Ahead for Reuse** — Designing reusable modules saves time and improves system quality.',
            '**Principle 7: Think!** — Clear, deliberate thought before action prevents costly mistakes.',
          ],
        },
        { heading: 'Core Practices Across Framework Activities' },
        {
          table: {
            columns: ['Activity', 'Core Technical Practice Undertaken by Engineers'],
            rows: [
              ['Communication Practice', 'Active listening, collaborative requirements elicitation, scoping boundaries.'],
              ['Planning Practice', 'WBS (Work Breakdown Structure), iterative estimation, risk evaluation.'],
              ['Modeling Practice', 'Domain analysis, architectural design, component-level UML modeling.'],
              ['Construction Practice', 'Refactoring, defensive coding, test-driven development (TDD), unit testing.'],
              ['Deployment Practice', 'Automated CI/CD pipelines, canary releases, user feedback collection.'],
            ],
          },
        },
      ],
      example: {
        title: 'Hospital ICU Patient Monitoring System',
        input: 'Developing an alert system for critical shifts in patient vital signs.',
        output: `Understand : Identify sensor inputs, threshold limits, and nurse station alert priorities.
Plan        : Design an event-driven Observer pattern connecting beds to nurses' terminals.
Carry Out   : Implement alert listeners in Rust/C++ with strict memory bounds.
Examine     : Run boundary value tests on simulated cardiac signals; review code for race conditions.`,
        explanation:
          'Demonstrates how Polya’s four problem-solving steps translate medical requirements into safe, reliable code.',
      },
      keyPoints: [
        'Practice represents the technical "how-to" methods of software development.',
        'Rooted in George Polya’s problem-solving method: Understand, Plan, Carry Out, Examine.',
        'Guided by David Hooker’s seven fundamental engineering principles (value, simplicity, vision).',
        'Applies distinct engineering methods across every framework activity.',
      ],
      importantTerms: [
        {
          term: 'KISS Principle',
          meaning: '"Keep It Simple, Stupid": prioritizing clarity and simplicity over convoluted designs.',
        },
        {
          term: 'Architectural Vision',
          meaning: 'A cohesive, shared design strategy that keeps the team aligned throughout development.',
        },
        {
          term: 'Refactoring',
          meaning: 'Restructuring code to improve internal design without altering its external behavior.',
        },
      ],
      examPoints: [
        'Explain George Polya’s four problem-solving steps applied to software engineering practice.',
        'List and explain at least five of David Hooker’s core principles of practice.',
        'Differentiate between software process and software engineering practice.',
      ],
      questions: [
        {
          prompt: 'Describe the core principles that guide software engineering practice.',
          plan: ANSWER_PLAN(
            'Definition of software engineering practice',
            'Polya problem-solving flowchart (Understand → Plan → Carry Out → Examine)',
            'Hooker’s 7 principles with brief explanations',
            'ICU Patient Monitoring System application example',
            'Distinction between process framework and day-to-day practice',
          ),
        },
      ],
      keywords: ['practice', 'Polya', 'Hooker principles', 'KISS', 'refactoring', 'problem solving'],
      remember: [
        { prompt: 'What are Polya’s four steps in software practice?', answer: 'Understand the problem, plan a solution, carry out the plan, examine the result.' },
        { prompt: 'What is Hooker’s first principle?', answer: 'The reason software exists is to provide value to its users.' },
        { prompt: 'Why is simplicity important in software design?', answer: 'Simple designs are easier to understand, maintain, test, and extend.' },
      ],
    },

    // ------------------------------------------------------------------
    'software-development-myths': {
      difficulty: 'easy',
      intro:
        'Software myths are outdated beliefs and misconceptions that lead managers, customers, and developers into bad decisions, blown budgets, and project failures.',
      definition:
        '**Software myths** are erroneous beliefs, rules of thumb, and attitudes regarding software development that appear logical on the surface, but are contradicted by software engineering realities. They are traditionally classified into **Management Myths**, **Customer Myths**, and **Practitioner Myths**.',
      simpleExplanation: {
        text: 'Thinking that hiring ten more cooks will make a one-hour recipe finish in six minutes is a myth. Adding more programmers to a late project actually makes it later because existing developers must stop work to train the new hires.',
        analogy:
          'Medical folklore vs. science. Believing that swallowing cold water cures a fever is an intuitive myth; real clinical science proves otherwise. Software myths are the folklore of computing.',
      },
      visual: {
        type: 'comparison',
        title: 'Core Software Myths vs Realities',
        table: {
          columns: ['Stakeholder Category', 'Widely Held Myth', 'Software Engineering Reality'],
          rows: [
            [
              'Management Myth',
              '"We have books and manuals full of policies; our team knows everything needed to build software."',
              'Manuals are rarely read, often outdated, and do not reflect modern agile practices or toolchains.',
            ],
            [
              'Management Myth',
              '"If we fall behind schedule, we can simply add more programmers to catch up quickly."',
              'Brooks’ Law: Adding personnel to a late software project makes it later due to training and communication overhead.',
            ],
            [
              'Customer Myth',
              '"A general statement of objectives is enough to start coding; details can be worked out later."',
              'Vague requirements cause major scope creep, rework, and project failure. Clear communication early is essential.',
            ],
            [
              'Customer Myth',
              '"Software is flexible and easy to change, so requirement modifications can be introduced anytime at zero cost."',
              'The cost of change rises exponentially across the lifecycle. A change costing $1 in analysis can cost $100 in maintenance.',
            ],
            [
              'Practitioner Myth',
              '"Once we write the code and get it running, our job is completely done."',
              '60% to 80% of total lifetime engineering effort occurs after delivery (maintenance, upgrades, bug fixes).',
            ],
            [
              'Practitioner Myth',
              '"The only deliverable that matters is working code; documentation and models just slow us down."',
              'Without documentation and design models, software becomes unmaintainable legacy code within months.',
            ],
          ],
        },
      },
      explanation: [
        { heading: 'Why Software Myths Persist' },
        {
          list: [
            '**Historical Inertia** — Management practices carried over from manufacturing assembly lines do not fit software development.',
            '**Misplaced Intuition** — Customers assume intangible code can be rewritten instantly without breaking dependencies.',
            '**Developer Overconfidence** — Programmers often prefer coding over documenting, testing, or planning.',
          ],
        },
        { heading: 'Detailed Breakdown by Category' },
        {
          list: [
            '**1. Management Myths** — Managers feel pressure to hit deadlines and control budgets. They lean on false comforts: believing standards binders guarantee quality, assuming outsourced vendors will deliver without internal oversight, and treating programmers like interchangeable factory workers.',
            '**2. Customer Myths** — Customers believe software can be molded without consequence. They delay defining requirements, assuming agile teams can adapt to sweeping scope changes mid-project for free.',
            '**3. Practitioner Myths** — Developers often view code as the sole deliverable, neglecting requirements review and design modeling. This produces unmaintainable, fragile software.',
          ],
        },
        { heading: 'The Cost of Change Curve (Boehm / Pressman)' },
        {
          list: [
            'Fixing an error during **Requirements/Communication** costs **1x**.',
            'Fixing the same error during **Design/Modeling** costs **3x to 5x**.',
            'Fixing it during **Coding/Construction** costs **10x**.',
            'Fixing it during **Testing** costs **20x to 50x**.',
            'Fixing it post-delivery in **Deployment/Maintenance** costs **60x to 100x+**.',
          ],
        },
      ],
      example: {
        title: 'Municipal Bus Ticketing Portal Failure',
        input: 'A transport authority orders a new smart-ticketing system with a 6-month deadline.',
        output: `Customer Myth     : "Just start coding the payment app; we will decide fare formulas later."
Management Myth   : At month 5, realizing work is delayed, management adds 12 junior programmers.
Result            : Existing senior coders spend 3 weeks onboarding new hires. Deadlines slip by 4 months (Brooks' Law).
Practitioner Myth : Developers ship undocumented code. System crashes on day 1; debugging takes months.`,
        explanation:
          'Illustrates how customer, management, and developer myths compound to cause project failure.',
      },
      keyPoints: [
        'Software myths exist across management, customer, and developer groups.',
        'Brooks’ Law: Adding personnel to a late project delays it further.',
        'Cost of change grows exponentially as the project moves toward deployment.',
        'Maintenance accounts for 60%–80% of total lifecycle effort, contradicting the belief that shipping code finishes the job.',
        'Quality requires disciplined requirements and design, not just fast coding.',
      ],
      importantTerms: [
        {
          term: 'Brooks’ Law',
          meaning: 'Fred Brooks’ famous principle: "Adding manpower to a late software project makes it later."',
        },
        {
          term: 'Cost of Change Curve',
          meaning: 'A curve showing the exponential increase in the cost of fixing defects across the lifecycle.',
        },
        {
          term: 'Scope Creep',
          meaning: 'The uncontrolled growth of project requirements without corresponding adjustments to time and budget.',
        },
      ],
      examPoints: [
        'Categorize software myths into Management, Customer, and Practitioner myths.',
        'State Brooks’ Law and explain the communication overhead that causes it.',
        'Sketch and explain the Cost of Change curve.',
      ],
      questions: [
        {
          prompt: 'What are software myths? Discuss management, customer, and practitioner myths along with their realities.',
          plan: ANSWER_PLAN(
            'Definition of software myths and why they persist',
            'Cost of Change curve diagram across development phases',
            'Detailed two-column comparison: Myth vs. Reality across all three categories',
            'Real-world bus ticketing portal failure example',
            'Brooks’ Law and key takeaways for modern project management',
          ),
        },
      ],
      keywords: ['software myths', 'Brooks’ law', 'management myths', 'customer myths', 'practitioner myths', 'cost of change'],
      remember: [
        { prompt: 'What does Brooks’ Law state?', answer: 'Adding manpower to a late software project makes it later.' },
        { prompt: 'What percentage of software effort is spent on maintenance?', answer: 'Between 60% and 80%.' },
        { prompt: 'Why is late requirement change dangerous?', answer: 'The cost of fixing defects rises exponentially later in the lifecycle.' },
      ],
    },

    // ------------------------------------------------------------------
    'generic-process-model': {
      difficulty: 'medium',
      intro:
        'All software lifecycles are built on the same five framework activities. The Generic Process Model describes how these activities are organized and executed over time.',
      definition:
        'The **Generic Process Model** defines the fundamental structural organization and execution flow of the five core framework activities (**Communication, Planning, Modeling, Construction, Deployment**) across time and team interactions.',
      simpleExplanation: {
        text: 'Think of the five framework activities as five musical notes. A linear flow plays them once in a straight line. An iterative flow repeats a section. An evolutionary flow plays the song in layers, adding instruments with each loop.',
        analogy:
          'An assembly line vs. an artist creating a painting. The assembly line moves in a strict line (linear), while the artist sketches an outline, adds colors, refines details, and applies finishing touches across several passes (evolutionary).',
      },
      visual: {
        type: 'process',
        title: 'Types of Process Flow in the Generic Model',
        steps: [
          { label: 'Linear Flow', detail: 'Comm → Plan → Model → Const → Deploy (One-pass sequence)' },
          { label: 'Iterative Flow', detail: 'Comm → Plan → [Model ↺ Const] → Deploy (Phased loops prior to release)' },
          { label: 'Evolutionary Flow', detail: 'Circular expansion delivering increasingly complete software versions' },
          { label: 'Parallel Flow', detail: 'Concurrent execution of different activities across sub-teams' },
        ],
      },
      explanation: [
        { heading: 'Process models: an overview' },
        { note: 'Software projects vary widely in scope, requirements stability, team distribution, and risk. Process models provide structured paradigms adapted to different project realities.' },
        'A **software process model** (or software development life cycle - SDLC model) is a stylized, conceptual representation of the process architecture. It organizes the framework activities, actions, tasks, and flow of work products to bring order and predictability to software development.',
        'A process model is like choosing your travel method. If you know every step of your route, you book an express train (Waterfall). If your terrain is unknown and you are exploring, you take an off-road vehicle and check your map every mile (Iterative/Agile).',
        { tip: 'Standard construction blueprints vs. bespoke clay sculpting. A 40-story bridge needs a strict sequence of engineering phases; an experimental art piece develops iteratively as the sculptor shapes it.' },
        { visual: {
        type: 'hierarchy',
        title: 'Taxonomy of Software Process Models',
        root: 'Process Models',
        children: [
          {
            label: 'Generic Process Model',
            note: 'Foundational framework flow: Linear, Iterative, Evolutionary, Parallel',
          },
          {
            label: 'Prescriptive Models',
            note: 'Orderly, traditional life cycles',
            children: ['Waterfall Model', 'Incremental Model', 'Prototyping Model', 'Spiral Model'],
          },
          {
            label: 'Specialized Models',
            note: 'Narrowly focused methodologies',
            children: ['Component-Based Development (CBD)', 'Formal Methods Model', 'Aspect-Oriented Software'],
          },
          {
            label: 'Unified Process (UP)',
            note: 'Use-case driven, architecture-centric, UML-aligned',
            children: ['Inception', 'Elaboration', 'Construction', 'Transition'],
          },
          {
            label: 'Personal & Team Process',
            note: 'Human-centric discipline (Watts Humphrey)',
            children: ['PSP (Personal Software Process)', 'TSP (Team Software Process)'],
          },
        ],
      } },
        { heading: 'Why Multiple Process Models Exist' },
        {
          list: [
            '**Degree of Requirements Stability** — Stable requirements favor linear models; volatile, evolving requirements need iterative or agile approaches.',
            '**Project Criticality & Risk** — A flight control system requires rigorous formal methods; a startup marketing website prioritizes rapid delivery via prototyping.',
            '**Team Size & Culture** — Small, collocated teams excel with agile models, while large, distributed teams require more formal communication structures.',
          ],
        },
        { heading: 'Core Categories Covered in the Syllabus' },
        {
          list: [
            '**Generic Process Model** — Defines the basic execution sequence (Linear, Iterative, Evolutionary, Parallel).',
            '**Prescriptive Process Models** — Structured, prescriptive frameworks (Waterfall, Incremental, RAD, Prototyping, Spiral).',
            '**Specialized Process Models** — Designed for specific engineering styles, such as component assembly or mathematical verification.',
            '**Unified Process (UP)** — An iterative, object-oriented framework driven by use cases and UML.',
            '**Personal and Team Models (PSP/TSP)** — Focus on individual discipline, measurement, and self-directed teamwork.',
          ],
        },
        { label: 'Example: Selecting a Process Model by Project Type', more: [
          'Three development requests arrive at an IT consultancy firm.',
          { code: `1. Space Launch System Firmware → Prescriptive/Formal Methods (zero tolerance for defects).
2. Startup MVP for Home Services   → Prototyping / Evolutionary Incremental (fast time-to-market).
3. Enterprise Banking Core Refactor → Unified Process (UP) (large-scale, use-case driven).`, lang: 'text' },
          'Demonstrates how requirements stability, risk, and architecture determine process selection.',
        ] },
        { heading: 'The generic process model' },
        { heading: 'The Four Fundamental Process Flows' },
        {
          list: [
            '**1. Linear Process Flow** — Executes each of the five framework activities in a strict sequence, beginning with communication and culminating in deployment. Best suited for projects where requirements are well understood and unlikely to change.',
            '**2. Iterative Process Flow** — Repeats one or more activities before moving to the next. For instance, modeling and construction may loop based on technical clarifications before deployment begins.',
            '**3. Evolutionary Process Flow** — Executes the activities in a circular manner. Each cycle through the five activities produces a more complete version of the software, adapting naturally to requirement changes.',
            '**4. Parallel Process Flow** — Executes different activities simultaneously. For example, one sub-team constructs component A while another models component B.',
          ],
        },
        { heading: 'Activity Inputs, Actions, and Work Products' },
        {
          table: {
            columns: ['Framework Activity', 'Core Actions', 'Primary Work Products / Deliverables'],
            rows: [
              ['Communication', 'Stakeholder interviews, scoping, elicitation', 'Project Charter, System Requirements Spec (SRS) draft'],
              ['Planning', 'WBS definition, risk assessment, scheduling', 'Software Project Management Plan (SPMP), Gantt Chart'],
              ['Modeling', 'Analysis modeling, architecture design, interface mockups', 'UML Diagrams, Architectural Design Document, DB Schema'],
              ['Construction', 'Code implementation, code review, automated test suites', 'Executable Source Code, Unit Test Cases, Test Logs'],
              ['Deployment', 'Installation, user onboarding, user evaluation', 'Shipped Increment, User Manual, Customer Feedback'],
            ],
          },
        },
      ],
      example: {
        title: 'Process Flows in a Smart College Library System',
        input: 'A development team builds a library RFID tracking system.',
        output: `Linear Flow       : Finalize all catalog specs → Design entire DB → Code → Deliver (fails if requirements change).
Evolutionary Flow : Cycle 1: Build basic book checkout. 
                    Cycle 2: Add fine payments via UPI.
                    Cycle 3: Integrate RFID scanner hardware.`,
        explanation:
          'Demonstrates how an evolutionary flow reduces delivery risk by releasing useful increments gradually.',
      },
      keyPoints: [
        'The Generic Process Model defines the workflow connecting the five framework activities.',
        'Four primary process flows: Linear, Iterative, Evolutionary, and Parallel.',
        'Linear flow fits stable, well-understood requirements.',
        'Evolutionary flow is suited for complex systems that require progressive refinement.',
        'Parallel flow accelerates delivery by running tasks concurrently across sub-teams.',
        'A process model structures framework activities into a defined development workflow.',
        'Categorized into Generic, Prescriptive, Specialized, Unified, and Personal/Team models.',
        'Model selection depends on project scale, risk tolerance, and requirements stability.',
        'No single process model is universally ideal for every software project.',
      ],
      importantTerms: [
        {
          term: 'Linear Flow',
          meaning: 'A sequential execution where each framework activity completes before the next begins.',
        },
        {
          term: 'Evolutionary Flow',
          meaning: 'A cyclic process that delivers increasingly functional software releases over time.',
        },
        {
          term: 'Parallel Flow',
          meaning: 'Executing multiple framework activities concurrently across different system modules.',
        },
        {
          term: 'SDLC',
          meaning: 'Software Development Life Cycle: the end-to-end framework describing software creation from concept to retirement.',
        },
        {
          term: 'Process Architecture',
          meaning: 'The overall organizational blueprint structuring activities, deliverables, and quality gates.',
        },
      ],
      examPoints: [
        'List and sketch the four primary process flows in the generic process model.',
        'Detail the key activities, inputs, and outputs of the generic model.',
        'Explain when an evolutionary flow is preferred over a linear flow.',
        'Define a software process model.',
        'Draw the taxonomy classification tree of process models.',
        'Explain the criteria used to choose a process model for a given software project.',
      ],
      questions: [
        {
          prompt: 'Explain the Generic Process Model. Compare Linear, Iterative, Evolutionary, and Parallel process flows with neat diagrams.',
          plan: ANSWER_PLAN(
            'Definition of generic process model and five framework activities',
            'Neat block diagrams illustrating Linear, Iterative, Evolutionary, and Parallel flows',
            'Detailed operational explanation of each flow type',
            'College library system example demonstrating flows',
            'Summary table of deliverables produced across each framework activity',
          ),
        },
        {
          prompt: 'What is a software process model? Provide a taxonomy of process models covered in software engineering.',
          plan: ANSWER_PLAN(
            'Definition of process model and SDLC',
            'Classification hierarchy diagram',
            'Detailed explanation of Generic, Prescriptive, Specialized, UP, PSP/TSP',
            'Selection criteria table with examples',
            'Summary of why project context dictates process choice',
          ),
        },
      ],
      keywords: [
        'generic process',
        'linear flow',
        'iterative flow',
        'evolutionary flow',
        'parallel flow',
        'deliverables',
        'process model',
        'taxonomy',
        'SDLC',
        'prescriptive',
        'specialized',
        'unified process',
      ],
      remember: [
        { prompt: 'What are the four process flows?', answer: 'Linear, Iterative, Evolutionary, and Parallel.' },
        { prompt: 'Which flow is best for volatile requirements?', answer: 'The Evolutionary process flow.' },
        { prompt: 'What is parallel process flow?', answer: 'Executing different engineering activities simultaneously across sub-teams.' },
        { prompt: 'What does SDLC stand for?', answer: 'Software Development Life Cycle.' },
        { prompt: 'What are the main categories of process models in this syllabus?', answer: 'Generic, Prescriptive, Specialized, Unified Process, and Personal/Team models.' },
        { prompt: 'Can one model fit every project?', answer: 'No, model selection depends on requirements stability, risk, and team dynamics.' },
      ],
    },

    // ------------------------------------------------------------------
    'prescriptive-process-models': {
      difficulty: 'hard',
      intro:
        'Prescriptive process models provide defined guidelines, activity sequences, and quality gates to bring structure to software development.',
      definition:
        '**Prescriptive process models** are traditional, structured software engineering frameworks that prescribe a clear set of process elements—framework activities, engineering actions, tasks, deliverables, and quality assurance mechanisms. Prominent models include the **Waterfall Model**, **Incremental Model**, **Prototyping Model**, and **Spiral Model**.',
      simpleExplanation: {
        text: 'These models prescribe a specific recipe for development. Waterfall acts like a rigid assembly line, Prototyping acts like a preview screening to gather audience feedback, and the Spiral model wraps development around continuous risk analysis.',
        analogy:
          'Different construction blueprints: Waterfall is a concrete bridge built strictly foundation-first; Prototyping is building an architectural 3D scale model to get client approval before construction.',
      },
      visual: {
        type: 'comparison',
        title: 'Comparison of Major Prescriptive Process Models',
        table: {
          columns: ['Process Model', 'Underlying Philosophy', 'Best Suited For', 'Primary Weakness'],
          rows: [
            ['Waterfall Model', 'Strict linear sequence with formal phase sign-offs', 'Stable, well-understood requirements; safety-critical systems', 'Struggles with change; working software appears late in the lifecycle'],
            ['Incremental Model', 'Linear sequences staggered to produce usable functional chunks', 'Projects needing rapid core functionality while remaining features evolve', 'Requires clear modular design; integration overhead across releases'],
            ['Prototyping Model', 'Rapid iterative mockups built to clarify customer needs', 'Unclear or rapidly shifting user requirements', 'Risk of customers mistaking prototype for final product; messy prototype code'],
            ['Spiral Model', 'Evolutionary spiral driven by explicit risk assessment', 'Large, complex, high-budget, high-risk systems', 'Requires specialized risk analysis expertise; complex and costly for small projects'],
          ],
        },
      },
      explanation: [
        { heading: '1. The Waterfall Model (Classic Life Cycle)' },
        {
          list: [
            '**Flow** — Communication → Planning → Modeling → Construction → Deployment in a strict line.',
            '**Strengths** — Simple, orderly, easy to schedule, with clear milestones and documentation.',
            '**Weaknesses** — Inflexible to requirement changes; working software is delivered very late; early errors can go unnoticed until integration.',
            '**Ideal Use Case** — Well-defined system rewrites or systems with strict, stable specifications.',
          ],
        },
        { heading: '2. The Incremental Model' },
        {
          list: [
            '**Flow** — Applies linear sequences in a staggered schedule. Increment 1 delivers the core functionality (e.g., core word processor), Increment 2 adds editing tools, and Increment 3 adds advanced spell checking.',
            '**Strengths** — Delivers working software to users early; early increments can be evaluated while later ones are built; helps balance staffing.',
            '**Weaknesses** — Requires a modular architecture; risk of architectural rework if interfaces are poorly defined early on.',
          ],
        },
        { heading: '3. The Prototyping Model' },
        {
          list: [
            '**Flow** — Quick communication → Quick plan & model → Build prototype → Deploy prototype for customer evaluation → Refine prototype iteratively until requirements are clear.',
            '**Strengths** — Clarifies ambiguous user requirements; boosts stakeholder confidence; identifies usability issues early.',
            '**Weaknesses** — Stakeholders may pressure teams to patch the prototype into production; developers often take architectural shortcuts during prototyping.',
          ],
        },
        { heading: '4. The Spiral Model (Boehm)' },
        {
          list: [
            '**Flow** — An evolutionary model combining the systematic nature of Waterfall with the iterative refinement of prototyping. Development winds outward through four quadrants: **Planning**, **Risk Analysis**, **Engineering**, and **Evaluation**.',
            '**Risk-Driven Nature** — At every loop of the spiral, risks (e.g., budget overruns, hardware delays, algorithmic performance bottlenecks) are analyzed before writing code.',
            '**Strengths** — Strong risk management; adapts well to requirement changes throughout development.',
            '**Weaknesses** — Requires experienced risk assessors; process overhead makes it expensive for small projects.',
          ],
        },
      ],
      example: {
        title: 'Applying Models to Specific Project Scenarios',
        input: 'Determining the right process model for three distinct development requests.',
        output: `• Hospital Bed Allocation Engine (Stable, audited specifications) → Waterfall Model.
• Hospital Management System (Needs core admissions live immediately) → Incremental Model.
• Innovative AI Triage Bot (Vague clinical requirements) → Prototyping Model.
• National Healthcare Grid (Multi-million dollar project with technical & legal risks) → Spiral Model.`,
        explanation:
          'Illustrates how requirements stability, delivery urgency, and risk profile guide model selection.',
      },
      keyPoints: [
        'Prescriptive models bring order and predictability to software projects.',
        'Waterfall is linear, simple to manage, but inflexible when requirements change.',
        'Incremental delivers usable software increments early and often.',
        'Prototyping helps clarify vague, ambiguous requirements through interactive feedback.',
        'The Spiral model centers development around risk analysis, making it ideal for large-scale, high-risk systems.',
      ],
      importantTerms: [
        {
          term: 'Waterfall Model',
          meaning: 'A linear sequential process model where each phase must finish before the next begins.',
        },
        {
          term: 'Incremental Model',
          meaning: 'A model that delivers software in functional, usable pieces across multiple releases.',
        },
        {
          term: 'Spiral Model',
          meaning: 'A risk-driven evolutionary process model organized into four iterative quadrants.',
        },
        {
          term: 'Risk Analysis',
          meaning: 'The process of identifying, assessing, and mitigating potential technical or financial pitfalls before committing budget.',
        },
      ],
      examPoints: [
        'Draw and explain the Waterfall model, highlighting its key limitations.',
        'Describe the four quadrants of Boehm’s Spiral model and explain why it is considered risk-driven.',
        'Compare the Incremental model with the Prototyping model.',
      ],
      questions: [
        {
          prompt: 'Explain Boehm’s Spiral Model with a neat diagram. How does it manage risk compared to the Waterfall Model?',
          plan: ANSWER_PLAN(
            'Definition of Spiral Model and risk-driven development',
            'Diagram showing four quadrants (Planning, Risk Analysis, Engineering, Evaluation)',
            'Step-by-step walkthrough of how the spiral progresses outwards',
            'Healthcare system risk-analysis example',
            'Comparison between Waterfall and Spiral models on risk, cost, and flexibility',
          ),
        },
      ],
      keywords: ['Waterfall', 'Incremental', 'Prototyping', 'Spiral model', 'risk analysis', 'Boehm'],
      remember: [
        { prompt: 'What distinguishes the Spiral model from other models?', answer: 'Its explicit focus on continuous risk analysis at every iteration.' },
        { prompt: 'What is the biggest drawback of the Waterfall model?', answer: 'Inflexibility to change, with working software delivered late in the lifecycle.' },
        { prompt: 'Why is prototyping useful for ambiguous requirements?', answer: 'It provides an interactive mockup that helps users clarify what they actually need.' },
      ],
    },

    // ------------------------------------------------------------------
    'specialized-process-models': {
      difficulty: 'hard',
      intro:
        'When traditional prescriptive models do not fit specific engineering constraints, specialized models apply focused techniques—such as component reuse or formal mathematical verification.',
      definition:
        '**Specialized process models** are software engineering approaches applied when a specific or narrowly defined development technique is chosen. Prominent examples include **Component-Based Development (CBD)** and the **Formal Methods Model**.',
      simpleExplanation: {
        text: 'Instead of building an engine from raw metal, you assemble pre-built parts from a catalog (Component-Based Development). Or, instead of testing a medical device through trial and error, you prove mathematically that the software cannot fail (Formal Methods).',
        analogy:
          'Building with LEGO blocks (Component-Based) vs. writing a mathematical proof for an aerospace launch trajectory (Formal Methods).',
      },
      visual: {
        type: 'flow',
        title: 'Component-Based Development (CBD) Lifecycle',
        steps: [
          { label: 'Component Identification', note: 'Analyze requirements to identify needed components' },
          { label: 'Library Lookup', note: 'Search repositories for pre-existing matching components' },
          { label: 'Component Extraction / Adaptation', note: 'Retrieve and adapt candidate components to fit requirements' },
          { label: 'Architectural Integration', note: 'Assemble components using glue code and standard APIs' },
          { label: 'Comprehensive Testing', note: 'Run integration and regression tests on the combined system' },
        ],
      },
      explanation: [
        { heading: '1. Component-Based Development (CBD)' },
        {
          list: [
            '**Concept** — Focuses on assembling software systems from pre-engineered, tested, and packaged software components (commercial off-the-shelf [COTS] or internal libraries).',
            '**Engineering Steps** — (1) Candidate components are evaluated based on the application domain; (2) Component interfaces are analyzed for compatibility; (3) Components are adapted using wrappers/facades; (4) Components are integrated into the system architecture; (5) Comprehensive testing validates overall behavior.',
            '**Benefits** — Dramatically cuts development time (lead time), lowers engineering costs, and improves software reliability through reuse.',
            '**Challenges** — Third-party library dependencies, integration mismatches, and lack of source-code control.',
          ],
        },
        { heading: '2. The Formal Methods Model' },
        {
          list: [
            '**Concept** — Uses rigorous mathematical logic and formal specifications to define, design, and verify computer software behavior.',
            '**Mechanisms** — Uses formal languages (e.g., Z notation, VDM, B-Method) to mathematically prove the correctness of system properties rather than relying solely on test runs.',
            '**Benefits** — Eliminates ambiguity in requirements; discovers subtle synchronization, concurrency, and logic defects that testing often misses.',
            '**Drawbacks** — Extremely expensive and time-consuming; requires specialized mathematical expertise; difficult to use for communicating with non-technical stakeholders.',
            '**Where Applied** — Safety-critical and mission-critical systems: avionics flight controls, nuclear reactor safeguards, rail signaling, medical radiation therapy devices.',
          ],
        },
      ],
      example: {
        title: 'Comparing CBD and Formal Methods by Application',
        input: 'Two high-stakes engineering projects are launched.',
        output: `Project A: FinTech Payment App
→ CBD Model: Assembles Auth0 (Identity), Stripe API (Payments), Twilio (SMS), and ChartJS (UI). Cuts time-to-market from 12 months to 8 weeks.

Project B: Pacemaker Firmware
→ Formal Methods Model: Mathematically proves pulse-timing algorithms will never enter an infinite loop or cause cardiac arrhythmia.`,
        explanation:
          'CBD accelerates general commercial development through component reuse; Formal Methods provides mathematical verification for safety-critical systems.',
      },
      keyPoints: [
        'Specialized models target specific development philosophies rather than general-purpose flows.',
        'Component-Based Development (CBD) prioritizes software reuse to cut development time and cost.',
        'The Formal Methods model relies on mathematical proofs to guarantee defect-free system properties.',
        'Formal Methods is primarily reserved for safety-critical systems where software defects risk human life.',
      ],
      importantTerms: [
        {
          term: 'Component-Based Development (CBD)',
          meaning: 'A process model that designs and constructs software by assembling pre-existing components.',
        },
        {
          term: 'Formal Methods',
          meaning: 'Mathematical techniques used to specify, develop, and verify software correctness.',
        },
        {
          term: 'COTS',
          meaning: 'Commercial Off-The-Shelf: pre-built, commercially available software components used in larger systems.',
        },
      ],
      examPoints: [
        'Outline the steps of the Component-Based Development process.',
        'Explain the advantages and key limitations of the Formal Methods model.',
        'Identify application domains where Formal Methods are mandatory.',
      ],
      questions: [
        {
          prompt: 'Write short notes on Specialized Process Models: (a) Component-Based Development, and (b) Formal Methods Model.',
          plan: ANSWER_PLAN(
            'Definition and scope of specialized models',
            'Flowchart of the CBD component assembly pipeline',
            'Detailed breakdown of CBD and Formal Methods, highlighting Z-notation and mathematical verification',
            'Fintech app vs. pacemaker firmware example',
            'Summary table comparing CBD and Formal Methods across cost, speed, and safety',
          ),
        },
      ],
      keywords: ['specialized models', 'Component-Based Development', 'CBD', 'Formal Methods', 'mathematical proof', 'COTS'],
      remember: [
        { prompt: 'What is the main goal of Component-Based Development?', answer: 'To build software rapidly by reusing pre-existing, tested components.' },
        { prompt: 'What type of systems use Formal Methods?', answer: 'Safety-critical systems like avionics, nuclear control, and medical devices.' },
        { prompt: 'Why is Formal Methods rarely used in everyday commercial apps?', answer: 'It is expensive, time-consuming, and requires specialized mathematical expertise.' },
      ],
    },

    // ------------------------------------------------------------------
    'unified-process-model': {
      difficulty: 'hard',
      intro:
        'Created by the architects of UML (Booch, Rumbaugh, and Jacobson), the Unified Process bridges traditional prescriptive structure with modern, iterative, object-oriented software engineering.',
      definition:
        'The **Unified Process (UP)** is an iterative and incremental software process framework that is **use-case driven**, **architecture-centric**, and focused on managing system risks. It integrates closely with the Unified Modeling Language (UML) to develop object-oriented systems.',
      simpleExplanation: {
        text: 'The Unified Process plans like an architect, focuses on user stories (use cases) to guide features, and works in short, iterative loops to produce stable, tested versions of the system at every step.',
        analogy:
          'Constructing a modern planned city: You establish the city charter and feasibility (Inception), build the foundational roads and utilities (Elaboration), construct buildings block by block (Construction), and move residents in while verifying public services (Transition).',
      },
      visual: {
        type: 'timeline',
        title: 'Phases of the Unified Process (UP)',
        events: [
          { label: 'Inception Phase', detail: 'Defines business scope, feasibility, and core use cases' },
          { label: 'Elaboration Phase', detail: 'Establishes baseline architecture, refines use cases, mitigates highest technical risks' },
          { label: 'Construction Phase', detail: 'Iterative coding of components, feature development, integration testing' },
          { label: 'Transition Phase', detail: 'System beta testing, user training, defect fixing, final deployment' },
        ],
      },
      explanation: [
        { heading: 'Three Core Tenets of the Unified Process' },
        {
          list: [
            '**Use-Case Driven** — Use cases define the functional interactions between actors (users/external systems) and the software, driving requirements, design, and testing.',
            '**Architecture-Centric** — High-level architecture is established early during Elaboration to ensure the system is scalable, modular, and maintainable.',
            '**Iterative and Incremental** — Development is partitioned into small, timeboxed iterations that produce executable software releases.',
          ],
        },
        { heading: 'The Four Unified Process Phases' },
        {
          table: {
            columns: ['Phase', 'Primary Objective', 'Key Deliverables produced'],
            rows: [
              [
                '1. Inception',
                'Establishes business justification, project scope, boundary conditions, and approximate cost/schedule estimates.',
                'Vision document, initial business case, rough use-case survey (~20% core cases).',
              ],
              [
                '2. Elaboration',
                'Deep-dives into requirements, mitigates highest architectural risks, and establishes the executable architectural baseline.',
                'UML analysis and design models, executable architectural baseline, refined project schedule and risk assessment.',
              ],
              [
                '3. Construction',
                'Focuses on component development, coding the remaining features, and integrating them into the system.',
                'Completed software release candidates, unit and integration test suites, user documentation drafts.',
              ],
              [
                '4. Transition',
                'Validates the system in operational user environments, runs beta tests, fixes residual bugs, and completes user training.',
                'Production-ready software increment, final user manuals, formal stakeholder acceptance sign-off.',
              ],
            ],
          },
        },
        { heading: 'Static vs Dynamic Perspectives (Workflows)' },
        {
          list: [
            'The Unified Process operates across two dimensions:',
            '**Dynamic Dimension (Phases)** — Inception, Elaboration, Construction, Transition.',
            '**Static Dimension (Core Workflows/Disciplines)** — Business Modeling, Requirements, Analysis & Design, Implementation, Test, and Deployment. Each workflow runs concurrently across the phases, varying in intensity (e.g., Requirements peaks in Inception/Elaboration; Implementation peaks in Construction).',
          ],
        },
      ],
      example: {
        title: 'Developing a Core Cloud Banking System using UP',
        input: 'A major financial institution rebuilds its online transaction processing platform.',
        output: `• Inception   : Define scope, verify legal banking compliance, establish ROI, model high-level transfer use cases.
• Elaboration : Build and test a secure, microservices-based architectural baseline to verify transaction throughput under load.
• Construction: Run 6 iterations implementing accounts, loans, security layers, and ledger modules.
• Transition  : Run beta tests with 5,000 internal employees; complete data migration and cut over to live production.`,
        explanation:
          'Demonstrates how the four phases manage architectural risk, validate throughput, and deliver stable increments.',
      },
      keyPoints: [
        'The Unified Process is use-case driven, architecture-centric, and iterative/incremental.',
        'Designed to work hand-in-hand with UML for object-oriented systems.',
        'Divided into four sequential phases: Inception, Elaboration, Construction, and Transition.',
        'Establishes an executable architectural baseline early in the Elaboration phase.',
        'Combines dynamic phase timelines with static engineering workflows.',
      ],
      importantTerms: [
        {
          term: 'Use Case',
          meaning: 'A sequence of actions performed by a system that yields an observable result of value to an actor.',
        },
        {
          term: 'Architectural Baseline',
          meaning: 'An early, working software foundation that validates the system architecture and resolves major technical risks.',
        },
        {
          term: 'Inception',
          meaning: 'The initial UP phase focused on scoping, feasibility, and business justification.',
        },
        {
          term: 'Transition',
          meaning: 'The final UP phase where the software is validated, tuned, and deployed into production.',
        },
      ],
      examPoints: [
        'State the three core characteristics of the Unified Process.',
        'List and describe the four phases of UP along with their primary deliverables.',
        'Explain how static engineering workflows interact with dynamic phases in UP.',
      ],
      questions: [
        {
          prompt: 'Explain the Unified Process Model in detail. Describe its phases, workflows, and core characteristics.',
          plan: ANSWER_PLAN(
            'Definition of UP (use-case driven, architecture-centric, iterative)',
            'Phases timeline diagram (Inception → Elaboration → Construction → Transition)',
            'Detailed explanation of the 4 phases and their key deliverables',
            'Cloud banking platform implementation example',
            'Explanation of how static workflows run across the dynamic phases',
          ),
        },
      ],
      keywords: ['Unified Process', 'UP', 'UML', 'Inception', 'Elaboration', 'Construction', 'Transition', 'use-case driven'],
      remember: [
        { prompt: 'What are the four phases of the Unified Process in order?', answer: 'Inception, Elaboration, Construction, Transition.' },
        { prompt: 'What does "use-case driven" mean in UP?', answer: 'User scenarios and goals guide requirements, architecture, and testing.' },
        { prompt: 'In which phase is the architectural baseline built?', answer: 'The Elaboration phase.' },
      ],
    },

    // ------------------------------------------------------------------
    'personal-and-team-software-process-models': {
      difficulty: 'hard',
      intro:
        'Software quality ultimately traces back to the habits of individual developers. The Personal Software Process introduces structured discipline, personal metrics, and self-measurement to individual software engineering work.',
      definition:
        'The **Personal Software Process (PSP)** is a structured, metric-driven framework developed by Watts Humphrey at the Software Engineering Institute (SEI). It helps individual software engineers measure and improve their personal work habits, estimation accuracy, code quality, and defect rates. The **Team Software Process (TSP)** is an operational framework developed by Watts Humphrey to help PSP-trained engineers build **self-directed teams**. It guides teams in planning their work, establishing shared quality goals, monitoring project progress, and delivering high-quality software on predictable schedules.',
      simpleExplanation: {
        text: 'PSP is like a professional fitness and nutrition tracker for a programmer. Instead of guessing how productive you are, you log every minute spent, every line of code written, and every bug created, analyzing the data to become a better, more accurate engineer.',
        analogy:
          'A professional athlete reviewing game footage and biometric data to fix a subtle throwing flaw, using personal metrics to systematically improve performance.',
      },
      visual: {
        type: 'flow',
        title: 'Personal Software Process (PSP) Individual Development Cycle',
        steps: [
          { label: 'Planning', note: 'Estimate program size (LOC), calculate planned time, create personal project plan' },
          { label: 'High-Level Design', note: 'Develop functional specifications, design component interfaces' },
          { label: 'Design Review', note: 'Self-inspect design against personal checklists to catch logic errors early' },
          { label: 'Development / Code', note: 'Implement code, log defects injected, conduct personal code review' },
          { label: 'Compile & Test', note: 'Compile, run unit tests, record defects found and fix times' },
          { label: 'Postmortem', note: 'Analyze metrics, calculate estimation error, update personal historical baseline' },
        ],
      },
      explanation: [
        { heading: 'Personal Software Process (PSP)' },
        { heading: 'The Core Philosophy of PSP (Watts Humphrey)' },
        {
          list: [
            'Individual engineers are directly responsible for the quality of the software products they build.',
            'High-quality software cannot be built by teams unless individual developers consistently write high-quality code.',
            'To improve performance, developers must track their personal work, collect objective metrics, and analyze their own errors.',
            'Finding and fixing bugs early during personal design and code reviews is far cheaper than catching them during system testing.',
          ],
        },
        { heading: 'The Five Core PSP Process Phases' },
        {
          table: {
            columns: ['Phase', 'Actions Taken by Individual Engineer', 'Metrics Recorded'],
            rows: [
              ['Planning', 'Estimates lines of code (LOC), calculates task duration, documents assumptions.', 'Estimated LOC, planned development time.'],
              ['High-Level Design', 'Creates component specifications, designs state machines, details interfaces.', 'Design time, design defect log entries.'],
              ['Design Review', 'Conducts rigorous personal self-review using personal defect checklists.', 'Defects found in review, review duration.'],
              ['Development (Code)', 'Translates design into source code; performs personal code inspection.', 'Coding time, defects injected, lines of code.'],
              ['Compile & Test', 'Compiles code, runs unit test suite, isolates and fixes test failures.', 'Compile defects, test defects, fix times.'],
              ['Postmortem', 'Compares planned vs actual time/size; calculates defect injection rates; updates historical database.', 'Size estimation error %, Defect Removal Efficiency (DRE).'],
            ],
          },
        },
        { heading: 'The Evolutionary PSP Maturity Levels' },
        {
          list: [
            '**PSP0 / PSP0.1** — Establishes a personal baseline: logs time, records defects, counts lines of code (LOC).',
            '**PSP1 / PSP1.1** — Personal planning: introduces size estimation using PROBE (Proxy-Based Estimation) and schedule planning.',
            '**PSP2 / PSP2.1** — Personal quality management: introduces personal design/code reviews, defect prevention checklists, and design templates.',
            '**PSP3** — Cyclic personal development: scales PSP practices to larger software modules through iterative personal development.',
          ],
        },
        { heading: 'Team Software Process (TSP)' },
        { note: 'Skilled individual engineers still need structured coordination to succeed as a team. The Team Software Process scales the personal discipline of PSP into self-directed engineering teams.' },
        'If PSP trains an individual musician to master their instrument, TSP is the orchestral conductor that brings those musicians together to perform a complete symphony in harmony.',
        { tip: 'A championship sports squad. Every athlete maintains personal conditioning and technique (PSP), but the team coordinates plays, assigns roles, and executes game plans together (TSP).' },
        { visual: {
        type: 'process',
        title: 'Team Software Process (TSP) Multi-Cycle Framework',
        steps: [
          { label: '1. TSP Launch', detail: 'Agree on team goals, allocate roles, establish quality targets, create baseline plan' },
          { label: '2. High-Level Strategy & Design', detail: 'Design system architecture, assign module ownership across members' },
          { label: '3. Detailed Implementation Cycle', detail: 'Individual developers build, review, and verify modules using personal PSP' },
          { label: '4. System Integration & Testing', detail: 'Integrate verified modules, run system tests, track remaining defects' },
          { label: '5. Team Postmortem', detail: 'Review team performance against goals, document lessons, update team benchmarks' },
        ],
      } },
        { heading: 'Core Objectives of TSP' },
        {
          list: [
            'Build and sustain **self-directed teams** that manage and track their own work.',
            'Demonstrate predictable project schedules and costs through objective team metrics.',
            'Establish team quality goals and maintain discipline to produce near-zero-defect software.',
            'Provide management visibility into project status using clean, empirical team data.',
          ],
        },
        { heading: 'The Concept of a Self-Directed Team' },
        {
          list: [
            'A self-directed team sets its own goals, develops its own schedules, and manages its own processes.',
            'Team members take ownership of commitments rather than having arbitrary deadlines imposed by managers.',
            'The team self-monitors progress, identifies risks early, and takes corrective actions collaboratively.',
          ],
        },
        { heading: 'Core Team Roles Defined in TSP' },
        {
          table: {
            columns: ['Assigned Role', 'Core Responsibilities within TSP Team'],
            rows: [
              ['Team Leader', 'Facilitates meetings, coordinates team actions, and reports progress to upper management.'],
              ['Development Manager', 'Leads system architectural design, module allocations, and coding tasks.'],
              ['Planning Manager', 'Manages project tracking, schedule milestones, and work breakdown structures.'],
              ['Quality Manager', 'Monitors quality goals, tracks defect metrics, and manages inspection reviews.'],
              ['Process Manager', 'Ensures the team follows proper process guidelines and maintains accurate team metrics.'],
              ['Support Manager', 'Manages configuration control (Git), tools, and test environments.'],
            ],
          },
        },
        { heading: 'The TSP Project Launch' },
        {
          list: [
            'Every TSP project or cycle begins with an intensive **TSP Launch** (typically 3–4 days).',
            '**Key Launch Steps** — (1) Review project business objectives; (2) Assign team roles; (3) Produce a shared development strategy; (4) Estimate effort and schedule; (5) Define team quality goals (e.g., target defects/KLOC); (6) Assess risks; (7) Present the team-owned plan to upper management for approval.',
          ],
        },
        { heading: 'Comparing PSP and TSP' },
        {
          table: {
            columns: ['Dimension', 'Personal Software Process (PSP)', 'Team Software Process (TSP)'],
            rows: [
              ['Primary Focus', 'Individual software engineer', 'Collaborative engineering team'],
              ['Key Objective', 'Improve individual estimation, code quality, and discipline', 'Build self-directed teams that deliver quality systems on time'],
              ['Prerequisites', 'Basic programming skills', 'Team members should ideally be trained in PSP'],
              ['Measurement Scope', 'Personal time, individual defects, and personal LOC', 'Team velocity, system defect rates, and project milestones'],
              ['Key Milestones', 'Personal Postmortem review', 'Team Launch and periodic team postmortems'],
            ],
          },
        },
        { label: 'Example: Building a Telemedicine Application using TSP', more: [
          'A team of six PSP-trained developers builds a video consultation and medical record platform.',
          { code: `• Launch      : Team assigns roles (Alice = Quality Manager, Bob = Planning Manager).
• Goal        : Target under 0.5 defects per KLOC in system testing.
• Execution   : Each developer applies PSP to their assigned modules (video streaming, billing, patient records).
• Integration : Clean modules integrate smoothly with zero critical crashes because personal reviews caught bugs early.
• Postmortem  : Team delivered within 3 days of original estimate; quality target met (0.32 defects/KLOC).`, lang: 'text' },
          'Demonstrates how shared role ownership, quality goals, and individual PSP discipline lead to on-time, high-quality delivery.',
        ] },
      ],
      example: {
        title: 'PSP Log for an Authentication Token Module',
        input: 'A developer estimates, builds, and reviews a 250-line JWT hashing component.',
        output: `• Planning   : Estimated Size = 200 LOC, Estimated Time = 3.5 hrs.
• Reviews    : Design Review catches 3 missing edge cases; Code Review catches 2 pointer bugs.
• Compile    : 0 compiler errors (clean first compile).
• Testing    : 1 unit test fails due to timezone parsing; fixed in 12 mins.
• Postmortem : Actual Size = 235 LOC, Actual Time = 3.8 hrs.
  Insight    : Personal reviews removed 5 out of 6 defects prior to compilation.`,
        explanation:
          'Illustrates how self-review and metric logging improve personal defect removal efficiency.',
      },
      keyPoints: [
        'PSP focuses on individual discipline, metric tracking, and personal quality improvement.',
        'Created by Watts Humphrey at the Software Engineering Institute (SEI).',
        'Emphasizes personal design and code reviews to catch bugs before compiling and testing.',
        'Every PSP task ends with a Postmortem phase to evaluate estimates against actual metrics.',
        'Structured across maturity levels from personal baselines (PSP0) to cyclic development (PSP3).',
        'TSP scales the individual discipline of PSP into high-performing, self-directed teams.',
        'Empowers teams to own their plans, schedules, and quality goals.',
        'Assigns clear roles: Team Leader, Planning, Quality, Process, Support, and Development Managers.',
        'Begins with a multi-day TSP Launch to establish shared commitments and plans.',
        'TSP relies on team members practicing PSP discipline in their day-to-day work.',
      ],
      importantTerms: [
        {
          term: 'Postmortem Phase',
          meaning: 'The final phase of PSP where actual time, size, and defects are analyzed against plans.',
        },
        {
          term: 'Defect Logging',
          meaning: 'Recording every error made, including phase injected, phase removed, and time taken to fix.',
        },
        {
          term: 'PROBE',
          meaning: 'Proxy-Based Estimation: a formulaic method in PSP used to estimate software size and development time.',
        },
        {
          term: 'Personal Defect Checklist',
          meaning: 'A customized personal checklist of common mistakes used during design and code reviews.',
        },
        {
          term: 'Self-directed Team',
          meaning: 'A team that plans, tracks, and manages its own work, taking collective ownership of goals.',
        },
        {
          term: 'TSP Launch',
          meaning: 'A structured, multi-day meeting where teams establish roles, plans, goals, and risk mitigations.',
        },
        {
          term: 'Quality Manager',
          meaning: 'The team member responsible for tracking defects and ensuring the team hits its quality targets.',
        },
      ],
      examPoints: [
        'Define Personal Software Process (PSP) and state its primary goals.',
        'List and describe the framework activities of the PSP lifecycle.',
        'Explain the role of the Postmortem phase in improving individual developer performance.',
        'Outline the progressive maturity levels of PSP (PSP0 through PSP3).',
        'Define Team Software Process (TSP) and state its core objectives.',
        'List and describe the specialized roles within a TSP team.',
        'Describe the steps in a TSP Launch meeting.',
        'Compare and contrast PSP and TSP in a neat comparative table.',
      ],
      questions: [
        {
          prompt: 'What is the Personal Software Process (PSP)? Explain its framework activities, objectives, and maturity levels.',
          plan: ANSWER_PLAN(
            'Definition of PSP and Humphrey’s philosophy of individual responsibility',
            'Flowchart of the PSP lifecycle (Planning → Design → Reviews → Code → Test → Postmortem)',
            'Detailed explanation of all activities, highlighting the Postmortem review',
            'JWT hashing module development metrics example',
            'Summary of the four progressive PSP maturity levels (PSP0 to PSP3)',
          ),
        },
        {
          prompt: 'Explain the Team Software Process (TSP). How does it build self-directed teams, and how does it relate to PSP?',
          plan: ANSWER_PLAN(
            'Definition of TSP and concept of self-directed teams',
            'Flowchart of the TSP lifecycle (Launch → Strategy → Implementation → Integration → Postmortem)',
            'Breakdown of team roles and key activities in a TSP Launch',
            'Telemedicine project application example',
            'Comprehensive comparison table between PSP and TSP',
          ),
        },
      ],
      keywords: [
        'Personal Software Process',
        'PSP',
        'Watts Humphrey',
        'Postmortem',
        'defect log',
        'SEI',
        'Team Software Process',
        'TSP',
        'self-directed team',
        'TSP Launch',
        'team roles',
      ],
      remember: [
        { prompt: 'Who developed the Personal Software Process?', answer: 'Watts Humphrey at the Software Engineering Institute (SEI).' },
        { prompt: 'What happens during the Postmortem phase in PSP?', answer: 'The developer analyzes actual size, time, and defect data against estimates.' },
        { prompt: 'Why are personal reviews emphasized in PSP?', answer: 'They catch defects early, which is much faster and cheaper than finding them during testing.' },
        { prompt: 'What is a self-directed team in TSP?', answer: 'A team that develops its own plans, manages its own work, and tracks its own quality.' },
        { prompt: 'What is the relationship between PSP and TSP?', answer: 'PSP trains the individual engineer; TSP coordinates PSP-trained engineers into a cohesive team.' },
        { prompt: 'What is the purpose of the TSP Launch?', answer: 'To assign roles, establish shared schedules and quality goals, and commit to a team-owned plan.' },
      ],
    },
  },
}