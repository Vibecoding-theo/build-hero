'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TimelineStep {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const STEPS: TimelineStep[] = [
  {
    id: 1,
    title: 'Discovery',
    date: 'Q1 2024',
    description: 'Research, user interviews, and market analysis to identify core opportunities and pain points.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
        <path d="M11 8v6" />
        <path d="M8 11h6" />
      </svg>
    ),
    color: '#6366f1',
    bgColor: 'rgba(99,102,241,0.1)',
  },
  {
    id: 2,
    title: 'Design',
    date: 'Q2 2024',
    description: 'Wireframes, prototypes, and a complete design system built for scale and consistency.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
      </svg>
    ),
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.1)',
  },
  {
    id: 3,
    title: 'Development',
    date: 'Q3 2024',
    description: 'Full-stack engineering with iterative sprints, automated testing, and CI/CD pipelines.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
    color: '#06b6d4',
    bgColor: 'rgba(6,182,212,0.1)',
  },
  {
    id: 4,
    title: 'Testing',
    date: 'Q4 2024',
    description: 'Comprehensive QA, performance optimization, security audits, and beta user validation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.1)',
  },
  {
    id: 5,
    title: 'Launch',
    date: 'Q1 2025',
    description: 'Production deployment, go-to-market strategy, and continuous monitoring for growth.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.1)',
  },
];

export default function TimelineHero() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  // Auto-fill progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 0.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Auto-reveal steps on mount
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setProgress((prev) => Math.max(prev, ((i + 1) / STEPS.length) * 100));
      }, 800 + i * 600));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const activeData = activeStep !== null ? STEPS[activeStep] : null;

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#09090b]">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 flex flex-col items-center">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-medium tracking-[0.25em] uppercase text-white/30 mb-3">
            Product Roadmap
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            From Vision to{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #6366f1, #06b6d4, #10b981)' }}
            >
              Reality
            </span>
          </h1>
          <p className="text-white/40 mt-4 max-w-lg mx-auto">
            Five milestones that transform an idea into a launched product — tracked, tested, and delivered.
          </p>
        </motion.div>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:flex flex-col items-center w-full">
          {/* Progress bar */}
          <div className="w-full max-w-3xl mb-8">
            <div className="flex items-center justify-between text-xs text-white/25 mb-2 font-mono">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4, #10b981, #f59e0b)',
                }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Timeline steps */}
          <div className="relative w-full max-w-5xl">
            {/* Connection line */}
            <div className="absolute top-[52px] left-0 right-0 h-px bg-white/5" />

            {/* Animated progress line */}
            <motion.div
              className="absolute top-[52px] left-0 h-px"
              style={{
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4, #10b981, #f59e0b)',
                width: `${(Math.min(progress, 100) / 100) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />

            <div className="flex justify-between items-start">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.id}
                  className="flex flex-col items-center flex-1 cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Milestone marker */}
                  <motion.div
                    className="relative z-10 w-[26px] h-[26px] rounded-full flex items-center justify-center mb-5 transition-all duration-300"
                    style={{
                      backgroundColor: step.bgColor,
                      border: `2px solid ${activeStep === i ? step.color : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: activeStep === i ? `0 0 20px ${step.color}40` : 'none',
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: step.color }}
                    />
                    {/* Pulse ring on active */}
                    {activeStep === i && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ border: `1px solid ${step.color}` }}
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className="w-full max-w-[180px] p-4 rounded-xl text-center"
                    style={{
                      background: activeStep === i ? step.bgColor : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${activeStep === i ? `${step.color}30` : 'rgba(255,255,255,0.04)'}`,
                    }}
                    animate={{
                      y: activeStep === i ? -4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-center mb-2" style={{ color: step.color }}>
                      {step.icon}
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-0.5">{step.title}</h3>
                    <p className="text-white/30 text-[11px] font-mono mb-1">{step.date}</p>
                    <AnimatePresence>
                      {activeStep === i && (
                        <motion.p
                          className="text-white/50 text-xs leading-relaxed mt-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden w-full max-w-md">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-white/25 mb-2 font-mono">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4, #10b981, #f59e0b)',
                }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-white/5" />
            <motion.div
              className="absolute left-3 top-0 w-px"
              style={{
                background: 'linear-gradient(to bottom, #6366f1, #8b5cf6, #06b6d4, #10b981, #f59e0b)',
                height: `${(Math.min(progress, 100) / 100) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />

            {STEPS.map((step, i) => (
              <motion.div
                key={step.id}
                className="relative mb-8 last:mb-0 cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
              >
                {/* Milestone marker */}
                <div
                  className="absolute -left-[22px] top-1 w-[14px] h-[14px] rounded-full"
                  style={{
                    backgroundColor: step.bgColor,
                    border: `2px solid ${activeStep === i ? step.color : 'rgba(255,255,255,0.1)'}`,
                  }}
                />

                {/* Card */}
                <motion.div
                  className="ml-4 p-4 rounded-xl"
                  style={{
                    background: activeStep === i ? step.bgColor : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${activeStep === i ? `${step.color}30` : 'rgba(255,255,255,0.04)'}`,
                  }}
                  animate={{ y: activeStep === i ? -2 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span style={{ color: step.color }}>{step.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{step.title}</h3>
                      <p className="text-white/30 text-[11px] font-mono">{step.date}</p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {activeStep === i && (
                      <motion.p
                        className="text-white/50 text-xs leading-relaxed mt-2 ml-9"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.button
            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white
              hover:bg-white/15 active:scale-95 transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.15))',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View Full Roadmap
          </motion.button>
          <p className="text-white/20 text-xs mt-3">Updated weekly &middot; 5 active milestones</p>
        </motion.div>
      </div>
    </section>
  );
}
