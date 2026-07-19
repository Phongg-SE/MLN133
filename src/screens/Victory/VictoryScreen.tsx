import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GameButton } from '../../components/Button/GameButton';
import { Star, Trophy, ArrowRight, RotateCcw, Home, Award, Shield, Zap } from 'lucide-react';
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
  onRetry: () => void;
  onHomeClick: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  level,
  stats,
  onNextLevel,
  onRetry,
  onHomeClick,
}) => {
  // Trigger Confetti Celebration
  useEffect(() => {
    AudioService.playVictory();

    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#D4AF37', '#8B0000', '#FFF8DC'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#D4AF37', '#8B0000', '#FFF8DC'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="victory-screen">
      <div className="victory-screen__overlay" />

      <motion.div
        className="victory-card glass-panel"
        initial={{ scale: 0.7, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', damping: 15 }}
      >
        {/* Trophy Emblem */}
        <div className="victory-trophy-wrap">
          <Trophy size={64} color="#FFD700" className="victory-trophy-icon" />
        </div>

        {/* Title */}
        <h1 className="victory-title gold-text-glow">ĐẠI THẮNG CÁCH MẠNG</h1>
        <p className="victory-message">
          {level === 3
            ? 'Chúc mừng Ban Lãnh Đạo Tiền Phong! Đông Dương Quốc đã chính thức bước vào giai đoạn Chủ nghĩa xã hội hoàn chỉnh - Bạn đã hoàn thành xuất sắc sứ mệnh lịch sử!'
            : `Chúc mừng Ban Lãnh Đạo Tiền Phong! Bạn đã chèo lái Đông Dương Quốc hoàn thành xuất sắc Màn ${level}!`}
        </p>

        {/* 3 Animated Stars */}
        <div className="victory-stars">
          {[1, 2, 3].map((starIdx) => (
            <motion.div
              key={starIdx}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + starIdx * 0.2, type: 'spring' }}
            >
              <Star
                size={42}
                color={starIdx <= stats.stars ? '#FFD700' : 'rgba(255, 255, 255, 0.2)'}
                fill={starIdx <= stats.stars ? '#FFD700' : 'none'}
                className="victory-star-icon"
              />
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="victory-stats-box glass-panel">
          <div className="victory-stat-item">
            <Zap size={22} color="#FFD700" />
            <div className="victory-stat-info">
              <span className="victory-stat-label">ĐIỂM GIÁC NGỘ (XP)</span>
              <span className="victory-stat-val font-number">+{stats.xpGained} XP</span>
            </div>
          </div>

          <div className="victory-stat-item">
            <Shield size={22} color="#FF5252" />
            <div className="victory-stat-info">
              <span className="victory-stat-label">ỔN ĐỊNH XÃ HỘI (HP)</span>
              <span className="victory-stat-val font-number">{stats.hpLeft}/100 HP</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="victory-actions">
          {level < 3 ? (
            <GameButton
              variant="primary"
              size="lg"
              icon={<ArrowRight size={20} />}
              onClick={() => {
                AudioService.playClick();
                onNextLevel();
              }}
              className="pulse-glow"
            >
              CHÈO LÁI MÀN KẾ TIẾP (MÀN {level + 1})
            </GameButton>
          ) : (
            <GameButton
              variant="primary"
              size="lg"
              icon={<Award size={20} />}
              onClick={() => {
                AudioService.playClick();
                onHomeClick();
              }}
              className="pulse-glow"
            >
              VỀ MENU CHÍNH VỚI CHIẾN THẮNG TỐI CAO
            </GameButton>
          )}

          <div className="victory-row-actions">
            <GameButton
              variant="secondary"
              size="md"
              icon={<RotateCcw size={18} />}
              onClick={() => {
                AudioService.playClick();
                onRetry();
              }}
            >
              CHƠI LẠI MÀN NÀY
            </GameButton>

            <GameButton
              variant="secondary"
              size="md"
              icon={<Home size={18} />}
              onClick={() => {
                AudioService.playClick();
                onHomeClick();
              }}
            >
              VỀ MENU CHÍNH
            </GameButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
