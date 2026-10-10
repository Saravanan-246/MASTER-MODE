// PHP and MySQL — Unit III: Arrays & Web Databases.
// Topic ids match the syllabus outline in ../subjects.js (24CSU5CA).
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
    'Unit III has two halves. First you learn to keep many values in one variable — arrays of every shape, how to combine them and how to sort them. Then you switch to MySQL: what a relational database is, how to design one for a web site, and how to create the database, its tables and its columns.',

  map: [
    { label: 'Array basics', topics: ['array', 'numerically-indexed-arrays', 'arrays-with-different-indices'] },
    { label: 'Work with arrays', topics: ['array-operators', 'multidimensional-arrays', 'sorting-arrays'] },
    { label: 'Database ideas', topics: ['relational-database-concepts', 'designing-web-database'] },
    {
      label: 'Build it in MySQL',
      topics: ['creating-web-database', 'creating-database-tables', 'understanding-mysql-identifiers', 'choosing-column-data-types'],
    },
  ],

  topics: {
    // ------------------------------------------------------------------
    array: {
      difficulty: 'easy',
      intro: 'Ten students, fifty products, a whole timetable — arrays are how PHP holds a list instead of one value.',
      definition:
        'An array is a single variable that stores a set or sequence of values. Each value is an **element**, and each element is reached through its **index** (also called a key).',
      simpleExplanation: {
        text: 'A normal variable holds one value. An array holds many, each in its own numbered or named slot. You use one name, `$marks`, and pick a slot with square brackets: `$marks[0]`.',
        analogy: 'A variable is one locker. An array is a row of lockers with one name painted on the row and a number on each door.',
        sketch: {
          type: 'boxes',
          items: [
            { label: '$subjects[0]', value: "'PHP'", tag: 'index 0' },
            { label: '$subjects[1]', value: "'Java'", tag: 'index 1' },
            { label: '$subjects[2]', value: "'Python'", tag: 'index 2' },
          ],
        },
      },
      visual: {
        type: 'hierarchy',
        title: 'Kinds of arrays in PHP',
        root: 'PHP arrays',
        children: [
          { label: 'Numerically indexed', note: 'Keys are 0, 1, 2 …', children: ["['PHP', 'Java']"] },
          { label: 'Associative', note: 'Keys are names (strings)', children: ["['PHP' => 85]"] },
          { label: 'Multidimensional', note: 'Elements are arrays', children: ['$table[1][2]'] },
        ],
      },
      explanation: [
        { heading: 'Key words' },
        {
          list: [
            '**Element** — one value stored in the array.',
            '**Index / key** — the label used to reach an element. Numeric indices start at **0**.',
            '**Length** — the number of elements, found with `count($array)`.',
          ],
        },
        { heading: 'Creating an array' },
        'PHP has two equivalent ways to write an array literal:',
        {
          code: `$subjects = array('PHP', 'Java', 'Python');  // classic syntax
$subjects = ['PHP', 'Java', 'Python'];        // short syntax (PHP 5.4+)`,
        },
        'An array can also grow one element at a time. Writing `$list[] = value` adds the value at the next free numeric index, and creates the array if it does not exist yet.',
        { heading: 'Arrays in PHP are flexible' },
        {
          list: [
            'One array can mix types: `[101, "Arun", 88.5, true]`.',
            'The size is not fixed — elements can be added or removed at any time.',
            'Keys can be integers, strings, or a mix of both.',
          ],
        },
        { tip: 'Use `print_r($array)` or `var_dump($array)` to see everything inside an array while testing.' },
      ],
      example: {
        title: 'Build an array and look inside it',
        code: `<?php
$subjects = ['PHP', 'Java'];
$subjects[] = 'Python';          // added at index 2

echo $subjects[0] . '<br>';
echo 'Total: ' . count($subjects) . '<br>';
print_r($subjects);
?>`,
        output: `PHP
Total: 3
Array ( [0] => PHP [1] => Java [2] => Python )`,
        explanation:
          '`$subjects[] =` appended a third element. `count()` returns 3, and `print_r()` shows each index next to its value.',
      },
      keyPoints: [
        'An array stores many values under one variable name.',
        'Each element has an index (key); numeric indices start at 0.',
        'Create with `array(...)` or `[...]`; append with `$a[] = value`.',
        '`count()` gives the number of elements.',
        'PHP has numerically indexed, associative and multidimensional arrays.',
      ],
      importantTerms: [
        { term: 'Array', meaning: 'A variable that stores a set or sequence of values.' },
        { term: 'Element', meaning: 'One value inside an array.' },
        { term: 'Index / key', meaning: 'The number or name used to reach an element.' },
        { term: '`count()`', meaning: 'Returns the number of elements in an array.' },
        { term: '`print_r()`', meaning: 'Prints an array in a readable key => value form.' },
      ],
      examPoints: [
        'Define array, element and index; state that indices start at 0.',
        'Show both creation syntaxes: `array()` and `[]`.',
        'Name the three kinds: numerically indexed, associative, multidimensional.',
        'Mention `count()` and `print_r()`.',
      ],
      questions: [
        {
          prompt: 'What is an array? Explain the types of arrays in PHP.',
          plan: ANSWER_PLAN(
            'One variable holding many values, each reached by an index',
            'Tree: PHP arrays → numeric, associative, multidimensional',
            'Elements, keys starting at 0, array() and [] syntax, appending with $a[]',
            'Build $subjects, append, print with print_r',
            'Flexible size and types; count() for length',
          ),
        },
      ],
      keywords: ['array', 'element', 'index', 'key', 'array()', '[]', 'count()', 'print_r()'],
      remember: [
        { prompt: 'What is the first numeric index of a PHP array?', answer: '0' },
        { prompt: 'How do you add an element at the end?', answer: '`$array[] = value;`' },
        { prompt: 'Which function counts the elements?', answer: '`count($array)`' },
      ],
    },

    // ------------------------------------------------------------------
    'numerically-indexed-arrays': {
      difficulty: 'easy',
      intro: 'The simplest array: a plain list where PHP numbers each item for you.',
      definition:
        'A numerically indexed array is an array whose keys are integers. By default PHP assigns them automatically, starting at 0 and increasing by 1.',
      simpleExplanation: {
        text: 'You list the values; PHP numbers them 0, 1, 2 … You read, change or add an element using its number, and you visit every element with a `for` or `foreach` loop.',
        analogy: 'Seats in a cinema row: seat 0, seat 1, seat 2. You find a person by their seat number.',
      },
      visual: {
        type: 'database',
        title: '$products — index and value',
        table: {
          name: '$products',
          columns: [{ name: 'Index', key: true }, 'Value'],
          rows: [
            ['0', "'Notebook'"],
            ['1', "'Pen'"],
            ['2', "'Stapler'"],
          ],
        },
      },
      explanation: [
        { heading: 'Initialising' },
        {
          code: `$products = ['Notebook', 'Pen', 'Stapler'];
$numbers  = range(1, 10);        // 1, 2, 3 … 10
$odds     = range(1, 10, 2);     // 1, 3, 5, 7, 9
$letters  = range('a', 'e');     // a, b, c, d, e`,
        },
        '`range()` builds a numeric array of a sequence for you. The optional third argument is the step.',
        { heading: 'Accessing and changing elements' },
        {
          list: [
            "Read: `$products[0]` gives `'Notebook'`.",
            "Change: `$products[1] = 'Gel Pen';` replaces the value at index 1.",
            "Add: `$products[] = 'Ruler';` puts the value at index 3.",
          ],
        },
        { heading: 'Looping through the array' },
        {
          code: `for ($i = 0; $i < count($products); $i++) {
    echo $products[$i] . ' ';
}

foreach ($products as $item) {
    echo $item . ' ';
}`,
        },
        '`for` uses the index explicitly. `foreach` hands you each value in turn and needs no counter — it is the usual choice.',
        { trap: 'The last index is `count($a) - 1`, not `count($a)`. Using `<=` in the `for` loop reads past the end.' },
      ],
      example: {
        title: 'Print a numbered product list',
        code: `<?php
$products = ['Notebook', 'Pen', 'Stapler'];
$products[] = 'Ruler';

foreach ($products as $i => $item) {
    echo ($i + 1) . '. ' . $item . '<br>';
}
?>`,
        output: `1. Notebook
2. Pen
3. Stapler
4. Ruler`,
        explanation:
          "`foreach ($products as $i => $item)` gives both the index and the value. Adding 1 turns the 0-based index into a human-friendly number.",
      },
      keyPoints: [
        'Keys are integers, assigned automatically from 0.',
        '`range(start, end, step)` creates a numeric sequence array.',
        'Read and write with `$a[index]`; append with `$a[]`.',
        'Loop with `for` (using the index) or `foreach` (value by value).',
      ],
      importantTerms: [
        { term: 'Numeric index', meaning: 'An integer key: 0, 1, 2 …' },
        { term: '`range()`', meaning: 'Returns an array containing a sequence of numbers or letters.' },
        { term: '`foreach`', meaning: 'Loop that visits every element of an array in order.' },
      ],
      examPoints: [
        'Define with the 0-based index rule.',
        'Show initialisation with `[]` and with `range()`.',
        'Show access, modification and appending.',
        'Write both a `for` loop and a `foreach` loop over the same array.',
      ],
      questions: [
        {
          prompt: 'Explain numerically indexed arrays in PHP with an example.',
          plan: ANSWER_PLAN(
            'Array with integer keys starting at 0',
            'Index/value table for a small array',
            'Initialising, range(), accessing, changing, appending',
            'for and foreach loops printing the list',
            'Last index is count − 1',
          ),
        },
      ],
      keywords: ['numeric index', 'zero-based', 'range()', 'for loop', 'foreach', 'count()'],
      remember: [
        { prompt: 'What does `range(2, 10, 4)` return?', answer: '`[2, 6, 10]`' },
        { prompt: 'What is the last valid index of a 5-element array?', answer: '4' },
      ],
    },

    // ------------------------------------------------------------------
    'arrays-with-different-indices': {
      difficulty: 'medium',
      intro: 'Numbers are poor labels for prices or marks. Associative arrays let you use names as keys.',
      definition:
        'An array with different indices — an **associative array** — uses keys of your choice, usually strings, instead of automatic numbers. Each element is a **key => value** pair.',
      simpleExplanation: {
        text: "Instead of `$marks[0]`, you write `$marks['PHP']`. The key tells you what the value means, so the code reads like a sentence.",
        analogy: 'A phone contact list: you look people up by name, not by their position in the list.',
        sketch: {
          type: 'boxes',
          items: [
            { label: "$prices['Notebook']", value: '40', tag: 'key => value' },
            { label: "$prices['Pen']", value: '10' },
            { label: "$prices['Stapler']", value: '85' },
          ],
        },
      },
      visual: {
        type: 'comparison',
        title: 'Numeric keys vs your own keys',
        items: [
          {
            title: 'Numerically indexed',
            tone: 'muted',
            points: ["$p[0] — 'Notebook'", 'Keys made by PHP', 'Order is the meaning'],
          },
          {
            title: 'Associative',
            tone: 'accent',
            points: ["$p['Notebook'] — 40", 'Keys chosen by you', 'Key carries the meaning'],
          },
        ],
      },
      explanation: [
        { heading: 'Creating an associative array' },
        {
          code: `$prices = ['Notebook' => 40, 'Pen' => 10, 'Stapler' => 85];

// or one element at a time
$prices = [];
$prices['Notebook'] = 40;
$prices['Pen']      = 10;`,
        },
        'The `=>` operator joins a key to its value.',
        { heading: 'Looping with keys' },
        'A plain `for` loop cannot work because the keys are not 0, 1, 2. Use `foreach` with both a key and a value variable:',
        {
          code: `foreach ($prices as $item => $price) {
    echo "$item costs Rs. $price<br>";
}`,
        },
        { heading: 'Older styles you may see' },
        'The textbook also shows `each()` with `list()` inside a `while` loop. `each()` was deprecated in PHP 7.2 and **removed in PHP 8**, so use `foreach` in new code. `list()` (or `[$a, $b] = ...`) is still valid for unpacking values into variables.',
        { heading: 'Useful checks' },
        {
          list: [
            "`array_key_exists('Pen', $prices)` — is the key present?",
            "`isset($prices['Pen'])` — is the key present and not `null`?",
            '`array_keys($prices)` / `array_values($prices)` — just the keys or just the values.',
          ],
        },
        { note: 'Keys are unique. Assigning to an existing key replaces the old value.' },
      ],
      example: {
        title: 'Marks by subject',
        code: `<?php
$marks = ['PHP' => 85, 'Java' => 78, 'Python' => 92];
$marks['DBMS'] = 81;              // new key

foreach ($marks as $subject => $mark) {
    echo "$subject: $mark<br>";
}
echo 'Average: ' . array_sum($marks) / count($marks);
?>`,
        output: `PHP: 85
Java: 78
Python: 92
DBMS: 81
Average: 84`,
        explanation:
          'Each subject name is a key. `foreach` gives the key and value together, and `array_sum()` adds all the values (336 ÷ 4 = 84).',
      },
      keyPoints: [
        'Associative arrays use keys you choose, usually strings.',
        'Write pairs with `key => value`.',
        'Loop with `foreach ($a as $key => $value)`.',
        '`each()` is removed in PHP 8 — use `foreach`.',
        'Keys are unique; reassigning a key overwrites its value.',
      ],
      importantTerms: [
        { term: 'Associative array', meaning: 'An array whose keys are names rather than automatic numbers.' },
        { term: '`=>`', meaning: 'Pairs a key with its value inside an array literal.' },
        { term: '`array_key_exists()`', meaning: 'Checks whether a key is present in an array.' },
        { term: '`list()`', meaning: 'Assigns array values to several variables in one step.' },
      ],
      examPoints: [
        'Define associative array and contrast it with a numeric array.',
        'Show creation with `=>` and element-by-element assignment.',
        'Show the `foreach` key/value loop and its output.',
        'Mention that `each()` was removed in PHP 8.',
      ],
      questions: [
        {
          prompt: 'What is an associative array? How do you loop through it? Give an example.',
          plan: ANSWER_PLAN(
            'Array with chosen keys; each element is a key => value pair',
            'Numeric vs associative comparison',
            'Creating with =>, accessing by key, foreach with $key => $value',
            'Marks-by-subject script and output',
            'Keys unique; each() removed in PHP 8',
          ),
        },
      ],
      keywords: ['associative array', 'key => value', 'foreach', 'array_key_exists', 'list()', 'unique keys'],
      remember: [
        { prompt: 'Which operator pairs a key with a value?', answer: '`=>`' },
        { prompt: 'Why can a counting `for` loop not walk an associative array?', answer: 'Its keys are not 0, 1, 2 …' },
      ],
    },

    // ------------------------------------------------------------------
    'array-operators': {
      difficulty: 'medium',
      intro: 'Arrays have their own small set of operators — for joining and comparing whole arrays at once.',
      definition:
        'Array operators work on entire arrays. PHP provides **union** (`+`) to combine arrays and **equality** (`==`), **identity** (`===`) and their negations to compare them.',
      simpleExplanation: {
        text: '`$a + $b` keeps everything in `$a` and adds only the keys of `$b` that `$a` does not already have. The comparison operators ask: do these two arrays hold the same pairs?',
        analogy: 'Union is like merging two guest lists where the first list wins: anyone already on list A keeps their seat, and only new names from list B are added.',
      },
      visual: {
        type: 'comparison',
        title: 'Array operators',
        table: {
          columns: ['Operator', 'Name', 'Result'],
          rows: [
            ['`$a + $b`', 'Union', 'All of $a, plus keys of $b that $a lacks'],
            ['`$a == $b`', 'Equality', 'True if same key/value pairs'],
            ['`$a === $b`', 'Identity', 'True if same pairs, same order, same types'],
            ['`$a != $b`', 'Inequality', 'True if not equal'],
            ['`$a <> $b`', 'Inequality', 'Same as !='],
            ['`$a !== $b`', 'Non-identity', 'True if not identical'],
          ],
        },
      },
      explanation: [
        { heading: 'Union: the first array wins' },
        {
          code: `$a = ['x' => 1, 'y' => 2];
$b = ['y' => 99, 'z' => 3];
print_r($a + $b);   // Array ( [x] => 1 [y] => 2 [z] => 3 )`,
        },
        "Key `y` exists in both. Union keeps `$a`'s value (2) and ignores 99.",
        {
          trap: "With numeric arrays, `['a', 'b'] + ['c', 'd', 'e']` gives `['a', 'b', 'e']` — keys 0 and 1 already exist. To append lists, use `array_merge()` instead.",
        },
        { heading: 'Equality vs identity' },
        {
          code: `$p = ['a' => 1, 'b' => 2];
$q = ['b' => 2, 'a' => 1];
$r = ['a' => '1', 'b' => '2'];

var_dump($p == $q);   // true  — same pairs
var_dump($p === $q);  // false — different order
var_dump($p == $r);   // true  — '1' == 1
var_dump($p === $r);  // false — string vs int`,
        },
        { tip: 'Remember the rule: `==` compares pairs loosely; `===` also checks order and types.' },
      ],
      example: {
        title: 'Default settings + user settings',
        code: `<?php
$user     = ['theme' => 'dark'];
$defaults = ['theme' => 'light', 'lang' => 'en'];

$settings = $user + $defaults;   // user choices win
print_r($settings);
?>`,
        output: 'Array ( [theme] => dark [lang] => en )',
        explanation:
          '`theme` came from `$user` because the left array wins. `lang` was missing from `$user`, so it was filled in from `$defaults`.',
      },
      keyPoints: [
        '`+` is union: keeps the left array and adds only new keys from the right.',
        '`==` true when both arrays have the same key/value pairs.',
        '`===` also requires the same order and the same types.',
        '`!=` and `<>` mean the same; `!==` is non-identity.',
        'Use `array_merge()` to append numeric lists.',
      ],
      importantTerms: [
        { term: 'Union', meaning: 'Combining arrays with `+`; duplicate keys keep the left value.' },
        { term: 'Equality (`==`)', meaning: 'Same key/value pairs, loose comparison.' },
        { term: 'Identity (`===`)', meaning: 'Same pairs, same order, same types.' },
      ],
      examPoints: [
        'Draw the six-row operator table.',
        'Explain why union keeps the left value for duplicate keys.',
        'Give one example where `==` is true but `===` is false.',
      ],
      questions: [
        {
          prompt: 'Explain the array operators available in PHP with examples.',
          plan: ANSWER_PLAN(
            'Operators that act on whole arrays: union and comparison',
            'Operator / name / result table',
            'Union rule for duplicate keys; == vs ===; != <> !==',
            'Defaults + user settings script',
            'Use array_merge() to append lists',
          ),
        },
      ],
      keywords: ['union +', 'equality ==', 'identity ===', 'inequality != <>', 'non-identity !==', 'array_merge()'],
      remember: [
        { prompt: "What is `['a'=>1] + ['a'=>5, 'b'=>2]`?", answer: "`['a'=>1, 'b'=>2]`" },
        { prompt: 'What does `===` check that `==` does not?', answer: 'Order and types of the elements.' },
      ],
    },

    // ------------------------------------------------------------------
    'multidimensional-arrays': {
      difficulty: 'medium',
      intro: 'Real data is a table: many rows, each with several fields. A multidimensional array holds exactly that.',
      definition:
        'A multidimensional array is an array whose elements are themselves arrays. A two-dimensional array is like a table of rows and columns; each element is reached with two indices, such as `$table[row][column]`.',
      simpleExplanation: {
        text: 'Put one array (a row) inside another array (the list of rows) and you have a grid. The first index picks the row, the second picks the column.',
        analogy: 'A spreadsheet: “row 2, column 3” finds one cell, just like `$sheet[2][3]`.',
      },
      visual: {
        type: 'database',
        title: '$students[row][column]',
        table: {
          name: '$students',
          columns: [{ name: 'row', key: true }, '[0] roll', '[1] name', '[2] marks'],
          rows: [
            ['[0]', "'CS101'", "'Arun'", '88'],
            ['[1]', "'CS102'", "'Priya'", '92'],
            ['[2]', "'CS103'", "'Karthik'", '75'],
          ],
        },
        highlight: [1],
        caption: "`$students[1][1]` is `'Priya'` — row 1, column 1.",
      },
      explanation: [
        { heading: 'A numeric 2-D array' },
        {
          code: `$students = [
    ['CS101', 'Arun', 88],
    ['CS102', 'Priya', 92],
    ['CS103', 'Karthik', 75],
];
echo $students[1][1];   // Priya`,
        },
        { heading: 'Rows with named columns' },
        'Each row can be associative, so the column is reached by name. This is how database rows usually look in PHP.',
        {
          code: `$students = [
    ['roll' => 'CS101', 'name' => 'Arun',  'marks' => 88],
    ['roll' => 'CS102', 'name' => 'Priya', 'marks' => 92],
];
echo $students[0]['name'];   // Arun`,
        },
        { heading: 'Looping: one loop per dimension' },
        {
          code: `for ($row = 0; $row < count($students); $row++) {
    for ($col = 0; $col < 3; $col++) {
        echo $students[$row][$col] . ' ';
    }
    echo '<br>';
}`,
        },
        '`foreach` nests the same way: the outer loop gives a row, the inner loop walks that row.',
        { heading: 'Three dimensions and beyond' },
        'A three-dimensional array adds one more index, for example `$marks[$class][$student][$subject]`. Arrays of any depth are allowed, but two or three dimensions cover most needs.',
      ],
      example: {
        title: 'Print a student table',
        code: `<?php
$students = [
    ['roll' => 'CS101', 'name' => 'Arun',  'marks' => 88],
    ['roll' => 'CS102', 'name' => 'Priya', 'marks' => 92],
];

echo '<table border="1">';
foreach ($students as $s) {
    echo '<tr>';
    foreach ($s as $value) {
        echo "<td>$value</td>";
    }
    echo '</tr>';
}
echo '</table>';
?>`,
        output: `| CS101 | Arun  | 88 |
| CS102 | Priya | 92 |`,
        explanation:
          'The outer `foreach` takes one student (a row) at a time; the inner `foreach` prints each field of that row as a table cell.',
      },
      keyPoints: [
        'A multidimensional array is an array of arrays.',
        'Two indices for 2-D: `$a[row][column]`.',
        'Rows can be numeric or associative.',
        'Use nested loops: one loop per dimension.',
        '3-D arrays add a third index, e.g. class → student → subject.',
      ],
      importantTerms: [
        { term: 'Two-dimensional array', meaning: 'Array of rows, each row an array of columns.' },
        { term: 'Nested loop', meaning: 'A loop inside another loop, used to visit every cell.' },
        { term: 'Three-dimensional array', meaning: 'Array of 2-D arrays, reached with three indices.' },
      ],
      examPoints: [
        'Define with the table (row/column) picture.',
        'Show a numeric 2-D array and an array of associative rows.',
        'Write a nested `for` or `foreach` loop and its output.',
        'Mention 3-D arrays briefly.',
      ],
      questions: [
        {
          prompt: 'What is a multidimensional array? Write a PHP program to display a two-dimensional array as a table.',
          plan: ANSWER_PLAN(
            'Array whose elements are arrays; accessed with two or more indices',
            'Row/column grid with one cell highlighted',
            'Numeric and associative rows; nested loops',
            'Student table printed with nested foreach',
            'One loop per dimension; 3-D adds another index',
          ),
        },
      ],
      keywords: ['multidimensional', 'array of arrays', '$a[row][col]', 'nested loop', 'two-dimensional', 'three-dimensional'],
      remember: [
        { prompt: 'How many loops do you need to print every cell of a 2-D array?', answer: 'Two, one nested inside the other.' },
        { prompt: "In `$s[2]['name']`, what does `2` select?", answer: 'The row (the third student).' },
      ],
    },

    // ------------------------------------------------------------------
    'sorting-arrays': {
      difficulty: 'medium',
      intro: 'Rank lists, alphabetical names, cheapest-first prices — sorting is one function call in PHP.',
      definition:
        'Sorting arranges the elements of an array in order. PHP provides built-in functions that sort by **value** or by **key**, in **ascending** or **descending** order, and lets you supply your own comparison with `usort()`.',
      simpleExplanation: {
        text: 'Pick the function by asking two questions: sort by value or by key? Keep the key with its value or not? The array is sorted **in place** — the function changes the original array.',
        analogy: 'Arranging answer sheets: by student name (key) or by mark (value), and either top-first or bottom-first.',
      },
      visual: {
        type: 'comparison',
        title: 'Which sort function?',
        table: {
          columns: ['Function', 'Sorts by', 'Order', 'Keeps keys?'],
          rows: [
            ['`sort()`', 'Value', 'Ascending', 'No'],
            ['`rsort()`', 'Value', 'Descending', 'No'],
            ['`asort()`', 'Value', 'Ascending', 'Yes'],
            ['`arsort()`', 'Value', 'Descending', 'Yes'],
            ['`ksort()`', 'Key', 'Ascending', 'Yes'],
            ['`krsort()`', 'Key', 'Descending', 'Yes'],
            ['`usort()`', 'Your function', 'Your rule', 'No'],
          ],
        },
      },
      explanation: [
        { heading: 'Numeric arrays: sort() and rsort()' },
        {
          code: `$marks = [72, 95, 60, 88];
sort($marks);    // [60, 72, 88, 95]
rsort($marks);   // [95, 88, 72, 60]`,
        },
        '`sort()` renumbers the keys 0, 1, 2 … — fine for plain lists, but it would lose names in an associative array.',
        { heading: 'Associative arrays: asort() and ksort()' },
        {
          code: `$prices = ['Pen' => 10, 'Stapler' => 85, 'Notebook' => 40];
asort($prices);   // by price: Pen 10, Notebook 40, Stapler 85
ksort($prices);   // by name:  Notebook, Pen, Stapler`,
        },
        'Add an `r` for the reverse order: `arsort()` and `krsort()`.',
        { heading: 'Your own rule: usort()' },
        'For a multidimensional array, PHP cannot guess which column to sort on. `usort()` takes a **comparison function** that returns a negative number, zero or a positive number.',
        {
          code: `usort($students, function ($a, $b) {
    return $b['marks'] <=> $a['marks'];   // highest marks first
});`,
        },
        'The spaceship operator `<=>` returns -1, 0 or 1, which is exactly what `usort()` needs. `uasort()` and `uksort()` are the key-preserving versions.',
        { heading: 'Sort flags' },
        'The optional second argument changes how values are compared: `SORT_REGULAR` (default), `SORT_NUMERIC`, `SORT_STRING`.',
        {
          more: [
            '`shuffle($a)` puts elements in random order, and `array_reverse($a)` returns a reversed copy. Both are listed alongside the sort functions in the textbook.',
          ],
          label: 'Reordering without sorting',
        },
      ],
      example: {
        title: 'Rank students by marks',
        code: `<?php
$marks = ['Arun' => 88, 'Priya' => 92, 'Karthik' => 75];

arsort($marks);             // highest first, names kept
$rank = 1;
foreach ($marks as $name => $mark) {
    echo "$rank. $name ($mark)<br>";
    $rank++;
}
?>`,
        output: `1. Priya (92)
2. Arun (88)
3. Karthik (75)`,
        explanation:
          '`arsort()` sorts by value in descending order and keeps each name attached to its mark. `rsort()` here would have lost the names.',
      },
      keyPoints: [
        '`sort()` / `rsort()` — by value, keys renumbered.',
        '`asort()` / `arsort()` — by value, keys kept.',
        '`ksort()` / `krsort()` — by key.',
        '`usort()` — your own comparison function, e.g. with `<=>`.',
        'All sort functions change the original array (in place).',
      ],
      importantTerms: [
        { term: 'Ascending', meaning: 'Smallest to largest, A to Z.' },
        { term: 'Descending', meaning: 'Largest to smallest, Z to A.' },
        { term: 'In-place sort', meaning: 'The original array is reordered; nothing new is returned.' },
        { term: '`<=>`', meaning: 'Spaceship operator: returns -1, 0 or 1 when comparing two values.' },
      ],
      examPoints: [
        'Draw the function table: sorts by, order, keeps keys.',
        'Explain why `asort()` is used for associative arrays.',
        'Show `usort()` with a comparison function for a 2-D array.',
        'Mention sort flags and `shuffle()` / `array_reverse()`.',
      ],
      questions: [
        {
          prompt: 'Explain the different array sorting functions in PHP with examples.',
          plan: ANSWER_PLAN(
            'Arranging elements by value or key, ascending or descending',
            'Table of sort, rsort, asort, arsort, ksort, krsort, usort',
            'In-place sorting, key preservation, user-defined sort, flags',
            'Rank students with arsort()',
            'Pick asort/ksort for associative arrays',
          ),
        },
      ],
      keywords: ['sort()', 'rsort()', 'asort()', 'arsort()', 'ksort()', 'krsort()', 'usort()', 'in place', 'SORT_NUMERIC'],
      remember: [
        { prompt: 'Which function sorts an associative array by value, highest first, keeping keys?', answer: '`arsort()`' },
        { prompt: 'Which function sorts by key?', answer: '`ksort()` (ascending) or `krsort()` (descending).' },
        { prompt: 'What must a `usort()` callback return?', answer: 'A negative number, zero or a positive number.' },
      ],
    },

    // ------------------------------------------------------------------
    'relational-database-concepts': {
      difficulty: 'easy',
      intro: 'Before you write any SQL, you need the vocabulary: tables, rows, columns and keys.',
      definition:
        'A relational database stores data in **tables** (relations). Each table has **columns** (attributes) and **rows** (records). **Keys** identify rows uniquely and link tables together.',
      simpleExplanation: {
        text: 'Think of each table as one spreadsheet about one kind of thing — students, books, orders. Every row is one thing, every column is one property. A key column lets other tables point to a row.',
        analogy: 'A college office: one register for students, one for courses, and an enrolment register that just writes “student number → course code” to connect them.',
      },
      visual: {
        type: 'database',
        title: 'Parts of a table',
        table: {
          name: 'students',
          columns: [{ name: 'student_id', type: 'INT', key: true }, { name: 'name', type: 'VARCHAR' }, { name: 'dept', type: 'CHAR' }],
          rows: [
            ['1', 'Arun', 'CS'],
            ['2', 'Priya', 'IT'],
            ['3', 'Karthik', 'CS'],
          ],
        },
        highlight: [1],
        caption: 'Each **row** is one student; each **column** is one attribute; `student_id` is the **primary key**.',
      },
      explanation: [
        { heading: 'Building blocks' },
        {
          table: {
            columns: ['Term', 'Also called', 'Meaning'],
            rows: [
              ['Table', 'Relation', 'Data about one kind of thing'],
              ['Column', 'Attribute, field', 'One property, with one data type'],
              ['Row', 'Record, tuple', 'One item described by the table'],
              ['Value', 'Cell', 'The data where a row meets a column'],
            ],
          },
        },
        { heading: 'Keys' },
        {
          list: [
            '**Primary key** — a column (or set of columns) whose value is unique for every row, e.g. `student_id`.',
            '**Foreign key** — a column that holds the primary key of another table, creating a link.',
          ],
        },
        { heading: 'Schema' },
        'The **schema** is the complete design of the database: the tables, their columns and the keys. It is often written in short form, with the primary key underlined and foreign keys in italics, e.g. `Students(StudentID, Name, Dept)`.',
        { heading: 'Relationships' },
        {
          list: [
            '**One-to-one** — one student has one ID card.',
            '**One-to-many** — one department has many students.',
            '**Many-to-many** — many students take many courses; needs a linking table such as `enrolments`.',
          ],
        },
      ],
      example: {
        title: 'Two tables linked by a key',
        files: [
          {
            name: 'schema.sql',
            lang: 'sql',
            code: `-- Primary key in departments
departments(dept_id, dept_name)

-- dept_id here is a foreign key
students(student_id, name, dept_id)`,
          },
        ],
        output: `departments: (CS, Computer Science), (IT, Information Technology)
students:    (1, Arun, CS), (2, Priya, IT), (3, Karthik, CS)`,
        explanation:
          'Arun and Karthik both have `dept_id` CS, so they point to the same department row. The department name is stored once — that is the point of linking with keys.',
      },
      keyPoints: [
        'Data lives in tables (relations) made of rows and columns.',
        'A primary key uniquely identifies each row.',
        'A foreign key refers to the primary key of another table.',
        'The schema is the overall design of tables, columns and keys.',
        'Relationships: one-to-one, one-to-many, many-to-many.',
      ],
      importantTerms: [
        { term: 'Relation', meaning: 'The formal name for a table.' },
        { term: 'Tuple', meaning: 'The formal name for a row.' },
        { term: 'Primary key', meaning: 'Column(s) with a unique value for each row.' },
        { term: 'Foreign key', meaning: "Column that stores another table's primary key." },
        { term: 'Schema', meaning: 'The complete structure (design) of a database.' },
      ],
      examPoints: [
        'Define table, row, column and value with a drawn table.',
        'Explain primary and foreign keys with a two-table example.',
        'Define schema and show the short-form notation.',
        'List the three relationship types with examples.',
      ],
      questions: [
        {
          prompt: 'Explain relational database concepts: tables, columns, rows, keys, schema and relationships.',
          plan: ANSWER_PLAN(
            'Database storing data as related tables',
            'A labelled table showing row, column, key',
            'Terms table, primary/foreign keys, schema, relationships',
            'departments and students linked by dept_id',
            'Keys link tables and avoid repeating data',
          ),
        },
      ],
      keywords: ['relation', 'table', 'row', 'column', 'primary key', 'foreign key', 'schema', 'one-to-many', 'many-to-many'],
      remember: [
        { prompt: 'What is another name for a row?', answer: 'Record or tuple.' },
        { prompt: 'Which key links one table to another?', answer: 'Foreign key.' },
        { prompt: 'What does a many-to-many relationship need?', answer: 'A linking (junction) table.' },
      ],
    },

    // ------------------------------------------------------------------
    'designing-web-database': {
      difficulty: 'medium',
      intro: 'A good design is decided before any table is created. Fixing a bad design later is painful.',
      definition:
        'Designing a web database means deciding which tables are needed, which columns each holds, and how they are linked, so that data is stored once, stays consistent, and answers the questions the web site will ask.',
      simpleExplanation: {
        text: 'Model the real-world things (students, books, loans) as tables, give each a key, and avoid repeating the same information in many rows. Then check the design can answer the queries your pages need.',
        analogy: 'Planning a house before building it: you decide the rooms and doors first, because moving a wall afterwards is expensive.',
      },
      visual: {
        type: 'process',
        title: 'Design steps',
        steps: [
          { label: 'Identify real-world objects', detail: 'members, books, loans' },
          { label: 'One table per object', detail: 'Each with a primary key' },
          { label: 'Choose atomic columns', detail: 'One value per cell' },
          { label: 'Remove redundancy', detail: 'Store each fact once' },
          { label: 'Link with foreign keys', detail: 'Linking table for many-to-many' },
          { label: 'Test with your queries', detail: 'Can it answer every page?' },
        ],
      },
      explanation: [
        { heading: 'Guidelines from the textbook' },
        {
          list: [
            '**Think about the real-world objects you are modelling.** Each kind of object usually becomes a table.',
            '**Avoid storing redundant data.** Repeating a member’s address in every loan row wastes space and causes **update anomalies** — change it in one row and the others become wrong.',
            '**Use atomic column values.** Store one value per cell. A cell like `"PHP, Java, DBMS"` cannot be searched or counted properly; use a separate table instead.',
            '**Choose sensible keys.** Use a unique ID column (e.g. `member_id`) rather than something that can repeat or change, such as a name.',
            '**Think about the questions you will ask.** Make sure every query your pages need can be answered.',
            '**Avoid designs with many empty attributes.** Lots of `NULL` columns usually mean the table is trying to describe two kinds of thing.',
          ],
        },
        { heading: 'Anomalies caused by redundancy' },
        {
          table: {
            columns: ['Anomaly', 'What goes wrong'],
            rows: [
              ['Update', 'A fact stored in many rows is changed in only some of them'],
              ['Insert', 'You cannot add a fact until an unrelated row exists'],
              ['Delete', 'Deleting one row loses a fact you still needed'],
            ],
          },
        },
        { heading: 'Two kinds of table' },
        'Most designs end up with **simple tables** that describe objects (members, books) and **linking tables** that connect two objects in a many-to-many relationship (loans connect members and books).',
      ],
      example: {
        title: 'College library design',
        files: [
          {
            name: 'design.sql',
            lang: 'sql',
            code: `members(member_id, name, dept, phone)
books(isbn, title, author, price)
loans(loan_id, member_id, isbn, loan_date, return_date)`,
          },
        ],
        output: `One member  → many loans
One book    → many loans (over time)
loans is the linking table between members and books`,
        explanation:
          'Member details are stored once in `members`. A loan row only holds `member_id` and `isbn`, so changing a phone number is a single-row update.',
      },
      keyPoints: [
        'Model real-world objects as tables.',
        'Store each fact once to avoid update, insert and delete anomalies.',
        'Keep column values atomic.',
        'Give every table a reliable primary key.',
        'Use linking tables for many-to-many relationships.',
        'Check the design against the queries the site needs.',
      ],
      importantTerms: [
        { term: 'Redundancy', meaning: 'The same fact stored in more than one place.' },
        { term: 'Update anomaly', meaning: 'Inconsistency caused by changing only some copies of a fact.' },
        { term: 'Atomic value', meaning: 'A single, indivisible value in one cell.' },
        { term: 'Linking table', meaning: 'A table that connects two tables in a many-to-many relationship.' },
      ],
      examPoints: [
        'List the design guidelines (objects, redundancy, atomic values, keys, queries, empty attributes).',
        'Explain update/insert/delete anomalies with a small example.',
        'Show a three-table design with a linking table.',
      ],
      questions: [
        {
          prompt: 'Discuss the guidelines for designing a web database.',
          plan: ANSWER_PLAN(
            'Planning tables, columns and links before creation',
            'Design steps flow',
            'Six guidelines; anomalies table',
            'Library schema: members, books, loans',
            'Store each fact once; atomic values; good keys',
          ),
        },
      ],
      keywords: ['real-world objects', 'redundancy', 'update anomaly', 'atomic values', 'primary key', 'linking table', 'NULL values'],
      remember: [
        { prompt: 'Name the three anomalies caused by redundancy.', answer: 'Update, insert and delete anomalies.' },
        { prompt: "Why is 'PHP, Java, DBMS' in one cell a bad idea?", answer: 'It is not atomic — hard to search, count or update.' },
      ],
    },

    // ------------------------------------------------------------------
    'creating-web-database': {
      difficulty: 'medium',
      intro: 'Time to type real commands: log in to MySQL, create the database and give your web app its own user.',
      definition:
        'Creating a web database means logging in to the MySQL server, running `CREATE DATABASE`, and setting up a MySQL user with only the privileges the web application needs.',
      simpleExplanation: {
        text: 'You talk to MySQL through the **MySQL monitor** (the `mysql` command-line client) or a tool like phpMyAdmin. One command makes the database; a few more create a user and grant it access.',
        analogy: 'Opening a new office: you build the room (database), then cut a key (user) that opens only that room and only the drawers it needs (privileges).',
      },
      visual: {
        type: 'flow',
        title: 'From login to a ready database',
        steps: [
          { label: 'mysql -u root -p', note: 'Log in' },
          { label: 'CREATE DATABASE college;', note: 'Make the database' },
          { label: 'CREATE USER', note: 'A user for the web app' },
          { label: 'GRANT', note: 'Least privileges needed' },
          { label: 'USE college;', note: 'Select it' },
        ],
      },
      explanation: [
        { heading: '1. Log in with the MySQL monitor' },
        { code: 'mysql -h localhost -u root -p', lang: 'text' },
        '`-h` is the host, `-u` the user name, and `-p` asks for the password. The prompt changes to `mysql>`. Every SQL command ends with a semicolon `;`.',
        { heading: '2. Create the database' },
        { code: `CREATE DATABASE college;
SHOW DATABASES;`, lang: 'sql' },
        { heading: '3. Set up a user and privileges' },
        'MySQL has a **privilege system**: each user is allowed only certain actions on certain databases. Following the **principle of least privilege**, the web application should not log in as `root`.',
        {
          code: `CREATE USER 'webuser'@'localhost' IDENTIFIED BY 'S3cret!';
GRANT SELECT, INSERT, UPDATE, DELETE
  ON college.*
  TO 'webuser'@'localhost';`,
          lang: 'sql',
        },
        {
          table: {
            columns: ['Privilege', 'Allows'],
            rows: [
              ['`SELECT`', 'Read rows'],
              ['`INSERT`', 'Add rows'],
              ['`UPDATE`', 'Change rows'],
              ['`DELETE`', 'Remove rows'],
              ['`CREATE` / `DROP`', 'Make or remove tables and databases'],
              ['`ALL`', 'Every privilege (for administrators only)'],
            ],
          },
        },
        '`REVOKE` takes privileges away again, e.g. `REVOKE DELETE ON college.* FROM \'webuser\'@\'localhost\';`.',
        { note: 'Older books write `GRANT ... IDENTIFIED BY` in one statement. MySQL 8 requires `CREATE USER` first, then `GRANT`.' },
        { heading: '4. Use the right database' },
        { code: 'USE college;', lang: 'sql' },
        'All following commands now act on `college`. You can also choose the database when logging in: `mysql -u webuser -p college`.',
      ],
      example: {
        title: 'Create the college database',
        files: [
          {
            name: 'setup.sql',
            lang: 'sql',
            code: `CREATE DATABASE college;

CREATE USER 'webuser'@'localhost' IDENTIFIED BY 'S3cret!';
GRANT SELECT, INSERT, UPDATE, DELETE ON college.* TO 'webuser'@'localhost';

USE college;`,
          },
        ],
        output: `Query OK, 1 row affected
Query OK, 0 rows affected
Query OK, 0 rows affected
Database changed`,
        explanation:
          'The database exists, `webuser` can read and change data in it but cannot drop tables, and `USE` makes it the current database.',
      },
      keyPoints: [
        'Log in with `mysql -h host -u user -p`.',
        '`CREATE DATABASE name;` makes a new database.',
        'Create a separate user for the web app; never use root.',
        '`GRANT` gives and `REVOKE` removes privileges.',
        '`USE name;` selects the current database.',
      ],
      importantTerms: [
        { term: 'MySQL monitor', meaning: 'The `mysql` command-line client for typing SQL.' },
        { term: 'Privilege', meaning: 'Permission to perform an action such as SELECT or DROP.' },
        { term: 'Least privilege', meaning: 'Give a user only the rights it actually needs.' },
        { term: '`GRANT` / `REVOKE`', meaning: 'SQL commands that give or remove privileges.' },
      ],
      examPoints: [
        'Write the login command and explain `-h`, `-u`, `-p`.',
        'Write `CREATE DATABASE`, `CREATE USER`, `GRANT` and `USE`.',
        'Explain the privilege system and least privilege.',
        'List common privileges in a table.',
      ],
      questions: [
        {
          prompt: 'Explain the steps to create a web database and set up users in MySQL.',
          plan: ANSWER_PLAN(
            'Log in, create the database, create a user, grant privileges',
            'Flow: login → CREATE DATABASE → CREATE USER → GRANT → USE',
            'MySQL monitor options; privilege system; least privilege; REVOKE',
            'setup.sql with its output',
            'Web app should not use root',
          ),
        },
      ],
      keywords: ['mysql -u -p', 'CREATE DATABASE', 'CREATE USER', 'GRANT', 'REVOKE', 'USE', 'least privilege'],
      remember: [
        { prompt: 'Which option makes `mysql` ask for a password?', answer: '`-p`' },
        { prompt: 'Which command selects the database to work in?', answer: '`USE dbname;`' },
        { prompt: 'Why not connect the web app as root?', answer: 'Least privilege — a leak or bug could then destroy everything.' },
      ],
    },

    // ------------------------------------------------------------------
    'creating-database-tables': {
      difficulty: 'medium',
      intro: 'The design becomes real here: each planned table is written as one CREATE TABLE statement.',
      definition:
        '`CREATE TABLE` defines a new table: its name, each column with a data type, and optional attributes such as `NOT NULL`, `AUTO_INCREMENT` and `PRIMARY KEY`.',
      simpleExplanation: {
        text: 'You list the columns inside brackets, one per line: name, type, then any rules. MySQL then knows exactly what each row must look like.',
        analogy: 'Printing the column headings of a register before anyone writes in it — and deciding which boxes must never be left blank.',
      },
      visual: {
        type: 'database',
        title: 'The table this statement creates',
        table: {
          name: 'students',
          columns: [
            { name: 'student_id', type: 'INT UNSIGNED', key: true },
            { name: 'name', type: 'VARCHAR(50)' },
            { name: 'dept', type: 'CHAR(4)' },
            { name: 'marks', type: 'TINYINT' },
          ],
          rows: [],
        },
        caption: 'An empty table: the structure exists, rows come later with `INSERT`.',
      },
      explanation: [
        { heading: 'Syntax' },
        {
          code: `CREATE TABLE tablename (
  column1 TYPE [attributes],
  column2 TYPE [attributes],
  ...
);`,
          lang: 'sql',
        },
        { heading: 'Common column attributes' },
        {
          table: {
            columns: ['Attribute', 'Meaning'],
            rows: [
              ['`NOT NULL`', 'Every row must have a value here'],
              ['`AUTO_INCREMENT`', 'MySQL fills in the next number automatically'],
              ['`PRIMARY KEY`', 'Unique identifier for each row (also indexed)'],
              ['`UNSIGNED`', 'Only zero or positive numbers'],
              ['`DEFAULT value`', 'Used when no value is given'],
              ['`UNIQUE`', 'No two rows may share this value'],
            ],
          },
        },
        { heading: 'Foreign keys' },
        {
          code: `CREATE TABLE loans (
  loan_id   INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  member_id INT UNSIGNED NOT NULL,
  isbn      CHAR(13) NOT NULL,
  loan_date DATE NOT NULL,
  FOREIGN KEY (member_id) REFERENCES members(member_id)
);`,
          lang: 'sql',
        },
        { heading: 'Checking your work' },
        {
          list: [
            '`SHOW TABLES;` — list the tables in the current database.',
            '`DESCRIBE students;` — show the columns, types and keys of one table.',
          ],
        },
        { heading: 'Indexes' },
        'A primary key is indexed automatically. Add an **index** on other columns you search often: `CREATE INDEX idx_name ON students (name);`. Indexes make lookups faster but slightly slow down inserts.',
        { tip: 'Save `CREATE TABLE` statements in a `.sql` file and run them with `mysql -u root -p college < tables.sql` so the setup can be repeated.' },
      ],
      example: {
        title: 'Create and inspect the students table',
        files: [
          {
            name: 'tables.sql',
            lang: 'sql',
            code: `CREATE TABLE students (
  student_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(50) NOT NULL,
  dept       CHAR(4) NOT NULL,
  marks      TINYINT UNSIGNED DEFAULT 0
);

DESCRIBE students;`,
          },
        ],
        output: `+------------+------------------+------+-----+---------+----------------+
| Field      | Type             | Null | Key | Default | Extra          |
+------------+------------------+------+-----+---------+----------------+
| student_id | int unsigned     | NO   | PRI | NULL    | auto_increment |
| name       | varchar(50)      | NO   |     | NULL    |                |
| dept       | char(4)          | NO   |     | NULL    |                |
| marks      | tinyint unsigned | YES  |     | 0       |                |
+------------+------------------+------+-----+---------+----------------+`,
        explanation:
          '`DESCRIBE` confirms each column: `student_id` is the primary key and auto-increments, `marks` defaults to 0, and the others are required.',
      },
      keyPoints: [
        '`CREATE TABLE name ( column TYPE attributes, ... );`',
        '`NOT NULL`, `AUTO_INCREMENT`, `PRIMARY KEY`, `UNSIGNED`, `DEFAULT`, `UNIQUE`.',
        '`FOREIGN KEY (...) REFERENCES other(col)` links tables.',
        '`SHOW TABLES` and `DESCRIBE` check the result.',
        '`CREATE INDEX` speeds up searches on a column.',
      ],
      importantTerms: [
        { term: '`CREATE TABLE`', meaning: 'SQL statement that defines a new table.' },
        { term: '`AUTO_INCREMENT`', meaning: 'Automatically generates the next integer for new rows.' },
        { term: '`DESCRIBE`', meaning: 'Shows the structure of a table.' },
        { term: 'Index', meaning: 'A lookup structure that makes searching a column faster.' },
      ],
      examPoints: [
        'Write the general syntax of `CREATE TABLE`.',
        'Explain the column attributes in a table.',
        'Give a full example with a primary key and show `DESCRIBE` output.',
        'Mention foreign keys, `SHOW TABLES` and indexes.',
      ],
      questions: [
        {
          prompt: 'How do you create tables in MySQL? Explain with an example.',
          plan: ANSWER_PLAN(
            'CREATE TABLE defines table name, columns, types and attributes',
            'The resulting empty table structure',
            'Syntax; NOT NULL, AUTO_INCREMENT, PRIMARY KEY, UNSIGNED, DEFAULT; foreign keys',
            'students table + DESCRIBE output',
            'SHOW TABLES, DESCRIBE, CREATE INDEX',
          ),
        },
      ],
      keywords: ['CREATE TABLE', 'NOT NULL', 'AUTO_INCREMENT', 'PRIMARY KEY', 'FOREIGN KEY', 'UNSIGNED', 'DESCRIBE', 'SHOW TABLES', 'CREATE INDEX'],
      remember: [
        { prompt: 'Which attribute numbers new rows automatically?', answer: '`AUTO_INCREMENT`' },
        { prompt: 'How do you see the columns of a table?', answer: '`DESCRIBE tablename;`' },
      ],
    },

    // ------------------------------------------------------------------
    'understanding-mysql-identifiers': {
      difficulty: 'easy',
      intro: 'Every database, table and column needs a name. MySQL has rules for those names.',
      definition:
        'MySQL identifiers are the names given to databases, tables, columns, indexes and aliases. Each kind has a maximum length, a set of allowed characters and its own case-sensitivity rule.',
      simpleExplanation: {
        text: 'Names up to 64 characters are fine for almost everything. Database and table names are stored as folders and files, so their case-sensitivity follows the operating system. Column names are never case-sensitive.',
        analogy: 'File names on a computer: Linux treats `Students` and `students` as different files, Windows does not — and MySQL table names behave the same way.',
      },
      visual: {
        type: 'comparison',
        title: 'Identifier rules (from the textbook)',
        table: {
          columns: ['Identifier', 'Max length', 'Case-sensitive?', 'Characters allowed'],
          rows: [
            ['Database', '64', 'Same as OS', 'Anything allowed in a directory name except /, \\ and .'],
            ['Table', '64', 'Same as OS', 'Anything allowed in a file name except / and .'],
            ['Column', '64', 'No', 'Anything'],
            ['Index', '64', 'No', 'Anything'],
            ['Alias', '255', 'No', 'Anything'],
          ],
        },
      },
      explanation: [
        { heading: 'Why database and table names depend on the OS' },
        'MySQL stores each database as a **directory** and each table as one or more **files** inside it. On Linux/Unix file names are case-sensitive, so `Students` and `students` are different tables; on Windows they are the same.',
        { tip: 'Use lower-case names everywhere, e.g. `student_marks`, so the database works the same on every server.' },
        { heading: 'Quoting identifiers' },
        'If a name contains a space, a special character or a reserved word, wrap it in **backticks**:',
        {
          code: `SELECT \`order\`, \`first name\` FROM \`my table\`;`,
          lang: 'sql',
        },
        'It is simpler to avoid such names: use underscores instead of spaces and do not use words like `order`, `select` or `table` as names.',
        { heading: 'Aliases' },
        'An **alias** is a temporary name for a column or table inside one query, created with `AS`:',
        { code: 'SELECT name AS student_name FROM students AS s;', lang: 'sql' },
        { heading: 'Good naming habits' },
        {
          list: [
            'Meaningful: `marks`, not `m1`.',
            'Consistent: all lower case with underscores.',
            'Plural or singular — pick one style for all tables.',
          ],
        },
      ],
      example: {
        title: 'Identifiers in one query',
        files: [
          {
            name: 'aliases.sql',
            lang: 'sql',
            code: `USE college;                        -- database identifier
SELECT s.name   AS student_name,      -- column + alias
       s.marks  AS score
FROM   students AS s                   -- table + alias
WHERE  s.marks >= 80;`,
          },
        ],
        output: `+--------------+-------+
| student_name | score |
+--------------+-------+
| Arun         |    88 |
| Priya        |    92 |
+--------------+-------+`,
        explanation:
          'The result headings use the aliases. `s` is a short alias for the `students` table, used to qualify column names.',
      },
      keyPoints: [
        'Identifiers name databases, tables, columns, indexes and aliases.',
        'Maximum length is 64 characters (255 for aliases).',
        'Database/table names follow the OS case rules; column names are case-insensitive.',
        'Wrap unusual names in backticks; better, avoid them.',
        'Prefer lower-case names with underscores.',
      ],
      importantTerms: [
        { term: 'Identifier', meaning: 'The name of a database object.' },
        { term: 'Alias', meaning: 'A temporary name inside a query, created with `AS`.' },
        { term: 'Reserved word', meaning: 'A word with a special meaning in SQL, e.g. ORDER.' },
        { term: 'Backtick quoting', meaning: 'Wrapping a name in backticks so MySQL accepts it.' },
      ],
      examPoints: [
        'List the five identifier types.',
        'Draw the length / case-sensitivity / characters table.',
        'Explain why database and table names follow the OS.',
        'Mention backticks and aliases with `AS`.',
      ],
      questions: [
        {
          prompt: 'Write a short note on MySQL identifiers.',
          plan: ANSWER_PLAN(
            'Names for databases, tables, columns, indexes and aliases',
            'Identifier rules table',
            'OS-dependent case sensitivity; backtick quoting; aliases',
            'Query with column and table aliases',
            'Use lower case and underscores',
          ),
        },
      ],
      keywords: ['identifier', '64 characters', 'case sensitivity', 'backticks', 'alias', 'AS', 'reserved word'],
      remember: [
        { prompt: 'Maximum length of a MySQL column name?', answer: '64 characters.' },
        { prompt: 'Are column names case-sensitive?', answer: 'No.' },
        { prompt: 'Why might `Students` and `students` be different tables?', answer: 'Tables are files, and Linux file names are case-sensitive.' },
      ],
    },

    // ------------------------------------------------------------------
    'choosing-column-data-types': {
      difficulty: 'medium',
      intro: 'Every column has a type. The right type saves space, rejects bad data and keeps sorting correct.',
      definition:
        'Choosing column data types means selecting, for each column, the MySQL type that fits its values. MySQL types fall into three groups: **numeric**, **date and time**, and **string**.',
      simpleExplanation: {
        text: 'Ask what the column holds. Whole numbers → an INT type. Money → DECIMAL. Dates → DATE. Short text → VARCHAR. Long text → TEXT. Pick the smallest type that safely fits.',
        analogy: 'Choosing a container in a kitchen: a spice jar for salt, a big tin for rice. The wrong size wastes space or spills over.',
      },
      visual: {
        type: 'hierarchy',
        title: 'MySQL data types',
        root: 'Column types',
        children: [
          { label: 'Numeric', note: 'Numbers', children: ['TINYINT', 'INT', 'BIGINT', 'FLOAT', 'DOUBLE', 'DECIMAL'] },
          { label: 'Date and time', note: 'Moments', children: ['DATE', 'TIME', 'DATETIME', 'TIMESTAMP', 'YEAR'] },
          { label: 'String', note: 'Text & data', children: ['CHAR', 'VARCHAR', 'TEXT', 'BLOB', 'ENUM', 'SET'] },
        ],
      },
      explanation: [
        { heading: 'Integer types' },
        {
          table: {
            columns: ['Type', 'Bytes', 'Signed range', 'Unsigned range'],
            rows: [
              ['`TINYINT`', '1', '-128 to 127', '0 to 255'],
              ['`SMALLINT`', '2', '-32,768 to 32,767', '0 to 65,535'],
              ['`MEDIUMINT`', '3', '±8.3 million', '0 to 16.7 million'],
              ['`INT`', '4', '±2.1 billion', '0 to 4.29 billion'],
              ['`BIGINT`', '8', '±9.2 × 10¹⁸', '0 to 1.8 × 10¹⁹'],
            ],
          },
        },
        { heading: 'Numbers with fractions' },
        {
          list: [
            '`FLOAT` and `DOUBLE` — approximate floating-point numbers (scientific values).',
            '`DECIMAL(M, D)` — exact numbers with M digits in total and D after the point. Use it for **money**: `DECIMAL(8,2)` stores up to 999999.99.',
          ],
        },
        { heading: 'Date and time' },
        {
          table: {
            columns: ['Type', 'Format', 'Example'],
            rows: [
              ['`DATE`', 'YYYY-MM-DD', '2026-10-10'],
              ['`TIME`', 'HH:MM:SS', '14:30:00'],
              ['`DATETIME`', 'YYYY-MM-DD HH:MM:SS', '2026-10-10 14:30:00'],
              ['`TIMESTAMP`', 'Like DATETIME; can auto-set on insert/update', '2026-10-10 14:30:00'],
              ['`YEAR`', 'YYYY', '2026'],
            ],
          },
        },
        { heading: 'Strings' },
        {
          table: {
            columns: ['Type', 'Use it for'],
            rows: [
              ['`CHAR(n)`', 'Fixed length text, e.g. codes `CHAR(4)`'],
              ['`VARCHAR(n)`', 'Variable length text up to n characters, e.g. names'],
              ['`TEXT`', 'Long text such as descriptions or comments'],
              ['`BLOB`', 'Binary data such as images (Binary Large OBject)'],
              ["`ENUM('a','b')`", 'Exactly one value from a fixed list'],
              ["`SET('a','b')`", 'Zero or more values from a fixed list'],
            ],
          },
        },
        { trap: '`CHAR(10)` always uses 10 characters of storage; `VARCHAR(10)` uses only what is stored plus a length byte. Use CHAR only when every value has the same length.' },
      ],
      example: {
        title: 'Choosing types for a student table',
        files: [
          {
            name: 'types.sql',
            lang: 'sql',
            code: `CREATE TABLE students (
  student_id  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  roll_no     CHAR(5) NOT NULL,                 -- always 5 chars: CS101
  name        VARCHAR(50) NOT NULL,             -- length varies
  gender      ENUM('M', 'F', 'O'),
  dob         DATE,
  marks       TINYINT UNSIGNED,                 -- 0 to 100 fits 0–255
  fees_paid   DECIMAL(8,2),                     -- exact money
  remarks     TEXT
);`,
          },
        ],
        output: 'Query OK, 0 rows affected',
        explanation:
          'Each type fits its data: fixed-length roll numbers use CHAR, marks use the 1-byte TINYINT, and money uses exact DECIMAL rather than FLOAT.',
      },
      keyPoints: [
        'Three groups: numeric, date/time, string.',
        'Pick the smallest integer type that fits; add `UNSIGNED` for non-negative values.',
        'Use `DECIMAL` for money, not `FLOAT`.',
        '`CHAR` is fixed length; `VARCHAR` is variable length.',
        '`TEXT` for long text, `BLOB` for binary data, `ENUM`/`SET` for fixed lists.',
      ],
      importantTerms: [
        { term: '`DECIMAL(M,D)`', meaning: 'Exact number with M digits, D after the decimal point.' },
        { term: '`VARCHAR(n)`', meaning: 'Text of up to n characters, stored at its real length.' },
        { term: '`ENUM`', meaning: 'Column that holds one value from a fixed list.' },
        { term: '`TIMESTAMP`', meaning: 'Date-time type that can set itself automatically.' },
        { term: 'BLOB', meaning: 'Binary Large OBject — raw binary data.' },
      ],
      examPoints: [
        'Classify the types into numeric, date/time and string with a tree.',
        'Give the integer table with byte sizes and ranges.',
        'Contrast CHAR vs VARCHAR and FLOAT vs DECIMAL.',
        'Finish with a CREATE TABLE that justifies each type.',
      ],
      questions: [
        {
          prompt: 'Explain the column data types available in MySQL.',
          plan: ANSWER_PLAN(
            'The kind of value a column stores; three groups',
            'Tree: numeric, date/time, string',
            'Integer ranges, FLOAT/DOUBLE/DECIMAL, date formats, CHAR, VARCHAR, TEXT, BLOB, ENUM, SET',
            'Student table with a type for each column',
            'Smallest fitting type; DECIMAL for money',
          ),
        },
      ],
      keywords: ['numeric', 'TINYINT', 'INT', 'DECIMAL', 'DATE', 'DATETIME', 'TIMESTAMP', 'CHAR', 'VARCHAR', 'TEXT', 'BLOB', 'ENUM', 'SET', 'UNSIGNED'],
      remember: [
        { prompt: 'Which type should store money?', answer: '`DECIMAL`, because it is exact.' },
        { prompt: 'Range of `TINYINT UNSIGNED`?', answer: '0 to 255.' },
        { prompt: 'Fixed-length or variable-length: CHAR?', answer: 'Fixed length.' },
      ],
    },
  },
}
