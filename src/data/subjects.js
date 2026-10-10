// Subjects, units and topic names exactly as listed in each course syllabus.
// This file is the light "index" of the semester: it drives navigation and
// progress. Teaching content lives in ./<subject-id>/unit<n>.js, keyed by the
// topic ids generated here, and is loaded only when a unit is opened.
//
// Do not fill a syllabus with guessed unit or topic names.

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// Keeps one of the syllabus' own sub-headings on a group of topics.
const section = (title, topics) => topics.map((topic) => ({ title: topic, section: title }))

function unit(number, title, hours, topics) {
  return {
    number,
    title,
    hours,
    topics: topics.flat().map((t) => {
      const item = typeof t === 'string' ? { title: t } : t
      return { id: slug(item.title), ...item }
    }),
  }
}

export const subjects = [
  {
    id: 'php-mysql',
    title: 'PHP and MySQL',
    shortTitle: 'PHP & MySQL',
    code: '24CSU5CA',
    semester: 'V',
    syllabus: {
      preamble: [
        'the basic concepts of PHP',
        'the designing principles of a web page',
        'how to access backend database using PHP',
      ],
      textbook: 'Luke Welling, Laura Thomson, “PHP and MySQL Web Development”, 5th Edition, Pearson Education, 2017.',
    },
    units: [
      unit(1, 'Introduction to PHP', 10, [
        'Embedding PHP in HTML',
        'Adding Dynamic Content',
        'Accessing Form Variables',
        'Understanding Identifiers',
        'Examining Variable Types',
        'Declaring and Using Constants',
        'Operators',
        'Working Out the Form',
        'Understanding Precedence and Associativity',
        'Variable Handling Functions',
      ]),
      unit(2, 'Control Statements, Storing and Retrieving of Data', 8, [
        'Making Decisions',
        'Iterations',
        'Control Structure',
        'Declare',
        section('Storing and Retrieving Data', [
          'Saving Data',
          'Storing and Retrieving',
          'Processing Files',
          'Opening, Writing and Closing a File',
          'Reading from File',
          'File Functions',
        ]),
      ]),
      unit(3, 'Arrays & Web Databases', 10, [
        section('Arrays', [
          'Array',
          'Numerically Indexed Arrays',
          'Arrays with Different Indices',
          'Array Operators',
          'Multidimensional Arrays',
          'Sorting Arrays',
        ]),
        section('Web Databases', [
          'Relational Database Concepts',
          'Designing Web Database',
          'Creating Web Database',
          'Creating Database Tables',
          'Understanding MySQL Identifiers',
          'Choosing Column Data Types',
        ]),
      ]),
      unit(4, 'String Manipulation and Functions', 10, [
        section('String Manipulation', ['Formatting Strings', 'Joining and Splitting', 'Comparing', 'Matching and Replacing']),
        section('Reusing Code and Functions', [
          'Reusing Code',
          'Using require() and include()',
          'Functions',
          'Defining Own Functions',
          'Basic Function Structure',
          'Parameters',
          'Passing by Reference',
          'Passing by Value',
          'Recursive Function',
        ]),
      ]),
      unit(5, 'Working and Accessing MySQL using PHP', 10, [
        'Introduction',
        'Inserting Data into the Database',
        'Retrieving Data',
        'Updating, Altering and Deleting Records',
        'Dropping Tables and Database',
        'Web Database Architecture',
        'Querying a Database from the Web',
        'Putting New Information in the Database',
        'Database Interfaces',
      ]),
    ],
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    shortTitle: 'Cyber Security',
    code: '24CSU5CB',
    semester: 'V',
    syllabus: {
      preamble: [
        'cyber security and cybercrime',
        'computer crime and identity security',
        'cyber attacks and security breach',
        'cyber security planning',
        'legal, ethical and Indian knowledge perspectives in cyber security',
      ],
      textbook:
        'Ashish Misra, “Modern Cybersecurity Strategies”, BPB Publications, 2022; Marjie T. Britz, “Computer Forensics and Cyber Crime”, 2nd Edition, Pearson, 2022; Nilakshi Jain, Ramesh Menon, “Cyber Security and Cyber Laws”, Wiley India, 2021; Mahadevan B, Vinayak Rajat Bhat, Nagendra Pavana R N, “Introduction to Indian Knowledge System: Concepts and Applications”, PHI Learning, 2022.',
    },
    units: [
      unit(1, 'Cyber Security and Cybercrime', 9, [
        'Cyber Security Overview',
        'Need and Scope',
        'Definition and Origins of Cybercrime',
        'Difference between Information Security and Cyber Security',
        'Common Threats and Vulnerabilities',
        'Cybercrime Classifications',
        'Cyber Security in India',
        'Indian IT Act 2000',
        'Global Perspective on Cybercrime',
      ]),
      unit(2, 'Computer Crime and Identity Security', 9, [
        'Computer Hacking and System Attacks',
        'Commodification of Digital Assets',
        'Theft of Intellectual Property',
        section('Identity Theft and Identity Fraud', [
          'Identity Theft and Identity Fraud',
          'Internet Fraud',
          'Phishing',
          'Victimology',
          'Virtual and Physical Methods',
        ]),
      ]),
      unit(3, 'Cyber Attacks and Security Breach', 10, [
        section('Types of Attacks', [
          'Malware',
          'Ransomware',
          'DoS/DDoS',
          'Web Attacks',
          'Impersonation',
          'Data Theft',
          'Advanced Persistent Threats',
          'Malvertising',
          'SQL Injection',
          'Social Engineering',
        ]),
        'Identifying and Detecting Breaches',
        section('Recovering from a Security Breach', [
          'Steps in Recovering from Security Breach',
          'Resetting Devices',
          'Reinstalling Systems',
          'Managing Stolen Information',
        ]),
      ]),
      unit(4, 'Cyber Security Planning', 10, [
        'Cyber Security Strategy and Components',
        'Security Governance Principles',
        section('Risk Assessment', [
          'Asset Identification',
          'Threat Identification',
          'Vulnerability Identification',
          'Risk Assessment Approaches',
          'Likelihood Assessment',
          'Impact Assessment',
          'Risk Determination',
          'Risk Evaluation',
          'Risk Treatment',
        ]),
        'Security Management Function',
        'Security Policy',
        section('Security Models', ['Bell-LaPadula Model', 'Biba Integrity Model', 'Chinese Wall Model']),
      ]),
      unit(5, 'Legal, Ethical and Indian Knowledge Perspectives in Cyber Security', 10, [
        'Cyber Law Application',
        'Legal Compliance and Security Policy',
        'Cybercrime Evidence Handling',
        'Ethical Use of IT Resources',
        'Human Values and Professional Ethics',
        'Professional Conduct',
        'Corporate Social Responsibility (CSR)',
        section('Indian Knowledge System (IKS) in Cyber Security Ethics', [
          'IKS in Cyber Security Ethics',
          'Vedic Corpus and Knowledge Traditions',
          'Knowledge Triangle',
          'Deductive and Inductive Logic Framework',
          'Role of IKS in Ethical Decision-Making and Governance',
        ]),
      ]),
    ],
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering Practices',
    shortTitle: 'Software Engineering',
    code: '24CSU5CC',
    semester: 'V',
    syllabus: {
      preamble: [
        'the fundamental concepts of software engineering',
        'software design and testing techniques',
        'AI-assisted software development practices',
      ],
      textbook:
        'Roger S. Pressman, Bruce R. Maxim, “Software Engineering: A Practitioner’s Approach”, 9th Edition, McGraw Hill, 2021; Tom Taulli, “AI-Assisted Programming”, O’Reilly, 2024.',
    },
    units: [
      unit(1, 'Software and Software Engineering', 11, [
        'Nature of Software',
        'Unique Nature of WebApps',
        'Software Process',
        'Software Engineering Practice',
        'Software Development Myths',
        section('Process Models', [
          'Generic Process Model',
          'Prescriptive Process Models',
          'Specialized Process Models',
          'Unified Process Model',
          'Personal and Team Software Process Models',
        ]),
      ]),
      unit(2, 'Agile Development and Requirements', 9, [
        section('Agile Development', ['Agile Process', 'Extreme Programming', 'Agile Process Models']),
        section('Requirements Engineering', [
          'Establishing the Groundwork',
          'Eliciting Requirements',
          'Developing Use Cases',
          'Building the Requirement Model',
          'Negotiating Requirements',
          'Validating Requirements',
        ]),
      ]),
      unit(3, 'Design', 11, [
        'Design Process',
        'Design Concepts',
        'Design Model',
        section('Architectural Design', [
          'Architectural Styles',
          'Representing the System',
          'Defining Archetypes',
          'Refining the Architecture into Components',
          'Describing Instantiations of the System',
          'Architectural Mapping using Data Flow',
        ]),
        section('Component-Level Design', ['Designing Class-Based Components', 'Conducting Component-Level Design']),
        section('User Interface Design', ['User Interface Analysis and Design Steps']),
      ]),
      unit(4, 'Software Testing', 9, [
        'Strategic Approach to Software Testing',
        'Strategic Issues',
        'Test Strategies for Conventional Software, Object-Oriented Software and WebApps',
        'Validation Testing',
        'System Testing',
        'Debugging Process',
        section('Testing Conventional Applications', [
          'White-Box Testing',
          'Basis Path Testing',
          'Control Structure Testing',
          'Black-Box Testing',
          'Model-Based Testing',
        ]),
      ]),
      unit(5, 'AI-Assisted Software Development', 8, [
        section('Prompt Engineering', ['Prompt', 'Context', 'Instructions', 'Input of Content', 'Format']),
        section('Ideas, Planning, and Requirements', [
          'Brainstorming',
          'Market Research',
          'Competition',
          'Requirements',
          'Approaches to Project Planning',
        ]),
        section('Debugging, Testing and Deployment', ['Debugging', 'Documentation', 'Code Review', 'Deployment']),
      ]),
    ],
  },
  {
    id: 'artificial-intelligence',
    title: 'Foundations of Artificial Intelligence',
    shortTitle: 'Foundations of AI',
    code: '24CSU5DA',
    semester: 'V',
    syllabus: {
      preamble: [
        'the fundamental concepts of Artificial Intelligence and its application',
        'the basic search strategies and knowledge representation used in AI',
        'the fundamental concepts of learning and various applications of AI',
      ],
      textbook: 'Stuart Russell, Peter Norvig, “Artificial Intelligence – A Modern Approach”, 4th Edition, Pearson, 2022.',
    },
    units: [
      unit(1, 'Introduction to AI', 9, [
        'Foundations of Artificial Intelligence',
        'The History of Artificial Intelligence',
        'The State of the Art',
        'Risks and Benefits of AI',
        section('Intelligent Agents', ['Agents and Environments', 'The Structure of Agents']),
      ]),
      unit(2, 'Problem Solving', 10, [
        section('Solving Problems by Searching', [
          'Problem Solving Agents',
          'Example Problems',
          'Search Algorithms',
          'Uninformed Search Strategies',
          'Heuristic Search Strategies',
          'Heuristic Functions',
        ]),
        section('Constraint Satisfaction Problems', [
          'Defining Constraint Satisfaction Problems',
          'Constraint Propagation: Inference in CSPs',
          'Backtracking Search for CSPs',
          'Local Search for CSPs',
          'The Structure of Problems',
        ]),
      ]),
      unit(3, 'Knowledge Representation and Planning', 10, [
        section('Knowledge Representation', [
          'Ontological Engineering',
          'Categories and Objects',
          'Events',
          'Mental Objects and Modal Logic',
          'Reasoning Systems for Categories',
          'Reasoning with Default Information',
        ]),
        section('Automated Planning', [
          'Definition of Classical Planning',
          'Algorithms for Classical Planning',
          'Heuristics for Planning',
          'Hierarchical Planning',
          'Planning and Acting in Nondeterministic Domains',
          'Time, Schedules and Resources',
          'Analysis of Planning Approaches',
        ]),
      ]),
      unit(4, 'Knowledge and Reasoning', 10, [
        section('Quantifying Uncertainty', [
          'Acting under Uncertainty',
          'Basic Probability Notation',
          'Inference using Full Joint Distributions',
          'Independence',
          "Bayes' Rule and its Use",
          'Naive Bayes Models',
          'The Wumpus World Revisited',
        ]),
        section('Probabilistic Reasoning', [
          'Representing Knowledge in an Uncertain Domain',
          'The Semantics of Bayesian Networks',
          'Exact Inference in Bayesian Networks',
          'Approximate Inference for Bayesian Networks',
          'Causal Networks',
        ]),
      ]),
      unit(5, 'Decision Making', 9, [
        section('Making Simple Decisions', [
          'Combining Beliefs and Desires under Uncertainty',
          'The Basis of Utility Theory',
          'Utility Functions',
          'Multiattribute Utility Functions',
          'Decision Networks',
          'The Value of Information',
          'Unknown Preferences',
        ]),
        section('Making Complex Decisions', [
          'Sequential Decision Problems',
          'Algorithms for MDPs',
          'Bandit Problems',
          'Partially Observable MDPs',
          'Algorithms for Solving POMDPs',
        ]),
      ]),
    ],
  },
  // No official syllabus PDF is available for this subject. Topics follow the
  // syllabus text supplied with the course, in its order and wording. Unit
  // titles and the preamble summarise those topics; hours are not known.
  // TODO(verify): "Data Discretization" (Unit I) against the handwritten source.
  {
    id: 'data-mining',
    title: 'Data Mining and Data Warehousing',
    shortTitle: 'Data Mining & DW',
    code: null,
    semester: 'V',
    syllabus: {
      preamble: [
        'data mining concepts, technologies and data preprocessing',
        'frequent pattern mining, classification and prediction',
        'cluster analysis and outlier analysis',
        'data warehouse components and how a warehouse is built',
        'reporting and query tools and online analytical processing (OLAP)',
      ],
      textbook:
        'Jiawei Han, Micheline Kamber, “Data Mining: Concepts and Techniques”; Alex Berson, Stephen J. Smith, “Data Warehousing, Data Mining & OLAP”.',
    },
    units: [
      unit(1, 'Data Mining and Data Preprocessing', null, [
        'Data Mining',
        'Data Mining Technologies',
        'Major Issues in Data Mining',
        section('Data Preprocessing', [
          'Data Preprocessing',
          'Data Cleaning',
          'Data Integration',
          'Data Reduction',
          'Data Transformation',
          'Data Discretization',
        ]),
      ]),
      unit(2, 'Frequent Patterns, Classification and Prediction', null, [
        section('Mining Frequent Patterns, Associations and Correlations', [
          'Mining Frequent Patterns, Associations and Correlations',
          'Frequent Itemset Mining Methods',
        ]),
        section('Classification and Prediction', [
          'Classification and Prediction',
          'Basic Concepts',
          'Decision Tree Induction',
          'Bayesian Classification',
          'Rule-Based Classification',
          'Classification by Backpropagation',
          'Support Vector Machine',
        ]),
      ]),
      unit(3, 'Cluster Analysis', null, [
        'Cluster Analysis',
        'Types of Data',
        'Categorization of Major Clustering Methods',
        'K-Means',
        'Partitioning Methods',
        'Hierarchical Methods',
        'Density-Based Methods',
        'Grid-Based Methods',
        'Model-Based Methods',
        'Clustering High-Dimensional Data',
        'Constraint-Based Clustering',
        'Outlier Analysis',
      ]),
      unit(4, 'Data Warehousing', null, [
        'Data Warehousing Components',
        'Building a Data Warehouse',
        'Mapping the Data Warehouse to a Multiprocessor Architecture',
        'Data Extraction, Cleanup and Transformation Tools',
      ]),
      unit(5, 'Reporting, Query Tools and OLAP', null, [
        section('Reporting and Query Tools and Applications', [
          'Reporting and Query Tools and Applications',
          'Tools Categories',
          'The Need for Applications',
          'Cognos Impromptu',
        ]),
        section('Online Analytical Processing (OLAP)', [
          'Online Analytical Processing (OLAP)',
          'Need for a Multidimensional Data Model',
          'OLAP Guidelines',
          'Multidimensional OLAP vs. Multirelational OLAP',
          'Categories of OLAP Tools',
          'OLAP Tools and the Internet',
        ]),
      ]),
    ],
  },
  // No official syllabus PDF is available for this subject. Topics follow the
  // handwritten syllabus text supplied with the course, in its order and
  // wording. Unit titles and the preamble summarise those topics; hours are
  // not known.
  // TODO(verify): Unit III topic 6 is illegible in the handwritten source and
  //   is kept as a placeholder with no notes — do not fill it with a guess.
  // TODO(verify): Unit IV "Processes" — notes interpret it as the processes
  //   running on IoT servers and cloud storage.
  // TODO(verify): Unit V "Predictive Applications" — the textbook's matching
  //   case-study section is titled "Productivity Applications".
  {
    id: 'iot',
    title: 'Internet of Things',
    shortTitle: 'IoT',
    code: null,
    semester: 'V',
    syllabus: {
      preamble: [
        'the fundamentals of IoT and its physical and logical design',
        'domain-specific IoT applications, M2M, SDN and NFV',
        'IoT system management and IoT design methodology',
        'IoT servers, cloud offerings and web application frameworks',
        'data analytics for IoT, with case studies',
      ],
      textbook: 'Arshdeep Bahga, Vijay Madisetti, “Internet of Things: A Hands-On Approach”, Universities Press, 2015.',
    },
    units: [
      unit(1, 'Introduction to Internet of Things', null, [
        'Introduction to IoT',
        'Physical Design of IoT',
        'Logical Design of IoT',
        'IoT Enabling Technologies',
        'IoT Levels and Deployment Templates',
      ]),
      unit(2, 'Domain-Specific IoTs, M2M, SDN and NFV', null, [
        section('Domain-Specific IoTs', [
          'Domain-Specific IoT: Introduction',
          'Home Automation',
          'Cities — Smart Cities',
          'Environment',
          'Energy — Retail',
          'Logistics',
          'Agriculture',
          'Industry',
          'Healthcare and Life Style',
        ]),
        'IoT and M2M',
        'Introduction to SDN',
        'NFV for IoT',
      ]),
      unit(3, 'IoT System Management and Design Methodology', null, [
        'Design Methodology',
        'IoT System Management',
        'Network Operator Requirements',
        'IoT System Management with NETCONF and YANG',
        'NETCONF — NETCONF protocol and YANG',
        'Topic Pending Verification',
        'IoT Platforms Design Methodology',
        'Introduction to IoT Design Methodology',
      ]),
      unit(4, 'IoT Physical Servers and Cloud Offerings', null, [
        'IoT Physical Servers and Cloud Storage',
        'Processes',
        'IoT Physical Servers and Cloud Offerings',
        'Introduction to Cloud Storage Models',
        'APIs — WAMP',
        'Autobahn for IoT',
        'Xively Cloud for IoT',
        'Python Web Application Frameworks',
        'Django — Designing RESTful APIs',
        'Amazon Web Services for IoT',
      ]),
      unit(5, 'Data Analytics for IoT and Case Studies', null, [
        section('Data Analytics for IoT', [
          'Data Analytics for IoT: Introduction',
          'Apache Hadoop',
          'Using Hadoop MapReduce for Batch Data Analysis',
          'Apache Oozie',
          'Apache Spark',
          'Stream Processing Using Apache Spark',
          'Storm for Real-Time Data Analytics',
        ]),
        section('Case Studies', [
          'Case Study: Introduction',
          'Home Automation',
          'Smart Cities',
          'Environment',
          'Agriculture',
          'Predictive Applications',
        ]),
      ]),
    ],
  },
]

export const totalUnits = subjects.reduce((sum, s) => sum + s.units.length, 0)

export const findSubject = (subjectId) => subjects.find((s) => s.id === subjectId) ?? null

export const findUnit = (subject, number) => subject?.units.find((u) => u.number === Number(number)) ?? null

// Previous / next topic, crossing into neighbouring units when needed.
export function topicNeighbours(subject, unitNumber, topicId) {
  const flat = subject.units.flatMap((u) => u.topics.map((t) => ({ unit: u.number, topic: t })))
  const i = flat.findIndex((item) => item.unit === unitNumber && item.topic.id === topicId)
  return { prev: flat[i - 1] ?? null, next: flat[i + 1] ?? null }
}
