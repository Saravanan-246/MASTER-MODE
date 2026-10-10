import RichText from '../common/RichText.jsx'
import SubjectMascot from '../common/SubjectMascot.jsx'
import VisualRenderer from '../visuals/VisualRenderer.jsx'

// "What is it?" — plain words first, then an analogy from the subject's
// mascot, then (optionally) a tiny sketch such as the labelled-box picture.
export default function SimpleExplanation({ data, subjectId }) {
  const { text, analogy, sketch } = typeof data === 'string' ? { text: data } : data
  return (
    <div className="simple">
      {text && (
        <p className="simple__text">
          <RichText text={text} />
        </p>
      )}
      {analogy && (
        <div className="simple__analogy">
          <SubjectMascot subjectId={subjectId} size="sm" />
          <p className="simple__bubble">
            <span className="simple__bubble-label">Think of it like this</span>
            <RichText text={analogy} />
          </p>
        </div>
      )}
      {sketch && <VisualRenderer visual={sketch} showTitle={false} compact />}
    </div>
  )
}

// The one-sentence, exam-ready definition used by Quick and Exam modes.
export function DefinitionCard({ text }) {
  return (
    <blockquote className="definition">
      <RichText text={text} />
    </blockquote>
  )
}
