// Shared motion for diagrams. The renderer drives "hidden" → "shown" when the
// figure scrolls into view; each part opts in with one of these variants.

const EASE = [0.22, 1, 0.36, 1]

export const stage = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
}

export const item = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

export const pop = {
  hidden: { opacity: 0, scale: 0.85 },
  shown: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 320, damping: 22 } },
}

export const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: { pathLength: 1, opacity: 1, transition: { duration: 0.45, ease: 'easeInOut' } },
}

export const fade = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.5 } },
}

// Labels that look like code are set in monospace.
export const codeLike = (text) => typeof text === 'string' && (/^[$<`]|[([=]|;$/.test(text) || /^[^A-Za-z]+$/.test(text))

// Stricter test for short chips: symbols, $variables or `backticked` text.
export const symbolLike = (text) => typeof text === 'string' && (/^[$`]/.test(text) || /^[^A-Za-z]+$/.test(text))
