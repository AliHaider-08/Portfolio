import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaFileDownload, FaArrowRight, FaCode, FaRocket, FaAward, FaTrophy, FaNodeJs } from 'react-icons/fa';
import { HiOutlineMail, HiSparkles, HiChip } from 'react-icons/hi';
import { SiReact, SiJavascript, SiTailwindcss } from 'react-icons/si';
import { useState, useEffect } from 'react';
import profileImage from '../Images/Ali.jpeg';

const HeroSection = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  const techIcons = [
    { icon: <SiReact />, color: 'text-cyan-400' },
    { icon: <SiJavascript />, color: 'text-yellow-400' },
    { icon: <SiTailwindcss />, color: 'text-cyan-500' },
    { icon: <FaNodeJs />, color: 'text-green-500' },
    { icon: <HiChip />, color: 'text-purple-400' },
  ];

  const achievements = [
    { icon: <FaTrophy />, value: '50+', label: 'Projects Delivered', color: 'text-yellow-500' },
    { icon: <FaAward />, value: '5.0', label: 'Client Rating', color: 'text-blue-500' },
    { icon: <FaRocket />, value: '3+', label: 'Years Experience', color: 'text-purple-500' },
  ];

  const socialLinks = [
    { 
      icon: <FaGithub />, 
      url: "https://github.com/AliHaider-08/", 
      label: "GitHub" 
    },
    { 
      icon: <FaLinkedin />, 
      url: "https://www.linkedin.com/in/ali-haider-04baa0373/", 
      label: "LinkedIn" 
    },
    { 
      icon: <HiOutlineMail />, 
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=alihaiderkhan083@gmail.com", 
      label: "Email" 
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      } 
    },
  };

  return (
    <section id="home" className="min-h-screen pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 
    sm:pb-20 flex justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30 
    overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        
        {techIcons.map((tech, index) => (
          <motion.div
            key={index}
            className={`absolute ${tech.color} opacity-20 cursor-pointer`}
            initial={{ 
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              rotate: 0,
              scale: 0.8
            }}
            animate={{
              x: [Math.random() * windowSize.width, Math.random() * windowSize.width],
              y: [Math.random() * windowSize.height, Math.random() * windowSize.height],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            whileHover={{
              scale: 1.5,
              opacity: 0.4,
              rotate: 45,
              transition: { duration: 0.3 }
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              fontSize: `${1.5 + Math.random() * 1.5}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: `blur(${Math.random() * 2}px)`
            }}
          >
            {tech.icon}
          </motion.div>
        ))}
        
        <motion.div 
          className="absolute top-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 -left-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-400 to-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [-20, 20, -20],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[70vh]">
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left space-y-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="inline-block">
              <motion.div 
                className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-full backdrop-blur-sm border border-blue-300 dark:border-blue-700 shadow-lg hover:shadow-xl"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <HiSparkles className="text-yellow-300 animate-pulse" />
                  <span>Full Stack Developer</span>
                  <motion.div 
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.h1 
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-gray-900 dark:text-white leading-tight"
            >
              Hi, I'm <br />
              <motion.span 
                className="gradient-text inline-block"
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
                }}
                transition={{ duration: 0.3 }}
              >
                Ali Haider
              </motion.span>
            </motion.h1>

            <motion.div variants={item} className="h-16 sm:h-20 mb-6">
              <TypeAnimation
                sequence={[
                  '🚀 I build things for the web',
                  2000,
                  '💡 I love solving problems',
                  2000,
                  '✨ I create amazing experiences',
                  2000,
                  '🎯 I turn ideas into reality',
                  2000,
                  '⚡ I optimize for performance',
                  2000,
                ]}
                wrapper="div"
                speed={50}
                className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium"
                repeat={Infinity}
              />
            </motion.div>

            <motion.p 
              variants={item}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Passionate Full-Stack Developer crafting exceptional digital experiences with cutting-edge technologies. 
              Specialized in React, Node.js, and modern web architectures with a focus on performance and user experience.
            </motion.p>

            <motion.div 
              variants={item}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-3 sm:p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl border border-white/30 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`text-2xl sm:text-3xl mb-2 ${achievement.color}`}>{achievement.icon}</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">{achievement.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">{achievement.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={item}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.a
                href="/resume.pdf"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                download
              >
                <FaFileDownload className="mr-2 group-hover:animate-bounce" />
                Download CV
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
             
                className="flex items-center justify-center px-8 py-4 text-base font-semibold text-purple-600 dark:text-purple-400 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200 dark:border-purple-700/50"
              >
                <HiOutlineMail className="mr-2 group-hover:animate-pulse" />
                Get In Touch
              </motion.a>
            </motion.div>

            <motion.div 
              variants={item}
              className="mt-8"
            >
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 tracking-wider uppercase">
                Connect With Me
              </p>
              <div className="flex justify-center lg:justify-start space-x-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 text-xl text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-300 hover:-translate-y-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700 hover:shadow-xl hover:bg-white dark:hover:bg-gray-800"
                    aria-label={link.label}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
              }
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 group">
              <div className="absolute inset-0">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-blue-200 dark:border-blue-800"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.1, 0.3],
                      rotate: [0, 180],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                    style={{
                      transform: `scale(${1 + i * 0.15})`,
                    }}
                  />
                ))}
              </div>
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="relative w-full h-full rounded-full p-2 
              bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 
              group-hover:shadow-2xl transition-all duration-500 relative bottom-18">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <motion.img
                    src={profileImage}
                    alt="Ali Haider"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
              
              <motion.div
                className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-gradient-to-r from-green-400 to-green-600 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="hidden sm:inline">Available for Work</span>
                <span className="sm:hidden">Available</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-3 sm:px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaCode className="text-blue-500" />
                  <span className="hidden sm:inline">React Expert</span>
                  <span className="sm:hidden">React</span>
                </div>
              </motion.div>
              
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;