import React from 'react';
import { motion } from 'framer-motion';
import './StatBar.css';

export interface StatBarProps {
  label: string;
  current: number;
  max: number;
  type?: 'hp' | 'xp' | 'timer';
  icon?: React.ReactNode;
  showNumbers?: boolean;
}

export const StatBar: React.FC<StatBarProps> = ({
  label,
  current,
  max,
  type = 'hp',
  icon,
  showNumbers = true,
}) => {
  const percentage = Math.min(Math.max((current / max) * 100, 0), 100);

  return (
    <div className={`stat-bar stat-bar--${type}`}>
      <div className="stat-bar__header">
        <span className="stat-bar__label">
          {icon && <span className="stat-bar__icon">{icon}</span>}
          {label}
        </span>
        {showNumbers && (
          <span className="stat-bar__value font-number">
            {Math.round(current)} / {max}
          </span>
        )}
      </div>

      <div className="stat-bar__track">
        <motion.div
          className="stat-bar__fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="stat-bar__glow" />
        </motion.div>
      </div>
    </div>
  );
};
