import { Link } from 'react-router-dom'
import Badge, { DifficultyBadge, DoneBadge } from '../common/Badge.jsx'
import RichText from '../common/RichText.jsx'
import SubjectMascot from '../common/SubjectMascot.jsx'
import { Scribble } from '../Doodles.jsx'
import { pad2, roman, subjectPath, unitPath } from '../../lib/paths.js'

// Answers "where am I?" and "what am I learning?" before anything else.
export default function TopicHeader({ subject, unit, topic, position, total, content, done }) {
  return (
    <header className="topic-head">
      <div className="topic-head__where">
        <Link to={subjectPath(subject.id)} className="topic-head__subject">
          <SubjectMascot subjectId={subject.id} size="xs" />
          {subject.shortTitle}
        </Link>
        <span aria-hidden="true">/</span>
        <Link to={unitPath(subject.id, unit.number)} className="topic-head__unit">
          Unit {roman(unit.number)}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="topic-head__count">
          Topic {pad2(position)} <span>of {pad2(total)}</span>
        </span>
      </div>

      <h1 className="topic-head__title">
        <span className="topic-head__title-text">{topic.title}</span>
        <Scribble className="topic-head__scribble" show delay={0.35} />
      </h1>

      {content?.intro && (
        <p className="topic-head__intro">
          <span className="topic-head__why">Why it matters</span>
          <RichText text={content.intro} />
        </p>
      )}

      <div className="topic-head__badges">
        <DifficultyBadge level={content?.difficulty} />
        {topic.section && <Badge>{topic.section}</Badge>}
        {done && <DoneBadge />}
      </div>
    </header>
  )
}
