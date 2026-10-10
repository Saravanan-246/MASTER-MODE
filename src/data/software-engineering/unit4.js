// src/data/software-engineering/unit4.js
// Software Engineering Practices — Unit IV: Software Testing.
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
    'Unit IV covers software testing as a critical engineering discipline to ensure quality, identify defects, and validate system behaviour. Starting with the strategic framework and its organizational challenges, it explores strategic progressions across conventional, object-oriented, and WebApp systems before examining validation and full-system testing. It concludes with the art of debugging and detailed white-box (basis path, control structure) and black-box (equivalence partitioning, boundary value, model-based) test-case design techniques.',

  map: [
    {
      label: 'Testing Strategy & Scope',
      topics: [
        'strategic-approach-to-software-testing',
        'strategic-issues',
        'test-strategies-for-conventional-software-object-oriented-software-and-webapps',
      ],
    },
    {
      label: 'Validation, System Testing & Debugging',
      topics: [
        'validation-testing',
        'system-testing',
        'debugging-process',
      ],
    },
    {
      label: 'White-Box Testing Techniques',
      topics: [
        'white-box-testing',
        'basis-path-testing',
        'control-structure-testing',
      ],
    },
    {
      label: 'Black-Box & Model-Based Testing',
      topics: [
        'black-box-testing',
        'model-based-testing',
      ],
    },
  ],

  topics: {
    // ------------------------------------------------------------------
    'strategic-approach-to-software-testing': {
      difficulty: 'easy',
      intro:
        'Software testing is not an afterthought; it is a systematic, planned process that spans the entire software engineering lifecycle to identify defects and assess software quality.',
      definition:
        '**Software Testing** is a strategic sequence of planned activities aimed at executing a program with the intent of finding errors, verifying that it meets specified requirements, and validating that it satisfies customer expectations. It demonstrates that software functions properly while uncovering latent defects.',
      simpleExplanation: {
        text: 'Testing is like proofreading an essay before publishing it. You start by checking individual sentences for typos (unit testing), then make sure paragraphs connect smoothly (integration), and finally read the entire essay to see if it answers the prompt accurately (validation).',
        analogy:
          'Safety-testing a car: Engineers test individual spark plugs and brakes (unit), check how the engine and transmission work together (integration), and finally test-drive the assembled car on city streets and crash-test tracks (system/validation).',
      },
      visual: {
        type: 'flow',
        title: 'The Spiral Strategy of Software Testing',
        steps: [
          { label: 'Unit Testing', note: 'Begins at the core: individual functions, classes, and algorithms' },
          { label: 'Integration Testing', note: 'Expands outward: interfaces, data flow, component interactions' },
          { label: 'Validation Testing', note: 'Verifies software against user requirements (SRS baseline)' },
          { label: 'System Testing', note: 'Tests complete package in target environment (hardware, network, OS)' },
        ],
      },
      explanation: [
        { heading: 'Core Characteristics of a Strategic Approach (Pressman)' },
        {
          list: [
            '**Starts at the component level** — Testing begins at the smallest units of code (functions, methods) and spirals outward toward the integrated whole.',
            '**Different techniques apply at different stages** — White-box techniques dominate early unit testing; black-box techniques dominate later validation and system testing.',
            '**Conducted by multiple parties** — Developers execute early unit/integration tests; independent test groups (ITG) manage validation and acceptance tests to reduce confirmation bias.',
            '**Testing vs. Quality Assurance (QA)** — Testing uncovers defects; SQA designs the processes, reviews, and audits that prevent defects from occurring in the first place.',
          ],
        },
        { heading: 'Verification vs Validation (Boehm)' },
        {
          table: {
            columns: ['Dimension', 'Verification', 'Validation'],
            rows: [
              ['Core Question', '"Are we building the product right?"', '"Are we building the right product?"'],
              ['Focus', 'Ensures software conforms to specification artifacts from earlier phases.', 'Ensures software satisfies actual user needs and business objectives.'],
              ['Activities', 'Code reviews, walkthroughs, inspections, unit testing.', 'Acceptance testing, beta trials, black-box scenario testing.'],
            ],
          },
        },
        { heading: 'Fundamental Testing Axiom (Dijkstra)' },
        {
          tip: '**Dijkstra’s Principle**: Testing can demonstrate the presence of bugs, but never their absence. No matter how many tests pass, undiscovered defects may still exist.',
        },
      ],
      example: {
        title: 'Testing a University Examination Result Engine',
        input: 'A module calculates a student’s GPA, determines pass/fail status, and publishes grades.',
        output: `Unit Test        : Passes edge-case marks (-1, 0, 100, 101) to verify GPA formulas.
Integration Test : Verifies that student IDs from the database link correctly to the GPA calculator.
Validation Test  : Confirms that passing students receive correct mark-sheets matching academic council rules.
System Test      : Simulates 15,000 students checking results concurrently on release day.`,
        explanation:
          'Illustrates the progression from isolated arithmetic verification to large-scale operational validation.',
      },
      keyPoints: [
        'Testing is a planned, systematic lifecycle activity, not an ad-hoc debugging step.',
        'Spirals outward from Unit Testing to Integration, Validation, and System Testing.',
        'Verification checks conformance to specifications; Validation checks fitness for purpose.',
        'Testing uncovers defects, but cannot prove zero defects exist in a program.',
      ],
      importantTerms: [
        {
          term: 'Verification',
          meaning: 'Activities verifying that software correctly implements specific structural requirements ("building the product right").',
        },
        {
          term: 'Validation',
          meaning: 'Activities confirming that software meets customer business needs and real-world expectations ("building the right product").',
        },
        {
          term: 'Independent Test Group (ITG)',
          meaning: 'A dedicated team that tests software objectively without developer bias.',
        },
      ],
      examPoints: [
        'Define software testing and explain why it is strategic rather than accidental.',
        'Contrast Verification with Validation using Barry Boehm’s classic definitions.',
        'Draw and explain the testing spiral (Unit → Integration → Validation → System).',
      ],
      questions: [
        {
          prompt: 'What is software testing? Explain a strategic approach to testing with an appropriate diagram.',
          plan: ANSWER_PLAN(
            'Definition of software testing and its quality objectives',
            'Testing spiral flowchart (Unit → Integration → Validation → System)',
            'Explanation of Verification vs. Validation and strategic testing stages',
            'University exam results portal example',
            'Key principles: component-first progression, independent testing, Dijkstra’s axiom',
          ),
        },
      ],
      keywords: ['testing strategy', 'verification', 'validation', 'testing spiral', 'defect detection', 'ITG'],
      remember: [
        { prompt: 'What is Dijkstra’s famous axiom on testing?', answer: 'Testing can show the presence of bugs, but never their absence.' },
        { prompt: 'What question does verification answer?', answer: '"Are we building the product right?"' },
        { prompt: 'What are the four levels of the testing spiral?', answer: 'Unit Testing, Integration Testing, Validation Testing, and System Testing.' },
      ],
    },

    // ------------------------------------------------------------------
    'strategic-issues': {
      difficulty: 'medium',
      intro:
        'A testing strategy fails when teams treat it as an unplanned scramble at the end of a project. Addressing strategic issues ensures tests are measurable, traceable, and practical.',
      definition:
        '**Strategic Issues** are organizational, procedural, and technical challenges that must be addressed to execute an effective testing campaign. They include specifying product objectives quantitatively, understanding user needs, formulating test plans, and designing software for testability.',
      simpleExplanation: {
        text: 'Before running a marathon, you must map the route, prepare supplies, and set time goals. If an engineering team begins testing without clear pass/fail criteria, defined schedules, or measurable objectives, they will waste time running random tests that miss critical flaws.',
        analogy:
          'Medical clinical trials: A pharmaceutical firm sets strict sample sizes, measurement metrics, and test protocols before administering a vaccine, rather than testing randomly on the general public.',
      },
      visual: {
        type: 'process',
        title: 'Core Steps for Addressing Strategic Testing Issues',
        steps: [
          { label: '1. Specify Objectives', detail: 'Define measurable quality metrics (e.g., Mean Time to Failure, defect density)' },
          { label: '2. Understand Users', detail: 'Build user profiles to test real-world operational scenarios first' },
          { label: '3. Plan for Testability', detail: 'Design modular software with logging, assertions, and clean interfaces' },
          { label: '4. Continuous Review', detail: 'Run formal technical reviews to catch design errors before coding begins' },
          { label: '5. Build Robust Tests', detail: 'Design reusable, automated test suites that verify regression baselines' },
        ],
      },
      explanation: [
        { heading: 'Major Strategic Issues (Pressman)' },
        {
          list: [
            '**Specify product requirements in a quantified manner long before testing begins** — Ambiguous goals like "the portal must be user-friendly" are untestable. Quantitative targets like "95% of users complete checkout in under 3 minutes" provide clear pass/fail benchmarks.',
            '**State testing objectives explicitly** — Define testing goals: Is the objective achieving 90% path coverage, confirming database recovery within 5 seconds, or verifying cross-browser rendering?',
            '**Understand the users of the software and develop profiles for each user category** — Testing must reflect real-world user workflows. Prioritizing realistic use cases catches bugs that affect real operations first.',
            '**Develop a testing plan that emphasizes "rapid cycle testing"** — Fast feedback loops catch bugs early, when they are cheapest to resolve.',
            '**Build robust software that is designed to test itself** — Incorporate defensive programming, assertions, audit logs, and self-diagnostic routines directly into the codebase.',
            '**Use formal technical reviews as a filter prior to testing** — Peer reviews catch up to 70% of design and logic flaws before a single line of test code is run.',
          ],
        },
        { heading: 'Software Testability (James Bach)' },
        {
          table: {
            columns: ['Attribute', 'Meaning in Strategic Testing'],
            rows: [
              ['Operability', 'The cleaner the software operates, the more efficiently it can be tested without setup crashes.'],
              ['Observability', 'Every input produces an observable, measurable output, making internal state changes easy to track.'],
              ['Controllability', 'Testers can directly control inputs, configurations, and internal states to trigger edge cases.'],
              ['Decomposability', 'Software is partitioned into modular components that can be tested in isolation.'],
              ['Simplicity', 'Simple code containing minimal complexity is easier to test thoroughly.'],
              ['Stability', 'Software changes infrequently during testing, preserving established test baselines.'],
            ],
          },
        },
      ],
      example: {
        title: 'Strategic Planning for a Hospital Patient Monitor',
        input: 'A medical device team needs to define a testing strategy before starting development.',
        output: `Quantified Metric : "Audio alarm sounds within 500ms of heart rate dropping below 40 BPM."
User Profiling    : Tested by emergency nurses under low-light, high-stress, noisy conditions.
Testability Hook  : Software exposes a diagnostic port to simulate heart arrhythmias on demand.`,
        explanation:
          'Quantified requirements and testability hooks ensure the software can be verified thoroughly before clinical deployment.',
      },
      keyPoints: [
        'Strategic testing requires quantified requirements established before testing begins.',
        'User profiles ensure testing focuses on real-world workflows rather than artificial paths.',
        'Software testability (observability, controllability, decomposability) must be designed into the code.',
        'Formal technical reviews act as early filters to catch defects before code execution.',
        'Explicit test plans define clear pass/fail criteria.',
      ],
      importantTerms: [
        {
          term: 'Software Testability',
          meaning: 'How easily a computer program can be tested (measured by operability, observability, and controllability).',
        },
        {
          term: 'Observability',
          meaning: 'The ease with which a tester can inspect the internal states and outputs generated by software.',
        },
        {
          term: 'Controllability',
          meaning: 'The ability of a tester to supply inputs and manipulate program states to trigger specific test paths.',
        },
      ],
      examPoints: [
        'List and explain at least five strategic issues in software testing as outlined by Roger Pressman.',
        'Define software testability and describe its core attributes (Observability, Controllability, Decomposability).',
        'Explain why quantifying requirements early is critical for test planning.',
      ],
      questions: [
        {
          prompt: 'Discuss the strategic issues that must be addressed when planning a software testing campaign.',
          plan: ANSWER_PLAN(
            'Definition of strategic testing issues and test planning',
            'Strategic decision process flow diagram',
            'Detailed breakdown of Pressman’s strategic issues (quantified requirements, user profiling, rapid cycles)',
            'Hospital patient monitor test planning example',
            'Attributes of software testability (observability, controllability, decomposability)',
          ),
        },
      ],
      keywords: ['strategic issues', 'testability', 'observability', 'controllability', 'quantified objectives', 'user profiling'],
      remember: [
        { prompt: 'What makes a requirement testable?', answer: 'It is quantified with unambiguous pass/fail criteria.' },
        { prompt: 'What does controllability mean in software testing?', answer: 'The tester can manipulate states and inputs to execute specific paths.' },
        { prompt: 'What is the purpose of user profiling in test planning?', answer: 'To prioritize testing on the realistic usage patterns most common in production.' },
      ],
    },

    // ------------------------------------------------------------------
    'test-strategies-for-conventional-software-object-oriented-software-and-webapps': {
      difficulty: 'hard',
      intro:
        'Conventional procedural software uses an organized, step-by-step testing progression: isolating individual modules, integrating them step-by-step, and verifying the combined system.',
      definition:
        'A **Test Strategy for Conventional Software** is a systematic, bottom-up architectural progression that begins with isolated **Unit Testing** of individual procedures, proceeds through **Integration Testing** to verify data transfer across interfaces, advances to **Validation Testing**, and concludes with full **System Testing**. A **Test Strategy for Object-Oriented Software** focuses on testing classes, their encapsulated states, and interactions rather than individual isolated procedures. The smallest testable unit shifts from an individual subprogram to an entire **Class**, where operations alter internal state through message passing. A **Test Strategy for WebApps** is a specialized quality framework that assesses the functional, aesthetic, navigational, performance, and security dimensions of network-intensive web applications across diverse client configurations.',
      simpleExplanation: {
        text: 'You do not test a clock by putting all the cogs together at once and hoping it ticks. You test each cog individually (unit test), connect pairs of gears to make sure they mesh smoothly without jamming (integration test), and finally inspect the complete assembled clock to verify it keeps accurate time (system test).',
        analogy:
          'Building a brick wall: Inspect individual bricks for cracks (unit), verify that the mortar binds adjacent bricks securely (integration), check that the wall is plumb and level (validation), and finally verify it supports the roof without buckling (system).',
      },
      visual: {
        type: 'hierarchy',
        title: 'Architectural Hierarchy of Conventional Testing',
        root: 'Conventional Test Progression',
        children: [
          {
            label: '1. Unit Testing',
            note: 'Focus: Module interfaces, local data, boundary conditions, independent paths, error-handling paths',
          },
          {
            label: '2. Integration Testing',
            note: 'Focus: Subsystem interfaces, data loss across calls; Top-Down (stubs) vs Bottom-Up (drivers)',
          },
          {
            label: '3. Validation Testing',
            note: 'Focus: Conformance to SRS requirements; Alpha and Beta user trials',
          },
          {
            label: '4. System Testing',
            note: 'Focus: Complete system verification (Recovery, Security, Stress, Performance)',
          },
        ],
      },
      explanation: [
        { heading: 'Test strategy for conventional software' },
        { heading: '1. Unit Testing in Conventional Software' },
        {
          list: [
            'Focuses on the smallest unit of software design: a function, procedure, or subroutine.',
            '**Key Verification Targets** — (1) Module interface (parameter passing and types); (2) Local data structures; (3) Boundary conditions; (4) Independent execution paths; (5) Error-handling paths.',
            '**Harnesses** — Uses **Drivers** (calling programs that feed inputs) and **Stubs** (dummy routines that simulate unbuilt child modules).',
          ],
        },
        { heading: '2. Integration Testing Strategies' },
        {
          list: [
            '**The Big-Bang Approach (Anti-pattern)** — Combining all modules at once and testing the whole program. When errors occur, isolating the source is nearly impossible.',
            '**Top-Down Integration** — Modules are integrated moving downward through the control hierarchy. High-level control logic is tested first; lower-level functions are replaced with *Stubs*. Verifies major decision logic early, but requires writing complex stubs for missing worker routines.',
            '**Bottom-Up Integration** — Modules at the lowest levels are integrated and tested first using *Drivers*. Replaces stubs with real code early on, but top-level control flaws are discovered late in the cycle.',
            '**Sandwich (Hybrid) Integration** — Combines top-down testing for upper architectural layers with bottom-up testing for low-level utility libraries.',
            '**Regression Testing** — Re-running a subset of existing tests after code changes to ensure modifications have not broken previously working functions.',
          ],
        },
        { heading: 'Test strategy for object-oriented software' },
        { note: 'Object-oriented systems cannot be tested using simple procedural methods. Encapsulation, inheritance, and polymorphism require testing state, class collaborations, and message passing.' },
        'In procedural code, you can test a function like `add(a, b)` on its own. In object-oriented code, testing a method like `account.withdraw(500)` depends on the account’s current balance, account status, and transaction history. You must test the entire object and its changing state over time.',
        { tip: 'Hiring an office team: In a procedural setup, you test whether an employee can type a letter. In an object-oriented setup, you test how employees share information, delegate tasks (polymorphism), and handle changing office roles over time.' },
        { visual: {
        type: 'hierarchy',
        title: 'Levels of Object-Oriented Testing',
        root: 'OO Testing Hierarchy',
        children: [
          {
            label: '1. Class Testing (Unit)',
            note: 'Encapsulated attributes + methods; operations tested in sequences to exercise class states',
          },
          {
            label: '2. Cluster / Collaboration Testing',
            note: 'Groups of cooperating classes; Thread-based testing vs Use-based testing',
          },
          {
            label: '3. Subsystem Testing',
            note: 'Packages, services, and domain layers communicating via explicit interfaces',
          },
          {
            label: '4. OO System Testing',
            note: 'End-to-end use-case scenarios driven by external actors and system boundaries',
          },
        ],
      } },
        { heading: 'Why OO Testing Differs from Conventional Testing' },
        {
          list: [
            '**Encapsulation Hides State** — Methods cannot be tested in complete isolation because their behavior depends on internal attributes modified by earlier operations.',
            '**Inheritance Introduces Multiple Contexts** — Inherited methods must be re-tested within the context of the subclass because new attributes or overridden logic can alter execution behavior.',
            '**Polymorphism and Dynamic Binding** — A message call like `shape.draw()` can invoke multiple different implementations at runtime, requiring separate tests for every possible concrete subclass.',
          ],
        },
        { heading: 'OO Integration Testing Strategies (Pressman)' },
        {
          list: [
            '**Thread-Based Testing** — Integrates the set of classes required to respond to a single external input or event thread (e.g., testing all classes involved in handling a user clicking "Submit Order").',
            '**Use-Based Testing** — Begins by testing independent classes (classes that do not rely on others, like basic value objects). Next, dependent classes that rely on those independent classes are integrated layer by layer, minimizing the need for stubs.',
            '**Cluster Testing** — Collaborating classes that work together to accomplish a specific use case are grouped into a cluster and tested as a unit.',
          ],
        },
        { label: 'Example: Testing a Polymorphic Bank Account Hierarchy', more: [
          'Base class `Account` with subclasses `SavingsAccount` and `OverdraftCheckingAccount`.',
          { code: `Class-Level State Test :
• Call account.withdraw(1000) when balance is 500.
• SavingsAccount throws InsufficientFundsException.
• OverdraftCheckingAccount permits withdrawal, sets balance to -500, and applies a penalty fee.
Polymorphism Test :
• Pass both account types to a generic PaymentProcessor to confirm each handles funds deduction correctly.`, lang: 'text' },
          'Demonstrates how class testing must verify state transitions, while polymorphism tests verify concrete subclass behavior.',
        ] },
        { heading: 'Test strategy for WebApps' },
        { note: 'Web Applications run across diverse browsers, networks, and operating systems. Testing must evaluate content clarity, interface usability, security, and performance under variable traffic loads.' },
        'Testing a desktop calculator is straightforward: inputs and outputs stay on one computer. Testing a web app requires verifying that text displays accurately, links work properly, payments process securely, and pages load quickly across phones, laptops, slow 3G networks, and multiple browsers.',
        { tip: 'Opening an international airport: You must verify flight signs are clear (content), check doors and escalators work (interface), ensure signs guide passengers to gates (navigation), test baggage security (security), and confirm check-in desks handle holiday travel rushes (performance).' },
        { visual: {
        type: 'hierarchy',
        title: 'WebApp Testing Dimensions',
        root: 'WebApp Testing',
        children: [
          {
            label: 'Content Testing',
            note: 'Verifies text accuracy, graphic formatting, broken links, media playback, legal notices',
          },
          {
            label: 'Interface Testing',
            note: 'Validates form inputs, client-side scripts, accessibility standards, responsive layouts',
          },
          {
            label: 'Navigation Testing',
            note: 'Tests links, bookmarks, redirect chains, site maps, internal search functionality',
          },
          {
            label: 'Component / Functional Testing',
            note: 'Verifies backend business logic, database transactions, API integrations',
          },
          {
            label: 'Configuration & Compatibility',
            note: 'Verifies rendering across Chrome, Safari, Edge, Firefox, iOS, Android, diverse resolutions',
          },
          {
            label: 'Performance & Security',
            note: 'Tests concurrent user loads, DDoS resilience, SQL injection, XSS vulnerabilities',
          },
        ],
      } },
        { heading: 'Core Dimensions of WebApp Testing (Pressman)' },
        {
          list: [
            '**Content Testing** — Uncovers factual errors, grammatical mistakes, broken image links, outdated text, and media playback issues.',
            '**Interface Testing** — Verifies interface mechanisms like input fields, dropdown menus, radio buttons, shopping carts, and dynamic client-side scripts.',
            '**Navigation Testing** — Ensures all navigation links, breadcrumbs, search filters, and redirects guide users to their destination without hitting 404 errors.',
            '**Component (Functional) Testing** — Tests backend business logic, database updates, and external API integrations (e.g., payment gateways).',
            '**Configuration Testing** — Verifies that the WebApp renders consistently across various client hardware, screen resolutions, operating systems, and browsers.',
            '**Security Testing** — Evaluates vulnerabilities across the open network, testing for SQL injection, Cross-Site Scripting (XSS), session hijacking, and HTTPS encryption.',
            '**Performance Testing** — Tests page load speeds, response times, and server stability during high concurrent traffic spikes (load and stress testing).',
          ],
        },
        { label: 'Example: Testing an Online University Admissions Portal', more: [
          'A university web portal opens for 100,000 admission applications.',
          { code: `Content Test       : Confirms application eligibility rules and tuition fee schedules are accurate.
Interface Test     : Verifies the PDF mark-sheet upload widget validates file size and formats correctly.
Navigation Test    : Checks that clicking "Next" steps properly through personal, academic, and payment screens.
Compatibility Test : Verifies pages render correctly on iPhones, budget Android devices, and desktop screens.
Load/Stress Test   : Simulates 20,000 students submitting applications simultaneously in the final hour before deadline.`, lang: 'text' },
          'Illustrates how a WebApp testing strategy spans content accuracy, UI usability, device compatibility, and load capacity.',
        ] },
      ],
      example: {
        title: 'Integration of an E-Commerce Checkout Engine',
        input: 'Modules: `CheckoutController`, `TaxCalculator`, and `PaymentGateway`.',
        output: `Top-Down Integration:
1. Test CheckoutController using a Stub for TaxCalculator (returns fixed 5% tax).
2. Verify checkout flows and receipt generation logic early.
3. Replace the stub with the real TaxCalculator module and run integration tests.
4. Run regression test suite to ensure existing discounts calculate accurately.`,
        explanation:
          'Demonstrates how top-down testing validates control logic before child modules are fully implemented.',
      },
      keyPoints: [
        'Conventional testing moves step-by-step from individual modules to the complete system.',
        'Unit testing isolates functions, using drivers to call modules and stubs to simulate children.',
        'Top-down integration tests control logic early using stubs for lower-level routines.',
        'Bottom-up integration tests worker modules early using drivers to supply inputs.',
        'Regression testing runs after every change to prevent bugs from creeping into working code.',
        'The smallest testable unit in OO is the Class, not an individual method.',
        'Encapsulation requires testing methods in sequences to verify internal state transitions.',
        'Inheritance requires re-testing inherited methods within subclass contexts.',
        'Polymorphism requires verifying message calls across all possible concrete subclasses.',
        'OO integration uses Thread-Based, Use-Based, or Cluster testing strategies.',
        'WebApp testing addresses unique challenges: diverse browsers, open networks, and unpredictable traffic.',
        'Spans content, interface, navigation, functional, configuration, performance, and security testing.',
        'Compatibility testing verifies rendering across different operating systems, browsers, and screens.',
        'Security testing verifies defense against common web vulnerabilities like XSS and SQL injection.',
        'Performance testing verifies server stability during high concurrent traffic spikes.',
      ],
      importantTerms: [
        {
          term: 'Driver',
          meaning: 'A temporary program that calls a module under test and passes sample data to it.',
        },
        {
          term: 'Stub',
          meaning: 'A dummy program that simulates the behavior of a child module called by the unit under test.',
        },
        {
          term: 'Regression Testing',
          meaning: 'Re-running tests to ensure recent bug fixes or code changes have not broken existing functions.',
        },
        {
          term: 'Big-Bang Testing',
          meaning: 'Combining all modules at once without incremental steps, making bugs hard to isolate.',
        },
        {
          term: 'Class Testing',
          meaning: 'Testing encapsulated attributes and methods together across different operational states.',
        },
        {
          term: 'Thread-Based Testing',
          meaning: 'Testing the set of classes needed to handle a single event, transaction, or user scenario.',
        },
        {
          term: 'Use-Based Testing',
          meaning: 'Testing independent classes first, then integrating dependent classes step-by-step.',
        },
        {
          term: 'Cross-Browser Compatibility',
          meaning: 'Verifying that a web application renders and functions consistently across different web browsers.',
        },
        {
          term: 'Navigation Testing',
          meaning: 'Testing links, redirects, and navigation menus to ensure users reach intended destinations without errors.',
        },
        {
          term: 'Load Testing',
          meaning: 'Evaluating WebApp response times and stability under expected peak concurrent user traffic.',
        },
      ],
      examPoints: [
        'Compare Top-Down and Bottom-Up integration testing with structural diagrams.',
        'Explain the role of Stubs and Drivers in unit and integration testing.',
        'Explain what regression testing is and why it is critical after bug fixes.',
        'Explain why conventional unit testing is inadequate for object-oriented software.',
        'Explain the impact of Encapsulation, Inheritance, and Polymorphism on software testing.',
        'Compare Thread-Based Testing and Use-Based Testing in OO integration.',
        'List and describe the seven core dimensions of WebApp testing according to Pressman.',
        'Explain why configuration and compatibility testing are critical for WebApps.',
        'Differentiate between Navigation Testing and Interface Testing.',
      ],
      questions: [
        {
          prompt: 'Explain the testing strategy for conventional software. Compare Top-Down and Bottom-Up integration testing with suitable sketches.',
          plan: ANSWER_PLAN(
            'Definition of conventional testing strategy and bottom-up architectural progression',
            'Diagrams comparing Top-Down (stubs) vs Bottom-Up (drivers) hierarchies',
            'Detailed breakdown of Unit, Integration, Validation, and System testing',
            'E-commerce checkout engine integration example',
            'Comparison table: Top-Down vs Bottom-Up vs Sandwich testing',
          ),
        },
        {
          prompt: 'How do object-oriented test strategies differ from conventional strategies? Explain class testing, thread-based testing, and use-based testing.',
          plan: ANSWER_PLAN(
            'Definition of OO testing strategy and shift to the Class as smallest testable unit',
            'OO testing hierarchy diagram (Class → Cluster → Subsystem → OO System)',
            'Explanation of challenges: encapsulation, inheritance context, polymorphic binding',
            'Bank account polymorphism and state transition testing example',
            'Comparison between Thread-Based and Use-Based integration approaches',
          ),
        },
        {
          prompt: 'Discuss the testing strategy for WebApps. Explain the key testing dimensions with a neat diagram.',
          plan: ANSWER_PLAN(
            'Definition of WebApp testing strategy and network-facing challenges',
            'Hierarchy diagram showing the seven WebApp testing dimensions',
            'Detailed breakdown of Content, Interface, Navigation, Component, Compatibility, Security, and Performance testing',
            'University admissions web portal testing example',
            'Summary highlighting cross-browser and high-concurrency testing demands',
          ),
        },
      ],
      keywords: [
        'conventional software',
        'unit testing',
        'integration testing',
        'stubs',
        'drivers',
        'top-down',
        'bottom-up',
        'regression',
        'object-oriented testing',
        'class testing',
        'thread-based',
        'use-based',
        'cluster testing',
        'polymorphism',
        'inheritance',
        'WebApp testing',
        'content testing',
        'navigation testing',
        'compatibility',
        'configuration testing',
        'load testing',
        'security testing',
      ],
      remember: [
        { prompt: 'What is a stub used for?', answer: 'A dummy module that replaces an unbuilt child module called by the unit under test.' },
        { prompt: 'What is a driver used for?', answer: 'A test harness program that calls the module under test and feeds inputs to it.' },
        { prompt: 'Why is Big-Bang integration risky?', answer: 'Combining all modules at once makes it difficult to isolate the source of errors.' },
        { prompt: 'What is the smallest testable unit in object-oriented software?', answer: 'The Class (methods and state encapsulated together).' },
        { prompt: 'Why must inherited methods be re-tested in a subclass?', answer: 'Because subclass attributes, side effects, or overridden logic can alter how inherited methods execute.' },
        { prompt: 'What is thread-based testing in OO?', answer: 'Integrating and testing the group of collaborating classes required to handle a single event or transaction.' },
        { prompt: 'What does WebApp navigation testing verify?', answer: 'That all links, redirects, search filters, and site paths guide users without errors.' },
        { prompt: 'What is cross-browser compatibility testing?', answer: 'Ensuring the web application renders and functions properly across Chrome, Safari, Firefox, and Edge.' },
        { prompt: 'Why is security testing essential for WebApps?', answer: 'Because WebApps are exposed directly to the public internet 24/7, making them vulnerable to network attacks.' },
      ],
    },

    // ------------------------------------------------------------------
    'validation-testing': {
      difficulty: 'easy',
      intro:
        'Validation testing evaluates the completed software from the customer’s perspective, verifying that the product fulfills the business requirements specified in the SRS.',
      definition:
        '**Validation Testing** is the phase of the software testing process that provides final assurance that the software meets all functional, behavioral, and performance requirements specified in the Software Requirements Specification (SRS). It evaluates whether the team built the *right product*.',
      simpleExplanation: {
        text: 'Validation testing is the final inspection before moving into a newly built house. You check that the house has three bedrooms, working electricity, and running water as promised in the contract, ensuring it matches what you asked for.',
        analogy:
          'A custom suit fitting: The tailor has finished stitching the suit (verification). Now you try it on to ensure it fits comfortably, the color matches what you picked, and the pockets meet your needs (validation).',
      },
      visual: {
        type: 'flow',
        title: 'Validation Testing Workflow to Acceptance',
        steps: [
          { label: 'Software Requirements (SRS)', note: 'Input baseline: functional, performance, and interface rules' },
          { label: 'Validation Test Execution', note: 'Black-box test suite executing real customer operational scenarios' },
          { label: 'Defect Reconciliation', note: 'Documenting deviations, negotiating minor flaws, fixing critical gaps' },
          { label: 'Alpha / Beta Trials', note: 'Alpha testing at developer site; Beta testing in real customer environments' },
          { label: 'Formal Acceptance Sign-Off', note: 'Software approved for deployment and production release' },
        ],
      },
      explanation: [
        { heading: 'Validation Criteria and Process' },
        {
          list: [
            '**Requirements-Based Testing** — Validation tests are derived directly from the SRS. Every functional requirement must have matching test cases with pass/fail criteria.',
            '**Black-Box Focus** — Validation testing treats the software as a black box, verifying inputs and expected outputs without looking at internal source code.',
            '**Defect Resolution** — When a test uncovers a deviation from the SRS, the team either fixes the code or negotiates a specification update with the customer.',
          ],
        },
        { heading: 'Alpha Testing vs. Beta Testing' },
        {
          table: {
            columns: ['Dimension', 'Alpha Testing', 'Beta Testing'],
            rows: [
              ['Environment', 'Conducted at the developer’s site in a controlled environment.', 'Conducted at real end-user sites in live operating environments.'],
              ['User Presence', 'Conducted by real users observed directly by developers.', 'Conducted by end users with developers absent; users report bugs remotely.'],
              ['Control Level', 'High control: errors are recorded and debugged immediately.', 'Low control: tests depend on diverse, real-world user hardware and usage patterns.'],
              ['Timing', 'Precedes Beta testing; acts as an internal gatekeeper.', 'Follows Alpha testing; represents the final review before broad commercial release.'],
            ],
          },
        },
      ],
      example: {
        title: 'Validation Testing for a Hospital Pharmacy Dispenser',
        input: 'SRS Specification: "The system must warn the pharmacist if a drug interaction exists between two prescribed medications."',
        output: `Validation Test Case : Prescribe Warfarin alongside high-dose Aspirin for a patient.
Expected Result      : Visual red warning alert appears on screen and requires pharmacist confirmation to proceed.
Outcome              : System triggers the alert and logs the interaction, satisfying the validation requirement.`,
        explanation:
          'Demonstrates how validation testing confirms that software satisfies specific business requirements.',
      },
      keyPoints: [
        'Validation testing answers Barry Boehm’s question: "Are we building the right product?"',
        'Uses black-box tests derived directly from the Software Requirements Specification (SRS).',
        'Alpha testing occurs at the developer’s site under controlled observation.',
        'Beta testing occurs at end-user customer sites in uncontrolled operating environments.',
        'Successful validation leads to formal customer acceptance and release.',
      ],
      importantTerms: [
        {
          term: 'Alpha Testing',
          meaning: 'Acceptance testing conducted by representative users at the developer’s site under direct supervision.',
        },
        {
          term: 'Beta Testing',
          meaning: 'Testing conducted by real end users in their own environments without developers present.',
        },
        {
          term: 'Acceptance Testing',
          meaning: 'Final testing conducted by customers to decide whether to accept and pay for the software.',
        },
      ],
      examPoints: [
        'Define Validation Testing and state its primary objective.',
        'Compare and contrast Alpha Testing and Beta Testing in a detailed comparison table.',
        'Explain how the Software Requirements Specification (SRS) guides validation test-case design.',
      ],
      questions: [
        {
          prompt: 'What is Validation Testing? Differentiate between Alpha and Beta testing with an appropriate workflow diagram.',
          plan: ANSWER_PLAN(
            'Definition of validation testing and conformance to SRS requirements',
            'Validation workflow diagram (SRS → Execution → Alpha/Beta → Acceptance)',
            'Detailed comparison table: Alpha Testing vs Beta Testing',
            'Hospital pharmacy prescription validation example',
            'Key takeaways: customer satisfaction and acceptance criteria',
          ),
        },
      ],
      keywords: ['validation testing', 'alpha testing', 'beta testing', 'SRS', 'acceptance testing', 'requirements-based'],
      remember: [
        { prompt: 'What fundamental question does validation testing answer?', answer: '"Are we building the right product?"' },
        { prompt: 'Where does Alpha testing take place?', answer: 'At the developer’s site under controlled supervision.' },
        { prompt: 'Where does Beta testing take place?', answer: 'At real end-user sites across diverse, uncontrolled environments.' },
      ],
    },

    // ------------------------------------------------------------------
    'system-testing': {
      difficulty: 'medium',
      intro:
        'Software does not run in a vacuum; it operates alongside hardware, networks, databases, and third-party systems. System testing verifies that all these parts work together properly.',
      definition:
        '**System Testing** is a series of specialized tests designed to verify that the fully integrated software application operates reliably when combined with all other system elements—including hardware, external networks, operating systems, and databases.',
      simpleExplanation: {
        text: 'System testing checks how the software handles real-world operational challenges: what happens if the power cord is pulled, if a hacker attempts to flood the database, or if 10,000 customers try to log in at the exact same second.',
        analogy:
          'Testing a commercial airliner: Engineers do not just check the cockpit screens. They fly the assembled plane into freezing weather (stress), simulate engine failures (recovery), and test emergency braking on icy runways (system performance).',
      },
      visual: {
        type: 'hierarchy',
        title: 'Core Categories of System Testing',
        root: 'System Testing',
        children: [
          {
            label: 'Recovery Testing',
            note: 'Forces the software to fail (crash, power loss) and verifies automatic recovery and data integrity',
          },
          {
            label: 'Security Testing',
            note: 'Verifies protection mechanisms prevent unauthorized access, data leaks, and malicious attacks',
          },
          {
            label: 'Stress Testing',
            note: 'Pushes the system beyond its maximum operational limits to check for graceful degradation',
          },
          {
            label: 'Performance Testing',
            note: 'Measures runtime speed, transaction throughput, and resource usage under normal loads',
          },
          {
            label: 'Deployment / Compatibility',
            note: 'Verifies software installs, configures, and runs correctly across targeted server environments',
          },
        ],
      },
      explanation: [
        { heading: 'Key Categories of System Testing (Pressman)' },
        {
          list: [
            '**1. Recovery Testing** — Forces the system to fail in various ways and verifies that recovery works properly. For automatic recovery, it measures Mean Time to Recovery (MTTR); for human recovery, it verifies that data remains uncorrupted and rollback mechanisms work.',
            '**2. Security Testing** — Verifies that protection mechanisms defend the system from unauthorized access. Testers attempt to bypass passwords, inject malicious input, intercept communications, and access restricted database tables.',
            '**3. Stress Testing** — Pushes the system to demanding extremes to see how it handles overload. Tests examine what happens when memory runs out, disk space fills up, or transaction rates spike far above capacity. The goal is verifying **graceful degradation** rather than catastrophic crashes.',
            '**4. Performance Testing** — Evaluates runtime performance, measuring response times, CPU usage, and network throughput under typical and peak operating conditions.',
          ],
        },
        { heading: 'Performance Testing vs. Stress Testing' },
        {
          table: {
            columns: ['Dimension', 'Performance Testing', 'Stress Testing'],
            rows: [
              ['Workload Level', 'Executes within normal, expected operating capacity (e.g., 2,000 active users).', 'Pushes the system beyond its maximum operational limit (e.g., 20,000 active users).'],
              ['Primary Goal', 'Measure response latency, database query times, and resource usage.', 'Confirm the system degrades gracefully and preserves data instead of crashing catastrophically.'],
              ['Key Metric', 'Average response time (e.g., page load < 1.5 seconds).', 'Breaking point, recovery time, and memory leak patterns under heavy load.'],
            ],
          },
        },
      ],
      example: {
        title: 'System Testing an Automated Highway Toll Collection System',
        input: 'An RFID toll system must process 60 cars per minute per lane on a highway.',
        output: `Recovery Test    : Unplug lane controller power; verify that pending toll records persist to disk and re-sync on reboot.
Security Test    : Attempt to feed fake cryptographic RFID signals to see if the reader detects cloned cards.
Stress Test      : Bombard the RFID scanner with 500 signals per second to verify queues buffer data rather than dropping payments.
Performance Test : Confirm that toll-gate arms raise within 250 milliseconds of scanning a valid RFID tag.`,
        explanation:
          'Demonstrates how recovery, security, stress, and performance testing verify system reliability in operational environments.',
      },
      keyPoints: [
        'System testing evaluates the fully integrated application in its complete operational environment.',
        'Recovery testing verifies that the system restores service and preserves data after failures.',
        'Security testing verifies defense against unauthorized access and attacks.',
        'Stress testing pushes the system beyond capacity limits to ensure graceful degradation.',
        'Performance testing measures response times and throughput under normal operational loads.',
      ],
      importantTerms: [
        {
          term: 'Recovery Testing',
          meaning: 'Testing that forces software to fail to verify its ability to recover data and resume operations.',
        },
        {
          term: 'Stress Testing',
          meaning: 'Testing that subjects a system to extreme loads beyond its specified limits to evaluate how it fails.',
        },
        {
          term: 'Graceful Degradation',
          meaning: 'A system’s ability to maintain core functions and protect data during overloads or component failures.',
        },
      ],
      examPoints: [
        'List and describe the four major types of system testing: Recovery, Security, Stress, and Performance.',
        'Compare Performance Testing with Stress Testing.',
        'Explain what graceful degradation means during stress testing.',
      ],
      questions: [
        {
          prompt: 'What is System Testing? Discuss the major types of system testing with real-world examples.',
          plan: ANSWER_PLAN(
            'Definition of system testing and integration with hardware/operating environments',
            'Hierarchy diagram showing the four core system testing categories',
            'Detailed evaluation of Recovery, Security, Stress, and Performance testing',
            'Automated highway toll-collection system example',
            'Comparison table: Performance Testing vs Stress Testing',
          ),
        },
      ],
      keywords: ['system testing', 'recovery testing', 'security testing', 'stress testing', 'performance testing', 'graceful degradation'],
      remember: [
        { prompt: 'What is the goal of recovery testing?', answer: 'To force failures and verify the software recovers state and resumes service without data loss.' },
        { prompt: 'What is the difference between stress testing and performance testing?', answer: 'Performance tests normal operating limits; stress tests push the system beyond capacity to see how it fails.' },
        { prompt: 'What is graceful degradation?', answer: 'The ability of software to remain partially operational during severe overloads rather than crashing completely.' },
      ],
    },

    // ------------------------------------------------------------------
    'debugging-process': {
      difficulty: 'medium',
      intro:
        'Testing finds errors; debugging fixes them. Debugging is a systematic problem-solving process that isolates the root cause of a defect and corrects it without introducing new bugs.',
      definition:
        '**Debugging** is the diagnostic process of locating, analyzing, and correcting the root cause of a software error after a test case triggers an observable failure. While testing uncovers symptoms, debugging identifies and fixes the underlying defect.',
      simpleExplanation: {
        text: 'Testing is like a doctor taking your temperature and finding a fever (a symptom). Debugging is the doctor running blood tests, isolating the bacterial infection causing the fever (root cause), and prescribing medicine to cure it.',
        analogy:
          'Diagnosing car trouble: Testing is noticing that the car pulls to the left when you brake (the symptom). Debugging is putting the car on a lift, finding a worn brake caliper (root cause), and replacing it.',
      },
      visual: {
        type: 'flow',
        title: 'The Closed-Loop Debugging Process',
        steps: [
          { label: '1. Symptom Manifestation', note: 'A test case triggers an error, incorrect calculation, or crash' },
          { label: '2. Cause Isolation', note: 'Forming hypotheses and narrowing down code to locate the root cause' },
          { label: '3. Defect Correction', note: 'Modifying source code, data structures, or logic to fix the bug' },
          { label: '4. Regression Verification', note: 'Re-running test suites to confirm the fix works and introduced no new defects' },
        ],
      },
      explanation: [
        { heading: 'Testing vs Debugging' },
        {
          table: {
            columns: ['Dimension', 'Testing', 'Debugging'],
            rows: [
              ['Purpose', 'Identifies the presence of defects by exposing error symptoms.', 'Locates the root cause behind symptoms and fixes the code.'],
              ['Who Executes', 'Testers, QA engineers, or automated CI/CD pipelines.', 'Developers who wrote or maintain the source code.'],
              ['Process', 'Systematic, repeatable execution of defined test cases.', 'Exploratory, intellectual problem-solving and diagnostic analysis.'],
            ],
          },
        },
        { heading: 'Traditional Debugging Approaches (Pressman)' },
        {
          list: [
            '**Brute Force** — The most common, least efficient approach: scattering print/log statements across code or stepping line-by-line through memory dumps hoping to spot anomalies.',
            '**Backtracking** — Beginning where the symptom occurred and tracing execution backward through source code until the point of data corruption is found. Effective in small programs, but difficult in large codebases.',
            '**Cause Elimination (Scientific Method)** — Formulating hypotheses about what caused the error, designing isolated tests to prove or disprove each hypothesis, and systematically narrowing down candidates until the root defect is isolated.',
          ],
        },
        { heading: 'The Three Critical Questions Developers Must Ask After Fixing a Bug' },
        {
          list: [
            '1. Is the cause of this bug reproduced elsewhere in the codebase?',
            '2. What new defect might this code modification accidentally introduce? (Requires regression testing).',
            '3. What could we have done during requirements, design, or reviews to prevent this defect in the first place?',
          ],
        },
      ],
      example: {
        title: 'Debugging an Off-by-One Loop in an E-Commerce Cart',
        input: 'Symptom: A shopping cart with 5 items only sums up prices for the first 4 items.',
        output: `Step 1 (Symptom) : Cart with items [$10, $20, $30, $40, $50] reports total as $100 instead of $150.
Step 2 (Cause)   : Developer uses Backtracking and inspects the loop condition: 'for (int i = 0; i < cart.size() - 1; i++)'.
Step 3 (Fix)     : Corrects loop boundary to 'i < cart.size()'.
Step 4 (Retest)  : Runs unit test suite for 0, 1, and 5-item carts; regression passes cleanly.`,
        explanation:
          'Demonstrates the progression from noticing a symptom to isolating the root defect, applying a fix, and running regression tests.',
      },
      keyPoints: [
        'Testing finds error symptoms; debugging isolates and fixes the underlying root cause.',
        'Debugging strategies include Brute Force, Backtracking, and Cause Elimination.',
        'Fixing a bug can introduce new side effects, making regression testing essential.',
        'Effective debugging identifies why the defect occurred to prevent similar issues in the future.',
      ],
      importantTerms: [
        {
          term: 'Symptom',
          meaning: 'The observable manifestation of an error (e.g., an unexpected output or crash).',
        },
        {
          term: 'Root Cause',
          meaning: 'The underlying flaw in source code, logic, or data that triggers an observable failure.',
        },
        {
          term: 'Cause Elimination',
          meaning: 'A debugging strategy that systematically tests hypotheses to isolate the source of an error.',
        },
      ],
      examPoints: [
        'Differentiate between Testing and Debugging across purpose, actors, and processes.',
        'Describe the three classic debugging approaches: Brute Force, Backtracking, and Cause Elimination.',
        'Explain why regression testing is required immediately after a bug is fixed.',
      ],
      questions: [
        {
          prompt: 'Discuss the art of debugging. Compare testing and debugging, and explain the major debugging strategies with an example.',
          plan: ANSWER_PLAN(
            'Definition of debugging and distinction between symptoms and root causes',
            'Debugging workflow diagram (Symptom → Isolation → Fix → Regression)',
            'Comparison table: Testing vs Debugging',
            'Detailed explanation of Brute Force, Backtracking, and Cause Elimination',
            'Shopping cart off-by-one loop debugging example',
          ),
        },
      ],
      keywords: ['debugging', 'symptom', 'root cause', 'backtracking', 'cause elimination', 'regression testing', 'brute force'],
      remember: [
        { prompt: 'What is the difference between testing and debugging?', answer: 'Testing uncovers error symptoms; debugging isolates and fixes the root cause.' },
        { prompt: 'What is the backtracking debugging strategy?', answer: 'Starting where the error occurred and tracing execution backward through code to find the defect.' },
        { prompt: 'Why must regression testing follow debugging?', answer: 'To ensure the code fix did not accidentally introduce new bugs into working features.' },
      ],
    },

    // ------------------------------------------------------------------
    'white-box-testing': {
      difficulty: 'medium',
      intro:
        'White-box testing examines the internal structure of code. Testers inspect source code to ensure internal paths, decision branches, and loops execute correctly.',
      definition:
        '**White-Box Testing** (also called **Glass-Box** or **Structural Testing**) is a test-case design philosophy that uses the internal source code, logic, and control paths of a program to design test cases that verify independent execution paths, decision branches, and internal data structures.',
      simpleExplanation: {
        text: 'Imagine inspecting a glass watch: you can see every cog, gear, and spring moving inside. White-box testing lets you see inside the code, allowing you to design tests that exercise every `if` statement, `while` loop, and return path at least once.',
        analogy:
          'A car mechanic inspecting an engine: Rather than just stepping on the gas pedal to see if the car moves, the mechanic removes the hood and inspects fuel lines, spark plugs, and belts while the engine runs.',
      },
      visual: {
        type: 'flow',
        title: 'White-Box Code-to-Path Testing Flow',
        steps: [
          { label: 'Source Code Analysis', note: 'Examine control logic, conditions, loops, and variable scopes' },
          { label: 'Control Flow Graph (CFG)', note: 'Convert statements to nodes and execution flow to edges' },
          { label: 'Path Identification', note: 'Map every independent execution path through the control graph' },
          { label: 'Test Case Derivation', note: 'Select inputs that force execution down each targeted path' },
        ],
      },
      explanation: [
        { heading: 'Core Objectives of White-Box Testing (Pressman)' },
        {
          list: [
            '**Exercise all independent paths** — Ensure every unique path through a module executes at least once.',
            '**Test all logical decisions** — Exercise both the True and False branches of every conditional statement (`if-else`, `switch`).',
            '**Execute all loops at their boundaries** — Test loops at zero iterations, one iteration, normal counts, and maximum boundary counts.',
            '**Verify internal data structures** — Ensure local variables, buffers, and arrays remain uncorrupted during execution.',
          ],
        },
        { heading: 'Why White-Box Testing is Critical' },
        {
          list: [
            'Logic errors and typographical mistakes often hide along rare, defensive code paths (e.g., error handlers) that normal black-box tests never trigger.',
            'Developers often assume an execution path is rarely traveled and skip testing it, leaving dormant bugs in production.',
          ],
        },
      ],
      example: {
        title: 'White-Box Testing of a Discount Function',
        input: `Code snippet under test:
if (isMember && cartTotal > 1000) {
    discount = 0.20;
} else {
    discount = 0.05;
}`,
        output: `Test Case 1 (True Branch)  : isMember = true, cartTotal = 1500 → Executes True branch (discount = 0.20).
Test Case 2 (False Branch) : isMember = true, cartTotal = 800  → Executes False branch (discount = 0.05).
Test Case 3 (False Branch) : isMember = false, cartTotal = 2000 → Executes False branch (discount = 0.05).`,
        explanation:
          'White-box testing selects specific inputs to ensure both the True and False branches of the decision execute and are verified.',
      },
      keyPoints: [
        'White-box testing uses internal source code and logic to design test cases.',
        'Also known as Glass-Box, Clear-Box, or Structural Testing.',
        'Ensures all independent paths and conditional decision branches execute at least once.',
        'Exercises loops at zero, one, and maximum boundary iterations.',
        'Uncovers logic flaws along rare execution paths that black-box testing misses.',
      ],
      importantTerms: [
        {
          term: 'Glass-Box Testing',
          meaning: 'Another name for white-box testing, emphasizing visibility into the internal source code.',
        },
        {
          term: 'Branch Coverage',
          meaning: 'A test metric measuring whether every decision branch (True and False) has been executed.',
        },
        {
          term: 'Statement Coverage',
          meaning: 'A test metric measuring whether every line of executable source code has been run at least once.',
        },
      ],
      examPoints: [
        'Define White-Box Testing and state its primary engineering goals.',
        'Explain why black-box testing alone cannot replace white-box testing.',
        'Explain Statement Coverage, Branch Coverage, and Path Coverage.',
      ],
      questions: [
        {
          prompt: 'What is White-Box Testing? Explain its primary objectives and describe how it verifies internal logic.',
          plan: ANSWER_PLAN(
            'Definition of White-Box (Glass-Box) testing and structural code focus',
            'Flowchart from Source Code to Control Flow Graph and Path Selection',
            'Core objectives: independent paths, true/false branch decisions, loop boundaries',
            'Discount calculation code example showing True/False branch coverage',
            'Key coverage metrics: Statement, Branch, and Path coverage',
          ),
        },
      ],
      keywords: ['white-box testing', 'glass-box', 'structural testing', 'statement coverage', 'branch coverage', 'internal logic'],
      remember: [
        { prompt: 'Why is white-box testing called glass-box testing?', answer: 'Because the tester can see directly into the internal source code and logic.' },
        { prompt: 'What is branch coverage?', answer: 'A testing metric ensuring every boolean decision evaluates to both True and False at least once.' },
        { prompt: 'What is the primary limitation of white-box testing?', answer: 'It cannot detect missing requirements that were never coded into the program in the first place.' },
      ],
    },

    // ------------------------------------------------------------------
    'basis-path-testing': {
      difficulty: 'hard',
      intro:
        'Basis path testing is a classic white-box technique developed by Tom McCabe. It uses control flow graphs and cyclomatic complexity to determine the exact number of independent paths needed to test a module.',
      definition:
        '**Basis Path Testing** is a white-box testing technique that maps a program’s control flow into a graph, calculates its **Cyclomatic Complexity**, and derives a basis set of **independent execution paths** to ensure every program statement executes at least once.',
      simpleExplanation: {
        text: 'Imagine a maze with several branching corridors. Basis path testing draws a map of the maze (Control Flow Graph), calculates how many unique paths exist, and gives you the exact routes needed so that walking them guarantees you step on every single floor tile at least once.',
        analogy:
          'Planning railway maintenance: You identify every railway junction, switch, and siding, calculating the minimum number of train runs needed to travel across every meter of track.',
      },
      visual: {
        type: 'flow',
        title: 'Control Flow Graph & Basis Paths',
        steps: [
          { label: 'Node 1: Input (A, B)', note: 'Sequential entry statement' },
          { label: 'Node 2: Predicate Node (A > 10?)', note: 'Branch: True path goes to Node 3; False path goes to Node 4' },
          { label: 'Node 3: Process High Value', note: 'Sequential processing statement' },
          { label: 'Node 4: Predicate Node (B == 0?)', note: 'Branch: True path goes to Node 5; False path goes to Node 6' },
          { label: 'Node 5: Error Handler', note: 'Exception handling statement' },
          { label: 'Node 6: Final Return', note: 'Terminal exit node' },
        ],
      },
      explanation: [
        { heading: 'Control Flow Graph (CFG) Elements' },
        {
          list: [
            '**Node** — Represents one or more procedural statements or code lines.',
            '**Edge** — An arrow showing the flow of control between nodes.',
            '**Predicate Node** — A decision node containing a conditional check (e.g., `if`, `while`), characterized by two or more outgoing edges.',
            '**Region** — An area bounded by edges and nodes; the outer space around the graph also counts as one region.',
          ],
        },
        { heading: 'Cyclomatic Complexity, V(G)' },
        {
          list: [
            'Cyclomatic complexity is a software metric developed by Thomas McCabe that provides a quantitative measure of a program’s logical complexity.',
            'The value of $V(G)$ defines the **number of independent paths** in the basis set of a program.',
            'An **independent path** is any path through the program that introduces at least one new edge or set of processing statements not covered by existing paths.',
          ],
        },
        { heading: 'Three Ways to Compute Cyclomatic Complexity, V(G)' },
        {
          list: [
            '**Formula 1 (Edges and Nodes)**: $$V(G) = E - N + 2$$ where $E$ is the number of edges and $N$ is the number of nodes.',
            '**Formula 2 (Predicate Nodes)**: $$V(G) = P + 1$$ where $P$ is the number of predicate (decision) nodes.',
            '**Formula 3 (Regions)**: $$V(G) = \\text{Number of enclosed regions} + 1 \\text{ (the exterior region)}$$',
          ],
        },
        { heading: 'Step-by-Step Procedure for Basis Path Testing' },
        {
          list: [
            '1. Draw the Control Flow Graph (CFG) from the source code or design flow.',
            '2. Calculate the Cyclomatic Complexity $V(G)$ to determine the number of independent paths.',
            '3. Identify the basis set of independent paths.',
            '4. Design test cases with specific inputs to force execution along each identified path.',
          ],
        },
      ],
      example: {
        title: 'Basis Path Derivation for an Account Eligibility Checker',
        input: `Code under test:
1: int checkEligibility(int age, double income) {
2:    if (age >= 18) {
3:        if (income > 30000) {
4:            return APPROVED;
          } else {
5:            return PROBATION;
          }
      }
6:    return REJECTED;
7: }`,
        output: `Graph Metrics:
• Nodes (N) = 6  (Nodes: 1, 2, 3, 4, 5, 6-7 combined)
• Predicates (P) = 2  (Decisions at Line 2 and Line 3)
• Cyclomatic Complexity: V(G) = P + 1 = 2 + 1 = 3 independent paths.

Basis Paths:
• Path 1: 1 → 2 → 6 (age < 18 → REJECTED)
• Path 2: 1 → 2 → 3 → 5 (age >= 18, income <= 30000 → PROBATION)
• Path 3: 1 → 2 → 3 → 4 (age >= 18, income > 30000 → APPROVED)

Test Cases:
• Test 1: age = 16, income = 0      → Exercises Path 1
• Test 2: age = 22, income = 20000  → Exercises Path 2
• Test 3: age = 25, income = 50000  → Exercises Path 3`,
        explanation:
          'Calculates cyclomatic complexity (3), identifies the 3 independent paths, and provides test inputs for complete basis coverage.',
      },
      keyPoints: [
        'Basis path testing derives independent execution paths from a control flow graph.',
        'Cyclomatic Complexity $V(G)$ defines the number of independent paths in the basis set.',
        'Formulas for $V(G)$: $E - N + 2$, $P + 1$, or the total number of bounded regions.',
        'An independent path introduces at least one new edge or statement not covered by prior paths.',
        'Guarantees that every statement and decision branch executes at least once.',
      ],
      importantTerms: [
        {
          term: 'Cyclomatic Complexity',
          meaning: 'A quantitative metric measuring the number of independent paths through a program module.',
        },
        {
          term: 'Predicate Node',
          meaning: 'A decision node in a control flow graph that has two or more outgoing edges.',
        },
        {
          term: 'Independent Path',
          meaning: 'A path through a program that traverses at least one edge not included in any other path.',
        },
      ],
      examPoints: [
        'State all three formulas for computing Cyclomatic Complexity, $V(G)$.',
        'Define a predicate node and explain how it relates to cyclomatic complexity.',
        'Draw a Control Flow Graph for a code snippet, compute $V(G)$, and list the basis paths.',
      ],
      questions: [
        {
          prompt: 'Explain Basis Path Testing. Given a procedural code snippet, show how to construct a control flow graph, compute cyclomatic complexity, and derive independent paths.',
          plan: ANSWER_PLAN(
            'Definition of Basis Path Testing and McCabe’s cyclomatic complexity',
            'Control Flow Graph showing nodes, edges, and predicate branches',
            'Explanation of all three formulas: E - N + 2, P + 1, and regions',
            'Step-by-step account eligibility code example with graph and V(G) = 3',
            'Derivation of the 3 basis paths with concrete test input values',
          ),
        },
      ],
      keywords: ['basis path testing', 'cyclomatic complexity', 'McCabe', 'control flow graph', 'predicate node', 'independent paths'],
      remember: [
        { prompt: 'What are the two common formulas for Cyclomatic Complexity?', answer: 'V(G) = E - N + 2 and V(G) = P + 1.' },
        { prompt: 'What does V(G) represent in basis path testing?', answer: 'The exact number of independent paths needed to test the basis set.' },
        { prompt: 'What is a predicate node in a control flow graph?', answer: 'A node containing a conditional decision with two or more outgoing edges.' },
      ],
    },

    // ------------------------------------------------------------------
    'control-structure-testing': {
      difficulty: 'hard',
      intro:
        'Control structure testing broadens basis path testing by examining conditions, data interactions, and loops to uncover logic errors in structured programming constructs.',
      definition:
        '**Control Structure Testing** is a family of white-box testing techniques that verify specific programming control structures, including **Condition Testing** for boolean logic, **Data Flow Testing** for variable lifecycles, and **Loop Testing** for iterative statements.',
      simpleExplanation: {
        text: 'Basis path testing covers basic routes through code. Control structure testing zooms in on specific trouble spots: checking boolean expressions with multiple `AND`/`OR` conditions, tracing variables from creation to deletion, and testing loops at their boundary limits.',
        analogy:
          'Inspecting a suspension bridge: Basis path testing verifies traffic can cross the bridge. Control structure testing inspects individual support cables under wind load (condition), traces load stress across the roadway (data flow), and stress-tests expansion joints under extreme temperature cycles (loop testing).',
      },
      visual: {
        type: 'hierarchy',
        title: 'The Three Branches of Control Structure Testing',
        root: 'Control Structure Testing',
        children: [
          {
            label: 'Condition Testing',
            note: 'Tests individual boolean conditions and relational operators (Branch Testing, Domain Testing)',
          },
          {
            label: 'Data Flow Testing',
            note: 'Traces variable lifecycles: definition (d), usage (u), and deallocation (k) (DU-chains)',
          },
          {
            label: 'Loop Testing',
            note: 'Focuses on iterative constructs: Simple loops, Nested loops, Concatenated loops, Unstructured loops',
          },
        ],
      },
      explanation: [
        { heading: '1. Condition Testing' },
        {
          list: [
            'Targets logical conditions contained in program decisions (e.g., `if (A || B && C)`).',
            'Uncovers errors in boolean operators (`AND`, `OR`, `NOT`), relational operators (`<`, `<=`, `==`, `!=`), and boolean variable states.',
            'Techniques include **Branch Testing** (verifies True/False outcomes) and **Condition/Decision Coverage** (exercises every sub-expression independently).',
          ],
        },
        { heading: '2. Data Flow Testing' },
        {
          list: [
            'Selects test paths based on the lifecycle of variables: where they are defined, used, and cleared.',
            '**Definition (d)**: Variable receives a value (e.g., `x = 10` or `scanf("%d", &x)`).',
            '**Usage (u)**: Variable is read in a computation ($c$-use) or a predicate condition ($p$-use).',
            '**Kill (k)**: Variable is deallocated or goes out of scope.',
            'Catches bugs like variables used before initialization, or assigned values that are overwritten before being read.',
          ],
        },
        { heading: '3. Loop Testing (Simple Loops)' },
        {
          list: [
            'Loops are common sources of off-by-one errors and boundary defects.',
            'For a simple loop with maximum iterations $n$, test cases must verify:',
            '1. Skip the loop entirely (0 iterations).',
            '2. Pass through the loop once (1 iteration).',
            '3. Pass through the loop twice (2 iterations).',
            '4. A typical pass through the loop ($m$ iterations, where $m < n$).',
            '5. Boundary checks: $n - 1$, $n$, and $n + 1$ iterations.',
          ],
        },
      ],
      example: {
        title: 'Control Structure Testing of a Batch Invoice Processor',
        input: 'Testing a loop that processes up to 100 invoice records in a batch.',
        output: `Condition Test : 
• if (invoiceAmount > 50000 && isApproved)
• Test combinations: (T, T), (T, F), (F, T), (F, F) to verify both boolean conditions independently.

Data Flow Test : 
• Track variable 'totalTax': Defined at Line 5 → used in loop at Line 14 → verified no paths read it prior to Line 5.

Loop Test (Max n = 100) : 
• Tests run for: 0 records (empty batch), 1 record, 2 records, 50 records (typical), 99 records, 100 records (limit), 101 records (overflow check).`,
        explanation:
          'Demonstrates how condition testing verifies boolean logic, data flow tracks variable lifecycles, and loop testing checks iteration boundaries.',
      },
      keyPoints: [
        'Control structure testing broadens basis path testing to target specific logic structures.',
        'Condition testing checks boolean operators, relational checks, and decision branches.',
        'Data flow testing tracks variable lifecycles (definition-use chains) to find uninitialized or overwritten variables.',
        'Loop testing verifies iterative constructs at 0, 1, 2, typical, $n-1$, $n$, and $n+1$ iterations.',
        'Uncovers subtle boundary, logical, and variable lifecycle defects.',
      ],
      importantTerms: [
        {
          term: 'Condition Testing',
          meaning: 'A test-case design technique that exercises boolean logic conditions in program modules.',
        },
        {
          term: 'Data Flow Testing',
          meaning: 'A testing method that selects test paths based on where variables are defined and used.',
        },
        {
          term: 'DU-Chain (Definition-Use Chain)',
          meaning: 'The execution path connecting where a variable is assigned a value to where that value is read.',
        },
      ],
      examPoints: [
        'Describe the three techniques of Control Structure Testing (Condition, Data Flow, Loop).',
        'List the specific test cases required to test a simple loop of maximum count $n$.',
        'Explain what a Definition-Use (DU) chain is in data flow testing.',
      ],
      questions: [
        {
          prompt: 'What is Control Structure Testing? Explain Condition Testing, Data Flow Testing, and Loop Testing with examples.',
          plan: ANSWER_PLAN(
            'Definition of control structure testing and limitations of simple path testing',
            'Hierarchy diagram showing Condition, Data Flow, and Loop testing branches',
            'Detailed breakdown of Condition testing (boolean/relational) and Data Flow (d-u-k lifecycles)',
            'Loop testing rules for simple loops (0, 1, 2, m, n-1, n, n+1 iterations)',
            'Batch invoice processing application example',
          ),
        },
      ],
      keywords: ['control structure testing', 'condition testing', 'data flow testing', 'loop testing', 'DU-chain', 'loop boundaries'],
      remember: [
        { prompt: 'What boundary iterations must be tested for a simple loop of size n?', answer: '0, 1, 2, typical, n-1, n, and n+1 iterations.' },
        { prompt: 'What does data flow testing track?', answer: 'The lifecycles of variables: where they are defined, used, and deallocated.' },
        { prompt: 'What does condition testing target?', answer: 'The logical conditions and relational operators inside program decisions.' },
      ],
    },

    // ------------------------------------------------------------------
    'black-box-testing': {
      difficulty: 'medium',
      intro:
        'Black-box testing verifies functional behavior without looking at source code. Testers supply inputs and verify that outputs match requirements.',
      definition:
        '**Black-Box Testing** (also called **Behavioral Testing**) is a test-case design philosophy that evaluates the functional requirements of software without knowledge of internal code logic. It focuses on the input domain and output behavior to identify interface, functional, and performance defects.',
      simpleExplanation: {
        text: 'Imagine testing an automated teller machine (ATM). You insert your card, type your PIN, and request $100. You do not need to know what chips, memory addresses, or programming languages run inside the ATM; you only care that the machine delivers the correct cash and prints an accurate receipt.',
        analogy:
          'Operating a microwave oven: You press "Defrost" and set 2 minutes. You verify the food warms up properly without needing to understand the microwave radiation circuitry inside.',
      },
      visual: {
        type: 'flow',
        title: 'Black-Box Input-Output Verification Model',
        steps: [
          { label: 'Test Input', note: 'Supplies test data from partitions and boundary values' },
          { label: 'Black Box (System under Test)', note: 'Internal source code is hidden; processes data per functional rules' },
          { label: 'Observed Output', note: 'Captures screen displays, database updates, return codes' },
          { label: 'Evaluation against SRS', note: 'Compares actual output with expected output; logs defects on mismatch' },
        ],
      },
      explanation: [
        { heading: 'What Black-Box Testing Uncovers (Pressman)' },
        {
          list: [
            'Incorrect or missing software functions.',
            'User interface errors and form validation issues.',
            'Errors in external data structures or database access.',
            'Behavior and performance flaws under various operating conditions.',
            'Initialization and termination errors.',
          ],
        },
        { heading: '1. Equivalence Partitioning' },
        {
          list: [
            'Divides the input domain into distinct classes of data: **Valid Equivalence Classes** (valid inputs) and **Invalid Equivalence Classes** (erroneous inputs).',
            'Assumes that if one test value in a class exposes a defect, all other values in that same class will behave the same way.',
            'Reduces an infinite set of potential test inputs to a small, manageable number of representative test cases.',
          ],
        },
        { heading: '2. Boundary Value Analysis (BVA)' },
        {
          list: [
            'Complements equivalence partitioning by focusing testing on the edges of input classes rather than the center.',
            'Experience shows that the majority of software defects occur at boundary thresholds.',
            'For an input range $[a, b]$, BVA tests values: $a$, $a+1$, $b-1$, $b$, along with values just outside the boundaries: $a-1$ and $b+1$.',
          ],
        },
        { heading: '3. Decision Table Testing' },
        {
          list: [
            'A structured technique that models complex business logic involving multiple combinations of inputs (conditions) and resulting actions.',
            'Conditions form the upper rows; actions form the lower rows; columns define unique test rule combinations.',
          ],
        },
      ],
      example: {
        title: 'Testing a Student Age Input Field (Range 18 to 30)',
        input: 'A university enrollment form requires age to be between 18 and 30 inclusive.',
        output: `Equivalence Partitioning:
• Invalid Class 1 : age < 18 (e.g., 14) → Expect "Too young" error.
• Valid Class     : 18 <= age <= 30 (e.g., 24) → Expect "Accepted".
• Invalid Class 2 : age > 30 (e.g., 42) → Expect "Too old" error.

Boundary Value Analysis (BVA):
• Left Boundary   : 17 (invalid), 18 (valid boundary), 19 (valid inner).
• Right Boundary  : 29 (valid inner), 30 (valid boundary), 31 (invalid).`,
        explanation:
          'Demonstrates how equivalence partitioning divides inputs into classes, while BVA targets the boundaries where bugs commonly occur.',
      },
      keyPoints: [
        'Black-box testing focuses on inputs, outputs, and functional behavior without inspecting code.',
        'Identifies missing functions, interface flaws, database errors, and initialization defects.',
        'Equivalence Partitioning divides input ranges into valid and invalid data classes.',
        'Boundary Value Analysis tests the edges of input ranges, where defects occur most frequently.',
        'Decision Table testing maps combinations of input conditions to resulting system actions.',
      ],
      importantTerms: [
        {
          term: 'Equivalence Partitioning',
          meaning: 'A black-box testing technique that divides the input domain into data classes from which representative test cases are chosen.',
        },
        {
          term: 'Boundary Value Analysis (BVA)',
          meaning: 'A test-case design technique that selects test values at the edges of input equivalence classes.',
        },
        {
          term: 'Decision Table',
          meaning: 'A matrix modeling complex business logic by linking combinations of conditions to resulting actions.',
        },
      ],
      examPoints: [
        'Define Black-Box Testing and contrast it with White-Box Testing.',
        'Explain Equivalence Partitioning with valid and invalid partition examples.',
        'Explain Boundary Value Analysis and list the test points for an input range $[a, b]$.',
        'Construct a decision table for a realistic business logic scenario.',
      ],
      questions: [
        {
          prompt: 'What is Black-Box Testing? Explain Equivalence Partitioning and Boundary Value Analysis with a complete numerical example.',
          plan: ANSWER_PLAN(
            'Definition of Black-Box (behavioral) testing and external functional focus',
            'Flowchart showing Input → System under Test → Output evaluation',
            'Detailed explanation of Equivalence Partitioning (valid vs invalid classes)',
            'Explanation of Boundary Value Analysis with the a-1, a, a+1, b-1, b, b+1 formula',
            'Student enrollment age input (18 to 30) application example',
          ),
        },
      ],
      keywords: ['black-box testing', 'equivalence partitioning', 'boundary value analysis', 'BVA', 'decision table', 'behavioral testing'],
      remember: [
        { prompt: 'What values does Boundary Value Analysis test for range [a, b]?', answer: 'a-1, a, a+1, and b-1, b, b+1.' },
        { prompt: 'What is the purpose of Equivalence Partitioning?', answer: 'To reduce a large set of test inputs into a small set of representative test cases.' },
        { prompt: 'Does black-box testing require knowledge of internal source code?', answer: 'No, it focuses entirely on inputs, outputs, and functional behavior.' },
      ],
    },

    // ------------------------------------------------------------------
    'model-based-testing': {
      difficulty: 'hard',
      intro:
        'Software often behaves like a state machine, where actions depend on current system state. Model-based testing uses behavioral models to automatically derive test scenarios.',
      definition:
        '**Model-Based Testing (MBT)** is a testing technique in which test cases are systematically derived from a formal behavioral model (such as a finite state machine, statechart, or UML activity diagram) that describes the expected operational states and transitions of a software system.',
      simpleExplanation: {
        text: 'Think of an electric elevator: If you press "5th Floor" while the elevator is moving up, it queues the stop. If you press it while the emergency brake is active, it ignores the button. Model-based testing maps out every possible state and transition, generating test scenarios to verify the system handles every path correctly.',
        analogy:
          'A board game rulebook: The rulebook models every player turn, dice roll, and square. Model-based testing plays through every valid and invalid move sequence to confirm no rule contradiction breaks the game.',
      },
      visual: {
        type: 'flow',
        title: 'Model-Based State Transition Testing Flow',
        steps: [
          { label: 'State: Logged Out', note: 'Initial system state; accepts credentials' },
          { label: 'Transition: Submit Valid Login', note: 'Triggers authentication check and state shift' },
          { label: 'State: Logged In (Active)', note: 'Authenticated state; enables dashboard access and cart operations' },
          { label: 'Transition: Session Inactive 15 mins', note: 'Timer triggers automatic logout transition' },
          { label: 'State: Logged Out (Locked)', note: 'Terminal return; displays session timeout message' },
        ],
      },
      explanation: [
        { heading: 'Core Process of Model-Based Testing (Pressman)' },
        {
          list: [
            '**Step 1: Understand system behavior** — Analyze how the application responds to external events across its lifecycle.',
            '**Step 2: Construct the behavioral model** — Create a formal Finite State Machine (FSM) or state transition diagram defining: (1) All possible states; (2) Events that trigger transitions; (3) Guard conditions; (4) Resulting system actions.',
            '**Step 3: Generate test cases from the model** — Derive test paths that exercise: (1) Every state at least once; (2) Every state transition at least once; (3) Invalid event sequences from specific states.',
            '**Step 4: Execute tests and evaluate outputs** — Run the derived scenarios against the software and compare actual state transitions with the model.',
          ],
        },
        { heading: 'Advantages and Limitations of Model-Based Testing' },
        {
          table: {
            columns: ['Dimension', 'Advantages', 'Limitations'],
            rows: [
              ['Test Generation', 'Automates test-case creation from formal models, ensuring thorough state coverage.', 'Building accurate behavioral models requires significant upfront engineering effort.'],
              ['Requirements Traceability', 'Directly links states and transitions to business requirements.', 'If the behavioral model contains design flaws, all generated test cases will also be flawed.'],
              ['Maintenance', 'When system requirements change, updating the model automatically regenerates test cases.', 'State space explosion can make modeling extremely complex systems difficult.'],
            ],
          },
        },
      ],
      example: {
        title: 'Model-Based Testing of an Online Bank ATM Session',
        input: 'States: `CardInserted`, `PINEntered`, `AccountActive`, `DispensingCash`.',
        output: `State Transition Model:
1. State [Idle] + Event (InsertCard) → State [CardInserted].
2. State [CardInserted] + Event (EnterCorrectPIN) → State [AccountActive].
3. State [CardInserted] + Event (EnterWrongPIN 3 Times) → Transition to [CardConfiscated] → Return to [Idle].
4. State [AccountActive] + Event (RequestValidCash) → State [DispensingCash] → Return to [Idle].

Derived Test Scenario:
• Test Path: Idle → CardInserted → WrongPIN → WrongPIN → WrongPIN → Verify CardConfiscated.`,
        explanation:
          'Derives test cases directly from state transitions to ensure invalid attempts trigger the proper defensive state.',
      },
      keyPoints: [
        'Model-based testing derives test cases directly from formal behavioral models.',
        'Uses Finite State Machines, UML statecharts, or activity models.',
        'Exercises all states, valid transitions, and invalid event sequences.',
        'Automates test generation and links test cases directly to behavioral requirements.',
        'Well-suited for state-driven applications like banking, embedded devices, and control systems.',
      ],
      importantTerms: [
        {
          term: 'Finite State Machine (FSM)',
          meaning: 'A mathematical model of computation consisting of a set of states, inputs, and transitions between states.',
        },
        {
          term: 'State Transition',
          meaning: 'A change from one operational state to another triggered by an event.',
        },
        {
          term: 'State Space Explosion',
          meaning: 'A challenge where complex systems produce too many states and combinations to model easily.',
        },
      ],
      examPoints: [
        'Define Model-Based Testing (MBT) and state its advantages over manual test design.',
        'Draw a Finite State Machine (FSM) for a user login or ATM session and derive test paths from it.',
        'Explain how model-based testing handles invalid state transitions.',
      ],
      questions: [
        {
          prompt: 'Explain Model-Based Testing (MBT). Describe how test cases are derived from behavioral state models with an appropriate diagram.',
          plan: ANSWER_PLAN(
            'Definition of Model-Based Testing and behavioral modeling (FSM)',
            'State Transition Diagram (Idle → Authenticating → Active → Logging Out)',
            'Step-by-step MBT process: model construction, path coverage, and test generation',
            'ATM session state machine example with valid and invalid PIN sequences',
            'Discussion of advantages and state space explosion trade-offs',
          ),
        },
      ],
      keywords: ['model-based testing', 'MBT', 'finite state machine', 'FSM', 'state transition', 'behavioral model', 'statecharts'],
      remember: [
        { prompt: 'What is the primary artifact used to generate tests in MBT?', answer: 'A behavioral model, such as a Finite State Machine or statechart.' },
        { prompt: 'What coverage criteria are used in model-based testing?', answer: 'Covering every state at least once, every transition at least once, and exercising invalid event paths.' },
        { prompt: 'What is state space explosion?', answer: 'A modeling challenge where systems with many variables produce an overwhelming number of possible states.' },
      ],
    },
  },
}