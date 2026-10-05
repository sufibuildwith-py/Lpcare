import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react'
import confetti from 'canvas-confetti'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const PROBLEM_CHIPS = [
  'Screen / Display',
  'No Power / Dead',
  'Overheating / Fan',
  'Battery Drain',
  'Hinge Broken',
  'Keyboard / Trackpad',
  'Slow / Freezing',
  'OS / Blue Screen',
  'Motherboard / Chip',
  'Data Recovery',
  'Liquid Spill',
  'Charging Port',
]

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Kanpur',
    brand: 'Dell',
    model: '',
    selectedProblems: [] as string[],
    description: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const toggleProblem = (chip: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedProblems: prev.selectedProblems.includes(chip)
        ? prev.selectedProblems.filter((p) => p !== chip)
        : [...prev.selectedProblems, chip],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#64131C', '#841B26', '#F4F0E8', '#FFFFFF'],
      })
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      // Auto construct WhatsApp link for direct submission
      const msg = encodeURIComponent(
        `*New Laptop Care Diagnosis Request*\n` +
          `• *Name:* ${formData.name}\n` +
          `• *Phone:* ${formData.phone}\n` +
          `• *Location:* ${formData.city}\n` +
          `• *Laptop:* ${formData.brand} ${formData.model}\n` +
          `• *Issues:* ${formData.selectedProblems.join(', ') || 'General Inspection'}\n` +
          `• *Details:* ${formData.description || 'None'}`
      )
      window.open(`https://wa.me/919876543210?text=${msg}`, '_blank')

      setIsSubmitted(false)
      onClose()
    }, 1800)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark-pure/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl rounded-3xl glass-dark border border-sand/15 p-6 sm:p-8 md:p-10 shadow-2xl z-10 my-auto text-sand overflow-hidden"
        >
          {/* Subtle Maroon Radial Glow in top-right */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-maroon/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full glass-dark border border-sand/15 flex items-center justify-center text-sand/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 text-center flex flex-col items-center justify-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-maroon/40 border border-maroon flex items-center justify-center text-sand shadow-xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-sand">
                Diagnosis Ticket Created
              </h3>
              <p className="text-sm text-sand/70 max-w-md font-light leading-relaxed">
                Connecting you with our lead chip-level engineer in {formData.city}. Opening WhatsApp chat...
              </p>
            </motion.div>
          ) : (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-maroon-light font-semibold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Workbench Intake Desk</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                  Request Laptop Diagnosis
                </h3>
                <p className="text-xs sm:text-sm text-sand/70 font-light mt-1">
                  Screen se motherboard tak — tell us what is wrong and get a transparent estimate.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-sand/60 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-pure/70 border border-sand/15 text-sand placeholder:text-sand/30 text-sm focus:outline-none focus:border-maroon-light transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-sand/60 mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-pure/70 border border-sand/15 text-sand placeholder:text-sand/30 text-sm focus:outline-none focus:border-maroon-light transition-colors"
                    />
                  </div>
                </div>

                {/* Location & Brand */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-sand/60 mb-1.5">
                      Service Studio *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-dark-pure/70 border border-sand/15 text-sand text-sm focus:outline-none focus:border-maroon-light transition-colors"
                    >
                      <option value="Kanpur">Kanpur Studio</option>
                      <option value="Prayagraj">Prayagraj (Allahabad)</option>
                      <option value="Doorstep Pickup">Request Doorstep Pickup</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-sand/60 mb-1.5">
                      Laptop Brand *
                    </label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-dark-pure/70 border border-sand/15 text-sand text-sm focus:outline-none focus:border-maroon-light transition-colors"
                    >
                      <option value="Dell">Dell (XPS / Inspiron / Alienware)</option>
                      <option value="Apple">Apple MacBook (Air / Pro M1-M3)</option>
                      <option value="HP">HP (Spectre / Omen / Pavilion)</option>
                      <option value="Lenovo">Lenovo (ThinkPad / Legion / Yoga)</option>
                      <option value="ASUS">ASUS (ROG / ZenBook / TUF)</option>
                      <option value="Acer">Acer (Predator / Nitro / Swift)</option>
                      <option value="MSI">MSI Gaming / Modern</option>
                      <option value="Microsoft">Microsoft Surface</option>
                      <option value="Other">Other Laptop Model</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-sand/60 mb-1.5">
                      Model / Year
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. XPS 15 9520"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-pure/70 border border-sand/15 text-sand placeholder:text-sand/30 text-sm focus:outline-none focus:border-maroon-light transition-colors"
                    />
                  </div>
                </div>

                {/* Problem Selection Chips */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-sand/60 mb-2">
                    Select Problem Category (Click all that apply)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {PROBLEM_CHIPS.map((chip) => {
                      const isSelected = formData.selectedProblems.includes(chip)
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => toggleProblem(chip)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                            isSelected
                              ? 'bg-maroon border-sand/40 text-white font-semibold shadow-md scale-105'
                              : 'bg-dark-pure/50 border-sand/10 text-sand/70 hover:border-sand/30 hover:text-white'
                          }`}
                        >
                          {chip}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Issue Description */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-sand/60 mb-1.5">
                    Describe What Happened (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Display shows black screen, fan spins for 3 seconds then stops..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-pure/70 border border-sand/15 text-sand placeholder:text-sand/30 text-sm focus:outline-none focus:border-maroon-light transition-colors resize-none"
                  />
                </div>

                {/* Guarantee Banner */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-maroon/20 border border-maroon/30 text-[11px] text-sand/80 font-light">
                  <AlertCircle className="w-4 h-4 text-maroon-light shrink-0" />
                  <span>
                    No charge for initial physical assessment. You receive a verified quote before we proceed with repairs.
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-maroon hover:bg-maroon-light text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-[0_0_24px_rgba(100,19,28,0.6)] active:scale-[0.99] mt-1"
                >
                  <span>Submit Diagnosis Request</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
