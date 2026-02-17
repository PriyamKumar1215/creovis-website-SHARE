'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: 'TechStartup Branding',
    category: 'Branding',
    image: '/images/portfolio/project-1.jpg',
    description: 'Complete brand identity overhaul for emerging tech company',
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    category: 'Web Design',
    image: '/images/portfolio/project-2.jpg',
    description: 'High-converting e-commerce website with custom features',
  },
  {
    id: 3,
    title: 'Product Launch Campaign',
    category: 'Marketing',
    image: '/images/portfolio/project-3.jpg',
    description: '360° digital marketing campaign resulting in 300% growth',
  },
  {
    id: 4,
    title: 'Corporate Video',
    category: 'Video',
    image: '/images/portfolio/project-4.jpg',
    description: 'Professional corporate documentary and explainer videos',
  },
  {
    id: 5,
    title: 'Social Media Strategy',
    category: 'Social Media',
    image: '/images/portfolio/project-5.jpg',
    description: 'Organic growth from 5K to 100K followers in 6 months',
  },
  {
    id: 6,
    title: 'Brand Redesign',
    category: 'Branding',
    image: '/images/portfolio/project-6.jpg',
    description: 'Modern rebrand for established Fortune 500 company',
  },
];

export const Portfolio = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto">
            Explore our latest projects and see how we've helped brands achieve remarkable success.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-dark-800 cursor-pointer"
            >
              <div className="relative h-64 w-full bg-dark-700 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full bg-dark-600"
                >
                  {/* Placeholder for image - replace with actual Image component when images are available */}
                  <div className="w-full h-full flex items-center justify-center text-dark-400">
                    [Project Image]
                  </div>
                </motion.div>
              </div>

              <div className="p-6">
                <span className="text-xs font-semibold text-accent-500 uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-2">{item.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 border border-accent-500 hover:bg-accent-500/10 rounded-lg font-semibold transition-all duration-300 group"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};