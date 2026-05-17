# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — Start development server (Next.js on port 3000)
- `npm run build` — Production build (includes TypeScript checking)
- `npm run lint` — ESLint with core-web-vitals + TypeScript configs

## Architecture

**Hero Studio** — A Next.js app that showcases 9 built-in hero section designs and generates new ones via AI.

### Source structure (`src/`)

- `src/app/` — Next.js App Router pages and API routes
- `src/components/heroes/` — 9 built-in hero components (Glassmorphism, Brutalism, Cyberpunk, Japandi, Organic, DarkLuxury, RetroVintage, Geometric, Aurora). Each is a `'use client'` component using Tailwind CSS + Framer Motion (`motion` + `AnimatePresence`).
- `src/components/HeroGenerator.tsx` — AI hero creation form. Users pick styles/fonts, write a prompt, and get a generated component.
- `src/components/DynamicPreview.tsx` — Renders generated hero code in an iframe by posting HTML to `/api/preview` and loading it back. Uses Babel standalone + Tailwind CDN inside the iframe.
- `src/components/ui/` — shadcn/ui components (Radix UI + Tailwind). Generated boilerplate, not hand-edited.
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/lib/db.ts` — Placeholder (Prisma not configured)

### API routes

- `GET /api/hero-code?id=<heroId>` — Reads a hero component's source file from `src/components/heroes/` and returns it as JSON. The `heroId` maps to filenames.
- `POST /api/generate-hero` — Calls `z-ai-web-dev-sdk` (ZAI/GLM) to generate a hero component from a prompt + style/font selections. Returns raw TSX code.
- `POST /api/preview` — Stores HTML in an in-memory Map, returns a UUID
- `GET /api/preview?id=<uuid>` — Serves stored HTML (5-min auto-cleanup)

### Key patterns

- All hero components follow the same pattern: `'use client'`, Framer Motion for animations, `min-h-screen`, Tailwind-only styling, French text content.
- Custom CSS animations are defined in `src/app/globals.css` (float, floatSlow, pulse-glow, neon-flicker, grain, morphBlob, scanline) and used via utility classes (`animate-float`, etc.).
- Path alias `@/*` maps to `src/*` (configured in `tsconfig.json`).
- Tailwind CSS v4 with `@tailwindcss/postcss` plugin. No `tailwind.config.js` — uses `@theme inline` in `globals.css`.

## Tech stack

- Next.js 16.2.6 (App Router, Turbopack)
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4 (via `@tailwindcss/postcss`)
- Framer Motion 12
- shadcn/ui (Radix UI primitives)
- `z-ai-web-dev-sdk` for AI generation
