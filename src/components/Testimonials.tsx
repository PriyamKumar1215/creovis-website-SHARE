'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    company: 'TechVenture Labs',
    content: 'Creovis transformed our digital presence. Their strategic approach and creative execution resulted in 250% revenue growth in just 6 months.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Director',
    company: 'FashionHub India',
    content: 'Professional, responsive, and results-driven. The team understood our vision and delivered beyond expectations. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Amit Patel',
    role: 'Managing Director',
    company: 'Digital Solutions Inc',
    content: 'Working with Creovis was a game-changer for our brand. Their expertise in branding and digital marketing is unparalleled.',
    rating: 5,
  },
];

export const Testimonials = () => {
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
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. See what our satisfied clients have to say about working with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-xl"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-500 text-accent-500" />
                ))}
              </div>

              {/* Content */}
              <p className="text-dark-300 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-dark-400">{testimonial.role}</p>
                <p className="text-sm text-accent-500 font-medium">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};