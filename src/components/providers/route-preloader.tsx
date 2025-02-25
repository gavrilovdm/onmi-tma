"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ROUTES_TO_PRELOAD = [
  '/profile',
  '/spin',
  '/market',
  '/inventory',
  '/craft'
];

export function RoutePreloader() {
  const router = useRouter();

  useEffect(() => {
    ROUTES_TO_PRELOAD.forEach(route => {
      router.prefetch(route);
    });
  }, [router]);

  return null;
} 