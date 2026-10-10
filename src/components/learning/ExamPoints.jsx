import { PenLine } from 'lucide-react'
import RichText from '../common/RichText.jsx'

// What is worth writing down in an exam answer for this topic.
export default function ExamPoints({ points }) {
  return (
    <ul className="exampoints">
      {points.map((point, i) => (
        <li key={i}>
          <PenLine className="exampoints__icon" size={16} strokeWidth={2.25} aria-hidden="true" />
          <span>
            <RichText text={point} />
          </span>
        </li>
      ))}
    </ul>
  )
}
