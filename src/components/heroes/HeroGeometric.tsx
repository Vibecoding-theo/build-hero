'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function HeroGeometric() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-white">
      {/* Rotating geometric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large rotating circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] animate-rotate-geometric opacity-[0.03]">
          <svg viewBox="0 0 800 800" fill="none">
            <circle cx="400" cy="400" r="380" stroke="#E63946" strokeWidth="2" />
            <circle cx="400" cy="400" r="300" stroke="#457B9D" strokeWidth="1.5" />
            <circle cx="400" cy="400" r="220" stroke="#F4A261" strokeWidth="1" />
          </svg>
        </div>

        {/* Static geometric shapes */}
        <div className="absolute top-[8%] left-[5%] w-32 h-32 border-2 border-[#E63946]/20 rotate-12" />
        <div className="absolute top-[15%] right-[8%] w-20 h-20 bg-[#457B9D]/10 rotate-45" />
        <div className="absolute bottom-[10%] left-[12%] w-24 h-24 rounded-full border-2 border-[#F4A261]/20" />
        <div className="absolute bottom-[20%] right-[5%] w-16 h-16 bg-[#E63946]/10 rotate-[30deg]" />
        <div className="absolute top-[40%] left-[3%] w-3 h-3 rounded-full bg-[#2A9D8F]" />
        <div className="absolute top-[25%] left-[50%] w-2 h-2 bg-[#E63946]" />
        <div className="absolute bottom-[35%] right-[20%] w-4 h-4 bg-[#457B9D]/30 rotate-45" />
        <div className="absolute top-[60%] left-[25%] w-6 h-[2px] bg-[#F4A261]" />
        <div className="absolute top-[20%] right-[30%] w-[2px] h-6 bg-[#2A9D8F]" />
      </div>

      <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-5xl w-full mx-6"
          >
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left content */}
              <div className="flex-1">
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <div className="w-8 h-[2px] bg-[#E63946]" />
                  <span className="text-xs uppercase tracking-[0.4em] font-bold" style={{ color: '#E63946' }}>Design Géométrique</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-8 text-[#1D3557]"
                >
                  FORME
                  <br />
                  <span className="relative inline-flex items-center gap-4">
                    <span style={{ color: '#E63946' }}>&</span>
                    <span>SENS</span>
                    <div className="absolute -bottom-2 left-0 right-0 h-2 bg-[#F4A261]/40 -skew-x-6" />
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-base md:text-lg text-gray-500 max-w-md mb-10 leading-relaxed"
                >
                  La géométrie au service du sens. Des lignes précises, des angles affirmés, une palette primaire qui structure la pensée visuelle.
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-0"
                >
                  <button className="px-8 py-4 font-black uppercase text-sm tracking-wider text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ background: '#E63946', border: 'none' }}>
                    Construire
                  </button>
                  <button className="px-8 py-4 font-black uppercase text-sm tracking-wider transition-all duration-300 hover:bg-[#1D3557] hover:text-white hover:-translate-y-1" style={{ color: '#1D3557', background: 'transparent', border: '3px solid #1D3557' }}>
                    Analyser
                  </button>
                </motion.div>
              </div>

              {/* Right geometric composition */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex-1 flex items-center justify-center"
              >
                <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
                  {/* Layered geometric shapes */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#E63946]" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#E63946]" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-[#457B9D]" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-[#457B9D]" />
                  </motion.div>

                  <div className="absolute inset-8 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="w-48 h-48 md:w-60 md:h-60 border-4 border-[#F4A261] rotate-45"
                    />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#2A9D8F]"
                    />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white rotate-45" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
            >
              {[
                { color: '#E63946', value: 'Carré', desc: 'Précision' },
                { color: '#457B9D', value: 'Cercle', desc: 'Fluidité' },
                { color: '#F4A261', value: 'Triangle', desc: 'Stabilité' },
                { color: '#2A9D8F', value: 'Losange', desc: 'Dynamisme' },
              ].map((item) => (
                <div key={item.desc} className="flex items-center gap-3 p-4 transition-all duration-300 hover:translate-x-2">
                  <div className="w-3 h-3 flex-shrink-0" style={{ background: item.color }} />
                  <div>
                    <div className="text-sm font-bold text-[#1D3557]">{item.value}</div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider">{item.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
      </AnimatePresence>
    </div>
  );
}
