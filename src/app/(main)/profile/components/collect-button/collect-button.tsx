"use client";

import { Text } from '@mantine/core';
import styles from './collect-button.module.scss';
import { motion } from 'framer-motion';

interface CollectButtonProps {
  progress: number;
}

export function CollectButton({ progress }: CollectButtonProps) {
  return (
    <motion.div className={styles.button}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className={styles.progress} 
        style={{ width: `${progress}%` }}
      />
      <Text c="white" fw={500}>
        Collect {progress}%
      </Text>
    </motion.div>
  );
}