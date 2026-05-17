'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function HeroOrganic() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center" style={{ background: '#1a1a2e' }}>
      {/* Morphing blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] animate-morph-blob opacity-40" style={{ background: 'linear-gradient(135deg, #e94560, #0f3460)' }} />
        <div className="absolute bottom-[-20%] left-[-15%] w-[700px] h-[700px] animate-morph-blob opacity-30" style={{ background: 'linear-gradient(135deg, #16213e, #533483)', animationDelay: '-4s' }} />
        <div className="absolute top-[30%] left-[30%] w-[400px] h-[400px] animate-morph-blob opacity-25" style={{ background: 'linear-gradient(135deg, #e94560, #533483)', animationDelay: '-2s' }} />
        <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] animate-morph-blob opacity-20" style={{ background: 'linear-gradient(135deg, #0f3460, #e94560)', animationDelay: '-6s' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? '#e94560' : '#533483',
              opacity: Math.random() * 0.5 + 0.1,
              animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 max-w-5xl w-full mx-6"
          >
            <div className="flex flex-col items-center text-center">
              {/* Pill label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 px-6 py-2 rounded-full backdrop-blur-md border" style={{ background: 'rgba(233, 69, 96, 0.15)', borderColor: 'rgba(233, 69, 96, 0.3)' }}
              >
                <span className="text-sm font-medium" style={{ color: '#e94560' }}>Flux Créatif Organique</span>
              </motion.div>

              {/* Main title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8"
              >
                <span className="block text-white">Créez.</span>
                <span className="block mt-2" style={{ background: 'linear-gradient(135deg, #e94560, #533483, #0f3460)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Évoluez.
                </span>
                <span className="block mt-2 text-white/80">Transformez.</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-white/50 max-w-xl mb-12 leading-relaxed"
              >
                Laissez votre créativité couler librement comme un cours d&apos;eau. Chaque projet est une œuvre organique en constante transformation.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <button className="relative px-10 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-500 hover:scale-105" style={{ background: 'linear-gradient(135deg, #e94560, #533483)' }}>
                  <span className="relative z-10">Commencer</span>
                </button>
                <button className="px-10 py-4 rounded-full font-semibold text-white/70 transition-all duration-500 hover:text-white hover:scale-105" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                  Voir la galerie
                </button>
              </motion.div>

              {/* Feature cards */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 w-full max-w-3xl"
              >
                {[
                  { icon: '◆', title: 'Fluide', desc: 'Transitions naturelles' },
                  { icon: '◇', title: 'Vivant', desc: 'Animations organiques' },
                  { icon: '○', title: 'Pur', desc: 'Esthétique épurée' },
                ].map((feature) => (
                  <div key={feature.title} className="p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 hover:border-white/30" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                    <div className="text-2xl mb-3" style={{ color: '#e94560' }}>{feature.icon}</div>
                    <div className="font-semibold text-white mb-1">{feature.title}</div>
                    <div className="text-sm text-white/40">{feature.desc}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
      </AnimatePresence>
    </div>
  );
}
