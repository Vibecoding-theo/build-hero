import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

const STYLE_PRESETS: Record<string, string> = {
  glassmorphism: 'Glassmorphism : effets de flou (backdrop-blur), transparence, bordures arrondies (rounded-2xl/3xl), tons pastels, cartes semi-transparentes avec backdrop-blur-xl',
  brutalism: 'Brutalism : angles parfaitement carrés (rounded-none), bordures épaisses (border-4), typographie massive et brute, contrastes forts (noir/jaune/magenta), ombres dures',
  cyberpunk: 'Neon Cyberpunk : fond sombre (#0a0a1a), grille futuriste, effets néon (text-shadow), couleurs cyan (#00ffff) et violet (#bc13fe), style terminal',
  minimal: 'Minimaliste : tons neutres et chauds (beige, taupe), typographie légère (font-extralight), espaces généreux, design épuré',
  organic: 'Organique : dégradés fluides, formes blob arrondies (morph-blob), particules flottantes, accents colorés',
  luxury: 'Dark Luxury : fond noir profond (#0a0a0a), accents or (#d4af37), typographie serif, ornements délicats',
  retro: 'Retro Vintage : tons chauds sepia (#F4E8D1, #8B6914), texture grain, typographie serif italique, cadres doubles',
  geometric: 'Géométrique : formes primaires (carrés, cercles, triangles), couleurs vives (#E63946, #457B9D, #F4A261)',
  aurora: 'Aurora Boréale : fond bleu nuit (#0F172A), dégradés cosmiques multi-couleurs, étoiles, effets lumineux',
  gradient: 'Gradient : dégradés multi-couleurs vibrants, formes fluides, palette moderne',
  neumorphism: 'Neumorphism : ombres douces inset/outset, gris clair (#e0e5ec), formes convexes/concaves',
  darkmode: 'Dark Mode : fond sombre, textes blancs/gris, accents colorés vifs',
};

const FONT_PRESETS: Record<string, { name: string; family: string; category: string; description: string }> = {
  inter: { name: 'Inter', family: "'Inter', sans-serif", category: 'Sans-serif', description: 'Moderne, lisible, polyvalent — excellent pour les interfaces' },
  poppins: { name: 'Poppins', family: "'Poppins', sans-serif", category: 'Sans-serif', description: 'Géométrique, amical, très populaire pour les landing pages' },
  montserrat: { name: 'Montserrat', family: "'Montserrat', sans-serif", category: 'Sans-serif', description: 'Élégant, urbain, parfait pour les marques premium' },
  spaceGrotesk: { name: 'Space Grotesk', family: "'Space Grotesk', sans-serif", category: 'Sans-serif', description: 'Tech, futuriste, idéal pour les startups tech' },
  outfit: { name: 'Outfit', family: "'Outfit', sans-serif", category: 'Sans-serif', description: 'Moderne, rond, doux — très lisible en grand' },
  jakarta: { name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', sans-serif", category: 'Sans-serif', description: 'Pro, sophistiqué, excellent pour les SaaS' },
  playfair: { name: 'Playfair Display', family: "'Playfair Display', serif", category: 'Serif', description: 'Classique, sophistiqué, parfait pour le luxe et l\'éditorial' },
  lora: { name: 'Lora', family: "'Lora', serif", category: 'Serif', description: 'Littéraire, chaleureux, idéal pour les contenus storytelling' },
  merriweather: { name: 'Merriweather', family: "'Merriweather', serif", category: 'Serif', description: 'Lisible, solide, parfait pour les longs textes et blogs' },
  crimson: { name: 'Crimson Text', family: "'Crimson Text', serif", category: 'Serif', description: 'Élégant, rétro, évoque l\'imprimerie classique' },
  unbounded: { name: 'Unbounded', family: "'Unbounded', sans-serif", category: 'Display', description: 'Expressif, audacieux, parfait pour les titres impactants' },
  oswald: { name: 'Oswald', family: "'Oswald', sans-serif", category: 'Display', description: 'Condensé, puissant, excellent en majuscules' },
  bebas: { name: 'Bebas Neue', family: "'Bebas Neue', sans-serif", category: 'Display', description: 'Impactant, cinématique, style affiche/poster' },
  righteous: { name: 'Righteous', family: "'Righteous', cursive", category: 'Display', description: 'Rétro-futuriste, fun, style années 80-90' },
  caveat: { name: 'Caveat', family: "'Caveat', cursive", category: 'Handwriting', description: 'Manuscrit, décontracté, idéal pour un style personnel' },
  satisfy: { name: 'Satisfy', family: "'Satisfy', cursive", category: 'Handwriting', description: 'Élégant, script léger, apporte une touche artistique' },
  syne: { name: 'Syne', family: "'Syne', sans-serif", category: 'Display', description: 'Expérimental, créatif, parfait pour les projets avant-gardistes' },
  dmMono: { name: 'DM Mono', family: "'DM Mono', monospace", category: 'Mono', description: 'Code, technique, terminal — style développeur' },
  sourceCode: { name: 'Source Code Pro', family: "'Source Code Pro', monospace", category: 'Mono', description: 'Technique, propre, excellent pour les outils Dev' },
};

export async function POST(request: NextRequest) {
  try {
    const { prompt, styles, fonts } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (!styles || !Array.isArray(styles) || styles.length === 0) {
      return NextResponse.json({ error: 'At least one style is required' }, { status: 400 });
    }

    // Validate styles
    for (const s of styles) {
      if (!STYLE_PRESETS[s]) {
        return NextResponse.json({ error: `Invalid style: ${s}` }, { status: 400 });
      }
    }

    // Build style instructions
    let styleInstructions = '';
    if (styles.length === 1) {
      styleInstructions = `STYLE DEMANDÉ : ${STYLE_PRESETS[styles[0]]}`;
    } else {
      styleInstructions = `MÉLANGE DE STYLES (${styles.length} styles à combiner harmonieusement) :\n${styles.map((s: string, i: number) => `  ${i + 1}. ${STYLE_PRESETS[s]}`).join('\n')}\n\nINSTRUCTIONS DE MÉLANGE : Crée une fusion harmonieuse de ces ${styles.length} styles. Prends les éléments visuels les plus marquants de chaque style (couleurs, formes, textures, effets) et combine-les de manière cohérente. Le résultat doit ressentir l'influence de chaque style sans ressembler à un simple copié-collé. Sois créatif dans la fusion.`;
    }

    // Build border info based on mixed styles
    const hasSquare = styles.some((s: string) => ['brutalism', 'cyberpunk', 'retro', 'geometric'].includes(s));
    const hasRounded = styles.some((s: string) => ['glassmorphism', 'organic', 'aurora', 'neumorphism'].includes(s));
    const borderInfo = hasSquare && hasRounded
      ? 'Mixe intelligemment les bordures : certains éléments avec des angles carrés, d\'autres avec des bordures arrondies, pour refléter le mélange de styles.'
      : hasSquare
        ? 'Utilise des bordures carrées (rounded-none) pour la plupart des éléments.'
        : hasRounded
          ? 'Utilise des bordures arrondies (rounded-2xl, rounded-3xl) pour la plupart des éléments.'
          : 'Utilise des bordures modérées (rounded-lg, rounded-xl).';

    // Build font instructions
    let fontInstruction = '';
    if (fonts && Array.isArray(fonts) && fonts.length > 0) {
      const validatedFonts = fonts.filter((f: string) => FONT_PRESETS[f]).map((f: string) => FONT_PRESETS[f]);
      if (validatedFonts.length > 0) {
        fontInstruction = `\n\nPOLICES DE CARACTÈRES À UTILISER :\n${validatedFonts.map((f: { name: string; family: string; description: string }, i: number) => `  ${i + 1}. ${f.name} (font-family: ${f.family}) — ${f.description}`).join('\n')}`;

        if (validatedFonts.length === 1) {
          fontInstruction += `\nUtilise ${validatedFonts[0].name} comme police principale. Applique-la via un style inline sur le conteneur principal : style={{ fontFamily: '${validatedFonts[0].family}' }}`;
        } else if (validatedFonts.length === 2) {
          fontInstruction += `\nUtilise ${validatedFonts[0].name} pour les titres (style={{ fontFamily: '${validatedFonts[0].family}' }}) et ${validatedFonts[1].name} pour le texte courant (style={{ fontFamily: '${validatedFonts[1].family}' }}).`;
        } else {
          fontInstruction += `\nUtilise ${validatedFonts[0].name} pour le titre principal, ${validatedFonts[1].name} pour les sous-titres, et ${validatedFonts[2].name} pour le texte courant. Applique chaque police via style={{ fontFamily: '...' }} sur les éléments correspondants.`;
        }

        fontInstruction += `\nAssure-toi d'importer les Google Fonts nécessaires en haut du composant en utilisant un next/font/google ou en ajoutant un <link> dans un useEffect.`;
      }
    }

    const systemPrompt = `Tu es un expert React/TypeScript qui génère des composants Hero (page d'accueil) de haute qualité.

CONTEXTE : L'app utilise Next.js 16 avec App Router, TypeScript, Tailwind CSS 4, et Framer Motion.

RÈGLES STRICTES :
1. Le composant DOIT commencer par 'use client';
2. Utilise UNIQUEMENT Tailwind CSS pour le style (pas de CSS inline sauf pour fontFamily, les dégradés, les ombres personnalisées ou les animations)
3. Utilise Framer Motion (motion.div, motion.h1, etc.) pour les animations d'entrée (initial/animate)
4. Le composant doit prendre toute la hauteur de l'écran (min-h-screen)
5. N'utilise PAS d'images externes ni d'icônes de bibliothèques — utilise du CSS pur et du SVG inline
6. N'utilise PAS useState, useRef (sauf pour des cas très simples)
7. Le code doit être COMPLET et fonctionnel, prêt à être copié-collé
8. Ajoute des éléments visuels uniques : formes SVG décoratives, patterns CSS, dégradés, blobs, etc.
9. Les animations CSS doivent utiliser les classes existantes : animate-float, animate-float-slow, animate-morph-blob, animate-pulse, animate-spin
10. Le contenu textuel doit être en FRANÇAIS
11. Si des polices Google Fonts sont demandées, charge-les via un <link> dans un useEffect qui ajoute la balise au document.head
12. Pour les polices, applique fontFamily via style={{ fontFamily: "..." }} sur les éléments concernés

${styleInstructions}
${borderInfo}
${fontInstruction}

FORMAT DE RÉPONSE : Renvoie UNIQUEMENT le code TypeScript/React complet, sans explication, sans bloc markdown (pas de \`\`\`). Juste le code brut.`;

    const userPrompt = `Crée un composant Hero React/TypeScript avec Tailwind CSS et Framer Motion.

Description de ce que je veux : ${prompt}

Assure-toi que le design est visuellement impressionnant, unique et professionnel. Inclus :
- Un titre principal accrocheur
- Un sous-titre ou description
- Des boutons d'action (CTA)
- Des éléments décoratifs visuels (formes, patterns, gradients)
- Des animations Framer Motion fluides`;

    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.85,
      max_tokens: 8000,
    });

    let code = completion.choices[0]?.message?.content?.trim() ?? '';

    // Clean up code if wrapped in markdown
    if (code.startsWith('```tsx')) {
      code = code.slice(6);
    } else if (code.startsWith('```typescript')) {
      code = code.slice(13);
    } else if (code.startsWith('```')) {
      code = code.slice(3);
    }
    if (code.endsWith('```')) {
      code = code.slice(0, -3);
    }
    code = code.trim();

    // Extract component name
    const nameMatch = code.match(/export\s+default\s+function\s+(\w+)/);
    const componentName = nameMatch ? nameMatch[1] : 'GeneratedHero';

    // Build summary info
    const styleNames = styles.map((s: string) => {
      const preset = STYLE_PRESETS[s];
      return preset.split(':')[0].trim();
    });
    const fontNames = (fonts || []).filter((f: string) => FONT_PRESETS[f]).map((f: string) => FONT_PRESETS[f].name);

    return NextResponse.json({
      code,
      componentName,
      styleNames,
      fontNames,
    });
  } catch (error: unknown) {
    console.error('Generate hero error:', error);
    const message = error instanceof Error ? error.message : 'Generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
