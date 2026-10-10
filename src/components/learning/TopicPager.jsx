import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, ListOrdered } from 'lucide-react'
import { roman, topicPath, unitPath } from '../../lib/paths.js'

function Neighbour({ subjectId, entry, unit, mode, direction }) {
  const Icon = direction === 'prev' ? ArrowLeft : ArrowRight
  const crossesUnit = entry.unit !== unit
  return (
    <Link to={topicPath(subjectId, entry.unit, entry.topic.id, mode)} className={`pager__link pager__link--${direction}`} rel={direction}>
      <Icon className="pager__icon" size={18} strokeWidth={2.25} aria-hidden="true" />
      <span className="pager__text">
        <span className="pager__eyebrow">
          {direction === 'prev' ? 'Previous' : 'Next'}
          {crossesUnit && ` · Unit ${roman(entry.unit)}`}
        </span>
        <span className="pager__title">{entry.topic.title}</span>
      </span>
    </Link>
  )
}

// Previous / next topic at the end of the page. Keeps the current mode.
export default function TopicPager({ subjectId, unit, prev, next, mode }) {
  return (
    <nav className="pager" aria-label="Topic navigation">
      {prev ? <Neighbour subjectId={subjectId} entry={prev} unit={unit} mode={mode} direction="prev" /> : <span />}
      {next ? (
        <Neighbour subjectId={subjectId} entry={next} unit={unit} mode={mode} direction="next" />
      ) : (
        <Link to={unitPath(subjectId, unit)} className="pager__link pager__link--next">
          <ListOrdered className="pager__icon" size={18} strokeWidth={2.25} aria-hidden="true" />
          <span className="pager__text">
            <span className="pager__eyebrow">All done here</span>
            <span className="pager__title">Back to Unit {roman(unit)}</span>
          </span>
        </Link>
      )}
    </nav>
  )
}

// Phones: thumb-reach bar with previous, understood toggle and next.
export function MobileTopicBar({ subjectId, prev, next, mode, done, onToggle }) {
  return (
    <nav className="thumbbar" aria-label="Topic controls">
      {prev ? (
        <Link to={topicPath(subjectId, prev.unit, prev.topic.id, mode)} className="thumbbar__nav" aria-label={`Previous topic: ${prev.topic.title}`}>
          <ChevronLeft size={22} strokeWidth={2.25} aria-hidden="true" />
        </Link>
      ) : (
        <span className="thumbbar__nav is-disabled" aria-hidden="true">
          <ChevronLeft size={22} strokeWidth={2.25} />
        </span>
      )}

      <button type="button" className={`thumbbar__done${done ? ' is-done' : ''}`} onClick={onToggle}>
        <Check size={18} strokeWidth={2.75} aria-hidden="true" />
        {done ? 'Understood' : 'Mark understood'}
      </button>

      {next ? (
        <Link to={topicPath(subjectId, next.unit, next.topic.id, mode)} className="thumbbar__nav" aria-label={`Next topic: ${next.topic.title}`}>
          <ChevronRight size={22} strokeWidth={2.25} aria-hidden="true" />
        </Link>
      ) : (
        <span className="thumbbar__nav is-disabled" aria-hidden="true">
          <ChevronRight size={22} strokeWidth={2.25} />
        </span>
      )}
    </nav>
  )
}
