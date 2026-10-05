import React from 'react'
import { FadeIn } from '../components/FadeIn'
import { AnimatedText } from '../components/AnimatedText'
import { ShieldCheck, Cpu, Wrench, Search, ArrowUpRight } from 'lucide-react'

interface AboutTrustSectionProps {
  onOpenContact: () => void
}

export const AboutTrustSection: React.FC<AboutTrustSectionProps> = ({ onOpenContact }) => {
  const statement =
    "Most service centers take one look at a dead laptop and declare a full motherboard replacement. At Laptop Care, our engineers trace the schematics, replace the shorted power MOSFET or charging controller, and revive your machine at a fraction of the cost."

  const pillars = [
    {
      icon: Cpu,
      title: 'Micro-Soldering Lab',
      desc: 'Precision BGA rework, IC replacements, and power rail diagnostics down to 0.2mm component scale.',
    },
    {
      icon: Search,
      title: 'Circuit-Level Diagnosis',
      desc: 'We utilize digital oscilloscopes and thermal imaging to verify the exact failure before quoting.',
    },
    {
      icon: ShieldCheck,
      title: 'OEM Grade Sourcing',
      desc: 'Original high-refresh displays, genuine high-density battery packs, and verified silicon ICs.',
    },
    {
      icon: Wrench,
      title: 'Kanpur & Prayagraj Hubs',
      desc: 'Dedicated physical workbenches with fast-track express turnarounds and local pickup availability.',
    },
  ]

  return (
    <section
      id="about"
      className="relative w-full bg-[#F4F0E8] text-[#11100F] px-5 sm:px-8 md:px-12 py-24 sm:py-32 md:py-40 overflow-hidden"
      aria-label="Why Choose Laptop Care"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header Pill */}
        <FadeIn delay={0} y={20}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11100F]/5 border border-[#11100F]/10 text-xs font-mono uppercase tracking-widest text-[#64131C] font-semibold mb-6">
            <span>03 // PHILOSOPHY &amp; TRUST</span>
          </div>
        </FadeIn>

        {/* Display Headline */}
        <FadeIn delay={0.1} y={30} className="w-full max-w-5xl text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[1.06] text-[#11100F]">
            WE FIX WHAT OTHERS TELL YOU{' '}
            <span className="font-serif italic font-normal text-[#64131C] lowercase tracking-normal">
              to replace.
            </span>
          </h2>
        </FadeIn>

        {/* Scroll-Driven Animated Text */}
        <div className="mt-10 sm:mt-14 max-w-3xl text-center">
          <AnimatedText
            text={statement}
            className="text-[#11100F]/85 font-medium text-center leading-relaxed text-base sm:text-lg md:text-xl"
          />
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <FadeIn
                key={pillar.title}
                delay={idx * 0.12}
                y={30}
                className="rounded-2xl sm:rounded-3xl bg-white/80 border border-[#11100F]/10 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#64131C]/40 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#64131C]/10 border border-[#64131C]/20 flex items-center justify-center text-[#64131C] mb-6 group-hover:bg-[#64131C] group-hover:text-[#F4F0E8] transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-[#11100F] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#11100F]/70 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#11100F]/10 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#64131C] font-semibold">
                  <span>Standard Protocol</span>
                  <span>0{idx + 1}</span>
                </div>
              </FadeIn>
            )
          })}
        </div>

        {/* Callout Strip */}
        <FadeIn delay={0.4} y={20} className="mt-14 sm:mt-20 w-full max-w-4xl">
          <div className="rounded-2xl sm:rounded-3xl bg-[#11100F] text-[#F4F0E8] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-sand/10">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <div>
                <h4 className="text-base sm:text-lg font-bold uppercase tracking-tight text-sand">
                  Don&apos;t write off your laptop yet.
                </h4>
                <p className="text-xs sm:text-sm text-sand/65 font-light mt-0.5">
                  Bring it to our studio in Kanpur or Prayagraj for a bench circuit assessment.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenContact}
              className="w-full md:w-auto px-6 py-3 rounded-full bg-[#64131C] hover:bg-[#841B26] text-sand font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shrink-0 shadow-lg active:scale-95"
            >
              <span>Request Free Inspection</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
