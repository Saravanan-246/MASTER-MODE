// Thin, failure-proof wrapper around localStorage. Private windows, blocked
// storage or a full quota must never break the study pages.

export function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeStorage(key) {
  try {
    window.localStorage.removeItem(key)
  } catch {
    // Nothing to clean up if storage is unavailable.
  }
}

// Calls `callback` when another tab changes `key`.
export function subscribeStorage(key, callback) {
  function handleStorage(event) {
    if (event.key === key || event.key === null) callback()
  }
  window.addEventListener('storage', handleStorage)
  return () => window.removeEventListener('storage', handleStorage)
}
