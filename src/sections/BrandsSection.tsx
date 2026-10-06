import React from 'react'
import { BRANDS_LIST, type BrandItem } from '../data/repairData'
import { useDraggableInfiniteReel } from '../hooks/useDraggableInfiniteReel'
import { Laptop, Cpu, CheckCircle2 } from 'lucide-react'

export const BrandsSection: React.FC = () => {
  // Autonomous continuous Right-to-Left flow (direction: 'left')
  // Fully interactive: draggable in both directions with inertia and modulo wrapping
  const {
    sectionRef,
    viewportRef,
    trackRef,
    singleSetRef,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    justDraggedRef,
  } = useDraggableInfiniteReel({
    direction: 'left',
    speedDesktop: 48,
    speedMobile: 36,
    gapFallback: 24,
  })

  // Render a compact editorial specification strip (train car)
  const renderBrandCard = (brand: BrandItem, idx: number, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${brand.name}-${idx}`}
      className="w-[82vw] sm:w-[360px] md:w-[390px] lg:w-[420px] shrink-0"
    >
      <div
        onClick={() => {
          if (justDraggedRef.current) return // Prevent click if user was dragging
        }}
        className="group relative h-full rounded-2xl sm:rounded-3xl bg-[#161514]/90 border border-sand/10 hover:border-maroon-light/50 p-5 sm:p-6 shadow-xl transition-all duration-300 flex flex-col justify-between select-none"
      >
        <div>
          {/* Card Top: Number, Brand Name & Verified Tag */}
          <div className="flex items-center justify-between pb-3 border-b border-sand/10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-maroon-light tracking-wider">
                0{idx + 1}
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white group-hover:text-maroon-light transition-colors">
                {brand.name}
              </h3>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Verified Lab</span>
            </span>
          </div>

          {/* Series / Platform Line */}
          <p className="mt-3 font-mono text-xs text-sand/85 font-medium leading-snug">
            {brand.series}
          </p>

          {/* Diagnostic Expertise */}
          <p className="mt-2 text-xs text-sand/60 font-light leading-relaxed line-clamp-2">
            {brand.expertise}
          </p>
        </div>

        {/* Card Bottom Strip */}
        <div className="mt-4 pt-3 border-t border-sand/10 flex items-center justify-between text-[10px] font-mono text-sand/45">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-maroon-light" />
            <span>OEM Schematics &amp; BGA Stencils</span>
          </span>
          <span className="text-emerald-400 font-semibold">Active</span>
        </div>
      </div>
    </div>
  )

  return (
    <section
      id="brands"
      ref={sectionRef}
      className="relative w-full bg-[#11100F] text-[#F4F0E8] py-16 sm:py-20 overflow-hidden border-t border-sand/10 select-none"
      aria-label="Supported Laptop Brands and Ecosystem"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mb-8 sm:mb-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-maroon-light mb-2.5">
              <Laptop className="w-3.5 h-3.5" />
              <span>07 // ECOSYSTEM MASTERY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-sand leading-[1.08]">
              EVERY MAJOR BRAND.{' '}
              <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-maroon-light lowercase tracking-normal">
                every architecture.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-sand/65 font-light max-w-md leading-relaxed lg:text-right">
            We maintain OEM schematics, boardview files, dedicated BGA stencils, and firmware flashers for all modern laptop platforms.
          </p>
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
        className={`relative w-full overflow-hidden py-2 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Subtle Edge Vignettes for smooth boundary fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#11100F] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#11100F] to-transparent z-10" />

        {/* 
          Tripled Track Pattern for Seamless Modulo Wrapping:
          - Set 0: Left buffer
          - Set 1: Measured set (attached to singleSetRef)
          - Set 2: Right buffer
        */}
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 will-change-transform w-max items-stretch"
        >
          {/* Set 0 (Buffer Set on left) */}
          <div className="flex gap-4 sm:gap-6 shrink-0 items-stretch" aria-hidden="true">
            {BRANDS_LIST.map((brand, idx) => renderBrandCard(brand, idx, 'set0'))}
          </div>

          {/* Set 1 (Primary Measured Set) */}
          <div ref={singleSetRef} className="flex gap-4 sm:gap-6 shrink-0 items-stretch">
            {BRANDS_LIST.map((brand, idx) => renderBrandCard(brand, idx, 'set1'))}
          </div>

          {/* Set 2 (Buffer Set on right) */}
          <div className="flex gap-4 sm:gap-6 shrink-0 items-stretch" aria-hidden="true">
            {BRANDS_LIST.map((brand, idx) => renderBrandCard(brand, idx, 'set2'))}
          </div>
        </div>
      </div>

      {/* Subtle Drag Guidance Strip */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-5 flex items-center justify-between text-[11px] font-mono text-sand/40">
        <span className="hidden sm:inline-block">← DRAG HORIZONTALLY TO INSPECT PLATFORMS →</span>
        <span className="mx-auto sm:mx-0">9 CORE PLATFORMS · CHIP-LEVEL BOARDVIEW ARCHIVE</span>
        <span className="hidden sm:inline-block">DIRECT WORKBENCH COMPATIBILITY</span>
      </div>
    </section>
  )
}

export default BrandsSection
