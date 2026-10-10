// Cyber Security — Unit II: Computer Crime and Identity Security.
// Topic ids match the syllabus outline in ../subjects.js (24CSU5CB).
// Attack topics are taught for recognition and defence only.
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
    'Unit II looks at the criminal side of computing: how hackers attack systems, why digital assets have become commodities worth stealing, and how intellectual property is stolen. Its second half focuses on identity — how identities are stolen and misused through internet fraud and phishing, who becomes a victim, and the virtual and physical methods offenders use, always paired with how to prevent them.',

  map: [
    { label: 'Attacks on systems', topics: ['computer-hacking-and-system-attacks'] },
    { label: 'What gets stolen', topics: ['commodification-of-digital-assets', 'theft-of-intellectual-property'] },
    { label: 'Identity crime', topics: ['identity-theft-and-identity-fraud', 'internet-fraud', 'phishing'] },
    { label: 'Victims and methods', topics: ['victimology', 'virtual-and-physical-methods'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'computer-hacking-and-system-attacks': {
      difficulty: 'medium',
      intro: 'Defenders must understand how attackers think. This topic covers types of hackers and the stages of an attack.',
      definition:
        '**Hacking** is gaining access to, or control over, a computer system or network beyond what one is authorised to do. A **system attack** is any deliberate attempt to compromise the confidentiality, integrity or availability of a system. Unauthorised hacking is an offence under **Sections 43 and 66** of the IT Act.',
      simpleExplanation: {
        text: 'The word “hacker” once meant a skilled programmer. Today it usually means someone who breaks into systems. What separates an ethical hacker from a criminal is **permission**: ethical hackers test systems with written authorisation to help fix weaknesses.',
        analogy: 'A locksmith hired by the owner to test the locks is an ethical hacker; someone who picks the lock at night is a criminal.',
      },
      visual: {
        type: 'process',
        title: 'Typical stages of an attack — and where defenders act',
        steps: [
          { label: 'Reconnaissance', detail: 'gathering public information — defence: limit exposed information' },
          { label: 'Scanning', detail: 'finding open services and weaknesses — defence: firewalls, patching' },
          { label: 'Gaining access', detail: 'exploiting a weakness or stolen credential — defence: MFA, secure configuration' },
          { label: 'Maintaining access', detail: 'installing backdoors — defence: endpoint detection, monitoring' },
          { label: 'Covering tracks', detail: 'deleting logs — defence: central, tamper-proof logging' },
        ],
      },
      explanation: [
        { heading: 'Types of hackers' },
        {
          table: {
            columns: ['Type', 'Description'],
            rows: [
              ['White hat', 'Ethical hacker who tests systems with permission'],
              ['Black hat', 'Breaks into systems illegally for gain or damage'],
              ['Grey hat', 'Hacks without permission but without clear criminal intent'],
              ['Script kiddie', 'Uses ready-made tools without real understanding'],
              ['Hacktivist', 'Attacks for political or social causes'],
              ['State-sponsored', 'Works for a government on espionage or sabotage'],
              ['Insider', 'Employee or contractor who misuses legitimate access'],
            ],
          },
        },
        { heading: 'Common system attacks' },
        {
          list: [
            '**Password attacks** — guessing, brute force, or reusing leaked passwords. Defence: strong unique passwords, MFA, account lockout.',
            '**Malware** — viruses, worms, trojans, backdoors. Defence: patching, endpoint protection.',
            '**Privilege escalation** — moving from a normal account to administrator. Defence: least privilege, patching.',
            '**Man-in-the-middle** — intercepting traffic. Defence: encryption (TLS), secure Wi-Fi.',
            '**Denial of service** — overloading a service. Defence: rate limiting, DDoS protection.',
            '**Exploiting unpatched software** — using known flaws. Defence: patch management.',
          ],
        },
        { heading: 'Early hacking' },
        '**Phreakers** in the 1960s–70s manipulated telephone networks to make free calls. Their culture of exploring systems led to early computer hacking; later, hacking shifted towards profit-driven crime.',
        { trap: 'Ethical hacking is legal only with **prior written permission** and an agreed scope. Testing without permission is still an offence.' },
      ],
      example: {
        title: 'Breaking the attack chain',
        input: 'An attacker finds a staff email on the college website, guesses a weak password and logs into the email portal.',
        output: `Stage reached : gaining access (weak password)
Breaks the chain:
  - MFA on email → stolen password alone is useless
  - Password policy → weak password rejected
  - Login alerts → unusual sign-in detected`,
        explanation: 'Defenders do not need to stop every stage — breaking the chain at any one point stops the attack.',
      },
      keyPoints: [
        'Hacking = access beyond authorisation.',
        'Permission is what makes hacking ethical.',
        'Hacker types: white, black, grey hat, script kiddie, hacktivist, state-sponsored, insider.',
        'Attack stages: reconnaissance, scanning, access, maintaining access, covering tracks.',
        'Unauthorised access is punishable under IT Act Sections 43 and 66.',
      ],
      importantTerms: [
        { term: 'Ethical hacking', meaning: 'Authorised testing of systems to find weaknesses before criminals do.' },
        { term: 'Privilege escalation', meaning: 'Gaining higher access rights than originally granted.' },
        { term: 'Backdoor', meaning: 'A hidden way of bypassing normal authentication.' },
        { term: 'Phreaking', meaning: 'Manipulating telephone systems; a precursor of hacking.' },
      ],
      examPoints: [
        'Define hacking and **classify hackers**.',
        'Explain the **stages** of an attack with a defence for each.',
        'List common system attacks and controls.',
        'Mention legal provisions: IT Act Sections 43 and 66.',
      ],
      questions: [
        {
          prompt: 'What is hacking? Explain the types of hackers and common system attacks.',
          plan: ANSWER_PLAN(
            'Gaining access beyond authorisation',
            'Attack stages with defences',
            'Types of hackers; password attacks, malware, privilege escalation, MITM, DoS',
            'Weak staff email password stopped by MFA',
            'Ethical hacking needs permission; IT Act 43/66',
          ),
        },
      ],
      keywords: ['hacking', 'white hat', 'black hat', 'grey hat', 'script kiddie', 'hacktivist', 'privilege escalation', 'reconnaissance', 'Section 66'],
      remember: [
        { prompt: 'What separates ethical hacking from crime?', answer: 'Prior written permission and an agreed scope.' },
        { prompt: 'Name the first stage of an attack.', answer: 'Reconnaissance.' },
        { prompt: 'Who is a script kiddie?', answer: 'Someone who uses ready-made attack tools without real understanding.' },
      ],
    },

    // ------------------------------------------------------------------
    'commodification-of-digital-assets': {
      difficulty: 'medium',
      intro: 'Why do criminals steal data? Because digital assets are bought and sold like goods. Understanding the market explains the motive.',
      definition:
        '**Commodification of digital assets** means that computers, components and especially **data** — credentials, card details, personal records, software, access to hacked systems — are treated as **tradeable goods** with a market value. This turns cybercrime into a profit-driven economy with buyers, sellers and services.',
      simpleExplanation: {
        text: 'Early computer theft was about stealing the hardware itself — chips and laptops. Today, the data on the device is often worth more than the device. Stolen data, hacked accounts and even attack tools are sold in underground markets, which is why criminals keep stealing them.',
        analogy: 'Like stolen goods sold at an illegal market: if there were no buyers, there would be far fewer thieves.',
      },
      visual: {
        type: 'flow',
        title: 'How stolen digital assets become money',
        steps: [
          { label: 'Theft', note: 'breach, phishing, device theft' },
          { label: 'Packaging', note: 'data sorted into lists' },
          { label: 'Underground market', note: 'sold or rented' },
          { label: 'Misuse', note: 'fraud, extortion, spam' },
          { label: 'Cash-out', note: 'money mules, crypto' },
        ],
      },
      explanation: [
        { heading: 'What is treated as a commodity' },
        {
          table: {
            columns: ['Asset', 'Why it has value'],
            rows: [
              ['Hardware and components', 'Can be resold; early form of computer theft'],
              ['Personal data', 'Used for identity fraud, targeted scams'],
              ['Login credentials', 'Give access to accounts, email and corporate networks'],
              ['Payment card data', 'Used for fraudulent purchases'],
              ['Software and media', 'Pirated copies sold or shared'],
              ['Access to hacked systems', 'Sold to ransomware groups'],
              ['Attack services', 'Malware, botnets and phishing kits offered “as a service”'],
            ],
          },
        },
        { heading: 'Crime-as-a-service' },
        'Specialists sell or rent each part of an attack — malware, hosting, stolen access, money laundering. **Ransomware-as-a-service** lets affiliates use ransomware built by others and share the profit. This lowers the skill needed to commit cybercrime.',
        { heading: 'Why it matters for defence' },
        {
          list: [
            'Data has value even when it seems unimportant to the owner.',
            'Collect less data (**data minimisation**) — what you do not store cannot be stolen.',
            'Encrypt stored data so that stolen copies are useless.',
            'Treat devices as containers of valuable data: encrypt laptops and phones.',
          ],
        },
      ],
      example: {
        title: 'Why a stolen laptop is a data breach',
        input: 'A company laptop worth ₹60,000 is stolen from a car. It holds an unencrypted customer spreadsheet.',
        output: `Hardware value  : resold quickly
Data value      : customer names, phones, addresses → sold for targeted scams
Real loss       : breach notification, reputation, legal liability
Prevention      : full-disk encryption + remote wipe`,
        explanation: 'The commodity that matters most is the data, not the device.',
      },
      keyPoints: [
        'Digital assets — data, credentials, access — are traded like goods.',
        'Early computer crime targeted hardware; today data is the main commodity.',
        'Crime-as-a-service rents out attack tools and access.',
        'Data minimisation and encryption reduce what can be monetised.',
      ],
      importantTerms: [
        { term: 'Commodification', meaning: 'Treating something as a product that can be bought and sold.' },
        { term: 'Crime-as-a-service', meaning: 'Selling or renting criminal tools and services to others.' },
        { term: 'Money mule', meaning: 'A person who moves stolen money on behalf of criminals.' },
        { term: 'Data minimisation', meaning: 'Collecting and keeping only the data that is necessary.' },
      ],
      examPoints: [
        'Define commodification of digital assets.',
        'List assets that are traded and why they have value.',
        'Explain **crime-as-a-service**.',
        'Give defensive measures.',
      ],
      questions: [
        {
          prompt: 'Explain the commodification of digital assets in cybercrime.',
          plan: ANSWER_PLAN(
            'Digital assets treated as tradeable goods',
            'Theft → market → misuse → cash-out flow',
            'Types of assets; crime-as-a-service; shift from hardware to data',
            'Stolen laptop with customer data',
            'Data minimisation; encryption',
          ),
        },
      ],
      keywords: ['commodification', 'digital assets', 'underground market', 'crime-as-a-service', 'ransomware-as-a-service', 'money mule', 'data minimisation'],
      remember: [
        { prompt: 'What is crime-as-a-service?', answer: 'Renting or selling attack tools and services to other criminals.' },
        { prompt: 'Which is usually more valuable — a stolen laptop or its data?', answer: 'Its data.' },
        { prompt: 'One way to make stolen data useless?', answer: 'Encrypt it.' },
      ],
    },

    // ------------------------------------------------------------------
    'theft-of-intellectual-property': {
      difficulty: 'medium',
      intro: 'Software, films, designs and trade secrets are easy to copy digitally — and that makes them easy to steal.',
      definition:
        '**Theft of intellectual property (IP)** is the unauthorised use, copying, distribution or disclosure of creations of the mind — software, literary and artistic works, inventions, designs, brand names and trade secrets. In India it is addressed mainly by the **Copyright Act 1957**, **Patents Act 1970**, **Trade Marks Act 1999** and, for data-related misuse, the **IT Act 2000**.',
      simpleExplanation: {
        text: 'Copying a paid software, downloading a pirated film, or an employee taking secret source code to a competitor are all IP theft. The original creator loses the reward for their work.',
        analogy: 'Photocopying an entire textbook and selling the copies — the author and publisher lose income they earned.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Forms of intellectual property and how they are stolen',
        root: 'Intellectual property',
        children: [
          { label: 'Copyright', note: 'software, books, films, music', children: ['Software piracy', 'Illegal downloads', 'Plagiarism'] },
          { label: 'Patent', note: 'inventions', children: ['Copying patented technology'] },
          { label: 'Trademark', note: 'brand names, logos', children: ['Counterfeit goods', 'Cybersquatting'] },
          { label: 'Trade secret', note: 'confidential business data', children: ['Insider leaks', 'Corporate espionage'] },
        ],
      },
      explanation: [
        { heading: 'Software piracy — common forms' },
        {
          list: [
            '**Softlifting** — installing one licensed copy on more computers than allowed.',
            '**Counterfeiting** — making and selling fake copies that look genuine.',
            '**Hard-disk loading** — sellers install unlicensed software on computers they sell.',
            '**Internet piracy** — distributing software or media through websites and file sharing.',
            '**Licence overuse** — more users on a network than the licence permits.',
          ],
        },
        { heading: 'Trade secret theft' },
        'Often committed by **insiders** — an employee copies designs, customer lists or source code before leaving. Controls: non-disclosure agreements (NDAs), access control on a need-to-know basis, data loss prevention (DLP) and exit procedures.',
        { heading: 'Legal protection in India' },
        {
          table: {
            columns: ['Law', 'Protects'],
            rows: [
              ['Copyright Act 1957', 'Literary and artistic works — computer programs are protected as literary works'],
              ['Patents Act 1970', 'Inventions; computer programs “per se” are not patentable (Section 3(k))'],
              ['Trade Marks Act 1999', 'Brand names, logos; used against cybersquatting'],
              ['IT Act 2000', 'Unauthorised access and data theft (Sections 43, 66)'],
            ],
          },
        },
        { note: 'There is no separate trade-secret statute in India; trade secrets are protected through contracts (NDAs) and the law of confidentiality.' },
      ],
      example: {
        title: 'Insider takes source code',
        input: 'A developer copies the company’s product source code to a personal drive before joining a competitor.',
        output: `IP type     : trade secret (and copyright in the code)
Offence     : unauthorised copying / data theft (IT Act Sec 43, 66), breach of NDA
Detection   : DLP alert on bulk copy to external storage
Prevention  : need-to-know access, USB restrictions, exit checklist`,
        explanation: 'Insider IP theft is prevented by combining legal agreements with technical controls.',
      },
      keyPoints: [
        'IP = creations of the mind: copyright, patent, trademark, trade secret.',
        'Software piracy: softlifting, counterfeiting, hard-disk loading, internet piracy, licence overuse.',
        'Insiders are a major source of trade-secret theft.',
        'Indian laws: Copyright Act 1957, Patents Act 1970, Trade Marks Act 1999, IT Act 2000.',
      ],
      importantTerms: [
        { term: 'Intellectual property', meaning: 'Legal rights over creations of the mind.' },
        { term: 'Software piracy', meaning: 'Unauthorised copying, use or distribution of software.' },
        { term: 'Trade secret', meaning: 'Confidential business information that gives a competitive advantage.' },
        { term: 'NDA', meaning: 'Non-disclosure agreement — a contract to keep information confidential.' },
      ],
      examPoints: [
        'Define IP and its **four forms**.',
        'Explain **types of software piracy**.',
        'Discuss trade-secret theft by insiders.',
        'List the Indian laws protecting IP.',
      ],
      questions: [
        {
          prompt: 'Explain theft of intellectual property with reference to software piracy.',
          plan: ANSWER_PLAN(
            'Unauthorised use or disclosure of creations of the mind',
            'IP forms tree',
            'Types of piracy; trade-secret theft; Indian laws',
            'Developer copying source code',
            'NDAs, DLP, licensing compliance',
          ),
        },
      ],
      keywords: ['intellectual property', 'copyright', 'patent', 'trademark', 'trade secret', 'software piracy', 'softlifting', 'counterfeiting', 'NDA'],
      remember: [
        { prompt: 'What is softlifting?', answer: 'Installing one licensed copy on more machines than allowed.' },
        { prompt: 'Under which Indian law are computer programs protected?', answer: 'Copyright Act 1957, as literary works.' },
        { prompt: 'Main source of trade-secret theft?', answer: 'Insiders.' },
      ],
    },

    // ------------------------------------------------------------------
    'identity-theft-and-identity-fraud': {
      difficulty: 'medium',
      intro: 'Two related but different crimes. Exams often ask you to distinguish them and list their typologies.',
      definition:
        '**Identity theft** is the unauthorised **acquisition** of another person’s identifying information — name, Aadhaar or PAN number, bank details, passwords. **Identity fraud** is the **use** of such information (or a fictitious identity) to deceive others for gain. In India, identity theft is punishable under **Section 66C** of the IT Act, and cheating by personation under **Section 66D**.',
      simpleExplanation: {
        text: 'Stealing someone’s ID card details is identity **theft**. Using those details to open a loan in their name is identity **fraud**. Theft usually comes first; fraud is how the criminal profits.',
        analogy: 'Stealing a house key is theft; using it to enter and take things is the crime that follows.',
      },
      visual: {
        type: 'comparison',
        title: 'Identity theft vs identity fraud',
        items: [
          {
            title: 'Identity theft',
            tone: 'muted',
            points: ['Acquiring identifying information', 'Example — stealing card details or passwords', 'IT Act Section 66C', 'Often invisible to the victim at first'],
          },
          {
            title: 'Identity fraud',
            tone: 'accent',
            points: ['Using the information to deceive', 'Example — loans, purchases, fake accounts', 'IT Act Section 66D and fraud laws', 'Causes direct financial loss'],
          },
        ],
      },
      explanation: [
        { heading: 'Typologies of identity theft and fraud' },
        {
          table: {
            columns: ['Typology', 'Meaning'],
            rows: [
              ['Assumption of identity', 'Criminal lives as the victim — uses their identity for everything'],
              ['Theft for employment or border entry', 'Using another identity to get a job or cross borders'],
              ['Reverse criminal record identity theft', 'Offender gives the victim’s identity when arrested, so the record goes in the victim’s name'],
              ['Virtual identity theft/fraud', 'Using stolen identity online — fake social media, online accounts'],
              ['Credit identity theft/fraud', 'Using stolen details to obtain credit cards, loans or make purchases'],
            ],
          },
        },
        'Two typologies are so common that they are studied separately: **internet fraud** and **phishing**.',
        { heading: 'Crimes facilitated by identity theft' },
        'Credit card fraud, loan and insurance fraud, SIM-swap fraud, tax refund fraud, opening bank accounts for money laundering, and immigration fraud.',
        { heading: 'Signs that your identity is being misused' },
        {
          list: [
            'Unknown transactions or loan enquiries in your credit report.',
            'OTPs or account alerts you did not request.',
            'Bills or calls about accounts you never opened.',
            'Your mobile number suddenly stops working (possible SIM swap).',
          ],
        },
      ],
      example: {
        title: 'From theft to fraud',
        input: 'A photocopy of a customer’s Aadhaar and PAN left at a shop is taken by an employee.',
        output: `Identity theft : employee acquires the documents
Identity fraud : uses them to take an instant loan app loan
Victim learns  : recovery agents call months later
Prevention     : mask Aadhaar copies, write purpose on photocopies, check credit report`,
        explanation: 'The theft happened silently; the damage appeared only when the fraud surfaced.',
      },
      keyPoints: [
        'Identity theft = acquiring identifying data; identity fraud = using it to deceive.',
        'IT Act: 66C identity theft, 66D cheating by personation.',
        'Typologies: assumption of identity, employment/border entry, reverse criminal record, virtual, credit.',
        'Identity theft enables loans, card fraud, SIM swap and money laundering.',
      ],
      importantTerms: [
        { term: 'Personally identifiable information', meaning: 'Data that identifies a person, such as name, ID numbers or biometrics.' },
        { term: 'Reverse criminal record identity theft', meaning: 'An offender uses the victim’s identity when arrested.' },
        { term: 'SIM swap', meaning: 'Fraudulently moving a victim’s phone number to a new SIM to receive their OTPs.' },
      ],
      examPoints: [
        'Clearly **distinguish identity theft and identity fraud**.',
        'Explain the **typologies** with one line each.',
        'Mention Sections **66C and 66D**.',
        'List warning signs and prevention.',
      ],
      questions: [
        {
          prompt: 'Distinguish identity theft and identity fraud. Explain their typologies.',
          plan: ANSWER_PLAN(
            'Theft = acquiring identity data; fraud = using it to deceive',
            'Comparison of theft vs fraud',
            'Typologies; crimes facilitated; warning signs',
            'Aadhaar photocopy misused for a loan',
            'IT Act 66C and 66D; prevention',
          ),
        },
      ],
      keywords: ['identity theft', 'identity fraud', 'PII', 'Section 66C', 'Section 66D', 'typologies', 'SIM swap', 'credit fraud'],
      remember: [
        { prompt: 'Identity theft or fraud: opening a loan in someone else’s name?', answer: 'Identity fraud.' },
        { prompt: 'IT Act section for identity theft?', answer: 'Section 66C.' },
        { prompt: 'What is reverse criminal record identity theft?', answer: 'An offender gives the victim’s identity when arrested.' },
      ],
    },

    // ------------------------------------------------------------------
    'internet-fraud': {
      difficulty: 'easy',
      intro: 'The most common cybercrime faced by ordinary users. Know the main types and the warning signs.',
      definition:
        '**Internet fraud** is any scheme that uses the internet — websites, email, social media, messaging or payment apps — to deceive victims into giving money, goods or personal information. It is a typology of identity-related crime and is punishable under the IT Act (e.g. **Section 66D**) and general cheating provisions of criminal law.',
      simpleExplanation: {
        text: 'Online fraud works by creating a believable story — a prize, a job, a bargain, a romance or an emergency — so the victim pays or shares details before thinking.',
        analogy: 'It is the old street con game moved online, where the con artist can reach millions of people at once.',
      },
      visual: {
        type: 'flow',
        title: 'Anatomy of an internet fraud',
        steps: [
          { label: 'Bait', note: 'offer, prize, job, threat' },
          { label: 'Trust building', note: 'fake site, fake profile' },
          { label: 'Urgency', note: 'act now or lose out' },
          { label: 'Payment or data', note: 'victim pays or shares OTP' },
          { label: 'Disappear', note: 'account or site removed' },
        ],
      },
      explanation: [
        { heading: 'Common types' },
        {
          table: {
            columns: ['Type', 'How it works'],
            rows: [
              ['Online shopping fraud', 'Fake store takes payment and never delivers'],
              ['Advance-fee / lottery scam', 'Victim must pay a “fee” to release a prize or inheritance'],
              ['Job scam', 'Fake job offer demands registration or training fees'],
              ['Investment scam', 'Promises unrealistic returns; early payouts from later victims (Ponzi)'],
              ['Romance scam', 'Fake relationship, then requests for money'],
              ['Tech-support scam', 'Fake “support” asks for remote access or payment'],
              ['UPI collect / QR scam', 'Victim is told to scan or approve to “receive” money, but actually pays'],
              ['Auction fraud', 'Misrepresented or undelivered items on auction sites'],
            ],
          },
        },
        { heading: 'Warning signs' },
        {
          list: [
            'Offer is **too good to be true**.',
            '**Urgency** or threats — “only today”, “account will be blocked”.',
            'Request for **advance payment**, gift cards or crypto.',
            'Request for **OTP, PIN or remote access** — no genuine organisation asks for these.',
            'Communication only through chat apps; no verifiable address.',
          ],
        },
        { tip: 'Remember: in UPI, you enter your PIN only to **send** money, never to receive it.' },
      ],
      example: {
        title: 'Spotting a job scam',
        input: 'WhatsApp message: “Earn ₹5,000/day liking videos. Pay ₹999 registration to start.”',
        output: `Red flags: unrealistic pay, upfront fee, chat-only contact
Action   : do not pay, block, report at cybercrime.gov.in
If paid  : call 1930 immediately and inform the bank`,
        explanation: 'Genuine employers do not charge a fee to hire you.',
      },
      keyPoints: [
        'Internet fraud uses online channels to deceive victims for money or data.',
        'Types: shopping, advance-fee, job, investment, romance, tech-support, UPI/QR scams.',
        'Warning signs: too good to be true, urgency, upfront fees, OTP requests.',
        'Report quickly: 1930 and cybercrime.gov.in.',
      ],
      importantTerms: [
        { term: 'Advance-fee fraud', meaning: 'Victim pays a small fee expecting a larger reward that never comes.' },
        { term: 'Ponzi scheme', meaning: 'Pays earlier investors with money from new investors.' },
        { term: 'Money mule', meaning: 'A person whose account is used to move fraud proceeds.' },
      ],
      examPoints: [
        'Define internet fraud.',
        'Explain **at least five types** with how they work.',
        'List warning signs and preventive steps.',
        'Mention reporting channels.',
      ],
      questions: [
        {
          prompt: 'What is internet fraud? Explain its common types and prevention.',
          plan: ANSWER_PLAN(
            'Using the internet to deceive victims for gain',
            'Bait → trust → urgency → payment → disappear',
            'Types of internet fraud; warning signs',
            'Fake job offer with registration fee',
            'Prevention and reporting: 1930, cybercrime.gov.in',
          ),
        },
      ],
      keywords: ['internet fraud', 'advance-fee', 'job scam', 'investment scam', 'romance scam', 'UPI fraud', 'Ponzi', 'red flags'],
      remember: [
        { prompt: 'Do you need to enter a UPI PIN to receive money?', answer: 'No — the PIN is only for sending money.' },
        { prompt: 'Name three types of internet fraud.', answer: 'Job scams, investment scams, online shopping fraud.' },
        { prompt: 'First call to make after losing money to fraud?', answer: '1930.' },
      ],
    },

    // ------------------------------------------------------------------
    'phishing': {
      difficulty: 'medium',
      intro: 'Phishing is the most common entry point for attacks on both people and organisations.',
      definition:
        '**Phishing** is a social-engineering attack in which the attacker pretends to be a trusted entity — a bank, employer or service — through email, SMS, calls or fake websites, to trick victims into revealing credentials or financial data, or into installing malware.',
      simpleExplanation: {
        text: 'The attacker sends a message that looks real — “Your account will be blocked, verify now” — with a link to a fake login page. Whatever the victim types goes straight to the attacker.',
        analogy: 'Fishing with bait: the message is the bait, the fake website is the hook, and the victim’s password is the catch.',
      },
      visual: {
        type: 'flow',
        title: 'Phishing attack and where to stop it',
        steps: [
          { label: 'Lure', note: 'fake email or SMS — stop: email filtering' },
          { label: 'Click', note: 'link opens look-alike site — stop: check the URL' },
          { label: 'Credentials entered', note: 'data sent to attacker — stop: MFA' },
          { label: 'Account misused', note: 'fraud or further attacks — stop: login alerts' },
        ],
      },
      explanation: [
        { heading: 'Types of phishing' },
        {
          table: {
            columns: ['Type', 'Channel / target'],
            rows: [
              ['Email (deceptive) phishing', 'Mass emails impersonating well-known brands'],
              ['Spear phishing', 'Targeted at a specific person using personal details'],
              ['Whaling', 'Spear phishing aimed at senior executives'],
              ['Smishing', 'Phishing by SMS'],
              ['Vishing', 'Phishing by voice call'],
              ['Clone phishing', 'Copy of a genuine earlier email with a malicious link swapped in'],
              ['Pharming', 'Redirecting users to a fake site by tampering with DNS'],
              ['Quishing', 'Malicious QR codes'],
            ],
          },
        },
        { heading: 'How to recognise phishing' },
        {
          list: [
            'Sender address or domain slightly different from the real one.',
            'Generic greeting, urgency or threats.',
            'Link text that does not match the actual URL (hover to check).',
            'Requests for passwords, OTPs or card details.',
            'Unexpected attachments, especially archives or macro-enabled documents.',
          ],
        },
        { heading: 'Defences' },
        {
          list: [
            '**User awareness** and reporting buttons in email clients.',
            '**Multi-factor authentication** — a stolen password alone is not enough.',
            '**Email authentication**: SPF, DKIM and DMARC reduce spoofed sender domains.',
            '**Email and web filtering** to block known malicious links.',
            'Always type the official website address yourself instead of clicking links.',
          ],
        },
      ],
      example: {
        title: 'Analyse a suspicious SMS',
        input: 'SMS: “Dear customer, your KYC is expired. Update in 24 hrs or account will be blocked: http://sbi-kyc-update.example.net”',
        output: `Urgency           : 24-hour deadline, threat of blocking
Wrong domain      : not the bank's official domain
Asks for action   : KYC via unknown link
Verdict           : smishing → delete, report, never click`,
        explanation: 'Banks do not ask customers to update KYC through random links in SMS.',
      },
      keyPoints: [
        'Phishing impersonates trusted entities to steal data or install malware.',
        'Types: email, spear, whaling, smishing, vishing, clone, pharming, quishing.',
        'Red flags: wrong domain, urgency, credential requests.',
        'Defences: awareness, MFA, SPF/DKIM/DMARC, filtering.',
      ],
      importantTerms: [
        { term: 'Spear phishing', meaning: 'Phishing targeted at a specific individual or organisation.' },
        { term: 'Whaling', meaning: 'Phishing aimed at senior executives.' },
        { term: 'Pharming', meaning: 'Redirecting users to fake sites by manipulating DNS.' },
        { term: 'DMARC', meaning: 'Email policy that tells receivers how to handle messages failing SPF/DKIM checks.' },
      ],
      examPoints: [
        'Define phishing and draw the **lure → hook → catch** flow.',
        'List and explain **types** of phishing.',
        'Explain **red flags** and **defences**.',
      ],
      questions: [
        {
          prompt: 'What is phishing? Explain its types and countermeasures.',
          plan: ANSWER_PLAN(
            'Impersonating a trusted entity to steal data',
            'Phishing flow with defences',
            'Email, spear, whaling, smishing, vishing, pharming',
            'Fake KYC update SMS',
            'Awareness, MFA, email authentication, filtering',
          ),
        },
      ],
      keywords: ['phishing', 'spear phishing', 'whaling', 'smishing', 'vishing', 'pharming', 'MFA', 'SPF', 'DKIM', 'DMARC'],
      remember: [
        { prompt: 'Phishing by SMS is called?', answer: 'Smishing.' },
        { prompt: 'Phishing aimed at a CEO is called?', answer: 'Whaling.' },
        { prompt: 'Best technical control against stolen passwords?', answer: 'Multi-factor authentication.' },
      ],
    },

    // ------------------------------------------------------------------
    'victimology': {
      difficulty: 'medium',
      intro: 'Understanding who becomes a victim, and why, helps design awareness and support that actually work.',
      definition:
        '**Victimology** is the study of victims of crime — who they are, why they are targeted, how the crime affects them, and how they respond and recover. In cybercrime, it examines individual and organisational victims, risk factors, the harm suffered and the reasons victims often **do not report**.',
      simpleExplanation: {
        text: 'Criminals pick targets that are easy and profitable. Victimology asks: what made this person or organisation an easy target, what did they lose, and why didn’t they report it? The answers guide prevention.',
        analogy: 'A doctor studies not only the disease but also who catches it and why — so they can protect those people.',
      },
      visual: {
        type: 'comparison',
        title: 'Types of cybercrime victims',
        items: [
          { title: 'Individuals', tone: 'muted', points: ['Identity theft, fraud, harassment', 'Financial and emotional harm', 'Credit and reputation damage'] },
          { title: 'Organisations', tone: 'accent', points: ['Data breaches, ransomware, fraud', 'Financial, legal and reputational loss', 'Customers become secondary victims'] },
          { title: 'Government and society', tone: 'muted', points: ['Attacks on public services', 'Loss of public trust', 'Threats to national security'] },
        ],
      },
      explanation: [
        { heading: 'Risk factors' },
        {
          list: [
            '**Low digital awareness** — new or elderly internet users.',
            '**High online exposure** — sharing personal details on social media.',
            '**Emotional triggers** — fear, greed, loneliness, urgency.',
            '**Weak security habits** — reused passwords, no updates, no MFA.',
            '**Trust in authority** — believing callers who claim to be police or bank officials.',
          ],
        },
        { heading: 'Impact on victims' },
        {
          table: {
            columns: ['Impact', 'Example'],
            rows: [
              ['Financial', 'Lost savings, fraudulent loans'],
              ['Emotional', 'Stress, shame, anxiety, loss of trust'],
              ['Reputational', 'Misuse of name or photos'],
              ['Legal / administrative', 'Clearing false records, disputing debts'],
              ['Secondary victimisation', 'Being blamed or disbelieved when reporting'],
            ],
          },
        },
        { heading: 'Why victims under-report' },
        'Embarrassment, not knowing where to report, believing nothing can be done, small losses, or (for organisations) fear of reputational damage. Under-reporting makes the true scale of cybercrime hard to measure.',
        { heading: 'Supporting victims' },
        'Easy reporting channels (1930, cybercrime.gov.in), bank cooperation to freeze funds, awareness campaigns, counselling, and treating victims without blame.',
      ],
      example: {
        title: 'Victim profile of a “digital arrest” scam',
        input: 'A retired teacher receives a video call from a person in uniform claiming she is under investigation and must transfer savings for “verification”.',
        output: `Risk factors : trust in authority, fear, isolation
Harm         : financial loss, emotional distress
Why delayed  : told to keep it secret, feeling of shame
Prevention   : awareness that police never demand money online; report to 1930`,
        explanation: 'The scam exploits fear and respect for authority — understanding this shapes awareness messages.',
      },
      keyPoints: [
        'Victimology studies who is victimised, why, the harm and the response.',
        'Victims: individuals, organisations, government/society.',
        'Risk factors: low awareness, high exposure, emotional triggers, weak habits.',
        'Impacts: financial, emotional, reputational, legal; secondary victimisation.',
        'Under-reporting hides the true scale of cybercrime.',
      ],
      importantTerms: [
        { term: 'Victimology', meaning: 'Study of victims, their risk factors, harm and responses.' },
        { term: 'Secondary victimisation', meaning: 'Further harm caused by how others respond to the victim.' },
        { term: 'Under-reporting', meaning: 'Crimes that are not reported to authorities.' },
      ],
      examPoints: [
        'Define victimology.',
        'Classify **types of victims**.',
        'Explain **risk factors** and **impact** on victims.',
        'Discuss under-reporting and victim support.',
      ],
      questions: [
        {
          prompt: 'Explain victimology in the context of cybercrime.',
          plan: ANSWER_PLAN(
            'Study of victims of cybercrime',
            'Types of victims comparison',
            'Risk factors; impact; under-reporting; support',
            'Digital arrest scam on a retired teacher',
            'Prevention through targeted awareness',
          ),
        },
      ],
      keywords: ['victimology', 'risk factors', 'secondary victimisation', 'under-reporting', 'emotional triggers', 'victim support'],
      remember: [
        { prompt: 'What does victimology study?', answer: 'Victims — who they are, why targeted, harm and response.' },
        { prompt: 'One reason victims do not report?', answer: 'Embarrassment (or not knowing where to report).' },
        { prompt: 'What is secondary victimisation?', answer: 'Extra harm from being blamed or disbelieved after the crime.' },
      ],
    },

    // ------------------------------------------------------------------
    'virtual-and-physical-methods': {
      difficulty: 'medium',
      intro: 'Identity thieves use both the internet and old-fashioned theft. A complete defence covers both.',
      definition:
        'Identity information is obtained by **physical methods** — stealing or observing physical items such as mail, wallets, documents, devices and cards — and by **virtual (internet-facilitated) methods** — phishing, malware, data breaches, fake websites and social media harvesting.',
      simpleExplanation: {
        text: 'Some thieves dig through dustbins or peek over your shoulder at an ATM. Others never come near you — they send a fake link or buy your data from a breach. Both lead to the same result: your identity in their hands.',
        analogy: 'A house can be burgled through the front door or through an open window — you need to lock both.',
      },
      visual: {
        type: 'comparison',
        title: 'Physical vs virtual methods of identity theft',
        items: [
          {
            title: 'Physical methods',
            tone: 'muted',
            points: ['Mail theft', 'Dumpster diving', 'Stolen wallets, phones, laptops', 'Shoulder surfing', 'Card skimming at ATMs', 'Dishonest insiders'],
          },
          {
            title: 'Virtual methods',
            tone: 'accent',
            points: ['Phishing and fake websites', 'Spyware and keyloggers', 'Data breaches', 'Social media harvesting', 'SIM swap fraud', 'Malicious apps'],
          },
        ],
      },
      explanation: [
        { heading: 'Physical methods and their prevention' },
        {
          table: {
            columns: ['Method', 'Prevention'],
            rows: [
              ['Dumpster diving — searching discarded papers', 'Shred documents with personal data'],
              ['Mail theft', 'Secure letterbox; opt for e-statements'],
              ['Shoulder surfing', 'Cover the keypad; be aware of surroundings'],
              ['Card skimming', 'Check ATMs for attachments; use contactless or chip; set limits'],
              ['Theft of devices', 'Screen lock, encryption, remote wipe'],
              ['Insider access', 'Background checks, access control, audit logs'],
            ],
          },
        },
        { heading: 'Virtual methods and their prevention' },
        {
          table: {
            columns: ['Method', 'Prevention'],
            rows: [
              ['Phishing / fake websites', 'Verify URLs, MFA, awareness'],
              ['Spyware and keyloggers', 'Antivirus, updates, install apps only from official stores'],
              ['Data breaches', 'Unique passwords per site, breach alerts'],
              ['Social media harvesting', 'Limit public personal details'],
              ['SIM swap', 'Telecom PIN, alert on sudden signal loss'],
            ],
          },
        },
        { tip: 'Many attacks mix both: a stolen phone (physical) gives access to email and banking apps (virtual).' },
      ],
      example: {
        title: 'A mixed-method attack',
        input: 'A thief watches a victim enter a phone PIN in a bus, then steals the phone.',
        output: `Physical : shoulder surfing + device theft
Virtual  : unlocks phone, resets banking password using SMS OTP
Prevention: biometric lock, hide PIN entry, SIM PIN, app-level locks, quick SIM block`,
        explanation: 'Defence must cover both the physical device and the online accounts linked to it.',
      },
      keyPoints: [
        'Physical: mail theft, dumpster diving, skimming, shoulder surfing, device theft, insiders.',
        'Virtual: phishing, malware, breaches, social media harvesting, SIM swap.',
        'Each method has a matching preventive control.',
        'Attacks often combine physical and virtual methods.',
      ],
      importantTerms: [
        { term: 'Dumpster diving', meaning: 'Searching discarded material for useful information.' },
        { term: 'Shoulder surfing', meaning: 'Watching someone enter a PIN or password.' },
        { term: 'Skimming', meaning: 'Copying card data using a hidden device on an ATM or card reader.' },
        { term: 'Keylogger', meaning: 'Software or hardware that records keystrokes.' },
      ],
      examPoints: [
        'Define and **compare** physical and virtual methods.',
        'Explain each method with its **prevention**.',
        'Give an example of a combined attack.',
      ],
      questions: [
        {
          prompt: 'Explain the virtual and physical methods of identity theft and their prevention.',
          plan: ANSWER_PLAN(
            'Ways identity data is obtained offline and online',
            'Physical vs virtual comparison',
            'Each method with prevention',
            'Shoulder surfing followed by phone theft',
            'Defence must cover both channels',
          ),
        },
      ],
      keywords: ['physical methods', 'virtual methods', 'dumpster diving', 'shoulder surfing', 'skimming', 'keylogger', 'SIM swap', 'data breach'],
      remember: [
        { prompt: 'Searching dustbins for documents is called?', answer: 'Dumpster diving.' },
        { prompt: 'Copying card data at an ATM is called?', answer: 'Skimming.' },
        { prompt: 'Best protection for a stolen laptop’s data?', answer: 'Full-disk encryption (plus remote wipe).' },
      ],
    },
  },
}
