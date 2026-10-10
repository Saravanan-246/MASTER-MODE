import { Suspense, useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Landing from './pages/Landing.jsx'
import { Dashboard, SubjectPage, TopicPage, UnitPage } from './lib/pages.js'

// New page → start at the top. Mode switches (?mode=) keep the position.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subject/:subjectId" element={<SubjectPage />} />
          <Route path="/subject/:subjectId/unit/:unitId" element={<UnitPage />} />
          <Route path="/topic/:subjectId/:unitId/:topicId" element={<TopicPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Analytics />
    </MotionConfig>
  )
}
