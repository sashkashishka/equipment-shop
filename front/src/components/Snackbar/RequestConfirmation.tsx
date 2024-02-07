'use client';

import { useCallback, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { t } from 'ttag';

import { Snackbar } from './Snackbar';

export function RequestConfirmationSnackbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isSuccessRef = useRef<boolean>();

  const reqStatus = searchParams.get('reqStatus');

  const hide = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('reqStatus');

    const queryString = params.size > 0 ? `?${params.toString()}` : '';

    router.replace(`${pathname}${queryString}`);

    window.setTimeout(() => {
      isSuccessRef.current = undefined;
    }, 500);
  }, [reqStatus]);

  if (isSuccessRef.current === undefined) {
    isSuccessRef.current = !!Number(reqStatus);
  }

  return (
    <Snackbar
      isVisible={reqStatus !== null}
      hide={hide}
      type={isSuccessRef.current ? 'success' : 'fail'}
      content={
        isSuccessRef.current
          ? t`Thank you for request! We will contact you soon!`
          : t`Oops! Something went wrong. Please try again`
      }
    />
  );
}
