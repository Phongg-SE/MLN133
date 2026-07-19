import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GameButton } from '../../components/Button/GameButton';
import { Star, Award, Heart, ArrowRight, Home, Sparkles } from 'lucide-react';
import { AudioService } from '../../services/AudioService';
import './VictoryScreen.css';

export interface VictoryScreenProps {
  level: number;
  stats: {
    xpGained: number;
    hpLeft: number;
    stars: number;
  };
  onNextLevel: () => void;
  onHomeClick: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  level,
  stats,
  onNextLevel,
  onHomeClick,
}) => {
  useEffect(() => {
    AudioService.playVictory();

    // Trigger canvas-confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#D4AF37', '#8B0000', '#2E7D32', '#00E5FF'],
    });
  }, []);

  return (
    <div className="victory-screen">
      <div className="victory-bg-glow" />

      <motion.div
        className="victory-card glass-panel"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="victory-banner">
          <Sparkles size={32} color="#FFD700" />
          <h1 className="victory-title gold-text-glow">HOÀN THÀNH MÀN {level}!</h1>
        </div>

        <span className="victory-subtitle font-number">CHIẾN THẮNG LÝ LUẬN BIỆN CHỨNG</span>

        {/* 3 Animated Stars */}
        <div className="victory-stars">
          {[1, 2, 3].map((starIdx) => (
            <motion.div
              key={starIdx}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: starIdx <= stats.stars ? 1.2 : 0.8, rotate: 0 }}
              transition={{ delay: 0.3 + starIdx * 0.2, type: 'spring' }}
            >
              <Star
                size={52}
                color={starIdx <= stats.stars ? '#FFD700' : 'rgba(255, 255, 255, 0.2)'}
                fill={starIdx <= stats.stars ? '#FFD700' : 'none'}
                className="victory-star-icon"
              />
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="victory-stats-grid">
          <div className="victory-stat-item">
            <Award size={28} color="#FFD700" />
            <div className="victory-stat-info">
              <span className="victory-stat-label">TRI THỨC THU ĐƯỢC</span>
              <span className="victory-stat-value font-number">+{stats.xpGained} XP</span>
            </div>
          </div>

          <div className="victory-stat-item">
            <Heart size={28} color="#FF5252" />
            <div className="victory-stat-info">
              <span className="victory-stat-label">SINH LỰC CÒN LẠI</span>
              <span className="victory-stat-value font-number">{stats.hpLeft} / 100 HP</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="victory-actions">
          {level < 7 ? (
            <GameButton
              variant="primary"
              size="lg"
              icon={<ArrowRight size={22} />}
              onClick={onNextLevel}
            >
              MÀN TIẾP THEO (MÀN {level + 1})
            </GameButton>
          ) : (
            <GameButton
              variant="primary"
              size="lg"
              icon={<Award size={22} />}
              onClick={onHomeClick}
            >
              HOÀN THÀNH TOÀN BỘ GAME!
            </GameButton>
          )}

          <GameButton
            variant="secondary"
            size="md"
            icon={<Home size={20} />}
            onClick={onHomeClick}
          >
            VỀ MENU CHÍNH
          </GameButton>
        </div>
      </motion.div>
    </div>
  );
};
