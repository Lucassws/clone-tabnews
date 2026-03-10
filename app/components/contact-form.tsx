'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data?.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h3 className="font-playfair text-2xl font-bold text-[#4d4b4b] mb-6">
        Envie sua Mensagem
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#4d4b4b] mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#827751] focus:border-transparent transition-all"
            placeholder="Seu nome completo"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#4d4b4b] mb-2">
            E-mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#827751] focus:border-transparent transition-all"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#4d4b4b] mb-2">
            Telefone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#827751] focus:border-transparent transition-all"
            placeholder="(00) 00000-0000"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-[#4d4b4b] mb-2">
            Assunto *
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#827751] focus:border-transparent transition-all"
          >
            <option value="">Selecione um assunto</option>
            <option value="civil">Direito Civil</option>
            <option value="criminal">Direito Criminal</option>
            <option value="bancario">Direito Bancário</option>
            <option value="trabalhista">Direito Trabalhista</option>
            <option value="familia">Direito de Família</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#4d4b4b] mb-2">
            Mensagem *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#827751] focus:border-transparent transition-all resize-none"
            placeholder="Descreva sua necessidade..."
          />
        </div>

        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-md"
          >
            <Check className="w-5 h-5" />
            <span>Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-md"
          >
            <AlertCircle className="w-5 h-5" />
            <span>Erro ao enviar mensagem. Por favor, tente novamente.</span>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#827751] text-white px-6 py-4 rounded-md hover:bg-[#948b6b] transition-all transform hover:scale-105 shadow-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Enviar Mensagem</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
