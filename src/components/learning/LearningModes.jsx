import { motion } from 'framer-motion'
import { BookOpen, PenLine, Zap } from 'lucide-react'
import { MODE_PANEL_ID, MODES, modeTabId } from '../../lib/paths.js'

const META = {
  learn: { label: 'Learn', hint: 'Full explanation', icon: BookOpen },
  quick: { label: 'Quick', hint: 'Fast revision', icon: Zap },
  exam: { label: 'Exam', hint: 'Write the answer', icon: PenLine },
}

// Learn / Quick / Exam switch. Tabs pattern: arrow keys move between modes.
export default function LearningModes({ mode, onChange }) {
  function handleKeyDown(event) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
    if (!step) return
    event.preventDefault()
    const next = MODES[(MODES.indexOf(mode) + step + MODES.length) % MODES.length]
    onChange(next)
    document.getElementById(modeTabId(next))?.focus()
  }

  return (
    <div className="modes" role="tablist" aria-label="Learning mode" onKeyDown={handleKeyDown}>
      {MODES.map((id) => {
        const { label, hint, icon: Icon } = META[id]
        const selected = id === mode
        return (
          <button
            key={id}
            id={modeTabId(id)}
            type="button"
            role="tab"
            className="modes__tab"
            aria-selected={selected}
            aria-controls={MODE_PANEL_ID}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(id)}
          >
            {selected && (
              <motion.span
                layoutId="mode-indicator"
                className="modes__indicator"
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <Icon className="modes__icon" size={17} strokeWidth={2.25} aria-hidden="true" />
            <span className="modes__text">
              <span className="modes__label">{label}</span>
              <span className="modes__hint">{hint}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
