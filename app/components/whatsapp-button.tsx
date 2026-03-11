'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowTooltip(true)
        setTimeout(() => setShowTooltip(false), 5000)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const handleWhatsAppClick = () => {
    const phone = '5547991569980'
    const message = encodeURIComponent('Olá! Gostaria de agendar uma consulta.')
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute bottom-full right-0 mb-4 bg-white text-[#4d4b4b] px-4 py-3 rounded-lg shadow-xl max-w-xs"
              >
                <button
                  onClick={() => setShowTooltip(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-sm font-medium pr-6">
                  Precisa de ajuda? Entre em contato pelo WhatsApp!
                </p>
                <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <motion.button
            onClick={handleWhatsAppClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-colors group"
          >
            <MessageCircle className="w-8 h-8" />
            <span className="sr-only">Contato via WhatsApp</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
