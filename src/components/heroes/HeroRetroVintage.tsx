'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function HeroRetroVintage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center" style={{ background: '#F4E8D1' }}>
      {/* Grain texture overlay */}
      <div className="absolute inset-0 animate-grain opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* Warm gradient spots */}
      <div className="absolute inset-0">
        <div className="absolute top-[10%] right-[15%] w-[300px] h-[300px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #D4A574 0%, transparent 70%)' }} />
        <div className="absolute bottom-[15%] left-[10%] w-[250px] h-[250px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #C4956A 0%, transparent 70%)' }} />
      </div>

      {/* Retro decorative border */}
      <div className="absolute inset-8 md:inset-16 border-2 border-[#C4956A]/30 pointer-events-none" />
      <div className="absolute inset-10 md:inset-18 border border-[#C4956A]/20 pointer-events-none" />

      <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 max-w-4xl w-full mx-6 text-center"
          >
            {/* Retro top badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 border-2 border-[#8B6914] rounded-none" style={{ background: 'rgba(139, 105, 20, 0.08)' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: '#8B6914' }} />
                <span className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: '#8B6914', fontFamily: 'var(--font-geist-mono)' }}>
                  Collection 2024
                </span>
                <div className="w-2 h-2 rounded-full" style={{ background: '#8B6914' }} />
              </div>
            </motion.div>

            {/* Vintage title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-8xl font-bold uppercase leading-[0.9] mb-8" style={{ color: '#4A3728', fontFamily: 'Georgia, serif' }}
            >
              Le Charme
              <br />
              <span className="block mt-2 italic font-normal text-5xl md:text-7xl" style={{ color: '#8B6914' }}>
                d&apos;Antan
              </span>
            </motion.h1>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center gap-3 mb-10"
            >
              <div className="w-12 h-[1px]" style={{ background: '#C4956A' }} />
              <div className="w-3 h-3 rotate-45 border border-[#8B6914]" />
              <div className="w-12 h-[1px]" style={{ background: '#C4956A' }} />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-base md:text-lg max-w-xl mx-auto mb-12 leading-[1.9]" style={{ color: '#6B5744' }}
            >
              Un voyage dans le temps où chaque pixel raconte une histoire. Le design vintage réinventé pour le monde moderne, avec la chaleur et l&apos;authenticité d&apos;une époque révolue.
            </motion.p>

            {/* Retro buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <button className="px-10 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1" style={{ background: '#8B6914', color: '#F4E8D1', border: '2px solid #8B6914' }}>
                Explorer la collection
              </button>
              <button className="px-10 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:bg-[#8B6914] hover:text-[#F4E8D1]" style={{ background: 'transparent', color: '#8B6914', border: '2px solid #8B6914' }}>
                Notre histoire
              </button>
            </motion.div>

            {/* Vintage bottom features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto"
            >
              {[
                { num: '01', label: 'Artisanat', desc: 'Fait main avec soin' },
                { num: '02', label: 'Durabilité', desc: 'Conçu pour durer' },
                { num: '03', label: 'Patrimoine', desc: 'Tradition vivante' },
              ].map((item) => (
                <div key={item.label} className="py-4 px-2 border-t-2 text-center" style={{ borderColor: '#C4956A' }}>
                  <div className="text-3xl font-bold italic" style={{ color: '#C4956A', fontFamily: 'Georgia, serif' }}>{item.num}</div>
                  <div className="text-sm font-semibold uppercase tracking-wider mt-2" style={{ color: '#4A3728' }}>{item.label}</div>
                  <div className="text-xs mt-1" style={{ color: '#8B7E74' }}>{item.desc}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
      </AnimatePresence>
    </div>
  );
}
