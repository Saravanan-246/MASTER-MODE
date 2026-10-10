import { useId, useState } from 'react'
import CodeBlock from '../common/CodeBlock.jsx'
import RichText from '../common/RichText.jsx'
import { Tape } from '../Doodles.jsx'

function fileName(lang) {
  if (lang === 'html') return 'example.html'
  if (lang === 'sql') return 'query.sql'
  return lang === 'text' ? 'example.txt' : 'example.php'
}

// Code (one file or tabs for several), sample input, the output as it would
// look, and a short "what happened". `compact` drops the explanation.
export default function ExampleCard({ example, compact = false }) {
  const baseId = useId()
  const [active, setActive] = useState(0)
  const files =
    example.files ?? (example.code ? [{ name: fileName(example.lang), code: example.code, lang: example.lang }] : [])
  const file = files[active]

  function handleTabKey(event) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    const step = event.key === 'ArrowRight' ? 1 : -1
    const next = (active + step + files.length) % files.length
    setActive(next)
    document.getElementById(`${baseId}-tab-${next}`)?.focus()
  }

  return (
    <div className="example">
      <Tape className="example__tape" />
      {example.title && <h3 className="example__title">{example.title}</h3>}

      {files.length > 1 && (
        <div className="example__tabs" role="tablist" aria-label="Example files" onKeyDown={handleTabKey}>
          {files.map((f, i) => (
            <button
              key={f.name}
              id={`${baseId}-tab-${i}`}
              type="button"
              role="tab"
              className="example__tab"
              aria-selected={i === active}
              aria-controls={`${baseId}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
            >
              {f.name}
            </button>
          ))}
        </div>
      )}

      {file && (
        <div
          id={`${baseId}-panel`}
          role={files.length > 1 ? 'tabpanel' : undefined}
          aria-labelledby={files.length > 1 ? `${baseId}-tab-${active}` : undefined}
        >
          <CodeBlock code={file.code} lang={file.lang ?? 'php'} label={files.length === 1 ? file.name : undefined} />
        </div>
      )}

      {example.input && (
        <p className="example__input">
          <span className="example__tag">Input</span>
          <RichText text={example.input} />
        </p>
      )}

      {example.output && (
        <div className="example__output">
          <div className="example__window" aria-hidden="true">
            <span />
            <span />
            <span />
            Output
          </div>
          <pre className="example__result">{example.output}</pre>
        </div>
      )}

      {!compact && example.explanation && (
        <p className="example__explain">
          <RichText text={example.explanation} />
        </p>
      )}
    </div>
  )
}
