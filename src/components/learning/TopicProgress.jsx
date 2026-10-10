import { AnimatePresence, motion } from 'framer-motion'
import { Check, RotateCcw } from 'lucide-react'
import Button from '../common/Button.jsx'
import ProgressBar from '../common/ProgressBar.jsx'
import { Sparkle } from '../Doodles.jsx'
import { studyLines } from '../../data/microcopy.js'

// End-of-topic check-in: mark as understood, see the unit move forward.
export default function TopicProgress({ done, onToggle, unitStats }) {
  return (
    <section className={`finish${done ? ' is-done' : ''}`} aria-labelledby="finish-title">
      <div className="finish__text">
        <h2 id="finish-title" className="finish__title">
          {done ? 'Topic understood' : 'Did this click?'}
          <AnimatePresence>{done && <Sparkle className="finish__sparkle" delay={0.1} />}</AnimatePresence>
        </h2>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={done ? 'done' : 'todo'}
            className="finish__line"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {done ? studyLines.topicDone : 'Mark it as understood to track your progress.'}
          </motion.p>
        </AnimatePresence>
      </div>

      <Button variant={done ? 'secondary' : 'primary'} iconStart={done ? RotateCcw : Check} onClick={onToggle}>
        {done ? 'Mark as not yet' : 'Mark as understood'}
      </Button>

      <div className="finish__unit">
        <ProgressBar value={unitStats.percent} label="Unit progress" size="sm" />
        <span>
          {unitStats.done} of {unitStats.total} topics in this unit
        </span>
      </div>
    </section>
  )
}
