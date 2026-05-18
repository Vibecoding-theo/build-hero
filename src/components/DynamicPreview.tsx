'use client';

import { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';

const FONT_URLS: Record<string, string> = {
  inter: 'Inter:wght@400;600;700',
  poppins: 'Poppins:wght@400;600;700',
  montserrat: 'Montserrat:wght@400;500;700',
  spaceGrotesk: 'Space+Grotesk:wght@400;500;700',
  outfit: 'Outfit:wght@400;500;700',
  jakarta: 'Plus+Jakarta+Sans:wght@400;500;700',
  playfair: 'Playfair+Display:wght@400;700;900',
  lora: 'Lora:wght@400;500;700',
  merriweather: 'Merriweather:wght@400;700',
  crimson: 'Crimson+Text:wght@400;600;700',
  unbounded: 'Unbounded:wght@400;700',
  oswald: 'Oswald:wght@400;500;700',
  bebas: 'Bebas+Neue',
  righteous: 'Righteous',
  syne: 'Syne:wght@400;700;800',
  caveat: 'Caveat:wght@400;700',
  satisfy: 'Satisfy',
  dmMono: 'DM+Mono:wght@400;500',
  sourceCode: 'Source+Code+Pro:wght@400;600',
};

interface DynamicPreviewProps {
  code: string;
  fonts?: string[];
  onRenderError?: (error: string) => void;
}

function buildHtml(code: string, fonts?: string[]): string {
  // Build Google Fonts link tags
  const fontLinks = (fonts || [])
    .filter((f: string) => FONT_URLS[f])
    .map((f: string) => `<link href="https://fonts.googleapis.com/css2?family=${FONT_URLS[f]}&display=swap" rel="stylesheet">`)
    .join('\n  ');

  // Extract the component name from the code
  const nameMatch = code.match(/export\s+default\s+function\s+(\w+)/);
  const componentName = nameMatch ? nameMatch[1] : 'GeneratedHero';

  // Helper: remove a JSX prop with balanced braces (handles nested objects like {{ opacity: 0 }})
  function removeJsxProp(code: string, propName: string): string {
    const regex = new RegExp(`\\s+${propName}=\\{`, 'g');
    let result = code;
    let match;
    while ((match = regex.exec(result)) !== null) {
      const start = match.index;
      const braceStart = start + match[0].length - 1;
      let depth = 0;
      let i = braceStart;
      for (; i < result.length; i++) {
        if (result[i] === '{') depth++;
        else if (result[i] === '}') {
          depth--;
          if (depth === 0) break;
        }
      }
      if (depth === 0) {
        result = result.slice(0, start) + result.slice(i + 1);
        regex.lastIndex = 0; // reset after string modification
      }
    }
    return result;
  }

  // Transform the code for the iframe
  let transformedCode = code
    // Strip 'use client' directive (any quote style)
    .replace(/^['"`]?use client['"`]?;?\s*$/gm, '')
    // Remove all import statements (single-line and multi-line)
    .replace(/^import\s+[\s\S]*?from\s+['"].*['"];?\s*$/gm, '')
    // Convert default export to plain function
    .replace(/export\s+default\s+function\s+(\w+)/, 'function $1')
    .replace(/export\s+default\s+/g, '')
    // Replace motion.* JSX tags with regular tags
    .replace(/<motion\.(\w+)/g, '<$1')
    .replace(/<\/motion\.(\w+)>/g, '</$1>')
    // Remove AnimatePresence and Suspense wrappers
    .replace(/<AnimatePresence[^>]*>\s*/g, '')
    .replace(/\s*<\/AnimatePresence>/g, '')
    .replace(/<Suspense[^>]*>\s*/g, '')
    .replace(/\s*<\/Suspense>/g, '')
    // Remove layout prop (boolean)
    .replace(/(\s)layout(?=[\s\n\r}])/g, '$1')
    // Remove layoutId string prop
    .replace(/\s+layoutId="[^"]*"/g, '');

  // Remove Framer Motion props with proper brace matching
  const motionProps = ['initial', 'animate', 'transition', 'whileHover', 'whileTap', 'whileInView', 'viewport', 'exit', 'variants'];
  for (const prop of motionProps) {
    transformedCode = removeJsxProp(transformedCode, prop);
  }

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${fontLinks}
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          animation: {
            'float': 'float 6s ease-in-out infinite',
            'float-slow': 'floatSlow 8s ease-in-out infinite',
            'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
            'neon-flicker': 'neonFlicker 3s infinite',
            'grain': 'grain 8s steps(10) infinite',
            'morph-blob': 'morphBlob 8s ease-in-out infinite',
            'scanline': 'scanline 4s linear infinite',
          }
        }
      }
    }
  <\/script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { overflow-x: hidden; overflow-y: auto; }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes floatSlow {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(3deg); }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
      50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 80px rgba(236, 72, 153, 0.4); }
    }
    @keyframes neonFlicker {
      0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
        text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #bc13fe, 0 0 82px #bc13fe, 0 0 92px #bc13fe;
      }
      20%, 24%, 55% { text-shadow: none; }
    }
    @keyframes grain {
      0%, 100% { transform: translate(0, 0); }
      10% { transform: translate(-5%, -10%); }
      30% { transform: translate(3%, -15%); }
      50% { transform: translate(-15%, 5%); }
      70% { transform: translate(7%, 15%); }
      90% { transform: translate(-10%, 10%); }
    }
    @keyframes morphBlob {
      0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      50% { border-radius: 50% 60% 30% 60% / 30% 40% 70% 60%; }
      75% { border-radius: 60% 30% 50% 40% / 70% 50% 60% 30%; }
    }
    @keyframes scanline {
      0% { top: -100%; }
      100% { top: 100%; }
    }

    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulseGlow 3s ease-in-out infinite; }
    .animate-neon-flicker { animation: neonFlicker 3s infinite; }
    .animate-grain { animation: grain 8s steps(10) infinite; }
    .animate-morph-blob { animation: morphBlob 8s ease-in-out infinite; }
    .animate-scanline { animation: scanline 4s linear infinite; }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"><\/script>
</head>
<body>
  <div id="root"></div>
  <script>
    function showError(title, msg) {
      document.getElementById('root').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;color:#888;font-family:sans-serif;"><div style="text-align:center;max-width:600px;padding:20px;"><p style="font-size:18px;margin-bottom:12px;color:#e55;">' + title + '</p><pre style="text-size:12px;color:#666;white-space:pre-wrap;word-break:break-all;text-align:left;">' + (msg || 'Unknown error').replace(/</g, '&lt;') + '</pre></div></div>';
    }
    try {
      var inputCode = ${JSON.stringify(transformedCode)};
      var renderCode = inputCode + '\\n\\ntry { var Component = typeof ${componentName} === \"function\" ? ${componentName} : null; if (Component) { ReactDOM.createRoot(document.getElementById(\"root\")).render(React.createElement(Component)); } else { showError(\"Composant introuvable\", \"${componentName}\"); } } catch(e) { showError(\"Erreur de rendu\", e.message + \"\\\\n\\\\n\" + e.stack); }';
      var output = Babel.transform(renderCode, { presets: ['typescript', 'react'], filename: 'file.tsx' });
      var script = document.createElement('script');
      script.textContent = output.code;
      document.body.appendChild(script);
    } catch(e) {
      showError('Erreur Babel', e.message);
      console.error(e);
    }
  <\/script>
</body>
</html>`;
}

const DynamicPreview = forwardRef<HTMLDivElement, DynamicPreviewProps>(
  ({ code, fonts, onRenderError }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useImperativeHandle(ref, () => containerRef.current!);

    useEffect(() => {
      if (!code || !iframeRef.current) return;

      let cancelled = false;
      setError(null);
      setLoading(true);

      try {
        const html = buildHtml(code, fonts);
        if (!cancelled && iframeRef.current) {
          iframeRef.current.srcdoc = html;
        }
      } catch (err) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : 'Preview failed';
          setError(msg);
          if (onRenderError) onRenderError(msg);
        }
      }

      // Listen for iframe load to dismiss loading spinner
      const iframe = iframeRef.current;
      const onLoad = () => {
        if (!cancelled) setLoading(false);
      };
      iframe?.addEventListener('load', onLoad);

      return () => {
        cancelled = true;
        iframe?.removeEventListener('load', onLoad);
      };
    }, [code, fonts, onRenderError]);

    return (
      <div ref={containerRef} className="w-full h-full relative">
        {(loading || error) && (
          <div className="absolute inset-0 flex items-center justify-center z-10" style={{ background: '#0F0F11' }}>
            {error ? (
              <div className="flex flex-col items-center gap-3 px-6 text-center">
                <span className="text-red-400 text-2xl">⚠</span>
                <p className="text-xs text-red-400/80 max-w-md">{error}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white/40 animate-spin" />
                <span className="text-xs text-white/30">Chargement du preview...</span>
              </div>
            )}
          </div>
        )}
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          title="Hero Preview"
          style={{ background: '#0F0F11' }}
        />
      </div>
    );
  }
);

DynamicPreview.displayName = 'DynamicPreview';
export default DynamicPreview;
