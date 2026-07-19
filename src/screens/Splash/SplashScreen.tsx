import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
import './SplashScreen.css';

export interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <motion.div
        className="splash-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Emblem Badge */}
        <div className="splash-emblem">
          <Compass className="splash-emblem__compass spin-slow" size={72} color="#FFD700" />
          <div className="splash-emblem__star">☯</div>
        </div>

        {/* Title & Slogan */}
        <h1 className="splash-title gold-text-glow">VÒNG QUAY BIỆN CHỨNG</h1>
        <p className="splash-slogan">"Kiên định lý luận, vững tay chèo lái"</p>
        <span className="splash-subtitle">SẢN PHẨM SÁNG TẠO MÔN HỌC — CHỦ NGHĨA XÃ HỘI KHOA HỌC</span>
        <div className="splash-country-badge font-number">🇻🇳 BỐI CẢNH QUỐC GIA: ĐÔNG DƯƠNG QUỐC</div>

        {/* Loading Progress Bar */}
        <div className="splash-loader-wrap glass-panel">
          <div className="splash-loader-bar" style={{ width: `${progress}%` }} />
          <span className="splash-loader-text font-number">
            ĐANG TẢI VŨ KHÍ LÝ LUẬN... {progress}%
          </span>
        </div>

        {/* Footer credits */}
        <div className="splash-credits">
          <Sparkles size={14} color="#FFD700" />
          <span>PROTOTYPE FRONTEND INDIE GAME AAA — WEB BROWSER OFFLINE</span>
        </div>
      </motion.div>
    </div>
  );
};
