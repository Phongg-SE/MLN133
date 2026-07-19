import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
import './SplashScreen.css';

export interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2400); // 2.4s auto transition
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      {/* Central Rotating Glow Emblem */}
      <motion.div
        className="splash-logo-wrap"
        initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="splash-emblem-glow">
          <Compass size={80} color="#FFD700" className="splash-compass-icon" />
        </div>
      </motion.div>

      {/* Game Titles */}
      <motion.div
        className="splash-titles"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <span className="splash-sub">GAME GIÁO DỤC LÝ LUẬN CHÍNH TRỊ</span>
        <h1 className="splash-main-title gold-text-glow">VÒNG QUAY BIỆN CHỨNG</h1>
        <p className="splash-tagline">HÀNH TRÌNH CHINH PHỤC CHỦ NGHĨA XÃ HỘI KHOA HỌC</p>
      </motion.div>

      {/* Progress Bar & Loader */}
      <motion.div
        className="splash-loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="splash-bar-track">
          <motion.div
            className="splash-bar-fill"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </div>
        <span className="splash-loading-text font-number">ĐANG TẢI DỮ LIỆU LÝ LUẬN...</span>
      </motion.div>

      <div className="splash-footer">
        <Sparkles size={14} color="#D4AF37" /> INDIE GAME PROTOTYPE FOR DEMO
      </div>
    </div>
  );
};
