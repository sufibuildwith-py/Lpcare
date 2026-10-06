import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SERVICES_DATA, type ServicePillar } from '../data/repairData'
import { useDraggableInfiniteReel } from '../hooks/useDraggableInfiniteReel'
import { FadeIn } from '../components/FadeIn'
import { ArrowUpRight, Sparkles, X, CheckCircle2 } from 'lucide-react'

interface ServicesSectionProps {
  onOpenContact: () => void
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  // State for active service detail modal
  const [selectedService, setSelectedService] = useState<ServicePillar | null>(null)

  // Listen for Escape key and lock body scroll while modal is active
  useEffect(() => {
    if (!selectedService) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedService(null)
      }
    }
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedService])

  // Top Rail: Services 01, 02, 03 continuously moving LEFT -> RIGHT (direction: 'right')
  const topReel = useDraggableInfiniteReel({
    direction: 'right',
    speedDesktop: 28,
    speedMobile: 22,
    gapFallback: 16,
  })

  // Bottom Rail: Services 04, 05, 06 continuously moving RIGHT -> LEFT (direction: 'left')
  const bottomReel = useDraggableInfiniteReel({
    direction: 'left',
    speedDesktop: 22,
    speedMobile: 18,
    gapFallback: 16,
  })

  // Partition the 6 core services into two 3-service lanes
  const topServices = SERVICES_DATA.slice(0, 3) // 01, 02, 03
  const bottomServices = SERVICES_DATA.slice(3, 6) // 04, 05, 06

  // Double items inside each set to ensure stride comfortably exceeds even 4K viewports with zero gaps
  const topItems = [...topServices, ...topServices]
  const bottomItems = [...bottomServices, ...bottomServices]

  // Card pointer position tracking for robust tap/click detection
  const cardPointerDownPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // Render a short, slim horizontal technical service plate (ratio ~5:1 / ~6:1)
  const renderServiceCard = (
    service: ServicePillar,
    idx: number,
    keyPrefix: string,
    reel: ReturnType<typeof useDraggableInfiniteReel>
  ) => (
    <div
      key={`${keyPrefix}-${service.number}-${idx}`}
      className="w-[84vw] sm:w-[420px] md:w-[460px] lg:w-[500px] shrink-0"
    >
      <div
        onPointerDown={(e) => {
          cardPointerDownPos.current = { x: e.clientX, y: e.clientY }
        }}
        onPointerUp={(e) => {
          const dist = Math.hypot(
            e.clientX - cardPointerDownPos.current.x,
            e.clientY - cardPointerDownPos.current.y
          )
          if (dist < 6 && !reel.justDraggedRef.current) {
            setSelectedService(service)
          }
        }}
        onClick={(e) => {
          e.stopPropagation()
          if (reel.justDraggedRef.current) return
          setSelectedService(service)
        }}
        className="group relative rounded-2xl bg-white/90 hover:bg-white border border-[#11100F]/10 hover:border-[#64131C]/40 px-4 py-3 sm:px-5 sm:py-3.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-center select-none cursor-pointer"
      >
        {/* Top Row: Number, Title and Direct Action Arrow */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="font-mono text-sm sm:text-base font-black text-[#64131C] shrink-0 tracking-tight">
              {service.number}
            </span>
            <h3 className="text-xs sm:text-[13px] font-black uppercase tracking-tight text-[#11100F] group-hover:text-[#64131C] transition-colors truncate">
              {service.title}
            </h3>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#64131C] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* Bottom Row: Short 1-line descriptor & subtle bench active indicator */}
        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="font-mono text-[10px] sm:text-[11px] text-[#11100F]/65 truncate font-normal leading-tight">
            {service.subtitle}
          </p>
          <span
            className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
            title="Active Workbench Discipline"
          />
        </div>
      </div>
    </div>
  )

  return (
    <section
      id="services"
      className="relative w-full bg-[#FAF7F2] text-[#11100F] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] py-10 sm:py-14 md:py-16 z-10 overflow-hidden select-none"
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
        className={`relative w-full overflow-hidden py-1 sm:py-1.5 ${
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
          className="flex gap-3.5 sm:gap-4 will-change-transform w-max items-stretch"
        >
          {/* Set 0 (Buffer Set on left) */}
          <div className="flex gap-3.5 sm:gap-4 shrink-0 items-stretch" aria-hidden="true">
            {topItems.map((service, idx) => renderServiceCard(service, idx, 'top-set0', topReel))}
          </div>

          {/* Set 1 (Primary Measured Set) */}
          <div ref={topReel.singleSetRef} className="flex gap-3.5 sm:gap-4 shrink-0 items-stretch">
            {topItems.map((service, idx) => renderServiceCard(service, idx, 'top-set1', topReel))}
          </div>

          {/* Set 2 (Buffer Set on right) */}
          <div className="flex gap-3.5 sm:gap-4 shrink-0 items-stretch" aria-hidden="true">
            {topItems.map((service, idx) => renderServiceCard(service, idx, 'top-set2', topReel))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          CENTER HEADING: Framing between the two opposing reels
          ========================================================================= */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-5 sm:py-7 md:py-8 text-center">
        <FadeIn delay={0} y={15}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11100F]/5 border border-[#11100F]/10 text-xs font-mono uppercase tracking-widest text-[#64131C] font-semibold mb-2 sm:mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>04 // CORE DISCIPLINES</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <h2
            className="text-[#11100F] font-black uppercase text-center leading-none tracking-tight select-none"
            style={{ fontSize: 'clamp(2.2rem, 6.5vw, 92px)' }}
          >
            Services
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} y={15}>
          <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-[#11100F]/70 font-light max-w-lg mx-auto leading-relaxed">
            From single-component screen replacements to complex multi-layer motherboard tracing, we cover the complete spectrum of laptop engineering.
          </p>
        </FadeIn>

        {/* Visual Lane Orientation & Drag Guidance Strip */}
        <div className="mt-3.5 flex items-center justify-center gap-4 sm:gap-8 text-[11px] font-mono text-[#11100F]/50 select-none">
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <span className="text-[#64131C] font-bold">01 → 03</span>
            <span>HARDWARE · MOTHERBOARD · THERMALS</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#64131C] font-semibold bg-[#11100F]/5 px-3 py-0.5 rounded-full border border-[#11100F]/10 text-[10px] sm:text-[11px]">
            <span>↔ DRAG REELS TO EXPLORE</span>
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
        className={`relative w-full overflow-hidden py-1 sm:py-1.5 ${
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
          className="flex gap-3.5 sm:gap-4 will-change-transform w-max items-stretch"
        >
          {/* Set 0 (Buffer Set on left) */}
          <div className="flex gap-3.5 sm:gap-4 shrink-0 items-stretch" aria-hidden="true">
            {bottomItems.map((service, idx) => renderServiceCard(service, idx, 'bottom-set0', bottomReel))}
          </div>

          {/* Set 1 (Primary Measured Set) */}
          <div ref={bottomReel.singleSetRef} className="flex gap-3.5 sm:gap-4 shrink-0 items-stretch">
            {bottomItems.map((service, idx) => renderServiceCard(service, idx, 'bottom-set1', bottomReel))}
          </div>

          {/* Set 2 (Buffer Set on right) */}
          <div className="flex gap-3.5 sm:gap-4 shrink-0 items-stretch" aria-hidden="true">
            {bottomItems.map((service, idx) => renderServiceCard(service, idx, 'bottom-set2', bottomReel))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          SERVICE DETAIL POPUP MODAL (Opens upon clicking any floating strip)
          ========================================================================= */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-[#11100F]/80 backdrop-blur-md"
            />

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl bg-[#161514] border border-sand/15 p-6 sm:p-8 shadow-2xl z-10 my-auto text-[#F4F0E8] overflow-hidden"
            >
              {/* Subtle Maroon Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#64131C]/25 rounded-full blur-3xl pointer-events-none" />

              {/* Modal Header: Number, Badge & Close Icon */}
              <div className="flex items-center justify-between pb-4 border-b border-sand/10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl sm:text-2xl font-black text-maroon-light">
                    {selectedService.number}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-sand/10 border border-sand/15 text-maroon-light font-semibold">
                    {selectedService.badge}
                  </span>
                </div>

                {/* Corner Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="w-8 h-8 rounded-full bg-sand/10 hover:bg-sand/20 border border-sand/15 flex items-center justify-center text-sand/80 hover:text-white transition-colors"
                  aria-label="Close service details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content Body: Title, Subtitle, Description & Features */}
              <div className="pt-4">
                <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-white">
                  {selectedService.title}
                </h3>
                <p className="font-mono text-xs text-maroon-light font-medium mt-1">
                  {selectedService.subtitle}
                </p>

                {/* Full Description from Service Data */}
                <p className="mt-3.5 text-xs sm:text-sm text-sand/80 font-light leading-relaxed">
                  {selectedService.description}
                </p>

                {/* Key Capabilities / Engineering Highlights */}
                <div className="mt-4 pt-4 border-t border-sand/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-sand/50 font-semibold block mb-1">
                    Workbench Capabilities:
                  </span>
                  {selectedService.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-sand/85">
                      <CheckCircle2 className="w-3.5 h-3.5 text-maroon-light shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer: Close Button & Book This Service CTA */}
              <div className="mt-6 pt-5 border-t border-sand/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2.5 rounded-full border border-sand/20 text-sand/80 hover:text-white hover:border-sand/40 text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedService(null)
                    onOpenContact()
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#64131C] hover:bg-[#841B26] text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                >
                  <span>Book this service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ServicesSection
