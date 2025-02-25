import '@mantine/core/styles.css';
import '@/styles/globals.scss';
import { ColorSchemeScript } from '@mantine/core';
import { TelegramProvider } from '@/components/providers/telegram-provider';
import { MantineProvider } from '@/components/providers/mantine-provider';
import { RoutePreloader } from '@/components/providers/route-preloader';
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
      <body suppressHydrationWarning className='main-container'>
        <TelegramProvider>
          <MantineProvider>
            <RoutePreloader />
            {children}
          </MantineProvider>
        </TelegramProvider>
      </body>
    </html>
  );
}
