import { motion } from 'framer-motion'
import { item, pop, symbolLike } from './motion.js'

// root: 'Data types'; children: [{ label, note, children: ['Integer', ...] }]
export default function HierarchyDiagram({ root, children = [] }) {
  return (
    <div className="tree">
      <motion.div className="tree__root" variants={pop}>
        {root}
      </motion.div>
      <span className="tree__stem" aria-hidden="true" />
      <ul className="tree__branches">
        {children.map((branch) => (
          <motion.li key={branch.label} className="tree__branch" variants={item}>
            <span className="tree__label">{branch.label}</span>
            {branch.note && <span className="tree__note">{branch.note}</span>}
            {branch.children?.length > 0 && (
              <ul className="tree__leaves">
                {branch.children.map((leaf) => (
                  <li key={leaf} className={`tree__leaf${symbolLike(leaf) ? ' is-code' : ''}`}>
                    {leaf}
                  </li>
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
