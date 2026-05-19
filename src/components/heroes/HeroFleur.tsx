'use client';

import { motion, AnimatePresence } from 'framer-motion';

function FlowerSVG({ color, size, className, style }: { color: string; size: number; className?: string; style?: React.CSSProperties }) {
  const petals = 6;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
      {[...Array(petals)].map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="25"
          rx="14"
          ry="22"
          fill={color}
          opacity="0.7"
          transform={`rotate(${(360 / petals) * i} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="12" fill="#FFE066" opacity="0.9" />
    </svg>
  );
}

function DaisySVG({ size, className, style }: { size: number; className?: string; style?: React.CSSProperties }) {
  const petals = 12;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
      {[...Array(petals)].map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="22"
          rx="7"
          ry="20"
          fill="#FFFFFF"
          opacity="0.85"
          transform={`rotate(${(360 / petals) * i} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="14" fill="#FFD700" />
    </svg>
  );
}

function RoseSVG({ size, className, style }: { size: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
      <path d="M50 10 C30 25, 20 45, 50 50 C80 45, 70 25, 50 10Z" fill="#E8507E" opacity="0.6" />
      <path d="M50 20 C35 30, 25 50, 50 55 C75 50, 65 30, 50 20Z" fill="#D64070" opacity="0.7" />
      <path d="M50 30 C40 38, 30 55, 50 60 C70 55, 60 38, 50 30Z" fill="#C43060" opacity="0.8" />
      <path d="M50 40 C43 46, 35 58, 50 62 C65 58, 57 46, 50 40Z" fill="#B32050" opacity="0.9" />
      <path d="M50 48 C46 52, 40 60, 50 63 C60 60, 54 52, 50 48Z" fill="#A21040" />
    </svg>
  );
}

function LotusSVG({ size, className, style }: { size: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style}>
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d="M50 50 Q60 20, 50 10 Q40 20, 50 50Z"
          fill={['#F8BBD0', '#F48FB1', '#EC407A', '#F48FB1', '#F8BBD0'][i]}
          opacity="0.7"
          transform={`rotate(${i * 72 - 36} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="8" fill="#FFF9C4" />
    </svg>
  );
}

function LeafSVG({ size, className, style }: { size: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 100" className={className} style={style}>
      <path d="M30 5 Q55 35, 30 95 Q5 35, 30 5Z" fill="#7CB342" opacity="0.6" />
      <line x1="30" y1="5" x2="30" y2="95" stroke="#558B2F" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

export default function HeroFleur() {
  const petalColors = ['#F8BBD0', '#FFB6C1', '#FCE4EC', '#F48FB1', '#FFCDD2', '#E8B4D9', '#D1C4E9'];

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(160deg, #FFF5F5 0%, #FFF0F5 25%, #FFF8E1 50%, #F1F8E9 75%, #FFF5F5 100%)' }}>

      {/* Soft watercolor blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full animate-morph-blob opacity-30" style={{ background: 'radial-gradient(circle, #F8BBD0, transparent 70%)', animationDuration: '12s' }} />
        <div className="absolute bottom-[-20%] right-[-15%] w-[600px] h-[600px] rounded-full animate-morph-blob opacity-25" style={{ background: 'radial-gradient(circle, #C8E6C9, transparent 70%)', animationDelay: '-4s', animationDuration: '15s' }} />
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full animate-morph-blob opacity-20" style={{ background: 'radial-gradient(circle, #FFE0B2, transparent 70%)', animationDelay: '-8s', animationDuration: '10s' }} />
        <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] rounded-full animate-morph-blob opacity-20" style={{ background: 'radial-gradient(circle, #D1C4E9, transparent 70%)', animationDelay: '-2s', animationDuration: '14s' }} />
      </div>

      {/* Vine decoration - left side */}
      <svg className="absolute left-0 top-0 w-32 h-full opacity-20" viewBox="0 0 120 800" fill="none" style={{ zIndex: 1 }}>
        <path
          d="M60 0 Q30 100, 80 200 Q40 300, 70 400 Q30 500, 80 600 Q40 700, 60 800"
          stroke="#7CB342"
          strokeWidth="3"
          fill="none"
          strokeDasharray="300"
          className="animate-vine-grow"
        />
        <path d="M70 150 Q90 140, 95 120 Q85 130, 70 150Z" fill="#7CB342" opacity="0.5" />
        <path d="M65 350 Q45 340, 40 320 Q50 330, 65 350Z" fill="#7CB342" opacity="0.5" />
        <path d="M75 550 Q95 540, 100 520 Q90 530, 75 550Z" fill="#7CB342" opacity="0.5" />
        <circle cx="80" cy="200" r="4" fill="#E8507E" opacity="0.4" />
        <circle cx="50" cy="450" r="3" fill="#FFD700" opacity="0.4" />
        <circle cx="85" cy="650" r="3.5" fill="#CE93D8" opacity="0.4" />
      </svg>

      {/* Vine decoration - right side */}
      <svg className="absolute right-0 top-0 w-32 h-full opacity-20" viewBox="0 0 120 800" fill="none" style={{ zIndex: 1 }}>
        <path
          d="M60 0 Q90 100, 40 200 Q80 300, 50 400 Q90 500, 40 600 Q80 700, 60 800"
          stroke="#7CB342"
          strokeWidth="3"
          fill="none"
          strokeDasharray="300"
          className="animate-vine-grow"
        />
        <path d="M55 250 Q35 240, 30 220 Q40 230, 55 250Z" fill="#7CB342" opacity="0.5" />
        <path d="M45 480 Q65 470, 70 450 Q60 460, 45 480Z" fill="#7CB342" opacity="0.5" />
      </svg>

      {/* Floating petals */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-petal-fall"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 12 + 8}px`,
              height: `${Math.random() * 12 + 8}px`,
              background: petalColors[i % petalColors.length],
              borderRadius: '50% 0 50% 50%',
              opacity: 0.5 + Math.random() * 0.3,
              animationDuration: `${8 + Math.random() * 12}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative flowers - scattered */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <FlowerSVG color="#E8507E" size={70} className="absolute animate-sway" style={{ top: '8%', left: '12%', animationDelay: '0s', opacity: 0.5 }} />
        <DaisySVG size={55} className="absolute animate-sway" style={{ top: '15%', right: '18%', animationDelay: '1s', opacity: 0.5 }} />
        <RoseSVG size={60} className="absolute animate-sway" style={{ bottom: '20%', left: '8%', animationDelay: '2s', opacity: 0.5 }} />
        <LotusSVG size={50} className="absolute animate-sway" style={{ bottom: '12%', right: '10%', animationDelay: '0.5s', opacity: 0.5 }} />
        <FlowerSVG color="#CE93D8" size={45} className="absolute animate-sway" style={{ top: '55%', left: '5%', animationDelay: '1.5s', opacity: 0.4 }} />
        <FlowerSVG color="#FFB74D" size={40} className="absolute animate-sway" style={{ top: '35%', right: '6%', animationDelay: '3s', opacity: 0.4 }} />
        <LeafSVG size={35} className="absolute animate-sway" style={{ top: '70%', right: '15%', animationDelay: '2.5s', opacity: 0.35 }} />
        <LeafSVG size={30} className="absolute animate-sway" style={{ top: '25%', left: '25%', animationDelay: '0.8s', opacity: 0.3, transform: 'scaleX(-1)' }} />
      </div>

      {/* Main content */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-5xl w-full mx-6"
        >
          <div className="flex flex-col items-center text-center">

            {/* Flower crown badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative mb-10 inline-flex items-center gap-3 px-7 py-2.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(232,80,126,0.2)',
                boxShadow: '0 4px 30px rgba(232,80,126,0.1)',
              }}
            >
              <span className="text-lg">🌸</span>
              <span className="text-sm font-medium" style={{ color: '#C43060' }}>Jardin Digital — Botanica Collection</span>
              <span className="text-lg">🌿</span>
            </motion.div>

            {/* Main title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.08] mb-4"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                <span className="block" style={{ color: '#4A2040' }}>Fleurir</span>
                <span className="block mt-1" style={{ background: 'linear-gradient(135deg, #E8507E, #CE93D8, #FFB74D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  le Digital
                </span>
              </h1>
            </motion.div>

            {/* Decorative flower divider */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
              className="flex items-center gap-3 my-6"
            >
              <div className="w-16 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #E8507E)' }} />
              <FlowerSVG color="#E8507E" size={24} />
              <div className="w-16 h-[1px]" style={{ background: 'linear-gradient(90deg, #E8507E, transparent)' }} />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
              style={{ color: '#7B5A6E' }}
            >
              Comme un jardin en pleine éclosion, chaque interface est une fleur qui s&apos;épanouit.
              Du pétale au pixel, la beauté naturelle rencontre l&apos;élégance numérique.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <button
                className="relative px-10 py-4 rounded-full font-semibold text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #E8507E, #CE93D8)',
                  boxShadow: '0 8px 32px rgba(232,80,126,0.3)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Commencer</span>
                  <span className="text-lg">🌷</span>
                </span>
              </button>
              <button
                className="px-10 py-4 rounded-full font-semibold transition-all duration-500 hover:scale-105 cursor-pointer"
                style={{
                  color: '#C43060',
                  border: '2px solid rgba(232,80,126,0.3)',
                  background: 'rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Découvrir la collection
              </button>
            </motion.div>

            {/* Flower feature cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full max-w-3xl"
            >
              {[
                { icon: '🌹', title: 'Rose', desc: 'Élégance intemporelle', color: '#E8507E' },
                { icon: '🌻', title: 'Tournesol', desc: 'Radiance solaire', color: '#FFB74D' },
                { icon: '🪷', title: 'Lotus', desc: 'Pureté digitale', color: '#CE93D8' },
                { icon: '🌼', title: 'Marguerite', desc: 'Simplicité douce', color: '#7CB342' },
              ].map((flower, index) => (
                <motion.div
                  key={flower.title}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="p-5 rounded-2xl transition-all duration-300 cursor-pointer group"
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${flower.color}25`,
                    boxShadow: `0 4px 20px ${flower.color}10`,
                  }}
                >
                  <div className="text-2xl mb-3 transition-transform duration-300 group-hover:scale-125">{flower.icon}</div>
                  <div className="font-semibold text-sm mb-1" style={{ color: '#4A2040' }}>{flower.title}</div>
                  <div className="text-xs" style={{ color: '#9B7A8E' }}>{flower.desc}</div>
                  <div
                    className="w-full h-[2px] mt-3 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ background: flower.color, width: '30%', opacity: 0.5 }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom testimonials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-14"
            >
              {[
                { value: '250+', label: 'Variétés florales' },
                { value: '12k', label: 'Jardins créés' },
                { value: '98%', label: 'Pollinisation positive' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl md:text-2xl font-bold" style={{ color: '#E8507E' }}>{stat.value}</div>
                  <div className="text-xs mt-1" style={{ color: '#9B7A8E' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(255,245,245,0.8), transparent)', zIndex: 3 }} />
    </div>
  );
}
