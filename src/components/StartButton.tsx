'use client';

import { motion } from 'framer-motion';

interface StartButtonProps {
  onStartWithMusic: () => void;
  onStartWithoutMusic: () => void;
}

const StartButton = ({ onStartWithMusic, onStartWithoutMusic }: StartButtonProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        onClick={onStartWithMusic}
        className="px-8 py-3 border-2 border-purple-500 text-purple-500 hover:text-white hover:bg-purple-500 rounded-lg font-medium transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start With Music
      </motion.button>
      
      <motion.button
        onClick={onStartWithoutMusic}
        className="text-gray-400 hover:text-gray-200 underline underline-offset-4 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Without Music
      </motion.button>
    </div>
  );
};

export default StartButton; 