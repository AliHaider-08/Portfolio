import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  FaBars, FaTimes, FaMoon, FaSun, FaHome,
  FaUser, FaCode, FaBriefcase,
  FaEnvelope, FaGithub, FaLinkedin, FaChevronDown
} from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);
  const controls = useAnimation();

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate on mount
  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    });
  }, [controls]);

  // Dropdown control
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsOpen(false);
  };

  // Navigation links (for Router)
  const navLinks = [
    { name: 'Home', icon: <FaHome />, path: '/' },
    {
      name: 'About',
      icon: <FaUser />,
      dropdown: [
        { name: 'Experience', path: '/experience' },
        { name: 'Education', path: '/education' },
      ]
    },
    {
      name: 'Skills',
      icon: <FaCode />,
      path: '/skills'
    },
    {
      name: 'Projects',
      icon: <FaBriefcase />,
      path: '/projects'
    },
    {
      name: 'Contact',
      icon: <FaEnvelope />,
      path: '/contact'
    }
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/AliHaider-08", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/ali-haider-04baa0373/", label: "LinkedIn" },
  ];

  const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={controls}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-glass-light dark:bg-glass-dark backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink
              to="/"
              onClick={closeAllDropdowns}
              className="text-2xl font-display font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-all"
            >
              <span className="flex items-center">
                <span className="mr-2">🚀</span>
                <span>Ali Haider</span>
              </span>
            </NavLink>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                <div className="flex items-center">
                  <NavLink
                    to={link.path || '#'}
                    className={({ isActive }) => {
                      const isDropdownActive = link.dropdown?.some(item => location.pathname === item.path);
                      const isLinkActive = link.path ? isActive : isDropdownActive;
                      return `relative px-4 py-2 text-sm font-medium flex items-center transition-colors duration-300 ${
                        isLinkActive
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 rounded-full'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-full'
                      }`;
                    }}
                    onClick={() => (link.dropdown ? toggleDropdown(index) : closeAllDropdowns())}
                  >
                    <span className="mr-1">{link.icon}</span>
                    {link.name}
                    {link.dropdown && (
                      <motion.span
                        animate={{ rotate: activeDropdown === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown className="w-3 h-3 ml-1" />
                      </motion.span>
                    )}
                  </NavLink>
                </div>

                {/* Dropdown menu */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="absolute left-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {link.dropdown.map((item, i) => (
                          <NavLink
                            key={i}
                            to={item.path}
                            className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            onClick={closeAllDropdowns}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            {/* Social Links */}
            <div className="flex items-center ml-4 space-x-3 border-l border-gray-200 dark:border-gray-700 pl-4">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`relative p-3 rounded-xl ml-2 overflow-hidden ${
                darkMode
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-yellow-300 shadow-lg shadow-purple-500/30'
                  : 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30'
              } transition-all duration-300`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="md:hidden overflow-hidden bg-glass-light dark:bg-glass-dark backdrop-blur-xl shadow-xl absolute w-full left-0 right-0 z-40 border-b border-gray-200/50 dark:border-gray-700/50"
            style={{ top: '100%' }}
          >
            <motion.div className="px-4 pt-2 pb-6 space-y-1" variants={containerVariants} initial="hidden" animate="visible">
              {navLinks.map((link, index) => (
                <motion.div key={index} variants={itemVariants} className="relative">
                  <NavLink
                    to={link.path || '#'}
                    className={({ isActive }) => {
                      const isDropdownActive = link.dropdown?.some(item => location.pathname === item.path);
                      const isLinkActive = link.path ? isActive : isDropdownActive;
                      return `flex items-center justify-between px-4 py-3 text-base font-medium transition-colors ${
                        isLinkActive
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      } rounded-lg`;
                    }}
                    onClick={() => (link.dropdown ? toggleDropdown(index) : closeAllDropdowns())}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{link.icon}</span>
                      {link.name}
                    </div>
                    {link.dropdown && (
                      <motion.span animate={{ rotate: activeDropdown === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <FaChevronDown className="w-4 h-4" />
                      </motion.span>
                    )}
                  </NavLink>

                  {/* Mobile Dropdown */}
                  {link.dropdown && activeDropdown === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      className="ml-8 mt-1 space-y-1 overflow-hidden"
                    >
                      {link.dropdown.map((item, i) => (
                        <NavLink
                          key={i}
                          to={item.path}
                          className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          onClick={closeAllDropdowns}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Theme Toggle Mobile */}
              <motion.button
                onClick={() => {
                  toggleDarkMode();
                  closeAllDropdowns();
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center gap-3 px-4 py-4 mt-4 text-base font-medium rounded-xl ${
                  darkMode
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg'
                } transition-all duration-300`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={darkMode ? 'light-mode' : 'dark-mode'}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    {darkMode ? (
                      <>
                        <FaSun className="w-5 h-5" />
                        <span>Switch to Light Mode</span>
                      </>
                    ) : (
                      <>
                        <FaMoon className="w-5 h-5" />
                        <span>Switch to Dark Mode</span>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
