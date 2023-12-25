'use client';

import { initTtag } from './server';

interface iProps {
  locale: string;
}

export function InitTtag({ locale }: iProps) {
  initTtag(locale);
  return null;
}
