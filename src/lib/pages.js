import { lazy } from 'react'

// Study pages are split from the landing bundle. The landing page preloads
// them while the "Enter study mode" transition plays, so arrival is instant.
const loaders = {
  dashboard: () => import('../pages/Dashboard.jsx'),
  subject: () => import('../pages/SubjectPage.jsx'),
  unit: () => import('../pages/UnitPage.jsx'),
  topic: () => import('../pages/TopicPage.jsx'),
}

export const Dashboard = lazy(loaders.dashboard)
export const SubjectPage = lazy(loaders.subject)
export const UnitPage = lazy(loaders.unit)
export const TopicPage = lazy(loaders.topic)

export function preloadStudyPages() {
  Object.values(loaders).forEach((load) => load())
}
