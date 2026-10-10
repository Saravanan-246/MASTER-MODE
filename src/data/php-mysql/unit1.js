// PHP and MySQL — Unit I: Introduction to PHP.
// Reference implementation of the topic content model. Topic ids match the
// syllabus outline in ../subjects.js. Inline markup in text: `code`, **keyword**.

const ANSWER_PLAN = (definition, diagram, explanation, example, points) => [
  { label: 'Definition', hint: definition },
  { label: 'Diagram', hint: diagram },
  { label: 'Explanation', hint: explanation },
  { label: 'Example', hint: example },
  { label: 'Key points', hint: points },
]

export default {
  overview:
    'Unit I gets you writing real PHP: dropping code into an HTML page, reading what a user typed into a form, storing values in variables and constants, and calculating results with operators.',

  map: [
    { label: 'Meet PHP', topics: ['embedding-php-in-html', 'adding-dynamic-content'] },
    { label: 'Talk to forms', topics: ['accessing-form-variables'] },
    {
      label: 'Name & store values',
      topics: ['understanding-identifiers', 'examining-variable-types', 'declaring-and-using-constants'],
    },
    {
      label: 'Calculate',
      topics: ['operators', 'working-out-the-form', 'understanding-precedence-and-associativity'],
    },
    { label: 'Inspect values', topics: ['variable-handling-functions'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'embedding-php-in-html': {
      difficulty: 'easy',
      intro: 'Almost every PHP page in this course is an HTML page with small PHP “islands” inside it.',
      definition:
        'Embedding PHP in HTML means placing PHP code inside an HTML page between the tags `<?php` and `?>`. The web server runs that code and sends only its output to the browser.',
      simpleExplanation: {
        text: 'A PHP file is an ordinary HTML page with a few special zones. Anything between `<?php` and `?>` is an instruction for the **server**: “run this first”. The browser never sees the PHP — only what it printed.',
        analogy: 'Think of a form letter: the letter is HTML, the blanks are PHP. The server fills in the blanks before the letter is sent.',
      },
      visual: {
        type: 'code-flow',
        title: 'What happens to a .php file',
        input: {
          label: 'order.php — on the server',
          code: `<h1>Order Results</h1>
<?php
  echo '<p>Order processed.</p>';
?>`,
        },
        process: 'The PHP engine runs only the code between <?php and ?>',
        output: {
          label: 'What the browser receives',
          lang: 'html',
          code: `<h1>Order Results</h1>
<p>Order processed.</p>`,
        },
      },
      explanation: [
        { heading: 'PHP tags' },
        'PHP tags tell the server where PHP starts and stops. There are a few styles:',
        {
          list: [
            '`<?php ... ?>` — the **standard** (XML) style. It always works, so use this one.',
            '`<?= ... ?>` — the **short echo** tag. It prints a value and is always available.',
            '`<? ... ?>` — the **short** style. It only works if `short_open_tag` is switched on, so avoid it.',
          ],
        },
        { note: 'Older ASP-style tags (`<% %>`) and `<script language="php">` were removed in PHP 7.' },
        { heading: 'Statements' },
        'Each instruction is a **statement**, and every statement ends with a semicolon `;`. A missing semicolon is the most common beginner error.',
        'Whitespace (spaces, tabs, new lines) between statements is ignored by PHP, so use it freely to make code readable.',
        { heading: 'Comments' },
        {
          list: [
            '`// comment` — one line (C++ style)',
            '`# comment` — one line (shell style)',
            '`/* comment */` — several lines (C style)',
          ],
        },
        'Comments are skipped by the engine and never reach the browser.',
      ],
      example: {
        title: 'Mixing HTML and PHP',
        files: [
          {
            name: 'order.php',
            code: `<!DOCTYPE html>
<html>
<body>
  <h1>Campus Stationery</h1>
  <h2>Order Results</h2>
  <?php
    // This line runs on the server
    echo '<p>Order processed.</p>';
  ?>
</body>
</html>`,
          },
        ],
        output: `Campus Stationery
Order Results
Order processed.`,
        explanation:
          'The HTML is sent exactly as written. The PHP block runs on the server, and `echo` puts `<p>Order processed.</p>` where the block was.',
      },
      keyPoints: [
        'PHP code goes between `<?php` and `?>` inside a `.php` file.',
        'The server runs the PHP first; the browser receives only HTML.',
        'Every statement ends with a semicolon `;`.',
        'Comments: `//` or `#` for one line, `/* */` for several.',
      ],
      importantTerms: [
        { term: 'PHP tag', meaning: 'The `<?php ... ?>` markers that start and end PHP code.' },
        { term: 'echo', meaning: 'A language construct that outputs text into the page.' },
        { term: 'Statement', meaning: 'One instruction to PHP, ended by a semicolon.' },
        { term: 'Server-side', meaning: 'Runs on the web server before the page reaches the browser.' },
      ],
      examPoints: [
        'Define embedding and state that PHP is **server-side**.',
        'List the tag styles: `<?php ?>`, `<?= ?>`, `<? ?>`.',
        'Mention statements, semicolons, whitespace and the three comment styles.',
        'Draw the flow: .php file → PHP engine → HTML → browser.',
        'Finish with a small HTML page containing one `echo`.',
      ],
      questions: [
        {
          prompt: 'Explain how PHP is embedded in HTML with an example.',
          plan: ANSWER_PLAN(
            'PHP code placed inside HTML between <?php and ?>',
            '.php file → PHP engine → HTML output → browser',
            'Tag styles, statements and semicolons, whitespace, comments',
            'An HTML page with an echo statement, plus its output',
            'Server-side; the browser sees only HTML',
          ),
        },
      ],
      keywords: ['<?php ?>', 'server-side', 'echo', 'statement', 'semicolon', 'comments', 'short_open_tag'],
      remember: [
        { prompt: 'Where does PHP code run?', answer: 'On the web server, before the page is sent.' },
        { prompt: 'What does the browser receive from your PHP?', answer: 'Only its output (HTML), never the code.' },
        { prompt: 'Which tag style should you always use?', answer: '`<?php ... ?>`' },
      ],
    },

    // ------------------------------------------------------------------
    'adding-dynamic-content': {
      difficulty: 'easy',
      intro: 'This is the reason to use PHP at all: one file can show fresh content to every visitor.',
      definition:
        'Dynamic content is page content that PHP generates when the page is requested, so it can change from one visit — or one user — to the next.',
      simpleExplanation: {
        text: 'A plain HTML page shows exactly the same thing every time. A PHP page can **work something out first** — the current time, a name, a total — and print it into the page.',
        analogy: 'Static HTML is a printed poster. A PHP page is a whiteboard that gets rewritten for every visitor.',
      },
      visual: {
        type: 'comparison',
        title: 'Static page vs dynamic page',
        items: [
          {
            title: 'Static HTML',
            tone: 'muted',
            points: ['Written once and saved as a file', 'Every visitor sees the same page', 'Changing it means editing the file'],
          },
          {
            title: 'Dynamic PHP',
            tone: 'accent',
            points: ['Built on the server for each request', 'Can differ for each visit or user', 'Uses functions, variables and data'],
          },
        ],
      },
      explanation: [
        'To make a page dynamic, call a **function** and print its result. A function is ready-made code: you call it by name, pass **arguments** in brackets, and it **returns** a value.',
        { code: `echo '<p>Order processed at ' . date('H:i, jS F Y') . '</p>';` },
        '`date()` is a built-in function that returns the current date and time as text. Its argument is a **format string** — each letter stands for one part of the date:',
        {
          table: {
            columns: ['Letter', 'Means', 'Example'],
            rows: [
              ['`H`', 'Hour, 24-hour clock', '14'],
              ['`i`', 'Minutes with leading zero', '05'],
              ['`j`', 'Day of the month', '9'],
              ['`S`', 'English suffix for the day', 'th'],
              ['`F`', 'Full month name', 'October'],
              ['`Y`', 'Four-digit year', '2026'],
            ],
          },
        },
        { tip: "The time comes from the **server's** clock and time zone, not the visitor's computer." },
        'The dot `.` joins strings together. It is the string concatenation operator — more in Operators.',
      ],
      example: {
        title: 'Stamp the order with the time',
        code: `<?php
  echo '<p>Order processed at ';
  echo date('H:i, jS F Y');
  echo '</p>';
?>`,
        output: 'Order processed at 14:05, 9th October 2026',
        explanation:
          'Reload a minute later and the output changes, even though the file did not. That is dynamic content.',
      },
      keyPoints: [
        'Dynamic content is generated on the server at request time.',
        "Call a function by name with arguments in brackets: `date('Y')`.",
        "`date()` formats the server's current date and time using format letters.",
        'Join strings with the dot `.` operator.',
      ],
      importantTerms: [
        { term: 'Function', meaning: 'Named, reusable code that you call to do a job.' },
        { term: 'Argument', meaning: 'A value passed into a function inside its brackets.' },
        { term: 'Return value', meaning: 'The result a function hands back.' },
        { term: 'Concatenation', meaning: 'Joining strings with the `.` operator.' },
      ],
      examPoints: [
        'Contrast static HTML with dynamic PHP pages.',
        'Explain calling a function: name, arguments, return value.',
        'Show `date()` with its format letters and a sample output.',
      ],
      questions: [
        {
          prompt: 'What is dynamic content? How does PHP add it to a web page?',
          plan: ANSWER_PLAN(
            'Content generated at request time',
            'Static vs dynamic comparison',
            'Functions, arguments, return values; date() format letters',
            'echo date(...) with its output',
            "Uses the server's clock; changes on every request",
          ),
        },
      ],
      keywords: ['dynamic content', 'request time', 'function', 'argument', 'return value', 'date()', 'concatenation'],
      remember: [
        { prompt: "What does `date('Y')` return?", answer: 'The current year as four digits, e.g. 2026.' },
        { prompt: 'Whose clock does `date()` use?', answer: "The server's." },
        { prompt: 'Which operator joins two strings?', answer: 'The dot `.`' },
      ],
    },

    // ------------------------------------------------------------------
    'accessing-form-variables': {
      difficulty: 'medium',
      intro: 'Forms are how users talk to your script — orders, logins and searches all arrive this way.',
      definition:
        "Form variables are the values a user submits through an HTML form. PHP reads them from the superglobal arrays `$_POST`, `$_GET` or `$_REQUEST`, using each field's `name` as the key.",
      simpleExplanation: {
        text: 'Every form field has a **name**. When the form is submitted, the browser sends `name=value` pairs to your PHP file, and PHP puts them in a ready-made array. You take a value out using its field name.',
        analogy: 'The form is a parcel with labelled pockets. `$_POST` is the parcel when it arrives; the field name tells you which pocket to open.',
      },
      visual: {
        type: 'flow',
        title: 'From form field to PHP variable',
        steps: [
          { label: 'HTML form', note: '<input name="notebookqty">' },
          { label: 'User types 4', note: 'and clicks Submit' },
          { label: 'Browser sends', note: 'notebookqty=4' },
          { label: "$_POST['notebookqty']", note: 'PHP receives "4"' },
          { label: '$notebookqty', note: 'your own variable' },
        ],
      },
      explanation: [
        "The form's `action` attribute names the PHP file that receives the data. Its `method` decides how the data travels:",
        {
          list: [
            '`method="post"` — values travel inside the request body → read them with `$_POST`.',
            '`method="get"` — values are added to the URL (`?notebookqty=4`) → read them with `$_GET`.',
            '`$_REQUEST` holds GET, POST and cookie values together — convenient, but less clear.',
          ],
        },
        'These arrays are **superglobals**: built in, and available everywhere in your script.',
        { code: `$notebookqty = $_POST['notebookqty'];` },
        'Copy the value into a normal variable with a short name, then work with that.',
        {
          table: {
            columns: ['', 'GET', 'POST'],
            rows: [
              ['Where the data goes', 'In the URL', 'In the request body'],
              ['Visible in address bar', 'Yes', 'No'],
              ['Can be bookmarked', 'Yes', 'No'],
              ['Size', 'Limited by URL length', 'Suits larger data'],
              ['Read in PHP with', '`$_GET`', '`$_POST`'],
            ],
          },
        },
        { tip: 'Form values always arrive as **strings**. `"4"` only becomes the number 4 when you calculate with it or cast it.' },
        {
          more: [
            'Before printing anything a user typed, pass it through `htmlspecialchars()` so characters like `<` and `>` cannot inject HTML into your page.',
            "If a field might be missing, give a default with the null coalescing operator: `$qty = $_POST['penqty'] ?? 0;`",
          ],
          label: 'Two safety habits',
        },
      ],
      example: {
        title: 'An order form and the script that reads it',
        files: [
          {
            name: 'orderform.html',
            lang: 'html',
            code: `<form action="processorder.php" method="post">
  <label>Notebooks
    <input type="number" name="notebookqty">
  </label>
  <label>Pens
    <input type="number" name="penqty">
  </label>
  <button type="submit">Submit order</button>
</form>`,
          },
          {
            name: 'processorder.php',
            code: `<?php
  $notebookqty = $_POST['notebookqty'] ?? 0;
  $penqty = $_POST['penqty'] ?? 0;

  echo '<p>Your order is as follows:</p>';
  echo htmlspecialchars($notebookqty) . ' notebooks<br>';
  echo htmlspecialchars($penqty) . ' pens<br>';
?>`,
          },
        ],
        output: `Your order is as follows:
4 notebooks
10 pens`,
        explanation:
          'The `name` attributes (`notebookqty`, `penqty`) become the keys in `$_POST`. Rename a field in the form and you must rename it in the PHP too.',
      },
      keyPoints: [
        "The field's `name` is the key: `name=\"penqty\"` → `$_POST['penqty']`.",
        '`method="post"` → `$_POST`; `method="get"` → `$_GET`; `$_REQUEST` holds both.',
        'Superglobals are available anywhere in the script.',
        'Form values arrive as strings.',
        'Escape output with `htmlspecialchars()`.',
      ],
      importantTerms: [
        { term: 'Superglobal', meaning: 'A built-in array available in every part of a script, like `$_POST`.' },
        { term: 'action', meaning: 'Form attribute naming the script that receives the data.' },
        { term: 'method', meaning: 'Form attribute choosing GET or POST.' },
        { term: 'htmlspecialchars()', meaning: 'Converts `<`, `>`, `&` and quotes into safe HTML entities.' },
      ],
      examPoints: [
        'Show the form with `action` and `method`, then the PHP that reads it.',
        'Compare GET and POST in a small table.',
        'Name all three arrays: `$_POST`, `$_GET`, `$_REQUEST`.',
        'Mention escaping output with `htmlspecialchars()`.',
      ],
      questions: [
        {
          prompt: 'How are form variables accessed in PHP? Explain with an example.',
          plan: ANSWER_PLAN(
            'Values submitted by a form, read from superglobal arrays',
            'Form field → browser sends name=value → $_POST → variable',
            'action and method attributes; $_POST, $_GET, $_REQUEST; strings',
            'orderform.html + processorder.php',
            'name attribute is the key; escape output',
          ),
        },
        {
          prompt: 'Differentiate between the GET and POST methods.',
          plan: [
            { label: 'Definition', hint: 'Two ways a form sends data to the server' },
            { label: 'Table', hint: 'Where data goes, visibility, bookmarking, size, PHP array' },
            { label: 'Example', hint: 'The same form with method="get" and method="post"' },
            { label: 'Key points', hint: 'GET for searches and links; POST for orders and logins' },
          ],
        },
      ],
      keywords: ['$_POST', '$_GET', '$_REQUEST', 'superglobal', 'name attribute', 'action', 'method', 'htmlspecialchars()'],
      remember: [
        { prompt: 'A field has `name="email"` and the form uses POST. How do you read it?', answer: "`$_POST['email']`" },
        { prompt: 'Which method shows the data in the URL?', answer: 'GET' },
        { prompt: 'What type do form values arrive as?', answer: 'Strings' },
      ],
    },

    // ------------------------------------------------------------------
    'understanding-identifiers': {
      difficulty: 'easy',
      intro: 'Every value you store needs a name. Wrong names cause errors; vague names cause bugs.',
      definition: 'Identifiers are the names given to variables, functions, classes and constants in PHP.',
      simpleExplanation: {
        text: 'An identifier is simply a **name you choose**. PHP has a few spelling rules for names, and one surprise: capital letters matter for variables.',
        analogy: 'Like contacts in your phone — to PHP, `$Mom` and `$mom` would be two different contacts.',
      },
      visual: {
        type: 'comparison',
        title: 'Which names does PHP accept?',
        items: [
          { title: 'Valid', tone: 'good', points: ['$total', '$_count', '$item2', '$notebookQty'] },
          {
            title: 'Invalid',
            tone: 'bad',
            points: ['$2item — starts with a digit', '$total-amount — hyphen', '$my total — space'],
          },
        ],
      },
      explanation: [
        { heading: 'The rules' },
        {
          list: [
            'Identifiers can be **any length**.',
            'They may contain **letters, digits and underscores** `_`.',
            'They **cannot begin with a digit**.',
            'Variable names are **case-sensitive**: `$qty` and `$Qty` are different variables.',
            'Function names are **not** case-sensitive: `date()` and `DATE()` are the same function.',
          ],
          ordered: true,
        },
        'A variable is always written with a leading `$`. The `$` is not part of the name — it just tells PHP that a variable name follows.',
        'A variable may share its name with a function (for example `$date` and `date()`). It is allowed, but confusing, so avoid it.',
        { tip: 'Choose names that say what they hold: `$totalqty` beats `$t`.' },
      ],
      example: {
        title: 'Case matters — but not for functions',
        code: `<?php
  $qty = 5;
  $Qty = 9;         // a different variable!
  echo $qty;        // 5
  echo '<br>';
  echo DATE('Y');   // function names ignore case
?>`,
        output: `5
2026`,
        explanation:
          '`$qty` and `$Qty` are two separate boxes. `DATE()` still calls `date()` because function names are not case-sensitive.',
      },
      keyPoints: [
        'Identifiers name variables, functions, classes and constants.',
        'Letters, digits and underscores only — never start with a digit.',
        'Variables are case-sensitive; functions are not.',
        'Variables are written with a leading `$`.',
      ],
      importantTerms: [
        { term: 'Identifier', meaning: 'A name for a variable, function, class or constant.' },
        { term: 'Case-sensitive', meaning: 'Upper- and lower-case letters count as different.' },
      ],
      examPoints: [
        'List every identifier rule.',
        'Give valid and invalid names, each with a reason.',
        'Stress case-sensitivity: variables yes, functions no.',
      ],
      questions: [
        {
          prompt: 'What are identifiers? State the rules for naming identifiers in PHP.',
          plan: ANSWER_PLAN(
            'Names for variables, functions, classes and constants',
            'Valid vs invalid names',
            'Length, allowed characters, no leading digit, case rules, $ prefix',
            '$qty vs $Qty; date() vs DATE()',
            'Variables case-sensitive; functions not',
          ),
        },
      ],
      keywords: ['identifier', 'letters', 'digits', 'underscore', 'case-sensitive', '$ prefix'],
      remember: [
        { prompt: 'Is `$2nd` a valid variable name?', answer: 'No — it starts with a digit.' },
        { prompt: 'Are `$Name` and `$name` the same variable?', answer: 'No. Variable names are case-sensitive.' },
        { prompt: 'Are function names case-sensitive?', answer: 'No.' },
      ],
    },

    // ------------------------------------------------------------------
    'examining-variable-types': {
      difficulty: 'medium',
      intro: 'The type decides what you can do with a value: add it, join it, or loop over it.',
      definition:
        "A variable's type is the kind of data it holds — integer, float, string, boolean, array or object. PHP decides the type automatically from the value assigned.",
      simpleExplanation: {
        text: 'A variable is a **labelled box** holding one value. The **type** is what kind of thing is inside. PHP looks at the value and works out the type by itself.',
        analogy: 'Think of a variable as a labelled box:',
        sketch: {
          type: 'boxes',
          items: [
            { label: '$age', value: '21', tag: 'integer' },
            { label: '$price', value: '9.99', tag: 'float' },
            { label: '$name', value: '"Asha"', tag: 'string' },
            { label: '$paid', value: 'true', tag: 'boolean' },
          ],
        },
      },
      visual: {
        type: 'hierarchy',
        title: "PHP's data types",
        root: 'Data types',
        children: [
          { label: 'Scalar', note: 'one value', children: ['Integer', 'Float (double)', 'String', 'Boolean'] },
          { label: 'Compound', note: 'many values', children: ['Array', 'Object'] },
          { label: 'Special', note: 'no ordinary value', children: ['NULL', 'Resource', 'Callable'] },
        ],
      },
      explanation: [
        {
          table: {
            columns: ['Type', 'Holds', 'Example'],
            rows: [
              ['Integer', 'Whole numbers', '`42`, `-7`'],
              ['Float (double)', 'Real numbers', '`3.14`, `9.99`'],
              ['String', 'Text', "`'Hello'`"],
              ['Boolean', 'True or false', '`true`'],
              ['Array', 'Many values under one name', "`['pen', 'book']`"],
              ['Object', 'An instance of a class', '`new DateTime()`'],
            ],
          },
        },
        'Three special types: **NULL** (a variable with no value), **resource** (a link to something outside PHP, such as an open file or database connection) and **callable** (something that can be called like a function).',
        { heading: 'Type strength' },
        'PHP is **weakly (dynamically) typed**. You never declare a type; the value you assign decides it, and it can change later:',
        {
          code: `$totalqty = 0;           // integer
$totalamount = 0.00;     // float
$totalamount = 'Hello';  // now a string`,
        },
        { heading: 'Type casting' },
        'Force a type by writing it in brackets before a value:',
        { code: `$totalamount = (float)$totalqty;` },
        'Available casts: `(int)`, `(float)`, `(string)`, `(bool)`, `(array)`, `(object)`.',
        {
          more: [
            "A **variable variable** uses one variable's value as another variable's name:",
            {
              code: `$varname = 'notebookqty';
$$varname = 5;   // same as $notebookqty = 5;`,
            },
          ],
          label: 'Variable variables',
        },
      ],
      example: {
        title: 'A form string meets a float',
        code: `<?php
  $qty = '4';          // string, as it arrives from a form
  $price = 60.5;       // float
  $total = (int)$qty * $price;
  var_dump($qty);
  var_dump($total);
?>`,
        output: `string(1) "4"
float(242)`,
        explanation:
          'The quantity arrives as the string `"4"`. Cast to an integer and multiplied by a float, the result is a float. `var_dump()` prints both type and value.',
      },
      keyPoints: [
        'Basic types: integer, float, string, boolean, array, object.',
        'Special types: NULL, resource, callable.',
        'The assigned value sets the type (weak, dynamic typing).',
        'Cast with `(int)`, `(float)`, `(string)`, `(bool)`, `(array)`, `(object)`.',
        '`$$name` creates a variable variable.',
      ],
      importantTerms: [
        { term: 'Data type', meaning: 'The kind of value a variable holds.' },
        { term: 'Weak typing', meaning: 'Types are decided by the value, not declared by you.' },
        { term: 'Type casting', meaning: 'Forcing a value into another type, e.g. `(int)`.' },
        { term: 'NULL', meaning: 'The type of a variable that has no value.' },
      ],
      examPoints: [
        'List each data type with an example value (a table works well).',
        'Explain type strength — PHP is dynamically typed.',
        'Show type-casting syntax.',
        'Add a variable-variable example for full marks.',
      ],
      questions: [
        {
          prompt: 'Explain the data types supported by PHP.',
          plan: ANSWER_PLAN(
            'Kinds of data a variable can hold',
            'Scalar / compound / special tree',
            'Each type with an example; dynamic typing',
            'var_dump() of a string and a float',
            'Type set by value; casting available',
          ),
        },
        {
          prompt: 'What is type casting? Give an example.',
          plan: [
            { label: 'Definition', hint: 'Forcing a value into another type' },
            { label: 'Syntax', hint: '(int), (float), (string), (bool), (array), (object)' },
            { label: 'Example', hint: "$total = (int)'4' * 60.5;" },
          ],
        },
      ],
      keywords: ['integer', 'float / double', 'string', 'boolean', 'array', 'object', 'NULL', 'type casting', 'variable variables'],
      remember: [
        { prompt: 'What type is `$x = 9.99`?', answer: 'Float (double).' },
        { prompt: 'Do you declare a type before using a variable?', answer: 'No — the assigned value decides it.' },
        { prompt: 'What does `$$name` do?', answer: 'Uses the value of `$name` as a variable name.' },
      ],
    },

    // ------------------------------------------------------------------
    'declaring-and-using-constants': {
      difficulty: 'easy',
      intro: 'Prices, tax rates and limits — values that must never change by accident — belong in constants.',
      definition:
        'A constant is a named value that is set once and cannot change while the script runs. It is created with `define()` or the `const` keyword.',
      simpleExplanation: {
        text: 'A variable is a box you can refill. A constant is a box **sealed with tape**: you fill it once and it stays that way.',
        analogy: 'Your roll number is a constant; your attendance count is a variable.',
      },
      visual: {
        type: 'comparison',
        title: 'Variable vs constant',
        table: {
          columns: ['', 'Variable', 'Constant'],
          rows: [
            ['Looks like', '`$price`', '`PRICE`'],
            ['Can change?', 'Yes', 'No'],
            ['Created with', '`$price = 60;`', "`define('PRICE', 60);`"],
            ['Naming style', 'lower / camelCase', 'UPPERCASE'],
          ],
        },
      },
      explanation: [
        {
          code: `define('NOTEBOOK_PRICE', 60);
define('PEN_PRICE', 10);
define('HIGHLIGHTER_PRICE', 35);`,
        },
        'Use a constant by its name, **without** `$`: `echo NOTEBOOK_PRICE;`',
        {
          list: [
            'Constant names are written in **UPPERCASE** by convention, so they stand out.',
            'Once defined, a constant cannot be changed or undefined.',
            'Constants can be used anywhere in the script.',
            'At the top level of a file you can also write `const NOTEBOOK_PRICE = 60;`',
          ],
        },
        { tip: 'Defining the same constant twice does not change it — PHP raises a warning and keeps the first value.' },
        {
          more: [
            'PHP also has many **predefined constants**, such as `PHP_VERSION` and `PHP_OS`. The function `get_defined_constants()` lists them all.',
          ],
          label: 'Predefined constants',
        },
      ],
      example: {
        title: 'Prices that cannot be changed by mistake',
        code: `<?php
  define('NOTEBOOK_PRICE', 60);
  const PEN_PRICE = 10;

  echo 'Notebook: ' . NOTEBOOK_PRICE . '<br>';
  echo 'Pen: ' . PEN_PRICE;
?>`,
        output: `Notebook: 60
Pen: 10`,
        explanation: 'Both styles create a constant. Neither uses a `$` when it is read.',
      },
      keyPoints: [
        "Create with `define('NAME', value)` or `const NAME = value;`",
        'No `$` in front of a constant.',
        'The value is fixed for the whole script.',
        'UPPERCASE names by convention.',
        'Predefined constants include `PHP_VERSION` and `PHP_OS`.',
      ],
      importantTerms: [
        { term: 'Constant', meaning: 'A named value that cannot change once set.' },
        { term: 'define()', meaning: 'Function that creates a constant at run time.' },
        { term: 'Predefined constant', meaning: 'A constant PHP provides, e.g. `PHP_VERSION`.' },
      ],
      examPoints: [
        'Show `define()` syntax and how a constant is used.',
        'Contrast constants with variables in a table.',
        'Mention predefined constants.',
      ],
      questions: [
        {
          prompt: 'How do you declare and use constants in PHP?',
          plan: ANSWER_PLAN(
            'A named value fixed for the whole script',
            'Variable vs constant table',
            'define() and const, no $, uppercase convention, scope',
            'Price constants used in an echo',
            'Cannot change; predefined constants exist',
          ),
        },
      ],
      keywords: ['define()', 'const', 'UPPERCASE', 'fixed value', 'no $ sign', 'predefined constants'],
      remember: [
        { prompt: 'Write a constant `TAX_RATE` with value 0.10.', answer: "`define('TAX_RATE', 0.10);`" },
        { prompt: 'Do constants use the `$` sign?', answer: 'No.' },
        { prompt: 'Can a constant change later in the script?', answer: 'No.' },
      ],
    },

    // ------------------------------------------------------------------
    operators: {
      difficulty: 'medium',
      intro: 'Every calculation, comparison and decision in PHP is built from operators.',
      definition:
        'Operators are symbols that take one or more values (operands) and produce a new value — for example `+` adds, `.` joins strings and `==` compares.',
      simpleExplanation: {
        text: 'An operator is an **action symbol**. Put values next to it and it gives you a result: `5 + 3` gives `8`, `\'Hi\' . \'!\'` gives `\'Hi!\'`.',
        analogy: 'Values are the ingredients; operators are the kitchen tools that turn them into something new.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Operator families',
        root: 'PHP operators',
        children: [
          { label: 'Arithmetic', children: ['+', '-', '*', '/', '%', '**'] },
          { label: 'String', children: ['.', '.='] },
          { label: 'Assignment', children: ['=', '+=', '-=', '.='] },
          { label: 'Increment / decrement', children: ['++', '--'] },
          { label: 'Comparison', children: ['==', '===', '!=', '!==', '<', '>', '<=>'] },
          { label: 'Logical', children: ['&&', '||', '!', 'and', 'or', 'xor'] },
          { label: 'Bitwise', children: ['&', '|', '^', '~', '<<', '>>'] },
          { label: 'Others', children: ['? :', '??', '@', '`cmd`', 'new'] },
        ],
      },
      explanation: [
        { heading: 'Arithmetic' },
        '`+` add, `-` subtract, `*` multiply, `/` divide, `%` **modulus** (remainder) and `**` exponent. `10 % 3` gives `1`.',
        { heading: 'String' },
        "`.` joins two strings; `.=` appends to a variable. `'Hello' . ' world'` gives `'Hello world'`.",
        { heading: 'Assignment' },
        '`=` stores a value. Combined forms calculate and store in one step: `$a += 5` means `$a = $a + 5`.',
        'An assignment also returns the value it assigned: `$b = 6 + ($a = 5);` sets `$a` to 5 and `$b` to 11.',
        { heading: 'Increment and decrement' },
        {
          code: `$a = 4;
echo ++$a;  // 5 — adds 1, then returns $a
$a = 4;
echo $a++;  // 4 — returns $a, then adds 1`,
        },
        { heading: 'Comparison' },
        '`==` equal value · `===` **identical** (same value and same type) · `!=` or `<>` not equal · `!==` not identical · `<` `>` `<=` `>=` · `<=>` (spaceship) returns -1, 0 or 1.',
        {
          code: `var_dump(10 == '10');   // bool(true)
var_dump(10 === '10');  // bool(false) — int vs string`,
        },
        { heading: 'Logical' },
        '`!` not, `&&` and, `||` or, plus `and`, `or`, `xor`. `&&` and `and` do the same job, but `and` has much **lower precedence**.',
        {
          more: [
            '**Reference** `&`: `$b = &$a;` makes `$b` another name for `$a` — change one and the other changes.',
            '**Bitwise** operators (`&` `|` `^` `~` `<<` `>>`) work on the binary bits of integers.',
            '**Ternary** `condition ? a : b` picks one of two values. **Null coalescing** `a ?? b` gives `a` unless it is null or missing.',
            '**Error suppression** `@` hides a warning from one expression. The **execution** operator (backticks) runs a shell command and returns its output.',
            '**Comma** separates arguments; **new** creates an object; **instanceof** checks an object’s class.',
          ],
          label: 'The rest of the family',
        },
      ],
      example: {
        title: 'Operators in action',
        code: `<?php
  $a = 10;
  $b = 3;
  echo $a % $b;          // 1
  echo '<br>';
  echo $a ** 2;          // 100
  echo '<br>';
  echo 'Total: ' . $a;   // Total: 10
  echo '<br>';
  echo $a > $b ? 'a is bigger' : 'b is bigger';
?>`,
        output: `1
100
Total: 10
a is bigger`,
        explanation: 'Modulus, exponent, concatenation and the ternary operator — four families in four lines.',
      },
      keyPoints: [
        'Arithmetic: `+ - * / % **`',
        'Strings join with `.` and `.=`',
        'Shortcuts: `+=  -=  *=  /=  .=`',
        '`==` compares values; `===` also compares types.',
        '`++$a` adds first; `$a++` adds after.',
        '`&&` `||` `!` for logic; `?:` and `??` for quick choices.',
      ],
      importantTerms: [
        { term: 'Operand', meaning: 'A value an operator works on.' },
        { term: 'Modulus', meaning: 'The remainder after division (`%`).' },
        { term: 'Identical (===)', meaning: 'Equal in value and in type.' },
        { term: 'Ternary operator', meaning: '`condition ? a : b` — a one-line choice.' },
      ],
      examPoints: [
        'Group operators into families with one example each.',
        'Explain `==` vs `===` with output.',
        'Explain pre- vs post-increment with output.',
        'Mention ternary, `@` and the execution operator.',
      ],
      questions: [
        {
          prompt: 'Explain the different types of operators in PHP with examples.',
          plan: ANSWER_PLAN(
            'Symbols that act on operands to produce a value',
            'Operator family tree',
            'Each family with its symbols and one example',
            'The modulus / concatenation / ternary script',
            '== vs ===, ++$a vs $a++',
          ),
        },
      ],
      keywords: ['arithmetic', 'string', 'assignment', 'comparison', 'logical', 'bitwise', 'increment / decrement', 'ternary', '==='],
      remember: [
        { prompt: 'What is `17 % 5`?', answer: '2' },
        { prompt: "`10 == '10'` is true. What about `10 === '10'`?", answer: 'false — different types.' },
        { prompt: '`$a = 4; echo $a++;` prints?', answer: '4 (then `$a` becomes 5).' },
      ],
    },

    // ------------------------------------------------------------------
    'working-out-the-form': {
      difficulty: 'medium',
      intro: 'This is where everything so far comes together into a real, working script.',
      definition:
        'Working out the form means processing the submitted form values in PHP — combining form variables, constants and operators to calculate and display results such as totals.',
      simpleExplanation: {
        text: 'The user sends quantities. Your script **multiplies** each by its price, **adds** them up, applies tax and **prints** a neat total.',
        analogy: "You are the cashier: read the order slip, multiply, add, then hand back the bill.",
      },
      visual: {
        type: 'process',
        title: 'Processing an order, step by step',
        steps: [
          { label: 'Read', detail: "$notebookqty = $_POST['notebookqty'];" },
          { label: 'Count', detail: '$totalqty = $notebookqty + $penqty + …;' },
          { label: 'Price', detail: '$totalamount = $notebookqty * NOTEBOOK_PRICE + …;' },
          { label: 'Tax', detail: '$totalamount = $totalamount * (1 + TAX_RATE);' },
          { label: 'Show', detail: 'echo number_format($totalamount, 2);' },
        ],
      },
      explanation: [
        {
          list: [
            'Read each field from `$_POST` into a short variable, cast to a number.',
            'Add the quantities with `+` to get the item count.',
            'Multiply each quantity by its **price constant** and add the results.',
            'Apply tax with a constant rate. The brackets make the addition happen first.',
            'Format money with `number_format($amount, 2)` — two decimal places.',
          ],
          ordered: true,
        },
        { tip: 'Keep prices and rates in constants: when a price changes, you edit one line.' },
        { note: 'Checking for an empty order needs `if`, which comes in Unit II.' },
      ],
      example: {
        title: 'The full order script',
        code: `<?php
  define('NOTEBOOK_PRICE', 60);
  define('PEN_PRICE', 10);
  define('HIGHLIGHTER_PRICE', 35);
  define('TAX_RATE', 0.10); // example rate

  $notebookqty = (int) ($_POST['notebookqty'] ?? 0);
  $penqty = (int) ($_POST['penqty'] ?? 0);
  $highlighterqty = (int) ($_POST['highlighterqty'] ?? 0);

  $totalqty = $notebookqty + $penqty + $highlighterqty;
  echo 'Items ordered: ' . $totalqty . '<br>';

  $totalamount = $notebookqty * NOTEBOOK_PRICE
               + $penqty * PEN_PRICE
               + $highlighterqty * HIGHLIGHTER_PRICE;
  echo 'Subtotal: Rs. ' . number_format($totalamount, 2) . '<br>';

  $totalamount = $totalamount * (1 + TAX_RATE);
  echo 'Total incl. tax: Rs. ' . number_format($totalamount, 2);
?>`,
        input: '2 notebooks, 5 pens, 1 highlighter',
        output: `Items ordered: 8
Subtotal: Rs. 205.00
Total incl. tax: Rs. 225.50`,
        explanation:
          'Multiplication happens before addition, so each line is priced first and then summed: 120 + 50 + 35 = 205. Tax: 205 × 1.10 = 225.50.',
      },
      keyPoints: [
        'Read → calculate → format → echo.',
        'Keep prices and rates in constants.',
        'Cast form strings to numbers with `(int)` or `(float)`.',
        '`number_format($x, 2)` shows money with two decimals.',
      ],
      importantTerms: [
        { term: 'number_format()', meaning: 'Formats a number with grouped thousands and fixed decimals.' },
        { term: 'Subtotal', meaning: 'The amount before tax is added.' },
      ],
      examPoints: [
        'Write the form and the processing script.',
        'Show how constants and operators produce the total.',
        'Explain `number_format()`.',
        'Give a sample input with its output.',
      ],
      questions: [
        {
          prompt: 'Write a PHP script to process an order form and calculate the total amount.',
          plan: ANSWER_PLAN(
            'Processing submitted form data on the server',
            'Read → count → price → tax → show',
            '$_POST, constants, arithmetic operators, number_format()',
            'The full script with sample input and output',
            'Constants for prices; cast inputs; format money',
          ),
        },
      ],
      keywords: ['$_POST', 'define()', 'arithmetic operators', 'number_format()', 'total', 'tax'],
      remember: [
        { prompt: '`number_format(1234.5, 2)` gives?', answer: '`1,234.50`' },
        { prompt: 'Why keep prices in constants?', answer: 'They are fixed values, changed in one place.' },
        { prompt: 'Why the brackets in `$t * (1 + TAX_RATE)`?', answer: 'So the addition happens before the multiplication.' },
      ],
    },

    // ------------------------------------------------------------------
    'understanding-precedence-and-associativity': {
      difficulty: 'medium',
      intro: 'The same symbols can give different answers depending on the order PHP applies them — a favourite exam trap.',
      definition:
        'Precedence decides which operator in an expression is evaluated first. Associativity decides the order when operators have the same precedence — left to right or right to left.',
      simpleExplanation: {
        text: 'PHP does not just read left to right. It does `*`, `/` and `%` **before** `+` and `-`. When two operators are equally strong, **associativity** breaks the tie.',
        analogy: 'BODMAS from school maths: brackets first, then multiply and divide, then add and subtract.',
      },
      visual: {
        type: 'process',
        variant: 'evaluate',
        title: 'How PHP evaluates 2 + 3 * 4',
        steps: [
          { label: '2 + 3 * 4', detail: '* has higher precedence than +' },
          { label: '2 + 12', detail: 'multiply first' },
          { label: '14', detail: 'then add' },
        ],
      },
      explanation: [
        { heading: 'Precedence, high to low' },
        {
          table: {
            columns: ['Operators', 'Associativity'],
            rows: [
              ['`**`', 'right'],
              ['`++` `--` `!` and casts', '—'],
              ['`*` `/` `%`', 'left'],
              ['`+` `-`', 'left'],
              ['`.`', 'left'],
              ['`<` `<=` `>` `>=`', 'none'],
              ['`==` `!=` `===` `!==` `<=>`', 'none'],
              ['`&&`', 'left'],
              ['`||`', 'left'],
              ['`??`', 'right'],
              ['`? :`', 'none'],
              ['`=` `+=` `-=` `.=` …', 'right'],
              ['`and`', 'left'],
              ['`xor`', 'left'],
              ['`or`', 'left'],
            ],
          },
        },
        '**Brackets beat everything:** `(2 + 3) * 4` is `20`.',
        { heading: 'Associativity' },
        '**Left** associativity: `10 - 4 - 3` is `(10 - 4) - 3 = 3`, not `10 - (4 - 3) = 9`.',
        {
          visual: {
            type: 'process',
            variant: 'evaluate',
            title: 'Left to right',
            steps: [
              { label: '10 - 4 - 3', detail: 'equal precedence' },
              { label: '6 - 3', detail: 'leftmost first' },
              { label: '3', detail: 'result' },
            ],
          },
        },
        '**Right** associativity: `$a = $b = 5;` assigns 5 to `$b` first, then to `$a`. Likewise `2 ** 3 ** 2` is `2 ** 9 = 512`.',
        {
          trap: '`and` / `or` are weaker than `=`. `$ok = true and false;` stores `true` in `$ok`, because the assignment happens first. Use `&&` and `||` inside expressions.',
        },
        { note: 'Since PHP 8, `+` and `-` bind tighter than `.` — so `\'Sum: \' . 2 + 3` gives `Sum: 5`.' },
      ],
      example: {
        title: 'Order changes the answer',
        code: `<?php
  echo 2 + 3 * 4;     // 14
  echo '<br>';
  echo (2 + 3) * 4;   // 20
  echo '<br>';
  echo 10 - 4 - 3;    // 3   (left to right)
  echo '<br>';
  echo 2 ** 3 ** 2;   // 512 (right to left)
?>`,
        output: `14
20
3
512`,
        explanation: 'Same numbers, different grouping. Brackets make your intention explicit — use them whenever in doubt.',
      },
      keyPoints: [
        '**Precedence**: which operator goes first.',
        '**Associativity**: the tie-break for equal precedence.',
        '`*` `/` `%` before `+` `-`; brackets override everything.',
        'Arithmetic is left-associative; `=` and `**` are right-associative.',
        '`and` / `or` are weaker than `=` — prefer `&&` / `||`.',
      ],
      importantTerms: [
        { term: 'Precedence', meaning: 'Priority order between different operators.' },
        { term: 'Associativity', meaning: 'Direction of evaluation for operators of equal precedence.' },
        { term: 'Expression', meaning: 'Anything that produces a value, e.g. `2 + 3 * 4`.' },
      ],
      examPoints: [
        'Define both terms separately — they are often confused.',
        'Give the precedence order of common operators as a table.',
        'Work one left-associative and one right-associative example.',
        'Mention brackets to override the default order.',
      ],
      questions: [
        {
          prompt: 'Explain operator precedence and associativity in PHP with examples.',
          plan: ANSWER_PLAN(
            'Precedence = which first; associativity = which direction',
            'Step-by-step evaluation of 2 + 3 * 4',
            'Precedence table; left vs right associativity; brackets',
            '10 - 4 - 3 and 2 ** 3 ** 2 with working',
            'and/or weaker than =',
          ),
        },
      ],
      keywords: ['precedence', 'associativity', 'left to right', 'right to left', 'brackets', 'expression evaluation'],
      remember: [
        { prompt: '`5 + 2 * 3` = ?', answer: '11' },
        { prompt: '`20 / 2 / 5` = ?', answer: '2 — left to right: `(20 / 2) / 5`' },
        { prompt: 'Which runs first in `$a = $b = 3`?', answer: '`$b = 3` — assignment is right-associative.' },
      ],
    },

    // ------------------------------------------------------------------
    'variable-handling-functions': {
      difficulty: 'medium',
      intro: 'Form data and calculations can produce surprising types or missing values. These functions let you check before you trust.',
      definition:
        'Variable handling functions are built-in PHP functions that test, convert or inspect variables — for example `gettype()`, `settype()`, `isset()`, `unset()`, `empty()` and the `is_*()` family.',
      simpleExplanation: {
        text: 'They answer questions about a variable: **What type are you? Do you exist? Are you empty?** Some can also change a variable’s type.',
        analogy: 'A security check at the gate: look in the bag (`gettype`), check it is really there (`isset`), check it is not empty (`empty`).',
      },
      visual: {
        type: 'comparison',
        title: 'isset() vs empty() vs is_null()',
        table: {
          columns: ['Value of $x', 'isset($x)', 'empty($x)', 'is_null($x)'],
          rows: [
            ['`$x = 0`', 'true', 'true', 'false'],
            ["`$x = ''`", 'true', 'true', 'false'],
            ["`$x = '0'`", 'true', 'true', 'false'],
            ['`$x = []`', 'true', 'true', 'false'],
            ['`$x = null`', 'false', 'true', 'true'],
            ["`$x = 'hi'`", 'true', 'false', 'false'],
            ['never set', 'false', 'true', 'true*'],
          ],
        },
        caption: '* is_null() on a variable that was never set also raises an “undefined variable” warning.',
      },
      explanation: [
        { heading: 'Testing and setting type' },
        {
          list: [
            "`gettype($x)` returns the type name: `'integer'`, `'double'`, `'string'`, `'boolean'`, `'array'`, `'object'`, `'NULL'`…",
            "`settype($x, 'float')` changes the variable's type in place.",
            '`is_array()`, `is_float()` (`is_double()`), `is_int()` (`is_integer()`, `is_long()`), `is_string()`, `is_bool()`, `is_object()`, `is_resource()`, `is_null()` — each returns true or false.',
            '`is_scalar()` — true for integer, float, string or boolean. `is_numeric()` — true for numbers and numeric strings such as `\'42\'`. `is_callable()` — true if the value can be called as a function.',
          ],
        },
        { heading: 'Testing variable status' },
        {
          list: [
            '`isset($x)` — true if `$x` exists and is not null. It accepts several variables: `isset($a, $b)`.',
            '`unset($x)` — destroys the variable.',
            "`empty($x)` — true if `$x` does not exist or holds an “empty” value: `0`, `'0'`, `''`, `null`, `false` or `[]`.",
          ],
        },
        { heading: 'Reinterpreting variables' },
        '`intval()`, `floatval()`, `strval()` and `boolval()` return a converted copy without changing the original.',
        { tip: '`var_dump($x)` prints type and value; `print_r($x)` gives a readable view, handy for arrays.' },
      ],
      example: {
        title: 'Inspect, change, check',
        code: `<?php
  $a = 56;
  echo gettype($a) . '<br>';   // integer
  settype($a, 'float');
  echo gettype($a) . '<br>';   // double

  $qty = $_POST['penqty'] ?? '';
  echo empty($qty) ? 'No pens ordered.' : $qty . ' pens ordered.';
?>`,
        input: 'The pens field left blank',
        output: `integer
double
No pens ordered.`,
        explanation: "`gettype()` reports floats as `'double'` — a name kept for historical reasons.",
      },
      keyPoints: [
        '`gettype()` reads a type; `settype()` changes it.',
        '`is_*()` functions return true or false for one type.',
        '`isset()`: exists and is not null.',
        "`empty()`: missing, or an empty value (`0`, `'0'`, `''`, `null`, `false`, `[]`).",
        '`unset()` destroys a variable.',
        '`intval()`, `floatval()`, `strval()` convert without changing the original.',
      ],
      importantTerms: [
        { term: 'gettype()', meaning: "Returns a variable's type as a string." },
        { term: 'settype()', meaning: "Changes a variable's type in place." },
        { term: 'isset()', meaning: 'True if the variable exists and is not null.' },
        { term: 'empty()', meaning: 'True if the variable is missing or holds an empty value.' },
      ],
      examPoints: [
        'Group the functions: type testing/setting, status testing, reinterpreting.',
        'Explain `isset()` vs `empty()` with a table.',
        'Show `gettype()` / `settype()` with output.',
      ],
      questions: [
        {
          prompt: 'Explain variable handling functions in PHP.',
          plan: ANSWER_PLAN(
            'Built-in functions that test, convert or inspect variables',
            'isset / empty / is_null table',
            'Three groups with the functions in each',
            'gettype() and settype() with output',
            'isset vs empty difference',
          ),
        },
        {
          prompt: 'Differentiate between isset() and empty().',
          plan: [
            { label: 'Definition', hint: 'What each function checks' },
            { label: 'Table', hint: 'Results for 0, "", "0", null, [] and an unset variable' },
            { label: 'Example', hint: 'Checking a form field before using it' },
          ],
        },
      ],
      keywords: ['gettype()', 'settype()', 'is_*()', 'isset()', 'unset()', 'empty()', 'intval()', 'var_dump()'],
      remember: [
        { prompt: '`gettype(3.5)` returns?', answer: "`'double'`" },
        { prompt: '`isset($x)` when `$x = null`?', answer: 'false' },
        { prompt: "`empty('0')`?", answer: 'true' },
      ],
    },
  },
}
