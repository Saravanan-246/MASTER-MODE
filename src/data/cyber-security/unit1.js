// Cyber Security — Unit I: Cyber Security and Cybercrime.
// Topic ids match the syllabus outline in ../subjects.js (24CSU5CB).
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
    'Unit I builds the vocabulary of the whole course: what cyber security protects, why it is needed, what counts as cybercrime and how it is classified, and how the threat–vulnerability–risk chain works. It ends with India’s legal and institutional framework (the IT Act 2000, CERT-In) and the global effort against cybercrime.',

  map: [
    { label: 'What and why', topics: ['cyber-security-overview', 'need-and-scope'] },
    { label: 'Cybercrime', topics: ['definition-and-origins-of-cybercrime', 'cybercrime-classifications'] },
    {
      label: 'Core concepts',
      topics: ['difference-between-information-security-and-cyber-security', 'common-threats-and-vulnerabilities'],
    },
    { label: 'Law and policy', topics: ['cyber-security-in-india', 'indian-it-act-2000', 'global-perspective-on-cybercrime'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'cyber-security-overview': {
      difficulty: 'easy',
      intro: 'Every later topic assumes you can define cyber security and explain the CIA triad.',
      definition:
        'Cyber security is the protection of computer systems, networks, programs and data in cyberspace from attack, damage, unauthorised access and disruption. Its core goals are **confidentiality, integrity and availability** (the **CIA triad**), achieved through **people, processes and technology**.',
      simpleExplanation: {
        text: 'Anything connected — your phone, a bank server, a hospital database — can be attacked. Cyber security keeps data **secret** from people who should not see it, **correct** so nobody can secretly change it, and **available** when the rightful user needs it.',
        analogy:
          'A bank locker: only the owner can open it (confidentiality), nobody can swap the contents (integrity), and the bank must open on working days (availability).',
      },
      visual: {
        type: 'hierarchy',
        title: 'The CIA triad and its supporting goals',
        root: 'Cyber security goals',
        children: [
          { label: 'Confidentiality', note: 'only authorised access', children: ['Encryption', 'Access control', 'Authentication'] },
          { label: 'Integrity', note: 'no unauthorised change', children: ['Hashing', 'Digital signatures', 'Audit logs'] },
          { label: 'Availability', note: 'usable when needed', children: ['Backups', 'Redundancy', 'DDoS protection'] },
          { label: 'Supporting goals', children: ['Authenticity', 'Non-repudiation', 'Accountability'] },
        ],
      },
      explanation: [
        { heading: 'Key terms' },
        {
          list: [
            '**Cyberspace** — the global network of computers, devices, networks and the data flowing between them.',
            '**Asset** — anything of value to protect: data, devices, software, reputation.',
            '**Attack** — a deliberate attempt to break one or more of the CIA goals.',
            '**Control (safeguard)** — a measure that reduces risk, e.g. a firewall, a policy or training.',
          ],
        },
        { heading: 'Three layers of defence' },
        {
          table: {
            columns: ['Layer', 'Examples'],
            rows: [
              ['People', 'Awareness training, background checks, clear responsibilities'],
              ['Process', 'Security policy, incident response plan, patch management'],
              ['Technology', 'Firewalls, antivirus, encryption, multi-factor authentication'],
            ],
          },
        },
        { heading: 'Main domains of cyber security' },
        {
          list: [
            '**Network security** — protecting networks from intrusion.',
            '**Application security** — building and running software without exploitable flaws.',
            '**Information/data security** — protecting data at rest and in transit.',
            '**Operational security** — processes for handling and protecting data assets.',
            '**Disaster recovery and business continuity** — restoring operations after an incident.',
            '**End-user education** — the human factor.',
          ],
        },
        { tip: '**Defence in depth**: use several independent layers, so that if one control fails another still protects the asset.' },
      ],
      example: {
        title: 'CIA in an online exam portal',
        input: 'A university runs its semester results on a web portal.',
        output: `Confidentiality : only the student can see their own marks (login + access control)
Integrity       : marks cannot be altered after publication (audit logs, hashing)
Availability    : the portal stays online on result day (backups, load balancing)`,
        explanation: 'Each goal needs different controls. A failure of any one is a security incident.',
      },
      keyPoints: [
        'Cyber security protects systems, networks and data in cyberspace.',
        'CIA triad: confidentiality, integrity, availability.',
        'Supporting goals: authenticity, non-repudiation, accountability.',
        'Security = people + process + technology.',
        'Defence in depth uses several layers of controls.',
      ],
      importantTerms: [
        { term: 'Confidentiality', meaning: 'Information is disclosed only to authorised parties.' },
        { term: 'Integrity', meaning: 'Information is not altered in an unauthorised way.' },
        { term: 'Availability', meaning: 'Systems and data are accessible to authorised users when needed.' },
        { term: 'Non-repudiation', meaning: 'A sender cannot later deny having performed an action.' },
      ],
      examPoints: [
        'Define cyber security in one or two lines.',
        'Draw and explain the **CIA triad** with one control for each goal.',
        'Mention people–process–technology and defence in depth.',
        'List the main domains of cyber security.',
      ],
      questions: [
        {
          prompt: 'What is cyber security? Explain the CIA triad.',
          plan: ANSWER_PLAN(
            'Protection of systems, networks and data in cyberspace',
            'CIA triangle with controls',
            'Each goal with meaning and controls; supporting goals',
            'Online results portal',
            'People, process, technology; defence in depth',
          ),
        },
      ],
      keywords: ['cyberspace', 'CIA triad', 'confidentiality', 'integrity', 'availability', 'non-repudiation', 'defence in depth'],
      remember: [
        { prompt: 'Expand CIA in security.', answer: 'Confidentiality, Integrity, Availability.' },
        { prompt: 'Which goal does a DDoS attack break?', answer: 'Availability.' },
        { prompt: 'Three elements of security?', answer: 'People, process and technology.' },
      ],
    },

    // ------------------------------------------------------------------
    'need-and-scope': {
      difficulty: 'easy',
      intro: 'Why should an organisation spend money on security? This topic gives the reasons and the reach of the field.',
      definition:
        'The **need** for cyber security comes from society’s dependence on digital systems, the growing number of connected devices, the value of data and the legal duty to protect it. Its **scope** covers individuals, businesses, government and critical infrastructure, across networks, applications, cloud, mobile and IoT.',
      simpleExplanation: {
        text: 'Banking, shopping, health records, power grids and elections now depend on computers. The more we depend on them, the more damage an attack can do — so protection is no longer optional.',
        analogy: 'When a town grows, it needs more police and fire stations. As our digital life grows, so does the need for cyber security.',
      },
      visual: {
        type: 'network',
        title: 'Scope of cyber security',
        center: { label: 'Cyber security' },
        nodes: [
          { label: 'Individuals', note: 'privacy, online banking' },
          { label: 'Businesses', note: 'data, operations' },
          { label: 'Government', note: 'e-governance, defence' },
          { label: 'Critical infrastructure', note: 'power, telecom, finance' },
          { label: 'Cloud and mobile', note: 'remote data and apps' },
          { label: 'IoT', note: 'smart devices' },
        ],
      },
      explanation: [
        { heading: 'Why cyber security is needed' },
        {
          list: [
            '**Digital dependence** — payments, e-governance and communication run online.',
            '**Value of data** — personal and business data can be sold or misused.',
            '**Growing attack surface** — more devices, cloud services and remote work.',
            '**Organised cybercrime** — attacks are run as profitable businesses.',
            '**Legal and regulatory duty** — laws require organisations to protect data and report incidents.',
            '**Business continuity and trust** — downtime and breaches damage reputation and revenue.',
            '**National security** — attacks on critical infrastructure affect the whole country.',
          ],
        },
        { heading: 'Scope — who and what is covered' },
        {
          table: {
            columns: ['Area', 'What it protects'],
            rows: [
              ['Network security', 'Routers, firewalls, data in transit'],
              ['Application security', 'Websites, mobile apps, software'],
              ['Cloud security', 'Data and workloads in cloud services'],
              ['Endpoint security', 'Laptops, phones, servers'],
              ['Critical infrastructure', 'Power, banking, telecom, transport'],
              ['Identity and access', 'User accounts and privileges'],
            ],
          },
        },
        { note: 'Scope also includes careers: security analyst, penetration tester (authorised), forensic investigator, auditor, security architect and policy specialist.' },
      ],
      example: {
        title: 'Why a small shop needs security',
        input: 'A local store accepts UPI payments and keeps a customer list on a laptop.',
        output: `Risk 1: laptop stolen → customer data exposed
Risk 2: fake payment screenshot → financial loss
Risk 3: ransomware → billing stops for days
Need: backups, device password, payment verification, awareness`,
        explanation: 'Even a small business has data, money and operations that depend on digital systems.',
      },
      keyPoints: [
        'Need arises from digital dependence and the value of data.',
        'Attack surface grows with cloud, mobile and IoT.',
        'Laws impose a duty to protect data.',
        'Scope: individuals, businesses, government, critical infrastructure.',
        'Domains: network, application, cloud, endpoint, identity.',
      ],
      importantTerms: [
        { term: 'Attack surface', meaning: 'All the points where an attacker could try to enter or extract data.' },
        { term: 'Critical infrastructure', meaning: 'Systems whose failure would seriously affect national security, economy or public safety.' },
        { term: 'Business continuity', meaning: 'Keeping essential operations running during and after an incident.' },
      ],
      examPoints: [
        'List at least **five reasons** for the need of cyber security.',
        'Explain scope area-wise with a table or hub diagram.',
        'Include a short practical example.',
      ],
      questions: [
        {
          prompt: 'Explain the need and scope of cyber security.',
          plan: ANSWER_PLAN(
            'Protection is required because society depends on digital systems',
            'Hub diagram of scope areas',
            'Reasons for need; areas within scope',
            'Small shop using UPI and a laptop',
            'Attack surface, legal duty, national security',
          ),
        },
      ],
      keywords: ['digital dependence', 'attack surface', 'critical infrastructure', 'business continuity', 'cloud security', 'endpoint security'],
      remember: [
        { prompt: 'What is the attack surface?', answer: 'All the points where a system can be attacked.' },
        { prompt: 'Name three areas in the scope of cyber security.', answer: 'Network, application and cloud security (also endpoint, identity, critical infrastructure).' },
        { prompt: 'Why is IoT a security concern?', answer: 'It adds many weakly protected devices to the attack surface.' },
      ],
    },

    // ------------------------------------------------------------------
    'definition-and-origins-of-cybercrime': {
      difficulty: 'easy',
      intro: 'Before classifying cybercrime you must define it — and know how it evolved from phone tricks to global ransomware.',
      definition:
        '**Cybercrime** is any illegal activity in which a computer, network or digital device is the **target** of the crime, the **tool** used to commit it, or is **incidental** to it (stores evidence). There is no single universal legal definition; India’s IT Act 2000 lists specific offences rather than defining the word “cybercrime”.',
      simpleExplanation: {
        text: 'If a crime involves a computer as the victim (hacking a server), as the weapon (sending a fraud email), or as the evidence store (a drug dealer’s phone with records), it is usually called cybercrime.',
        analogy: 'A car can be stolen (target), used for a robbery (tool), or found with evidence in it (incidental). Computers play the same three roles.',
      },
      visual: {
        type: 'timeline',
        title: 'Origins and evolution of cybercrime',
        events: [
          { label: '1960s–70s', detail: 'Phone phreaking — manipulating telephone networks for free calls' },
          { label: '1980s', detail: 'Early hackers; first computer crime laws such as the US CFAA (1986)' },
          { label: '1988', detail: 'Morris worm spreads across the early internet' },
          { label: '2000', detail: 'ILOVEYOU email worm; India passes the IT Act 2000' },
          { label: '2000s', detail: 'Phishing, identity theft and botnets for profit' },
          { label: '2010', detail: 'Stuxnet — malware targeting industrial control systems' },
          { label: '2017', detail: 'WannaCry ransomware affects organisations worldwide' },
          { label: 'Today', detail: 'Ransomware-as-a-service, data extortion, AI-assisted scams' },
        ],
      },
      explanation: [
        { heading: 'Computer crime vs cybercrime' },
        '**Computer crime** traditionally meant crimes against or using a single computer. **Cybercrime** emphasises crimes committed through networks and the internet. Today the terms are often used interchangeably.',
        { heading: 'Three roles of the computer' },
        {
          table: {
            columns: ['Role', 'Meaning', 'Example'],
            rows: [
              ['Target', 'The computer or data is attacked', 'Hacking, malware, DoS'],
              ['Instrument / tool', 'The computer is used to commit a crime', 'Online fraud, phishing, cyberstalking'],
              ['Incidental', 'The computer holds evidence of a crime', 'Records of drug sales on a laptop'],
            ],
          },
        },
        { heading: 'How cybercrime evolved' },
        {
          list: [
            '**Curiosity and challenge** — early hackers and phreakers explored systems.',
            '**Disruption** — worms and viruses spread for notoriety.',
            '**Profit** — fraud, identity theft, ransomware and data sale.',
            '**Strategic** — state-linked espionage and attacks on infrastructure.',
          ],
          ordered: true,
        },
        { note: 'Features that make cybercrime distinct: anonymity, speed, low cost, scale and crossing national borders easily.' },
      ],
      example: {
        title: 'Classify the role of the computer',
        input: 'Case: a gang sends fake bank SMS messages to steal OTPs, then empties accounts.',
        output: `Phones and computers used to send messages → instrument / tool
Bank accounts accessed without authority → target (bank's systems)
Gang's phones store victim lists → incidental (evidence)`,
        explanation: 'One incident can involve all three roles. Investigators must look at each.',
      },
      keyPoints: [
        'Cybercrime: computer as target, tool or incidental.',
        'No single universal definition; laws list specific offences.',
        'Origins: phreaking → hacking → worms → profit-driven crime.',
        'Key features: anonymity, scale, speed, cross-border.',
      ],
      importantTerms: [
        { term: 'Cybercrime', meaning: 'Crime involving computers or networks as target, tool or evidence.' },
        { term: 'Phreaking', meaning: 'Manipulating telephone systems, an early form of hacking.' },
        { term: 'Worm', meaning: 'Self-replicating malware that spreads across networks without user action.' },
      ],
      examPoints: [
        'Define cybercrime with the **target / tool / incidental** roles.',
        'Draw a short **timeline** of its origins.',
        'Mention distinctive features of cybercrime.',
      ],
      questions: [
        {
          prompt: 'Define cybercrime. Trace its origins and evolution.',
          plan: ANSWER_PLAN(
            'Crime where a computer is the target, tool or incidental',
            'Timeline from phreaking to ransomware',
            'Three roles; phases of evolution; features',
            'OTP fraud gang example',
            'Anonymity, scale, cross-border nature',
          ),
        },
      ],
      keywords: ['cybercrime', 'computer crime', 'target', 'instrument', 'incidental', 'phreaking', 'Morris worm', 'evolution'],
      remember: [
        { prompt: 'Three roles a computer can play in cybercrime?', answer: 'Target, tool (instrument), incidental.' },
        { prompt: 'Does the IT Act 2000 define “cybercrime”?', answer: 'No — it lists specific offences instead.' },
        { prompt: 'What drives most modern cybercrime?', answer: 'Financial profit.' },
      ],
    },

    // ------------------------------------------------------------------
    'difference-between-information-security-and-cyber-security': {
      difficulty: 'medium',
      intro: 'A favourite comparison question. The two overlap heavily, so be precise about the difference.',
      definition:
        '**Information security** protects **information in all forms** — paper, spoken and digital — from unauthorised access, use, disclosure, modification or destruction, using the CIA triad. **Cyber security** protects **systems, networks and digital data in cyberspace** from cyber attacks. Cyber security is largely the digital, network-facing part of information security.',
      simpleExplanation: {
        text: 'A printed salary register locked in a cupboard is an information security concern, but not really a cyber security one. A hacked web server is both. Information security is the **wider** idea; cyber security focuses on the **digital and connected** world.',
        analogy: 'Information security is like guarding all the valuables in a house; cyber security is guarding the doors and windows that face the internet street.',
      },
      visual: {
        type: 'comparison',
        title: 'Information security vs cyber security',
        table: {
          columns: ['Basis', 'Information security', 'Cyber security'],
          rows: [
            ['Protects', 'Information in any form', 'Systems, networks and digital data'],
            ['Medium', 'Physical and digital', 'Digital / cyberspace only'],
            ['Main concern', 'CIA of information', 'Attacks through cyberspace'],
            ['Typical threats', 'Theft of files, insider leaks, lost documents', 'Malware, hacking, phishing, DDoS'],
            ['Typical controls', 'Locked cabinets, classification, policies, encryption', 'Firewalls, IDS, patching, endpoint protection'],
            ['Standard examples', 'ISO/IEC 27001', 'NIST Cybersecurity Framework'],
            ['Relationship', 'Broader field', 'Overlaps; mostly a subset'],
          ],
        },
      },
      explanation: [
        { heading: 'Where they overlap' },
        'Both use the **CIA triad**, risk assessment and security policies. Digital data stored on networked systems falls under **both**.',
        { heading: 'Related terms' },
        {
          list: [
            '**Network security** — a part of cyber security that protects network infrastructure and traffic.',
            '**IT security** — protection of an organisation’s IT systems.',
            '**Data security** — protection of data itself, wherever it is stored.',
          ],
        },
        { trap: 'Do not write that the two are completely separate. Say they **overlap**, with information security being broader and cyber security focused on cyberspace.' },
      ],
      example: {
        title: 'Which one applies?',
        input: 'Three incidents in a hospital.',
        output: `Patient files left on a reception desk      → information security
Ransomware encrypts the hospital server      → cyber security (and information security)
Attacker floods the appointment website      → cyber security`,
        explanation: 'Only incidents involving cyberspace fall under cyber security; all three affect information security in some way.',
      },
      keyPoints: [
        'Information security: all forms of information.',
        'Cyber security: digital systems and data in cyberspace.',
        'Both use the CIA triad.',
        'They overlap; information security is broader.',
      ],
      importantTerms: [
        { term: 'Information security', meaning: 'Protecting information in any form from unauthorised access, change or loss.' },
        { term: 'Cyber security', meaning: 'Protecting networked systems and digital data from cyber attacks.' },
        { term: 'Network security', meaning: 'Protecting the network infrastructure and data in transit.' },
      ],
      examPoints: [
        'Give **both definitions** first.',
        'Draw a comparison table with at least six points.',
        'State the relationship: overlapping, information security is broader.',
        'Give one example for each.',
      ],
      questions: [
        {
          prompt: 'Differentiate between information security and cyber security.',
          plan: ANSWER_PLAN(
            'Definitions of both',
            'Comparison table or overlapping circles',
            'Scope, medium, threats, controls, standards',
            'Hospital paper files vs ransomware',
            'Overlap; information security is broader',
          ),
        },
      ],
      keywords: ['information security', 'cyber security', 'CIA triad', 'cyberspace', 'overlap', 'ISO/IEC 27001', 'NIST CSF'],
      remember: [
        { prompt: 'Which is broader — information security or cyber security?', answer: 'Information security.' },
        { prompt: 'Is a stolen paper file a cyber security incident?', answer: 'No — it is an information security incident.' },
        { prompt: 'What do both share?', answer: 'The CIA triad and risk-based protection.' },
      ],
    },

    // ------------------------------------------------------------------
    'common-threats-and-vulnerabilities': {
      difficulty: 'medium',
      intro: 'Threat, vulnerability and risk are the three words you will use in every unit. Never mix them up.',
      definition:
        'A **threat** is any potential cause of an unwanted incident that may harm a system (e.g. a hacker, malware, a flood). A **vulnerability** is a weakness that a threat can exploit (e.g. an unpatched server, a weak password). **Risk** is the potential for loss when a threat exploits a vulnerability — commonly expressed as **Risk = Likelihood × Impact**.',
      simpleExplanation: {
        text: 'A thief is a threat. An unlocked door is a vulnerability. The chance that the thief walks in and steals something, and how bad that would be, is the risk. Remove the vulnerability (lock the door) and the risk drops even though the threat still exists.',
        analogy: 'Rain is a threat, a hole in the roof is a vulnerability, and the risk is your books getting soaked.',
      },
      visual: {
        type: 'flow',
        title: 'Threat → vulnerability → risk',
        steps: [
          { label: 'Threat', note: 'attacker, malware, disaster' },
          { label: 'Exploits', note: 'takes advantage' },
          { label: 'Vulnerability', note: 'weakness in system' },
          { label: 'Impact on asset', note: 'loss of C, I or A' },
          { label: 'Risk', note: 'likelihood × impact' },
        ],
      },
      explanation: [
        { heading: 'Common threats' },
        {
          table: {
            columns: ['Threat', 'What it does'],
            rows: [
              ['Malware', 'Malicious software: viruses, worms, trojans, ransomware, spyware'],
              ['Phishing / social engineering', 'Tricks people into revealing data or clicking malicious links'],
              ['Denial of service', 'Overloads a service so legitimate users cannot use it'],
              ['Insider threat', 'Employees or contractors misuse their access'],
              ['Man-in-the-middle', 'Intercepts communication between two parties'],
              ['Password attacks', 'Guessing or reusing leaked passwords'],
              ['Natural / accidental', 'Fire, flood, power failure, human error'],
            ],
          },
        },
        { heading: 'Common vulnerabilities' },
        {
          list: [
            '**Unpatched software** — known flaws left unfixed.',
            '**Weak or reused passwords** and no multi-factor authentication.',
            '**Misconfiguration** — default settings, open cloud storage, unnecessary open ports.',
            '**Insecure code** — poor input validation leading to injection attacks.',
            '**Lack of awareness** — users who cannot recognise phishing.',
            '**Physical weaknesses** — unlocked server rooms, unencrypted laptops.',
          ],
        },
        { heading: 'Threat agents' },
        'Cybercriminals (profit), hacktivists (ideology), nation-state groups (espionage), insiders (grievance or carelessness), script kiddies (curiosity) and competitors (espionage).',
        { trap: 'A **zero-day** vulnerability is one unknown to the vendor, so no patch exists yet — it is a vulnerability, not a threat.' },
      ],
      example: {
        title: 'Identify threat, vulnerability and risk',
        input: 'A college web server runs an old CMS version with a known flaw. Attackers scan the internet for that version.',
        output: `Threat        : attackers scanning for the flaw
Vulnerability : outdated CMS, patch not applied
Risk          : high likelihood × high impact (defacement, data leak)
Control       : apply the patch, add a web application firewall`,
        explanation: 'Patching removes the vulnerability, which lowers the risk even though the threat remains.',
      },
      keyPoints: [
        'Threat = potential cause of harm.',
        'Vulnerability = weakness that can be exploited.',
        'Risk = likelihood × impact of a threat exploiting a vulnerability.',
        'Common threats: malware, phishing, DoS, insiders, MITM.',
        'Common vulnerabilities: unpatched software, weak passwords, misconfiguration.',
      ],
      importantTerms: [
        { term: 'Threat', meaning: 'A potential cause of an unwanted incident.' },
        { term: 'Vulnerability', meaning: 'A weakness that can be exploited by a threat.' },
        { term: 'Exploit', meaning: 'A method or tool that takes advantage of a vulnerability.' },
        { term: 'Zero-day', meaning: 'A vulnerability unknown to the vendor, with no patch available.' },
      ],
      examPoints: [
        'Define **threat, vulnerability and risk** separately and show how they relate.',
        'Draw the threat → vulnerability → risk flow.',
        'List common threats and common vulnerabilities with examples.',
        'Name types of threat agents.',
      ],
      questions: [
        {
          prompt: 'Explain common threats and vulnerabilities. Distinguish threat, vulnerability and risk.',
          plan: ANSWER_PLAN(
            'Threat, vulnerability and risk defined',
            'Threat → exploits → vulnerability → risk',
            'Tables of common threats and vulnerabilities; threat agents',
            'Outdated college CMS',
            'Risk = likelihood × impact; controls reduce risk',
          ),
        },
      ],
      keywords: ['threat', 'vulnerability', 'risk', 'exploit', 'zero-day', 'threat agent', 'misconfiguration', 'insider threat'],
      remember: [
        { prompt: 'An unpatched server is a threat or a vulnerability?', answer: 'A vulnerability.' },
        { prompt: 'Formula for risk?', answer: 'Risk = Likelihood × Impact.' },
        { prompt: 'What is a zero-day?', answer: 'A flaw unknown to the vendor with no patch yet.' },
      ],
    },

    // ------------------------------------------------------------------
    'cybercrime-classifications': {
      difficulty: 'medium',
      intro: 'Classification questions are common. Learn the “by victim” scheme with examples for each class.',
      definition:
        'Cybercrimes are commonly classified by **who or what is the victim**: crimes against **individuals**, against **property**, against **organisations** (including government) and against **society**. They can also be classified by the **role of the computer** — as target or as instrument.',
      simpleExplanation: {
        text: 'Ask “who suffers?”. A stalked person (individual), a pirated film (property), a hacked company (organisation) or a fake-news campaign that causes panic (society). Each group has its own typical crimes.',
        analogy: 'Like sorting crimes in a police station: crimes against people, against property and against the state — the same idea applied online.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Classification of cybercrime by victim',
        root: 'Cybercrime',
        children: [
          { label: 'Against individuals', children: ['Cyberstalking', 'Cyberbullying', 'Email spoofing', 'Identity theft', 'Online harassment'] },
          { label: 'Against property', children: ['Credit card fraud', 'IP theft', 'Software piracy', 'Cybersquatting', 'Malware damage'] },
          { label: 'Against organisations', children: ['Unauthorised access', 'Data theft', 'DoS attacks', 'Ransomware', 'Cyber terrorism'] },
          { label: 'Against society', children: ['Online gambling fraud', 'Forgery', 'Spread of illegal content', 'Web jacking', 'Disinformation campaigns'] },
        ],
      },
      explanation: [
        { heading: 'By victim' },
        {
          list: [
            '**Against individuals** — target a person’s privacy, safety, reputation or money.',
            '**Against property** — target digital or financial property: money, data, intellectual property, domain names.',
            '**Against organisations / government** — target business or government systems for money, espionage or disruption.',
            '**Against society** — harm the public at large or public order.',
          ],
        },
        { heading: 'By role of the computer' },
        {
          table: {
            columns: ['Class', 'Examples'],
            rows: [
              ['Computer as target', 'Hacking, malware infection, DoS, data destruction'],
              ['Computer as instrument', 'Phishing, online fraud, cyberstalking, child sexual abuse material'],
            ],
          },
        },
        { heading: 'Other ways to classify' },
        {
          list: [
            'By **motive** — financial, political (hacktivism), espionage, revenge, thrill.',
            'By **offender** — insiders, organised groups, state-sponsored groups, individuals.',
          ],
        },
        { tip: 'When classifying, write the class heading, a one-line meaning and two or three examples for each.' },
      ],
      example: {
        title: 'Classify each case',
        input: 'Four incidents reported to a cyber cell.',
        output: `Ex-friend posts threatening messages daily      → against individual (cyberstalking)
Someone registers a famous brand's domain to resell → against property (cybersquatting)
Hospital systems locked by ransomware             → against organisation
Mass fake messages cause panic during a crisis    → against society`,
        explanation: 'Identify the main victim, then name the specific crime.',
      },
      keyPoints: [
        'Four victim classes: individual, property, organisation, society.',
        'Role-based: computer as target or as instrument.',
        'Also by motive and by type of offender.',
        'Always give examples for each class.',
      ],
      importantTerms: [
        { term: 'Cyberstalking', meaning: 'Repeated online harassment or monitoring of a person.' },
        { term: 'Cybersquatting', meaning: 'Registering a domain name similar to a brand in bad faith.' },
        { term: 'Web jacking', meaning: 'Taking control of a website by fraud and misusing it.' },
        { term: 'Hacktivism', meaning: 'Hacking for political or social causes.' },
      ],
      examPoints: [
        'Draw the **classification tree** by victim.',
        'Explain each class with **examples**.',
        'Add role-based and motive-based classifications briefly.',
      ],
      questions: [
        {
          prompt: 'Classify cybercrimes with suitable examples.',
          plan: ANSWER_PLAN(
            'Cybercrimes grouped by victim, role of computer and motive',
            'Classification tree',
            'Against individuals, property, organisations, society',
            'Four cyber cell cases',
            'Role-based and motive-based schemes',
          ),
        },
      ],
      keywords: ['classification', 'against individuals', 'against property', 'against organisations', 'against society', 'cyberstalking', 'cybersquatting', 'hacktivism'],
      remember: [
        { prompt: 'Four victim-based classes of cybercrime?', answer: 'Individuals, property, organisations, society.' },
        { prompt: 'Software piracy falls under which class?', answer: 'Against property.' },
        { prompt: 'Cyberstalking falls under which class?', answer: 'Against individuals.' },
      ],
    },

    // ------------------------------------------------------------------
    'cyber-security-in-india': {
      difficulty: 'medium',
      intro: 'Know the Indian agencies, policies and reporting channels — they appear in both theory and case-based questions.',
      definition:
        'Cyber security in India is managed through laws (the **IT Act 2000** and the **Digital Personal Data Protection Act 2023**), policies (the **National Cyber Security Policy 2013**) and institutions such as **CERT-In**, **NCIIPC** and the **Indian Cyber Crime Coordination Centre (I4C)**.',
      simpleExplanation: {
        text: 'India has a law to define cyber offences, a national team that responds to incidents (CERT-In), an agency that protects critical systems like power and banking (NCIIPC), and a portal and helpline where citizens report cybercrime.',
        analogy: 'Like a city’s safety system: laws (rules), a fire brigade (CERT-In), guards for key buildings (NCIIPC) and a police complaint desk (cybercrime portal).',
      },
      visual: {
        type: 'architecture',
        title: 'India’s cyber security framework',
        layers: [
          { label: 'Law and policy', items: ['IT Act 2000 and 2008 amendment', 'DPDP Act 2023', 'National Cyber Security Policy 2013'] },
          { label: 'National agencies', items: ['CERT-In — incident response', 'NCIIPC — critical infrastructure', 'I4C — cybercrime coordination'] },
          { label: 'Law enforcement', items: ['State cyber cells', 'Cyber police stations'] },
          { label: 'Citizens and organisations', items: ['cybercrime.gov.in portal', 'Helpline 1930', 'Awareness programmes'] },
        ],
      },
      explanation: [
        { heading: 'Key institutions' },
        {
          table: {
            columns: ['Body', 'Role'],
            rows: [
              ['CERT-In', 'National nodal agency for responding to cyber security incidents (Section 70B, IT Act); issues advisories'],
              ['NCIIPC', 'Protects Critical Information Infrastructure (Section 70A, IT Act)'],
              ['I4C', 'Under the Ministry of Home Affairs; coordinates action against cybercrime'],
              ['MeitY', 'Ministry responsible for IT policy and the IT Act'],
              ['Cyber Swachhta Kendra', 'Botnet cleaning and malware analysis centre run by CERT-In'],
            ],
          },
        },
        { heading: 'National Cyber Security Policy 2013 — main aims' },
        {
          list: [
            'Create a secure cyber ecosystem and build trust in IT systems.',
            'Protect critical information infrastructure.',
            'Develop skilled cyber security workforce.',
            'Strengthen regulatory framework and incident response.',
            'Promote research, indigenous technology and public–private partnership.',
          ],
        },
        { heading: 'Reporting and response' },
        {
          list: [
            'Citizens report cybercrime at **cybercrime.gov.in** or call the helpline **1930** (especially for financial fraud).',
            'Organisations must report specified incidents to **CERT-In** — its 2022 directions require reporting within **6 hours** of noticing them.',
          ],
        },
        { heading: 'Challenges' },
        'Low awareness among new internet users, shortage of trained professionals, rapid growth of digital payments, cross-border offenders and under-reporting.',
      ],
      example: {
        title: 'What should a fraud victim do?',
        input: 'A person loses money through a fake UPI collect request.',
        output: `1. Call 1930 immediately so the transaction can be flagged
2. File a complaint on cybercrime.gov.in with screenshots
3. Inform the bank and block the affected account/card
4. Keep all evidence: SMS, call logs, transaction IDs`,
        explanation: 'Fast reporting improves the chance of freezing the money before it is moved further.',
      },
      keyPoints: [
        'Laws: IT Act 2000 (amended 2008), DPDP Act 2023.',
        'Policy: National Cyber Security Policy 2013.',
        'CERT-In handles incident response (Sec 70B).',
        'NCIIPC protects critical information infrastructure (Sec 70A).',
        'Citizens report via cybercrime.gov.in and helpline 1930.',
      ],
      importantTerms: [
        { term: 'CERT-In', meaning: 'Indian Computer Emergency Response Team — national incident response agency.' },
        { term: 'NCIIPC', meaning: 'National Critical Information Infrastructure Protection Centre.' },
        { term: 'I4C', meaning: 'Indian Cyber Crime Coordination Centre under the MHA.' },
        { term: 'Critical Information Infrastructure', meaning: 'Computer resources whose incapacitation would seriously affect national security, economy or public health.' },
      ],
      examPoints: [
        'Draw the **framework**: laws → agencies → law enforcement → citizens.',
        'Explain the role of **CERT-In, NCIIPC and I4C**.',
        'List objectives of the **National Cyber Security Policy 2013**.',
        'Mention reporting channels and challenges.',
      ],
      questions: [
        {
          prompt: 'Discuss the cyber security framework in India.',
          plan: ANSWER_PLAN(
            'Laws, policies and institutions that protect India’s cyberspace',
            'Layered framework diagram',
            'IT Act, DPDP Act, NCSP 2013; CERT-In, NCIIPC, I4C',
            'UPI fraud reporting steps',
            'Challenges and reporting channels',
          ),
        },
      ],
      keywords: ['CERT-In', 'NCIIPC', 'I4C', 'National Cyber Security Policy 2013', 'DPDP Act 2023', 'cybercrime.gov.in', '1930'],
      remember: [
        { prompt: 'Which agency is India’s national incident response team?', answer: 'CERT-In.' },
        { prompt: 'Which IT Act section relates to NCIIPC?', answer: 'Section 70A.' },
        { prompt: 'National cybercrime helpline number?', answer: '1930.' },
      ],
    },

    // ------------------------------------------------------------------
    'indian-it-act-2000': {
      difficulty: 'hard',
      intro: 'The most important law in the syllabus. Know its objectives and the key offence sections with examples.',
      definition:
        'The **Information Technology Act, 2000** is India’s primary law for electronic commerce and cybercrime. It gives **legal recognition to electronic records and digital signatures**, supports e-governance, and defines **cyber contraventions and offences** with penalties. It was significantly amended by the **IT (Amendment) Act, 2008**.',
      simpleExplanation: {
        text: 'Before 2000, Indian law did not clearly accept emails or digital signatures as legal documents, and hacking was not clearly a crime. The IT Act fixed both: it made electronic documents legally valid and listed cyber offences such as hacking, identity theft and cyber terrorism.',
        analogy: 'The IT Act is the “rule book” of Indian cyberspace — it says what counts as a valid digital signature and what counts as a cyber offence.',
      },
      visual: {
        type: 'comparison',
        title: 'Key sections of the IT Act (as amended)',
        table: {
          columns: ['Section', 'Covers'],
          rows: [
            ['43', 'Compensation for damage to a computer system without permission — unauthorised access, introducing viruses, disrupting service'],
            ['43A', 'Compensation when a body corporate fails to protect sensitive personal data'],
            ['65', 'Tampering with computer source documents'],
            ['66', 'Computer-related offences — Section 43 acts done dishonestly or fraudulently'],
            ['66C', 'Identity theft — fraudulent use of password, electronic signature or other unique ID'],
            ['66D', 'Cheating by personation using a computer resource'],
            ['66E', 'Violation of privacy — capturing or publishing private images'],
            ['66F', 'Cyber terrorism'],
            ['67, 67A, 67B', 'Publishing obscene, sexually explicit and child sexual abuse material'],
            ['69, 69A', 'Government powers to intercept/decrypt, and to block public access'],
            ['70B', 'CERT-In as the national incident response agency'],
            ['72', 'Breach of confidentiality and privacy'],
            ['79', 'Exemption for intermediaries that follow due diligence'],
          ],
        },
      },
      explanation: [
        { heading: 'Objectives' },
        {
          list: [
            'Grant legal recognition to **electronic records** and **digital/electronic signatures**.',
            'Facilitate **e-commerce** and electronic filing with government (**e-governance**).',
            'Regulate **Certifying Authorities** through the Controller of Certifying Authorities (CCA).',
            'Define **cyber contraventions and offences** and their penalties.',
          ],
        },
        { heading: 'Background' },
        'The Act came into force on **17 October 2000** and is based on the **UNCITRAL Model Law on Electronic Commerce**. The original Act had **13 chapters and 94 sections**.',
        { heading: 'IT (Amendment) Act 2008 — main changes' },
        {
          list: [
            'Introduced the technology-neutral term **electronic signature**.',
            'Added offences such as **66C (identity theft), 66D, 66E, 66F (cyber terrorism)** and **67A/67B**.',
            'Added **Section 43A** on protecting sensitive personal data.',
            'Gave statutory roles to **CERT-In (70B)** and **NCIIPC (70A)**.',
          ],
        },
        { heading: 'Selected punishments' },
        {
          table: {
            columns: ['Section', 'Punishment (maximum)'],
            rows: [
              ['65', 'Up to 3 years, or fine up to ₹2 lakh, or both'],
              ['66', 'Up to 3 years, or fine up to ₹5 lakh, or both'],
              ['66C / 66D', 'Up to 3 years and fine up to ₹1 lakh'],
              ['66F', 'Up to imprisonment for life'],
            ],
          },
        },
        { note: '**Section 66A** (offensive messages) was struck down by the Supreme Court in **Shreya Singhal v. Union of India (2015)** as unconstitutional.' },
        { tip: '**Section 43** is civil (compensation); **Section 66** makes the same acts criminal when done dishonestly or fraudulently.' },
        'The Act also applies to offences committed **outside India** if they involve a computer system located in India (Section 75).',
      ],
      example: {
        title: 'Apply the right section',
        input: 'Three cases reported to a cyber police station.',
        output: `Someone logs in with a colleague's stolen password → Section 66C (identity theft)
A fake “bank officer” profile cheats a customer      → Section 66D (cheating by personation)
Company ignores basic security and leaks customer data → Section 43A (compensation)`,
        explanation: 'Match the act to the section by asking: is it identity misuse, impersonation, privacy, damage, or failure to protect data?',
      },
      keyPoints: [
        'IT Act 2000: legal recognition of e-records and digital signatures + cyber offences.',
        'In force from 17 October 2000; based on UNCITRAL Model Law.',
        'Amended in 2008: electronic signature, 43A, 66C–66F, 67A/67B.',
        '43 = civil compensation; 66 = criminal offence.',
        '66A struck down in Shreya Singhal (2015).',
      ],
      importantTerms: [
        { term: 'Electronic record', meaning: 'Data or record stored, received or sent in electronic form.' },
        { term: 'Digital signature', meaning: 'Authentication of an electronic record using asymmetric cryptography and a hash function.' },
        { term: 'Certifying Authority', meaning: 'An entity licensed to issue digital signature certificates.' },
        { term: 'Intermediary', meaning: 'An entity that stores or transmits records for others, e.g. ISPs and platforms.' },
      ],
      examPoints: [
        'State **objectives** and background of the Act.',
        'Explain the **2008 amendment** changes.',
        'Write a **table of key sections** with examples.',
        'Mention Section 66A being struck down.',
      ],
      questions: [
        {
          prompt: 'Explain the salient features of the Information Technology Act, 2000.',
          plan: ANSWER_PLAN(
            'India’s law for e-commerce, e-governance and cyber offences',
            'Table of key sections',
            'Objectives; 2008 amendment; offences and penalties',
            'Stolen password case under 66C',
            'Section 43 vs 66; 66A struck down; Section 75 extra-territorial reach',
          ),
        },
      ],
      keywords: ['IT Act 2000', 'electronic record', 'digital signature', 'Section 43', 'Section 66', '66C', '66D', '66F', 'CERT-In', 'IT Amendment Act 2008'],
      remember: [
        { prompt: 'Which section covers identity theft?', answer: 'Section 66C.' },
        { prompt: 'Which section covers cyber terrorism?', answer: 'Section 66F.' },
        { prompt: 'Which case struck down Section 66A?', answer: 'Shreya Singhal v. Union of India (2015).' },
      ],
    },

    // ------------------------------------------------------------------
    'global-perspective-on-cybercrime': {
      difficulty: 'medium',
      intro: 'Cybercrime ignores borders. This topic explains why fighting it needs international cooperation.',
      definition:
        'The global perspective on cybercrime views it as a **transnational** problem: offenders, servers and victims are often in different countries. Responses include international treaties such as the **Budapest Convention on Cybercrime (2001)**, cooperation through **INTERPOL** and **Europol**, and national laws such as the **EU GDPR** and the **US Computer Fraud and Abuse Act**.',
      simpleExplanation: {
        text: 'A scammer in one country can use a server in a second country to cheat a victim in a third. Which country’s police investigate? Whose law applies? Global cooperation tries to answer these questions.',
        analogy: 'Like catching a smuggler who crosses three borders in one night — no single police force can do it alone.',
      },
      visual: {
        type: 'network',
        title: 'International response to cybercrime',
        center: { label: 'Global cooperation' },
        nodes: [
          { label: 'Budapest Convention', note: 'treaty, 2001' },
          { label: 'UN', note: 'cybercrime convention process' },
          { label: 'INTERPOL', note: 'police cooperation' },
          { label: 'Europol EC3', note: 'European Cybercrime Centre' },
          { label: 'MLATs', note: 'evidence sharing' },
          { label: 'National laws', note: 'GDPR, CFAA, IT Act' },
        ],
      },
      explanation: [
        { heading: 'Why cybercrime is a global problem' },
        {
          list: [
            '**Jurisdiction** — the crime may happen across several countries at once.',
            '**Attribution** — attackers hide behind proxies, VPNs and compromised machines.',
            '**Different laws** — an act may be illegal in one country and not in another.',
            '**Slow evidence sharing** — formal requests take time while digital evidence disappears.',
            '**Safe havens** — some countries do not extradite or act against offenders.',
          ],
        },
        { heading: 'Key international instruments' },
        {
          table: {
            columns: ['Instrument', 'Purpose'],
            rows: [
              ['Budapest Convention (Council of Europe, 2001)', 'First international treaty on cybercrime: harmonise offences, procedures and cooperation. India has not signed it.'],
              ['UN Convention against Cybercrime', 'Adopted by the UN General Assembly in 2024 to provide a global framework'],
              ['Mutual Legal Assistance Treaties', 'Formal agreements for sharing evidence between countries'],
              ['GDPR (EU, 2018)', 'Data protection law with heavy penalties for breaches'],
              ['CFAA (USA, 1986)', 'US federal law against unauthorised computer access'],
            ],
          },
        },
        { heading: 'International organisations' },
        '**INTERPOL** supports police cooperation among member countries; **Europol’s European Cybercrime Centre (EC3)** coordinates investigations in the EU; national CERTs share threat information through forums such as **FIRST**.',
        { tip: 'Exam answers score well when they pair each **challenge** (jurisdiction, attribution, differing laws) with a **response** (treaties, MLATs, joint operations).' },
      ],
      example: {
        title: 'A cross-border case',
        input: 'Victims in India receive fake job offers; the website is hosted abroad; payments go to accounts in a third country.',
        output: `Challenge  : three jurisdictions, offender hidden
Response   : CERT-In requests takedown of the site
             Police request bank records via MLAT
             INTERPOL notice helps trace the offender`,
        explanation: 'Each step depends on another country’s cooperation, which is why international frameworks matter.',
      },
      keyPoints: [
        'Cybercrime is transnational: jurisdiction and attribution are hard.',
        'Budapest Convention (2001) is the first cybercrime treaty; India is not a party.',
        'UN adopted a Convention against Cybercrime in 2024.',
        'INTERPOL, Europol EC3 and MLATs enable cooperation.',
        'National laws: GDPR, CFAA, IT Act.',
      ],
      importantTerms: [
        { term: 'Jurisdiction', meaning: 'The authority of a country’s courts and police over a case.' },
        { term: 'Attribution', meaning: 'Identifying who is responsible for an attack.' },
        { term: 'MLAT', meaning: 'Mutual Legal Assistance Treaty for sharing evidence between states.' },
        { term: 'Budapest Convention', meaning: 'Council of Europe treaty on cybercrime, 2001.' },
      ],
      examPoints: [
        'Explain why cybercrime is a **global** issue.',
        'List the **challenges**: jurisdiction, attribution, laws, evidence, safe havens.',
        'Describe the **Budapest Convention** and other responses.',
        'Give a cross-border example.',
      ],
      questions: [
        {
          prompt: 'Discuss the global perspective on cybercrime.',
          plan: ANSWER_PLAN(
            'Cybercrime as a transnational problem',
            'Hub diagram of international bodies and treaties',
            'Challenges; Budapest Convention; UN convention; INTERPOL, Europol; MLATs',
            'Fake job scam across three countries',
            'Cooperation is essential; India not a Budapest party',
          ),
        },
      ],
      keywords: ['transnational', 'jurisdiction', 'attribution', 'Budapest Convention', 'INTERPOL', 'Europol EC3', 'MLAT', 'GDPR'],
      remember: [
        { prompt: 'First international treaty on cybercrime?', answer: 'Budapest Convention, 2001.' },
        { prompt: 'Is India a party to the Budapest Convention?', answer: 'No.' },
        { prompt: 'Biggest legal challenge in cross-border cybercrime?', answer: 'Jurisdiction (with attribution and evidence sharing).' },
      ],
    },
  },
}
