import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SubjectMascot from '../common/SubjectMascot.jsx'
import { roman, topicPath } from '../../lib/paths.js'

const EASE = [0.22, 1, 0.36, 1]

// "Continue studying" for one subject, shown on its page once it opens.
// `resume` comes from subjectResumeTarget(); `resumed` is true once the
// student has progress here, otherwise this is the "Start Unit" state.
// Styles: .continue and .press-btn in pages/study.css.
export default function SubjectContinue({ subject, resume, resumed }) {
  const unit = subject.units.find((u) => u.number === resume.unit)
  const topic = unit?.topics.find((t) => t.id === resume.topicId)
  if (!topic) return null

  return (
    <motion.div
      className="continue subject-hero__continue"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
    >
      <SubjectMascot subjectId={subject.id} size="md" />
      <div className="continue__text">
        <p className="continue__eyebrow">{resumed ? 'Continue studying' : 'Start here'}</p>
        <p className="continue__topic">{resumed ? topic.title : `Start Unit ${roman(unit.number)}`}</p>
        <p className="continue__where">
          Unit {roman(unit.number)}
          {resumed ? '' : ` · ${topic.title}`}
        </p>
      </div>
      <Link to={topicPath(subject.id, unit.number, topic.id)} className="press-btn continue__cta">
        <span className="press-btn__label">{resumed ? 'Continue' : `Start Unit ${roman(unit.number)}`}</span>
        <span className="press-btn__icon" aria-hidden="true">
          <ArrowRight size={18} strokeWidth={2.4} />
        </span>
      </Link>
    </motion.div>
  )
}
