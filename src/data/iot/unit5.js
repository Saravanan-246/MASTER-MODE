// Internet of Things — Unit V: Data Analytics for IoT and Case Studies.
// Topic ids match the syllabus outline in ../subjects.js.
// Textbook context: Bahga & Madisetti, "Internet of Things: A Hands-On Approach".
// Inline markup in text: `code`, **keyword**.
//
// TODO(verify): "Predictive Applications" keeps the wording of the supplied
// handwritten syllabus. The textbook's matching case-study section is titled
// "Productivity Applications"; the notes say so and summarise both.
//
// Python and XML are shown with lang 'text' / 'html' — the highlighter covers PHP/HTML/SQL.

const ANSWER_PLAN = (definition, diagram, explanation, example, points) => [
  { label: 'Definition', hint: definition },
  { label: 'Diagram', hint: diagram },
  { label: 'Explanation', hint: explanation },
  { label: 'Example', hint: example },
  { label: 'Key points', hint: points },
]

// Shared plan for the case-study topics.
const CASE_PLAN = (system, level, example) =>
  ANSWER_PLAN(
    `IoT system for ${system}: purpose and requirements`,
    'Deployment diagram: devices → network → cloud/web services → app',
    `Process, services, IoT level (${level}), devices and implementation`,
    example,
    'How the design methodology shaped the system',
  )

const SENSOR_LOG = `2026-10-09 10:00:00,pi-01,27.0
2026-10-09 11:00:00,pi-02,28.0
2026-10-10 10:00:00,pi-01,29.0
2026-10-10 11:00:00,pi-02,30.0`

export default {
  overview:
    'Unit V first covers how IoT data is analysed at scale: batch processing with Hadoop MapReduce, workflows with Oozie, in-memory and stream processing with Spark, and real-time analytics with Storm. It then studies complete IoT systems — home automation, smart cities, environment, agriculture and predictive applications — designed with the IoT design methodology.',

  map: [
    { label: 'Why IoT analytics', topics: ['data-analytics-for-iot-introduction'] },
    { label: 'Batch: Hadoop', topics: ['apache-hadoop', 'using-hadoop-mapreduce-for-batch-data-analysis', 'apache-oozie'] },
    { label: 'Fast: Spark & Storm', topics: ['apache-spark', 'stream-processing-using-apache-spark', 'storm-for-real-time-data-analytics'] },
    { label: 'Case studies', topics: ['case-study-introduction', 'home-automation', 'smart-cities', 'environment', 'agriculture', 'predictive-applications'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'data-analytics-for-iot-introduction': {
      difficulty: 'easy',
      intro: 'Millions of devices reporting every few seconds create data no single computer can handle. IoT analytics needs big data tools.',
      definition:
        'Data analytics for IoT is the processing of large volumes of data from IoT devices to extract useful information — through **aggregation**, **filtering**, **statistical analysis**, **pattern detection** and **prediction**. Because IoT data is big data, it uses distributed frameworks for **batch**, **in-memory** and **real-time (stream)** analysis.',
      simpleExplanation: {
        text: 'Some questions can wait (“average temperature per day last year”) — use batch tools like Hadoop. Some need answers immediately (“is this machine overheating now?”) — use stream tools like Storm or Spark Streaming.',
        analogy: 'Batch is reading the whole newspaper at night; streaming is watching live news alerts on your phone.',
      },
      visual: {
        type: 'hierarchy',
        title: 'IoT analytics frameworks',
        root: 'IoT data analytics',
        children: [
          { label: 'Batch', note: 'large stored data', children: ['Hadoop MapReduce', 'Oozie workflows'] },
          { label: 'In-memory', note: 'fast, iterative', children: ['Apache Spark'] },
          { label: 'Real-time / stream', note: 'as data arrives', children: ['Apache Storm', 'Spark Streaming'] },
        ],
      },
      explanation: [
        { heading: 'Characteristics of IoT data' },
        {
          list: [
            '**Volume** — huge amounts from many devices.',
            '**Velocity** — data arrives continuously at high rates.',
            '**Variety** — numbers, text, images, video, logs.',
            'Usually **time-series** (timestamped) and **location-tagged**.',
            'Often **noisy** or incomplete — needs cleaning.',
          ],
        },
        { heading: 'Types of analysis' },
        {
          table: {
            columns: ['Analysis', 'Example'],
            rows: [
              ['Aggregation', 'Hourly / daily averages, totals'],
              ['Filtering', 'Keep only readings above a threshold'],
              ['Statistical analysis', 'Mean, variance, correlations'],
              ['Pattern / anomaly detection', 'Unusual vibration signature'],
              ['Prediction', 'Forecast demand or failure'],
            ],
          },
        },
        { heading: 'Batch vs real-time' },
        {
          table: {
            columns: ['', 'Batch', 'Real-time (stream)'],
            rows: [
              ['Data', 'Stored, bounded', 'Arriving, unbounded'],
              ['Latency', 'Minutes to hours', 'Milliseconds to seconds'],
              ['Tools', 'Hadoop MapReduce, Spark', 'Storm, Spark Streaming'],
              ['Use', 'Reports, model training', 'Alerts, live dashboards'],
            ],
          },
        },
      ],
      example: {
        title: 'Two questions on the same data',
        input: 'A city’s 2,000 air-quality sensors send readings every 30 seconds.',
        output: `"Which areas exceeded PM2.5 limits most days last year?" → batch (Hadoop/Spark)
"Is PM2.5 near the school above the limit right now?"   → stream (Storm/Spark Streaming)`,
        explanation: 'The question’s urgency decides the framework.',
      },
      keyPoints: [
        'IoT data is big data: volume, velocity, variety; time-series and noisy.',
        'Analyses: aggregation, filtering, statistics, pattern detection, prediction.',
        'Batch: Hadoop, Oozie; in-memory: Spark; stream: Storm, Spark Streaming.',
      ],
      importantTerms: [
        { term: 'Batch analytics', meaning: 'Analysis over stored data in large jobs.' },
        { term: 'Stream analytics', meaning: 'Continuous analysis of data as it arrives.' },
        { term: 'Time-series data', meaning: 'Values recorded with timestamps.' },
      ],
      examPoints: [
        'Explain the characteristics of IoT data.',
        'List the types of analysis.',
        'Compare batch and real-time analytics with tools.',
      ],
      questions: [
        {
          prompt: 'Write an introduction to data analytics for IoT.',
          plan: ANSWER_PLAN(
            'Processing large IoT data to extract information',
            'Tree of batch, in-memory, stream frameworks',
            'Data characteristics; analysis types; batch vs real-time',
            'Air-quality questions answered by batch vs stream',
            'Urgency decides the framework',
          ),
        },
      ],
      keywords: ['IoT analytics', 'big data', 'volume', 'velocity', 'variety', 'batch', 'stream', 'aggregation', 'Hadoop', 'Spark', 'Storm'],
      remember: [
        { prompt: 'Which kind of analytics suits live alerts?', answer: 'Real-time (stream) analytics.' },
      ],
    },

    // ------------------------------------------------------------------
    'apache-hadoop': {
      difficulty: 'medium',
      intro: 'Hadoop made it possible to store and process petabytes on clusters of ordinary computers.',
      definition:
        'Apache Hadoop is an open-source framework for **distributed batch processing** of big data on clusters of commodity hardware. Its core components are **HDFS** (Hadoop Distributed File System) for storage and **MapReduce** for processing, with **YARN** managing cluster resources in Hadoop 2.',
      simpleExplanation: {
        text: 'HDFS splits huge files into blocks and stores copies on many machines. MapReduce sends the processing code to the machines that hold the data, runs it in parallel, and combines the results.',
        analogy: 'Counting votes in an election: ballot boxes are counted in parallel at many centres (map), then the totals are combined centrally (reduce).',
      },
      visual: {
        type: 'architecture',
        title: 'Hadoop cluster',
        layers: [
          { label: 'Client', note: 'submits jobs, reads/writes files' },
          { label: 'Master nodes', note: 'coordinate', items: ['NameNode (HDFS)', 'ResourceManager (YARN) / JobTracker (v1)'] },
          { label: 'Worker (slave) nodes', note: 'store and compute', items: ['DataNode', 'NodeManager / TaskTracker'] },
        ],
      },
      explanation: [
        { heading: 'HDFS' },
        {
          list: [
            'Files are split into large **blocks** (e.g. 128 MB) stored on **DataNodes**.',
            'Each block is **replicated** (default 3 copies) for fault tolerance.',
            'The **NameNode** keeps the file system metadata: which blocks make up a file and where they are.',
            'A **Secondary NameNode** periodically checkpoints the NameNode metadata.',
          ],
        },
        { heading: 'MapReduce job execution' },
        {
          table: {
            columns: ['Hadoop 1 (MRv1)', 'Hadoop 2 (YARN)'],
            rows: [
              ['JobTracker schedules jobs and tracks tasks', 'ResourceManager allocates cluster resources'],
              ['TaskTracker on each node runs map/reduce tasks', 'NodeManager on each node runs containers'],
              ['Single JobTracker can be a bottleneck', 'Per-application ApplicationMaster manages each job'],
            ],
          },
        },
        '**Data locality**: tasks are scheduled on nodes that already hold the data, so code moves to data rather than data to code.',
        { heading: 'The Hadoop ecosystem' },
        '**Hive** (SQL-like queries), **Pig** (data-flow scripts), **HBase** (NoSQL on HDFS), **Oozie** (workflows), **Sqoop** (import from relational DBs), **Flume** (collect log/stream data).',
      ],
      example: {
        title: 'Storing a year of sensor logs',
        input: 'A 600 GB file of sensor readings is copied into HDFS (block size 128 MB, replication 3).',
        output: `Blocks: 600 GB / 128 MB ≈ 4,800 blocks
Stored copies: ≈ 14,400 block replicas across DataNodes
NameNode records which DataNodes hold each block`,
        explanation: 'If one DataNode fails, the other two replicas keep the data available and processing continues.',
      },
      keyPoints: [
        'Hadoop = HDFS (storage) + MapReduce (processing) + YARN (resources).',
        'HDFS: blocks on DataNodes, replicated 3×, metadata on NameNode.',
        'MRv1: JobTracker/TaskTracker; YARN: ResourceManager, NodeManager, ApplicationMaster.',
        'Data locality: computation moves to the data.',
        'Ecosystem: Hive, Pig, HBase, Oozie, Sqoop, Flume.',
      ],
      importantTerms: [
        { term: 'HDFS', meaning: 'Hadoop Distributed File System.' },
        { term: 'NameNode', meaning: 'Master that stores HDFS metadata.' },
        { term: 'DataNode', meaning: 'Worker that stores HDFS blocks.' },
        { term: 'YARN', meaning: 'Yet Another Resource Negotiator — Hadoop 2 resource manager.' },
        { term: 'Data locality', meaning: 'Running tasks where the data is stored.' },
      ],
      examPoints: [
        'Define Hadoop and its components.',
        'Explain HDFS architecture.',
        'Explain job execution in MRv1 and YARN.',
        'Name ecosystem tools.',
      ],
      questions: [
        {
          prompt: 'Explain Apache Hadoop and its architecture.',
          plan: ANSWER_PLAN(
            'Open-source framework for distributed batch processing on commodity clusters',
            'Client → master nodes → worker nodes',
            'HDFS (NameNode, DataNodes, replication); MapReduce execution; YARN; ecosystem',
            '600 GB sensor log stored in HDFS',
            'Fault-tolerant, scalable, data locality',
          ),
        },
      ],
      keywords: ['Hadoop', 'HDFS', 'NameNode', 'DataNode', 'block', 'replication', 'MapReduce', 'JobTracker', 'TaskTracker', 'YARN', 'ResourceManager', 'NodeManager', 'data locality'],
      remember: [
        { prompt: 'Default HDFS replication factor?', answer: '3' },
        { prompt: 'Which node stores HDFS metadata?', answer: 'The NameNode.' },
      ],
    },

    // ------------------------------------------------------------------
    'using-hadoop-mapreduce-for-batch-data-analysis': {
      difficulty: 'hard',
      intro: 'Write two small functions — map and reduce — and Hadoop runs them across the whole cluster.',
      definition:
        'MapReduce is a parallel programming model for batch processing. A **map** function turns each input record into intermediate **key–value pairs**; the framework **shuffles and sorts** them by key; a **reduce** function combines all values for each key into the final result.',
      simpleExplanation: {
        text: 'To compute the daily average temperature: the mapper reads each reading and emits (day, temperature). Hadoop groups all temperatures of the same day together. The reducer averages each group.',
        analogy: 'Sorting exam papers by subject (map + shuffle), then each subject teacher totals their pile (reduce).',
      },
      visual: {
        type: 'flow',
        title: 'MapReduce data flow',
        steps: [
          { label: 'Input splits', note: 'HDFS blocks' },
          { label: 'Map', note: 'record → (key, value)' },
          { label: 'Shuffle & sort', note: 'group values by key' },
          { label: 'Reduce', note: '(key, [values]) → result' },
          { label: 'Output', note: 'written to HDFS' },
        ],
      },
      explanation: [
        { heading: 'The model' },
        { code: `map:    (k1, v1)        → list(k2, v2)
reduce: (k2, list(v2))  → list(k3, v3)`, lang: 'text' },
        'Many mappers run in parallel on different input splits; many reducers run in parallel on different keys. An optional **combiner** does a local reduce on each mapper’s output to cut network traffic.',
        { heading: 'Batch analysis of IoT data with Hadoop Streaming' },
        '**Hadoop Streaming** lets mappers and reducers be written in any language that reads standard input and writes standard output — such as Python, as in the textbook’s examples.',
        {
          code: `hadoop jar hadoop-streaming.jar \\
  -input /data/temps -output /out/daily \\
  -mapper mapper.py -reducer reducer.py \\
  -file mapper.py -file reducer.py`,
          lang: 'text',
        },
        { heading: 'How the job runs on YARN' },
        {
          list: [
            'The client submits the job to the **ResourceManager**.',
            'An **ApplicationMaster** is started for the job.',
            'It requests **containers** on **NodeManagers**, preferring nodes holding the input blocks.',
            'Map tasks run, output is shuffled to reduce tasks, results are written to HDFS.',
          ],
          ordered: true,
        },
      ],
      example: {
        title: 'Daily average temperature',
        files: [
          {
            name: 'mapper.py',
            lang: 'text',
            code: `#!/usr/bin/env python3
import sys

for line in sys.stdin:
    timestamp, device, temp = line.strip().split(',')
    day = timestamp.split(' ')[0]
    print(f'{day}\\t{temp}')`,
          },
          {
            name: 'reducer.py',
            lang: 'text',
            code: `#!/usr/bin/env python3
import sys

current, total, count = None, 0.0, 0
for line in sys.stdin:
    day, temp = line.strip().split('\\t')
    if current is not None and day != current:
        print(f'{current}\\t{total / count:.1f}')
        total, count = 0.0, 0
    current = day
    total += float(temp)
    count += 1

if current is not None:
    print(f'{current}\\t{total / count:.1f}')`,
          },
          { name: 'input.csv', lang: 'text', code: SENSOR_LOG },
        ],
        output: `2026-10-09	27.5
2026-10-10	29.5`,
        explanation:
          'The mapper emits (day, temperature). Hadoop sorts by day, so each reducer sees one day’s values together and prints their average: (27 + 28) / 2 = 27.5 and (29 + 30) / 2 = 29.5.',
      },
      keyPoints: [
        'Map: record → key–value pairs; reduce: key + values → result.',
        'Shuffle and sort group values by key between the phases.',
        'Combiners reduce network traffic.',
        'Hadoop Streaming allows Python mappers/reducers.',
        'On YARN: ResourceManager, ApplicationMaster, containers on NodeManagers.',
      ],
      importantTerms: [
        { term: 'Mapper', meaning: 'Function that emits intermediate key–value pairs.' },
        { term: 'Reducer', meaning: 'Function that aggregates all values of one key.' },
        { term: 'Shuffle and sort', meaning: 'Moving and grouping map output by key.' },
        { term: 'Combiner', meaning: 'Local reducer on mapper output.' },
        { term: 'Hadoop Streaming', meaning: 'Runs mappers/reducers written in any language via stdin/stdout.' },
      ],
      examPoints: [
        'State the MapReduce model with signatures.',
        'Draw the map → shuffle → reduce flow.',
        'Write a mapper and reducer for an IoT aggregation.',
        'Explain job execution on YARN.',
      ],
      questions: [
        {
          prompt: 'Explain how Hadoop MapReduce is used for batch analysis of IoT data with an example.',
          plan: ANSWER_PLAN(
            'Programming model: map to key–value pairs, shuffle by key, reduce per key',
            'Input → map → shuffle & sort → reduce → output',
            'Model signatures; combiner; Hadoop Streaming; YARN execution',
            'Daily average temperature mapper and reducer',
            'Parallel, fault-tolerant batch analysis',
          ),
        },
      ],
      keywords: ['MapReduce', 'map', 'reduce', 'key-value', 'shuffle', 'sort', 'combiner', 'Hadoop Streaming', 'batch analysis', 'YARN', 'ApplicationMaster'],
      remember: [
        { prompt: 'What happens between map and reduce?', answer: 'Shuffle and sort — values are grouped by key.' },
        { prompt: 'How can Python be used with Hadoop?', answer: 'Through Hadoop Streaming (stdin/stdout).' },
      ],
    },

    // ------------------------------------------------------------------
    'apache-oozie': {
      difficulty: 'medium',
      intro: 'Real analysis is a chain of jobs — clean, aggregate, report — run every night. Oozie runs the chain for you.',
      definition:
        'Apache Oozie is a **workflow scheduler** for Hadoop. It runs **workflows** — directed acyclic graphs (DAGs) of actions such as MapReduce, Pig, Hive and shell jobs — defined in XML, and **coordinator** jobs that start workflows on a schedule or when input data becomes available.',
      simpleExplanation: {
        text: 'You describe the jobs and their order once in a `workflow.xml`. Oozie starts each job when the previous one succeeds, handles failures, and — with a coordinator — runs the whole workflow every day automatically.',
        analogy: 'A production line supervisor who starts each machine when the previous one finishes and stops the line if something breaks.',
      },
      visual: {
        type: 'process',
        title: 'A nightly IoT workflow',
        steps: [
          { label: 'start', detail: 'workflow begins' },
          { label: 'clean-data (MapReduce)', detail: 'remove bad readings' },
          { label: 'fork', detail: 'run two jobs in parallel' },
          { label: 'daily-averages | detect-anomalies', detail: 'two parallel actions' },
          { label: 'join', detail: 'wait for both' },
          { label: 'end (or kill on error)', detail: 'workflow finishes' },
        ],
      },
      explanation: [
        { heading: 'Workflow nodes' },
        {
          table: {
            columns: ['Node type', 'Nodes', 'Purpose'],
            rows: [
              ['Control flow', '`start`, `end`, `kill`', 'Begin, finish successfully, or stop with an error'],
              ['Control flow', '`decision`', 'Choose a path based on a condition'],
              ['Control flow', '`fork`, `join`', 'Run actions in parallel, then wait for all'],
              ['Action', '`map-reduce`, `pig`, `hive`, `shell`, `java` …', 'The actual jobs; each has `ok` and `error` transitions'],
            ],
          },
        },
        {
          code: `<workflow-app name="iot-nightly" xmlns="uri:oozie:workflow:0.5">
  <start to="clean-data"/>
  <action name="clean-data">
    <map-reduce>
      <job-tracker>\${jobTracker}</job-tracker>
      <name-node>\${nameNode}</name-node>
    </map-reduce>
    <ok to="end"/>
    <error to="fail"/>
  </action>
  <kill name="fail">
    <message>Cleaning failed</message>
  </kill>
  <end name="end"/>
</workflow-app>`,
          lang: 'html',
        },
        { heading: 'Coordinators and bundles' },
        {
          list: [
            '**Coordinator** — triggers a workflow by **time** (e.g. every day at 01:00) and/or **data availability** (when yesterday’s data folder appears).',
            '**Bundle** — groups several coordinators to manage them together.',
          ],
        },
      ],
      example: {
        title: 'Daily sensor pipeline',
        input: 'Coordinator: run at 01:00 daily when /data/YYYY-MM-DD exists.',
        output: `01:00 data present → workflow starts
clean-data OK → fork → averages + anomaly detection → join → end
If clean-data fails → kill node logs "Cleaning failed"`,
        explanation: 'Oozie handles ordering, parallelism, scheduling and failure handling.',
      },
      keyPoints: [
        'Oozie schedules Hadoop jobs as workflows (DAGs) defined in XML.',
        'Control nodes: start, end, kill, decision, fork, join.',
        'Action nodes run MapReduce, Pig, Hive, shell and other jobs.',
        'Coordinators trigger workflows by time or data; bundles group coordinators.',
      ],
      importantTerms: [
        { term: 'Workflow', meaning: 'DAG of actions and control nodes run by Oozie.' },
        { term: 'DAG', meaning: 'Directed acyclic graph — steps with direction and no cycles.' },
        { term: 'Coordinator', meaning: 'Oozie job that triggers workflows by time or data availability.' },
        { term: 'Fork / join', meaning: 'Split into parallel paths / wait for all of them.' },
      ],
      examPoints: [
        'Define Oozie and a workflow.',
        'List control and action nodes.',
        'Show a small workflow.xml.',
        'Explain coordinators and bundles.',
      ],
      questions: [
        {
          prompt: 'Explain Apache Oozie and its workflow.',
          plan: ANSWER_PLAN(
            'Workflow scheduler for Hadoop jobs',
            'start → action → fork → actions → join → end',
            'Control and action nodes; XML definition; coordinators; bundles',
            'Nightly sensor pipeline',
            'Automates multi-step batch analytics',
          ),
        },
      ],
      keywords: ['Oozie', 'workflow', 'DAG', 'action node', 'control node', 'fork', 'join', 'decision', 'kill', 'coordinator', 'bundle', 'workflow.xml'],
      remember: [
        { prompt: 'Which Oozie job type runs a workflow every day?', answer: 'A coordinator.' },
        { prompt: 'Which nodes run actions in parallel?', answer: 'fork and join.' },
      ],
    },

    // ------------------------------------------------------------------
    'apache-spark': {
      difficulty: 'hard',
      intro: 'Hadoop writes to disk between steps. Spark keeps data in memory — often many times faster, especially for repeated computations.',
      definition:
        'Apache Spark is an open-source **cluster computing framework** for fast, **in-memory** data processing. Its core abstraction is the **Resilient Distributed Dataset (RDD)** — an immutable, partitioned collection processed in parallel — and it includes libraries for SQL (Spark SQL), streaming (Spark Streaming), machine learning (MLlib) and graphs (GraphX).',
      simpleExplanation: {
        text: 'Load data into RDDs spread across the cluster, describe a chain of transformations (map, filter, reduceByKey), and ask for a result with an action (collect, count). Spark plans the work and keeps intermediate data in memory.',
        analogy: 'Working on a problem with all notes open on your desk (Spark) instead of filing them away and fetching them again for every step (MapReduce).',
      },
      visual: {
        type: 'architecture',
        title: 'Spark stack',
        layers: [
          { label: 'Libraries', note: 'high-level APIs', items: ['Spark SQL', 'Spark Streaming', 'MLlib', 'GraphX'] },
          { label: 'Spark Core', note: 'RDDs, scheduling, memory', items: ['Driver', 'Executors'] },
          { label: 'Cluster manager', note: 'resources', items: ['Standalone', 'YARN', 'Mesos'] },
          { label: 'Storage', note: 'data sources', items: ['HDFS', 'S3', 'Databases'] },
        ],
      },
      explanation: [
        { heading: 'RDDs' },
        {
          list: [
            '**Resilient** — lost partitions are rebuilt from their **lineage** (the record of transformations that produced them).',
            '**Distributed** — partitioned across the cluster.',
            '**Immutable** — transformations create new RDDs.',
          ],
        },
        { heading: 'Transformations vs actions' },
        {
          table: {
            columns: ['', 'Transformations', 'Actions'],
            rows: [
              ['Examples', '`map`, `filter`, `flatMap`, `reduceByKey`, `join`', '`collect`, `count`, `first`, `saveAsTextFile`'],
              ['Returns', 'A new RDD', 'A value to the driver, or output'],
              ['Evaluation', '**Lazy** — only recorded', 'Triggers execution of the chain'],
            ],
          },
        },
        { heading: 'How a Spark job runs' },
        'The **driver** program builds the transformation graph (a DAG). When an action is called, the scheduler splits it into stages and tasks, which **executors** on worker nodes run in parallel. Data can be **cached** in memory for reuse.',
        { heading: 'Spark vs Hadoop MapReduce' },
        {
          table: {
            columns: ['', 'MapReduce', 'Spark'],
            rows: [
              ['Intermediate data', 'Written to disk', 'Kept in memory'],
              ['Programming', 'Map and reduce only', 'Many operators, several languages'],
              ['Iterative jobs (e.g. ML)', 'Slow', 'Fast'],
              ['Streaming', 'No', 'Yes (Spark Streaming)'],
            ],
          },
        },
      ],
      example: {
        title: 'Average temperature per device (PySpark)',
        files: [
          {
            name: 'device_average.py',
            lang: 'text',
            code: `from pyspark import SparkContext

sc = SparkContext(appName='DeviceAverage')
lines = sc.textFile('hdfs:///data/temps')

pairs = lines.map(lambda l: l.split(',')) \\
             .map(lambda f: (f[1], (float(f[2]), 1)))
sums = pairs.reduceByKey(lambda a, b: (a[0] + b[0], a[1] + b[1]))
averages = sums.mapValues(lambda s: round(s[0] / s[1], 1))

print(averages.collect())`,
          },
          { name: 'input.csv', lang: 'text', code: SENSOR_LOG },
        ],
        output: `[('pi-01', 28.0), ('pi-02', 29.0)]`,
        explanation:
          'Transformations build the plan lazily; `collect()` triggers it. pi-01: (27 + 29) / 2 = 28.0; pi-02: (28 + 30) / 2 = 29.0. The order of the pairs in the list may vary.',
      },
      keyPoints: [
        'Spark is an in-memory cluster computing framework.',
        'RDDs are resilient (lineage), distributed and immutable.',
        'Transformations are lazy; actions trigger execution.',
        'Driver plans, executors run tasks; data can be cached.',
        'Libraries: Spark SQL, Streaming, MLlib, GraphX.',
      ],
      importantTerms: [
        { term: 'RDD', meaning: 'Resilient Distributed Dataset — Spark’s core data abstraction.' },
        { term: 'Lineage', meaning: 'Record of transformations used to rebuild lost partitions.' },
        { term: 'Lazy evaluation', meaning: 'Transformations run only when an action needs them.' },
        { term: 'Driver / executor', meaning: 'Program that plans the job / workers that run tasks.' },
      ],
      examPoints: [
        'Define Spark and RDDs.',
        'Contrast transformations and actions.',
        'Draw the Spark stack.',
        'Compare Spark with MapReduce; give a PySpark example.',
      ],
      questions: [
        {
          prompt: 'Explain Apache Spark and its components.',
          plan: ANSWER_PLAN(
            'In-memory cluster computing framework built on RDDs',
            'Libraries → Spark Core → cluster manager → storage',
            'RDD properties; transformations vs actions; driver/executors; Spark vs MapReduce',
            'PySpark average temperature per device',
            'Fast for iterative and interactive analysis',
          ),
        },
      ],
      keywords: ['Apache Spark', 'in-memory', 'RDD', 'lineage', 'transformation', 'action', 'lazy evaluation', 'driver', 'executor', 'Spark SQL', 'MLlib', 'GraphX'],
      remember: [
        { prompt: 'Is `filter` a transformation or an action?', answer: 'A transformation (lazy).' },
        { prompt: 'How does Spark recover a lost partition?', answer: 'By recomputing it from its lineage.' },
      ],
    },

    // ------------------------------------------------------------------
    'stream-processing-using-apache-spark': {
      difficulty: 'hard',
      intro: 'Spark Streaming applies the same Spark operations to live data by chopping the stream into tiny batches.',
      definition:
        '**Spark Streaming** is Spark’s library for scalable, fault-tolerant stream processing. It divides live input into **micro-batches** at a fixed **batch interval**; the stream is represented as a **DStream** (discretized stream) — a sequence of RDDs — processed with Spark transformations and **window** operations.',
      simpleExplanation: {
        text: 'Every few seconds Spark Streaming collects the data that arrived, treats it as a small RDD, and runs your code on it. Window operations let you look at, say, the last 60 seconds of data every 10 seconds.',
        analogy: 'A security guard who checks the CCTV recording every 10 seconds rather than staring at every frame.',
      },
      visual: {
        type: 'flow',
        title: 'Spark Streaming',
        steps: [
          { label: 'Live input', note: 'Kafka, Flume, sockets' },
          { label: 'Micro-batches', note: 'every batch interval' },
          { label: 'DStream', note: 'sequence of RDDs' },
          { label: 'Transformations & windows', note: 'map, filter, reduceByKeyAndWindow' },
          { label: 'Output', note: 'dashboards, databases, alerts' },
        ],
      },
      explanation: [
        { heading: 'Key concepts' },
        {
          list: [
            '**StreamingContext** — entry point, created with a batch interval (e.g. 10 seconds).',
            '**Input DStreams** — from sources such as Kafka, Flume, Kinesis or TCP sockets.',
            '**Transformations** — the same as RDD operations: `map`, `filter`, `reduceByKey`.',
            '**Window operations** — computed over a sliding window, defined by **window length** and **slide interval**.',
            '**Output operations** — `pprint`, `saveAsTextFiles`, `foreachRDD` to write to external systems.',
          ],
        },
        { heading: 'Micro-batch vs record-at-a-time' },
        'Spark Streaming processes small batches, so latency is about the batch interval (typically seconds). Storm processes each tuple as it arrives (lower latency). Spark’s advantage is one engine and one API for batch, interactive and streaming work.',
        { note: 'Newer Spark versions also offer **Structured Streaming**, which expresses streams as continuously growing tables queried with DataFrame/SQL operations.' },
      ],
      example: {
        title: 'High-temperature alerts every 10 seconds',
        files: [
          {
            name: 'alerts.py',
            lang: 'text',
            code: `from pyspark import SparkContext
from pyspark.streaming import StreamingContext

sc = SparkContext(appName='HighTempAlerts')
ssc = StreamingContext(sc, 10)                 # 10-second micro-batches

lines = ssc.socketTextStream('localhost', 9999)
alerts = (lines.map(lambda l: l.split(','))
               .filter(lambda f: float(f[2]) > 40)
               .map(lambda f: (f[1], 1))
               .reduceByKey(lambda a, b: a + b))

alerts.pprint()
ssc.start()
ssc.awaitTermination()`,
          },
        ],
        input: 'Readings arriving on port 9999, e.g. "2026-10-10 14:00:03,boiler-2,43.5"',
        output: `-------------------------------------------
Time: 2026-10-10 14:00:10
-------------------------------------------
('boiler-2', 3)`,
        explanation: 'In this 10-second batch, boiler-2 sent three readings above 40 °C. Each batch is processed as a small RDD with ordinary Spark operations.',
      },
      keyPoints: [
        'Spark Streaming uses micro-batches at a batch interval.',
        'A DStream is a sequence of RDDs.',
        'Same transformations as batch Spark, plus window operations.',
        'Latency ≈ batch interval (seconds).',
        'Structured Streaming is the newer table-based API.',
      ],
      importantTerms: [
        { term: 'DStream', meaning: 'Discretized stream — a sequence of RDDs over time.' },
        { term: 'Batch interval', meaning: 'Time span of each micro-batch.' },
        { term: 'Window length / slide interval', meaning: 'Span of data covered / how often the window moves.' },
        { term: 'StreamingContext', meaning: 'Entry point for Spark Streaming programs.' },
      ],
      examPoints: [
        'Define Spark Streaming and DStream.',
        'Explain micro-batching and windows.',
        'Write a small streaming program.',
        'Compare with Storm.',
      ],
      questions: [
        {
          prompt: 'Explain stream processing using Apache Spark.',
          plan: ANSWER_PLAN(
            'Spark Streaming processes live data as micro-batches (DStreams)',
            'Input → micro-batches → DStream → transformations → output',
            'StreamingContext, sources, transformations, windows, outputs; vs Storm',
            'High-temperature alert program',
            'One engine for batch and stream',
          ),
        },
      ],
      keywords: ['Spark Streaming', 'DStream', 'micro-batch', 'batch interval', 'window operation', 'StreamingContext', 'Kafka', 'Structured Streaming'],
      remember: [
        { prompt: 'What is a DStream made of?', answer: 'A sequence of RDDs, one per batch interval.' },
      ],
    },

    // ------------------------------------------------------------------
    'storm-for-real-time-data-analytics': {
      difficulty: 'hard',
      intro: 'When every millisecond counts, Storm processes each event the moment it arrives.',
      definition:
        'Apache Storm is an open-source, distributed **real-time computation system** that processes unbounded streams of data record by record. A Storm application is a **topology** — a graph of **spouts** (stream sources) and **bolts** (processing steps) — that runs continuously on a cluster coordinated by **Nimbus**, **Supervisors** and **ZooKeeper**.',
      simpleExplanation: {
        text: 'Spouts pull in data (e.g. sensor messages from a queue) and emit tuples. Bolts filter, enrich, aggregate or store them and can pass results to further bolts. The topology never stops — it keeps processing as long as data flows.',
        analogy: 'An assembly line that never stops: items enter at the start (spout) and pass through workstations (bolts).',
      },
      visual: {
        type: 'flow',
        title: 'A Storm topology for sensor data',
        steps: [
          { label: 'Spout', note: 'reads readings from a queue' },
          { label: 'Parse bolt', note: 'tuple → fields' },
          { label: 'Threshold bolt', note: 'keep values > limit' },
          { label: 'Alert bolt', note: 'notify / store' },
        ],
      },
      explanation: [
        { heading: 'Storm concepts' },
        {
          table: {
            columns: ['Concept', 'Meaning'],
            rows: [
              ['Tuple', 'A named list of values — the unit of data'],
              ['Stream', 'An unbounded sequence of tuples'],
              ['Spout', 'Source of streams (reads from Kafka, a queue, an API)'],
              ['Bolt', 'Processes input streams and may emit new streams (filter, aggregate, join, write)'],
              ['Topology', 'Graph of spouts and bolts; runs until killed'],
              ['Stream grouping', 'How tuples are distributed among bolt tasks: shuffle, fields, all, global'],
            ],
          },
        },
        { heading: 'Cluster architecture' },
        {
          list: [
            '**Nimbus** — master daemon: distributes code, assigns tasks, monitors failures.',
            '**Supervisor** — runs on each worker node; starts and stops worker processes.',
            '**ZooKeeper** — coordinates Nimbus and Supervisors and stores cluster state.',
          ],
        },
        { heading: 'Features' },
        {
          list: [
            '**Low latency** — processes each tuple as it arrives.',
            '**Scalable** — add nodes and increase parallelism of spouts and bolts.',
            '**Fault tolerant** — failed workers are restarted; tuples can be replayed.',
            '**Guaranteed processing** — every tuple is processed at least once (when acking is used).',
          ],
        },
        {
          table: {
            columns: ['', 'Storm', 'Spark Streaming'],
            rows: [
              ['Processing', 'One tuple at a time', 'Micro-batches'],
              ['Latency', 'Milliseconds', 'Seconds (batch interval)'],
              ['Batch processing too?', 'No', 'Yes, same engine'],
            ],
          },
        },
      ],
      example: {
        title: 'Real-time machine monitoring',
        input: 'Vibration readings from 500 machines arrive through a message queue.',
        output: `Spout        : emits (machine_id, vibration) tuples
Parse bolt   : converts units
Threshold bolt (fields grouping on machine_id): flags vibration > limit
Alert bolt   : sends SMS to maintenance within milliseconds`,
        explanation: 'Fields grouping sends all tuples of one machine to the same bolt task, so per-machine state is consistent.',
      },
      keyPoints: [
        'Storm processes unbounded streams tuple by tuple in real time.',
        'Topology = spouts + bolts; runs continuously.',
        'Stream groupings decide which bolt task receives each tuple.',
        'Cluster: Nimbus, Supervisors, ZooKeeper.',
        'Low latency, scalable, fault-tolerant, guaranteed processing.',
      ],
      importantTerms: [
        { term: 'Spout', meaning: 'Source of a stream in a Storm topology.' },
        { term: 'Bolt', meaning: 'Processing unit in a Storm topology.' },
        { term: 'Topology', meaning: 'Graph of spouts and bolts that runs continuously.' },
        { term: 'Nimbus', meaning: 'Storm’s master daemon.' },
        { term: 'Fields grouping', meaning: 'Tuples with the same field value go to the same bolt task.' },
      ],
      examPoints: [
        'Define Storm and its concepts (tuple, stream, spout, bolt, topology).',
        'Explain Nimbus, Supervisor, ZooKeeper.',
        'Draw a topology for an IoT use case.',
        'Compare Storm with Spark Streaming.',
      ],
      questions: [
        {
          prompt: 'Explain Apache Storm for real-time data analytics in IoT.',
          plan: ANSWER_PLAN(
            'Distributed real-time computation system using topologies of spouts and bolts',
            'Spout → bolts topology',
            'Concepts; stream groupings; cluster architecture; features; vs Spark Streaming',
            'Machine vibration monitoring topology',
            'Millisecond latency for IoT alerts',
          ),
        },
      ],
      keywords: ['Apache Storm', 'real-time', 'tuple', 'stream', 'spout', 'bolt', 'topology', 'stream grouping', 'Nimbus', 'Supervisor', 'ZooKeeper'],
      remember: [
        { prompt: 'Which Storm component is the source of a stream?', answer: 'The spout.' },
        { prompt: 'What coordinates a Storm cluster?', answer: 'ZooKeeper (with Nimbus as master).' },
      ],
    },

    // ------------------------------------------------------------------
    'case-study-introduction': {
      difficulty: 'easy',
      intro: 'Case studies show complete IoT systems — from requirements to code — built with the design methodology.',
      definition:
        'IoT case studies are worked designs of complete IoT systems in specific domains. Each applies the **IoT design methodology** — purpose and requirements, process, domain and information models, services, IoT level, functional and operational views — and then shows the deployment and implementation with devices, web services and applications.',
      simpleExplanation: {
        text: 'Instead of learning tools one by one, a case study joins them: sensors on a Raspberry Pi, a controller program, REST services or a cloud platform, a database, and a web app — all chosen by following the methodology.',
        analogy: 'A solved project report: you see how every concept from earlier units fits into one working system.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Case studies in this unit',
        root: 'IoT case studies',
        children: [
          { label: 'Home automation', children: ['Smart lighting', 'Intrusion detection'] },
          { label: 'Smart cities', children: ['Smart parking'] },
          { label: 'Environment', children: ['Weather monitoring', 'Air pollution', 'Forest fire detection'] },
          { label: 'Agriculture', children: ['Smart irrigation'] },
          { label: 'Predictive applications', children: ['Prediction from sensor data'] },
        ],
      },
      explanation: [
        { heading: 'What every case study contains' },
        {
          list: [
            '**Purpose and requirements** of the system.',
            '**Process specification** — the use cases.',
            '**Domain and information models**.',
            '**Service specifications** — controller (native) and web services.',
            '**IoT level** — the deployment template used.',
            '**Functional and operational views** — the concrete technology choices.',
            '**Implementation** — device wiring, controller code, web services, database, application.',
          ],
        },
        { heading: 'Common building blocks' },
        {
          table: {
            columns: ['Layer', 'Typical choice in the textbook'],
            rows: [
              ['Device', 'Raspberry Pi with sensors and actuators'],
              ['Controller', 'Python native service'],
              ['Communication', 'Wi-Fi, IP, HTTP / WebSocket'],
              ['Web services & app', 'Django REST services and web application'],
              ['Cloud / storage', 'Local MySQL, or cloud platforms such as Xively / AWS'],
            ],
          },
        },
      ],
      example: {
        title: 'Reading a case study',
        input: 'You read the smart irrigation case study.',
        output: `Ask: What is measured? (soil moisture)
     Where is it stored/analysed? (cloud storage, local analysis → Level-2)
     What acts? (valve via relay)
     How do users interact? (web/mobile app)`,
        explanation: 'These four questions recover the whole design quickly in an exam.',
      },
      keyPoints: [
        'Case studies apply the design methodology to complete systems.',
        'Each has requirements, process, models, services, level, views and implementation.',
        'Common blocks: Raspberry Pi, Python controller, Django/REST, MySQL or cloud.',
        'Domains: home, city, environment, agriculture, predictive applications.',
      ],
      importantTerms: [
        { term: 'Case study', meaning: 'A worked design and implementation of a real-world system.' },
        { term: 'Deployment design', meaning: 'How devices, services and storage are placed and connected.' },
      ],
      examPoints: [
        'State what each case study covers.',
        'List the case studies.',
        'Name the common building blocks.',
      ],
      questions: [
        {
          prompt: 'What does an IoT case study based on the design methodology include?',
          plan: ANSWER_PLAN(
            'Worked design of a complete IoT system using the methodology',
            'Tree of case studies',
            'Methodology steps applied; common building blocks',
            'Reading the smart irrigation case study',
            'Connects all earlier units',
          ),
        },
      ],
      keywords: ['case study', 'design methodology', 'Raspberry Pi', 'controller service', 'Django', 'IoT level', 'deployment'],
      remember: [
        { prompt: 'Which board is used in most textbook case studies?', answer: 'Raspberry Pi.' },
      ],
    },

    // ------------------------------------------------------------------
    'home-automation': {
      difficulty: 'medium',
      intro: 'Two home systems built end to end: smart lighting and home intrusion detection.',
      definition:
        'The home automation case study designs IoT systems for the home: a **smart lighting** system that lets users control lights remotely in auto or manual mode, and a **home intrusion detection** system that detects intrusions with sensors and alerts the owner.',
      simpleExplanation: {
        text: 'Smart lighting: a Raspberry Pi reads a light sensor and switches a relay; a Django web app sets the mode and state. Intrusion detection: motion and door sensors are watched; on detection, an alert is sent to the owner.',
        analogy: 'A home assistant that turns on the lights when it gets dark and calls you if a window opens at night.',
      },
      visual: {
        type: 'architecture',
        title: 'Smart lighting deployment (Level-1)',
        layers: [
          { label: 'Web application', note: 'Django app: mode and state' },
          { label: 'REST web services', note: 'mode service, state service', items: ['Django REST', 'MySQL'] },
          { label: 'Controller service', note: 'native Python on the Pi' },
          { label: 'Device', note: 'Raspberry Pi', items: ['LDR light sensor', 'Relay + light'] },
        ],
      },
      explanation: [
        { heading: 'Smart lighting' },
        {
          list: [
            '**Purpose** — control the home’s lights through a web application.',
            '**Modes** — **auto**: the controller reads the LDR and switches the light when dark; **manual**: the user sets the state.',
            '**Services** — REST **mode** and **state** services; native **controller** service.',
            '**Level** — **Level-1**: storage, analysis and application all local on the Pi.',
            '**Implementation** — Raspberry Pi + LDR + relay; Django app and REST services; MySQL database.',
          ],
        },
        { heading: 'Home intrusion detection' },
        {
          list: [
            '**Purpose** — detect intrusions using sensors such as **PIR motion sensors** and **door/window sensors**, and raise alerts.',
            '**Process** — the controller monitors sensors per room; on detection, the event is recorded and an **alert** (e.g. email/SMS) is sent; the web app shows the state of each room.',
            '**Services** — a native controller service plus web services for room states and alerts.',
            '**Level** — the textbook uses a **Level-2** design: the device does local analysis while data is stored in the cloud for the web application.',
          ],
        },
        { tip: 'The full ten-step derivation of smart lighting is in Unit III, Introduction to IoT Design Methodology.' },
      ],
      example: {
        title: 'Intrusion alert logic',
        files: [
          {
            name: 'intrusion.py',
            lang: 'text',
            code: `import time
import RPi.GPIO as GPIO

PIR_PIN = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(PIR_PIN, GPIO.IN)

def send_alert(room):
    print(f'ALERT: motion detected in {room}')   # email / SMS in a real system

armed = True
while True:
    if armed and GPIO.input(PIR_PIN):
        send_alert('Living room')
        time.sleep(30)                             # avoid repeated alerts
    time.sleep(0.5)`,
          },
        ],
        output: 'ALERT: motion detected in Living room',
        explanation: 'When the system is armed and the PIR sensor goes high, an alert is raised; a short pause prevents a flood of alerts for the same event. Pin numbers depend on the wiring.',
      },
      keyPoints: [
        'Smart lighting: auto/manual modes, REST mode & state services, native controller, Level-1.',
        'Intrusion detection: PIR and door sensors, alerts, room status in a web app.',
        'Both use Raspberry Pi with Python controller code.',
      ],
      importantTerms: [
        { term: 'PIR sensor', meaning: 'Detects motion from infrared heat of bodies.' },
        { term: 'Armed state', meaning: 'Mode in which the intrusion system raises alerts.' },
        { term: 'Controller service', meaning: 'Native program that reads sensors and drives actuators.' },
      ],
      examPoints: [
        'Describe the smart lighting system: purpose, modes, services, level, implementation.',
        'Describe the intrusion detection system and its alert process.',
        'Draw the deployment diagram.',
      ],
      questions: [
        {
          prompt: 'Explain the home automation case study (smart lighting and intrusion detection).',
          plan: CASE_PLAN('home automation', 'Level-1 lighting; Level-2 intrusion detection', 'PIR intrusion alert program'),
        },
      ],
      keywords: ['smart lighting', 'intrusion detection', 'PIR sensor', 'LDR', 'relay', 'controller service', 'Django', 'Level-1', 'alerts'],
      remember: [
        { prompt: 'Which sensor detects an intruder’s motion?', answer: 'PIR motion sensor.' },
      ],
    },

    // ------------------------------------------------------------------
    'smart-cities': {
      difficulty: 'medium',
      intro: 'The smart city case study: a parking system that shows drivers free slots in real time.',
      definition:
        'The smart cities case study designs a **smart parking** system that detects the occupancy of each parking slot with sensors, sends the status to the cloud, and shows drivers available slots through a web or mobile application.',
      simpleExplanation: {
        text: 'Each parking slot has a sensor (e.g. ultrasonic) that detects a car. A node at each slot reports “occupied” or “free”. The cloud keeps the live status and the app shows a map of free slots.',
        analogy: 'Cinema seat booking — you see which seats are free before you go — but for parking slots.',
      },
      visual: {
        type: 'architecture',
        title: 'Smart parking deployment',
        layers: [
          { label: 'Application', note: 'web / mobile map of free slots' },
          { label: 'Cloud', note: 'storage, analysis, central controller', items: ['Slot status DB', 'REST/WebSocket API'] },
          { label: 'Network', note: 'Wi-Fi / cellular' },
          { label: 'Slot nodes', note: 'one per slot', items: ['Ultrasonic sensor', 'Controller board'] },
        ],
      },
      explanation: [
        { heading: 'Design summary' },
        {
          list: [
            '**Purpose** — detect the number of empty parking slots and show them to drivers.',
            '**Process** — each node periodically checks its slot and sends the status; the app reads the current state.',
            '**Domain model** — physical entity: parking slot; device: sensor node; services: slot status.',
            '**Services** — native controller on each node; web service to store and serve slot status.',
            '**Level** — many independent nodes sending to the cloud with central monitoring: an **IoT Level-6** design.',
          ],
        },
        { heading: 'Implementation choices' },
        {
          table: {
            columns: ['Part', 'Choice'],
            rows: [
              ['Sensor', 'Ultrasonic distance sensor (car present if distance is short)'],
              ['Node', 'Raspberry Pi / microcontroller board with Wi-Fi'],
              ['Back end', 'Cloud database and REST service (e.g. Django on a cloud server)'],
              ['App', 'Web page or mobile app showing free slots'],
            ],
          },
        },
      ],
      example: {
        title: 'Slot node logic',
        files: [
          {
            name: 'slot_node.py',
            lang: 'text',
            code: `import time
import requests

SLOT_ID = 'B-14'
API = 'https://parking.example.com/api/slots/'

def read_distance_cm():
    ...   # read the ultrasonic sensor (hardware-specific)

while True:
    occupied = read_distance_cm() < 100        # car within 1 m
    requests.put(f'{API}{SLOT_ID}/', json={'occupied': occupied})
    time.sleep(10)`,
          },
        ],
        output: `PUT /api/slots/B-14/  {"occupied": true}
App: Level B — 3 free slots (B-02, B-09, B-21)`,
        explanation: 'Each node only reports its own slot; the cloud combines all reports into the live view. The sensor-reading function depends on the hardware.',
      },
      keyPoints: [
        'Smart parking senses each slot and reports to the cloud.',
        'Ultrasonic sensors detect cars.',
        'Cloud stores live status; apps show free slots.',
        'Many independent nodes + cloud + central monitoring → Level-6.',
      ],
      importantTerms: [
        { term: 'Ultrasonic sensor', meaning: 'Measures distance using sound pulses.' },
        { term: 'Occupancy', meaning: 'Whether a slot currently has a vehicle.' },
      ],
      examPoints: [
        'Explain the purpose and process of smart parking.',
        'Draw the deployment diagram.',
        'State the IoT level and implementation choices.',
      ],
      questions: [
        {
          prompt: 'Explain the smart parking case study for smart cities.',
          plan: CASE_PLAN('smart parking', 'Level-6', 'Slot node reporting occupancy'),
        },
      ],
      keywords: ['smart parking', 'occupancy', 'ultrasonic sensor', 'slot node', 'cloud', 'REST', 'Level-6', 'smart city'],
      remember: [
        { prompt: 'Which sensor detects a car in a slot?', answer: 'An ultrasonic distance sensor.' },
      ],
    },

    // ------------------------------------------------------------------
    environment: {
      difficulty: 'medium',
      intro: 'Environmental case studies: weather monitoring stations, a weather-reporting bot, air pollution monitoring and forest fire detection.',
      definition:
        'The environment case studies design IoT systems that monitor the environment: a **weather monitoring** system collecting temperature, humidity, pressure and light from multiple stations into the cloud, a **weather reporting bot** that posts updates, **air pollution monitoring** using gas sensors, and **forest fire detection** using sensor networks.',
      simpleExplanation: {
        text: 'Weather stations built on Raspberry Pi boards read sensors every minute and send the values to a cloud platform. Dashboards show trends, and a bot can automatically post the latest weather. Pollution and fire systems work similarly with different sensors and alert rules.',
        analogy: 'Many small weather reporters across a region, each sending a message to the same newsroom every minute.',
      },
      visual: {
        type: 'architecture',
        title: 'Weather monitoring deployment (Level-6)',
        layers: [
          { label: 'Applications', note: 'dashboard, alerts, reporting bot' },
          { label: 'Cloud', note: 'storage + analysis + controller', items: ['Datastreams / database', 'Analysis component'] },
          { label: 'End nodes', note: 'independent stations', items: ['Temperature', 'Humidity', 'Pressure', 'Light'] },
        ],
      },
      explanation: [
        { heading: 'Weather monitoring system' },
        {
          list: [
            '**Purpose** — collect environmental data from multiple locations and analyse it in the cloud.',
            '**Process** — each station reads sensors at intervals and sends readings to the cloud; the app shows current and historical values.',
            '**Level** — multiple independent end nodes, cloud storage and analysis, central controller: **Level-6**.',
            '**Implementation** — Raspberry Pi with temperature/humidity, pressure and light sensors; data sent to a cloud platform (the textbook uses Xively) and shown on a web dashboard.',
          ],
        },
        { heading: 'Weather reporting bot' },
        'A program reads the latest values from the weather system and automatically posts a summary to a social network or messaging service at intervals — showing how IoT data can be published to the public.',
        { heading: 'Air pollution monitoring' },
        'Gas sensors (e.g. CO, NO₂) and particulate sensors on nodes report to the cloud; readings above limits trigger alerts and are shown on maps of the area.',
        { heading: 'Forest fire detection' },
        'Many low-power nodes measure temperature, humidity and CO₂ across a forest. A **coordinator** collects their data and sends it to the cloud, where analysis detects fire conditions — the textbook’s **Level-5** example.',
      ],
      example: {
        title: 'Weather station upload',
        files: [
          {
            name: 'weather_station.py',
            lang: 'text',
            code: `import time
import requests

STATION = 'campus-north'
API = 'https://weather.example.com/api/readings/'

def read_sensors():
    # replace with real sensor reads on the Pi
    return {'temperature': 29.4, 'humidity': 63, 'pressure': 1007, 'light': 812}

while True:
    data = read_sensors()
    data['station'] = STATION
    requests.post(API, json=data)
    time.sleep(60)`,
          },
        ],
        output: `POST /api/readings/ {"station": "campus-north", "temperature": 29.4, "humidity": 63, ...}
Dashboard: campus-north 29.4 °C, 63 % RH, 1007 hPa`,
        explanation: 'Every station runs the same program with its own name; the cloud aggregates all stations. Sensor values here are placeholders.',
      },
      keyPoints: [
        'Weather monitoring: multiple stations → cloud → dashboard (Level-6).',
        'Weather bot publishes updates automatically.',
        'Air pollution: gas/particulate sensors with alert thresholds.',
        'Forest fire detection: WSN with coordinator (Level-5).',
      ],
      importantTerms: [
        { term: 'Weather station node', meaning: 'Device that reads weather sensors and sends readings.' },
        { term: 'Reporting bot', meaning: 'Program that publishes data updates automatically.' },
        { term: 'Coordinator node', meaning: 'Collects data from end nodes and sends it onward.' },
      ],
      examPoints: [
        'Describe the weather monitoring system with its level.',
        'Explain the weather bot, air pollution and forest fire systems briefly.',
        'Draw the deployment diagram.',
      ],
      questions: [
        {
          prompt: 'Explain the IoT case study for weather monitoring.',
          plan: CASE_PLAN('weather monitoring', 'Level-6', 'Weather station upload program'),
        },
      ],
      keywords: ['weather monitoring', 'weather station', 'reporting bot', 'air pollution monitoring', 'forest fire detection', 'Level-6', 'Level-5', 'Xively'],
      remember: [
        { prompt: 'Which IoT level is the weather monitoring system?', answer: 'Level-6.' },
      ],
    },

    // ------------------------------------------------------------------
    agriculture: {
      difficulty: 'medium',
      intro: 'The agriculture case study: a smart irrigation system that waters only when the soil needs it.',
      definition:
        'The agriculture case study designs a **smart irrigation** system that measures soil moisture with sensors, switches irrigation on or off automatically based on a threshold, stores readings in the cloud, and lets the farmer monitor and control it through an application.',
      simpleExplanation: {
        text: 'A moisture sensor in the field is read regularly. If the soil is drier than the threshold, the controller turns the pump or valve on; when it is wet enough, it turns it off. Readings go to the cloud so the farmer can see them on a phone.',
        analogy: 'A plant that switches on its own water supply when it feels thirsty.',
      },
      visual: {
        type: 'architecture',
        title: 'Smart irrigation deployment (Level-2)',
        layers: [
          { label: 'Application', note: 'farmer’s web/mobile app' },
          { label: 'Cloud', note: 'stores readings', items: ['Moisture history'] },
          { label: 'Controller (local analysis)', note: 'threshold decision on the device' },
          { label: 'Field devices', items: ['Soil moisture sensor', 'Relay + pump / valve'] },
        ],
      },
      explanation: [
        { heading: 'Design summary' },
        {
          list: [
            '**Purpose** — automate irrigation based on soil moisture and let the farmer monitor it remotely.',
            '**Process** — read moisture periodically; if below threshold switch irrigation on, else off; upload readings.',
            '**Services** — native controller service (decision and actuation); cloud data service; app.',
            '**Level** — single node with **local analysis**, data stored in the **cloud**: **Level-2**.',
            '**Implementation** — Raspberry Pi (or microcontroller) with soil moisture sensor and relay-driven pump/solenoid valve; readings sent to a cloud platform.',
          ],
        },
        { heading: 'Benefits' },
        {
          list: [
            'Saves water and energy.',
            'Prevents over- and under-watering.',
            'Remote monitoring reduces field visits.',
          ],
        },
      ],
      example: {
        title: 'Irrigation controller',
        files: [
          {
            name: 'irrigation.py',
            lang: 'text',
            code: `import time
import requests

THRESHOLD = 30          # percent
API = 'https://farm.example.com/api/moisture/'

def read_moisture():
    ...                 # read the soil sensor (hardware-specific), return percent

def set_pump(on):
    ...                 # drive the relay connected to the pump

while True:
    moisture = read_moisture()
    set_pump(moisture < THRESHOLD)
    requests.post(API, json={'field': 'F1', 'moisture': moisture})
    time.sleep(300)     # every 5 minutes`,
          },
        ],
        output: `moisture 26% → pump ON  (reading stored in cloud)
moisture 34% → pump OFF (reading stored in cloud)`,
        explanation: 'The decision is made locally (Level-2); the cloud keeps the history the farmer sees in the app.',
      },
      keyPoints: [
        'Smart irrigation uses soil moisture thresholds.',
        'Local decision on the device; data stored in the cloud → Level-2.',
        'Relay drives the pump or valve.',
        'Saves water; enables remote monitoring.',
      ],
      importantTerms: [
        { term: 'Soil moisture sensor', meaning: 'Measures the water content of soil.' },
        { term: 'Solenoid valve', meaning: 'Electrically controlled valve for water flow.' },
      ],
      examPoints: [
        'Describe the purpose, process and services of smart irrigation.',
        'State why it is Level-2.',
        'Show the controller logic.',
      ],
      questions: [
        {
          prompt: 'Explain the smart irrigation case study.',
          plan: CASE_PLAN('smart irrigation', 'Level-2', 'Threshold-based irrigation controller'),
        },
      ],
      keywords: ['smart irrigation', 'soil moisture', 'threshold', 'relay', 'pump', 'solenoid valve', 'Level-2', 'cloud'],
      remember: [
        { prompt: 'Why is smart irrigation Level-2?', answer: 'Single node with local analysis, but data stored in the cloud.' },
      ],
    },

    // ------------------------------------------------------------------
    'predictive-applications': {
      difficulty: 'medium',
      intro: 'IoT data is most valuable when it tells you what will happen next — before a machine fails or a river floods.',
      definition:
        'Predictive IoT applications use historical and real-time sensor data with analytics models to **forecast future events or conditions** — such as equipment failure (predictive maintenance), energy demand, or weather and flood levels — so that action can be taken in advance.',
      simpleExplanation: {
        text: 'Collect sensor data over time, learn the patterns that come before an event (with batch tools like Hadoop or Spark), then score new data in real time (with Storm or Spark Streaming) and raise a warning when the pattern appears.',
        analogy: 'A weather forecast for machines and systems: past patterns predict tomorrow’s storm.',
      },
      visual: {
        type: 'process',
        title: 'How a predictive IoT application works',
        steps: [
          { label: 'Collect history', detail: 'sensor data stored in the cloud' },
          { label: 'Build a model (batch)', detail: 'Hadoop / Spark MLlib on historical data' },
          { label: 'Score live data (stream)', detail: 'Storm / Spark Streaming' },
          { label: 'Predict', detail: 'failure risk, demand, level' },
          { label: 'Act early', detail: 'maintenance, alerts, control' },
        ],
      },
      explanation: [
        { heading: 'Examples across domains' },
        {
          table: {
            columns: ['Domain', 'Prediction', 'Data used'],
            rows: [
              ['Industry', 'Machine failure (prognosis)', 'Vibration, temperature, current'],
              ['Energy', 'Demand and equipment faults', 'Smart meter and grid sensor data'],
              ['Environment', 'Floods, air-quality peaks', 'Rainfall, river level, pollution readings'],
              ['Agriculture', 'Irrigation needs, crop stress', 'Soil moisture, weather forecasts'],
              ['Health', 'Health risk from vital-sign trends', 'Wearable readings'],
            ],
          },
        },
        { heading: 'How the Unit V tools fit' },
        '**Hadoop/Spark** train models on months of stored data (batch). **Storm/Spark Streaming** apply the model to each new reading (real time). **Oozie** retrains the model on a schedule. Cloud storage holds the history.',
        { note: 'This topic keeps the wording “Predictive Applications” from the supplied syllabus. The textbook’s corresponding case-study section is titled **“Productivity Applications”** — check your official syllabus copy; that section is summarised below.' },
        {
          more: [
            'In the textbook, the productivity application is an **IoT printer**: a Raspberry Pi connected to a small printer that automatically prints useful information each day — such as the day’s schedule, weather or news fetched from web services — showing how IoT can automate everyday productivity tasks.',
            'It follows the same methodology: purpose (automate daily information printouts), process (fetch data on schedule, format, print), services (controller service on the Pi calling web APIs), and a simple single-node deployment.',
          ],
          label: 'Textbook: Productivity Applications (IoT printer)',
        },
      ],
      example: {
        title: 'Predicting pump failure',
        input: 'A factory has 18 months of pump vibration and temperature data, including 12 past failures.',
        output: `Batch (Spark MLlib): model learns patterns seen in the days before failures
Stream (Storm): each new reading scored → pump P7 risk 0.82
Action: maintenance scheduled for P7 this weekend`,
        explanation: 'History trains the model; live data triggers the warning before the failure. The figures are illustrative.',
      },
      keyPoints: [
        'Predictive applications forecast events from sensor data.',
        'Model building is batch; scoring is real time.',
        'Uses: predictive maintenance, demand forecasting, flood and pollution prediction, health risk.',
        'The textbook’s matching section is Productivity Applications (IoT printer).',
      ],
      importantTerms: [
        { term: 'Predictive maintenance', meaning: 'Maintenance scheduled from predicted failure.' },
        { term: 'Model training', meaning: 'Learning patterns from historical data.' },
        { term: 'Scoring', meaning: 'Applying a trained model to new data.' },
      ],
      examPoints: [
        'Define predictive IoT applications.',
        'Explain the batch-train / stream-score pipeline.',
        'Give examples across domains.',
        'Be ready to describe the textbook’s productivity application (IoT printer) as well.',
      ],
      questions: [
        {
          prompt: 'Explain predictive applications of IoT with an example.',
          plan: ANSWER_PLAN(
            'Applications that forecast events from historical and live sensor data',
            'Collect → train (batch) → score (stream) → predict → act',
            'Domain examples; role of Hadoop, Spark, Storm, Oozie',
            'Pump failure prediction',
            'Act before problems occur',
          ),
        },
      ],
      keywords: ['predictive applications', 'predictive maintenance', 'forecasting', 'model training', 'scoring', 'Spark MLlib', 'Storm', 'productivity applications', 'IoT printer'],
      remember: [
        { prompt: 'Which tools train a predictive model on history?', answer: 'Batch tools such as Hadoop or Spark (MLlib).' },
        { prompt: 'What is the textbook’s matching case-study section called?', answer: 'Productivity Applications (IoT printer).' },
      ],
    },
  },
}
