'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function HeroAurora() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center" style={{ background: '#0F172A' }}>
      {/* Animated Aurora gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-morph-blob" style={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 25%, #0EA5E9 50%, #6366F1 75%, #EC4899 100%)',
          opacity: 0.15,
          filter: 'blur(80px)',
          animationDuration: '12s',
        }} />
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full animate-float" style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
          animationDuration: '8s',
        }} />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full animate-float-slow" style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
          animationDuration: '10s',
        }} />
        <div className="absolute top-[50%] left-[50%] w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 animate-morph-blob" style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 60%)',
          animationDelay: '-4s',
          animationDuration: '15s',
        }} />
      </div>

      {/* Star field */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.1,
              animation: `pulse ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 max-w-5xl w-full mx-6"
          >
            {/* Top navigation-style bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-16 px-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-sm font-medium text-white/60">aurora.studio</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                {['Produits', 'Solutions', 'À propos'].map((item) => (
                  <span key={item} className="text-sm text-white/40 hover:text-white/80 transition-colors cursor-pointer">{item}</span>
                ))}
              </div>
              <div className="px-4 py-2 rounded-lg border border-white/10 text-sm text-white/60 backdrop-blur-sm hover:bg-white/5 transition-colors cursor-pointer">
                Contact
              </div>
            </motion.div>

            {/* Centered content */}
            <div className="text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md mb-10" style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/70">Nouveau — Aurora Design System 3.0</span>
              </motion.div>

              {/* Big title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] mb-8"
              >
                <span className="block text-white">Lumière</span>
                <span className="block mt-1" style={{ background: 'linear-gradient(90deg, #10B981, #0EA5E9, #6366F1, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Infinie
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed"
              >
                Quand la lumière danse sur les interfaces, l&apos;ordinaire devient extraordinaire. Aurora transforme chaque écran en une expérience céleste.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <button className="px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #10B981, #0EA5E9)', color: 'white', border: 'none' }}>
                  Essai gratuit
                </button>
                <button className="px-8 py-4 rounded-xl font-semibold text-sm text-white/70 transition-all duration-300 hover:text-white hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'transparent' }}>
                  Voir la démo
                </button>
              </motion.div>

              {/* Bottom showcase cards */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-20 max-w-3xl mx-auto"
              >
                {[
                  { color: '#10B981', icon: '✦', label: 'Émeraude' },
                  { color: '#0EA5E9', icon: '◈', label: 'Céleste' },
                  { color: '#6366F1', icon: '◉', label: 'Nébuleuse' },
                  { color: '#EC4899', icon: '❖', label: 'Aurore' },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-5 rounded-2xl backdrop-blur-md border transition-all duration-300 cursor-pointer group"
                    style={{ background: 'rgba(255,255,255,0.03)', borderColor: `${item.color}20` }}
                  >
                    <div className="text-2xl mb-3 transition-transform duration-300 group-hover:scale-110" style={{ color: item.color }}>{item.icon}</div>
                    <div className="text-sm font-medium text-white/70">{item.label}</div>
                    <div className="w-full h-[2px] mt-3 rounded-full transition-all duration-500 group-hover:w-full" style={{ background: item.color, width: '40%', opacity: 0.5 }} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
      </AnimatePresence>
    </div>
  );
}
