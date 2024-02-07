import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  revalidateTag('strapi');
  return NextResponse.json({ ok: true });
}
