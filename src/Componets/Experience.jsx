import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBriefcase,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaTimes,
  FaFilter,
  FaSearch,
  FaList,
  FaTh,
  FaStream,
  FaChartBar,
  FaDownload,
  FaRedoAlt,
  FaClock,
  FaAward,
  FaBuilding,
  FaRocket,
  FaCertificate,
} from 'react-icons/fa';

const Experience = () => {
  const [query, setQuery] = useState('');
  const [activeTypes, setActiveTypes] = useState(['Full-time', 'Internship']);
  const [selectedType, setSelectedType] = useState('Full-time');
  const [activeTags, setActiveTags] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [selected, setSelected] = useState(null);
  const [viewMode, setViewMode] = useState('timeline');
  const [showStats, setShowStats] = useState(true);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  const all = useMemo(
    () => [
      {
        id: 'exp-1',
        type: 'Full-time',
        role: 'Full Stack Developer & MERN Stack Trainer',
        company: 'SAT Company (PSEB Internship Program)',
        location: 'Swabi, Pakistan',
        start: '2025-10-01',
        end: null,
        summary: 'Leading development of MERN stack applications and mentoring aspiring developers in HTML, CSS, JavaScript, and React.js through project-based, industry-focused training.',
        achievements: [
          'Led development of MERN stack applications, delivering scalable solutions.',
          'Collaborated with clients to define requirements and align with business goals.',
          'Designed RESTful APIs with Node.js, Express.js, and MongoDB.',
          'Built responsive, high-performance interfaces using React.js and Tailwind CSS.',
          'Mentored students in MERN stack through project-based, industry-focused training.'
        ],
        tags: ['MERN Stack', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Training', 'REST APIs'],
        links: [
          { label: 'Company Website', href: 'https://satsoftwares.com' },
          { label: 'PSEB Program', href: 'https://pseb.org.pk' }
        ]
      },
      {
        id: 'exp-2',
        type: 'Full-time',
        role: 'Web Developer & IT Trainer',
        company: 'Ali Digital Frontier & IT Academy',
        location: 'Swabi, Pakistan',
        start: '2024-12-01',
        end: '2025-07-01',
        summary: 'Trained students in web development technologies and developed secure, scalable back-end services using Node.js, Express.js, and MySQL.',
        achievements: [
          'Trained students in HTML, CSS, JavaScript, and React.js to build dynamic, responsive web applications.',
          'Developed secure, scalable back-end services using Node.js, Express.js, and MySQL (Sequelize ORM).',
          'Designed modern, accessible interfaces with Tailwind CSS, ensuring strong performance.',
          'Delivered project-based training to prepare students for real-world development tasks.',
          'Taught modern web technologies and core programming fundamentals, including C, C++, and Data Structures.'
        ],
        tags: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MySQL', 'Sequelize ORM', 'Tailwind CSS', 'Training'],
        links: [
          { label: 'Academy Website', href: '#' }
        ]
      },
      {
        id: 'exp-3',
        type: 'Internship',
        role: 'MERN Stack Developer',
        company: 'CORVIT System Peshawar',
        location: 'Peshawar, Pakistan',
        start: '2024-08-01',
        end: '2024-11-01',
        summary: 'Completed a trainee internship with focus on MERN stack development, acquiring hands-on experience in constructing dynamic and responsive web applications.',
        achievements: [
          'Completed a trainee internship at Corvit System Peshawar with a focus on MERN stack development.',
          'Acquired hands-on experience in constructing dynamic and responsive web applications.',
          'Refined skills in full-stack development utilizing MongoDB, Express.js, React.js, and Node.js.',
          'Elevated practical skills and professional growth by engaging in real-world project exposure.'
        ],
        tags: ['MERN Stack', 'MongoDB', 'Express.js', 'React.js', 'Node.js', 'Web Development', 'Internship'],
        links: [
          { label: 'Company Website', href: 'https://www.corvit.com.pk' }
        ]
      },
      {
        id: 'exp-4',
        type: 'Internship',
        role: 'CCNA Networking',
        company: 'CECOS University',
        location: 'Peshawar, Pakistan',
        start: '2025-08-01',
        end: '2025-09-01',
        summary: 'Completed a hands-on CCNA workshop covering core networking fundamentals including routing, switching, IP addressing, and subnetting through practical exercises.',
        achievements: [
          'Completed a hands-on CCNA workshop covering core networking fundamentals.',
          'Worked on routing, switching, IP addressing, and subnetting through practical exercises.',
          'Gained experience in network configuration, protocols, and troubleshooting.',
          'Built a strong foundation in Cisco networking concepts and practices.'
        ],
        tags: ['CCNA', 'Networking', 'Cisco', 'Routing', 'Switching', 'IP Addressing', 'Subnetting', 'Network Configuration'],
        links: [
          { label: 'University Website', href: 'https://www.cecos.edu.pk' }
        ]
      }
    ],
    []
  );

  const allTags = useMemo(() => {
    const s = new Set();
    all.forEach((e) => e.tags.forEach((t) => s.add(t)));
    return Array.from(s);
  }, [all]);

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    let items = all.filter((e) => activeTypes.includes(e.type));
    if (activeTags.length) items = items.filter((e) => activeTags.every((t) => e.tags.includes(t)));
    if (text) {
      items = items.filter((e) =>
        [e.role, e.company, e.location, e.summary, ...e.tags, ...e.achievements]
          .join(' ')
          .toLowerCase()
          .includes(text)
      );
    }
    items.sort((a, b) => {
      const da = new Date(a.end || Date.now()).getTime();
      const db = new Date(b.end || Date.now()).getTime();
      return sortBy === 'newest' ? db - da : da - db;
    });
    return items;
  }, [all, query, activeTypes, activeTags, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalJobs = all.length;
    const fullTime = all.filter(e => e.type === 'Full-time').length;
    const internships = all.filter(e => e.type === 'Internship').length;
    const certificates = 0;
    const contracts = all.filter(e => e.type === 'Contract').length;
    
    const totalYears = all.reduce((acc, e) => {
      const start = new Date(e.start);
      const end = e.end ? new Date(e.end) : new Date();
      return acc + (end - start) / (1000 * 60 * 60 * 24 * 365);
    }, 0);
    
    const totalProjects = all.reduce((acc, e) => {
      const projectMatch = e.achievements.join(' ').match(/(\d+)\+?\s*(projects?|features?|applications?)/gi);
      return acc + (projectMatch ? projectMatch.length * 5 : 3);
    }, 0);
    
    const currentRole = all.find(e => !e.end);
    
    return {
      total: totalJobs,
      fullTime,
      internships,
      certificates,
      contracts,
      years: totalYears.toFixed(1),
      projects: totalProjects,
      skills: allTags.length,
      current: currentRole?.role || 'N/A',
      filtered: filtered.length
    };
  }, [all, allTags, filtered]);

  // Sync selectedType with activeTypes
  useEffect(() => {
    setActiveTypes([selectedType]);
  }, [selectedType]);

  const toggleTag = useCallback(
    (t) => setActiveTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])),
    []
  );

  const resetFilters = useCallback(() => {
    setQuery('');
    setActiveTags([]);
    setActiveTypes(['Full-time', 'Internship']);
    setSelectedType('Full-time');
    setSortBy('newest');
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === 'Escape') {
        setSelected(null);
        setIsSearchFocused(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === '/' && !isSearchFocused) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [isSearchFocused]);

  // Export to JSON
  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(filtered, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `experience-${selectedType.toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [filtered, selectedType]);

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Enhanced Header with Title and View Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div className="text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <FaBriefcase className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display gradient-text">Professional Experience</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Career Journey & Professional Growth
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Enhanced View Mode Switcher */}

          </div>

          {/* Enhanced Statistics Dashboard */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className="bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <FaChartBar className="text-white text-sm" />
                      </div>
                      Career Overview
                    </h3>
                    <button
                      onClick={() => setShowStats(false)}
                      className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <FaTimes className="text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                    {[
                      { label: 'Total Roles', value: stats.total, icon: <FaBriefcase />, color: 'from-blue-500 to-blue-600' },
                      { label: 'Full-time', value: stats.fullTime, icon: <FaBuilding />, color: 'from-purple-500 to-purple-600' },
                      { label: 'Internships', value: stats.internships, icon: <FaRocket />, color: 'from-green-500 to-green-600' },
                      { label: 'Certificates', value: stats.certificates, icon: <FaCertificate />, color: 'from-orange-500 to-orange-600' },
                      { label: 'Experience', value: `${stats.years}y`, icon: <FaClock />, color: 'from-cyan-500 to-cyan-600' },
                      { label: 'Technologies', value: stats.skills, icon: <FaAward />, color: 'from-pink-500 to-pink-600' },
                    ].map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 shadow-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all"
                      >
                        <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-3 text-white`}>
                          {stat.icon}
                        </div>
                        <div className="text-2xl font-bold dark:text-white">{stat.value}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                  {filtered.length !== stats.total && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center"
                    >
                      Showing {filtered.length} of {stats.total} positions
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showStats && (
            <motion.button
              onClick={() => setShowStats(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium"
            >
              <FaChartBar /> Show Statistics
            </motion.button>
          )}

          {/* Enhanced Advanced Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl shadow-xl p-6 mb-8 space-y-4 border border-white/20 dark:border-gray-700/50"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start lg:items-center">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <FaFilter className="text-white text-sm" />
                  </div>
                  {[
                    { type: 'Full-time', icon: '💼', color: 'from-emerald-500 to-teal-500' },
                    { type: 'Internship', icon: '🎯', color: 'from-violet-500 to-purple-500' }
                  ].map(({ type: t, icon, color }) => (
                    <motion.button
                      key={t}
                      onClick={() => {
                        setSelectedType(t);
                        setQuery('');
                        setActiveTags([]);
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 font-medium flex items-center gap-2 ${
                        selectedType === t
                          ? `bg-gradient-to-r ${color} text-white border-transparent shadow-lg shadow-emerald-500/20`
                          : 'bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md'
                      }`}
                    >
                      <span>{icon}</span>
                      {t}
                    </motion.button>
                  ))}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 ml-10">
                  Showing <span className="font-bold text-blue-600 dark:text-blue-400">{filtered.length}</span> {selectedType} {filtered.length === 1 ? 'position' : 'positions'}
                </div>
              </div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative flex items-center gap-2"
              >
                <FaSearch className="text-primary absolute left-3 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder={`Search ${selectedType.toLowerCase()} roles, companies, tech...`}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-primary focus:border-transparent transition-all backdrop-blur-sm"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <FaTimes />
                  </button>
                )}
                <AnimatePresence>
                  {isSearchFocused && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3 z-10"
                    >
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        💡 Tip: Search by role, company, location, or technologies
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="flex items-center md:justify-end gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-primary transition-all"
                >
                  <option value="newest">📅 Newest First</option>
                  <option value="oldest">📅 Oldest First</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetFilters}
                  title="Reset all filters"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaRedoAlt />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={exportData}
                  title="Export filtered data"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1 text-sm"
                >
                  <FaDownload />
                  <span className="hidden lg:inline">Export</span>
                </motion.button>
              </div>
            </div>

            {/* Tags with Interactive Hover Effects */}
            <div className="flex flex-wrap gap-2">
              {allTags.map((t) => (
                <motion.button
                  key={t}
                  onClick={() => toggleTag(t)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className={`px-3 py-1 rounded-full text-xs border transition-all duration-300 ${
                    activeTags.includes(t)
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg shadow-blue-500/30"
                      : "bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md"
                  }`}
                >
                  {t}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-primary/50 transform -translate-x-1/2"></div>

              <div className="space-y-8">
                {filtered.length > 0 ? (
                  filtered.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.03 }}
                      className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-gray-900 z-10"></div>
                      
                      {/* Content card */}
                      <div className="w-full md:w-5/12 pl-12 md:pl-4 p-4">
                        <div className="bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20 dark:border-gray-700/50 group">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {item.type === 'Certificates' ? (
                                <FaCertificate className="text-2xl text-primary" />
                              ) : (
                                <FaBriefcase className="text-2xl text-primary" />
                              )}
                              <div>
                                <h3 className="text-xl font-bold font-display group-hover:text-primary transition-colors">{item.role}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{item.company}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => setSelected(item)}
                              className="text-sm px-3 py-1 rounded-md bg-primary text-white hover:opacity-90"
                            >
                              Details
                            </button>
                          </div>

                          <div className="mt-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-300">
                            <span className="inline-flex items-center gap-1"><FaRegCalendarAlt />{new Date(item.start).toLocaleDateString()} — {item.end ? new Date(item.end).toLocaleDateString() : 'Present'}</span>
                            <span className="inline-flex items-center gap-1"><FaMapMarkerAlt />{item.location}</span>
                          </div>

                          {/* Certificate Image */}
                          {item.type === 'Certificates' && item.certificateImage && (
                            <div className="mt-4 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                              <img 
                                src={item.certificateImage} 
                                alt={`${item.role} Certificate`}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          )}

                          {/* Description */}
                          <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {item.description}
                          </p>

                          {/* Tags */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {item.tags.map((tag) => (
                                <span key={tag} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Links */}
                          {item.links && item.links.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-3">
                              {item.links.map((l) => (
                                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                                  {l.label}
                                  <FaExternalLinkAlt />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                      No {selectedType} positions found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Try selecting a different type or adjusting your filters
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 p-4"
                aria-modal="true"
                role="dialog"
              >
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold font-display">{selected.role}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{selected.company} • {selected.type}</p>
                    </div>
                    <button onClick={() => setSelected(null)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                      <FaTimes />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-300">
                    <span className="inline-flex items-center gap-1"><FaRegCalendarAlt />{new Date(selected.start).toLocaleDateString()} — {selected.end ? new Date(selected.end).toLocaleDateString() : 'Present'}</span>
                    <span className="inline-flex items-center gap-1"><FaMapMarkerAlt />{selected.location}</span>
                  </div>

                  {/* Certificate Image in Modal */}
                  {selected.type === 'Certificates' && selected.certificateImage && (
                    <div className="mt-4 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                      <img 
                        src={selected.certificateImage} 
                        alt={`${selected.role} Certificate`}
                        className="w-full h-auto object-contain max-h-96"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <p className="mt-4 text-gray-700 dark:text-gray-300">{selected.summary}</p>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Key Achievements</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      {selected.achievements.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.tags.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {selected.links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                        {l.label}
                        <FaExternalLinkAlt />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
