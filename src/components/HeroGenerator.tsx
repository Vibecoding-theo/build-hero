'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DynamicPreview from '@/components/DynamicPreview';

/* ─── Data ─── */

interface StyleOption {
  id: string;
  name: string;
  emoji: string;
  color: string;
  border: string;
  category: string;
}

const STYLES: StyleOption[] = [
  { id: 'glassmorphism', name: 'Glassmorphism', emoji: '🪟', color: '#764ba2', border: 'Arrondi', category: 'Moderne' },
  { id: 'brutalism', name: 'Brutalism', emoji: '📐', color: '#FF00FF', border: 'Carré', category: 'Extrême' },
  { id: 'cyberpunk', name: 'Cyberpunk', emoji: '🌆', color: '#bc13fe', border: 'Carré', category: 'Futuriste' },
  { id: 'minimal', name: 'Minimaliste', emoji: '🍃', color: '#C4B5A5', border: 'Mixte', category: 'Épuré' },
  { id: 'organic', name: 'Organique', emoji: '🎨', color: '#e94560', border: 'Pill', category: 'Fluide' },
  { id: 'luxury', name: 'Dark Luxury', emoji: '🖤', color: '#d4af37', border: 'Mixte', category: 'Premium' },
  { id: 'retro', name: 'Retro Vintage', emoji: '📻', color: '#8B6914', border: 'Carré', category: 'Nostalgie' },
  { id: 'geometric', name: 'Géométrique', emoji: '🔷', color: '#E63946', border: 'Carré', category: 'Structure' },
  { id: 'aurora', name: 'Aurora', emoji: '🌌', color: '#10B981', border: 'Pill', category: 'Cosmique' },
  { id: 'gradient', name: 'Gradient', emoji: '🌈', color: '#8B5CF6', border: 'Arrondi', category: 'Vibrant' },
  { id: 'neumorphism', name: 'Neumorphism', emoji: '🫧', color: '#94a3b8', border: 'Arrondi', category: 'Subtil' },
  { id: 'darkmode', name: 'Dark Mode', emoji: '🌙', color: '#64748b', border: 'Mixte', category: 'Moderne' },
];

interface FontOption {
  id: string;
  name: string;
  family: string;
  category: string;
  sample: string;
  weight: string;
}

const FONTS: FontOption[] = [
  { id: 'inter', name: 'Inter', family: "'Inter', sans-serif", category: 'Sans-serif', sample: 'Aa Bb Cc 123', weight: '400' },
  { id: 'poppins', name: 'Poppins', family: "'Poppins', sans-serif", category: 'Sans-serif', sample: 'Aa Bb Cc 123', weight: '600' },
  { id: 'montserrat', name: 'Montserrat', family: "'Montserrat', sans-serif", category: 'Sans-serif', sample: 'Aa Bb Cc 123', weight: '500' },
  { id: 'spaceGrotesk', name: 'Space Grotesk', family: "'Space Grotesk', sans-serif", category: 'Sans-serif', sample: 'Aa Bb Cc 123', weight: '500' },
  { id: 'outfit', name: 'Outfit', family: "'Outfit', sans-serif", category: 'Sans-serif', sample: 'Aa Bb Cc 123', weight: '400' },
  { id: 'jakarta', name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', sans-serif", category: 'Sans-serif', sample: 'Aa Bb Cc 123', weight: '500' },
  { id: 'playfair', name: 'Playfair Display', family: "'Playfair Display', serif", category: 'Serif', sample: 'Aa Bb Cc 123', weight: '700' },
  { id: 'lora', name: 'Lora', family: "'Lora', serif", category: 'Serif', sample: 'Aa Bb Cc 123', weight: '400' },
  { id: 'merriweather', name: 'Merriweather', family: "'Merriweather', serif", category: 'Serif', sample: 'Aa Bb Cc 123', weight: '400' },
  { id: 'crimson', name: 'Crimson Text', family: "'Crimson Text', serif", category: 'Serif', sample: 'Aa Bb Cc 123', weight: '400' },
  { id: 'unbounded', name: 'Unbounded', family: "'Unbounded', sans-serif", category: 'Display', sample: 'Aa Bb Cc 123', weight: '700' },
  { id: 'oswald', name: 'Oswald', family: "'Oswald', sans-serif", category: 'Display', sample: 'Aa Bb Cc 123', weight: '500' },
  { id: 'bebas', name: 'Bebas Neue', family: "'Bebas Neue', sans-serif", category: 'Display', sample: 'Aa Bb Cc 123', weight: '400' },
  { id: 'righteous', name: 'Righteous', family: "'Righteous', cursive", category: 'Display', sample: 'Aa Bb Cc 123', weight: '400' },
  { id: 'syne', name: 'Syne', family: "'Syne', sans-serif", category: 'Display', sample: 'Aa Bb Cc 123', weight: '700' },
  { id: 'caveat', name: 'Caveat', family: "'Caveat', cursive", category: 'Handwriting', sample: 'Aa Bb Cc 123', weight: '400' },
  { id: 'satisfy', name: 'Satisfy', family: "'Satisfy', cursive", category: 'Handwriting', sample: 'Aa Bb Cc 123', weight: '400' },
  { id: 'dmMono', name: 'DM Mono', family: "'DM Mono', monospace", category: 'Mono', sample: 'Aa Bb Cc 123', weight: '400' },
];

const PROMPT_SUGGESTIONS = [
  'Une landing page pour une agence de design créatif avec un titre impactant',
  'Un hero section pour une app de fitness avec des statistiques',
  'Un hero pour un SaaS de productivité avec des couleurs énergiques',
  'Une page d\'accueil pour un portfolio de photographe minimaliste',
  'Un hero pour une startup IA avec un effet technologique',
  'Une landing page pour un restaurant gastronomique',
  'Un hero pour une plateforme e-commerce de mode',
  'Un hero pour une app de musique avec des formes ondulées',
];

/* ─── Icons ─── */

function SparklesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  );
}

function CopyIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ReloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ─── Font category colors ─── */
const FONT_CAT_COLORS: Record<string, string> = {
  'Sans-serif': '#64748b',
  'Serif': '#d4af37',
  'Display': '#e94560',
  'Handwriting': '#10B981',
  'Mono': '#764ba2',
};

/* ─── Collapsible Section ─── */
function Section({ title, subtitle, open, onToggle, badge, children }: {
  title: string;
  subtitle?: string;
  open: boolean;
  onToggle: () => void;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/[0.02] cursor-pointer" style={{ background: open ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-white/80">{title}</span>
          {subtitle && <span className="text-xs text-white/25">{subtitle}</span>}
          {badge && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(118, 75, 162, 0.15)', color: '#a78bfa', border: '1px solid rgba(118, 75, 162, 0.2)' }}>
              {badge}
            </span>
          )}
        </div>
        <ChevronDown open={open} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Component ─── */

interface GeneratedHero {
  id: string;
  name: string;
  code: string;
  componentName: string;
  styles: string[];
  fonts: string[];
  timestamp: number;
}

interface HeroGeneratorProps {
  onAddToGallery?: (hero: GeneratedHero) => void;
}

export default function HeroGenerator({ onAddToGallery }: HeroGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['glassmorphism']);
  const [selectedFonts, setSelectedFonts] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [componentName, setComponentName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [styleSectionOpen, setStyleSectionOpen] = useState(true);
  const [fontSectionOpen, setFontSectionOpen] = useState(false);
  const [resultStyles, setResultStyles] = useState<string[]>([]);
  const [resultFonts, setResultFonts] = useState<string[]>([]);
  const [addedToGallery, setAddedToGallery] = useState(false);

  const primaryStyle = STYLES.find((s) => s.id === selectedStyles[0]);

  const toggleStyle = useCallback((id: string) => {
    setSelectedStyles((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((s) => s !== id) : prev;
      }
      return prev.length >= 3 ? prev : [...prev, id];
    });
  }, []);

  const toggleFont = useCallback((id: string) => {
    setSelectedFonts((prev) => {
      if (prev.includes(id)) return prev.filter((f) => f !== id);
      return prev.length >= 3 ? prev : [...prev, id];
    });
  }, []);

  const clearFonts = useCallback(() => setSelectedFonts([]), []);

  const generate = useCallback(async () => {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    setError(null);
    setGeneratedCode(null);
    setShowCode(false);
    setCopied(false);
    setAddedToGallery(false);

    try {
      const res = await fetch('/api/generate-hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          styles: selectedStyles,
          fonts: selectedFonts,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Generation failed');

      setGeneratedCode(data.code);
      setComponentName(data.componentName || 'GeneratedHero');
      setResultStyles(data.styleNames || []);
      setResultFonts(data.fontNames || []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erreur de génération';
      setError(message);
    } finally {
      setGenerating(false);
    }
  }, [prompt, selectedStyles, selectedFonts, generating]);

  const handleCopy = useCallback(async () => {
    if (!generatedCode) return;
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = generatedCode;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [generatedCode]);

  const handleSuggestion = useCallback((suggestion: string) => {
    setPrompt(suggestion);
  }, []);

  const reset = useCallback(() => {
    setGeneratedCode(null);
    setComponentName('');
    setError(null);
    setCopied(false);
    setResultStyles([]);
    setResultFonts([]);
    setAddedToGallery(false);
  }, []);

  /* ─── Result View ─── */
  if (generatedCode) {
    const handleAddToGallery = () => {
      if (!onAddToGallery || addedToGallery) return;
      const hero: GeneratedHero = {
        id: `custom-${Date.now()}`,
        name: componentName,
        code: generatedCode,
        componentName,
        styles: resultStyles,
        fonts: selectedFonts,
        timestamp: Date.now(),
      };
      onAddToGallery(hero);
      setAddedToGallery(true);
    };

    return (
      <div className="h-full flex flex-col bg-[#0F0F11]">
        <div className="flex-shrink-0 h-12 border-b border-white/[0.06] flex items-center justify-between px-4" style={{ background: 'rgba(15,15,17,0.95)' }}>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button onClick={reset} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              <span className="hidden sm:inline">Retour</span>
            </button>
            <div className="w-px h-5 bg-white/[0.06] flex-shrink-0" />
            <span className="text-xs text-white/40 font-mono truncate">{componentName}.tsx</span>
            <div className="hidden md:flex items-center gap-1.5 ml-2">
              {resultStyles.map((s: string) => (
                <span key={s} className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/[0.06] text-white/30">{s}</span>
              ))}
              {resultFonts.map((f: string) => (
                <span key={f} className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(118, 75, 162, 0.12)', color: '#a78bfa' }}>{f}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Add to gallery button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={handleAddToGallery}
              disabled={addedToGallery}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                addedToGallery
                  ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
              }`}
            >
              {addedToGallery ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="hidden sm:inline">Dans la galerie</span>
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                  <span className="hidden sm:inline">Ajouter à la galerie</span>
                </>
              )}
            </motion.button>

            <button onClick={() => setShowCode(!showCode)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${showCode ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/[0.06]'}`}>
              {showCode ? <EyeIcon /> : <CodeIcon />}
              <span className="hidden sm:inline">{showCode ? 'Preview' : 'Code'}</span>
            </button>
            <button onClick={handleCopy} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200" style={{ background: copied ? 'rgba(16, 185, 129, 0.9)' : 'rgba(255,255,255,0.08)', color: copied ? 'white' : '#ccc', border: copied ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.06)' }}>
              {copied ? <><CheckIcon /> Copié !</> : <><CopyIcon /> Copier</>}
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className={`flex-1 overflow-hidden relative transition-all duration-300 ${showCode ? '' : 'h-full'}`} style={showCode ? { height: '45%' } : undefined}>
            <DynamicPreview code={generatedCode} fonts={selectedFonts} />
          </div>
          <AnimatePresence>
            {showCode && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: '55%', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="flex-shrink-0 border-t border-white/[0.06] flex flex-col overflow-hidden" style={{ background: '#0D0D10' }}>
                <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.04] flex-shrink-0">
                  <span className="text-xs font-mono text-white/30">{componentName}.tsx</span>
                  <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                    {copied ? <><CheckIcon size={12} /> Copié</> : <><CopyIcon size={12} /> Copier tout</>}
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-5">
                  <pre className="font-mono text-[12px] leading-[1.7] text-white/60 whitespace-pre-wrap break-words"><code>{generatedCode}</code></pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  /* ─── Generation Form ─── */
  return (
    <div className="h-full overflow-y-auto" style={{ background: '#0F0F11' }}>
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <SparklesIcon />
            <span className="text-xs font-medium text-white/60">Propulsé par GLM</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Crée ton Hero</h1>
          <p className="text-sm text-white/30 leading-relaxed max-w-md mx-auto">
            Mixe les styles, choisis tes polices, décris ton idée. L&apos;IA fait le reste.
          </p>
        </motion.div>

        {/* Prompt input — always visible */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-5">
          <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2.5">
            Décris ton hero
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Une landing page pour une agence de design créatif avec un titre impactant et des formes géométriques animées..."
            className="w-full h-28 px-5 py-4 rounded-2xl text-sm text-white placeholder-white/20 resize-none outline-none transition-all duration-200 focus:ring-2"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              ['--tw-ring-color' as string]: primaryStyle ? `${primaryStyle.color}40` : 'rgba(255,255,255,0.1)',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) generate();
            }}
          />
          <div className="flex items-center justify-between mt-1.5 px-1">
            <span className="text-[10px] text-white/20">{prompt.length} caractères</span>
            <span className="text-[10px] text-white/20">⌘+Entrée pour générer</span>
          </div>
        </motion.div>

        {/* Suggestions */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mb-5">
          <div className="flex flex-wrap gap-1.5">
            {PROMPT_SUGGESTIONS.slice(0, 5).map((s, i) => (
              <button
                key={i}
                onClick={() => handleSuggestion(s)}
                className="px-3 py-1.5 rounded-xl text-[10px] text-white/30 hover:text-white/60 transition-all duration-200 hover:bg-white/[0.03] cursor-pointer text-left max-w-[200px] truncate"
                style={{ border: '1px solid rgba(255,255,255,0.04)' }}
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Style Mixer Section */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-4">
          <Section
            title="Styles visuels"
            subtitle={selectedStyles.length > 1 ? `${selectedStyles.length} styles mélangés` : 'Choix du style'}
            open={styleSectionOpen}
            onToggle={() => setStyleSectionOpen(!styleSectionOpen)}
            badge={selectedStyles.length > 1 ? 'Mix' : undefined}
          >
            {/* Mix hint */}
            {selectedStyles.length === 1 && (
              <p className="text-[11px] text-white/20 mb-3 flex items-center gap-1.5">
                <PlusIcon /> Clique sur un 2e ou 3e style pour les mélanger
              </p>
            )}

            {/* Selected styles chips */}
            {selectedStyles.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedStyles.map((id) => {
                  const s = STYLES.find((st) => st.id === id);
                  if (!s) return null;
                  return (
                    <div key={id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: `${s.color}18`, border: `1px solid ${s.color}30`, color: s.color }}>
                      <span>{s.emoji}</span>
                      <span>{s.name}</span>
                      {selectedStyles.length > 1 && (
                        <button onClick={() => toggleStyle(id)} className="ml-1 hover:opacity-70 transition-opacity cursor-pointer">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                  );
                })}
                {selectedStyles.length < 3 && (
                  <span className="text-[10px] text-white/20 flex items-center px-2 py-1.5">
                    {selectedStyles.length}/3 styles
                  </span>
                )}
              </div>
            )}

            {/* Style grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {STYLES.map((s) => {
                const isSelected = selectedStyles.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleStyle(s.id)}
                    className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl text-center transition-all duration-200 cursor-pointer ${isSelected ? 'scale-[1.02]' : 'hover:bg-white/[0.03]'}`}
                    style={{
                      background: isSelected ? `${s.color}12` : 'transparent',
                      border: isSelected ? `1.5px solid ${s.color}40` : '1px solid rgba(255,255,255,0.04)',
                    }}
                  >
                    <span className="text-xl">{s.emoji}</span>
                    <span className="text-[10px] font-medium leading-tight" style={{ color: isSelected ? s.color : 'rgba(255,255,255,0.4)' }}>
                      {s.name}
                    </span>
                    {isSelected && selectedStyles.indexOf(s.id) > 0 && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full" style={{ background: `${s.color}20`, color: s.color }}>
                        +{selectedStyles.indexOf(s.id)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Section>
        </motion.div>

        {/* Font Picker Section */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-6">
          <Section
            title="Polices"
            subtitle={selectedFonts.length > 0 ? `${selectedFonts.length} sélectionnée${selectedFonts.length > 1 ? 's' : ''}` : 'Optionnel'}
            open={fontSectionOpen}
            onToggle={() => setFontSectionOpen(!fontSectionOpen)}
            badge={selectedFonts.length > 0 ? `${selectedFonts.length}` : undefined}
          >
            {/* Selected fonts chips */}
            {selectedFonts.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {selectedFonts.map((id) => {
                  const f = FONTS.find((fo) => fo.id === id);
                  if (!f) return null;
                  const idx = selectedFonts.indexOf(id);
                  const role = idx === 0 ? 'Titres' : idx === 1 ? 'Sous-titres' : 'Corps';
                  return (
                    <div key={id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: `${FONT_CAT_COLORS[f.category] || '#667eea'}15`, border: `1px solid ${FONT_CAT_COLORS[f.category] || '#667eea'}25` }}>
                      <span className="text-xs font-medium" style={{ fontFamily: f.family, color: `${FONT_CAT_COLORS[f.category] || '#667eea'}` }}>
                        {f.name}
                      </span>
                      <span className="text-[9px] text-white/20">({role})</span>
                      <button onClick={() => toggleFont(id)} className="hover:opacity-70 transition-opacity cursor-pointer">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: `${FONT_CAT_COLORS[f.category] || '#667eea'}` }}>
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
                <button onClick={clearFonts} className="text-[10px] text-white/20 hover:text-white/40 transition-colors px-2 py-1 cursor-pointer">
                  Tout effacer
                </button>
                <span className="text-[10px] text-white/15">{selectedFonts.length}/3</span>
              </div>
            )}

            {selectedFonts.length === 0 && (
              <p className="text-[11px] text-white/20 mb-3">
                Sélectionne jusqu&apos;à 3 polices : Titres, Sous-titres, Corps de texte
              </p>
            )}

            {/* Font categories */}
            {['Sans-serif', 'Serif', 'Display', 'Handwriting', 'Mono'].map((cat) => {
              const catFonts = FONTS.filter((f) => f.category === cat);
              if (catFonts.length === 0) return null;
              const catColor = FONT_CAT_COLORS[cat] || '#667eea';
              return (
                <div key={cat} className="mb-4 last:mb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: catColor }} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: `${catColor}99` }}>{cat}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {catFonts.map((f) => {
                      const isSelected = selectedFonts.includes(f.id);
                      return (
                        <button
                          key={f.id}
                          onClick={() => toggleFont(f.id)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${isSelected ? '' : 'hover:bg-white/[0.02]'}`}
                          style={{
                            background: isSelected ? `${catColor}10` : 'transparent',
                            border: isSelected ? `1px solid ${catColor}30` : '1px solid rgba(255,255,255,0.03)',
                          }}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold truncate" style={{ color: isSelected ? catColor : 'rgba(255,255,255,0.6)' }}>
                                {f.name}
                              </span>
                              {isSelected && selectedFonts.indexOf(f.id) === 0 && (
                                <span className="text-[8px] px-1 py-0.5 rounded" style={{ background: `${catColor}20`, color: catColor }}>Titres</span>
                              )}
                              {isSelected && selectedFonts.indexOf(f.id) === 1 && (
                                <span className="text-[8px] px-1 py-0.5 rounded" style={{ background: `${catColor}20`, color: catColor }}>Sous-titres</span>
                              )}
                              {isSelected && selectedFonts.indexOf(f.id) === 2 && (
                                <span className="text-[8px] px-1 py-0.5 rounded" style={{ background: `${catColor}20`, color: catColor }}>Corps</span>
                              )}
                            </div>
                            <span className="text-[11px] block mt-0.5 truncate" style={{ fontFamily: f.family, fontWeight: f.weight, color: isSelected ? `${catColor}cc` : 'rgba(255,255,255,0.2)' }}>
                              {f.sample}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: catColor }}>
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </Section>
        </motion.div>

        {/* Generate button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generate}
          disabled={!prompt.trim() || generating}
          className="w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
          style={{
            background: generating
              ? 'rgba(255,255,255,0.05)'
              : primaryStyle
                ? `linear-gradient(135deg, ${primaryStyle.color}, ${primaryStyle.color}bb)`
                : 'rgba(255,255,255,0.08)',
            color: 'white',
            border: 'none',
          }}
        >
          {generating ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <SparklesIcon />
              {selectedStyles.length > 1
                ? `Générer (${selectedStyles.length} styles mixés)`
                : 'Générer le hero'
              }
            </>
          )}
        </motion.button>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-5 p-4 rounded-xl border border-red-500/20" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-sm mt-0.5">✕</span>
                <div>
                  <p className="text-sm font-medium text-red-400">Erreur de génération</p>
                  <p className="text-xs text-red-400/60 mt-1">{error}</p>
                  <button onClick={generate} className="flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" style={{ border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                    <ReloadIcon /> Réessayer
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Conseils</h3>
          <ul className="space-y-2 text-xs text-white/25 leading-relaxed">
            <li className="flex gap-2"><span className="text-white/15">•</span>Mélangez jusqu&apos;à 3 styles pour des designs uniques (ex: Glassmorphism + Cyberpunk)</li>
            <li className="flex gap-2"><span className="text-white/15">•</span>Ajoutez des polices pour personnaliser la typographie (Titres / Sous-titres / Corps)</li>
            <li className="flex gap-2"><span className="text-white/15">•</span>Soyez spécifique sur le contenu, couleurs et ambiance souhaités</li>
            <li className="flex gap-2"><span className="text-white/15">•</span>Le code généré est du Tailwind CSS + Framer Motion, prêt à copier-coller</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
