import SubjectMascot from './SubjectMascot.jsx'

// Friendly placeholder: missing pages, notes still being written, or a
// subject whose syllabus has not been added. Use `heading="h1"` when it is
// the only content on the page.
export default function EmptyState({ subjectId, title, heading: Heading = 'h2', children, action }) {
  return (
    <div className="empty">
      <SubjectMascot subjectId={subjectId} size="lg" />
      <Heading className="empty__title">{title}</Heading>
      {children && <div className="empty__text">{children}</div>}
      {action && <div className="empty__action">{action}</div>}
    </div>
  )
}
