// Data Mining and Data Warehousing — Unit II: Frequent Patterns, Classification and Prediction.
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

// The classic 14-tuple training set used by the classification topics.
const BUYS_COMPUTER = `RID age          income  student credit     buys_computer
1   youth        high    no      fair       no
2   youth        high    no      excellent  no
3   middle_aged  high    no      fair       yes
4   senior       medium  no      fair       yes
5   senior       low     yes     fair       yes
6   senior       low     yes     excellent  no
7   middle_aged  low     yes     excellent  yes
8   youth        medium  no      fair       no
9   youth        low     yes     fair       yes
10  senior       medium  yes     fair       yes
11  youth        medium  yes     excellent  yes
12  middle_aged  medium  no      excellent  yes
13  middle_aged  high    yes     fair       yes
14  senior       medium  no      excellent  no`

export default {
  overview:
    'Unit II covers two of the most used mining tasks. First, frequent pattern mining: finding items that occur together and turning them into association rules with Apriori. Then classification: building models — decision trees, Bayesian classifiers, rules, neural networks and support vector machines — that assign class labels to new data.',

  map: [
    { label: 'Frequent patterns', topics: ['mining-frequent-patterns-associations-and-correlations', 'frequent-itemset-mining-methods'] },
    { label: 'Classification basics', topics: ['classification-and-prediction', 'basic-concepts'] },
    { label: 'Trees, Bayes, rules', topics: ['decision-tree-induction', 'bayesian-classification', 'rule-based-classification'] },
    { label: 'Advanced classifiers', topics: ['classification-by-backpropagation', 'support-vector-machine'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'mining-frequent-patterns-associations-and-correlations': {
      difficulty: 'medium',
      intro: 'Why do supermarkets put bread near butter? Because mining showed that customers buy them together.',
      definition:
        'Frequent pattern mining finds itemsets, subsequences or substructures that appear in a data set at least as often as a user-given threshold. From frequent itemsets we derive **association rules** (A ⇒ B) measured by **support** and **confidence**, and check them with **correlation** measures such as **lift**.',
      simpleExplanation: {
        text: 'Count how often items appear together in shopping bills. If {bread, butter} appears in many bills, it is a **frequent itemset**, and a rule like “bread ⇒ butter” tells us that buying bread often means buying butter too.',
        analogy: 'A canteen manager noticing that most students who order dosa also order coffee — and placing them side by side on the menu.',
      },
      visual: {
        type: 'database',
        title: 'Five shopping transactions',
        table: {
          name: 'transactions',
          columns: [{ name: 'TID', key: true }, 'items'],
          rows: [
            ['T1', 'bread, butter, milk'],
            ['T2', 'bread, butter'],
            ['T3', 'bread, jam'],
            ['T4', 'milk, jam'],
            ['T5', 'bread, butter, jam'],
          ],
        },
        highlight: [0, 1, 4],
        caption: '{bread, butter} occurs in T1, T2 and T5 — support = 3/5 = **60%**.',
      },
      explanation: [
        { heading: 'Basic concepts' },
        {
          list: [
            '**Itemset** — a set of items; a **k-itemset** has k items.',
            '**Support count** — number of transactions containing the itemset.',
            '**Frequent itemset** — an itemset whose support ≥ **min_sup**.',
            '**Association rule** A ⇒ B — where A and B are disjoint itemsets.',
          ],
        },
        { heading: 'Support and confidence' },
        {
          table: {
            columns: ['Measure', 'Formula', 'Meaning'],
            rows: [
              ['Support (A ⇒ B)', 'P(A ∪ B) = count(A ∪ B) / total', 'How often A and B occur together'],
              ['Confidence (A ⇒ B)', 'P(B | A) = count(A ∪ B) / count(A)', 'How often B occurs when A occurs'],
            ],
          },
        },
        'A rule is **strong** if it satisfies both minimum support and minimum confidence.',
        { heading: 'Two-step process' },
        {
          list: [
            '**Find all frequent itemsets** (the expensive step).',
            '**Generate strong association rules** from them.',
          ],
          ordered: true,
        },
        { heading: 'Closed and maximal itemsets' },
        'Mining can produce a huge number of frequent itemsets. A **closed** frequent itemset has no proper superset with the same support; a **maximal** frequent itemset has no frequent proper superset. They summarise the results compactly.',
        { heading: 'From association to correlation' },
        'Support and confidence can mislead. **Lift** checks whether A and B are really related:',
        { code: 'lift(A, B) = P(A ∪ B) / ( P(A) × P(B) )', lang: 'text' },
        {
          list: [
            'lift > 1 → **positively correlated** (A raises the chance of B).',
            'lift < 1 → **negatively correlated**.',
            'lift = 1 → **independent**.',
          ],
        },
        { trap: 'A rule can have high confidence and still be misleading. If 75% of all customers buy videos anyway, “game ⇒ video” with 66% confidence actually means game buyers are **less** likely to buy videos (lift < 1).' },
      ],
      example: {
        title: 'Evaluate bread ⇒ butter',
        input: 'Transactions T1–T5 above. bread in 4, butter in 3, both in 3.',
        output: `support    = 3/5 = 60%
confidence = 3/4 = 75%
lift       = 0.60 / (0.80 × 0.60) = 1.25  → positively correlated`,
        explanation:
          'With min_sup = 50% and min_conf = 70% the rule is strong, and lift above 1 confirms that buying bread really does increase the chance of buying butter.',
      },
      keyPoints: [
        'Frequent itemsets occur at least min_sup times.',
        'Support = P(A ∪ B); confidence = P(B | A).',
        'Strong rules meet both min_sup and min_conf.',
        'Mining = find frequent itemsets, then generate rules.',
        'Lift tests correlation: > 1 positive, < 1 negative, = 1 independent.',
      ],
      importantTerms: [
        { term: 'Market basket analysis', meaning: 'Studying which items customers buy together.' },
        { term: 'Support', meaning: 'Fraction of transactions containing all items of the rule.' },
        { term: 'Confidence', meaning: 'Fraction of transactions with A that also contain B.' },
        { term: 'Closed itemset', meaning: 'No superset has the same support.' },
        { term: 'Lift', meaning: 'Ratio showing whether A and B are correlated.' },
      ],
      examPoints: [
        'Define frequent itemset and association rule.',
        'Write support and confidence formulas with a small example.',
        'State the two-step mining process.',
        'Explain lift and why confidence alone can mislead.',
      ],
      questions: [
        {
          prompt: 'Explain frequent patterns, association rules and correlation analysis with an example.',
          plan: ANSWER_PLAN(
            'Patterns that occur frequently; rules A ⇒ B with support and confidence',
            'Transaction table with a frequent itemset highlighted',
            'Itemsets, support, confidence, strong rules, two steps, closed/maximal, lift',
            'bread ⇒ butter: support 60%, confidence 75%, lift 1.25',
            'Use lift to avoid misleading strong rules',
          ),
        },
      ],
      keywords: ['frequent itemset', 'association rule', 'support', 'confidence', 'min_sup', 'min_conf', 'strong rule', 'closed itemset', 'maximal itemset', 'lift', 'correlation'],
      remember: [
        { prompt: 'Confidence of A ⇒ B?', answer: 'count(A ∪ B) / count(A).' },
        { prompt: 'What does lift < 1 mean?', answer: 'A and B are negatively correlated.' },
      ],
    },

    // ------------------------------------------------------------------
    'frequent-itemset-mining-methods': {
      difficulty: 'hard',
      intro: 'Checking every possible itemset is impossible for thousands of items. Apriori and FP-growth find the frequent ones efficiently.',
      definition:
        'Frequent itemset mining methods are algorithms that find all frequent itemsets in a transaction database. The main ones are **Apriori** (level-wise candidate generation and test), **FP-growth** (pattern growth without candidate generation) and **Eclat** (vertical data format).',
      simpleExplanation: {
        text: 'Apriori builds frequent itemsets level by level: frequent single items, then pairs, then triples. Its trick: if an itemset is not frequent, none of its supersets can be, so they are never counted.',
        analogy: 'If no team has both Arun and Priya, no team can have Arun, Priya and Karthik — so you do not even check the three-person teams that include that pair.',
      },
      visual: {
        type: 'process',
        title: 'Apriori, level by level',
        steps: [
          { label: 'Scan → C1 → L1', detail: 'count single items, keep those ≥ min_sup' },
          { label: 'Join Lk−1 with itself → Ck', detail: 'candidate k-itemsets' },
          { label: 'Prune Ck', detail: 'drop candidates with an infrequent (k−1)-subset' },
          { label: 'Scan → count Ck → Lk', detail: 'keep candidates ≥ min_sup' },
          { label: 'Repeat until Lk is empty', detail: 'then generate rules' },
        ],
      },
      explanation: [
        { heading: 'The Apriori property' },
        '**All non-empty subsets of a frequent itemset must also be frequent.** Equivalently, if an itemset is infrequent, every superset is infrequent (the property is **anti-monotone**). This lets Apriori prune candidates before scanning the data.',
        { heading: 'Worked example (min support count = 2)' },
        {
          code: `TID   Items
T100  I1, I2, I5        T600  I2, I3
T200  I2, I4            T700  I1, I3
T300  I2, I3            T800  I1, I2, I3, I5
T400  I1, I2, I4        T900  I1, I2, I3
T500  I1, I3`,
          lang: 'text',
        },
        {
          table: {
            columns: ['Level', 'Frequent itemsets (support count)'],
            rows: [
              ['L1', 'I1:6, I2:7, I3:6, I4:2, I5:2'],
              ['L2', '{I1,I2}:4, {I1,I3}:4, {I1,I5}:2, {I2,I3}:4, {I2,I4}:2, {I2,I5}:2'],
              ['L3', '{I1,I2,I3}:2, {I1,I2,I5}:2'],
              ['C4', '{I1,I2,I3,I5} pruned — subset {I2,I3,I5} is not frequent'],
            ],
          },
        },
        { heading: 'Generating rules from a frequent itemset' },
        'For each frequent itemset l and each non-empty proper subset s, output s ⇒ (l − s) if count(l) / count(s) ≥ min_conf. From {I1, I2, I5} with min_conf 70%: **I1∧I5 ⇒ I2** (100%), **I2∧I5 ⇒ I1** (100%), **I5 ⇒ I1∧I2** (100%) are strong; I1∧I2 ⇒ I5 (50%) is not.',
        { heading: 'Improving Apriori' },
        {
          list: [
            '**Hash-based technique** — hash itemsets into buckets to shrink C2.',
            '**Transaction reduction** — drop transactions with no frequent k-itemsets.',
            '**Partitioning** — mine partitions locally, then combine (only two scans).',
            '**Sampling** — mine a random sample, then verify.',
            '**Dynamic itemset counting** — add candidates at different points during a scan.',
          ],
        },
        { heading: 'FP-growth: no candidate generation' },
        'FP-growth compresses the database into an **FP-tree** (frequent-pattern tree) using two scans, then mines it by building a **conditional pattern base** and a conditional FP-tree for each item. It avoids generating huge candidate sets and is usually much faster than Apriori.',
        { heading: 'Eclat: vertical data format' },
        'Instead of TID → items, store item → set of TIDs. The support of {I1, I2} is the size of TIDset(I1) ∩ TIDset(I2), so no full database scan is needed per level.',
      ],
      example: {
        title: 'Why pruning matters',
        input: 'L2 = {I1,I2}, {I1,I3}, {I1,I5}, {I2,I3}, {I2,I4}, {I2,I5}. Join gives candidate {I1,I3,I5}.',
        output: `Subsets: {I1,I3} ✓  {I1,I5} ✓  {I3,I5} ✗ (not in L2)
→ {I1,I3,I5} pruned without scanning the database`,
        explanation:
          'Because {I3, I5} is infrequent, the Apriori property guarantees {I1, I3, I5} is infrequent too, so it is never counted.',
      },
      keyPoints: [
        'Apriori property: subsets of frequent itemsets are frequent (anti-monotone).',
        'Apriori loop: join → prune → scan → keep ≥ min_sup.',
        'Rules come from subsets s of a frequent itemset l with confidence ≥ min_conf.',
        'Efficiency tricks: hashing, transaction reduction, partitioning, sampling, DIC.',
        'FP-growth uses an FP-tree and no candidate generation; Eclat uses TID sets.',
      ],
      importantTerms: [
        { term: 'Apriori property', meaning: 'Every subset of a frequent itemset is frequent.' },
        { term: 'Candidate itemset (Ck)', meaning: 'A k-itemset that might be frequent and must be counted.' },
        { term: 'FP-tree', meaning: 'A compressed prefix tree of frequent items in transactions.' },
        { term: 'Conditional pattern base', meaning: 'The prefix paths in the FP-tree that end with a given item.' },
        { term: 'Vertical data format', meaning: 'Item → list of transaction IDs.' },
      ],
      examPoints: [
        'State the Apriori property.',
        'Write the Apriori steps (join, prune, count).',
        'Work through a small example to L3 and generate rules.',
        'List efficiency improvements; explain FP-growth briefly.',
      ],
      questions: [
        {
          prompt: 'Explain the Apriori algorithm for finding frequent itemsets with an example.',
          plan: ANSWER_PLAN(
            'Level-wise algorithm using prior knowledge of frequent itemsets',
            'Join → prune → scan → Lk loop',
            'Apriori property; candidate generation; rule generation; efficiency improvements',
            '9-transaction example to L3 and strong rules',
            'Limitations of Apriori and FP-growth as the alternative',
          ),
        },
      ],
      keywords: ['Apriori', 'Apriori property', 'anti-monotone', 'candidate generation', 'join step', 'prune step', 'FP-growth', 'FP-tree', 'Eclat', 'vertical format'],
      remember: [
        { prompt: 'Which method mines frequent itemsets without candidate generation?', answer: 'FP-growth.' },
        { prompt: 'Why was {I1,I2,I3,I5} pruned?', answer: 'Its subset {I2,I3,I5} is not frequent.' },
      ],
    },

    // ------------------------------------------------------------------
    'classification-and-prediction': {
      difficulty: 'easy',
      intro: 'Is this email spam? How much will this customer spend? Classification and prediction answer such questions from past data.',
      definition:
        '**Classification** builds a model (classifier) that predicts **categorical class labels** (e.g. safe / risky). **Prediction** (numeric prediction) builds a model that predicts **continuous values** (e.g. expected spend in rupees), usually with **regression**.',
      simpleExplanation: {
        text: 'Both learn from past examples whose answers are known. Classification answers “which group?”; numeric prediction answers “how much?”.',
        analogy: 'A doctor deciding “diabetic or not” is classifying; estimating “blood sugar next month” is predicting.',
      },
      visual: {
        type: 'comparison',
        title: 'Classification vs numeric prediction',
        items: [
          {
            title: 'Classification',
            tone: 'accent',
            points: ['Output is a class label', 'Discrete, unordered values', 'e.g. loan: safe or risky', 'Decision trees, Bayes, SVM'],
          },
          {
            title: 'Numeric prediction',
            tone: 'muted',
            points: ['Output is a number', 'Continuous values', 'e.g. spend: Rs. 4,250', 'Regression analysis'],
          },
        ],
      },
      explanation: [
        { heading: 'Applications' },
        {
          list: [
            'Banking — loan approval (safe / risky).',
            'Marketing — will a customer buy a new product (yes / no)?',
            'Medicine — diagnosis from test results.',
            'Numeric prediction — sales forecasting, house prices.',
          ],
        },
        { heading: 'Preparing data for classification' },
        {
          list: [
            '**Data cleaning** — reduce noise, handle missing values.',
            '**Relevance analysis** — remove irrelevant or redundant attributes (correlation analysis, attribute subset selection).',
            '**Data transformation and reduction** — normalization, generalization with concept hierarchies.',
          ],
        },
        { heading: 'Criteria for comparing methods' },
        {
          table: {
            columns: ['Criterion', 'Question it asks'],
            rows: [
              ['Accuracy', 'How often does it predict correctly on new data?'],
              ['Speed', 'How long to build and to use the model?'],
              ['Robustness', 'Does it cope with noise and missing values?'],
              ['Scalability', 'Does it work on large data sets?'],
              ['Interpretability', 'Can people understand the model?'],
            ],
          },
        },
        { note: 'Both are **supervised learning**: the class label (or target value) of each training tuple is known. Clustering, by contrast, is unsupervised.' },
      ],
      example: {
        title: 'Same data, two questions',
        input: 'Customer records: age, income, past purchases.',
        output: `Classification: Will customer #812 buy a laptop?     → "yes"
Prediction:     How much will customer #812 spend?     → Rs. 54,300`,
        explanation: 'The training data is the same; the type of answer decides whether it is classification or numeric prediction.',
      },
      keyPoints: [
        'Classification predicts categorical labels; prediction predicts continuous values.',
        'Both are supervised: learn from labelled training data.',
        'Prepare data by cleaning, relevance analysis and transformation.',
        'Compare methods by accuracy, speed, robustness, scalability, interpretability.',
      ],
      importantTerms: [
        { term: 'Classifier', meaning: 'A model that assigns class labels.' },
        { term: 'Class label', meaning: 'The categorical value to be predicted.' },
        { term: 'Regression', meaning: 'Statistical method for predicting continuous values.' },
        { term: 'Supervised learning', meaning: 'Learning from training data with known answers.' },
      ],
      examPoints: [
        'Define both and contrast them with examples.',
        'List applications.',
        'Explain data preparation steps.',
        'Tabulate the five comparison criteria.',
      ],
      questions: [
        {
          prompt: 'Differentiate classification and prediction. What issues must be considered in classification and prediction?',
          plan: ANSWER_PLAN(
            'Classification predicts categories; prediction predicts continuous values',
            'Side-by-side comparison',
            'Applications; data preparation; comparison criteria',
            'Customer: will buy? vs how much?',
            'Both supervised; evaluated on accuracy, speed, robustness, scalability, interpretability',
          ),
        },
      ],
      keywords: ['classification', 'numeric prediction', 'class label', 'regression', 'supervised learning', 'relevance analysis', 'accuracy', 'robustness', 'scalability', 'interpretability'],
      remember: [
        { prompt: 'Predicting tomorrow’s temperature in °C is classification or prediction?', answer: 'Numeric prediction.' },
        { prompt: 'Name the five criteria for comparing classifiers.', answer: 'Accuracy, speed, robustness, scalability, interpretability.' },
      ],
    },

    // ------------------------------------------------------------------
    'basic-concepts': {
      difficulty: 'easy',
      intro: 'Every classifier — tree, Bayes or neural network — is built and tested in the same two steps.',
      definition:
        'Data classification is a two-step process: a **learning step**, in which a classification algorithm builds a model from a **training set** of tuples with known class labels, and a **classification step**, in which the model’s accuracy is estimated on a **test set** and, if acceptable, it is used to classify new tuples.',
      simpleExplanation: {
        text: 'First the algorithm studies examples with answers (training). Then you check it on different examples it has not seen (testing). Only if it scores well do you trust it on real, unlabelled data.',
        analogy: 'Studying solved problems (training), sitting a model exam (testing), then facing the real exam (new data).',
      },
      visual: {
        type: 'flow',
        title: 'Two-step classification',
        steps: [
          { label: 'Training data', note: 'tuples + class labels' },
          { label: 'Learning algorithm', note: 'builds the model' },
          { label: 'Classifier', note: 'rules / tree / formula' },
          { label: 'Test data', note: 'estimate accuracy' },
          { label: 'New data', note: 'assign class labels' },
        ],
      },
      explanation: [
        { heading: 'Step 1 — Learning (training)' },
        'Each training tuple X = (x1, x2, …, xn) has a **class label attribute** value. Because the labels are given, this is **supervised learning**. The output is a classifier, e.g. a set of rules:',
        { code: `IF age = youth THEN loan_decision = risky
IF income = high THEN loan_decision = safe
IF age = middle_aged AND income = low THEN loan_decision = risky`, lang: 'text' },
        { heading: 'Step 2 — Classification' },
        {
          list: [
            'Run the classifier on a **test set** — tuples not used in training.',
            '**Accuracy** = correctly classified test tuples ÷ total test tuples.',
            'If accuracy is acceptable, classify new tuples whose labels are unknown.',
          ],
        },
        { trap: 'Never measure accuracy on the training data. The model may have **overfitted** — memorised quirks of the training data — and look far better than it really is.' },
        { heading: 'Estimating accuracy' },
        {
          list: [
            '**Holdout** — split data, e.g. two-thirds for training and one-third for testing.',
            '**Random subsampling** — repeat holdout several times and average.',
            '**k-fold cross-validation** — split into k folds; each fold is the test set once.',
          ],
        },
        { heading: 'Supervised vs unsupervised' },
        {
          table: {
            columns: ['', 'Supervised (classification)', 'Unsupervised (clustering)'],
            rows: [
              ['Class labels known?', 'Yes', 'No'],
              ['Goal', 'Predict labels of new data', 'Discover groups'],
              ['Example', 'Spam / not spam', 'Customer segments'],
            ],
          },
        },
      ],
      example: {
        title: 'Measuring accuracy',
        input: 'A loan classifier is tested on 200 test tuples it never saw during training. It labels 172 correctly.',
        output: 'Accuracy = 172 / 200 = 86%',
        explanation: 'If 86% is acceptable for the bank, the model is used on new applications; if not, it is retrained or another method is tried.',
      },
      keyPoints: [
        'Classification has a learning step and a classification step.',
        'Training set builds the model; test set estimates accuracy.',
        'Accuracy = correct test predictions ÷ test tuples.',
        'Testing on training data overestimates accuracy (overfitting).',
        'Holdout, random subsampling and k-fold cross-validation estimate accuracy.',
      ],
      importantTerms: [
        { term: 'Training set', meaning: 'Labelled tuples used to build the classifier.' },
        { term: 'Test set', meaning: 'Labelled tuples, unseen in training, used to measure accuracy.' },
        { term: 'Class label attribute', meaning: 'The attribute whose value is to be predicted.' },
        { term: 'Overfitting', meaning: 'A model that fits training data too closely and generalises poorly.' },
        { term: 'Cross-validation', meaning: 'Rotating which part of the data is used for testing.' },
      ],
      examPoints: [
        'Draw the two-step diagram.',
        'Explain training set, test set and accuracy.',
        'Explain overfitting and why a separate test set is needed.',
        'Contrast supervised and unsupervised learning.',
      ],
      questions: [
        {
          prompt: 'Explain the general approach to classification.',
          plan: ANSWER_PLAN(
            'Two steps: learning a model from labelled data, then using it to classify',
            'Training data → algorithm → classifier → test data → new data',
            'Learning step, classification step, accuracy, overfitting, holdout/cross-validation',
            'Loan classifier: 172 of 200 correct = 86%',
            'Supervised learning; test on unseen data',
          ),
        },
      ],
      keywords: ['learning step', 'classification step', 'training set', 'test set', 'class label', 'accuracy', 'overfitting', 'holdout', 'cross-validation', 'supervised'],
      remember: [
        { prompt: 'Why must the test set be separate from the training set?', answer: 'To avoid overestimating accuracy due to overfitting.' },
        { prompt: 'What are the two steps of classification?', answer: 'Learning (training) and classification (testing and use).' },
      ],
    },

    // ------------------------------------------------------------------
    'decision-tree-induction': {
      difficulty: 'hard',
      intro: 'A decision tree is a classifier you can read like a flowchart — which is why it is so popular.',
      definition:
        'Decision tree induction is the learning of a flowchart-like tree from class-labelled training tuples. Each **internal node** tests an attribute, each **branch** is an outcome of the test, and each **leaf node** holds a class label. Algorithms such as **ID3**, **C4.5** and **CART** build the tree top-down, choosing the best attribute at each node with an **attribute selection measure**.',
      simpleExplanation: {
        text: 'Start with all training data. Pick the attribute that best separates the classes and split on it. Repeat inside each branch until the tuples in a branch all have the same class. To classify a new tuple, follow its answers from the root to a leaf.',
        analogy: 'The game of “20 questions”: each question is chosen to rule out as many possibilities as possible.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Tree for buys_computer',
        root: 'age?',
        children: [
          { label: 'youth', note: 'then test student?', children: ['no → no', 'yes → yes'] },
          { label: 'middle_aged', note: 'always buys', children: ['yes'] },
          { label: 'senior', note: 'then test credit_rating?', children: ['fair → yes', 'excellent → no'] },
        ],
      },
      explanation: [
        { heading: 'Basic algorithm (greedy, top-down, recursive)' },
        {
          list: [
            'Start with all training tuples at the root.',
            'Choose the splitting attribute using an attribute selection measure.',
            'Create a branch for each outcome and partition the tuples.',
            'Recurse on each partition.',
            'Stop when all tuples in a node have the same class, no attributes remain (use majority voting), or the partition is empty.',
          ],
          ordered: true,
        },
        { heading: 'Attribute selection measures' },
        {
          table: {
            columns: ['Measure', 'Used by', 'Idea'],
            rows: [
              ['Information gain', 'ID3', 'Choose the attribute that reduces entropy the most'],
              ['Gain ratio', 'C4.5', 'Information gain normalised by split information (avoids many-valued bias)'],
              ['Gini index', 'CART', 'Choose the split that minimises impurity (binary splits)'],
            ],
          },
        },
        { code: `Info(D)   = − Σ pᵢ log₂(pᵢ)                    (entropy)
Info_A(D) = Σ (|Dⱼ| / |D|) × Info(Dⱼ)
Gain(A)   = Info(D) − Info_A(D)`, lang: 'text' },
        { heading: 'Worked numbers (14 tuples: 9 yes, 5 no)' },
        {
          list: [
            'Info(D) = −(9/14)log₂(9/14) − (5/14)log₂(5/14) = **0.940** bits.',
            'Info_age(D) = (5/14)(0.971) + (4/14)(0) + (5/14)(0.971) = **0.694**.',
            'Gain(age) = 0.940 − 0.694 = **0.246**.',
            'Gain(income) = 0.029, Gain(student) = 0.151, Gain(credit_rating) = 0.048.',
            '**age** has the highest gain → it becomes the root.',
          ],
        },
        { more: [{ code: BUYS_COMPUTER, lang: 'text' }], label: 'See the 14 training tuples' },
        { heading: 'Tree pruning' },
        'Trees can overfit noise. **Prepruning** stops growth early (e.g. when gain falls below a threshold). **Postpruning** grows the full tree and then removes subtrees, replacing them with leaves. Postpruning is more common.',
        { tip: 'Strengths: easy to understand, no domain knowledge or parameter setting needed, handles multidimensional data, fast. Each root-to-leaf path is also an IF-THEN rule.' },
      ],
      example: {
        title: 'Classify a new customer',
        input: 'X = (age = senior, income = medium, student = no, credit_rating = fair)',
        output: `age? = senior → credit_rating? = fair → buys_computer = yes`,
        explanation: 'Only two tests are needed. Attributes not on the path (income, student) do not affect this prediction.',
      },
      keyPoints: [
        'Internal node = attribute test; branch = outcome; leaf = class label.',
        'Built greedily, top-down, recursively.',
        'ID3 uses information gain, C4.5 gain ratio, CART Gini index.',
        'Gain(A) = Info(D) − Info_A(D); pick the highest.',
        'Pruning (pre/post) reduces overfitting.',
      ],
      importantTerms: [
        { term: 'Entropy (Info)', meaning: 'Expected information needed to classify a tuple; impurity of a set.' },
        { term: 'Information gain', meaning: 'Reduction in entropy achieved by splitting on an attribute.' },
        { term: 'Gini index', meaning: 'Impurity measure used by CART for binary splits.' },
        { term: 'Pruning', meaning: 'Removing branches that reflect noise or outliers.' },
      ],
      examPoints: [
        'Define decision tree and its node types.',
        'Write the induction algorithm steps.',
        'Write entropy and gain formulas; compute Gain(age) = 0.246.',
        'Draw the final tree; explain pruning.',
      ],
      questions: [
        {
          prompt: 'Explain decision tree induction with the information gain measure. Illustrate with an example.',
          plan: ANSWER_PLAN(
            'Learning a flowchart-like tree from labelled tuples',
            'Tree with age at the root',
            'Algorithm; information gain, gain ratio, Gini; pruning',
            'buys_computer: Info(D) = 0.940, Gain(age) = 0.246',
            'Easy to interpret; risk of overfitting handled by pruning',
          ),
        },
      ],
      keywords: ['decision tree', 'internal node', 'leaf', 'ID3', 'C4.5', 'CART', 'entropy', 'information gain', 'gain ratio', 'Gini index', 'pruning'],
      remember: [
        { prompt: 'Which measure does C4.5 use?', answer: 'Gain ratio.' },
        { prompt: 'Entropy of a set with 9 yes and 5 no?', answer: '0.940 bits.' },
      ],
    },

    // ------------------------------------------------------------------
    'bayesian-classification': {
      difficulty: 'hard',
      intro: 'Bayesian classifiers answer: given what I see, which class is most probable?',
      definition:
        'Bayesian classifiers are statistical classifiers based on **Bayes’ theorem**. They predict the class membership probability of a tuple. The **naive Bayesian classifier** assumes **class-conditional independence** — that attribute values are independent of one another given the class.',
      simpleExplanation: {
        text: 'For each class, multiply how common the class is (prior) by how likely the tuple’s attribute values are in that class (likelihood). The class with the biggest product wins.',
        analogy: 'A doctor reasoning: “fever and cough are common in flu, and flu is common this month — so flu is the most probable diagnosis.”',
      },
      visual: {
        type: 'process',
        title: 'Naive Bayes for X = (youth, medium income, student, fair credit)',
        steps: [
          { label: 'P(yes) = 9/14 = 0.643   P(no) = 5/14 = 0.357', detail: 'priors' },
          { label: 'P(X|yes) = 0.222 × 0.444 × 0.667 × 0.667 = 0.044', detail: 'product of attribute probabilities' },
          { label: 'P(X|no) = 0.600 × 0.400 × 0.200 × 0.400 = 0.019', detail: 'same for class no' },
          { label: '0.044 × 0.643 = 0.028   vs   0.019 × 0.357 = 0.007', detail: 'P(X|Ci) × P(Ci)' },
          { label: 'Predict buys_computer = yes', detail: 'larger value wins' },
        ],
      },
      explanation: [
        { heading: 'Bayes’ theorem' },
        { code: 'P(H | X) = P(X | H) × P(H) / P(X)', lang: 'text' },
        {
          table: {
            columns: ['Term', 'Name', 'Meaning'],
            rows: [
              ['P(H | X)', 'Posterior probability', 'Probability of hypothesis H (the class) given tuple X'],
              ['P(H)', 'Prior probability', 'Probability of H before seeing X'],
              ['P(X | H)', 'Likelihood', 'Probability of seeing X if H is true'],
              ['P(X)', 'Evidence', 'Probability of X; same for all classes'],
            ],
          },
        },
        { heading: 'Naive Bayesian classification' },
        {
          list: [
            'Predict class Cᵢ that **maximises P(Cᵢ | X)**.',
            'P(X) is constant, so maximise **P(X | Cᵢ) × P(Cᵢ)**.',
            'Assume independence: **P(X | Cᵢ) = P(x₁|Cᵢ) × P(x₂|Cᵢ) × … × P(xₙ|Cᵢ)** — easy to count from training data.',
            'For continuous attributes, use a Gaussian (normal) distribution with the class mean and standard deviation.',
          ],
        },
        { heading: 'The zero-probability problem' },
        'If an attribute value never occurs with a class, one factor is 0 and wipes out the whole product. The **Laplacian correction** adds 1 to each count so no probability is zero, with negligible effect on large data.',
        { heading: 'Bayesian belief networks' },
        'When attributes are **not** independent, a **belief network** (a directed acyclic graph plus conditional probability tables) models the dependencies between variables.',
        { tip: 'Naive Bayes is simple, fast, and often as accurate as decision trees and neural networks on large data — despite its “naive” assumption.' },
      ],
      example: {
        title: 'Where the numbers come from',
        input: 'From the 14 training tuples: among the 9 “yes” tuples, 2 are youth, 4 have medium income, 6 are students, 6 have fair credit.',
        output: `P(age=youth | yes)      = 2/9 = 0.222
P(income=medium | yes)  = 4/9 = 0.444
P(student=yes | yes)    = 6/9 = 0.667
P(credit=fair | yes)    = 6/9 = 0.667`,
        explanation: 'Each conditional probability is just a count within the class divided by the class size. The same is done for the 5 “no” tuples.',
      },
      keyPoints: [
        'Based on Bayes’ theorem: posterior = likelihood × prior ÷ evidence.',
        'Naive Bayes assumes class-conditional independence.',
        'Choose the class maximising P(X|Cᵢ) × P(Cᵢ).',
        'Laplacian correction avoids zero probabilities.',
        'Belief networks model dependent attributes.',
      ],
      importantTerms: [
        { term: 'Posterior probability', meaning: 'P(H|X): probability of the class after seeing the data.' },
        { term: 'Prior probability', meaning: 'P(H): probability of the class before seeing the data.' },
        { term: 'Class-conditional independence', meaning: 'Attributes are independent given the class.' },
        { term: 'Laplacian correction', meaning: 'Adding 1 to counts to avoid zero probabilities.' },
      ],
      examPoints: [
        'State Bayes’ theorem and name each term.',
        'Explain the naive Bayes steps and the independence assumption.',
        'Work the buys_computer example to “yes”.',
        'Mention Laplacian correction and belief networks.',
      ],
      questions: [
        {
          prompt: 'Explain naive Bayesian classification with an example.',
          plan: ANSWER_PLAN(
            'Statistical classifier using Bayes’ theorem with class-conditional independence',
            'Step-by-step probability calculation',
            'Bayes’ theorem terms; maximise P(X|Ci)P(Ci); independence; Laplacian correction',
            'X = (youth, medium, student, fair) → yes (0.028 vs 0.007)',
            'Fast and accurate; belief networks for dependencies',
          ),
        },
      ],
      keywords: ['Bayes theorem', 'posterior', 'prior', 'likelihood', 'naive Bayes', 'class-conditional independence', 'Laplacian correction', 'belief network'],
      remember: [
        { prompt: 'What does “naive” refer to in naive Bayes?', answer: 'The assumption that attributes are independent given the class.' },
        { prompt: 'Which quantity is ignored because it is the same for every class?', answer: 'P(X), the evidence.' },
      ],
    },

    // ------------------------------------------------------------------
    'rule-based-classification': {
      difficulty: 'medium',
      intro: 'IF–THEN rules are the most human-readable classifiers of all.',
      definition:
        'Rule-based classification uses a set of **IF–THEN rules** to classify tuples. The IF part (antecedent) is a condition on attribute values; the THEN part (consequent) is a class prediction. Rules can be **extracted from a decision tree** or learned directly with a **sequential covering algorithm**.',
      simpleExplanation: {
        text: 'A rule such as “IF age = youth AND student = yes THEN buys_computer = yes” fires when a tuple satisfies its condition. If several rules fire, a strategy decides which one wins; if none fires, a default rule is used.',
        analogy: 'College admission rules: IF marks ≥ 90 AND entrance cleared THEN admit.',
      },
      visual: {
        type: 'process',
        title: 'Sequential covering algorithm',
        steps: [
          { label: 'Learn one rule', detail: 'covering many tuples of one class, few of others' },
          { label: 'Remove covered tuples', detail: 'from the training set' },
          { label: 'Repeat', detail: 'until no tuples remain or rule quality is too low' },
          { label: 'Rule set ready', detail: 'add a default rule' },
        ],
      },
      explanation: [
        { heading: 'Anatomy of a rule' },
        { code: 'R1: IF age = youth AND student = yes THEN buys_computer = yes', lang: 'text' },
        'The antecedent may test several attributes joined by AND. A rule **covers** a tuple if the tuple satisfies its antecedent.',
        { heading: 'Coverage and accuracy' },
        { code: `coverage(R) = n_covers / |D|
accuracy(R) = n_correct / n_covers`, lang: 'text' },
        'Example: of 14 tuples, R1 covers 2 and classifies both correctly → coverage 14.28%, accuracy 100%.',
        { heading: 'When more than one rule fires: conflict resolution' },
        {
          list: [
            '**Size ordering** — prefer the rule with the most attribute tests (the toughest requirement).',
            '**Rule ordering** — rules are prioritised in advance: **class-based** (by class importance or frequency) or **rule-based** (by quality measures — a **decision list**).',
            'If no rule fires, a **default rule** assigns a default class (e.g. the majority class).',
          ],
        },
        { heading: 'Rule extraction from a decision tree' },
        'Write one rule for every root-to-leaf path: the tests along the path form the antecedent (ANDed), and the leaf gives the class. The resulting rules are **mutually exclusive** (no two fire together) and **exhaustive** (one rule per possible combination).',
        { code: `IF age = youth AND student = no   THEN buys_computer = no
IF age = youth AND student = yes  THEN buys_computer = yes
IF age = middle_aged              THEN buys_computer = yes
IF age = senior AND credit = excellent THEN buys_computer = no
IF age = senior AND credit = fair      THEN buys_computer = yes`, lang: 'text' },
        { heading: 'Sequential covering' },
        'Algorithms such as **AQ**, **CN2** and **RIPPER** learn rules one at a time. Each new rule is grown greedily by adding the attribute test that most improves rule quality (e.g. **FOIL gain**), and may be pruned afterwards.',
      ],
      example: {
        title: 'Coverage and accuracy of a rule',
        input: 'R: IF income = high AND student = no THEN buys_computer = no — applied to the 14 training tuples.',
        output: `Covers tuples 1, 2, 3 → n_covers = 3
Correct: 1, 2 (tuple 3 is "yes") → n_correct = 2
coverage = 3/14 = 21.4%   accuracy = 2/3 = 66.7%`,
        explanation: 'A rule can be general (high coverage) yet unreliable (low accuracy). Good rules balance both.',
      },
      keyPoints: [
        'Rules: IF antecedent THEN consequent (class).',
        'Coverage = covered/total; accuracy = correct/covered.',
        'Conflicts: size ordering or rule ordering (class-based or decision list).',
        'Tree-extracted rules are mutually exclusive and exhaustive.',
        'Sequential covering learns one rule at a time (AQ, CN2, RIPPER).',
      ],
      importantTerms: [
        { term: 'Antecedent', meaning: 'The IF part (precondition) of a rule.' },
        { term: 'Consequent', meaning: 'The THEN part (class prediction) of a rule.' },
        { term: 'Decision list', meaning: 'An ordered rule set where the first matching rule fires.' },
        { term: 'Sequential covering', meaning: 'Learning rules one by one, removing covered tuples each time.' },
      ],
      examPoints: [
        'Define a rule with antecedent and consequent.',
        'Give coverage and accuracy formulas with a calculation.',
        'Explain conflict resolution and default rule.',
        'Show rule extraction from the decision tree; outline sequential covering.',
      ],
      questions: [
        {
          prompt: 'Explain rule-based classification. How are rules extracted from a decision tree?',
          plan: ANSWER_PLAN(
            'Classifying with a set of IF–THEN rules',
            'Sequential covering loop',
            'Coverage, accuracy, conflict resolution, default rule, extraction from trees',
            'Five rules from the buys_computer tree',
            'Readable; extracted rules are mutually exclusive and exhaustive',
          ),
        },
      ],
      keywords: ['IF-THEN rule', 'antecedent', 'consequent', 'coverage', 'accuracy', 'size ordering', 'rule ordering', 'decision list', 'default rule', 'sequential covering', 'RIPPER'],
      remember: [
        { prompt: 'How many rules come from a tree with 5 leaves?', answer: '5 — one per root-to-leaf path.' },
        { prompt: 'Accuracy of a rule?', answer: 'n_correct / n_covers.' },
      ],
    },

    // ------------------------------------------------------------------
    'classification-by-backpropagation': {
      difficulty: 'hard',
      intro: 'Neural networks learn by adjusting thousands of weights. Backpropagation is the algorithm that tells each weight which way to move.',
      definition:
        'Backpropagation is a neural network learning algorithm for **multilayer feed-forward networks**. It iteratively processes training tuples, compares the network’s output with the actual class, and **propagates the error backwards** from the output layer to the hidden layers, adjusting the weights to reduce the error.',
      simpleExplanation: {
        text: 'Inputs flow forward through the layers to produce an output. The error (target minus output) then flows backwards, and every connection weight is nudged a little in the direction that would have made the error smaller. Repeat over many passes (epochs).',
        analogy: 'Learning to throw darts: throw (forward), see how far you missed (error), adjust your arm slightly (weights), throw again.',
      },
      visual: {
        type: 'architecture',
        title: 'Multilayer feed-forward network',
        layers: [
          { label: 'Input layer', note: 'one unit per attribute', items: ['x₁', 'x₂', 'x₃'] },
          { label: 'Hidden layer', note: 'weighted sum + sigmoid', items: ['h₁', 'h₂'] },
          { label: 'Output layer', note: 'one unit per class', items: ['o₁'] },
        ],
        caption: 'Forward pass: outputs flow down. Backward pass: errors flow back up and weights are updated.',
      },
      explanation: [
        { heading: 'Network structure' },
        'Units are arranged in an **input layer**, one or more **hidden layers** and an **output layer**. Every connection has a **weight**; every hidden/output unit has a **bias**. It is called feed-forward because no weight cycles back.',
        { heading: 'The algorithm' },
        {
          list: [
            '**Initialise** weights and biases to small random numbers.',
            '**Propagate inputs forward**: each unit j computes net input Iⱼ = Σ wᵢⱼ Oᵢ + θⱼ and output Oⱼ = 1 / (1 + e^(−Iⱼ)) (sigmoid).',
            '**Backpropagate the error**: output unit Errⱼ = Oⱼ(1 − Oⱼ)(Tⱼ − Oⱼ); hidden unit Errⱼ = Oⱼ(1 − Oⱼ) Σ Errₖ wⱼₖ.',
            '**Update** weights Δwᵢⱼ = (l) Errⱼ Oᵢ and biases Δθⱼ = (l) Errⱼ, where l is the **learning rate**.',
            '**Terminate** when weight changes are tiny, the misclassification rate is low enough, or a set number of epochs is reached.',
          ],
          ordered: true,
        },
        { heading: 'Strengths and weaknesses' },
        {
          table: {
            columns: ['Strengths', 'Weaknesses'],
            rows: [
              ['High tolerance to noisy data', 'Long training time'],
              ['Can classify patterns not seen in training', 'Needs parameters: topology, learning rate'],
              ['Works with continuous inputs and outputs', 'Poor interpretability — a “black box”'],
              ['Parallel by nature', 'May get stuck in a local minimum'],
            ],
          },
        },
        { tip: 'Rule-extraction techniques can turn a trained network into IF–THEN rules to reduce the black-box problem.' },
      ],
      example: {
        title: 'One unit, forward pass',
        input: 'Inputs O₁ = 1, O₂ = 0, O₃ = 1; weights w₁ = 0.2, w₂ = 0.4, w₃ = −0.5; bias θ = −0.4',
        output: `I = (1)(0.2) + (0)(0.4) + (1)(−0.5) + (−0.4) = −0.7
O = 1 / (1 + e^0.7) = 0.332`,
        explanation: 'This is exactly what every hidden and output unit does in the forward pass. Backpropagation then uses the error at the output to adjust w₁, w₂, w₃ and θ.',
      },
      keyPoints: [
        'Backpropagation trains multilayer feed-forward neural networks.',
        'Forward pass: weighted sum plus bias, then sigmoid.',
        'Backward pass: error computed at output, propagated to hidden layers.',
        'Weights updated by learning rate × error × input.',
        'Accurate and noise-tolerant but slow to train and hard to interpret.',
      ],
      importantTerms: [
        { term: 'Neuron (unit)', meaning: 'Computes a weighted sum of inputs and applies an activation function.' },
        { term: 'Sigmoid function', meaning: '1 / (1 + e^(−I)); squashes values into 0–1.' },
        { term: 'Learning rate', meaning: 'Constant (0–1) controlling the size of weight updates.' },
        { term: 'Epoch', meaning: 'One pass through all training tuples.' },
      ],
      examPoints: [
        'Draw the three-layer network.',
        'Write the steps: initialise, forward, backpropagate error, update, terminate.',
        'Write the formulas for net input, output, errors and weight update.',
        'List strengths and weaknesses.',
      ],
      questions: [
        {
          prompt: 'Explain classification by backpropagation.',
          plan: ANSWER_PLAN(
            'Neural network algorithm that propagates errors backwards to adjust weights',
            'Input → hidden → output layers',
            'Initialise, forward pass (sigmoid), error terms, weight/bias updates, termination',
            'One-unit forward pass calculation',
            'Noise-tolerant but slow and black-box',
          ),
        },
      ],
      keywords: ['backpropagation', 'feed-forward', 'input layer', 'hidden layer', 'output layer', 'weight', 'bias', 'sigmoid', 'learning rate', 'epoch'],
      remember: [
        { prompt: 'Which direction does the error travel?', answer: 'Backwards: from the output layer to the hidden layers.' },
        { prompt: 'Main weakness of neural networks?', answer: 'Poor interpretability (and long training time).' },
      ],
    },

    // ------------------------------------------------------------------
    'support-vector-machine': {
      difficulty: 'hard',
      intro: 'SVMs find the safest possible boundary between two classes — the one with the widest gap.',
      definition:
        'A Support Vector Machine (SVM) is a classification method for both linear and nonlinear data. It finds the **maximum marginal hyperplane (MMH)** — the separating boundary with the largest margin between the classes. The training tuples closest to this boundary are the **support vectors**. Nonlinear data is mapped to a higher dimension using **kernel functions**.',
      simpleExplanation: {
        text: 'Many lines can separate two groups of points. SVM picks the one that stays as far as possible from both groups. Only the few points touching the margin (support vectors) decide where the line goes.',
        analogy: 'Building a road between two villages: the best road runs exactly through the middle of the widest empty strip, so it is as far as possible from houses on both sides.',
      },
      visual: {
        type: 'comparison',
        title: 'Two cases SVM handles',
        items: [
          {
            title: 'Linearly separable',
            tone: 'good',
            points: ['A straight line/plane separates classes', 'Find the maximum-margin hyperplane', 'W · X + b = 0', 'Support vectors lie on the margin'],
          },
          {
            title: 'Not linearly separable',
            tone: 'accent',
            points: ['No straight boundary exists', 'Map data to a higher dimension', 'Kernel trick avoids explicit mapping', 'A linear boundary there is curved here'],
          },
        ],
      },
      explanation: [
        { heading: 'The linearly separable case' },
        'A separating hyperplane is written **W · X + b = 0**, where W is a weight vector and b a bias. The **margin** is the distance between the hyperplane and the closest tuples of each class. SVM chooses W and b to **maximise the margin** — this is a constrained (convex) quadratic optimisation problem.',
        {
          list: [
            'Tuples on the margin boundaries are the **support vectors**.',
            'Moving or removing any other tuple does not change the hyperplane.',
            'A larger margin usually means better accuracy on new data.',
          ],
        },
        { heading: 'The nonlinear case: kernels' },
        'Transform the data into a higher-dimensional space where it becomes linearly separable, then find the MMH there. **Kernel functions** compute the needed dot products directly in the original space (the **kernel trick**), avoiding expensive transformations.',
        {
          table: {
            columns: ['Kernel', 'Form'],
            rows: [
              ['Polynomial of degree h', 'K(Xᵢ, Xⱼ) = (Xᵢ · Xⱼ + 1)ʰ'],
              ['Gaussian radial basis function', 'K(Xᵢ, Xⱼ) = e^(−‖Xᵢ − Xⱼ‖² / 2σ²)'],
              ['Sigmoid', 'K(Xᵢ, Xⱼ) = tanh(κ Xᵢ · Xⱼ − δ)'],
            ],
          },
        },
        { heading: 'Strengths and weaknesses' },
        {
          list: [
            '✓ Highly accurate; models complex nonlinear boundaries.',
            '✓ Less prone to overfitting; the model is described by the support vectors (compact).',
            '✗ Training can be slow on very large data sets.',
            '✗ Basic SVM is binary; multiple classes need combinations such as one-versus-rest.',
          ],
        },
      ],
      example: {
        title: 'SVM in practice',
        input: 'Handwritten digit images (pixels as attributes), classes 0–9.',
        output: `Kernel        : Gaussian RBF
Strategy      : 10 one-versus-rest SVMs
Model stored  : only the support vectors of each SVM`,
        explanation: 'Digit recognition is a classic SVM application: the data is not linearly separable in pixel space, but an RBF kernel separates it well.',
      },
      keyPoints: [
        'SVM finds the maximum marginal hyperplane between classes.',
        'Support vectors are the training tuples closest to the boundary.',
        'Hyperplane: W · X + b = 0; maximising the margin is a quadratic optimisation.',
        'Kernels (polynomial, RBF, sigmoid) handle nonlinear data.',
        'Accurate and robust to overfitting, but training can be slow.',
      ],
      importantTerms: [
        { term: 'Hyperplane', meaning: 'A decision boundary: a line in 2-D, a plane in 3-D, and so on.' },
        { term: 'Margin', meaning: 'Distance between the hyperplane and the nearest tuples of each class.' },
        { term: 'Support vectors', meaning: 'Training tuples lying on the margin; they define the hyperplane.' },
        { term: 'Kernel trick', meaning: 'Computing higher-dimensional dot products without explicit mapping.' },
      ],
      examPoints: [
        'Define SVM, MMH and support vectors.',
        'Explain the linearly separable case with W · X + b = 0.',
        'Explain nonlinear mapping and list kernel functions.',
        'State advantages and disadvantages.',
      ],
      questions: [
        {
          prompt: 'Explain Support Vector Machines for linearly and nonlinearly separable data.',
          plan: ANSWER_PLAN(
            'Classifier that finds the maximum marginal hyperplane',
            'Linear vs nonlinear comparison (draw two classes, the hyperplane and margins)',
            'Margin, support vectors, optimisation; mapping to higher dimension; kernels',
            'Digit recognition with RBF kernel',
            'Accurate, compact model; slow training; binary by default',
          ),
        },
      ],
      keywords: ['SVM', 'hyperplane', 'maximum marginal hyperplane', 'margin', 'support vectors', 'kernel', 'kernel trick', 'polynomial kernel', 'RBF kernel', 'nonlinear'],
      remember: [
        { prompt: 'Which tuples define the SVM boundary?', answer: 'The support vectors.' },
        { prompt: 'How does SVM handle nonlinear data?', answer: 'Maps it to a higher dimension using kernel functions.' },
      ],
    },
  },
}
