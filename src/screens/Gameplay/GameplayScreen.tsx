import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderHUD } from '../../components/HUD/HeaderHUD';
import { DialecticalWheel, type Sector } from '../../components/Wheel/DialecticalWheel';
import { TacticalCard, type CardItem } from '../../components/Card/TacticalCard';
import { InventoryBar, DEFAULT_INVENTORY_ITEMS, type InventoryItem } from '../../components/Inventory/InventoryBar';
import { GameButton } from '../../components/Button/GameButton';
import { QuestionService } from '../../services/QuestionService';
import type { Question } from '../../data/questions';
import { AudioService } from '../../services/AudioService';
import { Sparkles, CheckCircle2, XCircle, AlertTriangle, ArrowRight, Eye, Shield, Zap } from 'lucide-react';
import './GameplayScreen.css';

export interface GameplayScreenProps {
  level: number;
  onVictory: (stats: { xpGained: number; hpLeft: number; stars: number }) => void;
  onGameOver: () => void;
  onHomeClick: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export type DynamicPanelType = 'welcome' | 'question' | 'lucky' | 'crisis';

export const SAMPLE_LUCKY_CARDS: CardItem[] = [
  {
    id: 'card1',
    title: 'Hồi Phục Sinh Lực',
    subtitle: 'Năng lượng Biện chứng',
    description: 'Hồi ngay +25 điểm HP sinh lực cho người chơi.',
    type: 'buff',
    icon: <Shield size={32} color="#66BB6A" />,
    valueEffect: '+25 HP',
  },
  {
    id: 'card2',
    title: 'Đột Phá Tri Thức',
    subtitle: 'Lượng biến đổi Chất',
    description: 'Thưởng ngay +40 điểm XP kinh nghiệm lý luận.',
    type: 'special',
    icon: <Zap size={32} color="#FFD700" />,
    valueEffect: '+40 XP',
  },
  {
    id: 'card3',
    title: 'Kế Thừa Tiến Bộ',
    subtitle: 'Phủ định của Phủ định',
    description: 'Tặng 1 thẻ Gợi ý 50/50 vào khay vật phẩm.',
    type: 'buff',
    icon: <Eye size={32} color="#00E5FF" />,
    valueEffect: '+1 ITEM',
  },
];

export const GameplayScreen: React.FC<GameplayScreenProps> = ({
  level,
  onVictory,
  onGameOver,
  onHomeClick,
  isAudioMuted,
  onToggleAudio,
}) => {
  // Game Stats
  const [hp, setHp] = useState<number>(100);
  const maxHp = 100;
  const [xp, setXp] = useState<number>(0);
  const maxXp = 100; // 100 XP to win level
  const [timer, setTimer] = useState<number>(120); // 120s timer per level
  const maxTimer = 120;
  const [score, setScore] = useState<number>(0);

  // Dynamic Panel State
  const [panelState, setPanelState] = useState<DynamicPanelType>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<{
    isCorrect: boolean;
    correctAnswer: number;
    explanation: string;
  } | null>(null);

  // Cards State
  const [flippedCardIdx, setFlippedCardIdx] = useState<number | null>(null);

  // Inventory State
  const [inventory, setInventory] = useState<InventoryItem[]>(DEFAULT_INVENTORY_ITEMS);
  const [active5050, setActive5050] = useState<boolean>(false);
  const [activeShield, setActiveShield] = useState<boolean>(false);
  const [activeDoubleXp, setActiveDoubleXp] = useState<boolean>(false);

  const chapterTitle = QuestionService.getChapterName(level);

  // Level Countdown Timer Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onGameOver]);

  // Handle Wheel Spin Result
  const handleSpinComplete = (sector: Sector) => {
    setSelectedOption(null);
    setAnswerResult(null);
    setFlippedCardIdx(null);
    setActive5050(false);

    if (sector.type === 'question' || sector.type === 'buff') {
      const q = QuestionService.getRandomQuestion(level, usedQuestionIds);
      if (q) {
        setCurrentQuestion(q);
        setUsedQuestionIds((prev) => [...prev, q.id]);
        setPanelState('question');
      } else {
        setPanelState('lucky');
      }
    } else if (sector.type === 'lucky') {
      setPanelState('lucky');
    } else if (sector.type === 'crisis') {
      setPanelState('crisis');
    }
  };

  // Option Select Handler
  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null || !currentQuestion) return;

    setSelectedOption(idx);
    const result = QuestionService.validateAnswer(currentQuestion.id, idx);
    setAnswerResult(result);

    if (result.isCorrect) {
      AudioService.playCorrect();
      const xpEarned = activeDoubleXp ? 50 : 25;
      const newXp = xp + xpEarned;
      setXp(newXp);
      setScore((prev) => prev + 100);
      setActiveDoubleXp(false);

      if (newXp >= maxXp) {
        setTimeout(() => {
          onVictory({ xpGained: newXp, hpLeft: hp, stars: 3 });
        }, 1500);
      }
    } else {
      AudioService.playWrong();
      if (activeShield) {
        setActiveShield(false);
      } else {
        const newHp = Math.max(hp - 20, 0);
        setHp(newHp);
        if (newHp <= 0) {
          setTimeout(() => {
            onGameOver();
          }, 1500);
        }
      }
    }
  };

  // Card Flip Handler
  const handleCardFlip = (index: number) => {
    if (flippedCardIdx !== null) return;
    setFlippedCardIdx(index);
    const card = SAMPLE_LUCKY_CARDS[index];

    if (card.id === 'card1') {
      setHp((prev) => Math.min(prev + 25, maxHp));
    } else if (card.id === 'card2') {
      const newXp = xp + 40;
      setXp(newXp);
      if (newXp >= maxXp) {
        setTimeout(() => {
          onVictory({ xpGained: newXp, hpLeft: hp, stars: 3 });
        }, 1500);
      }
    } else if (card.id === 'card3') {
      setInventory((prev) =>
        prev.map((item) =>
          item.id === 'hint5050' ? { ...item, count: item.count + 1 } : item
        )
      );
    }
  };

  // Use Item from Inventory
  const handleUseItem = (itemId: string) => {
    if (itemId === 'hint5050' && panelState === 'question' && currentQuestion) {
      setActive5050(true);
    } else if (itemId === 'hpShield') {
      setActiveShield(true);
    } else if (itemId === 'doubleXp') {
      setActiveDoubleXp(true);
    }

    setInventory((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, count: Math.max(item.count - 1, 0) } : item
      )
    );
  };

  return (
    <div className="gameplay-screen">
      {/* Top HUD */}
      <HeaderHUD
        hp={hp}
        maxHp={maxHp}
        xp={xp}
        maxXp={maxXp}
        timer={timer}
        maxTimer={maxTimer}
        level={level}
        chapterTitle={chapterTitle}
        score={score}
        onHomeClick={onHomeClick}
        isAudioMuted={isAudioMuted}
        onToggleAudio={onToggleAudio}
      />

      {/* Main Center Area */}
      <main className="gameplay-main">
        {/* Left Panel: Dialectical Wheel */}
        <section className="gameplay-wheel-section">
          <DialecticalWheel
            onSpinComplete={handleSpinComplete}
            disabled={panelState === 'question' && selectedOption === null}
          />
        </section>

        {/* Right Panel: Dynamic Panel (Question / Lucky / Crisis) */}
        <section className="gameplay-dynamic-section glass-panel">
          <AnimatePresence mode="wait">
            {/* WELCOME / IDLE STATE */}
            {panelState === 'welcome' && (
              <motion.div
                key="welcome"
                className="dynamic-panel dynamic-panel--welcome"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="dynamic-panel__icon-ring">
                  <Sparkles size={48} color="#FFD700" />
                </div>
                <h2>SẴN SÀNG QUAY VÒNG QUAY BIỆN CHỨNG</h2>
                <p>
                  Nhấn nút <strong>QUAY BIỆN CHỨNG</strong> phía bên trái để kích hoạt các quy luật lý luận,
                  trả lời câu hỏi và tích lũy 100 XP để hoàn thành Màn {level}!
                </p>
                {activeShield && <div className="active-buff-badge">🛡️ KHIÊN BIỆN CHỨNG ĐANG KÍCH HOẠT</div>}
                {activeDoubleXp && <div className="active-buff-badge">⚡ NHÂN 2 XP ĐANG KÍCH HOẠT</div>}
              </motion.div>
            )}

            {/* QUESTION POPUP PANEL */}
            {panelState === 'question' && currentQuestion && (
              <motion.div
                key="question"
                className="dynamic-panel dynamic-panel--question"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <div className="question-header">
                  <span className="question-category">{currentQuestion.category}</span>
                  <span className="question-number font-number">Câu hỏi #{currentQuestion.id}</span>
                </div>

                <h3 className="question-text">{currentQuestion.question}</h3>

                {/* 4 Answer Options */}
                <div className="question-options">
                  {currentQuestion.options.map((opt, idx) => {
                    const optionLetter = String.fromCharCode(65 + idx);
                    let optionStatus: 'idle' | 'correct' | 'wrong' | 'hidden' = 'idle';

                    if (active5050 && idx !== currentQuestion.correctAnswer && idx === (currentQuestion.correctAnswer + 1) % 4) {
                      optionStatus = 'hidden';
                    }

                    if (selectedOption !== null && answerResult) {
                      if (idx === answerResult.correctAnswer) {
                        optionStatus = 'correct';
                      } else if (idx === selectedOption) {
                        optionStatus = 'wrong';
                      }
                    }

                    if (optionStatus === 'hidden') return null;

                    return (
                      <motion.button
                        key={idx}
                        className={`question-opt question-opt--${optionStatus} ${selectedOption === idx ? 'question-opt--selected' : ''}`}
                        whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
                        whileTap={{ scale: selectedOption === null ? 0.98 : 1 }}
                        onClick={() => handleSelectOption(idx)}
                        disabled={selectedOption !== null}
                      >
                        <span className="question-opt__letter font-number">{optionLetter}</span>
                        <span className="question-opt__text">{opt}</span>
                        {optionStatus === 'correct' && <CheckCircle2 size={22} color="#66BB6A" />}
                        {optionStatus === 'wrong' && <XCircle size={22} color="#EF5350" />}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Detailed Explanation Popup */}
                {answerResult && (
                  <motion.div
                    className={`explanation-box explanation-box--${answerResult.isCorrect ? 'correct' : 'wrong'}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <div className="explanation-title">
                      {answerResult.isCorrect ? '✅ ĐÁP ÁN CHÍNH XÁC!' : '❌ RẤT TIẾC, ĐÁP ÁN CHƯA ĐÚNG!'}
                    </div>
                    <p className="explanation-text">{answerResult.explanation}</p>
                    {currentQuestion.pageRef && (
                      <span className="explanation-page font-number">
                        📖 Giáo trình tham khảo: Trang {currentQuestion.pageRef}
                      </span>
                    )}

                    <div className="explanation-actions">
                      <GameButton
                        variant="primary"
                        size="md"
                        icon={<ArrowRight size={18} />}
                        onClick={() => setPanelState('welcome')}
                      >
                        TIẾP TỤC QUAY
                      </GameButton>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* LUCKY CARD PANEL */}
            {panelState === 'lucky' && (
              <motion.div
                key="lucky"
                className="dynamic-panel dynamic-panel--lucky"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <h3>🃏 THẺ MAY MẮN BIỆN CHỨNG</h3>
                <p>Hãy chọn lật 1 trong 3 lá bài để nhận hiệu ứng và phần thưởng tri thức!</p>

                <div className="lucky-cards-grid">
                  {SAMPLE_LUCKY_CARDS.map((card, idx) => (
                    <TacticalCard
                      key={card.id}
                      card={card}
                      isFlipped={flippedCardIdx === idx}
                      onFlip={() => handleCardFlip(idx)}
                      disabled={flippedCardIdx !== null}
                    />
                  ))}
                </div>

                {flippedCardIdx !== null && (
                  <motion.div
                    className="lucky-card-continue"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <GameButton
                      variant="primary"
                      size="md"
                      onClick={() => setPanelState('welcome')}
                    >
                      NHẬN PHẦN THƯỞNG & QUAY TIẾP
                    </GameButton>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* CRISIS EVENT PANEL */}
            {panelState === 'crisis' && (
              <motion.div
                key="crisis"
                className="dynamic-panel dynamic-panel--crisis"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="crisis-icon-wrap">
                  <AlertTriangle size={48} color="#FF5252" />
                </div>
                <h3>⚠️ THỬ THÁCH MÂU THUẪN LỊCH SỬ</h3>
                <p>
                  Phương thức sản xuất cũ xuất hiện biến cố mâu thuẫn đối kháng!
                  Bạn có 2 lựa chọn giải quyết theo tinh thần biện chứng duy vật:
                </p>

                <div className="crisis-options">
                  <GameButton
                    variant="primary"
                    size="md"
                    onClick={() => {
                      AudioService.playCorrect();
                      setXp((prev) => Math.min(prev + 30, maxXp));
                      setPanelState('welcome');
                    }}
                  >
                    CẢI CÁCH TIẾN BỘ (+30 XP)
                  </GameButton>

                  <GameButton
                    variant="danger"
                    size="md"
                    onClick={() => {
                      AudioService.playWrong();
                      setHp((prev) => Math.max(prev - 15, 0));
                      setPanelState('welcome');
                    }}
                  >
                    DUY TRÌ TÀN DƯ (-15 HP)
                  </GameButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Footer Inventory */}
      <InventoryBar
        items={inventory}
        onUseItem={handleUseItem}
        disabled={panelState !== 'question' && panelState !== 'welcome'}
      />
    </div>
  );
};
