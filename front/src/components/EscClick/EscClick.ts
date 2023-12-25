'use client';

import { useEventListener } from '@/hooks/useEventListener';

interface iProps {
  handler(): void;
}

export function EscClick({ handler }: iProps) {
  useEventListener('keyup', (e) => {
    if (e.key !== 'Escape') return;

    handler();
  });

  return null;
}
