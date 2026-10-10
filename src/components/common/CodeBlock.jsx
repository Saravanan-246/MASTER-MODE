import { useMemo, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { tokenize } from '../../lib/highlight.js'

const COPY_RESET_MS = 1600

// Highlighted, horizontally scrollable code. `lang`: php | html | sql | text
export default function CodeBlock({ code, lang = 'php', label, copyable = true, className = '' }) {
  const tokens = useMemo(() => tokenize(code, lang), [code, lang])
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_RESET_MS)
    } catch {
      // Clipboard can be blocked; the code is still selectable.
    }
  }

  return (
    <div className={`code ${className}`} data-lang={lang}>
      {(label || copyable) && (
        <div className="code__bar">
          {label && <span className="code__label">{label}</span>}
          {copyable && (
            <button type="button" className="code__copy" onClick={handleCopy} aria-label={copied ? 'Copied' : 'Copy code'}>
              {copied ? <Check size={14} strokeWidth={2.5} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              <span aria-hidden="true">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          )}
        </div>
      )}
      <pre className="code__pre" tabIndex={0}>
        <code>
          {tokens.map((token, i) =>
            token.type ? (
              <span key={i} className={`tok-${token.type}`}>
                {token.text}
              </span>
            ) : (
              token.text
            ),
          )}
        </code>
      </pre>
    </div>
  )
}
