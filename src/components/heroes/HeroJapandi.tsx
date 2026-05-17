'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function HeroJapandi() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center" style={{ background: '#F5F0EB' }}>
      {/* Subtle organic shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-[350px] h-[350px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #D4C5B5 0%, transparent 70%)' }} />
        <div className="absolute bottom-[5%] left-[8%] w-[300px] h-[300px] opacity-15" style={{ background: 'radial-gradient(circle, #B8A99A 0%, transparent 70%)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />
        {/* Vertical lines decoration */}
        <div className="absolute top-0 right-[20%] w-[1px] h-full bg-[#C4B5A5]/30" />
        <div className="absolute top-0 right-[22%] w-[1px] h-full bg-[#C4B5A5]/20" />
      </div>

      <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-4xl w-full mx-6"
          >
            <div className="py-20 px-8 md:px-16">
              {/* Top minimal label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-16"
              >
                <span className="text-[11px] uppercase tracking-[0.4em] font-light" style={{ color: '#8B7E74' }}>
                  Simplicité — Élégance — Sérénité
                </span>
              </motion.div>

              {/* Title with organic underline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-extralight leading-[1.1] mb-10" style={{ color: '#3D3530' }}
              >
                L&apos;art de la
                <br />
                <span className="font-medium italic" style={{ color: '#6B5B4E' }}>
                  simplicité
                </span>
              </motion.h1>

              {/* Organic SVG wave divider */}
              <svg className="w-full mb-10" viewBox="0 0 400 12" fill="none" preserveAspectRatio="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6, duration: 1.5, ease: 'easeInOut' }}
                  d="M0 6 Q50 0, 100 6 T200 6 T300 6 T400 6"
                  stroke="#C4B5A5"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-base md:text-lg max-w-lg leading-[1.9] mb-14" style={{ color: '#7A6E65' }}
              >
                Dans la quiétude de l&apos;espace vide réside la plus pure forme de beauté. Chaque élément trouve sa place naturelle, chaque respiration est un design en soi. Moins, c&apos;est infiniment plus.
              </motion.p>

              {/* Minimal buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-6"
              >
                <button className="px-8 py-4 rounded-sm text-sm uppercase tracking-[0.2em] font-medium transition-all duration-500 hover:opacity-70" style={{ background: '#3D3530', color: '#F5F0EB' }}>
                  Découvrir
                </button>
                <button className="px-8 py-4 rounded-sm text-sm uppercase tracking-[0.2em] font-light transition-all duration-500 hover:opacity-70" style={{ border: '1px solid #C4B5A5', color: '#6B5B4E', background: 'transparent' }}>
                  Respirer
                </button>
              </motion.div>

              {/* Bottom features - minimal style */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="grid grid-cols-3 gap-8 mt-20 pt-10" style={{ borderTop: '1px solid #E0D5CC' }}
              >
                {[
                  { num: '01', label: 'Équilibre' },
                  { num: '02', label: 'Harmonie' },
                  { num: '03', label: 'Nature' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-3xl font-extralight" style={{ color: '#C4B5A5' }}>{item.num}</div>
                    <div className="text-xs uppercase tracking-[0.3em] mt-2" style={{ color: '#8B7E74' }}>{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
      </AnimatePresence>
    </div>
  );
}
