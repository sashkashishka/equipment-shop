'use client';

import { useEffect } from 'react';
import cn from 'classnames';

import styles from './Snackbar.module.css';

interface iProps {
  content: React.ReactNode;
  type: 'success' | 'fail';
  timeout?: number;
  isVisible: boolean;
  hide(): void;
}

export function Snackbar({
  type,
  content,
  isVisible,
  hide,
  timeout = 3000,
}: iProps) {
  useEffect(() => {
    if (!isVisible) return () => void 0;

    const timer = window.setTimeout(() => {
      hide();
    }, timeout);

    return () => {
      window.clearTimeout(timer);
    };
  }, [timeout, isVisible]);

  switch (type) {
    case 'success': {
      return (
        <div
          className={cn(
            styles.snackbar,
            styles.success,
            isVisible && styles.visible,
          )}
          onClick={hide}
          onTouchStart={hide}
        >
          {content}
        </div>
      );
    }

    case 'fail': {
      return (
        <div
          className={cn(
            styles.snackbar,
            styles.fail,
            isVisible && styles.visible,
          )}
          onClick={hide}
          onTouchStart={hide}
        >
          {content}
        </div>
      );
    }

    default:
      return null;
  }
}
