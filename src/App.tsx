import React, { useState } from 'react';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsContactOpen(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-kanit antialiased selection:bg-[#B600A8] selection:text-white" style={{ overflowX: 'clip' }}>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Projects Section */}
      <ProjectsSection />

      {/* Footer / Contact Anchor */}
      <footer id="contact" className="w-full bg-[#0C0C0C] border-t border-[#D7E2EA]/10 py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-[#D7E2EA]/60 uppercase tracking-wider font-light">
          <div>
            &copy; {new Date().getFullYear()} SA Productions. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="mailto:contact@saproductions.com"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              contact@saproductions.com
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsContactOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-lg bg-[#141414] border-2 border-[#D7E2EA]/30 rounded-3xl p-6 sm:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-5 right-5 text-[#D7E2EA]/70 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <h3 className="hero-heading text-3xl font-black uppercase tracking-tight mb-2">
                Let&apos;s Connect
              </h3>
              <p className="text-sm text-[#D7E2EA]/70 mb-6">
                Have a 3D or design project in mind? Send a message to SA Productions.
              </p>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                  <CheckCircle2 size={48} className="text-[#B600A8] animate-bounce" />
                  <p className="text-lg font-medium text-white">Message received!</p>
                  <p className="text-sm text-[#D7E2EA]/70">We&apos;ll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/60 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Carter"
                      className="w-full bg-[#1e1e1e] border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#B600A8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/60 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-[#1e1e1e] border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#B600A8] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/60 mb-1">
                      Project Details
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the vision, timeline, and deliverables..."
                      className="w-full bg-[#1e1e1e] border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#B600A8] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                    }}
                    className="w-full rounded-full text-white font-medium uppercase tracking-widest py-3.5 mt-2 flex items-center justify-center gap-2 text-sm hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
