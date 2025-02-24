"use client";

import { Group, Text } from '@mantine/core';

interface StatBadgeProps {
  icon: string;
  value: string | number;
}

export function StatBadge({ icon, value }: StatBadgeProps) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.16)',
      borderRadius: 20,
      minWidth: 104,
    }}>
      <Group gap="xs" justify="space-between">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px',
        }}>
          <img src={icon} alt="" width={22} height={22}/>
        </div>
        <Text c="white" size="md" style={{marginRight: 12}}>
          {typeof value === 'number' && value >= 10000 
            ? `${(value / 1000).toFixed(1)}k` 
            : value}
        </Text>
      </Group>
    </div>
  );
} 