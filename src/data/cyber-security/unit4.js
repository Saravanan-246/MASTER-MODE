// Cyber Security — Unit IV: Cyber Security Planning.
// Topic ids match the syllabus outline in ../subjects.js (24CSU5CB).
// The risk-assessment sequence follows the structure used in Stallings,
// "Effective Cybersecurity" (reference book 1).
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
    'Unit IV is about planning security instead of reacting to attacks. It starts with strategy and governance, then walks through risk assessment step by step — identify assets, threats and vulnerabilities, assess likelihood and impact, determine and evaluate risk, and treat it. It closes with the security management function, security policy, and three formal security models: Bell-LaPadula, Biba and Chinese Wall.',

  map: [
    { label: 'Direction', topics: ['cyber-security-strategy-and-components', 'security-governance-principles'] },
    { label: 'Identify', topics: ['asset-identification', 'threat-identification', 'vulnerability-identification'] },
    { label: 'Assess', topics: ['risk-assessment-approaches', 'likelihood-assessment', 'impact-assessment'] },
    { label: 'Decide', topics: ['risk-determination', 'risk-evaluation', 'risk-treatment'] },
    { label: 'Manage', topics: ['security-management-function', 'security-policy'] },
    { label: 'Formal models', topics: ['bell-lapadula-model', 'biba-integrity-model', 'chinese-wall-model'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'cyber-security-strategy-and-components': {
      difficulty: 'medium',
      intro: 'A strategy turns scattered security tools into a plan that supports business goals.',
      definition:
        'A **cyber security strategy** is a high-level, long-term plan that defines how an organisation will protect its information assets, aligned with its **business objectives** and **risk appetite**. Its **components** typically include governance, risk management, policies, security architecture and controls, people and awareness, monitoring and incident response, business continuity, compliance, and continuous improvement.',
      simpleExplanation: {
        text: 'Buying a firewall is a tool; deciding what to protect first, how much to spend, who is responsible and how to measure success is strategy. Without strategy, security becomes a random collection of products.',
        analogy: 'A cricket team strategy decides batting order, bowling plan and field placements before the match — not one shot at a time.',
      },
      visual: {
        type: 'architecture',
        title: 'Components of a cyber security strategy',
        layers: [
          { label: 'Direction', note: 'why and who', items: ['Business alignment', 'Governance and leadership', 'Risk appetite'] },
          { label: 'Rules', note: 'what', items: ['Policies and standards', 'Legal and regulatory compliance'] },
          { label: 'Protection', note: 'how', items: ['Security architecture', 'Technical controls', 'People and awareness'] },
          { label: 'Response', note: 'when things go wrong', items: ['Monitoring and detection', 'Incident response', 'Business continuity'] },
          { label: 'Improvement', note: 'measure and adapt', items: ['Metrics', 'Audits', 'Lessons learned'] },
        ],
      },
      explanation: [
        { heading: 'Steps in building a strategy' },
        {
          list: [
            'Understand business goals, critical assets and the threat landscape.',
            'Assess current security maturity and gaps.',
            'Define objectives, priorities and risk appetite.',
            'Choose frameworks and controls; plan budget and resources.',
            'Implement through projects, policies and training.',
            'Measure, review and update regularly.',
          ],
          ordered: true,
        },
        { heading: 'NIST Cybersecurity Framework functions' },
        {
          table: {
            columns: ['Function', 'Purpose'],
            rows: [
              ['Govern', 'Set strategy, roles, policy and oversight (added in CSF 2.0)'],
              ['Identify', 'Understand assets, risks and context'],
              ['Protect', 'Safeguards: access control, training, data security'],
              ['Detect', 'Find incidents quickly'],
              ['Respond', 'Act on detected incidents'],
              ['Recover', 'Restore operations and improve'],
            ],
          },
        },
        { heading: 'Principles behind a good strategy' },
        '**Defence in depth**, **least privilege**, **zero trust** (never trust, always verify), **security by design**, and **risk-based prioritisation** — spend most where the risk is highest.',
      ],
      example: {
        title: 'Strategy for a growing fintech start-up',
        input: 'A payments start-up with 80 staff wants a one-year security strategy.',
        output: `Business goal  : win bank partnerships (needs trust and compliance)
Priorities     : protect payment data, prevent account takeover
Components     : governance (appoint security lead), policy set,
                 MFA + encryption, awareness training, 24x7 monitoring,
                 incident response plan, quarterly risk review
Metrics        : MFA coverage, patch time, phishing-test click rate`,
        explanation: 'Each component is chosen because it supports the business goal and addresses the main risks.',
      },
      keyPoints: [
        'Strategy = long-term security plan aligned with business goals and risk appetite.',
        'Components: governance, risk management, policies, architecture/controls, people, monitoring/response, continuity, compliance, improvement.',
        'NIST CSF: Govern, Identify, Protect, Detect, Respond, Recover.',
        'Principles: defence in depth, least privilege, zero trust, security by design.',
      ],
      importantTerms: [
        { term: 'Risk appetite', meaning: 'The amount of risk an organisation is willing to accept to meet its goals.' },
        { term: 'Zero trust', meaning: 'Security model that verifies every access request, never assuming trust.' },
        { term: 'Security maturity', meaning: 'How developed and consistent an organisation’s security practices are.' },
        { term: 'NIST CSF', meaning: 'NIST Cybersecurity Framework, organised into core functions.' },
      ],
      examPoints: [
        'Define cyber security strategy.',
        'Draw and explain its **components**.',
        'List steps to build a strategy and the NIST CSF functions.',
      ],
      questions: [
        {
          prompt: 'What is a cyber security strategy? Explain its components.',
          plan: ANSWER_PLAN(
            'Long-term plan aligning security with business objectives',
            'Layered components diagram',
            'Components; steps to build; NIST CSF functions; principles',
            'Fintech start-up strategy',
            'Risk-based, measurable, continuously improved',
          ),
        },
      ],
      keywords: ['cyber security strategy', 'components', 'governance', 'risk appetite', 'NIST CSF', 'defence in depth', 'zero trust', 'metrics'],
      remember: [
        { prompt: 'Six NIST CSF 2.0 functions?', answer: 'Govern, Identify, Protect, Detect, Respond, Recover.' },
        { prompt: 'What must a strategy be aligned with?', answer: 'Business objectives and risk appetite.' },
        { prompt: 'What does zero trust mean?', answer: 'Never trust by default; always verify each access.' },
      ],
    },

    // ------------------------------------------------------------------
    'security-governance-principles': {
      difficulty: 'medium',
      intro: 'Governance is how top management directs and controls security. Know its principles and desired outcomes.',
      definition:
        '**Information security governance** is the system by which an organisation’s security activities are **directed and controlled** by its board and senior management. ISO/IEC 27014 sets out governance principles — including an organisation-wide approach, a risk-based approach, setting direction for investment, conformance with requirements, a security-positive environment and reviewing performance against business outcomes.',
      simpleExplanation: {
        text: '**Governance** decides *what* should be achieved and *who* is accountable; **management** decides *how* to achieve it day to day. Good governance makes security a board-level responsibility, not just an IT job.',
        analogy: 'A school’s governing body sets goals and checks results; the principal and teachers run daily classes. Security governance and security management work the same way.',
      },
      visual: {
        type: 'comparison',
        title: 'Security governance vs security management',
        table: {
          columns: ['', 'Governance', 'Management'],
          rows: [
            ['Who', 'Board and senior executives', 'CISO, security managers, teams'],
            ['Focus', 'Direction, accountability, oversight', 'Planning, implementing, operating controls'],
            ['Question', 'Are we doing the right things?', 'Are we doing things right?'],
            ['Outputs', 'Strategy, risk appetite, policies approved', 'Procedures, controls, reports'],
          ],
        },
      },
      explanation: [
        { heading: 'Governance principles (ISO/IEC 27014)' },
        {
          list: [
            '**Establish organisation-wide information security** — not limited to IT.',
            '**Adopt a risk-based approach** — decisions based on risk.',
            '**Set the direction of investment decisions** — fund security according to business needs.',
            '**Ensure conformance** with internal and external requirements (laws, contracts).',
            '**Foster a security-positive environment** — culture, awareness, responsibility.',
            '**Review performance in relation to business outcomes**.',
          ],
          ordered: true,
        },
        { heading: 'Desired outcomes of security governance' },
        {
          table: {
            columns: ['Outcome', 'Meaning'],
            rows: [
              ['Strategic alignment', 'Security supports business strategy'],
              ['Risk management', 'Risks reduced to an acceptable level'],
              ['Value delivery', 'Security investments give value for money'],
              ['Resource management', 'People, budget and knowledge used efficiently'],
              ['Performance measurement', 'Metrics show whether objectives are met'],
            ],
          },
        },
        { heading: 'Governance roles' },
        'Board (accountability, risk appetite), executive management (strategy, resources), **CISO** (security programme), risk/audit committees (independent oversight), and asset owners (accountability for specific assets).',
      ],
      example: {
        title: 'Governance in action',
        input: 'A bank’s board reviews a quarterly security report.',
        output: `Direction   : board approves risk appetite and security budget
Conformance : checks compliance with regulator and data protection rules
Performance : reviews metrics — incidents, patch time, audit findings
Accountability: CISO reports; audit committee verifies independently`,
        explanation: 'The board does not configure firewalls; it sets direction and checks that management delivers.',
      },
      keyPoints: [
        'Governance = direct and control; management = plan and operate.',
        'ISO/IEC 27014 principles: organisation-wide, risk-based, investment direction, conformance, positive culture, performance review.',
        'Outcomes: strategic alignment, risk management, value delivery, resource management, performance measurement.',
        'Board holds ultimate accountability.',
      ],
      importantTerms: [
        { term: 'Security governance', meaning: 'Direction and control of security by the board and senior management.' },
        { term: 'CISO', meaning: 'Chief Information Security Officer — leads the security programme.' },
        { term: 'Conformance', meaning: 'Meeting legal, regulatory and contractual requirements.' },
        { term: 'Accountability', meaning: 'Being answerable for decisions and outcomes.' },
      ],
      examPoints: [
        'Define security governance and **contrast with management**.',
        'List the **governance principles**.',
        'Explain the **five desired outcomes**.',
        'Mention governance roles.',
      ],
      questions: [
        {
          prompt: 'Explain the principles of information security governance.',
          plan: ANSWER_PLAN(
            'Direction and control of security by top management',
            'Governance vs management table',
            'ISO/IEC 27014 principles; desired outcomes; roles',
            'Bank board quarterly review',
            'Board accountability; risk-based approach',
          ),
        },
      ],
      keywords: ['security governance', 'ISO/IEC 27014', 'risk-based approach', 'conformance', 'strategic alignment', 'value delivery', 'CISO', 'accountability'],
      remember: [
        { prompt: 'Governance asks which question?', answer: 'Are we doing the right things?' },
        { prompt: 'Who holds ultimate accountability for security?', answer: 'The board / senior management.' },
        { prompt: 'Name two desired outcomes of governance.', answer: 'Strategic alignment and risk management (also value delivery, resource management, performance measurement).' },
      ],
    },

    // ------------------------------------------------------------------
    'asset-identification': {
      difficulty: 'easy',
      intro: 'Risk assessment starts with one question: what are we protecting?',
      definition:
        '**Asset identification** is the first step of risk assessment: listing all assets of value to the organisation — information, hardware, software, services, people and intangible assets such as reputation — recording their **owner**, **location** and **value**, usually in an **asset inventory (register)**.',
      simpleExplanation: {
        text: 'You cannot protect what you do not know you have. Every server, laptop, database, cloud account and important document is listed, given an owner, and rated by how important it is.',
        analogy: 'Before insuring a house, you list everything valuable inside and estimate its worth.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Categories of assets',
        root: 'Assets',
        children: [
          { label: 'Information', children: ['Customer data', 'Financial records', 'Source code'] },
          { label: 'Hardware', children: ['Servers', 'Laptops', 'Network devices'] },
          { label: 'Software', children: ['Operating systems', 'Applications', 'Licences'] },
          { label: 'Services', children: ['Cloud services', 'Power', 'Internet links'] },
          { label: 'People and intangibles', children: ['Skilled staff', 'Reputation', 'Brand'] },
        ],
      },
      explanation: [
        { heading: 'What an asset register records' },
        {
          table: {
            columns: ['Field', 'Example'],
            rows: [
              ['Asset ID and name', 'DB-01 Student records database'],
              ['Owner', 'Controller of Examinations'],
              ['Location', 'Data centre rack 3 / cloud region'],
              ['Classification', 'Confidential'],
              ['CIA value', 'C: High, I: High, A: Medium'],
              ['Dependencies', 'Exam portal, backup server'],
            ],
          },
        },
        { heading: 'Valuing assets' },
        'Assets can be valued **quantitatively** (replacement cost, revenue loss) or **qualitatively** (High / Medium / Low) based on the impact if their confidentiality, integrity or availability is lost.',
        { heading: 'Good practice' },
        {
          list: [
            'Use automated discovery tools for devices and software.',
            'Assign a clear **asset owner** accountable for each asset.',
            'Include **shadow IT** — unofficial apps and cloud accounts.',
            'Keep the inventory updated as assets are added or retired.',
          ],
        },
      ],
      example: {
        title: 'College asset list (extract)',
        input: 'Identify three key assets of a college.',
        output: `Student records DB   → owner: Exam cell     → C:High I:High A:Medium
Admission website    → owner: Admin office  → C:Low  I:High A:High
Staff laptops        → owner: IT dept       → C:Medium I:Medium A:Medium`,
        explanation: 'Valuing each asset by CIA shows where protection matters most.',
      },
      keyPoints: [
        'First step of risk assessment: know what to protect.',
        'Categories: information, hardware, software, services, people, intangibles.',
        'Asset register: ID, owner, location, classification, value, dependencies.',
        'Value assets by CIA impact — quantitatively or qualitatively.',
      ],
      importantTerms: [
        { term: 'Asset', meaning: 'Anything of value to the organisation that needs protection.' },
        { term: 'Asset owner', meaning: 'Person accountable for an asset’s protection.' },
        { term: 'Asset register', meaning: 'An inventory listing assets and their details.' },
        { term: 'Shadow IT', meaning: 'Technology used without official approval.' },
      ],
      examPoints: [
        'Define asset identification and its role in risk assessment.',
        'Classify **types of assets**.',
        'Explain what an asset register contains and how assets are valued.',
      ],
      questions: [
        {
          prompt: 'Explain asset identification in risk assessment.',
          plan: ANSWER_PLAN(
            'Listing and valuing all assets to protect',
            'Asset categories tree',
            'Register fields; valuation; good practice',
            'College asset list',
            'Owner for every asset; keep updated',
          ),
        },
      ],
      keywords: ['asset identification', 'asset register', 'asset owner', 'classification', 'valuation', 'CIA value', 'shadow IT'],
      remember: [
        { prompt: 'First step of risk assessment?', answer: 'Asset identification.' },
        { prompt: 'Who is accountable for an asset?', answer: 'Its asset owner.' },
        { prompt: 'Name an intangible asset.', answer: 'Reputation (or brand).' },
      ],
    },

    // ------------------------------------------------------------------
    'threat-identification': {
      difficulty: 'medium',
      intro: 'After knowing your assets, ask: who or what could harm them?',
      definition:
        '**Threat identification** is the process of identifying **threat sources** (who or what could cause harm) and **threat events** (what they could do) that are relevant to the organisation’s assets. NIST groups threat sources as **adversarial, accidental, structural and environmental**.',
      simpleExplanation: {
        text: 'Threats are not only hackers. A careless employee, a failing hard disk or a flood are also threats. Threat identification lists all of them that could realistically affect each important asset.',
        analogy: 'Planning a school trip: you list risks from people (strangers), accidents (falls), equipment (bus breakdown) and weather (heavy rain).',
      },
      visual: {
        type: 'hierarchy',
        title: 'Threat sources',
        root: 'Threat sources',
        children: [
          { label: 'Adversarial', note: 'intentional', children: ['Cybercriminals', 'Insiders', 'Hacktivists', 'Nation-states'] },
          { label: 'Accidental', note: 'human error', children: ['Wrong configuration', 'Mis-sent email', 'Deleted data'] },
          { label: 'Structural', note: 'failures', children: ['Hardware failure', 'Software bugs', 'Power failure'] },
          { label: 'Environmental', note: 'natural', children: ['Flood', 'Fire', 'Earthquake'] },
        ],
      },
      explanation: [
        { heading: 'Describing adversarial threats' },
        '**Capability** (skills and resources), **intent** (goal) and **targeting** (whether they focus on you specifically).',
        { heading: 'STRIDE — threat categories for systems' },
        {
          table: {
            columns: ['Letter', 'Threat', 'Violates'],
            rows: [
              ['S', 'Spoofing identity', 'Authentication'],
              ['T', 'Tampering with data', 'Integrity'],
              ['R', 'Repudiation', 'Non-repudiation'],
              ['I', 'Information disclosure', 'Confidentiality'],
              ['D', 'Denial of service', 'Availability'],
              ['E', 'Elevation of privilege', 'Authorisation'],
            ],
          },
        },
        { heading: 'Sources of threat information' },
        'Incident history, threat intelligence feeds, CERT-In advisories, industry reports, vendor bulletins and threat modelling workshops.',
      ],
      example: {
        title: 'Threats to an online exam system',
        input: 'Asset: online examination platform.',
        output: `Adversarial  : students trying to access question papers early
Accidental   : admin uploads wrong paper publicly
Structural   : server crash during the exam
Environmental: power outage at the data centre`,
        explanation: 'A complete list covers all four source types, not only hackers.',
      },
      keyPoints: [
        'Threat identification lists threat sources and threat events.',
        'Sources: adversarial, accidental, structural, environmental.',
        'Adversaries described by capability, intent, targeting.',
        'STRIDE: Spoofing, Tampering, Repudiation, Information disclosure, DoS, Elevation of privilege.',
      ],
      importantTerms: [
        { term: 'Threat source', meaning: 'The origin of a threat — person, failure or natural event.' },
        { term: 'Threat event', meaning: 'An event that could cause harm, e.g. data theft.' },
        { term: 'Threat intelligence', meaning: 'Information about current threats and attackers.' },
        { term: 'STRIDE', meaning: 'Threat modelling categories developed at Microsoft.' },
      ],
      examPoints: [
        'Define threat identification.',
        'Classify **threat sources** with examples.',
        'Explain **STRIDE**.',
        'List sources of threat information.',
      ],
      questions: [
        {
          prompt: 'Explain threat identification in risk assessment.',
          plan: ANSWER_PLAN(
            'Identifying threat sources and events relevant to assets',
            'Threat source tree',
            'Adversarial, accidental, structural, environmental; STRIDE',
            'Threats to an online exam system',
            'Capability, intent, targeting; threat intelligence',
          ),
        },
      ],
      keywords: ['threat identification', 'threat source', 'adversarial', 'accidental', 'structural', 'environmental', 'STRIDE', 'threat intelligence'],
      remember: [
        { prompt: 'Four types of threat source (NIST)?', answer: 'Adversarial, accidental, structural, environmental.' },
        { prompt: 'What does the “E” in STRIDE stand for?', answer: 'Elevation of privilege.' },
        { prompt: 'A flood is which type of threat source?', answer: 'Environmental.' },
      ],
    },

    // ------------------------------------------------------------------
    'vulnerability-identification': {
      difficulty: 'medium',
      intro: 'Threats only cause harm through weaknesses. This step finds those weaknesses before attackers do.',
      definition:
        '**Vulnerability identification** is the process of finding weaknesses in assets, controls, processes or people that threats could exploit. Methods include **vulnerability scanning**, **authorised penetration testing**, **configuration and code review**, audits and checking public databases such as **CVE**; severity is often rated with **CVSS** (0–10).',
      simpleExplanation: {
        text: 'Look for open doors: missing patches, weak passwords, open ports, insecure code, untrained staff, unlocked server rooms. Each weakness found is rated by how serious it is.',
        analogy: 'A building safety inspection that checks for broken locks, faulty wiring and blocked fire exits.',
      },
      visual: {
        type: 'comparison',
        title: 'Types of vulnerability',
        table: {
          columns: ['Type', 'Examples'],
          rows: [
            ['Technical', 'Unpatched software, weak encryption, open ports, insecure code'],
            ['Configuration', 'Default passwords, public cloud storage, excessive permissions'],
            ['Physical', 'Unlocked server room, no CCTV, unencrypted laptops'],
            ['Organisational / process', 'No patch policy, no offboarding, no backups tested'],
            ['Human', 'Lack of awareness, password reuse'],
          ],
        },
      },
      explanation: [
        { heading: 'Methods' },
        {
          list: [
            '**Vulnerability scanning** — automated tools compare systems to known flaws.',
            '**Penetration testing** — authorised experts try to exploit weaknesses, with written permission.',
            '**Configuration review** against hardening baselines (e.g. CIS Benchmarks).',
            '**Code review and static analysis** for application flaws.',
            '**Audits, interviews and walkthroughs** for process and physical weaknesses.',
            '**CVE and vendor advisories** to track newly disclosed flaws.',
          ],
        },
        { heading: 'CVSS severity ratings' },
        {
          table: {
            columns: ['Score', 'Severity'],
            rows: [
              ['0.0', 'None'],
              ['0.1 – 3.9', 'Low'],
              ['4.0 – 6.9', 'Medium'],
              ['7.0 – 8.9', 'High'],
              ['9.0 – 10.0', 'Critical'],
            ],
          },
        },
        { heading: 'Existing controls' },
        'At this stage, also note the **controls already in place**, because they reduce how exploitable a vulnerability is.',
        { trap: 'A vulnerability score shows **severity**, not **risk**. Risk also depends on the asset’s value and the likelihood of a threat exploiting it.' },
      ],
      example: {
        title: 'Scan results for a web server',
        input: 'Monthly vulnerability scan of the admission website server.',
        output: `CVE in web framework (CVSS 9.8) → Critical → patch within days
TLS 1.0 still enabled            → Medium   → disable
Admin panel open to internet     → High (config) → restrict by IP/VPN`,
        explanation: 'Findings are prioritised by severity and by how exposed the asset is.',
      },
      keyPoints: [
        'Vulnerabilities are weaknesses that threats can exploit.',
        'Types: technical, configuration, physical, organisational, human.',
        'Methods: scanning, authorised pen testing, config and code review, audits, CVE tracking.',
        'CVSS rates severity 0–10.',
        'Severity is not the same as risk.',
      ],
      importantTerms: [
        { term: 'CVE', meaning: 'Common Vulnerabilities and Exposures — public IDs for known flaws.' },
        { term: 'CVSS', meaning: 'Common Vulnerability Scoring System — severity score 0–10.' },
        { term: 'Penetration test', meaning: 'Authorised simulated attack to find exploitable weaknesses.' },
        { term: 'Hardening baseline', meaning: 'A standard of secure configuration settings.' },
      ],
      examPoints: [
        'Define vulnerability identification.',
        'Classify vulnerability **types**.',
        'Explain **methods**, CVE and **CVSS** ranges.',
        'Distinguish severity from risk.',
      ],
      questions: [
        {
          prompt: 'Explain vulnerability identification and the methods used.',
          plan: ANSWER_PLAN(
            'Finding weaknesses that threats could exploit',
            'Table of vulnerability types',
            'Scanning, pen testing, reviews, audits; CVE; CVSS',
            'Web server scan findings',
            'Note existing controls; severity ≠ risk',
          ),
        },
      ],
      keywords: ['vulnerability identification', 'vulnerability scanning', 'penetration testing', 'CVE', 'CVSS', 'configuration review', 'hardening'],
      remember: [
        { prompt: 'CVSS range for “High”?', answer: '7.0 – 8.9.' },
        { prompt: 'What is CVE?', answer: 'A public identifier for a known vulnerability.' },
        { prompt: 'Does a high CVSS score always mean high risk?', answer: 'No — risk also depends on asset value and likelihood.' },
      ],
    },

    // ------------------------------------------------------------------
    'risk-assessment-approaches': {
      difficulty: 'medium',
      intro: 'There are two ways to measure risk: with numbers (money) or with ratings (high/medium/low).',
      definition:
        '**Risk assessment** is the overall process of identifying, analysing and evaluating risks. The two main **approaches** are **quantitative** — expressing risk in monetary or numeric terms (e.g. Annualised Loss Expectancy) — and **qualitative** — rating likelihood and impact on scales such as Low/Medium/High. Many organisations use a **hybrid (semi-quantitative)** approach.',
      simpleExplanation: {
        text: 'A quantitative approach says “this risk costs us ₹4 lakh a year”. A qualitative approach says “this risk is High”. Numbers are precise but need good data; ratings are quick but subjective.',
        analogy: 'A doctor can say “your blood pressure is 150/95” (quantitative) or “your blood pressure is high” (qualitative).',
      },
      visual: {
        type: 'comparison',
        title: 'Quantitative vs qualitative risk assessment',
        items: [
          {
            title: 'Quantitative',
            tone: 'muted',
            points: ['Uses money and probabilities', 'ALE = SLE × ARO', 'Good for cost–benefit decisions', 'Needs reliable data — hard to obtain'],
          },
          {
            title: 'Qualitative',
            tone: 'accent',
            points: ['Uses ratings: Low, Medium, High', 'Risk matrix of likelihood × impact', 'Quick and easy to understand', 'Subjective; less precise'],
          },
        ],
      },
      explanation: [
        { heading: 'Risk assessment process' },
        {
          list: [
            '**Identify** — assets, threats, vulnerabilities, existing controls.',
            '**Analyse** — likelihood and impact → level of risk (risk determination).',
            '**Evaluate** — compare with risk criteria and prioritise.',
            'Then **treat** the risk.',
          ],
          ordered: true,
        },
        { heading: 'Quantitative formulas' },
        {
          table: {
            columns: ['Term', 'Formula / meaning'],
            rows: [
              ['Asset value (AV)', 'Monetary value of the asset'],
              ['Exposure factor (EF)', 'Percentage of asset value lost in one incident'],
              ['Single loss expectancy (SLE)', 'SLE = AV × EF'],
              ['Annualised rate of occurrence (ARO)', 'Expected number of incidents per year'],
              ['Annualised loss expectancy (ALE)', 'ALE = SLE × ARO'],
            ],
          },
        },
        'A control is worth buying if its yearly cost is less than the reduction in ALE it achieves.',
        { heading: 'Other approaches' },
        '**Asset-based** (start from assets), **threat-based** (start from threat scenarios) and **vulnerability-based** (start from known weaknesses) — standards such as **ISO/IEC 27005** and **NIST SP 800-30** describe these methods.',
      ],
      example: {
        title: 'ALE calculation',
        input: 'Laptop with data worth ₹2,00,000. Theft destroys 50% of its value. Expected thefts: 2 per year.',
        output: `SLE = AV × EF  = 2,00,000 × 0.5 = ₹1,00,000
ALE = SLE × ARO = 1,00,000 × 2  = ₹2,00,000 per year
Encryption + tracking costs ₹40,000/year and cuts EF sharply → worth buying`,
        explanation: 'Quantitative results support cost–benefit decisions about controls.',
      },
      keyPoints: [
        'Risk assessment = identify, analyse, evaluate.',
        'Quantitative: money; SLE = AV × EF; ALE = SLE × ARO.',
        'Qualitative: ratings and risk matrices.',
        'Hybrid approaches combine both.',
        'Standards: ISO/IEC 27005, NIST SP 800-30.',
      ],
      importantTerms: [
        { term: 'SLE', meaning: 'Single loss expectancy — loss from one incident.' },
        { term: 'ARO', meaning: 'Annualised rate of occurrence — incidents per year.' },
        { term: 'ALE', meaning: 'Annualised loss expectancy — expected loss per year.' },
        { term: 'Exposure factor', meaning: 'Fraction of asset value lost in one incident.' },
      ],
      examPoints: [
        'Define risk assessment and its steps.',
        'Compare **quantitative and qualitative** approaches.',
        'Write and apply the **SLE and ALE formulas**.',
      ],
      questions: [
        {
          prompt: 'Compare quantitative and qualitative risk assessment approaches.',
          plan: ANSWER_PLAN(
            'Measuring risk in money or in ratings',
            'Comparison of the two approaches',
            'Steps; SLE, ARO, ALE; risk matrix; hybrid',
            'Laptop ALE calculation',
            'Pros and cons; standards',
          ),
        },
      ],
      keywords: ['risk assessment', 'quantitative', 'qualitative', 'SLE', 'ARO', 'ALE', 'exposure factor', 'ISO/IEC 27005', 'NIST SP 800-30'],
      remember: [
        { prompt: 'Formula for ALE?', answer: 'ALE = SLE × ARO.' },
        { prompt: 'Formula for SLE?', answer: 'SLE = Asset value × Exposure factor.' },
        { prompt: 'Main weakness of qualitative assessment?', answer: 'It is subjective and less precise.' },
      ],
    },

    // ------------------------------------------------------------------
    'likelihood-assessment': {
      difficulty: 'medium',
      intro: 'Likelihood is half of the risk equation: how probable is it that this threat succeeds?',
      definition:
        '**Likelihood assessment** estimates the probability that a threat event will occur **and** successfully exploit a vulnerability to cause harm, considering threat capability and intent, the severity and exposure of the vulnerability, and the effectiveness of **existing controls**. It is usually rated on a scale such as Very Low to Very High.',
      simpleExplanation: {
        text: 'Ask two questions: how likely is someone or something to try, and how likely is it to succeed given our defences? A public website with a known flaw is far more likely to be attacked successfully than an isolated internal system with strong controls.',
        analogy: 'The chance of a bicycle being stolen depends on where it is parked (exposure), how common thefts are there (threat), and what lock you used (controls).',
      },
      visual: {
        type: 'flow',
        title: 'Factors that drive likelihood',
        steps: [
          { label: 'Threat', note: 'capability, intent, history' },
          { label: 'Exposure', note: 'internet-facing? easy to reach?' },
          { label: 'Vulnerability', note: 'severity, known exploit?' },
          { label: 'Existing controls', note: 'how strong?' },
          { label: 'Likelihood rating', note: 'very low to very high' },
        ],
      },
      explanation: [
        { heading: 'Two parts of likelihood (NIST view)' },
        {
          list: [
            '**Likelihood of occurrence / initiation** — will the threat event happen?',
            '**Likelihood of adverse impact** — if it happens, will it succeed in causing harm?',
          ],
        },
        { heading: 'Example qualitative scale' },
        {
          table: {
            columns: ['Rating', 'Description'],
            rows: [
              ['Very high', 'Almost certain to occur; happens frequently'],
              ['High', 'Highly likely; has occurred before'],
              ['Moderate', 'Somewhat likely'],
              ['Low', 'Unlikely'],
              ['Very low', 'Highly unlikely'],
            ],
          },
        },
        { heading: 'Information used' },
        'Past incidents, threat intelligence, vulnerability scan results, exposure of the asset, and control test results. Quantitatively, likelihood is expressed as the **ARO**.',
        { tip: 'Strong existing controls lower likelihood — so always assess controls before rating likelihood.' },
      ],
      example: {
        title: 'Rating likelihood for two systems',
        input: 'Same vulnerability (CVSS 8.1) on two servers.',
        output: `Server A: internet-facing, exploit publicly available, no WAF → likelihood High
Server B: internal only, behind VPN + MFA, monitored        → likelihood Low`,
        explanation: 'The vulnerability is identical, but exposure and controls change the likelihood.',
      },
      keyPoints: [
        'Likelihood = chance a threat occurs and succeeds.',
        'Factors: threat capability/intent, exposure, vulnerability severity, controls.',
        'Rated qualitatively (very low to very high) or as ARO.',
        'Existing controls reduce likelihood.',
      ],
      importantTerms: [
        { term: 'Likelihood', meaning: 'Probability that a threat event occurs and causes harm.' },
        { term: 'Exposure', meaning: 'How reachable an asset is by threats.' },
        { term: 'Existing control', meaning: 'A safeguard already in place that reduces risk.' },
      ],
      examPoints: [
        'Define likelihood assessment.',
        'List **factors** affecting likelihood.',
        'Show a **rating scale**.',
        'Give an example showing effect of controls.',
      ],
      questions: [
        {
          prompt: 'Explain likelihood assessment in risk analysis.',
          plan: ANSWER_PLAN(
            'Estimating how probable a successful threat event is',
            'Factors flow',
            'Occurrence and adverse impact; scale; information used',
            'Same vulnerability on two servers',
            'Controls lower likelihood; ARO in quantitative terms',
          ),
        },
      ],
      keywords: ['likelihood', 'threat capability', 'exposure', 'existing controls', 'rating scale', 'ARO', 'NIST SP 800-30'],
      remember: [
        { prompt: 'Name two factors that increase likelihood.', answer: 'Internet exposure and a publicly available exploit.' },
        { prompt: 'Quantitative measure of likelihood?', answer: 'ARO — annualised rate of occurrence.' },
        { prompt: 'Do existing controls affect likelihood?', answer: 'Yes — strong controls reduce it.' },
      ],
    },

    // ------------------------------------------------------------------
    'impact-assessment': {
      difficulty: 'medium',
      intro: 'Impact is the other half of risk: how bad would it be if the threat succeeded?',
      definition:
        '**Impact assessment** estimates the **magnitude of harm** to the organisation if a threat event succeeds — loss of confidentiality, integrity or availability and the resulting **financial, operational, legal, reputational and safety** consequences. FIPS 199 rates impact as **Low** (limited adverse effect), **Moderate** (serious) or **High** (severe or catastrophic).',
      simpleExplanation: {
        text: 'If this asset were leaked, changed or unavailable, what would happen? A few minutes of downtime on a blog is a small impact; a hospital system going down during surgery is a severe one.',
        analogy: 'A broken pencil and a broken car are both breakages, but the impact is very different.',
      },
      visual: {
        type: 'comparison',
        title: 'Impact levels (FIPS 199)',
        items: [
          { title: 'Low', tone: 'muted', points: ['Limited adverse effect', 'Minor damage or loss', 'Example — brief blog outage'] },
          { title: 'Moderate', tone: 'accent', points: ['Serious adverse effect', 'Significant damage or loss', 'Example — customer data leak'] },
          { title: 'High', tone: 'bad', points: ['Severe or catastrophic effect', 'Major loss or harm to life', 'Example — hospital system down'] },
        ],
      },
      explanation: [
        { heading: 'Types of impact' },
        {
          table: {
            columns: ['Impact type', 'Examples'],
            rows: [
              ['Financial', 'Lost revenue, recovery cost, fines'],
              ['Operational', 'Downtime, delayed services'],
              ['Legal / regulatory', 'Penalties, lawsuits, breach notification duties'],
              ['Reputational', 'Loss of customer trust, negative media'],
              ['Safety', 'Harm to people in health, transport, industry'],
            ],
          },
        },
        { heading: 'Impact by security goal' },
        'Assess separately for **confidentiality** (data disclosed), **integrity** (data altered) and **availability** (service unavailable). The same asset may have high confidentiality impact but low availability impact.',
        { heading: 'Business impact analysis (BIA)' },
        'A BIA identifies critical business processes, their dependencies, and how long they can be down — **Recovery Time Objective (RTO)** — and how much data loss is tolerable — **Recovery Point Objective (RPO)**.',
      ],
      example: {
        title: 'Impact of losing the student records database',
        input: 'Assess impact for each CIA goal.',
        output: `Confidentiality: High   — personal data leak, legal duty under DPDP Act
Integrity      : High   — altered marks damage credibility
Availability   : Moderate — results delayed by a day, workarounds exist`,
        explanation: 'Rating each goal separately leads to better choice of controls.',
      },
      keyPoints: [
        'Impact = magnitude of harm if a threat succeeds.',
        'Types: financial, operational, legal, reputational, safety.',
        'Assess separately for C, I and A.',
        'FIPS 199: Low (limited), Moderate (serious), High (severe/catastrophic).',
        'BIA sets RTO and RPO.',
      ],
      importantTerms: [
        { term: 'Impact', meaning: 'The magnitude of harm from a successful threat event.' },
        { term: 'BIA', meaning: 'Business impact analysis of critical processes and downtime tolerance.' },
        { term: 'RTO', meaning: 'Recovery Time Objective — maximum acceptable downtime.' },
        { term: 'RPO', meaning: 'Recovery Point Objective — maximum acceptable data loss measured in time.' },
      ],
      examPoints: [
        'Define impact assessment.',
        'List **types of impact** and FIPS 199 levels.',
        'Explain per-goal (CIA) assessment and BIA (RTO, RPO).',
      ],
      questions: [
        {
          prompt: 'Explain impact assessment in risk management.',
          plan: ANSWER_PLAN(
            'Estimating magnitude of harm if a threat succeeds',
            'Low / Moderate / High levels',
            'Impact types; CIA-wise rating; BIA; RTO and RPO',
            'Student records database',
            'Impact combined with likelihood gives risk',
          ),
        },
      ],
      keywords: ['impact', 'FIPS 199', 'financial impact', 'reputational impact', 'business impact analysis', 'RTO', 'RPO'],
      remember: [
        { prompt: 'Three FIPS 199 impact levels?', answer: 'Low, Moderate, High.' },
        { prompt: 'What is RTO?', answer: 'Maximum acceptable downtime.' },
        { prompt: 'What is RPO?', answer: 'Maximum acceptable data loss, measured in time.' },
      ],
    },

    // ------------------------------------------------------------------
    'risk-determination': {
      difficulty: 'medium',
      intro: 'Combine likelihood and impact to get a single risk level for each scenario.',
      definition:
        '**Risk determination** combines the assessed **likelihood** and **impact** of each threat scenario to produce a **level of risk**, usually with a **risk matrix** (qualitative) or by multiplying probability and loss (quantitative). The result is a list of risks ranked by level.',
      simpleExplanation: {
        text: 'A threat that is very likely and very damaging is a high risk. One that is unlikely and minor is a low risk. A matrix places each risk in a cell to show its level at a glance.',
        analogy: 'Weather alerts combine how likely a storm is with how strong it will be to decide between green, orange and red alerts.',
      },
      visual: {
        type: 'comparison',
        title: 'Risk matrix: likelihood × impact',
        table: {
          columns: ['Likelihood ↓ · Impact →', 'Low', 'Moderate', 'High'],
          rows: [
            ['High', 'Medium', 'High', 'High'],
            ['Moderate', 'Low', 'Medium', 'High'],
            ['Low', 'Low', 'Low', 'Medium'],
          ],
        },
        caption: 'Each risk scenario is placed by its likelihood (row) and impact (column).',
      },
      explanation: [
        { heading: 'Steps' },
        {
          list: [
            'Describe each **risk scenario**: threat + vulnerability + asset.',
            'Take its likelihood rating and impact rating.',
            'Look up the risk level in the matrix (or compute a score, e.g. 1–5 × 1–5).',
            'Record it in a **risk register** with an owner.',
          ],
          ordered: true,
        },
        { heading: 'Scoring variant' },
        'Using numbers 1–5 for both, **risk score = likelihood × impact** gives 1–25. Bands such as 1–6 Low, 8–12 Medium, 15–25 High make ranking easy.',
        { heading: 'Risk register' },
        {
          table: {
            columns: ['Field', 'Example'],
            rows: [
              ['Risk ID / description', 'R-07 Ransomware encrypts file server'],
              ['Likelihood / impact', 'High / High'],
              ['Risk level', 'High'],
              ['Risk owner', 'IT Manager'],
              ['Planned treatment', 'Offline backups, EDR, MFA'],
            ],
          },
        },
        { trap: 'Risk is not the same as vulnerability severity. A critical vulnerability on an isolated, low-value test machine may still be a low risk.' },
      ],
      example: {
        title: 'Determining three risks',
        input: 'Scenarios for a college.',
        output: `Phishing of staff email     : likelihood High × impact Moderate → High
Flood in server room        : likelihood Low  × impact High     → Medium
Defacement of notice board site: likelihood Moderate × impact Low → Low`,
        explanation: 'The ranked list tells management where to act first.',
      },
      keyPoints: [
        'Risk level = combination of likelihood and impact.',
        'Use a risk matrix or score (likelihood × impact).',
        'Record risks in a risk register with owners.',
        'Risk differs from vulnerability severity.',
      ],
      importantTerms: [
        { term: 'Risk matrix', meaning: 'Grid that maps likelihood and impact to a risk level.' },
        { term: 'Risk register', meaning: 'Record of identified risks, levels, owners and treatments.' },
        { term: 'Risk scenario', meaning: 'A threat exploiting a vulnerability to harm an asset.' },
        { term: 'Risk owner', meaning: 'Person accountable for managing a risk.' },
      ],
      examPoints: [
        'Define risk determination.',
        'Draw a **risk matrix**.',
        'Explain scoring and the **risk register**.',
      ],
      questions: [
        {
          prompt: 'Explain risk determination with a risk matrix.',
          plan: ANSWER_PLAN(
            'Combining likelihood and impact into a risk level',
            '3 × 3 risk matrix',
            'Steps; scoring; risk register',
            'Three college risk scenarios',
            'Ranked list guides priorities',
          ),
        },
      ],
      keywords: ['risk determination', 'risk matrix', 'likelihood × impact', 'risk score', 'risk register', 'risk owner'],
      remember: [
        { prompt: 'Two inputs to risk determination?', answer: 'Likelihood and impact.' },
        { prompt: 'Where are determined risks recorded?', answer: 'In a risk register.' },
        { prompt: 'High likelihood × Low impact in a 3 × 3 matrix?', answer: 'Medium.' },
      ],
    },

    // ------------------------------------------------------------------
    'risk-evaluation': {
      difficulty: 'medium',
      intro: 'Not every risk needs action. Risk evaluation decides which ones do, and in what order.',
      definition:
        '**Risk evaluation** compares each determined risk level with the organisation’s **risk acceptance criteria** (risk appetite and tolerance) to decide whether the risk is **acceptable** or needs **treatment**, and to **prioritise** risks for action.',
      simpleExplanation: {
        text: 'Management sets a line: risks below it are acceptable; risks above it must be reduced. Evaluation checks every risk against that line and creates a priority list.',
        analogy: 'A teacher sets a pass mark. Students above it pass; those below get extra classes — starting with the lowest scores.',
      },
      visual: {
        type: 'flow',
        title: 'Risk evaluation decision',
        steps: [
          { label: 'Determined risk', note: 'level from the matrix' },
          { label: 'Compare', note: 'with acceptance criteria' },
          { label: 'Acceptable?', note: 'yes → accept and monitor' },
          { label: 'Not acceptable', note: 'needs treatment' },
          { label: 'Prioritise', note: 'highest risk first' },
        ],
      },
      explanation: [
        { heading: 'Risk acceptance criteria' },
        {
          list: [
            '**Risk appetite** — the overall amount of risk the organisation is willing to take.',
            '**Risk tolerance** — acceptable variation for a specific objective.',
            'Criteria may also include legal requirements, contractual obligations and cost of treatment.',
          ],
        },
        { heading: 'Outputs' },
        {
          list: [
            'A **prioritised list** of risks needing treatment.',
            'A list of **accepted risks**, formally signed off by the risk owner.',
            'Inputs for the **risk treatment plan** and budget.',
          ],
        },
        { heading: 'Factors in prioritisation' },
        'Risk level, legal or regulatory exposure, effect on critical business processes, cost and ease of treatment, and dependencies between risks.',
        { note: 'Accepted risks are not forgotten — they are **monitored** and re-evaluated when conditions change.' },
      ],
      example: {
        title: 'Evaluating against criteria',
        input: 'Criteria: only Low risks may be accepted without treatment; any risk involving personal data must be treated.',
        output: `Phishing of staff email (High)          → treat — priority 1
Flood in server room (Medium)           → treat — priority 2
Defacement of notice site (Low)         → accept and monitor
Minor leak of student phone list (Low)  → treat (personal data rule)`,
        explanation: 'Legal requirements can make even a low-rated risk unacceptable.',
      },
      keyPoints: [
        'Evaluation compares risk levels with acceptance criteria.',
        'Criteria: risk appetite, tolerance, legal and contractual needs.',
        'Output: prioritised risks to treat and accepted risks.',
        'Accepted risks are signed off and monitored.',
      ],
      importantTerms: [
        { term: 'Risk evaluation', meaning: 'Deciding whether each risk is acceptable and how to prioritise it.' },
        { term: 'Risk appetite', meaning: 'Overall level of risk an organisation is willing to accept.' },
        { term: 'Risk tolerance', meaning: 'Acceptable deviation for a particular objective.' },
        { term: 'Risk acceptance', meaning: 'Formal decision to tolerate a risk without further treatment.' },
      ],
      examPoints: [
        'Define risk evaluation and **differentiate it from determination**.',
        'Explain **acceptance criteria**.',
        'Describe outputs and prioritisation.',
      ],
      questions: [
        {
          prompt: 'What is risk evaluation? How are risks prioritised?',
          plan: ANSWER_PLAN(
            'Comparing risk levels with acceptance criteria',
            'Evaluation decision flow',
            'Appetite, tolerance, legal criteria; outputs; prioritisation factors',
            'College risks evaluated against criteria',
            'Accepted risks monitored',
          ),
        },
      ],
      keywords: ['risk evaluation', 'acceptance criteria', 'risk appetite', 'risk tolerance', 'prioritisation', 'risk acceptance'],
      remember: [
        { prompt: 'Risk determination vs evaluation?', answer: 'Determination calculates the level; evaluation decides if it is acceptable and its priority.' },
        { prompt: 'What is risk appetite?', answer: 'The overall amount of risk an organisation is willing to accept.' },
        { prompt: 'Are accepted risks ignored?', answer: 'No — they are signed off and monitored.' },
      ],
    },

    // ------------------------------------------------------------------
    'risk-treatment': {
      difficulty: 'medium',
      intro: 'The four treatment options are a must-know. Learn each with an example.',
      definition:
        '**Risk treatment** is selecting and implementing options to deal with risks that are not acceptable. The four options are **risk reduction (mitigation/modification)**, **risk retention (acceptance)**, **risk avoidance** and **risk sharing (transfer)**. The risk left after treatment is **residual risk**.',
      simpleExplanation: {
        text: 'For each serious risk you can: make it smaller (add controls), live with it (accept), stop the risky activity (avoid), or let someone else carry part of it (insurance or outsourcing).',
        analogy: 'Driving risk: wear a seatbelt (reduce), accept small scratches (retain), do not drive in a cyclone (avoid), buy vehicle insurance (transfer).',
      },
      visual: {
        type: 'hierarchy',
        title: 'Risk treatment options',
        root: 'Risk treatment',
        children: [
          { label: 'Reduce', note: 'modify / mitigate', children: ['Add controls', 'Patch, MFA, backups'] },
          { label: 'Retain', note: 'accept', children: ['Low risk', 'Cost of control too high'] },
          { label: 'Avoid', note: 'eliminate activity', children: ['Stop storing card data', 'Retire old system'] },
          { label: 'Share', note: 'transfer', children: ['Cyber insurance', 'Outsourcing with contract'] },
        ],
      },
      explanation: [
        { heading: 'Choosing an option' },
        {
          table: {
            columns: ['Option', 'When to use', 'Example'],
            rows: [
              ['Reduce', 'Cost-effective controls exist', 'Enable MFA to cut account takeover risk'],
              ['Retain', 'Risk within appetite or treatment costs more than the loss', 'Accept brief outage of a non-critical site'],
              ['Avoid', 'Activity is not essential and risk is high', 'Stop collecting unnecessary Aadhaar copies'],
              ['Share', 'Financial impact can be transferred', 'Buy cyber insurance; use a certified payment gateway'],
            ],
          },
        },
        { heading: 'Types of controls for reduction' },
        '**Preventive** (firewall, MFA), **detective** (IDS, log monitoring), **corrective** (backups, patching), and by nature: **administrative** (policy, training), **technical** (encryption) and **physical** (locks, CCTV).',
        { heading: 'Risk treatment plan' },
        'Lists chosen controls, responsible persons, deadlines, cost and expected residual risk. The risk owner formally **accepts the residual risk**.',
        { trap: 'Transferring risk transfers **financial** consequences, not **accountability** — the organisation remains responsible for protecting its data.' },
      ],
      example: {
        title: 'Treating the ransomware risk',
        input: 'Risk R-07: ransomware on file server — High.',
        output: `Reduce : offline backups, EDR, MFA, patching, segmentation
Share  : cyber insurance for recovery costs
Retain : residual Low risk accepted by IT Manager
Review : test restore every quarter`,
        explanation: 'Options are often combined; the aim is a residual risk within appetite.',
      },
      keyPoints: [
        'Four options: reduce, retain, avoid, share.',
        'Residual risk remains after treatment and must be accepted.',
        'Controls: preventive, detective, corrective; administrative, technical, physical.',
        'Transfer moves financial impact, not accountability.',
      ],
      importantTerms: [
        { term: 'Risk reduction', meaning: 'Applying controls to lower likelihood or impact.' },
        { term: 'Risk avoidance', meaning: 'Stopping the activity that creates the risk.' },
        { term: 'Risk transfer', meaning: 'Shifting financial consequences to another party, e.g. insurer.' },
        { term: 'Residual risk', meaning: 'Risk remaining after treatment.' },
      ],
      examPoints: [
        'Define risk treatment and **explain the four options** with examples.',
        'Explain **residual risk**.',
        'Classify controls.',
      ],
      questions: [
        {
          prompt: 'Explain the various risk treatment options.',
          plan: ANSWER_PLAN(
            'Selecting options to deal with unacceptable risks',
            'Treatment options tree',
            'Reduce, retain, avoid, share; control types; treatment plan',
            'Ransomware risk treatment',
            'Residual risk accepted by owner; transfer ≠ accountability',
          ),
        },
      ],
      keywords: ['risk treatment', 'mitigation', 'risk retention', 'risk avoidance', 'risk transfer', 'residual risk', 'preventive', 'detective', 'corrective'],
      remember: [
        { prompt: 'Four risk treatment options?', answer: 'Reduce, retain, avoid, share (transfer).' },
        { prompt: 'Buying cyber insurance is which option?', answer: 'Risk sharing / transfer.' },
        { prompt: 'Risk left after treatment is called?', answer: 'Residual risk.' },
      ],
    },

    // ------------------------------------------------------------------
    'security-management-function': {
      difficulty: 'medium',
      intro: 'Governance sets direction; the security management function makes it happen day to day.',
      definition:
        'The **security management function** plans, implements, operates, monitors and improves an organisation’s security controls in line with governance direction. It is usually organised as an **Information Security Management System (ISMS)** — such as ISO/IEC 27001 — led by a **CISO**, and follows the **Plan–Do–Check–Act (PDCA)** cycle.',
      simpleExplanation: {
        text: 'Security management turns the strategy into daily work: writing procedures, running risk assessments, managing access, training staff, monitoring alerts, handling incidents and reporting results — then improving.',
        analogy: 'The board decides the hospital should be clean and safe (governance); the hospital administration organises cleaning schedules, checks and staff training (management).',
      },
      visual: {
        type: 'process',
        title: 'PDCA cycle of an ISMS',
        steps: [
          { label: 'Plan', detail: 'scope, policy, risk assessment, select controls' },
          { label: 'Do', detail: 'implement controls, train people, operate' },
          { label: 'Check', detail: 'monitor, measure, internal audit, management review' },
          { label: 'Act', detail: 'correct problems, improve continually' },
        ],
      },
      explanation: [
        { heading: 'Responsibilities of security management' },
        {
          list: [
            'Determine security objectives, strategies and policies.',
            'Identify and analyse risks; select and implement controls.',
            'Manage security awareness and training.',
            'Manage access, assets, vulnerabilities and patches.',
            'Detect and respond to incidents.',
            'Monitor, measure and report security performance.',
            'Ensure compliance with laws, contracts and standards.',
          ],
        },
        { heading: 'Typical roles' },
        {
          table: {
            columns: ['Role', 'Responsibility'],
            rows: [
              ['CISO', 'Leads the security programme; reports to senior management'],
              ['Security manager / team', 'Runs controls, monitoring and incident response'],
              ['Asset / data owners', 'Decide protection needs for their assets'],
              ['IT operations', 'Implement technical controls'],
              ['All employees', 'Follow policy, report incidents'],
            ],
          },
        },
        { heading: 'Security planning' },
        'Security planning documents the controls for each system in a **system security plan**, links security to budgets (capital planning), and schedules reviews and audits.',
      ],
      example: {
        title: 'One PDCA cycle for password security',
        input: 'Risk: account takeover via weak passwords.',
        output: `Plan  : policy requires MFA for all staff
Do    : roll out authenticator app; train staff
Check : dashboard shows 85% MFA coverage; audit finds gaps
Act   : enforce MFA at next login for remaining 15%`,
        explanation: 'The cycle repeats, steadily improving security.',
      },
      keyPoints: [
        'Security management implements and operates controls under governance.',
        'ISMS (ISO/IEC 27001) follows Plan–Do–Check–Act.',
        'Tasks: objectives, risks, controls, awareness, incidents, monitoring, compliance.',
        'Led by the CISO; everyone has a role.',
      ],
      importantTerms: [
        { term: 'ISMS', meaning: 'Information Security Management System — systematic approach to managing security.' },
        { term: 'PDCA', meaning: 'Plan–Do–Check–Act continuous improvement cycle.' },
        { term: 'ISO/IEC 27001', meaning: 'International standard specifying ISMS requirements.' },
        { term: 'System security plan', meaning: 'Document describing a system’s security controls.' },
      ],
      examPoints: [
        'Define the security management function.',
        'Explain the **PDCA cycle**.',
        'List responsibilities and roles.',
      ],
      questions: [
        {
          prompt: 'Explain the security management function and the ISMS.',
          plan: ANSWER_PLAN(
            'Planning, implementing, operating and improving security',
            'PDCA cycle',
            'Responsibilities; roles; security planning; ISO/IEC 27001',
            'MFA roll-out through one PDCA cycle',
            'Continual improvement; CISO leadership',
          ),
        },
      ],
      keywords: ['security management', 'ISMS', 'ISO/IEC 27001', 'PDCA', 'CISO', 'security planning', 'continual improvement'],
      remember: [
        { prompt: 'Expand PDCA.', answer: 'Plan, Do, Check, Act.' },
        { prompt: 'Which standard specifies ISMS requirements?', answer: 'ISO/IEC 27001.' },
        { prompt: 'Who leads the security programme?', answer: 'The CISO.' },
      ],
    },

    // ------------------------------------------------------------------
    'security-policy': {
      difficulty: 'medium',
      intro: 'A security policy is the written foundation of all security rules. Know its types, contents and hierarchy.',
      definition:
        'A **security policy** is a formal, management-approved document that states an organisation’s security goals, rules and responsibilities for protecting its information assets. It is supported by **standards, guidelines and procedures**. Policies may be **organisation-wide (programme)**, **issue-specific** (e.g. acceptable use) or **system-specific**.',
      simpleExplanation: {
        text: 'The policy says *what* must be done and *why*; standards say *which* specific rules apply; procedures say *how* to do it step by step. Everyone in the organisation must follow it.',
        analogy: 'A school rule says “students must be in uniform” (policy), the uniform colour list is the standard, and the steps to request a new uniform are the procedure.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Policy hierarchy',
        root: 'Security documentation',
        children: [
          { label: 'Policy', note: 'what and why — mandatory', children: ['Approved by management'] },
          { label: 'Standards', note: 'specific mandatory rules', children: ['Passwords of 12+ characters'] },
          { label: 'Guidelines', note: 'recommended practice', children: ['Use a password manager'] },
          { label: 'Procedures', note: 'step-by-step how', children: ['How to reset a password'] },
        ],
      },
      explanation: [
        { heading: 'Types of policy (NIST SP 800-12)' },
        {
          table: {
            columns: ['Type', 'Scope', 'Example'],
            rows: [
              ['Programme / enterprise policy', 'Whole organisation', 'Information security policy'],
              ['Issue-specific policy', 'A particular topic', 'Acceptable use, email, BYOD, remote work'],
              ['System-specific policy', 'One system', 'Rules for the payroll system'],
            ],
          },
        },
        { heading: 'Typical contents' },
        {
          list: [
            'Purpose and scope.',
            'Roles and responsibilities.',
            'Policy statements — the rules.',
            'Compliance and consequences of violation.',
            'Exceptions process.',
            'Review date and approval.',
          ],
        },
        { heading: 'Acceptable use policy (AUP)' },
        'Defines permitted and prohibited use of IT resources — e.g. no sharing of passwords, no installing unlicensed software, no accessing illegal content — and states that use may be monitored.',
        { heading: 'Characteristics of a good policy' },
        'Clear and concise, approved by management, enforceable, realistic, communicated to all, and **reviewed regularly**.',
      ],
      example: {
        title: 'Policy violation scenario',
        input: 'An employee shares their login with an intern to “save time”.',
        output: `Violated : acceptable use policy — credentials must not be shared
Risk     : no accountability; possible misuse of access
Response : awareness reminder, disciplinary process per policy,
           create a proper account for the intern`,
        explanation: 'Policies make expectations clear and allow consistent enforcement.',
      },
      keyPoints: [
        'Security policy = management-approved rules for protecting assets.',
        'Hierarchy: policy → standards → guidelines → procedures.',
        'Types: programme, issue-specific, system-specific.',
        'Contents: purpose, scope, roles, rules, compliance, review.',
        'AUP defines acceptable use of IT resources.',
      ],
      importantTerms: [
        { term: 'Security policy', meaning: 'Formal statement of security rules and responsibilities.' },
        { term: 'Standard', meaning: 'Mandatory specific requirement supporting a policy.' },
        { term: 'Procedure', meaning: 'Step-by-step instructions to carry out a task.' },
        { term: 'AUP', meaning: 'Acceptable use policy for IT resources.' },
      ],
      examPoints: [
        'Define security policy.',
        'Draw the **policy hierarchy**.',
        'Explain **types** and **contents**.',
        'Describe the AUP and qualities of a good policy.',
      ],
      questions: [
        {
          prompt: 'What is a security policy? Explain its types and components.',
          plan: ANSWER_PLAN(
            'Management-approved document of security rules',
            'Policy → standards → guidelines → procedures',
            'Types; contents; AUP; qualities',
            'Shared login violation',
            'Regular review and enforcement',
          ),
        },
      ],
      keywords: ['security policy', 'standards', 'guidelines', 'procedures', 'issue-specific', 'system-specific', 'acceptable use policy', 'enforcement'],
      remember: [
        { prompt: 'Which is mandatory — a standard or a guideline?', answer: 'A standard.' },
        { prompt: 'Three types of policy (NIST)?', answer: 'Programme, issue-specific, system-specific.' },
        { prompt: 'What does an AUP define?', answer: 'Permitted and prohibited use of IT resources.' },
      ],
    },

    // ------------------------------------------------------------------
    'bell-lapadula-model': {
      difficulty: 'hard',
      intro: 'The classic confidentiality model. Remember it as “no read up, no write down”.',
      definition:
        'The **Bell-LaPadula (BLP) model** is a formal **confidentiality** model for **multilevel security**. Subjects have **clearances** and objects have **classifications** (e.g. Top Secret > Secret > Confidential > Unclassified). Its two mandatory rules are the **simple security property — no read up** and the ***-property (star property) — no write down**.',
      simpleExplanation: {
        text: 'A Secret-cleared officer can read Secret and lower documents, but not Top Secret ones (no read up). They also cannot write into a Confidential file (no write down), because that could leak Secret information to people with lower clearance.',
        analogy: 'Secrets can only flow upward — like water poured into higher tanks only, never spilling into lower ones.',
      },
      visual: {
        type: 'comparison',
        title: 'Bell-LaPadula rules for a Secret-level subject',
        table: {
          columns: ['Object level', 'Read?', 'Write?'],
          rows: [
            ['Top Secret', 'No', 'Yes'],
            ['Secret', 'Yes', 'Yes'],
            ['Confidential', 'Yes', 'No'],
            ['Unclassified', 'Yes', 'No'],
          ],
        },
        caption: '**No read up, no write down** — information flows only upward.',
      },
      explanation: [
        { heading: 'The properties' },
        {
          table: {
            columns: ['Property', 'Rule'],
            rows: [
              ['Simple security property', 'A subject can **read** an object only if clearance ≥ classification — no read up'],
              ['*-property (star property)', 'A subject can **write** an object only if clearance ≤ classification — no write down'],
              ['Discretionary security property', 'Access must also be allowed by an access control matrix'],
            ],
          },
        },
        { heading: 'Why “no write down”?' },
        'Without it, a Trojan program running with Secret clearance could copy Secret data into an Unclassified file, leaking it. The *-property blocks this information flow.',
        { heading: 'Other points' },
        {
          list: [
            'Security levels may include **categories/compartments**, forming a lattice (e.g. Secret {Nuclear}).',
            '**Strong star property**: write only at the same level.',
            '**Tranquility principle**: levels of subjects and objects do not change during operation.',
            'BLP is a form of **mandatory access control (MAC)**.',
          ],
        },
        { heading: 'Limitations' },
        'Deals only with **confidentiality**, not integrity (a low-level user can write up and overwrite high-level data); allows **covert channels**; rigid for commercial use.',
      ],
      example: {
        title: 'Military document system',
        input: 'Officer cleared Secret tries four actions.',
        output: `Read Top Secret report   → denied  (no read up)
Read Confidential memo   → allowed
Write to Top Secret log  → allowed (write up)
Write to Unclassified notice → denied (no write down)`,
        explanation: 'Every rule keeps Secret information from reaching a lower level.',
      },
      keyPoints: [
        'BLP protects confidentiality in multilevel systems.',
        'Simple security property: no read up.',
        '*-property: no write down.',
        'Discretionary property uses an access matrix.',
        'Limitation: ignores integrity; covert channels possible.',
      ],
      importantTerms: [
        { term: 'Clearance', meaning: 'Security level assigned to a subject (user/process).' },
        { term: 'Classification', meaning: 'Security level assigned to an object (data/file).' },
        { term: 'Mandatory access control', meaning: 'Access decided by system-enforced labels, not by owners.' },
        { term: 'Covert channel', meaning: 'Hidden path that transfers information in violation of policy.' },
      ],
      examPoints: [
        'State BLP’s purpose: **confidentiality**.',
        'Explain **simple security, *-property and discretionary property**.',
        'Draw the levels with allowed read/write arrows.',
        'Mention limitations.',
      ],
      questions: [
        {
          prompt: 'Explain the Bell-LaPadula model with its properties.',
          plan: ANSWER_PLAN(
            'Formal confidentiality model for multilevel security',
            'Security levels with read/write arrows',
            'Simple security, star and discretionary properties; tranquility',
            'Secret officer reading and writing',
            'No read up, no write down; limitations',
          ),
        },
      ],
      keywords: ['Bell-LaPadula', 'confidentiality', 'multilevel security', 'no read up', 'no write down', 'star property', 'clearance', 'MAC'],
      remember: [
        { prompt: 'BLP in four words?', answer: 'No read up, no write down.' },
        { prompt: 'Which property prevents write down?', answer: 'The *-property (star property).' },
        { prompt: 'What security goal does BLP protect?', answer: 'Confidentiality.' },
      ],
    },

    // ------------------------------------------------------------------
    'biba-integrity-model': {
      difficulty: 'hard',
      intro: 'Biba is the mirror image of Bell-LaPadula, built for integrity. Remember “no read down, no write up”.',
      definition:
        'The **Biba integrity model** is a formal **integrity** model in which subjects and objects have **integrity levels**. Its rules are the **simple integrity property — no read down** (a subject cannot read lower-integrity data) and the ***-integrity property — no write up** (a subject cannot modify higher-integrity data). It is the **dual** of Bell-LaPadula.',
      simpleExplanation: {
        text: 'Trustworthy processes should not be contaminated by untrustworthy data (no read down), and untrustworthy users should not be able to corrupt trustworthy data (no write up).',
        analogy: 'A pure water tank should not take in dirty water (no read down), and someone with dirty hands should not touch the clean tank (no write up).',
      },
      visual: {
        type: 'comparison',
        title: 'Bell-LaPadula vs Biba',
        table: {
          columns: ['', 'Bell-LaPadula', 'Biba'],
          rows: [
            ['Protects', 'Confidentiality', 'Integrity'],
            ['Read rule', 'No read up', 'No read down'],
            ['Write rule', 'No write down', 'No write up'],
            ['Levels', 'Clearance / classification', 'Integrity levels'],
            ['Information flow', 'Upward only', 'Downward only'],
            ['Typical use', 'Military secrecy', 'Commercial data, system files'],
          ],
        },
      },
      explanation: [
        { heading: 'The properties' },
        {
          table: {
            columns: ['Property', 'Rule'],
            rows: [
              ['Simple integrity property', 'A subject can **read** an object only if the object’s integrity ≥ the subject’s — no read down'],
              ['*-integrity property', 'A subject can **write** an object only if the subject’s integrity ≥ the object’s — no write up'],
              ['Invocation property', 'A subject cannot invoke (call) a subject of higher integrity'],
            ],
          },
        },
        { heading: 'Why it matters' },
        'Integrity breaches often come from **untrusted input** flowing into **trusted** processes or data. Biba stops both directions of contamination.',
        { heading: 'Real-world use' },
        'Operating systems use integrity levels in a Biba-like way — e.g. Windows **Mandatory Integrity Control** prevents a low-integrity process (such as a sandboxed browser tab) from writing to higher-integrity system areas.',
        { heading: 'Limitations' },
        'Does not address confidentiality; strict rules can be too restrictive; assigning integrity levels can be difficult.',
        { tip: 'Memory trick: Biba is BLP **upside-down** — swap “up” and “down” in both rules.' },
      ],
      example: {
        title: 'Integrity levels in a bank',
        input: 'Levels: Audited ledger (High) > Teller entries (Medium) > Customer web forms (Low).',
        output: `Teller app reads customer web form       → denied  (no read down)
Customer web form writes to audited ledger → denied  (no write up)
Teller writes to Medium-level entries     → allowed
Auditor (High) writes to ledger           → allowed`,
        explanation: 'Unverified data cannot contaminate trusted records.',
      },
      keyPoints: [
        'Biba protects integrity.',
        'Simple integrity: no read down.',
        '*-integrity: no write up.',
        'Invocation property: cannot invoke higher integrity subjects.',
        'Dual of Bell-LaPadula.',
      ],
      importantTerms: [
        { term: 'Integrity level', meaning: 'Trustworthiness rating of a subject or object.' },
        { term: 'No read down', meaning: 'High-integrity subjects must not read low-integrity data.' },
        { term: 'No write up', meaning: 'Low-integrity subjects must not modify high-integrity data.' },
        { term: 'Mandatory Integrity Control', meaning: 'Windows feature applying integrity levels to processes and objects.' },
      ],
      examPoints: [
        'State Biba’s purpose: **integrity**.',
        'Explain its **three properties**.',
        'Draw a **BLP vs Biba** comparison table.',
        'Give an example and limitations.',
      ],
      questions: [
        {
          prompt: 'Explain the Biba integrity model and compare it with Bell-LaPadula.',
          plan: ANSWER_PLAN(
            'Formal integrity model with integrity levels',
            'BLP vs Biba table',
            'Simple integrity, *-integrity, invocation properties',
            'Bank ledger integrity levels',
            'Dual of BLP; limitations',
          ),
        },
      ],
      keywords: ['Biba', 'integrity', 'integrity level', 'no read down', 'no write up', 'invocation property', 'dual of BLP'],
      remember: [
        { prompt: 'Biba in four words?', answer: 'No read down, no write up.' },
        { prompt: 'Which goal does Biba protect?', answer: 'Integrity.' },
        { prompt: 'How is Biba related to BLP?', answer: 'It is the dual — rules reversed.' },
      ],
    },

    // ------------------------------------------------------------------
    'chinese-wall-model': {
      difficulty: 'hard',
      intro: 'A model for preventing conflicts of interest, where access depends on what you have already seen.',
      definition:
        'The **Chinese Wall model** (Brewer and Nash, 1989) prevents **conflicts of interest**. Objects are grouped into **company datasets**, and datasets of competing companies form **conflict of interest (COI) classes**. A subject may access an object only if it belongs to a dataset the subject has already accessed, **or** to a COI class from which the subject has not yet accessed anything. Access rights therefore **change dynamically** based on **access history**.',
      simpleExplanation: {
        text: 'A consultant who has seen Bank A’s confidential data must not see Bank B’s, because they compete. But they can still work for an oil company. Once they pick a company in a group, a “wall” goes up around its competitors.',
        analogy: 'A lawyer who represents one side of a case cannot also advise the opposing side.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Datasets grouped into conflict of interest classes',
        root: 'Consultancy’s client data',
        children: [
          { label: 'COI class: Banks', children: ['Bank A dataset', 'Bank B dataset'] },
          { label: 'COI class: Oil companies', children: ['Oil X dataset', 'Oil Y dataset'] },
          { label: 'Sanitised information', note: 'public — no restriction', children: ['Annual reports', 'Press releases'] },
        ],
      },
      explanation: [
        { heading: 'Rules' },
        {
          table: {
            columns: ['Rule', 'Meaning'],
            rows: [
              ['Simple security rule (read)', 'S can read O if O is in the same company dataset S already accessed, or O is in a COI class S has never accessed'],
              ['*-property (write)', 'S can write O only if S can read O and S has not read unsanitised data from a different company dataset'],
            ],
          },
        },
        'The write rule stops a consultant from passing data from Bank A into Oil X’s dataset, where another consultant who works for Bank B might read it.',
        { heading: 'Key features' },
        {
          list: [
            '**History-based** — the same request can be allowed or denied depending on past access.',
            '**Dynamic** — the “wall” forms when a subject first chooses a company in a COI class.',
            'Designed for **commercial** settings: consultancies, investment banks, audit firms.',
            '**Sanitised** (public) information is not restricted.',
          ],
        },
        { heading: 'Comparison with BLP and Biba' },
        'BLP and Biba use **fixed** levels; the Chinese Wall uses **access history** and focuses on **conflicts of interest**, combining confidentiality with commercial ethics.',
      ],
      example: {
        title: 'A consultant’s access over time',
        input: 'Consultant has not accessed any client data yet.',
        output: `Request Bank A → allowed (first access in Banks class)
Request Bank B → denied  (competitor of Bank A — wall)
Request Oil X  → allowed (different COI class)
Request Oil Y  → denied  (competitor of Oil X)
Request Bank A again → allowed (same dataset)`,
        explanation: 'Each first choice in a COI class builds a wall around that company’s competitors.',
      },
      keyPoints: [
        'Chinese Wall (Brewer–Nash) prevents conflicts of interest.',
        'Company datasets grouped into COI classes.',
        'Read allowed for same dataset or untouched COI class.',
        'Write restricted to prevent indirect leaks.',
        'Access depends on history; sanitised data is free.',
      ],
      importantTerms: [
        { term: 'Company dataset', meaning: 'All objects belonging to one company.' },
        { term: 'COI class', meaning: 'A group of datasets of competing companies.' },
        { term: 'Sanitised information', meaning: 'Data with sensitive details removed, safe to share.' },
        { term: 'History-based access control', meaning: 'Access decisions depending on what the subject accessed before.' },
      ],
      examPoints: [
        'Define the Chinese Wall model and its purpose.',
        'Draw **COI classes** with company datasets.',
        'State the **read and write rules**.',
        'Give an access-sequence example and compare with BLP/Biba.',
      ],
      questions: [
        {
          prompt: 'Explain the Chinese Wall security model with an example.',
          plan: ANSWER_PLAN(
            'History-based model preventing conflicts of interest',
            'COI classes with company datasets',
            'Simple security and *-property; dynamic walls; sanitised data',
            'Consultant’s sequence of access requests',
            'Commercial use; differs from fixed-level BLP/Biba',
          ),
        },
      ],
      keywords: ['Chinese Wall', 'Brewer-Nash', 'conflict of interest', 'COI class', 'company dataset', 'sanitised information', 'history-based'],
      remember: [
        { prompt: 'What does the Chinese Wall model prevent?', answer: 'Conflicts of interest.' },
        { prompt: 'After reading Bank A, can the consultant read Bank B?', answer: 'No — they are in the same COI class.' },
        { prompt: 'What makes Chinese Wall different from BLP?', answer: 'Access depends on history, not fixed levels.' },
      ],
    },
  },
}
