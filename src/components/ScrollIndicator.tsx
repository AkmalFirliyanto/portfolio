'use client';

import { motion } from 'framer-motion';

const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed left-8 top-1/2 -translate-y-1/2 flex items-center gap-4"
    >
      {/* Teks Scroll Down dengan rotasi */}
      <motion.span
        className="text-gray-400 uppercase tracking-widest text-sm font-light"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        animate={{
          translateY: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Scroll Down
      </motion.span>

      {/* Garis Animasi */}
      <motion.div
        className="w-[1px] h-32 bg-gradient-to-b from-purple-500 to-pink-500"
        animate={{
          scaleY: [0.7, 1, 0.7],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default ScrollIndicator; 