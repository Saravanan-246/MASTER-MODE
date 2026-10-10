import { Link } from 'react-router-dom'

// Two stacked diamonds: a red note over an ink outline. The red one spins
// on hover; the outline stays put.
function BrandMark() {
  return (
    <svg className="brand__mark" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
      <polygon className="brand__mark-outline" points="13,4.5 20,11.5 13,18.5 6,11.5" />
      <polygon className="brand__mark-fill" points="9,2 16,9 9,16 2,9" />
    </svg>
  )
}

export default function Brand({ to }) {
  const content = (
    <>
      <BrandMark />
      <span>Semester Study</span>
    </>
  )

  return to ? (
    <Link to={to} className="brand">
      {content}
    </Link>
  ) : (
    <span className="brand">{content}</span>
  )
}
