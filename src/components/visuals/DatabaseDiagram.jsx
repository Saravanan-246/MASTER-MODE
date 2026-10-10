import { motion } from 'framer-motion'
import { Database, KeyRound } from 'lucide-react'
import { item } from './motion.js'

// table: { name, columns: ['id', { name: 'qty', type: 'INT', key: true }], rows: [[...]] }
// highlight: row indexes to mark. Wide tables scroll inside their card.
export default function DatabaseDiagram({ table, highlight = [] }) {
  const columns = table.columns.map((c) => (typeof c === 'string' ? { name: c } : c))
  return (
    <motion.div className="dbtable" variants={item}>
      <div className="dbtable__head">
        <Database size={16} strokeWidth={2.25} aria-hidden="true" />
        <span className="dbtable__name">{table.name}</span>
      </div>
      <div className="dbtable__scroll" tabIndex={0} role="region" aria-label={`Table ${table.name}`}>
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.name} scope="col">
                  <span className="dbtable__col">
                    {column.key && <KeyRound size={12} strokeWidth={2.5} aria-label="Primary key" />}
                    {column.name}
                  </span>
                  {column.type && <span className="dbtable__type">{column.type}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(table.rows ?? []).map((row, r) => (
              <tr key={r} className={highlight.includes(r) ? 'is-highlight' : undefined}>
                {row.map((cell, c) => (
                  <td key={c}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
