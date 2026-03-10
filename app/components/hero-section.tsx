'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contato')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-[#282828]">
          <Image
            src="https://static.vecteezy.com/system/resources/previews/057/707/674/large_2x/gavel-and-scales-of-justice-on-table-in-law-office-symbolizing-legal-authority-and-fairness-background-features-law-books-enhancing-professional-atmosphere-photo.JPG"
            alt="Escritório de advocacia"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#282828]/70 via-[#282828]/80 to-[#282828]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#827751] shadow-2xl">
              <Image
                src="https://headshots-inc.com/wp-content/uploads/2023/03/professional-Headshot-Example-2-1.jpg"
                alt="Karoline Menegazzo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
            Karoline Menegazzo
          </h1>
          
          <p className="text-xl sm:text-2xl text-[#948b6b] font-light max-w-3xl mx-auto">
            Advocacia com <span className="text-[#827751] font-semibold">excelência</span> e dedicação aos seus direitos
          </p>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Atuação estratégica em todas as áreas do direito com foco em resultados efetivos
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={scrollToContact}
              className="bg-[#827751] text-white px-8 py-4 rounded-md hover:bg-[#948b6b] transition-all transform hover:scale-105 shadow-lg text-lg font-medium"
            >
              Agende uma Consulta
            </button>
            <a
              href="tel:47991635656"
              className="border-2 border-[#827751] text-[#827751] px-8 py-4 rounded-md hover:bg-[#827751] hover:text-white transition-all text-lg font-medium"
            >
              (47) 99163-5656
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-8 h-8 text-[#827751]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
