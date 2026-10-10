import { Suspense, use } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import StudyShell from '../components/common/StudyShell.jsx'
import UnitHeader from '../components/unit/UnitHeader.jsx'
import UnitLearningMap from '../components/unit/UnitLearningMap.jsx'
import UnitProgress from '../components/unit/UnitProgress.jsx'
import UnitTopicList from '../components/unit/UnitTopicList.jsx'
import useProgress from '../hooks/useProgress.js'
import { studyLines } from '../data/microcopy.js'
import { findSubject, findUnit } from '../data/subjects.js'
import { loadUnitContent } from '../lib/content.js'
import { isComplete, nextTopicInUnit, unitStats } from '../lib/progress.js'
import { roman, subjectPath, topicPath, unitPath } from '../lib/paths.js'
import './study.css'

function UnitScreen({ subject, unit, content }) {
  const { progress } = useProgress()
  const stats = unitStats(progress, subject, unit)
  const next = nextTopicInUnit(progress, subject, unit)
  const started = unit.topics.some((t) => isComplete(progress, subject.id, unit.number, t.id))
  const cta = next && (
    <Button to={topicPath(subject.id, unit.number, next.id)} icon={ArrowRight}>
      {stats.complete ? 'Review' : started ? 'Continue' : 'Start'}
    </Button>
  )

  return (
    <StudyShell
      crumbs={[
        { label: 'Dashboard', to: '/dashboard' },
        { label: subject.shortTitle, to: subjectPath(subject.id) },
        { label: `Unit ${roman(unit.number)}`, to: unitPath(subject.id, unit.number) },
      ]}
    >
      <title>{`Unit ${roman(unit.number)}${unit.title ? ` · ${unit.title}` : ''} · ${subject.shortTitle}`}</title>
      <div className="page unit-page">
        <div className="unit-page__main">
          <UnitHeader subject={subject} unit={unit} overview={content?.overview} />

          {unit.topics.length > 0 ? (
            <>
              <div className="unit-page__sticky">
                <UnitProgress stats={stats} action={cta} compact />
              </div>

              <section className="unit-page__section" aria-labelledby="map-title">
                <h2 id="map-title" className="section-title">
                  Learning map
                </h2>
                <UnitLearningMap subject={subject} unit={unit} content={content} progress={progress} />
              </section>

              <section className="unit-page__section" aria-labelledby="topics-title">
                <h2 id="topics-title" className="section-title">
                  Topics
                </h2>
                <UnitTopicList subject={subject} unit={unit} content={content} progress={progress} />
              </section>
            </>
          ) : (
            <EmptyState
              subjectId={subject.id}
              title={studyLines.syllabusPending}
              action={<Button to={subjectPath(subject.id)} variant="secondary">Back to {subject.shortTitle}</Button>}
            >
              <p>Unit titles and topics appear here as soon as this subject's syllabus is added.</p>
            </EmptyState>
          )}
        </div>

        {unit.topics.length > 0 && (
          <aside className="unit-page__aside" aria-label="Unit progress">
            <UnitProgress stats={stats} action={cta} />
          </aside>
        )}
      </div>
    </StudyShell>
  )
}

function UnitWithContent({ subject, unit }) {
  const content = use(loadUnitContent(subject.id, unit.number))
  return <UnitScreen subject={subject} unit={unit} content={content} />
}

export default function UnitPage() {
  const { subjectId, unitId } = useParams()
  const subject = findSubject(subjectId)
  const unit = findUnit(subject, unitId)

  if (!unit) {
    return (
      <StudyShell crumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Not found' }]}>
        <div className="page">
          <EmptyState title="That unit does not exist." heading="h1" action={<Button to="/dashboard">Go to dashboard</Button>} />
        </div>
      </StudyShell>
    )
  }

  return (
    <Suspense fallback={<UnitScreen subject={subject} unit={unit} content={null} />}>
      <UnitWithContent subject={subject} unit={unit} />
    </Suspense>
  )
}
