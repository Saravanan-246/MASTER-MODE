// src/data/software-engineering/unit3.js
// Software Engineering Practices — Unit III: Design.
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
    'Unit III focuses on Software Design—the engineering phase where user and functional requirements are transformed into a blueprint for construction. It covers fundamental design concepts (modularity, information hiding, cohesion, coupling), the four dimensions of the Design Model, high-level Architectural Design (styles, archetypes, component refinement, data-flow mapping), detailed Component-Level Design for class-based systems, and User Interface (UI) analysis and design workflows.',

  map: [
    {
      label: 'Design Fundamentals',
      topics: [
        'design-process',
        'design-concepts',
        'design-model',
      ],
    },
    {
      label: 'Architectural Design',
      topics: [
        'architectural-styles',
        'representing-the-system',
        'defining-archetypes',
        'refining-the-architecture-into-components',
        'describing-instantiations-of-the-system',
        'architectural-mapping-using-data-flow',
      ],
    },
    {
      label: 'Component-Level Design',
      topics: [
        'designing-class-based-components',
        'conducting-component-level-design',
      ],
    },
    {
      label: 'User Interface Design',
      topics: [
        'user-interface-analysis-and-design-steps',
      ],
    },
  ],

  topics: {
    // ------------------------------------------------------------------
    'design-process': {
      difficulty: 'easy',
      intro:
        'Software design is the pivotal technical phase where requirements are translated into a concrete blueprint. It defines how software components, data structures, and user interactions are organized before code is written.',
      definition:
        'The **Software Design Process** is an iterative engineering activity in which user requirements, business rules, and technical constraints established during analysis are systematically translated into an architectural, structural, and detailed blueprint for software construction.',
      simpleExplanation: {
        text: 'Requirements analysis tells us WHAT the system must do. The design process figures out HOW the software will do it—breaking the problem down into manageable subsystems, organizing databases, and establishing communication interfaces.',
        analogy:
          'An architect designing a skyscraper. You do not pour concrete based on a client saying "I want 40 floors"; the architect draws structural blueprints, electrical schematics, and elevator routes to verify stability before construction starts.',
      },
      visual: {
        type: 'flow',
        title: 'Iterative Progression of the Design Process',
        steps: [
          { label: 'Software Requirements', note: 'Analysis models, use cases, domain data' },
          { label: 'Architectural Design', note: 'Subsystem structure, styles, system boundaries' },
          { label: 'Interface Design', note: 'External APIs, user screens, component communication' },
          { label: 'Component-Level Design', note: 'Internal algorithms, data structures, class methods' },
          { label: 'Design Quality Review', note: 'Traceability checks, formal inspections, refinement' },
        ],
      },
      explanation: [
        { heading: 'Transition from Analysis to Design' },
        {
          list: [
            '**Requirements Model (What)** — Focuses on customer problem statements, use cases, domain entities, and operational constraints.',
            '**Design Model (How)** — Focuses on architectural styles, component collaborations, database schemas, and interface definitions.',
            '**Traceability** — Every design element must trace directly back to one or more user requirements to avoid unneeded complexity.',
          ],
        },
        { heading: 'Core Quality Guidelines for Software Design (McGlaughlin / Pressman)' },
        {
          list: [
            '**Architectural Integrity** — A design must exhibit recognizable architectural structure composed of well-defined components.',
            '**Modular Partitioning** — Software must be partitioned into logically independent modules to simplify maintenance.',
            '**Distinct Representations** — A design should contain distinct representations of data, architecture, interfaces, and components.',
            '**Appropriate Data Structures** — Data models should reflect the domain entities accurately and efficiently.',
            '**Predictable Behavior** — Components must exhibit functional independence, minimizing unpredictable side effects across modules.',
          ],
        },
        { heading: 'Iterative Refinement' },
        {
          list: [
            'Design is rarely completed in a single pass. Software engineers employ top-down decomposition and iterative refinement: first establishing broad architectural layouts, then designing inter-component protocols, and finally refining low-level algorithms.',
          ],
        },
      ],
      example: {
        title: 'Design Progression for an Online Banking Transfer Service',
        input: 'Requirement: "Allow authenticated customers to transfer funds instantly between accounts with real-time balance updates."',
        output: `1. Architecture Level : Layered architecture separating Web Presentation, Transaction Microservices, and Core Ledger DB.
2. Interface Level    : REST API POST /api/v1/transfers with payload validation (source, dest, amount).
3. Component Level    : TransferManager class invoking DebitService and CreditService wrapped inside a two-phase commit database transaction.
4. Refinement         : Add retry algorithms and distributed locks to prevent race conditions during concurrent transfers.`,
        explanation:
          'Shows the progression from a broad architectural style down to specific transaction-handling algorithms.',
      },
      keyPoints: [
        'The design process bridges requirements analysis and code implementation.',
        'Transforms "what" the system does into a detailed specification of "how" it will work.',
        'Operates through top-down decomposition and iterative refinement.',
        'Produces distinct views: Data/Class, Architectural, Interface, and Component designs.',
        'Quality designs exhibit modularity, low coupling, and clear traceability to requirements.',
      ],
      importantTerms: [
        {
          term: 'Iterative Refinement',
          meaning: 'The process of gradually elaborating high-level abstractions into detailed technical designs.',
        },
        {
          term: 'Traceability',
          meaning: 'The explicit link verifying that each design component fulfills an identified requirement.',
        },
        {
          term: 'Design Blueprint',
          meaning: 'The collection of models, interface definitions, and specifications guiding coding and testing.',
        },
      ],
      examPoints: [
        'Define the software design process and contrast it with requirements analysis.',
        'List the quality criteria of a good software design according to Pressman.',
        'Sketch the step-by-step transition from requirements to detailed design.',
      ],
      questions: [
        {
          prompt: 'What is the software design process? Explain how requirements are transformed into a design blueprint with a neat diagram.',
          plan: ANSWER_PLAN(
            'Definition of software design process and its role in SDLC',
            'Flow diagram from Requirements to Architecture, Interface, and Component Design',
            'Quality principles of software design (modularity, traceability, independence)',
            'Online banking transfer design progression example',
            'Explanation of top-down iterative refinement',
          ),
        },
      ],
      keywords: ['design process', 'requirements transformation', 'iterative refinement', 'traceability', 'blueprint'],
      remember: [
        { prompt: 'What does the design process translate?', answer: 'It translates requirements models into a technical blueprint for construction.' },
        { prompt: 'Is software design a linear single-pass activity?', answer: 'No, it is an iterative refinement process that elaborates abstractions into detail.' },
        { prompt: 'What is design traceability?', answer: 'Verifying that every design element directly satisfies an identified requirement.' },
      ],
    },

    // ------------------------------------------------------------------
    'design-concepts': {
      difficulty: 'medium',
      intro:
        'Design concepts form the foundational principles of software engineering. They guide developers in managing complexity, isolating changes, and producing maintainable code.',
      definition:
        '**Software Design Concepts** are fundamental principles and cognitive strategies—including **abstraction, modularity, information hiding, functional independence, cohesion, and coupling**—that provide the criteria for evaluating design quality.',
      simpleExplanation: {
        text: 'Without design concepts, software quickly turns into an unmaintainable tangle where changing one line of code breaks five unrelated features. Concepts like modularity and information hiding break large problems into clean, self-contained boxes with minimal dependencies.',
        analogy:
          'A modern stereo system vs. an old all-in-one radio unit. In a modern modular stereo, the speakers, amplifier, and turntable plug in via standard cables (low coupling). If a speaker blows, you replace it without throwing away the amplifier.',
      },
      visual: {
        type: 'comparison',
        title: 'Coupling vs Cohesion in Software Design',
        table: {
          columns: ['Dimension', 'Cohesion (Focus within a Module)', 'Coupling (Interdependence between Modules)'],
          rows: [
            ['Definition', 'How closely related and focused the internal tasks of a single module are.', 'The degree of direct interdependence between different modules.'],
            ['Engineering Goal', 'HIGH Cohesion (Single, well-defined responsibility).', 'LOW Coupling (Loose connections, minimal dependencies).'],
            ['Ideal Case', 'Functional Cohesion: Module executes one single mathematical or business task.', 'Data Coupling: Modules communicate strictly by passing simple data parameters.'],
            ['Worst Case', 'Coincidental Cohesion: Random functions grouped together arbitrarily.', 'Content Coupling: One module directly accesses or modifies internal data of another.'],
            ['Impact on Maintenance', 'High cohesion makes modules easy to understand, test, and debug.', 'Low coupling allows changing one module without breaking others.'],
          ],
        },
      },
      explanation: [
        { heading: 'Core Design Concepts (Pressman)' },
        {
          list: [
            '**Abstraction** — Hiding low-level implementation details while exposing essential functional behavior. Includes *procedural abstraction* (named sequences of actions) and *data abstraction* (named collections of data attributes).',
            '**Architecture** — The overall hierarchical and structural organization of software components and their communication protocols.',
            '**Design Patterns** — Proven, reusable solutions to recurring design problems within a given context (e.g., Singleton, Factory, Observer).',
            '**Separation of Concerns** — Dividing a complex problem into smaller, focused sections so each addresses a distinct responsibility (e.g., separating business logic from user interface).',
            '**Modularity** — Dividing software into separately named, addressable components that can be integrated to meet system requirements.',
            '**Information Hiding (Parnas Principle)** — Designing modules so internal algorithms and data structures are inaccessible to outside callers; modules interact strictly through stable public interfaces.',
            '**Functional Independence** — Achieved when modules have a focused scope of responsibility and clean interfaces. Measured via *Cohesion* and *Coupling*.',
            '**Refinement** — The progressive top-down elaboration of high-level abstract statements into low-level programming constructs.',
          ],
        },
        { heading: 'Understanding Cohesion Spectrum (Best to Worst)' },
        {
          list: [
            '**Functional Cohesion (Best)** — All elements contribute to a single, well-defined task (e.g., `calculateMonthlyInterest()`).',
            '**Sequential Cohesion** — The output of one element serves as the input to the next (e.g., parse transaction → format ledger entry).',
            '**Communicational Cohesion** — All operations access and update the same underlying data structure.',
            '**Procedural Cohesion** — Operations are grouped because they must execute in a specific order.',
            '**Temporal Cohesion** — Operations are grouped because they occur at the same time (e.g., system startup tasks).',
            '**Logical Cohesion** — Operations perform logically similar tasks based on an input flag (e.g., a generic `handleInput(type)` method).',
            '**Coincidental Cohesion (Worst)** — Completely unrelated tasks dumped into one file (e.g., `Utilities.java`).',
          ],
        },
        { heading: 'Understanding Coupling Spectrum (Best to Worst)' },
        {
          list: [
            '**Data Coupling (Best)** — Modules pass only simple, scalar data parameters (e.g., `calculateTax(amount, rate)`).',
            '**Stamp Coupling** — Modules pass composite data structures, even if only a fraction of the fields are needed.',
            '**Control Coupling** — One module passes a control flag to explicitly dictate the internal execution logic of another.',
            '**Common Coupling** — Multiple modules read and write to shared global variables.',
            '**Content Coupling (Worst)** — One module directly reaches into the internal memory or private variables of another.',
          ],
        },
      ],
      example: {
        title: 'Cohesion and Coupling in an E-Commerce Billing Engine',
        input: 'Designing order calculation, tax evaluation, and database persistence.',
        output: `High Cohesion + Low Coupling (Good Design):
• TaxCalculator module: Only evaluates tax formulas based on input amount (Functional Cohesion).
• OrderRepository module: Only handles database SQL persistence.
• Interaction: OrderManager passes total amount (Data Coupling) to TaxCalculator; modules share zero global variables.

Low Cohesion + High Coupling (Bad Design):
• MegaOrderUtility: Calculates taxes, renders HTML receipt, updates database, and modifies global order arrays (Coincidental Cohesion + Common Coupling).`,
        explanation:
          'High cohesion keeps modules focused on one responsibility, while low coupling prevents changes from cascading across the system.',
      },
      keyPoints: [
        'Design concepts manage complexity and make systems easier to maintain.',
        'Abstraction hides implementation details; Information Hiding protects internal design decisions.',
        'Functional independence requires HIGH cohesion and LOW coupling.',
        'Cohesion measures how focused a module is on a single task (Functional is best).',
        'Coupling measures inter-module dependencies (Data coupling is best; Content coupling is worst).',
      ],
      importantTerms: [
        {
          term: 'High Cohesion',
          meaning: 'A design quality where all elements within a module work toward a single, focused purpose.',
        },
        {
          term: 'Low Coupling',
          meaning: 'A design quality where modules have minimal, well-defined dependencies on each other.',
        },
        {
          term: 'Information Hiding',
          meaning: 'The principle that modules hide their internal implementation details behind stable public interfaces.',
        },
        {
          term: 'Separation of Concerns',
          meaning: 'Dividing software so each component addresses a distinct, independent responsibility.',
        },
      ],
      examPoints: [
        'Define and compare High Cohesion vs. Low Cohesion with examples.',
        'Define and compare Low Coupling vs. High Coupling with examples.',
        'List and define the eight core design concepts according to Pressman.',
        'Explain David Parnas’s principle of Information Hiding.',
      ],
      questions: [
        {
          prompt: 'Explain the fundamental software design concepts. Contrast high vs. low cohesion and tight vs. loose coupling with realistic examples.',
          plan: ANSWER_PLAN(
            'Definition of software design concepts and functional independence',
            'Comparison table for Cohesion vs Coupling across definitions, targets, best/worst levels',
            'Detailed evaluation of Abstraction, Modularity, Information Hiding, Separation of Concerns',
            'E-Commerce Billing Engine example contrasting good vs bad designs',
            'Cohesion and Coupling spectra rankings (Best to Worst)',
          ),
        },
      ],
      keywords: ['abstraction', 'modularity', 'information hiding', 'functional independence', 'cohesion', 'coupling', 'Parnas'],
      remember: [
        { prompt: 'What is the golden rule of functional independence?', answer: 'High Cohesion and Low Coupling.' },
        { prompt: 'What is the best type of cohesion?', answer: 'Functional Cohesion (the module performs a single, focused task).' },
        { prompt: 'What is the worst type of coupling?', answer: 'Content Coupling (one module directly accesses internal state of another).' },
      ],
    },

    // ------------------------------------------------------------------
    'design-model': {
      difficulty: 'medium',
      intro:
        'The Design Model translates the abstract entities of the Requirements Model into a multi-dimensional blueprint that guides coding, database creation, and system deployment.',
      definition:
        'The **Design Model** is an engineering representation of software composed of four interconnected design dimensions: **Data/Class Design**, **Architectural Design**, **Interface Design**, and **Component-Level Design**, bridging analysis specifications with implementation code.',
      simpleExplanation: {
        text: 'If the Requirements Model is a customer explaining what kind of house they want (rooms, windows, budget), the Design Model is the complete set of construction blueprints: the foundation plan (data design), the structural frame (architecture), the door and hallway placements (interface design), and the wiring diagrams (component design).',
        analogy:
          'Blueprints for a car: The body and frame layout is architectural design, the fuel and transmission linkages are interface design, the engine cylinder internals are component design, and the fuel tank capacity specs are data design.',
      },
      visual: {
        type: 'hierarchy',
        title: 'The Four Dimensions of the Design Model',
        root: 'Software Design Model',
        children: [
          {
            label: 'Data / Class Design',
            note: 'Maps analysis classes and ER diagrams into database schemas and data structures',
          },
          {
            label: 'Architectural Design',
            note: 'Defines relationships between major structural elements and architectural styles',
          },
          {
            label: 'Interface Design',
            note: 'Models user screens (UI), external APIs, and internal inter-component communication protocols',
          },
          {
            label: 'Component-Level Design',
            note: 'Transforms structural elements into detailed algorithms, operations, and class interfaces',
          },
        ],
      },
      explanation: [
        { heading: 'Requirements Model vs Design Model' },
        {
          table: {
            columns: ['Dimension', 'Requirements Model (Analysis)', 'Design Model (Design)'],
            rows: [
              ['Primary Question', '"What" does the user need the system to do?', '"How" will the software structure and execute that functionality?'],
              ['Key Artifacts', 'Use cases, activity diagrams, domain classes, DFDs', 'Database schemas, architectural styles, component algorithms, UI layouts'],
              ['Technical Details', 'Free from database choices, network protocols, UI toolkits', 'Specifies data formats, API endpoints, algorithms, frameworks'],
              ['Target Audience', 'End users, business analysts, project sponsors', 'Software developers, testers, system architects'],
            ],
          },
        },
        { heading: 'The Four Dimensions of the Design Model' },
        {
          list: [
            '**1. Data/Class Design** — Transforms domain class models and entity-relationship diagrams into concrete data structures, object classes, and relational database schemas.',
            '**2. Architectural Design** — Defines the broad system structure, identifies major subsystems, selects architectural patterns, and specifies communication styles.',
            '**3. Interface Design** — Establishes how the software communicates with human users (UI design), other external systems (APIs), and internal components (protocols and signatures).',
            '**4. Component-Level Design** — Transforms structural components into algorithmic procedures, data structures, and detailed class method implementations.',
          ],
        },
      ],
      example: {
        title: 'Design Model Dimensions for a Hospital Management System',
        input: 'Translating hospital appointment booking requirements into a Design Model.',
        output: `• Data/Class Design    : Relational schema for tables: Patients, Doctors, Appointments, MedicalRecords.
• Architectural Design : Layered Client-Server architecture connecting React Native clients, Spring Boot services, and PostgreSQL.
• Interface Design     : REST API endpoint (POST /api/appointments) + mobile appointment selection screen.
• Component-Level Design: AppointmentScheduler class implementing an algorithm that validates doctor availability and prevents double booking.`,
        explanation:
          'Demonstrates how requirements map into data, architecture, interfaces, and internal component algorithms.',
      },
      keyPoints: [
        'The Design Model translates the Requirements Model into an implementation blueprint.',
        'Organized into four dimensions: Data/Class, Architectural, Interface, and Component-Level design.',
        'Data design models data structures and databases.',
        'Architectural design models overall system structure and subsystem relationships.',
        'Interface design models UI screens, external APIs, and internal communication protocols.',
        'Component design models low-level algorithms and class operations.',
      ],
      importantTerms: [
        {
          term: 'Data Design',
          meaning: 'The dimension of the design model that defines data structures and database schemas.',
        },
        {
          term: 'Architectural Dimension',
          meaning: 'The design view establishing major subsystems, frameworks, and system-level communication paths.',
        },
        {
          term: 'Interface Dimension',
          meaning: 'The design view detailing human-computer interfaces, external network APIs, and inter-component protocols.',
        },
      ],
      examPoints: [
        'Draw the architectural pyramid showing the four dimensions of the Design Model.',
        'Compare the Requirements/Analysis Model with the Design Model across four criteria.',
        'Briefly explain the responsibilities of each of the four design dimensions.',
      ],
      questions: [
        {
          prompt: 'Describe the Software Design Model. Explain its four dimensions and contrast it with the Requirements Analysis Model.',
          plan: ANSWER_PLAN(
            'Definition of Design Model and its role as a construction blueprint',
            'Hierarchy diagram showing Data/Class, Architecture, Interface, Component design',
            'Detailed explanation of the 4 design model dimensions',
            'Hospital appointment booking system example',
            'Comparison table: Requirements Model (What) vs Design Model (How)',
          ),
        },
      ],
      keywords: ['design model', 'data design', 'architectural design', 'interface design', 'component design', 'dimensions'],
      remember: [
        { prompt: 'What are the four dimensions of the Design Model?', answer: 'Data/Class Design, Architectural Design, Interface Design, and Component-Level Design.' },
        { prompt: 'What does Data Design transform?', answer: 'It transforms analysis classes and ER models into data structures and database schemas.' },
        { prompt: 'What question does the Design Model answer?', answer: 'It answers "How" the software system will be constructed.' },
      ],
    },

    // ------------------------------------------------------------------
    'architectural-styles': {
      difficulty: 'hard',
      intro:
        'Software architecture is the structural foundation of a system. Architectural styles provide proven, reusable templates that dictate how components are organized and interact.',
      definition:
        'An **Architectural Style** is a pattern that defines a family of systems in terms of structural organization, a vocabulary of components and connectors, and a set of constraints on how they can be combined and interact.',
      simpleExplanation: {
        text: 'Architectural styles are like architectural blueprints for buildings: residential homes, skyscrapers, and sports arenas all follow different structural patterns. Choosing the right style for software ensures it can handle its expected scale, security, and performance demands.',
        analogy:
          'Urban transport networks: A hub-and-spoke rail system (data-centered/repository) brings all trains to a central grand station, whereas an assembly line conveyor (pipe-and-filter) moves products continuously through a sequence of stations.',
      },
      visual: {
        type: 'comparison',
        title: 'Major Software Architectural Styles Compared',
        table: {
          columns: ['Architectural Style', 'Structural Topology', 'Primary Advantages', 'Primary Limitations', 'Suitable Example'],
          rows: [
            ['Data-Centered (Repository)', 'Central data store surrounded by independent client software components', 'Data integrity managed centrally; easy to add new independent clients', 'Central repository is a single point of failure and performance bottleneck', 'Compiler symbol tables, enterprise ERP databases'],
            ['Data-Flow (Pipe-and-Filter)', 'Series of processing components (filters) connected by data streams (pipes)', 'High reusability; filters can run in parallel; easy to reorder pipeline', 'Interactive applications perform poorly; data conversion overhead between filters', 'UNIX command pipelines, video/audio rendering engines'],
            ['Call-and-Return (Layered)', 'Hierarchical tiers where Layer N requests services strictly from Layer N-1', 'Clean separation of concerns; changes in one layer do not cascade; high maintainability', 'Performance overhead from passing requests through multiple layers', 'OS kernels, enterprise web apps (UI → Service → DAO)'],
            ['Client-Server', 'Clients send requests to centralized server providing services', 'Centralized resource management; clients can be thin and lightweight', 'Server can become a performance bottleneck; network dependency', 'Web browsing, database systems, online banking portals'],
          ],
        },
      },
      explanation: [
        { heading: 'Why Architecture Matters (Pressman)' },
        {
          list: [
            'Enables stakeholder communication across high-level system structures.',
            'Captures early design decisions that dictate technical trade-offs (e.g., performance vs. maintainability).',
            'Defines a reusable, transferable abstraction across similar product domains.',
          ],
        },
        { heading: 'Detailed Breakdown of Major Styles' },
        {
          list: [
            '**1. Data-Centered Architecture (Repository)** — A central data repository holds system state while client software components read and modify data. In passive repositories, clients poll the data store; in active blackboards, the repository notifies clients when state changes.',
            '**2. Data-Flow Architecture (Pipe-and-Filter)** — Data enters an input stream and flows through a series of filters that transform it without needing to know what other filters exist. Pipes transfer data between filters.',
            '**3. Layered Architecture** — Arranged in hierarchical layers. The outer layer handles user interactions, intermediate layers process application rules, and inner layers handle hardware or database access. Each layer exposes an API to the layer directly above it.',
            '**4. Client-Server Architecture** — Workloads are partitioned between service requesters (clients) and service providers (servers), communicating across a local or wide-area network.',
          ],
        },
      ],
      example: {
        title: 'Pipe-and-Filter in an Image Processing Pipeline',
        input: 'A batch image-processing system receives raw photos from security cameras.',
        output: `Filter 1 (De-noise)   : Reads raw image byte stream → removes sensor noise → outputs stream to Pipe A.
Filter 2 (Detect Face): Reads from Pipe A → identifies human facial bounds → outputs to Pipe B.
Filter 3 (Blur Face)  : Reads from Pipe B → applies privacy blur to face coordinates → outputs to Pipe C.
Sink                  : Saves final processed image stream to storage disk.`,
        explanation:
          'Each filter executes independently, allowing the pipeline to be reordered or parallelized without rewriting component logic.',
      },
      keyPoints: [
        'An architectural style defines a structural pattern for components, connectors, and interaction constraints.',
        'Data-Centered architectures organize clients around a shared repository.',
        'Data-Flow (Pipe-and-Filter) processes data streams through independent processing filters.',
        'Layered architectures restrict communication to adjacent layers to isolate changes.',
        'Client-Server architectures partition work between service requesters and service providers.',
      ],
      importantTerms: [
        {
          term: 'Pipe-and-Filter',
          meaning: 'An architectural style where data flows through a pipeline of independent processing filters connected by data pipes.',
        },
        {
          term: 'Layered Architecture',
          meaning: 'A hierarchical style where each layer provides services to the layer above and consumes services from the layer below.',
        },
        {
          term: 'Repository Architecture',
          meaning: 'A style where independent client components share data through a centralized data store.',
        },
      ],
      examPoints: [
        'Define architectural style and explain its core elements (components, connectors, constraints).',
        'Draw and explain the Layered Architecture style with an example.',
        'Draw and explain the Pipe-and-Filter style with an example.',
        'Compare Data-Centered and Layered architectural styles in a table.',
      ],
      questions: [
        {
          prompt: 'What is an architectural style? Explain Layered, Data-Centered, and Pipe-and-Filter architectural styles with neat sketches.',
          plan: ANSWER_PLAN(
            'Definition of architectural style and its significance in software architecture',
            'Block diagrams for Layered, Data-Centered, and Pipe-and-Filter styles',
            'Detailed explanation of each style: structure, operation, pros, and cons',
            'Image processing pipeline example (Pipe-and-Filter)',
            'Comprehensive comparison table covering topology, benefits, and use cases',
          ),
        },
      ],
      keywords: ['architectural styles', 'layered', 'pipe-and-filter', 'data-centered', 'client-server', 'repository', 'filters'],
      remember: [
        { prompt: 'What are the two core elements of a pipe-and-filter architecture?', answer: 'Filters (processing units) and Pipes (data communication channels).' },
        { prompt: 'What is a major advantage of layered architecture?', answer: 'Maintainability and isolation of change; modifications in one layer rarely break others.' },
        { prompt: 'What is a drawback of repository architecture?', answer: 'The central data store can become a performance bottleneck and single point of failure.' },
      ],
    },

    // ------------------------------------------------------------------
    'representing-the-system': {
      difficulty: 'medium',
      intro:
        'Software cannot be touched or physically viewed. Representing the system architecturally provides an abstract visual map showing how subsystems connect, communicate, and collaborate.',
      definition:
        '**Representing the System** is the architectural practice of creating high-level visual and structural models that partition a complex software application into subsystems, components, and communication connectors to communicate system structure to stakeholders.',
      simpleExplanation: {
        text: 'Before writing code, architects create a bird’s-eye view map of the system. This map shows the major subsystems, how data moves between them, and where external third-party services connect.',
        analogy:
          'A city transit map: It does not show every individual traffic light or crack in the pavement; it shows major train lines, transfer stations, and connections to the airport.',
      },
      visual: {
        type: 'architecture',
        title: 'Architectural System Representation Decomposition',
        layers: [
          { label: 'Presentation Subsystem', items: ['Web Portal UI', 'Mobile Application', 'Admin Console'] },
          { label: 'Business Logic Subsystem', items: ['Authentication Service', 'Payment Processing Engine', 'Inventory Controller'] },
          { label: 'Integration Connector Subsystem', items: ['Message Queue (Kafka)', 'Payment Gateway Adapter', 'SMS/Email Gateway'] },
          { label: 'Data Subsystem', items: ['Relational Ledger DB', 'Redis Cache Cluster', 'Cloud Document Storage'] },
        ],
      },
      explanation: [
        { heading: 'Core Elements of Architectural Representation' },
        {
          list: [
            '**System** — The overall software product delivering business capabilities.',
            '**Subsystems** — Major self-contained functional divisions responsible for specific business capabilities (e.g., Billing Subsystem).',
            '**Components** — Modular computational units inside subsystems that encapsulate processing and state.',
            '**Connectors / Interfaces** — The communication pathways, message protocols, or network buses linking components together.',
          ],
        },
        { heading: 'Why High-Level Representation Matters' },
        {
          list: [
            '**Managing Cognitive Load** — Developers can understand the overall system structure without drowning in low-level code.',
            '**Early Risk Assessment** — Identifies communication bottlenecks, security boundaries, and single points of failure early.',
            '**Team Organization** — Subsystems provide clear boundaries for assigning work across development teams.',
          ],
        },
      ],
      example: {
        title: 'Architectural Representation of an Online Food Delivery App',
        input: 'Decomposing a food delivery platform into an architectural diagram.',
        output: `Subsystems & Connectors:
• Customer App Subsystem ↔ REST HTTPS ↔ API Gateway.
• Restaurant Manager Subsystem ↔ WebSockets ↔ Order Dispatcher.
• Driver Tracking Subsystem ↔ MQTT Broker ↔ Real-time Location Engine.
• Core Payment Subsystem ↔ TLS RPC ↔ External Banking Network.`,
        explanation:
          'Shows how major subsystems communicate across specific protocols without exposing internal source code.',
      },
      keyPoints: [
        'Architectural representation provides a clear, high-level structural map of the system.',
        'Decomposes software into Systems, Subsystems, Components, and Connectors.',
        'Connectors model the communication pathways linking components.',
        'Helps manage complexity and provides clear boundaries for team work assignments.',
        'Identifies security and performance risks before code is implemented.',
      ],
      importantTerms: [
        {
          term: 'Subsystem',
          meaning: 'A major, self-contained functional division of a software system.',
        },
        {
          term: 'Connector',
          meaning: 'An architectural mechanism (such as an API, pipe, or message queue) that links components.',
        },
        {
          term: 'System Boundary',
          meaning: 'The line separating internal system components from external networks and services.',
        },
      ],
      examPoints: [
        'Explain how a software system is represented architecturally.',
        'Define components, connectors, and subsystems with examples.',
        'Draw a block diagram representing the architecture of an enterprise web application.',
      ],
      questions: [
        {
          prompt: 'How is a software system represented during architectural design? Explain the roles of subsystems, components, and connectors.',
          plan: ANSWER_PLAN(
            'Definition and purpose of architectural system representation',
            'Multi-layer architectural diagram (Presentation, Logic, Connectors, Data)',
            'Detailed explanation of Subsystems, Components, and Connectors',
            'Food delivery platform architectural breakdown example',
            'Benefits of high-level architectural representation for development teams',
          ),
        },
      ],
      keywords: ['system representation', 'subsystems', 'components', 'connectors', 'interfaces', 'boundaries'],
      remember: [
        { prompt: 'What are the three primary building blocks of an architectural model?', answer: 'Subsystems, Components, and Connectors.' },
        { prompt: 'What is an architectural connector?', answer: 'A pathway or protocol (like an API, message queue, or RPC) that enables components to communicate.' },
        { prompt: 'Why is architectural representation created before coding?', answer: 'To clarify system boundaries, manage complexity, and organize team work assignments.' },
      ],
    },

    // ------------------------------------------------------------------
    'defining-archetypes': {
      difficulty: 'medium',
      intro:
        'Architects use archetypes to capture essential domain concepts before committing to specific code implementations. Archetypes provide the conceptual building blocks of the architecture.',
      definition:
        'An **Archetype** is an abstract representation of an essential, recurring concept, entity, or behavioral role within the target problem domain that must be realized by the software architecture.',
      simpleExplanation: {
        text: 'An archetype is a broad conceptual role in a system. In any e-commerce application, there is always the idea of a "Buyer", a "Product", an "Order", and a "Payment". We define these roles conceptually before deciding whether they become microservices, database tables, or individual classes.',
        analogy:
          'Stock character archetypes in theater: The Hero, the Mentor, the Villain. Different plays interpret these roles differently, but the underlying narrative roles remain the same.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Architectural Archetypes for an E-Commerce Domain',
        root: 'E-Commerce System Archetypes',
        children: [
          {
            label: 'User / Identity Archetype',
            note: 'Represents entities that authenticate, view data, and perform transactions',
          },
          {
            label: 'Catalog / Item Archetype',
            note: 'Represents products, descriptions, prices, and stock availability',
          },
          {
            label: 'Transaction / Order Archetype',
            note: 'Captures purchase agreements, line items, and fulfillment state',
          },
          {
            label: 'Financial / Payment Archetype',
            note: 'Handles monetary exchange, transaction settlements, and refunds',
          },
          {
            label: 'Notifier / Communication Archetype',
            note: 'Manages messaging, push alerts, and receipt delivery',
          },
        ],
      },
      explanation: [
        { heading: 'Concept and Role of Archetypes (Pressman)' },
        {
          list: [
            '**Domain Abstractions** — Archetypes capture the core concepts of the application domain.',
            '**Not Final Classes** — An archetype is a conceptual responsibility, not a single code class or database table. One archetype might later be implemented by multiple classes, or multiple archetypes might be handled by one service.',
            '**Common Ground** — Provides a shared vocabulary for architects, developers, and business stakeholders.',
          ],
        },
        { heading: 'Archetype-to-Architecture Mapping' },
        {
          list: [
            'During architectural modeling, archetypes are identified from analysis models and then mapped into concrete system components and subsystems.',
            'For example, the *Payment Archetype* maps into a `PaymentGatewayComponent`, a `LedgerRepository`, and third-party bank connectors.',
          ],
        },
      ],
      example: {
        title: 'Defining Archetypes in a Hospital Management System',
        input: 'Identifying the core architectural archetypes of a hospital portal.',
        output: `1. Patient Archetype     : Represents care recipients, medical history, and insurance profiles.
2. Clinician Archetype   : Represents physicians, surgeons, and nurses delivering care.
3. Encounter Archetype   : Represents clinical visits, admissions, and diagnostic consultations.
4. Treatment Archetype   : Represents medication, surgery, and therapy orders.
5. Resource Archetype    : Represents ICU beds, operating theaters, and diagnostic scanners.`,
        explanation:
          'These five conceptual archetypes guide the design of components, databases, and services across the hospital application.',
      },
      keyPoints: [
        'An archetype represents a recurring conceptual role or entity in the problem domain.',
        'Archetypes capture essential domain responsibilities before writing code.',
        'They are abstract concepts, not final code classes or database tables.',
        'Archetypes provide a shared vocabulary between architects and stakeholders.',
        'Mapped into concrete software components during architectural refinement.',
      ],
      importantTerms: [
        {
          term: 'Archetype',
          meaning: 'An abstract, core domain role or conceptual entity that the software architecture must support.',
        },
        {
          term: 'Domain Concept',
          meaning: 'A recurring business entity or workflow fundamental to the application problem space.',
        },
      ],
      examPoints: [
        'Define architectural archetypes according to Roger Pressman.',
        'Explain why an archetype is not the same as a source-code class.',
        'Identify and describe the archetypes for an e-commerce or hospital system.',
      ],
      questions: [
        {
          prompt: 'What are architectural archetypes? Explain how defining archetypes helps in architectural design, using a suitable example.',
          plan: ANSWER_PLAN(
            'Definition of architectural archetype and its role in domain modeling',
            'Hierarchy diagram showing domain archetypes',
            'Explanation of how archetypes map to concrete components',
            'Hospital management or e-commerce system example',
            'Distinction between abstract archetypes and final code classes',
          ),
        },
      ],
      keywords: ['archetypes', 'domain concepts', 'abstractions', 'responsibilities', 'conceptual model'],
      remember: [
        { prompt: 'What is an architectural archetype?', answer: 'An abstract domain concept or role that the system architecture must support.' },
        { prompt: 'Is an archetype the same as a Java class?', answer: 'No, it is a conceptual domain responsibility that may span multiple classes or services.' },
        { prompt: 'Why do we identify archetypes?', answer: 'To establish core domain responsibilities and vocabulary before detailed implementation.' },
      ],
    },

    // ------------------------------------------------------------------
    'refining-the-architecture-into-components': {
      difficulty: 'hard',
      intro:
        'Once subsystems and archetypes are identified, architects refine the high-level architecture into modular components with defined responsibilities and interfaces.',
      definition:
        '**Refining the Architecture into Components** is the top-down decomposition process where broad subsystems and domain archetypes are broken down into cohesive, self-contained software components with specified interfaces, dependencies, and responsibilities.',
      simpleExplanation: {
        text: 'This is where we zoom in on the architectural map. Instead of leaving a large box labeled "Order Subsystem", we break it down into smaller, focused components: an Order Validator, a Tax Calculator, an Inventory Checker, and an Invoice Generator.',
        analogy:
          'Designing an automobile engine: You start with the high-level engine block, then decompose it into the fuel injection system, cooling circuit, and exhaust manifold, specifying how each connects to the others.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Component Decomposition of an Order Management Subsystem',
        root: 'Order Management Subsystem',
        children: [
          {
            label: 'Order Validation Component',
            note: 'Verifies customer credentials, items, and address formatting',
          },
          {
            label: 'Pricing & Discount Component',
            note: 'Calculates promotions, voucher codes, and regional sales tax',
          },
          {
            label: 'Inventory Allocation Component',
            note: 'Checks warehouse stock and reserves items',
          },
          {
            label: 'Order Persistence Component',
            note: 'Writes order records and updates the database',
          },
        ],
      },
      explanation: [
        { heading: 'Key Steps in Component Refinement' },
        {
          list: [
            '**1. Subsystem Decomposition** — Break down high-level subsystems into smaller, focused computational units.',
            '**2. Responsibility Allocation** — Assign single, well-defined business or technical responsibilities to each component (Single Responsibility Principle).',
            '**3. Interface Specification** — Define explicit input and output contracts (e.g., method signatures, REST APIs) for component communication.',
            '**4. Dependency Mapping** — Identify dependencies between components to minimize coupling and prevent circular references.',
            '**5. Verification against Quality Attributes** — Verify that the refined components meet performance, security, and testability requirements.',
          ],
        },
        { heading: 'Design Considerations during Refinement' },
        {
          list: [
            '**High Cohesion** — Ensure each component focuses on one specific responsibility.',
            '**Loose Coupling** — Ensure components interact through abstract interfaces rather than internal implementation details.',
            '**Clear Component Boundaries** — Prevent functional overlap where multiple components try to manage the same business data.',
          ],
        },
      ],
      example: {
        title: 'Component Refinement for a Video Streaming Platform',
        input: 'Decomposing a "Media Playback Subsystem" into concrete components.',
        output: `1. StreamLoaderComponent      : Fetches video chunks from CDN via HTTP Range requests.
2. DecryptionComponent        : Decrypts DRM-protected content using cryptographic keys.
3. VideoDecoderComponent       : Decodes H.264/AV1 byte streams into raw video frames.
4. BufferManagerComponent      : Manages memory buffers to ensure smooth playback during network lag.
5. TelemetryComponent          : Logs bitrate changes and playback metrics for analytics.`,
        explanation:
          'Breaks a broad playback subsystem into five distinct components with clear responsibilities and interfaces.',
      },
      keyPoints: [
        'Component refinement decomposes broad subsystems into modular components.',
        'Each component is assigned a single, focused responsibility.',
        'Interfaces define explicit communication contracts between components.',
        'Refinement aims for high internal cohesion and loose coupling between components.',
        'Prevents circular dependencies and architectural degradation.',
      ],
      importantTerms: [
        {
          term: 'Component Decomposition',
          meaning: 'The process of breaking a subsystem down into smaller, manageable software components.',
        },
        {
          term: 'Interface Contract',
          meaning: 'The explicit set of operations, inputs, and outputs a component exposes to external callers.',
        },
        {
          term: 'Circular Dependency',
          meaning: 'An architectural flaw where Component A depends on B, and Component B depends back on A.',
        },
      ],
      examPoints: [
        'Explain the process of refining an architecture into components.',
        'Describe the criteria for assigning responsibilities to software components.',
        'Draw a component refinement hierarchy for an e-commerce or streaming system.',
      ],
      questions: [
        {
          prompt: 'Describe how a software architecture is refined into components. What principles guide this decomposition?',
          plan: ANSWER_PLAN(
            'Definition of component refinement and top-down decomposition',
            'Decomposition hierarchy diagram of a subsystem into components',
            'Step-by-step breakdown: responsibilities, interface contracts, dependency mapping',
            'Video streaming platform component decomposition example',
            'Core design criteria: High cohesion, loose coupling, avoiding circular dependencies',
          ),
        },
      ],
      keywords: ['component refinement', 'decomposition', 'interfaces', 'responsibilities', 'coupling', 'cohesion'],
      remember: [
        { prompt: 'What is the goal of component refinement?', answer: 'To break high-level subsystems into modular, cohesive components with clear interfaces.' },
        { prompt: 'Why are explicit interface contracts needed?', answer: 'They define how components communicate, allowing internal code to change without breaking callers.' },
        { prompt: 'What is a circular dependency?', answer: 'An architectural flaw where two or more components depend on each other, creating tight coupling.' },
      ],
    },

    // ------------------------------------------------------------------
    'describing-instantiations-of-the-system': {
      difficulty: 'medium',
      intro:
        'An architectural style is an abstract template. Describing system instantiations demonstrates how that abstract design is mapped into concrete technologies and deployment environments.',
      definition:
        'An **Architectural Instantiation** is the concrete realization of an abstract architectural design, mapping logical components and connectors to specific hardware nodes, operating systems, frameworks, and network topologies.',
      simpleExplanation: {
        text: 'An abstract architecture says: "We will use a 3-tier client-server model with a presentation tier, application tier, and database tier." The instantiation says: "The presentation tier is a React app on AWS S3, the application tier is Spring Boot on Docker, and the database tier is PostgreSQL on Amazon RDS."',
        analogy:
          'An abstract recipe vs. an actual cooked meal: The recipe calls for "vegetables, starch, and protein." The instantiation is "carrots, jasmine rice, and grilled chicken" cooked for dinner.',
      },
      visual: {
        type: 'architecture',
        title: 'Abstract 3-Tier Architecture vs Concrete System Instantiation',
        layers: [
          { label: 'Abstract Client Tier → Concrete UI', items: ['React.js Single Page App (Browser)', 'Flutter Mobile Application (iOS/Android)'] },
          { label: 'Abstract Connectors → Network Protocols', items: ['HTTPS REST API over Cloudflare CDN', 'Secure WebSockets (WSS)'] },
          { label: 'Abstract Application Tier → Servers', items: ['Node.js Express / Spring Boot API', 'Docker Containers running on Kubernetes'] },
          { label: 'Abstract Data Tier → Concrete Storage', items: ['PostgreSQL Relational DB', 'Redis In-Memory Cache Cluster'] },
        ],
      },
      explanation: [
        { heading: 'Abstract Architecture vs Instantiated Architecture' },
        {
          table: {
            columns: ['Dimension', 'Abstract Architectural Design', 'System Instantiation'],
            rows: [
              ['Nature', 'Conceptual, technology-neutral blueprint', 'Concrete, technology-specific deployment layout'],
              ['Components', 'Logical entities (e.g., "Authentication Provider")', 'Actual software packages (e.g., "Keycloak on Docker container")'],
              ['Connectors', 'Abstract protocols (e.g., "Message Bus")', 'Specific tools (e.g., "Apache Kafka cluster on port 9092")'],
              ['Purpose', 'Evaluates design feasibility and system structure', 'Guides physical deployment, configuration, and monitoring'],
            ],
          },
        },
        { heading: 'Steps in System Instantiation' },
        {
          list: [
            '**1. Select Technology Stacks** — Choose specific programming languages, libraries, and runtime frameworks for each component.',
            '**2. Map to Deployment Topology** — Determine how components map onto virtual servers, containers, and network segments.',
            '**3. Configure Network Connectors** — Specify IP addresses, ports, SSL encryption, and API gateways.',
            '**4. Verify Non-Functional Constraints** — Validate that the chosen hardware and deployment layout meet latency, scaling, and redundancy targets.',
          ],
        },
      ],
      example: {
        title: 'Instantiating a University Results WebApp',
        input: 'Instantiating an abstract Layered Web Architecture into a concrete system.',
        output: `• Logical Presentation Tier  → Instantiated as: React 18 SPA hosted on AWS CloudFront CDN.
• Logical Application Tier   → Instantiated as: Java Spring Boot microservice running on AWS ECS Docker.
• Logical Data Tier          → Instantiated as: Amazon RDS PostgreSQL (Primary + Read Replica).
• Logical Connectors         → Instantiated as: HTTPS JSON REST APIs secured with JWT tokens.`,
        explanation:
          'Shows how abstract architectural layers map to specific commercial technologies and hosting environments.',
      },
      keyPoints: [
        'System instantiation translates an abstract architecture into a concrete, deployed system.',
        'Maps logical components to specific programming languages, libraries, and frameworks.',
        'Maps abstract connectors to specific network protocols, ports, and messaging tools.',
        'Validates that the selected infrastructure meets non-functional performance and security goals.',
        'Distinguishes between a reusable architectural pattern and a specific deployment instance.',
      ],
      importantTerms: [
        {
          term: 'System Instantiation',
          meaning: 'The concrete implementation of an abstract architectural design using specific technologies and hardware.',
        },
        {
          term: 'Deployment Topology',
          meaning: 'The physical or cloud layout showing how software components are distributed across network nodes.',
        },
      ],
      examPoints: [
        'Define system instantiation and contrast it with abstract software architecture.',
        'Explain how logical components and connectors are instantiated into physical equivalents.',
        'Provide a complete instantiation example for an enterprise web application.',
      ],
      questions: [
        {
          prompt: 'What is meant by describing instantiations of a system? Illustrate how an abstract architecture maps to a concrete implementation.',
          plan: ANSWER_PLAN(
            'Definition of system instantiation vs abstract architecture',
            'Architecture diagram showing abstract tiers mapped to concrete technologies',
            'Step-by-step breakdown: selecting stacks, deployment topology, configuring connectors',
            'University results web portal instantiation example',
            'Comparison table: Abstract Architecture vs System Instantiation',
          ),
        },
      ],
      keywords: ['instantiation', 'abstract architecture', 'deployment topology', 'concrete components', 'infrastructure'],
      remember: [
        { prompt: 'What is an architectural instantiation?', answer: 'The concrete mapping of an abstract architectural blueprint into specific software and hardware technologies.' },
        { prompt: 'How does an abstract component differ from an instantiated one?', answer: 'An abstract component is conceptual (e.g., "Ledger Store"); an instantiated one is concrete (e.g., "PostgreSQL on AWS RDS").' },
        { prompt: 'Why separate abstract architecture from instantiation?', answer: 'It allows the same architectural pattern to be deployed across different technology stacks.' },
      ],
    },

    // ------------------------------------------------------------------
    'architectural-mapping-using-data-flow': {
      difficulty: 'hard',
      intro:
        'Transforming data flow diagrams (DFDs) into software architecture is a classic engineering technique. Structured design uses transform and transaction mapping to turn data flows into modular system structures.',
      definition:
        '**Architectural Mapping using Data Flow** (Structured Design) is a systematic design technique that maps Data Flow Diagrams (DFDs) into a hierarchical architectural structure using **Transform Mapping** or **Transaction Mapping**.',
      simpleExplanation: {
        text: 'This technique turns a data flow diagram into an organizational chart for code. You follow data as it enters the system (incoming flow), pinpoint where the core processing happens (the transform center), and track where results exit (outgoing flow), using that structure to build your software architecture.',
        analogy:
          'A factory assembly line: Raw materials enter at the loading dock (incoming branch), are transformed on the manufacturing floor (transform center), and finished products are packaged and shipped out (outgoing branch).',
      },
      visual: {
        type: 'flow',
        title: 'Transform Mapping: From Data Flow to Program Architecture',
        steps: [
          { label: 'Incoming Flow (Input)', note: 'Read raw sensors, validate inputs, format incoming data' },
          { label: 'Transform Center (Core)', note: 'Core business processing, algorithmic calculation, decision logic' },
          { label: 'Outgoing Flow (Output)', note: 'Format output, update persistent storage, display results' },
        ],
      },
      explanation: [
        { heading: 'The Two Types of Data Flow' },
        {
          list: [
            '**Transform Flow** — Data flows along an incoming path, is converted by a central transform center, and leaves through an outgoing path. Mapped using *Transform Mapping*.',
            '**Transaction Flow** — A single data item (a transaction) arrives and triggers one of several alternative action paths based on its type. Mapped using *Transaction Mapping*.',
          ],
        },
        { heading: 'Step-by-Step Transform Mapping Process (Pressman)' },
        {
          list: [
            '**Step 1: Review the fundamental system model** — Ensure the Context Diagram and Level-0/1 DFDs accurately represent system behavior.',
            '**Step 2: Isolate the Transform Center** — Trace data flows to identify the boundary where incoming input streams end and core computation begins, as well as where computation transitions to outgoing results.',
            '**Step 3: Perform "First-Level Factoring"** — Create a top-level controller module that coordinates three main sub-controllers: an Incoming Branch controller, a Transform Center controller, and an Outgoing Branch controller.',
            '**Step 4: Perform "Second-Level Factoring"** — Decompose each sub-controller into subordinate modules representing individual DFD process bubbles.',
            '**Step 5: Refine the resulting structure** — Review the module hierarchy using cohesion and coupling principles to ensure functional independence.',
          ],
        },
      ],
      example: {
        title: 'Transform Mapping for an Online E-Commerce Order Checkout',
        input: 'A Data Flow Diagram for processing an online order.',
        output: `1. Incoming Path       : [Read Cart] → [Validate Coupon Code] → [Format Validated Order].
2. Transform Center     : [Calculate Final Total & Apply Taxes] ↔ [Check Credit Card Authorization].
3. Outgoing Path       : [Generate Invoice Record] → [Send Confirmation SMS] → [Display Order Receipt].
4. Factored Hierarchy  : 
   • Root Controller   : 'OrderCheckoutCoordinator'
   • Branch 1 (Input)  : 'OrderInputHandler'
   • Branch 2 (Transform): 'OrderCalculationEngine'
   • Branch 3 (Output) : 'ReceiptAndNotificationDispatcher'`,
        explanation:
          'Demonstrates how a linear data flow maps into a hierarchical structure chart with coordinating controllers.',
      },
      keyPoints: [
        'Maps data flow models (DFDs) into modular software architectures.',
        'Distinguishes between Transform Flow (sequential processing) and Transaction Flow (branching logic).',
        'Isolates the transform center between incoming input streams and outgoing output streams.',
        'First-level factoring creates controllers for input, transform, and output branches.',
        'Second-level factoring decomposes branches into subordinate processing modules.',
      ],
      importantTerms: [
        {
          term: 'Transform Center',
          meaning: 'The central portion of a data flow diagram that performs the core computations and processing.',
        },
        {
          term: 'Transform Mapping',
          meaning: 'The structured design process of converting a transform-flow DFD into a hierarchical structure chart.',
        },
        {
          term: 'Transaction Mapping',
          meaning: 'A design technique used when a single incoming data item triggers one of multiple distinct processing paths.',
        },
        {
          term: 'Factoring',
          meaning: 'The top-down decomposition of coordinating controller modules into subordinate functional modules.',
        },
      ],
      examPoints: [
        'Explain the difference between Transform Flow and Transaction Flow with DFD sketches.',
        'List and describe the steps involved in Transform Mapping according to Pressman.',
        'Explain First-Level and Second-Level Factoring with an example.',
      ],
      questions: [
        {
          prompt: 'Explain Architectural Mapping using Data Flow. Describe the complete procedure for Transform Mapping with a neat diagram.',
          plan: ANSWER_PLAN(
            'Definition of structured design and architectural mapping from data flows',
            'Flow diagram showing Incoming Path, Transform Center, and Outgoing Path',
            'Step-by-step procedure: DFD review, boundary identification, first/second-level factoring',
            'E-commerce order checkout transform mapping example',
            'Contrast between Transform Mapping and Transaction Mapping',
          ),
        },
      ],
      keywords: ['data flow', 'transform mapping', 'transaction mapping', 'transform center', 'DFD', 'factoring'],
      remember: [
        { prompt: 'What is the Transform Center in a DFD?', answer: 'The central processing area where incoming data is converted into outgoing results.' },
        { prompt: 'What are the two main types of data flow in structured design?', answer: 'Transform flow (sequential processing) and Transaction flow (branching paths).' },
        { prompt: 'What does first-level factoring produce?', answer: 'A root controller managing three branches: incoming input, transform center, and outgoing output.' },
      ],
    },

    // ------------------------------------------------------------------
    'designing-class-based-components': {
      difficulty: 'hard',
      intro:
        'In object-oriented design, class-based components are the primary building blocks of software. Designing them involves defining attributes, operations, and relationships while following established design principles.',
      definition:
        '**Designing Class-Based Components** is the detailed object-oriented design process where analysis classes are refined into concrete, implementable classes with fully specified attributes, method signatures, visibility constraints, and structural relationships.',
      simpleExplanation: {
        text: 'During analysis, we identify broad entities like "Customer" and "Order". During class-based component design, we turn them into production-ready blueprints: choosing exact data types (e.g., `String customerId`), defining precise method signatures (e.g., `boolean processPayment(double amount)`), and specifying how classes interact.',
        analogy:
          'Designing components for a mechanical watch: You do not just ask for "gears and springs"; you specify the exact diameter, tooth count, metal alloy, and lubrication points for every individual gear.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Core Structural Relationships in Class-Based Design',
        root: 'Class Relationships',
        children: [
          {
            label: 'Association',
            note: 'General structural relationship where one class uses or references another ("uses-a")',
          },
          {
            label: 'Aggregation',
            note: 'Loose whole-part relationship where child objects can exist independently ("has-a")',
          },
          {
            label: 'Composition',
            note: 'Strict whole-part relationship where child object lifecycle depends entirely on parent',
          },
          {
            label: 'Inheritance (Generalization)',
            note: 'Subclasses inherit attributes and operations from a base class ("is-a")',
          },
          {
            label: 'Dependency',
            note: 'Temporary usage relationship where Class A receives Class B as a parameter',
          },
        ],
      },
      explanation: [
        { heading: 'Core Component-Level Design Principles (SOLID / Pressman)' },
        {
          list: [
            '**Open-Closed Principle (OCP)** — Software components should be open for extension (via inheritance or interfaces), but closed for modification.',
            '**Liskov Substitution Principle (LSP)** — Subclasses should be substitutable for their base classes without breaking program correctness.',
            '**Dependency Inversion Principle (DIP)** — High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces).',
            '**Interface Segregation Principle (ISP)** — Clients should not be forced to depend on interfaces they do not use; prefer small, focused interfaces over large, bloated ones.',
          ],
        },
        { heading: 'Anatomy of a Detailed Class Design' },
        {
          list: [
            '**Attributes** — Named data variables with defined data types and access visibility (`-` private, `#` protected, `+` public).',
            '**Operations (Methods)** — Algorithms that manipulate state, defined with full method signatures, parameter lists, and return types.',
            '**Relationships** — Explicit connections: Associations, Aggregations, Compositions, and Inheritances.',
          ],
        },
      ],
      example: {
        title: 'Class-Based Component Design for an E-Commerce Order System',
        input: 'Designing the classes for an order checkout module.',
        output: `Classes & Relationships:
• Class Customer : - customerId: String, - email: String; + getProfile(): Profile
• Class Order    : - orderId: String, - orderDate: Date; + calculateTotal(): double
• Class LineItem : - quantity: int, - unitPrice: double; + getSubtotal(): double
• Class Payment  : - paymentId: String, - amount: double; + execute(): boolean

Relationships:
• Order COMPOSES LineItems (Order owns LineItems; if Order is deleted, LineItems are deleted).
• Customer ASSOCIATES with Order (A customer places multiple orders).
• Payment INHERITS into CreditCardPayment and UpiPayment (Generalization / "is-a").`,
        explanation:
          'Demonstrates class attributes, operations, visibility, and structural relationships (Composition, Association, Inheritance).',
      },
      keyPoints: [
        'Class-based design refines analysis classes into concrete, implementable specifications.',
        'Specifies attribute types, method signatures, and access visibility (- private, + public).',
        'Defines structural relationships: Association, Aggregation, Composition, and Inheritance.',
        'Composition models strict whole-part lifecycles; Aggregation models shared lifecycles.',
        'Guided by object-oriented design principles like the Open-Closed Principle (OCP).',
      ],
      importantTerms: [
        {
          term: 'Composition',
          meaning: 'A strong whole-part relationship where child objects cannot exist independently of their parent object.',
        },
        {
          term: 'Aggregation',
          meaning: 'A weaker whole-part relationship where child objects can exist independently of the parent.',
        },
        {
          term: 'Open-Closed Principle (OCP)',
          meaning: 'The design rule stating classes should be open for extension but closed for modification.',
        },
      ],
      examPoints: [
        'Differentiate between Aggregation and Composition with clear examples.',
        'Explain the Open-Closed Principle (OCP) and Dependency Inversion Principle (DIP).',
        'Draw a UML class diagram showing attributes, operations, and relationships for an e-commerce or banking system.',
      ],
      questions: [
        {
          prompt: 'Explain the principles and techniques involved in Designing Class-Based Components. Differentiate between Association, Aggregation, and Composition.',
          plan: ANSWER_PLAN(
            'Definition of class-based component design in object-oriented engineering',
            'Hierarchy diagram showing Association, Aggregation, Composition, Inheritance, Dependency',
            'Detailed explanation of OCP, LSP, and DIP design principles',
            'E-commerce Order, LineItem, Customer, and Payment class design example',
            'Comparison highlighting lifecycle differences between Aggregation and Composition',
          ),
        },
      ],
      keywords: ['class-based components', 'SOLID', 'aggregation', 'composition', 'association', 'inheritance', 'OCP'],
      remember: [
        { prompt: 'What is the difference between Aggregation and Composition?', answer: 'In Composition, child objects cannot exist without the parent; in Aggregation, children can exist independently.' },
        { prompt: 'What does the Open-Closed Principle state?', answer: 'Classes should be open for extension, but closed for modification.' },
        { prompt: 'What visibility symbol represents private in UML?', answer: 'The minus sign (-); plus (+) represents public, and hash (#) represents protected.' },
      ],
    },

    // ------------------------------------------------------------------
    'conducting-component-level-design': {
      difficulty: 'medium',
      intro:
        'Conducting component-level design follows a structured sequence of steps, taking components from initial concept to a validated, implementable specification.',
      definition:
        '**Conducting Component-Level Design** is the step-by-step engineering procedure where software engineers identify components, allocate responsibilities, specify interfaces, elaborate internal data structures and algorithms, and verify modular independence.',
      simpleExplanation: {
        text: 'This is the recipe for designing individual components. Instead of jumping straight into coding, you follow an orderly sequence: name the component, list its responsibilities, define its public interfaces, draft its internal algorithms, and check that it maintains high cohesion and low coupling.',
        analogy:
          'Assembling an aircraft sub-assembly: You define its exact purpose, design its attachment brackets (interfaces), verify how the internal hydraulics operate, and test that it does not vibrate loose from adjacent parts.',
      },
      visual: {
        type: 'process',
        title: 'Step-by-Step Component-Level Design Workflow',
        steps: [
          { label: '1. Identify Component', detail: 'Extract components from architectural models and analysis packages' },
          { label: '2. Allocate Responsibilities', detail: 'Define the component’s single primary role and state boundaries' },
          { label: '3. Identify Collaborators', detail: 'List the other components this module must communicate with' },
          { label: '4. Specify Interfaces', detail: 'Formally define public method signatures and error return codes' },
          { label: '5. Elaborate Algorithms', detail: 'Design internal data structures, pseudocode, and state logic' },
          { label: '6. Review Cohesion & Coupling', detail: 'Verify functional independence and remove unnecessary dependencies' },
        ],
      },
      explanation: [
        { heading: 'The Step-by-Step Procedure (Pressman)' },
        {
          list: [
            '**Step 1: Identify all design classes that correspond to the problem domain** — Map analysis classes into concrete design components.',
            '**Step 2: Identify infrastructure classes** — Add classes needed for technical implementation that were not in the problem domain (e.g., database connection pools, logging adapters, cryptography helpers).',
            '**Step 3: Elaborate design classes** — Specify detailed attributes, data types, method signatures, and access control.',
            '**Step 4: Describe persistent data sources** — Identify database tables, files, or caches required to persist component state.',
            '**Step 5: Elaborate behavioral representations** — Use state machine diagrams or pseudocode to specify how the component transitions between states and handles edge cases.',
            '**Step 6: Review and refactor** — Inspect the design to ensure high cohesion, low coupling, and adherence to design principles before coding.',
          ],
        },
      ],
      example: {
        title: 'Conducting Component Design for an ATM Cash Dispenser Controller',
        input: 'Designing the CashDispenserComponent for an automated teller machine.',
        output: `1. Component Name    : CashDispenserController
2. Responsibility    : Safely dispense physical currency notes matching a requested withdrawal amount.
3. Collaborators     : HardwareCassetteSensor, AuditLogger, AccountLedgerService.
4. Interface Contract: boolean dispenseCash(int amount, CurrencyType type) throws HardwareJamException;
5. Internal Algorithm: Greedy denomination selection algorithm (dispense 500s first, then 200s, then 100s); verify optical sensors.
6. Review Check      : High cohesion verified (only handles cash dispensing; account updates are delegated to AccountLedgerService).`,
        explanation:
          'Illustrates the structured workflow from identifying the component to refining its interface and internal algorithms.',
      },
      keyPoints: [
        'Conducting component design follows an orderly engineering sequence.',
        'Begins by identifying domain components and adding infrastructure classes.',
        'Defines clear responsibilities and explicit interface contracts.',
        'Elaborates internal data structures, algorithms, and state machines.',
        'Concludes with a review of cohesion, coupling, and design principles before implementation.',
      ],
      importantTerms: [
        {
          term: 'Infrastructure Class',
          meaning: 'A technical class (like a connection pool or logger) required for implementation that does not represent a business domain concept.',
        },
        {
          term: 'Collaborator',
          meaning: 'Another component that a class must interact with to accomplish its responsibilities.',
        },
      ],
      examPoints: [
        'List the step-by-step workflow for conducting component-level design.',
        'Explain the difference between problem domain classes and infrastructure classes.',
        'Provide a realistic component-design walkthrough for an ATM or e-commerce module.',
      ],
      questions: [
        {
          prompt: 'Outline the step-by-step procedure for conducting Component-Level Design. Illustrate with a realistic software component example.',
          plan: ANSWER_PLAN(
            'Definition and scope of component-level design conduct',
            'Step-by-step process flowchart from identification to review',
            'Detailed explanation of the six operational design steps',
            'ATM Cash Dispenser Controller walkthrough example',
            'Summary of why reviewing cohesion and coupling is the essential final step',
          ),
        },
      ],
      keywords: ['component-level design', 'workflow', 'infrastructure classes', 'collaborators', 'algorithms', 'refactoring'],
      remember: [
        { prompt: 'What is an infrastructure class in component design?', answer: 'A technical support class (like a database connector or logger) that does not exist in the business domain.' },
        { prompt: 'Why define collaborator components early?', answer: 'To clarify dependencies and define explicit interface contracts between components.' },
        { prompt: 'What is the final step in conducting component design?', answer: 'Reviewing the design to ensure high cohesion, low coupling, and solid quality before coding.' },
      ],
    },

    // ------------------------------------------------------------------
    'user-interface-analysis-and-design-steps': {
      difficulty: 'easy',
      intro:
        'A user interface is the window through which people experience software. UI analysis examines users, their tasks, and their operational environment before any visual screens are drawn.',
      definition:
        '**User Interface Analysis** is the front-end engineering activity of investigating the target users, their tasks and operational goals, the physical and digital environment, and usability constraints to establish requirements for UI design. **User Interface Design Steps** comprise an iterative engineering workflow spanning UI analysis, interface modeling, wireframing, prototyping, user evaluation, and iterative refinement to create an intuitive software interface.',
      simpleExplanation: {
        text: 'Before deciding what color buttons should be, UI analysis asks: Who is using this software? What are they trying to get done? Are they in a quiet office or a loud warehouse? Are they tech-savvy or beginners? This research ensures the interface fits how users actually work.',
        analogy:
          'Designing an airplane cockpit vs. a child’s toy scooter: The cockpit requires dense, information-rich instruments for trained pilots, while the scooter requires simple, intuitive controls that anyone can use immediately.',
      },
      visual: {
        type: 'hierarchy',
        title: 'The Four Pillars of User Interface Analysis',
        root: 'UI Analysis Dimensions',
        children: [
          {
            label: 'User Analysis',
            note: 'Demographics, experience levels, technical skill, cognitive capabilities',
          },
          {
            label: 'Task Analysis',
            note: 'Work breakdown, user goals, task frequency, sequential paths, use-case mapping',
          },
          {
            label: 'Environment Analysis',
            note: 'Physical workspace (noise, lighting, motion), display form factors, hardware constraints',
          },
          {
            label: 'Content Analysis',
            note: 'Information displayed, formatting, input validation rules, data density',
          },
        ],
      },
      explanation: [
        { heading: 'User interface analysis' },
        { heading: 'The Golden Rules of Interface Design (Theo Mandel)' },
        {
          list: [
            '**1. Place the User in Control** — Provide undo/redo actions, avoid forcing users into rigid sequences, and allow flexible navigation.',
            '**2. Reduce the User’s Memory Load** — Do not make users remember information across screens; use recognition rather than recall, visual cues, and sensible default values.',
            '**3. Make the Interface Consistent** — Use uniform visual layouts, navigation menus, button styles, and error handling patterns across the entire application.',
          ],
        },
        { heading: 'The Four Pillars of UI Analysis' },
        {
          list: [
            '**1. User Analysis** — Categorizes users into distinct personas: novice users (need guided wizards), knowledgeable intermittent users (need clear menus), and frequent power users (need keyboard shortcuts and fast data entry).',
            '**2. Task Analysis** — Breaks down user workflows into hierarchical sub-tasks and objects to identify the shortest path to accomplishing a goal.',
            '**3. Environment Analysis** — Considers the physical context: lighting, screen glare, noise, device mobility, and whether users wear gloves or work one-handed.',
            '**4. Content Analysis** — Identifies what data must be displayed on screen and how it should be structured to prevent information overload.',
          ],
        },
        { heading: 'User interface design steps' },
        { note: 'Once analysis is complete, user interface design translates user requirements into wireframes, interactive prototypes, and production screens through an iterative design cycle.' },
        'Designing a great user interface is like sculpting: You do not start by carving fine details. You begin with quick pencil sketches, build clickable mockups to get user feedback, identify what is confusing, and refine the screens until they feel natural and effortless to use.',
        { tip: 'Designing a car dashboard: Designers sketch initial gauge layouts, build foam mockups to test driver sightlines and reach, and test prototypes in driving simulators before casting final dashboard plastics.' },
        { visual: {
        type: 'process',
        title: 'Iterative User Interface Design Lifecycle',
        steps: [
          { label: '1. UI Analysis', detail: 'Analyze user personas, tasks, environment, and content' },
          { label: '2. Interface Architecture', detail: 'Map screen hierarchy, navigation flows, and menu structures' },
          { label: '3. Wireframing', detail: 'Create low-fidelity layout sketches showing button and content placements' },
          { label: '4. Interactive Prototyping', detail: 'Build clickable mockups (Figma/HTML) simulating actual user workflows' },
          { label: '5. Usability Evaluation', detail: 'Run user testing sessions, record error rates, and gather feedback' },
          { label: '6. Refinement', detail: 'Tune layout, visual hierarchy, and navigation based on user feedback' },
        ],
      } },
        { heading: 'The Step-by-Step UI Design Workflow (Pressman)' },
        {
          list: [
            '**Step 1: User, Task, and Environment Analysis** — Understand who the users are and what goals they need to accomplish.',
            '**Step 2: Interface Architecture and Navigation Design** — Define the overarching screen flow and navigation tree, mapping how users transition between screens.',
            '**Step 3: Low-Fidelity Wireframing** — Produce simple structural layouts focused on content hierarchy, button placement, and screen balance without colors or branding.',
            '**Step 4: Interactive Prototyping** — Build clickable prototypes that allow stakeholders to experience workflows directly before writing production code.',
            '**Step 5: Usability Evaluation** — Test the interface with real users to measure task completion times, error frequencies, and subjective satisfaction.',
            '**Step 6: Iterative Refinement** — Modify layouts, simplify navigation paths, and refine visual cues based on usability test findings.',
          ],
        },
        { label: 'Example: UI Design Steps for a College Attendance Management Screen', more: [
          'Designing a mobile attendance-marking screen for university professors.',
          { code: `1. Analysis     : Professor needs to mark attendance for 60 students in under 2 minutes at the end of class.
2. Architecture : Main Menu → Subject Selection → Attendance Marking Sheet → Submission Confirmation.
3. Wireframe    : Grid layout with student photos and simple tap-to-toggle Absent/Present states.
4. Prototype    : Interactive clickable mockup with all students marked "Present" by default (optimistic default).
5. Evaluation   : In test runs, professors marked attendance in 45 seconds by tapping only the 3 absent students.
6. Refinement   : Added an undo toast notification to quickly reverse accidental taps.`, lang: 'text' },
          'Demonstrates the progression from task analysis to interactive prototyping, user testing, and refinement.',
        ] },
      ],
      example: {
        title: 'UI Analysis for a College Student Information Portal',
        input: 'Conducting user interface analysis for a university mobile portal.',
        output: `• User Profile        : Tech-savvy undergraduate students accessing the system via smartphones on cellular data.
• Task Analysis       : Primary goals: View daily timetable (80% frequency), check semester grades (15%), download fee receipt (5%).
• Environment Analysis: Viewed outdoors under direct sunlight and on moving buses; requires high-contrast UI and large touch targets.
• Content Analysis    : Display class location, course name, and attendance percentage directly on the home dashboard.`,
        explanation:
          'Illustrates how analyzing users, tasks, and environments directly shapes interface requirements and priorities.',
      },
      keyPoints: [
        'UI analysis examines users, tasks, environments, and content before designing screens.',
        'Guided by Mandel’s three Golden Rules: User in control, reduce memory load, maintain consistency.',
        'Categorizes users into novices, intermittent users, and frequent power users.',
        'Task analysis maps the steps required to accomplish user goals.',
        'Environment analysis considers physical conditions like lighting, screen glare, and mobile usage.',
        'UI design is an iterative cycle of analysis, design, prototyping, and evaluation.',
        'Starts with user and task analysis before drawing visual screens.',
        'Navigation design establishes screen flows and transitions.',
        'Wireframes focus on content hierarchy and layout before applying visual styling.',
        'Prototypes enable early usability testing with real users to catch design flaws.',
        'Usability evaluation and iterative refinement ensure the final interface is intuitive and efficient.',
      ],
      importantTerms: [
        {
          term: 'User Persona',
          meaning: 'A realistic profile representing the goals, technical skills, and behaviors of a target user group.',
        },
        {
          term: 'Memory Load',
          meaning: 'The amount of mental effort and recall required from a user to navigate an interface.',
        },
        {
          term: 'Task Elaboration',
          meaning: 'Decomposing a high-level user goal into a step-by-step sequence of interface interactions.',
        },
        {
          term: 'Wireframe',
          meaning: 'A low-fidelity visual sketch outlining the structural layout and content hierarchy of a screen.',
        },
        {
          term: 'Interactive Prototype',
          meaning: 'A clickable mockup that simulates real user interactions and system transitions.',
        },
        {
          term: 'Usability Evaluation',
          meaning: 'Testing an interface with real users to measure efficiency, error rates, and satisfaction.',
        },
      ],
      examPoints: [
        'State and explain Theo Mandel’s three Golden Rules of user interface design.',
        'List and describe the four pillars of User Interface Analysis.',
        'Explain how user experience levels (novice vs power user) influence UI requirements.',
        'Sketch and explain the iterative steps of the User Interface Design process.',
        'Explain the role and value of low-fidelity wireframing before building prototypes.',
        'Describe how usability testing fits into the UI design lifecycle.',
      ],
      questions: [
        {
          prompt: 'What is User Interface Analysis? Explain Theo Mandel’s three Golden Rules and the core dimensions of UI analysis.',
          plan: ANSWER_PLAN(
            'Definition and purpose of User Interface Analysis',
            'Hierarchy diagram showing the four pillars of UI analysis',
            'Detailed explanation of Mandel’s 3 Golden Rules (Control, Memory Load, Consistency)',
            'College student information portal analysis example',
            'Discussion of user personas: novices, intermittent users, and power users',
          ),
        },
        {
          prompt: 'Describe the steps involved in User Interface Design. Explain how iterative prototyping and usability evaluation ensure design quality.',
          plan: ANSWER_PLAN(
            'Definition and scope of the User Interface Design lifecycle',
            'Process flowchart (Analysis → Architecture → Wireframe → Prototype → Evaluate → Refine)',
            'Detailed breakdown of each step in the workflow',
            'College attendance marking screen design walkthrough example',
            'Explanation of usability metrics: task completion time, error rates, user satisfaction',
          ),
        },
      ],
      keywords: [
        'UI analysis',
        'Mandel',
        'golden rules',
        'user control',
        'memory load',
        'consistency',
        'personas',
        'UI design steps',
        'wireframing',
        'prototyping',
        'usability evaluation',
        'navigation design',
        'refinement',
      ],
      remember: [
        { prompt: 'What are Theo Mandel’s three Golden Rules for UI design?', answer: '1. Place the user in control; 2. Reduce the user’s memory load; 3. Make the interface consistent.' },
        { prompt: 'What are the four pillars of UI analysis?', answer: 'User Analysis, Task Analysis, Environment Analysis, and Content Analysis.' },
        { prompt: 'Why is reducing user memory load important?', answer: 'Users make fewer mistakes when interfaces provide visual cues instead of requiring recall.' },
        { prompt: 'What is the difference between a wireframe and a prototype?', answer: 'A wireframe is a static structural sketch; a prototype is an interactive, clickable mockup.' },
        { prompt: 'Why is usability evaluation critical before coding?', answer: 'It uncovers confusing navigation and workflow flaws before committing time and budget to coding.' },
        { prompt: 'What is the first step in the UI design lifecycle?', answer: 'User, task, and environment analysis.' },
      ],
    },
  },
}