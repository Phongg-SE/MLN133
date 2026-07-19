import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { AudioService } from '../../services/AudioService';
import { GameButton } from '../Button/GameButton';
import { HelpCircle, Sparkles, AlertTriangle, ShieldAlert, Award, RefreshCw, Compass, BookOpen } from 'lucide-react';
import './DialecticalWheel.css';

export interface Sector {
  id: number;
  label: string;
  sublabel: string;
  type: 'question' | 'lucky' | 'crisis' | 'buff';
  color: string;
  icon: React.ReactNode;
}

export const WHEEL_SECTORS: Sector[] = [
  {
    id: 0,
    label: 'CÂU HỎI LÝ LUẬN',
    sublabel: 'Thử thách tri thức',
    type: 'question',
    color: '#8B0000',
    icon: <HelpCircle size={20} color="#FFD700" />,
  },
  {
    id: 1,
    label: 'THẺ MAY MẮN',
    sublabel: 'Vận may biện chứng',
    type: 'lucky',
    color: '#1565C0',
    icon: <Sparkles size={20} color="#FFD700" />,
  },
  {
    id: 2,
    label: 'LƯỢNG - CHẤT',
    sublabel: 'Tích lũy bứt phá',
    type: 'buff',
    color: '#2E7D32',
    icon: <Award size={20} color="#FFD700" />,
  },
  {
    id: 3,
    label: 'KHỦNG HOẢNG',
    sublabel: 'Biến cố lịch sử',
    type: 'crisis',
    color: '#4A148C',
    icon: <AlertTriangle size={20} color="#FF5252" />,
  },
  {
    id: 4,
    label: 'CÂU HỎI BẬC CAO',
    sublabel: 'Vận dụng thực tiễn',
    type: 'question',
    color: '#B71C1C',
    icon: <BookOpen size={20} color="#FFD700" />,
  },
  {
    id: 5,
    label: 'MÂU THUẪN',
    sublabel: 'Động lực phát triển',
    type: 'buff',
    color: '#E65100',
    icon: <Compass size={20} color="#FFD700" />,
  },
  {
    id: 6,
    label: 'PHỦ ĐỊNH',
    sublabel: 'Kế thừa tiến bộ',
    type: 'lucky',
    color: '#00838F',
    icon: <RefreshCw size={20} color="#FFD700" />,
  },
  {
    id: 7,
    label: 'THỬ THÁCH',
    sublabel: 'Vượt mâu thuẫn',
    type: 'crisis',
    color: '#880E4F',
    icon: <ShieldAlert size={20} color="#FF5252" />,
  },
];

export interface DialecticalWheelProps {
  onSpinComplete: (sector: Sector) => void;
  disabled?: boolean;
}

export const DialecticalWheel: React.FC<DialecticalWheelProps> = ({
  onSpinComplete,
  disabled = false,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();

  const handleSpin = async () => {
    if (isSpinning || disabled) return;
    setIsSpinning(true);
    AudioService.playClick();

    // Select random sector (0 to 7)
    const targetSectorIdx = Math.floor(Math.random() * 8);
    const sectorAngle = 360 / 8; // 45 degrees per sector

    // Calculate rotation angle so target sector lands at pointer top (0 deg)
    // Sector 0 is 0-45 deg. Pointer is at 0 deg top.
    const fullSpins = 5 + Math.floor(Math.random() * 3); // 5 to 7 full rotations
    const targetAngle = fullSpins * 360 + (360 - targetSectorIdx * sectorAngle - sectorAngle / 2);

    const totalRotation = rotation + targetAngle;
    setRotation(totalRotation);

    // Play tick audio during rotation
    const tickInterval = setInterval(() => {
      AudioService.playSpinTick();
    }, 120);

    await controls.start({
      rotate: totalRotation,
      transition: {
        duration: 4,
        ease: [0.15, 0.85, 0.35, 1], // Wheel friction ease
      },
    });

    clearInterval(tickInterval);
    setIsSpinning(false);

    // Callback with selected sector
    onSpinComplete(WHEEL_SECTORS[targetSectorIdx]);
  };

  return (
    <div className="wheel-container">
      {/* Top Pointer Needle */}
      <div className="wheel-pointer">
        <div className="wheel-pointer__arrow" />
        <div className="wheel-pointer__gem" />
      </div>

      {/* Rotating Wheel Disc */}
      <div className="wheel-disc-wrapper glass-panel">
        <motion.div className="wheel-disc" animate={controls} initial={{ rotate: 0 }}>
          <svg viewBox="0 0 400 400" className="wheel-svg">
            <defs>
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {WHEEL_SECTORS.map((sector, index) => {
              const startAngle = index * 45;
              const endAngle = (index + 1) * 45;
              const x1 = 200 + 190 * Math.cos((Math.PI * (startAngle - 90)) / 180);
              const y1 = 200 + 190 * Math.sin((Math.PI * (startAngle - 90)) / 180);
              const x2 = 200 + 190 * Math.cos((Math.PI * (endAngle - 90)) / 180);
              const y2 = 200 + 190 * Math.sin((Math.PI * (endAngle - 90)) / 180);

              const pathData = `M 200 200 L ${x1} ${y1} A 190 190 0 0 1 ${x2} ${y2} Z`;
              const midAngle = startAngle + 22.5;
              const textRadius = 130;
              const textX = 200 + textRadius * Math.cos((Math.PI * (midAngle - 90)) / 180);
              const textY = 200 + textRadius * Math.sin((Math.PI * (midAngle - 90)) / 180);

              return (
                <g key={sector.id} className="wheel-sector-group">
                  <path
                    d={pathData}
                    fill={sector.color}
                    stroke="#D4AF37"
                    strokeWidth="2"
                    className="wheel-sector-path"
                  />
                  <g transform={`translate(${textX}, ${textY}) rotate(${midAngle})`}>
                    <text
                      textAnchor="middle"
                      dy="-4"
                      fill="#FFF8DC"
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="Cinzel"
                    >
                      {sector.label}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Inner Gold Ring */}
            <circle cx="200" cy="200" r="190" fill="none" stroke="#D4AF37" strokeWidth="4" />
            <circle cx="200" cy="200" r="50" fill="#140C1C" stroke="#D4AF37" strokeWidth="4" />
          </svg>

          {/* Center Emblem Cap */}
          <div className="wheel-center-cap">
            <div className="wheel-center-emblem">☯</div>
          </div>
        </motion.div>
      </div>

      {/* Spin Button */}
      <div className="wheel-controls">
        <GameButton
          variant="primary"
          size="lg"
          onClick={handleSpin}
          disabled={isSpinning || disabled}
          className="wheel-spin-btn pulse-glow"
        >
          {isSpinning ? 'ĐANG QUAY...' : 'QUAY BIỆN CHỨNG'}
        </GameButton>
      </div>
    </div>
  );
};
