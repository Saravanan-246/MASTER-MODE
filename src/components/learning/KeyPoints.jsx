import { motion } from 'framer-motion'
import RichText from '../common/RichText.jsx'

const EASE = [0.22, 1, 0.36, 1]
const list = { hidden: {}, shown: { transition: { staggerChildren: 0.07 } } }
const row = { hidden: { opacity: 0, x: -8 }, shown: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } } }
const tick = { hidden: { pathLength: 0 }, shown: { pathLength: 1, transition: { duration: 0.35, delay: 0.15 } } }

// Checklist with hand-drawn ticks that draw in as the list appears.
export default function KeyPoints({ points }) {
  return (
    <motion.ul className="keypoints" variants={list} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.2 }}>
      {points.map((point, i) => (
        <motion.li key={i} variants={row}>
          <svg className="keypoints__tick" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <motion.path d="M3.5 10.5 8 15l8.5-10" variants={tick} />
          </svg>
          <span>
            <RichText text={point} />
          </span>
        </motion.li>
      ))}
    </motion.ul>
  )
}

export function ImportantTerms({ terms }) {
  return (
    <dl className="terms">
      {terms.map((entry) => (
        <div key={entry.term} className="terms__item">
          <dt>
            <RichText text={entry.term} />
          </dt>
          <dd>
            <RichText text={entry.meaning} />
          </dd>
        </div>
      ))}
    </dl>
  )
}
