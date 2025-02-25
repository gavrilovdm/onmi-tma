import { Group, Box, Text, Button } from '@mantine/core';
import styles from './progress-bar.module.scss';

interface ProgressBarProps {
  icon: string;
  label: string;
  value: number;
  maxValue: number;
}

export function ProgressBar({ icon, label, value, maxValue }: ProgressBarProps) {
  const progress = Math.min(Math.max(0, value), maxValue) / maxValue * 100;
  
  return (
    <Box className={styles.container}>
      <Group align="center" className={styles.group}>
        <img src={icon} alt={label} className={styles.icon} />
        <Text className={styles.value}>{value.toFixed(1)}</Text>
        <div className={styles.progressDots}>
            {Array.from({ length: 20 }).map((_, index) => (
                <div 
                key={index} 
                className={`${styles.dot} ${index < progress / 5 ? `${styles.active} ${styles[label.toLowerCase()]}` : ''}`}
                />
            ))}
        </div>
        <Button className={styles.button}>
            Buy
        </Button>
      </Group>
    </Box>
  );
} 