import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameButton } from '../Button/GameButton';
import { Play, Home, BookOpen, PauseCircle, Shield, Zap, Clock } from 'lucide-react';
import { AudioService } from '../../services/AudioService';
import './PauseModal.css';

export interface PauseModalProps {
  isOpen: boolean;
  level: number;
  hp: number;
  xp: number;
  timer: number;
  onResume: () => void;
  onOpenGuide: () => void;
  onHomeClick: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  isOpen,
  level,
  hp,
  xp,
  timer,
  onResume,
  onOpenGuide,
  onHomeClick,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="pause-overlay" onClick={onResume}>
        <motion.div
          className="pause-modal glass-panel"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pause-icon-ring">
            <PauseCircle size={52} color="#FFD700" />
          </div>

          <h2 className="pause-title gold-text-glow">GAME ĐANG TẠM DỪNG</h2>
          <span className="pause-subtitle font-number">MÀN {level} — THỜI GIAN ĐÃ TẠM KHÓA</span>

          {/* Current Game Stats Snapshot */}
          <div className="pause-stats-row">
            <div className="pause-stat-badge">
              <Shield size={16} color="#FF5252" />
              <span>HP: {hp}/100</span>
            </div>
            <div className="pause-stat-badge">
              <Zap size={16} color="#FFD700" />
              <span>XP: {xp}/100</span>
            </div>
            <div className="pause-stat-badge">
              <Clock size={16} color="#00E5FF" />
              <span>THỜI GIAN: {timer}s</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pause-actions">
            <GameButton
              variant="primary"
              size="lg"
              icon={<Play size={22} />}
              onClick={() => {
                AudioService.playClick();
                onResume();
              }}
            >
              TIẾP TỤC CHƠI
            </GameButton>

            <GameButton
              variant="secondary"
              size="md"
              icon={<BookOpen size={20} color="#00E5FF" />}
              onClick={() => {
                AudioService.playClick();
                onOpenGuide();
              }}
            >
              HƯỚNG DẪN LUẬT CHƠI
            </GameButton>

            <GameButton
              variant="danger"
              size="md"
              icon={<Home size={20} />}
              onClick={() => {
                AudioService.playClick();
                onHomeClick();
              }}
            >
              THOÁT VỀ MENU CHÍNH
            </GameButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
