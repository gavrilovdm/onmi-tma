import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { TelegramProvider } from '../providers/TelegramProvider';

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
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <TelegramProvider>
          <MantineProvider>
            {children}
          </MantineProvider>
        </TelegramProvider>
      </body>
    </html>
  );
}
