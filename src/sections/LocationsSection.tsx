import React from 'react'
import { LOCATIONS_DATA } from '../data/repairData'
import { FadeIn } from '../components/FadeIn'
import { MapPin, Phone, Clock, CheckCircle2, MessageSquare } from 'lucide-react'

interface LocationsSectionProps {
  onOpenContact?: () => void
}

export const LocationsSection: React.FC<LocationsSectionProps> = () => {
  return (
    <section
      id="locations"
      className="relative w-full bg-[#F4F0E8] text-[#11100F] px-5 sm:px-8 md:px-12 py-24 sm:py-32 overflow-hidden"
      aria-label="Laptop Care Service Centres in Kanpur and Prayagraj"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11100F]/5 border border-[#11100F]/10 text-xs font-mono uppercase tracking-widest text-[#64131C] font-semibold mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>08 // SERVICE CENTRES</span>
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
              Active service centres operating across Kanpur and Prayagraj with full workbench diagnostic capabilities.
            </p>
          </div>
        </div>

        {/* 2 Service Centre Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {LOCATIONS_DATA.map((loc, idx) => (
            <FadeIn
              key={loc.city}
              delay={idx * 0.15}
              y={30}
              className="rounded-3xl bg-white/90 border border-[#11100F]/10 p-7 sm:p-9 md:p-11 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-[#64131C]/40 hover:shadow-2xl"
            >
              <div>
                {/* Top Row: Service Centre label & City Name (Specialization tag pills removed) */}
                <div className="flex items-center justify-between pb-6 border-b border-[#11100F]/10">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#64131C] font-bold block mb-1">
                      SERVICE CENTRE 0{idx + 1}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#11100F]">
                      {loc.city}
                    </h3>
                  </div>

                  {loc.isOperational ? (
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="uppercase font-semibold tracking-wider">Active Centre</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-mono text-[#11100F]/55 bg-[#11100F]/5 border border-[#11100F]/10 px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span className="uppercase font-semibold tracking-wider">Upcoming Centre</span>
                    </div>
                  )}
                </div>

                {/* Address, Phone & Hours */}
                <div className="flex flex-col gap-3.5 my-6 text-xs sm:text-sm text-[#11100F]/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#64131C] shrink-0 mt-0.5" />
                    <span className={loc.isOperational ? 'font-medium' : 'text-[#11100F]/50 italic'}>
                      {loc.address}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    {loc.isOperational ? (
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <a
                          href={loc.phoneLink || `tel:${loc.phone.replace(/\s+/g, '')}`}
                          className="font-mono text-xs font-semibold text-[#11100F] hover:text-[#64131C] transition-colors"
                        >
                          {loc.phone}
                        </a>
                        {loc.secondaryPhone && (
                          <>
                            <span className="text-[#11100F]/30 select-none">·</span>
                            <a
                              href={loc.secondaryPhoneLink || `tel:${loc.secondaryPhone.replace(/\s+/g, '')}`}
                              className="font-mono text-xs font-semibold text-[#11100F] hover:text-[#64131C] transition-colors"
                            >
                              {loc.secondaryPhone}
                            </a>
                          </>
                        )}
                      </div>
                    ) : (
                      <span className="font-mono text-xs text-[#11100F]/50 italic">
                        {loc.phone}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#64131C] shrink-0" />
                    <span className={loc.isOperational ? 'font-mono text-xs text-[#11100F]/80 font-medium' : 'font-mono text-xs text-[#11100F]/50 italic'}>
                      {loc.hours}
                    </span>
                  </div>
                </div>

                {/* Service Capabilities List */}
                <div className="pt-4 border-t border-[#11100F]/10 flex flex-col gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#11100F]/50 font-semibold mb-1">
                    Service Capabilities:
                  </span>
                  {loc.services.map((srv, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs sm:text-sm text-[#11100F]/85">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${loc.isOperational ? 'text-[#64131C]' : 'text-[#11100F]/30'}`} />
                      <span className={loc.isOperational ? '' : 'text-[#11100F]/50 italic'}>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button Row */}
              <div className="mt-8 pt-6 border-t border-[#11100F]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-[#11100F]/60">
                  {loc.isOperational ? (loc.whatsappUrl ? 'Direct Workbench WhatsApp Support' : 'Direct Workbench Phone Support') : 'Location details coming soon'}
                </span>

                {loc.isOperational && loc.whatsappUrl ? (
                  <a
                    href={loc.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#64131C] hover:bg-[#841B26] text-sand font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{loc.ctaText}</span>
                  </a>
                ) : loc.isOperational ? (
                  <a
                    href={loc.phoneLink || `tel:${loc.phone.replace(/\s+/g, '')}`}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#64131C] hover:bg-[#841B26] text-sand font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5 text-sand" />
                    <span>{loc.ctaText}</span>
                  </a>
                ) : (
                  <div className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#11100F]/10 text-[#11100F]/45 font-mono font-semibold text-xs uppercase tracking-wider text-center cursor-default select-none border border-[#11100F]/10">
                    Coming Soon
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LocationsSection
