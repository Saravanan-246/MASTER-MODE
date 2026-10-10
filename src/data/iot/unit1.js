// Internet of Things — Unit I: Introduction to Internet of Things.
// Topic ids match the syllabus outline in ../subjects.js.
// Textbook context: Bahga & Madisetti, "Internet of Things: A Hands-On Approach".
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
    'Unit I builds the foundation of IoT: what makes something an “Internet of Things” system, how it is built physically (things and protocols) and logically (functional blocks, communication models and APIs), which technologies make it possible, and the six IoT levels used as deployment templates.',

  map: [
    { label: 'What is IoT?', topics: ['introduction-to-iot'] },
    { label: 'How it is built', topics: ['physical-design-of-iot', 'logical-design-of-iot'] },
    { label: 'What makes it possible', topics: ['iot-enabling-technologies'] },
    { label: 'How to deploy it', topics: ['iot-levels-and-deployment-templates'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'introduction-to-iot': {
      difficulty: 'easy',
      intro: 'Smart meters, fitness bands, connected street lights — IoT is everyday objects that sense, communicate and act.',
      definition:
        'The Internet of Things (IoT) is a dynamic global network infrastructure with self-configuring capabilities, based on standard and interoperable communication protocols, where physical and virtual “things” have identities, physical attributes and virtual personalities, use intelligent interfaces, and are seamlessly integrated into the information network (Bahga & Madisetti).',
      simpleExplanation: {
        text: 'Give an everyday object a sensor, a little computing power and a network connection, and it becomes a “thing” that can report what it senses and be controlled remotely. Join many such things to the Internet and to cloud services, and you get the Internet of Things.',
        analogy: 'A plant that could text you “I need water” — and a tap that could water it when you reply. IoT gives objects a voice and hands.',
      },
      visual: {
        type: 'flow',
        title: 'What an IoT system does',
        steps: [
          { label: 'Sense', note: 'sensors measure the world' },
          { label: 'Connect', note: 'send data over a network' },
          { label: 'Store & analyse', note: 'local or cloud' },
          { label: 'Act', note: 'actuators or alerts' },
        ],
      },
      explanation: [
        { heading: 'Characteristics of IoT' },
        {
          table: {
            columns: ['Characteristic', 'Meaning', 'Example'],
            rows: [
              ['Dynamic and self-adapting', 'Devices adapt to changing context and conditions', 'Camera switches to night mode in low light'],
              ['Self-configuring', 'Devices set themselves up, fetch updates, join networks with little manual work', 'Sensor joins the home Wi-Fi and registers itself'],
              ['Interoperable communication protocols', 'Devices talk to each other and to infrastructure using standard protocols', 'MQTT, HTTP, CoAP'],
              ['Unique identity', 'Each device has an identity (e.g. IP address or URI) and an interface to be queried and controlled', 'Each smart bulb is addressable'],
              ['Integrated into the information network', 'Devices exchange data with other devices and systems in the network', 'Weather node feeding a city dashboard'],
            ],
          },
        },
        { heading: 'Where IoT is used' },
        'IoT is applied in homes, cities, environment monitoring, energy, retail, logistics, agriculture, industry, and health and lifestyle — covered domain by domain in Unit II.',
        { heading: 'IoT system parts' },
        {
          list: [
            '**Things** — devices with sensors and/or actuators.',
            '**Connectivity** — wired or wireless networks carrying data.',
            '**Services and cloud** — storage, analysis and device management.',
            '**Applications** — web or mobile interfaces that let users monitor and control.',
          ],
        },
        { tip: 'Exam definitions are often long. Remember the key words: *dynamic, self-configuring, interoperable protocols, identity, integrated into the information network*.' },
      ],
      example: {
        title: 'A smart irrigation system',
        input: 'Soil-moisture sensor in a field, a valve controller, and a phone app.',
        output: `Sense   : moisture = 22% (dry)
Connect : reading sent over Wi-Fi to the cloud
Analyse : below 30% threshold → irrigation needed
Act     : valve opens; farmer gets a notification`,
        explanation: 'All the IoT characteristics show up: unique identity for each sensor, interoperable protocols, integration with a cloud service, and automatic action.',
      },
      keyPoints: [
        'IoT connects physical and virtual things with identities to the Internet.',
        'Five characteristics: dynamic & self-adapting, self-configuring, interoperable protocols, unique identity, integrated into the information network.',
        'An IoT system senses, connects, analyses and acts.',
        'Parts: things, connectivity, services/cloud, applications.',
      ],
      importantTerms: [
        { term: 'Thing', meaning: 'A device with a unique identity that can sense, actuate or monitor.' },
        { term: 'Sensor', meaning: 'Device that measures a physical quantity (temperature, light, motion).' },
        { term: 'Actuator', meaning: 'Device that acts on the environment (relay, motor, valve).' },
        { term: 'Interoperability', meaning: 'Ability of different devices and systems to work together.' },
      ],
      examPoints: [
        'Write the definition with its key words.',
        'Explain the five characteristics with examples.',
        'Draw sense → connect → analyse → act.',
        'Give one application.',
      ],
      questions: [
        {
          prompt: 'Define the Internet of Things. Explain the characteristics of IoT.',
          plan: ANSWER_PLAN(
            'Dynamic global network of things with identities, using interoperable protocols',
            'Sense → connect → store & analyse → act',
            'Five characteristics with examples; parts of an IoT system',
            'Smart irrigation system',
            'Things gain identity, connectivity and intelligence',
          ),
        },
      ],
      keywords: ['Internet of Things', 'things', 'dynamic', 'self-adapting', 'self-configuring', 'interoperable protocols', 'unique identity', 'sensor', 'actuator'],
      remember: [
        { prompt: 'Name the five characteristics of IoT.', answer: 'Dynamic & self-adapting, self-configuring, interoperable communication protocols, unique identity, integrated into the information network.' },
        { prompt: 'Sensor or actuator: a relay that switches a pump?', answer: 'Actuator.' },
      ],
    },

    // ------------------------------------------------------------------
    'physical-design-of-iot': {
      difficulty: 'medium',
      intro: 'Physical design answers two questions: what are the devices made of, and which protocols carry their data?',
      definition:
        'The physical design of an IoT system covers the **things** (node devices and their interfaces) and the **IoT protocols** used for communication, organised in four layers: **link**, **network/Internet**, **transport** and **application**.',
      simpleExplanation: {
        text: 'A “thing” has sensors and actuators, a processor, memory and a network interface. To send its data, it uses a stack of protocols — like the Internet does — from the physical link (Wi-Fi, Ethernet) up to the application message format (HTTP, MQTT).',
        analogy: 'Posting a letter: the envelope format (application), the address (network), the courier service (transport), and the road or rail it travels on (link).',
      },
      visual: {
        type: 'architecture',
        title: 'IoT protocol stack',
        layers: [
          { label: 'Application layer', note: 'how data is encoded and exchanged', items: ['HTTP', 'CoAP', 'WebSocket', 'MQTT', 'XMPP', 'DDS', 'AMQP'] },
          { label: 'Transport layer', note: 'end-to-end message transfer', items: ['TCP', 'UDP'] },
          { label: 'Network / Internet layer', note: 'addressing and routing', items: ['IPv4', 'IPv6', '6LoWPAN'] },
          { label: 'Link layer', note: 'physical medium', items: ['802.3 Ethernet', '802.11 WiFi', '802.16 WiMax', '802.15.4 LR-WPAN', '2G/3G/4G'] },
        ],
      },
      explanation: [
        { heading: 'Things in IoT' },
        'A thing is a device with a unique identity that can perform **sensing**, **actuation** and **monitoring**. Its interfaces include:',
        {
          list: [
            '**I/O interfaces** for sensors and actuators (e.g. GPIO, UART, SPI, I2C).',
            '**Interfaces for Internet connectivity** (Wi-Fi, Ethernet, cellular).',
            '**Memory and storage interfaces**.',
            '**Audio/video interfaces** where needed.',
          ],
        },
        'Data may be processed on the device or sent to a server or the cloud.',
        { heading: 'Link layer' },
        {
          table: {
            columns: ['Protocol', 'Notes'],
            rows: [
              ['802.3 Ethernet', 'Wired LAN; coaxial, twisted-pair or fibre'],
              ['802.11 WiFi', 'Wireless LAN, e.g. 802.11n, 802.11ac'],
              ['802.16 WiMax', 'Wireless broadband over larger areas'],
              ['802.15.4 LR-WPAN', 'Low-rate, low-power personal area networks; basis of ZigBee'],
              ['2G/3G/4G', 'Mobile (cellular) communication'],
            ],
          },
        },
        { heading: 'Network / Internet layer' },
        '**IPv4** uses 32-bit addresses (about 4.3 billion) — not enough for billions of things. **IPv6** uses 128-bit addresses. **6LoWPAN** (IPv6 over Low-power Wireless Personal Area Networks) compresses IPv6 headers so tiny 802.15.4 devices can use IP.',
        { heading: 'Transport layer' },
        '**TCP** is connection-oriented and reliable (ordered delivery, flow and congestion control). **UDP** is connectionless and lightweight — suitable for small, time-sensitive messages.',
        { heading: 'Application layer' },
        {
          table: {
            columns: ['Protocol', 'Style', 'Typical use'],
            rows: [
              ['HTTP', 'Request–response over TCP', 'REST APIs, web'],
              ['CoAP', 'Request–response over UDP, REST-like', 'Constrained devices'],
              ['WebSocket', 'Full-duplex over one TCP connection', 'Live dashboards'],
              ['MQTT', 'Publish–subscribe via a broker', 'Lightweight telemetry'],
              ['XMPP', 'Real-time messaging (XML streams)', 'Chat, presence, device messaging'],
              ['DDS', 'Brokerless publish–subscribe', 'Real-time machine-to-machine'],
              ['AMQP', 'Message queuing (queues, exchanges)', 'Business messaging'],
            ],
          },
        },
      ],
      example: {
        title: 'A temperature node’s stack',
        input: 'A battery-powered sensor in a greenhouse sends readings every minute.',
        output: `Link        : 802.15.4 LR-WPAN (low power)
Network     : 6LoWPAN (compressed IPv6)
Transport   : UDP (small messages)
Application : CoAP POST /temp  {"value": 31.2}`,
        explanation: 'Every layer is chosen for low power and small messages; a mains-powered device indoors might instead use Wi-Fi, TCP and MQTT.',
      },
      keyPoints: [
        'Physical design = things + protocols.',
        'Things sense, actuate and monitor; they have I/O, connectivity, memory and A/V interfaces.',
        'Link: Ethernet, WiFi, WiMax, LR-WPAN, cellular.',
        'Network: IPv4, IPv6, 6LoWPAN; transport: TCP, UDP.',
        'Application: HTTP, CoAP, WebSocket, MQTT, XMPP, DDS, AMQP.',
      ],
      importantTerms: [
        { term: '6LoWPAN', meaning: 'IPv6 over Low-power Wireless Personal Area Networks — header compression for tiny devices.' },
        { term: 'CoAP', meaning: 'Constrained Application Protocol — REST-like protocol over UDP for constrained devices.' },
        { term: 'MQTT', meaning: 'Message Queue Telemetry Transport — lightweight publish–subscribe protocol.' },
        { term: 'LR-WPAN', meaning: 'Low-Rate Wireless Personal Area Network (IEEE 802.15.4).' },
      ],
      examPoints: [
        'Explain things and their interfaces.',
        'Draw the four-layer protocol stack with protocols.',
        'Explain each layer’s protocols briefly.',
        'Contrast TCP and UDP; explain 6LoWPAN.',
      ],
      questions: [
        {
          prompt: 'Explain the physical design of IoT with the IoT protocol stack.',
          plan: ANSWER_PLAN(
            'Things and the protocols they use, in four layers',
            'Link / network / transport / application stack',
            'Thing interfaces; protocols at each layer',
            'Greenhouse sensor using 802.15.4, 6LoWPAN, UDP, CoAP',
            'Choose protocols by power, range and message size',
          ),
        },
      ],
      keywords: ['things', 'I/O interfaces', 'link layer', 'Ethernet', 'WiFi', '802.15.4', 'IPv6', '6LoWPAN', 'TCP', 'UDP', 'HTTP', 'CoAP', 'MQTT', 'XMPP', 'AMQP'],
      remember: [
        { prompt: 'Which protocol lets tiny 802.15.4 devices use IPv6?', answer: '6LoWPAN.' },
        { prompt: 'Which application protocol is publish–subscribe via a broker?', answer: 'MQTT.' },
      ],
    },

    // ------------------------------------------------------------------
    'logical-design-of-iot': {
      difficulty: 'medium',
      intro: 'Logical design describes an IoT system abstractly — what functions it needs and how its parts talk — without naming specific hardware.',
      definition:
        'The logical design of an IoT system is an abstract representation of its entities and processes. It covers the **IoT functional blocks**, the **IoT communication models** and the **IoT communication APIs**.',
      simpleExplanation: {
        text: 'Logically, every IoT system has the same building blocks: devices, communication, services, management, security and the application. Parts exchange data using one of four patterns — request–response, publish–subscribe, push–pull or exclusive pair — through REST or WebSocket APIs.',
        analogy: 'An organisation chart: it shows departments and how they communicate, not which person sits at which desk.',
      },
      visual: {
        type: 'architecture',
        title: 'IoT functional blocks',
        layers: [
          { label: 'Application', note: 'interface for users to view status and control the system' },
          { label: 'Management · Services · Security', note: 'side by side in the middle tier', items: ['Management', 'Services', 'Security'] },
          { label: 'Communication', note: 'protocols between devices and servers' },
          { label: 'Device', note: 'sensing, actuation, monitoring, control' },
        ],
        caption: 'Services include device monitoring, device control, data publishing and device discovery.',
      },
      explanation: [
        { heading: 'Functional blocks' },
        {
          list: [
            '**Device** — sensing, actuation, monitoring and control functions.',
            '**Communication** — handles communication for the IoT system (the protocols).',
            '**Services** — device monitoring, device control, data publishing and device discovery.',
            '**Management** — functions to govern the IoT system.',
            '**Security** — authentication, authorization, message and content integrity, data security.',
            '**Application** — the interface users use to control and monitor the system.',
          ],
        },
        { heading: 'Communication models' },
        {
          table: {
            columns: ['Model', 'How it works', 'Example'],
            rows: [
              ['Request–response', 'Client sends a request; server responds. Stateless.', 'App asks a server for the latest reading (HTTP)'],
              ['Publish–subscribe', 'Publishers send to topics on a broker; the broker forwards to subscribers. Publishers and consumers do not know each other.', 'MQTT sensor readings'],
              ['Push–pull', 'Producers push data to queues; consumers pull from queues. Queues decouple and buffer.', 'Readings queued for batch processing'],
              ['Exclusive pair', 'Bidirectional, full-duplex connection between client and server; stays open until closed. Stateful.', 'WebSocket live dashboard'],
            ],
          },
        },
        { heading: 'Communication APIs' },
        {
          list: [
            '**REST-based APIs** — follow the request–response model using HTTP methods (GET, POST, PUT, DELETE) on resources identified by URIs. REST constraints: client–server, **stateless**, cacheable, layered system, uniform interface, and optional code on demand.',
            '**WebSocket-based APIs** — follow the exclusive-pair model: one connection set up with a handshake, then both sides send messages at any time with low overhead. Suits real-time apps.',
          ],
        },
        {
          table: {
            columns: ['', 'REST', 'WebSocket'],
            rows: [
              ['Model', 'Request–response', 'Exclusive pair'],
              ['State', 'Stateless', 'Stateful'],
              ['Connection', 'New request each time', 'One persistent connection'],
              ['Overhead', 'Headers on every request', 'Low after setup'],
              ['Direction', 'Client initiates', 'Full duplex'],
            ],
          },
        },
      ],
      example: {
        title: 'Same light, two APIs',
        input: 'A smart light that can be switched and that reports its state.',
        output: `REST:      PUT /lights/7  {"state": "on"}   → 200 OK
WebSocket: connect once → server pushes {"light":7,"state":"on"} whenever it changes`,
        explanation: 'REST suits occasional commands; WebSocket suits a dashboard that must update instantly.',
      },
      keyPoints: [
        'Logical design = functional blocks + communication models + APIs.',
        'Blocks: device, communication, services, management, security, application.',
        'Models: request–response, publish–subscribe, push–pull, exclusive pair.',
        'REST APIs: stateless request–response; WebSocket APIs: full-duplex exclusive pair.',
      ],
      importantTerms: [
        { term: 'Functional block', meaning: 'A logical capability of an IoT system, e.g. device or services.' },
        { term: 'Broker', meaning: 'Intermediary that routes published messages to subscribers.' },
        { term: 'REST', meaning: 'Representational State Transfer — architectural style for web APIs.' },
        { term: 'WebSocket', meaning: 'Protocol for full-duplex communication over one TCP connection.' },
      ],
      examPoints: [
        'Draw the functional blocks diagram.',
        'Explain the four communication models with diagrams.',
        'Explain REST constraints and WebSocket APIs; compare them.',
      ],
      questions: [
        {
          prompt: 'Explain the logical design of IoT: functional blocks, communication models and communication APIs.',
          plan: ANSWER_PLAN(
            'Abstract representation of IoT entities and processes',
            'Functional blocks diagram',
            'Six blocks; four communication models; REST and WebSocket APIs',
            'Smart light via REST and via WebSocket',
            'Choose model and API by interaction pattern',
          ),
        },
      ],
      keywords: ['logical design', 'functional blocks', 'request-response', 'publish-subscribe', 'push-pull', 'exclusive pair', 'REST', 'stateless', 'WebSocket', 'full duplex'],
      remember: [
        { prompt: 'Which model uses queues between producers and consumers?', answer: 'Push–pull.' },
        { prompt: 'Is REST stateful or stateless?', answer: 'Stateless.' },
      ],
    },

    // ------------------------------------------------------------------
    'iot-enabling-technologies': {
      difficulty: 'easy',
      intro: 'IoT became practical only when several technologies matured together.',
      definition:
        'IoT enabling technologies are the technologies that make IoT systems possible: **wireless sensor networks**, **cloud computing**, **big data analytics**, **communication protocols** and **embedded systems**.',
      simpleExplanation: {
        text: 'Cheap sensors that network wirelessly collect the data, embedded systems give devices brains, protocols let them talk, the cloud stores and serves the data, and big data analytics turns it into insight.',
        analogy: 'A cricket match broadcast needs cameras, cables, a control room, a satellite and commentators — remove one and nothing reaches the viewer.',
      },
      visual: {
        type: 'network',
        title: 'Technologies behind IoT',
        center: { label: 'IoT', note: 'enabled by' },
        nodes: [
          { label: 'Wireless sensor networks', note: 'collect data' },
          { label: 'Cloud computing', note: 'store & serve' },
          { label: 'Big data analytics', note: 'find insight' },
          { label: 'Communication protocols', note: 'exchange data' },
          { label: 'Embedded systems', note: 'device brains' },
        ],
      },
      explanation: [
        { heading: 'Wireless sensor networks (WSN)' },
        'A WSN consists of distributed devices with sensors that monitor environmental or physical conditions. **End nodes** sense; **routers** relay; a **coordinator** collects data from all nodes and connects to the Internet. Protocols such as ZigBee (on 802.15.4) are common. WSNs are **self-organising** and can **heal** around failed nodes.',
        { heading: 'Cloud computing' },
        'Delivers applications and services over the Internet on demand, on a pay-per-use basis.',
        {
          table: {
            columns: ['Service model', 'Provides', 'IoT example'],
            rows: [
              ['IaaS — Infrastructure as a Service', 'Virtual machines, storage, networks', 'Rent a VM to run your IoT server'],
              ['PaaS — Platform as a Service', 'Platform and tools to build and deploy apps', 'IoT data platform with APIs'],
              ['SaaS — Software as a Service', 'Complete applications', 'Smart-home app used through a browser'],
            ],
          },
        },
        { heading: 'Big data analytics' },
        'IoT data is **big data**: huge **volume**, high **velocity** (streams arriving quickly) and great **variety** (numbers, images, text). It needs scalable storage and processing such as Hadoop and Spark (Unit V).',
        { heading: 'Communication protocols' },
        'The backbone of IoT: they define data formats, addressing, routing, flow control and error handling (see Physical Design of IoT).',
        { heading: 'Embedded systems' },
        'Computer systems with hardware and software built to perform specific tasks: a microprocessor or microcontroller, memory (RAM, ROM), networking, I/O units and storage. A Raspberry Pi or an Arduino board is the embedded core of many IoT devices.',
      ],
      example: {
        title: 'Forest fire detection',
        input: 'Hundreds of temperature, humidity and CO₂ sensors across a forest.',
        output: `WSN              : sensor nodes → routers → coordinator
Embedded systems : each node is a low-power microcontroller board
Protocols        : 802.15.4 / ZigBee in the forest, cellular to the Internet
Cloud            : stores readings and runs the alert service
Big data         : models flag abnormal heat + CO₂ patterns`,
        explanation: 'One application uses all five enabling technologies.',
      },
      keyPoints: [
        'Five enabling technologies: WSN, cloud, big data, protocols, embedded systems.',
        'WSN: end nodes, routers, coordinator; self-organising.',
        'Cloud service models: IaaS, PaaS, SaaS.',
        'Big data: volume, velocity, variety.',
        'Embedded systems give devices dedicated computing.',
      ],
      importantTerms: [
        { term: 'WSN', meaning: 'Wireless sensor network of distributed sensing nodes.' },
        { term: 'Coordinator', meaning: 'WSN node that collects data and connects to the Internet.' },
        { term: 'IaaS / PaaS / SaaS', meaning: 'Cloud service models: infrastructure, platform, software.' },
        { term: 'Embedded system', meaning: 'Computer built into a device for a specific task.' },
      ],
      examPoints: [
        'List the five enabling technologies.',
        'Explain WSN structure, cloud service models, big data Vs, embedded systems.',
        'Give an application using several of them.',
      ],
      questions: [
        {
          prompt: 'Explain the technologies that enable the Internet of Things.',
          plan: ANSWER_PLAN(
            'Technologies that make IoT possible',
            'IoT at the centre of five technologies',
            'WSN, cloud (IaaS/PaaS/SaaS), big data (3 Vs), protocols, embedded systems',
            'Forest fire detection using all five',
            'IoT is the combination, not one technology',
          ),
        },
      ],
      keywords: ['wireless sensor networks', 'coordinator', 'cloud computing', 'IaaS', 'PaaS', 'SaaS', 'big data', 'volume', 'velocity', 'variety', 'embedded systems'],
      remember: [
        { prompt: 'Which cloud model rents virtual machines?', answer: 'IaaS.' },
        { prompt: 'Three Vs of big data?', answer: 'Volume, velocity and variety.' },
      ],
    },

    // ------------------------------------------------------------------
    'iot-levels-and-deployment-templates': {
      difficulty: 'hard',
      intro: 'Six levels describe how IoT systems are deployed — from one device doing everything to many devices with cloud analytics.',
      definition:
        'IoT levels and deployment templates describe six standard ways to deploy an IoT system (Level-1 to Level-6), defined by the number of nodes, where data is **stored** and **analysed** (locally or in the cloud), and how the **application** and observers are arranged. They are built from common components: device, resource, controller service, database, web service, analysis component and application.',
      simpleExplanation: {
        text: 'Ask three questions: How many devices? Where is the data stored? Where is it analysed? Level-1 does everything on one device; higher levels move storage and analysis to the cloud and add more nodes, coordinators and controllers.',
        analogy: 'Running a shop: a single stall where the owner does everything (Level-1), up to a chain with many branches reporting to head office (Level-6).',
      },
      visual: {
        type: 'comparison',
        title: 'The six IoT levels',
        table: {
          columns: ['Level', 'Nodes', 'Data stored', 'Analysis', 'Example'],
          rows: [
            ['Level-1', 'Single', 'Locally', 'Locally', 'Home automation'],
            ['Level-2', 'Single', 'Cloud', 'Locally', 'Smart irrigation'],
            ['Level-3', 'Single', 'Cloud', 'Cloud', 'Tracking package handling'],
            ['Level-4', 'Multiple, independent', 'Cloud', 'Locally (+ cloud observers)', 'Noise monitoring'],
            ['Level-5', 'Multiple end nodes + coordinator', 'Cloud', 'Cloud', 'Forest fire detection'],
            ['Level-6', 'Multiple independent end nodes', 'Cloud', 'Cloud (centralised controller)', 'Weather monitoring'],
          ],
        },
      },
      explanation: [
        { heading: 'Components of IoT systems' },
        {
          list: [
            '**Device** — provides identification, remote sensing, actuating and monitoring.',
            '**Resource** — software on the device for accessing, processing and storing sensor data or controlling actuators, and for enabling network access.',
            '**Controller service** — native service on the device that interacts with the web services: sends data to the cloud and receives commands.',
            '**Database** — local or in the cloud; stores the data.',
            '**Web service** — the link between device, application, database and analysis components (REST or WebSocket).',
            '**Analysis component** — analyses data and produces results in a form users understand.',
            '**Application** — the interface users use to view status, process data and control the system.',
          ],
        },
        { heading: 'The levels in more detail' },
        {
          list: [
            '**Level-1** — one node senses/actuates, stores data, analyses it and hosts the application. Small data, light analysis. *Home automation: control lights and appliances.*',
            '**Level-2** — one node does sensing/actuation and local analysis; data is stored in the cloud and the app is cloud-based. Large data, light analysis. *Smart irrigation: soil moisture readings in the cloud.*',
            '**Level-3** — one node; data stored **and analysed** in the cloud; cloud app. Large data, heavy analysis. *Tracking package handling with accelerometer and gyroscope data.*',
            '**Level-4** — multiple nodes that perform local analysis; data stored in the cloud; app cloud-based; **local and cloud observer nodes** can subscribe to the data. *Noise monitoring across a city.*',
            '**Level-5** — multiple **end nodes** (sense/actuate) and one **coordinator node** that collects data and sends it to the cloud; storage and analysis in the cloud. Suited to **WSN**-based solutions. *Forest fire detection.*',
            '**Level-6** — multiple independent end nodes send data to the cloud; an analysis component stores results in the cloud database; a **centralised controller** knows the status of all nodes and sends control commands. *Weather monitoring with many stations.*',
          ],
        },
        { tip: 'To pick a level, ask: number of nodes → where storage happens → where analysis happens → is a coordinator or central controller needed?' },
      ],
      example: {
        title: 'Choosing a level',
        input: 'A city wants 50 noise sensors. Each sensor checks locally whether noise exceeds a limit; all readings go to the cloud; the police control room and a public website both watch the data.',
        output: 'Level-4: multiple nodes, local analysis, cloud storage, local and cloud observer nodes.',
        explanation: 'Many independent nodes with local analysis and observer apps is exactly the Level-4 template.',
      },
      keyPoints: [
        'Six levels differ in node count, storage location and analysis location.',
        'Level-1: all local; Level-2: cloud storage; Level-3: cloud storage + analysis.',
        'Level-4: multiple nodes with local analysis and observers.',
        'Level-5: end nodes + coordinator (WSN).',
        'Level-6: independent nodes + cloud analytics + centralised controller.',
      ],
      importantTerms: [
        { term: 'Controller service', meaning: 'Native device service that exchanges data and commands with web services.' },
        { term: 'Observer node', meaning: 'Node that subscribes to and receives data but does not control.' },
        { term: 'Coordinator node', meaning: 'Collects data from end nodes and sends it to the cloud (Level-5).' },
        { term: 'Centralised controller', meaning: 'Knows all end-node states and sends control commands (Level-6).' },
      ],
      examPoints: [
        'List the seven components of IoT systems.',
        'Explain each level with its example.',
        'Draw the comparison table.',
        'Choose the right level for a given scenario.',
      ],
      questions: [
        {
          prompt: 'Explain the IoT levels and deployment templates with examples.',
          plan: ANSWER_PLAN(
            'Six standard deployment templates by nodes, storage and analysis location',
            'Level comparison table',
            'Seven components; Level-1 to Level-6 with examples',
            'City noise monitoring → Level-4',
            'Higher levels move storage and analysis to the cloud',
          ),
        },
      ],
      keywords: ['IoT levels', 'deployment templates', 'device', 'resource', 'controller service', 'web service', 'analysis component', 'observer node', 'coordinator node', 'centralised controller'],
      remember: [
        { prompt: 'Which level uses a coordinator node?', answer: 'Level-5.' },
        { prompt: 'Example of Level-2?', answer: 'Smart irrigation.' },
        { prompt: 'Example of Level-6?', answer: 'Weather monitoring system.' },
      ],
    },
  },
}
