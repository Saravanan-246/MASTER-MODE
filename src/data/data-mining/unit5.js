// Data Mining and Data Warehousing — Unit V: Reporting, Query Tools and OLAP.
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
    'Unit V is about getting answers out of the warehouse. The first half covers reporting and query tools — their categories, why custom applications are still needed, and Cognos Impromptu as a worked example. The second half covers OLAP: why business data needs a multidimensional model, Codd’s OLAP guidelines, multidimensional vs multirelational OLAP, the categories of OLAP tools, and OLAP on the Internet.',

  map: [
    { label: 'Reporting & query', topics: ['reporting-and-query-tools-and-applications', 'tools-categories', 'the-need-for-applications', 'cognos-impromptu'] },
    { label: 'Why OLAP', topics: ['online-analytical-processing-olap', 'need-for-a-multidimensional-data-model', 'olap-guidelines'] },
    { label: 'OLAP tools', topics: ['multidimensional-olap-vs-multirelational-olap', 'categories-of-olap-tools', 'olap-tools-and-the-internet'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'reporting-and-query-tools-and-applications': {
      difficulty: 'easy',
      intro: 'A warehouse full of data is useless until people can ask it questions. Reporting and query tools are that front door.',
      definition:
        'Reporting and query tools and applications are the **front-end** of a data warehouse: software that lets users retrieve, summarise and present warehouse data as reports, ad hoc query results, executive views, multidimensional analyses and mined patterns — without having to write database code.',
      simpleExplanation: {
        text: 'Most warehouse users are managers and analysts, not programmers. These tools hide SQL and table structures behind menus and business terms, and turn query results into readable tables and charts.',
        analogy: 'An ATM screen: you choose “withdraw” and an amount; you never see the banking system’s database commands.',
      },
      visual: {
        type: 'flow',
        title: 'From question to report',
        steps: [
          { label: 'Business user', note: '“Sales by region this quarter?”' },
          { label: 'Query / reporting tool', note: 'menus, business terms' },
          { label: 'Semantic layer', note: 'maps terms to tables, builds SQL' },
          { label: 'Data warehouse', note: 'runs the query' },
          { label: 'Report or chart', note: 'formatted result' },
        ],
      },
      explanation: [
        { heading: 'Where they fit' },
        'In the warehouse architecture, these tools form the **access tools** layer on top of the warehouse database and its metadata. They use metadata to show data in business language.',
        { heading: 'Categories at a glance' },
        {
          list: [
            '**Reporting tools** — production reports and desktop report writers.',
            '**Managed query tools** — point-and-click ad hoc queries through a business view.',
            '**Executive information system (EIS) tools** — summarised, graphical views for senior managers.',
            '**OLAP tools** — multidimensional analysis: slice, dice, drill down.',
            '**Data mining tools** — discover hidden patterns.',
          ],
        },
        { heading: 'What users need from them' },
        {
          list: [
            'Ease of use and business terminology instead of SQL.',
            'Good performance on large data.',
            'Formatting, charts and distribution of results.',
            'Security — users see only what they are allowed to.',
          ],
        },
        { note: 'Each category is explained in **Tools Categories**; when tools are not enough, organisations build **applications** (see The Need for Applications).' },
      ],
      example: {
        title: 'A branch manager’s question',
        input: 'Branch manager: “Show monthly loan disbursements for my branch this year, compared with last year.”',
        output: `Tool: managed query tool
Action: picks Branch, Month, Year, Loan amount from a business view
Result: a 12-row comparison table and a line chart`,
        explanation: 'The manager never sees table joins or SQL; the semantic layer generates them.',
      },
      keyPoints: [
        'These tools are the front-end (access layer) of the warehouse.',
        'They hide SQL and database structure from users.',
        'Five categories: reporting, managed query, EIS, OLAP, data mining.',
        'Metadata lets them present data in business terms.',
      ],
      importantTerms: [
        { term: 'Front-end tool', meaning: 'Software users interact with to access warehouse data.' },
        { term: 'Semantic layer', meaning: 'Business view that maps user terms to database tables and columns.' },
        { term: 'Ad hoc query', meaning: 'A one-off question not prepared in advance.' },
      ],
      examPoints: [
        'Define reporting and query tools and their role in the warehouse.',
        'List the five categories.',
        'State what users need from these tools.',
      ],
      questions: [
        {
          prompt: 'Write a short note on reporting and query tools and applications in data warehousing.',
          plan: ANSWER_PLAN(
            'Front-end software for retrieving and presenting warehouse data',
            'User → tool → semantic layer → warehouse → report',
            'Role in architecture; five categories; user needs',
            'Branch manager’s loan comparison report',
            'Hide SQL; use metadata; need applications for complex analysis',
          ),
        },
      ],
      keywords: ['front-end tools', 'reporting tools', 'query tools', 'semantic layer', 'access tools', 'EIS', 'OLAP', 'data mining tools', 'metadata'],
      remember: [
        { prompt: 'Which warehouse layer do these tools belong to?', answer: 'The access tools (front-end) layer.' },
        { prompt: 'What hides SQL from the user?', answer: 'The semantic (business) layer of the tool.' },
      ],
    },

    // ------------------------------------------------------------------
    'tools-categories': {
      difficulty: 'medium',
      intro: 'Different users need different tools — a CEO wants a one-page summary, an analyst wants to explore every number.',
      definition:
        'Decision support tools for the warehouse fall into five categories: **reporting** (production reporting tools and report writers), **managed query**, **executive information systems (EIS)**, **OLAP** and **data mining** tools.',
      simpleExplanation: {
        text: 'Reporting tools produce standard reports; managed query tools answer ad hoc questions by point-and-click; EIS tools give executives polished summaries; OLAP tools let analysts explore data across dimensions; data mining tools find patterns no one asked about.',
        analogy: 'Ways to learn about a city: a printed guidebook (reports), asking at an information desk (query), a mayor’s dashboard (EIS), exploring with a map (OLAP), and discovering hidden places (mining).',
      },
      visual: {
        type: 'hierarchy',
        title: 'Five tool categories',
        root: 'Decision support tools',
        children: [
          { label: 'Reporting', note: 'regular reports', children: ['Production reporting', 'Report writers'] },
          { label: 'Managed query', note: 'ad hoc, no SQL', children: ['Business view (metalayer)'] },
          { label: 'EIS', note: 'for executives', children: ['Briefing books', 'Dashboards'] },
          { label: 'OLAP', note: 'multidimensional', children: ['Slice & dice', 'Drill down'] },
          { label: 'Data mining', note: 'discovery', children: ['Patterns', 'Predictions'] },
        ],
      },
      explanation: [
        { heading: '1. Reporting tools' },
        {
          list: [
            '**Production reporting tools** — generate regular operational reports (orders, invoices, payroll) and high-volume batch jobs; often built with third- and fourth-generation languages or specialised reporting products.',
            '**Report writers** — inexpensive desktop tools for end users to design and print formatted reports from the database.',
          ],
        },
        { heading: '2. Managed query tools' },
        'Shield users from SQL and database structure by inserting a **metalayer** (business view) between the user and the database. Users point and click on business terms, and the tool generates the SQL. They often include charting and some multidimensional features.',
        { heading: '3. Executive information system (EIS) tools' },
        'Originally for building **customised graphical decision-support applications** — “briefing books” — for senior executives: key indicators, exceptions and trends, with simple drill-down. They need developer effort to build but are very easy to use.',
        { heading: '4. OLAP tools' },
        'Provide an intuitive way to view corporate data in **multiple dimensions**, with operations such as roll-up, drill-down, slice, dice and pivot. They suit analysis that is hard to express in SQL, such as “sales by product by region by quarter, compared with last year”.',
        { heading: '5. Data mining tools' },
        'Discover meaningful new correlations, patterns and trends by searching large amounts of data with statistical and machine-learning techniques — for example customer segmentation or fraud detection.',
        {
          table: {
            columns: ['Category', 'Typical user', 'Main strength'],
            rows: [
              ['Reporting', 'Operational staff, many users', 'Standard, repeatable reports'],
              ['Managed query', 'Business users', 'Ad hoc questions without SQL'],
              ['EIS', 'Senior executives', 'High-level, graphical summaries'],
              ['OLAP', 'Analysts, managers', 'Multidimensional exploration'],
              ['Data mining', 'Analysts, data scientists', 'Discovering hidden patterns'],
            ],
          },
        },
      ],
      example: {
        title: 'Matching tool to need',
        input: 'A bank: monthly statements, a manager’s ad hoc question, the CEO’s weekly summary, a risk analyst’s exploration, fraud detection.',
        output: `Monthly statements      → production reporting
"Loans above 10 lakh?"  → managed query
CEO weekly summary      → EIS
Risk by region × product→ OLAP
Fraud patterns          → data mining`,
        explanation: 'One warehouse serves all five needs through different front-end tools.',
      },
      keyPoints: [
        'Five categories: reporting, managed query, EIS, OLAP, data mining.',
        'Reporting splits into production reporting and report writers.',
        'Managed query tools use a metalayer to hide SQL.',
        'EIS tools build briefing books for executives.',
        'OLAP explores dimensions; mining discovers patterns.',
      ],
      importantTerms: [
        { term: 'Production reporting', meaning: 'Regular, high-volume operational reports.' },
        { term: 'Report writer', meaning: 'Desktop tool for users to design formatted reports.' },
        { term: 'Metalayer', meaning: 'Business view between users and the database in a managed query tool.' },
        { term: 'Briefing book', meaning: 'Pre-built set of graphical views in an EIS.' },
      ],
      examPoints: [
        'List the five categories with sub-types.',
        'Explain each category with its users.',
        'Give an example use for each.',
      ],
      questions: [
        {
          prompt: 'Explain the categories of reporting and query tools.',
          plan: ANSWER_PLAN(
            'Five categories of decision support front-end tools',
            'Tree of five categories',
            'Reporting (production, report writers), managed query, EIS, OLAP, data mining',
            'Bank needs matched to categories',
            'Different users need different tools',
          ),
        },
      ],
      keywords: ['reporting tools', 'production reporting', 'report writers', 'managed query tools', 'metalayer', 'EIS', 'briefing book', 'OLAP tools', 'data mining tools'],
      remember: [
        { prompt: 'Which category is designed for senior executives?', answer: 'Executive information system (EIS) tools.' },
        { prompt: 'Two kinds of reporting tools?', answer: 'Production reporting tools and report writers.' },
      ],
    },

    // ------------------------------------------------------------------
    'the-need-for-applications': {
      difficulty: 'easy',
      intro: 'Point-and-click tools answer simple questions well. Complex, repeated business analysis needs something more.',
      definition:
        'The need for applications arises because ready-made query and reporting tools cannot meet every requirement. When analysis is **complex**, **multi-step**, **repeated** or specific to a business process, organisations build **custom applications** on top of the warehouse using application development environments.',
      simpleExplanation: {
        text: 'A query tool is like a calculator — great for one-off sums. A sales-forecasting or budgeting application is like a ready-made spreadsheet model: it encodes the business logic so users just enter choices and get answers.',
        analogy: 'Anyone can cook with raw ingredients (query tools), but a busy canteen uses fixed recipes (applications) so every plate comes out the same, fast.',
      },
      visual: {
        type: 'comparison',
        title: 'Ad hoc tools vs custom applications',
        items: [
          { title: 'Query & reporting tools', tone: 'muted', points: ['General purpose', 'Users build each query', 'Good for simple, one-off questions', 'Limited business logic'] },
          { title: 'Custom applications', tone: 'accent', points: ['Built for one business process', 'Logic is pre-built and reused', 'Handles complex, multi-step analysis', 'Guided screens for any user'] },
        ],
      },
      explanation: [
        { heading: 'Why tools alone are not enough' },
        {
          list: [
            '**Complexity** — some questions need many queries combined with calculations, e.g. profitability after allocating costs.',
            '**Users’ skills** — even with a business view, many users cannot design a correct complex query.',
            '**Repetition** — the same analysis is run every week; building it once saves effort and avoids errors.',
            '**Consistency** — an application ensures everyone calculates figures the same way.',
            '**Integration** — results may need to feed other systems or workflows.',
          ],
        },
        { heading: 'How applications are built' },
        'Organisations use **application development environments** — graphical, client/server or web development tools — that connect to the warehouse, and some query/OLAP products include their own development kits. Packaged analytic applications (for sales, finance, budgeting) can also be bought and customised.',
        { heading: 'Typical warehouse applications' },
        {
          list: [
            'Sales and market analysis.',
            'Budgeting and financial planning.',
            'Customer profitability and churn analysis.',
            'Inventory and supply chain analysis.',
          ],
        },
        { tip: 'The trade-off: applications are easier to use and more powerful for their purpose, but cost development time and are less flexible than ad hoc tools.' },
      ],
      example: {
        title: 'Weekly sales review',
        input: 'Every Monday, 40 regional managers need sales vs target, top 10 products, and a forecast for the next month.',
        output: `Without an application: each manager writes several queries → inconsistent numbers
With an application: one screen, choose region → same calculations for everyone`,
        explanation: 'The complex, repeated analysis is encoded once, so results are fast and consistent.',
      },
      keyPoints: [
        'Query tools suit simple, ad hoc questions.',
        'Complex, repeated or process-specific analysis needs applications.',
        'Applications give consistency, reuse and guided use.',
        'Built with application development environments or bought as packages.',
      ],
      importantTerms: [
        { term: 'Custom application', meaning: 'Software built for a specific business analysis task.' },
        { term: 'Application development environment', meaning: 'Tool set for building client/server or web applications.' },
        { term: 'Packaged application', meaning: 'Ready-made analytic software for a business area.' },
      ],
      examPoints: [
        'Explain why tools alone are not enough (five reasons).',
        'Compare tools with applications.',
        'Give examples of warehouse applications.',
      ],
      questions: [
        {
          prompt: 'Why do organisations need applications in addition to query and reporting tools?',
          plan: ANSWER_PLAN(
            'Custom applications for complex, repeated, process-specific analysis',
            'Tools vs applications comparison',
            'Complexity, skills, repetition, consistency, integration; how built',
            'Weekly sales review for 40 managers',
            'Power and consistency vs flexibility',
          ),
        },
      ],
      keywords: ['applications', 'custom application', 'complex analysis', 'consistency', 'reuse', 'application development environment', 'packaged applications'],
      remember: [
        { prompt: 'Main benefit of an application over ad hoc queries?', answer: 'Complex logic is built once and reused consistently.' },
        { prompt: 'Main drawback of applications?', answer: 'Development cost and less flexibility.' },
      ],
    },

    // ------------------------------------------------------------------
    'cognos-impromptu': {
      difficulty: 'medium',
      intro: 'Impromptu is the textbook’s worked example of a managed query and reporting tool.',
      definition:
        '**Cognos Impromptu** is an interactive database query and reporting tool from Cognos Corporation. Users build and run their own reports through a business view stored in an **Impromptu catalog**, which hides SQL and database structure. It supports reports from simple lists to complex cross-tabs, with administrative **governors** and a **Request Server** for server-side queries.',
      simpleExplanation: {
        text: 'An administrator sets up a catalog that describes the database in business terms (“Customer”, “Revenue”). Users then pick items from the catalog, and Impromptu writes the SQL and formats the report.',
        analogy: 'A restaurant menu (catalog) lists dishes in plain words; the kitchen (database) never shows you the recipes (SQL).',
      },
      visual: {
        type: 'architecture',
        title: 'Impromptu’s structure',
        layers: [
          { label: 'Users (Impromptu client)', note: 'build and run reports', items: ['Report templates', 'Frames'] },
          { label: 'Impromptu catalog', note: 'business view of the data', items: ['Folders & business names', 'Joins & calculations', 'Security'] },
          { label: 'Request Server (optional)', note: 'runs queries on a server', items: ['Scheduled reports'] },
          { label: 'Relational databases', note: 'data warehouse', items: ['Oracle', 'DB2', 'SQL Server', 'Others'] },
        ],
      },
      explanation: [
        { heading: 'The catalog' },
        'The **catalog** is the heart of Impromptu: a repository describing the database in business terms. It contains folders of business names, the joins between tables, calculations and filters, and user-class security. Because users work through the catalog, they never need to know SQL or table structures.',
        { heading: 'Main features' },
        {
          list: [
            '**Unified query and reporting interface** — the same environment to query and to format reports.',
            '**Object-oriented, frame-based reporting** — a report is made of frames: list, form, cross-tab, chart, text and picture frames, placed and combined freely.',
            '**Business-relevant reporting** — reports use business names and calculations defined in the catalog.',
            '**Database independence** — the same catalog approach works across relational databases.',
            '**Report templates** — ready-made layouts that users fill with their own data items.',
            '**Governors** — administrator controls that limit query activity, e.g. maximum rows retrieved, query time, outer joins or sorting on the server, to protect database performance.',
            '**Impromptu Request Server** — runs queries on a server instead of the desktop, so large or scheduled reports do not tie up users’ PCs.',
          ],
        },
        { heading: 'Where it fits' },
        'Impromptu is a **managed query and reporting tool**. In the Cognos product family it was complemented by **PowerPlay** for OLAP analysis.',
        { note: 'Cognos is now part of IBM, and Impromptu has been succeeded by IBM Cognos Analytics, but the catalog-plus-governor design remains typical of managed query tools.' },
      ],
      example: {
        title: 'Building a report in Impromptu',
        input: 'User opens the “Sales” catalog and picks Region, Product line, Quarter and Revenue.',
        output: `Impromptu generates SQL with the joins defined in the catalog
Governor caps the result at 50,000 rows
Report appears as a cross-tab frame: Region × Quarter, Revenue in cells`,
        explanation: 'The user worked only with business names; the catalog supplied joins and the governor protected the database.',
      },
      keyPoints: [
        'Impromptu is Cognos’s managed query and reporting tool.',
        'The catalog gives a business view: names, joins, calculations, security.',
        'Reports are built from frames (list, cross-tab, chart …).',
        'Governors limit query load on the database.',
        'The Request Server runs heavy or scheduled queries on a server.',
      ],
      importantTerms: [
        { term: 'Impromptu catalog', meaning: 'Repository that describes the database in business terms for users.' },
        { term: 'Frame', meaning: 'A building block of an Impromptu report (list, form, cross-tab, chart, text, picture).' },
        { term: 'Governor', meaning: 'Administrator setting that limits query activity.' },
        { term: 'Request Server', meaning: 'Component that executes queries on a server rather than the desktop.' },
      ],
      examPoints: [
        'Define Impromptu as a managed query/reporting tool.',
        'Explain the catalog.',
        'List the features: frames, templates, governors, Request Server, database independence.',
        'Draw the user → catalog → database structure.',
      ],
      questions: [
        {
          prompt: 'Explain Cognos Impromptu and its features.',
          plan: ANSWER_PLAN(
            'Interactive query and reporting tool using a business-view catalog',
            'Users → catalog → (Request Server) → databases',
            'Catalog; unified interface; frame-based reports; templates; governors; Request Server',
            'Cross-tab revenue report built from the Sales catalog',
            'Hides SQL; protects database performance',
          ),
        },
      ],
      keywords: ['Cognos Impromptu', 'catalog', 'business view', 'frames', 'cross-tab', 'report templates', 'governors', 'Request Server', 'managed query tool'],
      remember: [
        { prompt: 'What stores the business view in Impromptu?', answer: 'The catalog.' },
        { prompt: 'What are governors?', answer: 'Administrator limits on query activity, such as maximum rows.' },
      ],
    },

    // ------------------------------------------------------------------
    'online-analytical-processing-olap': {
      difficulty: 'medium',
      intro: 'OLTP runs the business; OLAP helps you understand it.',
      definition:
        'Online Analytical Processing (OLAP) is a category of software technology that enables analysts, managers and executives to gain insight into data through **fast, consistent, interactive access** to a wide variety of views of information, organised by the **multiple dimensions** of the business. The term was introduced by E. F. Codd.',
      simpleExplanation: {
        text: 'OLAP lets you look at summarised business data from different angles — by product, region, time — and quickly zoom in, zoom out or rotate the view, without writing queries.',
        analogy: 'Turning a Rubik’s cube in your hands: each face is a different view of the same cube of data.',
      },
      visual: {
        type: 'comparison',
        title: 'OLTP vs OLAP',
        table: {
          columns: ['Feature', 'OLTP', 'OLAP'],
          rows: [
            ['Purpose', 'Run daily transactions', 'Analysis and decision support'],
            ['Users', 'Clerks, customers', 'Analysts, managers, executives'],
            ['Data', 'Current, detailed', 'Historical, summarised, multidimensional'],
            ['Operations', 'Short reads and updates', 'Complex read-only queries'],
            ['Records per operation', 'Tens', 'Millions'],
            ['Design', 'Normalised (ER) tables', 'Star / snowflake schema, cubes'],
          ],
        },
      },
      explanation: [
        { heading: 'OLAP operations' },
        {
          table: {
            columns: ['Operation', 'What it does', 'Example'],
            rows: [
              ['Roll-up (drill-up)', 'Aggregate to a higher level of a hierarchy, or drop a dimension', 'City → state totals'],
              ['Drill-down', 'Go to more detail (the reverse of roll-up)', 'Quarter → months'],
              ['Slice', 'Select one value of one dimension → a sub-cube', 'Only time = Q1'],
              ['Dice', 'Select ranges on two or more dimensions', 'Q1–Q2, Chennai & Madurai, phones'],
              ['Pivot (rotate)', 'Rotate the axes to view the data differently', 'Swap rows and columns'],
            ],
          },
        },
        'Other operations include **drill-across** (across several fact tables) and **drill-through** (down to the detailed warehouse rows).',
        { heading: 'Why OLAP is separate from OLTP' },
        {
          list: [
            'Analytical queries scan millions of rows and would slow down transaction systems.',
            'Analysis needs historical, integrated and summarised data that OLTP systems do not keep.',
            'OLAP structures (cubes, pre-aggregations) answer multidimensional questions quickly.',
          ],
        },
      ],
      example: {
        title: 'Exploring a sales cube',
        input: 'Cube dimensions: time (quarter), location (city), item (category); measure: sales.',
        output: `Slice  time = Q1           → Q1 sales by city and item
Drill  Q1 → Jan, Feb, Mar   → monthly detail
Roll-up city → state         → state totals
Pivot  rows ↔ columns        → items across, cities down`,
        explanation: 'Each operation is a click in an OLAP tool; behind the scenes it reads pre-aggregated or quickly computed values.',
      },
      keyPoints: [
        'OLAP gives fast, interactive, multidimensional analysis.',
        'OLTP runs transactions; OLAP supports decisions.',
        'Operations: roll-up, drill-down, slice, dice, pivot.',
        'OLAP is kept separate to protect OLTP performance and to hold history.',
      ],
      importantTerms: [
        { term: 'OLAP', meaning: 'Online Analytical Processing — interactive multidimensional analysis.' },
        { term: 'OLTP', meaning: 'Online Transaction Processing — day-to-day operational transactions.' },
        { term: 'Roll-up', meaning: 'Aggregating data to a higher level.' },
        { term: 'Slice / dice', meaning: 'Selecting a sub-cube on one / several dimensions.' },
        { term: 'Pivot', meaning: 'Rotating the axes of a view.' },
      ],
      examPoints: [
        'Define OLAP (Codd).',
        'Draw the OLTP vs OLAP comparison table.',
        'Explain the five OLAP operations with examples.',
      ],
      questions: [
        {
          prompt: 'What is OLAP? Differentiate OLTP and OLAP and explain the OLAP operations.',
          plan: ANSWER_PLAN(
            'Technology for fast, interactive, multidimensional analysis',
            'OLTP vs OLAP table',
            'Roll-up, drill-down, slice, dice, pivot; why separate from OLTP',
            'Sales cube explored by quarter, city and item',
            'OLAP supports decisions; OLTP runs operations',
          ),
        },
      ],
      keywords: ['OLAP', 'OLTP', 'multidimensional', 'roll-up', 'drill-down', 'slice', 'dice', 'pivot', 'drill-through', 'Codd'],
      remember: [
        { prompt: 'Which operation goes from quarter to months?', answer: 'Drill-down.' },
        { prompt: 'Selecting ranges on two or more dimensions is called?', answer: 'Dice.' },
      ],
    },

    // ------------------------------------------------------------------
    'need-for-a-multidimensional-data-model': {
      difficulty: 'medium',
      intro: 'Business questions are naturally multidimensional — “how much, of what, where, when?” Flat tables answer them awkwardly.',
      definition:
        'A multidimensional data model views data as a **data cube** defined by **dimensions** (perspectives such as time, product, location) and **measures** (numeric facts such as sales amount). It is needed because business analysis questions involve several dimensions at once, with **hierarchies** within each dimension, which two-dimensional relational tables express only through complex queries.',
      simpleExplanation: {
        text: 'A question like “sales of phones in Chennai in Q2 compared with Q1” mentions three dimensions. A cube stores sales at each product × city × quarter intersection, so the answer is a simple lookup, and you can move up or down each dimension’s hierarchy.',
        analogy: 'A school timetable is two-dimensional (day × period). Add a third dimension — class — and you get a cube of timetables.',
      },
      visual: {
        type: 'hierarchy',
        title: 'A sales cube: dimensions and their hierarchies',
        root: 'Sales cube (measure: amount)',
        children: [
          { label: 'Time', note: 'dimension', children: ['day', 'month', 'quarter', 'year'] },
          { label: 'Product', note: 'dimension', children: ['item', 'brand', 'category'] },
          { label: 'Location', note: 'dimension', children: ['store', 'city', 'state', 'country'] },
        ],
      },
      explanation: [
        { heading: 'Why relational tables struggle' },
        {
          list: [
            'Each multidimensional question becomes a multi-table join with grouping — hard for users to write and slow to run.',
            'Comparisons across time or between dimension members need several queries or complex SQL.',
            'Hierarchical navigation (drill-down, roll-up) is not built into flat tables.',
          ],
        },
        { heading: 'Concepts of the multidimensional model' },
        {
          list: [
            '**Dimensions** — the perspectives for analysis; each has a **dimension table** of attributes.',
            '**Measures (facts)** — numeric values analysed, held in a **fact table** with keys to each dimension.',
            '**Hierarchies** — levels within a dimension, e.g. day → month → quarter → year.',
            '**Data cube** — the n-dimensional space of measures; summaries at all levels form a **lattice of cuboids**.',
          ],
        },
        { heading: 'Schemas for the model' },
        {
          table: {
            columns: ['Schema', 'Structure'],
            rows: [
              ['Star', 'One central fact table joined to one denormalised table per dimension'],
              ['Snowflake', 'Star whose dimension tables are normalised into smaller tables'],
              ['Fact constellation', 'Several fact tables sharing dimension tables (galaxy schema)'],
            ],
          },
        },
        { tip: 'The model matches how managers think, so OLAP tools built on it are intuitive and fast.' },
      ],
      example: {
        title: 'One question, two models',
        input: 'Question: phone sales in Chennai, Q1 vs Q2.',
        output: `Relational: SELECT ... FROM sales JOIN product JOIN store JOIN time
            WHERE ... GROUP BY quarter            (joins + grouping)
Cube:       read cells [phones, Chennai, Q1] and [phones, Chennai, Q2]`,
        explanation: 'The cube already stores the measure at the intersection of the three dimensions, so the answer is direct.',
      },
      keyPoints: [
        'Business questions involve many dimensions at once.',
        'Cube = dimensions + measures; hierarchies inside dimensions.',
        'Fact table holds measures; dimension tables hold attributes.',
        'Schemas: star, snowflake, fact constellation.',
        'Relational tables need complex joins for such questions.',
      ],
      importantTerms: [
        { term: 'Data cube', meaning: 'Multidimensional representation of measures by dimensions.' },
        { term: 'Dimension', meaning: 'A perspective of analysis such as time or product.' },
        { term: 'Measure', meaning: 'A numeric fact, e.g. sales amount.' },
        { term: 'Star schema', meaning: 'Fact table at the centre, one table per dimension around it.' },
      ],
      examPoints: [
        'Explain why the multidimensional model is needed.',
        'Define cube, dimension, measure, hierarchy.',
        'Draw a cube’s dimensions with hierarchies.',
        'Explain star, snowflake and fact constellation schemas.',
      ],
      questions: [
        {
          prompt: 'Why is a multidimensional data model needed? Explain with an example.',
          plan: ANSWER_PLAN(
            'Data viewed as a cube of measures by dimensions',
            'Sales cube with time, product, location hierarchies',
            'Limits of relational tables; dimensions, measures, hierarchies; star/snowflake/constellation',
            'Phone sales in Chennai Q1 vs Q2',
            'Matches how managers think; fast OLAP',
          ),
        },
      ],
      keywords: ['multidimensional data model', 'data cube', 'dimension', 'measure', 'fact table', 'dimension table', 'hierarchy', 'star schema', 'snowflake schema', 'fact constellation'],
      remember: [
        { prompt: 'Where are measures stored in a star schema?', answer: 'In the central fact table.' },
        { prompt: 'Give a time hierarchy.', answer: 'day → month → quarter → year.' },
      ],
    },

    // ------------------------------------------------------------------
    'olap-guidelines': {
      difficulty: 'medium',
      intro: 'In 1993 E. F. Codd set out twelve rules that an OLAP product should follow. They are still the standard checklist.',
      definition:
        'OLAP guidelines are the **twelve rules** proposed by E. F. Codd that describe the requirements of an OLAP tool — from a multidimensional conceptual view and transparency to unlimited dimensions and aggregation levels.',
      simpleExplanation: {
        text: 'The rules say an OLAP tool should look multidimensional to users, hide where the data comes from, perform consistently, serve many users, handle sparse data, and let users manipulate and report data freely across any dimensions.',
        analogy: 'A building code for OLAP products: a checklist every good design should satisfy.',
      },
      visual: {
        type: 'process',
        title: 'Codd’s 12 OLAP rules',
        steps: [
          { label: 'Multidimensional conceptual view', detail: 'users see data as cubes' },
          { label: 'Transparency', detail: 'source and architecture hidden from users' },
          { label: 'Accessibility', detail: 'access heterogeneous data sources' },
          { label: 'Consistent reporting performance', detail: 'speed does not drop as dimensions grow' },
          { label: 'Client/server architecture', detail: 'server serves many clients' },
          { label: 'Generic dimensionality', detail: 'every dimension treated equally' },
          { label: 'Dynamic sparse matrix handling', detail: 'store sparse cubes efficiently' },
          { label: 'Multi-user support', detail: 'concurrent access with security' },
          { label: 'Unrestricted cross-dimensional operations', detail: 'calculate across dimensions' },
          { label: 'Intuitive data manipulation', detail: 'drill and pivot directly' },
          { label: 'Flexible reporting', detail: 'arrange rows, columns, cells freely' },
          { label: 'Unlimited dimensions and aggregation levels', detail: 'no artificial limits' },
        ],
      },
      explanation: [
        { heading: 'The rules explained' },
        {
          list: [
            '**Multidimensional conceptual view** — users see data as a multidimensional model, matching business thinking.',
            '**Transparency** — users should not need to know where data comes from or how it is stored.',
            '**Accessibility** — the tool maps its logical view to heterogeneous physical sources and accesses them itself.',
            '**Consistent reporting performance** — response time should not degrade noticeably as the number of dimensions or data size grows.',
            '**Client/server architecture** — the OLAP server works with multiple, varied clients with little integration effort.',
            '**Generic dimensionality** — all dimensions are equal in structure and operations.',
            '**Dynamic sparse matrix handling** — adapt physical storage to sparse data (most cube cells are empty).',
            '**Multi-user support** — concurrent retrieval and update with integrity and security.',
            '**Unrestricted cross-dimensional operations** — the tool recognises hierarchies and computes across dimensions automatically.',
            '**Intuitive data manipulation** — drill-down, roll-up, pivot directly on the view, without menus.',
            '**Flexible reporting** — rows, columns and cells can be arranged in any way for comparison.',
            '**Unlimited dimensions and aggregation levels** — Codd suggested at least 15–20 dimensions.',
          ],
          ordered: true,
        },
        { note: 'Codd and others later extended the list with features such as drill-through to detail data, treatment of missing values, and incremental database refresh.' },
      ],
      example: {
        title: 'Checking a tool against the rules',
        input: 'An OLAP tool slows down sharply when a fifth dimension is added, and treats “time” specially compared with other dimensions.',
        output: `Violates: consistent reporting performance (rule 4)
Violates: generic dimensionality (rule 6)`,
        explanation: 'The rules work as an evaluation checklist when choosing an OLAP product.',
      },
      keyPoints: [
        'Codd proposed 12 rules for OLAP tools in 1993.',
        'Key rules: multidimensional view, transparency, accessibility, consistent performance.',
        'Generic dimensionality and unlimited dimensions keep the model flexible.',
        'Sparse matrix handling and multi-user support are practical requirements.',
        'Later extended with features like drill-through.',
      ],
      importantTerms: [
        { term: 'Transparency', meaning: 'Users need not know the source or storage of data.' },
        { term: 'Generic dimensionality', meaning: 'All dimensions treated equally.' },
        { term: 'Sparse matrix', meaning: 'A cube where most cells have no data.' },
      ],
      examPoints: [
        'List all twelve rules in order.',
        'Explain each in one line.',
        'Mention the later extensions.',
      ],
      questions: [
        {
          prompt: 'Explain Codd’s guidelines (12 rules) for OLAP systems.',
          plan: ANSWER_PLAN(
            'Twelve rules describing requirements of OLAP tools',
            'Numbered list of the 12 rules',
            'One-line explanation of each rule',
            'Tool failing rules 4 and 6',
            'Used as an evaluation checklist; later extended',
          ),
        },
      ],
      keywords: ['Codd’s 12 rules', 'multidimensional conceptual view', 'transparency', 'accessibility', 'consistent reporting performance', 'client/server', 'generic dimensionality', 'sparse matrix', 'multi-user', 'flexible reporting'],
      remember: [
        { prompt: 'Who proposed the OLAP guidelines?', answer: 'E. F. Codd (1993).' },
        { prompt: 'Which rule deals with mostly empty cubes?', answer: 'Dynamic sparse matrix handling.' },
      ],
    },

    // ------------------------------------------------------------------
    'multidimensional-olap-vs-multirelational-olap': {
      difficulty: 'hard',
      intro: 'Both deliver OLAP — the difference is where the cube actually lives.',
      definition:
        '**Multidimensional OLAP (MOLAP)** stores data in a specialised **multidimensional database (MDDB)** of pre-computed arrays. **Multirelational OLAP** — relational OLAP (**ROLAP**) — keeps data in a **relational database** (usually a star schema) and uses a metadata layer to generate SQL that delivers multidimensional views.',
      simpleExplanation: {
        text: 'MOLAP builds the cube in advance, so answers are instant, but the cube can only be so big. ROLAP builds answers on the fly from relational tables, so it handles huge data, but each query takes longer.',
        analogy: 'MOLAP is a printed ready-reckoner — every answer already worked out. ROLAP is a calculator — slower, but it can handle any numbers you give it.',
      },
      visual: {
        type: 'comparison',
        title: 'MOLAP vs multirelational (ROLAP)',
        items: [
          {
            title: 'Multidimensional OLAP (MOLAP)',
            tone: 'accent',
            points: ['Storage: MDDB arrays', 'Pre-computed aggregates', 'Very fast queries', 'Limited data volume', 'Sparse data wastes space', 'Proprietary storage'],
          },
          {
            title: 'Multirelational OLAP (ROLAP)',
            tone: 'muted',
            points: ['Storage: RDBMS star schema', 'Computed on the fly via SQL', 'Slower for complex queries', 'Scales to very large data', 'Uses existing RDBMS skills', 'Metadata layer needed'],
          },
        ],
      },
      explanation: [
        { heading: 'MOLAP architecture' },
        'Data is loaded from the warehouse into the **MOLAP server**, which stores it in multidimensional arrays and pre-calculates aggregates. Clients query the server directly. Indexing by array position makes retrieval extremely fast.',
        { heading: 'ROLAP (multirelational) architecture' },
        'Data stays in the **relational warehouse**. A ROLAP engine with a **metadata layer** translates each multidimensional request into SQL, runs it on the RDBMS, and presents the result as a multidimensional view. Summary tables can be added to speed up common queries.',
        {
          table: {
            columns: ['Feature', 'MOLAP', 'ROLAP'],
            rows: [
              ['Data storage', 'Multidimensional database', 'Relational database'],
              ['Query speed', 'Fast (pre-computed)', 'Slower (SQL at run time)'],
              ['Data volume', 'Moderate (gigabytes)', 'Very large'],
              ['Load / update time', 'Long (cube build)', 'Short'],
              ['Dimensions', 'Limited, sparsity problems', 'Many, flexible'],
              ['Best for', 'Fast analysis of summarised data', 'Detailed analysis of large data'],
            ],
          },
        },
        { heading: 'Hybrid OLAP' },
        '**HOLAP** combines both: detailed data stays relational while aggregates are stored in multidimensional form — the speed of MOLAP with the scalability of ROLAP.',
      ],
      example: {
        title: 'Choosing an approach',
        input: 'Case 1: finance team, 5 GB of monthly summaries, needs instant response.\nCase 2: telecom, 20 TB of call records, needs detailed analysis.',
        output: `Case 1 → MOLAP (small, summarised, speed matters)
Case 2 → ROLAP (huge, detailed, scalability matters)`,
        explanation: 'Data size and the level of detail decide the architecture.',
      },
      keyPoints: [
        'MOLAP stores cubes in a multidimensional database.',
        'ROLAP (multirelational) stores data relationally and generates SQL.',
        'MOLAP: fast but limited in size; ROLAP: scalable but slower.',
        'MOLAP pre-computes; ROLAP computes on demand.',
        'HOLAP combines both.',
      ],
      importantTerms: [
        { term: 'MOLAP', meaning: 'Multidimensional OLAP — storage in a multidimensional database.' },
        { term: 'ROLAP', meaning: 'Relational (multirelational) OLAP — storage in an RDBMS.' },
        { term: 'MDDB', meaning: 'Multidimensional database storing data in arrays.' },
        { term: 'HOLAP', meaning: 'Hybrid OLAP combining MOLAP and ROLAP.' },
      ],
      examPoints: [
        'Define MOLAP and ROLAP.',
        'Describe the architecture of each.',
        'Draw the comparison table.',
        'Mention HOLAP.',
      ],
      questions: [
        {
          prompt: 'Compare multidimensional OLAP and multirelational OLAP.',
          plan: ANSWER_PLAN(
            'MOLAP stores cubes in an MDDB; ROLAP stores data in an RDBMS and generates SQL',
            'Side-by-side comparison',
            'Architectures; feature table: storage, speed, volume, updates, dimensions',
            'Finance team (MOLAP) vs telecom (ROLAP)',
            'Trade-off speed vs scalability; HOLAP',
          ),
        },
      ],
      keywords: ['MOLAP', 'ROLAP', 'multirelational OLAP', 'MDDB', 'pre-computed aggregates', 'star schema', 'metadata layer', 'scalability', 'HOLAP'],
      remember: [
        { prompt: 'Which approach handles very large data better?', answer: 'ROLAP (multirelational).' },
        { prompt: 'Which approach answers fastest?', answer: 'MOLAP, because aggregates are pre-computed.' },
      ],
    },

    // ------------------------------------------------------------------
    'categories-of-olap-tools': {
      difficulty: 'medium',
      intro: 'OLAP tools differ mainly in where the multidimensional data is stored and processed.',
      definition:
        'OLAP tools are categorised by their architecture into **MOLAP** (multidimensional database server), **ROLAP** (relational OLAP server over an RDBMS), and **managed query environment (MQE)** or desktop OLAP tools that build small cubes on the client. **Hybrid OLAP (HOLAP)** combines approaches.',
      simpleExplanation: {
        text: 'MOLAP tools keep the cube on a special server; ROLAP tools keep data in the relational warehouse and generate SQL; MQE tools download a small cube (“hypercube”) to the user’s PC for fast local analysis.',
        analogy: 'Watching a film: from a cinema’s own projector (MOLAP), streamed on demand (ROLAP), or downloaded to your phone (MQE/desktop).',
      },
      visual: {
        type: 'hierarchy',
        title: 'Categories of OLAP tools',
        root: 'OLAP tools',
        children: [
          { label: 'MOLAP', note: 'MDDB server', children: ['Pre-built cubes', 'Fast'] },
          { label: 'ROLAP', note: 'relational OLAP server', children: ['SQL generation', 'Scalable'] },
          { label: 'MQE / desktop OLAP', note: 'cube on the client', children: ['Hypercubes', 'Mobile analysis'] },
          { label: 'HOLAP', note: 'hybrid', children: ['Detail relational', 'Aggregates multidimensional'] },
        ],
      },
      explanation: [
        { heading: 'MOLAP tools' },
        'Use a **multidimensional database server** that stores pre-aggregated data in arrays. Excellent performance for summarised data; limited scalability and long load times. Classic example: Arbor (later Oracle) **Essbase**.',
        { heading: 'ROLAP tools' },
        'Work directly against the relational warehouse through a **metadata layer**, generating SQL (often several passes) for each request. Scale to very large data and many dimensions; performance depends on the RDBMS and summary tables. Classic example: **MicroStrategy** DSS products.',
        { heading: 'Managed query environment (MQE) / desktop OLAP' },
        'Users run queries against the warehouse or a server to build a small multidimensional **cube on the desktop** (a hypercube), then analyse it locally — even offline. Easy and cheap to deploy, but cubes must be rebuilt as data changes and their size is limited. Classic examples: Cognos **PowerPlay**, BusinessObjects.',
        { heading: 'Hybrid OLAP (HOLAP)' },
        'Stores detailed data relationally and aggregates multidimensionally, combining MOLAP speed with ROLAP scale.',
        {
          table: {
            columns: ['Category', 'Data stored in', 'Strength', 'Weakness'],
            rows: [
              ['MOLAP', 'MDDB on server', 'Speed', 'Size, load time'],
              ['ROLAP', 'Relational warehouse', 'Scalability, detail', 'Query speed'],
              ['MQE / desktop', 'Small cube on client', 'Low cost, offline use', 'Cube size, data freshness'],
              ['HOLAP', 'Both', 'Balance', 'Complexity'],
            ],
          },
        },
        { note: 'Product names are examples from the period the textbook describes; vendors and products have changed since.' },
      ],
      example: {
        title: 'Sales team on the road',
        input: 'Sales representatives need to analyse their own region’s sales on laptops during client visits, often without internet.',
        output: 'Choose MQE / desktop OLAP: build a regional hypercube before the trip and analyse it offline.',
        explanation: 'Neither a MOLAP nor a ROLAP server is reachable offline; a desktop cube is.',
      },
      keyPoints: [
        'Categories: MOLAP, ROLAP, MQE/desktop OLAP, HOLAP.',
        'MOLAP: MDDB server, fast, limited size.',
        'ROLAP: relational, metadata layer, scalable.',
        'MQE: small cubes on the client, cheap and portable.',
        'HOLAP balances speed and scale.',
      ],
      importantTerms: [
        { term: 'MQE', meaning: 'Managed query environment — client-side cubes built from queries.' },
        { term: 'Hypercube', meaning: 'A small multidimensional cube stored on the client.' },
        { term: 'Metadata layer', meaning: 'ROLAP layer mapping multidimensional requests to SQL.' },
      ],
      examPoints: [
        'Name and explain each category.',
        'Give one example product for each (as historical examples).',
        'Draw the comparison table.',
      ],
      questions: [
        {
          prompt: 'Explain the categories of OLAP tools.',
          plan: ANSWER_PLAN(
            'Classification of OLAP tools by where data is stored and processed',
            'Tree: MOLAP, ROLAP, MQE, HOLAP',
            'Architecture, strengths and weaknesses of each',
            'Sales team using desktop OLAP offline',
            'Choose by data size, speed and mobility needs',
          ),
        },
      ],
      keywords: ['MOLAP', 'ROLAP', 'MQE', 'desktop OLAP', 'hypercube', 'HOLAP', 'metadata layer', 'Essbase', 'PowerPlay'],
      remember: [
        { prompt: 'Which category builds cubes on the user’s PC?', answer: 'MQE / desktop OLAP.' },
        { prompt: 'Which category generates SQL against the warehouse?', answer: 'ROLAP.' },
      ],
    },

    // ------------------------------------------------------------------
    'olap-tools-and-the-internet': {
      difficulty: 'easy',
      intro: 'The web turned OLAP from a desktop tool for a few analysts into something anyone with a browser can use.',
      definition:
        'OLAP tools and the Internet refers to delivering OLAP analysis through **web browsers**. The Internet offers universal, low-cost connectivity, so OLAP vendors web-enabled their tools — from static HTML reports, to dynamic pages generated on request, to interactive browser-based OLAP clients.',
      simpleExplanation: {
        text: 'Instead of installing OLAP software on every PC, users open a web page. The server does the analysis and sends back the results — first as fixed pages, later as interactive pages where users can drill and pivot.',
        analogy: 'Moving from buying DVDs (installed software) to streaming (browser access): one server, any device.',
      },
      visual: {
        type: 'timeline',
        title: 'Generations of web-enabled OLAP',
        events: [
          { label: 'Static HTML', detail: 'reports pre-generated and published as pages' },
          { label: 'Dynamic HTML', detail: 'web server (CGI / app server) runs the query and builds the page on request' },
          { label: 'Interactive clients', detail: 'Java applets / ActiveX in the browser give drill and pivot' },
          { label: 'Today', detail: 'browser-based BI dashboards and cloud OLAP services' },
        ],
      },
      explanation: [
        { heading: 'Why the Internet suits OLAP' },
        {
          list: [
            '**Universal access** — anyone with a browser and permission can reach the data.',
            '**Low deployment cost** — no client installation or upgrades on every PC (thin clients).',
            '**Easy administration** — software and data are managed centrally on the server.',
            '**Reach** — mobile users, partners and customers can be given controlled access.',
          ],
        },
        { heading: 'Typical web-OLAP architecture' },
        {
          visual: {
            type: 'flow',
            title: 'Web OLAP request',
            steps: [
              { label: 'Browser', note: 'user drills down' },
              { label: 'Web server', note: 'receives the request' },
              { label: 'OLAP / application server', note: 'runs the analysis' },
              { label: 'Warehouse / cube', note: 'supplies data' },
              { label: 'HTML / interactive view', note: 'returned to the browser' },
            ],
          },
        },
        { heading: 'Concerns' },
        {
          list: [
            '**Security** — authentication, encryption and access control are essential on a public network.',
            '**Performance** — network delays; heavy processing must stay on the server.',
            '**Interactivity** — early static pages could not drill or pivot.',
          ],
        },
        { tip: 'The direction has continued: most modern BI and OLAP tools are browser- or cloud-based.' },
      ],
      example: {
        title: 'A regional manager on a tablet',
        input: 'Manager opens the company’s BI portal in a browser and drills from national to regional to store sales.',
        output: `Browser sends drill request → server computes → page updates with store-level figures
No software installed; access controlled by login`,
        explanation: 'This is the third-generation (interactive) model: analysis on the server, interaction in the browser.',
      },
      keyPoints: [
        'The Internet gives OLAP universal, low-cost access.',
        'Generations: static HTML → dynamic HTML → interactive browser clients.',
        'Benefits: thin clients, central administration, wide reach.',
        'Concerns: security, performance, interactivity.',
      ],
      importantTerms: [
        { term: 'Web-enabled OLAP', meaning: 'OLAP analysis delivered through a web browser.' },
        { term: 'Thin client', meaning: 'A client (browser) with little local processing or installation.' },
        { term: 'CGI', meaning: 'Common Gateway Interface — early way for web servers to run programs that build pages.' },
      ],
      examPoints: [
        'Explain why the web suits OLAP.',
        'Describe the generations of web-enabled OLAP.',
        'Draw the browser → web server → OLAP server → warehouse flow.',
        'List security and performance concerns.',
      ],
      questions: [
        {
          prompt: 'Discuss OLAP tools and the Internet.',
          plan: ANSWER_PLAN(
            'Delivering OLAP analysis through web browsers',
            'Timeline of static, dynamic, interactive web OLAP',
            'Benefits; architecture; concerns',
            'Manager drilling sales on a tablet',
            'Server-side analysis, browser-side interaction',
          ),
        },
      ],
      keywords: ['web-enabled OLAP', 'Internet', 'browser', 'thin client', 'static HTML', 'dynamic HTML', 'CGI', 'Java applets', 'security'],
      remember: [
        { prompt: 'Main advantage of web OLAP?', answer: 'Universal, low-cost access without installing client software.' },
        { prompt: 'What could first-generation (static HTML) web OLAP not do?', answer: 'Interactive drill-down or pivoting.' },
      ],
    },
  },
}
