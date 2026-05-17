'use client';

import { useState, useCallback, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroGlassmorphism from '@/components/heroes/HeroGlassmorphism';
import HeroBrutalism from '@/components/heroes/HeroBrutalism';
import HeroCyberpunk from '@/components/heroes/HeroCyberpunk';
import HeroJapandi from '@/components/heroes/HeroJapandi';
import HeroOrganic from '@/components/heroes/HeroOrganic';
import HeroDarkLuxury from '@/components/heroes/HeroDarkLuxury';
import HeroRetroVintage from '@/components/heroes/HeroRetroVintage';
import HeroGeometric from '@/components/heroes/HeroGeometric';
import HeroAurora from '@/components/heroes/HeroAurora';
import HeroGenerator from '@/components/HeroGenerator';
import DynamicPreview from '@/components/DynamicPreview';

interface HeroConfig {
  id: string;
  name: string;
  subtitle: string;
  component: React.ReactNode;
  borderStyle: 'rounded' | 'square' | 'pill' | 'mixed';
  colorAccent: string;
  emoji: string;
  borderLabel: string;
  isCustom?: boolean;
  code?: string;
  fonts?: string[];
}

const heroes: HeroConfig[] = [
  { id: 'glassmorphism', name: 'Glassmorphism', subtitle: 'Flou & Transparence', component: <HeroGlassmorphism />, borderStyle: 'rounded', colorAccent: '#764ba2', emoji: '🪟', borderLabel: 'Arrondi' },
  { id: 'brutalism', name: 'Brutalism', subtitle: 'Brut & Carré', component: <HeroBrutalism />, borderStyle: 'square', colorAccent: '#FF00FF', emoji: '📐', borderLabel: 'Carré' },
  { id: 'cyberpunk', name: 'Neon Cyberpunk', subtitle: 'Néon & Futuriste', component: <HeroCyberpunk />, borderStyle: 'square', colorAccent: '#bc13fe', emoji: '🌆', borderLabel: 'Carré' },
  { id: 'japandi', name: 'Japandi', subtitle: 'Minimal & Organique', component: <HeroJapandi />, borderStyle: 'mixed', colorAccent: '#C4B5A5', emoji: '🍃', borderLabel: 'Mixte' },
  { id: 'organic', name: 'Organiques', subtitle: 'Fluides & Vivants', component: <HeroOrganic />, borderStyle: 'pill', colorAccent: '#e94560', emoji: '🎨', borderLabel: 'Pill' },
  { id: 'darkluxury', name: 'Dark Luxury', subtitle: 'Noir & Or', component: <HeroDarkLuxury />, borderStyle: 'mixed', colorAccent: '#d4af37', emoji: '🖤', borderLabel: 'Mixte' },
  { id: 'retro', name: 'Retro Vintage', subtitle: 'Chaleureux & Nostalgique', component: <HeroRetroVintage />, borderStyle: 'square', colorAccent: '#8B6914', emoji: '📻', borderLabel: 'Carré' },
  { id: 'geometric', name: 'Géométrique', subtitle: 'Précis & Structuré', component: <HeroGeometric />, borderStyle: 'square', colorAccent: '#E63946', emoji: '🔷', borderLabel: 'Carré' },
  { id: 'aurora', name: 'Aurora Boréale', subtitle: 'Cosmique & Éthéré', component: <HeroAurora />, borderStyle: 'pill', colorAccent: '#10B981', emoji: '🌌', borderLabel: 'Pill' },
];

const FILENAMES: Record<string, string> = {
  glassmorphism: 'HeroGlassmorphism.tsx',
  brutalism: 'HeroBrutalism.tsx',
  cyberpunk: 'HeroCyberpunk.tsx',
  japandi: 'HeroJapandi.tsx',
  organic: 'HeroOrganic.tsx',
  darkluxury: 'HeroDarkLuxury.tsx',
  retro: 'HeroRetroVintage.tsx',
  geometric: 'HeroGeometric.tsx',
  aurora: 'HeroAurora.tsx',
};

function CopyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  );
}

function GalleryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function SidebarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function useHeroCode(heroId: string) {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCode = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/hero-code?id=${heroId}`);
      const data = await res.json();
      if (data.code) setCode(data.code);
    } catch {
      setCode(null);
    } finally {
      setLoading(false);
    }
  }, [heroId]);

  useEffect(() => {
    setCode(null);
    fetchCode();
  }, [fetchCode]);

  return { code, loading, refetch: fetchCode };
}

type AppView = 'gallery' | 'create';

export default function Home() {
  const [view, setView] = useState<AppView>('gallery');
  const [activeHero, setActiveHero] = useState(heroes[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copying, setCopying] = useState(false);
  const [customHeroes, setCustomHeroes] = useState<HeroConfig[]>([]);

  // Merge built-in heroes with custom heroes
  const allHeroes = [...heroes, ...customHeroes];
  const hero = allHeroes.find((h) => h.id === activeHero) ?? allHeroes[0];
  const isCustom = hero.isCustom;

  // For built-in heroes, fetch code from API. For custom, code is already in the object.
  const { code: fetchedCode, loading: codeLoading } = useHeroCode(isCustom ? '' : activeHero);
  const code = isCustom ? (hero.code || null) : fetchedCode;

  const handleAddToGallery = useCallback((generatedHero: {
    id: string;
    name: string;
    code: string;
    componentName: string;
    styles: string[];
    fonts: string[];
    timestamp: number;
  }) => {
    const styleNames = generatedHero.styles.length > 0
      ? generatedHero.styles.join(' + ')
      : 'Personnalisé';

    const newHero: HeroConfig = {
      id: generatedHero.id,
      name: generatedHero.name,
      subtitle: styleNames,
      component: null,
      borderStyle: 'mixed',
      colorAccent: '#667eea',
      emoji: '✨',
      borderLabel: 'Custom',
      isCustom: true,
      code: generatedHero.code,
      fonts: generatedHero.fonts,
    };

    setCustomHeroes((prev) => [...prev, newHero]);
  }, []);

  const handleDeleteCustom = useCallback((heroId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomHeroes((prev) => prev.filter((h) => h.id !== heroId));
    if (activeHero === heroId) {
      setActiveHero(heroes[0].id);
      setShowCode(false);
    }
  }, [activeHero]);

  const handleCopy = useCallback(async () => {
    if (!code) return;
    setCopying(true);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } finally {
      setCopying(false);
    }
  }, [code]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && showCode) setShowCode(false);
  }, [showCode]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const selectHero = useCallback((id: string) => {
    setActiveHero(id);
    setShowCode(false);
    setCopied(false);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  }, []);

  const currentIndex = allHeroes.findIndex((h) => h.id === activeHero);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) selectHero(allHeroes[currentIndex - 1].id);
  }, [currentIndex, allHeroes, selectHero]);

  const goNext = useCallback(() => {
    if (currentIndex < allHeroes.length - 1) selectHero(allHeroes[currentIndex + 1].id);
  }, [currentIndex, allHeroes, selectHero]);

  return (
    <div className="h-screen flex flex-col bg-[#0F0F11] overflow-hidden">
      {/* Top Bar */}
      <header className="flex-shrink-0 h-14 border-b border-white/[0.06] flex items-center justify-between px-4 backdrop-blur-xl z-30" style={{ background: 'rgba(15,15,17,0.9)' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors lg:hidden" aria-label="Toggle sidebar">
            <SidebarIcon />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
              H
            </div>
            <span className="text-base font-semibold text-white hidden sm:block">Hero <span className="font-light text-white/30">Studio</span></span>
          </div>

          {/* View mode tabs */}
          <div className="hidden md:flex items-center gap-1 ml-4 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <button
              onClick={() => setView('gallery')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                view === 'gallery' ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <GalleryIcon />
              Galerie
              {customHeroes.length > 0 && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(102, 126, 234, 0.2)', color: '#a78bfa' }}>
                  {customHeroes.length}
                </span>
              )}
            </button>
            <button
              onClick={() => { setView('create'); setShowCode(false); setCopied(false); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                view === 'create' ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
              style={view === 'create' ? { background: 'linear-gradient(135deg, rgba(118, 75, 162, 0.2), rgba(102, 126, 234, 0.2))', border: '1px solid rgba(118, 75, 162, 0.2)' } : { border: '1px solid transparent' }}
            >
              <SparklesIcon />
              Créer
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Gallery controls */}
          {view === 'gallery' && (
            <>
              {/* Nav arrows */}
              <button onClick={goPrev} disabled={currentIndex === 0} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-20 disabled:cursor-not-allowed" aria-label="Previous hero">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <span className="text-xs text-white/30 min-w-[40px] text-center font-mono">{currentIndex + 1}/{allHeroes.length}</span>
              <button onClick={goNext} disabled={currentIndex === allHeroes.length - 1} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-20 disabled:cursor-not-allowed" aria-label="Next hero">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>

              <div className="w-px h-6 bg-white/[0.06] mx-1" />

              {/* Toggle preview/code */}
              <button onClick={() => setShowCode(!showCode)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${showCode ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/[0.06]'}`}>
                {showCode ? <EyeIcon /> : <CodeIcon />}
                <span className="hidden sm:inline">{showCode ? 'Preview' : 'Code'}</span>
              </button>

              {/* Copy button */}
              {showCode && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleCopy}
                  disabled={!code || copying}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 disabled:opacity-40"
                  style={{
                    background: copied ? '#10B981' : 'rgba(255,255,255,0.08)',
                    color: copied ? 'white' : '#ccc',
                    border: copied ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {copied ? <><CheckIcon /> Copié !</> : <><CopyIcon /> Copier</>}
                </motion.button>
              )}
            </>
          )}

          {/* Mobile create button */}
          <button
            onClick={() => { setView(view === 'create' ? 'gallery' : 'create'); setShowCode(false); setCopied(false); }}
            className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
            style={view === 'create' ? { background: 'rgba(118, 75, 162, 0.2)', color: 'white', border: '1px solid rgba(118, 75, 162, 0.2)' } : { color: 'rgba(255,255,255,0.5)' }}
          >
            <SparklesIcon />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar overlay on mobile */}
        <AnimatePresence>
          {sidebarOpen && view === 'gallery' && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 z-30 lg:hidden"
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed left-0 top-14 bottom-0 w-72 bg-[#141418] border-r border-white/[0.06] z-40 lg:hidden overflow-y-auto"
              >
                <SidebarContent heroes={heroes} customHeroes={customHeroes} activeId={activeHero} onSelect={selectHero} onDelete={handleDeleteCustom} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Desktop sidebar */}
        {view === 'gallery' && (
          <aside className="hidden lg:flex flex-shrink-0 w-64 bg-[#141418] border-r border-white/[0.06] flex-col overflow-y-auto">
            <SidebarContent heroes={heroes} customHeroes={customHeroes} activeId={activeHero} onSelect={selectHero} onDelete={handleDeleteCustom} />
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <AnimatePresence mode="wait">
            {view === 'create' ? (
              <motion.div
                key="create"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-hidden"
              >
                <HeroGenerator onAddToGallery={handleAddToGallery} />
              </motion.div>
            ) : (
              <motion.div
                key={activeHero}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col overflow-hidden"
              >
                {/* Preview */}
                <div className={`flex-1 overflow-hidden relative transition-all duration-300 ${showCode ? 'h-[45%]' : 'h-full'}`}>
                  {isCustom ? (
                    <DynamicPreview code={hero.code || ''} fonts={hero.fonts} />
                  ) : (
                    <Suspense fallback={<PreviewSkeleton />}>
                      {hero.component}
                    </Suspense>
                  )}

                  {/* Hero info overlay - top right */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded-lg backdrop-blur-xl text-xs font-medium flex items-center gap-2" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
                      <span>{hero.emoji}</span>
                      <span>{hero.name}</span>
                      <span className="text-white/30">|</span>
                      <span className="text-white/40">{hero.borderLabel}</span>
                    </div>
                  </div>

                  {/* Copy floating button when in preview mode */}
                  {!showCode && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      onClick={async () => {
                        if (!code) {
                          if (isCustom && hero.code) {
                            try { await navigator.clipboard.writeText(hero.code); } catch { /* noop */ }
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2500);
                          } else {
                            const res = await fetch(`/api/hero-code?id=${activeHero}`);
                            const data = await res.json();
                            if (data.code) {
                              try { await navigator.clipboard.writeText(data.code); } catch { /* noop */ }
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2500);
                            }
                          }
                        } else {
                          handleCopy();
                        }
                      }}
                      className="absolute bottom-6 right-6 z-20 flex items-center gap-2.5 px-5 py-3 rounded-2xl backdrop-blur-xl text-sm font-semibold transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg"
                      style={{
                        background: copied ? 'rgba(16, 185, 129, 0.9)' : 'rgba(0,0,0,0.6)',
                        border: copied ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.15)',
                        color: 'white',
                      }}
                    >
                      {copied ? <><CheckIcon /> Code copié !</> : <><CopyIcon /> Copier le code</>}
                    </motion.button>
                  )}
                </div>

                {/* Code panel */}
                <AnimatePresence>
                  {showCode && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: '55%', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      className="flex-shrink-0 border-t border-white/[0.06] flex flex-col overflow-hidden"
                      style={{ background: '#0D0D10' }}
                    >
                      {/* Code header */}
                      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04] flex-shrink-0">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-white/40">{isCustom ? `${hero.name}.tsx` : (FILENAMES[activeHero] || 'hero.tsx')}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/[0.08] text-white/30">{hero.borderLabel}</span>
                          {isCustom && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(102, 126, 234, 0.15)', color: '#a78bfa', border: '1px solid rgba(102, 126, 234, 0.2)' }}>
                              Généré par IA
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={handleCopy} disabled={!code || copying} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 disabled:opacity-30 hover:bg-white/[0.06] text-white/60 hover:text-white" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                            {copied ? <><CheckIcon size={14} /> Copié !</> : <><CopyIcon size={14} /> Copier tout</>}
                          </button>
                        </div>
                      </div>

                      {/* Code content */}
                      <div className="flex-1 overflow-auto p-5 font-mono text-[13px] leading-[1.7]">
                        {isCustom ? (
                          code ? (
                            <pre className="text-white/70 whitespace-pre-wrap break-words">
                              <code>{code}</code>
                            </pre>
                          ) : (
                            <p className="text-white/30 text-sm">Aucun code disponible.</p>
                          )
                        ) : codeLoading ? (
                          <div className="space-y-3">
                            {[...Array(15)].map((_, i) => (
                              <div key={i} className="h-4 rounded" style={{ background: 'rgba(255,255,255,0.03)', width: `${60 + Math.random() * 40}%` }} />
                            ))}
                          </div>
                        ) : code ? (
                          <pre className="text-white/70 whitespace-pre-wrap break-words">
                            <code>{code}</code>
                          </pre>
                        ) : (
                          <p className="text-white/30 text-sm">Impossible de charger le code.</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ heroes, customHeroes, activeId, onSelect, onDelete }: {
  heroes: HeroConfig[];
  customHeroes: HeroConfig[];
  activeId: string;
  onSelect: (id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}) {
  return (
    <div className="py-3">
      {/* Built-in heroes section */}
      <div className="px-4 pb-3 pt-1">
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/20">Designs</span>
      </div>
      {heroes.map((h) => (
        <button
          key={h.id}
          onClick={() => onSelect(h.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 group relative ${
            activeId === h.id ? 'text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03]'
          }`}
        >
          {activeId === h.id && (
            <motion.div
              layoutId="sidebar-active"
              className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r-full"
              style={{ background: h.colorAccent }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            />
          )}
          <span className="text-base flex-shrink-0">{h.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{h.name}</div>
            <div className="text-[11px] text-white/25 truncate">{h.subtitle}</div>
          </div>
          <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${
            activeId === h.id ? 'text-white/70' : 'text-white/20'
          }`} style={{
            background: activeId === h.id ? `${h.colorAccent}20` : 'transparent',
            border: `1px solid ${activeId === h.id ? h.colorAccent + '30' : 'transparent'}`,
          }}>
            {h.borderLabel}
          </span>
        </button>
      ))}

      {/* Custom heroes section */}
      {customHeroes.length > 0 && (
        <>
          <div className="px-4 pb-3 pt-5 mt-2 border-t border-white/[0.04]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/20">Créations</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(102, 126, 234, 0.15)', color: '#a78bfa' }}>
                {customHeroes.length}
              </span>
            </div>
          </div>
          {customHeroes.map((h) => (
            <button
              key={h.id}
              onClick={() => onSelect(h.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 group relative ${
                activeId === h.id ? 'text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03]'
              }`}
            >
              {activeId === h.id && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r-full"
                  style={{ background: h.colorAccent }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
              <span className="text-base flex-shrink-0">{h.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{h.name}</div>
                <div className="text-[11px] text-white/25 truncate">{h.subtitle}</div>
              </div>
              <button
                onClick={(e) => onDelete(h.id, e)}
                className="p-1 rounded text-white/15 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                title="Supprimer"
              >
                <TrashIcon />
              </button>
            </button>
          ))}
        </>
      )}
    </div>
  );
}

function PreviewSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0F0F11]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-white/40 animate-spin" />
        <span className="text-sm text-white/30">Chargement...</span>
      </div>
    </div>
  );
}
