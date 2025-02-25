"use client";

import { Stack, Group, Button, Box } from '@mantine/core';
import { GradientBackground } from './components/background/gradient-background';
import { ActionButton } from './components/action-button/action-button';
import { StatBadge } from './components/stat-badge/stat-badge';
import { useState, useEffect } from 'react';
import { CollectButton } from './components/collect-button/collect-button';
import styles from './profile.module.scss';
import { motion } from 'framer-motion';

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

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

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

  const toggleCustomize = () => {
    setIsCustomizeOpen(!isCustomizeOpen);
  };

  return (
    <>
      <GradientBackground isCustomizeOpen={isCustomizeOpen} />

      {/* Character Container */}
      <motion.div 
        className={styles.character}
        animate={{
          scale: isCustomizeOpen ? 0.7275 : 1,
          y: isCustomizeOpen ? -60 : 0,
          transition: { duration: 0.3, ease: "easeInOut" }
        }}
      >
        <img src="/character.png" alt="Character" />
      </motion.div>

      {/* Top Stats and Customize Button */}
      <Group justify="space-between" align="flex-start" className={styles.stats}>
        <motion.div
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            color={isCustomizeOpen ? styles.primaryBlue : styles.transparentWhite}
            className={styles.customizeButton}
            onClick={toggleCustomize}
          >
            <img src="/icons/customize-icon.svg" alt="Customize" width={22} height={22} />
          </Button>
        </motion.div>
        <motion.div
          animate={{
            opacity: isCustomizeOpen ? 0 : 1,
            x: isCustomizeOpen ? 50 : 0,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}
        >
          <StatBadge icon="/icons/coin-icon.svg" value={120400} />
          <StatBadge icon="/icons/xp-icon.svg" value={3000} />
        </motion.div>
      </Group>

      {/* Bottom Actions */}
      <motion.div 
        className={styles.actions}
        animate={{
          opacity: isCustomizeOpen ? 0 : 1,
          y: isCustomizeOpen ? 50 : 0,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        style={{ pointerEvents: isCustomizeOpen ? 'none' : 'auto' }}
      >
        <Stack align="center" gap="md">
          <div className={styles.grid}>
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
      </motion.div>

      {/* Customize Panel */}
      <motion.div 
        className={styles.customizePanel}
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: isCustomizeOpen ? 1 : 0,
          y: isCustomizeOpen ? 0 : 50,
          transition: { duration: 0.3, delay: isCustomizeOpen ? 0.2 : 0, ease: "easeOut" }
        }}
        style={{ pointerEvents: isCustomizeOpen ? 'auto' : 'none' }}
      >
        <Box p="xl" bg="rgba(255, 255, 255, 0.1)" style={{ borderRadius: '16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Stack align="center" gap="md">
            <h2 style={{ color: 'white', margin: 0, fontSize: '20px' }}>Customize Your Character</h2>
            <div style={{ width: '100%', height: '1px', background: 'rgba(255, 255, 255, 0.1)' }}></div>
            <p style={{ color: 'white', textAlign: 'center', margin: 0 }}>Customization options will appear here</p>
          </Stack>
        </Box>
      </motion.div>
    </>
  );
} 