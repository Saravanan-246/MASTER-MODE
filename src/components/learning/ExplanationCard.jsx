import { AlertTriangle, ChevronDown, Info, Lightbulb } from 'lucide-react'
import CodeBlock from '../common/CodeBlock.jsx'
import DataTable from '../common/DataTable.jsx'
import RichText from '../common/RichText.jsx'
import VisualRenderer from '../visuals/VisualRenderer.jsx'

const CALLOUTS = {
  tip: { icon: Lightbulb, label: 'Tip' },
  note: { icon: Info, label: 'Note' },
  trap: { icon: AlertTriangle, label: 'Exam trap' },
}

// Renders the block list used by `explanation`:
//   'paragraph' · { heading } · { list, ordered } · { code, lang } · { table }
//   { visual } · { tip | note | trap } · { more: [blocks], label } (collapsed)
function Block({ block }) {
  if (typeof block === 'string') {
    return (
      <p className="block-p">
        <RichText text={block} />
      </p>
    )
  }
  if (block.heading) return <h3 className="block-h">{block.heading}</h3>
  if (block.list) {
    const List = block.ordered ? 'ol' : 'ul'
    return (
      <List className={`block-list${block.ordered ? ' block-list--ordered' : ''}`}>
        {block.list.map((entry, i) => (
          <li key={i}>
            <RichText text={entry} />
          </li>
        ))}
      </List>
    )
  }
  // Short snippets read as part of the text, so they skip the copy bar.
  if (block.code) {
    const lines = block.code.split('\n').length
    return <CodeBlock code={block.code} lang={block.lang ?? 'php'} copyable={lines > 2} />
  }
  if (block.table) return <DataTable columns={block.table.columns} rows={block.table.rows} />
  if (block.visual) return <VisualRenderer visual={block.visual} />
  if (block.more) {
    return (
      <details className="block-more">
        <summary>
          <span>{block.label ?? 'Go deeper'}</span>
          <ChevronDown className="block-more__chevron" size={18} aria-hidden="true" />
        </summary>
        <div className="block-more__body">
          <Blocks blocks={block.more} />
        </div>
      </details>
    )
  }
  const kind = Object.keys(CALLOUTS).find((key) => block[key])
  if (kind) {
    const { icon: Icon, label } = CALLOUTS[kind]
    return (
      <aside className={`callout callout--${kind}`}>
        <Icon className="callout__icon" size={18} strokeWidth={2.25} aria-hidden="true" />
        <p>
          <strong className="callout__label">{label}</strong> <RichText text={block[kind]} />
        </p>
      </aside>
    )
  }
  return null
}

function Blocks({ blocks }) {
  return blocks.map((block, i) => <Block key={i} block={block} />)
}

// "How it works" — the deeper explanation, broken into small blocks.
export default function ExplanationCard({ explanation }) {
  const blocks = Array.isArray(explanation) ? explanation : [explanation]
  return (
    <div className="explain">
      <Blocks blocks={blocks} />
    </div>
  )
}
