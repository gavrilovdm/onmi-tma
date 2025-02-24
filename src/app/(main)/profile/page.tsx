"use client";

import { Stack, Flex, Group, Button } from '@mantine/core';
import { GradientBackground } from '@/components/background/gradient-background';
import { ActionButton } from './components/action-button';
import { StatBadge } from './components/stat-badge';
import { useState, useEffect } from 'react';
import { CollectButton } from './components/collect-button';

interface Action {
  label: string;
  icon: string;
  isReady?: boolean;
  timer?: string;
  id: string;
}

const TIMER_DURATION = 5;

const initialActions: Action[] = [
  { label: "Feed", icon: "/icons/feed-icon.svg", isReady: true, id: "feed" },
  { label: "Train", icon: "/icons/train-icon.svg", isReady: true, id: "train" },
  { label: "Sleep", icon: "/icons/sleep-icon.svg", isReady: true, id: "sleep" },
];

export default function ProfilePage() {
  const [actions, setActions] = useState<Action[]>(initialActions);
  const [timers, setTimers] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => {
        const newTimers = { ...prevTimers };
        const expiredTimers: string[] = [];

        // Проверяем все таймеры
        Object.entries(prevTimers).forEach(([id, timeLeft]) => {
          if (timeLeft <= 1) { // Изменено с 0 на 1
            expiredTimers.push(id);
          } else {
            newTimers[id] = timeLeft - 1;
          }
        });

        // Если есть истекшие таймеры, обновляем действия
        if (expiredTimers.length > 0) {
          setActions(prevActions =>
            prevActions.map(action =>
              expiredTimers.includes(action.id)
                ? { ...action, isReady: true, timer: undefined }
                : action
            )
          );
          
          // Удаляем истекшие таймеры
          expiredTimers.forEach(id => delete newTimers[id]);
        }

        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (id: string) => {
    const action = actions.find(a => a.id === id);
    if (!action?.isReady) return;

    setTimers(prev => ({
      ...prev,
      [id]: TIMER_DURATION
    }));

    setActions(prevActions =>
      prevActions.map(action =>
        action.id === id
          ? { ...action, isReady: false }
          : action
      )
    );
  };

  // Форматирование времени в формат MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <GradientBackground />

      {/* Character Container */}
      <div style={{
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%, -18%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      }}>
        <img
          src="/character.png"
          alt="Character"
          style={{
            maxHeight: '70%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Top Stats */}
      <Group justify="space-between" align="flex-start">
        <Button 
          color="rgba(255, 255, 255, 0.16)" 
          p={0}
          style={{borderRadius: 16, width: 55, height: 55}}
        >
          <img src="/icons/customize-icon.svg" alt="Customize" width={22} height={22} />
        </Button>
        <Flex
          gap="3px"
          align="flex-end"
          direction="column"
          wrap="wrap"
          style={{ position: 'relative', zIndex: 2 }}>
          <StatBadge icon="/icons/coin-icon.svg" value={120400} />
          <StatBadge icon="/icons/xp-icon.svg" value={3000} />
        </Flex>
      </Group>

      {/* Bottom Actions */}
      <div style={{
        position: 'fixed',
        bottom: 100,
        left: 0,
        right: 0,
        zIndex: 2,
      }}>
        <Stack align="center" gap="md">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 7,
            padding: '0 16px',
            width: '100%',
            margin: '0 auto',
          }}>
            {actions.map((action) => (
              <ActionButton
                key={action.id}
                label={action.label}
                icon={action.icon}
                isReady={action.isReady}
                timer={timers[action.id] ? formatTime(timers[action.id]) : action.timer}
                onClick={() => handleClick(action.id)}
              />
            ))}
          </div>
          <CollectButton progress={32} />
        </Stack>
      </div>
    </>
  );
} 