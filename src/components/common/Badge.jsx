import { Check } from 'lucide-react'

const DIFFICULTY_LABEL = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }

// Small pill. `tone`: neutral | red | done | easy | medium | hard
export default function Badge({ tone = 'neutral', children, className = '' }) {
  return <span className={`badge badge--${tone} ${className}`}>{children}</span>
}

export function DifficultyBadge({ level }) {
  if (!DIFFICULTY_LABEL[level]) return null
  return (
    <Badge tone={level}>
      <span className="badge__dots" aria-hidden="true" />
      {DIFFICULTY_LABEL[level]}
    </Badge>
  )
}

export function DoneBadge({ children = 'Understood' }) {
  return (
    <Badge tone="done">
      <Check size={12} strokeWidth={3} aria-hidden="true" />
      {children}
    </Badge>
  )
}
