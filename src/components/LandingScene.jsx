import { useState } from 'react'
import { motion, useTransform } from 'framer-motion'
import { Book, Pencil, Tape } from './Doodles.jsx'
import hero960 from '../assets/hero-960.webp'
import hero1600 from '../assets/hero-1600.webp'
import hero2400 from '../assets/hero-2400.webp'
import hero3200 from '../assets/hero-3200.webp'

const SRC_SET = `${hero960} 960w, ${hero1600} 1600w, ${hero2400} 2400w, ${hero3200} 3200w`
// Portrait / square layouts frame the photo inside the column. Landscape
// layouts render it at stage width: 100vw when wider than 16:9, else ~178vh.
const SIZES = '(max-aspect-ratio: 13/10) 92vw, (min-aspect-ratio: 16/9) 100vw, 178vh'

const EASE_OUT = [0.22, 1, 0.36, 1]
const EASE_IN_OUT = [0.65, 0, 0.35, 1]

// Blurred backdrop, the hero photo, the readability veil and the margin
// doodles. Rendered as siblings so the photo can join the page grid on
// portrait screens. `pointerX` / `pointerY` are springs in -0.5..0.5.
export default function LandingScene({ pointerX, pointerY, entering }) {
  const [loaded, setLoaded] = useState(false)

  // Photo drifts against the cursor (max ~6px); doodles drift with it.
  const photoX = useTransform(pointerX, (v) => v * -12)
  const photoY = useTransform(pointerY, (v) => v * -8)
  const doodleX = useTransform(pointerX, (v) => v * 16)
  const doodleY = useTransform(pointerY, (v) => v * 10)

  return (
    <>
      <div className="scene__backdrop" aria-hidden="true" />

      <motion.div
        className="photo"
        aria-hidden="true"
        style={{ x: photoX, y: photoY }}
        animate={{ scale: entering ? 1.08 : 1 }}
        transition={entering ? { duration: 1.1, ease: EASE_IN_OUT } : { duration: 0.6, ease: EASE_OUT }}
      >
        <Tape className="photo__tape photo__tape--left" />
        <Tape className="photo__tape photo__tape--right" />
        <div className="photo__clip">
          <motion.img
            className="photo__img"
            src={hero1600}
            srcSet={SRC_SET}
            sizes={SIZES}
            width={4853}
            height={2730}
            alt=""
            fetchPriority="high"
            decoding="async"
            onLoad={() => setLoaded(true)}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={loaded ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1.4, ease: EASE_OUT }}
          />
        </div>
      </motion.div>

      <div className="scene__veil" aria-hidden="true" />

      <motion.div
        className="scene__doodles"
        aria-hidden="true"
        style={{ x: doodleX, y: doodleY }}
        animate={{ opacity: entering ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Book className="margin-doodle margin-doodle--book" delay={1.5} />
        <Pencil className="margin-doodle margin-doodle--pencil" delay={1.8} />
      </motion.div>
    </>
  )
}
