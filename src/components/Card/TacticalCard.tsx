import React from 'react';
import { motion } from 'framer-motion';
import { AudioService } from '../../services/AudioService';
import './TacticalCard.css';

export interface CardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'buff' | 'debuff' | 'special';
  icon: React.ReactNode;
  valueEffect: string;
}

export interface TacticalCardProps {
  card: CardItem;
  isFlipped: boolean;
  onFlip?: () => void;
  disabled?: boolean;
}

export const TacticalCard: React.FC<TacticalCardProps> = ({
  card,
  isFlipped,
  onFlip,
  disabled = false,
}) => {
  const handleClick = () => {
    if (disabled || isFlipped) return;
    AudioService.playCardFlip();
    if (onFlip) onFlip();
  };

  return (
    <div className="tactical-card-scene" onClick={handleClick}>
      <motion.div
        className={`tactical-card ${isFlipped ? 'tactical-card--flipped' : ''}`}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ scale: disabled ? 1 : 1.05, y: -5 }}
      >
        {/* Card Face Down (Back) */}
        <div className="tactical-card__face tactical-card__back glass-panel">
          <div className="tactical-card__back-border">
            <div className="tactical-card__back-emblem">☯</div>
            <div className="tactical-card__back-pattern" />
            <span className="tactical-card__back-text">BIỆN CHỨNG</span>
          </div>
        </div>

        {/* Card Face Up (Front) */}
        <div className={`tactical-card__face tactical-card__front tactical-card__front--${card.type} glass-panel`}>
          <div className="tactical-card__header">
            <span className="tactical-card__badge">{card.type.toUpperCase()}</span>
            <span className="tactical-card__effect font-number">{card.valueEffect}</span>
          </div>

          <div className="tactical-card__icon-wrap">
            {card.icon}
          </div>

          <h4 className="tactical-card__title">{card.title}</h4>
          <span className="tactical-card__subtitle">{card.subtitle}</span>

          <p className="tactical-card__desc">{card.description}</p>
        </div>
      </motion.div>
    </div>
  );
};
