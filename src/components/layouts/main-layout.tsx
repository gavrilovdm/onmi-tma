"use client";

import { Container } from '@mantine/core';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { PropsWithChildren } from 'react';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Container p="md" pb={100} >
        {children}
      </Container>
      <BottomNav/>
    </>
  );
} 