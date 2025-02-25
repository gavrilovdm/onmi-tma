"use client";

import { Container } from '@mantine/core';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { PropsWithChildren } from 'react';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Container>
        <header>
          <div style={{height: 60}}></div>
        </header>
      </Container>
      <Container pb={100} >
        {children}
      </Container>
      <BottomNav/>
    </>
  );
} 