import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { REPAIR_CASES, type RepairCase } from '../data/repairData'
import { FadeIn } from '../components/FadeIn'
import { Clock, ShieldCheck, Wrench, CheckCircle2, ArrowUpRight } from 'lucide-react'

interface RepairCardProps {
  repair: RepairCase
  index: number
  totalCards: number
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
  onOpenContact: () => void
}

const RepairCard: React.FC<RepairCardProps> = ({
  repair,
  index,
  progress,
  range,
  targetScale,
  onOpenContact,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      ref={containerRef}
      className="h-[85vh] min-h-[580px] max-h-[850px] flex items-center justify-center sticky top-20 sm:top-24 md:top-28"
    >
      <motion.div
        style={{
          scale,
          top: `${index * 24}px`,
        }}
        className="relative w-full max-w-6xl rounded-[32px] sm:rounded-[45px] md:rounded-[55px] border border-sand/20 bg-[#181716] text-[#F4F0E8] p-5 sm:p-7 md:p-9 flex flex-col justify-between shadow-2xl origin-top overflow-hidden"
      >
        {/* Subtle Maroon Glow in corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-maroon/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-sand/15 relative z-10">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            <span
              className="font-black text-sand leading-none tracking-tighter"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.8rem)' }}
            >
              {repair.number}
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-xs uppercase font-mono tracking-widest text-maroon-light font-semibold">
                {repair.brand} // {repair.category}
              </span>
              <h3
                className="font-extrabold uppercase text-white tracking-tight"
                style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.9rem)' }}
              >
                {repair.model}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-dark-pure/80 border border-sand/15 text-xs font-mono text-sand/80">
              <Clock className="w-3.5 h-3.5 text-maroon-light" />
              <span>Turnaround: {repair.turnaround}</span>
            </span>

            <button
              onClick={onOpenContact}
              className="px-4 sm:px-5 py-2 rounded-full bg-maroon hover:bg-maroon-light text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <span>Get Fixed</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Content: Left Technical Breakdown + Right Image Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mt-5 sm:mt-6 relative z-10 flex-1">
          {/* Left Column: Problem, Diagnosis, Solution Breakdown */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3.5">
              {/* Problem Statement */}
              <div className="rounded-2xl bg-dark-pure/70 border border-sand/10 p-3.5 sm:p-4">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-400 font-semibold block mb-1">
                  Initial Symptom / Fault:
                </span>
                <p className="text-xs sm:text-sm text-sand/85 font-light leading-relaxed">
                  {repair.problem}
                </p>
              </div>

              {/* Diagnosis */}
              <div className="rounded-2xl bg-dark-pure/70 border border-sand/10 p-3.5 sm:p-4">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-maroon-light font-semibold block mb-1">
                  Workbench Diagnosis:
                </span>
                <p className="text-xs sm:text-sm text-sand/85 font-light leading-relaxed">
                  {repair.diagnosis}
                </p>
              </div>

              {/* Verified Solution */}
              <div className="rounded-2xl bg-dark-pure/70 border border-sand/10 p-3.5 sm:p-4">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-emerald-400 font-semibold block mb-1">
                  Engineer Execution &amp; Resolution:
                </span>
                <p className="text-xs sm:text-sm text-sand/85 font-light leading-relaxed">
                  {repair.solution}
                </p>
              </div>
            </div>

            {/* Verification Footer Specs */}
            <div className="pt-3 border-t border-sand/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-sand/60">
              <span className="flex items-center gap-1.5 text-sand/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {repair.specs.partReplaced}
              </span>
              <span className="text-maroon-light font-semibold">
                {repair.specs.benchmarkAfter}
              </span>
            </div>
          </div>

          {/* Right Column: Macro Repair Photography */}
          <div className="lg:col-span-6 h-[220px] sm:h-[280px] lg:h-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-dark-pure border border-sand/15 relative group">
            <img
              src={repair.image}
              alt={`${repair.model} Repair`}
              loading="lazy"
              className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-pure/90 via-dark-pure/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-sand px-3 py-1 rounded-lg glass-dark border border-sand/20">
                Studio Case File
              </span>
              <span className="font-mono text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Tested &amp; Dispatched
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

interface RepairCasesSectionProps {
  onOpenContact: () => void
}

export const RepairCasesSection: React.FC<RepairCasesSectionProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={containerRef}
      id="repairs"
      className="relative w-full bg-[#11100F] text-[#F4F0E8] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 px-4 sm:px-8 md:px-12 pt-24 sm:pt-32 pb-36"
      aria-label="Recent Real Laptop Repairs and Case Studies"
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-14 sm:mb-20 text-center">
        <FadeIn delay={0} y={20}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-dark border border-sand/15 text-xs font-mono uppercase tracking-widest text-maroon-light font-semibold mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>06 // CASE STUDIES</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={40}>
          <h2
            className="text-metallic font-black uppercase leading-none tracking-tight text-center select-none"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 130px)' }}
          >
            What We Fix
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-sand/60 font-light max-w-xl mx-auto">
            Real production cases from our Kanpur service centre workbench — diagnosed accurately, rebuilt with precision components.
          </p>
        </FadeIn>
      </div>

      {/* Cards Stacking Container */}
      <div className="max-w-6xl mx-auto w-full relative">
        {REPAIR_CASES.map((repair, index) => {
          const targetScale = 1 - (REPAIR_CASES.length - 1 - index) * 0.03
          return (
            <RepairCard
              key={repair.number}
              repair={repair}
              index={index}
              totalCards={REPAIR_CASES.length}
              progress={scrollYProgress}
              range={[index * 0.25, 1]}
              targetScale={targetScale}
              onOpenContact={onOpenContact}
            />
          )
        })}
      </div>
    </section>
  )
}
