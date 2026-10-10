// PHP and MySQL — Unit II: Control Statements, Storing and Retrieving of Data.
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
    'Unit II covers two major pillars of PHP programming: controlling program flow with decisions, loops and special control structures; and persisting data by reading from and writing to files on the server.',

  map: [
    {
      label: 'Control flow',
      topics: ['making-decisions', 'iterations', 'control-structure', 'declare'],
    },
    {
      label: 'File I/O',
      topics: [
        'saving-data',
        'storing-and-retrieving',
        'processing-files',
        'opening-writing-and-closing-a-file',
        'reading-from-file',
        'file-functions',
      ],
    },
  ],

  topics: {
    // ------------------------------------------------------------------
    'making-decisions': {
      difficulty: 'easy',
      intro:
        'Every useful program must make choices. PHP provides `if`, `elseif`, `else`, `switch`, and the modern `match` expression to branch based on conditions.',
      definition:
        'A **decision statement** evaluates a condition and executes different blocks of code depending on whether the condition is true or false. PHP supports `if/elseif/else`, `switch/case`, and the PHP 8 `match` expression.',
      simpleExplanation: {
        text: 'Imagine a question with different routes depending on the answer. `if` asks the question; `elseif` provides alternative questions; `else` is the fallback. `switch` and `match` handle many possible values of one variable cleanly.',
        analogy:
          'A railway junction: the train (program) follows one track based on a signal (condition). There can be several possible tracks — the correct one is chosen at runtime.',
      },
      visual: {
        type: 'flow',
        title: 'if / elseif / else flow',
        steps: [
          { id: 'start', label: 'Evaluate condition', shape: 'diamond' },
          { id: 'true', label: 'Execute if-block', shape: 'box' },
          { id: 'elif', label: 'Evaluate elseif condition', shape: 'diamond' },
          { id: 'elif_true', label: 'Execute elseif-block', shape: 'box' },
          { id: 'else', label: 'Execute else-block', shape: 'box' },
          { id: 'end', label: 'Continue', shape: 'box' },
        ],
        edges: [
          { from: 'start', to: 'true', label: 'true' },
          { from: 'start', to: 'elif', label: 'false' },
          { from: 'elif', to: 'elif_true', label: 'true' },
          { from: 'elif', to: 'else', label: 'false' },
          { from: 'true', to: 'end' },
          { from: 'elif_true', to: 'end' },
          { from: 'else', to: 'end' },
        ],
      },
      explanation: [
        { heading: 'if / elseif / else' },
        'The most fundamental decision structure. PHP evaluates the `if` condition; if it is **true** the block runs. Otherwise each `elseif` condition is tested in order. `else` is the final catch-all.',
        {
          code: `if ($marks >= 75) {
    echo "Distinction";
} elseif ($marks >= 60) {
    echo "First Class";
} elseif ($marks >= 50) {
    echo "Second Class";
} else {
    echo "Fail";
}`,
        },
        { heading: 'switch' },
        '`switch` compares one expression against many possible **case** values using loose equality (`==`). Use `break` after each case to prevent fall-through.',
        {
          code: `switch ($grade) {
    case 'O':  echo "Outstanding"; break;
    case 'A':  echo "Excellent";   break;
    case 'B':  echo "Good";        break;
    default:   echo "Average";
}`,
        },
        { heading: 'match (PHP 8)' },
        '`match` is like `switch` but uses **strict equality** (`===`), is an expression (can be assigned), and does not fall through. It throws an `UnhandledMatchError` if no arm matches and there is no default.',
        {
          code: `$label = match(true) {
    $marks >= 75 => "Distinction",
    $marks >= 60 => "First Class",
    $marks >= 50 => "Second Class",
    default      => "Fail",
};
echo $label;`,
        },
        { tip: 'Prefer `match` over `switch` in PHP 8+ for cleaner, stricter branching.' },
      ],
      example: {
        title: 'Student grade classifier',
        code: `<?php
$marks = 68;

// --- if / elseif / else ---
if ($marks >= 75) {
    $grade = "Distinction";
} elseif ($marks >= 60) {
    $grade = "First Class";
} elseif ($marks >= 50) {
    $grade = "Second Class";
} else {
    $grade = "Fail";
}
echo "Grade (if-else): $grade\\n";

// --- match (PHP 8) ---
$label = match(true) {
    $marks >= 75 => "Distinction",
    $marks >= 60 => "First Class",
    $marks >= 50 => "Second Class",
    default      => "Fail",
};
echo "Grade (match): $label\\n";
?>`,
        output: `Grade (if-else): First Class
Grade (match): First Class`,
        explanation:
          '`$marks = 68` satisfies `$marks >= 60`, so both `if-else` and `match` produce "First Class". `match` is more concise and type-safe.',
      },
      keyPoints: [
        '`if`, `elseif`, `else` — classic conditional branching.',
        '`switch` compares with loose equality (`==`); always use `break`.',
        '`match` (PHP 8) uses strict equality, returns a value, and has no fall-through.',
        'Conditions are any expression that evaluates to true or false.',
        'PHP treats `0`, `""`, `"0"`, `null`, `false`, and `[]` as **falsy**.',
      ],
      importantTerms: [
        { term: 'Condition', meaning: 'A boolean expression that controls which branch runs.' },
        { term: 'Fall-through', meaning: 'In switch, execution continues into the next case without a break.' },
        { term: 'match expression', meaning: 'PHP 8 strict-equality alternative to switch that returns a value.' },
        { term: 'Truthy / Falsy', meaning: 'Non-boolean values PHP treats as true or false in a boolean context.' },
      ],
      examPoints: [
        'Draw the if/elseif/else flowchart.',
        'Distinguish `switch` (loose ==) from `match` (strict ===).',
        'State that `match` is an expression (can be assigned) and PHP 8+.',
        'Give a student-grade example using both `if-else` and `match`.',
      ],
      questions: [
        {
          prompt: 'Explain decision-making statements in PHP with an example.',
          plan: ANSWER_PLAN(
            'Statements that evaluate a condition and choose between code paths',
            'if → condition true → block; false → elseif/else',
            'if/elseif/else, switch/case/break/default, match (PHP 8)',
            'Student grade classifier with if-else and match',
            'match is PHP 8+, strict; switch uses break; else is the fallback',
          ),
        },
        {
          prompt: 'What is the difference between switch and match in PHP?',
          plan: ANSWER_PLAN(
            'Both branch on a value; switch uses loose ==, match uses strict ===',
            'switch: fall-through without break; match: no fall-through, is an expression',
            'switch needs break; match auto-returns; match throws UnhandledMatchError',
            'switch grade with O/A/B vs match grade => "Outstanding"',
            'Prefer match in PHP 8 for type safety and conciseness',
          ),
        },
      ],
      keywords: ['if', 'elseif', 'else', 'switch', 'case', 'break', 'default', 'match', 'condition', 'boolean'],
      remember: [
        { prompt: 'Which operator does switch use for comparison?', answer: 'Loose equality `==`.' },
        { prompt: 'Which operator does match use?', answer: 'Strict equality `===`.' },
        { prompt: 'What happens in match if no arm matches?', answer: '`UnhandledMatchError` is thrown.' },
        { prompt: 'What is "fall-through"?', answer: 'In switch, when a case runs into the next without a break.' },
      ],
    },

    // ------------------------------------------------------------------
    'iterations': {
      difficulty: 'easy',
      intro:
        'Loops let you repeat a block of code multiple times — essential for processing lists of students, marks, or records.',
      definition:
        'An **iteration** (loop) is a control structure that repeats a block of code while a condition is true, or for each element of a collection. PHP has `while`, `do-while`, `for`, and `foreach`.',
      simpleExplanation: {
        text: 'Without loops you would have to write the same code a hundred times. A loop says "keep doing this until I say stop". `for` is for a known count; `foreach` is for arrays; `while` runs as long as a condition holds; `do-while` runs at least once.',
        analogy:
          'A teacher reading mark sheets: she picks up each sheet, records the mark, then picks up the next — that is a `foreach`. If she keeps reading until all 60 are done, that is a `while`.',
      },
      visual: {
        type: 'comparison',
        title: 'Loop types at a glance',
        items: [
          {
            title: 'while',
            tone: 'accent',
            points: [
              'Condition checked BEFORE each iteration',
              'May run 0 times if condition is false from the start',
              'Use when you do not know the count up front',
            ],
          },
          {
            title: 'do-while',
            tone: 'muted',
            points: [
              'Body runs FIRST, condition checked AFTER',
              'Always runs at least once',
              'Use when you need to run the body before checking',
            ],
          },
          {
            title: 'for',
            tone: 'accent',
            points: [
              'Init; condition; increment — all in one line',
              'Best when count is known',
              'Counter variable is explicit',
            ],
          },
          {
            title: 'foreach',
            tone: 'muted',
            points: [
              'Iterates over every element of an array',
              'Can unpack key => value',
              'Cleanest for arrays / collections',
            ],
          },
        ],
      },
      explanation: [
        { heading: 'while loop' },
        'Tests the condition before each run. If false on first check, the body never executes.',
        {
          code: `$i = 1;
while ($i <= 5) {
    echo "Student $i\\n";
    $i++;
}`,
        },
        { heading: 'do-while loop' },
        'Executes the body first, then checks the condition. Guarantees at least one execution.',
        {
          code: `$i = 1;
do {
    echo "Mark $i\\n";
    $i++;
} while ($i <= 3);`,
        },
        { heading: 'for loop' },
        'Three-part header: **initializer**; **condition**; **increment**. All three are optional.',
        {
          code: `for ($i = 1; $i <= 5; $i++) {
    echo "Roll No: $i\\n";
}`,
        },
        { heading: 'foreach loop' },
        'Designed for arrays. It can iterate over values alone, or over key-value pairs.',
        {
          code: `$marks = [85, 72, 91, 60];
foreach ($marks as $index => $mark) {
    echo "Student " . ($index + 1) . ": $mark\\n";
}`,
        },
        { heading: 'break and continue' },
        '`break` exits the loop immediately. `break 2` exits two nested loops. `continue` skips the rest of the current iteration and moves to the next.',
        {
          code: `for ($i = 1; $i <= 10; $i++) {
    if ($i == 6) break;       // stop at 6
    if ($i % 2 == 0) continue; // skip even numbers
    echo "$i\\n";
}
// Output: 1 3 5`,
        },
      ],
      example: {
        title: 'Calculating average marks using a loop',
        code: `<?php
$marks = [78, 85, 62, 91, 55];
$total = 0;
$count = count($marks);

foreach ($marks as $mark) {
    $total += $mark;
}

$average = $total / $count;
echo "Total   : $total\\n";
echo "Students: $count\\n";
echo "Average : $average\\n";

// Print only passing marks (>=50)
echo "Passing marks:\\n";
foreach ($marks as $i => $mark) {
    if ($mark < 50) continue;
    echo "  Student " . ($i + 1) . " => $mark\\n";
}
?>`,
        output: `Total   : 371
Students: 5
Average : 74.2
Passing marks:
  Student 1 => 78
  Student 2 => 85
  Student 3 => 62
  Student 4 => 91
  Student 5 => 55`,
        explanation:
          '`foreach` iterates the array, `+= `accumulates the total, `continue` skips any failing marks (none here), and `count()` gives the array size.',
      },
      keyPoints: [
        '`while` — condition checked before; may run 0 times.',
        '`do-while` — body runs first; always runs at least once.',
        '`for` — best when count is known; init; condition; increment in one line.',
        '`foreach` — cleanest way to iterate arrays.',
        '`break` exits; `continue` skips to the next iteration.',
      ],
      importantTerms: [
        { term: 'Iteration', meaning: 'One execution of the loop body.' },
        { term: 'Condition', meaning: 'Boolean expression evaluated to decide whether the loop continues.' },
        { term: 'break', meaning: 'Exits the loop (or switch) immediately.' },
        { term: 'continue', meaning: 'Skips remaining code in the current iteration and goes to the next.' },
        { term: 'foreach', meaning: 'A loop that iterates over every element of an array.' },
      ],
      examPoints: [
        'State and compare all four loop types.',
        'Draw a while vs do-while flowchart.',
        'Explain break and continue with a numbered example.',
        'Show foreach with key => value syntax.',
      ],
      questions: [
        {
          prompt: 'Explain the different types of loop statements in PHP with examples.',
          plan: ANSWER_PLAN(
            'Loops repeat a block of code while a condition is true or for each array element',
            'while flowchart: check → body → check; do-while: body → check',
            'while, do-while, for (three-part header), foreach (arrays). break/continue',
            'marks array summed with foreach; odd numbers with for; break at 6',
            'foreach is cleanest for arrays; do-while runs at least once',
          ),
        },
        {
          prompt: 'What is the difference between break and continue in PHP loops?',
          plan: ANSWER_PLAN(
            'break exits the loop; continue skips to the next iteration',
            'Loop body with break → exit; continue → jump back to condition',
            'break can take a number (break 2) to exit nested loops; continue skips current iteration only',
            'for i=1..10: skip even (continue), stop at 6 (break)',
            'Both are control-transfer statements inside loops',
          ),
        },
      ],
      keywords: ['while', 'do-while', 'for', 'foreach', 'break', 'continue', 'loop', 'iteration', 'array'],
      remember: [
        { prompt: 'Which loop always runs at least once?', answer: '`do-while`.' },
        { prompt: 'Which loop is best for arrays?', answer: '`foreach`.' },
        { prompt: 'What does `break 2` do?', answer: 'Exits two levels of nested loops.' },
        { prompt: 'What does `continue` do?', answer: 'Skips the rest of the current iteration and moves to the next.' },
      ],
    },

    // ------------------------------------------------------------------
    'control-structure': {
      difficulty: 'medium',
      intro:
        'Beyond basic loops and decisions, PHP provides alternative syntax, `return`, `goto`, and other structural tools for cleaner template-style code.',
      definition:
        'A **control structure** is any statement that changes the sequential flow of execution. This includes decisions, loops, `break`, `continue`, `return`, `goto`, and the **alternative syntax** (colon-style) for embedding control structures cleanly in HTML templates.',
      simpleExplanation: {
        text: 'Normal PHP uses curly braces `{}` to group blocks. Alternative syntax swaps `{` for `:` and ends the block with `endif:`, `endfor:`, `endforeach:`, or `endwhile:`. This is much easier to read when mixing PHP with HTML.',
        analogy:
          'Normal syntax is like a box with a lid. Alternative syntax is like writing "start here" and "end here" labels on a road — more readable when the content spans many lines of HTML.',
      },
      visual: {
        type: 'comparison',
        title: 'Normal syntax vs alternative syntax',
        items: [
          {
            title: 'Normal (curly brace)',
            tone: 'muted',
            points: [
              '`if ($x) { ... }`',
              '`for (...) { ... }`',
              '`foreach ($a as $v) { ... }`',
              'Clean in pure PHP files',
            ],
          },
          {
            title: 'Alternative (colon style)',
            tone: 'accent',
            points: [
              '`if ($x): ... endif;`',
              '`for (...): ... endfor;`',
              '`foreach ($a as $v): ... endforeach;`',
              'Much cleaner in HTML template files',
            ],
          },
        ],
      },
      explanation: [
        { heading: 'Alternative syntax in HTML templates' },
        'Replace the opening `{` with `:` and close with `end` + keyword + `;`. This lets IDE syntax highlighting and template designers track blocks more easily.',
        {
          code: `<?php if ($loggedIn): ?>
  <p>Welcome, <?= htmlspecialchars($name) ?>!</p>
<?php else: ?>
  <p>Please log in.</p>
<?php endif; ?>

<?php foreach ($students as $s): ?>
  <li><?= htmlspecialchars($s) ?></li>
<?php endforeach; ?>`,
        },
        { heading: 'return' },
        '`return` exits the current function and optionally sends a value back to the caller. At file scope it stops executing the file (like `exit` but gentler for included files).',
        {
          code: `function getGrade($marks) {
    if ($marks >= 75) return "Distinction";
    if ($marks >= 60) return "First Class";
    return "Fail";
}
echo getGrade(78); // Distinction`,
        },
        { heading: 'goto' },
        '`goto` jumps execution to a **label** elsewhere in the same file (or function). It cannot jump into a function, class, or loop. It is rarely used — readable code avoids it — but it may appear in exam questions.',
        {
          code: `goto skip;
echo "This is skipped\\n";
skip:
echo "Execution resumes here\\n";`,
        },
        { note: '`goto` cannot jump into a loop or switch body, and cannot cross function/class boundaries.' },
      ],
      example: {
        title: 'Student list using alternative foreach syntax',
        code: `<?php
$students = ["Alice", "Bob", "Charlie"];
$loggedIn = true;
$name = "Admin";
?>
<!DOCTYPE html>
<html><body>

<?php if ($loggedIn): ?>
  <h2>Welcome, <?= htmlspecialchars($name) ?>!</h2>
  <ul>
  <?php foreach ($students as $s): ?>
    <li><?= htmlspecialchars($s) ?></li>
  <?php endforeach; ?>
  </ul>
<?php else: ?>
  <p>Please log in.</p>
<?php endif; ?>

</body></html>`,
        output: `Welcome, Admin!
• Alice
• Bob
• Charlie`,
        explanation:
          'The alternative `if: ... endif;` and `foreach: ... endforeach;` form makes the PHP control structure visible inside the HTML without confusing closing braces.',
      },
      keyPoints: [
        'Alternative syntax: `:` instead of `{`, closes with `endif;`, `endfor;`, `endforeach;`, `endwhile;`.',
        '`return` exits a function and optionally returns a value.',
        '`goto label;` jumps to a label in the same scope — avoid in practice.',
        'Alternative syntax is preferred in HTML template files.',
      ],
      importantTerms: [
        { term: 'Alternative syntax', meaning: 'Colon-style control structures ending with endXxx; used in templates.' },
        { term: 'return', meaning: 'Exits the current function and optionally passes a value back.' },
        { term: 'goto', meaning: 'Unconditionally jumps to a labelled line in the same scope.' },
        { term: 'Label', meaning: 'An identifier followed by `:` used as a goto target.' },
      ],
      examPoints: [
        'Write alternative syntax for if and foreach.',
        'Explain when alternative syntax is preferred (HTML templates).',
        'State what `return` does inside a function and at file scope.',
        'State the limitation of `goto` (cannot jump into loops/functions).',
      ],
      questions: [
        {
          prompt: 'What is alternative syntax in PHP control structures? Give an example.',
          plan: ANSWER_PLAN(
            'A colon-style form of if/for/foreach/while that closes with endif/endfor/endforeach/endwhile',
            'if ($x): ... endif; vs if ($x) { ... }',
            'Opening { replaced with :; useful in HTML templates; better readability',
            'Student list with foreach: ... endforeach; inside HTML',
            'Same behaviour as curly-brace form; preferred in view/template files',
          ),
        },
      ],
      keywords: ['alternative syntax', 'endif', 'endfor', 'endforeach', 'endwhile', 'return', 'goto', 'label', 'template'],
      remember: [
        { prompt: 'How do you close an alternative foreach?', answer: '`endforeach;`' },
        { prompt: 'Can goto jump into a loop?', answer: 'No — it cannot jump into a loop, switch, or function.' },
        { prompt: 'What does return do at file scope?', answer: 'Stops execution of the current file (useful in included files).' },
      ],
    },

    // ------------------------------------------------------------------
    'declare': {
      difficulty: 'medium',
      intro:
        '`declare` is a special PHP block that sets execution directives — low-level settings that affect how the engine handles the current file.',
      definition:
        '`declare(directive=value)` is a PHP construct that sets a compile-time directive for the current file or block. The three supported directives are **strict_types**, **ticks**, and **encoding**.',
      simpleExplanation: {
        text: '`declare` is placed at the very top of a file to change how PHP treats that file. The most important directive is `strict_types=1`, which forces PHP to check argument types strictly and refuse silent coercions.',
        analogy:
          'Declaring `strict_types=1` is like setting a rule: "No guessing — if you pass a string where I expect an integer, PHP must refuse." It turns PHP from a lenient teacher into a strict one for that file.',
      },
      visual: {
        type: 'comparison',
        title: 'strict_types=0 (default) vs strict_types=1',
        items: [
          {
            title: 'strict_types=0 (default)',
            tone: 'muted',
            points: [
              'PHP silently converts types',
              'Passing "5" to int param gives 5',
              'Easier to start with, but hides bugs',
            ],
          },
          {
            title: 'strict_types=1',
            tone: 'accent',
            points: [
              'PHP throws TypeError on wrong type',
              'Passing "5" to int param causes error',
              'Recommended for production code',
            ],
          },
        ],
      },
      explanation: [
        { heading: 'strict_types' },
        'Must appear as the **very first statement** in the file (before even namespace). Affects only the file it appears in, not included files.',
        {
          code: `<?php
declare(strict_types=1);

function add(int $a, int $b): int {
    return $a + $b;
}

echo add(3, 4);    // 7 — OK
echo add("3", 4);  // TypeError — "3" is a string, not int`,
        },
        { heading: 'ticks' },
        'A tick is an event fired every N low-level PHP statements. Used with `register_tick_function()` for profiling or debugging. Rarely used in day-to-day code.',
        {
          code: `<?php
declare(ticks=1);

function ticker() {
    echo "tick!\\n";
}
register_tick_function('ticker');

$a = 1;  // tick
$b = 2;  // tick`,
        },
        { heading: 'encoding' },
        'Specifies the character encoding for the file (e.g., UTF-8). Mostly historical; modern PHP assumes UTF-8 by default.',
        {
          code: `<?php
declare(encoding='UTF-8');
// File is treated as UTF-8`,
        },
        { note: '`declare` can wrap a block: `declare(strict_types=1) { ... }` but the file-scope form (no braces) is most common.' },
      ],
      example: {
        title: 'strict_types preventing a type mistake',
        code: `<?php
declare(strict_types=1);

function multiply(int $x, int $y): int {
    return $x * $y;
}

// Correct call
echo multiply(4, 5) . "\\n"; // 20

// Wrong type — will throw TypeError
try {
    echo multiply("4", 5);
} catch (TypeError $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}
?>`,
        output: `20
Error: multiply(): Argument #1 ($x) must be of type int, string given`,
        explanation:
          'Without `strict_types=1` PHP would silently convert `"4"` to `4`. With it, a `TypeError` is thrown, catching the bug early.',
      },
      keyPoints: [
        '`declare` must be the **first statement** in a file.',
        '`strict_types=1` enforces type declarations — the most useful directive.',
        '`ticks=N` fires a tick event every N statements — for profiling.',
        '`encoding` sets the file character encoding (rarely needed).',
        '`strict_types` applies only to the file that declares it.',
      ],
      importantTerms: [
        { term: 'declare', meaning: 'PHP construct that sets a compile-time directive for the current file.' },
        { term: 'strict_types', meaning: 'Directive that makes PHP enforce declared type hints strictly.' },
        { term: 'TypeError', meaning: 'Exception thrown when a function receives an argument of the wrong type under strict_types.' },
        { term: 'ticks', meaning: 'Directive causing a tick event every N statements; used with register_tick_function.' },
      ],
      examPoints: [
        'State the three directives: strict_types, ticks, encoding.',
        'Explain strict_types=1 with a function example and TypeError output.',
        'Note: declare must be the very first statement.',
        'Note: strict_types affects only the file that contains it.',
      ],
      questions: [
        {
          prompt: 'Explain the declare construct in PHP. What is strict_types?',
          plan: ANSWER_PLAN(
            'declare sets a compile-time directive for the current file',
            'File top → declare(strict_types=1) → function call with wrong type → TypeError',
            'Three directives: strict_types (enforce types), ticks (profiling), encoding (charset)',
            'multiply(int, int) called with ("4", 5) throws TypeError',
            'Must be first statement; affects only that file; strict_types is most important',
          ),
        },
      ],
      keywords: ['declare', 'strict_types', 'TypeError', 'ticks', 'encoding', 'type hint', 'directive'],
      remember: [
        { prompt: 'Where must declare appear?', answer: 'As the very first statement in the file.' },
        { prompt: 'Does strict_types affect included files?', answer: 'No — only the file containing the declare.' },
        { prompt: 'What error does strict_types cause on type mismatch?', answer: '`TypeError`.' },
      ],
    },

    // ------------------------------------------------------------------
    'saving-data': {
      difficulty: 'easy',
      intro:
        'PHP can write data to text files on the server — a simple way to persist information without a database.',
      definition:
        '**Saving data** to a file means opening a file with `fopen()`, writing content with `fwrite()`, and closing it with `fclose()`. The shortcut `file_put_contents()` does all three in one call.',
      simpleExplanation: {
        text: 'Think of a file on disk like a notebook. To save something you: open the notebook, write in it, then close it. `fopen()` opens, `fwrite()` writes, `fclose()` closes. `file_put_contents()` is like handing someone a complete sheet and saying "put this in the notebook".',
        analogy:
          'Saving to a file is like using a stamp-and-seal envelope: you write the letter (data), put it in the envelope (file), and seal it (fclose). Until it is sealed, the content may not be flushed to disk.',
      },
      visual: {
        type: 'process',
        title: 'Steps to save data to a file',
        steps: [
          { step: 1, label: 'fopen($path, mode)', desc: 'Open (or create) the file, get a file handle' },
          { step: 2, label: 'fwrite($handle, $data)', desc: 'Write string data to the file' },
          { step: 3, label: 'fclose($handle)', desc: 'Close the file and flush buffers to disk' },
        ],
      },
      explanation: [
        { heading: 'fopen() modes' },
        {
          table: {
            columns: ['Mode', 'Meaning'],
            rows: [
              ['`r`', 'Read only — file must exist'],
              ['`w`', 'Write only — **truncates** file or creates new'],
              ['`a`', 'Append — pointer at end, creates if missing'],
              ['`x`', 'Write only — **fails** if file already exists'],
              ['`r+`', 'Read and write — file must exist'],
              ['`w+`', 'Read and write — truncates or creates'],
              ['`a+`', 'Read and append — creates if missing'],
            ],
          },
        },
        { heading: 'fwrite()' },
        '`fwrite($handle, $string)` writes the string to the file. It returns the number of bytes written, or `false` on failure.',
        { heading: 'file_put_contents()' },
        '`file_put_contents($path, $data)` writes data in one call. Pass `FILE_APPEND` as the third argument to append instead of overwriting.',
        {
          code: `// One-liner to save
file_put_contents("students.txt", "Alice\\n", FILE_APPEND);`,
        },
      ],
      example: {
        title: 'Save a student record to a text file',
        code: `<?php
$name  = "Alice";
$marks = 85;
$line  = "$name,$marks\\n";

// Method 1: fopen / fwrite / fclose
$handle = fopen("students.txt", "a");
if ($handle === false) {
    die("Cannot open file.");
}
fwrite($handle, $line);
fclose($handle);
echo "Saved with fwrite.\\n";

// Method 2: file_put_contents (append mode)
file_put_contents("students.txt", $line, FILE_APPEND);
echo "Saved with file_put_contents.\\n";
?>`,
        output: `Saved with fwrite.
Saved with file_put_contents.`,
        explanation:
          'Mode `"a"` opens the file for appending so existing records are not lost. `file_put_contents` with `FILE_APPEND` achieves the same result in one line.',
      },
      keyPoints: [
        '`fopen($file, mode)` opens a file and returns a handle.',
        '`fwrite($handle, $data)` writes a string.',
        '`fclose($handle)` closes the file — always do this.',
        '`file_put_contents($file, $data)` is a one-line shortcut.',
        'Use mode `"a"` to append; `"w"` overwrites the whole file.',
      ],
      importantTerms: [
        { term: 'fopen', meaning: 'Opens a file and returns a file resource (handle).' },
        { term: 'fwrite', meaning: 'Writes a string to an open file.' },
        { term: 'fclose', meaning: 'Closes an open file resource.' },
        { term: 'file_put_contents', meaning: 'Writes data to a file in one step; FILE_APPEND flag enables appending.' },
        { term: 'File handle', meaning: 'A resource returned by fopen used to identify the open file.' },
      ],
      examPoints: [
        'List and explain fopen modes (r, w, a, x, r+, w+, a+).',
        'Show the three-step fopen/fwrite/fclose pattern.',
        'Explain file_put_contents with FILE_APPEND.',
        'State the difference between w (truncate) and a (append).',
      ],
      questions: [
        {
          prompt: 'How do you save data to a file in PHP? Explain with an example.',
          plan: ANSWER_PLAN(
            'Open file with fopen, write with fwrite, close with fclose; or use file_put_contents',
            'Open → Write → Close process diagram',
            'fopen modes table (r/w/a/x); fwrite returns bytes written; fclose flushes; file_put_contents shortcut',
            'Student name and marks saved to students.txt using both methods',
            'Always fclose; use a mode to append; file_put_contents is cleaner for simple writes',
          ),
        },
      ],
      keywords: ['fopen', 'fwrite', 'fclose', 'file_put_contents', 'FILE_APPEND', 'file mode', 'append', 'write'],
      remember: [
        { prompt: 'Which fopen mode appends without deleting existing content?', answer: '`"a"`' },
        { prompt: 'Which fopen mode creates a new file and fails if it exists?', answer: '`"x"`' },
        { prompt: 'What does file_put_contents return on success?', answer: 'The number of bytes written.' },
      ],
    },

    // ------------------------------------------------------------------
    'storing-and-retrieving': {
      difficulty: 'easy',
      intro:
        'Storing and retrieving is the complete cycle: write data to a file in one operation, then read it back in another.',
      definition:
        '**Storing and retrieving data** means writing structured content to a persistent file and later reading that content back — the simplest form of data persistence in PHP without a database.',
      simpleExplanation: {
        text: 'You write student names and marks to a text file (store). Later, you read the file back and display the data (retrieve). This cycle replaces a database for small applications.',
        analogy:
          'Storing is like writing notes in a diary. Retrieving is like opening the diary later and reading those notes. The diary is the file — it remembers even after the program ends.',
      },
      visual: {
        type: 'process',
        title: 'Store → Persist → Retrieve cycle',
        steps: [
          { step: 1, label: 'Store', desc: 'Write data to file with fwrite or file_put_contents' },
          { step: 2, label: 'File on disk', desc: 'Data persists between requests' },
          { step: 3, label: 'Retrieve', desc: 'Read data with fread, fgets, file_get_contents, or file()' },
          { step: 4, label: 'Display', desc: 'Process and output the retrieved data' },
        ],
      },
      explanation: [
        { heading: 'Store phase' },
        'Write each student record as a comma-separated line and append it to a file.',
        {
          code: `$data = "Bob,72\\n";
file_put_contents("records.txt", $data, FILE_APPEND);`,
        },
        { heading: 'Retrieve phase' },
        '`file()` reads the entire file into an array, one element per line. Loop over the array, split each line on comma, and display the fields.',
        {
          code: `$lines = file("records.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    [$name, $marks] = explode(",", $line);
    echo "Name: $name  Marks: $marks\\n";
}`,
        },
        { tip: 'Use `FILE_IGNORE_NEW_LINES` with `file()` so line strings do not include the trailing `\\n`.' },
      ],
      example: {
        title: 'Full store-and-retrieve cycle for student records',
        code: `<?php
$file = "students.txt";

// --- STORE ---
$students = [
    ["Alice", 85],
    ["Bob",   72],
    ["Carol", 91],
];

// Clear file first, then append each record
file_put_contents($file, "");  // reset
foreach ($students as [$name, $marks]) {
    file_put_contents($file, "$name,$marks\\n", FILE_APPEND);
}
echo "Data stored.\\n\\n";

// --- RETRIEVE ---
$lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
echo "Retrieved records:\\n";
foreach ($lines as $line) {
    [$name, $marks] = explode(",", $line);
    echo "  Name: $name | Marks: $marks\\n";
}
?>`,
        output: `Data stored.

Retrieved records:
  Name: Alice | Marks: 85
  Name: Bob   | Marks: 72
  Name: Carol | Marks: 91`,
        explanation:
          'The store phase writes three CSV lines. The retrieve phase reads them back with `file()`, splits each on comma with `explode()`, and displays the fields.',
      },
      keyPoints: [
        '`file_put_contents` stores data; `file()` retrieves it as an array of lines.',
        'Use `FILE_IGNORE_NEW_LINES` to strip `\\n` from each line.',
        '`explode(",", $line)` splits a CSV line into fields.',
        'Files persist between PHP requests — that is the point of file storage.',
      ],
      importantTerms: [
        { term: 'file()', meaning: 'Reads an entire file into an indexed array, one element per line.' },
        { term: 'explode', meaning: 'Splits a string by a delimiter and returns an array.' },
        { term: 'CSV', meaning: 'Comma-Separated Values — a simple text format for tabular data.' },
        { term: 'FILE_IGNORE_NEW_LINES', meaning: 'Flag for file() that removes trailing newlines from each element.' },
      ],
      examPoints: [
        'Draw the store → file → retrieve cycle.',
        'Show writing multiple records with file_put_contents + FILE_APPEND.',
        'Show reading them back with file() and explode().',
        'Explain why files persist between requests.',
      ],
      questions: [
        {
          prompt: 'Explain how PHP stores and retrieves data from a file with an example.',
          plan: ANSWER_PLAN(
            'Writing structured data to a file and reading it back — simple persistence without a database',
            'Program → fwrite to file on disk → later program → fread from file',
            'Store: file_put_contents + FILE_APPEND; Retrieve: file() + explode()',
            'Three student records written as CSV then read back and displayed',
            'file() reads line-by-line; explode splits CSV; FILE_IGNORE_NEW_LINES cleans output',
          ),
        },
      ],
      keywords: ['file_put_contents', 'file()', 'explode', 'FILE_APPEND', 'FILE_IGNORE_NEW_LINES', 'CSV', 'persist'],
      remember: [
        { prompt: 'Which function reads a file into an array of lines?', answer: '`file()`' },
        { prompt: 'Which flag removes trailing newlines from file() elements?', answer: '`FILE_IGNORE_NEW_LINES`' },
        { prompt: 'How do you split a CSV line into fields?', answer: '`explode(",", $line)`' },
      ],
    },

    // ------------------------------------------------------------------
    'processing-files': {
      difficulty: 'medium',
      intro:
        'Processing a file correctly means opening it safely, checking for errors, reading or writing, and always closing — following a reliable workflow.',
      definition:
        '**Processing files** in PHP is the complete workflow of: checking a file exists, opening it safely with `fopen()`, performing read/write operations, handling errors, and closing the handle with `fclose()`.',
      simpleExplanation: {
        text: 'Real programs can fail at any step — the file may not exist, or the server may deny access. Good file processing always checks: did fopen succeed? Did fwrite succeed? Only then proceed. `or die()` is a shortcut for "if this fails, stop and show an error".',
        analogy:
          'Processing a file is like a surgeon performing an operation: check the patient (file_exists), prepare instruments (fopen), operate (fwrite/fread), handle any complication (or die), then close up (fclose). Skipping any step risks disaster.',
      },
      visual: {
        type: 'flow',
        title: 'Safe file processing workflow',
        steps: [
          { id: 'check', label: 'file_exists()?', shape: 'diamond' },
          { id: 'open', label: 'fopen()', shape: 'box' },
          { id: 'ok', label: 'Handle valid?', shape: 'diamond' },
          { id: 'process', label: 'fread / fwrite', shape: 'box' },
          { id: 'close', label: 'fclose()', shape: 'box' },
          { id: 'error', label: 'Error / die()', shape: 'box' },
        ],
        edges: [
          { from: 'check', to: 'open', label: 'yes' },
          { from: 'check', to: 'error', label: 'no' },
          { from: 'open', to: 'ok' },
          { from: 'ok', to: 'process', label: 'true' },
          { from: 'ok', to: 'error', label: 'false' },
          { from: 'process', to: 'close' },
        ],
      },
      explanation: [
        { heading: 'Open safely with or die()' },
        '`fopen()` returns `false` if it fails. The `or die()` idiom stops execution with an error message if the call fails.',
        {
          code: `$handle = fopen("data.txt", "r") or die("Cannot open data.txt");`,
        },
        { heading: 'Read loop until end of file' },
        'Use `feof($handle)` to detect end-of-file and `fgets($handle)` to read one line at a time.',
        {
          code: `$handle = fopen("data.txt", "r") or die("Error opening file");
while (!feof($handle)) {
    $line = fgets($handle);
    if ($line !== false) {
        echo trim($line) . "\\n";
    }
}
fclose($handle);`,
        },
        { heading: 'Error checking on fwrite' },
        {
          code: `$handle = fopen("log.txt", "a") or die("Cannot open log.txt");
$bytes = fwrite($handle, date("Y-m-d H:i:s") . " - Event logged\\n");
if ($bytes === false) {
    echo "Write failed!";
}
fclose($handle);`,
        },
        { note: 'Always call `fclose()` — even when an error occurs — to free the file resource.' },
      ],
      example: {
        title: 'Processing a student marks file with error checks',
        code: `<?php
$file = "marks.txt";

// Write some data first
file_put_contents($file, "Alice,85\\nBob,72\\nCarol,91\\n");

// Open for reading
$handle = fopen($file, "r") or die("Cannot open $file");

echo "Processing file: $file\\n";
$count = 0;
while (!feof($handle)) {
    $line = fgets($handle);
    if ($line === false) break;        // end of file
    $line = trim($line);
    if ($line === '') continue;        // skip blank lines

    [$name, $marks] = explode(",", $line);
    $count++;
    echo "  [$count] $name => $marks marks\\n";
}
fclose($handle);
echo "Total records: $count\\n";
?>`,
        output: `Processing file: marks.txt
  [1] Alice => 85 marks
  [2] Bob => 72 marks
  [3] Carol => 91 marks
Total records: 3`,
        explanation:
          'The `or die()` halts gracefully if the file cannot be opened. `feof` drives the loop, `fgets` reads line by line, `trim` cleans whitespace, and `fclose` releases the handle.',
      },
      keyPoints: [
        '`fopen() or die()` stops cleanly if the file cannot be opened.',
        '`feof($handle)` returns `true` when the end of file is reached.',
        '`fgets()` reads one line including the newline character.',
        'Always `fclose()` the handle when done.',
        'Check `fwrite()` return value to detect write errors.',
      ],
      importantTerms: [
        { term: 'or die()', meaning: 'Idiom: if the left side fails (returns false), stop and print a message.' },
        { term: 'feof()', meaning: 'Returns true when the file pointer is at the end of the file.' },
        { term: 'fgets()', meaning: 'Reads one line from an open file, including the newline.' },
        { term: 'File resource', meaning: 'The internal handle PHP uses to track an open file.' },
      ],
      examPoints: [
        'Draw the safe file processing workflow.',
        'Explain `or die()` and when fopen returns false.',
        'Show a while(!feof) read loop.',
        'State why fclose must always be called.',
      ],
      questions: [
        {
          prompt: 'Describe the file processing workflow in PHP with error handling.',
          plan: ANSWER_PLAN(
            'Open → check → read/write → error handle → close',
            'file_exists → fopen → handle valid? → fread/fwrite → fclose',
            'fopen or die; feof loop with fgets; fwrite return check; always fclose',
            'Marks file opened, read line by line with count, closed',
            'or die() is shortcut; feof detects end; fgets reads one line; fclose frees resource',
          ),
        },
      ],
      keywords: ['fopen', 'fclose', 'feof', 'fgets', 'or die', 'file processing', 'error handling', 'file resource'],
      remember: [
        { prompt: 'What does fopen return on failure?', answer: '`false`' },
        { prompt: 'What does feof return when end is reached?', answer: '`true`' },
        { prompt: 'What does fgets include at end of each line?', answer: 'The newline character `\\n` — use `trim()` to remove it.' },
      ],
    },

    // ------------------------------------------------------------------
    'opening-writing-and-closing-a-file': {
      difficulty: 'easy',
      intro:
        'The three essential operations for any file are: open it, write to it, and close it. Mastering `fopen`, `fwrite`, and `fclose` is fundamental to PHP file I/O.',
      definition:
        '**Opening** a file means calling `fopen($path, $mode)` which returns a file handle. **Writing** means calling `fwrite($handle, $string)`. **Closing** means calling `fclose($handle)` to release the resource and flush data to disk.',
      simpleExplanation: {
        text: '`fopen` is the key to the door (opens the file). `fwrite` is writing inside the room. `fclose` is locking the door again. Without closing, data might not be fully saved and the file lock stays open.',
        analogy:
          "A librarian's borrowing system: open the register (fopen), write the borrower's name (fwrite), close and lock the register (fclose). If you don't close it, the next librarian can't use it.",
      },
      visual: {
        type: 'process',
        title: 'Open → Write → Close sequence',
        steps: [
          { step: 1, label: 'fopen($file, "w")', desc: 'Opens file for writing; creates if not exists; truncates existing' },
          { step: 2, label: 'fwrite($handle, $text)', desc: 'Writes string to the file at current pointer' },
          { step: 3, label: 'fwrite($handle, $more)', desc: 'Writes more data; pointer advances' },
          { step: 4, label: 'fclose($handle)', desc: 'Flushes buffers and releases the file handle' },
        ],
      },
      explanation: [
        { heading: 'fopen() — modes reference' },
        {
          table: {
            columns: ['Mode', 'Read', 'Write', 'Truncate', 'Create', 'Pointer'],
            rows: [
              ['`r`',  '✓', '✗', '✗', '✗', 'Start'],
              ['`r+`', '✓', '✓', '✗', '✗', 'Start'],
              ['`w`',  '✗', '✓', '✓', '✓', 'Start'],
              ['`w+`', '✓', '✓', '✓', '✓', 'Start'],
              ['`a`',  '✗', '✓', '✗', '✓', 'End'],
              ['`a+`', '✓', '✓', '✗', '✓', 'End'],
              ['`x`',  '✗', '✓', '✗', 'Fail if exists', 'Start'],
            ],
          },
        },
        { heading: 'fwrite()' },
        '`fwrite($handle, $string [, $length])` writes `$string` (or up to `$length` bytes) to the file. Returns bytes written or `false`.',
        { heading: 'fclose()' },
        '`fclose($handle)` closes the file stream. Returns `true` on success. After this the handle is invalid.',
        { heading: 'Writing a log file example' },
        {
          code: `$handle = fopen("app.log", "a") or die("Cannot open log");
fwrite($handle, date("Y-m-d H:i:s") . " INFO: Page visited\\n");
fclose($handle);`,
        },
      ],
      example: {
        title: 'Writing a multi-line log file',
        code: `<?php
$logFile = "activity.log";
$events  = [
    "User logged in",
    "Viewed dashboard",
    "Downloaded report",
    "User logged out",
];

$handle = fopen($logFile, "w") or die("Cannot open $logFile");

foreach ($events as $event) {
    $entry = date("H:i:s") . " - $event\\n";
    $written = fwrite($handle, $entry);
    if ($written === false) {
        echo "Write failed for: $event\\n";
    }
}

fclose($handle);
echo "Log file written: $logFile\\n";
echo "Contents:\\n";
echo file_get_contents($logFile);
?>`,
        output: `Log file written: activity.log
Contents:
10:45:01 - User logged in
10:45:01 - Viewed dashboard
10:45:01 - Downloaded report
10:45:01 - User logged out`,
        explanation:
          'Mode `"w"` creates or truncates the file. Four events are written in a loop. `fclose` ensures data is flushed. `file_get_contents` reads back the whole file for display.',
      },
      keyPoints: [
        '`fopen(path, mode)` returns a handle or `false`.',
        '`fwrite(handle, string)` writes and returns byte count.',
        '`fclose(handle)` must always be called.',
        'Mode `"w"` truncates; `"a"` appends; `"x"` fails if file exists.',
        'The file pointer position matters: `"w"` starts at beginning, `"a"` at end.',
      ],
      importantTerms: [
        { term: 'File pointer', meaning: 'The current read/write position within the open file.' },
        { term: 'Truncate', meaning: 'Erase the entire contents of a file when opening in w or w+ mode.' },
        { term: 'fwrite', meaning: 'Writes a string to an open file resource.' },
        { term: 'fclose', meaning: 'Closes an open file resource and flushes internal buffers.' },
      ],
      examPoints: [
        'Draw the open-write-close sequence.',
        'Give the full fopen modes table with read/write/truncate/pointer.',
        'Explain what truncate means (mode w).',
        'Show writing multiple lines to a log file.',
      ],
      questions: [
        {
          prompt: 'Explain fopen, fwrite and fclose in PHP with a practical example.',
          plan: ANSWER_PLAN(
            'fopen opens file returning handle; fwrite writes string; fclose closes and flushes',
            'Open → Write (loop) → Close sequence',
            'Modes table (r/w/a/x/r+/w+/a+); pointer position; fwrite returns bytes; fclose is mandatory',
            'Activity log file written with four events in a foreach loop',
            'Always fclose; mode w truncates; mode a appends; check fwrite return for errors',
          ),
        },
      ],
      keywords: ['fopen', 'fwrite', 'fclose', 'file pointer', 'truncate', 'append', 'mode', 'log file'],
      remember: [
        { prompt: 'What does mode "w" do to an existing file?', answer: 'Truncates (empties) it.' },
        { prompt: 'Where does the pointer start in mode "a"?', answer: 'At the end of the file.' },
        { prompt: 'What does fwrite return on failure?', answer: '`false`' },
      ],
    },

    // ------------------------------------------------------------------
    'reading-from-file': {
      difficulty: 'easy',
      intro:
        'PHP offers several functions to read file content — from reading the whole file at once to processing it line by line.',
      definition:
        '**Reading from a file** means loading content from a file on disk into PHP variables. Key functions are: `fread()` (binary-safe read), `fgets()` (one line), `feof()` (end-of-file check), `file()` (all lines as array), and `file_get_contents()` (whole file as string).',
      simpleExplanation: {
        text: '`file_get_contents` is like scanning the whole page at once. `file()` reads the page and gives you each line on a separate sticky note. `fgets` reads one line at a time inside a loop — useful for very large files.',
        analogy:
          'Reading a file is like reading a book: `file_get_contents` reads the whole book at once; `file()` rips out all pages and hands them to you; `fgets` makes you read page by page.',
      },
      visual: {
        type: 'comparison',
        title: 'Reading functions compared',
        items: [
          {
            title: 'file_get_contents()',
            tone: 'accent',
            points: [
              'Returns entire file as one string',
              'Simplest — no handle needed',
              'Not suitable for huge files',
            ],
          },
          {
            title: 'file()',
            tone: 'muted',
            points: [
              'Returns array of lines',
              'FILE_IGNORE_NEW_LINES strips \\n',
              'Good for line-by-line processing',
            ],
          },
          {
            title: 'fgets() in loop',
            tone: 'accent',
            points: [
              'Reads one line per call',
              'Memory-efficient for large files',
              'Needs fopen handle and feof check',
            ],
          },
          {
            title: 'fread()',
            tone: 'muted',
            points: [
              'Reads N bytes at a time',
              'Binary-safe',
              'Use with filesize() for full read',
            ],
          },
        ],
      },
      explanation: [
        { heading: 'file_get_contents()' },
        'Reads the whole file into a string. No handle required.',
        {
          code: `$content = file_get_contents("students.txt");
echo $content;`,
        },
        { heading: 'file()' },
        'Returns an array where each element is one line of the file.',
        {
          code: `$lines = file("students.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    echo $line . "\\n";
}`,
        },
        { heading: 'fgets() with feof()' },
        'Read line by line inside a while loop — best for large files.',
        {
          code: `$handle = fopen("students.txt", "r") or die("Error");
while (!feof($handle)) {
    $line = fgets($handle);
    if ($line !== false) echo trim($line) . "\\n";
}
fclose($handle);`,
        },
        { heading: 'fread()' },
        '`fread($handle, $bytes)` reads exactly `$bytes` bytes (or fewer at EOF). Use `filesize($path)` to read the whole file.',
        {
          code: `$handle = fopen("students.txt", "r") or die("Error");
$content = fread($handle, filesize("students.txt"));
fclose($handle);
echo $content;`,
        },
      ],
      example: {
        title: 'Reading student data line by line with fgets',
        code: `<?php
// Create a sample file
file_put_contents("students.txt", "Alice,85\\nBob,72\\nCarol,91\\n");

// Read line by line
$handle = fopen("students.txt", "r") or die("Cannot open file");
echo "Student Records:\\n";
$sr = 1;
while (!feof($handle)) {
    $line = fgets($handle);
    if ($line === false) break;

    $line = trim($line);
    if ($line === '') continue;

    [$name, $marks] = explode(",", $line);
    $status = ($marks >= 75) ? "Distinction" : (($marks >= 50) ? "Pass" : "Fail");
    echo "  $sr. $name | Marks: $marks | Status: $status\\n";
    $sr++;
}
fclose($handle);
?>`,
        output: `Student Records:
  1. Alice | Marks: 85 | Status: Distinction
  2. Bob   | Marks: 72 | Status: Pass
  3. Carol | Marks: 91 | Status: Distinction`,
        explanation:
          '`fgets` reads one line per iteration. `trim` removes the newline. `explode` splits CSV. A ternary classifies each student. `fclose` releases the handle.',
      },
      keyPoints: [
        '`file_get_contents` — whole file as string, no handle needed.',
        '`file()` — whole file as array of lines.',
        '`fgets()` — one line at a time in a loop with `feof()`.',
        '`fread($h, $n)` — reads n bytes, binary-safe.',
        'Always `fclose()` after `fopen`.',
      ],
      importantTerms: [
        { term: 'file_get_contents', meaning: 'Reads an entire file into a string in one call.' },
        { term: 'file()', meaning: 'Reads an entire file into an indexed array of lines.' },
        { term: 'fgets', meaning: 'Reads one line from an open file handle.' },
        { term: 'fread', meaning: 'Reads a specified number of bytes from an open file (binary-safe).' },
        { term: 'feof', meaning: 'Returns true when the file pointer has reached the end of the file.' },
      ],
      examPoints: [
        'Compare file_get_contents vs file() vs fgets — when to use each.',
        'Show a while(!feof) + fgets loop.',
        'Explain why fgets is preferred for large files.',
        'Show fread with filesize.',
      ],
      questions: [
        {
          prompt: 'Explain the different PHP functions for reading from a file.',
          plan: ANSWER_PLAN(
            'Functions that load file content into PHP: file_get_contents, file(), fgets, fread',
            'Four-way comparison table of reading functions',
            'file_get_contents (whole string); file() (array of lines); fgets (one line in loop); fread (N bytes)',
            'Student CSV file read line by line with fgets + feof, classified with ternary',
            'fgets most memory-efficient for large files; always fclose; FILE_IGNORE_NEW_LINES with file()',
          ),
        },
      ],
      keywords: ['fread', 'fgets', 'feof', 'file()', 'file_get_contents', 'FILE_IGNORE_NEW_LINES', 'filesize', 'read'],
      remember: [
        { prompt: 'Which function reads an entire file into a string?', answer: '`file_get_contents()`' },
        { prompt: 'Which function reads an entire file into an array?', answer: '`file()`' },
        { prompt: 'Which function is best for reading very large files?', answer: '`fgets()` in a while(!feof) loop — memory-efficient.' },
        { prompt: 'What does fread need besides the handle?', answer: 'The number of bytes to read (often `filesize($path)`).' },
      ],
    },

    // ------------------------------------------------------------------
    'file-functions': {
      difficulty: 'medium',
      intro:
        'PHP has a rich set of built-in functions for inspecting, renaming, copying, deleting, and managing files and directories.',
      definition:
        '**File functions** are PHP built-in functions that operate on files and directories without reading or writing their content. They include `file_exists()`, `is_readable()`, `is_writable()`, `filesize()`, `unlink()`, `rename()`, `copy()`, and `mkdir()`.',
      simpleExplanation: {
        text: 'Before touching a file you should check it exists and is readable. After saving, you might want to know its size. You can delete it with `unlink`, rename it with `rename`, copy it with `copy`, or organise them into folders with `mkdir`.',
        analogy:
          'File functions are the file-manager tools: you can check if a document exists, check who can read it, see how big it is, move it, copy it, delete it, or create a new folder — all without opening the document.',
      },
      visual: {
        type: 'hierarchy',
        title: 'PHP file utility functions',
        root: 'File functions',
        children: [
          {
            label: 'Checking',
            children: ['file_exists()', 'is_readable()', 'is_writable()', 'is_file()', 'is_dir()'],
          },
          {
            label: 'Info',
            children: ['filesize()', 'filemtime()', 'filetype()', 'pathinfo()'],
          },
          {
            label: 'Operations',
            children: ['unlink()', 'rename()', 'copy()', 'mkdir()', 'rmdir()'],
          },
        ],
      },
      explanation: [
        { heading: 'Checking functions' },
        {
          table: {
            columns: ['Function', 'Returns', 'Purpose'],
            rows: [
              ['`file_exists($path)`', 'bool', 'True if file or directory exists'],
              ['`is_file($path)`', 'bool', 'True if path is a regular file'],
              ['`is_dir($path)`', 'bool', 'True if path is a directory'],
              ['`is_readable($path)`', 'bool', 'True if file exists and is readable'],
              ['`is_writable($path)`', 'bool', 'True if file exists and is writable'],
            ],
          },
        },
        { heading: 'Information functions' },
        {
          table: {
            columns: ['Function', 'Returns'],
            rows: [
              ['`filesize($path)`', 'File size in bytes (int)'],
              ['`filemtime($path)`', 'Last modified time as Unix timestamp'],
              ['`pathinfo($path)`', 'Array with dirname, basename, extension, filename'],
            ],
          },
        },
        { heading: 'Operation functions' },
        {
          table: {
            columns: ['Function', 'Action'],
            rows: [
              ['`unlink($path)`', 'Delete a file'],
              ['`rename($old, $new)`', 'Rename or move a file'],
              ['`copy($src, $dst)`', 'Copy a file'],
              ['`mkdir($path [, $mode, $recursive])`', 'Create a directory'],
              ['`rmdir($path)`', 'Remove an empty directory'],
            ],
          },
        },
        {
          code: `// Safe file check before reading
if (file_exists("data.txt") && is_readable("data.txt")) {
    $content = file_get_contents("data.txt");
    echo "Size: " . filesize("data.txt") . " bytes\\n";
} else {
    echo "File not accessible.\\n";
}`,
        },
      ],
      example: {
        title: 'File management utility: check, copy, rename, delete',
        code: `<?php
$original = "report.txt";
$backup   = "report_backup.txt";

// Create the file
file_put_contents($original, "Annual Report\\nTotal: 500\\n");

// Check file info
if (file_exists($original)) {
    echo "File exists: YES\\n";
    echo "Readable   : " . (is_readable($original) ? "YES" : "NO") . "\\n";
    echo "Writable   : " . (is_writable($original) ? "YES" : "NO") . "\\n";
    echo "Size       : " . filesize($original) . " bytes\\n";
    echo "Modified   : " . date("Y-m-d H:i:s", filemtime($original)) . "\\n";
}

// Copy file
if (copy($original, $backup)) {
    echo "Copied to  : $backup\\n";
}

// Rename original
rename($original, "report_2026.txt");
echo "Renamed to : report_2026.txt\\n";

// Clean up
unlink("report_2026.txt");
unlink($backup);
echo "Files deleted.\\n";

// Create a directory
if (!is_dir("logs")) {
    mkdir("logs", 0755, true);
    echo "Directory  : logs/ created\\n";
}
?>`,
        output: `File exists: YES
Readable   : YES
Writable   : YES
Size       : 25 bytes
Modified   : 2026-10-09 10:45:01
Copied to  : report_backup.txt
Renamed to : report_2026.txt
Files deleted.
Directory  : logs/ created`,
        explanation:
          '`file_exists` guards every operation. `copy` keeps a backup. `rename` renames in-place. `unlink` deletes. `mkdir` with `true` creates parent directories recursively.',
      },
      keyPoints: [
        '`file_exists()` — check before opening, deleting or copying.',
        '`is_readable()` / `is_writable()` — check permissions.',
        '`filesize()` — size in bytes.',
        '`unlink()` — delete a file (not a directory).',
        '`rename()` — rename OR move a file.',
        '`copy()` — duplicate a file.',
        '`mkdir($path, 0755, true)` — create directory recursively.',
      ],
      importantTerms: [
        { term: 'file_exists', meaning: 'Checks whether a file or directory exists at the given path.' },
        { term: 'unlink', meaning: 'Deletes a file from the filesystem.' },
        { term: 'rename', meaning: 'Renames a file; also moves it if a different directory is given.' },
        { term: 'copy', meaning: 'Creates a copy of a file at the destination path.' },
        { term: 'mkdir', meaning: 'Creates a new directory; third argument true enables recursive creation.' },
        { term: 'filesize', meaning: 'Returns the file size in bytes.' },
      ],
      examPoints: [
        'List and describe: file_exists, is_readable, is_writable, filesize, unlink, rename, copy, mkdir.',
        'Show a file-check example before reading.',
        'Distinguish unlink (files) from rmdir (empty directories).',
        'Explain mkdir recursive flag.',
      ],
      questions: [
        {
          prompt: 'List and explain important PHP file functions with examples.',
          plan: ANSWER_PLAN(
            'Built-in PHP functions to check, inspect, and manage files without reading content',
            'Three groups: Checking | Info | Operations',
            'file_exists/is_readable/is_writable (check); filesize/filemtime (info); unlink/rename/copy/mkdir (ops)',
            'Report file: check info → copy → rename → delete → mkdir logs/',
            'Always check file_exists before operations; unlink for files, rmdir for empty dirs; mkdir true = recursive',
          ),
        },
      ],
      keywords: [
        'file_exists', 'is_readable', 'is_writable', 'filesize', 'filemtime',
        'unlink', 'rename', 'copy', 'mkdir', 'rmdir', 'pathinfo', 'is_file', 'is_dir',
      ],
      remember: [
        { prompt: 'Which function deletes a file?', answer: '`unlink($path)`' },
        { prompt: 'Which function also moves a file?', answer: '`rename($old, $new)` — just give a different path.' },
        { prompt: 'How do you create nested directories in one call?', answer: "`mkdir($path, 0755, true)` — third argument `true` enables recursive creation." },
        { prompt: 'What does filesize() return?', answer: 'File size in bytes as an integer.' },
      ],
    },
  },
}
