import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import useMediaQuery from '../hooks/useMediaQuery'

const elements = { div: motion.div, figure: motion.figure, li: motion.li, aside: motion.aside }

type SectionRevealProps = {
  children: ReactNode
  className?: string
  as?: keyof typeof elements
  delay?: number
  labelledBy?: string
}

export default function SectionReveal({ children, className = '', as = 'div', delay = 0, labelledBy }: SectionRevealProps) {
  const reduceMotion = useReducedMotion()
  const mobile = useMediaQuery('(max-width: 600px)')
  const Element = elements[as]
  const revealDelay = reduceMotion ? 0 : delay

  return (
    <Element
      className={`section-reveal ${className}`}
      aria-labelledby={labelledBy}
      initial={reduceMotion ? false : { opacity: 0, y: mobile ? 16 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        y: { duration: reduceMotion ? 0 : 1.1, delay: revealDelay, ease: [0.22, 0.61, 0.36, 1] },
        opacity: { duration: reduceMotion ? 0 : 0.95, delay: revealDelay, ease: [0.25, 0.1, 0.25, 1] },
      }}
    >
      {children}
    </Element>
  )
}
