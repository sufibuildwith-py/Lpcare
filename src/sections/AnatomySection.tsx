import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ANATOMY_LAYERS } from '../data/repairData'
import { CheckCircle2, ArrowRight, Layers, AlertCircle } from 'lucide-react'

interface AnatomySectionProps {
  onOpenContact: () => void
}

export const AnatomySection: React.FC<AnatomySectionProps> = ({ onOpenContact }) => {
  const [activeLayerId, setActiveLayerId] = useState<string>(ANATOMY_LAYERS[0].id)
  const activeLayer = ANATOMY_LAYERS.find((l) => l.id === activeLayerId) || ANATOMY_LAYERS[0]

  return (
    <section
      id="anatomy"
      className="relative w-full bg-[#11100F] text-[#F4F0E8] px-5 sm:px-8 md:px-12 py-24 sm:py-32 overflow-hidden border-t border-sand/10"
      aria-label="Laptop Anatomy — Screen Se Motherboard Tak"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-maroon/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-sand/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-maroon-light mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>05 // ANATOMY EXPLORER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-sand leading-[1.08]">
              SCREEN SE{' '}
              <span className="font-serif italic font-normal text-maroon-light lowercase tracking-normal">
                motherboard tak
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-sand/70 font-light max-w-md leading-relaxed lg:text-right">
            Every component in your laptop interacts with the whole system. Select any layer to see how we diagnose and repair specific hardware failures.
          </p>
        </div>

        {/* Interactive Segmented Layer Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-8 sm:mb-12">
          {ANATOMY_LAYERS.map((layer) => {
            const isSelected = layer.id === activeLayerId
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayerId(layer.id)}
                className={`relative rounded-2xl p-3.5 sm:p-4 text-left transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-maroon/90 border-maroon-light text-white shadow-xl translate-y-[-2px]'
                    : 'glass-dark border-sand/10 text-sand/70 hover:border-sand/30 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span
                    className={`font-mono text-xs font-bold tracking-widest ${
                      isSelected ? 'text-sand' : 'text-maroon-light'
                    }`}
                  >
                    {layer.number}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>

                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-sand/60">
                    {layer.hindiName}
                  </span>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-tight leading-tight block mt-0.5">
                    {layer.name.split(' ')[0]}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Layer Deep Inspection Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl glass-dark border border-sand/15 p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column (Content & Specs) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-maroon/40 border border-maroon-light text-maroon-light font-mono text-xs font-bold uppercase tracking-wider">
                      LAYER {activeLayer.number} // {activeLayer.hindiName}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-sand/40 hidden sm:inline-block">
                      100% Guaranteed Work
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
                    {activeLayer.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm font-mono text-maroon-light">
                    {activeLayer.tagline}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm md:text-base text-sand/80 font-light leading-relaxed">
                    {activeLayer.description}
                  </p>

                  {/* Common Failure Symptoms */}
                  <div className="mt-6 pt-5 border-t border-sand/10">
                    <span className="font-mono text-xs uppercase tracking-widest text-sand/60 font-semibold block mb-3">
                      Common Symptoms Handled:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeLayer.commonIssues.map((issue, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-dark-pure/80 border border-sand/15 text-xs font-mono text-sand/85 flex items-center gap-2"
                        >
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{issue}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="mt-8 pt-6 border-t border-sand/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 text-xs text-emerald-400 font-mono">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Resolution: {activeLayer.repairType}</span>
                  </div>

                  <button
                    onClick={onOpenContact}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-maroon hover:bg-maroon-light text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95 shrink-0"
                  >
                    <span>Fix This Problem</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column (Macro Photography) */}
              <div className="lg:col-span-5 h-[280px] sm:h-[360px] lg:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden bg-dark-pure border border-sand/15 relative group">
                <img
                  src={activeLayer.image}
                  alt={activeLayer.name}
                  className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-pure/90 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-sand px-3 py-1 rounded-lg glass-dark border border-sand/20">
                    Live Workshop Asset
                  </span>
                  <span className="font-mono text-xs text-sand/60">
                    LAPTOP CARE LABS
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
