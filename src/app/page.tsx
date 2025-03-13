'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import AudioPlayer, { AudioPlayerRef } from '@/components/AudioPlayer';
import StartButton from '@/components/StartButton';
import TaskBar from '@/components/TaskBar';
import ScrollIndicator from '@/components/ScrollIndicator';
import Image from 'next/image';

const welcomeMessages = [
  "Welcome",
  "Selamat Datang",
  "いらっしゃいませ",
  "환영합니다",
  "Bienvenidos",
  "Bienvenue",
  "欢迎光临",
  "مرحباً",
];

function TypewriterWelcome() {
  const [text, setText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentMessage = welcomeMessages[messageIndex];

      if (!isDeleting) {
        if (charIndex < currentMessage.length) {
          setText(currentMessage.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
          setTypingSpeed(150);
        } else {
          setIsDeleting(true);
          setTypingSpeed(100);
        }
      } else {
        if (charIndex > 0) {
          setText(currentMessage.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
          setTypingSpeed(50);
        } else {
          setIsDeleting(false);
          setMessageIndex((messageIndex + 1) % welcomeMessages.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, messageIndex, isDeleting, typingSpeed]);

  return (
    <motion.p 
      className="text-xl text-gray-300 mt-4 min-h-[2em] font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text}
      <span className="animate-blink">|</span>
    </motion.p>
  );
}

function ProfileSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.section
      ref={ref}
      className="min-h-screen w-full flex flex-col items-center justify-center relative py-20 overflow-hidden will-change-transform"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-20%" }}
    >
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        <div className="w-full h-full bg-gradient-to-b from-black via-purple-900/20 to-black" />
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto px-4 text-center"
        style={{ opacity, scale }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-purple-500/50 shadow-lg shadow-purple-500/30">
            <Image
              src="/profile.jpg"
              alt="Profile"
              fill
              quality={95}
              sizes="(max-width: 768px) 100px, 160px"
              className="object-cover hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              About Me
            </h2>

            <p className="text-gray-300 mb-12 leading-relaxed">
              Hi! I&apos;m Akmal Firliyanto, a passionate student who loves to explore and create with technology. I enjoy building various projects like web applications, Discord bots, and automation tools to make life easier. I&apos;m particularly interested in integrating AI into my projects and constantly learning new technologies. While I&apos;m still a student, I&apos;m dedicated to turning my creative ideas into functional solutions.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Things I Love to Work With</h3>
              <ul className="space-y-2">
                <li>Web Development (HTML, CSS, JavaScript)</li>
                <li>React & Next.js</li>
                <li>Discord.js Bot Development</li>
                <li>Tailwind CSS</li>
                <li>TypeScript</li>
                <li>Node.js</li>
                <li>Python</li>
                <li>Firebase</li>
                <li>AI Integration</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

function ProjectSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const projects = [
    {
      title: "AFyForecast",
      description: "AI-powered zodiac and tarot reading website built with Next.js, TailwindCSS, and Mistral API for personalized predictions and insights",
      image: "/project1.png",
      tags: ["React", "Next.js", "TailwindCSS", "typescript", "firebase"],
      link: "https://github.com/AkmalFirliyanto/AFyForecast"
    },
    {
      title: "Tebakan",
      description: "A fun and interactive Discord bot where players guess anime titles from screenshots. Test your anime knowledge across different difficulty levels!",
      image: "/project2.png",
      tags: ["python", "discord.py", "jikan api"],
      link: "https://github.com/AkmalFirliyanto/tebakan"
    },
    {
      title: "Yt Analyzer",
      description: "A web application that enables users to analyze YouTube videos using AI. This app automatically extracts important information and generates summaries from YouTube videos.",
      image: "/project3.png",
      tags: ["youtube api", "Firebase", "Tailwind", "typescript"],
      link: "https://ytanalyzer.vercel.app/"
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="min-h-screen w-full flex flex-col items-center justify-center relative py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-20%" }}
    >
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y }}
      >
        <div className="w-full h-full bg-gradient-to-b from-black via-blue-900/20 to-black" />
      </motion.div>

      <motion.div
        className="max-w-6xl mx-auto px-4"
        style={{ opacity }}
      >
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Latest Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-400">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Details
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/AkmalFirliyanto?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 hover:text-blue-300 transition-all duration-300 group"
          >
            <span className="mr-2">View More Projects</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function ContactSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const contacts = [
    {
      platform: "Email",
      value: "akmalfirliyanto@gmail.com",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      link: "mailto:akmalfirliyanto@gmail.com"
    },
    {
      platform: "LinkedIn",
      value: "akmal firliyanto",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      link: "https://www.linkedin.com/in/akmal-firliyanto-2a299b217/"
    },
    {
      platform: "GitHub",
      value: "akmal firliyanto",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
      link: "https://github.com/AkmalFirliyanto"
    },
    {
      platform: "Discord",
      value: "akmalfy",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
      link: "discord://akmalfy"
    },
    {
      platform: "Instagram",
      value: "@akmlfy_",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
        </svg>
      ),
      link: "https://www.instagram.com/akmlfy_/?__pwa=1"
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="min-h-screen w-full flex flex-col items-center justify-center relative py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-20%" }}
    >
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y }}
      >
        <div className="w-full h-full bg-gradient-to-b from-black via-purple-900/20 to-black" />
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto px-4 text-center"
        style={{ opacity }}
      >
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Let's Connect
        </h2>

        <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
          Interested in collaboration or have any questions? Feel free to reach out through any of these platforms:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.slice(0, 3).map((contact, index) => (
            <motion.a
              key={contact.platform}
              href={contact.link}
          target="_blank"
          rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex items-center p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl hover:bg-gray-800/50 transition-all duration-300 w-full"
            >
              <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover:text-purple-300 transition-colors flex-shrink-0">
                {contact.icon}
              </div>
              <div className="ml-4 text-left overflow-hidden">
                <p className="text-sm text-gray-400">{contact.platform}</p>
                <p className="text-gray-300 group-hover:text-purple-400 transition-colors truncate">
                  {contact.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mt-6">
          {contacts.slice(3).map((contact, index) => (
            <motion.a
              key={contact.platform}
              href={contact.link}
          target="_blank"
          rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
              className="group flex items-center p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl hover:bg-gray-800/50 transition-all duration-300 w-full"
            >
              <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover:text-purple-300 transition-colors flex-shrink-0">
                {contact.icon}
              </div>
              <div className="ml-4 text-left overflow-hidden">
                <p className="text-sm text-gray-400">{contact.platform}</p>
                <p className="text-gray-300 group-hover:text-purple-400 transition-colors truncate">
                  {contact.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const scrollDuration = Math.min(2.0, 1.0 + (window.pageYOffset / 10000)); // Durasi dinamis berdasarkan jarak scroll
    const scrollHeight = window.pageYOffset;
    const frameRate = 1000 / 60;
    const totalFrames = scrollDuration * (1000 / frameRate);
    
    let frame = 0;
    
    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      const ease = easeOutExpo(progress);
      
      const currentPosition = scrollHeight - (scrollHeight * ease);
      window.scrollTo(0, currentPosition);
      
      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Fungsi easing yang lebih smooth
  const easeOutExpo = (x: number): number => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-24 right-8 z-50 p-3 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/50 text-purple-400 hover:text-purple-300 hover:bg-purple-500/30 transition-all duration-500 shadow-lg"
          initial={{ opacity: 0, scale: 0.6, y: 50 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
              mass: 1.2
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.6, 
            y: 50,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
              mass: 1.2
            }
          }}
          whileHover={{ 
            scale: 1.15,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
              mass: 1.2
            }
          }}
          whileTap={{ 
            scale: 0.85,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
              mass: 1.2
            }
          }}
        >
          <motion.div
            animate={{ 
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [showStart, setShowStart] = useState(true);
  const [withoutMusic, setWithoutMusic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioPlayerRef = useRef<AudioPlayerRef>(null);

  const handleStartWithMusic = () => {
    setShowStart(false);
    setWithoutMusic(false);
    setTimeout(() => {
      setIsLoading(false);
      if (audioPlayerRef.current) {
        audioPlayerRef.current.startMusic();
      }
    }, 2000);
  };

  const handleStartWithoutMusic = () => {
    setShowStart(false);
    setWithoutMusic(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white overflow-x-hidden">
      <AnimatePresence>
        {showStart ? (
          <StartButton 
            onStartWithMusic={handleStartWithMusic}
            onStartWithoutMusic={handleStartWithoutMusic}
          />
        ) : (
          <>
            {isLoading ? (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 fixed top-0 left-0"
              />
            ) : (
              <>
                <section className="min-h-screen w-full flex flex-col items-center justify-center p-24">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center relative"
                  >
                    <div className="relative">
                      <h1 
                        className="text-[150px] font-bold uppercase tracking-tighter gradient-text"
                        style={{ 
                          fontFamily: "'Bebas Neue', sans-serif"
                        }}
                      >
                        Akmalfy
                      </h1>
                    </div>
                    <TypewriterWelcome />
                  </motion.div>
                  <ScrollIndicator />
                </section>

                <ProfileSection />
                <ProjectSection />
                <ContactSection />
                <ScrollToTop />
              </>
            )}

            {!isLoading && (
              <TaskBar audioControls={<AudioPlayer withoutMusic={withoutMusic} ref={audioPlayerRef} />} />
            )}
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
