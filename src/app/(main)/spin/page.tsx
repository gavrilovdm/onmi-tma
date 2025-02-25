"use client";

import { useState } from 'react';
import { Button } from '@mantine/core';
import styles from './page.module.scss';

export default function SpinPage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const prizes = ['Power +1', 'Energy +1', 'Spell +1', 'Power +2', 'Energy +2', 'Spell +2'];

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // Simulate spinning animation time
    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setResult(randomPrize);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <Button
        fullWidth
        size='xl'
        className={styles.spinButton}
        onClick={handleSpin}
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </Button>
      
      {result && (
        <div className={styles.result}>
          You won: {result}
        </div>
      )}
    </div>
  );
} 