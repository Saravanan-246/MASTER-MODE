import SubjectMascot from '../common/SubjectMascot.jsx'
import { Scribble, Sparkle } from '../Doodles.jsx'
import SubjectContinue from './SubjectContinue.jsx'
import SubjectProgress from './SubjectProgress.jsx'
import { studyLines } from '../../data/microcopy.js'
import './subject.css'

// Subject identity: mascot, course code, what the syllabus says the course
// is for, overall progress and one clear "continue studying" card.
export default function SubjectHero({ subject, stats, resume }) {
  return (
    <section className="subject-hero" data-subject={subject.id} aria-labelledby="subject-title">
      <div className="subject-hero__art" aria-hidden="true">
        <span className="subject-hero__halo" />
        <SubjectMascot subjectId={subject.id} size="xl" className="subject-hero__mascot" />
        <Sparkle className="subject-hero__sparkle" delay={0.6} />
      </div>

      <div className="subject-hero__text">
        <p className="eyebrow">
          {subject.code ?? 'Course code pending'}
          <span className="eyebrow__code">Semester {subject.semester}</span>
        </p>
        <h1 id="subject-title" className="subject-hero__title">
          {subject.title}
          <Scribble className="subject-hero__scribble" show delay={0.3} />
        </h1>

        {subject.syllabus ? (
          <div className="subject-hero__about">
            <p>This course is designed to help you learn and understand:</p>
            <ul>
              {subject.syllabus.preamble.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="subject-hero__about">{studyLines.syllabusPending} — units will appear here once it is added.</p>
        )}

        {resume && <SubjectContinue subject={subject} resume={resume} resumed={stats.done > 0 || Boolean(resume.at)} />}
      </div>

      {stats.total > 0 && <SubjectProgress stats={stats} />}
    </section>
  )
}
