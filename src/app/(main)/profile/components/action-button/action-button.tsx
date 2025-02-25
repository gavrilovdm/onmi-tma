"use client"

import { Text } from '@mantine/core';
import styles from './action-button.module.scss';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface ActionButtonProps {
  label: string;
  icon: string;
  isReady?: boolean;
  timer?: string;
  onClick?: () => void;
}

export function ActionButton({ label, icon, isReady, timer, onClick }: ActionButtonProps) {
  return (
    <motion.div className={styles.button} onClick={onClick} whileTap={{ scale: isReady ? 0.95 : 1 }}>
      <div className={clsx(styles.container, isReady ? styles.ready : styles.disabled)}>
        <img src={icon} alt={label} width={24} height={24} className={styles.icon} />
        <Text c="white" size="sm" className={styles.label}>{label}</Text>
        {timer && (
          <Text c="white" className={styles.timer}>{timer}</Text>
        )}
        {isReady && (
          <Text c="white" className={styles.readyLabel}>Ready</Text>
        )}
      </div>
    </motion.div>
  );
}

