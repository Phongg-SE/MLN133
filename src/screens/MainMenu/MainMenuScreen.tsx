import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GameButton } from '../../components/Button/GameButton';
import { GuideModal } from '../../components/Modal/GuideModal';
import { Compass, Play, BookOpen, Volume2, VolumeX, LogOut, Shield, Sparkles } from 'lucide-react';
import { AudioService } from '../../services/AudioService';
import './MainMenuScreen.css';

export interface MainMenuScreenProps {
  onStartGame: () => void;
  onQuickPlay: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export const MainMenuScreen: React.FC<MainMenuScreenProps> = ({
  onStartGame,
  onQuickPlay,
  isAudioMuted,
  onToggleAudio,
}) => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [showExitToast, setShowExitToast] = useState(false);

  const handleExitClick = () => {
    AudioService.playClick();
    setShowExitToast(true);
    setTimeout(() => setShowExitToast(false), 3000);
  };

  return (
    <div className="main-menu-screen">
      {/* Background Frame Glow */}
      <div className="main-menu-bg-overlay" />

      {/* Main Content Container */}
      <motion.div
        className="main-menu-container glass-panel"
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Game Title Emblem */}
        <div className="main-menu-header">
          <div className="main-menu-emblem">
            <Compass size={56} color="#FFD700" className="spin-slow" />
            <div className="main-menu-emblem__star font-number">☯</div>
          </div>
          <h1 className="main-menu-title gold-text-glow">VÒNG QUAY BIỆN CHỨNG</h1>
          <p className="main-menu-slogan">"Kiên định lý luận, vững tay chèo lái"</p>
          <span className="main-menu-tagline">
            TRÒ CHƠI NỀN TẢNG WEB TƯƠNG TÁC LÝ LUẬN CHÍNH TRỊ — MÔN CNXH KHOA HỌC
          </span>
        </div>

        {/* Story Intro Card */}
        <div className="main-menu-story-card glass-panel">
          <div className="main-menu-story-header">
            <Shield size={18} color="#FFD700" />
            <span>NHIỆM VỤ BAN LÃNH ĐẠO TIỀN PHONG — ĐÔNG DƯƠNG QUỐC</span>
          </div>
          <p>
            Đất nước bước vào <strong>Thời kỳ quá độ lên CNXH</strong>. Hãy vận dụng tư tưởng biện chứng khoa học, vượt qua 3 Màn chơi (300 XP, 600 XP, 1000 XP) và đập tan mọi luận điệu sai trái để bảo vệ thành quả cách mạng!
          </p>
        </div>

        {/* Menu Buttons */}
        <div className="main-menu-actions">
          <GameButton
            variant="primary"
            size="lg"
            icon={<Play size={22} />}
            onClick={() => {
              AudioService.playClick();
              onStartGame();
            }}
            className="pulse-glow"
          >
            CHÈO LÁI ĐÔNG DƯƠNG QUỐC (3 MÀN CHƠI)
          </GameButton>

          <GameButton
            variant="secondary"
            size="md"
            icon={<Sparkles size={20} color="#FFD700" />}
            onClick={() => {
              AudioService.playClick();
              onQuickPlay();
            }}
          >
            CHƠI NHANH (MÀN 1 - CÔNG XƯỞNG THẾ KỶ XIX)
          </GameButton>

          <div className="main-menu-row-btns">
            <GameButton
              variant="secondary"
              size="md"
              icon={<BookOpen size={18} />}
              onClick={() => {
                AudioService.playClick();
                setIsGuideOpen(true);
              }}
            >
              HƯỚNG DẪN & CỔ BẢN
            </GameButton>

            <GameButton
              variant="secondary"
              size="md"
              icon={isAudioMuted ? <VolumeX size={18} color="#E53935" /> : <Volume2 size={18} color="#FFD700" />}
              onClick={() => {
                AudioService.playClick();
                onToggleAudio();
              }}
            >
              {isAudioMuted ? 'ÂM THANH: TẮT' : 'ÂM THANH: BẬC'}
            </GameButton>
          </div>

          <GameButton
            variant="danger"
            size="sm"
            icon={<LogOut size={16} />}
            onClick={handleExitClick}
          >
            THOÁT GAME
          </GameButton>
        </div>

        {/* Toast Exit Notification */}
        {showExitToast && (
          <motion.div
            className="exit-toast glass-panel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            ℹ️ Game offline chạy trực tiếp trên trình duyệt Web. Để thoát, bạn chỉ cần đóng tab trình duyệt!
          </motion.div>
        )}

        {/* Footer info */}
        <div className="main-menu-footer">
          <span>Sản phẩm sáng tạo học tập môn MLN131 / MLN133 — Phiên bản AAA Game UI Demo</span>
        </div>
      </motion.div>

      {/* Guide Modal */}
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
};
