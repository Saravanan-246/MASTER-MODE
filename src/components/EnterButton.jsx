import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const MAGNET_STRENGTH = 0.14
const MAGNET_SPRING = { stiffness: 220, damping: 18, mass: 0.4 }

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.035 },
  pressed: { scale: [0.95, 1.03, 1], transition: { duration: 0.45, times: [0, 0.5, 1] } },
}

const iconVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08 },
  pressed: { scale: 1.2, transition: { duration: 0.3 } },
}

// Two arrows swap on hover: the first slides out, the second slides in.
const arrowOutVariants = {
  rest: { x: 0, opacity: 1 },
  hover: { x: 22, opacity: 0 },
  pressed: { x: 22, opacity: 0 },
}

const arrowInVariants = {
  rest: { x: -22, opacity: 0 },
  hover: { x: 0, opacity: 1 },
  pressed: { x: 4, opacity: 1 },
}

// Primary CTA: leans toward the cursor and reports the centre of its red
// circle on click, so the study-mode takeover grows out of it.
export default function EnterButton({ onEnter, onHoverChange, entering }) {
  const buttonRef = useRef(null)
  const iconRef = useRef(null)
  const x = useSpring(0, MAGNET_SPRING)
  const y = useSpring(0, MAGNET_SPRING)

  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse' || entering) return
    const rect = buttonRef.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * MAGNET_STRENGTH)
    y.set((event.clientY - (rect.top + rect.height / 2)) * MAGNET_STRENGTH)
  }

  function resetMagnet() {
    x.set(0)
    y.set(0)
  }

  function handleFocus(event) {
    if (event.currentTarget.matches(':focus-visible')) onHoverChange(true)
  }

  function handleClick() {
    const rect = iconRef.current.getBoundingClientRect()
    resetMagnet()
    onEnter({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
  }

  return (
    <div className="enter-wrap">
      <span className="enter__glow" aria-hidden="true" />
      <motion.button
        ref={buttonRef}
        type="button"
        className="enter"
        style={{ x, y }}
        variants={buttonVariants}
        initial="rest"
        animate={entering ? 'pressed' : 'rest'}
        whileHover={entering ? undefined : 'hover'}
        whileTap={entering ? undefined : { scale: 0.96 }}
        onHoverStart={() => onHoverChange(true)}
        onHoverEnd={() => onHoverChange(false)}
        onFocus={handleFocus}
        onBlur={() => onHoverChange(false)}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetMagnet}
        onClick={handleClick}
        disabled={entering}
      >
        <span className="enter__label">Enter study mode</span>
        <motion.span ref={iconRef} className="enter__icon" variants={iconVariants} aria-hidden="true">
          <motion.span className="enter__arrow" variants={arrowOutVariants}>
            <ArrowRight size={18} strokeWidth={2.25} />
          </motion.span>
          <motion.span className="enter__arrow" variants={arrowInVariants}>
            <ArrowRight size={18} strokeWidth={2.25} />
          </motion.span>
        </motion.span>
      </motion.button>
    </div>
  )
}
