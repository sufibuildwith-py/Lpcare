export interface ServicePillar {
  number: string
  title: string
  subtitle: string
  description: string
  features: string[]
  badge: string
}

export interface RepairCase {
  number: string
  model: string
  brand: string
  category: string
  problem: string
  diagnosis: string
  solution: string
  turnaround: string
  image: string
  specs: {
    partReplaced: string
    benchmarkAfter: string
  }
}

export interface AnatomyLayer {
  id: string
  number: string
  name: string
  hindiName: string
  tagline: string
  description: string
  commonIssues: string[]
  repairType: string
  image: string
}

export interface BrandItem {
  name: string
  series: string
  expertise: string
}

export const BRAND_STATEMENT = "Screen se motherboard tak, laptop ki har problem ka Care."

export const SERVICES_DATA: ServicePillar[] = [
  {
    number: '01',
    title: 'HARDWARE & COMPONENT REPLACEMENT',
    subtitle: 'Physical Displays, Keyboards, Batteries & Enclosures',
    description:
      'From shattered high-refresh OLED & Retina screens to swollen lithium batteries and broken CNC hinge mounts, we source OEM-grade components and replace them with factory-level precision.',
    features: [
      'Original 60Hz to 240Hz Display Panels (IPS, OLED, Retina)',
      'Individual Backlit Keyboards & Multi-touch Trackpads',
      'Original High-Density Lithium-ion Battery Replacement',
      'DC Charging Jacks, USB-C Thunderbolt & IO Port Soldering',
      'Structural Hinge Rebuilding & CNC Body Panel Restoration',
    ],
    badge: 'Same-Day Hardware',
  },
  {
    number: '02',
    title: 'MOTHERBOARD & CHIP-LEVEL REPAIR',
    subtitle: 'Micro-Soldering, BGA Rework & Power Rail Diagnostics',
    description:
      'We do not blindly replace entire motherboards when a ₹500 power MOSFET or charging controller fails. Our engineers analyze circuit schematics and micro-solder down to 0.2mm component scale.',
    features: [
      'Short-circuit diagnosis using thermal imaging cameras',
      'Power rail recovery (19V, 3.3V, 5V, VCORE, VDD)',
      'Charging IC (ISL, BQ series) and Type-C PD controller repair',
      'BGA chip reballing, GPU reflow & CPU VRM repair',
      'EEPROM BIOS corruptions & dual-BIOS reprogramming',
    ],
    badge: 'Advanced Micro-Electronics',
  },
  {
    number: '03',
    title: 'PERFORMANCE & THERMAL SERVICE',
    subtitle: 'Cooling Overhauls, RAM & Ultra-Fast NVMe SSD Upgrades',
    description:
      'Thermal throttling drops your FPS and causes random crashes. We deep-clean cooling fans, replace dried thermal paste with Honeywell PTM7950 phase-change material, and maximize speed.',
    features: [
      'High-performance thermal repasting (Honeywell PTM7950 / Kryonaut)',
      'Vapor chamber & copper heatpipe micro-fin descaling',
      'DDR4 & DDR5 high-frequency RAM capacity expansion',
      'PCIe Gen3 / Gen4 NVMe M.2 SSD storage upgrades',
      'Fan bearing lubrication & silent airflow tuning',
    ],
    badge: 'Speed & Longevity',
  },
  {
    number: '04',
    title: 'SOFTWARE & SYSTEM RESTORATION',
    subtitle: 'Kernel Panics, Windows/macOS Crashes, Boot Loops & BSODs',
    description:
      'Operating system corruptions, boot loop freezes, driver conflicts, and persistent malware can paralyze your workflow. We restore your OS to factory-fresh responsiveness without data loss.',
    features: [
      'Clean Windows 11 / 10 & macOS Sequoia / Sonoma installation',
      'BSOD Blue Screen of Death and kernel panic trace analysis',
      'Driver signature conflicts & GPU crash troubleshooting',
      'Deep rootkit, ransomware & malicious malware eradication',
      'Bootloader repair (EFI / GPT partition reconstruction)',
    ],
    badge: 'Zero Data Loss Protocol',
  },
  {
    number: '05',
    title: 'DATA RECOVERY LAB',
    subtitle: 'Extraction from Dead Laptops, Corrupted SSDs & Hard Drives',
    description:
      'When your laptop will not turn on or the drive refuses to mount, our dedicated data lab extracts your critical work files, documents, family photos, and project databases safely.',
    features: [
      'Data extraction directly from dead logic boards & motherboards',
      'Corrupted NVMe / SATA SSD file table reconstruction',
      'Accidentally deleted partitions & formatted drive recovery',
      'Bad sector mitigation and bit-by-bit raw drive cloning',
      'Secure encrypted backup handovers on external storage',
    ],
    badge: 'Confidential Recovery',
  },
  {
    number: '06',
    title: 'PRECISION FAULT DIAGNOSIS',
    subtitle: 'Zero-Guesswork Testing Before Touching a Single Screw',
    description:
      'When the issue is intermittent, random, or unexplained, we never guess. We utilize bench power supplies, digital oscilloscopes, and thermal analysis to locate the exact root cause.',
    features: [
      'Digital oscilloscope signal waveform verification',
      'Standby current consumption & parasitic drain testing',
      'Infrared thermal mapping to spot boiling shorted ICs',
      'Stress test verification under sustained combined loads',
      'Written transparent diagnostic estimate before approval',
    ],
    badge: '100% Transparent',
  },
]

export const ANATOMY_LAYERS: AnatomyLayer[] = [
  {
    id: 'screen',
    number: '01',
    name: 'DISPLAY & RETINA GLASS',
    hindiName: 'Screen (डिस्प्ले)',
    tagline: 'High-Gamut IPS, OLED & Retina Panels',
    description:
      'The primary window to your digital work. We repair broken glass, dead backlight circuits, vertical color lines, flickering eDP cables, and pressure bleed spots.',
    commonIssues: ['Flickering lines', 'Cracked glass', 'No backlight', 'Dim display', 'Ghost touch'],
    repairType: 'Panel replacement & eDP flex cable rebuilding',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'hinge',
    number: '02',
    name: 'CNC MECHANICAL HINGES',
    hindiName: 'Hinges (कब्जे व बॉडी)',
    tagline: 'Structural Alloy Hinges & Top Cover Anchor Rebuilds',
    description:
      'Stiff hinges generate torque that rips brass anchor nuts straight out of the plastic palmrest. We reconstruct internal chassis pillars and adjust hinge tension smoothly.',
    commonIssues: ['Screen won’t close', 'Cracking plastic', 'Loose display wobble', 'Broken corner'],
    repairType: 'Brass threaded insert reconstruction & torque calibration',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'keyboard',
    number: '03',
    name: 'KEYBOARD & TRACKPAD',
    hindiName: 'Keyboard (कीबोर्ड व टचपैड)',
    tagline: 'Scissor-Switch Membranes & Multi-Touch Glass',
    description:
      'Spilled water or sticky keys? We replace individual scissor clips, clean membrane contact pads, and install full riveted top-case keyboard assemblies.',
    commonIssues: ['Keys typing twice', 'Dead spacebar', 'Erratic trackpad cursor', 'Liquid sticky keys'],
    repairType: 'Riveted keyboard assembly & capacitive trackpad replacement',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'battery',
    number: '04',
    name: 'BATTERY & POWER MGMT',
    hindiName: 'Battery (बैटरी व चार्जिंग)',
    tagline: 'Multi-Cell Lithium Polymer & BMS Calibration',
    description:
      'Swollen batteries pose a severe safety hazard and bend laptop trackpads. We install genuine high-density battery cells with verified cycle counts.',
    commonIssues: ['Drains in 15 mins', 'Swollen trackpad bulge', 'Plugged in not charging', 'Shutdown at 40%'],
    repairType: 'Original OEM cell replacement & BMS cycle reset',
    image: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'thermals',
    number: '05',
    name: 'THERMAL ARCHITECTURE',
    hindiName: 'Cooling (फैन व हीटपाइप)',
    tagline: 'Pure Copper Heatpipes, Turbines & Phase-Change Repasting',
    description:
      'Blocked exhaust fins turn laptops into ovens. Our ultrasonic cleaning and phase-change thermal paste bring peak gaming and render temps down by 15°C to 25°C.',
    commonIssues: ['Loud fan noise', 'Excessive heat on lap', 'Sudden shutdown while gaming', 'Lag after 10 mins'],
    repairType: 'Micro-fin ultrasonic purge & Honeywell PTM7950 repasting',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'motherboard',
    number: '06',
    name: 'MOTHERBOARD & CHIP-LEVEL',
    hindiName: 'Motherboard (मदरबोर्ड व चिप)',
    tagline: 'The Silicon Heart: Power MOSFETs, Charging ICs & BGA',
    description:
      'The command center of your laptop. Instead of replacing expensive motherboards, our technicians micro-solder burned capacitors, replace charging ICs, and restore dead boards.',
    commonIssues: ['Completely dead / No light', 'Liquid damage corrosion', 'BIOS bricked', 'GPU artifacts'],
    repairType: 'Component-level micro-soldering & BGA silicon rework',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
  },
]

export const REPAIR_CASES: RepairCase[] = [
  {
    number: '01',
    model: 'Dell XPS 15 (9520)',
    brand: 'DELL',
    category: 'Display & Hinge Reconstruction',
    problem: 'Shattered 4K OLED InfinityEdge panel with ruptured right hinge bracket after a table drop.',
    diagnosis: 'Cracked OLED substrate and sheared magnesium top-case threaded standoffs.',
    solution: 'Installed OEM Sharp 4K OLED panel, rebuilt structural anchor pillars with industrial resin, and recalibrated hinge tension.',
    turnaround: '24 Hours',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=1200&q=80',
    specs: {
      partReplaced: 'OEM 4K OLED Assembly + CNC Hinge Pillar',
      benchmarkAfter: '100% DCI-P3 Color Accuracy Verified',
    },
  },
  {
    number: '02',
    model: 'Apple MacBook Pro 16" (M2 Max)',
    brand: 'APPLE',
    category: 'Liquid Ingress & Logic Board Recovery',
    problem: 'Chai spill on keyboard. Machine completely dead, drawing 5V 0.02A on USB-C ammeter.',
    diagnosis: 'Corroded PPBUS_G3H power rail and blown CD3217 USB-C power delivery controller chip.',
    solution: 'Ultrasonic logic board decontamination, replaced blown CD3217 IC and 3 decoupling capacitors under microscope.',
    turnaround: '48 Hours',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    specs: {
      partReplaced: 'CD3217 PD Controller + SMD Ceramic Caps',
      benchmarkAfter: 'All 3 Thunderbolt 4 Ports 100W PD Restored',
    },
  },
  {
    number: '03',
    model: 'Lenovo Legion 7 (RTX 4080)',
    brand: 'LENOVO',
    category: 'Vapor Chamber Overhaul & VRM Repair',
    problem: 'Thermal throttling to 800MHz within 2 minutes of gaming, followed by sudden power-off.',
    diagnosis: 'Dried factory liquid metal crusting causing dry spots, plus shorted 12V GPU phase MOSFET.',
    solution: 'Replaced shorted Vishay DrMOS power stage, ultrasonic cleaned vapor chamber, and applied Honeywell PTM7950 phase-change material.',
    turnaround: '36 Hours',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
    specs: {
      partReplaced: 'DrMOS Power Stage + PTM7950 Thermal Pad',
      benchmarkAfter: 'Cinebench R23 Max Temp: 76°C (Down from 101°C)',
    },
  },
  {
    number: '04',
    model: 'HP Spectre x360 14',
    brand: 'HP',
    category: 'Battery Swell & Type-C Charging Circuit',
    problem: 'Swollen battery bending aluminum trackpad upwards; laptop only boots with charger held at an angle.',
    diagnosis: 'Severe lithium pouch gas accumulation and cracked solder joints on the surface-mount Type-C receptacle.',
    solution: 'Safely disposed swollen pack, installed certified OEM 66Wh battery, and micro-soldered reinforced Type-C charging port.',
    turnaround: '6 Hours',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    specs: {
      partReplaced: 'Original 66Wh HP Battery + Type-C Receptacle',
      benchmarkAfter: '11.5 Hours Continuous Battery Run-time',
    },
  },
]

export const BRANDS_LIST: BrandItem[] = [
  { name: 'Apple', series: 'MacBook Air, MacBook Pro (M1, M2, M3, Intel)', expertise: 'Logic Board Micro-Soldering & Retina Display Specialist' },
  { name: 'Dell', series: 'XPS, Alienware, Latitude, Inspiron, Precision', expertise: 'Hinge Structural Repair & Motherboard Chip-Level' },
  { name: 'Lenovo', series: 'ThinkPad, Legion, Yoga, IdeaPad, LOQ', expertise: 'Keyboard Assembly & Thermal Cooling Optimization' },
  { name: 'HP', series: 'Spectre, Omen, Envy, Pavilion, EliteBook', expertise: 'BIOS EEPROM Flash & Battery Management' },
  { name: 'ASUS', series: 'ROG Strix, Zephyrus, ZenBook, TUF Gaming', expertise: 'Liquid Metal Repasting & GPU Power Rail Fix' },
  { name: 'Acer', series: 'Predator, Nitro, Swift, Aspire', expertise: 'Charging Circuit & Display Panel Replacement' },
  { name: 'MSI', series: 'Titan, Raider, Stealth, Katana, Modern', expertise: 'Gaming Motherboard Diagnostics & Fan Rework' },
  { name: 'Microsoft', series: 'Surface Pro, Surface Laptop, Surface Book', expertise: 'Screen Separation & Battery Extraction Lab' },
  { name: 'Samsung', series: 'Galaxy Book Pro, Galaxy Book Ultra', expertise: 'AMOLED Glass & USB-C Power Rail Repair' },
]

export const MARQUEE_ROW_1 = [
  { label: 'RETINA / OLED SCREEN REPLACEMENT', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80' },
  { label: 'MOTHERBOARD CHIP-LEVEL SOLDERING', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
  { label: 'CNC MECHANICAL HINGE RECONSTRUCTION', img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80' },
  { label: 'OEM HIGH-DENSITY BATTERY PACKS', img: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&w=600&q=80' },
  { label: 'GEN4 NVMe SSD STORAGE UPGRADES', img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80' },
  { label: 'HIGH-FREQUENCY DDR5 RAM EXPANSION', img: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80' },
  { label: 'TURBINE FAN & VAPOR CHAMBER COOLING', img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80' },
  { label: 'TYPE-C THUNDERBOLT & DC PORT REPAIR', img: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=600&q=80' },
]

export const MARQUEE_ROW_2 = [
  { label: 'THERMAL IMAGING CIRCUIT DIAGNOSIS', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { label: 'ISL & BQ CHARGING IC REPLACEMENT', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80' },
  { label: 'HONEYWELL PTM7950 THERMAL REPASTE', img: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80' },
  { label: 'WINDOWS 11 & macOS CRASH RESTORATION', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80' },
  { label: 'BLUE SCREEN BSOD & KERNEL PANIC FIX', img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80' },
  { label: 'DEAD BOARD DATA RECOVERY LAB', img: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80' },
  { label: 'DUAL-BIOS EEPROM REPROGRAMMING', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80' },
  { label: 'LIQUID INGRESS ULTRASONIC DECONTAMINATION', img: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=600&q=80' },
]

export const LOCATIONS_DATA = [
  {
    city: 'KANPUR',
    hubName: 'Kanpur Central Chip-Level Lab',
    address: 'Mall Road / Kakadeo Hub, Kanpur, Uttar Pradesh',
    badge: 'Primary Micro-Soldering Hub',
    phone: '+91 98765 43210 (Direct Workbench Helpline)',
    hours: 'Mon — Sat: 10:00 AM – 8:30 PM | Sun: Priority Drop-off',
    services: [
      'Same-day display & battery replacement',
      'Advanced BGA rework & motherboard repair center',
      'Walk-in inspection counter with live diagnosis',
      'Local doorstep pickup across Kanpur',
    ],
  },
  {
    city: 'PRAYAGRAJ',
    hubName: 'Prayagraj (Allahabad) Studio',
    address: 'Civil Lines / University Hub, Prayagraj (Allahabad), UP',
    badge: 'Hardware & Data Lab',
    phone: '+91 98765 43211 (Prayagraj Desk)',
    hours: 'Mon — Sat: 10:00 AM – 8:00 PM',
    services: [
      'Screen, keyboard, hinge & battery workbench',
      'Student & University express turnaround desk',
      'Corrupted SSD & dead laptop data recovery',
      'Thermal overhaul & gaming tuning service',
    ],
  },
]
