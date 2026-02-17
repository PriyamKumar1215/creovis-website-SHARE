'use client';

import { motion } from 'framer-motion';
import { BarChart3, Users, FileText, CreditCard } from 'lucide-react';
import { DashboardCard } from '@/components/dashboard/DashboardCard';

const stats = [
  {
    title: 'Total Leads',
    value: '248',
    change: '+12%',
    icon: Users,
    trend: 'up',
  },
  {
    title: 'Bookings',
    value: '42',
    change: '+5%',
    icon: FileText,
    trend: 'up',
  },
  {
    title: 'Conversions',
    value: '18',
    change: '+8%',
    icon: BarChart3,
    trend: 'up',
  },
  {
    title: 'Revenue',
    value: '₹12.5L',
    change: '+23%',
    icon: CreditCard,
    trend: 'up',
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-dark-400 mt-2">Welcome back to your dashboard</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DashboardCard {...stat} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}