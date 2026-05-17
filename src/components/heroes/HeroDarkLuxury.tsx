'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function HeroDarkLuxury() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center" style={{ background: '#0a0a0a' }}>
      {/* Subtle golden gradient */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(212, 175, 55, 0.06) 0%, transparent 60%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(212, 175, 55, 0.04) 0%, transparent 50%)' }} />

      {/* Fine texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

      {/* Elegant divider lines */}
      <div className="absolute top-0 left-1/2 w-[1px] h-full opacity-10" style={{ background: 'linear-gradient(transparent, #d4af37, transparent)' }} />
      <div className="absolute top-1/2 left-0 h-[1px] w-full opacity-10" style={{ background: 'linear-gradient(transparent, #d4af37, transparent)' }} />

      <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 max-w-4xl w-full mx-6 text-center"
          >
            {/* Ornamental top */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #d4af37)' }} />
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" fill="#d4af37" />
                </svg>
                <div className="w-16 h-[1px]" style={{ background: 'linear-gradient(270deg, transparent, #d4af37)' }} />
              </div>
            </motion.div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-10"
            >
              <span className="text-[11px] uppercase tracking-[0.5em] font-light" style={{ color: '#d4af37' }}>
                Haute Couture Digitale
              </span>
            </motion.div>

            {/* Main title with serif feel */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-[1.1] mb-8"
              style={{ color: '#f5f0e8', fontFamily: 'Georgia, serif' }}
            >
              L&apos;Élégance
              <br />
              <span className="font-light italic" style={{ color: '#d4af37' }}>
                Absolue
              </span>
            </motion.h1>

            {/* Gold line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 1, ease: 'easeInOut' }}
              className="w-24 h-[1px] mx-auto mb-10" style={{ background: '#d4af37' }}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-base md:text-lg max-w-xl mx-auto mb-14 leading-[2] font-light" style={{ color: '#8a8070' }}
            >
              Un raffinement sans compromis. Chaque détail est pensé avec soin, chaque interaction est une expérience d&apos;exception. Bienvenue dans l&apos;excellence.
            </motion.p>

            {/* Luxury buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <button className="group relative px-12 py-4 text-sm uppercase tracking-[0.3em] font-light overflow-hidden transition-all duration-500" style={{ color: '#0a0a0a', background: '#d4af37', border: 'none' }}>
                <span className="relative z-10">Découvrir</span>
              </button>
              <button className="px-12 py-4 text-sm uppercase tracking-[0.3em] font-light transition-all duration-500 hover:text-[#d4af37]" style={{ color: '#8a8070', background: 'transparent', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
                Collection
              </button>
            </motion.div>

            {/* Bottom stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap justify-center gap-12 mt-20"
            >
              {[
                { value: '1998', label: 'Année de fondation' },
                { value: '48', label: 'Ateliers dans le monde' },
                { value: '∞', label: 'Exigence qualitative' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-light" style={{ color: '#d4af37' }}>{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] mt-2 font-light" style={{ color: '#5a5248' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Bottom ornament */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="mt-16"
            >
              <svg className="mx-auto opacity-30" width="40" height="6" viewBox="0 0 40 6" fill="none">
                <rect x="0" y="2" width="40" height="2" fill="#d4af37" />
                <rect x="18" y="0" width="4" height="6" fill="#d4af37" />
              </svg>
            </motion.div>
          </motion.div>
      </AnimatePresence>
    </div>
  );
}
