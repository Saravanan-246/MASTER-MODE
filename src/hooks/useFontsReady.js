import { useEffect, useState } from 'react'

const FACES = ['400 1em "Instrument Serif"', 'italic 400 1em "Instrument Serif"', '700 1em Manrope']

// Resolves once the display fonts have loaded (or after `timeout` ms), so the
// headline reveal never animates a fallback font that later swaps in.
export default function useFontsReady(timeout = 900) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    const done = () => alive && setReady(true)
    const timer = setTimeout(done, timeout)

    if (document.fonts) {
      Promise.all(FACES.map((face) => document.fonts.load(face))).then(done, done)
    } else {
      done()
    }

    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [timeout])

  return ready
}
