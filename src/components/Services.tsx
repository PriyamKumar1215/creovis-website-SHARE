'use client';

import { motion } from 'framer-motion';
import { Zap, Palette, Code, Video, Share2, TrendingUp } from 'lucide-react';

const services = [
  {
    icon: TrendingUp,
    title: 'Marketing Strategy',
    description: 'Data-driven strategies to accelerate your growth and market reach.',
    features: ['SEO Optimization', 'Content Strategy', 'Analytics & Reporting'],
  },
  {
    icon: Palette,
    title: 'Branding',
    description: 'Craft a unique identity that resonates with your target audience.',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity'],
  },
  {
    icon: Code,
    title: 'Website Creation',
    description: 'High-performance websites built with cutting-edge technology.',
    features: ['Responsive Design', 'Fast Loading', 'SEO Ready'],
  },
  {
    icon: Video,
    title: 'Video Editing',
    description: 'Compelling video content that tells your brand story.',
    features: ['Professional Editing', 'Motion Graphics', 'Sound Design'],
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    description: 'Build engaged communities and drive meaningful interactions.',
    features: ['Content Creation', 'Community Management', 'Paid Ads'],
  },
  {
    icon: Zap,
    title: 'Performance Marketing',
    description: 'Maximize ROI with targeted campaigns and continuous optimization.',
    features: ['Campaign Management', 'Conversion Tracking', 'Budget Optimization'],
  },
];

export const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 md:py-32 bg-dark-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto">
            Comprehensive digital solutions designed to elevate your brand and drive measurable results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group glass p-8 rounded-xl hover:border-accent-500/50 transition-all duration-300 hover:translate-y-[-5px]"
              >
                <div className="mb-4 inline-flex p-3 bg-accent-500/10 rounded-lg group-hover:bg-accent-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-dark-300 mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-dark-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};