import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowDown, Sparkles, Cpu, Monitor, Zap } from 'lucide-react'

interface HeroSectionProps {
  onOpenContact: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  // Phase state: false = Initial Statement screen, true = Revealed Brand & Interactive Laptop
  const [isRevealed, setIsRevealed] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  // Interactive mouse/pointer tracking for 3D magnetic laptop tilt
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Scroll parallax transforms for when user scrolls down past hero
  const laptopScale = useTransform(scrollYProgress, [0, 1], [1, 0.82])
  const laptopOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isRevealed) return
      const { innerWidth, innerHeight } = window
      // Normalize to -1 to +1 coordinates from screen center
      const normX = (e.clientX / innerWidth) * 2 - 1
      const normY = (e.clientY / innerHeight) * 2 - 1
      setMousePos({ x: normX, y: normY })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isRevealed])

  // Handle initial screen click/tap transition
  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true)
    }
  }

  // Calculate subtle 3D transforms (Max 8 degrees tilt, smooth 18px translation)
  const tiltX = mousePos.y * -8
  const tiltY = mousePos.x * 10
  const translateX = mousePos.x * 20
  const translateY = mousePos.y * 14

  return (
    <section
      ref={containerRef}
      id="hero"
      onClick={handleReveal}
      className={`relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#11100F] text-[#F4F0E8] select-none transition-colors duration-700 ${
        !isRevealed ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      {/* Deep Maroon Ambient Backlighting (kept subtle and atmospheric) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-center maroon ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[550px] bg-maroon/25 rounded-full blur-[140px]" />
        {/* Subtle bottom secondary warm glow */}
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[350px] bg-[#450B12]/20 rounded-full blur-[120px]" />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-noise opacity-40" />
      </div>

      {/* Top Bar / Status Pill */}
      <div className="relative z-20 w-full pt-6 sm:pt-8 px-6 sm:px-10 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-sand/60">
          <span className="w-2 h-2 rounded-full bg-maroon-light animate-ping inline-block" />
          <span>ESTD. KANPUR • PRAYAGRAJ</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono uppercase tracking-wider text-sand/50">
          <span>CHIP-LEVEL DIAGNOSTIC LAB</span>
          <span className="text-sand/20">/</span>
          <span>APPLE • DELL • HP • LENOVO • ASUS</span>
        </div>
      </div>

      {/* Main Viewport Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 my-auto flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* ==========================================================
               STATE 1: IMMERSIVE OPENING STATEMENT (Click to reveal)
               ========================================================== */
            <motion.div
              key="initial-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center py-16 sm:py-24"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-dark border border-sand/15 text-[11px] font-mono tracking-widest uppercase text-sand/70 mb-8 shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5 text-maroon-light animate-pulse" />
                <span>Premier Laptop Repair Studio</span>
              </motion.div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-sand leading-[1.08] max-w-5xl">
                “Screen se motherboard tak,{' '}
                <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-maroon-light lowercase tracking-normal">
                  laptop ki har problem
                </span>{' '}
                ka Care.”
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-sand/65 font-light max-w-2xl leading-relaxed"
              >
                Advanced chip-level diagnostics, certified display replacements, and precision hardware engineering.
              </motion.p>

              {/* Click to Enter Prompt */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-10 sm:mt-12 flex items-center gap-3 px-6 py-3 rounded-full bg-maroon hover:bg-maroon-light text-sand font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(100,19,28,0.5)] animate-bounce"
              >
                <span>Click anywhere to inspect studio</span>
                <span className="text-lg">→</span>
              </motion.div>
            </motion.div>
          ) : (
            /* ==========================================================
               STATE 2: BRAND REVEAL WITH FLOATING 3D SILVER LAPTOP
               ========================================================== */
            <motion.div
              key="revealed-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: textY }}
              className="w-full flex flex-col items-center justify-center py-6 sm:py-10"
            >
              {/* Massive Wordmark Framing the Laptop: LAPTOP [LAPTOP] CARE */}
              <div className="relative w-full flex flex-col items-center justify-center">
                {/* Word 1: LAPTOP */}
                <motion.h2
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(3.8rem,14vw,14rem)] font-black uppercase tracking-tighter text-metallic leading-none select-none"
                >
                  LAPTOP
                </motion.h2>

                {/* Center Floating 3D Interactive Silver Laptop */}
                <motion.div
                  style={{ scale: laptopScale, opacity: laptopOpacity }}
                  className="relative -my-10 sm:-my-16 md:-my-24 lg:-my-32 z-20 w-full max-w-[340px] sm:max-w-[480px] md:max-w-[620px] lg:max-w-[760px] xl:max-w-[860px]"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Subtle ground reflection shadow */}
                  <div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/60 rounded-full blur-xl transition-transform duration-300"
                    style={{
                      transform: `translateX(-50%) scale(${isHovered ? 1.08 : 1})`,
                    }}
                  />

                  {/* Interactive 3D Spring Container */}
                  <motion.div
                    animate={{
                      rotateX: tiltX,
                      rotateY: tiltY,
                      x: translateX,
                      y: translateY,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 18,
                      mass: 0.8,
                    }}
                    style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
                    className="relative will-change-transform"
                  >
                    {/* The Silver Laptop PNG (Untinted, Natural Metallic Finish) */}
                    <img
                      src="/silver-laptop.png"
                      alt="Laptop Care Precision Engineering"
                      className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] filter contrast-[1.02]"
                      loading="eager"
                      draggable={false}
                    />

                    {/* Technical Inspection Annotation Badges floating in 3D */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="hidden md:flex absolute -top-2 -left-4 glass-dark border border-sand/15 rounded-xl px-3 py-1.5 items-center gap-2 text-[10px] font-mono text-sand/80 shadow-2xl backdrop-blur-md"
                      style={{ transform: 'translateZ(40px)' }}
                    >
                      <Monitor className="w-3.5 h-3.5 text-maroon-light" />
                      <span>Retina &amp; OLED Display Lab</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="hidden md:flex absolute top-1/2 -right-6 glass-dark border border-sand/15 rounded-xl px-3 py-1.5 items-center gap-2 text-[10px] font-mono text-sand/80 shadow-2xl backdrop-blur-md"
                      style={{ transform: 'translateZ(50px)' }}
                    >
                      <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                      <span>BGA Chip-Level Micro-Soldering</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="hidden md:flex absolute -bottom-4 left-1/4 glass-dark border border-sand/15 rounded-xl px-3 py-1.5 items-center gap-2 text-[10px] font-mono text-sand/80 shadow-2xl backdrop-blur-md"
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Power Rail &amp; BMS Recovery</span>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Word 2: CARE */}
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(3.8rem,14vw,14rem)] font-black uppercase tracking-tighter text-maroon-gradient leading-none select-none"
                >
                  CARE
                </motion.h2>
              </div>

              {/* Subtitle Statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 sm:mt-10 max-w-2xl px-4 flex flex-col items-center gap-5"
              >
                <p className="text-sm sm:text-base md:text-lg text-sand/80 font-light leading-relaxed">
                  “From the screen to the motherboard, we repair what keeps your laptop from working right.”
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={onOpenContact}
                    className="px-6 py-3 rounded-full bg-maroon hover:bg-maroon-light text-sand font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_24px_rgba(100,19,28,0.6)] active:scale-95 flex items-center gap-2"
                  >
                    <span>Request Free Diagnosis</span>
                    <span>→</span>
                  </button>
                  <a
                    href="#anatomy"
                    className="px-5 py-3 rounded-full glass-dark border border-sand/15 text-sand/80 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Explore Anatomy
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
  )
}
