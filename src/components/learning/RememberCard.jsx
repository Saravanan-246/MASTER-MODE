import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import RichText from '../common/RichText.jsx'

const EASE = [0.22, 1, 0.36, 1]

// Active recall: try to answer first, then reveal.
function RecallCard({ prompt, answer }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  return (
    <li className={`recall__card${open ? ' is-open' : ''}`}>
      <button type="button" className="recall__button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span className="recall__q">
          <RichText text={prompt} />
        </span>
        <span className="recall__toggle">
          {open ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
          {open ? 'Hide' : 'Reveal'}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="recall__a"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <p>
              <RichText text={answer} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

// `items`: [{ prompt, answer }] or plain strings (shown as a note list).
export default function RememberCard({ items }) {
  const cards = items.filter((entry) => typeof entry === 'object')
  const lines = items.filter((entry) => typeof entry === 'string')
  return (
    <div className="recall">
      {cards.length > 0 && (
        <ul className="recall__grid">
          {cards.map((card) => (
            <RecallCard key={card.prompt} {...card} />
          ))}
        </ul>
      )}
      {lines.length > 0 && (
        <ul className="recall__lines">
          {lines.map((line) => (
            <li key={line}>
              <RichText text={line} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
