'use client';

import { motion } from 'framer-motion';
import { Services as ServicesComponent } from '@/components/Services';
import { CTA } from '@/components/CTA';

export default function ServicesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ServicesComponent />
      <CTA />
    </motion.div>
  );
}