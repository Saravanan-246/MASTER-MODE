import { loadUnitContent } from './lib/content.js'
import { preloadStudyPages } from './lib/pages.js'

// The ~5 s startup intro lives in index.html so it paints before any script,
// and it plays on every page load (nothing is remembered between loads). Its
// CSS timeline starts when the splash is parsed; index.html stamps that moment
// in `data-start`. The app mounts just before the exit so the landing page is
// ready underneath; at 4.2 s the photo accelerates off to the right while the
// layer wipes away (done by ~5 s), then the splash is removed.
const INTRO_MS = 4200
const EXIT_MS = 820
const MOUNT_LEAD_MS = 250

// Start fetching what the current URL needs while the intro plays, so a
// direct study link opens without a loading flash.
function warmUp() {
  const [, kind, subjectId, a, , b] = window.location.pathname.split('/')

  if (!kind) return

  preloadStudyPages()

  if (kind === 'topic' && a) {
    loadUnitContent(subjectId, Number(a))
  }

  if (kind === 'subject' && a === 'unit' && b) {
    loadUnitContent(subjectId, Number(b))
  }
}

export function whenSplashDone() {
  const splash = document.getElementById('splash')

  if (!splash) return Promise.resolve()

  warmUp()

  const start = Number(splash.dataset.start) || 0
  const exitIn = Math.max(0, INTRO_MS - (performance.now() - start))

  return new Promise((resolve) => {
    setTimeout(resolve, Math.max(0, exitIn - MOUNT_LEAD_MS))

    setTimeout(() => {
      splash.classList.add('is-leaving')
      setTimeout(() => splash.remove(), EXIT_MS)
    }, exitIn)
  })
}
