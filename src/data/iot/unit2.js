// Internet of Things — Unit II: Domain-Specific IoTs, M2M, SDN and NFV.
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

// Short answer plan for the domain topics, which share one structure.
const DOMAIN_PLAN = (domain, apps, example) =>
  ANSWER_PLAN(
    `How IoT is applied in ${domain}`,
    `Hub diagram: ${domain} with its applications`,
    `For each application: sensors used, what is monitored or controlled, benefit — ${apps}`,
    example,
    'Benefits: automation, efficiency, safety, remote access',
  )

export default {
  overview:
    'Unit II surveys where IoT is used — homes, cities, environment, energy, retail, logistics, agriculture, industry, and health and lifestyle — and then looks at the networking ideas around it: how IoT differs from M2M, and how Software-Defined Networking (SDN) and Network Function Virtualization (NFV) make IoT networks easier to manage.',

  map: [
    { label: 'Domains overview', topics: ['domain-specific-iot-introduction'] },
    { label: 'Home & city', topics: ['home-automation', 'cities-smart-cities', 'environment'] },
    { label: 'Business & infrastructure', topics: ['energy-retail', 'logistics', 'agriculture', 'industry'] },
    { label: 'People', topics: ['healthcare-and-life-style'] },
    { label: 'Networks for IoT', topics: ['iot-and-m2m', 'introduction-to-sdn', 'nfv-for-iot'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'domain-specific-iot-introduction': {
      difficulty: 'easy',
      intro: 'The same building blocks — sensors, networks, cloud, apps — appear in very different fields.',
      definition:
        'Domain-specific IoTs are IoT applications designed for a particular field, such as homes, cities, environment, energy, retail, logistics, agriculture, industry, and health and lifestyle. Each domain combines sensing, connectivity, analysis and actuation to solve that field’s problems.',
      simpleExplanation: {
        text: 'A temperature sensor can protect a server room, a greenhouse or a patient. What changes from domain to domain is what is measured, who uses the data, and what action follows.',
        analogy: 'One smartphone, many apps: the hardware is the same, but each app serves a different need.',
      },
      visual: {
        type: 'hierarchy',
        title: 'IoT application domains',
        root: 'Domain-specific IoTs',
        children: [
          { label: 'Home', children: ['Smart lighting', 'Smart appliances', 'Intrusion detection', 'Smoke/gas detectors'] },
          { label: 'Cities', children: ['Smart parking', 'Smart roads', 'Structural health', 'Surveillance', 'Emergency response'] },
          { label: 'Environment', children: ['Weather', 'Air & noise pollution', 'Forest fire', 'River floods'] },
          { label: 'Energy & retail', children: ['Smart grids', 'Renewables', 'Inventory', 'Smart payments'] },
          { label: 'Logistics & agriculture', children: ['Fleet tracking', 'Shipment monitoring', 'Smart irrigation', 'Greenhouse control'] },
          { label: 'Industry & health', children: ['Machine diagnosis', 'Air quality', 'Health monitoring', 'Wearables'] },
        ],
      },
      explanation: [
        { heading: 'What every domain application has' },
        {
          list: [
            '**Sensing** — what is measured (motion, moisture, location, heart rate).',
            '**Communication** — how data moves (Wi-Fi, ZigBee, cellular).',
            '**Analysis** — local or in the cloud; simple thresholds to complex models.',
            '**Action** — actuators, alerts or reports.',
          ],
        },
        { heading: 'Benefits across domains' },
        {
          table: {
            columns: ['Benefit', 'Example'],
            rows: [
              ['Automation', 'Lights switch off when a room is empty'],
              ['Efficiency', 'Irrigation only when soil is dry'],
              ['Safety', 'Early warning of forest fires or gas leaks'],
              ['Remote monitoring', 'A doctor sees a patient’s readings from afar'],
              ['Better decisions', 'City planners use real traffic data'],
            ],
          },
        },
        { note: 'Each domain is covered in its own topic in this unit. Unit V returns to several of them as implementation case studies.' },
      ],
      example: {
        title: 'One sensor, three domains',
        input: 'A temperature sensor.',
        output: `Home        : thermostat controls the air conditioner
Agriculture : greenhouse vents open when too hot
Health      : wearable flags a fever`,
        explanation: 'The domain decides the purpose, the users and the action.',
      },
      keyPoints: [
        'IoT is applied in home, cities, environment, energy, retail, logistics, agriculture, industry, health.',
        'Every domain application senses, communicates, analyses and acts.',
        'Benefits: automation, efficiency, safety, remote monitoring, better decisions.',
      ],
      importantTerms: [
        { term: 'Domain-specific IoT', meaning: 'An IoT application built for one field’s needs.' },
        { term: 'Remote monitoring', meaning: 'Observing a system’s state from a distance through IoT data.' },
      ],
      examPoints: [
        'List the domains with two applications each.',
        'Explain the common structure of domain applications.',
        'State the benefits.',
      ],
      questions: [
        {
          prompt: 'Write a short note on domain-specific applications of IoT.',
          plan: ANSWER_PLAN(
            'IoT applications built for specific fields',
            'Tree of domains with applications',
            'Common structure: sense, communicate, analyse, act; benefits',
            'Temperature sensor in three domains',
            'Same blocks, different purpose',
          ),
        },
      ],
      keywords: ['domain-specific IoT', 'home automation', 'smart cities', 'environment', 'energy', 'retail', 'logistics', 'agriculture', 'industry', 'health'],
      remember: [
        { prompt: 'Name four IoT application domains.', answer: 'Any four of: home, cities, environment, energy, retail, logistics, agriculture, industry, health.' },
      ],
    },

    // ------------------------------------------------------------------
    'home-automation': {
      difficulty: 'easy',
      intro: 'The most familiar IoT domain: lights, appliances and security you can control from your phone.',
      definition:
        'Home automation IoT applications monitor and control devices in a home — lighting, appliances, security and safety systems — automatically or remotely, to improve comfort, convenience, energy efficiency and security.',
      simpleExplanation: {
        text: 'Sensors detect presence, light, smoke or a door opening; controllers switch lights and appliances; you watch and control everything through an app — even from another city.',
        analogy: 'A house with a caretaker who never sleeps: turns lights off in empty rooms, warns you of smoke, and tells you when the door opens.',
      },
      visual: {
        type: 'network',
        title: 'Home automation applications',
        center: { label: 'Smart home', note: 'app + controller' },
        nodes: [
          { label: 'Smart lighting', note: 'adapts to presence & daylight' },
          { label: 'Smart appliances', note: 'remote control & status' },
          { label: 'Intrusion detection', note: 'motion, door, camera' },
          { label: 'Smoke / gas detectors', note: 'alerts on danger' },
        ],
      },
      explanation: [
        { heading: 'Smart lighting' },
        'Lights adapt to occupancy, ambient light and time of day, saving energy. Users switch or dim lights from a phone; the system can run in **auto** mode (based on sensors) or **manual** mode.',
        { heading: 'Smart appliances' },
        'Appliances (washing machines, refrigerators, air conditioners) report their status and can be controlled remotely — e.g. start the AC on the way home, or get an alert when a fridge door is left open.',
        { heading: 'Intrusion detection' },
        'Motion sensors (PIR), door/window sensors and cameras detect intrusions and send alerts by SMS, email or app notification, optionally with an image.',
        { heading: 'Smoke and gas detectors' },
        'Detect smoke and gases such as LPG or carbon monoxide, raise alarms, and notify the owner or emergency services.',
        { tip: 'Home automation is the textbook example of an **IoT Level-1** system: one controller stores data and runs the application locally.' },
      ],
      example: {
        title: 'Evening at a smart home',
        input: 'It is 7 pm, the living room is dark and someone walks in.',
        output: `Light sensor: dark  +  motion sensor: occupied  → lights on (auto mode)
Owner, away from home, checks the app → sees lights on, door locked`,
        explanation: 'Sensing, local decision and remote monitoring together give comfort and peace of mind.',
      },
      keyPoints: [
        'Applications: smart lighting, smart appliances, intrusion detection, smoke/gas detectors.',
        'Benefits: comfort, energy saving, security, safety.',
        'Auto mode uses sensors; manual mode follows the user.',
        'Typical deployment: IoT Level-1.',
      ],
      importantTerms: [
        { term: 'PIR sensor', meaning: 'Passive infrared sensor that detects motion of warm bodies.' },
        { term: 'Smart appliance', meaning: 'An appliance that reports status and can be controlled over a network.' },
      ],
      examPoints: [
        'List the four home automation applications.',
        'Explain each with the sensors used.',
        'Mention benefits and the IoT level.',
      ],
      questions: [
        {
          prompt: 'Explain IoT applications in home automation.',
          plan: DOMAIN_PLAN('home automation', 'smart lighting, smart appliances, intrusion detection, smoke/gas detectors', 'Evening scenario with auto lighting and remote check'),
        },
      ],
      keywords: ['home automation', 'smart lighting', 'smart appliances', 'intrusion detection', 'PIR sensor', 'smoke detector', 'gas detector', 'Level-1'],
      remember: [
        { prompt: 'Which sensor detects intruders by body heat?', answer: 'PIR (passive infrared) motion sensor.' },
      ],
    },

    // ------------------------------------------------------------------
    'cities-smart-cities': {
      difficulty: 'easy',
      intro: 'Cities use IoT to make parking, lighting, roads and safety services respond to what is actually happening.',
      definition:
        'Smart city IoT applications use sensors and networks across urban infrastructure to monitor and manage **parking**, **street lighting**, **roads and traffic**, **structural health**, **surveillance** and **emergency response**, improving efficiency, safety and quality of life.',
      simpleExplanation: {
        text: 'Sensors in parking bays, street lights, roads, bridges and cameras send data to city control centres and citizens’ phones, so services react in real time.',
        analogy: 'A city with a nervous system: sensors feel what is happening, and the control centre reacts.',
      },
      visual: {
        type: 'network',
        title: 'Smart city applications',
        center: { label: 'Smart city', note: 'control centre + apps' },
        nodes: [
          { label: 'Smart parking', note: 'free slots on your phone' },
          { label: 'Smart lighting', note: 'lights adapt to traffic' },
          { label: 'Smart roads', note: 'traffic & hazard info' },
          { label: 'Structural health', note: 'bridges & buildings' },
          { label: 'Surveillance', note: 'video analytics' },
          { label: 'Emergency response', note: 'faster, informed action' },
        ],
      },
      explanation: [
        {
          table: {
            columns: ['Application', 'How it works', 'Benefit'],
            rows: [
              ['Smart parking', 'Sensors detect whether each slot is occupied; apps show free slots', 'Less time and fuel spent searching'],
              ['Smart lighting', 'Street lights adjust to traffic, time and weather; faults reported automatically', 'Energy savings, faster repairs'],
              ['Smart roads', 'Sensors report traffic, accidents, fog or ice; information sent to drivers', 'Safer roads, less congestion'],
              ['Structural health monitoring', 'Vibration and strain sensors on bridges and buildings', 'Detect damage early'],
              ['Surveillance', 'Networked cameras with video analytics', 'Crime prevention, crowd monitoring'],
              ['Emergency response', 'IoT data guides responders to the right place with the right information', 'Faster, better coordinated response'],
            ],
          },
        },
        { tip: 'Smart parking is a typical **Level-6** design: many independent nodes, cloud storage and analysis, and a centralised controller.' },
      ],
      example: {
        title: 'Finding parking',
        input: 'A driver opens the city parking app near a market.',
        output: `Slots sensed: 120  Occupied: 112  Free: 8
App shows the 8 free slots on a map and guides the driver to the nearest one`,
        explanation: 'Each slot sensor reports occupancy to the cloud; the app reads the live summary.',
      },
      keyPoints: [
        'Smart city applications: parking, lighting, roads, structural health, surveillance, emergency response.',
        'Real-time sensing lets city services react to actual conditions.',
        'Benefits: efficiency, safety, energy saving, convenience.',
      ],
      importantTerms: [
        { term: 'Structural health monitoring', meaning: 'Using sensors to detect damage or stress in structures.' },
        { term: 'Smart parking', meaning: 'Sensing slot occupancy and guiding drivers to free slots.' },
      ],
      examPoints: [
        'List the six smart city applications.',
        'Explain each briefly with its benefit.',
      ],
      questions: [
        {
          prompt: 'Discuss IoT applications for smart cities.',
          plan: DOMAIN_PLAN('smart cities', 'parking, lighting, roads, structural health, surveillance, emergency response', 'Driver finding a free parking slot'),
        },
      ],
      keywords: ['smart city', 'smart parking', 'smart lighting', 'smart roads', 'structural health monitoring', 'surveillance', 'emergency response'],
      remember: [
        { prompt: 'Which sensors monitor bridges?', answer: 'Vibration and strain sensors (structural health monitoring).' },
      ],
    },

    // ------------------------------------------------------------------
    environment: {
      difficulty: 'easy',
      intro: 'Environmental IoT spreads sensors across air, land and water to watch for change and danger.',
      definition:
        'Environmental IoT applications monitor environmental conditions — **weather**, **air pollution**, **noise pollution**, **forest fires** and **river floods** — using distributed sensor nodes, often in remote areas, to inform people and trigger early warnings.',
      simpleExplanation: {
        text: 'Weather stations, pollution sensors and flood gauges send readings continuously. Analysis spots dangerous levels and alerts authorities and the public before damage spreads.',
        analogy: 'A network of watchtowers that never sleep, each reporting what it sees.',
      },
      visual: {
        type: 'network',
        title: 'Environmental monitoring',
        center: { label: 'Environment', note: 'sensor networks' },
        nodes: [
          { label: 'Weather monitoring', note: 'temp, humidity, pressure, rain' },
          { label: 'Air pollution', note: 'CO, NO₂, particulates' },
          { label: 'Noise pollution', note: 'sound levels' },
          { label: 'Forest fire detection', note: 'heat, CO₂, smoke' },
          { label: 'River flood detection', note: 'water level, flow' },
        ],
      },
      explanation: [
        {
          table: {
            columns: ['Application', 'Sensors', 'Use'],
            rows: [
              ['Weather monitoring', 'Temperature, humidity, pressure, wind, rainfall, light', 'Local forecasts; data for agriculture and planning'],
              ['Air pollution monitoring', 'Gas sensors (CO, NO₂, SO₂), particulate matter', 'Identify polluted areas, warn the public, enforce rules'],
              ['Noise pollution monitoring', 'Sound level sensors', 'Noise maps; enforce noise limits near hospitals and schools'],
              ['Forest fire detection', 'Temperature, humidity, CO₂, smoke', 'Early detection to limit spread'],
              ['River flood detection', 'Water level, flow rate, rainfall', 'Early flood warnings and evacuation'],
            ],
          },
        },
        { heading: 'Typical deployment' },
        'Sensor nodes are spread over a large area, often battery- or solar-powered, and use low-power wireless networks. Forest fire detection is the textbook **Level-5** example (end nodes + coordinator); weather monitoring with many independent stations is the **Level-6** example.',
      ],
      example: {
        title: 'Flood warning',
        input: 'River level sensor readings rise from 3.1 m to 4.6 m in two hours; danger level is 4.5 m.',
        output: 'Alert sent to the disaster management office and SMS warnings to villages downstream.',
        explanation: 'Continuous sensing plus a simple threshold rule turns data into a life-saving warning.',
      },
      keyPoints: [
        'Applications: weather, air pollution, noise pollution, forest fire, river floods.',
        'Distributed, often remote, low-power sensor nodes.',
        'Purpose: awareness and early warning.',
        'Forest fire → Level-5; weather monitoring → Level-6.',
      ],
      importantTerms: [
        { term: 'Particulate matter (PM)', meaning: 'Tiny airborne particles measured as PM2.5 / PM10.' },
        { term: 'Early warning system', meaning: 'System that alerts before a hazard causes damage.' },
      ],
      examPoints: [
        'List the five environment applications with sensors.',
        'Explain early warning with an example.',
      ],
      questions: [
        {
          prompt: 'Explain IoT applications in environment monitoring.',
          plan: DOMAIN_PLAN('environment monitoring', 'weather, air pollution, noise pollution, forest fire, river floods', 'River flood warning'),
        },
      ],
      keywords: ['weather monitoring', 'air pollution', 'noise pollution', 'forest fire detection', 'river flood detection', 'early warning', 'sensor nodes'],
      remember: [
        { prompt: 'Which environment application is the Level-5 example?', answer: 'Forest fire detection.' },
      ],
    },

    // ------------------------------------------------------------------
    'energy-retail': {
      difficulty: 'medium',
      intro: 'Two business domains: making power networks smarter, and making shops run with less waste.',
      definition:
        'In the **energy** domain, IoT supports **smart grids**, **renewable energy systems** and **prognostics** (predicting equipment failure). In the **retail** domain, IoT supports **inventory management**, **smart payments** and **smart vending machines**.',
      simpleExplanation: {
        text: 'Energy: meters and grid sensors report usage and faults in real time, so supply can match demand and equipment can be fixed before it breaks. Retail: tags and sensors track stock, payments become contactless, and vending machines report what they need.',
        analogy: 'Energy IoT is a power network that can see itself; retail IoT is a shop where the shelves can count themselves.',
      },
      visual: {
        type: 'comparison',
        title: 'Energy and retail applications',
        items: [
          { title: 'Energy', tone: 'accent', points: ['Smart grids — smart meters, demand response', 'Renewable energy — monitor and integrate solar/wind', 'Prognostics — predict equipment faults'] },
          { title: 'Retail', tone: 'muted', points: ['Inventory management — RFID, shelf sensors', 'Smart payments — NFC, contactless', 'Smart vending machines — remote status, restock alerts'] },
        ],
      },
      explanation: [
        { heading: 'Energy' },
        {
          list: [
            '**Smart grids** — data networks overlaid on the power grid. **Smart meters** record consumption at short intervals and send it to the utility; the grid can detect outages, balance load and support time-of-day pricing and demand response.',
            '**Renewable energy systems** — solar and wind output varies with weather. IoT monitoring of generation and the grid helps integrate it safely, e.g. adjusting inverters to keep voltage stable.',
            '**Prognostics** — sensors on transformers, turbines and other equipment track condition; analysis predicts failures so maintenance happens before breakdowns.',
          ],
        },
        { heading: 'Retail' },
        {
          list: [
            '**Inventory management** — RFID tags and shelf sensors track stock levels automatically, triggering reorders and reducing out-of-stock situations.',
            '**Smart payments** — contactless payments using NFC or similar technology speed up checkout.',
            '**Smart vending machines** — report sales, stock and faults to the operator; can show personalised offers; restocking is planned from real data.',
          ],
        },
      ],
      example: {
        title: 'Two quick scenarios',
        input: 'A transformer’s oil temperature trends upward; a vending machine runs low on water bottles.',
        output: `Energy: prognostics model predicts overheating → maintenance scheduled
Retail: machine reports "water: 3 left" → added to today’s restock route`,
        explanation: 'In both cases IoT replaces fixed schedules with data-driven action.',
      },
      keyPoints: [
        'Energy: smart grids, renewable energy systems, prognostics.',
        'Smart meters enable real-time usage data and demand response.',
        'Retail: inventory management, smart payments, smart vending machines.',
        'Both domains move from fixed schedules to data-driven action.',
      ],
      importantTerms: [
        { term: 'Smart grid', meaning: 'Power grid with a data network for monitoring and control.' },
        { term: 'Smart meter', meaning: 'Meter that records and transmits consumption at short intervals.' },
        { term: 'Prognostics', meaning: 'Predicting equipment failure from condition data.' },
        { term: 'RFID', meaning: 'Radio-frequency identification tags for tracking items.' },
      ],
      examPoints: [
        'Explain the three energy applications.',
        'Explain the three retail applications.',
        'Give one example for each domain.',
      ],
      questions: [
        {
          prompt: 'Explain IoT applications in the energy and retail domains.',
          plan: DOMAIN_PLAN('energy and retail', 'smart grids, renewable energy, prognostics; inventory management, smart payments, smart vending machines', 'Transformer prognostics and vending machine restock'),
        },
      ],
      keywords: ['smart grid', 'smart meter', 'renewable energy', 'prognostics', 'inventory management', 'RFID', 'smart payments', 'NFC', 'smart vending machines'],
      remember: [
        { prompt: 'What are prognostics?', answer: 'Predicting equipment failures from condition data so maintenance happens in time.' },
        { prompt: 'Name the three retail IoT applications.', answer: 'Inventory management, smart payments, smart vending machines.' },
      ],
    },

    // ------------------------------------------------------------------
    logistics: {
      difficulty: 'easy',
      intro: 'Where is my parcel? Is the medicine still cold? Is the truck about to break down? Logistics IoT answers in real time.',
      definition:
        'Logistics IoT applications track and manage the movement of goods and vehicles: **route generation and scheduling**, **fleet tracking**, **shipment monitoring** and **remote vehicle diagnostics**.',
      simpleExplanation: {
        text: 'GPS units and sensors on trucks and containers report location, temperature, shocks and engine health. Logistics companies use the data to plan routes, keep customers informed and prevent breakdowns.',
        analogy: 'A courier company that can see every parcel and every van on one live map.',
      },
      visual: {
        type: 'network',
        title: 'Logistics applications',
        center: { label: 'Logistics', note: 'operations centre' },
        nodes: [
          { label: 'Route generation & scheduling', note: 'live traffic, deadlines' },
          { label: 'Fleet tracking', note: 'GPS location of vehicles' },
          { label: 'Shipment monitoring', note: 'temperature, shock, tamper' },
          { label: 'Remote vehicle diagnostics', note: 'engine & fault data' },
        ],
      },
      explanation: [
        {
          table: {
            columns: ['Application', 'Data used', 'Benefit'],
            rows: [
              ['Route generation & scheduling', 'Traffic, delivery locations, time windows', 'Faster deliveries, lower fuel cost'],
              ['Fleet tracking', 'GPS location and speed of vehicles', 'Live visibility, accurate arrival times'],
              ['Shipment monitoring', 'Temperature, humidity, shock, door-open sensors in containers', 'Protect perishable or fragile goods; detect tampering'],
              ['Remote vehicle diagnostics', 'Engine and on-board diagnostic data', 'Detect faults early, plan maintenance'],
            ],
          },
        },
        { tip: 'Cold-chain monitoring (vaccines, food) is a classic shipment-monitoring use: an alert is raised as soon as temperature leaves the safe range.' },
      ],
      example: {
        title: 'Vaccine shipment',
        input: 'Container must stay between 2 °C and 8 °C. Sensor reads 9.4 °C during a stop.',
        output: 'Alert to driver and control room; driver checks the cooling unit; incident logged with location and time.',
        explanation: 'Continuous monitoring catches the problem before the cargo is spoiled.',
      },
      keyPoints: [
        'Applications: route scheduling, fleet tracking, shipment monitoring, vehicle diagnostics.',
        'GPS + condition sensors give live visibility.',
        'Benefits: on-time delivery, lower cost, protected cargo, fewer breakdowns.',
      ],
      importantTerms: [
        { term: 'Fleet tracking', meaning: 'Monitoring location and status of a group of vehicles.' },
        { term: 'Cold chain', meaning: 'Temperature-controlled supply chain for perishable goods.' },
      ],
      examPoints: [
        'List the four logistics applications.',
        'Explain each with the data used and benefit.',
      ],
      questions: [
        {
          prompt: 'Describe IoT applications in logistics.',
          plan: DOMAIN_PLAN('logistics', 'route generation & scheduling, fleet tracking, shipment monitoring, remote vehicle diagnostics', 'Vaccine cold-chain alert'),
        },
      ],
      keywords: ['logistics', 'route generation', 'scheduling', 'fleet tracking', 'GPS', 'shipment monitoring', 'cold chain', 'remote vehicle diagnostics'],
      remember: [
        { prompt: 'Which application watches the temperature of goods in transit?', answer: 'Shipment monitoring.' },
      ],
    },

    // ------------------------------------------------------------------
    agriculture: {
      difficulty: 'easy',
      intro: 'Water and fertiliser exactly where and when they are needed — that is what IoT brings to farming.',
      definition:
        'Agriculture IoT applications monitor farm conditions and automate actions, mainly **smart irrigation** (watering based on soil moisture) and **greenhouse control** (keeping temperature, humidity, light and CO₂ at ideal levels).',
      simpleExplanation: {
        text: 'Soil sensors tell when the field is dry; a controller opens valves only then. In a greenhouse, sensors and actuators keep the climate ideal for the crop automatically.',
        analogy: 'A farmer who checks every plant every minute — and never forgets to water.',
      },
      visual: {
        type: 'comparison',
        title: 'Agriculture applications',
        items: [
          { title: 'Smart irrigation', tone: 'accent', points: ['Soil moisture sensors in the field', 'Valve opens only when soil is dry', 'Saves water; data logged to the cloud'] },
          { title: 'Greenhouse control', tone: 'good', points: ['Temperature, humidity, light, CO₂ sensors', 'Fans, heaters, misters, lights controlled', 'Ideal climate → better yield'] },
        ],
      },
      explanation: [
        { heading: 'Smart irrigation' },
        'Moisture sensors measure soil water content. When it drops below a threshold, the controller switches on the pump or opens valves; when it is enough, it stops. Readings are stored in the cloud so the farmer can see trends on a phone. This is the textbook **Level-2** example.',
        { heading: 'Greenhouse control' },
        'Sensors continuously measure temperature, humidity, soil moisture, light and CO₂ inside the greenhouse. The controller adjusts fans, heaters, misting systems, shades and lights to keep conditions in the ideal band for the crop.',
        { heading: 'Benefits' },
        {
          list: [
            'Less water and energy use.',
            'Better and more predictable yields.',
            'Less manual labour; remote monitoring.',
          ],
        },
      ],
      example: {
        title: 'Irrigation decision',
        input: 'Threshold 30%. Morning reading 34%, noon reading 27%.',
        output: `Morning: 34% ≥ 30% → valve stays closed
Noon:    27% < 30% → valve opens until moisture returns above 30%`,
        explanation: 'Watering follows the soil’s real condition, not a fixed timetable.',
      },
      keyPoints: [
        'Two main applications: smart irrigation and greenhouse control.',
        'Irrigation uses soil moisture thresholds to drive valves/pumps.',
        'Greenhouse control keeps temperature, humidity, light and CO₂ ideal.',
        'Smart irrigation is the Level-2 example.',
      ],
      importantTerms: [
        { term: 'Soil moisture sensor', meaning: 'Measures water content of soil.' },
        { term: 'Threshold control', meaning: 'Action triggered when a reading crosses a set value.' },
      ],
      examPoints: [
        'Explain smart irrigation with a threshold example.',
        'Explain greenhouse control sensors and actuators.',
        'State benefits.',
      ],
      questions: [
        {
          prompt: 'Explain IoT applications in agriculture.',
          plan: DOMAIN_PLAN('agriculture', 'smart irrigation and greenhouse control', 'Irrigation threshold decision'),
        },
      ],
      keywords: ['smart irrigation', 'soil moisture', 'greenhouse control', 'threshold', 'actuator', 'Level-2'],
      remember: [
        { prompt: 'Which IoT level is smart irrigation in the textbook?', answer: 'Level-2.' },
      ],
    },

    // ------------------------------------------------------------------
    industry: {
      difficulty: 'easy',
      intro: 'In factories, a few hours of unplanned downtime costs lakhs. Industrial IoT watches machines and air so problems are caught early.',
      definition:
        'Industrial IoT applications include **machine diagnosis and prognosis** — monitoring machine condition to detect and predict faults — and **indoor air quality monitoring** in factories to protect workers.',
      simpleExplanation: {
        text: 'Sensors on motors and pumps measure vibration, temperature and current. Analysis spots unusual patterns (diagnosis) and predicts when a part will fail (prognosis). Air sensors watch for harmful gases in the workplace.',
        analogy: 'A doctor’s check-up for machines: diagnose what is wrong now, and predict what will go wrong next.',
      },
      visual: {
        type: 'flow',
        title: 'Machine prognosis',
        steps: [
          { label: 'Sensors on machine', note: 'vibration, temperature, current' },
          { label: 'Collect & store', note: 'continuous readings' },
          { label: 'Analyse', note: 'compare with normal patterns' },
          { label: 'Predict fault', note: 'remaining useful life' },
          { label: 'Plan maintenance', note: 'before breakdown' },
        ],
      },
      explanation: [
        { heading: 'Machine diagnosis and prognosis' },
        {
          list: [
            '**Diagnosis** — identifying the cause of a fault from sensor data (e.g. bearing wear causes a specific vibration pattern).',
            '**Prognosis** — predicting the time to failure, so maintenance happens just in time (**predictive maintenance**) rather than on a fixed schedule or after a breakdown.',
          ],
        },
        { heading: 'Indoor air quality monitoring' },
        'Factories can release harmful gases (CO, NO₂, volatile organic compounds) and dust. Sensors monitor levels continuously and trigger ventilation or evacuation alarms when limits are crossed, protecting worker health.',
        {
          table: {
            columns: ['Maintenance style', 'When it happens', 'Drawback'],
            rows: [
              ['Reactive', 'After failure', 'Unplanned downtime'],
              ['Preventive', 'On a fixed schedule', 'Parts replaced too early or too late'],
              ['Predictive (IoT)', 'When data predicts failure', 'Needs sensors and analytics'],
            ],
          },
        },
      ],
      example: {
        title: 'Pump vibration',
        input: 'A pump’s vibration level rises 40% above its normal band over two weeks.',
        output: 'Prognosis: bearing failure likely within ~10 days → replacement scheduled during weekend shutdown.',
        explanation: 'The repair is planned for a convenient time instead of stopping production unexpectedly. Figures are illustrative.',
      },
      keyPoints: [
        'Industry applications: machine diagnosis & prognosis, indoor air quality monitoring.',
        'Diagnosis finds current faults; prognosis predicts future failures.',
        'Predictive maintenance reduces downtime.',
        'Air quality monitoring protects workers.',
      ],
      importantTerms: [
        { term: 'Diagnosis', meaning: 'Identifying the cause of a current fault.' },
        { term: 'Prognosis', meaning: 'Predicting future failure and remaining useful life.' },
        { term: 'Predictive maintenance', meaning: 'Maintenance scheduled from condition data.' },
      ],
      examPoints: [
        'Explain diagnosis vs prognosis.',
        'Compare reactive, preventive and predictive maintenance.',
        'Explain indoor air quality monitoring.',
      ],
      questions: [
        {
          prompt: 'Explain IoT applications in industry.',
          plan: DOMAIN_PLAN('industry', 'machine diagnosis & prognosis and indoor air quality monitoring', 'Pump vibration predicting bearing failure'),
        },
      ],
      keywords: ['industrial IoT', 'machine diagnosis', 'prognosis', 'predictive maintenance', 'vibration sensor', 'indoor air quality'],
      remember: [
        { prompt: 'Difference between diagnosis and prognosis?', answer: 'Diagnosis finds the current fault; prognosis predicts future failure.' },
      ],
    },

    // ------------------------------------------------------------------
    'healthcare-and-life-style': {
      difficulty: 'easy',
      intro: 'From fitness bands to remote patient monitoring, IoT puts health data in your pocket — and your doctor’s.',
      definition:
        'Health and lifestyle IoT applications include **health and fitness monitoring** — continuously measuring vital signs and activity, often remotely — and **wearable electronics** such as smart watches, fitness bands and smart glasses that sense and assist daily life.',
      simpleExplanation: {
        text: 'Wearables and home medical devices measure heart rate, blood pressure, oxygen level, sleep and steps. Data goes to apps and, when needed, to doctors, who can spot problems early without the patient visiting hospital.',
        analogy: 'A personal nurse on your wrist who keeps notes all day and calls the doctor if something looks wrong.',
      },
      visual: {
        type: 'flow',
        title: 'Remote health monitoring',
        steps: [
          { label: 'Wearable / medical device', note: 'heart rate, SpO₂, BP' },
          { label: 'Phone or home gateway', note: 'Bluetooth → Internet' },
          { label: 'Cloud health service', note: 'store & analyse' },
          { label: 'Alerts & dashboards', note: 'patient, family, doctor' },
        ],
      },
      explanation: [
        { heading: 'Health and fitness monitoring' },
        {
          list: [
            'Vital signs: heart rate, blood pressure, blood oxygen (SpO₂), temperature, blood glucose.',
            'Activity and fitness: steps, calories, sleep quality.',
            '**Remote patient monitoring** lets elderly or chronic patients stay at home while doctors watch trends and receive alerts.',
          ],
        },
        { heading: 'Wearable electronics' },
        'Smart watches, fitness bands, smart glasses, smart shoes and similar devices with sensors that assist daily activities — tracking exercise, giving navigation cues or notifications, and detecting falls.',
        { heading: 'Concerns' },
        {
          list: [
            '**Privacy and security** — health data is highly sensitive.',
            '**Accuracy** — consumer wearables are not always medical-grade.',
            '**Battery life** — devices must be small and last long.',
          ],
        },
      ],
      example: {
        title: 'Elderly patient at home',
        input: 'A wearable records SpO₂ dropping to 88% (normal ≥ 95%) during the night.',
        output: 'App alerts the family; the doctor sees the overnight trend on a dashboard and calls the patient in the morning.',
        explanation: 'Continuous monitoring catches a problem that a monthly clinic visit would miss.',
      },
      keyPoints: [
        'Two areas: health & fitness monitoring, wearable electronics.',
        'Remote patient monitoring keeps patients at home under supervision.',
        'Wearables track activity and assist daily life.',
        'Concerns: privacy, accuracy, battery life.',
      ],
      importantTerms: [
        { term: 'Wearable', meaning: 'Electronic device worn on the body with sensors.' },
        { term: 'Remote patient monitoring', meaning: 'Tracking a patient’s health data from a distance.' },
        { term: 'SpO₂', meaning: 'Blood oxygen saturation level.' },
      ],
      examPoints: [
        'Explain health and fitness monitoring with sensors measured.',
        'Explain wearable electronics with examples.',
        'Mention concerns.',
      ],
      questions: [
        {
          prompt: 'Explain IoT applications in health and lifestyle.',
          plan: DOMAIN_PLAN('health and lifestyle', 'health & fitness monitoring and wearable electronics', 'Night-time SpO₂ alert for an elderly patient'),
        },
      ],
      keywords: ['health monitoring', 'fitness monitoring', 'remote patient monitoring', 'wearable electronics', 'smart watch', 'vital signs', 'privacy'],
      remember: [
        { prompt: 'Name the two health & lifestyle application areas.', answer: 'Health & fitness monitoring and wearable electronics.' },
      ],
    },

    // ------------------------------------------------------------------
    'iot-and-m2m': {
      difficulty: 'medium',
      intro: 'Machines talked to machines long before “IoT” — so what is actually new?',
      definition:
        '**Machine-to-Machine (M2M)** refers to networking of machines (devices) for remote monitoring, control and data exchange, typically within a closed, often proprietary system. **IoT** extends this with IP-based, interoperable communication, cloud platforms and software-driven analytics across many applications.',
      simpleExplanation: {
        text: 'An M2M system might connect vending machines to their operator over a private network using special protocols. IoT connects many kinds of things to the Internet using standard protocols and sends the data to cloud services where any authorised application can use it.',
        analogy: 'M2M is an office intercom — machines in one building talk to each other. IoT is the Internet — anything can talk to anything, anywhere.',
      },
      visual: {
        type: 'architecture',
        title: 'M2M system architecture',
        layers: [
          { label: 'M2M applications', note: 'on M2M servers / on-premise', items: ['Monitoring', 'Control'] },
          { label: 'Communication network', note: 'wired / wireless, IP-based', items: ['Cellular', 'Wired broadband'] },
          { label: 'M2M gateway', note: 'protocol translation', items: ['Non-IP → IP'] },
          { label: 'M2M area network', note: 'machines, often non-IP', items: ['ZigBee', 'Bluetooth', 'M-Bus', 'PLC', '6LoWPAN', '802.15.4'] },
        ],
      },
      explanation: [
        { heading: 'M2M architecture' },
        {
          list: [
            '**M2M area network** — machines with embedded modules communicate using protocols such as ZigBee, Bluetooth, M-Bus, Wireless M-Bus, power line communication (PLC), 6LoWPAN, IEEE 802.15.4. These are often **non-IP**.',
            '**M2M gateway** — performs **protocol translation** so machines in the area network can communicate with the external IP network.',
            '**Communication network** — wired or wireless IP network connecting the gateway to servers.',
            '**M2M applications** — run on servers, often on-premise, for monitoring and control.',
          ],
        },
        { heading: 'Differences between IoT and M2M' },
        {
          table: {
            columns: ['Aspect', 'M2M', 'IoT'],
            rows: [
              ['Communication protocols', 'Proprietary or non-IP in the area network', 'IP-based, standard and interoperable'],
              ['Machines vs things', 'Homogeneous machines of one type', 'Heterogeneous physical and virtual things'],
              ['Hardware vs software', 'Emphasis on hardware and embedded modules', 'Emphasis on software'],
              ['Data collection & analysis', 'Point solutions, often on-premise storage', 'Data in the cloud (public, private or hybrid)'],
              ['Applications', 'Diagnosis, monitoring and control within a system', 'Many applications: analytics, enterprise integration, user apps'],
            ],
          },
        },
        { tip: 'Exam shortcut: IoT = M2M + IP everywhere + cloud + software analytics + many kinds of things.' },
      ],
      example: {
        title: 'Smart meters, two ways',
        input: 'Electricity meters in a housing colony.',
        output: `M2M: meters → PLC area network → gateway → utility's on-premise billing server
IoT: meters → IPv6/6LoWPAN → cloud platform → billing, consumer app, grid analytics`,
        explanation: 'The M2M version serves one purpose in one closed system; the IoT version shares the data with many applications through the cloud.',
      },
      keyPoints: [
        'M2M: networking machines for remote monitoring and control.',
        'M2M architecture: area network, gateway, communication network, applications.',
        'Gateway translates non-IP protocols to IP.',
        'IoT differs in protocols, things, software emphasis, cloud data and breadth of applications.',
      ],
      importantTerms: [
        { term: 'M2M', meaning: 'Machine-to-Machine communication.' },
        { term: 'M2M gateway', meaning: 'Device that translates between area-network protocols and IP.' },
        { term: 'M2M area network', meaning: 'Local network of machines, often using non-IP protocols.' },
        { term: 'PLC', meaning: 'Power line communication — data over electrical wiring.' },
      ],
      examPoints: [
        'Define M2M and draw its architecture.',
        'Explain the role of the M2M gateway.',
        'Tabulate IoT vs M2M differences.',
      ],
      questions: [
        {
          prompt: 'What is M2M? Differentiate between IoT and M2M.',
          plan: ANSWER_PLAN(
            'Networking of machines for remote monitoring and control',
            'M2M architecture: area network, gateway, network, applications',
            'Components; differences in protocols, things, hardware/software, data, applications',
            'Smart meters as M2M vs IoT',
            'IoT broadens M2M with IP, cloud and software',
          ),
        },
      ],
      keywords: ['M2M', 'machine-to-machine', 'M2M area network', 'M2M gateway', 'protocol translation', 'ZigBee', 'PLC', 'IoT vs M2M', 'cloud'],
      remember: [
        { prompt: 'What does the M2M gateway do?', answer: 'Translates between non-IP area-network protocols and the IP network.' },
        { prompt: 'Where is IoT data usually stored?', answer: 'In the cloud.' },
      ],
    },

    // ------------------------------------------------------------------
    'introduction-to-sdn': {
      difficulty: 'hard',
      intro: 'Traditional networks are configured box by box. SDN lets one controller program the whole network.',
      definition:
        'Software-Defined Networking (SDN) is a networking architecture that **separates the control plane from the data plane** and **centralises network control** in a software-based **SDN controller**. Network devices become simple packet forwarders that follow rules installed by the controller through a standard interface such as **OpenFlow**.',
      simpleExplanation: {
        text: 'In a normal network, every switch and router decides for itself how to forward traffic. In SDN, the decisions are made by one central controller program, and the switches just follow its rules. Changing the network becomes a software change.',
        analogy: 'Traffic police at every junction (traditional) vs one city traffic control room that sets all the signals (SDN).',
      },
      visual: {
        type: 'architecture',
        title: 'SDN architecture',
        layers: [
          { label: 'Application layer', note: 'network applications', items: ['Routing', 'Load balancing', 'Security', 'Monitoring'] },
          { label: 'Control layer', note: 'northbound API above, southbound API below', items: ['SDN controller', 'Network OS'] },
          { label: 'Infrastructure layer', note: 'data plane', items: ['Switches', 'Routers', 'Flow tables'] },
        ],
        caption: 'Applications talk to the controller through **northbound** APIs; the controller programs devices through **southbound** interfaces such as OpenFlow.',
      },
      explanation: [
        { heading: 'Limitations of conventional networks' },
        {
          list: [
            '**Complex network devices** — each device runs many protocols and must be configured individually.',
            '**Management overhead** — changes need manual configuration on many devices from different vendors.',
            '**Limited scalability** — hard to adapt quickly to dynamic traffic, such as that from virtual machines and IoT devices.',
          ],
        },
        { heading: 'Key elements of SDN' },
        {
          list: [
            '**Centralised network controller** — maintains a global view of the network and configures it centrally.',
            '**Programmable open APIs** — northbound interfaces let applications program the network (routing, QoS, access control).',
            '**Standard communication interface (OpenFlow)** — the southbound interface between controller and devices.',
          ],
        },
        { heading: 'OpenFlow' },
        'An OpenFlow switch has **flow tables**. Each flow entry has **match fields** (e.g. source/destination address, port), **counters**, and **actions** (forward to a port, drop, send to controller). Packets that match no entry can be sent to the controller, which decides and installs a new rule.',
        { heading: 'Why SDN helps IoT' },
        'IoT networks have huge numbers of devices and changing traffic. SDN lets operators manage them centrally, apply policies (e.g. isolate a compromised sensor), and adapt routes dynamically.',
      ],
      example: {
        title: 'Isolating a compromised sensor',
        input: 'An IoT camera starts sending abnormal traffic.',
        output: `Monitoring app → controller (northbound API): block camera 10.0.5.23
Controller → switches (OpenFlow): flow rule "match src 10.0.5.23 → drop"`,
        explanation: 'One software command updates every switch at once — no logging in to devices one by one.',
      },
      keyPoints: [
        'SDN separates control plane from data plane.',
        'A centralised controller programs the network.',
        'Northbound APIs for applications; southbound (OpenFlow) for devices.',
        'OpenFlow switches use flow tables: match fields, counters, actions.',
        'Solves complexity, management overhead and scalability limits.',
      ],
      importantTerms: [
        { term: 'Control plane', meaning: 'Part of the network that decides how traffic is forwarded.' },
        { term: 'Data plane', meaning: 'Part that actually forwards packets.' },
        { term: 'SDN controller', meaning: 'Central software that manages the network.' },
        { term: 'OpenFlow', meaning: 'Standard southbound protocol between controller and switches.' },
        { term: 'Flow table', meaning: 'Switch table of match rules and actions.' },
      ],
      examPoints: [
        'Define SDN and the control/data plane separation.',
        'Draw the three-layer SDN architecture.',
        'List limitations of conventional networks and key SDN elements.',
        'Explain OpenFlow flow tables.',
      ],
      questions: [
        {
          prompt: 'What is Software-Defined Networking? Explain its architecture.',
          plan: ANSWER_PLAN(
            'Architecture separating control and data planes with a central controller',
            'Application, control and infrastructure layers with northbound/southbound APIs',
            'Conventional network limits; key elements; OpenFlow flow tables',
            'Isolating a compromised IoT camera',
            'Central, programmable, scalable network management',
          ),
        },
      ],
      keywords: ['SDN', 'control plane', 'data plane', 'SDN controller', 'northbound API', 'southbound interface', 'OpenFlow', 'flow table', 'programmable network'],
      remember: [
        { prompt: 'What does SDN separate?', answer: 'The control plane from the data plane.' },
        { prompt: 'Which protocol is the standard southbound interface?', answer: 'OpenFlow.' },
      ],
    },

    // ------------------------------------------------------------------
    'nfv-for-iot': {
      difficulty: 'hard',
      intro: 'Why buy a separate box for every network function when software on standard servers can do the job?',
      definition:
        'Network Function Virtualization (NFV) is a technology that uses virtualization to consolidate network functions — such as routing, firewalls, NAT and load balancing — as **software (virtualized network functions)** running on industry-standard servers, switches and storage. Its key elements are **VNFs**, the **NFV Infrastructure (NFVI)** and **NFV Management and Orchestration (MANO)**.',
      simpleExplanation: {
        text: 'Network functions that used to need dedicated hardware boxes become software programs running in virtual machines. They can be started, moved or scaled in minutes — ideal for fast-growing IoT networks.',
        analogy: 'Replacing a shelf of separate gadgets — calculator, camera, music player — with apps on one smartphone.',
      },
      visual: {
        type: 'architecture',
        title: 'NFV architecture',
        layers: [
          { label: 'Virtualized Network Functions (VNFs)', note: 'software network functions', items: ['Router', 'Firewall', 'NAT', 'Load balancer', 'IoT gateway'] },
          { label: 'NFV Infrastructure (NFVI)', note: 'virtualization layer over hardware', items: ['Virtual compute', 'Virtual storage', 'Virtual network'] },
          { label: 'Physical resources', note: 'industry-standard hardware', items: ['Servers', 'Storage', 'Switches'] },
        ],
        caption: '**NFV Management and Orchestration (MANO)** manages the lifecycle of VNFs and the NFVI resources across all layers.',
      },
      explanation: [
        { heading: 'Key elements' },
        {
          list: [
            '**Virtualized Network Function (VNF)** — a software implementation of a network function that runs on the NFVI.',
            '**NFV Infrastructure (NFVI)** — compute, storage and network hardware plus the virtualization layer that abstracts them into virtual resources.',
            '**NFV Management and Orchestration (MANO)** — orchestrates and manages the lifecycle of VNFs and the physical/virtual resources.',
          ],
        },
        { heading: 'NFV for IoT' },
        {
          list: [
            '**Virtualized IoT gateway** — gateway functions (protocol translation, data aggregation, security) run as VNFs in the provider’s cloud instead of in every home or site.',
            '**Home and access network virtualization** — functions such as DHCP, NAT and firewall move from home routers to virtual instances, simplifying the devices at the edge.',
            '**Elastic scaling** — when the number of IoT devices grows, more VNF instances are started automatically.',
          ],
        },
        { heading: 'SDN and NFV together' },
        {
          table: {
            columns: ['', 'SDN', 'NFV'],
            rows: [
              ['Main idea', 'Separate control from forwarding; centralise control', 'Run network functions as software on standard hardware'],
              ['Focus', 'How traffic is controlled and routed', 'Where network functions run'],
              ['Benefit', 'Programmable, centrally managed network', 'Lower cost, flexible deployment and scaling'],
            ],
          },
        },
        'They are **complementary**: NFV provides the virtual network functions, and SDN steers traffic between them.',
      ],
      example: {
        title: 'Scaling an IoT gateway',
        input: 'A smart-meter rollout grows from 10,000 to 200,000 meters in a year.',
        output: `Without NFV: buy and install more gateway hardware at each site
With NFV:    MANO starts extra virtual gateway (VNF) instances on existing servers`,
        explanation: 'Capacity grows in software, in minutes, without new specialised boxes.',
      },
      keyPoints: [
        'NFV runs network functions as software on standard hardware.',
        'Key elements: VNF, NFVI, MANO.',
        'For IoT: virtualized gateways, home network virtualization, elastic scaling.',
        'SDN and NFV are complementary.',
      ],
      importantTerms: [
        { term: 'NFV', meaning: 'Network Function Virtualization.' },
        { term: 'VNF', meaning: 'Virtualized Network Function — a software network function.' },
        { term: 'NFVI', meaning: 'NFV Infrastructure — hardware plus virtualization layer.' },
        { term: 'MANO', meaning: 'Management and Orchestration of VNFs and resources.' },
      ],
      examPoints: [
        'Define NFV and its three key elements.',
        'Draw the NFV architecture.',
        'Explain NFV use cases for IoT.',
        'Compare SDN and NFV.',
      ],
      questions: [
        {
          prompt: 'Explain Network Function Virtualization and its role in IoT.',
          plan: ANSWER_PLAN(
            'Network functions as software on standard hardware',
            'VNFs over NFVI over physical resources, managed by MANO',
            'VNF, NFVI, MANO; virtualized IoT gateway; scaling; SDN vs NFV',
            'Smart-meter rollout scaled with virtual gateways',
            'Lower cost, faster deployment; complements SDN',
          ),
        },
      ],
      keywords: ['NFV', 'network function virtualization', 'VNF', 'NFVI', 'MANO', 'virtualized IoT gateway', 'orchestration', 'SDN vs NFV'],
      remember: [
        { prompt: 'What does MANO do?', answer: 'Manages and orchestrates VNFs and NFV infrastructure resources.' },
        { prompt: 'Are SDN and NFV competitors?', answer: 'No — they are complementary.' },
      ],
    },
  },
}
