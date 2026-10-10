import { useSyncExternalStore } from 'react'
import { readStorage, removeStorage, subscribeStorage, writeStorage } from '../lib/storage.js'
import { PROGRESS_KEY, emptyProgress, normalizeProgress, withCompleted, withVisit } from '../lib/progress.js'

// One shared store for every component, kept in sync with localStorage and
// with other open tabs.
let state = normalizeProgress(readStorage(PROGRESS_KEY, null))
const listeners = new Set()

function commit(next) {
  state = next
  writeStorage(PROGRESS_KEY, next)
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  const unsubscribeStorage = subscribeStorage(PROGRESS_KEY, () => {
    state = normalizeProgress(readStorage(PROGRESS_KEY, null))
    listener()
  })
  return () => {
    listeners.delete(listener)
    unsubscribeStorage()
  }
}

const getSnapshot = () => state
const getServerSnapshot = () => emptyProgress

const setComplete = (topic, done) => commit(withCompleted(state, topic, done))
const recordVisit = (topic) => commit(withVisit(state, topic))

function resetProgress() {
  removeStorage(PROGRESS_KEY)
  state = emptyProgress
  listeners.forEach((listener) => listener())
}

export default function useProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return { progress, setComplete, recordVisit, resetProgress }
}
