"use client";

import { Text } from '@mantine/core';
import styles from './collect-button.module.scss';

interface CollectButtonProps {
  progress: number;
}

export function CollectButton({ progress }: CollectButtonProps) {
  return (
    <div className={styles.button}>
      <div 
        className={styles.progress} 
        style={{ width: `${progress}%` }}
      />
      <Text c="white" fw={500}>
        Collect {progress}%
      </Text>
    </div>
  );
}