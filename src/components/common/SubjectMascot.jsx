// Small line-art characters, one per subject. They share a face (two eyes
// that blink, a small smile) so they read as one family; the prop around
// them carries the subject: database, shield, gear, robot, lens, chip.

const Face = ({ x = 32, y, gap = 5, mouth = 4 }) => (
  <>
    <g className="mascot__eyes">
      <circle cx={x - gap} cy={y} r="1.9" className="mascot__ink" />
      <circle cx={x + gap} cy={y} r="1.9" className="mascot__ink" />
    </g>
    <path d={`M${x - mouth} ${y + 5}q${mouth} 3 ${mouth * 2} 0`} className="mascot__line" />
  </>
)

const ART = {
  // Developer + code + database
  'php-mysql': (
    <>
      <path className="mascot__body" d="M16 18v26a16 6 0 0 0 32 0V18" />
      <ellipse className="mascot__body" cx="32" cy="18" rx="16" ry="6" />
      <path className="mascot__line" d="M16 30a16 6 0 0 0 32 0" />
      <Face y={37} />
      <rect className="mascot__accent" x="40" y="4" width="20" height="13" rx="4" />
      <path className="mascot__line" d="M46 8l-3 2.5 3 2.5M54 8l3 2.5-3 2.5M51.5 7.5l-3 6" />
    </>
  ),
  // Shield + lock
  'cyber-security': (
    <>
      <path className="mascot__body" d="M32 8l18 6v16c0 12-8 20-18 26-10-6-18-14-18-26V14z" />
      <Face y={29} />
      <path className="mascot__line" d="M45 40v-3a4 4 0 0 1 8 0v3" />
      <rect className="mascot__accent" x="42" y="40" width="14" height="11" rx="2.5" />
      <circle className="mascot__ink" cx="49" cy="45.5" r="1.3" />
    </>
  ),
  // Engineer: gear + lifecycle arrow
  'software-engineering': (
    <>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect
          key={angle}
          className="mascot__accent"
          x="29"
          y="16"
          width="6"
          height="7"
          rx="1.5"
          transform={`rotate(${angle} 32 35)`}
        />
      ))}
      <circle className="mascot__body" cx="32" cy="35" r="14" />
      <Face y={33} />
      <path className="mascot__line" d="M14 14a22 22 0 0 1 34-4" />
      <path className="mascot__line" d="M44 5l4.5 5-6 1.5" />
    </>
  ),
  // Friendly robot + neural nodes
  'artificial-intelligence': (
    <>
      <path className="mascot__line" d="M32 20v-8" />
      <circle className="mascot__accent" cx="32" cy="9" r="3.5" />
      <rect className="mascot__accent" x="9" y="29" width="5" height="11" rx="2.5" />
      <rect className="mascot__accent" x="50" y="29" width="5" height="11" rx="2.5" />
      <rect className="mascot__body" x="14" y="20" width="36" height="30" rx="10" />
      <path className="mascot__line mascot__line--thin" d="M25 26.5h14" />
      <circle className="mascot__ink" cx="25" cy="26.5" r="1.2" />
      <circle className="mascot__ink" cx="32" cy="26.5" r="1.2" />
      <circle className="mascot__ink" cx="39" cy="26.5" r="1.2" />
      <Face y={35} gap={6} />
    </>
  ),
  // Data explorer: lens over a bar chart
  'data-mining': (
    <>
      <rect className="mascot__accent" x="9" y="36" width="7" height="16" rx="1.5" />
      <rect className="mascot__accent" x="18" y="28" width="7" height="24" rx="1.5" />
      <rect className="mascot__accent" x="27" y="40" width="7" height="12" rx="1.5" />
      <path className="mascot__line mascot__line--bold" d="M47 37l9 9" />
      <circle className="mascot__body" cx="39" cy="28" r="12" />
      <Face x={39} y={26} gap={4.5} mouth={3.5} />
    </>
  ),
  // Device + sensor + connection
  iot: (
    <>
      <path className="mascot__line" d="M23 15q9-8 18 0M27 19q5-4.5 10 0" />
      <circle className="mascot__ink" cx="32" cy="22" r="1.5" />
      <path className="mascot__line" d="M13 32h5M13 39h5M13 46h5M46 32h5M46 39h5M46 46h5" />
      <rect className="mascot__body" x="18" y="26" width="28" height="26" rx="6" />
      <rect className="mascot__accent mascot__accent--soft" x="22" y="30" width="20" height="18" rx="3" />
      <Face y={37} />
    </>
  ),
}

const FALLBACK = (
  <>
    <rect className="mascot__body" x="14" y="12" width="36" height="42" rx="5" />
    <path className="mascot__line" d="M22 12v42" />
    <Face x={36} y={30} gap={4.5} />
  </>
)

export default function SubjectMascot({ subjectId, size = 'md', className = '' }) {
  return (
    <span className={`mascot mascot--${size} ${className}`} data-subject={subjectId} aria-hidden="true">
      <svg viewBox="0 0 64 64" focusable="false">
        {ART[subjectId] ?? FALLBACK}
      </svg>
    </span>
  )
}
