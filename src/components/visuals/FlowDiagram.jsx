import { motion } from 'framer-motion'
import Arrow from './Arrow.jsx'
import { codeLike, item } from './motion.js'

// steps: ['Browser', 'Server'] or [{ label, note }]
// Wide containers: a left-to-right chain. Narrow: a top-to-bottom stack.
export default function FlowDiagram({ steps = [] }) {
  return (
    <ol className={`flow${steps.length > 4 ? ' flow--long' : ''}`}>
      {steps.map((step, i) => {
        const { label, note } = typeof step === 'string' ? { label: step } : step
        return (
          <motion.li key={i} className="flow__step" variants={item}>
            <div className="flow__card">
              <span className="flow__index" aria-hidden="true">
                {i + 1}
              </span>
              <span className={`flow__label${codeLike(label) ? ' is-code' : ''}`}>{label}</span>
              {note && <span className={`flow__note${codeLike(note) ? ' is-code' : ''}`}>{note}</span>}
            </div>
            {i < steps.length - 1 && <Arrow className="flow__arrow" />}
          </motion.li>
        )
      })}
    </ol>
  )
}
