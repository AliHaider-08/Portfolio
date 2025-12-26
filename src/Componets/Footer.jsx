import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaHeart, 
  FaCode, 
  FaRocket, 
  FaArrowUp,
  FaMapMarkerAlt,
  FaPhone,
  FaRegClock,
  FaShieldAlt,
  FaUsers,
  FaLightbulb
} from 'react-icons/fa';
import { HiSparkles, HiStar } from 'react-icons/hi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/AliHaider-08", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/ali-haider-04baa0373/", label: "LinkedIn" },
    { icon: <FaEnvelope />, url: "mailto:alihaiderkhan083@gmail.com", label: "Email" },
  ];

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    { icon: <FaCode />, name: 'Web Development' },
    { icon: <FaLightbulb />, name: 'UI/UX Design' },
    { icon: <FaRocket />, name: 'Performance' },
    { icon: <FaShieldAlt />, name: 'Security' },
  ];

  const stats = [
    { icon: <FaUsers />, value: '50+', label: 'Happy Clients' },
    { icon: <FaCode />, value: '100+', label: 'Projects' },
    { icon: <FaRegClock />, value: '24/7', label: 'Support' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stats Section */}
        <div className="py-12 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              >
                <div className="text-3xl text-primary mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 lg:col-span-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FaCode className="text-white text-xl" />
                </div>
                <div>
                  <span className="text-2xl font-bold">Ali Haider</span>
                  <div className="text-sm text-gray-400">Full-Stack Developer</div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Passionate about creating exceptional digital experiences with modern web technologies. 
                Transforming ideas into powerful, scalable solutions that make a difference.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <HiSparkles className="text-yellow-400" />
                <span>Crafting code with passion</span>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-3 pt-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <HiStar className="text-yellow-400" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 inline-flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaRocket className="text-purple-400" />
                Services
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name} className="flex items-center gap-2 text-gray-300">
                    <span className="text-primary">{service.icon}</span>
                    <span>{service.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                Get In Touch
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <FaEnvelope className="text-blue-400 flex-shrink-0" />
                  <span className="text-sm">alihaiderkhan083@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaPhone className="text-green-400 flex-shrink-0" />
                  <span className="text-sm">+92 325 0075364</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaMapMarkerAlt className="text-purple-400 flex-shrink-0" />
                  <span className="text-sm">Peshawar, Pakistan</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-6"
          >
            <div className="text-center lg:text-left text-gray-400 text-sm">
              <p>
                &copy; {currentYear} Ali Haider. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>and</span>
              <FaCode className="text-blue-400" />
              <span>in Pakistan</span>
            </div>

            <div className="flex gap-6 text-sm">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
};

export default Footer;
