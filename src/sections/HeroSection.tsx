import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

interface HeroSectionProps {
  onOpenContact: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  // Phase state: 'loading' = initial cinematic quote boot sequence, 'ready' = brand lockup active
  const [introState, setIntroState] = useState<'loading' | 'ready'>(() => {
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return 'ready'
      if (sessionStorage.getItem('laptopcare_intro_seen')) return 'ready'
    }
    return 'loading'
  })

  const containerRef = useRef<HTMLElement>(null)

  // Interactive mouse/pointer tracking for 3D magnetic laptop tilt
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Scroll parallax transforms for when user scrolls past hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const laptopScale = useTransform(scrollYProgress, [0, 1], [1, 0.82])
  const laptopOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90])

  // Complete intro handler
  const completeIntro = () => {
    sessionStorage.setItem('laptopcare_intro_seen', 'true')
    setIntroState('ready')
  }

  // Auto-complete intro sequence after 2.2 seconds
  useEffect(() => {
    if (introState === 'loading') {
      const timer = setTimeout(() => {
        completeIntro()
      }, 2200)

      return () => clearTimeout(timer)
    }
  }, [introState])

  // Mouse move tracking (desktop)
  useEffect(() => {
    if (introState !== 'ready') return

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      // Normalize from -1 to +1 relative to viewport center
      const normX = (e.clientX / innerWidth) * 2 - 1
      const normY = (e.clientY / innerHeight) * 2 - 1
      setMousePos({ x: normX, y: normY })
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      setMousePos({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [introState])

  // Subtle 3D magnetic transforms (restrained, elegant, zero jitter)
  const tiltX = isHovered ? mousePos.y * -6.5 : 0
  const tiltY = isHovered ? mousePos.x * 8.5 : 0
  const translateX = isHovered ? mousePos.x * 16 : 0
  const translateY = isHovered ? mousePos.y * 10 : 0

  return (
    <>
      {/* =========================================================================
          PHASE 01: CINEMATIC OPENING / LOADING SEQUENCE
          "Screen se motherboard tak, laptop ki har problem ka Care."
          Clean, minimal, premium, restrained initialization.
          ========================================================================= */}
      <AnimatePresence>
        {introState === 'loading' && (
          <motion.div
            key="cinematic-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.02,
              filter: 'blur(8px)',
              transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
            }}
            onClick={completeIntro}
            className="fixed inset-0 z-50 bg-[#11100F] text-[#F4F0E8] flex flex-col items-center justify-center px-6 sm:px-10 text-center select-none cursor-pointer overflow-hidden"
            aria-label="Laptop Care Initializing"
          >
            {/* Ambient maroon glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[450px] bg-maroon/20 rounded-full blur-[140px] pointer-events-none" />

            {/* Subtle initialization label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative z-10 flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand/5 border border-sand/10 text-[10px] font-mono tracking-[0.25em] uppercase text-sand/60 mb-8 sm:mb-10 shadow-lg"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-maroon-light animate-ping" />
              <span>STUDIO INITIALIZING // KANPUR • PRAYAGRAJ</span>
            </motion.div>

            {/* The Brand Quote (Editorial Typography) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-w-4xl"
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F4F0E8] leading-[1.14]">
                “Screen se motherboard tak,{' '}
                <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-maroon-light lowercase tracking-normal">
                  laptop ki har problem
                </span>{' '}
                ka Care.”
              </h2>
            </motion.div>

            {/* Subtle hairline progress indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative z-10 mt-10 sm:mt-14 w-36 sm:w-52 h-[1.5px] bg-sand/10 overflow-hidden rounded-full"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-maroon via-maroon-light to-sand"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            {/* Skip hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="relative z-10 mt-5 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-sand/35"
            >
              Click anywhere to enter
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          PHASE 02 & 03: THE UNIFIED HERO COMPOSITION
          LAPTOP CARE AS ONE SINGLE HORIZONTAL COMPOSITION
          With the Silver Laptop physically overlapping between/over the words
          ========================================================================= */}
      <section
        ref={containerRef}
        id="hero"
        className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#11100F] text-[#F4F0E8] select-none"
      >
        {/* Deep Maroon Ambient Backlighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[950px] h-[500px] bg-maroon/20 rounded-full blur-[160px]" />
          <div className="absolute bottom-10 left-1/4 w-[450px] h-[300px] bg-[#450B12]/20 rounded-full blur-[130px]" />
          <div className="absolute inset-0 bg-noise opacity-40" />
        </div>

        {/* Top Status Bar */}
        <div className="relative z-20 w-full pt-6 sm:pt-8 px-6 sm:px-10 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-sand/60">
            <span className="w-2 h-2 rounded-full bg-maroon-light animate-ping inline-block" />
            <span>ESTD. KANPUR • PRAYAGRAJ</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] font-mono uppercase tracking-wider text-sand/50">
            <span>CHIP-LEVEL DIAGNOSTIC LAB</span>
            <span className="text-sand/20">/</span>
            <span>APPLE • DELL • HP • LENOVO • ASUS</span>
          </div>
        </div>

        {/* =========================================================================
            MAIN HERO CENTERPIECE: UNIFIED BRAND LOCKUP
            "LAPTOP [ silver laptop ] CARE" in one single horizontal composition
            ========================================================================= */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 my-auto flex flex-col items-center justify-center text-center py-6 sm:py-10"
        >
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-dark border border-sand/15 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-sand/75 mb-6 sm:mb-8 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-maroon-light animate-pulse" />
            <span>Specialized Laptop Engineering Studio</span>
          </motion.div>

          {/* 
            UNIFIED HORIZONTAL WORDMARK LOCKUP
            - LAPTOP and CARE are on the EXACT SAME horizontal line/baseline
            - The silver laptop sits absolute in the center, overlapping in front (z-20)
            - Not stacked vertically
          */}
          <div className="relative w-full flex items-center justify-center select-none py-4 sm:py-6 md:py-8">
            {/* The Unified Typographic Line */}
            <div className="flex items-center justify-center gap-8 sm:gap-20 md:gap-32 lg:gap-44 xl:gap-56 whitespace-nowrap leading-none w-full">
              {/* Word 1: LAPTOP */}
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.2rem,8.2vw,10.2rem)] font-black uppercase tracking-tighter text-metallic select-none leading-none"
              >
                LAPTOP
              </motion.span>

              {/* Word 2: CARE */}
              <motion.span
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.2rem,8.2vw,10.2rem)] font-black uppercase tracking-tighter text-maroon-gradient select-none leading-none"
              >
                CARE
              </motion.span>
            </div>

            {/* 
              THE SILVER LAPTOP OVERLAY (Untinted, natural finish)
              - position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)
              - z-index: 20 (sits IN FRONT of the typography)
              - Overlaps the middle space and the inner edges of LAPTOP and CARE
              - Interactive 3D tilt tracking (desktop) & subtle breathing (mobile)
            */}
            <motion.div
              style={{
                scale: laptopScale,
                opacity: laptopOpacity,
                perspective: 1200,
              }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Interactive Spring Container with Ambient Float fallback for mobile */}
              <motion.div
                animate={
                  isHovered
                    ? {
                        rotateX: tiltX,
                        rotateY: tiltY,
                        x: translateX,
                        y: translateY,
                      }
                    : {
                        rotateX: [0, 2, 0, -2, 0],
                        rotateY: [0, -3, 0, 3, 0],
                        y: [0, -6, 0, 4, 0],
                      }
                }
                transition={
                  isHovered
                    ? {
                        type: 'spring',
                        stiffness: 130,
                        damping: 18,
                        mass: 0.75,
                      }
                    : {
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                }
                style={{ transformStyle: 'preserve-3d' }}
                className="relative flex items-center justify-center will-change-transform group cursor-grab active:cursor-grabbing"
              >
                {/* Chassis contact shadow */}
                <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-6 sm:h-8 bg-black/70 rounded-full blur-xl pointer-events-none" />

                {/* Silver Laptop Asset (Untinted, Metallic Neutral Silver) */}
                <img
                  src="/silver-laptop.png"
                  alt="Laptop Care Precision Engineering"
                  className="w-[170px] sm:w-[260px] md:w-[360px] lg:w-[450px] xl:w-[500px] max-w-none h-auto object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] filter contrast-[1.02] select-none pointer-events-none"
                  loading="eager"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Subtitle Statement */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-10 max-w-2xl px-4 flex flex-col items-center gap-6"
          >
            <p className="text-sm sm:text-base md:text-lg text-sand/80 font-light leading-relaxed">
              Certified chip-level diagnostics, precision display replacements, and component-level engineering across Kanpur &amp; Prayagraj.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <button
                onClick={onOpenContact}
                className="px-7 py-3.5 rounded-full bg-maroon hover:bg-maroon-light text-sand font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_24px_rgba(100,19,28,0.6)] active:scale-95 flex items-center gap-2"
              >
                <span>Request Free Diagnosis</span>
                <span>→</span>
              </button>
              <a
                href="#anatomy"
                className="px-6 py-3.5 rounded-full glass-dark border border-sand/15 text-sand/80 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Explore Anatomy
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Scroll Indicator */}
        <div className="relative z-20 w-full pb-6 sm:pb-8 px-6 sm:px-10 flex items-center justify-between text-xs font-mono text-sand/50">
          <span className="hidden sm:inline-block">KANPUR // PRAYAGRAJ</span>
          <a
            href="#marquee"
            className="mx-auto sm:mx-0 flex items-center gap-2 hover:text-sand transition-colors duration-300"
          >
            <span>SCROLL TO ENTER REPAIR LAB</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-maroon-light" />
          </a>
          <span className="hidden sm:inline-block">GENUINE OEM PARTS</span>
        </div>
      </section>
    </>
  )
}

export default HeroSection
