'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';

/* ─── Sparkline SVG ─── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 120;
  const h = 40;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${h} ${points} ${w},${h}`}
        fill={`url(#grad-${color.replace('#', '')})`}
      />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Mini Bar Chart SVG ─── */
function BarChart() {
  const bars = [65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95, 70];
  return (
    <svg width="100%" height="60" viewBox="0 0 120 60" preserveAspectRatio="none">
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={i * 10 + 1}
          y={60 - (h / 100) * 60}
          width="8"
          height={(h / 100) * 60}
          rx="2"
          fill="#3b82f6"
          opacity={0.5 + (h / 100) * 0.5}
          initial={{ height: 0, y: 60 }}
          animate={{ height: (h / 100) * 60, y: 60 - (h / 100) * 60 }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
}

/* ─── Donut Chart SVG ─── */
function DonutChart({ percentage }: { percentage: number }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
      <motion.circle
        cx="36"
        cy="36"
        r={radius}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        transform="rotate(-90 36 36)"
      />
      <text x="36" y="40" textAnchor="middle" className="fill-slate-700 text-sm font-bold">
        {percentage}%
      </text>
    </svg>
  );
}

/* ─── Bento Card with Magnetic Effect ─── */
function BentoCard({
  children,
  className = '',
  delay = 0,
  span = 'col-span-1',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  span?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTransform({ x: x * 0.08, y: y * 0.08 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm hover:shadow-lg transition-shadow duration-300 ${span} ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ─── Progress Bar ─── */
function ProgressBar({ value, color = 'bg-blue-500' }: { value: number; color?: string }) {
  return (
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
      />
    </div>
  );
}

/* ─── Main Component ─── */
export default function BentoDashboardHero() {
  const revenue = 48250;
  const users = 12847;
  const conversion = 3.2;

  const sparkData1 = [30, 45, 35, 60, 50, 75, 65, 85, 70, 95, 80, 100];
  const sparkData2 = [80, 70, 85, 60, 90, 75, 65, 80, 70, 90, 85, 95];

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            Live Dashboard
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
            Build faster.
            <span className="text-blue-500"> Ship smarter.</span>
          </h1>
          <p className="text-slate-500 mt-4 text-lg max-w-xl mx-auto">
            The all-in-one analytics platform that helps your team make data-driven decisions.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Revenue Card - spans 2 cols */}
          <BentoCard delay={0.1} span="sm:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Revenue</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">
                  $<AnimatedCounter target={revenue} />
                </p>
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-sm font-medium bg-emerald-50 px-2.5 py-1 rounded-full">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2L10 7H2L6 2Z" fill="currentColor"/></svg>
                +12.5%
              </div>
            </div>
            <Sparkline data={sparkData1} color="#3b82f6" />
          </BentoCard>

          {/* Users Card */}
          <BentoCard delay={0.2}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Users</p>
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="#7c3aed" strokeWidth="1.5"/><path d="M2 15c0-3 2.7-5 6-5s6 2 6 5" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900"><AnimatedCounter target={users} /></p>
            <div className="mt-3">
              <Sparkline data={sparkData2} color="#7c3aed" />
            </div>
          </BentoCard>

          {/* Conversion Card */}
          <BentoCard delay={0.3}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Conversion</p>
            </div>
            <div className="flex items-center gap-4">
              <DonutChart percentage={Math.round(conversion * 20)} />
              <div>
                <p className="text-2xl font-bold text-slate-900">{conversion.toFixed(1)}%</p>
                <p className="text-xs text-slate-400 mt-1">This month</p>
              </div>
            </div>
          </BentoCard>

          {/* Bar Chart Card - spans 2 cols */}
          <BentoCard delay={0.4} span="sm:col-span-2">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Monthly Growth</p>
            <BarChart />
            <div className="flex justify-between mt-2 text-[10px] text-slate-400">
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </BentoCard>

          {/* Goals Card */}
          <BentoCard delay={0.5}>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">Goals</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-600 font-medium">Revenue</span>
                  <span className="text-slate-400">78%</span>
                </div>
                <ProgressBar value={78} color="bg-blue-500" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-600 font-medium">Users</span>
                  <span className="text-slate-400">92%</span>
                </div>
                <ProgressBar value={92} color="bg-emerald-500" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-600 font-medium">Retention</span>
                  <span className="text-slate-400">65%</span>
                </div>
                <ProgressBar value={65} color="bg-amber-500" />
              </div>
            </div>
          </BentoCard>

          {/* Uptime Card */}
          <BentoCard delay={0.6}>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Uptime</p>
            <p className="text-3xl font-bold text-emerald-500">99.98%</p>
            <p className="text-xs text-slate-400 mt-2">Last 30 days</p>
            <div className="flex gap-0.5 mt-3">
              {Array.from({ length: 28 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 h-6 rounded-sm bg-emerald-400"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.7 + i * 0.02, duration: 0.3 }}
                  style={{ transformOrigin: 'bottom' }}
                />
              ))}
            </div>
          </BentoCard>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Get Started Free →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
