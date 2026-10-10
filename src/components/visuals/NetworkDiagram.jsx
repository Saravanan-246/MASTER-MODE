import { motion } from 'framer-motion'
import { fade, item, pop } from './motion.js'

// Hub and spoke. center: 'Cloud' | { label, note }; nodes: ['Sensor'] | [{ label, note }]
// Wide containers place nodes on a ring around the hub; narrow ones list them.
function ringPosition(i, count) {
  const angle = ((-90 + (360 / count) * i) * Math.PI) / 180
  return { x: 50 + 38 * Math.cos(angle), y: 50 + 36 * Math.sin(angle) }
}

export default function NetworkDiagram({ center, nodes = [] }) {
  const hub = typeof center === 'string' ? { label: center } : center
  const points = nodes.map((node, i) => ({
    ...(typeof node === 'string' ? { label: node } : node),
    ...ringPosition(i, nodes.length),
  }))

  return (
    <div className="network">
      <svg className="network__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {points.map((p) => (
          <motion.line key={p.label} x1="50" y1="50" x2={p.x} y2={p.y} variants={fade} />
        ))}
      </svg>
      <motion.div className="network__hub" variants={pop}>
        <span className="network__label">{hub.label}</span>
        {hub.note && <span className="network__note">{hub.note}</span>}
      </motion.div>
      <ul className="network__nodes">
        {points.map((p) => (
          <motion.li
            key={p.label}
            className="network__node"
            style={{ '--x': `${p.x}%`, '--y': `${p.y}%` }}
            variants={item}
          >
            <span className="network__label">{p.label}</span>
            {p.note && <span className="network__note">{p.note}</span>}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
