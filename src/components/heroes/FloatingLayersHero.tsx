'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  Layer 1 — Back: Blurred gradient shapes                          */
/* ------------------------------------------------------------------ */
function BackGradientLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[
        { x: '15%', y: '20%', size: 500, color: 'rgba(244,63,94,0.12)', dur: 10 },
        { x: '65%', y: '10%', size: 450, color: 'rgba(168,85,247,0.10)', dur: 14 },
        { x: '35%', y: '60%', size: 550, color: 'rgba(20,184,166,0.10)', dur: 12 },
        { x: '75%', y: '55%', size: 400, color: 'rgba(245,158,11,0.08)', dur: 16 },
        { x: '5%', y: '75%', size: 350, color: 'rgba(99,102,241,0.10)', dur: 11 },
      ].map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            background: blob.color,
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.2, 0.9, 1.1, 1],
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 15, -10, 0],
          }}
          transition={{
            duration: blob.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer 2 — Semi-transparent cards / windows                       */
/* ------------------------------------------------------------------ */
function WindowCard({
  x, y, w, h, title, delay, children,
}: {
  x: string; y: string; w: number; h: number; title: string; delay: number; children?: React.ReactNode;
}) {
  return (
    <motion.div
      className="absolute bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
      style={{ left: x, top: y, width: w, height: h }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
        </div>
        <span className="text-white/30 text-[10px] font-mono ml-2">{title}</span>
      </div>
      {children}
    </motion.div>
  );
}

function MiddleLayer() {
  return (
    <div className="absolute inset-0">
      {/* Dashboard card - left */}
      <WindowCard x="5%" y="18%" w={220} h={280} title="dashboard.tsx" delay={0.4}>
        <div className="p-3 space-y-3">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-wider">Revenue</p>
              <p className="text-white text-lg font-bold">$48.2K</p>
            </div>
            <div className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-medium">+12.5%</div>
          </div>
          {/* Mini chart */}
          <svg viewBox="0 0 180 60" className="w-full h-auto">
            <defs>
              <linearGradient id="chartGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(16,185,129,0.3)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0 50 L30 40 L60 45 L90 25 L120 30 L150 15 L180 20 L180 60 L0 60 Z"
              fill="url(#chartGrad1)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            />
            <motion.path
              d="M0 50 L30 40 L60 45 L90 25 L120 30 L150 15 L180 20"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            />
          </svg>
          {/* Mini stat rows */}
          {[
            { label: 'Users', val: '2,847', bar: 70, color: 'bg-violet-400' },
            { label: 'Orders', val: '1,293', bar: 45, color: 'bg-rose-400' },
            { label: 'Views', val: '18.4K', bar: 85, color: 'bg-amber-400' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-white/30 text-[10px] w-12">{item.label}</span>
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.bar}%` }}
                  transition={{ duration: 0.6, delay: 1.0 + i * 0.15 }}
                />
              </div>
              <span className="text-white/50 text-[10px] font-mono">{item.val}</span>
            </div>
          ))}
        </div>
      </WindowCard>

      {/* Chat card - right */}
      <WindowCard x="calc(100% - 250px)" y="12%" w={240} h={260} title="messages.tsx" delay={0.6}>
        <div className="p-3 space-y-3">
          {[
            { msg: 'Hey! The new dashboard looks great 🎉', time: '2m ago', align: 'left' },
            { msg: 'Thanks! Deploying to production now', time: '1m ago', align: 'right' },
            { msg: 'Running final tests...', time: 'now', align: 'right' },
          ].map((chat, i) => (
            <motion.div
              key={i}
              className={`flex flex-col ${chat.align === 'right' ? 'items-end' : 'items-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.2 }}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-xl text-xs ${
                  chat.align === 'right'
                    ? 'bg-violet-500/20 text-violet-200 rounded-br-sm'
                    : 'bg-white/5 text-white/60 rounded-bl-sm'
                }`}
              >
                {chat.msg}
              </div>
              <span className="text-white/20 text-[9px] mt-0.5">{chat.time}</span>
            </motion.div>
          ))}
          {/* Typing indicator */}
          <motion.div
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 w-fit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
          >
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="w-1.5 h-1.5 rounded-full bg-white/30"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.15 }}
              />
            ))}
          </motion.div>
        </div>
      </WindowCard>

      {/* Bottom code card */}
      <WindowCard x="25%" y="calc(100% - 180px)" w={300} h={160} title="api.ts" delay={0.8}>
        <div className="p-3 font-mono text-[11px] leading-5 overflow-hidden">
          <div><span className="text-violet-400">async function</span> <span className="text-amber-300">fetchData</span><span className="text-white/40">() {'{'}</span></div>
          <div className="pl-4"><span className="text-violet-400">const</span> <span className="text-white/60">res = </span><span className="text-violet-400">await</span> <span className="text-emerald-400">fetch</span><span className="text-white/40">(</span><span className="text-amber-300">{'\''}/api/data{'\''}'</span><span className="text-white/40">);</span></div>
          <div className="pl-4"><span className="text-violet-400">return</span> <span className="text-white/60">res.</span><span className="text-emerald-400">json</span><span className="text-white/40">();</span></div>
          <div><span className="text-white/40">{'}'}</span></div>
          <div className="mt-1"><span className="text-emerald-400/60">{'// ✓ Type-safe & validated'}</span></div>
          <motion.span
            className="inline-block w-2 h-4 bg-emerald-400/70 align-middle ml-0.5"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </WindowCard>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer 3 — Floating avatar circles                                 */
/* ------------------------------------------------------------------ */
function AvatarLayer() {
  const avatars = [
    { x: '52%', y: '52%', size: 44, color: 'from-rose-400 to-pink-500', delay: 1.0, name: 'JK' },
    { x: '20%', y: '55%', size: 36, color: 'from-violet-400 to-purple-500', delay: 1.1, name: 'AL' },
    { x: '72%', y: '48%', size: 40, color: 'from-emerald-400 to-teal-500', delay: 1.2, name: 'MR' },
    { x: '40%', y: '72%', size: 32, color: 'from-amber-400 to-orange-500', delay: 1.3, name: 'SW' },
    { x: '85%', y: '68%', size: 34, color: 'from-sky-400 to-blue-500', delay: 1.4, name: 'CT' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {avatars.map((avatar, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: avatar.x, top: avatar.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: avatar.delay },
            scale: { duration: 0.5, delay: avatar.delay, type: 'spring' },
            y: { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: avatar.delay },
          }}
        >
          <div
            className={`w-${avatar.size / 4} rounded-full bg-gradient-to-br ${avatar.color} flex items-center justify-center text-white text-[10px] font-bold shadow-lg ring-2 ring-white/10`}
            style={{ width: avatar.size, height: avatar.size }}
          >
            {avatar.name}
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0f0f1a]" />
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer 4 — Mini charts / graphs                                   */
/* ------------------------------------------------------------------ */
function ChartLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Donut chart */}
      <motion.div
        className="absolute"
        style={{ left: '78%', top: '35%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ delay: 1.5 }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <motion.circle
            cx="40" cy="40" r="30" fill="none" stroke="#a855f7" strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="188"
            initial={{ strokeDashoffset: 188 }}
            animate={{ strokeDashoffset: 56 }}
            transition={{ duration: 1.5, delay: 1.8 }}
            transform="rotate(-90 40 40)"
          />
          <motion.circle
            cx="40" cy="40" r="30" fill="none" stroke="#10b981" strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="188"
            initial={{ strokeDashoffset: 188 }}
            animate={{ strokeDashoffset: 120 }}
            transition={{ duration: 1.5, delay: 2.0 }}
            transform="rotate(45 40 40)"
          />
          <text x="40" y="43" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" opacity="0.8">70%</text>
        </svg>
      </motion.div>

      {/* Mini bar chart */}
      <motion.div
        className="absolute"
        style={{ left: '8%', top: '42%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.6 }}
      >
        <svg width="60" height="40" viewBox="0 0 60 40">
          {[
            { x: 5, h: 20, color: '#f472b6' },
            { x: 17, h: 30, color: '#a855f7' },
            { x: 29, h: 15, color: '#10b981' },
            { x: 41, h: 35, color: '#fbbf24' },
          ].map((bar, i) => (
            <motion.rect
              key={i}
              x={bar.x}
              y={40 - bar.h}
              width="8"
              height={bar.h}
              rx="2"
              fill={bar.color}
              initial={{ height: 0, y: 40 }}
              animate={{ height: bar.h, y: 40 - bar.h }}
              transition={{ duration: 0.5, delay: 1.8 + i * 0.1 }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Layer 5 — Front: Main text + CTA                                 */
/* ------------------------------------------------------------------ */
function FrontContentLayer() {
  return (
    <div className="relative z-10 flex items-center justify-center h-full px-6">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-medium text-violet-300 bg-violet-500/10 rounded-full border border-violet-500/20 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Your All-in-One Platform
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          Everything you
          <br />
          need to{' '}
          <span className="bg-gradient-to-r from-rose-400 via-violet-400 to-teal-400 bg-clip-text text-transparent">
            build &amp; ship
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-white/40 max-w-lg mx-auto leading-relaxed mb-10"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          A complete development ecosystem with dashboards, real-time messaging,
          APIs, and analytics — all in one beautifully layered workspace.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            className="px-8 py-3.5 bg-white text-gray-900 rounded-xl font-semibold text-sm shadow-lg shadow-white/10 hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Start for Free
          </motion.button>
          <motion.button
            className="px-8 py-3.5 bg-white/5 text-white/80 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors border border-white/10 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            See How It Works →
          </motion.button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-6 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          {['50K+ Teams', '99.99% Uptime', 'SOC2 Certified', '24/7 Support'].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5 text-white/25 text-xs">
              <span className="w-1 h-1 rounded-full bg-white/20" />
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function FloatingLayersHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax speeds per layer (back = slow, front = fast)
  const backY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const chartY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const frontY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0a1a]"
    >
      {/* Layer 1: Back gradients */}
      <motion.div className="absolute inset-0" style={{ y: backY }}>
        <BackGradientLayer />
      </motion.div>

      {/* Layer 2: Semi-transparent cards */}
      <motion.div className="absolute inset-0 hidden md:block" style={{ y: midY }}>
        <MiddleLayer />
      </motion.div>

      {/* Layer 3: Avatar circles */}
      <motion.div className="absolute inset-0" style={{ y: avatarY }}>
        <AvatarLayer />
      </motion.div>

      {/* Layer 4: Mini charts */}
      <motion.div className="absolute inset-0" style={{ y: chartY }}>
        <ChartLayer />
      </motion.div>

      {/* Layer 5: Front text + CTA */}
      <motion.div className="absolute inset-0" style={{ y: frontY }}>
        <FrontContentLayer />
      </motion.div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none z-[100]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,26,0.6) 100%)',
        }}
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a1a] to-transparent pointer-events-none z-[101]" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[102]"
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
