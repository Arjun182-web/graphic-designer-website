'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface LayoutTransitionProps {
  children: ReactNode;
}

export default function LayoutTransition({ children }: LayoutTransitionProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  );
}
