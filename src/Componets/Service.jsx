import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaMobile } from 'react-icons/fa';

/**
 * 3D Tilt Card Component
 */
const TiltCard = ({ service, index }) => {
  const ref = useRef(null);

  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for tilt
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    
    // Calculate rotation (inverted for natural feel)
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Transform values to rotation degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]); // Tilt up/down
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]); // Tilt left/right
  
  // Dynamic light/glare effect
  const sheenX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <motion.div
      ref={ref}
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700/50 group"
      >
        {/* Depth Layers for 3D effect */}
        <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 text-white text-3xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
            {service.icon}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {service.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Glare Effect */}
        <motion.div 
          style={{ 
            background: `radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.1) 0%, transparent 60%)` 
          }}
          className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        />

        {/* Border Glow on Hover */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-blue-500/30 transition-all duration-300" />
      </motion.div>
    </motion.div>
  );
};

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
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
            WHAT I DO
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Services</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            I offer comprehensive web development solutions to help bring your ideas to life with modern technologies and best practices.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <TiltCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;