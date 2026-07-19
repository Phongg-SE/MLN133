import React from 'react';
import { motion } from 'framer-motion';
import { AudioService } from '../../services/AudioService';
import { Eye, Shield, Zap, Clock, Package } from 'lucide-react';
import './InventoryBar.css';

export interface InventoryItem {
  id: 'lienMinhCongNong' | 'keHoachHoa' | 'kienDinhTuTuong' | 'giacNgoLyLuan';
  name: string;
  subtitle: string;
  description: string;
  count: number;
  icon: React.ReactNode;
}

export const DEFAULT_INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'lienMinhCongNong',
    name: 'Liên minh Công - Nông',
    subtitle: 'Nhân đôi XP (x2)',
    description: 'Nền tảng đoàn kết giai cấp. Nhân đôi Điểm Giác Ngộ (XP x2) nếu trả lời đúng lượt này.',
    count: 2,
    icon: <Zap size={22} color="#FFD700" />,
  },
  {
    id: 'keHoachHoa',
    name: 'Kế hoạch hóa tập trung',
    subtitle: '+10s Thời gian',
    description: 'Sự điều tiết vĩ mô khoa học. Thêm ngay +10 giây vào đồng hồ đếm ngược.',
    count: 2,
    icon: <Clock size={22} color="#00E5FF" />,
  },
  {
    id: 'kienDinhTuTuong',
    name: 'Kiên định tư tưởng',
    subtitle: 'Chặn trừ HP (Khiên)',
    description: 'Thẻ phòng vệ bị động. Tự tiêu hao để chặn bị trừ máu khi trả lời sai hoặc gặp Khủng hoảng.',
    count: 1,
    icon: <Shield size={22} color="#66BB6A" />,
  },
  {
    id: 'giacNgoLyLuan',
    name: 'Giác ngộ lý luận',
    subtitle: 'Trợ giúp 50/50',
    description: 'Tư duy khoa học biện chứng. Kích hoạt trợ giúp 50/50, ẩn ngay 2 phương án trả lời sai.',
    count: 2,
    icon: <Eye size={22} color="#E040FB" />,
  },
];

export interface InventoryBarProps {
  items: InventoryItem[];
  onUseItem: (itemId: string) => void;
  disabled?: boolean;
}

export const InventoryBar: React.FC<InventoryBarProps> = ({
  items,
  onUseItem,
  disabled = false,
}) => {
  return (
    <footer className="inventory-bar glass-panel">
      <div className="inventory-bar__header">
        <Package size={18} color="#FFD700" />
        <span className="inventory-bar__title">KHO THẺ BÀI CHIẾN THUẬT (TỐI ĐA 3 LÁ ACTIVE)</span>
      </div>

      <div className="inventory-bar__grid">
        {items.map((item) => {
          const isAvailable = item.count > 0 && !disabled;

          return (
            <motion.button
              key={item.id}
              className={`inventory-slot ${!isAvailable ? 'inventory-slot--disabled' : ''}`}
              whileHover={{ scale: isAvailable ? 1.05 : 1 }}
              whileTap={{ scale: isAvailable ? 0.95 : 1 }}
              onClick={() => {
                if (!isAvailable) return;
                AudioService.playClick();
                onUseItem(item.id);
              }}
              title={`${item.name}: ${item.description}`}
            >
              <div className="inventory-slot__icon-wrap">
                {item.icon}
                <span className="inventory-slot__count font-number">x{item.count}</span>
              </div>

              <div className="inventory-slot__info">
                <span className="inventory-slot__name">{item.name}</span>
                <span className="inventory-slot__sub">{item.subtitle}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </footer>
  );
};
