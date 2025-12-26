import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub, 
  FaWhatsapp, 
  FaClock, 
  FaPaperPlane, 
  FaHeadphones,
  FaRocket,
  FaUserCheck,
  FaCalendarCheck,
  FaStar,
  FaTrophy,
  FaLock
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef();

  // EmailJS Configuration - You need to set these up at https://www.emailjs.com/
  const EMAILJS_SERVICE_ID = 'service_grgklld';  // Updated from your screenshot
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // Replace with your EmailJS public key

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Send email using EmailJS
    emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formRef.current,
      EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setSubmitStatus('success');
      setSubmitMessage('Thank you for your message! I\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setCharCount(0);
      setIsSubmitting(false);
    })
    .catch((error) => {
      console.error('Email send failed:', error.text);
      setSubmitStatus('error');
      setSubmitMessage('Oops! Something went wrong. Please try again or email me directly.');
      setIsSubmitting(false);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Update character count for message
    if (name === 'message') {
      setCharCount(value.length);
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      content: 'alihaiderkhan083@gmail.com',
      link: 'mailto:alihaiderkhan083@gmail.com',
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      content: '+923250075364',
      link: 'tel:+923250075364',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      content: 'Peshawar, Pakistan',
      link: '#',
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 mb-8 text-sm font-medium text-blue-700 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full backdrop-blur-sm border border-blue-200 dark:border-blue-800"
          >
            <FaHeadphones className="text-blue-600" />
            <span>Get In Touch</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent px-4"
          >
            Let's Create Something Amazing
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 px-4"
          >
            Ready to bring your ideas to life? I'm here to help you build exceptional digital experiences.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-12"
          >
            {[
              { icon: <FaRocket />, label: 'Fast Response', value: '< 24hrs' },
              { icon: <FaTrophy />, label: 'Expert Quality', value: '100%' },
              { icon: <FaLock />, label: 'Secure Process', value: 'SSL' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="text-center p-5 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-xl flex-1 max-w-xs cursor-pointer hover:shadow-2xl"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">{stat.icon}</div>
                <div className="text-lg font-bold font-display text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Contact Form and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="max-w-2xl mx-auto w-full">
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
              <AnimatePresence initial={false}>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`${submitStatus === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'} border rounded-lg p-4 text-sm`}
                    role={submitStatus === 'error' ? 'alert' : 'status'}
                  >
                    {submitMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <label htmlFor="name" className="block text-sm font-medium font-display mb-2 text-gray-700 dark:text-gray-300">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.name ? 'border-red-500 focus:ring-red-400' : ''}`}
                  placeholder="Your full name"
                  required
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label htmlFor="email" className="block text-sm font-medium font-display mb-2 text-gray-700 dark:text-gray-300">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.email ? 'border-red-500 focus:ring-red-400' : ''}`}
                  placeholder="your.email@example.com"
                  required
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label htmlFor="subject" className="block text-sm font-medium font-display mb-2 text-gray-700 dark:text-gray-300">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.subject ? 'border-red-500 focus:ring-red-400' : ''}`}
                  placeholder="What's this about?"
                  required
                />
                {errors.subject && (
                  <p id="subject-error" className="mt-2 text-sm text-red-600">{errors.subject}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-sm font-medium font-display mb-2 text-gray-700 dark:text-gray-300">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  rows={5}
                  maxLength={500}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${errors.message ? 'border-red-500 focus:ring-red-400' : ''}`}
                  placeholder="Tell me about your project..."
                  required
                />
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-right">
                  {charCount}/500 characters
                </div>
                {errors.message && (
                  <p id="message-error" className="mt-2 text-sm text-red-600">{errors.message}</p>
                )}
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-display font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-blue-500/30"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FaPaperPlane />
                    Send Message
                  </span>
                )}
              </motion.button>
            </form>
          </div>

          {/* Contact Info & Additional Content */}
          <div className="space-y-8">
            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border border-white/20 dark:border-gray-700/50 text-center group"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-semibold font-display mb-2 text-gray-900 dark:text-white">{info.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{info.content}</p>
                </motion.a>
              ))}
            </div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50"
            >
              <h3 className="text-xl font-semibold font-display mb-4 text-center text-gray-900 dark:text-white">Connect With Me</h3>
              <div className="flex justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/923250075364"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="p-4 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/30 transition-all"
                >
                  <FaWhatsapp className="text-2xl" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/ali-haider-04baa0373/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="p-4 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all"
                >
                  <FaLinkedin className="text-2xl" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/AliHaider-08"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="p-4 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-900 text-white shadow-lg hover:shadow-xl hover:shadow-gray-500/30 transition-all"
                >
                  <FaGithub className="text-2xl" />
                </motion.a>
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-800/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h4 className="text-lg font-semibold font-display text-gray-900 dark:text-white">Available for Projects</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Currently accepting new freelance projects. Let's discuss your ideas and bring them to life!
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FaClock className="text-primary" />
                <span>Typical response time: within 24 hours</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
