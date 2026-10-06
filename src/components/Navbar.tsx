import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wrench, Menu, X, ArrowUpRight, Phone, MapPin } from 'lucide-react'

interface NavbarProps {
  onOpenContact: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Expertise', href: '#about' },
    { name: 'Anatomy', href: '#anatomy' },
    { name: 'Services', href: '#services' },
    { name: 'Repairs', href: '#repairs' },
    { name: 'Locations', href: '#locations' },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 pt-4 sm:pt-6 pointer-events-none">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`mx-auto max-w-7xl flex items-center justify-between pointer-events-auto transition-all duration-500 rounded-full px-4 sm:px-6 py-2.5 sm:py-3.5 ${
            isScrolled
              ? 'glass-dark border border-sand/15 shadow-2xl backdrop-blur-xl'
              : 'bg-dark-pure/60 border border-sand/10 backdrop-blur-md'
          }`}
        >
          {/* Brand Logo & Studio Tag */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-maroon flex items-center justify-center text-sand transition-transform duration-300 group-hover:scale-105 shadow-md">
              <Wrench className="w-4 h-4 text-sand" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold uppercase tracking-tight text-sand text-sm sm:text-base leading-none group-hover:text-white transition-colors">
                Laptop<span className="text-maroon-light">Care</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-muted-light mt-0.5 flex items-center gap-1.5">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  Kanpur
                </span>
                <span className="text-sand/30">•</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  Prayagraj
                </span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest text-sand/70 hover:text-white transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action: Contact Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-maroon hover:bg-maroon-light text-sand text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(100,19,28,0.5)] active:scale-95"
            >
              <span>Book Diagnosis</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full glass-dark flex items-center justify-center text-sand hover:text-white border border-sand/15"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-24 z-40 lg:hidden glass-dark border border-sand/15 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-sand/10">
                <span className="text-[11px] font-mono uppercase tracking-widest text-muted-light">
                  Repair Studios
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                  Workbenches Open
                </span>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base uppercase font-semibold tracking-wide text-sand hover:text-white py-1 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4 border-t border-sand/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenContact()
                  }}
                  className="w-full py-3 rounded-full bg-maroon text-sand font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Request Instant Diagnosis</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-muted-light font-mono pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-maroon-light" /> Kanpur & Prayagraj
                  </span>
                  <a
                    href="https://wa.me/918795530133"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-emerald-400" /> +918795530133
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
