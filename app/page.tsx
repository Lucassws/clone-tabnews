import HeroSection from './components/hero-section'
import AboutSection from './components/about-section'
import PracticeAreasSection from './components/practice-areas-section'
import ContactSection from './components/contact-section'
import Header from './components/header'
import Footer from './components/footer'
import WhatsAppButton from './components/whatsapp-button'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <PracticeAreasSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
