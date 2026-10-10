import { motion } from 'framer-motion'
import { ArrowDownUp } from 'lucide-react'
import { fade, item } from './motion.js'

// layers: [{ label, note, items: ['Browser', ...] }], top to bottom.
// `name` is accepted as an alias of `label`.
export default function ArchitectureDiagram({ layers: rawLayers = [] }) {
  const layers = rawLayers.map((layer) => ({ ...layer, label: layer.label ?? layer.name }))
  return (
    <ol className="arch">
      {layers.map((layer, i) => (
        <motion.li key={layer.label ?? i} className="arch__layer" variants={item}>
          <div className="arch__card">
            <span className="arch__label">{layer.label}</span>
            {layer.note && <span className="arch__note">{layer.note}</span>}
            {layer.items?.length > 0 && (
              <ul className="arch__items">
                {layer.items.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            )}
          </div>
          {i < layers.length - 1 && (
            <motion.span className="arch__link" variants={fade} aria-hidden="true">
              <ArrowDownUp size={18} strokeWidth={2.25} />
            </motion.span>
          )}
        </motion.li>
      ))}
    </ol>
  )
}
