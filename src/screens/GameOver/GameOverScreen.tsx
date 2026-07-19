import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GameButton } from '../../components/Button/GameButton';
import { RefreshCw, Home, Skull, AlertCircle } from 'lucide-react';
import { AudioService } from '../../services/AudioService';
import './GameOverScreen.css';

export interface GameOverScreenProps {
  level: number;
  onRetry: () => void;
  onHomeClick: () => void;
}

export const QUOTES = [
  '“Thực tiễn cao hơn nhận thức (lý luận), vì nó có ưu điểm không những có tính phổ biến, mà còn có tính thực tế trực tiếp.” — V.I.Lênin',
  '“Các nhà triết học chỉ giải thích thế giới bằng nhiều cách khác nhau, song vấn đề là cải tạo thế giới.” — C.Mác',
  '“Sự phát triển là một cuộc đấu tranh giữa các mặt đối lập.” — V.I.Lênin',
  '“Không có lý luận cách mạng thì cũng không thể có phong trào cách mạng.” — V.I.Lênin',
];

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  level,
  onRetry,
  onHomeClick,
}) => {
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  useEffect(() => {
    AudioService.playGameOver();
  }, []);

  return (
    <div className="game-over-screen">
      <div className="game-over-vignette" />

      <motion.div
        className="game-over-card glass-panel"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="game-over-icon-ring">
          <Skull size={48} color="#FF5252" />
        </div>

        <h1 className="game-over-title red-text-glow">CẠN KIỆT NĂNG LƯỢNG BIỆN CHỨNG</h1>
        <span className="game-over-subtitle font-number">THẤT BẠI TẠI MÀN {level}</span>

        {/* Philosophical Quote */}
        <div className="game-over-quote-box">
          <AlertCircle size={20} color="#FF5252" className="quote-icon" />
          <p className="quote-text">{randomQuote}</p>
        </div>

        {/* Action Buttons */}
        <div className="game-over-actions">
          <GameButton
            variant="danger"
            size="lg"
            icon={<RefreshCw size={20} />}
            onClick={onRetry}
          >
            CHƠI LẠI MÀN {level}
          </GameButton>

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
