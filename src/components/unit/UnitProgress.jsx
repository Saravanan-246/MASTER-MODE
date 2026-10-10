import { ProgressRing } from '../common/ProgressBar.jsx'
import { studyLines } from '../../data/microcopy.js'
import './unit.css'

// Ring + count, with an optional call to action. `compact` is the slim
// sticky version used on phones and in the topic sidebar.
export default function UnitProgress({ stats, action, compact = false, label = 'Unit progress' }) {
  return (
    <div className={`unit-progress${compact ? ' unit-progress--compact' : ''}`}>
      <ProgressRing value={stats.percent} label={label} size={compact ? 48 : 84} />
      <div className="unit-progress__text">
        <p className="unit-progress__count">
          <strong>{stats.done}</strong> of {stats.total} topics understood
        </p>
        {stats.complete && !compact && <p className="unit-progress__line">{studyLines.unitDone}</p>}
      </div>
      {action && <div className="unit-progress__action">{action}</div>}
    </div>
  )
}
