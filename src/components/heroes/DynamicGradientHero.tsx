'use client';

import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';

const GRADIENT_COLORS = [
  { name: 'Coral', hex: '#FF6B6B' },
  { name: 'Peach', hex: '#FFA07A' },
  { name: 'Amber', hex: '#FFD93D' },
  { name: 'Lavender', hex: '#C084FC' },
  { name: 'Sky', hex: '#67E8F9' },
  { name: 'Rose', hex: '#FDA4AF' },
];

const BLOBS = [
  { baseX: 20, baseY: 30, color: 'rgba(255,107,107,0.6)', size: 500, duration: 20 },
  { baseX: 70, baseY: 20, color: 'rgba(255,160,122,0.5)', size: 450, duration: 25 },
  { baseX: 50, baseY: 70, color: 'rgba(192,132,252,0.5)', size: 550, duration: 22 },
  { baseX: 80, baseY: 60, color: 'rgba(103,232,249,0.4)', size: 480, duration: 28 },
  { baseX: 30, baseY: 80, color: 'rgba(255,217,61,0.4)', size: 420, duration: 24 },
  { baseX: 60, baseY: 45, color: 'rgba(253,164,175,0.5)', size: 400, duration: 26 },
];

interface BlobProps {
  baseX: number;
  baseY: number;
  color: string;
  size: number;
  duration: number;
  mouseX: number;
  mouseY: number;
}

function GradientBlob({ baseX, baseY, color, size, duration, mouseX, mouseY }: BlobProps) {
  // Influence of mouse position on blob movement
  const dx = (mouseX - 50) * 0.15;
  const dy = (mouseY - 50) * 0.15;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(80px)',
        mixBlendMode: 'normal',
      }}
      animate={{
        x: [
          `${baseX - 10 + dx}%`,
          `${baseX + 10 + dx * 0.5}%`,
          `${baseX - 5 + dx * 1.2}%`,
          `${baseX + 8 + dx * 0.8}%`,
          `${baseX - 10 + dx}%`,
        ],
        y: [
          `${baseY - 8 + dy}%`,
          `${baseY + 12 + dy * 0.7}%`,
          `${baseY + 5 + dy * 1.1}%`,
          `${baseY - 10 + dy * 0.5}%`,
          `${baseY - 8 + dy}%`,
        ],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function DynamicGradientHero() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0f0f14' }}
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient blobs */}
      {BLOBS.map((blob, i) => (
        <GradientBlob key={i} {...blob} mouseX={mousePos.x} mouseY={mousePos.y} />
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase
              border border-white/10 backdrop-blur-md text-white/70"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              ✦ Dynamic Gradient Engine
            </span>
          </motion.div>

          {/* Title with gradient text */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #FF6B6B, #FFA07A, #FFD93D, #C084FC, #67E8F9)',
                backgroundSize: '200% 200%',
              }}
            >
              Colors That
            </span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #67E8F9, #C084FC, #FDA4AF, #FFD93D, #FF6B6B)',
                backgroundSize: '200% 200%',
              }}
            >
              Come Alive
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Move your cursor to shape the gradient. Watch as colors blend, shift, and
            transform into a living canvas of light.
          </motion.p>

          {/* Glassmorphism cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ),
                title: 'Reactive',
                desc: 'Responds to your every move',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                ),
                title: 'Layered',
                desc: 'Six layers of gradient depth',
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                ),
                title: 'Organic',
                desc: 'Smooth, natural transitions',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="p-6 rounded-2xl backdrop-blur-xl text-white/80 text-center"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                whileHover={{
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.15)',
                  y: -4,
                }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <div className="flex justify-center mb-3 text-white/60">{card.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{card.title}</h3>
                <p className="text-white/40 text-xs">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Color palette display */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {GRADIENT_COLORS.map((color, i) => (
              <motion.div
                key={color.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-white/50 text-[10px] font-mono tracking-wider">
                  {color.hex}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.button
              className="px-8 py-3.5 rounded-full text-sm font-semibold text-black
                hover:scale-105 active:scale-95 transition-transform duration-200"
              style={{
                background: 'linear-gradient(135deg, #FFD93D, #FF6B6B, #C084FC)',
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started Free
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
