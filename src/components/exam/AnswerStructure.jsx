import RichText from '../common/RichText.jsx'

// The answer plan: what to write, in which order. plan: [{ label, hint }]
export default function AnswerStructure({ plan }) {
  return (
    <ol className="plan">
      {plan.map((step, i) => (
        <li key={step.label + i} className="plan__step">
          <span className="plan__number" aria-hidden="true">
            {i + 1}
          </span>
          <span className="plan__text">
            <span className="plan__label">{step.label}</span>
            {step.hint && (
              <span className="plan__hint">
                <RichText text={step.hint} />
              </span>
            )}
          </span>
        </li>
      ))}
    </ol>
  )
}
