import { useMemo, useEffect, useCallback, lazy, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEducationState } from '../hooks/useEducationAtoms';
import {
  FaGraduationCap,
  FaUniversity,
  FaCertificate,
  FaRegCalendarAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaFilter,
  FaTimes,
  FaExternalLinkAlt,
  FaRedoAlt,
  FaList,
  FaTh,
  FaStream,
  FaChartBar,
  FaDownload,
  FaAward,
  FaClock,
  FaStar,
  FaCode,
} from "react-icons/fa";

// Lazy load Modal to reduce initial bundle size
const EducationModal = lazy(() => import("./EducationModal"));

const useFilteredEducation = (all, query, activeTypes, activeTags, sortBy) => {
  return useMemo(() => {
    const text = query.trim().toLowerCase();
    let items = all.filter((e) => activeTypes.includes(e.type));
    if (activeTags.length) items = items.filter((e) => activeTags.every((t) => e.tags.includes(t)));
    if (text) {
      items = items.filter((e) =>
        [e.title, e.institution, e.location, e.summary, ...e.tags, ...(e.achievements || [])]
          .join(" ")
          .toLowerCase()
          .includes(text)
      );
    }
    items.sort((a, b) => {
      const da = new Date(a.end || Date.now()).getTime();
      const db = new Date(b.end || Date.now()).getTime();
      return sortBy === "newest" ? db - da : da - db;
    });
    return items;
  }, [all, query, activeTypes, activeTags, sortBy]);
};

const Education = () => {
  const {
    query,
    setQuery,
    activeTypes,
    setActiveTypes,
    selectedType,
    setSelectedType,
    activeTags,
    setActiveTags,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    showStats,
    setShowStats,
    selected,
    setSelected,
    isSearchFocused,
    setIsSearchFocused,
    toggleTag,
    resetFilters
  } = useEducationState();
  const searchInputRef = useRef(null);

  // Static education data (you can later fetch from JSON or API)
  const all = useMemo(
    () => [
      {
        id: "edu-1",
        type: "Degree",
        title: "Bachelor of Science - Software Engineering",
        institution: "CECOS University Peshawar",
        location: "Peshawar, Pakistan",
        start: "2021-10-01",
        end: "2025-07-01",
        gpa: "3.02/4.0",
        summary: "Bachelor's degree in Software Engineering with focus on modern web development, programming fundamentals, and software engineering practices.",
        achievements: [
          "Completed comprehensive coursework in Software Engineering, Web Development, and Computer Networking.",
          "Developed multiple full-stack projects using modern technologies.",
          "Gained strong foundation in programming and software development principles."
        ],
        tags: ["Software Engineering", "Web Development", "Computer Networking", "Programming"],
        links: [{ label: "University", href: "https://www.cecos.edu.pk/" }],
      },
      {
        id: "edu-2",
        type: "Certification",
        title: "Advance Web Development",
        institution: "NAVTAC Peshawar Pakistan",
        location: "Peshawar, Pakistan",
        start: "2025-04-01",
        end: "2025-07-01",
        summary: "Advanced Web Development training covering modern web technologies, frameworks, and best practices for building scalable web applications.",
        achievements: [
          "Mastered advanced web development concepts and modern frameworks.",
          "Built real-world projects with industry-standard technologies.",
          "Developed expertise in responsive design and performance optimization."
        ],
        tags: ["Web Development", "React.js", "Node.js", "Express.js", "MongoDB", "Advanced Development"],
        links: [{ label: "Institution", href: "#" }],
      },
      {
        id: "edu-3",
        type: "Certification",
        title: "MERN Stack Development",
        institution: "CORVIT System Peshawar",
        location: "Peshawar, Pakistan",
        start: "2024-08-01",
        end: "2024-10-31",
        summary: "Comprehensive MERN Stack Development training covering MongoDB, Express.js, React.js, and Node.js for full-stack web development.",
        achievements: [
          "Completed intensive MERN stack training program.",
          "Built multiple full-stack applications using MERN technologies.",
          "Gained hands-on experience in real-world project development."
        ],
        tags: ["MERN Stack", "MongoDB", "Express.js", "React.js", "Node.js", "Full-Stack Development"],
        links: [{ label: "Course", href: "#" }],
      },
      {
        id: "edu-4",
        type: "Certification",
        title: "AWS Cloud Foundation",
        institution: "AWS Academy United States",
        location: "Online",
        start: "2025-01-01",
        end: "2025-02-28",
        summary: "AWS Cloud Foundations course covering core cloud computing concepts, AWS services, and cloud architecture principles.",
        achievements: [
          "Learned fundamental AWS cloud concepts and services.",
          "Understanding of cloud architecture and best practices.",
          "Hands-on experience with AWS management console and core services."
        ],
        tags: ["AWS", "Cloud Computing", "Cloud Foundation", "AWS Services"],
        links: [{ label: "Certificate", href: "#" }],
      },
      {
        id: "edu-5",
        type: "Certification",
        title: "Cisco Certified Network Associate",
        institution: "CECOS University Peshawar",
        location: "Peshawar, Pakistan",
        start: "2025-08-01",
        end: "2025-09-30",
        summary: "CCNA certification training covering networking fundamentals, routing, switching, and network security using Cisco technologies.",
        achievements: [
          "Completed hands-on CCNA training covering core networking fundamentals.",
          "Gained practical experience in routing, switching, and network configuration.",
          "Developed strong foundation in Cisco networking concepts and practices."
        ],
        tags: ["CCNA", "Networking", "Cisco", "Routing", "Switching", "Network Security"],
        links: [{ label: "University", href: "https://www.cecos.edu.pk" }]
      },
      {
        id: "edu-6",
        type: "Course",
        title: "Python Foundation Course",
        institution: "CECOS University",
        location: "Peshawar, Pakistan",
        start: "2024-07-01",
        end: "2024-08-15",
        summary: "Completed the Python Foundation Course at CECOS University, gaining a solid understanding of Python programming fundamentals and practical skills for software development and automation.",
        achievements: [
          "Learned core Python concepts including data types, control structures, functions, and object-oriented programming.",
          "Worked on small projects involving file handling, data manipulation, and simple algorithms.",
          "Explored popular Python libraries such as NumPy and Pandas for data handling.",
          "Practiced debugging, exception handling, and writing clean, efficient code.",
          "Developed a strong foundation for advanced topics like web development and data science."
        ],
        tags: ["Python", "Programming Fundamentals", "OOP", "Problem Solving", "Data Structures"],
        links: [{ label: "University", href: "https://www.cecos.edu.pk" }]
      }


    ],
    []
  );

  const allTags = useMemo(() => {
    const relevantItems = all.filter(e => activeTypes.includes(e.type));
    return Array.from(new Set(relevantItems.flatMap((e) => e.tags)));
  }, [all, activeTypes]);
  const filtered = useFilteredEducation(all, query, activeTypes, activeTags, sortBy);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalItems = all.length;
    const degrees = all.filter(e => e.type === "Degree").length;
    const certifications = all.filter(e => e.type === "Certification").length;
    const courses = all.filter(e => e.type === "Course").length;
    const totalYears = all.reduce((acc, e) => {
      const start = new Date(e.start);
      const end = e.end ? new Date(e.end) : new Date();
      return acc + (end - start) / (1000 * 60 * 60 * 24 * 365);
    }, 0);
    const avgGPA = all.filter(e => e.gpa).reduce((acc, e) => acc + parseFloat(e.gpa), 0) / all.filter(e => e.gpa).length;
    const totalTags = allTags.length;
    
    return {
      total: totalItems,
      degrees,
      certifications,
      courses,
      years: totalYears.toFixed(1),
      avgGPA: avgGPA ? avgGPA.toFixed(2) : null,
      tags: totalTags,
      filtered: filtered.length
    };
  }, [all, allTags, filtered]);

  useEffect(() => {
    setActiveTypes([selectedType]);
    setActiveTags([]); // Reset tags when type changes to prevent empty states
  }, [selectedType, setActiveTypes, setActiveTags]);

  const iconFor = (k) => {
    switch (k) {
      case "Degree":
        return <FaUniversity className="text-2xl text-primary" />;
      case "Certification":
        return <FaCertificate className="text-2xl text-primary" />;
      default:
        return <FaGraduationCap className="text-2xl text-primary" />;
    }
  };

  const techDescriptions = {
    "React.js": "A powerful JavaScript library for building dynamic and interactive user interfaces.",
    "Node.js": "A JavaScript runtime built on Chrome's V8 engine, perfect for building scalable network applications.",
    "JavaScript": "The core language of the web, enabling interactive and dynamic behavior on modern websites.",
    "Tailwind CSS": "A utility-first CSS framework for rapidly building custom, modern user interfaces.",
    "MongoDB": "A flexible NoSQL database that offers high performance, high availability, and easy scalability.",
    "Express.js": "A minimal and flexible Node.js web application framework that provides a robust set of features.",
    "Python": "A high-level programming language known for its simplicity and versatility in web and data science.",
    "MERN Stack": "A full-stack architecture using MongoDB, Express.js, React, and Node.js for rapid development.",
    "Web Development": "The process of building websites and applications for the internet.",
    "Computer Networking": "The practice of connecting computers together to share resources and information.",
    "Software Engineering": "The application of engineering principles to the design, development, maintenance, testing, and evaluation of software.",
    "CCNA": "Cisco Certified Network Associate - validating skills in network fundamentals and access.",
    "AWS": "Amazon Web Services - the world's most comprehensive and broadly adopted cloud platform.",
    "OOP": "Object-Oriented Programming - a paradigm based on the concept of objects containing data and code.",
    "Programming Fundamentals": "Core concepts including data structures, algorithms, and logic flow.",
    "Cloud Computing": "Delivery of different services through the Internet, including data storage, servers, databases, networking, and software."
  };

  // Keyboard shortcuts
  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === "Escape") {
        setSelected(null);
        setIsSearchFocused(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "/" && !isSearchFocused) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [isSearchFocused]);

  // Export to JSON
  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(filtered, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `education-${selectedType.toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [filtered, selectedType]);

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header with Title and View Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl section-title mb-2 font-display">🎓 Education & Certifications</h2>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm hidden sm:block">
                Press <kbd className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 font-mono">/</kbd> or <kbd className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 font-mono">Ctrl+K</kbd> to search
              </p>
            </div>
            
            {/* View Mode Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">View:</span>
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                {[
                  { mode: "timeline", icon: <FaStream />, label: "Timeline" },
                  { mode: "grid", icon: <FaTh />, label: "Grid" },
                  { mode: "list", icon: <FaList />, label: "List" },
                ].map(({ mode, icon, label }) => (
                  <motion.button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-2 rounded-md transition flex items-center gap-2 text-sm ${
                      viewMode === mode
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    title={label}
                  >
                    {icon}
                    <span className="hidden sm:inline">{label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics Dashboard */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                  <div className="bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold font-display flex items-center gap-2">
                        <FaChartBar className="text-primary" />
                        Education Overview
                      </h3>
                    <button
                      onClick={() => setShowStats(false)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-4">
                    {[
                      { label: "Total", value: stats.total, icon: <FaGraduationCap />, color: "text-blue-600" },
                      { label: "Degrees", value: stats.degrees, icon: <FaUniversity />, color: "text-purple-600" },
                      { label: "Certifications", value: stats.certifications, icon: <FaCertificate />, color: "text-green-600" },
                      { label: "Courses", value: stats.courses, icon: <FaAward />, color: "text-orange-600" },
                      { label: "Years", value: stats.years, icon: <FaClock />, color: "text-cyan-600" },
                      { label: "Avg GPA", value: stats.avgGPA || "N/A", icon: <FaStar />, color: "text-yellow-600" },
                      { label: "Skills", value: stats.tags, icon: <FaFilter />, color: "text-pink-600" },
                    ].map((stat, idx) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 shadow-sm border border-white/20 dark:border-gray-700/50"
                      >
                        <div className={`text-2xl mb-2 ${stat.color}`}>{stat.icon}</div>
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
                      Showing {filtered.length} of {stats.total} items
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showStats && (
            <button
              onClick={() => setShowStats(true)}
              className="mb-6 text-sm text-primary hover:underline flex items-center gap-2"
            >
              <FaChartBar /> Show Statistics
            </button>
          )}

          {/* Advanced Filters */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl shadow-xl p-6 mb-8 space-y-4 border border-white/20 dark:border-gray-700/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="flex items-center gap-2 flex-wrap">
                <FaFilter className="text-primary" />
                {[
                  { type: "Degree", icon: "🎓", color: "from-blue-500 to-cyan-500" },
                  { type: "Certification", icon: "📜", color: "from-purple-500 to-pink-500" },
                  { type: "Course", icon: "📚", color: "from-orange-500 to-amber-500" }
                ].map(({ type: t, icon, color }) => (
                  <motion.button
                    key={t}
                    onClick={() => {
                      setSelectedType(t);
                      setQuery("");
                      setActiveTags([]);
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 flex items-center gap-2 ${
                      selectedType === t
                        ? `bg-gradient-to-r ${color} text-white border-transparent shadow-lg shadow-blue-500/20`
                        : "bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md"
                    }`}
                  >
                    <span>{icon}</span>
                    {t}
                  </motion.button>
                ))}
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
                  placeholder={`Search ${selectedType.toLowerCase()} title, institution, tech...`}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 focus:ring-2 focus:ring-primary focus:border-transparent transition-all backdrop-blur-sm"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
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
                        💡 Tip: Search by title, institution, location, or skills
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

            {/* Tags with Interactive Descriptions */}
            <div className="space-y-6">
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

              <AnimatePresence mode="wait">
                {activeTags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-xl p-4 border border-blue-200 dark:border-blue-900 shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                         <FaCode className="text-blue-600 dark:text-blue-400 text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                          {activeTags[activeTags.length - 1]}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {techDescriptions[activeTags[activeTags.length - 1]] || 
                           "A key technology in my stack. Filtered results below show my experience with this skill."}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Dynamic View Modes */}
          <AnimatePresence mode="wait">
            {viewMode === "timeline" && (
              <motion.div
                key="timeline"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 opacity-30"></div>
                <motion.div layout className="space-y-10" transition={{ staggerChildren: 0.1 }}>
                  {filtered.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 1, x: 0 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-primary to-purple-600 rounded-full border-4 border-white dark:border-gray-900 z-10"></div>
                      
                      {/* Content card */}
                      <div className="w-full md:w-5/12 pl-12 md:pl-6 p-6">
                        <motion.div
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-white/20 dark:border-gray-700/50 relative overflow-hidden group"
                        >
                          {/* Gradient overlay */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                          
                          <div className="relative z-10">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <motion.div
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.6 }}
                                >
                                  {iconFor(item.type)}
                                </motion.div>
                                <div>
                                  <h3 className="text-xl font-bold font-display bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                                    {item.title}
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.institution}</p>
                                </div>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelected(item)}
                                className="text-sm px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                              >
                                Details
                              </motion.button>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-300">
                              <span className="inline-flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                                <FaRegCalendarAlt className="text-primary" />
                                {new Date(item.start).toLocaleDateString()} — {item.end ? new Date(item.end).toLocaleDateString() : "Present"}
                              </span>
                              <span className="inline-flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                                <FaMapMarkerAlt className="text-primary" />
                                {item.location}
                              </span>
                              {item.gpa && (
                                <span className="inline-flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full text-yellow-700 dark:text-yellow-400">
                                  <FaStar /> GPA {item.gpa}
                                </span>
                              )}
                            </div>

                            <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item.summary}</p>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {item.tags.map((t) => (
                                <motion.span
                                  key={t}
                                  whileHover={{ scale: 1.1 }}
                                  className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 text-xs font-medium border border-blue-100 dark:border-gray-600"
                                >
                                  {t}
                                </motion.span>
                              ))}
                            </div>

                            <div className="mt-4 flex flex-wrap gap-3">
                              {item.links.map((l) => (
                                <motion.a
                                  key={l.label}
                                  whileHover={{ x: 5 }}
                                  href={l.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-sm text-primary hover:text-purple-600 font-medium"
                                >
                                  {l.label}
                                  <FaExternalLinkAlt />
                                </motion.a>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      {/* Timeline dot with pulse */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        className="absolute left-0 md:left-1/2 w-5 h-5 bg-primary rounded-full transform -translate-x-1/2 mt-8 shadow-lg"
                      >
                        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {viewMode === "grid" && (
              <motion.div
                key="grid"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all h-full border border-white/20 dark:border-gray-700/50 flex flex-col relative overflow-hidden group"
                    >
                      {/* Card gradient background */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                      
                      <div className="relative z-10 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl"
                          >
                            {iconFor(item.type)}
                          </motion.div>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary to-purple-600 text-white">
                            {item.type}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold font-display mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.institution}</p>

                        <div className="space-y-2 mb-4 text-xs">
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <FaRegCalendarAlt className="text-primary" />
                            <span>{new Date(item.start).toLocaleDateString()} — {item.end ? new Date(item.end).toLocaleDateString() : "Present"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <FaMapMarkerAlt className="text-primary" />
                            <span>{item.location}</span>
                          </div>
                          {item.gpa && (
                            <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                              <FaStar />
                              <span>GPA {item.gpa}</span>
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 flex-1">{item.summary}</p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.tags.slice(0, 4).map((t) => (
                            <span key={t} className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">
                              {t}
                            </span>
                          ))}
                          {item.tags.length > 4 && (
                            <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">+{item.tags.length - 4}</span>
                          )}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelected(item)}
                          className="w-full py-2 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-lg transition-all"
                        >
                          View Details
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {viewMode === "list" && (
              <motion.div
                key="list"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filtered.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 1, x: 0 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="bg-glass-light dark:bg-glass-dark backdrop-blur-md rounded-xl p-5 shadow-md hover:shadow-xl transition-all border border-white/20 dark:border-gray-700/50 relative overflow-hidden group"
                    >
                      {/* List item gradient */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-purple-600"></div>
                      
                      <div className="flex items-start gap-4 ml-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="text-2xl mt-1"
                        >
                          {iconFor(item.type)}
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold font-display mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{item.institution}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary to-purple-600 text-white whitespace-nowrap">
                                {item.type}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelected(item)}
                                className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-purple-600 transition-colors whitespace-nowrap"
                              >
                                Details
                              </motion.button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                            <span className="inline-flex items-center gap-1">
                              <FaRegCalendarAlt className="text-primary" />
                              {new Date(item.start).toLocaleDateString()} — {item.end ? new Date(item.end).toLocaleDateString() : "Present"}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <FaMapMarkerAlt className="text-primary" />
                              {item.location}
                            </span>
                            {item.gpa && (
                              <span className="inline-flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                                <FaStar /> GPA {item.gpa}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">{item.summary}</p>

                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((t) => (
                              <span key={t} className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No results found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your filters or search query
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetFilters}
                className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-purple-600 transition-colors"
              >
                Reset Filters
              </motion.button>
            </motion.div>
          )}

          {/* Modal */}
          <AnimatePresence>
            {selected && (
              <Suspense fallback={<div>Loading...</div>}>
                <EducationModal selected={selected} onClose={() => setSelected(null)} />
              </Suspense>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
