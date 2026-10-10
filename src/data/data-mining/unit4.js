// Data Mining and Data Warehousing — Unit IV: Data Warehousing.
// Topic ids match the syllabus outline in ../subjects.js.
// Textbook context: Berson & Smith, "Data Warehousing, Data Mining & OLAP".
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
    'Unit IV moves from mining to the place mining data usually lives: the data warehouse. You learn its components, what has to be decided to build one, how it runs on parallel (multiprocessor) hardware, and the tools that extract, clean and transform source data before loading it.',

  map: [
    { label: 'What is inside', topics: ['data-warehousing-components'] },
    { label: 'How to build it', topics: ['building-a-data-warehouse'] },
    { label: 'Run it fast', topics: ['mapping-the-data-warehouse-to-a-multiprocessor-architecture'] },
    { label: 'Feed it data', topics: ['data-extraction-cleanup-and-transformation-tools'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'data-warehousing-components': {
      difficulty: 'medium',
      intro: 'A data warehouse is not one product — it is a set of components working together, from source systems to the analyst’s screen.',
      definition:
        'A data warehouse is a **subject-oriented**, **integrated**, **time-variant** and **nonvolatile** collection of data that supports management’s decision-making (W. H. Inmon). Its main components are the warehouse database, sourcing, acquisition, cleanup and transformation tools, metadata, access tools, data marts, administration and management, and the information delivery system.',
      simpleExplanation: {
        text: 'Operational systems (billing, sales, HR) each hold their own current data. A data warehouse copies data from all of them, cleans and integrates it, keeps years of history, and gives analysts tools to query it — without slowing down the operational systems.',
        analogy: 'A central library that collects books from every department, catalogues them the same way (metadata), keeps old editions (history), and has reading rooms (access tools) for researchers.',
      },
      visual: {
        type: 'architecture',
        title: 'Data warehouse architecture',
        layers: [
          { label: 'Source systems', note: 'operational & external data', items: ['Sales DB', 'Billing', 'HR', 'Flat files', 'External data'] },
          { label: 'Sourcing, cleanup & transformation', note: 'extract, clean, transform, load', items: ['ETL tools'] },
          { label: 'Data warehouse database', note: 'with metadata repository', items: ['Warehouse DB', 'Metadata', 'Data marts'] },
          { label: 'Access tools', note: 'for users', items: ['Query & reporting', 'Application development', 'EIS', 'OLAP', 'Data mining'] },
        ],
        caption: 'Administration & management and the information delivery system work across all layers.',
      },
      explanation: [
        { heading: 'Four characteristics (Inmon’s definition)' },
        {
          table: {
            columns: ['Characteristic', 'Meaning'],
            rows: [
              ['Subject-oriented', 'Organised around subjects such as customer, product, sales — not around applications'],
              ['Integrated', 'Data from different sources uses consistent names, codes and units'],
              ['Time-variant', 'Keeps historical data (e.g. 5–10 years); every record relates to a time'],
              ['Nonvolatile', 'Data is loaded and read, not updated in place'],
            ],
          },
        },
        { heading: 'The components' },
        {
          list: [
            '**Data warehouse database** — the central store, usually a relational DBMS, often on parallel hardware; multidimensional databases are an alternative.',
            '**Sourcing, acquisition, cleanup and transformation tools** — extract data from sources, remove inconsistencies, convert to the warehouse format, and load it (ETL).',
            '**Metadata** — data about the warehouse data. **Technical metadata** (sources, transformations, schemas) is for administrators; **business metadata** (subject areas, meanings, reports) is for users.',
            '**Access tools** — query and reporting tools, application development tools, executive information system (EIS) tools, OLAP tools and data mining tools.',
            '**Data marts** — smaller, subject- or department-specific warehouses. **Dependent** marts are fed from the enterprise warehouse; **independent** marts are built directly from sources.',
            '**Data warehouse administration and management** — security, priority, quality checks, updates, backup and recovery.',
            '**Information delivery system** — distributes warehouse information to users and other systems, e.g. scheduled reports by email.',
          ],
        },
        { heading: 'Operational database vs data warehouse' },
        {
          table: {
            columns: ['', 'Operational (OLTP)', 'Data warehouse'],
            rows: [
              ['Purpose', 'Run day-to-day transactions', 'Support analysis and decisions'],
              ['Data', 'Current, detailed', 'Historical, summarised and detailed'],
              ['Operations', 'Read and update', 'Mostly read; periodic loads'],
              ['Design', 'Application-oriented, normalised', 'Subject-oriented, often star schema'],
            ],
          },
        },
      ],
      example: {
        title: 'A retail chain',
        input: 'Sources: point-of-sale systems in 200 stores, an online shop, and a supplier price file.',
        output: `ETL      : nightly extract, unify product codes, convert currencies
Warehouse: 7 years of sales by product, store and day
Data mart: "marketing" mart with promotions and customer segments
Access   : managers use OLAP dashboards; analysts run data mining`,
        explanation: 'Every component appears: sources, ETL, warehouse database with metadata, a data mart, access tools, and delivery of dashboards to users.',
      },
      keyPoints: [
        'DW = subject-oriented, integrated, time-variant, nonvolatile.',
        'Seven components: database, ETL tools, metadata, access tools, data marts, administration, delivery system.',
        'Metadata is technical (for IT) or business (for users).',
        'Access tools: query/reporting, application development, EIS, OLAP, data mining.',
        'Data marts can be dependent or independent.',
      ],
      importantTerms: [
        { term: 'Data warehouse', meaning: 'Subject-oriented, integrated, time-variant, nonvolatile data store for decision support.' },
        { term: 'Metadata', meaning: 'Data about data — definitions, sources, transformations, meanings.' },
        { term: 'Data mart', meaning: 'A subject- or department-specific subset of warehouse data.' },
        { term: 'ETL', meaning: 'Extract, transform and load.' },
        { term: 'EIS', meaning: 'Executive information system — summarised views for senior managers.' },
      ],
      examPoints: [
        'Write Inmon’s definition and explain the four characteristics.',
        'Draw the architecture diagram.',
        'Explain all seven components.',
        'Contrast operational databases with a data warehouse.',
      ],
      questions: [
        {
          prompt: 'Explain the components of a data warehouse with a neat diagram.',
          plan: ANSWER_PLAN(
            'Subject-oriented, integrated, time-variant, nonvolatile data for decision support',
            'Sources → ETL → warehouse DB + metadata + marts → access tools',
            'Seven components: database, sourcing tools, metadata, access tools, marts, administration, delivery',
            'Retail chain warehouse',
            'Separates analysis from operational systems',
          ),
        },
      ],
      keywords: ['data warehouse', 'subject-oriented', 'integrated', 'time-variant', 'nonvolatile', 'ETL', 'metadata', 'access tools', 'data mart', 'information delivery'],
      remember: [
        { prompt: 'What does “nonvolatile” mean for a warehouse?', answer: 'Data is loaded and read, not updated in place.' },
        { prompt: 'Two kinds of metadata?', answer: 'Technical metadata and business metadata.' },
      ],
    },

    // ------------------------------------------------------------------
    'building-a-data-warehouse': {
      difficulty: 'medium',
      intro: 'Building a warehouse is a business project as much as a technical one. Many fail because the business side was ignored.',
      definition:
        'Building a data warehouse involves **business considerations** (return on investment, top-down vs bottom-up approach, organizational issues), **design considerations** (data content, metadata, data distribution, tools, performance), **technical considerations** (hardware, DBMS, communications), and **implementation considerations** (access tools, data extraction and loading, data placement, metadata, user levels).',
      simpleExplanation: {
        text: 'First justify it and choose the approach — one big enterprise warehouse first, or small data marts first. Then design what data it holds and how, choose the hardware and database, and finally implement the loading and the user tools.',
        analogy: 'Building a house: budget and plan first (business), then the floor plan (design), materials and wiring (technical), and finally construction and furnishing (implementation).',
      },
      visual: {
        type: 'process',
        title: 'Steps in building a warehouse',
        steps: [
          { label: 'Collect and analyse business requirements', detail: 'what decisions must it support?' },
          { label: 'Create the data model and physical design', detail: 'subjects, facts, dimensions' },
          { label: 'Define data sources', detail: 'operational systems, external data' },
          { label: 'Choose database technology and platform', detail: 'DBMS, hardware' },
          { label: 'Extract, clean, transform and load', detail: 'ETL into the warehouse' },
          { label: 'Choose access, reporting and analysis tools', detail: 'query, OLAP, mining' },
          { label: 'Populate and keep updating', detail: 'scheduled refreshes' },
        ],
      },
      explanation: [
        { heading: 'Business considerations' },
        {
          list: [
            '**Return on investment** — a warehouse is costly; its value comes from better decisions, so the business case must be clear.',
            '**Approach** — **top-down**: build the enterprise warehouse first, then derive data marts (consistent, but slow and expensive). **Bottom-up**: build data marts first, then integrate (fast results, but risk of inconsistent “islands”). Many organisations combine both.',
            '**Organizational issues** — a warehouse changes how people use information; it needs user involvement and management support.',
          ],
        },
        { heading: 'Design considerations' },
        {
          list: [
            '**Data content** — detailed and summarised data, cleaned and integrated; usually designed as a star or snowflake schema.',
            '**Metadata** — must be designed in from the start, not added later.',
            '**Data distribution** — data may be spread across servers or locations as it grows.',
            '**Tools** — ETL, access and management tools must work together and share metadata.',
            '**Performance** — users expect fast, interactive responses on huge data.',
          ],
        },
        {
          more: [
            'A widely used design checklist (Ralph Kimball) lists nine decisions: choose the subject (process); decide what one fact table row represents (the grain); identify and conform the dimensions; choose the facts; store pre-calculations; round out the dimension tables; choose how long the database keeps data; track slowly changing dimensions; and decide query priorities and query modes.',
          ],
          label: 'Nine design decisions',
        },
        { heading: 'Technical considerations' },
        {
          list: [
            '**Hardware platform** — capacity for large data and many users; often parallel (SMP or MPP) servers.',
            '**DBMS selection** — scalable, supports parallel queries and large volumes.',
            '**Communications infrastructure** — network bandwidth to move data from sources and to deliver results.',
          ],
        },
        { heading: 'Implementation considerations' },
        {
          list: [
            '**Access tools** — matched to analysis types: reporting, ranking, multivariable analysis, time series, data visualization, exception reporting.',
            '**Data extraction, cleanup, transformation and migration** — the most time-consuming part.',
            '**Data placement strategies** — data marts, replication or partitioning as the warehouse grows.',
            '**Metadata** — available to users and administrators.',
            '**User sophistication levels** — **casual users** (prebuilt reports), **power users** (ad hoc queries), **experts** (complex analysis and mining).',
          ],
        },
      ],
      example: {
        title: 'Top-down or bottom-up?',
        input: 'A college wants analytics for admissions, exams and placements, but has a small budget and wants results within a semester.',
        output: `Choose bottom-up: build an "admissions" data mart first
Design it with conformed dimensions (student, programme, year)
so later marts (exams, placements) integrate into one warehouse`,
        explanation: 'Bottom-up gives quick wins; using shared (conformed) dimensions avoids the “inconsistent islands” risk.',
      },
      keyPoints: [
        'Four groups: business, design, technical, implementation considerations.',
        'Top-down (enterprise first) vs bottom-up (data marts first).',
        'Design: data content, metadata, distribution, tools, performance.',
        'Technical: hardware, DBMS, communications.',
        'Users range from casual to power users to experts.',
      ],
      importantTerms: [
        { term: 'Top-down approach', meaning: 'Build the enterprise warehouse first, then data marts from it.' },
        { term: 'Bottom-up approach', meaning: 'Build data marts first, then integrate them.' },
        { term: 'Grain', meaning: 'The level of detail represented by one fact table row.' },
        { term: 'Conformed dimension', meaning: 'A dimension shared consistently by several data marts.' },
      ],
      examPoints: [
        'Explain business considerations including top-down vs bottom-up.',
        'List design, technical and implementation considerations.',
        'Write the building steps in order.',
        'Mention user sophistication levels.',
      ],
      questions: [
        {
          prompt: 'Discuss the various considerations involved in building a data warehouse.',
          plan: ANSWER_PLAN(
            'Business, design, technical and implementation decisions for a warehouse',
            'Seven building steps',
            'ROI, approach, organisation; content, metadata, distribution, tools, performance; hardware, DBMS, network; access tools, ETL, placement, users',
            'College choosing a bottom-up data mart',
            'Both business and technical sides decide success',
          ),
        },
      ],
      keywords: ['return on investment', 'top-down', 'bottom-up', 'design considerations', 'technical considerations', 'implementation considerations', 'data placement', 'casual user', 'power user', 'grain'],
      remember: [
        { prompt: 'Which approach builds data marts first?', answer: 'Bottom-up.' },
        { prompt: 'Name the three user sophistication levels.', answer: 'Casual users, power users and experts.' },
      ],
    },

    // ------------------------------------------------------------------
    'mapping-the-data-warehouse-to-a-multiprocessor-architecture': {
      difficulty: 'hard',
      intro: 'A warehouse query may scan billions of rows. One processor is too slow — so the work is split across many.',
      definition:
        'Mapping the data warehouse to a multiprocessor architecture means running the warehouse DBMS on parallel hardware so that queries are split across processors and disks. It relies on **parallelism** (inter-query and intra-query, horizontal and vertical), **data partitioning**, and a **parallel database architecture** — shared-memory, shared-disk or shared-nothing.',
      simpleExplanation: {
        text: 'Split the data across many disks and let many processors work on their parts at the same time. The goals are **speed-up** (the same job finishes faster) and **scale-up** (a bigger job finishes in the same time when you add hardware).',
        analogy: 'Checking 10,000 answer scripts: one examiner takes weeks; 20 examiners, each with their own bundle, finish in days.',
      },
      visual: {
        type: 'comparison',
        title: 'Parallel database architectures',
        table: {
          columns: ['Architecture', 'Processors share', 'Strength', 'Weakness'],
          rows: [
            ['Shared-memory (shared-everything, SMP)', 'Memory and disks', 'Simple to program; easy load balancing', 'Memory bus limits scalability'],
            ['Shared-disk (clusters)', 'Disks only; each node has own memory', 'High availability; any node reads any data', 'Needs a distributed lock manager; disk contention'],
            ['Shared-nothing (MPP)', 'Nothing; each node owns its memory and disks', 'Best scalability to many nodes', 'Data must be partitioned well; more complex'],
          ],
        },
      },
      explanation: [
        { heading: 'Goals: speed-up and scale-up' },
        {
          list: [
            '**Linear speed-up** — doubling the hardware halves the time for the same task.',
            '**Linear scale-up** — doubling the hardware handles double the data in the same time.',
          ],
        },
        { heading: 'Types of parallelism' },
        {
          table: {
            columns: ['Type', 'What runs in parallel'],
            rows: [
              ['Inter-query parallelism', 'Different queries run on different processors at the same time'],
              ['Intra-query parallelism', 'Parts of one query run in parallel'],
              ['Horizontal parallelism', 'The data is partitioned; the same operation runs on each partition simultaneously'],
              ['Vertical parallelism', 'Different operations of one query are pipelined: scan → join → sort, each feeding the next'],
            ],
          },
        },
        { heading: 'Data partitioning' },
        'Spreading data across disks is what makes horizontal parallelism possible.',
        {
          list: [
            '**Random / round-robin** — rows dealt to disks in turn; even spread, but no knowledge of values.',
            '**Hash partitioning** — a hash of a key decides the disk; good for exact-match queries.',
            '**Key range partitioning** — rows by value ranges (e.g. customer A–F on disk 1); good for range queries, risk of skew.',
            '**Schema partitioning** — whole tables on different disks.',
            '**User-defined partitioning** — partitions by expressions the user specifies.',
          ],
        },
        { heading: 'What a parallel DBMS must provide' },
        'Parallel execution of all operations (scan, join, sort, load, index build, backup), a **parallel-aware optimizer**, **application transparency** (applications need no change), support for the chosen hardware environment, management tools, and good price/performance.',
        { heading: 'Alternative technologies' },
        'Besides parallel relational databases, warehouses also use **advanced indexing** (e.g. bitmapped indexes), **multidimensional databases**, and specialised hardware to speed up queries.',
      ],
      example: {
        title: 'Hash partitioning a sales table',
        input: 'A 1.2-billion-row sales table on a 4-node shared-nothing system; query: total sales per region.',
        output: `Rows hashed on sale_id → ~300 million per node
Each node sums its own rows (horizontal parallelism)
Partial sums are combined → final answer`,
        explanation: 'Each node works only on its own disk and memory, so adding nodes adds both storage and processing power — near-linear scale-up.',
      },
      keyPoints: [
        'Parallel hardware gives speed-up and scale-up.',
        'Inter-query vs intra-query; horizontal (partitions) vs vertical (pipelining).',
        'Partitioning: round-robin/random, hash, key range, schema, user-defined.',
        'Architectures: shared-memory, shared-disk, shared-nothing (most scalable).',
        'Parallel DBMS needs a parallel optimizer and application transparency.',
      ],
      importantTerms: [
        { term: 'Speed-up', meaning: 'Same task finishes faster with more hardware.' },
        { term: 'Scale-up', meaning: 'Larger task finishes in the same time with more hardware.' },
        { term: 'Pipelining', meaning: 'Vertical parallelism: one operation’s output feeds the next while both run.' },
        { term: 'Shared-nothing', meaning: 'Each node has its own processor, memory and disks (MPP).' },
        { term: 'Data skew', meaning: 'Uneven distribution of data across partitions.' },
      ],
      examPoints: [
        'Define speed-up and scale-up.',
        'Explain the four types of parallelism.',
        'List data partitioning methods.',
        'Compare the three parallel architectures with a table.',
      ],
      questions: [
        {
          prompt: 'Explain how a data warehouse is mapped to a multiprocessor architecture.',
          plan: ANSWER_PLAN(
            'Running the warehouse DBMS on parallel hardware',
            'Shared-memory vs shared-disk vs shared-nothing',
            'Speed-up/scale-up; inter/intra, horizontal/vertical parallelism; partitioning; parallel DBMS features',
            'Hash-partitioned sales table on 4 nodes',
            'Shared-nothing scales best; partition carefully',
          ),
        },
      ],
      keywords: ['multiprocessor', 'speed-up', 'scale-up', 'inter-query parallelism', 'intra-query parallelism', 'horizontal parallelism', 'vertical parallelism', 'hash partitioning', 'range partitioning', 'shared-memory', 'shared-disk', 'shared-nothing'],
      remember: [
        { prompt: 'Which parallelism pipelines scan → join → sort?', answer: 'Vertical parallelism.' },
        { prompt: 'Which architecture scales best?', answer: 'Shared-nothing (MPP).' },
      ],
    },

    // ------------------------------------------------------------------
    'data-extraction-cleanup-and-transformation-tools': {
      difficulty: 'medium',
      intro: 'Most of the cost and time of a warehouse project goes into getting data out of sources and into shape. These tools do that work.',
      definition:
        'Data extraction, cleanup and transformation tools capture data from operational and external sources, remove errors and inconsistencies, convert it to the warehouse’s formats and rules, and load it — the **ETL** process. They also record **metadata** about every source, transformation and load.',
      simpleExplanation: {
        text: 'Extraction reads the data, cleanup fixes it, transformation converts it (codes, units, calculations, summaries), and loading writes it into the warehouse. The tools automate these steps and repeat them on a schedule.',
        analogy: 'A juice factory: collect fruit from many farms (extract), wash and sort it (clean), peel and blend it to one recipe (transform), and bottle it (load).',
      },
      visual: {
        type: 'flow',
        title: 'The ETL pipeline',
        steps: [
          { label: 'Extract', note: 'from DBs, files, legacy systems' },
          { label: 'Clean', note: 'fix errors, remove duplicates' },
          { label: 'Transform', note: 'convert, integrate, summarise' },
          { label: 'Load', note: 'into warehouse / marts' },
          { label: 'Refresh', note: 'capture changes on schedule' },
        ],
      },
      explanation: [
        { heading: 'What the tools must do (requirements)' },
        {
          list: [
            '**Format transformation** — convert data between source and target platforms (data types, character sets).',
            '**Business-rule transformation and calculation** — e.g. derive age from date of birth, map codes to standard values.',
            '**Consolidation and integration** — combine several source records into one warehouse record.',
            '**Metadata synchronisation and management** — store definitions of sources, transformations, load formats and events.',
            'Read from many sources: relational and non-relational databases, flat files, legacy (mainframe) systems.',
            'Support summarisation and aggregation, field splitting and merging, and **change data capture** (load only what changed).',
          ],
        },
        { heading: 'Vendor approaches' },
        {
          table: {
            columns: ['Approach', 'How it works', 'Suits'],
            rows: [
              ['Code generators', 'Generate transformation programs (e.g. COBOL, C) from source and target definitions', 'Complex, one-time or batch conversions'],
              ['Database data replication tools', 'Capture changes from database logs or triggers and apply them to the target', 'Keeping copies in sync with few transformations'],
              ['Rule-driven dynamic transformation engines', 'Capture data on a schedule and apply transformation rules at run time', 'Data mart building; ongoing loads'],
            ],
          },
        },
        { heading: 'Access to legacy data' },
        'Much valuable data lives in older mainframe systems with non-relational formats. **Middleware** and **database gateways** give SQL-style access to such data so it can be extracted without rewriting the old applications.',
        { heading: 'Cleanup in detail' },
        'Cleanup (data scrubbing) uses domain knowledge to fix errors: standardising names and addresses, resolving different codes for the same thing, filling or flagging missing values, and removing duplicates. Data auditing tools find rule violations.',
        { note: 'Tools of the textbook era included products such as Prism Warehouse Manager, ETI·EXTRACT, Vality Integrity and Carleton Passport. Modern equivalents include Informatica, Talend, Microsoft SSIS and cloud ETL services.' },
        { tip: 'ETL design should always capture metadata — when a number on a report looks wrong, metadata lets you trace it back to its source and transformation.' },
      ],
      example: {
        title: 'Transforming two source records',
        input: `Billing:  cust="SRI K", dob=1998-03-14, gender="F", amt=1200.50
Online:   customer="Sri Kumar", gender="female", amount_usd=15.00`,
        output: `Warehouse row: name="Sri Kumar", age=28, gender="F",
               total_spend_inr=2400.50
(names matched, age derived, codes standardised, USD converted at 80)`,
        explanation:
          'Consolidation merged two records, a business rule derived age, the gender code was standardised, and currency was converted — all typical transformations. The exchange rate is illustrative.',
      },
      keyPoints: [
        'ETL = extract, clean, transform, load (plus refresh).',
        'Requirements: format and business-rule transformation, consolidation, metadata, many sources, change capture.',
        'Vendor approaches: code generators, replication tools, rule-driven transformation engines.',
        'Middleware and gateways give access to legacy data.',
        'Metadata from ETL makes warehouse data traceable.',
      ],
      importantTerms: [
        { term: 'ETL', meaning: 'Extract, transform and load — the process of feeding a warehouse.' },
        { term: 'Data scrubbing', meaning: 'Cleaning data using domain knowledge.' },
        { term: 'Change data capture', meaning: 'Detecting and loading only changed source data.' },
        { term: 'Code generator', meaning: 'Tool that produces transformation programs from definitions.' },
        { term: 'Replication', meaning: 'Copying changes from a source database to a target.' },
      ],
      examPoints: [
        'Define ETL and draw the pipeline.',
        'List the requirements of extraction and transformation tools.',
        'Explain the three vendor approaches.',
        'Mention legacy data access and metadata.',
      ],
      questions: [
        {
          prompt: 'Explain data extraction, cleanup and transformation tools used in data warehousing.',
          plan: ANSWER_PLAN(
            'Tools that extract, clean, transform and load source data, recording metadata',
            'Extract → clean → transform → load → refresh',
            'Tool requirements; code generators, replication, rule-driven engines; legacy access',
            'Two source records consolidated into one warehouse row',
            'Most effort of a DW project; metadata gives traceability',
          ),
        },
      ],
      keywords: ['ETL', 'extraction', 'cleanup', 'transformation', 'loading', 'data scrubbing', 'consolidation', 'metadata', 'code generator', 'replication', 'rule-driven engine', 'change data capture', 'legacy data'],
      remember: [
        { prompt: 'Which vendor approach captures changes from database logs?', answer: 'Database data replication tools.' },
        { prompt: 'What does the T in ETL include?', answer: 'Format conversion, business-rule calculations, integration and summarisation.' },
      ],
    },
  },
}
