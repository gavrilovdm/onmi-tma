"use client";

import WebApp from '@twa-dev/sdk';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

interface TelegramContextType {
  webApp: typeof WebApp | null;
  ready: boolean;
}

const TelegramContext = createContext<TelegramContextType>({
  webApp: null,
  ready: false,
});

export const useTelegram = () => useContext(TelegramContext);

export function TelegramProvider({ children }: PropsWithChildren) {
  const [webApp, setWebApp] = useState<typeof WebApp | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initWebApp = async () => {
      try {
        // Динамический импорт SDK только на клиенте
        const WebApp = (await import('@twa-dev/sdk')).default;
        setWebApp(WebApp);
        WebApp.ready();
        setReady(true);
        
        WebApp.expand();
        WebApp.enableClosingConfirmation();
      } catch (error) {
        console.error('Failed to initialize Telegram Web App:', error);
      }
    };

    initWebApp();
  }, []);

  return (
    <TelegramContext.Provider value={{ webApp, ready }}>
      {children}
    </TelegramContext.Provider>
  );
} 