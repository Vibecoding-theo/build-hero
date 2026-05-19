'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
interface BlobShape {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
}

const BLOBS: BlobShape[] = [
  { id: 1, x: 10, y: 10, size: 500, duration: 12, delay: 0, color: 'rgba(168,85,247,0.35)', opacity: 0.5 },
  { id: 2, x: 60, y: 5, size: 450, duration: 15, delay: 1, color: 'rgba(20,184,166,0.3)', opacity: 0.4 },
  { id: 3, x: 30, y: 50, size: 600, duration: 18, delay: 2, color: 'rgba(244,63,94,0.25)', opacity: 0.45 },
  { id: 4, x: 75, y: 55, size: 400, duration: 10, delay: 0.5, color: 'rgba(245,158,11,0.3)', opacity: 0.4 },
  { id: 5, x: 5, y: 70, size: 350, duration: 14, delay: 1.5, color: 'rgba(99,102,241,0.3)', opacity: 0.35 },
  { id: 6, x: 50, y: 30, size: 550, duration: 16, delay: 3, color: 'rgba(236,72,153,0.2)', opacity: 0.3 },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.02,
    speedY: -Math.random() * 0.03 - 0.01,
    opacity: Math.random() * 0.5 + 0.2,
  }));
}

function MorphBlob({ blob }: { blob: BlobShape }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${blob.x}%`,
        top: `${blob.y}%`,
        width: blob.size,
        height: blob.size,
        opacity: blob.opacity,
      }}
      animate={{
        borderRadius: [
          '60% 40% 30% 70% / 60% 30% 70% 40%',
          '30% 60% 70% 40% / 50% 60% 30% 60%',
          '40% 60% 50% 50% / 40% 50% 60% 50%',
          '60% 40% 30% 70% / 60% 30% 70% 40%',
        ],
        scale: [1, 1.1, 0.95, 1.05, 1],
        rotate: [0, 10, -5, 5, 0],
        x: [0, 30, -20, 15, 0],
        y: [0, -20, 15, -10, 0],
      }}
      transition={{
        duration: blob.duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: blob.delay,
      }}
    >
      <div
        className="w-full h-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${blob.color}, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />
    </motion.div>
  );
}

function ParticleField() {
  const [particles] = useState<Particle[]>(() => generateParticles(40));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'rgba(255,255,255,0.6)',
          }}
          animate={{
            y: [-20, -120],
            x: [0, p.speedX * 500],
            opacity: [p.opacity, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: 'linear',
            delay: p.id * 0.3,
          }}
        />
      ))}
    </div>
  );
}

function GlassmorphismCard() {
  return (
    <motion.div
      className="relative z-20 mx-auto max-w-md w-[90%]"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 55%, transparent 60%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Card header */}
        <div className="flex items-center gap-3 mb-5">
          <motion.div
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-violet-500/20"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            AI
          </motion.div>
          <div>
            <h3 className="text-white font-semibold text-sm">Neural Engine v4.0</h3>
            <p className="text-white/40 text-xs">Real-time inference</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-medium">Online</span>
          </div>
        </div>

        {/* Fake metrics */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Latency', value: '2.3ms', color: 'text-violet-300' },
            { label: 'Accuracy', value: '99.7%', color: 'text-teal-300' },
            { label: 'Models', value: '142', color: 'text-amber-300' },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              className="bg-white/5 rounded-xl p-3 text-center border border-white/5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
            >
              <p className={`text-lg font-bold ${metric.color}`}>{metric.value}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Fake activity bars */}
        <div className="flex items-end gap-1 h-12 mb-4">
          {Array.from({ length: 20 }, (_, i) => {
            const height = 20 + Math.random() * 80;
            return (
              <motion.div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-violet-500/40 to-rose-500/40"
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5, delay: 1.5 + i * 0.05, ease: 'easeOut' }}
              />
            );
          })}
        </div>

        {/* Status line */}
        <div className="flex items-center justify-between">
          <p className="text-white/30 text-xs">Processing 1.2M tokens/sec</p>
          <motion.div
            className="px-2.5 py-1 rounded-md bg-white/5 text-white/50 text-xs font-medium border border-white/10"
            whileHover={{ scale: 1.05 }}
          >
            View Dashboard →
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedGradientText() {
  return (
    <motion.h1
      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="block">The Future of</span>
      <span className="block mt-2 bg-gradient-to-r from-violet-400 via-rose-400 via-teal-400 to-amber-400 bg-clip-text text-transparent bg-[length:300%_100%] animate-[gradient-shift_6s_ease-in-out_infinite]">
        Intelligence
      </span>
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.h1>
  );
}

export default function AIMorphingHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#050510] flex items-center justify-center">
      {/* Morphing blobs background */}
      <div className="absolute inset-0">
        {BLOBS.map((blob) => (
          <MorphBlob key={blob.id} blob={blob} />
        ))}
      </div>

      {/* Particle effects between blobs */}
      <ParticleField />

      {/* Animated gradient overlay for color shifting */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 50%, rgba(168,85,247,0.08) 0%, transparent 50%)',
            'radial-gradient(ellipse at 80% 20%, rgba(20,184,166,0.08) 0%, transparent 50%)',
            'radial-gradient(ellipse at 50% 80%, rgba(244,63,94,0.08) 0%, transparent 50%)',
            'radial-gradient(ellipse at 20% 50%, rgba(168,85,247,0.08) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-violet-300 bg-violet-500/10 rounded-full border border-violet-500/20 backdrop-blur-sm">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-violet-400"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Powered by Neural Networks
          </span>
        </motion.div>

        <AnimatedGradientText />

        <motion.p
          className="mt-6 text-base sm:text-lg md:text-xl text-white/40 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Harness the power of advanced AI models to transform your data into 
          actionable insights, automate complex workflows, and unlock new possibilities.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            className="px-8 py-3.5 bg-gradient-to-r from-violet-600 to-rose-600 text-white rounded-xl font-medium text-sm shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-shadow"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Try Neural Engine
          </motion.button>
          <motion.button
            className="px-8 py-3.5 bg-white/5 text-white rounded-xl font-medium text-sm hover:bg-white/10 transition-colors border border-white/10 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Read the Docs
          </motion.button>
        </motion.div>

        {/* Glassmorphism card */}
        <div className="mt-12">
          <GlassmorphismCard />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050510] to-transparent pointer-events-none z-30" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs font-medium tracking-widest uppercase text-white/20">Scroll</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
