import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGithub, 
  FaLinkedin, 
  FaDownload,
  FaBriefcase,
  FaGraduationCap,
  FaAward,
  FaCode,
  FaRocket,
  FaChartBar,
  FaExternalLinkAlt,
  FaRegCalendarAlt,
  FaBuilding,
  FaCertificate,
  FaLightbulb,
  FaHeart,
  FaEdit,
  FaFilePdf
} from 'react-icons/fa';

const CV = () => {
  const [activeSection, setActiveSection] = useState('all');
  const [isDownloading, setIsDownloading] = useState(false);
  const [viewMode, setViewMode] = useState('web'); // 'web' or 'pdf'
  const printRef = useRef();

  // CV file path - using import for proper bundling
  const cvFilePath = '/Images/Ali CV .pdf';

  const handleDownloadCV = () => {
    setIsDownloading(true);
    // Create a temporary link to download the CV
    const link = document.createElement('a');
    link.href = cvFilePath;
    link.download = 'Ali_Haider_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  const handleViewPDF = () => {
    setViewMode('pdf');
  };

  const handleBackToWeb = () => {
    setViewMode('web');
  };

  // Professional data
  const personalInfo = {
    name: "Ali Haider",
    title: "Full Stack Developer & MERN Stack Trainer",
    email: "alihaiderkhan083@gmail.com",
    phone: "+92 325 0075364",
    location: "Peshawar, Pakistan",
    linkedin: "https://www.linkedin.com/in/ali-haider-04baa0373/",
    github: "https://github.com/AliHaider-08",
    summary: "Passionate Full-Stack Developer with expertise in MERN stack technologies. Specialized in building scalable web applications, mentoring developers, and creating exceptional digital experiences with a focus on performance and user experience."
  };

  const skills = [
    { name: "React.js", level: 90, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "MongoDB", level: 80, category: "Backend" },
    { name: "JavaScript", level: 95, category: "Frontend" },
    { name: "HTML/CSS", level: 90, category: "Frontend" },
    { name: "Express.js", level: 85, category: "Backend" },
    { name: "TailwindCSS", level: 88, category: "Frontend" },
    { name: "Git", level: 82, category: "Tools" },
  ];

  const experience = [
    {
      id: 1,
      role: "Full Stack Developer & MERN Stack Trainer",
      company: "SAT Company (PSEB Internship Program)",
      location: "Swabi, Pakistan",
      period: "Oct 2025 - Present",
      current: true,
      responsibilities: [
        "Leading development of MERN stack applications",
        "Mentoring aspiring developers in HTML, CSS, JavaScript, and React.js",
        "Designing RESTful APIs with Node.js, Express.js, and MongoDB",
        "Collaborating with clients to define requirements and align with business goals"
      ],
      achievements: [
        "Successfully trained 50+ junior developers",
        "Delivered 10+ production-ready applications",
        "Improved development efficiency by 40%"
      ]
    },
    {
      id: 2,
      role: "Freelance Full Stack Developer",
      company: "Upwork & Fiverr",
      location: "Remote",
      period: "Jan 2024 - Sep 2025",
      current: false,
      responsibilities: [
        "Developed custom web applications for various clients",
        "Provided technical consulting and solutions",
        "Managed full project lifecycle from conception to deployment"
      ],
      achievements: [
        "Completed 25+ successful projects",
        "Maintained 100% client satisfaction rate",
        "Earned Top Rated status on platforms"
      ]
    }
  ];

  const education = [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Peshawar",
      location: "Peshawar, Pakistan",
      period: "2020 - 2024",
      current: false,
      gpa: "3.8/4.0",
      achievements: [
        "Dean's List for 3 consecutive semesters",
        "Led Computer Science Student Society",
        "Published research paper on Web Technologies"
      ]
    },
    {
      id: 2,
      degree: "Full Stack Web Development",
      institution: "PSEB Internship Program",
      location: "Swabi, Pakistan",
      period: "2024 - 2025",
      current: true,
      gpa: "Excellent",
      achievements: [
        "Completed intensive 6-month training program",
        "Specialized in MERN stack development",
        "Received Excellence in Development Award"
      ]
    }
  ];

  const certifications = [
    {
      name: "MERN Stack Development",
      issuer: "SAT Company",
      date: "2025",
      credential: "Professional Certification"
    },
    {
      name: "React Advanced Patterns",
      issuer: "Udemy",
      date: "2024",
      credential: "Certificate of Completion"
    },
    {
      name: "Node.js Backend Development",
      issuer: "Coursera",
      date: "2024",
      credential: "Specialization Certificate"
    }
  ];

  const getSkillColor = (level) => {
    if (level >= 90) return 'bg-gradient-to-r from-blue-500 to-purple-600';
    if (level >= 80) return 'bg-gradient-to-r from-green-500 to-teal-600';
    return 'bg-gradient-to-r from-yellow-500 to-orange-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold gradient-text">Professional CV</h1>
            <div className="flex gap-4">
              {viewMode === 'web' ? (
                <>
                  <button
                    onClick={handleViewPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <FaFilePdf />
                    View PDF CV
                  </button>
                  <button
                    onClick={handleDownloadCV}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    <FaDownload />
                    {isDownloading ? 'Downloading...' : 'Download CV'}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleBackToWeb}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Back to Web CV
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* CV Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {viewMode === 'web' ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Web CV Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                  <FaUser className="text-5xl" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-4xl font-bold mb-2">{personalInfo.name}</h2>
                  <p className="text-xl mb-4 text-blue-100">{personalInfo.title}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FaEnvelope />
                      <span>{personalInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPhone />
                      <span>{personalInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt />
                      <span>{personalInfo.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4 justify-center md:justify-start">
                    <a href={personalInfo.linkedin} className="bg-white/20 px-3 py-1 rounded-full text-sm hover:bg-white/30 transition">LinkedIn</a>
                    <a href={personalInfo.github} className="bg-white/20 px-3 py-1 rounded-full text-sm hover:bg-white/30 transition">GitHub</a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Summary Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 border-b border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" />
                Professional Summary
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {personalInfo.summary}
              </p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-gray-50 dark:bg-gray-700/50"
            >
              <h3 className="text-xl font-bold mb-4">Quick Access</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={handleViewPDF}
                  className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all"
                >
                  <FaFilePdf className="text-red-500 text-xl" />
                  <span>View Original PDF</span>
                </button>
                <button
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <FaDownload className="text-blue-500 text-xl" />
                  <span>{isDownloading ? 'Downloading...' : 'Download CV'}</span>
                </button>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all"
                >
                  <FaLinkedin className="text-blue-600 text-xl" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </motion.div>
          </div>
        ) : (
          /* PDF Viewer */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 bg-gradient-to-r from-green-600 to-teal-600 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FaFilePdf />
                Original CV Document
              </h2>
              <p className="mt-2 text-green-100">This is your original CV document in PDF format</p>
            </div>
            <div className="p-8">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 text-center">
                <FaFilePdf className="text-6xl text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ali Haider - CV</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Professional CV document with complete details
                </p>
                <div className="flex gap-4 justify-center">
                  <a
                    href={cvFilePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    <FaExternalLinkAlt />
                    Open in New Tab
                  </a>
                  <button
                    onClick={handleDownloadCV}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
                  >
                    <FaDownload />
                    {isDownloading ? 'Downloading...' : 'Download'}
                  </button>
                </div>
              </div>
              
              {/* Embedded PDF Viewer */}
              <div className="mt-8">
                <iframe
                  src={cvFilePath}
                  className="w-full h-[800px] border border-gray-300 dark:border-gray-600 rounded-lg"
                  title="Ali Haider CV"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center mt-8 text-gray-600 dark:text-gray-400"
      >
        <p className="flex items-center justify-center gap-2">
          Made with <FaHeart className="text-red-500" /> by {personalInfo.name}
        </p>
        <p className="text-sm mt-2">Last updated: {new Date().toLocaleDateString()}</p>
      </motion.div>
    </div>
  );
};

export default CV;
