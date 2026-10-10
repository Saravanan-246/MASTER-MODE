import { Suspense, use, useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { useParams, useSearchParams } from 'react-router-dom'
import { ArrowRight, ListOrdered } from 'lucide-react'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import Sheet from '../components/common/Sheet.jsx'
import StudyShell from '../components/common/StudyShell.jsx'
import LearningModes from '../components/learning/LearningModes.jsx'
import TopicHeader from '../components/learning/TopicHeader.jsx'
import TopicPager, { MobileTopicBar } from '../components/learning/TopicPager.jsx'
import TopicProgress from '../components/learning/TopicProgress.jsx'
import TopicViewer from '../components/learning/TopicViewer.jsx'
import UnitProgress from '../components/unit/UnitProgress.jsx'
import UnitTopicList from '../components/unit/UnitTopicList.jsx'
import useProgress from '../hooks/useProgress.js'
import { studyLines } from '../data/microcopy.js'
import { findSubject, findUnit, topicNeighbours } from '../data/subjects.js'
import { loadUnitContent, topicContent } from '../lib/content.js'
import { isComplete, unitStats } from '../lib/progress.js'
import { MODE_PANEL_ID, MODES, modeTabId, roman, subjectPath, topicPath, unitPath } from '../lib/paths.js'
import './study.css'

const EASE = [0.22, 1, 0.36, 1]

function TopicScreen({ subject, unit, topic, position, content }) {
  const [params, setParams] = useSearchParams()
  const mode = MODES.includes(params.get('mode')) ? params.get('mode') : 'learn'
  const { progress, setComplete, recordVisit } = useProgress()
  const { scrollYProgress } = useScroll()
  const [sheetOpen, setSheetOpen] = useState(false)

  const notes = topicContent(content, topic.id)
  const done = isComplete(progress, subject.id, unit.number, topic.id)
  const stats = unitStats(progress, subject, unit)
  const { prev, next } = topicNeighbours(subject, unit.number, topic.id)
  const where = { subjectId: subject.id, unit: unit.number, topicId: topic.id }

  useEffect(() => {
    recordVisit({ subjectId: subject.id, unit: unit.number, topicId: topic.id })
  }, [recordVisit, subject.id, unit.number, topic.id])

  const changeMode = (next) => setParams(next === 'learn' ? {} : { mode: next }, { replace: true })
  const toggleDone = () => setComplete(where, !done)
  const topicList = (props) => (
    <UnitTopicList subject={subject} unit={unit} content={content} progress={progress} currentTopicId={topic.id} compact {...props} />
  )

  return (
    <StudyShell
      className="study--topic"
      progress={scrollYProgress}
      crumbs={[
        { label: 'Dashboard', to: '/dashboard' },
        { label: subject.shortTitle, to: subjectPath(subject.id) },
        { label: `Unit ${roman(unit.number)}`, to: unitPath(subject.id, unit.number) },
        { label: topic.title, to: topicPath(subject.id, unit.number, topic.id) },
      ]}
      actions={
        <button type="button" className="study-bar__topics" onClick={() => setSheetOpen(true)}>
          <ListOrdered size={18} strokeWidth={2.25} aria-hidden="true" />
          <span>Topics</span>
        </button>
      }
    >
      <title>{`${topic.title} · Unit ${roman(unit.number)} · ${subject.shortTitle}`}</title>

      <div className="page topic-page">
        <aside className="topic-page__aside" aria-label={`Unit ${roman(unit.number)} topics`}>
          <div className="topic-page__aside-inner">
            <p className="topic-page__aside-title">
              Unit {roman(unit.number)} · {unit.title}
            </p>
            <UnitProgress stats={stats} compact label="Unit progress" />
            {topicList()}
          </div>
        </aside>

        <motion.article
          className="topic-page__main"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <TopicHeader
            subject={subject}
            unit={unit}
            topic={topic}
            position={position}
            total={unit.topics.length}
            content={notes}
            done={done}
          />

          {notes ? (
            <>
              <LearningModes mode={mode} onChange={changeMode} />
              <div id={MODE_PANEL_ID} role="tabpanel" aria-labelledby={modeTabId(mode)}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: EASE }}
                  >
                    <TopicViewer content={notes} mode={mode} subjectId={subject.id} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <TopicProgress done={done} onToggle={toggleDone} unitStats={stats} />
            </>
          ) : (
            <EmptyState
              subjectId={subject.id}
              title={studyLines.notesPending}
              action={
                <Button to={unitPath(subject.id, unit.number)} variant="secondary" icon={ArrowRight}>
                  See Unit {roman(unit.number)} topics
                </Button>
              }
            >
              <p>
                <strong>{topic.title}</strong> is part of the Unit {roman(unit.number)} syllabus
                {topic.section ? ` (${topic.section})` : ''}. Its visual notes will appear here.
              </p>
            </EmptyState>
          )}

          <TopicPager subjectId={subject.id} unit={unit.number} prev={prev} next={next} mode={mode} />
        </motion.article>
      </div>

      {notes && (
        <MobileTopicBar subjectId={subject.id} prev={prev} next={next} mode={mode} done={done} onToggle={toggleDone} />
      )}

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title={`Unit ${roman(unit.number)} topics`}>
        <UnitProgress stats={stats} compact />
        {topicList({ onNavigate: () => setSheetOpen(false) })}
      </Sheet>
    </StudyShell>
  )
}

function TopicWithContent(props) {
  const content = use(loadUnitContent(props.subject.id, props.unit.number))
  return <TopicScreen {...props} content={content} />
}

function TopicSkeleton() {
  return (
    <div className="page topic-skeleton" aria-busy="true" aria-label="Loading topic">
      <span />
      <span />
      <span />
    </div>
  )
}

export default function TopicPage() {
  const { subjectId, unitId, topicId } = useParams()
  const subject = findSubject(subjectId)
  const unit = findUnit(subject, unitId)
  const index = unit ? unit.topics.findIndex((t) => t.id === topicId) : -1

  if (index < 0) {
    return (
      <StudyShell crumbs={[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Not found' }]}>
        <div className="page">
          <EmptyState
            subjectId={subject?.id}
            title="That topic is not in the syllabus." heading="h1"
            action={<Button to={unit ? unitPath(subject.id, unit.number) : '/dashboard'}>Go back</Button>}
          />
        </div>
      </StudyShell>
    )
  }

  return (
    <Suspense fallback={<TopicSkeleton />}>
      <TopicWithContent
        key={`${subjectId}/${unitId}/${topicId}`}
        subject={subject}
        unit={unit}
        topic={unit.topics[index]}
        position={index + 1}
      />
    </Suspense>
  )
}
