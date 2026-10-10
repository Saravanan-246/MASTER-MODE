import { findSubject, findUnit } from '../data/subjects.js'

// Unit content files are split into their own chunks and fetched on demand.
const loaders = import.meta.glob('../data/*/unit*.js')
const cache = new Map()
const EMPTY = Object.freeze({ topics: {} })

// Returns a cached promise, safe to pass to React's use().
export function loadUnitContent(subjectId, unitNumber) {
  const key = `${subjectId}/${unitNumber}`
  if (!cache.has(key)) {
    const load = loaders[`../data/${subjectId}/unit${unitNumber}.js`]
    const promise = load
      ? load().then(
          (module) => {
            const content = module.default ?? EMPTY
            if (import.meta.env.DEV) warnUnknownTopics(subjectId, unitNumber, content)
            return content
          },
          () => EMPTY,
        )
      : Promise.resolve(EMPTY)
    cache.set(key, promise)
  }
  return cache.get(key)
}

const subjectCache = new Map()

// All five units of a subject, in order (for the subject overview).
export function loadSubjectContent(subject) {
  if (!subjectCache.has(subject.id)) {
    subjectCache.set(subject.id, Promise.all(subject.units.map((u) => loadUnitContent(subject.id, u.number))))
  }
  return subjectCache.get(subject.id)
}

export const topicContent = (content, topicId) => content?.topics?.[topicId] ?? null

// Content keys must match the syllabus topic ids generated in subjects.js.
function warnUnknownTopics(subjectId, unitNumber, content) {
  const unit = findUnit(findSubject(subjectId), unitNumber)
  const known = new Set(unit?.topics.map((t) => t.id))
  for (const id of Object.keys(content.topics ?? {})) {
    if (!known.has(id)) console.warn(`[content] ${subjectId}/unit${unitNumber}: "${id}" is not a syllabus topic id`)
  }
}
