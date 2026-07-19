import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { AudioService } from '../../services/AudioService';
import './GameButton.css';

export interface GameButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const GameButton: React.FC<GameButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  onClick,
  disabled,
  className = '',
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    AudioService.playClick();
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.04, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.96, y: disabled ? 0 : 1 }}
      onClick={handleClick}
      disabled={disabled}
      className={`game-button game-button--${variant} game-button--${size} ${disabled ? 'game-button--disabled' : ''} ${className}`}
      {...props}
    >
      <span className="game-button__inner">
        {icon && <span className="game-button__icon">{icon}</span>}
        <span className="game-button__label">{children}</span>
      </span>
      <span className="game-button__shine" />
    </motion.button>
  );
};
