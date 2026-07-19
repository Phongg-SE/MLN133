import React from 'react';
import { motion } from 'framer-motion';
import { GameButton } from '../../components/Button/GameButton';
import { Lock, Flag, Star, ArrowLeft, Shield, MapPin, Compass, Factory, Landmark, Home } from 'lucide-react';
import { AudioService } from '../../services/AudioService';
import './LevelSelectScreen.css';

export interface LevelSelectScreenProps {
  completedLevels: number[];
  levelStars: Record<number, number>;
  onSelectLevel: (level: number) => void;
  onBackToMenu: () => void;
}

export interface MapNodeConfig {
  chapterId: number;
  stageId: number;
  stageName: string;
  name: string;
  subName: string;
  targetXp: number;
  timerPerQ: number;
  x: number;
  y: number;
}

export const CHAPTER_NODES: MapNodeConfig[] = [
  // GIAI ĐOẠN 1: CÔNG XƯỞNG THẾ KỶ XIX (Chương 1 & 2)
  {
    chapterId: 1,
    stageId: 1,
    stageName: 'GIAI ĐOẠN 1: CÔNG XƯỞNG THẾ KỶ XIX',
    name: 'Chương 1: Nhập môn CNXH Khoa học',
    subName: 'Sự ra đời và phát kiến vĩ đại của Mác - Ăngghen',
    targetXp: 150,
    timerPerQ: 30,
    x: 10,
    y: 70,
  },
  {
    chapterId: 2,
    stageId: 1,
    stageName: 'GIAI ĐOẠN 1: CÔNG XƯỞNG THẾ KỶ XIX',
    name: 'Chương 2: Sứ mệnh Công nhân',
    subName: 'Địa vị kinh tế - xã hội & vai trò đại công nghiệp',
    targetXp: 300,
    timerPerQ: 30,
    x: 24,
    y: 40,
  },
  // GIAI ĐOẠN 2: NGHỊ TRƯỜNG CÁCH MẠNG (Chương 3 & 4)
  {
    chapterId: 3,
    stageId: 2,
    stageName: 'GIAI ĐOẠN 2: NGHỊ TRƯỜNG CÁCH MẠNG',
    name: 'Chương 3: CNXH & Quá độ',
    subName: 'Đặc trưng CNXH & đường lối quá độ gián tiếp',
    targetXp: 450,
    timerPerQ: 20,
    x: 42,
    y: 70,
  },
  {
    chapterId: 4,
    stageId: 2,
    stageName: 'GIAI ĐOẠN 2: NGHỊ TRƯỜNG CÁCH MẠNG',
    name: 'Chương 4: Dân chủ & Nhà nước',
    subName: 'Bản chất dân chủ XHCN & Nhà nước pháp quyền',
    targetXp: 600,
    timerPerQ: 20,
    x: 56,
    y: 36,
  },
  // GIAI ĐOẠN 3: BẢN LÀNG & MÁI ẤM HIỆN ĐẠI (Chương 5, 6 & 7)
  {
    chapterId: 5,
    stageId: 3,
    stageName: 'GIAI ĐOẠN 3: BẢN LÀNG & MÁI ẤM HIỆN ĐẠI',
    name: 'Chương 5: Liên minh Giai tầng',
    subName: 'Khối đại đoàn kết Công - Nông - Trí thức',
    targetXp: 750,
    timerPerQ: 15,
    x: 70,
    y: 70,
  },
  {
    chapterId: 6,
    stageId: 3,
    stageName: 'GIAI ĐOẠN 3: BẢN LÀNG & MÁI ẤM HIỆN ĐẠI',
    name: 'Chương 6: Dân tộc & Tôn giáo',
    subName: 'Cương lĩnh dân tộc & chính sách tự do tôn giáo',
    targetXp: 900,
    timerPerQ: 15,
    x: 82,
    y: 38,
  },
  {
    chapterId: 7,
    stageId: 3,
    stageName: 'GIAI ĐOẠN 3: BẢN LÀNG & MÁI ẤM HIỆN ĐẠI',
    name: 'Chương 7: Gia đình XHCN',
    subName: 'Chế độ hôn nhân tiến bộ & xây dựng gia đình',
    targetXp: 1000,
    timerPerQ: 15,
    x: 93,
    y: 72,
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
      {/* Top Header Bar */}
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
          <span>HOÀN THÀNH: {completedLevels.length} / 7 CHƯƠNG</span>
        </div>
      </div>

      {/* Map Area Canvas Container */}
      <div className="level-map-container glass-panel">
        {/* 3 STAGE TERRITORY ZONES DIRECTLY INSIDE MAP */}
        <div className="map-stage-zone map-stage-zone--1">
          <div className="map-stage-zone__header">
            <Factory size={16} color="#FFD700" />
            <span>GIAI ĐOẠN 1: CÔNG XƯỞNG THẾ KỶ XIX (CHƯƠNG 1 ➔ 2)</span>
          </div>
        </div>

        <div className="map-stage-zone map-stage-zone--2">
          <div className="map-stage-zone__header">
            <Landmark size={16} color="#00E5FF" />
            <span>GIAI ĐOẠN 2: NGHỊ TRƯỜNG CÁCH MẠNG (CHƯƠNG 3 ➔ 4)</span>
          </div>
        </div>

        <div className="map-stage-zone map-stage-zone--3">
          <div className="map-stage-zone__header">
            <Home size={16} color="#66BB6A" />
            <span>GIAI ĐOẠN 3: BẢN LÀNG & MÁI ẤM (CHƯƠNG 5 ➔ 6 ➔ 7)</span>
          </div>
        </div>

        {/* SVG Connecting Paths linking Node 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 */}
        <svg className="level-map-svg">
          {CHAPTER_NODES.slice(0, -1).map((node, i) => {
            const nextNode = CHAPTER_NODES[i + 1];
            const isPathUnlocked = completedLevels.includes(node.chapterId);

            return (
              <line
                key={`line-${i}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${nextNode.x}%`}
                y2={`${nextNode.y}%`}
                stroke={isPathUnlocked ? '#FFD700' : 'rgba(212, 175, 55, 0.25)'}
                strokeWidth={isPathUnlocked ? '3.5' : '2'}
                strokeDasharray={isPathUnlocked ? 'none' : '6 6'}
              />
            );
          })}
        </svg>

        {/* Map Nodes for 7 Chapters */}
        {CHAPTER_NODES.map((node) => {
          const isUnlocked = node.chapterId === 1 || completedLevels.includes(node.chapterId - 1);
          const isCompleted = completedLevels.includes(node.chapterId);
          const stars = levelStars[node.chapterId] || (isCompleted ? 3 : 0);

          return (
            <div
              key={node.chapterId}
              className={`map-node stage-node--${node.stageId} ${isUnlocked ? 'map-node--unlocked' : 'map-node--locked'} ${isCompleted ? 'map-node--completed' : ''}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => {
                if (!isUnlocked) return;
                AudioService.playClick();
                onSelectLevel(node.chapterId);
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
                    <Flag size={22} color="#4CAF50" />
                  ) : isUnlocked ? (
                    <MapPin size={22} color="#FFD700" />
                  ) : (
                    <Lock size={20} color="#78909C" />
                  )}
                  <span className="map-node__number font-number">{node.chapterId}</span>
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
                          size={11}
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
                <span className="map-node__tooltip-stage font-number">{node.stageName}</span>
                <strong>{node.name}</strong>
                <p>{node.subName}</p>
                <div className="map-node__tooltip-target font-number">
                  🎯 Yêu cầu: {node.targetXp} XP | ⏱️ {node.timerPerQ}s/câu
                </div>
                <div className="map-node__tooltip-status">
                  {isCompleted
                    ? '✓ ĐÃ HOÀN THÀNH CHƯƠNG'
                    : isUnlocked
                    ? '▶ NHẤP ĐỂ BẮT ĐẦU CHÈO LÁI'
                    : '🔒 CHƯA MỞ KHÓA CHƯƠNG NÀY'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
