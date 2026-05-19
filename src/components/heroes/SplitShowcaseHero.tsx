'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function LaptopSVG() {
  return (
    <motion.svg
      viewBox="0 0 400 300"
      fill="none"
      className="w-full h-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Laptop screen bezel */}
      <rect x="60" y="20" width="280" height="190" rx="12" fill="#1e1e2e" />
      {/* Screen */}
      <rect x="72" y="32" width="256" height="166" rx="4" fill="#0f0f1a" />
      {/* Screen content - code lines */}
      <motion.rect x="88" y="52" width="80" height="4" rx="2" fill="#c084fc" opacity="0.8"
        initial={{ width: 0 }} animate={{ width: 80 }} transition={{ duration: 0.8, delay: 1.0 }} />
      <motion.rect x="88" y="64" width="120" height="4" rx="2" fill="#67e8f9" opacity="0.6"
        initial={{ width: 0 }} animate={{ width: 120 }} transition={{ duration: 0.8, delay: 1.2 }} />
      <motion.rect x="100" y="76" width="60" height="4" rx="2" fill="#fbbf24" opacity="0.5"
        initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 0.8, delay: 1.3 }} />
      <motion.rect x="100" y="88" width="90" height="4" rx="2" fill="#f472b6" opacity="0.6"
        initial={{ width: 0 }} animate={{ width: 90 }} transition={{ duration: 0.8, delay: 1.4 }} />
      <motion.rect x="88" y="100" width="70" height="4" rx="2" fill="#86efac" opacity="0.5"
        initial={{ width: 0 }} animate={{ width: 70 }} transition={{ duration: 0.8, delay: 1.5 }} />
      <motion.rect x="88" y="112" width="140" height="4" rx="2" fill="#c084fc" opacity="0.4"
        initial={{ width: 0 }} animate={{ width: 140 }} transition={{ duration: 0.8, delay: 1.6 }} />
      <motion.rect x="100" y="124" width="100" height="4" rx="2" fill="#67e8f9" opacity="0.5"
        initial={{ width: 0 }} animate={{ width: 100 }} transition={{ duration: 0.8, delay: 1.7 }} />
      <motion.rect x="88" y="140" width="50" height="4" rx="2" fill="#fbbf24" opacity="0.4"
        initial={{ width: 0 }} animate={{ width: 50 }} transition={{ duration: 0.8, delay: 1.8 }} />
      {/* Terminal cursor blink */}
      <motion.rect x="88" y="152" width="8" height="12" rx="1" fill="#c084fc" opacity="0.9"
        animate={{ opacity: [0.9, 0, 0.9] }} transition={{ duration: 1.2, repeat: Infinity }} />
      {/* Screen glow */}
      <rect x="72" y="32" width="256" height="166" rx="4" fill="url(#screenGlow)" />
      {/* Laptop base */}
      <path d="M40 220 L60 210 L340 210 L360 220 L380 230 L20 230 Z" fill="#2a2a3e" />
      <path d="M20 230 L40 240 L360 240 L380 230 L380 234 L360 244 L40 244 L20 234 Z" fill="#1e1e2e" />
      {/* Trackpad */}
      <rect x="160" y="220" width="80" height="8" rx="4" fill="#1a1a2e" opacity="0.5" />
      <defs>
        <linearGradient id="screenGlow" x1="200" y1="32" x2="200" y2="198" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(192,132,252,0.05)" />
          <stop offset="1" stopColor="transparent" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

function FeatureItem({ icon, title, description, delay }: { icon: string; title: string; description: string; delay: number }) {
  return (
    <motion.div
      className="flex items-start gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-sm shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white/90">{title}</h4>
        <p className="text-xs text-white/50 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default function SplitShowcaseHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const leftX = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rightX = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const clipAngle = useTransform(scrollYProgress, [0, 1], [2, -2]);

  const features = [
    { icon: '⚡', title: 'Lightning Fast', description: 'Sub-millisecond response times with edge computing' },
    { icon: '🔒', title: 'Enterprise Security', description: 'SOC2 compliant with end-to-end encryption' },
    { icon: '📈', title: 'Auto Scaling', description: 'Handles millions of requests effortlessly' },
    { icon: '🌍', title: 'Global CDN', description: 'Deployed across 200+ edge locations worldwide' },
  ];

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0a0a1a]">
      {/* Left panel */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950"
        style={{ x: leftX }}
      >
        {/* Animated mesh gradient */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
              left: '30%',
              top: '20%',
            }}
            animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
              right: '20%',
              bottom: '10%',
            }}
            animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="split-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="12" cy="12" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#split-dots)" />
          </svg>
        </div>

        {/* Left content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 xl:pr-[52vw]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium text-violet-300 bg-violet-500/10 rounded-full border border-violet-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Now in public beta
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Build faster.
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              Ship smarter.
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-violet-200/60 max-w-lg leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            The next-generation development platform that empowers teams to build, 
            deploy, and scale applications with unprecedented speed and reliability.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              className="px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg shadow-white/10"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Building →
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-white/5 text-white rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors border border-white/10"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              View Documentation
            </motion.button>
          </motion.div>

          {/* Feature list */}
          <div className="space-y-4 hidden lg:block">
            {features.map((f, i) => (
              <FeatureItem key={i} icon={f.icon} title={f.title} description={f.description} delay={0.8 + i * 0.1} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right panel */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-[48vw] min-w-[280px] bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 hidden md:block"
        style={{ x: rightX }}
      >
        {/* Diagonal separation with SVG */}
        <svg
          className="absolute left-0 top-0 h-full w-[60px] -translate-x-full"
          preserveAspectRatio="none"
          viewBox="0 0 60 600"
        >
          <motion.path
            d="M60 0 L0 0 L60 600 L60 600Z"
            fill="url(#rightGrad)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M0 0 C30 100, 10 200, 40 300 C70 400, 20 500, 60 600"
            fill="none"
            stroke="rgba(168,85,247,0.15)"
            strokeWidth="1"
            animate={{ d: [
              'M0 0 C30 100, 10 200, 40 300 C70 400, 20 500, 60 600',
              'M0 0 C10 100, 30 200, 20 300 C10 400, 40 500, 60 600',
              'M0 0 C30 100, 10 200, 40 300 C70 400, 20 500, 60 600',
            ] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="rightGrad" x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="transparent" />
              <stop offset="0.5" stopColor="rgba(15,15,26,0.3)" />
              <stop offset="1" stopColor="#0a0a1a" />
            </linearGradient>
          </defs>
        </svg>

        {/* Right content - laptop mockup */}
        <div className="relative z-10 h-full flex items-center justify-center px-8 py-16">
          <div className="relative w-full max-w-md">
            {/* Glow behind laptop */}
            <motion.div
              className="absolute -inset-10 bg-gradient-to-r from-violet-500/20 via-pink-500/10 to-amber-500/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative">
              <LaptopSVG />
            </div>
            {/* Floating badges around laptop */}
            {[
              { x: -20, y: 20, label: '99.99% Uptime', color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', delay: 1.5 },
              { x: '80%', y: -10, label: '0ms Cold Start', color: 'bg-violet-500/10 border-violet-500/20 text-violet-400', delay: 1.7 },
              { x: '60%', y: '85%', label: '10M+ Requests/s', color: 'bg-amber-500/10 border-amber-500/20 text-amber-400', delay: 1.9 },
            ].map((badge, i) => (
              <motion.div
                key={i}
                className={`absolute px-3 py-1.5 rounded-lg text-xs font-medium border backdrop-blur-sm ${badge.color}`}
                style={{ left: badge.x, top: badge.y }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: badge.delay }}
              >
                {badge.label}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs font-medium tracking-widest uppercase text-white/30">Explore</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
