import React from 'react'
import { BRANDS_LIST } from '../data/repairData'
import { FadeIn } from '../components/FadeIn'
import { Laptop } from 'lucide-react'

export const BrandsSection: React.FC = () => {
  return (
    <section
      id="brands"
      className="relative w-full bg-[#11100F] text-[#F4F0E8] px-5 sm:px-8 md:px-12 py-24 sm:py-32 overflow-hidden border-t border-sand/10"
      aria-label="Supported Laptop Brands and Ecosystem"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-maroon-light mb-3">
              <Laptop className="w-3.5 h-3.5" />
              <span>07 // ECOSYSTEM MASTERY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-sand leading-[1.08]">
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

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {BRANDS_LIST.map((brand, idx) => (
            <FadeIn
              key={brand.name}
              delay={idx * 0.07}
              y={20}
              className="rounded-2xl sm:rounded-3xl glass-dark border border-sand/10 p-6 sm:p-7 flex flex-col justify-between hover:border-maroon-light/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white group-hover:text-maroon-light transition-colors">
                    {brand.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-sand/40 border border-sand/10 px-2 py-0.5 rounded-full glass-dark">
                    Certified Lab
                  </span>
                </div>

                <p className="font-mono text-xs text-sand/80 font-medium mb-3">
                  {brand.series}
                </p>

                <p className="text-xs text-sand/60 font-light leading-relaxed">
                  {brand.expertise}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-sand/10 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>Original Schematics Loaded</span>
                <span>✓</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
