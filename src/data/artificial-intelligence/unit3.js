// Foundations of Artificial Intelligence — Unit III: Knowledge Representation and Planning.
// Topic ids match the syllabus outline in ../subjects.js (24CSU5DA).
// Textbook: Russell & Norvig, AI – A Modern Approach, 4th ed., Chapters 10–11.
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
    'Unit III is about knowing and planning. Knowledge representation decides how an agent stores facts about categories, objects, events and beliefs, and how it reasons with defaults. Automated planning then uses such representations to build action sequences that reach goals — even with time limits, resources and uncertainty.',

  map: [
    { label: 'Organise the world', topics: ['ontological-engineering', 'categories-and-objects'] },
    { label: 'Time and minds', topics: ['events', 'mental-objects-and-modal-logic'] },
    { label: 'Reason with categories', topics: ['reasoning-systems-for-categories', 'reasoning-with-default-information'] },
    { label: 'Classical planning', topics: ['definition-of-classical-planning', 'algorithms-for-classical-planning', 'heuristics-for-planning'] },
    {
      label: 'Planning in the real world',
      topics: ['hierarchical-planning', 'planning-and-acting-in-nondeterministic-domains', 'time-schedules-and-resources', 'analysis-of-planning-approaches'],
    },
  ],

  topics: {
    // ------------------------------------------------------------------
    'ontological-engineering': {
      difficulty: 'medium',
      intro: 'Before an agent can reason about the world, someone must decide what kinds of things exist in it.',
      definition:
        'Ontological engineering is the process of building **ontologies** — general, organised frameworks of concepts such as events, time, physical objects and beliefs. The general framework at the top is called the **upper ontology**; specific domains add detail beneath it.',
      simpleExplanation: {
        text: 'An ontology is a big, organised vocabulary of “what exists” and how those things relate. The **upper ontology** holds the most general ideas (Anything → objects, events, places…). Specialised knowledge, such as medicine or electronics, plugs in underneath.',
        analogy: 'Like a library classification system: the top shelves are general (Science, Arts), and every specific book fits somewhere beneath them.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Upper ontology of the world',
        root: 'Anything',
        children: [
          { label: 'AbstractObjects', children: ['Sets', 'Numbers', 'RepresentationalObjects'] },
          { label: 'RepresentationalObjects', note: 'under AbstractObjects', children: ['Categories', 'Sentences', 'Measurements — Times, Weights'] },
          { label: 'GeneralizedEvents', children: ['Intervals — Moments', 'Places', 'PhysicalObjects', 'Processes'] },
          { label: 'PhysicalObjects', note: 'under GeneralizedEvents', children: ['Things — Animals, Agents, Humans', 'Stuff — Solid, Liquid, Gas'] },
        ],
      },
      explanation: [
        { heading: 'Properties of a general-purpose ontology' },
        {
          list: [
            'It should be applicable in **any special-purpose domain** (with domain-specific axioms added).',
            'It should be able to **combine different areas of knowledge**, because real problems mix several domains at once.',
          ],
        },
        { heading: 'Ways to build an ontology' },
        {
          list: [
            'By a team of trained ontologists and logicians — **CYC**.',
            'By importing categories and facts from existing databases — **DBpedia** from Wikipedia.',
            'By parsing text documents and extracting information — **TextRunner**.',
            'By enticing unskilled people to enter commonsense knowledge — **ConceptNet** (crowd-sourcing).',
          ],
        },
        { note: 'Real ontologies use simplified views: e.g. ignore time for most physical facts unless needed.' },
      ],
      example: {
        title: 'Where does “Rex the dog” fit?',
        input: 'Classify Rex in the upper ontology.',
        output: `Anything
 └ GeneralizedEvents
    └ PhysicalObjects
       └ Things
          └ Animals
             └ Dogs ← Rex ∈ Dogs`,
        explanation: 'Because Rex is a PhysicalObject, everything known about physical objects (has a location, a mass…) applies to Rex automatically.',
      },
      keyPoints: [
        'Ontology = organised framework of concepts.',
        'Upper ontology = the most general concepts at the top.',
        'General-purpose ontologies must work across domains and combine them.',
        'Built by experts (CYC), databases (DBpedia), text parsing (TextRunner) or crowds (ConceptNet).',
      ],
      importantTerms: [
        { term: 'Ontology', meaning: 'A formal description of the kinds of things that exist and their relations.' },
        { term: 'Upper ontology', meaning: 'The general framework of concepts at the top of the hierarchy.' },
        { term: 'Ontological engineering', meaning: 'Designing and building ontologies.' },
      ],
      examPoints: [
        'Define ontology and upper ontology.',
        'Draw the **upper ontology tree** (Anything → AbstractObjects, GeneralizedEvents …).',
        'List the two properties of a general-purpose ontology.',
        'Name the four ways of building ontologies with an example each.',
      ],
      questions: [
        {
          prompt: 'What is ontological engineering? Explain the upper ontology of the world.',
          plan: ANSWER_PLAN(
            'Building general frameworks of concepts',
            'Upper ontology tree',
            'General-purpose properties; four ways to build ontologies',
            'Rex ∈ Dogs inherits PhysicalObject facts',
            'CYC, DBpedia, TextRunner, ConceptNet',
          ),
        },
      ],
      keywords: ['ontology', 'upper ontology', 'general-purpose', 'CYC', 'DBpedia', 'TextRunner', 'ConceptNet'],
      remember: [
        { prompt: 'What is the root of the upper ontology?', answer: 'Anything.' },
        { prompt: 'Which ontology was built by trained ontologists?', answer: 'CYC.' },
        { prompt: 'Which ontology is built from Wikipedia?', answer: 'DBpedia.' },
      ],
    },

    // ------------------------------------------------------------------
    'categories-and-objects': {
      difficulty: 'medium',
      intro: 'Most reasoning happens at the level of categories — we buy “a basketball”, not one particular ball.',
      definition:
        'Organising objects into **categories** is central to knowledge representation. In first-order logic a category can be a predicate (`Basketball(b)`) or **reified** as an object (`Basketballs`), allowing statements like `Member(b, Basketballs)` and `Subset(Basketballs, Balls)`. Categories form **taxonomies** where subclasses inherit properties.',
      simpleExplanation: {
        text: 'Categories let us reason in groups. If all Food is Edible and Apples ⊂ Fruit ⊂ Food, then any apple is edible — that is **inheritance**. Objects can also be made of parts (**PartOf**), measured (**Length**), and be either countable **things** or uncountable **stuff**.',
        analogy: 'Knowing that something is a “mobile phone” immediately tells you it has a screen and a battery — you inherit facts from the category.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Relations between categories',
        root: 'Categories',
        children: [
          { label: 'Membership', children: ['Member(BB9, Basketballs)'] },
          { label: 'Subclass', children: ['Subset(Basketballs, Balls)'] },
          { label: 'Disjoint', children: ['Disjoint({Animals, Vegetables})'] },
          { label: 'Exhaustive decomposition', children: ['{Americans, Canadians, Mexicans} of NorthAmericans'] },
          { label: 'Partition', children: ['disjoint + exhaustive: {Male, Female} of Animals'] },
        ],
      },
      explanation: [
        { heading: 'Facts we can state about categories' },
        {
          list: [
            'An object is a member of a category — `BB9 ∈ Basketballs`.',
            'A category is a subclass of another — `Basketballs ⊂ Balls`.',
            'All members have a property — `(x ∈ Basketballs) ⇒ Spherical(x)`.',
            'A category as a whole has a property — `Dogs ∈ DomesticatedSpecies`.',
          ],
        },
        { heading: 'Physical composition' },
        '`PartOf(Bucharest, Romania)`, `PartOf(Romania, Europe)` — PartOf is **transitive** and **reflexive**. `BunchOf({Apple1, Apple2, Apple3})` describes a composite object made of parts without fixed structure.',
        { heading: 'Measurements' },
        'Quantitative measures are values of properties: `Length(L1) = Inches(1.5) = Centimeters(3.81)`. Unit functions convert between units. Non-numeric measures can still be ordered: `Difficulty(E1) > Difficulty(E2)`.',
        { heading: 'Things vs stuff' },
        {
          table: {
            columns: ['', 'Things (count nouns)', 'Stuff (mass nouns)'],
            rows: [
              ['Examples', 'apple, car, aardvark', 'butter, water, sand'],
              ['Divide it', 'Half an apple is not an apple', 'Half the butter is still butter'],
              ['Property type', '**Extrinsic** — belong to the whole', '**Intrinsic** — belong to every piece'],
            ],
          },
        },
      ],
      example: {
        title: 'Inheritance in a taxonomy',
        input: 'Facts: Apples ⊂ Fruit, Fruit ⊂ Food, ∀x x ∈ Food ⇒ Edible(x), A1 ∈ Apples',
        output: `A1 ∈ Apples ⊂ Fruit ⊂ Food
⇒ A1 ∈ Food
⇒ Edible(A1)`,
        explanation: 'The property “edible” was stated once for Food and inherited all the way down to one specific apple.',
      },
      keyPoints: [
        'Reification turns a category into an object you can talk about.',
        'Member (∈) and Subset (⊂) relations build taxonomies.',
        'Subclasses inherit properties from superclasses.',
        'Disjoint, exhaustive decomposition, partition.',
        'PartOf for composition; measures for quantities.',
        'Things are countable; stuff is divisible (intrinsic properties).',
      ],
      importantTerms: [
        { term: 'Reification', meaning: 'Treating a category or predicate as an object.' },
        { term: 'Taxonomy', meaning: 'A hierarchy of categories linked by subclass relations.' },
        { term: 'Partition', meaning: 'A disjoint and exhaustive decomposition.' },
        { term: 'Intrinsic property', meaning: 'Holds for every part of a substance (density, colour).' },
      ],
      examPoints: [
        'Explain **reification**, Member and Subset with notation.',
        'Define disjoint, exhaustive decomposition and partition with examples.',
        'Explain PartOf, measurements and things vs stuff.',
      ],
      questions: [
        {
          prompt: 'How are categories and objects represented? Explain with examples.',
          plan: ANSWER_PLAN(
            'Grouping objects into categories in first-order logic',
            'Taxonomy tree with inheritance',
            'Member, Subset, disjoint, partition, PartOf, measurements, things vs stuff',
            'Apples ⊂ Fruit ⊂ Food ⇒ Edible(A1)',
            'Inheritance; intrinsic vs extrinsic properties',
          ),
        },
      ],
      keywords: ['category', 'reification', 'Member', 'Subset', 'taxonomy', 'inheritance', 'partition', 'PartOf', 'intrinsic', 'extrinsic'],
      remember: [
        { prompt: 'What is a partition?', answer: 'A decomposition that is both disjoint and exhaustive.' },
        { prompt: 'Is “butter” a thing or stuff?', answer: 'Stuff — any part of butter is still butter.' },
        { prompt: 'What does reification mean?', answer: 'Turning a category into an object.' },
      ],
    },

    // ------------------------------------------------------------------
    'events': {
      difficulty: 'hard',
      intro: 'Facts change over time. Event calculus lets an agent say what is true when.',
      definition:
        '**Event calculus** represents a changing world using **fluents** (facts that change, e.g. `At(Shankar, Berkeley)`) and **events** (things that happen over time intervals). Predicates such as `T(f, t)`, `Happens(e, i)`, `Initiates(e, f, t)` and `Terminates(e, f, t)` describe when fluents hold.',
      simpleExplanation: {
        text: 'An event, like a flight, **starts** some facts (now in New York) and **ends** others (no longer in San Francisco). A fact stays true until some event ends it. Time is described with **intervals** that can meet, overlap, or come before or after one another.',
        analogy: 'Switching on a light **initiates** “light is on”; it stays on until switching off **terminates** it.',
      },
      visual: {
        type: 'comparison',
        title: 'Event calculus predicates',
        table: {
          columns: ['Predicate', 'Meaning'],
          rows: [
            ['`T(f, t)`', 'Fluent f is true at time t'],
            ['`Happens(e, i)`', 'Event e happens over time interval i'],
            ['`Initiates(e, f, t)`', 'Event e causes fluent f to start at t'],
            ['`Terminates(e, f, t)`', 'Event e causes fluent f to stop at t'],
            ['`Clipped(f, i)`', 'f stops being true at some point in interval i'],
            ['`Restored(f, i)`', 'f becomes true at some point in interval i'],
          ],
        },
      },
      explanation: [
        { heading: 'Events as objects' },
        'An event such as a flight is reified: `E1 ∈ Flyings ∧ Flyer(E1, Shankar) ∧ Origin(E1, SF) ∧ Destination(E1, DC)`. This lets us add any number of details without changing the predicate.',
        { heading: 'Time intervals' },
        '**Moments** have zero duration; **extended intervals** have a Begin and an End. Allen’s interval relations compare them:',
        {
          table: {
            columns: ['Relation', 'Meaning'],
            rows: [
              ['Meet(i, j)', 'i ends exactly when j begins'],
              ['Before(i, j)', 'i ends before j begins'],
              ['During(i, j)', 'i lies inside j'],
              ['Overlap(i, j)', 'i starts first and they share some time'],
              ['Starts / Finishes(i, j)', 'share the start / end point'],
              ['Equals(i, j)', 'same start and end'],
            ],
          },
        },
        { heading: 'Processes and fluents as objects' },
        'A **process** (liquid event) is an event in which every sub-interval is also the same event — any part of “Flying” is still flying. Objects can also change over time: `President(USA)` refers to different people in different intervals.',
      ],
      example: {
        title: 'Shankar flies from SF to DC',
        input: 'E1: Flyer = Shankar, Origin = SF, Destination = DC, happens over interval i',
        output: `Happens(E1, i)
Terminates(E1, At(Shankar, SF), Begin(i))
Initiates(E1, At(Shankar, DC), End(i))
⇒ T(At(Shankar, DC), t) for t after End(i), until another event clips it`,
        explanation: 'The flight ends one fluent and starts another. The new fact persists until something changes it.',
      },
      keyPoints: [
        'Fluents = facts that change; events = things that happen.',
        'Event calculus: T, Happens, Initiates, Terminates, Clipped, Restored.',
        'Events are reified so details can be added freely.',
        'Intervals: moments and extended intervals; Allen relations.',
        'Processes are liquid events; objects like President(USA) vary over time.',
      ],
      importantTerms: [
        { term: 'Fluent', meaning: 'A fact whose truth changes over time.' },
        { term: 'Event calculus', meaning: 'A logic for reasoning about events and fluents over time.' },
        { term: 'Process (liquid event)', meaning: 'An event whose every sub-interval is the same kind of event.' },
        { term: 'Moment', meaning: 'A time interval of zero duration.' },
      ],
      examPoints: [
        'Define **fluent** and **event**.',
        'List the **event calculus predicates** with meanings.',
        'Explain interval relations: Meet, Before, During, Overlap.',
        'Give the flight example.',
      ],
      questions: [
        {
          prompt: 'Explain how events are represented using event calculus.',
          plan: ANSWER_PLAN(
            'Fluents and events over time intervals',
            'Timeline of an interval with Begin/End and the fluents',
            'T, Happens, Initiates, Terminates, Clipped, Restored; interval relations',
            'Shankar’s flight from SF to DC',
            'Processes, moments, fluents as objects',
          ),
        },
      ],
      keywords: ['event calculus', 'fluent', 'Happens', 'Initiates', 'Terminates', 'Clipped', 'time interval', 'Meet', 'process'],
      remember: [
        { prompt: 'What is a fluent?', answer: 'A fact that can change over time.' },
        { prompt: 'Meaning of Initiates(e, f, t)?', answer: 'Event e makes fluent f start to hold at time t.' },
        { prompt: 'Example of a liquid event?', answer: 'Flying — any part of a flight is still flying.' },
      ],
    },

    // ------------------------------------------------------------------
    'mental-objects-and-modal-logic': {
      difficulty: 'hard',
      intro: 'Agents need to reason about what they and others know or believe. Ordinary logic cannot do that safely.',
      definition:
        '**Mental objects** are knowledge and beliefs held by agents. Relations like `Believes`, `Knows` and `Wants` are **propositional attitudes**. Because they are **referentially opaque**, they are handled with **modal logic**, whose modal operators (e.g. **K**ₐP — “agent A knows P”) are interpreted using **possible worlds** linked by an **accessibility relation**.',
      simpleExplanation: {
        text: 'In normal logic, if Superman = Clark, then anything true of Superman is true of Clark. But Lois **knows** Superman can fly and does **not know** Clark can fly. Knowledge sentences break normal substitution, so we need a special logic — **modal logic**.',
        analogy: 'Your friend knows the class topper’s nickname but not their real name. Same person — different knowledge.',
      },
      visual: {
        type: 'comparison',
        title: 'Why ordinary logic fails for beliefs',
        items: [
          {
            title: 'Referential transparency',
            tone: 'muted',
            points: ['Ordinary logic', 'Equal terms can be swapped', 'Superman = Clark ⇒ CanFly(Clark)'],
          },
          {
            title: 'Referential opacity',
            tone: 'accent',
            points: ['Beliefs and knowledge', 'Swapping changes the meaning', 'K_Lois CanFly(Superman) but not K_Lois CanFly(Clark)'],
          },
        ],
      },
      explanation: [
        { heading: 'Modal logic' },
        'Modal logic adds **modal operators** that take sentences as arguments. **K**ₐP means “A knows P”. The semantics uses **possible worlds**: A knows P if P is true in **every world accessible** to A — every world consistent with what A knows.',
        { heading: 'Properties of knowledge' },
        {
          list: [
            'Agents can know about their own knowledge: K_Lois(K_Clark CanFly(Superman)) is a valid sentence.',
            '**Truth axiom:** if an agent knows P, then P is true — (K_a P) ⇒ P.',
            '**Logical omniscience** problem: modal logic assumes an agent knows every consequence of what it knows, which is unrealistic.',
          ],
        },
        { heading: 'Other modal logics' },
        {
          list: [
            '**Modal logic of possibility/necessity** — ◇P (possibly P), □P (necessarily P).',
            '**Temporal logic** — X P (next), F P (eventually), G P (always), P U Q (P until Q).',
            '**Deontic logic** — obligation and permission.',
          ],
        },
      ],
      example: {
        title: 'Possible worlds for Lois',
        input: 'Lois knows Superman can fly; she does not know whether Clark is Superman.',
        output: `World w1: Superman = Clark,  CanFly(Superman)  ✓
World w2: Superman ≠ Clark,  CanFly(Superman)  ✓
CanFly(Superman) true in all worlds  → K_Lois CanFly(Superman)
CanFly(Clark) true only in w1        → NOT K_Lois CanFly(Clark)`,
        explanation: 'Knowledge = true in every world the agent considers possible.',
      },
      keyPoints: [
        'Mental objects: beliefs, knowledge, desires.',
        'Propositional attitudes are referentially opaque.',
        'Modal logic uses operators like K_A P.',
        'Semantics: possible worlds + accessibility relation.',
        'Knows P ⇒ P (truth axiom); logical omniscience is a limitation.',
      ],
      importantTerms: [
        { term: 'Propositional attitude', meaning: 'An agent’s relation to a proposition: believes, knows, wants.' },
        { term: 'Referential opacity', meaning: 'Equal terms cannot be substituted without changing truth.' },
        { term: 'Modal operator', meaning: 'Operator taking a sentence, e.g. K (knows), □ (necessarily).' },
        { term: 'Possible worlds', meaning: 'Alternative situations an agent cannot rule out.' },
      ],
      examPoints: [
        'Define mental objects and propositional attitudes.',
        'Explain **referential transparency vs opacity** with Superman/Clark.',
        'Explain modal logic: K operator, possible worlds, accessibility.',
        'Mention logical omniscience and temporal logic.',
      ],
      questions: [
        {
          prompt: 'Explain mental objects and modal logic with an example.',
          plan: ANSWER_PLAN(
            'Reasoning about beliefs and knowledge using modal operators',
            'Possible-worlds diagram for Lois',
            'Propositional attitudes; opacity; K operator; accessibility relation',
            'Superman / Clark Kent',
            'Truth axiom; logical omniscience; temporal logic',
          ),
        },
      ],
      keywords: ['mental objects', 'propositional attitude', 'referential opacity', 'modal logic', 'K operator', 'possible worlds', 'accessibility relation'],
      remember: [
        { prompt: 'What does K_A P mean?', answer: 'Agent A knows P.' },
        { prompt: 'When does A know P in possible-worlds semantics?', answer: 'When P is true in every world accessible to A.' },
        { prompt: 'Why can’t we substitute Clark for Superman in beliefs?', answer: 'Belief is referentially opaque.' },
      ],
    },

    // ------------------------------------------------------------------
    'reasoning-systems-for-categories': {
      difficulty: 'medium',
      intro: 'Semantic networks and description logics are the two practical ways to store and reason with category knowledge.',
      definition:
        'Reasoning systems for categories are specialised systems for organising and reasoning with categories. **Semantic networks** draw objects and categories as nodes connected by labelled links and support inheritance; **description logics** give a formal language for defining categories and answering **subsumption** and **classification** queries efficiently.',
      simpleExplanation: {
        text: 'A **semantic network** is a picture of knowledge: boxes for things and categories, arrows for relationships like “is a” and “member of”. To find a property, follow the arrows upward. **Description logics** do the same job with precise definitions so a computer can check “is this category inside that one?”.',
        analogy: 'A family tree with notes on each person: to find a trait, look at the person, then their parents, then grandparents.',
      },
      visual: {
        type: 'flow',
        title: 'Semantic network — inheritance path',
        steps: [
          { label: 'Mary', note: 'MemberOf → FemalePersons' },
          { label: 'FemalePersons', note: 'SubsetOf → Persons' },
          { label: 'Persons', note: 'SubsetOf → Mammals' },
          { label: 'Persons: Legs = 2', note: 'default inherited by Mary' },
        ],
      },
      explanation: [
        { heading: 'Semantic networks' },
        {
          list: [
            '**Nodes** are objects or categories; **links** are relations.',
            '**MemberOf** links an object to a category; **SubsetOf** links categories.',
            '**Inheritance**: follow MemberOf then SubsetOf links upward to find a property.',
            '**Multiple inheritance**: an object in two categories may inherit conflicting values.',
            '**Default values**: Persons have 2 legs, but `John: Legs = 1` overrides the default.',
          ],
        },
        { trap: 'Semantic networks easily show **binary** relations; n-ary relations (Fly(Shankar, NY, NewDelhi, Yesterday)) must be reified as event nodes.' },
        { heading: 'Description logics' },
        'Description logics (e.g. CLASSIC) describe definitions and properties of categories. Example: `Bachelor = And(Unmarried, Adult, Male)`. Main inference tasks:',
        {
          list: [
            '**Subsumption** — is one category a subset of another (by definition)?',
            '**Classification** — does an object belong to a category?',
            '**Consistency** — is a category’s definition satisfiable?',
          ],
        },
        'They are designed so these tasks are **tractable** (polynomial time), unlike full first-order logic.',
      ],
      example: {
        title: 'Inheritance with an exception',
        input: 'Persons: Legs = 2. John MemberOf MalePersons ⊂ Persons. John: Legs = 1.',
        output: `Query: Legs(Mary)  → follow links up → Persons → 2
Query: Legs(John)  → John has its own value → 1 (overrides default)`,
        explanation: 'The most specific information wins — this is how semantic networks handle defaults.',
      },
      keyPoints: [
        'Semantic networks: nodes + labelled links (MemberOf, SubsetOf).',
        'Inheritance by following links upward.',
        'Defaults can be overridden by more specific values.',
        'Description logics: formal category definitions.',
        'Key tasks: subsumption, classification, consistency.',
      ],
      importantTerms: [
        { term: 'Semantic network', meaning: 'A graph of objects and categories with labelled relation links.' },
        { term: 'Description logic', meaning: 'A logic for defining categories and reasoning about them efficiently.' },
        { term: 'Subsumption', meaning: 'Checking whether one category is a subset of another.' },
        { term: 'Classification', meaning: 'Checking whether an object belongs to a category.' },
      ],
      examPoints: [
        'Draw a **semantic network** with MemberOf, SubsetOf and a default value.',
        'Explain inheritance and multiple inheritance.',
        'Define description logic and its three inference tasks.',
      ],
      questions: [
        {
          prompt: 'Explain semantic networks and description logics.',
          plan: ANSWER_PLAN(
            'Specialised systems for reasoning with categories',
            'Semantic network: Mary, John, Persons, Mammals with Legs',
            'Links, inheritance, defaults; DL definitions and inference tasks',
            'Legs(John) = 1 overriding default 2',
            'Subsumption, classification, consistency; tractable',
          ),
        },
      ],
      keywords: ['semantic network', 'MemberOf', 'SubsetOf', 'inheritance', 'default value', 'description logic', 'subsumption', 'classification'],
      remember: [
        { prompt: 'Which link connects an object to its category?', answer: 'MemberOf.' },
        { prompt: 'Main inference tasks of description logics?', answer: 'Subsumption and classification (and consistency).' },
        { prompt: 'How are defaults overridden?', answer: 'A more specific value on the object wins.' },
      ],
    },

    // ------------------------------------------------------------------
    'reasoning-with-default-information': {
      difficulty: 'hard',
      intro: 'Real reasoning uses assumptions that may later be withdrawn: “birds fly” — until you learn it is a penguin.',
      definition:
        'Reasoning with default information is **nonmonotonic** reasoning: conclusions drawn by default can be retracted when new evidence arrives. Two main formalisms are **circumscription** and **default logic**. **Truth maintenance systems** (TMS) support **belief revision** by tracking why each belief is held.',
      simpleExplanation: {
        text: 'Classical logic is **monotonic**: adding facts never removes conclusions. Common sense is not like that. Hearing “Tweety is a bird” you conclude it flies; hearing “Tweety is a penguin” you take that back. Default reasoning formalises such “jump to conclusions, but be ready to change your mind” thinking.',
        analogy: 'You assume the shop is open on a weekday — until you see a holiday notice on the door.',
      },
      visual: {
        type: 'process',
        title: 'Nonmonotonic reasoning in action',
        steps: [
          { label: 'Know: Bird(Tweety)', detail: 'default: birds fly' },
          { label: 'Conclude: Flies(Tweety)', detail: 'assumed, not proved' },
          { label: 'Learn: Penguin(Tweety)', detail: 'new evidence' },
          { label: 'Retract: Flies(Tweety)', detail: 'belief revision via TMS' },
        ],
      },
      explanation: [
        { heading: 'Circumscription' },
        'A stronger closed-world assumption. Mark certain predicates as **abnormal** and assume they are as false as possible: `Bird(x) ∧ ¬Abnormal₁(x) ⇒ Flies(x)`. Unless told Tweety is abnormal, we conclude it flies. Circumscription is a form of **model preference** — prefer models with fewest abnormal objects.',
        { heading: 'Default logic' },
        'Uses **default rules**: `Bird(x) : Flies(x) / Flies(x)` — “if Bird(x) is true and Flies(x) is consistent with what we know, conclude Flies(x)”. A maximal set of consequences is called an **extension**.',
        { note: '**Nixon diamond:** Quakers are pacifists by default; Republicans are not. Nixon is both — so there are two extensions, one where he is a pacifist and one where he is not.' },
        { heading: 'Truth maintenance systems' },
        {
          list: [
            '**Belief revision** — updating beliefs when a fact is added or retracted.',
            '**JTMS** (justification-based) — stores, for each sentence, the justification (the sentences it was derived from); retracting a premise removes only conclusions that depended on it.',
            '**ATMS** (assumption-based) — keeps track of which assumptions make each sentence true, so it can switch between hypothetical worlds quickly.',
          ],
        },
      ],
      example: {
        title: 'Default logic on Tweety',
        input: 'Default: Bird(x) : Flies(x) / Flies(x). Facts: Bird(Tweety). Later: Penguin(Tweety), Penguin(x) ⇒ ¬Flies(x).',
        output: `Before: Flies(Tweety) is consistent → conclude Flies(Tweety)
After : ¬Flies(Tweety) is derived → default blocked → retract Flies(Tweety)`,
        explanation: 'Adding a fact removed a conclusion — the hallmark of nonmonotonic reasoning.',
      },
      keyPoints: [
        'Default reasoning is nonmonotonic.',
        'Circumscription: minimise abnormal predicates.',
        'Default logic: rules with prerequisite, justification, conclusion.',
        'Extensions = maximal consistent sets of conclusions.',
        'TMS (JTMS, ATMS) supports belief revision.',
      ],
      importantTerms: [
        { term: 'Nonmonotonic', meaning: 'Adding facts can remove earlier conclusions.' },
        { term: 'Circumscription', meaning: 'Assume abnormal predicates are false unless forced.' },
        { term: 'Default rule', meaning: 'P : J / C — if P holds and J is consistent, conclude C.' },
        { term: 'Truth maintenance system', meaning: 'Tracks justifications so beliefs can be revised.' },
      ],
      examPoints: [
        'Contrast **monotonic** and **nonmonotonic** reasoning.',
        'Explain circumscription with the Abnormal predicate.',
        'Write a **default rule** and explain extensions; mention the Nixon diamond.',
        'Explain JTMS and ATMS briefly.',
      ],
      questions: [
        {
          prompt: 'Explain reasoning with default information. Discuss circumscription, default logic and truth maintenance systems.',
          plan: ANSWER_PLAN(
            'Nonmonotonic reasoning with retractable conclusions',
            'Tweety: conclude → new fact → retract',
            'Circumscription, default rules, extensions, JTMS/ATMS',
            'Tweety the penguin; Nixon diamond',
            'Belief revision; model preference',
          ),
        },
      ],
      keywords: ['default reasoning', 'nonmonotonic', 'circumscription', 'Abnormal', 'default logic', 'extension', 'Nixon diamond', 'JTMS', 'ATMS'],
      remember: [
        { prompt: 'Is default reasoning monotonic?', answer: 'No — it is nonmonotonic.' },
        { prompt: 'What does circumscription minimise?', answer: 'Abnormal predicates.' },
        { prompt: 'What does a JTMS store?', answer: 'Justifications for each belief.' },
      ],
    },

    // ------------------------------------------------------------------
    'definition-of-classical-planning': {
      difficulty: 'medium',
      intro: 'Classical planning describes states and actions in a factored language — PDDL — so one planner can solve many domains.',
      definition:
        'Classical planning is the task of finding a **sequence of actions** to achieve a goal in a **discrete, deterministic, static, fully observable** environment. Problems are written in **PDDL** (Planning Domain Definition Language): states are conjunctions of ground fluents, and actions are **action schemas** with parameters, **preconditions** and **effects**.',
      simpleExplanation: {
        text: 'A state is a list of true facts, such as `At(P1, SFO)`. Anything not listed is false (**closed-world assumption**). An action can be done if its preconditions are true, and doing it **adds** some facts and **deletes** others.',
        analogy: 'A recipe step: “Preheat oven” needs “oven is off” (precondition) and results in “oven is hot” (add) and not “oven is off” (delete).',
      },
      visual: {
        type: 'boxes',
        title: 'Parts of an action schema',
        items: [
          { label: 'Action', value: 'Fly(p, from, to)', tag: 'name + parameters' },
          { label: 'Precondition', value: 'At(p, from) ∧ Plane(p) ∧ Airport(from) ∧ Airport(to)', tag: 'must be true' },
          { label: 'Effect', value: '¬At(p, from) ∧ At(p, to)', tag: 'delete list + add list' },
        ],
      },
      explanation: [
        { heading: 'PDDL basics' },
        {
          list: [
            '**State** — conjunction of ground, function-free atoms (fluents), e.g. `At(Truck1, Melbourne) ∧ At(Truck2, Sydney)`.',
            '**Closed-world assumption** — fluents not mentioned are false.',
            '**Action schema** — name, parameter list, precondition, effect.',
            '**Applicable** — action a is applicable in s if s entails a’s precondition.',
            '**Result** — `RESULT(s, a) = (s − DEL(a)) ∪ ADD(a)`.',
            '**Goal** — a conjunction of literals; any state satisfying it is a goal.',
          ],
        },
        { heading: 'Standard example domains' },
        {
          list: [
            '**Air cargo transport** — Load, Unload, Fly cargo between airports.',
            '**Spare tire problem** — Remove the flat, PutOn the spare.',
            '**Blocks world** — stack blocks using Move(b, x, y) and MoveToTable(b, x).',
          ],
        },
        { note: 'PDDL is a **factored representation**: a state is a set of variables, unlike the atomic states of Unit II search.' },
      ],
      example: {
        title: 'Air cargo problem in PDDL',
        code: `Init(At(C1, SFO) ∧ At(C2, JFK) ∧ At(P1, SFO) ∧ At(P2, JFK)
     ∧ Cargo(C1) ∧ Cargo(C2) ∧ Plane(P1) ∧ Plane(P2)
     ∧ Airport(JFK) ∧ Airport(SFO))
Goal(At(C1, JFK) ∧ At(C2, SFO))

Action(Load(c, p, a),
  PRECOND: At(c, a) ∧ At(p, a) ∧ Cargo(c) ∧ Plane(p) ∧ Airport(a)
  EFFECT:  ¬At(c, a) ∧ In(c, p))`,
        lang: 'text',
        output: `Plan:
Load(C1, P1, SFO), Fly(P1, SFO, JFK), Unload(C1, P1, JFK),
Load(C2, P2, JFK), Fly(P2, JFK, SFO), Unload(C2, P2, SFO)`,
        explanation: 'Each action is applicable because its preconditions hold, and its effects build the next state until the goal holds.',
      },
      keyPoints: [
        'Classical planning: deterministic, fully observable, static, discrete.',
        'PDDL describes initial state, actions and goal.',
        'Action schema = name, parameters, precondition, effect.',
        'RESULT(s, a) = (s − DEL(a)) ∪ ADD(a).',
        'Closed-world assumption: unlisted fluents are false.',
      ],
      importantTerms: [
        { term: 'PDDL', meaning: 'Planning Domain Definition Language.' },
        { term: 'Action schema', meaning: 'A template action with variables, preconditions and effects.' },
        { term: 'Add list / delete list', meaning: 'Positive and negative literals in an action’s effect.' },
        { term: 'Closed-world assumption', meaning: 'Anything not stated true is false.' },
      ],
      examPoints: [
        'Define classical planning and its four environment assumptions.',
        'Explain PDDL: state, action schema, precondition, effect, goal.',
        'Write the **air cargo** or **blocks world** problem.',
        'Give the RESULT formula.',
      ],
      questions: [
        {
          prompt: 'Define classical planning. Explain PDDL with the air cargo example.',
          plan: ANSWER_PLAN(
            'Finding action sequences in deterministic, observable environments',
            'Action schema box: name, PRECOND, EFFECT',
            'States, closed-world assumption, applicability, RESULT',
            'Air cargo Init, Goal, Load/Fly/Unload',
            'Factored representation; add and delete lists',
          ),
        },
      ],
      keywords: ['classical planning', 'PDDL', 'fluent', 'action schema', 'precondition', 'effect', 'add list', 'delete list', 'closed-world assumption'],
      remember: [
        { prompt: 'Expand PDDL.', answer: 'Planning Domain Definition Language.' },
        { prompt: 'Formula for RESULT(s, a)?', answer: '(s − DEL(a)) ∪ ADD(a)' },
        { prompt: 'Three parts of an action schema besides its name?', answer: 'Parameters, precondition, effect.' },
      ],
    },

    // ------------------------------------------------------------------
    'algorithms-for-classical-planning': {
      difficulty: 'hard',
      intro: 'A planning problem can be searched forwards, backwards, or turned into a SAT problem.',
      definition:
        'Algorithms for classical planning include **forward (progression) state-space search**, **backward (regression) relevant-states search**, **planning as Boolean satisfiability (SATPlan)**, and other approaches such as **GraphPlan**, **partial-order planning** and planning as a CSP.',
      simpleExplanation: {
        text: '**Forward** search starts from the initial state and applies actions until the goal holds. **Backward** search starts from the goal and asks “which action could have achieved this?”. **SATPlan** writes the whole problem as a big logic formula and lets a SAT solver find a plan.',
        analogy: 'Solving a maze from the entrance (forward), from the exit (backward), or by writing down all rules and letting a puzzle-solver crack it (SAT).',
      },
      visual: {
        type: 'comparison',
        title: 'Forward vs backward planning',
        items: [
          {
            title: 'Forward — progression',
            tone: 'muted',
            points: ['Starts at the initial state', 'Applies applicable actions', 'Can explore many irrelevant actions', 'Works well with good heuristics'],
          },
          {
            title: 'Backward — regression',
            tone: 'accent',
            points: ['Starts at the goal', 'Considers only relevant actions', 'Lower branching factor', 'Works on sets of states — harder heuristics'],
          },
        ],
      },
      explanation: [
        { heading: 'Forward state-space search' },
        'Any search algorithm from Unit II (e.g. A*) can be used. Problem: huge branching — buying a book by ISBN has 10¹⁰ possible Buy actions. Good **domain-independent heuristics** make forward search the most successful approach today.',
        { heading: 'Backward (regression) search' },
        'Choose a **relevant** action — one whose effect achieves a goal literal and does not negate any other. Regression gives the predecessor description:',
        { code: "g′ = (g − ADD(a)) ∪ PRECOND(a)", lang: 'text' },
        { heading: 'Planning as satisfiability (SATPlan)' },
        {
          list: [
            'Translate the problem into propositional logic for a fixed plan length T.',
            'Add initial state, goal, successor-state axioms and action-exclusion axioms.',
            'Run a SAT solver; if unsatisfiable, increase T and try again.',
            'Read the plan from the actions assigned true.',
          ],
          ordered: true,
        },
        { heading: 'Other approaches' },
        {
          list: [
            '**GraphPlan** — builds a planning graph layer by layer and extracts a plan.',
            '**Partial-order planning (POP)** — keeps actions only partially ordered; adds ordering constraints only where needed (least commitment).',
            '**Planning as CSP** — encode bounded plans as constraint problems.',
          ],
        },
      ],
      example: {
        title: 'One regression step',
        input: 'Goal g = At(C1, JFK). Relevant action: Unload(C1, p, JFK).',
        output: `ADD(a)    = At(C1, JFK)
PRECOND(a) = In(C1, p) ∧ At(p, JFK) ∧ Cargo(C1) ∧ Plane(p) ∧ Airport(JFK)
g′ = In(C1, p) ∧ At(p, JFK) ∧ Cargo(C1) ∧ Plane(p) ∧ Airport(JFK)`,
        explanation: 'The new subgoal says what must be true just before unloading. Regression continues until the initial state satisfies the subgoal.',
      },
      keyPoints: [
        'Forward (progression): initial state → goal.',
        'Backward (regression): goal → initial state using relevant actions.',
        'Regression: g′ = (g − ADD(a)) ∪ PRECOND(a).',
        'SATPlan: encode as SAT, increase plan length until satisfiable.',
        'GraphPlan, partial-order planning, CSP are other methods.',
      ],
      importantTerms: [
        { term: 'Progression', meaning: 'Forward search from the initial state.' },
        { term: 'Regression', meaning: 'Backward search from the goal over relevant actions.' },
        { term: 'Relevant action', meaning: 'An action that achieves a goal literal without undoing another.' },
        { term: 'Partial-order plan', meaning: 'A plan with only the necessary ordering constraints.' },
      ],
      examPoints: [
        'Explain forward and backward search with a **comparison**.',
        'Write the **regression formula**.',
        'List SATPlan steps.',
        'Mention GraphPlan and partial-order planning.',
      ],
      questions: [
        {
          prompt: 'Explain the algorithms used for classical planning.',
          plan: ANSWER_PLAN(
            'Methods that search for plans in PDDL problems',
            'Forward vs backward search diagram',
            'Progression, regression formula, SATPlan, GraphPlan, POP',
            'Regressing At(C1, JFK) through Unload',
            'Forward search with heuristics is most used today',
          ),
        },
      ],
      keywords: ['forward search', 'progression', 'backward search', 'regression', 'relevant action', 'SATPlan', 'GraphPlan', 'partial-order planning'],
      remember: [
        { prompt: 'Regression formula?', answer: 'g′ = (g − ADD(a)) ∪ PRECOND(a)' },
        { prompt: 'Which planning search has the lower branching factor?', answer: 'Backward (regression) search.' },
        { prompt: 'How does SATPlan find a plan?', answer: 'Encode it in logic for length T and run a SAT solver, increasing T if needed.' },
      ],
    },

    // ------------------------------------------------------------------
    'heuristics-for-planning': {
      difficulty: 'hard',
      intro: 'Planners are fast because PDDL’s structure lets them invent heuristics automatically, for any domain.',
      definition:
        'Heuristics for planning are **domain-independent** estimates of the distance from a state to the goal, derived from a **relaxed problem**. Main methods: the **ignore-preconditions** heuristic, the **ignore-delete-lists** heuristic, **state abstraction**, **symmetry reduction** and **decomposition** using subgoal independence.',
      simpleExplanation: {
        text: 'Make the planning problem easier, solve the easy version, and use its cost as the estimate. For example, pretend actions have no preconditions, or pretend actions never delete anything. The easier problem never costs more, so the heuristic stays admissible.',
        analogy: 'Estimating how long tidying a room takes by assuming you never trip over anything — a quick, optimistic guess.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Ways to relax a planning problem',
        root: 'Planning heuristics',
        children: [
          { label: 'Add edges to the graph', children: ['Ignore preconditions', 'Ignore delete lists'] },
          { label: 'Group nodes', children: ['State abstraction', 'Symmetry reduction'] },
          { label: 'Split the problem', children: ['Subgoal independence', 'max or sum of subgoal costs'] },
        ],
      },
      explanation: [
        { heading: 'Ignore-preconditions heuristic' },
        'Drop all preconditions, so every action is always applicable. The number of steps ≈ number of unsatisfied goals (a set-cover problem). For the 8-puzzle this gives the **misplaced tiles** heuristic.',
        { heading: 'Ignore-delete-lists heuristic' },
        'Remove all negative effects. Then actions never undo progress, so the problem becomes monotonic and easier. Hill-climbing with this heuristic powers the **FF** planner.',
        { heading: 'State abstraction' },
        'Map many concrete states to one abstract state by ignoring some fluents — e.g. in air cargo, ignore all packages except the ones in the goal.',
        { heading: 'Symmetry reduction (domain-independent pruning)' },
        'Many states are equivalent: moving block A or identical block B gives the same situation. Prune all but one.',
        { heading: 'Decomposition — subgoal independence' },
        'Split goal G into parts G₁ … Gₙ and estimate each. **max(costᵢ)** is admissible; **sum(costᵢ)** is more accurate but admissible only if the subgoals are independent.',
      ],
      example: {
        title: 'Ignore-preconditions for air cargo',
        input: 'Goal: At(C1, JFK) ∧ At(C2, SFO). Current state: neither holds.',
        output: `Ignore preconditions → one Unload can make each goal true
h(s) = 2 unsatisfied goals → estimate 2 actions
Real plan needs 6 actions → h is admissible (never too large)`,
        explanation: 'The estimate is quick to compute and never overestimates, so it can guide A* safely.',
      },
      keyPoints: [
        'Planning heuristics come from relaxed problems.',
        'Ignore preconditions: count unsatisfied goals.',
        'Ignore delete lists: monotonic progress (FF planner).',
        'State abstraction and symmetry reduction shrink the space.',
        'Subgoal independence: max is admissible; sum if independent.',
      ],
      importantTerms: [
        { term: 'Domain-independent heuristic', meaning: 'Derived automatically from the PDDL description.' },
        { term: 'Ignore-delete-lists', meaning: 'Relaxation where actions never remove fluents.' },
        { term: 'State abstraction', meaning: 'Mapping many states into one by ignoring details.' },
        { term: 'Subgoal independence', meaning: 'Assumption that subgoals can be solved separately.' },
      ],
      examPoints: [
        'Explain why planning heuristics are **domain-independent**.',
        'Describe ignore-preconditions and ignore-delete-lists with examples.',
        'Explain state abstraction and decomposition (max vs sum).',
      ],
      questions: [
        {
          prompt: 'Explain the heuristics used in planning.',
          plan: ANSWER_PLAN(
            'Domain-independent estimates from relaxed problems',
            'Tree of relaxations',
            'Ignore preconditions, ignore delete lists, abstraction, symmetry, decomposition',
            'Air cargo h = 2 unsatisfied goals',
            'Admissible; max vs sum of subgoals',
          ),
        },
      ],
      keywords: ['relaxed problem', 'ignore preconditions', 'ignore delete lists', 'state abstraction', 'symmetry reduction', 'subgoal independence', 'FF planner'],
      remember: [
        { prompt: 'Which relaxation gives the misplaced-tiles heuristic?', answer: 'Ignore preconditions.' },
        { prompt: 'Is summing subgoal costs always admissible?', answer: 'No — only when subgoals are independent; max is always admissible.' },
        { prompt: 'Which heuristic removes negative effects?', answer: 'Ignore delete lists.' },
      ],
    },

    // ------------------------------------------------------------------
    'hierarchical-planning': {
      difficulty: 'medium',
      intro: 'People plan at many levels — “go to the airport” before “turn left”. Hierarchical planning lets agents do the same.',
      definition:
        'Hierarchical planning uses **hierarchical task networks (HTN)**: the plan starts with **high-level actions (HLAs)**, which are repeatedly **refined** into lower-level steps until only **primitive actions** (directly executable) remain. A refinement that contains only primitive actions is an **implementation** of the HLA.',
      simpleExplanation: {
        text: 'Plan big first, details later. “Go to SFO airport” can be refined to “drive and park” or “take a taxi”, each of which is refined further, until every step is something the agent can directly do.',
        analogy: 'Planning a wedding: first “book venue, arrange food, send invites”, then break each into phone calls and payments.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Refining a high-level action',
        root: 'Go(Home, SFO)',
        children: [
          { label: 'Refinement 1', children: ['Drive(Home, SFOLongTermParking)', 'Shuttle(SFOLongTermParking, SFO)'] },
          { label: 'Refinement 2', children: ['Taxi(Home, SFO)'] },
        ],
      },
      explanation: [
        { heading: 'Key ideas' },
        {
          list: [
            '**Primitive action** — can be executed directly by the agent.',
            '**High-level action (HLA)** — has one or more possible **refinements** into sequences of actions.',
            '**Implementation** — a refinement made only of primitive actions.',
            'An HLA **achieves** a goal if at least one of its implementations achieves it.',
          ],
        },
        { heading: 'Searching for primitive solutions' },
        'Start with a single HLA `[Act]`. Repeatedly pick an HLA in the plan, replace it with one of its refinements, and check whether the result achieves the goal. This is a breadth-first search over plan refinements.',
        { heading: 'Searching for abstract solutions — angelic semantics' },
        'Instead of refining everything, reason with the **reachable set** of an HLA — the states its implementations can reach. **Optimistic** descriptions overestimate the reachable set; **pessimistic** ones underestimate it. If the pessimistic set already reaches the goal, the abstract plan is guaranteed to work.',
        { tip: 'Hierarchy cuts the search drastically: a few high-level choices replace thousands of low-level combinations.' },
      ],
      example: {
        title: 'Planning a trip to Hawaii',
        input: 'Goal: be on a beach in Honolulu.',
        output: `Level 1: Go(Home, SFO) → Fly(SFO, HNL) → Go(HNL, Beach)
Level 2: Go(Home, SFO) → Taxi(Home, SFO)
Level 3: Taxi(Home, SFO) → Call taxi, ride, pay   ← primitive`,
        explanation: 'Each level adds detail only where needed. The planner commits to “fly” before worrying about which taxi to call.',
      },
      keyPoints: [
        'HTN planning refines high-level actions into primitive ones.',
        'An HLA can have several refinements.',
        'Implementation = refinement with only primitive actions.',
        'Angelic semantics reason with reachable sets (optimistic/pessimistic).',
        'Hierarchy greatly reduces search.',
      ],
      importantTerms: [
        { term: 'HTN', meaning: 'Hierarchical task network — planning by refining tasks.' },
        { term: 'High-level action', meaning: 'An abstract action that must be refined to be executed.' },
        { term: 'Refinement', meaning: 'A sequence of actions that can replace an HLA.' },
        { term: 'Reachable set', meaning: 'States an HLA’s implementations can reach.' },
      ],
      examPoints: [
        'Define HLA, primitive action, refinement and implementation.',
        'Draw a **refinement tree** (Go(Home, SFO)).',
        'Explain search for primitive solutions and angelic semantics.',
      ],
      questions: [
        {
          prompt: 'Explain hierarchical planning with an example.',
          plan: ANSWER_PLAN(
            'Planning by refining high-level actions into primitive ones',
            'Refinement tree for Go(Home, SFO)',
            'HLAs, refinements, implementations, primitive search, reachable sets',
            'Trip to Hawaii',
            'Reduces search; optimistic and pessimistic descriptions',
          ),
        },
      ],
      keywords: ['hierarchical planning', 'HTN', 'high-level action', 'primitive action', 'refinement', 'implementation', 'reachable set', 'angelic semantics'],
      remember: [
        { prompt: 'What is an implementation of an HLA?', answer: 'A refinement consisting only of primitive actions.' },
        { prompt: 'Expand HTN.', answer: 'Hierarchical Task Network.' },
        { prompt: 'Why is hierarchical planning efficient?', answer: 'Decisions at a high level prune huge numbers of low-level combinations.' },
      ],
    },

    // ------------------------------------------------------------------
    'planning-and-acting-in-nondeterministic-domains': {
      difficulty: 'hard',
      intro: 'Real worlds surprise you. These planners cope with missing sensors, uncertain outcomes and changing goals.',
      definition:
        'In nondeterministic or partially observable domains, an agent can use **sensorless (conformant) planning** — plans that work without perception; **contingency (conditional) planning** — plans with branches based on percepts; or **online planning and replanning** — monitoring execution and replanning when something goes wrong.',
      simpleExplanation: {
        text: 'If you cannot see, make a plan that works in every possible case. If you can see but outcomes are uncertain, add “if … then … else” branches. If the world keeps surprising you, watch while acting and fix the plan whenever it breaks.',
        analogy: 'Painting a chair and table the same colour: if you cannot check the paint colour, paint both from the same can (sensorless); if you can, look and choose (contingent); if a coat misses a spot, repaint it (replanning).',
      },
      visual: {
        type: 'comparison',
        title: 'Three ways to handle uncertainty',
        table: {
          columns: ['Approach', 'Environment', 'Idea'],
          rows: [
            ['Sensorless (conformant)', 'No observations', 'One plan that works in every possible initial state'],
            ['Contingent (conditional)', 'Partially observable / nondeterministic', 'Plan branches on percepts: if … then … else'],
            ['Online replanning', 'Unknown or changing', 'Monitor execution and replan when needed'],
          ],
        },
      },
      explanation: [
        { heading: 'Sensorless planning' },
        'The agent works in **belief states** (sets of possible physical states). It chooses actions that **coerce** the world into a known state. Example: paint both chair and table from the same can, so their colours match whatever the can holds.',
        { heading: 'Contingent planning' },
        'Uses sensing actions and conditional steps, found by **AND–OR search**: OR nodes are the agent’s choices, AND nodes are the possible outcomes the plan must handle.',
        { code: '[LookAt(Table), LookAt(Chair),\n if Color(Table, c) ∧ Color(Chair, c) then NoOp\n else [RemoveLid(Can1), LookAt(Can1), …]]', lang: 'text' },
        { heading: 'Online planning — execution monitoring' },
        {
          list: [
            '**Action monitoring** — before an action, check its preconditions still hold.',
            '**Plan monitoring** — before an action, check the rest of the plan will still succeed.',
            '**Goal monitoring** — check whether a better set of goals has appeared.',
          ],
        },
        'When monitoring detects a problem, the agent **replans** — often repairing the plan from the current state back to some point on the original plan.',
      ],
      example: {
        title: 'Replanning while painting',
        input: 'Plan: paint chair with the table’s colour. After painting, a patch is missed.',
        output: `Action monitoring : precondition holds → paint
Plan monitoring   : LookAt(Chair) shows unpainted patch → plan no longer succeeds
Replan            : add Paint(Chair) again → goal reached`,
        explanation: 'The agent did not need to foresee the failure; it noticed it and fixed the plan on the fly.',
      },
      keyPoints: [
        'Sensorless planning: belief states, coerce the world.',
        'Contingent planning: conditional branches, AND–OR search.',
        'Online planning: execution monitoring + replanning.',
        'Monitoring: action, plan, goal.',
      ],
      importantTerms: [
        { term: 'Belief state', meaning: 'The set of physical states the agent might be in.' },
        { term: 'Conformant plan', meaning: 'A plan that works without any sensing.' },
        { term: 'Contingency plan', meaning: 'A plan with branches chosen by percepts.' },
        { term: 'Execution monitoring', meaning: 'Checking during execution whether the plan is still valid.' },
      ],
      examPoints: [
        'Compare **sensorless, contingent and online** planning.',
        'Use the **chair and table painting** example.',
        'List the three kinds of execution monitoring.',
      ],
      questions: [
        {
          prompt: 'Explain planning and acting in nondeterministic domains.',
          plan: ANSWER_PLAN(
            'Planning when outcomes or observations are uncertain',
            'Table: sensorless vs contingent vs online',
            'Belief states, AND–OR search, monitoring and replanning',
            'Painting the chair and table the same colour',
            'Action, plan and goal monitoring',
          ),
        },
      ],
      keywords: ['nondeterministic', 'sensorless planning', 'conformant', 'contingent planning', 'belief state', 'AND–OR search', 'replanning', 'execution monitoring'],
      remember: [
        { prompt: 'Another name for sensorless planning?', answer: 'Conformant planning.' },
        { prompt: 'Which search builds contingent plans?', answer: 'AND–OR search.' },
        { prompt: 'Three kinds of execution monitoring?', answer: 'Action, plan and goal monitoring.' },
      ],
    },

    // ------------------------------------------------------------------
    'time-schedules-and-resources': {
      difficulty: 'hard',
      intro: 'Real plans have deadlines and limited machines. The critical path method tells you which tasks cannot be delayed.',
      definition:
        'Scheduling extends classical planning with **action durations** and **resource constraints**. In **job-shop scheduling** each job is a sequence of actions with durations, and actions may need resources. The **critical path method (CPM)** computes earliest and latest start times; the **critical path** is the longest path and fixes the minimum total duration.',
      simpleExplanation: {
        text: 'First decide **what** to do (planning), then **when** to do it (scheduling). Each task has a duration and an order. The longest chain of tasks is the critical path — delaying any task on it delays the whole project. Other tasks have **slack** (spare time).',
        analogy: 'Cooking dinner: the rice takes longest, so it is on the critical path; the salad can be made any time while it cooks.',
      },
      visual: {
        type: 'flow',
        title: 'Critical path for assembling two cars',
        steps: [
          { label: 'Start', note: 't = 0' },
          { label: 'AddEngine2', note: '60 min, slack 0' },
          { label: 'AddWheels2', note: '15 min, slack 0' },
          { label: 'Inspect2', note: '10 min, slack 0' },
          { label: 'Finish', note: 't = 85' },
        ],
      },
      explanation: [
        { heading: 'Representing time and resources' },
        {
          list: [
            'Each action has a **duration** and ordering constraints (A ≺ B).',
            '**Reusable resources** — available again after use (e.g. an engine hoist).',
            '**Consumable resources** — used up (e.g. screws, fuel).',
            'Resource declarations: `Resources: EngineHoists(1), WheelStations(1), Inspectors(2)`.',
          ],
        },
        { heading: 'Critical path method' },
        {
          list: [
            '**ES (earliest start)**: ES(Start) = 0; ES(B) = max over predecessors A of ES(A) + Duration(A).',
            '**LS (latest start)**: LS(Finish) = ES(Finish); LS(A) = min over successors B of LS(B) − Duration(A).',
            '**Slack** = LS − ES. Actions with zero slack form the **critical path**.',
          ],
          ordered: true,
        },
        { trap: 'CPM alone ignores resource limits. With one engine hoist, the two AddEngine tasks cannot overlap, so the real schedule becomes longer (115 minutes in the textbook example).' },
        { tip: 'Approach: **plan first, schedule later** — find the actions, then assign times that satisfy order and resource constraints.' },
      ],
      example: {
        title: 'Earliest and latest start times',
        input: 'Job 1: AddEngine1 (30) → AddWheels1 (30) → Inspect1 (10). Job 2: AddEngine2 (60) → AddWheels2 (15) → Inspect2 (10).',
        output: `Action        [ES, LS]   Slack
AddEngine1    [0, 15]    15
AddWheels1    [30, 45]   15
Inspect1      [60, 75]   15
AddEngine2    [0, 0]      0   ← critical
AddWheels2    [60, 60]    0   ← critical
Inspect2      [75, 75]    0   ← critical
Total duration = 60 + 15 + 10 = 85 minutes`,
        explanation: 'Job 2 is the critical path. Job 1 can start up to 15 minutes late without delaying the finish.',
      },
      keyPoints: [
        'Scheduling adds durations and resources to planning.',
        'Job-shop scheduling: jobs = ordered actions with durations.',
        'Reusable vs consumable resources.',
        'CPM computes ES and LS; slack = LS − ES.',
        'Critical path = zero-slack actions = minimum total time.',
      ],
      importantTerms: [
        { term: 'Critical path', meaning: 'The longest path; its actions have zero slack.' },
        { term: 'Slack', meaning: 'LS − ES — how much an action can be delayed.' },
        { term: 'Reusable resource', meaning: 'A resource returned after use, e.g. a machine.' },
        { term: 'Consumable resource', meaning: 'A resource used up by actions, e.g. bolts.' },
      ],
      examPoints: [
        'Define job-shop scheduling and resources.',
        'Write the **ES and LS formulas** and define slack.',
        'Solve the **car assembly** example and identify the critical path.',
        'Note that resource constraints lengthen the schedule.',
      ],
      questions: [
        {
          prompt: 'Explain scheduling with time and resources using the critical path method.',
          plan: ANSWER_PLAN(
            'Assigning start times to actions under order and resource constraints',
            'Network of actions with [ES, LS] values',
            'Durations, resources, ES/LS formulas, slack, critical path',
            'Two-car assembly: 85 minutes',
            'Plan first, schedule later; resources lengthen schedules',
          ),
        },
      ],
      keywords: ['scheduling', 'job-shop', 'duration', 'reusable resource', 'consumable resource', 'critical path method', 'ES', 'LS', 'slack'],
      remember: [
        { prompt: 'Formula for slack?', answer: 'Slack = LS − ES' },
        { prompt: 'What is special about critical path actions?', answer: 'They have zero slack.' },
        { prompt: 'Minimum time for the two-car example?', answer: '85 minutes (without resource limits).' },
      ],
    },

    // ------------------------------------------------------------------
    'analysis-of-planning-approaches': {
      difficulty: 'medium',
      intro: 'A closing comparison: what each planning approach is good at, and why planning remains hard.',
      definition:
        'Planning combines **search** and **logic**. Analysis of planning approaches compares state-space search, SATPlan, partial-order planning, GraphPlan and HTN planning. Their shared challenge is **controlling combinatorial explosion**, and their power comes from **factored representations** that support domain-independent heuristics and decomposition.',
      simpleExplanation: {
        text: 'No single planner wins everywhere. Forward search with strong heuristics is fast in many domains; SATPlan suits tightly constrained ones; HTN suits domains where experts know the task structure. All of them fight the same enemy: the number of possible plans grows exponentially.',
        analogy: 'Different vehicles for different trips: a bike for short hops, a train for long fixed routes, a car for flexible journeys.',
      },
      visual: {
        type: 'comparison',
        title: 'Planning approaches compared',
        table: {
          columns: ['Approach', 'Strength', 'Weakness'],
          rows: [
            ['Forward search + heuristics', 'Fast, general; most successful today', 'Large branching factor'],
            ['Backward search', 'Only relevant actions', 'Harder heuristics'],
            ['SATPlan', 'Uses powerful SAT solvers', 'Grows with plan length'],
            ['Partial-order planning', 'Flexible; least commitment; easy to explain', 'Slower search'],
            ['HTN planning', 'Uses expert task knowledge; scales to large real problems', 'Needs hand-built hierarchies'],
          ],
        },
      },
      explanation: [
        { heading: 'Why planning is hard' },
        'Planning in general is **PSPACE-complete**. Even deciding whether a plan exists can take exponential time, so practical planners depend on structure and heuristics.',
        { heading: 'Sources of power' },
        {
          list: [
            '**Factored representation** — states as sets of fluents allow automatic heuristics.',
            '**Decomposability** — if subgoals are independent, solve them separately.',
            '**Serializable subgoals** — an order exists in which subgoals can be achieved without undoing earlier ones (e.g. build towers bottom-up in blocks world).',
          ],
        },
        { heading: 'Real-world use' },
        'NASA’s **Remote Agent** planned and controlled the Deep Space One spacecraft; HTN planners schedule manufacturing and logistics; planners also drive robots and video-game characters.',
        { note: 'Classical planning assumptions (deterministic, observable, static) are often relaxed with the techniques from nondeterministic planning and scheduling.' },
      ],
      example: {
        title: 'Choosing an approach',
        input: 'A factory with well-known procedures needs plans with hundreds of steps.',
        output: `Best fit: HTN planning
Why: experts already know how high-level tasks break down;
     refinement avoids searching millions of low-level orderings`,
        explanation: 'If no expert hierarchy existed, forward search with domain-independent heuristics would be the default choice.',
      },
      keyPoints: [
        'Planning = search + logic.',
        'General planning is PSPACE-complete.',
        'Factored representations enable domain-independent heuristics.',
        'Serializable subgoals make some domains easy.',
        'Each approach suits different kinds of problems.',
      ],
      importantTerms: [
        { term: 'Combinatorial explosion', meaning: 'Rapid growth in the number of possibilities.' },
        { term: 'Serializable subgoals', meaning: 'Subgoals that can be achieved in some order without undoing earlier ones.' },
        { term: 'PSPACE-complete', meaning: 'A complexity class harder than NP in general.' },
      ],
      examPoints: [
        'Draw a **comparison table** of planning approaches.',
        'Explain combinatorial explosion and PSPACE-completeness.',
        'Explain factored representation and serializable subgoals.',
        'Give a real-world planning application.',
      ],
      questions: [
        {
          prompt: 'Analyse and compare the different planning approaches.',
          plan: ANSWER_PLAN(
            'Planning combines search and logic to control combinatorial explosion',
            'Comparison table of approaches',
            'Forward, backward, SATPlan, POP, HTN; decomposability; serializable subgoals',
            'Factory planning with HTN; NASA Remote Agent',
            'PSPACE-complete; heuristics and structure are key',
          ),
        },
      ],
      keywords: ['combinatorial explosion', 'PSPACE-complete', 'factored representation', 'decomposability', 'serializable subgoals', 'HTN', 'SATPlan'],
      remember: [
        { prompt: 'Complexity of general planning?', answer: 'PSPACE-complete.' },
        { prompt: 'What are serializable subgoals?', answer: 'Subgoals achievable in some order without undoing earlier ones.' },
        { prompt: 'Most successful general approach today?', answer: 'Forward state-space search with domain-independent heuristics.' },
      ],
    },
  },
}
