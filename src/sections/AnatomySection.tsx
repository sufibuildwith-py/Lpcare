import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ANATOMY_LAYERS } from '../data/repairData'
import { CheckCircle2, ArrowRight, Layers, AlertCircle } from 'lucide-react'

interface AnatomySectionProps {
  onOpenContact: () => void
}

export const AnatomySection: React.FC<AnatomySectionProps> = ({ onOpenContact }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const isManualClickRef = useRef<boolean>(false)
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Automatic scroll-driven progression through all 6 anatomy layers
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isManualClickRef.current) return
    const calculatedIndex = Math.min(
      ANATOMY_LAYERS.length - 1,
      Math.max(0, Math.floor(latest * ANATOMY_LAYERS.length))
    )
    setActiveIndex(calculatedIndex)
  })

  // Manual click on horizontal navigation rail with smooth lock
  const handleSelectLayer = (index: number) => {
    setActiveIndex(index)
    isManualClickRef.current = true
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current)
    clickTimeoutRef.current = setTimeout(() => {
      isManualClickRef.current = false
    }, 1200)
  }

  const activeLayer = ANATOMY_LAYERS[activeIndex] || ANATOMY_LAYERS[0]

  return (
    <section
      id="anatomy"
      ref={containerRef}
      className="relative w-full bg-[#11100F] text-[#F4F0E8] border-t border-sand/10 h-[175vh] select-none"
      aria-label="Laptop Anatomy — Screen Se Motherboard Tak"
    >
      {/* Sticky Compact Technical Inspection Instrument Viewport */}
      <div className="sticky top-16 sm:top-20 z-10 w-full px-4 sm:px-8 md:px-12 py-6 sm:py-8 flex flex-col justify-center">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[420px] h-[320px] bg-maroon/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full flex flex-col">
          {/* 1. Compact Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3 sm:mb-4 pb-2.5 border-b border-sand/10">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sand/5 border border-sand/10 text-[11px] font-mono uppercase tracking-widest text-maroon-light font-semibold">
                <Layers className="w-3 h-3" />
                <span>05 // ANATOMY EXPLORER</span>
              </div>
              <h2 className="text-base sm:text-xl md:text-2xl font-black uppercase tracking-tight text-sand">
                SCREEN SE{' '}
                <span className="font-serif italic font-normal text-maroon-light lowercase">
                  motherboard tak
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono text-sand/50">
              <span className="hidden md:inline-block">SCROLL TO INSPECT ARCHITECTURE</span>
              <span className="text-maroon-light font-semibold">
                0{activeIndex + 1} / 0{ANATOMY_LAYERS.length}
              </span>
            </div>
          </div>

          {/* 2. Compact Horizontal Category Navigation Rail */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-3.5 scrollbar-none select-none">
            {ANATOMY_LAYERS.map((layer, idx) => {
              const isSelected = idx === activeIndex
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => handleSelectLayer(idx)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 shrink-0 flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-maroon text-white border-maroon-light shadow-md'
                      : 'bg-dark-pure/60 border-sand/10 text-sand/65 hover:border-sand/25 hover:text-white'
                  }`}
                >
                  <span className={`font-bold ${isSelected ? 'text-sand' : 'text-maroon-light'}`}>
                    {layer.number}
                  </span>
                  <span className="font-semibold">{layer.name.split(' ')[0]}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              )
            })}
          </div>

          {/* 3. Compact Technical Inspection Instrument Card */}
          <div className="rounded-2xl sm:rounded-3xl glass-dark border border-sand/15 p-4 sm:p-6 md:p-7 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch">
              {/* Visual Anchor Column: Controlled Macro Photography */}
              <div className="lg:col-span-5 h-[180px] sm:h-[220px] lg:h-[270px] rounded-xl sm:rounded-2xl overflow-hidden bg-dark-pure border border-sand/15 relative group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLayer.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={activeLayer.image}
                      alt={activeLayer.name}
                      className="w-full h-full object-cover select-none"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-pure/90 via-dark-pure/20 to-transparent pointer-events-none" />

                    {/* Top Layer Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-dark-pure/80 border border-sand/20 text-maroon-light font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                        LAYER {activeLayer.number} // {activeLayer.hindiName}
                      </span>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-sand/80 px-2 py-0.5 rounded bg-dark-pure/70 border border-sand/15">
                        Live Workbench Asset
                      </span>
                      <span className="text-emerald-400 font-semibold">
                        LAPTOP CARE LABS
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Technical Diagnostic Information Column */}
              <div className="lg:col-span-7 flex flex-col justify-between min-h-[220px] sm:min-h-[250px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLayer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Title & Tagline */}
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight">
                          {activeLayer.name}
                        </h3>
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>100% Guaranteed</span>
                        </span>
                      </div>
                      <p className="font-mono text-xs text-maroon-light font-medium mt-0.5">
                        {activeLayer.tagline}
                      </p>

                      {/* Description */}
                      <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm text-sand/80 font-light leading-relaxed line-clamp-3">
                        {activeLayer.description}
                      </p>

                      {/* Common Symptoms Handled */}
                      <div className="mt-3 pt-2.5 border-t border-sand/10">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-sand/50 font-semibold block mb-1">
                          Common Symptoms Handled:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeLayer.commonIssues.map((issue, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-dark-pure/80 border border-sand/15 text-[11px] font-mono text-sand/85 flex items-center gap-1.5"
                            >
                              <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
                              <span>{issue}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Resolution & CTA Footer */}
                    <div className="mt-3.5 pt-2.5 border-t border-sand/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Resolution: {activeLayer.repairType}</span>
                      </div>

                      <button
                        type="button"
                        onClick={onOpenContact}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-maroon hover:bg-maroon-light text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95 shrink-0"
                      >
                        <span>Fix This Problem</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnatomySection
