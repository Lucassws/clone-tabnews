'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Scale, Briefcase, Building2, Users2, Heart, FileText, Home, DollarSign } from 'lucide-react'

export default function PracticeAreasSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const areas = [
    {
      icon: Scale,
      title: 'Direito Civil',
      description: 'Contratos, responsabilidade civil, indenizações e demais questões cíveis',
    },
    {
      icon: Briefcase,
      title: 'Direito Criminal',
      description: 'Defesa criminal, análise de processos e estratégias de defesa',
    },
    {
      icon: Building2,
      title: 'Direito Bancário',
      description: 'Revisão de contratos bancários, renegociação de dívidas e defesa do consumidor',
    },
    {
      icon: Users2,
      title: 'Direito Trabalhista',
      description: 'Demandas trabalhistas, rescisões e direitos do trabalhador',
    },
    {
      icon: Heart,
      title: 'Direito de Família',
      description: 'Divórcio, pensão alimentícia, guarda e questões familiares',
    },
    {
      icon: FileText,
      title: 'Direito Contratual',
      description: 'Elaboração e revisão de contratos, análise de cláusulas',
    },
    {
      icon: Home,
      title: 'Direito Imobiliário',
      description: 'Compra e venda de imóveis, locação e questões condominiais',
    },
    {
      icon: DollarSign,
      title: 'Direito do Consumidor',
      description: 'Defesa de direitos do consumidor e relações de consumo',
    },
  ]

  return (
    <section id="areas" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-[#282828] mb-4">
            Áreas de Atuação
          </h2>
          <div className="w-24 h-1 bg-[#827751] mx-auto mb-6" />
          <p className="text-lg text-[#737373] max-w-3xl mx-auto">
            Atendimento completo e especializado em diversas áreas do direito
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas?.map((area, index) => {
            const Icon = area?.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 group cursor-pointer"
              >
                <div className="bg-[#827751]/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#827751] transition-colors">
                  {Icon && <Icon className="w-8 h-8 text-[#827751] group-hover:text-white transition-colors" />}
                </div>
                <h3 className="font-playfair text-xl font-bold text-[#4d4b4b] mb-3 group-hover:text-[#827751] transition-colors">
                  {area?.title ?? ''}
                </h3>
                <p className="text-[#737373] leading-relaxed">
                  {area?.description ?? ''}
                </p>
              </motion.div>
            )
          }) ?? []}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-[#4d4b4b] mb-6">
            Não encontrou a área que procura? Entre em contato para saber como posso ajudá-lo.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contato')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="bg-[#827751] text-white px-8 py-3 rounded-md hover:bg-[#948b6b] transition-all transform hover:scale-105 shadow-lg font-medium"
          >
            Fale Conosco
          </button>
        </motion.div>
      </div>
    </section>
  )
}
