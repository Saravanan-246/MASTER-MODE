import { motion } from 'framer-motion'
import { pad2 } from '../../lib/paths.js'

const EASE = [0.22, 1, 0.36, 1]

// One numbered step of a topic ("01 · See it"). Every topic section uses it,
// so spacing, headings and the entrance animation stay consistent.
export default function LearningSection({ id, index, title, label, tone = 'plain', children }) {
  return (
    <motion.section
      id={id}
      className={`lsec lsec--${tone}`}
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <header className="lsec__head">
        {index != null && (
          <span className="lsec__index" aria-hidden="true">
            {pad2(index)}
          </span>
        )}
        <h2 id={`${id}-title`} className="lsec__title">
          {title}
        </h2>
        {label && <span className="lsec__label">{label}</span>}
      </header>
      <div className="lsec__body">{children}</div>
    </motion.section>
  )
}
