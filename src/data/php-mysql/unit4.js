// PHP and MySQL — Unit IV: String Manipulation and Functions.
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
    'Unit IV is about working with text and organising code. You clean, format, split, compare and search strings with built-in functions, then learn to reuse code with require() and include() and to write your own functions — with parameters, references and recursion.',

  map: [
    { label: 'Shape strings', topics: ['formatting-strings', 'joining-and-splitting'] },
    { label: 'Search strings', topics: ['comparing', 'matching-and-replacing'] },
    { label: 'Reuse files', topics: ['reusing-code', 'using-require-and-include'] },
    { label: 'Write functions', topics: ['functions', 'defining-own-functions', 'basic-function-structure'] },
    { label: 'Pass data in', topics: ['parameters', 'passing-by-reference', 'passing-by-value'] },
    { label: 'Call yourself', topics: ['recursive-function'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'formatting-strings': {
      difficulty: 'medium',
      intro: 'What users type is messy — extra spaces, odd capitals, new lines. Formatting makes it clean for display and safe for storage.',
      definition:
        'Formatting strings means changing how text looks or is stored: **trimming** whitespace, **formatting for display** (HTML line breaks, `printf()` layouts), **changing case**, and **formatting for storage** (escaping quotes).',
      simpleExplanation: {
        text: 'PHP has a ready-made function for each tidy-up job: `trim()` removes extra spaces, `nl2br()` turns new lines into `<br>`, `strtoupper()` changes case, and `printf()` prints numbers neatly, such as two decimal places.',
        analogy: 'Ironing and folding clothes before putting them on display — same clothes, neater presentation.',
      },
      visual: {
        type: 'process',
        title: 'Cleaning a name typed into a form',
        steps: [
          { label: '"   aRUN kumar  "', detail: 'raw input' },
          { label: 'trim()  →  "aRUN kumar"', detail: 'spaces removed' },
          { label: 'strtolower()  →  "arun kumar"', detail: 'one case' },
          { label: 'ucwords()  →  "Arun Kumar"', detail: 'ready to display' },
        ],
      },
      explanation: [
        { heading: '1. Trimming' },
        {
          table: {
            columns: ['Function', 'Removes whitespace from'],
            rows: [
              ['`trim($s)`', 'Both ends'],
              ['`ltrim($s)`', 'The left (start) only'],
              ['`rtrim($s)` / `chop($s)`', 'The right (end) only'],
            ],
          },
        },
        { heading: '2. Formatting for display' },
        {
          list: [
            '`nl2br($s)` — inserts `<br />` before every new line so line breaks show in HTML.',
            '`printf($format, ...)` — prints a formatted string. `sprintf()` returns it instead of printing.',
          ],
        },
        {
          code: `$total = 1234.5;
printf('Total: Rs. %.2f', $total);       // Total: Rs. 1234.50
printf('%s scored %d marks', 'Priya', 92); // Priya scored 92 marks
echo number_format(1234567.891, 2);        // 1,234,567.89`,
        },
        {
          table: {
            columns: ['Conversion', 'Meaning'],
            rows: [
              ['`%s`', 'String'],
              ['`%d`', 'Integer (decimal)'],
              ['`%f`', 'Floating-point; `%.2f` = 2 decimal places'],
              ['`%5d`', 'Integer padded to width 5'],
              ['`%%`', 'A literal % sign'],
            ],
          },
        },
        { heading: '3. Changing case' },
        {
          table: {
            columns: ['Function', "Result for 'web DESIGN'"],
            rows: [
              ['`strtoupper()`', 'WEB DESIGN'],
              ['`strtolower()`', 'web design'],
              ['`ucfirst()`', 'Web DESIGN'],
              ['`ucwords()`', 'Web DESIGN'],
            ],
          },
        },
        { heading: '4. Formatting for storage' },
        "Quotes and backslashes can break a query string. `addslashes()` puts a backslash before `'`, `\"`, `\\` and NUL; `stripslashes()` removes them again.",
        { code: `echo addslashes("O'Brien");   // O\\'Brien` },
        { note: 'For database queries, prepared statements (Unit V) are the safer modern method; `addslashes()` is shown here as the textbook technique.' },
        { tip: 'When printing user input into HTML, use `htmlspecialchars()` so `<` and `>` are shown as text, not treated as tags.' },
      ],
      example: {
        title: 'Tidy a feedback form before showing it',
        code: `<?php
$name     = "   aRUN kumar  ";
$feedback = "Good class.\nNeed more lab hours.";
$fee      = 1500;

$name = ucwords(strtolower(trim($name)));

echo "<b>$name</b><br>";
echo nl2br(htmlspecialchars($feedback)) . '<br>';
printf('Fee paid: Rs. %.2f', $fee);
?>`,
        output: `Arun Kumar
Good class.
Need more lab hours.
Fee paid: Rs. 1500.00`,
        explanation:
          'The functions run inside-out: trim, then lower case, then capitalise each word. `nl2br()` keeps the feedback on two lines in the browser, and `%.2f` shows the fee with two decimals.',
      },
      keyPoints: [
        '`trim()`, `ltrim()`, `rtrim()`/`chop()` remove whitespace.',
        '`nl2br()` converts new lines to `<br />` for HTML.',
        '`printf()` prints and `sprintf()` returns formatted text using `%s`, `%d`, `%f`.',
        '`strtoupper()`, `strtolower()`, `ucfirst()`, `ucwords()` change case.',
        '`addslashes()` / `stripslashes()` escape and unescape quotes for storage.',
      ],
      importantTerms: [
        { term: 'Whitespace', meaning: 'Spaces, tabs and new-line characters.' },
        { term: 'Format string', meaning: 'Text with conversion specifications like `%d`, used by `printf()`.' },
        { term: 'Conversion specification', meaning: 'A `%` code telling printf how to show one argument.' },
        { term: 'Escaping', meaning: 'Adding a backslash so a special character is treated as plain text.' },
      ],
      examPoints: [
        'Group the functions under: trimming, display, case, storage.',
        'Explain `printf()` conversion codes with a table.',
        'Contrast `printf()` (prints) with `sprintf()` (returns).',
        'Give one example of `nl2br()` and `addslashes()`.',
      ],
      questions: [
        {
          prompt: 'Explain the string formatting functions in PHP with examples.',
          plan: ANSWER_PLAN(
            'Changing how a string looks or is stored',
            'Raw input → trim → strtolower → ucwords',
            'Trimming; nl2br and printf/sprintf; case functions; addslashes/stripslashes',
            'Feedback form tidy-up script with output',
            'printf prints, sprintf returns; use htmlspecialchars for HTML output',
          ),
        },
      ],
      keywords: ['trim()', 'ltrim()', 'rtrim()', 'nl2br()', 'printf()', 'sprintf()', 'strtoupper()', 'ucwords()', 'addslashes()', 'stripslashes()'],
      remember: [
        { prompt: 'Which function shows new lines in HTML?', answer: '`nl2br()`' },
        { prompt: 'What does `%.2f` print for 7.5?', answer: '7.50' },
        { prompt: 'Difference between printf and sprintf?', answer: '`printf()` prints; `sprintf()` returns the string.' },
      ],
    },

    // ------------------------------------------------------------------
    'joining-and-splitting': {
      difficulty: 'easy',
      intro: 'Emails, CSV lines and tag lists are strings with separators. Splitting turns them into arrays; joining turns arrays back into strings.',
      definition:
        'Splitting breaks a string into pieces at a separator, usually with `explode()` or `strtok()`; joining combines array elements into one string with `implode()` (alias `join()`). `substr()` extracts part of a string by position.',
      simpleExplanation: {
        text: '`explode(",", "a,b,c")` cuts the string at each comma and gives `["a", "b", "c"]`. `implode(" | ", $array)` glues the pieces back together with whatever separator you choose.',
        analogy: 'A bar of chocolate: explode snaps it along the lines into pieces; implode lines the pieces up again with a gap between each.',
      },
      visual: {
        type: 'code-flow',
        title: 'explode and implode are opposites',
        input: { label: 'String', lang: 'text', code: "'arun@college.edu'" },
        process: "explode('@', $email) splits at the @",
        output: { label: 'Array', lang: 'text', code: "[0] => 'arun'\n[1] => 'college.edu'" },
      },
      explanation: [
        { heading: 'explode()' },
        {
          code: `$email = 'arun@college.edu';
$parts = explode('@', $email);
echo $parts[1];                 // college.edu`,
        },
        'Syntax: `explode(separator, string, limit)`. The optional `limit` caps the number of pieces.',
        { heading: 'implode() / join()' },
        {
          code: `$subjects = ['PHP', 'Java', 'DBMS'];
echo implode(', ', $subjects);  // PHP, Java, DBMS`,
        },
        '`join()` is an alias of `implode()` — exactly the same function.',
        { heading: 'strtok()' },
        '`strtok()` returns one piece (token) at a time. Call it first with the string, then with only the separators to get the next token.',
        {
          code: `$tok = strtok('PHP is fun', ' ');
while ($tok !== false) {
    echo $tok . '<br>';
    $tok = strtok(' ');
}`,
        },
        { heading: 'substr()' },
        '`substr(string, start, length)` returns part of a string. Positions start at 0; a negative start counts from the end.',
        {
          table: {
            columns: ['Call', "Result for 'Programming'"],
            rows: [
              ['`substr($s, 0, 7)`', 'Program'],
              ['`substr($s, 3)`', 'gramming'],
              ['`substr($s, -4)`', 'ming'],
            ],
          },
        },
      ],
      example: {
        title: 'Split a CSV line, join it differently',
        code: `<?php
$line   = 'CS101,Arun,88';
$fields = explode(',', $line);

echo 'Roll: ' . $fields[0] . '<br>';
echo 'Name: ' . $fields[1] . '<br>';
echo implode(' | ', $fields);
?>`,
        output: `Roll: CS101
Name: Arun
CS101 | Arun | 88`,
        explanation:
          '`explode()` turns one line into an array of three fields. `implode()` joins the same array with a different separator.',
      },
      keyPoints: [
        '`explode(sep, str)` → array of pieces.',
        '`implode(sep, array)` / `join()` → one string.',
        '`strtok()` returns one token per call.',
        '`substr(str, start, length)` extracts part of a string.',
      ],
      importantTerms: [
        { term: 'Delimiter / separator', meaning: 'The character(s) marking where to split, e.g. a comma.' },
        { term: 'Token', meaning: 'One piece of a string returned by `strtok()`.' },
        { term: 'Substring', meaning: 'A part of a larger string.' },
      ],
      examPoints: [
        'Define explode and implode as opposites with one example each.',
        'Show `strtok()` in a loop.',
        'Show `substr()` with positive and negative start values.',
      ],
      questions: [
        {
          prompt: 'Explain joining and splitting of strings in PHP.',
          plan: ANSWER_PLAN(
            'Splitting a string into an array; joining an array into a string',
            'String → explode → array → implode → string',
            'explode with limit, implode/join, strtok loop, substr',
            'CSV line split and re-joined',
            'join() is an alias of implode()',
          ),
        },
      ],
      keywords: ['explode()', 'implode()', 'join()', 'strtok()', 'substr()', 'delimiter', 'token'],
      remember: [
        { prompt: "What does `explode(' ', 'a b c')` return?", answer: "`['a', 'b', 'c']`" },
        { prompt: 'Which function is an alias of implode()?', answer: '`join()`' },
        { prompt: "`substr('Hello', -3)` gives?", answer: "'llo'" },
      ],
    },

    // ------------------------------------------------------------------
    comparing: {
      difficulty: 'medium',
      intro: 'Is this password the same? Which name comes first alphabetically? String comparison answers both.',
      definition:
        'Comparing strings means testing whether two strings are equal or which comes first in order. PHP provides `strcmp()`, `strcasecmp()`, `strnatcmp()` and `strnatcasecmp()`, plus `strlen()` to measure length.',
      simpleExplanation: {
        text: '`strcmp($a, $b)` returns **0** when the strings are equal, a **negative** number when `$a` comes first, and a **positive** number when `$b` comes first. The other functions are variations: ignore case, or compare numbers inside the text naturally.',
        analogy: 'A dictionary check: 0 means both words are the same entry; negative means the first word appears earlier in the dictionary.',
      },
      visual: {
        type: 'comparison',
        title: 'What strcmp() returns',
        table: {
          columns: ['Call', 'Result', 'Meaning'],
          rows: [
            ["`strcmp('apple', 'apple')`", '0', 'Equal'],
            ["`strcmp('apple', 'mango')`", '< 0', 'First string comes first'],
            ["`strcmp('mango', 'apple')`", '> 0', 'Second string comes first'],
          ],
        },
      },
      explanation: [
        { heading: 'The comparison functions' },
        {
          table: {
            columns: ['Function', 'Case-sensitive?', 'Order used'],
            rows: [
              ['`strcmp()`', 'Yes', 'Character codes (dictionary)'],
              ['`strcasecmp()`', 'No', 'Character codes'],
              ['`strnatcmp()`', 'Yes', 'Natural order (numbers as numbers)'],
              ['`strnatcasecmp()`', 'No', 'Natural order'],
            ],
          },
        },
        { heading: 'Why natural order matters' },
        "In character order, `'file12'` comes before `'file2'` because the character `1` is smaller than `2`. Natural order compares `12` and `2` as numbers, so `'file2'` comes first — the way a person would sort.",
        {
          code: `echo strcmp('file12', 'file2');     // negative: file12 first
echo strnatcmp('file12', 'file2');  // positive: file2 first`,
        },
        { heading: 'Upper case comes before lower case' },
        "With `strcmp()`, `'Zebra'` comes before `'apple'` because capital letters have smaller character codes. Use `strcasecmp()` when case should not matter.",
        { heading: 'Length: strlen()' },
        "`strlen($s)` returns the number of bytes in a string — handy for validation such as “password must be at least 8 characters”.",
        { trap: 'Do not write `if (strcmp($a, $b))` to test equality — it is true when the strings are **different**. Test `strcmp($a, $b) == 0`, or simply `$a === $b`.' },
      ],
      example: {
        title: 'Check a username and a password length',
        code: `<?php
$saved    = 'Priya';
$typed    = 'priya';
$password = 'abc12';

if (strcasecmp($saved, $typed) == 0) {
    echo 'Username matches<br>';
}
if (strlen($password) < 8) {
    echo 'Password too short (' . strlen($password) . ' chars)';
}
?>`,
        output: `Username matches
Password too short (5 chars)`,
        explanation:
          '`strcasecmp()` ignores case, so Priya and priya are equal (result 0). `strlen()` counts 5 characters, which fails the 8-character rule.',
      },
      keyPoints: [
        '`strcmp()` returns 0 (equal), < 0 or > 0.',
        '`strcasecmp()` ignores case.',
        '`strnatcmp()` / `strnatcasecmp()` use natural (human) order.',
        '`strlen()` returns the length of a string.',
        'Test equality with `== 0`, not with the raw result.',
      ],
      importantTerms: [
        { term: 'Lexicographic order', meaning: 'Dictionary order based on character codes.' },
        { term: 'Natural order', meaning: 'Order that treats digit sequences as numbers: 2 before 12.' },
        { term: 'Case-insensitive', meaning: 'Treats upper and lower case letters as the same.' },
      ],
      examPoints: [
        'Explain the three possible return values of `strcmp()`.',
        'Tabulate the four comparison functions.',
        'Give the file2 / file12 natural-order example.',
        'Mention `strlen()` for length checks.',
      ],
      questions: [
        {
          prompt: 'Explain the string comparison functions in PHP.',
          plan: ANSWER_PLAN(
            'Functions that test equality or order of two strings',
            'strcmp return-value table',
            'strcmp, strcasecmp, strnatcmp, strnatcasecmp; strlen',
            'Username + password length check',
            '0 means equal; natural order sorts numbers properly',
          ),
        },
      ],
      keywords: ['strcmp()', 'strcasecmp()', 'strnatcmp()', 'strnatcasecmp()', 'strlen()', 'natural order', 'case-insensitive'],
      remember: [
        { prompt: 'What does strcmp() return for equal strings?', answer: '0' },
        { prompt: 'Which function puts file2 before file12?', answer: '`strnatcmp()`' },
      ],
    },

    // ------------------------------------------------------------------
    'matching-and-replacing': {
      difficulty: 'medium',
      intro: 'Find a word in a review, mask a phone number, fix a misspelling everywhere — matching and replacing does it.',
      definition:
        'Matching finds whether and where a substring occurs inside a string (`strstr()`, `strpos()` and related functions). Replacing swaps substrings for new text (`str_replace()`, `substr_replace()`). Regular expressions (`preg_match()`, `preg_replace()`) handle patterns.',
      simpleExplanation: {
        text: '`strpos()` tells you the **position** where a word starts. `strstr()` gives you the **rest of the string** from that word. `str_replace()` swaps every occurrence of one word with another.',
        analogy: 'The “Find” and “Find and Replace” commands in a word processor.',
      },
      visual: {
        type: 'comparison',
        title: 'Finding vs replacing',
        items: [
          {
            title: 'Matching (find)',
            tone: 'muted',
            points: ['strpos() — position number', 'strstr() — text from the match on', 'strrpos() — last position'],
          },
          {
            title: 'Replacing',
            tone: 'accent',
            points: ['str_replace() — every match', 'substr_replace() — by position', 'preg_replace() — by pattern'],
          },
        ],
      },
      explanation: [
        { heading: 'Finding substrings' },
        {
          table: {
            columns: ['Function', 'Returns'],
            rows: [
              ['`strstr($hay, $needle)`', 'Part of $hay from the first match to the end (or false)'],
              ['`stristr()`', 'Same, case-insensitive'],
              ['`strrchr($hay, $char)`', 'Part from the last occurrence of a character'],
              ['`strpos($hay, $needle)`', 'Position (0-based) of the first match, or false'],
              ['`strrpos($hay, $needle)`', 'Position of the last match, or false'],
            ],
          },
        },
        {
          code: `$email = 'arun@college.edu';
echo strstr($email, '@');     // @college.edu
echo strpos($email, '@');     // 4`,
        },
        {
          trap: "`strpos()` can return **0** (match at the very start), which is falsy. Always test with `!== false`: `if (strpos($s, 'PHP') !== false)`.",
        },
        { heading: 'Replacing substrings' },
        {
          code: `$text = 'I like Java. Java is fun.';
echo str_replace('Java', 'PHP', $text);
// I like PHP. PHP is fun.

$phone = '9876543210';
echo substr_replace($phone, 'XXXXXX', 2, 6);
// 98XXXXXX10`,
        },
        '`str_replace(search, replace, subject)` swaps every match; it also accepts arrays for search and replace. `substr_replace(string, replacement, start, length)` replaces by position.',
        { heading: 'Pattern matching with regular expressions' },
        'When you need a pattern rather than fixed text — “any 10 digits”, “a valid email” — use **Perl-compatible regular expressions**:',
        {
          code: `if (preg_match('/^[0-9]{10}$/', $phone)) {
    echo 'Valid phone';
}
echo preg_replace('/\\s+/', ' ', "too    many   spaces");`,
        },
        { note: 'The older POSIX functions `ereg()` and `eregi()` seen in old books were removed in PHP 7 — use `preg_` functions.' },
      ],
      example: {
        title: 'Censor a word and check for a keyword',
        code: `<?php
$review = 'The lab was boring but the PHP class was great.';

if (strpos($review, 'PHP') !== false) {
    echo 'Mentions PHP at position ' . strpos($review, 'PHP') . '<br>';
}
echo str_replace('boring', '******', $review);
?>`,
        output: `Mentions PHP at position 27
The lab was ****** but the PHP class was great.`,
        explanation:
          '`strpos()` found “PHP” starting at index 27, and the `!== false` test is safe even for a match at position 0. `str_replace()` masked the word.',
      },
      keyPoints: [
        '`strstr()` returns text from the match; `strpos()` returns the position.',
        'Compare `strpos()` results with `!== false`.',
        '`str_replace()` replaces every occurrence; `substr_replace()` replaces by position.',
        '`preg_match()` / `preg_replace()` work with regular-expression patterns.',
      ],
      importantTerms: [
        { term: 'Haystack / needle', meaning: 'The string searched in / the substring searched for.' },
        { term: '`strpos()`', meaning: 'Returns the index of the first occurrence, or false.' },
        { term: '`str_replace()`', meaning: 'Replaces all occurrences of a substring.' },
        { term: 'Regular expression', meaning: 'A pattern describing a set of strings, e.g. `/^[0-9]{10}$/`.' },
      ],
      examPoints: [
        'Tabulate the finding functions and what each returns.',
        'Explain the `!== false` rule for `strpos()`.',
        'Show `str_replace()` and `substr_replace()` with outputs.',
        'Mention `preg_match()` / `preg_replace()` for patterns.',
      ],
      questions: [
        {
          prompt: 'Explain the functions used for matching and replacing substrings in PHP.',
          plan: ANSWER_PLAN(
            'Finding where text occurs and swapping it for new text',
            'Matching vs replacing comparison',
            'strstr, stristr, strrchr, strpos, strrpos; str_replace, substr_replace; preg functions',
            'Keyword check and censor script',
            'Use !== false with strpos',
          ),
        },
      ],
      keywords: ['strstr()', 'stristr()', 'strrchr()', 'strpos()', 'strrpos()', 'str_replace()', 'substr_replace()', 'preg_match()', 'preg_replace()'],
      remember: [
        { prompt: "What does `strpos('PHP rocks', 'PHP')` return?", answer: '0 — so test with `!== false`.' },
        { prompt: 'Which function replaces every occurrence of a word?', answer: '`str_replace()`' },
      ],
    },

    // ------------------------------------------------------------------
    'reusing-code': {
      difficulty: 'easy',
      intro: 'Every page of a site has the same header, menu and footer. Writing them once and reusing them is the professional way.',
      definition:
        'Reusing code means writing a piece of code once — in a separate file or as a function — and using it in many places instead of copying it. It lowers **cost**, increases **reliability** and keeps the site **consistent**.',
      simpleExplanation: {
        text: 'If the menu is copied into fifty pages, one change means fifty edits — and one will be missed. Put it in one file and include it everywhere: change it once, every page updates.',
        analogy: 'A rubber stamp: carve it once, stamp it on every page, and every copy is identical.',
      },
      visual: {
        type: 'network',
        title: 'One file, many pages',
        center: { label: 'header.php', note: 'written once' },
        nodes: ['home.php', 'courses.php', 'results.php', 'contact.php'],
      },
      explanation: [
        { heading: 'Why reuse code? (textbook reasons)' },
        {
          list: [
            '**Cost** — writing, testing and documenting code once is cheaper than doing it many times.',
            '**Reliability** — code already used and tested is less likely to contain bugs.',
            '**Consistency** — every page uses the same logic and looks the same, so users are not confused.',
          ],
        },
        { heading: 'How PHP lets you reuse code' },
        {
          list: [
            '**Files** — put shared HTML/PHP in a file and pull it in with `require()` or `include()`.',
            '**Functions** — wrap a task in a named function and call it whenever needed.',
            '**Built-in functions and libraries** — reuse code other people have already written and tested.',
          ],
        },
        { heading: 'Site templates' },
        'A common pattern is to split a page into `header.php`, the page body, and `footer.php`. Each page includes the shared parts, so the layout is defined in one place.',
        { tip: 'Do not copy-paste the same block twice. If you need it again, make it a file or a function.' },
      ],
      example: {
        title: 'Shared header and footer',
        files: [
          {
            name: 'home.php',
            code: `<?php require 'header.php'; ?>
<p>Welcome to the Department of Computer Science.</p>
<?php require 'footer.php'; ?>`,
          },
          {
            name: 'header.php',
            code: `<!DOCTYPE html>
<html><body>
<h1>CS Department</h1>
<nav>Home | Courses | Results</nav>`,
          },
          {
            name: 'footer.php',
            code: `<footer>&copy; <?php echo date('Y'); ?> CS Department</footer>
</body></html>`,
          },
        ],
        output: `CS Department
Home | Courses | Results
Welcome to the Department of Computer Science.
© 2026 CS Department`,
        explanation:
          'Every page needs only its own content. Changing the menu in `header.php` updates the whole site at once.',
      },
      keyPoints: [
        'Reuse = write once, use many times.',
        'Benefits: lower cost, higher reliability, consistency.',
        'Reuse files with `require()`/`include()`; reuse logic with functions.',
        'Header/footer templates are the classic example.',
      ],
      importantTerms: [
        { term: 'Code reuse', meaning: 'Using existing code again rather than rewriting it.' },
        { term: 'Template', meaning: 'Shared page parts (header, footer) included into every page.' },
        { term: 'Consistency', meaning: 'Every page behaves and looks the same.' },
      ],
      examPoints: [
        'Give the three reasons: cost, reliability, consistency.',
        'Name the two mechanisms: included files and functions.',
        'Sketch a header/footer template example.',
      ],
      questions: [
        {
          prompt: 'Why is code reuse important? How does PHP support it?',
          plan: ANSWER_PLAN(
            'Writing code once and using it many times',
            'One header.php feeding many pages',
            'Cost, reliability, consistency; files and functions',
            'home.php with shared header and footer',
            'Change once, update everywhere',
          ),
        },
      ],
      keywords: ['code reuse', 'cost', 'reliability', 'consistency', 'require()', 'include()', 'functions', 'template'],
      remember: [
        { prompt: 'Name the three benefits of reusing code.', answer: 'Lower cost, higher reliability, better consistency.' },
        { prompt: 'Two ways PHP reuses code?', answer: 'Including files and calling functions.' },
      ],
    },

    // ------------------------------------------------------------------
    'using-require-and-include': {
      difficulty: 'medium',
      intro: 'Two statements, almost identical — the difference shows up only when a file is missing.',
      definition:
        '`require()` and `include()` insert the contents of another file into the current script at that point. If the file cannot be found, `require()` stops the script with a **fatal error**, while `include()` gives a **warning** and continues.',
      simpleExplanation: {
        text: 'Both pull another file in, as if you had pasted its code there. Use `require` for files the page cannot work without (database connection), and `include` for optional parts (an advert box).',
        analogy: '`require` is your ID card — no entry without it. `include` is a guest pass — nice to have, but the event goes on without it.',
      },
      visual: {
        type: 'comparison',
        title: 'require vs include',
        items: [
          {
            title: 'require()',
            tone: 'accent',
            points: ['Missing file — fatal error', 'Script stops', 'Use for essential files (config, db)'],
          },
          {
            title: 'include()',
            tone: 'muted',
            points: ['Missing file — warning', 'Script continues', 'Use for optional parts'],
          },
        ],
      },
      explanation: [
        { heading: 'Syntax' },
        {
          code: `require 'db.php';        // brackets are optional
include('sidebar.php');`,
        },
        'The included file is treated as **PHP** from its first line only if it starts with `<?php`; otherwise its contents are output as HTML.',
        { heading: 'The _once versions' },
        '`require_once()` and `include_once()` check whether the file was already included and skip it the second time. Use them for files that define functions or classes, because declaring the same function twice is a fatal error.',
        {
          table: {
            columns: ['Statement', 'File missing', 'Included twice?'],
            rows: [
              ['`require`', 'Fatal error, stops', 'Yes'],
              ['`include`', 'Warning, continues', 'Yes'],
              ['`require_once`', 'Fatal error, stops', 'No — only once'],
              ['`include_once`', 'Warning, continues', 'No — only once'],
            ],
          },
        },
        { heading: 'Variables are shared' },
        'Code in an included file runs in the same scope as the line that included it, so variables defined in `config.php` are available in the main page afterwards.',
        { heading: 'Including on every page automatically' },
        'The `php.ini` settings `auto_prepend_file` and `auto_append_file` include a header and footer in every script without writing `require` in each one.',
        { tip: 'The file extension does not matter to `require`, but name included files `.php` so the server never sends their source code as plain text.' },
      ],
      example: {
        title: 'Database settings in one file',
        files: [
          {
            name: 'index.php',
            code: `<?php
require_once 'config.php';      // essential
include 'banner.php';           // optional (missing)

echo "Connected to $dbname as $dbuser";
?>`,
          },
          {
            name: 'config.php',
            code: `<?php
$dbhost = 'localhost';
$dbuser = 'webuser';
$dbname = 'college';
?>`,
          },
        ],
        output: `Warning: include(banner.php): Failed to open stream: No such file or directory
Connected to college as webuser`,
        explanation:
          'The missing `banner.php` only causes a warning, so the page continues. Had `config.php` been missing, `require_once` would have stopped the script.',
      },
      keyPoints: [
        'Both insert another file at that point in the script.',
        '`require` → fatal error if missing; `include` → warning only.',
        '`_once` versions include a file at most one time.',
        'Included code shares the variables of the including scope.',
        '`auto_prepend_file` / `auto_append_file` include files on every page.',
      ],
      importantTerms: [
        { term: 'Fatal error', meaning: 'An error that stops the script immediately.' },
        { term: 'Warning', meaning: 'A non-fatal message; the script keeps running.' },
        { term: '`require_once()`', meaning: 'Like require, but skips a file already included.' },
      ],
      examPoints: [
        'State the single key difference: fatal error vs warning.',
        'Draw the four-row table including `_once` versions.',
        'Explain when to use each one.',
        'Give a config-file example.',
      ],
      questions: [
        {
          prompt: 'Differentiate between require() and include() in PHP with an example.',
          plan: ANSWER_PLAN(
            'Statements that insert another file into the script',
            'require vs include comparison',
            'Missing-file behaviour, _once versions, shared scope, php.ini auto files',
            'index.php with config.php and a missing banner',
            'require for essential files; include for optional ones',
          ),
        },
      ],
      keywords: ['require()', 'include()', 'require_once()', 'include_once()', 'fatal error', 'warning', 'auto_prepend_file'],
      remember: [
        { prompt: 'Which one stops the script if the file is missing?', answer: '`require()`' },
        { prompt: 'Why use `require_once` for a functions file?', answer: 'Declaring the same function twice is a fatal error.' },
      ],
    },

    // ------------------------------------------------------------------
    functions: {
      difficulty: 'easy',
      intro: 'You have already used dozens of functions — `date()`, `count()`, `strlen()`. Now look at how calling a function works.',
      definition:
        'A function is a named, self-contained block of code that performs one task. You **call** it by name, pass it **arguments**, and it may **return** a value. PHP has thousands of built-in functions and lets you define your own.',
      simpleExplanation: {
        text: 'A function is a machine with a name: put values in (arguments), it does its job, and it hands back a result (the return value). You do not need to know what is inside to use it.',
        analogy: 'A calculator button: press `√` with 16 and you get 4 — you never see the working.',
      },
      visual: {
        type: 'flow',
        title: 'Calling a function',
        steps: [
          { label: "strlen('Priya')", note: 'call with an argument' },
          { label: 'Function body runs', note: 'counts the characters' },
          { label: 'return 5', note: 'value sent back' },
          { label: '$len = 5', note: 'result stored' },
        ],
      },
      explanation: [
        { heading: 'Calling a function' },
        { code: `$len = strlen('Priya');           // one argument
$text = str_pad('7', 3, '0', STR_PAD_LEFT);  // several arguments → '007'` },
        'Write the name, then brackets containing the arguments separated by commas. Even a function with no arguments needs empty brackets: `phpinfo();`.',
        { heading: 'The prototype' },
        'The PHP manual describes each function with a **prototype** showing its return type, name and parameters, e.g. `int strlen(string $string)`. Parameters in square brackets are optional.',
        { heading: 'Rules to remember' },
        {
          list: [
            'Function names are **not case-sensitive**: `STRLEN()` works, but write them in lower case.',
            'Calling a function that does not exist gives a fatal error: *Call to undefined function*.',
            'A function can return any type: number, string, array, boolean or nothing (`null`).',
          ],
        },
        { heading: 'Built-in vs user-defined' },
        {
          table: {
            columns: ['', 'Built-in', 'User-defined'],
            rows: [
              ['Written by', 'PHP developers', 'You'],
              ['Examples', '`count()`, `date()`, `explode()`', '`calculateGrade()`, `showMenu()`'],
              ['Available', 'Always (or via an extension)', 'After you define it'],
            ],
          },
        },
      ],
      example: {
        title: 'Using a few built-in functions together',
        code: `<?php
$marks = [72, 95, 60, 88];

echo 'Count: ' . count($marks) . '<br>';
echo 'Highest: ' . max($marks) . '<br>';
echo 'Average: ' . round(array_sum($marks) / count($marks), 1);
?>`,
        output: `Count: 4
Highest: 95
Average: 78.8`,
        explanation:
          'Each function call is replaced by its return value. The result of one function (`array_sum`) is used as an argument to another (`round`).',
      },
      keyPoints: [
        'A function is a named block that performs one task.',
        'Call with `name(arguments)`; it may return a value.',
        'Function names are case-insensitive.',
        'Calling an undefined function is a fatal error.',
        'PHP has built-in functions and you can define your own.',
      ],
      importantTerms: [
        { term: 'Call', meaning: 'Running a function by writing its name with brackets.' },
        { term: 'Argument', meaning: 'A value passed in the brackets of a call.' },
        { term: 'Return value', meaning: 'The value a function sends back to the caller.' },
        { term: 'Prototype', meaning: 'A description of a function: return type, name, parameters.' },
      ],
      examPoints: [
        'Define function, call, argument and return value.',
        'Explain the prototype notation.',
        'State case-insensitivity and the undefined-function error.',
        'Compare built-in and user-defined functions.',
      ],
      questions: [
        {
          prompt: 'What is a function? Explain how functions are called in PHP.',
          plan: ANSWER_PLAN(
            'Named block of code performing one task',
            'call → body runs → return → result stored',
            'Arguments, return values, prototype, case-insensitive names',
            'count/max/round on an array of marks',
            'Built-in vs user-defined',
          ),
        },
      ],
      keywords: ['function', 'call', 'argument', 'return value', 'prototype', 'built-in', 'user-defined', 'case-insensitive'],
      remember: [
        { prompt: 'Are PHP function names case-sensitive?', answer: 'No.' },
        { prompt: 'What happens when you call a function that does not exist?', answer: 'Fatal error: Call to undefined function.' },
      ],
    },

    // ------------------------------------------------------------------
    'defining-own-functions': {
      difficulty: 'easy',
      intro: 'When no built-in function does exactly what you need, you write your own.',
      definition:
        'Defining your own function means using the `function` keyword to create a new, named block of code that you can call anywhere in your script, just like a built-in function.',
      simpleExplanation: {
        text: 'Write `function`, a name, brackets for inputs, and the code in curly braces. From then on, calling that name runs the code.',
        analogy: 'Writing your own recipe card: name it once (“Masala Tea”), then anyone can say the name instead of repeating every step.',
      },
      visual: {
        type: 'code-flow',
        title: 'Define once, call many times',
        input: {
          label: 'Definition + calls',
          code: `function greet($name) {
    echo "Hello, $name!<br>";
}
greet('Arun');
greet('Priya');`,
        },
        process: 'Each call runs the body with a new $name',
        output: { label: 'Output', code: `Hello, Arun!
Hello, Priya!` },
      },
      explanation: [
        { heading: 'Why write your own?' },
        {
          list: [
            'To avoid repeating the same steps in many places.',
            'To give a meaningful name to a task: `calculateGrade()` explains itself.',
            'To test and fix logic in one place.',
          ],
        },
        { heading: 'Where you can define it' },
        'A function can be defined before or after the line that calls it (PHP reads the whole file first). Functions defined **conditionally** — inside an `if` — exist only after that code has run.',
        { heading: 'Naming rules' },
        {
          list: [
            'Must start with a letter or underscore, followed by letters, digits or underscores.',
            'Cannot have the same name as an existing function — PHP does not allow **overloading** a name.',
            'Names are case-insensitive, so `Total()` and `total()` are the same function.',
          ],
        },
        { trap: 'Defining a function with the name of a built-in (e.g. `count`) causes a fatal error: *Cannot redeclare*.' },
      ],
      example: {
        title: 'A grade calculator',
        code: `<?php
function grade($marks) {
    if ($marks >= 90) return 'O';
    if ($marks >= 75) return 'A';
    if ($marks >= 60) return 'B';
    return 'C';
}

echo 'Arun: '    . grade(88) . '<br>';
echo 'Priya: '   . grade(92) . '<br>';
echo 'Karthik: ' . grade(58);
?>`,
        output: `Arun: A
Priya: O
Karthik: C`,
        explanation:
          'The grading logic is written once. Each call passes a different mark, and `return` sends back the matching grade immediately.',
      },
      keyPoints: [
        'Define with `function name(params) { ... }`.',
        'Call it like any built-in function.',
        'Can be defined before or after the call (unless conditional).',
        'Names follow identifier rules and must be unique.',
      ],
      importantTerms: [
        { term: 'User-defined function', meaning: 'A function you write with the `function` keyword.' },
        { term: 'Function definition', meaning: 'The code that creates the function.' },
        { term: 'Redeclare error', meaning: 'Fatal error from defining a name that already exists.' },
      ],
      examPoints: [
        'Explain the reasons for user-defined functions.',
        'Write the definition syntax and a call.',
        'State the naming rules and the no-overloading rule.',
        'Give a complete example with output.',
      ],
      questions: [
        {
          prompt: 'How do you define and call your own functions in PHP? Give an example.',
          plan: ANSWER_PLAN(
            'Creating a named block with the function keyword',
            'Definition → several calls → outputs',
            'Why define functions, where to define, naming rules, no overloading',
            'grade() function called three times',
            'Unique, case-insensitive names',
          ),
        },
      ],
      keywords: ['function keyword', 'user-defined', 'definition', 'call', 'naming rules', 'no overloading', 'redeclare'],
      remember: [
        { prompt: 'Can you call a function before its definition in the file?', answer: 'Yes, unless it is defined conditionally.' },
        { prompt: 'Does PHP allow two functions with the same name?', answer: 'No — it is a fatal error.' },
      ],
    },

    // ------------------------------------------------------------------
    'basic-function-structure': {
      difficulty: 'easy',
      intro: 'Every function has the same four parts. Learn the shape once and you can read any function.',
      definition:
        'The basic structure of a PHP function is the keyword `function`, the function **name**, a **parameter list** in brackets, and a **body** in curly braces that may end with a `return` statement.',
      simpleExplanation: {
        text: 'Read a function header left to right: the word `function`, what it is called, what it needs, and then — between `{` and `}` — what it does and what it gives back.',
        analogy: 'A form with fixed boxes: title, inputs, working, answer. Every function fills the same boxes.',
      },
      visual: {
        type: 'boxes',
        title: 'Parts of a function',
        items: [
          { label: 'keyword', value: 'function', tag: 'starts it' },
          { label: 'name', value: 'area', tag: 'how to call it' },
          { label: 'parameters', value: '($l, $w)', tag: 'inputs' },
          { label: 'body', value: '{ ... }', tag: 'the work' },
          { label: 'return', value: 'return $l * $w;', tag: 'output' },
        ],
      },
      explanation: [
        { heading: 'The template' },
        {
          code: `function functionName($param1, $param2) {
    // statements
    return $result;    // optional
}`,
        },
        { heading: 'Each part' },
        {
          list: [
            '**`function`** — keyword that begins a definition.',
            '**Name** — follows identifier rules; choose a verb such as `calculateTotal`.',
            '**Parameters** — variables that receive the arguments; may be empty `()`.',
            '**Body** — statements between `{` and `}`; it can contain any PHP code, even HTML blocks.',
            '**`return`** — ends the function and sends a value back. Without it, the function returns `null`.',
          ],
        },
        { heading: 'Returning early' },
        '`return` can appear more than once; the first one reached stops the function. This is useful for checking bad input at the top.',
        { heading: 'Optional type declarations' },
        'Modern PHP lets you declare parameter and return types: `function area(float $l, float $w): float`. They are optional in this course but make errors easier to find.',
        { heading: 'Variable scope' },
        'Variables created inside a function are **local** — they disappear when the function ends and cannot be seen outside. To use a global variable inside, declare it with `global $x;` — but passing it as a parameter is cleaner.',
      ],
      example: {
        title: 'Area of a classroom',
        code: `<?php
function area($length, $width) {
    if ($length <= 0 || $width <= 0) {
        return 0;                 // early return for bad input
    }
    return $length * $width;
}

echo 'Room 101: ' . area(8, 6) . ' sq.m<br>';
echo 'Bad input: ' . area(-2, 6) . ' sq.m';
?>`,
        output: `Room 101: 48 sq.m
Bad input: 0 sq.m`,
        explanation:
          'The header names the function and its two parameters. The first `return` handles bad input; otherwise the second returns the product.',
      },
      keyPoints: [
        'Structure: `function` + name + `(parameters)` + `{ body }`.',
        '`return` ends the function and sends back a value.',
        'No `return` → the function returns `null`.',
        'Variables inside a function are local.',
      ],
      importantTerms: [
        { term: 'Function header', meaning: 'The first line: keyword, name and parameter list.' },
        { term: 'Function body', meaning: 'The statements inside the curly braces.' },
        { term: 'Local variable', meaning: 'A variable that exists only inside its function.' },
        { term: '`global`', meaning: 'Keyword that lets a function use a variable from global scope.' },
      ],
      examPoints: [
        'Write the general template and label each part.',
        'Explain `return`, early return and the default `null`.',
        'Mention local scope and the `global` keyword.',
      ],
      questions: [
        {
          prompt: 'Explain the basic structure of a user-defined function in PHP.',
          plan: ANSWER_PLAN(
            'function keyword, name, parameter list, body, optional return',
            'Labelled parts of a function',
            'Each part; return and early return; local scope',
            'area() function with two calls',
            'No return gives null; variables are local',
          ),
        },
      ],
      keywords: ['function', 'name', 'parameter list', 'body', 'return', 'local scope', 'global'],
      remember: [
        { prompt: 'What does a function return if it has no `return` statement?', answer: '`null`' },
        { prompt: 'Can code outside a function see its local variables?', answer: 'No.' },
      ],
    },

    // ------------------------------------------------------------------
    parameters: {
      difficulty: 'medium',
      intro: 'Parameters make one function work for many inputs — and default values make some of those inputs optional.',
      definition:
        'Parameters are the variables listed in a function definition that receive values (arguments) when the function is called. PHP supports **required** parameters, **optional** parameters with default values, and a **variable number** of arguments.',
      simpleExplanation: {
        text: 'The definition says what it needs: `function fee($amount, $discount = 0)`. The call supplies values in the same order. If a parameter has a default, the caller may leave it out.',
        analogy: 'Ordering coffee: size is required; sugar defaults to “one spoon” unless you say otherwise.',
      },
      visual: {
        type: 'flow',
        title: 'Arguments fill parameters in order',
        steps: [
          { label: 'fee(5000, 10)', note: 'the call' },
          { label: '$amount = 5000', note: '1st argument → 1st parameter' },
          { label: '$discount = 10', note: '2nd → 2nd' },
          { label: 'return 4500', note: 'result' },
        ],
      },
      explanation: [
        { heading: 'Parameter vs argument' },
        '**Parameter** — the variable in the definition. **Argument** — the actual value in the call. They are matched by **position**.',
        { heading: 'Default (optional) parameters' },
        {
          code: `function fee($amount, $discount = 0) {
    return $amount - ($amount * $discount / 100);
}
echo fee(5000);      // 5000  — discount defaults to 0
echo fee(5000, 10);  // 4500`,
        },
        { trap: 'Optional parameters must come **after** required ones. In `function f($a = 1, $b)` the default can never be used, and PHP 8 reports it as deprecated.' },
        { heading: 'Variable number of arguments' },
        'Sometimes the number of inputs is not known in advance. Two ways:',
        {
          code: `// Modern: the ... (splat) operator collects extras into an array
function total(...$nums) {
    return array_sum($nums);
}
echo total(10, 20, 30);   // 60

// Textbook style: func_num_args() and func_get_args()
function showAll() {
    echo func_num_args() . ' args: ' . implode(', ', func_get_args());
}`,
        },
        { heading: 'Too few or too many?' },
        {
          list: [
            'Too **few** arguments for required parameters → `ArgumentCountError` (fatal) in PHP 8.',
            'Too **many** arguments → the extras are ignored unless collected with `...` or `func_get_args()`.',
          ],
        },
      ],
      example: {
        title: 'Optional discount and any number of marks',
        code: `<?php
function fee($amount, $discount = 0) {
    return $amount - $amount * $discount / 100;
}
function average(...$marks) {
    return array_sum($marks) / count($marks);
}

echo fee(5000) . '<br>';
echo fee(5000, 10) . '<br>';
echo average(80, 90, 70) . '<br>';
echo average(60, 100);
?>`,
        output: `5000
4500
80
80`,
        explanation:
          '`fee()` works with or without the second argument. `average()` accepts three marks in one call and two in the next — `...$marks` gathers them all into an array.',
      },
      keyPoints: [
        'Parameters are variables in the definition; arguments are values in the call.',
        'Arguments are matched to parameters by position.',
        'Default values make a parameter optional: `$x = 0`.',
        'Put optional parameters after required ones.',
        '`...$args` or `func_get_args()` accept any number of arguments.',
      ],
      importantTerms: [
        { term: 'Parameter', meaning: 'Variable in a function definition that receives a value.' },
        { term: 'Argument', meaning: 'The actual value passed in a call.' },
        { term: 'Default value', meaning: 'Value used when the caller omits that argument.' },
        { term: 'Variadic function', meaning: 'A function that accepts a variable number of arguments.' },
      ],
      examPoints: [
        'Differentiate parameter and argument.',
        'Show a default parameter with two calls.',
        'Show `...` and `func_get_args()` for variable arguments.',
        'State what happens with too few / too many arguments.',
      ],
      questions: [
        {
          prompt: 'Explain function parameters in PHP, including default values and variable-length argument lists.',
          plan: ANSWER_PLAN(
            'Variables in the definition that receive argument values',
            'Call → arguments fill parameters by position → return',
            'Parameter vs argument; defaults; ordering rule; ... and func_get_args()',
            'fee() with optional discount and average(...$marks)',
            'Optional parameters go last',
          ),
        },
      ],
      keywords: ['parameter', 'argument', 'default value', 'optional parameter', '...$args', 'func_get_args()', 'func_num_args()', 'variadic'],
      remember: [
        { prompt: 'Where must optional parameters go?', answer: 'After all required parameters.' },
        { prompt: 'Which operator collects extra arguments into an array?', answer: 'The `...` (splat) operator.' },
      ],
    },

    // ------------------------------------------------------------------
    'passing-by-reference': {
      difficulty: 'hard',
      intro: 'Sometimes a function must change the caller’s own variable, not a copy. That is what a reference is for.',
      definition:
        'Passing by reference means the function receives a **reference** to the original variable instead of a copy, so any change made inside the function also changes the caller’s variable. It is written with an ampersand: `function f(&$x)`.',
      simpleExplanation: {
        text: 'Normally a function gets a photocopy of your value. With `&`, it gets the **original** — whatever it writes stays written after the function ends.',
        analogy: 'Giving a friend your actual notebook (reference) instead of a photocopy (value). If they write in it, your notebook changes.',
        sketch: {
          type: 'boxes',
          items: [
            { label: '$marks (caller)', value: '85', tag: 'one box' },
            { label: '&$m (inside function)', value: '→ same box', tag: 'alias' },
          ],
        },
      },
      visual: {
        type: 'process',
        title: 'Adding grace marks by reference',
        steps: [
          { label: '$marks = 85', detail: 'caller’s variable' },
          { label: 'addGrace($marks)', detail: '&$m refers to $marks' },
          { label: '$m += 5', detail: 'changes the shared value' },
          { label: '$marks is now 90', detail: 'change survives the call' },
        ],
      },
      explanation: [
        { heading: 'Syntax' },
        {
          code: `function addGrace(&$m) {   // & in the definition
    $m += 5;
}
$marks = 85;
addGrace($marks);          // no & in the call
echo $marks;               // 90`,
        },
        'The `&` goes **only in the function definition**. Writing `&` in the call (call-time pass-by-reference) was removed in PHP 5.4.',
        { heading: 'When to use it' },
        {
          list: [
            'When the function must update the caller’s variable — e.g. increment a counter.',
            'When a function needs to “return” more than one result.',
            'Many built-ins work this way: `sort($a)` reorders your array because it takes it by reference.',
          ],
        },
        { heading: 'Rules' },
        {
          list: [
            'Only a **variable** can be passed by reference — `addGrace(85)` is an error.',
            'References also work in `foreach`: `foreach ($a as &$v)` lets you change elements in place. `unset($v)` afterwards to break the link.',
          ],
        },
        { trap: 'Overusing references makes code hard to follow — a value can change “invisibly”. Prefer returning a value unless you really need to modify the original.' },
      ],
      example: {
        title: 'Swap two values',
        code: `<?php
function swap(&$a, &$b) {
    $temp = $a;
    $a = $b;
    $b = $temp;
}

$x = 'PHP';
$y = 'MySQL';
swap($x, $y);
echo "x = $x, y = $y";
?>`,
        output: 'x = MySQL, y = PHP',
        explanation:
          'Both parameters are references, so the swap inside the function changes the caller’s `$x` and `$y`. Without `&`, only local copies would be swapped and nothing would change outside.',
      },
      keyPoints: [
        'Pass by reference shares the original variable with the function.',
        'Mark the parameter with `&` in the definition only.',
        'Changes inside the function remain after it returns.',
        'Only variables (not literals) can be passed by reference.',
        'Built-ins such as `sort()` take arrays by reference.',
      ],
      importantTerms: [
        { term: 'Reference', meaning: 'Another name for the same variable storage.' },
        { term: '`&`', meaning: 'Marks a parameter (or foreach variable) as a reference.' },
        { term: 'Alias', meaning: 'Two names that point to one value.' },
      ],
      examPoints: [
        'Define with the `&` syntax.',
        'Show the swap example and its output.',
        'State that `&` is in the definition, not the call.',
        'Contrast with pass by value (copy).',
      ],
      questions: [
        {
          prompt: 'Explain pass by reference in PHP with a suitable example.',
          plan: ANSWER_PLAN(
            'Function receives a reference to the original variable, marked with &',
            'Caller variable and parameter pointing to one box',
            'Syntax, when to use, only variables, foreach by reference',
            'swap(&$a, &$b) with output',
            'Changes survive the call; use sparingly',
          ),
        },
      ],
      keywords: ['pass by reference', '&', 'reference', 'alias', 'swap', 'sort() by reference'],
      remember: [
        { prompt: 'Where is the `&` written?', answer: 'In the function definition, before the parameter.' },
        { prompt: 'Can you pass the literal 5 by reference?', answer: 'No, only a variable.' },
      ],
    },

    // ------------------------------------------------------------------
    'passing-by-value': {
      difficulty: 'medium',
      intro: 'PHP’s default: the function works on its own copy, so your variables are safe from accidental changes.',
      definition:
        'Passing by value means the function receives a **copy** of each argument. Changes made to the parameter inside the function do not affect the caller’s original variable. It is PHP’s default behaviour.',
      simpleExplanation: {
        text: 'The function gets a photocopy. It can scribble on the copy all it likes; your original stays exactly the same. To get a result out, the function must `return` it.',
        analogy: 'Handing a photocopy of your notes to a friend. Their highlighting does not appear on your notes.',
      },
      visual: {
        type: 'comparison',
        title: 'Value vs reference',
        items: [
          {
            title: 'By value (default)',
            tone: 'good',
            points: ['function f($x) — no &', 'Function gets a copy', 'Original never changes', 'Return the result to use it'],
          },
          {
            title: 'By reference',
            tone: 'accent',
            points: ['function f(&$x)', 'Function gets the original', 'Original changes', 'No return needed'],
          },
        ],
      },
      explanation: [
        { heading: 'The default behaviour' },
        {
          code: `function addGrace($m) {   // no &
    $m += 5;
    return $m;
}
$marks = 85;
$new = addGrace($marks);
echo $marks;   // 85 — unchanged
echo $new;     // 90 — returned copy`,
        },
        { heading: 'Why it is the default' },
        {
          list: [
            '**Safety** — a function cannot change your data by accident.',
            '**Predictability** — to see what changes, you only look at the return value.',
            '**Easier testing** — the same input always gives the same output.',
          ],
        },
        { heading: 'Arrays are copied too' },
        'Passing an array by value gives the function its own copy. PHP uses **copy-on-write** internally, so the copy is only made if the function actually modifies the array — passing large arrays by value is not slow.',
        { note: 'Objects behave differently: the function receives a copy of the object handle, so it can change the object’s properties. Objects are outside this unit.' },
        {
          table: {
            columns: ['', 'Pass by value', 'Pass by reference'],
            rows: [
              ['Syntax', '`function f($x)`', '`function f(&$x)`'],
              ['Function receives', 'A copy', 'The original'],
              ['Original after call', 'Unchanged', 'Changed if modified'],
              ['Getting results out', '`return`', 'Modify the parameter'],
              ['Can pass a literal', 'Yes', 'No'],
            ],
          },
        },
      ],
      example: {
        title: 'Same function, two ways',
        code: `<?php
function doubleValue($n)  { $n = $n * 2; }
function doubleRef(&$n)   { $n = $n * 2; }

$a = 10;
doubleValue($a);
echo "After by value: $a<br>";

$b = 10;
doubleRef($b);
echo "After by reference: $b";
?>`,
        output: `After by value: 10
After by reference: 20`,
        explanation:
          '`doubleValue()` doubled only its copy, so `$a` stays 10. `doubleRef()` doubled the original, so `$b` becomes 20.',
      },
      keyPoints: [
        'By value is the default: the function gets a copy.',
        'The caller’s variable never changes.',
        'Use `return` to send a result back.',
        'Arrays are passed by value too (copy-on-write).',
        'Literals and expressions can be passed by value.',
      ],
      importantTerms: [
        { term: 'Pass by value', meaning: 'The function receives a copy of the argument.' },
        { term: 'Copy-on-write', meaning: 'A copy is made only when the copied data is changed.' },
        { term: 'Side effect', meaning: 'A change a function makes outside its own scope.' },
      ],
      examPoints: [
        'Define and state it is the default.',
        'Show an example where the original stays unchanged.',
        'Draw the value vs reference comparison table.',
      ],
      questions: [
        {
          prompt: 'Differentiate pass by value and pass by reference with examples.',
          plan: ANSWER_PLAN(
            'By value: function gets a copy; by reference: gets the original (&)',
            'Value vs reference comparison',
            'Default behaviour, return values, copy-on-write, comparison table',
            'doubleValue() vs doubleRef() with outputs',
            'Value is safer; reference changes the caller’s variable',
          ),
        },
      ],
      keywords: ['pass by value', 'copy', 'default', 'return', 'copy-on-write', 'pass by reference'],
      remember: [
        { prompt: 'Which is PHP’s default: by value or by reference?', answer: 'By value.' },
        { prompt: 'After `f($a)` where f takes `$x` by value and changes it, has `$a` changed?', answer: 'No.' },
      ],
    },

    // ------------------------------------------------------------------
    'recursive-function': {
      difficulty: 'hard',
      intro: 'Some problems contain smaller copies of themselves. A function that calls itself solves them neatly.',
      definition:
        'A recursive function is a function that calls itself. Every recursive function needs a **base case** that stops the recursion and a **recursive case** that calls the function on a smaller version of the problem.',
      simpleExplanation: {
        text: '5! is 5 × 4!. And 4! is 4 × 3! … down to 1! = 1. The function keeps calling itself with a smaller number until it reaches the base case, then the answers multiply back up.',
        analogy: 'Russian nesting dolls: open a doll, find a smaller doll, repeat until the smallest doll — then put them back together.',
      },
      visual: {
        type: 'process',
        title: 'factorial(4) unwinding',
        steps: [
          { label: 'factorial(4) = 4 × factorial(3)', detail: 'recursive case' },
          { label: '= 4 × 3 × factorial(2)', detail: 'smaller problem' },
          { label: '= 4 × 3 × 2 × factorial(1)', detail: 'smaller again' },
          { label: '= 4 × 3 × 2 × 1', detail: 'base case: factorial(1) = 1' },
          { label: '= 24', detail: 'results multiply back up' },
        ],
      },
      explanation: [
        { heading: 'The two essential parts' },
        {
          list: [
            '**Base case** — a condition where the answer is known directly and no further call is made.',
            '**Recursive case** — the function calls itself with an input that moves towards the base case.',
          ],
        },
        {
          code: `function factorial($n) {
    if ($n <= 1) {
        return 1;                      // base case
    }
    return $n * factorial($n - 1);     // recursive case
}`,
        },
        { heading: 'How it runs: the call stack' },
        'Each call waits on the **call stack** until the call it made returns. When the base case returns 1, the waiting calls finish one by one in reverse order.',
        { heading: 'Recursion vs iteration' },
        {
          table: {
            columns: ['', 'Recursion', 'Iteration (loop)'],
            rows: [
              ['Repeats by', 'Calling itself', 'Looping'],
              ['Stops at', 'Base case', 'Loop condition false'],
              ['Code', 'Often shorter, clearer for tree-like data', 'Usually faster, less memory'],
              ['Risk', 'Stack overflow if no base case', 'Infinite loop'],
            ],
          },
        },
        { trap: 'Without a base case (or if the input never reaches it), the function calls itself forever until PHP runs out of memory.' },
        { tip: 'Recursion suits naturally nested data: folder trees, menu trees, or reversing a string.' },
      ],
      example: {
        title: 'Factorial and reversing a string',
        code: `<?php
function factorial($n) {
    if ($n <= 1) return 1;
    return $n * factorial($n - 1);
}

function reverseString($s) {
    if (strlen($s) <= 1) return $s;              // base case
    return reverseString(substr($s, 1)) . $s[0];  // recursive case
}

echo '5! = ' . factorial(5) . '<br>';
echo reverseString('MySQL');
?>`,
        output: `5! = 120
LQSyM`,
        explanation:
          '`factorial(5)` multiplies 5 × 4 × 3 × 2 × 1. `reverseString()` moves the first character to the end of the reversed remainder until one character is left.',
      },
      keyPoints: [
        'A recursive function calls itself.',
        'It must have a base case that stops the calls.',
        'Each recursive call must move closer to the base case.',
        'Calls wait on the call stack and return in reverse order.',
        'Loops are usually faster; recursion is clearer for nested problems.',
      ],
      importantTerms: [
        { term: 'Recursion', meaning: 'A function calling itself to solve a smaller instance of the problem.' },
        { term: 'Base case', meaning: 'The stopping condition with a direct answer.' },
        { term: 'Recursive case', meaning: 'The part that calls the function again with smaller input.' },
        { term: 'Call stack', meaning: 'Memory structure holding calls waiting to finish.' },
      ],
      examPoints: [
        'Define recursion and name base case and recursive case.',
        'Write the factorial function and trace `factorial(4)`.',
        'Compare recursion with iteration.',
        'State the danger of a missing base case.',
      ],
      questions: [
        {
          prompt: 'What is a recursive function? Write a PHP program to find the factorial of a number using recursion.',
          plan: ANSWER_PLAN(
            'A function that calls itself, with a base case and a recursive case',
            'Trace of factorial(4) unwinding to 24',
            'Base case, recursive case, call stack, recursion vs iteration',
            'factorial() program with output for 5',
            'Always reach the base case',
          ),
        },
      ],
      keywords: ['recursion', 'base case', 'recursive case', 'call stack', 'factorial', 'stack overflow', 'iteration'],
      remember: [
        { prompt: 'What stops a recursive function?', answer: 'The base case.' },
        { prompt: 'What is factorial(0) or factorial(1) in the example?', answer: '1' },
      ],
    },
  },
}
