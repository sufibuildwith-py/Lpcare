import React, { useRef, useEffect } from 'react'
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '../data/repairData'
import { Cpu } from 'lucide-react'

// Stable static triples defined outside component to avoid reallocation
const TRIPLED_ROW_1 = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1]
const TRIPLED_ROW_2 = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2]

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isVisible = false
    let sectionTop = 0
    let ticking = false

    const updateMetrics = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        sectionTop = rect.top + window.scrollY
      }
    }

    const renderTransforms = () => {
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.35
      const row1Translate = offset * 0.8 - 400
      const row2Translate = -(offset * 1.85) - 200

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translate3d(${row1Translate}px, 0, 0)`
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translate3d(${row2Translate}px, 0, 0)`
      }
      ticking = false
    }

    const onScroll = () => {
      if (!isVisible) return
      if (!ticking) {
        window.requestAnimationFrame(renderTransforms)
        ticking = true
      }
    }

    const onResize = () => {
      updateMetrics()
      if (isVisible) {
        renderTransforms()
      }
    }

    updateMetrics()
    renderTransforms()

    // IntersectionObserver halts all scroll calculations when marquee is offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) {
          updateMetrics()
          renderTransforms()
        }
      },
      { rootMargin: '250px 0px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
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
          ref={row1Ref}
          className="flex gap-4 sm:gap-6 w-max will-change-transform"
          style={{ transform: 'translate3d(-400px, 0, 0)' }}
        >
          {TRIPLED_ROW_1.map((item, index) => (
            <div
              key={`row1-${index}`}
              className="group relative w-[280px] sm:w-[340px] md:w-[400px] h-[180px] sm:h-[220px] md:h-[250px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-dark-card border border-sand/10 hover:border-maroon/60 transition-all duration-300 shadow-xl"
            >
              {/* Macro Image */}
              <img
                src={item.img}
                alt={item.label}
                loading="lazy"
                decoding="async"
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

        {/* ROW 2: Moves LEFT on scroll (Accelerated 1.85x speed for snappy, brisk flow) */}
        <div
          ref={row2Ref}
          className="flex gap-4 sm:gap-6 w-max will-change-transform"
          style={{ transform: 'translate3d(-200px, 0, 0)' }}
        >
          {TRIPLED_ROW_2.map((item, index) => (
            <div
              key={`row2-${index}`}
              className="group relative w-[280px] sm:w-[340px] md:w-[400px] h-[180px] sm:h-[220px] md:h-[250px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden bg-dark-card border border-sand/10 hover:border-maroon/60 transition-all duration-300 shadow-xl"
            >
              {/* Macro Image */}
              <img
                src={item.img}
                alt={item.label}
                loading="lazy"
                decoding="async"
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

export default MarqueeSection
