import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GameButton } from '../../components/Button/GameButton';
import { GuideModal } from '../../components/Modal/GuideModal';
import { Play, MapPin, BookOpen, Volume2, VolumeX, LogOut, Shield, Compass } from 'lucide-react';
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

  const handleExit = () => {
    AudioService.playClick();
    setShowExitToast(true);
    setTimeout(() => setShowExitToast(false), 3000);
  };

  return (
    <div className="main-menu-screen">
      {/* Background Lighting Vignette */}
      <div className="main-menu-bg-glow" />

      {/* Header Banner */}
      <motion.div
        className="main-menu-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="main-menu-logo-ring">
          <Compass size={44} color="#FFD700" />
        </div>
        <div className="main-menu-titles">
          <span className="main-menu-sub font-number">PROTOTYPE GAME WEB CẤP ĐỘ STEAM INDIE</span>
          <h1 className="main-menu-title gold-text-glow">VÒNG QUAY BIỆN CHỨNG</h1>
        </div>
      </motion.div>

      {/* Main Buttons Frame */}
      <motion.div
        className="main-menu-card glass-panel"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="main-menu-options">
          <GameButton
            variant="primary"
            size="lg"
            icon={<MapPin size={22} />}
            onClick={onStartGame}
          >
            CHỌN MÀN CHƠI (BẢN ĐỒ)
          </GameButton>

          <GameButton
            variant="secondary"
            size="lg"
            icon={<Play size={22} color="#FFD700" />}
            onClick={onQuickPlay}
          >
            CHƠI NHANH (CẤP 1)
          </GameButton>

          <GameButton
            variant="secondary"
            size="lg"
            icon={<BookOpen size={22} color="#00E5FF" />}
            onClick={() => {
              AudioService.playClick();
              setIsGuideOpen(true);
            }}
          >
            HƯỚNG DẪN LUẬT CHƠI
          </GameButton>

          <GameButton
            variant="danger"
            size="md"
            icon={<LogOut size={20} />}
            onClick={handleExit}
          >
            THOÁT TRÒ CHƠI
          </GameButton>
        </div>
      </motion.div>

      {/* Bottom Controls */}
      <div className="main-menu-footer">
        <button
          className="main-menu-audio-btn"
          onClick={() => {
            AudioService.playClick();
            onToggleAudio();
          }}
        >
          {isAudioMuted ? (
            <>
              <VolumeX size={18} color="#E53935" /> <span>ÂM THANH: TẮT</span>
            </>
          ) : (
            <>
              <Volume2 size={18} color="#FFD700" /> <span>ÂM THANH: BẬT</span>
            </>
          )}
        </button>
        <span className="main-menu-version font-number">v1.0.0 PROTOTYPE DEMO</span>
      </div>

      {/* Guide Modal */}
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* Exit Toast Notification */}
      {showExitToast && (
        <motion.div
          className="main-menu-toast glass-panel"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <Shield size={20} color="#FFD700" />
          <span>Game offline chạy trực tiếp trên Browser! Đóng tab để thoát hoàn toàn.</span>
        </motion.div>
      )}
    </div>
  );
};
