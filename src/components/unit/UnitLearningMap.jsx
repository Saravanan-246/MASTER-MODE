import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { isComplete, nextTopicInUnit } from '../../lib/progress.js'
import './unit.css'

const EASE = [0.22, 1, 0.36, 1]
const list = { hidden: {}, shown: { transition: { staggerChildren: 0.1 } } }
const stageIn = { hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }

// Stages come from the unit's `map` in its content file; otherwise from the
// syllabus sub-headings; otherwise one stage for the whole unit.
function stagesFor(unit, content) {
  // Stages that name no syllabus topic would show as empty "0 / 0" cards.
  const known = new Set(unit.topics.map((t) => t.id))
  const mapped = (content?.map ?? []).filter((stage) => stage.topics.some((id) => known.has(id)))
  if (mapped.length) return mapped
  const sections = [...new Set(unit.topics.map((t) => t.section).filter(Boolean))]
  if (sections.length) {
    const loose = unit.topics.filter((t) => !t.section)
    return [
      ...(loose.length ? [{ label: 'Foundations', topics: loose.map((t) => t.id) }] : []),
      ...sections.map((s) => ({ label: s, topics: unit.topics.filter((t) => t.section === s).map((t) => t.id) })),
    ]
  }
  return [{ label: 'All topics', topics: unit.topics.map((t) => t.id) }]
}

// A notebook-style path through the unit: which stage is done, where you are.
export default function UnitLearningMap({ subject, unit, content, progress }) {
  const nextId = nextTopicInUnit(progress, subject, unit)?.id
  return (
    <motion.ol className="map" variants={list} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.2 }}>
      {stagesFor(unit, content).map((stage, i) => {
        const topics = stage.topics.map((id) => unit.topics.find((t) => t.id === id)).filter(Boolean)
        const done = topics.filter((t) => isComplete(progress, subject.id, unit.number, t.id))
        const state = done.length === topics.length ? 'done' : topics.some((t) => t.id === nextId) ? 'here' : 'todo'
        return (
          <motion.li key={stage.label} className="map__stage" data-state={state} variants={stageIn}>
            <span className="map__marker" aria-hidden="true">
              {state === 'done' ? <Check size={16} strokeWidth={3} /> : i + 1}
            </span>
            <div className="map__card">
              {state === 'here' && <span className="map__here">You are here</span>}
              <span className="map__label">{stage.label}</span>
              <span className="map__count">
                {done.length} / {topics.length} done
              </span>
              <ul className="map__dots" aria-hidden="true">
                {topics.map((t) => (
                  <li key={t.id} data-done={done.includes(t) || undefined} />
                ))}
              </ul>
            </div>
          </motion.li>
        )
      })}
    </motion.ol>
  )
}
