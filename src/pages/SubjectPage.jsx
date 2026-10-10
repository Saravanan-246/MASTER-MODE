import { Suspense, use } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import StudyShell from '../components/common/StudyShell.jsx'
import { StudyModeArrival } from '../components/StudyModeReveal.jsx'
import SubjectHero from '../components/subject/SubjectHero.jsx'
import SubjectUnitGrid from '../components/subject/SubjectUnitGrid.jsx'
import useProgress from '../hooks/useProgress.js'
import { findSubject } from '../data/subjects.js'
import { loadSubjectContent } from '../lib/content.js'
import { subjectResumeTarget, subjectStats } from '../lib/progress.js'
import './study.css'

function SubjectScreen({ subject, contents }) {
  const { state } = useLocation()
  const { progress } = useProgress()
  const stats = subjectStats(progress, subject)
  const resume = subjectResumeTarget(progress, subject)

  return (
    <StudyShell
      crumbs={[
        { label: 'Dashboard', to: '/dashboard' },
        { label: subject.shortTitle, to: `/subject/${subject.id}` },
      ]}
    >
      <title>{`${subject.title} · Semester Study`}</title>
      {state?.fromLanding && <StudyModeArrival />}
      <div className="page">
        <SubjectHero subject={subject} stats={stats} resume={resume} />
        <section aria-labelledby="units-title">
          <h2 id="units-title" className="section-title">
            Units
          </h2>
          <SubjectUnitGrid subject={subject} progress={progress} contents={contents} />
        </section>
        {subject.syllabus?.textbook && (
          <p className="page-footnote">
            <strong>Text book:</strong> {subject.syllabus.textbook}
          </p>
        )}
      </div>
    </StudyShell>
  )
}

function SubjectWithContent({ subject }) {
  const contents = use(loadSubjectContent(subject))
  return <SubjectScreen subject={subject} contents={contents} />
}

export default function SubjectPage() {
  const { subjectId } = useParams()
  const subject = findSubject(subjectId)

  if (!subject) {
    return (
      <StudyShell crumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Not found' }]}>
        <div className="page">
          <EmptyState title="That subject is not in this semester." heading="h1" action={<Button to="/dashboard">Go to dashboard</Button>} />
        </div>
      </StudyShell>
    )
  }

  // Render immediately; unit notes counts fill in once loaded.
  return (
    <Suspense fallback={<SubjectScreen subject={subject} contents={null} />}>
      <SubjectWithContent subject={subject} />
    </Suspense>
  )
}
