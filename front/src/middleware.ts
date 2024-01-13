import type { NextRequest } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from '@/i18n/common';

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json).*)'],
};
