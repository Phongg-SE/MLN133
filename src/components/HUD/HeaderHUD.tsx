import React from 'react';
import { StatBar } from '../ProgressBar/StatBar';
import { Heart, Zap, Clock, Volume2, VolumeX, Home, Shield, Award } from 'lucide-react';
import { AudioService } from '../../services/AudioService';
import './HeaderHUD.css';

export interface HeaderHUDProps {
  hp: number;
  maxHp: number;
  xp: number;
  maxXp: number;
  timer: number;
  maxTimer: number;
  level: number;
  chapterTitle: string;
  score: number;
  onHomeClick?: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  hp,
  maxHp,
  xp,
  maxXp,
  timer,
  maxTimer,
  level,
  chapterTitle,
  score,
  onHomeClick,
  isAudioMuted,
  onToggleAudio,
}) => {
  return (
    <header className="header-hud glass-panel">
      {/* Left: Level / Chapter info */}
      <div className="header-hud__section header-hud__level">
        <div className="header-hud__badge">
          <Shield size={18} className="header-hud__badge-icon" />
          <span className="font-number">MÀN {level}</span>
        </div>
        <div className="header-hud__chapter-info">
          <span className="header-hud__chapter-label">CHƯƠNG HIỆN TẠI</span>
          <h3 className="header-hud__chapter-title">{chapterTitle}</h3>
        </div>
      </div>

      {/* Center: StatBars (HP, XP, Timer) */}
      <div className="header-hud__section header-hud__stats">
        <StatBar
          label="HP"
          current={hp}
          max={maxHp}
          type="hp"
          icon={<Heart size={14} color="#FF5252" />}
        />
        <StatBar
          label="XP"
          current={xp}
          max={maxXp}
          type="xp"
          icon={<Zap size={14} color="#FFD700" />}
        />
        <StatBar
          label="THỜI GIAN"
          current={timer}
          max={maxTimer}
          type="timer"
          icon={<Clock size={14} color="#00E5FF" />}
        />
      </div>

      {/* Right: Score, Sound & Home */}
      <div className="header-hud__section header-hud__actions">
        <div className="header-hud__score">
          <Award size={18} className="header-hud__score-icon" />
          <div className="header-hud__score-value font-number">{score}</div>
        </div>

        <button
          className="header-hud__btn"
          onClick={() => {
            AudioService.playClick();
            onToggleAudio();
          }}
          title={isAudioMuted ? 'Mở Âm Thanh' : 'Tắt Âm Thanh'}
        >
          {isAudioMuted ? <VolumeX size={20} color="#E53935" /> : <Volume2 size={20} color="#FFD700" />}
        </button>

        {onHomeClick && (
          <button
            className="header-hud__btn"
            onClick={() => {
              AudioService.playClick();
              onHomeClick();
            }}
            title="Thoát Về Menu"
          >
            <Home size={20} color="#F5E6C8" />
          </button>
        )}
      </div>
    </header>
  );
};
