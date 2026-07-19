import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameButton } from '../Button/GameButton';
import { BookOpen, Shield, Zap, Compass, Sparkles, X, Award, HelpCircle, AlertTriangle, Eye, Clock } from 'lucide-react';
import { AudioService } from '../../services/AudioService';
import './GuideModal.css';

export interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'levels' | 'cards' | 'wheel'>('story');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="guide-overlay" onClick={onClose}>
        <motion.div
          className="guide-modal glass-panel"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="guide-header">
            <div className="guide-title-wrap">
              <Compass size={28} color="#FFD700" />
              <div>
                <h2 className="gold-text-glow">CẨM NANG VÒNG QUAY BIỆN CHỨNG</h2>
                <span className="guide-slogan">"Kiên định lý luận, vững tay chèo lái"</span>
              </div>
            </div>
            <button className="guide-close-btn" onClick={() => { AudioService.playClick(); onClose(); }}>
              <X size={24} color="#FFF8DC" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="guide-tabs">
            <button
              className={`guide-tab ${activeTab === 'story' ? 'guide-tab--active' : ''}`}
              onClick={() => { AudioService.playClick(); setActiveTab('story'); }}
            >
              <BookOpen size={16} /> bối cảnh cốt truyện
            </button>
            <button
              className={`guide-tab ${activeTab === 'levels' ? 'guide-tab--active' : ''}`}
              onClick={() => { AudioService.playClick(); setActiveTab('levels'); }}
            >
              <Compass size={16} /> 3 màn chơi (levels)
            </button>
            <button
              className={`guide-tab ${activeTab === 'cards' ? 'guide-tab--active' : ''}`}
              onClick={() => { AudioService.playClick(); setActiveTab('cards'); }}
            >
              <Zap size={16} /> 4 thẻ bài chiến thuật
            </button>
            <button
              className={`guide-tab ${activeTab === 'wheel' ? 'guide-tab--active' : ''}`}
              onClick={() => { AudioService.playClick(); setActiveTab('wheel'); }}
            >
              <Sparkles size={16} /> vòng quay & cố vấn
            </button>
          </div>

          {/* Tab Content */}
          <div className="guide-content">
            {activeTab === 'story' && (
              <div className="guide-panel">
                <h3>🇻🇳 BỐI CẢNH & NHÀM NHIỆM VỤ ĐÔNG DƯƠNG QUỐC</h3>
                <p>
                  Tại quốc gia giả định <strong>Đông Dương Quốc</strong>, cuộc cách mạng vô sản vừa giành chiến thắng vang dội. Đất nước chính thức bước vào <strong>Thời kỳ quá độ lên Chủ nghĩa xã hội</strong>.
                </p>
                <p>
                  Bạn đảm nhận trọng trách làm <strong>Ban Lãnh Đạo Tiền Phong (Nhà Kiến Thiết Cách Mạng)</strong>. Bạn cần vận dụng vũ khí lý luận của Chủ nghĩa xã hội khoa học để giải quyết các bài toán về giai cấp, dân tộc, tôn giáo và gia đình nhằm bảo vệ thành quả cách mạng!
                </p>
                <div className="guide-stat-explain">
                  <div className="guide-stat-item">
                    <Zap size={20} color="#FFD700" />
                    <div>
                      <strong>Điểm Giác Ngộ (XP):</strong> Thước đo tiến trình vượt ải. Tích lũy đủ chỉ số XP yêu cầu để chinh phục thành công mỗi Màn chơi.
                    </div>
                  </div>
                  <div className="guide-stat-item">
                    <Shield size={20} color="#FF5252" />
                    <div>
                      <strong>Ổn Định Xã Hội (HP):</strong> Thanh sinh mệnh của quốc gia (Khởi đầu 100 HP). Trả lời sai lý luận hoặc gặp Khủng hoảng mà không phòng vệ sẽ bị trừ máu. HP tụt về 0 = Thất bại!
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'levels' && (
              <div className="guide-panel">
                <h3>🗺️ HỆ THỐNG 3 MÀN CHƠI THEO MẠCH KIẾN THỨC</h3>
                <div className="guide-sectors-grid">
                  <div className="guide-sector-card">
                    <Award size={24} color="#FFD700" />
                    <div>
                      <strong>Màn 1: Công xưởng thế kỷ XIX (300 XP)</strong>
                      <p>Chương 1 & 2: Nhập môn CNXH Khoa học & Sứ mệnh Giai cấp Công nhân. Bối cảnh công xưởng, nhà máy, bánh răng công nghiệp.</p>
                    </div>
                  </div>
                  <div className="guide-sector-card">
                    <Award size={24} color="#00E5FF" />
                    <div>
                      <strong>Màn 2: Nghị trường Cách mạng (600 XP)</strong>
                      <p>Chương 3 & 4: CNXH & Thời kỳ quá độ, Dân chủ & Nhà nước XHCN. Bối cảnh quảng trường trung tâm, tòa nhà nghị sự quốc gia.</p>
                    </div>
                  </div>
                  <div className="guide-sector-card">
                    <Award size={24} color="#66BB6A" />
                    <div>
                      <strong>Màn 3: Bản làng & Mái ấm Hiện đại (1000 XP)</strong>
                      <p>Chương 5, 6 & 7: Cơ cấu Xã hội - Giai cấp, Dân tộc, Tôn giáo & Gia đình XHCN. Bối cảnh thung lũng đa sắc màu văn hóa & kiến trúc hiện đại.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cards' && (
              <div className="guide-panel">
                <h3>🃏 4 THẺ BÀI CHIẾN THUẬT BỔ TRỢ</h3>
                <div className="guide-sectors-grid">
                  <div className="guide-sector-card">
                    <Zap size={22} color="#FFD700" />
                    <div>
                      <strong>Liên minh Công - Nông (XP x2)</strong>
                      <p>Sức mạnh đoàn kết giai cấp. Nhân đôi số Điểm Giác Ngộ (XP x2) nhận được nếu trả lời đúng câu hỏi ở lượt này.</p>
                    </div>
                  </div>
                  <div className="guide-sector-card">
                    <Clock size={22} color="#00E5FF" />
                    <div>
                      <strong>Kế hoạch hóa tập trung (+10s)</strong>
                      <p>Sự điều tiết vĩ mô khoa học. Thêm ngay +10 giây vào đồng hồ đếm ngược của lượt chơi hiện tại.</p>
                    </div>
                  </div>
                  <div className="guide-sector-card">
                    <Shield size={22} color="#66BB6A" />
                    <div>
                      <strong>Kiên định tư tưởng (Khiên HP)</strong>
                      <p>Thẻ phòng vệ bị động. Tự động tiêu hao để chặn bị trừ máu (HP -= 0) khi trả lời sai hoặc trúng ô Khủng hoảng.</p>
                    </div>
                  </div>
                  <div className="guide-sector-card">
                    <Eye size={22} color="#E040FB" />
                    <div>
                      <strong>Giác ngộ lý luận (Trợ giúp 50/50)</strong>
                      <p>Tư duy khoa học biện chứng. Kích hoạt trợ giúp 50/50, lập tức ẩn 2 phương án trả lời sai trên bảng câu hỏi.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wheel' && (
              <div className="guide-panel">
                <h3>⚙️ VÒNG QUAY 8 Ô MA TRẬN & CỐ VẤN LÝ LUẬN</h3>
                <p>Mỗi lượt quay dừng ngẫu nhiên ở 1 trong 8 ô thuộc 3 kịch bản chính:</p>
                <div className="guide-sectors-grid">
                  <div className="guide-sector-card">
                    <HelpCircle size={20} color="#FFD700" />
                    <div>
                      <strong>Ô Câu hỏi lý luận:</strong> Trắc nghiệm kiến thức. Trả lời đúng nhận +25 XP, sai bị trừ -20 HP. Game có 3 giây dừng hiển thị giải thích giáo trình.
                    </div>
                  </div>
                  <div className="guide-sector-card">
                    <Sparkles size={20} color="#00E5FF" />
                    <div>
                      <strong>Ô Thẻ may mắn:</strong> Chọn lật 1 trong 3 lá bài để bổ sung vào khay vật phẩm túi đồ.
                    </div>
                  </div>
                  <div className="guide-sector-card">
                    <AlertTriangle size={20} color="#FF5252" />
                    <div>
                      <strong>Ô Thử thách khủng hoảng:</strong> Sự kiện mâu thuẫn quốc gia ở Đông Dương Quốc. Chọn quyết sách đúng để vượt qua khủng hoảng.
                    </div>
                  </div>
                </div>
                <p style={{ marginTop: '10px' }}>
                  👴 <strong>NPC Cố vấn Lý luận:</strong> Các nhà kinh điển <em>C.Mác, Ph.Ăng-ghen, V.I.Lênin</em> sẽ xuất hiện trong các câu hỏi để đưa ra trích dẫn gợi ý sâu sắc.
                </p>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="guide-footer">
            <GameButton variant="primary" size="md" onClick={() => { AudioService.playClick(); onClose(); }}>
              ĐÃ ĐỌC & ĐỒNG Ý CHÈO LÁI
            </GameButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
