import '@mantine/core/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import { TelegramProvider } from '@/components/providers/telegram-provider';
import { MantineProvider } from '@/components/providers/mantine-provider';
import { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export const metadata = {
  title: 'Telegram Mini App',
  description: 'A modern Telegram Mini App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body suppressHydrationWarning>
        <TelegramProvider>
          <MantineProvider>
            {children}
          </MantineProvider>
        </TelegramProvider>
      </body>
    </html>
  );
}
