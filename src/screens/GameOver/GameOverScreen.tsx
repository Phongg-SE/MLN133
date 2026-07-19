import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GameButton } from '../../components/Button/GameButton';
import { AlertTriangle, RotateCcw, Home, Quote } from 'lucide-react';
import { AudioService } from '../../services/AudioService';
import './GameOverScreen.css';

export interface GameOverScreenProps {
  level: number;
  reason?: 'hp' | 'timer';
  onRetry: () => void;
  onHomeClick: () => void;
}

export const PHILOSOPHICAL_QUOTES = [
  {
    quote: "Không có lý luận cách mạng thì không thể có phong trào cách mạng.",
    author: "V.I. Lênin",
  },
  {
    quote: "Các nhà triết học chỉ giải thích thế giới bằng nhiều cách khác nhau, song vấn đề là cải tạo thế giới.",
    author: "C. Mác",
  },
  {
    quote: "Thực tiễn không có lý luận soi đường là thực tiễn mù mịt; Lý luận không liên hệ thực tiễn là lý luận suông.",
    author: "V.I. Lênin",
  },
];

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  level,
  reason = 'hp',
  onRetry,
  onHomeClick,
}) => {
  useEffect(() => {
    AudioService.playGameOver();
  }, []);

  const randomQuote = PHILOSOPHICAL_QUOTES[Math.floor(Math.random() * PHILOSOPHICAL_QUOTES.length)];

  return (
    <div className="game-over-screen">
      <div className="game-over-vignette" />

      <motion.div
        className="game-over-card glass-panel"
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Warning Icon */}
        <div className="game-over-icon-wrap">
          <AlertTriangle size={56} color="#FF5252" />
        </div>

        {/* Title */}
        <h1 className="game-over-title">THỜI KỲ CÁCH MẠNG TẠM NƯNG</h1>
        <span className="game-over-subtitle font-number">
          {reason === 'timer' ? '⚠️ KHỦNG HOẢNG THỜI GIAN — ĐỒNG HỒ ĐẾM NGƯỢC VỀ 0' : '⚠️ CẠN KIỆT SINH MỆNH — ỔN ĐỊNH XÃ HỘI (HP) = 0'}
        </span>

        {/* Description */}
        <p className="game-over-desc">
          {reason === 'timer'
            ? 'Đồng hồ đếm ngược của màn chơi đã hết trước khi Ban Lãnh Đạo Tiền Phong tích lũy đủ số Điểm Giác Ngộ (XP) để hoàn thành Màn!'
            : 'Đông Dương Quốc gặp khủng hoảng sinh mệnh do sai sót lý luận hoặc tổn hại mâu thuẫn kéo dài mà không có thẻ phòng vệ!'}
        </p>

        {/* Quote Box */}
        <div className="game-over-quote-box glass-panel">
          <Quote size={20} color="#FFD700" className="game-over-quote-icon" />
          <p className="game-over-quote-text">"{randomQuote.quote}"</p>
          <span className="game-over-quote-author font-number">— {randomQuote.author}</span>
        </div>

        {/* Actions */}
        <div className="game-over-actions">
          <GameButton
            variant="primary"
            size="lg"
            icon={<RotateCcw size={20} />}
            onClick={() => {
              AudioService.playClick();
              onRetry();
            }}
            className="pulse-glow"
          >
            CHỈNH ĐỐN LÝ LUẬN & CHƠI LẠI MÀN {level}
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
            VỀ MENU CHÍNH BẢN ĐỒ
          </GameButton>
        </div>
      </motion.div>
    </div>
  );
};
