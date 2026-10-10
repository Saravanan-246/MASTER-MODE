import { ProgressRing } from '../common/ProgressBar.jsx'
import './subject.css'

export default function SubjectProgress({ stats }) {
  return (
    <div className="subject-progress">
      <ProgressRing value={stats.percent} label="Subject progress" size={96} />
      <dl className="subject-progress__facts">
        <div>
          <dt>Topics understood</dt>
          <dd>
            {stats.done} <span>/ {stats.total}</span>
          </dd>
        </div>
        <div>
          <dt>Units complete</dt>
          <dd>
            {stats.unitsComplete} <span>/ {stats.units.length}</span>
          </dd>
        </div>
      </dl>
    </div>
  )
}
