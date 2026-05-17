import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const HERO_FILES: Record<string, string> = {
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const heroId = searchParams.get('id');

  if (!heroId || !HERO_FILES[heroId]) {
    return NextResponse.json({ error: 'Hero not found' }, { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'components', 'heroes', HERO_FILES[heroId]);
    const code = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json({ code, filename: HERO_FILES[heroId], heroId });
  } catch {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}
