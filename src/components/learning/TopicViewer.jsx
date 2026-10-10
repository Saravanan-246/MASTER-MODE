import { useReducedMotion } from 'framer-motion'
import RichText from '../common/RichText.jsx'
import QuestionCard from '../exam/QuestionCard.jsx'
import QuickRevision from '../exam/QuickRevision.jsx'
import VisualRenderer from '../visuals/VisualRenderer.jsx'
import ExamPoints from './ExamPoints.jsx'
import ExampleCard from './ExampleCard.jsx'
import ExplanationCard from './ExplanationCard.jsx'
import KeyPoints, { ImportantTerms } from './KeyPoints.jsx'
import LearningSection from './LearningSection.jsx'
import RememberCard from './RememberCard.jsx'
import SimpleExplanation, { DefinitionCard } from './SimpleExplanation.jsx'
import './learning.css'

const definitionOf = (c) => c.definition ?? (typeof c.simpleExplanation === 'string' ? c.simpleExplanation : c.simpleExplanation?.text)

// Each mode is a list of sections. A section is skipped when its data is
// missing, so theory topics without code (or new topics with partial notes)
// render cleanly.
function buildSections(mode, c, subjectId) {
  const definition = definitionOf(c)
  const has = (value) => (Array.isArray(value) ? value.length > 0 : Boolean(value))

  const all = {
    learn: [
      has(c.visual) && { key: 'see', title: 'See it', body: <VisualRenderer visual={c.visual} /> },
      has(c.simpleExplanation) && {
        key: 'what',
        title: 'What is it?',
        tone: 'soft',
        body: <SimpleExplanation data={c.simpleExplanation} subjectId={subjectId} />,
      },
      has(c.explanation) && { key: 'how', title: 'How it works', body: <ExplanationCard explanation={c.explanation} /> },
      has(c.example) && { key: 'example', title: 'Example', body: <ExampleCard example={c.example} /> },
      has(c.keyPoints) && { key: 'points', title: 'Key points', body: <KeyPoints points={c.keyPoints} /> },
      has(c.importantTerms) && { key: 'terms', title: 'Important terms', body: <ImportantTerms terms={c.importantTerms} /> },
      (has(c.examPoints) || has(c.questions)) && {
        key: 'exam',
        title: 'Exam connection',
        tone: 'exam',
        body: (
          <div className="exam-connection">
            {has(c.examPoints) && <ExamPoints points={c.examPoints} />}
            {c.questions?.slice(0, 1).map((q) => <QuestionCard key={q.prompt} question={q} />)}
            {has(c.keywords) && <QuickRevision keywords={c.keywords} />}
          </div>
        ),
      },
      has(c.remember) && { key: 'recall', title: 'Quick recall', tone: 'notebook', body: <RememberCard items={c.remember} /> },
    ],
    quick: [
      has(definition) && { key: 'definition', title: 'Definition', body: <DefinitionCard text={definition} /> },
      has(c.visual) && { key: 'see', title: 'See it', body: <VisualRenderer visual={c.visual} /> },
      has(c.keyPoints) && { key: 'points', title: 'Key points', body: <KeyPoints points={c.keyPoints} /> },
      has(c.example) && { key: 'example', title: 'Example', body: <ExampleCard example={c.example} compact /> },
    ],
    exam: [
      has(definition) && {
        key: 'definition',
        title: 'Definition',
        label: 'Write this first',
        body: <DefinitionCard text={definition} />,
      },
      has(c.visual) && {
        key: 'diagram',
        title: 'Diagram',
        label: 'Draw a simple version',
        body: <VisualRenderer visual={c.visual} />,
      },
      has(c.examPoints) && {
        key: 'points',
        title: 'Important points',
        body: <ExamPoints points={c.examPoints} />,
      },
      has(c.questions) && {
        key: 'answer',
        title: 'Answer structure',
        tone: 'exam',
        body: (
          <div className="question-list">
            {c.questions.map((q) => (
              <QuestionCard key={q.prompt} question={q} />
            ))}
          </div>
        ),
      },
      (has(c.keywords) || has(c.remember)) && {
        key: 'keywords',
        title: 'Keywords',
        label: 'Use these words',
        body: <QuickRevision keywords={c.keywords} remember={c.remember} />,
      },
    ],
  }
  return all[mode].filter(Boolean)
}

export default function TopicViewer({ content, mode, subjectId }) {
  const reduce = useReducedMotion()
  const sections = buildSections(mode, content, subjectId)

  function jumpTo(event, key) {
    event.preventDefault()
    const target = document.getElementById(`sec-${key}`)
    target?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    target?.focus({ preventScroll: true })
  }

  return (
    <div className="viewer">
      <div className="viewer__content">
        {mode !== 'learn' && definitionOf(content) && (
          <p className="viewer__mode-note">
            <RichText text={mode === 'quick' ? 'Fast revision: the essentials only.' : 'Turn the idea into marks.'} />
          </p>
        )}
        {sections.map((section, i) => (
          <LearningSection
            key={section.key}
            id={`sec-${section.key}`}
            index={i + 1}
            title={section.title}
            label={section.label}
            tone={section.tone}
          >
            {section.body}
          </LearningSection>
        ))}
      </div>

      <nav className="viewer__outline" aria-label="On this page">
        <p className="viewer__outline-title">On this page</p>
        <ol>
          {sections.map((section) => (
            <li key={section.key}>
              <a href={`#sec-${section.key}`} onClick={(event) => jumpTo(event, section.key)}>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
