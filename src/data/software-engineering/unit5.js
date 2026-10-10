// src/data/software-engineering/unit5.js
// Software Engineering Practices — Unit V: AI-Assisted Software Development.
// Aligned with the official 24CSU5CC syllabus (Tom Taulli / Michael Kofler reference standard).
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
    'Unit V introduces AI-Assisted Software Development—leveraging generative AI and large language models as engineering assistants across the SDLC. It covers the fundamentals of prompt engineering (Context, Instructions, Input Content, Output Format), early lifecycle phases (Brainstorming, Market Research, Competition Analysis, Requirements Elicitation, Project Planning), and late-stage engineering activities (Debugging, Testing, Documentation, Code Review, and Deployment). Throughout, AI is positioned as a productivity assistant requiring human verification and engineering discipline.',

  map: [
    {
      label: 'Prompt Engineering Foundations',
      topics: [
        'prompt',
        'context',
        'instructions',
        'input-of-content',
        'format',
      ],
    },
    {
      label: 'Ideas, Planning, and Requirements',
      topics: [
        'brainstorming',
        'market-research',
        'competition',
        'requirements',
        'approaches-to-project-planning',
      ],
    },
    {
      label: 'Debugging, Testing, and Deployment',
      topics: [
        'debugging',
        'documentation',
        'code-review',
        'deployment',
      ],
    },
  ],

  topics: {
    // ------------------------------------------------------------------
    prompt: {
      difficulty: 'easy',
      intro:
        'Large Language Models respond based on the quality of input they receive. Prompt engineering provides the systematic discipline of designing inputs to produce accurate, reproducible software engineering results.',
      definition:
        '**Prompt Engineering** is the practice of structuring, refining, and designing textual inputs (prompts) given to an artificial intelligence model to elicit accurate, context-aware, reproducible, and production-grade software development deliverables.',
      simpleExplanation: {
        text: 'Giving a vague prompt to an AI model like "build a login page" produces generic, unhelpful code. Prompt engineering treats the prompt like an engineering specification: providing context, exact constraints, inputs, and desired output formats so the AI produces working, maintainable software.',
        analogy:
          'Delegating a task to a junior software developer: If you say "fix the database", they will not know where to start. If you specify the schema, describe the slow query, provide the execution logs, and request an optimized SQL index, they can deliver the exact solution needed.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Core Anatomy of an Effective Software Engineering Prompt',
        root: 'Prompt Architecture',
        children: [
          {
            label: '1. Context',
            note: 'Tech stack, role, architecture, existing codebase constraints',
          },
          {
            label: '2. Instructions',
            note: 'Specific objective, action verbs, negative constraints (what NOT to do)',
          },
          {
            label: '3. Input Content',
            note: 'Source code snippet, error logs, user stories, API contracts',
          },
          {
            label: '4. Output Format',
            note: 'TypeScript interface, JSON, Markdown table, unit test file',
          },
        ],
      },
      explanation: [
        { heading: 'The Role of Prompt Engineering in Software Engineering' },
        {
          list: [
            '**Systematic Communication** — Replaces trial-and-error chatter with structured queries that generate deterministic, clean code artifacts.',
            '**Reducing Hallucinations** — Providing clear boundaries, technical context, and explicit constraints prevents the AI from inventing non-existent APIs or libraries.',
            '**Accelerating the SDLC** — Speeds up boilerplate generation, test-case drafting, documentation, and refactoring while preserving developer oversight.',
          ],
        },
        { heading: 'Weak Prompts vs. Engineered Prompts' },
        {
          table: {
            columns: ['Dimension', 'Naive / Weak Prompt', 'Engineered Software Prompt'],
            rows: [
              ['Input', '"Write an authentication function."', 'Context + Constraints + Input Schema + Target Output.'],
              ['Context Provided', 'None (model guesses language and framework).', 'Node.js, Express, TypeScript, JWT with RS256 signing.'],
              ['Constraints', 'None specified.', 'No external auth libraries; bcrypt salt rounds = 12; throw custom AuthError.'],
              ['Result', 'Generic JavaScript with security gaps and obsolete packages.', 'Production-grade, type-safe TypeScript module with secure error handling.'],
            ],
          },
        },
        { heading: 'Core Rules for Prompting in Software Engineering' },
        {
          list: [
            '**Be Specific and Direct** — Use precise technical terminology (e.g., "idempotent REST endpoint" instead of "safe link").',
            '**State Constraints Explicitly** — Mention forbidden libraries, legacy versions, memory limits, and coding standards.',
            '**Provide Few-Shot Examples** — Showing the AI one example of your expected code style aligns the output with existing codebase patterns.',
          ],
        },
      ],
      example: {
        title: 'Prompt Engineering for a React Component',
        input: 'Developer needs an accessible modal dialog in React/Vite.',
        output: `Context      : React 18, Tailwind CSS, TypeScript in a Vite application.
Instruction  : Create an accessible modal dialog component following WAI-ARIA guidelines.
Constraints  : Do not install external UI libraries; handle 'Escape' key press and trap focus.
Output Format: Return a single .tsx file with clean props interface and typed handlers.`,
        explanation:
          'Breaking the prompt into context, instructions, constraints, and format produces production-ready code on the first attempt.',
      },
      keyPoints: [
        'Prompt engineering designs structured inputs to elicit accurate, reliable AI responses.',
        'Combines four pillars: Context, Instructions, Input Content, and Output Format.',
        'Prevents AI hallucinations by supplying explicit constraints and technical boundaries.',
        'Treats prompts as formal engineering specifications rather than casual conversational chat.',
        'Requires continuous developer verification of generated code and architectures.',
      ],
      importantTerms: [
        {
          term: 'Prompt Engineering',
          meaning: 'The discipline of designing structured inputs to guide generative AI models toward accurate, production-ready outputs.',
        },
        {
          term: 'Hallucination',
          meaning: 'A phenomenon where an AI model generates plausible-sounding but factually incorrect or non-existent code, APIs, or facts.',
        },
        {
          term: 'Few-Shot Prompting',
          meaning: 'Providing one or more input-output examples in the prompt to demonstrate the desired format and style.',
        },
      ],
      examPoints: [
        'Define Prompt Engineering in the context of software development.',
        'Draw the prompt architecture hierarchy (Context, Instructions, Input, Format).',
        'Compare a weak prompt with an engineered prompt using an example.',
      ],
      questions: [
        {
          prompt: 'What is Prompt Engineering? Explain its significance in AI-assisted software development with a neat diagram.',
          plan: ANSWER_PLAN(
            'Definition of prompt engineering in software development',
            'Hierarchy diagram showing Context, Instructions, Input, Output Format',
            'Detailed explanation of why prompt engineering prevents hallucinations and ensures type safety',
            'React modal dialog prompt comparison example',
            'Core engineering principles: specificity, negative constraints, and human verification',
          ),
        },
      ],
      keywords: ['prompt engineering', 'context', 'instructions', 'input content', 'output format', 'hallucination'],
      remember: [
        { prompt: 'What are the four core components of an engineered prompt?', answer: 'Context, Instructions, Input Content, and Output Format.' },
        { prompt: 'What is an AI hallucination in software development?', answer: 'When an AI model invents non-existent functions, libraries, syntax, or APIs.' },
        { prompt: 'Why are negative constraints useful in prompts?', answer: 'They explicitly tell the AI what NOT to do (e.g., "do not use external libraries").' },
      ],
    },

    // ------------------------------------------------------------------
    context: {
      difficulty: 'easy',
      intro:
        'Context is the background information that anchors an AI model. Without context, an AI model produces generic answers that rarely match your project architecture.',
      definition:
        '**Prompt Context** is the framing information provided to an AI model—including target system architecture, tech stack, runtime environment, user personas, and project constraints—that grounds the model’s reasoning in the specific realities of the application.',
      simpleExplanation: {
        text: 'Context is like telling a new developer: "We are working on an offline-first mobile app using React Native, targeting low-end Android phones in rural areas." That background completely changes how they write code compared to building a cloud dashboard for high-speed fiber internet.',
        analogy:
          'A doctor reviewing a patient’s medical history before prescribing medicine. Knowing the patient has a penicillin allergy changes what prescription is safe.',
      },
      visual: {
        type: 'flow',
        title: 'Context Grounding Flow in AI Development',
        steps: [
          { label: 'Role & Persona', note: 'Senior Software Engineer, Security Auditor, QA Architect' },
          { label: 'System Environment', note: 'Node.js 20 LTS, PostgreSQL 16, AWS ECS, Docker' },
          { label: 'Business Domain', note: 'Banking ledger with zero-loss regulatory compliance' },
          { label: 'Architectural Pattern', note: 'Clean Architecture, repository pattern, decoupled interfaces' },
        ],
      },
      explanation: [
        { heading: 'Key Elements of Software Context' },
        {
          list: [
            '**Role Definition** — "Act as a Senior AppSec Engineer..." sets the perspective and depth of the analysis.',
            '**Technical Environment** — Exact language versions, frameworks, database engines, and runtime dependencies.',
            '**Domain Rules & Standards** — Industry regulations (e.g., GDPR, HIPAA, PCI-DSS), enterprise style guides, and performance limits.',
            '**Architectural Paradigm** — Specifying patterns (MVC, Microservices, Hexagonal) ensures generated modules integrate cleanly.',
          ],
        },
      ],
      example: {
        title: 'Context in a Student Placement Portal',
        input: 'Generating a database migration script.',
        output: `Context provided to AI:
• Project: College Placement Management System.
• Tech Stack: PostgreSQL 15, Prisma ORM, Node.js backend.
• Existing Tables: 'Students' (id, reg_no, dept), 'Companies' (id, name, min_cgpa).
• Task: Add a migration to track job offers with status ('applied', 'shortlisted', 'selected').`,
        explanation:
          'Because exact table names and database versions were supplied, the AI generates accurate Prisma schema code matching existing foreign keys.',
      },
      keyPoints: [
        'Context grounds the AI model in the realities of your tech stack and domain.',
        'Includes role definitions, runtime versions, architectural patterns, and business constraints.',
        'Prevents generic, mismatched code suggestions.',
        'Ensures generated code aligns with existing database schemas and conventions.',
      ],
      importantTerms: [
        {
          term: 'Context Window',
          meaning: 'The maximum amount of text (tokens) an AI model can process in a single prompt and response cycle.',
        },
        {
          term: 'System Prompt',
          meaning: 'High-level instructions and context that set the AI’s overarching behavior, role, and boundaries.',
        },
      ],
      examPoints: [
        'Define Prompt Context and explain its role in AI-assisted development.',
        'List four essential pieces of technical context needed when generating code.',
        'Explain how providing context reduces AI hallucinations.',
      ],
      questions: [
        {
          prompt: 'What is Prompt Context? Explain why context is essential when generating code using AI, with a realistic example.',
          plan: ANSWER_PLAN(
            'Definition of prompt context and role definition',
            'Flow diagram of context grounding (Role → Environment → Domain → Pattern)',
            'Breakdown of technical context elements: stack, versions, domain rules, patterns',
            'College placement portal database migration example',
            'Summary of how context prevents hallucinated libraries and broken imports',
          ),
        },
      ],
      keywords: ['prompt context', 'context window', 'system prompt', 'role definition', 'tech stack', 'domain rules'],
      remember: [
        { prompt: 'What is prompt context?', answer: 'The background information (tech stack, role, constraints) that frames the AI’s response.' },
        { prompt: 'What happens if you omit context from a prompt?', answer: 'The AI guesses defaults, leading to incompatible code and incorrect assumptions.' },
        { prompt: 'What is a context window?', answer: 'The maximum amount of input and output text (measured in tokens) an AI model can process at once.' },
      ],
    },

    // ------------------------------------------------------------------
    instructions: {
      difficulty: 'easy',
      intro:
        'Instructions are the core action directives in a prompt. They tell the model exactly what task to execute, how to perform it, and what constraints to follow.',
      definition:
        '**Prompt Instructions** are the explicit task directives, action verbs, and operational constraints provided to an AI model that specify what software engineering task to perform, what methods to follow, and what behaviors to avoid.',
      simpleExplanation: {
        text: 'If context is the setting of a movie, instructions are the director telling the actor what to do. Instructions must be clear and specific: "Refactor this function to reduce complexity, do not change the return type, and add inline comments for every condition."',
        analogy:
          'A recipe step: "Whisk egg whites until stiff peaks form; do not let any yolk mix in." The positive instruction states the goal; the negative constraint prevents failure.',
      },
      visual: {
        type: 'process',
        title: 'Structuring Engineering Instructions',
        steps: [
          { label: '1. Primary Directive', detail: 'Start with a strong action verb (Refactor, Generate, Analyze, Debug)' },
          { label: '2. Step-by-Step Guidance', detail: 'Break complex workflows into numbered sub-steps' },
          { label: '3. Positive Constraints', detail: 'State mandatory requirements (e.g., use async/await, handle nulls)' },
          { label: '4. Negative Constraints', detail: 'State forbidden behaviors (e.g., do not use any external dependencies)' },
        ],
      },
      explanation: [
        { heading: 'Anatomy of Strong Software Instructions' },
        {
          list: [
            '**Use Clear Action Verbs** — Use explicit verbs like *Extract*, *Refactor*, *Benchmark*, *Identify*, or *Generate* instead of vague phrases like *Look at this*.',
            '**Use Negative Constraints** — Tell the AI what NOT to do: "Do not import lodash", "Do not modify the database schema", "Do not use deprecated APIs".',
            '**Chain of Thought (Step-by-Step)** — Adding "Think step-by-step before generating code" encourages the AI to plan edge cases before generating the final implementation.',
          ],
        },
      ],
      example: {
        title: 'Refactoring Instructions for Legacy Code',
        input: 'A developer needs to refactor a messy 120-line JavaScript function.',
        output: `Instructions:
1. Extract the nested payment calculation logic into a private helper function.
2. Replace all 'var' declarations with 'const' or 'let'.
3. Preserve the exact public method signature: 'processOrder(order: Order): Receipt'.
4. Do NOT install external packages.
5. Add unit tests for null inputs and negative totals.`,
        explanation:
          'Clear, numbered directives and explicit constraints ensure the AI refactors the code safely without introducing breaking changes.',
      },
      keyPoints: [
        'Instructions provide the explicit action directives guiding the AI’s task execution.',
        'Use precise action verbs: Refactor, Extract, Implement, Verify, Benchmark.',
        'Include negative constraints to prevent unwanted libraries, pattern breaks, or schema changes.',
        'Break multi-step workflows into numbered sub-tasks for more reliable results.',
      ],
      importantTerms: [
        {
          term: 'Negative Constraint',
          meaning: 'An explicit instruction forbidding specific libraries, patterns, or behaviors in the generated output.',
        },
        {
          term: 'Chain-of-Thought Prompting',
          meaning: 'Instructing the AI to explain its reasoning step-by-step before producing the final code or answer.',
        },
      ],
      examPoints: [
        'Define Prompt Instructions and explain their importance in code generation.',
        'Explain the role of negative constraints in preventing unwanted code dependencies.',
        'Give an example of transforming a vague instruction into a precise software directive.',
      ],
      questions: [
        {
          prompt: 'Explain the role of Instructions in Prompt Engineering. How do positive and negative constraints improve code generation?',
          plan: ANSWER_PLAN(
            'Definition of prompt instructions and actionable directives',
            'Instruction structuring process diagram (Directive → Steps → Positive → Negative)',
            'Explanation of action verbs, step-by-step decomposition, and negative constraints',
            'Legacy payment function refactoring instructions example',
            'Benefits: reduced regression risk, clean architecture, and consistent code style',
          ),
        },
      ],
      keywords: ['prompt instructions', 'action verbs', 'negative constraints', 'chain-of-thought', 'refactoring', 'directives'],
      remember: [
        { prompt: 'What is a negative constraint in a prompt?', answer: 'An explicit instruction specifying what the AI must NOT do or use.' },
        { prompt: 'Why are numbered instructions effective?', answer: 'They break complex tasks into logical, sequential steps for the AI to follow.' },
        { prompt: 'Give an example of a precise software action verb.', answer: '"Refactor", "Extract", "Benchmark", or "Decompose".' },
      ],
    },

    // ------------------------------------------------------------------
    'input-of-content': {
      difficulty: 'easy',
      intro:
        'Input content is the raw data, source code, or specification that the AI must analyze or transform. Providing clean, relevant input is essential for high-quality results.',
      definition:
        '**Input Content** is the specific artifact—such as source code, stack traces, database schemas, API specifications, or requirements text—supplied within the prompt for the AI model to analyze, transform, refactor, or test.',
      simpleExplanation: {
        text: 'Input content is the raw material you give to a carpenter. If you want a table, you must provide the wood. If you want an AI to fix a bug, you must provide the exact error message, stack trace, and the relevant lines of code.',
        analogy:
          'Submitting an assignment for grading: You must hand in your actual written essay (input content) alongside the assignment prompt for the teacher to evaluate your work.',
      },
      visual: {
        type: 'flow',
        title: 'Input Content Preparation Pipeline',
        steps: [
          { label: 'Identify Source Artifact', note: 'Isolate the specific file, function, or error log needing attention' },
          { label: 'Sanitize Sensitive Data', note: 'Remove API keys, passwords, customer PII, and internal secrets' },
          { label: 'Prune Irrelevant Code', note: 'Strip out unrelated classes to conserve context window space' },
          { label: 'Delimit Input Clearly', note: 'Wrap content in markdown blocks or XML tags (e.g., ```typescript)' },
        ],
      },
      explanation: [
        { heading: 'Best Practices for Supplying Input Content' },
        {
          list: [
            '**Use Clear Delimiters** — Wrap code snippets in triple backticks (` ``` `) or XML tags (`<source_code>...</source_code>`) so the AI clearly distinguishes instructions from data.',
            '**Sanitize Sensitive Information** — Never paste real passwords, API secret keys, database credentials, or Personally Identifiable Information (PII) into an external AI model.',
            '**Provide Minimal Reproducible Context** — Paste only the functions and type signatures relevant to the issue, keeping the input focused and within context limits.',
          ],
        },
      ],
      example: {
        title: 'Supplying Input Content for Bug Analysis',
        input: 'A Node.js server throws an unhandled promise rejection error.',
        output: `Input Content provided to AI:
<stack_trace>
TypeError: Cannot read properties of undefined (reading 'email')
    at sendWelcomeEmail (/src/services/user.js:42:25)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
</stack_trace>

<source_code>
async function sendWelcomeEmail(userId) {
    const user = await userRepository.findById(userId);
    return mailer.send(user.email, "Welcome!"); // Line 42
}
</source_code>`,
        explanation:
          'Wrapping the stack trace and source code in clear XML tags gives the AI the exact data needed to pinpoint the null-check bug.',
      },
      keyPoints: [
        'Input content provides the raw artifact (code, log, schema) the AI operates on.',
        'Use markdown fences or XML tags to cleanly separate instructions from input data.',
        'Sanitize inputs to protect API keys, credentials, and user data.',
        'Focus inputs on minimal, relevant code snippets to stay within context limits.',
      ],
      importantTerms: [
        {
          term: 'Input Delimiter',
          meaning: 'Characters or tags (like ``` or <tags>) used to separate code and data from instructions in a prompt.',
        },
        {
          term: 'Data Sanitization',
          meaning: 'The process of stripping sensitive data, API keys, and customer info from prompts before sending them to an AI model.',
        },
      ],
      examPoints: [
        'Define Input Content in the context of prompt engineering.',
        'Explain why data sanitization is essential before submitting inputs to an AI tool.',
        'Describe how delimiters help an AI model distinguish instructions from raw data.',
      ],
      questions: [
        {
          prompt: 'What constitutes Input Content in an AI engineering prompt? Discuss security and formatting best practices with an example.',
          plan: ANSWER_PLAN(
            'Definition of input content and target artifacts',
            'Input preparation pipeline diagram (Identify → Sanitize → Prune → Delimit)',
            'Best practices: delimiters (backticks, XML tags), data sanitization (PII, secrets), minimal context',
            'Stack trace and Node.js source code bug input example',
            'Security summary: protecting proprietary data and intellectual property',
          ),
        },
      ],
      keywords: ['input content', 'delimiters', 'data sanitization', 'stack trace', 'source code', 'PII', 'security'],
      remember: [
        { prompt: 'Why should you delimit input content?', answer: 'To help the AI clearly distinguish between instructions to follow and data to analyze.' },
        { prompt: 'What must always be sanitized before prompting an AI?', answer: 'API keys, passwords, database credentials, and customer personal data.' },
        { prompt: 'What is minimal reproducible context?', answer: 'Providing only the lines of code and errors necessary to understand the issue.' },
      ],
    },

    // ------------------------------------------------------------------
    format: {
      difficulty: 'easy',
      intro:
        'Even accurate answers are unhelpful if delivered as messy paragraphs. Specifying the output format ensures the AI produces structured, directly usable results.',
      definition:
        '**Output Format** is the explicit specification in a prompt defining the structure, syntax, and presentation of the AI’s response—such as raw JSON, a TypeScript interface, a Markdown table, or clean code without conversational text.',
      simpleExplanation: {
        text: 'If you ask an AI for a list of test cases, it might write five long conversational paragraphs. If you specify: "Return a Markdown table with columns: Test ID, Input, Expected Output, and Pass/Fail Criteria", you get a clean table ready to paste directly into your test report.',
        analogy:
          'Specifying a file export format: When exporting a report, you choose whether you need a PDF, an Excel sheet, or a CSV file based on how you plan to use the data.',
      },
      visual: {
        type: 'comparison',
        title: 'Unstructured Output vs Structured Formatted Output',
        table: {
          columns: ['Dimension', 'Unstructured / Default Output', 'Specified Structured Output Format'],
          rows: [
            ['Prompt Specification', '"Give me test cases for password check."', '"Return test cases in a Markdown table with columns: ID, Input, Expected, Category."'],
            ['AI Response Style', 'Conversational text, conversational apologies, mixed bullet points.', 'Clean Markdown table or valid JSON payload.'],
            ['Downstream Utility', 'Requires manual copy-pasting, reading, and reformatting.', 'Can be piped directly into testing tools, CI pipelines, or documentation.'],
            ['Parsing Reliability', 'Unpredictable; fails programmatic parsing scripts.', 'Deterministic syntax matching JSON, YAML, or language parsers.'],
          ],
        },
      },
      explanation: [
        { heading: 'Common Software Output Formats' },
        {
          list: [
            '**Pure Code Blocks** — "Return ONLY valid TypeScript code inside a single code block. Do NOT include greetings, intro text, or explanations."',
            '**JSON / Schema Conformance** — "Output a JSON array where each object conforms to `{ testId: string, input: any, expected: any }`."',
            '**Markdown Tables** — Ideal for test plans, competitor analyses, and risk matrices.',
            '**Patch / Diff Format** — "Provide the solution as a standard Git unified diff patch."',
          ],
        },
      ],
      example: {
        title: 'Specifying Output Format for API Endpoint Specs',
        input: 'Generating API documentation for user login.',
        output: `Output Format Directive:
"Format the response as an OpenAPI 3.0 YAML specification block. Do not include markdown commentary."

AI Response:
openapi: 3.0.0
paths:
  /api/login:
    post:
      summary: Authenticate user
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                email: { type: string }
                password: { type: string }`,
        explanation:
          'Specifying OpenAPI YAML allows the response to be saved directly into documentation tools without manual editing.',
      },
      keyPoints: [
        'Specifying output format ensures AI responses are structured and immediately usable.',
        'Common formats include pure code blocks, JSON schemas, Markdown tables, and OpenAPI specs.',
        'Prevents conversational preamble and apologies that break automated tool chains.',
        'Enables programmatic parsing in CI/CD pipelines and developer scripts.',
      ],
      importantTerms: [
        {
          term: 'Output Schema',
          meaning: 'A formal structural definition (e.g., JSON Schema) that the AI must match in its generated response.',
        },
        {
          term: 'Zero-Preamble Directive',
          meaning: 'An instruction telling the AI to omit conversational filler and return only the requested code or data.',
        },
      ],
      examPoints: [
        'Explain why specifying the Output Format is essential in software prompt engineering.',
        'List three structured formats commonly requested from AI coding assistants.',
        'Show how an output format directive ensures code can be parsed programmatically.',
      ],
      questions: [
        {
          prompt: 'Why is Output Format specification critical in Prompt Engineering? Provide examples of structured output formats used in software development.',
          plan: ANSWER_PLAN(
            'Definition of output format and its role in automated developer workflows',
            'Comparison table contrasting unstructured text with structured formats',
            'Discussion of formats: pure code blocks, JSON schemas, Markdown tables, Git diffs',
            'OpenAPI 3.0 YAML login endpoint specification example',
            'Summary of why zero-preamble directives streamline developer productivity',
          ),
        },
      ],
      keywords: ['output format', 'JSON schema', 'markdown table', 'zero-preamble', 'OpenAPI', 'diff format'],
      remember: [
        { prompt: 'Why specify an output format in prompts?', answer: 'To get structured, predictable responses that can be used directly without manual cleanup.' },
        { prompt: 'What is a zero-preamble instruction?', answer: 'Telling the AI to omit conversational greetings and explanations, returning only raw code or data.' },
        { prompt: 'Name three popular output formats for AI coding tasks.', answer: 'JSON objects, Markdown comparison tables, and raw code blocks.' },
      ],
    },

    // ------------------------------------------------------------------
    brainstorming: {
      difficulty: 'medium',
      intro:
        'Brainstorming helps teams explore possibilities before committing to a technical path. AI tools help by generating ideas, identifying alternative approaches, and suggesting edge cases.',
      definition:
        '**AI-Assisted Brainstorming** is the collaborative process of using generative AI to expand the conceptual solution space, generate diverse feature concepts, propose design alternatives, and surface edge cases for human teams to evaluate.',
      simpleExplanation: {
        text: 'During a team brainstorming meeting, people often get stuck debating the first two ideas mentioned. An AI assistant can instantly suggest 20 different feature ideas, architectural approaches, or potential risks, giving the team a much wider variety of options to evaluate.',
        analogy:
          'Throwing a wide fishing net: AI casts a broad net across possibilities, and the human engineering team sorts through the catch, keeping the valuable ideas and throwing back the rest.',
      },
      visual: {
        type: 'process',
        title: 'The AI-Assisted Brainstorming Cycle',
        steps: [
          { label: '1. Frame Problem Space', detail: 'Define user problem, core constraints, target audience, and business goals' },
          { label: '2. Generate Divergent Ideas', detail: 'Prompt AI to suggest 20+ feature concepts and architectural alternatives' },
          { label: '3. Cluster & Group', detail: 'Group generated concepts by themes (e.g., Security, Usability, Performance)' },
          { label: '4. Critical Human Filtering', detail: 'Evaluate ideas against technical feasibility, budget, timeline, and value' },
          { label: '5. Select Core Concepts', detail: 'Refine the top candidates into formal candidate user stories' },
        ],
      },
      explanation: [
        { heading: 'AI-assisted ideas, planning and requirements: an overview' },
        { note: 'The earliest stages of software engineering shape the entire project. Generative AI serves as an active assistant during idea generation, scope definition, and early requirements analysis.' },
        '**AI-Assisted Ideas, Planning, and Requirements** is the collaborative use of large language models to explore project concepts, structure business goals, identify functional requirements, and draft initial project roadmaps—accelerating planning while relying on human engineers for domain validation.',
        'Starting a new software project is often slowed down by a blank page. An AI assistant acts like a brainstorming partner: it suggests feature sets, highlights user concerns, drafts initial user stories, and spots missing requirements, giving the team a structured starting point.',
        { tip: 'An architect sketching initial concepts on tracing paper with an assistant: The assistant rapidly drafts variations of floor plans, and the lead architect selects the safest, most practical designs for the final blueprints.' },
        { visual: {
        type: 'flow',
        title: 'AI Assistance Across Early Lifecycle Stages',
        steps: [
          { label: 'Concept Exploration', note: 'Brainstorm features, identify personas, explore problem spaces' },
          { label: 'Market & Competitor Review', note: 'Analyze public features, spot product differentiators' },
          { label: 'Requirements Drafting', note: 'Translate raw stakeholder ideas into functional user stories' },
          { label: 'Human Verification Gate', note: 'Domain experts audit, prune, and validate all generated items' },
          { label: 'Project Scheduling', note: 'Decompose work breakdown structures (WBS) and map milestone dependencies' },
        ],
      } },
        { heading: 'How AI Assists Early Lifecycle Activities' },
        {
          list: [
            '**Explores Problem Spaces** — Proposes edge cases, user personas, and workflows that human teams might overlook in initial discussions.',
            '**Translates Natural Language to Structure** — Converts unstructured stakeholder meeting notes into categorized functional and non-functional requirements.',
            '**Spots Missing Considerations** — Prompts teams to think about regulatory compliance, accessibility, data privacy, and backup strategies early.',
          ],
        },
        { heading: 'The Human-in-the-Loop Principle' },
        {
          tip: '**The Human-in-the-Loop Principle**: AI models lack real-world domain accountability, business intuition, and legal responsibility. AI outputs must serve as candidate suggestions that human engineers review, refine, and formally approve.',
        },
        { label: 'Example: Scoping an AI-Powered Smart Campus Shuttle App', more: [
          'A university committee wants a shuttle tracking mobile application.',
          { code: `AI Assistance Across Early Steps:
1. Ideas         : Suggests real-time GPS tracking, crowding estimators, and night-time safety alerts.
2. Market Review : Summarizes standard features in public transit tracking tools.
3. Requirements  : Drafts functional user stories: "As a student, I want live ETA notifications."
4. Human Filter  : Engineers reject battery-draining continuous background tracking; approve passive Wi-Fi beacon check-ins.`, lang: 'text' },
          'Shows how AI explores candidate features while human engineers evaluate feasibility and privacy constraints.',
        ] },
        { heading: 'AI-assisted brainstorming' },
        { heading: 'Techniques for AI-Assisted Brainstorming' },
        {
          list: [
            '**Divergent Idea Generation** — Asking the model for creative, unusual, or unconventional approaches to a problem.',
            '**Role-Playing Perspectives** — Asking the AI to brainstorm from different viewpoints: "What features would a visually impaired user want?", "What would an IT security auditor insist on?".',
            '**Negative Brainstorming** — Prompting the AI to consider failure modes: "What could cause this payment module to fail or frustrate users?".',
          ],
        },
      ],
      example: {
        title: 'Brainstorming an Online Bookstore Loyalty Program',
        input: 'A bookstore wants ideas to boost student book engagement.',
        output: `AI Brainstorm Suggestions:
1. Gamified Reading Streaks (Track continuous days reading on mobile app).
2. Textbook Buyback Marketplace (Students resell used textbooks to campus peers).
3. Collaborative Study Circles (Shared annotation layers across digital e-books).
4. Automated Audiobook Narration (Text-to-speech companion during transit).

Human Team Decision:
• Selected: Ideas 1 & 2 (High feasibility, direct student appeal).
• Deferred: Idea 4 (Complex licensing constraints with publishers).`,
        explanation:
          'Illustrates how AI generates diverse possibilities across multiple themes, and the human team selects the ideas with the highest feasibility and value.',
      },
      keyPoints: [
        'AI-assisted brainstorming broadens the solution space with diverse feature ideas.',
        'Role-playing prompts evaluate problems from user, accessibility, and security perspectives.',
        'Negative brainstorming highlights potential risks and failure modes early.',
        'Human teams must evaluate ideas against technical feasibility, budget, and business value.',
        'AI serves as an assistant across early lifecycle phases, helping teams explore ideas faster.',
        'Accelerates brainstorming, market analysis, requirements drafting, and task breakdown.',
        'Translates unstructured stakeholder meeting notes into structured requirement lists.',
        'Human-in-the-loop validation is essential to verify feasibility, legal compliance, and business alignment.',
      ],
      importantTerms: [
        {
          term: 'Divergent Thinking',
          meaning: 'A thought process used to generate creative ideas by exploring many possible solutions.',
        },
        {
          term: 'Negative Brainstorming',
          meaning: 'Brainstorming focused on identifying how a system could fail, crash, or alienate users.',
        },
        {
          term: 'Human-in-the-Loop (HITL)',
          meaning: 'A software workflow where artificial intelligence provides suggestions, but human engineers review and approve decisions.',
        },
        {
          term: 'Idea Space',
          meaning: 'The broad landscape of possible product features, user workflows, and technical architectures considered during early scoping.',
        },
      ],
      examPoints: [
        'Describe the process of AI-assisted brainstorming in software engineering.',
        'Explain how role-playing prompts improve feature discovery.',
        'Explain why human filtering is necessary after AI brainstorming sessions.',
        'Explain how AI assists software engineers during the early phases of the SDLC.',
        'State the Human-in-the-Loop principle and explain why it is essential during planning.',
        'List three risks of relying on AI-generated requirements without human oversight.',
      ],
      questions: [
        {
          prompt: 'Explain the role of AI in software ideation and brainstorming. Detail the steps of an AI-assisted brainstorming workflow.',
          plan: ANSWER_PLAN(
            'Definition and purpose of AI brainstorming in software projects',
            'Process diagram (Frame → Generate → Cluster → Filter → Select)',
            'Techniques: divergent generation, role-playing perspectives, negative brainstorming',
            'Online bookstore student loyalty program example',
            'Importance of human filtering based on feasibility and budget',
          ),
        },
        {
          prompt: 'How does AI assist in software project ideation, planning, and requirements engineering? Why is human validation mandatory?',
          plan: ANSWER_PLAN(
            'Definition of AI-assisted ideation and early SDLC planning',
            'Flowchart showing AI lifecycle assistance from concept exploration to human verification',
            'Detailed evaluation of ideation, requirements structuring, and task breakdown',
            'Smart campus shuttle application example',
            'Discussion of the Human-in-the-Loop principle and domain accountability',
          ),
        },
      ],
      keywords: [
        'brainstorming',
        'divergent thinking',
        'role-playing',
        'negative brainstorming',
        'feasibility filter',
        'ideation',
        'AI-assisted planning',
        'human-in-the-loop',
        'HITL',
        'requirements drafting',
        'task decomposition',
      ],
      remember: [
        { prompt: 'What is divergent thinking in software brainstorming?', answer: 'Generating a broad variety of possible ideas and alternatives before filtering them down.' },
        { prompt: 'What is negative brainstorming?', answer: 'Prompting for potential failure modes, security flaws, and user frustrations to uncover risks.' },
        { prompt: 'What is the role of the human engineer in brainstorming?', answer: 'Evaluating generated ideas against technical feasibility, cost, and real-world value.' },
        { prompt: 'What is the Human-in-the-Loop principle?', answer: 'The rule that human engineers must review, validate, and approve all AI-generated outputs.' },
        { prompt: 'Can AI replace human software project planners?', answer: 'No; AI serves as a brainstorming assistant, but lacks real-world domain responsibility and legal accountability.' },
        { prompt: 'How does AI help with unstructured stakeholder notes?', answer: 'It summarizes and organizes messy natural language into categorized user stories and requirements.' },
      ],
    },

    // ------------------------------------------------------------------
    'market-research': {
      difficulty: 'medium',
      intro:
        'Software products must address real market needs. AI models assist market research by synthesizing public feature trends, organizing user pain points, and drafting survey questions.',
      definition:
        '**AI-Assisted Market Research** is the use of AI tools to gather, structure, and synthesize publicly known product patterns, user demographics, market pain points, and industry feature trends to inform product decisions.',
      simpleExplanation: {
        text: 'Instead of spending weeks manually reading dozens of product websites, an engineer can ask an AI to summarize standard features in telemedicine apps, typical user complaints about banking portals, or emerging trends in fitness software, providing a structured head start.',
        analogy:
          'A research assistant reviewing public industry reports: They extract common themes and organize them into an executive briefing, though you still verify the underlying statistics yourself.',
      },
      visual: {
        type: 'flow',
        title: 'AI-Assisted Market Research Flow',
        steps: [
          { label: 'Market Query Definition', note: 'Specify product domain, target geography, and user demographic' },
          { label: 'AI Trend Synthesis', note: 'Synthesize standard features, user pain points, and workflows' },
          { label: 'Research Survey Generation', note: 'Draft stakeholder interviews and user feedback questionnaires' },
          { label: 'Verification Gate', note: 'Cross-check findings against verified market data and official reports' },
        ],
      },
      explanation: [
        { heading: 'Where AI Assists Market Research' },
        {
          list: [
            '**Synthesizing Common Industry Features** — Summarizing standard functionality expected in specific software domains (e.g., standard billing features in SaaS).',
            '**Identifying Common User Complaints** — Highlighting frequent pain points in existing tools (e.g., confusing navigation, slow export speeds).',
            '**Drafting User Questionnaires** — Generating balanced survey questions to gather direct feedback from real target users.',
          ],
        },
        { heading: 'Critical Accuracy Warning' },
        {
          tip: '**Avoid Hallucinated Market Numbers**: LLMs can invent realistic-sounding market share percentages, financial numbers, or survey data. Never treat AI-generated statistics as real market facts without verifying them against primary sources.',
        },
      ],
      example: {
        title: 'Market Research for a Farm Produce Logistics App',
        input: 'Researching pain points in agricultural supply chain applications.',
        output: `AI-Synthesized Findings:
• Common User Pain Points : Poor cellular connectivity in rural areas; complex multi-step forms that frustrate truck drivers.
• Recommended Capabilities : Offline-first transaction logging, regional voice prompts, SMS confirmation receipts.
• Next Step for Team       : Interview 10 local farmers to verify whether voice prompts are actually preferred over simple touch icons.`,
        explanation:
          'AI highlights typical domain challenges (poor connectivity), helping the team plan field interviews to confirm real user needs.',
      },
      keyPoints: [
        'AI synthesizes general domain patterns, user pain points, and industry feature trends.',
        'Helps draft customer surveys and interview questionnaires for user research.',
        'Never cite AI-generated market numbers or financial statistics without primary-source verification.',
        'Findings must be validated through direct user interviews and field studies.',
      ],
      importantTerms: [
        {
          term: 'Market Synthesis',
          meaning: 'Aggregating and summarizing product patterns and customer pain points across an industry.',
        },
        {
          term: 'User Pain Point',
          meaning: 'A specific problem or frustration experienced by users with existing software solutions.',
        },
      ],
      examPoints: [
        'Explain how AI assists software engineers during preliminary market research.',
        'Discuss the risks of relying on AI-generated statistics and market data.',
        'Describe how AI can assist in designing user research questionnaires.',
      ],
      questions: [
        {
          prompt: 'Discuss the role of AI in software market research. What precautions must engineering teams take when evaluating AI-generated market findings?',
          plan: ANSWER_PLAN(
            'Definition and scope of AI-assisted market research',
            'Flowchart from Market Query to AI Synthesis and Verification',
            'Evaluation of areas: feature synthesis, pain point discovery, questionnaire design',
            'Farm produce logistics application example',
            'Critical precautions: verifying fake statistics, hallucinated citations, and primary sources',
          ),
        },
      ],
      keywords: ['market research', 'user pain points', 'market synthesis', 'survey generation', 'verification', 'hallucinated data'],
      remember: [
        { prompt: 'Why should you never trust AI-generated market share statistics directly?', answer: 'AI models can hallucinate realistic-sounding numbers and non-existent citations.' },
        { prompt: 'How does AI help design user surveys?', answer: 'It generates structured, unbiased interview and questionnaire questions tailored to user personas.' },
        { prompt: 'What is a user pain point?', answer: 'A specific frustration or limitation users experience with existing software products.' },
      ],
    },

    // ------------------------------------------------------------------
    competition: {
      difficulty: 'medium',
      intro:
        'Understanding competing software helps teams differentiate their product. AI helps by structuring competitor feature matrices and highlighting gaps in existing solutions.',
      definition:
        '**AI-Assisted Competition Analysis** is the structured comparison of competing software applications using AI to build feature matrices, analyze functional strengths and weaknesses, and identify product differentiators.',
      simpleExplanation: {
        text: 'Instead of spending hours creating a comparison spreadsheet of four competing tools, you can prompt an AI to build a table comparing their pricing models, core features, and API support, helping your team spot gaps where your product can stand out.',
        analogy:
          'Scouting an opposing sports team: You review game film to map their common formations, identify defensive weaknesses, and design a game plan that targets those vulnerabilities.',
      },
        visual: {
        type: 'comparison',
        title: 'AI-Generated Competitor Feature Analysis Matrix',
        table: {
          columns: ['Key Feature / Capability', 'Competitor A (Legacy)', 'Competitor B (Cloud App)', 'Our Proposed Software'],
          rows: [
            ['Real-Time Offline Sync', 'Unsupported (Requires LAN)', 'Partial (Unstable on reconnect)', 'Full Support (CRDT-based local SQLite sync)'],
            ['Role-Based Security', 'Supported (Complex AD setup)', 'Basic (Admin vs Member only)', 'Comprehensive (Custom RBAC permissions)'],
            ['Audit Logging', 'Supported (Local log files)', 'Unsupported (Restricted to premium tier)', 'Automated (Immutable cloud event log)'],
            ['Pricing Accessibility', 'High (Expensive enterprise licenses)', 'Moderate (Subscription per seat)', 'Accessible (Free academic core + hosted tier)'],
          ],
        },
      },
      explanation: [
        { heading: 'Steps in AI-Assisted Competition Analysis' },
        {
          list: [
            '**1. Competitor Identification** — Querying AI for prominent commercial and open-source tools in the problem domain.',
            '**2. Feature Matrix Construction** — Formatting comparisons into structured Markdown tables covering performance, APIs, and pricing models.',
            '**3. SWOT Analysis Assistance** — Exploring candidate Strengths, Weaknesses, Opportunities, and Threats for different architectural approaches.',
            '**4. Identifying Gaps & Differentiation** — Finding underserved user groups (e.g., small non-profits, mobile-first users) that established competitors overlook.',
          ],
        },
      ],
      example: {
        title: 'Competitor Analysis for a College Attendance App',
        input: 'Comparing existing biometric attendance machines with a proposed mobile beacon app.',
        output: `Analysis Generated:
• Competitor (Wall Biometrics) : High hardware cost, long student lines, zero mobile access.
• Competitor (Manual Paper)   : High proxy fraud, slow data entry into main portal.
• Our Differentiator         : Dynamic rotating QR code displayed on professor screen, scanned via mobile app with GPS geo-fencing.`,
        explanation:
          'Helps the team identify weaknesses in existing methods and focus on a clear, differentiated solution.',
      },
      keyPoints: [
        'AI structures competitor evaluations into clear feature comparison matrices.',
        'Assists with SWOT analysis across architectural and business dimensions.',
        'Helps identify market gaps and product differentiators.',
        'All competitor features and claims must be verified directly against current documentation.',
      ],
      importantTerms: [
        {
          term: 'Feature Matrix',
          meaning: 'A comparison table evaluating software capabilities across competing products.',
        },
        {
          term: 'Product Differentiation',
          meaning: 'Unique features and architectural advantages that distinguish a software product from its competitors.',
        },
        {
          term: 'SWOT Analysis',
          meaning: 'A strategic framework assessing Strengths, Weaknesses, Opportunities, and Threats.',
        },
      ],
      examPoints: [
        'Explain how AI assists software teams in conducting competitor analysis.',
        'Draw an AI-generated competitor feature matrix for a sample software application.',
        'Explain how competitor analysis helps identify product differentiators.',
      ],
      questions: [
        {
          prompt: 'How is AI used to perform Competition Analysis in software engineering? Draw and explain a sample competitor feature matrix.',
          plan: ANSWER_PLAN(
            'Definition and goals of competition analysis in software scoping',
            'Competitor comparison table (Features across Competitor A, Competitor B, Our Product)',
            'Methodology: identifying competitors, feature matrices, SWOT analysis, gap analysis',
            'College attendance system competitor example',
            'Importance of independent verification of competitor features',
          ),
        },
      ],
      keywords: ['competition analysis', 'feature matrix', 'differentiation', 'SWOT', 'gap analysis', 'benchmarking'],
      remember: [
        { prompt: 'What is a feature matrix?', answer: 'A comparison table mapping functional features across multiple competing software products.' },
        { prompt: 'What is product differentiation?', answer: 'The unique capabilities and qualities that set your software apart from competitors.' },
        { prompt: 'Why verify AI-generated competitor comparisons?', answer: 'Competitor features, pricing models, and capabilities change frequently over time.' },
      ],
    },

    // ------------------------------------------------------------------
    requirements: {
      difficulty: 'hard',
      intro:
        'Poor requirements are a primary cause of software project failures. AI helps by transforming messy stakeholder notes into structured, testable functional and non-functional requirements.',
      definition:
        '**AI-Assisted Requirements Engineering** is the practice of using AI models to extract, structure, disambiguate, and format software requirements into formal User Stories, Acceptance Criteria, and Software Requirements Specifications (SRS).',
      simpleExplanation: {
        text: 'Clients often share vague ideas like: "The checkout needs to be fast and safe." An AI assistant can help convert that vague statement into concrete, structured user stories with explicit acceptance criteria, helping engineers spot ambiguities early.',
        analogy:
          'A courtroom court reporter and legal clerk: The reporter writes down fast spoken words (stakeholder notes), and the clerk organizes them into clear, binding contract clauses (formal requirements).',
      },
      visual: {
        type: 'flow',
        title: 'AI-Assisted Requirements Refinement Pipeline',
        steps: [
          { label: 'Raw Stakeholder Statement', note: 'Vague natural language notes from client interviews' },
          { label: 'AI Disambiguation & Structuring', note: 'Separates Functional vs Non-Functional requirements; drafts User Stories' },
          { label: 'Acceptance Criteria Generation', note: 'Generates Given-When-Then (Gherkin) testable criteria' },
          { label: 'Human Verification Gate', note: 'Domain expert and client audit and formally baseline the requirements' },
        ],
      },
      explanation: [
        { heading: 'Key Use Cases for AI in Requirements' },
        {
          list: [
            '**Extracting Functional vs. Non-Functional Requirements** — Separating operational functions from performance, security, and accessibility constraints.',
            '**Formatting Structured User Stories** — Applying the standard template: *As a `<role>`, I want `<goal>`, so that `<benefit>`*.',
            '**Writing Acceptance Criteria** — Generating testable conditions using Gherkin format (*Given `<context>`, When `<action>`, Then `<outcome>`*).',
            '**Spotting Ambiguities** — Highlighting vague terms like *fast*, *user-friendly*, *secure*, or *as needed* that fail verifiability checks.',
          ],
        },
        { heading: 'Raw Stakeholder Input vs. AI-Structured Requirement' },
        {
          table: {
            columns: ['Stage', 'Specification Representation'],
            rows: [
              ['Raw Customer Note', '"Make sure only teachers can enter marks, and students cannot cheat."'],
              ['AI Functional Story', '**Story**: As a Teacher, I want to enter semester marks for my enrolled classes so student grades are updated.'],
              ['AI Non-Functional Constraint', '**Security / NFR**: System must enforce Role-Based Access Control (RBAC); reject write requests lacking valid JWT teacher claims.'],
              ['AI Acceptance Criteria (Gherkin)', '**Given** a student is logged in, **When** they send a POST to /api/grades, **Then** return HTTP 403 Forbidden.'],
            ],
          },
        },
      ],
      example: {
        title: 'Refining Requirements for an ATM Cash Withdrawal',
        input: 'Client says: "The ATM should dispense money if the user has cash."',
        output: `AI Structured Requirement:
User Story: As an Account Holder, I want to withdraw cash from an ATM so I have physical currency.

Acceptance Criteria (Given-When-Then):
1. Given balance >= requested amount, When user requests cash, Then dispense cash and debit balance.
2. Given balance < requested amount, When user requests cash, Then show Insufficient Funds error and do not dispense cash.
3. Given ATM cash supply < requested amount, When valid withdrawal requested, Then show ATM Out of Cash error and abort transaction.`,
        explanation:
          'Unpacks an ambiguous client statement into complete, testable scenarios including edge-case cash limits.',
      },
      keyPoints: [
        'AI transforms unstructured stakeholder discussions into formal functional and non-functional requirements.',
        'Structures user stories using standard roles, goals, and business benefits.',
        'Generates testable acceptance criteria using Given-When-Then (Gherkin) formatting.',
        'Flags ambiguous, untestable language (e.g., "fast", "intuitive", "scalable").',
        'Human engineers and clients must formally review and baseline all generated requirements.',
      ],
      importantTerms: [
        {
          term: 'User Story',
          meaning: 'An agile requirement expressed as: "As a [role], I want [goal], so that [benefit]."',
        },
        {
          term: 'Acceptance Criteria',
          meaning: 'The explicit, testable conditions a software feature must satisfy to be accepted as complete.',
        },
        {
          term: 'Gherkin Syntax',
          meaning: 'A structured Given-When-Then format used to define functional acceptance tests.',
        },
      ],
      examPoints: [
        'Explain how AI assists in eliciting and structuring software requirements.',
        'Show how an ambiguous stakeholder note is transformed into a structured User Story with Acceptance Criteria.',
        'Explain why human verification is mandatory for AI-generated requirements.',
      ],
      questions: [
        {
          prompt: 'Describe the application of AI in requirements engineering. Illustrate how AI refines ambiguous stakeholder notes into structured user stories with acceptance criteria.',
          plan: ANSWER_PLAN(
            'Definition and challenges of requirements engineering (ambiguity, completeness)',
            'Requirements refinement pipeline flowchart (Raw Notes → AI Structuring → Criteria → Human Gate)',
            'Breakdown of functional vs non-functional separation and Gherkin criteria syntax',
            'ATM cash withdrawal requirement transformation example',
            'Critical analysis of human-in-the-loop validation for SRS baselines',
          ),
        },
      ],
      keywords: ['requirements engineering', 'user story', 'acceptance criteria', 'Gherkin', 'Given-When-Then', 'functional', 'non-functional'],
      remember: [
        { prompt: 'What is the standard format for a user story?', answer: '"As a [role], I want [goal], so that [benefit]."' },
        { prompt: 'What is Gherkin syntax?', answer: 'The "Given [context], When [action], Then [outcome]" format for acceptance criteria.' },
        { prompt: 'Why is AI helpful for messy stakeholder notes?', answer: 'It structures vague text into categorized functional requirements and testable acceptance rules.' },
      ],
    },

    // ------------------------------------------------------------------
    'approaches-to-project-planning': {
      difficulty: 'hard',
      intro:
        'Project planning turns requirements into work breakdown structures, schedules, and risk plans. AI assists by breaking features into sub-tasks and estimating milestones.',
      definition:
        '**Approaches to Project Planning (AI-Assisted)** involves using AI models to support project planning by generating **Work Breakdown Structures (WBS)**, mapping task dependencies, identifying potential risks, and drafting preliminary sprint milestones.',
      simpleExplanation: {
        text: 'Planning a software project can feel overwhelming when staring at a large feature list. An AI planning assistant can help break a broad task like "Build User Authentication" into concrete sub-tasks: setting up database tables, writing password-hashing helpers, and implementing JWT endpoints, helping the team plan their sprints.',
        analogy:
          'A wedding planner’s checklist assistant: The planner knows the big goal (the wedding day), and the assistant lists all the sub-tasks: booking caterers, sending invitations, and arranging flowers, helping the team stay organized.',
      },
      visual: {
        type: 'hierarchy',
        title: 'AI-Generated Work Breakdown Structure (WBS) Decomposition',
        root: 'Feature: User Authentication Module',
        children: [
          {
            label: '1. Database Layer',
            note: 'Design Users table schema; generate Prisma migrations; seed test accounts',
          },
          {
            label: '2. Backend Logic',
            note: 'Implement bcrypt hashing; build JWT issue/verify helpers; write login controllers',
          },
          {
            label: '3. API & Middleware',
            note: 'Build auth middleware; implement token refresh; set up rate limiting',
          },
          {
            label: '4. Testing & Verification',
            note: 'Write unit tests for token expiration; add integration tests for wrong credentials',
          },
        ],
      },
      explanation: [
        { heading: 'Core Planning Areas Supported by AI' },
        {
          list: [
            '**Work Breakdown Structure (WBS) Generation** — Decomposing high-level features into discrete, assignable engineering tasks.',
            '**Task Dependency Mapping** — Highlighting logical prerequisites (e.g., database schema must be baselined before repository functions can be written).',
            '**Proactive Risk Identification** — Prompting teams with common technical and operational risks (e.g., third-party API rate limits, database migration locks).',
            '**Drafting Milestone Schedules** — Grouping tasks into candidate 2-week agile sprint backlogs.',
          ],
        },
        { heading: 'Critical Planning Caveat' },
        {
          tip: '**Never Rely Blindly on AI Time Estimates**: AI models cannot account for team velocity, junior developer learning curves, legacy technical debt, or unexpected office interruptions. AI estimates serve as preliminary drafts; experienced engineering leads must finalize actual timelines.',
        },
      ],
      example: {
        title: 'Project Planning for an E-Commerce Payment Module',
        input: 'Decomposing a payment gateway integration into an engineering sprint plan.',
        output: `AI Planning Output:
• Phase 1 (Days 1-3) : Set up Stripe sandbox credentials; implement webhook signature verification.
• Phase 2 (Days 4-7) : Build checkout session creation endpoint; handle payment success/failure webhooks.
• Phase 3 (Days 8-10): Implement idempotent database balance updates; write unit and integration tests.
• Identified Risk    : Webhook delivery delays could cause duplicate balance updates; recommend distributed locks.`,
        explanation:
          'Decomposes the integration into concrete phases and surfaces an important concurrency risk (duplicate webhooks).',
      },
      keyPoints: [
        'AI breaks high-level features into detailed Work Breakdown Structures (WBS).',
        'Helps identify task dependencies and technical risks early in project planning.',
        'Assists with drafting preliminary sprint backlogs and milestone schedules.',
        'AI effort estimates are baseline suggestions; experienced engineers must finalize actual delivery dates.',
      ],
      importantTerms: [
        {
          term: 'Work Breakdown Structure (WBS)',
          meaning: 'A hierarchical decomposition of total project scope into smaller, manageable work packages.',
        },
        {
          term: 'Task Dependency',
          meaning: 'A relationship where one technical task must finish before another can begin.',
        },
        {
          term: 'Risk Identification',
          meaning: 'The process of spotting potential technical, architectural, or timeline pitfalls before they cause delays.',
        },
      ],
      examPoints: [
        'Explain how AI assists with Work Breakdown Structure (WBS) decomposition.',
        'Explain why AI time estimates require adjustment by experienced engineering leads.',
        'Draw an AI-generated WBS hierarchy diagram for a software feature.',
      ],
      questions: [
        {
          prompt: 'Discuss approaches to AI-assisted project planning. How does AI assist with task decomposition, dependency mapping, and risk identification?',
          plan: ANSWER_PLAN(
            'Definition of AI-assisted project planning and scope breakdown',
            'WBS decomposition hierarchy diagram (Feature → Database → Logic → API → Testing)',
            'Evaluation of areas: WBS generation, dependency mapping, risk forecasting, sprint drafting',
            'E-commerce payment gateway sprint schedule example',
            'Critical caveat: why human leads must calibrate AI time estimates against team velocity',
          ),
        },
      ],
      keywords: ['project planning', 'WBS', 'task decomposition', 'dependencies', 'risk identification', 'sprint planning'],
      remember: [
        { prompt: 'What is a Work Breakdown Structure (WBS)?', answer: 'A hierarchical decomposition of a project into small, manageable work packages.' },
        { prompt: 'Can AI accurately predict project completion dates?', answer: 'No; AI cannot account for real team velocity, legacy code debt, or unexpected team blockers.' },
        { prompt: 'How does AI assist with risk planning?', answer: 'It highlights common technical and operational risks (e.g., concurrency issues, API rate limits) early.' },
      ],
    },

    // ------------------------------------------------------------------
    debugging: {
      difficulty: 'medium',
      intro:
        'Debugging is often one of the most time-consuming parts of development. AI assists by parsing error logs, tracing execution logic, and suggesting candidate root causes.',
      definition:
        '**AI-Assisted Debugging** is the collaborative diagnosis of software defects where developers supply error symptoms, stack traces, and relevant code to an AI model to identify potential root causes, explain runtime failures, and suggest candidate code fixes.',
      simpleExplanation: {
        text: 'When a program crashes with a confusing 50-line error trace, pasting the log into an AI assistant can quickly translate the error into plain English: "You tried to access `.map()` on an object that returned `null` from your API on line 34. Add a check to confirm the data exists before mapping."',
        analogy:
          'A senior engineer sitting beside you: You show them the error screen, they explain what the compiler is complaining about, suggest two places to check, and you test the fix.',
      },
      visual: {
        type: 'flow',
        title: 'The AI-Assisted Debugging Feedback Loop',
        steps: [
          { label: '1. Bug Manifests', note: 'Application throws an exception, fails tests, or exhibits incorrect state' },
          { label: '2. Prepare Context', note: 'Isolate minimal code, sanitize inputs, copy stack trace' },
          { label: '3. AI Root Cause Analysis', note: 'AI identifies potential causes (null pointer, off-by-one, race condition)' },
          { label: '4. Human Code Inspection', note: 'Developer reviews proposed fix to ensure it does not introduce side effects' },
          { label: '5. Apply Fix & Retest', note: 'Apply the patch and run regression tests to verify the fix works' },
        ],
      },
      explanation: [
        { heading: 'AI-assisted debugging' },
        { heading: 'Effective AI-Assisted Debugging Practices' },
        {
          list: [
            '**Provide Complete Error Traces** — Always paste the entire stack trace alongside the relevant code snippet so the AI sees line numbers and call stacks.',
            '**Explain Expected vs. Actual Output** — Clarify: "Expected the function to return 100, but it returned NaN".',
            '**Beware of Plausible-Looking Wrong Fixes** — AI models sometimes fix symptoms rather than causes (e.g., silencing an exception with an empty `try/catch` instead of fixing the underlying null pointer).',
          ],
        },
        { heading: 'AI-assisted testing' },
        { note: 'Writing comprehensive test suites is essential for reliability, but can be time-consuming. AI assists by generating unit tests, proposing edge cases, and drafting mock data.' },
        '**AI-Assisted Software Testing** is the use of AI tools to generate automated unit tests, identify missing edge cases, draft synthetic test data, and improve test coverage across software suites.',
        'After writing a function, a developer might only think to test two normal inputs. An AI assistant can review the code and suggest: "What if the input is an empty array? What if the integer overflows? What if the user submits an emoji in the phone field?", helping build a much more thorough test suite.',
        { tip: 'A safety inspector reviewing a newly built bridge: The builder tests whether cars can drive across; the inspector tests what happens during gale-force winds, freezing ice, and overweight trucks.' },
        { visual: {
        type: 'flow',
        title: 'AI-Assisted Test Generation Workflow',
        steps: [
          { label: 'Target Code & Signature', note: 'Provide source code, type definitions, and functional requirements' },
          { label: 'AI Edge Case Discovery', note: 'AI identifies nulls, boundaries, timeouts, and exception paths' },
          { label: 'Test Suite Generation', note: 'Generates unit tests using target framework (Jest, PyTest, JUnit)' },
          { label: 'Execution & Verification', note: 'Run test suite locally to verify tests compile and pass accurately' },
        ],
      } },
        { heading: 'Key Testing Tasks Supported by AI' },
        {
          list: [
            '**Unit Test Generation** — Writing boilerplate assertions using testing frameworks like Jest, PyTest, Mocha, or JUnit.',
            '**Boundary & Edge Case Discovery** — Identifying tricky inputs like empty strings, negative numbers, leap years, and extreme array lengths.',
            '**Mock Data Generation** — Generating realistic synthetic datasets (e.g., sample credit card numbers, addresses, JSON payloads) without using real customer data.',
            '**Test Documentation** — Generating descriptive test names that explain the exact expected behavior when assertions fail.',
          ],
        },
        { heading: 'Common Pitfalls in AI-Generated Tests' },
        {
          list: [
            '**Tautological Tests** — Writing tests that assert trivial truths (e.g., `expect(true).toBe(true)`) without validating real logic.',
            '**Hallucinated Testing Utilities** — Inventing testing assertion methods that do not exist in the target framework.',
            '**Testing Implementation instead of Behavior** — Tightly coupling tests to private variables instead of public interfaces.',
          ],
        },
        { label: 'Example: Generating Unit Tests for an Age Verification Function', more: [
          'Function: `function isEligibleToVote(age: number): boolean`',
          { code: `AI-Generated Test Suite (Jest):
describe('isEligibleToVote', () => {
    test('returns true for adult above 18', () => expect(isEligibleToVote(21)).toBe(true));
    test('returns true for exact boundary age 18', () => expect(isEligibleToVote(18)).toBe(true));
    test('returns false for minor age 17', () => expect(isEligibleToVote(17)).toBe(false));
    test('throws error for negative age', () => expect(() => isEligibleToVote(-5)).toThrow());
    test('throws error for unrealistic age > 150', () => expect(() => isEligibleToVote(200)).toThrow());
});`, lang: 'text' },
          'Exercises typical values, boundary values (17, 18), and defensive exception checks (-5, 200).',
        ] },
      ],
      example: {
        title: 'Debugging an Asynchronous State Update Bug',
        input: 'React counter button behaves erratically, failing to increment when clicked quickly.',
        output: `Error Code:
const handleLike = () => {
    setLikes(likes + 1); // Stale state closure bug
};

AI Diagnosis:
"When clicked rapidly, multiple calls close over stale state, causing race conditions. Use a functional updater instead."

Proposed Fix:
const handleLike = () => {
    setLikes(prev => prev + 1);
};`,
        explanation:
          'The AI identifies the subtle asynchronous closure bug and provides the correct functional updater pattern.',
      },
      keyPoints: [
        'AI explains confusing stack traces and identifies likely root causes.',
        'Developers must provide both the error trace and the relevant code snippet.',
        'Watch out for symptom-masking fixes (like empty try-catch blocks) that hide real bugs.',
        'Developers must review suggested patches and run regression tests before merging.',
        'AI accelerates test writing by generating boilerplate assertions in frameworks like Jest and PyTest.',
        'Surfaces edge cases: boundary numbers, nulls, empty collections, and extreme inputs.',
        'Creates realistic synthetic test data without exposing real customer information.',
        'Developers must verify that generated tests validate real behavior rather than asserting trivial truths.',
      ],
      importantTerms: [
        {
          term: 'Root Cause',
          meaning: 'The underlying code or logic flaw that produces an observable failure.',
        },
        {
          term: 'Symptom-Masking Fix',
          meaning: 'A poor fix that silences an error (e.g., catching and ignoring an exception) without addressing the root cause.',
        },
        {
          term: 'Synthetic Test Data',
          meaning: 'Artificially generated mock data used for testing that mimics real data without containing private information.',
        },
        {
          term: 'Tautological Test',
          meaning: 'A flawed test that always passes because it tests trivial statements rather than real program logic.',
        },
      ],
      examPoints: [
        'Describe the steps of the AI-assisted debugging workflow.',
        'Explain why developers must verify AI fixes rather than applying them blindly.',
        'Give an example of an AI-assisted bug diagnosis and fix.',
        'Explain how AI assists software engineers in automated test generation.',
        'List three types of edge cases an AI model commonly helps discover.',
        'Describe the risks of tautological or hallucinated test cases.',
      ],
      questions: [
        {
          prompt: 'Explain the role of AI in software debugging. What steps should a developer follow to diagnose and resolve bugs with an AI assistant?',
          plan: ANSWER_PLAN(
            'Definition and scope of AI-assisted debugging',
            'Debugging workflow diagram (Manifests → Prepare Context → AI Analysis → Inspection → Retest)',
            'Best practices: providing stack traces, expected vs actual outputs, avoiding symptom-masking fixes',
            'React asynchronous closure state bug example',
            'Importance of human review and regression testing after applying fixes',
          ),
        },
        {
          prompt: 'How does AI assist in software testing? Discuss its capabilities in test-case generation, edge-case discovery, and test-data creation.',
          plan: ANSWER_PLAN(
            'Definition and objectives of AI-assisted testing',
            'Flowchart of test generation workflow (Code → Edge Cases → Test Generation → Local Run)',
            'Evaluation of areas: unit tests, boundary detection, mock data generation',
            'Voting eligibility function Jest test suite example',
            'Pitfalls: tautological tests, hallucinated assertions, and coupling to private state',
          ),
        },
      ],
      keywords: [
        'debugging',
        'root cause',
        'stack trace',
        'asynchronous state',
        'regression testing',
        'symptom-masking',
        'testing',
        'unit tests',
        'edge cases',
        'synthetic data',
        'Jest',
        'boundary testing',
        'tautological tests',
      ],
      remember: [
        { prompt: 'What information should you provide an AI when debugging?', answer: 'The error message, the full stack trace, the relevant code snippet, and expected vs actual behavior.' },
        { prompt: 'What is a symptom-masking fix?', answer: 'A poor code change that hides an error without solving the underlying defect.' },
        { prompt: 'What must always follow an AI-suggested bug fix?', answer: 'Running regression tests to confirm the fix works and introduced no new issues.' },
        { prompt: 'What is synthetic test data?', answer: 'Artificially generated test data that mimics real records without exposing private customer information.' },
        { prompt: 'What is a tautological test?', answer: 'A flawed test that always passes because it tests a trivial truth instead of real logic.' },
        { prompt: 'Name three edge cases AI helps uncover.', answer: 'Boundary values, null or undefined inputs, and empty collections.' },
      ],
    },

    // ------------------------------------------------------------------
    documentation: {
      difficulty: 'easy',
      intro:
        'Software documentation is often neglected because writing it manually is tedious. AI helps automate API docs, code comments, and README guides, keeping documentation aligned with code.',
      definition:
        '**AI-Assisted Documentation** is the automated generation and maintenance of software documentation—including API references, docstrings, README files, architectural overviews, and changelogs—directly from code and architectural models.',
      simpleExplanation: {
        text: 'Instead of spending a whole afternoon writing documentation after finishing a feature, an engineer can provide the code to an AI and ask for clear docstrings, parameter explanations, and a clean README file, keeping documentation up to date with minimal effort.',
        analogy:
          'A court stenographer transcribing proceedings into an organized record, saving the lawyers from having to manually write summaries at the end of the day.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Spectrum of AI-Assisted Documentation Artifacts',
        root: 'Documentation Artifacts',
        children: [
          {
            label: 'Code-Level Docs',
            note: 'JSDoc, PyDoc, Swagger annotations, function docstrings, parameter definitions',
          },
          {
            label: 'Module-Level Docs',
            note: 'README.md, setup guides, environment variables, local build instructions',
          },
          {
            label: 'API References',
            note: 'OpenAPI 3.0 / Swagger specs, payload examples, error response codes',
          },
          {
            label: 'Release Notes',
            note: 'Changelog summaries generated from commit histories and pull requests',
          },
        ],
      },
      explanation: [
        { heading: 'Core Documentation Types Accelerated by AI' },
        {
          list: [
            '**Function Docstrings** — Generating JSDoc, PyDoc, or JavaDoc blocks detailing parameters, return types, and exceptions.',
            '**README Guides** — Drafting installation steps, environment variable lists, and usage guides from project manifests.',
            '**API Specifications** — Converting route handler functions into OpenAPI/Swagger YAML specifications.',
            '**Changelogs and Release Notes** — Summarizing raw Git commit logs into user-friendly release updates.',
          ],
        },
        { heading: 'The Synchronization Rule' },
        {
          tip: '**Documentation Must Match Code**: AI models can generate plausible-sounding documentation that misstates what the code actually does. Developers must verify that parameter descriptions, default values, and error behaviors match the implementation.',
        },
      ],
      example: {
        title: 'AI Generating JSDoc for a Complex Financial Function',
        input: 'A tax calculation function without comments.',
        output: `AI-Generated JSDoc:
/**
 * Calculates compound interest on fixed deposits.
 * 
 * @param {number} principal - Initial deposit amount (must be > 0).
 * @param {number} annualRate - Annual interest percentage (e.g., 0.075 for 7.5%).
 * @param {number} compoundingFrequency - Times interest is compounded per year.
 * @param {number} years - Duration of deposit in years.
 * @returns {number} Final accumulated balance rounded to 2 decimal places.
 * @throws {RangeError} If principal or years is non-positive.
 */
function calculateCompoundInterest(principal, annualRate, compoundingFrequency, years) { ... }`,
        explanation:
          'Produces complete, standardized JSDoc comments explaining types, constraints, return values, and exceptions.',
      },
      keyPoints: [
        'AI automates repetitive documentation tasks: docstrings, README files, API specs, and changelogs.',
        'Generates standard formats like JSDoc, PyDoc, and OpenAPI/Swagger.',
        'Transforms raw Git commit logs into clear, user-friendly release notes.',
        'Developers must verify that generated documentation accurately reflects real code behavior.',
      ],
      importantTerms: [
        {
          term: 'JSDoc / Docstring',
          meaning: 'A standardized inline comment format used to document function parameters, return types, and behavior.',
        },
        {
          term: 'OpenAPI Specification',
          meaning: 'A standard, language-agnostic interface description for REST APIs.',
        },
      ],
      examPoints: [
        'Explain how AI assists in generating software documentation.',
        'List four documentation artifacts easily generated by AI tools.',
        'Explain why developer review is necessary for AI-generated documentation.',
      ],
      questions: [
        {
          prompt: 'Discuss the application of AI in software documentation. What artifacts can be generated, and what review is required?',
          plan: ANSWER_PLAN(
            'Definition and importance of maintaining up-to-date documentation',
            'Hierarchy diagram showing code-level, module-level, API, and release documentation',
            'Evaluation of documentation types: JSDoc, README files, OpenAPI, changelogs',
            'Compound interest calculation function JSDoc example',
            'Verification rule: ensuring documentation stays synchronized with real code behavior',
          ),
        },
      ],
      keywords: ['documentation', 'JSDoc', 'docstrings', 'README', 'OpenAPI', 'changelog', 'synchronization'],
      remember: [
        { prompt: 'What is JSDoc?', answer: 'A standard inline comment format that documents JavaScript function parameters, return types, and descriptions.' },
        { prompt: 'What danger exists with AI-generated documentation?', answer: 'It can sound plausible while describing parameters or behaviors that do not match the real code.' },
        { prompt: 'Name three documentation artifacts AI can generate.', answer: 'API specifications, README setup guides, and function docstrings.' },
      ],
    },

    // ------------------------------------------------------------------
    'code-review': {
      difficulty: 'medium',
      intro:
        'Code review catches bugs, security flaws, and maintainability issues before code reaches production. AI acts as an initial reviewer, catching common issues before human peers review the code.',
      definition:
        '**AI-Assisted Code Review** is the practice of using AI tools to analyze source code changes, pull requests, and git diffs to detect potential bugs, security vulnerabilities, code smells, and performance bottlenecks before human peer review.',
      simpleExplanation: {
        text: 'Think of an AI code reviewer like an automated spellchecker for code. It catches missing null-checks, unclosed connections, and unused variables before you ask a teammate for a review, allowing your teammate to focus on higher-level architectural decisions.',
        analogy:
          'Submitting an article to an automated grammar checker before sending it to the chief editor: The software catches typos and run-on sentences so the editor can focus on story flow and accuracy.',
      },
      visual: {
        type: 'flow',
        title: 'AI-Assisted Code Review Workflow in a CI Pipeline',
        steps: [
          { label: 'Developer Pull Request', note: 'Developer submits a branch with new code changes' },
          { label: 'Automated AI Review Scan', note: 'AI analyzes git diff for style, security flaws, and antipatterns' },
          { label: 'Inline Findings Posted', note: 'AI leaves inline comments highlighting potential bugs and edge cases' },
          { label: 'Human Developer Verification', note: 'Author resolves valid comments and dismisses false positives' },
          { label: 'Final Senior Peer Approval', note: 'Human lead conducts architectural review and merges branch' },
        ],
      },
      explanation: [
        { heading: 'What AI Evaluates during Code Review' },
        {
          list: [
            '**Security Flaws** — Flags potential vulnerabilities like SQL injections, hardcoded secrets, and missing input sanitization.',
            '**Maintainability & Code Smells** — Highlights duplicated code, overly long functions, excessive nesting, and poor variable naming.',
            '**Performance Traps** — Detects $O(n^2)$ database lookups inside loops, missing indexes, and unclosed stream connections.',
            '**Adherence to Coding Standards** — Checks compliance with team style guides, lint rules, and architectural patterns.',
          ],
        },
        { heading: 'AI Reviewers vs. Human Reviewers' },
        {
          table: {
            columns: ['Dimension', 'AI Code Reviewer', 'Human Senior Peer Reviewer'],
            rows: [
              ['Speed', 'Instant (analyzes pull requests in seconds).', 'Hours to days (depends on team availability).'],
              ['Focus Area', 'Syntax patterns, missing null checks, common CVE security flaws.', 'Business logic alignment, architectural coherence, long-term maintainability.'],
              ['Context Scope', 'Limited to the submitted diff and provided files.', 'Deep understanding of enterprise history, roadmap, and team context.'],
              ['Authority', 'Advisory recommendations (cannot make binding approval decisions).', 'Final sign-off authority to approve and merge changes.'],
            ],
          },
        },
      ],
      example: {
        title: 'AI Review Finding on a Database Query Method',
        input: 'A pull request includes a user-search method.',
        output: `Submitted Code:
db.query("SELECT * FROM users WHERE name = '" + req.query.name + "'");

AI Code Review Finding:
• Severity : Critical Security Vulnerability (SQL Injection).
• Issue    : Raw string concatenation of req.query.name allows attackers to inject malicious SQL.
• Remedy   : Use parameterized queries: db.query("SELECT * FROM users WHERE name = $1", [req.query.name]);`,
        explanation:
          'Instantly catches an SQL injection vulnerability and provides the secure parameterized alternative.',
      },
      keyPoints: [
        'AI reviews act as an early filter for security flaws, code smells, and style issues.',
        'Catches common vulnerabilities (SQL injection, hardcoded secrets) before human peer review.',
        'AI recommendations are advisory; human leads hold final approval authority.',
        'Human reviewers focus on high-level architecture and business logic, while AI handles pattern checks.',
      ],
      importantTerms: [
        {
          term: 'Code Smell',
          meaning: 'A characteristic in source code that indicates a deeper design problem without being an outright bug.',
        },
        {
          term: 'False Positive',
          meaning: 'When a code review tool incorrectly flags clean, safe code as a defect.',
        },
        {
          term: 'Pull Request (PR)',
          meaning: 'A proposed code change submitted for review before being merged into the main project branch.',
        },
      ],
      examPoints: [
        'Explain the role and value of AI in modern software code reviews.',
        'Compare an AI code reviewer with a human peer reviewer across speed, scope, and authority.',
        'Give an example of a security vulnerability detected during an AI review.',
      ],
      questions: [
        {
          prompt: 'What is AI-Assisted Code Review? Compare the roles of AI reviewers and human senior engineers in a modern development pipeline.',
          plan: ANSWER_PLAN(
            'Definition and objectives of AI-assisted code review',
            'Workflow diagram of PR submission, AI scanning, and human approval',
            'Evaluation areas: security flaws, code smells, performance bottlenecks, style guides',
            'SQL injection detection in a database query example',
            'Comparison table: AI reviewer vs Human peer reviewer',
          ),
        },
      ],
      keywords: ['code review', 'pull request', 'code smells', 'SQL injection', 'false positives', 'human approval'],
      remember: [
        { prompt: 'What is the role of an AI code reviewer?', answer: 'To serve as an early automated filter catching bugs, security flaws, and style issues before human review.' },
        { prompt: 'Can an AI code review replace a senior human engineer?', answer: 'No; AI lacks business context and architectural insight, and cannot hold sign-off authority.' },
        { prompt: 'What is a false positive in code review?', answer: 'When an analysis tool incorrectly flags clean, safe code as a bug.' },
      ],
    },

    // ------------------------------------------------------------------
    deployment: {
      difficulty: 'medium',
      intro:
        'Deploying software into production requires careful configuration, environment checks, and rollback plans. AI assists by generating deployment manifests, verifying checklists, and planning rollbacks.',
      definition:
        '**AI-Assisted Deployment** is the use of AI tools to support release activities by generating deployment configurations (e.g., Dockerfiles, CI/CD pipelines), verifying pre-release checklists, evaluating configuration risks, and drafting rollback plans.',
      simpleExplanation: {
        text: 'Deploying software is like a space launch: you must follow strict safety checklists to make sure every environment variable is set, database migrations ran, and rollback plans are ready if something goes wrong. AI helps write configuration files and audits checklists to ensure no release steps are missed.',
        analogy:
          'An airplane pre-flight checklist assistant: The co-pilot reads every item on the safety checklist, confirming fuel levels, flaps, and instruments are set before takeoff.',
      },
      visual: {
        type: 'process',
        title: 'AI-Assisted Deployment Preparation Lifecycle',
        steps: [
          { label: '1. Config Generation', detail: 'Generate Dockerfiles, Kubernetes manifests, and CI/CD workflow scripts' },
          { label: '2. Pre-Flight Checklist Audit', detail: 'AI audits environment variables, secrets management, and build dependencies' },
          { label: '3. Risk & Rollback Strategy', detail: 'Draft rollback steps and database migration reversal scripts' },
          { label: '4. Canary / Blue-Green Deploy', detail: 'Roll out release to small user segments; monitor error rates' },
          { label: '5. Post-Deployment Verification', detail: 'Analyze live server logs and metrics for latency spikes or error floods' },
        ],
      },
      explanation: [
        { heading: 'Key Deployment Areas Supported by AI' },
        {
          list: [
            '**Configuration File Generation** — Drafting Dockerfiles, Kubernetes deployment YAMLs, and GitHub Actions CI/CD workflows.',
            '**Pre-Deployment Checklists** — Verifying that database migrations ran, SSL certificates are active, and environment secrets are configured.',
            '**Rollback Planning** — Generating steps and scripts to revert database changes and traffic routing if a deployment fails.',
            '**Log Analysis** — Parsing production logs after a release to spot anomalies, unhandled exceptions, and latency spikes.',
          ],
        },
        { heading: 'Essential Release Considerations' },
        {
          table: {
            columns: ['Consideration', 'Release Practice Supported by AI'],
            rows: [
              ['Configuration Hygiene', 'Verify that no local development URLs, debug flags, or test credentials remain in production configs.'],
              ['Database Migration Safety', 'Review migration scripts to ensure schema modifications do not lock tables or break backward compatibility.'],
              ['Rollback Readiness', 'Ensure previous container images and database rollback migrations are tested before launching the new release.'],
              ['Health Checks & Monitoring', 'Verify that `/healthz` endpoints respond and alert thresholds trigger if errors exceed baseline levels.'],
            ],
          },
        },
      ],
      example: {
        title: 'AI Generating a Multi-Stage Dockerfile for a React/Node App',
        input: 'A team needs an optimized production Dockerfile for a Vite application.',
        output: `AI-Generated Multi-Stage Dockerfile:
# Stage 1: Build static assets
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with lightweight NGINX
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,
        explanation:
          'Uses multi-stage builds to create a lightweight, secure production container that excludes dev dependencies and build tools.',
      },
      keyPoints: [
        'AI assists deployment by drafting Dockerfiles, Kubernetes manifests, and CI/CD scripts.',
        'Audits pre-release checklists to ensure environment variables and secrets are configured.',
        'Helps plan rollback steps and database migration reversal scripts before release.',
        'Assists with post-deployment monitoring by analyzing production logs for error spikes.',
      ],
      importantTerms: [
        {
          term: 'Multi-Stage Build',
          meaning: 'A Docker containerization strategy that separates the build environment from the final runtime image to reduce image size.',
        },
        {
          term: 'Rollback Strategy',
          meaning: 'A planned, tested procedure to revert a system to its previous stable state if a new release fails.',
        },
        {
          term: 'Canary Deployment',
          meaning: 'A release strategy where updates are rolled out to a small percentage of users first to verify stability.',
        },
      ],
      examPoints: [
        'Describe the role of AI in software deployment and release engineering.',
        'Explain why a rollback plan is essential before deploying to production.',
        'Explain how multi-stage Docker builds produce secure, lightweight production containers.',
      ],
      questions: [
        {
          prompt: 'Discuss the application of AI in software deployment. Explain pre-deployment checklists, configuration generation, and rollback planning with an example.',
          plan: ANSWER_PLAN(
            'Definition and scope of AI-assisted deployment',
            'Process diagram of deployment preparation (Config → Audit → Rollback → Deploy → Verify)',
            'Evaluation of areas: Dockerfile generation, CI/CD workflows, configuration safety, rollback plans',
            'Multi-stage React/Nginx Dockerfile example',
            'Summary of post-release log monitoring and canary verification',
          ),
        },
      ],
      keywords: ['deployment', 'Dockerfile', 'CI/CD', 'rollback strategy', 'canary deployment', 'pre-flight checklist'],
      remember: [
        { prompt: 'What is a rollback strategy?', answer: 'A planned, tested procedure to revert software to its previous stable release if an update fails.' },
        { prompt: 'Why are multi-stage Docker builds preferred in production?', answer: 'They exclude build dependencies and source code, resulting in smaller, more secure container images.' },
        { prompt: 'How does AI assist post-deployment monitoring?', answer: 'By parsing live production logs to identify error spikes and performance anomalies after release.' },
      ],
    },
  },
}