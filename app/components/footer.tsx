'use client'

import { Scale } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#282828] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="flex items-center gap-2">
            <Scale className="w-8 h-8 text-[#827751]" />
            <span className="font-playfair text-2xl font-bold">Karoline Menegazzo</span>
          </div>
          
          <p className="text-gray-400 max-w-2xl">
            Advocacia com excelência e dedicação aos seus direitos. Atendimento em Penha/SC e região.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-400">
            <a href="tel:47991635656" className="hover:text-[#827751] transition-colors">
              (47) 99156-9980
            </a>
            <span className="hidden sm:block">•</span>
            <a href="mailto:karolmenegazzo.adv@gmail.com" className="hover:text-[#827751] transition-colors">
              karolmenegazzo.adv@gmail.com
            </a>
            <span className="hidden sm:block">•</span>
            <span>Penha/SC</span>
          </div>

          <div className="w-full border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-500">
              © {currentYear} Karoline Menegazzo Advocacia. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
