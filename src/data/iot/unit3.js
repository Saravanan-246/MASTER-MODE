// Internet of Things — Unit III: IoT System Management and Design Methodology.
// Topic ids match the syllabus outline in ../subjects.js.
// Textbook context: Bahga & Madisetti, "Internet of Things: A Hands-On Approach".
// Inline markup in text: `code`, **keyword**.
//
// TODO(verify): 'topic-pending-verification' is the illegible sixth topic of
// the handwritten syllabus. It deliberately has no notes; add them only once
// the topic name is confirmed from an official source.

const ANSWER_PLAN = (definition, diagram, explanation, example, points) => [
  { label: 'Definition', hint: definition },
  { label: 'Diagram', hint: diagram },
  { label: 'Explanation', hint: explanation },
  { label: 'Example', hint: example },
  { label: 'Key points', hint: points },
]

const DESIGN_STEPS = [
  { label: 'Purpose & requirements specification', detail: 'purpose, behaviour and requirements of the system' },
  { label: 'Process specification', detail: 'use cases from the purpose and requirements' },
  { label: 'Domain model specification', detail: 'main concepts, entities and objects of the domain' },
  { label: 'Information model specification', detail: 'structure of all information: virtual entities and attributes' },
  { label: 'Service specifications', detail: 'services, their inputs, outputs, schedules and effects' },
  { label: 'IoT level specification', detail: 'choose the deployment level (1–6)' },
  { label: 'Functional view specification', detail: 'functional groups: device, communication, services, management, security, application' },
  { label: 'Operational view specification', detail: 'options for deployment and operation: hosting, storage, devices' },
  { label: 'Device & component integration', detail: 'connect sensors, actuators and boards' },
  { label: 'Application development', detail: 'build the application and user interface' },
]

export default {
  overview:
    'Unit III has two threads. One is managing IoT systems: why management is needed, what network operators require, why SNMP falls short, and how NETCONF and YANG manage device configuration. The other is designing IoT systems with a generic, step-by-step design methodology that is independent of any particular product or service.',

  map: [
    { label: 'Why a methodology', topics: ['design-methodology'] },
    { label: 'Managing IoT systems', topics: ['iot-system-management', 'network-operator-requirements'] },
    { label: 'NETCONF & YANG', topics: ['iot-system-management-with-netconf-and-yang', 'netconf-netconf-protocol-and-yang', 'topic-pending-verification'] },
    { label: 'Designing IoT platforms', topics: ['iot-platforms-design-methodology', 'introduction-to-iot-design-methodology'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'design-methodology': {
      difficulty: 'easy',
      intro: 'Building an IoT system means choosing devices, networks, clouds and apps. Without a method, the design gets tied to whatever products you started with.',
      definition:
        'A design methodology is a structured, step-by-step approach for taking a system from its purpose and requirements to a working implementation. For IoT, a **generic design methodology** is one that is **independent of specific products, services or programming languages**.',
      simpleExplanation: {
        text: 'IoT systems have many interacting parts — devices, network resources, web services, analytics, databases and applications — and each part has many possible products. A methodology makes you decide what the system must do first, and pick products last, so the design stays flexible.',
        analogy: 'An architect draws the plan of a house before choosing brands of tiles or taps. If a brand is unavailable, the plan still works.',
      },
      visual: {
        type: 'comparison',
        title: 'Ad hoc vs methodical design',
        items: [
          { title: 'Ad hoc design', tone: 'bad', points: ['Starts from specific products', 'Design tied to those choices', 'Hard to add features or swap a component', 'Hard to test and maintain'] },
          { title: 'Generic design methodology', tone: 'good', points: ['Starts from purpose & requirements', 'Products chosen at the end', 'Easy to update or replace parts', 'Less design, testing and maintenance time'] },
        ],
      },
      explanation: [
        { heading: 'Why IoT design is challenging' },
        {
          list: [
            'Many components interact: devices, gateways, network resources, web services, analytics, databases and applications.',
            'Each component has many vendor-specific options.',
            'Designers often design around particular products, so later changes (new features, a different cloud) become complex.',
          ],
        },
        { heading: 'Benefits of a generic methodology' },
        {
          list: [
            '**Product independence** — the design is not locked to one vendor, service or language.',
            '**Reduced design, testing and maintenance time**.',
            '**Better interoperability** between components.',
            '**Lower cost** of changes over the system’s life.',
          ],
        },
        { heading: 'The shape of the methodology' },
        'The methodology moves from **what** to **how**: specifications (purpose, process, domain, information, services, IoT level), then views (functional and operational), then device and component integration, and finally application development. Its full ten steps are covered in IoT Platforms Design Methodology.',
        { note: 'System management (NETCONF–YANG) appears inside the methodology too: management is one of the functional groups chosen in the functional and operational views.' },
      ],
      example: {
        title: 'Swapping a cloud service',
        input: 'A smart-lighting product used one vendor’s cloud. The vendor shuts down the service.',
        output: `Ad hoc design   : app, device firmware and database all rewritten
Methodical design: only the operational view changes (new hosting/storage option)`,
        explanation: 'Because requirements, services and functional groups were specified independently of products, only the product choice changes.',
      },
      keyPoints: [
        'A design methodology is a structured path from requirements to implementation.',
        'The IoT methodology is independent of products, services and languages.',
        'IoT design is hard because of many interacting components and vendor options.',
        'Benefits: flexibility, less design/testing/maintenance time, interoperability, lower cost.',
      ],
      importantTerms: [
        { term: 'Design methodology', meaning: 'A defined sequence of steps for designing a system.' },
        { term: 'Product independence', meaning: 'Design decisions do not depend on a specific vendor’s product.' },
        { term: 'Interoperability', meaning: 'Ability of components to work together.' },
      ],
      examPoints: [
        'Define design methodology and the IoT generic methodology.',
        'Explain why IoT design is challenging.',
        'List the benefits.',
      ],
      questions: [
        {
          prompt: 'Why is a design methodology needed for IoT systems?',
          plan: ANSWER_PLAN(
            'A structured, product-independent path from requirements to implementation',
            'Ad hoc vs methodical design comparison',
            'Challenges of IoT design; benefits of a generic methodology; overall shape',
            'Swapping a discontinued cloud service',
            'Decide what first, choose products last',
          ),
        },
      ],
      keywords: ['design methodology', 'generic methodology', 'product independence', 'requirements', 'interoperability', 'maintenance'],
      remember: [
        { prompt: 'What is the key property of the IoT design methodology?', answer: 'It is independent of specific products, services or programming languages.' },
      ],
    },

    // ------------------------------------------------------------------
    'iot-system-management': {
      difficulty: 'medium',
      intro: 'A home has a few devices; a city may have a million. Managing their configuration and health by hand is impossible.',
      definition:
        'IoT system management covers configuring, monitoring and maintaining the devices and network of an IoT system. It is needed for automating configuration, monitoring operational and statistical data, improving reliability, and handling system-wide and multiple configurations. The traditional protocol, **SNMP**, has limitations that make it unsuitable for configuring IoT systems.',
      simpleExplanation: {
        text: 'Every device has settings (configuration) and live status (operational data). Management tools must change settings safely across many devices at once, read status reliably, and undo changes if something goes wrong.',
        analogy: 'A school principal managing hundreds of classrooms: timetables (configuration) must change together, attendance (operational data) must be collected, and a bad timetable change must be reversible.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Need for IoT systems management',
        root: 'Why manage IoT systems?',
        children: [
          { label: 'Automating configuration', children: ['Fewer manual errors'] },
          { label: 'Monitoring operational & statistical data', children: ['Status, counters'] },
          { label: 'Improved reliability', children: ['Validate & roll back'] },
          { label: 'System-wide configuration', children: ['All devices consistent'] },
          { label: 'Multiple system configurations', children: ['Switch between saved setups'] },
          { label: 'Retrieving & reusing configurations', children: ['Copy to new devices'] },
        ],
      },
      explanation: [
        { heading: 'Why management is needed' },
        {
          list: [
            '**Automating configuration** — configure many devices automatically instead of one by one.',
            '**Monitoring operational and statistical data** — status, performance and usage of each device.',
            '**Improved reliability** — validate configurations before applying them; roll back on failure.',
            '**System-wide configuration** — apply changes as **transactions** across all devices so the system stays consistent.',
            '**Multiple system configurations** — keep several configurations and switch between them.',
            '**Retrieving and reusing configurations** — read the current configuration and apply it to similar devices.',
          ],
        },
        { heading: 'SNMP (Simple Network Management Protocol)' },
        'SNMP is a widely used protocol for monitoring and managing network devices. A **network management station (manager)** sends requests to an **SNMP agent** on each managed device; device data is described in a **Management Information Base (MIB)**. SNMP runs over UDP.',
        { heading: 'Limitations of SNMP' },
        {
          list: [
            'SNMP is **stateless** and runs over connectionless UDP — unreliable, with no support for multi-step **transactions**.',
            'It is mainly used for **monitoring**; MIBs often lack writable objects, so it is weak for configuration.',
            'It is hard to **distinguish configuration data from state (operational) data** in MIBs.',
            'Retrieving the **current configuration** of a device is difficult.',
            'There is no easy way to **roll back** a failed configuration change.',
            'Vendor-specific MIBs create **interoperability** problems.',
          ],
        },
        { tip: 'These limitations are why NETCONF and YANG were developed — they are the subject of the next topics.' },
      ],
      example: {
        title: 'A failed firmware setting',
        input: 'An operator changes the reporting interval on 5,000 street-light controllers; the change fails on 300 of them.',
        output: `With SNMP: no transaction → 4,700 updated, 300 not → inconsistent system
With transaction-based management: change validated, applied to all or none, or rolled back`,
        explanation: 'System-wide, transactional configuration is a core IoT management need that SNMP cannot meet.',
      },
      keyPoints: [
        'Management = configuration, monitoring and maintenance of IoT devices.',
        'Needs: automation, monitoring, reliability, system-wide and multiple configurations, reuse.',
        'SNMP: manager, agent, MIB, over UDP.',
        'SNMP limitations: stateless/UDP, no transactions, monitoring-focused, config vs state unclear, no rollback, interoperability issues.',
      ],
      importantTerms: [
        { term: 'Configuration data', meaning: 'Settings that control how a device behaves.' },
        { term: 'Operational (state) data', meaning: 'Live status and statistics of a device.' },
        { term: 'SNMP', meaning: 'Simple Network Management Protocol.' },
        { term: 'MIB', meaning: 'Management Information Base — data definitions for SNMP-managed devices.' },
        { term: 'Transaction', meaning: 'A set of changes applied completely or not at all.' },
      ],
      examPoints: [
        'List the needs for IoT systems management.',
        'Explain SNMP components.',
        'List the limitations of SNMP.',
      ],
      questions: [
        {
          prompt: 'Explain the need for IoT systems management. What are the limitations of SNMP?',
          plan: ANSWER_PLAN(
            'Configuring, monitoring and maintaining IoT devices and networks',
            'Tree of management needs',
            'Six needs; SNMP manager/agent/MIB; SNMP limitations',
            'Failed change on 300 of 5,000 controllers',
            'Leads to NETCONF–YANG',
          ),
        },
      ],
      keywords: ['systems management', 'configuration data', 'operational data', 'SNMP', 'MIB', 'SNMP agent', 'transactions', 'rollback', 'limitations of SNMP'],
      remember: [
        { prompt: 'Which transport does SNMP use?', answer: 'UDP (connectionless).' },
        { prompt: 'Name two limitations of SNMP.', answer: 'No transactions/rollback; hard to separate configuration from state data (also: monitoring-focused, interoperability issues).' },
      ],
    },

    // ------------------------------------------------------------------
    'network-operator-requirements': {
      difficulty: 'medium',
      intro: 'Network operators listed what they actually need from a management system. Those requirements shaped NETCONF.',
      definition:
        'Network operator requirements are the capabilities operators need from a network/IoT management protocol — ease of use, clear separation of configuration and state data, network-wide transactional configuration, configuration deltas, dump and restore, validation, schemas, comparison, and role-based access control, among others.',
      simpleExplanation: {
        text: 'Operators want to treat the whole network as one system: change it safely in one transaction, see exactly what changed, save and restore configurations, check them before applying, and control who can change what.',
        analogy: 'Editing a shared document with track changes, version history, a spell-check before saving, and permissions on who can edit.',
      },
      visual: {
        type: 'process',
        title: 'Operator requirements (as listed in the textbook)',
        steps: [
          { label: 'Ease of use', detail: 'simple to use for operators' },
          { label: 'Distinction between configuration and state data', detail: 'clearly separated' },
          { label: 'Fetch configuration and state data separately', detail: 'and compare across devices' },
          { label: 'Configuration of the network as a whole', detail: 'not device by device' },
          { label: 'Configuration transactions across devices', detail: 'all or nothing' },
          { label: 'Configuration deltas', detail: 'only the changes' },
          { label: 'Dump and restore configurations', detail: 'save and reload' },
          { label: 'Configuration validation', detail: 'check before applying' },
          { label: 'Configuration database schemas', detail: 'standard data models' },
          { label: 'Comparing configurations', detail: 'see differences' },
          { label: 'Role-based access control', detail: 'permissions by role' },
          { label: 'Consistency of access control lists', detail: 'ACLs consistent across devices' },
          { label: 'Multiple configuration sets', detail: 'keep and switch between sets' },
          { label: 'Data-oriented and task-oriented access control', detail: 'both supported' },
        ],
      },
      explanation: [
        { heading: 'Grouping the requirements' },
        {
          table: {
            columns: ['Group', 'Requirements'],
            rows: [
              ['Usability', 'Ease of use'],
              ['Clear data handling', 'Distinguish configuration vs state data; fetch them separately; configuration database schemas'],
              ['Network-wide change', 'Configure the network as a whole; transactions across devices; configuration deltas'],
              ['Safety and recovery', 'Validation before applying; dump and restore; compare configurations; multiple configuration sets'],
              ['Security', 'Role-based access control; consistent access control lists; data- and task-oriented access control'],
            ],
          },
        },
        { heading: 'Why these matter for IoT' },
        'IoT systems have huge numbers of similar devices. Operators must push one consistent configuration to all of them, verify it first, see exactly what changed, recover quickly if it fails, and stop unauthorised changes.',
        { heading: 'How NETCONF–YANG answers them' },
        {
          list: [
            'Separate operations for configuration (`get-config`) and state (`get`) data.',
            'Transactions with **lock**, **candidate** datastore, **validate** and **commit**, and rollback.',
            'YANG data models provide standard **schemas** for configuration data.',
            'Access control and secure transport (SSH).',
          ],
        },
        { note: 'These requirements come from operators’ input to the IETF network-management community; the textbook lists them as the motivation for NETCONF.' },
      ],
      example: {
        title: 'Requirement in action',
        input: 'An operator must change the sampling rate on all 800 air-quality sensors in a city.',
        output: `Validate the new configuration → lock → apply as one transaction
If any device fails → roll back all → compare old vs new to find the cause`,
        explanation: 'Network-wide transactions, validation, rollback and comparison are all operator requirements in use.',
      },
      keyPoints: [
        'Operators need easy, network-wide, transactional configuration.',
        'Configuration and state data must be clearly separated and fetched separately.',
        'Validation, dump/restore, deltas and comparison make changes safe.',
        'Role-based and consistent access control secure the system.',
        'NETCONF–YANG was designed to meet these requirements.',
      ],
      importantTerms: [
        { term: 'Configuration delta', meaning: 'Only the differences between two configurations.' },
        { term: 'Role-based access control', meaning: 'Permissions granted by user role.' },
        { term: 'Access control list (ACL)', meaning: 'Rules specifying who/what is allowed on a device.' },
      ],
      examPoints: [
        'List the operator requirements.',
        'Group them and explain each briefly.',
        'Link them to NETCONF–YANG features.',
      ],
      questions: [
        {
          prompt: 'Explain the network operator requirements for IoT/network management.',
          plan: ANSWER_PLAN(
            'Capabilities operators need from a management protocol',
            'Numbered list of the requirements',
            'Grouped explanation; why they matter for IoT; NETCONF–YANG answers',
            'City-wide sensor configuration change',
            'Safe, network-wide, controlled configuration',
          ),
        },
      ],
      keywords: ['network operator requirements', 'configuration vs state data', 'transactions', 'configuration deltas', 'dump and restore', 'validation', 'role-based access control', 'ACL'],
      remember: [
        { prompt: 'Give three operator requirements.', answer: 'Any three: ease of use, separate config/state data, network-wide transactions, deltas, dump/restore, validation, schemas, comparison, RBAC, consistent ACLs, multiple sets.' },
      ],
    },

    // ------------------------------------------------------------------
    'iot-system-management-with-netconf-and-yang': {
      difficulty: 'hard',
      intro: 'NETCONF moves the configuration; YANG describes it. Together they give IoT systems transactional, model-driven management.',
      definition:
        'IoT system management with NETCONF–YANG uses the **NETCONF** protocol to retrieve and change device configuration and state, and **YANG** data models to define that data. A management system talks to managed devices through components such as a transaction manager, rollback manager, data model manager, configuration validator and configuration database.',
      simpleExplanation: {
        text: 'You describe each device’s settings and status in a YANG model. The management system uses NETCONF to send changes; on the device side, the change is checked, applied as a transaction, stored, and can be rolled back.',
        analogy: 'A bank transfer system: the form (YANG model) defines the fields, the transfer (NETCONF transaction) either completes fully or is reversed.',
      },
      visual: {
        type: 'architecture',
        title: 'NETCONF–YANG management architecture',
        layers: [
          { label: 'Management system', note: 'operator sends NETCONF messages', items: ['Management API'] },
          { label: 'NETCONF server side', note: 'on or for the managed device', items: ['Transaction manager', 'Rollback manager', 'Data model manager', 'Configuration validator'] },
          { label: 'Configuration database', note: 'configuration + operational data', items: ['Configuration API', 'Data provider API'] },
          { label: 'Managed device', note: 'device applications', items: ['Sensors', 'Actuators', 'Device software'] },
        ],
      },
      explanation: [
        { heading: 'Components' },
        {
          table: {
            columns: ['Component', 'Role'],
            rows: [
              ['Management system', 'Used by the operator to send NETCONF messages to devices'],
              ['Management API', 'Lets management applications start NETCONF sessions'],
              ['Transaction manager', 'Executes NETCONF transactions with ACID properties'],
              ['Rollback manager', 'Generates transactions to restore the previous configuration'],
              ['Data model manager', 'Keeps track of YANG models and which application provides each part'],
              ['Configuration validator', 'Checks that a configuration would be valid before it is applied'],
              ['Configuration database', 'Stores configuration and operational data'],
              ['Configuration API', 'Lets device applications read configuration and write operational data'],
              ['Data provider API', 'Lets device applications register callbacks for parts of the YANG model'],
            ],
          },
        },
        { heading: 'Steps to manage an IoT device with NETCONF–YANG' },
        {
          list: [
            '**Create a YANG model** of the system defining configuration and state data.',
            '**Compile/convert** the model (e.g. YANG → YIN XML) and generate the server-side module skeleton.',
            '**Fill in the device management code** (callbacks that read sensors or change settings).',
            '**Build** the module.',
            '**Load** the YANG model and module into the NETCONF server.',
            'The operator **manages the device** with a NETCONF client: get state, edit configuration, commit.',
          ],
          ordered: true,
        },
        'The textbook demonstrates these steps with the open-source **Netopeer** NETCONF tools.',
        { heading: 'Advantages over SNMP' },
        {
          list: [
            'Transactions with validation and rollback.',
            'Clear separation of configuration and state data.',
            'Standard, readable data models (YANG).',
            'Secure, connection-oriented transport (SSH).',
          ],
        },
      ],
      example: {
        title: 'Changing a weather station’s interval',
        input: 'Operator sets `interval = 30` seconds on a weather-station device.',
        output: `Validator: 30 is within 10..3600 → valid
Transaction manager: apply to candidate → commit
Config DB updated; device callback changes the sampling timer
If commit had failed → rollback manager restores the old interval`,
        explanation: 'Each architecture component plays its part in a safe, reversible change.',
      },
      keyPoints: [
        'NETCONF carries configuration operations; YANG models the data.',
        'Device-side components: transaction manager, rollback manager, data model manager, validator, config database, APIs.',
        'Steps: YANG model → compile → code callbacks → build → load → manage.',
        'Gives transactions, validation, rollback and secure transport.',
      ],
      importantTerms: [
        { term: 'Transaction manager', meaning: 'Executes NETCONF transactions with ACID guarantees.' },
        { term: 'Rollback manager', meaning: 'Restores the original configuration if needed.' },
        { term: 'Data model manager', meaning: 'Tracks YANG models and their data providers.' },
        { term: 'ACID', meaning: 'Atomicity, consistency, isolation, durability.' },
      ],
      examPoints: [
        'Draw the NETCONF–YANG management architecture.',
        'Explain each component’s role.',
        'Write the steps for managing a device.',
        'State advantages over SNMP.',
      ],
      questions: [
        {
          prompt: 'Explain IoT systems management with NETCONF–YANG.',
          plan: ANSWER_PLAN(
            'NETCONF protocol + YANG models for managing IoT device configuration and state',
            'Management system → server components → configuration DB → device',
            'Role of each component; steps from YANG model to managing the device',
            'Weather station interval change with validation and rollback',
            'Transactional, model-driven, secure',
          ),
        },
      ],
      keywords: ['NETCONF', 'YANG', 'management system', 'transaction manager', 'rollback manager', 'data model manager', 'configuration validator', 'configuration database', 'Netopeer'],
      remember: [
        { prompt: 'Which component restores the previous configuration?', answer: 'The rollback manager.' },
        { prompt: 'What is the first step in managing a device with NETCONF–YANG?', answer: 'Create a YANG model of the device’s configuration and state data.' },
      ],
    },

    // ------------------------------------------------------------------
    'netconf-netconf-protocol-and-yang': {
      difficulty: 'hard',
      intro: 'A closer look at the two technologies themselves: the NETCONF protocol and the YANG modelling language.',
      definition:
        '**NETCONF** is a session-based network management protocol that lets a client retrieve state or configuration data and manipulate configuration data on a device, using **XML-encoded remote procedure calls (RPCs)** over a secure transport such as **SSH**. **YANG** is a **data modelling language** used to model the configuration and state data that NETCONF manipulates.',
      simpleExplanation: {
        text: 'NETCONF is the conversation: a client opens a secure session and sends XML commands like “get-config” or “edit-config”. YANG is the dictionary: it defines exactly which settings and status values exist, their types and limits.',
        analogy: 'YANG is the blank form with labelled boxes and allowed values; NETCONF is the courier that delivers filled forms and brings back replies.',
      },
      visual: {
        type: 'architecture',
        title: 'NETCONF protocol layers',
        layers: [
          { label: 'Content', note: 'configuration / notification data', items: ['XML defined by YANG'] },
          { label: 'Operations', note: 'what to do', items: ['get', 'get-config', 'edit-config', 'copy-config', 'delete-config', 'lock', 'unlock'] },
          { label: 'Messages (RPC)', note: 'framing', items: ['<rpc>', '<rpc-reply>', '<notification>'] },
          { label: 'Secure transport', note: 'session', items: ['SSH', 'TLS'] },
        ],
      },
      explanation: [
        { heading: 'NETCONF basics' },
        {
          list: [
            'Client–server, **session-based**, connection-oriented (over SSH).',
            'Client and server exchange **capabilities** in `<hello>` messages when the session starts.',
            'Requests are `<rpc>` messages; replies are `<rpc-reply>` with data or `<ok/>`.',
            'Data is held in **datastores**: **running** (active), **startup** (used at boot) and **candidate** (scratchpad to edit, then commit).',
          ],
        },
        { heading: 'NETCONF operations' },
        {
          table: {
            columns: ['Operation', 'Purpose'],
            rows: [
              ['`get`', 'Retrieve running configuration and state (operational) data'],
              ['`get-config`', 'Retrieve all or part of a configuration datastore'],
              ['`edit-config`', 'Load all or part of a configuration into a datastore'],
              ['`copy-config`', 'Replace a whole datastore with another'],
              ['`delete-config`', 'Delete a datastore'],
              ['`lock` / `unlock`', 'Lock a datastore against other sessions, then release it'],
              ['`close-session` / `kill-session`', 'End this session / force-end another'],
            ],
          },
        },
        {
          code: `<rpc message-id="101" xmlns="urn:ietf:params:xml:ns:netconf:base:1.0">
  <edit-config>
    <target><running/></target>
    <config>
      <light xmlns="urn:example:light">
        <state>on</state>
      </light>
    </config>
  </edit-config>
</rpc>`,
          lang: 'html',
        },
        { heading: 'YANG basics' },
        {
          list: [
            'Models are organised as **modules** (and submodules).',
            '**leaf** — a single value with a type; **leaf-list** — a list of values.',
            '**container** — groups related nodes; **list** — repeated entries identified by a key.',
            '`config false` marks **state** data (read-only); configuration data is the default.',
            'Built-in types (e.g. `uint8`, `string`, `enumeration`) can be restricted with ranges and patterns.',
            'A YANG module can be translated to an equivalent XML form called **YIN**.',
          ],
        },
        {
          code: `module light {
  namespace "urn:example:light";
  prefix l;

  container light {
    leaf state {
      type enumeration { enum on; enum off; }
    }
    leaf brightness {
      type uint8 { range "0..100"; }
    }
    leaf power-consumption {
      type uint32;
      config false;          // state data, read-only
    }
  }
}`,
          lang: 'text',
        },
      ],
      example: {
        title: 'Reading configuration vs state',
        input: 'Client sends `get-config` (running), then `get` on the same light device.',
        output: `get-config → <light><state>on</state><brightness>70</brightness></light>
get        → same, plus <power-consumption>9</power-consumption>`,
        explanation: '`get-config` returns only configuration; `get` also returns state data marked `config false` in the YANG model.',
      },
      keyPoints: [
        'NETCONF: session-based, XML RPCs over SSH.',
        'Layers: transport, messages (RPC), operations, content.',
        'Operations: get, get-config, edit-config, copy-config, delete-config, lock, unlock, close/kill-session.',
        'Datastores: running, startup, candidate.',
        'YANG models data with modules, leaf, leaf-list, container, list; `config false` = state data.',
      ],
      importantTerms: [
        { term: 'NETCONF', meaning: 'Network Configuration Protocol using XML RPCs over a secure session.' },
        { term: 'YANG', meaning: 'Data modelling language for NETCONF configuration and state data.' },
        { term: 'Datastore', meaning: 'A stored set of configuration data: running, startup, candidate.' },
        { term: 'YIN', meaning: 'XML representation of a YANG module.' },
        { term: 'Capability', meaning: 'A feature a NETCONF peer supports, announced in <hello>.' },
      ],
      examPoints: [
        'Define NETCONF and YANG.',
        'Draw the NETCONF layers.',
        'Tabulate NETCONF operations; name the datastores.',
        'Explain YANG node types with a small module.',
      ],
      questions: [
        {
          prompt: 'Explain the NETCONF protocol and the YANG data modelling language.',
          plan: ANSWER_PLAN(
            'NETCONF: XML-RPC management protocol over SSH; YANG: data modelling language',
            'NETCONF layers: transport, messages, operations, content',
            'Sessions, capabilities, datastores, operations; YANG modules, leaf, container, list, config false',
            'edit-config RPC and a light YANG module',
            'NETCONF moves data; YANG defines it',
          ),
        },
      ],
      keywords: ['NETCONF', 'RPC', 'XML', 'SSH', 'capabilities', 'running', 'candidate', 'startup', 'get-config', 'edit-config', 'YANG', 'leaf', 'container', 'list', 'YIN'],
      remember: [
        { prompt: 'Which NETCONF operation returns state data as well as configuration?', answer: '`get`' },
        { prompt: 'How does YANG mark read-only state data?', answer: '`config false`' },
      ],
    },

    // 'topic-pending-verification' intentionally has no notes (see TODO above).

    // ------------------------------------------------------------------
    'iot-platforms-design-methodology': {
      difficulty: 'medium',
      intro: 'The design methodology in full: ten steps from “why are we building this?” to a working application.',
      definition:
        'The IoT platforms design methodology is a ten-step, generic process for designing IoT systems: purpose & requirements, process, domain model, information model, service specifications, IoT level, functional view, operational view, device & component integration, and application development.',
      simpleExplanation: {
        text: 'The first six steps describe what the system must do and what it is made of, without naming products. Steps seven and eight map that onto functional groups and concrete deployment options. The last two steps build it.',
        analogy: 'Planning, designing, then building a house: brief → floor plan → room details → materials → construction → furnishing.',
      },
      visual: {
        type: 'process',
        title: 'The ten steps',
        steps: DESIGN_STEPS,
      },
      explanation: [
        { heading: 'What each step produces' },
        {
          table: {
            columns: ['Step', 'Output'],
            rows: [
              ['1. Purpose & requirements', 'System purpose, behaviour, data collection, analysis, update, management, privacy and security requirements'],
              ['2. Process specification', 'Use cases, formally described from step 1'],
              ['3. Domain model', 'Physical entities, virtual entities, devices, resources and services — independent of technology'],
              ['4. Information model', 'Structure of information: virtual entities with attributes and relations'],
              ['5. Service specifications', 'Each service’s type, inputs/outputs, endpoints, schedule, preconditions and effects'],
              ['6. IoT level', 'Deployment level 1–6 chosen for the system'],
              ['7. Functional view', 'Functional groups (device, communication, services, management, security, application) and their components'],
              ['8. Operational view', 'Concrete options: service hosting, storage, devices, application hosting'],
              ['9. Device & component integration', 'Sensors, actuators and boards wired and connected'],
              ['10. Application development', 'The working application and user interface'],
            ],
          },
        },
        { heading: 'Two key ideas' },
        {
          list: [
            '**Separation of concerns** — what (steps 1–6) is decided before how (steps 7–10).',
            '**Traceability** — each later step is derived from earlier ones, so a change can be traced through the design.',
          ],
        },
        { heading: 'Case study in the textbook: weather monitoring' },
        'The methodology is also applied to a weather monitoring system: purpose (collect temperature, pressure, humidity and light data from multiple locations and analyse it in the cloud), a process with periodic sensing and cloud upload, services for data collection and controller functions, and **IoT Level-6** (many independent end nodes, cloud storage and analysis, central controller).',
        { tip: 'Learn the order with “Purpose, Process, Domain, Information, Service, Level, Functional, Operational, Integrate, Develop”.' },
      ],
      example: {
        title: 'Steps 1 and 6 for weather monitoring',
        input: 'A college wants weather stations on five campuses with a web dashboard.',
        output: `Step 1 Purpose: monitor temperature, pressure, humidity, light at 5 sites;
                 store and analyse in the cloud; web dashboard
Step 6 Level  : Level-6 — independent end nodes, cloud DB & analysis, central controller`,
        explanation: 'The purpose leads naturally to the level: many independent nodes plus cloud analysis is Level-6.',
      },
      keyPoints: [
        'Ten steps from purpose to application.',
        'Steps 1–6 specify what; 7–8 map to functional and operational views; 9–10 build.',
        'Domain and information models are technology-independent.',
        'Service specifications define inputs, outputs, schedules and effects.',
        'Weather monitoring case study is a Level-6 system.',
      ],
      importantTerms: [
        { term: 'Domain model', meaning: 'Technology-independent description of entities, devices, resources and services.' },
        { term: 'Information model', meaning: 'Structure of the information: virtual entities and their attributes.' },
        { term: 'Functional view', meaning: 'Functional groups of the system and their components.' },
        { term: 'Operational view', meaning: 'Concrete deployment and operation choices.' },
      ],
      examPoints: [
        'List the ten steps in order.',
        'State the output of each step.',
        'Explain with the weather monitoring case study.',
      ],
      questions: [
        {
          prompt: 'Explain the steps of the IoT design methodology.',
          plan: ANSWER_PLAN(
            'Ten-step, product-independent process for designing IoT systems',
            'Numbered ten-step diagram',
            'Output of each step; separation of concerns; traceability',
            'Weather monitoring: purpose and Level-6',
            'Specify first, choose products later',
          ),
        },
      ],
      keywords: ['design methodology', 'purpose & requirements', 'process specification', 'domain model', 'information model', 'service specifications', 'IoT level', 'functional view', 'operational view', 'device integration', 'application development'],
      remember: [
        { prompt: 'Which step chooses concrete hosting and storage options?', answer: 'Step 8 — operational view specification.' },
        { prompt: 'What is the first step?', answer: 'Purpose & requirements specification.' },
      ],
    },

    // ------------------------------------------------------------------
    'introduction-to-iot-design-methodology': {
      difficulty: 'medium',
      intro: 'See the methodology work end to end on a familiar system: smart home lighting.',
      definition:
        'This topic introduces the IoT design methodology by applying it step by step to a **home automation (smart lighting)** system, showing how each step’s output feeds the next — from requirements to a working Raspberry Pi–based application.',
      simpleExplanation: {
        text: 'The goal: control a home’s lights from a web app, either automatically (based on ambient light) or manually. Follow the ten steps and watch the design take shape.',
        analogy: 'A worked example in maths: the method is easier to remember once you have seen it solve one problem fully.',
      },
      visual: {
        type: 'flow',
        title: 'Smart lighting through the methodology',
        steps: [
          { label: 'Requirements', note: 'auto & manual modes, remote control' },
          { label: 'Process', note: 'auto: sense light → switch; manual: user sets state' },
          { label: 'Domain & information', note: 'Room, Light; mode, state' },
          { label: 'Services', note: 'mode, state, controller' },
          { label: 'Level & views', note: 'Level-1; Pi, Wi-Fi, REST, Django' },
          { label: 'Build', note: 'wire LDR + relay; web app' },
        ],
      },
      explanation: [
        { heading: 'Steps 1–2: purpose and process' },
        {
          list: [
            '**Purpose** — a home automation system that lets users control lights remotely through a web application.',
            '**Behaviour** — two modes: **auto** (the system checks ambient light and switches lights on when dark) and **manual** (the user switches lights from the app).',
            '**Requirements** — local data storage and analysis, local application, management and security of user access.',
            '**Process** — in auto mode, read the light sensor and set the light; in manual mode, apply the state chosen by the user.',
          ],
        },
        { heading: 'Steps 3–4: domain and information models' },
        'Physical entity: the **room** and its **light**; virtual entities represent them in software. Devices: a single-board computer with a **light sensor** and a **relay**. Information model: the virtual entity *Room* has attribute **light state** (on/off); the system has attribute **mode** (auto/manual).',
        { heading: 'Step 5: service specifications' },
        {
          table: {
            columns: ['Service', 'Type', 'Does'],
            rows: [
              ['Mode service', 'REST web service', 'Sets/gets the mode (auto or manual)'],
              ['State service', 'REST web service', 'Sets/gets the light state in manual mode'],
              ['Controller service', 'Native service on the device', 'In auto mode reads the sensor and switches the light; in manual mode applies the stored state'],
            ],
          },
        },
        { heading: 'Steps 6–8: level, functional and operational views' },
        '**Level-1**: one node does sensing, storage, analysis and hosts the application. Functional groups map to: device (Raspberry Pi, LDR, relay), communication (802.11 Wi-Fi, IPv4, TCP, HTTP), services (REST services in Django, native controller in Python), management and security (Django admin and authentication), application (web app). Operational view: services hosted on the device, **MySQL** for storage, **Django** for the web application.',
        { heading: 'Steps 9–10: integration and application' },
        'The LDR sensor and relay are wired to the Raspberry Pi; the Django web application shows the current mode and state with buttons to change them.',
      ],
      example: {
        title: 'The controller service (Python on the Raspberry Pi)',
        files: [
          {
            name: 'controller.py',
            lang: 'text',
            code: `import time
import requests
import RPi.GPIO as GPIO

LDR_PIN, RELAY_PIN = 4, 18
API = 'http://localhost:8000/api'

GPIO.setmode(GPIO.BCM)
GPIO.setup(LDR_PIN, GPIO.IN)
GPIO.setup(RELAY_PIN, GPIO.OUT)

while True:
    mode = requests.get(f'{API}/mode/1/').json()['mode']
    if mode == 'auto':
        is_dark = GPIO.input(LDR_PIN) == 1      # sensor module outputs 1 when dark
        GPIO.output(RELAY_PIN, is_dark)
    else:
        state = requests.get(f'{API}/state/1/').json()['state']
        GPIO.output(RELAY_PIN, state == 'on')
    time.sleep(1)`,
          },
        ],
        output: `mode = auto, room dark   → relay ON  (light on)
mode = manual, state off → relay OFF (light off)`,
        explanation:
          'The native controller service reads the mode from the REST mode service and either follows the light sensor or the user’s chosen state — exactly as specified in step 5. The pin numbers and sensor polarity depend on the hardware used.',
      },
      keyPoints: [
        'Smart lighting illustrates all ten steps.',
        'Two modes: auto (sensor-driven) and manual (user-driven).',
        'Services: mode and state (REST), controller (native).',
        'Level-1 deployment on a Raspberry Pi with Django and MySQL.',
        'Each step’s output is derived from the previous one.',
      ],
      importantTerms: [
        { term: 'Native service', meaning: 'A service that runs on the device itself, e.g. the controller.' },
        { term: 'LDR', meaning: 'Light-dependent resistor — a light sensor.' },
        { term: 'Relay', meaning: 'Electrically operated switch used to turn a light on or off.' },
      ],
      examPoints: [
        'Apply the methodology to smart lighting step by step.',
        'Specify the three services.',
        'State the IoT level and the functional/operational choices.',
      ],
      questions: [
        {
          prompt: 'Apply the IoT design methodology to a home automation (smart lighting) system.',
          plan: ANSWER_PLAN(
            'Generic ten-step methodology applied to smart lighting',
            'Flow from requirements to build',
            'Purpose/process; domain & information model; services; Level-1; functional & operational views; integration',
            'Python controller service on the Raspberry Pi',
            'Each step traces back to the requirements',
          ),
        },
      ],
      keywords: ['smart lighting', 'auto mode', 'manual mode', 'mode service', 'state service', 'controller service', 'Level-1', 'Raspberry Pi', 'Django', 'LDR', 'relay'],
      remember: [
        { prompt: 'Which service runs natively on the device?', answer: 'The controller service.' },
        { prompt: 'Which IoT level is the smart lighting example?', answer: 'Level-1.' },
      ],
    },
  },
}
