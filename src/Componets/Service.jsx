import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaMobile } from 'react-icons/fa';

const Service = () => {
  const services = [
    {
      icon: <FaCode />,
      title: 'Frontend Development',
      description: 'Building responsive and interactive web applications using React.js and modern CSS frameworks.',
    },
    {
      icon: <FaServer />,
      title: 'Backend Development',
      description: 'Developing robust server-side applications with Node.js and Express.js.',
    },
    {
      icon: <FaDatabase />,
      title: 'Database Management',
      description: 'Designing and implementing efficient database solutions using MySQL and Sequelize ORM.',
    },
    {
      icon: <FaMobile />,
      title: 'Responsive Design',
      description: 'Creating mobile-first, responsive web applications that work seamlessly across all devices.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I offer comprehensive web development solutions to help bring your ideas to life
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full flex flex-col"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center mb-6 text-white text-2xl mx-auto">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center flex-grow">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;