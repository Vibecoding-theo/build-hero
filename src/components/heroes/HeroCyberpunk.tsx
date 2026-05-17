'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function HeroCyberpunk() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#0a0a1a]">
      {/* Grid background */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 w-full h-[200px] animate-scanline" style={{ background: 'linear-gradient(transparent, rgba(0,255,255,0.03), transparent)' }} />
      </div>

      {/* Neon glow spots */}
      <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] rounded-full animate-pulse-glow opacity-30" style={{ background: 'radial-gradient(circle, rgba(188,19,254,0.4) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(0,255,255,0.4) 0%, transparent 70%)' }} />

      <AnimatePresence>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-5xl w-full mx-6 text-center"
          >
            {/* Glitch-style top label */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.5em] text-cyan-400/70">
                {'// SYSTEM.INIT — WELCOME TO THE FUTURE'}
              </span>
            </motion.div>

            {/* Main neon title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none mb-8"
            >
              <span className="block animate-neon-flicker" style={{ color: '#bc13fe', textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #bc13fe, 0 0 82px #bc13fe' }}>
                CYBER
              </span>
              <span className="block mt-2" style={{ color: '#00ffff', textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #00ffff, 0 0 82px #00ffff' }}>
                NEXUS
              </span>
            </motion.h1>

            {/* Glowing separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-48 h-[2px] mx-auto mb-8"
              style={{ background: 'linear-gradient(90deg, transparent, #00ffff, #bc13fe, transparent)', boxShadow: '0 0 10px #00ffff' }}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-mono"
            >
              Entrez dans un monde où le néon rencontre le code. Interfaces holographiques, données quantiques, et une esthétique qui défie les lois du design conventionnel.
            </motion.p>

            {/* Cyber buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <button className="group relative px-10 py-4 font-bold uppercase tracking-wider text-white overflow-hidden transition-all duration-300 hover:scale-105" style={{ border: '2px solid #00ffff', borderRadius: '0' }}>
                <span className="absolute inset-0 bg-cyan-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">Jack In</span>
              </button>
              <button className="group relative px-10 py-4 font-bold uppercase tracking-wider text-white overflow-hidden transition-all duration-300 hover:scale-105" style={{ border: '2px solid #bc13fe', borderRadius: '0' }}>
                <span className="absolute inset-0 bg-purple-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">Scan Grid</span>
              </button>
            </motion.div>

            {/* Bottom terminal text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16 font-mono text-[10px] md:text-xs text-green-400/50 space-y-1"
            >
              <p>&gt; ESTABLISHING NEURAL LINK...</p>
              <p>&gt; QUANTUM ENCRYPTION: <span className="text-green-400">ACTIVE</span></p>
              <p>&gt; LATENCY: 0.003ms | BANDWIDTH: 847 TB/s</p>
              <p className="text-cyan-400/50 animate-pulse">&gt; READY_</p>
            </motion.div>
          </motion.div>
      </AnimatePresence>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-cyan-400/40" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-cyan-400/40" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-cyan-400/40" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-cyan-400/40" />
    </div>
  );
}
