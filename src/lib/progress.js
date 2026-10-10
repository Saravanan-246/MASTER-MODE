// Pure helpers over the stored progress object. Unit, subject and semester
// figures are always derived from completed topics, so they cannot drift.
//
// Shape:
// {
//   completed:     { 'php-mysql/1/operators': '2026-10-09T10:00:00.000Z', ... },
//   lastVisited:   { subjectId, unit, topicId, at } | null,
//   lastBySubject: { [subjectId]: { unit, topicId, at } },
// }

export const PROGRESS_KEY = 'semester-study.progress.v1'

export const emptyProgress = Object.freeze({ completed: {}, lastVisited: null, lastBySubject: {} })

export const topicKey = (subjectId, unit, topicId) => `${subjectId}/${unit}/${topicId}`

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)

// Accepts anything read from storage and returns a valid progress object.
export function normalizeProgress(raw) {
  if (!isObject(raw)) return emptyProgress
  return {
    completed: isObject(raw.completed) ? raw.completed : {},
    lastVisited: isObject(raw.lastVisited) ? raw.lastVisited : null,
    lastBySubject: isObject(raw.lastBySubject) ? raw.lastBySubject : {},
  }
}

export function isComplete(progress, subjectId, unit, topicId) {
  return Boolean(progress.completed[topicKey(subjectId, unit, topicId)])
}

export function withCompleted(progress, { subjectId, unit, topicId }, done) {
  const key = topicKey(subjectId, unit, topicId)
  const completed = { ...progress.completed }
  if (done) completed[key] = new Date().toISOString()
  else delete completed[key]
  return { ...progress, completed }
}

export function withVisit(progress, { subjectId, unit, topicId }) {
  const at = new Date().toISOString()
  return {
    ...progress,
    lastVisited: { subjectId, unit, topicId, at },
    lastBySubject: { ...progress.lastBySubject, [subjectId]: { unit, topicId, at } },
  }
}

const percentOf = (done, total) => (total ? Math.round((done / total) * 100) : 0)

export function unitStats(progress, subject, unit) {
  const total = unit.topics.length
  const done = unit.topics.filter((t) => isComplete(progress, subject.id, unit.number, t.id)).length
  return { done, total, percent: percentOf(done, total), complete: total > 0 && done === total }
}

export function subjectStats(progress, subject) {
  const units = subject.units.map((unit) => unitStats(progress, subject, unit))
  const done = units.reduce((sum, u) => sum + u.done, 0)
  const total = units.reduce((sum, u) => sum + u.total, 0)
  const last = progress.lastBySubject[subject.id]
  // The unit the student is working in: last visited, else the first unfinished one.
  const current =
    last?.unit ??
    subject.units.find((u, i) => u.topics.length && !units[i].complete)?.number ??
    subject.units[0].number
  return {
    done,
    total,
    percent: percentOf(done, total),
    unitsComplete: units.filter((u) => u.complete).length,
    currentUnit: current,
    units,
  }
}

export function semesterStats(progress, subjects) {
  const all = subjects.map((s) => subjectStats(progress, s))
  const done = all.reduce((sum, s) => sum + s.done, 0)
  const total = all.reduce((sum, s) => sum + s.total, 0)
  return { done, total, percent: percentOf(done, total) }
}

// First unfinished topic of a unit (or its first topic once all are done).
export function nextTopicInUnit(progress, subject, unit) {
  if (!unit.topics.length) return null
  return unit.topics.find((t) => !isComplete(progress, subject.id, unit.number, t.id)) ?? unit.topics[0]
}

// Dashboard "Continue": the last topic visited anywhere, if it still exists;
// otherwise the first topic of the first subject that has a syllabus.
export function semesterResumeTarget(progress, subjects) {
  const last = progress.lastVisited
  const subject = last && subjects.find((s) => s.id === last.subjectId)
  const unit = subject?.units.find((u) => u.number === last.unit)
  if (unit?.topics.some((t) => t.id === last.topicId)) return { ...last, resumed: true }

  const first = subjects.find((s) => s.units.some((u) => u.topics.length))
  if (!first) return null
  const firstUnit = first.units.find((u) => u.topics.length)
  return { subjectId: first.id, unit: firstUnit.number, topicId: firstUnit.topics[0].id, resumed: false }
}

// Where "Continue" should take the student inside one subject.
export function subjectResumeTarget(progress, subject) {
  const last = progress.lastBySubject[subject.id]
  if (last) {
    const unit = subject.units.find((u) => u.number === last.unit)
    if (unit?.topics.some((t) => t.id === last.topicId)) return { subjectId: subject.id, ...last }
  }
  const unit = subject.units.find((u) => u.topics.length)
  if (!unit) return null
  return { subjectId: subject.id, unit: unit.number, topicId: nextTopicInUnit(progress, subject, unit).id }
}
