"use client";

import { Stack, Group, Button } from '@mantine/core';
import { GradientBackground } from './components/background/gradient-background';
import { ActionButton } from './components/action-button/action-button';
import { StatBadge } from './components/stat-badge/stat-badge';
import { useState, useEffect } from 'react';
import { CollectButton } from './components/collect-button/collect-button';
import styles from './profile.module.scss';
import { motion } from 'framer-motion';
import { ProgressBar } from './components/progress-bar/progress-bar';
import { InventoryCard } from './components/inventory-card/inventory-card';
import Image from 'next/image';
interface Action {
  label: string;
  icon: string;
  isReady?: boolean;
  timer?: string;
  id: string;
}

const initialActions: Action[] = [
  { label: "Feed", icon: "/icons/feed-icon.svg", isReady: true, id: "feed" },
  { label: "Train", icon: "/icons/train-icon.svg", isReady: true, id: "train" },
  { label: "Sleep", icon: "/icons/sleep-icon.svg", isReady: true, id: "sleep" },
];

const progressBarsData = [
  { icon: "/icons/power.svg", label: "Power", value: 12.2, maxValue: 15 },
  { icon: "/icons/energy.svg", label: "Energy", value: 24.0, maxValue: 25 },
  { icon: "/icons/spell.svg", label: "Spell", value: 33.1, maxValue: 70 },
];

const inventoryData = [
  { type: "hat" as const },
  { type: "top" as const },
  { type: "trouser" as const, imageSrc: "/inventory/trouser.png" },
  { type: "shoes" as const, imageSrc: "/inventory/shoes.png" },
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
      [id]: getTimerDuration(action)
    }));

    setActions(prevActions =>
      prevActions.map(action =>
        action.id === id
          ? { ...action, isReady: false }
          : action
      )
    );
  };

  const getTimerDuration = (action: Action) => {
    return action.id === "feed" ? 5 : action.id === "train" ? 10 : action.id === "sleep" ? 15 : 0;
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
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      >
        <Image src="/character.png" alt="Character" width={500} height={800} 
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '70%',
          objectFit: 'contain',
          transform: 'translateZ(0)'
        }}
        />
      </motion.div>

      {/* Top Stats and Customize Button */}
      <Group justify="space-between" align="flex-start" className={styles.stats}>
        <motion.div
          whileTap={{ scale: 0.95 }}
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
        >
          <Button 
            color={isCustomizeOpen ? styles.primaryBlue : styles.transparentWhite}
            className={styles.customizeButton}
            onClick={toggleCustomize}
          >
            <Image src="/icons/customize-icon.svg" alt="Customize" width={22} height={22} />
          </Button>
        </motion.div>
        <motion.div
          animate={{
            opacity: isCustomizeOpen ? 0 : 1,
            x: isCustomizeOpen ? 50 : 0,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-end', 
            gap: '3px',
            willChange: 'transform, opacity',
            transform: 'translateZ(0)'
          }}
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
        style={{ 
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
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
        style={{ 
          pointerEvents: isCustomizeOpen ? 'auto' : 'none',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      >
        {/* Stats Progress Bars */}
        <Group gap="22px">
          <Group gap="6px" style={{ width: '100%' }}>
            {progressBarsData.map((data, index) => (
              <ProgressBar
                key={index}
                icon={data.icon}
                label={data.label}
                value={data.value}
                maxValue={data.maxValue}
              />
            ))}
          </Group>
          
          {/* Inventory Cards */}
          <Group gap="6px" style={{ width: '100%', justifyContent: 'space-between' }}>
            {inventoryData.map((item, index) => (
              <InventoryCard
                key={index}
                type={item.type}
                imageSrc={item.imageSrc}
              />
            ))}
          </Group>
        </Group>
      </motion.div>
    </>
  );
} 