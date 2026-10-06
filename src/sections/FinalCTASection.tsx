import React from 'react'
import { FadeIn } from '../components/FadeIn'
import { ArrowUpRight, MessageSquare, ShieldCheck, CheckCircle2, Sparkles, Wrench } from 'lucide-react'

interface FinalCTASectionProps {
  onOpenContact: () => void
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#11100F] text-[#F4F0E8] px-5 sm:px-8 md:px-12 py-24 sm:py-32 md:py-40 overflow-hidden border-t border-sand/10"
      aria-label="Contact Laptop Care & Book Repair"
    >
      {/* Deep Maroon Ambient Glow behind headline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] bg-maroon/25 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Badge */}
        <FadeIn delay={0} y={20}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark border border-sand/15 text-xs font-mono uppercase tracking-widest text-maroon-light font-semibold mb-6 shadow-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>09 // WORKBENCH RESERVATION</span>
          </div>
        </FadeIn>

        {/* Display Headline */}
        <FadeIn delay={0.1} y={30}>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-sand leading-[1.05]">
            YOUR LAPTOP HAS A PROBLEM.{' '}
            <br />
            <span className="font-serif italic font-normal text-maroon-light lowercase tracking-normal">
              let&apos;s fix it.
            </span>
          </h2>
        </FadeIn>

        {/* Core Brand Line */}
        <FadeIn delay={0.2} y={20}>
          <p className="mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-sand/80 font-medium max-w-2xl leading-relaxed">
            “Screen se motherboard tak, laptop ki har problem ka Care.”
          </p>
        </FadeIn>

        <FadeIn delay={0.3} y={20}>
          <p className="mt-2 text-xs sm:text-sm text-sand/55 font-light max-w-lg">
            Certified chip-level diagnostics at our Kanpur service centre (Prayagraj soon to be added). Get a clear explanation and verified quote before any work starts.
          </p>
        </FadeIn>

        {/* Action Buttons */}
        <FadeIn delay={0.4} y={30} className="mt-10 sm:mt-14 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-maroon hover:bg-maroon-light text-white font-extrabold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 shadow-[0_0_30px_rgba(100,19,28,0.6)] active:scale-95 flex items-center justify-center gap-3"
          >
            <span>Request Workbench Diagnosis</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href="https://wa.me/918795530133?text=Hello%20Laptop%20Care,%20I%27d%20like%20to%20request%20a%20laptop%20diagnosis%20at%20the%20Kanpur%20service%20centre."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-full glass-dark border border-sand/20 text-sand hover:text-white font-semibold uppercase tracking-wider text-xs sm:text-sm transition-colors flex items-center justify-center gap-2.5 active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Technician</span>
          </a>
        </FadeIn>

        {/* Reassurance Guarantees */}
        <FadeIn delay={0.5} y={20} className="mt-16 sm:mt-20 pt-8 border-t border-sand/10 w-full grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono text-sand/70">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Up to 90 Days Repair Warranty</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-maroon-light shrink-0" />
            <span>Zero Guesswork Diagnosis</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Wrench className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Original OEM Grade Parts</span>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
