import SubjectMascot from '../common/SubjectMascot.jsx'
import { Scribble } from '../Doodles.jsx'
import { studyLines } from '../../data/microcopy.js'
import { roman } from '../../lib/paths.js'
import './unit.css'

export default function UnitHeader({ subject, unit, overview }) {
  const sections = new Set(unit.topics.map((t) => t.section).filter(Boolean)).size
  return (
    <header className="unit-head">
      <p className="eyebrow">
        <SubjectMascot subjectId={subject.id} size="xs" />
        {subject.title}
        {subject.code && <span className="eyebrow__code">{subject.code}</span>}
      </p>
      <h1 className="unit-head__title">
        <span className="unit-head__roman">Unit {roman(unit.number)}</span>
        <span className="sr-only">: </span>
        <span className="unit-head__name">{unit.title ?? studyLines.syllabusPending}</span>
        {unit.title && <Scribble className="unit-head__scribble" show delay={0.3} />}
      </h1>
      {overview && <p className="unit-head__overview">{overview}</p>}
      {unit.topics.length > 0 && (
        <ul className="facts">
          <li>
            <strong>{unit.topics.length}</strong> topics
          </li>
          {unit.hours && (
            <li>
              <strong>{unit.hours}</strong> hours in syllabus
            </li>
          )}
          {sections > 0 && (
            <li>
              <strong>{sections}</strong> parts
            </li>
          )}
        </ul>
      )}
    </header>
  )
}
