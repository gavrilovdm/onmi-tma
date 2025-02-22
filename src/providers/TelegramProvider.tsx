"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    
    WebApp.expand();
    WebApp.enableClosingConfirmation();
  }, []);

  return (
    <TelegramContext.Provider value={{ webApp: WebApp, ready }}>
      {children}
    </TelegramContext.Provider>
  );
} 