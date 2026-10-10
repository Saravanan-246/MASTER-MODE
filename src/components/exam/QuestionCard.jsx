import RichText from '../common/RichText.jsx'
import AnswerStructure from './AnswerStructure.jsx'

// A likely exam question with the plan for answering it — not a model answer.
export default function QuestionCard({ question }) {
  return (
    <article className="question">
      <p className="question__eyebrow">Question</p>
      <p className="question__prompt">
        <RichText text={question.prompt} />
      </p>
      {question.plan?.length > 0 && (
        <>
          <p className="question__eyebrow question__eyebrow--plan">Answer plan</p>
          <AnswerStructure plan={question.plan} />
        </>
      )}
    </article>
  )
}
