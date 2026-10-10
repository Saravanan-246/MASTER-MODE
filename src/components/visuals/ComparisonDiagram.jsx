import { motion } from 'framer-motion'
import { Check, Minus, X } from 'lucide-react'
import DataTable from '../common/DataTable.jsx'
import { codeLike, item, pop } from './motion.js'

const TONE_ICON = { good: Check, bad: X }

// "$2item — starts with a digit" → code part + plain-language reason.
function Point({ text }) {
  const [head, ...rest] = text.split(' — ')
  return (
    <>
      <span className={codeLike(head) ? 'is-code' : undefined}>{head}</span>
      {rest.length > 0 && <span className="compare__why"> — {rest.join(' — ')}</span>}
    </>
  )
}

// Either `items` (side-by-side cards, 2–3 of them) or `table` ({ columns, rows }).
export default function ComparisonDiagram({ items, table, title }) {
  if (table) {
    return (
      <motion.div variants={item}>
        <DataTable columns={table.columns} rows={table.rows} caption={title} />
      </motion.div>
    )
  }

  return (
    <div className={`compare compare--${items.length}`}>
      {items.map((entry, i) => {
        const Icon = TONE_ICON[entry.tone] ?? Minus
        return (
          <motion.section key={entry.title} className={`compare__card compare__card--${entry.tone ?? 'plain'}`} variants={item}>
            <h4 className="compare__title">{entry.title}</h4>
            <ul className="compare__points">
              {entry.points.map((point) => (
                <li key={point}>
                  <Icon className="compare__icon" size={15} strokeWidth={2.75} aria-hidden="true" />
                  <span>
                    <Point text={point} />
                  </span>
                </li>
              ))}
            </ul>
            {i < items.length - 1 && (
              <motion.span className="compare__vs" variants={pop} aria-hidden="true">
                vs
              </motion.span>
            )}
          </motion.section>
        )
      })}
    </div>
  )
}
