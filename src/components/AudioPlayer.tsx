'use client';

import { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  withoutMusic?: boolean;
}

export interface AudioPlayerRef {
  startMusic: () => void;
}

// Menggunakan musik lokal dari folder public dengan parameter versi
const MUSIC_URL = '/background-music.mp3';

const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(function AudioPlayer({ withoutMusic = false }, ref) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [volume, setVolume] = useState(0.15);
  const [showVolume, setShowVolume] = useState(false);

  // Inisialisasi audio
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      try {
        const audio = new Audio();
        audio.src = MUSIC_URL;
        audio.loop = true;
        audio.volume = volume;
        audio.preload = 'auto';
        
        // Set status awal
        setIsMuted(withoutMusic);
        audio.muted = withoutMusic;

        // Event listeners untuk status pemutaran
        audio.addEventListener('play', () => {
          console.log('Audio play event');
          setIsPlaying(true);
          setErrorMessage('');
        });

        audio.addEventListener('playing', () => {
          console.log('Audio playing event');
          setIsPlaying(true);
          setErrorMessage('');
        });

        audio.addEventListener('pause', () => {
          console.log('Audio pause event');
          setIsPlaying(false);
        });

        audio.addEventListener('ended', () => {
          console.log('Audio ended event');
          setIsPlaying(false);
        });

        audioRef.current = audio;

        // Auto-play jika withoutMusic false
        if (!withoutMusic) {
          audio.play().catch((error) => {
            console.log('Auto-play failed:', error);
          });
        }
      } catch (error) {
        console.error('Error initializing audio:', error);
        setErrorMessage('Gagal menginisialisasi audio');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    }

    return () => {
      if (audioRef.current) {
        const audio = audioRef.current;
        audio.removeEventListener('play', () => {});
        audio.removeEventListener('playing', () => {});
        audio.removeEventListener('pause', () => {});
        audio.removeEventListener('ended', () => {});
        audio.pause();
        audio.src = '';
        audioRef.current = null;
      }
    };
  }, [withoutMusic, volume]);

  // Handle volume changes dalam useEffect terpisah
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useImperativeHandle(ref, () => ({
    startMusic: () => {
      if (audioRef.current) {
        const audio = audioRef.current;
        audio.muted = false;
        setIsMuted(false);
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setErrorMessage('');
          })
          .catch((error) => {
            console.log('Error playing music:', error);
            setErrorMessage('Klik tombol musik untuk memulai');
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
          });
      }
    }
  }));

  const toggleMute = () => {
    if (!audioRef.current) {
      setErrorMessage('Musik sedang dimuat...');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }

    const audio = audioRef.current;
    
    if (!isPlaying || audio.paused) {
      audio.muted = false;
      setIsMuted(false);
      audio.play()
        .then(() => {
          console.log('Successfully started playing');
          setIsPlaying(true);
          setErrorMessage('');
        })
        .catch((error) => {
          console.log('Error playing music:', error);
          setErrorMessage('Gagal memutar musik');
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 3000);
        });
    } else {
      const newMutedState = !audio.muted;
      audio.muted = newMutedState;
      setIsMuted(newMutedState);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleMouseEnter = () => {
    if (!audioRef.current) return;
    setShowVolume(true);
  };

  const handleMouseLeave = () => {
    setShowVolume(false);
  };

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {errorMessage || (isMuted ? 'Music muted' : 'Music playing')}
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="flex items-center gap-4"
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence>
          {showVolume && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="volume-controls bg-gray-900/60 backdrop-blur-sm p-2 rounded-lg"
              onMouseEnter={() => setShowVolume(true)}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10B981 0%, #10B981 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          onClick={toggleMute}
          onMouseEnter={handleMouseEnter}
          className="music-button p-2 rounded-full bg-gray-900/60 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: isPlaying ? [0, 5, -5, 0] : 0
          }}
          transition={{
            duration: 0.5,
            repeat: isPlaying ? Infinity : 0,
            repeatDelay: 2
          }}
        >
          <span className="text-lg">
            {isMuted ? '🔇' : isPlaying ? '🔊' : '🎵'}
          </span>
        </motion.button>
      </div>
    </>
  );
});

export default AudioPlayer; 