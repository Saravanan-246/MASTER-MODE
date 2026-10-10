// Data Mining and Data Warehousing — Unit III: Cluster Analysis.
// Topic ids match the syllabus outline in ../subjects.js.
// Textbook context: Han & Kamber, "Data Mining: Concepts and Techniques".
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
    'Unit III is about finding groups in data when no one has labelled it. You learn what cluster analysis needs, how to measure similarity for different kinds of data, and the major families of clustering methods — partitioning (k-means), hierarchical, density-based, grid-based and model-based — plus clustering high-dimensional data, clustering under constraints, and detecting outliers.',

  map: [
    { label: 'Foundations', topics: ['cluster-analysis', 'types-of-data', 'categorization-of-major-clustering-methods'] },
    { label: 'Partitioning', topics: ['k-means', 'partitioning-methods'] },
    { label: 'Other families', topics: ['hierarchical-methods', 'density-based-methods', 'grid-based-methods', 'model-based-methods'] },
    { label: 'Harder settings', topics: ['clustering-high-dimensional-data', 'constraint-based-clustering'] },
    { label: 'Odd ones out', topics: ['outlier-analysis'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'cluster-analysis': {
      difficulty: 'easy',
      intro: 'No labels, no teacher — just data. Clustering finds the natural groups on its own.',
      definition:
        'Cluster analysis (clustering) is the process of grouping a set of data objects into **clusters** so that objects within a cluster are highly **similar** to one another and **dissimilar** to objects in other clusters. It is a form of **unsupervised learning**, because no class labels are given.',
      simpleExplanation: {
        text: 'Give the algorithm customer records without saying who belongs where. It measures how alike the customers are and forms groups — for example budget shoppers, families and premium buyers — that you can then name and target.',
        analogy: 'Sorting a mixed heap of laundry into piles without being told the categories: whites, darks and towels emerge from how similar the items are.',
      },
      visual: {
        type: 'comparison',
        title: 'A good clustering',
        items: [
          { title: 'Within a cluster', tone: 'good', points: ['High intra-cluster similarity', 'Objects are close together', 'Small distances'] },
          { title: 'Between clusters', tone: 'accent', points: ['Low inter-cluster similarity', 'Clusters are far apart', 'Large distances'] },
        ],
      },
      explanation: [
        { heading: 'Clustering vs classification' },
        {
          table: {
            columns: ['', 'Classification', 'Clustering'],
            rows: [
              ['Learning type', 'Supervised', 'Unsupervised'],
              ['Class labels', 'Given in training data', 'Not given'],
              ['Output', 'A model that predicts labels', 'Groups discovered in the data'],
            ],
          },
        },
        { heading: 'Applications' },
        {
          list: [
            '**Market segmentation** — discover customer groups for targeted marketing.',
            '**Biology** — group genes or species with similar features.',
            '**Document and web analysis** — group similar news articles or search results.',
            '**Image processing** — segment an image into regions.',
            '**Outlier detection** — objects far from every cluster may be fraud or errors.',
            '**Preprocessing** — clusters can summarise data for other algorithms.',
          ],
        },
        { heading: 'Requirements of clustering in data mining' },
        {
          list: [
            '**Scalability** to large databases.',
            'Ability to deal with **different types of attributes**.',
            'Discovery of clusters with **arbitrary shape**, not only spheres.',
            '**Minimal domain knowledge** to set input parameters.',
            'Ability to deal with **noisy data** and outliers.',
            '**Incremental clustering** and insensitivity to the order of input.',
            'Ability to handle **high dimensionality**.',
            '**Constraint-based** clustering.',
            '**Interpretability and usability** of the results.',
          ],
        },
      ],
      example: {
        title: 'Customer segmentation',
        input: 'Customers described by (annual spend, visits per month), with no labels.',
        output: `Cluster 1: low spend, few visits     → "occasional"
Cluster 2: medium spend, many visits → "regular families"
Cluster 3: high spend, few visits    → "premium"`,
        explanation: 'The algorithm only forms the groups; people interpret and name them.',
      },
      keyPoints: [
        'Clustering groups similar objects; it is unsupervised.',
        'Good clusters: high intra-cluster, low inter-cluster similarity.',
        'Applications: segmentation, biology, documents, images, outliers.',
        'Requirements: scalability, attribute types, arbitrary shapes, few parameters, noise, high dimensions, constraints, interpretability.',
      ],
      importantTerms: [
        { term: 'Cluster', meaning: 'A collection of data objects similar to one another and dissimilar to others.' },
        { term: 'Unsupervised learning', meaning: 'Learning without predefined class labels.' },
        { term: 'Intra-cluster similarity', meaning: 'Similarity among objects in the same cluster.' },
        { term: 'Inter-cluster similarity', meaning: 'Similarity between objects of different clusters.' },
      ],
      examPoints: [
        'Define cluster analysis and state it is unsupervised.',
        'Contrast clustering with classification.',
        'List applications.',
        'List the requirements of clustering in data mining.',
      ],
      questions: [
        {
          prompt: 'What is cluster analysis? Discuss the requirements of clustering in data mining.',
          plan: ANSWER_PLAN(
            'Grouping objects so that similar ones are together; unsupervised',
            'Within-cluster vs between-cluster similarity',
            'Clustering vs classification; applications; nine requirements',
            'Customer segmentation into three groups',
            'High intra-, low inter-cluster similarity',
          ),
        },
      ],
      keywords: ['cluster', 'clustering', 'unsupervised learning', 'similarity', 'intra-cluster', 'inter-cluster', 'market segmentation', 'scalability', 'arbitrary shape'],
      remember: [
        { prompt: 'Is clustering supervised or unsupervised?', answer: 'Unsupervised.' },
        { prompt: 'What makes a clustering good?', answer: 'High intra-cluster similarity and low inter-cluster similarity.' },
      ],
    },

    // ------------------------------------------------------------------
    'types-of-data': {
      difficulty: 'medium',
      intro: 'To group objects you must measure how different they are — and the formula depends on the type of attribute.',
      definition:
        'Types of data in cluster analysis are the kinds of variables objects can be described by — **interval-scaled**, **binary**, **categorical (nominal)**, **ordinal**, **ratio-scaled** and **mixed** — each with its own way of computing the **dissimilarity** d(i, j) between objects.',
      simpleExplanation: {
        text: 'Clustering algorithms work on a table of objects (data matrix) or on a table of pairwise distances (dissimilarity matrix). Heights can use ordinary distance, yes/no attributes need matching counts, and ranks must be scaled first.',
        analogy: 'Comparing two students: marks differ by a number, “hostel or day scholar” is a yes/no match, and “grade A vs grade C” is an ordered difference.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Variable types and their dissimilarity',
        root: 'Variable types',
        children: [
          { label: 'Interval-scaled', note: 'standardize, then distance', children: ['Euclidean', 'Manhattan', 'Minkowski'] },
          { label: 'Binary', note: 'contingency table', children: ['Symmetric: matching', 'Asymmetric: Jaccard'] },
          { label: 'Categorical', note: 'nominal states', children: ['(p − m) / p'] },
          { label: 'Ordinal', note: 'ranked states', children: ['rank → (r − 1)/(M − 1)'] },
          { label: 'Ratio-scaled', note: 'exponential scale', children: ['log transform'] },
          { label: 'Mixed types', note: 'combine all', children: ['weighted average'] },
        ],
      },
      explanation: [
        { heading: 'Two data structures' },
        {
          table: {
            columns: ['Structure', 'Shape', 'Holds'],
            rows: [
              ['Data matrix (object-by-variable)', 'n × p (two-mode)', 'n objects described by p variables'],
              ['Dissimilarity matrix (object-by-object)', 'n × n (one-mode)', 'd(i, j) for each pair; d(i, i) = 0, symmetric'],
            ],
          },
        },
        { heading: 'Interval-scaled variables' },
        'Continuous measurements such as weight or temperature. **Standardize** first (e.g. z-score using the mean absolute deviation) so units do not dominate, then use a distance:',
        { code: `Euclidean  d(i,j) = √( (xi1 − xj1)² + … + (xip − xjp)² )
Manhattan  d(i,j) = |xi1 − xj1| + … + |xip − xjp|
Minkowski  d(i,j) = ( Σ |xif − xjf|^h )^(1/h)   (h = 1 Manhattan, h = 2 Euclidean)`, lang: 'text' },
        { heading: 'Binary variables' },
        'Count matches between objects i and j: q = both 1, r = i is 1 and j is 0, s = i is 0 and j is 1, t = both 0.',
        {
          list: [
            '**Symmetric** binary (both states equally important, e.g. gender): d = (r + s) / (q + r + s + t).',
            '**Asymmetric** binary (1 is rarer and more important, e.g. test positive): ignore t — **Jaccard** d = (r + s) / (q + r + s).',
          ],
        },
        { heading: 'Categorical, ordinal, ratio-scaled, mixed' },
        {
          list: [
            '**Categorical** (more than two states, e.g. colour): d = (p − m) / p, m = number of matching variables, p = total.',
            '**Ordinal** (ordered states, e.g. bronze < silver < gold): replace by rank r, map to [0, 1] with (r − 1)/(M − 1), then treat as interval-scaled.',
            '**Ratio-scaled** (exponential growth, e.g. bacteria counts): apply a log transform, then treat as interval-scaled.',
            '**Mixed**: compute the dissimilarity for each variable on a common [0, 1] scale and take a weighted average.',
          ],
        },
      ],
      example: {
        title: 'Distance between two points',
        input: 'x₁ = (1, 2), x₂ = (3, 5)',
        output: `Euclidean = √((3 − 1)² + (5 − 2)²) = √(4 + 9) = 3.61
Manhattan = |3 − 1| + |5 − 2| = 2 + 3 = 5`,
        explanation: 'Euclidean is the straight-line distance; Manhattan is the distance along a city grid.',
      },
      keyPoints: [
        'Clustering uses a data matrix (n × p) or a dissimilarity matrix (n × n).',
        'Interval-scaled: standardize, then Euclidean, Manhattan or Minkowski.',
        'Binary: matching coefficient (symmetric) or Jaccard (asymmetric).',
        'Categorical: (p − m)/p; ordinal: rank → [0,1]; ratio-scaled: log.',
        'Mixed types: weighted combination on a common scale.',
      ],
      importantTerms: [
        { term: 'Dissimilarity matrix', meaning: 'n × n table of distances d(i, j) between objects.' },
        { term: 'Euclidean distance', meaning: 'Straight-line distance between two points.' },
        { term: 'Asymmetric binary variable', meaning: 'A binary variable whose two states are not equally important.' },
        { term: 'Jaccard coefficient', meaning: 'Similarity ignoring negative matches (t).' },
      ],
      examPoints: [
        'Explain data matrix and dissimilarity matrix.',
        'Give distance formulas for interval-scaled data with a calculation.',
        'Explain symmetric vs asymmetric binary dissimilarity.',
        'Explain categorical, ordinal, ratio-scaled and mixed types.',
      ],
      questions: [
        {
          prompt: 'Explain the types of data used in cluster analysis and how dissimilarity is computed for each.',
          plan: ANSWER_PLAN(
            'Variable types that describe objects, each with its own dissimilarity measure',
            'Tree of variable types',
            'Data/dissimilarity matrices; interval, binary, categorical, ordinal, ratio, mixed',
            'Euclidean and Manhattan for (1,2), (3,5)',
            'Standardize first; choose the measure by type',
          ),
        },
      ],
      keywords: ['data matrix', 'dissimilarity matrix', 'interval-scaled', 'Euclidean', 'Manhattan', 'Minkowski', 'binary', 'Jaccard', 'categorical', 'ordinal', 'ratio-scaled', 'mixed types'],
      remember: [
        { prompt: 'Minkowski distance with h = 1 is?', answer: 'Manhattan distance.' },
        { prompt: 'Which binary measure ignores negative matches?', answer: 'Jaccard coefficient (asymmetric binary).' },
      ],
    },

    // ------------------------------------------------------------------
    'categorization-of-major-clustering-methods': {
      difficulty: 'easy',
      intro: 'There are hundreds of clustering algorithms, but they fall into a handful of families.',
      definition:
        'Major clustering methods are categorised as **partitioning**, **hierarchical**, **density-based**, **grid-based** and **model-based** methods, with special approaches for **high-dimensional data** and **constraint-based** clustering.',
      simpleExplanation: {
        text: 'Partitioning splits data into k groups; hierarchical builds a tree of groups; density-based grows groups through crowded regions; grid-based works on cells instead of points; model-based fits a statistical or neural model.',
        analogy: 'Different ways to group people in a hall: assign them to k tables (partitioning), merge small groups into bigger ones (hierarchical), find crowded areas (density), divide the floor into tiles (grid), or match them to profiles (model).',
      },
      visual: {
        type: 'hierarchy',
        title: 'Families of clustering methods',
        root: 'Clustering methods',
        children: [
          { label: 'Partitioning', note: 'k groups, iterative', children: ['k-means', 'k-medoids (PAM)', 'CLARA', 'CLARANS'] },
          { label: 'Hierarchical', note: 'tree of clusters', children: ['AGNES', 'DIANA', 'BIRCH', 'ROCK', 'Chameleon'] },
          { label: 'Density-based', note: 'dense regions', children: ['DBSCAN', 'OPTICS', 'DENCLUE'] },
          { label: 'Grid-based', note: 'cells', children: ['STING', 'WaveCluster', 'CLIQUE'] },
          { label: 'Model-based', note: 'fit a model', children: ['EM', 'COBWEB', 'SOM'] },
        ],
      },
      explanation: [
        {
          table: {
            columns: ['Method', 'Basic idea', 'Typical shape / strength'],
            rows: [
              ['Partitioning', 'Divide n objects into k partitions; improve by iterative relocation', 'Spherical clusters; small–medium data'],
              ['Hierarchical', 'Agglomerative (bottom-up merge) or divisive (top-down split)', 'Gives a dendrogram; merges cannot be undone'],
              ['Density-based', 'Grow a cluster while the neighbourhood density exceeds a threshold', 'Arbitrary shapes; filters noise'],
              ['Grid-based', 'Quantize the space into cells; cluster the cells', 'Very fast; depends on number of cells, not objects'],
              ['Model-based', 'Hypothesize a model per cluster and find the best fit', 'Can estimate the number of clusters; handles noise statistically'],
            ],
          },
        },
        { heading: 'Two further categories' },
        {
          list: [
            '**Clustering high-dimensional data** — finds clusters in subspaces when there are dozens or thousands of attributes (CLIQUE, PROCLUS).',
            '**Constraint-based clustering** — incorporates user or application constraints (obstacles, cluster size, must-link).',
          ],
        },
        { note: 'Many algorithms combine ideas from more than one family — CLIQUE is both grid-based and density-based.' },
      ],
      example: {
        title: 'Choosing a family',
        input: 'GPS points of delivery stops along curved roads, with some faulty readings.',
        output: 'Choose a density-based method (e.g. DBSCAN): clusters follow the road shapes and faulty points become noise.',
        explanation: 'k-means would force round clusters and pull centres towards the faulty points.',
      },
      keyPoints: [
        'Five main families: partitioning, hierarchical, density, grid, model.',
        'Plus high-dimensional and constraint-based clustering.',
        'Density-based finds arbitrary shapes; grid-based is fastest.',
        'Hierarchical gives a tree; partitioning needs k.',
      ],
      importantTerms: [
        { term: 'Iterative relocation', meaning: 'Moving objects between clusters to improve the partition.' },
        { term: 'Dendrogram', meaning: 'Tree diagram showing hierarchical merging or splitting.' },
        { term: 'Quantization', meaning: 'Dividing the data space into a finite number of cells.' },
      ],
      examPoints: [
        'List the families with two algorithms each.',
        'Give the basic idea of each family in one line.',
        'Mention high-dimensional and constraint-based clustering.',
      ],
      questions: [
        {
          prompt: 'Explain the categorization of major clustering methods.',
          plan: ANSWER_PLAN(
            'Families of clustering approaches',
            'Tree of five families with algorithms',
            'Idea and strength of each family; high-dimensional and constraint-based',
            'Delivery GPS points → density-based',
            'Pick the method by data shape, size and noise',
          ),
        },
      ],
      keywords: ['partitioning', 'hierarchical', 'density-based', 'grid-based', 'model-based', 'high-dimensional', 'constraint-based', 'k-means', 'DBSCAN', 'STING', 'EM'],
      remember: [
        { prompt: 'Which family finds clusters of arbitrary shape?', answer: 'Density-based methods.' },
        { prompt: 'Which family’s speed depends on the number of cells?', answer: 'Grid-based methods.' },
      ],
    },

    // ------------------------------------------------------------------
    'k-means': {
      difficulty: 'medium',
      intro: 'The most famous clustering algorithm: pick k centres, assign, recompute, repeat.',
      definition:
        'K-means is a centroid-based partitioning algorithm. Given k, it partitions n objects into k clusters so that each object belongs to the cluster with the **nearest mean (centroid)**, iteratively minimising the **sum of squared errors** between objects and their cluster centres.',
      simpleExplanation: {
        text: 'Guess k centres. Put every point with its closest centre. Move each centre to the average of its points. Repeat until nothing changes.',
        analogy: 'Placing k bus stops in a town: each house uses the nearest stop, then each stop moves to the middle of its houses — repeat until the stops settle.',
      },
      visual: {
        type: 'process',
        title: 'The k-means loop',
        steps: [
          { label: 'Choose k', detail: 'number of clusters' },
          { label: 'Pick k initial centres', detail: 'often k random objects' },
          { label: 'Assign each object', detail: 'to the nearest centre' },
          { label: 'Update centres', detail: 'mean of each cluster' },
          { label: 'Repeat until stable', detail: 'no object changes cluster' },
        ],
      },
      explanation: [
        { heading: 'Objective: square-error criterion' },
        { code: 'E = Σ (i = 1..k)  Σ (p ∈ Ci)  |p − mᵢ|²', lang: 'text' },
        'E adds up the squared distance of every object p from the mean mᵢ of its cluster. k-means makes clusters as **compact** and **separate** as possible by reducing E each iteration.',
        { heading: 'Worked example (1-D, k = 2)' },
        'Data: 2, 3, 4, 10, 11, 12, 20, 25, 30. Initial centres m₁ = 3, m₂ = 4.',
        {
          table: {
            columns: ['Iteration', 'Cluster 1', 'Cluster 2', 'New means'],
            rows: [
              ['1', '{2, 3}', '{4, 10, 11, 12, 20, 25, 30}', 'm₁ = 2.5, m₂ = 16'],
              ['2', '{2, 3, 4}', '{10, 11, 12, 20, 25, 30}', 'm₁ = 3, m₂ = 18'],
              ['3', '{2, 3, 4, 10}', '{11, 12, 20, 25, 30}', 'm₁ = 4.75, m₂ = 19.6'],
              ['4', '{2, 3, 4, 10, 11, 12}', '{20, 25, 30}', 'm₁ = 7, m₂ = 25'],
              ['5', '{2, 3, 4, 10, 11, 12}', '{20, 25, 30}', 'No change → stop'],
            ],
          },
        },
        { heading: 'Complexity' },
        'O(nkt) for n objects, k clusters and t iterations. Since k and t are usually much smaller than n, k-means is **efficient and scalable**.',
        { heading: 'Limitations' },
        {
          list: [
            'k must be specified in advance.',
            'Result depends on the initial centres; it often stops at a **local optimum** (run several times).',
            'Sensitive to **noise and outliers** — one extreme value drags a mean.',
            'Only for data where a **mean** is defined (not categorical); **k-modes** handles categorical data.',
            'Not suitable for **non-convex** shapes or clusters of very different sizes.',
          ],
        },
      ],
      example: {
        title: 'Assign a new point',
        input: 'Final centres m₁ = 7 and m₂ = 25. New value 15.',
        output: `|15 − 7| = 8,  |15 − 25| = 10  →  Cluster 1`,
        explanation: 'A new object simply joins the cluster whose centre is nearest.',
      },
      keyPoints: [
        'k-means assigns each object to the nearest cluster mean.',
        'Loop: assign → recompute means → repeat until stable.',
        'Minimises the sum of squared errors E.',
        'Efficient: O(nkt).',
        'Needs k; sensitive to initial centres and outliers; spherical clusters only.',
      ],
      importantTerms: [
        { term: 'Centroid', meaning: 'The mean point of a cluster.' },
        { term: 'Square-error criterion', meaning: 'Sum of squared distances of objects from their cluster centres.' },
        { term: 'Local optimum', meaning: 'A solution better than its neighbours but not necessarily the best overall.' },
        { term: 'k-modes', meaning: 'k-means variant for categorical data using modes.' },
      ],
      examPoints: [
        'Write the algorithm steps.',
        'Write the square-error formula.',
        'Trace a small numeric example until convergence.',
        'List advantages and limitations.',
      ],
      questions: [
        {
          prompt: 'Explain the k-means clustering algorithm with an example.',
          plan: ANSWER_PLAN(
            'Partitioning into k clusters by nearest mean, minimising squared error',
            'Choose k → initial centres → assign → update → repeat',
            'Square-error criterion, complexity O(nkt), limitations',
            '9 values, k = 2, five iterations to {2..12} and {20, 25, 30}',
            'Efficient but needs k and is sensitive to outliers',
          ),
        },
      ],
      keywords: ['k-means', 'centroid', 'cluster mean', 'square-error criterion', 'iterative relocation', 'O(nkt)', 'local optimum', 'k-modes', 'outliers'],
      remember: [
        { prompt: 'When does k-means stop?', answer: 'When no object changes cluster (the means stop moving).' },
        { prompt: 'Why is k-means sensitive to outliers?', answer: 'An extreme value pulls the cluster mean towards it.' },
      ],
    },

    // ------------------------------------------------------------------
    'partitioning-methods': {
      difficulty: 'medium',
      intro: 'k-means uses averages. Its cousins use actual objects as centres, which makes them tougher against outliers.',
      definition:
        'Partitioning methods divide a database of n objects into k partitions (k ≤ n), each a cluster, and improve the partition by **iterative relocation**. Each cluster must contain at least one object and each object must belong to exactly one cluster. Main algorithms: **k-means**, **k-medoids (PAM)**, **CLARA** and **CLARANS**.',
      simpleExplanation: {
        text: 'Start with some partition, then keep moving objects between clusters while it improves the clustering. k-means represents each cluster by its mean; k-medoids represents it by its most central real object (the medoid).',
        analogy: 'Choosing class representatives: k-means picks an imaginary “average student”; k-medoids picks the real student who is most typical of the class.',
      },
      visual: {
        type: 'comparison',
        title: 'k-means vs k-medoids',
        items: [
          { title: 'k-means', tone: 'muted', points: ['Centre = mean (may not be a real object)', 'Sensitive to outliers', 'Fast: O(nkt)', 'Numeric data only'] },
          { title: 'k-medoids (PAM)', tone: 'accent', points: ['Centre = medoid (a real object)', 'Robust to noise and outliers', 'Costlier: O(k(n − k)²) per iteration', 'Any dissimilarity measure'] },
        ],
      },
      explanation: [
        { heading: 'General properties' },
        {
          list: [
            'k must be given by the user.',
            'Creates an initial partition, then improves it by moving objects.',
            'Finds the global optimum only by trying all partitions — impossible — so heuristics (k-means, k-medoids) are used.',
            'Works well for **spherical** clusters in small to medium databases.',
          ],
        },
        { heading: 'k-medoids: PAM (Partitioning Around Medoids)' },
        {
          list: [
            'Pick k objects as initial **medoids**.',
            'Assign each remaining object to the nearest medoid.',
            'Randomly select a non-medoid object o_random.',
            'Compute the total **swapping cost** S of replacing a medoid o_j with o_random.',
            'If S < 0 (the clustering improves), swap. Repeat until no change.',
          ],
          ordered: true,
        },
        { heading: 'Scaling up k-medoids' },
        {
          table: {
            columns: ['Algorithm', 'Idea', 'Trade-off'],
            rows: [
              ['PAM', 'Tries swaps over the whole data set', 'Accurate but slow for large n'],
              ['CLARA (Clustering LARge Applications)', 'Applies PAM to several random samples, keeps the best', 'Fast; quality depends on the samples'],
              ['CLARANS (CLARA based on RANdomized Search)', 'Randomly searches neighbouring solutions instead of all swaps', 'Better balance of quality and speed'],
            ],
          },
        },
        { tip: 'Use k-medoids when the data has outliers or only a dissimilarity matrix is available; use k-means for large numeric data.' },
      ],
      example: {
        title: 'Effect of an outlier',
        input: 'Cluster values: 2, 3, 4, 5, 100',
        output: `k-means centre (mean)    = 22.8   ← pulled away by 100
k-medoids centre (medoid) = 4      ← stays with the real group`,
        explanation: 'The medoid is the object with the smallest total distance to the others, so a single outlier barely moves it.',
      },
      keyPoints: [
        'Partitioning: k clusters, each object in exactly one, improved by relocation.',
        'k-means uses the mean; k-medoids uses a real central object.',
        'PAM swaps medoids when the total cost decreases.',
        'CLARA samples; CLARANS uses randomized search for large data.',
        'k-medoids is more robust to outliers but slower.',
      ],
      importantTerms: [
        { term: 'Medoid', meaning: 'The most centrally located real object in a cluster.' },
        { term: 'PAM', meaning: 'Partitioning Around Medoids — the basic k-medoids algorithm.' },
        { term: 'CLARA', meaning: 'Clustering LARge Applications — PAM on samples.' },
        { term: 'CLARANS', meaning: 'Randomized-search k-medoids for large data.' },
      ],
      examPoints: [
        'Define partitioning methods and their conditions.',
        'Compare k-means and k-medoids.',
        'Write the PAM steps with swapping cost.',
        'Explain CLARA and CLARANS.',
      ],
      questions: [
        {
          prompt: 'Explain partitioning methods of clustering. Compare k-means and k-medoids.',
          plan: ANSWER_PLAN(
            'Divide n objects into k clusters and improve by iterative relocation',
            'k-means vs k-medoids comparison',
            'Properties; PAM steps; CLARA; CLARANS',
            'Outlier example: mean 22.8 vs medoid 4',
            'Medoids robust; means fast',
          ),
        },
      ],
      keywords: ['partitioning', 'iterative relocation', 'k-means', 'k-medoids', 'medoid', 'PAM', 'swapping cost', 'CLARA', 'CLARANS'],
      remember: [
        { prompt: 'Is a medoid always a real data object?', answer: 'Yes.' },
        { prompt: 'Which algorithm applies PAM to samples?', answer: 'CLARA.' },
      ],
    },

    // ------------------------------------------------------------------
    'hierarchical-methods': {
      difficulty: 'medium',
      intro: 'Instead of one flat set of groups, hierarchical clustering builds a whole family tree of clusters.',
      definition:
        'A hierarchical clustering method groups data objects into a **tree of clusters** (dendrogram). **Agglomerative** (bottom-up) methods start with each object as its own cluster and merge the closest clusters; **divisive** (top-down) methods start with one cluster and split it.',
      simpleExplanation: {
        text: 'Agglomerative: everyone starts alone, then the two closest groups join, again and again, until one big group remains. Cut the tree at any level to get the number of clusters you want.',
        analogy: 'A family tree read upwards: individuals → families → clans → one community.',
      },
      visual: {
        type: 'process',
        title: 'AGNES merging five objects',
        steps: [
          { label: '{a} {b} {c} {d} {e}', detail: 'step 0: every object alone' },
          { label: '{a, b} {c} {d} {e}', detail: 'a and b are closest' },
          { label: '{a, b} {c} {d, e}', detail: 'merge d and e' },
          { label: '{a, b} {c, d, e}', detail: 'c joins {d, e}' },
          { label: '{a, b, c, d, e}', detail: 'one cluster — DIANA runs these steps in reverse' },
        ],
      },
      explanation: [
        { heading: 'Agglomerative vs divisive' },
        {
          table: {
            columns: ['', 'Agglomerative (AGNES)', 'Divisive (DIANA)'],
            rows: [
              ['Direction', 'Bottom-up: merge', 'Top-down: split'],
              ['Starts with', 'n singleton clusters', 'One cluster of all objects'],
              ['Ends when', 'One cluster or a stopping condition', 'Each object alone or a stopping condition'],
            ],
          },
        },
        { heading: 'Distance between clusters' },
        {
          list: [
            '**Minimum distance (single link)** — closest pair of objects. Can create long chains.',
            '**Maximum distance (complete link)** — farthest pair. Gives compact clusters.',
            '**Mean distance** — distance between cluster means.',
            '**Average distance** — average over all pairs.',
          ],
        },
        { heading: 'Weaknesses' },
        {
          list: [
            'A merge or split **cannot be undone**, so an early bad decision stays.',
            'Poor **scalability**: at least O(n²) distance computations.',
          ],
        },
        { heading: 'Improved hierarchical methods' },
        {
          table: {
            columns: ['Algorithm', 'Key idea'],
            rows: [
              ['BIRCH', 'Builds a CF-tree of **clustering features** CF = (n, LS, SS) in one scan; scalable'],
              ['ROCK', 'Uses **links** (shared neighbours) for categorical data'],
              ['Chameleon', 'Merges clusters by **dynamic modelling** of interconnectivity and closeness on a k-nearest-neighbour graph'],
            ],
          },
        },
      ],
      example: {
        title: 'Single link on five points',
        input: 'Points on a line: a = 1, b = 2, c = 6, d = 9, e = 10',
        output: `Closest pair a–b (1) and d–e (1) → {a,b}, {d,e}
Next: c to {d,e} = 3, c to {a,b} = 4 → {c,d,e}
Finally: {a,b} + {c,d,e} → one cluster`,
        explanation: 'Each step merges the two clusters with the smallest single-link distance; cutting before the last step gives two clusters.',
      },
      keyPoints: [
        'Hierarchical clustering builds a dendrogram.',
        'Agglomerative (AGNES) merges; divisive (DIANA) splits.',
        'Cluster distance: single, complete, mean or average link.',
        'Merges/splits are irreversible; scalability is poor.',
        'BIRCH, ROCK and Chameleon improve quality or scalability.',
      ],
      importantTerms: [
        { term: 'Dendrogram', meaning: 'Tree showing how clusters merge or split at each level.' },
        { term: 'AGNES', meaning: 'AGglomerative NESting — bottom-up clustering.' },
        { term: 'DIANA', meaning: 'DIvisive ANAlysis — top-down clustering.' },
        { term: 'Clustering feature (CF)', meaning: 'BIRCH summary (n, linear sum, square sum) of a sub-cluster.' },
      ],
      examPoints: [
        'Define hierarchical clustering; draw the merge steps.',
        'Compare agglomerative and divisive.',
        'List the four inter-cluster distance measures.',
        'State weaknesses and name BIRCH, ROCK, Chameleon.',
      ],
      questions: [
        {
          prompt: 'Explain agglomerative and divisive hierarchical clustering with a diagram.',
          plan: ANSWER_PLAN(
            'Building a tree of clusters by merging or splitting',
            'AGNES merge steps / dendrogram for a–e',
            'Agglomerative vs divisive; linkage measures; weaknesses; BIRCH, ROCK, Chameleon',
            'Single link on five points',
            'Irreversible steps; O(n²)',
          ),
        },
      ],
      keywords: ['hierarchical clustering', 'dendrogram', 'agglomerative', 'divisive', 'AGNES', 'DIANA', 'single link', 'complete link', 'BIRCH', 'ROCK', 'Chameleon'],
      remember: [
        { prompt: 'Which approach is bottom-up?', answer: 'Agglomerative (AGNES).' },
        { prompt: 'What does BIRCH store in its tree?', answer: 'Clustering features (n, LS, SS).' },
      ],
    },

    // ------------------------------------------------------------------
    'density-based-methods': {
      difficulty: 'hard',
      intro: 'Clusters in real data are often snake-shaped or curved. Density-based methods follow the crowd wherever it goes.',
      definition:
        'Density-based clustering methods grow a cluster as long as the **density** (number of objects) in the neighbourhood exceeds a threshold. They discover clusters of **arbitrary shape** and treat sparse points as **noise**. Main algorithms: **DBSCAN**, **OPTICS** and **DENCLUE**.',
      simpleExplanation: {
        text: 'DBSCAN looks at a small circle of radius ε around each point. If at least MinPts points are inside, the point is in a dense area. Dense areas that touch are chained into one cluster; isolated points are noise.',
        analogy: 'Spotting crowds at a festival from above: wherever people stand close together forms a crowd, whatever its shape; people standing alone are not part of any crowd.',
      },
      visual: {
        type: 'comparison',
        title: 'Three kinds of point in DBSCAN',
        items: [
          { title: 'Core point', tone: 'good', points: ['≥ MinPts points within ε', 'Inside a dense region', 'Expands the cluster'] },
          { title: 'Border point', tone: 'muted', points: ['< MinPts within ε', 'Within ε of a core point', 'Joins that cluster'] },
          { title: 'Noise point', tone: 'bad', points: ['Not core, not border', 'Not density-reachable', 'Left out of all clusters'] },
        ],
      },
      explanation: [
        { heading: 'DBSCAN definitions' },
        {
          list: [
            '**ε-neighbourhood** — objects within radius ε of an object.',
            '**Core object** — its ε-neighbourhood holds at least **MinPts** objects.',
            '**Directly density-reachable** — p is in the ε-neighbourhood of a core object q.',
            '**Density-reachable** — reachable through a chain of directly density-reachable objects.',
            '**Density-connected** — p and q are both density-reachable from some object o.',
            'A **cluster** is a maximal set of density-connected objects.',
          ],
        },
        { heading: 'DBSCAN algorithm' },
        {
          list: [
            'Pick an unvisited object p and find its ε-neighbourhood.',
            'If p is a core object, start a new cluster and add all density-reachable objects.',
            'If not, mark p as noise for now (it may later become a border point).',
            'Repeat until every object is visited.',
          ],
          ordered: true,
        },
        'Complexity is O(n log n) with a spatial index, O(n²) without.',
        { heading: 'OPTICS and DENCLUE' },
        {
          list: [
            '**OPTICS** (Ordering Points To Identify the Clustering Structure) — DBSCAN depends heavily on ε and MinPts. OPTICS produces an **ordering** of objects with core-distance and reachability-distance, from which clusters for many parameter settings can be read.',
            '**DENCLUE** (DENsity-based CLUstEring) — models the overall density as a sum of **influence functions** of each object; clusters form around **density attractors** (local maxima). Has a solid mathematical basis and handles noise well.',
          ],
        },
        { tip: 'Choose density-based clustering when clusters are non-spherical or the data contains noise, and you do not want to fix k in advance.' },
      ],
      example: {
        title: 'Classify points with ε = 1, MinPts = 3',
        input: 'Point A has 4 neighbours within 1 unit; B has 2 neighbours, one of which is A; C has no neighbours.',
        output: `A → core point
B → border point (in A's neighbourhood)
C → noise`,
        explanation: 'MinPts counts the point itself in many texts; whichever convention is used, apply it consistently.',
      },
      keyPoints: [
        'Clusters are dense regions separated by sparse regions.',
        'DBSCAN parameters: ε (radius) and MinPts.',
        'Core, border and noise points; clusters are maximal density-connected sets.',
        'Finds arbitrary shapes and does not need k.',
        'OPTICS orders points; DENCLUE uses density functions.',
      ],
      importantTerms: [
        { term: 'ε-neighbourhood', meaning: 'All objects within distance ε of an object.' },
        { term: 'MinPts', meaning: 'Minimum number of objects for a neighbourhood to be dense.' },
        { term: 'Density-reachable', meaning: 'Reachable through a chain of core objects.' },
        { term: 'Density attractor', meaning: 'Local maximum of the density function in DENCLUE.' },
      ],
      examPoints: [
        'Define density-based clustering.',
        'Define ε-neighbourhood, core object, density-reachable, density-connected.',
        'Write the DBSCAN algorithm.',
        'Explain OPTICS and DENCLUE briefly.',
      ],
      questions: [
        {
          prompt: 'Explain DBSCAN, a density-based clustering method.',
          plan: ANSWER_PLAN(
            'Clusters as dense regions; DBSCAN uses ε and MinPts',
            'Core, border and noise points',
            'Definitions; algorithm steps; complexity; OPTICS; DENCLUE',
            'Classify A, B, C with ε = 1, MinPts = 3',
            'Arbitrary shapes, handles noise, no k',
          ),
        },
      ],
      keywords: ['density-based', 'DBSCAN', 'ε-neighbourhood', 'MinPts', 'core object', 'border point', 'noise', 'density-reachable', 'density-connected', 'OPTICS', 'DENCLUE'],
      remember: [
        { prompt: 'What are DBSCAN’s two parameters?', answer: 'ε (radius) and MinPts.' },
        { prompt: 'Which method orders points to show clustering for many ε values?', answer: 'OPTICS.' },
      ],
    },

    // ------------------------------------------------------------------
    'grid-based-methods': {
      difficulty: 'medium',
      intro: 'Why compare millions of points when you can count them in a few thousand grid cells?',
      definition:
        'Grid-based clustering methods **quantize** the object space into a finite number of **cells** forming a grid structure, and perform all clustering operations on the grid. Their processing time depends on the number of cells, not the number of objects. Examples: **STING**, **WaveCluster** and **CLIQUE**.',
      simpleExplanation: {
        text: 'Lay a grid over the data, count how many objects fall in each cell and store a few statistics. Dense neighbouring cells are joined into clusters — the individual points are never compared directly.',
        analogy: 'A city population map divided into wards: you find crowded areas by looking at ward counts, not by locating every person.',
      },
      visual: {
        type: 'process',
        title: 'Grid-based clustering',
        steps: [
          { label: 'Divide the space into cells', detail: 'a grid, possibly at several resolutions' },
          { label: 'Compute cell statistics', detail: 'count, mean, standard deviation, min, max' },
          { label: 'Mark dense cells', detail: 'count above a threshold' },
          { label: 'Join adjacent dense cells', detail: 'connected cells form a cluster' },
        ],
      },
      explanation: [
        { heading: 'STING (STatistical INformation Grid)' },
        {
          list: [
            'Divides the space into rectangular cells at **several levels of resolution** — a hierarchy where each cell is split into smaller cells at the next level.',
            'Each cell stores statistics: **count, mean, standard deviation, min, max** and the type of distribution.',
            'Queries are answered top-down, checking only relevant cells.',
            '✓ Very fast (one scan to build, O(g) to query for g cells), query-independent, easy to update incrementally.',
            '✗ Cluster boundaries are only horizontal or vertical — no diagonal edges.',
          ],
        },
        { heading: 'WaveCluster' },
        'Treats the grid as a multidimensional signal and applies a **wavelet transform**. Dense regions stand out in the transformed space at different scales. It handles noise well, finds arbitrary shapes and is insensitive to input order.',
        { heading: 'CLIQUE' },
        'Both grid-based and density-based; designed for high-dimensional data. It finds dense cells in subspaces (see Clustering High-Dimensional Data).',
        {
          table: {
            columns: ['Advantage', 'Disadvantage'],
            rows: [
              ['Fast: independent of number of objects', 'Quality depends on grid cell size'],
              ['Easy parallel and incremental processing', 'Cells may cut through natural clusters'],
            ],
          },
        },
      ],
      example: {
        title: 'Counting cells',
        input: '1,000,000 customer locations on a 100 × 100 grid (10,000 cells), density threshold = 300.',
        output: `Cells with count ≥ 300 → dense
Adjacent dense cells → 4 connected regions → 4 clusters`,
        explanation: 'After one pass to fill the counts, the algorithm works on 10,000 cells instead of a million points.',
      },
      keyPoints: [
        'Grid-based methods quantize space into cells.',
        'Speed depends on number of cells, not objects.',
        'STING: multi-resolution cells with statistics.',
        'WaveCluster: wavelet transform of the grid.',
        'CLIQUE: grid + density for high-dimensional data.',
      ],
      importantTerms: [
        { term: 'Quantization', meaning: 'Dividing a continuous space into a finite number of cells.' },
        { term: 'STING', meaning: 'STatistical INformation Grid — hierarchical grid with cell statistics.' },
        { term: 'Wavelet transform', meaning: 'Signal-processing method that highlights dense regions at multiple scales.' },
      ],
      examPoints: [
        'Define grid-based clustering and its main advantage.',
        'Explain STING with its cell statistics and hierarchy.',
        'Explain WaveCluster briefly; mention CLIQUE.',
      ],
      questions: [
        {
          prompt: 'Explain grid-based clustering methods with reference to STING.',
          plan: ANSWER_PLAN(
            'Clustering on a grid of cells rather than on objects',
            'Divide → statistics → dense cells → join',
            'STING hierarchy and statistics; WaveCluster; CLIQUE; pros and cons',
            '1 million points on a 10,000-cell grid',
            'Fast; quality depends on cell size',
          ),
        },
      ],
      keywords: ['grid-based', 'quantization', 'cell', 'STING', 'multi-resolution', 'cell statistics', 'WaveCluster', 'wavelet transform', 'CLIQUE'],
      remember: [
        { prompt: 'What does processing time of grid methods depend on?', answer: 'The number of cells.' },
        { prompt: 'Name a limitation of STING.', answer: 'Cluster boundaries are only horizontal or vertical.' },
      ],
    },

    // ------------------------------------------------------------------
    'model-based-methods': {
      difficulty: 'hard',
      intro: 'Model-based clustering assumes the data was generated by a mix of hidden sources — and tries to recover them.',
      definition:
        'Model-based clustering methods hypothesize a **model** for each cluster and find the best fit of the data to that model. They assume the data is generated by a mixture of underlying probability distributions. Main approaches: the **statistical** approach (**EM**), **conceptual clustering** (**COBWEB**) and the **neural network** approach (**SOM**).',
      simpleExplanation: {
        text: 'Instead of just measuring distances, the method asks: which set of, say, bell-shaped curves would most likely have produced this data? Each curve is a cluster, and each object belongs to each cluster with some probability.',
        analogy: 'Hearing a mixed recording of three singers and working out each singer’s voice and who sang which notes.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Model-based approaches',
        root: 'Model-based clustering',
        children: [
          { label: 'Statistical', note: 'mixture of distributions', children: ['EM algorithm'] },
          { label: 'Conceptual clustering', note: 'clusters + descriptions', children: ['COBWEB'] },
          { label: 'Neural network', note: 'competitive learning', children: ['SOM'] },
        ],
      },
      explanation: [
        { heading: 'EM (Expectation–Maximization)' },
        'An extension of k-means where each cluster is a probability distribution (e.g. Gaussian) with parameters such as mean and variance. Objects get **probabilities of membership** rather than a hard assignment (soft clustering).',
        {
          list: [
            '**Initialise** the parameters of each distribution (e.g. random means).',
            '**E-step (Expectation)** — compute the probability that each object belongs to each cluster.',
            '**M-step (Maximization)** — re-estimate the parameters to maximise the likelihood of the data given those probabilities.',
            'Repeat until the parameters stop changing.',
          ],
          ordered: true,
        },
        { heading: 'Conceptual clustering: COBWEB' },
        'Conceptual clustering finds clusters **and** a characteristic description (concept) for each. **COBWEB** builds a **classification tree** incrementally; each node holds a concept with probabilities of attribute values. It places each new object by maximizing **category utility**, using four operations: add to an existing class, create a new class, merge two classes, or split a class.',
        { heading: 'Neural network approach: SOM' },
        '**Self-Organizing feature Maps** (Kohonen maps) use **competitive learning**: units on a 2-D grid compete for each input; the winning unit and its neighbours adjust their weights towards the input. Similar objects end up mapped to nearby units, giving a 2-D visual map of high-dimensional data.',
        {
          table: {
            columns: ['Approach', 'Cluster represented by', 'Assignment'],
            rows: [
              ['EM', 'Probability distribution', 'Soft (probabilities)'],
              ['COBWEB', 'Concept node in a tree', 'Hard, incremental'],
              ['SOM', 'Unit (neuron) on a 2-D map', 'Winner unit'],
            ],
          },
        },
      ],
      example: {
        title: 'Soft assignment by EM',
        input: 'Heights of students (cm) modelled as a mixture of two Gaussians.',
        output: `Cluster A: mean 156, Cluster B: mean 172
Height 165 → P(A) = 0.45, P(B) = 0.55`,
        explanation: 'Unlike k-means, EM does not force 165 cm into one cluster; it records how likely each cluster is. The numbers here are illustrative.',
      },
      keyPoints: [
        'Model-based methods fit data to a mathematical model.',
        'EM: E-step computes memberships, M-step re-estimates parameters.',
        'EM gives soft (probabilistic) clustering.',
        'COBWEB builds a classification tree using category utility.',
        'SOM uses competitive learning on a 2-D grid.',
      ],
      importantTerms: [
        { term: 'Mixture model', meaning: 'Data assumed to come from several probability distributions.' },
        { term: 'EM algorithm', meaning: 'Iterative Expectation–Maximization for estimating model parameters.' },
        { term: 'Category utility', meaning: 'Measure COBWEB uses to judge the quality of a partition.' },
        { term: 'Competitive learning', meaning: 'Neurons compete; only the winner (and neighbours) learn.' },
      ],
      examPoints: [
        'Define model-based clustering.',
        'Explain the EM steps.',
        'Explain COBWEB and its four operations.',
        'Explain SOM and competitive learning.',
      ],
      questions: [
        {
          prompt: 'Explain model-based clustering methods.',
          plan: ANSWER_PLAN(
            'Fit data to a hypothesized model for each cluster',
            'Tree: statistical (EM), conceptual (COBWEB), neural (SOM)',
            'EM E-step/M-step; COBWEB classification tree and category utility; SOM competitive learning',
            'Height 165 cm with soft membership',
            'Probabilistic, can describe clusters',
          ),
        },
      ],
      keywords: ['model-based', 'mixture model', 'EM', 'expectation', 'maximization', 'soft clustering', 'conceptual clustering', 'COBWEB', 'category utility', 'SOM', 'competitive learning'],
      remember: [
        { prompt: 'What does the E-step compute?', answer: 'The probability of each object belonging to each cluster.' },
        { prompt: 'Which method builds a classification tree incrementally?', answer: 'COBWEB.' },
      ],
    },

    // ------------------------------------------------------------------
    'clustering-high-dimensional-data': {
      difficulty: 'hard',
      intro: 'With hundreds of attributes, every point looks equally far from every other. Clustering needs a new strategy.',
      definition:
        'Clustering high-dimensional data means finding clusters when objects have many attributes (tens to thousands). Because of the **curse of dimensionality**, methods look for clusters in **subspaces** — small subsets of attributes. Approaches include **subspace clustering (CLIQUE)**, **projected clustering (PROCLUS)** and **frequent pattern–based clustering**.',
      simpleExplanation: {
        text: 'Two documents may share only a handful of the 10,000 words in the vocabulary. Comparing them on all 10,000 dimensions hides the similarity. Instead, find the few dimensions in which a group of objects is close together.',
        analogy: 'Students look different overall, but cluster clearly if you look only at “sports played” and “hostel block”.',
      },
      visual: {
        type: 'process',
        title: 'CLIQUE: dense units, bottom-up',
        steps: [
          { label: 'Partition each dimension', detail: 'into equal-length intervals → units' },
          { label: 'Find dense 1-D units', detail: 'fraction of points above a threshold' },
          { label: 'Combine Apriori-style', detail: 'dense k-D units only from dense (k−1)-D units' },
          { label: 'Connect dense units', detail: 'clusters in each subspace' },
          { label: 'Describe clusters', detail: 'minimal DNF expressions' },
        ],
      },
      explanation: [
        { heading: 'Why high dimensions are hard' },
        {
          list: [
            'Many attributes are **irrelevant** and hide the clusters.',
            'Data becomes **sparse**; distances between objects become almost equal (the **curse of dimensionality**).',
            'Different clusters may exist in **different subspaces**.',
          ],
        },
        { heading: 'Feature transformation vs feature selection' },
        '**Feature transformation** (e.g. PCA) creates fewer new attributes but does not remove irrelevant ones and produces hard-to-interpret clusters. **Feature selection** keeps the most relevant original attributes. Subspace clustering extends selection by searching many subspaces.',
        { heading: 'Main approaches' },
        {
          table: {
            columns: ['Approach', 'Algorithm', 'How it works'],
            rows: [
              ['Dimension-growth subspace clustering', 'CLIQUE', 'Bottom-up: grows dense units from 1-D to higher-D using the Apriori property'],
              ['Dimension-reduction projected clustering', 'PROCLUS', 'Top-down: k-medoid-style; finds a subset of dimensions for each cluster'],
              ['Frequent pattern–based clustering', 'pCluster, text clustering', 'Uses frequent itemsets (e.g. sets of words) to define clusters'],
            ],
          },
        },
        { tip: 'CLIQUE’s key insight: if a region is dense in k dimensions, its projection is dense in every (k − 1)-dimensional subspace — the same idea as the Apriori property.' },
      ],
      example: {
        title: 'Subspace clusters',
        input: 'Employees described by 50 attributes. A group of 200 are similar only in (age 25–30, salary 4–6 lakh).',
        output: 'CLIQUE reports a cluster in the 2-D subspace {age, salary}: “age 25–30 AND salary 4–6 lakh”.',
        explanation: 'Across all 50 attributes these employees look scattered; in the right 2-D subspace they form a tight, describable cluster.',
      },
      keyPoints: [
        'Curse of dimensionality: sparse data, distances lose meaning.',
        'Clusters often exist only in subspaces.',
        'CLIQUE: bottom-up dense units, Apriori-like, grid + density.',
        'PROCLUS: top-down projected clustering with medoids.',
        'Frequent pattern–based clustering uses frequent itemsets.',
      ],
      importantTerms: [
        { term: 'Curse of dimensionality', meaning: 'Problems that arise as the number of dimensions grows: sparsity, meaningless distances.' },
        { term: 'Subspace', meaning: 'A subset of the attributes.' },
        { term: 'Dense unit', meaning: 'A grid cell holding more than a threshold fraction of points.' },
        { term: 'Projected clustering', meaning: 'Assigning each cluster its own relevant subset of dimensions.' },
      ],
      examPoints: [
        'Explain why high-dimensional clustering is difficult.',
        'Contrast feature transformation and feature selection.',
        'Explain CLIQUE steps; outline PROCLUS and frequent pattern–based clustering.',
      ],
      questions: [
        {
          prompt: 'What are the challenges of clustering high-dimensional data? Explain CLIQUE.',
          plan: ANSWER_PLAN(
            'Clustering objects with many attributes by searching subspaces',
            'CLIQUE bottom-up steps',
            'Curse of dimensionality; transformation vs selection; CLIQUE, PROCLUS, frequent-pattern methods',
            'Employee cluster in {age, salary}',
            'Apriori-like pruning makes CLIQUE efficient',
          ),
        },
      ],
      keywords: ['high-dimensional', 'curse of dimensionality', 'subspace clustering', 'CLIQUE', 'dense unit', 'PROCLUS', 'projected clustering', 'frequent pattern-based clustering', 'feature selection'],
      remember: [
        { prompt: 'Is CLIQUE bottom-up or top-down?', answer: 'Bottom-up (dimension-growth).' },
        { prompt: 'What happens to distances in very high dimensions?', answer: 'They become nearly equal, so similarity is hard to measure.' },
      ],
    },

    // ------------------------------------------------------------------
    'constraint-based-clustering': {
      difficulty: 'medium',
      intro: 'Real applications come with rules: clusters cannot cross a river, each branch needs enough customers. Constraint-based clustering respects them.',
      definition:
        'Constraint-based clustering finds clusters that satisfy **user-specified** or **application-oriented constraints**, such as constraints on the objects to cluster, on clustering parameters, on distance functions, on cluster properties, or semi-supervised hints.',
      simpleExplanation: {
        text: 'Plain clustering only looks at the data. Constraint-based clustering also follows rules the user gives — like “each cluster must have at least 100 customers” or “these two objects must be in the same cluster”.',
        analogy: 'Dividing students into project teams, but with rules: at least four per team, and two friends must not be in the same team.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Kinds of constraints',
        root: 'Constraints',
        children: [
          { label: 'On individual objects', children: ['Cluster only high-value customers'] },
          { label: 'On clustering parameters', children: ['Number of clusters k'] },
          { label: 'On distance functions', children: ['Obstacles: rivers, highways'] },
          { label: 'On cluster properties', children: ['≥ 100 customers per cluster'] },
          { label: 'Semi-supervised', children: ['must-link', 'cannot-link'] },
        ],
      },
      explanation: [
        { heading: 'The five types of constraints' },
        {
          list: [
            '**Constraints on individual objects** — select which objects to cluster, e.g. only houses worth over Rs. 1 crore. Handled by preprocessing (a selection query).',
            '**Constraints on the selection of clustering parameters** — e.g. the desired number of clusters k, or ε and MinPts in DBSCAN.',
            '**Constraints on distance functions** — e.g. weighting attributes differently, or measuring walking distance around **obstacles**.',
            '**User-specified constraints on the properties of clusters** — e.g. each cluster must contain at least 100 customers, or total income above a value.',
            '**Semi-supervised clustering** — a few labels or pairwise hints: **must-link** (two objects in the same cluster) and **cannot-link** (in different clusters).',
          ],
        },
        { heading: 'Clustering with obstacles' },
        'When choosing ATM locations, a river or a highway with no crossing means two places close “as the crow flies” may be far apart for customers. Distance is replaced by **obstructed distance** (shortest path around obstacles), computed for example with a visibility graph.',
        { heading: 'Clustering with user-specified constraints' },
        'A cluster that violates a constraint (e.g. too few customers) may be merged with a neighbour or its objects moved, which turns clustering into a constrained optimisation problem. Algorithms often use micro-clusters to make this efficient.',
        { tip: 'Constraint-based clustering makes results **useful**: an unconstrained solution may be mathematically good but impossible to act on.' },
      ],
      example: {
        title: 'Placing bank ATMs',
        input: 'Customer locations in a city, with a river and a highway; each ATM should serve at least 500 customers.',
        output: `Distance constraint: obstructed distance around river/highway
Property constraint: clusters with < 500 customers are merged
Result: ATM sites = centres of the constrained clusters`,
        explanation: 'Both a distance constraint and a cluster-property constraint shape the final clusters.',
      },
      keyPoints: [
        'Constraint-based clustering adds user or application constraints.',
        'Five types: objects, parameters, distance functions, cluster properties, semi-supervision.',
        'Obstacles replace straight-line distance with obstructed distance.',
        'Must-link and cannot-link are semi-supervised constraints.',
      ],
      importantTerms: [
        { term: 'Obstructed distance', meaning: 'Shortest path distance that goes around obstacles.' },
        { term: 'Must-link constraint', meaning: 'Two objects must be in the same cluster.' },
        { term: 'Cannot-link constraint', meaning: 'Two objects must be in different clusters.' },
        { term: 'Semi-supervised clustering', meaning: 'Clustering guided by a small amount of user knowledge.' },
      ],
      examPoints: [
        'Define constraint-based clustering.',
        'Explain the five constraint types with examples.',
        'Explain clustering with obstacles (ATM example).',
      ],
      questions: [
        {
          prompt: 'What is constraint-based clustering? Explain the various types of constraints.',
          plan: ANSWER_PLAN(
            'Clustering that satisfies user or application constraints',
            'Tree of five constraint types',
            'Each constraint type; obstacles and obstructed distance; cluster-property constraints',
            'ATM placement with river and minimum customers',
            'Makes clusters actionable',
          ),
        },
      ],
      keywords: ['constraint-based clustering', 'user-specified constraints', 'obstacles', 'obstructed distance', 'must-link', 'cannot-link', 'semi-supervised clustering'],
      remember: [
        { prompt: 'Name two semi-supervised constraints.', answer: 'Must-link and cannot-link.' },
        { prompt: 'Which constraint type handles rivers and highways?', answer: 'Constraints on distance functions (clustering with obstacles).' },
      ],
    },

    // ------------------------------------------------------------------
    'outlier-analysis': {
      difficulty: 'medium',
      intro: 'One transaction out of a million may be the fraud. Outlier analysis is about finding the odd ones out.',
      definition:
        'Outliers are data objects that are grossly different from, or inconsistent with, the rest of the data. **Outlier analysis (outlier mining)** detects them using **statistical distribution-based**, **distance-based**, **density-based (local outlier)** or **deviation-based** approaches.',
      simpleExplanation: {
        text: 'Most data follows a pattern. An outlier breaks it. Sometimes it is just an error to remove; sometimes — fraud, a machine about to fail — it is the most valuable thing in the data.',
        analogy: 'A student who usually scores 60 suddenly scores 99 — either a recording mistake or something worth looking into.',
      },
      visual: {
        type: 'comparison',
        title: 'Approaches to outlier detection',
        table: {
          columns: ['Approach', 'Idea', 'Limitation'],
          rows: [
            ['Statistical distribution-based', 'Assume a distribution; objects in its low-probability tail are outliers (discordancy test)', 'Needs the distribution; mostly single attribute'],
            ['Distance-based', 'DB(pct, dmin): at least pct of objects lie farther than dmin away', 'Needs good pct and dmin; global view'],
            ['Density-based (local)', 'Local outlier factor (LOF): much lower density than neighbours', 'More computation'],
            ['Deviation-based', 'Objects whose removal most reduces the dissimilarity of the set', 'Depends on the dissimilarity function'],
          ],
        },
      },
      explanation: [
        { heading: 'Why outliers matter' },
        {
          list: [
            '**Fraud detection** — unusual card or insurance transactions.',
            '**Intrusion detection** — abnormal network traffic.',
            '**Medical analysis** — unusual responses to treatment.',
            '**Industrial monitoring** — a sensor reading signalling a fault.',
          ],
        },
        'Outliers can be caused by measurement or execution errors, or by genuine variability.',
        { heading: '1. Statistical distribution-based' },
        'Assume a model (e.g. normal distribution) and use a **discordancy test**: the working hypothesis says an object comes from the distribution; if it is very unlikely, the alternative hypothesis (outlier) is accepted. Works for one attribute with a known distribution.',
        { heading: '2. Distance-based' },
        'An object o is a **DB(pct, dmin)-outlier** if at least a fraction pct of the objects lie at a distance greater than dmin from o. Algorithms: **index-based**, **nested-loop** and **cell-based**. No distribution needs to be known.',
        { heading: '3. Density-based local outliers' },
        'Distance-based methods miss outliers that are close to a dense cluster but still far from their own neighbours. The **local outlier factor (LOF)** compares an object’s local density with that of its neighbours: LOF much greater than 1 means a local outlier.',
        { heading: '4. Deviation-based' },
        'Examines the main characteristics of a group and flags objects that deviate. The **sequential exception technique** finds the subset whose removal most reduces dissimilarity; the **OLAP data cube technique** flags cells whose values differ greatly from expected values.',
      ],
      example: {
        title: 'Spotting a suspicious transaction',
        input: 'A customer’s card spends: 1,200; 900; 1,500; 1,100; 48,000 (all in rupees, same week)',
        output: `Mean of the first four ≈ 1,175
48,000 is far beyond every other value → flagged as an outlier for review`,
        explanation: 'The bank does not delete the value — it investigates it, because here the outlier is the interesting event.',
      },
      keyPoints: [
        'Outliers are objects inconsistent with the rest of the data.',
        'They may be errors or the most interesting events (fraud).',
        'Four approaches: statistical, distance-based, density-based (LOF), deviation-based.',
        'DB(pct, dmin)-outlier: pct of objects farther than dmin.',
        'LOF finds local outliers near dense clusters.',
      ],
      importantTerms: [
        { term: 'Outlier', meaning: 'An object grossly different from the remaining data.' },
        { term: 'Discordancy test', meaning: 'Statistical test of whether an object fits the assumed distribution.' },
        { term: 'DB(pct, dmin)-outlier', meaning: 'Object for which at least pct of objects are farther than dmin.' },
        { term: 'Local outlier factor (LOF)', meaning: 'Degree to which an object is less dense than its neighbours.' },
      ],
      examPoints: [
        'Define outlier and outlier mining with applications.',
        'Explain all four approaches.',
        'Give the DB(pct, dmin) definition and the LOF idea.',
      ],
      questions: [
        {
          prompt: 'What is outlier analysis? Explain the different approaches for outlier detection.',
          plan: ANSWER_PLAN(
            'Detecting objects grossly different from the rest of the data',
            'Comparison table of four approaches',
            'Statistical, distance-based, density-based (LOF), deviation-based',
            'Card spend of 48,000 among ~1,200 values',
            'Outliers may be errors or valuable signals',
          ),
        },
      ],
      keywords: ['outlier', 'outlier mining', 'fraud detection', 'discordancy test', 'distance-based', 'DB(pct, dmin)', 'density-based', 'LOF', 'deviation-based', 'sequential exception'],
      remember: [
        { prompt: 'Which approach finds outliers near a dense cluster?', answer: 'Density-based (local outlier factor).' },
        { prompt: 'Should outliers always be deleted?', answer: 'No — they may be the interesting events, such as fraud.' },
      ],
    },
  },
}
