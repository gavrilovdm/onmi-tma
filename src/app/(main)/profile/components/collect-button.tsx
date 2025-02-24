import { Text } from '@mantine/core';

export function CollectButton({ progress }: { progress: number }) {
    return (
      <div style={{
        background: '#2B5FF6',
        borderRadius: 32,
        padding: '8px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: `${progress}%`,
          background: 'rgba(255, 255, 255, 0.2)',
        }} />
        <Text c="white" fw={500}>
          Collect {progress}%
        </Text>
      </div>
    );
  }