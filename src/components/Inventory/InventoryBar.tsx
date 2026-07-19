import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Eye } from 'lucide-react';
import { AudioService } from '../../services/AudioService';
import './InventoryBar.css';

export interface InventoryItem {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
  description: string;
}

export interface InventoryBarProps {
  items: InventoryItem[];
  onUseItem?: (itemId: string) => void;
  disabled?: boolean;
}

export const InventoryBar: React.FC<InventoryBarProps> = ({
  items,
  onUseItem,
  disabled = false,
}) => {
  return (
    <footer className="inventory-bar glass-panel">
      <div className="inventory-bar__label">
        <span className="inventory-bar__title">KHAY THẺ BÀI CHIẾN THUẬT</span>
        <span className="inventory-bar__sub">Chọn thẻ hỗ trợ trong trận</span>
      </div>

      <div className="inventory-bar__slots">
        {items.map((item) => {
          const isAvailable = item.count > 0 && !disabled;

          return (
            <motion.div
              key={item.id}
              className={`inventory-slot ${isAvailable ? 'inventory-slot--available' : 'inventory-slot--empty'}`}
              whileHover={{ scale: isAvailable ? 1.08 : 1 }}
              whileTap={{ scale: isAvailable ? 0.95 : 1 }}
              onClick={() => {
                if (!isAvailable) return;
                AudioService.playClick();
                if (onUseItem) onUseItem(item.id);
              }}
            >
              <div className="inventory-slot__icon">{item.icon}</div>
              <span className="inventory-slot__name">{item.name}</span>
              <span className="inventory-slot__badge font-number">x{item.count}</span>

              {/* Hover Tooltip */}
              <div className="inventory-slot__tooltip">
                <strong>{item.name}</strong>
                <p>{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </footer>
  );
};

export const DEFAULT_INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'hint5050',
    name: 'Gợi Ý 50/50',
    count: 2,
    icon: <Eye size={22} color="#00E5FF" />,
    description: 'Loại bỏ 2 đáp án sai trong câu hỏi hiện tại.',
  },
  {
    id: 'hpShield',
    name: 'Khiên Biện Chứng',
    count: 1,
    icon: <Shield size={22} color="#66BB6A" />,
    description: 'Bảo vệ HP không bị trừ khi trả lời sai 1 lần.',
  },
  {
    id: 'doubleXp',
    name: 'Nhân 2 XP',
    count: 2,
    icon: <Zap size={22} color="#FFD700" />,
    description: 'Nhân đôi điểm XP nhận được cho câu hỏi tiếp theo.',
  },
];
