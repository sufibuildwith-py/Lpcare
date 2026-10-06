import React from 'react'
import { Wrench, Phone, MapPin, Mail } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0C0C0C] text-[#F4F0E8] border-t border-sand/10 py-16 px-6 sm:px-10 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Row: Brand & Quick Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-maroon flex items-center justify-center text-sand shadow-lg">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-xl font-black uppercase tracking-tight text-white">
                Laptop<span className="text-maroon-light">Care</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-sand/65 font-light leading-relaxed max-w-sm">
              Premier laptop repair and chip-level diagnosis studio. Specialized micro-soldering, displays, hinges, thermals, and data recovery across Uttar Pradesh.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-sand/50 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Service Centre in Kanpur · Prayagraj (Soon to be added)</span>
            </div>
          </div>

          {/* Service Links (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <span className="font-mono text-xs uppercase tracking-widest text-maroon-light font-bold mb-2">
              Repair Disciplines
            </span>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-sand/70 font-light">
              <li><a href="#anatomy" className="hover:text-white transition-colors">Screen &amp; OLED Replacement</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Motherboard &amp; Chip-Level Rework</a></li>
              <li><a href="#anatomy" className="hover:text-white transition-colors">CNC Hinge &amp; Body Reconstruction</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Honeywell PTM7950 Thermal Overhaul</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Dead Board Data Recovery Lab</a></li>
              <li><a href="#brands" className="hover:text-white transition-colors">Apple MacBook Logic Board Repairs</a></li>
            </ul>
          </div>

          {/* Direct Workbench Contact (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <span className="font-mono text-xs uppercase tracking-widest text-maroon-light font-bold mb-2">
              Workbench Support
            </span>
            <div className="flex flex-col gap-3 text-xs text-sand/70 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-maroon-light shrink-0 mt-0.5" />
                <span>Third floor somdutt plaza, Landmark, Kanpur, UP</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sand/40 shrink-0" />
                <span className="text-sand/50 italic">Prayagraj: soon to be added</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/918795530133"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono hover:text-emerald-400 transition-colors"
                >
                  +918795530133
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sand/50 shrink-0" />
                <span className="font-mono">care@laptopcare.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-sand/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-sand/50">
          <div>
            &copy; {new Date().getFullYear()} LAPTOP CARE. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sand/40">“Screen se motherboard tak, laptop ki har problem ka Care.”</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
