// Internet of Things — Unit IV: IoT Physical Servers and Cloud Offerings.
// Topic ids match the syllabus outline in ../subjects.js.
// Textbook context: Bahga & Madisetti, "Internet of Things: A Hands-On Approach".
// Inline markup in text: `code`, **keyword**.
//
// TODO(verify): the syllabus topic "Processes" is short in the handwritten
// source; the notes interpret it as the processes run by IoT servers and
// cloud storage (ingest, store, process, serve, act).
//
// Python code is shown with lang 'text' — the highlighter covers PHP/HTML/SQL only.

const ANSWER_PLAN = (definition, diagram, explanation, example, points) => [
  { label: 'Definition', hint: definition },
  { label: 'Diagram', hint: diagram },
  { label: 'Explanation', hint: explanation },
  { label: 'Example', hint: example },
  { label: 'Key points', hint: points },
]

export default {
  overview:
    'Unit IV is about the back end of IoT — where device data goes. You compare physical servers with cloud storage, follow the processes that run there, survey the cloud offerings for IoT, and learn cloud storage models. Then you meet concrete tools: the WAMP protocol and Autobahn, the Xively IoT cloud, Python web frameworks with Django REST APIs, and Amazon Web Services for IoT.',

  map: [
    { label: 'Servers & cloud', topics: ['iot-physical-servers-and-cloud-storage', 'processes', 'iot-physical-servers-and-cloud-offerings', 'introduction-to-cloud-storage-models'] },
    { label: 'Messaging', topics: ['apis-wamp', 'autobahn-for-iot'] },
    { label: 'IoT cloud platform', topics: ['xively-cloud-for-iot'] },
    { label: 'Build your own server', topics: ['python-web-application-frameworks', 'django-designing-restful-apis'] },
    { label: 'Public cloud', topics: ['amazon-web-services-for-iot'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'iot-physical-servers-and-cloud-storage': {
      difficulty: 'easy',
      intro: 'Devices collect data, but something has to store it, process it and serve it to apps. That something is a server — your own, or one in the cloud.',
      definition:
        'IoT physical servers and cloud storage are the back-end resources that receive, store, process and serve data from IoT devices. They can be **on-premise physical servers** owned and run by the organisation, or **cloud resources** rented on demand from a provider.',
      simpleExplanation: {
        text: 'A small system can keep data on the device or a local server. As devices and data grow, organisations move storage and processing to the cloud, which scales on demand and is paid for by use.',
        analogy: 'Keeping files on your own hard disk (physical server) vs on Google Drive (cloud): your own disk is under your control; the cloud grows as you need and is reachable everywhere.',
      },
      visual: {
        type: 'comparison',
        title: 'Physical server vs cloud',
        items: [
          { title: 'On-premise physical server', tone: 'muted', points: ['Bought and maintained in-house', 'Full control of hardware and data', 'Fixed capacity — plan ahead', 'Up-front cost (capex)'] },
          { title: 'Cloud storage & compute', tone: 'accent', points: ['Rented from a provider', 'Scales up and down on demand', 'Pay per use (opex)', 'Accessible from anywhere'] },
        ],
      },
      explanation: [
        { heading: 'What the back end does' },
        {
          list: [
            'Receives data from devices through APIs (REST, WebSocket, WAMP, MQTT).',
            'Stores raw and processed data in databases or object storage.',
            'Runs analysis — simple aggregation to big data analytics.',
            'Hosts web services and applications that users and other systems use.',
            'Sends commands back to devices (actuation).',
          ],
        },
        { heading: 'IoT level decides where storage lives' },
        'In **Level-1** data is stored locally on the device; from **Level-2** upwards the data is stored in the cloud (see IoT Levels and Deployment Templates in Unit I).',
        { heading: 'Choosing between them' },
        {
          table: {
            columns: ['Factor', 'Physical server', 'Cloud'],
            rows: [
              ['Scalability', 'Limited by hardware bought', 'Elastic, near-unlimited'],
              ['Cost model', 'Large up-front, then maintenance', 'Pay as you go'],
              ['Control & compliance', 'Full control, data stays on site', 'Shared responsibility with provider'],
              ['Latency', 'Low if close to devices', 'Depends on Internet connection'],
              ['Maintenance', 'Your IT team', 'Provider manages hardware'],
            ],
          },
        },
      ],
      example: {
        title: 'A growing project',
        input: 'A college starts with 10 sensors on one lab server, then expands to 2,000 sensors across campuses.',
        output: `Phase 1: on-premise server is enough (small data, local users)
Phase 2: move to cloud storage and compute — scale on demand, access from anywhere`,
        explanation: 'The right back end depends on scale, budget, access needs and control requirements.',
      },
      keyPoints: [
        'The back end receives, stores, processes and serves IoT data.',
        'Options: on-premise physical servers or cloud resources.',
        'Cloud: elastic, pay-per-use, accessible; physical: control, fixed capacity.',
        'IoT level indicates whether storage is local or in the cloud.',
      ],
      importantTerms: [
        { term: 'On-premise', meaning: 'Hardware located and managed at the organisation’s own site.' },
        { term: 'Elasticity', meaning: 'Ability to add or remove resources automatically as demand changes.' },
        { term: 'Capex / opex', meaning: 'Capital expenditure (buy up front) vs operating expenditure (pay as used).' },
      ],
      examPoints: [
        'List the functions of an IoT back end.',
        'Compare physical servers and cloud.',
        'Relate storage location to IoT levels.',
      ],
      questions: [
        {
          prompt: 'Compare IoT physical servers and cloud storage for IoT systems.',
          plan: ANSWER_PLAN(
            'Back-end resources that receive, store, process and serve IoT data',
            'Physical server vs cloud comparison',
            'Back-end functions; factor table; IoT levels',
            'College growing from 10 to 2,000 sensors',
            'Choose by scale, cost, control and latency',
          ),
        },
      ],
      keywords: ['physical server', 'on-premise', 'cloud storage', 'scalability', 'elasticity', 'pay per use', 'back end', 'IoT level'],
      remember: [
        { prompt: 'Main advantage of cloud storage for IoT?', answer: 'Elastic scalability with pay-per-use cost.' },
      ],
    },

    // ------------------------------------------------------------------
    processes: {
      difficulty: 'easy',
      intro: 'Behind every IoT dashboard is a chain of server-side processes. Knowing the chain helps you design and debug any IoT back end.',
      definition:
        'Processes on IoT servers and cloud storage are the stages that device data passes through on the back end: **ingestion**, **storage**, **processing and analysis**, **serving to applications**, and **actuation or notification**. They may run as **batch** or **real-time (stream)** processes.',
      simpleExplanation: {
        text: 'Data arrives, is saved, is worked on, is shown to people, and sometimes triggers an action back on a device. Some work is done instantly as data streams in; some is done later in big batches.',
        analogy: 'A post office: letters are received, sorted and stored, processed (routed), delivered, and sometimes a reply is sent back.',
      },
      visual: {
        type: 'flow',
        title: 'Back-end processes for IoT data',
        steps: [
          { label: 'Ingest', note: 'receive via REST, WebSocket, WAMP, MQTT' },
          { label: 'Store', note: 'database, object store, time series' },
          { label: 'Process & analyse', note: 'clean, aggregate, detect, predict' },
          { label: 'Serve', note: 'APIs, dashboards, reports' },
          { label: 'Act / notify', note: 'commands to devices, alerts' },
        ],
      },
      explanation: [
        { heading: 'The stages' },
        {
          table: {
            columns: ['Process', 'What happens', 'Example tool (this course)'],
            rows: [
              ['Ingestion', 'Accept device messages; authenticate; queue for processing', 'WAMP router, Django REST API, AWS Kinesis / SQS'],
              ['Storage', 'Save raw and processed data with timestamps', 'MySQL / RDS, DynamoDB, S3, Xively datastreams'],
              ['Processing & analysis', 'Cleaning, aggregation, thresholds, analytics', 'Python code, Hadoop, Spark, Storm'],
              ['Serving', 'Expose data to apps and users', 'Django views/REST APIs, dashboards'],
              ['Actuation & notification', 'Send commands or alerts when conditions are met', 'Controller services, email/SMS triggers'],
            ],
          },
        },
        { heading: 'Batch vs real-time processes' },
        {
          list: [
            '**Batch** — run periodically over large stored data (e.g. nightly daily averages). Tools: Hadoop MapReduce.',
            '**Real-time / stream** — process each reading as it arrives (e.g. fire alarm thresholds). Tools: Storm, Spark Streaming.',
          ],
        },
        { tip: 'When designing, ask for each requirement: does it need an answer now (stream) or later (batch)?' },
      ],
      example: {
        title: 'One reading’s journey',
        input: 'A soil sensor sends {"moisture": 26} at 10:02.',
        output: `Ingest : POST /api/readings/ accepted
Store  : row saved with device id and timestamp
Process: 26 < 30 threshold → "dry"
Act    : command "open valve" sent to the field controller; farmer notified
Batch  : at midnight, daily average moisture computed for the report`,
        explanation: 'The same data feeds both a real-time action and a later batch report.',
      },
      keyPoints: [
        'Back-end processes: ingest, store, process/analyse, serve, act/notify.',
        'Processes can be batch or real-time.',
        'Each stage maps to tools covered in Units IV and V.',
      ],
      importantTerms: [
        { term: 'Ingestion', meaning: 'Receiving and accepting incoming data into a system.' },
        { term: 'Batch processing', meaning: 'Processing stored data in large groups at intervals.' },
        { term: 'Stream processing', meaning: 'Processing data continuously as it arrives.' },
      ],
      examPoints: [
        'List and explain the back-end processes.',
        'Contrast batch and real-time processing.',
        'Trace one reading through the stages.',
      ],
      questions: [
        {
          prompt: 'Explain the processes involved in handling IoT data on servers and cloud storage.',
          plan: ANSWER_PLAN(
            'Stages data passes through on the IoT back end',
            'Ingest → store → process → serve → act',
            'Each stage with tools; batch vs real-time',
            'Soil sensor reading’s journey',
            'Design each requirement as stream or batch',
          ),
        },
      ],
      keywords: ['ingestion', 'storage', 'processing', 'analysis', 'serving', 'actuation', 'notification', 'batch', 'real-time', 'stream'],
      remember: [
        { prompt: 'Which kind of processing suits a fire alarm?', answer: 'Real-time (stream) processing.' },
      ],
    },

    // ------------------------------------------------------------------
    'iot-physical-servers-and-cloud-offerings': {
      difficulty: 'medium',
      intro: 'You rarely build an IoT back end from scratch. Cloud providers and platforms offer ready building blocks.',
      definition:
        'IoT physical servers and cloud offerings are the services an IoT developer can use for the back end — infrastructure (**IaaS**), platforms (**PaaS**) and software (**SaaS**) — including communication frameworks such as **WAMP/Autobahn**, IoT data platforms such as **Xively**, web frameworks such as **Django**, and public clouds such as **Amazon Web Services**.',
      simpleExplanation: {
        text: 'You can rent bare virtual servers and install everything yourself (IaaS), use a platform that already stores and exposes device data (PaaS), or build your own web services with a framework and host them on a cloud server.',
        analogy: 'Renting an empty flat (IaaS), a furnished flat (PaaS), or a hotel room with full service (SaaS).',
      },
      visual: {
        type: 'hierarchy',
        title: 'Cloud offerings covered in this unit',
        root: 'IoT back-end offerings',
        children: [
          { label: 'Messaging', note: 'device ↔ server communication', children: ['WAMP', 'Autobahn', 'Crossbar.io router'] },
          { label: 'IoT PaaS', note: 'device data platform', children: ['Xively'] },
          { label: 'Web frameworks', note: 'build your own services', children: ['Django', 'Django REST framework'] },
          { label: 'Public cloud (IaaS/PaaS)', note: 'compute, storage, analytics', children: ['EC2', 'S3', 'RDS', 'DynamoDB', 'Kinesis', 'SQS', 'EMR'] },
        ],
      },
      explanation: [
        { heading: 'Cloud service models for IoT' },
        {
          table: {
            columns: ['Model', 'You manage', 'Provider manages', 'IoT example'],
            rows: [
              ['IaaS', 'OS, runtime, apps, data', 'Hardware, virtualization, network', 'Amazon EC2 running your Django server'],
              ['PaaS', 'Apps and data', 'Everything below the app', 'Xively storing device datastreams'],
              ['SaaS', 'Only your use and data', 'The whole application', 'A ready smart-home dashboard'],
            ],
          },
        },
        { heading: 'Deployment models' },
        '**Public** cloud (shared provider infrastructure), **private** cloud (for one organisation), **hybrid** (a mix), and **community** cloud (shared by organisations with common needs).',
        { heading: 'Choosing an offering' },
        {
          list: [
            '**Need real-time messaging** between devices and apps → WAMP with Autobahn.',
            '**Need quick device data storage with APIs** → an IoT PaaS such as Xively.',
            '**Need custom logic and APIs** → Django on a cloud server.',
            '**Need scale and analytics** → public cloud services (AWS).',
          ],
        },
      ],
      example: {
        title: 'Assembling a back end',
        input: 'A city air-quality project with 500 sensors, a live map and monthly reports.',
        output: `Sensors publish readings via WAMP (Autobahn) → live map subscribes
Django REST API on EC2 stores readings in RDS
Monthly reports: EMR (Hadoop) jobs over data archived in S3`,
        explanation: 'Different offerings are combined, each doing what it is best at.',
      },
      keyPoints: [
        'Offerings span IaaS, PaaS and SaaS.',
        'This unit covers WAMP/Autobahn, Xively, Django and AWS.',
        'Deployment models: public, private, hybrid, community.',
        'Pick offerings by messaging, storage, custom logic and scale needs.',
      ],
      importantTerms: [
        { term: 'IaaS', meaning: 'Infrastructure as a Service — virtual machines, storage, networks.' },
        { term: 'PaaS', meaning: 'Platform as a Service — platform to build and run apps.' },
        { term: 'SaaS', meaning: 'Software as a Service — complete applications.' },
        { term: 'Hybrid cloud', meaning: 'Combination of public and private cloud.' },
      ],
      examPoints: [
        'Explain IaaS, PaaS, SaaS with IoT examples.',
        'List the offerings in this unit and their roles.',
        'Mention deployment models.',
      ],
      questions: [
        {
          prompt: 'Discuss the cloud offerings available for IoT.',
          plan: ANSWER_PLAN(
            'Cloud services and platforms used to build IoT back ends',
            'Tree: messaging, IoT PaaS, web frameworks, public cloud',
            'Service models with examples; deployment models; choosing',
            'City air-quality back end',
            'Combine offerings by need',
          ),
        },
      ],
      keywords: ['cloud offerings', 'IaaS', 'PaaS', 'SaaS', 'public cloud', 'private cloud', 'hybrid cloud', 'WAMP', 'Xively', 'Django', 'AWS'],
      remember: [
        { prompt: 'Is Xively IaaS or PaaS?', answer: 'PaaS (a platform for IoT device data).' },
      ],
    },

    // ------------------------------------------------------------------
    'introduction-to-cloud-storage-models': {
      difficulty: 'medium',
      intro: 'Sensor readings, device settings, images and logs need different kinds of storage. Clouds offer several models.',
      definition:
        'Cloud storage models are the ways cloud platforms store data: **relational (SQL) databases**, **non-relational (NoSQL) databases**, **object storage** and **time-series / datastream storage**. Applications reach them through **communication APIs**, such as REST and WebSocket-based APIs.',
      simpleExplanation: {
        text: 'Tables with fixed columns go in a relational database; flexible, fast-growing records go in NoSQL; files like images and logs go in object storage; sensor values over time fit a datastream/time-series store.',
        analogy: 'A college office uses registers (relational), loose index cards (NoSQL), a store-room for boxes (object storage), and a logbook (time series).',
      },
      visual: {
        type: 'hierarchy',
        title: 'Cloud storage models',
        root: 'Cloud storage',
        children: [
          { label: 'Relational (SQL)', note: 'tables, joins, transactions', children: ['MySQL', 'Amazon RDS'] },
          { label: 'Non-relational (NoSQL)', note: 'flexible schema, scale-out', children: ['Key-value: DynamoDB', 'Document: MongoDB'] },
          { label: 'Object storage', note: 'files & blobs', children: ['Amazon S3'] },
          { label: 'Time series / datastreams', note: 'values over time', children: ['Xively datastreams'] },
        ],
      },
      explanation: [
        {
          table: {
            columns: ['Model', 'Data shape', 'Strength', 'IoT use'],
            rows: [
              ['Relational (SQL)', 'Tables with fixed schema', 'Joins, transactions, consistency', 'Device registry, users, configuration'],
              ['NoSQL key-value / document', 'Flexible records', 'Huge scale, fast writes', 'High-volume sensor readings'],
              ['Object storage', 'Files (objects) in buckets', 'Cheap, durable, unlimited', 'Images, logs, archives for batch analytics'],
              ['Time series / datastreams', 'Timestamped values per stream', 'Efficient time-range queries', 'Temperature history per sensor'],
            ],
          },
        },
        { heading: 'Communication APIs' },
        {
          list: [
            '**REST APIs** — request–response over HTTP (GET, POST, PUT, DELETE). Simple and stateless; each request carries its own data.',
            '**WebSocket APIs** — a persistent full-duplex connection; low overhead for frequent, real-time messages.',
            '**WAMP** — builds publish–subscribe and remote procedure calls on top of WebSocket (next topic).',
          ],
        },
        { heading: 'Why the model matters' },
        'IoT data grows quickly and arrives continuously. Choosing a model that matches how data is written and queried keeps costs low and queries fast. Many systems use **several** models together — this is called **polyglot persistence**.',
      ],
      example: {
        title: 'Storage for a smart-parking system',
        input: 'Parking sensors, a user app, and camera snapshots at gates.',
        output: `Users & slot registry → relational (RDS)
Occupancy events      → NoSQL (DynamoDB), very high write rate
Gate snapshots        → object storage (S3)`,
        explanation: 'Each kind of data goes to the store that suits it.',
      },
      keyPoints: [
        'Four storage models: relational, NoSQL, object, time series.',
        'Relational for structured, related data; NoSQL for scale; object for files; time series for sensor history.',
        'Apps access storage via REST, WebSocket or WAMP APIs.',
        'Real systems often combine several models.',
      ],
      importantTerms: [
        { term: 'NoSQL', meaning: 'Non-relational databases with flexible schemas that scale horizontally.' },
        { term: 'Object storage', meaning: 'Stores data as objects (files + metadata) in buckets.' },
        { term: 'Time series', meaning: 'Sequence of timestamped values.' },
        { term: 'Polyglot persistence', meaning: 'Using different storage technologies for different data.' },
      ],
      examPoints: [
        'Classify the cloud storage models.',
        'Compare them with IoT uses.',
        'Explain REST and WebSocket communication APIs.',
      ],
      questions: [
        {
          prompt: 'Explain cloud storage models and communication APIs for IoT.',
          plan: ANSWER_PLAN(
            'Ways clouds store data, reached through communication APIs',
            'Tree of storage models',
            'Relational, NoSQL, object, time series; REST, WebSocket, WAMP',
            'Smart-parking storage choices',
            'Match the model to how data is written and read',
          ),
        },
      ],
      keywords: ['cloud storage', 'relational database', 'NoSQL', 'key-value', 'document store', 'object storage', 'time series', 'REST API', 'WebSocket API', 'polyglot persistence'],
      remember: [
        { prompt: 'Where should camera images be stored?', answer: 'Object storage (e.g. Amazon S3).' },
      ],
    },

    // ------------------------------------------------------------------
    'apis-wamp': {
      difficulty: 'hard',
      intro: 'IoT apps need both “tell everyone” (publish–subscribe) and “ask someone” (remote calls). WAMP provides both over one WebSocket.',
      definition:
        'WAMP (**Web Application Messaging Protocol**) is a sub-protocol of WebSocket that provides two messaging patterns: **publish–subscribe** and **routed remote procedure calls (RPC)**. Clients connect to a **router**, which acts as a **broker** for publish–subscribe and a **dealer** for RPC.',
      simpleExplanation: {
        text: 'A sensor publishes readings to a topic like `com.campus.temperature`; every app subscribed to that topic receives them. An app can also call a procedure such as `com.campus.light.switch` that another client provides — the router delivers the call and returns the result.',
        analogy: 'A college notice board (publish–subscribe) plus a reception desk that forwards your question to the right office and brings back the answer (RPC).',
      },
      visual: {
        type: 'network',
        title: 'WAMP roles',
        center: { label: 'Router', note: 'Broker + Dealer' },
        nodes: [
          { label: 'Publisher', note: 'publishes to a topic' },
          { label: 'Subscriber', note: 'receives topic events' },
          { label: 'Caller', note: 'calls a procedure' },
          { label: 'Callee', note: 'registers & executes procedures' },
        ],
      },
      explanation: [
        { heading: 'WAMP concepts' },
        {
          table: {
            columns: ['Concept', 'Meaning'],
            rows: [
              ['Transport', 'Channel connecting two peers; WebSocket by default'],
              ['Session', 'Conversation between two peers over a transport, joined to a **realm**'],
              ['Client', 'Peer that can play the roles Publisher, Subscriber, Caller, Callee'],
              ['Router', 'Peer that routes messages: **Broker** (pub–sub) and **Dealer** (RPC)'],
              ['Application code', 'Runs inside clients — publishing, subscribing, calling, providing procedures'],
            ],
          },
        },
        { heading: 'Publish–subscribe' },
        '**Publishers** send events to a **topic** (a URI such as `com.campus.temperature`). The **broker** forwards each event to all **subscribers** of that topic. Publishers and subscribers do not need to know each other.',
        { heading: 'Routed RPC' },
        'A **callee** registers a procedure (a URI) with the **dealer**. A **caller** calls it by name; the dealer routes the call to the callee and the result back to the caller. Caller and callee are decoupled — neither needs the other’s address.',
        { heading: 'Why WAMP suits IoT' },
        {
          list: [
            'Both messaging patterns over **one** WebSocket connection.',
            'Real-time, low-overhead messaging between devices, servers and browsers.',
            'Devices behind firewalls can still provide procedures, because they connect **out** to the router.',
          ],
        },
      ],
      example: {
        title: 'Message flow',
        input: 'Sensor client publishes 31.5 to `com.campus.temperature`; dashboard subscribed; an app calls `com.campus.light.switch("on")` registered by a lamp client.',
        output: `Broker  → dashboard receives event 31.5
Dealer  → lamp client runs switch("on") → result "ok" returned to the app`,
        explanation: 'The router handles both flows: events fan out to subscribers; calls are routed to the registered callee.',
      },
      keyPoints: [
        'WAMP is a WebSocket sub-protocol with pub–sub and routed RPC.',
        'Roles: publisher, subscriber, caller, callee (clients); broker and dealer (router).',
        'Topics and procedures are identified by URIs.',
        'Sessions are joined to a realm.',
        'Decouples peers; suits real-time IoT messaging.',
      ],
      importantTerms: [
        { term: 'WAMP', meaning: 'Web Application Messaging Protocol.' },
        { term: 'Broker', meaning: 'Router role that forwards published events to subscribers.' },
        { term: 'Dealer', meaning: 'Router role that routes RPC calls to callees.' },
        { term: 'Realm', meaning: 'A routing and administrative domain that sessions join.' },
        { term: 'Topic URI', meaning: 'Name of a pub–sub channel, e.g. com.campus.temperature.' },
      ],
      examPoints: [
        'Define WAMP and its two patterns.',
        'Explain transport, session, client roles and router roles.',
        'Draw the router with the four client roles.',
        'State why WAMP suits IoT.',
      ],
      questions: [
        {
          prompt: 'Explain WAMP and its concepts with a neat diagram.',
          plan: ANSWER_PLAN(
            'WebSocket sub-protocol providing publish–subscribe and routed RPC',
            'Router (broker + dealer) with publisher, subscriber, caller, callee',
            'Transport, session, realm, client roles, router roles, application code',
            'Temperature event and light-switch call',
            'One connection, two patterns, decoupled peers',
          ),
        },
      ],
      keywords: ['WAMP', 'WebSocket', 'publish-subscribe', 'RPC', 'router', 'broker', 'dealer', 'publisher', 'subscriber', 'caller', 'callee', 'realm', 'topic'],
      remember: [
        { prompt: 'Which router role handles RPC?', answer: 'The dealer.' },
        { prompt: 'Which transport does WAMP use by default?', answer: 'WebSocket.' },
      ],
    },

    // ------------------------------------------------------------------
    'autobahn-for-iot': {
      difficulty: 'medium',
      intro: 'WAMP is the protocol; Autobahn is the toolkit that lets you write WAMP clients in Python (and other languages).',
      definition:
        '**Autobahn** is an open-source project providing implementations of the WebSocket protocol and WAMP — for example **AutobahnPython** and **AutobahnJS**. With a WAMP router such as **Crossbar.io**, IoT devices and apps written with Autobahn can publish, subscribe, call and register procedures.',
      simpleExplanation: {
        text: 'On a Raspberry Pi, a small Autobahn Python program connects to the router and publishes sensor readings. A web page using AutobahnJS subscribes and updates live. No polling is needed.',
        analogy: 'WAMP is the language; Autobahn is the phrasebook that lets your device speak it.',
      },
      visual: {
        type: 'flow',
        title: 'Autobahn IoT setup',
        steps: [
          { label: 'Sensor client (AutobahnPython)', note: 'on the device' },
          { label: 'WAMP router', note: 'e.g. Crossbar.io' },
          { label: 'Dashboard client (AutobahnJS)', note: 'in the browser' },
        ],
      },
      explanation: [
        { heading: 'Components' },
        {
          list: [
            '**AutobahnPython** — WebSocket and WAMP for Python, running on Twisted or asyncio.',
            '**AutobahnJS** — WAMP for browsers and Node.js.',
            '**Router** — a WAMP router such as **Crossbar.io** that brokers events and deals RPCs. Clients connect to it with a URL and a **realm**.',
          ],
        },
        { heading: 'A client session' },
        'A client defines an `ApplicationSession` subclass. When the session joins the realm, `onJoin` runs; inside it the client can `publish`, `subscribe`, `call` or `register`.',
        {
          code: `from autobahn.asyncio.wamp import ApplicationSession, ApplicationRunner

class Dashboard(ApplicationSession):
    async def onJoin(self, details):
        def on_temp(value):
            print('Temperature:', value)
        await self.subscribe(on_temp, 'com.campus.temperature')

ApplicationRunner(url='ws://localhost:8080/ws', realm='realm1').run(Dashboard)`,
          lang: 'text',
        },
        { heading: 'RPC with Autobahn' },
        'A device registers a procedure with `await self.register(switch_light, \'com.campus.light.switch\')`; any client can then `await self.call(\'com.campus.light.switch\', \'on\')`.',
        { note: 'The textbook builds its examples on Autobahn with the Twisted framework; the asyncio version shown here uses the same session API.' },
      ],
      example: {
        title: 'Publishing sensor readings from a Raspberry Pi',
        files: [
          {
            name: 'sensor_publisher.py',
            lang: 'text',
            code: `import asyncio
import random
from autobahn.asyncio.wamp import ApplicationSession, ApplicationRunner

class SensorPublisher(ApplicationSession):
    async def onJoin(self, details):
        while True:
            temp = round(random.uniform(25, 35), 1)   # stand-in for a real sensor read
            self.publish('com.campus.temperature', temp)
            await asyncio.sleep(5)

runner = ApplicationRunner(url='ws://localhost:8080/ws', realm='realm1')
runner.run(SensorPublisher)`,
          },
        ],
        output: `Dashboard console:
Temperature: 29.4
Temperature: 30.1
Temperature: 28.8`,
        explanation:
          'Every 5 seconds the publisher sends a reading to the topic; the router forwards it to every subscriber, such as the Dashboard client above.',
      },
      keyPoints: [
        'Autobahn implements WebSocket and WAMP (Python, JavaScript, others).',
        'Clients join a realm on a router such as Crossbar.io.',
        '`onJoin` is where a client publishes, subscribes, calls or registers.',
        'Gives real-time device-to-browser messaging without polling.',
      ],
      importantTerms: [
        { term: 'AutobahnPython', meaning: 'Python library for WebSocket and WAMP clients.' },
        { term: 'Crossbar.io', meaning: 'Open-source WAMP router.' },
        { term: 'ApplicationSession', meaning: 'Autobahn class representing a WAMP session.' },
        { term: 'onJoin', meaning: 'Callback run when the session has joined the realm.' },
      ],
      examPoints: [
        'State what Autobahn is and its components.',
        'Explain how a client joins and publishes/subscribes.',
        'Write a small publisher or subscriber.',
      ],
      questions: [
        {
          prompt: 'How is Autobahn used to build IoT applications with WAMP?',
          plan: ANSWER_PLAN(
            'Open-source WebSocket/WAMP implementations used with a WAMP router',
            'Sensor client → router → dashboard client',
            'AutobahnPython/JS, router and realm, onJoin, publish/subscribe/call/register',
            'Raspberry Pi temperature publisher',
            'Real-time messaging without polling',
          ),
        },
      ],
      keywords: ['Autobahn', 'AutobahnPython', 'AutobahnJS', 'Crossbar.io', 'WAMP router', 'realm', 'ApplicationSession', 'onJoin', 'publish', 'subscribe'],
      remember: [
        { prompt: 'In which method does an Autobahn client start publishing?', answer: '`onJoin`' },
      ],
    },

    // ------------------------------------------------------------------
    'xively-cloud-for-iot': {
      difficulty: 'medium',
      intro: 'Xively was a ready-made cloud for device data: send readings, see graphs, set triggers — with no server code.',
      definition:
        'Xively (formerly Cosm and Pachube) is a commercial **Platform-as-a-Service (PaaS) for IoT**. Devices send data to **feeds** made of **datastreams** of timestamped **datapoints** through REST APIs and client libraries; Xively stores the data, visualises it, and can fire **triggers** when conditions are met.',
      simpleExplanation: {
        text: 'Register a device to get a feed and an API key. Each sensor is a datastream in that feed. Your device code pushes new values; Xively keeps the history and shows graphs, and other apps can read the data through the API.',
        analogy: 'A shared online spreadsheet that each device writes a new row to — with charts and alerts already built in.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Xively data model',
        root: 'Device',
        children: [
          { label: 'Feed', note: 'all data of one device', children: ['API key', 'Location, metadata'] },
          { label: 'Datastreams', note: 'one per sensor/channel', children: ['temperature', 'humidity', 'pressure'] },
          { label: 'Datapoints', note: 'timestamped values', children: ['28.5 @ 10:00', '28.7 @ 10:01'] },
          { label: 'Triggers', note: 'act on conditions', children: ['HTTP POST when > threshold'] },
        ],
      },
      explanation: [
        { heading: 'How a device uses Xively' },
        {
          list: [
            'Create a product/device in Xively; it gets a **feed ID** and an **API key**.',
            'On the device, use the Python library (`xively-python`) or the REST API.',
            'Create or update **datastreams** with new **current values** and timestamps.',
            'Xively stores the **datapoints**; the web console graphs them.',
            '**Triggers** send an HTTP POST to a URL when a datastream crosses a condition.',
          ],
        },
        {
          code: `import datetime
import xively

api = xively.XivelyAPIClient('YOUR_API_KEY')
feed = api.feeds.get(FEED_ID)

now = datetime.datetime.utcnow()
feed.datastreams = [
    xively.Datastream(stream_id='temperature', current_value=28.5, at=now),
    xively.Datastream(stream_id='humidity', current_value=61, at=now),
]
feed.update()`,
          lang: 'text',
        },
        { heading: 'Why a PaaS helps' },
        'The developer does not run servers or databases: storage, APIs, visualisation and triggers are provided. This is ideal for quick prototypes and for systems where devices simply need to log data to the cloud.',
        { note: 'The Xively service described in the textbook has since been discontinued. Its device → feed → datastream → datapoint model is still how most IoT data platforms are organised.' },
      ],
      example: {
        title: 'Weather station logging',
        input: 'A Raspberry Pi weather station updates its Xively feed every minute.',
        output: `Feed 12345: temperature 28.5, humidity 61, pressure 1008 (latest)
Graph shows last 24 hours; trigger posts an alert when temperature > 40`,
        explanation: 'All storage, graphing and alerting come from the platform; the Pi just sends values. Values are illustrative.',
      },
      keyPoints: [
        'Xively is an IoT PaaS (formerly Cosm/Pachube).',
        'Data model: feed → datastreams → datapoints.',
        'Devices use REST APIs or the Python library with an API key.',
        'Triggers act when conditions are met.',
        'No server or database to manage.',
      ],
      importantTerms: [
        { term: 'Feed', meaning: 'Collection of all datastreams of a device.' },
        { term: 'Datastream', meaning: 'One channel of data, e.g. temperature.' },
        { term: 'Datapoint', meaning: 'A single timestamped value in a datastream.' },
        { term: 'Trigger', meaning: 'Rule that sends a notification when a condition occurs.' },
      ],
      examPoints: [
        'Define Xively as an IoT PaaS.',
        'Explain feed, datastream, datapoint, trigger.',
        'Write the Python code to update a feed.',
      ],
      questions: [
        {
          prompt: 'Explain the Xively cloud for IoT with an example.',
          plan: ANSWER_PLAN(
            'IoT PaaS storing device data as feeds and datastreams',
            'Device → feed → datastreams → datapoints (+ triggers)',
            'Setup steps; API key; Python library; triggers; PaaS benefits',
            'Weather station updating its feed',
            'No server management; quick prototyping',
          ),
        },
      ],
      keywords: ['Xively', 'PaaS', 'feed', 'datastream', 'datapoint', 'trigger', 'API key', 'xively-python'],
      remember: [
        { prompt: 'What is a datapoint in Xively?', answer: 'A single timestamped value in a datastream.' },
      ],
    },

    // ------------------------------------------------------------------
    'python-web-application-frameworks': {
      difficulty: 'medium',
      intro: 'To build your own IoT web services and dashboards, you need a web framework. Python has several; the textbook uses Django.',
      definition:
        'A Python web application framework is a library that handles the common work of web applications — URL routing, request/response handling, templates, database access and security — so developers write only the application logic. **Django** is a full-stack framework following the **Model–Template–View (MTV)** pattern; **Flask** is a lightweight micro-framework.',
      simpleExplanation: {
        text: 'Without a framework you would write code to parse every HTTP request and build every response. Django gives you ready parts: a URL dispatcher, models that map to database tables, views that hold logic, and templates that render HTML.',
        analogy: 'A ready kitchen with stove, utensils and recipes — you just cook your dish.',
      },
      visual: {
        type: 'flow',
        title: 'How Django handles a request',
        steps: [
          { label: 'HTTP request', note: 'GET /readings/' },
          { label: 'URL dispatcher', note: 'urls.py picks a view' },
          { label: 'View', note: 'views.py — logic' },
          { label: 'Model', note: 'models.py ↔ database' },
          { label: 'Template', note: 'HTML rendered' },
          { label: 'HTTP response', note: 'page or JSON' },
        ],
      },
      explanation: [
        { heading: 'Why use a framework for IoT' },
        {
          list: [
            'Build REST APIs that devices call to send and receive data.',
            'Build dashboards for users.',
            'Get security features (authentication, CSRF protection) built in.',
            'Use an ORM so the same code works with MySQL, PostgreSQL or SQLite.',
          ],
        },
        { heading: 'Django architecture: MTV' },
        {
          table: {
            columns: ['Part', 'File', 'Role'],
            rows: [
              ['Model', '`models.py`', 'Defines data as Python classes; the ORM maps them to database tables'],
              ['Template', '`templates/*.html`', 'Presentation: HTML with placeholders'],
              ['View', '`views.py`', 'Logic: receives a request, uses models, returns a response'],
              ['URL dispatcher', '`urls.py`', 'Maps URL patterns to views'],
            ],
          },
        },
        { heading: 'Starting a Django project' },
        {
          code: `django-admin startproject iotserver
cd iotserver
python manage.py startapp sensors
python manage.py migrate
python manage.py runserver 0.0.0.0:8000`,
          lang: 'text',
        },
        { heading: 'Other Python frameworks' },
        '**Flask** (minimal core, add extensions as needed), **Pyramid**, **web2py** and **Bottle** are alternatives. Flask suits very small device-side web services; Django suits complete applications.',
      ],
      example: {
        title: 'A tiny Django view',
        files: [
          {
            name: 'sensors/views.py',
            lang: 'text',
            code: `from django.http import JsonResponse
from .models import Reading

def latest(request):
    r = Reading.objects.order_by('-timestamp').first()
    return JsonResponse({'sensor': r.sensor, 'value': r.value})`,
          },
          {
            name: 'iotserver/urls.py',
            lang: 'text',
            code: `from django.urls import path
from sensors import views

urlpatterns = [
    path('latest/', views.latest),
]`,
          },
        ],
        output: `GET /latest/
{"sensor": "lab-1", "value": 28.5}`,
        explanation: 'The URL dispatcher sends `/latest/` to the view, the view queries the model, and a JSON response goes back — the MTV flow without a template.',
      },
      keyPoints: [
        'Frameworks handle routing, requests, templates, database access and security.',
        'Django follows Model–Template–View with a URL dispatcher.',
        'Models use an ORM to map classes to tables.',
        'Flask is a lightweight alternative.',
      ],
      importantTerms: [
        { term: 'Web framework', meaning: 'Library that provides the common structure of web applications.' },
        { term: 'MTV', meaning: 'Model–Template–View, Django’s architecture.' },
        { term: 'ORM', meaning: 'Object-relational mapper — classes mapped to database tables.' },
        { term: 'URL dispatcher', meaning: 'Maps URL patterns to view functions.' },
      ],
      examPoints: [
        'Explain why web frameworks are used in IoT.',
        'Draw and explain Django’s MTV architecture.',
        'Write commands to start a project; name other frameworks.',
      ],
      questions: [
        {
          prompt: 'Explain the Django web application framework and its architecture.',
          plan: ANSWER_PLAN(
            'Full-stack Python web framework following Model–Template–View',
            'Request → URL dispatcher → view → model/template → response',
            'Model, template, view, URLs; project setup; other frameworks',
            'A JSON view returning the latest reading',
            'Frameworks speed up building IoT back ends',
          ),
        },
      ],
      keywords: ['web framework', 'Django', 'MTV', 'model', 'template', 'view', 'URL dispatcher', 'ORM', 'Flask', 'manage.py'],
      remember: [
        { prompt: 'Which Django file maps URLs to views?', answer: '`urls.py`' },
        { prompt: 'What does MTV stand for?', answer: 'Model–Template–View.' },
      ],
    },

    // ------------------------------------------------------------------
    'django-designing-restful-apis': {
      difficulty: 'hard',
      intro: 'Devices need a clean API to send readings and receive commands. Django REST framework builds one with very little code.',
      definition:
        'Designing RESTful APIs with Django means exposing IoT resources (devices, readings, commands) as **URIs** that clients manipulate with **HTTP methods** — GET, POST, PUT, DELETE — and JSON representations. The **Django REST framework** provides **serializers**, **viewsets** and **routers** to build such APIs quickly.',
      simpleExplanation: {
        text: 'Each kind of data becomes a resource with a URL, e.g. `/api/readings/`. A device POSTs a new reading; a dashboard GETs the list; an admin PUTs or DELETEs one. The serializer converts between database rows and JSON.',
        analogy: 'A library counter with fixed forms: borrow (POST), look up (GET), renew (PUT), return (DELETE) — the same forms for every book.',
      },
      visual: {
        type: 'comparison',
        title: 'REST endpoints for /api/readings/',
        table: {
          columns: ['HTTP method', 'URI', 'Action'],
          rows: [
            ['GET', '/api/readings/', 'List all readings'],
            ['POST', '/api/readings/', 'Create a new reading'],
            ['GET', '/api/readings/7/', 'Retrieve reading 7'],
            ['PUT', '/api/readings/7/', 'Replace reading 7'],
            ['DELETE', '/api/readings/7/', 'Delete reading 7'],
          ],
        },
      },
      explanation: [
        { heading: 'REST design principles' },
        {
          list: [
            '**Resources** identified by URIs (`/api/devices/`, `/api/readings/`).',
            '**Uniform interface**: standard HTTP methods with standard meanings.',
            '**Stateless**: every request carries all needed information (including authentication).',
            '**Representations** in JSON (or XML).',
            'Meaningful **status codes**: 200 OK, 201 Created, 400 Bad Request, 404 Not Found.',
          ],
        },
        { heading: 'Django REST framework building blocks' },
        {
          table: {
            columns: ['Piece', 'Role'],
            rows: [
              ['Model', 'Defines the data stored in the database'],
              ['Serializer', 'Converts model instances to/from JSON and validates input'],
              ['ViewSet', 'Provides list, create, retrieve, update and delete actions'],
              ['Router', 'Generates the URL patterns for a ViewSet automatically'],
            ],
          },
        },
        { tip: 'Add authentication (token or session) and permissions so only registered devices can POST readings.' },
      ],
      example: {
        title: 'A readings API in four files',
        files: [
          {
            name: 'models.py',
            lang: 'text',
            code: `from django.db import models

class Reading(models.Model):
    sensor = models.CharField(max_length=30)
    value = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)`,
          },
          {
            name: 'serializers.py',
            lang: 'text',
            code: `from rest_framework import serializers
from .models import Reading

class ReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reading
        fields = ['id', 'sensor', 'value', 'timestamp']`,
          },
          {
            name: 'views.py',
            lang: 'text',
            code: `from rest_framework import viewsets
from .models import Reading
from .serializers import ReadingSerializer

class ReadingViewSet(viewsets.ModelViewSet):
    queryset = Reading.objects.all().order_by('-timestamp')
    serializer_class = ReadingSerializer`,
          },
          {
            name: 'urls.py',
            lang: 'text',
            code: `from django.urls import include, path
from rest_framework import routers
from .views import ReadingViewSet

router = routers.DefaultRouter()
router.register(r'readings', ReadingViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]`,
          },
        ],
        input: 'Device sends: POST /api/readings/  {"sensor": "lab-1", "value": 28.5}',
        output: `201 Created
{"id": 42, "sensor": "lab-1", "value": 28.5, "timestamp": "2026-10-10T10:05:00Z"}

GET /api/readings/  → JSON list, newest first`,
        explanation:
          'The router created all five endpoints from one ViewSet; the serializer validated the JSON and saved it through the model.',
      },
      keyPoints: [
        'REST: resources as URIs, HTTP methods, stateless, JSON, status codes.',
        'Django REST framework: model, serializer, viewset, router.',
        'One ModelViewSet gives list, create, retrieve, update, delete.',
        'Add authentication and permissions for devices.',
      ],
      importantTerms: [
        { term: 'Serializer', meaning: 'Converts model objects to JSON and validates incoming JSON.' },
        { term: 'ViewSet', meaning: 'Class grouping the CRUD actions for a resource.' },
        { term: 'Router', meaning: 'Generates URL patterns for ViewSets.' },
        { term: 'Endpoint', meaning: 'A URI + method combination that clients call.' },
      ],
      examPoints: [
        'State REST principles.',
        'Draw the method/URI/action table.',
        'Explain model, serializer, viewset, router with code.',
        'Show a POST request and its response.',
      ],
      questions: [
        {
          prompt: 'Explain how to design a RESTful web API for IoT using Django.',
          plan: ANSWER_PLAN(
            'Exposing IoT resources as URIs manipulated with HTTP methods, built with Django REST framework',
            'Method / URI / action table',
            'REST principles; model, serializer, viewset, router; authentication',
            'Readings API with a POST from a device',
            'Little code, standard interface for devices and apps',
          ),
        },
      ],
      keywords: ['REST', 'RESTful API', 'Django REST framework', 'serializer', 'ViewSet', 'router', 'endpoint', 'GET', 'POST', 'PUT', 'DELETE', 'JSON', 'status code'],
      remember: [
        { prompt: 'Which HTTP method creates a new reading?', answer: 'POST.' },
        { prompt: 'What converts model objects to JSON in DRF?', answer: 'A serializer.' },
      ],
    },

    // ------------------------------------------------------------------
    'amazon-web-services-for-iot': {
      difficulty: 'medium',
      intro: 'AWS offers virtual servers, storage, databases, queues, streams and big-data clusters — all programmable from Python.',
      definition:
        'Amazon Web Services (AWS) is a public cloud offering services useful for IoT back ends, including **EC2** (virtual servers), **Auto Scaling**, **S3** (object storage), **RDS** (managed relational databases), **DynamoDB** (NoSQL), **Kinesis** (real-time data streams), **SQS** (message queues) and **EMR** (managed Hadoop). They can be used programmatically through Python libraries such as **boto/boto3**.',
      simpleExplanation: {
        text: 'Instead of buying servers, you start them on AWS in minutes. Device data can flow into a stream (Kinesis) or queue (SQS), be processed on EC2 or EMR, and be stored in S3, DynamoDB or RDS.',
        analogy: 'A huge hardware shop where you rent exactly the tools you need, by the hour.',
      },
      visual: {
        type: 'architecture',
        title: 'An IoT back end on AWS',
        layers: [
          { label: 'Devices', note: 'send data over the Internet', items: ['Sensors', 'Gateways'] },
          { label: 'Ingestion', note: 'buffer incoming data', items: ['Kinesis (streams)', 'SQS (queues)'] },
          { label: 'Processing', note: 'compute', items: ['EC2 + Auto Scaling', 'EMR (Hadoop)'] },
          { label: 'Storage', note: 'by data type', items: ['S3', 'DynamoDB', 'RDS'] },
        ],
      },
      explanation: [
        { heading: 'Services and their IoT roles' },
        {
          table: {
            columns: ['Service', 'What it is', 'IoT use'],
            rows: [
              ['EC2', 'Virtual servers (instances)', 'Host web services such as a Django API'],
              ['Auto Scaling', 'Adds/removes EC2 instances automatically', 'Handle changing device traffic'],
              ['S3', 'Object storage in buckets', 'Archive raw data, images, logs'],
              ['RDS', 'Managed relational database (e.g. MySQL)', 'Device registry, users, structured data'],
              ['DynamoDB', 'Managed NoSQL key-value/document database', 'High-rate sensor readings'],
              ['Kinesis', 'Real-time data streaming', 'Ingest continuous sensor streams'],
              ['SQS', 'Managed message queue', 'Decouple devices from processing (push–pull)'],
              ['EMR', 'Managed Hadoop/Spark clusters', 'Batch analytics on stored IoT data'],
            ],
          },
        },
        { heading: 'Programmatic access' },
        'The textbook uses the Python **boto** library to launch instances, create buckets and write to databases from code. Its successor, **boto3**, is used today:',
        {
          code: `from decimal import Decimal
import time
import boto3

table = boto3.resource('dynamodb', region_name='ap-south-1').Table('SensorReadings')
table.put_item(Item={
    'device_id': 'pi-01',
    'ts': int(time.time()),
    'temperature': Decimal('28.5'),
})`,
          lang: 'text',
        },
        { note: 'AWS later added **AWS IoT Core**, a dedicated service with an MQTT device gateway, device shadows and a rules engine. It builds on the same storage and analytics services listed here.' },
      ],
      example: {
        title: 'Choosing AWS services',
        input: 'A fleet of 10,000 delivery vans sends GPS every 10 seconds; managers need a live map and monthly route analysis.',
        output: `Ingest  : Kinesis stream for GPS messages
Live map: EC2 app (Auto Scaling) reads the stream → DynamoDB latest positions
Archive : raw stream saved to S3
Monthly : EMR job over S3 data for route analysis`,
        explanation: 'Each requirement maps to a service designed for it.',
      },
      keyPoints: [
        'AWS provides compute (EC2, Auto Scaling), storage (S3, RDS, DynamoDB), messaging (Kinesis, SQS) and analytics (EMR).',
        'Services are pay-per-use and scale on demand.',
        'Python boto/boto3 controls them from code.',
        'AWS IoT Core was added later as a dedicated device gateway.',
      ],
      importantTerms: [
        { term: 'EC2', meaning: 'Elastic Compute Cloud — virtual servers.' },
        { term: 'S3', meaning: 'Simple Storage Service — object storage.' },
        { term: 'Kinesis', meaning: 'Service for real-time data streams.' },
        { term: 'SQS', meaning: 'Simple Queue Service — managed message queues.' },
        { term: 'EMR', meaning: 'Elastic MapReduce — managed Hadoop/Spark.' },
      ],
      examPoints: [
        'List AWS services with their IoT roles.',
        'Draw an AWS IoT back-end architecture.',
        'Show programmatic access with boto/boto3.',
      ],
      questions: [
        {
          prompt: 'Explain Amazon Web Services for IoT.',
          plan: ANSWER_PLAN(
            'Public cloud services used to build IoT back ends',
            'Devices → ingestion → processing → storage on AWS',
            'EC2, Auto Scaling, S3, RDS, DynamoDB, Kinesis, SQS, EMR; boto',
            'Delivery-van GPS system',
            'Pay-per-use, scalable building blocks',
          ),
        },
      ],
      keywords: ['AWS', 'EC2', 'Auto Scaling', 'S3', 'RDS', 'DynamoDB', 'Kinesis', 'SQS', 'EMR', 'boto', 'boto3', 'AWS IoT Core'],
      remember: [
        { prompt: 'Which AWS service is managed Hadoop?', answer: 'EMR (Elastic MapReduce).' },
        { prompt: 'Which AWS service stores objects in buckets?', answer: 'S3.' },
      ],
    },
  },
}
