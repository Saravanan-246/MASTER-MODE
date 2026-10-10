import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { DifficultyBadge } from '../common/Badge.jsx'
import { topicContent } from '../../lib/content.js'
import { isComplete } from '../../lib/progress.js'
import { pad2, topicPath } from '../../lib/paths.js'
import './unit.css'

// Topics grouped under the syllabus' own sub-headings, in syllabus order.
function groupBySection(topics) {
  return topics.reduce((groups, topic, i) => {
    const section = topic.section ?? null
    const last = groups[groups.length - 1]
    if (!last || last.section !== section) groups.push({ section, items: [] })
    groups[groups.length - 1].items.push({ topic, number: i + 1 })
    return groups
  }, [])
}

// `content` may be null while the unit's notes are loading.
export default function UnitTopicList({ subject, unit, content, progress, currentTopicId, compact = false, onNavigate }) {
  return (
    <div className={`topics${compact ? ' topics--compact' : ''}`}>
      {groupBySection(unit.topics).map((group, g) => (
        <section key={group.section ?? g} className="topics__group" aria-label={group.section ?? undefined}>
          {group.section && <h3 className="topics__section">{group.section}</h3>}
          <ol className="topics__list">
            {group.items.map(({ topic, number }) => {
              const done = isComplete(progress, subject.id, unit.number, topic.id)
              const notes = content ? topicContent(content, topic.id) : undefined
              const current = topic.id === currentTopicId
              return (
                <li key={topic.id}>
                  <Link
                    to={topicPath(subject.id, unit.number, topic.id)}
                    className="topics__row"
                    aria-current={current ? 'page' : undefined}
                    data-done={done || undefined}
                    onClick={onNavigate}
                  >
                    <span className="topics__num">{pad2(number)}</span>
                    <span className="topics__body">
                      <span className="topics__title">{topic.title}</span>
                      {!compact && (
                        <span className="topics__meta">
                          {notes ? <DifficultyBadge level={notes.difficulty} /> : notes === null && 'Notes coming soon'}
                        </span>
                      )}
                    </span>
                    <span className="topics__state">
                      {done && <Check size={14} strokeWidth={3} aria-hidden="true" />}
                      {done && <span className="sr-only">, understood</span>}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
    </div>
  )
}
