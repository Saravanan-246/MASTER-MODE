import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import Brand from '../components/Brand.jsx'
import EnterButton from '../components/EnterButton.jsx'
import LandingScene from '../components/LandingScene.jsx'
import StudyModeReveal from '../components/StudyModeReveal.jsx'
import SubjectNav from '../components/SubjectNav.jsx'
import { CurlyArrow, Scribble, Sparkle } from '../components/Doodles.jsx'
import useFontsReady from '../hooks/useFontsReady.js'
import { whispers } from '../data/microcopy.js'
import { subjects, totalUnits } from '../data/subjects.js'
import { preloadStudyPages } from '../lib/pages.js'
import { subjectPath } from '../lib/paths.js'

const EASE = [0.22, 1, 0.36, 1]
const PARALLAX_SPRING = { stiffness: 50, damping: 20, mass: 0.8 }
const FLASH_MS = 2600

const headerVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.15, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.04 } },
}

// Each headline line is masked, so the words rise into place.
const lineVariants = {
  hidden: { y: '115%' },
  visible: { y: '0%', transition: { duration: 1, ease: EASE } },
  exit: { y: '-12%', opacity: 0, transition: { duration: 0.4, ease: EASE } },
}

const riseVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.35, ease: EASE } },
}

const navVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.85, ease: EASE, staggerChildren: 0.05, delayChildren: 0.95 },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.3 } },
}

export default function Landing() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const reduceMotion = useReducedMotion()
  const fontsReady = useFontsReady()

  const [reveal, setReveal] = useState(null)
  const [activeSubject, setActiveSubject] = useState(null)
  const [ctaHovered, setCtaHovered] = useState(false)
  const [flash, setFlash] = useState(() =>
    state?.returning ? { text: whispers.returning, id: 0 } : null,
  )
  const entering = reveal !== null

  useEffect(() => {
    if (!flash) return
    const timer = setTimeout(() => setFlash(null), FLASH_MS)
    return () => clearTimeout(timer)
  }, [flash])

  // Pointer position as springs in -0.5..0.5; layers map it to their own depth.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, PARALLAX_SPRING)
  const springY = useSpring(pointerY, PARALLAX_SPRING)
  const copyX = useTransform(springX, (v) => v * 5)
  const copyY = useTransform(springY, (v) => v * 4)

  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse' || reduceMotion || entering) return
    pointerX.set(event.clientX / window.innerWidth - 0.5)
    pointerY.set(event.clientY / window.innerHeight - 0.5)
  }

  function resetPointer() {
    pointerX.set(0)
    pointerY.set(0)
  }

  function enterStudyMode(origin, subjectId = null, focusTransition = false) {
    if (entering) return
    resetPointer()
    // Radius that reaches the farthest viewport corner from the origin.
    const radius = Math.hypot(
      Math.max(origin.x, window.innerWidth - origin.x),
      Math.max(origin.y, window.innerHeight - origin.y),
    )
    setReveal({ ...origin, radius, subjectId, focusTransition })
    // Fetch the study pages while the takeover plays.
    preloadStudyPages()
  }

  function finishEnter() {
    const to = reveal.subjectId ? subjectPath(reveal.subjectId) : '/dashboard'
    navigate(to, {
      state: { fromLanding: true, focusTransition: reveal.focusTransition },
    })
  }

  const phase = entering ? 'exit' : fontsReady ? 'visible' : 'hidden'
  let whisper = null
  if (phase === 'visible') {
    if (ctaHovered) whisper = whispers.cta
    else if (activeSubject !== null) whisper = whispers.subject
    else whisper = flash?.text ?? null
  }

  return (
    <div
      className="landing"
      data-entering={entering || undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.header className="landing__header" variants={headerVariants} initial="hidden" animate={phase}>
        <Brand />
        <p className="landing__meta">
          <span>
            <b>{subjects.length}</b> Subjects
          </span>
          <span className="landing__meta-dot" aria-hidden="true">
            ·
          </span>
          <span>
            <b>{totalUnits}</b> Units
          </span>
        </p>
      </motion.header>

      {/* After the header so the framed photo follows it in the portrait column. */}
      <LandingScene pointerX={springX} pointerY={springY} entering={entering} />

      <main className="landing__main">
        <motion.div className="hero-anchor" style={{ x: copyX, y: copyY }}>
          <motion.section
            className="hero"
            aria-labelledby="hero-title"
            variants={heroVariants}
            initial="hidden"
            animate={phase}
          >
            <h1 id="hero-title" className="hero__title">
              <span className="hero__line">
                <motion.span variants={lineVariants}>Master your</motion.span>
              </span>
              <span className="hero__accent">
                <span className="hero__line">
                  <motion.span variants={lineVariants}>
                    <em>Semester</em>
                    <span className="hero__dot">.</span>
                  </motion.span>
                </span>
                <Scribble className="hero__scribble" show={phase === 'visible'} delay={1.05} />
                <Sparkle className="hero__sparkle" show={phase === 'visible'} delay={1.4} />
              </span>
            </h1>

            <motion.p className="hero__lead" variants={riseVariants}>
              Six subjects. Thirty units. One focused study space.
            </motion.p>

            <motion.div className="hero__cta" variants={riseVariants}>
              <EnterButton
                onEnter={(origin) => enterStudyMode(origin, null, true)}
                onHoverChange={setCtaHovered}
                entering={entering}
              />
            </motion.div>

            <Whisper text={whisper} />
          </motion.section>
        </motion.div>
      </main>

      <motion.footer className="landing__nav" variants={navVariants} initial="hidden" animate={phase}>
        <SubjectNav
          active={activeSubject}
          onActiveChange={setActiveSubject}
          onOpen={(index, origin) => enterStudyMode(origin, subjects[index].id)}
          onBrowse={() => setFlash({ text: whispers.subject, id: Date.now() })}
        />
      </motion.footer>

      {reveal && (
        <StudyModeReveal
          origin={reveal}
          onComplete={finishEnter}
          focusTransition={reveal.focusTransition}
        />
      )}
    </div>
  )
}

// A small sticky-note line near the CTA. Purely decorative flavour, so it is
// hidden from assistive tech.
function Whisper({ text }) {
  return (
    <div className="whisper" aria-hidden="true">
      <AnimatePresence mode="wait">
        {text && (
          <motion.p
            key={text}
            className="whisper__chip"
            initial={{ opacity: 0, y: 6, rotate: -7 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <CurlyArrow className="whisper__arrow" />
            {text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
