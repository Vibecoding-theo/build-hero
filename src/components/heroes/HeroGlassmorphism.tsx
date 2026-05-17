'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function HeroGlassmorphism() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full animate-float" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full animate-float-slow" style={{ background: 'radial-gradient(circle, rgba(255,182,193,0.3) 0%, transparent 70%)' }} />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full animate-float" style={{ background: 'radial-gradient(circle, rgba(173,216,230,0.3) 0%, transparent 70%)', animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[30%] w-[250px] h-[250px] rounded-full animate-float-slow" style={{ background: 'radial-gradient(circle, rgba(255,218,185,0.25) 0%, transparent 70%)', animationDelay: '1s' }} />
      </div>

      {/* Glassmorphism card */}
      <AnimatePresence>
        <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-4xl w-full mx-6"
          >
            <div className="rounded-3xl p-10 md:p-16 backdrop-blur-xl border border-white/20 shadow-2xl" style={{ background: 'rgba(255, 255, 255, 0.12)' }}>
              {/* Top badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {['Design System', 'UI/UX', 'Glassmorphism'].map((tag, i) => (
                  <span key={tag} className="px-4 py-1.5 rounded-full text-sm font-medium border border-white/30 text-white/90 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
              >
                Beyond
                <span className="block mt-1" style={{ background: 'linear-gradient(90deg, #fff, #ffd6e0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Ordinary
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed"
              >
                Experience the elegance of frosted glass interfaces. Where transparency meets sophistication, creating depth without distraction. Every pixel breathes.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <button className="px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                  Explorer
                </button>
                <button className="px-8 py-4 rounded-2xl font-semibold text-white/90 transition-all duration-300 hover:scale-105 hover:bg-white/20" style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.3)' }}>
                  En savoir plus
                </button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/15"
              >
                {[
                  { value: '99.9%', label: 'Uptime' },
                  { value: '2.4M', label: 'Utilisateurs' },
                  { value: '150+', label: 'Templates' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
      </AnimatePresence>

      {/* Floating decorative elements */}
      <div className="absolute top-[15%] right-[8%] w-4 h-4 rounded-full bg-white/40 animate-float" />
      <div className="absolute bottom-[25%] left-[12%] w-3 h-3 rounded-full bg-white/30 animate-float-slow" />
      <div className="absolute top-[60%] right-[15%] w-5 h-5 rounded-full bg-pink-300/30 animate-float" style={{ animationDelay: '1s' }} />
    </div>
  );
}
