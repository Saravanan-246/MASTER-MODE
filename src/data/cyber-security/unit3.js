// Cyber Security — Unit III: Cyber Attacks and Security Breach.
// Topic ids match the syllabus outline in ../subjects.js (24CSU5CB).
// Attacks are explained for recognition, detection and defence only — no
// working payloads or step-by-step attack instructions.
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
    'Unit III surveys the main types of cyber attack — malware, ransomware, DoS/DDoS, web attacks, impersonation, data theft, APTs, malvertising, SQL injection and social engineering — always with how each is detected and prevented. It then follows a breach from detection to recovery: resetting devices, reinstalling systems and managing stolen information.',

  map: [
    { label: 'Malicious software', topics: ['malware', 'ransomware', 'malvertising'] },
    { label: 'Attacks on services and web apps', topics: ['dos-ddos', 'web-attacks', 'sql-injection'] },
    { label: 'Attacks on people and data', topics: ['impersonation', 'social-engineering', 'data-theft', 'advanced-persistent-threats'] },
    { label: 'Detect', topics: ['identifying-and-detecting-breaches'] },
    {
      label: 'Recover',
      topics: ['steps-in-recovering-from-security-breach', 'resetting-devices', 'reinstalling-systems', 'managing-stolen-information'],
    },
  ],

  topics: {
    // ------------------------------------------------------------------
    'malware': {
      difficulty: 'easy',
      intro: 'Malware is the toolkit behind most attacks. Know each type by how it spreads and what it does.',
      definition:
        '**Malware** (malicious software) is any software intentionally designed to damage, disrupt, spy on or gain unauthorised access to a computer system. Main types include **viruses, worms, trojans, ransomware, spyware, adware, rootkits, keyloggers and bots**.',
      simpleExplanation: {
        text: 'Malware is software that works against the user. Some types spread by themselves, some hide inside useful-looking programs, some spy, and some lock your files for ransom.',
        analogy: 'Viruses in the body: some spread person-to-person (worms), some hide in food (trojans), and some quietly weaken you over time (spyware).',
      },
      visual: {
        type: 'hierarchy',
        title: 'Types of malware',
        root: 'Malware',
        children: [
          { label: 'Spreads itself', children: ['Virus — attaches to files, needs user action', 'Worm — spreads over networks on its own'] },
          { label: 'Hides its purpose', children: ['Trojan — looks legitimate', 'Rootkit — hides deep in the system', 'Backdoor — secret access'] },
          { label: 'Spies or profits', children: ['Spyware', 'Keylogger', 'Adware', 'Cryptojacker'] },
          { label: 'Extorts or controls', children: ['Ransomware', 'Bot — part of a botnet'] },
        ],
      },
      explanation: [
        { heading: 'Comparing key types' },
        {
          table: {
            columns: ['Type', 'Spreads by', 'Main effect'],
            rows: [
              ['Virus', 'Infected files; needs a user to run them', 'Corrupts or deletes data'],
              ['Worm', 'Network, by itself', 'Rapid spread, network overload'],
              ['Trojan', 'Disguised as useful software', 'Opens a backdoor, steals data'],
              ['Ransomware', 'Phishing, exposed services, other malware', 'Encrypts data and demands payment'],
              ['Spyware / keylogger', 'Bundled apps, trojans', 'Steals information silently'],
              ['Rootkit', 'Installed after compromise', 'Hides attacker activity'],
            ],
          },
        },
        { heading: 'How malware gets in' },
        'Email attachments and links, malicious downloads, infected USB drives, unpatched software, malicious ads, and fake apps.',
        { heading: 'Signs of infection' },
        'Slow system, pop-ups, unknown programs, disabled antivirus, unusual network traffic, files changed or missing.',
        { heading: 'Prevention' },
        {
          list: [
            'Keep the OS and applications **patched**.',
            'Use **endpoint protection** (antivirus/EDR).',
            'Install software only from **trusted sources**.',
            'Run with **least privilege** — not as administrator.',
            'Keep **offline backups**.',
            'Train users to avoid suspicious attachments and links.',
          ],
        },
      ],
      example: {
        title: 'Worm vs trojan',
        input: 'Two infections in a computer lab.',
        output: `Case A: one PC infected, then all PCs on the LAN within an hour → worm
Case B: student installs a "free game crack"; attacker gains remote access → trojan`,
        explanation: 'Worms spread on their own; trojans rely on the user being tricked into installing them.',
      },
      keyPoints: [
        'Malware = software designed to harm or gain unauthorised access.',
        'Virus needs a host and user action; worm self-replicates over networks.',
        'Trojan disguises itself; rootkit hides activity.',
        'Prevention: patching, endpoint protection, least privilege, backups, awareness.',
      ],
      importantTerms: [
        { term: 'Virus', meaning: 'Malware that attaches to files and spreads when they are run.' },
        { term: 'Worm', meaning: 'Self-replicating malware that spreads across networks without user action.' },
        { term: 'Trojan', meaning: 'Malware disguised as legitimate software.' },
        { term: 'Botnet', meaning: 'A network of infected machines controlled by an attacker.' },
      ],
      examPoints: [
        'Define malware and **classify** its types.',
        'Distinguish **virus, worm and trojan** clearly.',
        'List infection vectors, symptoms and prevention.',
      ],
      questions: [
        {
          prompt: 'What is malware? Explain its types and prevention.',
          plan: ANSWER_PLAN(
            'Software designed to harm or gain unauthorised access',
            'Malware classification tree',
            'Virus, worm, trojan, ransomware, spyware, rootkit, bots; vectors; symptoms',
            'Worm vs trojan in a lab',
            'Patching, endpoint protection, least privilege, backups',
          ),
        },
      ],
      keywords: ['malware', 'virus', 'worm', 'trojan', 'rootkit', 'spyware', 'keylogger', 'botnet', 'endpoint protection'],
      remember: [
        { prompt: 'Which malware spreads without user action?', answer: 'Worm.' },
        { prompt: 'Which malware disguises itself as useful software?', answer: 'Trojan.' },
        { prompt: 'Which malware hides attacker activity in the OS?', answer: 'Rootkit.' },
      ],
    },

    // ------------------------------------------------------------------
    'ransomware': {
      difficulty: 'medium',
      intro: 'Ransomware is one of the most damaging attacks on organisations today. Backups are the key defence.',
      definition:
        '**Ransomware** is a type of malware that **encrypts** a victim’s files (crypto-ransomware) or **locks** the system (locker ransomware) and demands a payment, usually in cryptocurrency, for restoring access. Modern attacks often use **double extortion**: data is stolen before encryption and the attacker threatens to publish it.',
      simpleExplanation: {
        text: 'All malware is harmful, but ransomware is special: it holds your data hostage. The files are still on your disk, but encrypted with a key only the attacker has.',
        analogy: 'Someone puts a lock on your cupboard and leaves a note: pay to get the key.',
      },
      visual: {
        type: 'process',
        title: 'Ransomware attack lifecycle and defences',
        steps: [
          { label: 'Initial access', detail: 'phishing, stolen password, unpatched service — defence: MFA, patching' },
          { label: 'Spread inside', detail: 'moves to more systems — defence: network segmentation' },
          { label: 'Data theft', detail: 'copies data out — defence: monitoring, DLP' },
          { label: 'Encryption', detail: 'files locked — defence: offline backups' },
          { label: 'Ransom note', detail: 'payment demanded — response: isolate, report, restore' },
        ],
      },
      explanation: [
        { heading: 'Malware vs ransomware' },
        'Ransomware is a **subset** of malware. Its defining feature is **extortion** — it denies access to data or systems until payment.',
        { heading: 'Types' },
        {
          list: [
            '**Crypto-ransomware** — encrypts files.',
            '**Locker ransomware** — locks the device screen.',
            '**Double extortion** — encrypt + threaten to leak stolen data.',
            '**Ransomware-as-a-service (RaaS)** — developers rent ransomware to affiliates.',
          ],
        },
        { heading: 'A known case' },
        '**WannaCry (2017)** spread as a worm by exploiting an unpatched Windows SMB vulnerability, affecting many organisations worldwide, including hospitals. A patch had been released before the outbreak — a lesson in patch management.',
        { heading: 'Defences' },
        {
          list: [
            '**3-2-1 backups**: 3 copies, on 2 different media, 1 offline/off-site — tested regularly.',
            'Patch promptly; disable unused exposed services.',
            'MFA on remote access and email.',
            'Network segmentation to limit spread.',
            'Incident response plan rehearsed in advance.',
          ],
        },
        { trap: 'Paying the ransom does not guarantee recovery and funds further crime. Law enforcement agencies advise against paying; restore from backups and report the incident (to CERT-In in India).' },
      ],
      example: {
        title: 'Responding to a ransomware note',
        input: 'Office PCs show a ransom note; shared drive files have a strange extension.',
        output: `1. Disconnect affected machines from the network (do not power off — evidence)
2. Inform the incident response team and report to CERT-In
3. Identify the scope and the ransomware family
4. Restore clean systems and data from offline backups
5. Reset credentials, patch the entry point, review lessons learned`,
        explanation: 'Isolation stops the spread; tested backups make recovery possible without paying.',
      },
      keyPoints: [
        'Ransomware encrypts or locks and demands payment.',
        'It is a subset of malware defined by extortion.',
        'Double extortion adds threat of data leak.',
        'WannaCry (2017) exploited an unpatched SMB flaw.',
        'Key defence: tested offline backups (3-2-1), patching, MFA, segmentation.',
      ],
      importantTerms: [
        { term: 'Crypto-ransomware', meaning: 'Ransomware that encrypts files.' },
        { term: 'Double extortion', meaning: 'Encrypting data and also threatening to publish stolen copies.' },
        { term: 'RaaS', meaning: 'Ransomware-as-a-service: ransomware rented to affiliates.' },
        { term: '3-2-1 backup rule', meaning: 'Three copies, two media types, one offline or off-site.' },
      ],
      examPoints: [
        'Define ransomware and contrast with general malware.',
        'Explain types and **attack lifecycle**.',
        'Give a known example (WannaCry).',
        'Explain prevention and response; why not to pay.',
      ],
      questions: [
        {
          prompt: 'Explain ransomware, its working and countermeasures.',
          plan: ANSWER_PLAN(
            'Malware that encrypts or locks and demands ransom',
            'Ransomware lifecycle',
            'Types; double extortion; RaaS',
            'WannaCry 2017',
            '3-2-1 backups, patching, MFA, segmentation, response plan',
          ),
        },
      ],
      keywords: ['ransomware', 'crypto-ransomware', 'locker', 'double extortion', 'RaaS', 'WannaCry', '3-2-1 backup', 'segmentation'],
      remember: [
        { prompt: 'Best single defence against ransomware?', answer: 'Tested offline backups.' },
        { prompt: 'What is double extortion?', answer: 'Encrypting data and threatening to leak it.' },
        { prompt: 'What did WannaCry exploit?', answer: 'An unpatched Windows SMB vulnerability.' },
      ],
    },

    // ------------------------------------------------------------------
    'dos-ddos': {
      difficulty: 'medium',
      intro: 'DoS attacks do not steal anything — they make a service unusable. Know the difference between DoS and DDoS.',
      definition:
        'A **Denial of Service (DoS)** attack makes a system or network unavailable to legitimate users by overwhelming it with traffic or requests, or by exploiting a flaw that crashes it. A **Distributed Denial of Service (DDoS)** attack does the same from **many sources at once**, usually a **botnet** of compromised devices.',
      simpleExplanation: {
        text: 'Imagine thousands of fake customers crowding a shop so real customers cannot get in. With DoS the crowd comes from one source; with DDoS it comes from thousands of places, so it is much harder to block.',
        analogy: 'One person calling a helpline again and again is DoS; ten thousand people calling at once is DDoS.',
      },
      visual: {
        type: 'comparison',
        title: 'DoS vs DDoS',
        items: [
          { title: 'DoS', tone: 'muted', points: ['One source', 'Easier to block by address', 'Limited volume', 'Simple to trace'] },
          { title: 'DDoS', tone: 'accent', points: ['Many sources — a botnet', 'Hard to filter from real users', 'Very high volume', 'Hard to trace'] },
        ],
      },
      explanation: [
        { heading: 'Categories of DoS/DDoS' },
        {
          table: {
            columns: ['Category', 'Targets', 'Example'],
            rows: [
              ['Volumetric', 'Network bandwidth', 'UDP flood, amplification attacks'],
              ['Protocol', 'Server/network resources', 'SYN flood exhausts connection tables'],
              ['Application layer', 'A specific web application', 'Flood of costly HTTP requests'],
            ],
          },
        },
        { heading: 'Botnets' },
        'A botnet is a network of infected computers or IoT devices controlled through a command-and-control server. The **Mirai** botnet (2016) used poorly secured IoT devices with default passwords to launch very large DDoS attacks.',
        { heading: 'Impact' },
        'Loss of availability, revenue loss, damaged reputation, and sometimes a **smokescreen** to distract defenders from another attack.',
        { heading: 'Defences' },
        {
          list: [
            '**DDoS protection services** and content delivery networks that absorb traffic.',
            '**Rate limiting** and traffic filtering at the edge.',
            'Over-provisioned bandwidth and load balancing.',
            'ISP coordination to filter upstream.',
            'Securing IoT devices (change default passwords) so they cannot join botnets.',
            'An incident response plan for availability incidents.',
          ],
        },
      ],
      example: {
        title: 'Result-day outage',
        input: 'A university results site slows to a halt; logs show requests from thousands of IP addresses worldwide.',
        output: `Type      : DDoS (application-layer flood)
Detection : sudden traffic spike, many sources, same URL
Response  : enable CDN/DDoS protection, rate-limit the endpoint,
            inform ISP, publish results via alternate channel`,
        explanation: 'Because traffic comes from many sources, simple IP blocking is not enough.',
      },
      keyPoints: [
        'DoS attacks availability; nothing need be stolen.',
        'DDoS uses many sources, usually a botnet.',
        'Categories: volumetric, protocol, application layer.',
        'Mirai botnet used insecure IoT devices.',
        'Defences: DDoS protection, rate limiting, CDN, ISP filtering.',
      ],
      importantTerms: [
        { term: 'Botnet', meaning: 'Network of compromised devices controlled by an attacker.' },
        { term: 'SYN flood', meaning: 'Protocol attack that exhausts a server’s half-open connection table.' },
        { term: 'Amplification', meaning: 'Using services that send large responses to small requests to multiply traffic.' },
        { term: 'Rate limiting', meaning: 'Restricting how many requests a client can make in a time period.' },
      ],
      examPoints: [
        'Define DoS and DDoS and **compare** them.',
        'Explain the **three categories** with examples.',
        'Explain botnets and give the Mirai example.',
        'List countermeasures.',
      ],
      questions: [
        {
          prompt: 'Differentiate DoS and DDoS attacks. Explain their types and countermeasures.',
          plan: ANSWER_PLAN(
            'Attacks that deny service to legitimate users',
            'DoS vs DDoS diagram with botnet',
            'Volumetric, protocol, application-layer; botnets',
            'Results website flooded',
            'DDoS protection, rate limiting, CDN, IoT hygiene',
          ),
        },
      ],
      keywords: ['DoS', 'DDoS', 'botnet', 'availability', 'volumetric', 'SYN flood', 'application layer', 'Mirai', 'rate limiting'],
      remember: [
        { prompt: 'Which CIA goal does DDoS attack?', answer: 'Availability.' },
        { prompt: 'What makes an attack “distributed”?', answer: 'It comes from many sources, usually a botnet.' },
        { prompt: 'What did the Mirai botnet use?', answer: 'Insecure IoT devices with default passwords.' },
      ],
    },

    // ------------------------------------------------------------------
    'web-attacks': {
      difficulty: 'medium',
      intro: 'Websites are always exposed to the internet, so web application flaws are a leading cause of breaches.',
      definition:
        '**Web attacks** target web applications, their users or their servers by exploiting weaknesses in code, configuration or authentication. Common examples are **injection**, **cross-site scripting (XSS)**, **cross-site request forgery (CSRF)**, **broken access control** and **session hijacking**. The **OWASP Top 10** lists the most critical web application security risks.',
      simpleExplanation: {
        text: 'A website takes input from anyone on the internet. If it trusts that input too much, or does not check who is allowed to do what, an attacker can make it misbehave — show other users’ data, run scripts in visitors’ browsers, or perform actions on their behalf.',
        analogy: 'A shop counter that hands over any parcel to whoever asks for it by number, without checking ID — that is broken access control.',
      },
      visual: {
        type: 'architecture',
        title: 'Where web attacks strike',
        layers: [
          { label: 'User’s browser', note: 'client side', items: ['XSS — malicious script runs here', 'CSRF — forged requests sent from here'] },
          { label: 'Web application', note: 'server code', items: ['Broken access control', 'Injection', 'Authentication failures'] },
          { label: 'Database and server', note: 'back end', items: ['SQL injection impact', 'Misconfiguration', 'Outdated components'] },
        ],
      },
      explanation: [
        { heading: 'Common web attacks' },
        {
          table: {
            columns: ['Attack', 'What happens', 'Main defence'],
            rows: [
              ['Injection (e.g. SQL)', 'Input is executed as a command or query', 'Parameterised queries, input validation'],
              ['Cross-site scripting', 'Attacker’s script runs in other users’ browsers', 'Output encoding, Content Security Policy'],
              ['CSRF', 'User’s browser is tricked into sending an unwanted request', 'Anti-CSRF tokens, SameSite cookies'],
              ['Broken access control', 'Users reach data or functions they should not', 'Server-side authorisation checks on every request'],
              ['Session hijacking', 'Attacker takes over a logged-in session', 'Secure, HttpOnly cookies; HTTPS; session timeout'],
              ['Security misconfiguration', 'Default accounts, verbose errors, open directories', 'Hardening and configuration reviews'],
            ],
          },
        },
        { heading: 'OWASP Top 10 (2021)' },
        {
          list: [
            'Broken Access Control',
            'Cryptographic Failures',
            'Injection',
            'Insecure Design',
            'Security Misconfiguration',
            'Vulnerable and Outdated Components',
            'Identification and Authentication Failures',
            'Software and Data Integrity Failures',
            'Security Logging and Monitoring Failures',
            'Server-Side Request Forgery',
          ],
          ordered: true,
        },
        { tip: 'Golden rule of web security: **never trust user input** — validate it on the server and encode it when displaying.' },
        'A **Web Application Firewall (WAF)** adds a filtering layer but does not replace secure coding.',
      ],
      example: {
        title: 'Broken access control',
        input: 'A student opens `/marksheet?id=1021` and changes the number to `1022`, seeing another student’s marks.',
        output: `Flaw    : the server shows any marksheet by ID without checking ownership
Risk    : every student's marks exposed (confidentiality breach)
Fix     : on every request, check that the logged-in user owns record 1022`,
        explanation: 'Hiding links is not access control. The server must check permission each time.',
      },
      keyPoints: [
        'Web attacks exploit code, configuration or authentication flaws.',
        'Main types: injection, XSS, CSRF, broken access control, session hijacking.',
        'OWASP Top 10 lists critical web risks; broken access control is first (2021).',
        'Never trust user input; enforce authorisation on the server.',
        'WAF helps but does not replace secure coding.',
      ],
      importantTerms: [
        { term: 'XSS', meaning: 'Cross-site scripting: injecting script that runs in other users’ browsers.' },
        { term: 'CSRF', meaning: 'Cross-site request forgery: making a victim’s browser send unwanted requests.' },
        { term: 'OWASP', meaning: 'Open Worldwide Application Security Project — publishes the Top 10.' },
        { term: 'WAF', meaning: 'Web Application Firewall that filters HTTP traffic.' },
      ],
      examPoints: [
        'Define web attacks.',
        'Explain **XSS, CSRF, injection, broken access control** with defences.',
        'List the **OWASP Top 10** categories.',
        'Mention secure coding and WAF.',
      ],
      questions: [
        {
          prompt: 'Explain common web application attacks and their countermeasures.',
          plan: ANSWER_PLAN(
            'Attacks exploiting flaws in web applications',
            'Browser → application → database layers',
            'Injection, XSS, CSRF, access control, session hijacking; OWASP Top 10',
            'Changing a marksheet ID',
            'Validate input, encode output, check authorisation, WAF',
          ),
        },
      ],
      keywords: ['web attacks', 'XSS', 'CSRF', 'injection', 'broken access control', 'session hijacking', 'OWASP Top 10', 'WAF'],
      remember: [
        { prompt: 'Top risk in the OWASP Top 10 (2021)?', answer: 'Broken Access Control.' },
        { prompt: 'Defence against XSS?', answer: 'Output encoding (and Content Security Policy).' },
        { prompt: 'Defence against CSRF?', answer: 'Anti-CSRF tokens and SameSite cookies.' },
      ],
    },

    // ------------------------------------------------------------------
    'impersonation': {
      difficulty: 'medium',
      intro: 'Pretending to be someone trusted is behind CEO fraud, fake bank calls and spoofed emails.',
      definition:
        '**Impersonation** is an attack in which the attacker **pretends to be a trusted person, organisation or system** to deceive victims into transferring money, revealing information or granting access. It includes **spoofing** (email, caller ID, website, IP/DNS), **business email compromise (BEC)** and fake profiles. Cheating by personation using a computer resource is an offence under **Section 66D** of the IT Act.',
      simpleExplanation: {
        text: 'If a message looks like it is from your boss or your bank, you are likely to obey it. Impersonation attacks exploit that trust by faking the sender.',
        analogy: 'A fraudster wearing a courier uniform to get inside an office.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Forms of impersonation',
        root: 'Impersonation',
        children: [
          { label: 'Of people', children: ['CEO / boss fraud', 'Fake police or officials', 'Fake profiles of friends'] },
          { label: 'Of organisations', children: ['Fake bank calls', 'Look-alike websites', 'Fake customer care numbers'] },
          { label: 'Of systems', children: ['Email spoofing', 'Caller ID spoofing', 'DNS or IP spoofing'] },
          { label: 'Synthetic', children: ['Deepfake voice', 'Deepfake video'] },
        ],
      },
      explanation: [
        { heading: 'Business email compromise (BEC)' },
        'The attacker spoofs or takes over an executive’s or supplier’s email and asks finance staff to make an urgent payment or change bank details. No malware is needed — only trust and urgency.',
        { heading: 'Technical forms of spoofing' },
        {
          list: [
            '**Email spoofing** — forging the “From” address.',
            '**Caller ID spoofing** — showing a fake number on the victim’s phone.',
            '**Website spoofing** — look-alike domains and pages.',
            '**IP / DNS spoofing** — faking network addresses or name resolution.',
          ],
        },
        { heading: 'Defences' },
        {
          list: [
            '**Out-of-band verification** — confirm payment or data requests by calling a known number.',
            '**Email authentication**: SPF, DKIM, DMARC.',
            '**MFA** to stop account takeover.',
            'Approval workflows for payments and bank-detail changes.',
            'Awareness that deepfake voice and video now exist.',
          ],
        },
      ],
      example: {
        title: 'CEO fraud attempt',
        input: 'Email from “CEO” (display name correct, domain slightly different): “Urgent — transfer ₹8 lakh to this new vendor account today. I am in a meeting, do not call.”',
        output: `Red flags : urgency, secrecy, new bank account, look-alike domain
Correct action : verify by calling the CEO on the known number
Control        : dual approval for new beneficiary accounts`,
        explanation: '“Do not call” is a classic sign — it blocks the one check that exposes the fraud.',
      },
      keyPoints: [
        'Impersonation exploits trust in a person, organisation or system.',
        'Forms: BEC/CEO fraud, fake officials, spoofed email/caller ID/websites, deepfakes.',
        'IT Act Section 66D: cheating by personation.',
        'Defence: out-of-band verification, SPF/DKIM/DMARC, MFA, approval workflows.',
      ],
      importantTerms: [
        { term: 'Spoofing', meaning: 'Falsifying the source of a message or connection.' },
        { term: 'BEC', meaning: 'Business email compromise: fraud using a spoofed or hijacked business email.' },
        { term: 'Out-of-band verification', meaning: 'Confirming a request through a separate, trusted channel.' },
        { term: 'Deepfake', meaning: 'AI-generated fake audio or video of a real person.' },
      ],
      examPoints: [
        'Define impersonation and list its forms.',
        'Explain BEC with an example.',
        'Explain technical spoofing types.',
        'Mention Section 66D and defences.',
      ],
      questions: [
        {
          prompt: 'What is impersonation in cyber attacks? Explain its forms and defences.',
          plan: ANSWER_PLAN(
            'Pretending to be a trusted entity to deceive',
            'Forms of impersonation tree',
            'BEC; email, caller ID, website, DNS spoofing; deepfakes',
            'CEO fraud email',
            'Verification, email authentication, MFA, Section 66D',
          ),
        },
      ],
      keywords: ['impersonation', 'spoofing', 'BEC', 'CEO fraud', 'caller ID spoofing', 'deepfake', 'Section 66D', 'out-of-band verification'],
      remember: [
        { prompt: 'IT Act section for cheating by personation?', answer: 'Section 66D.' },
        { prompt: 'Best defence against a fake payment request?', answer: 'Verify through a separate, known channel.' },
        { prompt: 'Does BEC need malware?', answer: 'No — it relies on trust and urgency.' },
      ],
    },

    // ------------------------------------------------------------------
    'data-theft': {
      difficulty: 'medium',
      intro: 'Data is the target of most breaches. Know the sources of data theft and how to prevent and detect it.',
      definition:
        '**Data theft** is the unauthorised copying, transfer or retrieval of information from a computer, server, device or cloud service. It may be done by **external attackers** (exfiltration after a breach), **insiders** (employees misusing access), or result from **lost or stolen devices** and **misconfigured storage**.',
      simpleExplanation: {
        text: 'Unlike physical theft, the owner often still has the data after it is stolen — the attacker just has a copy. That is why data theft can go unnoticed for a long time.',
        analogy: 'Someone photocopies your diary and puts it back. Nothing is missing, but your secrets are gone.',
      },
      visual: {
        type: 'network',
        title: 'Sources of data theft',
        center: { label: 'Sensitive data' },
        nodes: [
          { label: 'External attackers', note: 'exfiltration after breach' },
          { label: 'Malicious insiders', note: 'misuse of access' },
          { label: 'Careless insiders', note: 'wrong email, personal cloud' },
          { label: 'Lost devices', note: 'laptops, USB drives' },
          { label: 'Misconfigured cloud', note: 'public storage buckets' },
          { label: 'Third parties', note: 'vendors with access' },
        ],
      },
      explanation: [
        { heading: 'What is stolen' },
        'Personal data (names, ID numbers, health records), financial data, credentials, intellectual property and confidential business plans.',
        { heading: 'Prevention' },
        {
          list: [
            '**Least privilege / need-to-know** access.',
            '**Encryption** of data at rest and in transit.',
            '**Data loss prevention (DLP)** to block or alert on sensitive data leaving.',
            '**Data classification** — know which data is sensitive.',
            'Secure configuration of cloud storage; regular audits.',
            'Device encryption, USB controls, remote wipe.',
            'Offboarding: remove access immediately when staff leave.',
          ],
        },
        { heading: 'Detection' },
        'Unusual large downloads, transfers at odd hours, uploads to personal cloud storage, access to records unrelated to a user’s role, and alerts from DLP or database activity monitoring.',
        { heading: 'Legal angle in India' },
        'Unauthorised downloading or copying of data is covered by **Section 43(b)** (compensation) and **Section 66** of the IT Act; organisations failing to protect sensitive personal data face liability under **Section 43A** and the **DPDP Act 2023**.',
      ],
      example: {
        title: 'An exposed cloud bucket',
        input: 'A company stores customer KYC scans in a cloud storage bucket accidentally set to public.',
        output: `Cause      : misconfiguration (no attacker skill needed)
Impact     : personal data of customers exposed
Detection  : cloud security posture scan flags public bucket
Fix        : make private, rotate keys, review access logs, notify as required`,
        explanation: 'Many data leaks come from simple configuration mistakes rather than sophisticated hacking.',
      },
      keyPoints: [
        'Data theft = unauthorised copying or transfer of data.',
        'Sources: external attackers, insiders, lost devices, misconfiguration, third parties.',
        'Prevention: least privilege, encryption, DLP, classification, secure configuration.',
        'Detection: unusual volume, timing or destination of transfers.',
        'Legal: IT Act 43, 43A, 66; DPDP Act 2023.',
      ],
      importantTerms: [
        { term: 'Exfiltration', meaning: 'Unauthorised transfer of data out of an organisation.' },
        { term: 'DLP', meaning: 'Data loss prevention tools that detect and block sensitive data leaving.' },
        { term: 'Insider threat', meaning: 'Risk from people with legitimate access.' },
        { term: 'Data classification', meaning: 'Labelling data by sensitivity to apply proper controls.' },
      ],
      examPoints: [
        'Define data theft and list its **sources**.',
        'Explain prevention and detection measures.',
        'Mention legal provisions.',
      ],
      questions: [
        {
          prompt: 'Explain data theft, its sources and preventive measures.',
          plan: ANSWER_PLAN(
            'Unauthorised copying or transfer of information',
            'Hub diagram of sources',
            'Types of data; prevention; detection',
            'Public cloud bucket with KYC data',
            'Least privilege, encryption, DLP; IT Act and DPDP Act',
          ),
        },
      ],
      keywords: ['data theft', 'exfiltration', 'insider threat', 'DLP', 'encryption', 'least privilege', 'misconfiguration', 'Section 43A'],
      remember: [
        { prompt: 'Why can data theft go unnoticed?', answer: 'The owner still has the data — only a copy is taken.' },
        { prompt: 'Tool that blocks sensitive data from leaving?', answer: 'Data loss prevention (DLP).' },
        { prompt: 'IT Act section on failure to protect sensitive personal data?', answer: 'Section 43A.' },
      ],
    },

    // ------------------------------------------------------------------
    'advanced-persistent-threats': {
      difficulty: 'hard',
      intro: 'APTs are long, stealthy campaigns by skilled, well-funded groups. The kill chain is the standard way to explain them.',
      definition:
        'An **Advanced Persistent Threat (APT)** is a prolonged, targeted attack in which a skilled and well-resourced adversary — often **state-sponsored** — gains access to a network and stays undetected for a long period to steal data or sabotage systems. **Advanced**: sophisticated tools and techniques. **Persistent**: long-term, determined. **Threat**: organised, human-directed adversary.',
      simpleExplanation: {
        text: 'Ordinary attackers grab what they can and leave. An APT group picks a specific target, gets in quietly, and stays for months, slowly collecting information while avoiding detection.',
        analogy: 'Not a burglar who smashes a window, but a spy who takes a job inside the company and quietly copies files for months.',
      },
      visual: {
        type: 'process',
        title: 'Cyber kill chain — stages of an APT and defences',
        steps: [
          { label: 'Reconnaissance', detail: 'study the target — defence: limit public exposure' },
          { label: 'Weaponisation', detail: 'prepare malicious payload — defence: threat intelligence' },
          { label: 'Delivery', detail: 'spear phishing, compromised sites — defence: email filtering, awareness' },
          { label: 'Exploitation', detail: 'code runs on target — defence: patching, hardening' },
          { label: 'Installation', detail: 'persistent backdoor — defence: EDR, application control' },
          { label: 'Command and control', detail: 'remote control channel — defence: network monitoring' },
          { label: 'Actions on objectives', detail: 'data theft or sabotage — defence: DLP, segmentation' },
        ],
      },
      explanation: [
        { heading: 'Characteristics of an APT' },
        {
          list: [
            'Specific, high-value **targets** — governments, defence, energy, large companies.',
            '**Long dwell time** — remains undetected for months.',
            '**Stealth** — custom malware, legitimate admin tools, encrypted channels.',
            '**Lateral movement** — moves from system to system inside the network.',
            '**Well funded** — often linked to nation-states or organised groups.',
          ],
        },
        { heading: 'Example' },
        '**Stuxnet** (discovered 2010) is a well-known example of a highly sophisticated, targeted attack on industrial control systems used in nuclear enrichment.',
        { heading: 'APT vs ordinary attack' },
        {
          table: {
            columns: ['', 'Ordinary attack', 'APT'],
            rows: [
              ['Target', 'Opportunistic, many victims', 'Specific organisation'],
              ['Duration', 'Short', 'Months or years'],
              ['Goal', 'Quick profit', 'Espionage, sabotage, long-term access'],
              ['Resources', 'Limited', 'Large, often state-backed'],
            ],
          },
        },
        { heading: 'Defence' },
        'Defence in depth, threat intelligence, continuous monitoring (SIEM, EDR), network segmentation, privileged access management, and **threat hunting** — proactively searching for hidden attackers. Frameworks such as **MITRE ATT&CK** catalogue attacker tactics and techniques.',
      ],
      example: {
        title: 'Detecting an APT in progress',
        input: 'A ministry’s monitoring shows an admin account logging into many servers at 3 a.m. and small encrypted transfers to an unknown external server every night.',
        output: `Kill chain stage : command and control + actions on objectives
Indicators       : unusual admin logins, regular outbound beacons
Response         : isolate hosts, reset privileged credentials, block C2 domain,
                   hunt for other footholds, engage CERT-In`,
        explanation: 'APTs are often found through anomalies in behaviour, not through antivirus alerts.',
      },
      keyPoints: [
        'APT = advanced, persistent, organised threat; often state-sponsored.',
        'Targets specific high-value organisations and stays hidden for long.',
        'Kill chain: recon, weaponisation, delivery, exploitation, installation, C2, actions.',
        'Example: Stuxnet.',
        'Defence: monitoring, threat hunting, segmentation, privileged access control.',
      ],
      importantTerms: [
        { term: 'Dwell time', meaning: 'Time an attacker remains undetected inside a network.' },
        { term: 'Lateral movement', meaning: 'Moving from one compromised system to others inside a network.' },
        { term: 'Command and control (C2)', meaning: 'Channel used by attackers to control compromised systems.' },
        { term: 'Threat hunting', meaning: 'Proactively searching for hidden threats in a network.' },
      ],
      examPoints: [
        'Explain each word of **APT**.',
        'Draw the **cyber kill chain** with defences.',
        'List characteristics and compare with ordinary attacks.',
        'Give an example (Stuxnet).',
      ],
      questions: [
        {
          prompt: 'What is an Advanced Persistent Threat? Explain its lifecycle.',
          plan: ANSWER_PLAN(
            'Prolonged, targeted, stealthy attack by a skilled adversary',
            'Cyber kill chain',
            'Characteristics; each stage; APT vs ordinary attack',
            'Stuxnet; ministry detecting C2 beacons',
            'Monitoring, threat hunting, segmentation',
          ),
        },
      ],
      keywords: ['APT', 'state-sponsored', 'cyber kill chain', 'dwell time', 'lateral movement', 'command and control', 'threat hunting', 'Stuxnet', 'MITRE ATT&CK'],
      remember: [
        { prompt: 'What does the P in APT stand for?', answer: 'Persistent — long-term presence.' },
        { prompt: 'Last stage of the kill chain?', answer: 'Actions on objectives.' },
        { prompt: 'Name a famous APT-style attack.', answer: 'Stuxnet.' },
      ],
    },

    // ------------------------------------------------------------------
    'malvertising': {
      difficulty: 'easy',
      intro: 'Even trusted websites can serve malicious ads. Malvertising shows why browsers must be kept up to date.',
      definition:
        '**Malvertising** (malicious advertising) is the use of online advertisements to spread malware or lead users to scams. Attackers place malicious ads through **legitimate ad networks**, so the ads can appear on trusted websites. Some cause **drive-by downloads** that exploit browser or plugin flaws without a click.',
      simpleExplanation: {
        text: 'Websites show ads supplied by ad networks, not chosen one by one. Criminals buy ad space or compromise an ad server and hide malicious code or links in the ad. Users of a perfectly genuine news site can then be redirected to a fake page or a malware download.',
        analogy: 'A trusted newspaper unknowingly prints a fake advertisement that leads readers to a con artist.',
      },
      visual: {
        type: 'flow',
        title: 'How malvertising reaches users',
        steps: [
          { label: 'Attacker submits ad', note: 'looks legitimate' },
          { label: 'Ad network', note: 'distributes automatically' },
          { label: 'Trusted website', note: 'displays the ad' },
          { label: 'User’s browser', note: 'click or drive-by' },
          { label: 'Malware or scam', note: 'redirect to fake page' },
        ],
      },
      explanation: [
        { heading: 'Forms of malvertising' },
        {
          list: [
            '**Drive-by download** — malicious code in the ad exploits an unpatched browser or plugin.',
            '**Malicious redirect** — the ad sends users to phishing or fake-prize pages.',
            '**Fake software ads** — ads in search results for fake versions of popular software.',
            '**Scareware** — ads claiming “your PC is infected” to push fake security tools.',
          ],
        },
        { heading: 'Malvertising vs adware' },
        '**Adware** is unwanted software already installed on the device that shows ads. **Malvertising** delivers attacks through ads on websites — no prior infection needed.',
        { heading: 'Defences' },
        {
          list: [
            'Keep browsers and plugins **updated**.',
            'Use reputable **ad/content blockers** and browser security features.',
            'Download software only from **official sites**, not from search ads.',
            'Ad networks should vet advertisers and scan creatives.',
            'Website owners should monitor third-party scripts.',
          ],
        },
      ],
      example: {
        title: 'Fake software ad',
        input: 'A user searches for a free PDF editor and clicks the first sponsored result, which looks like the official site.',
        output: `Risk      : download is bundled with malware
Red flags : slightly wrong domain, “sponsored” label
Safer way : go directly to the vendor's official site or app store`,
        explanation: 'Being at the top of search results does not make a site genuine.',
      },
      keyPoints: [
        'Malvertising spreads malware or scams through online ads.',
        'Malicious ads can appear on legitimate websites via ad networks.',
        'Forms: drive-by downloads, redirects, fake software ads, scareware.',
        'Differs from adware, which is installed software.',
        'Defences: updates, ad blockers, official downloads, ad vetting.',
      ],
      importantTerms: [
        { term: 'Malvertising', meaning: 'Malicious advertising used to deliver malware or scams.' },
        { term: 'Drive-by download', meaning: 'Malware installed just by visiting a page, without a deliberate download.' },
        { term: 'Scareware', meaning: 'Fake warnings that frighten users into buying or installing something.' },
      ],
      examPoints: [
        'Define malvertising and explain **how it works** through ad networks.',
        'List its forms.',
        'Distinguish malvertising and adware.',
        'Give defences.',
      ],
      questions: [
        {
          prompt: 'Explain malvertising and how users can be protected.',
          plan: ANSWER_PLAN(
            'Spreading malware or scams through online ads',
            'Attacker → ad network → website → user flow',
            'Drive-by, redirects, fake software ads, scareware; vs adware',
            'Fake PDF editor sponsored result',
            'Updates, blockers, official downloads, ad vetting',
          ),
        },
      ],
      keywords: ['malvertising', 'ad network', 'drive-by download', 'redirect', 'scareware', 'adware', 'ad blocker'],
      remember: [
        { prompt: 'Can malvertising appear on genuine websites?', answer: 'Yes — through third-party ad networks.' },
        { prompt: 'What is a drive-by download?', answer: 'Malware installed just by visiting a page.' },
        { prompt: 'Malvertising vs adware?', answer: 'Malvertising is via ads on websites; adware is installed software.' },
      ],
    },

    // ------------------------------------------------------------------
    'sql-injection': {
      difficulty: 'hard',
      intro: 'A classic, still-common web attack — and one with a clear, reliable fix: parameterised queries.',
      definition:
        '**SQL injection (SQLi)** is a web attack in which user-supplied input is inserted into a database query **without proper handling**, so that the input is interpreted as part of the **SQL command** rather than as data. This can let an attacker read, modify or delete data, or bypass authentication.',
      simpleExplanation: {
        text: 'If a program builds an SQL query by gluing user input directly into the query text, special characters in the input can change what the query means. The database then does something the developer never intended.',
        analogy: 'A form that says “Pay ___ rupees to ___”. If someone writes extra instructions into the blank and the clerk follows them blindly, the form has been injected.',
      },
      visual: {
        type: 'comparison',
        title: 'Vulnerable vs safe query handling',
        items: [
          {
            title: 'Vulnerable — string concatenation',
            tone: 'bad',
            points: ['Input glued into the SQL text', 'Input can change the query structure', 'Database cannot tell data from code'],
          },
          {
            title: 'Safe — parameterised query',
            tone: 'good',
            points: ['Query structure fixed in advance', 'Input sent separately as data', 'Input can never become SQL code'],
          },
        ],
      },
      explanation: [
        { heading: 'Why it happens' },
        'The root cause is mixing **code** (the SQL statement) and **data** (user input) in one string. If input contains SQL syntax such as quote characters, it can break out of the data position and alter the logic.',
        { heading: 'The vulnerable pattern (do not use)' },
        { code: `// Input is concatenated straight into the query text
$sql = "SELECT * FROM students WHERE roll_no = '" . $_GET['roll'] . "'";`, lang: 'php' },
        { heading: 'The safe pattern — prepared statement' },
        { code: `// The query shape is fixed; the value is bound separately as data
$stmt = $pdo->prepare('SELECT * FROM students WHERE roll_no = ?');
$stmt->execute([$_GET['roll']]);`, lang: 'php' },
        { heading: 'Possible impact' },
        'Disclosure of the whole database, authentication bypass, data modification or deletion, and in some configurations control of the database server.',
        { heading: 'Defences' },
        {
          list: [
            '**Parameterised queries / prepared statements** — the primary defence.',
            '**Input validation** — allow only expected formats (e.g. digits for a roll number).',
            '**Least privilege** for the database account used by the app.',
            '**Stored procedures** written safely, and ORM frameworks.',
            '**Generic error messages** — do not reveal SQL errors to users.',
            '**WAF** and regular security testing as additional layers.',
          ],
        },
        { trap: 'Escaping or blacklisting characters alone is not reliable. Parameterised queries are the correct fix.' },
      ],
      example: {
        title: 'Spotting and fixing SQLi in a code review',
        input: 'A login page builds its query with string concatenation of username and password.',
        output: `Finding  : SQL injection risk — input concatenated into SQL
Severity : high (authentication bypass, data disclosure)
Fix      : prepared statement with bound parameters,
           hash passwords, least-privilege DB account, generic errors`,
        explanation: 'Detection: code review, static analysis and authorised security testing; prevention: parameterised queries.',
      },
      keyPoints: [
        'SQLi: user input interpreted as SQL code.',
        'Root cause: mixing code and data via string concatenation.',
        'Impact: data disclosure, auth bypass, data modification.',
        'Primary defence: parameterised queries / prepared statements.',
        'Supporting: input validation, least privilege, generic errors, WAF.',
      ],
      importantTerms: [
        { term: 'SQL injection', meaning: 'Inserting input that changes the meaning of an SQL query.' },
        { term: 'Prepared statement', meaning: 'A pre-compiled query with placeholders for values.' },
        { term: 'Parameter binding', meaning: 'Supplying values separately so they are treated only as data.' },
        { term: 'Input validation', meaning: 'Checking that input matches an expected format.' },
      ],
      examPoints: [
        'Define SQL injection and its **root cause**.',
        'Show vulnerable vs **parameterised** query handling.',
        'List impacts and **defences**.',
      ],
      questions: [
        {
          prompt: 'What is SQL injection? How can it be prevented?',
          plan: ANSWER_PLAN(
            'Input interpreted as part of an SQL command',
            'Vulnerable vs safe query comparison',
            'Root cause; impact; defences',
            'Login query built by concatenation, fixed with prepared statement',
            'Parameterised queries are the primary defence',
          ),
        },
      ],
      keywords: ['SQL injection', 'concatenation', 'prepared statement', 'parameterised query', 'input validation', 'least privilege', 'WAF'],
      remember: [
        { prompt: 'Primary defence against SQL injection?', answer: 'Parameterised queries (prepared statements).' },
        { prompt: 'Root cause of SQL injection?', answer: 'Mixing user input (data) into SQL code.' },
        { prompt: 'Why show generic error messages?', answer: 'So database details are not revealed to attackers.' },
      ],
    },

    // ------------------------------------------------------------------
    'social-engineering': {
      difficulty: 'medium',
      intro: 'People are often the easiest way in. Social engineering targets human trust rather than technical flaws.',
      definition:
        '**Social engineering** is the psychological manipulation of people into performing actions or divulging confidential information — such as passwords, OTPs or physical access — that benefit the attacker. It exploits human traits such as **trust, fear, urgency, curiosity and helpfulness**.',
      simpleExplanation: {
        text: 'Why break a strong lock when you can ask someone to open the door? Social engineers invent a believable story and pressure the target to act before thinking.',
        analogy: 'A con artist does not pick your pocket — he convinces you to hand over your wallet.',
      },
      visual: {
        type: 'process',
        title: 'Social engineering lifecycle',
        steps: [
          { label: 'Investigation', detail: 'research the target and choose a pretext' },
          { label: 'Hook', detail: 'make contact and build trust' },
          { label: 'Play', detail: 'obtain information or action using pressure' },
          { label: 'Exit', detail: 'leave without raising suspicion' },
        ],
      },
      explanation: [
        { heading: 'Techniques' },
        {
          table: {
            columns: ['Technique', 'Description'],
            rows: [
              ['Phishing / smishing / vishing', 'Deceptive email, SMS or calls'],
              ['Pretexting', 'Invented scenario, e.g. “I am from IT support”'],
              ['Baiting', 'Leaving infected USB drives or offering free downloads'],
              ['Quid pro quo', 'Offering a service or gift in exchange for information'],
              ['Tailgating / piggybacking', 'Following an authorised person into a secure area'],
              ['Shoulder surfing', 'Watching someone enter a password or PIN'],
            ],
          },
        },
        { heading: 'Psychological levers' },
        '**Authority** (pretending to be a boss or police), **urgency** (“act now”), **scarcity** (“limited offer”), **fear** (“your account is blocked”), **reciprocity** (“I helped you, now help me”) and **social proof** (“everyone has already done this”).',
        { heading: 'Defences' },
        {
          list: [
            '**Security awareness training** and phishing simulations.',
            '**Verification procedures** — call back on known numbers.',
            'Clear policy: no one asks for passwords or OTPs.',
            'Physical controls: badges, visitor logs, no tailgating.',
            'A blame-free culture for **reporting** suspicious contact.',
          ],
        },
      ],
      example: {
        title: 'Pretexting call to a help desk',
        input: 'Caller: “I am the new regional manager, locked out before a board meeting — reset my password and read the new one to me now.”',
        output: `Levers   : authority + urgency
Correct  : verify identity using the official procedure;
           send reset link only to the registered email/phone
Report   : log the call for the security team`,
        explanation: 'Procedures protect staff from pressure — following them is not rude, it is required.',
      },
      keyPoints: [
        'Social engineering manipulates people, not technology.',
        'Techniques: phishing, pretexting, baiting, quid pro quo, tailgating, shoulder surfing.',
        'Levers: authority, urgency, scarcity, fear, reciprocity, social proof.',
        'Defences: awareness, verification, policy, physical controls, reporting culture.',
      ],
      importantTerms: [
        { term: 'Pretexting', meaning: 'Using an invented scenario to obtain information.' },
        { term: 'Baiting', meaning: 'Luring victims with something attractive, like a free USB drive.' },
        { term: 'Tailgating', meaning: 'Following an authorised person into a restricted area.' },
        { term: 'Quid pro quo', meaning: 'Offering something in exchange for information or access.' },
      ],
      examPoints: [
        'Define social engineering.',
        'Explain the **lifecycle** and **techniques**.',
        'Explain psychological levers.',
        'List countermeasures.',
      ],
      questions: [
        {
          prompt: 'What is social engineering? Explain its techniques and countermeasures.',
          plan: ANSWER_PLAN(
            'Manipulating people to reveal information or grant access',
            'Investigation → hook → play → exit',
            'Phishing, pretexting, baiting, tailgating; psychological levers',
            'Fake manager calling help desk',
            'Training, verification, physical controls, reporting',
          ),
        },
      ],
      keywords: ['social engineering', 'pretexting', 'baiting', 'quid pro quo', 'tailgating', 'authority', 'urgency', 'awareness training'],
      remember: [
        { prompt: 'Following someone through a secure door is called?', answer: 'Tailgating (piggybacking).' },
        { prompt: 'Two levers social engineers use?', answer: 'Authority and urgency.' },
        { prompt: 'Main defence against social engineering?', answer: 'Awareness training plus verification procedures.' },
      ],
    },

    // ------------------------------------------------------------------
    'identifying-and-detecting-breaches': {
      difficulty: 'medium',
      intro: 'The sooner a breach is detected, the smaller the damage. Know the signs and the tools.',
      definition:
        'A **security breach** is an incident in which unauthorised access to systems or data has occurred. **Identifying and detecting breaches** means recognising **indicators of compromise (IoCs)** through monitoring tools such as **SIEM, IDS/IPS, EDR** and log analysis, as well as reports from users and third parties.',
      simpleExplanation: {
        text: 'Attackers try to stay hidden, so organisations watch for clues: strange logins, unusual traffic, unknown programs, changed files. Collecting and correlating these clues reveals a breach.',
        analogy: 'Like a bank’s CCTV, alarms and audit of the cash register — together they show that something went wrong.',
      },
      visual: {
        type: 'flow',
        title: 'From signal to confirmed breach',
        steps: [
          { label: 'Collect', note: 'logs, network, endpoints' },
          { label: 'Correlate', note: 'SIEM rules and analytics' },
          { label: 'Alert', note: 'suspicious pattern' },
          { label: 'Triage', note: 'analyst investigates' },
          { label: 'Confirm', note: 'breach declared, response starts' },
        ],
      },
      explanation: [
        { heading: 'Indicators of compromise' },
        {
          list: [
            'Logins at unusual times or from unusual locations; impossible travel.',
            'Many failed logins followed by a success.',
            'New admin accounts or privilege changes.',
            'Unusual outbound traffic or large data transfers.',
            'Unknown processes, services or scheduled tasks.',
            'Disabled antivirus or cleared logs.',
            'Unexpected changes to files or web pages.',
            'Users reporting strange pop-ups or locked files; customers reporting fraud.',
          ],
        },
        { heading: 'Detection tools' },
        {
          table: {
            columns: ['Tool', 'What it does'],
            rows: [
              ['SIEM', 'Collects and correlates logs from many sources; raises alerts'],
              ['IDS / IPS', 'Detects (and IPS blocks) suspicious network traffic'],
              ['EDR', 'Monitors endpoints for malicious behaviour and supports response'],
              ['File integrity monitoring', 'Alerts when critical files change'],
              ['DLP', 'Detects sensitive data leaving the organisation'],
              ['Threat intelligence', 'Known bad IPs, domains and file hashes to match against'],
            ],
          },
        },
        { heading: 'Detection approaches' },
        '**Signature-based** detection matches known attack patterns — accurate for known threats but misses new ones. **Anomaly-based** detection flags deviations from normal behaviour — can catch new attacks but produces more false positives.',
        { tip: 'Good logging is the foundation: without logs there is nothing to detect and no evidence to investigate.' },
      ],
      example: {
        title: 'Triage of a SIEM alert',
        input: 'Alert: an accounts user logged in from another country at 2 a.m., then downloaded 5,000 customer records.',
        output: `IoCs        : unusual location and time, abnormal data volume
Triage      : confirm with user — not them → account compromised
Declare     : security breach
Next steps  : disable account, preserve logs, start incident response`,
        explanation: 'Correlating several weak signals turns them into a strong, actionable alert.',
      },
      keyPoints: [
        'Breach = confirmed unauthorised access to systems or data.',
        'Detect through indicators of compromise.',
        'Tools: SIEM, IDS/IPS, EDR, FIM, DLP, threat intelligence.',
        'Signature-based vs anomaly-based detection.',
        'Logging is essential for detection and evidence.',
      ],
      importantTerms: [
        { term: 'IoC', meaning: 'Indicator of compromise — evidence that a system may be breached.' },
        { term: 'SIEM', meaning: 'Security Information and Event Management system.' },
        { term: 'IDS / IPS', meaning: 'Intrusion detection / prevention system.' },
        { term: 'False positive', meaning: 'An alert raised when no real attack occurred.' },
      ],
      examPoints: [
        'Define a security breach.',
        'List **indicators of compromise**.',
        'Explain detection **tools** and **approaches**.',
        'Draw the detection flow.',
      ],
      questions: [
        {
          prompt: 'How are security breaches identified and detected?',
          plan: ANSWER_PLAN(
            'Recognising unauthorised access through indicators and monitoring',
            'Collect → correlate → alert → triage → confirm',
            'IoCs; SIEM, IDS/IPS, EDR, DLP; signature vs anomaly',
            'Unusual 2 a.m. login and bulk download',
            'Logging is the foundation; quick detection limits damage',
          ),
        },
      ],
      keywords: ['security breach', 'indicator of compromise', 'SIEM', 'IDS', 'IPS', 'EDR', 'signature-based', 'anomaly-based', 'false positive'],
      remember: [
        { prompt: 'Expand SIEM.', answer: 'Security Information and Event Management.' },
        { prompt: 'Which detection type catches new, unknown attacks?', answer: 'Anomaly-based detection.' },
        { prompt: 'IDS vs IPS?', answer: 'IDS detects and alerts; IPS can also block.' },
      ],
    },

    // ------------------------------------------------------------------
    'steps-in-recovering-from-security-breach': {
      difficulty: 'medium',
      intro: 'A structured response limits damage. Learn the incident response lifecycle and the recovery steps in order.',
      definition:
        'Recovering from a security breach follows an **incident response** process: **preparation**, **detection and analysis**, **containment, eradication and recovery**, and **post-incident activity** (NIST SP 800-61). Practical recovery steps include containing the breach, **resetting devices and credentials**, **reinstalling compromised systems**, restoring data, and **managing stolen information**.',
      simpleExplanation: {
        text: 'First stop the damage from spreading, then remove the attacker, then rebuild and restore, and finally learn from what happened so it does not repeat.',
        analogy: 'Like handling a fire: contain it, put it out, repair the building, then fix the cause and update the fire drill.',
      },
      visual: {
        type: 'process',
        title: 'Steps in recovering from a security breach',
        steps: [
          { label: 'Contain', detail: 'isolate affected systems and accounts' },
          { label: 'Assess', detail: 'scope, entry point, what data was affected; preserve evidence' },
          { label: 'Notify', detail: 'management, CERT-In, regulators, affected people as required' },
          { label: 'Eradicate', detail: 'remove malware and attacker access; reset devices and credentials' },
          { label: 'Recover', detail: 'reinstall systems, restore clean backups, monitor closely' },
          { label: 'Manage stolen information', detail: 'support victims, prevent misuse' },
          { label: 'Learn', detail: 'root cause, lessons learned, improve controls' },
        ],
      },
      explanation: [
        { heading: 'NIST incident response lifecycle' },
        {
          table: {
            columns: ['Phase', 'Key actions'],
            rows: [
              ['Preparation', 'Plan, team, tools, backups, training'],
              ['Detection and analysis', 'Identify, confirm and scope the incident'],
              ['Containment, eradication and recovery', 'Limit spread, remove the threat, restore operations'],
              ['Post-incident activity', 'Lessons learned, report, improve'],
            ],
          },
        },
        { heading: 'Important principles' },
        {
          list: [
            '**Preserve evidence** before wiping systems — take images and keep logs.',
            '**Contain first** — short-term (isolate) then long-term (temporary fixes).',
            '**Find the root cause** before restoring, or the attacker will return.',
            '**Communicate** clearly with management, staff, customers and authorities.',
            'In India, report specified incidents to **CERT-In** within **6 hours** of noticing them.',
          ],
        },
        { note: 'The three syllabus steps — resetting devices, reinstalling systems and managing stolen information — are covered as separate topics next.' },
      ],
      example: {
        title: 'Recovery plan for a compromised web server',
        input: 'A college web server was defaced and student data may have been accessed.',
        output: `Contain   : take site offline, block attacker IPs
Assess    : image the server, review logs, identify entry (outdated plugin)
Notify    : management, CERT-In, affected students as required
Eradicate : reset all admin passwords and keys
Recover   : rebuild server, patch, restore content from clean backup
Learn     : add patch schedule and WAF; update response plan`,
        explanation: 'Following the steps in order prevents mistakes such as wiping evidence or restoring a still-vulnerable system.',
      },
      keyPoints: [
        'NIST lifecycle: preparation; detection and analysis; containment, eradication and recovery; post-incident.',
        'Recovery steps: contain, assess, notify, eradicate, recover, manage stolen info, learn.',
        'Preserve evidence before wiping.',
        'Fix the root cause before restoring.',
        'Report to CERT-In within 6 hours in India.',
      ],
      importantTerms: [
        { term: 'Incident response', meaning: 'Organised approach to handling and recovering from security incidents.' },
        { term: 'Containment', meaning: 'Limiting the spread and impact of an incident.' },
        { term: 'Eradication', meaning: 'Removing the cause of the incident, such as malware or attacker access.' },
        { term: 'Root cause', meaning: 'The underlying weakness that allowed the breach.' },
      ],
      examPoints: [
        'Draw the **recovery steps** in order.',
        'Explain the **NIST incident response** phases.',
        'Stress evidence preservation, root cause and notification.',
      ],
      questions: [
        {
          prompt: 'Explain the steps in recovering from a security breach.',
          plan: ANSWER_PLAN(
            'Structured incident response to restore secure operation',
            'Recovery process diagram',
            'NIST phases; contain, assess, notify, eradicate, recover, manage data, learn',
            'Defaced college web server',
            'Preserve evidence; root cause; CERT-In reporting',
          ),
        },
      ],
      keywords: ['incident response', 'containment', 'eradication', 'recovery', 'lessons learned', 'NIST SP 800-61', 'CERT-In', 'root cause'],
      remember: [
        { prompt: 'First step after confirming a breach?', answer: 'Contain it — isolate affected systems.' },
        { prompt: 'Why preserve evidence before wiping?', answer: 'For investigation and possible legal action.' },
        { prompt: 'Last phase of incident response?', answer: 'Post-incident activity (lessons learned).' },
      ],
    },

    // ------------------------------------------------------------------
    'resetting-devices': {
      difficulty: 'easy',
      intro: 'After a breach, every credential and device the attacker might control must be reset — in the right order.',
      definition:
        '**Resetting devices** in breach recovery means returning compromised or potentially compromised devices, accounts and credentials to a **known-good, attacker-free state**: changing passwords, revoking sessions and keys, re-enrolling MFA, updating firmware and, where needed, performing a **factory reset**.',
      simpleExplanation: {
        text: 'If an attacker had your password, a session, or control of your router or phone, simply removing malware is not enough — they may still have a key. Resetting replaces every key and returns devices to a clean state.',
        analogy: 'After a burglary you change all the locks, not just the one that was broken.',
      },
      visual: {
        type: 'process',
        title: 'Order of resetting after a breach',
        steps: [
          { label: 'Preserve evidence', detail: 'image or record before resetting' },
          { label: 'Secure a clean device', detail: 'do resets from a device known to be safe' },
          { label: 'Reset critical accounts first', detail: 'email, admin, banking — new strong unique passwords' },
          { label: 'Revoke sessions and keys', detail: 'sign out everywhere, rotate API keys and certificates' },
          { label: 'Re-enrol MFA', detail: 'remove unknown devices; prefer authenticator apps or keys' },
          { label: 'Reset devices', detail: 'factory reset phones, routers, IoT; update firmware' },
        ],
      },
      explanation: [
        { heading: 'What to reset' },
        {
          table: {
            columns: ['Item', 'Action'],
            rows: [
              ['User passwords', 'Change to strong, unique passwords; prioritise email and admin'],
              ['Sessions and tokens', 'Force sign-out on all devices'],
              ['API keys, SSH keys, certificates', 'Revoke and reissue'],
              ['MFA', 'Remove unknown devices; re-register'],
              ['Mobile phones', 'Factory reset if compromised; restore only trusted apps'],
              ['Routers and IoT', 'Factory reset, update firmware, change default passwords'],
              ['Service accounts', 'Rotate credentials used by applications'],
            ],
          },
        },
        { trap: 'Do not reset everything before collecting evidence, and do not reset from a device that may still be infected — the new password could be captured again.' },
        { tip: 'Email is reset first because it is used to recover every other account.' },
      ],
      example: {
        title: 'Personal account takeover',
        input: 'A student’s email account was hijacked and used to send spam.',
        output: `1. Use a clean device
2. Change email password; sign out of all sessions
3. Remove unknown recovery phone/email and forwarding rules
4. Enable MFA with an authenticator app
5. Change passwords on any site that reused the old password
6. Scan the original device; reset it if infected`,
        explanation: 'Attackers often add forwarding rules or recovery details to regain access — these must be removed too.',
      },
      keyPoints: [
        'Reset = return devices and credentials to a known-good state.',
        'Preserve evidence first; reset from a clean device.',
        'Prioritise email and admin accounts.',
        'Revoke sessions, keys and certificates; re-enrol MFA.',
        'Factory reset and update firmware on phones, routers, IoT when needed.',
      ],
      importantTerms: [
        { term: 'Credential rotation', meaning: 'Replacing passwords, keys or certificates with new ones.' },
        { term: 'Session revocation', meaning: 'Ending active logins so stolen sessions stop working.' },
        { term: 'Factory reset', meaning: 'Restoring a device to its original manufacturer state.' },
        { term: 'Firmware', meaning: 'Low-level software that controls device hardware.' },
      ],
      examPoints: [
        'Explain **why** devices must be reset after a breach.',
        'List what to reset and the **order**.',
        'Mention evidence preservation and clean-device rule.',
      ],
      questions: [
        {
          prompt: 'Explain the importance and process of resetting devices after a security breach.',
          plan: ANSWER_PLAN(
            'Returning devices and credentials to a known-good state',
            'Ordered reset steps',
            'Passwords, sessions, keys, MFA, factory reset, firmware',
            'Hijacked student email account',
            'Evidence first; reset from clean device; email first',
          ),
        },
      ],
      keywords: ['reset', 'credential rotation', 'session revocation', 'MFA', 'factory reset', 'firmware update', 'API keys'],
      remember: [
        { prompt: 'Which account should be reset first and why?', answer: 'Email — it is used to recover other accounts.' },
        { prompt: 'Why use a clean device for resets?', answer: 'An infected device could capture the new password.' },
        { prompt: 'What must be done before resetting?', answer: 'Preserve evidence.' },
      ],
    },

    // ------------------------------------------------------------------
    'reinstalling-systems': {
      difficulty: 'medium',
      intro: 'When you cannot trust a system any more, the safest fix is to rebuild it from known-good sources.',
      definition:
        '**Reinstalling systems** means **wiping** a compromised system and rebuilding it from **trusted installation media or a verified clean image**, applying all patches and hardening settings, and then restoring data from **backups verified to be clean**, before reconnecting it to the network.',
      simpleExplanation: {
        text: 'After a serious compromise — especially with rootkits or backdoors — you cannot be sure every trace of the attacker has been removed. Reinstalling from scratch guarantees a clean starting point.',
        analogy: 'If you are not sure a water tank is clean after contamination, you empty it, scrub it, and refill it with clean water.',
      },
      visual: {
        type: 'flow',
        title: 'Rebuild process',
        steps: [
          { label: 'Preserve evidence', note: 'forensic image' },
          { label: 'Wipe', note: 'erase disks fully' },
          { label: 'Reinstall', note: 'trusted media or golden image' },
          { label: 'Patch and harden', note: 'before going online' },
          { label: 'Restore data', note: 'from clean backup' },
          { label: 'Monitor', note: 'watch closely for re-entry' },
        ],
      },
      explanation: [
        { heading: 'When to reinstall rather than clean' },
        {
          list: [
            'Rootkits, backdoors or unknown malware are present.',
            'The attacker had **administrator / root** access.',
            'System files or security tools were modified.',
            'You cannot determine everything the attacker changed.',
          ],
        },
        { heading: 'Good practice' },
        {
          list: [
            'Use **golden images** — pre-approved, hardened system templates.',
            'Verify installation media using vendor **checksums/signatures**.',
            'Apply all **patches** and close the original entry point before reconnecting.',
            'Restore data from a backup taken **before the compromise**, and scan it.',
            'Do **not** restore old executables or configuration blindly — they may contain the backdoor.',
            'Use **infrastructure-as-code** or documented builds so systems can be rebuilt quickly.',
          ],
        },
        { trap: 'Restoring from the most recent backup can reintroduce the attacker if that backup was taken after the compromise. Choose a known-clean restore point.' },
      ],
      example: {
        title: 'Rebuilding an infected file server',
        input: 'A file server had a rootkit installed by an attacker with admin rights.',
        output: `Decision : reinstall (rootkit + admin access)
Steps    : forensic image → wipe → install OS from verified media
           → patch → apply hardening baseline
           → restore files from backup dated before the intrusion → scan
           → reconnect with enhanced monitoring`,
        explanation: 'Cleaning a rootkit-infected system is unreliable; rebuilding from trusted sources is safer.',
      },
      keyPoints: [
        'Reinstall when the system can no longer be trusted.',
        'Preserve evidence, wipe, reinstall from trusted media.',
        'Patch and harden before reconnecting.',
        'Restore data from a clean, pre-compromise backup.',
        'Golden images speed up safe rebuilding.',
      ],
      importantTerms: [
        { term: 'Golden image', meaning: 'A pre-configured, hardened, approved system template.' },
        { term: 'Hardening', meaning: 'Reducing attack surface by removing unneeded services and securing settings.' },
        { term: 'Restore point', meaning: 'The backup version chosen for restoring data.' },
        { term: 'Checksum', meaning: 'A value used to verify that a file has not been altered.' },
      ],
      examPoints: [
        'Explain **when** to reinstall instead of cleaning.',
        'List the **rebuild steps** in order.',
        'Warn about restoring compromised backups.',
      ],
      questions: [
        {
          prompt: 'Explain reinstalling systems as a step in breach recovery.',
          plan: ANSWER_PLAN(
            'Wiping and rebuilding a compromised system from trusted sources',
            'Rebuild flow',
            'When to reinstall; golden images; patching; clean restore',
            'Rootkit-infected file server',
            'Do not restore compromised backups or executables',
          ),
        },
      ],
      keywords: ['reinstall', 'wipe', 'golden image', 'hardening', 'trusted media', 'clean backup', 'rootkit', 'restore point'],
      remember: [
        { prompt: 'When is reinstalling preferred to cleaning?', answer: 'When rootkits/backdoors exist or the attacker had admin rights.' },
        { prompt: 'What must be done before reconnecting a rebuilt system?', answer: 'Patch and harden it.' },
        { prompt: 'Which backup should be restored?', answer: 'One taken before the compromise, scanned clean.' },
      ],
    },

    // ------------------------------------------------------------------
    'managing-stolen-information': {
      difficulty: 'medium',
      intro: 'Once data is out, you cannot take it back — but you can limit how it is misused and support the people affected.',
      definition:
        '**Managing stolen information** is the part of breach recovery that deals with data already exfiltrated: determining **what was stolen and whose it is**, **notifying** affected people and authorities as required by law, **reducing misuse** (credential resets, card reissue, fraud monitoring), and supporting victims.',
      simpleExplanation: {
        text: 'Find out exactly what was taken. Tell the people affected and the authorities. Change whatever can be changed — passwords, cards, keys — so the stolen copies become useless, and watch for signs of misuse.',
        analogy: 'If your bag with your ID cards is stolen, you list what was inside, file a police report, block your cards and watch your accounts.',
      },
      visual: {
        type: 'process',
        title: 'Handling stolen data',
        steps: [
          { label: 'Identify', detail: 'which data, how many people, how sensitive' },
          { label: 'Notify', detail: 'CERT-In, Data Protection Board, affected individuals as required' },
          { label: 'Invalidate', detail: 'reset passwords, reissue cards, rotate keys' },
          { label: 'Monitor', detail: 'fraud alerts, dark-web monitoring, account activity' },
          { label: 'Support', detail: 'helpline, guidance, credit monitoring' },
          { label: 'Take down', detail: 'request removal of leaked data where possible' },
        ],
      },
      explanation: [
        { heading: 'Legal obligations in India' },
        {
          list: [
            '**CERT-In directions (2022)**: report specified cyber incidents within **6 hours** of noticing them.',
            '**Digital Personal Data Protection Act 2023**: a Data Fiduciary must intimate a personal data breach to the **Data Protection Board** and to each **affected Data Principal**. Failure to take reasonable security safeguards can attract penalties of up to **₹250 crore**.',
            '**IT Act Section 43A**: liability to pay compensation for negligence in protecting sensitive personal data.',
          ],
        },
        { heading: 'Actions by data type' },
        {
          table: {
            columns: ['Stolen data', 'Action'],
            rows: [
              ['Passwords', 'Force reset; check for reuse on other sites'],
              ['Card details', 'Block and reissue cards; monitor transactions'],
              ['ID numbers', 'Advise victims to watch for loan/SIM fraud; lock biometrics where available'],
              ['API keys / secrets', 'Revoke and rotate immediately'],
              ['Confidential business data', 'Legal action, takedown requests, inform partners'],
            ],
          },
        },
        { heading: 'Advice for individuals' },
        'Change passwords, enable MFA, watch bank statements and credit reports, be alert for phishing that uses the leaked data, and report misuse to **1930 / cybercrime.gov.in**.',
        { tip: 'Breach notifications should be clear and honest: what happened, what data, what the organisation is doing, and what individuals should do.' },
      ],
      example: {
        title: 'E-commerce customer database leak',
        input: 'An online store finds that names, emails, phone numbers and hashed passwords of customers were copied.',
        output: `Identify : 3 data types, all customers affected, passwords hashed
Notify   : CERT-In within 6 hours; Data Protection Board and customers
Invalidate: force password reset at next login
Monitor  : watch for phishing using the store's name
Support  : FAQ page and helpline for customers`,
        explanation: 'The data cannot be recovered, but making it less useful and warning customers reduces harm.',
      },
      keyPoints: [
        'Identify what was stolen and whose it is.',
        'Notify authorities and affected people as required by law.',
        'Make stolen data useless: reset, reissue, rotate.',
        'Monitor for misuse and support victims.',
        'India: CERT-In 6-hour rule; DPDP Act 2023 breach intimation; IT Act 43A.',
      ],
      importantTerms: [
        { term: 'Data breach notification', meaning: 'Informing authorities and affected people about a breach.' },
        { term: 'Data Fiduciary', meaning: 'Under the DPDP Act, the entity that decides why and how personal data is processed.' },
        { term: 'Data Principal', meaning: 'Under the DPDP Act, the individual to whom the personal data relates.' },
        { term: 'Takedown request', meaning: 'Asking a site or platform to remove leaked content.' },
      ],
      examPoints: [
        'Explain the **steps** for managing stolen information.',
        'State **legal obligations** in India.',
        'Give actions by data type and advice for individuals.',
      ],
      questions: [
        {
          prompt: 'How should an organisation manage stolen information after a breach?',
          plan: ANSWER_PLAN(
            'Handling exfiltrated data to limit misuse and meet legal duties',
            'Identify → notify → invalidate → monitor → support',
            'Legal obligations; actions per data type; advice to individuals',
            'E-commerce customer database leak',
            'CERT-In, DPDP Act, Section 43A',
          ),
        },
      ],
      keywords: ['stolen information', 'breach notification', 'DPDP Act 2023', 'Data Protection Board', 'CERT-In', 'credential reset', 'monitoring', 'Section 43A'],
      remember: [
        { prompt: 'Within how many hours must specified incidents be reported to CERT-In?', answer: '6 hours.' },
        { prompt: 'Under the DPDP Act, who must be told of a personal data breach?', answer: 'The Data Protection Board and affected Data Principals.' },
        { prompt: 'What to do first if card details were stolen?', answer: 'Block and reissue the cards.' },
      ],
    },
  },
}
