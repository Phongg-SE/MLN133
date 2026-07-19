import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameButton } from '../Button/GameButton';
import { Heart, Zap, Compass, Sparkles, BookOpen, ShieldCheck, X } from 'lucide-react';
import { AudioService } from '../../services/AudioService';
import './GuideModal.css';

export interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'stats' | 'wheel' | 'cards'>('rules');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="guide-overlay" onClick={() => { AudioService.playClick(); onClose(); }}>
        <motion.div
          className="guide-modal glass-panel"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="guide-modal__header">
            <div className="guide-modal__title-wrap">
              <BookOpen size={24} color="#FFD700" />
              <h2>CẨM NANG HƯỚNG DẪN BIỆN CHỨNG</h2>
            </div>
            <button className="guide-modal__close-btn" onClick={() => { AudioService.playClick(); onClose(); }}>
              <X size={24} color="#F5E6C8" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="guide-modal__tabs">
            <button
              className={`guide-tab ${activeTab === 'rules' ? 'guide-tab--active' : ''}`}
              onClick={() => { AudioService.playClick(); setActiveTab('rules'); }}
            >
              <ShieldCheck size={16} /> LUẬT CHƠI
            </button>
            <button
              className={`guide-tab ${activeTab === 'stats' ? 'guide-tab--active' : ''}`}
              onClick={() => { AudioService.playClick(); setActiveTab('stats'); }}
            >
              <Heart size={16} /> CHỈ SỐ (HP/XP)
            </button>
            <button
              className={`guide-tab ${activeTab === 'wheel' ? 'guide-tab--active' : ''}`}
              onClick={() => { AudioService.playClick(); setActiveTab('wheel'); }}
            >
              <Compass size={16} /> VÒNG QUAY
            </button>
            <button
              className={`guide-tab ${activeTab === 'cards' ? 'guide-tab--active' : ''}`}
              onClick={() => { AudioService.playClick(); setActiveTab('cards'); }}
            >
              <Sparkles size={16} /> THẺ MAY MẮN
            </button>
          </div>

          {/* Tab Content */}
          <div className="guide-modal__body">
            {activeTab === 'rules' && (
              <div className="guide-content">
                <h3>📜 LUẬT CHƠI TỔNG QUÁT</h3>
                <p>
                  "Vòng Quay Biện Chứng" là trò chơi chiến thuật trí tuệ nhằm chinh phục 7 Chương lý luận
                  Chủ nghĩa Xã hội Khoa học. Người chơi vượt qua từng vùng đất trên bản đồ lịch sử bằng cách
                  quay Vòng quay biện chứng, trả lời các câu hỏi lý luận và xử lý các biến cố.
                </p>
                <ul>
                  <li><strong>Hành trình 7 Màn:</strong> Màn 1 đến Màn 7 đại diện cho 7 Chương giáo trình.</li>
                  <li><strong>Quay Vòng Quay:</strong> Mỗi lượt quay sẽ dẫn đến Câu hỏi, Thẻ bài hay Biến cố.</li>
                  <li><strong>Chiến Thắng:</strong> Hoàn thành số câu hỏi yêu cầu trong màn chơi để mở khóa Màn tiếp theo.</li>
                  <li><strong>Thất Bại:</strong> Khi điểm HP giảm về 0, bạn sẽ bị cạn kiệt năng lượng biện chứng.</li>
                </ul>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="guide-content">
                <h3>❤️ HỆ THỐNG CHỈ SỐ GAME</h3>
                <div className="guide-stat-grid">
                  <div className="guide-stat-card">
                    <Heart size={32} color="#FF5252" />
                    <div>
                      <h4>HP (Điểm Sinh Lực)</h4>
                      <p>Khởi đầu 100 HP. Trả lời sai câu hỏi hoặc gặp biến cố nguy hiểm sẽ bị trừ HP.</p>
                    </div>
                  </div>
                  <div className="guide-stat-card">
                    <Zap size={32} color="#FFD700" />
                    <div>
                      <h4>XP (Điểm Tri Thức)</h4>
                      <p>Nhận XP khi trả lời đúng và lật Thẻ may mắn. Đủ 100 XP để thăng hạng sao đánh giá.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wheel' && (
              <div className="guide-content">
                <h3>🎡 VÒNG QUAY BIỆN CHỨNG (8 PHÂN KHÚC)</h3>
                <p>Vòng quay đại diện cho các quy luật và hạng mục biện chứng:</p>
                <ul>
                  <li><strong>Câu Hỏi Lý Luận:</strong> Mở bảng câu hỏi trắc nghiệm 4 đáp án có lời giải chi tiết.</li>
                  <li><strong>Lượng - Chất:</strong> Tích lũy bứt phá, tăng điểm thưởng XP.</li>
                  <li><strong>Mâu Thuẫn:</strong> Động lực phát triển, cơ hội thử thách nhận phần thưởng lớn.</li>
                  <li><strong>Phủ Định Của Phủ Định:</strong> Kế thừa yếu tố tiến bộ, hồi phục HP hoặc nhận thẻ bài.</li>
                </ul>
              </div>
            )}

            {activeTab === 'cards' && (
              <div className="guide-content">
                <h3>🃏 THẺ BÀI MAY MẮN & KHAY THẺ CHIẾN THUẬT</h3>
                <p>
                  Khi ô Vòng quay dừng ở 'Thẻ May Mắn', bạn sẽ được chọn 1 trong 3 lá bài úp 3D:
                </p>
                <ul>
                  <li><strong>Gợi Ý 50/50:</strong> Loại bỏ 2 lựa chọn sai trong câu hỏi khó.</li>
                  <li><strong>Khiên Biện Chứng:</strong> Bảo vệ HP không bị tổn hại khi chọn sai đáp án.</li>
                  <li><strong>Nhân 2 XP:</strong> Nhân đôi phần thưởng tri thức thu được.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="guide-modal__footer">
            <GameButton variant="primary" size="md" onClick={() => { AudioService.playClick(); onClose(); }}>
              ĐÃ HẠU THUẪN (ĐÓNG)
            </GameButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
