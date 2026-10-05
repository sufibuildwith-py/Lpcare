import React, { useRef, useState, useEffect } from 'react'
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '../data/repairData'
import { Cpu } from 'lucide-react'

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollOffset, setScrollOffset] = useState<number>(0)

  // Tripled sets for seamless continuous wrap
  const tripledRow1 = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1]
  const tripledRow2 = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2]

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect()
            const sectionTop = rect.top + window.scrollY
            const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.28
            setScrollOffset(offset)
          }
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section
      id="marquee"
      ref={sectionRef}
      className="relative w-full bg-[#11100F] pt-20 sm:pt-28 pb-16 overflow-hidden select-none border-t border-sand/10"
      aria-label="Laptop Care Technical Scope & Repair Capabilities"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-maroon-light flex items-center gap-2 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>02 // WORKBENCH REEL</span>
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-sand leading-tight">
            EVERY LAYER. EVERY COMPONENT.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-sand/60 font-light max-w-md md:text-right">
          A continuous glimpse into our cleanroom diagnostics, component-level rework, and precision repair standards.
        </p>
      </div>

      {/* Two-Row Scroll-Reactive Marquee */}
      <div className="flex flex-col gap-4 sm:gap-6 w-full">
        {/* ROW 1: Moves RIGHT on scroll */}
        <div
          className="flex gap-4 sm:gap-6 w-max will-change-transform"
          style={{
            transform: `translateX(${scrollOffset - 350}px)`,
          }}
        >
          {tripledRow1.map((item, index) => (
            <div
              key={`row1-${index}`}
              className="group relative w-[280px] sm:w-[340px] md:w-[400px] h-[180px] sm:h-[220px] md:h-[250px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-dark-card border border-sand/10 hover:border-maroon/60 transition-all duration-300 shadow-xl"
            >
              {/* Macro Image */}
              <img
                src={item.img}
                alt={item.label}
                loading="lazy"
                className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-pure/90 via-dark-pure/30 to-transparent pointer-events-none" />

              {/* Bottom Label Tag */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-sand font-medium px-2.5 py-1 rounded-lg glass-dark border border-sand/15">
                  {item.label}
                </span>
                <span className="w-6 h-6 rounded-full bg-maroon/80 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ✓
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ROW 2: Moves LEFT on scroll */}
        <div
          className="flex gap-4 sm:gap-6 w-max will-change-transform"
          style={{
            transform: `translateX(-${scrollOffset - 350}px)`,
          }}
        >
          {tripledRow2.map((item, index) => (
            <div
              key={`row2-${index}`}
              className="group relative w-[280px] sm:w-[340px] md:w-[400px] h-[180px] sm:h-[220px] md:h-[250px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-dark-card border border-sand/10 hover:border-maroon/60 transition-all duration-300 shadow-xl"
            >
              {/* Macro Image */}
              <img
                src={item.img}
                alt={item.label}
                loading="lazy"
                className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-pure/90 via-dark-pure/30 to-transparent pointer-events-none" />

              {/* Bottom Label Tag */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-sand font-medium px-2.5 py-1 rounded-lg glass-dark border border-sand/15">
                  {item.label}
                </span>
                <span className="w-6 h-6 rounded-full bg-emerald-700/80 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ✓
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
