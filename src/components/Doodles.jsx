import { motion, useReducedMotion } from 'framer-motion'

// Hand-drawn accents for the "student notebook" layer. Strokes use
// currentColor so each placement picks its own ink, chalk or red.

const DRAW_EASE = [0.65, 0, 0.35, 1]

// A single stroke that can draw itself in (and back out when `show` drops).
function Stroke({ show = true, delay = 0, duration = 0.7, ...props }) {
  const reduce = useReducedMotion()
  return (
    <motion.path
      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
      animate={show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={reduce ? { duration: 0 } : { duration, delay: show ? delay : 0, ease: DRAW_EASE }}
      {...props}
    />
  )
}

function Doodle({ className = '', children, ...props }) {
  return (
    <svg
      className={`doodle ${className}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export function Scribble({ className, show, delay = 0 }) {
  return (
    <Doodle className={className} viewBox="0 0 300 24">
      <Stroke
        d="M6 15.5C58 9.6 121 6.8 181 8.4c40 1.1 76 3.3 113 2.2"
        strokeWidth={4}
        show={show}
        delay={delay}
      />
      <Stroke
        d="M44 20.5c55-3.9 123-5.4 196-3.1"
        strokeWidth={3}
        show={show}
        delay={delay + 0.32}
        duration={0.5}
      />
    </Doodle>
  )
}

export function HandCircle({ className, show, delay = 0 }) {
  return (
    <Doodle className={className} viewBox="0 0 64 40">
      <Stroke
        d="M40 6.5C27 3.6 9.8 7.6 5.6 17.4 1.4 27.2 15 34.8 31.6 34c16.6-.8 28.8-8 27-17.2C57 8.6 42 4.6 24.4 6.8"
        strokeWidth={2.2}
        show={show}
        delay={delay}
        duration={0.45}
      />
    </Doodle>
  )
}

export function HandArrow({ className }) {
  return (
    <Doodle className={className} viewBox="0 0 40 16" strokeWidth={2}>
      <path d="M3 9.5c9-1.6 21-2.3 33-1.4" />
      <path d="M29.5 3.2 36.4 8.3 30 13.4" />
    </Doodle>
  )
}

export function CurlyArrow({ className }) {
  return (
    <Doodle className={className} viewBox="0 0 56 44" strokeWidth={2.2}>
      <Stroke
        d="M52 38C40 40.5 27.6 37 24.4 28.4c-2.8-7.6 3-13.4 8.2-10.4 5.4 3.2 2 12-6.8 12.6C15.4 31.4 8 22.6 7 9"
        duration={0.6}
      />
      <Stroke d="M2.6 13.6 6.8 7.4l5.4 5.2" delay={0.5} duration={0.25} />
    </Doodle>
  )
}

export function Sparkle({ className, show = true, delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.svg
      className={`doodle ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      initial={reduce ? false : { scale: 0, rotate: -60 }}
      animate={show ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -60 }}
      transition={{ type: 'spring', stiffness: 260, damping: 14, delay: show ? delay : 0 }}
    >
      <path d="M12 1.8c.8 5.3 3.3 8.4 9.6 10.2-6.3 1.8-8.8 4.9-9.6 10.2-.8-5.3-3.3-8.4-9.6-10.2C8.7 10.2 11.2 7.1 12 1.8Z" />
    </motion.svg>
  )
}

export function Book({ className, delay = 0 }) {
  return (
    <Doodle className={className} viewBox="0 0 64 48" strokeWidth={2.2}>
      <Stroke d="M32 13C25 8 15.5 6.6 6 8.4v29.2c9.5-1.8 19-.4 26 4.6" delay={delay} />
      <Stroke d="M32 13c7-5 16.5-6.4 26-4.6v29.2c-9.5-1.8-19-.4-26 4.6" delay={delay + 0.15} />
      <Stroke d="M32 13v29" delay={delay + 0.3} duration={0.3} />
      <Stroke
        d="M12 16.4c4.8-.8 9.4-.4 14 1.4M12 22.6c4.8-.8 9.4-.4 14 1.4M38 17.8c4.6-1.8 9.2-2.2 14-1.4M38 24c4.6-1.8 9.2-2.2 14-1.4"
        strokeWidth={1.6}
        delay={delay + 0.45}
      />
    </Doodle>
  )
}

export function Pencil({ className, delay = 0 }) {
  return (
    <Doodle className={className} viewBox="0 0 64 64" strokeWidth={2.2}>
      <Stroke
        d="M16.5 40.6 41.8 15.3a4 4 0 0 1 5.6 0l1.3 1.3a4 4 0 0 1 0 5.6L23.4 47.5"
        delay={delay}
      />
      <Stroke d="M16.5 40.6 12 52l11.4-4.5" delay={delay + 0.35} duration={0.35} />
      <Stroke d="M37.6 19.5l6.9 6.9M20.4 44.2 44.9 19.7" strokeWidth={1.6} delay={delay + 0.5} />
      <path className="doodle__fill" d="M12 52l2.2-5.6 3.4 3.4Z" stroke="none" />
    </Doodle>
  )
}

export function Tape({ className }) {
  return (
    <svg
      className={`doodle ${className}`}
      viewBox="0 0 80 22"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 2.5 77 1.5l-2.4 4.1 3.8 4-3.6 4 3.2 4-2.4 3.2-71.2.8 2.4-4-4.6-3.8 4-4L2 6Z" />
    </svg>
  )
}
