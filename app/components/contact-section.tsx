'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ContactForm from './contact-form'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Localização',
      value: 'Penha/SC',
    },
    {
      icon: Phone,
      title: 'Telefone',
      value: '(47) 99156-9980',
      link: 'tel:47991569980',
    },
    {
      icon: Mail,
      title: 'E-mail',
      value: 'karolmenegazzo.adv@gmail.com',
      link: 'mailto:karolmenegazzo.adv@gmail.com',
    },
    {
      icon: Clock,
      title: 'Horário',
      value: 'Segunda a Sexta: 9h - 18h',
    },
  ]

  return (
    <section id="contato" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-[#282828] mb-4">
            Entre em Contato
          </h2>
          <div className="w-24 h-1 bg-[#827751] mx-auto mb-6" />
          <p className="text-lg text-[#737373] max-w-3xl mx-auto">
            Agende uma consulta ou tire suas dúvidas. Estou à disposição para ajudá-lo.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-playfair text-2xl font-bold text-[#4d4b4b] mb-6">
                Informações de Contato
              </h3>
              <div className="space-y-6">
                {contactInfo?.map((info, index) => {
                  const Icon = info?.icon
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-[#827751]/10 p-3 rounded-lg">
                        {Icon && <Icon className="w-6 h-6 text-[#827751]" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#4d4b4b] mb-1">{info?.title ?? ''}</h4>
                        {info?.link ? (
                          <a
                            href={info.link}
                            className="text-[#737373] hover:text-[#827751] transition-colors"
                          >
                            {info?.value ?? ''}
                          </a>
                        ) : (
                          <p className="text-[#737373]">{info?.value ?? ''}</p>
                        )}
                      </div>
                    </div>
                  )
                }) ?? []}
              </div>
            </div>

            {/* Map or Additional Info */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h4 className="font-playfair text-xl font-bold text-[#4d4b4b] mb-4">
                Por que escolher nosso escritório?
              </h4>
              <ul className="space-y-3 text-[#737373]">
                <li className="flex items-start gap-2">
                  <span className="text-[#827751] mt-1">✓</span>
                  <span>Atendimento personalizado e humanizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#827751] mt-1">✓</span>
                  <span>Análise estratégica de cada caso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#827751] mt-1">✓</span>
                  <span>Gestão eficiente de prazos processuais</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#827751] mt-1">✓</span>
                  <span>Experiência em demandas de alto volume</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
