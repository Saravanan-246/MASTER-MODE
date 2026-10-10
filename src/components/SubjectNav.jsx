import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { HandArrow, HandCircle } from './Doodles.jsx'
import { subjects } from '../data/subjects.js'

const EASE = [0.22, 1, 0.36, 1]
const SWIPE_THRESHOLD = 40
const MARKER_SPRING = { type: 'spring', stiffness: 420, damping: 36 }

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const slideVariants = {
  enter: (direction) => ({ x: direction >= 0 ? 32 : -32, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: EASE } },
  exit: (direction) => ({ x: direction >= 0 ? -32 : 32, opacity: 0, transition: { duration: 0.2 } }),
}

const number = (i) => String(i + 1).padStart(2, '0')

function centerOf(element) {
  const rect = element.getBoundingClientRect()
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

// Desktop: all six subjects in a rail. Narrow screens: a one-at-a-time ticker.
// CSS shows exactly one of them.
export default function SubjectNav({ active, onActiveChange, onOpen, onBrowse }) {
  return (
    <nav className="subjects" aria-label="Subjects">
      <SubjectRail active={active} onActiveChange={onActiveChange} onOpen={onOpen} />
      <SubjectTicker onOpen={onOpen} onBrowse={onBrowse} />
    </nav>
  )
}

function SubjectRail({ active, onActiveChange, onOpen }) {
  return (
    <ol
      className="rail"
      data-has-active={active !== null || undefined}
      onMouseLeave={() => onActiveChange(null)}
    >
      {subjects.map((subject, i) => {
        const isActive = active === i
        return (
          <motion.li key={subject.id} variants={itemVariants}>
            <button
              type="button"
              className="rail__item"
              data-active={isActive || undefined}
              aria-label={`${number(i)} ${subject.title}, ${subject.units.length} units. Open in study mode`}
              onMouseEnter={() => onActiveChange(i)}
              onFocus={() => onActiveChange(i)}
              onBlur={() => onActiveChange(null)}
              onClick={(event) => onOpen(i, centerOf(event.currentTarget))}
            >
              <span className="rail__track" aria-hidden="true">
                {isActive && (
                  <motion.span layoutId="rail-marker" className="rail__marker" transition={MARKER_SPRING} />
                )}
              </span>
              <span className="rail__head">
                <span className="rail__index">
                  {number(i)}
                  <HandCircle className="rail__circle" show={isActive} />
                </span>
                <span className="rail__units">
                  {subject.units.length} units
                  <ArrowUpRight size={12} strokeWidth={2.5} aria-hidden="true" />
                </span>
              </span>
              <span className="rail__title">{subject.title}</span>
            </button>
          </motion.li>
        )
      })}
    </ol>
  )
}

function SubjectTicker({ onOpen, onBrowse }) {
  const [[index, direction], setPosition] = useState([0, 0])
  const [touched, setTouched] = useState(false)
  const dragged = useRef(false)
  const subject = subjects[index]

  function step(delta) {
    setPosition(([i]) => [(i + delta + subjects.length) % subjects.length, delta])
    setTouched(true)
    onBrowse()
  }

  function handleDragEnd(_, info) {
    const swipe = info.offset.x + info.velocity.x * 0.2
    if (Math.abs(swipe) > SWIPE_THRESHOLD) step(swipe < 0 ? 1 : -1)
  }

  function handleOpen(event) {
    if (dragged.current) return
    onOpen(index, centerOf(event.currentTarget))
  }

  return (
    <div className="ticker" role="group" aria-roledescription="carousel" aria-label="Subjects">
      <div className="ticker__top" aria-hidden="true">
        <span className="ticker__segments">
          {subjects.map((s, i) => (
            <span key={s.id} data-active={i === index || undefined} />
          ))}
        </span>
        <AnimatePresence>
          {!touched && (
            <motion.span className="ticker__hint" exit={{ opacity: 0, x: 8 }}>
              swipe <HandArrow className="ticker__hint-arrow" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="ticker__row">
        <button type="button" className="ticker__arrow" aria-label="Previous subject" onClick={() => step(-1)}>
          <ChevronLeft size={18} strokeWidth={2.25} aria-hidden="true" />
        </button>

        <motion.div
          className="ticker__viewport"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onPointerDown={() => {
            dragged.current = false
          }}
          onDragStart={() => {
            dragged.current = true
          }}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.button
              key={subject.id}
              type="button"
              className="ticker__item"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              aria-label={`${subject.title}, ${subject.units.length} units. Open in study mode`}
              onClick={handleOpen}
            >
              <span className="ticker__count">
                {number(index)}
                <span> / {number(subjects.length - 1)}</span>
              </span>
              <span className="ticker__title">{subject.title}</span>
            </motion.button>
          </AnimatePresence>
        </motion.div>

        <button type="button" className="ticker__arrow" aria-label="Next subject" onClick={() => step(1)}>
          <ChevronRight size={18} strokeWidth={2.25} aria-hidden="true" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {`Subject ${index + 1} of ${subjects.length}: ${subject.title}`}
      </p>
    </div>
  )
}
