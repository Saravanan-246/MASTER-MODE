import { motion } from 'framer-motion'
import { item, pop } from './motion.js'

// events: [{ label, detail }] in order. Horizontal when there is room.
export default function TimelineDiagram({ events = [] }) {
  return (
    <ol className="timeline">
      {events.map((event, i) => (
        <motion.li key={event.label + i} className="timeline__event" variants={item}>
          <motion.span className="timeline__dot" variants={pop} aria-hidden="true" />
          <span className="timeline__label">{event.label}</span>
          {event.detail && <span className="timeline__detail">{event.detail}</span>}
        </motion.li>
      ))}
    </ol>
  )
}
