'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50"
          aria-label="Go to top"
        >
          <div className="relative w-16 h-16">
            {/* Pokeball background */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-red-500 to-red-600 shadow-lg border-4 border-gray-800 relative overflow-hidden">
              {/* Top half (red) */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-400 to-red-500"></div>

              {/* Bottom half (white) */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-100 to-white"></div>

              {/* Middle black line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 transform -translate-y-1/2"></div>

              {/* Center circle (button) */}
              <div className="absolute top-1/2 left-1/2 w-5 h-5 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full border-2 border-gray-800 transform -translate-x-1/2 -translate-y-1/2 shadow-inner">
                <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-60"></div>
              </div>
            </div>

            {/* Arrow up icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg
                className="w-6 h-6 text-white drop-shadow-lg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>

            {/* Pokeball shine effect */}
            <div className="absolute top-2 left-3 w-3 h-3 bg-white rounded-full opacity-40 blur-sm"></div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
