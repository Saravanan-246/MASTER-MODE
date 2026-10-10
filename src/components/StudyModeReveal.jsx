import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { focusLine } from '../data/microcopy.js'
import focusHeroImage from '../assets/focus-hero.jpg'

const EASE_OUT = [0.22, 1, 0.36, 1]
const EASE_IN_OUT = [0.76, 0, 0.24, 1]
// Length of the `.focus--enter` timeline in index.html (ends on "Let's study.").
const FOCUS_MS = 1650

// Takeover between the landing page and study mode.
// - Subject links: a red circle grows from `origin` ({ x, y, radius }), ~1.1s.
// - "Enter study mode": the focus scene from index.html, mirrored — two panels
//   close toward the centre and focus-hero.jpg travels right → left, ~1.65s.
export default function StudyModeReveal({ origin, onComplete, focusTransition = false }) {
  const reduce = useReducedMotion()
  const { x, y, radius } = origin

  // The focus scene runs on CSS keyframes, so finish on a timer. A ref keeps
  // the latest callback without restarting the timer.
  const complete = useRef(onComplete)
  useEffect(() => {
    complete.current = onComplete
  })
  useEffect(() => {
    if (!focusTransition) return
    const timer = setTimeout(() => complete.current(), FOCUS_MS)
    return () => clearTimeout(timer)
  }, [focusTransition])

  let reveal
  if (reduce) {
    reveal = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
  } else if (focusTransition) {
    // The scene's own panels do the covering.
    reveal = {}
  } else {
    reveal = {
      initial: { clipPath: `circle(0px at ${x}px ${y}px)` },
      animate: { clipPath: `circle(${radius}px at ${x}px ${y}px)` },
      transition: { duration: 0.7, delay: 0.15, ease: EASE_IN_OUT },
    }
  }

  return (
    <motion.div
      className={`study-reveal${focusTransition ? ' study-reveal--focus' : ''}`}
      aria-hidden="true"
      {...reveal}
    >
      {focusTransition ? (
        <FocusScene />
      ) : (
        <motion.p
          className="study-reveal__line"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 1], y: 0 }}
          transition={{
            opacity: { duration: reduce ? 0.45 : 0.62, delay: reduce ? 0 : 0.48, times: [0, 0.45, 1] },
            y: { duration: 0.4, delay: 0.48, ease: EASE_OUT },
          }}
          onAnimationComplete={onComplete}
        >
          {focusLine}
        </motion.p>
      )}
    </motion.div>
  )
}

// The other half of the transition: the page that was entered starts under
// the same red layer, which then fades away. After "Enter study mode" it holds
// the focus scene's last frame, opening the photo up as the dashboard appears.
export function StudyModeArrival({ focus = false }) {
  return (
    <motion.div
      className={`study-reveal study-reveal--out${focus ? ' study-reveal--focus' : ''}`}
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={focus ? { duration: 0.45, delay: 0.05, ease: EASE_OUT } : { duration: 0.6, delay: 0.1, ease: EASE_OUT }}
    >
      {focus ? <FocusScene settled /> : <p className="study-reveal__line">{focusLine}</p>}
    </motion.div>
  )
}

// Same markup and styles as the #splash intro in index.html, on the mirrored
// `.focus--enter` timeline. `settled` holds its last frame.
function FocusScene({ settled = false }) {
  return (
    <div className={`focus focus--enter${settled ? ' focus--settled' : ''}`}>
      <span className="focus__door focus__door--l" />
      <span className="focus__door focus__door--r" />
      <span className="focus__bg" />

      <div className="focus__stage">
        <div className="focus__media">
          <span className="focus__guide" />
          <div className="focus__rush">
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i} />
            ))}
          </div>

          <div className="focus__mover">
            <div className="focus__trails">
              {Array.from({ length: 3 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
            <div className="focus__push">
              <figure className="focus__card">
                <img src={focusHeroImage} width="736" height="1103" alt="" decoding="sync" />
              </figure>
              <span className="focus__brackets" />
              <span className="focus__ring" />
            </div>
          </div>
        </div>

        <div className="focus__copy">
          <p className="focus__title">
            <span className="focus__line">
              <span>
                <em>Study</em>
              </span>
            </span>
            <span className="focus__line">
              <span>
                Mode<span className="focus__dot">.</span>
              </span>
            </span>
            <svg
              className="focus__scribble"
              viewBox="0 0 300 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              focusable="false"
            >
              <path pathLength="1" strokeWidth="4" d="M6 15.5C58 9.6 121 6.8 181 8.4c40 1.1 76 3.3 113 2.2" />
            </svg>
          </p>

          <div className="focus__meter">
            <span className="focus__swap">
              <span className="focus__swap-from">Ready?</span>
              <span className="focus__swap-to">Let&apos;s study.</span>
            </span>
            <span className="focus__track">
              <span className="focus__fill" />
            </span>
            <span className="focus__pct" />
          </div>
        </div>
      </div>
    </div>
  )
}
