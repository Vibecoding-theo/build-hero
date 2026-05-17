import { NextRequest, NextResponse } from 'next/server';

// In-memory store for preview HTML — auto-cleans after 5 minutes
const previews = new Map<string, string>();

export async function POST(request: NextRequest) {
  try {
    const { html } = await request.json();

    if (!html || typeof html !== 'string') {
      return NextResponse.json({ error: 'html is required' }, { status: 400 });
    }

    const id = crypto.randomUUID();

    previews.set(id, html);

    // Auto-cleanup after 5 minutes
    setTimeout(() => {
      previews.delete(id);
    }, 5 * 60 * 1000);

    return NextResponse.json({ id });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id || !previews.has(id)) {
    return new Response('Preview not found or expired', { status: 404 });
  }

  const html = previews.get(id)!;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store',
    },
  });
}
