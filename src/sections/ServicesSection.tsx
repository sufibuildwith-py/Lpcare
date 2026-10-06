import React from 'react'
import { SERVICES_DATA, type ServicePillar } from '../data/repairData'
import { useDraggableInfiniteReel } from '../hooks/useDraggableInfiniteReel'
import { FadeIn } from '../components/FadeIn'
import { CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react'

interface ServicesSectionProps {
  onOpenContact: () => void
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  // Top Rail: Services 01, 02, 03 continuously moving LEFT -> RIGHT (direction: 'right')
  const topReel = useDraggableInfiniteReel({
    direction: 'right',
    speedDesktop: 28,
    speedMobile: 22,
    gapFallback: 24,
  })

  // Bottom Rail: Services 04, 05, 06 continuously moving RIGHT -> LEFT (direction: 'left')
  const bottomReel = useDraggableInfiniteReel({
    direction: 'left',
    speedDesktop: 22,
    speedMobile: 18,
    gapFallback: 24,
  })

  // Partition the 6 core services into two 3-service lanes
  const topServices = SERVICES_DATA.slice(0, 3) // 01, 02, 03
  const bottomServices = SERVICES_DATA.slice(3, 6) // 04, 05, 06

  // Double items inside each set to ensure stride comfortably exceeds even 4K viewports with zero gaps
  const topItems = [...topServices, ...topServices]
  const bottomItems = [...bottomServices, ...bottomServices]

  // Render a compact, high-precision editorial service card
  const renderServiceCard = (
    service: ServicePillar,
    idx: number,
    keyPrefix: string,
    reel: ReturnType<typeof useDraggableInfiniteReel>
  ) => (
    <div
      key={`${keyPrefix}-${service.number}-${idx}`}
      className="w-[84vw] sm:w-[380px] md:w-[410px] lg:w-[440px] shrink-0"
    >
      <div
        onClick={() => {
          if (reel.justDraggedRef.current) return
          onOpenContact()
        }}
        className="group relative h-full rounded-2xl sm:rounded-3xl bg-white/90 hover:bg-white border border-[#11100F]/10 hover:border-[#64131C]/40 p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between select-none cursor-pointer"
      >
        <div>
          {/* Card Top: Number, Badge Pill & Active Indicator */}
          <div className="flex items-center justify-between pb-3 border-b border-[#11100F]/10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-black text-[#64131C] tracking-tight">
                {service.number}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#11100F]/5 border border-[#11100F]/10 text-[#64131C] font-semibold">
                {service.badge}
              </span>
            </div>
            <div
              className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
              title="Active Workbench Discipline"
            />
          </div>

          {/* Title & Subtitle */}
          <div className="pt-3">
            <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-[#11100F] group-hover:text-[#64131C] transition-colors leading-snug line-clamp-1">
              {service.title}
            </h3>
            <p className="font-mono text-[11px] sm:text-xs text-[#64131C]/90 font-medium line-clamp-1 mt-0.5">
              {service.subtitle}
            </p>
            <p className="mt-2 text-xs sm:text-[13px] text-[#11100F]/70 font-light leading-relaxed line-clamp-2">
              {service.description}
            </p>
          </div>

          {/* Key Engineering Highlights */}
          <div className="pt-3 mt-3 border-t border-[#11100F]/10 space-y-1.5">
            {service.features.slice(0, 2).map((feat, fIdx) => (
              <div key={fIdx} className="flex items-center gap-2 text-xs text-[#11100F]/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#64131C] shrink-0" />
                <span className="truncate font-sans">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer Strip with Direct Action */}
        <div className="pt-3 mt-3 border-t border-[#11100F]/10 flex items-center justify-between">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (!reel.justDraggedRef.current) {
                onOpenContact()
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#11100F] font-bold group-hover:text-[#64131C] transition-colors"
          >
            <span>Book this service</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#64131C] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <span className="text-[10px] font-mono text-[#11100F]/45 uppercase tracking-widest">
            OEM Certified
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <section
      id="services"
      className="relative w-full bg-[#FAF7F2] text-[#11100F] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] py-14 sm:py-20 md:py-24 z-10 overflow-hidden select-none"
      aria-label="Laptop Care Complete Repair Disciplines"
    >
      {/* =========================================================================
          TOP RAIL: 01 -> 02 -> 03 (Flows continuously LEFT -> RIGHT)
          ========================================================================= */}
      <div
        ref={topReel.viewportRef}
        onPointerDown={topReel.handlePointerDown}
        onPointerMove={topReel.handlePointerMove}
        onPointerUp={topReel.handlePointerUp}
        onPointerCancel={topReel.handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        className={`relative w-full overflow-hidden py-2 ${
          topReel.isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        aria-label="Hardware & Chip-level services reel (Left to Right)"
      >
        {/* Left & Right Edge Vignettes for smooth boundary fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10" />

        {/* Tripled Track Pattern for Seamless Modulo Wrapping */}
        <div
          ref={topReel.trackRef}
          className="flex gap-4 sm:gap-6 will-change-transform w-max items-stretch"
        >
          {/* Set 0 (Buffer Set on left) */}
          <div className="flex gap-4 sm:gap-6 shrink-0 items-stretch" aria-hidden="true">
            {topItems.map((service, idx) => renderServiceCard(service, idx, 'top-set0', topReel))}
          </div>

          {/* Set 1 (Primary Measured Set) */}
          <div ref={topReel.singleSetRef} className="flex gap-4 sm:gap-6 shrink-0 items-stretch">
            {topItems.map((service, idx) => renderServiceCard(service, idx, 'top-set1', topReel))}
          </div>

          {/* Set 2 (Buffer Set on right) */}
          <div className="flex gap-4 sm:gap-6 shrink-0 items-stretch" aria-hidden="true">
            {topItems.map((service, idx) => renderServiceCard(service, idx, 'top-set2', topReel))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          CENTER HEADING: Framing between the two opposing reels
          ========================================================================= */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-12 md:py-14 text-center">
        <FadeIn delay={0} y={15}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11100F]/5 border border-[#11100F]/10 text-xs font-mono uppercase tracking-widest text-[#64131C] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>04 // CORE DISCIPLINES</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <h2
            className="text-[#11100F] font-black uppercase text-center leading-none tracking-tight select-none"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 110px)' }}
          >
            Services
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} y={15}>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#11100F]/70 font-light max-w-xl mx-auto leading-relaxed">
            From single-component screen replacements to complex multi-layer motherboard tracing, we cover the complete spectrum of laptop engineering.
          </p>
        </FadeIn>

        {/* Visual Lane Orientation & Drag Guidance Strip */}
        <div className="mt-5 flex items-center justify-center gap-4 sm:gap-8 text-[11px] font-mono text-[#11100F]/50 select-none">
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <span className="text-[#64131C] font-bold">01 → 03</span>
            <span>HARDWARE · MOTHERBOARD · THERMALS</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#64131C] font-semibold bg-[#11100F]/5 px-3 py-1 rounded-full border border-[#11100F]/10">
            <span>↔ DRAG ANY LANE</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <span>SOFTWARE · DATA LAB · DIAGNOSIS</span>
            <span className="text-[#64131C] font-bold">04 ← 06</span>
          </span>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM RAIL: 04 -> 05 -> 06 (Flows continuously RIGHT -> LEFT)
          ========================================================================= */}
      <div
        ref={bottomReel.viewportRef}
        onPointerDown={bottomReel.handlePointerDown}
        onPointerMove={bottomReel.handlePointerMove}
        onPointerUp={bottomReel.handlePointerUp}
        onPointerCancel={bottomReel.handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        className={`relative w-full overflow-hidden py-2 ${
          bottomReel.isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        aria-label="Software & Diagnostic services reel (Right to Left)"
      >
        {/* Left & Right Edge Vignettes for smooth boundary fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10" />

        {/* Tripled Track Pattern for Seamless Modulo Wrapping */}
        <div
          ref={bottomReel.trackRef}
          className="flex gap-4 sm:gap-6 will-change-transform w-max items-stretch"
        >
          {/* Set 0 (Buffer Set on left) */}
          <div className="flex gap-4 sm:gap-6 shrink-0 items-stretch" aria-hidden="true">
            {bottomItems.map((service, idx) => renderServiceCard(service, idx, 'bottom-set0', bottomReel))}
          </div>

          {/* Set 1 (Primary Measured Set) */}
          <div ref={bottomReel.singleSetRef} className="flex gap-4 sm:gap-6 shrink-0 items-stretch">
            {bottomItems.map((service, idx) => renderServiceCard(service, idx, 'bottom-set1', bottomReel))}
          </div>

          {/* Set 2 (Buffer Set on right) */}
          <div className="flex gap-4 sm:gap-6 shrink-0 items-stretch" aria-hidden="true">
            {bottomItems.map((service, idx) => renderServiceCard(service, idx, 'bottom-set2', bottomReel))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
