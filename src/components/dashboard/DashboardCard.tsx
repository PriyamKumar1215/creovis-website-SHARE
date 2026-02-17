'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'up' | 'down';
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  trend,
}) => {
  const isPositive = trend === 'up';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass p-6 rounded-xl"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-accent-500/10 rounded-lg">
          <Icon className="w-6 h-6 text-accent-500" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change}
        </div>
      </div>

      <h3 className="text-dark-400 text-sm font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
};