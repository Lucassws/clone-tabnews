'use client'

import { useState, useEffect } from 'react'
import { Scale, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#282828]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-[#827751] hover:text-[#948b6b] transition-colors"
          >
            <Scale className="w-6 h-6" />
            <span className="font-playfair text-xl font-semibold hidden sm:block">Karoline Menegazzo</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-white hover:text-[#827751] transition-colors text-sm font-medium"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('areas')}
              className="text-white hover:text-[#827751] transition-colors text-sm font-medium"
            >
              Áreas de Atuação
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="bg-[#827751] text-white px-6 py-2 rounded-md hover:bg-[#948b6b] transition-colors text-sm font-medium"
            >
              Contato
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-[#827751] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#282828] border-t border-[#827751]/20"
          >
            <nav className="flex flex-col px-4 py-4 gap-4">
              <button
                onClick={() => scrollToSection('sobre')}
                className="text-white hover:text-[#827751] transition-colors text-left py-2"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('areas')}
                className="text-white hover:text-[#827751] transition-colors text-left py-2"
              >
                Áreas de Atuação
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="bg-[#827751] text-white px-6 py-3 rounded-md hover:bg-[#948b6b] transition-colors text-center"
              >
                Contato
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
