import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import Brand from '../Brand.jsx'
import './common.css'

// Frame for every study page: sticky bar with brand, breadcrumbs (desktop)
// or a single back link (mobile), optional actions and a reading-progress
// line. `crumbs` = [{ label, to }], the last one is the current page.
export default function StudyShell({ crumbs = [], actions, progress, children, className = '' }) {
  const parent = crumbs.length > 1 ? crumbs[crumbs.length - 2] : null

  return (
    <div className={`study ${className}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="study-bar">
        <div className="study-bar__inner">
          <div className="study-bar__brand">
            <Brand to="/" />
          </div>

          {parent && (
            <Link to={parent.to} className="study-bar__back">
              <ChevronLeft size={18} strokeWidth={2.25} aria-hidden="true" />
              <span>{parent.label}</span>
            </Link>
          )}

          {crumbs.length > 0 && (
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol>
                {crumbs.map((crumb, i) => (
                  <li key={crumb.label + i}>
                    {i < crumbs.length - 1 ? (
                      <Link to={crumb.to}>{crumb.label}</Link>
                    ) : (
                      <span aria-current="page">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {actions && <div className="study-bar__actions">{actions}</div>}
        </div>
        {progress && <motion.span className="study-bar__progress" style={{ scaleX: progress }} aria-hidden="true" />}
      </header>

      <main id="main" className="study-main" tabIndex={-1}>
        {children}
      </main>
    </div>
  )
}
