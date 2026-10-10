import { motion, useReducedMotion } from 'framer-motion'
import RichText from '../common/RichText.jsx'
import ArchitectureDiagram from './ArchitectureDiagram.jsx'
import BoxDiagram from './BoxDiagram.jsx'
import CodeFlowDiagram from './CodeFlowDiagram.jsx'
import ComparisonDiagram from './ComparisonDiagram.jsx'
import DatabaseDiagram from './DatabaseDiagram.jsx'
import FlowDiagram from './FlowDiagram.jsx'
import HierarchyDiagram from './HierarchyDiagram.jsx'
import NetworkDiagram from './NetworkDiagram.jsx'
import ProcessDiagram from './ProcessDiagram.jsx'
import TimelineDiagram from './TimelineDiagram.jsx'
import { stage } from './motion.js'
import './visuals.css'

const DIAGRAMS = {
  flow: FlowDiagram,
  process: ProcessDiagram,
  comparison: ComparisonDiagram,
  architecture: ArchitectureDiagram,
  timeline: TimelineDiagram,
  hierarchy: HierarchyDiagram,
  network: NetworkDiagram,
  database: DatabaseDiagram,
  'code-flow': CodeFlowDiagram,
  boxes: BoxDiagram,
}

// Picks the diagram for `visual.type` and plays it in when it scrolls into view.
export default function VisualRenderer({ visual, showTitle = true, compact = false }) {
  const reduce = useReducedMotion()
  const Diagram = DIAGRAMS[visual?.type]
  if (!Diagram) return null

  return (
    <motion.figure
      className={`viz viz--${visual.type}${compact ? ' viz--compact' : ''}`}
      variants={stage}
      initial={reduce ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
    >
      {showTitle && visual.title && <figcaption className="viz__title">{visual.title}</figcaption>}
      <div className="viz__body">
        <Diagram {...visual} />
      </div>
      {visual.caption && (
        <p className="viz__caption">
          <RichText text={visual.caption} />
        </p>
      )}
    </motion.figure>
  )
}
