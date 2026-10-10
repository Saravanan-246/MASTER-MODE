import { motion } from 'framer-motion'
import { Cog } from 'lucide-react'
import CodeBlock from '../common/CodeBlock.jsx'
import Arrow from './Arrow.jsx'
import { item, pop } from './motion.js'

// input: { label, code, lang }, process: 'What happens', output: { label, code, lang }
// Source on the left, result on the right (stacked on narrow containers).
export default function CodeFlowDiagram({ input, process, output }) {
  return (
    <div className="codeflow">
      <motion.div className="codeflow__side" variants={item}>
        <CodeBlock code={input.code} lang={input.lang ?? 'php'} label={input.label} copyable={false} />
      </motion.div>

      <motion.div className="codeflow__engine" variants={pop}>
        <span className="codeflow__gear" aria-hidden="true">
          <Cog size={20} strokeWidth={2} />
        </span>
        <span className="codeflow__process">{process}</span>
        <Arrow className="codeflow__arrow" />
      </motion.div>

      <motion.div className="codeflow__side" variants={item}>
        <CodeBlock code={output.code} lang={output.lang ?? 'text'} label={output.label} copyable={false} />
      </motion.div>
    </div>
  )
}
