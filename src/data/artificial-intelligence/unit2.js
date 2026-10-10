// Foundations of Artificial Intelligence — Unit II: Problem Solving.
// Topic ids match the syllabus outline in ../subjects.js (24CSU5DA).
// Textbook: Russell & Norvig, AI – A Modern Approach, 4th ed., Chapters 3 and 5.
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
    'Unit II turns “thinking” into searching. First you define a problem precisely, then explore its state space with uninformed and heuristic search. Constraint satisfaction problems then show how to solve puzzles like map colouring and Sudoku much faster by using their structure.',

  map: [
    { label: 'Define the problem', topics: ['problem-solving-agents', 'example-problems'] },
    { label: 'Search blindly', topics: ['search-algorithms', 'uninformed-search-strategies'] },
    { label: 'Search smartly', topics: ['heuristic-search-strategies', 'heuristic-functions'] },
    { label: 'Model as a CSP', topics: ['defining-constraint-satisfaction-problems', 'constraint-propagation-inference-in-csps'] },
    { label: 'Solve the CSP', topics: ['backtracking-search-for-csps', 'local-search-for-csps', 'the-structure-of-problems'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'problem-solving-agents': {
      difficulty: 'easy',
      intro: 'Before an agent can search for a solution, it must state the problem in five precise parts.',
      definition:
        'A problem-solving agent is a goal-based agent that plans ahead: it formulates a **goal**, formulates a **problem** (initial state, actions, transition model, goal test, action cost), **searches** for a sequence of actions that reaches the goal, and then **executes** it.',
      simpleExplanation: {
        text: 'When the right action is not obvious, the agent imagines possible action sequences before moving. To do that it needs a clear problem: where it starts, what it can do, what each action leads to, how to recognise the goal, and what each step costs.',
        analogy: 'Planning a trip from Coimbatore to Chennai on a map before you leave — not driving off and hoping.',
      },
      visual: {
        type: 'process',
        title: 'Four phases of problem solving',
        steps: [
          { label: 'Goal formulation', detail: 'decide what to achieve' },
          { label: 'Problem formulation', detail: 'states, actions, transition model, goal test, cost' },
          { label: 'Search', detail: 'simulate action sequences to find a solution' },
          { label: 'Execution', detail: 'carry out the solution step by step' },
        ],
      },
      explanation: [
        { heading: 'Five components of a problem' },
        {
          list: [
            '**Initial state** — where the agent starts, e.g. `In(Arad)`.',
            '**Actions** — `ACTIONS(s)` lists what can be done in state s.',
            '**Transition model** — `RESULT(s, a)` gives the state after doing a in s.',
            '**Goal test** — checks whether a state is a goal, e.g. `In(Bucharest)`.',
            '**Action cost** — `c(s, a, s′)`; the path cost is the sum of step costs.',
          ],
          ordered: true,
        },
        'The initial state, actions and transition model together define the **state space** — a graph where nodes are states and edges are actions.',
        'A **solution** is a path from the initial state to a goal state. An **optimal solution** has the lowest path cost.',
        { note: 'This works in an **open-loop** way when the environment is fully observable, deterministic and known — the agent can ignore percepts while executing.' },
        { heading: 'Abstraction' },
        'Real problems have too much detail. **Abstraction** removes detail that does not matter (radio, scenery) and keeps what matters (cities and roads).',
      ],
      example: {
        title: 'Romania route-finding',
        input: 'Agent is in Arad and must reach Bucharest.',
        output: `Initial state : In(Arad)
Actions       : Go(Sibiu), Go(Timisoara), Go(Zerind)
Transition    : RESULT(In(Arad), Go(Sibiu)) = In(Sibiu)
Goal test     : In(Bucharest)
Cost          : road distance in km`,
        explanation: 'With these five parts written down, any search algorithm can find the route.',
      },
      keyPoints: [
        'Phases: goal formulation → problem formulation → search → execution.',
        'Problem = initial state, actions, transition model, goal test, action cost.',
        'State space = graph of states connected by actions.',
        'Solution = action sequence to the goal; optimal = least cost.',
        'Abstraction removes irrelevant detail.',
      ],
      importantTerms: [
        { term: 'State space', meaning: 'All states reachable from the initial state by actions.' },
        { term: 'Transition model', meaning: 'Describes the result of each action in each state.' },
        { term: 'Path cost', meaning: 'Sum of the costs of the actions along a path.' },
        { term: 'Abstraction', meaning: 'Removing irrelevant detail from a problem description.' },
      ],
      examPoints: [
        'Define a problem-solving agent as a **goal-based** agent.',
        'List the **five components** of a well-defined problem.',
        'Use the **Romania map** example.',
        'Mention state space, solution, optimal solution and abstraction.',
      ],
      questions: [
        {
          prompt: 'What is a problem-solving agent? Explain the components of a well-defined problem.',
          plan: ANSWER_PLAN(
            'Goal-based agent that searches for an action sequence',
            'Goal → formulate → search → execute',
            'Initial state, actions, transition model, goal test, path cost',
            'Arad to Bucharest',
            'State space, optimal solution, abstraction',
          ),
        },
      ],
      keywords: ['goal formulation', 'problem formulation', 'initial state', 'transition model', 'goal test', 'path cost', 'state space'],
      remember: [
        { prompt: 'Name the five parts of a problem.', answer: 'Initial state, actions, transition model, goal test, action cost.' },
        { prompt: 'What is an optimal solution?', answer: 'A solution with the lowest path cost.' },
        { prompt: 'What does abstraction do?', answer: 'Removes details that do not affect the solution.' },
      ],
    },

    // ------------------------------------------------------------------
    'example-problems': {
      difficulty: 'easy',
      intro: 'Exams often ask you to formulate a given problem. These standard examples are your templates.',
      definition:
        'Example problems are of two kinds: **standardised (toy) problems** used to compare algorithms — vacuum world, 8-puzzle, 8-queens — and **real-world problems** such as route-finding, touring, VLSI layout, robot navigation and assembly sequencing.',
      simpleExplanation: {
        text: 'Toy problems are small and exact, so they are perfect for testing algorithms. Real-world problems are messy and big, but are formulated in exactly the same way: states, actions, transitions, goal, cost.',
        analogy: 'Toy problems are practice questions from the textbook; real-world problems are the actual exam.',
      },
      visual: {
        type: 'comparison',
        title: 'Toy vs real-world problems',
        items: [
          {
            title: 'Toy problems',
            tone: 'muted',
            points: ['Vacuum world', '8-puzzle', '8-queens', 'Missionaries and cannibals'],
          },
          {
            title: 'Real-world problems',
            tone: 'accent',
            points: ['Route finding — maps, airline travel', 'Touring — travelling salesperson', 'VLSI layout', 'Robot navigation', 'Automatic assembly sequencing'],
          },
        ],
      },
      explanation: [
        { heading: '8-puzzle formulation' },
        {
          table: {
            columns: ['Part', '8-puzzle'],
            rows: [
              ['States', 'Position of each of the 8 tiles and the blank on a 3×3 board'],
              ['Initial state', 'Any arrangement'],
              ['Actions', 'Move the blank Left, Right, Up or Down'],
              ['Transition model', 'Swaps the blank with the neighbouring tile'],
              ['Goal test', 'Tiles in order 1–8 with blank in the corner'],
              ['Cost', '1 per move'],
            ],
          },
        },
        { heading: '8-queens formulation' },
        'Place 8 queens on a chessboard so that no queen attacks another. In the **incremental** formulation, add one queen at a time to the leftmost empty column in a square that is not attacked. This shrinks the state space from about 1.8 × 10¹⁴ to just 2,057 states.',
        { heading: 'Vacuum world' },
        'Two squares, each clean or dirty, and the agent in one of them: 2 × 2 × 2 = **8 states**. Actions: Left, Right, Suck. Goal: all squares clean.',
        { heading: 'Real-world: route finding' },
        'States are locations (plus time, fare type for airlines). Actions are flights or roads. Cost combines money, time, waiting and comfort.',
        { tip: 'The **travelling salesperson problem (TSP)** visits every city exactly once with minimum total distance — it is NP-hard.' },
      ],
      example: {
        title: 'Formulate the vacuum world',
        input: 'Two rooms A and B; the robot is in A; both rooms are dirty.',
        output: `States       : 8  (robot location × dirt in A × dirt in B)
Actions      : Left, Right, Suck
Goal test    : no dirt in any square
Path cost    : 1 per action
A solution   : Suck → Right → Suck`,
        explanation: 'Three actions clean both rooms. This tiny problem is used to illustrate every search algorithm.',
      },
      keyPoints: [
        'Toy problems: vacuum world, 8-puzzle, 8-queens.',
        'Real-world: route finding, TSP, VLSI layout, robot navigation, assembly.',
        'Every problem uses the same five-part formulation.',
        '8-queens incremental formulation hugely reduces the state space.',
      ],
      importantTerms: [
        { term: 'Toy problem', meaning: 'A small, exactly described problem used to test algorithms.' },
        { term: 'TSP', meaning: 'Find the shortest tour visiting every city exactly once.' },
        { term: 'Incremental formulation', meaning: 'Build a solution by adding one piece at a time.' },
      ],
      examPoints: [
        'Formulate the **8-puzzle** fully: states, initial, actions, transition, goal, cost.',
        'Give the vacuum world’s **8 states**.',
        'List real-world problems with one line each.',
      ],
      questions: [
        {
          prompt: 'Formulate the 8-puzzle problem. List some real-world search problems.',
          plan: ANSWER_PLAN(
            'Standardised problem for testing search',
            '3×3 board start and goal states',
            'States, actions, transition model, goal test, cost',
            'Vacuum world solution: Suck → Right → Suck',
            'Route finding, TSP, VLSI, robot navigation',
          ),
        },
      ],
      keywords: ['toy problem', 'vacuum world', '8-puzzle', '8-queens', 'route finding', 'TSP', 'VLSI layout'],
      remember: [
        { prompt: 'How many states does the two-square vacuum world have?', answer: '8' },
        { prompt: 'What are the 8-puzzle actions?', answer: 'Move the blank Left, Right, Up or Down.' },
        { prompt: 'What is the TSP goal?', answer: 'Visit every city exactly once with minimum total distance.' },
      ],
    },

    // ------------------------------------------------------------------
    'search-algorithms': {
      difficulty: 'medium',
      intro: 'Every search method in this unit is the same loop with a different rule for choosing the next node.',
      definition:
        'A search algorithm takes a problem as input and returns a solution by building a **search tree** over the state space: it repeatedly chooses a node from the **frontier**, tests it, and **expands** it to generate child nodes, until a goal is found or the frontier is empty.',
      simpleExplanation: {
        text: 'Imagine drawing a tree of “what if I do this, then that”. The **frontier** is the list of leaves you have not explored yet. Each step picks one leaf, checks if it is the goal, and if not, adds its children to the frontier. **Which** leaf you pick decides the algorithm.',
        analogy: 'Exploring a maze with a notebook: the frontier is the list of corridors you still have to try; the reached set is the list of rooms you have already visited.',
      },
      visual: {
        type: 'flow',
        title: 'The general search loop',
        steps: [
          { label: 'Frontier', note: 'start with initial node' },
          { label: 'Pick a node', note: 'by the strategy' },
          { label: 'Goal?', note: 'yes → return solution' },
          { label: 'Expand', note: 'generate children' },
          { label: 'Add to frontier', note: 'skip repeated states' },
        ],
      },
      explanation: [
        { heading: 'A node has four parts' },
        {
          list: ['`node.STATE` — the state', '`node.PARENT` — the node that generated it', '`node.ACTION` — action applied to the parent', '`node.PATH-COST` — g(n), cost from the start'],
        },
        { heading: 'Frontier data structures' },
        {
          table: {
            columns: ['Queue', 'Pops', 'Used by'],
            rows: [
              ['FIFO queue', 'Oldest node first', 'Breadth-first search'],
              ['LIFO queue (stack)', 'Newest node first', 'Depth-first search'],
              ['Priority queue', 'Lowest f(n) first', 'Uniform-cost, best-first, A*'],
            ],
          },
        },
        { heading: 'Repeated states' },
        'Loops and redundant paths waste time. **Graph search** keeps a **reached** (explored) set and never re-adds a state already reached; **tree-like search** does not check.',
        { heading: 'Measuring performance' },
        {
          list: [
            '**Completeness** — always finds a solution if one exists?',
            '**Cost optimality** — finds the lowest-cost solution?',
            '**Time complexity** — how long it takes (nodes generated).',
            '**Space complexity** — how much memory it needs.',
          ],
        },
        'Complexity is expressed with **b** (branching factor), **d** (depth of the shallowest solution) and **m** (maximum depth).',
        {
          code: 'function BEST-FIRST-SEARCH(problem, f)\n  node ← NODE(problem.INITIAL)\n  frontier ← priority queue ordered by f, with node\n  reached ← {problem.INITIAL: node}\n  while frontier is not empty\n    node ← POP(frontier)\n    if problem.IS-GOAL(node.STATE) then return node\n    for each child in EXPAND(problem, node)\n      if child.STATE not in reached or child.PATH-COST < reached[child.STATE].PATH-COST\n        reached[child.STATE] ← child; add child to frontier\n  return failure',
          lang: 'text',
        },
      ],
      example: {
        title: 'Expanding Arad',
        input: 'Frontier = [Arad]',
        output: `Pop Arad → not goal → expand
Children: Sibiu (140), Timisoara (118), Zerind (75)
Frontier = [Sibiu, Timisoara, Zerind]
Reached  = {Arad, Sibiu, Timisoara, Zerind}`,
        explanation: 'The next node popped depends on the strategy: BFS takes Sibiu (first added); uniform-cost takes Zerind (cheapest).',
      },
      keyPoints: [
        'Search builds a search tree over the state space.',
        'Frontier = generated but not yet expanded nodes.',
        'Node = state, parent, action, path cost.',
        'FIFO → BFS, LIFO → DFS, priority queue → UCS / A*.',
        'Judge algorithms by completeness, optimality, time, space.',
      ],
      importantTerms: [
        { term: 'Frontier', meaning: 'The set of leaf nodes waiting to be expanded.' },
        { term: 'Expansion', meaning: 'Generating all child nodes of a node.' },
        { term: 'Branching factor b', meaning: 'Number of successors of a node.' },
        { term: 'Graph search', meaning: 'Search that remembers reached states to avoid repeats.' },
      ],
      examPoints: [
        'Write the **four performance measures**.',
        'Show the node structure and the three queue types.',
        'Distinguish **tree search** and **graph search**.',
        'Define b, d and m.',
      ],
      questions: [
        {
          prompt: 'Explain the general search algorithm and how search performance is measured.',
          plan: ANSWER_PLAN(
            'Builds a search tree by expanding frontier nodes',
            'Search loop flowchart or search tree',
            'Node structure, queues, repeated states',
            'Expanding Arad in the Romania map',
            'Completeness, optimality, time, space; b, d, m',
          ),
        },
      ],
      keywords: ['search tree', 'frontier', 'expand', 'reached set', 'FIFO', 'LIFO', 'priority queue', 'completeness', 'b d m'],
      remember: [
        { prompt: 'Which queue does BFS use?', answer: 'FIFO queue.' },
        { prompt: 'Name the four performance measures.', answer: 'Completeness, cost optimality, time complexity, space complexity.' },
        { prompt: 'What does b stand for?', answer: 'The branching factor.' },
      ],
    },

    // ------------------------------------------------------------------
    'uninformed-search-strategies': {
      difficulty: 'medium',
      intro: 'Blind search: no hints about where the goal is. Comparing these six methods is a guaranteed exam question.',
      definition:
        'Uninformed (blind) search strategies use only the information in the problem definition — they cannot tell whether one non-goal state is closer to the goal than another. They are breadth-first, uniform-cost, depth-first, depth-limited, iterative deepening and bidirectional search.',
      simpleExplanation: {
        text: 'Without any hint, the only choice is **in what order** to explore. BFS explores level by level, uniform-cost explores cheapest-first, DFS dives deep first, and iterative deepening combines the memory saving of DFS with the safety of BFS.',
        analogy: 'Looking for a lost key with no clue: BFS checks every room on the ground floor before going upstairs; DFS searches one room completely, then the next.',
      },
      visual: {
        type: 'comparison',
        title: 'Comparing uninformed strategies',
        table: {
          columns: ['Strategy', 'Frontier', 'Complete?', 'Optimal?', 'Time', 'Space'],
          rows: [
            ['Breadth-first', 'FIFO', 'Yes', 'Yes*', 'O(b^d)', 'O(b^d)'],
            ['Uniform-cost', 'Priority g(n)', 'Yes', 'Yes', 'O(b^(1+C*/ε))', 'O(b^(1+C*/ε))'],
            ['Depth-first', 'LIFO', 'No', 'No', 'O(b^m)', 'O(bm)'],
            ['Depth-limited', 'LIFO, limit l', 'No', 'No', 'O(b^l)', 'O(bl)'],
            ['Iterative deepening', 'LIFO, growing limit', 'Yes', 'Yes*', 'O(b^d)', 'O(bd)'],
            ['Bidirectional', 'Two frontiers', 'Yes', 'Yes*', 'O(b^(d/2))', 'O(b^(d/2))'],
          ],
        },
        caption: '* optimal when all action costs are equal.',
      },
      explanation: [
        { heading: 'Breadth-first search (BFS)' },
        'Expands the **shallowest** node first using a FIFO queue. Finds the solution with the fewest actions. Main problem: **memory** — it stores every node at the frontier.',
        { heading: 'Uniform-cost search (UCS) — Dijkstra’s algorithm' },
        'Expands the node with the **lowest path cost g(n)**. Optimal for any positive step costs. C* is the cost of the optimal solution and ε the smallest step cost.',
        { heading: 'Depth-first search (DFS)' },
        'Expands the **deepest** node first using a stack. Needs very little memory, O(bm), but can go down an infinite path and is not optimal.',
        { heading: 'Depth-limited search (DLS)' },
        'DFS with a depth limit **l** — stops infinite descent, but fails if the goal is deeper than l.',
        { heading: 'Iterative deepening search (IDS)' },
        'Runs DLS with l = 0, 1, 2, … until a goal is found. Repeats shallow work, but it is **the preferred uninformed method** when the state space is large and the depth is unknown.',
        { heading: 'Bidirectional search' },
        'Searches forward from the start and backward from the goal at the same time and stops when they meet. b^(d/2) + b^(d/2) is much less than b^d.',
        { trap: 'DFS space is O(bm) — linear — but its time is O(b^m), which can be far worse than BFS.' },
      ],
      example: {
        title: 'BFS vs DFS on the same tree',
        input: 'Tree: A → (B, C); B → (D, E); C → (F, G). Goal = F.',
        output: `BFS order: A, B, C, D, E, F   ← level by level
DFS order: A, B, D, E, C, F   ← deepest first
IDS:  l=0: A | l=1: A B C | l=2: A B D E C F`,
        explanation: 'BFS uses a queue so B and C come before their children. DFS uses a stack so it finishes B’s subtree before visiting C.',
      },
      keyPoints: [
        'Uninformed = no knowledge beyond the problem definition.',
        'BFS: shallowest first, complete, high memory.',
        'UCS: cheapest g(n) first, optimal for positive costs.',
        'DFS: deepest first, linear memory, not complete.',
        'IDS: DFS with increasing limit — best of BFS and DFS.',
        'Bidirectional: two searches meet in the middle.',
      ],
      importantTerms: [
        { term: 'Uninformed search', meaning: 'Search that uses no domain-specific hint about the goal.' },
        { term: 'g(n)', meaning: 'Path cost from the start node to node n.' },
        { term: 'Depth limit l', meaning: 'Maximum depth explored by depth-limited search.' },
        { term: 'Iterative deepening', meaning: 'Repeated depth-limited search with growing limits.' },
      ],
      examPoints: [
        'Explain each strategy with a **small tree** and its node order.',
        'Draw the **comparison table**: complete, optimal, time, space.',
        'State why IDS is the preferred uninformed method.',
        'Mention the frontier data structure for each.',
      ],
      questions: [
        {
          prompt: 'Explain uninformed search strategies and compare them.',
          plan: ANSWER_PLAN(
            'Search with no knowledge beyond the problem definition',
            'Search tree with BFS and DFS orders',
            'BFS, UCS, DFS, DLS, IDS, bidirectional',
            'Node order on a sample tree',
            'Comparison table; IDS is preferred',
          ),
        },
      ],
      keywords: ['blind search', 'BFS', 'uniform-cost', 'DFS', 'depth-limited', 'iterative deepening', 'bidirectional', 'O(b^d)'],
      remember: [
        { prompt: 'Which uninformed search has linear space and is complete?', answer: 'Iterative deepening search.' },
        { prompt: 'What does UCS expand next?', answer: 'The node with the lowest path cost g(n).' },
        { prompt: 'DFS space complexity?', answer: 'O(bm)' },
      ],
    },

    // ------------------------------------------------------------------
    'heuristic-search-strategies': {
      difficulty: 'hard',
      intro: 'A* is the single most important algorithm in this unit. Know f(n) = g(n) + h(n) by heart.',
      definition:
        'Heuristic (informed) search strategies use a **heuristic function h(n)** — an estimate of the cost from node n to the nearest goal — to choose which node to expand. The main ones are **greedy best-first search** (f = h) and `A*` **search** (f = g + h).',
      simpleExplanation: {
        text: 'A heuristic is an educated guess of how far the goal is. **Greedy** search always moves to the node that looks closest to the goal — fast but can be fooled. `A*` adds the cost already travelled, so it balances “how far I came” with “how far I still have to go”.',
        analogy: 'Driving to a city you can see on the horizon: greedy heads straight towards it even if the road is a dead end; A* also counts the kilometres already driven, so it finds the shortest route.',
      },
      visual: {
        type: 'comparison',
        title: 'Greedy best-first vs A*',
        items: [
          {
            title: 'Greedy best-first',
            tone: 'muted',
            points: ['f(n) = h(n)', 'Expands the node that looks closest', 'Fast, low effort', 'Not optimal — can be misled', 'Incomplete in infinite spaces'],
          },
          {
            title: 'A* search',
            tone: 'accent',
            points: ['f(n) = g(n) + h(n)', 'Estimated total cost through n', 'Complete', 'Optimal if h is admissible', 'Can use a lot of memory'],
          },
        ],
      },
      explanation: [
        { heading: 'Greedy best-first search' },
        'Uses f(n) = h(n). On the Romania map with **h_SLD** (straight-line distance to Bucharest) it goes Arad → Sibiu → Fagaras → Bucharest = 450 km. The route via Rimnicu Vilcea and Pitesti is 418 km, so greedy is **not optimal**.',
        { heading: 'A* search' },
        'Uses **f(n) = g(n) + h(n)**: g(n) is the cost to reach n, h(n) the estimated cost from n to the goal, so f(n) estimates the cheapest solution through n.',
        {
          list: [
            '**Admissible** heuristic: never overestimates the true cost. Then A* (tree search) is **optimal**.',
            '**Consistent** (monotonic) heuristic: h(n) ≤ c(n, a, n′) + h(n′). Then A* graph search is optimal and f never decreases along a path.',
          ],
        },
        { heading: 'Memory-bounded variants' },
        {
          list: [
            '`IDA*` — iterative deepening using an f-cost limit.',
            '**RBFS** — recursive best-first search with linear space.',
            '`SMA*` — uses all available memory, dropping the worst leaf when full.',
            '**Weighted** `A*` — f = g + W·h (W > 1) for faster but slightly sub-optimal solutions.',
            '**Beam search** — keeps only the best k nodes in the frontier.',
          ],
        },
        { trap: 'Greedy uses **h only**; A* uses **g + h**. Swapping them is the most common mistake.' },
      ],
      example: {
        title: 'A* from Arad (first two expansions)',
        input: 'h_SLD: Arad 366, Sibiu 253, Timisoara 329, Zerind 374, Oradea 380, Rimnicu 193, Fagaras 176',
        output: `Expand Arad:
  Sibiu      f = 140 + 253 = 393   ← smallest
  Timisoara  f = 118 + 329 = 447
  Zerind     f =  75 + 374 = 449
Expand Sibiu:
  Rimnicu V. f = 220 + 193 = 413   ← smallest
  Fagaras    f = 239 + 176 = 415
  Arad       f = 280 + 366 = 646
  Oradea     f = 291 + 380 = 671
… A* finally returns Arad → Sibiu → Rimnicu → Pitesti → Bucharest = 418 km`,
        explanation: 'A* always expands the lowest f. Because h_SLD never overestimates road distance, it is admissible and the 418 km route is optimal.',
      },
      keyPoints: [
        'Informed search uses a heuristic h(n) = estimated cost to goal.',
        'Greedy best-first: f(n) = h(n) — fast, not optimal.',
        'A*: f(n) = g(n) + h(n) — complete and optimal with admissible h.',
        'Admissible: never overestimates. Consistent: obeys triangle inequality.',
        'IDA*, RBFS, SMA* save memory.',
      ],
      importantTerms: [
        { term: 'Heuristic h(n)', meaning: 'Estimated cost of the cheapest path from n to a goal.' },
        { term: 'Admissible', meaning: 'A heuristic that never overestimates the true cost.' },
        { term: 'Consistent', meaning: 'h(n) ≤ step cost to n′ + h(n′) for every successor n′.' },
        { term: 'f(n)', meaning: 'Evaluation function used to order the frontier.' },
      ],
      examPoints: [
        'Write **f(n) = g(n) + h(n)** and define each term.',
        'Trace A* on the Romania map with f-values.',
        'Show greedy’s 450 km vs A*’s 418 km route.',
        'Define **admissible** and **consistent** heuristics.',
      ],
      questions: [
        {
          prompt: 'Explain A* search with an example. When is A* optimal?',
          plan: ANSWER_PLAN(
            'Best-first search with f(n) = g(n) + h(n)',
            'Search tree with f-values at each node',
            'g, h, f; admissible and consistent heuristics; compare with greedy',
            'Arad to Bucharest using straight-line distance',
            'Complete; optimal with admissible h; memory heavy',
          ),
        },
      ],
      keywords: ['informed search', 'heuristic', 'greedy best-first', 'A*', 'f = g + h', 'admissible', 'consistent', 'IDA*'],
      remember: [
        { prompt: 'Evaluation function of A*?', answer: 'f(n) = g(n) + h(n)' },
        { prompt: 'Evaluation function of greedy best-first?', answer: 'f(n) = h(n)' },
        { prompt: 'When is A* optimal?', answer: 'When h is admissible (tree search) or consistent (graph search).' },
      ],
    },

    // ------------------------------------------------------------------
    'heuristic-functions': {
      difficulty: 'medium',
      intro: 'A* is only as good as its heuristic. This topic shows how to measure and invent good ones.',
      definition:
        'A heuristic function h(n) estimates the cost from n to the goal. Its quality is measured by the **effective branching factor** `b*`; a heuristic h₂ **dominates** h₁ if h₂(n) ≥ h₁(n) for all n. Admissible heuristics can be generated from **relaxed problems**, pattern databases or learning.',
      simpleExplanation: {
        text: 'A good heuristic is **as close to the true cost as possible without going over**. A bigger admissible heuristic means A* expands fewer nodes. A simple trick to invent one: remove a rule from the problem and solve the easier version exactly.',
        analogy: 'Estimating travel time by straight-line distance ignores roads — it is never more than the real time, so it is a safe guess.',
      },
      visual: {
        type: 'comparison',
        title: 'Two 8-puzzle heuristics',
        items: [
          {
            title: 'h₁ — misplaced tiles',
            tone: 'muted',
            points: ['Counts tiles not in goal position', 'Admissible — each misplaced tile needs at least one move', 'Weaker estimate'],
          },
          {
            title: 'h₂ — Manhattan distance',
            tone: 'accent',
            points: ['Sum of each tile’s horizontal + vertical distance to its goal', 'Admissible — a move shifts one tile one square', 'Dominates h₁ — fewer nodes expanded'],
          },
        ],
      },
      explanation: [
        { heading: 'Effective branching factor b*' },
        'If A* generates N nodes to find a solution at depth d, b* is the branching factor a uniform tree of depth d would need to contain N + 1 nodes: `N + 1 = 1 + b* + (b*)² + … + (b*)^d`. A good heuristic has b* close to 1.',
        { heading: 'Dominance' },
        'If h₂(n) ≥ h₁(n) for every n and both are admissible, h₂ **dominates** h₁ and A* with h₂ never expands more nodes. Manhattan distance dominates misplaced tiles.',
        { heading: 'Inventing heuristics' },
        {
          list: [
            '**Relaxed problems** — remove constraints. The exact cost of the relaxed problem is an admissible heuristic for the original.',
            '**Pattern databases** — store exact costs for sub-problems (e.g. tiles 1–4) and look them up.',
            '**Landmarks** — precompute costs to selected landmark points (used in route planners).',
            '**Learning** — learn h from many solved examples using features.',
            '**Max of heuristics** — h(n) = max(h₁, h₂, …) is admissible and dominates each.',
          ],
        },
        { tip: '8-puzzle relaxations: “a tile can move anywhere” gives h₁; “a tile can move to any adjacent square” gives h₂.' },
      ],
      example: {
        title: 'Computing h₁ and h₂',
        code: `Start state      Goal state
7 2 4            _ 1 2
5 _ 6            3 4 5
8 3 1            6 7 8`,
        lang: 'text',
        output: `h₁ = 8   (all eight tiles are misplaced)
h₂ = 3+1+2+2+2+3+3+2 = 18   (tiles 1 to 8)
True solution cost = 26`,
        explanation: 'Both values are below 26, so both are admissible. h₂ is closer to the truth, so A* with h₂ explores far fewer nodes.',
      },
      keyPoints: [
        'Good heuristic = admissible and as large as possible.',
        'Effective branching factor b* measures heuristic quality.',
        'h₂ dominates h₁ if h₂(n) ≥ h₁(n) for all n.',
        'Relaxed problems give admissible heuristics.',
        'max(h₁, h₂) is admissible and dominates both.',
      ],
      importantTerms: [
        { term: 'Effective branching factor', meaning: 'b* such that a uniform tree of depth d has N + 1 nodes.' },
        { term: 'Dominance', meaning: 'h₂ ≥ h₁ everywhere, so h₂ is better.' },
        { term: 'Relaxed problem', meaning: 'The problem with fewer restrictions on actions.' },
        { term: 'Pattern database', meaning: 'Stored exact solution costs of sub-problems.' },
      ],
      examPoints: [
        'Define h₁ and h₂ for the 8-puzzle and compute them for a given board.',
        'Explain effective branching factor with its formula.',
        'Explain dominance and relaxed problems.',
      ],
      questions: [
        {
          prompt: 'What is a heuristic function? Explain heuristics for the 8-puzzle and how to generate admissible heuristics.',
          plan: ANSWER_PLAN(
            'Estimate of cost from n to goal',
            'Start and goal 8-puzzle boards',
            'h₁, h₂, effective branching factor, dominance',
            'h₁ = 8, h₂ = 18 for the sample board',
            'Relaxed problems, pattern databases, learning',
          ),
        },
      ],
      keywords: ['heuristic function', 'misplaced tiles', 'Manhattan distance', 'effective branching factor', 'dominance', 'relaxed problem', 'pattern database'],
      remember: [
        { prompt: 'Which 8-puzzle heuristic dominates?', answer: 'h₂, Manhattan distance.' },
        { prompt: 'Ideal effective branching factor?', answer: 'Close to 1.' },
        { prompt: 'How do relaxed problems help?', answer: 'Their exact solution cost is an admissible heuristic.' },
      ],
    },

    // ------------------------------------------------------------------
    'defining-constraint-satisfaction-problems': {
      difficulty: 'medium',
      intro: 'CSPs give the state an inside structure — variables and values — which lets general methods solve puzzles fast.',
      definition:
        'A constraint satisfaction problem (CSP) has three components: a set of **variables** X = {X₁, …, Xₙ}, a set of **domains** D = {D₁, …, Dₙ} (allowed values for each variable), and a set of **constraints** C that restrict which combinations of values are allowed. A **solution** is a **complete** and **consistent** assignment.',
      simpleExplanation: {
        text: 'Instead of a black-box state, a CSP says: here are the blanks to fill, here are the values each blank may take, and here are the rules. Solve it by filling every blank without breaking any rule.',
        analogy: 'Making a class timetable: subjects are variables, time slots are domains, and “one teacher cannot be in two rooms at once” is a constraint.',
      },
      visual: {
        type: 'network',
        title: 'Constraint graph — Australia map colouring',
        center: { label: 'SA', note: 'South Australia' },
        nodes: [
          { label: 'WA', note: '≠ SA' },
          { label: 'NT', note: '≠ SA' },
          { label: 'Q', note: '≠ SA' },
          { label: 'NSW', note: '≠ SA' },
          { label: 'V', note: '≠ SA' },
        ],
        caption: 'Each line is a constraint “adjacent regions must differ”. T (Tasmania) has no neighbours.',
      },
      explanation: [
        { heading: 'Map colouring formulation' },
        {
          list: [
            '**Variables:** WA, NT, Q, NSW, V, SA, T',
            '**Domains:** each Dᵢ = {red, green, blue}',
            '**Constraints:** adjacent regions differ — SA ≠ WA, SA ≠ NT, SA ≠ Q, SA ≠ NSW, SA ≠ V, WA ≠ NT, NT ≠ Q, Q ≠ NSW, NSW ≠ V',
          ],
        },
        { heading: 'Assignments' },
        {
          list: [
            '**Consistent** (legal) — does not violate any constraint.',
            '**Complete** — every variable has a value.',
            '**Partial** — some variables are unassigned.',
          ],
        },
        { heading: 'Types of constraints' },
        {
          table: {
            columns: ['Type', 'Involves', 'Example'],
            rows: [
              ['Unary', 'One variable', 'SA ≠ green'],
              ['Binary', 'Two variables', 'SA ≠ WA'],
              ['Global / higher-order', 'Many variables', 'Alldiff(F, T, U, W, R, O) in cryptarithmetic'],
              ['Preference (soft)', 'Cost, not strict rule', 'Prof. X prefers morning classes'],
            ],
          },
        },
        { heading: 'Kinds of domains' },
        '**Discrete finite** (colours), **discrete infinite** (integers — job start days) and **continuous** (telescope observation times, solved with linear programming).',
        { note: 'The **constraint graph** has a node per variable and an edge between variables in the same constraint.' },
      ],
      example: {
        title: 'A solution to map colouring',
        input: 'Colour 7 Australian regions with 3 colours so neighbours differ.',
        output: `WA = red    NT = green   SA = blue
Q  = red    NSW = green  V  = red
T  = green  (any colour works)`,
        explanation: 'Every variable is assigned (complete) and no two neighbours share a colour (consistent), so it is a solution.',
      },
      keyPoints: [
        'CSP = variables X, domains D, constraints C.',
        'Solution = complete + consistent assignment.',
        'Constraints: unary, binary, global, preference.',
        'Domains: discrete finite, discrete infinite, continuous.',
        'Constraint graph shows which variables are linked.',
      ],
      importantTerms: [
        { term: 'Domain', meaning: 'The set of values a variable can take.' },
        { term: 'Consistent assignment', meaning: 'An assignment that violates no constraint.' },
        { term: 'Global constraint', meaning: 'A constraint over many variables, e.g. Alldiff.' },
        { term: 'Constraint graph', meaning: 'Nodes are variables; edges connect constrained variables.' },
      ],
      examPoints: [
        'Write the **(X, D, C)** definition.',
        'Formulate **Australia map colouring** and draw its constraint graph.',
        'Classify constraints with examples.',
        'Mention cryptarithmetic (TWO + TWO = FOUR) as another CSP.',
      ],
      questions: [
        {
          prompt: 'Define a constraint satisfaction problem. Formulate the map-colouring problem as a CSP.',
          plan: ANSWER_PLAN(
            'Variables, domains, constraints; solution = complete, consistent assignment',
            'Australia constraint graph',
            'Assignments; unary, binary, global constraints; domain types',
            'WA = red, NT = green, SA = blue …',
            'Constraint graph; cryptarithmetic as a second example',
          ),
        },
      ],
      keywords: ['CSP', 'variables', 'domains', 'constraints', 'consistent', 'complete', 'constraint graph', 'Alldiff'],
      remember: [
        { prompt: 'Three components of a CSP?', answer: 'Variables, domains, constraints.' },
        { prompt: 'What is a solution to a CSP?', answer: 'A complete and consistent assignment.' },
        { prompt: 'Example of a global constraint?', answer: 'Alldiff — all variables take different values.' },
      ],
    },

    // ------------------------------------------------------------------
    'constraint-propagation-inference-in-csps': {
      difficulty: 'hard',
      intro: 'Propagation shrinks domains before (and during) search, often solving the problem with no search at all.',
      definition:
        'Constraint propagation uses the constraints to **reduce the domains** of variables, which in turn reduces the domains of other variables. The key idea is **local consistency**: node consistency, arc consistency (AC-3), path consistency and k-consistency.',
      simpleExplanation: {
        text: 'If one variable’s value is fixed, its neighbours can no longer use values that clash. Removing those values may in turn force changes further along. Keep cleaning up until nothing changes.',
        analogy: 'In Sudoku, writing a 5 in a cell lets you cross out 5 from the whole row, column and box — and that may leave another cell with just one option.',
      },
      visual: {
        type: 'flow',
        title: 'AC-3 algorithm',
        steps: [
          { label: 'Queue all arcs', note: '(Xi, Xj) for every constraint' },
          { label: 'Pop an arc', note: '(Xi, Xj)' },
          { label: 'REVISE', note: 'remove x in Di with no support in Dj' },
          { label: 'Di changed?', note: 'add (Xk, Xi) for neighbours Xk' },
          { label: 'Stop', note: 'queue empty or a domain is empty' },
        ],
      },
      explanation: [
        { heading: 'Levels of local consistency' },
        {
          list: [
            '**Node consistency** — every value in a variable’s domain satisfies its unary constraints.',
            '**Arc consistency** — for every value of Xᵢ there is some value of Xⱼ that satisfies the binary constraint (Xᵢ, Xⱼ).',
            '**Path consistency** — any consistent assignment to two variables can be extended to a third.',
            '**k-consistency** — any consistent assignment to k − 1 variables can be extended to a k-th.',
          ],
        },
        { heading: 'AC-3' },
        'AC-3 keeps a queue of arcs. **REVISE(Xᵢ, Xⱼ)** deletes values of Xᵢ that have no support in Xⱼ. If Dᵢ shrinks, all arcs (Xₖ, Xᵢ) pointing to Xᵢ are re-checked. If any domain becomes empty, the CSP has **no solution**.',
        'Time complexity: **O(cd³)** for c binary constraints and domain size d.',
        { heading: 'Global constraints' },
        'For **Alldiff**, if m variables have only n possible distinct values in total and m > n, the constraint cannot be satisfied. For resource limits, **bounds propagation** trims minimum and maximum values.',
        { heading: 'Sudoku' },
        'Sudoku is a CSP with 81 variables, domains {1…9} and 27 Alldiff constraints (9 rows, 9 columns, 9 boxes). Easy puzzles are solved by AC-3 alone.',
      ],
      example: {
        title: 'Arc consistency on Y = X²',
        input: 'X, Y ∈ {0, 1, …, 9}. Constraint: Y = X².',
        output: `REVISE(X, Y): keep X only if X² ∈ D(Y) → D(X) = {0, 1, 2, 3}
REVISE(Y, X): keep Y only if √Y ∈ D(X) → D(Y) = {0, 1, 4, 9}`,
        explanation: 'No search was needed to cut each domain from 10 values to 4.',
      },
      keyPoints: [
        'Propagation reduces domains using constraints.',
        'Node, arc, path and k-consistency are increasing strengths.',
        'AC-3 uses a queue of arcs and REVISE; O(cd³).',
        'An empty domain means no solution.',
        'Sudoku: 81 variables, 27 Alldiff constraints.',
      ],
      importantTerms: [
        { term: 'Arc consistency', meaning: 'Every value of Xi has a supporting value in Xj.' },
        { term: 'REVISE', meaning: 'Removes unsupported values from a domain.' },
        { term: 'Path consistency', meaning: 'Consistency across triples of variables.' },
        { term: 'Bounds propagation', meaning: 'Shrinking numeric domains by their min and max.' },
      ],
      examPoints: [
        'Define node, arc and path consistency.',
        'Write the **AC-3** steps and its complexity.',
        'Solve a small arc-consistency example by hand.',
        'Describe Sudoku as a CSP.',
      ],
      questions: [
        {
          prompt: 'What is constraint propagation? Explain the AC-3 algorithm.',
          plan: ANSWER_PLAN(
            'Using constraints to shrink variable domains',
            'AC-3 flowchart',
            'Node, arc, path, k-consistency; REVISE; complexity O(cd³)',
            'Y = X² domain reduction',
            'Empty domain ⇒ no solution; Sudoku',
          ),
        },
      ],
      keywords: ['constraint propagation', 'node consistency', 'arc consistency', 'AC-3', 'REVISE', 'path consistency', 'k-consistency', 'Sudoku'],
      remember: [
        { prompt: 'What does AC-3 conclude if a domain becomes empty?', answer: 'The CSP has no solution.' },
        { prompt: 'Time complexity of AC-3?', answer: 'O(cd³)' },
        { prompt: 'How many Alldiff constraints in Sudoku?', answer: '27 — 9 rows, 9 columns, 9 boxes.' },
      ],
    },

    // ------------------------------------------------------------------
    'backtracking-search-for-csps': {
      difficulty: 'hard',
      intro: 'The standard way to solve a CSP. The ordering heuristics (MRV, degree, LCV) are frequent short questions.',
      definition:
        'Backtracking search is a **depth-first search** that assigns **one variable at a time** and **backtracks** as soon as a variable has no legal value. It is improved by variable/value ordering heuristics, **forward checking** / MAC inference, and intelligent backtracking (**backjumping**).',
      simpleExplanation: {
        text: 'Pick a variable, give it a value that does not break any rule, and move on. If you reach a variable with no legal value, go back and change the last choice. Smart choices of **which variable** and **which value** make this dramatically faster.',
        analogy: 'Seating guests at a wedding: seat the fussiest guest first (fewest options), and give them the seat that leaves the most options for everyone else.',
      },
      visual: {
        type: 'process',
        title: 'Making backtracking smart',
        steps: [
          { label: 'Choose variable — MRV', detail: 'fewest legal values left (fail-first)' },
          { label: 'Tie-break — degree heuristic', detail: 'most constraints on unassigned variables' },
          { label: 'Choose value — LCV', detail: 'least constraining value (fail-last)' },
          { label: 'Inference — forward checking / MAC', detail: 'prune neighbours’ domains' },
          { label: 'On failure — backjumping', detail: 'jump back to the cause of the conflict' },
        ],
      },
      explanation: [
        {
          code: 'function BACKTRACK(csp, assignment)\n  if assignment is complete then return assignment\n  var ← SELECT-UNASSIGNED-VARIABLE(csp, assignment)\n  for each value in ORDER-DOMAIN-VALUES(csp, var, assignment)\n    if value is consistent with assignment\n      add {var = value} to assignment\n      inferences ← INFERENCE(csp, var, assignment)\n      if inferences ≠ failure\n        result ← BACKTRACK(csp, assignment)\n        if result ≠ failure then return result\n      remove {var = value} and inferences\n  return failure',
          lang: 'text',
        },
        { heading: 'Variable and value ordering' },
        {
          list: [
            '**MRV (minimum remaining values)** — choose the variable with the fewest legal values. Detects failure early.',
            '**Degree heuristic** — break ties by choosing the variable involved in the most constraints with unassigned variables (SA in the map).',
            '**LCV (least constraining value)** — try the value that rules out the fewest choices for neighbours.',
          ],
        },
        { heading: 'Interleaving search and inference' },
        {
          list: [
            '**Forward checking** — after assigning X, delete inconsistent values from the domains of X’s unassigned neighbours.',
            '**MAC (maintaining arc consistency)** — after each assignment run AC-3 on the neighbours; detects more failures than forward checking.',
          ],
        },
        { heading: 'Intelligent backtracking' },
        '**Chronological backtracking** goes back to the most recent variable. **Conflict-directed backjumping** goes back to the variable that actually caused the conflict (its **conflict set**). **Constraint learning** records the bad combination (a **no-good**) so it is never tried again.',
      ],
      example: {
        title: 'Forward checking on the map',
        input: 'Assign WA = red, then Q = green.',
        output: `After WA = red  : NT ∈ {G, B}, SA ∈ {G, B}
After Q = green : NT ∈ {B}, SA ∈ {B}, NSW ∈ {R, B}
NT and SA both have only {B} and are neighbours → failure detected`,
        explanation: 'Forward checking keeps the domains up to date; MAC would spot the NT–SA clash immediately and backtrack before assigning further.',
      },
      keyPoints: [
        'Backtracking = DFS assigning one variable at a time.',
        'MRV picks the most constrained variable (fail-first).',
        'Degree heuristic breaks ties.',
        'LCV picks the least constraining value (fail-last).',
        'Forward checking and MAC prune domains during search.',
        'Backjumping returns to the true cause of failure.',
      ],
      importantTerms: [
        { term: 'MRV', meaning: 'Choose the variable with the fewest legal values.' },
        { term: 'LCV', meaning: 'Choose the value that leaves most options for neighbours.' },
        { term: 'Forward checking', meaning: 'Remove values from neighbours’ domains after an assignment.' },
        { term: 'Backjumping', meaning: 'Backtrack to the variable that caused the conflict.' },
      ],
      examPoints: [
        'Write the **backtracking pseudocode**.',
        'Explain **MRV, degree heuristic and LCV** with the map example.',
        'Contrast forward checking with MAC.',
        'Explain conflict-directed backjumping.',
      ],
      questions: [
        {
          prompt: 'Explain backtracking search for CSPs and the heuristics used to improve it.',
          plan: ANSWER_PLAN(
            'DFS that assigns one variable at a time and backtracks on failure',
            'Partial search tree for map colouring',
            'MRV, degree, LCV; forward checking, MAC; backjumping',
            'WA = red, Q = green forward checking trace',
            'Fail-first for variables, fail-last for values',
          ),
        },
      ],
      keywords: ['backtracking', 'MRV', 'degree heuristic', 'LCV', 'forward checking', 'MAC', 'backjumping', 'conflict set', 'no-good'],
      remember: [
        { prompt: 'Which heuristic picks the variable with fewest legal values?', answer: 'MRV — minimum remaining values.' },
        { prompt: 'Which heuristic orders values?', answer: 'LCV — least constraining value.' },
        { prompt: 'Forward checking vs MAC?', answer: 'MAC runs full arc consistency after each assignment; forward checking checks only direct neighbours.' },
      ],
    },

    // ------------------------------------------------------------------
    'local-search-for-csps': {
      difficulty: 'medium',
      intro: 'For huge CSPs like n-queens with a million queens, fixing a complete assignment beats building one step by step.',
      definition:
        'Local search for CSPs starts with a **complete assignment** (possibly violating constraints) and repeatedly changes the value of one variable to reduce violations. The **min-conflicts** heuristic picks the value that results in the fewest conflicts with other variables.',
      simpleExplanation: {
        text: 'Put every queen somewhere, even if they attack each other. Then pick a queen in trouble and move it to the square in its column with the fewest attacks. Repeat until no queen is attacked.',
        analogy: 'Rearranging a messy seating plan by moving one unhappy person at a time to the seat where they are least unhappy.',
      },
      visual: {
        type: 'flow',
        title: 'Min-conflicts loop',
        steps: [
          { label: 'Complete assignment', note: 'random or greedy start' },
          { label: 'Solution?', note: 'yes → return it' },
          { label: 'Pick conflicted var', note: 'chosen at random' },
          { label: 'Min-conflicts value', note: 'fewest violations' },
          { label: 'Repeat', note: 'up to max_steps' },
        ],
      },
      explanation: [
        {
          code: 'function MIN-CONFLICTS(csp, max_steps)\n  current ← an initial complete assignment\n  for i = 1 to max_steps\n    if current is a solution then return current\n    var ← a randomly chosen conflicted variable\n    value ← the value v of var that minimises CONFLICTS(var, v, current)\n    set var = value in current\n  return failure',
          lang: 'text',
        },
        'Min-conflicts solves the **million-queens** problem in about 50 steps on average, and has scheduled observations for the Hubble Space Telescope.',
        { heading: 'Escaping plateaux and local minima' },
        {
          list: [
            '**Tabu search** — keep a short list of recent states and do not return to them.',
            '**Constraint weighting** — give each constraint a weight; increase the weight of violated constraints so the search focuses on the hard ones.',
            '**Random restarts / simulated annealing** — occasionally make random moves.',
          ],
        },
        { tip: 'Local search suits **online** settings: if a schedule changes (bad weather closes an airport), repair the current assignment instead of starting over.' },
      ],
      example: {
        title: 'One min-conflicts step for 8-queens',
        input: 'Queen in column 8 is attacked by 2 queens.',
        output: `Conflicts if moved to each row of column 8:
row: 1 2 3 4 5 6 7 8
     3 2 2 3 1 2 3 2
Move it to row 5 (only 1 conflict)`,
        explanation: 'Each step greedily reduces conflicts in one column; ties are broken at random.',
      },
      keyPoints: [
        'Local search uses complete, possibly inconsistent assignments.',
        'Min-conflicts: change a conflicted variable to the value with fewest conflicts.',
        'Very fast for n-queens and scheduling.',
        'Tabu search and constraint weighting escape plateaux.',
        'Good for repairing schedules online.',
      ],
      importantTerms: [
        { term: 'Min-conflicts', meaning: 'Heuristic that chooses the value causing the fewest constraint violations.' },
        { term: 'Tabu search', meaning: 'Local search that forbids recently visited states.' },
        { term: 'Constraint weighting', meaning: 'Raising weights of violated constraints to guide search.' },
      ],
      examPoints: [
        'Write the **MIN-CONFLICTS** algorithm.',
        'Illustrate with **8-queens**.',
        'Mention tabu search, constraint weighting and online repair.',
      ],
      questions: [
        {
          prompt: 'Explain local search for CSPs using the min-conflicts heuristic.',
          plan: ANSWER_PLAN(
            'Start from a complete assignment and reduce conflicts',
            '8-queens board with conflict counts',
            'MIN-CONFLICTS steps; tabu search; constraint weighting',
            'Moving a queen to the row with fewest conflicts',
            'Fast for million-queens; online repair',
          ),
        },
      ],
      keywords: ['local search', 'complete assignment', 'min-conflicts', 'n-queens', 'tabu search', 'constraint weighting', 'plateau'],
      remember: [
        { prompt: 'Does local search start with a partial or complete assignment?', answer: 'A complete assignment.' },
        { prompt: 'Which value does min-conflicts choose?', answer: 'The one causing the fewest constraint violations.' },
        { prompt: 'Name one way to escape a plateau.', answer: 'Tabu search (or constraint weighting).' },
      ],
    },

    // ------------------------------------------------------------------
    'the-structure-of-problems': {
      difficulty: 'hard',
      intro: 'Look at the shape of the constraint graph: some shapes, especially trees, can be solved in linear time.',
      definition:
        'The structure of a CSP — the shape of its **constraint graph** — can make it much easier. Independent **subproblems** can be solved separately, **tree-structured** CSPs are solved in O(nd²) time, and nearly-tree problems are handled by **cutset conditioning** or **tree decomposition**.',
      simpleExplanation: {
        text: 'If the constraint graph splits into separate pieces, solve each piece on its own. If it is a **tree** (no loops), you can solve it in one pass without backtracking. If it is almost a tree, remove a few variables to make it one.',
        analogy: 'Untangling earphones: once you find there are no loops, you can straighten them in one go.',
      },
      visual: {
        type: 'process',
        title: 'Solving a tree-structured CSP',
        steps: [
          { label: 'Pick a root', detail: 'any variable' },
          { label: 'Topological sort', detail: 'order so each node comes after its parent' },
          { label: 'Backward pass', detail: 'for j = n down to 2: make arc (Parent(Xj), Xj) consistent' },
          { label: 'Forward pass', detail: 'for i = 1 to n: assign Xi any value consistent with its parent' },
        ],
      },
      explanation: [
        { heading: 'Independent subproblems' },
        'Tasmania is not connected to the mainland, so it can be coloured separately. Splitting n variables into subproblems of c variables changes the work from O(dⁿ) to **O(dᶜ · n/c)** — linear in n.',
        { heading: 'Tree-structured CSPs' },
        'A CSP whose constraint graph is a tree can be solved in **O(nd²)** time: make the tree **directed arc-consistent** from the leaves up, then assign values from the root down with no backtracking.',
        { heading: 'Reducing graphs to trees' },
        {
          list: [
            '**Cutset conditioning** — choose a **cycle cutset** S (variables whose removal leaves a tree). Try every consistent assignment to S and solve the remaining tree. Time O(d^c · (n − c)d²) for cutset size c. In the map, removing SA leaves a tree.',
            '**Tree decomposition** — group variables into overlapping subproblems that form a tree; solve each and combine. Efficiency depends on the **tree width** w: O(n·d^(w+1)).',
          ],
        },
        { heading: 'Value symmetry' },
        'Swapping colour names gives equivalent solutions (3! = 6 for map colouring). Adding a **symmetry-breaking constraint** such as NT < SA < WA (alphabetical colours) removes duplicates.',
      ],
      example: {
        title: 'Cutset conditioning on Australia',
        input: 'Constraint graph has cycles through SA.',
        output: `Cycle cutset S = {SA}
Try SA = red    → remaining graph WA–NT–Q–NSW–V is a chain (tree)
Remove red from neighbours' domains, solve the tree in O(nd²)
If it fails, try SA = green, then SA = blue`,
        explanation: 'Fixing one variable breaks every cycle, so each attempt is solved in linear time without backtracking.',
      },
      keyPoints: [
        'Independent subproblems are solved separately.',
        'Tree-structured CSPs: O(nd²), no backtracking.',
        'Cutset conditioning: fix a cycle cutset, solve the rest as a tree.',
        'Tree decomposition: complexity depends on tree width.',
        'Symmetry-breaking constraints remove duplicate solutions.',
      ],
      importantTerms: [
        { term: 'Cycle cutset', meaning: 'A set of variables whose removal leaves a tree.' },
        { term: 'Directed arc consistency', meaning: 'Each variable is arc-consistent with every later variable in the order.' },
        { term: 'Tree width', meaning: 'Size of the largest subproblem in a tree decomposition minus one.' },
        { term: 'Value symmetry', meaning: 'Solutions that differ only by renaming values.' },
      ],
      examPoints: [
        'Explain **independent subproblems** with Tasmania.',
        'Give the **tree-CSP algorithm** and O(nd²) complexity.',
        'Explain **cutset conditioning** with SA as the cutset.',
        'Mention tree decomposition and tree width.',
      ],
      questions: [
        {
          prompt: 'How does the structure of a problem help in solving CSPs? Explain cutset conditioning.',
          plan: ANSWER_PLAN(
            'Shape of the constraint graph decides difficulty',
            'Constraint graph before and after removing SA',
            'Independent subproblems; tree CSP algorithm; cutset conditioning; tree decomposition',
            'Australia with cutset {SA}',
            'Tree CSP in O(nd²); symmetry breaking',
          ),
        },
      ],
      keywords: ['independent subproblems', 'tree-structured CSP', 'topological sort', 'directed arc consistency', 'cycle cutset', 'tree decomposition', 'tree width'],
      remember: [
        { prompt: 'Time to solve a tree-structured CSP?', answer: 'O(nd²)' },
        { prompt: 'What is a cycle cutset?', answer: 'Variables whose removal leaves the constraint graph a tree.' },
        { prompt: 'Cutset in the Australia map?', answer: '{SA}' },
      ],
    },
  },
}
