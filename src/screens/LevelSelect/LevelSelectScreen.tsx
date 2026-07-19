import React from 'react';
import { motion } from 'framer-motion';
import { GameButton } from '../../components/Button/GameButton';
import { Lock, Flag, Star, ArrowLeft, Shield, MapPin, Compass } from 'lucide-react';
import { AudioService } from '../../services/AudioService';
import './LevelSelectScreen.css';

export interface LevelSelectScreenProps {
  completedLevels: number[];
  levelStars: Record<number, number>;
  onSelectLevel: (level: number) => void;
  onBackToMenu: () => void;
}

export interface MapNode {
  level: number;
  name: string;
  subName: string;
  targetXp: number;
  timerPerQ: number;
  x: number;
  y: number;
}

export const MAP_NODES: MapNode[] = [
  {
    level: 1,
    name: 'CÔNG XƯỞNG THẾ KỶ XIX',
    subName: 'Chương 1 & 2: Nhập môn CNXH Khoa học & Sứ mệnh Giai cấp Công nhân',
    targetXp: 300,
    timerPerQ: 30,
    x: 22,
    y: 65,
  },
  {
    level: 2,
    name: 'NGHỊ TRƯỜNG CÁCH MẠNG',
    subName: 'Chương 3 & 4: CNXH & Thời kỳ Quá độ, Dân chủ & Nhà nước XHCN',
    targetXp: 600,
    timerPerQ: 20,
    x: 50,
    y: 40,
  },
  {
    level: 3,
    name: 'BẢN LÀNG & MÁI ẤM HIỆN ĐẠI',
    subName: 'Chương 5, 6 & 7: Cơ cấu Xã hội, Dân tộc, Tôn giáo & Gia đình',
    targetXp: 1000,
    timerPerQ: 15,
    x: 78,
    y: 65,
  },
];

export const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({
  completedLevels,
  levelStars,
  onSelectLevel,
  onBackToMenu,
}) => {
  return (
    <div className="level-select-screen">
      {/* Top Bar */}
      <div className="level-select-header glass-panel">
        <GameButton
          variant="secondary"
          size="sm"
          icon={<ArrowLeft size={18} />}
          onClick={onBackToMenu}
        >
          MENU CHÍNH
        </GameButton>

        <div className="level-select-title-wrap">
          <Compass size={24} color="#FFD700" />
          <h2>BẢN ĐỒ CHIẾN LƯỢC ĐÔNG DƯƠNG QUỐC</h2>
        </div>

        <div className="level-select-stats font-number">
          <Shield size={18} color="#FFD700" />
          <span>TIẾN TRÌNH: {completedLevels.length} / 3 MÀN CHƠI</span>
        </div>
      </div>

      {/* Map Area Canvas Container */}
      <div className="level-map-container glass-panel">
        {/* SVG Connecting Paths */}
        <svg className="level-map-svg">
          {MAP_NODES.slice(0, -1).map((node, i) => {
            const nextNode = MAP_NODES[i + 1];
            const isPathUnlocked = completedLevels.includes(node.level);

            return (
              <line
                key={`line-${i}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${nextNode.x}%`}
                y2={`${nextNode.y}%`}
                stroke={isPathUnlocked ? '#FFD700' : 'rgba(212, 175, 55, 0.25)'}
                strokeWidth={isPathUnlocked ? '4' : '2'}
                strokeDasharray={isPathUnlocked ? 'none' : '8 8'}
              />
            );
          })}
        </svg>

        {/* Map Nodes */}
        {MAP_NODES.map((node) => {
          const isUnlocked = node.level === 1 || completedLevels.includes(node.level - 1);
          const isCompleted = completedLevels.includes(node.level);
          const stars = levelStars[node.level] || (isCompleted ? 3 : 0);

          return (
            <div
              key={node.level}
              className={`map-node ${isUnlocked ? 'map-node--unlocked' : 'map-node--locked'} ${isCompleted ? 'map-node--completed' : ''}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => {
                if (!isUnlocked) return;
                AudioService.playClick();
                onSelectLevel(node.level);
              }}
            >
              <motion.div
                className="map-node__inner"
                whileHover={{ scale: isUnlocked ? 1.15 : 1 }}
                whileTap={{ scale: isUnlocked ? 0.95 : 1 }}
              >
                {/* Node Icon/Badge */}
                <div className="map-node__badge">
                  {isCompleted ? (
                    <Flag size={24} color="#4CAF50" />
                  ) : isUnlocked ? (
                    <MapPin size={24} color="#FFD700" />
                  ) : (
                    <Lock size={22} color="#78909C" />
                  )}
                  <span className="map-node__number font-number">{node.level}</span>
                </div>

                {/* Node Label */}
                <div className="map-node__info">
                  <span className="map-node__name">{node.name}</span>
                  {/* Stars Rating */}
                  {isUnlocked && (
                    <div className="map-node__stars">
                      {[1, 2, 3].map((starIdx) => (
                        <Star
                          key={starIdx}
                          size={12}
                          color={starIdx <= stars ? '#FFD700' : 'rgba(255, 255, 255, 0.2)'}
                          fill={starIdx <= stars ? '#FFD700' : 'none'}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Hover Tooltip */}
              <div className="map-node__tooltip glass-panel">
                <strong>{node.name}</strong>
                <p>{node.subName}</p>
                <div className="map-node__tooltip-target font-number">
                  🎯 Yêu cầu: {node.targetXp} XP | ⏱️ {node.timerPerQ}s/câu
                </div>
                <div className="map-node__tooltip-status">
                  {isCompleted
                    ? '✓ ĐÃ HOÀN THÀNH'
                    : isUnlocked
                    ? '▶ NHẤP ĐỂ CHÈO LÁI MÀN CHƠI'
                    : '🔒 CHƯA MỞ KHÓA'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
