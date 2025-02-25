"use client";

import styles from './gradient-background.module.scss';
import { motion } from 'framer-motion';

interface GradientBackgroundProps {
  isCustomizeOpen?: boolean;
}

export function GradientBackground({ isCustomizeOpen }: GradientBackgroundProps) {
  return (
    <motion.div 
      className={styles.background}
      animate={{
        bottom: isCustomizeOpen ? '30%' : '15%',
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
    />
  );
} 