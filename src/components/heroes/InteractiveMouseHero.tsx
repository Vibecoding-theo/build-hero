'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useCallback, useRef, useEffect } from 'react';

interface FloatingCard {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  depth: number;
  rotation: number;
  label: string;
  icon: string;
}

const CARDS: FloatingCard[] = [
  { id: 1, x: 15, y: 20, size: 160, color: 'from-rose-400 to-orange-300', depth: 0.15, rotation: -6, label: 'Analytics', icon: '📊' },
  { id: 2, x: 70, y: 15, size: 140, color: 'from-violet-400 to-purple-300', depth: 0.25, rotation: 4, label: 'Security', icon: '🛡️' },
  { id: 3, x: 75, y: 60, size: 180, color: 'from-emerald-400 to-teal-300', depth: 0.1, rotation: -3, label: 'Cloud', icon: '☁️' },
  { id: 4, x: 10, y: 65, size: 130, color: 'from-amber-400 to-yellow-300', depth: 0.2, rotation: 5, label: 'AI/ML', icon: '🤖' },
  { id: 5, x: 40, y: 30, size: 200, color: 'from-sky-400 to-cyan-300', depth: 0.05, rotation: -2, label: 'Platform', icon: '⚡' },
  { id: 6, x: 50, y: 70, size: 120, color: 'from-pink-400 to-fuchsia-300', depth: 0.3, rotation: 7, label: 'Deploy', icon: '🚀' },
];

function FloatingCardComponent({ card, mouseX, mouseY }: { card: FloatingCard; mouseX: number; mouseY: number }) {
  const springConfig = { stiffness: 50, damping: 20, mass: 1 };

  const offsetX = (mouseX - 50) * card.depth * 1.5;
  const offsetY = (mouseY - 50) * card.depth * 1.5;

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  useEffect(() => {
    x.set(offsetX);
    y.set(offsetY);
    rotateX.set((mouseY - 50) * -0.3 * card.depth);
    rotateY.set((mouseX - 50) * 0.3 * card.depth);
  }, [mouseX, mouseY, x, y, rotateX, rotateY, offsetX, offsetY, card.depth]);

  const scale = 1 + (card.depth * 0.5);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${card.x}%`,
        top: `${card.y}%`,
        perspective: 800,
        zIndex: Math.round((1 - card.depth) * 100),
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale }}
      transition={{ duration: 0.8, delay: card.id * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        style={{
          x,
          y,
          rotateX,
          rotateY,
          rotateZ: card.rotation,
        }}
        className="relative"
      >
        <div
          className={`bg-gradient-to-br ${card.color} rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white overflow-hidden`}
          style={{ width: card.size, height: card.size * 0.7 }}
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id={`grid-${card.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${card.id})`} />
            </svg>
          </div>
          <span className="text-3xl mb-2 relative z-10">{card.icon}</span>
          <span className="text-sm font-semibold tracking-wide relative z-10">{card.label}</span>
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/10 rounded-full blur-sm" />
      </motion.div>
    </motion.div>
  );
}

function FloatingOrb({
  baseX,
  baseY,
  size,
  color,
  mouseX,
  mouseY,
  delay,
}: {
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  mouseX: number;
  mouseY: number;
  delay: number;
}) {
  const springConfig = { stiffness: 30, damping: 15, mass: 1.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    x.set((mouseX - 50) * 0.08);
    y.set((mouseY - 50) * 0.08);
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${baseX}%`,
        top: `${baseY}%`,
        x,
        y,
        width: size,
        height: size,
        background: color,
        filter: 'blur(1px)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

export default function InteractiveMouseHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const textX = useTransform(mouseX, [0, 100], [-20, 20]);
  const textY = useTransform(mouseY, [0, 100], [-10, 10]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(50);
    mouseY.set(50);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 cursor-crosshair select-none"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-rose-200/30 to-orange-200/30"
          style={{ left: '10%', top: '20%' }}
          animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-violet-200/30 to-purple-200/30"
          style={{ right: '10%', top: '30%' }}
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-emerald-200/20 to-teal-200/20"
          style={{ left: '40%', bottom: '10%' }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating orbs */}
      {[
        { x: 20, y: 40, s: 12, c: 'rgba(244, 63, 94, 0.5)', d: 0 },
        { x: 80, y: 25, s: 8, c: 'rgba(168, 85, 247, 0.5)', d: 1 },
        { x: 60, y: 75, s: 10, c: 'rgba(16, 185, 129, 0.5)', d: 2 },
        { x: 30, y: 80, s: 6, c: 'rgba(245, 158, 11, 0.5)', d: 0.5 },
        { x: 85, y: 60, s: 14, c: 'rgba(236, 72, 153, 0.4)', d: 1.5 },
        { x: 10, y: 15, s: 8, c: 'rgba(59, 130, 246, 0.4)', d: 2.5 },
        { x: 50, y: 10, s: 6, c: 'rgba(14, 165, 233, 0.5)', d: 0.8 },
        { x: 90, y: 85, s: 10, c: 'rgba(251, 191, 36, 0.4)', d: 1.2 },
      ].map((orb, i) => (
        <FloatingOrb
          key={i}
          baseX={orb.x}
          baseY={orb.y}
          size={orb.s}
          color={orb.c}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          delay={orb.d}
        />
      ))}

      {/* Floating cards at different depths */}
      {CARDS.map((card) => (
        <FloatingCardComponent key={card.id} card={card} mouseX={mousePos.x} mouseY={mousePos.y} />
      ))}

      {/* Cursor follower glow */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          x: -150,
          y: -150,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />

      {/* Main text content */}
      <div className="absolute inset-0 flex items-center justify-center z-[200]">
        <motion.div
          style={{ x: textX, y: textY }}
          className="text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-violet-700 bg-violet-100 rounded-full border border-violet-200">
              ✨ Move your mouse around
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Experience the{' '}
            <span className="bg-gradient-to-r from-violet-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              Future
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            An immersive, interactive experience that responds to your every move. 
            Watch as elements come alive with depth and motion.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              className="px-8 py-3.5 bg-gray-900 text-white rounded-xl font-medium text-base hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Free
            </motion.button>
            <motion.button
              className="px-8 py-3.5 bg-white text-gray-700 rounded-xl font-medium text-base hover:bg-gray-50 transition-colors shadow-lg shadow-gray-200/50 border border-gray-200"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Watch Demo →
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mouse position indicator */}
      <motion.div
        className="fixed bottom-6 left-6 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-lg text-xs font-mono text-gray-500 shadow-sm border border-gray-100 z-[300]"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ delay: 1.5 }}
      >
        x: {Math.round(mousePos.x)} y: {Math.round(mousePos.y)}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
