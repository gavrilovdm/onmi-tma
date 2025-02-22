"use client";

import { MantineProvider as BaseMantineProvider, createTheme } from '@mantine/core';
import { PropsWithChildren } from 'react';

const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
});

export function MantineProvider({ children }: PropsWithChildren) {
  return (
    <BaseMantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </BaseMantineProvider>
  );
} 