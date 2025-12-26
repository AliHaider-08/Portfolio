import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaEye, FaCalendar, FaCode } from 'react-icons/fa';
import Health from '../Images/Health.png';
import Flood from '../Images/Flood.png';
import Health2 from '../Images/Health2.png';

const Projects = () => {
  const projects = [
    {
      title: 'E-HealthCare Platform',
      description: 'Comprehensive healthcare management system with patient records, appointments, and telemedicine features.',
      image: Health,
      technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'JWT'],
      githubLink: 'https://github.com/AliHaider-08/EHealthCare-Web',
      liveLink: '#',
      featured: true,
      stars: 42,
      forks: 12,
      views: '1.2k',
      date: '2024-03',
    },
    {
      title: 'Flood Emergency System',
      description: 'Real-time flood monitoring and emergency response platform with alert system and resource management.',
      image: Flood,
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Mapbox API', 'Firebase'],
      githubLink: 'https://github.com/AliHaider-08/Flood_Emergency',
      liveLink: '#',
      featured: false,
      stars: 28,
      forks: 8,
      views: '890',
      date: '2024-01',
    },
    {
      title: 'Health Fitness Tracker',
      description: 'Personal fitness tracking application with workout plans, nutrition tracking, and progress analytics.',
      image: Health2,
      technologies: ['React.js', 'Tailwind CSS', 'Chart.js', 'Local Storage'],
      githubLink: 'https://github.com/AliHaider-08/Health_Fitness',
      liveLink: '#',
      featured: false,
      stars: 35,
      forks: 10,
      views: '1.5k',
      date: '2023-11',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-blue-700 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full backdrop-blur-sm border border-blue-200 dark:border-blue-800"
          >
            <FaCode className="text-blue-600" />
            <span>Featured Projects</span>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 gradient-text"
          >
            My Recent Work
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 px-4"
          >
            Explore my latest projects showcasing modern web development, creative problem-solving, and attention to detail.
          </motion.p>

          {/* Project Stats */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12"
          >
            {[
              { label: 'Total Projects', value: '20+', icon: <FaCode /> },
              { label: 'GitHub Stars', value: '150+', icon: <FaStar /> },
              { label: 'Active Users', value: '5k+', icon: <FaEye /> },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="text-center px-4 sm:px-6"
              >
                <div className="text-xl sm:text-2xl text-primary mb-2">{stat.icon}</div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Featured badge */}
              {project.featured && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                >
                  <FaStar className="inline mr-1" />
                  Featured
                </motion.div>
              )}

              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    whileHover={{ scale: 1.1 }}
                  />
                  
                  {/* Overlay with links */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center pb-6"
                  >
                    <div className="flex gap-4">
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaGithub className="text-xl" />
                      </motion.a>
                      {project.liveLink !== '#' && (
                        <motion.a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaExternalLinkAlt className="text-xl" />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <FaCalendar />
                      {project.date}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-800"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Project Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        {project.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCodeBranch className="text-blue-500" />
                        {project.forks}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaEye className="text-green-500" />
                        {project.views}
                      </span>
                    </div>
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      View Project →
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-block p-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          >
            <a
              href="https://github.com/AliHaider-08"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-8 py-4 bg-white dark:bg-gray-800 rounded-full font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              View All Projects on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;