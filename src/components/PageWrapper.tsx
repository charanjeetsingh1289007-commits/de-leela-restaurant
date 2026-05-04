'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const variants = {
  hidden: { opacity: 0, y: 24 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
