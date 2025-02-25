"use client";

import { Group, Text } from '@mantine/core';
import styles from './stat-badge.module.scss';
import Image from 'next/image';

interface StatBadgeProps {
  icon: string;
  value: string | number;
}

export function StatBadge({ icon, value }: StatBadgeProps) {
  return (
    <div className={styles.badge}>
      <Group gap="xs" justify="space-between">
        <div className={styles.iconContainer}>
          <Image src={icon} alt="" width={22} height={22}/>
        </div>
        <Text c="white" size="md" className={styles.value}>
          {typeof value === 'number' && value >= 10000 
            ? `${(value / 1000).toFixed(1)}k` 
            : value}
        </Text>
      </Group>
    </div>
  );
} 