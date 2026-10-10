import { motion } from 'framer-motion'
import { draw } from './motion.js'

// Hand-drawn connector. Points right; layouts rotate it with CSS.
export default function Arrow({ className = '' }) {
  return (
    <svg
      className={`viz-arrow ${className}`}
      viewBox="0 0 48 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <motion.path d="M4 12.5c12-1.6 26-1.4 38-.3" variants={draw} />
      <motion.path d="M35.5 6.5 42.5 12l-7 5.8" variants={draw} />
    </svg>
  )
}
