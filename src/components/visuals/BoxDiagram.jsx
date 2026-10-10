import { motion } from 'framer-motion'
import { item } from './motion.js'

// The "labelled box" picture of variables. items: [{ label, value, tag }]
export default function BoxDiagram({ items = [] }) {
  return (
    <ul className="boxes">
      {items.map((box) => (
        <motion.li key={box.label} className="boxes__box" variants={item}>
          <span className="boxes__label">{box.label}</span>
          <span className="boxes__value">{box.value}</span>
          {box.tag && <span className="boxes__tag">{box.tag}</span>}
        </motion.li>
      ))}
    </ul>
  )
}
