import React from 'react'
import { LOCATIONS_DATA } from '../data/repairData'
import { FadeIn } from '../components/FadeIn'
import { MapPin, Phone, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react'

interface LocationsSectionProps {
  onOpenContact: () => void
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="locations"
      className="relative w-full bg-[#F4F0E8] text-[#11100F] px-5 sm:px-8 md:px-12 py-24 sm:py-32 overflow-hidden"
      aria-label="Laptop Care Repair Studios in Kanpur and Prayagraj"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11100F]/5 border border-[#11100F]/10 text-xs font-mono uppercase tracking-widest text-[#64131C] font-semibold mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>08 // PHYSICAL STUDIOS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#11100F] leading-[1.06]">
              KANPUR &amp;{' '}
              <span className="font-serif italic font-normal text-[#64131C] lowercase tracking-normal">
                prayagraj.
              </span>
            </h2>
          </div>
          <div className="max-w-md lg:text-right">
            <p className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#11100F]">
              “Local expertise. Laptop-level precision.”
            </p>
            <p className="text-xs sm:text-sm text-[#11100F]/70 font-light mt-1">
              Serving Kanpur, Prayagraj (Allahabad), and surrounding districts with dedicated diagnostic workbenches and express courier pickup.
            </p>
          </div>
        </div>

        {/* 2 Studio Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {LOCATIONS_DATA.map((loc, idx) => (
            <FadeIn
              key={loc.city}
              delay={idx * 0.15}
              y={30}
              className="rounded-3xl bg-white/90 border border-[#11100F]/10 p-7 sm:p-9 md:p-11 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-[#64131C]/40 hover:shadow-2xl"
            >
              <div>
                {/* Top Row: City & Badge */}
                <div className="flex items-center justify-between pb-6 border-b border-[#11100F]/10">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#64131C] font-bold block mb-1">
                      STUDIO HUB 0{idx + 1}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#11100F]">
                      {loc.city}
                    </h3>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-[#64131C]/10 border border-[#64131C]/20 text-xs font-mono font-semibold uppercase tracking-wider text-[#64131C]">
                    {loc.badge}
                  </span>
                </div>

                {/* Address, Phone & Hours */}
                <div className="flex flex-col gap-3.5 my-6 text-xs sm:text-sm text-[#11100F]/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#64131C] shrink-0 mt-0.5" />
                    <span className="font-medium">{loc.address}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-mono text-xs">{loc.phone}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#64131C] shrink-0" />
                    <span className="font-mono text-xs text-[#11100F]/70">{loc.hours}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-[#11100F]/10 flex flex-col gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#11100F]/50 font-semibold mb-1">
                    Workbench Capabilities:
                  </span>
                  {loc.services.map((srv, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs sm:text-sm text-[#11100F]/85">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#64131C] shrink-0" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-[#11100F]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-[#11100F]/60">
                  Walk-ins &amp; Doorstep Pickups Welcomed
                </span>

                <button
                  onClick={onOpenContact}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#64131C] hover:bg-[#841B26] text-sand font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <span>Visit {loc.city} Studio</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
