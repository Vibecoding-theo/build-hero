'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

/* ─── Custom Cursor ─── */
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const over = () => setIsHovering(true);
    const out = () => setIsHovering(false);

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', over);
      el.addEventListener('mouseleave', out);
    });

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isHovering ? 48 : 16,
            height: isHovering ? 48 : 16,
            borderWidth: isHovering ? 2 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-full h-full rounded-full border border-white/70 bg-red-500/20" />
        </motion.div>
      </motion.div>
      {/* Crosshair lines */}
      <motion.div
        className="fixed top-0 pointer-events-none z-[99] opacity-20"
        style={{
          x: springX,
          width: '1px',
          height: '100vh',
          background: 'linear-gradient(to bottom, transparent, #ef4444, transparent)',
        }}
      />
      <motion.div
        className="fixed left-0 pointer-events-none z-[99] opacity-20"
        style={{
          y: springY,
          height: '1px',
          width: '100vw',
          background: 'linear-gradient(to right, transparent, #ef4444, transparent)',
        }}
      />
    </>
  );
}

/* ─── Glitch Text ─── */
function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={`relative ${className}`} aria-label={text}>
      <span className="sr-only">{text}</span>
      <motion.span
        className="block"
        animate={{
          x: [0, -2, 3, -1, 0],
          textShadow: [
            'none',
            '2px 0 #ef4444, -2px 0 #3b82f6',
            '-1px 0 #ef4444, 2px 0 #3b82f6',
            '1px 0 #ef4444, -2px 0 #3b82f6',
            'none',
          ],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 4,
          ease: 'linear',
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}

/* ─── Animated Grid Background ─── */
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      {/* Accent grid lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-red-500/20"
          style={{ left: `${25 + i * 25}%` }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-red-500/20"
          style={{ top: `${33 + i * 33}%` }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.7 + 0.3 }}
        />
      ))}
    </div>
  );
}

/* ─── Scrolling Text Marquee ─── */
function TextMarquee({ text, direction = 'left' }: { text: string; direction?: 'left' | 'right' }) {
  const doubled = `${text}  ///  ${text}  ///  ${text}  ///  `;
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-block"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <span className="text-white/10 text-xl md:text-2xl font-mono uppercase tracking-widest">
          {doubled}
        </span>
      </motion.div>
    </div>
  );
}

/* ─── Scan Line Effect ─── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent z-[2]"
      animate={{ top: ['-5%', '105%'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    />
  );
}

/* ─── Horizontal Line Animation ─── */
function AnimatedLine({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden h-px ${className}`}>
      <motion.div
        className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-red-500/60 to-transparent"
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ─── Main Component ─── */
export default function BrutalistTechHero() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', { hour12: false }) +
          '.' +
          String(now.getMilliseconds()).padStart(3, '0')
      );
    };
    update();
    const interval = setInterval(update, 37);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden font-mono cursor-none">
      <CustomCursor />
      <GridBackground />
      <ScanLine />

      {/* Top Marquee */}
      <div className="absolute top-0 left-0 right-0 z-[3]">
        <TextMarquee text="SECURE AUDIT DEFEND PROTECT MONITOR DETECT" direction="left" />
      </div>

      {/* Bottom Marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-[3]">
        <TextMarquee text="PENTEST VULN EXPloit SCAN REMEDIATE SHIELD" direction="right" />
      </div>

      {/* Main Content - Asymmetric layout */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 md:px-16 lg:px-24">
        {/* Timestamp */}
        <motion.div
          className="mb-4 text-red-500 text-xs tracking-widest opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
        >
          [{time}]
        </motion.div>

        <AnimatedLine className="mb-8 max-w-[200px]" />

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.1 }}
        >
          <GlitchText
            text="BREAK"
            className="text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] font-black leading-[0.85] tracking-tighter text-white"
          />
        </motion.div>

        <motion.div
          className="mt-2 md:mt-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] font-black leading-[0.85] tracking-tighter text-transparent" style={{
            WebkitTextStroke: '1px rgba(255,255,255,0.2)',
          }}>
            THE
          </span>
        </motion.div>

        <motion.div
          className="md:ml-[20vw]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.1 }}
        >
          <GlitchText
            text="GRID"
            className="text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] font-black leading-[0.85] tracking-tighter"
          />
        </motion.div>

        <AnimatedLine className="mt-8 max-w-[400px]" />

        {/* Tagline */}
        <motion.div
          className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-white/40 text-sm md:text-base max-w-sm leading-relaxed">
            Advanced threat detection &amp; real-time monitoring.
            Built for those who refuse to compromise on security.
          </p>

          <div className="flex flex-col gap-3">
            <button className="group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm uppercase tracking-widest transition-all duration-200 overflow-hidden">
              <span className="relative z-10">Initialize &rarr;</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%', y: '-100%' }}
                whileHover={{ x: '20%', y: '20%' }}
                transition={{ duration: 0.3 }}
                style={{ width: '200%', height: '200%' }}
              />
            </button>
            <button className="px-8 py-4 border border-white/20 hover:border-white/40 text-white/60 hover:text-white font-bold text-sm uppercase tracking-widest transition-all duration-200">
              View Docs
            </button>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="mt-16 flex flex-wrap gap-8 md:gap-16 text-xs tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          {[
            { label: 'THREATS BLOCKED', value: '2.4M+' },
            { label: 'UPTIME', value: '99.99%' },
            { label: 'RESPONSE', value: '<12ms' },
            { label: 'CLIENTS', value: '14K+' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-red-500 font-bold text-lg md:text-2xl">{stat.value}</p>
              <p className="text-white/30 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-12 left-6 md:left-16 text-white/10 text-xs tracking-widest z-[3]">
        SYS://GRID_MAIN
      </div>
      <div className="absolute top-12 right-6 md:right-16 text-white/10 text-xs tracking-widest z-[3]">
        v3.14.159
      </div>

      {/* Blinking red dot */}
      <motion.div
        className="absolute top-[14px] right-[10px] md:right-[70px] w-2 h-2 rounded-full bg-red-500 z-[3]"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Bottom right corner */}
      <div className="absolute bottom-12 right-6 md:right-16 text-white/10 text-xs tracking-widest z-[3]">
        ALL SYSTEMS NOMINAL
      </div>
    </section>
  );
}
