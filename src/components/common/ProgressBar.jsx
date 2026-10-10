import { motion } from 'framer-motion'

const SPRING = { type: 'spring', stiffness: 120, damping: 22 }

export default function ProgressBar({ value, label, size = 'md', className = '' }) {
  const percent = Math.max(0, Math.min(100, value))
  return (
    <div
      className={`progress progress--${size} ${className}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
    >
      <motion.span
        className="progress__fill"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: percent / 100 }}
        transition={SPRING}
      />
    </div>
  )
}

export function ProgressRing({ value, label, size = 88, children }) {
  const percent = Math.max(0, Math.min(100, value))
  return (
    <div
      className="ring"
      style={{ '--ring-size': `${size}px` }}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
    >
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <circle className="ring__track" cx="22" cy="22" r="19" />
        <motion.circle
          className="ring__fill"
          cx="22"
          cy="22"
          r="19"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: percent / 100, opacity: percent > 0 ? 1 : 0 }}
          transition={SPRING}
        />
      </svg>
      <span className="ring__label">{children ?? `${percent}%`}</span>
    </div>
  )
}
