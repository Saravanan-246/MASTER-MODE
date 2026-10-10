// Cyber Security — Unit V: Legal, Ethical and Indian Knowledge Perspectives in Cyber Security.
// Topic ids match the syllabus outline in ../subjects.js (24CSU5CB).
// IKS topics follow textbook 4 (Mahadevan et al., Introduction to Indian
// Knowledge System) and apply its ideas to cyber security ethics.
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
    'Unit V looks at cyber security beyond technology. The legal half covers applying cyber law, meeting compliance duties through security policy, and handling digital evidence so it stands up in court. The ethical half covers responsible use of IT, human values, professional ethics and conduct, and corporate social responsibility. Finally, the Indian Knowledge System offers value frameworks and reasoning methods — the knowledge triangle and Nyaya logic — for ethical decisions and governance in cyberspace.',

  map: [
    { label: 'Law', topics: ['cyber-law-application', 'legal-compliance-and-security-policy', 'cybercrime-evidence-handling'] },
    {
      label: 'Ethics and conduct',
      topics: ['ethical-use-of-it-resources', 'human-values-and-professional-ethics', 'professional-conduct', 'corporate-social-responsibility-csr'],
    },
    { label: 'IKS foundations', topics: ['iks-in-cyber-security-ethics', 'vedic-corpus-and-knowledge-traditions'] },
    {
      label: 'IKS reasoning and values',
      topics: ['knowledge-triangle', 'deductive-and-inductive-logic-framework', 'role-of-iks-in-ethical-decision-making-and-governance'],
    },
  ],

  topics: {
    // ------------------------------------------------------------------
    'cyber-law-application': {
      difficulty: 'medium',
      intro: 'Knowing sections is not enough — you must be able to apply the right law to a real incident.',
      definition:
        '**Cyber law application** is the process of applying legal provisions — mainly the **Information Technology Act 2000** with related criminal, evidence and data-protection laws — to real cyber incidents: identifying the offence, the applicable sections, the jurisdiction, the investigating authority and the remedy (criminal punishment or civil compensation).',
      simpleExplanation: {
        text: 'When a cyber incident happens, ask: what exactly was done, which law covers it, who can investigate, where can the case be heard, and what can the victim get — punishment of the offender, compensation, or both?',
        analogy: 'A doctor diagnoses the illness, then picks the right medicine. A lawyer identifies the offence, then picks the right section.',
      },
      visual: {
        type: 'process',
        title: 'Applying cyber law to an incident',
        steps: [
          { label: 'Establish facts', detail: 'what happened, when, which systems and people' },
          { label: 'Identify the offence', detail: 'unauthorised access, identity theft, fraud, privacy violation' },
          { label: 'Map to provisions', detail: 'IT Act sections plus related criminal and data laws' },
          { label: 'Jurisdiction and authority', detail: 'police, cyber cell, adjudicating officer, court' },
          { label: 'Evidence', detail: 'collect and certify electronic records' },
          { label: 'Remedy', detail: 'compensation, punishment, takedown, injunction' },
        ],
      },
      explanation: [
        { heading: 'Laws commonly applied' },
        {
          table: {
            columns: ['Law', 'Used for'],
            rows: [
              ['IT Act 2000 (amended 2008)', 'Cyber contraventions and offences, intermediaries, e-signatures'],
              ['Bharatiya Nyaya Sanhita 2023', 'General offences such as cheating, extortion, defamation (replaced the IPC)'],
              ['Bharatiya Sakshya Adhiniyam 2023', 'Admissibility of electronic evidence (replaced the Indian Evidence Act)'],
              ['DPDP Act 2023', 'Protection of digital personal data'],
              ['Copyright Act 1957', 'Software piracy and content infringement'],
            ],
          },
        },
        { heading: 'Civil vs criminal remedies under the IT Act' },
        {
          list: [
            '**Civil** — compensation for contraventions (e.g. Sections 43, 43A) decided by an **adjudicating officer** (claims up to ₹5 crore) or a civil court beyond that.',
            '**Criminal** — offences (e.g. Sections 66, 66C, 66D, 67) investigated by police; under Section 78, by an officer not below the rank of **Inspector**.',
            '**Extra-territorial reach** — Section 75 applies the Act to offences outside India involving a computer in India.',
          ],
        },
        { heading: 'Important judgments' },
        {
          list: [
            '**Shreya Singhal v. Union of India (2015)** — struck down Section 66A (offensive messages) for violating free speech.',
            '**Justice K.S. Puttaswamy v. Union of India (2017)** — recognised privacy as a fundamental right.',
          ],
        },
      ],
      example: {
        title: 'Applying the law to a case',
        input: 'A person creates a fake social media profile of a college professor, posts her photos and messages students asking for money.',
        output: `Offences : identity theft, cheating by personation, privacy violation
IT Act   : 66C (identity), 66D (personation), 66E if private images are used
Also     : cheating provisions of the BNS
Actions  : complaint on cybercrime.gov.in, platform takedown request,
           preserve screenshots and URLs as evidence`,
        explanation: 'One incident often attracts several sections, and both legal action and platform remedies are used together.',
      },
      keyPoints: [
        'Apply law by: facts → offence → sections → jurisdiction → evidence → remedy.',
        'IT Act is applied with BNS, BSA, DPDP Act and Copyright Act.',
        'Civil compensation via adjudicating officer; criminal offences via police and courts.',
        'Section 75: extra-territorial application.',
        'Key cases: Shreya Singhal (2015), Puttaswamy (2017).',
      ],
      importantTerms: [
        { term: 'Adjudicating officer', meaning: 'Officer under the IT Act who decides compensation claims.' },
        { term: 'Jurisdiction', meaning: 'Authority of a court or agency over a matter.' },
        { term: 'Contravention', meaning: 'A breach attracting civil penalty or compensation.' },
        { term: 'Offence', meaning: 'An act punishable with imprisonment and/or fine.' },
      ],
      examPoints: [
        'Explain the **steps** of applying cyber law.',
        'List **laws** used alongside the IT Act.',
        'Distinguish **civil and criminal** remedies.',
        'Apply sections to a **case**.',
      ],
      questions: [
        {
          prompt: 'Explain how cyber laws are applied to cybercrime cases in India.',
          plan: ANSWER_PLAN(
            'Applying legal provisions to real cyber incidents',
            'Facts → offence → sections → authority → evidence → remedy',
            'Laws used; civil vs criminal; Section 75; key cases',
            'Fake profile of a professor',
            'Multiple sections may apply together',
          ),
        },
      ],
      keywords: ['cyber law', 'IT Act 2000', 'adjudicating officer', 'Section 78', 'Section 75', 'BNS 2023', 'BSA 2023', 'Shreya Singhal', 'Puttaswamy'],
      remember: [
        { prompt: 'Who decides IT Act compensation claims up to ₹5 crore?', answer: 'The adjudicating officer.' },
        { prompt: 'Minimum police rank to investigate IT Act offences?', answer: 'Inspector (Section 78).' },
        { prompt: 'Which case made privacy a fundamental right?', answer: 'Justice K.S. Puttaswamy v. Union of India (2017).' },
      ],
    },

    // ------------------------------------------------------------------
    'legal-compliance-and-security-policy': {
      difficulty: 'medium',
      intro: 'Laws say what an organisation must achieve; security policy is how it builds those duties into daily rules.',
      definition:
        '**Legal compliance** is conformance with laws, regulations, contracts and mandatory standards that apply to an organisation’s handling of information. The **security policy** is the main internal instrument for compliance: it translates legal requirements into rules, controls, responsibilities and evidence that can be audited.',
      simpleExplanation: {
        text: 'A law might say “protect personal data with reasonable security”. The policy turns that into specifics — encrypt customer data, give access only on need-to-know, report breaches within the required time — and audits check that it is actually done.',
        analogy: 'Traffic law says drive safely; a transport company’s policy turns that into speed limits for its drivers, rest breaks and vehicle checks.',
      },
      visual: {
        type: 'flow',
        title: 'From legal requirement to proof of compliance',
        steps: [
          { label: 'Identify obligations', note: 'laws, regulations, contracts' },
          { label: 'Write policy', note: 'rules and responsibilities' },
          { label: 'Implement controls', note: 'technical and procedural' },
          { label: 'Audit and monitor', note: 'collect evidence' },
          { label: 'Report and improve', note: 'fix gaps, update policy' },
        ],
      },
      explanation: [
        { heading: 'Key compliance requirements in India' },
        {
          table: {
            columns: ['Source', 'Main requirements'],
            rows: [
              ['IT Act Section 43A + SPDI Rules 2011', 'Reasonable security practices for sensitive personal data; ISO/IEC 27001 is cited as one such standard'],
              ['DPDP Act 2023', 'Lawful processing with consent or legitimate use, purpose limitation, reasonable security safeguards, breach intimation, rights of Data Principals'],
              ['CERT-In Directions 2022', 'Report specified incidents within 6 hours; keep logs for 180 days within India; synchronise system clocks'],
              ['Sector regulators', 'e.g. RBI cyber security framework for banks'],
            ],
          },
        },
        { heading: 'Global requirements' },
        '**GDPR** for personal data of people in the EU, **PCI DSS** for organisations handling payment card data, and contractual security clauses from clients.',
        { heading: 'How policy supports compliance' },
        {
          list: [
            'Assigns **accountability** (data owner, DPO, CISO).',
            'Defines controls: access control, encryption, logging, retention, incident reporting.',
            'Requires **training** so staff know their duties.',
            'Creates **evidence** — logs, records, audit reports — to prove compliance.',
            'Is **reviewed** when laws change.',
          ],
        },
        { trap: 'Being compliant does not automatically mean being secure. Compliance is the minimum; good security goes beyond it based on risk.' },
      ],
      example: {
        title: 'Turning the 6-hour rule into policy',
        input: 'Requirement: report specified incidents to CERT-In within 6 hours.',
        output: `Policy  : "All suspected incidents must be reported to the security team immediately."
Procedure: on-call team triages within 2 hours; CISO approves CERT-In report
Control : 24x7 monitoring, report template ready, contact list maintained
Evidence: incident tickets with timestamps reviewed in audit`,
        explanation: 'A legal deadline becomes a set of internal steps that make meeting it realistic.',
      },
      keyPoints: [
        'Compliance = conformance with laws, regulations, contracts and standards.',
        'Security policy translates legal duties into enforceable rules.',
        'India: IT Act 43A + SPDI Rules, DPDP Act 2023, CERT-In Directions 2022.',
        'Global: GDPR, PCI DSS.',
        'Compliance is the minimum, not the whole of security.',
      ],
      importantTerms: [
        { term: 'Compliance', meaning: 'Meeting legal, regulatory and contractual requirements.' },
        { term: 'Reasonable security practices', meaning: 'Security measures expected by law to protect sensitive data.' },
        { term: 'Audit', meaning: 'Independent check of whether controls meet requirements.' },
        { term: 'DPO', meaning: 'Data Protection Officer — oversees data protection compliance.' },
      ],
      examPoints: [
        'Define legal compliance and its link with **security policy**.',
        'List Indian and global **requirements**.',
        'Explain the compliance **cycle**.',
        'Note that compliance ≠ security.',
      ],
      questions: [
        {
          prompt: 'Explain the role of security policy in achieving legal compliance.',
          plan: ANSWER_PLAN(
            'Compliance and policy as its internal instrument',
            'Obligations → policy → controls → audit → improve',
            'IT Act 43A, SPDI Rules, DPDP Act, CERT-In directions; GDPR, PCI DSS',
            'CERT-In 6-hour rule turned into procedure',
            'Accountability, evidence, review; compliance is the minimum',
          ),
        },
      ],
      keywords: ['legal compliance', 'security policy', 'Section 43A', 'SPDI Rules 2011', 'DPDP Act 2023', 'CERT-In Directions', 'GDPR', 'PCI DSS', 'audit'],
      remember: [
        { prompt: 'How long must logs be kept under the CERT-In Directions 2022?', answer: '180 days, within India.' },
        { prompt: 'Which standard do the SPDI Rules cite as a reasonable security practice?', answer: 'ISO/IEC 27001.' },
        { prompt: 'Does compliance guarantee security?', answer: 'No — it is a minimum baseline.' },
      ],
    },

    // ------------------------------------------------------------------
    'cybercrime-evidence-handling': {
      difficulty: 'hard',
      intro: 'Digital evidence is fragile. If it is not handled properly, it may be rejected in court.',
      definition:
        '**Cybercrime evidence handling** is the forensically sound **identification, preservation, collection, examination, analysis and presentation** of digital evidence so that its **integrity and authenticity** can be proved. It relies on **chain of custody**, **forensic imaging**, **hash values** and, in India, a certificate for electronic records under **Section 63 of the Bharatiya Sakshya Adhiniyam 2023** (earlier Section 65B of the Indian Evidence Act).',
      simpleExplanation: {
        text: 'Digital evidence can be changed by simply opening a file. Investigators therefore copy the original exactly, prove the copy is identical with a hash value, work only on the copy, and record every person who handled the evidence.',
        analogy: 'Like a blood sample: sealed, labelled, signed for at every handover and tested only in a proper lab — otherwise the result is not trusted.',
      },
      visual: {
        type: 'process',
        title: 'Digital forensic process',
        steps: [
          { label: 'Identification', detail: 'find devices and data sources that may hold evidence' },
          { label: 'Preservation', detail: 'isolate, prevent changes, document the scene' },
          { label: 'Collection', detail: 'forensic image with write blocker; compute hash' },
          { label: 'Examination', detail: 'extract relevant data from the copy' },
          { label: 'Analysis', detail: 'reconstruct events, link to suspects' },
          { label: 'Reporting', detail: 'present findings with certificate and chain of custody' },
        ],
      },
      explanation: [
        { heading: 'Characteristics of digital evidence' },
        '**Volatile** (lost on power-off), **easily altered**, **latent** (needs tools to read), can be **copied without loss**, and often spread across devices and countries.',
        { heading: 'ACPO principles for digital evidence' },
        {
          list: [
            'No action should **change data** that may later be relied on in court.',
            'If original data must be accessed, it must be done by a **competent person** who can explain the effect of their actions.',
            'An **audit trail** of all processes must be kept so a third party can repeat them and get the same result.',
            'The person in charge of the investigation is **responsible** for ensuring these principles are followed.',
          ],
          ordered: true,
        },
        { heading: 'Key techniques' },
        {
          table: {
            columns: ['Technique', 'Purpose'],
            rows: [
              ['Write blocker', 'Prevents any write to the original storage during copying'],
              ['Forensic (bit-stream) image', 'Exact copy including deleted and unallocated space'],
              ['Hash value (e.g. SHA-256)', 'Proves the copy is identical to the original'],
              ['Chain of custody form', 'Records who handled evidence, when and why'],
              ['Order of volatility', 'Collect most volatile data (memory, network state) first'],
            ],
          },
        },
        { heading: 'Legal admissibility in India' },
        'Electronic records are admissible with a **certificate** describing how the record was produced. The Supreme Court in **Arjun Panditrao Khotkar (2020)** held that the certificate (then under Section 65B(4)) is mandatory when secondary electronic evidence is relied upon. Section 79A of the IT Act allows the government to notify **Examiners of Electronic Evidence**.',
        { trap: 'Never examine the original device directly. Switching it on, browsing files or running antivirus can change timestamps and destroy evidence.' },
      ],
      example: {
        title: 'Seizing a suspect’s laptop',
        input: 'Police find a running laptop during a fraud raid.',
        output: `1. Photograph the screen and setup; note time
2. Capture volatile memory (RAM) before shutdown
3. Seal, label and log in chain-of-custody form
4. In the lab: write blocker → forensic image → SHA-256 of original and image
5. Analyse only the image; hashes must match at every stage
6. Prepare report and electronic-record certificate`,
        explanation: 'Matching hashes and an unbroken chain of custody prove the evidence was not altered.',
      },
      keyPoints: [
        'Process: identify, preserve, collect, examine, analyse, report.',
        'ACPO principles: no change, competent person, audit trail, responsibility.',
        'Write blocker + forensic image + hash value.',
        'Chain of custody records every handover.',
        'India: certificate under BSA Section 63 (earlier IEA 65B) for electronic records.',
      ],
      importantTerms: [
        { term: 'Chain of custody', meaning: 'Documented record of who handled evidence, when and why.' },
        { term: 'Forensic image', meaning: 'Bit-for-bit copy of a storage device.' },
        { term: 'Hash value', meaning: 'Fixed-length fingerprint used to prove data is unchanged.' },
        { term: 'Write blocker', meaning: 'Device that allows reading but prevents writing to storage.' },
      ],
      examPoints: [
        'Explain the **forensic process** stages.',
        'State the **ACPO principles**.',
        'Explain **chain of custody** and **hashing**.',
        'Mention legal admissibility (certificate, Section 65B / BSA 63).',
      ],
      questions: [
        {
          prompt: 'Explain how cybercrime evidence should be handled to be admissible in court.',
          plan: ANSWER_PLAN(
            'Forensically sound handling of digital evidence',
            'Six-stage forensic process',
            'Characteristics; ACPO principles; write blocker, imaging, hashing, chain of custody',
            'Seizing a running laptop',
            'Certificate requirement; never work on the original',
          ),
        },
      ],
      keywords: ['digital evidence', 'chain of custody', 'forensic image', 'hash value', 'write blocker', 'order of volatility', 'ACPO principles', 'Section 65B', 'BSA Section 63'],
      remember: [
        { prompt: 'What proves a forensic copy is identical to the original?', answer: 'Matching hash values.' },
        { prompt: 'What records every handover of evidence?', answer: 'The chain of custody.' },
        { prompt: 'Which data is collected first?', answer: 'The most volatile, such as RAM.' },
      ],
    },

    // ------------------------------------------------------------------
    'ethical-use-of-it-resources': {
      difficulty: 'easy',
      intro: 'Legal is not always ethical. This topic covers how to use computers responsibly.',
      definition:
        '**Ethical use of IT resources** means using computers, networks, software and data in ways that are honest, respectful of others’ rights and privacy, within authorised limits, and beneficial rather than harmful. Organisations express it through an **acceptable use policy**; a widely quoted guide is the **Ten Commandments of Computer Ethics** (Computer Ethics Institute, 1992).',
      simpleExplanation: {
        text: 'Just because you can access something does not mean you should. Reading a classmate’s files on a shared PC, using office systems for personal business, or copying paid software are unethical even when easy.',
        analogy: 'A library card lets you borrow books, not tear pages or read someone else’s borrowing history.',
      },
      visual: {
        type: 'comparison',
        title: 'Ethical vs unethical use',
        items: [
          {
            title: 'Ethical',
            tone: 'good',
            points: ['Use only authorised access', 'Respect privacy and confidentiality', 'Use licensed software', 'Report vulnerabilities responsibly', 'Credit others’ work'],
          },
          {
            title: 'Unethical',
            tone: 'bad',
            points: ['Snooping in others’ files', 'Sharing passwords', 'Piracy and plagiarism', 'Using work systems for personal profit', 'Spreading harmful content'],
          },
        ],
      },
      explanation: [
        { heading: 'Ten Commandments of Computer Ethics' },
        {
          list: [
            'Do not use a computer to harm other people.',
            'Do not interfere with other people’s computer work.',
            'Do not snoop around in other people’s computer files.',
            'Do not use a computer to steal.',
            'Do not use a computer to bear false witness.',
            'Do not copy or use proprietary software for which you have not paid.',
            'Do not use other people’s computer resources without authorisation or proper compensation.',
            'Do not appropriate other people’s intellectual output.',
            'Think about the social consequences of the program you are writing or the system you are designing.',
            'Always use a computer in ways that ensure consideration and respect for others.',
          ],
          ordered: true,
        },
        { heading: 'Key ethical issues in IT' },
        '**Privacy** (collecting and using personal data fairly), **intellectual property**, **accuracy** of information, **access** (digital divide), **responsible disclosure** of vulnerabilities, and **misuse of privileged access** by administrators.',
        { tip: 'A useful test: would you be comfortable if your action were known to the affected person, your employer and the public?' },
      ],
      example: {
        title: 'An administrator’s dilemma',
        input: 'A system administrator can read every employee’s email and is curious about a colleague’s salary discussion.',
        output: `Technically possible : yes (admin rights)
Ethical?             : no — breaks privacy and purpose of access
Right action         : access mailboxes only for authorised, logged tasks`,
        explanation: 'Privileged access is given for a purpose; using it beyond that purpose is unethical and often a policy violation.',
      },
      keyPoints: [
        'Ethical use = honest, authorised, respectful and beneficial use of IT.',
        'Expressed through acceptable use policies.',
        'Ten Commandments of Computer Ethics (1992) are a classic guide.',
        'Issues: privacy, IP, accuracy, access, disclosure, privileged access.',
      ],
      importantTerms: [
        { term: 'Computer ethics', meaning: 'Moral principles governing the use of computers.' },
        { term: 'Responsible disclosure', meaning: 'Reporting a vulnerability privately to the owner before making it public.' },
        { term: 'Privileged access', meaning: 'Elevated rights such as administrator access.' },
      ],
      examPoints: [
        'Define ethical use of IT resources.',
        'List the **Ten Commandments of Computer Ethics**.',
        'Discuss key ethical issues with examples.',
      ],
      questions: [
        {
          prompt: 'Discuss the ethical use of IT resources with reference to the Ten Commandments of Computer Ethics.',
          plan: ANSWER_PLAN(
            'Honest, authorised and respectful use of IT',
            'Ethical vs unethical comparison',
            'Ten Commandments; privacy, IP, access, disclosure',
            'Administrator reading emails',
            'AUP; privileged access for its purpose only',
          ),
        },
      ],
      keywords: ['computer ethics', 'acceptable use', 'Ten Commandments', 'privacy', 'intellectual property', 'responsible disclosure', 'privileged access'],
      remember: [
        { prompt: 'Who published the Ten Commandments of Computer Ethics?', answer: 'The Computer Ethics Institute (1992).' },
        { prompt: 'Is using pirated software ethical if no one finds out?', answer: 'No — it breaks commandment 6.' },
        { prompt: 'What is responsible disclosure?', answer: 'Reporting a flaw privately to the owner before going public.' },
      ],
    },

    // ------------------------------------------------------------------
    'human-values-and-professional-ethics': {
      difficulty: 'easy',
      intro: 'Security professionals hold powerful access. Their values decide whether that power protects or harms.',
      definition:
        '**Human values** are the basic principles — such as honesty, integrity, respect, responsibility, fairness and empathy — that guide a person’s behaviour. **Professional ethics** are the standards of right conduct expected of members of a profession, often written as **codes of ethics**, such as the **ACM Code of Ethics** and the **(ISC)² Code of Ethics**.',
      simpleExplanation: {
        text: 'Values are personal: being honest even when no one is watching. Professional ethics apply those values to work: a security analyst keeps client data confidential, reports findings truthfully and never uses skills to cause harm.',
        analogy: 'A doctor’s personal kindness (value) and the medical oath to “do no harm” (professional ethic) work together.',
      },
      visual: {
        type: 'architecture',
        title: 'From values to professional behaviour',
        layers: [
          { label: 'Human values', items: ['Honesty', 'Integrity', 'Respect', 'Responsibility', 'Fairness', 'Empathy'] },
          { label: 'Professional ethics', items: ['Codes of ethics', 'Avoid harm', 'Confidentiality', 'Competence'] },
          { label: 'Professional conduct', items: ['Daily behaviour at work', 'Decisions under pressure'] },
        ],
      },
      explanation: [
        { heading: 'ACM Code of Ethics (2018) — general principles' },
        {
          list: [
            'Contribute to society and to human well-being.',
            'Avoid harm.',
            'Be honest and trustworthy.',
            'Be fair and take action not to discriminate.',
            'Respect the work required to produce new ideas and creations.',
            'Respect privacy.',
            'Honour confidentiality.',
          ],
        },
        { heading: '(ISC)² Code of Ethics — four canons' },
        {
          list: [
            'Protect society, the common good, necessary public trust and confidence, and the infrastructure.',
            'Act honourably, honestly, justly, responsibly and legally.',
            'Provide diligent and competent service to principals.',
            'Advance and protect the profession.',
          ],
          ordered: true,
        },
        { heading: 'Ethical approaches for decisions' },
        {
          table: {
            columns: ['Approach', 'Asks'],
            rows: [
              ['Duty-based (deontological)', 'What is my duty or rule?'],
              ['Consequence-based (utilitarian)', 'Which action gives the best outcome for most people?'],
              ['Virtue-based', 'What would a person of good character do?'],
            ],
          },
        },
        { heading: 'Common ethical dilemmas in security' },
        'Discovering a vulnerability in someone else’s system, monitoring employees, pressure to hide a breach, and dual-use tools that can protect or attack.',
      ],
      example: {
        title: 'Pressure to hide a breach',
        input: 'A manager asks a security analyst not to report a customer data breach to avoid bad press.',
        output: `Values involved : honesty, responsibility, respect for customers
Code guidance   : protect society; act honestly and legally
Right action    : escalate through proper channels; breach reporting is a legal duty
Outcome         : trust preserved; legal penalties avoided`,
        explanation: 'Professional ethics and the law point in the same direction: report honestly.',
      },
      keyPoints: [
        'Human values: honesty, integrity, respect, responsibility, fairness, empathy.',
        'Professional ethics = standards for a profession, written as codes.',
        'ACM Code: contribute to society, avoid harm, be honest, fair, respect privacy and confidentiality.',
        '(ISC)² four canons: protect society; act honourably; serve principals; advance the profession.',
        'Approaches: duty, consequence, virtue.',
      ],
      importantTerms: [
        { term: 'Integrity', meaning: 'Acting consistently with moral principles.' },
        { term: 'Code of ethics', meaning: 'Written standards of conduct for a profession.' },
        { term: 'Deontology', meaning: 'Ethics based on duties and rules.' },
        { term: 'Utilitarianism', meaning: 'Ethics based on producing the greatest good.' },
      ],
      examPoints: [
        'Define **human values** and **professional ethics**.',
        'Explain the **ACM Code** principles and **(ISC)² canons**.',
        'Discuss ethical approaches and a dilemma.',
      ],
      questions: [
        {
          prompt: 'Explain human values and professional ethics for cyber security professionals.',
          plan: ANSWER_PLAN(
            'Personal principles and professional standards of conduct',
            'Values → ethics → conduct layers',
            'ACM Code; (ISC)² canons; ethical approaches; dilemmas',
            'Pressure to hide a breach',
            'Honesty and protection of society first',
          ),
        },
      ],
      keywords: ['human values', 'professional ethics', 'integrity', 'ACM Code of Ethics', '(ISC)² canons', 'deontology', 'utilitarianism', 'virtue ethics'],
      remember: [
        { prompt: 'First canon of the (ISC)² Code?', answer: 'Protect society, the common good, public trust and the infrastructure.' },
        { prompt: 'Name three ACM Code principles.', answer: 'Avoid harm, be honest and trustworthy, respect privacy.' },
        { prompt: 'Value vs professional ethic?', answer: 'A value is personal; a professional ethic is a standard for the profession.' },
      ],
    },

    // ------------------------------------------------------------------
    'professional-conduct': {
      difficulty: 'easy',
      intro: 'Ethics in action: how a security professional should actually behave at work.',
      definition:
        '**Professional conduct** is the observable behaviour expected of a professional at work — acting only with **authorisation**, maintaining **confidentiality**, avoiding **conflicts of interest**, reporting honestly, maintaining **competence**, and following law, policy and the code of ethics of the profession.',
      simpleExplanation: {
        text: 'Ethics is what you believe is right; professional conduct is what you actually do. For a security professional that means: get written permission before testing, stay within scope, keep client data secret, and report findings truthfully.',
        analogy: 'A trusted electrician only works on wiring you asked them to fix, tells you honestly what is wrong, and never shares what they saw inside your home.',
      },
      visual: {
        type: 'boxes',
        title: 'Pillars of professional conduct',
        items: [
          { label: 'Authorisation', value: 'Act only with permission', tag: 'written scope' },
          { label: 'Confidentiality', value: 'Protect client data', tag: 'NDA' },
          { label: 'Integrity', value: 'Honest reporting', tag: 'no hidden findings' },
          { label: 'Objectivity', value: 'Avoid conflicts of interest', tag: 'declare them' },
          { label: 'Competence', value: 'Keep skills current', tag: 'continuous learning' },
          { label: 'Accountability', value: 'Own mistakes', tag: 'report incidents' },
        ],
      },
      explanation: [
        { heading: 'Good conduct in practice' },
        {
          list: [
            'Obtain **written authorisation** and agreed **rules of engagement** before any security testing.',
            'Stay within the agreed **scope**; stop and ask if something unexpected is found.',
            'Use privileged access only for assigned tasks; keep **logs** of actions.',
            'Sign and honour **non-disclosure agreements**.',
            'Declare **conflicts of interest**.',
            'Follow **responsible disclosure** for vulnerabilities.',
            'Keep learning through training and certifications.',
            'Treat colleagues with respect; avoid harassment and discrimination.',
          ],
        },
        { heading: 'Examples of misconduct' },
        'Testing systems without permission, exceeding scope, selling or leaking client data, hiding mistakes, using insider knowledge for personal gain, and misrepresenting qualifications.',
        { heading: 'Consequences of misconduct' },
        'Disciplinary action, loss of employment, revocation of certifications, civil liability and criminal prosecution (e.g. IT Act Sections 43, 66, 72).',
      ],
      example: {
        title: 'Scope during a penetration test',
        input: 'A tester authorised to test a company’s website discovers credentials that would allow access to its HR database.',
        output: `Out of scope : HR database was not included
Correct      : stop, do not use the credentials, report finding immediately
Wrong        : "just checking" the HR data — breach of scope and law`,
        explanation: 'Professional conduct means respecting limits even when it is technically possible to go further.',
      },
      keyPoints: [
        'Conduct = observable professional behaviour.',
        'Pillars: authorisation, confidentiality, integrity, objectivity, competence, accountability.',
        'Always work within written scope and rules of engagement.',
        'Misconduct can lead to dismissal, loss of certification and prosecution.',
      ],
      importantTerms: [
        { term: 'Rules of engagement', meaning: 'Agreed terms of what may be tested, how and when.' },
        { term: 'Conflict of interest', meaning: 'A situation where personal interest could affect professional judgement.' },
        { term: 'NDA', meaning: 'Non-disclosure agreement.' },
        { term: 'Scope', meaning: 'The defined boundaries of an engagement.' },
      ],
      examPoints: [
        'Define professional conduct and **distinguish it from ethics**.',
        'Explain its **pillars** with examples.',
        'List misconduct and consequences.',
      ],
      questions: [
        {
          prompt: 'What is professional conduct? Explain with reference to cyber security professionals.',
          plan: ANSWER_PLAN(
            'Expected behaviour of professionals at work',
            'Pillars of conduct',
            'Authorisation, confidentiality, integrity, objectivity, competence, accountability',
            'Pen tester finding out-of-scope credentials',
            'Misconduct and its consequences',
          ),
        },
      ],
      keywords: ['professional conduct', 'authorisation', 'rules of engagement', 'scope', 'confidentiality', 'conflict of interest', 'NDA', 'accountability'],
      remember: [
        { prompt: 'What must a tester have before testing?', answer: 'Written authorisation and agreed scope.' },
        { prompt: 'What should you do if you find something out of scope?', answer: 'Stop, do not exploit it, and report it.' },
        { prompt: 'Ethics vs conduct?', answer: 'Ethics is the principle; conduct is the behaviour.' },
      ],
    },

    // ------------------------------------------------------------------
    'corporate-social-responsibility-csr': {
      difficulty: 'easy',
      intro: 'Companies owe more than profit to society — including a safe and fair digital world.',
      definition:
        '**Corporate Social Responsibility (CSR)** is a company’s commitment to operate ethically and contribute to the well-being of society and the environment beyond profit-making. In India, **Section 135 of the Companies Act 2013** makes CSR spending mandatory for qualifying companies: at least **2% of average net profits** of the preceding three years on activities listed in **Schedule VII**.',
      simpleExplanation: {
        text: 'A company uses society’s resources and earns from its customers, so it should give back and avoid harm. In cyberspace this means protecting customer data responsibly and helping people use technology safely.',
        analogy: 'A factory that not only avoids polluting the river but also helps clean it.',
      },
      visual: {
        type: 'architecture',
        title: 'Carroll’s CSR pyramid',
        layers: [
          { label: 'Philanthropic', note: 'desired', items: ['Community programmes', 'Digital literacy drives'] },
          { label: 'Ethical', note: 'expected', items: ['Fair, honest practices', 'Respect for privacy'] },
          { label: 'Legal', note: 'required', items: ['Obey laws', 'Data protection compliance'] },
          { label: 'Economic', note: 'required — the base', items: ['Be profitable and sustainable'] },
        ],
      },
      explanation: [
        { heading: 'CSR under the Companies Act 2013' },
        {
          list: [
            'Applies to companies with **net worth ≥ ₹500 crore**, or **turnover ≥ ₹1,000 crore**, or **net profit ≥ ₹5 crore** in a financial year.',
            'Must spend at least **2%** of average net profits of the preceding three years.',
            'Activities must fall under **Schedule VII** (e.g. education, health, environment, rural development).',
            'A board-level **CSR Committee** oversees policy and spending.',
          ],
        },
        { heading: 'CSR in the digital and cyber context' },
        {
          list: [
            '**Digital literacy and cyber awareness** programmes for students, senior citizens and rural users (under education and skill development).',
            '**Online safety initiatives** for women and children.',
            'Supporting **cyber security skill development**.',
            'Responsible handling of **customer data** and **ethical technology** design (part of ethical responsibility).',
          ],
        },
        { trap: 'Meeting legal data-protection duties is a **legal** responsibility, not CSR spending. CSR goes beyond what the law already requires.' },
      ],
      example: {
        title: 'A cyber-focused CSR project',
        input: 'An IT company eligible under Section 135 plans its CSR activity.',
        output: `Project  : cyber safety training in government schools
Schedule : falls under promoting education
Outcome  : students learn to spot scams, protect accounts, report abuse
Measure  : number trained, follow-up assessment`,
        explanation: 'Such projects use the company’s expertise to reduce cyber harm in society.',
      },
      keyPoints: [
        'CSR = responsibility beyond profit to society and environment.',
        'Companies Act 2013, Section 135: 2% of average net profits for qualifying companies.',
        'Thresholds: net worth ₹500 cr, turnover ₹1,000 cr, or net profit ₹5 cr.',
        'Carroll’s pyramid: economic, legal, ethical, philanthropic.',
        'Cyber CSR: digital literacy, online safety, skill development.',
      ],
      importantTerms: [
        { term: 'CSR', meaning: 'Corporate Social Responsibility.' },
        { term: 'Schedule VII', meaning: 'List of activities eligible as CSR under the Companies Act.' },
        { term: 'CSR Committee', meaning: 'Board committee responsible for CSR policy and spending.' },
        { term: 'Stakeholder', meaning: 'Anyone affected by a company’s actions.' },
      ],
      examPoints: [
        'Define CSR.',
        'Explain **Section 135** provisions and thresholds.',
        'Draw **Carroll’s pyramid**.',
        'Give cyber-related CSR examples.',
      ],
      questions: [
        {
          prompt: 'Explain Corporate Social Responsibility with reference to cyber security.',
          plan: ANSWER_PLAN(
            'A company’s responsibility to society beyond profit',
            'Carroll’s CSR pyramid',
            'Companies Act Section 135; Schedule VII; cyber-related CSR',
            'Cyber safety training in schools',
            'Legal duties are not CSR; CSR goes beyond them',
          ),
        },
      ],
      keywords: ['CSR', 'Companies Act 2013', 'Section 135', '2% of net profit', 'Schedule VII', 'Carroll’s pyramid', 'digital literacy', 'cyber awareness'],
      remember: [
        { prompt: 'Which section of the Companies Act deals with CSR?', answer: 'Section 135.' },
        { prompt: 'Minimum CSR spend?', answer: '2% of average net profits of the preceding three years.' },
        { prompt: 'Four layers of Carroll’s pyramid?', answer: 'Economic, legal, ethical, philanthropic.' },
      ],
    },

    // ------------------------------------------------------------------
    'iks-in-cyber-security-ethics': {
      difficulty: 'easy',
      intro: 'The Indian Knowledge System offers time-tested ideas on truth, duty and non-harm that apply directly to cyber ethics.',
      definition:
        'The **Indian Knowledge System (IKS)** is the body of knowledge developed in India over centuries — in philosophy, logic, ethics, sciences, arts and governance — preserved through texts and teaching traditions. In cyber security ethics, IKS provides **value principles** (such as dharma, satya, ahimsa and asteya), **methods of valid knowing** (pramāṇas) and **reasoning frameworks** (Nyāya logic) for ethical decisions and governance.',
      simpleExplanation: {
        text: 'Modern codes of ethics say “be honest, avoid harm, do not steal”. Indian traditions expressed these ideas long ago as satya (truth), ahimsa (non-harm) and asteya (non-stealing). IKS lets us connect modern cyber ethics with these deep roots and adds careful methods of reasoning.',
        analogy: 'Like finding that a modern building code follows principles master builders have used for centuries.',
      },
      visual: {
        type: 'comparison',
        title: 'IKS principles and their cyber meaning',
        table: {
          columns: ['IKS concept', 'Meaning', 'Cyber security application'],
          rows: [
            ['Dharma', 'Duty, righteous conduct', 'Professional duty to protect users and data'],
            ['Satya', 'Truthfulness', 'Honest reporting, no deception, no fake identities'],
            ['Ahimsa', 'Non-harm', 'Do not attack, harass or damage systems'],
            ['Asteya', 'Non-stealing', 'No data theft, piracy or plagiarism'],
            ['Aparigraha', 'Non-possessiveness', 'Collect only the data you need'],
            ['Lokasaṅgraha', 'Welfare of all', 'Technology that benefits society'],
          ],
        },
      },
      explanation: [
        { heading: 'IKS in education' },
        'The **National Education Policy 2020** encourages including IKS in higher education, and an **IKS Division** was set up by the Ministry of Education in 2020 to promote research and teaching in this area.',
        { heading: 'What IKS contributes to cyber ethics' },
        {
          list: [
            '**Values** — dharma, satya, ahimsa, asteya: a moral foundation for professional conduct.',
            '**Epistemology** — the knowledge triangle and pramāṇas: how to know something validly (e.g. from evidence).',
            '**Logic** — Nyāya’s five-step inference: structured reasoning for investigations and decisions.',
            '**Governance** — rājadharma and the Arthaśāstra: accountability of those in power and protection of people.',
          ],
        },
        { heading: 'Topics that follow' },
        'Vedic corpus and knowledge traditions → knowledge triangle → deductive and inductive logic → role of IKS in ethical decision-making and governance.',
        { note: 'These are applications of IKS ideas to a modern field. They complement, not replace, cyber law and professional codes.' },
      ],
      example: {
        title: 'Applying IKS values to a choice',
        input: 'An employee finds a colleague’s unlocked computer with confidential client files open.',
        output: `Asteya  : do not copy or take the data
Satya   : do not pretend later that nothing happened
Ahimsa  : do not misuse the information to harm anyone
Dharma  : lock the screen and report the security lapse`,
        explanation: 'Each principle points to the same responsible action.',
      },
      keyPoints: [
        'IKS = India’s traditional body of knowledge across many fields.',
        'Offers values: dharma, satya, ahimsa, asteya, aparigraha, lokasaṅgraha.',
        'Offers methods of knowing (pramāṇas) and reasoning (Nyāya logic).',
        'Offers governance ideas: rājadharma, Arthaśāstra.',
        'NEP 2020 promotes IKS in higher education.',
      ],
      importantTerms: [
        { term: 'IKS', meaning: 'Indian Knowledge System — traditional Indian knowledge across disciplines.' },
        { term: 'Dharma', meaning: 'Duty and righteous conduct.' },
        { term: 'Satya', meaning: 'Truthfulness.' },
        { term: 'Ahimsa', meaning: 'Non-harm / non-violence.' },
        { term: 'Asteya', meaning: 'Non-stealing.' },
      ],
      examPoints: [
        'Define IKS.',
        'Map **IKS values to cyber ethics** in a table.',
        'Explain what IKS contributes: values, epistemology, logic, governance.',
      ],
      questions: [
        {
          prompt: 'Explain the relevance of the Indian Knowledge System to cyber security ethics.',
          plan: ANSWER_PLAN(
            'Traditional Indian knowledge applied to ethics in cyberspace',
            'Table of IKS concepts and cyber applications',
            'Values, epistemology, logic, governance',
            'Unlocked computer with client files',
            'Complements law and professional codes',
          ),
        },
      ],
      keywords: ['Indian Knowledge System', 'dharma', 'satya', 'ahimsa', 'asteya', 'aparigraha', 'lokasaṅgraha', 'NEP 2020'],
      remember: [
        { prompt: 'Which IKS value matches “do not steal data”?', answer: 'Asteya.' },
        { prompt: 'Which IKS value matches “honest reporting”?', answer: 'Satya.' },
        { prompt: 'Which policy promotes IKS in higher education?', answer: 'National Education Policy 2020.' },
      ],
    },

    // ------------------------------------------------------------------
    'vedic-corpus-and-knowledge-traditions': {
      difficulty: 'medium',
      intro: 'Know the structure of the Vedic corpus and how knowledge was preserved — including methods that guarded its integrity.',
      definition:
        'The **Vedic corpus** consists of the four **Vedas** — Ṛg, Yajur, Sāma and Atharva — each with four layers: **Saṃhitā, Brāhmaṇa, Āraṇyaka and Upaniṣad**. Around it grew supporting disciplines — the six **Vedāṅgas** and four **Upavedas** — and later knowledge traditions such as the **darśanas** (schools of philosophy), transmitted mainly through the **guru–śiṣya paramparā** and precise oral recitation.',
      simpleExplanation: {
        text: 'The Vedas are the oldest layer of Indian knowledge. Each Veda has hymns, ritual explanations, forest texts and philosophical Upanishads. Helper subjects — phonetics, grammar, metre and more — grew to understand and preserve them. They were memorised and passed on by teachers with methods designed to prevent even small errors.',
        analogy: 'Like a well-organised library: four main collections, each with sections, plus reference books (Vedāṅgas) to read them correctly.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Structure of the Vedic corpus',
        root: 'Vedic corpus',
        children: [
          { label: 'Four Vedas', children: ['Ṛgveda', 'Yajurveda', 'Sāmaveda', 'Atharvaveda'] },
          { label: 'Layers of each Veda', children: ['Saṃhitā — hymns', 'Brāhmaṇa — ritual explanation', 'Āraṇyaka — forest texts', 'Upaniṣad — philosophy'] },
          { label: 'Six Vedāṅgas', children: ['Śikṣā — phonetics', 'Vyākaraṇa — grammar', 'Chandas — metre', 'Nirukta — etymology', 'Jyotiṣa — astronomy', 'Kalpa — ritual procedure'] },
          { label: 'Four Upavedas', children: ['Āyurveda', 'Dhanurveda', 'Gāndharvaveda', 'Sthāpatyaveda'] },
        ],
      },
      explanation: [
        { heading: 'Knowledge traditions' },
        {
          list: [
            '**Darśanas** — schools of philosophy: Nyāya, Vaiśeṣika, Sāṅkhya, Yoga, Mīmāṃsā, Vedānta (and also Buddhist, Jaina and Cārvāka schools).',
            '**Vidyāsthānas** — the 14 traditional sources of knowledge: 4 Vedas, 6 Vedāṅgas, Purāṇa, Nyāya, Mīmāṃsā and Dharmaśāstra (18 when the 4 Upavedas are added).',
            '**Guru–śiṣya paramparā** — knowledge passed directly from teacher to student over generations.',
          ],
        },
        { heading: 'Preserving integrity: recitation methods (pāṭhas)' },
        'Vedic texts were memorised using several recitation patterns — **saṃhitā pāṭha** (continuous text), **pada pāṭha** (word by word), **krama pāṭha** (overlapping pairs: 1-2, 2-3, 3-4) and complex patterns such as **jaṭā** and **ghana**. Reciting the same text in different orders made it very hard for any word to be lost or changed unnoticed.',
        { tip: 'Cyber link: these patterns work like **integrity checks** — the same data verified in multiple ways, much as checksums and hashes detect any change to a file.' },
        { heading: 'Relevance to cyber ethics' },
        'The tradition valued **accurate transmission**, **disciplined learning** and **responsibility of the knower** — the same qualities expected of professionals who handle sensitive information today.',
      ],
      example: {
        title: 'Krama pāṭha as error detection',
        input: 'A sentence of four words: A B C D.',
        output: `Saṃhitā : A B C D
Pada    : A | B | C | D
Krama   : A-B, B-C, C-D
If B is wrongly recited, it fails in two krama pairs → error noticed`,
        explanation: 'Redundant patterns detect errors — the same idea behind integrity checks in computing.',
      },
      keyPoints: [
        'Four Vedas: Ṛg, Yajur, Sāma, Atharva.',
        'Four layers: Saṃhitā, Brāhmaṇa, Āraṇyaka, Upaniṣad.',
        'Six Vedāṅgas and four Upavedas support the Vedas.',
        'Traditions: darśanas, 14 vidyāsthānas, guru–śiṣya paramparā.',
        'Recitation pāṭhas preserved texts with integrity — like checksums.',
      ],
      importantTerms: [
        { term: 'Saṃhitā', meaning: 'The core collection of hymns or mantras of a Veda.' },
        { term: 'Vedāṅga', meaning: 'Auxiliary discipline needed to study the Vedas.' },
        { term: 'Darśana', meaning: 'A school of Indian philosophy.' },
        { term: 'Pāṭha', meaning: 'A method or pattern of reciting a Vedic text.' },
      ],
      examPoints: [
        'Draw the **structure** of the Vedic corpus.',
        'List the **Vedāṅgas, Upavedas and darśanas**.',
        'Explain transmission and **recitation methods**.',
        'Relate integrity of transmission to cyber security.',
      ],
      questions: [
        {
          prompt: 'Describe the Vedic corpus and the Indian knowledge traditions.',
          plan: ANSWER_PLAN(
            'Four Vedas with layers, plus supporting disciplines and traditions',
            'Vedic corpus tree',
            'Vedāṅgas, Upavedas, darśanas, vidyāsthānas, guru–śiṣya paramparā, pāṭhas',
            'Krama pāṭha detecting an error',
            'Integrity of knowledge; link to cyber integrity',
          ),
        },
      ],
      keywords: ['Vedic corpus', 'four Vedas', 'Saṃhitā', 'Upaniṣad', 'Vedāṅga', 'Upaveda', 'darśana', 'guru–śiṣya paramparā', 'pāṭha'],
      remember: [
        { prompt: 'Four layers of each Veda?', answer: 'Saṃhitā, Brāhmaṇa, Āraṇyaka, Upaniṣad.' },
        { prompt: 'How many Vedāṅgas are there?', answer: 'Six.' },
        { prompt: 'Which recitation uses overlapping word pairs?', answer: 'Krama pāṭha.' },
      ],
    },

    // ------------------------------------------------------------------
    'knowledge-triangle': {
      difficulty: 'medium',
      intro: 'How do we know something is true? The knowledge triangle gives a clear model — useful for any investigation.',
      definition:
        'In Indian epistemology, valid knowledge (**pramā**) arises from a triangle of three elements: the **knower** (**pramātā**), the **object to be known** (**prameya**) and the **means of knowing** (**pramāṇa**). The pramāṇas accepted by the Nyāya school are **pratyakṣa** (perception), **anumāna** (inference), **upamāna** (comparison) and **śabda** (reliable testimony).',
      simpleExplanation: {
        text: 'Every act of knowing needs someone who knows, something to be known, and a reliable way of knowing it. If any corner is weak — a biased knower, an unclear object, or a poor method — the knowledge may be wrong.',
        analogy: 'A security analyst (knower) studies an incident (object) using logs and tools (means). Bad logs or a careless analyst lead to wrong conclusions.',
      },
      visual: {
        type: 'network',
        title: 'The knowledge triangle',
        center: { label: 'Pramā', note: 'valid knowledge' },
        nodes: [
          { label: 'Pramātā', note: 'the knower' },
          { label: 'Prameya', note: 'the object known' },
          { label: 'Pramāṇa', note: 'the means of knowing' },
        ],
      },
      explanation: [
        { heading: 'The three corners' },
        {
          table: {
            columns: ['Element', 'Meaning', 'In a cyber investigation'],
            rows: [
              ['Pramātā', 'The knower', 'The analyst or investigator'],
              ['Prameya', 'What is to be known', 'The incident, system or suspect activity'],
              ['Pramāṇa', 'Valid means of knowledge', 'Logs, forensic images, tools, testimony'],
              ['Pramā', 'Valid knowledge (result)', 'A verified conclusion about what happened'],
            ],
          },
        },
        'The same triad is also described as **jñātā** (knower), **jñeya** (knowable) and **jñāna** (knowing).',
        { heading: 'The pramāṇas (means of knowledge)' },
        {
          table: {
            columns: ['Pramāṇa', 'Meaning', 'Cyber example'],
            rows: [
              ['Pratyakṣa', 'Direct perception', 'Directly observing a running malicious process'],
              ['Anumāna', 'Inference', 'Inferring a breach from indicators of compromise'],
              ['Upamāna', 'Comparison / analogy', 'Recognising an attack by similarity to a known pattern'],
              ['Śabda', 'Reliable testimony', 'Trusted advisories, e.g. from CERT-In'],
            ],
          },
        },
        'The Mīmāṃsā and Vedānta schools add **arthāpatti** (postulation) and **anupalabdhi** (non-apprehension, knowing from absence).',
        { tip: 'Ethical lesson: a conclusion that affects people — blaming an employee, for example — must rest on valid pramāṇas, not on assumption.' },
      ],
      example: {
        title: 'Knowledge triangle in an incident',
        input: 'Was the payroll server accessed without authorisation last night?',
        output: `Pramātā : SOC analyst (trained, unbiased)
Prameya : access events on the payroll server
Pramāṇa : authentication logs (pratyakṣa), unusual pattern (anumāna),
          match with a known attack (upamāna), vendor advisory (śabda)
Pramā   : confirmed unauthorised login from a stolen account`,
        explanation: 'Each corner is checked: a competent knower, a clear object and reliable means.',
      },
      keyPoints: [
        'Knowledge triangle: pramātā (knower), prameya (object), pramāṇa (means).',
        'Result: pramā — valid knowledge.',
        'Nyāya pramāṇas: perception, inference, comparison, testimony.',
        'Additional: arthāpatti, anupalabdhi.',
        'Applies naturally to evidence-based cyber investigation.',
      ],
      importantTerms: [
        { term: 'Pramā', meaning: 'Valid, true knowledge.' },
        { term: 'Pramātā', meaning: 'The knower.' },
        { term: 'Prameya', meaning: 'The object of knowledge.' },
        { term: 'Pramāṇa', meaning: 'A valid means of knowledge.' },
      ],
      examPoints: [
        'Draw the **knowledge triangle** and name its elements.',
        'List and explain the **pramāṇas**.',
        'Apply it to a **cyber investigation**.',
      ],
      questions: [
        {
          prompt: 'Explain the knowledge triangle in IKS and its relevance to cyber security.',
          plan: ANSWER_PLAN(
            'Valid knowledge arises from knower, object and means',
            'Triangle of pramātā, prameya, pramāṇa',
            'Each element; the four pramāṇas; additional pramāṇas',
            'Investigating access to a payroll server',
            'Evidence-based, unbiased conclusions',
          ),
        },
      ],
      keywords: ['knowledge triangle', 'pramā', 'pramātā', 'prameya', 'pramāṇa', 'pratyakṣa', 'anumāna', 'upamāna', 'śabda'],
      remember: [
        { prompt: 'Three corners of the knowledge triangle?', answer: 'Pramātā (knower), prameya (object), pramāṇa (means).' },
        { prompt: 'Which pramāṇa is inference?', answer: 'Anumāna.' },
        { prompt: 'Which pramāṇa is reliable testimony?', answer: 'Śabda.' },
      ],
    },

    // ------------------------------------------------------------------
    'deductive-and-inductive-logic-framework': {
      difficulty: 'medium',
      intro: 'Two ways of reasoning — from rules to cases, and from cases to rules — and Nyāya’s five-step method that uses both.',
      definition:
        '**Deductive logic** reasons from general premises to a specific conclusion; if the premises are true and the form valid, the conclusion is **certain**. **Inductive logic** reasons from specific observations to a general conclusion that is **probable**, not certain. In IKS, **Nyāya anumāna** combines both: a general rule (**vyāpti**) learned inductively from examples is applied deductively in a **five-membered syllogism (pañcāvayava)**.',
      simpleExplanation: {
        text: 'Deduction: “All emails asking for OTP via unknown links are phishing; this email does that; so it is phishing.” Induction: “The last 50 attacks all started with phishing emails, so most attacks probably start with phishing.” Nyāya shows how these work together.',
        analogy: 'Deduction is applying a formula; induction is discovering the formula from many solved examples.',
      },
      visual: {
        type: 'comparison',
        title: 'Deductive vs inductive reasoning',
        items: [
          { title: 'Deductive', tone: 'muted', points: ['General → specific', 'Conclusion certain if premises true', 'Used to apply rules and policies', 'Example — policy violation check'] },
          { title: 'Inductive', tone: 'accent', points: ['Specific → general', 'Conclusion probable', 'Used to discover patterns', 'Example — anomaly detection from logs'] },
        ],
      },
      explanation: [
        { heading: 'Nyāya five-membered syllogism (pañcāvayava)' },
        {
          table: {
            columns: ['Step', 'Name', 'Classic example'],
            rows: [
              ['1', 'Pratijñā — proposition', 'The hill has fire.'],
              ['2', 'Hetu — reason', 'Because it has smoke.'],
              ['3', 'Udāharaṇa — example with rule', 'Wherever there is smoke there is fire, as in a kitchen.'],
              ['4', 'Upanaya — application', 'This hill has smoke, which is always accompanied by fire.'],
              ['5', 'Nigamana — conclusion', 'Therefore, the hill has fire.'],
            ],
          },
        },
        '**Vyāpti** — the invariable relation “where there is smoke, there is fire” — is established by repeated observation (inductive), and then used to reach a definite conclusion (deductive).',
        { heading: 'Fallacies of reason (hetvābhāsa)' },
        {
          list: [
            '**Savyabhicāra** — inconclusive: the reason occurs both with and without the conclusion.',
            '**Viruddha** — contradictory: the reason proves the opposite.',
            '**Satpratipakṣa** — counterbalanced by an equally strong opposite reason.',
            '**Asiddha** — unproved: the reason itself is not established.',
            '**Bādhita** — contradicted by stronger evidence such as direct perception.',
          ],
        },
        { tip: 'In security analytics, a false positive is like **savyabhicāra** — an indicator that appears in both malicious and harmless activity, so it cannot prove an attack on its own.' },
      ],
      example: {
        title: 'Pañcāvayava for a phishing email',
        input: 'An analyst must justify blocking an email.',
        output: `Pratijñā   : This email is a phishing attempt.
Hetu       : Because it asks for an OTP through an unofficial link.
Udāharaṇa  : Messages that ask for OTPs via unofficial links are phishing,
             like the fake KYC SMS reported last month.
Upanaya    : This email asks for an OTP through an unofficial link.
Nigamana   : Therefore, this email is phishing.`,
        explanation: 'The rule came from past cases (induction) and is applied to this case (deduction) — a transparent, checkable argument.',
      },
      keyPoints: [
        'Deduction: general → specific, certain if valid and premises true.',
        'Induction: specific → general, probable.',
        'Nyāya anumāna uses vyāpti (from induction) in a deductive five-step argument.',
        'Five members: pratijñā, hetu, udāharaṇa, upanaya, nigamana.',
        'Hetvābhāsa: five fallacies of reason.',
      ],
      importantTerms: [
        { term: 'Vyāpti', meaning: 'Invariable concomitance — a universal rule linking reason and conclusion.' },
        { term: 'Pañcāvayava', meaning: 'The five-membered Nyāya syllogism.' },
        { term: 'Hetu', meaning: 'The reason or evidence in an argument.' },
        { term: 'Hetvābhāsa', meaning: 'A fallacious reason that only appears valid.' },
      ],
      examPoints: [
        'Define and **compare** deductive and inductive logic.',
        'Explain the **five-membered syllogism** with the smoke–fire example.',
        'Explain **vyāpti** and **hetvābhāsa**.',
        'Apply the framework to a cyber security case.',
      ],
      questions: [
        {
          prompt: 'Explain deductive and inductive logic with reference to the Nyāya five-membered syllogism.',
          plan: ANSWER_PLAN(
            'Deduction: general to specific; induction: specific to general',
            'Comparison and five-step syllogism',
            'Pratijñā, hetu, udāharaṇa, upanaya, nigamana; vyāpti; fallacies',
            'Phishing email argued in five steps',
            'Nyāya combines induction and deduction',
          ),
        },
      ],
      keywords: ['deductive logic', 'inductive logic', 'anumāna', 'vyāpti', 'pañcāvayava', 'pratijñā', 'hetu', 'nigamana', 'hetvābhāsa'],
      remember: [
        { prompt: 'Is an inductive conclusion certain?', answer: 'No — it is probable.' },
        { prompt: 'First and last members of the Nyāya syllogism?', answer: 'Pratijñā (proposition) and nigamana (conclusion).' },
        { prompt: 'What is vyāpti?', answer: 'The invariable relation, e.g. wherever there is smoke there is fire.' },
      ],
    },

    // ------------------------------------------------------------------
    'role-of-iks-in-ethical-decision-making-and-governance': {
      difficulty: 'medium',
      intro: 'How can ancient ideas guide decisions about data, power and accountability in today’s cyber world?',
      definition:
        'IKS supports **ethical decision-making** through principles such as **dharma** (duty), **satya** (truth), **ahimsa** (non-harm), the **yamas** of the Yoga Sūtras, **niṣkāma karma** (duty without selfish attachment) and **lokasaṅgraha** (welfare of all). It supports **governance** through **rājadharma** — the duty of those in power to protect and serve people — and the administrative ideas of **Kauṭilya’s Arthaśāstra** on accountability, vigilance and audit.',
      simpleExplanation: {
        text: 'Before a decision, ask: is it my duty, is it truthful, does it avoid harm, does it take what is not mine, and does it serve the common good? For leaders, IKS adds that power exists to protect people, and that officials must be watched and audited.',
        analogy: 'A compass with several needles — duty, truth, non-harm, fairness, common good. A good decision points the same way on all of them.',
      },
      visual: {
        type: 'process',
        title: 'An IKS-informed ethical decision check',
        steps: [
          { label: 'Dharma', detail: 'What is my duty in this role?' },
          { label: 'Satya', detail: 'Am I being truthful and transparent?' },
          { label: 'Ahimsa', detail: 'Does this avoid harm to people and systems?' },
          { label: 'Asteya', detail: 'Am I taking anything — data, credit, access — that is not mine?' },
          { label: 'Lokasaṅgraha', detail: 'Does it serve the wider good?' },
        ],
      },
      explanation: [
        { heading: 'Ethical decision-making' },
        {
          list: [
            '**Five yamas** (Yoga Sūtras): ahimsa, satya, asteya, brahmacarya, aparigraha — personal ethical restraints.',
            '**Niṣkāma karma** (Bhagavad Gītā) — do your duty without being driven by personal gain: e.g. report a vulnerability without seeking to profit from it.',
            '**Lokasaṅgraha** — act for the welfare of the world: design systems that benefit society.',
            '**Pramāṇa-based reasoning** — decisions affecting people must rest on valid evidence.',
          ],
        },
        { heading: 'Governance' },
        {
          table: {
            columns: ['IKS idea', 'Governance lesson', 'Cyber governance parallel'],
            rows: [
              ['Rājadharma', 'Rulers exist to protect and serve the people', 'Leaders accountable for protecting citizens’ and customers’ data'],
              ['Arthaśāstra — welfare of subjects', '“In the happiness of the subjects lies the king’s happiness”', 'Security decisions judged by benefit to users'],
              ['Arthaśāstra — vigilance', 'Use of intelligence and spies to detect threats', 'Threat intelligence and monitoring'],
              ['Arthaśāstra — audit of officials', 'Lists many ways officials can embezzle and how to check them', 'Audits, separation of duties, insider-threat controls'],
              ['Sabhā / consultation', 'Decisions after consultation with advisers', 'Board oversight and security committees'],
            ],
          },
        },
        { note: 'These are interpretive applications of IKS principles to modern governance; they work alongside laws such as the IT Act and DPDP Act.' },
      ],
      example: {
        title: 'Deciding on employee monitoring',
        input: 'A company considers reading all employee chats to prevent data leaks.',
        output: `Dharma       : duty to protect company and customer data
Satya        : inform employees openly about any monitoring
Ahimsa       : avoid unnecessary intrusion into private life
Aparigraha   : monitor only what is needed (work systems, DLP alerts)
Rājadharma   : leadership accountable; oversight by a committee
Decision     : transparent, limited, policy-based monitoring with audit`,
        explanation: 'Applying several principles together leads to a balanced, defensible decision.',
      },
      keyPoints: [
        'Ethics: dharma, satya, ahimsa, asteya, aparigraha, niṣkāma karma, lokasaṅgraha.',
        'Five yamas from the Yoga Sūtras guide personal conduct.',
        'Governance: rājadharma — power exists to serve and protect.',
        'Arthaśāstra: welfare of subjects, vigilance, audit of officials.',
        'IKS principles complement modern law and governance frameworks.',
      ],
      importantTerms: [
        { term: 'Rājadharma', meaning: 'The duty of rulers to protect and serve the people.' },
        { term: 'Arthaśāstra', meaning: 'Kauṭilya’s ancient treatise on statecraft and administration.' },
        { term: 'Niṣkāma karma', meaning: 'Doing one’s duty without selfish attachment to results.' },
        { term: 'Yamas', meaning: 'Five ethical restraints in the Yoga Sūtras.' },
      ],
      examPoints: [
        'Explain **IKS principles** used in ethical decision-making.',
        'Explain **rājadharma** and **Arthaśāstra** ideas on governance.',
        'Map them to **cyber governance** (accountability, monitoring, audit).',
        'Apply to a case.',
      ],
      questions: [
        {
          prompt: 'Discuss the role of IKS in ethical decision-making and governance in cyber security.',
          plan: ANSWER_PLAN(
            'IKS values and statecraft applied to cyber ethics and governance',
            'Five-step ethical decision check',
            'Yamas, niṣkāma karma, lokasaṅgraha; rājadharma; Arthaśāstra',
            'Employee monitoring decision',
            'Complements law; accountability and welfare',
          ),
        },
      ],
      keywords: ['ethical decision-making', 'governance', 'dharma', 'yamas', 'niṣkāma karma', 'lokasaṅgraha', 'rājadharma', 'Arthaśāstra', 'Kauṭilya'],
      remember: [
        { prompt: 'Five yamas?', answer: 'Ahimsa, satya, asteya, brahmacarya, aparigraha.' },
        { prompt: 'Who wrote the Arthaśāstra?', answer: 'Kauṭilya (Chanakya).' },
        { prompt: 'What is rājadharma?', answer: 'The duty of those in power to protect and serve the people.' },
      ],
    },
  },
}
