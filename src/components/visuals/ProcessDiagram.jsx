import { motion } from 'framer-motion'
import Arrow from './Arrow.jsx'
import { codeLike, item, pop } from './motion.js'

// steps: [{ label, detail }] — also reads { name, description | note }.
// variant "evaluate" shows an expression being reduced, step by step.
const normalize = (step) =>
  typeof step === 'string'
    ? { label: step }
    : { label: step.label ?? step.name, detail: step.detail ?? step.description ?? step.note }

export default function ProcessDiagram({ steps: rawSteps = [], variant }) {
  const steps = rawSteps.map(normalize)
  if (variant === 'evaluate') {
    return (
      <ol className="evaluate">
        {steps.map((step, i) => (
          <motion.li key={i} className="evaluate__step" variants={item}>
            <div className={`evaluate__expr${i === steps.length - 1 ? ' is-result' : ''}`}>
              <code>{step.label}</code>
              {step.detail && <span className="evaluate__note">{step.detail}</span>}
            </div>
            {i < steps.length - 1 && <Arrow className="evaluate__arrow" />}
          </motion.li>
        ))}
      </ol>
    )
  }

  return (
    <ol className="process">
      {steps.map((step, i) => (
        <motion.li key={i} className="process__step" variants={item}>
          <motion.span className="process__number" variants={pop} aria-hidden="true">
            {i + 1}
          </motion.span>
          <div className="process__card">
            <span className="process__label">{step.label}</span>
            {step.detail && (
              <span className={`process__detail${codeLike(step.detail) ? ' is-code' : ''}`}>{step.detail}</span>
            )}
          </div>
        </motion.li>
      ))}
    </ol>
  )
}
