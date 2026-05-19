'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

// Editorial color palette
const COLORS = {
  cream: '#FAF5EE',
  terracotta: '#C2654A',
  warmBrown: '#8B6F5C',
  deepBrown: '#3D2C22',
  offWhite: '#F5EDE4',
  rose: '#D4957A',
  olive: '#7A7A5E',
};

// Magazine issue badge
function IssueBadge() {
  return (
    <motion.div
      className="inline-flex flex-col items-center border border-terracotta/30 px-4 py-2"
      style={{ borderColor: `${COLORS.terracotta}50` }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <span
        className="text-[10px] uppercase tracking-[0.35em] font-medium"
        style={{ color: COLORS.terracotta }}
      >
        Issue No.
      </span>
      <span
        className="text-2xl font-bold leading-none tabular-nums"
        style={{ color: COLORS.deepBrown }}
      >
        047
      </span>
    </motion.div>
  );
}

// Cut-out photo effect rectangle
function CutOutBlock({
  width,
  height,
  color,
  clipPath,
  className = '',
  delay = 0,
  maxWidth,
}: {
  width: string;
  height: string;
  color: string;
  clipPath: string;
  className?: string;
  delay?: number;
  maxWidth?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ width, height, backgroundColor: color, clipPath }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Inner decorative lines */}
      <div
        className="absolute inset-4 border opacity-20"
        style={{ borderColor: 'white', border: '1px solid rgba(255,255,255,0.15)' }}
      />
    </motion.div>
  );
}

// Large decorative number
function DecorativeNumber({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block font-serif italic leading-none select-none"
      style={{
        fontSize: 'clamp(8rem, 20vw, 16rem)',
        color: `${COLORS.terracotta}12`,
      }}
    >
      {children}
    </span>
  );
}

// Hover-reveal editorial text
function EditorialHoverText({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.span
        className="block origin-left"
        animate={{
          color: hovered ? COLORS.terracotta : COLORS.deepBrown,
          letterSpacing: hovered ? '0.05em' : '0',
        }}
        transition={{ duration: 0.4 }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}

// Issue date line
function DateLine() {
  return (
    <div className="flex items-center gap-4">
      <div className="w-8 h-px" style={{ backgroundColor: `${COLORS.warmBrown}40` }} />
      <span
        className="text-[10px] uppercase tracking-[0.3em] font-medium"
        style={{ color: COLORS.warmBrown }}
      >
        Spring / Summer 2025
      </span>
      <div className="w-8 h-px" style={{ backgroundColor: `${COLORS.warmBrown}40` }} />
    </div>
  );
}

// Editorial image placeholder with clip-path shapes
function EditorialShape({
  shape,
  color,
  size = 'md',
  className = '',
  delay = 0,
}: {
  shape: 'circle' | 'diamond' | 'arch' | 'rectangle';
  color: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  delay?: number;
}) {
  const sizeMap = { sm: 80, md: 140, lg: 200 };
  const s = sizeMap[size];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  const clipPaths: Record<string, string> = {
    circle: 'circle(50% at 50% 50%)',
    diamond: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    arch: 'ellipse(50% 60% at 50% 55%)',
    rectangle: 'inset(0 round 8px)',
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        width: s,
        height: s * 1.2,
        backgroundColor: color,
        clipPath: clipPaths[shape],
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Texture lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-white"
            style={{ top: `${12 + i * 12}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Tag pill
function TagPill({ text, delay = 0 }: { text: string; delay?: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] cursor-default transition-all duration-300"
      style={{
        border: `1px solid ${hovered ? COLORS.terracotta : `${COLORS.warmBrown}30`}`,
        color: hovered ? COLORS.terracotta : COLORS.warmBrown,
        backgroundColor: hovered ? `${COLORS.terracotta}08` : 'transparent',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {text}
    </motion.span>
  );
}

export default function MagazineEditorialHero() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: COLORS.cream }}
    >
      {/* Subtle paper texture background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${COLORS.terracotta}08 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, ${COLORS.olive}08 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-20 lg:py-24">
        {/* Top bar: Issue + Date + Navigation */}
        <motion.div
          className="flex items-start justify-between mb-16 md:mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <IssueBadge />
          <div className="flex flex-col items-end gap-2">
            <DateLine />
            <span
              className="text-[10px] uppercase tracking-[0.25em]"
              style={{ color: `${COLORS.warmBrown}60` }}
            >
              Volume XII
            </span>
          </div>
        </motion.div>

        {/* Main editorial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">
          {/* Left column: Shapes */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <EditorialShape shape="arch" color={COLORS.terracotta} size="lg" className="-ml-2" />
              <EditorialShape
                shape="circle"
                color={COLORS.rose}
                size="sm"
                className="absolute -bottom-4 -right-4 z-10"
                delay={0.3}
              />
            </motion.div>

            {/* Feature tags */}
            <motion.div
              className="flex flex-wrap gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <TagPill text="Design" delay={0.8} />
              <TagPill text="Culture" delay={0.9} />
              <TagPill text="Art" delay={1.0} />
            </motion.div>

            {/* Bottom shape */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1 }}
            >
              <EditorialShape shape="diamond" color={COLORS.olive} size="sm" className="mt-6" />
            </motion.div>
          </div>

          {/* Center column: Main headline */}
          <div className="lg:col-span-5 flex flex-col justify-center -mt-8 lg:-mt-16">
            {/* Large decorative number behind */}
            <div className="relative">
              <DecorativeNumber>47</DecorativeNumber>

              {/* Overlapping headline text */}
              <div className="absolute inset-0 flex flex-col justify-center">
                <motion.h1
                  className="font-serif italic leading-[0.95]"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                    color: COLORS.deepBrown,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <EditorialHoverText text="The Art" className="block" delay={0.4} />
                  <EditorialHoverText text="of Quiet" className="block" delay={0.5} />
                  <EditorialHoverText
                    text="Elegance"
                    className="block"
                    delay={0.6}
                  />
                </motion.h1>
              </div>
            </div>

            {/* Subtitle */}
            <motion.p
              className="mt-8 text-sm md:text-base leading-relaxed max-w-sm"
              style={{ color: `${COLORS.warmBrown}CC` }}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              An exploration of understated beauty in modern design—where restraint becomes the
              most powerful form of expression.
            </motion.p>

            {/* Author & read more */}
            <motion.div
              className="flex items-center gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${COLORS.terracotta}20` }}>
                <span className="text-xs font-serif italic" style={{ color: COLORS.terracotta }}>A</span>
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: COLORS.deepBrown }}>
                  Amara Fontaine
                </p>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: `${COLORS.warmBrown}80` }}>
                  Editor at Large
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column: Cut-out blocks */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end gap-4 justify-center">
            <CutOutBlock
              width="100%"
              maxWidth="220px"
              height="180px"
              color={COLORS.warmBrown}
              clipPath="polygon(0 0, 100% 0, 100% 75%, 85% 100%, 0 100%)"
              delay={0.5}
            />
            <CutOutBlock
              width="80%"
              maxWidth="180px"
              height="120px"
              color={COLORS.offWhite}
              clipPath="polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 20%)"
              delay={0.7}
              className="ml-auto"
            />
            <CutOutBlock
              width="60%"
              maxWidth="140px"
              height="100px"
              color={COLORS.terracotta}
              clipPath="polygon(10% 0, 100% 0, 90% 100%, 0 100%)"
              delay={0.9}
              className="mr-auto lg:ml-auto"
            />
          </div>
        </div>

        {/* Bottom editorial bar */}
        <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          {/* Section labels */}
          <motion.div
            className="flex flex-wrap gap-8"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {['Portfolio', 'Interview', 'Essay', 'Gallery'].map((section, i) => (
              <span
                key={section}
                className="text-xs uppercase tracking-[0.2em] cursor-default transition-colors duration-300 hover:text-terracotta"
                style={{ color: `${COLORS.warmBrown}60` }}
              >
                {String(i + 1).padStart(2, '0')} / {section}
              </span>
            ))}
          </motion.div>

          {/* CTA button */}
          <motion.button
            className="group flex items-center gap-4 self-start md:self-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <span
              className="text-xs uppercase tracking-[0.25em] font-medium pb-1 border-b border-current transition-all duration-300 group-hover:gap-6"
              style={{ color: COLORS.deepBrown }}
            >
              Read the full story
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={COLORS.deepBrown}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="mt-12 h-px"
          style={{ backgroundColor: `${COLORS.warmBrown}15` }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Footer line */}
        <motion.div
          className="mt-6 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ color: `${COLORS.warmBrown}40` }}
          >
            © 2025 Éditorial
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ color: `${COLORS.warmBrown}40` }}
          >
            Printed on recycled paper
          </span>
        </motion.div>
      </div>

      {/* Subtle corner decorative marks */}
      <div className="absolute top-4 left-4 w-3 h-3 border-t border-l" style={{ borderColor: `${COLORS.terracotta}20` }} />
      <div className="absolute top-4 right-4 w-3 h-3 border-t border-r" style={{ borderColor: `${COLORS.terracotta}20` }} />
      <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l" style={{ borderColor: `${COLORS.terracotta}20` }} />
      <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r" style={{ borderColor: `${COLORS.terracotta}20` }} />
    </section>
  );
}
