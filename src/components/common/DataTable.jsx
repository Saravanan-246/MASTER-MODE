import RichText from './RichText.jsx'

const TRUTHY = new Set(['true', 'yes'])
const FALSY = new Set(['false', 'no'])

function Cell({ value }) {
  const key = String(value).toLowerCase().replace(/\*$/, '')
  if (TRUTHY.has(key) || FALSY.has(key)) {
    return <span className={`truth truth--${TRUTHY.has(key) ? 'yes' : 'no'}`}>{value}</span>
  }
  return <RichText text={value} />
}

// A real <table> on wide containers; each row becomes a labelled card on
// narrow ones (pure CSS, via a container query), so nothing gets tiny.
// Explicit roles keep table semantics when CSS changes the display type.
export default function DataTable({ columns, rows, caption }) {
  return (
    <div className="data-table">
      <table role="table">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead role="rowgroup">
          <tr role="row">
            {columns.map((column, i) => (
              <th key={i} scope="col" role="columnheader">
                <RichText text={column} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {rows.map((row, r) => (
            <tr key={r} role="row">
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" role="rowheader">
                    <Cell value={cell} />
                  </th>
                ) : (
                  <td key={c} role="cell" data-label={String(columns[c]).replaceAll('`', '')}>
                    {/* One wrapper, so the narrow card layout sees label + value, not every inline code piece. */}
                    <span className="data-table__value">
                      <Cell value={cell} />
                    </span>
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
