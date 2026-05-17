'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function HeroBrutalism() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#FFFB00]">
      {/* Harsh geometric background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-black" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-[#FF00FF]" />
        <div className="absolute top-[50%] left-[10%] w-[200px] h-[200px] bg-white border-4 border-black rotate-12" />
        <div className="absolute bottom-[20%] right-[15%] w-[150px] h-[150px] bg-[#00FFFF] border-4 border-black -rotate-6" />
        {/* Diagonal stripe */}
        <div className="absolute top-0 left-[30%] w-[4px] h-full bg-black -rotate-[15deg] origin-top" />
        <div className="absolute top-0 left-[60%] w-[4px] h-full bg-black -rotate-[15deg] origin-top" />
      </div>

      {/* Brutalist card - NO border radius, sharp edges */}
      <AnimatePresence>
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-5xl w-full mx-6"
          >
            <div className="bg-white border-4 border-black p-8 md:p-14 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {/* Top bar */}
              <div className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b-4 border-black">
                <span className="text-xs font-bold uppercase tracking-[0.3em] bg-black text-[#FFFB00] px-3 py-1">BRUTALISTE</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/60">EST. 2024 — NO COMPROMISE</span>
              </div>

              {/* Giant title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-[8rem] font-black uppercase leading-[0.85] tracking-[-0.04em] text-black mb-6"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                ON<br/>
                <span className="relative inline-block">
                  CASSE
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M0 6 L40 2 L80 6 L120 2 L160 6 L200 2" stroke="#FF00FF" strokeWidth="4" />
                  </svg>
                </span>
                <br/>LES
                <span className="text-[#FF00FF]"> RÈGLES</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg text-black max-w-xl mb-10 leading-relaxed"
              >
                Pas de compromis. Pas de fioritures. Juste du contenu brut et une typographie qui crie. Le design brutaliste affirme sa présence sans demander la permission.
              </motion.p>

              {/* Brutal buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-0"
              >
                <button className="bg-black text-[#FFFB00] px-10 py-5 font-black uppercase text-lg tracking-wider border-4 border-black transition-all duration-200 hover:shadow-[6px_6px_0px_0px_rgba(255,0,255,1)] hover:-translate-y-1">
                  Voir le chaos
                </button>
                <button className="bg-transparent text-black px-10 py-5 font-black uppercase text-lg tracking-wider border-4 border-black transition-all duration-200 hover:bg-[#00FFFF] hover:-translate-y-1">
                  Non merci
                </button>
              </motion.div>

              {/* Bottom stats */}
              <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t-4 border-black">
                {[
                  { value: 'RAW', label: 'ESTHÉTIQUE' },
                  { value: 'BOLD', label: 'TYPOGRAPHIE' },
                  { value: 'LOUD', label: 'IDENTITÉ' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center py-4 bg-black text-[#FFFB00]">
                    <div className="text-2xl md:text-3xl font-black">{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
      </AnimatePresence>

      {/* Decorative stickers */}
      <div className="absolute top-[10%] left-[5%] bg-[#FF00FF] text-white px-4 py-2 font-black text-sm uppercase rotate-[-8deg] border-2 border-black z-20 hidden md:block">
        Nouveau!
      </div>
    </div>
  );
}
