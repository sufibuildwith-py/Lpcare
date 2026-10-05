import React from 'react'
import { SERVICES_DATA } from '../data/repairData'
import { FadeIn } from '../components/FadeIn'
import { CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react'

interface ServicesSectionProps {
  onOpenContact: () => void
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="services"
      className="relative w-full bg-[#FAF7F2] text-[#11100F] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-12 py-24 sm:py-32 md:py-40 z-10"
      aria-label="Laptop Care Complete Repair Disciplines"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
          <FadeIn delay={0} y={20}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11100F]/5 border border-[#11100F]/10 text-xs font-mono uppercase tracking-widest text-[#64131C] font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>04 // CORE DISCIPLINES</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} y={30}>
            <h2
              className="text-[#11100F] font-black uppercase text-center leading-none tracking-tight select-none"
              style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
            >
              Services
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={20}>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#11100F]/70 font-light max-w-2xl leading-relaxed">
              From single-component screen replacements to complex multi-layer motherboard tracing, we cover the complete spectrum of laptop engineering.
            </p>
          </FadeIn>
        </div>

        {/* Services Numbered List */}
        <div className="flex flex-col w-full">
          {SERVICES_DATA.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={index * 0.08}
              y={30}
              duration={0.7}
              className={`w-full py-10 sm:py-14 md:py-16 border-b border-[#11100F]/15 ${
                index === 0 ? 'border-t border-[#11100F]/15' : ''
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-12 group transition-all duration-300">
                {/* Left Column: Huge Number & Badge */}
                <div className="flex flex-row lg:flex-col items-baseline lg:items-start justify-between w-full lg:w-48 shrink-0 gap-4">
                  <div
                    className="font-black text-[#11100F] leading-none tracking-tighter group-hover:text-[#64131C] transition-colors duration-300"
                    style={{ fontSize: 'clamp(3.5rem, 8vw, 110px)' }}
                  >
                    {service.number}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#11100F]/5 border border-[#11100F]/10 text-[#64131C] font-semibold">
                    {service.badge}
                  </span>
                </div>

                {/* Right Column: Title, Subtitle, Description & Key Features */}
                <div className="flex flex-col gap-4 flex-1">
                  <div>
                    <h3
                      className="font-extrabold uppercase text-[#11100F] tracking-tight group-hover:text-[#64131C] transition-colors duration-300"
                      style={{ fontSize: 'clamp(1.3rem, 2.8vw, 2.2rem)' }}
                    >
                      {service.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs sm:text-sm text-[#64131C] font-medium">
                      {service.subtitle}
                    </p>
                  </div>

                  <p
                    className="font-light leading-relaxed max-w-3xl text-[#11100F]/75 text-sm sm:text-base md:text-lg"
                  >
                    {service.description}
                  </p>

                  {/* Bullet Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 mt-2 border-t border-[#11100F]/10">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#11100F]/80">
                        <CheckCircle2 className="w-4 h-4 text-[#64131C] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={onOpenContact}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#11100F] font-bold group-hover:text-[#64131C] transition-colors"
                    >
                      <span>Book this service</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#64131C] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
