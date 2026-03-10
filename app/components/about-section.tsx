'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Scale, Award, Users, Target } from 'lucide-react'
import Image from 'next/image'

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const values = [
    {
      icon: Scale,
      title: 'Justiça',
      description: 'Comprometimento com a defesa dos seus direitos',
    },
    {
      icon: Award,
      title: 'Excelência',
      description: 'Qualidade técnica em cada processo',
    },
    {
      icon: Users,
      title: 'Atendimento',
      description: 'Foco em entender suas necessidades',
    },
    {
      icon: Target,
      title: 'Resultados',
      description: 'Estratégias eficientes para soluções concretas',
    },
  ]

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-[#282828] mb-4">
            Sobre Mim
          </h2>
          <div className="w-24 h-1 bg-[#827751] mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://photos.peopleimages.com/picture/202406/3076869-man-business-and-shaking-hands-in-office-for-meeting-lawyer-and-client-in-legal-consultation-together-for-agreement-professional-negotiation-and-thank-you-gesture-partnership-and-opportunity-zoom_90.jpg"
                alt="Atendimento profissional"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#827751] text-white p-8 rounded-lg shadow-xl max-w-xs">
              <p className="text-sm font-medium">Localizada em</p>
              <p className="text-2xl font-playfair font-bold">Penha/SC</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="font-playfair text-3xl font-bold text-[#4d4b4b]">
              Experiência e Dedicação
            </h3>
            
            <p className="text-lg text-[#737373] leading-relaxed">
              Advogada com experiência em <strong className="text-[#827751]">contencioso cível, criminal e demandas bancárias</strong>, com atuação na elaboração de peças processuais, gestão de prazos e análise estratégica de processos.
            </p>

            <p className="text-lg text-[#737373] leading-relaxed">
              Possuo facilidade em atendimento ao cliente, organização de fluxos processuais e atuação em demandas de alto volume, com foco em <strong className="text-[#827751]">eficiência e qualidade técnica</strong>.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              {values?.map((value, index) => {
                const Icon = value?.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                  >
                    {Icon && <Icon className="w-8 h-8 text-[#827751] mb-3" />}
                    <h4 className="font-semibold text-[#4d4b4b] mb-2">{value?.title ?? ''}</h4>
                    <p className="text-sm text-[#737373]">{value?.description ?? ''}</p>
                  </motion.div>
                )
              }) ?? []}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
