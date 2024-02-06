import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  revalidateTag('strapi');
  return NextResponse.json({ ok: true });
}
