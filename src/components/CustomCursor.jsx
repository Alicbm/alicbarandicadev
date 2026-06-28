import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CustomCursor = () => {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springCfg = { damping: 28, stiffness: 220, mass: 0.4 }
  const ringX = useSpring(dotX, springCfg)
  const ringY = useSpring(dotY, springCfg)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const onMove = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'hover'
      ) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [visible])

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null
  }

  return (
    <>
      <motion.div
        style={{ left: dotX, top: dotY, x: '-50%', y: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: hovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="fixed z-[9999] pointer-events-none w-2 h-2 rounded-full bg-brand-500"
      />
      <motion.div
        style={{ left: ringX, top: ringY, x: '-50%', y: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovered ? 1.8 : 1,
          borderColor: hovered ? 'rgba(37,99,235,0.8)' : 'rgba(37,99,235,0.5)',
        }}
        transition={{ duration: 0.2 }}
        className="fixed z-[9999] pointer-events-none w-9 h-9 rounded-full border-2 border-brand-500/50"
      />
    </>
  )
}

export default CustomCursor
