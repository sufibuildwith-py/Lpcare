import React, { useState } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSection } from './sections/HeroSection'
import { MarqueeSection } from './sections/MarqueeSection'
import { AboutTrustSection } from './sections/AboutTrustSection'
import { AnatomySection } from './sections/AnatomySection'
import { ServicesSection } from './sections/ServicesSection'
import { RepairCasesSection } from './sections/RepairCasesSection'
import { BrandsSection } from './sections/BrandsSection'
import { LocationsSection } from './sections/LocationsSection'
import { FinalCTASection } from './sections/FinalCTASection'
import { Footer } from './components/Footer'
import { ContactModal } from './components/ContactModal'
import { useLenis } from './hooks/useLenis'

export const App: React.FC = () => {
  // Initialize Lenis 60fps/120fps smooth scrolling
  useLenis()

  // Diagnosis intake modal state
  const [isContactOpen, setIsContactOpen] = useState(false)

  const handleOpenContact = () => setIsContactOpen(true)
  const handleCloseContact = () => setIsContactOpen(false)

  return (
    <div className="min-h-screen bg-[#11100F] text-[#F4F0E8] font-sans antialiased selection:bg-[#64131C] selection:text-white relative">
      {/* Floating Header Navigation */}
      <Navbar onOpenContact={handleOpenContact} />

      <main>
        {/* 1. Cinematic Interactive Hero (Quote State -> Brand & 3D Laptop Reveal) */}
        <HeroSection onOpenContact={handleOpenContact} />

        {/* 2. Technical Macro Photography Marquee (Two-Row Scroll Reactive) */}
        <MarqueeSection />

        {/* 3. About / Trust Statement ("We fix what others tell you to replace") */}
        <AboutTrustSection onOpenContact={handleOpenContact} />

        {/* 4. "Screen Se Motherboard Tak" Interactive Laptop Anatomy */}
        <AnatomySection onOpenContact={handleOpenContact} />

        {/* 5. 6 Core Repair Disciplines */}
        <ServicesSection onOpenContact={handleOpenContact} />

        {/* 6. Real Workbench Case Studies (Sticky Scaling Cards) */}
        <RepairCasesSection onOpenContact={handleOpenContact} />

        {/* 7. Ecosystem & Multi-Brand Mastery */}
        <BrandsSection />

        {/* 8. Kanpur & Prayagraj Physical Studios */}
        <LocationsSection onOpenContact={handleOpenContact} />

        {/* 9. Final Bold CTA */}
        <FinalCTASection onOpenContact={handleOpenContact} />
      </main>

      {/* 10. Studio Footer */}
      <Footer />

      {/* Diagnosis Intake Modal */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </div>
  )
}

export default App
