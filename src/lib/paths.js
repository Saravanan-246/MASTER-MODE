const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export const roman = (n) => ROMAN[n - 1] ?? String(n)
export const pad2 = (n) => String(n).padStart(2, '0')

export const MODES = ['learn', 'quick', 'exam']
export const modeTabId = (mode) => `mode-tab-${mode}`
export const MODE_PANEL_ID = 'topic-mode-panel'

export const subjectPath = (subjectId) => `/subject/${subjectId}`
export const unitPath = (subjectId, unit) => `/subject/${subjectId}/unit/${unit}`

export function topicPath(subjectId, unit, topicId, mode) {
  const search = mode && mode !== 'learn' ? `?mode=${mode}` : ''
  return `/topic/${subjectId}/${unit}/${topicId}${search}`
}
