// Renders the inline markup used in notes: `code` and **keyword**.
const TOKEN = /(`[^`]+`|\*\*[^*]+\*\*)/g

export default function RichText({ text }) {
  if (typeof text !== 'string') return text ?? null
  return text.split(TOKEN).map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
      const code = part.slice(1, -1)
      // Short tokens like `?>` stay on one line; long ones may still wrap.
      return (
        <code key={i} className={code.length <= 14 ? 'is-short' : undefined}>
          {code}
        </code>
      )
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 3) {
      return (
        <strong key={i} className="kw">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}
