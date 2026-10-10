// PHP and MySQL — Unit V: Working and Accessing MySQL using PHP.
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
    'Unit V teaches you how to make PHP talk to MySQL: connect, insert, retrieve, update and delete data, understand the three-tier web-database architecture, and use database interface tools like phpMyAdmin and PDO.',

  map: [
    { label: 'Connect', topics: ['introduction'] },
    { label: 'Write data', topics: ['inserting-data-into-the-database', 'putting-new-information-in-the-database'] },
    { label: 'Read data', topics: ['retrieving-data'] },
    { label: 'Modify / Remove', topics: ['updating-altering-and-deleting-records', 'dropping-tables-and-database'] },
    { label: 'Web DB flow', topics: ['web-database-architecture', 'querying-a-database-from-the-web'] },
    { label: 'Tools', topics: ['database-interfaces'] },
  ],

  topics: {
    // ------------------------------------------------------------------
    'introduction': {
      difficulty: 'easy',
      intro:
        'Before you can read or write any data you need a live connection between your PHP script and the MySQL server. This topic covers the two official PHP extensions for doing that.',
      definition:
        '**PHP–MySQL integration** means using a PHP extension (`MySQLi` or `PDO`) to send SQL commands from a PHP script to a MySQL database server and receive results back.',
      simpleExplanation: {
        text: 'PHP is a scripting language that runs on the web server. MySQL is a database that stores data. On their own they do not talk to each other — you need a **bridge**. PHP provides two ready-made bridges: `MySQLi` (MySQL Improved) and `PDO` (PHP Data Objects). You open a connection at the start of your script, do your work, then close it.',
        analogy:
          'Think of PHP as a customer and MySQL as a restaurant kitchen. The MySQLi or PDO extension is the waiter who carries orders to the kitchen and brings food back.',
      },
      visual: {
        type: 'flow',
        title: 'PHP ↔ MySQL connection flow',
        steps: [
          { label: 'PHP script starts', icon: 'code' },
          { label: 'Open connection (mysqli / PDO)', icon: 'link' },
          { label: 'Send SQL query', icon: 'database' },
          { label: 'MySQL processes query', icon: 'server' },
          { label: 'PHP receives result', icon: 'download' },
          { label: 'Close connection', icon: 'x' },
        ],
      },
      explanation: [
        { heading: 'Why use PHP with MySQL?' },
        {
          list: [
            'PHP is **server-side**: it runs before the page reaches the browser, so database credentials are never exposed.',
            'MySQL is **free, fast, and reliable** — the standard choice for web applications.',
            'Together they power dynamic web apps: login systems, shopping carts, news sites, and student portals.',
          ],
        },
        { heading: 'MySQLi extension' },
        'MySQLi (MySQL Improved) is built for MySQL only. It supports two programming styles:',
        {
          list: [
            '**Procedural style** — function calls like `mysqli_connect()`, `mysqli_query()`.',
            '**Object-oriented style** — `new mysqli()`, `$conn->query()`.',
          ],
        },
        'The OOP style is preferred in modern code and throughout this unit.',
        { heading: 'PDO extension' },
        '**PDO** (PHP Data Objects) works with many database systems (MySQL, PostgreSQL, SQLite …). You only change the connection string to switch databases — all other code stays the same. This makes PDO more portable than MySQLi.',
        { heading: 'Opening a connection' },
        'The constructor `new mysqli(host, user, password, dbname)` opens a connection. Always check `$conn->connect_error` immediately after:',
        {
          code: `<?php
$conn = new mysqli('localhost', 'root', '', 'studentdb');
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
echo 'Connected successfully';
?>`,
        },
        { heading: 'Closing the connection' },
        'Call `$conn->close()` when finished. PHP closes it automatically at script end, but explicit closing is good practice.',
        { tip: 'Always check for connection errors. A silent failure causes confusing errors later.' },
      ],
      example: {
        title: 'Connect to a MySQL database',
        code: `<?php
// Open connection
$conn = new mysqli('localhost', 'root', '', 'studentdb');

// Check for errors
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

echo 'Connection established successfully!';

// Close connection
$conn->close();
?>`,
        output: `Connection established successfully!`,
        explanation:
          '`new mysqli()` tries to connect. If it fails, `connect_error` contains the error message and `die()` stops the script. On success the message is printed and the connection is cleanly closed.',
      },
      keyPoints: [
        'PHP needs an extension — `MySQLi` or `PDO` — to talk to MySQL.',
        'OOP style: `$conn = new mysqli(host, user, pass, db);`',
        'Procedural style: `$conn = mysqli_connect(host, user, pass, db);`',
        'Check `$conn->connect_error` before running any query.',
        'Close with `$conn->close()` when done.',
      ],
      importantTerms: [
        { term: 'MySQLi', meaning: 'MySQL Improved extension — supports OOP and procedural styles, MySQL only.' },
        { term: 'PDO', meaning: 'PHP Data Objects — database-agnostic PHP extension supporting multiple drivers.' },
        { term: 'mysqli_connect()', meaning: 'Procedural function to open a MySQL connection.' },
        { term: 'connect_error', meaning: 'Property of a mysqli object; contains error message if connection failed.' },
        { term: 'die()', meaning: 'PHP function that prints a message and stops script execution.' },
      ],
      examPoints: [
        'State the two PHP extensions for MySQL: MySQLi and PDO.',
        'Write the OOP connection code with error checking.',
        'Explain why credentials are safe in PHP (server-side).',
        'Compare MySQLi (MySQL-only) vs PDO (portable).',
      ],
      questions: [
        {
          prompt: 'Explain how PHP connects to a MySQL database with a suitable example.',
          plan: ANSWER_PLAN(
            'PHP uses MySQLi or PDO extension to open a connection to MySQL',
            'PHP script → new mysqli() → MySQL server → result back to PHP',
            'MySQLi OOP style: new mysqli(host,user,pass,db), check connect_error, use connection, close()',
            'Connect to studentdb, check error, print success, close connection',
            'Always check connect_error; credentials stay on server; close connection when done',
          ),
        },
      ],
      keywords: ['MySQLi', 'PDO', 'mysqli_connect', 'new mysqli', 'connect_error', 'die', 'localhost', 'close'],
      remember: [
        { prompt: 'Which property holds the connection error message?', answer: '`$conn->connect_error`' },
        { prompt: 'What does `die()` do?', answer: 'Prints a message and immediately stops the script.' },
        { prompt: 'What is the main difference between MySQLi and PDO?', answer: 'MySQLi is MySQL-only; PDO works with many database systems.' },
      ],
    },

    // ------------------------------------------------------------------
    'inserting-data-into-the-database': {
      difficulty: 'medium',
      intro:
        'After connecting, the most common task is saving new data. This topic shows how to run an INSERT statement from PHP and handle the outcome.',
      definition:
        '**Inserting data** means using the SQL `INSERT INTO` statement — executed via `$conn->query()` or a **prepared statement** — to add a new row to a MySQL table from a PHP script.',
      simpleExplanation: {
        text: 'You write an SQL INSERT statement as a PHP string, hand it to `$conn->query()`, and MySQL adds the row. If the query returns `true` the insert succeeded; otherwise you read `$conn->error` to find out what went wrong.',
        analogy:
          'INSERT INTO is like filling in a form and dropping it in a filing cabinet. PHP is your hand, MySQL is the cabinet, and `query()` is the act of filing.',
      },
      visual: {
        type: 'process',
        title: 'Form → PHP → INSERT flow',
        steps: [
          { step: '1', label: 'User fills HTML form and submits' },
          { step: '2', label: 'PHP reads $_POST values' },
          { step: '3', label: 'PHP builds INSERT SQL string' },
          { step: '4', label: '$conn->query($sql) sends it to MySQL' },
          { step: '5', label: 'MySQL adds the row to the table' },
          { step: '6', label: 'PHP checks result → prints success or error' },
        ],
      },
      explanation: [
        { heading: 'Basic INSERT syntax' },
        {
          code: `INSERT INTO tablename (col1, col2, col3)
VALUES ('value1', 'value2', 'value3');`,
        },
        '`INSERT INTO` names the table and columns. `VALUES` lists the data for one row.',
        { heading: 'Running the query with PHP' },
        '`$conn->query($sql)` sends the SQL to MySQL and returns `true` on success or `false` on failure.',
        {
          code: `<?php
$name = 'Arun';
$roll = 'CS101';
$marks = 88;

$sql = "INSERT INTO students (name, roll_no, marks)
        VALUES ('$name', '$roll', $marks)";

if ($conn->query($sql) === true) {
    echo 'Record inserted successfully';
} else {
    echo 'Error: ' . $conn->error;
}
?>`,
        },
        { heading: 'Prepared statements (brief)' },
        'Embedding variables directly in an SQL string is dangerous if the data comes from a user (SQL injection). **Prepared statements** separate the SQL structure from the data:',
        {
          code: `<?php
$stmt = $conn->prepare(
    "INSERT INTO students (name, roll_no, marks) VALUES (?, ?, ?)"
);
$stmt->bind_param('ssi', $name, $roll, $marks);   // s=string, i=integer
$stmt->execute();
$stmt->close();
?>`,
        },
        '`bind_param()` replaces each `?` placeholder with the actual variable safely.',
        { tip: 'For exam questions, both the simple `query()` method and a mention of prepared statements are expected.' },
        { heading: 'last_insert_id()' },
        'After a successful INSERT, `$conn->insert_id` returns the auto-incremented primary key of the new row.',
      ],
      example: {
        title: 'Student registration: form → INSERT',
        code: `<!-- form.html -->
<form method="POST" action="insert_student.php">
  Name:    <input type="text"   name="name"><br>
  Roll No: <input type="text"   name="roll"><br>
  Marks:   <input type="number" name="marks"><br>
  <input type="submit" value="Add Student">
</form>

<?php
/* insert_student.php */
$conn = new mysqli('localhost', 'root', '', 'studentdb');
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

$name  = $conn->real_escape_string($_POST['name']);
$roll  = $conn->real_escape_string($_POST['roll']);
$marks = (int) $_POST['marks'];

$sql = "INSERT INTO students (name, roll_no, marks)
        VALUES ('$name', '$roll', $marks)";

if ($conn->query($sql) === true) {
    echo '<p>Student added! ID = ' . $conn->insert_id . '</p>';
} else {
    echo '<p>Error: ' . $conn->error . '</p>';
}
$conn->close();
?>`,
        output: `Student added! ID = 5`,
        explanation:
          '`real_escape_string()` makes the user input safe before embedding it in the SQL string. On success, `insert_id` shows the new row\'s auto-generated ID.',
      },
      keyPoints: [
        'SQL: `INSERT INTO table (cols) VALUES (vals);`',
        'PHP: `$conn->query($sql)` returns `true` or `false`.',
        'Check `$conn->error` when query fails.',
        '`$conn->insert_id` gives the last auto-increment ID.',
        'Use `real_escape_string()` or prepared statements to prevent SQL injection.',
      ],
      importantTerms: [
        { term: 'INSERT INTO', meaning: 'SQL statement that adds a new row to a table.' },
        { term: 'query()', meaning: 'MySQLi method that sends any SQL string to MySQL.' },
        { term: 'insert_id', meaning: 'MySQLi property holding the auto-increment ID of the last inserted row.' },
        { term: 'Prepared statement', meaning: 'SQL with placeholders (?) bound to variables safely before execution.' },
        { term: 'bind_param()', meaning: 'Binds PHP variables to the ? placeholders in a prepared statement.' },
        { term: 'real_escape_string()', meaning: 'Escapes special characters in a string to make it safe for SQL.' },
      ],
      examPoints: [
        'Write the INSERT INTO SQL syntax.',
        'Show a full PHP script: connect → build SQL → query → check result.',
        'Explain what `real_escape_string()` does and why it matters.',
        'Briefly describe prepared statements with `prepare()`, `bind_param()`, `execute()`.',
      ],
      questions: [
        {
          prompt: 'Explain how to insert data into a MySQL database using PHP with an example.',
          plan: ANSWER_PLAN(
            'INSERT INTO adds a new row; PHP sends it via $conn->query()',
            'Form → PHP reads POST → builds SQL → query() → MySQL table',
            'INSERT syntax, query() return value, error checking, insert_id, real_escape_string',
            'Student registration form that inserts name, roll_no, marks and prints the new ID',
            'Always escape user input; prepared statements are safer; check query return value',
          ),
        },
      ],
      keywords: ['INSERT INTO', 'query', 'insert_id', 'real_escape_string', 'prepared statement', 'bind_param', 'execute', '$_POST'],
      remember: [
        { prompt: 'What does `$conn->query()` return on a successful INSERT?', answer: '`true`' },
        { prompt: 'Which property gives the new row\'s auto-increment ID?', answer: '`$conn->insert_id`' },
        { prompt: 'What character separates placeholders in a prepared statement?', answer: '`?` (question mark)' },
      ],
    },

    // ------------------------------------------------------------------
    'retrieving-data': {
      difficulty: 'medium',
      intro:
        'SELECT is the most frequently used SQL statement. This topic shows how to run it from PHP and loop through every row of results.',
      definition:
        '**Retrieving data** means executing a `SELECT` statement through PHP, receiving a **result set** object, and iterating over it with `mysqli_fetch_assoc()` (or the OOP equivalent) to read each row.',
      simpleExplanation: {
        text: 'After `$conn->query("SELECT ...")` you get back a result object. `fetch_assoc()` gives you one row at a time as an associative array — the column name is the key and the cell value is the value. Wrap it in a `while` loop to get all rows.',
        analogy:
          'The result set is a stack of index cards (one per student). Each call to `fetch_assoc()` takes the top card off the stack and hands it to you.',
      },
      visual: {
        type: 'flow',
        title: 'SELECT → PHP → HTML table',
        steps: [
          { label: 'SELECT * FROM students', icon: 'database' },
          { label: '$result = $conn->query($sql)', icon: 'code' },
          { label: 'while ($row = $result->fetch_assoc())', icon: 'repeat' },
          { label: 'Print each $row as <tr>', icon: 'table' },
          { label: 'Browser shows HTML table', icon: 'monitor' },
        ],
      },
      explanation: [
        { heading: 'Running a SELECT query' },
        '`$result = $conn->query("SELECT * FROM students")` sends the SQL to MySQL and stores the result set.',
        { heading: 'Checking the number of rows' },
        '`$result->num_rows` tells you how many rows were returned before you start looping.',
        { heading: 'Fetching rows one by one' },
        {
          code: `while ($row = $result->fetch_assoc()) {
    echo $row['name'] . ' — ' . $row['marks'];
}`,
        },
        '`fetch_assoc()` returns the next row as an associative array, or `null` when there are no more rows — which ends the `while` loop automatically.',
        { heading: 'Other fetch functions' },
        {
          table: {
            columns: ['Function', 'Returns'],
            rows: [
              ['`fetch_assoc()`', 'Row as associative array (column name → value)'],
              ['`fetch_row()`', 'Row as numeric array (index 0, 1, 2 …)'],
              ['`fetch_array()`', 'Row as both associative and numeric array'],
              ['`fetch_object()`', 'Row as a PHP object'],
            ],
          },
        },
        { heading: 'Freeing the result' },
        'Call `$result->free()` after you are done to release the memory used by the result set.',
        { tip: 'Always check `$result->num_rows > 0` before looping to avoid an error on an empty table.' },
      ],
      example: {
        title: 'Display all students in an HTML table',
        code: `<?php
$conn = new mysqli('localhost', 'root', '', 'studentdb');
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

$sql    = "SELECT id, name, roll_no, marks FROM students";
$result = $conn->query($sql);

echo '<table border="1">';
echo '<tr><th>ID</th><th>Name</th><th>Roll No</th><th>Marks</th></tr>';

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo '<tr>';
        echo '<td>' . $row['id']      . '</td>';
        echo '<td>' . $row['name']    . '</td>';
        echo '<td>' . $row['roll_no'] . '</td>';
        echo '<td>' . $row['marks']   . '</td>';
        echo '</tr>';
    }
} else {
    echo '<tr><td colspan="4">No records found</td></tr>';
}

echo '</table>';

$result->free();
$conn->close();
?>`,
        output: `| ID | Name  | Roll No | Marks |
|----|-------|---------|-------|
|  1 | Arun  | CS101   |   88  |
|  2 | Priya | CS102   |   92  |`,
        explanation:
          '`num_rows` guards against an empty table. The `while` loop with `fetch_assoc()` outputs one `<tr>` row for every student record.',
      },
      keyPoints: [
        '`$result = $conn->query("SELECT ...")` returns a result set object.',
        '`$result->num_rows` counts the returned rows.',
        '`$result->fetch_assoc()` returns one row as an associative array.',
        'A `while` loop repeats until `fetch_assoc()` returns `null`.',
        'Free memory with `$result->free()` when done.',
      ],
      importantTerms: [
        { term: 'SELECT', meaning: 'SQL statement to read rows from a table.' },
        { term: 'Result set', meaning: 'Object returned by query() containing the rows MySQL found.' },
        { term: 'fetch_assoc()', meaning: 'Returns the next row as an associative array; null when finished.' },
        { term: 'num_rows', meaning: 'Property of a result object; the count of rows in the result set.' },
        { term: 'free()', meaning: 'Releases the memory held by a result set object.' },
      ],
      examPoints: [
        'Write the SQL SELECT statement and name the PHP function used to run it.',
        'Explain `fetch_assoc()` and the `while` loop pattern.',
        'Show the full PHP script that displays a table of all students.',
        'State the purpose of `num_rows` and `free()`.',
      ],
      questions: [
        {
          prompt: 'Explain how to retrieve and display data from a MySQL database using PHP.',
          plan: ANSWER_PLAN(
            'SELECT fetches rows; PHP uses fetch_assoc() in a while loop to read each row',
            'PHP → query(SELECT) → result set → fetch_assoc() loop → HTML table',
            'query() returns result object, num_rows checks count, fetch_assoc() reads rows, free() releases memory',
            'Script that selects all students and prints them in an HTML table',
            'Always check num_rows; free result after use; fetch_assoc gives column-name keys',
          ),
        },
      ],
      keywords: ['SELECT', 'fetch_assoc', 'num_rows', 'result set', 'while loop', 'free', 'fetch_row', 'fetch_array'],
      remember: [
        { prompt: 'What does `fetch_assoc()` return when there are no more rows?', answer: '`null` (which ends the while loop).' },
        { prompt: 'How do you count rows in a result set?', answer: '`$result->num_rows`' },
        { prompt: 'Which SQL statement reads data from a table?', answer: '`SELECT`' },
      ],
    },

    // ------------------------------------------------------------------
    'updating-altering-and-deleting-records': {
      difficulty: 'medium',
      intro:
        'Data changes over time. This topic covers three SQL operations — UPDATE to change values, DELETE to remove rows, and ALTER TABLE to change the structure of a table.',
      definition:
        '**Updating** uses `UPDATE … SET … WHERE` to change existing row values. **Deleting** uses `DELETE FROM … WHERE` to remove rows. **Altering** uses `ALTER TABLE` to add, drop, or modify columns — without touching the data (unless a column is dropped).',
      simpleExplanation: {
        text: 'UPDATE rewrites cells in existing rows. DELETE removes whole rows. ALTER TABLE changes the blueprint (schema) of the table itself — adding new drawers or renaming them — rather than the contents.',
        analogy:
          'UPDATE is like correcting a mistake in a student\'s marksheet. DELETE is like shredding an old record. ALTER TABLE is like adding an extra column to a spreadsheet template.',
      },
      visual: {
        type: 'comparison',
        title: 'UPDATE vs DELETE vs ALTER TABLE',
        items: [
          {
            title: 'UPDATE',
            tone: 'accent',
            points: [
              'Changes values in existing rows',
              'Syntax: UPDATE t SET col=val WHERE cond',
              'Always use WHERE to avoid updating all rows',
            ],
          },
          {
            title: 'DELETE',
            tone: 'warning',
            points: [
              'Removes entire rows permanently',
              'Syntax: DELETE FROM t WHERE cond',
              'Without WHERE — all rows are deleted!',
            ],
          },
          {
            title: 'ALTER TABLE',
            tone: 'muted',
            points: [
              'Changes table structure (columns)',
              'ADD COLUMN, DROP COLUMN, MODIFY',
              'Existing data is preserved (except dropped cols)',
            ],
          },
        ],
      },
      explanation: [
        { heading: 'UPDATE syntax' },
        {
          code: `UPDATE students
SET marks = 95
WHERE roll_no = 'CS101';`,
        },
        'The `WHERE` clause is **essential** — without it every row in the table is updated.',
        { heading: 'Running UPDATE in PHP' },
        {
          code: `<?php
$marks = 95;
$roll  = 'CS101';
$sql   = "UPDATE students SET marks = $marks WHERE roll_no = '$roll'";
if ($conn->query($sql) === true) {
    echo 'Record updated. Rows affected: ' . $conn->affected_rows;
} else {
    echo 'Error: ' . $conn->error;
}
?>`,
        },
        '`$conn->affected_rows` tells you how many rows were changed.',
        { heading: 'DELETE syntax' },
        {
          code: `DELETE FROM students WHERE id = 3;`,
        },
        { note: 'Never run `DELETE FROM students` without a WHERE clause in a real application — it wipes the entire table.' },
        { heading: 'ALTER TABLE' },
        {
          code: `-- Add a new column
ALTER TABLE students ADD COLUMN email VARCHAR(100);

-- Remove a column
ALTER TABLE students DROP COLUMN email;

-- Change column data type or size
ALTER TABLE students MODIFY COLUMN marks FLOAT;`,
        },
        'ALTER TABLE is a DDL (Data Definition Language) command, not DML. Run it with `$conn->query()` just like SELECT or UPDATE.',
      ],
      example: {
        title: 'Update marks and delete a student record',
        code: `<?php
$conn = new mysqli('localhost', 'root', '', 'studentdb');
if ($conn->connect_error) { die('Connection failed: ' . $conn->connect_error); }

// -- UPDATE: change marks for roll CS101 --
$newMarks = 95;
$roll     = $conn->real_escape_string('CS101');
$sqlUp    = "UPDATE students SET marks = $newMarks WHERE roll_no = '$roll'";

if ($conn->query($sqlUp) === true) {
    echo 'Marks updated. Rows affected: ' . $conn->affected_rows . '<br>';
} else {
    echo 'Update error: ' . $conn->error . '<br>';
}

// -- DELETE: remove student with id = 5 --
$id     = 5;
$sqlDel = "DELETE FROM students WHERE id = $id";

if ($conn->query($sqlDel) === true) {
    echo 'Student deleted. Rows affected: ' . $conn->affected_rows;
} else {
    echo 'Delete error: ' . $conn->error;
}

$conn->close();
?>`,
        output: `Marks updated. Rows affected: 1
Student deleted. Rows affected: 1`,
        explanation:
          'Each query returns `true` on success. `affected_rows` confirms how many rows were actually changed, which is useful for verifying the WHERE clause matched something.',
      },
      keyPoints: [
        '`UPDATE t SET col=val WHERE condition` — always include WHERE.',
        '`DELETE FROM t WHERE condition` — always include WHERE.',
        '`ALTER TABLE` modifies table structure: ADD, DROP, MODIFY.',
        '`$conn->affected_rows` reports how many rows were changed.',
        'Running UPDATE or DELETE without WHERE affects every row.',
      ],
      importantTerms: [
        { term: 'UPDATE', meaning: 'SQL DML command that changes values in existing rows.' },
        { term: 'DELETE FROM', meaning: 'SQL DML command that removes rows from a table.' },
        { term: 'ALTER TABLE', meaning: 'SQL DDL command that changes the structure (columns) of a table.' },
        { term: 'affected_rows', meaning: 'MySQLi property; number of rows changed by the last query.' },
        { term: 'WHERE clause', meaning: 'Restricts UPDATE or DELETE to only the matching rows.' },
      ],
      examPoints: [
        'Write UPDATE and DELETE SQL with proper WHERE clause.',
        'Show PHP code for UPDATE with affected_rows check.',
        'List ALTER TABLE sub-commands: ADD COLUMN, DROP COLUMN, MODIFY COLUMN.',
        'Warn about the danger of omitting WHERE.',
      ],
      questions: [
        {
          prompt: 'Explain UPDATE, DELETE, and ALTER TABLE operations in PHP with MySQL using examples.',
          plan: ANSWER_PLAN(
            'UPDATE changes row values; DELETE removes rows; ALTER TABLE changes table structure',
            'SQL syntax for each: UPDATE...SET...WHERE, DELETE FROM...WHERE, ALTER TABLE...ADD/DROP/MODIFY',
            'Run each with $conn->query(); check affected_rows; WHERE clause is critical for UPDATE and DELETE',
            'PHP script updating marks and deleting a student by ID',
            'Never omit WHERE; affected_rows confirms the change; ALTER is DDL while UPDATE/DELETE are DML',
          ),
        },
      ],
      keywords: ['UPDATE', 'SET', 'DELETE FROM', 'WHERE', 'ALTER TABLE', 'ADD COLUMN', 'DROP COLUMN', 'MODIFY', 'affected_rows'],
      remember: [
        { prompt: 'What happens if you run `DELETE FROM students` with no WHERE?', answer: 'All rows are deleted from the table.' },
        { prompt: 'Which property tells you how many rows were updated?', answer: '`$conn->affected_rows`' },
        { prompt: 'Which SQL command adds a new column to an existing table?', answer: '`ALTER TABLE … ADD COLUMN …`' },
      ],
    },

    // ------------------------------------------------------------------
    'dropping-tables-and-database': {
      difficulty: 'easy',
      intro:
        '`DROP` is the most destructive SQL command — it permanently deletes a table or an entire database. Knowing how and when to use it (and the IF EXISTS safety net) is essential.',
      definition:
        '`DROP TABLE` removes a table and **all of its data** permanently from the database. `DROP DATABASE` removes the entire database, including every table and record it contains.',
      simpleExplanation: {
        text: 'DELETE removes rows. DROP TABLE removes the whole table (structure + data). DROP DATABASE removes everything — all tables, all data, all at once. There is no undo.',
        analogy:
          'DELETE is erasing text from a sheet of paper. DROP TABLE is shredding the sheet. DROP DATABASE is burning the entire filing cabinet.',
      },
      visual: {
        type: 'hierarchy',
        title: 'Scope of DROP commands',
        root: 'MySQL Server',
        children: [
          {
            label: 'DATABASE studentdb',
            note: '← DROP DATABASE studentdb removes the database and all its tables',
            children: ['TABLE students'],
          },
          {
            label: 'TABLE students',
            note: '← DROP TABLE students removes the table and all its rows',
            children: ['Row 1 (Arun)', 'Row 2 (Priya)'],
          },
        ],
      },
      explanation: [
        { heading: 'DROP TABLE' },
        {
          code: `DROP TABLE students;`,
        },
        'Removes the `students` table entirely. If the table does not exist, MySQL throws an error.',
        { heading: 'IF EXISTS — safety net' },
        {
          code: `DROP TABLE IF EXISTS students;`,
        },
        '`IF EXISTS` prevents an error if the table (or database) does not already exist. It is a best practice to always include it.',
        { heading: 'DROP DATABASE' },
        {
          code: `DROP DATABASE studentdb;
-- or safely:
DROP DATABASE IF EXISTS studentdb;`,
        },
        { note: 'Dropping a database is irreversible unless you have a backup. In PHP, ensure your script has a confirmation step before executing DROP DATABASE.' },
        { heading: 'Running DROP from PHP' },
        'Use `$conn->query()` just like any other SQL statement. The connection must have sufficient MySQL privileges (the user must have DROP permission).',
        { tip: 'In production systems, restrict DROP privileges so that web application users cannot accidentally (or maliciously) destroy tables.' },
        { heading: 'Consequences' },
        {
          list: [
            '**DROP TABLE**: table structure and all its data vanish. Foreign key constraints may prevent dropping if other tables reference it.',
            '**DROP DATABASE**: the entire schema disappears — all tables, indexes, views, and stored procedures.',
            'There is no ROLLBACK for DROP in MySQL (DDL is auto-committed).',
          ],
        },
      ],
      example: {
        title: 'Drop a table and a database safely from PHP',
        code: `<?php
$conn = new mysqli('localhost', 'root', '', 'studentdb');
if ($conn->connect_error) { die('Connection failed: ' . $conn->connect_error); }

// Drop a table safely
$sqlDropTable = "DROP TABLE IF EXISTS temp_logs";
if ($conn->query($sqlDropTable) === true) {
    echo 'Table temp_logs dropped (or did not exist).<br>';
} else {
    echo 'Error dropping table: ' . $conn->error . '<br>';
}

// Drop the whole database — DANGEROUS!
// $sqlDropDB = "DROP DATABASE IF EXISTS studentdb";
// $conn->query($sqlDropDB);
// (commented out to prevent accidental data loss)

$conn->close();
?>`,
        output: `Table temp_logs dropped (or did not exist).`,
        explanation:
          '`IF EXISTS` means the script succeeds even if `temp_logs` was already gone. The database drop is commented out as a safety reminder.',
      },
      keyPoints: [
        '`DROP TABLE tablename` — deletes table structure and all data.',
        '`DROP DATABASE dbname` — deletes the entire database.',
        'Always use `IF EXISTS` to avoid errors when object may not exist.',
        'DROP is irreversible — always have a backup.',
        'MySQL requires DROP privilege to execute these commands.',
      ],
      importantTerms: [
        { term: 'DROP TABLE', meaning: 'DDL command that permanently removes a table and all its data.' },
        { term: 'DROP DATABASE', meaning: 'DDL command that permanently removes an entire database.' },
        { term: 'IF EXISTS', meaning: 'Optional clause that prevents an error if the object does not exist.' },
        { term: 'DDL', meaning: 'Data Definition Language — SQL commands that define or change structure (CREATE, ALTER, DROP).' },
      ],
      examPoints: [
        'Write DROP TABLE and DROP DATABASE with and without IF EXISTS.',
        'Explain why DROP is irreversible (DDL auto-commit).',
        'Contrast DELETE (rows) vs DROP TABLE (whole table) vs DROP DATABASE (whole schema).',
      ],
      questions: [
        {
          prompt: 'Explain the DROP TABLE and DROP DATABASE commands with examples. What precautions should be taken?',
          plan: ANSWER_PLAN(
            'DROP TABLE removes a table permanently; DROP DATABASE removes the entire schema',
            'MySQL Server → Database → Table → Rows (each DROP level removes everything beneath it)',
            'Syntax, IF EXISTS safety, DDL auto-commit (no rollback), privilege requirement',
            'PHP script dropping temp_logs table with IF EXISTS',
            'Always use IF EXISTS; always take a backup before DROP; restrict DROP privilege in production',
          ),
        },
      ],
      keywords: ['DROP TABLE', 'DROP DATABASE', 'IF EXISTS', 'DDL', 'auto-commit', 'irreversible', 'privilege'],
      remember: [
        { prompt: 'Can you ROLLBACK a DROP TABLE statement?', answer: 'No — DDL statements are auto-committed in MySQL.' },
        { prompt: 'What does IF EXISTS do in a DROP statement?', answer: 'Prevents an error if the table or database does not exist.' },
        { prompt: 'What is the difference between DELETE and DROP TABLE?', answer: 'DELETE removes rows; DROP TABLE removes the entire table including its structure.' },
      ],
    },

    // ------------------------------------------------------------------
    'web-database-architecture': {
      difficulty: 'easy',
      intro:
        'Before writing any web-database code it helps to understand the big picture: how a browser request travels to MySQL and back.',
      definition:
        'The **three-tier web-database architecture** consists of three layers: (1) the **presentation tier** (browser), (2) the **logic tier** (web server + PHP), and (3) the **data tier** (MySQL database server).',
      simpleExplanation: {
        text: 'When a user clicks a link the browser sends an HTTP request to Apache. Apache hands the `.php` file to the PHP engine. PHP builds an SQL query, sends it to MySQL, gets data back, formats it as HTML, and Apache sends that HTML to the browser. The user sees a web page, never SQL.',
        analogy:
          'A waiter (PHP/Apache) takes your order (HTTP request) to the kitchen (MySQL), brings back the food (data) and presents it on a plate (HTML page) to you (browser).',
      },
      visual: {
        type: 'architecture',
        title: 'Three-tier web-database architecture',
        layers: [
          {
            label: 'Tier 1 — Presentation',
            note: 'HTTP request ↓ / HTML response ↑',
            items: ['Web Browser (Chrome, Firefox)', 'HTML / CSS / JavaScript'],
          },
          {
            label: 'Tier 2 — Logic (Web Server)',
            note: 'SQL query ↓ / result set ↑',
            items: ['Apache / Nginx Web Server', 'PHP Engine'],
          },
          {
            label: 'Tier 3 — Data',
            items: ['MySQL Database Server', 'Tables & Data'],
          },
        ],
      },
      explanation: [
        { heading: 'Tier 1 — Presentation tier (Client / Browser)' },
        {
          list: [
            'The **web browser** (Chrome, Firefox, Edge) is the client.',
            'It displays HTML, CSS, and runs JavaScript.',
            'The user interacts here: fills forms, clicks buttons.',
            'Communicates with the web server using **HTTP/HTTPS**.',
          ],
        },
        { heading: 'Tier 2 — Logic tier (Web Server + PHP)' },
        {
          list: [
            '**Apache** (or Nginx) receives the HTTP request and serves static files or hands `.php` files to the PHP engine.',
            '**PHP** runs on the server: it reads form data, builds SQL queries, talks to MySQL, and generates HTML.',
            'PHP acts as the intermediary — neither the browser nor MySQL communicate directly with each other.',
          ],
        },
        { heading: 'Tier 3 — Data tier (MySQL)' },
        {
          list: [
            'The **MySQL server** stores all data in tables.',
            'It receives SQL commands from PHP and returns result sets.',
            'MySQL can run on the same machine as Apache or on a separate server.',
          ],
        },
        { heading: 'Complete request flow' },
        {
          list: [
            '1. User submits a form → browser sends **HTTP POST** to Apache.',
            '2. Apache detects `.php` extension → passes file to **PHP engine**.',
            '3. PHP reads `$_POST`, builds a `SELECT` or `INSERT` SQL string.',
            '4. PHP sends SQL to **MySQL** via MySQLi connection.',
            '5. MySQL executes SQL → returns rows or success.',
            '6. PHP formats data as **HTML**.',
            '7. Apache sends HTML → browser renders the page for the user.',
          ],
        },
        { tip: 'In exam answers, draw the three tiers as boxes with arrows between them and label each arrow (HTTP, SQL, Result, HTML).' },
      ],
      example: {
        title: 'Three-tier request trace (Student Search)',
        code: `/* Step 1 — Browser sends: GET /search.php?name=Arun HTTP/1.1 */

/* Step 2 — Apache passes search.php to PHP */

<?php
/* Step 3 — PHP (search.php) */
$conn = new mysqli('localhost', 'root', '', 'studentdb');
$name = $conn->real_escape_string($_GET['name']);

/* Step 4 — PHP sends SQL to MySQL */
$sql    = "SELECT * FROM students WHERE name = '$name'";
$result = $conn->query($sql);  // MySQL executes, returns rows

/* Step 5 & 6 — PHP formats result as HTML */
while ($row = $result->fetch_assoc()) {
    echo '<p>' . $row['name'] . ' — Marks: ' . $row['marks'] . '</p>';
}
$conn->close();
?>
/* Step 7 — Apache sends HTML back to browser */`,
        output: `<p>Arun — Marks: 88</p>`,
        explanation:
          'The comments trace each of the seven steps across the three tiers. The browser only ever sees HTML; MySQL only ever sees SQL.',
      },
      keyPoints: [
        'Three tiers: Browser (Presentation) → Apache+PHP (Logic) → MySQL (Data).',
        'Browser and MySQL never communicate directly; PHP is the mediator.',
        'HTTP is the protocol between browser and web server.',
        'SQL is the protocol between PHP and MySQL.',
        'PHP generates HTML dynamically from the database result.',
      ],
      importantTerms: [
        { term: 'Three-tier architecture', meaning: 'Presentation, Logic, and Data layers separated for scalability and security.' },
        { term: 'Presentation tier', meaning: 'The client (browser) that displays HTML to the user.' },
        { term: 'Logic tier', meaning: 'The web server (Apache) plus PHP that processes business logic.' },
        { term: 'Data tier', meaning: 'The MySQL database server that stores and retrieves data.' },
        { term: 'HTTP', meaning: 'HyperText Transfer Protocol — used between browser and web server.' },
      ],
      examPoints: [
        'Draw and label the three-tier architecture with arrows.',
        'Describe the role of each tier.',
        'Trace a complete request from browser to MySQL and back.',
        'State the protocols used: HTTP (tier 1↔2) and SQL/MySQLi (tier 2↔3).',
      ],
      questions: [
        {
          prompt: 'Explain the three-tier web-database architecture used in PHP-MySQL applications.',
          plan: ANSWER_PLAN(
            'Three tiers: Presentation (browser), Logic (web server + PHP), Data (MySQL)',
            'Box diagram: Browser ←HTTP→ Apache/PHP ←SQL→ MySQL, with arrows labeled',
            'Role of each tier; browser↔PHP via HTTP; PHP↔MySQL via SQL; PHP generates HTML from DB result',
            'Trace a student search request through all three tiers step by step',
            'PHP is mediator; browser never touches MySQL; each tier can run on separate servers',
          ),
        },
      ],
      keywords: ['three-tier', 'presentation tier', 'logic tier', 'data tier', 'Apache', 'HTTP', 'PHP engine', 'MySQL', 'SQL'],
      remember: [
        { prompt: 'What are the three tiers of a web-database architecture?', answer: 'Presentation (browser), Logic (PHP/Apache), Data (MySQL).' },
        { prompt: 'Which protocol does the browser use to talk to Apache?', answer: 'HTTP (HyperText Transfer Protocol).' },
        { prompt: 'Does the browser ever directly access MySQL?', answer: 'No — PHP acts as the middleman.' },
      ],
    },

    // ------------------------------------------------------------------
    'querying-a-database-from-the-web': {
      difficulty: 'medium',
      intro:
        'This topic ties everything together: a user types into an HTML form, PHP reads the input, queries MySQL, and shows the results — all in one round trip.',
      definition:
        '**Querying a database from the web** is the end-to-end process where an HTML form sends user input to a PHP script, PHP constructs and executes a SQL query, and the result set is formatted as HTML and returned to the browser.',
      simpleExplanation: {
        text: 'The form is the "what do you want to search for?" interface. PHP is the translator that converts the answer into SQL, asks MySQL, and turns the reply into a web page. The whole thing happens in milliseconds.',
        analogy:
          'You ask a librarian (HTML form → PHP) to find books by a certain author (SQL query). The librarian checks the catalogue (MySQL), finds the books (result set), and brings you a list (HTML response).',
      },
      visual: {
        type: 'process',
        title: 'Complete web query workflow',
        steps: [
          { step: '1', label: 'User types search term in HTML form' },
          { step: '2', label: 'Browser POSTs form data to PHP script' },
          { step: '3', label: 'PHP reads $_POST / $_GET input' },
          { step: '4', label: 'PHP sanitises input (real_escape_string / prepared stmt)' },
          { step: '5', label: 'PHP builds SQL SELECT query string' },
          { step: '6', label: '$conn->query($sql) → MySQL executes' },
          { step: '7', label: 'PHP loops over result set with fetch_assoc()' },
          { step: '8', label: 'PHP echoes results as HTML table' },
          { step: '9', label: 'Browser renders final page to user' },
        ],
      },
      explanation: [
        { heading: 'HTML form' },
        'The form uses `method="GET"` for searches (bookmarkable URL) or `method="POST"` to hide data from the URL bar:',
        {
          code: `<form method="GET" action="search.php">
  <input type="text" name="name" placeholder="Student name">
  <input type="submit" value="Search">
</form>`,
        },
        { heading: 'PHP receives and sanitises input' },
        'Always sanitise before building SQL. Two common methods:',
        {
          list: [
            '`real_escape_string($input)` — escapes dangerous characters.',
            'Prepared statements with `?` placeholders — the safest method.',
          ],
        },
        { heading: 'Building and running the query' },
        {
          code: `<?php
$name   = $conn->real_escape_string($_GET['name']);
$sql    = "SELECT id, name, marks FROM students WHERE name LIKE '%$name%'";
$result = $conn->query($sql);
?>`,
        },
        '`LIKE \'%value%\'` finds partial matches (e.g., searching "Ar" finds "Arun").',
        { heading: 'SQL injection warning' },
        'If a user types `\' OR \'1\'=\'1` into an unsanitised input, the resulting SQL can return all rows or even drop tables. This is called **SQL injection** and is one of the most common web vulnerabilities.',
        {
          code: `-- Dangerous (no sanitisation):
SELECT * FROM students WHERE name = '' OR '1'='1'
-- Returns ALL rows regardless of name!`,
        },
        { note: 'Always sanitise input or use prepared statements. Never trust user data.' },
        { heading: 'Displaying results' },
        'Loop through the result set and build an HTML table (same as the Retrieving Data topic).',
      ],
      example: {
        title: 'Student search by name — full web query',
        code: `<!-- search.html -->
<form method="GET" action="search.php">
  Search student: <input type="text" name="name">
  <input type="submit" value="Search">
</form>

<?php
/* search.php */
$conn = new mysqli('localhost', 'root', '', 'studentdb');
if ($conn->connect_error) { die('Connection failed: ' . $conn->connect_error); }

if (isset($_GET['name']) && $_GET['name'] !== '') {
    $name   = $conn->real_escape_string($_GET['name']);
    $sql    = "SELECT id, name, roll_no, marks
               FROM students WHERE name LIKE '%$name%'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo '<table border="1">';
        echo '<tr><th>ID</th><th>Name</th><th>Roll No</th><th>Marks</th></tr>';
        while ($row = $result->fetch_assoc()) {
            echo '<tr>';
            echo '<td>' . $row['id']      . '</td>';
            echo '<td>' . $row['name']    . '</td>';
            echo '<td>' . $row['roll_no'] . '</td>';
            echo '<td>' . $row['marks']   . '</td>';
            echo '</tr>';
        }
        echo '</table>';
    } else {
        echo '<p>No students found matching "' . htmlspecialchars($name) . '".</p>';
    }
    $result->free();
}
$conn->close();
?>`,
        output: `| ID | Name | Roll No | Marks |
|----|------|---------|-------|
|  1 | Arun | CS101   |   88  |`,
        explanation:
          '`isset()` checks the field was submitted. `real_escape_string()` prevents SQL injection. `LIKE \'%…%\'` provides a flexible partial-match search. `htmlspecialchars()` prevents XSS when re-displaying user input.',
      },
      keyPoints: [
        'HTML form → PHP `$_GET`/`$_POST` → SQL query → result set → HTML.',
        'Always sanitise user input before using it in SQL.',
        'SQL injection is a critical security risk — use `real_escape_string()` or prepared statements.',
        '`LIKE \'%value%\'` allows partial text matches.',
        '`htmlspecialchars()` prevents XSS when echoing user input back to the page.',
      ],
      importantTerms: [
        { term: 'SQL injection', meaning: 'Attack where malicious SQL is embedded in user input to manipulate queries.' },
        { term: 'real_escape_string()', meaning: 'Escapes characters like quotes so they cannot break SQL syntax.' },
        { term: 'LIKE', meaning: 'SQL operator for pattern matching; `%` is a wildcard for any characters.' },
        { term: 'htmlspecialchars()', meaning: 'Converts HTML special characters to safe entities, preventing XSS.' },
        { term: 'isset()', meaning: 'PHP function; returns true if a variable exists and is not null.' },
      ],
      examPoints: [
        'Draw or describe the 9-step web query workflow.',
        'Explain SQL injection with an example attack string.',
        'Show how `real_escape_string()` or prepared statements prevent injection.',
        'Write a complete PHP search page: form + query + HTML table output.',
      ],
      questions: [
        {
          prompt: 'Explain the process of querying a database from the web with a PHP example. How is SQL injection prevented?',
          plan: ANSWER_PLAN(
            'End-to-end process: HTML form → PHP reads input → SQL query → result → HTML',
            '9-step flow: form → POST/GET → PHP reads → sanitise → build SQL → query() → fetch_assoc loop → echo HTML → browser renders',
            'GET vs POST, real_escape_string, LIKE operator, prepared statements, htmlspecialchars, SQL injection attack',
            'Student name search with partial LIKE match and sanitised input',
            'Never trust user input; always sanitise; use prepared statements for best security',
          ),
        },
      ],
      keywords: ['SQL injection', 'real_escape_string', 'LIKE', 'htmlspecialchars', 'isset', '$_GET', '$_POST', 'prepared statement', 'XSS'],
      remember: [
        { prompt: 'What does `LIKE \'%Ar%\'` match?', answer: 'Any value containing "Ar" anywhere, e.g. "Arun", "Hari".' },
        { prompt: 'What is SQL injection?', answer: 'An attack where malicious SQL is smuggled through user input to manipulate the database query.' },
        { prompt: 'Which PHP function prevents XSS when echoing user text?', answer: '`htmlspecialchars()`' },
      ],
    },

    // ------------------------------------------------------------------
    'putting-new-information-in-the-database': {
      difficulty: 'medium',
      intro:
        'This topic shows a complete, practical example of a student registration system: an HTML form that captures input and a PHP script that validates and inserts it into the database.',
      definition:
        '**Putting new information in the database** is the full cycle of presenting an HTML form to the user, receiving POST data in PHP, validating and sanitising it, executing an `INSERT INTO` statement, and displaying a success or error message.',
      simpleExplanation: {
        text: 'Step 1: user fills a form. Step 2: browser POSTs data to PHP. Step 3: PHP validates (not empty? correct format?), sanitises (escape special characters), and runs INSERT. Step 4: PHP shows "saved!" or "something went wrong".',
        analogy:
          'Like submitting an admission form at a university office. The clerk (PHP) checks the form is complete, copies it into the register (MySQL), and gives you a receipt (success message).',
      },
      visual: {
        type: 'process',
        title: 'Full registration form → database flow',
        steps: [
          { step: '1', label: 'User fills HTML registration form' },
          { step: '2', label: 'Browser POSTs name, roll, marks to PHP' },
          { step: '3', label: 'PHP checks fields are not empty (validation)' },
          { step: '4', label: 'PHP sanitises with real_escape_string()' },
          { step: '5', label: 'PHP builds INSERT INTO SQL' },
          { step: '6', label: '$conn->query() sends INSERT to MySQL' },
          { step: '7', label: 'PHP checks result → success/error message' },
        ],
      },
      explanation: [
        { heading: 'Server-side validation' },
        'Before inserting, check that required fields are not empty and data types are correct:',
        {
          code: `<?php
if (empty($_POST['name']) || empty($_POST['roll'])) {
    die('<p style="color:red">Name and Roll No are required.</p>');
}
?>`,
        },
        '`empty()` returns `true` for empty strings, `null`, `0`, and unset variables.',
        { heading: 'Sanitisation' },
        {
          code: `$name  = $conn->real_escape_string(trim($_POST['name']));
$roll  = $conn->real_escape_string(trim($_POST['roll']));
$marks = (int) $_POST['marks'];   // cast to integer strips non-numeric chars`,
        },
        '`trim()` removes leading and trailing whitespace. Casting `(int)` ensures the marks value is a number.',
        { heading: 'INSERT and feedback' },
        'After INSERT, show a clear success or failure message. For a better user experience, display the assigned `insert_id`:',
        {
          code: `if ($conn->query($sql) === true) {
    echo '<p style="color:green">Student registered! ID: ' . $conn->insert_id . '</p>';
} else {
    echo '<p style="color:red">Error: ' . $conn->error . '</p>';
}`,
        },
        { tip: 'Keep the HTML form and the PHP script in the same file using `$_SERVER["PHP_SELF"]` as the action, or split them into two files for clarity.' },
      ],
      example: {
        title: 'Student registration form with INSERT',
        code: `<!-- register.html — the form -->
<!DOCTYPE html>
<html>
<body>
<h2>Student Registration</h2>
<form method="POST" action="register.php">
  <label>Name:    <input type="text"   name="name"  required></label><br>
  <label>Roll No: <input type="text"   name="roll"  required></label><br>
  <label>Marks:   <input type="number" name="marks" min="0" max="100"></label><br>
  <input type="submit" value="Register">
</form>
</body>
</html>

<?php
/* register.php — processes the form */
$conn = new mysqli('localhost', 'root', '', 'studentdb');
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// 1. Validate
if (empty($_POST['name']) || empty($_POST['roll'])) {
    die('<p style="color:red">Name and Roll No are required fields.</p>');
}

// 2. Sanitise
$name  = $conn->real_escape_string(trim($_POST['name']));
$roll  = $conn->real_escape_string(trim($_POST['roll']));
$marks = isset($_POST['marks']) ? (int) $_POST['marks'] : 0;

// 3. Build and run INSERT
$sql = "INSERT INTO students (name, roll_no, marks)
        VALUES ('$name', '$roll', $marks)";

// 4. Feedback
if ($conn->query($sql) === true) {
    echo '<p style="color:green">Registration successful!</p>';
    echo '<p>Student ID assigned: ' . $conn->insert_id . '</p>';
    echo '<p>Name: ' . htmlspecialchars($name) . ', Roll: ' . htmlspecialchars($roll) . ', Marks: ' . $marks . '</p>';
} else {
    echo '<p style="color:red">Error: ' . $conn->error . '</p>';
}

$conn->close();
?>`,
        output: `Registration successful!
Student ID assigned: 6
Name: Meena, Roll: CS106, Marks: 79`,
        explanation:
          'The form uses POST (safer than GET for form data). PHP validates, sanitises, then inserts. The success message echoes sanitised values using `htmlspecialchars()` to prevent XSS.',
      },
      keyPoints: [
        'Validate first: check required fields with `empty()`.',
        'Sanitise: `real_escape_string()`, `trim()`, type-casting.',
        'INSERT into DB: `$conn->query($sql)`.',
        'Give feedback: success message with `insert_id` or error with `$conn->error`.',
        'Use `htmlspecialchars()` when echoing user data back to the page.',
      ],
      importantTerms: [
        { term: 'Validation', meaning: 'Checking that submitted data is present and in the correct format before using it.' },
        { term: 'Sanitisation', meaning: 'Cleaning input to remove or escape dangerous characters.' },
        { term: 'empty()', meaning: 'PHP function; returns true if a variable is empty (null, "", 0, unset).' },
        { term: 'trim()', meaning: 'PHP function that removes whitespace from both ends of a string.' },
        { term: 'PHP_SELF', meaning: '`$_SERVER["PHP_SELF"]` — the filename of the current script, used as a self-posting form action.' },
      ],
      examPoints: [
        'Write a complete HTML form and a PHP INSERT script for student registration.',
        'Explain the validate → sanitise → insert → feedback pattern.',
        'Mention `empty()`, `trim()`, `real_escape_string()`, and `htmlspecialchars()`.',
        'Show success message displaying `insert_id`.',
      ],
      questions: [
        {
          prompt: 'Write a PHP program to create a student registration form that inserts data into a MySQL database.',
          plan: ANSWER_PLAN(
            'HTML form collects data; PHP validates, sanitises, and executes INSERT INTO; success/error message displayed',
            'Form → POST → PHP validate → sanitise → INSERT → feedback',
            'empty() for validation; real_escape_string()+trim() for sanitisation; query() for INSERT; insert_id and htmlspecialchars for feedback',
            'Full register.html and register.php code inserting name, roll_no, marks into students table',
            'Never skip validation or sanitisation; show clear feedback; htmlspecialchars prevents XSS',
          ),
        },
      ],
      keywords: ['validation', 'sanitisation', 'empty', 'trim', 'real_escape_string', 'INSERT INTO', 'insert_id', 'htmlspecialchars', 'PHP_SELF'],
      remember: [
        { prompt: 'What does `empty($_POST["name"])` check?', answer: 'Whether the "name" POST field is missing, null, or an empty string.' },
        { prompt: 'What does `trim()` do?', answer: 'Removes leading and trailing whitespace from a string.' },
        { prompt: 'Why use `htmlspecialchars()` when echoing user data?', answer: 'To convert `<`, `>`, `"` etc. into HTML entities and prevent XSS attacks.' },
      ],
    },

    // ------------------------------------------------------------------
    'database-interfaces': {
      difficulty: 'easy',
      intro:
        'You can interact with MySQL in several ways — through a graphical tool, the command line, or PHP code. This topic surveys the four main options.',
      definition:
        'A **database interface** is a tool or API that allows a user or application to communicate with a database system. For MySQL, the main interfaces are: **phpMyAdmin** (GUI), **MySQL CLI** (command line), **MySQLi** (PHP extension), and **PDO** (PHP Data Objects).',
      simpleExplanation: {
        text: 'phpMyAdmin is the graphical control panel for MySQL — click buttons, run queries in a browser. MySQL CLI is the raw terminal where you type SQL directly. MySQLi and PDO are PHP libraries that let your PHP code talk to MySQL automatically.',
        analogy:
          'Managing MySQL is like driving a car. phpMyAdmin is an automatic car with a dashboard and buttons. MySQL CLI is a manual car with only a steering wheel and pedals. MySQLi/PDO are the engine that power the car from your PHP code.',
      },
      visual: {
        type: 'comparison',
        title: 'MySQL database interfaces at a glance',
        table: {
          columns: ['Interface', 'What it is', 'Key features'],
          rows: [
            ['phpMyAdmin', 'Web-based GUI', 'No SQL needed for basic tasks; import/export; user management; bundled with XAMPP/WAMP'],
            ['MySQL CLI', 'Command-line interface', 'Type SQL directly; full power; fast for scripts; needs MySQL installed'],
            ['MySQLi (PHP)', 'PHP extension for MySQL', 'OOP and procedural styles; prepared statements; MySQL only'],
            ['PDO (PHP)', 'PHP Data Objects', 'Supports 12+ databases; one consistent API; preferred for portable apps'],
          ],
        },
      },
      explanation: [
        { heading: '1. phpMyAdmin' },
        {
          list: [
            'A free, web-based GUI for managing MySQL.',
            'Access it at `http://localhost/phpmyadmin/` in XAMPP.',
            'Lets you create databases and tables, run SQL queries, import/export data, and manage user permissions — all through a point-and-click interface.',
            'Ideal for students and developers during development.',
          ],
        },
        { heading: '2. MySQL Command Line Interface (CLI)' },
        {
          list: [
            'Log in with: `mysql -u root -p`',
            'Type SQL directly: `USE studentdb;`, `SELECT * FROM students;`',
            'Useful for writing and testing SQL, running batch scripts, and remote server administration.',
          ],
        },
        { heading: '3. MySQLi (PHP extension)' },
        {
          list: [
            'Works **only with MySQL**.',
            'Supports both **OOP** (`new mysqli()`) and **procedural** (`mysqli_connect()`) styles.',
            'Supports prepared statements for security.',
            'Slightly faster than PDO for MySQL-only use.',
          ],
        },
        { heading: '4. PDO (PHP Data Objects)' },
        {
          list: [
            'Works with **12+ databases** (MySQL, PostgreSQL, SQLite, MS SQL Server, …).',
            'Uses a **DSN** (Data Source Name) string to specify the driver: `mysql:host=localhost;dbname=studentdb`.',
            'All database operations use the same PDO methods regardless of backend.',
            'Preferred when your application may need to switch databases.',
          ],
        },
        {
          table: {
            columns: ['Feature', 'MySQLi', 'PDO'],
            rows: [
              ['Database support', 'MySQL only', '12+ databases'],
              ['Coding styles', 'OOP + procedural', 'OOP only'],
              ['Prepared statements', 'Yes', 'Yes'],
              ['Named placeholders (:name)', 'No', 'Yes'],
              ['Performance (MySQL)', 'Slightly faster', 'Slightly slower'],
              ['Portability', 'Low', 'High'],
            ],
          },
        },
        { heading: 'PDO connection example' },
        {
          code: `<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=studentdb', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo 'PDO connection successful';
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>`,
        },
        'PDO uses `try/catch` for error handling, which is cleaner than checking `connect_error` manually.',
      ],
      example: {
        title: 'MySQLi OOP vs PDO — INSERT comparison',
        code: `<?php
/* === MySQLi (OOP) === */
$conn = new mysqli('localhost', 'root', '', 'studentdb');
$stmt = $conn->prepare("INSERT INTO students (name, marks) VALUES (?, ?)");
$stmt->bind_param('si', $name, $marks);
$name = 'Raj'; $marks = 85;
$stmt->execute();
echo 'MySQLi: Inserted ID ' . $conn->insert_id;
$conn->close();

/* === PDO === */
$pdo  = new PDO('mysql:host=localhost;dbname=studentdb', 'root', '');
$stmt = $pdo->prepare("INSERT INTO students (name, marks) VALUES (:name, :marks)");
$stmt->execute([':name' => 'Raj', ':marks' => 85]);
echo 'PDO: Inserted ID ' . $pdo->lastInsertId();
?>`,
        output: `MySQLi: Inserted ID 7
PDO: Inserted ID 7`,
        explanation:
          'Both achieve the same result. PDO uses **named placeholders** (`:name`, `:marks`) which are more readable. MySQLi uses positional `?` placeholders with `bind_param()`. PDO\'s `lastInsertId()` is the equivalent of MySQLi\'s `insert_id`.',
      },
      keyPoints: [
        'phpMyAdmin — GUI, browser-based, good for development.',
        'MySQL CLI — command-line, direct SQL, powerful for admin.',
        'MySQLi — PHP extension, MySQL only, OOP + procedural.',
        'PDO — PHP extension, 12+ databases, OOP only, named placeholders.',
        'PDO is more portable; MySQLi is MySQL-specific but slightly faster.',
      ],
      importantTerms: [
        { term: 'phpMyAdmin', meaning: 'Web-based GUI tool for managing MySQL databases.' },
        { term: 'MySQL CLI', meaning: 'Command-line interface for typing SQL directly to MySQL.' },
        { term: 'MySQLi', meaning: 'MySQL Improved PHP extension; supports OOP and procedural MySQL access.' },
        { term: 'PDO', meaning: 'PHP Data Objects — database-agnostic PHP extension using a DSN string.' },
        { term: 'DSN', meaning: 'Data Source Name — connection string format used by PDO (e.g., mysql:host=localhost).' },
        { term: 'Named placeholder', meaning: 'PDO syntax `:name` used in prepared statements instead of `?`.' },
      ],
      examPoints: [
        'List and briefly describe the four MySQL interfaces.',
        'Draw or write the MySQLi vs PDO comparison table.',
        'Show a PDO connection using try/catch.',
        'Explain what DSN stands for and give an example.',
        'State when to prefer PDO over MySQLi (portability).',
      ],
      questions: [
        {
          prompt: 'Explain the different database interfaces available for MySQL. Compare MySQLi and PDO.',
          plan: ANSWER_PLAN(
            'Database interface is a tool/API to communicate with a database. Four main types for MySQL: phpMyAdmin, CLI, MySQLi, PDO',
            'Box diagram with four sections: phpMyAdmin (GUI) | MySQL CLI (terminal) | MySQLi (PHP, MySQL-only) | PDO (PHP, multi-DB)',
            'phpMyAdmin is web GUI; CLI is direct SQL terminal; MySQLi is OOP+procedural PHP for MySQL; PDO is portable OOP PHP for 12+ databases; comparison table',
            'PDO vs MySQLi INSERT with prepared statements showing named vs positional placeholders',
            'PDO for portability; MySQLi if MySQL-only and performance critical; both support prepared statements',
          ),
        },
      ],
      keywords: ['phpMyAdmin', 'MySQL CLI', 'MySQLi', 'PDO', 'DSN', 'named placeholder', 'PDOException', 'lastInsertId', 'ATTR_ERRMODE'],
      remember: [
        { prompt: 'What does PDO stand for?', answer: 'PHP Data Objects.' },
        { prompt: 'Which PHP extension works with multiple database systems?', answer: 'PDO.' },
        { prompt: 'What is the PDO equivalent of `$conn->insert_id`?', answer: '`$pdo->lastInsertId()`' },
        { prompt: 'What is a DSN?', answer: 'Data Source Name — the connection string used by PDO, e.g. `mysql:host=localhost;dbname=studentdb`.' },
      ],
    },
  },
}
