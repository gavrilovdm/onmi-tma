import { Box, Text } from '@mantine/core';
import styles from './inventory-card.module.scss';
import { motion } from 'framer-motion';

type ItemType = 'hat' | 'top' | 'trouser' | 'shoes';

interface InventoryCardProps {
  type: ItemType;
  imageSrc?: string;
  onClick?: () => void;
}

export function InventoryCard({ type, imageSrc, onClick }: InventoryCardProps) {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  
  return (
    <motion.div 
      className={styles.container}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <Box className={styles.card}>
        {imageSrc ? (
          <img src={imageSrc} alt={capitalizedType} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <span>+</span>
            <span className={styles.label}>{capitalizedType}</span>
          </div>
        )}
      </Box>
    </motion.div>
  );
} 