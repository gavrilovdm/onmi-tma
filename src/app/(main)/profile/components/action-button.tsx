"use client"

import { Pill, Stack, Text } from '@mantine/core';

interface ActionButtonProps {
  label: string;
  icon: string;
  isReady?: boolean;
  timer?: string;
  onClick?: () => void;
}

export function ActionButton({ label, icon, isReady, timer, onClick }: ActionButtonProps) {
  return (
    <div 
      onClick={onClick}
      style={{ 
        flex: '1 1 0',
        maxWidth: '115px',
        maxHeight: '115px',
      }}
    >
      <div style={{
        background: isReady ? 'rgba(51, 120, 255, 0.41)' : 'rgba(255, 255, 255, 0.16)',
        borderRadius: 23,
        padding: 18,
        aspectRatio: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <img src={icon} alt={label} width={24} height={24} style={{ marginBottom: 4 }} />
        <Text c="white" size="sm" style={{ marginBottom: 'auto' }}>{label}</Text>
        {timer && (
          <Pill size="xs" c="white" bg="black">{timer}</Pill>
        )}
        {isReady && (
          <Pill size="xs" c="white" bg="rgb(51, 76, 255)">Ready</Pill>
        )}
      </div>
    </div>
  );
}

