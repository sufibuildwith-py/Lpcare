import React from 'react'
import { FadeIn } from '../components/FadeIn'
import { AnimatedText } from '../components/AnimatedText'
import { useDraggableInfiniteReel } from '../hooks/useDraggableInfiniteReel'
import { ShieldCheck, Cpu, Wrench, Search, LucideIcon } from 'lucide-react'

interface AboutTrustSectionProps {
  onOpenContact: () => void
}

interface TrustPillar {
  icon: LucideIcon
  title: string
  desc: string
}

export const AboutTrustSection: React.FC<AboutTrustSectionProps> = ({ onOpenContact }) => {
  const statement =
    "Most service centers take one look at a dead laptop and declare a full motherboard replacement. At Laptop Care, our engineers trace the schematics, replace the shorted power MOSFET or charging controller, and revive your machine at a fraction of the cost."

  const pillars: TrustPillar[] = [
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
      title: 'Kanpur Service Centre',
      desc: 'Dedicated physical workbench with fast-track express turnarounds at Somdutt Plaza, Kanpur.',
    },
  ]

  // Autonomous continuous Left-to-Right conveyor flow (direction: 'right')
  // Fully interactive: draggable with mouse/touch, inertia, momentum decay and modulo wrapping
  const {
    viewportRef,
    trackRef,
    singleSetRef,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    justDraggedRef,
  } = useDraggableInfiniteReel({
    direction: 'right',
    speedDesktop: 24,
    speedMobile: 18,
    gapFallback: 20,
  })

  // Double the 4 pillars to 8 cards per set to ensure stride comfortably exceeds even 4K viewports with zero gaps
  const trustItems = [...pillars, ...pillars]

  // Render a compact, slim horizontal editorial rectangular card
  const renderCard = (pillar: TrustPillar, idx: number, keyPrefix: string) => {
    const Icon = pillar.icon
    return (
      <div
        key={`${keyPrefix}-${pillar.title}-${idx}`}
        className="w-[84vw] sm:w-[380px] md:w-[410px] lg:w-[430px] shrink-0"
      >
        <div
          onClick={() => {
            if (justDraggedRef.current) return
            onOpenContact()
          }}
          className="group relative h-full rounded-2xl bg-white/90 hover:bg-white border border-[#11100F]/10 hover:border-[#64131C]/40 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3.5 sm:gap-4 select-none cursor-pointer"
        >
          {/* Number & Icon Lockup */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-base sm:text-lg font-black text-[#64131C] tracking-tight">
              0{idx + 1}
            </span>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#64131C]/10 border border-[#64131C]/20 flex items-center justify-center text-[#64131C] group-hover:bg-[#64131C] group-hover:text-[#F4F0E8] transition-colors duration-300 shrink-0">
              <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
          </div>

          {/* Content: Title & Condensed Description */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-[#11100F] group-hover:text-[#64131C] transition-colors truncate">
                {pillar.title}
              </h3>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#64131C]/80 font-bold px-2 py-0.5 rounded-full bg-[#11100F]/5 shrink-0 hidden sm:inline-block">
                Protocol
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#11100F]/70 font-light leading-snug line-clamp-2 mt-1">
              {pillar.desc}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      id="about"
      className="relative w-full bg-[#F4F0E8] text-[#11100F] py-16 sm:py-20 md:py-24 overflow-hidden select-none"
      aria-label="Why Choose Laptop Care"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center px-5 sm:px-8 md:px-12">
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
        <div className="mt-8 sm:mt-10 max-w-3xl text-center">
          <AnimatedText
            text={statement}
            className="text-[#11100F] font-bold text-center leading-relaxed text-base sm:text-lg md:text-xl"
          />
        </div>
      </div>

      {/* Infinite Draggable Horizontal Reel Viewport */}
      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        className={`relative w-full overflow-hidden mt-10 sm:mt-14 py-2 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        aria-label="Philosophy and trust protocols reel (Left to Right)"
      >
        {/* Subtle Edge Vignettes for smooth boundary fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#F4F0E8] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#F4F0E8] to-transparent z-10" />

        {/* Tripled Track Pattern for Seamless Modulo Wrapping */}
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-5 will-change-transform w-max items-stretch"
        >
          {/* Set 0 (Buffer Set on left) */}
          <div className="flex gap-4 sm:gap-5 shrink-0 items-stretch" aria-hidden="true">
            {trustItems.map((pillar, idx) => renderCard(pillar, idx % 4, 'set0'))}
          </div>

          {/* Set 1 (Primary Measured Set) */}
          <div ref={singleSetRef} className="flex gap-4 sm:gap-5 shrink-0 items-stretch">
            {trustItems.map((pillar, idx) => renderCard(pillar, idx % 4, 'set1'))}
          </div>

          {/* Set 2 (Buffer Set on right) */}
          <div className="flex gap-4 sm:gap-5 shrink-0 items-stretch" aria-hidden="true">
            {trustItems.map((pillar, idx) => renderCard(pillar, idx % 4, 'set2'))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutTrustSection
