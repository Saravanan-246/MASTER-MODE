// Data Mining and Data Warehousing — Unit I: Data Mining and Data Preprocessing.
// Topic ids match the syllabus outline in ../subjects.js.
// Textbook context: Han & Kamber, "Data Mining: Concepts and Techniques".
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
    'Unit I answers two questions: what is data mining, and why can it not start on raw data? You meet the knowledge discovery process, the technologies data mining borrows from, the major open issues, and then the preprocessing steps — cleaning, integration, reduction, transformation and discretization — that turn messy data into minable data.',

  map: [
    { label: 'What is data mining?', topics: ['data-mining', 'data-mining-technologies', 'major-issues-in-data-mining'] },
    { label: 'Why preprocess?', topics: ['data-preprocessing'] },
    { label: 'Fix & combine', topics: ['data-cleaning', 'data-integration'] },
    { label: 'Shrink & reshape', topics: ['data-reduction', 'data-transformation', 'data-discretization'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'data-mining': {
      difficulty: 'easy',
      intro: 'Shops, banks and hospitals collect huge amounts of data. Data mining is how that data turns into decisions.',
      definition:
        'Data mining is the process of discovering interesting, useful and previously unknown **patterns** and **knowledge** from large amounts of data. It is the core step of the larger **Knowledge Discovery in Databases (KDD)** process.',
      simpleExplanation: {
        text: 'Data is plentiful but knowledge is scarce. Data mining digs through large data sets to find patterns — such as “customers who buy bread often buy butter” — that people can act on.',
        analogy: 'Gold mining: tonnes of rock (data) are dug and processed to find a few nuggets of gold (knowledge). The name says “data mining”, but it really means “knowledge mining from data”.',
      },
      visual: {
        type: 'flow',
        title: 'The KDD process',
        steps: [
          { label: 'Data cleaning', note: 'remove noise, fix gaps' },
          { label: 'Data integration', note: 'combine sources' },
          { label: 'Data selection', note: 'pick relevant data' },
          { label: 'Data transformation', note: 'into minable form' },
          { label: 'Data mining', note: 'find patterns' },
          { label: 'Pattern evaluation', note: 'keep the interesting ones' },
          { label: 'Knowledge presentation', note: 'visualise for users' },
        ],
      },
      explanation: [
        { heading: 'Data mining and KDD' },
        'Many people use “data mining” for the whole knowledge discovery process. Strictly, data mining is **one step** of KDD — the step where intelligent methods extract patterns. Steps 1–4 prepare the data; steps 6–7 judge and present the results.',
        { heading: 'What kinds of data can be mined?' },
        {
          list: [
            '**Database data** — relational tables of customers, items, sales.',
            '**Data warehouse data** — integrated, historical data organised for analysis.',
            '**Transactional data** — each record is a transaction, e.g. one shopping bill.',
            '**Other data** — time-series, spatial, text, web, multimedia and stream data.',
          ],
        },
        { heading: 'What kinds of patterns? (data mining functionalities)' },
        {
          table: {
            columns: ['Functionality', 'Finds', 'Example'],
            rows: [
              ['Characterization & discrimination', 'Summary of a class, or how classes differ', 'Profile of customers who spend > Rs. 50,000 a year'],
              ['Frequent patterns & associations', 'Items that occur together', 'Bread → butter'],
              ['Classification & prediction', 'A model that labels new data', 'Will this loan applicant default?'],
              ['Cluster analysis', 'Groups of similar objects, no labels given', 'Customer segments'],
              ['Outlier analysis', 'Objects that do not fit the rest', 'Fraudulent card transaction'],
            ],
          },
        },
        { heading: 'Descriptive vs predictive' },
        '**Descriptive** mining describes the general properties of existing data (characterization, associations, clustering). **Predictive** mining builds a model to predict unknown or future values (classification, prediction).',
        { heading: 'Are all patterns interesting?' },
        'No. A pattern is interesting if it is **easily understood**, **valid** on new data with some certainty, **potentially useful**, and **novel**. Measures such as support and confidence help filter patterns.',
      ],
      example: {
        title: 'A supermarket',
        input: 'One year of billing data from a supermarket chain (millions of transactions).',
        output: `Association : 60% of customers who buy bread also buy butter
Cluster     : "weekend family shoppers" form a distinct group
Outlier     : one card used in two cities within an hour`,
        explanation:
          'None of these facts is stored anywhere in the database. They are **discovered** by mining it — that is the difference between data mining and simply querying.',
      },
      keyPoints: [
        'Data mining extracts interesting patterns and knowledge from large data.',
        'It is one step of KDD: cleaning, integration, selection, transformation, mining, evaluation, presentation.',
        'Data sources: databases, data warehouses, transactions and complex data types.',
        'Functionalities: characterization/discrimination, associations, classification/prediction, clustering, outlier analysis.',
        'Mining tasks are descriptive or predictive.',
      ],
      importantTerms: [
        { term: 'KDD', meaning: 'Knowledge Discovery in Databases — the full process from raw data to knowledge.' },
        { term: 'Pattern', meaning: 'A regularity in data, such as items that occur together.' },
        { term: 'Descriptive mining', meaning: 'Describes properties of the existing data.' },
        { term: 'Predictive mining', meaning: 'Builds models to predict unknown values.' },
        { term: 'Interestingness', meaning: 'Whether a pattern is understandable, valid, useful and novel.' },
      ],
      examPoints: [
        'Define data mining and relate it to KDD.',
        'Draw the seven KDD steps in order.',
        'List the kinds of data that can be mined.',
        'Tabulate the data mining functionalities with examples.',
        'State what makes a pattern interesting.',
      ],
      questions: [
        {
          prompt: 'What is data mining? Explain the steps of the knowledge discovery (KDD) process.',
          plan: ANSWER_PLAN(
            'Discovering interesting patterns and knowledge from large data; one step of KDD',
            'Seven-step KDD flow',
            'Each step; kinds of data; functionalities; descriptive vs predictive',
            'Supermarket billing data → associations, clusters, outliers',
            'Patterns must be valid, useful, novel and understandable',
          ),
        },
      ],
      keywords: ['data mining', 'KDD', 'pattern', 'knowledge', 'data cleaning', 'pattern evaluation', 'descriptive', 'predictive', 'interestingness'],
      remember: [
        { prompt: 'Is data mining the whole KDD process?', answer: 'Strictly no — it is the pattern-finding step within KDD.' },
        { prompt: 'Name the five data mining functionalities.', answer: 'Characterization/discrimination, associations, classification/prediction, clustering, outlier analysis.' },
      ],
    },

    // ------------------------------------------------------------------
    'data-mining-technologies': {
      difficulty: 'easy',
      intro: 'Data mining is not a single invention. It sits where several older fields meet.',
      definition:
        'Data mining technologies are the disciplines whose methods data mining uses: mainly **statistics**, **machine learning**, **database systems and data warehouses**, and **information retrieval**, supported by visualization, pattern recognition, algorithms and high-performance computing.',
      simpleExplanation: {
        text: 'Statistics gives the maths for describing data, machine learning gives programs that learn from examples, databases store and query huge data efficiently, and information retrieval searches text. Data mining combines them.',
        analogy: 'A cricket team: batsmen, bowlers and a wicket-keeper each bring a skill; the team wins only by combining them.',
      },
      visual: {
        type: 'network',
        title: 'Data mining draws on many fields',
        center: { label: 'Data mining', note: 'interdisciplinary' },
        nodes: [
          { label: 'Statistics', note: 'models, tests' },
          { label: 'Machine learning', note: 'learn from data' },
          { label: 'Database systems', note: 'store & query' },
          { label: 'Data warehouses', note: 'OLAP, history' },
          { label: 'Information retrieval', note: 'search documents' },
          { label: 'Visualization', note: 'see patterns' },
          { label: 'High-performance computing', note: 'scale up' },
        ],
      },
      explanation: [
        { heading: 'Statistics' },
        'Studies the collection, analysis and presentation of data. A **statistical model** describes data with mathematical functions and probability distributions. Statistics also tests whether a mined pattern is significant or just chance.',
        { heading: 'Machine learning' },
        'Investigates how computers learn or improve from data. Its learning styles map directly onto mining tasks:',
        {
          list: [
            '**Supervised learning** — learns from labelled examples → classification.',
            '**Unsupervised learning** — finds structure without labels → clustering.',
            '**Semi-supervised learning** — uses a few labelled and many unlabelled examples.',
            '**Active learning** — the learner asks a user to label chosen examples.',
          ],
        },
        { heading: 'Database systems and data warehouses' },
        'Provide efficient storage, indexing and query processing for very large data. **Data warehouses** integrate data from many sources over time and support **OLAP** (multidimensional analysis), which is closely tied to mining.',
        { heading: 'Information retrieval' },
        'The science of searching documents or information in documents (text, web pages, multimedia). Combined with mining, it powers search engines and topic discovery.',
        { heading: 'Other supporting areas' },
        'Pattern recognition, data visualization, algorithms and high-performance (parallel, distributed, cloud) computing all help make mining accurate and scalable.',
        { note: 'Data mining differs from a plain database query: a query retrieves facts you specify; mining discovers patterns you did not know to ask for.' },
      ],
      example: {
        title: 'One project, several technologies',
        input: 'A bank wants to flag risky loan applications.',
        output: `Data warehouse  → 10 years of customer and loan history
Statistics      → which attributes really relate to default
Machine learning→ classifier trained on past repaid/defaulted loans
Visualization   → risk dashboard for loan officers`,
        explanation: 'No single field solves the problem; data mining glues them together.',
      },
      keyPoints: [
        'Data mining is interdisciplinary.',
        'Main contributors: statistics, machine learning, databases/data warehouses, information retrieval.',
        'Machine learning styles: supervised, unsupervised, semi-supervised, active.',
        'Visualization and high-performance computing support scalable, usable mining.',
      ],
      importantTerms: [
        { term: 'Statistical model', meaning: 'A mathematical description of data using random variables and distributions.' },
        { term: 'Supervised learning', meaning: 'Learning from examples whose class labels are known.' },
        { term: 'Unsupervised learning', meaning: 'Learning structure from data without class labels.' },
        { term: 'Information retrieval', meaning: 'Searching for documents or information within documents.' },
      ],
      examPoints: [
        'Draw data mining at the centre of contributing fields.',
        'Explain each main technology in two lines.',
        'List the four machine-learning styles.',
        'Contrast mining with querying.',
      ],
      questions: [
        {
          prompt: 'Which technologies are used in data mining? Explain.',
          plan: ANSWER_PLAN(
            'Disciplines whose methods data mining combines',
            'Hub diagram: data mining with contributing fields',
            'Statistics, machine learning (4 styles), DB/DW, information retrieval, others',
            'Bank loan-risk project using several fields',
            'Interdisciplinary; mining discovers, querying retrieves',
          ),
        },
      ],
      keywords: ['statistics', 'machine learning', 'supervised', 'unsupervised', 'semi-supervised', 'active learning', 'database systems', 'data warehouse', 'information retrieval', 'visualization'],
      remember: [
        { prompt: 'Which learning style matches clustering?', answer: 'Unsupervised learning.' },
        { prompt: 'Which technology provides OLAP?', answer: 'Data warehouses.' },
      ],
    },

    // ------------------------------------------------------------------
    'major-issues-in-data-mining': {
      difficulty: 'medium',
      intro: 'Data mining is powerful but not solved. These are the problems researchers and practitioners still wrestle with.',
      definition:
        'The major issues in data mining are the open challenges in **mining methodology**, **user interaction**, **efficiency and scalability**, **diversity of database types**, and the **impact of data mining on society**.',
      simpleExplanation: {
        text: 'Can we find every kind of pattern? Can users steer the search? Can it run on billions of records? Can it handle text, graphs and streams? And is it fair to the people whose data is mined? Each question is a group of issues.',
        analogy: 'Building a good search engine is not just about the search algorithm — speed, user experience, many file types and privacy all matter too.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Five groups of issues',
        root: 'Major issues',
        children: [
          { label: 'Mining methodology', children: ['New kinds of knowledge', 'Noise & incompleteness', 'Pattern evaluation'] },
          { label: 'User interaction', children: ['Interactive mining', 'Background knowledge', 'Query languages', 'Visualization'] },
          { label: 'Efficiency & scalability', children: ['Scalable algorithms', 'Parallel & distributed', 'Incremental mining'] },
          { label: 'Diversity of data types', children: ['Complex data', 'Dynamic & networked data'] },
          { label: 'Data mining & society', children: ['Social impact', 'Privacy-preserving', 'Invisible mining'] },
        ],
      },
      explanation: [
        { heading: '1. Mining methodology' },
        {
          list: [
            '**Mining various and new kinds of knowledge** — from associations to graph and network patterns.',
            '**Mining in multidimensional space** — searching across combinations of dimensions, as in data cubes.',
            '**Handling uncertainty, noise and incompleteness** — dirty data produces wrong patterns.',
            '**Pattern evaluation** — separating truly interesting patterns from the obvious or useless.',
          ],
        },
        { heading: '2. User interaction' },
        {
          list: [
            '**Interactive mining** — users should be able to drill down, change focus and refine the search.',
            '**Incorporating background knowledge** — domain rules and concept hierarchies guide mining.',
            '**Data mining query languages** — let users describe ad hoc mining tasks, like SQL does for queries.',
            '**Presentation and visualization** — results must be understandable to non-experts.',
          ],
        },
        { heading: '3. Efficiency and scalability' },
        'Algorithms must scale to very large data with predictable running time. **Parallel**, **distributed** (e.g. cloud) and **incremental** algorithms — which update results as new data arrives instead of starting over — address this.',
        { heading: '4. Diversity of database types' },
        'Real data is not only relational tables: text, images, spatial and temporal data, graphs, social networks and data streams each need special methods. Data may also be spread across the Web and change continuously.',
        { heading: '5. Data mining and society' },
        {
          list: [
            '**Social impact** — mining can improve services but also be misused.',
            '**Privacy-preserving data mining** — finding patterns without exposing personal records.',
            '**Invisible data mining** — mining built into everyday systems (e.g. recommendations) without users knowing.',
          ],
        },
        { note: 'Older editions group the issues as: mining methodology and user interaction, performance, and diversity of database types. The five-group list above covers the same points in more detail.' },
      ],
      example: {
        title: 'Issues in a real system',
        input: 'An e-commerce site mines clickstreams to recommend products.',
        output: `Scalability : billions of clicks per day
Data types  : clicks (streams) + reviews (text) + images
Methodology : noisy clicks from bots must be cleaned
Society     : users' browsing history is personal — privacy`,
        explanation: 'A single application faces almost every group of issues at once.',
      },
      keyPoints: [
        'Five groups: methodology, user interaction, efficiency/scalability, data diversity, society.',
        'Noise and incompleteness must be handled for reliable patterns.',
        'Users need interactive mining, background knowledge and visualization.',
        'Parallel, distributed and incremental algorithms give scalability.',
        'Privacy-preserving mining protects individuals.',
      ],
      importantTerms: [
        { term: 'Scalability', meaning: 'Running time grows reasonably as the data grows.' },
        { term: 'Incremental mining', meaning: 'Updating mined results with new data without re-mining everything.' },
        { term: 'Privacy-preserving data mining', meaning: 'Mining that protects sensitive individual data.' },
        { term: 'Background knowledge', meaning: 'Domain information used to guide the mining process.' },
      ],
      examPoints: [
        'Name the five groups and give two issues under each.',
        'Explain why noisy data is a methodology issue.',
        'Explain scalability with parallel and incremental mining.',
        'Mention privacy and social impact.',
      ],
      questions: [
        {
          prompt: 'Discuss the major issues in data mining.',
          plan: ANSWER_PLAN(
            'Open challenges that affect how well and how safely data mining works',
            'Tree of five issue groups',
            'Methodology, user interaction, efficiency & scalability, data types, society',
            'E-commerce recommendation system facing each issue',
            'Scalable, interactive, privacy-aware mining is the goal',
          ),
        },
      ],
      keywords: ['mining methodology', 'user interaction', 'scalability', 'incremental mining', 'complex data types', 'privacy-preserving', 'pattern evaluation', 'visualization'],
      remember: [
        { prompt: 'Which issue group does “privacy” belong to?', answer: 'Data mining and society.' },
        { prompt: 'What is incremental mining?', answer: 'Updating results as new data arrives instead of mining from scratch.' },
      ],
    },

    // ------------------------------------------------------------------
    'data-preprocessing': {
      difficulty: 'easy',
      intro: '“Garbage in, garbage out.” Most of the effort in a real mining project goes into preparing the data.',
      definition:
        'Data preprocessing is the set of techniques applied to raw data before mining to improve its **quality** and make it suitable for analysis. Its major tasks are **data cleaning**, **data integration**, **data reduction** and **data transformation** (including discretization).',
      simpleExplanation: {
        text: 'Real data is incomplete (missing values), noisy (errors), and inconsistent (different codes for the same thing). Preprocessing fixes these problems so that mining results can be trusted.',
        analogy: 'Washing, peeling and chopping vegetables before cooking. Skip it and even the best recipe fails.',
      },
      visual: {
        type: 'process',
        title: 'Major preprocessing tasks',
        steps: [
          { label: 'Data cleaning', detail: 'fill missing values, smooth noise, fix inconsistencies' },
          { label: 'Data integration', detail: 'merge data from multiple sources' },
          { label: 'Data reduction', detail: 'smaller representation, same results' },
          { label: 'Data transformation', detail: 'normalize, aggregate, construct attributes' },
          { label: 'Data discretization', detail: 'replace numbers with intervals or concepts' },
        ],
      },
      explanation: [
        { heading: 'Why preprocess? Data quality' },
        'Data has good quality if it satisfies the needs of its intended use. The factors are:',
        {
          table: {
            columns: ['Factor', 'Problem example'],
            rows: [
              ['Accuracy', 'Age entered as 210'],
              ['Completeness', 'Income field left blank'],
              ['Consistency', 'Dept code “CS” in one table, “CSE” in another'],
              ['Timeliness', 'Monthly sales not yet updated'],
              ['Believability', 'Users no longer trust a table known to have had errors'],
              ['Interpretability', 'Codes that nobody can understand'],
            ],
          },
        },
        { heading: 'Why is real data dirty?' },
        {
          list: [
            '**Incomplete** — values not recorded, attributes not collected, equipment failure.',
            '**Noisy** — faulty instruments, human or computer errors, transmission errors.',
            '**Inconsistent** — different sources use different names, codes or units.',
          ],
        },
        { heading: 'The tasks work together' },
        'The tasks are not strictly sequential. For example, cleaning may also need transformation, and integration can create new inconsistencies that must be cleaned again.',
        { tip: 'Exam shortcut: Cleaning → Integration → Reduction → Transformation. Discretization is usually treated as part of transformation.' },
      ],
      example: {
        title: 'Raw vs preprocessed student records',
        input: `Raw:  (101, "arun", 88, CS) (102, "PRIYA", ?, CSE) (101, "Arun", 88, CS) (103, "Karthik", 450, CS)`,
        output: `Cleaned: duplicate 101 removed, missing mark filled, 450 flagged as error
Integrated: "CSE" mapped to "CS"
Transformed: names in one case, marks scaled to 0–1`,
        explanation: 'Each problem — duplicate, missing value, impossible value, inconsistent code — is handled by a different preprocessing task.',
      },
      keyPoints: [
        'Preprocessing improves data quality before mining.',
        'Quality factors: accuracy, completeness, consistency, timeliness, believability, interpretability.',
        'Real data is incomplete, noisy and inconsistent.',
        'Tasks: cleaning, integration, reduction, transformation (with discretization).',
      ],
      importantTerms: [
        { term: 'Data quality', meaning: 'How well data satisfies the requirements of its intended use.' },
        { term: 'Noisy data', meaning: 'Data containing random errors or variance.' },
        { term: 'Incomplete data', meaning: 'Data with missing attribute values or attributes.' },
        { term: 'Inconsistent data', meaning: 'Data containing discrepancies in codes or names.' },
      ],
      examPoints: [
        'Explain why preprocessing is needed using data-quality factors.',
        'List the three causes of dirty data.',
        'Draw the major tasks with one line on each.',
      ],
      questions: [
        {
          prompt: 'Why is data preprocessing needed? Explain the major tasks of data preprocessing.',
          plan: ANSWER_PLAN(
            'Techniques to improve data quality before mining',
            'Flow of cleaning, integration, reduction, transformation, discretization',
            'Data quality factors; incomplete, noisy, inconsistent data; each task',
            'Raw vs preprocessed student records',
            'Garbage in, garbage out',
          ),
        },
      ],
      keywords: ['data quality', 'incomplete', 'noisy', 'inconsistent', 'data cleaning', 'data integration', 'data reduction', 'data transformation', 'discretization'],
      remember: [
        { prompt: 'Name the six data quality factors.', answer: 'Accuracy, completeness, consistency, timeliness, believability, interpretability.' },
        { prompt: 'Name the four major preprocessing tasks.', answer: 'Cleaning, integration, reduction, transformation.' },
      ],
    },

    // ------------------------------------------------------------------
    'data-cleaning': {
      difficulty: 'medium',
      intro: 'Missing marks, typing mistakes, impossible ages — cleaning is where they get fixed.',
      definition:
        'Data cleaning (data cleansing) fills in **missing values**, smooths out **noise** while identifying **outliers**, and corrects **inconsistencies** in the data.',
      simpleExplanation: {
        text: 'For a blank value you can drop the row, type it in, or fill it with a sensible estimate such as the average. For noisy values you smooth them, for example by replacing each value with the average of its small group (bin).',
        analogy: 'Proof-reading an exam register: fill in a blank mark from the answer sheet, correct an obvious typo, and circle anything suspicious.',
      },
      visual: {
        type: 'database',
        title: 'Dirty data to clean',
        table: {
          name: 'customers (raw)',
          columns: [{ name: 'id', key: true }, 'age', 'income', 'city'],
          rows: [
            ['1', '34', '52,000', 'Chennai'],
            ['2', '—', '48,000', 'Madurai'],
            ['3', '29', '61,000', 'chennai'],
            ['4', '210', '55,000', 'Coimbatore'],
          ],
        },
        highlight: [1, 2, 3],
        caption: 'Row 2: **missing** age. Row 3: **inconsistent** city spelling. Row 4: **noise/outlier** — an impossible age.',
      },
      explanation: [
        { heading: 'Handling missing values' },
        {
          list: [
            '**Ignore the tuple** — easy, but wasteful when many values are missing.',
            '**Fill in manually** — accurate but time-consuming.',
            '**Use a global constant** such as “Unknown” — simple, but the miner may treat “Unknown” as a real category.',
            '**Use a measure of central tendency** — the mean (or the median for skewed data) of the attribute.',
            '**Use the mean or median for the same class** — e.g. the average income of customers in the same credit-risk class.',
            '**Use the most probable value** — predicted with regression, Bayesian inference or a decision tree. Most popular, as it uses the most information.',
          ],
        },
        { heading: 'Handling noisy data: binning' },
        'Sort the values, split them into **bins**, then smooth each value using its bin:',
        {
          visual: {
            type: 'process',
            title: 'Binning prices (equal-frequency bins of 3)',
            steps: [
              { label: '4, 8, 15, 21, 21, 24, 25, 28, 34', detail: 'sorted data' },
              { label: 'Bin 1: 4, 8, 15 | Bin 2: 21, 21, 24 | Bin 3: 25, 28, 34', detail: 'partition' },
              { label: 'By means: 9, 9, 9 | 22, 22, 22 | 29, 29, 29', detail: 'smoothing by bin means' },
              { label: 'By boundaries: 4, 4, 15 | 21, 21, 24 | 25, 25, 34', detail: 'each value → closest boundary' },
            ],
          },
        },
        'Smoothing by **bin medians** replaces each value with the bin median instead.',
        { heading: 'Other ways to smooth noise' },
        {
          list: [
            '**Regression** — fit a line or function and replace values with fitted ones.',
            '**Outlier analysis** — cluster the data; values that fall outside every cluster are possible outliers.',
          ],
        },
        { heading: 'Data cleaning as a process' },
        '**Discrepancy detection** uses metadata (domain, range, data type) and rules: a **unique rule** (each value distinct), a **consecutive rule** (no missing values between lowest and highest), and a **null rule** (how blanks are recorded). Tools include **data scrubbing** tools (use domain knowledge such as postal codes), **data auditing** tools (find rule violations) and **ETL** tools for transformations.',
      ],
      example: {
        title: 'Fill a missing value with the attribute mean',
        input: 'Ages: 34, ?, 29, 41, 36',
        output: `Mean of known ages = (34 + 29 + 41 + 36) / 4 = 35
Cleaned ages: 34, 35, 29, 41, 36`,
        explanation:
          'The blank is replaced by the mean of the known values. If the data were skewed (a few very large values), the median would be the safer choice.',
      },
      keyPoints: [
        'Cleaning handles missing values, noise/outliers and inconsistencies.',
        'Six strategies for missing values; most probable value is the most popular.',
        'Binning: sort, partition into bins, smooth by means, medians or boundaries.',
        'Regression and outlier analysis also smooth noise.',
        'Cleaning is a process: discrepancy detection then transformation.',
      ],
      importantTerms: [
        { term: 'Missing value', meaning: 'An attribute with no recorded value.' },
        { term: 'Noise', meaning: 'Random error or variance in a measured value.' },
        { term: 'Binning', meaning: 'Smoothing sorted data by consulting its neighbourhood (bin).' },
        { term: 'Outlier', meaning: 'A value very different from the rest of the data.' },
        { term: 'Data scrubbing', meaning: 'Using domain knowledge to detect and correct errors.' },
      ],
      examPoints: [
        'Define data cleaning and its three targets.',
        'List the six methods for missing values.',
        'Work the binning example with means and boundaries.',
        'Mention regression, outlier analysis and discrepancy detection.',
      ],
      questions: [
        {
          prompt: 'What is data cleaning? Explain the methods to handle missing values and noisy data.',
          plan: ANSWER_PLAN(
            'Filling missing values, smoothing noise, correcting inconsistencies',
            'Dirty table with missing, noisy and inconsistent values marked',
            'Six missing-value methods; binning, regression, outlier analysis; discrepancy detection',
            'Binning prices by means and boundaries',
            'Most probable value is preferred; cleaning is iterative',
          ),
        },
      ],
      keywords: ['missing values', 'noisy data', 'binning', 'bin means', 'bin boundaries', 'regression', 'outlier analysis', 'discrepancy detection', 'data scrubbing'],
      remember: [
        { prompt: 'Smoothing 25, 28, 34 by bin boundaries gives?', answer: '25, 25, 34' },
        { prompt: 'Which missing-value method uses the most information?', answer: 'Filling with the most probable value (regression, Bayesian, decision tree).' },
      ],
    },

    // ------------------------------------------------------------------
    'data-integration': {
      difficulty: 'medium',
      intro: 'Analysis often needs data from several systems — sales, billing, customer care. Merging them correctly is harder than it looks.',
      definition:
        'Data integration combines data from multiple sources into a coherent data store, such as a data warehouse. It must solve the **entity identification problem**, detect **redundancy** and **duplicate tuples**, and resolve **data value conflicts**.',
      simpleExplanation: {
        text: 'Two systems may call the same thing by different names (`cust_id` vs `customer_no`), store the same fact twice, or use different units. Integration matches, de-duplicates and harmonises them.',
        analogy: 'Merging two class registers kept by different teachers: one writes “Roll No”, the other “Reg. No”, and one records marks out of 50, the other out of 100.',
      },
      visual: {
        type: 'flow',
        title: 'Integrating two sources',
        steps: [
          { label: 'Source A', note: 'cust_id, income in Rs.' },
          { label: 'Source B', note: 'customer_no, income in $' },
          { label: 'Match entities', note: 'cust_id = customer_no' },
          { label: 'Resolve conflicts', note: 'convert $ → Rs.' },
          { label: 'Remove redundancy', note: 'correlation, duplicates' },
          { label: 'Unified store', note: 'data warehouse' },
        ],
      },
      explanation: [
        { heading: '1. Entity identification problem' },
        'How do we know `customer_id` in one database and `cust_number` in another refer to the same attribute? **Metadata** — name, meaning, data type, range, null rules — helps match schemas and avoid errors.',
        { heading: '2. Redundancy and correlation analysis' },
        'An attribute is **redundant** if it can be derived from others (e.g. annual income from monthly income). Correlation analysis detects it:',
        {
          table: {
            columns: ['Data type', 'Test', 'Interpretation'],
            rows: [
              ['Nominal', 'χ² (chi-square) test', 'Large χ² → attributes are correlated'],
              ['Numeric', 'Correlation coefficient r (Pearson)', 'r > 0 positive, r < 0 negative, r = 0 independent'],
              ['Numeric', 'Covariance', 'Positive → values rise together'],
            ],
          },
        },
        { code: 'r(A,B) = Σ (aᵢ − Ā)(bᵢ − B̄) / (n · σA · σB)        −1 ≤ r ≤ +1', lang: 'text' },
        { trap: 'Correlation does not imply causality: hospitals and car thefts may correlate because both depend on population.' },
        { heading: '3. Tuple duplication' },
        'The same real-world record may appear twice, often because of denormalised tables. Duplicates must be detected and removed.',
        { heading: '4. Data value conflict detection and resolution' },
        'The same attribute may have different values in different sources because of different **units** (kg vs pounds), **scales** or **encodings** (price with or without tax). These must be converted to one representation.',
      ],
      example: {
        title: 'Two stores, one warehouse',
        input: `Store A: (C17, "Meena", 45000 Rs/month)
Store B: (17, "Meena S", 6480 $/year)`,
        output: `Unified: (17, "Meena S", 45000 Rs/month)
→ id formats matched, currency/period converted, duplicate merged`,
        explanation:
          'Entity identification links C17 and 17, value conflict resolution converts the income to one unit and period, and the duplicate becomes one record.',
      },
      keyPoints: [
        'Integration merges multiple sources into one coherent store.',
        'Entity identification uses metadata to match attributes.',
        'Redundancy: χ² for nominal data, correlation coefficient and covariance for numeric.',
        'Duplicate tuples must be removed.',
        'Value conflicts (units, scales, encodings) must be resolved.',
      ],
      importantTerms: [
        { term: 'Entity identification problem', meaning: 'Deciding which attributes/records in different sources are the same.' },
        { term: 'Metadata', meaning: 'Data about data: names, meanings, types, ranges.' },
        { term: 'Redundant attribute', meaning: 'An attribute derivable from other attributes.' },
        { term: 'Correlation coefficient', meaning: 'Measure from −1 to +1 of how two numeric attributes vary together.' },
        { term: 'χ² test', meaning: 'Test of correlation between two nominal attributes.' },
      ],
      examPoints: [
        'Define data integration.',
        'Explain its four problems with examples.',
        'Name the correlation measures for nominal and numeric data.',
        'State that correlation is not causation.',
      ],
      questions: [
        {
          prompt: 'Explain data integration and the issues involved in it.',
          plan: ANSWER_PLAN(
            'Combining multiple sources into one coherent store',
            'Two sources → match → resolve → de-duplicate → warehouse',
            'Entity identification, redundancy & correlation (χ², r, covariance), tuple duplication, value conflicts',
            'Two stores merged into one customer record',
            'Metadata helps; correlation ≠ causation',
          ),
        },
      ],
      keywords: ['data integration', 'entity identification', 'metadata', 'redundancy', 'correlation analysis', 'chi-square', 'correlation coefficient', 'covariance', 'tuple duplication', 'value conflict'],
      remember: [
        { prompt: 'Which test checks correlation between nominal attributes?', answer: 'The χ² (chi-square) test.' },
        { prompt: 'Range of the correlation coefficient?', answer: '−1 to +1.' },
      ],
    },

    // ------------------------------------------------------------------
    'data-reduction': {
      difficulty: 'medium',
      intro: 'Mining terabytes takes too long. Data reduction gives a much smaller data set that produces (almost) the same results.',
      definition:
        'Data reduction obtains a reduced representation of the data set that is much smaller in volume yet closely maintains the integrity of the original, so mining on it is faster and gives the same or nearly the same results. Strategies: **dimensionality reduction**, **numerosity reduction** and **data compression**.',
      simpleExplanation: {
        text: 'Either keep fewer **columns** (dimensionality reduction), represent the **rows** more compactly (numerosity reduction), or **compress** the whole data set.',
        analogy: 'Summarising a textbook: drop chapters that do not matter (fewer attributes), replace long lists with a table of averages (fewer values), and zip the file (compression).',
      },
      visual: {
        type: 'hierarchy',
        title: 'Data reduction strategies',
        root: 'Data reduction',
        children: [
          { label: 'Dimensionality reduction', note: 'fewer attributes', children: ['Wavelet transforms', 'PCA', 'Attribute subset selection'] },
          { label: 'Numerosity reduction', note: 'smaller representation', children: ['Regression & log-linear', 'Histograms', 'Clustering', 'Sampling', 'Data cube aggregation'] },
          { label: 'Data compression', note: 'encoded data', children: ['Lossless', 'Lossy'] },
        ],
      },
      explanation: [
        { heading: 'Dimensionality reduction' },
        {
          list: [
            '**Wavelet transforms** — transform data into wavelet coefficients and keep only the strongest ones.',
            '**Principal Components Analysis (PCA)** — finds a smaller number of new orthogonal attributes (principal components) that capture most of the variation.',
            '**Attribute subset selection** — removes irrelevant or redundant attributes.',
          ],
        },
        'Heuristic methods for attribute subset selection:',
        {
          table: {
            columns: ['Method', 'How it works'],
            rows: [
              ['Stepwise forward selection', 'Start empty; add the best attribute at each step'],
              ['Stepwise backward elimination', 'Start with all; remove the worst attribute at each step'],
              ['Forward + backward combination', 'Add the best and remove the worst at each step'],
              ['Decision tree induction', 'Attributes that never appear in the tree are irrelevant'],
            ],
          },
        },
        { heading: 'Numerosity reduction' },
        {
          list: [
            '**Parametric** — fit a model and store only its parameters: **regression** (y = wx + b) and **log-linear** models.',
            '**Histograms** — store counts per bucket (equal-width or equal-frequency) instead of every value.',
            '**Clustering** — store cluster representatives instead of all objects.',
            '**Sampling** — use a random subset: simple random sample without replacement (SRSWOR), with replacement (SRSWR), cluster sample, stratified sample.',
            '**Data cube aggregation** — store summaries, e.g. yearly sales instead of quarterly.',
          ],
        },
        { heading: 'Data compression' },
        '**Lossless** compression reconstructs the original exactly; **lossy** compression reconstructs only an approximation but saves more space (wavelets and PCA can be seen as lossy).',
        { tip: 'The time spent reducing data should not outweigh the time saved in mining.' },
      ],
      example: {
        title: 'Data cube aggregation',
        input: `Quarterly sales 2025: Q1 224, Q2 408, Q3 350, Q4 586 (in Rs. thousand)`,
        output: 'Annual sales 2025: 1,568',
        explanation:
          'If the analysis only needs yearly totals, four values become one. Applied to every branch and item, this shrinks the data enormously without changing the answer.',
      },
      keyPoints: [
        'Reduction gives a smaller data set with nearly the same mining results.',
        'Dimensionality reduction: wavelets, PCA, attribute subset selection.',
        'Numerosity reduction: regression/log-linear, histograms, clustering, sampling, cube aggregation.',
        'Compression can be lossless or lossy.',
        'Reduction time must be less than the mining time saved.',
      ],
      importantTerms: [
        { term: 'Dimensionality reduction', meaning: 'Reducing the number of attributes.' },
        { term: 'PCA', meaning: 'Principal Components Analysis — new attributes capturing most variance.' },
        { term: 'Numerosity reduction', meaning: 'Replacing data by smaller representations.' },
        { term: 'Stratified sample', meaning: 'A sample drawn from each group (stratum) of the data.' },
        { term: 'Lossless compression', meaning: 'Original data can be rebuilt exactly.' },
      ],
      examPoints: [
        'Define data reduction and name the three strategies.',
        'Explain attribute subset selection methods.',
        'List numerosity reduction techniques including sampling types.',
        'Give the data cube aggregation example.',
      ],
      questions: [
        {
          prompt: 'What is data reduction? Explain the data reduction strategies.',
          plan: ANSWER_PLAN(
            'Smaller representation that preserves the mining results',
            'Tree: dimensionality, numerosity, compression',
            'Wavelets, PCA, attribute subset selection; regression, histograms, clustering, sampling, cube aggregation; lossless/lossy',
            'Quarterly sales aggregated to annual',
            'Reduction must cost less than it saves',
          ),
        },
      ],
      keywords: ['data reduction', 'dimensionality reduction', 'wavelet transform', 'PCA', 'attribute subset selection', 'numerosity reduction', 'histogram', 'sampling', 'data cube aggregation', 'lossless', 'lossy'],
      remember: [
        { prompt: 'Which subset selection method starts with all attributes?', answer: 'Stepwise backward elimination.' },
        { prompt: 'SRSWOR stands for?', answer: 'Simple random sample without replacement.' },
      ],
    },

    // ------------------------------------------------------------------
    'data-transformation': {
      difficulty: 'medium',
      intro: 'Salary in lakhs and age in years cannot be compared directly. Transformation puts attributes into forms the mining method can use.',
      definition:
        'Data transformation converts or consolidates data into forms appropriate for mining. Strategies include **smoothing**, **attribute construction**, **aggregation**, **normalization**, **discretization** and **concept hierarchy generation**.',
      simpleExplanation: {
        text: 'The most common transformation is **normalization**: rescaling values to a small common range such as 0 to 1, so that an attribute with big numbers (income) does not overpower one with small numbers (age).',
        analogy: 'Converting marks from different exams (out of 50, 75 and 100) into percentages before comparing students.',
      },
      visual: {
        type: 'process',
        title: 'Min-max normalization of income 73,600',
        steps: [
          { label: "v' = (v − min) / (max − min)", detail: 'new range 0.0 to 1.0' },
          { label: '(73,600 − 12,000) / (98,000 − 12,000)', detail: 'min 12,000, max 98,000' },
          { label: '61,600 / 86,000', detail: 'subtract' },
          { label: '0.716', detail: 'normalized value' },
        ],
      },
      explanation: [
        { heading: 'Transformation strategies' },
        {
          list: [
            '**Smoothing** — remove noise (binning, regression, clustering).',
            '**Attribute construction** — build new attributes from existing ones, e.g. `area = length × width`.',
            '**Aggregation** — summarise, e.g. daily sales → monthly totals.',
            '**Normalization** — scale values to a small range such as [0, 1] or [−1, 1].',
            '**Discretization** — replace raw numbers with interval or concept labels (next topic).',
            '**Concept hierarchy generation for nominal data** — e.g. street → city → state → country.',
          ],
        },
        { heading: 'Normalization methods' },
        {
          table: {
            columns: ['Method', 'Formula', 'Example (income 73,600)'],
            rows: [
              ['Min-max', "v' = (v − min)/(max − min) × (new_max − new_min) + new_min", '0.716 for range [0,1]'],
              ['Z-score', "v' = (v − mean) / std. deviation", '(73,600 − 54,000)/16,000 = 1.225'],
              ['Decimal scaling', "v' = v / 10ʲ, smallest j with max |v'| < 1", '−986…917 → −0.986…0.917 (j = 3)'],
            ],
          },
        },
        {
          list: [
            '**Min-max** keeps relationships between values but fails if new data falls outside the original min and max.',
            '**Z-score** is useful when the actual min and max are unknown or outliers dominate.',
            '**Decimal scaling** moves the decimal point.',
          ],
        },
        { tip: 'Normalization is especially important for distance-based methods (k-nearest-neighbour, clustering) and neural networks.' },
      ],
      example: {
        title: 'Z-score normalization',
        input: 'Income mean = 54,000, standard deviation = 16,000. Normalize 73,600 and 38,000.',
        output: `73,600 → (73,600 − 54,000) / 16,000 = 1.225
38,000 → (38,000 − 54,000) / 16,000 = −1.0`,
        explanation:
          'A z-score says how many standard deviations a value is from the mean: 73,600 is 1.225 SD above it, 38,000 is 1 SD below.',
      },
      keyPoints: [
        'Transformation converts data into forms suitable for mining.',
        'Strategies: smoothing, attribute construction, aggregation, normalization, discretization, concept hierarchies.',
        'Min-max: maps to a new range using min and max.',
        'Z-score: uses mean and standard deviation.',
        'Decimal scaling: divides by a power of 10.',
      ],
      importantTerms: [
        { term: 'Normalization', meaning: 'Scaling attribute values to a small specified range.' },
        { term: 'Attribute construction', meaning: 'Creating new attributes from existing ones.' },
        { term: 'Aggregation', meaning: 'Summarising data, e.g. daily to monthly.' },
        { term: 'Z-score', meaning: 'Number of standard deviations a value lies from the mean.' },
      ],
      examPoints: [
        'List the six transformation strategies.',
        'Write all three normalization formulas.',
        'Work a numerical example for min-max and z-score.',
      ],
      questions: [
        {
          prompt: 'Explain data transformation. Describe normalization methods with examples.',
          plan: ANSWER_PLAN(
            'Converting data into forms appropriate for mining',
            'Worked min-max calculation',
            'Six strategies; min-max, z-score, decimal scaling formulas',
            'Income 73,600 normalized by min-max and z-score',
            'Normalization matters for distance-based methods',
          ),
        },
      ],
      keywords: ['data transformation', 'smoothing', 'attribute construction', 'aggregation', 'normalization', 'min-max', 'z-score', 'decimal scaling', 'concept hierarchy'],
      remember: [
        { prompt: 'Min-max normalize 50 with min 0 and max 200 to [0,1].', answer: '0.25' },
        { prompt: 'Which normalization uses mean and standard deviation?', answer: 'Z-score normalization.' },
      ],
    },

    // ------------------------------------------------------------------
    'data-discretization': {
      difficulty: 'medium',
      intro: 'Ages 23, 37 and 64 become “youth”, “adult” and “senior” — fewer distinct values, easier patterns.',
      definition:
        'Data discretization replaces the raw values of a numeric attribute with **interval labels** (e.g. 0–10, 11–20) or **conceptual labels** (e.g. youth, adult, senior). Applied recursively, it produces a **concept hierarchy** for the attribute.',
      simpleExplanation: {
        text: 'A continuous attribute can have thousands of different values. Grouping them into a few ranges reduces the data and makes mined patterns easier to read, such as “seniors buy health insurance”.',
        analogy: 'Grading: instead of 100 possible marks, students get O, A, B or C.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Discretization techniques',
        root: 'Discretization',
        children: [
          { label: 'Unsupervised', note: 'class labels not used', children: ['Binning', 'Histogram analysis', 'Cluster analysis'] },
          { label: 'Supervised', note: 'uses class labels', children: ['Decision tree analysis', 'Correlation (χ²) analysis'] },
        ],
      },
      explanation: [
        { heading: 'Ways to classify discretization methods' },
        {
          list: [
            '**Supervised vs unsupervised** — whether class information is used.',
            '**Top-down (splitting)** — start with the whole range and split it into intervals.',
            '**Bottom-up (merging)** — start with each value as an interval and merge neighbours.',
          ],
        },
        { heading: 'The techniques' },
        {
          table: {
            columns: ['Technique', 'Supervised?', 'Direction', 'Idea'],
            rows: [
              ['Binning', 'No', 'Top-down', 'Equal-width or equal-frequency bins'],
              ['Histogram analysis', 'No', 'Top-down', 'Bucket boundaries become intervals'],
              ['Cluster analysis', 'No', 'Either', 'Each cluster becomes an interval'],
              ['Decision tree analysis', 'Yes', 'Top-down', 'Split points chosen by entropy / information gain'],
              ['Correlation analysis (ChiMerge)', 'Yes', 'Bottom-up', 'Merge adjacent intervals with similar class distributions (low χ²)'],
            ],
          },
        },
        { heading: 'Concept hierarchies' },
        'Repeated discretization creates a hierarchy from detailed to general values, letting mining work at different levels of abstraction.',
        {
          visual: {
            type: 'flow',
            title: 'A location concept hierarchy',
            steps: ['street', 'city', 'state', 'country'],
          },
        },
        'For **nominal** attributes, a hierarchy can be generated by: (1) users or experts specifying the order of attributes, (2) explicit grouping of values (e.g. {Chennai, Madurai} ⊂ Tamil Nadu), (3) specifying only the set of attributes — the system orders them by the **number of distinct values** (fewest at the top: country < state < city < street), or (4) specifying only part of the set.',
        { note: 'The topic name “Data Discretization” follows the supplied syllabus text; check it against your official copy.' },
      ],
      example: {
        title: 'Equal-width binning of ages',
        input: 'Ages: 13, 15, 16, 19, 20, 21, 25, 30, 33, 35, 36, 40, 45, 46, 52, 70 — 3 equal-width bins over 13–70',
        output: `Width = (70 − 13) / 3 = 19
Youth  [13–32): 13, 15, 16, 19, 20, 21, 25, 30
Adult  [32–51): 33, 35, 36, 40, 45, 46
Senior [51–70]: 52, 70`,
        explanation:
          'Sixteen distinct numbers become three labels. Equal-width bins are easy to compute but can be very uneven — here the senior bin has only two values.',
      },
      keyPoints: [
        'Discretization replaces numeric values with interval or concept labels.',
        'Methods are supervised/unsupervised and top-down/bottom-up.',
        'Techniques: binning, histogram, cluster, decision tree, correlation (χ²) analysis.',
        'Recursive discretization builds a concept hierarchy.',
        'Nominal hierarchies can be ordered by number of distinct values.',
      ],
      importantTerms: [
        { term: 'Interval label', meaning: 'A range such as 20–29 that replaces raw values.' },
        { term: 'Concept hierarchy', meaning: 'Levels of values from detailed to general.' },
        { term: 'Top-down discretization', meaning: 'Splitting the range into smaller intervals.' },
        { term: 'ChiMerge', meaning: 'Bottom-up method merging intervals with similar class distributions using χ².' },
      ],
      examPoints: [
        'Define discretization and concept hierarchy.',
        'Classify methods: supervised/unsupervised, top-down/bottom-up.',
        'Tabulate the five techniques.',
        'Explain the four ways to build hierarchies for nominal data.',
      ],
      questions: [
        {
          prompt: 'What is data discretization? Explain discretization techniques and concept hierarchy generation.',
          plan: ANSWER_PLAN(
            'Replacing numeric values with interval or conceptual labels',
            'Tree: unsupervised and supervised techniques',
            'Splitting vs merging; binning, histogram, cluster, decision tree, χ²; concept hierarchies for nominal data',
            'Ages discretized into youth/adult/senior',
            'Fewer values, easier patterns, multiple abstraction levels',
          ),
        },
      ],
      keywords: ['discretization', 'interval label', 'concept label', 'concept hierarchy', 'binning', 'histogram analysis', 'cluster analysis', 'decision tree', 'ChiMerge', 'top-down', 'bottom-up'],
      remember: [
        { prompt: 'Which discretization method is supervised and bottom-up?', answer: 'Correlation analysis (ChiMerge).' },
        { prompt: 'How is an automatic nominal hierarchy ordered?', answer: 'By number of distinct values — fewest at the top.' },
      ],
    },
  },
}
