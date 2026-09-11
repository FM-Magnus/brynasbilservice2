import { useEffect, useState } from 'react'
import { Header } from './components/layout/Header'
import { Hero } from './components/sections/Hero'
import { ContactIntro } from './components/sections/ContactIntro'
import { Services } from './components/sections/Services'
import { ServiceList } from './components/sections/ServiceList'
import { About } from './components/sections/About'
import { WhyUs } from './components/sections/WhyUs'
import { EV } from './components/sections/EV'
import { BookingFormModal } from './components/BookingForm'
import { CTABanner } from './components/sections/CTABanner'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header onBookingClick={openModal} variant="hero" />
      <Hero onBookingClick={openModal} />
      <ContactIntro />
      <About />
      <Services onBookingClick={openModal} />
      <ServiceList />
      <WhyUs />
      <EV />
      <CTABanner onBookingClick={openModal} />
      <BookingFormModal isOpen={isModalOpen} onClose={closeModal} />
      <Contact />
      <Footer />
    </>
  )
}
