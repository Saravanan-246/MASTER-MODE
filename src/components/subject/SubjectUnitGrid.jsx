import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../common/Button.jsx'
import ProgressBar from '../common/ProgressBar.jsx'
import { studyLines } from '../../data/microcopy.js'
import { topicContent } from '../../lib/content.js'
import { nextTopicInUnit, unitStats } from '../../lib/progress.js'
import { roman, topicPath, unitPath } from '../../lib/paths.js'
import './subject.css'

const EASE = [0.22, 1, 0.36, 1]
const grid = { hidden: {}, shown: { transition: { staggerChildren: 0.07 } } }
const card = { hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }

// `contents` (one per unit) may be null while notes load; cards still work.
export default function SubjectUnitGrid({ subject, progress, contents }) {
  return (
    <motion.ol className="unit-grid" variants={grid} initial="hidden" animate="shown">
      {subject.units.map((unit, i) => {
        const stats = unitStats(progress, subject, unit)
        const pending = unit.topics.length === 0
        const notes = contents ? unit.topics.filter((t) => topicContent(contents[i], t.id)).length : null
        const next = nextTopicInUnit(progress, subject, unit)
        const label = stats.complete ? 'Review' : stats.done > 0 ? 'Continue' : 'Start'

        return (
          <motion.li key={unit.number} className={`unit-card${pending ? ' is-pending' : ''}`} variants={card}>
            <span className="unit-card__roman">Unit {roman(unit.number)}</span>
            <h3 className="unit-card__title">
              <Link to={unitPath(subject.id, unit.number)} className="unit-card__link">
                {unit.title ?? studyLines.syllabusPending}
              </Link>
            </h3>

            {!pending && (
              <>
                <p className="unit-card__meta">
                  {unit.topics.length} topics{unit.hours ? ` · ${unit.hours} hrs` : ''}
                  {notes !== null && (
                    <span className={`unit-card__notes${notes ? ' is-ready' : ''}`}>
                      {notes === unit.topics.length ? 'Notes ready' : notes ? `Notes for ${notes} topics` : 'Notes coming soon'}
                    </span>
                  )}
                </p>
                <div className="unit-card__progress">
                  <ProgressBar value={stats.percent} label={`Unit ${roman(unit.number)} progress`} size="sm" />
                  <span>
                    {stats.done}/{stats.total}
                  </span>
                </div>
                <Button
                  to={notes === 0 ? unitPath(subject.id, unit.number) : topicPath(subject.id, unit.number, next.id)}
                  variant={stats.done > 0 && !stats.complete ? 'primary' : 'secondary'}
                  size="sm"
                  icon={ArrowRight}
                  className="unit-card__cta"
                >
                  {notes === 0 ? 'View topics' : label}
                </Button>
              </>
            )}
          </motion.li>
        )
      })}
    </motion.ol>
  )
}
