'use client';

import { useRef } from 'react';
import { useStore } from '@/store';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);
  
  if (!initialized.current) {
    initialized.current = true;
    useStore.getState();
  }

  return <>{children}</>;
} 