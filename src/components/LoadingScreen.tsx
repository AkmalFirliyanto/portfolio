'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: (withMusic: boolean) => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-12 gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Akmalfy
      </motion.h1>
      
      <div className="w-[300px] mb-12">
        <div className="relative h-[2px] bg-gray-800">
          <div className="absolute top-0 left-1/2 h-full overflow-hidden" style={{ width: `${progress}%`, transform: 'translateX(-50%)' }}>
            <motion.div
              className="absolute top-0 left-0 h-full w-full gradient-loading-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
        <div className="mt-2 text-center text-gray-400 text-sm">
          {progress}%
        </div>
      </div>

      <div className="flex gap-4">
        <motion.button
          onClick={() => onComplete(true)}
          disabled={isLoading}
          className={`relative ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          whileHover={!isLoading ? { scale: 1.05 } : {}}
          transition={{ duration: 0.2 }}
        >
          <div className={`px-8 py-3 gradient-border ${!isLoading ? 'hover:bg-transparent' : ''}`}>
            <span className={`
              uppercase tracking-wider text-sm font-medium gradient-text
              ${isLoading ? 'opacity-50' : ''}
            `}>
              {isLoading ? 'Loading...' : 'Start with Music 🎵'}
            </span>
          </div>
        </motion.button>

        <motion.button
          onClick={() => onComplete(false)}
          disabled={isLoading}
          className={`relative ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          whileHover={!isLoading ? { scale: 1.05 } : {}}
          transition={{ duration: 0.2 }}
        >
          <div className={`px-8 py-3 gradient-border ${!isLoading ? 'hover:bg-transparent' : ''}`}>
            <span className={`
              uppercase tracking-wider text-sm font-medium gradient-text
              ${isLoading ? 'opacity-50' : ''}
            `}>
              {isLoading ? 'Loading...' : 'Start without Music 🔇'}
            </span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 