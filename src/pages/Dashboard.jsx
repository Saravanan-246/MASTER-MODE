import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import ProgressBar from '../components/common/ProgressBar.jsx'
import StudyShell from '../components/common/StudyShell.jsx'
import SubjectMascot from '../components/common/SubjectMascot.jsx'
import { HandArrow, Scribble } from '../components/Doodles.jsx'
import { StudyModeArrival } from '../components/StudyModeReveal.jsx'
import useProgress from '../hooks/useProgress.js'
import { studyLines } from '../data/microcopy.js'
import { findSubject, subjects } from '../data/subjects.js'
import { semesterStats, subjectStats } from '../lib/progress.js'
import { roman, subjectPath } from '../lib/paths.js'
import { readStorage, writeStorage } from '../lib/storage.js'
import subjectHero from '../assets/subject-hero.jpg'
import './study.css'

const EASE = [0.22, 1, 0.36, 1]
const grid = { hidden: {}, shown: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }
const rise = { hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }

// Subjects hero art: plays once when it scrolls into view. Its own variant
// names, so the page's "hidden → shown" stagger doesn't start it early.
const art = { off: {}, on: { transition: { staggerChildren: 0.12 } } }
const artFrame = { off: { opacity: 0, y: 20 }, on: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }
const artBlock = {
  off: { opacity: 0, x: 0, y: 0 },
  on: {
    opacity: 1,
    x: 14,
    y: 14,
    transition: { duration: 0.55, delay: 0.35, ease: EASE, opacity: { duration: 0.2, delay: 0.3 } },
  },
}
const artMark = { off: { opacity: 0 }, on: { opacity: 1, transition: { duration: 0.5, delay: 0.45 } } }
// How long a clicked subject card holds the spotlight before opening.
const SELECT_MS = 240
const COUNT_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
// One-time "open subjects" reveal, remembered per browser. Matches the
// staggered timeline in study.css (last card settles at ~1.15s).
const REVEAL_KEY = 'semester-study.subjects-revealed'
const REVEAL_MS = 1200

function SubjectCard({ subject, progress, index, selected, onOpen }) {
  const stats = subjectStats(progress, subject)
  const pending = stats.total === 0
  return (
    <motion.li
      className={`subject-card${pending ? ' is-pending' : ''}${selected ? ' is-selected' : ''}`}
      data-subject={subject.id}
      style={{ '--i': index }}
      variants={rise}
    >
      <span className="subject-card__index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <SubjectMascot subjectId={subject.id} size="md" className="subject-card__mascot" />
      <div className="subject-card__body">
        <h3 className="subject-card__title">
          <Link to={subjectPath(subject.id)} className="subject-card__link" onClick={(e) => onOpen(e, subject.id)}>
            {subject.title}
          </Link>
        </h3>
        {pending ? (
          <p className="subject-card__meta">{studyLines.syllabusPending}</p>
        ) : (
          <>
            <p className="subject-card__meta">
              {stats.done} of {stats.total} topics · Unit {roman(stats.currentUnit)}
            </p>
            <ProgressBar value={stats.percent} label={`${subject.title} progress`} size="sm" />
          </>
        )}
      </div>
      <span className="subject-card__go" aria-hidden="true">
        <ArrowRight size={18} strokeWidth={2.4} />
      </span>
    </motion.li>
  )
}

export default function Dashboard() {
  const { state } = useLocation()
  const [params] = useSearchParams()
  const { progress } = useProgress()
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const [selected, setSelected] = useState(null)
  const openTimer = useRef(null)
  const subjectsRef = useRef(null)
  const subjectsInView = useInView(subjectsRef, { once: true, amount: 0.3 })

  // 'locked' (first visit on this browser) → 'opening' → 'open'. Read before
  // the first paint, so a revealed section never flashes its locked state.
  const [reveal, setReveal] = useState(() => (readStorage(REVEAL_KEY, false) === true ? 'open' : 'locked'))
  const revealStarted = useRef(false)
  const revealTimer = useRef(null)
  const focusFirstCard = useRef(false)

  useEffect(
    () => () => {
      clearTimeout(openTimer.current)
      clearTimeout(revealTimer.current)
    },
    [],
  )

  // Keyboard users who opened the subjects land on the first one.
  useEffect(() => {
    if (reveal !== 'open' || !focusFirstCard.current) return
    focusFirstCard.current = false
    subjectsRef.current?.querySelector('.subject-card__link')?.focus()
  }, [reveal])

  // Older links used /dashboard?subject=<id>; subjects now have their own page.
  const legacySubject = findSubject(params.get('subject'))
  if (legacySubject) return <Navigate to={subjectPath(legacySubject.id)} replace state={state} />

  // The clicked card takes the spotlight for a moment, then its subject
  // opens. Modified clicks (new tab, etc.) keep the browser's behaviour.
  function openSubject(event, subjectId) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (selected) return
    if (reduceMotion) {
      navigate(subjectPath(subjectId))
      return
    }
    setSelected(subjectId)
    openTimer.current = setTimeout(() => navigate(subjectPath(subjectId)), SELECT_MS)
  }

  // Saved at the start: if the page reloads mid-reveal, the subjects are
  // simply shown, never left hidden.
  function openSubjects(event) {
    if (revealStarted.current) return
    revealStarted.current = true
    focusFirstCard.current = event.currentTarget.matches(':focus-visible')
    writeStorage(REVEAL_KEY, true)
    setReveal('opening')
    // Reduced motion: the cards appear at once (no keyframes run); the
    // disabled trigger lingers, invisible, just long enough to absorb a
    // double click so it can't land on the card beneath.
    revealTimer.current = setTimeout(() => setReveal('open'), reduceMotion ? 300 : REVEAL_MS)
  }

  const semester = semesterStats(progress, subjects)
  const pendingCount = subjects.filter((s) => subjectStats(progress, s).total === 0).length

  return (
    <StudyShell
      crumbs={[{ label: 'Dashboard', to: '/dashboard' }]}
      actions={
        <Link to="/" state={{ returning: true }} className="study-bar__link">
          <ArrowLeft size={16} aria-hidden="true" />
          Home
        </Link>
      }
    >
      <title>Dashboard · Semester Study</title>
      {state?.fromLanding && <StudyModeArrival focus={state.focusTransition} />}

      <motion.div className="page dash" variants={grid} initial="hidden" animate="shown">
        <section className="dash-hero" aria-labelledby="dash-title">
          <motion.div className="dash-hero__intro" variants={rise}>
            <p className="eyebrow">Semester V</p>
            <h1 id="dash-title" className="page-title">
              Your semester
              <Scribble className="page-title__scribble" show delay={0.4} />
            </h1>
            <p className="dash-hero__lead">
              <strong>{semester.done}</strong> of {semester.total} topics understood
              {pendingCount > 0 && <span> · {pendingCount} subjects waiting for their syllabus</span>}
            </p>
            <ProgressBar value={semester.percent} label="Semester progress" size="lg" />
          </motion.div>
        </section>

        <section ref={subjectsRef} className="subject-worlds" data-reveal={reveal} aria-labelledby="subjects-title">
          <div className="subject-worlds__intro">
            <p className="eyebrow">Choose your world</p>
            <h2 id="subjects-title" className="subject-worlds__title">
              Subjects<span className="subject-worlds__dot">.</span>
              <Scribble className="subject-worlds__scribble" show={subjectsInView} delay={0.3} />
            </h2>
            <p className="subject-worlds__lead">
              {COUNT_WORDS[subjects.length] ?? subjects.length} worlds to study this semester. Each one opens into its
              units and topics.
            </p>
          </div>

          <motion.figure className="subjects-art" variants={art} initial="off" animate={subjectsInView ? 'on' : 'off'}>
            <motion.span className="subjects-art__block" variants={artBlock} aria-hidden="true" />
            <motion.div className="subjects-art__frame" variants={artFrame}>
              <img src={subjectHero} width="1031" height="1525" alt="" loading="lazy" decoding="async" />
            </motion.div>
            <motion.span className="subjects-art__crop subjects-art__crop--tl" variants={artMark} aria-hidden="true" />
            <motion.span className="subjects-art__crop subjects-art__crop--br" variants={artMark} aria-hidden="true" />
            <motion.span className="subjects-art__label" variants={artMark} aria-hidden="true">
              Semester V · Subjects
            </motion.span>
            <motion.figcaption className="subjects-art__note" variants={artMark} aria-hidden="true">
              <HandArrow className="subjects-art__arrow" />
              pick one. go deep.
            </motion.figcaption>
          </motion.figure>

          <motion.ul
            id="subject-grid"
            className={`subject-grid${selected ? ' has-selected' : ''}`}
            variants={grid}
          >
            {subjects.map((subject, index) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                progress={progress}
                index={index}
                selected={selected === subject.id}
                onOpen={openSubject}
              />
            ))}
          </motion.ul>

          {reveal !== 'open' && (
            <>
              <span className="subject-worlds__seam" aria-hidden="true" />
              <button
                type="button"
                className="subject-worlds__open"
                onClick={openSubjects}
                disabled={reveal === 'opening'}
                aria-controls="subject-grid"
                aria-expanded={reveal === 'opening'}
                aria-label={`Open the ${subjects.length} subjects`}
              >
                <span className="subject-worlds__open-plate" aria-hidden="true" />
                <span className="subject-worlds__open-face" aria-hidden="true">
                  <span className="subject-worlds__open-knob">
                    <ArrowDown className="subject-worlds__open-arrow" size={18} strokeWidth={2.4} />
                  </span>
                  <span className="subject-worlds__open-text">
                    <span className="subject-worlds__open-meta">
                      <b>{String(subjects.length).padStart(2, '0')}</b> worlds · sealed
                    </span>
                    <span className="subject-worlds__open-label">
                      Open <em>subjects</em>
                    </span>
                    <svg
                      className="subject-worlds__open-mark"
                      viewBox="0 0 120 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      focusable="false"
                    >
                      <path pathLength="1" d="M2 6.5C30 3.4 72 2.4 118 5" />
                    </svg>
                  </span>
                </span>
              </button>
            </>
          )}
        </section>
      </motion.div>
    </StudyShell>
  )
}
